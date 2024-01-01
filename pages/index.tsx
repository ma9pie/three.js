import React, { useEffect } from 'react';
import tw, { styled } from 'twin.macro';

import useThree from '@/hooks/useThree';

const Home = () => {
  const { renderCube } = useThree({
    id: 'cube',
  });

  useEffect(() => {
    renderCube();
  }, []);

  return (
    <Wrapper>
      <Three id="cube"></Three>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  ${tw`p-6`};
`;
const Three = styled.div`
  ${tw``};
`;
