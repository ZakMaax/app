import {Area, AreaChart, CartesianGrid, XAxis} from "recharts"
import {type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export default function AppAreaChart() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Area Chart</CardTitle>
            <CardDescription>Showing total visitors for the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
                <AreaChart accessibilityLayer data={chartData} margin={{left: 12, right: 12}}>
                <CartesianGrid vertical={false}/>
                <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                <Area
                dataKey="desktop"
                type="natural"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
                />
                </AreaChart>
            </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                 Trending up by 5% this month <TrendingUp/>
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">January - June 2024</div>
            </div>
          </div>
        </CardFooter>
    </Card>
  )
}