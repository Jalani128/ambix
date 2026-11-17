import { useCallback, useEffect, useRef, useState } from 'react'
import Button from '../common/Button'
import { Highlight } from '../common/SectionHeading'

const hq = (n) => `${import.meta.env.BASE_URL}img/hq/${n}.jpg`
const DURATION = 7000

// Home hero slideshow, matching the client demo: crossfade + slow zoom, progress tabs, pause on hover.
const SLIDES = [
  {
    tab: ['AMBIX', 'From cloud to cable'], image: hq('riyadh'), alt: 'Riyadh skyline at night',
    eyebrow: 'IT · Cloud · Business apps · Infrastructure',
    title: 'Your technology foundation, from cloud to cable.', hi: 'from cloud to cable.',
    arabic: 'من السحابة إلى الكابل',
    lead: 'One accountable team to plan, deploy, secure and support the technology behind your business, anywhere in the Kingdom.',
    actions: [['Book a consultation', '#consultation'], ['Explore services', '/services']],
  },
  {
    tab: ['Dynamics 365', 'ERP & CRM'], image: hq('warehouse'), alt: 'Warehouse supervisor scanning stock into an ERP',
    eyebrow: 'New · Microsoft Dynamics 365',
    title: 'Finance, stock and sales in one system.', hi: 'one system.',
    lead: 'Dynamics 365 rollouts with ZATCA Phase 2 e-invoicing, Arabic forms and Power BI from day one.',
    actions: [['See Dynamics 365', '/services/microsoft-dynamics-365']],
  },
  {
    tab: ['SupportOS', 'Managed support'], image: hq('supportos'), alt: 'Support engineers in a monitoring centre',
    eyebrow: 'New · SupportOS',
    title: 'Support you can see working.', hi: 'see working.',
    lead: 'Tickets, SLAs, monitoring and assets in one live portal, in Arabic and English.',
    actions: [['Try the portal demo', '/services/supportos']],
  },
  {
    tab: ['Energy', '& Resources'], image: hq('solar'), alt: 'Engineer at a solar farm in the Saudi desert',
    eyebrow: 'New · Energy & Resources',
    title: 'Every kilowatt, measured and secured.', hi: 'measured and secured.',
    lead: 'Energy monitoring, OT security and remote-site connectivity for power, oil & gas, water and renewables.',
    actions: [['Explore Energy', '/industries/energy-resources']],
  },
  {
    tab: ['Infrastructure', 'Networks & CCTV'], image: hq('cabling'), alt: 'Technician patching cables in a server rack',
    eyebrow: 'Infrastructure & Security',
    title: 'Networks, CCTV and cabling done properly.', hi: 'done properly.',
    lead: 'Certified cabling, segmented networks and surveillance, handed over with full as-built documentation.',
    actions: [['View all services', '/services']],
  },
]

const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function HeroSlider() {
  const [cur, setCur] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef(null)

  const go = useCallback((i) => setCur((i + SLIDES.length) % SLIDES.length), [])

  useEffect(() => {
    clearTimeout(timer.current)
    if (!paused && !reduceMotion()) timer.current = setTimeout(() => go(cur + 1), DURATION)
    return () => clearTimeout(timer.current)
  }, [cur, paused, go])

  return (
    <section
      className={`hslider ${paused ? 'is-paused' : ''}`}
      aria-roledescription="carousel"
      aria-label="Highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {SLIDES.map((s, i) => {
        const Heading = i === 0 ? 'h1' : 'h2'
        return (
          <div key={s.tab[0]} className={`hslide ${i === cur ? 'is-on' : ''}`} aria-hidden={i !== cur} aria-roledescription="slide" aria-label={`${i + 1} of ${SLIDES.length}`}>
            <img src={s.image} alt={s.alt} loading={i === 0 ? 'eager' : 'lazy'} fetchPriority={i === 0 ? 'high' : 'auto'} />
            <div className="container hslide__inner">
              <div className="hslide__copy">
                <p className="eyebrow">{s.eyebrow}</p>
                <Heading className="hslide__title"><Highlight title={s.title} hi={s.hi} /></Heading>
                {s.arabic && <p className="hero__ar" lang="ar" dir="rtl">{s.arabic}</p>}
                <p className="hero__lead">{s.lead}</p>
                <div className="hero__actions">
                  {s.actions.map(([label, to], k) => (
                    <Button key={label} tabIndex={i === cur ? 0 : -1} to={to.startsWith('#') ? undefined : to} href={to.startsWith('#') ? to : undefined} variant={k ? 'ghost' : 'primary'}>{label}</Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      })}
      <div className="hslider__tabs">
        <div className="container hslider__tabgrid" role="tablist">
          {SLIDES.map((s, i) => (
            <button
              key={s.tab[0]}
              type="button"
              role="tab"
              aria-selected={i === cur}
              className={`hstab ${i === cur ? 'is-on' : ''} ${i < cur ? 'is-done' : ''}`}
              onClick={() => go(i)}
            >
              <span className="hstab__bar"><i key={i === cur ? `on-${cur}` : 'off'} /></span>
              <b>{s.tab[0]}</b>
              <span>{s.tab[1]}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
