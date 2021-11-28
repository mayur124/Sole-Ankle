import React from 'react';
import styled from 'styled-components/macro';

import Header from '../Header';
import ShoeIndex from '../ShoeIndex';

const App = () => {
  const [sortId, setSortId] = React.useState('newest');

  return (
    <AppWrapper>
      <Header />
      <Main>
        <ShoeIndex sortId={sortId} setSortId={setSortId} />
      </Main>
    </AppWrapper>
  );
};

const AppWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const Main = styled.main`
  padding: 64px 32px;
`;

export default App;
