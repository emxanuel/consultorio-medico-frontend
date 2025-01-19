import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";

export function PendingTasksCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
        <ClipboardList className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li>Review lab results for Patient #1234</li>
          <li>Follow up with Dr. Smith about referral</li>
          <li>Update patient records for recent visits</li>
        </ul>
      </CardContent>
    </Card>
  )
}