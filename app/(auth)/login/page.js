import { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/LoginForm/LoginForm";

export default function LoginPage () {
    return (
        <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
            <LoginForm/>
        </div>
    )
}