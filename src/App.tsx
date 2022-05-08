
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import Immobiles from './pages/Immobiles';
import Dashboard from './pages/Dashboard';
import ImmobileSingle from './pages/ImmobileSingle';
import Financial from './pages/Financial'
import Residents from './pages/Residents';
import RegisterResident from './pages/RegisterResident';
import ResidentSingle from './pages/ResidentSingle';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import RegisterImmobile from './pages/RegisterImmobile';
import UpdateImmobile from './pages/UpdateImmobile';
import UpdateResident from './pages/UpdateResident';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>

          <Route element={<Layout />}>
            {/* Mudar para /dashboard */}
            <Route path="dashboard" element={<Dashboard />} />

            {/* Routes Residents */}
            <Route path="moradores">
              <Route index element={<Residents />} />
              <Route path="cadastrar" element={<RegisterResident />} />
              <Route path="morador/:id" element={<ResidentSingle />} />
              <Route path="atualizar/:id" element={<UpdateResident />} />
            </Route>
           
            {/* Routes Immobiles */}
           <Route path="imoveis">
            <Route index element={<Immobiles />} />
            <Route path="cadastrar" element={<RegisterImmobile />} />
            <Route path="imovel/:id" element={<ImmobileSingle />} />
            <Route path="atualizar/:id" element={<UpdateImmobile />} />
           </Route>
            <Route path="financeiro" element={<Financial />} />

          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
