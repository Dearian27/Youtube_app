import styled from "styled-components";
import Comment from "./Comment";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addComment, fetchCommentsData } from "../redux/slices/videosSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Container = styled.div`
`
const NewComment = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;

`
const Avatar = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
`
const InputForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.textSoft};
  background-color: transparent;
  font-size: 18px;
  padding: 5px;
  width: 100%;

  &:focus {
    outline: none;
  }
`
const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`
const Button = styled.button`
  cursor: pointer;
  padding: 10px 24px;
  font-weight: 600;
  font-size: 18px;
  border: none;
  border-radius: 50px;
  background-color: transparent;
  color: #2c2c2c;
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
  &:hover {
    background-color: #dfdfdf;
    color: black;
  }
`
const Comments = () => {

  const { isAuth } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const commentInput = useRef(null);
  const [commentText, setCommentText] = useState("");
  const { comments } = useSelector((state: RootState) => state.video)
  const getComments = () => {
    dispatch(fetchCommentsData(params.id));
  }

  const createComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isAuth) {
      navigate('/signin')
      return;
    };
    setCommentText('');
    dispatch(addComment({ videoId: params.id, text: commentText }));
  }

  useEffect(() => {
    getComments();
  }, [])

  return (
    <Container>
      <NewComment>
        <Avatar src="/user.png" />
        <InputForm onSubmit={createComment}>
          <Input onChange={(event) => { setCommentText(event?.target?.value) }} value={commentText} ref={commentInput} placeholder="Add a comment..." />
          <Buttons>
            <Button type="button" onClick={() => { setCommentText('') }}>Cancel</Button>
            <Button style={{
              backgroundColor: `${commentText && "#7e90f5"}`,
              color: `${commentText && "white"}`,
            }} disabled={!commentText} type="submit">Submit</Button>
          </Buttons>
        </InputForm>
      </NewComment>
      {comments?.map((comment: any, id: number) => { //!FIX ME
        return <Comment key={id} comment={comment} />
      })
      }

    </Container>
  )
}

export default Comments;