import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from "next/router";

const Header = () => {
    const [toggle, setToggle] = useState(false);
    const toggleMenu = () => {
        setToggle(prev => !prev);
    }
    const router = useRouter();

    return (
        <nav>
            <ul className={toggle ? 'main-links open' : 'main-links'}>
                <li className={router.pathname == "/" ? "active" : ""}>
                    <div>
                        <Link href='/'>insulin dosage calculator</Link>
                    </div>
                    <div className='mobile-menu'>
                        <Link href="/bolusCalc" class="material-symbols-outlined">
                            add_circle
                        </Link>
                        <div onClick={toggleMenu} class="material-symbols-outlined">
                            menu
                        </div>
                    </div>
                </li>
                <li className={router.pathname == "/history" ? "active" : ""}>
                    <Link href="/history">history</Link>
                </li>
                <li className={router.pathname == "/addReading" ? "active" : ""}>
                    <Link href="/addReading">add reading</Link>
                </li>
                <li className={router.pathname == "/bolusCalc" ? "active" : ""}>
                    <Link href="/bolusCalc">bolus calc</Link>
                </li>
                <li className={router.pathname == "/settings" ? "active" : ""}>
                    <Link href="/settings">settings</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Header