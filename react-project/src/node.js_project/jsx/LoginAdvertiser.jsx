

import { useState } from "react";
import { getAdvertiser, getClinte } from "../api";

import * as React from 'react';

import { Button, Box, Typography } from '@mui/material';

import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const LoginAdvertiser = () => {
  const [userType, setUserType] = useState('client'); // משתנה שמציין את סוג המשתמש, ברירת מחדל הוא לקוח
  const navigate = useNavigate();

  const hendleSubmit = (event) => {
    debugger
    event.preventDefault();
    const user = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    };

    sessionStorage.clear();

    if (userType === 'advertiser') { // אם המשתמש הוא מפרסם
      getAdvertiser(user.email, user.password)
        .then(x => {
          debugger
          sessionStorage.setItem('advertiser', JSON.stringify(x.data.advertiser));

          var e = sessionStorage.getItem('advertiser');
          console.log("advertiser", e);
          sessionStorage.setItem('token', JSON.stringify(x.data.token))
          var t = sessionStorage.getItem('token')
          navigate('/Add');
        })
        .catch((err) => {
          debugger
          console.log(err);
        });
    }
    else { // אם המשתמש הוא לקוח
      getClinte(user.email, user.password)
        .then(x => {
          debugger
          sessionStorage.setItem('client', JSON.stringify(x.data.client));
          var e = sessionStorage.getItem('client');
          console.log("client", e);
          navigate('/Home');
        })
        .catch((err) => {
          debugger
          console.log(err);
        });
    }
  }



  return (
    <Box maxWidth={400} mx="auto" mt={5}>
      <Typography variant="h4" gutterBottom>
        Login Form
      </Typography>
      <form onSubmit={hendleSubmit}>
        <InputLabel id="demo-select" variant="h3" >User Type: </InputLabel>
        <Select
          fullWidth
          labelId="select-label"
          id="select"
          value={userType}
          label="Categories"
          onChange={(e) => setUserType(e.target.value)}
        >

          <MenuItem value="client">Client</MenuItem>
          <MenuItem value="advertiser">Advertiser</MenuItem>
        </Select>


        <TextField
          fullWidth

          id="email"
          autoComplete="current-email"

          margin="normal"
          label="Email"
          type="email"
          name="email"
          required
        />
        <TextField
          fullWidth
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"

          margin="normal"
          name="password"
          required
        />

        <Button type="submit" variant="outlined" color="primary" value={'send'} sx={{ mt: 2 }}>
          Login
        </Button>


      </form>
    </Box>
  );
}

export default LoginAdvertiser;