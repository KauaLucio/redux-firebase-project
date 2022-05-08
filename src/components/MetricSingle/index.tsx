import './index.scss'

interface MetricSingleProps {
  backgroundColor?: string
  icon?: JSX.Element
  title: string,
  data: number | undefined
}


export default function MetricSingle({backgroundColor, icon, title, data}: MetricSingleProps) {
  return (
    <div style={{backgroundColor}} className="metric item">
      {icon}
      <div>
        <h3>{title}</h3>
        <p>{data ? data : 0}</p>
      </div>
    </div>
  )
}
