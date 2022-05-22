import { BrowserRouter, Route, Routes} from 'react-router-dom'

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from './pages/Room';
import { AdmRoom } from './pages/AdmRoom';

import { AuthContextProvider } from './contexts/AuthContext'


function App() {
  
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/room/new" element={<NewRoom/>} />
          <Route path="/room/:id" element={<Room/>}></Route>

          <Route path="/admin/room/:id" element={<AdmRoom />}/>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
