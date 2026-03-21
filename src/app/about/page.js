import { PageLayout } from "../_components/pageLayout";

export default function SobrePage() {
  return (
    <PageLayout 
      title="Sobre o DOIFS" 
      subtitle="Nossa missão é centralizar e facilitar o acesso aos registros oficiais dos Institutos Federais."
    >
      <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-10">
        
        {/* Bloco de Missão com destaque Emerald */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr,2px,1fr] gap-10 items-center">
            <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold text-slate-900">Nossa Missão</h2>
                <p className="text-slate-600 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </div>
            <div className="h-full bg-slate-100 md:block hidden" /> {/* Divisor vertical */}
            <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold text-slate-900">Visão do Futuro</h2>
                <p className="text-slate-600 leading-relaxed">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
            </div>
        </div>

        {/* Texto Longo */}
        <div className="flex flex-col gap-6 pt-10 border-t border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900">Nossa História e Valores</h2>
          <p className="text-slate-500 leading-relaxed">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
          <p className="text-slate-500 leading-relaxed">
            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
          </p>
        </div>
      </div>
    </PageLayout>
  );
}