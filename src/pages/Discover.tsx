import { useState, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import AnimatedContent from '../components/reactbits/AnimatedContent';
import BlurText from '../components/reactbits/BlurText';
import SpotlightCard from '../components/reactbits/SpotlightCard';
import StarBorder from '../components/reactbits/StarBorder';
import './landing.css';

const slides = [
  { image: '/images/isa-portrait.jpg', label: 'Tu fuerza empieza contigo.', position: 'center 25%' },
  { image: '/images/isa-cream.jpg', label: 'Haz espacio para ti.', position: 'center 24%' },
  { image: '/images/isa-navy.jpg', label: 'A tu ritmo. Con intención.', position: 'center 27%' },
];
const benefits = [
  { image: '/images/isa-strength.jpg', icon: 'fitness_center', tag: 'UN PLAN PARA TI', title: 'Tu rutina. Tu ritmo.', copy: 'Entrena con un plan que encaje en tu vida y evolucione contigo.', link: '#empezar', cta: 'Encontrar mi plan' },
  { image: '/images/isa-training.jpg', icon: 'play_arrow', tag: 'TÉCNICA EN VIDEO', title: 'Mira. Aprende. Entrena.', copy: 'Cada movimiento, más claro. Videos cortos para guiar tu técnica.', link: '/rutinas', cta: 'Explorar las rutinas' },
  { image: '/images/isa-mobility.jpg', icon: 'trending_up', tag: 'PASO A PASO', title: 'Tu constancia se siente.', copy: 'Rutinas y registro de peso para acompañar tu proceso sin complicarlo.', link: '#empezar', cta: 'Dar el primer paso' },
];
const questions = [
  ['¿Puedo empezar desde cero?', 'Sí. Cuéntale a Isa tu experiencia y tu objetivo para acordar un plan desde tu nivel actual.'],
  ['¿Cómo recibo mi plan?', 'Hablamos por WhatsApp, elegimos tu plan y te enviamos el enlace para registrarte y acceder a tus rutinas.'],
  ['¿Dónde puedo entrenar?', 'El acompañamiento es 100% online. Cuéntale a Isa qué espacio y equipo tienes para definir una rutina que puedas seguir.'],
  ['¿Qué planes y precios hay?', 'Isa te compartirá por WhatsApp las opciones, su duración y su precio antes de que decidas comenzar.'],
];

function Arrow({ className = '' }: { className?: string }) {
  return <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg>;
}
function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <AnimatedContent className={className} distance={35} duration={0.85} blur={5} delay={delay} threshold={0.08}>{children}</AnimatedContent>;
}
function Heading({ text, accent }: { text: string; accent?: string }) {
  const reduced = useReducedMotion();
  return <h2 className="section-title">{reduced ? <span>{text}</span> : <BlurText text={text} delay={65} direction="bottom" distance={20} blur={7} stepDuration={0.28} className="heading-reveal" />}{accent && <em>{accent}</em>}</h2>;
}
function StartButton({ children = 'Quiero empezar con Isa', className = '' }: { children?: ReactNode; className?: string }) {
  return <StarBorder as="a" href="#empezar" className={`premium-cta ${className}`} backgroundColor="#b5055b" textColor="#ffffff" color="#fff5e6" trailColor="#f9a8ce" borderColor="#df78aa" radius={40} thickness={1.2} glow={0.4} stars={1} sparkle={false} duration={5}>{children}<span className="cta-arrow"><Arrow /></span></StarBorder>;
}

export default function Discover() {
  const [slide, setSlide] = useState(0);
  const [error, setError] = useState('');
  const reduced = useReducedMotion();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const phone = (import.meta.env.VITE_WHATSAPP_NUMBER || '584122411382').replace(/\D/g, '');
    if (phone.length < 8 || phone.length > 15) {
      setError('El contacto de Isa se está preparando. Vuelve pronto para solicitar tu plan.');
      return;
    }
    const message = `¡Hola, Isa! Quiero empezar mi entrenamiento online.\nMi nombre es ${String(data.get('name')).trim()}.\nMi objetivo: ${data.get('goal')}.\nMi nivel: ${data.get('level')}.\n¿Me compartes los planes y cómo comenzar?`;
    window.location.assign(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
  }

  return <div className="landing">
    <header className="landing-nav">
      <Link className="brand" to="/" aria-label="Isa Training, inicio">isa<span>TRAINING</span></Link>
      <nav aria-label="Principal"><a href="#metodo">El método</a><a href="#experiencia">Tu experiencia</a><a className="nav-cta" href="#empezar">Empezar <Arrow /></a></nav>
    </header>

    <section className="photo-hero" aria-label="Entrenamiento online con Isa">
      <div className="hero-visual" aria-roledescription="carrusel" aria-label="Fotos de Isa">
        <AnimatePresence initial={false}>
          <motion.img key={slides[slide].image} className="hero-image" src={slides[slide].image} alt={`Isa, tu entrenadora online. Foto ${slide + 1} de ${slides.length}`} style={{ objectPosition: slides[slide].position }} initial={{ opacity: 0, scale: reduced ? 1 : 1.035 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }} fetchPriority={slide === 0 ? 'high' : 'auto'} />
        </AnimatePresence>
        <div className="hero-fade" aria-hidden="true" />
        <div className="hero-photo-top"><span className="glass-pill"><span className="status-dot" />100% ONLINE</span><span className="photo-index">ISA / {String(slide + 1).padStart(2, '0')}</span></div>
        <span className="hero-caption" aria-live="polite">{slides[slide].label}</span>
        <div className="hero-slider-controls"><div className="slide-dots" role="group" aria-label="Elegir foto">{slides.map((item, i) => <button key={item.image} aria-label={`Ver foto ${i + 1}`} aria-pressed={slide === i} onClick={() => setSlide(i)}><span /></button>)}</div><div className="slide-arrows"><button aria-label="Foto anterior" onClick={() => setSlide((slide + slides.length - 1) % slides.length)}><span aria-hidden="true">←</span></button><button aria-label="Foto siguiente" onClick={() => setSlide((slide + 1) % slides.length)}><span aria-hidden="true">→</span></button></div></div>
      </div>
      <div className="hero-content">
        <AnimatedContent trigger="mount" distance={25} duration={0.9} delay={0.1} blur={4}>
          <span className="eyebrow">TU MOMENTO EMPIEZA AQUÍ</span>
          <h1>Más fuerte.<br /><em>Más tú.</em></h1>
          <p>Un plan para tu cuerpo, tu ritmo y tu vida.<br className="desktop-break" /> Entrena online conmigo y empieza a sentir el cambio.</p>
          <StartButton />
          <div className="hero-reassurance"><span className="material-symbols-outlined" aria-hidden="true">check_circle</span>Sin registro previo. Primero hablamos por WhatsApp.</div>
        </AnimatedContent>
      </div>
      <div className="hero-side-note" aria-hidden="true">FUERZA · TÉCNICA · CONSTANCIA</div>
    </section>

    <Reveal className="editorial-line"><span>Un plan para ti.</span><span className="line-dot" /><span>Una guía en cada paso.</span><span className="line-dot" /><em>Tu mejor energía.</em></Reveal>

    <section className="landing-section method-section" id="metodo">
      <div className="section-heading"><div><Reveal><span className="eyebrow">SIMPLE. PERSONAL. CONTIGO.</span></Reveal><Heading text="Todo para avanzar." accent="Nada que te distraiga." /></div><Reveal><p>Menos dudas sobre qué hacer.<br />Más ganas de volver a entrenar.</p></Reveal></div>
      <div className="photo-benefits">{benefits.map((benefit, i) => <Reveal key={benefit.title} delay={i * 0.09}><SpotlightCard className={`photo-benefit photo-benefit-${i + 1}`} theme="light" spotlightColor="#e888b4" intensity={0.25} borderGlow={0.8} proximity={60}><img src={benefit.image} alt={i === 2 ? 'Isa durante un ejercicio de movilidad' : 'Isa en su sesión de entrenamiento'} loading="lazy" /><div className="benefit-fade" aria-hidden="true" /><div className="benefit-top"><span className="glass-pill">{benefit.tag}</span><span className="benefit-icon material-symbols-outlined" aria-hidden="true">{benefit.icon}</span></div><div className="benefit-bottom"><h3>{benefit.title}</h3><p>{benefit.copy}</p><a href={benefit.link} className="benefit-link">{benefit.cta}<span><Arrow /></span></a></div></SpotlightCard></Reveal>)}</div>
    </section>

    <section className="landing-section experience-section" id="experiencia">
      <Reveal className="experience-visual"><div className="experience-frame"><img src="/images/isa-strength.jpg" alt="Isa realizando un ejercicio de fuerza" loading="lazy" /><span className="glass-pill">TU RUTINA, SIEMPRE A MANO</span><div className="experience-player"><span className="eyebrow">MOVIMIENTO A MOVIMIENTO</span><h3>Entrena con dirección.</h3><div className="player-preview-row"><span>Rutinas · Series · Técnica</span><Link to="/rutinas" aria-label="Explorar la vista de rutinas"><span className="material-symbols-outlined" aria-hidden="true">play_arrow</span></Link></div></div></div><span className="visual-footnote">TU ESPACIO. TU RITMO. TU PROCESO.</span></Reveal>
      <div className="experience-copy"><Reveal><span className="eyebrow">QUE ENTRENAR SEA LO FÁCIL</span></Reveal><Heading text="Abre tu rutina. Dale play." accent="Ve por ti." /><Reveal><p>Consulta el ejercicio, entiende la técnica y sigue tus series. Todo organizado para que tu energía esté donde tiene que estar: en ti.</p><ul className="experience-points"><li><span className="material-symbols-outlined" aria-hidden="true">play_circle</span>Videos cortos. Movimientos claros.</li><li><span className="material-symbols-outlined" aria-hidden="true">fitness_center</span>Rutinas según tu nivel y objetivo.</li><li><span className="material-symbols-outlined" aria-hidden="true">trending_up</span>Tu peso y tu constancia, paso a paso.</li></ul><Link className="outline-cta" to="/rutinas">Explorar las rutinas <Arrow /></Link><small className="muted">Vista de ejemplo. Tu plan se asigna después de hablar con Isa.</small></Reveal></div>
    </section>

    <section className="landing-section start-section" id="empezar">
      <Reveal className="invitation"><img src="/images/isa-cream.jpg" alt="Isa te acompaña en tu entrenamiento online" loading="lazy" /><div className="invitation-shade" aria-hidden="true" /><div className="invitation-copy"><span className="eyebrow">DE TI PARA TI</span><h2>Ese momento<br />que te debes.<br /><em>Empieza hoy.</em></h2><p>Cuéntame tu objetivo. Elegimos tu plan por WhatsApp y te comparto tu enlace de acceso.</p><span className="coach-signature">Con cariño, Isa.</span></div></Reveal>
      <Reveal className="form-reveal" delay={0.12}><form onSubmit={submit} className="lead-form"><span className="eyebrow">HABLEMOS DE TU PRÓXIMO PASO</span><h3>Empezamos contigo.</h3><p className="form-intro">Tres respuestas. Un primer paso para ti.</p><label htmlFor="lead-name">¿Cómo te llamas?</label><input id="lead-name" name="name" autoComplete="given-name" placeholder="Tu nombre" required maxLength={80} pattern=".*\S.*" /><label htmlFor="lead-goal">¿Qué quieres conseguir?</label><select id="lead-goal" name="goal" required defaultValue=""><option value="" disabled>Elige tu objetivo</option><option>Ganar fuerza y masa muscular</option><option>Trabajar en mi peso</option><option>Crear constancia y sentirme mejor</option></select><label htmlFor="lead-level">¿Cuál es tu nivel actual?</label><select id="lead-level" name="level" required defaultValue=""><option value="" disabled>Elige tu nivel</option><option>Estoy empezando</option><option>Estoy retomando</option><option>Ya entreno con frecuencia</option></select><StarBorder as="button" type="submit" className="premium-cta form-cta" backgroundColor="#b5055b" textColor="#ffffff" color="#fff5e6" trailColor="#f9a8ce" borderColor="#df78aa" radius={40} thickness={1.2} stars={1} sparkle={false} glow={0.4}>Continuar a WhatsApp<span className="cta-arrow"><Arrow /></span></StarBorder><p className="form-note">WhatsApp se abrirá con tus respuestas.<br />Tú decides cuándo enviar. Sin crear una cuenta.</p>{error && <p role="alert" className="form-error">{error}</p>}</form></Reveal>
    </section>

    <section className="landing-section faq"><div><Reveal><span className="eyebrow">SIN DUDAS PARA EMPEZAR</span></Reveal><Heading text="Hablemos claro." /></div><div>{questions.map(([question, answer], i) => <Reveal key={question} delay={i * 0.04}><details><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details></Reveal>)}</div></section>
    <footer className="landing-footer"><Link to="/" className="brand">isa<span>TRAINING</span></Link><p>Tu fuerza. Tu proceso. Tu momento.</p><small>© {new Date().getFullYear()} Isa Training.</small></footer>
  </div>;
}
