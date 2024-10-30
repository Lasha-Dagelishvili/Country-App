import '@/components/base/navbar/navbar.css'

import { FC } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar: FC = () => {
    const HandleActiveNav = document.querySelectorAll('.nav_items')

    HandleActiveNav.forEach((navLinkEL) => {
        navLinkEL.addEventListener('click', () => {
            document.querySelector('.active')?.classList.remove('active')
            navLinkEL.classList.add('active')
        })
    })

    return (
        <header>
            <nav>
                <div className="container">
                    <NavLink className={'nav_items'} to="/">
                        Home
                    </NavLink>
                    <NavLink className={'nav_items'} to="/about">
                        About Us
                    </NavLink>
                    <NavLink className={'nav_items'} to="/contact">
                        Contact
                    </NavLink>
                    <NavLink className={'nav_items'} to="/Test">
                        Test
                    </NavLink>
                </div>
            </nav>
        </header>
    )
}

Navbar.displayName = 'Navbar component'

export default Navbar
