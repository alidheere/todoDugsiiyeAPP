import { NextResponse } from "next/server";

export async function GET() {
    const data = [{
     id: 12, name: "ali"
    }
   
    ]
    return NextResponse.json(data)
}