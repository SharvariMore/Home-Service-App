"use client"
import BusinessList from '../../../_components/BusinessList';
import GlobalApi from '../../../_services/GlobalApi';
import React, { useEffect, useState } from 'react'

function BusinessByCategory({params}) {

    const [businessList,setBusinessList]=useState([]);

    useEffect(()=>{
        console.log(params);
        params&&getBusinessList()
    },[params]);

    const getBusinessList=()=>{
        GlobalApi.getBusinessByCategory(params.category)
        .then(resp=>{
            setBusinessList(resp?.businessLists);
        })
    }

  return (
    <div>
        <BusinessList title={params.category} businessList={businessList} />
    </div>
  )
}

export default BusinessByCategory