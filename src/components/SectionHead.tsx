import type { ReactNode } from "react";

type Props = {
  /** rótulo pequeno em cima do título (ex.: "Projetos") */
  eyebrow: string;
  /** id do <h2>; a <section> aponta para ele com aria-labelledby */
  titleId: string;
  title: ReactNode;
  /** frase curta ao lado do título */
  children?: ReactNode;
};

export default function SectionHead({ eyebrow, titleId, title, children }: Props) {
  return (
    <div className="sec-head">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={titleId} className="sec-title">
          {title}
        </h2>
      </div>
      {children && <p className="sec-lead">{children}</p>}
    </div>
  );
}
