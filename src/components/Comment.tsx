import axios from '../utils/axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { format } from 'timeago.js';
import userIconImage from "/src/assets/user.png";


const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0;
`
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`
const Name = styled.span`
  font-size: 15px;
  font-weight: 500;
`
const Date = styled.span`
  font-weight: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`
const Text = styled.span` 
`
type CommentProps = { //!FIX ME
  comment: any;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [author, setAuthor] = useState<any>(null); //!FIX ME
  useEffect(() => {
    const fetchCommentAuthor = async () => {
      const { data } = await axios.get(`/users/${comment.userId}`);
      setAuthor(data.name);
    }
    fetchCommentAuthor();
  })

  return (
    <Container>
      <Avatar src={userIconImage} />
      <Details>
        <Name>{author}
          <Date>
            {comment?.createdAt && format(comment?.createdAt)}
          </Date>
        </Name>
        <Text>{comment?.text}</Text>
        {/* //! ? */}
      </Details>
    </Container>
  )
}

export default Comment;