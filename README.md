# SkillSphere - Backend API

Welcome to the **SkillSphere** Backend API repository! 🚀

SkillSphere is a robust backend solution for a modern course-selling platform. It enables seamless user management, course handling, and purchase tracking while ensuring data integrity and security. This project leverages a RESTful API design and powerful technologies to deliver a scalable and efficient learning management system.

---

## 🌟 Features

- **User Authentication & Authorization**: 
  - Secure signup and login using hashed passwords and JWTs.
  - Middleware for protected routes.
- **Admin Management**: 
  - Admin-specific features for managing courses and users.
- **Course Management**: 
  - CRUD operations for courses (title, description, price, and instructor).
- **Purchase Tracking**: 
  - Track and retrieve user purchases and associated course data.
- **Error Handling**: 
  - Comprehensive error responses for seamless debugging and user feedback.

---

## 🛠️ Technologies Used

### **Backend Frameworks and Libraries**:
- **[Node.js](https://nodejs.org/)**: JavaScript runtime environment.
- **[Express.js](https://expressjs.com/)**: Web application framework.
- **[Zod](https://github.com/colinhacks/zod)**: Schema validation for request payloads.
- **[Bcrypt](https://github.com/kelektiv/node.bcrypt.js)**: Password hashing for secure authentication.
- **[Jsonwebtoken (JWT)](https://github.com/auth0/node-jsonwebtoken)**: Token-based authentication.

### **Database**:
- **[MongoDB](https://www.mongodb.com/)**: NoSQL database for scalable data storage.
- **[Mongoose](https://mongoosejs.com/)**: MongoDB object modeling for Node.js.

---

## 📂 Project Structure

SkillSphere
├── Middleware
│   ├── user.js                 # Middleware for user authentication
│   └── admin.js                # Middleware for admin authentication (added as per your context)
├── db.js                        # Database schemas and connection
├── routes
│   ├── user.js                 # User-related routes
│   ├── course.js               # Course-related routes
│   └── admin.js                # Admin-related routes (added as per your context)
├── config.js                    # Secret keys and environment configurations
├── server.js                    # Entry point of the application
├── package.json                 # Project dependencies and scripts
└── index.js                     # Main entry file for routing and setup (added outside of middleware and routes)


---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd SkillSphere
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file and add the following:
   ```env
   SECRET_USER_KEY=<your_secret_key>
   MONGO_URI=<your_mongo_database_uri>
   ```

4. Start the server:
   ```bash
   node server.js
   ```

5. Access the API at `http://localhost:3000`.

---

## 📖 API Endpoints

### **Auth Routes**
- `POST /signup` - Register a new user.
- `POST /signin` - Authenticate and retrieve a JWT.

### **User Routes**
- `GET /purchases` - Get all purchases made by the authenticated user.

### **Admin Routes**
- `POST /courses` - Add a new course (Admin only).
- `GET /courses` - Fetch all courses.
- `PUT /courses/:id` - Update course details (Admin only).
- `DELETE /courses/:id` - Delete a course (Admin only).

---

## 🔧 Development & Testing

### Linting
- Use ESLint to maintain code quality:
  ```bash
  npm run lint
  ```

### Testing
- Add unit and integration tests using your preferred testing framework.

---

## 🙌 Contributions

We welcome contributions to enhance SkillSphere! To contribute:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add feature name'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

---

## 💡 Future Improvements

- Add role-based access control (RBAC) for users and admins.
- Integrate payment gateways for purchases.
- Implement caching for optimized performance.
- Extend API for more advanced analytics.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

For questions or feedback, feel free to reach out on [LinkedIn](https://linkedin.com/) or via email at <your-email@example.com>.

---

Happy coding! 🎉
