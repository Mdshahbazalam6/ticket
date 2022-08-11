import React, { useState } from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Box, InputGroup, Button, InputRightElement
} from '@chakra-ui/react'
import { useNavigate } from 'react-router'

const SignUp = () => {
    const [show, setShow] = React.useState(false)
    const [show2, setShow2] = React.useState(false)
    const[name,setName]=useState()
    const[email,setEmail]=useState()
    const[password,setPassword]=useState()
    const[password2,setPassword2]=useState()
    const handleClick = () => setShow(!show)
    const handleClick2 = () => setShow2(!show)

    const navigate = useNavigate()
    const signUp =  () => {
        const handle_create= async(name,email,password)=>{
            const payload={"postbody":{name,email,password,booked:[]}}
              console.log(payload)
             
            //  if(password==resetpassowrd){
              try {
              let res=await fetch(`http://localhost:8080/posts`,{
                  method:"post",
                  body:JSON.stringify(payload)
                  ,headers:{
                      "Content-Type": "application/json"
                  }
              })
            //   if()
              let user_data= await res.json()
              console.log(user_data)
             user_data.message == 'Bad Request User already exists' ? alert('user Exists') :  navigate('/signin')  
      
          } catch (error) {
            alert('User Exists')
              console.log(error)
          }
      }
    //   else{
    //       // alert("Password dosenot match")
    //   }
    

        !email.includes('@gmail.com') ? alert('please Check Your Email') : password.length < 8 ? alert('password should Contain atleast 8 Characters')  : !password.includes("@" || "#" || "$" || "%" || "^" || "&" || "*" ) ?(
            alert("password should contain some special Charectar")
        ) : !password.includes(1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9 || 0) ? alert("password should contain some number"): password == password2 ? handle_create(name,email,password) :alert("Password Does not match")

        
    }
const handleSignIn = ( )=>{
    navigate('/signin')  
}
    return (
        <>
            <Box width={'24vw'} margin='auto' border='2px solid #cecece' mt={'20vh'} padding='4vh'>
                <FormControl isRequired margin='auto'>
                    <FormLabel>name</FormLabel>
                    <Input placeholder='Enter name' m={'0vh 2vh'} onChange={(e)=>setName(e.target.value)}/>
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
 
                    <InputGroup size='md' width='22vw'>
                        <Input
                            pr='6rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                            m={'1vh 2vh'}
                            onChange={(e)=>setPassword2(e.target.value)}
                        />
                        <InputRightElement width='4.5rem' m={'0vh 2vh'}>
                            <Button h='1.75rem' size='sm' onClick={handleClick2} mt='2vh'>
                                {show2 ? 'Hide' : 'Show'}
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
                        onClick={signUp}
                    >
                        SignUp
                    </Button>
                    <Button
                        size='md'
                        height='35px'
                        width='200px'
                        border='2px'
                        borderColor='green.500'
                        ml={'4vw'}
                        mt='2vh'
                        onClick={handleSignIn}
                    >
                        Sign in
                    </Button>
                </FormControl>

            </Box>
        </>
    )
}

export default SignUp