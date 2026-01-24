import { useAuth } from "./contexts/AuthContext"
import { Routes, Route, Navigate } from "react-router-dom";
import { PublicRouter } from "./pages/public/PublicRouter";
import { AssistantsRouter } from "./pages/assistants/AssistantsRouter";
import { Login } from "./pages/auth/Login";

function App() {
  const { user, role } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Navigate to="/" replace />} />
      {role === "assistant" ? (
        <Route path="/*" element={<AssistantsRouter />} />
      ) : (
        <Route path="/*" element={<PublicRouter />} />
      )}
    </Routes>
  );
}

export default App
