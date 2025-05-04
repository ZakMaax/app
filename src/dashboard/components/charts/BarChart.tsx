import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent} from '@/components/ui/chart'
import { Monitor, Smartphone } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis} from "recharts"
const ChartConfig = {
    desktop: {
    label: "Desktop",
    color: "#2563eb",
    icon: Monitor
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
    icon: Smartphone
  },
} satisfies ChartConfig

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]


export default function AppBarChart() {
  return (
    <div>
        <h1 className='text-lg font-medium mb-6'>Total Revenue</h1>
        <ChartContainer config={ChartConfig} className='min-h-[200px] w-full'>
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false}/>
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent  />}/>
                <ChartLegend content={<ChartLegendContent/>}/>
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
        </ChartContainer>
    </div>
  )
}