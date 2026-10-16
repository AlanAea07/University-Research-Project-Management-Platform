import ProjectCard from '../components/ProjectCard'
import { mockProjects } from '../data/mockProjects'

export default function Dashboard() {
  const totalProjects = mockProjects.length

  const activeProjects = mockProjects.filter(
    (project) => project.status === 'Activo'
  ).length

  const reviewProjects = mockProjects.filter(
    (project) => project.status === 'Revisión'
  ).length

  const stats = [
    { label: 'Total de proyectos', value: totalProjects },
    { label: 'Proyectos activos', value: activeProjects },
    { label: 'En revisión', value: reviewProjects },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Dashboard
        </h1>
        <p className="mt-2 text-slate-500">
          Resumen general de los proyectos de investigación.
        </p>
      </div>

      <section className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-500">
              {stat.label}
            </p>
            <p className="mt-3 text-3xl font-bold text-slate-900">
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900">
            Proyectos de investigación
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Proyectos activos y pendientes de revisión.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {mockProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  )
}