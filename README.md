# rwnanz.online

Portfólio do Renan Zanetti (RWZ), em Next.js (App Router).

O design se chama **Camadas**: o leite fica em cima (front-end), o café embaixo (back-end) e uma linha de caramelo separa os dois, como num copo de café com leite. O mascote é o **Pingado**, e a abertura do site é ele sendo rabiscado, enchido de café e leite, e acenando.

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
| Cores, medidas e velocidade da abertura | `src/styles/tokens.css` |
| Aparência de cada parte | `src/styles/*.css` (um arquivo por parte da página) |
| Ícone da aba, ícone do iPhone e imagem de compartilhamento | `src/app/icon.svg`, `apple-icon.png`, `favicon.ico`, `opengraph-image.png` (1200 × 630) |

**Prints dos projetos:** salve as imagens em `public/projetos/` e preencha `images: ["/projetos/nome.png"]` no projeto. A primeira vira a capa do cartão.

## A abertura

- Toca uma vez por sessão. Para rever: abra o site com `/?intro` no final do endereço (também há o link "rever a abertura" no rodapé).
- Dá para pular tocando ou clicando na tela, ou com Esc, Enter ou espaço.
- Quem pediu "menos movimento" no sistema não vê a abertura nem as animações.
- Para deixar mais rápida ou mais calma, mude `--k` em `src/styles/tokens.css` (menor = mais rápida).
- A animação é feita só com CSS. O JavaScript só cuida de pular e de liberar a rolagem no fim.
- O desenho do Pingado está em `src/components/Pingado.tsx` e os tempos de cada traço estão nele. O "tremido de mão" das linhas é calculado uma vez, por `scripts/bake-pingado.mjs`, e gravado em `src/components/pingado-art.ts`. Se mexer no desenho, rode `node scripts/bake-pingado.mjs` (não precisa instalar nada).

## Detalhes

- A logo RWZ (`src/components/logo-paths.ts` e `public/logo.svg`) está exatamente como você desenhou. Não altere os paths.
- Fontes: Anton, Bricolage Grotesque e Caveat, todas com licença OFL (os textos estão em `src/fonts`). São servidas pelo próprio site, sem pedir nada ao Google.
- O CSS é puro, dividido em `src/styles`. Não usa Tailwind.
- O efeito de "aparecer ao rolar" só roda nos navegadores que suportam `animation-timeline: view()`. Nos outros o conteúdo já aparece direto.
- Sem JavaScript o site continua inteiro: só não há abertura nem menu de celular (o menu vira uma linha de links).
- O `AGENTS.md` e o `CLAUDE.md` vieram do projeto original e avisam que esta versão do Next.js tem diferenças em relação às anteriores. Vale ler a documentação em `node_modules/next/dist/docs/` antes de mexer em rotas ou metadados.
