import './index.scss'
import { ChangeEvent, FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { auth, createUserWithEmailAndPassword, updateProfile} from "../../services/firebaseConfig";

import { useAppDispatch } from '../../app/hooks'
import { setUser } from '../../reducers/user/userSlice'
import { uploadImage } from '../../utils/uploadImage';

export default function Register() {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  function handleChange (e: ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.files) {
      setImage(e.currentTarget.files[0]);
    }
  };

  async function registerUser(e: FormEvent) {
    e.preventDefault()

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)

      updateProfile(user.user, {
        displayName: name,
        photoURL: image ? await uploadImage(image) : null
      }).then(() => {
        dispatch(setUser({
          id: user.user.uid,
          name: name,
          url_photo: user.user.photoURL
        }))
        navigate('/dashboard')
      })

    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  }

  return (
    <div className="register-container">
      <div className="register">
        <h1>Faça seu cadastro</h1>
        <form onSubmit={registerUser}>
          <div>
            <label htmlFor="name">Nome:</label>
            <input onChange={e => setName(e.target.value)} type="text" name="name" id="name" placeholder="Seu nome" />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="Seu e-mail" />
          </div>

          <div>
            <label htmlFor="password">Senha:</label>
            <input onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Sua senha" />
          </div>

          <div className="image">
            <label htmlFor="image">Foto Perfil:</label>
            <input onChange={e => handleChange(e)} type="file" name="image" id="image"/>
          </div>

          <div>
            <button type="submit">Cadastrar</button>
            <Link to="/login">Faça Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
