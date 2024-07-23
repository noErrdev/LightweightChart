import { useCallback, useRef, useState, useEffect } from 'react';
import { CrosshairMode} from 'lightweight-charts';
import { Chart, LineSeries, CandlestickSeries } from 'lightweight-charts-react-wrapper';

import styles from './moving-average.module.css';

export default function MovingAverage(props) {
    // eslint-disable-next-line react/prop-types
    const originalData = props.data;
    const ref = useRef(null);

    const [value, setValue] = useState('n/a');

    const [data, setData] = useState([]);
    const handleCrosshairMove = useCallback((e) => {
        if (ref.current === null) {
            return;
        }
        const data = e.seriesData.get(ref.current);
        if (data !== undefined) {
            setValue((Math.round(data.value * 100) / 100).toFixed(2));
        } else {
            setValue('n/a');
        }
    }, []);

    useEffect(() => {
        fetch('/SPYRaw.txt')
          .then((response) => response.text())
          .then((text) => {
            const lines = text.split('\n').slice(1); // Skip the header line
            const parsedData = lines.map((line) => {
              const [date, , open, high, low, close] = line.split(',');
    
              // Split the date into day, month, and year
              const [month, day , year] = date.split('/');
    
              return {
                close: parseFloat(close),
                high: parseFloat(high),
                low: parseFloat(low),
                open: parseFloat(open),
                time: {
                  day: parseInt(day, 10),
                  month: parseInt(month, 10),
                  year: parseInt(year, 10),
                },
              };
            });
    
            setData(parsedData);
          })
          .catch((error) => console.log('Error fetching or parsing data:', error));
      }, []);

      // Function to find the last EntryDate and ExitDate
      const findLastEntryExitDates = (data) => {
        const entryDate = data.EntryDateTimesUtc ? new Date(data.EntryDateTimesUtc[data.EntryDateTimesUtc.length - 1]) : null;
        const exitDate = data.ExitDateTimesUtc ? new Date(data.ExitDateTimesUtc[data.ExitDateTimesUtc.length - 1]) : null;
        
        const formatDate = (date) => {
          return date ? {
            day: date.getUTCDate(),
            month: date.getUTCMonth() + 1, // Months are zero-indexed, so we add 1
            year: date.getUTCFullYear()
          } : null;
        };
        
        const formatEntryDate = formatDate(entryDate);
        const formatExitDate = formatDate(exitDate);
          
        return { formatEntryDate, formatExitDate };
      };

    const entryDate = findLastEntryExitDates(props.data).formatEntryDate;
    const exitDate = findLastEntryExitDates(props.data).formatExitDate;
    const toISODateString = ({ day, month, year }) => new Date(year, month - 1, day).toISOString().split('T')[0];
    const dataMap = new Map(data.map(d => [toISODateString(d.time), d.open])); 
    const entryDateISO = entryDate ? toISODateString(entryDate) : null;
    const exitDateISO = exitDate ? toISODateString(exitDate) : null;
    // Prepare data for the line connecting EntryDate and ExitDate
    const entryExitLine = entryDateISO && exitDateISO ? [
        { time: entryDateISO, value: dataMap.get(entryDateISO) },
        { time: exitDateISO, value: dataMap.get(exitDateISO) }
    ] : [];
  
    return (
        <>
            <div className={styles.container}>
                { data.length > 0 ? <Chart
                    width={560}
                    height={300}
                    crosshair={{ mode: CrosshairMode.Normal }}
                    onCrosshairMove={handleCrosshairMove}
                >
                    <CandlestickSeries
                        data={data}
                    />
                    {entryExitLine.length > 0 && (
                        <LineSeries
                            data={entryExitLine}
                            color="rgba(4, 111, 232, 1)" // Red color for the line
                            lineWidth={5}
                        />
                    )}
                </Chart> : null}
                <div className={styles['sma-legend']}>
                    MA10 <span style={{ color: 'rgba(4, 111, 232, 1)' }}>{value}</span>
                </div>
            </div>
        </>
    )
}
