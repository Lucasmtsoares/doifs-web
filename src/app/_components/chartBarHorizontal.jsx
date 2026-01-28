"use client"

import { useEffect, useState } from "react"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import axios from "axios"

const chartConfig = {
  nomeacoes: {
    label: "Nomeações",
    color: "hsl(210 40% 50%)",
  },
  exoneracoes: {
    label: "Exonerações",
    color: "hsl(210 40% 70%)",
  },
}

export function ChartBarLabelCustom() {
  const [chartData, setChartData] = useState({})

  useEffect(() => {
    axios
      .get("api/dashboard/personnel")
      .then((res) => {
        setChartData(res.data)
      })
      .catch((error) => {
        console.error("Erro ao buscar dados", error)
      })
  }, [])

  const personnelData = chartData.tops_personnel || []
  const totalAtos = personnelData.reduce((sum, item) => sum + (item.total_acts || 0), 0)

  return (
    <div className="rounded-2xl w-full">
      <Card className="shadow-2xl">
        <CardHeader>
          <CardTitle>Ranking dos top 10 reitores dos Institutos Federais com mais atos assinados</CardTitle>
          <CardDescription>Distribuição de nomeações e exonerações no intervalo de um ano.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            // Altura aumentada para comportar as barras mais largas
            className="aspect-auto h-[600px] w-full"
          >
            <BarChart
              data={personnelData}
              layout="vertical"
              barSize={30}
              margin={{
                left: 20,
                right: 60, // Espaço para o número total ao final
                top: 10,
                bottom: 10,
              }}
            >
              <CartesianGrid horizontal={false} strokeDasharray="3 3" opacity={0.2} />
              
              {/* 1. Ajuste de proporção: Aumentando a largura da coluna de nomes */}
              <YAxis
                dataKey="responsible_institute"
                type="category"
                tickLine={false}
                axisLine={false}
                // Definido um valor alto para garantir que os nomes ocupem a maior parte da área
                width={450} 
                tick={{ 
                  fill: "var(--foreground)", 
                  fontSize: 12, 
                  fontWeight: 500,
                }}
                className="uppercase whitespace-nowrap"
              />

              <XAxis dataKey="total_acts" type="number" hide/>

              <ChartTooltip
                cursor={{ fill: "transparent" }}
                content={<ChartTooltipContent indicator="line" />}
              />

              <Bar
                dataKey="nomeacoes"
                stackId="a"
                fill={chartConfig.nomeacoes.color}
                radius={[4, 0, 0, 4]} 
              />

              <Bar
                dataKey="exoneracoes"
                stackId="a"
                fill={chartConfig.exoneracoes.color}
                radius={[0, 4, 4, 0]}
              >
                {/* 2. Removido o negrito (font-bold) conforme solicitado */}
                <LabelList
                  dataKey="total_acts"
                  position="right"
                  offset={10}
                  className="fill-muted-foreground"
                  fontSize={12}
                  style={{ fontWeight: 400 }}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm border-t pt-4 mt-4">
          <div className="flex gap-2 leading-none font-medium">
            Total de Atos analisados no último ano: {totalAtos}
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground">
            Ranking discriminado por Nomeação (Azul Escuro) e Exoneração (Azul Claro).
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}