"use server"

import {cookies} from "next/headers";
import {LoginFormData} from "@/app/login/layout";
import {QueryResult, sql} from "@vercel/postgres";


interface UsersResponse {
    is_public: boolean,
    article_id: number,
    custom_url: string,
    article_title: string,
    publish_date: Date,
    article_short_description: string
}

async function getArticlesDescription(): Promise<Array<ArticleResponse>> {
    const {rows}: QueryResult<ArticleResponse> = await sql`
        SELECT * 
        FROM articles 
        ORDER BY publish_date DESC;`;
    return rows

}
export async function login (data: LoginFormData) {
    try {

    } catch (e){
        console.log('Login error', e)
    }
    cookies().set('sessionid','test')
    console.log('cookie set')
}
