# rwnanz.online

Portfólio do Renan Zanetti (RWZ), em Next.js (App Router).

O design se chama **Camadas**: o leite fica em cima (front-end), o café embaixo (back-end) e uma linha de caramelo separa os dois, como num copo de café com leite. O mascote é o **Café Forte**, desenhado por um amigo do Renan. A abertura do site é um café visto de cima em que o leite "escreve" a logo RWZ e, no fim, a logo voa até o cabeçalho e fica lá.

## Rodar no seu computador

Precisa do Node.js 20.9 ou mais novo.

```bash
npm install
npm run dev        # abre em http://localhost:3000
```

Para ver a versão de produção, igual à da Vercel:

```bash
npm run build
npm start
```

O `npm install` cria o `package-lock.json`. Guarde esse arquivo no repositório: é ele que deixa os builds sempre iguais.

## Publicar na Vercel

1. Suba esta pasta para um repositório no GitHub. O `.gitignore` já deixa de fora `node_modules` e `.next`.
2. Na Vercel: **Add New… → Project**, escolha o repositório e clique em **Deploy**. O Next.js é reconhecido sozinho, não precisa configurar nada nem criar variáveis de ambiente.
3. Para usar o seu endereço: **Settings → Domains**, adicione `rwnanz.online` e siga o que a Vercel pedir no DNS. Em geral só o registro do endereço principal muda; os subdomínios dos projetos (`postvision.`, `drive.`) têm registros próprios. Confira no seu DNS antes de trocar, para não derrubar nenhum deles.

Sem GitHub, dá para publicar pelo terminal: `npm i -g vercel`, depois `vercel` (teste) e `vercel --prod` (valendo), de dentro desta pasta.

Depois de publicar, vale conferir: abrir no celular, abrir `/?intro` para rever a abertura, e colar o link no WhatsApp ou no LinkedIn para ver a imagem de compartilhamento (esses apps guardam a prévia antiga por um tempo).

## Onde mexer

| Quero mudar… | Arquivo |
| --- | --- |
| Projetos (textos, tecnologias, links, status) | `src/lib/projects.ts` |
| E-mail, GitHub, LinkedIn, menu, seção Camadas e Sobre | `src/lib/site.ts` |
| Textos do topo da página | `src/components/Hero.tsx` |
| As falas do mascote (balão ao clicar) e o nome dele | `src/components/MascotButton.tsx` |
| A imagem do mascote | `public/mascote/cafe-forte.png` (veja "O mascote") |
| Cores, medidas e velocidade da abertura | `src/styles/tokens.css` |
| Por onde o leite desenha a logo (ordem, ritmo, grossura dos traços) | `src/components/intro-ink.ts` (veja "A abertura") |
| O desenho e a animação da abertura (copo, gotas, voo da logo) | `src/components/Intro.tsx` e `src/styles/intro.css` |
| Aparência de cada parte | `src/styles/*.css` (um arquivo por parte da página) |
| Ícone da aba, ícone do iPhone e imagem de compartilhamento | `src/app/icon.svg`, `apple-icon.png`, `favicon.ico`, `opengraph-image.png` (1200 × 630) |

**Prints dos projetos:** salve as imagens em `public/projetos/` e preencha `images: ["/projetos/nome.png"]` no projeto. A primeira vira a capa do cartão.

## O mascote

- O **Café Forte** é a imagem pronta `public/mascote/cafe-forte.png` (1239 × 1377 px), do jeito que o amigo do Renan entregou. **Ela não foi editada** e não deve ser: o site só posiciona, balança e faz ela pular. Quando houver outras poses, é só somar os arquivos em `public/mascote/`.
- Os braços e as pernas são linhas brancas, então ele precisa de fundo escuro: no topo do site fica sobre um disco (o "prato").
- Onde ele fica dentro do prato está em `src/styles/mascot.css` (porcentagens de um quadrado do tamanho do prato). O tamanho do prato no topo está em `--disc`, em `src/styles/hero.css`.
- **Para trocar a imagem** por outra com as mesmas proporções do arquivo (1239 × 1377) e o desenho no mesmo lugar, basta substituir o arquivo, mantendo o nome. Se mudar o tamanho do arquivo, ajuste `MASCOT` em `src/components/MascotImage.tsx` e os números do começo de `src/styles/mascot.css`.
- A imagem passa por `next/image`: na Vercel ela é entregue em WebP e no tamanho de cada tela (no celular vai uma versão de uns 55 a 130 KB, em vez dos 360 KB do arquivo original). No Termux (Android) a biblioteca que faz isso não funciona, então o `next.config.ts` entrega o arquivo como está.
- Ao clicar nele no topo, ele pula e fala uma frase (`PHRASES`, em `src/components/MascotButton.tsx`). O nome "Café Forte" nas falas e para leitores de tela é a constante `NAME` do mesmo arquivo.

## A abertura

Fundo de espresso, um copo de café visto de cima e o leite "escrevendo" a logo RWZ traço a traço, na ordem em que uma mão desenharia: o tronco do R, a barra de cima, a diagonal, o risquinho que cruza e a perna. Quando termina, a logo sai do copo, encolhe e voa até o canto do cabeçalho, onde fica. Dura uns 4 segundos.

- Toca uma vez por sessão. Para rever: abra o site com `/?intro` no final do endereço (também há o link "rever a abertura" no rodapé).
- Dá para pular tocando ou clicando na tela, ou com Esc, Enter ou espaço.
- Quem pediu "menos movimento" no sistema não vê a abertura nem as animações.
- Para deixar mais rápida ou mais calma, mude `--k` em `src/styles/tokens.css` (menor = mais rápida).
- A animação é feita só com CSS (`src/styles/intro.css`, que traz a linha do tempo no começo). O JavaScript (`src/components/IntroSkip.tsx`) só cuida de pular, de liberar a rolagem no fim e de medir onde está a logo do cabeçalho, para a logo da abertura pousar exatamente em cima dela (isso continua certo se a janela mudar de tamanho).
- Se o navegador não conseguir animar os traços, a logo aparece inteira, de uma vez, no momento em que o leite terminaria, e o resto da abertura segue igual.

### Como a logo é "escrita"

- A logo que aparece é sempre a sua, de `src/components/logo-paths.ts`, sem nenhuma alteração. Os traços de `src/components/intro-ink.ts` **não são a logo**: cada um é só o percurso da "caneta" (o centro do traço) e serve de máscara grossa que vai revelando a logo original aos poucos. No fim, tudo é trocado pela logo lisa, então o último quadro é sempre o seu desenho exato.
- Cada traço em `intro-ink.ts` tem o percurso (`d`), a grossura da máscara (`w`), quando a gota toca o café (`land`) e quanto tempo o leite leva para escorrer (`dur`, os dois em segundos antes do `--k`). Para mudar o ritmo ou a ordem, mexa nesses números; o fim da escrita (`INK_END`) é calculado sozinho.
- As grossuras foram medidas para que as máscaras, juntas, cubram a logo inteira. Se você mudar um percurso ou uma grossura, confira a abertura em câmera lenta (no Chrome: DevTools → Animations): um pedaço da logo que ficou de fora só aparece no fim, de uma vez.

## Detalhes

- A logo RWZ (`src/components/logo-paths.ts` e `public/logo.svg`) está exatamente como você desenhou. Não altere os paths: o cabeçalho e a abertura usam os mesmos.
- Fontes: Anton, Bricolage Grotesque e Caveat, todas com licença OFL (os textos estão em `src/fonts`). São servidas pelo próprio site, sem pedir nada ao Google.
- O CSS é puro, dividido em `src/styles`. Não usa Tailwind.
- O efeito de "aparecer ao rolar" só roda nos navegadores que suportam `animation-timeline: view()`. Nos outros o conteúdo já aparece direto.
- Sem JavaScript o site continua inteiro: só não há abertura nem menu de celular (o menu vira uma linha de links).
- O `AGENTS.md` e o `CLAUDE.md` vieram do projeto original e avisam que esta versão do Next.js tem diferenças em relação às anteriores. Vale ler a documentação em `node_modules/next/dist/docs/` antes de mexer em rotas ou metadados.
