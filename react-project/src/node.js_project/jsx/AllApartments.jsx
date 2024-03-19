

import React, { useState, useEffect } from "react";
import { getAllApartments, getByNumBedsBigFrom, getAllCities, getByCityId, getByCategoryId, getAllCatterory, DeleteApartment } from "../api";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Collapse,
  Avatar,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';

import Tooltip from '@mui/material/Tooltip';

import FilterAltIcon from '@mui/icons-material/FilterAlt';


export const AllApartments = () => {
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [filterByBeds, setFilterByBeds] = useState("");
  const [filterByCity, setFilterByCity] = useState("");
  const [filterByCategories, setFilterByCategories] = useState("");
  const [filterByPrice, setFilterByPrice] = useState("");
  const [open, setOpen] = useState(false);
  const [expandedCard, setExpandedCard] = useState(-1); // משתנה מקומי לאינדקס של הכרטיסיה הנפתחת

  const handleExpandClick = (index) => {
    setExpandedCard(index === expandedCard ? -1 : index); // עדכון המשתנה המקומי בהתאם לפעולת הפתיחה/הסגירה
  };
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const handleBedsFilterChange = (event) => {
    const selectedBeds = event.target.value;
    setFilterByBeds(selectedBeds);
  };
  const handleCityFilterChange = (event) => {
    const selectedCity = event.target.value;
    setFilterByCity(selectedCity);
  };

  const handleCategoryFilterChange = (event) => {
    const selectedCategory = event.target.value;
    setFilterByCategories(selectedCategory);
  };
  const handlePriceFilterChange = (event) => {
    const selectedPrice = event.target.value;
    setFilterByPrice(selectedPrice);
  };
  const filterApartments = () => {
    let filteredApartments = [...apartments];

    if (filterByBeds !== "") {
      filteredApartments = filteredApartments.filter(
        (apartment) => apartment.numberOfBeds >= parseInt(filterByBeds)
      );
    }

    if (filterByCity !== "") {
      filteredApartments = filteredApartments.filter(
        (apartment) => apartment.cityId === filterByCity
      );
   
    
    }

    if (filterByCategories !== "") {
      filteredApartments = filteredApartments.filter(
        (apartment) => apartment.categoryId === filterByCategories
      );
    }
    // סינון לפי מחיר
    if (filterByPrice !== "") {
      filteredApartments = filteredApartments.filter(
        (apartment) => apartment.price >= parseInt(filterByPrice)
      );
}
    return filteredApartments;
  };
 
 
  
  const DrawerList = (
    <Box sx={{ width: 250, marginTop:"20px"}} role="presentation" onClick={toggleDrawer(false)}>
      <div style={{ marginBottom: "20px",marginLeft:"55px" }}>
     <FormControl style={{ minWidth: "140px", marginRight: "20px" }}>
          <InputLabel id="city-filter-label">עיר</InputLabel>
          <Select
            labelId="city-filter-label"
            value={filterByCity}
            defaultValue="" 
            onChange={handleCityFilterChange}
          >
            <MenuItem value="">
              <em>כל הערים</em>
            </MenuItem>

            {
          cities && cities.map((item, index) =>
            <MenuItem key={item._id} value={item._id}>{item.cityName}</MenuItem>)
        }
          </Select>
        </FormControl>
        </div>
        <div style={{ marginBottom: "20px",marginLeft:"55px" }}>
         <FormControl style={{ minWidth: "140px", marginRight: "20px" }}>
          <InputLabel id="beds-filter-label">מספר מיטות</InputLabel>
          <Select
            labelId="beds-filter-label"
            value={filterByBeds}
            defaultValue="" 
            onChange={handleBedsFilterChange}
          >
            <MenuItem value="">
              <em>כל המספרים</em>
            </MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
            <MenuItem value={12}>12</MenuItem>
          </Select>
        </FormControl>
        </div>
        <div style={{ marginBottom: "20px",marginLeft:"55px" }}>
    
        <FormControl style={{ minWidth: "140px", marginRight: "20px" }}>
  <InputLabel id="demo-select-small-label">קטגוריה</InputLabel>
  <Select
    labelId="demo-select-small-label"
    id="demo-select-small"
    value={categories}
    label="Categories"
    defaultValue="" 
    onChange={handleCategoryFilterChange}
  >
    <MenuItem value="">
      <em>כל הקטגוריות</em>
    </MenuItem>
    {categories && categories.map((item, index) =>
      <MenuItem value={item._id}>{item.nameCategory}</MenuItem>)}
  </Select>
</FormControl>
</div>
 {/* Select for price filter */}
 <div style={{ marginBottom: "20px" ,marginLeft:"55px"}}>
 <FormControl style={{ minWidth: "140px", marginRight: "20px" }}>
          <InputLabel id="price-filter-label">מחיר</InputLabel>
          <Select
          
          id="price-filter-label"
            labelId="price-filter-label"
            value={filterByPrice}
            label="Price"
            defaultValue="" 
            onChange={handlePriceFilterChange}
          >
            <MenuItem value="">
              <em>כל מחיר</em>
            </MenuItem>
            <MenuItem value="800">Under 800</MenuItem>
            <MenuItem value="2000">Under 2000</MenuItem>
            {/* וכן הלאה לפי דרישותיך */}
          </Select>
        </FormControl>
    </div>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  
 
  const url = "http://localhost:3002/";

  useEffect(() => {
    getAllApartments()
      .then((response) => {
        setApartments(response.data.apartments);
      })
      .catch((error) => {
        console.log("Error fetching apartments:", error);
      });

    getAllCities()
      .then((response) => {
        setCities(response.data.city);
      })
      .catch((error) => {
        console.log("Error fetching cities:", error);
      });

    getAllCatterory()
      .then((response) => {
        setCategories(response.data.category);
      })
      .catch((error) => {
        console.log("Error fetching categories:", error);
      });
  }, []);

  const deleteApartment=(_id)=>{
    debugger
DeleteApartment(_id)
.then(x => {
  console.log(x)
    })
    .catch(err => {
      console.log("err");
      console.log(err);
    })

  }
 
  const renderApartments = () => {
    const filteredApartments = filterApartments();
    
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredApartments.map((apartment, index) => (
          
            <Card key={index} style={{ margin: "10px", maxWidth: "300px" , display: "flex", flexDirection: "column"}}>
            <CardHeader
              avatar={<Avatar sx={{ bgcolor:"#16AEC8" }}></Avatar>}
              title={apartment.name}
            />
            <CardMedia
              component="img"
              height="200"
              image={url + apartment.image}
              alt={apartment.name}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {apartment.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing style={{ marginTop: "auto" }}>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton >
                <ShareIcon />
              </IconButton>

              <IconButton
                aria-expanded={expandedCard === index}
                onClick={() => handleExpandClick(index)}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expandedCard === index} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Address: {apartment.address}</Typography>
                <Typography paragraph>Price: {apartment.price}</Typography>
                <Typography paragraph>Num Of Beds: {apartment.numberOfBeds}</Typography>
              </CardContent>
            </Collapse>
         
          </Card>
        ))}
     
   </div> 
       ); 
  };
 
   
  return (
    <div>
       <div>
      <Button onClick={toggleDrawer(true)}  sx={{ color:"#82887e",bgcolor:"#d9d9d9"  , marginLeft:"1350px" } }>...סינון דירות לפי
      <FilterAltIcon ></FilterAltIcon></Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>    
      {renderApartments()}
    </div>
  );
 
  

  
};
 

