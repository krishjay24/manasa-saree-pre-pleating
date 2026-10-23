import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { InfoBar } from '../components/layout/InfoBar'
import { ScrollToTop } from '../components/layout/ScrollToTop'
import { FloatingActions } from '../components/ui/FloatingActions'
import { ScrollProgressBar } from '../components/ui/ScrollProgressBar'

export function MainLayout() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgressBar />
      <ScrollToTop />
      <InfoBar />
      <Header />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<div style={{ minHeight: '100vh' }} aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <FloatingActions />
    </>
  )
}
