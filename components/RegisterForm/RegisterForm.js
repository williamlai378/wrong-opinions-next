'use client'


import { useState, useEffect} from 'react'
import Link from 'next/link'
import axios from 'axios'


export default function RegisterForm() {
    const [data, setData] = useState({name: '', username: '', email: '', password: ''})
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [alertMsg, setAlertMsg] = useState({
        error: false,
        message: ''
    })

    const registerUser = async (e) => {
        await setAlertMsg({
            error: false,
            message: ''
        })
        e.preventDefault()
        axios.post('/api/register', data)
        .then((res) => {
            setData({name: '', username: '', email: '', password: ''})
            setPasswordConfirm('');
            if(res.data.error) {               
                setAlertMsg({
                    error: true,
                    message: res.data.message
                })
            }else {
                setAlertMsg({
                    error: false,
                    message: res.data.message
                })
            }
        })
        .catch((e) => console.log(e))
    }
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register</h2>
            </div>
            {alertMsg.message && (<div
                className='sm:mx-auto sm:w-full sm:max-w-sm bg-green-300 border-green-900'>
                {alertMsg.message}
            </div>) }

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={registerUser}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                        <div className="mt-2">
                            <input 
                                id="name" 
                                name="name" 
                                type="text" 
                                value={data.name}
                                onChange={(e) => setData({...data, name: e.target.value})}
                                required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                        <div className="mt-2">
                            <input 
                                id="username" 
                                name="username" 
                                value={data.username}
                                onChange={(e) => setData({...data, username
                                : e.target.value})}
                                type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                        <div className="mt-2">
                            <input 
                                id="email" 
                                name="email" 
                                type="email" 
                                value={data.email}
                                onChange={(e) => setData({...data, email: e.target.value})}
                                autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input 
                                id="password" 
                                name="password" 
                                type="password" 
                                value={data.password}
                                onChange={(e) => setData({...data, password: e.target.value})}
                                required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password-confirm" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                        </div>
                        <div className="mt-2">
                            <input 
                                id="password-confirm" 
                                name="password-confirm" 
                                type="password-confirm"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}

                                autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Have an account?
                    <Link href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign In</Link>
                </p>
            </div>
        </div>
    )
}