# Task Management Application

This project is a full-stack Task Management Application with a React frontend and a Node.js/Express backend.

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB (local or cloud)
- Git (for cloning)
- Yarn or npm (for package management)

### Cloning the Repository

You can clone the repository using either HTTPS or SSH. Choose the method that best suits your setup:

- **Using HTTPS**:

```bash
  git clone https://github.com/Dozr13/todo-app.git
```

- **Using SSH**:

```bash
  git clone git@github.com:Dozr13/todo-app.git
```

- **After cloning, navigate to the project directory and follow next steps**

```bash
  cd todo-app
```

### Backend Setup

1. Navigate to the `todo-backend` directory.

   ```bash
   cd todo-backend
   ```

2. Create a `.env` file with necessary configurations (refer to the example .env section).
3. Install dependencies (choose one): `yarn install` or `npm install`.
4. Start the server (choose one): `yarn start` or `npm start`.

### Frontend Setup

1. Navigate to the `todo-frontend` directory.

   ```bash
   cd todo-frontend
   ```

2. Create a `.env` file with `REACT_APP_API_URL=http://localhost:3001`.
3. Install dependencies (choose one): `yarn install` or `npm install`.
4. Start the server (choose one): `yarn start` or `npm start`.

## Example .env Configuration

### Backend .env

```env
JWT_SECRET=YourJWTSecretKey
MONGO_URI=YourMongoDBConnectionString
PORT=3001
```

### Frontend .env

```env
REACT_APP_BACKEND_URL=http://localhost:3001
```

## Project Structure

- `/todo-backend`: Node.js/Express server.
- `/todo-frontend`: React application.
- `README.md`: Project setup and information.
- `.gitignore`: Specifies intentionally untracked files to ignore.

## Evaluation Criteria

- **Code Structure**: Well-structured React components and organized Node.js server code.
- **API Design**: Clear and effective RESTful API design.
- **Data Management**: Efficient task management on the backend.
- **User Interface**: Responsive and user-friendly interface.
