export type ProjectStatus =
  | "no-ar"
  | "em-breve"
  | "sem-hospedagem"
  | "em-desenvolvimento";

export type Project = {
  slug: string;
  name: string;
  /** frase curta, usada no painel de rotas */
  summary: string;
  /** texto mais completo, usado na seção de projetos/estudos de caso */
  description: string;
  stack: string[];
  status: ProjectStatus;
  /** aparece no painel de rotas e no diagrama do hero */
  route: boolean;
  siteUrl?: string;
  repoUrl?: string;
  /** ex: "Organização", "Repositório" — default "Repositório" */
  repoLabel?: string;
  /** caminhos de imagens (preencha depois) */
  images: string[];
};

export const statusMeta: Record<
  ProjectStatus,
  { label: string; dot: string; text: string }
> = {
  "no-ar": { label: "No ar", dot: "bg-route-teal", text: "text-route-teal-deep" },
  "em-breve": { label: "Em breve", dot: "bg-route-mustard", text: "text-route-mustard" },
  "sem-hospedagem": {
    label: "Sem hospedagem",
    dot: "bg-route-clay",
    text: "text-route-clay",
  },
  "em-desenvolvimento": {
    label: "Em desenvolvimento",
    dot: "bg-route-mustard",
    text: "text-route-mustard",
  },
};

// Edite os projetos aqui. `images` começa vazio — adicione os caminhos das
// fotos (em /public) quando estiverem prontas.
export const projects: Project[] = [
  {
    slug: "postvision",
    name: "PostVision",
    summary: "Análise postural em exercícios físicos com visão computacional.",
    description:
      "Sistema de análise postural em exercícios físicos orientado a visão computacional. Usa MediaPipe para rastrear pontos do corpo em tempo real e avaliar a execução dos movimentos, com API em Express, aplicação web em Next.js e app mobile em Kotlin com Jetpack Compose.",
    stack: ["Express", "Next.js", "Kotlin", "Jetpack Compose", "Python", "MediaPipe", "Machine Learning"],
    status: "no-ar",
    route: true,
    siteUrl: "https://postvision.rwnanz.online",
    repoUrl: "https://github.com/postvision-pi",
    repoLabel: "Organização",
    images: [],
  },
  {
    slug: "rwz-drive",
    name: "rwz-drive",
    summary: "Compartilhamento rápido de pastas e arquivos, sem exigir conta.",
    description:
      "Funciona como um Google Drive simplificado: o dono cria um link e um código de acesso para uma pasta ou arquivo, e quem recebe só precisa do código — sem precisar ter conta. O limite de download depende inteiramente da capacidade do servidor.",
    stack: ["Node.js", "Express", "Next.js", "SQLite"],
    status: "no-ar",
    route: true,
    siteUrl: "https://drive.rwnanz.online",
    repoUrl: "https://github.com/renanzanettio/rwz-drive",
    images: [],
  },
  {
    slug: "valeotour",
    name: "ValeOTour",
    summary: "Plataforma de TCC para fomentar o turismo no Vale do Ribeira (SP).",
    description:
      "ValeOTour é uma plataforma desenvolvida como Trabalho de Conclusão de Curso (TCC) com o objetivo de fomentar o turismo na região do Vale do Ribeira, SP. O sistema integra informações turísticas, permite o agendamento de guias locais e promove a valorização da cultura regional.",
    stack: ["PHP", "React Native", "MySQL", "JavaScript", "C#", "Bootstrap"],
    status: "sem-hospedagem",
    route: false,
    repoUrl: "https://github.com/ValeOTour",
    repoLabel: "Organização",
    images: [],
  },
  {
    slug: "rwz-tasks",
    name: "rwz-tasks",
    summary: "Organizador de tarefas semanais integrado ao Google Tasks.",
    description:
      "Organizador de rotina que separa as tarefas da semana e organiza de acordo com a dificuldade e o tempo médio de execução. Integra com o Google Tasks para importar as tarefas com todas as informações, permite ajustar os horários sugeridos e exportar tudo para o Google Agenda.",
    stack: ["Node.js", "Express", "Next.js", "SQLite"],
    status: "em-desenvolvimento",
    route: false,
    images: [],
  },
];
