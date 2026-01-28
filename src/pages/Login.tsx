import GoogleButton from "../components/GoogleButton";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { signWithGoogle } = useAuth();

  const handleLogin = async () => {
    try {
      await signWithGoogle();
    } catch (error) {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <header>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">
            DevBills
          </h1>
          <p className="mt02 text-center text-sm text-gray-600">
            Gerencie suas finanças de forma simples e eficiente
          </p>
        </header>

        <main className="mt-8 bg-white py-8 px-4 shadow-md rounded-lg sm:px-10 space-y-6">
          <section>
            <h2 className="text-lg font-medium text-gray-900 text-center">
              Faça login para continuar
            </h2>
            <p className="text-sm mt-1 text-gray-600 text-center">
              Acesse sua conta para começar a gerenciar suas finanças
            </p>
          </section>
          <div>
            <GoogleButton onClick={handleLogin} isLoading={false} />
          </div>
          <footer className="mt-6">
            <p className="text-sm mt-1 text-gray-600 text-center">
              Ao fazer login, você concorda com nossos termos de uso e política
              de privacidade.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Login;
