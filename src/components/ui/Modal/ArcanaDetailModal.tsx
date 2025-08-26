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
  if (!arcana) return null;

  return (
    <Transition appear show={isOpen}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="max-w-2xl w-full space-y-4 rounded-2xl bg-[rgb(var(--color-background))] border border-[rgb(var(--color-surface))] p-8">
              <div className="flex justify-between items-start">
                <div>
                  <DialogTitle as="h3" className="text-3xl font-serif text-white">
                    {arcana.name}
                  </DialogTitle>
                  <p className="text-sm text-[rgb(var(--color-text-muted))] mt-1">{arcana.keywords.join(' • ')}</p>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-[rgb(var(--color-surface))] transition-colors">
                  <X size={20} />
                </button>
              </div>
              <p className="text-lg text-white/90 leading-relaxed">{arcana.longDescription}</p>
              
              <div className="!mt-6 pt-4 border-t border-[rgb(var(--color-surface))]">
                <h4 className="font-serif text-xl text-white">Conselhos do Arcano</h4>
                <div className="mt-4 space-y-3 text-sm">
                  <p><strong className="text-green-400">Luz (Aproveite):</strong> {arcana.light}</p>
                  <p><strong className="text-red-400">Sombra (Atenção):</strong> {arcana.shadow}</p>
                  <p><strong className="text-sky-400">Direção (Aja):</strong> {arcana.advice}</p>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};