import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  RotateCcw,
  Plus,
  Trash2,
  Settings,
  Eye,
  EyeOff,
  GripVertical,
  Edit3,
  FileText,
  UserCheck,
  Camera,
  Stethoscope,
  FileCheck2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Sliders,
  ClipboardList
} from 'lucide-react';
import { DocumentItem } from '../types';
import {
  ClinicalDocDefinition,
  DEFAULT_CLINICAL_DOC_TYPES,
  getClinicalButtonsConfig,
  saveClinicalButtonsConfig,
  resetClinicalButtonsConfig
} from '../utils/procedureClinicalDocsHelper';

interface ClinicalButtonsConfigModalProps {
  isOpen: boolean;
  doc: DocumentItem | null;
  onClose: () => void;
  onSaved: () => void;
  onToast: (msg: string) => void;
}

export const ClinicalButtonsConfigModal: React.FC<ClinicalButtonsConfigModalProps> = ({
  isOpen,
  doc,
  onClose,
  onSaved,
  onToast,
}) => {
  const [buttons, setButtons] = useState<ClinicalDocDefinition[]>([]);
  const [applyGlobally, setApplyGlobally] = useState<boolean>(false);
  const [editingButtonIndex, setEditingButtonIndex] = useState<number | null>(null);
  const [newBtnLabel, setNewBtnLabel] = useState<string>('');
  const [newBtnShortLabel, setNewBtnShortLabel] = useState<string>('');
  const [newBtnColor, setNewBtnColor] = useState<string>('#10b981');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && doc) {
      const currentConfig = getClinicalButtonsConfig(doc.id);
      setButtons(currentConfig);
      setEditingButtonIndex(null);
      setShowAddForm(false);
    }
  }, [isOpen, doc]);

  if (!isOpen || !doc) return null;

  const handleToggleEnable = (index: number) => {
    setButtons((prev) =>
      prev.map((b, i) => (i === index ? { ...b, enabled: b.enabled === false ? true : false } : b))
    );
  };

  const handleUpdateLabel = (index: number, label: string, shortLabel: string) => {
    setButtons((prev) =>
      prev.map((b, i) => (i === index ? { ...b, label, shortLabel } : b))
    );
  };

  const handleAddNewButton = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBtnLabel.trim()) {
      onToast('Digite o nome do novo botão');
      return;
    }
    const typeKey = `custom_${Date.now()}`;
    const newBtn: ClinicalDocDefinition = {
      type: typeKey,
      label: newBtnLabel.trim(),
      shortLabel: newBtnShortLabel.trim() || newBtnLabel.trim().slice(0, 12),
      iconName: 'FileText',
      color: newBtnColor,
      badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      description: `Documento clínico customizado: ${newBtnLabel.trim()}`,
      enabled: true,
      isCustom: true,
      defaultTemplate: `
<div style="font-family: 'Segoe UI', Arial, sans-serif; color: #0f172a; line-height: 1.5; font-size: 11px;">
  <div style="border-bottom: 2px solid #059669; padding-bottom: 8px; margin-bottom: 12px;">
    <h2 style="margin: 0; font-size: 16px; font-weight: 800; color: #059669; text-transform: uppercase;">${newBtnLabel.trim().toUpperCase()}</h2>
    <p style="margin: 2px 0 0 0; font-size: 10px; color: #475569;"><strong>{{nome_clinica}}</strong> &bull; RT: {{responsavel_tecnico}}</p>
  </div>
  <table style="width: 100%; border-collapse: collapse; font-size: 10.5px; margin-bottom: 12px;" border="1" bordercolor="#e2e8f0">
    <tr>
      <td style="padding: 6px; width: 60%;"><strong>Paciente:</strong> {{nome_paciente}}</td>
      <td style="padding: 6px; width: 40%;"><strong>Data:</strong> {{data_hoje}}</td>
    </tr>
    <tr>
      <td style="padding: 6px;" colspan="2"><strong>Procedimento:</strong> ${doc.title}</td>
    </tr>
  </table>
  <h3 style="font-size: 11.5px; font-weight: bold; background: #f1f5f9; padding: 4px 8px; border-left: 3px solid #059669; margin: 10px 0 6px 0;">TERMOS & ORIENTAÇÕES DO DOCUMENTO</h3>
  <p style="font-size: 10.5px; color: #334155; margin-bottom: 10px;">
    Insira aqui as cláusulas, perguntas de anamnese ou instruções específicas deste documento.
  </p>
  <div style="margin-top: 30px; display: flex; justify-content: space-between; text-align: center; font-size: 10px;">
    <div style="width: 45%;">
      <div style="border-bottom: 1.5px solid #0f172a; height: 25px; margin-bottom: 4px;"></div>
      <div><strong>{{nome_paciente}}</strong></div>
      <div style="font-size: 8.5px; color: #64748b;">Assinatura do Paciente</div>
    </div>
    <div style="width: 45%;">
      <div style="border-bottom: 1.5px solid #0f172a; height: 25px; margin-bottom: 4px;"></div>
      <div><strong>{{responsavel_tecnico}}</strong></div>
      <div style="font-size: 8.5px; color: #64748b;">Responsável Técnico</div>
    </div>
  </div>
</div>
      `.trim(),
    };

    setButtons((prev) => [...prev, newBtn]);
    setNewBtnLabel('');
    setNewBtnShortLabel('');
    setShowAddForm(false);
    onToast('Novo botão adicionado com sucesso!');
  };

  const handleDeleteButton = (index: number) => {
    setButtons((prev) => prev.filter((_, i) => i !== index));
    onToast('Botão removido.');
  };

  const handleSave = () => {
    saveClinicalButtonsConfig(buttons, doc.id, applyGlobally);
    onToast(applyGlobally ? 'Configuração salva para todos os procedimentos!' : 'Configuração de botões salva!');
    onSaved();
    onClose();
  };

  const handleResetToDefault = () => {
    if (window.confirm('Deseja restaurar os botões para o padrão original da clínica?')) {
      resetClinicalButtonsConfig(doc.id);
      setButtons(DEFAULT_CLINICAL_DOC_TYPES);
      onToast('Botões restaurados para o padrão.');
    }
  };

  const renderIcon = (type: string, color: string) => {
    switch (type) {
      case 'ficha_paciente':
        return <UserCheck className="w-4 h-4" style={{ color }} />;
      case 'pop_procedimento':
        return <ShieldCheck className="w-4 h-4" style={{ color }} />;
      case 'antes_depois':
        return <Sparkles className="w-4 h-4" style={{ color }} />;
      case 'plano_tratamento':
        return <Sparkles className="w-4 h-4" style={{ color }} />;
      case 'termo_imagem':
        return <Camera className="w-4 h-4" style={{ color }} />;
      case 'anamnese':
        return <Stethoscope className="w-4 h-4" style={{ color }} />;
      case 'tcle':
        return <FileCheck2 className="w-4 h-4" style={{ color }} />;
      case 'pos_procedimento':
        return <ShieldAlert className="w-4 h-4" style={{ color }} />;
      default:
        return <FileText className="w-4 h-4" style={{ color }} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#081832] border border-[#173660] rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-scaleUp text-zinc-100">
        {/* Cabeçalho */}
        <div className="px-5 py-4 border-b border-[#173660] bg-[#0A1D3A] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#00D3A1]/10 border border-[#00D3A1]/30 flex items-center justify-center text-[#00D3A1] shrink-0">
              <Sliders className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-white text-base truncate">
                Editar Botões de Documentos Clínicos
              </h3>
              <p className="text-xs text-[#8DA0BF] truncate">
                Personalize os botões das Categorias 2 e 3 &bull; <span className="text-[#00D3A1]">{doc.title}</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#0A1D3A] hover:bg-[#0E274D] border border-[#173660] text-[#8DA0BF] hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Lista de Botões */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8DA0BF]">
              Botões Ativos ({buttons.filter((b) => b.enabled !== false).length}/{buttons.length})
            </span>
            <button
              type="button"
              onClick={() => setShowAddForm(!showAddForm)}
              className="text-xs text-[#00D3A1] hover:text-emerald-300 font-semibold flex items-center gap-1 bg-[#00D3A1]/10 hover:bg-[#00D3A1]/20 px-2.5 py-1 rounded-lg border border-[#00D3A1]/20 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar Novo Botão</span>
            </button>
          </div>

          {/* Formulário para Adicionar Novo Botão */}
          {showAddForm && (
            <div className="bg-[#0A1D3A] border border-[#00D3A1]/40 rounded-xl p-3.5 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#00D3A1] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Criar Novo Botão de Documento</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-[#8DA0BF] hover:text-white text-xs"
                >
                  Cancelar
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[10px] font-bold uppercase text-[#8DA0BF] block mb-0.5">
                    Nome Completo do Documento
                  </label>
                  <input
                    type="text"
                    value={newBtnLabel}
                    onChange={(e) => setNewBtnLabel(e.target.value)}
                    placeholder="Ex: Contrato de Tratamento"
                    className="w-full bg-[#061224] border border-[#173660] rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#00D3A1]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-[#8DA0BF] block mb-0.5">
                    Texto Curto (No Botão)
                  </label>
                  <input
                    type="text"
                    value={newBtnShortLabel}
                    onChange={(e) => setNewBtnShortLabel(e.target.value)}
                    placeholder="Ex: Contrato"
                    className="w-full bg-[#061224] border border-[#173660] rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#00D3A1]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase text-[#8DA0BF]">Cor:</span>
                  <div className="flex items-center gap-1.5">
                    {['#10b981', '#06b6d4', '#8b5cf6', '#f59e0b', '#3b82f6', '#ec4899'].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setNewBtnColor(c)}
                        className={`w-5 h-5 rounded-full border transition ${
                          newBtnColor === c ? 'scale-110 border-white ring-2 ring-emerald-500/50' : 'border-transparent opacity-70'
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddNewButton}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 transition"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Criar Botão</span>
                </button>
              </div>
            </div>
          )}

          {/* Itens dos Botões */}
          <div className="space-y-2">
            {buttons.map((btn, index) => {
              const isEnabled = btn.enabled !== false;
              const isEditing = editingButtonIndex === index;

              return (
                <div
                  key={btn.type || index}
                  className={`bg-[#0A1D3A]/90 border rounded-xl p-3 transition ${
                    isEnabled ? 'border-[#173660] hover:border-[#224A80]' : 'border-[#173660]/40 opacity-50 bg-[#061224]/40'
                  }`}
                >
                  {isEditing ? (
                    <div className="space-y-2.5 animate-fadeIn">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-[#8DA0BF] block mb-0.5">
                            Nome Completo (Modal & Título)
                          </label>
                          <input
                            type="text"
                            value={btn.label}
                            onChange={(e) => handleUpdateLabel(index, e.target.value, btn.shortLabel)}
                            className="w-full bg-[#061224] border border-[#173660] rounded-lg px-2 py-1 text-xs text-white outline-none focus:border-[#00D3A1]"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-[#8DA0BF] block mb-0.5">
                            Texto do Botão no Card
                          </label>
                          <input
                            type="text"
                            value={btn.shortLabel}
                            onChange={(e) => handleUpdateLabel(index, btn.label, e.target.value)}
                            className="w-full bg-[#061224] border border-[#173660] rounded-lg px-2 py-1 text-xs text-white outline-none focus:border-[#00D3A1]"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => setEditingButtonIndex(null)}
                          className="px-2.5 py-1 rounded bg-[#00D3A1]/20 text-[#00D3A1] hover:bg-[#00D3A1]/30 text-xs font-semibold flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" />
                          <span>Concluir Edição</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border border-[#173660]"
                          style={{ backgroundColor: `${btn.color}15` }}
                        >
                          {renderIcon(btn.type, btn.color)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white text-xs truncate">{btn.label}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#061224] border border-[#173660] text-[#8DA0BF] font-mono">
                              Botão: "{btn.shortLabel}"
                            </span>
                            {btn.isCustom && (
                              <span className="text-[9px] px-1 rounded bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                                Personalizado
                              </span>
                            )}
                          </div>
                          <p className="text-[10.5px] text-[#8DA0BF] truncate">{btn.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => setEditingButtonIndex(index)}
                          className="p-1.5 rounded-lg bg-[#0E274D] hover:bg-[#173660] border border-[#173660] text-[#8DA0BF] hover:text-white transition"
                          title="Editar Nome do Botão"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleToggleEnable(index)}
                          className={`p-1.5 rounded-lg transition ${
                            isEnabled
                              ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                              : 'bg-[#0E274D] text-[#8DA0BF] hover:bg-[#173660]'
                          }`}
                          title={isEnabled ? 'Ocultar botão no card' : 'Exibir botão no card'}
                        >
                          {isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>

                        {btn.isCustom && (
                          <button
                            type="button"
                            onClick={() => handleDeleteButton(index)}
                            className="p-1.5 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/60 transition"
                            title="Excluir Botão Customizado"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Rodapé com Opções e Salvar */}
        <div className="px-5 py-3.5 bg-[#0A1D3A] border-t border-[#173660] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-xs text-[#8DA0BF] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={applyGlobally}
                onChange={(e) => setApplyGlobally(e.target.checked)}
                className="rounded border-[#173660] text-emerald-500 focus:ring-emerald-500 bg-[#061224]"
              />
              <span>Aplicar esta configuração para todos os procedimentos</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="px-3 py-1.5 rounded-lg bg-[#0E274D] hover:bg-[#173660] border border-[#173660] text-[#8DA0BF] hover:text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              title="Restaurar padrão original"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Padrão</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-md shadow-emerald-950 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Salvar Alterações</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
