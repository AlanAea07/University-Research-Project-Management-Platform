
import type { Proposal } from '../types/proposal'

const DRAFT_KEY = 'research_proposal_draft'
const SUBMISSIONS_KEY = 'research_submitted_proposals'

export interface ProposalRecord extends Proposal {
  isDraft: boolean
}

export function getProposals(): ProposalRecord[] {
  const proposals: ProposalRecord[] = []

  try {
    const saved = localStorage.getItem(SUBMISSIONS_KEY)
    const data: unknown = saved ? JSON.parse(saved) : []

    if (Array.isArray(data)) {
      data.forEach((item) => {
        if (
          item &&
          typeof item.id === 'string' &&
          typeof item.title === 'string' &&
          typeof item.description === 'string' &&
          typeof item.objectives === 'string' &&
          item.status === 'Submitted'
        ) {
          proposals.push({
            id: item.id,
            title: item.title,
            description: item.description,
            objectives: item.objectives,
            status: 'Submitted',
            version: item.version ?? 1,
            submittedAt: item.submittedAt ?? null,
            isDraft: false,
          })
        }
      })
    }
  } catch {
    // Sin registros locales válidos.
  }

  try {
    const savedDraft = localStorage.getItem(DRAFT_KEY)

    if (savedDraft) {
      const draft: unknown = JSON.parse(savedDraft)

      if (draft && typeof draft === 'object') {
        const data = draft as Record<string, unknown>

        const title = typeof data.title === 'string' ? data.title : ''
        const description =
          typeof data.description === 'string' ? data.description : ''
        const objectives =
          typeof data.objectives === 'string' ? data.objectives : ''

        proposals.unshift({
          id: 'draft',
          title: title.trim() || 'Propuesta sin título',
          description,
          objectives,
          status: 'Draft',
          version: 1,
          submittedAt: null,
          isDraft: true,
        })
      }
    }
  } catch {
    // El borrador local no se puede recuperar.
  }

  return proposals
}

export function getProposalById(
  id: string
): ProposalRecord | undefined {
  return getProposals().find((proposal) => proposal.id === id)
}
