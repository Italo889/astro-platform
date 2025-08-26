import type { ButtonHTMLAttributes, ReactNode } from 'react';

// Nossas variantes semânticas para o projeto Arcano
export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}