import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { ResultCard } from '../cards/ResultCard';
import { ArrowRight, LoaderCircle } from 'lucide-react';

// IMPORTAÇÕES: Trazendo nossas novas utilidades e constantes
import { useCalculatorForm } from '../../hooks/useCalculatorForm';
import { formFields } from '../../utils/constants';

// Variantes de animação completas, como pertencem a este componente
const containerVariants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: i * 0.1 },
  }),
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
    },
  },
};

export const CalculatorForm = () => {
  // Uma linha para obter toda a lógica complexa do nosso hook customizado.
  const {
    inputValues,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
  } = useCalculatorForm();

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-[960px] w-full bg-gradient-to-br from-[#1A1A2E]/50 to-[#161221]/50 border border-[#2f2546] rounded-2xl p-8 shadow-2xl shadow-[#161221]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-bold text-center pb-6 pt-5">
        Insira seus dados. <span className="text-[#a495c6]">Revele sua essência.</span>
      </h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="w-full"
      >
        {formFields.map(({ name, placeholder }) => (
          <motion.div key={name} variants={childVariants} className="flex flex-col max-w-[480px] px-4 py-3 mx-auto w-full">
            <label htmlFor={name} className="relative">
              <input
                id={name}
                name={name}
                placeholder=" "
                value={inputValues[name] || ''}
                onChange={handleInputChange}
                className={`peer w-full rounded-lg bg-[#2f2546] text-white h-14 p-4 pt-6 text-base border-2 transition-all ${errors[name] ? 'border-red-500' : 'border-transparent focus:border-[#FFD700]/50'} focus:outline-none focus:ring-2 focus:ring-[#FFD700]`}
              />
              <span className={`absolute left-4 text-[#a495c6] transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs ${inputValues[name] ? 'top-2 text-xs' : 'top-4 text-base'}`}>
                {placeholder}
              </span>
            </label>
            {errors[name] && <p className="text-red-500 text-xs mt-1 self-start ml-2">{errors[name]}</p>}
          </motion.div>
        ))}
      </motion.div>
      <div className="flex justify-center px-4 py-5 mt-4">
        <motion.div whileHover={{ scale: isSubmitting ? 1 : 1.05 }} whileTap={{ scale: isSubmitting ? 1 : 0.95 }}>
          <Button type="submit" variant="primary" disabled={isSubmitting} className="px-10 py-4 text-lg">
            {isSubmitting ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                  <LoaderCircle size={20} />
                </motion.div>
                Decodificando...
              </>
            ) : (
              <>
                Decodificar meu destino
                <ArrowRight size={20} />
              </>
            )}
          </Button>
        </motion.div>
      </div>

      <div className="border-t border-[#2f2546] mt-10 pt-10">
        <h2 className="text-2xl font-bold text-center">Seu Oráculo Pessoal</h2>
      </div>
      <ResultCard
        title="Seu Mapa Astral"
        description="Entenda como os planetas moldam sua personalidade, talentos e desafios únicos."
        buttonText="Explorar meu Mapa"
        image="https://img.freepik.com/vetores-gratis/circulo-do-zodiaco-com-signos-do-horoscopo-peixe-pisces-scorpio-aquarius-zodiak-aries-virgo-ilustracao-vetorial_1284-46992.jpg"
      />
      <ResultCard
        title="Seu Arcano Pessoal"
        description="Conheça a energia arquetípica do Tarot que rege seu caminho e suas lições de vida."
        buttonText="Interpretar meu Arcano"
        image="https://img.freepik.com/vetores-gratis/fundo-de-cartas-de-taro-desenhado-a-mao_79603-2055.jpg"
      />
    </motion.form>
  );
};