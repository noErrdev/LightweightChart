import SponsorChild from "../components/SponserChild";
import React, { useEffect, useState } from 'react';
import { loadSponsors } from '../utils/loadSponsors';

const Sponsor = () => {
  const [sponsors, setSponsors] = useState([]);
  useEffect(() => {
    const fetchSponsors = async () => {
      const data = await loadSponsors();
      setSponsors(data);
    };

    fetchSponsors();
  }, []);
      return (
      <div className="container mx-auto p-4 sm:px-8 bg-secondary rounded-md shadow-lg">
        <div className="">
          <div className="py-4">
            <h2 className="text-4xl font-semibold leading-tight text-black">Sponsor</h2>
          </div>
          <div className="grid grid-cols-2 gap-6 justify-start items-start">
          {sponsors.map(sponsor => (
              <div key={sponsor.name} className="bg-[#f6f8fa] p-0 rounded-md rounded-l-full shadow-md">
                <SponsorChild content={sponsor.name} url={sponsor.image} />
              </div>
            ))}
          </div>
        </div>
      </div>
      )
    }

    export default Sponsor