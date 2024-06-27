import { Button } from '/components/ui/button';
import { Input } from '/components/ui/input';
import { Search } from 'lucide-react';
import React, { useState } from 'react';

function Hero({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    onSearch(query); // Call the search handler passed from the parent
  };

  return (
    <div className='flex items-center gap-3 flex-col justify-center pt-14 pb-7'>
      <h2 className='font-bold text-[46px] text-center'>Find Home 
        <span className='text-primary'> Service/Repair</span>
        <br /> Near You
      </h2>
      <h2 className='text-xl text-gray-400'>Explore Best Home Service & Repair near you</h2>
      <div className="mt-4 flex gap-4 items-center">
        <Input
          placeholder="Search"
          className="rounded-full md:w-[350px]"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <Button className="rounded-full h-[46px]">
          <Search className="h-4 w-4"/>
        </Button>
      </div>
    </div>
  );
}

export default Hero;
