import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { signUp } from '../redux/slices/userSlice'

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
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  font-size: 15px;
  transition: background-color 0.4s ease-in-out;
  &:focus {
    outline: none;
    background-color: #0000000F;
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
const More = styled.div`
  align-self: start;
  color: ${({ theme }) => theme.text};
`


const SignUp: React.FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmP, setConfirmP] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');

  const pswdRef = useRef<HTMLInputElement>(null);
  const confPswdRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmP) {

      // pswdRef.current?.style?.borderColor = "red";
      pswdRef.current?.focus();
      return;
    } else {
      // pswdRef.current?.style?.borderColor = "red";
    }
    try {
      dispatch(signUp({ name, email, password }));
      navigate('/');
    } catch (error) {
      console.log(error);
    } finally {
      console.log('Success');
    }

  }

  return (
    <Container>
      <Wrapper onSubmit={handleSubmit}>
        <Title>Sign Up</Title>
        <Subtitle>We are really happy to see you again!</Subtitle>
        <Input onChange={(e) => setName(e.target.value)} value={name} type='text' placeholder='name' />
        <Input onChange={(e) => setEmail(e.target.value)} value={email} type='email' placeholder='email' />
        <Input ref={pswdRef} onChange={(e) => setPassword(e.target.value)} value={password} type='password' placeholder='enter password' />
        <Input ref={confPswdRef} onChange={(e) => setConfirmP(e.target.value)} value={confirmP} type='password' placeholder='confirm the password' />
        <Subtitle>Already have an <Link style={{ color: "lightblue" }} to="/signin">account</Link>?</Subtitle>
        <Button type='submit'>Sign Up</Button>
        <More>English(USA)</More>
      </Wrapper>
    </Container>
  )
}

export default SignUp;