import MetricSingle from '../../components/MetricSingle'
import PeopleIcon from '@mui/icons-material/People';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DomainDisabledIcon from '@mui/icons-material/DomainDisabled';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import './index.scss'
import { useAppSelector } from '../../app/hooks';
import { selectAllResidents } from '../../reducers/residents/residentsSlice';
import { selectAllImmobiles, selectAllImmobilesOccupied, selectAllReceipt } from '../../reducers/immobiles/immobilesSlice';
export default function Dashboard() {
  const metricData = [
    {
      icon: <PeopleIcon/>,
      title: 'Total Moradores',
      backgroundColor: "#27A9E3",
      data: useAppSelector(selectAllResidents).length
    },
    {
      icon: <ApartmentIcon/>,
      title: 'Total Imóveis',
      backgroundColor: "#28B779",
      data: useAppSelector(selectAllImmobiles).length
    },
    {
      icon: <DomainDisabledIcon/>,
      title: 'Imóveis Ocupados',
      backgroundColor: "#FFB848",
      data: useAppSelector(selectAllImmobilesOccupied)?.length
    },
    {
      icon: <AttachMoneyIcon/>,
      title: 'Ganhos Totais',
      backgroundColor: "#DA542E",
      data: useAppSelector(selectAllReceipt)
    }
  ]
  return (
    <div className="dashboard">
      <h2 className="title">Dashboard</h2>
      <div className="metrics">
        {
          metricData.map(metric => (
            <MetricSingle key={metric.title} backgroundColor={metric.backgroundColor} icon={metric.icon} title={metric.title} data={metric.data} />
          ))
        }
      </div>
    </div>
  )
}
