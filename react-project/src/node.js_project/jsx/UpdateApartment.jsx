import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToUpDateApartment, getAllCatterory, getAllCities, getByCategoryId, getByCityId } from '../api';
import { Box, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
export const UpdateApartment = () => {
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
const handleChange1 = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
};
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
    const storedData =sessionStorage.getItem('advertiser'); 
    const dataObject = JSON.parse(storedData);
    const userId = dataObject._id;
    const t = JSON.parse(sessionStorage.getItem('token'))
    const { id } = useParams();
    const [formData, setFormData] = useState({
        
        name: '',
        description: '',
        adress: '',
        numberOfBeds: '',
        additives: '',
        price: '',
    });

     const handleSubmit = async (event) => {
         event.preventDefault();
        ToUpDateApartment(formData,id,t)
            .then(x => {
                Swal.fire({
                    icon: "success",
                    title: "Success!!",
                    text: "The apartment has been successfully updated",
                });
               
                console.log(x);
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "The system failed to update the apartment, try again and/or make sure you are connected",
                });
            })
    };
    return<>
        
      
     <form onSubmit={handleSubmit}>

         <Box className="login-form" sx={{ '& > :not(style)': { m: 1 } }}>
             {/* name */}                
               <InputLabel htmlFor="name-input">Name apartment📛</InputLabel>
         <Input type="text"  value={formData.name} onChange={handleChange1} id="name-input" name="name" />
             <br></br>
             <br></br>


             {/* description */}
            
         <InputLabel htmlFor="description-input">Description📃</InputLabel>
         <Input type="text"  value={formData.description} onChange={handleChange1} id="description-input" name="description" />  
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
                 <Input  id="address-input" name="adress" type="text"  value={formData.adress} onChange={handleChange1}></Input>
                 
             </Box>
            {/* number of beds */}
             <TextField
              value={formData.numberOfBeds} 
              onChange={handleChange1}
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
                     type="text"  value={formData.additives} onChange={handleChange1}
                         id="input-with-icon-adornment"
                         name="additives"
                     /> 
    
             
                   </Box>
             {/* price */}
            <TextField
              value={formData.price} 
              onChange={handleChange1}
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
             <Input type={'submit'} value={'to add the apartment'}></Input>

         </Box>
     </form>
     <br></br>
     <br></br>

 </>
}
