import './index.scss'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { Link } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addResident } from '../../reducers/residents/residentsSlice';
import { uploadImage } from '../../utils/uploadImage';
import Messages from '../../components/Messages/Messages';

interface MessageData {
  type: string,
  message: string
}


export default function RegisterResident() {
  const [name, setName] = useState('')
  const [identifier, setIdentifier] = useState('')
  const [sex, setSex] = useState('')
  const [age, setAge] = useState(0)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [message, setMessage] = useState<MessageData>({type: '', message: ''})
  const dispatch = useAppDispatch()

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.files) {
      setImage(e.currentTarget.files[0]);
    }
  };

  async function handleRegisterResident(e: FormEvent) {
    e.preventDefault()
    try {
      let urlPhoto 
      if(image) {
        urlPhoto = await uploadImage(image)
      }

      await dispatch(addResident({
        resident: {
          name,
          email,
          age,
          sex,
          immobile: null,
          phone,
          identifier,
          image: urlPhoto ? urlPhoto : 'https://blog.megajogos.com.br/wp-content/uploads/2018/07/no-image.jpg'
        },
        table: 'residents'
      })).unwrap()

      setMessage({type: 'success', message: 'Residente cadastrado com sucesso!'})
    } catch (error) {
      setMessage({type: 'error', message: 'Houve um erro ao registrar o residente'})
    }
  }

  return (
    <div className="register-resident">
      <div className="title-container">
        <h2 className="title">Cadastrar Morador</h2>
        <Link className="link-button" to="/moradores">Voltar</Link>
      </div>
      {message.message !== '' && <Messages dataMessage={message} />}
      <div className="form-container">
        <form onSubmit={handleRegisterResident}>
          <div className="form-image-select">
            <label htmlFor="photo">
              <DriveFolderUploadIcon fontSize="large" />
              Escolha uma foto
            </label>
            <input onChange={handleImageChange} type="file" name="photo" id="photo" />
          </div>
          <div>
            <label htmlFor="name">Nome</label>
            <input onChange={e => setName(e.target.value)} value={name} type="text" name="name" id="name" />
          </div>
          <div>
            <label htmlFor="identifier">CPF/RG</label>
            <input onChange={e => setIdentifier(e.target.value)} value={identifier} type="text" name="identifier" id="identifier" />
          </div>
          <div>
            <label htmlFor="sex">Sexo</label>
            <select onChange={e => setSex(e.target.value)} value={sex} name="sex" id="sex">
              <option value="" disabled selected>Selecione o sexo</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          <div>
            <label htmlFor="age">Idade</label>
            <input onChange={e => setAge(Number(e.target.value))} value={age} type="number" name="age" id="age" min={0} />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input onChange={e => setEmail(e.target.value)} value={email} type="email" name="email" id="email" />
          </div>
          <div>
            <label htmlFor="phone">Telefone/Celular</label>
            <input onChange={e => setPhone(e.target.value)} value={phone} type="text" name="phone" id="phone" />
          </div>
          <div>
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
