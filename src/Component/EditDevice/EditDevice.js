

import { useState,useEffect } from "react";
import {useFormik} from "formik";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate,useParams } from "react-router-dom";
import * as yup from "yup";
import { API } from "../../Global";



const deviceValidationSchema = yup.object({
    deviceName:yup.string().required(),
    description : yup.string().required()
    
   });

   function EditDevice(){
     
    const {id} = useParams();
    const[data,setData]=useState(null)
  
    useEffect(()=>{
       getSingle()
    },[])
    
    const getSingle = async()=>{
        const data = await fetch(`${API}/device/${id}`,{
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
       
       { data ? <EditDeviceForm data={data}/>:"Loading..."}
    </div>
 )
}


function EditDeviceForm({ data }) {
    
    const navigate = useNavigate();
  
    const formik = useFormik({

      initialValues: {
        deviceName: data.deviceName,
        description: data.description,
      },

      validationSchema: deviceValidationSchema,

      onSubmit: async (newData) => {
        try {
          const response = await fetch(`${API}/device/${data._id}`, {
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
            alert('Device updated successfully');
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
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    );
  }
  
 export default EditDevice;