import styled from 'styled-components';
import ClearIcon from '@mui/icons-material/Clear';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  gap: 5px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.inputBgContrast};
  color: ${({ theme }) => theme.inputBg};
  font-weight: 500;
  font-size: 14px;
  font-family: 'Poppins';
`

type TagParams = {
  text: string;
  deleteTag: (text: string) => void
}


const Tag: React.FC<TagParams> = ({ text, deleteTag }) => {


  return (
    <Container>
      #{text}
      <ClearIcon
        onClick={() => deleteTag(text)}
        style={{
          height: "50%",
          cursor: "pointer"
        }}
      />
    </Container>
  )
}

export default Tag;