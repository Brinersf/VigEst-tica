import React, { useState } from 'react';
import {
  X,
  Trash2,
  AlertTriangle,
  FolderMinus,
  MoveRight,
  ShieldAlert,
  Check
} from 'lucide-react';
import { StepCategoryDef } from '../utils/stepCategoryHelper';
import { DocumentItem } from '../types';

interface DeleteCategoryModalProps {
  isOpen: boolean;
  category: StepCategoryDef | null;
  documentsInCategory: DocumentItem[];
  availableCategories: StepCategoryDef[];
  onClose: () => void;
  onConfirmDelete: (
    catName: string,
    deleteMode: 'deleteDocs' | 'moveTo',
    targetCategoryName?: string
  ) => void;
}

export const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({
  isOpen,
  category,
  documentsInCategory,
  availableCategories,
  onClose,
  onConfirmDelete,
}) => {
  if (!isOpen || !category) return null;

  const docCount = documentsInCategory.length;
  // Other categories to which docs can be moved
  const otherCategories = availableCategories.filter((c) => c.name !== category.name);
  
  const [deleteMode, setDeleteMode] = useState<'deleteDocs' | 'moveTo'>(
    docCount > 0 ? 'moveTo' : 'deleteDocs'
  );
  const [targetCategoryName, setTargetCategoryName] = useState<string>(
    otherCategories[0]?.name || '1. Documentos Base e ANVISA'
  );

  const handleConfirm = () => {
    onConfirmDelete(category.name, deleteMode, targetCategoryName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn font-sans">
      <div className="bg-[#18181b] border border-rose-900/40 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden text-zinc-100 animate-[scaleUp_0.15s_ease]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/25 shrink-0">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Excluir Categoria</h3>
              <p className="text-xs text-zinc-400">Remover categoria e gerenciar seus documentos</p>
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

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Category Summary Box */}
          <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-start gap-3">
            <div
              className="w-3 h-3 rounded-full mt-1 shrink-0"
              style={{ backgroundColor: category.accentColor || '#EF4444' }}
            />
            <div className="min-w-0 flex-1">
              <div className="font-bold text-white text-sm break-words">
                {category.name}
              </div>
              <div className="text-xs text-zinc-400 mt-0.5">
                Esta categoria contém <strong className="text-rose-400">{docCount} documento{docCount !== 1 ? 's' : ''}</strong> cadastrado{docCount !== 1 ? 's' : ''}.
              </div>
            </div>
          </div>

          {docCount > 0 ? (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                O que você deseja fazer com os {docCount} documento{docCount !== 1 ? 's' : ''} desta categoria?
              </label>

              {/* Option 1: Move to another category */}
              {otherCategories.length > 0 && (
                <div
                  onClick={() => setDeleteMode('moveTo')}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col gap-2.5 ${
                    deleteMode === 'moveTo'
                      ? 'bg-emerald-500/10 border-emerald-500/50 ring-1 ring-emerald-500/30'
                      : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-sm text-white">
                      <MoveRight className="w-4 h-4 text-emerald-400" />
                      <span>Manter documentos e mover para outra categoria (Recomendado)</span>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        deleteMode === 'moveTo'
                          ? 'border-emerald-500 bg-emerald-500 text-black'
                          : 'border-zinc-600'
                      }`}
                    >
                      {deleteMode === 'moveTo' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  {deleteMode === 'moveTo' && (
                    <div className="pt-2 border-t border-zinc-800/80" onClick={(e) => e.stopPropagation()}>
                      <label className="block text-[11px] font-semibold text-zinc-400 mb-1.5">
                        Selecione a categoria de destino:
                      </label>
                      <select
                        value={targetCategoryName}
                        onChange={(e) => setTargetCategoryName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black border border-zinc-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                      >
                        {otherCategories.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}

              {/* Option 2: Delete everything */}
              <div
                onClick={() => setDeleteMode('deleteDocs')}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-start justify-between gap-3 ${
                  deleteMode === 'deleteDocs'
                    ? 'bg-rose-500/10 border-rose-500/50 ring-1 ring-rose-500/30'
                    : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <Trash2 className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-bold text-sm text-white">
                      Excluir a categoria e todos os seus {docCount} cards
                    </div>
                    <div className="text-xs text-rose-300/80 mt-0.5">
                      Atenção: todos os {docCount} documentos pertencentes a esta categoria serão apagados do sistema.
                    </div>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    deleteMode === 'deleteDocs'
                      ? 'border-rose-500 bg-rose-500 text-white'
                      : 'border-zinc-600'
                  }`}
                >
                  {deleteMode === 'deleteDocs' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 leading-relaxed flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Esta categoria está vazia. Ela será removida da listagem do seu painel.</span>
            </div>
          )}
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
            onClick={handleConfirm}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-rose-600/20 active:scale-95"
          >
            <Trash2 className="w-4 h-4" />
            <span>Confirmar Exclusão</span>
          </button>
        </div>
      </div>
    </div>
  );
};
