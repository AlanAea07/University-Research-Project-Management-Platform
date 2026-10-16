
import { Link } from 'react-router'
import { getProposals } from '../utils/proposalStorage'

export default function Proposals() {
  const proposals = getProposals()

  const total = proposals.length
  const drafts = proposals.filter(
    (proposal) => proposal.status === 'Draft'
  ).length

  const submitted = proposals.filter(
    (proposal) => proposal.status === 'Submitted'
  ).length

  function formatDate(date: string | null) {
    if (!date) return 'Sin enviar'

    return new Date(date).toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Mis propuestas
          </h1>

          <p className="mt-2 text-slate-500">
            Consulta y da seguimiento a tus propuestas de investigación.
          </p>
        </div>

        <Link
          to="/proposals/new"
          className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          + Nueva propuesta
        </Link>
      </div>

      <section className="mb-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Total de propuestas', value: total },
          { label: 'Borradores', value: drafts },
          { label: 'Enviadas', value: submitted },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">
              {stat.label}
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Listado de propuestas
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Registros guardados en este navegador.
          </p>
        </div>

        {proposals.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <h3 className="text-lg font-semibold text-slate-900">
              Aún no tienes propuestas
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Crea tu primera propuesta para comenzar.
            </p>

            <Link
              to="/proposals/new"
              className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              Crear propuesta
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-6 py-4 font-semibold">
                    Propuesta
                  </th>
                  <th className="px-6 py-4 font-semibold">
                    Estado
                  </th>
                  <th className="px-6 py-4 font-semibold">
                    Versión
                  </th>
                  <th className="px-6 py-4 font-semibold">
                    Fecha de envío
                  </th>
                  <th className="px-6 py-4 font-semibold">
                    Acción
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {proposals.map((proposal) => (
                  <tr
                    key={proposal.id}
                    className="hover:bg-slate-50"
                  >
                    <td className="max-w-xs px-6 py-5">
                      <p className="font-medium text-slate-900">
                        {proposal.title}
                      </p>
                      <p className="mt-1 truncate text-xs text-slate-500">
                        {proposal.description || 'Sin descripción'}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          proposal.isDraft
                            ? 'bg-slate-100 text-slate-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {proposal.isDraft ? 'Borrador' : 'Enviada'}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      v{proposal.version}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {formatDate(proposal.submittedAt)}
                    </td>

                    <td className="px-6 py-5">
                      <Link
                        to={`/proposals/${proposal.id}`}
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        Ver detalle
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
