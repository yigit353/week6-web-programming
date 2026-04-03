import '../styles/dashboard.css';

/*
 * DashboardLayout - Main layout component
 *
 * Implements a fixed sidebar + header + scrollable content area pattern.
 * The sidebar is 250px wide and stays fixed on the left.
 * The header is 60px tall and spans the remaining width.
 * The main content fills the rest with a light gray background.
 */

// Navigation items configuration
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'books', label: 'Books', icon: '📚' },
  { id: 'authors', label: 'Authors', icon: '✍️' },
];

// Map page IDs to display titles for the header
const PAGE_TITLES = {
  dashboard: 'Dashboard',
  books: 'Books',
  authors: 'Authors',
};

function DashboardLayout({ activePage, setActivePage, children }) {
  return (
    <div className="dashboard-layout">
      {/* Sidebar - Fixed left navigation */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="sidebar-logo-icon">📖</span>
          ByteBooks Admin
        </div>
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>
      </aside>

      {/* Header - Fixed top bar */}
      <header className="header">
        <h1 className="header-title">{PAGE_TITLES[activePage]}</h1>
        <div className="header-user">
          <span>Admin User</span>
          <div className="header-avatar">AU</div>
        </div>
      </header>

      {/* Main Content - Scrollable area */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
