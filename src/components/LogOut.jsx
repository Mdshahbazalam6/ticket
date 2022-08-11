import { GoogleLogout } from 'react-google-login'
const clientId = '606317710896-18sj85brjib8t96ieed1pq17lc7gpdc9.apps.googleusercontent.com'

function LogOut ( ){
const onSuccess = (  )=>{
    console.log("LOG OUT SUCCESSFULLY!")
}

    return(
        <div id='signOutButton'>
          <GoogleLogout 
          clientId={clientId}
          buttonText='Log Out'
          onLogoutSuccess={onSuccess}
          
          />

        </div>
    )
}

export default LogOut;