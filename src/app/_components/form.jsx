'use client'

import axios from "axios";
import { useState, useEffect } from "react";
import { FiSearch, FiFilter, FiXCircle, FiChevronUp } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";

export function Form({ alwaysShowFilters = false }) {
    const [types, setTypes] = useState([])
    const [institutes, setInstitutes] = useState([])
    const [years, setYears] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/filters')
                const data = response.data
                setTypes(data.types || [])
                setInstitutes(data.institutes || [])
                setYears(data.years || [])
            } catch (error) {
                console.error("Erro ao buscar dados para filtros", error.message)
            }
        }
        fetchData()
    }, [])

    const initialFormState = { name: '', acronym: '', type: '', year: '' };
    const [formData, setFormData] = useState(initialFormState);
    const [showFilters, setShowFilters] = useState(alwaysShowFilters);

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const params = Object.fromEntries(searchParams.entries());
        setFormData({
            name: params.name || '',
            acronym: params.acronym || '',
            type: params.type || '',
            year: params.year || '',
        });
        if (params.acronym || params.type || params.year) {
            setShowFilters(true);
        }
    }, [searchParams]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleClearFilters = () => setFormData(initialFormState);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || formData.name.trim() === "") {
            setError("Por favor, insira o nome do servidor para realizar a busca.")
            return
        }
        setError("")

        const filledData = {};
        for (const key in formData) {
            if (formData[key] && formData[key] !== "" && formData[key] !== "null") {
                filledData[key] = formData[key];
            }
        }
        const query = new URLSearchParams(filledData).toString();
        router.push(`/search?${query}`);
    };

    return (
        <div className="w-full max-w-5xl mx-auto px-2 sm:px-4">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full p-3 sm:p-5 bg-white rounded-[24px] sm:rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 transition-all"
            >
                {/* Linha Principal de Busca */}
                <div className="flex flex-col md:flex-row items-center gap-3">
                    <div className="relative flex-1 w-full group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                            <FiSearch size={20} />
                        </div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nome do servidor..."
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-slate-200 rounded-xl sm:rounded-xl pl-12 pr-4 py-3.5 sm:py-4 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-slate-700 bg-slate-50/50 sm:bg-white text-base sm:text-lg"
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <button
                            type="submit"
                            className="flex-[3] md:flex-none bg-[#00a36c] hover:bg-[#008f5d] text-white font-bold px-8 py-3.5 sm:py-4 rounded-xl transition-all active:scale-95 text-base sm:text-lg shadow-lg shadow-emerald-200"
                        >
                            Buscar
                        </button>

                        <button
                            type="button"
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex-1 md:flex-none p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-center ${
                                showFilters
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-600 shadow-inner'
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-emerald-300'
                            }`}
                        >
                            <FiFilter size={22} />
                        </button>
                    </div>
                </div>

                {/* Seção de Filtros Expansível */}
                <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                        showFilters ? 'max-h-[800px] opacity-100 mt-4 sm:mt-6' : 'max-h-0 opacity-0 invisible'
                    }`}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Tipo de Ato</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="bg-white border border-slate-200 rounded-xl px-3 py-3 text-sm text-slate-600 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 appearance-none"
                            >
                                <option value="">Todos os Atos</option>
                                {types.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Instituto</label>
                            <select
                                name="acronym"
                                value={formData.acronym}
                                onChange={handleChange}
                                className="bg-white border border-slate-200 rounded-xl px-3 py-3 text-sm text-slate-600 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 appearance-none"
                            >
                                <option value="">Todos Institutos</option>
                                {institutes.map((i) => <option key={i} value={i}>{i}</option>)}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5 sm:col-span-2 md:col-span-1">
                            <label className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Ano</label>
                            <select
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                className="bg-white border border-slate-200 rounded-xl px-3 py-3 text-sm text-slate-600 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 appearance-none"
                            >
                                <option value="">Qualquer ano</option>
                                {years.map((y) => <option key={y} value={y}>{y}</option>)}
                            </select>
                        </div>

                        <div className="sm:col-span-2 md:col-span-3 flex flex-col sm:flex-row items-center justify-between mt-2 pt-4 border-t border-slate-200/60 gap-4">
                            <button
                                type="button"
                                onClick={() => setShowFilters(false)}
                                className="flex items-center justify-center gap-2 w-full sm:w-auto text-[11px] font-black text-slate-400 hover:text-emerald-600 transition-all uppercase tracking-widest group p-2"
                            >
                                <FiChevronUp size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                                Recolher Filtros
                            </button>

                            <button
                                type="button"
                                onClick={handleClearFilters}
                                className="flex items-center justify-center gap-1.5 w-full sm:w-auto text-[11px] font-bold text-slate-400 hover:text-rose-500 transition-colors uppercase p-2"
                            >
                                <FiXCircle size={16} />
                                Limpar Filtros
                            </button>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="mt-4 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-3 text-rose-600 animate-in fade-in slide-in-from-top-2 duration-300">
                        <FiXCircle size={18} className="flex-shrink-0" />
                        <p className="text-xs sm:text-sm font-semibold">{error}</p>
                    </div>
                )}
            </form>
        </div>
    );
}