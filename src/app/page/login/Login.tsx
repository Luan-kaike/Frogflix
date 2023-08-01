import { useState, useCallback, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './css/Login.css'
import { Wrapper } from "../../shared/components";
import { useUsuarioLogado } from "../../shared/hooks";

export const Login = (props: {singUp: boolean}) => {
  const nav = useNavigate();
  const { login, signUp, name} = useUsuarioLogado();

  const vars = useMemo(() => {
    if(props.singUp)
      return{
        mainTitle: 'Crie uma conta',
        btnTitle: 'Criar',
        linkTitle: 'Entrar'
      };

    return{
      mainTitle: 'Entre na sua conta',
      btnTitle: 'Entrar',
      linkTitle: 'Cadastra'
    };

  }, [props.singUp])

  const inputPassword = useRef<HTMLInputElement>(null);
  const inputId = useRef<HTMLInputElement>(null);
  const spanDadPassword = useRef<HTMLSpanElement>(null);
  const spanPassword = useRef<HTMLSpanElement>(null);
  const spanId = useRef<HTMLSpanElement>(null);

  const [id, setId] = useState(name === 'Entrar'? '' : name);
  const [password, setPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<boolean>(true);

  const inputErrorDisplay = (input: HTMLInputElement | HTMLSpanElement, span: HTMLSpanElement, msg: string) => {
    if(input && spanDadPassword){
      span.innerHTML = msg
      span.style.display = 'block'
      input.className = 'inputIncorrect'
    }
  }

  const removeInputErrorDisplay = (input: HTMLInputElement | HTMLSpanElement, span: HTMLSpanElement) => {
    if(input && spanDadPassword){
      span.innerHTML = ''
      span.style.display = 'none'
      input.className = ''
    }
  } 

  const verificationInputsIncorrect = useCallback(() => {
    if(spanId.current && spanPassword.current){
      if(inputId.current){
        const span = spanId.current;
        const input = inputId.current;

        if(!id.trim())
          inputErrorDisplay(input, span, 'Esse campo é obrigatório');
        else if(!/^[a-zA-ZÇ-ç]$/.test(id[0]))
          inputErrorDisplay(input, span, 
            'Esse campo não pode começar com números ou caracteres especiais');

        else if(localStorage.getItem(id) && props.singUp)
          inputErrorDisplay(input, span, 'Esse nome já está em uso');
        else if(!localStorage.getItem(id) && !props.singUp)
          inputErrorDisplay(input, span, 'Não existe uma conta com esse nome');
        else if(id.length > 3 || 15 < id.length)
          inputErrorDisplay(input, span, 'O nome não pode ser menor de 3 e maior de 15');
        else
          removeInputErrorDisplay(input, span);
      };

      if(inputPassword.current && spanDadPassword.current){
        const input = spanDadPassword.current
        const span = spanPassword.current

        if(!password.trim())
          inputErrorDisplay(input, span, 'Esse campo é obrigatório')
        else 
          removeInputErrorDisplay(input, span);
      };
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, password]);

  const verificationInputs = useCallback(() => {
    const verifsIdLength = (id.length > 3 && 15 < id.length)
    if(!password.trim() || !id.trim() || verifsIdLength ||
    (localStorage.getItem(id) && props.singUp) || 
    (!localStorage.getItem(id) && !props.singUp)){
      verificationInputsIncorrect();
      return;
    };
    if(props.singUp)
      signUp(id, password);
    else{
      const result: any = login(id, password);
      const input = spanDadPassword.current;
      const span = spanPassword.current;
      if(result.msg === 'password incorrect' && input && span){
        inputErrorDisplay(input, span, 'Senha incorreta');
        return;
      }
    }
    nav('/pagina-inicial');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, password]);

  const resetPag = () => {
    setId('');
    setPassword('');

    if(inputId.current && spanId.current ){
      const span = spanId.current;
      const input = inputId.current;
      removeInputErrorDisplay(input, span);
    };
    if(spanDadPassword.current && spanPassword.current){
      const input = spanDadPassword.current
      const span = spanPassword.current
      removeInputErrorDisplay(input, span)
    };
  }

  return(
      <Wrapper pag="Login">
        <form> 
            
          <label>
            <p>{vars.mainTitle}</p>
          </label>

          <label>
            <input type='text'
              placeholder="nome de usuario"
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
                onClick={() => setPasswordStatus(!passwordStatus)}
                viewBox={`${passwordStatus? 30 : 0} 0 576 512`}
              />
            </span>
            <span className="error" ref={spanPassword}></span>
          </label>

          <div>
            <button type="button" onClick={verificationInputs}>
              {vars.btnTitle}
            </button>
          </div>

          <label>
            <Link className="link" 
            to={vars.mainTitle[0] === 'E'? '/cadastro' : '/entrar'}
            onClick={resetPag}>
              {vars.linkTitle}
            </Link>
          </label>

        </form>
      </Wrapper>
  );
};