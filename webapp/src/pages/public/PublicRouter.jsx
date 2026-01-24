import { Routes, Route } from "react-router-dom"

export const PublicRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Public Home</h1>} />
      <Route path="/lost" element={<h1>Lost</h1>} />
    </Routes>
  )
}
