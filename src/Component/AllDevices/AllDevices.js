import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../Global";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "../AllDevices/AllDevices.css"

 function AllDevices(){

    const [devices,setDevices] = useState("")
    const userId = localStorage.getItem("userId")
    const navigate = useNavigate()

    useEffect(()=>{
        getAllDevices()
    },[])

    const getAllDevices = async()=>{

        const value = await fetch(`${API}/device/getAll/${userId}`,{
          method : "GET",
          headers:{
           "Auth": localStorage.getItem("token")
          }
        })
  
        const res = await value.json()
  
        setDevices(res)
    }

    const deleteDevice = async(id)=>{
      
      try{
      let data = await fetch(`${API}/device/${id}`,{
        method:"DELETE",
        headers : {
          "Auth" : localStorage.getItem("token")
        }
     })
     let res = await data.json()
  
     if(data.status == 200){
       alert("device deleted successfully")
       getAllDevices()
     }
     }catch(err){
        alert(err.message)
     }
  
    }
  
    console.log(devices)
    return(
        <div className="device-container">
         
          { devices && devices.map((ele,index)=>{
              return(
                <Card sx={{ maxWidth: 345 }} className='card'>
    
                <CardContent>
                  
                  <Typography gutterBottom variant="h5" component="div">
                    {ele.deviceName}
                  </Typography>
                  
                 <Typography variant="body2" color="text.secondary" className='location'>
                   {ele.description}
                  </Typography>
                  
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={()=> navigate(`/editDevice/${ele._id}`)}>Edit</Button>
                  <Button size="small" onClick={()=> navigate(`/view/${ele._id}`)}>View-Reports</Button>
                  <Button size="small" onClick={()=> deleteDevice(ele._id)}>Delete</Button>
                </CardActions>
                    </Card>
              )
           })}

        </div>
    )
 }
 export default AllDevices;