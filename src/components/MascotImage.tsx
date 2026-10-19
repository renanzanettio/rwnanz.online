import Image from "next/image";

/**
 * O mascote "Café Forte", desenhado por um amigo do Renan.
 * O desenho é a imagem pronta em public/mascote/cafe-forte.png: ela não é editada nem redesenhada,
 * o site só posiciona, balança e faz ela pular (src/styles/mascot.css).
 *
 * width/height são o tamanho real do arquivo (servem para reservar o espaço certo na página).
 * Se trocar a imagem por outra com tamanho diferente, mude aqui e os números do topo de src/styles/mascot.css.
 */
export const MASCOT = { src: "/mascote/cafe-forte.png", width: 1239, height: 1377 } as const;

/**
 * Largura em que a imagem aparece (no computador ~540px; no celular quase a tela toda).
 * O topo do site e a abertura usam o mesmo valor, assim o navegador baixa uma versão só.
 */
const SIZES = "(min-width: 960px) 540px, 92vw";

export default function MascotImage() {
  return (
    <Image
      className="cf__img"
      src={MASCOT.src}
      width={MASCOT.width}
      height={MASCOT.height}
      sizes={SIZES}
      loading="eager"
      fetchPriority="high"
      draggable={false}
      // decorativa: quem descreve o mascote é o botão (ou, na abertura, a folha toda fica escondida do leitor de tela)
      alt=""
    />
  );
}
