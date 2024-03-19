import React, { useRef } from "react";
import { Outlet, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

export const Contact = () => {


    return <>
       
        <NavLink to='login' className={'link'}>Login</NavLink>
        <NavLink to='register' className={'link'}>Register</NavLink>
        <NavLink to='Apartments' className={'link'}>All apartments</NavLink>

              <Outlet></Outlet>



    </>
}