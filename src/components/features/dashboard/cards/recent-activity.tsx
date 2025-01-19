import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

export function RecentActivityCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li>Patient check-in: John Doe</li>
          <li>Appointment scheduled: Jane Smith</li>
          <li>Lab results uploaded: Mike Johnson</li>
        </ul>
      </CardContent>
    </Card>
  )
}