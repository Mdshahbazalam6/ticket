import React, { useState } from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Box, InputGroup, Button, InputRightElement
} from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router'
import { getUser } from '../redux/action'
const SignIn = () => {
  const dispatch = useDispatch()
  const [show, setShow] = React.useState(false)
  const[email,setEmail]=useState()
  const[password,setPassword]=useState()
  const handleClick = () => setShow(!show)
  const navigate = useNavigate()
  
  const Login = async( ) =>{
      const payload = { postbody: { email, password } };
      try {
        let res = await fetch(`http://localhost:8080/login`, {
          method: 'post',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        let user_data = await res.json();
        console.log(user_data);
        localStorage.setItem('token', JSON.stringify(user_data.data.token));
      //   if(user_data.data.token){
          getLoggedIn()
          navigate('/')
      //   }
      } catch (error) {
        alert('Incorrect Email or Password')
      }
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

  const gettoken = async () => {
    let token = (localStorage.getItem('token'));

    try {
      let res = await fetch(`http://localhost:8080/loogedinuser`, {
        method: 'post',
        body: JSON.stringify({ token: token }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let token_res = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
        <Box width={'24vw'} margin='auto' border='2px solid #cecece' mt={'20vh'} padding='4vh'>
            <FormControl isRequired margin='auto'>
                <FormLabel>Email address</FormLabel>
                <Input type='email' m={'0vh 2vh'} onChange={(e)=>setEmail(e.target.value)} autocomplete="off"/>
                <FormHelperText>We'll never share your email.</FormHelperText>

                <InputGroup size='md' width='22vw'>
                    <Input
                        pr='6rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                        m={'1vh 2vh'}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem' m={'0vh 2vh'}>
                        <Button h='1.75rem' size='sm' onClick={handleClick} mt='2vh'>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>


                <Button
                    size='md'
                    height='35px'
                    width='200px'
                    border='2px'
                    borderColor='green.500'
                    ml={'4vw'}
                    mt='2vh'
                    onClick={Login}
                >
                    Sign In
                </Button>
            </FormControl>

        </Box>
    </>
)
}

export default SignIn