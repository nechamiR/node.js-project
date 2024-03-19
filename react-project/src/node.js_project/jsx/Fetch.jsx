import { useState,useEffect } from 'react';
const Fetch=()=>{
    debugger
    const [phptos,setPhotos]=useState([]);
    useEffect(()=>{
        debugger
        fetch('http://localhost:3002/Apartment/getAll')
        .then((res)=>{
            
            return res.json();
        })
        .then((data)=>{
            console.log("d",data);
            setPhotos(data.apartments);
        })
    },[]);
    return<>
    <div>
        {phptos.map((photo)=>(<img key={photo.image} alt={photo._id} width={100} />))}
       {phptos.map((photo1)=>(
         <h1>{photo1.image}</h1>
        ))}
    </div>
    </>
}
export default Fetch;