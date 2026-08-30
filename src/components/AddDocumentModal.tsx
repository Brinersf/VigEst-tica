import React, { useState } from 'react';
import { X, Plus, FileText, Sparkles, ShieldCheck, Zap, BookOpen, FileCheck } from 'lucide-react';
import { DocumentItem, DocumentCategory } from '../types';
import { STEP_CATEGORIES } from '../utils/stepCategoryHelper';

interface AddDocumentModalProps {
  isOpen: boolean;
  activeCategoryName: string;
  onClose: () => void;
  onAddDocument: (newDoc: DocumentItem) => void;
}

export const AddDocumentModal: React.FC<AddDocumentModalProps> = ({
  isOpen,
  activeCategoryName,
  onClose,
  onAddDocument,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [stepCategory, setStepCategory] = useState(
    activeCategoryName && activeCategoryName !== 'TODOS'
      ? activeCategoryName
      : '1. Documentos Base'
  );
  const [rawCategory, setRawCategory] = useState<DocumentCategory>('POP');
  const [initialContent, setInitialContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newId = 'doc-custom-' + Date.now();
    const formattedContent =
      initialContent.trim() ||
      `<h2>${title.toUpperCase()}</h2>
<p><strong>Clínica:</strong> {{nome_clinica}} | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}}<br>
<strong>Em conformidade com a RDC 63/2011 ANVISA e Normas Técnicas Vigentes</strong></p>

<p><strong>1. OBJETIVO:</strong><br>
Padronizar a rotina operacional deste procedimento, garantindo segurança técnica, assepsia e conformidade documental na <strong>{{nome_clinica}}</strong>.</p>

<p><strong>2. CAMPO DE APLICAÇÃO:</strong><br>
Cabines de atendimento e consultórios estéticos sob responsabilidade de <strong>{{responsavel_tecnico}}</strong> ({{registro_conselho}}).</p>

<p><strong>3. MATERIAIS E EQUIPAMENTOS:</strong><br>
• EPIs descartáveis completos (NR-32);<br>
• Insumos com registro ativo na ANVISA dentro do prazo de validade (PEPS/FEFO);<br>
• Antissepsia prévia com Clorexidina Alcoólica 0,5%.</p>

<p><strong>4. DESCRIÇÃO DO PROCEDIMENTO PASSO A PASSO:</strong><br>
1. Acolhimento, conferência de consentimento informado (TCLE) e anamnese clínica;<br>
2. Demarcação anatômica e antissepsia rigorosa da área de intervenção;<br>
3. Execução técnica precisa respeitando a anatomia vascular e planos teciduais;<br>
4. Descarte imediato de perfurocortantes em coletor rígido Descarpax (RDC 222/2018);<br>
5. Registro em prontuário com anotação de lote, validade e fabricante.</p>

<p><strong>5. REGISTROS SANITÁRIOS E HOMOLOGAÇÃO:</strong><br>
Este protocolo possui validade anual e revisão periódica pelo Responsável Técnico.</p>
`;

    const newDoc: DocumentItem = {
      id: newId,
      title: title.trim(),
      category: rawCategory,
      content: formattedContent,
      stepCategory,
      shortDescription:
        shortDescription.trim() || 'Protocolo personalizado integrado à rotina da clínica.',
      status: 'em_edicao',
      progress: 60,
      iconType: 'Sparkles',
      version: 'V 1.0 - Personalizado',
      lastModified: new Date().toISOString().split('T')[0],
      lastActivity: 'Hoje, ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    onAddDocument(newDoc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#18181b] border border-zinc-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden text-zinc-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-base">Adicionar Novo Documento</h3>
              <p className="text-xs text-zinc-400">Crie um novo POP, Manual, Caderno ou TCLE para sua clínica</p>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Título do Documento / POP *
            </label>
            <input
              type="text"
              placeholder="Ex: POP - Aplicação de Enzimas para Gordura Localizada"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 text-sm font-medium"
              required
            />
          </div>

          {/* Descrição Curta */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Descrição Curta do Card
            </label>
            <input
              type="text"
              placeholder="Ex: Protocolo de aplicação enzimática, assepsia e termo de orientações."
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 text-xs"
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
              {STEP_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tipo de Documento */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Tipo do Documento
            </label>
            <select
              value={rawCategory}
              onChange={(e) => setRawCategory(e.target.value as DocumentCategory)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-zinc-200 focus:outline-none focus:border-emerald-500 text-sm"
            >
              <option value="POP">Procedimento Operacional Padrão (POP)</option>
              <option value="Manual">Manual de Boas Práticas / Sanitário</option>
              <option value="TCLE">Termo de Consentimento Livre e Esclarecido (TCLE)</option>
              <option value="Anamnese">Ficha de Anamnese Clínica</option>
              <option value="Contrato">Contrato / Termo Financeiro</option>
              <option value="Personalizado">Documento Personalizado</option>
            </select>
          </div>

          {/* Conteúdo Opcional */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Conteúdo Inicial (Opcional - preenchimento automático disponível)
            </label>
            <textarea
              rows={4}
              placeholder="Cole o texto ou deixe em branco para gerar a estrutura padrão ANVISA com injeção automática de variáveis..."
              value={initialContent}
              onChange={(e) => setInitialContent(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 text-xs leading-relaxed resize-none font-mono"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition text-xs font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 transition text-xs font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Adicionar Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
