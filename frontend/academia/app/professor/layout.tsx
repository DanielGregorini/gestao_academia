import { ReactNode } from "react";
import NavbarProfessor from "@/components/layout/NavbarProfessor";

interface ProfessorLayoutProps {
  children: ReactNode;
}

const ProfessorLayout: React.FC<ProfessorLayoutProps> = ({ children }) => {
  return (
    <>
      <NavbarProfessor />
      {children}
    </>
  );
};

export default ProfessorLayout;