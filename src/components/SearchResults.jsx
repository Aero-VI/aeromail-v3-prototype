import React, { useState } from 'react';
import { Box, Typography, Chip, IconButton, Checkbox } from '@mui/material';
import { ArrowBack, StarBorder, Star, AttachFile } from '@mui/icons-material';
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

export default function SearchResults({ query }) {
  const navigate = useNavigate();
  const [starredIds, setStarredIds] = useState(new Set(mockEmails.filter(e => e.starred).map(e => e.id)));
  const q = (query || '').toLowerCase();

  const results = mockEmails.filter(e =>
    e.subject.toLowerCase().includes(q) ||
    e.from.name.toLowerCase().includes(q) ||
    e.snippet.toLowerCase().includes(q) ||
    e.from.email.toLowerCase().includes(q)
  );

  const toggleStar = (ev, id) => {
    ev.stopPropagation();
    const n = new Set(starredIds);
    n.has(id) ? n.delete(id) : n.add(id);
    setStarredIds(n);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, borderBottom: '1px solid #3c4043', gap: 1.5 }}>
        <IconButton onClick={() => navigate('/')} sx={{ color: '#9aa0a6' }}><ArrowBack fontSize="small" /></IconButton>
        <Typography sx={{ color: '#e8eaed', fontSize: '0.9rem' }}>
          Search results for "<Box component="span" sx={{ fontWeight: 600 }}>{query}</Box>"
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Typography variant="body2" sx={{ color: '#9aa0a6' }}>{results.length} result{results.length !== 1 ? 's' : ''}</Typography>
      </Box>

      {/* Filter chips */}
      <Box sx={{ display: 'flex', gap: 1, px: 2, py: 1, borderBottom: '1px solid rgba(60,64,67,0.3)' }}>
        {['From', 'Any time', 'Has attachment', 'To', 'Is unread'].map(chip => (
          <Chip key={chip} label={chip} variant="outlined" size="small"
            sx={{ borderColor: '#3c4043', color: '#9aa0a6', fontSize: '0.75rem', '&:hover': { bgcolor: 'rgba(232,234,237,0.08)' } }} />
        ))}
        <Typography variant="body2" sx={{ color: '#8ab4f8', cursor: 'pointer', alignSelf: 'center', ml: 1, fontSize: '0.8rem', '&:hover': { textDecoration: 'underline' } }}>
          Advanced search
        </Typography>
      </Box>

      {/* Results */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {results.map(email => (
          <Box key={email.id} onClick={() => navigate(`/thread/${email.threadId}`)}
            sx={{
              display: 'flex', alignItems: 'center', px: 1, py: 0.5, cursor: 'pointer', minHeight: 44,
              bgcolor: email.read ? '#1f1f1f' : 'rgba(255,255,255,0.04)',
              borderBottom: '1px solid rgba(60,64,67,0.4)',
              '&:hover': { bgcolor: 'rgba(232,234,237,0.08)' },
            }}>
            <Checkbox size="small" onClick={e => e.stopPropagation()} sx={{ color: '#9aa0a6', '&.Mui-checked': { color: '#8ab4f8' }, mr: -0.5 }} />
            <IconButton size="small" onClick={e => toggleStar(e, email.id)} sx={{ color: starredIds.has(email.id) ? '#fdd663' : '#9aa0a6', mr: 0.5 }}>
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
        ))}
        {results.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography sx={{ color: '#9aa0a6', fontSize: '1rem' }}>No results found for "{query}"</Typography>
            <Typography variant="body2" sx={{ color: '#5f6368', mt: 1 }}>Try different keywords or check your spelling</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
