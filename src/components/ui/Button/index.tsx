import React from "react";
import type { ButtonProps } from "./button.types";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = "secondary", type = "button", ...props }, ref) => {
    // Estilos base compartilhados por todos os botões
    let baseClass = "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed";

    // Aplicando os estilos e cores do "Arcano"
    switch (variant) {
      // Para o CTA mais importante (Dourado)
      case "primary":
        baseClass += " bg-[#FFD700] text-[#1A1A2E] hover:bg-yellow-300 shadow-lg shadow-[#FFD700]/25";
        break;
      
      // Para botões com contorno/transparentes
      case "ghost":
        baseClass += " bg-transparent border border-[#2f2546] text-[#a495c6] hover:bg-[#2f2546] hover:text-white";
        break;
        
      // Para ações perigosas (Ex: deletar conta)
      case "destructive":
        baseClass += " bg-red-900/50 text-red-300 border border-red-800/50 hover:bg-red-800/50 hover:text-red-200";
        break;

      // Para ações secundárias (Roxo Escuro) - NOSSO PADRÃO
      case "secondary":
      default:
        baseClass += " bg-[#2f2546] text-white hover:bg-[#3a2f57] shadow-md";
        break;
    }

    return (
      <button
        ref={ref}
        type={type}
        className={`${baseClass} ${className || ""}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";