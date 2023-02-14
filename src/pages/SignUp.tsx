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
const Wrapper = styled.div`
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


const SignUp: React.FC = () => {

  //   const [email, setEmail] = React.useState('')
  //   const [password, setPassword] = React.useState('')
  //   const [error, setError] = React.useState('')
  //   const [loading, setLoading] = React.useState(false)

  return (
    <Container>
      <Wrapper>
        <Title>Sign Up</Title>
        <Subtitle>We are really happy to see you again!</Subtitle>
        <Input type='text' placeholder='name' />
        <Input type='email' placeholder='email' />
        <Input type='password' placeholder='password' />
        <Subtitle>Already have an <Link style={{ color: "lightblue" }} to="/signin">account</Link>?</Subtitle>
        <Button>Sign Up</Button>
        <More>English(USA)</More>
      </Wrapper>
    </Container>
  )
}

export default SignUp;