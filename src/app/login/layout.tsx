"use client"
import {Inter} from 'next/font/google'
import {useForm} from "react-hook-form";
import {login} from "@/app/login/api";

const inter = Inter({subsets: ['latin']})

export interface LoginFormData {
    email: string;
    password: string
}


const currentPickerDate =new Intl.DateTimeFormat("pl", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
}).format().split(".").reverse().join("-")

export default function LoginLayout({params: {article: articleUrl}}: {
    children: React.ReactNode,
    params: { article: string }
}) {
    const {
        handleSubmit,
        register,
    } = useForm<LoginFormData>();

    async function onSubmit(data: LoginFormData) {
        await login(data)
    }
    return (
        <html lang="en">
        <title>Zaloguj</title>
        <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center p-24">
            <>
                <a href="/">Strona główna</a>
                <h1 className={`mb-3 text-4xl font-semibold mb-8`}>Zaloguj</h1>

                <form className="w-5/6" onSubmit={handleSubmit(onSubmit)} method="post">
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                        <input{...register("email" )} type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input{...register("password" )} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
                <a href="/articles">Pozostałe posty</a>
            </>
        </main>
        </body>
        </html>
    )
}
