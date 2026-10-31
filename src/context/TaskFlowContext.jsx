import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const TaskFlowContext = createContext(null)
const STORAGE_KEY = 'taskflow-data-v1'

const now = new Date()
const dateOffset = (days) => { const d = new Date(now); d.setDate(d.getDate() + days); return d.toISOString().slice(0, 10) }

const seedProjects = [
  { id: 'p1', name: 'Website Redesign', description: 'Refresh the marketing website and improve conversion across key pages.', deadline: dateOffset(18), color: '#6366F1', createdAt: new Date().toISOString() },
  { id: 'p2', name: 'Mobile App', description: 'Plan, design, and deliver the next mobile product release.', deadline: dateOffset(32), color: '#8B5CF6', createdAt: new Date().toISOString() },
  { id: 'p3', name: 'Marketing Campaign', description: 'Coordinate product launch campaigns and analytics.', deadline: dateOffset(-3), color: '#F59E0B', createdAt: new Date().toISOString() },
  { id: 'p4', name: 'Internal Tools', description: 'Improve team workflows and operational dashboards.', deadline: dateOffset(45), color: '#10B981', createdAt: new Date().toISOString() }
]

const seedTasks = [
  { id: 't1', title: 'Create homepage wireframes', description: 'Explore the new hero, navigation, and conversion sections.', projectId: 'p1', priority: 'High', status: 'In Progress', category: 'Design', dueDate: dateOffset(2), createdAt: dateOffset(-4) },
  { id: 't2', title: 'Review design system', description: 'Audit components and document missing states.', projectId: 'p1', priority: 'Medium', status: 'To Do', category: 'Design', dueDate: dateOffset(7), createdAt: dateOffset(-3) },
  { id: 't3', title: 'Build authentication flow', description: 'Implement sign in, password recovery, and session handling.', projectId: 'p2', priority: 'High', status: 'In Progress', category: 'Development', dueDate: dateOffset(-1), createdAt: dateOffset(-8) },
  { id: 't4', title: 'Launch email sequence', description: 'Prepare and schedule the launch nurture campaign.', projectId: 'p3', priority: 'Medium', status: 'Completed', category: 'Marketing', dueDate: dateOffset(-5), createdAt: dateOffset(-12) },
  { id: 't5', title: 'Prepare analytics report', description: 'Summarize current acquisition and retention performance.', projectId: 'p3', priority: 'Low', status: 'To Do', category: 'Analytics', dueDate: dateOffset(5), createdAt: dateOffset(-2) },
  { id: 't6', title: 'Set up CI pipeline', description: 'Configure build checks and automated preview deployments.', projectId: 'p4', priority: 'High', status: 'Completed', category: 'Development', dueDate: dateOffset(-8), createdAt: dateOffset(-15) },
  { id: 't7', title: 'Document API endpoints', description: 'Add request and response examples to the developer docs.', projectId: 'p4', priority: 'Low', status: 'To Do', category: 'Documentation', dueDate: dateOffset(12), createdAt: dateOffset(-1) },
  { id: 't8', title: 'Optimize landing page', description: 'Improve page speed and Core Web Vitals.', projectId: 'p1', priority: 'Medium', status: 'Completed', category: 'Development', dueDate: dateOffset(-2), createdAt: dateOffset(-10) }
]

const defaultState = { projects: seedProjects, tasks: seedTasks, preferences: { theme: 'light', compactSidebar: false } }

export function TaskFlowProvider({ children }) {
  const [data, setData] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultState } catch { return defaultState }
  })
  const [toast, setToast] = useState(null)

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) }, [data])
  useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(null), 3000); return () => clearTimeout(id) }, [toast])

  const notify = (message, type = 'success') => setToast({ message, type })
  const addProject = (project) => { setData(d => ({ ...d, projects: [...d.projects, { ...project, id: crypto.randomUUID(), createdAt: new Date().toISOString() }] })); notify('Project created') }
  const updateProject = (id, changes) => { setData(d => ({ ...d, projects: d.projects.map(p => p.id === id ? { ...p, ...changes } : p) })); notify('Project updated') }
  const deleteProject = (id) => { setData(d => ({ ...d, projects: d.projects.filter(p => p.id !== id), tasks: d.tasks.map(t => t.projectId === id ? { ...t, projectId: '' } : t) })); notify('Project deleted') }
  const addTask = (task) => { setData(d => ({ ...d, tasks: [...d.tasks, { ...task, id: crypto.randomUUID(), createdAt: new Date().toISOString() }] })); notify('Task created') }
  const updateTask = (id, changes) => { setData(d => ({ ...d, tasks: d.tasks.map(t => t.id === id ? { ...t, ...changes } : t) })); notify('Task updated') }
  const deleteTask = (id) => { setData(d => ({ ...d, tasks: d.tasks.filter(t => t.id !== id) })); notify('Task deleted') }
  const updatePreferences = (changes) => setData(d => ({ ...d, preferences: { ...d.preferences, ...changes } }))
  const resetData = () => { setData(defaultState); notify('Demo data restored') }

  const stats = useMemo(() => {
    const tasks = data.tasks
    const today = new Date().toISOString().slice(0, 10)
    const completed = tasks.filter(t => t.status === 'Completed').length
    return { totalProjects: data.projects.length, totalTasks: tasks.length, completed, pending: tasks.length - completed, overdue: tasks.filter(t => t.status !== 'Completed' && t.dueDate && t.dueDate < today).length, completion: tasks.length ? Math.round(completed / tasks.length * 100) : 0 }
  }, [data])

  return <TaskFlowContext.Provider value={{ ...data, ...stats, notify, addProject, updateProject, deleteProject, addTask, updateTask, deleteTask, updatePreferences, resetData, toast }}>
    {children}
  </TaskFlowContext.Provider>
}

export const useTaskFlow = () => useContext(TaskFlowContext)
