import type { MediaId } from '../data/media'

export type ServiceId = 'regular' | 'bridal' | 'ready-to-wear' | 'ironing'

export interface Service {
  id: ServiceId
  name: string
  /** Telugu/colloquial name used in the client profile */
  localName: string
  summary: string
  description: string
  price: number
  fabrics: string
  occasions: string[]
  turnaround?: string
  imageId: MediaId
}

export interface AddOn {
  id: string
  name: string
  localName: string
  description: string
  price: number
  priceLabel: string
  availability: string
}

export interface ProcessStep {
  step: string
  title: string
  localName: string
  description: string
}

export interface Policy {
  title: string
  description: string
}

export interface FaqItem {
  question: string
  answer: string
}
