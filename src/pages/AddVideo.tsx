import styled from 'styled-components';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }) => theme.text};
`
const Wrapper = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  padding: 20px 50px;
  gap: 10px; 
`
const BoxFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${({ theme }) => theme.bgLighter};
  border-radius: 10px;
  padding: 20px;
`
const BoxVertical = styled.div`
  display: grid;
  gap: 10px;
`

const Title = styled.input`
  fontWeight: 500px;
  font-size: 20px;
  font-family: 'Poppins';

  &:focus {
    outline: none;
  }
`

const Description = styled.textarea`
  resize: vertical;
  width: 400px;
  font-family: 'Poppins';

  &:focus {
    outline: none;
  }
`

const SpecifiedTag = styled.div`
  
  &.active {
    background-color: ${({ theme }) => theme.bgLighter};
    color: ${({ theme }) => theme.text};
  }
`

const AddVideo: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <h1>New Video</h1>
        <BoxFlex>
          <BoxVertical>
            <Title type="text" placeholder="Title" />
            <Description wrap='on' placeholder="Description" />
          </BoxVertical>
          <input type="file" accept="video/*" />
        </BoxFlex>
        <BoxFlex>
          <SpecifiedTag></SpecifiedTag>
        </BoxFlex>
      </Wrapper>
    </Container>
  )
}

export default AddVideo;