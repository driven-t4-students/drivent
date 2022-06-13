import { githubLogin } from '../../services/authApi';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';

export function Oauth() {
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  useEffect(() => {
    const promise =  githubLogin(code);
    promise.then((res) => {
      setUserData(res.data);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    });
    promise.catch((err) => {
      toast('Não foi possível fazer o login!');
    });
  }, []);

  return (
    <h1>Loading...</h1>
  );
}
