import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddTaskForm from "./components/AddTaskForm";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />

        <Route path="/register" element={<RegisterForm />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-task"
          element={
            <ProtectedRoute>
              <AddTaskForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
