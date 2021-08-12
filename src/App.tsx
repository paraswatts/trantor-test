import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import './index'
import axios from 'axios'
interface item {
  id: number;
  by: string;
  descendants: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
  kids: [];
}
function App() {
  const [list, setList] = useState([])
  const [showDetail, setShowDetail] = useState(false)
  const [itemDetail, setItemDetail] = useState<item>()

  useEffect(() => {
    let listUrl = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
    axios.get(listUrl).then((response) => {
      // console.log("response", response)
      if (response?.status == 200) {
        setList(response?.data)
      }
    }).catch((error) => {
      console.log("Api error", error)
    })
  }, [])

  const goToDetailPage = (obj: any) => {
    setShowDetail(true)
    let itemUrl = `https://hacker-news.firebaseio.com/v0/item/${obj}.json?print=pretty`
    axios.get(itemUrl).then((response) => {
      console.log("response", response)
      if (response?.status == 200) {
        setItemDetail(response?.data)
      }
    }).catch((error) => {
      console.log("Api error", error)
    })
  }

  const makeRow = (title: any, value: any) => {
    return <tr className="w-1/2"><td className={'border-2	w-96'}>{title}</td> <td className={'border-2 w-96'}>{value}</td></tr>
  }
  return (
    <div className="App">
      <header className="App-header">
        {showDetail && <div className={'border-2	w-96'} onClick={() => {
          setShowDetail(false)
          setItemDetail(undefined)
        }}><p>Go back</p></div>}
        {
          !showDetail ?
            list.map((obj, idx) => {
              return <div key={idx + ''} className={'border-2	px-8 rounded-2xl	m-4	'} onClick={() => goToDetailPage(obj)}><p>{obj}</p></div>
            }) :
            <>
              {makeRow('Title', itemDetail?.title)}
              {makeRow('ID', itemDetail?.id)}
              {makeRow('Type', itemDetail?.type)}
              {makeRow('Descendants', itemDetail?.descendants)}
              {makeRow('Score', itemDetail?.score)}
              <tr className="w-1/2"><td className={'border-2	w-96'}>URL</td> <td className={'border-2	w-96'}><a href={itemDetail?.url}>Click here</a></td></tr>
              <tr className="w-1/2"><td className={'border-2	w-96'}>Kids</td> <td className={'border-2	w-96'}>{
                itemDetail?.kids?.length && itemDetail?.kids.map((kid, i) => (<div>{kid}</div>))}</td></tr>

            </>
        }
      </header>
    </div>
  );
}

export default App;
