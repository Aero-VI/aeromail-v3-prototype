import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  Divider,
} from '@mui/material';
import {
  Close,
  Minimize,
  OpenInFull,
  AttachFile,
  InsertLink,
  EmojiEmotions,
  FormatColorText,
  MoreVert,
  Delete,
} from '@mui/icons-material';

export default function ComposeModal({ open, onClose }) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  if (!open) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        right: 80,
        width: 540,
        height: 480,
        bgcolor: '#2d2d2d',
        borderRadius: '12px 12px 0 0',
        boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1300,
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 1,
          bgcolor: '#404040',
          borderRadius: '12px 12px 0 0',
        }}
      >
        <Typography variant="body2" sx={{ color: '#e8eaed', fontWeight: 500, flex: 1 }}>
          New Message
        </Typography>
        <IconButton size="small" sx={{ color: '#9aa0a6' }}>
          <Minimize sx={{ fontSize: 18 }} />
        </IconButton>
        <IconButton size="small" sx={{ color: '#9aa0a6' }}>
          <OpenInFull sx={{ fontSize: 16 }} />
        </IconButton>
        <IconButton size="small" onClick={onClose} sx={{ color: '#9aa0a6' }}>
          <Close sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      {/* Fields */}
      <Box sx={{ px: 2 }}>
        <TextField
          fullWidth
          variant="standard"
          placeholder="Recipients"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          InputProps={{
            disableUnderline: true,
            sx: { color: '#e8eaed', py: 1, fontSize: '0.875rem' },
            startAdornment: (
              <Typography variant="body2" sx={{ color: '#9aa0a6', mr: 1 }}>
                To
              </Typography>
            ),
          }}
        />
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
        <TextField
          fullWidth
          variant="standard"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          InputProps={{
            disableUnderline: true,
            sx: { color: '#e8eaed', py: 1, fontSize: '0.875rem' },
          }}
        />
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
      </Box>

      {/* Body */}
      <TextField
        fullWidth
        multiline
        variant="standard"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        InputProps={{
          disableUnderline: true,
          sx: { color: '#e8eaed', px: 2, py: 1, fontSize: '0.875rem' },
        }}
        sx={{ flex: 1, overflow: 'auto' }}
      />

      {/* Toolbar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 1,
          gap: 0.5,
        }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: '#00BCD4',
            color: '#fff',
            borderRadius: '20px',
            px: 3,
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': { bgcolor: '#00ACC1' },
          }}
        >
          Send
        </Button>
        <IconButton size="small" sx={{ color: '#9aa0a6' }}>
          <FormatColorText sx={{ fontSize: 20 }} />
        </IconButton>
        <IconButton size="small" sx={{ color: '#9aa0a6' }}>
          <AttachFile sx={{ fontSize: 20 }} />
        </IconButton>
        <IconButton size="small" sx={{ color: '#9aa0a6' }}>
          <InsertLink sx={{ fontSize: 20 }} />
        </IconButton>
        <IconButton size="small" sx={{ color: '#9aa0a6' }}>
          <EmojiEmotions sx={{ fontSize: 20 }} />
        </IconButton>
        <Box sx={{ flex: 1 }} />
        <IconButton size="small" sx={{ color: '#9aa0a6' }}>
          <MoreVert sx={{ fontSize: 20 }} />
        </IconButton>
        <IconButton size="small" onClick={onClose} sx={{ color: '#9aa0a6' }}>
          <Delete sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>
    </Box>
  );
}
