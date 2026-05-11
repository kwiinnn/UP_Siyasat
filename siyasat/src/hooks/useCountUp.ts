import { useEffect, useRef, useState } from 'react';

export function useCountUp(
  target: number,
  duration: number = 2000,
  startOnMount: boolean = true
) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!startOnMount) return;

    // Use IntersectionObserver so it only animates when visible on screen
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started, startOnMount]);

  useEffect(() => {
    if (!started) return;

    let startTime: number | null = null;
    const startValue = 0;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease out cubic — slows down at the end like a real counter
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * (target - startValue) + startValue));

      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };

    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
}