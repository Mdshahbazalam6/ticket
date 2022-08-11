import React, { useState } from 'react'
import Navbar from './Navbar'
import { Image ,
    Popover,
    PopoverTrigger,
    Box,
    PopoverContent,
    PopoverHeader,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
    Text,
    Flex, Spacer,Button
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SearchData,BookTicket } from '../redux/action'
import { Navigate, useNavigate } from 'react-router'

const Home = () => {
const[data,setData]=useState()
const dispatch = useDispatch();
const[from,setFrom]=useState();
const[to,setTo]=useState()
const navigate = useNavigate()
useEffect(()=>{
    async function get(){
        try {
            let res = await fetch('http://localhost:8080/allflights')
            let flight = await res.json()
            console.log(flight)
            setData(flight.data)
        } catch (error) {
            console.log(error)
        }
    }
    get()
},[])
console.log(data)
const handleSearch = async( ) =>{
   try {
    const body = {"postbody":{from,to}}
    let res = await fetch('http://localhost:8080/searchflight',{
     method:"POST",
     body:JSON.stringify(body),
     headers:{
         "Content-Type": "application/json"
     }
    })
    let data = await res.json()
    console.log(data)
    dispatch(SearchData(data.data))
   } catch (error) {
    console.log(error)
   }

   navigate('/searchresult' )
}

// .search.data
const user = useSelector((store)=>store.search)
console.log(user,62)
const handleBooknow = (ele ) =>{
    dispatch(BookTicket(ele))
    navigate('/booknow' )
}
  return (
    <>
    {/* <Navbar /> */}
   
    <Box position={'relative'}>
    <Image src='https://tse2.mm.bing.net/th?id=OIP.Rt2az7wwVhQlGmbtQ6D1MAHaE8&pid=Api&P=0'
    width={'100vw'}
    height='50vh'
    />    
    </Box> 
    <div style={{position:'absolute',top:'25vh',left:'34vw'}}>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <input type="text" style={{width:'14vw',padding:'2vh 5vh',outline:'none',borderBottom:"2px",borderRadius:'10px',mr:'1vw',ml:'1vw'}} placeholder='From' onChange={(e)=>setFrom(e.target.value)}/>
        <input type="text" style={{width:'14vw',padding:'2vh 5vh',outline:'none',borderBottom:"2px",borderRadius:'10px'}} placeholder='To' onChange={(e)=>setTo(e.target.value)}/>
        <Button p={'2vh'} height='8vh' ml={'1vh'} onClick={handleSearch}>Search</Button>
        </div>
    </div>
    <Flex  padding='2vw' height='5vh' margin={'2vh 25vh'} alignItems='center'
            boxShadow='7px 4px 14px -3px rgba(0,0,0,0.75)'
            >
       <Box width='10vw' ><Text  textAlign='center'fontWeight='800'>AirLine</Text></Box>
             <Spacer />
             <Box width='10vw' ><Text  textAlign='center' fontWeight='800'>From</Text></Box>
             <Spacer />
             <Box width='10vw' ><Text  textAlign='center'fontWeight='800'>To</Text></Box>
             <Spacer />
             <Box width='10vw' ><Text  textAlign='center'fontWeight='800'>ARRIVE</Text></Box>
             <Spacer />
             <Box width='10vw' ><Text  textAlign='center'fontWeight='800'>DEPART</Text></Box>
             <Spacer />
             <Box width='10vw' ><Text  textAlign='center'fontWeight='800'>Fare</Text></Box>
             <Spacer />
             <Box width='10vw' ><Text  textAlign='center'fontWeight='800'>Book</Text></Box>
             <Spacer />
            </Flex>

      <Box height='62vh'
            overflowY='scroll'>     
   {
    data?.map((ele)=>{
        return(
            <Flex  padding='2vw' height='5vh' margin={'2vh 22vh'} alignItems='center'
            boxShadow='7px 4px 14px -3px rgba(0,0,0,0.75)'
            
            >
             <Box width='10vw' ><Text  textAlign='center'>{ele.airlines}</Text></Box>
             <Spacer />
             <Box width='10vw'><Text textAlign='center'>{ele.from}</Text></Box>
             <Spacer />
            <Box width='10vw'> <Text  textAlign='center'>{ele.to}</Text></Box>
             <Spacer />
             <Box width='10vw'><Text textAlign='center'>{ele.arrive}</Text></Box>
             <Spacer />
             <Box width='10vw'><Text textAlign='center'>{ele.depart}</Text></Box>
             <Spacer />
             <Box width='10vw' ><Text  textAlign='center'fontWeight='800'>₹{ele.fare}</Text></Box>
             <Spacer />
           
             <Box width='10vw' ><Text  textAlign='center'fontWeight='800'><Button colorScheme='blue' onClick={()=>handleBooknow(ele)}>Book Now</Button></Text></Box>
             <Spacer />
        </Flex>
        )
    })
   }
   </Box> 
    </>
  )
}

export default Home
 