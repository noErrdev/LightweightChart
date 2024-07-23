import Table from "../components/Table"

const Triggering = (props) => {

      // eslint-disable-next-line react/prop-types
      const data = props.data;
      
      return (
      <div className="container mx-auto px-4 sm:px-4 bg-secondary shadow-lg">
        <div className="">
          <div className="py-4">
            <h2 className="text-4xl font-semibold leading-tight text-black">Triggering Tommorow</h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <Table data ={data}></Table>
          </div>
         </div>
      </div>
      )
    }
    
    export default Triggering