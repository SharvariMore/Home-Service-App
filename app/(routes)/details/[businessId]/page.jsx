"use client";
import { useSession } from '@descope/nextjs-sdk/client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GlobalApi from '../../../_services/GlobalApi';
import BusinessInfo from '../_components/BusinessInfo';
import SuggestedBusinessList from '../_components/SuggestedBusinessList';
import BusinessDescription from '../_components/BusinessDescription';

function BusinessDetail({ params }) {
  const { isAuthenticated, isSessionLoading } = useSession();
  const router = useRouter();
  const [business, setBusiness] = useState(null);

  useEffect(() => {
    if (!isSessionLoading && !isAuthenticated) {
      // Redirect to login page if unauthenticated
      router.push('/auth');
    }
  }, [isAuthenticated, isSessionLoading, router]);

  useEffect(() => {
    if (params && isAuthenticated) {
      getBusinessById();
    }
  }, [params, isAuthenticated]);

  const getBusinessById = () => {
    GlobalApi.getBusinessById(params.businessId)
      .then((resp) => {
        setBusiness(resp.businessList);
      });
  };

  if (isSessionLoading) {
    return <p></p>;
  }

  return (
    isAuthenticated && business ? (
      <div className='py-8 md:py-20 px-10 md:px-36'>
        <BusinessInfo business={business} />
        <div className='grid grid-cols-3 mt-16'>
          <div className='col-span-3 md:col-span-2 order-last md:order-first'>
            <BusinessDescription business={business}/>
          </div>
          <div className=''>
            <SuggestedBusinessList business={business}/>
          </div>
        </div>
      </div>
    ) : null
  );
}

export default BusinessDetail;
