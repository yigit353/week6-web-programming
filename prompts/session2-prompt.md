You are working on the ByteBooks React frontend application. In the previous session (Session 1, check v1 folder), you added full CRUD functionality with forms to add, edit, and delete books. Now you will transform the entire application into a professional SaaS-style admin dashboard.

The backend FastAPI server is running on http://localhost:8000 with these endpoints:
- GET /api/books - Returns list of all books
- GET /api/authors - Returns list of all authors
- (All other CRUD endpoints from Session 1 still available)

Transform the existing React application into a complete dashboard layout. Do NOT create a new app - restructure the existing bytebooks-frontend app.

Requirements:

1. Dashboard Layout Structure:
   Create a new layout component (src/components/DashboardLayout.jsx) with:
   - Fixed sidebar on the left (250px wide, full height, dark background)
   - Header bar at the top (60px tall, spans full width minus sidebar, light background)
   - Main content area (fills remaining space, scrollable, light gray background)
   - Use CSS Flexbox or CSS Grid for the layout
   - Layout should be responsive: sidebar stays fixed, content scrolls

2. Sidebar Navigation:
   - Position: Fixed on the left, 250px wide, 100vh height
   - Background: Dark blue/gray (#1e293b or similar)
   - Content:
     * App logo/name "ByteBooks Admin" at the top with icon
     * Navigation menu with these links:
       - Dashboard (icon: 📊 or similar)
       - Books (icon: 📚)
       - Authors (icon: ✍️)
     * Each nav item: Icon + text, full-width clickable area
     * Active link highlighting: Different background color, left border accent
   - Styling:
     * Nav items: Padding 12px 20px, white text, hover effect (lighter background)
     * Active item: Lighter background, 3px left border in accent color (blue)
     * Smooth transitions on hover
   - State management: Track which page is active using React state

3. Header Bar:
   - Position: Fixed at top, 60px tall, starts after sidebar (margin-left: 250px)
   - Background: White with subtle bottom border/shadow
   - Content:
     * Left side: Page title (changes based on active page - "Dashboard", "Books", "Authors")
     * Right side: User info placeholder "Admin User" with avatar/icon
   - Styling: Flexbox with space-between, padding 0 2rem

4. Main Content Area:
   - Position: Starts below header and to the right of sidebar
   - Margin: top 60px, left 250px
   - Padding: 2rem
   - Background: Light gray (#f8fafc)
   - Height: calc(100vh - 60px)
   - Overflow: auto (scrollable)
   - Content changes based on active navigation item

5. Dashboard Page (shown when "Dashboard" nav is active):
   Create src/pages/Dashboard.jsx with:

   a) Stats Cards Section (at top):
      - Display 4 KPI cards in a row (responsive: 2x2 on small screens)
      - Each card: White background, rounded corners, padding, shadow
      - Stats to calculate and display:
        * Total Books: Count of all books from GET /api/books
        * Total Authors: Count of all authors from GET /api/authors
        * Total Stock Value: Sum of (price * stock) for all books
        * Low Stock Count: Count of books where stock < 10
      - Card layout: Title at top (gray text, small), big number in the middle (large, bold), icon on the right
      - Fetch data on component mount using useEffect
      - Show loading state while fetching

   b) Books Data Table Section (below stats):
      - Section heading: "All Books"
      - Table with columns: Title | Author | Price | Stock | Genre | Actions
      - Table styling:
        * White background, rounded corners, overflow hidden
        * Header row: Gray background, bold text, padding
        * Data rows: Alternating row colors (white, very light gray)
        * Hover effect on rows: Slightly darker background
        * Borders: Subtle borders between rows
      - Data: Fetch from GET /api/books
      - Author column: Display author name (you'll need to join with authors data or use author_id)
      - Price column: Format as currency ($XX.XX)
      - Stock column: Show number, highlight in red if < 10
      - Actions column: "Edit" and "Delete" buttons (small, styled)
      - Responsive: Table should scroll horizontally on small screens

6. Books Page (shown when "Books" nav is active):
   Create src/pages/BooksPage.jsx:
   - Display the existing book list and CRUD forms from Session 1
   - Keep all functionality: Add, Edit, Delete books
   - Adjust styling to match the new dashboard theme
   - Add a page heading: "Manage Books"

7. Authors Page (shown when "Authors" nav is active):
   Create src/pages/AuthorsPage.jsx:
   - Simple list of all authors from GET /api/authors
   - Display as cards or a simple list:
     * Author name
     * Author ID
     * Number of books by this author (optional: calculate from books data)
   - Page heading: "Authors"
   - Match dashboard styling
   - (No add/edit/delete functionality for authors - just a read-only list)

8. App.jsx Restructure:
   - Remove the old app structure
   - Use DashboardLayout as the root component
   - Implement simple client-side routing (no need for React Router - just conditional rendering):
     * State: const [activePage, setActivePage] = useState('dashboard')
     * Pass setActivePage to sidebar navigation
     * Conditionally render Dashboard, BooksPage, or AuthorsPage based on activePage
   - Example:
     ```jsx
     {activePage === 'dashboard' && <Dashboard />}
     {activePage === 'books' && <BooksPage />}
     {activePage === 'authors' && <AuthorsPage />}
     ```

9. Styling Requirements:
   - Create src/styles/dashboard.css or add to existing CSS:
   - Color scheme:
     * Sidebar background: #1e293b (dark blue-gray)
     * Sidebar text: #f1f5f9 (light gray)
     * Sidebar active: #334155 (lighter blue-gray) with #3b82f6 (blue) left border
     * Header background: #ffffff (white)
     * Main content background: #f8fafc (very light gray)
     * Card/table background: #ffffff (white)
     * Text: #1e293b (dark gray)
     * Accent color: #3b82f6 (blue)
   - Use box-shadow for cards, header, and sidebar for depth
   - Add hover transitions (0.2s ease) for interactive elements
   - Ensure proper spacing: 1-2rem padding/margins throughout
   - Make it look professional and polished like a real SaaS product (think Stripe, Vercel, Linear)

10. Code Quality:
    - Component structure: Separate components for layout, pages, cards, table
    - Reusable components: StatCard, DataTable if possible
    - Clean code: Extract constants for colors, API URLs, etc.
    - Comments: Explain the layout CSS (fixed sidebar, content positioning)
    - Error handling: Graceful fallbacks if API calls fail
    - Loading states: Show loading spinners while fetching data for dashboard stats

The result should be a complete, professional-looking admin dashboard where:
- Sidebar navigation switches between Dashboard, Books, and Authors pages
- Dashboard page shows real-time stats and a data table of all books
- Books page has full CRUD functionality (from Session 1)
- Authors page shows a simple list of authors
- The layout is clean, modern, and looks like a real SaaS product
- Everything is responsive and works smoothly

Focus on making it look polished and professional. This should feel like a real admin panel that students would see in production SaaS applications.
