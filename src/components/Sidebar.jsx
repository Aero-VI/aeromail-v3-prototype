import React, { useState } from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography, Button, Divider, Collapse } from '@mui/material';
import { Inbox, StarBorder, Schedule, LabelImportant, Send, Drafts, Report, Delete, Edit, ExpandMore, ExpandLess, Label } from '@mui/icons-material';
import { mockFolders, mockLabels } from '../data/mockEmails';

const iconMap = { inbox: Inbox, star: StarBorder, schedule: Schedule, label_important: LabelImportant, send: Send, drafts: Drafts, report: Report, delete: Delete };

export default function Sidebar({ open, activeFolder, onFolderChange, onCompose }) {
  const [labelsOpen, setLabelsOpen] = useState(true);
  if (!open) return null;

  return (
    <Box sx={{ width: 256, flexShrink: 0, bgcolor: '#1f1f1f', borderRight: '1px solid #3c4043', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Box sx={{ p: 2, pb: 1 }}>
        <Button variant="contained" startIcon={<Edit />} onClick={onCompose}
          sx={{ bgcolor: '#2a4a5e', color: '#b8d4e8', borderRadius: '16px', px: 3, py: 1.2, fontSize: '0.9rem', fontWeight: 500, boxShadow: '0 1px 3px rgba(0,0,0,0.3)', '&:hover': { bgcolor: '#304f66', boxShadow: '0 2px 6px rgba(0,0,0,0.4)' }, width: '100%', justifyContent: 'flex-start' }}>
          Compose
        </Button>
      </Box>

      <List sx={{ flex: 1, overflow: 'auto', py: 0 }}>
        {mockFolders.map((folder) => {
          const Icon = iconMap[folder.icon] || Inbox;
          const active = activeFolder === folder.id;
          return (
            <ListItemButton key={folder.id} selected={active} onClick={() => onFolderChange(folder.id)}
              sx={{ py: 0.5, pl: 2.5, pr: 1.5, borderRadius: '0 20px 20px 0', mr: 1,
                '&.Mui-selected': { bgcolor: 'rgba(138,180,248,0.16)', '&:hover': { bgcolor: 'rgba(138,180,248,0.22)' } },
                '&:hover': { bgcolor: 'rgba(232,234,237,0.08)' } }}>
              <ListItemIcon sx={{ minWidth: 36, color: active ? '#8ab4f8' : '#9aa0a6' }}><Icon fontSize="small" /></ListItemIcon>
              <ListItemText primary={folder.name} sx={{ '& .MuiListItemText-primary': { fontSize: '0.85rem', fontWeight: active ? 600 : 400, color: '#e8eaed' } }} />
              {folder.count > 0 && <Typography variant="caption" sx={{ color: '#9aa0a6', fontWeight: 500, fontSize: '0.75rem' }}>{folder.count}</Typography>}
            </ListItemButton>
          );
        })}
        <Divider sx={{ borderColor: '#3c4043', my: 1, mx: 2 }} />
        <ListItemButton onClick={() => setLabelsOpen(!labelsOpen)} sx={{ py: 0.5, pl: 2.5, '&:hover': { bgcolor: 'rgba(232,234,237,0.08)' } }}>
          <ListItemText primary="Labels" sx={{ '& .MuiListItemText-primary': { fontSize: '0.8rem', fontWeight: 500, color: '#9aa0a6', textTransform: 'uppercase', letterSpacing: 0.5 } }} />
          {labelsOpen ? <ExpandLess sx={{ color: '#9aa0a6', fontSize: 18 }} /> : <ExpandMore sx={{ color: '#9aa0a6', fontSize: 18 }} />}
        </ListItemButton>
        <Collapse in={labelsOpen}>
          {mockLabels.map((label) => (
            <ListItemButton key={label.id} sx={{ py: 0.4, pl: 2.5, pr: 1.5, borderRadius: '0 20px 20px 0', mr: 1, '&:hover': { bgcolor: 'rgba(232,234,237,0.08)' } }}>
              <ListItemIcon sx={{ minWidth: 36 }}><Label sx={{ color: label.color, fontSize: 18 }} /></ListItemIcon>
              <ListItemText primary={label.name} sx={{ '& .MuiListItemText-primary': { fontSize: '0.85rem', color: '#e8eaed' } }} />
            </ListItemButton>
          ))}
        </Collapse>
      </List>
    </Box>
  );
}
