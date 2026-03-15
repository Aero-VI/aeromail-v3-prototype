import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff, Email as EmailIcon } from '@mui/icons-material';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/inbox');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#1f1f1f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 5,
          width: 420,
          bgcolor: '#2d2d2d',
          borderRadius: 3,
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '16px',
              bgcolor: '#00BCD4',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <EmailIcon sx={{ fontSize: 32, color: '#fff' }} />
          </Box>
          <Typography variant="h5" sx={{ color: '#e8eaed', fontWeight: 600 }}>
            AeroMail
          </Typography>
          <Typography variant="body2" sx={{ color: '#9aa0a6', mt: 0.5 }}>
            Sign in to your account
          </Typography>
        </Box>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2.5 }}
            InputProps={{
              sx: { borderRadius: 2, color: '#e8eaed' },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
            InputProps={{
              sx: { borderRadius: 2, color: '#e8eaed' },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: '#9aa0a6' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              bgcolor: '#00BCD4',
              color: '#fff',
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: 2,
              '&:hover': { bgcolor: '#00ACC1' },
            }}
          >
            Sign in
          </Button>
        </form>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography
            variant="body2"
            sx={{ color: '#8ab4f8', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
          >
            Forgot password?
          </Typography>
          <Typography variant="body2" sx={{ color: '#9aa0a6', mt: 1.5 }}>
            Don&apos;t have an account?{' '}
            <Box component="span" sx={{ color: '#8ab4f8', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
              Create one
            </Box>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
