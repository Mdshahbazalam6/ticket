import React from 'react';
import { Image ,
    Popover,
    PopoverTrigger,
    Box,
    PopoverContent,
    PopoverHeader,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
    Text
} from '@chakra-ui/react'
import { useNavigate } from 'react-router';
import LogOut from './LogOut';
import Login from './Login';
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../redux/store';
import { getUser } from '../redux/action';
const clientId = '606317710896-18sj85brjib8t96ieed1pq17lc7gpdc9.apps.googleusercontent.com'

const Navbar = () => {
  const dispatch = useDispatch()
    const token = JSON.parse(localStorage.getItem("token"))
    const [loginStatus,setLoginStatus]=useState()
    useEffect(()=>{
      function start(){
        gapi.client.init({
          clientId:clientId,
          scope:''
        })
      }
      gapi.load("client:auth2",start);
    })
    console.log(token)
    const navigate = useNavigate()
    const handleSignin = ( ) =>{
       navigate('/signin')
    }

    const user = useSelector((store)=>store.user.data)
    console.log(user)
    const handleSignUp = ( ) =>{
        navigate('/signup')
    }
    React.useEffect(()=>{
      getLoggedIn()
    },[])
    
    function getLoggedIn(){
      let token = JSON.parse(localStorage.getItem("token"));
     console.log(token)
      let url = `http://localhost:8080/loogedinuser`;
      fetch(url,{
        method:"POST",
        body: JSON.stringify({
          token:token
        }),
        headers:{
          "Content-Type" : "application/json"
        }
      })
      .then(res=>res.json())
      .then((res)=>{
        console.log(res)
        dispatch(getUser(res))
        // navigate('/')
        
      })
      .catch((error)=>console.log(error))
    }
    const handleLogout = ( )=>{
      localStorage.clear()
      window.location.reload()
    }
    const NavigateToMyBooking =()=>{
     
      user ?  navigate('/mybookings') : alert('Sign in First')
    }
    const goToHome = ( )=>{
      navigate('/') 
    }
  return (
    <div style={{display:'flex',justifyContent:'space-between',alignItem:'center',padding:'0vw 2vw'}}>
    < Image src='https://tse2.mm.bing.net/th?id=OIP.tKH98cdrP1s8wA5OmsTN8AHaEK&pid=Api&P=0' alt='logo'
    width={'8vw'}
    onClick={goToHome}
    />
    <Popover>
  <PopoverTrigger>
    <Box
      tabIndex='0'
      role='button'
      aria-label='Some box'
      p={0}
      w='50px'
      children={ user ? user.name : 'My Account'}
      marginTop={'2vh'}
      width='10vw'
    />
  </PopoverTrigger>
  <PopoverContent bg='white' color='black'>
    <PopoverHeader fontWeight='semibold'>Customization</PopoverHeader>
    <PopoverArrow bg='pink.500' />
    <PopoverCloseButton  />
    <PopoverBody >
    <Image
  borderRadius='full'
  boxSize='40px'
  src='https://tse1.mm.bing.net/th?id=OIP.1nWRQ7r_1nEVJ6sdz_zwkwHaE8&pid=Api&rs=1&c=1&qlt=95&w=160&h=107'
  alt='user'
  margin='auto'
 
/>
{/* < Login />
< LogOut /> */}
{token ? <Text textAlign='center' margin={'.5vh'} onClick={handleSignin}>Login or SignUp</Text> :(
    <Text textAlign='center' margin={'.5vh'} onClick={handleSignUp}>Login or SignUp</Text>
)}
{
  token ?  <Text textAlign='center' margin={'.5vh'} onClick={handleLogout}>Log Out</Text> :<></>
}
{/* <Text textAlign='center' margin={'.5vh'} onClick={handleSignin}>Login or SignUp</Text> */}
<Text textAlign='center' margin={'.5vh'} onClick={NavigateToMyBooking}>My Bookings</Text>
<Text textAlign='center' margin={'.5vh'}>Print or cancel Bookings</Text>
    </PopoverBody>
  </PopoverContent>
</Popover>
    </div>
  )
}

export default Navbar