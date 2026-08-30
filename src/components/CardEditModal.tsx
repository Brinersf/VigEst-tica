import React, { useState } from 'react';
import {
  X,
  Check,
  Trash2,
  Sparkles,
  ShieldCheck,
  Zap,
  BookOpen,
  FileCheck,
  Scale,
  FileText,
  AlertTriangle,
  Building2,
  Syringe,
  Droplets,
  Flame,
  Wand2,
  Activity,
  Pill
} from 'lucide-react';
import { DocumentItem, DocumentStatus } from '../types';
import { getAllCategories, StepCategoryDef } from '../utils/stepCategoryHelper';

interface CardEditModalProps {
  isOpen: boolean;
  doc: DocumentItem | null;
  onClose: () => void;
  onSave: (updatedDoc: DocumentItem) => void;
  onDelete?: (docId: string) => void;
  categories?: StepCategoryDef[];
}

const AVAILABLE_ICONS = [
  { id: 'Sparkles', label: 'Estética / Geral', icon: Sparkles },
  { id: 'Syringe', label: 'Injetáveis / Harmonização', icon: Syringe },
  { id: 'Pill', label: 'Prescrições / Fórmulas', icon: Pill },
  { id: 'Droplets', label: 'Peelings / Cutâneo', icon: Droplets },
  { id: 'Zap', label: 'Laser / Eletroterapia', icon: Zap },
  { id: 'Flame', label: 'Térmico / Corporal', icon: Flame },
  { id: 'ShieldCheck', label: 'Manual / Proteção', icon: ShieldCheck },
  { id: 'Activity', label: 'Biossegurança / CME', icon: Activity },
  { id: 'BookOpen', label: 'Caderno / Registro', icon: BookOpen },
  { id: 'FileCheck', label: 'Anamnese / TCLE', icon: FileCheck },
  { id: 'FileText', label: 'Contrato / Recibo', icon: FileText },
  { id: 'Scale', label: 'Jurídico / Financeiro', icon: Scale },
  { id: 'Wand2', label: 'Protocolos Especiais', icon: Wand2 },
  { id: 'Building2', label: 'Estrutura / Memorial', icon: Building2 },
  { id: 'AlertTriangle', label: 'Resgate / Intercorrência', icon: AlertTriangle },
];

export const CardEditModal: React.FC<CardEditModalProps> = ({
  isOpen,
  doc,
  onClose,
  onSave,
  onDelete,
  categories,
}) => {
  if (!isOpen || !doc) return null;

  const allAvailableCategories = categories && categories.length > 0 ? categories : getAllCategories();

  const [title, setTitle] = useState(doc.title);
  const [shortDescription, setShortDescription] = useState(
    doc.shortDescription || doc.adaptationNotes || 'Procedimentos técnicos e conformidade ANVISA.'
  );
  const [status, setStatus] = useState<DocumentStatus>(doc.status || 'em_edicao');
  const [progress, setProgress] = useState<number>(doc.progress ?? 75);
  const [stepCategory, setStepCategory] = useState<string>(
    doc.stepCategory || allAvailableCategories[0]?.name || '1. Documentos Base e ANVISA'
  );
  const [iconType, setIconType] = useState<string>(doc.iconType || 'Sparkles');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...doc,
      title,
      shortDescription,
      status,
      progress,
      stepCategory,
      iconType,
      lastModified: new Date().toISOString().split('T')[0],
      lastActivity: 'Hoje, ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#18181b] border border-zinc-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden text-zinc-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-base">Personalizar Card do Documento</h3>
              <p className="text-xs text-zinc-400">Edite os metadados, status e categoria deste item</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Título do Documento
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white focus:outline-none focus:border-emerald-500 text-sm font-medium"
              required
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Descrição Curta do Card
            </label>
            <textarea
              rows={2}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-zinc-200 focus:outline-none focus:border-emerald-500 text-xs leading-relaxed resize-none"
            />
          </div>

          {/* Categoria Passo a Passo */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Categoria Passo a Passo
            </label>
            <select
              value={stepCategory}
              onChange={(e) => setStepCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-zinc-200 focus:outline-none focus:border-emerald-500 text-sm"
            >
              {allAvailableCategories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status & Progresso */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Status Atual
              </label>
              <div className="flex flex-col gap-2">
                {[
                  { id: 'completo', label: 'Completo', bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' },
                  { id: 'em_edicao', label: 'Em Edição', bg: 'bg-amber-500/20 text-amber-400 border-amber-500/40' },
                  { id: 'pendente', label: 'Pendente', bg: 'bg-zinc-700/40 text-zinc-300 border-zinc-600' },
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => {
                      setStatus(st.id as DocumentStatus);
                      if (st.id === 'completo') setProgress(100);
                      else if (st.id === 'pendente') setProgress(40);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center justify-between transition ${
                      status === st.id ? st.bg : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <span>{st.label}</span>
                    {status === st.id && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Preenchimento: <span className="text-emerald-400">{progress}%</span>
              </label>
              <div className="bg-zinc-900 p-3.5 rounded-xl border border-zinc-800 flex flex-col justify-center h-[126px]">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  className="w-full accent-emerald-400 h-2 bg-zinc-700 rounded-lg cursor-pointer"
                />
                <div className="w-full bg-zinc-800 h-2 rounded-full mt-3 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      progress >= 85
                        ? 'bg-emerald-500'
                        : progress >= 50
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Ícone */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Ícone do Card
            </label>
            <div className="grid grid-cols-3 gap-2">
              {AVAILABLE_ICONS.map((item) => {
                const Icon = item.icon;
                const isSelected = iconType === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setIconType(item.id)}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs transition ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
            {onDelete ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm('Tem certeza que deseja excluir este card do painel?')) {
                    onDelete(doc.id);
                    onClose();
                  }
                }}
                className="px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition text-xs font-medium flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Excluir Card
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition text-xs font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 transition text-xs font-bold shadow-lg shadow-emerald-500/20"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
