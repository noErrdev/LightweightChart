import { useState, useEffect } from 'react';
import Ads from './layouts/Ads';
import Feature from './layouts/Feature';
import Triggering from './layouts/Triggering';
import Sponsor from './layouts/Sponsor';
import Winner from './layouts/Winner';
import Summary from './layouts/Summary';
import './App.css';

const App = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [resultData, setResultData] = useState({});
  const [winnerData, setWinnerData] = useState({});
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    fetchCryptoData();
    fetchResultData();
    fetchWinnerData();
  }, []);

  const fetchResultData = async () => {
    try {
      const fileNames = ['Cold.json', 'Hot.json', 'None.json'];
      const fetchPromises = fileNames.map(fileName =>
        fetch(`/${fileName}`).then(response => {
          if (!response.ok) {
            throw new Error(`Network response was not ok for ${fileName}`);
          }
          return response.json();
        })
      );

      const responses = await Promise.all(fetchPromises);
      const allData = responses.flat();

      const maxData = allData.reduce((maxObj, currentObj) => {
        return currentObj['CoerCoef'] > maxObj['CoerCoef'] ? currentObj : maxObj;
      }, { CoerCoef: -Infinity });

      setResultData(maxData);
    } catch (error) {
      console.error('Failed to fetch result data:', error);
    }
  };

  const fetchCryptoData = async () => {
    try {
      const responses = await Promise.all([
        fetch('/Cold.json'),
        fetch('/Hot.json'),
        fetch('/None.json')
      ]);

      const dataPromises = responses.map(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok for ${response.url}`);
        }
        return response.json();
      });

      const dataArrays = await Promise.all(dataPromises);
      const combinedData = dataArrays.flat();

      combinedData.sort((a, b) => b['CoerCoef'] - a['CoerCoef']);

      const selectTop10 = (data) => {
        const symbolCount = {};
        const selectedData = [];

        for (const item of data) {
          const symbol = item['SymbolName'];

          if (!symbolCount[symbol]) {
            symbolCount[symbol] = 0;
          }

          if (symbolCount[symbol] < 3) {
            selectedData.push(item);
            symbolCount[symbol] += 1;
          }

          if (selectedData.length === 10) {
            break;
          }
        }

        return selectedData;
      };

      const top10Data = selectTop10(combinedData);
      setCryptoData(top10Data);
    } catch (error) {
      console.error('Failed to fetch crypto data:', error);
    }
  };

  const fetchWinnerData = async () => {
    try {
      const fileNames = ['Cold.json', 'Hot.json', 'None.json'];
      const fetchPromises = fileNames.map(fileName =>
        fetch(`/${fileName}`).then(response => {
          if (!response.ok) {
            throw new Error(`Network response was not ok for ${fileName}`);
          }
          return response.json();
        })
      );

      const responses = await Promise.all(fetchPromises);
      const allData = responses.flat();

      const maxData = allData.reduce((maxObj, currentObj) => {
        return currentObj['Results'][currentObj['Results'].length - 1] > 
               maxObj['Results'][maxObj['Results'].length - 1]
               ? currentObj : maxObj;
      });

      setWinnerData(maxData);
      const prompt = maxData ? `Please provide a brief 1-2 sentence write up about this ${maxData.IsLong ? 'Long':'Short'} trade alerted on {${maxData.EntryDateTimesUtc[maxData.EntryDateTimesUtc.length -1]}}
      that exited on {${maxData.ExitDateTimesUtc[maxData.ExitDateTimesUtc.length -1]}} that trades {${maxData.SymbolName}}. 
      It recently closed out a winner on {${maxData.ExitDateTimesUtc[maxData.ExitDateTimesUtc.length -1]}} for {${maxData.Results[maxData.Results.length -1]}}. 
      If possible, please find one unique stat and include it in the write up like 
      1. it is x% or greater than its average winning trade {${maxData.Mean_w_trades}}
      2. it is x% more than its average trade of {${maxData.AvrTrade}}
      3. This most recent trade was  larger than x% of all trades in this strategy’s history {${maxData.Results} 
      4. A stat of your own creation. Please format all dates as MMM DD, YYYY` : null
      setPrompt(prompt);
    } catch (error) {
      console.error('Failed to fetch winner data:', error);
    }
  };


  return (
    <>
      <main className='container flex flex-col justify-start items-center bg-primary p-4 gap-4'>
        <Feature data={resultData} />
        <Triggering data={cryptoData} />
        <Ads />
        <Winner data={winnerData} />
        <Summary data={winnerData} prompt={prompt} />
        <Sponsor />
      </main>
    </>
  );
};

export default App;
