import { useEffect, useRef, useState } from 'react';

const CURSOR_DEFAULT_SRC = '/cursors/cursor-default.webp';
const CURSOR_HOVER_SRC = '/cursors/cursor-pointer.webp';
const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, label, [data-cursor], .ui-overlay, .scroll-hint, .instructions';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!finePointer) return;

    document.documentElement.classList.add('has-custom-cursor');

    const handleMove = (event) => {
      const element = cursorRef.current;
      if (!element) return;
      element.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
    };

    const handleOver = (event) => {
      const target = event.target;
      const interactive = target instanceof Element ? target.closest(INTERACTIVE_SELECTOR) : null;
      setHovered(Boolean(interactive));
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('pointerover', handleOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('pointerover', handleOver);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{ backgroundImage: `url(${hovered ? CURSOR_HOVER_SRC : CURSOR_DEFAULT_SRC})` }}
    />
  );
}
