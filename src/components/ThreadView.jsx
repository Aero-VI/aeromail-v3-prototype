import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Avatar, Tooltip, Divider, Chip, Button } from '@mui/material';
import { ArrowBack, Archive, Delete, Report, DriveFileMove, Label, MoreVert, StarBorder, Reply, Forward, Print, AttachFile } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { mockEmails, mockThreadMessages } from '../data/mockEmails';

const avatarColors = { SC: '#7b1fa2', ME: '#00897b', GH: '#424242', AR: '#e65100', ST: '#4a148c', JL: '#1565c0', DA: '#c62828', NW: '#2e7d32', MS: '#ad1457', LI: '#0277bd', AW: '#ef6c00', SE: '#283593', PP: '#6a1b9a' };

function formatFullDate(d) { return new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }); }

function Message({ msg, expanded, onToggle }) {
  const isMe = msg.from.email === 'user@aeromail.dev';
  return (
    <Box sx={{ mb: 0.5 }}>
      <Box onClick={onToggle} sx={{ display: 'flex', alignItems: 'flex-start', p: 2, cursor: 'pointer', borderRadius: 2, '&:hover': { bgcolor: 'rgba(232,234,237,0.06)' } }}>
        <Avatar sx={{ width: 40, height: 40, mr: 2, mt: 0.5, bgcolor: isMe ? '#00897b' : (avatarColors[msg.from.avatar] || '#5f6368'), fontSize: '0.9rem', fontWeight: 600 }}>
          {msg.from.avatar || msg.from.name[0]}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#e8eaed' }}>{isMe ? 'Me' : msg.from.name}</Typography>
            {!expanded && <Typography sx={{ fontSize: '0.8rem', color: '#9aa0a6', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>— {msg.body.replace(/<[^>]+>/g, '').substring(0, 100)}...</Typography>}
            <Box sx={{ flex: 1 }} />
            <Typography variant="caption" sx={{ color: '#9aa0a6', whiteSpace: 'nowrap', flexShrink: 0 }}>{formatFullDate(msg.date)}</Typography>
            <IconButton size="small" sx={{ color: '#9aa0a6' }}><StarBorder sx={{ fontSize: 18 }} /></IconButton>
            <IconButton size="small" sx={{ color: '#9aa0a6' }}><Reply sx={{ fontSize: 18 }} /></IconButton>
            <IconButton size="small" sx={{ color: '#9aa0a6' }}><MoreVert sx={{ fontSize: 18 }} /></IconButton>
          </Box>
          {expanded && (
            <>
              <Typography variant="body2" sx={{ color: '#9aa0a6', fontSize: '0.8rem', mb: 1.5 }}>to {msg.to.map(t => t.name).join(', ')}</Typography>
              <Box sx={{ color: '#e8eaed', fontSize: '0.875rem', lineHeight: 1.6, '& p': { my: 0.5 }, '& ul, & ol': { pl: 3, my: 0.5 }, '& li': { my: 0.25 }, '& a': { color: '#8ab4f8' } }} dangerouslySetInnerHTML={{ __html: msg.body }} />
            </>
          )}
        </Box>
      </Box>
      <Divider sx={{ borderColor: '#3c4043', mx: 2 }} />
    </Box>
  );
}

export default function ThreadView() {
  const navigate = useNavigate();
  const { threadId } = useParams();
  const email = mockEmails.find(e => e.threadId === threadId);
  const [expandedMsgs, setExpandedMsgs] = useState(new Set());

  const messages = threadId === 't1' ? mockThreadMessages : email ? [{ ...email }] : [];

  useEffect(() => {
    if (messages.length > 0) setExpandedMsgs(new Set([messages[messages.length - 1].id]));
  }, [threadId]);

  const toggleMsg = (id) => { const n = new Set(expandedMsgs); n.has(id) ? n.delete(id) : n.add(id); setExpandedMsgs(n); };

  if (!email) return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography sx={{ color: '#9aa0a6' }}>Thread not found</Typography>
      <Button onClick={() => navigate('/')} sx={{ color: '#8ab4f8', mt: 2 }}>Back to Inbox</Button>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', px: 1, py: 0.5, borderBottom: '1px solid #3c4043', minHeight: 48 }}>
        <Tooltip title="Back"><IconButton onClick={() => navigate('/')} sx={{ color: '#9aa0a6' }}><ArrowBack fontSize="small" /></IconButton></Tooltip>
        <Tooltip title="Archive"><IconButton size="small" sx={{ color: '#9aa0a6' }}><Archive fontSize="small" /></IconButton></Tooltip>
        <Tooltip title="Report spam"><IconButton size="small" sx={{ color: '#9aa0a6' }}><Report fontSize="small" /></IconButton></Tooltip>
        <Tooltip title="Delete"><IconButton size="small" sx={{ color: '#9aa0a6' }}><Delete fontSize="small" /></IconButton></Tooltip>
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, borderColor: '#3c4043' }} />
        <Tooltip title="Move to"><IconButton size="small" sx={{ color: '#9aa0a6' }}><DriveFileMove fontSize="small" /></IconButton></Tooltip>
        <Tooltip title="Labels"><IconButton size="small" sx={{ color: '#9aa0a6' }}><Label fontSize="small" /></IconButton></Tooltip>
        <Tooltip title="More"><IconButton size="small" sx={{ color: '#9aa0a6' }}><MoreVert fontSize="small" /></IconButton></Tooltip>
        <Box sx={{ flex: 1 }} />
        <Tooltip title="Print"><IconButton size="small" sx={{ color: '#9aa0a6' }}><Print fontSize="small" /></IconButton></Tooltip>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', px: 2, py: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, px: 2, pt: 1 }}>
          <Typography variant="h6" sx={{ color: '#e8eaed', fontWeight: 400, fontSize: '1.35rem', flex: 1 }}>{email.subject}</Typography>
          {email.labels.filter(l => l !== 'inbox').map(l => <Chip key={l} label={l} size="small" sx={{ bgcolor: '#3c4043', color: '#9aa0a6', fontSize: '0.7rem', height: 22 }} />)}
        </Box>

        {messages.map(msg => <Message key={msg.id} msg={msg} expanded={expandedMsgs.has(msg.id)} onToggle={() => toggleMsg(msg.id)} />)}

        {email.hasAttachment && email.attachments && (
          <Box sx={{ px: 2, py: 2 }}>
            <Typography variant="body2" sx={{ color: '#9aa0a6', mb: 1, fontSize: '0.8rem' }}>{email.attachments.length} Attachment{email.attachments.length > 1 ? 's' : ''}</Typography>
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              {email.attachments.map((att, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1.5, border: '1px solid #3c4043', borderRadius: 2, cursor: 'pointer', '&:hover': { bgcolor: 'rgba(232,234,237,0.06)' }, minWidth: 200 }}>
                  <AttachFile sx={{ color: '#8ab4f8', fontSize: 20, transform: 'rotate(45deg)' }} />
                  <Box><Typography sx={{ color: '#e8eaed', fontSize: '0.8rem' }}>{att.name}</Typography><Typography sx={{ color: '#9aa0a6', fontSize: '0.7rem' }}>{att.size}</Typography></Box>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        <Box sx={{ display: 'flex', gap: 1.5, px: 2, py: 3 }}>
          <Button variant="outlined" startIcon={<Reply />} sx={{ borderColor: '#3c4043', color: '#e8eaed', borderRadius: '18px', '&:hover': { borderColor: '#5f6368', bgcolor: 'rgba(232,234,237,0.06)' } }}>Reply</Button>
          <Button variant="outlined" startIcon={<Forward />} sx={{ borderColor: '#3c4043', color: '#e8eaed', borderRadius: '18px', '&:hover': { borderColor: '#5f6368', bgcolor: 'rgba(232,234,237,0.06)' } }}>Forward</Button>
        </Box>
      </Box>
    </Box>
  );
}
