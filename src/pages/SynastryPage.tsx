// src/pages/SynastryPage.tsx

import type { FC, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Heart, LoaderCircle, Users, Sparkles } from 'lucide-react';
import { useSynastryForm } from '../hooks/useSynastryForm';
import { useAuthStore } from '../store/authStore';
import { FeatureGate } from '../components/auth/FeatureGate';

// Componente para os campos de entrada de cada pessoa
const PersonInputFields: FC<{ 
  personLabel: string;
  personNumber: number;
  values: Record<string, string>;
  errors: Record<string, string>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ personLabel, personNumber, values, errors, onChange }) => (
  <motion.div 
    className="space-y-8 relative"
    initial={{ opacity: 0, x: personNumber === 1 ? -40 : 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.2 + personNumber * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {/* Cabeçalho da Pessoa */}
    <div className="text-center relative">
      {/* Número da Pessoa */}
      <motion.div 
        className="w-10 h-10 mx-auto mb-4 rounded-full flex items-center justify-center text-sm font-medium"
        style={{
          backgroundColor: 'rgba(139, 99, 233, 0.15)',
          border: '1px solid rgba(139, 99, 233, 0.3)',
          color: '#8b63e9'
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4 + personNumber * 0.1, duration: 0.5, type: "spring" }}
      >
        {personNumber}
      </motion.div>

      <motion.h3 
        className="text-2xl text-[#F5F5F5] font-normal tracking-wide"
        style={{ fontFamily: 'Marcellus SC, serif' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 + personNumber * 0.1, duration: 0.6 }}
      >
        {personLabel}
      </motion.h3>
      
      {/* Linha Sutil */}
      <motion.div 
        className="w-16 h-px bg-[#8b63e9]/40 mx-auto mt-3"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5 + personNumber * 0.1, duration: 0.6 }}
      />
    </div>
    
    {/* Campos de Input Sofisticados */}
    <div className="space-y-6">
      {[
        { name: 'nome', placeholder: 'Nome completo', type: 'text' }, 
        { name: 'dataNascimento', placeholder: 'Data de nascimento', type: 'date' }
      ].map(({ name, placeholder, type }, index) => (
        <motion.div 
          key={name} 
          className="relative group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + personNumber * 0.1 + index * 0.1, duration: 0.6 }}
        >
          <input
            id={`${personLabel}-${name}`}
            name={name}
            type={type}
            placeholder=" "
            value={values[name] || ''}
            onChange={onChange}
            className={`peer w-full rounded-2xl text-[#F5F5F5] h-16 px-6 pt-7 pb-3 text-base border transition-all duration-400 focus:outline-none focus:scale-[1.02] backdrop-blur-sm ${
              errors[name] 
                ? 'border-red-400/50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20' 
                : 'border-[#8b63e9]/20 focus:border-[#8b63e9]/60 focus:ring-2 focus:ring-[#8b63e9]/20'
            }`}
            style={{
              backgroundColor: 'rgba(47, 37, 70, 0.4)',
              boxShadow: '0 4px 20px rgba(22, 18, 33, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              fontFamily: 'Noto Sans, sans-serif'
            }}
          />
          
          {/* Label Flutuante Sofisticado */}
          <span 
            className={`absolute left-6 transition-all duration-300 pointer-events-none ${
              values[name] || type === 'date'
                ? 'top-3 text-xs text-[#8b63e9] font-medium' 
                : 'top-5 text-base text-[#a495c6] peer-focus:top-3 peer-focus:text-xs peer-focus:text-[#8b63e9] peer-focus:font-medium'
            }`}
            style={{ fontFamily: 'Noto Sans, sans-serif' }}
          >
            {placeholder}
          </span>

          {/* Efeito de Borda Energética */}
          <div className="absolute inset-0 rounded-2xl border border-[#8b63e9]/0 group-hover:border-[#8b63e9]/30 transition-all duration-400 pointer-events-none" />
          
          {/* Indicador de Foco */}
          <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#8b63e9] rounded-full peer-focus:w-1/3 peer-focus:left-1/3 transition-all duration-400" />
        
          {/* Mensagem de Erro Premium */}
          {errors[name] && (
            <motion.p 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-2 ml-2 font-light flex items-center gap-1"
              style={{ fontFamily: 'Noto Sans, sans-serif' }}
            >
              <span className="w-1 h-1 bg-red-400 rounded-full flex-shrink-0" />
              {errors[name]}
            </motion.p>
          )}
        </motion.div>
      ))}
    </div>
  </motion.div>
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
    <main className="flex flex-col flex-1 items-center px-4 md:px-6 py-20 relative overflow-hidden">
      {/* Campo Energético Sutil */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 border border-[#8b63e9]/5 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ 
            rotate: { duration: 45, repeat: Infinity, ease: "linear" },
            scale: { duration: 12, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 border border-[#8b63e9]/5 rounded-full"
          animate={{ rotate: -360, scale: [1, 1.03, 1] }}
          transition={{ 
            rotate: { duration: 35, repeat: Infinity, ease: "linear" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </div>

      {/* Hero Section Elevado */}
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center relative z-10 max-w-5xl mb-20"
      >
        {/* Badge Premium */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-sm"
          style={{
            backgroundColor: 'rgba(139, 99, 233, 0.1)',
            border: '1px solid rgba(139, 99, 233, 0.2)'
          }}
        >
          <Users size={16} className="text-[#8b63e9]" />
          <span className="text-sm text-[#8b63e9] font-medium tracking-wide" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
            Análise Relacional Premium
          </span>
        </motion.div>

        {/* Título Principal */}
        <motion.h1 
          className="text-5xl md:text-6xl text-[#F5F5F5] font-light tracking-wide leading-tight mb-6"
          style={{ fontFamily: 'Marcellus SC, serif' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          O Encontro de
          <motion.span 
            className="block text-[#8b63e9] mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Duas Almas
          </motion.span>
        </motion.h1>
        
        {/* Subtítulo Sofisticado */}
        <motion.p 
          className="text-xl md:text-2xl text-[#a495c6] max-w-3xl mx-auto leading-relaxed font-light mb-8"
          style={{ fontFamily: 'Noto Sans, sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Desvende os mistérios da conexão através da Sinastria — onde os astros revelam 
          a dança cósmica entre duas essências únicas.
        </motion.p>

        {/* Elementos de Valor */}
        <motion.div 
          className="flex flex-wrap justify-center gap-8 text-sm text-[#a495c6]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {[
            'Compatibilidade Profunda',
            'Dinâmicas Relacionais', 
            'Potenciais & Desafios'
          ].map((item, index) => (
            <motion.div 
              key={item}
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
              style={{ fontFamily: 'Noto Sans, sans-serif' }}
            >
              <div className="w-1.5 h-1.5 bg-[#8b63e9]/60 rounded-full" />
              <span className="font-light">{item}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Ornamento Central */}
        <motion.div 
          className="flex items-center justify-center mt-12"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <div className="w-24 h-px bg-[#8b63e9]/30" />
          <motion.div 
            className="mx-6 w-3 h-3 rounded-full"
            style={{ backgroundColor: '#FFD700' }}
            animate={{ 
              boxShadow: [
                '0 0 10px rgba(255, 215, 0, 0.4)',
                '0 0 20px rgba(255, 215, 0, 0.8)',
                '0 0 10px rgba(255, 215, 0, 0.4)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="w-24 h-px bg-[#8b63e9]/30" />
        </motion.div>
      </motion.section>

      {/* Conteúdo Principal */}
      {user ? (
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-6xl relative z-10"
        >
          {/* Container Principal Premium */}
          <motion.div
            className="relative backdrop-blur-sm rounded-3xl overflow-hidden p-8 md:p-16"
            style={{
              backgroundColor: '#110E1B',
              boxShadow: `
                0 25px 60px -12px rgba(22, 18, 33, 0.8),
                0 8px 25px -8px rgba(139, 99, 233, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.08),
                inset 0 0 60px rgba(139, 99, 233, 0.02)
              `
            }}
            whileHover={{
              boxShadow: `
                0 35px 80px -12px rgba(22, 18, 33, 0.9),
                0 12px 35px -8px rgba(139, 99, 233, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                inset 0 0 80px rgba(139, 99, 233, 0.03)
              `
            }}
            transition={{ duration: 0.6 }}
          >
            {/* Borda Elegante */}
            <div className="absolute inset-0 rounded-3xl border border-[#8b63e9]/20" />
            
            {/* Reflexo Superior */}
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-white/10 rounded-full blur-sm" />

            {/* Instrução Superior */}
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <h2 className="text-2xl text-[#F5F5F5] font-light mb-3" style={{ fontFamily: 'Marcellus SC, serif' }}>
                Dados das Duas Pessoas
              </h2>
              <p className="text-[#a495c6] font-light" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                Preencha as informações de ambas as pessoas para calcular a sinastria
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="relative z-10">
              {/* Grade Principal */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 xl:gap-20 items-start relative">
                <PersonInputFields 
                  personLabel="Primeira Pessoa" 
                  personNumber={1}
                  values={person1Values}
                  errors={errors.person1}
                  onChange={(e) => handleInputChange('person1', e)}
                />

                {/* Símbolo de Conexão Premium */}
                <div className="hidden xl:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <motion.div
                    className="relative"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: 'rgba(22, 18, 33, 0.9)',
                        border: '2px solid rgba(139, 99, 233, 0.4)',
                        boxShadow: '0 8px 25px rgba(22, 18, 33, 0.8), inset 0 2px 0 rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Heart size={24} className="text-[#FFD700]" />
                      </motion.div>
                    </div>
                    
                    {/* Anel Orbital */}
                    <motion.div
                      className="absolute inset-2 border border-[#8b63e9]/30 rounded-full"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                </div>

                <PersonInputFields 
                  personLabel="Segunda Pessoa"
                  personNumber={2}
                  values={person2Values}
                  errors={errors.person2}
                  onChange={(e) => handleInputChange('person2', e)}
                />
              </div>

              {/* CTA Section Premium */}
              <motion.div 
                className="text-center mt-20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                {/* Texto Motivacional */}
                <motion.p 
                  className="text-[#a495c6] mb-8 font-light text-lg"
                  style={{ fontFamily: 'Noto Sans, sans-serif' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  Pronto para descobrir os segredos da sua conexão?
                </motion.p>

                {/* Botão Premium */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, type: "spring", stiffness: 400 }}
                >
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="px-16 py-5 text-lg font-medium relative overflow-hidden rounded-2xl shadow-2xl"
                    style={{
                      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                      color: '#1A1A2E',
                      border: 'none',
                      boxShadow: '0 12px 35px rgba(255, 215, 0, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 215, 0, 0.2)',
                      fontFamily: 'Noto Sans, sans-serif'
                    }}
                  >
                    {/* Shimmer Effect Premium */}
                    <motion.div
                      className="absolute inset-0 bg-white/30"
                      initial={{ x: '-100%', skewX: -20 }}
                      whileHover={{ x: '200%' }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      style={{ 
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                      }}
                    />
                    
                    <span className="relative z-10 flex items-center">
                      {isSubmitting ? (
                        <>
                          <LoaderCircle className="mr-3 animate-spin" size={22}/>
                          Analisando Conexão Cósmica...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-3" size={22}/>
                          Revelar Sinastria
                        </>
                      )}
                    </span>
                  </Button>
                </motion.div>

                {/* Garantia/Benefício */}
                <motion.p 
                  className="text-sm text-[#a495c6]/70 mt-6 font-light"
                  style={{ fontFamily: 'Noto Sans, sans-serif' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  Análise completa em menos de 30 segundos
                </motion.p>
              </motion.div>
            </form>
          </motion.div>
        </motion.section>
      ) : (
        <FeatureGate 
          title="Portal Exclusivo para Membros"
          description="A Sinastria é uma jornada sagrada que revela os mistérios da conexão entre almas. Desperte seu acesso para descobrir os segredos cósmicos do amor."
        />
      )}
    </main>
  );
};

export default SynastryPage;