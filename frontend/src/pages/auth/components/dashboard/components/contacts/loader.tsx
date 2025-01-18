import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function Loader() {
    return (
        <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="w-full">
                    <CardHeader className="w-full">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="w-2/4 h-6" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-12 w-full" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default Loader;
