import { Outlet } from 'react-router'
import Sidebar from '../components/Sidebar'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
          <h2 className="font-semibold text-slate-800">
            Plataforma de Investigación
          </h2>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
            U
          </div>
        </header>

        <main className="mx-auto max-w-7xl p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}