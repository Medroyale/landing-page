import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/style/index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import Seo from '@/components/Seo'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Seo
      title="MedRoyale | The first competitive 1v1 quiz game designed for the UKMLA"
      description="MedRoyale The first competitive 1v1 quiz game designed for the UKMLA."
    />
    <RouterProvider router={router} />
  </StrictMode>
)
