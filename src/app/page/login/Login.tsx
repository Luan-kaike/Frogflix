import { useState, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './css/Login.css'
import { Wrapper } from "../../shared/components";
import { useUsuarioLogado } from "../../shared/hooks";

export const Login = () => {
  const navigate = useNavigate()
  const { logout } = useUsuarioLogado()

  const inputPassword = useRef<HTMLInputElement>(null)
  const inputId = useRef<HTMLInputElement>(null)
  const spanDadPassword = useRef<HTMLSpanElement>(null)
  const spanPassword = useRef<HTMLSpanElement>(null)
  const spanId = useRef<HTMLSpanElement>(null)

  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [passwordStatus, setPasswordStatus] = useState<boolean>(true)

  const verificationInputsIncorrect = useCallback(() => {
    if(spanId.current && spanPassword.current){
    
      if(inputId.current){
        if(!id.trim()){
          spanId.current.innerHTML = 'Esse campo é obrigatório';
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

      if(inputPassword.current && spanDadPassword.current){
        if(!password.trim()){
          spanPassword.current.innerHTML = 'Esse campo é obrigatório';
          spanPassword.current.style.display = 'block';
          spanDadPassword.current.className = 'inputIncorrect';
        }else {
          spanDadPassword.current.className = '';
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
  
  const handlePasswordStatus = useCallback(() => {
    setPasswordStatus(!passwordStatus)
  }, [passwordStatus])

  const handleCoorPasswordSvg = useCallback(() => {
    const x = passwordStatus? 30 : 0
    return `${x} 0 576 512`
  }, [passwordStatus])


  return(
      <Wrapper pag="Login">
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
            <span className="error" ref={spanId}></span>
          </label>

          <label>
            <span ref={spanDadPassword}>
              <input type={passwordStatus? 'password' : 'text'}
                ref={inputPassword}
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) =>{if(e.key === 'Enter'){verificationInputs()
              }}}/>
              <FontAwesomeIcon color='#000' 
                icon={passwordStatus? 'eye-slash' : 'eye'}
                onClick={handlePasswordStatus}
                viewBox={handleCoorPasswordSvg()}
              />
            </span>
            <span className="error" ref={spanPassword}></span>
          </label>

          <div>
            <button type="button" onClick={verificationInputs}>
              Entrar
            </button>
          </div>

          <label>
            <Link className="link" to={'/cadastro'}>Cadastrar</Link>
          </label>

        </form>
      </Wrapper>
  );
}