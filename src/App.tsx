import { BrowserRouter, Route, Routes} from 'react-router-dom'

import { Home } from "./pages/Home/index";
import { Room } from './pages/Room/index';
import { AdmRoom } from './pages/Room/AdmRoom';

import { AuthContextProvider } from './contexts/AuthContext'
import { NewRoom } from './pages/Home/NewRoom';


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
