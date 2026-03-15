import React, { useState } from 'react';
import { Box, Checkbox, IconButton, Typography, Tooltip } from '@mui/material';
import { Archive, Delete, MarkunreadMailbox, MoreVert, Refresh, ChevronLeft, ChevronRight, StarBorder, Star, AttachFile, KeyboardArrowDown } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { mockEmails } from '../data/mockEmails';

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  if (d.toDateString() === now.toDateString()) return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  const diff = Math.floor((now - d) / 86400000);
  if (diff < 7) return d.toLocaleDateString('en-US', { weekday: 'short' });
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function EmailList({ activeFolder }) {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [starredIds, setStarredIds] = useState(new Set(mockEmails.filter(e => e.starred).map(e => e.id)));

  const emails = mockEmails.filter(e => {
    if (activeFolder === 'starred') return starredIds.has(e.id);
    if (activeFolder === 'inbox') return e.labels.includes('inbox');
    return e.labels.includes(activeFolder);
  });

  const toggleStar = (ev, id) => {
    ev.stopPropagation();
    const next = new Set(starredIds);
    next.has(id) ? next.delete(id) : next.add(id);
    setStarredIds(next);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Toolbar */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 1, py: 0.5, borderBottom: '1px solid #3c4043', minHeight: 48 }}>
        <Checkbox size="small" sx={{ color: '#9aa0a6', '&.Mui-checked': { color: '#8ab4f8' } }}
          checked={selectedIds.size > 0 && selectedIds.size === emails.length}
          indeterminate={selectedIds.size > 0 && selectedIds.size < emails.length}
          onChange={() => selectedIds.size === emails.length ? setSelectedIds(new Set()) : setSelectedIds(new Set(emails.map(e => e.id)))} />
        <IconButton size="small" sx={{ color: '#9aa0a6', ml: -0.5 }}><KeyboardArrowDown fontSize="small" /></IconButton>
        {selectedIds.size > 0 ? (
          <>
            <Tooltip title="Archive"><IconButton size="small" sx={{ color: '#9aa0a6' }}><Archive fontSize="small" /></IconButton></Tooltip>
            <Tooltip title="Delete"><IconButton size="small" sx={{ color: '#9aa0a6' }}><Delete fontSize="small" /></IconButton></Tooltip>
            <Tooltip title="Mark as read"><IconButton size="small" sx={{ color: '#9aa0a6' }}><MarkunreadMailbox fontSize="small" /></IconButton></Tooltip>
            <Tooltip title="More"><IconButton size="small" sx={{ color: '#9aa0a6' }}><MoreVert fontSize="small" /></IconButton></Tooltip>
          </>
        ) : (
          <Tooltip title="Refresh"><IconButton size="small" sx={{ color: '#9aa0a6', ml: 0.5 }}><Refresh fontSize="small" /></IconButton></Tooltip>
        )}
        <Box sx={{ flex: 1 }} />
        <Typography variant="body2" sx={{ color: '#9aa0a6', mr: 1 }}>1–{emails.length} of {emails.length}</Typography>
        <IconButton size="small" sx={{ color: '#9aa0a6' }}><ChevronLeft fontSize="small" /></IconButton>
        <IconButton size="small" sx={{ color: '#9aa0a6' }}><ChevronRight fontSize="small" /></IconButton>
      </Box>

      {/* Email rows */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {emails.map(email => {
          const selected = selectedIds.has(email.id);
          return (
            <Box key={email.id} onClick={() => navigate(`/thread/${email.threadId}`)}
              sx={{
                display: 'flex', alignItems: 'center', px: 1, py: 0.5, cursor: 'pointer', minHeight: 44,
                bgcolor: selected ? 'rgba(138,180,248,0.12)' : email.read ? '#1f1f1f' : 'rgba(255,255,255,0.04)',
                borderBottom: '1px solid rgba(60,64,67,0.4)',
                '&:hover': { bgcolor: 'rgba(232,234,237,0.08)', boxShadow: 'inset 0 -1px 0 #3c4043' },
              }}>
              <Checkbox size="small" checked={selected} onClick={e => e.stopPropagation()}
                onChange={() => { const n = new Set(selectedIds); n.has(email.id) ? n.delete(email.id) : n.add(email.id); setSelectedIds(n); }}
                sx={{ color: '#9aa0a6', '&.Mui-checked': { color: '#8ab4f8' }, mr: -0.5 }} />
              <IconButton size="small" onClick={(e) => toggleStar(e, email.id)}
                sx={{ color: starredIds.has(email.id) ? '#fdd663' : '#9aa0a6', mr: 0.5 }}>
                {starredIds.has(email.id) ? <Star fontSize="small" /> : <StarBorder fontSize="small" />}
              </IconButton>
              <Typography sx={{ width: 180, flexShrink: 0, fontSize: '0.85rem', fontWeight: email.read ? 400 : 700, color: '#e8eaed', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {email.from.name}
              </Typography>
              <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', overflow: 'hidden', mx: 2 }}>
                <Typography component="span" sx={{ fontSize: '0.85rem', fontWeight: email.read ? 400 : 600, color: '#e8eaed', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {email.subject}
                </Typography>
                <Typography component="span" sx={{ fontSize: '0.85rem', color: '#9aa0a6', ml: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  &nbsp;— {email.snippet}
                </Typography>
              </Box>
              {email.hasAttachment && <AttachFile sx={{ color: '#9aa0a6', fontSize: 16, mr: 1, transform: 'rotate(45deg)' }} />}
              <Typography sx={{ fontSize: '0.75rem', color: email.read ? '#9aa0a6' : '#e8eaed', fontWeight: email.read ? 400 : 600, whiteSpace: 'nowrap', flexShrink: 0 }}>
                {formatDate(email.date)}
              </Typography>
            </Box>
          );
        })}
        {emails.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography sx={{ color: '#9aa0a6', fontSize: '1rem' }}>No emails in this folder</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
