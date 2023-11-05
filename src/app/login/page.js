"use client"; // Importa a biblioteca "client".

import InputComponent from "@/components/FormElements/InputComponent"; // Importa um componente de input personalizado.
import { loginFormControls } from "@/utils"; // Importa os controles do formulário de login de um utilitário.
import { useRouter } from "next/navigation"; // Importa o hook de roteamento do Next.js.
import { useContext, useEffect, useState } from "react";
import { login } from "../services/login";
import { GlobalContext } from "@/context";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const initialFormdata = {
  email: "",
  password: "",
};

export default function Login() {
  const { isAuthUser, setIsAuthUser, user, setUser } =
    useContext(GlobalContext);

  const router = useRouter(); // Inicializa o hook de roteamento.

  const [formData, setFormData] = useState(initialFormdata);

  function isValidForm() {
    return formData &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

  async function handleLogin() {
    const res = await login(formData);

    console.log(res);

    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(true);
      setUser(res?.finalData?.user);
      setFormData(initialFormdata);
      Cookies.set("token", res?.finalData?.token);
      localStorage.setItem("user", JSON.stringify(res?.finalData?.user));
      setComponentLevelLoader({ loading: false, id: "" });
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(false);
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  console.log(isAuthUser, user);

  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);

  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
          <div className="w-full mt-20 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white-shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center font-futura">
                Login
              </p>
              <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                {loginFormControls.map((controlItem) =>
                  controlItem.componentType === "input" ? ( // Mapeia os controles do formulário.
                    <InputComponent
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      value={formData[controlItem.id]}
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          [controlItem.id]: event.target.value,
                        });
                      }}
                    />
                  ) : null
                )}
              </div>
              <button
                className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-green-500 px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide mt-10"
                disabled={!isValidForm()}
                onClick={handleLogin}
              >
                Login
              </button>
              <div className="flex flex-col items-center gap-2">
                <p className="flex items-center justify-center mt-5">
                  Novo Aqui?
                </p>
                <button
                  className="inline-flex w-full items-center justify-center bg-green-500 px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide mt-5"
                  onClick={() => router.push("/register")} // Redireciona para a página de registro ao clicar no botão "Cadastre-se".
                >
                  Cadastre-se
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
