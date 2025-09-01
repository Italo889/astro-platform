import type { FC } from 'react';
import { motion } from 'framer-motion';

export const PrivacyPolicyPage: FC = () => {
  return (
    <div className="flex-1 bg-gradient-to-br from-background-cosmic via-surface-mystical to-background-cosmic text-text-soft font-noto-sans">
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gold-solar/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-20 w-40 h-40 bg-accent-intuitive/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/3 rounded-full blur-3xl"></div>
      </div>

      <motion.main 
        className="relative mx-auto max-w-5xl px-6 py-32"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header elegante */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="font-cinzel text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-gold-solar via-white to-accent-intuitive mb-6 leading-tight"
            whileHover={{ scale: 1.02 }}
          >
            O Pacto de Confiança
          </motion.h1>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-solar to-transparent mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          ></motion.div>
          <motion.p
            className="text-xl text-text-soft max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Sua jornada de autoconhecimento é sagrada. Nossa transparência também.
          </motion.p>
        </motion.div>

        {/* Conteúdo principal */}
        <div className="space-y-16">
          <motion.section
            className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ y: -2 }}
          >
            <motion.h2
              className="font-marcellus text-3xl text-white mb-6 flex items-center gap-3"
            >
              <span className="text-2xl">✨</span>
              A Essência da Nossa Coleta
            </motion.h2>
            <motion.p
              className="text-lg leading-relaxed mb-6"
            >
              Para que o Oráculo possa decifrar seu universo interior, precisamos de alguns
              sinais cósmicos. Coletamos apenas o essencial para iluminar seu caminho:
            </motion.p>
            <motion.ul className="space-y-4">
              <motion.li
                className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-2 h-2 bg-accent-intuitive rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-accent-intuitive text-lg block mb-1">Dados de Nascimento e Nome</strong>
                  <span className="text-text-soft">A chave para calcular seus Arcanos Pessoal, de Vida e de Nome.</span>
                </div>
              </motion.li>
              <motion.li
                className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-2 h-2 bg-gold-solar rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gold-solar text-lg block mb-1">Endereço de E-mail</strong>
                  <span className="text-text-soft">Para criar sua conta, salvar suas jornadas no seu santuário pessoal (Dashboard) e, com seu consentimento, enviar inspirações do nosso oráculo.</span>
                </div>
              </motion.li>
              <motion.li
                className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-violet-400 text-lg block mb-1">Cookies Essenciais</strong>
                  <span className="text-text-soft">Pequenos fragmentos de luz que nos ajudam a lembrar de você e suas preferências, como manter sua sessão ativa e seu consentimento.</span>
                </div>
              </motion.li>
            </motion.ul>
          </motion.section>

          <motion.section
            className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ y: -2 }}
          >
            <motion.h2
              className="font-marcellus text-3xl text-white mb-6 flex items-center gap-3"
            >
              <span className="text-2xl">🛡️</span>
              Como Guardamos Seus Segredos
            </motion.h2>
            <motion.p
              className="text-lg leading-relaxed"
            >
              Seus dados são tratados como um artefato místico. São armazenados em um ambiente
              seguro, com senhas criptografadas e acesso restrito. <span className="text-gold-solar font-semibold">Jamais compartilharemos ou
              venderemos suas informações pessoais a terceiros.</span> Este pacto é inviolável.
            </motion.p>
          </motion.section>

          <motion.section
            className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            whileHover={{ y: -2 }}
          >
            <motion.h2
              className="font-marcellus text-3xl text-white mb-6 flex items-center gap-3"
            >
              <span className="text-2xl">🗝️</span>
              As Chaves do Seu Universo
            </motion.h2>
            <motion.p
              className="text-lg leading-relaxed mb-6"
            >
              De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem total controle
              sobre sua jornada e seus dados. A qualquer momento, você pode:
            </motion.p>
            <motion.ul className="space-y-4 mb-6">
              <motion.li
                className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-400/20"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-green-400 text-lg block mb-1">Acessar</strong>
                  <span className="text-text-soft">Ver todos os dados que guardamos sobre você em seu Dashboard.</span>
                </div>
              </motion.li>
              <motion.li
                className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-400/20"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-blue-400 text-lg block mb-1">Corrigir</strong>
                  <span className="text-text-soft">Atualizar informações que não ressoam mais com sua verdade.</span>
                </div>
              </motion.li>
              <motion.li
                className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-400/20"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-red-400 text-lg block mb-1">Apagar</strong>
                  <span className="text-text-soft">Solicitar a exclusão completa de sua conta e de todos os seus registros em nosso oráculo.</span>
                </div>
              </motion.li>
            </motion.ul>
            <motion.div
              className="p-6 rounded-xl bg-gradient-to-r from-gold-solar/10 to-accent-intuitive/10 border border-gold-solar/20"
            >
              <p className="text-lg">
                Para exercer esses direitos, basta acessar seu Dashboard ou nos contatar através do
                e-mail:
                <motion.a
                  href="mailto:privacidade@arcano.com"
                  className="text-gold-solar font-semibold ml-2 hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  privacidade@arcano.com
                </motion.a>
              </p>
            </motion.div>
          </motion.section>

          {/* Footer elegante */}
          <motion.div
            className="text-center pt-16 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.p
              className="text-text-soft/70 text-sm"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Última atualização: 26 de Agosto de 2025
            </motion.p>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default PrivacyPolicyPage;
