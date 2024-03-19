import { useEffect, useState } from "react";
import { ToAddNewApartment, getAllCatterory, getAllCities, getByCategoryId, getByCityId } from "../api";
import { Box, Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Swal from "sweetalert2";
import { FormControl } from "react-bootstrap";

export const AddApartment = () => {
    const [image, setImage] = useState()
    const [city, setCity] = useState()
    const [cityCode, setCityCode] = useState()
    const [category, setCategory] = useState()
    const [categoryId, setCategoryId] = useState()
    useEffect(() => {
    getAllCities()
    .then((response) => {
      setCity(response.data.city);
    })
    .catch((error) => {
      console.log("Error fetching cities:", error);
    });

  getAllCatterory()
    .then((response) => {
      setCategory(response.data.category);
    })
    .catch((error) => {
      console.log("Error fetching categories:", error);
    });
},[]);
      const handleChange = (event) => {
        debugger
      
        console.log("event==", event.target.value);
        getByCityId(event.target.value)
            .then(x => {
                setCityCode(event.target.value)
            })
            .catch(err => {
                console.log(err);
            })
    };
    const handleChanges = (event) => {
        debugger
        getByCategoryId(event.target.value)
       
            .then((x) => {
                console.log("event==", event.target.value);
                setCategoryId(event.target.value)
            })
            .catch((err) => {
              
                console.log("err==", err);
            })

    };
    const AddImage = (event) => {
        setImage(event.target.files[0])

    }
  
   
    const ToAddApartment = (event) => {
        debugger
        event.preventDefault()
        
        const storedData =sessionStorage.getItem('advertiser'); 
        const dataObject = JSON.parse(storedData);
        const userId = dataObject._id;
        const t = JSON.parse(sessionStorage.getItem('token'))
        const formData =  new FormData();
        formData.append('name', event.target.elements.name.value);
        formData.append('description', event.target.elements.description.value);
         formData.append('image', image);
         formData.append('categoryId', categoryId);
         formData.append('cityId', cityCode);
        formData.append('adress', event.target.elements.adress.value);
        formData.append('numberOfBeds', event.target.elements.numberOfBeds.value);
        formData.append('additives', event.target.elements.additives.value);
        formData.append('price', event.target.elements.price.value);
        formData.append('advertiserId',userId );
        console.log("formData", formData.get('image'));
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }        
        debugger
        ToAddNewApartment(formData,userId,t)
            .then(x => {
                Swal.fire({
                    icon: "success",
                    title: "Success!!",
                    text: "The apartment has been successfully added",
                });
                console.log(x);
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "The system failed to add the apartment, try again and/or make sure you are connected",
                });
            })
       
    }
    return <>
       
      
        <form onSubmit={(e) => ToAddApartment(e)}>

            <Box className="login-form" sx={{ '& > :not(style)': { m: 1 } }}>
                {/* name */}                
                  <InputLabel htmlFor="name-input">Name apartment📛</InputLabel>
            <Input id="name-input" name="name" />
                <br></br>
                <br></br>


                {/* description */}
               
            <InputLabel htmlFor="description-input">Description📃</InputLabel>
            <Input id="description-input" name="description" />             
             <br></br>
                <br></br>
                {/* תמונה */}
                <Input type="file" id="image-input" name="image" onChange={AddImage}>Upload a photo🖼️</Input>
                <br></br>
                <br></br>

                {/* קטגוריה */}
             
                    <InputLabel id="demo-simple-select-autowidth-label">Category💠</InputLabel>
                    <Select

                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        name="categoryId"
                        value={category}
                        onChange={handleChanges}
                        autoWidth
                        label="category">
                        {
                            category && category.map((item) => <MenuItem value={item._id}>{item.nameCategory}</MenuItem>
                            )}
      
      
                
              
              
                              </Select>
                {/* city */}
                    <InputLabel id="demo-simple-select-autowidth-label">city🌆</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        name="cityId"
                        value={city}
                        onChange={handleChange}
                        autoWidth
                        label="city">
                        {
                            city && city.map((item) => <MenuItem value={item._id}>{item.cityName}</MenuItem>
                            )}
                    </Select>
                {/* adress */}
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <InputLabel htmlFor="address-input">Address🏠</InputLabel>
                    <Input  id="address-input" name="adress"></Input>
                    
                </Box>
               {/* number of beds */}
                <TextField
                    id="filled-number"
                    label="Number of bed🛏️"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                    name="numberOfBeds"
                />
               {/* additives */}
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <InputLabel htmlFor="input-with-icon-adornment">
                            Additives➕
                        </InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            name="additives"
                        /> 
       
                
                      </Box>
                {/* price */}
               <TextField
                    id="filled-number"
                    label="Price💰"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                    name="price"
                /> 

                <br></br>
                <br></br>
                <br></br>
                {/* <Button type="submit" variant="contained">To add the apartment</Button> */}

                <Input type={'submit'} value={'to add the apartment'}></Input>

            </Box>
        </form>
        <br></br>
        <br></br>

    </>
}