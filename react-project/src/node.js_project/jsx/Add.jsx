
import { AddApartment, DeleteApartment, addCity, getByAdvertiserId } from "../api";
import { useEffect, useState } from "react";
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
  Tooltip,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Icon,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import UpdateIcon from '@mui/icons-material/Update';
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
export const Add = () => {
  const url = "http://localhost:3002/";
  const navigate = useNavigate();

  const [apartments, setApartments] = useState([]);
  const [expandedCard, setExpandedCard] = useState(-1);
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const handleExpandClick = (index) => {
    setExpandedCard(index === expandedCard ? -1 : index); // עדכון המשתנה המקומי בהתאם לפעולת הפתיחה/הסגירה
  };

  function handleClickAddApartment() {
    debugger
    navigate('/AddApartment');
    console.log("sssee");
  }

  function handleClickAddCity() {
    debugger
    navigate('/AddCity');
    console.log("sssee");
  }

  function handleClickAddCategory() {
    debugger
    navigate('/AddCategory');
    console.log("sssee");
  }

  const advertiserData = JSON.parse(sessionStorage.getItem('advertiser'));
  const id = advertiserData._id;
  useEffect(() => {
    debugger
    const t = JSON.parse(sessionStorage.getItem('token'))
    getByAdvertiserId(id, t)
      .then((response) => {
        setApartments(response.data.apartments);
      })
      .catch((error) => {
        console.log("Error fetching apartments:", error);
      });
  }, []);
  const deleteApartment = (_id) => {
    debugger
    const t = JSON.parse(sessionStorage.getItem('token'))
    console.log(t);
    DeleteApartment(_id, t)
      .then(x => {
        console.log(x)
        swal.fire({
          title: 'הדירה שלך נמחקה בהצלחה',
          icon: 'success',
          confirmButtonText: 'אישור'
        });

      })
      .catch(err => {
        console.log("err");
        console.log(err);
      })

  }

  const handleClickUpdateApartment = (_id) => {
    navigate(`/UpdateApartment/${_id}`);
  }

  const DrawerList = (
    <Box sx={{ width: 250, marginTop: "20px" }} role="presentation" onClick={toggleDrawer(false)}>

      <div style={{ marginBottom: "20px", marginLeft: "55px" }}>

        <InputLabel onClick={handleClickAddApartment} id="apartment-filter-label">הוספת דירה</InputLabel>
        <InputLabel onClick={handleClickAddCity} id="city-filter-label">הוספת עיר</InputLabel>
        <InputLabel onClick={handleClickAddCategory} id="category-filter-label">הוספת קטגוריה</InputLabel>
      </div>
    </Box>
  );
  return <>
    <div>
      <Button onClick={toggleDrawer(true)} sx={{ bgcolor: "#16AEC8", color: "white", marginLeft: "1350px" }}>הוספה </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {apartments.map((apartment, index) => (

        <Card key={index} style={{ margin: "10px", maxWidth: "300px", display: "flex", flexDirection: "column" }}>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: "#16AEC8" }}></Avatar>}
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

            <Tooltip title="Delete">
              <IconButton aria-label="share" onClick={(() => deleteApartment(apartment._id))}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="update">
              <IconButton aria-label="share" onClick={(() => handleClickUpdateApartment(apartment._id))}>
                <UpdateIcon />
              </IconButton>
            </Tooltip>
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

  </>
};