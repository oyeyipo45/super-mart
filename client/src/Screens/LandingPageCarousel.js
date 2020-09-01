import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {

  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

const items = [
  {
    src: 'https://res.cloudinary.com/dsipecjov/image/upload/v1596989321/jysjfmcyr6dy4zqjf2d1.jpg',
    altText: 'SHOP WITH US',
    caption: 'iusto odio dignissimos ducimus qui blanditiis praesenti dio dignissimos ducimus qui blanditiis praesentdio dignissimos ducimus',
    explore: "EXPLORE MORE"
  },
  {
    src: 'https://res.cloudinary.com/dsipecjov/image/upload/v1597037733/ffteqlqzbbx0xj2vh5tg.jpg',
    altText: 'Slide 22',
    caption: 'iusto odio dignissimos ducimus qui blanditiis praesenti dio dignissimos ducimus qui blanditiis praesentdio dignissimos ducimus',
    explore: "EXPLORE MORE"
  },
  {
    src: 'https://res.cloudinary.com/dsipecjov/image/upload/v1597037743/ksjfllexpxgxravmmdkr.jpg',
    altText: 'Slide 3',
    caption: 'iusto odio dignissimos ducimus qui blanditiis praesenti dio dignissimos ducimus qui blanditiis praesentdio dignissimos ducimus',
    explore: "EXPLORE MORE"
  }
];

const landingPageCarousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
        className="carousel-container"
        
      >

   
        <img className="l-carousel" src={item.src} alt={item.altText} />
        <div className="landing-carousel-wrapper">
        <CarouselCaption className="landing-carousel-text-1" captionHeader={item.caption}     />
        
        <Link to="/product"> <CarouselCaption className="landing-carousel-button"   captionText={item.explore}  />
       </Link>
        
        </div>

      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default landingPageCarousel;