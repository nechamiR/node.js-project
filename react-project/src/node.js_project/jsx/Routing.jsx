
import React from "react";
import { Route, Routes } from "react-router";

import { SingUp } from "./SingUp";
import { Home } from "./Home";
import { AllApartments } from "./AllApartments";
import LoginAdvertiser from "./LoginAdvertiser";
import { Add } from "./Add";
import { AddApartment } from "./AddApartment";
import { AddCategory } from "./AddCategory";
import { AddCity } from "./AddCity";
import { UpdateApartment } from "./UpdateApartment";
export const Routing = () => {
    return <>  
        <Routes>
            <Route path='Login' element={<LoginAdvertiser />}></Route>
            <Route path='SingUp' element={<SingUp />}></Route>
            <Route path='Home' element={<Home />}></Route>
            <Route path='Apartments' element={<AllApartments />}></Route>
            <Route path='Add' element={<Add />}></Route>
            <Route path='AddApartment' element={<AddApartment />}></Route>
            <Route path='AddCategory' element={<AddCategory />}></Route>
            <Route path='AddCity' element={<AddCity />}></Route>
            <Route path='UpdateApartment/:id' element={<UpdateApartment />}></Route>

        </Routes>
    </>
}