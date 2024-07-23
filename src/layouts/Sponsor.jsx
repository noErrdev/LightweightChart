import SponsorChild from "../components/SponserChild";

const data = [
    {
      id: 1,
      content: ' - Robert Brown',
      url: '/1.jpg',
    },
    {
      id: 2,
      content: '- William Miller',
      url: '/2.jpg',
    },
    {
      id: 3,
      content: '- Derrick Hudson',
      url: '/3.jpg',
    },
    {
      id: 4,
      content: '- Abel Malinobski ',
      url: '/1.jpg',
    },
  ];
const Sponsor = () => {
      return (
      <div className="container mx-auto p-4 sm:px-8 bg-secondary rounded-md shadow-lg">
        <div className="">
          <div className="py-4">
            <h2 className="text-4xl font-semibold leading-tight text-black">Sponsor</h2>
          </div>
          <div className="grid grid-cols-2 gap-6 justify-start items-start">
            {data.map((item) => (
              <div key={item.id} className="bg-[#f6f8fa] p-0 rounded-md rounded-l-full shadow-md">
                <SponsorChild content={item.content} url={item.url} />
              </div>
            ))}
          </div>
        </div>
      </div>
      )
    }

    export default Sponsor