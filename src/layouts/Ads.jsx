import ImageBox from "../components/ImageBox"

const data = [
    {
      id: 1,
      content: 'We’d like a spot for an image to be displayed as an advertisement',
      url: '/1.jpg',
      title: 'BTCUSDT : The decreasing price channel is still active'
    },
    {
      id: 2,
      content: 'We’d like a spot for an image to be displayed as an advertisement',
      url: '/2.jpg',
      title: 'The similarity between BTC and Gold will shock you'
    },
    {
      id: 3,
      content: 'We’d like a spot for an image to be displayed as an advertisement',
      url: '/3.jpg',
      title: 'Bitcoin 128k Bull flag'
    },
  ];
const Ads = () => {
      return (
      <div className="container mx-auto p-4 sm:px-8 bg-secondary rounded-md shadow-lg">
        <div className="">
          <div className="py-4">
            <h2 className="text-4xl font-semibold leading-tight text-black">Advertisments</h2>
          </div>
          <div className="flex justify-between">
            {data.map((item) => (
              <div key={item.id} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 sm:px-8 py-2">
                <ImageBox content={item.content} url={item.url} title={item.title} />
              </div>
            ))}
          </div>
        </div>
      </div>
      )
    }

    export default Ads