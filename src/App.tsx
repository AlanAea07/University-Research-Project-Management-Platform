
import { Navigate, Route, Routes } from 'react-router'

import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import NewProposal from './pages/NewProposal'
import Proposals from './pages/Proposals'
import ProposalDetail from './pages/ProposalDetail'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Dashboard />} />

        <Route path="proposals">
          <Route index element={<Proposals />} />
          <Route path="new" element={<NewProposal />} />
          <Route path=":id" element={<ProposalDetail />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Route>
    </Routes>
  )
}


