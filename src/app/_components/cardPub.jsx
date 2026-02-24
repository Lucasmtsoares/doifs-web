import { FileText, Calendar, Tag, ExternalLink } from "lucide-react";

export function CardPub({ pubss }) {
  // O tratamento de data foi removido conforme solicitado, 
  // utilizando pubss.date diretamente.
  
  return (
    <div className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-6 mb-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-400 transition-all duration-300 gap-6">
      
      <div className="flex items-start gap-5">
        {/* Ícone de Documento - Aumentado para melhor visibilidade */}
        <div className="flex-shrink-0 w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
          <FileText size={32} />
        </div>

        <div className="space-y-3">
          <div>
            {/* Título/Ordinance - Aumentado para text-lg */}
            <a 
              href={pubss.url} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold text-slate-900 hover:text-emerald-700 hover:underline decoration-2 underline-offset-4 transition-colors flex items-center gap-2 leading-snug"
            >
              {pubss.ordinance}
              <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            
            {/* Instituto e Acrônimo - Aumentado para text-base */}
            <p className="text-base font-medium text-slate-600 flex items-center gap-2 mt-2">
              <span className="text-emerald-600 font-extrabold tracking-wide">{pubss.acronym}</span>
              <span className="text-slate-300 text-xl">•</span>
              {pubss.institute}
            </p>
          </div>

          {/* Tags - Tamanho e espaçamento ajustados para facilitar a leitura */}
          {pubss.tags && pubss.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {pubss.tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200 group-hover:border-emerald-200 group-hover:bg-white transition-colors"
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Badges Laterais e Data - Layout mais robusto */}
      <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-3 shrink-0 min-w-[140px]">
        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-sm">
          {pubss.type}
        </span>
        
        <div className="flex items-center text-sm font-medium text-slate-500 gap-2 px-1">
          <Calendar size={18} className="text-slate-400" />
          <span>{pubss.date}</span>
        </div>
      </div>

    </div>
  );
}