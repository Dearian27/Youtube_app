import axios from '../utils/axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { logIn, setAuth, signInGoogle } from '../redux/slices/userSlice'
import { useDispatch } from 'react-redux/es/exports'
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth'

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


const SignIn: React.FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

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
    try {
      dispatch(logIn({ email, password }));
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
        <Title>Sign In</Title>
        <Subtitle>Wellcome to Metube!</Subtitle>
        <Input value={email} onChange={(event) => setEmail(event.target.value)} type='email' placeholder='email' />
        <Input value={password} onChange={(event) => setPassword(event.target.value)} type='password' placeholder='password' />
        <Subtitle>Have no <Link style={{ color: "lightblue" }} to="/signup">account</Link>?</Subtitle>
        <Button type='submit'>Sign in</Button>
        <Button type='button' onClick={signInWithGoogle}>Sign in with Google</Button>
        <More>English(USA)</More>
      </Wrapper>
    </Container>
  )
}

export default SignIn;