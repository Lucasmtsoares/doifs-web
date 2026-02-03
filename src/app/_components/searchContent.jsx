// app/search/_components/search-content.js
'use client'

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { CardPub } from "@/app/_components/cardPub";
import { Loader2, SearchX, LayoutGrid } from "lucide-react"; // Usando lucide para manter o padrão

export function SearchContent() {
    const [publicationsData, setPublications] = useState({ publications: [], count: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const searchParams = useSearchParams();

    useEffect(() => {
        const params = Object.fromEntries(searchParams.entries());
        
        if (Object.keys(params).length === 0) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        const query = new URLSearchParams(params);

        axios
            .get(`/api/search?${query.toString()}`)
            .then((res) => setPublications(res.data))
            .catch((error) => {
                console.error("Erro ao realizar consulta.", error);
                setPublications({ publications: [], count: 0 });
            })
            .finally(() => setIsLoading(false));
    }, [searchParams]);

    const { publications = [], count = 0 } = publicationsData;

    // Estado de Carregamento (Skeletons seriam ideais, mas aqui usamos um Spinner elegante)
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 w-full animate-in fade-in duration-500">
                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Buscando publicações...</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto py-8 px-4 animate-in slide-in-from-bottom-2 duration-500">
            {/* Cabeçalho de Resultados */}
            <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                    <LayoutGrid size={20} className="text-emerald-600" />
                    <h2 className="text-lg font-semibold text-slate-800">
                        Resultados da busca
                    </h2>
                </div>
                <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-100">
                    {count} {count === 1 ? 'encontrada' : 'encontradas'}
                </span>
            </div>

            {/* Listagem */}
            {publications.length > 0 ? (
                <div className="flex flex-col gap-1">
                    {publications.map((res, index) => (
                        <CardPub key={res.id || index} pubss={res} />
                    ))}
                </div>
            ) : (
                /* Estado Vazio */
                <div className="flex flex-col items-center justify-center py-16 px-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <SearchX className="w-12 h-12 text-slate-300 mb-4" />
                    <h3 className="text-slate-900 font-semibold text-lg">Nenhum resultado encontrado</h3>
                    <p className="text-slate-500 text-center max-w-sm mt-1">
                        Não encontramos publicações com esses filtros. Tente ajustar as palavras-chave ou o ano da busca.
                    </p>
                </div>
            )}
        </div>
    );
}


/*
// app/search/_components/search-content.js

'use client'



import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import axios from "axios";

import { CardPub } from "@/app/_components/cardPub"; // Ajuste o caminho conforme necessário



export function SearchContent() {

    const [publicationsData, setPublications] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const searchParams = useSearchParams();



    useEffect(() => {

        const name = searchParams.get("name");

        const acronym = searchParams.get("acronym");

        const type = searchParams.get("type");

        const year = searchParams.get("year");

       

       

        setIsLoading(true);



        const params = {}



        if (name) params.name = name

        if (acronym) params.acronym = acronym

        if (type) params.type = type

        if (year) params.year = year

       

        if (Object.keys(params).length === 0) {

            setIsLoading(false)

            return;

        }



        const query = new URLSearchParams(params)



        axios

        .get(`/api/search?${query.toString()}`)

        .then((res) => {

            setPublications(res.data);

           

        })

        .catch((error) => {

            console.error("Erro ao realizar consulta.", error)

            setPublications([]);

        })

        .finally(() => {

            setIsLoading(false);

        });

    }, [searchParams]);



    const publications = publicationsData.publications || []

    const count = publicationsData.count || []

   // const pbs = publications.map(p => {

       // let date = formate(new Date(p.date), 'dd/MM/yyyy', { locale: ptBR })

   // })





    if (isLoading) {

        return <p className="text-xl p-8">Buscando publicações...</p>;

    }

   

    return (

        <div className="w-full py-6">

           <h2 className="text-amber-500">Total - {count}</h2>



            {publications.length > 0 ? (

                // Mapeie e exiba os resultados

                publications.map((res, index) => (

                    // Certifique-se de que a prop CardPub está correta

                    <CardPub key={index} pubss={res}/>

                ))

            ) : (

                <p className="text-xl p-8">Nenhuma publicação encontrada. Tente refinar a busca.</p>

            )}

        </div>

    );

}
*/