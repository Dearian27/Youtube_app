import styled from "styled-components";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

interface videoI {
  id: string;
  title: string;
  url: string;
}

const Home: React.FC = () => {



  return (
    <Container>
      <Card type={"lg"} />
      <Card type={"lg"} />
      <Card type={"lg"} />
      <Card type={"lg"} />
      <Card type={"lg"} />
      <Card type={"lg"} />
      <Card type={"lg"} />
      <Card type={"lg"} />
      <Card type={"lg"} />
      <Card type={"lg"} />
    </Container>
  )
}

export default Home;