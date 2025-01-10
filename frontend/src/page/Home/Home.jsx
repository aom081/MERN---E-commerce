import React from 'react'
import Banner from './Banner'
import Category from './category'
import Service from './service'
import SpecialProduct from './specialProduct'
import Testimonial from './testimonial'
const Home = () => {
  return (
    <div>
      <Banner />
      <Category />
      <SpecialProduct />
      <Testimonial />
      <Service />
    </div>
  );
}

export default Home
