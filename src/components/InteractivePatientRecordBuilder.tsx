import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Copy,
  RotateCcw,
  Sparkles,
  Check,
  Phone,
  User,
  Heart,
  ShieldAlert,
  Send,
  Inbox,
  Smartphone,
  Save,
  FileText,
  FileCheck2,
  Calendar,
  MapPin
} from 'lucide-react';
import { PatientFormState } from '../utils/procedureClinicalDocsHelper';

export interface InteractivePatientRecordData {
  // Identificação Pessoal
  nomeCliente: string;
  cpfCliente: string;
  rgCliente?: string;
  dataNascimento?: string;
  idade?: string;
  genero?: string;
  estadoCivil?: string;
  profissao?: string;
  telefone: string;
  email?: string;
  endereco?: string;
  contatoEmergenciaNome?: string;
  contatoEmergenciaTelefone?: string;
  contatoEmergenciaParentesco?: string;

  // Antecedentes Clínicos e Patológicos
  condicoesClinicas: string[];
  alergias: string[];
  medicamentosUso: string[];

  // Fisiologia e Hábitos
  condicaoFisiologica?: 'Nenhuma restrição' | 'Gestante' | 'Lactante';
  tabagismo?: 'Não fuma' | 'Fumante eventual' | 'Fumante diário';
  ingestaoAlcool?: 'Não ingere' | 'Social / Ocasional' | 'Frequente';
  atividadeFisica?: 'Sedentário' | 'Moderada (2-3x/sem)' | 'Intensa diária';
  consumoAgua?: 'Mais de 2L/dia' | '1 a 2L/dia' | 'Menos de 1L/dia';
  exposicaoSolar?: 'Baixa / Fotoprotegido' | 'Moderada' | 'Alta / Frequente';
  tendenciaQueloide?: 'Não' | 'Sim (Cicatrizes hipertróficas / Quelóides)';
  historicoHerpes?: 'Nunca teve' | 'Esporádico' | 'Frequente';

  // Histórico Estético Prévio
  procedimentosPrevios: string[];
  possuiPreenchedorDefinitivo?: 'Não' | 'Sim (PMMA / Silicone industrial)';
  detalhesPreenchedorDefinitivo?: string;
  cirurgiasPrevias?: string;
  protesesOuImplantes?: string;

  // Observações Gerais e Responsável
  observacoesGerais: string;
  dataAbertura?: string;
  profissionalResponsavel?: string;
  registroProfissional?: string;
}

export const PRESET_PATOLOGIAS_CADASTRAIS = [
  'Nenhuma patologia crônica relatada',
  'Hipertensão Arterial Sistêmica (HAS)',
  'Diabetes Mellitus (Tipo 1 / Tipo 2)',
  'Cardiopatia / Portador de Marcapasso',
  'Doença Autoimune (Lúpus / Tireoidite / Psoríase)',
  'Distúrbios de Coagulação / Trombose / Embolia prévia',
  'Epilepsia / Histórico de Convulsões',
  'Histórico Oncológico / Câncer em remissão',
  'Insuficiência Renal ou Hepática',
  'Problemas Circulatórios / Varizes acentuadas',
  'Hipotireoidismo / Hipertireoidismo',
  'Ansiedade / Depressão diagnosticada'
];

export const PRESET_ALERGIAS_CADASTRAIS = [
  'Nega qualquer tipo de alergia',
  'Alergia a Anestésicos Locais (Lidocaína / Procaína / Benzocaína)',
  'Alergia a Dipirona / AINEs / Anti-inflamatórios / AAS',
  'Alergia a Penicilina / Amoxicilina / Antibióticos',
  'Alergia / Sensibilidade ao Látex',
  'Alergia a Frutos do Mar / Iodo',
  'Sensibilidade a Cosméticos / Perfumes / Conservantes',
  'Alergia a Picadas de Insetos / Venenos',
  'Alergia a Fita Adesiva / Micropore / Esparadrapo'
];

export const PRESET_MEDICAMENTOS_CADASTRAIS = [
  'Nega uso contínuo de medicamentos',
  'Anticoagulantes / Antiagregantes (AAS / Clopidogrel / Varfarina)',
  'Anti-hipertensivos diários',
  'Hipoglicemiantes orais / Insulina',
  'Levotiroxina Sódica (Hipotireoidismo)',
  'Anticoncepcional Oral / Injetável / DIU hormonal',
  'Corticoides contínuos ou recentes',
  'Isotretinoína (Roacutan nos últimos 6 meses)',
  'Imunossupressores / Quimioterápicos',
  'Antidepressivos / Ansiolíticos / Estabilizadores de Humor',
  'Suplementos Vitamínicos / Colágeno / Fitoterápicos'
];

export const PRESET_PROCEDIMENTOS_CADASTRAIS = [
  'Nunca realizou procedimentos estéticos prévios',
  'Toxina Botulínica anterior',
  'Preenchimento com Ácido Hialurônico anterior',
  'Bioestimuladores de Colágeno (Sculptra / Radiesse / Elleva)',
  'Fios de Sustentação / Tração PDO',
  'Peelings Químicos / Lasers / Luz Intensa Pulsada',
  'Microagulhamento / Drug Delivery',
  'Cirurgia Plástica Facial (Blefaroplastia / Rinoplastia / Lifting)',
  'Cirurgia Plástica Corporal (Lipoaspiração / Abdominoplastia / Próteses)',
  'Implantes Dentários / Próteses metálicas na face'
];

interface InteractivePatientRecordBuilderProps {
  patient: PatientFormState;
  clinicName: string;
  clinicCnpj?: string;
  initialData?: Partial<InteractivePatientRecordData>;
  onGenerateDoc: (generatedHtml: string, patientState: PatientFormState) => void;
  onClose?: () => void;
}

export const InteractivePatientRecordBuilder: React.FC<InteractivePatientRecordBuilderProps> = ({
  patient,
  clinicName,
  clinicCnpj = '',
  initialData,
  onGenerateDoc,
  onClose
}) => {
  const [data, setData] = useState<InteractivePatientRecordData>(() => ({
    nomeCliente: initialData?.nomeCliente || patient.nomeCliente || '',
    cpfCliente: initialData?.cpfCliente || patient.cpfCliente || '',
    rgCliente: initialData?.rgCliente || '',
    dataNascimento: initialData?.dataNascimento || patient.dataNascimento || '',
    idade: initialData?.idade || '',
    genero: initialData?.genero || '',
    estadoCivil: initialData?.estadoCivil || '',
    profissao: initialData?.profissao || patient.profissao || '',
    telefone: initialData?.telefone || patient.telefone || '',
    email: initialData?.email || patient.email || '',
    endereco: initialData?.endereco || patient.endereco || '',
    contatoEmergenciaNome: initialData?.contatoEmergenciaNome || '',
    contatoEmergenciaTelefone: initialData?.contatoEmergenciaTelefone || '',
    contatoEmergenciaParentesco: initialData?.contatoEmergenciaParentesco || '',

    condicoesClinicas: initialData?.condicoesClinicas || [],
    alergias: initialData?.alergias || [],
    medicamentosUso: initialData?.medicamentosUso || [],

    condicaoFisiologica: initialData?.condicaoFisiologica || 'Nenhuma restrição',
    tabagismo: initialData?.tabagismo || undefined,
    ingestaoAlcool: initialData?.ingestaoAlcool || undefined,
    atividadeFisica: initialData?.atividadeFisica || undefined,
    consumoAgua: initialData?.consumoAgua || undefined,
    exposicaoSolar: initialData?.exposicaoSolar || undefined,
    tendenciaQueloide: initialData?.tendenciaQueloide || undefined,
    historicoHerpes: initialData?.historicoHerpes || undefined,

    procedimentosPrevios: initialData?.procedimentosPrevios || [],
    possuiPreenchedorDefinitivo: initialData?.possuiPreenchedorDefinitivo || 'Não',
    detalhesPreenchedorDefinitivo: initialData?.detalhesPreenchedorDefinitivo || '',
    cirurgiasPrevias: initialData?.cirurgiasPrevias || '',
    protesesOuImplantes: initialData?.protesesOuImplantes || '',

    observacoesGerais: initialData?.observacoesGerais || '',
    dataAbertura: initialData?.dataAbertura || patient.data || new Date().toLocaleDateString('pt-BR'),
    profissionalResponsavel: initialData?.profissionalResponsavel || patient.profissionalResponsavel || '',
    registroProfissional: initialData?.registroProfissional || patient.registroProfissional || '',
  }));

  const [activeStep, setActiveStep] = useState<number>(1);
  const [generatedHtmlPreview, setGeneratedHtmlPreview] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Multi-select toggle helper
  const toggleArrayItem = (field: 'condicoesClinicas' | 'alergias' | 'medicamentosUso' | 'procedimentosPrevios', item: string) => {
    setData((prev) => {
      const currentList = prev[field] || [];
      if (currentList.includes(item)) {
        return { ...prev, [field]: currentList.filter((i) => i !== item) };
      } else {
        let filtered = currentList;
        if (item.startsWith('Nenhuma') || item.startsWith('Nega') || item.startsWith('Nunca')) {
          filtered = [];
        } else {
          filtered = currentList.filter((i) => !i.startsWith('Nenhuma') && !i.startsWith('Nega') && !i.startsWith('Nunca'));
        }
        return { ...prev, [field]: [...filtered, item] };
      }
    });
  };

  // Build the complete, beautiful A4 HTML document for PRONTUÁRIO CLÍNICO & FICHA CADASTRAL
  const buildHtmlDoc = (s: InteractivePatientRecordData): string => {
    const patologiasFormatted = s.condicoesClinicas.length > 0
      ? s.condicoesClinicas.map((c) => `<div style="margin: 2px 0;">• ${c}</div>`).join('')
      : '<div style="color: #64748b; font-style: italic;">(Nenhuma patologia crônica relatada)</div>';

    const alergiasFormatted = s.alergias.length > 0
      ? s.alergias.map((a) => `<div style="margin: 2px 0; color: #991b1b; font-weight: 600;">• ⚠ ${a}</div>`).join('')
      : '<div style="color: #166534; font-style: italic;">• Nega histórico de alergias conhecidas</div>';

    const medsFormatted = s.medicamentosUso.length > 0
      ? s.medicamentosUso.map((m) => `<div style="margin: 2px 0;">• ${m}</div>`).join('')
      : '<div style="color: #64748b; font-style: italic;">(Nenhum medicamento contínuo relatado)</div>';

    const procedsFormatted = s.procedimentosPrevios.length > 0
      ? s.procedimentosPrevios.map((p) => `<div style="margin: 2px 0;">• ${p}</div>`).join('')
      : '<div style="color: #64748b; font-style: italic;">(Nenhum procedimento estético prévio relatado)</div>';

    return `
<div style="font-family: 'Segoe UI', Arial, sans-serif; color: #0f172a; line-height: 1.5; font-size: 11px;">
  <!-- Cabeçalho Oficial do Prontuário -->
  <div style="border-bottom: 2px solid #06b6d4; padding-bottom: 8px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
      <h2 style="margin: 0; font-size: 16px; font-weight: 800; color: #0891b2; text-transform: uppercase; letter-spacing: 0.5px;">PRONTUÁRIO CLÍNICO & FICHA CADASTRAL DO PACIENTE</h2>
      <p style="margin: 2px 0 0 0; font-size: 10px; color: #475569;"><strong>${clinicName}</strong> &bull; RT: ${s.profissionalResponsavel} (${s.registroProfissional})</p>
    </div>
    <div style="text-align: right; font-size: 9.5px; color: #64748b;">
      <div><strong>Data de Abertura:</strong> ${s.dataAbertura}</div>
      <div><strong>Código Prontuário:</strong> PRON-${Math.floor(1000 + Math.random() * 9000)}</div>
    </div>
  </div>

  <!-- 1. DADOS DE IDENTIFICAÇÃO PESSOAL & CONTATO -->
  <h3 style="font-size: 11.5px; font-weight: bold; background: #ecfeff; padding: 4px 8px; border-left: 3px solid #0891b2; margin: 10px 0 6px 0; text-transform: uppercase; color: #155e75;">1. DADOS DE IDENTIFICAÇÃO PESSOAL & CONTATO</h3>
  <table style="width: 100%; border-collapse: collapse; font-size: 10.5px; margin-bottom: 10px;" border="1" bordercolor="#e2e8f0">
    <tr>
      <td style="padding: 6px; width: 60%;"><strong>Nome Completo:</strong> ${s.nomeCliente || '________________________________________________'}</td>
      <td style="padding: 6px; width: 40%;">${s.rgCliente ? `<strong>RG:</strong> ${s.rgCliente}` : '<strong>Documento:</strong> Registrado em Prontuário'}</td>
    </tr>
    <tr>
      <td style="padding: 6px;"><strong>Data de Nascimento:</strong> ${s.dataNascimento || '____/____/________'} ${s.idade ? `| <strong>Idade:</strong> ${s.idade} anos` : ''} ${s.genero ? `| <strong>Gênero:</strong> ${s.genero}` : ''}</td>
      <td style="padding: 6px;"><strong>Profissão:</strong> ${s.profissao || '________________________'} ${s.estadoCivil ? `| <strong>Est. Civil:</strong> ${s.estadoCivil}` : ''}</td>
    </tr>
    <tr>
      <td style="padding: 6px;"><strong>Telefone / Contato:</strong> ${s.telefone || '(__) _____-____'}</td>
      <td style="padding: 6px;"><strong>E-mail:</strong> ${s.email || '________________________'}</td>
    </tr>
    <tr>
      <td style="padding: 6px;" colspan="2"><strong>Endereço Residencial:</strong> ${s.endereco || '________________________________________________________'}</td>
    </tr>
    ${s.contatoEmergenciaNome ? `
    <tr>
      <td style="padding: 6px; background: #fafafa;" colspan="2"><strong>Contato de Emergência:</strong> ${s.contatoEmergenciaNome} &bull; <strong>Tel:</strong> ${s.contatoEmergenciaTelefone || 'Não informado'} ${s.contatoEmergenciaParentesco ? `(${s.contatoEmergenciaParentesco})` : ''}</td>
    </tr>
    ` : ''}
  </table>

  <!-- 2. ANTECEDENTES CLÍNICOS E PATOLÓGICOS -->
  <h3 style="font-size: 11.5px; font-weight: bold; background: #ecfeff; padding: 4px 8px; border-left: 3px solid #0891b2; margin: 10px 0 6px 0; text-transform: uppercase; color: #155e75;">2. ANTECEDENTES CLÍNICOS E PATOLÓGICOS</h3>
  <table style="width: 100%; border-collapse: collapse; font-size: 10px; margin-bottom: 10px;" border="1" bordercolor="#e2e8f0">
    <tr>
      <td style="padding: 6px; width: 50%; vertical-align: top;">
        <strong style="color: #0f172a; text-transform: uppercase; font-size: 9.5px;">Condições Crônicas & Doenças Pregressas:</strong>
        <div style="margin-top: 4px;">${patologiasFormatted}</div>
      </td>
      <td style="padding: 6px; width: 50%; vertical-align: top;">
        <strong style="color: #991b1b; text-transform: uppercase; font-size: 9.5px;">Alergias & Hipersensibilidades:</strong>
        <div style="margin-top: 4px;">${alergiasFormatted}</div>
      </td>
    </tr>
    <tr>
      <td style="padding: 6px; vertical-align: top;" colspan="2">
        <strong style="color: #0f172a; text-transform: uppercase; font-size: 9.5px;">Medicamentos em Uso Contínuo:</strong>
        <div style="margin-top: 4px;">${medsFormatted}</div>
      </td>
    </tr>
  </table>

  <!-- 3. HÁBITOS DE VIDA E CONDIÇÃO FISIOLÓGICA -->
  <h3 style="font-size: 11.5px; font-weight: bold; background: #ecfeff; padding: 4px 8px; border-left: 3px solid #0891b2; margin: 10px 0 6px 0; text-transform: uppercase; color: #155e75;">3. HÁBITOS DE VIDA E CONDIÇÃO FISIOLÓGICA</h3>
  <table style="width: 100%; border-collapse: collapse; font-size: 10px; margin-bottom: 10px;" border="1" bordercolor="#e2e8f0">
    <tr>
      <td style="padding: 5px; width: 33.3%;"><strong>Condição Fisiológica:</strong> ${s.condicaoFisiologica || 'Não especificada'}</td>
      <td style="padding: 5px; width: 33.3%;"><strong>Tabagismo:</strong> ${s.tabagismo || 'Não especificado'}</td>
      <td style="padding: 5px; width: 33.3%;"><strong>Ingestão Alcoólica:</strong> ${s.ingestaoAlcool || 'Não especificado'}</td>
    </tr>
    <tr>
      <td style="padding: 5px;"><strong>Atividade Física:</strong> ${s.atividadeFisica || 'Não especificado'}</td>
      <td style="padding: 5px;"><strong>Ingestão Hídrica:</strong> ${s.consumoAgua || 'Não especificado'}</td>
      <td style="padding: 5px;"><strong>Exposição Solar:</strong> ${s.exposicaoSolar || 'Não especificado'}</td>
    </tr>
    <tr>
      <td style="padding: 5px;" colspan="2"><strong>Tendência a Queloides / Cicatrizes Hipertróficas:</strong> ${s.tendenciaQueloide || 'Não informado'}</td>
      <td style="padding: 5px;"><strong>Histórico de Herpes:</strong> ${s.historicoHerpes || 'Não informado'}</td>
    </tr>
  </table>

  <!-- 4. HISTÓRICO DE PROCEDIMENTOS ESTÉTICOS PRÉVIOS -->
  <h3 style="font-size: 11.5px; font-weight: bold; background: #ecfeff; padding: 4px 8px; border-left: 3px solid #0891b2; margin: 10px 0 6px 0; text-transform: uppercase; color: #155e75;">4. HISTÓRICO DE PROCEDIMENTOS ESTÉTICOS PRÉVIOS</h3>
  <div style="padding: 6px 8px; border: 1px solid #e2e8f0; font-size: 10px; margin-bottom: 10px; background: #fff;">
    <div>${procedsFormatted}</div>
    ${s.possuiPreenchedorDefinitivo === 'Sim (PMMA / Silicone industrial)' ? `
      <div style="margin-top: 6px; padding: 4px 6px; background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; font-weight: bold; border-radius: 4px;">
        ⚠ ALERTA CRÍTICO: Paciente relata presença de preenchedor permanente (PMMA/Silicone) na região: ${s.detalhesPreenchedorDefinitivo || 'Não especificada'}.
      </div>
    ` : ''}
    ${s.cirurgiasPrevias ? `<div style="margin-top: 4px;">• <strong>Cirurgias Plásticas/Gerais Prévias:</strong> ${s.cirurgiasPrevias}</div>` : ''}
    ${s.protesesOuImplantes ? `<div style="margin-top: 2px;">• <strong>Próteses / Implantes:</strong> ${s.protesesOuImplantes}</div>` : ''}
  </div>

  ${s.observacoesGerais ? `
  <div style="margin-bottom: 10px; padding: 6px 8px; background: #f8fafc; border: 1px solid #e2e8f0; font-size: 10px;">
    <strong>Observações Clínicas Gerais:</strong> ${s.observacoesGerais}
  </div>
  ` : ''}

  <!-- DECLARAÇÃO DE VERACIDADE -->
  <div style="margin-top: 12px; padding: 8px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 6px; font-size: 9.5px; color: #475569; text-align: justify;">
    <strong>DECLARAÇÃO DE VERACIDADE (ART. 299 DO CÓDIGO PENAL):</strong> Declaro expressamente que todas as informações prestadas neste prontuário são a mais pura expressão da verdade, não tendo omitido qualquer patologia, alergia, gravidez, medicamento em uso ou procedimento estético anterior. Fico ciente de que a omissão de dados de saúde pode comprometer gravemente a segurança do meu tratamento.
  </div>

  <!-- ASSINATURAS -->
  <div style="margin-top: 20px; display: flex; justify-content: space-between; text-align: center; font-size: 10px;">
    <div style="width: 45%;">
      <div style="border-bottom: 1.5px solid #0f172a; height: 28px; margin-bottom: 4px;"></div>
      <div style="font-weight: bold; text-transform: uppercase;">${s.nomeCliente || 'Assinatura do(a) Paciente'}</div>
      <div style="font-size: 8.5px; color: #64748b;">Assinatura do(a) Paciente</div>
    </div>
    <div style="width: 45%;">
      <div style="border-bottom: 1.5px solid #0f172a; height: 28px; margin-bottom: 4px;"></div>
      <div style="font-weight: bold; text-transform: uppercase;">${s.profissionalResponsavel}</div>
      <div style="font-size: 8.5px; color: #64748b;">${s.registroProfissional} &bull; Responsável Técnico</div>
    </div>
  </div>
</div>
    `;
  };

  // Re-generate preview whenever data updates
  useEffect(() => {
    const html = buildHtmlDoc(data);
    setGeneratedHtmlPreview(html);
  }, [data]);

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(generatedHtmlPreview);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleSaveAndApply = () => {
    const updatedPatientState: PatientFormState = {
      ...patient,
      nomeCliente: data.nomeCliente || patient.nomeCliente,
      cpfCliente: data.cpfCliente || patient.cpfCliente,
      dataNascimento: data.dataNascimento || patient.dataNascimento,
      telefone: data.telefone || patient.telefone,
      email: data.email || patient.email,
      profissao: data.profissao || patient.profissao,
      endereco: data.endereco || patient.endereco,
      data: data.dataAbertura || patient.data,
      profissionalResponsavel: data.profissionalResponsavel || patient.profissionalResponsavel,
      registroProfissional: data.registroProfissional || patient.registroProfissional,
    };

    onGenerateDoc(generatedHtmlPreview, updatedPatientState);
  };

  return (
    <div className="flex flex-col h-full bg-[#0e0e11] text-zinc-200 overflow-hidden select-none">
      {/* Header */}
      <div className="px-4 py-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-inner">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                Prontuário & Ficha Cadastral Interativa
              </span>
              <span className="text-[10px] font-semibold text-zinc-400 hidden sm:inline">
                Preenchimento Rápido com 1-Clique
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white font-serif mt-0.5">
              Ficha do Paciente: {data.nomeCliente || 'Novo Paciente'}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveAndApply}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-950/40 transition active:scale-95 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Salvar no Prontuário</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition text-xs font-semibold"
            >
              Fechar
            </button>
          )}
        </div>
      </div>

      {/* Main Container: Split screen Left (Interactive Inputs) / Right (Live A4 Preview) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side: Interactive Builder Steps */}
        <div className="w-full lg:w-1/2 flex flex-col border-r border-zinc-800 bg-[#121216] overflow-hidden">
          {/* Steps Navigation Bar */}
          <div className="px-3 py-2 bg-zinc-900/90 border-b border-zinc-800 flex items-center gap-1 overflow-x-auto scrollbar-none shrink-0">
            {[
              { id: 1, label: '1. Identificação', icon: User },
              { id: 2, label: '2. Antecedentes', icon: ShieldAlert },
              { id: 3, label: '3. Alergias', icon: AlertCircle },
              { id: 4, label: '4. Medicamentos', icon: Heart },
              { id: 5, label: '5. Hábitos & Vida', icon: Sparkles },
              { id: 6, label: '6. Histórico Estético', icon: FileCheck2 },
            ].map((step) => {
              const Icon = step.icon;
              const isActive = activeStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-zinc-500'}`} />
                  <span>{step.label}</span>
                </button>
              );
            })}
          </div>

          {/* Step Contents */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
            {/* STEP 1: Identificação Cadastral Completa */}
            {activeStep === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-3 bg-cyan-950/20 border border-cyan-500/30 rounded-xl text-xs text-zinc-300">
                  <strong className="text-cyan-400">Dados Cadastrais do Paciente:</strong> Preencha ou atualize as informações de identificação civil e contato para emissão do prontuário oficial.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-[11px] uppercase font-bold text-zinc-400 block mb-1">Nome Completo do(a) Paciente</label>
                    <input
                      type="text"
                      value={data.nomeCliente}
                      onChange={(e) => setData({ ...data, nomeCliente: e.target.value })}
                      placeholder="Ex: Maria Eduarda Silva"
                      className="w-full bg-black/60 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-500 outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] uppercase font-bold text-zinc-400 block mb-1">RG / Documento de Identificação</label>
                    <input
                      type="text"
                      value={data.rgCliente || ''}
                      onChange={(e) => setData({ ...data, rgCliente: e.target.value })}
                      placeholder="00.000.000-0"
                      className="w-full bg-black/60 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase font-bold text-zinc-400 block mb-1">Data de Nascimento</label>
                    <input
                      type="text"
                      value={data.dataNascimento || ''}
                      onChange={(e) => setData({ ...data, dataNascimento: e.target.value })}
                      placeholder="DD/MM/AAAA"
                      className="w-full bg-black/60 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase font-bold text-zinc-400 block mb-1">Idade (anos)</label>
                    <input
                      type="text"
                      value={data.idade || ''}
                      onChange={(e) => setData({ ...data, idade: e.target.value })}
                      placeholder="Ex: 34"
                      className="w-full bg-black/60 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase font-bold text-zinc-400 block mb-1">Telefone / Celular</label>
                    <input
                      type="text"
                      value={data.telefone}
                      onChange={(e) => setData({ ...data, telefone: e.target.value })}
                      placeholder="(11) 99999-9999"
                      className="w-full bg-black/60 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase font-bold text-zinc-400 block mb-1">E-mail</label>
                    <input
                      type="email"
                      value={data.email || ''}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                      placeholder="paciente@email.com"
                      className="w-full bg-black/60 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase font-bold text-zinc-400 block mb-1">Profissão</label>
                    <input
                      type="text"
                      value={data.profissao || ''}
                      onChange={(e) => setData({ ...data, profissao: e.target.value })}
                      placeholder="Ex: Arquiteta"
                      className="w-full bg-black/60 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase font-bold text-zinc-400 block mb-1">Gênero / Estado Civil</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={data.genero || ''}
                        onChange={(e) => setData({ ...data, genero: e.target.value })}
                        placeholder="Gênero"
                        className="bg-black/60 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-500 outline-none"
                      />
                      <input
                        type="text"
                        value={data.estadoCivil || ''}
                        onChange={(e) => setData({ ...data, estadoCivil: e.target.value })}
                        placeholder="Est. Civil"
                        className="bg-black/60 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] uppercase font-bold text-zinc-400 block mb-1">Endereço Residencial Completo</label>
                    <input
                      type="text"
                      value={data.endereco || ''}
                      onChange={(e) => setData({ ...data, endereco: e.target.value })}
                      placeholder="Rua, Número, Bairro, Cidade - UF"
                      className="w-full bg-black/60 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-500 outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2 p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-2">
                    <span className="text-[11px] uppercase font-bold text-cyan-400 block">Contato de Emergência (Opcional)</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={data.contatoEmergenciaNome || ''}
                        onChange={(e) => setData({ ...data, contatoEmergenciaNome: e.target.value })}
                        placeholder="Nome do Contato"
                        className="bg-black/60 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-cyan-500 outline-none"
                      />
                      <input
                        type="text"
                        value={data.contatoEmergenciaTelefone || ''}
                        onChange={(e) => setData({ ...data, contatoEmergenciaTelefone: e.target.value })}
                        placeholder="Telefone Emergência"
                        className="bg-black/60 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-cyan-500 outline-none"
                      />
                      <input
                        type="text"
                        value={data.contatoEmergenciaParentesco || ''}
                        onChange={(e) => setData({ ...data, contatoEmergenciaParentesco: e.target.value })}
                        placeholder="Parentesco (Ex: Cônjuge/Mãe)"
                        className="bg-black/60 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-cyan-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Antecedentes Patológicos & Condições Crônicas */}
            {activeStep === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-3 bg-cyan-950/20 border border-cyan-500/30 rounded-xl text-xs text-zinc-300">
                  <strong className="text-cyan-400">Antecedentes Clínicos & Patologias:</strong> Clique nos botões para marcar/desmarcar as condições crônicas do paciente com 1 clique rápido.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PRESET_PATOLOGIAS_CADASTRAIS.map((item) => {
                    const isSelected = data.condicoesClinicas.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleArrayItem('condicoesClinicas', item)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition flex items-start gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-sm'
                            : 'bg-zinc-900/70 border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800/60'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                          isSelected ? 'bg-cyan-500 border-cyan-400 text-black' : 'border-zinc-600'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="leading-snug">{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: Alergias e Hipersensibilidades */}
            {activeStep === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-3 bg-red-950/20 border border-red-500/30 rounded-xl text-xs text-zinc-300">
                  <strong className="text-red-400">Alergias & Sensibilidades Medicamentosas:</strong> Alerta crucial para biossegurança clínica. Clique para selecionar ou desmarcar.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PRESET_ALERGIAS_CADASTRAIS.map((item) => {
                    const isSelected = data.alergias.includes(item);
                    const isNegative = item.startsWith('Nega');
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleArrayItem('alergias', item)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition flex items-start gap-2 cursor-pointer ${
                          isSelected
                            ? isNegative
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                              : 'bg-red-500/20 border-red-400 text-red-200 shadow-sm'
                            : 'bg-zinc-900/70 border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800/60'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                          isSelected
                            ? isNegative
                              ? 'bg-emerald-500 border-emerald-400 text-black'
                              : 'bg-red-500 border-red-400 text-white'
                            : 'border-zinc-600'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="leading-snug">{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: Medicamentos em Uso Contínuo */}
            {activeStep === 4 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-3 bg-cyan-950/20 border border-cyan-500/30 rounded-xl text-xs text-zinc-300">
                  <strong className="text-cyan-400">Medicamentos em Uso Contínuo:</strong> Identifique substâncias que alteram a coagulação, cicatrização ou resposta imunológica.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PRESET_MEDICAMENTOS_CADASTRAIS.map((item) => {
                    const isSelected = data.medicamentosUso.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleArrayItem('medicamentosUso', item)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition flex items-start gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-sm'
                            : 'bg-zinc-900/70 border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800/60'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                          isSelected ? 'bg-cyan-500 border-cyan-400 text-black' : 'border-zinc-600'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="leading-snug">{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 5: Hábitos de Vida & Condição Fisiológica */}
            {activeStep === 5 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-3 bg-cyan-950/20 border border-cyan-500/30 rounded-xl text-xs text-zinc-300">
                  <strong className="text-cyan-400">Hábitos de Vida & Fisiologia:</strong> Seleção rápida de estilo de vida que impacta os tratamentos estéticos.
                </div>

                <div className="space-y-3">
                  {/* Condição Fisiológica */}
                  <div>
                    <label className="text-[11px] uppercase font-bold text-zinc-400 block mb-1">Condição Fisiológica Atual</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Nenhuma restrição', 'Gestante', 'Lactante'] as const).map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setData({ ...data, condicaoFisiologica: opt })}
                          className={`p-2 rounded-lg border text-xs font-bold transition cursor-pointer ${
                            data.condicaoFisiologica === opt
                              ? 'bg-cyan-500 text-black border-cyan-400 shadow-md'
                              : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tabagismo */}
                  <div>
                    <label className="text-[11px] uppercase font-bold text-zinc-400 block mb-1">Tabagismo / Fumo</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Não fuma', 'Fumante eventual', 'Fumante diário'] as const).map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setData({ ...data, tabagismo: opt })}
                          className={`p-2 rounded-lg border text-xs font-bold transition cursor-pointer ${
                            data.tabagismo === opt
                              ? 'bg-cyan-500 text-black border-cyan-400 shadow-md'
                              : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Consumo de Álcool */}
                  <div>
                    <label className="text-[11px] uppercase font-bold text-zinc-400 block mb-1">Consumo de Álcool</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Não ingere', 'Social / Ocasional', 'Frequente'] as const).map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setData({ ...data, ingestaoAlcool: opt })}
                          className={`p-2 rounded-lg border text-xs font-bold transition cursor-pointer ${
                            data.ingestaoAlcool === opt
                              ? 'bg-cyan-500 text-black border-cyan-400 shadow-md'
                              : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Ingestão de Água */}
                  <div>
                    <label className="text-[11px] uppercase font-bold text-zinc-400 block mb-1">Ingestão Hídrica Diária</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Mais de 2L/dia', '1 a 2L/dia', 'Menos de 1L/dia'] as const).map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setData({ ...data, consumoAgua: opt })}
                          className={`p-2 rounded-lg border text-xs font-bold transition cursor-pointer ${
                            data.consumoAgua === opt
                              ? 'bg-cyan-500 text-black border-cyan-400 shadow-md'
                              : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tendência a Queloides */}
                  <div>
                    <label className="text-[11px] uppercase font-bold text-zinc-400 block mb-1">Tendência a Queloides / Cicatrizes Hipertróficas</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['Não', 'Sim (Cicatrizes hipertróficas / Quelóides)'] as const).map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setData({ ...data, tendenciaQueloide: opt })}
                          className={`p-2 rounded-lg border text-xs font-bold transition cursor-pointer ${
                            data.tendenciaQueloide === opt
                              ? 'bg-cyan-500 text-black border-cyan-400 shadow-md'
                              : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: Histórico Estético & Cirúrgico */}
            {activeStep === 6 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-3 bg-cyan-950/20 border border-cyan-500/30 rounded-xl text-xs text-zinc-300">
                  <strong className="text-cyan-400">Procedimentos Prévios & Cirurgias:</strong> Selecione os tratamentos já realizados e verifique alertas de preenchedores permanentes.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PRESET_PROCEDIMENTOS_CADASTRAIS.map((item) => {
                    const isSelected = data.procedimentosPrevios.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleArrayItem('procedimentosPrevios', item)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition flex items-start gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-sm'
                            : 'bg-zinc-900/70 border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800/60'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                          isSelected ? 'bg-cyan-500 border-cyan-400 text-black' : 'border-zinc-600'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="leading-snug">{item}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Preenchedor Definitivo Alerta */}
                <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl space-y-2">
                  <span className="text-[11px] uppercase font-bold text-amber-400 block">Possui Preenchedor Definitivo (PMMA ou Silicone Industrial)?</span>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Não', 'Sim (PMMA / Silicone industrial)'] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setData({ ...data, possuiPreenchedorDefinitivo: opt })}
                        className={`p-2 rounded-lg border text-xs font-bold transition cursor-pointer ${
                          data.possuiPreenchedorDefinitivo === opt
                            ? opt.startsWith('Sim')
                              ? 'bg-red-500 text-white border-red-400'
                              : 'bg-emerald-500 text-black border-emerald-400'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {data.possuiPreenchedorDefinitivo === 'Sim (PMMA / Silicone industrial)' && (
                    <input
                      type="text"
                      value={data.detalhesPreenchedorDefinitivo || ''}
                      onChange={(e) => setData({ ...data, detalhesPreenchedorDefinitivo: e.target.value })}
                      placeholder="Região do preenchimento definitivo (Ex: Glúteos, Malar, Labial)"
                      className="w-full bg-black/60 border border-red-500/60 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                    />
                  )}
                </div>

                <div>
                  <label className="text-[11px] uppercase font-bold text-zinc-400 block mb-1">Observações Clínicas Gerais</label>
                  <textarea
                    rows={2}
                    value={data.observacoesGerais}
                    onChange={(e) => setData({ ...data, observacoesGerais: e.target.value })}
                    placeholder="Outras observações relevantes sobre o histórico do paciente..."
                    className="w-full bg-black/60 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="px-4 py-3 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between shrink-0">
            <button
              disabled={activeStep === 1}
              onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold cursor-pointer"
            >
              Anterior
            </button>

            <span className="text-xs font-bold text-zinc-500">
              Etapa {activeStep} de 6
            </span>

            {activeStep < 6 ? (
              <button
                onClick={() => setActiveStep((prev) => Math.min(6, prev + 1))}
                className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold cursor-pointer"
              >
                Próxima Etapa
              </button>
            ) : (
              <button
                onClick={handleSaveAndApply}
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Salvar Prontuário</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Live A4 Document Preview */}
        <div className="w-full lg:w-1/2 flex flex-col bg-[#09090b] overflow-hidden">
          <div className="px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-zinc-200">Pré-visualização Oficial A4</span>
              <span className="text-[9.5px] font-mono text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">
                Tempo Real
              </span>
            </div>
          </div>

          <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-zinc-950 flex justify-center">
            <div
              className="w-full max-w-[210mm] bg-white text-black p-6 sm:p-8 rounded-lg shadow-2xl min-h-[297mm] h-fit"
              dangerouslySetInnerHTML={{ __html: generatedHtmlPreview }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
