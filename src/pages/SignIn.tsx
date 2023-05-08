import axios from '../utils/axios'
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { setDefaultAuth, signInGoogle } from '../redux/slices/userSlice'
import { useDispatch } from 'react-redux/es/exports'
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth'
import { useAppSelector } from '../hooks'
import googleIcon from '../assets/google.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Triangle } from 'react-loader-spinner'
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 55px);
  color: ${({ theme }) => theme.text};
`
const Wrapper = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  padding: 20px 50px;
  gap: 10px; 
  width: 350px;
`

const Title = styled.h1`
  font-size: 30px;
  font-weight: 900;
`
const Subtitle = styled.h3`
  font-size: 20px;
  font-weight: 300;
`
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.hrColor};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  font-size: 15px;
  &.red {
    border-color: #ff6262;
  }
  &:focus {
    outline: none;
  }
`
const Buttons = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  font-size: 18px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.hrColor};
  color: ${({ theme }) => theme.textSoft};
  &.white {
    background-color: inherit;
    border: 1px solid ${({ theme }) => theme.hrColor};
    border-radius: 50px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
const Icon = styled.img`
  height: 28px;
`
const More = styled.div`
  align-self: start;
  color: ${({ theme }) => theme.text};
`
const AbsoluteLoader = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
`
type signInParams = {
  darkMode: boolean;
}
const SignIn: React.FC<signInParams> = ({ darkMode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const pswdRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then(async (result: any) => {
        dispatch(signInGoogle({
          email: result.user.email,
          name: result.user.displayName,
          img: result.user.photoURL
        }))
        navigate('/');
      }).catch((error) => {
        console.log(error);
      })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("Please enter an email and password.");
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.post('/auth/signin', { email, password });
      setIsLoading(false);
      setDefaultAuth(res.data);
      navigate('/');
    } catch (error: any) {
      setIsLoading(false);
      if (error?.response?.data?.reason === 'email') {
        toast.error("User not found!");
        pswdRef.current!.classList.remove("red");
        emailRef.current!.classList.add("red");
        emailRef.current!.focus();
      }
      if (error?.response?.data?.reason === 'password') {
        toast.error("Wrong password!");
        emailRef.current!.classList.remove("red");
        pswdRef.current!.classList.add("red");
        pswdRef.current!.focus();
      }
    }
  }
  return (
    <Container>
      <Wrapper onSubmit={handleSubmit}>
        <Title>Sign In</Title>
        <Subtitle>We are really happy to see you again!</Subtitle>
        <Input ref={emailRef} value={email} onChange={(event) => setEmail(event.target.value)} type='email' placeholder='email' />
        <Input ref={pswdRef} value={password} onChange={(event) => setPassword(event.target.value)} type='password' placeholder='password' />
        <Subtitle>Have no <Link style={{ color: "lightblue" }} to="/signup">account</Link>?</Subtitle>
        <Buttons>
          <Button type='submit'>Sign in</Button>
          <Button className="white" type='button' onClick={signInWithGoogle}><Icon src={googleIcon} alt="googleauth" /></Button>
        </Buttons>
        <More>English(USA)</More>
      </Wrapper>
      <ToastContainer theme={darkMode ? "dark" : "light"} position="bottom-center" />
      {isLoading &&
        <AbsoluteLoader>
          <Triangle
            height="50"
            width="50"
            color="#F44336"
            ariaLabel="triangle-loading"
            wrapperStyle={{ justifyContent: "center" }}
            visible={true}
          />
        </AbsoluteLoader>
      }
    </Container>
  )
}

export default SignIn;