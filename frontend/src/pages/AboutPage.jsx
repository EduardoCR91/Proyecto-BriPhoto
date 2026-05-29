import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

export default function AboutPage() {
  useReveal()
  return (
    <main>
      <section className="reveal py-16">
        <div className="section-wrap">
          <p className="section-eyebrow">Nuestro equipo</p>
          <h1 className="section-title">Historias visuales con direccion creativa y precision tecnica</h1>
          <div className="grid gap-4 md:grid-cols-3">
            <article className="card"><h3 className="font-display text-3xl">CEO y productor</h3><p>Brian Rojas Rios</p></article>
            <article className="card"><h3 className="font-display text-3xl">Creativos y diseno</h3><p>Duvan Quiroga, Zarica Calderon y David Peñuela.</p></article>
            <article className="card"><h3 className="font-display text-3xl">Produccion fotografía y video</h3><p>Diego Zambrano, Juan Sebastían Garcia y Brian Rojas Rios.</p></article>
          </div>
        </div>
      </section>

      <section className="reveal section-wrap grid items-center gap-6 pb-16 md:grid-cols-2">
        <div>
          <p className="section-eyebrow">Manifiesto</p>
          <h2 className="section-title">No solo capturamos imagenes, construimos posicionamiento visual</h2>
          <p className="mb-5">Trabajamos cada proyecto desde la estrategia, la direccion y la ejecucion para lograr piezas que emocionan y, al mismo tiempo, cumplen objetivos de marca y negocio.</p>
          <Link to="/contacto" className="btn btn-primary">Hablemos de tu proyecto</Link>
        </div>
        <img src="/IMG_principal/office.webp" alt="Equipo creativo" className="h-[360px] w-full rounded-2xl object-cover" />
      </section>
    </main>
  )
}
