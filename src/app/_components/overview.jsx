'use client'

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell
} from 'recharts';
import { Info, BarChart3, TrendingUp, Filter } from 'lucide-react'; // Ícones coerentes

// --- Sub-componente: Círculo de Progresso Normalizado (Donut Emerald) - CORRIGIDO ---
const MiniProgress = ({ percent }) => {
  const data = [
    { value: percent }, 
    { value: 100 - percent }
  ];
  
  // Cores Normalizadas: Emerald 500 e Slate 100
  const COLORS = ['#10b981', '#f1f5f9']; 

  return (
    // Container ligeiramente maior para dar respiro visual
    <div className="flex flex-col items-center justify-center relative w-[64px] h-[64px]">
      <PieChart width={64} height={64}>
        <Pie 
          data={data} 
          // CORREÇÃO: Reduzi ligeiramente os raios para dar mais espaço à porcentagem central
          innerRadius={16} // Era 18
          outerRadius={24} // Era 26
          dataKey="value" 
          stroke="none"
          startAngle={90}
          endAngle={-270}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
      
      {/* CORREÇÃO DO CÁLCULO: REVERTIDO para usar .toFixed(1) conforme a lógica original,
          garantindo que taxas baixas (ex: 0.3%) não sejam exibidas como 0% */}
      <span className="absolute text-[10px] font-bold text-slate-700 tracking-tight flex items-baseline">
        {percent.toFixed(1)}</span><span className="text-slate-400 text-[8px]">%</span>
    </div>
  );
};

// --- Sub-componente: Stat Card Normalizado ---
const StatCard = ({ title, value, totalGeneral }) => {
  // Cálculo da taxa correspondente ao total geral - Mantido a lógica original
  const percentage = totalGeneral > 0 ? (value / totalGeneral) * 100 : 0;

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-row items-center justify-between h-[120px] hover:shadow-md hover:border-emerald-100 transition-all group overflow-hidden">
      <div className="flex-1 flex flex-col justify-between h-full">
        <div>
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-1 truncate">
            {title}
          </p>
          <h3 className="text-3xl font-medium tracking-tighter text-slate-800">
            {value?.toLocaleString() || 0}
          </h3>
        </div>
        <p className="text-[10px] text-slate-400 italic">Participação histórica</p>
      </div>
      
      {/* Círculo de progresso normalizado */}
      <div className="ml-3 group-hover:scale-105 transition-transform flex items-center justify-center">
        <MiniProgress percent={percentage} />
      </div>
    </div>
  );
};

export function Overview() {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(2024);

  useEffect(() => {
    axios.get("api/dashboard/totals")
      .then((res) => {
        setApiData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar dados:", err);
        setLoading(false);
      });
  }, []);

  const chartData = useMemo(() => {
    if (!apiData?.monthly_totals) return [];
    return apiData.monthly_totals.filter(item => item.year === selectedYear);
  }, [apiData, selectedYear]);

  // Estado de Carregamento Normalizado
  if (loading) return (
    <div className="p-24 w-full flex flex-col items-center justify-center animate-in fade-in duration-500">
        <BarChart3 className="w-12 h-12 text-emerald-400 animate-pulse mb-4" />
        <p className="text-slate-500 font-medium">Carregando indicadores...</p>
    </div>
  );

  const counts = apiData?.count_by_type_all_time || {};
  const totalGeral = apiData?.total_count || 0;
  
  const categories = [
    { title: "Nomeações", val: counts.total_nomeação },
    { title: "Exonerações", val: counts.total_exoneração },
    { title: "Afastamentos", val: counts.total_afastamento },
    { title: "Aposentadorias", val: counts.total_aposentadoria },
    { title: "Pensões", val: counts.total_pensão },
    { title: "Demissões", val: counts.total_demissão },
    { title: "Dispensas", val: counts.total_dispensa },
    { title: "Designações", val: counts.total_designação },
    { title: "Substituições", val: counts.total_substituição },
  ];

  return (
    <div className="w-full bg-slate-50/50 p-4 sm:p-8 animate-in slide-in-from-bottom-3 duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabeçalho Normalizado */}
        <div className="flex items-center gap-3 mb-10 border-b border-slate-100 pb-5">
            <TrendingUp size={24} className="text-emerald-600" />
            <h1 className="text-2xl font-black tracking-tighter text-slate-900">
                Visão Geral dos Indicadores
            </h1>
            <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-100 ml-auto flex items-center gap-1.5">
                <Info size={14} />
                Volume histórico: {totalGeral.toLocaleString()} registros
            </span>
        </div>

        {/* Grid de Cards Categorizados Normalizado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-5">
          {categories.map((item, idx) => (
            <StatCard 
              key={idx} 
              title={item.title} 
              value={item.val} 
              totalGeneral={totalGeral}
            />
          ))}

          {/* Card Especial para o Total Geral (Normalizado Emerald 600) */}
          <div className="bg-emerald-600 p-6 rounded-2xl shadow-lg shadow-emerald-200 flex flex-col justify-between h-[120px] transition-transform hover:scale-[1.02]">
            <p className="text-emerald-50 text-[11px] font-bold uppercase tracking-wider">Acumulado Geral</p>
            <h3 className="text-4xl font-black tracking-tighter text-white">
              {totalGeral.toLocaleString()}
            </h3>
            <p className="text-emerald-100 text-[11px] font-medium italic">Atos desde 2018</p>
          </div>
        </div>

        {/* Banner Informativo Refinado */}
        <div className="flex items-start md:items-center gap-3 mb-10 p-4 bg-white rounded-xl border border-slate-100">
            <Info size={18} className="text-emerald-500 flex-shrink-0 mt-0.5 md:mt-0" />
            <p className="text-[12px] text-slate-500 leading-relaxed max-w-5xl">
                A porcentagem exibida no centro de cada card representa a participação proporcional daquele tipo de ato de pessoal no volume total histórico de registros acumulados na plataforma.
            </p>
        </div>

        {/* Gráfico de Evolução Normalizado (Cores Emerald) */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-10 gap-4">
            <div className="flex items-center gap-3">
                <BarChart3 size={20} className="text-emerald-600" />
                <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Evolução Mensal de Publicações</h2>
            </div>
            
            {/* Select Padronizado com os Filtros da Home */}
            <div className="relative group">
                <Filter size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500" />
                <select 
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm font-semibold text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all appearance-none"
                >
                {[2026, 2025, 2024, 2023, 2022, 2019, 2018].map(y => (
                    <option key={y} value={y}>{y}</option>
                ))}
                </select>
            </div>
          </div>

          <div className="h-[350px] w-full pr-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  {/* Gradiente Emerald Normalizado */}
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13, fontWeight: 'medium'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13, fontWeight: 'medium'}} />
                {/* Tooltip Normalizado (padrão cinza escuro) */}
                <Tooltip 
                    contentStyle={{borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', padding: '12px'}}
                    labelStyle={{fontSize: '14px', fontWeight: 'bold', color: '#1f2937', marginBottom: '4px'}}
                    itemStyle={{fontSize: '13px', color: '#64748b'}}
                />
                <Area type="monotone" dataKey="total" stroke="#10b981" strokeWidth={4} fill="url(#colorTotal)" dot={false} activeDot={{r: 6, strokeWidth: 3, stroke: '#fff'}} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}