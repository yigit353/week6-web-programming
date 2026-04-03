import BookList from './components/BookList'

/**
 * App Component - Root of the ByteBooks frontend application
 *
 * This is the top-level component that defines the overall page layout:
 * - Header with the store name and tagline
 * - Main content area containing the BookList component
 * - Footer with copyright information
 */
function App() {
  return (
    <div className="app">
      <header className="header">
        <h1 className="header-title">ByteBooks</h1>
        <p className="header-tagline">Browse Our Collection</p>
      </header>

      <main className="main-content">
        <BookList />
      </main>

      <footer className="footer">
        <p>&copy; 2026 ByteBooks. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
