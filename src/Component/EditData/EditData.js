

import { useState,useEffect } from "react";
import {useFormik} from "formik";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate,useParams } from "react-router-dom";
import * as yup from "yup";
import { API } from "../../Global";



const dataValidationSchema = yup.object({
    temperature:yup.string().required(),
    humidity : yup.number().required()
    
   });

   function EditData(){
     
    const {id} = useParams();
    const[data,setData]=useState(null)
  
    useEffect(()=>{
       getSingle()
    },[])
    
    const getSingle = async()=>{
        const data = await fetch(`${API}/data/${id}`,{
            method:"GET",
            headers : {
                "Auth" : localStorage.getItem("token")
              }
            })
        const res = await data.json()
        setData(res)  
    }
    console.log(data)
return(
    <div>
       
       { data ? <EditDataForm data={data}/>:"Loading..."}
    </div>
 )
}


function EditDataForm({ data }) {
    const navigate = useNavigate();
  
    const formik = useFormik({
      initialValues: {
        temperature: data.temperature,
        humidity: data.humidity,
      },
      validationSchema: dataValidationSchema,
      onSubmit: async (newData) => {
        try {
          const response = await fetch(`${API}/data/${data._id}`, {
            method: 'PUT',
            body: JSON.stringify(newData),
            headers: {
              'Content-Type': 'application/json',
              'Auth': localStorage.getItem('token'),
            },
          });
          const res = await response.json();
          console.log(res);
          if (response.status === 200) {
            alert('Data Updated successfully');
            navigate('/home');
          }
        } catch (err) {
          alert(err.message);
        }
      },
    });
  
    return (
      <form className="smallBox" onSubmit={formik.handleSubmit}>
        <h2>Edit Form</h2>
        <TextField
          label="Temperature"
          value={formik.values.temperature}
          name="temperature"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.temperature && Boolean(formik.errors.temperature)}
          helperText={formik.touched.temperature && formik.errors.temperature ? formik.errors.temperature : null}
        />
        <TextField
          label="Humidity"
          value={formik.values.humidity}
          name="humidity"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.humidity && Boolean(formik.errors.humidity)}
          helperText={formik.touched.humidity && formik.errors.humidity ? formik.errors.humidity : null}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    );
  }
  
 export default EditData ;