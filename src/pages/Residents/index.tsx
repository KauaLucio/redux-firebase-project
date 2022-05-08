import { Link } from 'react-router-dom';
import TableDataResidents from '../../components/TableDataResidents';
import { useAppSelector } from '../../app/hooks'
import './index.scss'
import { selectAllResidents } from '../../reducers/residents/residentsSlice';

export default function Residents() {
  const residents = useAppSelector(selectAllResidents)
  return (
    <div>
      <div className="title-container">
        <h2 className="title">Moradores</h2>
        <Link className="link-button" to="/moradores/cadastrar">Cadastrar Morador</Link>
      </div>
      <div className="residents">
        <TableDataResidents rowData={residents} />
      </div>
    </div>
  )
}
