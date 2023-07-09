import React from "react"

interface IButtonLoginProps{
  type?: "button" | "submit" | "reset";
  onClick: () => void;
  children: React.ReactNode;
}
export const ButtonLogin: React.FC<IButtonLoginProps> = (props) => {
  return(
    <button type={props.type} onClick={props.onClick}>
      {props.children}
    </button>
  );
}