import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  ['/', 'Inicio'],
  ['/audiovisual', 'Produccion audiovisual'],
  ['/fotografia', 'Fotografia'],
  ['/locucion', 'Locucion comercial'],
  ['/quienes-somos', 'Quienes somos'],
  ['/contacto', 'Contacto'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f1116]/85 backdrop-blur-md">
      <nav className="section-wrap flex items-center justify-between gap-4 py-3">
        <Link to="/" className="shrink-0" aria-label="Ir al inicio">
          <img src="/IMG_principal/LOGO_BLANCO_BRI.webp" alt="BriPhotoFilms" className="h-auto w-20" />
        </Link>

        <button
          className="md:hidden rounded border border-white/20 px-3 py-2 text-white"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          Menu
        </button>

        <ul className={`${open ? 'flex' : 'hidden'} absolute left-4 right-4 top-16 flex-col gap-2 rounded-xl border border-white/20 bg-[#141925] p-3 md:static md:flex md:flex-row md:items-center md:gap-3 md:border-0 md:bg-transparent md:p-0`}>
          {links.map(([to, label]) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `block rounded px-3 py-2 text-sm ${isActive ? 'text-[#e9bf67]' : 'text-white hover:text-[#e9bf67]'}`}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
