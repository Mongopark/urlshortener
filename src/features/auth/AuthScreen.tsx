import AdminForm from './components/AdminForm.tsx';
import CreateUser from './components/CreateUser.tsx';
import useBreakpoint from '../../hooks/useBreakpoint.ts';
import { useState } from 'react';

export default function AuthScreen() {
  const isMobile = useBreakpoint('md').isBelowMd;
  const [showRegister, setShowRegister] = useState(false);

  const toggleRegister = () => {
    setShowRegister(prevState => !prevState);
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="md:w-[30%] w-[90%] rounded-[10px] md:px-0 mx-auto bg-white">
          <div className="w-full">
            {showRegister ? (
              <AdminForm toggleRegister={toggleRegister} />
            ) : (
              <CreateUser toggleRegister={toggleRegister} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function Logo() {
  return (
    <div className="flex flex-row gap-5 items-center">
      <p className="text-3xl text-primary">Zynopay</p>
    </div>
  );
}
