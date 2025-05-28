import { DataTable } from "../Data-Table";
import { propertyColumns} from "./PropertyColumns";
import {PropertyType} from '@/utils/types'


const data: PropertyType[] = [
     
  ]

export default function PropertiesTable() {
  return (
     <div className="container mx-auto py-10">
      <DataTable columns={propertyColumns} data={data} />
    </div>
  )
}