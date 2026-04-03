import { useState } from 'react';

import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import BooksPage from './pages/BooksPage';
import AuthorsPage from './pages/AuthorsPage';

/**
 * App Component — Root of the ByteBooks Admin Dashboard
 *
 * Uses simple client-side routing via state: activePage determines which
 * page component is rendered inside the DashboardLayout. No external
 * router library is needed — conditional rendering handles navigation.
 */
function App() {
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <DashboardLayout activePage={activePage} setActivePage={setActivePage}>
      {activePage === 'dashboard' && <Dashboard />}
      {activePage === 'books' && <BooksPage />}
      {activePage === 'authors' && <AuthorsPage />}
    </DashboardLayout>
  );
}

export default App;
