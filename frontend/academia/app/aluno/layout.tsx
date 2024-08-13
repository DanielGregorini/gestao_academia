import { ReactNode } from "react";
import NavbarAluno from "@/components/layout/NavbarAluno";

interface AlunoLayoutProps {
  children: ReactNode;
}

const AlunoLayout: React.FC<AlunoLayoutProps> = ({ children }) => {
  return (
    <>
      <NavbarAluno />
      {children}
    </>
  );
};

export default AlunoLayout;
