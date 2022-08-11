import React,{useState} from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Box, InputGroup, Button, InputRightElement
} from '@chakra-ui/react'

const Payment = () => {
    const [show, setShow] = React.useState(false)
    const[card,setcard]=useState()
    const[name,setname]=useState()
    const[Year,setYear]=useState()
    const[password2,setPassword2]=useState()
    const handleClick = () => setShow(!show)
    
    const pay = ( ) =>{
        console.log(Year)
        const[year,month]=Year.split('-').map(Number)
        card.length != 14 ? alert('Length Of Card Number should be 14 '):
        name.length < 3 ? alert('Please Fill Your Name Correctly') :
        year < (new Date().getFullYear()) ?alert('please Check Year'):
        year == (new Date().getFullYear()) && month < ((new Date().getMonth())+1) ? alert('Check Your Month'):
        <></>

    }
  return (
   <>
    <Box width={'24vw'} margin='auto' border='2px solid #cecece' mt={'20vh'} padding='4vh'>
                <FormControl isRequired margin='auto'>
                    <FormLabel>Card Number</FormLabel>
                    <Input placeholder='Enter Card Number' m={'0vh 2vh'} onChange={(e)=>setcard(e.target.value)} type='number' />
                    <FormLabel>Name On Card</FormLabel>
                    <Input type='text' m={'0vh 2vh'} onChange={(e)=>setname(e.target.value)} autocomplete="off" placeholder='Name On Card'/>
                    <FormLabel>Expiry(MM/YY)</FormLabel>
                    <Input type='month' m={'0vh 2vh'}   onChange={(e)=>setYear(e.target.value)} autocomplete="off" placeholder='Expiry(MM/YY)'/>
                    <FormLabel>CVV</FormLabel>
                    <Input type='password' m={'0vh 2vh'}   onChange={(e)=>setYear(e.target.value)} autocomplete="off" placeholder='CVV' maxlength='4'/>
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

export default Payment;