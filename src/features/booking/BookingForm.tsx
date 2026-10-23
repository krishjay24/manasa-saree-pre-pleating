import { CircleAlert, ExternalLink, Info, Send } from 'lucide-react'
import { type FormEvent, type ReactNode, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../app/routes'
import { InstagramIcon } from '../../components/ui/BrandIcons'
import { Button } from '../../components/ui/Button'
import { business, pricesConfirmed, services } from '../../data/business'
import { formatPrice } from '../../utils/format'
import { openWhatsApp } from '../../utils/whatsapp'
import {
  type BookingErrors,
  type BookingField,
  type BookingFormValues,
  emptyBookingForm,
  fabricOptions,
  MAX_EVENT_LENGTH,
  MAX_LOCATION_LENGTH,
  MAX_NOTES_LENGTH,
  MAX_QUANTITY,
  toIsoDate,
  validateBooking,
} from './bookingValidation'
import styles from './BookingForm.module.css'
import { instagramDmUrl, isWhatsAppConfigured } from './contactLinks'
import { buildBookingMessage } from './whatsappMessage'

const serviceIds = services.map((service) => service.id)
const fieldOrder: BookingField[] = [
  'name',
  'phone',
  'event',
  'serviceId',
  'quantity',
  'date',
  'time',
  'location',
  'fabric',
  'notes',
]
const fieldLabels: Record<BookingField, string> = {
  name: 'Customer name',
  phone: 'Contact number',
  event: 'Event',
  serviceId: 'Service required',
  quantity: 'Saree quantity',
  date: 'Preferred date',
  time: 'Preferred time',
  location: 'Location',
  fabric: 'Fabric type',
  notes: 'Additional requirements',
}

interface FieldProps {
  id: string
  field: BookingField
  error?: string
  hint?: string
  optional?: boolean
  children: (props: { id: string; 'aria-invalid': boolean; 'aria-describedby'?: string }) => ReactNode
}

function Field({ id, field, error, hint, optional, children }: FieldProps) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
  return (
    <div className={`${styles.field} ${error ? styles.hasError : ''}`}>
      <label htmlFor={id} className={styles.label}>
        {fieldLabels[field]}
        {optional ? <span className={styles.optional}> (optional)</span> : <span aria-hidden="true"> *</span>}
      </label>
      {children({ id, 'aria-invalid': Boolean(error), 'aria-describedby': describedBy })}
      {hint && (
        <p id={`${id}-hint`} className={styles.hint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className={styles.error}>
          <CircleAlert size={14} aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  )
}

export function BookingForm() {
  const baseId = useId()
  const fieldId = (field: BookingField) => `${baseId}-${field}`
  const [values, setValues] = useState<BookingFormValues>(emptyBookingForm)
  const [errors, setErrors] = useState<BookingErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [openedUrl, setOpenedUrl] = useState<string | null>(null)
  const summaryRef = useRef<HTMLDivElement>(null)

  const update = <K extends BookingField>(field: K, value: BookingFormValues[K]) => {
    const next = { ...values, [field]: value }
    setValues(next)
    setOpenedUrl(null)
    if (submitted) setErrors(validateBooking(next, serviceIds))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    const nextErrors = validateBooking(values, serviceIds)
    setErrors(nextErrors)

    const firstInvalid = fieldOrder.find((field) => nextErrors[field])
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus()
      return
    }

    const service = services.find((s) => s.id === values.serviceId)
    const url = openWhatsApp(buildBookingMessage(values, service))
    if (!url) {
      summaryRef.current?.focus()
      return
    }
    setOpenedUrl(url)
  }

  const errorList = fieldOrder.filter((field) => errors[field])

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate aria-labelledby={`${baseId}-title`}>
      <div className={styles.head}>
        <h2 id={`${baseId}-title`} className={styles.title}>
          Booking enquiry
        </h2>
        <p className={styles.intro}>
          Fill in the details and we will prepare a WhatsApp message for you to send. Fields marked * are required.
        </p>
      </div>

      {!isWhatsAppConfigured && (
        <div className={`${styles.alert} ${styles.alertWarning}`} role="note" ref={summaryRef} tabIndex={-1}>
          <Info size={18} aria-hidden="true" />
          <div>
            <p>
              <strong>WhatsApp booking is not available yet.</strong> The business WhatsApp number has not been set up on
              this website, so enquiries cannot be sent from this form.
            </p>
            <p>
              Please message us on Instagram{' '}
              <a href={instagramDmUrl} target="_blank" rel="noopener noreferrer">
                @{business.contact.instagramHandle}
              </a>{' '}
              in the meantime.
            </p>
          </div>
        </div>
      )}

      {errorList.length > 0 && (
        <div className={`${styles.alert} ${styles.alertError}`} role="alert">
          <CircleAlert size={18} aria-hidden="true" />
          <div>
            <p>
              <strong>Please correct {errorList.length === 1 ? 'the highlighted field' : `${errorList.length} fields`}:</strong>
            </p>
            <ul>
              {errorList.map((field) => (
                <li key={field}>
                  <button
                    type="button"
                    className={styles.fieldJump}
                    onClick={() => document.getElementById(fieldId(field))?.focus()}
                  >
                    {fieldLabels[field]}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className={styles.grid}>
        <Field id={fieldId('name')} field="name" error={errors.name}>
          {(props) => (
            <input
              {...props}
              className={styles.input}
              type="text"
              autoComplete="name"
              maxLength={60}
              value={values.name}
              onChange={(e) => update('name', e.target.value)}
            />
          )}
        </Field>

        <Field id={fieldId('phone')} field="phone" error={errors.phone} hint="10-digit mobile number">
          {(props) => (
            <input
              {...props}
              className={styles.input}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={16}
              value={values.phone}
              onChange={(e) => update('phone', e.target.value)}
            />
          )}
        </Field>

        <Field id={fieldId('event')} field="event" error={errors.event} optional hint="Wedding, office, festival…">
          {(props) => (
            <input
              {...props}
              className={styles.input}
              type="text"
              maxLength={MAX_EVENT_LENGTH}
              value={values.event}
              onChange={(e) => update('event', e.target.value)}
            />
          )}
        </Field>

        <Field id={fieldId('serviceId')} field="serviceId" error={errors.serviceId}>
          {(props) => (
            <select
              {...props}
              className={styles.input}
              value={values.serviceId}
              onChange={(e) => update('serviceId', e.target.value as BookingFormValues['serviceId'])}
            >
              <option value="">Choose a service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                  {pricesConfirmed ? ` — ${formatPrice(service.price)}` : ''}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field id={fieldId('quantity')} field="quantity" error={errors.quantity}>
          {(props) => (
            <input
              {...props}
              className={styles.input}
              type="number"
              inputMode="numeric"
              min={1}
              max={MAX_QUANTITY}
              step={1}
              value={values.quantity}
              onChange={(e) => update('quantity', e.target.value)}
            />
          )}
        </Field>

        <Field id={fieldId('date')} field="date" error={errors.date} hint="Your function date or when you need the saree">
          {(props) => (
            <input
              {...props}
              ref={(el) => {
                if (el) el.min = toIsoDate(new Date())
              }}
              className={styles.input}
              type="date"
              value={values.date}
              onChange={(e) => update('date', e.target.value)}
            />
          )}
        </Field>

        <Field id={fieldId('time')} field="time" error={errors.time} optional>
          {(props) => (
            <input
              {...props}
              className={styles.input}
              type="time"
              value={values.time}
              onChange={(e) => update('time', e.target.value)}
            />
          )}
        </Field>

        <Field id={fieldId('location')} field="location" error={errors.location} optional hint="Pickup area or drop-off in Kovur">
          {(props) => (
            <input
              {...props}
              className={styles.input}
              type="text"
              maxLength={MAX_LOCATION_LENGTH}
              value={values.location}
              onChange={(e) => update('location', e.target.value)}
            />
          )}
        </Field>

        <Field id={fieldId('fabric')} field="fabric" error={errors.fabric}>
          {(props) => (
            <select {...props} className={styles.input} value={values.fabric} onChange={(e) => update('fabric', e.target.value)}>
              <option value="">Choose fabric type</option>
              {fabricOptions.map((fabric) => (
                <option key={fabric} value={fabric}>
                  {fabric}
                </option>
              ))}
            </select>
          )}
        </Field>

        <div className={styles.full}>
          <Field
            id={fieldId('notes')}
            field="notes"
            error={errors.notes}
            optional
            hint={`Express delivery, number of pleats, or anything else we should know. ${values.notes.length}/${MAX_NOTES_LENGTH}`}
          >
            {(props) => (
              <textarea
                {...props}
                className={`${styles.input} ${styles.textarea}`}
                rows={4}
                maxLength={MAX_NOTES_LENGTH + 50}
                value={values.notes}
                onChange={(e) => update('notes', e.target.value)}
              />
            )}
          </Field>
        </div>
      </div>

      <div className={styles.actions}>
        <Button type="submit" size="lg" disabled={!isWhatsAppConfigured} icon={<Send size={18} aria-hidden="true" />}>
          Continue to WhatsApp
        </Button>
        {!isWhatsAppConfigured && (
          <Button href={instagramDmUrl} variant="outline" size="lg" icon={<InstagramIcon size={18} />}>
            Message on Instagram
          </Button>
        )}
      </div>

      {openedUrl && (
        <div className={`${styles.alert} ${styles.alertInfo}`} role="status">
          <Info size={18} aria-hidden="true" />
          <div>
            <p>
              <strong>Your message is ready in WhatsApp.</strong> Please press <strong>Send</strong> in WhatsApp to share
              your enquiry. Your booking is confirmed only after we reply and the 50% advance is received.
            </p>
            <p>
              WhatsApp did not open?{' '}
              <a href={openedUrl} target="_blank" rel="noopener noreferrer">
                Open WhatsApp <ExternalLink size={12} aria-hidden="true" />
              </a>
            </p>
          </div>
        </div>
      )}

      <p className={styles.privacy}>
        Your details are not stored on this website — they are only placed into a WhatsApp message that you choose to
        send. See our <Link to={routes.privacy.path}>Privacy Policy</Link> and{' '}
        <Link to={routes.terms.path}>Booking Terms</Link>.
      </p>
    </form>
  )
}
