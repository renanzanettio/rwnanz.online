// Edite os projetos aqui. Cada um vira um cartão na seção "Projetos".
//
// O cartão mostra a divisão em duas camadas:
//   front → o que a pessoa vê e toca (interfaces web e mobile)
//   back  → o que processa, guarda e sustenta (APIs, bancos, visão computacional)
//
// Para colocar prints: salve as imagens em /public (ex.: public/projetos/postvision.png)
// e preencha `images: ["/projetos/postvision.png"]`. A primeira vira a capa do cartão.

export type ProjectStatus = "no-ar" | "em-breve" | "em-desenvolvimento" | "sem-hospedagem";

/** live = bolinha verde, wip = bolinha caramelo, off = bolinha vazada */
export type StatusTone = "live" | "wip" | "off";

export type Project = {
  slug: string;
  name: string;
  /** frase curta, em destaque no cartão */
  summary: string;
  /** texto mais completo */
  description: string;
  front: string[];
  back: string[];
  status: ProjectStatus;
  siteUrl?: string;
  repoUrl?: string;
  /** ex.: "Organização", "Repositório" — padrão "Repositório" */
  repoLabel?: string;
  /** caminhos de imagens em /public (opcional) */
  images?: string[];
};

export const statusMeta: Record<ProjectStatus, { label: string; tone: StatusTone }> = {
  "no-ar": { label: "No ar", tone: "live" },
  "em-breve": { label: "Em breve", tone: "wip" },
  "em-desenvolvimento": { label: "Em desenvolvimento", tone: "wip" },
  "sem-hospedagem": { label: "Sem hospedagem", tone: "off" },
};

export const projects: Project[] = [
  {
    slug: "postvision",
    name: "PostVision",
    summary: "Análise postural em exercícios físicos com visão computacional.",
    description:
      "Sistema de análise postural em exercícios físicos orientado a visão computacional. Usa MediaPipe para rastrear pontos do corpo em tempo real e avaliar a execução dos movimentos, com API em Express, aplicação web em Next.js e app mobile em Kotlin com Jetpack Compose.",
    front: ["Next.js", "Kotlin", "Jetpack Compose"],
    back: ["Express", "Python", "MediaPipe", "Machine Learning"],
    status: "no-ar",
    siteUrl: "https://postvision.rwnanz.online",
    repoUrl: "https://github.com/postvision-pi",
    repoLabel: "Organização",
  },
  {
    slug: "rwz-drive",
    name: "rwz-drive",
    summary: "Compartilhamento rápido de pastas e arquivos, sem exigir conta.",
    description:
      "Funciona como um Google Drive simplificado: o dono cria um link e um código de acesso para uma pasta ou arquivo, e quem recebe só precisa do código — sem precisar ter conta. O limite de download depende inteiramente da capacidade do servidor.",
    front: ["Next.js"],
    back: ["Node.js", "Express", "SQLite"],
    status: "no-ar",
    siteUrl: "https://drive.rwnanz.online",
    repoUrl: "https://github.com/renanzanettio/rwz-drive",
  },
  {
    slug: "valeotour",
    name: "ValeOTour",
    summary: "Plataforma de TCC para fomentar o turismo no Vale do Ribeira (SP).",
    description:
      "Plataforma desenvolvida como Trabalho de Conclusão de Curso (TCC). Integra informações turísticas, permite o agendamento de guias locais e promove a valorização da cultura regional.",
    front: ["React Native", "JavaScript", "Bootstrap"],
    back: ["PHP", "MySQL", "C#"],
    status: "sem-hospedagem",
    repoUrl: "https://github.com/ValeOTour",
    repoLabel: "Organização",
  },
  {
    slug: "rwz-tasks",
    name: "rwz-tasks",
    summary: "Organizador de tarefas semanais integrado ao Google Tasks.",
    description:
      "Organizador de rotina que separa as tarefas da semana e organiza de acordo com a dificuldade e o tempo médio de execução. Integra com o Google Tasks para importar as tarefas com todas as informações, permite ajustar os horários sugeridos e exportar tudo para o Google Agenda.",
    front: ["Next.js"],
    back: ["Node.js", "Express", "SQLite"],
    status: "em-desenvolvimento",
  },
];
