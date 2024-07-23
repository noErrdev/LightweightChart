/* eslint-disable react/prop-types */
import FeatureGraph from "../components/FeatureGraph"
import WinnerGraph from "../components/WinnerGraph"
FeatureGraph
const Winner = (props) => {
      const data = props.data;
      return (
            <div className="flex justify-between  flex-col w-full bg-secondary rounded-md shadow-lg">
              <div className="">
                <div className="py-4">
                  <h2 className="text-4xl font-semibold leading-tight text-black">Recent Winner</h2>
                </div>
              </div>
              <div className="flex justify-between w-full p-4 gap-4">
                <div className="mx-auto rounded-md">
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto"></div>
                      <div className="flex border-1 border-blue-400 rounded-md p-1">
                        <WinnerGraph data={data}/>
                      </div>
                </div>
                <div className=" mx-auto rounded-md">
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto"></div>
                      <div className="flex border-1 border-blue-400 rounded-md p-1 relative">
                        <FeatureGraph data={data}/>
                      </div>
                </div>
              </div>
            </div>
          )
}

export default Winner