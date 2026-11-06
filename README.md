# rwnanz.online

Portfólio do Renan Zanetti (RWZ), em Next.js (App Router).

O design se chama **Camadas**: o leite fica em cima (front-end), o café embaixo (back-end) e uma linha de caramelo separa os dois, como num copo de café com leite. O mascote é o **Café Forte**, desenhado por um amigo do Renan. Na home, a logo e o mascote entram com um movimento breve.

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

Depois de publicar, confira o site no celular e a imagem de compartilhamento no WhatsApp ou LinkedIn.

## Idiomas e projetos

O português é o idioma padrão em `/`. A versão em inglês fica em `/en`. O catálogo fica em `/projetos` e `/en/projects`. O seletor no cabeçalho leva à versão correspondente da página aberta.

| Quero mudar… | Arquivo |
| --- | --- |
| Projetos, textos, tecnologias, links e status | `src/lib/projects.ts` |
| Textos da home nos dois idiomas e dados de contato | `src/lib/site.ts` |
| Rótulos de navegação e das páginas de projeto | `src/lib/locale.ts` |
| Falas e descrição do Café Forte | `src/components/MascotButton.tsx` |
| Cores e aparência | `src/styles/` |
| Ícones e imagem padrão de compartilhamento | `src/app/` e `public/opengraph-image.png` |

Cada projeto tem um `slug` para a URL e um bloco `copy` em português e inglês. Marque `featured: true` para exibi-lo na home. Os campos opcionais `contribution` e `lessons` entram na página de detalhes quando preenchidos.

Para colocar o logo na lista de projetos, salve o arquivo em `public/projetos/logos/` e informe o caminho em `logo`. Para adicionar capturas à página de detalhes, informe caminho, dimensões reais e texto alternativo nos dois idiomas em `images`.

```ts
images: [
  {
    src: "/projetos/postvision-sessao.webp",
    platform: "web",
    width: 1600,
    height: 900,
    alt: {
      "pt-BR": "Relatório da sessão de agachamentos no PostVision",
      en: "PostVision squat session report",
    },
  },
],
```

Na galeria, `platform` agrupa as capturas em `web` ou `mobile`. Use `caption` para incluir uma legenda curta em português e inglês. Para incorporar o pitch, preencha `youtubeId` com os 11 caracteres depois de `v=` na URL do YouTube. Quando o visitante escolhe Vídeo, a galeria abre o player.

## O mascote

- O **Café Forte** é a imagem pronta `public/mascote/cafe-forte.png` (1239 × 1377 px), do jeito que o amigo do Renan entregou. **Ela não foi editada** e não deve ser: o site só posiciona, balança e faz ela pular. Quando houver outras poses, é só somar os arquivos em `public/mascote/`.
- Os braços e as pernas são linhas brancas, então ele precisa de fundo escuro: no topo do site fica sobre um disco (o "prato").
- Onde ele fica dentro do prato está em `src/styles/mascot.css` (porcentagens de um quadrado do tamanho do prato). O tamanho do prato no topo está em `--disc`, em `src/styles/hero.css`.
- **Para trocar a imagem** por outra com as mesmas proporções do arquivo (1239 × 1377) e o desenho no mesmo lugar, basta substituir o arquivo, mantendo o nome. Se mudar o tamanho do arquivo, ajuste `MASCOT` em `src/components/MascotImage.tsx` e os números do começo de `src/styles/mascot.css`.
- A imagem passa por `next/image`: na Vercel ela é entregue em WebP e no tamanho de cada tela (no celular vai uma versão de uns 55 a 130 KB, em vez dos 360 KB do arquivo original). No Termux (Android) a biblioteca que faz isso não funciona, então o `next.config.ts` entrega o arquivo como está.
- Ao clicar nele no topo, ele pula e fala uma frase (veja `dialogue` em `src/components/MascotButton.tsx`). O nome "Café Forte" nas falas e para leitores de tela é a constante `NAME` do mesmo arquivo.

## Entrada da home

A logo, o conteúdo e o vapor do Café Forte têm uma entrada breve em CSS. A página fica disponível desde o início. Quem prefere movimento reduzido vê o conteúdo imediatamente.

## Detalhes

- A logo RWZ (`src/components/logo-paths.ts` e `public/logo.svg`) está exatamente como você desenhou. Não altere os paths: o cabeçalho e o rodapé usam os mesmos.
- Fontes: Anton, Bricolage Grotesque e Caveat, todas com licença OFL (os textos estão em `src/fonts`). São servidas pelo próprio site, sem pedir nada ao Google.
- O CSS é puro, dividido em `src/styles`. Não usa Tailwind.
- O efeito de "aparecer ao rolar" só roda nos navegadores que suportam `animation-timeline: view()`. Nos outros o conteúdo já aparece direto.
- Sem JavaScript, o menu de celular aparece como uma linha de links e o seletor de idioma continua funcionando.
- O `AGENTS.md` e o `CLAUDE.md` vieram do projeto original e avisam que esta versão do Next.js tem diferenças em relação às anteriores. Vale ler a documentação em `node_modules/next/dist/docs/` antes de mexer em rotas ou metadados.
