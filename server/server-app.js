import React from 'react';
import {renderToString} from 'react-dom/server';
import MainContainer from '../app/component/MainContainer';
import Vote from '../app/component/Vote';

module.exports = function(obj) {
  const html = renderToString(
    <MainContainer>
      <Vote obj={obj} />
    </MainContainer>
  );

  return html;
}
