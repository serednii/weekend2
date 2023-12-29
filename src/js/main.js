import ButtonComponent from '@/components/ButtonComponent'
import './components/burger'

const button = new ButtonComponent('.button')

button.element?.addEventListener('click', () => {
  window.scrollTo({
    top: document.querySelector('.header').clientHeight,
    behavior: 'smooth',
  })
})
