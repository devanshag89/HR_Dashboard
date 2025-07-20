import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BookmarkProvider } from './context/BookmarkContext.jsx'
import { EmployeeProvider } from './context/EmployeeContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EmployeeProvider>
      <BookmarkProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BookmarkProvider>
    </EmployeeProvider>
  </StrictMode>,
)
