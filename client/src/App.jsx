import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import AllBooks from './pages/AllBooks'
import NewArrival from './pages/NewArrival'
import BestSeller from './pages/BestSeller'
import EditorsPicks from './pages/EditorsPicks'
import About from './pages/About'

function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product-category/all-books" element={<AllBooks />} />
        <Route path="/product-category/new-arrival/" element={<NewArrival />} />
        <Route path="/product-category/best-seller" element={<BestSeller />} />
        <Route path="/product-category/editors-pick" element={<EditorsPicks />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  )
}

export default App
 