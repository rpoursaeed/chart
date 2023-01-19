import axios from "axios"
import { useEffect, useState } from "react"
 import {ResponsiveContainer ,BarChart,CartesianGrid,XAxis,YAxis,Tooltip,Legend,Bar,Cell} from "recharts"
 
 const SmallChart=()=>{

  const [items,setItems]=useState({})


 
  

  const fetchItems=async()=>{
    const response= await axios.get("https://min-api.cryptocompare.com/data/exchange/histohour?tsym=BTC&limit=10").catch((err)=>{
           console.log("something is error")
    })

    //console.log(response.data)
    setItems(response.data.Data)

}

useEffect(() => {
  const intervalId = setInterval(() => {
    fetchItems()
  }, 5000);
  return () => clearInterval(intervalId);
}, []);


const handleClick =(info)=>{
console.log(info)
}




return(
  
   <>
  <ResponsiveContainer width="100%" height={300}>
  <BarChart  data={items}>
  <CartesianGrid  />
  <XAxis dataKey="time" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="volume" fill="#82ca9d"  onClick={(value)=>handleClick(value)} />
 
</BarChart>
  </ResponsiveContainer>


  </>
)



 }
 export default SmallChart
