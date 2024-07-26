import { useNavigate, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { API } from "../../Global";
import "../ViewData/ViewData.css"
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Button } from "@mui/material";


 function ViewData(){

    const [data,setData] = useState("")

    const {id} = useParams()
    console.log(id)

    const navigate = useNavigate()

    useEffect(()=>{
        getData()
    },[])

    const getData = async()=>{

        const value = await fetch(`${API}/data/getAll/${id}`,{
          method : "GET",
          headers:{
           "Auth": localStorage.getItem("token")
          }
        })
  
        const res = await value.json()
  
        setData(res)
    }

    console.log(data)

  const temperatures = data && data ?.map(ele => ele.temperature);
  const humidities = data && data ?.map(ele => ele.humidity);
  const labels = data && data ?.map((_, index) => `Point ${index + 1}`);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Temperature',
        data: temperatures,
        fill: false,
        borderColor: 'red',
        tension: 0.1
      },
      {
        label: 'Humidity',
        data: humidities,
        fill: false,
        borderColor: 'blue',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };


  const deleteFunction = async(id)=>{
      
    try{
    let data = await fetch(`${API}/data/${id}`,{
      method:"DELETE",
      headers : {
        "Auth" : localStorage.getItem("token")
      }
   })
   let res = await data.json()

   if(data.status == 200){
     alert("data deleted successfully")
     getData()
   }
   }catch(err){
      alert(err.message)
   }

  }

    return(
        <div className="viewData-container">
         <h2>Reports</h2>
         <Button onClick={()=>navigate(`/addData/${id}`)}>Add Data</Button>
         <table>
            <tr>
                <th>S.no</th>
                <th>Temperature</th>
                <th>Humidity</th>
                <th>Actions</th>
            </tr>
            <tbody>
            {data && data ?.map((ele,index)=>{
            return(
                <tr key={index}>
                   <td>{index+1}</td> 
                   <td>{ele.temperature}</td> 
                   <td>{ele.humidity}</td>
                   <td>
                    <Button onClick={()=>navigate(`/editData/${ele._id}`)}>Edit</Button>
                    <Button onClick={()=>deleteFunction(ele._id)}>Delete</Button>
                   </td>
                </tr>    
            )
         })}
            </tbody>
         </table>
        
        
         <div className="chart">
           <Line data={chartData} options={chartOptions}  />
        </div> 
        </div>
    )
 }

 export default ViewData;