import { NextRequest } from "next/server"

export async function POST({request}: {request: NextRequest}) {
    console.log(request)
    return Response.redirect('http://localhost:3000/home')
}