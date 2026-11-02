/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ANALYTICS_ENABLED?: string
  /** Optional override for the business WhatsApp number. Prefer `business.contact.whatsappNumber`. */
  readonly VITE_BUSINESS_PHONE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
