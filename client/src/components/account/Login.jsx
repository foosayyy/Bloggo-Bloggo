import { React , useState , useContext} from 'react'
import {Box , TextField , Button, styled, Typography} from '@mui/material'
import Image from "./logo.png";

import { API } from "../../service/api";
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';

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
const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const loginInitialValues = {
    Username : '',
    Password : ''
}

const signUpIntitalValues =  {
    Name : '',
    Username : '',
    Password : ''
}


const Login = ({ isUserAuthenticated }) => {

    const [account ,toggleAccount] = useState('login');

    const [signup, setSignup] = useState(signUpIntitalValues);

    const [error, setError] = useState('');

    const[login , setLogin] = useState(loginInitialValues);

    const {setAccount} = useContext(DataContext);

    const navigate = useNavigate();

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name] : e.target.value});
    }

    const signupUser = async () => {
       let response = await API.userSignup(signup);
       if(response.isSuccess) {
            setSignup(signUpIntitalValues);
            toggleAccount('login'); 
       }
       else {
            setError("Somrthing went wrong..Please try again!");
       }
    }   

    const onValueChange = (e) => {
        setLogin( {...login, [e.target.name] : e.target.value});
    }

    const loginUser = async() => {
        let response = await API.userLogin(login);
        if(response.isSuccess){
            setError('');
            sessionStorage.setItem(`accessToken` , `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem(`refreshToken` , `Bearer ${response.data.refreshToken}`);

            setAccount( {Username : response.data.Username , Name : response.data.Name});

            isUserAuthenticated(true);

            navigate('/');


        }else{
            setError("Something went wrong. Please try again later!");
        }
    }

  return (
    <Component>
        <Box> 
            <Logo src = {Image} alt = "Login"/>
        {
            account === 'login' ?

                <Wrapper>
                <TextField id="filled-basic" value={login.Username} label="Enter Username" variant="standard" name="Username" onChange={(e) => onValueChange(e)}/>
                <TextField id="filled-basic" value={login.Password} label="Enter Password" variant="standard" name="Password" onChange={(e) => onValueChange(e)}/>
                
                <LoginButton variant="contained" onClick={() => loginUser()}>Login</LoginButton>
                <Text style={{textAlign:'center'}}>Or</Text>
                <SignUpButton variant="text" onClick={() => toggleSignup()}>Create an account</SignUpButton>
                </Wrapper> 

            :

            <Wrapper>
            <TextField id="filled-basic" label="Enter Name" name= "Name" variant="standard" onChange={ (e) => onInputChange(e)}/>
            <TextField id="filled-basic" label="Enter Username" name="Username" variant="standard" onChange={ (e) => onInputChange(e)}/>
            <TextField id="filled-basic" label="Enter Password" name="Password" variant="standard" onChange={ (e) => onInputChange(e)}/>
            
            {error && <Error>{error}</Error>}
            <SignUpButton onClick={ () => signupUser()}>Signup</SignUpButton>
            <Text style={{textAlign:'center'}}>Or</Text>
            <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have  an account?</LoginButton>
            </Wrapper>
        }
        </Box>
    </Component>
  )
}

export default Login
