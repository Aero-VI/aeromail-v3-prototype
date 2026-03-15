import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Stepper, Step, StepLabel, Chip, Switch, FormControlLabel, Divider, InputAdornment } from '@mui/material';
import { Email, ArrowBack, ArrowForward, Check, Add, Dns, Security, Settings, Domain } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const steps = ['Mail Server', 'Domains', 'Security', 'Review'];
const fieldSx = {
  '& .MuiOutlinedInput-root': { bgcolor: '#1f1f1f', '& fieldset': { borderColor: '#3c4043' }, '&:hover fieldset': { borderColor: '#5f6368' }, '&.Mui-focused fieldset': { borderColor: '#8ab4f8' } },
  '& .MuiInputLabel-root': { color: '#9aa0a6' }, '& .MuiInputLabel-root.Mui-focused': { color: '#8ab4f8' },
};

export default function AdminSetup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [cfg, setCfg] = useState({ imapHost: '', imapPort: '993', smtpHost: '', smtpPort: '587', domains: [], newDomain: '', enforceSSL: true, allowSelfSigned: false, sessionTimeout: '24' });

  const addDomain = () => {
    if (cfg.newDomain && !cfg.domains.includes(cfg.newDomain)) setCfg({ ...cfg, domains: [...cfg.domains, cfg.newDomain], newDomain: '' });
  };

  const renderStep = () => {
    switch (step) {
      case 0: return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}><Dns sx={{ color: '#8ab4f8' }} /><Typography variant="h6" sx={{ color: '#e8eaed' }}>Mail Server Configuration</Typography></Box>
          <Typography variant="body2" sx={{ color: '#9aa0a6' }}>Configure the IMAP and SMTP server details. Users will not see these settings.</Typography>
          <Divider sx={{ borderColor: '#3c4043' }} />
          <Typography variant="subtitle2" sx={{ color: '#8ab4f8' }}>Incoming Mail (IMAP)</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField fullWidth label="IMAP Server" value={cfg.imapHost} onChange={e => setCfg({ ...cfg, imapHost: e.target.value })} sx={fieldSx} />
            <TextField label="Port" value={cfg.imapPort} onChange={e => setCfg({ ...cfg, imapPort: e.target.value })} sx={{ ...fieldSx, width: 120 }} />
          </Box>
          <Typography variant="subtitle2" sx={{ color: '#8ab4f8', mt: 1 }}>Outgoing Mail (SMTP)</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField fullWidth label="SMTP Server" value={cfg.smtpHost} onChange={e => setCfg({ ...cfg, smtpHost: e.target.value })} sx={fieldSx} />
            <TextField label="Port" value={cfg.smtpPort} onChange={e => setCfg({ ...cfg, smtpPort: e.target.value })} sx={{ ...fieldSx, width: 120 }} />
          </Box>
        </Box>
      );
      case 1: return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}><Domain sx={{ color: '#8ab4f8' }} /><Typography variant="h6" sx={{ color: '#e8eaed' }}>Allowed Email Domains</Typography></Box>
          <Typography variant="body2" sx={{ color: '#9aa0a6' }}>Add the email domains users can sign in with. Only users with these domains will be able to access AeroMail.</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField fullWidth label="Domain" placeholder="example.com" value={cfg.newDomain}
              onChange={e => setCfg({ ...cfg, newDomain: e.target.value })}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addDomain())} sx={fieldSx}
              InputProps={{ startAdornment: <InputAdornment position="start"><Typography sx={{ color: '#9aa0a6' }}>@</Typography></InputAdornment> }} />
            <Button variant="outlined" onClick={addDomain} sx={{ borderColor: '#3c4043', color: '#8ab4f8', minWidth: 48 }}><Add /></Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, minHeight: 40 }}>
            {cfg.domains.map(d => <Chip key={d} label={d} onDelete={() => setCfg({ ...cfg, domains: cfg.domains.filter(x => x !== d) })} sx={{ bgcolor: '#3c4043', color: '#e8eaed', '& .MuiChip-deleteIcon': { color: '#9aa0a6' } }} />)}
            {cfg.domains.length === 0 && <Typography variant="body2" sx={{ color: '#5f6368', fontStyle: 'italic' }}>No domains added yet</Typography>}
          </Box>
        </Box>
      );
      case 2: return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}><Security sx={{ color: '#8ab4f8' }} /><Typography variant="h6" sx={{ color: '#e8eaed' }}>Security Settings</Typography></Box>
          <FormControlLabel control={<Switch checked={cfg.enforceSSL} onChange={e => setCfg({ ...cfg, enforceSSL: e.target.checked })} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#00897b' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#00897b' } }} />}
            label={<Box><Typography sx={{ color: '#e8eaed' }}>Enforce SSL/TLS</Typography><Typography variant="body2" sx={{ color: '#9aa0a6' }}>Require encrypted connections for all mail server communication</Typography></Box>} />
          <FormControlLabel control={<Switch checked={cfg.allowSelfSigned} onChange={e => setCfg({ ...cfg, allowSelfSigned: e.target.checked })} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#00897b' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#00897b' } }} />}
            label={<Box><Typography sx={{ color: '#e8eaed' }}>Allow Self-Signed Certificates</Typography><Typography variant="body2" sx={{ color: '#9aa0a6' }}>Not recommended for production use</Typography></Box>} />
          <TextField label="Session Timeout (hours)" value={cfg.sessionTimeout} type="number" onChange={e => setCfg({ ...cfg, sessionTimeout: e.target.value })} sx={{ ...fieldSx, width: 200 }} />
        </Box>
      );
      case 3: return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}><Settings sx={{ color: '#8ab4f8' }} /><Typography variant="h6" sx={{ color: '#e8eaed' }}>Review Configuration</Typography></Box>
          <Paper sx={{ p: 3, bgcolor: '#1f1f1f', border: '1px solid #3c4043' }}>
            <Typography variant="subtitle2" sx={{ color: '#8ab4f8', mb: 1 }}>Mail Server</Typography>
            <Typography variant="body2" sx={{ color: '#e8eaed' }}>IMAP: {cfg.imapHost || '(not set)'}:{cfg.imapPort}</Typography>
            <Typography variant="body2" sx={{ color: '#e8eaed' }}>SMTP: {cfg.smtpHost || '(not set)'}:{cfg.smtpPort}</Typography>
            <Divider sx={{ borderColor: '#3c4043', my: 2 }} />
            <Typography variant="subtitle2" sx={{ color: '#8ab4f8', mb: 1 }}>Domains</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {cfg.domains.length > 0 ? cfg.domains.map(d => <Chip key={d} label={d} size="small" sx={{ bgcolor: '#3c4043', color: '#e8eaed' }} />) : <Typography variant="body2" sx={{ color: '#5f6368' }}>None configured</Typography>}
            </Box>
            <Divider sx={{ borderColor: '#3c4043', my: 2 }} />
            <Typography variant="subtitle2" sx={{ color: '#8ab4f8', mb: 1 }}>Security</Typography>
            <Typography variant="body2" sx={{ color: '#e8eaed' }}>SSL/TLS: {cfg.enforceSSL ? 'Enforced' : 'Optional'}</Typography>
            <Typography variant="body2" sx={{ color: '#e8eaed' }}>Self-signed certs: {cfg.allowSelfSigned ? 'Allowed' : 'Rejected'}</Typography>
            <Typography variant="body2" sx={{ color: '#e8eaed' }}>Session timeout: {cfg.sessionTimeout}h</Typography>
          </Paper>
        </Box>
      );
      default: return null;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#1f1f1f', backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(0,137,123,0.06) 0%, transparent 60%)' }}>
      <Paper elevation={8} sx={{ p: 5, width: 680, bgcolor: '#2a2a2a', borderRadius: 3, border: '1px solid #3c4043' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 4 }}>
          <Box sx={{ width: 36, height: 36, borderRadius: 1.5, background: 'linear-gradient(135deg, #00bcd4 0%, #009688 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Email sx={{ color: '#fff', fontSize: 22 }} />
          </Box>
          <Typography variant="h5" sx={{ color: '#e8eaed', fontWeight: 600 }}>AeroMail Setup</Typography>
        </Box>
        <Stepper activeStep={step} sx={{ mb: 4, '& .MuiStepLabel-label': { color: '#9aa0a6' }, '& .MuiStepLabel-label.Mui-active': { color: '#e8eaed' }, '& .MuiStepLabel-label.Mui-completed': { color: '#81c995' }, '& .MuiStepIcon-root': { color: '#3c4043' }, '& .MuiStepIcon-root.Mui-active': { color: '#00897b' }, '& .MuiStepIcon-root.Mui-completed': { color: '#81c995' }, '& .MuiStepConnector-line': { borderColor: '#3c4043' } }}>
          {steps.map(l => <Step key={l}><StepLabel>{l}</StepLabel></Step>)}
        </Stepper>
        {renderStep()}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button disabled={step === 0} onClick={() => setStep(s => s - 1)} startIcon={<ArrowBack />} sx={{ color: '#9aa0a6' }}>Back</Button>
          {step < steps.length - 1
            ? <Button variant="contained" onClick={() => setStep(s => s + 1)} endIcon={<ArrowForward />} sx={{ bgcolor: '#00897b', '&:hover': { bgcolor: '#00796b' } }}>Next</Button>
            : <Button variant="contained" onClick={() => navigate('/')} endIcon={<Check />} sx={{ bgcolor: '#00897b', '&:hover': { bgcolor: '#00796b' } }}>Complete Setup</Button>
          }
        </Box>
      </Paper>
    </Box>
  );
}
