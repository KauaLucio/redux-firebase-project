import './index.scss'
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from '../../services/firebaseConfig'
import { useAppDispatch } from '../../app/hooks'
import { setUser } from '../../reducers/user/userSlice'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  async function signIn(e:  FormEvent) {
    e.preventDefault()
    
      try {
        const user = await signInWithEmailAndPassword(auth, email, password)
          dispatch(setUser({
            id: user.user.uid,
            name: user.user.displayName,
            url_photo: user.user.photoURL
          }))
          navigate('/dashboard')
      } catch (error) {
        if (error instanceof Error) {
          console.log(error)
        }
      }
  } 

  return (
    <div className="login-container">
      <div className="login">
        <h1>Faça Login</h1>
        <form onSubmit={signIn}>
          <div>
            <label htmlFor="email">Email:</label>
            <input onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" />
          </div>

          <div>
            <label htmlFor="password">Senha:</label>
            <input onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" />
          </div>

          <div>
            <button type="submit">Logar</button>
            <Link to="/register">Cadastre-se</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
