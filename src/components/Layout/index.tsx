import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import MenuTop from '../MenuTop'
import Sidebar from '../Sidebar'
import './index.scss'


export default function Layout() {
  const [isVisible, setIsVisible] = useState(window.innerWidth <= 768 ? false : true)

  window.addEventListener('resize', () => {
    if(window.innerWidth <= 768) {
      setIsVisible(false)
    }else {
      setIsVisible(true)
    }
  })

  return (
    <div className="main">
      <Sidebar isVisible={isVisible}  />
      <main>
        <MenuTop setIsVisible={setIsVisible} isVisible={isVisible} />
        <section>
          <Outlet />
        </section>
      </main>
    </div>
  )
}
