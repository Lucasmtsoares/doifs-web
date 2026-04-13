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
                    O DOIFS nasceu para ser a maior referência em observação e transparência da Rede Federal. Utilizamos inteligência de dados e análise preditiva para transformar informações governamentais em conhecimento acessível. Um ecossistema tecnológico moderno, gratuito e aberto a todos.
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

/*
A ideia do DOIFS nasceu em 2023 como um simples projeto de pesquisa de iniciação cientifica PIBITI, no laboratorio de engenharia de dados do IFAL - Campus Arapiraca. Na epoca foi identificada uma lacuna quanto a disponibilização de atos de pessoal da Rede Federal. Para o acesso a atos de nomeação, por exemplo era preciso a busca atraves do Diarío Oficial da União (DOU). Todavia, a busca era "solta, imprecisa e demorada. Mesmo sendo uma das maiores plataformas que colaboram para a transparencia de informação, O DOU era dificultuoso e limitado na disponibilização de filtros eficientes para busca de registros especificos. E com isso, percebeu-se a necessidade de uma camada que trouxesse essas informações pertinentes a Rede das IFs para o publico geral e interessado. Inicialemente, foram trabalhadas os atos de nomeação e exoneração do escopo dos atos de pessoal

*/