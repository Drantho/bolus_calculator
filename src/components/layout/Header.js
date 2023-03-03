import React from 'react'
import Link from 'next/link'
import { useRouter } from "next/router";

const Header = () => {
    const router = useRouter();
    return (
        <nav>
            <ul className='main-links'>
                <li className={router.pathname == "/" ? "active" : ""}>
                    <Link href='/'>insulin dosage calculator</Link>
                </li>
                <li className={router.pathname == "/history" ? "active" : ""}>
                    <Link href='/history'>history</Link>
                </li>
                <li className={router.pathname == "/addReading" ? "active" : ""}>
                    <Link href='/addReading'>add reading</Link>
                </li>
                <li className={router.pathname == "/bolusCalc" ? "active" : ""}>
                    <Link href='/bolusCalc'>bolus calc</Link>
                </li>
                <li className={router.pathname == "/settings" ? "active" : ""}>
                    <Link href='/settings'>settings</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Header