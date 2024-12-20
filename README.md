# CoderBlog

[Live WebLink](https://coder-blog-application.netlify.app/)

CoderBlog is a blogging platform designed for coders, allowing them to easily create, read, update, and delete blog posts and comments. The app integrates a rich text editor powered by Tiptap, offering a seamless content management experience.

## Features

- **CRUD Operations:** Effortlessly manage blog posts and comments.
- **Rich Text Editor:** A customizable and intuitive editing interface powered by Tiptap.
- **API Management:** Utilizes Tanstack/React Query for efficient API calls and caching.
- **Type-safe Form Validation:** React-hook-form combined with Zod ensures robust and - type-safe form validation.
- **Image Handling:** Implements Multer and Sharp for efficient image storage, compression, and rendering.
- **User Authentication:** JWT authentication with email verification for account activation via Nodemailer.
- **Guest/Anonymous Login:** Allows users to access certain routes with read-only permissions, even without logging in.

## Development Setup
- **Frameworks:** Built with Vite and TypeScript for a fast, type-safe development experience.
- **Code Quality:** Prettier for consistent code formatting and ESLint for linting checks.
- **Styling:** Responsive UI design powered by Tailwind CSS.
- **Routing:** Client-side routing with React Router for dynamic page navigation.

## Tech Stack

### Frontend
- React.js
- Tiptap
- React Router
- Tanstack/React Query
- React-hook-form
- React-hot-toast
- Zod
- React-lazy-load-image-component
- React-error-boundary
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Bcrypt
- Jsonwebtoken
- Multer
- Sharp
- Compression
- Cloudinary
- Mongoose

## Development Resources

### Referred Blogs
- API Layer: [Building an API Layer with React](https://profy.dev/article/react-architecture-api-layer)
- React/TanStack Query: [Best Practices with React-Query](https://majidlotfinia.medium.com/react-query-best-practices-separating-concerns-with-custom-hooks-3f1bc9051fa2)
- React Routing: 
    - [Lazy Loading Routes in Remix](https://remix.run/blog/lazy-loading-routes)
    - [Lazy Loading Routes in React Router](https://stackoverflow.com/questions/76340518/lazy-loading-routes-in-react-router-v6)
