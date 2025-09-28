# Auth API

Blog API with auth and role-based access: authors manage posts, readers view them.

## Technologies

- `Node.js`
- `Express.js`
- `Supabase`

## Features

- ✅ User registration with name, email, password & role
- 🔑 Secure login with JWT authentication
- 📝 Role-based access control:
    - Reader → Can view all posts & single posts
    - Author → Can create, update & delete their posts
- 📚 Manage blog posts with title & content

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account

## Running the Project

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `node server.js`
4. Open `http://localhost:3000` in your browser

## Preview

### Get All Posts
```http
GET /posts
```

**Response:**
```json
[
 {
    "id": "1",
    "title": "First Blog Post",
    "content": "This is the content of the first blog post."
 }
]
```
