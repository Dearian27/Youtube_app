import { Link } from "react-router-dom";
import styled from "styled-components";

interface layoutProps {
	type: string;
}

const Container = styled.div<layoutProps>`
  width: ${({ type }) => type !== "sm" && '360px'};
	margin-bottom: ${({ type }) => type === "sm" ? '10px' : '45px'};
  cursor: pointer;
	display: ${({ type }) => type === "sm" && 'flex'};
	gap: 10px;
`
const Image = styled.img<layoutProps>`
	width: ${({ type }) => type === "sm" ? "220px" : "100%"};
	height: ${({ type }) => type === "sm" ? '130px' : '202px'};
	border-radius: ${({ type }) => type === "sm" && '10px'};
	background-color: #999;

`
const Details = styled.div<layoutProps>`
	display: flex;
	margin-top: ${({ type }) => type !== "sm" && '16px'};
	gap: 12px;
	flex: 1;
`
const ChannelImage = styled.img<layoutProps>`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: #999;
	display: ${({ type }) => type === "sm" && "none"};
`
const Texts = styled.div`

`
const Title = styled.h1`
  font-size: 17px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};

`
const ChannelName = styled.h2`
	font-size: 14px;
	color: ${({ theme }) => theme.textSoft};
	margin: 8px 0px 4px 0;

`
const Info = styled.div`
	font-size: 14px;
	color: ${({ theme }) => theme.textSoft};
`

interface CardProps {
	type: string;
}

const Card: React.FC<CardProps> = ({ type }) => {
	return (
		<Link to="/video/test" style={{ textDecoration: "none" }}>
			<Container type={type}>
				<Image type={type} src="" />
				<Details type={type}>
					<ChannelImage type={type} src="" />
					<Texts>
						<Title>Test video</Title>
						<ChannelName>Dearian</ChannelName>
						<Info>606,000 views • 1 day ago</Info>
					</Texts>
				</Details>
			</Container>
		</Link>
	)
}

export default Card;