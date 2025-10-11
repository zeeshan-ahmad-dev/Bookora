import React from 'react'
import CardItem from './CardItem'
import assets from '../assets/assets'

const CardContainer = () => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-left'>
        <CardItem imgUrl={assets.book_cover_1} title="86 power" price="18.50" />
        <CardItem imgUrl={assets.book_cover_4} title="Be the genius" price="8.09" />
        <CardItem imgUrl={assets.book_cover_3} title="48 Laws of Psycology" price="10.00" />
        <CardItem imgUrl={assets.book_cover_2} title="Why i'm the best" price="29.50" />
        <CardItem imgUrl={assets.book_cover_4} title="Be the genius" price="8.09" />
        <CardItem imgUrl={assets.book_cover_1} title="Be the genius" price="8.09" />
        <CardItem imgUrl={assets.book_cover_3} title="48 Laws of Psycology" price="10.00" />
        <CardItem imgUrl={assets.book_cover_4} title="Be the genius" price="8.09" />
    </div>
  )
}

export default CardContainer