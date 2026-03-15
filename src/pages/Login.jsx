import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, InputAdornment, IconButton } from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const fieldSx = {
  '& .MuiOutlinedInput-root': { bgcolor: '#1f1f1f', '& fieldset': { borderColor: '#3c4043' }, '&:hover fieldset': { borderColor: '#5f6368' }, '&.Mui-focused fieldset': { borderColor: '#8ab4f8' } },
  '& .MuiInputLabel-root': { color: '#9aa0a6' }, '& .MuiInputLabel-root.Mui-focused': { color: '#8ab4f8' },
};

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Please enter both email and password'); return; }
    onLogin();
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#1f1f1f', backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(138,180,248,0.06) 0%, transparent 60%)' }}>
      <Paper elevation={8} sx={{ p: 5, width: 420, bgcolor: '#2a2a2a', borderRadius: 3, border: '1px solid #3c4043' }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 1 }}>
            <Box sx={{ width: 40, height: 40, borderRadius: 2, background: 'linear-gradient(135deg, #00bcd4 0%, #009688 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Email sx={{ color: '#fff', fontSize: 24 }} />
            </Box>
            <Typography variant="h5" sx={{ color: '#e8eaed', fontWeight: 600, letterSpacing: -0.5 }}>AeroMail</Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#9aa0a6', mt: 1 }}>Sign in to your email account</Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Email address" type="email" value={email} onChange={e => { setEmail(e.target.value); setError(''); }}
            placeholder="you@example.com" variant="outlined" sx={{ ...fieldSx, mb: 2.5 }}
            InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={{ color: '#9aa0a6', fontSize: 20 }} /></InputAdornment> }} />

          <TextField fullWidth label="Password" type={showPw ? 'text' : 'password'} value={password}
            onChange={e => { setPassword(e.target.value); setError(''); }} variant="outlined" sx={{ ...fieldSx, mb: 1 }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><Lock sx={{ color: '#9aa0a6', fontSize: 20 }} /></InputAdornment>,
              endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPw(!showPw)} edge="end" sx={{ color: '#9aa0a6' }}>{showPw ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}</IconButton></InputAdornment>,
            }} />

          {error && <Typography variant="body2" sx={{ color: '#f28b82', mt: 1, mb: 1 }}>{error}</Typography>}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2.5 }}>
            <Typography variant="body2" sx={{ color: '#8ab4f8', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Forgot password?</Typography>
          </Box>

          <Button fullWidth type="submit" variant="contained" size="large"
            sx={{ py: 1.5, bgcolor: '#00897b', '&:hover': { bgcolor: '#00796b' }, fontWeight: 600, fontSize: '0.95rem', borderRadius: 2 }}>
            Sign In
          </Button>
        </form>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#9aa0a6' }}>
            Powered by <Box component="span" sx={{ color: '#e8eaed', fontWeight: 500 }}>Aeroverra</Box>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
