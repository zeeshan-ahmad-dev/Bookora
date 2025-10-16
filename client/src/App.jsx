import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import AllBooks from './pages/AllBooks'

function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
      </Route>
    </Routes>
  )
}

export default App
 