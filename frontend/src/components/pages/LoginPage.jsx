import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Btn } from "../../components/Btn";
import { InputWrapper } from "../../components/InputWrapper";
import { VerticalLine } from "../../components/ui/VerticalLine";
import { SwapText } from "../../components/ui/SwapText";
import { Container } from "../../components/layout/Container";
import { Footer } from "../../components/layout/Footer";
import { Logo } from "../../components/ui/Logo";
import { Main } from "../../components/layout/Main";

export function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "E-mail jest wymagany";
    }

    if (!formData.password) {
      newErrors.password = "Hasło jest wymagane";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Logowanie:", formData);
      alert("Wszystko wypełnione!");
    }
  };

  return (
    <>
      <Main className="flex flex-col min-h-screen">
        <div className="flex flex-col max-w-[550px] w-full mx-auto mt-32 py-[73px] px-[67px] border-1 border-[#141414] rounded-[10px] shadow-md text-black mx-4">
          <h2 className="font-bold text-left mb-8 text-2xl">Logowanie</h2>
          <form onSubmit={handleLogin}>
            <InputWrapper
              labelname="E-mail"
              placeholder="E-mail"
              name="email"
              value={formData.email}
              onChange={(value) => handleInputChange("email", value)}
              error={errors.email}
            />
            <InputWrapper
              labelname="Hasło"
              placeholder="Hasło"
              name="password"
              type="password"
              value={formData.password}
              onChange={(value) => handleInputChange("password", value)}
              error={errors.password}
            />
            <Btn
              buttonText="Zaloguj się"
              variant="primary"
              className="mb-8 mt-3 w-full"
              type="submit"
            />
            <VerticalLine className="text-[#CCCCCC]" />
            <div className="mt-6 text-center">
              <p className="text-base text-left text-[#3B3B3B] mb-4 font-semibold">Nie masz jeszcze konta?</p>
              <Btn
                buttonText="Zarejestruj się"
                variant="secondary"
                className="w-full"
                type="button"
                onClick={() => navigate('/register')}
              />
            </div>
          </form>
        </div>
        <Footer>
          <Container className="flex items-center justify-center gap-8">
            <Logo />
            <p>© 2020-2025 Akademickie Koło Aplikacji Internetowych</p>
          </Container>
        </Footer>
      </Main>
    </>
  );
}