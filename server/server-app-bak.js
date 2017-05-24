import React from 'react';
import { renderToString } from 'react-dom/server';

module.exports = function(obj) {
  let objString = JSON.stringify(obj);
  const html = renderToString(
    <div id="trial">
      welcome to trial `${objString}`
    </div>
  );

  return html;
};
