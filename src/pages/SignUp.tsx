import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { setDefaultAuth, setSignUp } from '../redux/slices/userSlice'
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../utils/axios';
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
  transition: border 0.25s ease-in-out;
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
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  font-size: 18px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.hrColor};
  color: ${({ theme }) => theme.textSoft};
`
const AbsoluteLoader = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
`
const More = styled.div`
  align-self: start;
  color: ${({ theme }) => theme.text};
`
type signUpParams = {
  darkMode: boolean;
}

const SignUp: React.FC<signUpParams> = ({ darkMode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmP, setConfirmP] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const pswdRef = useRef<HTMLInputElement>(null);
  const confPswdRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password || !name || !confirmP) {
      toast.error("Please enter all fields.");
      return;
    }
    if (password !== confirmP) {
      pswdRef.current!.classList.add("red");
      confPswdRef.current!.classList.add("red");
      emailRef.current!.classList.remove("red");
      nameRef.current!.classList.remove("red");
      toast.error("Passwords don't match.");
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.post('/auth/signup', { name, email, password });
      console.log(res.status);
      // console.log(res.data);
      setIsLoading(false);
      if (res.status === 200) {
        // console.log(res.data.newUser);
        dispatch(setSignUp(res.data.newUser));
        navigate('/');
      }
    } catch (error: any) {
      setIsLoading(false);
      if (error?.response?.data?.reason === 'user') {
        toast.error("User already exists!");
        pswdRef.current!.classList.remove("red");
        confPswdRef.current!.classList.remove("red");
        nameRef.current!.classList.remove("red");
        emailRef.current!.classList.add("red");
        emailRef.current!.focus();
      }
      if (error?.response?.data?.reason === 'name') {
        toast.error("Username is already taken.");
        emailRef.current!.classList.remove("red");
        pswdRef.current!.classList.remove("red");
        confPswdRef.current!.classList.remove("red");
        nameRef.current!.classList.add("red");
        pswdRef.current!.focus();
      }
    }
  }

  return (
    <Container>
      <Wrapper onSubmit={handleSubmit}>
        <Title>Sign Up</Title>
        <Subtitle>Wellcome to Metube!</Subtitle>
        <Input ref={nameRef} onChange={(e) => setName(e.target.value)} value={name} type='text' placeholder='name' />
        <Input ref={emailRef} onChange={(e) => setEmail(e.target.value)} value={email} type='email' placeholder='email' />
        <Input ref={pswdRef} onChange={(e) => setPassword(e.target.value)} value={password} type='password' placeholder='enter password' />
        <Input ref={confPswdRef} onChange={(e) => setConfirmP(e.target.value)} value={confirmP} type='password' placeholder='confirm the password' />
        <Subtitle>Already have an <Link style={{ color: "lightblue" }} to="/signin">account</Link>?</Subtitle>
        <Button type='submit'>Sign Up</Button>
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

export default SignUp;