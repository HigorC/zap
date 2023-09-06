import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './features/userSlice'

function App() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({ ...state }))
  console.log(user);
  return (
    <div className="dark">
      <button onClick={()=> {dispatch(logout())}}>logout</button>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
