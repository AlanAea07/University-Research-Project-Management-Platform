
import { Link, useParams } from 'react-router'
import { getProposalById } from '../utils/proposalStorage'

export default function ProposalDetail() {
  const { id } = useParams<{ id: string }>()
  const proposal = id ? getProposalById(id) : undefined

  if (!proposal) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Propuesta no encontrada
        </h1>
        <p className="mt-3 text-slate-500">
          El registro solicitado no existe en este navegador.
        </p>
        <Link
          to="/proposals"
          className="mt-6 inline-block font-medium text-blue-600 hover:underline"
        >
          Volver a mis propuestas
        </Link>
      </div>
    )
  }

  const formattedDate = proposal.submittedAt
    ? new Date(proposal.submittedAt).toLocaleString('es-MX', {
        dateStyle: 'long',
        timeStyle: 'short',
      })
    : 'Sin enviar'

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/proposals"
        className="text-sm font-medium text-blue-600 hover:underline"
      >
        ← Volver a mis propuestas
      </Link>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold text-slate-900">
            {proposal.title}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Detalle de propuesta de investigación
          </p>
        </div>

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            proposal.isDraft
              ? 'bg-slate-200 text-slate-700'
              : 'bg-blue-100 text-blue-700'
          }`}
        >
          {proposal.isDraft ? 'Borrador' : 'Enviada'}
        </span>
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Estado actual</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {proposal.isDraft ? 'Borrador' : 'Enviada'}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Versión</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {proposal.version}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Fecha de envío</p>
          <p className="mt-2 text-sm font-semibold text-slate-900">
            {formattedDate}
          </p>
        </div>
      </section>

      <section className="mt-6 space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Información general
          </h2>

          <div className="mt-6">
            <h3 className="mb-2 text-sm font-semibold text-slate-700">
              Título de la investigación
            </h3>
            <p className="text-slate-900">{proposal.title}</p>
          </div>

          <div className="mt-6">
            <h3 className="mb-2 text-sm font-semibold text-slate-700">
              Descripción del proyecto
            </h3>
            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600">
              {proposal.description || 'Sin descripción'}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="mb-2 text-sm font-semibold text-slate-700">
              Objetivos de investigación
            </h3>
            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600">
              {proposal.objectives || 'Sin objetivos registrados'}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Documentos de apoyo
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            No hay documentos almacenados. La carga de archivos
            estará disponible cuando integremos el backend.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Seguimiento
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            {proposal.isDraft
              ? 'Esta propuesta todavía es un borrador. Puedes continuar su edición antes de enviarla.'
              : 'Esta propuesta fue registrada localmente como enviada. La asignación de evaluadores y las decisiones institucionales estarán disponibles en una etapa posterior.'}
          </p>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap justify-end gap-3">
        <Link
          to="/proposals"
          className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
        >
          Volver al listado
        </Link>

        {proposal.isDraft && (
          <Link
            to="/proposals/new"
            className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Continuar borrador
          </Link>
        )}
      </div>
    </div>
  )
}
