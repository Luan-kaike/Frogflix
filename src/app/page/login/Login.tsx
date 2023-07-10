import { useState, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import './css/Login.css'
import { Header } from "../../shared/components";
import { useUsuarioLogado } from "../../shared/hooks";

export const Login = () => {
  const navigate = useNavigate()
  const { logout } = useUsuarioLogado()

  const inputPassword = useRef<HTMLInputElement>(null)
  const inputId = useRef<HTMLInputElement>(null)

  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  const verificationInputs = useCallback(() => {
    if(!id.trim() || !password.trim() || !/^[a-zA-Z]$/.test(id[0])){
      if((!id.trim() || !/^[a-zA-Z]$/.test(id[0])) && inputId.current ) 
      inputId.current.className = 'inputIncorrect';
      else if(inputId.current) 
      inputId.current.className = '';

      console.log(id , password);

      if(!password.trim() && inputPassword.current) 
      inputPassword.current.className = 'inputIncorrect';
      else if(inputPassword.current) 
      inputPassword.current.className = '';
      return;
    }
  
    console.log(id , password);
    logout(id)
    navigate('/pagina-inicial')
  }, [id, password, navigate, logout]);

  

  return(
    <>
      <Header />
      <div className="Login">
        
        <form> 
          <label>
            <p>Entre na sua conta</p>
          </label>

          <label>
            <input type='text'
              placeholder="nome de usuario ou email"
              ref={inputId} 
              value={id}
              onChange={(e) => setId(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter'? 
              inputPassword.current?.focus() : null}
            />
          </label>

          <label>
            <input type="password"
              ref={inputPassword}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) =>{if(e.key === 'Enter'){verificationInputs()}}} 
            />
          </label>

          <label>
            <button type="button"
              onClick={verificationInputs}
            >Entrar
            </button>
          </label>

          <label><Link className="link" to={'/cadastro'}>Cadastrar</Link></label>
        </form>
      </div>
    </>
  );
}