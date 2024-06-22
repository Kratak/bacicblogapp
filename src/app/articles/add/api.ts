"use server"

import {sql} from "@vercel/postgres";
import {FormData} from "@/app/articles/add/layout";

export async function postArticle (data: FormData) {
    await sql`
                    INSERT INTO articles(
                            is_public,
                            publish_date,
                            edit_date,
                            custom_url,
                            article_title,
                            article_wyswig,
                            article_short_description)
                        VALUES (
                            ${data.is_public},
                            ${data.publish_date},
                            ${data.edit_date},
                            ${data.custom_url},   
                            ${data.article_title},
                            ${data.article_wyswig},
                            ${data.article_short_description});
                `;
}
