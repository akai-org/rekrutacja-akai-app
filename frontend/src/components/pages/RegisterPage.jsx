import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Btn } from "../../components/Btn";
import { InputWrapper } from "../../components/InputWrapper";
import { VerticalLine } from "../../components/ui/VerticalLine";
import { Container } from "../../components/layout/Container";
import { Footer } from "../../components/layout/Footer";
import { Logo } from "../../components/ui/Logo";
import { Main } from "../../components/layout/Main";

export function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Imię jest wymagane";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Nazwisko jest wymagane";
    }

    if (!formData.email) {
      newErrors.email = "E-mail jest wymagany";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Nieprawidłowy format e-mail";
    }

    if (!formData.password) {
      newErrors.password = "Hasło jest wymagane";
    } else if (formData.password.length < 14) {
      newErrors.password = "Hasło musi mieć co najmniej 14 znaków";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Powtórz hasło";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Hasła nie są identyczne";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Rejestracja:", formData);
      alert("Wszystko wypełnione!");
      navigate('/login');
    }
  };

  const hasError = (fieldName) => {
    return errors[fieldName] ? true : false;
  };

  return (
    <Main className="flex flex-col min-h-screen">
      <div className="flex flex-col max-w-[550px] w-full mx-auto mt-32 py-[73px] px-[67px] border-1 border-[#141414] rounded-[10px] shadow-md text-black mx-4">
        <h2 className="font-bold text-left mb-8 text-2xl">Rejestracja</h2>
        <form onSubmit={handleSubmit}>
          <div className={`mb-4 ${hasError('firstName') ? 'border-l-2 border-red-500 pl-3' : ''}`}>
            <InputWrapper
              labelname="Imię"
              placeholder="Imię"
              name="firstName"
              value={formData.firstName}
              onChange={(value) => handleInputChange("firstName", value)}
              error={errors.firstName}
              className={hasError('firstName') ? 'border-red-500' : ''}
            />
          </div>
          <div className={`mb-4 ${hasError('lastName') ? 'border-l-2 border-red-500 pl-3' : ''}`}>
            <InputWrapper
              labelname="Nazwisko"
              placeholder="Nazwisko"
              name="lastName"
              value={formData.lastName}
              onChange={(value) => handleInputChange("lastName", value)}
              error={errors.lastName}
              className={hasError('lastName') ? 'border-red-500' : ''}
            />
          </div>
          <div className={`mb-4 ${hasError('email') ? 'border-l-2 border-red-500 pl-3' : ''}`}>
            <InputWrapper
              labelname="E-mail"
              placeholder="E-mail"
              name="email"
              type="email"
              value={formData.email}
              onChange={(value) => handleInputChange("email", value)}
              error={errors.email}
              className={hasError('email') ? 'border-red-500' : ''}
            />
          </div>
          <div className={`mb-4 ${hasError('password') ? 'border-l-2 border-red-500 pl-3' : ''}`}>
            <InputWrapper
              labelname="Hasło"
              placeholder="Hasło"
              name="password"
              type="password"
              value={formData.password}
              onChange={(value) => handleInputChange("password", value)}
              error={errors.password}
              className={hasError('password') ? 'border-red-500' : ''}
            />
          </div>
          <div className={`mb-6 ${hasError('confirmPassword') ? 'border-l-2 border-red-500 pl-3' : ''}`}>
            <InputWrapper
              labelname="Powtórz hasło"
              placeholder="Powtórz hasło"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(value) => handleInputChange("confirmPassword", value)}
              error={errors.confirmPassword}
              className={hasError('confirmPassword') ? 'border-red-500' : ''}
            />
          </div>
          <Btn
            type="submit"
            buttonText="Zarejestruj się"
            variant="secondary"
            className="w-full mb-6"
          />
          <VerticalLine className="text-[#CCCCCC]" />
          <div className="mt-6 text-center">
            <p className="text-base text-left text-[#3B3B3B] mb-4 font-semibold">Masz już konto?</p>
            <Btn
              type="button"
              buttonText="Zaloguj się"
              variant="primary"
              className="w-full"
              onClick={() => navigate('/login')}
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
  );
}
