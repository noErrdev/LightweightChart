/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Chart, AreaSeries } from 'lightweight-charts-react-wrapper';
import IceLogo from '../assets/ice.svg';
import FireLogo from '../assets/fire.svg';

/**
 * @typedef {{ time: string, value: number }} DataTableEntry
 */

export default function FeatureGraph(props) {
  /** @type {DataTableEntry[]} */
  const [dataTable, setDataTable] = useState([]);
  const data = props.data;

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch('/None.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const apiResponse = await response.json();
        if (apiResponse.length === 0) {
          throw new Error('API response is not an array');
        }

        const maxData = apiResponse.reduce((maxObj, currentObj) => {
          return currentObj.CoerCoef > maxObj.CoerCoef ? currentObj : maxObj;
        }, { CoerCoef: -Infinity });

        if (Array.isArray(maxData.EntryDateTimesUtc)) {
          let cumulativeSum = 0; // Initialize cumulative sum

          const tableData = maxData.EntryDateTimesUtc.map((entryDateTime, index) => {
            cumulativeSum += maxData.Results[index]; // Add current value to cumulative sum

            return {
              time: new Date(entryDateTime).toISOString().split('T')[0], // Keep ISO date format
              value: cumulativeSum // Set cumulative sum as the value
            };
          });
          setDataTable(tableData);
        } else {
          console.error('maxData.EntryDateTimesUtc is not defined or is not an array');
        }
      } catch (error) {
        console.error('Failed to fetch crypto data:', error);
      }
    };
    fetchCryptoData();
  }, []);

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
    } else {
      icon = 'none';
    }

    return { count, icon };
  };

  return (
    <>
      {
        dataTable.length > 0 ?
          <Chart {...options}>
            <AreaSeries
              data={dataTable}
              topColor="rgba(33, 150, 243, 0.56)"
              bottomColor="rgba(33, 150, 243, 0.04)"
              lineColor="rgba(33, 150, 243, 1)"
              lineWidth={2}
            />
            {data ?
              <div className="absolute top-3 left-5 flex items-center justify-center z-10">
                {countL10(data).icon !== 'none' && 
                  <img src={countL10(data).icon} width={56} height={56} alt=' ' />}
              </div> : null}
          </Chart> : null
      }
    </>
  );
}

const options = {
  width: 500,
  height: 300,
  rightPriceScale: {
    borderColor: 'rgba(197, 203, 206, 1)',
  },
  timeScale: {
    borderColor: 'rgba(197, 203, 206, 1)',
    timeVisible: true,
    secondsVisible: false
  },
};
