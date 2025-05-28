import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card, CardTitle } from '@/components/ui/card'
import {Agent} from "@/utils/types"


export default function AgentsCards({agents}: { agents: Agent[]}) {

  return (
        <div>
          <h1 className='text-lg font-medium mb-6'>Active agents</h1>
          <div className="flex flex-col gap-3">
            {agents.length > 0 ? (
              agents.map(agent => (
                <Card
                  key={agent.id}
                  className='flex items-center p-3' 
                >
                  <Avatar className='h-15 w-15'>
                      <AvatarImage src={agent.avatar_url} alt={`${agent.name}'s photo`} />
                  </Avatar>
                  <div className='ml-3 flex-1 space-y-2'>
                    <CardTitle className="text-sm text-center font-semibold leading-none">
                      {agent.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground"> 
                      {agent.email}
                    </p>
                  </div>
                </Card>
              ))
            ) : (
              // Optional: Add a loading/empty state message
              <p className="text-muted-foreground">Loading agents or no agents found...</p>
            )}
          </div>
        </div>
  )
}