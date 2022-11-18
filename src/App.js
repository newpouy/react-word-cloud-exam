import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import ReactWordcloud from 'react-wordcloud';
import { readString } from 'react-papaparse';
// import csvFile from './427242564_com.mozzet.fbting_kr_20220107_20221030.csv'
import csvFile from './547702041_com.cardify.tinder_us_20221011_20221030.csv'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import { sortBy } from 'lodash'

function App() {
  const [data, setData] = useState([])
  // const words = [
  //   {
  //     text: 'told',
  //     value: 64,
  //   },
  //   {
  //     text: 'mistake',
  //     value: 11,
  //   },
  //   {
  //     text: 'thought',
  //     value: 16,
  //   },
  //   {
  //     text: 'bad',
  //     value: 17,
  //   },
  // ]
  useEffect(() => {
    readFile()
  }, [])
  const readFile = () => {
    const papaConfig = {
      complete: (results, file) => {
        // console.log('Parsing complete:', results, file);
        let wordObj = {};
        let wordArr = [];
        
        results.data.forEach(el => {
          // console.log(el[7])
          const newComment = el[7] ? el[7].replace('\n', ' ') : ''
          const newCommentArr = newComment.split(' ')
          // console.log(newCommentArr)
          for(const item of newCommentArr) {
            // console.log(item)
            // console.log(Object.keys(wordObj))
            const keys = Object.keys(wordObj)
            keys.includes(item) ? wordObj[item]++ : wordObj[item] = 1;
          }
          // console.log(wordObj, 'wordObj')
        })
        console.log(wordObj, 'wordObj')
        // console.log(Object.entries(wordObj), 'wordObj')
        const wordArray = Object.entries(wordObj);
        console.log(wordArray, 'wordArray')
        const newArr = wordArray.map(el => ({ text: el[0], value: el[1] }))
        console.log(newArr, 'newArr')
        const sorted = sortBy(newArr, 'value')
        // const reversed = sorted.reverse()
        // const cutted = reversed.splice(20)
        // console.log(reversed.length)
        setData(sorted)
      },
      download: true,
      error: (error, file) => {
        console.log('Error while parsing:', error, file);
      },
    };
    readString(csvFile, papaConfig)
  }
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <ReactWordcloud words={data} />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
