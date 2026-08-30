import React from 'react';
import {
  X,
  Trash2,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { DocumentItem } from '../types';

interface DeleteCardModalProps {
  isOpen: boolean;
  doc: DocumentItem | null;
  onClose: () => void;
  onConfirmDelete: (docId: string) => void;
}

export const DeleteCardModal: React.FC<DeleteCardModalProps> = ({
  isOpen,
  doc,
  onClose,
  onConfirmDelete,
}) => {
  if (!isOpen || !doc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn font-sans">
      <div className="bg-[#18181b] border border-rose-900/40 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden text-zinc-100 animate-[scaleUp_0.15s_ease]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/25 shrink-0">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Excluir Card</h3>
              <p className="text-xs text-zinc-400">Remover este documento da clínica</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span className="font-mono">{doc.category || 'POP'}</span>
              <span>•</span>
              <span>{doc.version || 'V 1.0'}</span>
            </div>
            <h4 className="font-bold text-white text-sm leading-snug break-words">
              {doc.title}
            </h4>
            {doc.adaptationNotes && (
              <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                {doc.adaptationNotes}
              </p>
            )}
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-start gap-2.5 text-xs text-rose-200">
            <AlertTriangle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
            <span>
              Tem certeza que deseja excluir este card? Ele será removido permanentemente da listagem de documentos da sua clínica.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={() => {
              onConfirmDelete(doc.id);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-rose-600/20 active:scale-95 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Sim, Excluir Card</span>
          </button>
        </div>
      </div>
    </div>
  );
};
