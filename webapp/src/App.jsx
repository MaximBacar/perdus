import { useAuth } from "./contexts/AuthContext"
import { Routes, Route, Navigate } from "react-router-dom";
import { PublicRouter } from "./pages/public/PublicRouter";
import { AssistantsRouter } from "./pages/assistants/AssistantsRouter";
import { Login } from "./pages/auth/Login";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { PerdusSidebar } from "./components/sidebar/PerdusSidebar";
import { Separator } from "./components/ui/separator";
function App() {
  const { user, role } = useAuth();


  console.log(user)

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <SidebarProvider>
      <PerdusSidebar/>
      <SidebarInset className="overflow-hidden">

        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            Dashboard
          </div>
        </header>
        <div className="flex flex-col w-full h-full p-4">
          <Routes>
            <Route path="/login" element={<Navigate to="/" replace />} />
            {role === "assistant" ? (
              <Route path="/*" element={<AssistantsRouter />} />
            ) : (
              <Route path="/*" element={<PublicRouter />} />
            )}
          </Routes>
        </div>

        

      </SidebarInset>
    
    
    </SidebarProvider>
  );
}

export default App
