import { notFound } from "next/navigation";
import type { Localized } from "./locale";

export const projectCategories = {
  academic: { "pt-BR": "Acadêmico", en: "Academic" },
  personal: { "pt-BR": "Pessoal", en: "Personal" },
  commercial: { "pt-BR": "Comercial", en: "Commercial" },
  freelance: { "pt-BR": "Freelance", en: "Freelance" },
} satisfies Record<string, Localized>;

export const projectStatuses = {
  live: { label: { "pt-BR": "No ar", en: "Live" }, tone: "live" },
  mobile: { label: { "pt-BR": "Aplicativo mobile", en: "Mobile app" }, tone: "off" },
  paused: { label: { "pt-BR": "Desenvolvimento pausado", en: "Development paused" }, tone: "wip" },
} satisfies Record<string, { label: Localized; tone: string }>;

type ProjectCopy = {
  summary: string;
  heroSummary?: string;
  context: string;
  contextTitle?: string;
  solution: string;
  demoTitle?: string;
  decisions?: string;
  contribution?: string;
  lessons?: string;
};

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: Localized;
  caption?: Localized;
  platform?: "web" | "mobile";
  preview?: boolean;
  highlight?: Localized;
};

export type Project = {
  slug: string;
  name: string;
  category: keyof typeof projectCategories;
  status: keyof typeof projectStatuses;
  tech: readonly string[];
  copy: Localized<ProjectCopy>;
  featured?: boolean;
  siteUrl?: string;
  repoUrl?: string;
  logo?: string;
  organization?: boolean;
  heroImage?: ProjectImage;
  images?: readonly ProjectImage[];
  youtubeId?: string;
};

export const projects: readonly Project[] = [
  {
    slug: "postvision",
    logo: "/projetos/logos/postvision.svg",
    name: "PostVision",
    category: "academic",
    status: "live",
    featured: true,
    tech: ["Next.js", "MediaPipe", "Express", "MongoDB", "Kotlin"],
    siteUrl: "https://postvision.rwnanz.online",
    repoUrl: "https://github.com/postvision-pi",
    organization: true,
    images: [
      {
        src: "/projetos/postvision/web-dashboard.webp",
        platform: "web",
        preview: true,
        width: 1363, height: 936,
        alt: { "pt-BR": "Painel web com gráficos de treino e sequência de exercícios.", en: "Web dashboard with workout charts and training streak." },
        caption: { "pt-BR": "Painel web · dados fictícios", en: "Web dashboard · mock data" },
      },
      {
        src: "/projetos/postvision/web-inicio.webp",
        platform: "web",
        width: 1333, height: 718,
        alt: { "pt-BR": "Página inicial da versão web do PostVision.", en: "PostVision web home page." },
        caption: { "pt-BR": "Página inicial web", en: "Web home page" },
      },
      {
        src: "/projetos/postvision/mobile-inicio.webp",
        platform: "mobile",
        preview: true,
        width: 393, height: 852,
        alt: { "pt-BR": "Tela inicial do PostVision com atalhos para análise, estatísticas e sugestões.", en: "PostVision mobile home with analysis, statistics, and suggestions." },
        caption: { "pt-BR": "Início", en: "Home" },
      },
      {
        src: "/projetos/postvision/mobile-instrucoes.webp",
        platform: "mobile",
        width: 197, height: 426,
        alt: { "pt-BR": "Instruções ilustradas para executar um agachamento.", en: "Illustrated instructions for performing a squat." },
        caption: { "pt-BR": "Prepare o movimento", en: "Get ready to squat" },
        highlight: {
          "pt-BR": "Veja a posição inicial e como fazer o agachamento.",
          en: "See the starting position and how to squat.",
        },
      },
      {
        src: "/projetos/postvision/mobile-relatorio.webp",
        platform: "mobile",
        width: 393, height: 852,
        alt: { "pt-BR": "Relatório de uma sessão de agachamento, com repetições, gráfico e feedback.", en: "Squat session report with repetition counts, a chart, and feedback." },
        caption: { "pt-BR": "Revise a sessão", en: "Review the session" },
        highlight: {
          "pt-BR": "Confira as repetições e os ajustes de postura depois do treino.",
          en: "See your reps and what to adjust after training.",
        },
      },
      {
        src: "/projetos/postvision/mobile-estatisticas.webp",
        platform: "mobile",
        width: 393, height: 852,
        alt: { "pt-BR": "Estatísticas de treino com sequência, última sessão e desempenho semanal.", en: "Training statistics showing the streak, last workout, and weekly performance." },
        caption: { "pt-BR": "Acompanhe a evolução", en: "Track progress" },
        highlight: {
          "pt-BR": "Compare os treinos da semana e veja sua sequência.",
          en: "Compare weekly workouts and see your streak.",
        },
      },
      {
        src: "/projetos/postvision/mobile-perfil.webp",
        platform: "mobile",
        width: 393, height: 852,
        alt: { "pt-BR": "Tela de perfil do PostVision com dados de contato e documentos ocultados.", en: "PostVision profile screen with contact details and document numbers redacted." },
        caption: { "pt-BR": "Perfil", en: "Profile" },
      },
    ],
    copy: {
      "pt-BR": {
        summary: "Análise de exercícios físicos com visão computacional e feedback em tempo real.",
        contextTitle: "Feedback para quem treina sozinho.",
        demoTitle: "Do treino ao feedback.",
        context: "É fácil deixar passar erros de postura ao treinar sozinho. O PostVision nasceu como um projeto acadêmico em equipe para investigar como a câmera pode ajudar a perceber esses erros durante o exercício.",
        solution: "A câmera registra o movimento, e o MediaPipe identifica pontos do corpo em tempo real. A aplicação usa esses pontos para analisar a execução do agachamento e apresenta feedback e um relatório da sessão.",
        decisions: "A interface web usa Next.js e consome uma API Express. O MongoDB armazena sessões e relatórios. A divisão permite que o app Android em Kotlin consuma a mesma API.",
      },
      en: {
        summary: "Exercise form analysis with computer vision and real-time feedback.",
        contextTitle: "Feedback when you train alone.",
        demoTitle: "From workout to feedback.",
        context: "Small mistakes in form are easy to miss when training alone. PostVision began as a team project exploring how a camera could help people spot those mistakes during exercise.",
        solution: "The camera captures movement, and MediaPipe identifies body landmarks in real time. The app uses those landmarks to analyze squat form and provides feedback and a session report.",
        decisions: "The Next.js web interface uses an Express API. MongoDB stores sessions and reports. This separation lets the Kotlin Android app use the same API.",
      },
    },
  },
  {
    slug: "pouso",
    logo: "/projetos/logos/pouso.png",
    name: "Pouso",
    category: "personal",
    status: "live",
    featured: true,
    tech: ["Next.js", "React", "TypeScript", "PWA"],
    siteUrl: "https://pouso.rwnanz.online",
    images: [
      {
        src: "/projetos/pouso/web-inicio.webp",
        platform: "web",
        preview: true,
        width: 1348, height: 936,
        alt: { "pt-BR": "Painel do Pouso com registro rápido, tarefas do dia, agenda e hábitos.", en: "Pouso dashboard with quick capture, daily tasks, agenda, and habits." },
        caption: { "pt-BR": "Painel web · dados de exemplo", en: "Web dashboard · sample data" },
      },
      {
        src: "/projetos/pouso/web-tarefas.webp",
        platform: "web",
        width: 1333, height: 926,
        alt: { "pt-BR": "Lista de tarefas por prazo e acompanhamento dos hábitos de hoje.", en: "Tasks grouped by due date and a tracker for today's habits." },
        caption: { "pt-BR": "Planeje o dia", en: "Plan the day" },
        highlight: {
          "pt-BR": "Veja o que vence hoje, o que está atrasado e quais hábitos você já completou.",
          en: "See what's due today, what's overdue, and which habits you've completed.",
        },
      },
      {
        src: "/projetos/pouso/web-calendario.webp",
        platform: "web",
        width: 1363, height: 936,
        alt: { "pt-BR": "Calendário mensal com um dia selecionado e uma reunião no painel lateral.", en: "Monthly calendar with a selected day and a meeting in the side panel." },
        caption: { "pt-BR": "Consulte a agenda", en: "Check the calendar" },
        highlight: {
          "pt-BR": "Selecione um dia no calendário para consultar os horários e compromissos.",
          en: "Select a day on the calendar to check its schedule and appointments.",
        },
      },
      {
        src: "/projetos/pouso/web-frente.webp",
        platform: "web",
        width: 1363, height: 936,
        alt: { "pt-BR": "Frente Site novo com tarefas, eventos e notas do mesmo projeto.", en: "The New website workspace with tasks, events, and notes for the same project." },
        caption: { "pt-BR": "Organize por projeto", en: "Organize by project" },
        highlight: {
          "pt-BR": "Use uma Frente para juntar as notas, tarefas e compromissos de um projeto.",
          en: "Use a workspace to bring a project's notes, tasks, and appointments together.",
        },
      },
      {
        src: "/projetos/pouso/web-notas.webp",
        platform: "web",
        width: 1333, height: 926,
        alt: { "pt-BR": "Tela de notas com um campo de registro, Inbox e notas organizadas em Frentes.", en: "Notes screen with a capture field, an inbox, and notes organized by workspace." },
        caption: { "pt-BR": "Notas e Inbox", en: "Notes and inbox" },
      },
    ],
    copy: {
      "pt-BR": {
        summary: "Notas, tarefas, hábitos e agenda em um espaço de planejamento pessoal.",
        demoTitle: "Do planejamento do dia às Frentes.",
        context: "O Pouso evoluiu do RWZ Journal. A proposta é reunir ferramentas de organização pessoal que costumam ficar espalhadas em aplicativos diferentes.",
        solution: "A aplicação reúne notas, tarefas, hábitos e agenda. A ideia é que o planejamento e o acompanhamento da rotina aconteçam no mesmo lugar.",
        decisions: "Optei por uma PWA para distribuir a aplicação pela web e permitir a instalação em dispositivos compatíveis.",
      },
      en: {
        summary: "Notes, tasks, habits, and a calendar in one personal planning space.",
        demoTitle: "From daily planning to project workspaces.",
        context: "Pouso grew out of RWZ Journal. It brings together personal planning tools that are often spread across several apps.",
        solution: "The app combines notes, tasks, habits, and a calendar so planning and tracking a routine can happen in the same place.",
        decisions: "I built it as a progressive web app so people can access it on the web and install it on supported devices.",
      },
    },
  },
  {
    slug: "rwz-drive",
    logo: "/projetos/logos/rwz-drive.svg",
    name: "RWZ Drive",
    category: "personal",
    status: "live",
    tech: ["Next.js", "Express", "SQLite", "Termux"],
    siteUrl: "https://drive.rwnanz.online",
    repoUrl: "https://github.com/renanzanettio/rwz-drive",
    copy: {
      "pt-BR": {
        summary: "Compartilhamento de arquivos e pastas por link e código de acesso.",
        context: "O RWZ Drive resolve uma tarefa comum: compartilhar arquivos com quem só precisa baixá-los, sem exigir cadastro de quem recebe.",
        solution: "Quem envia cria um link e um código de acesso para um arquivo ou pasta. Quem recebe usa o código para baixar o conteúdo.",
        decisions: "A interface em Next.js e a API em Express rodam num Galaxy S21 FE com Termux. O PM2 gerencia os processos, e o SQLite guarda os dados do serviço.",
      },
      en: {
        summary: "File and folder sharing through links and access codes.",
        context: "RWZ Drive makes it easier to share files with people who only need to download them, without requiring recipients to sign up.",
        solution: "The sender creates a link and access code for a file or folder. The recipient uses the code to download the content.",
        decisions: "The Next.js interface and Express API run on a Galaxy S21 FE using Termux. PM2 manages the processes, and SQLite stores the service data.",
      },
    },
  },
  {
    slug: "valeotour",
    logo: "/projetos/logos/valeotour.webp",
    name: "ValeOTour",
    category: "academic",
    status: "mobile",
    featured: true,
    tech: ["React Native", "Expo", "PHP", "MySQL", "C#"],
    repoUrl: "https://github.com/renanzanettio/ValeOTour",
    youtubeId: "RHt79ceYWiw",
    images: [
      {
        src: "/projetos/valeotour/web-perfil.webp",
        platform: "web",
        preview: true,
        width: 1440, height: 1958,
        alt: { "pt-BR": "Página web de um estabelecimento com informações, fotos, mapa e comentários.", en: "Web business profile with information, photos, a map, and reviews." },
        caption: { "pt-BR": "Perfil na web", en: "Business profile on the web" },
      },
      {
        src: "/projetos/valeotour/mobile-inicio.webp",
        platform: "mobile",
        width: 393, height: 1547,
        alt: { "pt-BR": "Tela inicial do ValeOTour com categorias de turismo, guias e lugares populares.", en: "ValeOTour home with tourism categories, guides, and popular places." },
        caption: { "pt-BR": "Descubra a região", en: "Discover the region" },
        highlight: {
          "pt-BR": "Explore lugares e guias locais pelas categorias de turismo.",
          en: "Browse places and local guides by category.",
        },
      },
      {
        src: "/projetos/valeotour/mobile-mapa.webp",
        platform: "mobile",
        preview: true,
        width: 393, height: 852,
        alt: { "pt-BR": "Mapa do ValeOTour com uma rota traçada em Cananéia.", en: "ValeOTour map showing a route in Cananéia." },
        caption: { "pt-BR": "Veja como chegar", en: "Find your way" },
        highlight: {
          "pt-BR": "Localize o destino no mapa e trace uma rota.",
          en: "Find the destination on the map and plan a route.",
        },
      },
      {
        src: "/projetos/valeotour/mobile-guias.webp",
        platform: "mobile",
        width: 393, height: 1013,
        alt: { "pt-BR": "Lista de guias com busca e filtro no aplicativo.", en: "Guide directory with search and filtering in the app." },
        caption: { "pt-BR": "Busca de guias", en: "Find a guide" },
      },
      {
        src: "/projetos/valeotour/mobile-estabelecimento.webp",
        platform: "mobile",
        width: 393, height: 1902,
        alt: { "pt-BR": "Perfil de um hotel com fotos, descrição e detalhes da hospedagem.", en: "Hotel profile with photos, a description, and lodging details." },
        caption: { "pt-BR": "Detalhes do local", en: "Place details" },
      },
      {
        src: "/projetos/valeotour/mobile-comentarios.webp",
        platform: "mobile",
        width: 393, height: 1535,
        alt: { "pt-BR": "Aba de comentários de um hotel com filtros e avaliações de visitantes.", en: "Hotel reviews tab with filters and visitor ratings." },
        caption: { "pt-BR": "Avaliações e comentários", en: "Ratings and reviews" },
      },
      {
        src: "/projetos/valeotour/mobile-agendamento.webp",
        platform: "mobile",
        width: 393, height: 852,
        alt: { "pt-BR": "Chat com mensagens de solicitação e confirmação de agendamento.", en: "Chat showing a booking request and confirmation." },
        caption: { "pt-BR": "Combine um passeio", en: "Arrange a tour" },
        highlight: {
          "pt-BR": "Converse com um guia e acompanhe o agendamento no chat.",
          en: "Talk to a guide and follow the booking in chat.",
        },
      },
      {
        src: "/projetos/valeotour/mobile-boas-vindas.webp",
        platform: "mobile",
        width: 393, height: 852,
        alt: { "pt-BR": "Tela de boas-vindas com o símbolo do ValeOTour e um convite para explorar a região.", en: "Welcome screen with the ValeOTour mark and an invitation to explore the region." },
        caption: { "pt-BR": "Tela de boas-vindas", en: "Welcome screen" },
      },
    ],
    copy: {
      "pt-BR": {
        summary: "Aplicativo de turismo regional desenvolvido como TCC.",
        heroSummary: "Um app para descobrir o Vale do Ribeira e planejar passeios com guias locais.",
        contextTitle: "Turismo regional, num só lugar.",
        demoTitle: "Da descoberta ao passeio.",
        context: "O ValeOTour nasceu como TCC da Etec de Registro. Em equipe, reunimos informações sobre os estabelecimentos da região e criamos um caminho para o visitante conversar com guias locais.",
        solution: "O app conecta descoberta, rota e agendamento. A versão web apresenta os estabelecimentos, e a aplicação desktop apoia a administração.",
        decisions: "O app mobile usa React Native e Expo. O sistema usa PHP e MySQL, e a interface administrativa foi desenvolvida em C# com Windows Forms.",
      },
      en: {
        summary: "A regional tourism app developed as a capstone project.",
        heroSummary: "An app for discovering Vale do Ribeira and planning tours with local guides.",
        contextTitle: "Regional tourism in one place.",
        demoTitle: "From discovery to booking.",
        context: "ValeOTour began as a team capstone at Etec de Registro. We brought together information about local businesses and gave visitors a way to talk with local guides.",
        solution: "The mobile app brings together discovery, routes, and bookings. The web version showcases local businesses, and a desktop app supports administration.",
        decisions: "The mobile app uses React Native and Expo. The system uses PHP and MySQL, while the desktop admin interface was built with C# and Windows Forms.",
      },
    },
  },
  {
    slug: "tanuki-imprime",
    logo: "/projetos/logos/tanuki-imprime.svg",
    name: "Tanuki Imprime",
    category: "commercial",
    status: "live",
    featured: true,
    tech: [],
    siteUrl: "https://tanuki.rwnanz.online",
    images: [
      {
        src: "/projetos/tanuki-imprime/web-inicio.webp",
        platform: "web",
        preview: true,
        width: 1333, height: 926,
        alt: { "pt-BR": "Página inicial da Tanuki Imprime com uma ilustração de impressora 3D e entrada para o catálogo.", en: "Tanuki Imprime homepage with an illustration of a 3D printer and a link to the catalog." },
        caption: { "pt-BR": "Site da Tanuki Imprime", en: "Tanuki Imprime website" },
      },
      {
        src: "/projetos/tanuki-imprime/web-catalogo.webp",
        platform: "web",
        width: 1333, height: 926,
        alt: { "pt-BR": "Catálogo com o filtro de personalização por logo aplicado a duas peças.", en: "Catalog with the logo customization filter showing two items." },
        caption: { "pt-BR": "Encontre a peça", en: "Find an item" },
        highlight: {
          "pt-BR": "Busque por nome ou filtre por categoria, público e tipo de personalização.",
          en: "Search by name or filter by category, audience, and customization type.",
        },
      },
      {
        src: "/projetos/tanuki-imprime/web-personalizacao.webp",
        platform: "web",
        width: 1302, height: 926,
        alt: { "pt-BR": "Configuração do chaveiro suporte com tamanho, material, cor e a opção de logo selecionada.", en: "Phone stand keychain configurator with size, material, color, and the logo option selected." },
        caption: { "pt-BR": "Personalize a peça", en: "Customize the item" },
        highlight: {
          "pt-BR": "Veja as fotos da peça e escolha entre os tamanhos, cores e acabamentos disponíveis.",
          en: "Browse the product photos and choose from available sizes, colors, and finishes.",
        },
      },
      {
        src: "/projetos/tanuki-imprime/web-lista.webp",
        platform: "web",
        width: 1363, height: 936,
        alt: { "pt-BR": "Lista de interesse com uma peça de demonstração, quantidade, total e botão para continuar no WhatsApp.", en: "Interest list with a sample item, quantity, total, and a button to continue on WhatsApp." },
        caption: { "pt-BR": "Monte a lista", en: "Build your list" },
        highlight: {
          "pt-BR": "Revise itens e quantidades antes de conversar pelo WhatsApp. A captura usa uma peça de exemplo.",
          en: "Review items and quantities before opening WhatsApp. The screenshot uses a sample item.",
        },
      },
      {
        src: "/projetos/tanuki-imprime/web-empresas.webp",
        platform: "web",
        width: 1333, height: 926,
        alt: { "pt-BR": "Página para empresas com uma peça que pode receber a marca do cliente.", en: "Business page featuring a product that can carry the customer's brand." },
        caption: { "pt-BR": "Para empresas", en: "For businesses" },
      },
    ],
    copy: {
      "pt-BR": {
        summary: "Catálogo online da minha marca de impressão 3D personalizada.",
        demoTitle: "Da busca à lista de interesse.",
        context: "A Tanuki Imprime é minha marca de impressão 3D. Criei o site para reunir as peças que produzo e facilitar pedidos de personalização.",
        solution: "O catálogo apresenta peças prontas e personalizáveis, como chaveiros com nomes ou logos. As fotos ajudam a mostrar os detalhes das peças impressas antes do pedido.",
      },
      en: {
        summary: "An online catalog for my custom 3D printing business.",
        demoTitle: "From browsing to building a list.",
        context: "Tanuki Imprime is my 3D printing brand. I built the site to showcase the items I make and make it easier to request custom pieces.",
        solution: "The catalog includes ready-made and customizable items, such as keychains with names or logos. Photos show the details of printed pieces before customers order.",
      },
    },
  },
  {
    slug: "studio-personal",
    name: "Studio Personal",
    category: "freelance",
    status: "paused",
    tech: ["Next.js", "Supabase", "PostgreSQL"],
    copy: {
      "pt-BR": {
        summary: "Aplicação para montar fichas de treino e disponibilizá-las aos alunos.",
        context: "Projeto freelance para organizar a montagem e a consulta de fichas de treino em um estúdio de personal training.",
        solution: "O treinador monta fichas a partir de modelos, e cada aluno acessa a própria ficha após entrar na aplicação.",
        decisions: "O Supabase cuida da autenticação. Políticas de acesso no PostgreSQL limitam cada aluno aos próprios dados.",
      },
      en: {
        summary: "An app for creating workout plans and sharing them with clients.",
        context: "A freelance project to help a personal training studio create and share workout plans.",
        solution: "The trainer creates plans from templates, and each client can access their own plan after signing in.",
        decisions: "Supabase handles authentication. PostgreSQL row-level security limits each client to their own data.",
      },
    },
  },
  {
    slug: "links-rwz",
    logo: "/projetos/logos/links-rwz.svg",
    name: "Links RWZ",
    category: "personal",
    status: "live",
    tech: [],
    siteUrl: "https://links.rwnanz.online",
    copy: {
      "pt-BR": {
        summary: "Um hub de links para meus perfis e projetos.",
        context: "Criei uma página única para compartilhar endereços que uso nas redes sociais e nas minhas marcas.",
        solution: "A página principal reúne meus links, e páginas como a da Tanuki Imprime agrupam os endereços de uma marca em um único link para a bio.",
      },
      en: {
        summary: "A link hub for my profiles and projects.",
        context: "I built one place to share the links I use on social media and across my brands.",
        solution: "The home page groups my personal links, and dedicated pages like Tanuki Imprime collect a brand's links at a single address for its bio.",
      },
    },
  },
];

export const projectSlugs = () => projects.map(({ slug }) => ({ slug }));

export function getProject(slug: string) {
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();
  return project;
}
