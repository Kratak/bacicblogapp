"use client"
import {Inter} from 'next/font/google'
import {useForm} from "react-hook-form";
import {postArticle} from "@/app/articles/add/api";

const inter = Inter({subsets: ['latin']})

export interface AddPostFormData {
    is_public: boolean
    craete_date: string;
    edit_date: string;
    publish_date: string;
    custom_url: string;
    article_title: string;
    article_short_description: string;
    article_wyswig: string;
}


const currentPickerDate =new Intl.DateTimeFormat("pl", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
}).format().split(".").reverse().join("-")

export default function AddArticleLayout() {
    const {
        handleSubmit,
        register,
    } = useForm<AddPostFormData>();

    async function onSubmit(data: AddPostFormData) {
        await postArticle(data)
    }
    return (
        <html lang="en">
        <title>Dodaj nowy post</title>
        <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center p-24">
            <>
                <a href="/">Strona główna</a>
                <h1 className={`mb-3 text-4xl font-semibold mb-8`}>Dodaj nowy post</h1>

                <form className="w-5/6" onSubmit={handleSubmit(onSubmit)} method="post">
                    <div className="mb-6">
                        <div>
                            <label htmlFor="is_public" className="w-full block mt-6 text-sm font-medium text-gray-900 dark:text-white">is_public</label>
                            <input{...register("is_public" )} type="checkbox" name="is_public" id="is_public" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="craete_date" className="block mt-6 text-sm font-medium text-gray-900 dark:text-white">craete_date</label>
                            <input{...register("craete_date" )} defaultValue={currentPickerDate} type="date" name="craete_date" id="craete_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="edit_date" className="block mt-6 text-sm font-medium text-gray-900 dark:text-white">edit_date</label>
                            <input{...register("edit_date" )} defaultValue={currentPickerDate} type="date" name="edit_date" id="edit_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="publish_date" className="block mt-6 text-sm font-medium text-gray-900 dark:text-white">publish_date</label>
                            <input{...register("publish_date" )} defaultValue={currentPickerDate} type="date" name="publish_date" id="publish_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="custom_url" className="block mt-6 text-sm font-medium text-gray-900 dark:text-white">custom_url</label>
                            <input{...register("custom_url" )}  type="text" name="custom_url" id="custom_url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="mt-article-name" required />
                        </div>
                        <div>
                            <label htmlFor="article_title" className="block mt-6 text-sm font-medium text-gray-900 dark:text-white">article_title</label>
                            <input{...register("article_title" )}  type="text" name="article_title" id="article_title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="my article title" required />
                        </div>
                        <div>
                            <label htmlFor="article_short_description" className="block mt-6 text-sm font-medium text-gray-900 dark:text-white">article_short_description</label>
                            <input{...register("article_short_description" )}  type="text" name="article_short_description" id="article_short_description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="article_short_description" required />
                        </div>
                        <div>
                            <label htmlFor="article_wyswig" className="block mt-6 text-sm font-medium text-gray-900 dark:text-white">paste here article_wyswig</label>
                            <textarea {...register("article_wyswig" )}  name="article_wyswig" id="article_wyswig" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="content" required />
                        </div>
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
