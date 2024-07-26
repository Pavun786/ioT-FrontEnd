import { useEffect, useState } from "react";
import {useFormik} from "formik";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import "../AddData/AddData.css"
import {API} from "../../Global.js";


const deviceValidationSchema = yup.object({
 deviceName:yup.string().required(),
 description : yup.string().required()
 
});

function AddDevice(){

  const navigate =useNavigate()
  

  const formik = useFormik({
   
    initialValues:{
        deviceName: "",
        description: "",
  },

    validationSchema:deviceValidationSchema,
    
    onSubmit:(newData)=>{
        newData.userId = localStorage.getItem("userId") 
        console.log(newData)
       addDevice(newData);
     }
  
  })

   const addDevice = async(newData) => { 

      const data = await fetch(`${API}/device/create`,{
           method:"POST",
           body:JSON.stringify(newData),
           headers:{
            "Content-Type": "application/json",
            "Auth": localStorage.getItem("token")
          }
    })
     const res = await data.json()
     
     navigate(`/home`)
    
  } 
    
  return(
      <form className="smallBox" onSubmit={formik.handleSubmit}>
       <h2>Add-Data Form</h2>
      <TextField 
       label="DeviceName"
       value={formik.values.deviceName}
       name="deviceName"
       onChange={formik.handleChange}
       onBlur={formik.handleBlur}
       error={formik.touched.deviceName && formik.errors.deviceName} 
       helperText={formik.touched.deviceName && formik.errors.deviceName ? formik.errors.deviceName : null}
      /> 

      <TextField 
       label="Description"
       value={formik.values.description}
       name="description"
       onChange={formik.handleChange}
       onBlur={formik.handleBlur}
       error={formik.touched.description && formik.errors.description} 
       helperText={formik.touched.description && formik.errors.description ? formik.errors.description : null}
      /> 

      <Button variant="contained" type="submit">Create</Button>
        
    </form>
  
    )
  }
  export default AddDevice;