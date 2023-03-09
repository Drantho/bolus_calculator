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
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
            </Head>
            <main>
                <Header/>
                {children}
            </main>
            <footer>

            </footer>
        </>
    )
}

export default Layout