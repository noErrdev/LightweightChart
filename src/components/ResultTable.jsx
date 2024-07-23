/* eslint-disable react/prop-types */
import IceLogo  from '../assets/ice.svg'
import FireLogo from '../assets/fire.svg'

const ResultTable = (props) => {
  //console.log('ResultTable rendered');

  const cryptocurrency =  props.data;

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
    if (count > 7) {
      icon = FireLogo; // Fire icon
    } else if (count <= 3) {
      icon = IceLogo; // Ice icon
    }
    else {
      icon = ''
    }
  
    return { count, icon };
  };
  return (
      <div className="h-full flex flex-col justify-around">
        <div className="py-4 flex justify-start">
          <p className="text-sm font-semibold leading-tight text-black">Result</p>
        </div>
        <div className="flex flex-col justify-between gap-10">
          <div className="text-black text-left text-xs py-2">
            <div className='flex gap-1'> {countL10(cryptocurrency).icon == 'none' ? ' ':<img src= {`${countL10(cryptocurrency) ? countL10(cryptocurrency).icon : ' '}`} width={16} height={16} alt=' ' ></img>}
            <p className="text-gray-700 py-2">This strategy has won {`${countL10(cryptocurrency) ? countL10(cryptocurrency).count : null}`} of its last 10 trades</p></div>
            <p className="text-gray-700 py-2"><span className="inset-0 bg-green-200 opacity-70 rounded-sm px-1 border-1 border-green-900 text-green-800">Entry</span> {cryptocurrency.EntrySignalsName}</p>
            <p className="text-gray-700 py-2"><span className="inset-0 bg-red-200 opacity-70 rounded-sm px-1 border-1 border-red-900 text-red-800">Exit</span> Max hold {cryptocurrency.MaxTime} days</p>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
            <div
            className="inline-block min-w-full rounded-md overflow-hidden border-1 "
            >
            <table className="min-w-full leading-none bg-secondary">
              <thead className='shadow-md'>
                <tr>
                  <th
                    className="px-5 py-3 border-b-1  border-r-1 text-center border-gray-200 text-xxs font-bold text-gray-900 tracking-wider"
                    >
                    Total P&L
                  </th>
                  <th
                    className="px-5 py-3 border-b-1 border-r-1 border-gray-200 text-center text-xxs font-bold text-gray-900 tracking-wider"
                    >
                     Win
                  </th>
                  <th
                   className="px-5 py-3 border-b-1 border-r-1 border-gray-200 text-center text-xxs font-bold text-gray-900 tracking-wider"
                   >
                    Avg Trade
                  </th>
                  <th
                    className="px-5 py-3 border-b-1 border-r-1 border-gray-200 text-center text-xxs font-bold text-gray-900 tracking-wider"
                    >
                  Avg Win
                  </th>
                  <th
                    className="px-5 py-3 border-b-1 border-r-1 border-gray-200 text-center text-xxs font-bold text-gray-900 tracking-wider"
                    >
                  Avg Less
                  </th>
                  <th
                    className="px-5 py-3 border-b-1  border-gray-200 text-center text-xxs font-bold text-gray-900 tracking-wider"
                   >
                    L10
                  </th>
                </tr>
              </thead>
            <tbody>
              { cryptocurrency ? <tr>
                <td className="px-5 py-3 border-b-1 border-r-1 text-center border-gray-200 text-xxs">
                   <p className="text-gray-900 whitespace-no-wrap">{cryptocurrency.Results ? cryptocurrency.Results.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(1):null}</p>
                </td>
                <td className="px-5 py-3 border-b-1 border-r-1 text-center border-gray-200  text-xxs">
                  <p className="text-gray-600 whitespace-no-wrap">{parseInt(cryptocurrency.WinPercentage*100, 10)}%</p>
                </td>
                <td className="px-5 py-3 border-b-1  border-r-1 text-center border-gray-200  text-xxs">
                  <p className="text-gray-600 whitespace-no-wrap">{cryptocurrency.AvrTrade ? cryptocurrency.AvrTrade.toFixed(1) : 0 }</p>
                </td>
                <td className="px-5 py-3 border-b-1 border-r-1 text-center border-gray-200  text-xxs">
                  <p className="text-gray-600 whitespace-no-wrap">{cryptocurrency.Mean_w_trades ? cryptocurrency.AvrTrade.toFixed(1) : 0 }</p>
                </td>
                <td className="px-5 py-3 border-b-1 border-r-1 text-center border-gray-200  text-xxs">
                  <p className="text-gray-600 whitespace-no-wrap">{cryptocurrency.Mean_l_trades ? cryptocurrency.AvrTrade.toFixed(1) : 0 }</p>
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
              </tr> : null}
            </tbody>
          </table>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ResultTable;