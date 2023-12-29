// import ButtonComponent from '@/components/ButtonComponent'
import './components/burger'

// import Swiper from 'swiper'
// import 'swiper/css'

import $ from 'jquery'
import 'slick-slider'

// const button = new ButtonComponent('.button')

// button.element?.addEventListener('click', () => {
//   window.scrollTo({
//     top: document.querySelector('.header').clientHeight,
//     behavior: 'smooth',
//   })
// })

// var swiperContainer = document.querySelector('.slider');

//swiper має дві обгортки swiper є зовнішньою а swiper-wrapper обгортка з елементами swiper-slide    https://swiperjs.com/get-started
// const swiper = new Swiper('.swiper', {
//   pagination: {
//     el: ".swiper-pagination",
//   },
// });

$('.slider').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: true,
  arrows: false,
  centerPadding: '20px',
  variableWidth: true,
  // centerMode: true,
  // fade: true,
  responsive: [
    {
      breakpoint: 1130,
      settings: {
        slidesToShow: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
})
