export type ProjectStatus = 'Activo' | 'Revisión'

export interface Project {
  id: number
  title: string
  principalInvestigator: string
  status: ProjectStatus
  deadline: string
}