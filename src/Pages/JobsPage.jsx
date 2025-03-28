import React from 'react'
import JobListings from '../components/JobListings'
import { useEffect, useState } from 'react';
import { useLocation} from 'react-router-dom';
import { toast, Slide } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const JobsPage = () => {

  
  console.log("JobsPage component re-rendered");
  // useEffect(() => {
    // if (location.state?.message) {
      // toast.success(location.state.message, { autoClose: 5000 });
    // }
  // }, [location.state?.message]);  // ✅ Only trigger when `message` changes
  return (
    <section className='bg-blue px-4 py-6'>
      <JobListings/>
    </section>
  )
}

export default JobsPage