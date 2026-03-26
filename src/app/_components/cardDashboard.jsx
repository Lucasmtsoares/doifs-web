'use client'

import axios from "axios";
import { TrendingUp, TrendingDown, Sigma, Newspaper, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export function CardDashboard({ context }) {
    const [data, setData] = useState(null);
    const [mounted, setMounted] = useState(false);

    const historicKeyMap = {
        'nomeacoes': 'total_nomeação',
        'exoneracoes': 'total_exoneração',
        'designacoes': 'total_designação',
        'dispensas': 'total_dispensa',
        'aposentadorias': 'total_aposentadoria',
        'demissoes': 'total_demissão',
        'substituicoes': 'total_substituição',
        'afastamentos': 'total_afastamento',
        'pensoes': 'total_pensão'
    };

    const normalize = (str) => {
        if (!str) return "";
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    useEffect(() => {
        setMounted(true);
        const getTotals = async () => {
            try {
                const response = await axios.get('/api/dashboard/totals');
                setData(response.data);
            } catch (error) {
                console.error("Erro ao buscar totais:", error);
            }
        };
        getTotals();
    }, []);

    if (!mounted || !data || !context) {
        return (
            <div className="mt-16 w-full">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <li key={i} className="h-[180px] bg-white rounded-3xl border border-slate-100 animate-pulse" />
                    ))}
                </ul>
            </div>
        );
    }

    const { types_counts, latest_pubs, count_by_type_all_time } = data;

    const filteredPubs = (latest_pubs || []).filter((pub) => {
        const typeNorm = normalize(pub.type);
        const labelANorm = normalize(context.serieA.label);
        const labelBNorm = normalize(context.serieB.label);
        return labelANorm.startsWith(typeNorm.substring(0, 5)) || 
               labelBNorm.startsWith(typeNorm.substring(0, 5));
    });

    const latest = filteredPubs.length > 0 ? filteredPubs[0] : null;
    const keyA_historic = historicKeyMap[context.serieA.key];
    const keyB_historic = historicKeyMap[context.serieB.key];
    const total_geral = (count_by_type_all_time[keyA_historic] || 0) + (count_by_type_all_time[keyB_historic] || 0);

    const cards = [
        {
            title: context.serieA.label,
            count: types_counts[context.serieA.key] || 0,
            icon: TrendingUp,
            description: `Acumulado no mês`,
            color: 'text-emerald-600',
            bgIcon: 'bg-emerald-50',
            borderIcon: 'border-emerald-100'
        },
        {
            title: context.serieB.label,
            count: types_counts[context.serieB.key] || 0,
            icon: TrendingDown,
            description: `Acumulado no mês`,
            color: 'text-rose-600',
            bgIcon: 'bg-rose-50',
            borderIcon: 'border-rose-100'
        },
        {
            title: 'Ato mais recente',
            count: latest ? latest.acronym : '---',
            icon: Newspaper,
            description: latest ? `Realizou ${latest.type}` : 'Sem registros',
            date: latest ? format(parseISO(latest.date), "dd/MM/yy", { locale: ptBR }) : '',
            color: 'text-blue-600',
            bgIcon: 'bg-blue-50',
            borderIcon: 'border-blue-100'
        },
        {
            title: 'Histórico Total',
            count: (total_geral.toLocaleString('pt-BR')),
            icon: Sigma,
            description: 'Registros desde 2018',
            color: 'text-amber-600',
            bgIcon: 'bg-amber-50',
            borderIcon: 'border-amber-100'
        }
    ];

    return (
        <div className="mt-16 w-full">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <li key={index} className="list-none">
                            <div className="h-full rounded-3xl shadow-sm border border-slate-100 bg-white overflow-hidden transition-all hover:shadow-md hover:-translate-y-1">
                                {/* Header do Card - Estilo Padronizado */}
                                <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
                                    <p className="text-slate-500 font-black text-[10px] uppercase tracking-widest">
                                        {card.title}
                                    </p>
                                    <div className={`p-1.5 rounded-lg border ${card.bgIcon} ${card.borderIcon} ${card.color}`}>
                                        <Icon size={16} strokeWidth={2.5} />
                                    </div>
                                </div>
                                
                                {/* Conteúdo do Card */}
                                <div className="p-6">
                                    <div className="flex items-baseline gap-2">
                                        <h4 className="font-black text-3xl text-slate-800 tracking-tight">
                                            {card.count}
                                        </h4>
                                        <ArrowUpRight className="h-4 w-4 text-emerald-500/50" />
                                    </div>
                                    
                                    <div className="mt-4 flex flex-col gap-1">
                                        <p className="text-[12px] font-medium text-slate-400 leading-tight">
                                            {card.description}
                                        </p>
                                        {card.date && (
                                            <span className="text-[11px] font-bold text-slate-500 bg-slate-100 w-fit px-2 py-0.5 rounded-md mt-1">
                                                {card.date}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}