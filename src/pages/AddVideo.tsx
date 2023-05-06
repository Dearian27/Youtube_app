import React, { useState, useEffect, EventHandler, useRef } from 'react';
import styled from 'styled-components';
import Tag from '../components/Tag';
import HelpIcon from '@mui/icons-material/Help';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, deleteObject, getDownloadURL } from "firebase/storage";
import app from '../firebase';
import axios from '../utils/axios';

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
  /* justify-content: space-between; */
  justify-content: space-around;
  width: 100%;
  border-radius: 10px;
  padding: 20px;
`
const BoxVertical = styled.div`
  display: grid;
  align-content: flex-start;
  gap: 20px;
`
const Title = styled.input`
  font-weight: 500;
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
  width:  400px;
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
  /* border-right: 4px solid #757575; */
`
const Input = styled.input`
  border: none;
  background-color: ${({ theme }) => theme.inputBg};
  border-radius: 5px;
  padding: 10px 10px;
  padding-left: 34px;
  font-size: 20px;
  font-weight: 700;
  font-family: 'Poppins';
  color: ${({ theme }) => theme.text};
  
  &:focus {
    outline: none;
  }
`
const Tip = styled.span`
  display: flex;
  gap: 5px;
  font-weight: 500;
  font-family: "Poppins";
  color: ${({ theme }) => theme.textSoft};
`
const Tooltip = styled.span`
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black; 
  &:hover .tooltiptext  {
    visibility: visible;
  }
`
const Tooltiptext = styled.span`
  visibility: hidden;

  width: 240px;
  margin-left: -120px; /* Use half of the width (120/2 = 60), to center the tooltip */
  position: absolute;
  top: 100%;
  left: 50%;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  
  z-index: 1;

  &:after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent black transparent;
}
`
const TagInput = styled.div`
  position: relative;
  display: block;
`
const SubmitBtn = styled.button`
  /* align-self: flex-end; */
  padding: 10px 20px;
  font-size: 20px;
  font-weight: 700;
  font-family: "Poppins";
  border: none;
  border-radius: 10px;
  background-color: #7E90F5;
  color: white;
  transition: background-color 0.4s ease-in, color 0.3s ease-in;
  &:disabled {
    cursor: unset;
    background-color: #F2F2F2 !important;
    color: #8d8d8d;

    &:hover {
      background-color: #F2F2F2!important;
      color: #8d8d8d;
    }
  }
`
const CancelBtn = styled.button`
  padding: 10px 20px;
  font-size: 20px;
  font-weight: 700;
  font-family: "Poppins";
  border: none;
  border-radius: 10px;
  background-color: transparent !important;
  color: ${({ theme }) => theme.textSoft};
  transition: background-color 0.4s ease-in, color 0.3s ease-in;
  border: 2px solid ${({ theme }) => theme.textSoft};
`
const VideoInput = styled.input`
padding: 10px 5px;
position: relative;
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
const sTags: string[] = [
  'Music',
  'Sports',
  'Movie',
  'News'
]

type InputsType = {
  title: string;
  desc: string;
  tags: string[];
  imgUrl: string;
  videoUrl: string;
}

const AddVideo: React.FC = () => {

  const navigate = useNavigate();

  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [imgRef, setImgRef] = useState<string | null>(null);
  const [videoRef, setVideoRef] = useState<string | null>(null);
  const [inputs, setInputs] = useState<InputsType>({
    title: '', desc: '', tags: [], imgUrl: '', videoUrl: ''
  });
  const [inputedTag, setInputedTag] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  const changeInputs = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputs(prev => (
      { ...prev, [event?.target.name]: event.target.value }
    ))
  }

  const addTag = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let operatedTag = inputedTag.replace(/[^a-zа-яё0-9\s]/gi, '');
    operatedTag = operatedTag[0].toLowerCase() + operatedTag.slice(1);

    if (!inputs.tags?.includes?.(operatedTag) && operatedTag) {
      const updTags = [...inputs.tags, operatedTag];
      setInputs(prev => (
        { ...prev, tags: updTags }
      ))
    }
    setInputedTag('');
  }

  const deleteTag = (text: string) => {
    const updTags = inputs.tags.filter(tag => tag !== text);
    setInputs(prev => (
      { ...prev, tags: updTags }
    ))
  }

  const addSTag = (newTag: string) => {
    let updTags = inputs.tags;
    sTags.map(sTag => {
      updTags = updTags.filter(tag => tag !== sTag);
    })
    updTags.push(newTag);
    setInputs(prev => (
      { ...prev, tags: updTags }
    ))
  }

  const uploadFile = (file: any, urlType: string) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    if (urlType === "videoUrl" && videoRef) {
      const video = ref(storage, videoRef);
      deleteObject(video).then(() => {
      }).catch((error) => {
        console.log(error);
      });
      setVideoRef("");
    } else if (imgRef) {
      const img = ref(storage, imgRef);
      deleteObject(img).then(() => {
      }).catch((error) => {
        console.log(error);
      });
      setVideoRef("");
    }
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === 'imgUrl' ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log("error", error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (urlType === "imgUrl") setImgRef(downloadURL);
          else setVideoRef(downloadURL);
          setInputs((prev) => ({ ...prev, [urlType]: downloadURL }))
        });
      }
    );
  }

  const handleUpload = async () => {
    console.log(inputs?.tags)
    const res = await axios.post('/videos', inputs)
    res.status === 200 &&
      navigate(`/video/${res.data._id}`);

  }
  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);
  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    if (inputs.desc && inputs.title && inputs.imgUrl && inputs.videoUrl) {
      setIsDisabled(false)
    } else setIsDisabled(true);
    console.log(inputs)
  }, [inputs]);

  return (
    <Container>
      <Wrapper>
        <h1>New Video</h1>
        <BoxFlex>
          <BoxVertical>
            <Title
              value={inputs?.title} name='title'
              onChange={(event) => changeInputs(event)}
              type="text" placeholder="Title" />
            <Description
              name='desc' value={inputs.desc}
              onChange={(event) => changeInputs(event)}
              wrap='on' placeholder="Description" />
          </BoxVertical>
          <BoxVertical>
            <Img>
              <VideoInput type="file" accept="video/*" onChange={(e: any) => setVideo(e?.target?.files[0])} />
            </Img>
            {videoPerc > 0 &&
              <span>
                Uploading: {videoPerc}%
              </span>
            }
            <Img>
              <ImageInput type="file" accept="image/*" onChange={(e: any) => setImg(e?.target?.files[0])} />
            </Img>
            {imgPerc > 0 &&
              <span>
                Uploading: {imgPerc}%
              </span>
            }
          </BoxVertical>
        </BoxFlex>
        <BoxFlex style={{ justifyContent: "flex-start", alignItems: "center", gap: "10px" }}>
          {sTags.map((tag) => {
            return <SpecifiedTag key={tag} onClick={() => addSTag(tag)} className={`${inputs.tags.includes(tag) && 'active'} `}>{tag}</SpecifiedTag>
          })}
          <Tip style={{ fontSize: "16px" }}> <span style={{ color: "red" }}>*</span>specified tags
            <Tooltip>
              <HelpIcon />
              <Tooltiptext className="tooltiptext">increases your chances of video promotion  </Tooltiptext>
            </Tooltip>
          </Tip>
        </BoxFlex>
        <Tags onSubmit={(event) => addTag(event)}>
          <BoxVertical>
            <TagInput>
              <Input maxLength={40} onChange={(event) => setInputedTag(event.target.value)} value={inputedTag} type="text" />
              <Hash>#</Hash>
            </TagInput>
            <Tip>
              <span style={{ color: "red" }}>*</span>first letter will be lowercased
            </Tip>
          </BoxVertical>
          <TagsField>
            {inputs.tags.map((tag) => {
              return <Tag key={tag} deleteTag={deleteTag} text={tag} />
            })}
          </TagsField>
        </Tags>
        <BoxFlex style={{ justifyContent: "flex-end", gap: "30px", paddingRight: "100px" }}>
          <CancelBtn onClick={() => navigate('/')}>
            Cancel
          </CancelBtn>
          <SubmitBtn onClick={handleUpload} disabled={isDisabled}>
            Submit
          </SubmitBtn>
        </BoxFlex>
      </Wrapper>
    </Container>
  )
}

export default AddVideo;