"use server"

import {cookies} from "next/headers";
import {LoginFormData} from "@/app/login/layout";

export async function login (data: LoginFormData) {

    cookies().set('sessionid','test')
    console.log('cookie set')
}
