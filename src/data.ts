export interface ProjectDetail {
  title: string
  subtitle: string
  shortText: string
  tags: string[]
  overview: string
  myRole?: string
  myRoleHeading?: string
  howItWorks?: string
  tech: string
  highlights: string[]
  image?: string
  gameLink?: string
}

export const projects: ProjectDetail[] = [
  {
    title: 'GoSmartLib',
    subtitle: 'Bibliotheeksysteem voor GO! Antwerpen',
    shortText: 'Blueprint voor 51 scholen en ongeveer 23.000 leerlingen, gebouwd met Spring Boot en React/TypeScript.',
    tags: ['Spring Boot', 'React', 'TypeScript', 'MySQL', 'Docker'],
    overview: 'GoSmartLib is een bibliotheeksysteem dat ontworpen is voor GO! Antwerpen, het onderwijsnet met 51 scholen en ongeveer 23.000 leerlingen. Het project begon als een uitgebreide blueprint: een volledig uitgeschreven ontwerp van hoe één centraal systeem de schoolbibliotheken van al die scholen kan beheren. Daarna werkten we het uit tot een werkende applicatie. Het is een schoolopdracht en draait niet in productie.\n\nDit was mijn grootste teamproject. Het project diende ook als basis voor mijn vakken ICT Architecture en software engineering, waar ik de architectuurkeuzes verder moest verantwoorden.',
    myRole: 'Ik werkte in een team van twee en schreef mee aan de blueprint. Bij de ontwikkeling bouwde ik onder meer:\n• het beheer van reviews, waarmee een beheerder reviews kan verbergen of verwijderen;\n• de tag- en genresystemen om boeken te classificeren en terug te vinden;\n• het uitleenbeheer in de interface, inclusief de correcties van “ontlening” naar het juiste begrip “uitlening”;\n• de campusbeheer-interface.\nIk beheerde ook de Git-branches en schreef de commitberichten in het Nederlands, zodat de geschiedenis voor het hele team leesbaar bleef.',
    howItWorks: '• Backend: Spring Boot REST API met een gelaagde architectuur (controller, service, repository), met MySQL als database.\n• Frontend: React met TypeScript.\n• Koppelingen: Smartschool via OAuth2 voor aanmelden, plus Google Books en Open Library voor boekgegevens.\n• Beveiliging: OAuth2 en JWT.\n• Opzet: Docker Compose, Traefik als reverse proxy en GitLab CI/CD voor builds.',
    tech: 'Spring Boot, React, TypeScript, MySQL, Docker, Traefik, GitLab CI/CD, OAuth2/JWT, REST',
    highlights: [
      'Ontwerp voor 51 scholen en circa 23.000 leerlingen',
      'Echte externe koppelingen (Smartschool, Google Books, Open Library)',
      'Volledige gelaagde architectuur met aparte frontend en backend',
      '[TODO: link naar GitHub/GitLab-repo of screenshots]',
    ],
  },
  {
    title: 'Moodle DevOps',
    subtitle: 'Productieomgeving voor LMS',
    shortText: 'Moodle 4.4 als productieomgeving met Jenkins CI/CD, Docker Swarm en HTTPS via Traefik.',
    tags: ['Docker Swarm', 'Jenkins', 'Traefik', 'Bash'],
    overview: 'Voor mijn DevOps-vak zette ik een volledige leeromgeving op zoals een organisatie die in productie zou draaien. Het ging niet om alleen Moodle installeren, maar om het geheel automatiseren, beveiligen en bewaken.',
    myRole: '• Moodle 4.4 draaiend op Docker Swarm.\n• CI/CD met Jenkins, zodat wijzigingen automatisch gebouwd en uitgerold worden.\n• Traefik als reverse proxy, met HTTPS.\n• Een geïntegreerde LTI-app.\n• Monitoring- en backupscripts, geschreven in Bash.',
    myRoleHeading: 'Wat ik gebouwd heb',
    tech: 'Docker Swarm, Jenkins, Traefik, Bash, Moodle 4.4, LTI',
    highlights: [
      'Volledige keten: bouwen, uitrollen, beveiligen, bewaken en back-uppen',
      'Clustering met Docker Swarm in plaats van één enkele container',
      '[TODO: link of schema van de architectuur]',
    ],
  },
  {
    title: 'Website schildersbedrijf',
    subtitle: 'Freelance project',
    shortText: 'Website voor een schildersbedrijf, live op Netlify met eigen domein en contactformulier.',
    tags: ['React', 'Vite', 'Tailwind', 'Netlify'],
    overview: 'Een echte opdracht voor een echte klant: een website voor een schildersbedrijf, van opzet tot live.',
    myRole: '• De website zelf met React, Vite en Tailwind.\n• Hosting op Netlify, gekoppeld aan een eigen domeinnaam.\n• Een werkend contactformulier, zodat klanten rechtstreeks een aanvraag kunnen sturen.',
    myRoleHeading: 'Wat ik gebouwd heb',
    tech: 'React, Vite, Tailwind, Netlify',
    highlights: [
      'Volledig live met eigen domein',
      'Echte klant en echt gebruik',
      '[TODO: link naar de live website, mits het bedrijf akkoord is]',
    ],
  },
  {
    title: 'PROV-AI Hackathon',
    subtitle: 'Hackathon 2026',
    shortText: 'Deelname aan de PROV-AI Hackathon, een AI-hackathon in 2026.',
    tags: ['AI', 'Hackathon', 'Teamwork'],
    overview: '[TODO: beschrijf het thema van de hackathon en wat jullie team gebouwd heeft]',
    tech: '[TODO: gebruikte technologieën]',
    highlights: [
      'PROV-AI Hackathon 2026',
      '[TODO: resultaat of wat je geleerd hebt]',
    ],
  },
  {
    title: 'CalmMind',
    subtitle: 'Cardiff Metropolitan University',
    shortText: 'Stress-managementapp gebouwd tijdens de Internationale Week aan Cardiff Metropolitan University.',
    tags: ['Internationaal', 'Teamproject', 'Digitale gezondheid'],
    overview: 'CalmMind is een stress-managementapp ontwikkeld tijdens de Internationale Week aan Cardiff Metropolitan University, in samenwerking met studenten uit verschillende landen.',
    tech: '[TODO: gebruikte technologieën]',
    highlights: [
      'Internationaal teamproject',
      'Samenwerking met studenten uit Wales en andere landen',
      '[TODO: extra details over de app]',
    ],
  },
  {
    title: 'Coding-educatiegame',
    subtitle: 'Schoolproject — Architectuur',
    shortText: 'Educatieve game over programmeren, gedocumenteerd met C4-modellen en ADR.',
    tags: ['C4', 'ADR', 'Game Dev'],
    overview: 'Een educatieve game die spelers leert programmeren. Het project diende als oefening in softwarearchitectuur, met C4-diagrammen en Architecture Decision Records (ADR) als documentatie.',
    tech: '[TODO: gebruikte technologieën en game engine]',
    highlights: [
      'Volledige architectuurdocumentatie met C4 en ADR',
      '[TODO: extra details over gameplay en resultaat]',
    ],
  },
]

export const games: ProjectDetail[] = [
  {
    title: 'Roll A Brainrot',
    subtitle: 'Roblox Game',
    shortText: 'Verzamel- en rollgame op Roblox. Ik run de advertentiecampagnes en analyseer de resultaten.',
    tags: ['Luau', 'Rojo', 'Roblox Studio'],
    image: '/roll-a-brainrot.png',
    gameLink: 'https://www.roblox.com/games/119850002174090/Roll-A-Brainrot',
    overview: 'Roll A Brainrot is een verzamel- en rollgame op Roblox, die ik samen met een mede-developer maak en beheer. Samen met mijn andere game hebben mijn games meer dan 25.000 visits.',
    myRole: '• Ontwikkeling in Roblox Studio met Luau, gekoppeld aan Rojo zodat ik in een gewone code-editor kan werken.\n• Advertenties: ik zet campagnes op in Roblox Ads Manager en volg ze van begin tot einde op.\n• Analyse: ik bekijk de prestaties van thumbnails (CTR) en de kost per speler, en stuur bij op basis van de cijfers.\n• Community: ik praat met spelers en gebruik hun feedback.\n• Toegangsbeheer tijdens ontwikkeling: de game in privémodus houden en enkel collaborators toelaten.',
    tech: 'Luau, Rojo, Roblox Studio, Roblox Ads Manager',
    highlights: [
      'Meer dan 25.000 visits samen met mijn tweede game',
      'Gameplay en marketing in één hand',
    ],
  },
  {
    title: 'Fight For a Sword',
    subtitle: 'Roblox Game',
    shortText: 'Actiegame met modulaire, server-authoritative architectuur en client/server-validatie.',
    tags: ['Luau', 'Rojo', 'Roblox Studio'],
    image: '/fight-for-sword.png',
    gameLink: 'https://www.roblox.com/games/84942476816390/Fight-For-a-Sword',
    overview: 'Een actiegame op Roblox waarbij de nadruk lag op een degelijke technische opbouw in plaats van snelle trucjes.',
    howItWorks: '• Modulaire code: elk systeem staat in een eigen module, zodat nieuwe functies toevoegen geen bestaande code breekt.\n• Server-authoritative: de server beslist wat er echt gebeurt (schade, resultaten). De client toont enkel.\n• Client/server-validatie: acties van de speler worden op de server gecontroleerd, wat valsspelen moeilijker maakt.\n• [TODO: gameplay beschrijven: wat doet de speler, welke wapens/modi, wat is het doel]',
    tech: 'Luau, Rojo, Roblox Studio',
    highlights: [
      'Architectuur die ook in gewone software gebruikt wordt (server als bron van waarheid)',
    ],
  },
]
