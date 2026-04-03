import { useState, useEffect } from 'react';

const API_BASE_URL = '';

/*
 * Dashboard Page
 *
 * Displays real-time statistics and a complete data table of all books.
 * Fetches from /books and /authors endpoints on mount.
 *
 * Stats calculated:
 * - Total Books: books.length
 * - Total Authors: authors.length
 * - Total Stock Value: sum of (price * stock) for each book
 * - Low Stock: count of books where stock < 10
 */
function Dashboard() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksRes, authorsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/books`),
          fetch(`${API_BASE_URL}/authors`),
        ]);

        if (!booksRes.ok || !authorsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const booksData = await booksRes.json();
        const authorsData = await authorsRes.json();
        setBooks(booksData);
        setAuthors(authorsData);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError('Failed to load dashboard data. Make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Delete handler for table actions
  const handleDelete = async (book) => {
    if (!window.confirm(`Are you sure you want to delete "${book.title}"?`)) return;
    try {
      const res = await fetch(`${API_BASE_URL}/books/${book.id}`, { method: 'DELETE' });
      if (res.status === 204) {
        setBooks((prev) => prev.filter((b) => b.id !== book.id));
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.detail || 'Failed to delete book.');
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button className="retry-btn" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  // Calculate stats
  const totalBooks = books.length;
  const totalAuthors = authors.length;
  const totalStockValue = books.reduce((sum, b) => sum + b.price * b.stock, 0);
  const lowStockCount = books.filter((b) => b.stock < 10).length;

  const stats = [
    { label: 'Total Books', value: totalBooks, icon: '📚' },
    { label: 'Total Authors', value: totalAuthors, icon: '✍️' },
    { label: 'Stock Value', value: `$${totalStockValue.toFixed(2)}`, icon: '💰' },
    { label: 'Low Stock', value: lowStockCount, icon: '⚠️' },
  ];

  return (
    <div>
      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="stat-info">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
            </div>
            <div className="stat-icon">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Books Data Table */}
      <div className="table-section">
        <div className="table-header">
          <h2 className="table-title">All Books</h2>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Genre</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author?.name || 'Unknown'}</td>
                  <td className="price-cell">${book.price.toFixed(2)}</td>
                  <td className={book.stock < 10 ? 'stock-low' : ''}>
                    {book.stock}
                  </td>
                  <td>{book.genre || '—'}</td>
                  <td>
                    <button
                      className="action-btn action-btn-edit"
                      onClick={() => alert('Edit from Books page')}
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn action-btn-delete"
                      onClick={() => handleDelete(book)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
