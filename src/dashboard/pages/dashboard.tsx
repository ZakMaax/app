import AgentsCards from "../components/AgentsCards";
import AppAreaChart from "../components/charts/AppAreaChart";
import AppPieChart from "../components/charts/AppPieChart";
import AppBarChart from "../components/charts/BarChart";
import PropertiesTable from "../components/properties-table/PropertiesTable";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-3"><AppBarChart/></div>
      <div className="bg-primary-foreground p-4 rounded-lg"><AgentsCards/></div>
      <div className="bg-primary-foreground p-4 rounded-lg"><AppPieChart/></div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2"><AppAreaChart/></div>
      <div className="bg-primary-foreground p-4 rounded-lg "></div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-4">
        <PropertiesTable/>
      </div>

    </div>
  )
}