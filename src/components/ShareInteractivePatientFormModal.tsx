import React, { useState } from 'react';
import {
  X,
  Send,
  Copy,
  Check,
  Smartphone,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  User,
  Phone,
  FileText,
  Eye,
  MessageSquare,
  UserCheck,
  Stethoscope,
  Layers
} from 'lucide-react';
import { ClinicData, DocumentItem } from '../types';
import { formatShareLinkForWhatsApp, InteractiveFormType } from '../utils/patientInteractiveFormHelper';

interface ShareInteractivePatientFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  clinicData: ClinicData;
  selectedDoc?: DocumentItem | null;
  allDocs?: DocumentItem[];
  initialFormType?: InteractiveFormType;
  onOpenPreview?: (procedureTitle: string, patientName: string, patientPhone: string, docId?: string, formType?: InteractiveFormType) => void;
  onToast: (msg: string) => void;
}

export const ShareInteractivePatientFormModal: React.FC<ShareInteractivePatientFormModalProps> = ({
  isOpen,
  onClose,
  clinicData,
  selectedDoc,
  allDocs = [],
  initialFormType = 'ficha_cadastral',
  onOpenPreview,
  onToast,
}) => {
  const initialTitle = selectedDoc
    ? selectedDoc.title.replace(/^POP\s*[-–—]\s*/i, '').replace(/\(.*\)$/, '').trim()
    : 'Avaliação Estética & Procedimentos';

  const [formType, setFormType] = useState<InteractiveFormType>(initialFormType);
  const [patientName, setPatientName] = useState<string>(clinicData.nomeCliente || '');
  const [patientPhone, setPatientPhone] = useState<string>(clinicData.whatsapp || clinicData.telefone || '');
  const [procedureTitle, setProcedureTitle] = useState<string>(initialTitle);
  const [selectedDocId, setSelectedDocId] = useState<string>(selectedDoc?.id || '');
  const [isCopiedLink, setIsCopiedLink] = useState(false);

  if (!isOpen) return null;

  const { url: shareUrl, message: shareMessage, waLink } = formatShareLinkForWhatsApp({
    clinicName: clinicData.nomeClinica || 'Sua Clínica',
    clinicPhone: clinicData.whatsapp || clinicData.telefone || '',
    procedureTitle: procedureTitle,
    patientPhone: patientPhone,
    patientName: patientName,
    docId: selectedDocId,
    formType: formType,
  });

  const handlePhoneChange = (val: string) => {
    let cleaned = val.replace(/\D/g, '');
    if (cleaned.length > 11) cleaned = cleaned.slice(0, 11);
    let formatted = cleaned;
    if (cleaned.length > 2) formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    if (cleaned.length > 7) formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    setPatientPhone(formatted);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setIsCopiedLink(true);
    onToast('Link da Ficha Interativa copiado com sucesso!');
    setTimeout(() => setIsCopiedLink(false), 2500);
  };

  const handleSendToWhatsApp = () => {
    const cleanPhone = patientPhone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      if (!window.confirm('O número de WhatsApp informado parece incompleto. Deseja abrir o WhatsApp mesmo assim?')) {
        return;
      }
    }
    window.open(waLink, '_blank');
    onToast('Abrindo WhatsApp com a ficha do paciente...');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#121214] border border-zinc-700/80 rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-scaleUp">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-zinc-800 bg-zinc-900/90 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9.5px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Compartilhar no WhatsApp
                </span>
                <span className="text-[9.5px] font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                  Economize Tempo Clínico
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white font-serif mt-0.5">
                Enviar Ficha para o Paciente Preencher
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Form Type Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Escolha qual documento enviar para o paciente:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setFormType('ficha_cadastral')}
                className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  formType === 'ficha_cadastral'
                    ? 'bg-cyan-500/15 border-cyan-400 shadow-md text-cyan-200'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <UserCheck className={`w-4 h-4 ${formType === 'ficha_cadastral' ? 'text-cyan-400' : 'text-zinc-500'}`} />
                  <span className="font-bold text-xs text-white">Ficha Cadastral & Prontuário</span>
                </div>
                <span className="text-[11px] leading-snug text-zinc-400">
                  Identificação, saúde, medicamentos, alergias e hábitos.
                </span>
              </button>

              <button
                type="button"
                onClick={() => setFormType('anamnese')}
                className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  formType === 'anamnese'
                    ? 'bg-emerald-500/15 border-emerald-400 shadow-md text-emerald-200'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Stethoscope className={`w-4 h-4 ${formType === 'anamnese' ? 'text-emerald-400' : 'text-zinc-500'}`} />
                  <span className="font-bold text-xs text-white">Ficha de Anamnese</span>
                </div>
                <span className="text-[11px] leading-snug text-zinc-400">
                  Queixas principais, expectativas e histórico estético específico.
                </span>
              </button>

              <button
                type="button"
                onClick={() => setFormType('completo')}
                className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  formType === 'completo'
                    ? 'bg-teal-500/15 border-teal-400 shadow-md text-teal-200'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Layers className={`w-4 h-4 ${formType === 'completo' ? 'text-teal-400' : 'text-zinc-500'}`} />
                  <span className="font-bold text-xs text-white">Pacote Completo</span>
                </div>
                <span className="text-[11px] leading-snug text-zinc-400">
                  Ficha Cadastral + Anamnese do Procedimento juntas.
                </span>
              </button>
            </div>
          </div>

          {/* Form fields */}
          <div className="space-y-3.5 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp do Paciente (com DDD)</span>
                  <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="tel"
                  value={patientPhone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="(11) 98765-4321"
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-teal-400" />
                  <span>Nome do Paciente (Opcional)</span>
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Ex: Ana Paula Vasconcelos"
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Procedimento / Motivo do Atendimento</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={procedureTitle}
                  onChange={(e) => setProcedureTitle(e.target.value)}
                  placeholder="Ex: Harmonização Facial, Botox, Peeling..."
                  className="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                {allDocs.length > 0 && (
                  <select
                    value={selectedDocId}
                    onChange={(e) => {
                      const docId = e.target.value;
                      setSelectedDocId(docId);
                      const found = allDocs.find((d) => d.id === docId);
                      if (found) {
                        const clean = found.title.replace(/^POP\s*[-–—]\s*/i, '').replace(/\(.*\)$/, '').trim();
                        setProcedureTitle(clean);
                      }
                    }}
                    className="bg-zinc-900 border border-zinc-700 rounded-xl px-2.5 py-2 text-xs text-zinc-300 outline-none max-w-[140px] truncate"
                  >
                    <option value="">Selecionar POP...</option>
                    {allDocs.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.title.replace(/^POP\s*[-–—]\s*/i, '')}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* Message Preview Box */}
          <div className="bg-[#061224] border border-[#173660] rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="font-semibold flex items-center gap-1.5 text-[#00D3A1]">
                <MessageSquare className="w-3.5 h-3.5" />
                Pré-visualização da Mensagem para o Paciente
              </span>
            </div>

            <div className="p-3 bg-[#0A1D3A]/60 border border-[#173660] rounded-lg text-xs text-emerald-100 font-sans whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
              {shareMessage}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-5 py-3.5 border-t border-zinc-800 bg-zinc-900/90 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            {onOpenPreview && (
              <button
                type="button"
                onClick={() => onOpenPreview(procedureTitle, patientName, patientPhone, selectedDocId, formType)}
                className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border border-zinc-700"
              >
                <Eye className="w-3.5 h-3.5 text-teal-400" />
                <span>Testar como Paciente</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleCopyLink}
              className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border border-zinc-700"
            >
              {isCopiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopiedLink ? 'Link Copiado!' : 'Copiar Link'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold transition cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={handleSendToWhatsApp}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition active:scale-95 cursor-pointer border border-emerald-400/40"
            >
              <Send className="w-4 h-4 text-emerald-100" />
              <span>Enviar no WhatsApp do Paciente</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
