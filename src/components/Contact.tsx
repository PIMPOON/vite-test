import { useEffect, useRef, useState } from 'react'

export const Contact = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [material, setMaterial] = useState<'PLA' | 'PETG' | 'ABS' | 'TPU' | 'OTHER' | 'DONT_KNOW'>('DONT_KNOW')
  const [color, setColor] = useState<string>('')

  const token = import.meta.env.VITE_PUSHOVER_TOKEN as string | undefined
  const user = import.meta.env.VITE_PUSHOVER_USER as string | undefined

  const nameRef = useRef<HTMLInputElement | null>(null)

  const open = () => setIsOpen(true)
  const close = () => {
    setIsOpen(false)
    setStatus('idle')
    setError(null)
  }

  // Open when hero dispatches the custom event
  useEffect(() => {
    const handler: EventListener = () => open()
    window.addEventListener('open-contact', handler)
    return () => window.removeEventListener('open-contact', handler)
  }, [])

  // Focus first field and lock body scroll when modal opens
  useEffect(() => {
    if (isOpen) {
      nameRef.current?.focus()
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [isOpen])

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    if (isOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Color is required unless material is "Don't know"
    if (material !== 'DONT_KNOW' && color === '') {
      setStatus('error')
      setError('Please select a color or choose “Don’t know” for material to leave color empty.')
      return
    }

    if (!token || !user) {
      console.error('Missing VITE_PUSHOVER_TOKEN or VITE_PUSHOVER_USER')
      setStatus('error')
      setError('Something went wrong while sending. Please try again later.')
      return
    }

    setStatus('loading')

    const body = new URLSearchParams({
      token,
      user,
      title: 'Studio Xenon — New website contact',
      message:
        `From: ${name} <${email}>\n` +
        `Material: ${materialLabel(material)}\n` +
        `Color: ${color || '—'}\n\n` +
        `${message}`,
      priority: '0',
    })

    try {
      const res = await fetch('https://api.pushover.net/1/messages.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body,
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data.status !== 1) {
        throw new Error(data.errors?.join(', ') || 'Failed to send notification')
      }
      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
      setMaterial('DONT_KNOW')
      setColor('')
    } catch (err: any) {
      console.error(err)
      setError('Something went wrong while sending. Please try again later.')
      setStatus('error')
    }
  }

  return (
    <>
      {/* ...no in-page trigger... */}

      {isOpen && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) close()
          }}
        >
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
            <div className="modal-header">
              <h3 id="contact-modal-title" style={{ margin: 0 }}>Contact Studio Xenon</h3>
              <button className="modal-close" onClick={close} aria-label="Close" />
            </div>

            <p className="text-muted" style={{ marginTop: 6, marginBottom: 12 }}>
              Fill the form and we’ll receive a Pushover notification instantly.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
              <Field label="Name">
                <input ref={nameRef} value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" style={inputStyle} />
              </Field>

              <Field label="Email">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your.email@example.com" style={inputStyle} />
              </Field>

              <Field label="Material (filament)">
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value as typeof material)}
                  required
                  style={inputStyle as React.CSSProperties}
                >
                  <option value="PLA">PLA</option>
                  <option value="PETG">PETG</option>
                  <option value="ABS">ABS</option>
                  <option value="TPU">TPU</option>
                  <option value="OTHER">Other</option>
                  <option value="DONT_KNOW">Don't know</option>
                </select>
              </Field>

              <Field label="Color">
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  required={material !== 'DONT_KNOW'}
                  style={inputStyle as React.CSSProperties}
                >
                  <option value="">Select color</option>
                  <option value="Black">Black</option>
                  <option value="White">White</option>
                  <option value="Gray">Gray</option>
                  <option value="Clear/Transparent">Clear / Transparent</option>
                  <option value="Red">Red</option>
                  <option value="Blue">Blue</option>
                  <option value="Green">Green</option>
                  <option value="Yellow">Yellow</option>
                  <option value="Orange">Orange</option>
                  <option value="Purple">Purple</option>
                  <option value="Other">Other</option>
                </select>
              </Field>

              <Field label="Project details">
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={6} placeholder="Tell us about your project..." style={{ ...inputStyle, resize: 'vertical' }} />
              </Field>

              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button type="button" onClick={close} style={{ appearance: 'none', border: '1px solid var(--border)', borderRadius: 999, background: 'transparent', color: 'var(--muted)', padding: '0.75rem 1rem', fontWeight: 600 }}>
                  Cancel
                </button>
                <button type="submit" disabled={status === 'loading'} style={{ appearance: 'none', border: '1px solid var(--border)', borderRadius: 999, background: 'linear-gradient(180deg, #0e131a, #0a0f15)', color: 'var(--text)', padding: '0.85rem 1.25rem', fontWeight: 600, cursor: status === 'loading' ? 'not-allowed' : 'pointer', opacity: status === 'loading' ? 0.7 : 1 }}>
                  {status === 'loading' ? 'Sending…' : 'Send message'}
                </button>
              </div>

              {status === 'success' && <div className="text-muted" style={{ color: 'var(--accent)' }}>Thanks! We received your message and will reply to {email || 'you'} soon.</div>}
              {status === 'error' && <div className="text-muted" style={{ color: '#ff9580' }}>{error}</div>}
            </form>
          </div>
        </div>
      )}
    </>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'grid', gap: 6, textAlign: 'left' }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)' }}>{label}</span>
      {children}
    </label>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: 10,
  border: '1px solid var(--border)',
  background: 'rgba(255,255,255,0.02)',
  color: 'var(--text)',
  outline: 'none',
}

function materialLabel(m: 'PLA' | 'PETG' | 'ABS' | 'TPU' | 'OTHER' | 'DONT_KNOW') {
  switch (m) {
    case 'PLA': return 'PLA'
    case 'PETG': return 'PETG'
    case 'ABS': return 'ABS'
    case 'TPU': return 'TPU'
    case 'OTHER': return 'Other'
    case 'DONT_KNOW': return 'Don’t know'
  }
}