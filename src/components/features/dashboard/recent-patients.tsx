
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const recentPatients = [
  {
    id: "P-1234",
    first_name: "Sarah",
    last_name: "Johnson",
    age: 45,
    gender: "F",
    last_visit: "2024-01-04",
    diagnosis: "Hypertension",
    status: "Follow-up"
  },
  {
    id: "P-1235",
    first_name: "Michael",
    last_name: "Chen",
    age: 32,
    gender: "M",
    last_visit: "2024-01-05",
    diagnosis: "Common Cold",
    status: "Recovered"
  },
  {
    id: "P-1236",
    first_name: "Emily",
    last_name: "Wilson",
    age: 28,
    gender: "F",
    last_visit: "2024-01-05",
    diagnosis: "Pregnancy Check",
    status: "Ongoing"
  },
  {
    id: "P-1237",
    first_name: "David",
    last_name: "Martinez",
    age: 52,
    gender: "M",
    last_visit: "2024-01-05",
    diagnosis: "Diabetes Type 2",
    status: "Under Treatment"
  },
  {
    id: "P-1238",
    first_name: "Lisa",
    last_name: "Taylor",
    age: 39,
    gender: "F",
    last_visit: "2024-01-04",
    diagnosis: "Annual Check-up",
    status: "Completed"
  }
]

export function RecentPatientsTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Last Visit</TableHead>
            <TableHead>Diagnosis</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentPatients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell className="font-medium">{patient.id}</TableCell>
              <TableCell>{`${patient.first_name} ${patient.last_name}`}</TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{new Date(patient.last_visit).toLocaleDateString()}</TableCell>
              <TableCell>{patient.diagnosis}</TableCell>
              <TableCell>
                <Badge 
                  variant={
                    patient.status === "Completed" ? "default" :
                    patient.status === "Under Treatment" ? "destructive" :
                    patient.status === "Ongoing" ? "secondary" :
                    "outline"
                  }
                >
                  {patient.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

