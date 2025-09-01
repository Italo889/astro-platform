import { motion, easeOut } from 'framer-motion';
import { Button } from '../ui/Button';
import { ArrowRight, LoaderCircle, Sparkles, Eye } from 'lucide-react';
import { useCalculatorForm } from '../../hooks/useCalculatorForm';
import { formFields } from '../../utils/constants';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { 
      staggerChildren: 0.08, 
      delayChildren: i * 0.15,
      ease: easeOut
    },
  }),
};

const childVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
      duration: 0.6
    },
  },
};

// Componente para criar efeito de constelação
const Constellation = ({ count = 25 }: { count?: number }) => {
  const stars = Array.from({ length: count }, (_, i) => {
    const size = Math.random() * 2 + 1;
    return {
      id: i,
      size,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.7 + 0.3,
      delay: Math.random() * 3
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.y}%`,
            left: `${star.x}%`,
            opacity: star.opacity,
            animation: `twinkle ${2 + Math.random() * 3}s infinite ${star.delay}s`
          }}
        />
      ))}
    </div>
  );
};

export const CalculatorForm = () => {
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
      className="relative flex flex-col max-w-[1000px] w-full 
                 bg-gradient-to-br from-[#161221]/95 via-[#2f2546]/90 to-[#0a0714]/95 
                 backdrop-blur-md border border-[#8b63e9]/20 rounded-3xl 
                 shadow-2xl shadow-[#161221]/70 overflow-hidden"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Efeito de constelação */}
      <Constellation count={30} />
      
      {/* Ornamento superior */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8b63e9]/40 to-transparent" />
      
      {/* Header da seção */}
      <motion.div 
        className="text-center pt-12 pb-8 px-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {/* Badge decorativo */}
        <div className="inline-flex items-center mb-6">
          <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#8b63e9]/40" />
          <div className="mx-3 w-1.5 h-1.5 bg-[#8b63e9]/60 rounded-full" />
          <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#8b63e9]/40" />
        </div>
        
        {/* Título principal com hierarquia premium */}
        <h2 className="font-heading text-3xl lg:text-4xl text-[#F5F5F5] font-normal 
                       tracking-[-0.01em] leading-tight mb-2">
          Insira seus dados.{' '}
          <span className="text-[#FFD700] font-normal">Revele sua essência.</span>
        </h2>
        
        {/* Subtítulo discreto */}
        <p className="text-[#a495c6] text-sm font-light tracking-wide max-w-md mx-auto">
          Compartilhe suas informações para desbloquear os segredos do seu universo interior
        </p>
      </motion.div>

      {/* Container do formulário */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="px-8 pb-8 relative z-10"
      >
        <div className="max-w-[520px] mx-auto w-full space-y-6">
          {formFields.map((field) => (
            <motion.div 
              key={field.id} 
              variants={childVariants} 
              className="relative group"
            >
              <label htmlFor={field.id} className="relative block">
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  placeholder=" "
                  value={inputValues[field.id] || ''}
                  onChange={handleInputChange}
                  className={`peer w-full rounded-2xl bg-[#2f2546]/60 backdrop-blur-sm 
                             text-[#F5F5F5] h-16 px-5 pt-7 pb-3 text-base font-light
                             border transition-all duration-300 focus:outline-none 
                             ${errors[field.id] 
                               ? 'border-red-400/60 focus:border-red-400 focus:ring-2 focus:ring-red-400/20' 
                               : 'border-[#8b63e9]/30 hover:border-[#8b63e9]/40 focus:border-[#8b63e9]/60 focus:ring-2 focus:ring-[#8b63e9]/10'
                             }`}
                />
                
                {/* Label flutuante premium */}
                <span className={`absolute left-5 text-[#a495c6] transition-all duration-300 
                                  pointer-events-none font-light tracking-wide
                                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
                                  peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#FFD700]
                                  ${inputValues[field.id] ? 'top-2 text-xs text-[#FFD700]' : 'top-4 text-base'}`}>
                  {field.placeholder}
                </span>
                
                {/* Indicador de foco */}
                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] 
                                bg-gradient-to-r from-[#8b63e9] to-[#FFD700] rounded-full
                                transition-all duration-300
                                ${inputValues[field.id] ? 'w-full opacity-100' : 'w-0 opacity-0 peer-focus:w-full peer-focus:opacity-100'}`} />
              </label>
              
              {/* Mensagem de erro elegante */}
              {errors[field.id] && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs mt-2 ml-5 font-medium flex items-center gap-1"
                >
                  <Eye size={12} />
                  {errors[field.id]}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Exibição de erros gerais da API */}
      {errors.root && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-8 mb-6 text-center text-red-300 bg-red-900/20 backdrop-blur-sm
                     p-4 rounded-2xl max-w-[520px] mx-auto border border-red-400/20 relative z-10"
        >
          {errors.root}
        </motion.div>
      )}

      {/* Botão de submit premium */}
      <div className="flex justify-center px-8 pb-10 relative z-10">
        <motion.div 
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }} 
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          className="relative group"
        >
          <Button 
            type="submit" 
            variant="primary" 
            disabled={isSubmitting} 
            className="relative px-12 py-5 text-lg font-semibold tracking-wide
                       bg-gradient-to-r from-[#FFD700] to-[#b8941f] 
                       hover:from-[#FFE55C] hover:to-[#FFD700]
                       text-[#1A1A2E] border-0 rounded-2xl 
                       shadow-lg shadow-[#FFD700]/20 hover:shadow-xl hover:shadow-[#FFD700]/30
                       transition-all duration-300 overflow-hidden disabled:opacity-60"
          >
            {/* Efeito de brilho */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative flex items-center gap-3">
              {isSubmitting ? (
                <>
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                  >
                    <LoaderCircle size={20} className="drop-shadow-sm" />
                  </motion.div>
                  <span className="drop-shadow-sm">Decodificando...</span>
                </>
              ) : (
                <>
                  <span className="drop-shadow-sm">Decodificar meu destino</span>
                  <ArrowRight 
                    size={20} 
                    className="drop-shadow-sm group-hover:translate-x-1 transition-transform duration-300" 
                  />
                </>
              )}
            </div>
          </Button>
        </motion.div>
      </div>

      {/* Seção de banners com divisor elegante */}
<div className="relative">
  {/* Divisor premium */}
  <div className="flex items-center justify-center py-12 px-8">
    <div className="flex items-center w-full max-w-2xl">
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#8b63e9]/30 to-[#8b63e9]/60" />
      <div className="mx-6 flex items-center gap-3">
        <div className="w-2 h-2 bg-[#8b63e9]/60 rounded-full" />
        <Sparkles size={20} className="text-[#FFD700]" />
        <div className="w-2 h-2 bg-[#8b63e9]/60 rounded-full" />
      </div>
      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#8b63e9]/30 to-[#8b63e9]/60" />
    </div>
  </div>
  
  {/* Título da seção de banners */}
  <motion.div 
    className="text-center pb-10 px-8"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.2, duration: 0.8 }}
  >
    <h2 className="font-heading text-3xl md:text-4xl text-[#F5F5F5] font-normal mb-3">
      Seu <span className="text-[#FFD700]">Oráculo</span> Pessoal
    </h2>
    <p className="text-[#a495c6] text-sm font-light tracking-wide max-w-lg mx-auto">
      Explore as dimensões sagradas da sua existência através dos arquétipos cósmicos
    </p>
  </motion.div>
  
  {/* Cards de resultado */}
  <div className="px-8 pb-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
    {/* Card do Mapa Astral */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.7 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#8b63e9]/10 to-[#FFD700]/10 rounded-2xl transform group-hover:scale-105 transition-all duration-500" />
      <div className="relative bg-gradient-to-b from-[#2f2546] to-[#1a1528] rounded-2xl p-6 border border-[#8b63e9]/30 overflow-hidden h-full">
        {/* Efeito de brilho */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#8b63e9]/0 via-[#8b63e9]/10 to-[#8b63e9]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Ícone e cabeçalho */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="p-3 rounded-xl bg-[#8b63e9]/10">
            <svg className="w-8 h-8 text-[#8b63e9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2m5-4a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-xs px-3 py-1 rounded-full bg-[#FFD700]/10 text-[#FFD700] font-medium flex items-center gap-1">
            <Sparkles size={12} />
            <span>Astrologia</span>
          </div>
        </div>
        
        {/* Conteúdo */}
        <h3 className="text-xl font-heading font-semibold text-white mb-3 relative z-10">
          Mapa Astral Completo
        </h3>
        <p className="text-[#a495c6] text-sm leading-relaxed mb-5 relative z-10">
          Descubra como a posição dos planetas no momento do seu nascimento influencia sua personalidade, talentos, desafios e propósito de vida.
        </p>
        
        {/* Lista de benefícios */}
        <ul className="space-y-2 mb-6 relative z-10">
          {['Posições planetárias', 'Signos solares e lunares', 'Casas astrológicas', 'Aspectos entre planetas'].map((item, index) => (
            <li key={index} className="flex items-center text-xs text-[#a495c6]">
              <div className="w-4 h-4 rounded-full bg-[#8b63e9]/20 flex items-center justify-center mr-2">
                <div className="w-1 h-1 rounded-full bg-[#8b63e9]" />
              </div>
              {item}
            </li>
          ))}
        </ul>
        
        {/* Botão */}
        <button className="relative w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#8b63e9] to-[#6b4bb9] text-white text-sm font-medium group-hover:from-[#9b73f9] group-hover:to-[#7b5bd9] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative flex items-center justify-center gap-2">
            Explorar Meu Mapa
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </button>
      </div>
    </motion.div>
    
    {/* Card do Arcano Pessoal */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5, duration: 0.7 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 to-[#8b63e9]/10 rounded-2xl transform group-hover:scale-105 transition-all duration-500" />
      <div className="relative bg-gradient-to-b from-[#2f2546] to-[#1a1528] rounded-2xl p-6 border border-[#FFD700]/30 overflow-hidden h-full">
        {/* Efeito de brilho */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700]/0 via-[#FFD700]/10 to-[#FFD700]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Ícone e cabeçalho */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="p-3 rounded-xl bg-[#FFD700]/10">
            <svg className="w-8 h-8 text-[#FFD700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="text-xs px-3 py-1 rounded-full bg-[#8b63e9]/10 text-[#8b63e9] font-medium flex items-center gap-1">
            <Sparkles size={12} />
            <span>Tarot Arcano</span>
          </div>
        </div>
        
        {/* Conteúdo */}
        <h3 className="text-xl font-heading font-semibold text-white mb-3 relative z-10">
          Arcano Pessoal
        </h3>
        <p className="text-[#a495c6] text-sm leading-relaxed mb-5 relative z-10">
          Descubra qual arquétipo do Tarot rege seu caminho atual e receba insights profundos sobre suas lições de vida e potencial de crescimento.
        </p>
        
        {/* Lista de benefícios */}
        <ul className="space-y-2 mb-6 relative z-10">
          {['Arcano principal', 'Arcano de sombra', 'Arcano de potencial', 'Conselhos práticos'].map((item, index) => (
            <li key={index} className="flex items-center text-xs text-[#a495c6]">
              <div className="w-4 h-4 rounded-full bg-[#FFD700]/20 flex items-center justify-center mr-2">
                <div className="w-1 h-1 rounded-full bg-[#FFD700]" />
              </div>
              {item}
            </li>
          ))}
        </ul>
        
        {/* Botão */}
        <button className="relative w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#d4af37] text-[#1A1A2E] text-sm font-medium group-hover:from-[#FFE55C] group-hover:to-[#e5bf3f] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative flex items-center justify-center gap-2">
            Revelar Meu Arcano
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </button>
      </div>
    </motion.div>
  </div>
</div>
</motion.form>
  );
}