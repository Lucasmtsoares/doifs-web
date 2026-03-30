import { PageLayout } from "../_components/pageLayout";
import { Search, BrainCircuit, BellRing, DatabaseZap } from "lucide-react";

const servicos = [
  {
    icon: Search,
    title: "Busca Avançada",
    description: "Pesquisa centralizada e inteligente de atos de pessoal nos Institutos Federais."
  },
  {
    icon: BrainCircuit,
    title: "Análise de Dados",
    description: "Insights e relatórios sobre tendências de registros de pessoal."
  },
  {
    icon: DatabaseZap,
    title: "Integração API",
    description: "Acesse nossa base de dados diretamente através de uma API robusta e rápida."
  },
  {
    icon: BellRing,
    title: "Monitoramento Ativo",
    description: "Receba alertas sobre novas publicações de seu interesse em tempo real."
  }
];

export default function ServicosPage() {
  return (
    <PageLayout 
      title="Nossos Serviços" 
      subtitle="Soluções inteligentes para transparência e eficiência na gestão pública."
    >
      {/* Grid: 1 coluna no mobile, 2 colunas no md (desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-2 sm:px-0">
        {servicos.map((servico, index) => {
          const IconComponent = servico.icon;
          return (
            <div 
              key={index} 
              className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start gap-4 md:gap-6 group hover:border-emerald-200 transition-all hover:shadow-md"
            >
              {/* Ícone: Ajustado para ser menor no mobile */}
              <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                <IconComponent size={24} className="md:size-[28px]" />
              </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {servico.title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                  {servico.description}
                  <span className="block mt-2 opacity-60 text-[12px] italic">
                    Eficiência garantida através de processos automatizados e curadoria de dados.
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </PageLayout>
  );
}