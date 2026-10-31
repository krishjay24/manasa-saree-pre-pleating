/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional override for the business WhatsApp number. Prefer `business.contact.whatsappNumber`. */
  readonly VITE_BUSINESS_PHONE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
