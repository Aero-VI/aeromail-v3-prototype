import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminSetup from './pages/AdminSetup';
import MailLayout from './components/MailLayout';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminSetup />} />
        <Route path="*" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/*" element={<MailLayout onLogout={() => setIsLoggedIn(false)} />} />
    </Routes>
  );
}
