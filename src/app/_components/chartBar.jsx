'use client'

import { useEffect, useState, useMemo } from "react"
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import axios from "axios"
import { TrendingUp } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export function ChartLineMultianual({ context }) {
  const [rawData, setRawData] = useState([])
  const [availableYears, setAvailableYears] = useState([])
  const [isClient, setIsClient] = useState(false)
  const [loading, setLoading] = useState(true)

  // Estados dos Filtros
  const [instituicao, setInstituicao] = useState("IFAC")
  const [activeSerie, setActiveSerie] = useState("both") // 'serieA', 'serieB' ou 'both'
  const [anoA, setAnoA] = useState("")
  const [anoB, setAnoB] = useState("")

  useEffect(() => {
    setIsClient(true)
    async function fetchData() {
      setLoading(true)
      try {
        const response = await axios.get('api/dashboard/overview')
        const data = response.data.institutes_overview || []
        const years = response.data.years || []
        
        setRawData(data)
        setAvailableYears(years)
        
        if (years.length >= 2) {
          setAnoA(String(years[years.length - 1]))
          setAnoB(String(years[years.length - 2]))
        }
      } catch (error) {
        console.error("Erro ao carregar dados multianuais:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const instituicoes = useMemo(() => {
    return Array.from(new Set(rawData.map(item => item.acronym))).sort()
  }, [rawData])

  // 1. Processamento dos dados para as linhas do gráfico
  const chartData = useMemo(() => {
    if (!rawData.length || !context || !anoA || !anoB) return []
    const filteredByInst = rawData.filter(item => item.acronym === instituicao)
    
    return MESES.map(mes => {
      const dataPoint = { month: mes };
      [anoA, anoB].forEach(year => {
        const record = filteredByInst.find(r => r.month === mes && String(r.year) === year)
        if (record) {
          const valA = record[context.serieA.key] || 0
          const valB = record[context.serieB.key] || 0
          
          if (activeSerie === 'serieA') dataPoint[year] = valA
          else if (activeSerie === 'serieB') dataPoint[year] = valB
          else dataPoint[year] = valA + valB
        } else {
          dataPoint[year] = 0
        }
      })
      return dataPoint
    })
  }, [rawData, instituicao, context, anoA, anoB, activeSerie])

  // 2. Cálculo do Total para o Rodapé (Soma de todos os meses exibidos para ambos os anos)
  const totalDisplaySum = useMemo(() => {
    return chartData.reduce((acc, curr) => {
      return acc + (curr[anoA] || 0) + (curr[anoB] || 0)
    }, 0)
  }, [chartData, anoA, anoB])

  const chartConfig = {
    [anoA]: { label: `Ano ${anoA}`, color: "hsl(210 40% 50%)" },
    [anoB]: { label: `Ano ${anoB}`, color: "hsl(210 40% 80%)" },
  }

  if (!isClient) return <div className="w-full h-[450px] bg-white rounded-2xl border border-gray-100 animate-pulse" />

  return (
    <Card className="rounded-2xl shadow-sm border-gray-100 bg-white">
      <CardHeader className="flex flex-col border-b p-0 lg:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5">
          <CardTitle className="text-xl font-bold text-slate-800">Comparativo Multianual</CardTitle>
          <CardDescription>Análise temporal entre períodos anuais</CardDescription>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 p-4 lg:border-l bg-slate-50/50">
          <Select value={activeSerie} onValueChange={setActiveSerie}>
            <SelectTrigger className="w-[150px] bg-white h-9">
              <SelectValue placeholder="Métrica" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="both">Soma (A + B)</SelectItem>
              <SelectItem value="serieA">{context?.serieA.label}</SelectItem>
              <SelectItem value="serieB">{context?.serieB.label}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={instituicao} onValueChange={setInstituicao}>
            <SelectTrigger className="w-[110px] bg-white h-9">
              <SelectValue placeholder="Inst." />
            </SelectTrigger>
            <SelectContent>
              {instituicoes.map(inst => <SelectItem key={inst} value={inst}>{inst}</SelectItem>)}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-1 bg-white border rounded-md px-2 h-9">
            <Select value={anoA} onValueChange={setAnoA}>
              <SelectTrigger className="w-[85px] border-0 shadow-none focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableYears.map(y => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
              </SelectContent>
            </Select>
            <span className="text-gray-300 text-xs font-bold">VS</span>
            <Select value={anoB} onValueChange={setAnoB}>
              <SelectTrigger className="w-[85px] border-0 shadow-none focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableYears.map(y => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-6 sm:px-6">
        {loading ? (
          <div className="h-[300px] flex items-center justify-center italic text-slate-400">Processando...</div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis hide />
              <ChartTooltip
                cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }}
                content={<ChartTooltipContent labelFormatter={(val) => `Mês: ${val}`} />}
              />
              <Line
                dataKey={anoA}
                type="monotone"
                stroke={chartConfig[anoA]?.color}
                strokeWidth={3}
                dot={{ r: 4, fill: chartConfig[anoA]?.color }}
                activeDot={{ r: 6 }}
              />
              <Line
                dataKey={anoB}
                type="monotone"
                stroke={chartConfig[anoB]?.color}
                strokeWidth={3}
                dot={{ r: 4, fill: chartConfig[anoB]?.color }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>

      <CardFooter className="border-t pt-4 flex-col items-start gap-2">
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none text-slate-700">
              Total de {totalDisplaySum.toLocaleString('pt-BR')} registros comparados <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {activeSerie === 'both' 
                ? `Soma de ${context?.serieA.label} e ${context?.serieB.label}` 
                : `Apenas ${activeSerie === 'serieA' ? context?.serieA.label : context?.serieB.label}`} em {instituicao} ({anoA} e {anoB})
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}