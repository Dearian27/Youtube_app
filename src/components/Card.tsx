import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { videoI } from "../pages/Home";
import { format } from 'timeago.js';
import axios from "../utils/axios";

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
	video: videoI;
}

export type channelType = {
	createdAt: string;
	email: string;
	name: string;
	password: string;
	subscribedUsers: string[];
	subscribers: number;
	updatedAt: string;
	__v: number;
	_id: string;
} | null;

const Card: React.FC<CardProps> = ({ type, video }) => {

	const [channel, setChannel] = useState<channelType>(null);

	const fetchChannel = async () => {
		const { data } = await axios.get(`/users/${video.userId}`);
		setChannel(data);
	}

	useEffect(() => {
		fetchChannel();
	}, [video])

	return (
		<Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
			<Container type={type}>
				<Image type={type} src={video?.imgUrl} />
				<Details type={type}>
					<ChannelImage type={type} src={""} />
					<Texts>
						<Title>{video ? video?.title : "test video"}</Title>
						<ChannelName>{channel?.name || "User"}</ChannelName>
						<Info>{video.views} views • {format(video.createdAt, "")}</Info>  {/*1 day ago */}
					</Texts>
				</Details>
			</Container>
		</Link>
	)
}

export default Card;