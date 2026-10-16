

import { NavLink } from 'react-router'

export default function Sidebar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
    }`

  return (
    <aside className="flex w-full shrink-0 flex-col bg-slate-900 text-white md:min-h-screen md:w-64">
      <div className="border-b border-slate-700 p-6">
        <h1 className="text-xl font-bold">ResearchHub</h1>
        <p className="mt-1 text-xs text-slate-400">
          Gestión de Investigación
        </p>
      </div>

      <nav className="space-y-2 p-4">
        <NavLink to="/" end className={linkClass}>
          <span>▦</span>
          Dashboard
        </NavLink>

        <NavLink
          to="/proposals"
          end
          className={linkClass}
        >
          <span>▤</span>
          Mis propuestas
        </NavLink>

        <NavLink
          to="/proposals/new"
          className={linkClass}
        >
          <span>＋</span>
          Nueva propuesta
        </NavLink>

        <div className="space-y-2 pt-4">
          <p className="px-4 text-xs font-semibold uppercase text-slate-500">
            Próximamente
          </p>

          {[
            'Proyectos',
            'Actividades',
            'Documentos',
            'Evaluaciones',
          ].map((item) => (
            <div
              key={item}
              className="cursor-not-allowed rounded-lg px-4 py-3 text-sm text-slate-500"
            >
              {item}
            </div>
          ))}
        </div>
      </nav>

      <div className="mt-auto border-t border-slate-700 p-4 text-xs text-slate-400">
        Plataforma de Investigación
      </div>
    </aside>
  )
}

