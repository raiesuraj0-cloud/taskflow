import { useEffect, useState } from 'react'
import { useTaskFlow } from '../context/TaskFlowContext'

const projectInitial = { name: '', description: '', deadline: '', color: '#6366F1' }
export function ProjectForm({ project, onSubmit, onCancel }) {
  const [form, setForm] = useState(projectInitial)
  const [errors, setErrors] = useState({})
  useEffect(() => setForm(project ? { name: project.name, description: project.description || '', deadline: project.deadline || '', color: project.color || '#6366F1' } : projectInitial), [project])
  const submit = e => { e.preventDefault(); const next = {}; if (!form.name.trim()) next.name='Project name is required'; setErrors(next); if (!Object.keys(next).length) onSubmit(form) }
  return <form onSubmit={submit} className="space-y-4"><label className="field-label">Project name<input className="field" value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="e.g. Website redesign"/>{errors.name && <span className="field-error">{errors.name}</span>}</label>
    <label className="field-label">Description<textarea className="field min-h-24 resize-none" value={form.description} onChange={e => setForm({...form,description:e.target.value})} placeholder="What is this project about?"/></label>
    <div className="grid gap-4 sm:grid-cols-2"><label className="field-label">Deadline<input type="date" className="field" value={form.deadline} onChange={e => setForm({...form,deadline:e.target.value})}/></label><label className="field-label">Color<div className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 px-3">{['#6366F1','#8B5CF6','#0EA5E9','#10B981','#F59E0B','#F43F5E'].map(c => <button type="button" key={c} onClick={() => setForm({...form,color:c})} className="h-6 w-6 rounded-full border-2 border-white shadow-sm ring-offset-2" style={{background:c, outline: form.color===c?'2px solid '+c:'none'}} aria-label={`Use color ${c}`}/>)}</div></label></div>
    <div className="flex justify-end gap-3 pt-2"><button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button><button className="btn-primary">{project ? 'Save changes' : 'Create project'}</button></div>
  </form>
}

export function TaskForm({ task, onSubmit, onCancel }) {
  const { projects } = useTaskFlow()
  const initial = { title:'', description:'', projectId:'', priority:'Medium', status:'To Do', category:'General', dueDate:'' }
  const [form,setForm] = useState(initial); const [errors,setErrors]=useState({})
  useEffect(()=>setForm(task ? {title:task.title,description:task.description||'',projectId:task.projectId||'',priority:task.priority,status:task.status,category:task.category||'General',dueDate:task.dueDate||''}:initial),[task])
  const submit=e=>{e.preventDefault();const next={};if(!form.title.trim())next.title='Task name is required';setErrors(next);if(!Object.keys(next).length)onSubmit(form)}
  return <form onSubmit={submit} className="space-y-4"><label className="field-label">Task name<input className="field" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="What needs to be done?"/>{errors.title&&<span className="field-error">{errors.title}</span>}</label>
    <label className="field-label">Description<textarea className="field min-h-20 resize-none" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></label>
    <div className="grid gap-4 sm:grid-cols-2"><label className="field-label">Project<select className="field" value={form.projectId} onChange={e=>setForm({...form,projectId:e.target.value})}><option value="">No project</option>{projects.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select></label><label className="field-label">Category<select className="field" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>{['General','Design','Development','Marketing','Analytics','Documentation','Research'].map(c=><option key={c}>{c}</option>)}</select></label></div>
    <div className="grid gap-4 sm:grid-cols-3"><label className="field-label">Priority<select className="field" value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}><option>High</option><option>Medium</option><option>Low</option></select></label><label className="field-label">Status<select className="field" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>To Do</option><option>In Progress</option><option>Completed</option></select></label><label className="field-label">Due date<input type="date" className="field" value={form.dueDate} onChange={e=>setForm({...form,dueDate:e.target.value})}/></label></div>
    <div className="flex justify-end gap-3 pt-2"><button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button><button className="btn-primary">{task?'Save changes':'Create task'}</button></div>
  </form>
}
