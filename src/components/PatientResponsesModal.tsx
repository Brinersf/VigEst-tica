import React, { useState, useEffect } from 'react';
import {
  X,
  Inbox,
  CheckCircle2,
  Trash2,
  Check,
  Send,
  User,
  Phone,
  Calendar,
  Sparkles,
  Search,
  ArrowRight,
  ClipboardPaste,
  ShieldCheck,
  Eye,
  AlertCircle,
  UserCheck,
  Stethoscope,
  Layers,
  MapPin
} from 'lucide-react';
import {
  PatientInteractiveSubmission,
  getPatientSubmissions,
  deletePatientSubmission,
  updatePatientSubmissionStatus,
  formatSubmissionToWhatsAppText,
  parseWhatsAppAnswersToSubmission,
  savePatientSubmission
} from '../utils/patientInteractiveFormHelper';
import { PatientFormState } from '../utils/procedureClinicalDocsHelper';

interface PatientResponsesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportToPatientDoc?: (importedState: Partial<PatientFormState>, anamneseDetails?: any) => void;
  onToast: (msg: string) => void;
}

export const PatientResponsesModal: React.FC<PatientResponsesModalProps> = ({
  isOpen,
  onClose,
  onImportToPatientDoc,
  onToast,
}) => {
  const [submissions, setSubmissions] = useState<PatientInteractiveSubmission[]>([]);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pasteMode, setPasteMode] = useState(false);
  const [pastedText, setPastedText] = useState('');

  const loadSubmissions = () => {
    const list = getPatientSubmissions();
    setSubmissions(list);
    if (list.length > 0 && !selectedSubmissionId) {
      setSelectedSubmissionId(list[0].id);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadSubmissions();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleSync = () => {
      loadSubmissions();
    };
    window.addEventListener('vigi_patient_submission_updated', handleSync);
    return () => window.removeEventListener('vigi_patient_submission_updated', handleSync);
  }, []);

  if (!isOpen) return null;

  const filteredList = submissions.filter((s) => {
    const search = searchTerm.toLowerCase();
    return (
      s.patientName.toLowerCase().includes(search) ||
      s.procedureTitle.toLowerCase().includes(search) ||
      s.patientPhone.includes(search) ||
      (s.patientCpf && s.patientCpf.includes(search))
    );
  });

  const selectedItem = submissions.find((s) => s.id === selectedSubmissionId) || (filteredList.length > 0 ? filteredList[0] : null);

  const handleDelete = (id: string) => {
    if (window.confirm('Deseja excluir este registro de resposta do paciente?')) {
      deletePatientSubmission(id);
      loadSubmissions();
      onToast('Registro excluído.');
    }
  };

  const handleImportToDocs = (sub: PatientInteractiveSubmission) => {
    if (!onImportToPatientDoc) {
      onToast('Importação direta não disponível nesta tela.');
      return;
    }

    const patientState: Partial<PatientFormState> = {
      nomeCliente: sub.patientName,
      cpfCliente: sub.patientCpf || '',
      telefone: sub.patientPhone || '',
      email: sub.patientEmail || '',
      profissao: sub.patientProfession || '',
      dataNascimento: sub.patientBirthDate || '',
      data: new Date(sub.createdAt).toLocaleDateString('pt-BR'),
    };

    updatePatientSubmissionStatus(sub.id, 'importado');
    onImportToPatientDoc(patientState, sub);
    onToast(`⚡ Dados de "${sub.patientName}" importados com sucesso para o documento!`);
    onClose();
  };

  const handleProcessPastedText = () => {
    if (!pastedText.trim()) {
      onToast('Por favor, cole a mensagem recebida no WhatsApp.');
      return;
    }

    const parsed = parseWhatsAppAnswersToSubmission(pastedText);
    if (!parsed || !parsed.patientName) {
      onToast('Não foi possível identificar as respostas no texto. Verifique o formato e tente novamente.');
      return;
    }

    const newSub: PatientInteractiveSubmission = {
      id: `resp_paste_${Date.now()}`,
      createdAt: new Date().toISOString(),
      formType: parsed.formType || 'anamnese',
      procedureTitle: parsed.procedureTitle || 'Procedimento Estético',
      clinicName: 'Clínica',
      clinicPhone: '',
      patientName: parsed.patientName || 'Paciente',
      patientCpf: parsed.patientCpf || '',
      patientBirthDate: parsed.patientBirthDate || '',
      patientPhone: parsed.patientPhone || '',
      patientEmail: '',
      patientProfession: '',
      queixaPrincipal: parsed.queixaPrincipal || '',
      tempoQueixa: parsed.tempoQueixa || '',
      expectativa: parsed.expectativa || '',
      alergias: parsed.alergias || [],
      condicoesClinicas: parsed.condicoesClinicas || [],
      medicamentosUso: parsed.medicamentosUso || [],
      procedimentosPrevios: [],
      observacoesPaciente: parsed.observacoesPaciente || '',
      termoAceito: true,
      assinaturaNome: parsed.patientName || '',
      status: 'novo',
    };

    savePatientSubmission(newSub);
    loadSubmissions();
    setSelectedSubmissionId(newSub.id);
    setPasteMode(false);
    setPastedText('');
    onToast('Resposta do WhatsApp processada e salva com sucesso!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#121214] border border-zinc-700/80 rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-scaleUp">
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-zinc-800 bg-zinc-900/90 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9.5px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Inbox do Paciente
                </span>
                <span className="text-[9.5px] font-bold text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                  {submissions.length} Ficha(s) Recebida(s)
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white font-serif mt-0.5">
                Respostas das Fichas Interativas (WhatsApp)
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPasteMode(!pasteMode)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                pasteMode
                  ? 'bg-emerald-600 border-emerald-400 text-white'
                  : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-300'
              }`}
            >
              <ClipboardPaste className="w-4 h-4" />
              <span>Colar do WhatsApp</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {pasteMode ? (
          <div className="p-6 overflow-y-auto space-y-4 flex-1">
            <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-xs flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-zinc-300 leading-relaxed">
                Se o paciente enviou as respostas dele no WhatsApp, copie a mensagem recebida e cole no campo abaixo. O sistema identificará automaticamente os dados cadastrais, queixas e histórico de saúde!
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                Cole aqui a mensagem de respostas do WhatsApp:
              </label>
              <textarea
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                rows={10}
                placeholder="Cole aqui a mensagem recebida (ex: *📋 RESPOSTAS DA FICHA...*)"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-4 text-xs font-mono text-white outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setPasteMode(false)}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleProcessPastedText}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Check className="w-4 h-4" />
                <span>Salvar e Processar Respostas</span>
              </button>
            </div>
          </div>
        ) : submissions.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
              <Inbox className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-zinc-300">
              Nenhuma resposta de paciente recebida ainda
            </h4>
            <p className="text-xs text-zinc-500 max-w-md">
              Envie o link da Ficha Cadastral ou Anamnese para o WhatsApp do seu paciente. Assim que ele responder, as respostas aparecerão aqui automaticamente.
            </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Left Sidebar List */}
            <div className="w-full md:w-80 border-r border-zinc-800 bg-zinc-950/60 flex flex-col shrink-0">
              <div className="p-3 border-b border-zinc-800">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar paciente..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-zinc-900">
                {filteredList.map((item) => {
                  const isSelected = item.id === selectedSubmissionId;
                  const dateStr = new Date(item.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedSubmissionId(item.id)}
                      className={`w-full text-left p-3.5 transition flex flex-col gap-1 cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-500/10 border-l-4 border-l-emerald-500'
                          : 'hover:bg-zinc-900/60 border-l-4 border-l-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-xs text-white truncate">
                          {item.patientName}
                        </span>
                        <span className="text-[10px] text-zinc-500 shrink-0 font-mono">
                          {dateStr}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {item.formType === 'ficha_cadastral' ? (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/20 flex items-center gap-1">
                            <UserCheck className="w-2.5 h-2.5" />
                            <span>Cadastro</span>
                          </span>
                        ) : item.formType === 'anamnese' ? (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-bold border border-emerald-500/20 flex items-center gap-1">
                            <Stethoscope className="w-2.5 h-2.5" />
                            <span>Anamnese</span>
                          </span>
                        ) : (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-teal-500/15 text-teal-300 font-bold border border-teal-500/20 flex items-center gap-1">
                            <Layers className="w-2.5 h-2.5" />
                            <span>Completa</span>
                          </span>
                        )}
                        <span className="text-[11px] text-zinc-400 truncate">
                          {item.procedureTitle}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] text-zinc-400 font-mono">
                          {item.patientPhone}
                        </span>
                        {item.status === 'importado' ? (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-300 font-bold border border-blue-500/20">
                            Importado
                          </span>
                        ) : (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-bold border border-emerald-500/20">
                            Novo
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Details Panel */}
            <div className="flex-1 flex flex-col bg-[#0d0e11] overflow-hidden">
              {selectedItem ? (
                <>
                  {/* Top Bar for Selected Item */}
                  <div className="p-4 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between gap-3 shrink-0 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-white font-serif">
                          {selectedItem.patientName}
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30">
                          {selectedItem.formType === 'ficha_cadastral'
                            ? 'Ficha Cadastral & Prontuário'
                            : selectedItem.formType === 'anamnese'
                            ? 'Anamnese Clínica'
                            : 'Ficha Completa'}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-400 flex items-center gap-2 mt-0.5 font-mono">
                        <span>Tel: {selectedItem.patientPhone}</span>
                        <span>&bull; {new Date(selectedItem.createdAt).toLocaleString('pt-BR')}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleDelete(selectedItem.id)}
                        className="p-1.5 rounded-lg bg-[#0E274D] hover:bg-red-950/80 text-zinc-400 hover:text-red-400 border border-[#173660] transition cursor-pointer"
                        title="Excluir resposta"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      {onImportToPatientDoc && (
                        <button
                          type="button"
                          onClick={() => handleImportToDocs(selectedItem)}
                          className="px-4 py-1.5 rounded-lg bg-[#00D3A1] hover:bg-[#00b58a] text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-lg cursor-pointer transition active:scale-95"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                          <span>Importar para o Documento</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1 text-xs">
                    {/* Cadastral Details if present */}
                    {(selectedItem.patientAddress || selectedItem.emergencyContactName || selectedItem.patientRg || selectedItem.patientProfession) && (
                      <div className="p-4 bg-cyan-950/20 border border-cyan-500/30 rounded-xl space-y-2">
                        <div className="text-cyan-400 font-bold uppercase tracking-wider text-[10.5px] flex items-center gap-1.5">
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Dados Cadastrais & Prontuário</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-300">
                          {selectedItem.patientRg && <div><strong>RG:</strong> {selectedItem.patientRg}</div>}
                          {selectedItem.patientProfession && <div><strong>Profissão:</strong> {selectedItem.patientProfession}</div>}
                          {selectedItem.patientAddress && <div className="sm:col-span-2"><strong>Endereço:</strong> {selectedItem.patientAddress}</div>}
                          {selectedItem.emergencyContactName && (
                            <div className="sm:col-span-2">
                              <strong>Contato de Emergência:</strong> {selectedItem.emergencyContactName} ({selectedItem.emergencyContactPhone || 'Sem tel'})
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Queixa Box */}
                    {selectedItem.queixaPrincipal && (
                      <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-2">
                        <div className="text-emerald-400 font-bold uppercase tracking-wider text-[10.5px]">
                          🎯 Queixa Principal & Expectativa
                        </div>
                        <div className="text-zinc-200 text-sm font-semibold">
                          {selectedItem.queixaPrincipal}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-400 text-xs pt-1 border-t border-zinc-800/80">
                          <div>
                            <strong>Tempo de incômodo:</strong> {selectedItem.tempoQueixa || 'Não informado'}
                          </div>
                          <div>
                            <strong>Expectativa:</strong> {selectedItem.expectativa || 'Não informada'}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Alergias & Patologias */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-2">
                        <div className="text-amber-400 font-bold uppercase tracking-wider text-[10.5px]">
                          ⚠️ Alergias Relatadas
                        </div>
                        {selectedItem.alergias && selectedItem.alergias.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {selectedItem.alergias.map((a) => (
                              <span
                                key={a}
                                className="px-2 py-1 rounded bg-amber-500/10 text-amber-300 font-semibold border border-amber-500/20 text-[11px]"
                              >
                                {a}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-zinc-500 italic">Nenhuma alergia selecionada</span>
                        )}
                      </div>

                      <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-2">
                        <div className="text-cyan-400 font-bold uppercase tracking-wider text-[10.5px]">
                          🩺 Condições Clínicas / Doenças
                        </div>
                        {selectedItem.condicoesClinicas && selectedItem.condicoesClinicas.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {selectedItem.condicoesClinicas.map((c) => (
                              <span
                                key={c}
                                className="px-2 py-1 rounded bg-cyan-500/10 text-cyan-300 font-semibold border border-cyan-500/20 text-[11px]"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-zinc-500 italic">Nenhuma condição patológica</span>
                        )}
                      </div>
                    </div>

                    {/* Medicamentos e Procedimentos Prévios */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-2">
                        <div className="text-purple-400 font-bold uppercase tracking-wider text-[10.5px]">
                          💊 Medicamentos em Uso
                        </div>
                        {selectedItem.medicamentosUso && selectedItem.medicamentosUso.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {selectedItem.medicamentosUso.map((m) => (
                              <span
                                key={m}
                                className="px-2 py-1 rounded bg-purple-500/10 text-purple-300 font-semibold border border-purple-500/20 text-[11px]"
                              >
                                {m}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-zinc-500 italic">Nenhum medicamento contínuo</span>
                        )}
                      </div>

                      <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-2">
                        <div className="text-teal-400 font-bold uppercase tracking-wider text-[10.5px]">
                          ✨ Procedimentos Estéticos Prévios
                        </div>
                        {selectedItem.procedimentosPrevios && selectedItem.procedimentosPrevios.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {selectedItem.procedimentosPrevios.map((p) => (
                              <span
                                key={p}
                                className="px-2 py-1 rounded bg-teal-500/10 text-teal-300 font-semibold border border-teal-500/20 text-[11px]"
                              >
                                {p}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-zinc-500 italic">Nenhum procedimento prévio relatado</span>
                        )}
                      </div>
                    </div>

                    {/* Hábitos e OBS */}
                    {selectedItem.observacoesPaciente && (
                      <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-1.5">
                        <div className="text-zinc-300 font-bold text-xs">
                          📝 Observações do(a) Paciente (OBS):
                        </div>
                        <div className="text-zinc-300 text-xs whitespace-pre-line leading-relaxed bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                          {selectedItem.observacoesPaciente}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-zinc-500 text-xs">
                  Selecione uma resposta na lista ao lado para visualizar os detalhes
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
