import ImageBox from "../components/ImageBox";
import { useState, useEffect } from 'react';

// Function to generate ad data
const generateAdData = () => {
  const numberOfAds = 3; // Adjust based on the number of ads you expect
  const ads = [];

  for (let i = 1; i <= numberOfAds; i++) {
    ads.push({
      id: i,
      contentFile: `/ads/ad${i}.txt`,
      imageUrl: `/ads/ad${i}.jpg`,
    });
  }

  return ads;
};

const Ads = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adData = generateAdData();

        // Fetch content for each ad
        const updatedAds = await Promise.all(adData.map(async (ad) => {
          const contentResponse = await fetch(`${ad.contentFile}`);
          const contentText = await contentResponse.text();

          return { ...ad, content: contentText };
        }));

        setAds(updatedAds);
      } catch (error) {
        console.error('Error fetching ads data:', error);
      }
    };

    fetchData();
  }, []);

  console.log(ads);

  return (
    <div className="container mx-auto p-4 sm:px-8 bg-secondary rounded-md shadow-lg">
      <div>
        <div className="py-4">
          <h2 className="text-4xl font-semibold leading-tight text-black">Advertisements</h2>
        </div>
        <div className="flex justify-between -mx-2">
          {ads.map((item) => (
            <div key={item.id} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-2 py-2">
              <ImageBox content={item.content} url={item.imageUrl} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ads;
