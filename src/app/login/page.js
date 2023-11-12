"use client"; // Importa a biblioteca "client".

import InputComponent from "@/components/FormElements/InputComponent";
import { loginFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { login } from "../services/login";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Notification from "@/components/Notifications";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { GlobalContext } from "@/context";

const initialFormdata = {
  email: "",
  password: "",
};

export default function Login() {
  const {
    isAuthUser,
    setIsAuthUser,
    user,
    setUser,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);

  const router = useRouter();
  const [formData, setFormData] = useState(initialFormdata);

  function isValidForm() {
    return (
      formData &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
    );
  }

  async function handleLogin() {
    setComponentLevelLoader({ loading: true, id: "" });
    const res = await login(formData);
    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(true);
      console.log(res,"aquiii")
      setUser(res?.finalData?.user);
      setFormData(initialFormdata);
      Cookies.set("token", res?.finalData?.token);
      Cookies.set("user", JSON.stringify(res?.finalData?.user));
      setComponentLevelLoader({ loading: false, id: "" });
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(false);
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);

  return (
    <div className="bg-gradient-to-b from-blue-200 to-blue-500 h-screen flex items-center justify-center">
      <div style={{width:"50%" , height:"60%"}} className="bg-white p-8 rounded-lg shadow-lg items-center justify-center flex flex-col">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <div style={{width:"100%"}} className="space-y-4 mt-4">
          {loginFormControls.map((controlItem) =>
            controlItem.componentType === "input" ? (
              <InputComponent
                key={controlItem.id}
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
          className={`${
            !isValidForm() ? "opacity-50" : ""
          } bg-green-500 rounded-full text-white py-3 px-6 mt-4 w-full flex justify-center font-bold `}
          disabled={!isValidForm()}
          onClick={handleLogin}
        >
          {componentLevelLoader && componentLevelLoader.loading ? (
            <ComponentLevelLoader text="Logging in" color="#ffffff" loading={componentLevelLoader && componentLevelLoader.loading} />
          ) : (
            "Login"
          )}
        </button>
        <div
        style={{width:"100%"}}
        className="flex flex-col items-center gap-2">
          <p className="flex items-center justify-center mt-5">Não tem conta?</p>
          <button
            className="bg-green-500 rounded-full text-white py-3 px-6 mt-5 w-full transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
            onClick={() => router.push("/register")}
          >
            Registe-se agora
          </button>
        </div>
      </div>
      <Notification/>
    </div>
  );
}
