'use client'

import { Header } from "../_components/header"; // Ajuste o caminho conforme necessário

export function PageLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-700">
      <Header />
      
      <main className="flex flex-col items-center pt-24 pb-16 px-4">
        {/* Título da Página Unificado */}
        <div className="text-center mb-16 w-full max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900">
            {title} <span className="text-[#00a36c]">.</span>
          </h1>
          {subtitle && (
            <p className="mt-6 text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Área de Conteúdo Alinhada ao Form/Resultados (max-w-5xl) */}
        <div className="w-full max-w-5xl mx-auto">
          {children}
        </div>
      </main>

      {/* Fundo decorativo sutil (opcional, igual à Home) */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-emerald-50/40 blur-[120px]" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-50/40 blur-[120px]" />
      </div>
    </div>
  );
}