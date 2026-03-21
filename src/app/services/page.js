import { PageLayout } from "../_components/pageLayout";
import { Search, BrainCircuit, BellRing, DatabaseZap } from "lucide-react"; // Usando lucide para ícones coerentes

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {servicos.map((servico, index) => {
          const IconComponent = servico.icon;
          return (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-6 group hover:border-emerald-200 transition-colors"
            >
              <div className="flex-shrink-0 w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                <IconComponent size={28} />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-slate-900">{servico.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {servico.description}
                  {/* Texto Loren Ipsun adicional como solicitado */}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </PageLayout>
  );
}