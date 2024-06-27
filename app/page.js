"use client"
import React, { useEffect, useState } from 'react';
import { Button } from "/components/ui/button";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import CategoryList from "./_components/CategoryList";
import GlobalApi from "./_services/GlobalApi";
import BusinessList from './_components/BusinessList';

export default function Home() {

  const [categoryList, setCategoryList] = useState([]);
  const [businessList, setBusinessList] = useState([]);
  const [filteredBusinessList, setFilteredBusinessList] = useState([]);

  useEffect(() => {
    getCategoryList();
    getAllBusinessList();
  }, []);
  
  const getCategoryList = () => {
    GlobalApi.getCategory().then(resp => {
      setCategoryList(resp.categories);
    });
  };

  const getAllBusinessList = () => {
    GlobalApi.getAllBusinessList().then(resp => {
      setBusinessList(resp.businessLists);
      setFilteredBusinessList(resp.businessLists); // Initialize the filtered list
    });
  };

  const handleSearch = (query) => {
    if (query === '') {
      setFilteredBusinessList(businessList);
    } else {
      const filteredList = businessList.filter(business =>
        business.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBusinessList(filteredList);
    }
  };

  return (
    <div>
      <Hero onSearch={handleSearch} />
      <CategoryList categoryList={categoryList} />
      <BusinessList businessList={filteredBusinessList} title={'Popular Business'} />
    </div>
  );
}
