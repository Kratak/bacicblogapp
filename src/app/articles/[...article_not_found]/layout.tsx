import type {Metadata} from 'next'
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Nie znaleziono posta',
    description: 'Nie znaleziono treści z podanego linka',
}

export default function ArticleNotFoundLayout({
                                           children,
                                       }: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
        <body className={inter.className}>
        {children}
        </body>
        </html>
    )
}
