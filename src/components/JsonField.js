import React from 'react';

function JsonField({ formated }) {
  return (
    <pre className='content__formated'>
      <code>{formated.length < 1 ? null : JSON.stringify(formated, undefined, 2)}</code>
    </pre>
  );
}

export default JsonField;
