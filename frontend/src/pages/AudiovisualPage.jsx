import { useMemo, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import MediaModal from '../components/MediaModal'

const videos = [
  {
    label: 'Ver video empresarial',
    cover: '/Produccion_audiovisual/img/fondo1.jpg',
    type: 'local',
    src: '/Produccion_audiovisual/vid/corporativa/LIBROALAIRE CHRIS CARPENTIER.webm',
  },
  {
    label: 'Ver video social',
    cover: '/Produccion_audiovisual/img/fondo2.jpg',
    type: 'youtube',
    src: '/Produccion_audiovisual/vid/social/Reel Jennifer & Juan Pablo.webm',
  },
]

const allies = [
  ['Assa Abloy', '/Produccion_audiovisual/img/Assa Abloy.jpeg'],
  ['Salitre Magico', '/Produccion_audiovisual/img/logos-diversion-salitre-magico.jpg'],
  ['Libro Al Aire', '/Produccion_audiovisual/img/Libro al aire.jpg'],
]

export default function AudiovisualPage() {
  useReveal()
  const [selected, setSelected] = useState(null)

  const modalContent = useMemo(() => {
    if (!selected) return null
    if (selected.type === 'youtube') {
      return <iframe src={selected.src} title="Video" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen className="h-[64vh] w-full rounded-xl border-0 bg-black" />
    }
    return (
      <video controls autoPlay className="h-[64vh] w-full rounded-xl bg-black">
        <source src={selected.src} type="video/webm" />
      </video>
    )
  }, [selected])

  return (
    <main>
      <section className="reveal py-16">
        <div className="section-wrap">
          <p className="section-eyebrow">Audiovisual</p>
          <h1 className="section-title">Producciones audiovisuales que posicionan tu marca</h1>
          <div className="grid gap-4 md:grid-cols-3">
            <article className="card"><h3 className="font-display text-3xl">Preproduccion</h3><p>Concepto creativo, guion y planeacion visual.</p></article>
            <article className="card"><h3 className="font-display text-3xl">Rodaje</h3><p>Direccion, captura y ritmo narrativo orientado a marca.</p></article>
            <article className="card"><h3 className="font-display text-3xl">Postproduccion</h3><p>Edicion, color y master final para redes y campañas.</p></article>
          </div>
        </div>
      </section>

      <section className="reveal bg-deep py-16">
        <div className="section-wrap">
          <p className="section-eyebrow text-white">Showreel</p>
          <h2 className="section-title text-white">Empresarial y social</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {videos.map((item) => (
              <button key={item.label} onClick={() => setSelected(item)} className="relative overflow-hidden rounded-xl text-left">
                <img src={item.cover} alt={item.label} className="h-64 w-full object-cover brightness-75" loading="lazy" />
                <span className="absolute bottom-4 left-4 rounded-full bg-black/35 px-4 py-2 text-sm font-semibold text-white">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal py-16">
        <div className="section-wrap">
          <p className="section-eyebrow">Clientes</p>
          <h2 className="section-title">Grandes marcas que han dejado sus proyectos en nuestras manos</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {allies.map(([name, src]) => (
              <article key={name} className="card flex min-h-[290px] flex-col justify-between gap-3 bg-gradient-to-b from-white to-[#f9f7f1] p-4 text-center">
                <div className="grid aspect-[16/10] min-h-[180px] max-h-[210px] place-items-center overflow-hidden rounded-xl border border-[#ece7db] bg-white p-4">
                  <img src={src} alt={name} className="max-h-full max-w-full object-contain" loading="lazy" />
                </div>
                <h3 className="font-display text-3xl">{name}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <MediaModal open={Boolean(selected)} onClose={() => setSelected(null)} content={modalContent} />
    </main>
  )
}
