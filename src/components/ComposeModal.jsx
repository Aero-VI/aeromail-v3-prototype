import React, { useState } from 'react';
import { Box, Typography, IconButton, TextField, Button, Divider, Tooltip } from '@mui/material';
import { Close, Minimize, OpenInFull, Send, AttachFile, InsertLink, EmojiEmotions, FormatBold, FormatItalic, FormatUnderlined, FormatListBulleted, FormatListNumbered, Delete, MoreVert } from '@mui/icons-material';

export default function ComposeModal({ minimized, onMinimize, onClose }) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  if (minimized) {
    return (
      <Box onClick={onMinimize} sx={{ position: 'fixed', bottom: 0, right: 80, width: 280, bgcolor: '#303134', borderRadius: '12px 12px 0 0', boxShadow: '0 -2px 10px rgba(0,0,0,0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', px: 2, py: 1, zIndex: 1300, border: '1px solid #3c4043', borderBottom: 'none' }}>
        <Typography sx={{ color: '#e8eaed', fontSize: '0.85rem', flex: 1, fontWeight: 500 }}>New Message</Typography>
        <IconButton size="small" onClick={e => { e.stopPropagation(); onClose(); }} sx={{ color: '#9aa0a6' }}><Close fontSize="small" /></IconButton>
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'fixed', bottom: 0, right: 80, width: 560, height: 480, bgcolor: '#2a2a2a', borderRadius: '12px 12px 0 0', boxShadow: '0 -4px 20px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', zIndex: 1300, border: '1px solid #3c4043', borderBottom: 'none' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1, bgcolor: '#303134', borderRadius: '12px 12px 0 0', borderBottom: '1px solid #3c4043' }}>
        <Typography sx={{ color: '#e8eaed', fontSize: '0.875rem', flex: 1, fontWeight: 500 }}>New Message</Typography>
        <Tooltip title="Minimize"><IconButton size="small" onClick={onMinimize} sx={{ color: '#9aa0a6' }}><Minimize fontSize="small" /></IconButton></Tooltip>
        <Tooltip title="Full screen"><IconButton size="small" sx={{ color: '#9aa0a6' }}><OpenInFull sx={{ fontSize: 14 }} /></IconButton></Tooltip>
        <Tooltip title="Close"><IconButton size="small" onClick={onClose} sx={{ color: '#9aa0a6' }}><Close fontSize="small" /></IconButton></Tooltip>
      </Box>
      {/* To */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 0.75, borderBottom: '1px solid #3c4043' }}>
        <Typography sx={{ color: '#9aa0a6', fontSize: '0.8rem', mr: 1.5, width: 30 }}>To</Typography>
        <TextField variant="standard" fullWidth value={to} onChange={e => setTo(e.target.value)} InputProps={{ disableUnderline: true, sx: { color: '#e8eaed', fontSize: '0.85rem' } }} />
        <Typography sx={{ color: '#9aa0a6', fontSize: '0.8rem', cursor: 'pointer', ml: 1, '&:hover': { color: '#e8eaed' } }}>Cc</Typography>
        <Typography sx={{ color: '#9aa0a6', fontSize: '0.8rem', cursor: 'pointer', ml: 1.5, '&:hover': { color: '#e8eaed' } }}>Bcc</Typography>
      </Box>
      {/* Subject */}
      <Box sx={{ px: 2, py: 0.75, borderBottom: '1px solid #3c4043' }}>
        <TextField variant="standard" fullWidth placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)}
          InputProps={{ disableUnderline: true, sx: { color: '#e8eaed', fontSize: '0.85rem', '& input::placeholder': { color: '#9aa0a6', opacity: 1 } } }} />
      </Box>
      {/* Body */}
      <Box sx={{ flex: 1, px: 2, py: 1, overflow: 'auto' }}>
        <TextField variant="standard" fullWidth multiline minRows={8} value={body} onChange={e => setBody(e.target.value)}
          InputProps={{ disableUnderline: true, sx: { color: '#e8eaed', fontSize: '0.85rem', lineHeight: 1.6 } }} />
      </Box>
      {/* Format bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 1, py: 0.5, borderTop: '1px solid #3c4043' }}>
        <IconButton size="small" sx={{ color: '#9aa0a6' }}><FormatBold sx={{ fontSize: 18 }} /></IconButton>
        <IconButton size="small" sx={{ color: '#9aa0a6' }}><FormatItalic sx={{ fontSize: 18 }} /></IconButton>
        <IconButton size="small" sx={{ color: '#9aa0a6' }}><FormatUnderlined sx={{ fontSize: 18 }} /></IconButton>
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, borderColor: '#3c4043' }} />
        <IconButton size="small" sx={{ color: '#9aa0a6' }}><FormatListNumbered sx={{ fontSize: 18 }} /></IconButton>
        <IconButton size="small" sx={{ color: '#9aa0a6' }}><FormatListBulleted sx={{ fontSize: 18 }} /></IconButton>
      </Box>
      {/* Bottom bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1, borderTop: '1px solid #3c4043' }}>
        <Button variant="contained" endIcon={<Send sx={{ fontSize: '16px !important' }} />}
          sx={{ bgcolor: '#00897b', '&:hover': { bgcolor: '#00796b' }, borderRadius: '18px', fontWeight: 600, px: 2.5, py: 0.5 }}>
          Send
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
          <Tooltip title="Attach"><IconButton size="small" sx={{ color: '#9aa0a6' }}><AttachFile sx={{ fontSize: 18, transform: 'rotate(45deg)' }} /></IconButton></Tooltip>
          <Tooltip title="Link"><IconButton size="small" sx={{ color: '#9aa0a6' }}><InsertLink sx={{ fontSize: 18 }} /></IconButton></Tooltip>
          <Tooltip title="Emoji"><IconButton size="small" sx={{ color: '#9aa0a6' }}><EmojiEmotions sx={{ fontSize: 18 }} /></IconButton></Tooltip>
          <Tooltip title="More"><IconButton size="small" sx={{ color: '#9aa0a6' }}><MoreVert sx={{ fontSize: 18 }} /></IconButton></Tooltip>
        </Box>
        <Box sx={{ flex: 1 }} />
        <Tooltip title="Discard"><IconButton size="small" onClick={onClose} sx={{ color: '#9aa0a6' }}><Delete sx={{ fontSize: 18 }} /></IconButton></Tooltip>
      </Box>
    </Box>
  );
}
