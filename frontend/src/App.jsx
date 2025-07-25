import { useState } from "react";
import { Logo } from "./components/ui/Logo";
import { VerticalLine } from "./components/ui/VerticalLine";
import { SwapText } from "./components/ui/SwapText";
import { Btn } from "./components/Btn";
import { InputWrapper } from "./components/InputWrapper";
import { Main } from "./components/layout/Main";
import { Footer } from "./components/layout/Footer";
import { Container } from "./components/layout/Container";
import { LoginForm } from "./components/LoginForm";

function App() {
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

    // Usuń błąd dla tego pola gdy użytkownik zaczyna pisać
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

  const handleLogin = () => {
    if (validateForm()) {
      console.log("Logowanie:", formData);
      alert("Wszystko wypełnione!");
    }
  };

  return (
    <>
      <Main className="flex flex-col min-h-screen">
        <LoginForm>
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
            variant="secondary"
            className="mb-8  mt-3"
            onClick={handleLogin}
          />
          <VerticalLine className="text-[#CCCCCC]" />
          <SwapText />
          <Btn buttonText="Zarejestruj się" variant="primary" />
        </LoginForm>
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
export default App;
