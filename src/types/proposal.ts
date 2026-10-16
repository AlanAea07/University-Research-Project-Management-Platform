
export type ProposalStatus = 'Draft' | 'Submitted'

export interface Proposal {
  id: string
  title: string
  description: string
  objectives: string
  status: ProposalStatus
  version: number
  submittedAt: string | null
}
