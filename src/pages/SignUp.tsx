import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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

  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmP, setConfirmP] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');



  return (
    <Container>
      <Wrapper onSubmit={(e) => e.preventDefault()}>
        <Title>Sign Up</Title>
        <Subtitle>We are really happy to see you again!</Subtitle>
        <Input onChange={(el) => setName(el.target.value)} value={name} type='text' placeholder='name' />
        <Input onChange={(el) => setEmail(el.target.value)} value={email} type='email' placeholder='email' />
        <Input onChange={(el) => setPassword(el.target.value)} value={password} type='password' placeholder='enter password' />
        <Input onChange={(el) => setConfirmP(el.target.value)} value={confirmP} type='password' placeholder='confirm the password' />
        <Subtitle>Already have an <Link style={{ color: "lightblue" }} to="/signin">account</Link>?</Subtitle>
        <Button type='submit'>Sign Up</Button>
        <More>English(USA)</More>
      </Wrapper>
    </Container>
  )
}

export default SignUp;