import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Divider,
  Chip,
  Button,
} from '@mui/material';
import {
  ArrowBack,
  Star,
  StarBorder,
  Reply,
  Forward,
  MoreVert,
  Print,
  OpenInNew,
  Delete,
  Archive,
  Report,
  Label,
} from '@mui/icons-material';

export default function ThreadView({ email, onBack, onStarToggle }) {
  if (!email) return null;

  return (
    <Box sx={{ flex: 1, overflowY: 'auto', bgcolor: '#1f1f1f' }}>
      {/* Toolbar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 1,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          gap: 0.5,
        }}
      >
        <IconButton onClick={onBack} sx={{ color: '#9aa0a6' }}>
          <ArrowBack />
        </IconButton>
        <IconButton sx={{ color: '#9aa0a6' }}><Archive /></IconButton>
        <IconButton sx={{ color: '#9aa0a6' }}><Report /></IconButton>
        <IconButton sx={{ color: '#9aa0a6' }}><Delete /></IconButton>
        <Box sx={{ flex: 1 }} />
        <IconButton sx={{ color: '#9aa0a6' }}><Print /></IconButton>
        <IconButton sx={{ color: '#9aa0a6' }}><OpenInNew /></IconButton>
      </Box>

      {/* Subject */}
      <Box sx={{ px: 5, pt: 3, pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h5" sx={{ color: '#e8eaed', fontWeight: 400, flex: 1 }}>
            {email.subject}
          </Typography>
          {email.labels.map((label) => (
            <Chip
              key={label}
              label={label}
              size="small"
              sx={{
                bgcolor: 'rgba(255,255,255,0.08)',
                color: '#9aa0a6',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Message */}
      <Box sx={{ px: 5, py: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: email.avatarColor,
              fontWeight: 600,
              mr: 2,
              mt: 0.5,
            }}
          >
            {email.avatar}
          </Avatar>

          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Typography variant="body1" sx={{ color: '#e8eaed', fontWeight: 600, mr: 1 }}>
                {email.from}
              </Typography>
              <Typography variant="caption" sx={{ color: '#9aa0a6' }}>
                &lt;{email.email}&gt;
              </Typography>
              <Box sx={{ flex: 1 }} />
              <Typography variant="caption" sx={{ color: '#9aa0a6', mr: 1 }}>
                {email.date}, 2026
              </Typography>
              <IconButton
                size="small"
                onClick={() => onStarToggle(email.id)}
              >
                {email.starred ? (
                  <Star sx={{ fontSize: 20, color: '#FBBC04' }} />
                ) : (
                  <StarBorder sx={{ fontSize: 20, color: '#9aa0a6' }} />
                )}
              </IconButton>
              <IconButton size="small" sx={{ color: '#9aa0a6' }}>
                <MoreVert sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>
            <Typography variant="caption" sx={{ color: '#9aa0a6' }}>
              to me
            </Typography>
          </Box>
        </Box>

        <Box sx={{ pl: 7 }}>
          <Typography
            variant="body1"
            sx={{
              color: '#e8eaed',
              whiteSpace: 'pre-line',
              lineHeight: 1.7,
              fontSize: '0.9rem',
            }}
          >
            {email.body}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', my: 4 }} />

        <Box sx={{ pl: 7, display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<Reply />}
            sx={{
              borderColor: 'rgba(255,255,255,0.2)',
              color: '#e8eaed',
              borderRadius: '20px',
              textTransform: 'none',
              '&:hover': { borderColor: 'rgba(255,255,255,0.4)', bgcolor: 'rgba(255,255,255,0.04)' },
            }}
          >
            Reply
          </Button>
          <Button
            variant="outlined"
            startIcon={<Forward />}
            sx={{
              borderColor: 'rgba(255,255,255,0.2)',
              color: '#e8eaed',
              borderRadius: '20px',
              textTransform: 'none',
              '&:hover': { borderColor: 'rgba(255,255,255,0.4)', bgcolor: 'rgba(255,255,255,0.04)' },
            }}
          >
            Forward
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
