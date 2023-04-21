
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login';
const App = () => {

  return (
    <>
    <Routes>
      <Route path={'/'} element={<Home/>}></Route>
      <Route path={'/Home'} element={<Home/>}></Route>
      <Route path={'/Login'} element={<Login/>}></Route>
    </Routes>
    </>
  )
}

export default App