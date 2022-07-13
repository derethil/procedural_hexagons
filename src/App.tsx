import { useState } from "react";
import styled from "styled-components";

import Fiber from "./Fiber";
import { makeSeed } from "./utils";

const ThreeContainer = styled.div`
  padding: 1em;
  width: 100%;
  height: 100%;
  background: #ffeecc;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  overflow: hidden;
`;

const Button = styled.button`
  display: inline-block;

  font: normal normal 300 2em "Open Sans";
  text-decoration: none;

  color: #4f7942;
  background-color: transparent;
  border: 1px solid #4f7942;
  border-radius: 100px;

  padding: 0.3em 1.2em;
  margin: 5px;

  background-size: 200% 100%;
  background-image: linear-gradient(to right, transparent 50%, #4f7942 50%);
  transition: background-position 0.3s cubic-bezier(0.19, 1, 0.22, 1) 0.1s,
    color 0.5s ease 0s, background-color 0.5s ease;

  &:hover {
    color: rgba(255, 255, 255, 1);
    background-color: #4f7942;
    background-position: -100% 100%;
  }

  cursor: pointer;
`;

export default function App() {
  const [seed, setSeed] = useState(makeSeed(15));
  const handleClick = () => {
    setSeed(makeSeed(15));
  };

  return (
    <ThreeContainer>
      <Button onClick={() => handleClick()}>Generate Another</Button>
      <Fiber seed={seed} />
    </ThreeContainer>
  );
}
