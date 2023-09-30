import  { useEffect } from 'react'
import {columnsAndRowsFetch} from "../../api/user/userApi"
function TheatreSeats() {

useEffect(() => {
    async function fetchData() {
        const response =await columnsAndRowsFetch()
        console.log("response",response)
        return response
    }
    fetchData().then((data)=>{
        console.log("data",data)
    })

})


  return (
    <div></div>
  )
}

export default TheatreSeats