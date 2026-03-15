import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Badge,
} from '@mui/material';
import {
  Inbox,
  Star,
  AccessTime,
  Send,
  Description,
  Report,
  Delete,
  Label,
  Edit as ComposeIcon,
} from '@mui/icons-material';
import { folders, labels } from '../data/mockEmails';

const iconMap = {
  Inbox: <Inbox />,
  Star: <Star />,
  AccessTime: <AccessTime />,
  Send: <Send />,
  Description: <Description />,
  Report: <Report />,
  Delete: <Delete />,
};

export default function Sidebar({ activeFolder, onFolderClick, onComposeClick }) {
  return (
    <Box
      sx={{
        width: 256,
        minWidth: 256,
        bgcolor: '#1f1f1f',
        height: '100%',
        overflowY: 'auto',
        pt: 1,
      }}
    >
      <Box sx={{ px: 2, py: 1.5 }}>
        <Box
          onClick={onComposeClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            bgcolor: '#313D5A',
            borderRadius: '16px',
            px: 3,
            py: 1.5,
            cursor: 'pointer',
            transition: 'box-shadow 0.2s',
            '&:hover': {
              boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
            },
          }}
        >
          <ComposeIcon sx={{ color: '#e8eaed', fontSize: 20 }} />
          <Typography sx={{ color: '#e8eaed', fontWeight: 500, fontSize: '0.9rem' }}>
            Compose
          </Typography>
        </Box>
      </Box>

      <List sx={{ px: 1 }}>
        {folders.map((folder) => (
          <ListItemButton
            key={folder.name}
            selected={activeFolder === folder.name}
            onClick={() => onFolderClick(folder.name)}
            sx={{
              borderRadius: '0 20px 20px 0',
              py: 0.5,
              px: 2,
              mb: 0.25,
              '&.Mui-selected': {
                bgcolor: 'rgba(138,180,248,0.12)',
                '&:hover': { bgcolor: 'rgba(138,180,248,0.18)' },
              },
              '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' },
            }}
          >
            <ListItemIcon sx={{ color: activeFolder === folder.name ? '#8ab4f8' : '#9aa0a6', minWidth: 40 }}>
              {iconMap[folder.icon]}
            </ListItemIcon>
            <ListItemText
              primary={folder.name}
              primaryTypographyProps={{
                fontSize: '0.875rem',
                fontWeight: activeFolder === folder.name ? 600 : 400,
                color: activeFolder === folder.name ? '#e8eaed' : '#9aa0a6',
              }}
            />
            {folder.count > 0 && (
              <Typography variant="caption" sx={{ color: '#e8eaed', fontWeight: 600 }}>
                {folder.count}
              </Typography>
            )}
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mx: 2, my: 1 }} />

      <Box sx={{ px: 3, py: 1 }}>
        <Typography variant="caption" sx={{ color: '#9aa0a6', fontWeight: 500, letterSpacing: '0.5px' }}>
          LABELS
        </Typography>
      </Box>
      <List sx={{ px: 1 }}>
        {labels.map((label) => (
          <ListItemButton
            key={label.name}
            sx={{
              borderRadius: '0 20px 20px 0',
              py: 0.3,
              px: 2,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Label sx={{ color: label.color, fontSize: 20 }} />
            </ListItemIcon>
            <ListItemText
              primary={label.name}
              primaryTypographyProps={{ fontSize: '0.875rem', color: '#9aa0a6' }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
