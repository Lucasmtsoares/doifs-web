import { PageLayout } from "../_components/pageLayout";

export default function SobrePage() {
  return (
    <PageLayout 
      title="Sobre o DOIFS" 
      subtitle="Nossa missão é centralizar e facilitar o acesso aos registros oficiais dos Institutos Federais."
    >
      {/* Reduzi o padding de 10 para 6 no mobile (p-6 md:p-10) */}
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-8 md:gap-10">
        
        {/* Bloco de Missão: 1 coluna no mobile, grid com divisor no desktop */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr,2px,1fr] gap-8 md:gap-10 items-start md:items-center">
            <div className="flex flex-col gap-3">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-emerald-500 rounded-full md:hidden" />
                    Nossa Missão
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    O DOIFS nasceu da necessidade de democratizar o acesso aos atos de pessoal. 
                    Trabalhamos para converter dados complexos em informações acessíveis para servidores e cidadãos.
                </p>
            </div>

            {/* Divisor vertical: Escondido no mobile, visível apenas em md+ */}
            <div className="h-full bg-slate-100 hidden md:block" /> 

            <div className="flex flex-col gap-3">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-blue-500 rounded-full md:hidden" />
                    Visão do Futuro
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    Almejamos ser a principal ferramenta de transparência para a Rede Federal, 
                    utilizando tecnologia de ponta para análise preditiva de dados governamentais.
                </p>
            </div>
        </div>

        {/* Texto Longo: Ajuste de padding-top e borda */}
        <div className="flex flex-col gap-6 pt-8 md:pt-10 border-t border-slate-100">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">Nossa História e Valores</h2>
          <div className="flex flex-col gap-4 text-slate-500 leading-relaxed text-sm md:text-base">
            <p>
              Desde 2018, temos catalogado milhares de registros, garantindo que a memória administrativa 
              dos Institutos Federais seja preservada e facilmente consultável por qualquer interessado.
            </p>
            <p>
              Acreditamos na transparência ativa como pilar fundamental da administração pública moderna, 
              focando na integridade e precisão de cada dado processado pela nossa plataforma.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}