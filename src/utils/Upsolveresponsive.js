const RESPONSIVE = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1099, min: 900 },
    items: 2.5,
    slidesToSlide: 2,
  },
  tablet2: {
    breakpoint: { max: 900, min: 650 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 650, min: 0 },
    items: 1,
  },
}

export default RESPONSIVE
