import { useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Tasks from './pages/Tasks'
import Kanban from './pages/Kanban'
import CalendarPage from './pages/CalendarPage'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import { useTaskFlow } from './context/TaskFlowContext'

function NotFound(){return <div className="page"><div className="empty-state panel"><h1>404</h1><p>This page could not be found.</p></div></div>}
export default function App(){const {toast}=useTaskFlow();const navigate=useNavigate();const [collapsed,setCollapsed]=useState(false);const [mobileOpen,setMobileOpen]=useState(false)
const search=value=>{window.dispatchEvent(new CustomEvent('taskflow-search',{detail:value}));if(value&&window.location.pathname!=='/tasks')navigate('/tasks')}
return <div className="app-shell"><Sidebar collapsed={collapsed} onToggle={()=>setCollapsed(v=>!v)} mobileOpen={mobileOpen} onMobileClose={()=>setMobileOpen(false)}/><div className={`main-shell ${collapsed?'main-shell-collapsed':''}`}><Navbar onMenu={()=>setMobileOpen(true)} onSearch={search}/><main><Routes><Route path="/" element={<Navigate to="/dashboard" replace/>}/><Route path="/dashboard" element={<Dashboard/>}/><Route path="/projects" element={<Projects/>}/><Route path="/tasks" element={<Tasks/>}/><Route path="/kanban" element={<Kanban/>}/><Route path="/calendar" element={<CalendarPage/>}/><Route path="/analytics" element={<Analytics/>}/><Route path="/settings" element={<Settings/>}/><Route path="*" element={<NotFound/>}/></Routes></main></div>{toast&&<div className={`toast toast-${toast.type}`} role="status"><span className="toast-dot"/> {toast.message}</div>}</div>}
