import { getAccount } from "@/actions/features/accounts/get-account"
import { getSession } from "@auth0/nextjs-auth0"
import { redirect } from "next/navigation"
import { getDictionary } from "@/dictionaries/getDictionary"
import { Language } from "@/types/language"
import { TotalPatientsCard } from "@/components/features/dashboard/cards/total-patients"
import { TodayAppointmentsCard } from "@/components/features/dashboard/cards/today-appointments"
import { RecentActivityCard } from "@/components/features/dashboard/cards/recent-activity"
import { PendingTasksCard } from "@/components/features/dashboard/cards/pending-tasks"
import { RecentPatientsTable } from "@/components/features/dashboard/recent-patients"

export default async function Page({ params }: { params: { enterprise: string, lang: string } }) {
    const data = await getAccount(params.enterprise)
    const session = await getSession()
    const user = session?.user

    if (data?.admin?.email && user?.email !== data?.admin?.email) {
        redirect('/api/auth/logout')
    }


    return (
        <div className="flex flex-1 flex-col overflow-hidden">
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
                <div className="container mx-auto px-6 py-8">
                    <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
                    <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <TotalPatientsCard count={1234} />
                        <TodayAppointmentsCard count={15} />
                        <RecentActivityCard />
                        <PendingTasksCard />
                    </div>
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold text-gray-900">Recent Patients</h3>
                        <div className="mt-4">
                            <RecentPatientsTable />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}