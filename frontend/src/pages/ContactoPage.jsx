import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

function encode(data) {
  return new URLSearchParams(data).toString()
}

export default function ContactoPage() {
  useReveal()
  const [sending, setSending] = useState(false)
  const [ok, setOk] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    const formElement = event.currentTarget
    const form = new FormData(formElement)
    const payload = {
      'form-name': 'contacto',
      nombre: (form.get('nombre') || '').toString().trim(),
      correo: (form.get('correo') || '').toString().trim(),
      asunto: (form.get('asunto') || '').toString().trim(),
      mensaje: (form.get('mensaje') || '').toString().trim(),
      'bot-field': '',
    }

    if (!payload.nombre || !payload.correo || !payload.asunto || !payload.mensaje) return

    try {
      setSending(true)
      setOk(false)
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(payload),
      })
      formElement.reset()
      setOk(true)
      setTimeout(() => setOk(false), 5000)
    } catch (err) {
      alert(`Ocurrio un error al enviar el mensaje: ${err.message}`)
    } finally {
      setSending(false)
    }
  }

  return (
    <main>
      <section className="reveal py-16">
        <div className="section-wrap">
          <p className="section-eyebrow">Contacto</p>
          <h1 className="section-title">Cuentanos tu proyecto y construimos una propuesta a medida</h1>
          <div className="grid items-start gap-5 md:grid-cols-[1.5fr_1fr]">
            <article className="card p-6">
              <h3 className="mb-3 font-display text-3xl">Ponte en contacto</h3>
              <form
                name="contacto"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={submit}
                className="grid gap-3"
              >
                <input type="hidden" name="form-name" value="contacto" />
                <input type="hidden" name="bot-field" />
                <label className="text-sm font-semibold">Nombre</label>
                <input name="nombre" required className="rounded-xl border border-[#dfd8c8] bg-[#fffdf8] px-4 py-3" />
                <label className="text-sm font-semibold">Email</label>
                <input name="correo" type="email" required className="rounded-xl border border-[#dfd8c8] bg-[#fffdf8] px-4 py-3" />
                <label className="text-sm font-semibold">Asunto</label>
                <input name="asunto" required className="rounded-xl border border-[#dfd8c8] bg-[#fffdf8] px-4 py-3" />
                <label className="text-sm font-semibold">Mensaje</label>
                <textarea name="mensaje" rows="5" required className="rounded-xl border border-[#dfd8c8] bg-[#fffdf8] px-4 py-3" />
                <button disabled={sending} className="btn btn-primary w-fit border-0 disabled:opacity-60">{sending ? 'Enviando...' : 'Enviar ahora'}</button>
              </form>
              {ok && <p className="mt-3 font-semibold text-green-700">Tu mensaje ha sido enviado correctamente.</p>}
            </article>

            <article className="card grid gap-3 bg-gradient-to-br from-[#141925] to-[#202838] p-6">
              <h3 className="font-display text-3xl text-white">Canales directos</h3>
              <a className="rounded-xl border border-[#e8c47e4d] bg-white/5 px-4 py-3 font-semibold text-[#f0d39b] no-underline" href="https://www.instagram.com/briphotofilms?igsh=MWNwODBlb3hjbmhrMQ==" target="_blank" rel="noreferrer">Instagram</a>
              <a className="rounded-xl border border-[#e8c47e4d] bg-white/5 px-4 py-3 font-semibold text-[#f0d39b] no-underline" href="https://www.facebook.com/bri.rojasrios?mibextid=LQQJ4d" target="_blank" rel="noreferrer">Facebook</a>
              <a className="rounded-xl border border-[#e8c47e4d] bg-white/5 px-4 py-3 font-semibold text-[#f0d39b] no-underline" href="https://wa.me/+573503742323" target="_blank" rel="noreferrer">WhatsApp</a>
              <a className="rounded-xl border border-[#e8c47e4d] bg-white/5 px-4 py-3 font-semibold text-[#f0d39b] no-underline" href="mailto:briPhothofilms@outlook.com">briPhothofilms@outlook.com</a>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}
