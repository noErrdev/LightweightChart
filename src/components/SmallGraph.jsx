import { useState, useEffect, useMemo } from 'react';
import { Chart, AreaSeries } from 'lightweight-charts-react-wrapper';

export default function SmallGraph(props) {
    // eslint-disable-next-line react/prop-types
    const results = props.results;
    // eslint-disable-next-line react/prop-types
    const times = props.time;
    const [dataTable, setDataTable] = useState([]);
    useEffect(() => {
        // eslint-disable-next-line react/prop-types
        if (times && Array.isArray(times)) {
            let cumulativeSum = 0; // Initialize cumulative sum
        
            const tableData = times.map((entryDateTime, index) => {
                cumulativeSum += results[index]; // Add current value to cumulative sum
        
                return {
                    time: new Date(entryDateTime).toISOString().split('T')[0], // Keep ISO date format
                    value: cumulativeSum // Set cumulative sum as the value
                };
            });
            setDataTable(tableData);
        } else {
            console.log('data.EntryDateTimesUtc is not defined or is not an array');
        }
    }, [times, results]); // Add dependencies to ensure effect runs only when these props change

    const options = useMemo(() => ({
        width:80,
        height: 50,
        layout: {
            backgroundColor: '#F2F8FF',
            textColor: '#000000',
        },
        grid: {
            vertLines: {
                visible: false,
            },
            horzLines: {
                visible: false,
            },
        },
        rightPriceScale: {
            visible: false,
        },
        timeScale: {
            visible: false,
        },
    }), []); // Use memoization to prevent re-creation of the options object
    return (
        <>
        {
            dataTable.length ? 
            <Chart {...options}>
                <AreaSeries
                    data={dataTable} // Use the processed data from state
                    topColor="rgba(33, 150, 243, 0.56)"
                    bottomColor="rgba(33, 150, 243, 0.2)"
                    lineColor="rgba(33, 150, 243, 1)"
                    lineWidth={1}
                />
            </Chart>
            : null
        }
        </>
    );
}