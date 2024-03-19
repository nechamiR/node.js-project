
import { Input, InputLabel } from "@mui/material";
import { AddNewCategory } from "../api";
import Swal from "sweetalert2";

export const AddCategory = () => {

    const ToAddCategory = (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append('nameCategory', event.target[0].value);
        const storedData = sessionStorage.getItem('advertiser');
        const dataObject = JSON.parse(storedData);
        const userId = dataObject._id;
        const t = JSON.parse(sessionStorage.getItem('token'))
        debugger
        AddNewCategory(userId, formData, t)
            .then((addedCategory) => {
                Swal.fire({
                    icon: "success",
                    title: "Success!!",
                    text: "The categry has been successfully added",
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "The system failed to add the category, try again and/or make sure you are connected",
                });
            });
    }

    return <>



        <form onSubmit={(e) => ToAddCategory(e)}>
            <InputLabel htmlFor="name-input">Name category</InputLabel>
            <Input id="name-input" name="nameCategory" />
            <br></br>
            <br></br>

            <Input type={'submit'} value={'to add the category'}></Input>
        </form>

    </>
}