import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Copy,
  RotateCcw,
  Check,
  Stethoscope,
  ShieldAlert,
  FileCheck,
  Trash2,
  Send,
  Inbox,
  Save,
  FileText,
  User,
  Heart,
  Activity,
  Layers,
  FileCheck2,
  X
} from 'lucide-react';
import { PatientFormState } from '../utils/procedureClinicalDocsHelper';

export interface InteractiveAnamneseData {
  // 1. Queixa e Objetivos
  queixaPrincipal: string;
  expectativaResultado: string;
  tempoQueixa: string;

  // 2. Classificação Dermatológica & Biótipo
  fototipo?: 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI';
  biotipo?: 'Lipídico (Oleoso)' | 'Alípico (Seco)' | 'Eudérmico (Normal)' | 'Misto';
  espessuraPele?: 'Fina' | 'Média' | 'Espessa';
  glogau?: 'Grau I (Leve)' | 'Grau II (Moderado)' | 'Grau III (Avançado)' | 'Grau IV (Severo)';
  grauFlacidez?: 'Ausente' | 'Leve' | 'Moderada' | 'Acentuada';

  // 3. Hábitos e Estilo de Vida
  tabagismo?: 'Não fuma' | 'Fumante leve' | 'Fumante diário';
  exposicaoSolar?: 'Baixa / Fotoprotegido' | 'Moderada' | 'Alta / Frequente' | 'Bronzeamento recente';
  consumoAgua?: 'Mais de 2L/dia' | '1 a 2L/dia' | 'Menos de 1L/dia';
  atividadeFisica?: 'Sedentário' | 'Moderada (2-3x/sem)' | 'Intensa diária';
  qualidadeSono?: 'Bom / Reparador' | 'Insônia / Interrompido' | 'Turnos Noturnos';

  // 4. Antecedentes e Alertas Clínicos (Multi-select)
  condicoesClinicas: string[];
  alergias: string[];
  medicamentosUso: string[];
  historicoHerpes?: 'Nunca teve' | 'Esporádico (Labial)' | 'Frequente (Necessita profilaxia)';
  cicatrizacao?: 'Normal' | 'Hipertrófica' | 'Tendência a Queloide' | 'Manchas pós-inflamatórias (HPI)';
  
  // 5. Histórico de Procedimentos Estéticos
  procedimentosPrevios: string[];
  tempoUltimoProcedimento: string;
  reacaoAdversaPrevia?: 'Nenhuma intercorrência prévia' | 'Edema prolongado' | 'Hematoma acentuado' | 'Alergia prévia';

  // 6. Conduta & Parâmetros do Procedimento
  areasTratamento: string[];
  produtoUtilizado: string;
  volumeDose: string;
  numeroSessoes: string;
  orientacoesEspecificas: string[];
  aptidao?: 'APTO_SEM_RESTRICOES' | 'APTO_COM_PROFILAXIA' | 'INAPTO_TEMPORARIAMENTE';
  motivoInaptidaoOuRestricao: string;

  // Observações livres adicionais
  observacoesLivres: string;
}

export const EMPTY_INTERACTIVE_ANAMNESE: InteractiveAnamneseData = {
  queixaPrincipal: '',
  expectativaResultado: '',
  tempoQueixa: '',

  fototipo: undefined,
  biotipo: undefined,
  espessuraPele: undefined,
  glogau: undefined,
  grauFlacidez: undefined,

  tabagismo: undefined,
  exposicaoSolar: undefined,
  consumoAgua: undefined,
  atividadeFisica: undefined,
  qualidadeSono: undefined,

  condicoesClinicas: [],
  alergias: [],
  medicamentosUso: [],
  historicoHerpes: undefined,
  cicatrizacao: undefined,

  procedimentosPrevios: [],
  tempoUltimoProcedimento: '',
  reacaoAdversaPrevia: undefined,

  areasTratamento: [],
  produtoUtilizado: '',
  volumeDose: '',
  numeroSessoes: '',
  orientacoesEspecificas: [],
  aptidao: undefined,
  motivoInaptidaoOuRestricao: '',
  observacoesLivres: ''
};

export const PRESET_CONDICOES = [
  'Nenhuma patologia crônica relatada',
  'Hipertensão Arterial controlada',
  'Diabetes Mellitus controlado',
  'Hipotireoidismo em tratamento',
  'Ansiedade / Depressão controlada',
  'Rinite / Asma alérgica',
  'Doença Autoimune (Lúpus/Psoríase)',
  'Cardiopatia / Arritmia',
  'Distúrbio de Coagulação / Trombose'
];

export const PRESET_ALERGIAS = [
  'Nega alergias medicamentosas',
  'Alergia a Dipirona / AINEs',
  'Alergia a Penicilina / Amoxicilina',
  'Alergia a Anestésicos Locais (Lidocaína)',
  'Alergia a Iodo / Frutos do Mar',
  'Alergia a Látex / Fitas Adesivas',
  'Alergia a Cosméticos / Ácidos Tópicos'
];

export const PRESET_MEDICAMENTOS = [
  'Nenhum medicamento contínuo',
  'Anticoagulantes / AAS / Varfarina',
  'Anti-hipertensivos diários',
  'Hipoglicemiantes / Insulina',
  'Levotiroxina (Tireoide)',
  'Anticoncepcional Oral / Injetável',
  'Corticoides contínuos',
  'Isotretinoína (Roacutan recente)',
  'Imunossupressores'
];

export const PRESET_PROCEDIMENTOS = [
  'Primeira vez que realiza este procedimento',
  'Toxina Botulínica anterior',
  'Preenchimento de Ácido Hialurônico anterior',
  'Bioestimuladores de Colágeno anteriores',
  'Fios de Sustentação PDO anteriores',
  'Peelings Químicos / Lasers prévios',
  'Microagulhamento anterior'
];

export const PRESET_AREAS = [
  'Terço Superior (Testa, Glabela, Pés de Galinha)',
  'Terço Médio (Malar, Olheiras, Nariz)',
  'Terço Inferior (Labial, Sulco Nasogeniano, Mento, Mandíbula)',
  'Pescoço e Colo',
  'Corporal / Glúteos',
  'Abdômen / Flancos',
  'Capilar / Couro Cabeludo'
];

export const PRESET_ORIENTACOES = [
  'Evitar massagens, pressões ou atrito no local nas primeiras 24h',
  'Não deitar ou abaixar a cabeça nas primeiras 4 horas',
  'Evitar exercícios físicos intensos e calor nas primeiras 48h',
  'Não aplicar maquiagem nas primeiras 12 a 24 horas',
  'Uso rigoroso de fotoprotetor FPS 50+ a cada 3 horas',
  'Compressas frias locais se houver leve edema ou desconforto',
  'Retorno agendado para reavaliação em 15 a 21 dias'
];

export const PRESET_QUEIXAS = [
  'Linhas de expressão na testa e glabela (Rugas dinâmicas)',
  'Pés de galinha na região periocular',
  'Bigode chinês e linhas de marionete acentuadas',
  'Perda de volume e contorno labial',
  'Flacidez facial e perda de sustentação no terço inferior',
  'Olheiras profundas e aspecto de cansaço',
  'Manchas, melasma e irregularidade no tom da pele',
  'Cicatrizes de acne e poros dilatados'
];

interface InteractiveAnamneseBuilderProps {
  procedureTitle: string;
  patient: PatientFormState;
  clinicName: string;
  clinicCnpj?: string;
  initialData?: InteractiveAnamneseData;
  onGenerateDoc: (generatedHtml: string, anamneseState: InteractiveAnamneseData) => void;
  onClose?: () => void;
}

export const InteractiveAnamneseBuilder: React.FC<InteractiveAnamneseBuilderProps> = ({
  procedureTitle,
  patient,
  clinicName,
  clinicCnpj = '',
  initialData,
  onGenerateDoc,
  onClose
}) => {
  const [data, setData] = useState<InteractiveAnamneseData>(() => initialData || EMPTY_INTERACTIVE_ANAMNESE);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [generatedHtmlPreview, setGeneratedHtmlPreview] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const toggleArrayItem = (field: keyof InteractiveAnamneseData, item: string) => {
    setData((prev) => {
      const currentList = (prev[field] as string[]) || [];
      if (currentList.includes(item)) {
        return {
          ...prev,
          [field]: currentList.filter((i) => i !== item)
        };
      } else {
        let filtered = currentList;
        if (item.startsWith('Nenhuma') || item.startsWith('Nega') || item.startsWith('Nenhum') || item.startsWith('Primeira')) {
          filtered = [];
        } else {
          filtered = currentList.filter((i) => !i.startsWith('Nenhuma') && !i.startsWith('Nega') && !i.startsWith('Nenhum') && !i.startsWith('Primeira'));
        }
        return {
          ...prev,
          [field]: [...filtered, item]
        };
      }
    });
  };

  const buildHtmlDoc = (s: InteractiveAnamneseData): string => {
    const aptidaoBadge = 
      s.aptidao === 'APTO_SEM_RESTRICOES'
        ? '<span style="background: #dcfce7; color: #166534; padding: 3px 8px; border-radius: 4px; font-weight: bold; border: 1px solid #86efac;">✔ APTO(A) SEM RESTRIÇÕES</span>'
        : s.aptidao === 'APTO_COM_PROFILAXIA'
        ? `<span style="background: #fef3c7; color: #92400e; padding: 3px 8px; border-radius: 4px; font-weight: bold; border: 1px solid #fde68a;">⚠ APTO(A) COM RESTRIÇÃO / PROFILAXIA ${s.motivoInaptidaoOuRestricao ? `(${s.motivoInaptidaoOuRestricao})` : ''}</span>`
        : s.aptidao === 'INAPTO_TEMPORARIAMENTE'
        ? `<span style="background: #fee2e2; color: #991b1b; padding: 3px 8px; border-radius: 4px; font-weight: bold; border: 1px solid #fca5a5;">✖ INAPTO(A) TEMPORARIAMENTE ${s.motivoInaptidaoOuRestricao ? `(${s.motivoInaptidaoOuRestricao})` : ''}</span>`
        : '<span style="color: #94a3b8; font-style: italic;">(Pendente de definição)</span>';

    const condicoesHtml = s.condicoesClinicas.length > 0
      ? `<ul style="margin: 3px 0 0 14px; padding: 0;">${s.condicoesClinicas.map((c) => `<li>${c}</li>`).join('')}</ul>`
      : '<span style="color: #64748b; font-style: italic;">(Nenhuma patologia crônica relatada)</span>';

    const alergiasHtml = s.alergias.length > 0
      ? `<ul style="margin: 3px 0 0 14px; padding: 0;">${s.alergias.map((a) => `<li style="color: #991b1b; font-weight: 600;">⚠ ${a}</li>`).join('')}</ul>`
      : '<span style="color: #166534; font-style: italic;">• Nega histórico de alergias conhecidas</span>';

    const medicamentosHtml = s.medicamentosUso.length > 0
      ? `<ul style="margin: 3px 0 0 14px; padding: 0;">${s.medicamentosUso.map((m) => `<li>${m}</li>`).join('')}</ul>`
      : '<span style="color: #64748b; font-style: italic;">(Nenhum medicamento contínuo relatado)</span>';

    const procedimentosHtml = s.procedimentosPrevios.length > 0
      ? `${s.procedimentosPrevios.join(', ')} ${s.tempoUltimoProcedimento ? `<em>(${s.tempoUltimoProcedimento})</em>` : ''}`
      : '<span style="color: #64748b; font-style: italic;">(Nenhum procedimento prévio relatado)</span>';

    const areasHtml = s.areasTratamento.length > 0
      ? s.areasTratamento.join(', ')
      : '<span style="color: #64748b; font-style: italic;">(A definir em planejamento)</span>';

    const orientacoesHtml = s.orientacoesEspecificas.length > 0
      ? `<ul style="margin: 2px 0 0 14px; padding: 0;">${s.orientacoesEspecificas.map((o) => `<li>${o}</li>`).join('')}</ul>`
      : '<span style="color: #64748b; font-style: italic;">(Orientações pós-procedimento padrão fornecidas)</span>';

    const habitosList: string[] = [];
    if (s.tabagismo) habitosList.push(`Tabagismo: <em>${s.tabagismo}</em>`);
    if (s.consumoAgua) habitosList.push(`Água: <em>${s.consumoAgua}</em>`);
    if (s.atividadeFisica) habitosList.push(`Ativ. Física: <em>${s.atividadeFisica}</em>`);
    if (s.qualidadeSono) habitosList.push(`Sono: <em>${s.qualidadeSono}</em>`);
    const habitosHtml = habitosList.length > 0
      ? habitosList.join(' &bull; ')
      : '<span style="color: #64748b; font-style: italic;">Não especificado</span>';

    return `
<div style="font-family: 'Segoe UI', Arial, sans-serif; color: #0f172a; line-height: 1.5; font-size: 11px;">
  <!-- Cabeçalho Oficial -->
  <div style="border-bottom: 2px solid #059669; padding-bottom: 8px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
      <h2 style="margin: 0; font-size: 15.5px; font-weight: 800; color: #047857; text-transform: uppercase; letter-spacing: 0.5px;">FICHA DE ANAMNESE & AVALIAÇÃO CLÍNICA</h2>
      <p style="margin: 2px 0 0 0; font-size: 10px; color: #475569;"><strong>${clinicName || 'Clínica Estética'}</strong> &bull; Procedimento: <strong>${procedureTitle}</strong></p>
    </div>
    <div style="text-align: right; font-size: 9.5px; color: #64748b;">
      <div><strong>Data da Avaliação:</strong> ${patient.data || new Date().toLocaleDateString('pt-BR')}</div>
      <div><strong>Avaliador(a):</strong> ${patient.profissionalResponsavel || 'Profissional Responsável'} (${patient.registroProfissional || 'CRBM/COREN/CRM'})</div>
    </div>
  </div>

  <!-- 1. Identificação Rápida -->
  <table style="width: 100%; border-collapse: collapse; font-size: 10px; margin-bottom: 8px;" border="1" bordercolor="#cbd5e1">
    <tr style="background: #f8fafc;">
      <td style="padding: 5px 8px; width: 60%;"><strong>Paciente:</strong> ${patient.nomeCliente || '__________________________________'}</td>
      <td style="padding: 5px 8px; width: 40%;"><strong>Data da Avaliação:</strong> ${patient.data || new Date().toLocaleDateString('pt-BR')}</td>
    </tr>
    <tr>
      <td style="padding: 5px 8px;"><strong>Contato / Telefone:</strong> ${patient.telefone || '(__) _____-____'}</td>
      <td style="padding: 5px 8px;"><strong>Nascimento:</strong> ${patient.dataNascimento || 'Registrado em Prontuário'}</td>
    </tr>
  </table>

  <!-- 2. Motivo da Consulta e Objetivos -->
  <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 6px 10px; margin-bottom: 8px; font-size: 10.5px;">
    <div style="margin-bottom: 3px;">
      <strong>🎯 Queixa Principal:</strong> ${s.queixaPrincipal || '<span style="color: #94a3b8; font-style: italic;">(Não informada)</span>'}
      ${s.tempoQueixa ? `<em> &bull; Início/Evolução: ${s.tempoQueixa}</em>` : ''}
    </div>
    ${s.expectativaResultado ? `<div><strong>✨ Expectativa de Resultado:</strong> ${s.expectativaResultado}</div>` : ''}
  </div>

  <!-- 3. Avaliação Dermatológica e Biótipo Facial/Corporal -->
  <h3 style="font-size: 11px; font-weight: bold; background: #f1f5f9; padding: 4px 8px; border-left: 3px solid #059669; margin: 8px 0 4px 0; text-transform: uppercase;">
    1. AVALIAÇÃO DERMATOLÓGICA & BIÓTIPO CUTÂNEO
  </h3>
  <table style="width: 100%; border-collapse: collapse; font-size: 10px; margin-bottom: 8px;" border="1" bordercolor="#e2e8f0">
    <tr>
      <td style="padding: 5px; width: 25%;"><strong>Fototipo (Fitzpatrick):</strong><br>${s.fototipo ? `Tipo ${s.fototipo}` : '<span style="color: #94a3b8; font-style: italic;">-</span>'}</td>
      <td style="padding: 5px; width: 25%;"><strong>Biótipo Cutâneo:</strong><br>${s.biotipo || '<span style="color: #94a3b8; font-style: italic;">-</span>'}</td>
      <td style="padding: 5px; width: 25%;"><strong>Espessura Cutânea:</strong><br>${s.espessuraPele || '<span style="color: #94a3b8; font-style: italic;">-</span>'}</td>
      <td style="padding: 5px; width: 25%;"><strong>Envelhecimento (Glogau):</strong><br>${s.glogau || '<span style="color: #94a3b8; font-style: italic;">-</span>'}</td>
    </tr>
    <tr>
      <td style="padding: 5px;"><strong>Grau de Flacidez:</strong><br>${s.grauFlacidez || '<span style="color: #94a3b8; font-style: italic;">-</span>'}</td>
      <td style="padding: 5px;"><strong>Cicatriz / Cicatrização:</strong><br>${s.cicatrizacao || '<span style="color: #94a3b8; font-style: italic;">-</span>'}</td>
      <td style="padding: 5px;"><strong>Herpes Labial/Facial:</strong><br>${s.historicoHerpes || '<span style="color: #94a3b8; font-style: italic;">-</span>'}</td>
      <td style="padding: 5px;"><strong>Exposição Solar:</strong><br>${s.exposicaoSolar || '<span style="color: #94a3b8; font-style: italic;">-</span>'}</td>
    </tr>
    <tr>
      <td style="padding: 5px;" colspan="4">
        <strong>Estilo de Vida:</strong> ${habitosHtml}
      </td>
    </tr>
  </table>

  <!-- 4. Antecedentes Clínicos, Alergias e Medicamentos -->
  <h3 style="font-size: 11px; font-weight: bold; background: #f1f5f9; padding: 4px 8px; border-left: 3px solid #059669; margin: 8px 0 4px 0; text-transform: uppercase;">
    2. ANTECEDENTES DE SAÚDE, ALERGIAS & MEDICAMENTOS
  </h3>
  <table style="width: 100%; border-collapse: collapse; font-size: 10px; margin-bottom: 8px;" border="1" bordercolor="#e2e8f0">
    <tr>
      <td style="padding: 5px; width: 33%; vertical-align: top;">
        <strong>Patologias / Condições:</strong>
        ${condicoesHtml}
      </td>
      <td style="padding: 5px; width: 33%; vertical-align: top;">
        <strong>Alergias Relatadas:</strong>
        ${alergiasHtml}
      </td>
      <td style="padding: 5px; width: 34%; vertical-align: top;">
        <strong>Medicamentos Contínuos:</strong>
        ${medicamentosHtml}
      </td>
    </tr>
  </table>

  <!-- 5. Histórico de Procedimentos Anteriores -->
  <div style="font-size: 10px; margin-bottom: 8px; background: #fafafa; border: 1px solid #e2e8f0; padding: 5px 8px; border-radius: 4px;">
    <strong>Procedimentos Estéticos Prévios:</strong> ${procedimentosHtml}
    ${s.reacaoAdversaPrevia ? `<br><strong style="color: #b45309;">Intercorrências / Reações Prévias:</strong> ${s.reacaoAdversaPrevia}` : ''}
  </div>

  <!-- 6. Conduta, Planejamento & Parâmetros Técnicos -->
  <h3 style="font-size: 11px; font-weight: bold; background: #f1f5f9; padding: 4px 8px; border-left: 3px solid #059669; margin: 8px 0 4px 0; text-transform: uppercase;">
    3. CONDUTA CLÍNICA & PARÂMETROS DO PROCEDIMENTO
  </h3>
  <table style="width: 100%; border-collapse: collapse; font-size: 10px; margin-bottom: 8px;" border="1" bordercolor="#e2e8f0">
    <tr>
      <td style="padding: 5px; width: 50%;"><strong>Áreas Selecionadas:</strong><br>${areasHtml}</td>
      <td style="padding: 5px; width: 50%;"><strong>Produto / Tecnologia:</strong><br>${s.produtoUtilizado || '<span style="color: #94a3b8; font-style: italic;">Conforme protocolo técnico</span>'}</td>
    </tr>
    <tr>
      <td style="padding: 5px;"><strong>Dose / Volume / Parâmetro:</strong><br>${s.volumeDose || '<span style="color: #94a3b8; font-style: italic;">Individualizado</span>'}</td>
      <td style="padding: 5px;"><strong>Plano / Sessões Previstas:</strong><br>${s.numeroSessoes || '<span style="color: #94a3b8; font-style: italic;">1 sessão inicial com reavaliação</span>'}</td>
    </tr>
    ${s.orientacoesEspecificas.length > 0 ? `
    <tr>
      <td style="padding: 5px;" colspan="2">
        <strong>Orientações Pós-Procedimento Específicas:</strong>
        ${orientacoesHtml}
      </td>
    </tr>
    ` : ''}
  </table>

  <!-- 7. Parecer de Aptidão Clínica -->
  <div style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 10px; margin-bottom: 8px; font-size: 10.5px;">
    <div><strong>Parecer de Aptidão para o Procedimento:</strong></div>
    <div>${aptidaoBadge}</div>
  </div>

  ${s.observacoesLivres ? `
  <div style="font-size: 9.5px; border: 1px solid #e2e8f0; padding: 4px 8px; border-radius: 4px; background: #ffffff; margin-bottom: 8px;">
    <strong>Observações Clínicas Complementares (OBS):</strong><br>
    ${s.observacoesLivres.replace(/\\n/g, '<br>')}
  </div>
  ` : ''}

  <!-- Assinaturas -->
  <div style="margin-top: 14px; display: flex; justify-content: space-between; gap: 20px; font-size: 9.5px; text-align: center;">
    <div style="flex: 1; border-top: 1px solid #64748b; padding-top: 4px;">
      <strong>${patient.nomeCliente || 'Assinatura do(a) Paciente'}</strong><br>
      Declaro que todas as informações prestadas são verdadeiras.
    </div>
    <div style="flex: 1; border-top: 1px solid #64748b; padding-top: 4px;">
      <strong>${patient.profissionalResponsavel || 'Profissional Responsável'}</strong><br>
      ${patient.registroProfissional || 'Registro Profissional'}
    </div>
  </div>
</div>
    `;
  };

  useEffect(() => {
    const html = buildHtmlDoc(data);
    setGeneratedHtmlPreview(html);
  }, [data, patient, clinicName, procedureTitle]);

  const handleApplyToDocument = () => {
    const html = buildHtmlDoc(data);
    onGenerateDoc(html, data);
  };

  const handleResetAll = () => {
    if (window.confirm('Deseja limpar todos os campos da anamnese e reiniciar do zero?')) {
      setData(EMPTY_INTERACTIVE_ANAMNESE);
    }
  };

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(generatedHtmlPreview);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0e0e11] text-zinc-200 overflow-hidden select-none">
      {/* Header */}
      <div className="px-4 py-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Ficha de Anamnese & Avaliação Clínica
              </span>
              <span className="text-[10px] font-semibold text-zinc-400 hidden sm:inline">
                Preenchimento Rápido com 1-Clique
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white font-serif mt-0.5 truncate max-w-md">
              {procedureTitle} &bull; {patient.nomeCliente || 'Paciente'}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetAll}
            className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer border border-zinc-700"
            title="Limpar seleções"
          >
            <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden lg:inline">Limpar</span>
          </button>

          <button
            type="button"
            onClick={handleApplyToDocument}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-950/40 transition active:scale-95 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Salvar na Anamnese</span>
          </button>

          {onClose && (
            <button
              type="button"
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
              { id: 1, label: '1. Queixa & Expectativa', icon: Sparkles },
              { id: 2, label: '2. Pele & Hábitos', icon: Activity },
              { id: 3, label: '3. Saúde & Alergias', icon: ShieldAlert },
              { id: 4, label: '4. Histórico Estético', icon: FileCheck2 },
              { id: 5, label: '5. Conduta & Aptidão', icon: Heart },
            ].map((step) => {
              const Icon = step.icon;
              const isActive = activeStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`} />
                  <span>{step.label}</span>
                </button>
              );
            })}
          </div>

          {/* Step Contents */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
            {/* STEP 1: Queixa e Expectativa */}
            {activeStep === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-xs text-zinc-300">
                  <strong className="text-emerald-400">Motivo da Consulta & Queixa:</strong> Clique nos botões para definir a queixa principal, o tempo de queixa e a expectativa do paciente.
                </div>

                <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Queixa Principal (Clique para selecionar)
                    </label>
                    {data.queixaPrincipal && (
                      <button
                        type="button"
                        onClick={() => setData({ ...data, queixaPrincipal: '' })}
                        className="text-[10px] text-zinc-400 hover:text-red-400 cursor-pointer flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Limpar
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_QUEIXAS.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => setData((p) => ({ ...p, queixaPrincipal: p.queixaPrincipal === q ? '' : q }))}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer border ${
                          data.queixaPrincipal === q
                            ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm font-bold'
                            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                  <div className="pt-1">
                    <input
                      type="text"
                      value={data.queixaPrincipal}
                      onChange={(e) => setData({ ...data, queixaPrincipal: e.target.value })}
                      placeholder="Ou digite a queixa principal personalizada..."
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3.5 space-y-2">
                    <label className="block text-xs font-bold text-zinc-300">
                      Expectativa de Resultado
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'Resultado natural, suave e proporcional',
                        'Atenuação evidente das linhas estáticas',
                        'Volumização expressiva e definição marcante',
                        'Melhora gradual da firmeza e textura'
                      ].map((exp) => (
                        <button
                          key={exp}
                          type="button"
                          onClick={() => setData({ ...data, expectativaResultado: data.expectativaResultado === exp ? '' : exp })}
                          className={`px-2 py-1 rounded text-[11px] border cursor-pointer ${
                            data.expectativaResultado === exp
                              ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
                              : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                          }`}
                        >
                          {exp}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={data.expectativaResultado}
                      onChange={(e) => setData({ ...data, expectativaResultado: e.target.value })}
                      placeholder="Ou digite a expectativa..."
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                    />
                  </div>

                  <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3.5 space-y-2">
                    <label className="block text-xs font-bold text-zinc-300">
                      Tempo de Queixa / Início
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {['Menos de 3 meses', '3 a 6 meses', '6 a 12 meses', 'Mais de 1 ano', 'Mais de 3 anos'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setData({ ...data, tempoQueixa: data.tempoQueixa === t ? '' : t })}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold border cursor-pointer ${
                            data.tempoQueixa === t
                              ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
                              : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={data.tempoQueixa}
                      onChange={(e) => setData({ ...data, tempoQueixa: e.target.value })}
                      placeholder="Ou digite o tempo..."
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Pele, Fototipo e Hábitos */}
            {activeStep === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-xs text-zinc-300">
                  <strong className="text-emerald-400">Classificação Cutânea & Estilo de Vida:</strong> Selecione os parâmetros do biótipo e hábitos que influenciam a cicatrização e resposta tecidual.
                </div>

                {/* Fototipo de Fitzpatrick */}
                <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Fototipo (Escala de Fitzpatrick)
                    </label>
                    {data.fototipo && (
                      <button
                        type="button"
                        onClick={() => setData({ ...data, fototipo: undefined })}
                        className="text-[10px] text-zinc-400 hover:text-red-400 cursor-pointer"
                      >
                        Desmarcar
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { type: 'I', desc: 'Muito clara (Sempre queima, nunca bronzeia)' },
                      { type: 'II', desc: 'Clara (Queima fácil, bronzeia pouco)' },
                      { type: 'III', desc: 'Morena Clara (Queima e bronzeia mod.)' },
                      { type: 'IV', desc: 'Morena Média (Bronzeia fácil)' },
                      { type: 'V', desc: 'Morena Escura (Muito resistente)' },
                      { type: 'VI', desc: 'Negra (Altamente pigmentada)' },
                    ].map((f) => {
                      const isSelected = data.fototipo === f.type;
                      return (
                        <button
                          key={f.type}
                          type="button"
                          onClick={() => setData({ ...data, fototipo: isSelected ? undefined : (f.type as any) })}
                          className={`p-2 rounded-lg border text-left text-xs transition cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-600 text-white border-emerald-400 shadow-md font-bold'
                              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
                          }`}
                        >
                          <div className="font-bold text-xs">Tipo {f.type}</div>
                          <div className="text-[10px] opacity-80 leading-tight mt-0.5">{f.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Biótipo, Espessura e Glogau */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3.5 space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300 block">Biótipo Cutâneo</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {(['Lipídico (Oleoso)', 'Alípico (Seco)', 'Eudérmico (Normal)', 'Misto'] as const).map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setData({ ...data, biotipo: data.biotipo === b ? undefined : b })}
                          className={`p-2 rounded-lg border text-xs font-semibold transition cursor-pointer text-center ${
                            data.biotipo === b ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3.5 space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300 block">Espessura da Pele</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['Fina', 'Média', 'Espessa'] as const).map((e) => (
                        <button
                          key={e}
                          type="button"
                          onClick={() => setData({ ...data, espessuraPele: data.espessuraPele === e ? undefined : e })}
                          className={`p-2 rounded-lg border text-xs font-semibold transition cursor-pointer text-center ${
                            data.espessuraPele === e ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                          }`}
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hábitos de Vida Rápidos */}
                <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3.5 space-y-2.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                    Hábitos de Vida & Fotoproteção
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-zinc-400 text-[11px] font-semibold block mb-1">Tabagismo:</span>
                      <div className="flex flex-wrap gap-1">
                        {(['Não fuma', 'Fumante leve', 'Fumante diário'] as const).map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setData({ ...data, tabagismo: data.tabagismo === opt ? undefined : opt })}
                            className={`px-2 py-1 rounded text-[11px] border cursor-pointer ${
                              data.tabagismo === opt ? 'bg-emerald-600 text-white border-emerald-500 font-bold' : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-zinc-400 text-[11px] font-semibold block mb-1">Exposição Solar / Fotoproteção:</span>
                      <div className="flex flex-wrap gap-1">
                        {(['Baixa / Fotoprotegido', 'Moderada', 'Alta / Frequente', 'Bronzeamento recente'] as const).map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setData({ ...data, exposicaoSolar: data.exposicaoSolar === opt ? undefined : opt })}
                            className={`px-2 py-1 rounded text-[11px] border cursor-pointer ${
                              data.exposicaoSolar === opt ? 'bg-emerald-600 text-white border-emerald-500 font-bold' : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Saúde, Patologias e Alergias */}
            {activeStep === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-xs text-zinc-300">
                  <strong className="text-emerald-400">Antecedentes Clínicos & Alertas de Segurança:</strong> Marque patologias crônicas, alergias a fármacos e medicamentos contínuos.
                </div>

                {/* Alergias */}
                <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Alergias & Hipersensibilidades</span>
                    </label>
                    <span className="text-[10px] text-zinc-400">{data.alergias.length} selecionada(s)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {PRESET_ALERGIAS.map((a) => {
                      const isSelected = data.alergias.includes(a);
                      return (
                        <button
                          key={a}
                          type="button"
                          onClick={() => toggleArrayItem('alergias', a)}
                          className={`p-2 rounded-lg border text-left text-xs font-semibold transition flex items-center gap-2 cursor-pointer ${
                            isSelected
                              ? 'bg-red-500/20 border-red-400 text-red-200'
                              : 'bg-zinc-800/80 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 border ${isSelected ? 'bg-red-500 border-red-400 text-white' : 'border-zinc-500'}`}>
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          <span className="truncate">{a}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Condições Clínicas */}
                <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" />
                      <span>Condições Clínicas & Doenças Crônicas</span>
                    </label>
                    <span className="text-[10px] text-zinc-400">{data.condicoesClinicas.length} selecionada(s)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {PRESET_CONDICOES.map((c) => {
                      const isSelected = data.condicoesClinicas.includes(c);
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => toggleArrayItem('condicoesClinicas', c)}
                          className={`p-2 rounded-lg border text-left text-xs font-semibold transition flex items-center gap-2 cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                              : 'bg-zinc-800/80 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 border ${isSelected ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-zinc-500'}`}>
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          <span className="truncate">{c}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Medicamentos */}
                <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5" />
                      <span>Medicamentos em Uso Contínuo</span>
                    </label>
                    <span className="text-[10px] text-zinc-400">{data.medicamentosUso.length} selecionado(s)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {PRESET_MEDICAMENTOS.map((m) => {
                      const isSelected = data.medicamentosUso.includes(m);
                      return (
                        <button
                          key={m}
                          type="button"
                          onClick={() => toggleArrayItem('medicamentosUso', m)}
                          className={`p-2 rounded-lg border text-left text-xs font-semibold transition flex items-center gap-2 cursor-pointer ${
                            isSelected
                              ? 'bg-purple-500/20 border-purple-400 text-purple-200'
                              : 'bg-zinc-800/80 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 border ${isSelected ? 'bg-purple-500 border-purple-400 text-white' : 'border-zinc-500'}`}>
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          <span className="truncate">{m}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Histórico de Procedimentos Estéticos */}
            {activeStep === 4 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-xs text-zinc-300">
                  <strong className="text-emerald-400">Histórico Estético Anterior:</strong> Identifique se o paciente já realizou tratamentos na mesma área e se houve reações adversas.
                </div>

                <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3.5 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                    Procedimentos Anteriores
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {PRESET_PROCEDIMENTOS.map((p) => {
                      const isSelected = data.procedimentosPrevios.includes(p);
                      return (
                        <button
                          key={p}
                          type="button"
                          onClick={() => toggleArrayItem('procedimentosPrevios', p)}
                          className={`p-2.5 rounded-lg border text-left text-xs font-semibold transition flex items-center gap-2 cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                              : 'bg-zinc-800/80 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 border ${isSelected ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-zinc-500'}`}>
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          <span className="leading-tight">{p}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2">
                    <label className="text-[11px] text-zinc-400 font-semibold block mb-1">
                      Tempo desde a última intervenção:
                    </label>
                    <input
                      type="text"
                      value={data.tempoUltimoProcedimento}
                      onChange={(e) => setData({ ...data, tempoUltimoProcedimento: e.target.value })}
                      placeholder="Ex: Há 6 meses (Toxina), Há 1 ano (Ácido Hialurônico)"
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3.5 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                    Intercorrências ou Reações Adversas Prévias
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {([
                      'Nenhuma intercorrência prévia',
                      'Edema prolongado',
                      'Hematoma acentuado',
                      'Alergia prévia'
                    ] as const).map((reac) => (
                      <button
                        key={reac}
                        type="button"
                        onClick={() => setData({ ...data, reacaoAdversaPrevia: data.reacaoAdversaPrevia === reac ? undefined : reac })}
                        className={`p-2 rounded-lg border text-xs font-semibold transition cursor-pointer text-left ${
                          data.reacaoAdversaPrevia === reac
                            ? 'bg-amber-600 text-white border-amber-400'
                            : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                        }`}
                      >
                        {reac}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Conduta, Áreas e Aptidão Clínica */}
            {activeStep === 5 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-xs text-zinc-300">
                  <strong className="text-emerald-400">Plano de Tratamento & Parecer de Aptidão:</strong> Defina as áreas, dosagens, orientações pós e o parecer de liberação do paciente.
                </div>

                {/* Áreas de Tratamento */}
                <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Regiões Anatômicas / Áreas de Aplicação
                    </label>
                    <span className="text-[10px] text-zinc-400">{data.areasTratamento.length} selecionada(s)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {PRESET_AREAS.map((ar) => {
                      const isSelected = data.areasTratamento.includes(ar);
                      return (
                        <button
                          key={ar}
                          type="button"
                          onClick={() => toggleArrayItem('areasTratamento', ar)}
                          className={`p-2 rounded-lg border text-left text-xs font-semibold transition flex items-center gap-2 cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                              : 'bg-zinc-800/80 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 border ${isSelected ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-zinc-500'}`}>
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          <span className="leading-tight">{ar}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Parâmetros do Procedimento */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3 space-y-1">
                    <label className="text-[11px] font-bold text-zinc-300 block">Produto / Tecnologia</label>
                    <input
                      type="text"
                      value={data.produtoUtilizado}
                      onChange={(e) => setData({ ...data, produtoUtilizado: e.target.value })}
                      placeholder="Ex: Dysport / Juvederm"
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                    />
                  </div>

                  <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3 space-y-1">
                    <label className="text-[11px] font-bold text-zinc-300 block">Dose / Volume</label>
                    <input
                      type="text"
                      value={data.volumeDose}
                      onChange={(e) => setData({ ...data, volumeDose: e.target.value })}
                      placeholder="Ex: 50 UI / 1.0 ml"
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                    />
                  </div>

                  <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3 space-y-1">
                    <label className="text-[11px] font-bold text-zinc-300 block">Sessões Previstas</label>
                    <input
                      type="text"
                      value={data.numeroSessoes}
                      onChange={(e) => setData({ ...data, numeroSessoes: e.target.value })}
                      placeholder="Ex: 1 sessão + retorno 15d"
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                {/* Parecer de Aptidão Clínica */}
                <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3.5 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                    Parecer de Aptidão Clínica
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setData({ ...data, aptidao: data.aptidao === 'APTO_SEM_RESTRICOES' ? undefined : 'APTO_SEM_RESTRICOES' })}
                      className={`p-2.5 rounded-xl border text-left flex items-start gap-2 transition cursor-pointer ${
                        data.aptidao === 'APTO_SEM_RESTRICOES'
                          ? 'bg-emerald-600 text-white border-emerald-400 shadow-md font-bold'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-200 mt-0.5" />
                      <div>
                        <div className="font-bold text-xs">APTO(A)</div>
                        <div className="text-[10px] opacity-80">Sem restrições</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setData({ ...data, aptidao: data.aptidao === 'APTO_COM_PROFILAXIA' ? undefined : 'APTO_COM_PROFILAXIA' })}
                      className={`p-2.5 rounded-xl border text-left flex items-start gap-2 transition cursor-pointer ${
                        data.aptidao === 'APTO_COM_PROFILAXIA'
                          ? 'bg-amber-600 text-white border-amber-400 shadow-md font-bold'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
                      }`}
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 text-amber-200 mt-0.5" />
                      <div>
                        <div className="font-bold text-xs">COM RESTRIÇÃO</div>
                        <div className="text-[10px] opacity-80">Requer profilaxia</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setData({ ...data, aptidao: data.aptidao === 'INAPTO_TEMPORARIAMENTE' ? undefined : 'INAPTO_TEMPORARIAMENTE' })}
                      className={`p-2.5 rounded-xl border text-left flex items-start gap-2 transition cursor-pointer ${
                        data.aptidao === 'INAPTO_TEMPORARIAMENTE'
                          ? 'bg-red-600 text-white border-red-400 shadow-md font-bold'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
                      }`}
                    >
                      <ShieldAlert className="w-4 h-4 shrink-0 text-red-200 mt-0.5" />
                      <div>
                        <div className="font-bold text-xs">INAPTO(A)</div>
                        <div className="text-[10px] opacity-80">Contraindicação</div>
                      </div>
                    </button>
                  </div>

                  {data.aptidao && data.aptidao !== 'APTO_SEM_RESTRICOES' && (
                    <div className="mt-2">
                      <label className="block text-[11px] text-amber-300 font-semibold mb-1">
                        Motivo da restrição / profilaxia recomendada:
                      </label>
                      <input
                        type="text"
                        value={data.motivoInaptidaoOuRestricao}
                        onChange={(e) => setData({ ...data, motivoInaptidaoOuRestricao: e.target.value })}
                        placeholder="Ex: Profilaxia antiviral (Aciclovir) devido a herpes labial recorrente..."
                        className="w-full bg-zinc-950 border border-amber-500/50 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                      />
                    </div>
                  )}
                </div>

                {/* Observações Gerais */}
                <div>
                  <label className="text-[11px] uppercase font-bold text-zinc-400 block mb-1">
                    Observações Clínicas Complementares (OBS)
                  </label>
                  <textarea
                    rows={2}
                    value={data.observacoesLivres}
                    onChange={(e) => setData({ ...data, observacoesLivres: e.target.value })}
                    placeholder="Outras observações específicas sobre a avaliação do paciente..."
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
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
              Etapa {activeStep} de 5
            </span>

            {activeStep < 5 ? (
              <button
                onClick={() => setActiveStep((prev) => Math.min(5, prev + 1))}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
              >
                Próxima Etapa
              </button>
            ) : (
              <button
                onClick={handleApplyToDocument}
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Salvar na Anamnese</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Live A4 Document Preview */}
        <div className="w-full lg:w-1/2 flex flex-col bg-[#09090b] overflow-hidden">
          <div className="px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
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
