import './index.scss'
import { useRef} from 'react'
import HouseIcon from '@mui/icons-material/House';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import EighteenMpIcon from '@mui/icons-material/EighteenMp';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import CheckIcon from '@mui/icons-material/Check';
import PoolIcon from '@mui/icons-material/Pool';
import YardIcon from '@mui/icons-material/Yard';
import PetsIcon from '@mui/icons-material/Pets';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BathtubIcon from '@mui/icons-material/Bathtub';
import Crop32Icon from '@mui/icons-material/Crop32';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { deleteImmobile, selectImmobileById } from '../../reducers/immobiles/immobilesSlice';

export default function ImmobileSingle() {
  const deleteButtonRef = useRef<HTMLButtonElement>(null)
  const updateButtonRef = useRef<HTMLButtonElement>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
    
  const immobile = useAppSelector(state => selectImmobileById(state, id))
  async function handleDelete() {
    if(deleteButtonRef.current !== null && id) {
      await dispatch(deleteImmobile({immobileId: id, collection: 'immobiles'}))
      navigate(`/imoveis`)
    }
  }

  function handleUpdate() {
    if(updateButtonRef.current !== null && immobile) {
      navigate(`/imoveis/atualizar/${immobile.id}`)
    }
  }

  return (
    <div>
      <div className="title-container">
        <h2 className="title">Imóvel - <span>{immobile?.name}</span></h2>
        <Link className="link-button" to="/imoveis">Voltar</Link>
      </div>
      <div className="immobile-info-container">
        <div className="immobile-info-photo">
          <img src={immobile?.image} alt={immobile?.name}/>
          <div className="action-buttons">
            <button type="button" ref={updateButtonRef} onClick={() => handleUpdate()}>Editar</button>
            <button type="button" ref={deleteButtonRef} onClick={() => handleDelete()}>Deletar</button>
          </div>
        </div>
        <div className="immobile-info">
          <div className="info-single">
            <div>
              <span><HouseIcon /></span>
              Nome: 
            </div>
            <p>{immobile?.name}</p>
          </div>

           <div className="info-single">
            <div>
              <span><FmdGoodIcon /></span>
              Endereço: 
            </div>
            <p>{immobile?.address}</p>
          </div>

          <div className="info-single">
            <div>
              <span><EighteenMpIcon /></span>
              CEP: 
            </div>
            <p>{immobile?.cep}</p>
          </div>

          <div className="info-single">
            <div>
              <span><Crop32Icon /></span>
              Metros (m&sup2;): 
            </div>
            <p>{immobile?.sqrMeters}</p>
          </div>

          <div className="info-single">
            <div>
              <span><LocalHotelIcon /></span>
              Quartos: 
            </div>
            <p>{immobile?.rooms}</p>
          </div>

          <div className="info-single">
            <div>
              <span><BathtubIcon /></span>
              Banheiros: 
            </div>
            <p>{immobile?.bathrooms}</p>
          </div>

          <div className="info-single">
            <div>
              <span><PoolIcon /></span>
              Piscina: 
            </div>
            <p>{immobile?.pool  ? 'Sim' : 'Não'}</p>
          </div>

          <div className="info-single">
            <div>
              <span><YardIcon /></span>
              Quintal: 
            </div>
            <p>{immobile?.yard  ? 'Sim' : 'Não'}</p>
          </div>

          <div className="info-single">
            <div>
              <span><PetsIcon /></span>
              Animais: 
            </div>
            <p>{immobile?.animals  ? 'Sim' : 'Não'}</p>
          </div>

          <div className="info-single">
            <div>
              <span><CheckIcon /></span>
              Disponível: 
            </div>
            <p>{immobile?.status ? 'Sim' : 'Não'}</p>
          </div>

          {
            immobile?.resident && (
              <div className="info-single">
                <div>
                  <span><AccountBoxIcon /></span>
                  Morador: 
                </div>
                <p>{immobile?.resident}</p>
              </div>
            )
          }

          <div className="info-single">
            <div>
              <span><AttachMoneyIcon /></span>
              Preço: 
            </div>
            <p>{immobile?.price}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
