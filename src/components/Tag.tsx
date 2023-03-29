import styled from 'styled-components';

const Container = styled.div`
  padding: 10px 10px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.inputBgContrast};
  color: ${({ theme }) => theme.inputBg};
  font-weight: 700;
  font-size: 12px;
  font-family: 'Poppins';
`

const Button = styled.button`
  height: 100%;
  font-size: 5px;
  background-color: transpa
`

type TagParams = {
  text: string;
}

const Tag: React.FC<TagParams> = ({ text }) => {
  return (
    <Container>
      #{text}
      <Button>x</Button>
    </Container>
  )
}

export default Tag;