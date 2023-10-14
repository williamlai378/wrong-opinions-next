
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/dist/server/api-utils";

export default async function DashboardPage() {
    
    return (
        <div>
            Dhasboard
        </div>
    )
}