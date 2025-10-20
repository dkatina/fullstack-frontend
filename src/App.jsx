import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomeView from "./views/HomeView"
import LoginView from "./views/LoginView"
import NavBar from "./components/NavBar/NavBar"
import CollectionView from "./views/CollectionView/CollectionView"

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<HomeView/>} />
          <Route path='/login' element={<LoginView/>} />
          <Route path='/collections' element={<CollectionView/>}/>
        </Routes>
      </BrowserRouter>
  
    </>
  )
}

export default App
