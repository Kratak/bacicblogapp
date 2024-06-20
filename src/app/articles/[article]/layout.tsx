import {Inter} from 'next/font/google'
import {sql} from "@vercel/postgres";
import {Metadata} from "next";

const inter = Inter({subsets: ['latin']})

async function getArticleData(articleUrl: string) {
    const {rows} = await sql`
            SELECT * 
            FROM articles
            WHERE custom_url = ${articleUrl}
        `;
    return rows

}

export default async function ArticleLayout({params: {article: articleUrl}}: {
    children: React.ReactNode,
    params: { article: string }
}) {
    const data = await getArticleData(articleUrl)
    if (data.length === 0) {
        return (
            <html lang="en">
            <body className={inter.className}>
            <main className="flex min-h-screen flex-col items-center p-24">
                <a href="/">Strona główna</a>
                <h1 className={`mb-3 text-4xl font-semibold mb-8`}>Brak artykułu</h1>
                <a href="/articles">Pozostałe posty</a>
            </main>
            </body>
            </html>
        )
    }
    return (
        <html lang="en">
        <title>{data[0].article_title || 'Brak postu'}</title>
        <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center p-24">
            <>
                <a href="/">Strona główna</a>
                {data.length === 0 ? (<div>Ten post nie istnieje</div>) :
                    (<>
                        <h1 className={`mb-3 text-4xl font-semibold mb-8`}>{data[0].article_title}</h1>
                        <div key={data[0].article_id}>
                            <div>Opublikowano: {new Date(data[0].publish_date).toISOString()}</div>
                            <div>Autor: Test</div>
                            <br/>
                            <div dangerouslySetInnerHTML={{__html: data[0].article_wyswig}}/>
                        </div>
                    </>)}
                <br/>
                <a href="/articles">Pozostałe posty</a>
            </>
        </main>
        </body>
        </html>
    )
}
