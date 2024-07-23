/* eslint-disable react/prop-types */
import FeatureGraph from "../components/FeatureGraph";
import ResultTable from "../components/ResultTable";

const Feature = (props) => {
  const data = props.data;

  return (
    <div className="flex-col flex justify-between bg-secondary shadow-lg p-4">
      <div className="py-4 pb-0">
        <h2 className="text-4xl font-semibold leading-tight text-black">Feature Strategy</h2>
      </div>
      
      <div className="flex-col xl:flex-row flex justify-between">
        <div className="mx-auto px-4 rounded-md mb-4 xl:mb-0">
          <div className="py-4">
            <div className="flex py-4">
              <p className="text-sm font-semibold leading-tight text-black">{data.SymbolName}</p>
              <p className="px-4 text-sm font-semibold leading-tight text-black">{data.isLong ? 'Long' : 'Short'}</p>
            </div>

            <div className="sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
              <div className="flex border-1 w-fit border-blue-400 rounded-md p-1 relative">
                <FeatureGraph data={data} />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto px-4 rounded-md">
          <ResultTable data={data} />
        </div>
      </div>
    </div>
  );
};

export default Feature;
