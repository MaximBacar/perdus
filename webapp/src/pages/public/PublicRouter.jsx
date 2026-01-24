import { Routes, Route } from "react-router-dom"
import { Lost } from "./pages/Lost"

export const PublicRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<div>index</div>} />
      <Route path="/new" element={<Lost/>} />
    </Routes>
  )
}
