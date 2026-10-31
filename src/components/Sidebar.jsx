import { NavLink } from 'react-router-dom'
import { LayoutDashboard, FolderKanban, CheckSquare2, Columns3, CalendarDays, BarChart3, Settings, ChevronLeft, ChevronRight, Command } from 'lucide-react'

const links = [
  ['/dashboard', LayoutDashboard, 'Dashboard'], ['/projects', FolderKanban, 'Projects'], ['/tasks', CheckSquare2, 'Tasks'], ['/kanban', Columns3, 'Kanban'], ['/calendar', CalendarDays, 'Calendar'], ['/analytics', BarChart3, 'Analytics']
]
export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  return <>
    {mobileOpen && <div className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden" onClick={onMobileClose}/>} 
    <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''} ${mobileOpen ? 'sidebar-mobile-open' : ''}`}>
      <div className="flex h-[72px] items-center border-b border-slate-800 px-5">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"><Command size={20}/></div>
        {!collapsed && <div className="ml-3"><div className="font-bold tracking-tight text-white">TASKFLOW</div><div className="text-[11px] text-slate-400">Workspace</div></div>}
      </div>
      <nav className="mt-5 space-y-1 px-3">
        {links.map(([to, Icon, label]) => <NavLink key={to} to={to} onClick={onMobileClose} className={({isActive}) => `nav-link ${isActive ? 'nav-link-active' : ''}`} title={collapsed ? label : undefined}><Icon size={19}/>{!collapsed && <span>{label}</span>}</NavLink>)}
      </nav>
      <div className="mt-auto p-3">
        <NavLink to="/settings" onClick={onMobileClose} className={({isActive}) => `nav-link ${isActive ? 'nav-link-active' : ''}`} title={collapsed ? 'Settings' : undefined}><Settings size={19}/>{!collapsed && <span>Settings</span>}</NavLink>
        <button onClick={onToggle} className="mt-2 hidden h-10 w-full items-center justify-center rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white lg:flex" aria-label="Toggle sidebar">{collapsed ? <ChevronRight size={18}/> : <ChevronLeft size={18}/>}</button>
      </div>
    </aside>
  </>
}
