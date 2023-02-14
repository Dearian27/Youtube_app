import styled from 'styled-components';

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
  font-size: 13px;
  font-weight: 500;
`
const Date = styled.span`
  font-weight: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`
const Text = styled.span`
  
`

const Comment: React.FC = () => {
  return (
    <Container>
      <Avatar src="https://yt3.ggpht.com/ytc/AL5GRJUOhe9c1D67-yLQEkT2EqyRclI5V3EOTANZQXmt=s48-c-k-c0x00ffffff-no-rj" />
      <Details>
        <Name>Jonathan <Date>2019-05-10</Date></Name>
        <Text>I love this place</Text>
      </Details>
    </Container>
  )
}

export default Comment;