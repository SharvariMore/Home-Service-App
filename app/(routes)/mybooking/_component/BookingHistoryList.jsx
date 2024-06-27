import { Calendar, Clock, MapPin, User } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { toast } from 'sonner'

function BookingHistoryList({bookingHistory}) {
  
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
      {bookingHistory.map((booking, index) => (
        <div key={index} className='border-2 border-grey-500 border-solid rounded-lg p-4 mb-5 '>
          {booking.businessList && booking.businessList.length > 0 ? (
            booking.businessList.map((business, blIndex) => (
              <div key={blIndex} className='flex gap-4 '>
                {business?.name&&
                <Image src={business?.images[0]?.url}
                alt='image'
                width={120}
                height={120}
                className='rounded-lg object-cover'
                />}
                <div className='flex flex-col gap-2 '>
                  <h2 className='font-bold'>{business.name}</h2>
                  <h2 className='flex gap-2 text-primary'> <User/> {business.contactPerson}</h2>
                  <h2 className='flex gap-2 text-gray-500'> <MapPin className='text-primary'/> {business.address}</h2>
                  <h2 className='flex gap-2 text-gray-500'> <Calendar className='text-primary'/> 
                      Service on : <span className='text-black'> {booking.date}</span></h2>
                  <h2 className='flex gap-2 text-gray-500'> <Clock className='text-primary'/> 
                      Service on : <span className='text-black'> {booking.time}</span></h2>
                </div>
              </div>
            ))
          ) : (
            <div className='font-bold text-primary'>No businesses listed</div>
          )}
        </div>
      ))}
    
    </div>
  )
}

export default BookingHistoryList

