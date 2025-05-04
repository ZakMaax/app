import AppPieChart from "../components/charts/AppPieChart";
import PropertiesTable from "../components/properties-table/PropertiesTable";

export default function DashboardProperties() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-primary-foreground p-4 rounded-lg">
            <AppPieChart/>
        </div>
         <div className="bg-primary-foreground p-4 rounded-lg">
            <AppPieChart/>
        </div>
         <div className="bg-primary-foreground p-4 rounded-lg">
            <AppPieChart/>
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-3">
            <PropertiesTable/>
        </div>
    </div>
  )
}