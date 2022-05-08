import './index.scss'
import { useAppSelector } from '../../app/hooks'
import TableDataImmobiles from '../../components/TableDataImmobiles';
import { Link } from 'react-router-dom';


const Immobiles = () => {

  const immobiles = useAppSelector(state => state.immobiles.immobiles)

  return (
    <div>
      <div className="title-container">
        <h2 className="title">Meus Imóveis</h2>
        <Link className="link-button" to="/imoveis/cadastrar">Cadastrar Imóvel</Link>
      </div>
      <div className="residents">
        <TableDataImmobiles rowData={immobiles} />
      </div>
    </div>
  )
}

export default Immobiles