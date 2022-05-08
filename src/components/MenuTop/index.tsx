import './index.scss'
import MenuIcon from '@mui/icons-material/Menu';
import { Dispatch, SetStateAction } from 'react';
 
interface MenuTopProps {
  setIsVisible: Dispatch<SetStateAction<boolean>>,
  isVisible: boolean
}

export default function MenuTop({ setIsVisible, isVisible }: MenuTopProps) {
  return (
    <div className="menu-top">
      <div className="icon-menu" onClick={() => setIsVisible(!isVisible)}>
        <MenuIcon />
      </div>
    </div>
  )
}
