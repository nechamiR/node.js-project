
import { useState } from "react";
import { AddAdvertiser, AddClinte } from "../api";
import * as React from 'react';
import { TextField, Button, Box, Typography, InputLabel, Select, MenuItem } from '@mui/material';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const SingUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [additionalPhone, setAdditionalPhone] = useState('');
    const [userType, setUserType] = useState('client'); // משתנה שמציין את סוג המשתמש, ברירת מחדל הוא לקוח
    const navigate = useNavigate();

    const send = (event) => {
        event.preventDefault();
        const user = {
            email: email,
            password: password,
            phone: phone,
            additionalPhone: additionalPhone
        };
        const client = {
            email: email,
            password: password,
        }
        debugger
        sessionStorage.clear();

        if (userType === 'advertiser') {
            AddAdvertiser(user)
                .then(x => {

                    Swal.fire({
                        icon: "success",
                        title: "Welcome to Mogowa!!",
                        text: "",
                    });
                    navigate('/Login');
                })
                .catch(error => {
                    console.error(error);
                });
        }
        else {
            AddClinte(client)
                .then(x => {
                    Swal.fire({
                        icon: "success",
                        title: "Welcome to Mogowa!!",
                        text: "",
                    });
                    navigate('/Login');
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }

    return (

        <Box maxWidth={400} mx="auto" mt={5}>
            <Typography variant="h4" gutterBottom>
                Registration Form
            </Typography>
            <form onSubmit={send}>
                <InputLabel id="demo-select">User Type: </InputLabel>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    name="password"
                    required
                />
                {userType === 'advertiser' && (
                    <TextField
                        fullWidth
                        id="phone"
                        label="Phone"
                        type="number"
                        autoComplete="current-phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        margin="normal"
                        name="password"
                        required
                    />)}
                {userType === 'advertiser' && (
                    <TextField
                        fullWidth
                        id="additionalPhone"
                        label="Itional Phone"
                        type="number"
                        autoComplete="current-additionalPhone"
                        value={additionalPhone}
                        onChange={(e) => setAdditionalPhone(e.target.value)}
                        margin="normal"
                        name="password"
                        required
                    />)}
                <Button type="submit" variant="outlined" color="primary" sx={{ mt: 2 }}>
                    Register
                </Button>

            </form>
        </Box>
    );
}