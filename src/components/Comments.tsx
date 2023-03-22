import styled from "styled-components";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCommentsData } from "../redux/slices/videosSlice";
import { useParams } from "react-router-dom";
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
  padding: 10px 24px;
  font-weight: 600;
  font-size: 18px;
  border: none;
  border-radius: 50px;
  background-color: transparent;

  &:disabled {
    background-color: #F2F2F2;
  }
  &:hover {
    background-color: #dfdfdf;
  }
`

const Comments = () => {

  const dispatch = useDispatch();
  const params = useParams();

  const { comments } = useSelector((state: RootState) => state.video)
  const getComments = () => {
    dispatch(fetchCommentsData(params.id));
  }

  const createComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  }

  useEffect(() => {
    getComments();
  }, [])
  return (
    <Container>
      <NewComment>
        <Avatar src="https://yt3.ggpht.com/ytc/AL5GRJUOhe9c1D67-yLQEkT2EqyRclI5V3EOTANZQXmt=s48-c-k-c0x00ffffff-no-rj" />
        <InputForm onSubmit={createComment}>
          <Input placeholder="Add a comment..." />
          <Buttons>
            <Button type="button" onClick={() => { }}>Cancel</Button>
            <Button disabled={true} type="submit">Submit</Button>
          </Buttons>
        </InputForm>
      </NewComment>
      {comments.map((comment: any, id: number) => { //!FIX ME
        return <Comment key={id} comment={comment} />
      })
      }

    </Container>
  )
}

export default Comments;