import React from 'react'
import Head from 'next/head'
import Header from './Header'

const Layout = props => {
    let {title} = props
    const {children} = props

    if(title) {
        title = `Insulin Calc - ${title}`
    } else {
        title = "Insulin Calc"
    }

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Header/>
            <main>
                {children}
            </main>
            <footer>

            </footer>
        </>
    )
}

export default Layout