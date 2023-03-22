import { React , useState} from 'react'
import {Box , TextField , Button, styled, Typography} from '@mui/material'
import Image from "./logo.png";


const Component = styled(Box)`
    width : 400px;
    margin : auto;
    box-shadow : 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`

const Logo = styled('img') ({
    width : 200,
    margin : 'auto',
    display : 'flex',
    padding : '50px 0 0'
})

const Wrapper = styled(Box)`
    padding : 10px 60px;
    display : flex;
    flex : 1;
    flex-direction : column;
    & > div, & > button , & > p {
        margin-top : 10px;
    }
`
const LoginButton = styled(Button)`
    background : #398378;
`
const SignUpButton = styled(Button)`
    color : #398378;
    box-shadow : 0 2px 4px 0  rgb(0 0 0/ 0.6);
`

const Text = styled(Typography)`
    color : #808080;
`

const Login = () => {

    const [account ,toggleAccount] = useState('login');

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

  return (
    <Component>
        <Box>
            <Logo src = {Image} alt = "Login"/>
        {
            account === 'login' ?

                <Wrapper>
                <TextField id="filled-basic" label="Enter Username" variant="standard" />
                <TextField id="filled-basic" label="Enter Password" variant="standard" />
                
                <LoginButton variant="contained">Login</LoginButton>
                <Text style={{textAlign:'center'}}>Or</Text>
                <SignUpButton variant="text" onClick={() => toggleSignup()}>Create an account</SignUpButton>
                </Wrapper> 

            :

            <Wrapper>
            <TextField id="filled-basic" label="Enter Name" variant="standard" />
            <TextField id="filled-basic" label="Enter Username" variant="standard" />
            <TextField id="filled-basic" label="Enter Password" variant="standard" />
            
            
            <SignUpButton>Signup</SignUpButton>
            <Text style={{textAlign:'center'}}>Or</Text>
            <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have  an account?</LoginButton>
            </Wrapper>
        }
        </Box>
    </Component>
  )
}

export default Login
