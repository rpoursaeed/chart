import axios from "axios"
import { useEffect, useState } from "react"
 import {ResponsiveContainer ,BarChart,CartesianGrid,XAxis,YAxis,Tooltip,Legend,Bar,Cell} from "recharts"
 
 const SmallChart=()=>{

  const [items,setItems]=useState({})
  const [activeIndex,SetactiveIndex]=useState(0)

 
  

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


const handleClick = (items, index) => {

    SetactiveIndex(index)

};




return(
  
   <>
  <ResponsiveContainer width="100%" height={300}>
  <BarChart  data={items}>
  <CartesianGrid  />
  <XAxis dataKey="time" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="volume" fill="#82ca9d"  onClick={handleClick} >
 
  {items.length > 0 &&  items.map((entry, index) => (
  <Cell cursor="pointer" fill={index === activeIndex ? '#82ca9d' : '#00cc0626'} key={`cell-${index}`} />
  ))}

  </Bar>

  </BarChart>
  </ResponsiveContainer>

 
  



  </>
)



 }
 export default SmallChart
