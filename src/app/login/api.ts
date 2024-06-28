"use server"

import {cookies} from "next/headers";
import {LoginFormData} from "@/app/login/layout";
import {QueryResult, sql} from "@vercel/postgres";


interface UsersResponse {
    user_id: string;
    is_valid: boolean;
    craete_date: string;
    edit_date: string;
    user_name: string;
    user_role: string;
    pass_hash: string;
}
interface GetSessionIdData {
    user_id: string;
    email: string;
    password: string
}


async function getLoginCredentials({ email, password }: LoginFormData): Promise<Array<UsersResponse>> {
    const { rows }: QueryResult<UsersResponse> = await sql`
        SELECT * 
        FROM users 
        WHERE (user_name = ${email} AND pass_hash = ${password});
        `;
    return rows

}
async function getSessionId({ user_id, email, password }: GetSessionIdData): Promise<Array<UsersResponse>> {
    const { rows }: QueryResult<UsersResponse> = await sql` 
        INSERT INTO session( user_id )VALUES ( ${user_id})
        SELECT * from session WHERE ( user_id = ${user_id})
        WHERE NOT EXIST ( 
            SELECT * 
            FROM users 
            WHERE (user_name = ${email} AND pass_hash = ${password}) 
            )
        ;
    `;
    return rows

}
export async function login (data: LoginFormData) {
    try {
        const credentials = await getLoginCredentials(data)
        if (!!credentials.length) {
            cookies().set('sessionid','test')
        } else {
            // todo wrong credentials handling
        }
    } catch (e){
        console.log('Login error', e)
    }
}
