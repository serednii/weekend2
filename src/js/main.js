// import ButtonComponent from '@/components/ButtonComponent'
import './components/burger'

import $ from 'jquery'
import Swiper from 'swiper'

import 'slick-slider'

const rater = require('rater-js')

// import '../../node_modules/star-rating-svg/dist/jquery.star-rating-svg'

// const button = new ButtonComponent('.button')

// button.element?.addEventListener('click', () => {
//   window.scrollTo({
//     top: document.querySelector('.header').clientHeight,
//     behavior: 'smooth',
//   })
// })

// var swiperContainer = document.querySelector('.slider');

// swiper має дві обгортки swiper є зовнішньою а swiper - wrapper обгортка з елементами swiper - slide    https://swiperjs.com/get-started
new Swiper('.swiper', {
  pagination: {
    el: '.swiper-pagination',
  },
})

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

const ratingElements = document.querySelectorAll('.rater')
function raterRouter(el, ratingInput) {
  const myRater = rater({
    max: 5,
    rating: ratingInput,
    element: el,
    rateCallback: function rateCallback(rating, done) {
      myDataService.rate(rate).then(
        avgRating => {
          // update the avarage rating with the one we get from the server
          myRater.setRating(avgRating)
          // we could disable the rater to prevent another rating
          // if we dont want the user to be able to change their mind
          myRater.disable()
          // dont forget to call done
          done()
        },
        () => {
          // handle the error
          // dont forget to call done
          done()
        },
      )
    },
  })
}

ratingElements.forEach(el =>
  raterRouter(el, Number(el.previousElementSibling.dataset.rating)),
)
