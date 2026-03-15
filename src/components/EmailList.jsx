import {
  Box,
  Avatar,
  Typography,
  Checkbox,
  IconButton,
  Chip,
} from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';

export default function EmailList({ emails, onEmailClick, onStarToggle }) {
  return (
    <Box sx={{ flex: 1, overflowY: 'auto' }}>
      {emails.map((email) => (
        <Box
          key={email.id}
          onClick={() => onEmailClick(email)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: 1,
            py: 0.5,
            cursor: 'pointer',
            bgcolor: email.read ? 'transparent' : 'rgba(138,180,248,0.04)',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.06)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            },
            transition: 'background 0.15s',
          }}
        >
          <Checkbox
            size="small"
            sx={{ color: '#9aa0a6', '&.Mui-checked': { color: '#8ab4f8' } }}
            onClick={(e) => e.stopPropagation()}
          />
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onStarToggle(email.id);
            }}
            sx={{ mr: 1 }}
          >
            {email.starred ? (
              <Star sx={{ fontSize: 20, color: '#FBBC04' }} />
            ) : (
              <StarBorder sx={{ fontSize: 20, color: '#9aa0a6' }} />
            )}
          </IconButton>

          <Avatar
            sx={{
              width: 32,
              height: 32,
              fontSize: '0.75rem',
              bgcolor: email.avatarColor,
              mr: 1.5,
              fontWeight: 600,
            }}
          >
            {email.avatar}
          </Avatar>

          <Box sx={{ width: 180, minWidth: 180, mr: 2 }}>
            <Typography
              variant="body2"
              noWrap
              sx={{
                color: '#e8eaed',
                fontWeight: email.read ? 400 : 700,
                fontSize: '0.875rem',
              }}
            >
              {email.from}
            </Typography>
          </Box>

          <Box sx={{ flex: 1, overflow: 'hidden', mr: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="body2"
                noWrap
                sx={{
                  color: '#e8eaed',
                  fontWeight: email.read ? 400 : 600,
                  fontSize: '0.875rem',
                }}
              >
                {email.subject}
              </Typography>
              <Typography
                variant="body2"
                noWrap
                sx={{
                  color: '#9aa0a6',
                  fontSize: '0.8rem',
                  flex: 1,
                }}
              >
                — {email.preview}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mr: 1 }}>
            {email.labels.map((label) => (
              <Chip
                key={label}
                label={label}
                size="small"
                sx={{
                  height: 20,
                  fontSize: '0.7rem',
                  bgcolor: 'rgba(255,255,255,0.08)',
                  color: '#9aa0a6',
                }}
              />
            ))}
          </Box>

          <Typography
            variant="caption"
            sx={{
              color: email.read ? '#9aa0a6' : '#e8eaed',
              fontWeight: email.read ? 400 : 600,
              whiteSpace: 'nowrap',
              minWidth: 50,
              textAlign: 'right',
            }}
          >
            {email.date}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
