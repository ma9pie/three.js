import React, { useEffect } from 'react';
import tw, { styled } from 'twin.macro';

import {
  renderCube,
  renderIcosahedron,
  renderPlane,
  renderSphere,
} from '@/utils';

const Home = () => {
  useEffect(() => {
    renderCube({
      id: 'cube',
      width: 720,
      height: 720,
    });
    renderSphere({
      id: 'sphere',
      width: 720,
      height: 720,
    });
    renderPlane({
      id: 'plane',
      width: 720,
      height: 720,
    });
    renderIcosahedron({
      id: 'icosahedron',
      width: 720,
      height: 720,
    });
  }, []);

  return (
    <Wrapper>
      <Container id="cube"></Container>
      <Container id="sphere"></Container>
      <Container id="plane"></Container>
      <Container id="icosahedron"></Container>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  ${tw`flex flex-wrap gap-6 p-6`};
`;
const Container = styled.div`
  ${tw`w-fit h-fit border border-solid border-neutral-500`};
`;
