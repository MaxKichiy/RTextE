import React, { useRef } from 'react';
import BgColor from '@material-ui/icons/Opacity';
import FontSize from '@material-ui/icons/FormatSize';
import TextColor from '@material-ui/icons/FormatColorText';

function Tools({
  currentColor,
  textColorHandler,
  fontSizeHandler,
  currentFontSize,
  fontSizes,
  currentBgColor,
  bgColorHandler,
}) {
  const colorRef = useRef();
  const bgColorRef = useRef();

  const handleClick = (element) => {
    element.current.click(); //  показываем скрытый input
  };
  return (
    <div className='content-tools'>
      <div>
        <h5>
          <TextColor
            onClick={() => handleClick(colorRef)}
            style={{ color: currentColor, cursor: 'pointer' }}
          />
        </h5>
        <input
          ref={colorRef}
          type='color'
          name='aloha'
          onChange={textColorHandler}
          onClick={textColorHandler}
        />
      </div>
      <div>
        <h5>
          <FontSize />
        </h5>
        <select onChange={fontSizeHandler} defaultValue={currentFontSize}>
          {fontSizes.map((el, index) => (
            <option key={`${el}_${index}`}>{el[index + 1]}</option>
          ))}
        </select>
      </div>

      <div>
        <h5>
          <BgColor
            onClick={() => handleClick(bgColorRef)}
            style={{
              color: currentBgColor,
              cursor: 'pointer',
            }}
          />
        </h5>
        <input ref={bgColorRef} type='color' onChange={bgColorHandler} onClick={bgColorHandler} />
      </div>
    </div>
  );
}

export default Tools;
