import React from 'react'
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
import { useNavigate } from 'react-router'
import { BookTicket } from '../redux/action'

const SearchResult = () => {
    const navigate = useNavigate()
    const searchedData = useSelector((store)=>store.search)
    const dispatch = useDispatch()
    const handleBook = ( ele ) =>{
        dispatch(BookTicket(ele))
        navigate('/booknow' )
    }
  return (
   <>
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
    searchedData?.map((ele)=>{
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
           
             <Box width='10vw' ><Text  textAlign='center'fontWeight='800'><Button colorScheme='blue' onClick={()=>handleBook(ele)}>Book Now</Button></Text></Box>
             <Spacer />
        </Flex>
        )
    })
   }
   </Box>
   </>
  )
}

export default SearchResult