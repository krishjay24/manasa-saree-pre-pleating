import { ArrowRight, Home } from 'lucide-react'
import { routes } from '../app/routes'
import { PageSEO } from '../components/seo/PageSEO'
import { Button } from '../components/ui/Button'
import { PageHeader } from '../components/ui/PageHeader'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  return (
    <>
      <PageSEO route={routes.notFound} />
      <PageHeader
        eyebrow="404"
        title={
          <>
            This page has <em>slipped a pleat</em>
          </>
        }
        description="The page you are looking for does not exist or may have moved."
      >
        <div className={styles.actions}>
          <Button to={routes.home.path} icon={<Home size={16} aria-hidden="true" />}>
            Back to Home
          </Button>
          <Button to={routes.services.path} variant="outline" iconEnd={<ArrowRight size={16} aria-hidden="true" />}>
            View Services
          </Button>
        </div>
      </PageHeader>
    </>
  )
}
