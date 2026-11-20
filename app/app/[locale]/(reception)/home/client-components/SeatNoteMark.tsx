import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { IconType } from "react-icons";

interface SeatNoteMarkProps {
  icon: IconType;
  label: string;
  text: string;
  className?: string;
}

export default function SeatNoteMark({
  icon: Icon,
  label,
  text,
  className = "",
}: SeatNoteMarkProps) {
  const tooltipId = useId();
  const [anchor, setAnchor] = useState<DOMRect | null>(null);
  const isOpen = anchor !== null;

  useEffect(() => {
    if (!isOpen) return;

    const dismiss = () => setAnchor(null);
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };

    window.addEventListener("scroll", dismiss, true);
    window.addEventListener("resize", dismiss);
    window.addEventListener("keydown", dismissOnEscape);
    return () => {
      window.removeEventListener("scroll", dismiss, true);
      window.removeEventListener("resize", dismiss);
      window.removeEventListener("keydown", dismissOnEscape);
    };
  }, [isOpen]);

  const leftSpace = anchor?.left ?? 0;
  const rightSpace = anchor ? window.innerWidth - anchor.right : 0;
  const showOnLeft = leftSpace >= 336 || leftSpace >= rightSpace;
  const availableWidth = (showOnLeft ? leftSpace : rightSpace) - 16;

  return (
    <>
      <span
        aria-describedby={isOpen ? tooltipId : undefined}
        aria-label={label}
        className={`inline-flex shrink-0 cursor-help ${className}`}
        role="img"
        tabIndex={0}
        onBlur={() => setAnchor(null)}
        onClick={() => setAnchor(null)}
        onFocus={(event) =>
          setAnchor(event.currentTarget.getBoundingClientRect())
        }
        onMouseEnter={(event) =>
          setAnchor(event.currentTarget.getBoundingClientRect())
        }
        onMouseLeave={() => setAnchor(null)}
      >
        <Icon aria-hidden="true" className="pointer-events-none" size={12} />
      </span>
      {anchor &&
        createPortal(
          <div
            className={`tooltip tooltip-open ${showOnLeft ? "tooltip-left" : "tooltip-right"} pointer-events-none z-[200]`}
            style={{
              position: "fixed",
              left: anchor.left,
              top: anchor.top,
              width: anchor.width,
              height: anchor.height,
            }}
          >
            <div
              className="tooltip-content"
              id={tooltipId}
              role="tooltip"
              style={{
                maxWidth: `min(20rem, ${Math.max(0, availableWidth)}px)`,
                overflowWrap: "anywhere",
                whiteSpace: "pre-wrap",
              }}
            >
              {text}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
