import { Input, InputLabel } from "@mui/material";
import { addCity } from "../api";
import Swal from "sweetalert2";

export const AddCity = () => {

    const ToAddCity = (event) => {
        event.preventDefault()
        const storedData = sessionStorage.getItem('advertiser');
        const dataObject = JSON.parse(storedData);
        const userId = dataObject._id;
        const t = JSON.parse(sessionStorage.getItem('token'))
        const formData = new FormData();
        debugger
        formData.append('cityName', event.target[0].value);
        console.log("data11", formData);

        addCity(userId, formData, t)
            .then((addedCity) => {
                Swal.fire({
                    icon: "success",
                    title: "Success!!",
                    text: "The city has been successfully added",
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "The system failed to add the city, try again and/or make sure you are connected",
                });
            });
    }

    return <>



        <form onSubmit={(e) => ToAddCity(e)}>
            <InputLabel htmlFor="name-input">Name city</InputLabel>
            <Input id="name-input" name="cityName" />
            <br></br>
            <br></br>

            <Input type={'submit'} value={'to add the city'}></Input>
        </form>

    </>
}