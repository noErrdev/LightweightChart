/* eslint-disable react/prop-types */

import SmallGraph from './SmallGraph';
import IceLogo  from '../assets/ice.svg'
import FireLogo from '../assets/fire.svg'
const Table = (props) => {
  // eslint-disable-next-line react/prop-types
  const cryptoData = props.data;
  const countL10 = (cryptocurrency) => {
    let count = 0;
    if (cryptocurrency && cryptocurrency.Results) {
      for (let i = 0; i < 10; i++) {
        if (cryptocurrency.Results[i] > 0) {
          count++;
        }
      }
    }
  
    let icon = '';
    if (count >= 7) {
      icon = FireLogo; // Fire icon
    } else if (count <= 3) {
      icon = IceLogo; // Ice icon
    }
    else {
      icon = 'none'
    }
  
    return { count, icon };
  };
  return (
      <div
      className="inline-block min-w-full shadow-sm rounded-md overflow-hidden border-gray-200 border-1 "
      >
        <table className="min-w-full leading-normal bg-secondary">
         <thead className='shadow-md'>
           <tr>
            <th
            className="px-5 py-3 border-b-1  border-r-1 text-center border-gray-200 text-xxs font-bold text-gray-900 tracking-wider"
            >
            Symbol
            </th>
            <th
            className="px-5 py-3 border-b-1 border-r-1 border-gray-200 text-center text-xxs font-bold text-gray-900 tracking-wider"
            >
            Direction
            </th>
            <th
            className="px-5 py-3 border-b-1 border-r-1 border-gray-200 text-center text-xxs font-bold text-gray-900 tracking-wider"
            >
            Entry
            </th>
            <th
            className="px-5 py-3 border-b-1 border-r-1 border-gray-200 text-center text-xxs font-bold text-gray-900 tracking-wider"
            >
            Exit
            </th>
            <th
            className="px-5 py-3 border-b-1 border-r-1 border-gray-200 text-center text-xxs font-bold text-gray-900 tracking-wider"
            >
            Equity Curve
            </th>
            <th
            className="px-5 py-3 border-b-1 border-r-1 border-gray-200 text-center text-xxs font-bold text-gray-900 tracking-wider"
            >
            Win
            </th>
            <th
            className="px-5 py-3 border-b-1  border-gray-200 text-center text-xxs font-bold text-gray-900 tracking-wider"
            >
            Avg Trade
            </th>
            <th
            className="px-5 py-3 border-b-1  border-gray-200 text-center text-xxs font-bold text-gray-900 tracking-wider"
            >
            L10
            </th>
           </tr>
         </thead>
        <tbody>
      {cryptoData ? cryptoData.map((cryptocurrency, index) =>  
        <tr key ={index} value= {cryptocurrency.EntrySignalsName}>
            <td className="px-3 py-3 border-b-1 border-r-1 text-center border-gray-200 text-xxs">
            <p className="text-gray-600 whitespace-no-wrap">{cryptocurrency.SymbolName}</p>
            </td>
            <td className="px-3 py-3 border-b-1 border-r-1 text-center border-gray-200  text-xxs">
            <p className="text-gray-600 whitespace-no-wrap">{cryptocurrency.IsLong ? 'Long' : 'Short'}</p>
            </td>
            <td className="px-3 py-3 border-b-1  border-r-1 text-center border-gray-200  text-xxs">
            <p className="text-gray-600 whitespace-no-wrap">{cryptocurrency.EntrySignalsName}</p>
            </td>
            <td className="px-3 py-3 border-b-1 border-r-1 text-center border-gray-200  text-xxs">
            <p className="text-gray-600 whitespace-no-wrap">{`${(cryptocurrency.MaxTime)} Max Hold`}</p>
            </td>
            <td className="border-1" style={{ width: '50px', height: '50px', padding: 0 }}>
              <div className='w-full'>
              {cryptocurrency ? <SmallGraph results={cryptocurrency.Results} time={cryptocurrency.EntryDateTimesUtc} /> : null}
              </div>
            </td>
            <td className="px-3 py-3 border-b-1 border-r-1 text-center border-gray-200 text-xxs">
            <p className="text-gray-600 whitespace-no-wrap">{parseInt(cryptocurrency.WinPercentage*100, 10)}%</p>
            </td>
            <td className="px-3 py-3 border-b-1 text-center border-gray-200 text-xxs">
            <p className="text-gray-600 whitespace-no-wrap">{cryptocurrency.AvrTrade ? cryptocurrency.AvrTrade.toFixed(1) : null}</p>
            </td>
            {countL10(cryptocurrency).icon == 'none' ? <td className="px-5 py-3 border-b-1 border-l-1 text-center border-gray-200 text-xxs">
              <div className='flex items-center pl-5'>
              {`${countL10(cryptocurrency) ? countL10(cryptocurrency).count : ''}/L10`}
              </div>
            </td>
            :<td className="px-5 py-3 border-b-1 border-l-1 text-center border-gray-200 text-xxs">
              <div className='flex items-center gap-1'>
              <img src= {`${countL10(cryptocurrency) ? countL10(cryptocurrency).icon : ' '}`} width={16} height={16} alt=' ' ></img>
              {`${countL10(cryptocurrency) ? countL10(cryptocurrency).count : ''}/L10`}
              </div>
            </td>}
         </tr>
      ):null}
      </tbody>
      </table>
      </div>
  );
}

export default Table;
