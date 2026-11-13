export const profile = {
  name: 'Usmonxon Raxmatillayev',
  brand: 'Usmonxon',
  surname: 'Raxmatillayev',
  role: 'Aspiring System Administrator',
  tagline:
    'Cybersecurity student at School 21, building networks, hardening servers, and learning ops until they hold.',
  location: 'Samarkand, Uzbekistan',
  phoneDisplay: '+998 93 838 41 21',
  phoneHref: 'tel:+998938384121',
  email: 'usmonxonr@gmail.com',
  emailHref: 'mailto:usmonxonr@gmail.com',
  target: 'System Administrator internship · Uzum',
}

export const objective =
  'Cybersecurity student at School 21 looking for a System Administrator internship at Uzum. Hands-on with Linux, Bash scripting, networking labs (VLAN, OSPF, HSRP, VPN) and secure server setup — ready to apply it to real IT operations: user and workstation setup, troubleshooting, monitoring and documentation. I learn quickly, work well in a team, and like fixing things until they work.'

export const skillGroups = [
  {
    label: 'Operating systems',
    items:
      'Linux (daily use, including Kali), Bash scripting; PC and console hardware/firmware tinkering',
  },
  {
    label: 'Networking',
    items:
      'VLAN, EtherChannel, OSPF, HSRP; Cisco Packet Tracer (currently learning); GNS3',
  },
  {
    label: 'Security & services',
    items:
      'nginx HTTPS, OpenVPN, OpenSSL, PKI basics, CryptoPro NGate; symmetric and asymmetric cryptography',
  },
  {
    label: 'Programming',
    items: 'Python (intermediate), C++ (beginner), C, Bash; web programming fundamentals',
  },
  {
    label: 'Documentation',
    items: 'draw.io network topologies, asset inventory spreadsheets',
  },
  {
    label: 'Tools',
    items: 'Git / GitLab',
  },
]

export const education = [
  {
    school: 'School 21',
    detail: 'Peer-learning programming school · Cybersecurity track · Samarkand',
    period: 'January 2026 – present',
    notes: [
      'Project-based curriculum: networking, infrastructure, secure communication channels, cryptography, Linux and Bash.',
    ],
  },
  {
    school: 'School No. 52',
    detail: 'Specialized school (IDUMI) · Samarkand',
    period: null as string | null,
    notes: [
      'Computer science focus; informatics olympiads in grades 9, 10 and 11.',
    ],
  },
]

export const projects = [
  {
    title: 'Network Fundamentals',
    context: 'Virtual enterprise network · GNS3',
    points: [
      'Built and configured a multi-device network with VLANs, EtherChannel, OSPF routing and HSRP gateway redundancy.',
      'Passed the staff review.',
    ],
  },
  {
    title: 'Mobile app development',
    context: 'BunkerStroy · Android & iOS',
    points: ['Designed and built BunkerStroy mobile app for Android and iOS.'],
  },
  {
    title: 'IT Infrastructure of an Enterprise',
    context: 'Topology & asset inventory',
    points: [
      'Designed the network topology of a typical organization in draw.io.',
      'Compiled an asset inventory (xlsx) and planned where security tools should sit in the infrastructure.',
    ],
  },
  {
    title: 'Securing Communication Channels',
    context: 'HTTPS · VPN · NGate',
    points: [
      'Set up HTTPS on nginx, configured an OpenVPN tunnel, and worked with CryptoPro NGate.',
    ],
  },
  {
    title: 'Cryptography',
    context: 'Symmetric & asymmetric',
    points: [
      'Worked with DES, RC4, AES modes and ChaCha20; RSA, Diffie-Hellman, a Fermat-factoring attack, OpenSSL and PKI, using Linux and Kali tools.',
    ],
  },
  {
    title: 'Jarvis',
    context: 'Personal · local voice assistant',
    points: [
      'Built a voice assistant that runs on a local LLM stack on my own hardware.',
    ],
  },
]

export const achievements = [
  'Cursor 48H Hackathon, Tashkent (2026) — participant; built a working project under a 48-hour deadline.',
  'Informatics (IT) olympiads — 3-time winner of the regional stage during grades 9–11.',
  'Console firmware and homebrew — jailbroke PS3, PS4 and PS5 consoles and wrote games for them, which taught a lot about hardware, firmware and debugging.',
]

export const courses = [
  "Programming fundamentals — Anvar Narzullayev's course",
  'Programming course — Saud Abdulwahed',
  'Cisco Packet Tracer (in progress)',
]

export const languages = [
  {
    name: 'English',
    level: 'B2 · previously MultiLevel B2 and IELTS 6.0 (both expired)',
  },
  { name: 'Uzbek', level: 'Native' },
  { name: 'German', level: 'Beginner' },
  { name: 'Russian', level: 'Beginner' },
]

export const additional =
  'Open to a paid internship in Tashkent; long-term goal is a career in system administration, SOC and DevOps.'

export const chapters = [
  { id: 'intent', label: 'Intent', index: '01' },
  { id: 'stack', label: 'Stack', index: '02' },
  { id: 'builds', label: 'Builds', index: '03' },
  { id: 'path', label: 'Path', index: '04' },
  { id: 'signal', label: 'Signal', index: '05' },
  { id: 'connect', label: 'Connect', index: '06' },
]
