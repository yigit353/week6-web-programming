You are working on the ByteBooks React frontend application that was built in Week 4 (check week4 folder). The app currently displays a list of books with search functionality, and has individual book detail views. The backend FastAPI server is running on http://localhost:8000 with the following relevant endpoints:

- GET /api/books - Returns list of all books
- GET /api/books/{id} - Returns a single book by ID
- POST /api/books - Creates a new book (expects JSON body with: title, author_id, price, isbn, genre, stock)
- PUT /api/books/{id} - Updates a book (expects JSON body with same fields)
- DELETE /api/books/{id} - Deletes a book
- GET /api/authors - Returns list of all authors (each has: id, name)

Extend the existing React application to add form-based CRUD functionality. Do NOT create a new app - modify the existing bytebooks-frontend app.

Requirements:

1. Create an AddBookForm Component:
   - File location: src/components/AddBookForm.jsx
   - Use controlled components (React state for each form field)
   - Form fields:
     * Title: text input, required
     * Author: select dropdown populated from GET /api/authors, show author names but submit author_id
     * Price: number input, min 0, step 0.01, required
     * ISBN: text input, required, placeholder "978-0-123456-78-9"
     * Genre: select dropdown with options - Fiction, Non-Fiction, Sci-Fi, Mystery, Romance, Biography, Technical
     * Stock: number input, min 0, default 0, required
   - Submit button labeled "Add Book"
   - Form state: Use a single state object with all fields, OR individual useState for each field (choose the cleaner approach)
   - Fetch authors on component mount using useEffect to populate the author dropdown
   - Handle form submission:
     * event.preventDefault() to prevent page reload
     * Validate all required fields are filled, show alert if any are empty
     * Send POST request to http://localhost:8000/api/books with JSON body containing all form fields
     * Set loading state to true during submission, disable submit button and change text to "Adding..."
     * On success (response.ok):
       - Clear the form (reset all fields to empty/default values)
       - Call a callback function passed as prop to refresh the book list
       - Show a success message (use browser alert or add a success message state)
     * On error:
       - Parse the error response JSON
       - Display the error message from the API (e.g., "ISBN already exists")
       - Keep the form data so user can correct and resubmit
     * Set loading state to false after response is received
   - Style the form to match the existing app design: clean, modern, good spacing, focus states on inputs

2. Create an EditBookForm Component:
   - File location: src/components/EditBookForm.jsx
   - Similar to AddBookForm but:
     * Accept a "book" prop with existing book data
     * Pre-populate all form fields with book data when component mounts
     * Submit button labeled "Update Book"
     * Send PUT request to http://localhost:8000/api/books/{book.id} instead of POST
     * On success: Call callback to refresh list and close the edit form

3. Modify the Book List Component:
   - Add a state to control which mode: "view" (default), "add", or "edit"
   - Add an "Add New Book" button at the top that sets mode to "add"
   - When mode is "add": Display the AddBookForm component
   - When mode is "edit": Display the EditBookForm component with selected book data
   - Add an "Edit" button on each book card that:
     * Sets mode to "edit"
     * Saves the selected book in state
     * Shows the EditBookForm pre-populated with that book's data
   - Add a "Delete" button on each book card that:
     * Shows a browser confirm dialog: "Are you sure you want to delete {book.title}?"
     * If user confirms: Send DELETE request to http://localhost:8000/api/books/{book.id}
     * On success: Refresh the book list to remove the deleted book
     * On error: Show error message
   - Create a refetch function that re-fetches the book list from GET /api/books and updates state
   - Pass this refetch function as a callback to AddBookForm and EditBookForm

4. Error Handling:
   - Wrap all fetch calls in try-catch blocks
   - Check response.ok before parsing JSON
   - If response is not ok: Parse error JSON and display error.detail or a generic message
   - Display errors prominently to the user (alert dialog is fine, or add error message state)
   - Console.log errors for debugging

5. Loading States:
   - Show loading spinner or "Loading..." text while fetching authors for the dropdown
   - Disable submit button and show "Adding..." or "Updating..." text during form submission
   - Consider adding a loading state while refetching the book list after add/edit/delete

6. Code Quality:
   - Use async/await for all fetch calls
   - Extract the API base URL to a constant: const API_BASE_URL = 'http://localhost:8000/api'
   - Add prop-types or TypeScript types if the existing app uses them
   - Include comments explaining the controlled component pattern and form submission flow
   - Follow the existing code style and file structure of the app

The result should be a fully functional CRUD interface where users can:
- View the list of books (existing functionality)
- Click "Add New Book" to show a form and create a new book
- Click "Edit" on any book to pre-populate the form and update that book
- Click "Delete" on any book to remove it (with confirmation)
- See the book list automatically refresh after any add/edit/delete operation
- See appropriate loading states and error messages

Ensure the forms are user-friendly with proper validation, clear error messages, and good UX (disabled buttons during submission, form clearing on success, etc.)
