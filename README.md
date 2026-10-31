# TASKFLOW

TASKFLOW is a polished project and task management web application built with React, Vite, Tailwind CSS, React Router, Lucide, Recharts, Context API, and LocalStorage.

## Features

- Project CRUD with progress tracking and colors
- Task CRUD with priorities, categories, statuses, and deadlines
- Kanban drag-and-drop workflow with mobile-friendly status controls
- Combined task search, filtering, and sorting
- Monthly calendar, overdue indicators, and upcoming deadlines
- Live dashboard metrics and analytics powered by real application data
- Responsive sidebar, notifications, confirmation dialogs, empty states, and toast feedback
- Safe LocalStorage persistence and demo data reset

## Technology stack

- React 19 + Vite
- JavaScript ES6+
- Tailwind CSS
- React Router DOM
- Lucide React
- Recharts
- React Context API
- LocalStorage

## Installation

```bash
npm install
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`.

## Available scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Testing the portfolio demo

1. Create and edit projects on the Projects page.
2. Create, edit, complete, reopen, or delete tasks on Tasks.
3. Drag cards across Kanban columns and use mobile status controls.
4. Combine search, project, priority, status, due-date, and sorting filters.
5. Navigate calendar months and click deadlines for task details.
6. Verify dashboard and analytics update immediately.
7. Refresh the browser to confirm LocalStorage persistence.
8. Run `npm run build` before publishing.

## Screenshots

Screenshot placeholders can be added here before portfolio publication.

## GitHub publishing

```bash
git init
git add .
git commit -m "Initial commit: TASKFLOW portfolio project"
git branch -M main
git remote add origin <YOUR_REPOSITORY_URL>
git push -u origin main
```

Publishing requires the user's approval.

## Netlify deployment

1. Push the repository to GitHub.
2. Add the repository to Netlify.
3. Use build command `npm run build` and publish directory `dist`.
4. Optionally add a `_redirects` file with `/* /index.html 200` for direct route support.

## License

Portfolio project demonstration.
