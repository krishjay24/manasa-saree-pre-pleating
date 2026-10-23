/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Production origin without trailing slash, e.g. https://example.in */
  readonly VITE_SITE_URL?: string
  /** Optional override for the business WhatsApp number. Prefer `business.contact.whatsappNumber`. */
  readonly VITE_BUSINESS_PHONE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
