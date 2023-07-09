import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Link } from "react-router-dom";

import { InputLogin } from "./components/InputLogin";
import { ButtonLogin } from "./components/ButtonLogin";

export const Login = () => {
  const inputPassword = useRef<HTMLInputElement>(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const heddleLogin = useCallback(() => {
    if(email && password){
      console.log('ola')
    }
  }, [email, password]);

  useEffect(() => {
    console.log(email);
  }, [email])

  useEffect(() => {
    console.log(password);
  }, [password]);

  const lengthEmail = useMemo(() => {
    return email.length;
  }, [email]);

  return(
    <div>
      <form>
        <p>tamanho do email: {lengthEmail}</p>
        
        <InputLogin 
          label='Email' 
          value={email}
          onChange={(newValue) => setEmail(newValue)}
          onPressEntre={() => inputPassword.current?.focus()}
        />

        <InputLogin 
          label='Senha' 
          type="password"
          value={password}
          ref={inputPassword}
          onChange={(newValue) => setPassword(newValue)}
        />
        
        <ButtonLogin type="button" onClick={heddleLogin}>
          ola
        </ButtonLogin>

        <Link to='pagina-inicial'>link</Link>
      </form>
    </div>
  );
}