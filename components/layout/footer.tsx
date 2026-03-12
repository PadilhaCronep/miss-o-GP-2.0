export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] py-12 mt-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#FFD600] rounded-sm flex items-center justify-center" aria-hidden="true">
            <span className="text-black font-display font-bold text-sm leading-none">M</span>
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-white">
            Missão<span className="text-white/50">Lab</span>
          </span>
        </div>
        
        <div className="text-center md:text-right">
          <p className="text-zinc-500 text-sm font-mono">
            Construindo a infraestrutura cívica do futuro.
          </p>
          <p className="text-zinc-600 text-xs mt-2">
            &copy; {new Date().getFullYear()} Equipe de Tecnologia Ludymilla Dias.
          </p>
        </div>
      </div>
    </footer>
  );
}
