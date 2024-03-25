# StreamLine

A dynamic React blogging platform for crafting and sharing content across diverse categories, with options to allow users to comment on different posts.

![image](https://github.com/alien-droid/StreamLine---Blogging-Platform/assets/77412085/2605e4c9-5628-42dd-920f-0e1d4a2ceace)

# Technologies Used
1. ReactJS for the UI Design
2. Node/ExpressJS for the Backend.
3. MongoDB for the Database Storage.

## Libraries Used:
- React
- React-Router
- React-Quill (For Editor Purposes) [Ref](https://www.npmjs.com/package/react-quill)
- React-Mutli-Select-Component (To add tags). [Ref](https://www.npmjs.com/package/react-multi-select-component)
- React-Toastify (For showing toast-based messages) [Ref](https://github.com/fkhadra/react-toastify)
- date-fns (A Date-based formatting util) [Ref](https://www.npmjs.com/package/react-multi-select-component)
- Bcryptjs (To store hashed passwords) [Ref](https://www.npmjs.com/package/bcrypt)
- JWT (JSON Web Tokens for authorization/authentication) : [Ref](https://www.npmjs.com/package/jsonwebtoken)
- Multer (To Handle 'File' Upload) : [Ref](https://www.npmjs.com/package/multer)

### Instructions (for execution):
- The project has been divided into two subparts: client (for React), and server (for node/express).
- For running both ends, we need to install the necessary dependencies, so run `npm install` on respective folders.
- After the dependencies are installed, we can individually run both ends.
  -- For running the server (back-end), execute `npm run dev` (running on port 4000, by default)
  -- For running the client (front-end), execute `npm start` (running on port 3000).

- The server folder contains a '.env' which has  the following environment variables:
  -- MONGODB_URI - Your Mongo DB URI (for storage purposes).
  -- PORT - Default port to run the server application.
  -- JWT_SECRET - a random string (20 bytes) used to generate JSON web tokens.
