import { X } from 'lucide-react'
export function Modal({ open, title, onClose, children, size = 'max-w-lg' }) {
  if (!open) return null
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm" onMouseDown={e => e.target === e.currentTarget && onClose()}>
    <div className={`max-h-[90vh] w-full ${size} overflow-y-auto rounded-2xl bg-white shadow-2xl`} role="dialog" aria-modal="true">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4"><h2 className="text-lg font-bold text-slate-900">{title}</h2><button onClick={onClose} className="icon-btn" aria-label="Close"><X size={18}/></button></div>
      <div className="p-6">{children}</div>
    </div>
  </div>
}
export function ConfirmDialog({ open, title = 'Confirm action', message, onConfirm, onClose }) {
  return <Modal open={open} title={title} onClose={onClose} size="max-w-md"><p className="mb-6 text-sm leading-6 text-slate-600">{message}</p><div className="flex justify-end gap-3"><button onClick={onClose} className="btn-secondary">Cancel</button><button onClick={() => { onConfirm(); onClose() }} className="btn-danger">Delete</button></div></Modal>
}
