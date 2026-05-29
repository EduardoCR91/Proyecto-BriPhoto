import { useReveal } from '../hooks/useReveal'

const baseAudios = [
  ['Tono emotivo', '/Locucion_Comercial/Audios/SURA 1 TONO EMOTIVO.mp3'],
  ['Tono energetico', '/Locucion_Comercial/Audios/SURA 2 TONO ENERGICO.mp3'],
  ['Tono natural', '/Locucion_Comercial/Audios/SURA 3 TONO NATURAL.mp3'],
]

const showcaseAudios = [
  ['Cliente Salitre Magico', '/Locucion_Comercial/Audios/2.Audio Cliente Salitre Magico.mp3'],
  ['Cliente Sura voz off', '/Locucion_Comercial/Audios/2.Cliente SURA voz off para pagina Web.mp3'],
  ['Voice over motivacional', '/Locucion_Comercial/Audios/Muestra Voice over Video Motivacional1.mp3'],
]

export default function LocucionPage() {
  useReveal()
  return (
    <main>
      <section className="reveal py-16 md:py-20">
        <div className="section-wrap">
          <p className="section-eyebrow">Locucion</p>
          <h1 className="section-title mb-8 md:mb-10">Locucion profesional para mensajes claros y memorables</h1>
          <div className="grid gap-4 md:gap-5 md:grid-cols-3">
            {baseAudios.map(([label, src]) => (
              <article key={label} className="card min-h-[170px]">
                <h3 className="mb-3 font-display text-3xl">{label}</h3>
                <audio controls preload="none" className="w-full">
                  <source src={src} type="audio/mpeg" />
                </audio>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal bg-deep py-16 md:py-20">
        <div className="section-wrap">
          <p className="section-eyebrow mb-2 text-white">Muestras</p>
          <h2 className="section-title mb-8 text-white md:mb-10">Trabajos comerciales destacados</h2>
          <div className="grid gap-4 md:gap-5 md:grid-cols-3">
            {showcaseAudios.map(([label, src]) => (
              <article key={label} className="card min-h-[170px]">
                <h3 className="mb-3 font-display text-3xl">{label}</h3>
                <audio controls preload="none" className="w-full">
                  <source src={src} type="audio/mpeg" />
                </audio>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
