import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './mcp-app.module.css'
import App from './McpApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
