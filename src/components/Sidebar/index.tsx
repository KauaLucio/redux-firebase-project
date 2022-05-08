
import './index.scss'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LogoutIcon from '@mui/icons-material/Logout';

import { auth, signOut } from '../../services/firebaseConfig'
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

interface SidebarProps {
  isVisible: boolean
}

export default function Sidebar({isVisible}: SidebarProps) {
  const user = useAppSelector(state => state.user.user)
  const navigate = useNavigate()
  function loggout() {
    signOut(auth).then(() => {
      navigate('/')
    })
  }

  return (
    <div className={`sidebar ${!isVisible ? 'hidden' : ''}`}>
      <div className="logo">
        <h1>Logo</h1>
      </div>
      <div className="info-user">
        {
          user?.url_photo ? <img src={user?.url_photo} alt={user?.name} /> : <PersonOutlineIcon />
        }
        <div>
          <p>{user?.name}</p>
          <span>Cargo</span>
        </div>
      </div>
      <div className="navigation">
          <nav>
            <Link to="/dashboard">
              <DashboardIcon fontSize="medium" />
              Início
            </Link>
            <Link to="/moradores">
              <PeopleAltIcon fontSize="medium" />
              Moradores
            </Link>
            <Link to="/imoveis">
              <ApartmentIcon fontSize="medium" />
              Imóveis
            </Link>
            <Link to="/financeiro">
              <AccountBalanceWalletIcon fontSize="medium" />
              Financeiro
            </Link>
            
            <a href="#" onClick={()=> loggout()}> 
              <LogoutIcon fontSize="medium" />
              Sair
            </a>
          </nav>
        </div>
    </div>
  )
}
