import Image from "next/image";
import { ui, type Locale } from "@/lib/locale";
import type { ProjectImage } from "@/lib/projects";
import { ArrowUpRight } from "./Icons";
import styles from "./ProjectLayout.module.css";

const mobileScreenRatio = 393 / 852;

export default function ProjectShowcase({
  images,
  video,
  name,
  locale,
}: {
  images: readonly ProjectImage[];
  video?: { id: string; url: string };
  name: string;
  locale: Locale;
}) {
  const text = ui[locale];
  const highlighted = images.filter((image) => image.highlight);
  const steps = highlighted.length ? highlighted : images.slice(0, 3);
  const remaining = images.filter((image) => !steps.includes(image));

  return (
    <div className={styles.showcase}>
      {steps.length > 0 && (
        <ol className={styles.flow} role="list">
          {steps.map((image, index) => {
            const mobile = image.platform === "mobile";
            const scrollable = mobile && image.width / image.height < mobileScreenRatio;
            const title = image.caption?.[locale] ?? image.alt[locale];

            return (
              <li key={image.src} className={styles.flowStep}>
                <div className={mobile ? styles.device : styles.webScreen}>
                  <div
                    className={scrollable ? `${styles.screen} ${styles.scrollableScreen}` : styles.screen}
                    tabIndex={scrollable ? 0 : undefined}
                    role={scrollable ? "region" : undefined}
                    aria-label={scrollable ? `${title}. ${text.projectScrollImage}` : undefined}
                  >
                    <Image
                      src={image.src}
                      width={image.width}
                      height={image.height}
                      sizes={mobile ? "(min-width: 760px) 208px, 40vw" : "(min-width: 760px) 360px, 90vw"}
                      alt={image.alt[locale]}
                    />
                  </div>
                </div>
                <div className={styles.flowCopy}>
                  <p className={styles.stepNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</p>
                  <h3>{title}</h3>
                  {image.highlight && <p>{image.highlight[locale]}</p>}
                  {scrollable && <p className={styles.scrollHint}>{text.projectScrollImage}</p>}
                  <a className="lnk" href={image.src} target="_blank" rel="noopener noreferrer">
                    {text.projectImageOpen} <ArrowUpRight /><span className="sr-only">{text.newTab}</span>
                  </a>
                </div>
              </li>
            );
          })}
        </ol>
      )}
      {(remaining.length > 0 || video) && (
        <div className={styles.extras}>
          {remaining.length > 0 && (
            <details className={styles.disclosure}>
              <summary>{text.projectMoreScreens} <span className={styles.extraCount}>{remaining.length}</span></summary>
              <ul className={styles.extraGallery} role="list">
                {remaining.map((image) => (
                  <li key={image.src}>
                    <a className={styles.galleryCard} href={image.src} target="_blank" rel="noopener noreferrer">
                      <div className={styles.galleryStage}>
                        <div className={image.platform === "mobile" ? styles.galleryPhone : styles.galleryBrowser}>
                          <Image
                            src={image.src}
                            width={image.width}
                            height={image.height}
                            sizes={image.platform === "mobile" ? "70px" : "260px"}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className={styles.galleryCaption}>
                        <div>
                          {image.platform && (
                            <span className={styles.galleryPlatform}>{image.platform === "web" ? "Web" : "Mobile"}</span>
                          )}
                          <span>{image.caption?.[locale] ?? image.alt[locale]}</span>
                        </div>
                        <ArrowUpRight />
                      </div>
                      <span className="sr-only">{text.newTab}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          )}
          {video && (
            <details className={styles.disclosure}>
              <summary>{text.projectVideo}</summary>
              <div className={styles.videoPanel}>
                <iframe
                  className={styles.video}
                  src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                  title={`${name} · ${text.projectVideo}`}
                  loading="lazy"
                  allow="encrypted-media; picture-in-picture"
                  allowFullScreen
                />
                <a className="lnk" href={video.url} target="_blank" rel="noopener noreferrer">
                  {text.projectWatch} <ArrowUpRight /><span className="sr-only">{text.newTab}</span>
                </a>
              </div>
            </details>
          )}
        </div>
      )}
    </div>
  );
}
