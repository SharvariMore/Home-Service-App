"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "/components/ui/tabs"
import GlobalApi from '../../_services/GlobalApi'
import { useSession, useUser } from '@descope/nextjs-sdk/client'
import { toast } from 'sonner'
import BookingHistoryList from './_component/BookingHistoryList'

function MyBooking() {

    const { data, isSessionLoading } = useSession();
    const { user } = useUser();
    const [bookingHistory, setBookingHistory] = useState([]);

    useEffect(() => {
        if (!isSessionLoading && user) {
            GetUserBookingHistory();
        }
    }, [user, isSessionLoading]);
    
    const GetUserBookingHistory = () => {
        if (!user) {
            toast('User not authenticated!');
            return;
          }

        GlobalApi.GetUserBookingHistory(user.email)
            .then(resp => {
                setBookingHistory(resp.bookings);
            })
    }

    if (isSessionLoading) {
        return <p></p>; 
      }

      const filterData=(type)=>{
         const result=bookingHistory.filter(item=>
             type=='booked'?
             new Date(item.date)>=new Date()
             :new Date(item.date)<=new Date());
             return result;
     }

  return (
    <div className='my-10 mx-5 md:mx-36'>
        <h2 className='font-bold text-[20px] my-2'>My Bookings</h2>
        <Tabs defaultValue="booked" className="w-full">
            <TabsList className="w-full justify-start">
                <TabsTrigger value="booked">Booked</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="booked">
                <BookingHistoryList bookingHistory={filterData('booked')}/>
            </TabsContent>
            <TabsContent value="completed">
                <BookingHistoryList bookingHistory={filterData('completed')}/>  
            </TabsContent>
        </Tabs>
    </div>
  )
}

export default MyBooking