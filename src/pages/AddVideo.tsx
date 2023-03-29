import React, { useState } from 'react';
import styled from 'styled-components';
import Tag from '../components/Tag';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
  &::-webkit-scrollbar {
    /* display: none; */
  }
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  /* background-color: ${({ theme }) => theme.bgLighter}; */
  width: auto;
  padding: 20px 30px;
  gap: 10px; 
`
const BoxFlex = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  /* background-color: ${({ theme }) => theme.bgLighter}; */
  border-radius: 10px;
  padding: 20px;
  `
const BoxVertical = styled.div`
  display: grid;
  align-content: flex-start;
  gap: 20px;
`

const Title = styled.input`
  fontWeight: 500px;
  font-size: 20px;
  font-family: 'Poppins';
  border: none;
  border-bottom: 3px solid grey;
  background-color: transparent;
  color: ${({ theme }) => theme.text};

  &:focus {
    outline: none;
  }
`

const Description = styled.textarea`
  resize: vertical;
  font-size: 16px;
  width: 400px;
  font-family: 'Poppins';
  color: ${({ theme }) => theme.text};
  border: none;
  border-bottom: 3px solid grey;
  min-height: 200px;
  background-color: transparent;
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
  background-color: ${({ theme }) => theme.bgLighter};
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
  background-color: ${({ theme }) => theme.inputBg};
  transition: background-color 0.4s ease-in, color 0.3s ease-in;

  &.active {
    background-color: ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.textContrast};
  }
`

const Tags = styled.form`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 40px;
  width: 100%;
  padding: 20px;
`

const TagsField = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  height: auto;
  background-color: ${({ theme }) => theme.inputBg};
  border-radius: 5px;
  width: 500px;
  min-height: 100px;
  gap: 10px;
  padding: 10px;
`

const Hash = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 5px;
  font-size: 18px;
  font-weight: 700;
  font-family: 'Poppins';
  color: #757575;
  padding: 0px 5px;
  border-right: 4px solid #757575;
`
const Input = styled.input`
  border: none;
  background-color: ${({ theme }) => theme.inputBg};
  border-radius: 5px;
  padding: 10px 10px;
  padding-left: 40px;
  font-size: 20px;
  font-weight: 700;
  font-family: 'Poppins';
  color: ${({ theme }) => theme.text};
  
  &:focus {
    outline: none;
  }
`

const TagInput = styled.div`
  position: relative;
  display: block;
`

const sTags: string[] = [
  'Music',
  'Sports',
  'Movie',
  'News'
]

const AddVideo: React.FC = () => {

  const [tags, setTags] = useState<string[]>([]);
  const [inputedTag, setInputedTag] = useState<string>("");
  const [specifiedTag, setSpecifiedTag] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  const addTag = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!tags?.includes?.(inputedTag) && inputedTag) {
      tags.push(inputedTag);
      setTags(tags);
      console.log(tags)
    }
    setInputedTag('');
  }

  const deleteTag = (text: string) => {
    setTags(tags.filter(tag => tag !== text));
  }

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
        </BoxFlex>
        <Tags onSubmit={(event) => addTag(event)}>
          <TagInput>
            <Input maxLength={40} onChange={(event) => setInputedTag(event.target.value)} value={inputedTag} type="text" />
            <Hash>#</Hash>
          </TagInput>
          <TagsField>
            {tags.map((tag) => {
              return <Tag key={tag} deleteTag={deleteTag} text={tag} />
            })}
          </TagsField>
        </Tags>
      </Wrapper>
    </Container>
  )
}

export default AddVideo;