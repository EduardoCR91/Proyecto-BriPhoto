import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const homeImages = [
  '/IMG_principal/DSC07263_rtk.webp',
  '/IMG_principal/BODA KATIE & JONATHAN-181_websize.webp',
  '/IMG_principal/DSC07674_RTK.webp',
  '/IMG_principal/DSC00870_rtk.webp',
  '/IMG_principal/DSC04950_RTK.webp',
]

export default function HomePage() {
  useReveal()

  return (
    <main>
      <section className="reveal relative grid min-h-[80vh] place-items-center bg-[url('/IMG_principal/photography-camera-lens-close-up-f6fp1hpvcf5486o3.webp')] bg-cover bg-center px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#080a0fcc] to-[#10152288]" />
        <div className="relative max-w-3xl text-white">
          <p className="section-eyebrow">Estudio creativo visual</p>
          <h1 className="font-display text-4xl md:text-6xl">Fotografia y audiovisual con identidad premium</h1>
          <p>Creamos imagenes, piezas audiovisuales y narrativas de marca para proyectos que quieren verse memorables.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/contacto" className="btn btn-primary">Solicitar propuesta</Link>
            <a href="#portafolio" className="btn btn-ghost">Ver portafolio</a>
          </div>
        </div>
      </section>

      <section className="reveal py-16">
        <div className="section-wrap">
          <p className="section-eyebrow">Servicios</p>
          <h2 className="section-title">Soluciones visuales de alto impacto para marcas exigentes</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <article className="card"><h3 className="font-display text-3xl">Produccion audiovisual</h3><p className="mb-3">Reels, videos corporativos y piezas narrativas para campañas.</p><Link to="/audiovisual" className="font-semibold text-[#91640f]">Explorar</Link></article>
            <article className="card"><h3 className="font-display text-3xl">Fotografia profesional</h3><p className="mb-3">Social, producto, arquitectura y pets con direccion artistica.</p><Link to="/fotografia" className="font-semibold text-[#91640f]">Explorar</Link></article>
            <article className="card"><h3 className="font-display text-3xl">Locucion comercial</h3><p className="mb-3">Voces para anuncios y videos de marca con tono estratégico.</p><Link to="/locucion" className="font-semibold text-[#91640f]">Explorar</Link></article>
          </div>
        </div>
      </section>

      <section id="portafolio" className="reveal bg-deep py-16">
        <div className="section-wrap">
          <p className="section-eyebrow text-white">Portafolio</p>
          <h2 className="section-title text-white">Selecciones recientes</h2>
          <div className="grid gap-3 md:grid-cols-5">
            {homeImages.map((src) => (
              <img key={src} src={src} alt="Portafolio" className="h-60 w-full rounded-xl object-cover md:h-72" loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      <section className="reveal section-wrap grid items-center gap-6 py-16 md:grid-cols-2">
        <div>
          <p className="section-eyebrow">Quienes somos</p>
          <h2 className="section-title">Un equipo creativo que transforma ideas en resultados visuales</h2>
          <p className="mb-5">En BriPhotoFilms unimos direccion creativa, tecnica y sensibilidad narrativa para producir contenido visual que conecta con clientes y audiencias.</p>
          <Link to="/quienes-somos" className="btn btn-primary">Conocer al equipo</Link>
        </div>
        <img src="/IMG_principal/office.webp" alt="Equipo" className="h-[360px] w-full rounded-2xl object-cover" loading="lazy" />
      </section>
    </main>
  )
}
