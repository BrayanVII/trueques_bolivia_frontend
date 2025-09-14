import React, { useState } from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      {!user ? (
        <Home setUser={setUser} />
      ) : (
        <Dashboard user={user} setUser={setUser} />
      )}
    </>
  );
}

export default App;
