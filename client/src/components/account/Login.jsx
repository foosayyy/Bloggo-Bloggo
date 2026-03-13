import React, { useState, useContext, useEffect } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    styled,
    IconButton,
    CircularProgress,
    Divider
} from "@mui/material";

import { motion } from "framer-motion";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";

import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";

import Logo from "./logo.png";


const Page = styled(Box)`
  height:100vh;
  width:100%;
  position:relative;
  overflow:hidden;
`;

const Background = styled(Box)`
  position:absolute;
  inset:0;
  pointer-events:none;
`;

const Content = styled(Box)`
  position:relative;
  height:100%;
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:40px;
  box-sizing:border-box;

  background:linear-gradient(
    120deg,
    #f5f5f7,
    #eef2ff,
    #f5f5f7
  );
`;

const Shape = styled(motion.div)`
  position:absolute;
  width:700px;
  height:700px;
  border-radius:50%;
  filter:blur(120px);
  opacity:.55;
`;

const Layout = styled(Box)`
  width:100%;
  max-width:1200px;
  display:flex;
  gap:120px;

  @media(max-width:900px){
    flex-direction:column;
    gap:60px;
  }
`;

const Hero = styled(motion.div)`
  flex:1;
  display:flex;
  flex-direction:column;
  justify-content:center;
`;

const Title = styled(Typography)`
  font-size:60px;
  font-weight:700;
  line-height:1.05;
  color:#1d1d1f;
  margin-bottom:24px;
`;

const Subtitle = styled(Typography)`
  font-size:20px;
  color:#6e6e73;
  margin-bottom:40px;
`;

const Feature = styled(Typography)`
  font-size:16px;
  margin-bottom:8px;
`;

const HeroImage = styled(motion.div)`
  margin-top:48px;
  width:420px;
  height:240px;
  border-radius:22px;
  background:url("https://images.unsplash.com/photo-1501785888041-af3ef285b470") center/cover;
  box-shadow:0 20px 40px rgba(0,0,0,.08);
`;

const CardWrapper = styled(Box)`
  flex:1;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const Card = styled(motion.div)`
  width:420px;
  padding:48px;
  border-radius:28px;
  background:rgba(255,255,255,.9);
  backdrop-filter:blur(20px);
  border:1px solid rgba(0,0,0,.06);
  display:flex;
  flex-direction:column;
  gap:24px;
  box-shadow:0 20px 50px rgba(0,0,0,.08);
`;

const LogoImage = styled("img")`
  width:72px;
  margin:auto;
`;

const ToggleRow = styled(Box)`
  display:flex;
  justify-content:center;
  gap:16px;
`;

const Toggle = styled(Button)`
  text-transform:none;
  font-weight:600;
`;

const Footer = styled(Box)`
  display:flex;
  justify-content:space-between;
  font-size:12px;
  color:#6e6e73;
`;

const NameReserve = styled(Box)`
  height:56px;
`;

const Input = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius:12px;
    background:rgba(245,245,247,.8);
  }

  & .MuiOutlinedInput-root.Mui-focused {
    background:white;
    box-shadow:0 0 0 3px rgba(0,113,227,.15);
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color:rgba(0,0,0,.08);
  }

  & .Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color:#0071e3;
  }
`;

const Login = () => {

    const { setAccount } = useContext(DataContext);

    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [data, setData] = useState({
        name: "",
        username: "",
        password: ""
    });

    useEffect(() => {
        const input = document.getElementById("username");
        if (input) input.focus();
    }, []);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const loginUser = async () => {
        setLoading(true);
        try {
            const response = await API.login(data);
            if (response.isSuccess) {
                sessionStorage.setItem("accessToken", response.data.accessToken);
                sessionStorage.setItem("refreshToken", response.data.refreshToken);
                setAccount({ username: data.username });
            }
        } catch {
            setError("Login failed");
        }
        setLoading(false);
    };

    const signupUser = async () => {
        setLoading(true);
        try {
            const response = await API.signup(data);
            if (response.isSuccess) {
                setIsLogin(true);
            }
        } catch {
            setError("Signup failed");
        }
        setLoading(false);
    };

    return (

        <Page>

            <Background>

                <Shape
                    style={{
                        background: "radial-gradient(circle,#0071e3 0%,transparent 70%)",
                        top: "-250px",
                        left: "-250px"
                    }}
                    animate={{ y: [0, 60, 0] }}
                    transition={{ duration: 12, repeat: Infinity }}
                />

                <Shape
                    style={{
                        background: "radial-gradient(circle,#5ac8fa 0%,transparent 70%)",
                        bottom: "-250px",
                        right: "-250px"
                    }}
                    animate={{ y: [0, -60, 0] }}
                    transition={{ duration: 14, repeat: Infinity }}
                />

            </Background>


            <Content>

                <Layout>

                    <Hero
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: .8 }}
                    >

                        <Title>Blog your journey.</Title>

                        <Subtitle>
                            Capture and share stories from every place you explore.
                        </Subtitle>

                        <Feature>Write travel stories</Feature>
                        <Feature>Track places you visited</Feature>
                        <Feature>Share travel photos</Feature>

                        <HeroImage whileHover={{ scale: 1.04 }} />

                    </Hero>


                    <CardWrapper>

                        <Card
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: .8 }}
                        >

                            <LogoImage src={Logo} />

                            <ToggleRow>

                                <Toggle
                                    variant={isLogin ? "contained" : "text"}
                                    onClick={() => setIsLogin(true)}
                                >
                                    Login
                                </Toggle>

                                <Toggle
                                    variant={!isLogin ? "contained" : "text"}
                                    onClick={() => setIsLogin(false)}
                                >
                                    Register
                                </Toggle>

                            </ToggleRow>

                            <NameReserve>
                                {!isLogin && (
                                    <Input
                                        label="Name"
                                        name="name"
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                )}
                            </NameReserve>

                            <Input
                                id="username"
                                label="Username"
                                name="username"
                                onChange={handleChange}
                                fullWidth
                            />

                            <Input
                                label="Password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                onChange={handleChange}
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    )
                                }}
                            />

                            {error && <Typography color="error">{error}</Typography>}

                            <Button
                                variant="contained"
                                onClick={isLogin ? loginUser : signupUser}
                                sx={{
                                    height: 52,
                                    borderRadius: "12px",
                                    fontWeight: 600,
                                    background: "#0071e3"
                                }}
                            >

                                {loading
                                    ? <CircularProgress size={24} color="inherit" />
                                    : isLogin ? "Login" : "Create Account"}

                            </Button>

                            <Divider>or</Divider>

                            <Button
                                variant="outlined"
                                startIcon={<GoogleIcon />}
                                sx={{ height: 50, borderRadius: "12px" }}
                            >
                                Continue with Google
                            </Button>

                            <Footer>

                                <span>Privacy</span>
                                <span>Terms</span>
                                <span>Support</span>

                            </Footer>

                        </Card>

                    </CardWrapper>

                </Layout>

            </Content>

        </Page>

    );

};

export default Login;