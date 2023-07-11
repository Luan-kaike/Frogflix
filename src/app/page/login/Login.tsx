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
  const spanPassword = useRef<HTMLSpanElement>(null)
  const spanId = useRef<HTMLSpanElement>(null)

  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  const verificationInputsIncorrect = useCallback(() => {
    if(spanId.current && spanPassword.current){
      spanId.current.innerHTML = '';
      spanPassword.current.innerHTML = ''
    
      if(inputId.current){
        if(!id.trim()){
          spanId.current.innerHTML += 'Esse campo é obrigatório';
          spanId.current.style.display = 'block';
          inputId.current.className = 'inputIncorrect';
        }
        else if(!/^[a-zA-Z]$/.test(id[0])){
          spanId.current.innerHTML = 'Esse campo não pode começar com números, caracteres especiais ou "Ç"';
          spanId.current.style.display = 'block';
          inputId.current.className = 'inputIncorrect';
        }else {
          inputId.current.className = '';
          spanId.current.style.display = 'none';
        }
      }

      if(inputPassword.current){
        if(!password.trim()){
          spanPassword.current.innerHTML = 'Esse campo é obrigatório';
          spanPassword.current.style.display = 'block';
          inputPassword.current.className = 'inputIncorrect';
        }else {
          inputPassword.current.className = '';
          spanPassword.current.style.display = 'none';
        }
      }
    }
  }, [id, password])

  const verificationInputs = useCallback(() => {
    if(!id.trim() || !password.trim() || !/^[a-zA-Z]$/.test(id[0])){
      verificationInputsIncorrect()
      return;
    }
  
    console.log(id , password);
    logout(id)
    navigate('/pagina-inicial')
  }, [id, password, logout, navigate, verificationInputsIncorrect]);
  


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
            <span ref={spanId}></span>
          </label>

          <label>
            <input type="password"
              ref={inputPassword}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) =>{if(e.key === 'Enter'){verificationInputs()}}} 
            />
            <span ref={spanPassword}></span>
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