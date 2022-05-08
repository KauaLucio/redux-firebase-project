import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectImmobileById } from '../../reducers/immobiles/immobilesSlice'
import { deleteResident, selectResidentById } from '../../reducers/residents/residentsSlice'
import './index.scss'

export default function ResidentSingle() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const resident = useAppSelector(state => selectResidentById(state, id))
  const immobile = useAppSelector(state => selectImmobileById(state, resident?.immobile))

  async function handleDelete() {
      if(id) {
        await dispatch(deleteResident({residentId: id, collection: 'residents'}))
        navigate(`/moradores`)
      }
    }

    function handleUpdate() {
      if(resident) {
        console.log('olá')
        navigate(`/moradores/atualizar/${resident.id}`)
      }
    }
  return (
    <div>
      <div className="title-container">
        <h2 className="title">Morador - <span>{resident?.name}</span></h2>
        <Link className="link-button" to="/moradores">Voltar</Link>
      </div>
      <div className="resident-info-container">
        <div className="resident-info-photo">
          <img src={resident?.image} alt={resident?.name}/>
          <div className="action-buttons">
            <button type="button" onClick={() => handleUpdate()}>Editar</button>
            <button type="button" onClick={() => handleDelete()}>Deletar</button>
          </div>
        </div>
        <div className="resident-info">
            <h2>Informaçãoes Pessoais:</h2>
              <div>
                <p>Nome:</p>
                <span>{resident?.name}</span>
              </div>
              <div>
                <p>Sexo:</p>
                <span>{resident?.sex}</span>
              </div>
              <div>
                <p>Idade:</p>
                <span>{resident?.age}</span>
              </div>
              <div>
                <p>E-mail:</p>
                <span  style={{textTransform: 'none'}}>{resident?.email}</span>
              </div>
              <div>
                <p>Telefone/Celular:</p>
                <span>{resident?.phone}</span>
              </div>
              <div>
                <p>CPF/RG:</p>
                <span>{resident?.identifier}</span>
              </div>        
        </div>
        {
          immobile && (
            <div className="apartment-info">
              <h2>Informações do Apartamento:</h2>
                <div>
                  <p>Nome Imóvel:</p>
                  <span>{immobile.name}</span>
                </div>
                <div>
                  <p>Valor (R$):</p>
                  <span>{immobile.price}</span>
                </div>
                <div>
                <p>Tamanho (m&sup2;):</p>
                  <span>{immobile.sqrMeters}</span>
                </div>
                <div>
                  <p>Endereço:</p>
                  <span>{immobile.address}</span>
                </div>
                <div>
                  <p>CEP:</p>
                  <span>{immobile.cep}</span>
                </div>
                <Link to={`/imoveis/imovel/${immobile.id}`}>Ver imóvel</Link>
            </div>
          )
        }
        </div>   
    </div>
  )
}
