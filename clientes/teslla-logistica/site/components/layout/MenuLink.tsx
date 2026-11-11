'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Link do menu principal com sublinhado vermelho no item ativo.
export default function MenuLink({ href, children }: { href: string; children: React.ReactNode }) {
  const atual = usePathname() || '/';
  const ativo = href === '/' ? atual === '/' : atual.startsWith(href);
  return (
    <Link href={href} className={`relative block py-[30px] font-nav text-base font-medium capitalize text-dark transition-colors hover:text-primary after:absolute after:bottom-[26px] after:left-0 after:h-0.5 after:bg-primary after:transition-all ${ativo ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`}>
      {children}
    </Link>
  );
}
