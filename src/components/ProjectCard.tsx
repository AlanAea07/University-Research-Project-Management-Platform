import type { Project } from '../types/project'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const isActive = project.status === 'Activo'

  const formattedDate = new Date(
    `${project.deadline}T12:00:00`
  ).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-xl text-blue-700">
          ◈
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isActive
              ? 'bg-green-100 text-green-700'
              : 'bg-amber-100 text-amber-700'
          }`}
        >
          {project.status}
        </span>
      </div>

      <h3 className="mb-3 text-lg font-semibold leading-snug text-slate-900">
        {project.title}
      </h3>

      <div className="mt-auto space-y-4 pt-5 text-sm">
        <div>
          <p className="text-slate-500">Investigador principal</p>
          <p className="font-medium text-slate-800">
            {project.principalInvestigator}
          </p>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <p className="text-slate-500">Fecha límite</p>
          <p className="font-medium text-slate-800">
            {formattedDate}
          </p>
        </div>
      </div>
    </article>
  )
}