import { DataTable } from "../Data-Table";
import { columns, Payment} from "./Columns";


const data: Payment[] = [
    {
      id: "728ed52f345678903456789034567890",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "71",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },{
      id: "728",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },{
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },{
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },{
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },{
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },{
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },{
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },{
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },{
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ]

export default function PropertiesTable() {
  return (
     <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}