import { Routes, Route } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { ObjectsPage } from './pages/objects/ObjectsPage'
import { ObjectPage } from './pages/objects/Object'
import { InquiriesPage } from './pages/inquiries/InquiriesPage'
import { Inquiry } from './pages/inquiries/Inquiry'
import { SettingsPage } from './pages/settings/SettingsPage'

export const AssistantsRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/objects" element={<ObjectsPage/>} />
      <Route path="/objects/:objectId" element={<ObjectPage/>} />
      <Route path="/queries" element={<InquiriesPage/>} />
      <Route path="/queries/:inquiryId" element={<Inquiry/>} />
      <Route path="/settings" element={<SettingsPage/>} />
    </Routes>
  )
}
