import axios from "axios"
import { useEffect, useState } from "react"
 import {ResponsiveContainer ,BarChart,CartesianGrid,XAxis,YAxis,Tooltip,Legend,Bar} from "recharts"
 
 const AverageChart=()=>{

  const [items,setItems]=useState({})


 
  

  const fetchItems=async()=>{
    const response= await axios.get("https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USD&limit=10").catch((err)=>{
           console.log("something is error")
    })

    //console.log(response.data.Data.Data)
    setItems(response.data.Data.Data)

}





useEffect(() => {
  const intervalId = setInterval(() => {
    fetchItems()
  }, 5000);
  return () => clearInterval(intervalId);
}, []);

//------average of low and mid------------
const average= items.length > 0 &&  items.map(item=>{

  return {...item,volumemid:(item.volumeto+item.volumefrom)/2}

})
//----------------------------
return(

  <ResponsiveContainer width="100%" height={300}>
  <BarChart  data={average}>
  <CartesianGrid  />
  <XAxis dataKey="time" />
  <YAxis />
  <Tooltip />
 
  <Legend />
  <Bar dataKey="volumeto" fill="#82ca9d" />
  <Bar dataKey="volumefrom" fill="red" />
  <Bar dataKey="volumemid" fill="yellow" />
 
</BarChart>
  </ResponsiveContainer>
)


 }
 export default AverageChart
