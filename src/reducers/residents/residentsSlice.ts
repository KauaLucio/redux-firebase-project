import { RootState } from './../../app/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { db, collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from '../../services/firebaseConfig'

interface AddResident {
  resident: Residents,
  table: string
}

interface UpdateResident {
  updatedResident: any,
  collection: string,
  residentId: string 
}

interface DeleteResident {
  residentId: string,
  collection: string
}

interface Residents {
  id?: string,
  name: string,
  identifier: string,
  sex: string,
  age: number,
  immobile?: string | null
  email: string,
  phone: string,  
  image: string
}

interface InitialState {
  residents: Residents[],
  status: string,
  error: null | undefined | String
}

const initialState: InitialState = {
  residents: [],
  status: 'idle',
  error: null
}

export const fetchResidents = createAsyncThunk('residents/fetchResidents', async () => {
  const querySnapshot = await getDocs(collection(db, "residents"));
  let results: any = []
  querySnapshot.forEach((doc) => {
    results.push({
      id: doc.id,
      ...doc.data()
    })
  });
  return results
})

export const addResident = createAsyncThunk('residents/addResident', async (residentData: AddResident) => {
  try {
    const { resident, table } = residentData
    const docRef = await addDoc(collection(db, table), resident)
    const newResident: any = {
      id: docRef.id,
      ...resident
    }
    return newResident;
  } catch (error) {
    return error;
  }
})



export const updateResident = createAsyncThunk('residents/updateResident', async (updatedResidentData: UpdateResident) => {
  try {
    const { updatedResident, collection, residentId } = updatedResidentData
    await updateDoc(doc(db, collection, residentId), updatedResident)
    const updatedResidentFormated = {
      id: residentId,
      ...updatedResident
    }
    return updatedResidentFormated;
  } catch (error) {
    return error;
  }
})




export const deleteResident = createAsyncThunk('residents/deleteResident', async (residentData: DeleteResident) => {
  try {
    const { residentId, collection } = residentData
    await deleteDoc(doc(db, collection, residentId));

    return residentId;
  } catch (error) {
    return error;
  }
})

const residentsSlice = createSlice({
  name: 'residents',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(fetchResidents.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(fetchResidents.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.residents = [...action.payload]
    })
    .addCase(addResident.fulfilled, (state, action) => {
      state.residents.push(action.payload)
    })
    .addCase(updateResident.fulfilled, (state, action) => {
      //delete resident from state before updated
      let residents = state.residents.filter(resident => resident.id !== action.payload.id)
      //add resident to the state after updated
      state.residents = [...residents, action.payload]
    })
    .addCase(deleteResident.fulfilled, (state, action) => {
      const residentId = action.payload
      state.residents = state.residents.filter(resident => resident.id !== residentId)
    })
  }
})

export const selectAllResidents = (state: RootState) => state.residents.residents 
export const selectResidentById = (state: RootState, residentId: string | undefined) => {
  return state.residents.residents.find((resident: Residents) => resident.id === residentId)
} 

export default residentsSlice.reducer