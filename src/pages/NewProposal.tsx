
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router'
import type { Proposal } from '../types/proposal'

const DRAFT_KEY = 'research_proposal_draft'
const SUBMISSIONS_KEY = 'research_submitted_proposals'
const MAX_FILE_SIZE = 20 * 1024 * 1024

const allowedExtensions = ['pdf', 'docx', 'xlsx', 'png', 'jpg', 'jpeg']

type FormData = Pick<Proposal, 'title' | 'description' | 'objectives'>

const emptyForm: FormData = {
  title: '',
  description: '',
  objectives: '',
}

function loadDraft(): FormData {
  try {
    const saved = localStorage.getItem(DRAFT_KEY)
    if (!saved) return { ...emptyForm }

    const parsed: unknown = JSON.parse(saved)

    if (typeof parsed !== 'object' || parsed === null) {
      return { ...emptyForm }
    }

    const draft = parsed as Partial<FormData>

    return {
      title: typeof draft.title === 'string' ? draft.title : '',
      description: typeof draft.description === 'string'
        ? draft.description : '',
      objectives: typeof draft.objectives === 'string'
        ? draft.objectives : '',
    }
  } catch {
    return { ...emptyForm }
  }
}

export default function NewProposal() {
  const [form, setForm] = useState<FormData>(loadDraft)
  const [files, setFiles] = useState<File[]>([])
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [message, setMessage] = useState('')
  const [fileError, setFileError] = useState('')

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }))

    setMessage('')
  }

  function validate() {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!form.title.trim()) {
      newErrors.title = 'El título es obligatorio.'
    }

    if (!form.description.trim()) {
      newErrors.description = 'La descripción es obligatoria.'
    }

    if (!form.objectives.trim()) {
      newErrors.objectives = 'Los objetivos son obligatorios.'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files ?? [])
    setFileError('')
    setMessage('')

    const invalid = selected.find((file) => {
      const extension = file.name.split('.').pop()?.toLowerCase()

      return (
        !extension ||
        !allowedExtensions.includes(extension) ||
        file.size > MAX_FILE_SIZE
      )
    })

    if (invalid) {
      setFileError(
        `Archivo no permitido o superior a 20 MB: ${invalid.name}`
      )
      event.target.value = ''
      return
    }

    setFiles((prev) => [...prev, ...selected])
    event.target.value = ''
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  function saveDraft() {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(form))
      setMessage('Borrador guardado en este navegador.')
    } catch {
      setMessage('No se pudo guardar el borrador localmente.')
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')

    if (!validate() || fileError) return

    // Demostración frontend: no representa un envío institucional.
    const proposal: Proposal = {
      id: crypto.randomUUID(),
      title: form.title.trim(),
      description: form.description.trim(),
      objectives: form.objectives.trim(),
      status: 'Submitted',
      version: 1,
      submittedAt: new Date().toISOString(),
    }

    try {
      const saved = localStorage.getItem(SUBMISSIONS_KEY)
      const parsed: unknown = saved ? JSON.parse(saved) : []
      const previous: Proposal[] = Array.isArray(parsed) ? parsed : []

      localStorage.setItem(
        SUBMISSIONS_KEY,
        JSON.stringify([...previous, proposal])
      )
      localStorage.removeItem(DRAFT_KEY)

      setForm({ ...emptyForm })
      setFiles([])
      setErrors({})
      setFileError('')

      setMessage(
        `Propuesta registrada localmente. Folio de prueba: ${proposal.id}. ` +
        'Los archivos no se enviaron ni quedaron almacenados.'
      )
    } catch {
      setMessage('No se pudo registrar la propuesta localmente.')
    }
  }

  const inputClass =
    'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 ' +
    'text-sm text-slate-900 outline-none focus:border-blue-500 ' +
    'focus:ring-2 focus:ring-blue-100'

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <Link
          to="/"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Volver al Dashboard
        </Link>

        <h1 className="mt-5 text-3xl font-bold text-slate-900">
          Nueva propuesta de investigación
        </h1>

        <p className="mt-2 text-slate-500">
          Completa la información inicial de tu propuesta.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-7 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
      >
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Información general
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Los campos marcados con * son obligatorios.
          </p>
        </div>

        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Título de la propuesta *
          </label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className={inputClass}
            aria-invalid={Boolean(errors.title)}
            placeholder="Ej. Sistema de detección de enfermedades mediante IA"
          />
          {errors.title && (
            <p role="alert" className="mt-1 text-sm text-red-600">
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Descripción del proyecto *
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className={inputClass}
            aria-invalid={Boolean(errors.description)}
            placeholder="Describe el problema de investigación y su propósito..."
          />
          {errors.description && (
            <p role="alert" className="mt-1 text-sm text-red-600">
              {errors.description}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="objectives"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Objetivos de la investigación *
          </label>
          <textarea
            id="objectives"
            name="objectives"
            value={form.objectives}
            onChange={handleChange}
            rows={4}
            className={inputClass}
            aria-invalid={Boolean(errors.objectives)}
            placeholder="Describe los objetivos que se desean alcanzar..."
          />
          {errors.objectives && (
            <p role="alert" className="mt-1 text-sm text-red-600">
              {errors.objectives}
            </p>
          )}
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h2 className="mb-2 text-lg font-semibold text-slate-900">
            Documentos de apoyo
          </h2>

          <p className="mb-4 text-sm text-slate-500">
            Formatos permitidos: PDF, DOCX, XLSX, PNG y JPG.
            Tamaño máximo: 20 MB por archivo.
          </p>

          <input
            type="file"
            multiple
            accept=".pdf,.docx,.xlsx,.png,.jpg,.jpeg"
            onChange={handleFiles}
            aria-label="Seleccionar documentos de apoyo"
            className="block w-full rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-medium file:text-blue-700"
          />

          {fileError && (
            <p role="alert" className="mt-2 text-sm text-red-600">
              {fileError}
            </p>
          )}

          {files.length > 0 && (
            <ul className="mt-4 space-y-2">
              {files.map((file, index) => (
                <li
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 p-3 text-sm"
                >
                  <span className="min-w-0 truncate text-slate-700">
                    {file.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="shrink-0 font-medium text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-3 text-xs text-amber-700">
            Prototipo: los archivos seleccionados no se almacenan
            y deberán volver a elegirse si recargas la página.
          </p>
        </div>

        {message && (
          <div
            role="status"
            className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800"
          >
            {message}
          </div>
        )}

        <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-6">
          <button
            type="button"
            onClick={saveDraft}
            className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Guardar borrador
          </button>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Simular envío
          </button>
        </div>
      </form>
    </div>
  )
}
