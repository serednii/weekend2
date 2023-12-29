import { disableScroll } from './disable-scroll'
import { enableScroll } from './enable-scroll'

(() => {
  const burger = document?.querySelector('[data-burger]')
  const menu = document?.querySelector('[data-menu]')
  const menuItems = document?.querySelectorAll('[data-menu-item]')
  const overlay = document?.querySelector('[data-menu-overlay]')
  const body = document?.querySelector('body')

  body.addEventListener('click', e => {
    if (!e.target.closest('.header__menu') && !e.target.closest('.burger')) {
      // eslint-disable-next-line no-unused-expressions
      menu.classList.contains('.menu--active') && hiddenMenu()
    }
  })
  burger?.addEventListener('click', () => {
    burger?.classList.toggle('burger--active')
    menu?.classList.toggle('menu--active')

    if (menu?.classList.contains('menu--active')) {
      burger?.setAttribute('aria-expanded', 'true')
      burger?.setAttribute('aria-label', 'Закрыть меню')
      disableScroll()
    } else {
      burger?.setAttribute('aria-expanded', 'false')
      burger?.setAttribute('aria-label', 'Открыть меню')
      enableScroll()
    }
  })

  overlay?.addEventListener('click', () => {
    hiddenMenu()
  })

  menuItems?.forEach(el => {
    el.addEventListener('click', () => {
      hiddenMenu()
    })
  })

  function hiddenMenu() {
    burger?.setAttribute('aria-expanded', 'false')
    burger?.setAttribute('aria-label', 'Открыть меню')
    burger.classList.remove('burger--active')
    menu.classList.remove('menu--active')
    enableScroll()
  }
})()
