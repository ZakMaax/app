import img from '@/assets/me.png'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
const agents = [
    {
        id: 1,
        name: "Mustafe Xariir",
        image: img,
        properties: 13 

    },
      {
        id: 2,
        name: "Mustafe Xariir",
        image: img,
        properties: 13 

    },  {
        id: 3,
        name: "Mustafe Xariir",
        image: img,
        properties: 13 

    },  {
        id: 4,
        name: "Mustafe Xariir",
        image: img,
        properties: 13 

    },
]

export default function AgentsCards() {


  return (
    
    <div>
        <h1 className='text-lg font-medium mb-6'>Active agents</h1>
        <div className="flex flex-col gap-2">
            {
                agents.map(agent => (
                <Card key={agent.id} className='items-center gap-2 px-3 py-2'>
                    <Avatar className='w-12 h-12 rounded-sm'>
                        <AvatarImage src={agent.image} alt="agent photo" />
                    </Avatar>
                    <CardContent className="flex-1 p-0">
                        <CardTitle className="text-sm font-medium">{agent.name}</CardTitle>
                    </CardContent>
                    <CardFooter>{agent.properties} <span className='text-slate-500 ml-2'>properties</span></CardFooter>
                </Card>
                ))
            }
        </div>
    </div>
  )
}