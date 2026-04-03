# How to Use - ByteBooks Frontend

Step-by-step instructions for running and testing both versions of the ByteBooks React frontend.

## Prerequisites

- **Node.js** (v18 or higher) - [nodejs.org](https://nodejs.org)
- **Python 3.10+** - For the FastAPI backend
- **npm** - Comes with Node.js

Verify your setup:
```bash
node --version   # Should show v18+
npm --version    # Should show 9+
python3 --version # Should show 3.10+
```

## Step 1: Start the Backend API

The backend must be running before either frontend version will work.

```bash
# Navigate to the backend directory
cd week4/bytebooks-api

# Create a virtual environment (first time only)
python3 -m venv venv

# Activate the virtual environment
source venv/bin/activate        # macOS/Linux
# venv\Scripts\activate         # Windows

# Install dependencies (first time only)
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`. Verify it works:
```bash
curl http://localhost:8000/books
```

You should see a JSON array of books. Keep this terminal open.

## Step 2a: Run Version 1 (CRUD App)

Open a **new terminal**:

```bash
# Navigate to v1 frontend
cd v1/bytebooks-frontend

# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```

Vite will start on `http://localhost:5173` (or the next available port). Open this URL in your browser.

### Testing v1

1. **View books**: The main page shows a grid of book cards with search and genre filter
2. **Search**: Type in the search box to filter books by title
3. **Filter**: Use the genre dropdown to filter by genre
4. **View details**: Click any book card to see the detail modal
5. **Add a book**: Click "Add New Book", fill the form, click "Add Book"
6. **Edit a book**: Click "Edit" on any card, modify fields, click "Update Book"
7. **Delete a book**: Click "Delete" on any card, confirm in the dialog

### Stopping v1

Press `Ctrl+C` in the terminal running the dev server.

## Step 2b: Run Version 2 (Dashboard)

Open a **new terminal**:

```bash
# Navigate to v2 frontend
cd v2/bytebooks-frontend

# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```

Vite will start on `http://localhost:5173` (or the next available port). Open this URL in your browser.

### Testing v2

**Dashboard page (default):**
1. Verify 4 stat cards appear with correct numbers
2. Check the data table shows all books with author names
3. Verify stock values < 10 are highlighted in red
4. Verify price formatting shows `$XX.XX`

**Books page:**
1. Click "Books" in the sidebar
2. Verify sidebar highlights "Books" and header shows "Books"
3. Test all CRUD operations (same as v1 testing above)
4. Verify the book grid shows 2+ columns on wide screens

**Authors page:**
1. Click "Authors" in the sidebar
2. Verify all authors appear as cards
3. Check book counts match the actual number of books per author

**Navigation:**
1. Click through Dashboard -> Books -> Authors -> Dashboard
2. Verify sidebar active state and header title update correctly
3. Scroll content and verify sidebar/header stay fixed

### Stopping v2

Press `Ctrl+C` in the terminal running the dev server.

## Running Both Versions Simultaneously

You can run v1 and v2 side by side on different ports:

```bash
# Terminal 1: Backend
cd week4/bytebooks-api && uvicorn main:app --reload

# Terminal 2: v1 frontend
cd v1/bytebooks-frontend && npm run dev -- --port 5173

# Terminal 3: v2 frontend
cd v2/bytebooks-frontend && npm run dev -- --port 5176
```

Then open:
- v1: `http://localhost:5173`
- v2: `http://localhost:5176`

## Troubleshooting

### "Failed to load books" or network errors
- Make sure the backend is running on port 8000
- v2 uses a Vite proxy (configured in `vite.config.js`), so API calls go through the dev server
- v1 calls `http://localhost:8000` directly, so CORS must be enabled on the backend

### Port already in use
- Kill the process: `lsof -ti:PORT | xargs kill -9` (replace PORT with 5173, 5176, etc.)
- Or let Vite auto-pick the next available port

### npm install fails
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- Make sure you're using Node.js v18+

### Blank page in browser
- Check the browser console (F12 -> Console) for errors
- Make sure you're on the correct port URL
