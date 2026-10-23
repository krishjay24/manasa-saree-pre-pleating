import { routes } from '../app/routes'

export interface NavItem {
  to: string
  label: string
}

export const mainNav: NavItem[] = [routes.home, routes.services, routes.gallery, routes.about, routes.contact].map(
  ({ path, label }) => ({ to: path, label }),
)

export const legalNav: NavItem[] = [routes.privacy, routes.terms].map(({ path, label }) => ({ to: path, label }))

export const bookingPath = routes.contact.path
