import './index.scss';
interface PropsMessageComponent {
  dataMessage: {
    type: string,
    message: string
  }
}

const Messages = (props: PropsMessageComponent) => {
  return (
    <div className={`message ${props.dataMessage.type === 'success' ? 'success' : 'error'}`}>
      <p>{props.dataMessage.message}</p>
    </div>
  )
}

export default Messages