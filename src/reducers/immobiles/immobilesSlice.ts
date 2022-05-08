import { RootState } from './../../app/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { db, collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from '../../services/firebaseConfig'

interface AddImmobile {
  immobile: Immobiles,
  table: string
}

interface UpdateImmobile {
  updatedImmobile: any,
  collection: string,
  immobileId: string 
}

interface DeleteImmobile {
  immobileId: string,
  collection: string
}

type Immobiles = {
  id?: string,
  name: string,
  address: string,
  cep: string,
  sqrMeters: number,
  rooms: number,
  bathrooms: number,
  pool: boolean,
  yard: boolean,
  animals: boolean,
  status: boolean,
  resident: string | null,
  price: number
  image: string
}

interface InitialState {
  immobiles: Immobiles[],
  status: string,
  error: null | undefined | String
}

export const fetchImmobiles = createAsyncThunk('immobiles/fetchImmobiles', async () => {
  const querySnapshot = await getDocs(collection(db, "immobiles"));
  let results: any = []
  querySnapshot.forEach((doc) => {
    results.push({
      id: doc.id,
      ...doc.data()
    })
  });
  return results
})



export const addImmobile = createAsyncThunk('immobiles/addImmobile', async (immobileData: AddImmobile) => {
  try {
    const { immobile, table } = immobileData
    const docRef = await addDoc(collection(db, table), immobile)
    const newImmobile: any = {
      id: docRef.id,
      ...immobile
    }
    return newImmobile;
  } catch (error) {
    return error;
  }
})



export const updateImmobile = createAsyncThunk('immobiles/updateImmobile', async (updatedImmobileData: UpdateImmobile) => {
  try {
    const { updatedImmobile, collection, immobileId } = updatedImmobileData
    await updateDoc(doc(db, collection, immobileId), updatedImmobile)
    const updatedImmobileFormated = {
      id: immobileId,
      ...updatedImmobile
    }
    return updatedImmobileFormated;
  } catch (error) {
    return error;
  }
})




export const deleteImmobile = createAsyncThunk('immobiles/deleteImmobile', async (immobileData: DeleteImmobile) => {
  try {
    const { immobileId, collection } = immobileData
    await deleteDoc(doc(db, collection, immobileId));

    return immobileId;
  } catch (error) {
    return error;
  }
})

const initialState: InitialState = {
  immobiles: [],
  status: 'idle',
  error: undefined
}

const immobilesSlice = createSlice({
  name: 'immobiles',
  initialState,
  reducers: {
    
  },
  extraReducers(builder) {
    builder
    .addCase(fetchImmobiles.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(fetchImmobiles.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.immobiles = [...action.payload]
    })
    .addCase(addImmobile.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(addImmobile.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.immobiles.push(action.payload)
    })
    .addCase(updateImmobile.fulfilled, (state, action) => {
      //delete immobile from state before updated
      let immobiles = state.immobiles.filter(immobile => immobile.id !== action.payload.id)
      //add immobile to the state after updated
      state.immobiles = [...immobiles, action.payload]
    })
    .addCase(deleteImmobile.fulfilled, (state, action) => {
      const immobileId = action.payload
      state.immobiles = state.immobiles.filter(immobile => immobile.id !== immobileId)
    })
  }
}) 


export const selectAllImmobiles = (state: RootState) => state.immobiles.immobiles 

export const selectAllImmobilesOccupied = (state: RootState) => {
  const result = state.immobiles.immobiles.filter((immobile: Immobiles)  => immobile.status === false)
  if(result) {
    return result
  }
}

export const selectAllReceipt = (state: RootState) => {
  let receipt = 0

  state.immobiles.immobiles.forEach((immobile: Immobiles)  => {
    if(immobile.status === false) {
      receipt += Number(immobile.price)
    }
  })
  return receipt
}

export const selectImmobileById = (state: RootState, immobileId: string | undefined | null) => {
  const result = state.immobiles.immobiles.find((immobile: Immobiles)  => immobile.id === immobileId)
  if(result) {
    return result
  }
}

export default immobilesSlice.reducer
