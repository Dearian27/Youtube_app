import styled from "styled-components";
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  max-height: calc(100vh - 60px);
`
const Text = styled.span`
  font-size: 100px;
  font-weight: 900;
  color: ${({ theme }) => theme.hrColor};
`
const NotFoundPage = () => {
  return (
    <Container>
      <Text>
        404 not found
      </Text>
    </Container>
  )
}
export default NotFoundPage;