import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
  /* height: 100%; */
  color: ${({ theme }) => theme.text};
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

const Wrapper = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  width: auto;
  padding: 20px 30px;
  gap: 10px; 
`
const BoxFlex = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  width: 100%;
  background-color: ${({ theme }) => theme.bgLighter};
  border-radius: 10px;
  padding: 20px;
`
const BoxVertical = styled.div`
  display: grid;
  align-content: flex-start;
  /* justify-items: flex-start; */
  gap: 20px;
`

const Title = styled.input`
  fontWeight: 500px;
  font-size: 20px;
  font-family: 'Poppins';
  border: none;
  border-bottom: 3px solid grey;
  

  &:focus {
    outline: none;
  }
`

const Description = styled.textarea`
  resize: vertical;
  font-size: 16px;
  width: 400px;
  font-family: 'Poppins';
  border: none;
  border-bottom: 3px solid grey;
  min-height: 200px;
  &:focus {
    outline: none;
  }
`
const VideoInput = styled.input`
  padding: 10px 5px;
  position: relative;
  /* background-color: ${({ theme }) => theme.soft}; */

  &::-webkit-file-upload-button {
    visibility: hidden;
  }

  &:before {
    cursor: pointer;
    content: 'Upload Video';
    font-size: 18px;
    color: ${({ theme }) => theme.textContrast};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.soft};
  }
`
const ImageInput = styled.input`
  padding: 10px 5px;
  position: relative;
  /* background-color: ${({ theme }) => theme.soft}; */

  &::-webkit-file-upload-button {
    visibility: hidden;
  }

  &:before {
    cursor: pointer;
    content: 'Upload Image';
    font-size: 18px;
    color: ${({ theme }) => theme.textContrast};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.soft};
  }
`

const Img = styled.div`
  width: 400px;
  height: 225px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.bg};
  padding: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`


const SpecifiedTag = styled.div`
  cursor: pointer;
  border-radius: 50px;
  padding: 8px 26px;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.textSoft};
  background-color: ${({ theme }) => theme.bg};
  transition: background-color 0.4s ease -in, color 0.3s ease -in;

  &.active {
    background - color: ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.textContrast};
  }
`

const TagInput = styled.input`
  border: none;
  background-color: ${({ theme }) => theme.inputBg};
  botder-radius: 5px;

`

const sTags: string[] = [
  'Music',
  'Sports',
  'Movie',
  'News'
]

const AddVideo: React.FC = () => {

  const [specifiedTag, setSpecifiedTag] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <Container>
      <Wrapper>
        <h1>New Video</h1>
        <BoxFlex>
          <BoxVertical>
            <Title type="text" placeholder="Title" />
            <Description wrap='on' placeholder="Description" />
          </BoxVertical>
          <BoxVertical>
            <Img>
              <VideoInput type="file" accept="video/*" />
            </Img>
            <Img>
              <ImageInput type="file" accept="image/*" />
            </Img>
          </BoxVertical>
        </BoxFlex>
        <BoxFlex style={{ justifyContent: "flex-start", gap: "10px" }}>
          {sTags.map((tag) => {
            return <SpecifiedTag key={tag} onClick={() => setSpecifiedTag(tag)} className={`${tag === specifiedTag && 'active'} `}>{tag}</SpecifiedTag>
          })}
          <TagInput type="text" placeholder='#' />
        </BoxFlex>
      </Wrapper>
    </Container>
  )
}

export default AddVideo;