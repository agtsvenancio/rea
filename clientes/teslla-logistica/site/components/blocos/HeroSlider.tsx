'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeroSlider({ slides }: { slides: { imagem: string; href?: string; alt?: string }[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);
  return (
    <section className="relative overflow-hidden bg-dark" aria-roledescription="carrossel">
      <div className="flex transition-transform duration-700 ease-teslla" style={{ transform: `translateX(-${i * 100}%)` }}>
        {slides.map((s, n) => {
          const img = <img src={s.imagem} alt={s.alt ?? ''} className="block h-auto w-full" fetchPriority={n === 0 ? 'high' : 'auto'} loading={n === 0 ? 'eager' : 'lazy'} />;
          return <div key={n} className="w-full shrink-0" aria-hidden={n !== i}>{s.href ? <Link href={s.href}>{img}</Link> : img}</div>;
        })}
      </div>
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 md:bottom-auto md:left-auto md:right-6 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:flex-col">
          {slides.map((_, n) => (
            <button key={n} onClick={() => setI(n)} aria-label={`Slide ${n + 1}`} className={`h-3 w-3 rounded-full border-2 border-white transition ${n === i ? 'bg-white' : 'bg-transparent'}`} />
          ))}
        </div>
      )}
    </section>
  );
}
