import { GoogleLogin } from 'react-google-login'
const clientId = '606317710896-18sj85brjib8t96ieed1pq17lc7gpdc9.apps.googleusercontent.com'

function Login ( ){
  const onSuccess = ( res )=>{
    console.log("LOGIN SUCCESS! res: ", res.profileObj)
  }

  const onFailure = ( res )=>{
    console.log("LOGIN FAILED! res: ", res)
  }

    return(
        <div id='signInButton'>
         <GoogleLogin 
         clientId={clientId}
         buttonText='Login'
         onSuccess={onSuccess}
         onFailure={onFailure}
         cookiePolicy={'single_host_origin'}
         isSignedIn={true}
         
         />
        
    </div>
    )
} 

export default Login;