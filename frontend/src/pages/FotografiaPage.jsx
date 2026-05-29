import { useMemo, useState } from 'react'
import MediaModal from '../components/MediaModal'
import { useReveal } from '../hooks/useReveal'

const photos = [
  '/Fotografia/Imagenes Pets/DSC07263_rtk.webp',
  '/Fotografia/Imagenes Arquitectonicas/DSC09819_rtk.webp',
  '/Fotografia/Imagenes Productos/DSC04943_RTK.webp',
  '/Fotografia/Imagenes Social/BODA ALEJANDRA & CAMILO-309.webp',
  '/Fotografia/Imagenes Productos/DSC04950_RTK.webp',
]

export default function FotografiaPage() {
  useReveal()
  const [selected, setSelected] = useState('')

  const modalContent = useMemo(
    () => (selected ? <img src={selected} alt="Fotografia" className="max-h-[74vh] w-full rounded-xl object-contain" /> : null),
    [selected]
  )

  return (
    <main>
      <section className="reveal py-16">
        <div className="section-wrap">
          <p className="section-eyebrow">Fotografia</p>
          <h1 className="section-title">Fotografia con direccion artistica y enfoque comercial</h1>
          <div className="grid gap-4 md:grid-cols-3">
            <article className="card"><h3 className="font-display text-3xl">Pets</h3><p>Sesion natural y emocional para retratos memorables.</p></article>
            <article className="card"><h3 className="font-display text-3xl">Arquitectonica</h3><p>Lineas, luz y espacios para realzar proyectos.</p></article>
            <article className="card"><h3 className="font-display text-3xl">Producto y social</h3><p>Fotografia para marcas, eventos y contenido digital.</p></article>
          </div>
        </div>
      </section>

      <section className="reveal bg-deep py-16">
        <div className="section-wrap">
          <p className="section-eyebrow text-white">Galeria</p>
          <h2 className="section-title text-white">Selecciones por categoria</h2>
          <div className="grid gap-3 md:grid-cols-5">
            {photos.map((src) => (
              <button
                key={src}
                className="overflow-hidden rounded-xl md:h-72"
                onClick={() => setSelected(src)}
              >
                <img src={src} alt="Fotografia" className="h-60 w-full object-cover md:h-full" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <MediaModal open={Boolean(selected)} onClose={() => setSelected('')} content={modalContent} />
    </main>
  )
}
