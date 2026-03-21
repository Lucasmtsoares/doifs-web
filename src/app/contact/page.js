import { PageLayout } from "../_components/pageLayout";
import { Mail, Phone, MapPin, Send } from "lucide-react"; // Usando lucide para ícones coerentes

export default function ContatoPage() {
  return (
    <PageLayout 
      title="Contato" 
      subtitle="Dúvidas, sugestões ou interesse em parcerias? Entre em contato conosco."
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr,1.5fr] gap-8">
        
        {/* Coluna de Informações (Esquerda) */}
        <div className="flex flex-col gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-6 hover:border-emerald-200 transition-colors">
            <h3 className="text-xl font-bold text-slate-900">Informações de Contato</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
            </p>
            <div className="flex flex-col gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-3">
                    <Mail size={16} className="text-emerald-500" />
                    <span>contato@doifs.search</span>
                </div>
                <div className="flex items-center gap-3">
                    <Phone size={16} className="text-emerald-500" />
                    <span>+55 (86) 9999-9999</span>
                </div>
                <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-emerald-500" />
                    <span>IFPI, Teresina - PI, Brasil</span>
                </div>
            </div>
          </div>
        </div>

        {/* Coluna do Formulário (Direita) */}
        <form className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-6">
          <h3 className="text-xl font-bold text-slate-900">Envie uma mensagem</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Seu nome" 
              className="bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-700 focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
            />
            <input 
              type="email" 
              placeholder="Seu e-mail" 
              className="bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-700 focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
            />
          </div>

          <input 
              type="text" 
              placeholder="Assunto" 
              className="bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-700 focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
            />

          <textarea 
            placeholder="Sua mensagem..." 
            rows={5} 
            className="bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-700 focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none resize-none"
          />

          <button 
            type="submit" 
            className="flex items-center justify-center gap-2 bg-[#00a36c] hover:bg-[#008f5d] text-white font-bold px-10 py-3.5 rounded-xl transition-all active:scale-95 text-lg w-full md:w-auto md:self-end"
          >
            <span>Enviar Mensagem</span>
            <Send size={18} />
          </button>
        </form>
      </div>
    </PageLayout>
  );
}