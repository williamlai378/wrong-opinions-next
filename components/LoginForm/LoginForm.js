"use client"

import Link from "next/link"
import {useRouter} from 'next/navigation'
import { signIn, useSession } from "next-auth/react"
import { useState, useEffect} from "react"
import { useSearchParams } from "next/navigation"
import toast from "react-hot-toast"

export default function LoginForm() {
    const [data, setData] = useState({email: '', password: ''})
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const session = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = (router.query?.callbackUrl) ?? '/home' 
    console.log('search Params', searchParams.get('redirect'))


    const redirectUrl = searchParams.get('redirect') ?? '/home'

    useEffect(() => {
        
    },[session])


    const loginUser = (e) => {
        e.preventDefault();
        setLoading(true);
        e.preventDefault();
        signIn('credentials', {
            ...data,
        }).then((callback) => {
            if(callback?.error) {
                toast.error(`Login Failed: ${callback.error}`)
            }
            if(callback?.ok && !callback?.error) {
                setSuccess(true);
                toast.success('Logged In Successfully')
                console.log('callback url in login function', callbackUrl)
                setLoading(false);
            }
        })
    }
    return (
        <div className="sm:w-9/12 md:w-3/5 md:h-1/2 h-full bg-white rounded-xl flex flex-col px-4 justify-evenly shadow-md">
            <h2 className="text-center">Login</h2>
            
            <form onSubmit={loginUser}>
                <div className="grid grid-cols-1 w-full">
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <div className="input-box mb-2">
                        <input 
                            type="text" 
                            id="email" 
                            disabled={success}
                            value={data.email}
                            onChange={(e) => setData({...data, email: e.target.value})}
                            className="auth-input" required></input>
                        <span className="focus-border">
                            <i></i>
                        </span>
                    </div>
                    <label htmlFor="password" className="block text-sm font-medium">Password</label>
                    <div className="input-box mb-2">
                        <input
                            type="password"
                            id="password"
                            disabled={success}
                            value={data.password}
                            onChange={(e) => setData({...data, password: e.target.value})}
                            className="auth-input" required/>
                        <span className="focus-border">
                            <i></i>
                        </span>
                    </div>
                    {!success && !loading && <button 
                        type="submit"
                        className="text-center w-full hover: bg-purple-400 rounded-md p-1">Log In</button>}
                    {loading && <button className="bg-purple-400 w-full flex justify-center items-center rounded-md p-1">
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    </button>}
                    {success && !loading && <button className="bg-green-300 w-full text-center rounded-md p-1">
                        Success
                    </button>}
                </div>
            </form>

            <div className="github-provider">
                        Sign In with google
                        <button
                            className="bg-green-200"
                            onClick={() => {signIn('google')}}>
                            Google
                        </button>
                    </div>

            <Link href="/register" className="text-center hover:text-blue-300 ">Don't have an account? Sign up</Link>
        </div>
    )
}