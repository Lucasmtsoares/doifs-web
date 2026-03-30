'use client'

import { PageLayout } from "../_components/pageLayout";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContatoPage() {
  return (
    <PageLayout 
      title="Contato" 
      subtitle="Dúvidas, sugestões ou interesse em parcerias? Entre em contato conosco."
    >
      {/* Grid: 1 coluna no mobile, Layout proporcional no desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] gap-6 md:gap-8 px-2 sm:px-0">
        
        {/* Coluna de Informações (Esquerda) */}
        <div className="flex flex-col gap-6 md:gap-8 order-2 lg:order-1">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-6 hover:border-emerald-200 transition-all">
            <h3 className="text-xl font-bold text-slate-900">Informações de Contato</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
                Nossa equipe está disponível para auxiliar com dúvidas técnicas sobre a plataforma ou solicitações de parcerias institucionais.
            </p>
            
            <div className="flex flex-col gap-5 text-sm text-slate-600">
                <div className="flex items-start gap-4 p-3 rounded-xl bg-slate-50/50 border border-transparent hover:border-emerald-100 transition-colors">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                        <Mail size={18} className="text-emerald-500" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">E-mail</span>
                        <span className="font-medium">contato@doifs.search</span>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-xl bg-slate-50/50 border border-transparent hover:border-emerald-100 transition-colors">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                        <Phone size={18} className="text-emerald-500" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Telefone</span>
                        <span className="font-medium">+55 (86) 9999-9999</span>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-xl bg-slate-50/50 border border-transparent hover:border-emerald-100 transition-colors">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                        <MapPin size={18} className="text-emerald-500" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Localização</span>
                        <span className="font-medium">IFPI, Teresina - PI, Brasil</span>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Coluna do Formulário (Direita) */}
        <form className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-6 order-1 lg:order-2">
          <h3 className="text-xl font-bold text-slate-900">Envie uma mensagem</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Nome Completo</label>
                <input 
                  type="text" 
                  placeholder="Ex: João Silva" 
                  className="bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-700 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
                />
            </div>
            <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">E-mail Institucional</label>
                <input 
                  type="email" 
                  placeholder="seu@email.com" 
                  className="bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-700 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
                />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Assunto</label>
              <input 
                  type="text" 
                  placeholder="Como podemos ajudar?" 
                  className="bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-700 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
                />
          </div>

          <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Mensagem</label>
              <textarea 
                placeholder="Escreva sua mensagem detalhadamente..." 
                rows={5} 
                className="bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-700 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none resize-none"
              />
          </div>

          <button 
            type="submit" 
            className="flex items-center justify-center gap-3 bg-[#00a36c] hover:bg-[#008f5d] text-white font-bold px-10 py-4 rounded-xl transition-all active:scale-95 text-lg w-full lg:w-auto lg:self-end shadow-lg shadow-emerald-100"
          >
            <span>Enviar Mensagem</span>
            <Send size={18} />
          </button>
        </form>
      </div>
    </PageLayout>
  );
}