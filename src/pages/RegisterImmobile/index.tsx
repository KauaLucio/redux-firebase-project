import './index.scss'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Messages from '../../components/Messages/Messages';
import { Link } from 'react-router-dom';
import { uploadImage } from '../../utils/uploadImage';
import { addImmobile } from '../../reducers/immobiles/immobilesSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAllResidents } from '../../reducers/residents/residentsSlice';

interface MessageData {
  type: string,
  message: string
}

export default function RegisterImmobile() {
  const residents = useAppSelector(selectAllResidents)
  const [name, setName] = useState('')
  const [immobilePhoto, setImmobilePhoto] = useState<File | null>(null);
  const [address, setAddress] = useState('')
  const [cep, setCep] = useState('')
  const [rooms, setRooms] = useState<number>(0)
  const [bathrooms, setBathrooms] = useState<number>(0)
  const [sqrMeters, setSqrMeters] = useState<number>(0)
  const [price, setPrice] = useState<number>(0)
  const [hasPool, setHasPool] = useState<boolean>(false)
  const [animals, setAnimals] = useState<boolean>(false)
  const [hasYard, setHasYard] = useState<boolean>(false)
  const [isAvailable, setIsAvailable] = useState<boolean>(true)
  const [currentResident, setCurrentResident] = useState('')
  const [message, setMessage] = useState<MessageData>({type: '', message: ''})
  const dispatch = useAppDispatch()
  function handleChange (e: ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.files) {
      setImmobilePhoto(e.currentTarget.files[0]);
    }
  };

  async function registerImmobile(e: FormEvent) {
    e.preventDefault()
    let urlImmobilePhoto
    if(immobilePhoto) {
      urlImmobilePhoto = await uploadImage(immobilePhoto)
    }
    const result = await dispatch(addImmobile({
      immobile: {
        name,
        address,
        animals,
        rooms,
        bathrooms,
        pool: hasPool,
        yard: hasYard,
        status: isAvailable,
        resident: currentResident !== '' ? currentResident : null,
        cep,
        sqrMeters,
        price,
        image: urlImmobilePhoto ? urlImmobilePhoto : 'https://blog.megajogos.com.br/wp-content/uploads/2018/07/no-image.jpg'
      },
      table: 'immobiles'
    }))


    if(result instanceof Error) {
      setMessage({message: 'Erro ao cadastrar o imóvel!', type: 'error'})
    }else {
      setMessage({message: 'Imóvel cadastrado com sucesso!', type: 'success'})
    }

    setName('')
    setImmobilePhoto(null)
    setAddress('')
    setCep('')
    setRooms(0)
    setBathrooms(0)
    setSqrMeters(0)
    setPrice(0)
    setHasPool(false)
    setAnimals(false)
    setHasYard(false)
    setIsAvailable(false)
    setCurrentResident('')
  }

  return (
    <div className="register-immobile">
      <div className="title-container">
        <h2 className="title">Cadastrar Imóvel</h2>
        <Link className="link-button" to="/imoveis">Voltar</Link>
      </div>
      {message.message !== '' && <Messages dataMessage={message} />}
      <div className="form-container">
        <form onSubmit={registerImmobile}>
          <div className="form-image-select">
            <label htmlFor="photo">
              <DriveFolderUploadIcon fontSize="large" />
              Foto do imóvel
            </label>
            <input onChange={handleChange} type="file" name="photo" id="photo" />
          </div>
          <div>
            <label htmlFor="name">Nome</label>
            <input onChange={e => setName(e.target.value)} value={name} type="text" name="name" id="name" />
          </div>
          <div>
            <label htmlFor="address">Endereço</label>
            <input onChange={e => setAddress(e.target.value)} value={address} type="text" name="address" id="address" />
          </div>
          <div>
            <label htmlFor="rooms">Nº Quartos</label>
            <input onChange={e => setRooms(Number(e.target.value))} value={rooms} type="number" name="rooms" id="rooms" />
          </div>
          <div>
            <label htmlFor="bathrooms">Nº Banheiros</label>
            <input onChange={e => setBathrooms(Number(e.target.value))} value={bathrooms} type="number" name="bathrooms" id="bathrooms" />
          </div>
          <div>
            <label htmlFor="meters">Tamanho (m&sup2;)</label>
            <input onChange={e => setSqrMeters(Number(e.target.value))} value={sqrMeters} type="number" name="meters" id="meters" />
          </div>
          <div>
            <label htmlFor="cep">CEP</label>
            <input onChange={e => setCep(e.target.value)} value={cep} type="text" name="cep" id="cep" />
          </div>
          <div>
            <label htmlFor="price">Preço (R$)</label>
            <input onChange={e => setPrice(Number(e.target.value))} value={price} type="number" name="price" id="price" />
          </div>
          <div>
            <label htmlFor="pool">Piscina</label>
            <div className="radio-type">
              <div>
                <input type="radio" name="pool" id="pool" value="sim" checked={hasPool === true} onChange={e => setHasPool(Boolean(e.currentTarget.value === 'sim'))} /> Sim
              </div>
              <div>
                <input type="radio" name="pool" id="pool" value="não" checked={hasPool === false} onChange={e => setHasPool(Boolean(e.currentTarget.value === 'sim'))} /> Não
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="yard">Quintal</label>
            <div className="radio-type">
              <div>
                <input type="radio" name="yard" id="yard" value="sim" checked={hasYard === true} onChange={e => setHasYard(Boolean(e.currentTarget.value === 'sim'))} /> Sim
              </div>
              <div>
                <input type="radio" name="yard" id="yard" value="não" checked={hasYard === false} onChange={e => setHasYard(Boolean(e.currentTarget.value === 'sim'))} /> Não
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="animals">Animais</label>
            <div className="radio-type">
              <div>
                <input type="radio" name="garage" id="garage" value="sim" checked={animals === true} onChange={e => setAnimals(Boolean(e.currentTarget.value === 'sim'))} /> Sim
              </div>
              <div>
                <input type="radio" name="garage" id="garage" value="não" checked={animals === false} onChange={e => setAnimals(Boolean(e.currentTarget.value === 'sim'))} /> Não
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="status">Disponível</label>
            <div className="radio-type">
              <div>
                <input type="radio" name="status" id="status" value="sim" checked={isAvailable === true} onChange={e => setIsAvailable(Boolean(e.currentTarget.value === 'sim'))} /> Sim
              </div>
              <div>
                <input type="radio" name="status" id="status" value="não" checked={isAvailable === false} onChange={e => setIsAvailable(Boolean(e.currentTarget.value === 'sim'))}/> Não
              </div>
            </div>
            {/* Se sim mostrar essa div */}
            <div className={`select-resident ${isAvailable ? 'none' : ''}`}>
                <label htmlFor="resident">Quem mora nesse imóvel</label>
                <select onChange={e => setCurrentResident(e.target.value)} value={currentResident} name="resident" id="resident">
                  <option value="">Selecione um residente</option>
                  {
                    residents?.map(resident => (
                      <option key={resident.id} value={resident.id}>{resident.name}</option>
                    ))
                  }
                </select>
              </div>
          </div>
          <div>
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
