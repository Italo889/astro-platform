import type { FC } from 'react';
import type { Report } from '../domain/types';

// Layout e Seções
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { BackgroundEffects } from '../components/layout/BackgroundEffects';
import { ReportHeader } from '../components/features/report/ReportHeader';
import { AstrologySection } from '../components/features/report/AstrologySection';
import { NumerologySection } from '../components/features/report/NumerologySection';
import { ArcanaSection } from '../components/features/report/ArcanaSection';

// DADOS SIMULADOS (MOCK): Objeto completo para desenvolvimento e teste da página.
const mockReport: Report = {
  astrology: { sun: "Leão" },
  numerology: {
    lifePath: 1,
    destiny: 8,
  },
  arcana: {
    lifePathArcana: { 
      id: 1,  
      name: "O Mago",
      keywords: ["Vontade", "Ação", "Foco", "Manifestação"],
      description: "O Mago é o mestre da manifestação, possuindo todas as ferramentas para transformar ideias em realidade.",
      longDescription: "Como o Arcano de número 1, O Mago representa o início, a centelha da criação. Ele se ergue com uma mão para o céu e outra para a terra, canalizando a energia do universo para o plano material. Em sua mesa estão os quatro naipes do Tarô, simbolizando que ele tem todos os elementos à sua disposição. Ele não espera que as coisas aconteçam; ele as faz acontecer através de pura força de vontade, foco e a aplicação hábil de seus talentos.",
      light: "Você tem todos os recursos que precisa para ter sucesso. Concentre sua energia, comunique sua visão com clareza e aja. O poder de criar está em você.",
      shadow: "Evite a manipulação e a arrogância. Ter as ferramentas não significa que todos os fins justificam os meios. Use seu poder com sabedoria e ética.",
      advice: "Escolha uma meta clara e direcione toda a sua energia para ela."
    },
    destinyArcana: {
      id: 8,
      name: "A Justiça",
      keywords: ["Equilíbrio", "Verdade", "Causa e Efeito", "Decisão"],
      description: "A Justiça representa a verdade, a clareza e a lei de causa e efeito, exigindo imparcialidade e responsabilidade.",
      longDescription: "Segurando a balança da imparcialidade e a espada da clareza, a Justiça nos confronta com a verdade. Esta carta não é sobre punição, mas sobre equilíbrio e responsabilidade. Ela representa a lei universal de causa e efeito: toda ação tem uma reação. É um chamado para tomar decisões baseadas em fatos e lógica, com integridade e ética, e para aceitar as consequências de nossas escolhas passadas.",
      light: "Seja honesto e justo em todas as suas ações. A clareza mental o ajudará a tomar a decisão correta. Você colherá o que plantou.",
      shadow: "Evite a indecisão, o preconceito e a desonestidade. Fugir das consequências de seus atos só trará mais desequilíbrio.",
      advice: "Analise todos os fatos com imparcialidade antes de tomar sua decisão."
    },
    method: 'pitagorico',
    mapping: 'foolZero'
  },
  summary: "Seu Sol em Leão ilumina sua identidade. Seu Caminho de Vida, guiado pelo número 1, revela sua jornada e missão principal, representada pelo arcano O Mago. Seu nome revela um Número de Destino 8, um chamado para expressar a energia do arcano A Justiça através de seus talentos."
};


const ReportPage: FC = () => {
  // No futuro, estes dados viriam de um estado, de uma API, ou do contexto da aplicação.
  const report = mockReport;
  const userName = "Italo"; // Simulando o nome do usuário

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#161221] overflow-hidden text-white"
      style={{ fontFamily: '"Noto Sans", sans-serif' }}
    >
      <BackgroundEffects />
      <Header />
      
      <main className="flex flex-col flex-1 px-4 md:px-6 py-16">
        {/* Container principal para todas as seções do relatório */}
        <div className="max-w-4xl w-full mx-auto space-y-12 md:space-y-16">
          
          <ReportHeader name={userName} summary={report.summary} />
          
          <AstrologySection result={report.astrology} />
          
          <NumerologySection result={report.numerology} />
          
          <ArcanaSection result={report.arcana} />

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReportPage;