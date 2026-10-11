// Dados gerais do site. Mexeu aqui, mudou no site inteiro.

export const site = {
  name: "Renan Zanetti",
  domain: "rwnanz.online",
  url: "https://rwnanz.online",
  locale: "pt_BR",
  title: "Renan Zanetti — Desenvolvedor web, mobile e visão computacional",
  description:
    "Portfólio de Renan Zanetti (RWZ): projetos de web, mobile e visão computacional, do front ao back, camada por camada.",
  email: "renanzanettio@gmail.com",
  github: "https://github.com/renanzanettio",
  githubLabel: "github.com/renanzanettio",
  linkedin: "https://www.linkedin.com/in/renan-zanetti/",
  linkedinLabel: "linkedin.com/in/renan-zanetti",
  /** mostra a plaquinha "Disponível para novos projetos" no topo */
  available: true,
  nav: [
    { href: "#projetos", label: "Projetos" },
    { href: "#camadas", label: "Camadas" },
    { href: "#sobre", label: "Sobre" },
    { href: "#contato", label: "Contato" },
  ],
  layers: {
    front: {
      intro:
        "Interfaces web com Next.js e React, e apps mobile com React Native e Jetpack Compose.",
      skills: ["JavaScript", "React", "Next.js", "React Native", "Kotlin", "Jetpack Compose", "Bootstrap"],
    },
    back: {
      intro:
        "APIs em Node.js e Express, bancos MySQL, MongoDB e SQLite, e visão computacional com Python e MediaPipe.",
      skills: ["Node.js", "Express", "PHP", "Python", "Java", "C#", "MySQL", "MongoDB", "SQLite", "MediaPipe"],
    },
  },
  about: {
    text: "Hoje foco em projetos de desenvolvimento web, mobile e visão computacional, em busca de uma posição como desenvolvedor júnior. Baseado no Brasil e disponível para novos projetos.",
    path: [
      { place: "Fatec de Registro", what: "Desenvolvimento de Software Multiplataformas" },
      { place: "Etec de Registro", what: "Técnico em Desenvolvimento de Sistemas" },
      { place: "PRODESP / Stefanini", what: "Suporte de TI e infraestrutura" },
    ],
  },
} as const;

/** ano do rodapé (calculado quando o site é gerado) */
export const currentYear = new Date().getFullYear();
