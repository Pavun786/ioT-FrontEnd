import { useEffect, useState } from "react";
import {useFormik} from "formik";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import "../AddData/AddData.css"
import {API} from "../../Global.js";


const dataValidationSchema = yup.object({
 temperature:yup.string().required(),
 humidity : yup.number().required()
 
});

function AddData(){

  const navigate =useNavigate()
  const {Id} = useParams()

  const formik = useFormik({
   
    initialValues:{
        temperature: "",
        humidity:"",
    },

    validationSchema:dataValidationSchema,
    
    onSubmit:(newData)=>{
        newData.id = Id 
        console.log(newData)
       addData(newData);
     }
  
  })

   const addData = async(newData) => { 

      const data = await fetch(`${API}/data/create`,{
           method:"POST",
           body:JSON.stringify(newData),
           headers:{
            "Content-Type": "application/json",
            "Auth": localStorage.getItem("token")
          }
    })
     const res = await data.json()
     
     navigate(`/view/${Id}`)
    
  } 
    
  return(
      <form className="smallBox" onSubmit={formik.handleSubmit}>
       <h2>Add-Data Form</h2>
      <TextField 
       label="Temperature"
       value={formik.values.temperature}
       name="temperature"
       onChange={formik.handleChange}
       onBlur={formik.handleBlur}
       error={formik.touched.temperature && formik.errors.temperature} 
       helperText={formik.touched.temperature && formik.errors.temperature ? formik.errors.temperature : null}
      /> 

      <TextField 
       label="Humidity"
       value={formik.values.humidity}
       name="humidity"
       onChange={formik.handleChange}
       onBlur={formik.handleBlur}
       error={formik.touched.humidity && formik.errors.humidity} 
       helperText={formik.touched.humidity && formik.errors.humidity ? formik.errors.humidity : null}
      /> 

      <Button variant="contained" type="submit">Submit</Button>
        
    </form>
  
    )
  }
  export default AddData ;