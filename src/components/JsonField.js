import React from 'react';
import FileCopyIcon from '@material-ui/icons/FileCopy';

function JsonField({ formated }) {
  const onClickCopyHandler = () => {
    navigator.clipboard.writeText(JSON.stringify(formated));
    alert('Copied to clipboard');
  };
  return (
    <pre className='content__formated'>
      <div className='content__button-copy'>
        <FileCopyIcon className='content__button' onClick={onClickCopyHandler} />
      </div>
      <code>{formated.length < 1 ? null : JSON.stringify(formated, undefined, 2)}</code>
    </pre>
  );
}

export default JsonField;
