import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

export interface CarouselImage {
  src: string;
  alt: string;
}

interface PhotoCarouselProps {
  images: CarouselImage[];
}

const BASE_SPEED = 42;
const COPIES = [0, 1, 2, 3];

export default function PhotoCarousel({ images }: PhotoCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const speedRef = useRef(BASE_SPEED);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startOffsetRef = useRef(0);
  const copyWidthRef = useRef(0);
  const reducedRef = useRef(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (copyRef.current) {
        copyWidthRef.current = copyRef.current.offsetWidth;
      }
    };

    measure();
    window.addEventListener("resize", measure);

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = media.matches;
    const onChange = (event: MediaQueryListEvent) => {
      reducedRef.current = event.matches;
    };
    media.addEventListener("change", onChange);

    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const delta = Math.min(0.05, (now - last) / 1000);
      last = now;
      const copyWidth = copyWidthRef.current;

      if (!draggingRef.current && !reducedRef.current) {
        speedRef.current += (BASE_SPEED - speedRef.current) * Math.min(1, delta * 2.6);
        offsetRef.current += speedRef.current * delta;
      }

      if (copyWidth > 0) {
        offsetRef.current = ((offsetRef.current % copyWidth) + copyWidth) % copyWidth;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", measure);
      media.removeEventListener("change", onChange);
      cancelAnimationFrame(frame);
    };
  }, []);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    setDragging(true);
    speedRef.current = 0;
    startXRef.current = event.clientX;
    startOffsetRef.current = offsetRef.current;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;

    const copyWidth = copyWidthRef.current;
    let next = startOffsetRef.current - (event.clientX - startXRef.current);

    if (copyWidth > 0) {
      next = ((next % copyWidth) + copyWidth) % copyWidth;
    }

    offsetRef.current = next;
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;

    draggingRef.current = false;
    setDragging(false);
    speedRef.current = 0;

    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // el puntero ya se hab&iacute;a liberado
    }
  };

  return (
    <div
      className={`photo-carousel ${dragging ? "is-dragging" : ""}`}
      role="region"
      aria-label="Carrusel de fotos de entrenamiento. Arrastra para moverlo."
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={(event) => {
        if (draggingRef.current) endDrag(event);
      }}
    >
      <div className="photo-carousel-track" ref={trackRef}>
        {COPIES.map((copy) => (
          <div
            className="photo-carousel-copy"
            key={copy}
            ref={copy === 0 ? copyRef : undefined}
            aria-hidden={copy > 0}
          >
            {images.map((image, index) => (
              <figure className="photo-carousel-item" key={`${copy}-${index}`}>
                <img
                  src={image.src}
                  alt={copy === 0 ? image.alt : ""}
                  loading="lazy"
                  draggable={false}
                />
              </figure>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
