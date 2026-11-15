import { Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CareerSelection from "./pages/CareerSelection";
import SkillSelection from "./pages/SkillSelection";
import Result from "./pages/Result";
import Roadmap from "./pages/Roadmap";
import Projects from "./pages/Projects";
import Progress from "./pages/Progress";
import Assessment from "./pages/Assessment";
import FinalResult from "./pages/FinalResult";
import History from "./pages/History";

import Admin from "./pages/Admin";
import Students from "./pages/Students";
import Questions from "./pages/Questions";

import AIAssistant from "./pages/AIAssistant";

import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <Routes>
      {/* Default Route */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* Authentication */}
      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      {/* Student Dashboard */}
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      {/* Career Selection */}
      <Route
        path="/careers"
        element={<CareerSelection />}
      />

      {/* Skill Selection */}
      <Route
        path="/skills"
        element={<SkillSelection />}
      />

      {/* Skill Readiness Result */}
      <Route
        path="/result"
        element={<Result />}
      />

      {/* Learning Roadmap */}
      <Route
        path="/roadmap"
        element={<Roadmap />}
      />

      {/* Recommended Projects */}
      <Route
        path="/projects"
        element={<Projects />}
      />

      {/* Progress Tracker */}
      <Route
        path="/progress"
        element={<Progress />}
      />

      {/* Technical Assessment */}
      <Route
        path="/assessment"
        element={<Assessment />}
      />

      {/* Final Readiness Result */}
      <Route
        path="/final-result"
        element={<FinalResult />}
      />

      {/* Analysis History */}
      <Route
        path="/history"
        element={<History />}
      />

      {/* AI Career Assistant */}
      <Route
        path="/ai-assistant"
        element={<AIAssistant />}
      />

      {/* =========================
          ADMIN ROUTES
      ========================== */}

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/students"
        element={
          <AdminRoute>
            <Students />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/questions"
        element={
          <AdminRoute>
            <Questions />
          </AdminRoute>
        }
      />

      {/* Invalid URL */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;