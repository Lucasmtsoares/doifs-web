import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FileText, Calendar, MapPin } from "lucide-react"; // Sugestão: use lucide-react para ícones

export function CardPub({ pubss }) {
  const date = format(new Date(pubss.date), 'dd/MM/yyyy', { locale: ptBR });

  return (
    <div className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-5 mb-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-200 gap-4">
      
      <div className="flex items-start gap-4">
        {/* Ícone de Documento Estilizado */}
        <div className="flex-shrink-0 w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
          <FileText size={24} />
        </div>

        <div className="space-y-1">
          <a 
            href={pubss.url} 
            className="text-base font-semibold text-slate-900 hover:text-emerald-700 hover:underline decoration-2 underline-offset-4 transition-colors block"
          >
            {pubss.ordinance}
          </a>
          
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-slate-700 flex items-center gap-1">
              <span className="text-emerald-600 font-bold">{pubss.acronym}</span>
              <span className="text-slate-300">•</span>
              {pubss.institute}
            </p>
          </div>
        </div>
      </div>

      {/* Badges e Data */}
      <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 shrink-0">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
          {pubss.type}
        </span>
        
        <div className="flex items-center text-xs text-slate-500 gap-1.5 px-1">
          <Calendar size={14} />
          <span dateTime={pubss.date}>{date}</span>
        </div>
      </div>

    </div>
  );
}