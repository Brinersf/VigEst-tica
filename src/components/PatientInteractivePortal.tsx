import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Send,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  Heart,
  Calendar,
  User,
  Phone,
  FileText,
  Check,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Lock,
  Clock,
  UserCheck,
  MapPin,
  Layers
} from 'lucide-react';
import {
  PatientInteractiveSubmission,
  InteractiveFormType,
  savePatientSubmission,
  formatSubmissionToWhatsAppText
} from '../utils/patientInteractiveFormHelper';

interface PatientInteractivePortalProps {
  initialProcedureTitle?: string;
  initialClinicName?: string;
  initialClinicPhone?: string;
  initialPatientName?: string;
  initialDocId?: string;
  initialFormType?: InteractiveFormType;
  onExit?: () => void;
}

export const PatientInteractivePortal: React.FC<PatientInteractivePortalProps> = ({
  initialProcedureTitle = 'Avaliação & Procedimento Estético',
  initialClinicName = 'Clínica Estética Avançada',
  initialClinicPhone = '',
  initialPatientName = '',
  initialDocId,
  initialFormType = 'ficha_cadastral',
  onExit
}) => {
  const [formType, setFormType] = useState<InteractiveFormType>(initialFormType);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<PatientInteractiveSubmission | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    // Identificação Cadastral
    patientName: initialPatientName || '',
    patientCpf: '',
    patientRg: '',
    patientBirthDate: '',
    patientAge: '',
    patientGender: '',
    patientMaritalStatus: '',
    patientPhone: '',
    patientEmail: '',
    patientProfession: '',
    patientAddress: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',

    // Antecedentes e Saúde
    condicoesClinicas: [] as string[],
    alergias: [] as string[],
    medicamentosUso: [] as string[],
    gestanteLactante: '',
    fumante: '',
    ingestaoAlcool: '',
    atividadeFisica: '',
    consumoAgua: '',
    exposicaoSolar: '',
    tendenciaQueloide: '',
    historicoHerpes: '',
    cicatrizacao: '',
    procedimentosPrevios: [] as string[],
    possuiImplantesPermanentes: '',
    cirurgiasPrevias: '',

    // Anamnese Específica
    queixaPrincipal: '',
    tempoQueixa: '',
    expectativa: '',
    fototipo: '',
    biotipo: '',

    observacoesPaciente: '',
    termoAceito: false,
    assinaturaNome: initialPatientName || ''
  });

  // Read URL query parameters
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const proc = urlParams.get('procedimento');
      const clin = urlParams.get('clinica');
      const retWa = urlParams.get('retorno_wa');
      const nomeP = urlParams.get('nome_paciente');
      const tipo = urlParams.get('tipo') as InteractiveFormType;

      if (tipo && (tipo === 'ficha_cadastral' || tipo === 'anamnese' || tipo === 'completo')) {
        setFormType(tipo);
      }
      if (nomeP && !formData.patientName) {
        setFormData((prev) => ({ ...prev, patientName: nomeP, assinaturaNome: nomeP }));
      }
    } catch (e) {
      console.warn(e);
    }
  }, []);

  const toggleArrayItem = (field: 'alergias' | 'condicoesClinicas' | 'medicamentosUso' | 'procedimentosPrevios', item: string) => {
    setFormData((prev) => {
      const list = prev[field];
      if (list.includes(item)) {
        return { ...prev, [field]: list.filter((i) => i !== item) };
      } else {
        if (item.startsWith('Nenhuma') || item.startsWith('Nega') || item.startsWith('Nenhum') || item.startsWith('Nunca')) {
          return { ...prev, [field]: [item] };
        }
        const filtered = list.filter((i) => !i.startsWith('Nenhuma') && !i.startsWith('Nega') && !i.startsWith('Nenhum') && !i.startsWith('Nunca'));
        return { ...prev, [field]: [...filtered, item] };
      }
    });
  };

  const handlePhoneChange = (val: string) => {
    let cleaned = val.replace(/\D/g, '');
    if (cleaned.length > 11) cleaned = cleaned.slice(0, 11);
    let formatted = cleaned;
    if (cleaned.length > 2) formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    if (cleaned.length > 7) formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    setFormData((p) => ({ ...p, patientPhone: formatted }));
  };

  const handleCpfChange = (val: string) => {
    let cleaned = val.replace(/\D/g, '');
    if (cleaned.length > 11) cleaned = cleaned.slice(0, 11);
    let formatted = cleaned;
    if (cleaned.length > 3) formatted = `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
    if (cleaned.length > 6) formatted = `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
    if (cleaned.length > 9) formatted = `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9)}`;
    setFormData((p) => ({ ...p, patientCpf: formatted }));
  };

  const handleSubmitAndSendWhatsApp = () => {
    if (!formData.patientName.trim()) {
      alert('Por favor, informe seu nome completo para prosseguir.');
      setCurrentStep(1);
      return;
    }

    if (!formData.termoAceito) {
      alert('Por favor, confirme a declaração de veracidade das informações.');
      return;
    }

    const submissionId = `resp_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const submission: PatientInteractiveSubmission = {
      id: submissionId,
      createdAt: new Date().toISOString(),
      formType: formType,
      procedureTitle: initialProcedureTitle,
      procedureDocId: initialDocId,
      clinicName: initialClinicName,
      clinicPhone: initialClinicPhone,
      patientName: formData.patientName,
      patientCpf: formData.patientCpf,
      patientRg: formData.patientRg,
      patientBirthDate: formData.patientBirthDate,
      patientAge: formData.patientAge,
      patientGender: formData.patientGender,
      patientMaritalStatus: formData.patientMaritalStatus,
      patientPhone: formData.patientPhone,
      patientEmail: formData.patientEmail,
      patientProfession: formData.patientProfession,
      patientAddress: formData.patientAddress,
      emergencyContactName: formData.emergencyContactName,
      emergencyContactPhone: formData.emergencyContactPhone,
      emergencyContactRelationship: formData.emergencyContactRelationship,

      condicoesClinicas: formData.condicoesClinicas,
      alergias: formData.alergias,
      medicamentosUso: formData.medicamentosUso,
      gestanteLactante: formData.gestanteLactante,
      fumante: formData.fumante,
      ingestaoAlcool: formData.ingestaoAlcool,
      atividadeFisica: formData.atividadeFisica,
      consumoAgua: formData.consumoAgua,
      exposicaoSolar: formData.exposicaoSolar,
      tendenciaQueloide: formData.tendenciaQueloide,
      historicoHerpes: formData.historicoHerpes,
      cicatrizacao: formData.cicatrizacao,
      procedimentosPrevios: formData.procedimentosPrevios,
      possuiImplantesPermanentes: formData.possuiImplantesPermanentes,
      cirurgiasPrevias: formData.cirurgiasPrevias,

      queixaPrincipal: formData.queixaPrincipal,
      tempoQueixa: formData.tempoQueixa,
      expectativa: formData.expectativa,
      fototipo: formData.fototipo,
      biotipo: formData.biotipo,
      observacoesPaciente: formData.observacoesPaciente,
      termoAceito: formData.termoAceito,
      assinaturaNome: formData.assinaturaNome || formData.patientName,
      status: 'novo',
    };

    savePatientSubmission(submission);
    setSubmittedData(submission);
    setIsSubmitted(true);

    const waText = formatSubmissionToWhatsAppText(submission);
    const cleanClinicPhone = (initialClinicPhone || '').replace(/\D/g, '');
    let targetWaUrl = `https://wa.me/?text=${encodeURIComponent(waText)}`;
    if (cleanClinicPhone.length >= 10) {
      targetWaUrl = `https://wa.me/55${cleanClinicPhone}?text=${encodeURIComponent(waText)}`;
    }

    setTimeout(() => {
      window.open(targetWaUrl, '_blank');
    }, 400);
  };

  // Preset lists for patient clicking
  const CONDICOES_PATOLOGICAS = [
    'Nenhuma patologia crônica',
    'Hipertensão Arterial (Pressão Alta)',
    'Diabetes Mellitus',
    'Doença Cardíaca / Marcapasso',
    'Doença Autoimune (Lúpus/Tireoidite)',
    'Problemas de Coagulação / Trombose',
    'Epilepsia / Convulsões',
    'Histórico de Câncer / Tumores',
    'Hipotireoidismo / Hipertireoidismo',
    'Ansiedade / Depressão'
  ];

  const ALERGIAS_LIST = [
    'Nega qualquer tipo de alergia',
    'Alergia a Anestésicos Locais (Lidocaína)',
    'Alergia a Dipirona / Anti-inflamatórios',
    'Alergia a Penicilina / Antibióticos',
    'Alergia / Sensibilidade ao Látex',
    'Alergia a Frutos do Mar / Iodo',
    'Sensibilidade a Cosméticos / Perfumes'
  ];

  const MEDICAMENTOS_LIST = [
    'Nega uso contínuo de medicamentos',
    'Anticoagulantes / AAS / Varfarina',
    'Anti-hipertensivo (Pressão)',
    'Remédio para Tireoide (Levotiroxina)',
    'Anticoncepcional Oral / Injetável',
    'Roacutan (Isotretinoína nos últimos 6 meses)',
    'Corticoides contínuos',
    'Calmante / Antidepressivo'
  ];

  const PROCEDIMENTOS_ESTETICOS = [
    'Nunca realizou procedimentos estéticos',
    'Toxina Botulínica (Botox)',
    'Preenchimento com Ácido Hialurônico',
    'Bioestimulador (Sculptra/Radiesse)',
    'Fios de Sustentação PDO',
    'Peeling Químico / Laser Facial',
    'Cirurgia Plástica Facial ou Corporal'
  ];

  if (isSubmitted && submittedData) {
    const waText = formatSubmissionToWhatsAppText(submittedData);
    const cleanClinicPhone = (initialClinicPhone || '').replace(/\D/g, '');
    let targetWaUrl = `https://wa.me/?text=${encodeURIComponent(waText)}`;
    if (cleanClinicPhone.length >= 10) {
      targetWaUrl = `https://wa.me/55${cleanClinicPhone}?text=${encodeURIComponent(waText)}`;
    }

    return (
      <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col items-center justify-center p-4">
        <div className="bg-[#121216] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center space-y-5 shadow-2xl animate-scaleUp">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full mx-auto flex items-center justify-center border border-emerald-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-white">
              Ficha Preenchida com Sucesso! ✨
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">
              Obrigado, <strong className="text-white">{submittedData.patientName}</strong>. Suas respostas foram registradas com total segurança.
            </p>
          </div>

          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-left text-xs space-y-2 text-zinc-300">
            <div><strong>Clínica:</strong> {initialClinicName}</div>
            <div><strong>Procedimento:</strong> {initialProcedureTitle}</div>
            <div><strong>Documento:</strong> {formType === 'ficha_cadastral' ? 'Ficha Cadastral & Prontuário' : formType === 'anamnese' ? 'Anamnese Clínica' : 'Cadastro + Anamnese Completa'}</div>
            <div><strong>Data:</strong> {new Date().toLocaleDateString('pt-BR')}</div>
          </div>

          <div className="space-y-3 pt-2">
            <a
              href={targetWaUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 transition active:scale-95 cursor-pointer border border-emerald-400/40"
            >
              <Send className="w-4 h-4" />
              <span>Abrir WhatsApp e Enviar para a Clínica</span>
            </a>

            {onExit && (
              <button
                type="button"
                onClick={onExit}
                className="text-xs text-zinc-500 hover:text-zinc-300 cursor-pointer pt-1"
              >
                Voltar ao Painel da Clínica
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-200 flex flex-col font-sans">
      {/* Top Clinic Branding Header */}
      <header className="bg-zinc-900/90 border-b border-zinc-800 sticky top-0 z-30 backdrop-blur-md px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-serif font-black text-sm">
              VE
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-tight">
                {initialClinicName}
              </div>
              <div className="text-[10px] text-zinc-400">
                {initialProcedureTitle}
              </div>
            </div>
          </div>

          {onExit && (
            <button
              onClick={onExit}
              className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-[11px] text-zinc-300 transition"
            >
              Sair
            </button>
          )}
        </div>
      </header>

      {/* Main Content Form */}
      <main className="flex-1 max-w-2xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Document Type Selector Chips */}
        <div className="bg-zinc-900/90 border border-zinc-800 p-1.5 rounded-2xl grid grid-cols-3 gap-1">
          <button
            type="button"
            onClick={() => { setFormType('ficha_cadastral'); setCurrentStep(1); }}
            className={`py-2 px-1 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              formType === 'ficha_cadastral'
                ? 'bg-cyan-500 text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span className="truncate">Ficha Cadastral</span>
          </button>

          <button
            type="button"
            onClick={() => { setFormType('anamnese'); setCurrentStep(1); }}
            className={`py-2 px-1 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              formType === 'anamnese'
                ? 'bg-emerald-500 text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span className="truncate">Anamnese</span>
          </button>

          <button
            type="button"
            onClick={() => { setFormType('completo'); setCurrentStep(1); }}
            className={`py-2 px-1 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              formType === 'completo'
                ? 'bg-teal-500 text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="truncate">Completa</span>
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
          <span className="font-bold text-white">
            {formType === 'ficha_cadastral'
              ? 'Prontuário & Cadastro'
              : formType === 'anamnese'
              ? 'Anamnese Clínica'
              : 'Ficha Completa'}
          </span>
          <span className="text-[11px] font-mono text-zinc-500">
            Passo {currentStep} de {formType === 'ficha_cadastral' ? 4 : formType === 'anamnese' ? 3 : 5}
          </span>
        </div>

        {/* FORM TYPE: FICHA CADASTRAL FLOW */}
        {formType === 'ficha_cadastral' && (
          <>
            {/* ETAPA 1: Dados Pessoais e Endereço */}
            {currentStep === 1 && (
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-extrabold uppercase tracking-wider">
                  <User className="w-4 h-4" />
                  <span>1. Dados Cadastrais & Contato</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Nome Completo *</label>
                    <input
                      type="text"
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value, assinaturaNome: e.target.value })}
                      placeholder="Seu nome completo"
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">CPF *</label>
                      <input
                        type="text"
                        value={formData.patientCpf}
                        onChange={(e) => handleCpfChange(e.target.value)}
                        placeholder="000.000.000-00"
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:border-cyan-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">Data de Nascimento</label>
                      <input
                        type="text"
                        value={formData.patientBirthDate}
                        onChange={(e) => setFormData({ ...formData, patientBirthDate: e.target.value })}
                        placeholder="DD/MM/AAAA"
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">WhatsApp / Celular *</label>
                      <input
                        type="tel"
                        value={formData.patientPhone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder="(11) 98765-4321"
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:border-cyan-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">Profissão</label>
                      <input
                        type="text"
                        value={formData.patientProfession}
                        onChange={(e) => setFormData({ ...formData, patientProfession: e.target.value })}
                        placeholder="Sua profissão"
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Endereço Residencial</label>
                    <input
                      type="text"
                      value={formData.patientAddress}
                      onChange={(e) => setFormData({ ...formData, patientAddress: e.target.value })}
                      placeholder="Rua, Número, Bairro, Cidade"
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-500 outline-none"
                    />
                  </div>

                  <div className="pt-2 border-t border-zinc-800">
                    <label className="block text-xs font-semibold text-cyan-400 mb-1">Contato de Emergência (Opcional)</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={formData.emergencyContactName}
                        onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                        placeholder="Nome do contato"
                        className="bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                      />
                      <input
                        type="text"
                        value={formData.emergencyContactPhone}
                        onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                        placeholder="Telefone do contato"
                        className="bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (!formData.patientName.trim()) {
                        alert('Por favor, informe seu nome completo.');
                        return;
                      }
                      setCurrentStep(2);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Próximo: Saúde & Alergias</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 2: Condições de Saúde & Alergias */}
            {currentStep === 2 && (
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-5 animate-fadeIn">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-extrabold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>2. Histórico de Saúde & Alergias</span>
                </div>

                {/* Condições Clínicas */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">
                    Possui alguma das seguintes condições de saúde? (Toque para marcar)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {CONDICOES_PATOLOGICAS.map((item) => {
                      const isSelected = formData.condicoesClinicas.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleArrayItem('condicoesClinicas', item)}
                          className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                              : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                          }`}
                        >
                          <span className="leading-snug">{item}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Alergias */}
                <div>
                  <label className="block text-xs font-semibold text-red-400 mb-2">
                    Alergias conhecidas (Toque para marcar):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ALERGIAS_LIST.map((item) => {
                      const isSelected = formData.alergias.includes(item);
                      const isNegative = item.startsWith('Nega');
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleArrayItem('alergias', item)}
                          className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? isNegative
                                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                                : 'bg-red-500/20 border-red-400 text-red-200'
                              : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                          }`}
                        >
                          <span className="leading-snug">{item}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between pt-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold cursor-pointer"
                  >
                    &larr; Voltar
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Próximo: Medicamentos & Hábitos</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 3: Medicamentos & Hábitos de Vida */}
            {currentStep === 3 && (
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-5 animate-fadeIn">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-extrabold uppercase tracking-wider">
                  <Heart className="w-4 h-4" />
                  <span>3. Medicamentos, Procedimentos & Hábitos</span>
                </div>

                {/* Medicamentos */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">
                    Medicamentos em uso contínuo:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {MEDICAMENTOS_LIST.map((item) => {
                      const isSelected = formData.medicamentosUso.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleArrayItem('medicamentosUso', item)}
                          className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                              : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                          }`}
                        >
                          <span className="leading-snug">{item}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Procedimentos Estéticos Prévios */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">
                    Procedimentos estéticos anteriores já realizados:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PROCEDIMENTOS_ESTETICOS.map((item) => {
                      const isSelected = formData.procedimentosPrevios.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleArrayItem('procedimentosPrevios', item)}
                          className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                              : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                          }`}
                        >
                          <span className="leading-snug">{item}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Observação Livre */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Outras observações sobre sua saúde ou tratamentos anteriores:
                  </label>
                  <textarea
                    rows={2}
                    value={formData.observacoesPaciente}
                    onChange={(e) => setFormData({ ...formData, observacoesPaciente: e.target.value })}
                    placeholder="Escreva qualquer detalhe que julgar relevante..."
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="flex justify-between pt-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold cursor-pointer"
                  >
                    &larr; Voltar
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Próximo: Declaração & Envio</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 4: Declaração & Envio */}
            {currentStep === 4 && (
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-5 animate-fadeIn">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-extrabold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>4. Confirmação & Assinatura do Prontuário</span>
                </div>

                <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2 text-xs">
                  <div><strong>Paciente:</strong> {formData.patientName}</div>
                  <div><strong>WhatsApp:</strong> {formData.patientPhone}</div>
                  <div><strong>Alergias:</strong> {formData.alergias.length > 0 ? formData.alergias.join(', ') : 'Nenhuma relatada'}</div>
                  <div><strong>Condições Crônicas:</strong> {formData.condicoesClinicas.length > 0 ? formData.condicoesClinicas.join(', ') : 'Nenhuma relatada'}</div>
                </div>

                <div className="p-4 bg-cyan-950/30 border border-cyan-500/30 rounded-xl space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.termoAceito}
                      onChange={(e) => setFormData({ ...formData, termoAceito: e.target.checked })}
                      className="mt-1 w-4 h-4 text-cyan-600 rounded bg-zinc-950 border-zinc-700"
                    />
                    <span className="text-xs text-zinc-200 leading-relaxed font-medium">
                      <strong>Declaração de Veracidade (Art. 299 CP):</strong> Declaro que todas as informações acima são verdadeiras e completas, não tendo omitido nenhum problema de saúde, cirurgia ou medicamento em uso.
                    </span>
                  </label>

                  <div>
                    <label className="block text-[11px] text-zinc-300 font-semibold mb-1">
                      Assinatura Digital (Seu Nome Completo):
                    </label>
                    <input
                      type="text"
                      value={formData.assinaturaNome}
                      onChange={(e) => setFormData({ ...formData, assinaturaNome: e.target.value })}
                      placeholder="Nome completo para assinatura"
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white outline-none font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={handleSubmitAndSendWhatsApp}
                    className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-cyan-950/80 transition active:scale-98 cursor-pointer border border-cyan-400/40"
                  >
                    <Send className="w-5 h-5" />
                    <span>Concluir e Enviar Ficha Cadastral no WhatsApp</span>
                  </button>

                  <div className="flex justify-between items-center pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold cursor-pointer"
                    >
                      &larr; Voltar
                    </button>
                    <span className="text-[11px] text-zinc-500">
                      🔒 Envio Criptografado
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* FORM TYPE: ANAMNESE FLOW */}
        {formType === 'anamnese' && (
          <>
            {/* ETAPA 1: Identificação & Queixa Principal */}
            {currentStep === 1 && (
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
                  <Stethoscope className="w-4 h-4" />
                  <span>1. Identificação & Queixa Principal</span>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">Nome Completo *</label>
                      <input
                        type="text"
                        value={formData.patientName}
                        onChange={(e) => setFormData({ ...formData, patientName: e.target.value, assinaturaNome: e.target.value })}
                        placeholder="Seu nome completo"
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">WhatsApp *</label>
                      <input
                        type="tel"
                        value={formData.patientPhone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder="(11) 98765-4321"
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:border-emerald-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-emerald-400 mb-1">
                      Qual é o seu principal incômodo ou queixa estética? *
                    </label>
                    <textarea
                      rows={3}
                      value={formData.queixaPrincipal}
                      onChange={(e) => setFormData({ ...formData, queixaPrincipal: e.target.value })}
                      placeholder="Ex: Rugas na testa, flacidez facial, lábios finos, bigode chinês..."
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-white outline-none focus:border-emerald-500 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">Há quanto tempo te incomoda?</label>
                      <input
                        type="text"
                        value={formData.tempoQueixa}
                        onChange={(e) => setFormData({ ...formData, tempoQueixa: e.target.value })}
                        placeholder="Ex: 6 meses, 2 anos..."
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">O que você espera alcançar com o tratamento?</label>
                      <input
                        type="text"
                        value={formData.expectativa}
                        onChange={(e) => setFormData({ ...formData, expectativa: e.target.value })}
                        placeholder="Ex: Aspecto descansado e natural..."
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (!formData.patientName.trim()) {
                        alert('Por favor, informe seu nome completo.');
                        return;
                      }
                      setCurrentStep(2);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Próximo: Pele & Contraindicações</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 2: Avaliação de Pele & Contraindicações */}
            {currentStep === 2 && (
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-5 animate-fadeIn">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>2. Pele & Contraindicações do Procedimento</span>
                </div>

                {/* Biotipo Cutâneo */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">
                    Como você classifica a sua pele no dia a dia?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['Oleosa / Lipídica', 'Seca / Alípica', 'Mista', 'Normal / Eudérmica'].map((bio) => (
                      <button
                        key={bio}
                        type="button"
                        onClick={() => setFormData({ ...formData, biotipo: bio })}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                          formData.biotipo === bio
                            ? 'bg-emerald-500 text-black border-emerald-400'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                        }`}
                      >
                        {bio}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Alergias Rápidas */}
                <div>
                  <label className="block text-xs font-semibold text-red-400 mb-2">
                    Alergias conhecidas (Importante):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ALERGIAS_LIST.map((item) => {
                      const isSelected = formData.alergias.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleArrayItem('alergias', item)}
                          className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-red-500/20 border-red-400 text-red-200'
                              : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                          }`}
                        >
                          <span className="leading-snug">{item}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between pt-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold cursor-pointer"
                  >
                    &larr; Voltar
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Próximo: Declaração & Envio</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 3: Declaração & Envio Anamnese */}
            {currentStep === 3 && (
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-5 animate-fadeIn">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>3. Revisão & Envio da Anamnese</span>
                </div>

                <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2 text-xs">
                  <div><strong>Paciente:</strong> {formData.patientName}</div>
                  <div><strong>Procedimento:</strong> {initialProcedureTitle}</div>
                  <div><strong>Queixa Principal:</strong> {formData.queixaPrincipal || 'Não informada'}</div>
                  <div><strong>Expectativa:</strong> {formData.expectativa || 'Não informada'}</div>
                </div>

                <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.termoAceito}
                      onChange={(e) => setFormData({ ...formData, termoAceito: e.target.checked })}
                      className="mt-1 w-4 h-4 text-emerald-600 rounded bg-zinc-950 border-zinc-700"
                    />
                    <span className="text-xs text-zinc-200 leading-relaxed font-medium">
                      <strong>Declaro que as informações acima são verdadeiras</strong> e refletem exatamente minhas queixas e histórico para a avaliação clínica.
                    </span>
                  </label>

                  <div>
                    <label className="block text-[11px] text-zinc-300 font-semibold mb-1">
                      Assinatura Digital (Seu Nome):
                    </label>
                    <input
                      type="text"
                      value={formData.assinaturaNome}
                      onChange={(e) => setFormData({ ...formData, assinaturaNome: e.target.value })}
                      placeholder="Nome completo para assinatura"
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white outline-none font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={handleSubmitAndSendWhatsApp}
                    className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-950/80 transition active:scale-98 cursor-pointer border border-emerald-400/40"
                  >
                    <Send className="w-5 h-5" />
                    <span>Concluir e Enviar Anamnese no WhatsApp</span>
                  </button>

                  <div className="flex justify-between items-center pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold cursor-pointer"
                    >
                      &larr; Voltar
                    </button>
                    <span className="text-[11px] text-zinc-500">
                      🔒 Envio Seguro
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* FORM TYPE: COMPLETO FLOW */}
        {formType === 'completo' && (
          <div className="space-y-4">
            {/* Step 1 to 5 generic flow covering both */}
            {currentStep === 1 && (
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-teal-400 text-xs font-extrabold uppercase tracking-wider">
                  <User className="w-4 h-4" />
                  <span>1. Dados Pessoais & Queixa Principal</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Nome Completo *</label>
                    <input
                      type="text"
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value, assinaturaNome: e.target.value })}
                      placeholder="Seu nome completo"
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-teal-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">CPF *</label>
                      <input
                        type="text"
                        value={formData.patientCpf}
                        onChange={(e) => handleCpfChange(e.target.value)}
                        placeholder="000.000.000-00"
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:border-teal-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">WhatsApp *</label>
                      <input
                        type="tel"
                        value={formData.patientPhone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder="(11) 98765-4321"
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:border-teal-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-teal-400 mb-1">
                      Qual é o seu principal incômodo ou queixa estética?
                    </label>
                    <textarea
                      rows={2}
                      value={formData.queixaPrincipal}
                      onChange={(e) => setFormData({ ...formData, queixaPrincipal: e.target.value })}
                      placeholder="Descreva o que gostaria de melhorar..."
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-white outline-none focus:border-teal-500 resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (!formData.patientName.trim()) {
                        alert('Por favor, informe seu nome completo.');
                        return;
                      }
                      setCurrentStep(2);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Próximo: Saúde & Alergias</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-teal-400 text-xs font-extrabold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>2. Saúde, Alergias e Medicamentos</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">Condições Crônicas:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {CONDICOES_PATOLOGICAS.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleArrayItem('condicoesClinicas', item)}
                        className={`p-2 rounded-lg border text-left text-xs font-semibold flex items-center justify-between cursor-pointer ${
                          formData.condicoesClinicas.includes(item)
                            ? 'bg-teal-500/20 border-teal-400 text-teal-200'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                        }`}
                      >
                        <span>{item}</span>
                        {formData.condicoesClinicas.includes(item) && <Check className="w-3.5 h-3.5 text-teal-400" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-red-400 mb-2">Alergias:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ALERGIAS_LIST.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleArrayItem('alergias', item)}
                        className={`p-2 rounded-lg border text-left text-xs font-semibold flex items-center justify-between cursor-pointer ${
                          formData.alergias.includes(item)
                            ? 'bg-red-500/20 border-red-400 text-red-200'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                        }`}
                      >
                        <span>{item}</span>
                        {formData.alergias.includes(item) && <Check className="w-3.5 h-3.5 text-red-400" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold cursor-pointer"
                  >
                    &larr; Voltar
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Próximo: Declaração & Envio</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-5 animate-fadeIn">
                <div className="flex items-center gap-2 text-teal-400 text-xs font-extrabold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>3. Declaração & Envio Completo</span>
                </div>

                <div className="p-4 bg-teal-950/30 border border-teal-500/30 rounded-xl space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.termoAceito}
                      onChange={(e) => setFormData({ ...formData, termoAceito: e.target.checked })}
                      className="mt-1 w-4 h-4 text-teal-600 rounded bg-zinc-950 border-zinc-700"
                    />
                    <span className="text-xs text-zinc-200 leading-relaxed font-medium">
                      <strong>Declaro que todas as informações prestadas são verdadeiras</strong> e autorizo a utilização das mesmas para a elaboração do meu prontuário e anamnese clínica.
                    </span>
                  </label>

                  <div>
                    <label className="block text-[11px] text-zinc-300 font-semibold mb-1">
                      Assinatura Digital (Seu Nome):
                    </label>
                    <input
                      type="text"
                      value={formData.assinaturaNome}
                      onChange={(e) => setFormData({ ...formData, assinaturaNome: e.target.value })}
                      placeholder="Nome completo para assinatura"
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white outline-none font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={handleSubmitAndSendWhatsApp}
                    className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-500 hover:to-emerald-400 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-teal-950/80 transition active:scale-98 cursor-pointer border border-teal-400/40"
                  >
                    <Send className="w-5 h-5" />
                    <span>Concluir e Enviar Ficha Completa no WhatsApp</span>
                  </button>

                  <div className="flex justify-between items-center pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold cursor-pointer"
                    >
                      &larr; Voltar
                    </button>
                    <span className="text-[11px] text-zinc-500">
                      🔒 Envio Criptografado
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-zinc-600 text-[11px] border-t border-zinc-900 mt-8">
        © {new Date().getFullYear()} {initialClinicName} &bull; Prontuário & Ficha Cadastral Segura
      </footer>
    </div>
  );
};
