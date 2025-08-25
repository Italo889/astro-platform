// src/pages/SynastryPage.tsx

import type { FC, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { BackgroundEffects } from '../components/layout/BackgroundEffects';
import { Button } from '../components/ui/Button';
import { Heart, LoaderCircle } from 'lucide-react';
import { useSynastryForm } from '../hooks/useSynastryForm';
import { useAuthStore } from '../store/authStore';
import { FeatureGate } from '../components/auth/FeatureGate';

const PersonInputFields: FC<{ 
  personLabel: string;
  values: Record<string, string>;
  errors: Record<string, string>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ personLabel, values, errors, onChange }) => (
  <div className="space-y-4">
    <h3 className="font-serif text-2xl text-white">{personLabel}</h3>
    
    {[{ name: 'nome', placeholder: 'Nome Completo' }, { name: 'dataNascimento', placeholder: 'Data de Nascimento' }].map(({ name, placeholder }) => (
       <div key={name} className="flex flex-col w-full">
        <label htmlFor={`${personLabel}-${name}`} className="relative">
          <input
            id={`${personLabel}-${name}`}
            name={name}
            placeholder=" "
            value={values[name] || ''}
            onChange={onChange}
            className={`peer w-full rounded-lg bg-[rgb(var(--color-surface))] text-white h-14 p-4 pt-6 text-base border-2 transition-all ${errors[name] ? 'border-red-500' : 'border-transparent focus:border-primary/50'} focus:outline-none focus:ring-2 focus:ring-primary`}
          />
          <span className={`absolute left-4 text-[rgb(var(--color-text-muted))] transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs ${values[name] ? 'top-2 text-xs' : 'top-4 text-base'}`}>
            {placeholder}
          </span>
        </label>
        {errors[name] && <p className="text-red-500 text-xs mt-1 self-start ml-2">{errors[name]}</p>}
      </div>
    ))}
  </div>
);

const SynastryPage: FC = () => {
  const {
    person1Values,
    person2Values,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
  } = useSynastryForm();

  const user = useAuthStore((state) => state.user);
  
  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#161221] overflow-hidden text-white"
      style={{ fontFamily: '"Noto Sans", sans-serif' }}
    >
      <BackgroundEffects />
      <Header />
      
      <main className="flex flex-col flex-1 items-center px-4 md:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="font-serif text-4xl md:text-5xl text-white">O Encontro de Universos</h1>
          <p className="text-lg md:text-xl text-[rgb(var(--color-text-muted))] max-w-2xl mx-auto mt-4 leading-relaxed">
            Descubra os pontos de harmonia e os desafios na sua conexão com outra pessoa através da Sinastria, o mapa da sua relação.
          </p>
        </motion.div>

        {user ? (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full max-w-4xl mt-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
              <PersonInputFields 
                personLabel="Pessoa 1 (Você)" 
                values={person1Values}
                errors={errors.person1}
                onChange={(e) => handleInputChange('person1', e)}
              />
              <PersonInputFields 
                personLabel="Pessoa 2"
                values={person2Values}
                errors={errors.person2}
                onChange={(e) => handleInputChange('person2', e)}
              />
            </div>

            <div className="flex justify-center mt-12">
              <Button variant="primary" type="submit" disabled={isSubmitting} className="px-10 py-4 text-lg">
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="mr-2 animate-spin" size={20}/>
                    Analisando Conexão...
                  </>
                ) : (
                  <>
                    <Heart className="mr-2" size={20}/>
                    Calcular Conexão
                  </>
                )}
              </Button>
            </div>
          </motion.form>
        ) : (
          <FeatureGate 
            title="Recurso Exclusivo para Membros"
            description="A Sinastria é uma análise profunda que requer uma conta. Crie sua jornada gratuitamente para desbloquear esta e outras funcionalidades."
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SynastryPage;