import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { pageLoaders } from './pageLoaders'
import { routes } from './routes'

const HomePage = lazy(pageLoaders.home)
const ServicesPage = lazy(pageLoaders.services)
const GalleryPage = lazy(pageLoaders.gallery)
const AboutPage = lazy(pageLoaders.about)
const ContactPage = lazy(pageLoaders.contact)
const PrivacyPolicyPage = lazy(pageLoaders.privacy)
const TermsPage = lazy(pageLoaders.terms)
const NotFoundPage = lazy(pageLoaders.notFound)

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path={routes.services.path} element={<ServicesPage />} />
        <Route path={routes.gallery.path} element={<GalleryPage />} />
        <Route path={routes.about.path} element={<AboutPage />} />
        <Route path={routes.contact.path} element={<ContactPage />} />
        <Route path={routes.privacy.path} element={<PrivacyPolicyPage />} />
        <Route path={routes.terms.path} element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
