import React, { useState } from 'react';
import {
  X,
  Plus,
  Sparkles,
  Syringe,
  Droplets,
  Zap,
  Flame,
  ShieldCheck,
  Activity,
  BookOpen,
  FileCheck,
  Scale,
  Wand2,
  Building2,
  Check
} from 'lucide-react';
import { StepCategoryDef } from '../utils/stepCategoryHelper';

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCategory: (newCategory: StepCategoryDef) => void;
  existingCount: number;
}

const AVAILABLE_CATEGORY_ICONS = [
  { id: 'Sparkles', label: 'Estética / Geral', icon: Sparkles },
  { id: 'Syringe', label: 'Injetáveis', icon: Syringe },
  { id: 'Droplets', label: 'Peelings / Cutâneo', icon: Droplets },
  { id: 'Zap', label: 'Laser / Tecnologias', icon: Zap },
  { id: 'Flame', label: 'Térmicos / Corporal', icon: Flame },
  { id: 'Wand2', label: 'Protocolos Especiais', icon: Wand2 },
  { id: 'ShieldCheck', label: 'Conformidade / ANVISA', icon: ShieldCheck },
  { id: 'Activity', label: 'Biossegurança / CME', icon: Activity },
  { id: 'BookOpen', label: 'Livros de Registro', icon: BookOpen },
  { id: 'FileCheck', label: 'Anamnese / TCLE', icon: FileCheck },
  { id: 'Scale', label: 'Jurídico / Financeiro', icon: Scale },
  { id: 'Building2', label: 'Estrutura & Unidade', icon: Building2 },
];

const PRESET_COLORS = [
  { color: '#00D3A1', name: 'Ciano Estética' },
  { color: '#10B981', name: 'Esmeralda' },
  { color: '#6366F1', name: 'Índigo' },
  { color: '#F97316', name: 'Laranja' },
  { color: '#0EA5E9', name: 'Azul Céu' },
  { color: '#EC4899', name: 'Rosa' },
  { color: '#8B5CF6', name: 'Violeta' },
  { color: '#F59E0B', name: 'Âmbar Dourado' },
  { color: '#EF4444', name: 'Coral' },
  { color: '#14B8A6', name: 'Turquesa' },
];

export const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
  isOpen,
  onClose,
  onCreateCategory,
  existingCount,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('Sparkles');
  const [selectedColor, setSelectedColor] = useState('#00D3A1');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor, informe o nome da categoria.');
      return;
    }

    const nextNumber = existingCount + 1;
    const formattedName = name.trim().startsWith(`${nextNumber}.`)
      ? name.trim()
      : `${nextNumber}. ${name.trim()}`;

    const newCat: StepCategoryDef = {
      id: `custom-cat-${Date.now()}`,
      number: nextNumber,
      name: formattedName,
      shortName: shortName.trim() || name.trim().substring(0, 20),
      description:
        description.trim() ||
        'Categoria personalizada para organização e arquivamento de POPs e documentos da clínica.',
      iconName: selectedIcon,
      accentColor: selectedColor,
      isCustom: true,
    };

    onCreateCategory(newCat);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#18181b] border border-zinc-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden text-zinc-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/70 shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-inner transition-colors"
              style={{
                backgroundColor: `${selectedColor}15`,
                borderColor: `${selectedColor}40`,
                color: selectedColor,
              }}
            >
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Criar Nova Categoria</h3>
              <p className="text-xs text-zinc-400">
                Adicione uma nova categoria para agrupar e arrastar seus cards
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Nome da Categoria */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
              Nome da Categoria <span className="text-emerald-400">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!shortName || shortName === name) {
                  setShortName(e.target.value);
                }
                setError(null);
              }}
              placeholder="Ex: Capilar e Tricologia, Protocolos de Inverno, Glúteos..."
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition placeholder:text-zinc-600"
            />
          </div>

          {/* Descrição Curta */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
              Descrição / Finalidade da Categoria
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Protocolos de intradermoterapia capilar, microinfusão de medicamentos e avaliação tricoscópica."
              className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 transition resize-none placeholder:text-zinc-600"
            />
          </div>

          {/* Seletor de Ícone */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
              Ícone Representativo
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {AVAILABLE_CATEGORY_ICONS.map((item) => {
                const IconComponent = item.icon;
                const isSelected = selectedIcon === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedIcon(item.id)}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 text-center transition ${
                      isSelected
                        ? 'bg-zinc-800 text-white font-bold shadow-md'
                        : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                    style={{
                      borderColor: isSelected ? selectedColor : undefined,
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: isSelected ? `${selectedColor}20` : '#27272a',
                        color: isSelected ? selectedColor : '#a1a1aa',
                      }}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] leading-tight truncate w-full">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Seletor de Cor */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
              Cor de Destaque
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {PRESET_COLORS.map((c) => {
                const isSelected = selectedColor === c.color;
                return (
                  <button
                    key={c.color}
                    type="button"
                    onClick={() => setSelectedColor(c.color)}
                    title={c.name}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      isSelected ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c.color }}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-black font-black" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dica de Uso */}
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2.5 text-emerald-300 text-xs">
            <Sparkles className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>Após criar, você poderá arrastar qualquer card de documento diretamente para esta categoria!</span>
          </div>

          {/* Footer Ações */}
          <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold text-black flex items-center gap-1.5 transition shadow-lg hover:opacity-90 active:scale-95"
              style={{ backgroundColor: selectedColor }}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Criar Categoria</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
