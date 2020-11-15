import { useEffect, useRef, useState } from 'react';

import BgColor from '@material-ui/icons/Opacity';
import FontSize from '@material-ui/icons/FormatSize';
import TextColor from '@material-ui/icons/FormatColorText';

function App() {
  // const fonts = ['Roboto', 'Times New Roman', 'Calibri', 'Cambria', 'Georgia'];
  const fontSizes = [{ 1: 10 }, { 2: 13 }, { 3: 16 }, { 4: 18 }, { 5: 24 }, { 6: 32 }, { 7: 48 }];

  const textFieldRef = useRef();
  const fontSizeTypeRef = useRef();

  // const [state, setState] = useState([]);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [currentBgColor, setCurrentBgColor] = useState('#000000');
  const [currentFontSize, setCurrentFontSize] = useState(16);
  const [formatShow, setFormatShow] = useState(false);
  const [formated, setFormated] = useState([]);

  let colorInputs;
  let div4ik;
  useEffect(() => {
    colorInputs = document.querySelectorAll('input[type=color]');
    div4ik = document.querySelector('div.content-field');
  });

  const colorHandleClick = (element) => {
    colorInputs[element].click();
  };

  const fontSizeHandler = (e) => {
    console.log(e.target.value);
    setCurrentFontSize(+e.target.value);
    fontSizes.forEach((el) => {
      if (el[+Object.keys(el)] === +e.target.value) {
        document.execCommand('fontSize', null, +Object.keys(el));
        setCurrentFontSize(el[+Object.keys(el)]);
      }
    });
  };

  const textColorHandler = (e) => {
    document.execCommand('foreColor', null, e.target.value);
    setCurrentColor(e.target.value);
  };

  const bgColorHandler = (e) => {
    document.execCommand('hiliteColor', null, e.target.value);
    setCurrentBgColor(e.target.value);
  };
  let newArr = [];

  const navUpdate = () => {
    const range = window.getSelection().getRangeAt(0);
    const parentList = [];
    let colorTemp = '#000000';
    let bgColorTemp = '#000000';
    function gettingNodeParents(node) {
      parentList.push(node);
      if (node.parentElement) {
        gettingNodeParents(node.parentElement);
      }
    }
    gettingNodeParents(range.startContainer.parentElement);

    const parsingAnObject = (nodeList) => {
      console.log(nodeList);
      const getIn = (node) => {
        if (node.childNodes.length === 0) {
          return node;
        }

        return getIn(node.childNodes[0]);
      };

      nodeList.forEach((el) => {
        let newObj = {};
        newObj.fontColor = el.color ? el.color : '#000000';
        if (el.childNodes.length === 0) {
        } else if (el.childNodes.length >= 1) {
          newObj.fontColor = el.color
            ? el.color
            : el.childNodes[0].color
            ? el.childNodes[0].color
            : '#000000';
        }
        newObj.text = getIn(el).wholeText;
        newObj.fontSize = el.size ? fontSizes[+el.size - 1][el.size] : 16;
        newObj.bgColor =
          el.style && el.style.backgroundColor !== '' ? el.style.backgroundColor : '#FF000000'; // ||
        newArr.push(newObj);
      });
      setFormated((arr) => newArr);
      // return newArr;
    };
    console.log(parsingAnObject([...div4ik.childNodes]));

    parentList.forEach((element) => {
      if (element.style.backgroundColor.length > 0) {
        bgColorTemp = element.style.backgroundColor;
      }
      if (element.color && element.color.length > 0) {
        colorTemp = element.color;
      }
    });
    setCurrentColor(colorTemp);
    setCurrentBgColor(bgColorTemp);
  };
  console.log(formated);

  return (
    <div className='app'>
      <section className='app__content'>
        <div className='content__wrapper'>
          <div className='content-tools'>
            <div>
              <h5>
                <TextColor
                  onClick={() => colorHandleClick(0)}
                  style={{ color: currentColor, cursor: 'pointer' }}
                />
              </h5>
              <input type='color' name='aloha' value={currentColor} onChange={textColorHandler} />
            </div>
            <div>
              <h5>
                <FontSize />
              </h5>
              <select
                onChange={fontSizeHandler}
                defaultValue={currentFontSize}
                ref={fontSizeTypeRef}>
                {fontSizes.map((el, index) => (
                  <option key={`${el}_${index}`}>{el[index + 1]}</option>
                ))}
              </select>
            </div>

            <div>
              <h5>
                <BgColor
                  onClick={() => colorHandleClick(1)}
                  style={{
                    color: currentBgColor,
                    cursor: 'pointer',
                  }}
                />
              </h5>
              <input type='color' value={currentBgColor} onChange={bgColorHandler} />
            </div>
          </div>
          <div
            className='content-field'
            contentEditable='true'
            spellCheck='true'
            ref={textFieldRef}
            onClick={navUpdate}
            onInput={navUpdate}
            onKeyUp={navUpdate}
            onKeyDown={navUpdate}></div>

          <button onClick={() => setFormatShow(!formatShow)} className='content__button'>
            Format to JSON
          </button>
          {formatShow && (
            <pre className='content__formated'>
              <code>{formated.length < 1 ? null : JSON.stringify(formated, undefined, 2)}</code>
            </pre>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;

// const handleInput = () => {
//   console.log('textFieldRef.current.innerText', textFieldRef.current.innerText);
//   setCurrentColor(colorTypeRef.current.value);
//   setCurrentFont(fontTypeRef.current.value);
//   setCurrentFontSize(+fontSizeTypeRef.current.value);
//   console.log('handleInput -> state.length', state.length);
//   if (state.length > 0) {
//     console.log('handleInput -> state[state.length - 1].value', state[state.length - 1].value);
//   }

//   if (state.length !== 0 && state[state.length - 1].value === textFieldRef.current.innerText) {
//     // проверяет если список не пуст и последнее значение в списке равно тому же тексту;
//     console.log('1');
//     state[state.length - 1].color = currentColor;
//     state[state.length - 1].fontSize = currentFontSize;
//     state[state.length - 1].fontFamily = currentFont;
//     setState(...state);
//   } else if (
//     state.length !== 0 &&
//     state[state.length - 1].color === currentColor &&
//     state[state.length - 1].fontSize === currentFontSize &&
//     state[state.length - 1].fontFamily === currentFont // проверяет если список не пуст и характеристики текста не изменились
//   ) {
//     console.log('2');
//     console.log(textFieldRef.current.innerText);
//     state[state.length - 1].value = textFieldRef.current.innerText;
//     setState([...state]);
//   } else if (textFieldRef.current.innerText === '') {
//     // проверяет если поле пустое
//     console.log('3');
//   } else {
//     console.log('4');
//     let newObj = {
//       value: textFieldRef.current.innerText,
//       color: currentColor,
//       fontSize: currentFontSize,
//       fontFamily: currentFont,
//     };
//     setState([...state, { ...newObj }]);
//     textFieldRef.current.innerText = '';
//   }
// };

// const changeHandler = () => {
//   setCurrentColor(colorTypeRef.current.value);
//   setCurrentFont(fontTypeRef.current.value);
//   setCurrentFontSize(fontSizeTypeRef.current.value);
//   handleInput();
// };

/* <div>
              <h5>Font-Family:</h5>
              <select defaultValue={currentFont} ref={fontTypeRef}>
                {fonts.map((el, index) => (
                  <option key={`${el}_${index}`}>{el}</option>
                ))}
              </select>
            </div> */

/* {state.map((el, index) => (
            <span
              key={`${el.value}_${index}`}
              style={{
                fontFamily: el.fontFamily,
                fontSize: `${el.fontSize}px`,
                color: el.color,
              }}>
              {el.value}
            </span>
          ))} */
