import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { TaskFlowProvider } from './context/TaskFlowContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TaskFlowProvider><App /></TaskFlowProvider>
    </BrowserRouter>
  </StrictMode>,
)
