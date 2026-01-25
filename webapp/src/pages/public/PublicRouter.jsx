import { Routes, Route, Navigate } from "react-router-dom"
import { NewInquiryPage } from "./pages/NewInquiryPage"
import { InquiryPage } from "./pages/inquiries/InquiryPage"
import { InquiryDetail } from "./pages/inquiries/InquiryDetail"

export const PublicRouter = () => {
  return (
    <Routes>
      <Route path="/new" element={<NewInquiryPage/>} />
      <Route path="/queries" element={<InquiryPage/>} />
      <Route path="/queries/:inquiryId" element={<InquiryDetail/>} />
      <Route path="*" element={<Navigate to="/new" replace />} />
    </Routes>
  )
}
