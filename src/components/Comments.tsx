import styled from "styled-components";
import Comment from "./Comment";

const Container = styled.div`
`
const NewComment = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;

`
const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
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

const Comments = () => {
  return (
    <Container>
      <NewComment>
        <Avatar src="https://yt3.ggpht.com/ytc/AL5GRJUOhe9c1D67-yLQEkT2EqyRclI5V3EOTANZQXmt=s48-c-k-c0x00ffffff-no-rj" />
        <Input placeholder="Add a comment..." />
      </NewComment>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </Container>
  )
}

export default Comments;