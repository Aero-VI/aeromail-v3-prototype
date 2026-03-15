import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Divider, Switch, FormControlLabel, TextField, Select, MenuItem, Button, Chip, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { ArrowBack, Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { mockLabels, mockFilters } from '../data/mockEmails';

function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ py: 3 }}>{children}</Box> : null;
}

const settingSx = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.5, borderBottom: '1px solid rgba(60,64,67,0.3)' };

export default function SettingsPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/')} sx={{ color: '#9aa0a6', mr: 1 }}><ArrowBack /></IconButton>
        <Typography variant="h6" sx={{ color: '#e8eaed', fontWeight: 400 }}>Settings</Typography>
      </Box>

      <Tabs value={tab} onChange={(_, v) => setTab(v)}
        sx={{ borderBottom: '1px solid #3c4043', mb: 0,
          '& .MuiTab-root': { color: '#9aa0a6', textTransform: 'none', minWidth: 80, fontSize: '0.85rem' },
          '& .Mui-selected': { color: '#8ab4f8' },
          '& .MuiTabs-indicator': { bgcolor: '#8ab4f8' } }}>
        <Tab label="General" />
        <Tab label="Labels" />
        <Tab label="Filters" />
      </Tabs>

      {/* General */}
      <TabPanel value={tab} index={0}>
        <Typography variant="subtitle2" sx={{ color: '#8ab4f8', mb: 2 }}>Display</Typography>
        <Box sx={settingSx}>
          <Box>
            <Typography sx={{ color: '#e8eaed', fontSize: '0.875rem' }}>Maximum page size</Typography>
            <Typography variant="body2" sx={{ color: '#9aa0a6' }}>Number of conversations per page</Typography>
          </Box>
          <Select size="small" defaultValue={50} sx={{ color: '#e8eaed', bgcolor: '#303134', width: 100, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#3c4043' } }}>
            <MenuItem value={25}>25</MenuItem><MenuItem value={50}>50</MenuItem><MenuItem value={100}>100</MenuItem>
          </Select>
        </Box>
        <Box sx={settingSx}>
          <Box>
            <Typography sx={{ color: '#e8eaed', fontSize: '0.875rem' }}>Conversation view</Typography>
            <Typography variant="body2" sx={{ color: '#9aa0a6' }}>Group related messages into conversations</Typography>
          </Box>
          <Switch defaultChecked sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#00897b' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#00897b' } }} />
        </Box>
        <Box sx={settingSx}>
          <Box>
            <Typography sx={{ color: '#e8eaed', fontSize: '0.875rem' }}>Undo Send period</Typography>
            <Typography variant="body2" sx={{ color: '#9aa0a6' }}>Time to cancel a sent message</Typography>
          </Box>
          <Select size="small" defaultValue={5} sx={{ color: '#e8eaed', bgcolor: '#303134', width: 100, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#3c4043' } }}>
            <MenuItem value={5}>5 sec</MenuItem><MenuItem value={10}>10 sec</MenuItem><MenuItem value={20}>20 sec</MenuItem><MenuItem value={30}>30 sec</MenuItem>
          </Select>
        </Box>
        <Box sx={settingSx}>
          <Box>
            <Typography sx={{ color: '#e8eaed', fontSize: '0.875rem' }}>Desktop notifications</Typography>
            <Typography variant="body2" sx={{ color: '#9aa0a6' }}>Show notifications for new emails</Typography>
          </Box>
          <Switch defaultChecked sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#00897b' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#00897b' } }} />
        </Box>

        <Divider sx={{ borderColor: '#3c4043', my: 3 }} />
        <Typography variant="subtitle2" sx={{ color: '#8ab4f8', mb: 2 }}>Compose</Typography>
        <Box sx={settingSx}>
          <Box>
            <Typography sx={{ color: '#e8eaed', fontSize: '0.875rem' }}>Default reply behavior</Typography>
            <Typography variant="body2" sx={{ color: '#9aa0a6' }}>Choose whether to reply or reply all by default</Typography>
          </Box>
          <Select size="small" defaultValue="reply" sx={{ color: '#e8eaed', bgcolor: '#303134', width: 140, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#3c4043' } }}>
            <MenuItem value="reply">Reply</MenuItem><MenuItem value="reply-all">Reply all</MenuItem>
          </Select>
        </Box>
        <Box sx={settingSx}>
          <Box>
            <Typography sx={{ color: '#e8eaed', fontSize: '0.875rem' }}>Default text style</Typography>
            <Typography variant="body2" sx={{ color: '#9aa0a6' }}>Font used for composing messages</Typography>
          </Box>
          <Select size="small" defaultValue="sans" sx={{ color: '#e8eaed', bgcolor: '#303134', width: 140, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#3c4043' } }}>
            <MenuItem value="sans">Sans Serif</MenuItem><MenuItem value="serif">Serif</MenuItem><MenuItem value="mono">Monospace</MenuItem>
          </Select>
        </Box>

        <Divider sx={{ borderColor: '#3c4043', my: 3 }} />
        <Typography variant="subtitle2" sx={{ color: '#8ab4f8', mb: 2 }}>Signature</Typography>
        <TextField fullWidth multiline minRows={3} placeholder="Enter your email signature..." variant="outlined"
          sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#1f1f1f', color: '#e8eaed', '& fieldset': { borderColor: '#3c4043' }, '&:hover fieldset': { borderColor: '#5f6368' }, '&.Mui-focused fieldset': { borderColor: '#8ab4f8' } } }} />

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" sx={{ bgcolor: '#00897b', '&:hover': { bgcolor: '#00796b' }, borderRadius: '18px', px: 3 }}>Save Changes</Button>
        </Box>
      </TabPanel>

      {/* Labels */}
      <TabPanel value={tab} index={1}>
        <Typography variant="subtitle2" sx={{ color: '#8ab4f8', mb: 2 }}>System labels</Typography>
        {['Inbox', 'Starred', 'Important', 'Sent', 'Drafts', 'Spam', 'Trash'].map(name => (
          <Box key={name} sx={settingSx}>
            <Typography sx={{ color: '#e8eaed', fontSize: '0.875rem' }}>{name}</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography variant="body2" sx={{ color: '#9aa0a6' }}>show</Typography>
              <Switch defaultChecked size="small" sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#00897b' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#00897b' } }} />
            </Box>
          </Box>
        ))}
        <Divider sx={{ borderColor: '#3c4043', my: 3 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#8ab4f8' }}>Custom labels</Typography>
          <Button size="small" sx={{ color: '#8ab4f8' }}>+ Create new label</Button>
        </Box>
        {mockLabels.map(l => (
          <Box key={l.id} sx={{ ...settingSx, alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: l.color }} />
              <Typography sx={{ color: '#e8eaed', fontSize: '0.875rem' }}>{l.name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" sx={{ color: '#9aa0a6' }}><Edit fontSize="small" /></IconButton>
              <IconButton size="small" sx={{ color: '#9aa0a6' }}><Delete fontSize="small" /></IconButton>
            </Box>
          </Box>
        ))}
      </TabPanel>

      {/* Filters */}
      <TabPanel value={tab} index={2}>
        <Typography variant="body2" sx={{ color: '#9aa0a6', mb: 3 }}>
          The following filters are applied to all incoming mail:
        </Typography>
        <Table size="small" sx={{ '& .MuiTableCell-root': { borderColor: '#3c4043', color: '#e8eaed', fontSize: '0.85rem' } }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#9aa0a6 !important', fontWeight: 600 }}>Matches</TableCell>
              <TableCell sx={{ color: '#9aa0a6 !important', fontWeight: 600 }}>Action</TableCell>
              <TableCell sx={{ color: '#9aa0a6 !important', fontWeight: 600 }} align="right">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockFilters.map(f => (
              <TableRow key={f.id} sx={{ '&:hover': { bgcolor: 'rgba(232,234,237,0.04)' } }}>
                <TableCell><code style={{ color: '#8ab4f8', background: '#303134', padding: '2px 6px', borderRadius: 4, fontSize: '0.8rem' }}>{f.matches}</code></TableCell>
                <TableCell>{f.action}</TableCell>
                <TableCell align="right">
                  <Typography component="span" sx={{ color: '#8ab4f8', cursor: 'pointer', mr: 2, fontSize: '0.8rem', '&:hover': { textDecoration: 'underline' } }}>edit</Typography>
                  <Typography component="span" sx={{ color: '#f28b82', cursor: 'pointer', fontSize: '0.8rem', '&:hover': { textDecoration: 'underline' } }}>delete</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ mt: 3 }}>
          <Button variant="outlined" sx={{ borderColor: '#3c4043', color: '#8ab4f8', borderRadius: '18px', '&:hover': { borderColor: '#5f6368' } }}>
            Create a new filter
          </Button>
        </Box>
      </TabPanel>
    </Box>
  );
}
