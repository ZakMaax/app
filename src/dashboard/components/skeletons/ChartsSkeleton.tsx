import { Skeleton } from "@/components/ui/skeleton";

export default function ChartSkeleton() {
    return (
      <div className="flex items-center justify-center h-[200px] w-full rounded-lg bg-primary-foreground">
        <Skeleton className=" " /> 
      </div>
    );
  }