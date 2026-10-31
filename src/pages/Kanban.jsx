import { useState } from 'react'
import { Plus } from 'lucide-react'
import KanbanBoard from '../components/KanbanBoard'
import { Modal } from '../components/Modal'
import { TaskForm } from '../components/Forms'
import { useTaskFlow } from '../context/TaskFlowContext'
export default function Kanban(){const ctx=useTaskFlow();const [open,setOpen]=useState(false);const [search,setSearch]=useState('');return <div className="page"><div className="page-heading"><div><p className="eyebrow">Workflow</p><h1>Kanban board</h1><p className="mt-1 text-sm text-slate-500">Drag tasks between stages or use the card menu.</p></div><button className="btn-primary" onClick={()=>setOpen(true)}><Plus size={17}/>New task</button></div><div className="mb-4 max-w-xs"><input className="filter-input" placeholder="Search board..." value={search} onChange={e=>setSearch(e.target.value)}/></div><KanbanBoard filter={search}/><Modal open={open} title="Create task" size="max-w-2xl" onClose={()=>setOpen(false)}><TaskForm onCancel={()=>setOpen(false)} onSubmit={values=>{ctx.addTask(values);setOpen(false)}}/></Modal></div>}
