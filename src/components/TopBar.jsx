import React, { useState } from 'react';
import { Box, IconButton, Typography, InputBase, Avatar, Menu, MenuItem, Divider, Tooltip } from '@mui/material';
import { Menu as MenuIcon, Search, Tune, HelpOutline, Settings, Apps, Email } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function TopBar({ onMenuToggle, onLogout, searchQuery, onSearch }) {
  const navigate = useNavigate();
  const [localQuery, setLocalQuery] = useState(searchQuery || '');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && localQuery.trim()) {
      onSearch(localQuery);
      navigate('/search');
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: 64, px: 1, bgcolor: '#1f1f1f', borderBottom: '1px solid #3c4043', flexShrink: 0 }}>
      <IconButton onClick={onMenuToggle} sx={{ color: '#9aa0a6', mr: 1 }}>
        <MenuIcon />
      </IconButton>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', mr: 2, minWidth: 140 }} onClick={() => navigate('/')}>
        <Box sx={{ width: 32, height: 32, borderRadius: 1.5, background: 'linear-gradient(135deg, #00bcd4 0%, #009688 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Email sx={{ color: '#fff', fontSize: 20 }} />
        </Box>
        <Typography sx={{ color: '#e8eaed', fontSize: '1.15rem', fontWeight: 500, letterSpacing: -0.3 }}>AeroMail</Typography>
      </Box>

      <Box sx={{ flex: 1, maxWidth: 720, mx: 'auto', display: 'flex', alignItems: 'center', bgcolor: '#303134', borderRadius: '24px', px: 2, height: 46, '&:focus-within': { bgcolor: '#3c4043', boxShadow: '0 1px 6px rgba(0,0,0,0.3)' } }}>
        <Search sx={{ color: '#9aa0a6', mr: 1 }} />
        <InputBase fullWidth placeholder="Search mail" value={localQuery} onChange={(e) => setLocalQuery(e.target.value)} onKeyDown={handleSearch} sx={{ color: '#e8eaed', fontSize: '1rem', '& input::placeholder': { color: '#9aa0a6', opacity: 1 } }} />
        <Tooltip title="Advanced search"><IconButton size="small" sx={{ color: '#9aa0a6' }}><Tune fontSize="small" /></IconButton></Tooltip>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 2 }}>
        <Tooltip title="Support"><IconButton sx={{ color: '#9aa0a6' }}><HelpOutline /></IconButton></Tooltip>
        <Tooltip title="Settings"><IconButton sx={{ color: '#9aa0a6' }} onClick={() => navigate('/settings')}><Settings /></IconButton></Tooltip>
        <Tooltip title="Apps"><IconButton sx={{ color: '#9aa0a6' }}><Apps /></IconButton></Tooltip>
        <Tooltip title="Account">
          <Avatar sx={{ width: 32, height: 32, ml: 1, bgcolor: '#00897b', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600 }} onClick={(e) => setAnchorEl(e.currentTarget)}>U</Avatar>
        </Tooltip>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} PaperProps={{ sx: { bgcolor: '#2a2a2a', border: '1px solid #3c4043', minWidth: 200 } }}>
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography sx={{ color: '#e8eaed', fontWeight: 500 }}>Demo User</Typography>
            <Typography variant="body2" sx={{ color: '#9aa0a6' }}>user@aeromail.dev</Typography>
          </Box>
          <Divider sx={{ borderColor: '#3c4043' }} />
          <MenuItem onClick={() => { setAnchorEl(null); navigate('/settings'); }} sx={{ color: '#e8eaed' }}>Settings</MenuItem>
          <MenuItem onClick={() => { setAnchorEl(null); onLogout(); }} sx={{ color: '#e8eaed' }}>Sign out</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
