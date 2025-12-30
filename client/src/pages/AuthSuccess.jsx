import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useEffect, useContext } from 'react';
import api from '../api';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';

const AuthSuccess = () => {
  const { registerUser } = useContext(UserContext);
  const { initializeCart } = useContext(CartContext);

  useEffect(() => {
    console.log("did it run? Yes");
    (async () => {
      try {
        const res = await api.get("/auth/is-auth");
        console.log(res)
        console.log(res.data.user)
        
        registerUser(res.data.user);
        await initializeCart();
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, []);

  return (
    <div>
        User logged in
        <Link to="/">Back</Link>
    </div>
  )
}

export default AuthSuccess