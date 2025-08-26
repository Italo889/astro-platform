// src/components/features/report/ReportHeader.tsx

import type { FC } from 'react';
import { motion } from 'framer-motion';

interface ReportHeaderProps {
  name?: string;
  summary: string;
}

export const ReportHeader: FC<ReportHeaderProps> = ({ name, summary }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center space-y-4"
    >
      <h1 className="font-serif text-4xl md:text-5xl text-white">
        {name ? `A Constelação de ${name}` : 'Sua Constelação Pessoal'}
      </h1>
      <p className="text-lg md:text-xl text-[rgb(var(--color-text-muted))] max-w-2xl mx-auto leading-relaxed">
        {summary}
      </p>
    </motion.section>
  );
};