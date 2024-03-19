import axios from "axios";
//clinte
export const getClinte = (email,password) => {
    return axios.get(`http://localhost:3002/Client/login/${email}/${password}`);
  };
  export const AddClinte=(clinte)=>{
    return axios.post(`http://localhost:3002/Client/register`,clinte);
   };
  

  //Apartments
  export const getAllApartments = () => {
    return axios.get(`http://localhost:3002/Apartment/getAll`);
  };
  export const getById = (id) => {
    return axios.get(`http://localhost:3002/Apartment/${id}`);
  };
  export const getByCategoryId = (categoryId) => {
    return axios.get(`http://localhost:3002/Apartment/categoryId/${categoryId}`);
  };
  export const getByCityId = (cityid) => {
    return axios.get(`http://localhost:3002/Apartment/cityId/${cityid}`);
  };
  // export const getByAndvertesId = (andvertesId) => {
  //   return axios.get(`http://localhost:3002/Apartment/getByAdvertiserId/${andvertesId}`);
  // };
   
  export const getByNumBedsBigFrom = (num) => {
    return axios.get(`http://localhost:3002/Apartment/getByNumBedsBigFrom/${num}`);
  };
  export const getByNumBedsSmallFrom = (num) => {
    return axios.get(`http://localhost:3002/Apartment/getByNumBedsSmallFrom/${num}`);
  };
  export const getByNumBedsEqual = (num) => {
    return axios.get(`http://localhost:3002/Apartment/getByNumBedsEqual/${num}`);
  };
  export const getByAdvertiserId = (num,autoToken) => {
    return axios.get(`http://localhost:3002/Apartment/getByAdvertiserId/${num}`,{
      headers:{
        Authorization: ` Bearer ${autoToken}`,
      },
    });
  };
  export const getByPriceSmallFrom = (num) => {
    return axios.get(`http://localhost:3002/Apartment/getByPriceSmallFrom/${num}`);
  };
  export const getByPriceBigFrom = (num) => {
    return axios.get(`http://localhost:3002/Apartment/getByPriceBigFrom/${num}`);
  };
  export const ToAddNewApartment=(apartment,advertiserId,autoToken)=>{
    console.log(apartment , advertiserId ,autoToken);
   return axios.post(`http://localhost:3002/Apartment/create/${advertiserId}`,apartment,{
    headers:{
      Authorization: ` Bearer ${autoToken}`,
    },
  });
  };
  export const ToUpDateApartment=(apartment,id,autoToken)=>{
    console.log(apartment,id,autoToken);
    return axios.put(`http://localhost:3002/Apartment/update/${id}`,apartment,{
      headers:{
        Authorization: ` Bearer ${autoToken}`,
      },
    });
   };
   export const DeleteApartment=(id,autoToken)=>{
    return axios.delete(`http://localhost:3002/Apartment/${id}`,{
      headers:{
        Authorization: ` Bearer ${autoToken}`,
      },
    });
   };
  

//cities

export const  getAllCities= () => {
  return axios.get(`http://localhost:3002/City/`);
};
export const addCity=(idAdvertuiser,city,autoToken)=>{
  return axios.post(`http://localhost:3002/City/${idAdvertuiser}`,city,{
    headers:{
      Authorization: ` Bearer ${autoToken}`,
    },
  });
};
//category
export const getAllCatterory = () => {
  return axios.get(`http://localhost:3002/Category/`);
};
export const AddNewCategory=(idAdvertuiser,category,autoToken)=>{
  console.log(idAdvertuiser,autoToken,category);

  return axios.post(`http://localhost:3002/Category/create/${idAdvertuiser}`,category,{
    headers:{
      Authorization: ` Bearer ${autoToken}`,
    },
  });
};
//adventers
export const getAdvertiser = (email,password) => {
  return axios.get(`http://localhost:3002/Advertiser/login/${email}/${password}`);
};

export const AddAdvertiser=(ad)=>{
  return axios.post(`http://localhost:3002/Advertiser//register`,ad);
 };