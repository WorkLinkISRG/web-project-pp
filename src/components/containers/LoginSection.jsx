import { Input } from "../Input";
import { loginData } from "../../data/loginData";
import { Button } from "../Button";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useFormHandle } from "../../hooks/useFormHandle";

export const LoginSection = ({ title }) => {
  const { login } = useAuth();
  const { form, buttonStateDisabled, inputsHandle, setIsLoading } =
    useFormHandle(loginData.initialValues);
  const navigate = useNavigate();

<<<<<<< HEAD
    const handleSubmit = async e => {
        e.preventDefault()
        setButtonState(true)
        const result = await sendLogin()

        if (result.success) {
            localStorage.setItem("x-access-token", result.data.token)
            return navigate('/dashboard-trabajador')
        }

        setButtonState(false)

        // se podría agregar manejo de errores, el error se guarda en result.error
=======
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await login(form);
    if (result.success) {
      return result.role === "worker"
        ? navigate("/dashboard-trabajador")
        : navigate("/dashboard-cliente");
>>>>>>> 5864af8a33097d31a6270e5c5681885d3d515d3a
    }

    setIsLoading(false);

    // se podría agregar manejo de errores, el error se guarda en result.error
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 px-10 min-h-[400px] py-10 text-white flex text-xl flex-col justify-between rounded-xl gap-5"
      >
        <h1 className="flex justify-center font-bold text-3xl">{title}</h1>
        <ul className="grid grid-cols-1 gap-4">
          {loginData.inputs.map((input, index) => (
            <Input
              handle={inputsHandle}
              key={`input-${index}`}
              labelName={input.label}
              {...input.input}
            />
          ))}
        </ul>
        <Button disabledState={buttonStateDisabled} title="Loguearse" />
      </form>
    </section>
  );
};
