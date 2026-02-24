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
import { Info } from 'lucide-react';

// --- Sub-componente: Círculo de Progresso (Estilo Donut) ---
const MiniProgress = ({ percent }) => {
  const data = [
    { value: percent }, 
    { value: 100 - percent }
  ];
  
  const COLORS = ['#0ea5e9', '#f1f5f9']; // Azul Sky 500 e fundo cinza claro

  return (
    <div className="flex flex-col items-center justify-center">
      <PieChart width={50} height={50}>
        <Pie 
          data={data} 
          innerRadius={15} 
          outerRadius={22} 
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
      <span className="text-[10px] font-bold text-slate-600 -mt-1 italic">
        {percent.toFixed(1)}%
      </span>
    </div>
  );
};

// --- Sub-componente: Stat Card Atualizado ---
const StatCard = ({ title, value, totalGeneral }) => {
  // Cálculo da taxa correspondente ao total geral
  const percentage = totalGeneral > 0 ? (value / totalGeneral) * 100 : 0;

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-row items-center justify-between h-[110px] hover:shadow-md transition-all">
      <div className="flex-1">
        <p className="text-slate-400 text-[10px] uppercase tracking-wider mb-1">
          {title}
        </p>
        {/* Removido o font-bold/font-black para um visual mais amigável */}
        <h3 className="text-2xl font-medium text-slate-700">
          {value?.toLocaleString() || 0}
        </h3>
        <p className="text-[9px] text-slate-400 mt-1 italic">Incidência no total</p>
      </div>
      
      {/* Círculo de progresso com a taxa */}
      <div className="ml-2">
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

  if (loading) return <div className="p-20 text-center text-slate-500">Carregando indicadores...</div>;

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
    <div className="w-full bg-slate-50/50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Grid de Cards Categorizados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
          {categories.map((item, idx) => (
            <StatCard 
              key={idx} 
              title={item.title} 
              value={item.val} 
              totalGeneral={totalGeral}
            />
          ))}

          {/* Card Especial para o Total Geral (sem círculo de progresso 100%) */}
          <div className="bg-blue-600 p-4 rounded-xl shadow-lg flex flex-col justify-center h-[110px]">
            <p className="text-blue-100 text-[10px] uppercase tracking-wider">Acumulado Geral</p>
            <h3 className="text-3xl font-light text-white mt-1">
              {totalGeral.toLocaleString()}
            </h3>
            <p className="text-blue-200 text-[10px] mt-1 italic font-medium">Atos desde 2018</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-8 px-2">
            <Info size={14} className="text-blue-500" />
            <p className="text-[11px] text-slate-500">
                A porcentagem exibida em cada card representa a participação daquele ato no volume total histórico de {totalGeral.toLocaleString()} registros.
            </p>
        </div>

        {/* Gráfico de Evolução (Mantido) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Evolução Mensal</h2>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600"
            >
              {[2026, 2025, 2024, 2023, 2022, 2019, 2018].map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={3} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}