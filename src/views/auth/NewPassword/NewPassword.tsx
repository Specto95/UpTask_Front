import { useState } from "react";
import { NewPasswordToken } from "./NewPasswordToken";
import { NewPasswordForm } from "./NewPasswordForm";
import { ConfirmToken } from '../../../types/index';

export function NewPassword() {
    const [token, setToken] = useState<ConfirmToken['token']>('')
  const [isValidToken, setIsValidToken] = useState(false);
  return (
    <>
      <h1 className="text-5xl font-black text-white">Nueva contraseña</h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el código que recibiste para {""}
        <span className=" text-fuchsia-500 font-bold"> por email</span>
      </p>

      {!isValidToken ? <NewPasswordToken setToken={setToken} token={token} 
      setIsValidToken={setIsValidToken}
      /> : <NewPasswordForm token={token} />}
    </>
  );
}
