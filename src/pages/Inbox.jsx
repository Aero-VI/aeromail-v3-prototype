import { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Typography,
  Avatar,
  Fab,
  Tooltip,
  Checkbox,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Tune,
  HelpOutline,
  Settings,
  Apps,
  Edit,
  Refresh,
  MoreVert,
  ArrowDropDown,
} from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import EmailList from '../components/EmailList';
import ThreadView from '../components/ThreadView';
import ComposeModal from '../components/ComposeModal';
import mockEmails from '../data/mockEmails';

export default function InboxPage() {
  const [emails, setEmails] = useState(mockEmails);
  const [activeFolder, setActiveFolder] = useState('Inbox');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [composeOpen, setComposeOpen] = useState(false);

  const handleStarToggle = (id) => {
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, starred: !e.starred } : e))
    );
    if (selectedEmail?.id === id) {
      setSelectedEmail((prev) => ({ ...prev, starred: !prev.starred }));
    }
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setEmails((prev) =>
      prev.map((e) => (e.id === email.id ? { ...e, read: true } : e))
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#1f1f1f' }}>
      {/* Top Bar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: '#1f1f1f',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          <IconButton sx={{ color: '#9aa0a6' }}>
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '8px',
                bgcolor: '#00BCD4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem' }}>A</Typography>
            </Box>
            <Typography variant="h6" sx={{ color: '#e8eaed', fontWeight: 500, fontSize: '1.1rem' }}>
              AeroMail
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              maxWidth: 720,
              bgcolor: '#303134',
              borderRadius: '28px',
              display: 'flex',
              alignItems: 'center',
              px: 2,
              height: 48,
              '&:hover': { bgcolor: '#3c4043' },
              transition: 'background 0.2s',
            }}
          >
            <SearchIcon sx={{ color: '#9aa0a6', mr: 1 }} />
            <InputBase
              placeholder="Search mail"
              fullWidth
              sx={{ color: '#e8eaed', fontSize: '1rem' }}
            />
            <IconButton sx={{ color: '#9aa0a6' }}>
              <Tune sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1 }} />

          <IconButton sx={{ color: '#9aa0a6' }}>
            <HelpOutline />
          </IconButton>
          <IconButton sx={{ color: '#9aa0a6' }}>
            <Settings />
          </IconButton>
          <IconButton sx={{ color: '#9aa0a6' }}>
            <Apps />
          </IconButton>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: '#00BCD4',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            N
          </Avatar>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar
          activeFolder={activeFolder}
          onFolderClick={setActiveFolder}
          onComposeClick={() => setComposeOpen(true)}
        />

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* List toolbar */}
          {!selectedEmail && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                px: 1,
                py: 0.5,
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                gap: 0.5,
              }}
            >
              <Checkbox size="small" sx={{ color: '#9aa0a6' }} />
              <IconButton size="small" sx={{ color: '#9aa0a6' }}>
                <ArrowDropDown sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton size="small" sx={{ color: '#9aa0a6' }}>
                <Refresh sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton size="small" sx={{ color: '#9aa0a6' }}>
                <MoreVert sx={{ fontSize: 20 }} />
              </IconButton>
              <Box sx={{ flex: 1 }} />
              <Typography variant="caption" sx={{ color: '#9aa0a6' }}>
                1–{emails.length} of {emails.length}
              </Typography>
            </Box>
          )}

          {selectedEmail ? (
            <ThreadView
              email={selectedEmail}
              onBack={() => setSelectedEmail(null)}
              onStarToggle={handleStarToggle}
            />
          ) : (
            <EmailList
              emails={emails}
              onEmailClick={handleEmailClick}
              onStarToggle={handleStarToggle}
            />
          )}
        </Box>
      </Box>

      {/* Compose FAB */}
      {!composeOpen && !selectedEmail && (
        <Tooltip title="Compose" placement="left">
          <Fab
            onClick={() => setComposeOpen(true)}
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              bgcolor: '#00BCD4',
              color: '#fff',
              '&:hover': { bgcolor: '#00ACC1' },
              width: 56,
              height: 56,
            }}
          >
            <Edit />
          </Fab>
        </Tooltip>
      )}

      {/* Compose Modal */}
      <ComposeModal open={composeOpen} onClose={() => setComposeOpen(false)} />
    </Box>
  );
}
