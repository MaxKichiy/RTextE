import { useRef, useState } from 'react';
import JsonField from './components/JsonField';
import Tools from './components/Tools';

function App() {
  const fontSizes = [{ 1: 10 }, { 2: 13 }, { 3: 16 }, { 4: 18 }, { 5: 24 }, { 6: 32 }, { 7: 48 }];

  const textFieldRef = useRef();

  const [currentColor, setCurrentColor] = useState('#000000');
  const [currentBgColor, setCurrentBgColor] = useState('#000000');
  const [currentFontSize, setCurrentFontSize] = useState(16);
  const [formatShow, setFormatShow] = useState(false);
  const [formated, setFormated] = useState([]);

  const fontSizeHandler = (e) => {
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
  };

  const bgColorHandler = (e) => {
    document.execCommand('hiliteColor', null, e.target.value);
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
      const getIn = (node) => {
        if (node.childNodes.length === 0) {
          return node;
        }

        return getIn(node.childNodes[0]);
      };

      nodeList.forEach((el) => {
        // создаем обьект с характеристиками
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
        newObj.text = getIn(el).wholeText; // достаем текст с посденей ноды через рекурсию.
        newObj.fontSize = el.size ? fontSizes[+el.size - 1][el.size] : 16;
        newObj.bgColor =
          el.style && el.style.backgroundColor !== '' ? el.style.backgroundColor : '#FF000000'; // ||
        newArr.push(newObj);
      });
      setFormated(newArr);
    };
    parsingAnObject([...textFieldRef.current.childNodes]);
    parentList.forEach((element) => {
      if (element.style.backgroundColor.length > 0) {
        bgColorTemp = element.style.backgroundColor;
      }
      if (element.color && element.color.length > 0) {
        colorTemp = element.color;
      }
    });
    setCurrentColor(colorTemp); // обновляем цвет  кнопки в зависимости цвета под курсором
    setCurrentBgColor(bgColorTemp); // обновляем цвет  кнопки в зависимости цвета под курсором
  };

  return (
    <div className='app'>
      <section className='app__content'>
        <div className='content__wrapper'>
          <Tools
            currentColor={currentColor}
            textColorHandler={textColorHandler}
            fontSizeHandler={fontSizeHandler}
            currentFontSize={currentFontSize}
            fontSizes={fontSizes}
            currentBgColor={currentBgColor}
            bgColorHandler={bgColorHandler}
          />
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
          {formatShow && <JsonField formated={formated} />}
        </div>
      </section>
    </div>
  );
}

export default App;
