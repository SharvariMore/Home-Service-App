import React, { useEffect, useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "/components/ui/sheet";
import { Calendar } from "/components/ui/calendar";
import { Button } from '/components/ui/button';
import GlobalApi from '../../../_services/GlobalApi';
import { useSession, useUser } from '@descope/nextjs-sdk/client';
import { toast } from 'sonner';
import moment from 'moment';

function BookingSection({children, business}) {
  const [date, setDate] = useState();
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [bookedSlot, setBookedSlot] = useState([]);
  
  const { data, isSessionLoading } = useSession();
  const { user } = useUser();

  useEffect(() => {
    getTime();
  }, []);

  useEffect(() => {
      date&&BusinessBookedSlot();
  }, [date]);

  const BusinessBookedSlot = () => {
    GlobalApi.BusinessBookedSlot(business.id, moment(date).format('DD-MMM-yyyy'))
      .then(resp => {
        console.log(resp, "dwdwd");
        setBookedSlot(resp.bookings);
      })
      .catch(error => {
        console.error('Error fetching booked slots:', error);
      });
  };

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({ time: i + ':00 AM' });
      timeList.push({ time: i + ':30 AM' });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({ time: i + ':00 PM' });
      timeList.push({ time: i + ':30 PM' });
    }
    setTimeSlot(timeList);
  };

  const saveBooking = () => {
    if (!user) {
      toast('User not authenticated!');
      return;
    }

    GlobalApi.createNewBooking(business.id, moment(date).format('DD-MMM-yyyy'), selectedTime, user.email, user.name)
      .then((resp) => {
        if (resp) {
          setDate(); // Reset to current date
          setSelectedTime('');
          toast('Service Booked Successfully!');
        }
      })
      .catch((e) => {
        toast('Error While Booking Service!!');
      });
  };

  if (isSessionLoading) {
    return <p>Loading...</p>; 
  }

  const isSlotBooked = (time) => {
    return bookedSlot.some(item => item.time === time);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className='overflow-auto'>
        <SheetHeader>
          <SheetTitle>Book a Service</SheetTitle>
          <SheetDescription>
            Select Date and Time slot to Book a Service
            <div className='flex flex-col gap-5 items-baseline'>
              <h2 className='mt-5 font-bold'>Select Date</h2>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            </div>
            <h2 className='my-5 font-bold'>Select Time Slot</h2>
            <div className='grid grid-cols-3 gap-3'>
              {timeSlot.map((item, index) => (
                <Button key={index} 
                  disabled={isSlotBooked(item.time)}
                  variant='outline' 
                  className={`border rounded-full p-2 px-3 hover:bg-primary hover:text-white ${selectedTime === item.time ? 'bg-primary text-white' : ''}`}
                  onClick={() => setSelectedTime(item.time)}>
                  {item.time}
                </Button>
              ))}
            </div>
          </SheetDescription>
        </SheetHeader>
        <SheetFooter className='mt-5'>
          <SheetClose asChild>
            <div className='flex gap-5'>
              <Button variant="destructive" className="">Cancel</Button>
              <Button disabled={!(selectedTime && date)} onClick={saveBooking}>Book</Button>
            </div>
          </SheetClose>
        </SheetFooter>
      </SheetContent>   
    </Sheet>
  );
}

export default BookingSection;
