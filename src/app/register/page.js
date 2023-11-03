"use client"; // Importa a biblioteca "client".

import InputComponent from "@/components/FormElements/InputComponent"; // Importa o componente de input personalizado.
import SelectComponent from "@/components/FormElements/SelectComponent"; // Importa o componente de seleção personalizado.
import { registrationFormControls } from "@/utils"; // Importa os controles do formulário de registro de um utilitário.
import { useState } from "react";
import { registerNewUser } from "../services/register";

const isRegistered = false; // Define uma variável para verificar se o usuário já está registrado.

const initialFormData = {
  name: "",
  email: "",
  nif: "",
  password: "",
  role: "customer",
};

export default function Register() {
  const [formData, setFormData] = useState(initialFormData);

  console.log(formData);

  function isFormValid() {
    return formData &&
      formData.name &&
      formData.name.trim() !== "" &&
      formData.email &&
      formData.email.trim() !== "" &&
      /^\d+$/.test(formData.nif) &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

  console.log(isFormValid());

  async function handleRegisterOnSubmit() {
    const data = await registerNewUser(formData);

    console.log(data);
  }

  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
          <div className="w-full mt-20 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white-shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center font-futura">
                {isRegistered ? "Registrado com sucesso" : "Sign Up"}{" "}
                {/* Mostra "Registered successfully" se já estiver registrado, caso contrário, exibe "Sign Up". */}
              </p>
              {isRegistered ? (
                <button className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide mt-10">
                  {" "}
                  Login{" "}
                </button>
              ) : (
                <div className=" w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                  {registrationFormControls.map((controlItem) =>
                    controlItem.componentType === "input" ? (
                      <InputComponent
                        type={controlItem.type}
                        placeholder={controlItem.placeholder}
                        label={controlItem.label}
                        onChange={(event) => {
                          setFormData({
                            ...formData,
                            [controlItem.id]: event.target.value,
                          });
                        }}
                        value={formData[controlItem.id]}
                      />
                    ) : controlItem.componentType === "select" ? (
                      <SelectComponent
                        options={controlItem.options}
                        Label={controlItem.label}
                        onChange={(event) => {
                          setFormData({
                            ...formData,
                            [controlItem.id]: event.target.value,
                          });
                        }}
                        value={formData[controlItem.id]}
                      />
                    ) : null
                  )}
                </div>
              )}
              <button
                className=" disabled:opacity-50 inline-flex w-full items-center justify-center bg-green-500 px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide mt-10"
                disabled={!isFormValid()}
                onClick={handleRegisterOnSubmit}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
