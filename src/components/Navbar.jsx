import { useState } from 'react'
import { Menu, Search, Bell, ChevronDown, CheckCircle2 } from 'lucide-react'
import { useTaskFlow } from '../context/TaskFlowContext'

export default function Navbar({ onMenu, onSearch }) {
  const { tasks } = useTaskFlow()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const recent = tasks.filter(t => t.status !== 'Completed').slice(0, 3)
  return <header className="topbar">
    <button className="icon-btn lg:hidden" onClick={onMenu} aria-label="Open menu"><Menu size={20}/></button>
    <div className="relative hidden max-w-md flex-1 sm:block">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17}/>
      <input className="top-search" placeholder="Search tasks..." onChange={e => onSearch?.(e.target.value)} aria-label="Search tasks" />
    </div>
    <div className="ml-auto flex items-center gap-2">
      <div className="relative"><button className="icon-btn relative" onClick={() => setNotificationsOpen(v => !v)} aria-label="Notifications"><Bell size={19}/>{recent.length > 0 && <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-rose-500"/>}</button>
        {notificationsOpen && <div className="notification-menu"><div className="mb-2 flex items-center justify-between"><b className="text-sm">Notifications</b><span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-600">{recent.length} new</span></div>{recent.map(t => <div key={t.id} className="flex gap-3 rounded-xl p-2 hover:bg-slate-50"><div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-indigo-50 text-indigo-600"><CheckCircle2 size={16}/></div><div><p className="text-sm font-semibold text-slate-800">{t.title}</p><p className="mt-0.5 text-xs text-slate-500">Due {t.dueDate || 'not set'}</p></div></div>)}</div>}
      </div>
      <div className="mx-1 h-8 w-px bg-slate-200" />
      <button className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-50"><div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">S</div><div className="hidden text-left md:block"><div className="text-sm font-bold text-slate-800">Suraj</div><div className="text-[11px] text-slate-500">Product Designer</div></div><ChevronDown className="hidden text-slate-400 md:block" size={15}/></button>
    </div>
  </header>
}
