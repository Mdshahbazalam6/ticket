import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
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
    Flex, Spacer,Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    InputGroup, InputRightElement
} from '@chakra-ui/react'
import Payment from './Payment';
import { getUser } from '../redux/action';
import { useNavigate } from 'react-router';

const BookNow = () => {
  let amount
    const BookingData = useSelector((store)=>store.Book)
    const[day1,setDay1]=useState(new Date())
    const[day2,setDay2]=useState(new Date())
    const[discount,setDiscount]=useState(0)

    const da1=day1.getDay()
      const da2=day2.getDay()

      let showingDay1=''

      if(da1 == 0){
        showingDay1='Sun'
      }else if(da1 == 1){
        showingDay1='Mon'
      }else if(da1 == 2){
        showingDay1='Tue'
      }else  if(da1 == 3){
        showingDay1='Wed'
      }else  if(da1 == 4){
        showingDay1='Thr'
      }else if(da1 == 5){
        showingDay1='Fri'
      }else if(da1 == 6){
        showingDay1='Sat'
      }


      let showingDay2=''

      if(da2 == 0){
        showingDay2='Sun'
      }else if(da2 == 1){
        showingDay2='Mon'
      }else if(da2 == 2){
        showingDay2='Tue'
      }else  if(da2 == 3){
        showingDay2='Wed'
      }else  if(da2 == 4){
        showingDay2='Thr'
      }else if(da2 == 5){
        showingDay2='Fri'
      }else if(da2 == 6){
        showingDay2='Sat'
      }

   

    const[calendarStatus,setCalendarStatus]=useState(false)
    const[popup,setPopup]=useState(false)

    console.log(BookingData)
    const check = ( ) =>{
        // console.log( day2.getFullYear(),day1.getFullYear(),day2.getMonth()+1,(day1.getMonth()+1))
        // console.log(day1.getFullYear())
        // console.log(new Date().getFullYear())
        // console.log   (((new Date().getMonth())+1)-(day1.getMonth()+1))
        // console.log((new Date().getMonth())+1)
        // console.log(day1.getMonth()+1)
        (day1.getFullYear() > new Date().getFullYear()) ? alert('please Select Date Properly') :
        ( (day1.getMonth()+1) -((new Date().getMonth())+1) < 0)? alert('please Select Date23 Properly') :
        (day1.getMonth()+1)-((new Date().getMonth())+1) <= 1 ? setDiscount(10) :
        (day1.getMonth()+1)-((new Date().getMonth())+1) <= 2 ? setDiscount(20) :
        (day1.getMonth()+1) - ((new Date().getMonth())+1)<= 3 ? setDiscount(30) : setDiscount(30)

        setCalendarStatus(!calendarStatus)
    }

  // let day = 
    const [show, setShow] = React.useState(false)
    const[card,setcard]=useState()
    const[name,setname]=useState()
    const[Year,setYear]=useState()
    const[CVV,setCVV]=useState()
    const handleClick = () => setShow(!show)
    const user = useSelector((store)=>store.user.data)
    console.log(user)
   
    const dispatch = useDispatch()
    const doPayment = ( amount) =>{
        fetch(`http://localhost:8080/book`,{
            method:"POST",
            body: JSON.stringify({
                postbody:{
                    ...user,
                    Item:{
                      airlines:BookingData.airlines,
                      from:BookingData.from,
                      to:BookingData.to,
                      fare:amount,
                      depart:BookingData.depart,
                      arrive:BookingData.arrive,
                      departureDate:day1.getFullYear()+' '+day1.getMonth(),
                    }
                }
            }),
            headers:{
                "Content-Type" : "application/json"
            }
        })
        .then((res)=>res.json())
        .then((res)=>dispatch(getUser(res)))
    
    }
//     "airlines":"Indigo",
//     "from":"Delhi",
//     "to":"Mumbai",
//     "fare":8000,
//     "depart":"15:00",
//     "arrive":"17:10"
// }
    // BookingData
    const navigate = useNavigate()
    const pay = ( ) =>{
        console.log(Year)
        const[year,month]=Year.split('-').map(Number)
        card.length != 14 ? alert('Length Of Card Number should be 14 '):
        name.length < 3 ? alert('Please Fill Your Name Correctly') :
        year < (new Date().getFullYear()) ?alert('please Check Year'):
        year == (new Date().getFullYear()) && month < ((new Date().getMonth())+1) ? alert('Check Your Month'):
        doPayment(amount)
        navigate('/')
    }
    console.log(amount)
    if(discount){
      amount =  BookingData.fare*(100-discount)/100
    }
   console.log(amount)
  return (
    <>
   
        <Flex border='2px solid #cecece' m='5vh'>
          <Box>
          <Text>Airline :</Text>
          <Text> {BookingData.airlines}</Text>
          </Box>
          <Spacer />
          <Box>
          <Text>from</Text>
          <Text>{BookingData.from}</Text>
          </Box>
          <Spacer />
         <Box>
         <Text>to </Text>
         <Text>{BookingData.to}</Text>
         </Box>
         <Spacer />
          <Box>
          <Text>Depart</Text>
          <Text>{BookingData.depart}</Text>
          </Box>
          <Spacer />
         <Box>
         <Text>Arrive</Text>
         <Text>{BookingData.arrive}</Text>
         </Box>
         <Spacer />
          <Box>
          <Text>Fare</Text>
          <Text>{amount ? amount: BookingData.fare}</Text>
          </Box>
          <Spacer />
          <Box>
          <Text onClick={()=>setCalendarStatus(!calendarStatus)} position='relative'>select A Date to Check Discount</Text>
          </Box>
          <Spacer />
        
          <Flex>
            <Text mr={'10'}>{showingDay1},{day1.getDate()}-{day1.getMonth()+1}-{day1.getFullYear()}</Text>
            
            {/* <Text>{showingDay2},{day2.getDate()}-{day2.getMonth()+1}-{day2.getFullYear()}</Text> */}
          </Flex>
          <Box width='10vw' ><Text  textAlign='center'fontWeight='800'><Button colorScheme='blue' onClick={check}>Check</Button></Text></Box>
          { calendarStatus ?  (
             <div className='Calendar_Box' style={{display:'flex',position:'fixed',top:'13vh',left:'45vw'}} >
             < Calendar onChange={setDay1}  value={day1} />
              {/* < Calendar  onChange={setDay2} value={day2} /> */}
             </div>
        ): ''}
        </Flex >
        {discount ? (<Box width='20vw' bg={'blue.500'} ml='5vw' borderRadius={'10px'} height='40vh'>Your DisCount is {discount}%
        <Text>Net Payable fee is <span  style={{color:"white",fontWeight:800}}>{amount ? amount: BookingData.fare}</span></Text>
        <Text>Proceed for Payment</Text>
        </Box>) : <></>}
          {/* <Payment /> */}

          <Box width={'24vw'} margin='auto' border='2px solid #cecece' mt={'20vh'} padding='4vh'>
                <FormControl isRequired margin='auto'>
                    <FormLabel>Card Number</FormLabel>
                    <Input placeholder='Enter Card Number' m={'0vh 2vh'} onChange={(e)=>setcard(e.target.value)} type='number' />
                    <FormLabel>Name On Card</FormLabel>
                    <Input type='text' m={'0vh 2vh'} onChange={(e)=>setname(e.target.value)} autocomplete="off" placeholder='Name On Card'/>
                    <FormLabel>Expiry(MM/YY)</FormLabel>
                    <Input type='month' m={'0vh 2vh'}   onChange={(e)=>setYear(e.target.value)} autocomplete="off" placeholder='Expiry(MM/YY)'/>
                    <FormLabel>CVV</FormLabel>
                    <Input type='password' m={'0vh 2vh'}   onChange={(e)=>setCVV(e.target.value)} autocomplete="off" placeholder='CVV' maxlength='4'/>
                    <Button
                        size='md'
                        height='35px'
                        width='200px'
                        border='2px'
                        borderColor='green.500'
                        ml={'4vw'}
                        mt='2vh'
                        onClick={pay}
                    >
                       Pay Now
                    </Button>
                </FormControl>

            </Box>

    </>
  )
}

export default BookNow