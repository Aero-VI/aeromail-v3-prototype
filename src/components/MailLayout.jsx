import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import EmailList from './EmailList';
import ThreadView from './ThreadView';
import SettingsPage from './SettingsPage';
import SearchResults from './SearchResults';
import ComposeModal from './ComposeModal';

export default function MailLayout({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeMinimized, setComposeMinimized] = useState(false);
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#1f1f1f' }}>
      <TopBar
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        onLogout={onLogout}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar
          open={sidebarOpen}
          activeFolder={activeFolder}
          onFolderChange={setActiveFolder}
          onCompose={() => { setComposeOpen(true); setComposeMinimized(false); }}
        />
        <Box component="main" sx={{ flex: 1, overflow: 'auto', bgcolor: '#1f1f1f' }}>
          <Routes>
            <Route path="/" element={<EmailList activeFolder={activeFolder} />} />
            <Route path="/thread/:threadId" element={<ThreadView />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/search" element={<SearchResults query={searchQuery} />} />
          </Routes>
        </Box>
      </Box>
      {composeOpen && (
        <ComposeModal
          minimized={composeMinimized}
          onMinimize={() => setComposeMinimized(!composeMinimized)}
          onClose={() => setComposeOpen(false)}
        />
      )}
    </Box>
  );
}
