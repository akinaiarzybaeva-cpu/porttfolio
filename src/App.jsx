import { useEffect, useMemo, useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import resumePdf from './assets/Резюме.pdf'
import './App.css'

const translations = {
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      about: 'About',
      skills: 'Skills',
      contact: 'Contact',
      letsTalk: "Let's Talk →",
    },
    hero: {
      greeting: "Hi, I'm Акинай ",
      title: 'Creative Developer',
      role: 'Junior Frontend Developer',
      description: 'Frontend Developer with a background in Applied Informatics. Skilled in HTML, CSS, JavaScript, and React. I build modern, responsive websites and applications. Passionate about continuous learning and professional growth in IT.',
      viewProjects: 'View My Projects →',
      downloadCv: 'Download CV',
    },
    about: {
      title: 'About Me',
      bio: 'I am a goal-oriented and responsible Frontend Developer with training in applied informatics and practical experience in web development. I build responsive websites and web applications using HTML, CSS, JavaScript, and React.',
      education: 'Education',
      educationValue: 'Training at Okurmen IT Academy',
      intro: 'I am committed to continuous learning, improving my technical skills, and creating modern, user-friendly digital experiences.',
      learnMore: 'Learn More →',
      stats: {
        projects: 'Projects delivered',
        years: 'Years of experience',
        dedication: 'Dedication to development',
      },
    },
    skills: {
      title: 'Skills & Tools',
      subtitle: 'Technologies I use to craft fast, modern, and beautiful digital experiences.',
    },
    projects: {
      title: 'My Projects',
      subtitle: 'Selected real projects I designed and built with a focus on UX and performance.',
      viewProject: 'View Project',
    },
    education: {
      title: 'Education Journey',
      subtitle: 'The key milestones that shaped my technical foundation.',
    },
    contact: {
      title: "Let's Create Something Amazing ",
      subtitle: 'Have an idea, startup, or product? Send me a message and let us build it together.',
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent successfully!',
      error: 'Something went wrong. Please try again.',
      configError: 'EmailJS is not configured yet. Add your Service ID, Template ID, and Public Key to the .env file.',
      errors: {
        name: 'Please enter your name.',
        email: 'Please enter a valid email address.',
        subject: 'Please enter a subject.',
        message: 'Please enter a message.',
      },
    },
    footer: 'Designed and developed by Akinai. All rights reserved.',
    dedicationValue: '100%',
  },
  ru: {
    nav: {
      home: 'Главная',
      projects: 'Проекты',
      about: 'Обо мне',
      skills: 'Навыки',
      contact: 'Контакты',
      letsTalk: 'Связаться →',
    },
    hero: {
      greeting: 'Привет, я Акинай ',
      title: 'Креативный разработчик',
      role: ' Frontend Developer',
      description: 'Начинающий Frontend-разработчик с образованием в области прикладной информатики. Владею HTML, CSS, JavaScript и React. Создаю современные адаптивные веб-сайты и приложения. Стремлюсь к профессиональному росту и развитию в IT.',
      viewProjects: 'Смотреть проекты →',
      downloadCv: 'Скачать CV',
    },
    about: {
      title: 'Обо мне',
      bio: 'Я целеустремлённая и ответственная Frontend-разработчик с образованием в области прикладной информатики и практическим опытом веб-разработки. Создаю адаптивные сайты и веб-приложения с использованием HTML, CSS, JavaScript и React.',
      education: 'Образование',
      educationValue: 'Обучение в Okurmen IT Academy',
      intro: 'Я постоянно развиваюсь, совершенствую свои навыки и создаю современные, удобные и функциональные цифровые решения.',
      learnMore: 'Узнать больше →',
      stats: {
        projects: 'Выполненных проектов',
        years: 'Лет опыта',
        dedication: 'Посвященность разработке',
      },
    },
    skills: {
      title: 'Навыки и инструменты',
      subtitle: 'Технологии, которые я использую для быстрых, современных и красивых цифровых продуктов.',
    },
    projects: {
      title: 'Мои проекты',
      subtitle: 'Подборка реальных проектов, которые я разработала с акцентом на UX и производительность.',
      viewProject: 'Смотреть проект',
    },
    education: {
      title: 'Образовательный путь',
      subtitle: 'Ключевые этапы, сформировавшие мою техническую базу.',
    },
    contact: {
      title: 'Давайте создадим что-то потрясающее S',
      subtitle: 'Есть идея, стартап или продукт? Напишите мне, и мы реализуем это вместе.',
      name: 'Имя',
      email: 'Почта',
      subject: 'Тема',
      message: 'Сообщение',
      send: 'Отправить сообщение',
      sending: 'Отправка...',
      success: 'Сообщение успешно отправлено!',
      error: 'Что-то пошло не так. Попробуйте ещё раз.',
      configError: 'EmailJS ещё не настроен. Добавьте Service ID, Template ID и Public Key в файл .env.',
      errors: {
        name: 'Пожалуйста, введите имя.',
        email: 'Пожалуйста, введите корректную почту.',
        subject: 'Пожалуйста, укажите тему.',
        message: 'Пожалуйста, введите сообщение.',
      },
    },
    footer: 'Дизайн и разработка: Акинай. Все права защищены.',
    dedicationValue: '100%',
  },
  kg: {
    nav: {
      home: 'Башкы бет',
      projects: 'Долбоорлор',
      about: 'Мен жөнүндө',
      skills: 'Көндүмдөр',
      contact: 'Байланыш',
      letsTalk: 'Сүйлөшөлү →',
    },
    hero: {
      greeting: 'Салам, мен Акинай ',
      title: 'Креативдүү иштеп чыгуучу',
      role: 'Frontend Developer',
      description: 'Колдонмо информатика тармагында билим алган Frontend Developer. HTML, CSS, JavaScript жана React технологияларын билем. Заманбап, адаптивдүү веб-сайттарды жана тиркемелерди түзөм. IT тармагында кесиптик жактан өсүүгө жана өнүгүүгө умтулам.',
      viewProjects: 'Долбоорлорумду көрүү →',
      downloadCv: 'CV жүктөө',
    },
    about: {
      title: 'Мен жөнүндө',
      bio: 'Мен IT тармагында прикладдык информатика боюнча билим алган, максатка умтулган жана жоопкерчиликтүү Frontend-иштеп чыгуучу. HTML, CSS, JavaScript жана React аркылуу адаптивдүү веб-сайттар менен веб-тиркемелерди иштеп чыгам.',
      education: 'Билим',
      educationValue: 'Okurmen IT Academyда билим алуу',
      intro: 'Мен үзгүлтүксүз үйрөнүүдө, көндүмдөрүмдү жетілдірүүдө жана заманбап, ыңгайлуу цифралык чечимдерди түзүүдө адистем.',
      learnMore: 'Көбүрөөк билүү →',
      stats: {
        projects: 'Аткарылган долбоор',
        years: 'Жылдык тажрыйба',
        dedication: 'Өнүгүүгө берилгендик',
      },
    },
    skills: {
      title: 'Көндүмдөр жана куралдар',
      subtitle: 'Тез, заманбап жана кооз санарип тажрыйбаларды түзүү үчүн колдонгон технологиялар.',
    },
    projects: {
      title: 'Менин долбоорлорум',
      subtitle: 'UX жана өндүрүмдүүлүккө басым жасалып иштелген реалдуу долбоорлор топтому.',
      viewProject: 'Долбоорду көрүү',
    },
    education: {
      title: 'Билим берүү жолу',
      subtitle: 'Техникалык негизимди калыптандырган маанилүү этаптар.',
    },
    contact: {
      title: 'Керемет нерсе жаратабыз ',
      subtitle: 'Идеяңыз, стартапыңыз же продуктуңуз барбы? Мага жазыңыз, бирге ишке ашыралы.',
      name: 'Аты',
      email: 'Email',
      subject: 'Тема',
      message: 'Билдирүү',
      send: 'Билдирүү жөнөтүү',
      sending: 'Жөнөтүлүүдө...',
      success: 'Билдирүү ийгиликтүү жөнөтүлдү!',
      error: 'Бир нерсе туура кетти. Кайра аракет кылып көрүңүз.',
      configError: 'EmailJS азырынча конфигурацияланбады. .env файлына Service ID, Template ID жана Public Key кошуңуз.',
      errors: {
        name: 'Атыңызды жазыңыз.',
        email: 'Туура email дарек киргизиңиз.',
        subject: 'Теманы киргизиңиз.',
        message: 'Билдирүү жазыңыз.',
      },
    },
    footer: 'Дизайн жана иштеп чыгуу: Акинай. Бардык укуктар корголгон.',
    dedicationValue: '100%',
  },
}

const skills = [
  { name: 'React', icon: '⚛', tone: 'tone-react' },
  { name: 'TypeScript', icon: 'TS', tone: 'tone-ts' },
  { name: 'JavaScript', icon: 'JS', tone: 'tone-js' },
  { name: 'HTML', icon: '</>', tone: 'tone-html' },
  { name: 'CSS', icon: '{}', tone: 'tone-css' },
  { name: 'Python', icon: 'PY', tone: 'tone-node' },
  { name: 'GitHub', icon: 'GH', tone: 'tone-github' },
  { name: 'Figma', icon: 'F', tone: 'tone-figma' },
]

const projectContent = {
  en: [
    {
      id: 'level-up',
      title: 'LEVEL UP',
      description:
        'A modern online learning platform featuring interactive courses, video lessons, quizzes, and a personalized learning experience.',
      link: 'https://levelup00.netlify.app/',
    },
    {
      id: 'weatherly',
      title: 'Weatherly',
      description:
        'A weather forecasting web application displaying real-time weather conditions, temperature, and forecasts for different cities.',
      link: 'https://weathe-xi.vercel.app/',
    },
    {
      id: 'minigame',
      title: 'MiniGame',
      description:
        'An interactive browser game with engaging gameplay, colorful visuals, and fun challenges.',
      link: 'https://minigame04.netlify.app/',
    },
  ],
  ru: [
    {
      id: 'level-up',
      title: 'LEVEL UP',
      description:
        'Современная онлайн-платформа для обучения с интерактивными курсами, видеоуроками, квизами и персонализированным учебным опытом.',
      link: 'https://levelup00.netlify.app/',
    },
    {
      id: 'weatherly',
      title: 'Weatherly',
      description:
        'Веб-приложение прогноза погоды, отображающее текущие погодные условия, температуру и прогнозы для разных городов.',
      link: 'https://weathe-xi.vercel.app/',
    },
    {
      id: 'minigame',
      title: 'MiniGame',
      description:
        'Интерактивная браузерная игра с увлекательным геймплеем, яркой графикой и интересными испытаниями.',
      link: 'https://minigame04.netlify.app/',
    },
  ],
  kg: [
    {
      id: 'level-up',
      title: 'LEVEL UP',
      description:
        'Интерактивдүү курстар, видео сабактар, тесттер жана жекелештирилген окуу тажрыйбасын сунуштаган заманбап онлайн окуу платформасы.',
      link: 'https://levelup00.netlify.app/',
    },
    {
      id: 'weatherly',
      title: 'Weatherly',
      description:
        'Ар түрдүү шаарлар боюнча реалдуу убакыттагы аба ырайын, температураны жана божомолдорду көрсөткөн веб-тиркеме.',
      link: 'https://weathe-xi.vercel.app/',
    },
    {
      id: 'minigame',
      title: 'MiniGame',
      description:
        'Кызыктуу геймплей, түстүү визуалдар жана көңүлдүү чакырыктар менен интерактивдүү браузер оюну.',
      link: 'https://minigame04.netlify.app/',
    },
  ],
}

const educationContent = {
  en: [
    {
      year: '2023 — 2026',
      title: 'Secondary Professional Education',
      text: 'Completed studies at KNU, Kyzyl, specializing in applied informatics.',
    },
    {
      year: '2026',
      title: 'Web Development Course',
      text: 'Completed a 3-month training program at Okurmen IT Academy, gaining practical skills in HTML, CSS, JavaScript, and React.',
    },
    {
      year: '2026 — Present',
      title: 'Higher Education',
      text: 'Currently studying at Osh State University in the field of Applied Informatics in Economics in distance learning mode.',
    },
  ],
  ru: [
    {
      year: '2023 — 2026',
      title: 'Среднее профессиональное образование',
      text: 'Окончила обучение в КНУ, г. Кызыл-Кия, по специальности прикладная информатика.',
    },
    {
      year: '2026',
      title: 'Курс веб-разработки',
      text: 'Прошла 3-месячное обучение в Okurmen IT Academy и получила практические навыки в HTML, CSS, JavaScript и React.',
    },
    {
      year: '2026 — настоящее время',
      title: 'Высшее образование',
      text: 'В настоящее время обучаюсь в ОшГУ по направлению «Прикладная информатика в экономике» в дистанционном формате.',
    },
  ],
  kg: [
    {
      year: '2023 — 2026',
      title: 'Орто профессионалдуу билим',
      text: 'Кызылдагы КНУда колдонмо информатика боюнча билим алдык.',
    },
    {
      year: '2026',
      title: 'Веб-иштеп чыгуунун курсу',
      text: 'Okurmen IT Academyде 3 айлык тренингтен өтүп, HTML, CSS, JavaScript жана React боюнча практикалык көндүмдөр алдым.',
    },
    {
      year: '2026 — азыркы убакыт',
      title: 'Жогорку билим',
      text: 'Азыркы учурда ОшГУда «Экономикада колдонмо информатика» багыты боюнча дистанциондук форматта окуп жатам.',
    },
  ],
}

const socialIconStyle = { width: 20, height: 20, display: 'block' }

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" style={socialIconStyle} fill="currentColor">
    <path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.51 2.87 8.33 6.84 9.68.5.1.68-.22.68-.49v-1.72c-2.78.62-3.37-1.34-3.37-1.34-.46-1.22-1.12-1.55-1.12-1.55-.92-.64.07-.63.07-.63 1.02.07 1.56 1.08 1.56 1.08.9 1.58 2.38 1.12 2.96.85.09-.67.35-1.12.64-1.38-2.22-.26-4.55-1.14-4.55-5.08 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.2 9.2 0 0 1 12 7.8c.85 0 1.71.12 2.51.35 1.9-1.33 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.64 1.03 2.76 0 3.95-2.34 4.82-4.57 5.07.36.32.68.96.68 1.94v2.88c0 .27.18.6.69.49A10.22 10.22 0 0 0 22 12.22C22 6.58 17.52 2 12 2Z" />
  </svg>
)

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" style={socialIconStyle} fill="currentColor">
    <path d="M21.15 4.59c.27-.95-.74-1.77-1.65-1.35L3.48 9.67c-1.02.43-1.02 1.79 0 2.22l4.15 1.45 1.76 5.36c.24.72.96.96 1.52.52l2.56-2.18 4.03 3.12c.76.59 1.82.08 1.98-.8l1.38-10.95Zm-13.4 8.48 7.96-5.25-6.38 6.68-.58-1.43Zm7.24 3.6-1.57-1.22 1.08-1.13 1.1 2.35-.61.01Zm-3.2-2.74 2.45-2.57-.96.98-1.49 1.59Z" />
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" style={socialIconStyle} fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" style={socialIconStyle} fill="currentColor">
    <path d="M12.04 2a9.99 9.99 0 0 0-8.66 15.17L2 22l5.03-1.35A9.98 9.98 0 1 0 12.04 2Zm5.26 14.04c-.22.63-1.3 1.16-1.8 1.23-.45.06-.98.12-3.18-.69-2.69-1.02-4.4-3.5-4.53-3.66-.12-.16-1.01-1.35-1.01-2.58 0-1.22.64-1.82.87-2.06.22-.25.49-.32.66-.32h.47c.15 0 .36.01.55.42.22.48.76 1.65.82 1.78.07.13.11.3.02.47-.08.17-.13.27-.27.42l-.2.24c-.13.15-.28.33-.12.63.16.3.7 1.15 1.5 1.86 1.03.92 1.9 1.2 2.2 1.34.3.14.49.12.67-.07.17-.19.75-.86.95-1.16.2-.3.4-.25.68-.15.28.1 1.77 1.16 2.08 1.4.31.24.5.31.57.5.07.18.07.94-.15 1.57Z" />
  </svg>
)

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/akinaiarzybaeva-cpu', icon: <GitHubIcon /> },
  { name: 'Telegram', href: 'https://t.me/kinai_0', icon: <TelegramIcon /> },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/arzybaevall?psln=MWdpaGRpOGlmcjV4dg==',
    icon: <InstagramIcon />,
  },
  { name: 'WhatsApp', href: 'https://wa.me/996220155189', icon: <WhatsAppIcon /> },
]

const projectLogoStyle = { width: 28, height: 28, display: 'block' }

const LevelUpLogo = () => (
  <svg viewBox="0 0 28 28" aria-hidden="true" style={projectLogoStyle}>
    <defs>
      <linearGradient id="grad-level-book" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d9b8ff" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
      <linearGradient id="grad-level-cap" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a78bfa" />
        <stop offset="100%" stopColor="#4f46e5" />
      </linearGradient>
    </defs>
    <path d="M6 17.4c2.5-1 4-1.2 8-1.2s5.5.2 8 1.2v4.6c-2.4-1.1-4.4-1.5-8-1.5s-5.6.4-8 1.5v-4.6Z" fill="url(#grad-level-book)" />
    <path d="M6 12.2 14 8l8 4.2-8 4.2-8-4.2Z" fill="url(#grad-level-cap)" />
    <path d="M22 12.2v4.2" stroke="#9ca3ff" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="22" cy="17.4" r="1.3" fill="#c4b5fd" />
  </svg>
)

const WeatherlyLogo = () => (
  <svg viewBox="0 0 28 28" aria-hidden="true" style={projectLogoStyle}>
    <defs>
      <radialGradient id="grad-weather-sun" cx="45%" cy="45%" r="60%">
        <stop offset="0%" stopColor="#fde68a" />
        <stop offset="100%" stopColor="#f59e0b" />
      </radialGradient>
      <linearGradient id="grad-weather-cloud" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f8fafc" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </linearGradient>
    </defs>
    <circle cx="11" cy="11" r="5" fill="url(#grad-weather-sun)" />
    <path
      d="M10.5 20c-2 0-3.5-1.4-3.5-3.2 0-1.6 1.3-2.9 3-3.1.5-2 2.2-3.4 4.5-3.4 2.7 0 4.8 1.9 5 4.4 1.5.2 2.5 1.4 2.5 2.9 0 1.8-1.5 2.4-3.3 2.4H10.5Z"
      fill="url(#grad-weather-cloud)"
    />
  </svg>
)

const MiniGameLogo = () => (
  <svg viewBox="0 0 28 28" aria-hidden="true" style={projectLogoStyle}>
    <defs>
      <linearGradient id="grad-pad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#c4b5fd" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
    </defs>
    <path
      d="M9.4 9.5h9.2c2.6 0 4.2 2.2 3.4 4.6l-1 3c-.4 1.3-1.8 2.1-3.1 1.7l-2.7-.8a4.3 4.3 0 0 0-2.4 0l-2.7.8c-1.3.4-2.7-.4-3.1-1.7l-1-3c-.8-2.4.8-4.6 3.4-4.6Z"
      fill="url(#grad-pad)"
    />
    <rect x="10" y="12.2" width="3.8" height="1.2" rx=".6" fill="#312e81" />
    <rect x="11.3" y="10.9" width="1.2" height="3.8" rx=".6" fill="#312e81" />
    <circle cx="17.7" cy="12.3" r="1" fill="#312e81" />
    <circle cx="19.8" cy="14.2" r="1" fill="#312e81" />
  </svg>
)

function ProjectLogo({ id }) {
  if (id === 'level-up') return <LevelUpLogo />
  if (id === 'weatherly') return <WeatherlyLogo />
  if (id === 'minigame') return <MiniGameLogo />
  return null
}

const sectionMotion = {
  hidden: { opacity: 0, y: 46 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [language, setLanguage] = useState('en')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const t = translations[language]
  const projects = projectContent[language]
  const education = educationContent[language]
  const navItems = useMemo(
    () => [
      { id: 'home', label: t.nav.home },
      { id: 'projects', label: t.nav.projects },
      { id: 'about', label: t.nav.about },
      { id: 'skills', label: t.nav.skills },
      { id: 'contact', label: t.nav.contact },
    ],
    [t],
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const projectCount = 0
  const yearCount = 0

  const scrollToSection = (id) => {
    const section = document.getElementById(id)
    if (!section) {
      return
    }
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileOpen(false)
  }

  const validate = () => {
    const nextErrors = {}
    if (!formData.name.trim()) {
      nextErrors.name = t.contact.errors.name
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      nextErrors.email = t.contact.errors.email
    }
    if (!formData.subject.trim()) {
      nextErrors.subject = t.contact.errors.subject
    }
    if (!formData.message.trim()) {
      nextErrors.message = t.contact.errors.message
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) {
      setStatus('')
      return
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setStatus(t.contact.configError)
      return
    }

    setIsSending(true)
    setStatus(t.contact.sending)
    setErrors({})

    try {
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'akinaiarzybaeva@gmail.com',
          reply_to: formData.email,
        },
        { publicKey },
      )

      if (result.status === 200) {
        setStatus(t.contact.success)
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus(t.contact.error)
      }
    } catch (error) {
      console.error('EmailJS send error:', error)
      setStatus(t.contact.error)
    } finally {
      setIsSending(false)
    }
  }

  const handlePointerMove = (event) => {
    const normalizedX = (event.clientX / window.innerWidth - 0.5) * 2
    const normalizedY = (event.clientY / window.innerHeight - 0.5) * 2
    setPointer({ x: normalizedX, y: normalizedY })
  }

  return (
    <div className="app-shell" onMouseMove={handlePointerMove}>
      <div className="ambient ambient-top" aria-hidden="true" />
      <div className="ambient ambient-bottom" aria-hidden="true" />
      <div className="ambient ambient-mid" aria-hidden="true" />
      <div className="neon-line neon-line-1" aria-hidden="true" />
      <div className="neon-line neon-line-2" aria-hidden="true" />
      <div className="dust dust-1" aria-hidden="true" />
      <div className="dust dust-2" aria-hidden="true" />
      <div className="sparkles" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <header className="navbar">
        <button className="logo" type="button" onClick={() => scrollToSection('home')}>
          Akinai.dev
        </button>
        <button
          className="menu-toggle"
          type="button"
          aria-label="Open menu"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          ☰
        </button>
        <nav className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <button key={item.id} type="button" onClick={() => scrollToSection(item.id)}>
              {item.label}
            </button>
          ))}
          <button
            className="toggle-btn"
            type="button"
            onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <div className="language-switcher">
            {['kg', 'ru', 'en'].map((lang) => (
              <button
                key={lang}
                type="button"
                className={language === lang ? 'active' : ''}
                onClick={() => setLanguage(lang)}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <button type="button" className="cta-btn" onClick={() => scrollToSection('contact')}>
            {t.nav.letsTalk}
          </button>
        </nav>
      </header>

      <main>
        <motion.section
          id="home"
          className="hero-section"
          variants={sectionMotion}
          initial="hidden"
          animate="visible"
        >
          <div className="hero-content glass-panel">
            <motion.p className="eyebrow" variants={fadeInUp} custom={0.05} initial="hidden" animate="visible">
              {t.hero.greeting}
            </motion.p>
            <motion.h1 variants={fadeInUp} custom={0.15} initial="hidden" animate="visible">
              {t.hero.title}
            </motion.h1>
            <motion.h2 className="animated-title" variants={fadeInUp} custom={0.28} initial="hidden" animate="visible">
              {t.hero.role}
            </motion.h2>
            <motion.p className="hero-description" variants={fadeInUp} custom={0.38} initial="hidden" animate="visible">
              {t.hero.description}
            </motion.p>
            <div className="hero-actions">
              <button type="button" className="primary-btn" onClick={() => scrollToSection('projects')}>
                {t.hero.viewProjects}
              </button>
              <a
                href={resumePdf}
                download="Akinai-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="secondary-btn"
              >
                {t.hero.downloadCv}
              </a>
            </div>
            <div className="socials">
              {socialLinks.map((item) => (
                <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.name}>
                  <span aria-hidden="true">{item.icon}</span>
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <motion.div
              className="portrait-wrap"
              animate={{ y: [-7, 9, -7] }}
              transition={{ duration: 8.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="crown" aria-hidden="true">
                ✦
              </span>
              <span className="orbit-path orbit-path-1" aria-hidden="true" />
              <span className="orbit-path orbit-path-2" aria-hidden="true" />
              <span className="orbital-ring" aria-hidden="true" />
              <span className="orbital-ring orbital-ring-2" aria-hidden="true" />
              <span className="portrait-glow" aria-hidden="true" />
              <span className="hero-star hero-star-1" aria-hidden="true">
                ✦
              </span>
              <span className="hero-star hero-star-2" aria-hidden="true">
                ✦
              </span>
              <span className="hero-star hero-star-3" aria-hidden="true">
                ✦
              </span>
              <span className="halo-dot halo-dot-1" aria-hidden="true" />
              <span className="halo-dot halo-dot-2" aria-hidden="true" />
              <span className="halo-dot halo-dot-3" aria-hidden="true" />
              <span className="halo-dot halo-dot-4" aria-hidden="true" />
              <div className="portrait-crop">
                <img src="/profile-photo.jpe" alt="Akinai portrait" className="portrait" />
              </div>
              <motion.span className="tech-chip chip-1" style={{ x: pointer.x * -11, y: pointer.y * -8 }}>
                HTML
              </motion.span>
              <motion.span className="tech-chip chip-2" style={{ x: pointer.x * 16, y: pointer.y * -11 }}>
                CSS
              </motion.span>
              <motion.span className="tech-chip chip-3" style={{ x: pointer.x * -15, y: pointer.y * 11 }}>
                JS
              </motion.span>
              <motion.span className="tech-chip chip-4" style={{ x: pointer.x * 13, y: pointer.y * 8 }}>
                ⚛
              </motion.span>
              <motion.span className="tech-chip chip-5" style={{ x: pointer.x * 18, y: pointer.y * -6 }}>
                GH
              </motion.span>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="about"
          className="about-section"
          variants={sectionMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="about-text card glass-panel">
            <div className="about-tag">
              <span className="about-tag-icon" aria-hidden="true">
                ◉
              </span>
              {t.about.title}
            </div>
            <h2 className="about-title">
              I'm a <span>Frontend Developer</span>
            </h2>
            <p className="about-description">{t.about.bio}</p>
            <button type="button" className="link-btn about-link-btn" onClick={() => scrollToSection('contact')}>
              {t.about.learnMore}
            </button>
            <div className="stats">
              <div className="stat-card">
                <span className="stat-icon" aria-hidden="true">
                  &lt;/&gt;
                </span>
                <strong>{projectCount}+</strong>
                <span>{t.about.stats.projects}</span>
              </div>
              <div className="stat-card">
                <span className="stat-icon" aria-hidden="true">
                  ✦
                </span>
                <strong>{yearCount}+</strong>
                <span>{t.about.stats.years}</span>
              </div>
              <div className="stat-card">
                <span className="stat-icon" aria-hidden="true">
                  🏆
                </span>
                <strong>{t.dedicationValue}</strong>
                <span>{t.about.stats.dedication}</span>
              </div>
            </div>
          </div>

          <div className="about-visual card glass-panel">
            <div className="visual-scene" aria-hidden="true">
              <div className="scene-glow" />
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="floating-badge badge-react">React</div>
              <div className="floating-badge badge-css">CSS</div>
              <div className="floating-badge badge-js">JS</div>
              <div className="floating-badge badge-html">HTML</div>
              <div className="floating-cube cube-one" />
              <div className="floating-cube cube-two" />
              <div className="laptop">
                <div className="laptop-screen">
                  <span>&lt;/&gt;</span>
                </div>
                <div className="laptop-base" />
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="skills"
          className="skills-section"
          variants={sectionMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="section-head">
            <h3>{t.skills.title}</h3>
            <p>{t.skills.subtitle}</p>
          </div>
          <div className="skills-grid">
            {skills.map((skill) => (
              <article key={skill.name} className={`skill-card ${skill.tone}`}>
                <span className="skill-icon" aria-hidden="true">
                  {skill.icon}
                </span>
                <h4>{skill.name}</h4>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="projects"
          className="projects-section"
          variants={sectionMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="section-head">
            <h3>{t.projects.title}</h3>
            <p>{t.projects.subtitle}</p>
          </div>
          <div className="projects-grid">
            {projects.map((project) => (
              <article key={project.id} className={`project-card project-card-${project.id}`}>
                <div className="project-icon-wrap" aria-hidden="true">
                  <span className="project-icon">
                    <ProjectLogo id={project.id} />
                  </span>
                </div>
                <div className="project-body">
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <div className="project-actions">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      {t.projects.viewProject}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="education"
          className="education-section"
          variants={sectionMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="section-head">
            <h3>{t.education.title}</h3>
            <p>{t.education.subtitle}</p>
          </div>
          <div className="timeline">
            {education.map((item) => (
              <article key={item.year} className="timeline-item">
                <span className="dot" aria-hidden="true" />
                <div className="card timeline-card">
                  <span className="year">{item.year}</span>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="contact-section"
          variants={sectionMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="section-head">
            <h3>{t.contact.title}</h3>
            <p>{t.contact.subtitle}</p>
          </div>
          <form className="contact-form card glass-panel" onSubmit={onSubmit} noValidate>
            <label>
              {t.contact.name}
              <input
                type="text"
                value={formData.name}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, name: event.target.value }))
                }
              />
              {errors.name ? <small>{errors.name}</small> : null}
            </label>
            <label>
              {t.contact.email}
              <input
                type="email"
                value={formData.email}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, email: event.target.value }))
                }
              />
              {errors.email ? <small>{errors.email}</small> : null}
            </label>
            <label>
              {t.contact.subject}
              <input
                type="text"
                value={formData.subject}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, subject: event.target.value }))
                }
              />
              {errors.subject ? <small>{errors.subject}</small> : null}
            </label>
            <label>
              {t.contact.message}
              <textarea
                rows="5"
                value={formData.message}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, message: event.target.value }))
                }
              />
              {errors.message ? <small>{errors.message}</small> : null}
            </label>
            <button type="submit" className="primary-btn" disabled={isSending}>
              {isSending ? t.contact.sending : t.contact.send}
            </button>
            {status ? <p className="status-text">{status}</p> : null}
          </form>
          <div className="socials contact-socials">
            {socialLinks.map((item) => (
              <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer">
                <span aria-hidden="true">{item.icon}</span>
                {item.name}
              </a>
            ))}
          </div>
        </motion.section>
      </main>

      <footer>{t.footer}</footer>
    </div>
  )
}

export default App
