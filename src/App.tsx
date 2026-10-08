import { useEffect, useRef, useState, useCallback, useMemo, lazy, Suspense } from 'react'
import './App.css'
import { projects, games, type ProjectDetail } from './data'
import { nl, en, type Lang } from './i18n'

const Scene3D = lazy(() => import('./Scene3D'))

const skillItems = [
  ['Java', 'C#', 'TypeScript', 'JavaScript', 'Lua/Luau', 'Dart', 'SQL', 'Bash'],
  ['Spring Boot', 'ASP.NET Core', 'Node.js', 'NestJS', 'Hibernate'],
  ['React', 'Angular', 'Flutter', 'Tailwind'],
  ['MySQL', 'MongoDB', 'Redis', 'Firebase'],
  ['Docker', 'Docker Swarm', 'Traefik', 'Jenkins', 'GitLab CI/CD', 'Git'],
  ['Layered', 'Microkernel', 'REST', 'OAuth2/JWT', 'SOLID', 'C4 & ADR'],
  ['Roblox Studio', 'Rojo', 'Moon Animator', 'Blender'],
]

const roles = ['Fullstack Developer', 'Roblox Game Dev', 'Student @ AP Hogeschool']

const ACCENT_THEMES = [
  { name: 'purple', accent: '#8b5cf6', accent2: '#06b6d4', accent3: '#f472b6' },
  { name: 'cyan', accent: '#06b6d4', accent2: '#8b5cf6', accent3: '#34d399' },
  { name: 'pink', accent: '#ec4899', accent2: '#8b5cf6', accent3: '#f59e0b' },
  { name: 'green', accent: '#10b981', accent2: '#06b6d4', accent3: '#f472b6' },
]

/* ── Custom Cursor ── */

function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (dotRef.current) { dotRef.current.style.left = `${e.clientX}px`; dotRef.current.style.top = `${e.clientY}px` }
      if (ringRef.current) { ringRef.current.style.left = `${e.clientX}px`; ringRef.current.style.top = `${e.clientY}px` }
    }
    const grow = () => ringRef.current?.classList.add('cursor-grow')
    const shrink = () => ringRef.current?.classList.remove('cursor-grow')

    window.addEventListener('mousemove', move)
    const attach = () => {
      document.querySelectorAll('a, button, .card, .game-card, .tilt, .skill-chip, .trait-chip').forEach(el => {
        el.addEventListener('mouseenter', grow)
        el.addEventListener('mouseleave', shrink)
      })
    }
    attach()
    const obs = new MutationObserver(attach)
    obs.observe(document.body, { childList: true, subtree: true })

    return () => { window.removeEventListener('mousemove', move); obs.disconnect() }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}

/* ── Scroll Progress Bar ── */

function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      if (ref.current) ref.current.style.transform = `scaleX(${Math.min(scrolled, 1)})`
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return <div ref={ref} className="scroll-progress" />
}

/* ── Floating Elements ── */

const COLORS = ['#8b5cf6', '#06b6d4', '#f472b6', '#a78bfa', '#22d3ee', '#c084fc', '#34d399', '#fb923c']

function FloatingElements() {
  const els = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 14 + 5,
      color: COLORS[i % COLORS.length],
      dur: Math.random() * 20 + 12,
      delay: Math.random() * 20,
      shape: i % 3,
    }))
  , [])

  return (
    <div className="floating-els">
      {els.map(el => (
        <div
          key={el.id}
          className={`float-el float-shape-${el.shape}`}
          style={{
            left: `${el.x}%`,
            width: el.size,
            height: el.size,
            background: el.color,
            animationDuration: `${el.dur}s`,
            animationDelay: `${el.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ── Typing Effect ── */

function TypingText() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const role = roles[roleIdx]
    const speed = deleting ? 40 : 80

    if (!deleting && text === role) {
      const pause = setTimeout(() => setDeleting(true), 2000)
      return () => clearTimeout(pause)
    }
    if (deleting && text === '') {
      setDeleting(false)
      setRoleIdx((i) => (i + 1) % roles.length)
      return
    }
    const timer = setTimeout(() => {
      setText(deleting ? role.slice(0, text.length - 1) : role.slice(0, text.length + 1))
    }, speed)
    return () => clearTimeout(timer)
  }, [text, deleting, roleIdx])

  return (
    <span className="typing-wrap">
      {text}
      <span className="typing-cursor" />
    </span>
  )
}

/* ── 3D Tilt Card ── */

function TiltCard({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current!
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale3d(1.02, 1.02, 1.02)`
    const shine = el.querySelector('.card-shine') as HTMLElement | null
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(139,92,246,0.08), transparent 60%)`
      shine.style.opacity = '1'
    }
  }, [])

  const handleLeave = useCallback(() => {
    ref.current!.style.transform = ''
    const shine = ref.current!.querySelector('.card-shine') as HTMLElement | null
    if (shine) shine.style.opacity = '0'
  }, [])

  return (
    <div ref={ref} className={`tilt ${className ?? ''}`} onMouseMove={handleMove} onMouseLeave={handleLeave} {...props}>
      <div className="card-shine" />
      {children}
    </div>
  )
}

/* ── Count-up on scroll ── */

function CountUp({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const counted = useRef(false)

  useEffect(() => {
    const el = ref.current!
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted.current) {
        counted.current = true
        let start = 0
        const dur = 2000
        const step = (ts: number) => {
          if (!start) start = ts
          const p = Math.min((ts - start) / dur, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          el.textContent = Math.floor(eased * target).toLocaleString() + '+'
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>0</span>
}

/* ── Confetti Easter Egg ── */

function spawnConfetti() {
  const container = document.createElement('div')
  container.className = 'confetti-container'
  document.body.appendChild(container)
  const cols = ['#8b5cf6', '#06b6d4', '#f472b6', '#34d399', '#fb923c', '#a78bfa', '#22d3ee']
  for (let i = 0; i < 60; i++) {
    const p = document.createElement('div')
    p.className = 'confetti-piece'
    p.style.left = `${Math.random() * 100}%`
    p.style.background = cols[i % cols.length]
    p.style.animationDuration = `${Math.random() * 1.5 + 1}s`
    p.style.animationDelay = `${Math.random() * 0.3}s`
    container.appendChild(p)
  }
  setTimeout(() => container.remove(), 3000)
}

/* ── Command Palette ── */

function CommandPalette({
  open, onClose, tx, onNav, onTheme, onLang,
}: {
  open: boolean; onClose: () => void; tx: typeof nl
  onNav: (id: string) => void; onTheme: () => void; onLang: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (open) { setQuery(''); setTimeout(() => inputRef.current?.focus(), 50) }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const navItems = [
    { label: tx.navAbout, id: 'over-mij' },
    { label: tx.navSkills, id: 'skills' },
    { label: tx.navProjects, id: 'projecten' },
    { label: tx.navExperience, id: 'ervaring' },
    { label: tx.navContact, id: 'contact' },
  ]

  const actions = [
    { label: tx.cmdTheme, action: () => { onTheme(); onClose() } },
    { label: tx.cmdLang, action: () => { onLang(); onClose() } },
  ]

  const q = query.toLowerCase()
  const filteredNav = navItems.filter(i => i.label.toLowerCase().includes(q))
  const filteredActions = actions.filter(a => a.label.toLowerCase().includes(q))

  return (
    <div className="cmd-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="cmd-palette" role="dialog" aria-label="Command palette">
        <input
          ref={inputRef}
          className="cmd-input"
          placeholder={tx.cmdPlaceholder}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <div className="cmd-results">
          {filteredNav.length > 0 && (
            <>
              <div className="cmd-group">{tx.cmdNav}</div>
              {filteredNav.map(n => (
                <button key={n.id} className="cmd-item" onClick={() => { onNav(n.id); onClose() }}>
                  <span className="cmd-icon">&rarr;</span> {n.label}
                </button>
              ))}
            </>
          )}
          {filteredActions.length > 0 && (
            <>
              <div className="cmd-group">{tx.cmdActions}</div>
              {filteredActions.map(a => (
                <button key={a.label} className="cmd-item" onClick={a.action}>
                  <span className="cmd-icon">&#x26A1;</span> {a.label}
                </button>
              ))}
            </>
          )}
        </div>
        <div className="cmd-footer">
          <kbd>Esc</kbd> {tx.close} &nbsp; <kbd>&#x21B5;</kbd> Select
        </div>
      </div>
    </div>
  )
}

/* ── Helpers ── */

function renderTextLines(text: string) {
  return text.split('\n').map((line, i) => {
    if (!line.trim()) return null
    if (line.includes('[TODO:')) return <p key={i} className="modal-todo">{line}</p>
    return <p key={i}>{line}</p>
  })
}

/* ── Modal ── */

function ProjectModal({ project, onClose, tx }: { project: ProjectDetail; onClose: () => void; tx: typeof nl }) {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onEsc)

    const modal = modalRef.current!
    const focusable = modal.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])')
    const first = focusable[0], last = focusable[focusable.length - 1]
    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus() }
    }
    modal.addEventListener('keydown', trapFocus)

    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onEsc); modal.removeEventListener('keydown', trapFocus) }
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal" ref={modalRef} role="dialog" aria-modal="true" aria-label={project.title}>
        <button className="modal-close" onClick={onClose} ref={closeRef} aria-label={tx.close}>&times;</button>
        {project.image && <img src={project.image} alt={project.title} className="modal-game-img" />}
        <h2>{project.title}</h2>
        <p className="modal-subtitle">{project.subtitle}</p>
        <div className="modal-section"><h3>{tx.overview}</h3>{renderTextLines(project.overview)}</div>
        {project.myRole && <div className="modal-section"><h3>{project.myRoleHeading ?? tx.myRole}</h3>{renderTextLines(project.myRole)}</div>}
        {project.howItWorks && <div className="modal-section"><h3>{tx.howItWorks}</h3>{renderTextLines(project.howItWorks)}</div>}
        <div className="modal-section">
          <h3>{tx.techStack}</h3>
          <div className="modal-tech">{project.tech.split(', ').map(t => <span key={t} className="skill-chip">{t}</span>)}</div>
        </div>
        <div className="modal-section">
          <h3>{tx.highlights}</h3>
          <ul className="modal-highlights">{project.highlights.map((h, i) => <li key={i}>{h.includes('[TODO:') ? <span className="modal-todo">{h}</span> : h}</li>)}</ul>
        </div>
        {project.gameLink && <a href={project.gameLink} target="_blank" rel="noreferrer" className="modal-game-link">{tx.playRoblox} &rarr;</a>}
      </div>
    </div>
  )
}

/* ── App ── */

function App() {
  const [selected, setSelected] = useState<ProjectDetail | null>(null)
  const [cmdOpen, setCmdOpen] = useState(false)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const photoClicksRef = useRef(0)
  const photoTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const [lang, setLang] = useState<Lang>(() => {
    try { return (localStorage.getItem('lang') as Lang) || 'nl' } catch { return 'nl' }
  })
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try { return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark' } catch { return 'dark' }
  })
  const [accentIdx, setAccentIdx] = useState(0)

  const tx = lang === 'nl' ? nl : en
  const toggleTheme = useCallback(() => setTheme(t => t === 'dark' ? 'light' : 'dark'), [])
  const toggleLang = useCallback(() => setLang(l => l === 'nl' ? 'en' : 'nl'), [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('theme', theme) } catch {}
  }, [theme])

  useEffect(() => {
    try { localStorage.setItem('lang', lang) } catch {}
  }, [lang])

  useEffect(() => {
    const a = ACCENT_THEMES[accentIdx]
    const r = document.documentElement.style
    r.setProperty('--accent', a.accent)
    r.setProperty('--accent-2', a.accent2)
    r.setProperty('--accent-3', a.accent3)
  }, [accentIdx])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('revealed') }) },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setCmdOpen(o => !o) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
    let idx = 0
    const onKey = (e: KeyboardEvent) => {
      if (e.key === code[idx]) { idx++; if (idx === code.length) { spawnConfetti(); idx = 0 } }
      else idx = 0
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handlePhotoClick = () => {
    photoClicksRef.current++
    clearTimeout(photoTimerRef.current)
    if (photoClicksRef.current >= 5) {
      spawnConfetti()
      photoClicksRef.current = 0
    } else {
      photoTimerRef.current = setTimeout(() => { photoClicksRef.current = 0 }, 2000)
    }
  }

  const handleVoice = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audioPlaying) { audio.pause(); audio.currentTime = 0; setAudioPlaying(false) }
    else { audio.play(); setAudioPlaying(true) }
  }

  return (
    <>
      <Suspense fallback={null}><Scene3D /></Suspense>
      <div className="bg-noise" />
      <div className="bg-grid" />
      <FloatingElements />
      <CustomCursor />
      <ScrollProgress />

      <audio ref={audioRef} key={lang} src={lang === 'nl' ? '/voice-nl.mp3' : '/voice-en.mp3'} onEnded={() => setAudioPlaying(false)} />

      <div className="section-blob blob-1" />
      <div className="section-blob blob-2" />
      <div className="section-blob blob-3" />

      <header className="nav">
        <span className="logo">Sadaq</span>
        <nav>
          <a href="#over-mij">{tx.navAbout}</a>
          <a href="#skills">{tx.navSkills}</a>
          <a href="#projecten">{tx.navProjects}</a>
          <a href="#ervaring">{tx.navExperience}</a>
          <a href="#contact">{tx.navContact}</a>
        </nav>
        <div className="nav-controls">
          <button className="toggle-btn" onClick={toggleLang} aria-label="Switch language">{lang === 'nl' ? 'EN' : 'NL'}</button>
          <button className="toggle-btn" onClick={toggleTheme} aria-label="Toggle theme">{theme === 'dark' ? '☀' : '☾'}</button>
          <div className="accent-picker">
            {ACCENT_THEMES.map((t, i) => (
              <button
                key={t.name}
                className={`accent-dot ${i === accentIdx ? 'active' : ''}`}
                style={{ background: t.accent }}
                onClick={() => setAccentIdx(i)}
                aria-label={`${t.name} theme`}
              />
            ))}
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow reveal">{tx.heroEyebrow}</p>
            <h1 className="hero-title reveal reveal-delay-1"><span className="glow-text">Sadaq Hashi</span></h1>
            <p className="lead reveal reveal-delay-2"><TypingText /></p>
            <p className="lead-sub reveal reveal-delay-2">{tx.heroSub}</p>
            <div className="actions reveal reveal-delay-3">
              <a className="btn glow-btn" href="#projecten">{tx.ctaProjects}</a>
              <a className="btn outline-btn" href="#contact">{tx.ctaContact}</a>
              <button className="btn voice-btn" onClick={handleVoice} type="button">
                <span className={`voice-icon ${audioPlaying ? 'playing' : ''}`}>&#x1F50A;</span> {tx.listenIntro}
              </button>
            </div>
            <div className="stage-badge reveal reveal-delay-4">
              <span className="pulse-dot" />
              {tx.stageBadge}
            </div>
          </div>
          <div className="hero-photo reveal-scale reveal-delay-2">
            <div className="photo-frame" onClick={handlePhotoClick}><img src="/sadaq-hero.webp" alt="Sadaq Hashi" /></div>
          </div>
        </section>

        <section id="over-mij">
          <h2 className="section-title reveal"><span className="title-line" />{tx.aboutTitle}<span className="title-line" /></h2>
          <div className="about-grid">
            <div className="about-text reveal-left reveal-delay-1">
              <p>{tx.aboutP1}</p>
              <p>{tx.aboutP2}</p>
            </div>
            <div className="about-photos reveal-right reveal-delay-2">
              <img src="/sadaq-team.png" alt="Samenwerken" className="about-photo photo-1" />
              <img src="/sadaq-event.png" alt="Tech event" className="about-photo" />
            </div>
          </div>
          <div className="traits reveal reveal-delay-3">
            {tx.traits.map(t => <span key={t} className="trait-chip">{t}</span>)}
          </div>
        </section>

        <section id="skills">
          <h2 className="section-title reveal"><span className="title-line" />{tx.skillsTitle}<span className="title-line" /></h2>
          <div className="skills-grid">
            {tx.skillCats.map((cat, ci) => (
              <TiltCard key={cat} className={`skill-category reveal reveal-delay-${Math.min(ci + 1, 4)}`}>
                <h3>{cat}</h3>
                <div className="skill-chips">{skillItems[ci].map(item => <span key={item} className="skill-chip">{item}</span>)}</div>
              </TiltCard>
            ))}
          </div>
        </section>

        <section id="projecten">
          <h2 className="section-title reveal"><span className="title-line" />{tx.projectsTitle}<span className="title-line" /></h2>

          <div className="grid">
            {projects.map((p, i) => (
              <TiltCard className={`card reveal reveal-delay-${Math.min(i + 1, 4)}`} key={p.title} role="button" tabIndex={0}
                onClick={() => setSelected(p)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(p) } }}>
                <h3>{p.title}</h3>
                <p className="card-subtitle">{p.subtitle}</p>
                <p>{p.shortText}</p>
                <ul className="chips">{p.tags.map(t => <li key={t}>{t}</li>)}</ul>
                <span className="card-details">{tx.viewDetails} &rarr;</span>
              </TiltCard>
            ))}
          </div>

          <h3 className="subsection-title reveal">
            <img src="/roblox-icon.png" alt="" className="subsection-icon" />
            Roblox Games
            <span className="game-stat"><CountUp target={25000} /> visits</span>
          </h3>
          <div className="games-grid">
            {games.map((g, i) => (
              <TiltCard key={g.title} className={`game-card reveal-scale reveal-delay-${i + 1}`} role="button" tabIndex={0}
                onClick={() => setSelected(g)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(g) } }}>
                <div className="game-img-wrap"><img src={g.image} alt={g.title} className="game-image" /></div>
                <div className="game-content">
                  <h3>{g.title}</h3><p>{g.shortText}</p>
                  <ul className="chips">{g.tags.map(t => <li key={t}>{t}</li>)}</ul>
                  <span className="card-details">{tx.viewDetails} &rarr;</span>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        <section id="ervaring">
          <h2 className="section-title reveal"><span className="title-line" />{tx.experienceTitle}<span className="title-line" /></h2>
          <div className="experience-grid">
            <div className="experience-col reveal-left reveal-delay-1">
              <h3 className="experience-heading">{tx.eduHeading}</h3>
              {tx.eduEntries.map((e, i) => (
                <div key={e.title} className={`experience-item reveal reveal-delay-${Math.min(i + 1, 4)}`}>
                  {e.period && <span className="experience-period">{e.period}</span>}
                  <h4>{e.title}</h4>
                  <p className="experience-subtitle">{e.subtitle}</p>
                  {e.description && <p className="experience-desc">{e.description}</p>}
                </div>
              ))}
            </div>
            <div className="experience-col reveal-right reveal-delay-2">
              <h3 className="experience-heading">{tx.workHeading}</h3>
              {tx.workEntries.map((w, i) => (
                <div key={w.title + w.subtitle} className={`experience-item reveal reveal-delay-${Math.min(i + 1, 4)}`}>
                  <span className="experience-period">{w.period}</span>
                  <h4>{w.title}</h4>
                  <p className="experience-subtitle">{w.subtitle}</p>
                </div>
              ))}
              <h3 className="experience-heading" style={{ marginTop: 40 }}>{tx.langHeading}</h3>
              <div className="languages">
                {tx.langs.map(l => (
                  <div key={l.name} className="language-item">
                    <span className="language-name">{l.name}</span>
                    <span className="language-level">{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact">
          <h2 className="section-title reveal"><span className="title-line" />{tx.contactTitle}<span className="title-line" /></h2>
          <div className="contact-panel reveal-scale reveal-delay-1">
            <p className="contact-text">{tx.contactText}<br />{tx.contactSub}</p>
            <div className="actions center" style={{ marginTop: 24 }}>
              <a className="btn glow-btn" href="mailto:sadaq.hashi@outlook.com">sadaq.hashi@outlook.com</a>
              <a className="btn outline-btn" href="https://www.linkedin.com/in/sadaq-hashi-046808277/" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
            <div className="actions center" style={{ marginTop: 12 }}>
              <a className="btn outline-btn" href="/CV Sadaq Hashi.pdf" download>{tx.ctaCV} (PDF)</a>
            </div>
          </div>
        </section>
      </main>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} tx={tx} />}

      <CommandPalette
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        tx={tx}
        onNav={(id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }}
        onTheme={toggleTheme}
        onLang={toggleLang}
      />

      <footer>
        <p>&copy; {new Date().getFullYear()} Sadaq Hashi &middot; <button className="cmd-hint" onClick={() => setCmdOpen(true)}>Ctrl+K</button></p>
      </footer>
    </>
  )
}

export default App
