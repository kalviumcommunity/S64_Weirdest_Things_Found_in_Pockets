import PocketWeirdosLanding from './Pages/LandingPage'
import PocketFindsForm from './Pages/Pocketfindes'
import PocketFindsGallery from './components/pocketDisplay';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PocketWeirdosLanding/>}/>
        <Route path='/pocket-finds' element={<PocketFindsForm/>}/>
        <Route path='/pocket-gallery' element={<PocketFindsGallery/>}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
