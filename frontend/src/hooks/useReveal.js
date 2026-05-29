import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll('.reveal')
    if (!items.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('show')
          else entry.target.classList.remove('show')
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -6% 0px' }
    )

    items.forEach((el) => observer.observe(el))
    return () => items.forEach((el) => observer.unobserve(el))
  }, [])
}
