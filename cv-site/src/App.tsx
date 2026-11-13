import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import portrait from './assets/usmonxon-portrait.jpg'
import { Cursor } from './components/Cursor'
import { Magnetic } from './components/Magnetic'

const Scene3D = lazy(() =>
  import('./components/Scene3D').then((m) => ({ default: m.Scene3D })),
)
import {
  achievements,
  additional,
  chapters,
  courses,
  education,
  languages,
  objective,
  profile,
  projects,
  skillGroups,
} from './data'
import { usePointer } from './hooks/usePointer'

function ChapterReveal({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 48, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function PortraitPlate({
  enabled,
  mouse,
}: {
  enabled: boolean
  mouse: { nx: number; ny: number }
}) {
  const rotateX = useSpring(0, { stiffness: 120, damping: 18 })
  const rotateY = useSpring(0, { stiffness: 120, damping: 18 })

  useEffect(() => {
    if (!enabled) {
      rotateX.set(0)
      rotateY.set(0)
      return
    }
    rotateX.set(mouse.ny * -8)
    rotateY.set(mouse.nx * 10)
  }, [enabled, mouse.nx, mouse.ny, rotateX, rotateY])

  return (
    <motion.figure
      className="portrait-plate"
      style={{
        rotateX: enabled ? rotateX : 0,
        rotateY: enabled ? rotateY : 0,
        transformPerspective: 1200,
      }}
    >
      <div className="portrait-frame">
        <img
          src={portrait}
          alt={`${profile.name} portrait`}
          width={960}
          height={1280}
          decoding="async"
        />
      </div>
      <figcaption className="portrait-caption">
        <span className="mono">Portrait · 960×1280</span>
        <span>{profile.location}</span>
      </figcaption>
    </motion.figure>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })
  return (
    <div className="scroll-rail" aria-hidden="true">
      <motion.div className="scroll-rail-fill" style={{ scaleY, originY: 0 }} />
    </div>
  )
}

export default function App() {
  const reduce = useReducedMotion()
  const motionOk = !reduce
  const pointer = usePointer(motionOk)
  const [hovering, setHovering] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const buildsRef = useRef<HTMLElement>(null)

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroFade = useTransform(heroProgress, [0, 0.85], [1, 0])
  const heroY = useTransform(heroProgress, [0, 1], [0, 120])

  const { scrollYProgress: buildsProgress } = useScroll({
    target: buildsRef,
    offset: ['start end', 'end start'],
  })
  const buildsX = useTransform(buildsProgress, [0.1, 0.85], ['0%', '-55%'])

  const glareX = useMotionValue(50)
  const glareY = useMotionValue(40)
  const glare = useMotionTemplate`radial-gradient(520px circle at ${glareX}% ${glareY}%, rgba(111,184,174,0.16), transparent 55%)`

  useEffect(() => {
    document.title = `${profile.name} — System Administrator`
  }, [])

  useEffect(() => {
    if (!motionOk) return
    glareX.set(50 + pointer.nx * 40)
    glareY.set(40 + pointer.ny * 35)
  }, [motionOk, pointer.nx, pointer.ny, glareX, glareY])

  const markHot = useCallback((on: boolean) => setHovering(on), [])

  return (
    <div className={`site${motionOk ? ' has-cursor' : ''}`}>
      <a className="skip" href="#intent">
        Skip to content
      </a>
      <Cursor enabled={motionOk} hovering={hovering} />
      <ScrollProgress />

      <nav className="top-nav">
        <a
          className="mono brand-mini"
          href="#top"
          onPointerEnter={() => markHot(true)}
          onPointerLeave={() => markHot(false)}
        >
          {profile.brand}
        </a>
        <ol className="chapter-nav">
          {chapters.map((c) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                onPointerEnter={() => markHot(true)}
                onPointerLeave={() => markHot(false)}
              >
                <span>{c.index}</span>
                {c.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <header className="hero" id="top" ref={heroRef}>
        <motion.div
          className="hero-atmosphere"
          style={{ background: glare, opacity: heroFade }}
          aria-hidden="true"
        />
        {motionOk ? (
          <Suspense fallback={<div className="scene3d scene3d-static" aria-hidden="true" />}>
            <Scene3D mouse={pointer} enabled />
          </Suspense>
        ) : (
          <div className="scene3d scene3d-static" aria-hidden="true" />
        )}

        <motion.div className="hero-stage" style={{ opacity: heroFade, y: heroY }}>
          <div className="hero-left">
            <PortraitPlate enabled={motionOk} mouse={pointer} />
          </div>

          <div className="hero-right">
            <motion.p
              className="mono hero-kicker"
              initial={motionOk ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
            >
              {profile.target}
            </motion.p>
            <motion.h1
              className="hero-brand"
              initial={motionOk ? { opacity: 0, y: 40 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="hero-given">{profile.brand}</span>
              <span className="hero-family">{profile.surname}</span>
            </motion.h1>
            <motion.p
              className="hero-headline"
              initial={motionOk ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.75 }}
            >
              {profile.role}
            </motion.p>
            <motion.p
              className="hero-support"
              initial={motionOk ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.75 }}
            >
              {profile.tagline}
            </motion.p>
            <motion.div
              className="cta-row"
              initial={motionOk ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.7 }}
            >
              <Magnetic
                className="cta cta-primary"
                href={profile.emailHref}
                enabled={motionOk}
                onPointerEnter={() => markHot(true)}
                onPointerLeave={() => markHot(false)}
              >
                Email me
              </Magnetic>
              <Magnetic
                className="cta cta-ghost"
                href={profile.phoneHref}
                enabled={motionOk}
                onPointerEnter={() => markHot(true)}
                onPointerLeave={() => markHot(false)}
              >
                Call {profile.phoneDisplay}
              </Magnetic>
            </motion.div>
          </div>
        </motion.div>

        <motion.a
          className="scroll-cue mono"
          href="#intent"
          style={{ opacity: heroFade }}
          onPointerEnter={() => markHot(true)}
          onPointerLeave={() => markHot(false)}
        >
          Scroll the story
          <span className="scroll-cue-line" />
        </motion.a>
      </header>

      <main>
        <section className="chapter chapter-intent" id="intent">
          <div className="chapter-sticky">
            <ChapterReveal>
              <p className="mono chapter-index">01 — Intent</p>
              <h2>Looking for a System Administrator internship</h2>
            </ChapterReveal>
          </div>
          <div className="chapter-flow">
            <ChapterReveal>
              <p className="story-copy">{objective}</p>
              <div className="intent-chips">
                <span>Linux · Bash</span>
                <span>VLAN · OSPF · HSRP · VPN</span>
                <span>nginx · OpenVPN · PKI</span>
                <span>Ops · Monitoring · Docs</span>
              </div>
            </ChapterReveal>
          </div>
        </section>

        <section className="chapter chapter-stack" id="stack">
          <ChapterReveal className="chapter-head">
            <p className="mono chapter-index">02 — Stack</p>
            <h2>Technical skills</h2>
            <p className="lead">
              Daily Linux, networking labs, secure services, and enough code to
              automate the boring parts.
            </p>
          </ChapterReveal>
          <ul className="skill-orbit">
            {skillGroups.map((group, i) => (
              <ChapterReveal key={group.label}>
                <li
                  className="skill-node"
                  style={{ ['--i' as string]: i }}
                  onPointerEnter={() => markHot(true)}
                  onPointerLeave={() => markHot(false)}
                >
                  <span className="skill-label mono">{group.label}</span>
                  <p>{group.items}</p>
                </li>
              </ChapterReveal>
            ))}
          </ul>
        </section>

        <section className="chapter chapter-builds" id="builds" ref={buildsRef}>
          <ChapterReveal className="chapter-head">
            <p className="mono chapter-index">03 — Builds</p>
            <h2>Projects that hold under review</h2>
            <p className="lead">
              School 21 labs and personal systems — networks, tunnels, crypto,
              and a local voice stack.
            </p>
          </ChapterReveal>
          <div className="builds-track-wrap">
            <motion.ol
              className="builds-track"
              style={motionOk ? { x: buildsX } : undefined}
            >
              {projects.map((project, index) => (
                <li
                  key={project.title}
                  className="build-card"
                  onPointerEnter={() => markHot(true)}
                  onPointerLeave={() => markHot(false)}
                >
                  <span className="mono build-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3>{project.title}</h3>
                  <p className="build-context">{project.context}</p>
                  <ul>
                    {project.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </motion.ol>
          </div>
        </section>

        <section className="chapter chapter-split" id="path">
          <div className="split-pane">
            <ChapterReveal>
              <p className="mono chapter-index">04 — Path</p>
              <h2>Education</h2>
              {education.map((item) => (
                <article className="edu-block" key={item.school}>
                  <h3>{item.school}</h3>
                  <p className="edu-meta">
                    {item.detail}
                    {item.period ? ` · ${item.period}` : null}
                  </p>
                  <ul>
                    {item.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </article>
              ))}
              <div className="courses-block">
                <h3>Courses</h3>
                <ul>
                  {courses.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </ChapterReveal>
          </div>
          <div className="split-pane" id="signal">
            <ChapterReveal>
              <p className="mono chapter-index">05 — Signal</p>
              <h2>Achievements</h2>
              <ul className="signal-list">
                {achievements.map((item, i) => (
                  <li key={item}>
                    <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                    <p>{item}</p>
                  </li>
                ))}
              </ul>
            </ChapterReveal>
          </div>
        </section>

        <section className="chapter chapter-connect" id="connect">
          <ChapterReveal className="chapter-head">
            <p className="mono chapter-index">06 — Connect</p>
            <h2>Languages & contact</h2>
          </ChapterReveal>
          <div className="lang-row">
            {languages.map((lang) => (
              <ChapterReveal key={lang.name}>
                <div
                  className="lang-tile"
                  onPointerEnter={() => markHot(true)}
                  onPointerLeave={() => markHot(false)}
                >
                  <strong>{lang.name}</strong>
                  <span>{lang.level}</span>
                </div>
              </ChapterReveal>
            ))}
          </div>
          <ChapterReveal>
            <p className="additional">{additional}</p>
            <div className="contact-row">
              <Magnetic
                className="contact-link"
                href={profile.emailHref}
                enabled={motionOk}
                onPointerEnter={() => markHot(true)}
                onPointerLeave={() => markHot(false)}
              >
                <span className="mono">Email</span>
                {profile.email}
              </Magnetic>
              <Magnetic
                className="contact-link"
                href={profile.phoneHref}
                enabled={motionOk}
                onPointerEnter={() => markHot(true)}
                onPointerLeave={() => markHot(false)}
              >
                <span className="mono">Phone</span>
                {profile.phoneDisplay}
              </Magnetic>
              <div className="contact-link static">
                <span className="mono">Based in</span>
                {profile.location}
              </div>
            </div>
          </ChapterReveal>
        </section>
      </main>

      <footer className="site-footer">
        <span className="mono">{profile.target}</span>
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
      </footer>
    </div>
  )
}
