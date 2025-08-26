// src/pages/LandingPage.tsx

import { Suspense } from 'react';
import type { FC } from 'react';
import { Hero } from '../components/sections/Hero';
import { DailyInsight } from '../components/sections/DailyInsight';
import { CalculatorForm } from '../components/sections/CalculatorForm';
import { LoaderCircle } from 'lucide-react';

const SectionLoader: FC = () => (
  <div className="flex justify-center items-center h-96">
    <LoaderCircle className="animate-spin text-accent" />
  </div>
);

// O arquivo da página agora só se preocupa com o conteúdo *específico* dela
export default function LandingPage() {
  return (
    // O div principal, Header, Footer, etc., foram movidos para o RootLayout
    <div className="flex flex-col flex-1">
      <section className="mt-24">
        <Hero />
      </section>

      <Suspense fallback={<SectionLoader />}>
        <section id="insight" className="my-24">
          <DailyInsight />
        </section>

        <main id="formulario" className="px-6 md:px-40 flex justify-center pb-24">
          <CalculatorForm />
        </main>
      </Suspense>
    </div>
  );
}