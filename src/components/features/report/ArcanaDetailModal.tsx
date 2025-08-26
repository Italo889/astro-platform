// src/components/features/report/ArcanaDetailModal.tsx

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import type { FC } from 'react';
import type { MajorArcana } from '../../../../backend/src/domain/types';
import { X } from 'lucide-react';

interface ArcanaDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  arcana: MajorArcana | null;
}

export const ArcanaDetailModal: FC<ArcanaDetailModalProps> = ({ isOpen, onClose, arcana }) => {
  // Não renderiza nada se não houver um arcano selecionado
  if (!arcana) return null;

  return (
    <Transition appear show={isOpen} as="div">
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* O fundo escurecido (overlay) */}
        <TransitionChild
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as="div"
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-[rgb(var(--color-background))] border border-[rgb(var(--color-surface))] p-6 md:p-8 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <DialogTitle as="h3" className="font-serif text-3xl md:text-4xl text-white">
                      {arcana.name}
                    </DialogTitle>
                    <p className="text-sm text-[rgb(var(--color-text-muted))] mt-2">{arcana.keywords.join(' • ')}</p>
                  </div>
                  <button onClick={onClose} className="p-2 rounded-full hover:bg-[rgb(var(--color-surface))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <X size={20} />
                  </button>
                </div>
                
                <p className="mt-4 text-white/90 leading-relaxed text-base">{arcana.longDescription}</p>
                
                <div className="mt-6 pt-4 border-t border-[rgb(var(--color-surface))]">
                  <h4 className="font-serif text-xl text-white">Conselhos do Arcano</h4>
                  <div className="mt-4 space-y-3 text-sm">
                    <p><strong className="text-green-400 font-semibold">Luz (Aproveite):</strong> <span className="text-white/80">{arcana.light}</span></p>
                    <p><strong className="text-red-400 font-semibold">Sombra (Atenção):</strong> <span className="text-white/80">{arcana.shadow}</span></p>
                    <p><strong className="text-sky-400 font-semibold">Direção (Aja):</strong> <span className="text-white/80">{arcana.advice}</span></p>
                  </div>
                </div>

              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};