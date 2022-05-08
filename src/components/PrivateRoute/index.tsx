import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { auth, onAuthStateChanged } from '../../services/firebaseConfig'
import { setUser } from '../../reducers/user/userSlice'


export default function PrivateRoute() {
  // const dispatch = useAppDispatch()
  // useEffect(() => {
  //     const unsubscribe = onAuthStateChanged(auth, (user) => {
  //       if(user) {
          
  //         const {displayName, photoURL, uid} = user
  
  //         //Acrescentar o "!photoURL" no if
  //         if(!displayName) {
  //           throw new Error('Missing information from Google Acount')
  //         }
  
  //         dispatch(setUser({
  //           id: uid,
  //           name: displayName,
  //           url_photo: photoURL
  //         }))

  //       }else {
  //         window.location.href = '/login';
  //       }
  //     })
  
  //     return () => unsubscribe();
  // }, [])

  return (
    <Outlet />
  )
}
