import { NavLink } from "react-router-dom"
import "../css/StyleNav.css"

export const Nav = () => {
    return <>

        <div className={'nav'}>
            <NavLink to='Home' className={'link'}>Home</NavLink>
            <NavLink to='Login' className={'link'}>Login</NavLink>
            <NavLink to='SingUp' className={'link'}>SingUp</NavLink>
            <NavLink to='Apartments' className={'link'}>All apartments</NavLink>
            {sessionStorage.getItem('advertiser') ? <NavLink to='Add' className={'link'}>domain</NavLink> : ""}

        </div>
    </>
}