import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient , QueryClientProvider} from "@tanstack/react-query"
import './index.css'
import App from './App.jsx'

const queryclient=new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryclient}>
  <StrictMode>
    <App />
  </StrictMode>
  </QueryClientProvider>,
)
