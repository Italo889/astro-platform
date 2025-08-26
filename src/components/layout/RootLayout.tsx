import type { FC } from 'react';
import { Outlet, Link } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';
import { ScrollText, Sparkles } from 'lucide-react'; // Ícones mais temáticos
import { BackgroundEffects } from './BackgroundEffects';
import { Header } from './Header';
import { Footer } from './Footer';
import { AuthModal } from '../auth/AuthModal';

export const RootLayout: FC = () => {
  return (
    <div
      className="relative flex min-h-screen flex-col bg-background overflow-hidden text-white"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <BackgroundEffects />
      <Header />

      <Outlet />

      <Footer />

      <AuthModal />

      {/* [NOVO DESIGN] O Decreto Cósmico */}
      <CookieConsent
        location="bottom"
        buttonText="Aceitar e Revelar"
        cookieName="arcanoUserConsent"
        expires={150}

        // Container invisível que ancora o decreto
        containerClasses="!fixed inset-x-0 bottom-0 z-50 pointer-events-none"

        // Caixa principal refinada
        style={{
          animation: 'materialize 0.5s ease-out',
          pointerEvents: 'auto',
          margin: '0 auto 2rem auto',
          maxWidth: '48rem',
          borderRadius: '1.25rem',
          border: '1px solid rgba(var(--color-accent-rgb), 0.25)',
          backgroundColor: 'rgba(var(--color-surface-rgb), 0.85)',
          padding: '1.25rem 1.75rem',
          backdropFilter: 'blur(12px) saturate(140%)',
          boxShadow: '0 8px 40px rgba(var(--color-accent-rgb), 0.35)',
        }}

        // Alinhamento flexível: texto à esquerda, botão à direita
        contentClasses="flex items-center justify-between gap-6 !m-0 w-full"

        // Botão dourado com texto preto
        buttonClasses="!font-serif !bg-primary hover:!bg-primary/90 
                    !text-[var(--color-text-on-primary)] 
                    !rounded-xl !px-7 !py-2.5 !text-base !tracking-wide
                    !shadow-md !shadow-primary/30
                    hover:!shadow-xl hover:!shadow-primary/40
                    transition-all duration-300"
      >
        {/* Ícone à esquerda */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 text-accent mt-1">
            <ScrollText size={34} className="drop-shadow-lg" />
          </div>

          {/* Texto */}
          <div className="flex flex-col gap-1 max-w-xl">
            <h3 className="font-serif text-lg text-primary drop-shadow-sm">
              Um Pacto para sua Jornada
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Para que sua jornada seja única e seu destino lembrado, nosso Oráculo utiliza
              selos digitais (cookies). Eles asseguram sua sessão e preferências.
              Ao prosseguir, você firma nosso{' '}
              <Link
                to="/politica-de-privacidade"
                className="font-bold text-accent hover:underline hover:text-primary transition-colors"
              >
                Pacto de Confiança
              </Link>.
            </p>
          </div>
        </div>
      </CookieConsent>

    </div>
  );
};