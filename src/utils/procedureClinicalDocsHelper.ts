import { DocumentItem, ClinicData } from '../types';
import { replaceClinicVariables } from './a4Formatter';
import { PROCEDURE_POP_REGISTRY, ProcedurePopData } from './procedurePopDatabase';
import { getProcedurePrescriptionProfile } from '../data/procedureScientificPrescriptions';

export type ClinicalDocType =
  | 'ficha_paciente'
  | 'pop_procedimento'
  | 'anamnese'
  | 'tcle'
  | 'termo_imagem'
  | 'pos_procedimento'
  | string;

export interface ClinicalDocDefinition {
  type: ClinicalDocType;
  label: string;
  shortLabel: string;
  iconName: string;
  color: string;
  badgeBg: string;
  description: string;
  enabled?: boolean;
  isCustom?: boolean;
  defaultTemplate?: string;
}

export const DEFAULT_CLINICAL_DOC_TYPES: ClinicalDocDefinition[] = [
  {
    type: 'ficha_paciente',
    label: 'Ficha do Paciente',
    shortLabel: 'Ficha Paciente',
    iconName: 'UserCheck',
    color: '#06b6d4',
    badgeBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
    description: 'Cadastro geral, prontuário clínico e histórico de saúde completo',
    enabled: true,
  },
  {
    type: 'pop_procedimento',
    label: 'POP do Procedimento (ANVISA / Vigilância)',
    shortLabel: 'POP Vigilância',
    iconName: 'ShieldCheck',
    color: '#2563eb',
    badgeBg: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    description: 'Procedimento Operacional Padrão passo a passo completo oficial com biossegurança, materiais, EPIs e descarte para fiscalização da Vigilância Sanitária',
    enabled: true,
  },
  {
    type: 'anamnese',
    label: 'Ficha de Anamnese',
    shortLabel: 'Anamnese',
    iconName: 'Stethoscope',
    color: '#10b981',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    description: 'Avaliação clínica dermatofuncional, histórico e contraindicações',
    enabled: true,
  },
  {
    type: 'tcle',
    label: 'TCLE do Procedimento',
    shortLabel: 'TCLE',
    iconName: 'FileCheck2',
    color: '#f59e0b',
    badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    description: 'Termo de Consentimento Livre e Esclarecido com blindagem jurídica',
    enabled: true,
  },
  {
    type: 'termo_imagem',
    label: 'Termo de Uso de Imagem (LGPD)',
    shortLabel: 'Uso de Imagem',
    iconName: 'Camera',
    color: '#8b5cf6',
    badgeBg: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    description: 'Autorização fotográfica antes/depois e conformidade com a LGPD',
    enabled: true,
  },
  {
    type: 'pos_procedimento',
    label: 'Instruções Pós-Procedimento',
    shortLabel: 'Pós-Procedimento',
    iconName: 'ShieldAlert',
    color: '#3b82f6',
    badgeBg: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    description: 'Guia de cuidados domiciliares, restrições e sinais de alerta',
    enabled: true,
  },
  {
    type: 'prescricao',
    label: 'Prescrição & Fórmulas Baseadas em Evidências',
    shortLabel: 'Prescrição',
    iconName: 'Pill',
    color: '#ec4899',
    badgeBg: 'bg-pink-500/10 border-pink-500/30 text-pink-400',
    description: 'Prescrição magistral, nutracêuticos e home care com embasamento científico editável em tempo real',
    enabled: true,
  },
];

export const CLINICAL_DOC_TYPES = DEFAULT_CLINICAL_DOC_TYPES;

export interface PatientFormState {
  nomeCliente: string;
  cpfCliente?: string;
  dataNascimento: string;
  telefone: string;
  email: string;
  endereco: string;
  profissao: string;
  data: string;
  profissionalResponsavel: string;
  registroProfissional: string;
}

export const getInitialPatientState = (clinicData?: ClinicData): PatientFormState => {
  const today = new Date().toISOString().split('T')[0];
  const formattedToday = today.split('-').reverse().join('/');
  return {
    nomeCliente: 'Nome Completo do(a) Paciente',
    cpfCliente: '',
    dataNascimento: '',
    telefone: '(11) 99999-9999',
    email: '',
    endereco: '',
    profissao: '',
    data: formattedToday,
    profissionalResponsavel: clinicData?.responsavel || clinicData?.responsavelTecnico || 'Dr(a). Responsável Técnico',
    registroProfissional: clinicData?.registroConselho || 'Conselho Regional nº 00000',
  };
};

/**
 * Detects procedure category & specifics from card title / content
 */
export const identifyProcedureContext = (doc: DocumentItem): string => {
  const docId = (doc.id || '').toLowerCase();
  const title = (doc.title || '').toLowerCase();
  const content = (doc.content || '').toLowerCase();
  const fullText = `${title} ${content}`;

  // 1. Direct ID matching (high precision)
  if (docId === 'pop-fios-pdo' || docId.includes('fios-pdo') || docId.includes('fios_pdo')) return 'fios_pdo';
  if (docId === 'pop-biorremodeladores-pdrn-bap' || docId.includes('biorremodeladores') || docId.includes('biorreguladores') || docId.includes('pdrn')) return 'biorreguladores';
  if (docId === 'pop-skinbooster' || docId.includes('skinbooster')) return 'skinbooster';
  if (docId === 'pop-lavieen-1927nm' || docId.includes('lavieen') || docId.includes('thulium')) return 'laser_lavieen';
  if (docId === 'pop-co2-fracionado' || docId.includes('co2')) return 'laser_co2';
  if (docId === 'pop-ultrassom-hifu' || docId.includes('hifu') || docId.includes('ultraformer') || docId.includes('liftera')) return 'ultrassom_hifu';
  if (docId === 'pop-endolaser-1470nm' || docId.includes('endolaser') || docId.includes('endolifting')) return 'endolaser';
  if (docId === 'pop-toxina-botulinica' || docId.includes('toxina') || docId.includes('botox')) return 'toxina_botulinica';
  if (docId === 'pop-preenchimento-acido-hialuronico' || docId.includes('preenchimento')) return 'preenchimento_ah';
  if (docId === 'pop-bioestimuladores-facial' || docId.includes('bioestimulador')) return 'bioestimulador';
  if (docId.includes('peeling')) return 'peeling';
  if (docId.includes('microagulhamento') || docId.includes('ipca')) return 'microagulhamento';
  if (docId.includes('limpeza-pele') || docId.includes('limpeza_pele')) return 'limpeza_pele';
  if (docId.includes('lipoenzimatica') || docId.includes('enzimas')) return 'lipoenzimatica';
  if (docId.includes('criolipolise')) return 'criolipolise';
  if (docId.includes('gluteo')) return 'gluteos';
  if (docId.includes('peim') || docId.includes('escleroterapia')) return 'peim';
  if (docId.includes('tricologia') || docId.includes('capilar')) return 'tricologia';
  if (docId.includes('soroterapia') || docId.includes('drip')) return 'soroterapia';
  if (docId.includes('drenagem') || docId.includes('massagem')) return 'drenagem_massagem';

  // 2. Specific Title / Content matching (Priority ordered so specific terms aren't caught by broad ones)
  // Fios de Sustentação / PDO
  if (
    title.includes('fio') ||
    title.includes('fios') ||
    title.includes('pdo') ||
    title.includes('polidioxanona') ||
    title.includes('espiculado') ||
    title.includes('sustentação') ||
    title.includes('tração/lifting') ||
    (fullText.includes('fios') && (fullText.includes('pdo') || fullText.includes('espiculado') || fullText.includes('sustentação')))
  ) {
    return 'fios_pdo';
  }

  // Biorreguladores / Biorremodeladores / PDRN / BAP / Profhilo
  if (
    title.includes('biorregulador') ||
    title.includes('biorremodelador') ||
    title.includes('pdrn') ||
    title.includes('profhilo') ||
    title.includes('polinucleotídeo') ||
    title.includes('bap') ||
    (fullText.includes('biorremodelador') && fullText.includes('bap')) ||
    (fullText.includes('pdrn') && fullText.includes('bap'))
  ) {
    return 'biorreguladores';
  }

  // Skinbooster / Hidratação Dérmica Injetável
  if (
    title.includes('skinbooster') ||
    title.includes('skin booster') ||
    title.includes('hidratação dérmica profunda') ||
    title.includes('intradermoterapia: skinbooster')
  ) {
    return 'skinbooster';
  }

  // Laser Lavieen / Thulium 1927nm
  if (
    title.includes('lavieen') ||
    title.includes('thulium') ||
    title.includes('1927nm') ||
    fullText.includes('lavieen') ||
    fullText.includes('thulium 1927nm')
  ) {
    return 'laser_lavieen';
  }

  // Laser CO2 Fracionado 10600nm
  if (
    title.includes('co2') ||
    title.includes('10600nm') ||
    title.includes('resurfacing ablativo') ||
    (fullText.includes('co2') && fullText.includes('10600nm'))
  ) {
    return 'laser_co2';
  }

  // Ultrassom Micro/Macrofocado (HIFU) / Ultraformer / Liftera
  if (
    title.includes('hifu') ||
    title.includes('ultrassom micro') ||
    title.includes('ultraformer') ||
    title.includes('liftera') ||
    title.includes('macrofocado') ||
    (fullText.includes('hifu') && fullText.includes('smas'))
  ) {
    return 'ultrassom_hifu';
  }

  // Endolaser / Endolifting 1470nm
  if (
    title.includes('endolaser') ||
    title.includes('endolifting') ||
    title.includes('1470nm') ||
    title.includes('microfibra óptica') ||
    (fullText.includes('endolaser') && fullText.includes('1470nm'))
  ) {
    return 'endolaser';
  }

  // Toxina Botulínica
  if (
    title.includes('toxina') ||
    title.includes('botulínica') ||
    title.includes('botox') ||
    title.includes('dysport') ||
    title.includes('xeomin') ||
    fullText.includes('toxina botulínica') ||
    fullText.includes('botox')
  ) {
    return 'toxina_botulinica';
  }

  // Bioestimuladores de Colágeno (PLLA, CaHA, PCL, Sculptra, Radiesse, Elleva, etc.)
  if (
    title.includes('bioestimulador') ||
    title.includes('sculptra') ||
    title.includes('radiesse') ||
    title.includes('elleva') ||
    title.includes('hidroxiapatita') ||
    title.includes('ácido poli-l-lático') ||
    title.includes('plla') ||
    title.includes('caha') ||
    title.includes('policaprolactona') ||
    title.includes('pcl') ||
    (fullText.includes('bioestimulador') && !fullText.includes('preenchimento labial'))
  ) {
    return 'bioestimulador';
  }

  // Preenchimento com Ácido Hialurônico Reticulado
  if (
    title.includes('preenchimento') ||
    title.includes('reticulado') ||
    title.includes('volumização') ||
    title.includes('rinomodelação') ||
    title.includes('escultura labial') ||
    title.includes('ácido hialurônico reticulado') ||
    (fullText.includes('preenchimento') && (fullText.includes('hialurônico') || fullText.includes('labial') || fullText.includes('malar') || fullText.includes('mandíbula') || fullText.includes('olheiras')))
  ) {
    return 'preenchimento_ah';
  }

  // Peeling Químico
  if (
    title.includes('peeling') ||
    title.includes('retinóico') ||
    title.includes('glicólico') ||
    title.includes('mandélico') ||
    title.includes('salicílico') ||
    title.includes('fenol') ||
    fullText.includes('peeling químico')
  ) {
    return 'peeling';
  }

  // Microagulhamento / IPCA
  if (
    title.includes('microagulhamento') ||
    title.includes('ipca') ||
    title.includes('dermaroller') ||
    fullText.includes('microagulhamento')
  ) {
    return 'microagulhamento';
  }

  // Limpeza de Pele
  if (
    title.includes('limpeza de pele') ||
    title.includes('extração') ||
    title.includes('comedões') ||
    fullText.includes('limpeza de pele')
  ) {
    return 'limpeza_pele';
  }

  // Lipoenzimática / Enzimas
  if (
    title.includes('lipoenzimática') ||
    title.includes('enzimas') ||
    title.includes('papada') ||
    title.includes('desoxicolato') ||
    title.includes('gordura localizada')
  ) {
    return 'lipoenzimatica';
  }

  // Criolipólise
  if (
    title.includes('criolipólise') ||
    title.includes('resfriamento') ||
    title.includes('membrana anticongelante')
  ) {
    return 'criolipolise';
  }

  // Harmonização Glútea
  if (
    title.includes('glúteo') ||
    title.includes('harmonização glútea') ||
    title.includes('glúteomax')
  ) {
    return 'gluteos';
  }

  // PEIM / Escleroterapia
  if (
    title.includes('peim') ||
    title.includes('escleroterapia') ||
    title.includes('microvasos') ||
    title.includes('secagem de vasinhos')
  ) {
    return 'peim';
  }

  // Drenagem Linfática / Massagem
  if (
    title.includes('drenagem') ||
    title.includes('massagem') ||
    title.includes('pós-operatório')
  ) {
    return 'drenagem_massagem';
  }

  // Tricologia / Capilar
  if (
    title.includes('tricologia') ||
    title.includes('capilar') ||
    title.includes('queda de cabelo') ||
    title.includes('alopecia')
  ) {
    return 'tricologia';
  }

  // Soroterapia / Drip
  if (
    title.includes('soroterapia') ||
    title.includes('endovenosa') ||
    title.includes('drip')
  ) {
    return 'soroterapia';
  }

  // Outras tecnologias e lasers gerais
  if (
    title.includes('laser') ||
    title.includes('luz intensa pulsada') ||
    title.includes('lip') ||
    title.includes('depilação a laser') ||
    fullText.includes('luz intensa pulsada')
  ) {
    return 'laser_tecnologias';
  }

  return 'geral';
};

/**
 * Generate formatted HTML content for any of the 5 clinical documents
 */
export const generateClinicalDocContent = (
  docType: ClinicalDocType,
  doc: DocumentItem,
  clinicData: ClinicData,
  patient: PatientFormState
): string => {
  const procKey = identifyProcedureContext(doc);
  const cleanDocTitle = doc.title.replace(/^POP\s*[-–—]\s*/i, '').replace(/\(.*\)$/, '').trim();

  // 1. FICHA DO PACIENTE (PRONTUÁRIO COMPLETO)
  if (docType === 'ficha_paciente') {
    return `
<div style="font-family: 'Segoe UI', Arial, sans-serif; color: #0f172a; line-height: 1.5; font-size: 11px;">
  <div style="border-bottom: 2px solid #047857; padding-bottom: 8px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
      <h2 style="margin: 0; font-size: 16px; font-weight: 800; color: #047857; text-transform: uppercase; letter-spacing: 0.5px;">PRONTUÁRIO CLÍNICO & FICHA CADASTRAL DO PACIENTE</h2>
      <p style="margin: 2px 0 0 0; font-size: 10px; color: #475569;"><strong>${clinicData.nomeClinica || '{{nome_clinica}}'}</strong> &bull; RT: ${clinicData.responsavel || clinicData.responsavelTecnico || '{{responsavel_tecnico}}'}</p>
    </div>
    <div style="text-align: right; font-size: 9.5px; color: #64748b;">
      <div><strong>Data de Abertura:</strong> ${patient.data}</div>
      <div><strong>Código Prontuário:</strong> PRON-${Math.floor(1000 + Math.random() * 9000)}</div>
    </div>
  </div>

  <h3 style="font-size: 11.5px; font-weight: bold; background: #f1f5f9; padding: 4px 8px; border-left: 3px solid #047857; margin: 10px 0 6px 0; text-transform: uppercase;">1. DADOS DE IDENTIFICAÇÃO PESSOAL</h3>
  <table style="width: 100%; border-collapse: collapse; font-size: 10.5px; margin-bottom: 10px;" border="1" bordercolor="#e2e8f0">
    <tr>
      <td style="padding: 6px; width: 60%;"><strong>Nome Completo:</strong> ${patient.nomeCliente}</td>
      <td style="padding: 6px; width: 40%;"><strong>Data de Nascimento:</strong> ${patient.dataNascimento || '____/____/________'}</td>
    </tr>
    <tr>
      <td style="padding: 6px;"><strong>Idade:</strong> _____ anos | <strong>Profissão:</strong> ${patient.profissao || '________________________'}</td>
      <td style="padding: 6px;"><strong>Telefone / Contato:</strong> ${patient.telefone}</td>
    </tr>
    <tr>
      <td style="padding: 6px;" colspan="2"><strong>E-mail:</strong> ${patient.email || '________________________'} | <strong>Endereço Residencial:</strong> ${patient.endereco || '________________________________________________________'}</td>
    </tr>
  </table>

  <h3 style="font-size: 11.5px; font-weight: bold; background: #f1f5f9; padding: 4px 8px; border-left: 3px solid #047857; margin: 10px 0 6px 0; text-transform: uppercase;">2. ANTECEDENTES CLÍNICOS E HÁBITOS DE VIDA</h3>
  <table style="width: 100%; border-collapse: collapse; font-size: 10px; margin-bottom: 10px;" border="1" bordercolor="#e2e8f0">
    <tr>
      <td style="padding: 5px; width: 50%;">
        <strong>Condições Crônicas:</strong><br>
        ( ) Hipertensão Arterial ( ) Diabetes Mellitus<br>
        ( ) Doença Autoimune (Lúpus, Tireoidite, Psoríase)<br>
        ( ) Cardiopatia / Portador de Marcapasso<br>
        ( ) Distúrbios de Coagulação / Trombose prévia<br>
        ( ) Histórico Oncológico / Neoplasias
      </td>
      <td style="padding: 5px; width: 50%;">
        <strong>Alergias e Sensibilidades:</strong><br>
        ( ) Anestésicos locais (Lidocaína / Procaína)<br>
        ( ) Dipirona / Anti-inflamatórios / AAS<br>
        ( ) Látex / Cosméticos / Conservantes<br>
        ( ) Frutos do mar / Iodo / Picadas de insetos<br>
        ( ) Outras Alergias: ___________________________
      </td>
    </tr>
    <tr>
      <td style="padding: 5px;" colspan="2">
        <strong>Medicamentos em Uso Contínuo:</strong> ( ) Anticoagulantes ( ) Corticoides ( ) Isotretinoína (Roacutan nos últimos 6 meses) ( ) Imunossupressores ( ) Anticoncepcional &bull; <em>Outros:</em> __________________________________________________________________________<br>
        <strong>Condição Fisiológica Atual:</strong> ( ) Gestante ( ) Lactante ( ) Fumante diário ( ) Não fuma | <strong>Tendência a Queloides/Cicatrizes:</strong> ( ) Sim ( ) Não
      </td>
    </tr>
  </table>

  <h3 style="font-size: 11.5px; font-weight: bold; background: #f1f5f9; padding: 4px 8px; border-left: 3px solid #047857; margin: 10px 0 6px 0; text-transform: uppercase;">3. HISTÓRICO DE PROCEDIMENTOS ESTÉTICOS PRÉVIOS</h3>
  <p style="margin: 4px 0 8px 0; font-size: 10px; color: #334155;">
    • Já realizou toxina botulínica anteriormente? ( ) Sim ( ) Não &bull; Quando: ____________ | Resultado: ___________________<br>
    • Possui preenchimentos faciais permanentes (PMMA / Silicone industrial)? ( ) Sim ( ) Não &bull; Onde: ___________________<br>
    • Fios de sustentação ou cirurgias plásticas na região? ( ) Sim ( ) Não &bull; Detalhes: _________________________________
  </p>

  <div style="margin-top: 14px; padding: 8px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 6px; font-size: 9.5px; color: #475569;">
    <strong>DECLARAÇÃO DE VERACIDADE (ART. 299 DO CÓDIGO PENAL):</strong> Declaro que todas as informações acima são verdadeiras e completas, não tendo omitido nenhum problema de saúde, cirurgia ou medicamento em uso. Comprometo-me a comunicar imediatamente à clínica qualquer alteração em meu quadro de saúde.
  </div>

  <div style="margin-top: 20px; display: flex; justify-content: space-between; text-align: center; font-size: 10px;">
    <div style="width: 45%;">
      <div style="border-bottom: 1.5px solid #0f172a; height: 28px; margin-bottom: 4px;"></div>
      <div style="font-weight: bold; text-transform: uppercase;">${patient.nomeCliente}</div>
      <div style="font-size: 8.5px; color: #64748b;">Assinatura do(a) Paciente</div>
    </div>
    <div style="width: 45%;">
      <div style="border-bottom: 1.5px solid #0f172a; height: 28px; margin-bottom: 4px;"></div>
      <div style="font-weight: bold; text-transform: uppercase;">${patient.profissionalResponsavel}</div>
      <div style="font-size: 8.5px; color: #64748b;">${patient.registroProfissional} &bull; ${clinicData.nomeClinica || '{{nome_clinica}}'}</div>
    </div>
  </div>
</div>
`;
  }

  // 2. TERMO DE USO DE IMAGEM & LGPD
  if (docType === 'termo_imagem') {
    return `
<div style="font-family: 'Segoe UI', Arial, sans-serif; color: #0f172a; line-height: 1.5; font-size: 11px;">
  <div style="border-bottom: 2px solid #8b5cf6; padding-bottom: 8px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
      <h2 style="margin: 0; font-size: 15.5px; font-weight: 800; color: #6d28d9; text-transform: uppercase; letter-spacing: 0.5px;">TERMO DE CONSENTIMENTO LGPD E AUTORIZAÇÃO DE USO DE IMAGEM</h2>
      <p style="margin: 2px 0 0 0; font-size: 10px; color: #475569;"><strong>${clinicData.nomeClinica || '{{nome_clinica}}'}</strong> &bull; RT: ${clinicData.responsavel || clinicData.responsavelTecnico || '{{responsavel_tecnico}}'}</p>
    </div>
    <div style="text-align: right; font-size: 9.5px; color: #64748b;">
      <div><strong>Data:</strong> ${patient.data}</div>
      <div><strong>Procedimento:</strong> ${cleanDocTitle}</div>
    </div>
  </div>

  <p style="margin-bottom: 10px; font-size: 10.5px; text-align: justify;">
    Eu, <strong>${patient.nomeCliente}</strong>, na qualidade de titular dos dados pessoais e paciente da clínica <strong>${clinicData.nomeClinica || '{{nome_clinica}}'}</strong>, manifesto livre, informada e inequívoca concordância com o tratamento de meus dados pessoais e sensíveis, nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD) e do Código de Ética Profissional.
  </p>

  <h3 style="font-size: 11px; font-weight: bold; background: #f5f3ff; padding: 4px 8px; border-left: 3px solid #8b5cf6; margin: 12px 0 6px 0; text-transform: uppercase;">1. DO TRATAMENTO DE DADOS PESSOAIS E SENSÍVEIS (LGPD)</h3>
  <p style="margin: 0 0 8px 0; font-size: 10px; text-align: justify; color: #334155;">
    1.1. Os dados coletados (anamnese, histórico clínico, exames, registros fotográficos e prontuário) destinam-se <strong>exclusivamente à prestação segura de serviços de estética e saúde</strong>, tutela da saúde (Art. 7º, VIII e Art. 11, II, 'f' da LGPD) e cumprimento de obrigações regulatórias da ANVISA/Conselhos de Classe.<br>
    1.2. A clínica compromete-se a adotar medidas de segurança técnicas e administrativas aptas a proteger os dados pessoais de acessos não autorizados ou tratamentos ilícitos, garantindo a guarda legal por 20 (vinte) anos conforme a legislação sanitária.
  </p>

  <h3 style="font-size: 11px; font-weight: bold; background: #f5f3ff; padding: 4px 8px; border-left: 3px solid #8b5cf6; margin: 12px 0 6px 0; text-transform: uppercase;">2. DA AUTORIZAÇÃO DE REGISTRO E CESSÃO DE DIREITO DE IMAGEM (ANTES E DEPOIS)</h3>
  <p style="margin: 0 0 8px 0; font-size: 10px; text-align: justify; color: #334155;">
    O registro fotográfico da área tratada para o procedimento <strong>"${cleanDocTitle}"</strong> é parte obrigatória do prontuário pericial. Quanto à divulgação pública de imagens com fins educativos, informativos e científicos, <strong>SELECIONE UMA DAS OPÇÕES ABAIXO:</strong>
  </p>

  <div style="border: 1px solid #ddd6fe; border-radius: 6px; padding: 8px 12px; background: #faf5ff; margin-bottom: 12px; font-size: 10px; line-height: 1.8;">
    <div>( &nbsp; ) <strong>OPÇÃO 1 (AUTORIZAÇÃO COM TARJA / ANONIMIZAÇÃO):</strong> Autorizo a publicação de fotografias de "Antes e Depois" da região tratada com <em>tarja nos olhos ou recorte anonimizado</em> para redes sociais, site institucional e materiais educativos da clínica.</div>
    <div>( &nbsp; ) <strong>OPÇÃO 2 (AUTORIZAÇÃO INTEGRAL):</strong> Autorizo a veiculação de fotos e vídeos de meu rosto/corpo de forma integral (sem tarja) para divulgação institucional da clínica e portfólio profissional.</div>
    <div>( &nbsp; ) <strong>OPÇÃO 3 (SIGILO RESTRITO AO PRONTUÁRIO):</strong> Autorizo o registro fotográfico <strong>EXCLUSIVAMENTE para arquivamento no meu prontuário clínico interno</strong>, vedada qualquer veiculação externa.</div>
  </div>

  <p style="font-size: 9.5px; color: #64748b; text-align: justify; margin-bottom: 16px;">
    Esta autorização é concedida a título gratuito, não cabendo qualquer remuneração ou indenização presente ou futura. O titular poderá revogar esta autorização a qualquer momento mediante solicitação formal por escrito, não afetando os tratamentos pretéritos já realizados.
  </p>

  <div style="margin-top: 24px; display: flex; justify-content: space-between; text-align: center; font-size: 10px;">
    <div style="width: 48%;">
      <div style="border-bottom: 1.5px solid #0f172a; height: 28px; margin-bottom: 4px;"></div>
      <div style="font-weight: bold; text-transform: uppercase;">${patient.nomeCliente}</div>
      <div style="font-size: 8.5px; color: #64748b;">Assinatura do(a) Titular dos Dados</div>
    </div>
    <div style="width: 48%;">
      <div style="border-bottom: 1.5px solid #0f172a; height: 28px; margin-bottom: 4px;"></div>
      <div style="font-weight: bold; text-transform: uppercase;">${clinicData.nomeClinica || '{{nome_clinica}}'}</div>
      <div style="font-size: 8.5px; color: #64748b;">Representante / Controlador LGPD &bull; ${patient.data}</div>
    </div>
  </div>
</div>
`;
  }

  // 3. ANAMNESE ESPECÍFICA DO PROCEDIMENTO
  if (docType === 'anamnese') {
    let specificAnamneseContent = '';

    if (procKey === 'fios_pdo') {
      specificAnamneseContent = `
    <tr>
      <td style="padding: 5px;" colspan="2">
        <strong>Avaliação Facial Estrutural para Fios de Sustentação / PDO:</strong><br>
        • <strong>Grau de Ptose Tissular:</strong> ( ) Leve ( ) Moderada ( ) Severa | <strong>Vetor de Tração:</strong> ( ) Temporal ( ) Malar ( ) Mandibular ( ) Submentoniano<br>
        • <strong>Espessura Dérmica / Subcutânea:</strong> ( ) Fina (risco de translucidez de fio) ( ) Média ( ) Espessa/Pesada<br>
        • <strong>Tipo de Fios Indicados:</strong> ( ) Espiculados/Tração ( ) Lisos/Estímulo ( ) Parafuso/Volumização ( ) Matrix<br>
        • <strong>Histórico de Infecções Odontológicas / Sinusite Recente:</strong> ( ) Não ( ) Sim (adiar procedimento)<br>
        • <strong>Assimetria Facial Prévia:</strong> ( ) Ausente ( ) Presente em: _____________________________________________
      </td>
    </tr>
      `;
    } else if (procKey === 'biorreguladores') {
      specificAnamneseContent = `
    <tr>
      <td style="padding: 5px;" colspan="2">
        <strong>Avaliação para Biorremodeladores Celulares / PDRN / Complexos Híbridos (Técnica BAP):</strong><br>
        • <strong>Condição da Matriz Extracelular:</strong> ( ) Atrofia dérmica ( ) Elastose solar ( ) Rugas finas e perda de turgor<br>
        • <strong>Pontos Anatômicos BAP Mapeados:</strong> ( ) Zigomático ( ) Base nasal ( ) Tragus ( ) Mento ( ) Ângulo Mandibular<br>
        • <strong>Alergia a Frutos do Mar / Peixes (para PDRN/Polinucleotídeos):</strong> ( ) Não ( ) Sim (contraindicação formal a PDRN marinho)<br>
        • <strong>Histórico de Tratamentos Injetáveis Prévios:</strong> ( ) Nenhum ( ) Ácido Hialurônico ( ) Toxina ( ) Bioestimuladores
      </td>
    </tr>
      `;
    } else if (procKey === 'skinbooster') {
      specificAnamneseContent = `
    <tr>
      <td style="padding: 5px;" colspan="2">
        <strong>Avaliação para Skinbooster & Hidratação Dérmica Injetável:</strong><br>
        • <strong>Grau de Desidratação Cutânea:</strong> ( ) Superficial ( ) Profunda com perda de turgor ( ) Fotoenvelhecimento acentuado<br>
        • <strong>Áreas Mapeadas para Pápulas:</strong> ( ) Terço médio/Malar ( ) Perioral (código de barras) ( ) Olheiras/Periocular ( ) Pescoço/Colo<br>
        • <strong>Histórico de Dermatites ou Hipersensibilidade Tópica:</strong> ( ) Não ( ) Sim: __________________________________
      </td>
    </tr>
      `;
    } else if (procKey === 'laser_lavieen') {
      specificAnamneseContent = `
    <tr>
      <td style="padding: 5px;" colspan="2">
        <strong>Avaliação Dermatológica para Laser Lavieen (Thulium 1927nm):</strong><br>
        • <strong>Fototipo de Fitzpatrick:</strong> ( ) I ( ) II ( ) III ( ) IV ( ) V ( ) VI | <strong>Risco de Melasma / HPI:</strong> ( ) Baixo ( ) Alto<br>
        • <strong>Lesões Pigmentadas Alvo:</strong> ( ) Efélides (sardas) ( ) Lentigos solares ( ) Melasma dérmico/misto ( ) Poros dilatados<br>
        • <strong>Exposição Solar nos Últimos 30 Dias:</strong> ( ) Não ( ) Sim (necessita aguardar regressão de bronzeamento)<br>
        • <strong>Uso de Ácidos / Retinóides Tópicos:</strong> ( ) Não ( ) Sim. Suspenso há _____ dias.
      </td>
    </tr>
      `;
    } else if (procKey === 'laser_co2') {
      specificAnamneseContent = `
    <tr>
      <td style="padding: 5px;" colspan="2">
        <strong>Avaliação Dermatológica para Laser CO2 Fracionado (10600nm):</strong><br>
        • <strong>Fototipo Cutâneo:</strong> ( ) I ( ) II ( ) III ( ) IV ( ) V | <strong>Tendência a Queloide / Cicatriz Hipertrófica:</strong> ( ) Não ( ) Sim<br>
        • <strong>Indicação Principal:</strong> ( ) Cicatrizes atróficas de acne ( ) Resurfacing perioral/periocular ( ) Flacidez palpebral ( ) Estrias<br>
        • <strong>Profilaxia Antiviral para Herpes Simples:</strong> ( ) Desnecessária ( ) Prescrita (Aciclovir/Valaciclovir pré e pós)<br>
        • <strong>Uso de Isotretinoína Oral (Roacutan):</strong> ( ) Nunca usou ( ) Suspenso há mais de 6 meses ( ) Em uso (Contraindicação)
      </td>
    </tr>
      `;
    } else if (procKey === 'ultrassom_hifu') {
      specificAnamneseContent = `
    <tr>
      <td style="padding: 5px;" colspan="2">
        <strong>Avaliação para Ultrassom Microfocado (HIFU / SMAS Lifting):</strong><br>
        • <strong>Grau de Flacidez Musculoaponeurótica:</strong> ( ) Leve ( ) Moderada ( ) Acentuada no terço inferior/submento<br>
        • <strong>Presença de Implantes Metálicos ou Fios Definitivos na Face:</strong> ( ) Não ( ) Sim em: __________________________<br>
        • <strong>Transdutores Programados:</strong> ( ) 1.5mm (derme) ( ) 3.0mm (subcutâneo) ( ) 4.5mm (SMAS) ( ) 2.0mm (periocular)
      </td>
    </tr>
      `;
    } else if (procKey === 'endolaser') {
      specificAnamneseContent = `
    <tr>
      <td style="padding: 5px;" colspan="2">
        <strong>Avaliação para Endolaser / Endolifting Subdérmico (1470nm):</strong><br>
        • <strong>Espessura da Camada Adiposa Submentoniana/Jowls:</strong> ( ) < 1cm ( ) 1-2cm ( ) > 2cm<br>
        • <strong>Grau de Flacidez Cutânea Associada:</strong> ( ) Leve ( ) Moderada ( ) Intensa com ptose platisma<br>
        • <strong>Condição Vascular & Coagulação:</strong> ( ) Coagulograma normal ( ) Uso de AAS/Anticoagulantes ( ) Hipertensão controlada<br>
        • <strong>Indicação de Fibra Óptica:</strong> ( ) 300 micras ( ) 400 micras ( ) 600 micras com cânula guia
      </td>
    </tr>
      `;
    } else if (procKey === 'toxina_botulinica' || procKey === 'preenchimento_ah' || procKey === 'bioestimulador') {
      specificAnamneseContent = `
    <tr>
      <td style="padding: 5px;" colspan="2">
        <strong>Avaliação Facial & Anatomia Muscular/Dérmica:</strong><br>
        • <strong>Fototipo (Fitzpatrick):</strong> ( ) I ( ) II ( ) III ( ) IV ( ) V ( ) VI | <strong>Grau de Envelhecimento (Glogau):</strong> ( ) I ( ) II ( ) III ( ) IV<br>
        • <strong>Biotipo Cutâneo:</strong> ( ) Lipídico ( ) Alípico ( ) Eudérmico ( ) Misto | <strong>Espessura Cutânea:</strong> ( ) Fina ( ) Média ( ) Espessa<br>
        • <strong>Simetria Facial & Mímica:</strong> ( ) Simétrica ( ) Assimetria discreta ( ) Assimetria acentuada em: ________________________<br>
        • <strong>Histórico de Herpes Labial / Facial:</strong> ( ) Não ( ) Sim (Necessita profilaxia antiviral prévia)<br>
        • <strong>Doenças Neuromusculares (Miastenia / ELA):</strong> ( ) Não ( ) Sim (Contraindicação absoluta para toxina)
      </td>
    </tr>
      `;
    } else if (procKey === 'peeling' || procKey === 'microagulhamento' || procKey === 'limpeza_pele') {
      specificAnamneseContent = `
    <tr>
      <td style="padding: 5px;" colspan="2">
        <strong>Avaliação Dermatológica & Barreira Cutânea:</strong><br>
        • <strong>Fototipo (Fitzpatrick):</strong> ( ) I ( ) II ( ) III ( ) IV ( ) V ( ) VI | <strong>Risco de Hipercromia Pós-Inflamatória (HPI):</strong> ( ) Baixo ( ) Alto<br>
        • <strong>Lesões Ativas:</strong> ( ) Acne inflamatória graus III/IV ( ) Pústulas ( ) Escoriações ( ) Dermatite seborreica ( ) Rosácea<br>
        • <strong>Uso de Ácidos Domiciliares (Glicólico/Retinóico):</strong> ( ) Não ( ) Sim. Suspenso há _____ dias.<br>
        • <strong>Exposição Solar Recente / Praia / Bronzeamento:</strong> ( ) Não ( ) Sim nos últimos 15 dias.
      </td>
    </tr>
      `;
    } else {
      specificAnamneseContent = `
    <tr>
      <td style="padding: 5px;" colspan="2">
        <strong>Avaliação Clínica Geral da Região a ser Tratada:</strong><br>
        • <strong>Local da Aplicação:</strong> ____________________________________________________________________________<br>
        • <strong>Inspeção Visual e Palpação:</strong> ( ) Tecido íntegro ( ) Edema prévio ( ) Nódulos/Fibroses ( ) Flacidez tissular ( ) Gordura focal<br>
        • <strong>Contraindicações Locais Agudas:</strong> ( ) Nenhuma identificada ( ) Infecção ativa ( ) Feridas abertas ( ) Implante metálico local
      </td>
    </tr>
      `;
    }

    return `
<div style="font-family: 'Segoe UI', Arial, sans-serif; color: #0f172a; line-height: 1.5; font-size: 11px;">
  <div style="border-bottom: 2px solid #10b981; padding-bottom: 8px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
      <h2 style="margin: 0; font-size: 15.5px; font-weight: 800; color: #047857; text-transform: uppercase; letter-spacing: 0.5px;">FICHA DE ANAMNESE CLÍNICA ESPECÍFICA</h2>
      <p style="margin: 2px 0 0 0; font-size: 10px; color: #475569;"><strong>Procedimento:</strong> ${cleanDocTitle} &bull; ${clinicData.nomeClinica || '{{nome_clinica}}'}</p>
    </div>
    <div style="text-align: right; font-size: 9.5px; color: #64748b;">
      <div><strong>Data da Avaliação:</strong> ${patient.data}</div>
      <div><strong>Avaliador(a):</strong> ${patient.profissionalResponsavel}</div>
    </div>
  </div>

  <table style="width: 100%; border-collapse: collapse; font-size: 10.5px; margin-bottom: 10px;" border="1" bordercolor="#e2e8f0">
    <tr style="background: #f8fafc;">
      <td style="padding: 6px; width: 60%;"><strong>Paciente:</strong> ${patient.nomeCliente}</td>
      <td style="padding: 6px; width: 40%;"><strong>Data de Avaliação:</strong> ${patient.data}</td>
    </tr>
    <tr>
      <td style="padding: 6px;" colspan="2"><strong>Queixa Principal Relatada:</strong> ____________________________________________________________________________________</td>
    </tr>
    <tr>
      <td style="padding: 6px;" colspan="2"><strong>Expectativa de Resultado:</strong> _______________________________________________________________________________________</td>
    </tr>
    ${specificAnamneseContent}
    <tr>
      <td style="padding: 6px;" colspan="2">
        <strong>Plano de Tratamento Proposto / Parâmetros Técnicos:</strong><br>
        • <strong>Produto / Substância / Equipamento:</strong> ________________________________________________________________<br>
        • <strong>Volume / Dose / Fluência:</strong> ____________________________ | <strong>Número Estimado de Sessões:</strong> ____________<br>
        • <strong>Áreas Demarcadas:</strong> ________________________________________________________________________________
      </td>
    </tr>
    <tr>
      <td style="padding: 6px;" colspan="2">
        <strong>Aptidão Clínica para o Procedimento:</strong><br>
        ( &nbsp; ) <strong>APTO(A)</strong> para realização do procedimento sem restrições.<br>
        ( &nbsp; ) <strong>APTO(A) COM RESTRIÇÃO/PROFILAXIA:</strong> ___________________________________________________________<br>
        ( &nbsp; ) <strong>INAPTO(A) TEMPORARIAMENTE</strong> motivo: ______________________________________________________________
      </td>
    </tr>
  </table>

  <div style="margin-top: 24px; display: flex; justify-content: space-between; text-align: center; font-size: 10px;">
    <div style="width: 45%;">
      <div style="border-bottom: 1.5px solid #0f172a; height: 28px; margin-bottom: 4px;"></div>
      <div style="font-weight: bold; text-transform: uppercase;">${patient.nomeCliente}</div>
      <div style="font-size: 8.5px; color: #64748b;">Assinatura do(a) Paciente</div>
    </div>
    <div style="width: 45%;">
      <div style="border-bottom: 1.5px solid #0f172a; height: 28px; margin-bottom: 4px;"></div>
      <div style="font-weight: bold; text-transform: uppercase;">${patient.profissionalResponsavel}</div>
      <div style="font-size: 8.5px; color: #64748b;">${patient.registroProfissional} &bull; Visto Técnico</div>
    </div>
  </div>
</div>
`;
  }

  // 4. TCLE (TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO ESPECÍFICO & BLINDAGEM JURÍDICO-SANITÁRIA)
  if (docType === 'tcle') {
    let tcleProcSpecificDetails = '';

    if (procKey === 'toxina_botulinica') {
      tcleProcSpecificDetails = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">1. Natureza, Mecanismo de Ação & Obrigação de Meio:</strong><br>
          Declaro estar ciente de que a <strong>Toxina Botulínica Tipo A</strong> é um fármaco biológico com registro na ANVISA que promove o bloqueio temporário e reversível da liberação de acetilcolina na placa motora neuromuscular, atenuando a contração dos músculos da mímica facial responsáveis pela formação de rugas dinâmicas. Trata-se de <strong>obrigação de meio e não de resultado exato garantido</strong>, haja vista que a resposta muscular depende da anatomia individual, força muscular, tônus basal e metabolismo intrínseco.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">2. Cronograma de Ação & Durabilidade Biológica:</strong><br>
          Fui informado(a) de que o início do efeito ocorre entre <strong>48 a 72 horas</strong>, com pico máximo de ação e estabilização clínica aos <strong>15 dias</strong> após a aplicação. A durabilidade biológica média varia de <strong>3 a 5 meses</strong>, podendo ser menor em indivíduos com alto índice de atividade física anaeróbica intensa, metabolismo acelerado, uso de suplementos estimulantes ou mímica facial excessivamente hipercinética.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">3. Efeitos Adversos Inerentes, Reações Previsíveis & Riscos Conhecidos:</strong><br>
          Estou plenamente ciente de que podem ocorrer: dor leve à punctura, hiperemia (vermelhidão), leve edema peripuntório, pequenas equimoses ou hematomas nos locais de injeção, sensação passageira de peso na fronte, cefaleia transitória nos primeiros dias e, raramente (menos de 1%), assimetrias musculares passageiras ou ptose palpebral/superciliar transitória (queda temporária da pálpebra por difusão involuntária ao músculo levantador), a qual é reversível espontaneamente e tratável com colírios agonistas adrenérgicos (como apraclonidina/brimonidina).
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">4. Consulta Obrigatória de Revisão / Retoque (15º ao 21º Dia):</strong><br>
          Comprometo-me a comparecer à consulta presencial de reavaliação agendada entre o <strong>15º e o 21º dia</strong> após o procedimento. Declaro ciência de que <strong>o não comparecimento neste prazo improrrogável implicará a perda do direito a eventuais complementações ou ajustes gratuitos</strong>, devendo qualquer aplicação posterior ser cobrada como novo procedimento em decorrência do custo de novos insumos e riscos de efeito vacina (anticorpos neutralizantes).
        </div>
      `;
    } else if (procKey === 'preenchimento_ah') {
      tcleProcSpecificDetails = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">1. Substância Empregada, Finalidade & Reversibilidade:</strong><br>
          Declaro ciência de que o procedimento utiliza <strong>Gel Estéril de Ácido Hialurônico Reticulado</strong> com registro ativo na ANVISA, substância biocompatível, viscoelástica e bioabsorvível pelo organismo, cuja durabilidade média varia entre <strong>8 a 18 meses</strong> dependendo da densidade do gel, plano anatômico e metabolismo individual. O procedimento visa à volumização, sustentação, harmonização e definição de contornos faciais, tratando-se de <strong>obrigação de meio</strong>.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">2. Efeitos Adversos Inerentes & Período de Acomodação Tecidual:</strong><br>
          Fui informado(a) de que são comuns e esperados: edema moderado a acentuado nos primeiros 3 a 7 dias, hematomas e equimoses por punção vascular dérmica, dor leve à palpação, sensação de endurecimento local e assimetria imediata transitória decorrente do inchaço desigual. O resultado final definitivo consolida-se apenas após a completa integração tecidual e resolução do edema (em aproximadamente <strong>20 a 30 dias</strong>).
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">3. Segurança Vascular & Disponibilidade Imediata de Hialuronidase:</strong><br>
          Fui expressamente advertido(a) sobre a possibilidade rara de complicações vasculares (compressão ou embolização vascular acidental). Fui formalmente comunicado(a) de que <strong>a clínica mantém em estoque ativo e permanente o antídoto enzimático reversor (Hialuronidase de 1500 a 3000 UTR)</strong> e protocolos de emergência imediatos para desmanchar o produto caso haja qualquer sinal clínico de sofrimento vascular ou isquemia.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">4. Dever de Comunicação Imediata de Sinais de Alerta:</strong><br>
          Comprometo-me irrevogavelmente a entrar em contato imediato com o plantão da clínica caso apresente, nas primeiras 24 a 48 horas: <em>dor intensa e pulsátil desproporcional ao procedimento, palidez cutânea repentina no local ou adjacências, manchas arroxeadas marmorizadas em padrão de rede ou bolhas</em>.
        </div>
      `;
    } else if (procKey === 'bioestimulador') {
      tcleProcSpecificDetails = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">1. Mecanismo Neocolagênico Gradual (NÃO é Preenchedor Imediato):</strong><br>
          Declaro estar ciente de que os <strong>Bioestimuladores de Colágeno</strong> (Ácido Poli-L-Lático / Hidroxiapatita de Cálcio / Policaprolactona) atuam por bioestímulo inflamatório subclínico controlado, induzindo a neocolagênese progressiva pelos fibroblastos. Fui advertido(a) de que <strong>o produto NÃO confere volumização instantânea</strong>: o inchaço dos primeiros dias desaparecerá, e a melhora real da densidade e firmeza dérmica se manifestará gradualmente entre <strong>30 a 90 dias</strong>, frequentemente necessitando de mais de uma sessão programada.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">2. Efeitos Adversos & Riscos de Nódulos / Granulomas:</strong><br>
          Estou ciente de que podem ocorrer: edema, equimoses, sensibilidade dolorosa local e risco de formação de micropápulas ou nódulos não visíveis à palpação ou granulomas de corpo estranho caso o produto não seja distribuído e homogeneizado adequadamente pelo próprio organismo e pela massagem domiciliar.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">3. Obrigação Incondicional da Massagem Domiciliar (Regra 5-5-5):</strong><br>
          Comprometo-me formalmente a realizar a massagem circular vigorosa na região tratada <strong>5 vezes ao dia, por 5 minutos em cada sessão, durante 5 dias consecutivos</strong>, utilizando creme hidratante neutro. Declaro ciência inequívoca de que <strong>a omissão da massagem domiciliar pelo paciente é a principal causa de acúmulo de produto e nodulações</strong>, eximindo a clínica de responsabilidade por nódulos decorrentes da inobservância desta obrigação.
        </div>
      `;
    } else if (procKey === 'fios_pdo') {
      tcleProcSpecificDetails = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">1. Natureza do Implante & Absorção Biológica:</strong><br>
          Declaro ciência de que os <strong>Fios de Polidioxanona (PDO)</strong> são dispositivos médicos estéreis e 100% bioabsorvíveis implantados no plano subcutâneo/dérmico para tração mecânica (fios espiculados) e/ou estímulo biológico de colágeno (fios lisos/matrix). A absorção completa pelo organismo ocorre entre 6 a 8 meses, permanecendo o colágeno gerado por até 12 a 18 meses.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">2. Reações Previsíveis, Acomodação & Restrições Estritas:</strong><br>
          Estou ciente de que podem ocorrer: sensação de repuxamento facial, desconforto mastigatório leve a moderado nos primeiros dias, pequenas pregas ou franzimentos cutâneos temporários nos pontos de tração (que se acomodam naturalmente em 7 a 21 dias), edema, equimoses e risco de extrusão da ponta do fio (resolvida com simples corte em cabine).
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">3. Cuidados Inegociáveis nos Primeiros 15 Dias:</strong><br>
          Comprometo-me a: NÃO abrir a boca de forma exagerada, NÃO mastigar alimentos excessivamente duros, NÃO realizar procedimentos odontológicos invasivos, NÃO dormir de lado ou de bruços pressionando a face e NÃO praticar esportes de impacto pelos próximos 15 dias.
        </div>
      `;
    } else if (procKey === 'biorreguladores') {
      tcleProcSpecificDetails = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">1. Natureza de Biorremodelação Celular & Polinucleotídeos (PDRN / Complexos Híbridos):</strong><br>
          Declaro ciência de que os <strong>Biorremodeladores Celulares e Polinucleotídeos (PDRN / Complexos Híbridos)</strong> atuam restaurando a matriz extracelular dérmica e estimulando a síntese autóloga de colágeno tipos I e III e elastina, sem promover volumização ou preenchimento artificial. Trata-se de <strong>obrigação de meio</strong> focada na qualidade tecidual.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">2. Formação de Micropápulas & Técnica BAP (Bio Aesthetic Points):</strong><br>
          Fui informado(a) de que a injeção pela técnica BAP gera pequenas pápulas dérmicas temporárias nos pontos anatômicos, que se difundem e integram uniformemente em <strong>24 a 48 horas</strong>. É expressamente proibido massagear ou comprimir as pápulas.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">3. Reações Esperadas & Ciclo de Sessões:</strong><br>
          Estou ciente de que podem ocorrer eritema transitório, pequeno edema e pequenos hematomas pontuais. A resposta de regeneração celular consolida-se após o ciclo recomendado (habitualmente 2 a 3 sessões com intervalo mensal).
        </div>
      `;
    } else if (procKey === 'skinbooster') {
      tcleProcSpecificDetails = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">1. Hidratação Dérmica Injetável Profunda (Skinbooster):</strong><br>
          Declaro ciência de que o <strong>Skinbooster</strong> utiliza Ácido Hialurônico de baixa densidade/não reticulado ou micro-reticulado associado a complexos vitamínicos para reter água nas camadas profundas da derme, melhorando o turgor, elasticidade e linhas finas. Trata-se de <strong>obrigação de meio</strong> sem objetivo de projeção volumétrica.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">2. Micropápulas Temporárias & Assepsia Inicial:</strong><br>
          Estou ciente de que as microinjeções intradérmicas causam micropápulas que regridem espontaneamente em 24 a 48 horas. É proibido aplicar maquiagem convencional não estéril no dia da aplicação.
        </div>
      `;
    } else if (procKey === 'laser_lavieen') {
      tcleProcSpecificDetails = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">1. Tecnologia Laser Thulium 1927nm Sub-Ablativo (Lavieen):</strong><br>
          Declaro ciência de que o <strong>Laser Lavieen</strong> emite feixes fracionados de 1927nm com alta afinidade pela água tecidual, promovendo coagulação na junção dermoepidérmica para renovação da textura, fechamento de poros, clareamento e estímulo de colágeno com tempo de recuperação reduzido. Trata-se de <strong>obrigação de meio</strong>.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">2. Microcrostas ("Efeito Areia / Pincelado") & Proibição de Arrancar:</strong><br>
          Estou ciente de que nos primeiros 3 a 7 dias a pele apresentará textura áspera e micropartículas escuras pontilhadas. <strong>É EXPRESSAMENTE PROIBIDO ESFOLIAR OU ARRANCAR ESSAS CROSTAS</strong>, sob risco de hipocromia ou hipercromia pós-inflamatória, cuja responsabilidade é do paciente em caso de descumprimento.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">3. Fotoproteção Rigorosa FPS 50+:</strong><br>
          Comprometo-me a aplicar protetor solar mineral FPS 50+ a cada 3 horas e evitar exposição direta ao sol, piscina ou praia por 30 dias.
        </div>
      `;
    } else if (procKey === 'laser_co2') {
      tcleProcSpecificDetails = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">1. Resurfacing Ablativo CO2 Fracionado (10600nm):</strong><br>
          Declaro ciência de que o <strong>Laser de CO2 Fracionado</strong> realiza vaporização térmica colunar profunda da epiderme e derme papilar, promovendo contração colagênica imediata e reorganização estrutural para tratamento de cicatrizes, rugas profundas e flacidez. Trata-se de <strong>obrigação de meio</strong> com fase de downtime exsudativa e cicatricial.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">2. Fase Exsudativa, Crostas & Cuidados Oclusivos (5 a 10 dias):</strong><br>
          Fui orientado(a) sobre a necessidade de aplicar pomada cicatrizante e hidratante oclusivo prescrito várias vezes ao dia. <strong>É TERMINANTEMENTE PROIBIDO ARRANCAR CROSTAS OU COÇAR A PELE</strong>. Pacientes com histórico de herpes simples devem realizar profilaxia antiviral obrigatória.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">3. Bloqueio Solar Absoluto por 60 a 90 Dias:</strong><br>
          A pele neoformada é hiper-reativa à radiação ultravioleta. A exposição solar desprotegida resultará em manchas hipercrômicas persistentes. O uso de FPS 50+ e barreira física é obrigatório.
        </div>
      `;
    } else if (procKey === 'ultrassom_hifu') {
      tcleProcSpecificDetails = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">1. Ultrassom Microfocado / Macrofocado (HIFU / SMAS Lifting):</strong><br>
          Declaro ciência de que o <strong>HIFU (Ultrassom Focalizado de Alta Intensidade)</strong> atua emitindo energia ultrassônica concentrada na fáscia muscular (SMAS) e derme profunda, criando zonas de coagulação térmica (65-75°C) que induzem contração tecidual imediata e neocolagênese sustentada. Trata-se de <strong>obrigação de meio</strong>.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">2. Sensibilidade Dolorosa Músculo-Óssea & Cronograma de Resultados:</strong><br>
          Estou ciente de que o procedimento causa desconforto térmico/músculo-aponeurótico tolerável e que é esperada sensação de dor muscular por 3 a 10 dias. <strong>NÃO se deve tomar anti-inflamatórios não esteroidais (AINEs)</strong> que suprimam a cascata biológica neocolagênica. O resultado tem pico entre <strong>60 a 120 dias</strong> pós-sessão.
        </div>
      `;
    } else if (procKey === 'endolaser') {
      tcleProcSpecificDetails = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">1. Endolaser / Endolifting Subdérmico com Fibra Óptica (1470nm):</strong><br>
          Declaro ciência de que o <strong>Endolaser</strong> consiste na introdução de microfibra óptica no plano subcutâneo sob anestesia local tumescente, emitindo comprimento de onda de 1470nm para lipólise térmica de gordura localizada e retração da fáscia cutânea (skin tightening). Trata-se de <strong>obrigação de meio</strong>.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">2. Uso Obrigatório de Faixa Compressiva Mentoniana & Parestesias Temporárias:</strong><br>
          Comprometo-me a utilizar a <strong>faixa compressiva elástica continuamente pelas primeiras 48 a 72 horas</strong> e no período noturno pelos 15 dias subsequentes. Estou ciente de que é comum ocorrer edema, equimoses, pequenos seromas e dormência/parestesia transitória que regride gradualmente em até 60 dias.
        </div>
      `;
    } else if (procKey === 'peeling') {
      tcleProcSpecificDetails = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">1. Mecanismo de Quimioesfoliação & Renovação Cutânea:</strong><br>
          Declaro ciência de que o <strong>Peeling Químico / Enzimático</strong> promove a remoção controlada de camadas da epiderme/derme através de ácidos específicos com registro na ANVISA, estimulando a renovação celular, melhora do viço, atenuação de manchas e textura cutânea. Trata-se de <strong>obrigação de meio</strong>.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">2. Proibição Absoluta de Puxar ou Esfoliar Casquinhas / Peles Soltas:</strong><br>
          <strong>DECLARO-ME TERMINANTEMENTE ADVERTIDO(A) DE QUE É EXPRESSAMENTE PROIBIDO PUXAR, ARRANCAR, ESFOLIAR OU COÇAR AS PELES SOLTAS</strong>. Fui esclarecido(a) de que a remoção forçada das crostas antes do tempo natural lesiona a pele nova, provocando cicatrizes atróficas/hipertróficas e <strong>Hipercromia Pós-Inflamatória (manchas escuras irreversíveis)</strong>, pelas quais assumo exclusiva responsabilidade em caso de descumprimento.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">3. Fotoproteção Incondicional FPS 50+ & Abstenção Solar:</strong><br>
          Comprometo-me a aplicar protetor solar FPS 50+ de 3 em 3 horas rigorosamente e não me expor a sol direto, praia, piscina, bronzeamento artificial ou fontes de calor intenso (forno/sauna) durante todo o período de renovação epitelial.
        </div>
      `;
    } else if (procKey === 'microagulhamento') {
      tcleProcSpecificDetails = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">1. Indução Percutânea de Colágeno (IPCA) & Drug Delivery:</strong><br>
          Declaro ciência de que o procedimento utiliza microagulhas estéreis de uso único e descartável para abertura de microcanais na pele, estimulando a liberação de fatores de crescimento e neocolagênese. Trata-se de <strong>obrigação de meio</strong>.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">2. Reações Previsíveis, Assepsia & Proibição de Maquiagem:</strong><br>
          Estou ciente de que ocorrerá sangramento pontual intraprocedimento, eritema moderado a intenso por 24 a 48h, sensação de ardência e descamação leve. <strong>Comprometo-me a NÃO usar maquiagem convencional não estéril nas primeiras 24 horas</strong> e a não tocar na face com as mãos desprotegidas/sujas para evitar contaminação bacteriana secundária.
        </div>
      `;
    } else if (procKey === 'lipoenzimatica') {
      tcleProcSpecificDetails = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">1. Aplicação de Enzimas Lipolíticas & Processo de Lise Adipocitária:</strong><br>
          Declaro ciência de que a <strong>Lipoenzimática / Intradermoterapia</strong> consiste na injeção de mesclas estéreis lipolíticas no tecido subcutâneo para emulsificação e lise da membrana dos adipócitos. Trata-se de <strong>obrigação de meio</strong> que necessita de um ciclo de sessões programadas, controle dietético e ingestão hídrica abundante.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">2. Processo Inflamatório Esperado & Reações Locais:</strong><br>
          Fui informado(a) de que é esperado um processo inflamatório local intenso nas primeiras 48 a 72 horas (edema volumoso, calor, rubor, dor muscular tipo contusão e nódulos inflamatórios palpáveis temporários), que são sinais diretos da degradação lipídica.
        </div>
      `;
    } else if (procKey === 'gluteos') {
      tcleProcSpecificDetails = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">1. Harmonização & Bioestímulo Glúteo Corporal:</strong><br>
          Declaro ciência de que o procedimento visa à melhoria do contorno glúteo, projeção, firmeza dérmica e redução de flacidez/depressões trocantéricas através de substâncias estéreis biocompatíveis com registro na ANVISA. Trata-se de <strong>obrigação de meio</strong>.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">2. Reações Esperadas & Restrições de Esforço:</strong><br>
          Estou ciente de que podem ocorrer: desconforto/dor leve a moderada ao sentar nos primeiros 3 a 5 dias, edema pronunciado e equimoses. Comprometo-me a <strong>NÃO praticar exercícios pesados de pernas/glúteos por 7 a 10 dias</strong> e evitar sentar sobre superfícies rígidas por tempo prolongado nas primeiras 48 horas.
        </div>
      `;
    } else if (procKey === 'peim') {
      tcleProcSpecificDetails = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">1. Escleroterapia de Microvasos (PEIM) & Obliteracão Vascular:</strong><br>
          Declaro ciência de que o <strong>Procedimento Estético Injetável em Microvasos (PEIM)</strong> utiliza solução hipertônica estéril injetada na luz de telangiectasias (vasinhos) para provocar o colapso e esclerose gradual dos vasos. Trata-se de <strong>obrigação de meio</strong> com necessidade de múltiplas sessões.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">2. Reações Locais & Risco de Manchas por Sol:</strong><br>
          Estou ciente de que podem ocorrer ardor momentâneo, hematomas no trajeto vascular e risco de hipercromia pós-inflamatória (manchas acastanhadas de hemossiderina) caso ocorra exposição solar antes da completa reabsorção dos hematomas. Comprometo-me a não me expor ao sol e a utilizar meias elásticas de compressão se prescrito.
        </div>
      `;
    } else if (procKey === 'laser_tecnologias') {
      tcleProcSpecificDetails = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">1. Aplicação de Tecnologias / Laser / Luz Intensa Pulsada / CO2:</strong><br>
          Declaro ciência de que a tecnologia atua por fototermólise seletiva ou aquecimento térmico dérmico controlado. Trata-se de <strong>obrigação de meio</strong>.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">2. Reações Esperadas & Cuidados Térmicos:</strong><br>
          Estou ciente de que podem ocorrer: sensação de calor/ardor semelhante a queimadura de sol por algumas horas, microcrostas puntiformes acastanhadas que se desprendem em 5 a 8 dias e edema temporário. É proibido arrancar as crostas e obrigatório o uso de FPS 50+.
        </div>
      `;
    } else if (procKey === 'criolipolise') {
      tcleProcSpecificDetails = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">1. Mecanismo de Paniculite Inflamatória por Resfriamento:</strong><br>
          Declaro ciência de que a <strong>Criolipólise</strong> promove o resfriamento controlado do tecido adiposo para cristalização e apoptose dos adipócitos, cuja eliminação fisiológica ocorre gradualmente ao longo de <strong>30 a 90 dias</strong>. Trata-se de <strong>obrigação de meio</strong>.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">2. Uso de Membrana Anticongelante Certificada & Reações Locais:</strong><br>
          Fui informado(a) de que é obrigatório o uso de membrana anticongelante descartável com registro na ANVISA. Estou ciente de que podem ocorrer eritema, edema local, equimoses pela sucção do manípulo, dormência/parestesia temporária por 1 a 4 semanas e dor muscular leve. Raramente (menos de 0,05%) pode ocorrer hiperplasia adiposa paradoxal (HAP).
        </div>
      `;
    } else if (procKey === 'limpeza_pele') {
      tcleProcSpecificDetails = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">1. Higienização Profunda & Extração de Comedões:</strong><br>
          Declaro ciência de que a <strong>Limpeza de Pele Profunda</strong> visa à desobstrução dos óstios foliculares, remoção de comedões (cravos) e miliums através de emoliência e extração manual ou mecânica. Trata-se de <strong>obrigação de meio</strong>.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">2. Reações Esperadas & Proibição de Manipulação:</strong><br>
          Estou ciente de que a pele poderá apresentar hiperemia temporária e pequenas marcas de extração por 24 a 48h. Comprometo-me a <strong>NÃO espremer lesões residuais, não usar maquiagem pesada nas primeiras 12h e aplicar protetor solar FPS 50+</strong>.
        </div>
      `;
    } else if (procKey === 'tricologia') {
      tcleProcSpecificDetails = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">1. Terapia Capilar / Mesoterapia / Microagulhamento do Couro Cabeludo:</strong><br>
          Declaro ciência de que os procedimentos tricofuncionais visam ao fortalecimento folicular, aporte de nutrientes e controle de eflúvios/alopecias através de microinjeções ou microagulhamento com fármacos estéreis com registro na ANVISA. Trata-se de <strong>obrigação de meio</strong> com ciclo de sessões.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">2. Cuidados e Restrições Pós-Aplicação:</strong><br>
          Estou ciente de que o couro cabeludo poderá apresentar sensibilidade, ardor e pequenos sangramentos pontuais. Comprometo-me a <strong>NÃO lavar os cabelos por no mínimo 6 a 12 horas, não usar tinturas/químicas capilares por 7 dias e não usar bonés/capacetes apertados no dia do procedimento</strong>.
        </div>
      `;
    } else if (procKey === 'soroterapia') {
      tcleProcSpecificDetails = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">1. Terapia Nutricional Injetável / Soroterapia / Drip:</strong><br>
          Declaro ciência de que o procedimento consiste na infusão endovenosa ou intramuscular de soluções estéreis contendo vitaminas, minerais e antioxidantes com registro na ANVISA para otimização metabólica. Trata-se de <strong>obrigação de meio</strong>.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">2. Riscos Inerentes à Punção Venosa:</strong><br>
          Estou ciente de que podem ocorrer hematoma no sítio de punção, gosto metálico transitório na boca durante a infusão, leve náusea ou calor passageiro decorrente da osmolaridade dos nutrientes. Em caso de queimação no braço, o paciente deve avisar imediatamente o aplicador.
        </div>
      `;
    } else if (procKey === 'drenagem_massagem') {
      tcleProcSpecificDetails = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">1. Drenagem Linfática Manual / Terapia Manual:</strong><br>
          Declaro ciência de que a <strong>Drenagem Linfática</strong> visa ao estímulo do sistema linfático para reabsorção de líquidos intersticiais e toxinas através de manobras manuais suaves, rítmicas e precisas. Trata-se de <strong>obrigação de meio</strong>.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">2. Respostas Fisiológicas Esperadas & Ingestão Hídrica:</strong><br>
          Estou ciente de que poderá ocorrer aumento do débito urinário e relaxamento muscular pós-sessão. Comprometo-me a ingerir no mínimo 2 litros de água ao dia para auxiliar na excreção linfática.
        </div>
      `;
    } else {
      tcleProcSpecificDetails = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">1. Natureza, Objetivo & Obrigação de Meio:</strong><br>
          Declaro que recebi explicações detalhadas sobre a execução técnica de <strong>${cleanDocTitle}</strong>, benefícios esperados, limitações biológicas individuais e cuidados. Trata-se de ato estético caracterizado como <strong>obrigação de meio</strong>, cuja resposta terapêutica é individual e influenciada por fatores biológicos e comportamentais.
        </div>
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 0 4px 4px 0;">
          <strong style="color: #92400e;">2. Efeitos Adversos Previsíveis & Reações Inerentes:</strong><br>
          Estou ciente de que podem ocorrer reações locais transitórias tais como eritema (vermelhidão), leve edema, sensibilidade à palpação, pequenas equimoses e ressecamento temporário, as quais regridem progressivamente com o seguimento das orientações clínicas.
        </div>
      `;
    }

    return `
<div style="font-family: 'Segoe UI', Arial, sans-serif; color: #0f172a; line-height: 1.45; font-size: 10px;">
  <!-- Cabeçalho Oficial TCLE / Blindagem Jurídico-Sanitária -->
  <div style="border: 2px solid #b45309; border-radius: 6px; padding: 6px 10px; background: #ffffff; margin-bottom: 8px;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="width: 22%; vertical-align: middle; border-right: 1.5px solid #cbd5e1; padding-right: 8px;">
          <div style="font-size: 11.5px; font-weight: 900; color: #b45309; text-transform: uppercase;">TCLE OFICIAL</div>
          <div style="font-size: 8px; font-weight: bold; color: #475569;">BLINDAGEM JURÍDICA</div>
          <div style="font-size: 7.5px; color: #64748b; margin-top: 2px;">Lei 8.078/90 &bull; CC Art. 393</div>
        </td>
        <td style="width: 53%; padding: 0 10px; vertical-align: middle;">
          <div style="font-size: 11.5px; font-weight: 800; color: #0f172a; text-transform: uppercase;">
            TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO &bull; ${cleanDocTitle.toUpperCase()}
          </div>
          <div style="font-size: 8.5px; color: #334155; margin-top: 1px;">
            <strong>${clinicData.nomeClinica || '{{nome_clinica}}'}</strong> &bull; RT: ${clinicData.responsavel || clinicData.responsavelTecnico || '{{responsavel_tecnico}}'} (${clinicData.registroConselho || 'Conselho Regional'})
          </div>
        </td>
        <td style="width: 25%; vertical-align: middle; border-left: 1.5px solid #cbd5e1; padding-left: 8px; font-size: 8px; color: #334155; line-height: 1.35;">
          <div><strong>Paciente:</strong> ${patient.nomeCliente}</div>
          <div><strong>Data:</strong> ${patient.data}</div>
          <div><strong>Status:</strong> <span style="color: #b45309; font-weight: bold;">DOCUMENTO LEGAL VIGENTE</span></div>
        </td>
      </tr>
    </table>
  </div>

  <!-- Qualificação e Preâmbulo Legal -->
  <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 5px 8px; margin-bottom: 6px; background: #f8fafc; font-size: 8.8px; text-align: justify; color: #1e293b;">
    Eu, <strong>${patient.nomeCliente}</strong>, declaro para todos os fins de direito que recebi do(a) profissional <strong>${patient.profissionalResponsavel}</strong> (${patient.registroProfissional}) e da clínica <strong>${clinicData.nomeClinica || '{{nome_clinica}}'}</strong> todas as informações necessárias, em linguagem clara, objetiva e compreensível, a respeito do procedimento estético <strong>"${cleanDocTitle}"</strong>, compreendendo integralmente seus objetivos, técnica, substâncias, riscos previsíveis, limitações biológicas e cuidados domiciliares obrigatórios.
  </div>

  <!-- 1. CLÁUSULAS TÉCNICAS ESPECÍFICAS DO PROCEDIMENTO -->
  <div style="border: 1.5px solid #f59e0b; border-radius: 5px; padding: 6px 8px; margin-bottom: 6px; background: #ffffff;">
    <div style="font-size: 9.5px; font-weight: 800; color: #b45309; text-transform: uppercase; border-bottom: 1.5px solid #f59e0b; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between;">
      <span>CLÁUSULAS TÉCNICAS ESPECÍFICAS &bull; ${cleanDocTitle.toUpperCase()}</span>
      <span style="font-size: 8px; font-weight: bold; background: #fef3c7; color: #92400e; padding: 1px 4px; border-radius: 3px;">ANÁLISE PERICIAL</span>
    </div>
    ${tcleProcSpecificDetails}
  </div>

  <!-- 2. CLÁUSULAS DE BLINDAGEM JURÍDICA E SANITÁRIA UNIVERSAL -->
  <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 6px 8px; margin-bottom: 6px; background: #ffffff;">
    <div style="font-size: 9.5px; font-weight: 800; color: #0f172a; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 4px;">
      CLÁUSULAS GERAIS DE SEGURANÇA JURÍDICA, CONDUTA SANITÁRIA & RESPONSABILIDADES
    </div>
    
    <div style="font-size: 8.5px; color: #334155; line-height: 1.4; text-align: justify;">
      <p style="margin: 0 0 4px 0;">
        <strong>CLÁUSULA 1ª &bull; DA VERACIDADE ABSOLUTA DA ANAMNESE E ISENÇÃO POR OMISSÃO:</strong> Declaro, sob as penas da lei (Art. 299 do Código Penal), que todas as informações prestadas na Ficha de Anamnese são estritamente verdadeiras. Afirmo que <strong>NÃO OMITI</strong> gravidez, lactação, alergias medicamentosas, uso de anticoagulantes/AAS/fitoterápicos, doenças autoimunes, alterações hematológicas/coagulopatias, infecções ativas, histórico de herpes simples recorrente ou a presença de <strong>materiais definitivos inabsorvíveis prévios (PMMA / Metacrilato, Silicone industrial)</strong> na mesma região anatômica. Fica expressamente pactuado que a omissão dolosa ou culposa de dados clínicos isenta integralmente a clínica e os profissionais de qualquer responsabilidade civil, administrativa ou criminal por eventos adversos decorrentes.
      </p>
      <p style="margin: 0 0 4px 0;">
        <strong>CLÁUSULA 2ª &bull; DO DEVER DE CUMPRIMENTO DOS CUIDADOS DOMICILIARES (HOME CARE):</strong> Comprometo-me a cumprir rigorosamente o Guia de Orientações Pós-Procedimento fornecido pela clínica, não aplicando produtos caseiros, substâncias não autorizadas ou cosméticos ácidos sem expressa liberação, bem como a não permitir que terceiros não habilitados manipulem ou intervenham na área tratada.
      </p>
      <p style="margin: 0 0 4px 0;">
        <strong>CLÁUSULA 3ª &bull; DA CONSULTA DE RETORNO E EXTINÇÃO DE AJUSTES FORA DO PRAZO:</strong> Declaro estar ciente de que as avaliações clínicas e revisões de simetria possuem prazo peremptório determinado pelo profissional (entre o 15º e o 21º dia para toxina botulínica; 15 a 30 dias para preenchedores e bioestimuladores). O não comparecimento injustificado do paciente dentro deste período extingue qualquer obrigação da clínica quanto a retoques ou ajustes complementares sem novos custos de produtos e insumos.
      </p>
      <p style="margin: 0;">
        <strong>CLÁUSULA 4ª &bull; PROTEÇÃO DE DADOS SENSÍVEIS (LGPD) & POSSIBILIDADE DE USO DE IMAGEM:</strong> Autorizo a coleta, armazenamento e guarda segura dos meus dados clínicos, fichas e registros fotográficos de prontuário pela clínica, estritamente para fins de acompanhamento terapêutico, tutela da saúde e cumprimento de dever legal e sanitário (Art. 7º, II e Art. 11, II da Lei nº 13.709/2018). Fica expressamente estabelecido que qualquer eventual utilização, publicação ou divulgação de fotografias ou vídeos comparativos (antes e depois) para fins científicos, acadêmicos, educativos ou institucionais <strong>somente ocorrerá mediante prévia e expressa autorização formal por meio de Termo de Autorização de Uso de Imagem assinado</strong>, sendo vedada a veiculação sem o respectivo instrumento firmado.
      </p>
    </div>
  </div>

  <!-- Declaração Final de Consentimento Livre e Esclarecido -->
  <div style="border: 1px solid #fde68a; border-radius: 5px; padding: 6px 8px; margin-bottom: 6px; background: #fffbeb; font-size: 8.8px; color: #92400e; text-align: justify; line-height: 1.35;">
    <strong>DECLARAÇÃO FORMAL DE ACEITAÇÃO & LIVRE CONSENTIMENTO:</strong> Declaro que li, compreendi e concordo integralmente com todas as cláusulas deste termo, redigidas de forma clara e acessível. Tive tempo hábil para reflexão e oportunidade irrestrita para formular perguntas, as quais foram satisfatoriamente esclarecidas pelo(a) profissional. Não restando qualquer dúvida, confirmo minha decisão voluntária de submeter-me ao procedimento estético sob as condições acima pactuadas.
  </div>

  <!-- Assinaturas Formais com Validação Pericial -->
  <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 6px 8px; background: #ffffff;">
    <div style="font-size: 8.5px; font-weight: 800; color: #b45309; text-transform: uppercase; margin-bottom: 4px; text-align: center;">
      FORMALIZAÇÃO DO CONSENTIMENTO INFORMADO &bull; VALIDADE JURÍDICO-SANITÁRIA
    </div>
    <div style="display: flex; justify-content: space-between; text-align: center; font-size: 8.5px; margin-top: 10px;">
      <div style="width: 48%;">
        <div style="border-bottom: 1.5px solid #0f172a; height: 18px; margin-bottom: 2px;"></div>
        <div style="font-weight: bold; text-transform: uppercase; color: #0f172a;">${patient.nomeCliente}</div>
        <div style="font-size: 7.8px; color: #64748b;">Assinatura do(a) Paciente</div>
        <div style="font-size: 7.5px; color: #94a3b8;">Data de Assinatura: ${patient.data}</div>
      </div>
      <div style="width: 48%;">
        <div style="border-bottom: 1.5px solid #0f172a; height: 18px; margin-bottom: 2px;"></div>
        <div style="font-weight: bold; text-transform: uppercase; color: #0f172a;">${patient.profissionalResponsavel}</div>
        <div style="font-size: 7.8px; color: #64748b;">${patient.registroProfissional} &bull; Profissional Executante</div>
        <div style="font-size: 7.5px; color: #94a3b8;">${clinicData.nomeClinica || '{{nome_clinica}}'}</div>
      </div>
    </div>
  </div>
</div>
`;
  }


  // 5. INSTRUÇÕES PÓS-PROCEDIMENTO & HOME CARE (BLINDAGEM JURÍDICO-SANITÁRIA)
  if (docType === 'pos_procedimento') {
    let specificCareDetailedHtml = '';
    let returnScheduleText = '15 a 21 dias';

    if (procKey === 'toxina_botulinica') {
      returnScheduleText = '15º ao 21º dia (Obrigatório para revisão de simetria)';
      specificCareDetailedHtml = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">1. Primeiras 4 a 6 Horas (Fase Crítica de Fixação Muscular):</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; Mantenha a cabeça em posição ereta/vertical. <strong>NÃO deite a cabeça horizontalmente, não durma, não se deite de lado ou de bruços e não abaixe o tronco/cabeça</strong> para pegar objetos no chão nas primeiras 4 horas;<br>
            &bull; <strong>NÃO toque, não esfregue, não pressione e não massageie</strong> as regiões que receberam as injeções, a fim de evitar a migração indesejada da toxina para músculos vizinhos (prevenindo ptose palpebral).
          </span>
        </div>

        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">2. Primeiras 24 a 48 Horas (Repouso Fisiológico):</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; <strong>Abstenção Total de Atividade Física Intensa:</strong> Não pratique musculação, crossfit, corrida, treinos anaeróbicos pesados ou ginástica nas primeiras 24 a 48 horas;<br>
            &bull; <strong>Evitar Fontes de Calor Direto:</strong> Não tome banhos excessivamente quentes, não frequente saunas, não use secador de cabelos com ar quente direcionado ao rosto e evite cozinhar sobre vapores quentes;<br>
            &bull; <strong>Consumo de Bebidas Alcoólicas & Medicamentos:</strong> Evite o consumo excessivo de álcool e medicamentos anticoagulantes/AAS sem autorização médica, pois potencializam hematomas.
          </span>
        </div>

        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">3. Cronograma Biológico de Ação & Consulta Obrigatória de Revisão:</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; O efeito inicia-se gradualmente entre o <strong>2º e o 3º dia (48-72h)</strong>, atingindo seu pico máximo e estabilização clínica definitiva ao redor do <strong>15º dia</strong>;<br>
            &bull; <strong>Revisão de Simetria (15º ao 21º dia):</strong> O paciente deve comparecer presencialmente para registro fotográfico e eventuais complementações musculares. Retoques após o 21º dia não são realizados gratuitamente devido ao risco de imunogenicidade (efeito vacina / resistência de anticorpos).
          </span>
        </div>
      `;
    } else if (procKey === 'preenchimento_ah') {
      returnScheduleText = '15 a 30 dias (Acomodação tecidual)';
      specificCareDetailedHtml = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">1. Primeiras 24 a 48 Horas (Controle de Edema e Assepsia):</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; <strong>Compressas Frias:</strong> Aplicar compressas de gelo envolvidas em gaze/pano limpo sobre a região tratada por 10 minutos a cada 2 horas no primeiro dia (SEM pressionar o gel);<br>
            &bull; <strong>Proibição de Maquiagem & Toque:</strong> Não aplicar maquiagens convencionais, bases ou pós nos primeiros orifícios de punção por 24 horas para evitar contaminação bacteriana;<br>
            &bull; <strong>Posição de Dormir:</strong> Dormir de barriga para cima (decúbito dorsal) com a cabeça discretamente elevada por 2 travesseiros nos primeiros 5 dias. <strong>NÃO dormir de lado ou pressionando a face</strong>.
          </span>
        </div>

        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">2. Restrições Mecânicas, Esforço e Exposição Solar:</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; <strong>Proibição de Manipulação:</strong> NÃO massagear, apertar ou modelar o produto preenchedor por conta própria. A moldagem inicial já foi realizada pelo profissional executante;<br>
            &bull; <strong>Procedimentos Odontológicos:</strong> No caso de preenchimento labial ou perioral, evitar consultas odontológicas invasivas nas próximas 2 a 3 semanas;<br>
            &bull; <strong>Proteção Solar:</strong> Caso apresente pequenas equimoses (roxos), não se expor diretamente ao sol e utilizar protetor solar FPS 50+ a cada 3 horas para evitar pigmentação por hemossiderina.
          </span>
        </div>

        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">3. Protocolo de Monitoramento Vascular & Sinais de Alerta Imediato:</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; Fique atento(a) às primeiras 24-48 horas. Caso note <strong>dor intensa pulsátil não controlada, palidez cutânea repentina, clareamento excessivo da pele ou manchas arroxeadas marmorizadas em rede</strong>, contate imediatamente o plantão da clínica para intervenção com hialuronidase.
          </span>
        </div>
      `;
    } else if (procKey === 'bioestimulador') {
      returnScheduleText = '30 a 45 dias (Avaliação da neocolagênese)';
      specificCareDetailedHtml = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">1. Regra Inegociável da Massagem Domiciliar (5 x 5 x 5):</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; <strong>MASSAGEM OBRIGATÓRIA:</strong> Massageie a região tratada <strong>5 vezes ao dia, durante 5 minutos seguidos, por 5 dias consecutivos</strong>, utilizando creme hidratante neutro com movimentos circulares firmes;<br>
            &bull; A correta realização da massagem distribui homogeneamente as micropartículas bioestimuladoras, sendo o principal fator de prevenção contra a formação de nódulos ou granulomas dérmicos.
          </span>
        </div>

        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">2. Cuidados Sistêmicos, Hidratação & Repouso:</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; <strong>Ingestão Hídrica Abundante:</strong> Beba no mínimo 2,5 litros de água diariamente para fornecer substrato hídrico aos fibroblastos estimulados;<br>
            &bull; <strong>Atividade Física:</strong> Pausa de 24 a 48 horas em exercícios físicos intensos e esportes de impacto;<br>
            &bull; <strong>Fotoproteção:</strong> Protetor solar FPS 50+ diariamente para proteger a pele em fase de síntese colagênica.
          </span>
        </div>
      `;
    } else if (procKey === 'fios_pdo') {
      returnScheduleText = '15 a 30 dias (Acomodação dos cones/espículas)';
      specificCareDetailedHtml = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">1. Repouso Mecânico & Restrições de Mímica Facial (15 Dias):</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; <strong>Mastigação & Fonação:</strong> Evite abrir excessivamente a boca, gargalhar de forma exagerada e mastigar alimentos excessivamente duros ou crocantes nos primeiros 7 a 10 dias;<br>
            &bull; <strong>Proibição de Procedimentos Odontológicos:</strong> Não realize consultas ou tratamentos odontológicos nas próximas 3 a 4 semanas para não tracionar a musculatura mastigatória;<br>
            &bull; <strong>Posição de Dormir:</strong> Durma rigorosamente de barriga para cima (decúbito dorsal) com a cabeça apoiada em travesseiro macio pelos próximos 15 dias.
          </span>
        </div>

        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">2. Cuidados com os Pertuitos de Entrada & Atividades Físicas:</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; Mantenha os curativos e micropores limpos e secos conforme instruído pelo profissional;<br>
            &bull; <strong>NÃO esfregue ou massageie a face</strong> e não utilize aparelhos de limpeza ultrassônica/escovas rotativas por 30 dias;<br>
            &bull; Evite esportes de contato, musculação pesada e corrida nos primeiros 10 a 15 dias.
          </span>
        </div>
      `;
    } else if (procKey === 'biorreguladores') {
      returnScheduleText = '21 a 30 dias (Próxima etapa do protocolo)';
      specificCareDetailedHtml = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">1. Manejo das Micropápulas Dérmicas (Técnica BAP):</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; <strong>NÃO massagear ou comprimir as pápulas:</strong> Os pequenos pontos elevados nos locais de injeção são reservatórios dérmicos que se difundem naturalmente nos tecidos em <strong>24 a 48 horas</strong>;<br>
            &bull; <strong>Higiene e Assepsia:</strong> Lavar o rosto apenas com água e sabonete neutro após 6 horas. Não aplicar maquiagens não estéreis nas primeiras 24 horas.
          </span>
        </div>

        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">2. Hidratação Sistêmica & Fotoproteção FPS 50+:</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; <strong>Água:</strong> Ingerir no mínimo 2 a 2,5L de água por dia para potencializar a hidratação e a captação de água na matriz extracelular;<br>
            &bull; Evitar exposição solar direta e saunas por 48 horas. Aplicar protetor solar FPS 50+ a cada 3 horas.
          </span>
        </div>
      `;
    } else if (procKey === 'skinbooster') {
      returnScheduleText = '21 a 30 dias (Ciclo de hidratação dérmica)';
      specificCareDetailedHtml = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">1. Cuidados Imediatos Pós-Micropápulas:</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; Pequenos pontinhos elevados e vermelhidão são normais e desaparecem em 24 a 48 horas;<br>
            &bull; <strong>NÃO tocar na pele com as mãos sujas</strong> e não aplicar maquiagem nas primeiras 24 horas;<br>
            &bull; Evitar exercícios físicos intensos e transpiração excessiva por 24 horas.
          </span>
        </div>

        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">2. Hidratação Cutânea Complementar & Fotoproteção:</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; Usar hidratantes com ácido hialurônico tópico e água termal para acalmar a pele;<br>
            &bull; Uso indispensável de protetor solar FPS 50+ com reaplicação regular.
          </span>
        </div>
      `;
    } else if (procKey === 'laser_lavieen') {
      returnScheduleText = '15 a 30 dias (Avaliação do clareamento e textura)';
      specificCareDetailedHtml = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">1. MANEJO DAS MICROCROSTAS ("EFEITO AREIA") & PROIBIÇÃO DE ARRANCAR:</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; <strong>NUNCA ESFOLIE OU PUXE AS MICROCASQUINHAS ESCURAS</strong>. Elas caem sozinhas entre o 3º e 7º dia. Arrancá-las provocará manchas hipercrômicas irreversíveis;<br>
            &bull; Sensação de calor/ardor nas primeiras 4 a 6 horas pode ser aliviada com compressas frias de soro fisiológico ou água termal em spray gelada.
          </span>
        </div>

        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">2. Barreira Reparadora & Fotoproteção Mineral FPS 50+:</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; Aplicar pomada/creme restaurador dérmico (ex: Cicaplast B5, Epidrat Calm) de 3 a 4 vezes ao dia;<br>
            &bull; Fotoproteção FPS 50+ a cada 2 a 3 horas e abstenção total de sol direto, praia e piscina por 15 dias.
          </span>
        </div>
      `;
    } else if (procKey === 'laser_co2') {
      returnScheduleText = '7 a 14 dias (Revisão da epitelização pós-ablação)';
      specificCareDetailedHtml = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">1. CUIDADOS OCLUSIVOS NA FASE EXSUDATIVA (PRIMEIROS 5 A 7 DIAS):</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; Manter a pele constantemente umedecida com pomada cicatrizante/oclusiva prescrita (ex: Aquaphor, Cicaplast B5, Bepantol Derma) sem deixar a pele secar;<br>
            &bull; <strong>PROIBIÇÃO TERMINANTE DE ARRANCAR CROSTAS OU COÇAR</strong> para evitar cicatrizes atróficas e manchas;<br>
            &bull; Tomar rigorosamente a medicação antiviral prescrita (caso indicada para prevenção de herpes).
          </span>
        </div>

        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">2. Bloqueio Solar Absoluto (Mínimo 60 Dias):</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; Usar protetor solar físico/mineral FPS 50+ a cada 2 horas a partir da reepitelização e barreiras físicas (chapéu, óculos de sol). Zero exposição solar direta.
          </span>
        </div>
      `;
    } else if (procKey === 'ultrassom_hifu') {
      returnScheduleText = '30 a 60 dias (Avaliação da remodelação do SMAS)';
      specificCareDetailedHtml = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">1. Manejo da Mialgia & NÃO Uso de Anti-inflamatórios (AINEs):</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; Sensação de "dor muscular de treino" na mandíbula e maçãs do rosto por 3 a 7 dias é absolutamente normal e comprova o aquecimento térmico do SMAS;<br>
            &bull; <strong>NÃO utilize anti-inflamatórios (ex: Ibuprofeno, Cetoprofeno, Nimesulida, Corticoides)</strong> sem orientação, pois eles inibem o processo inflamatório benéfico responsável pela formação do novo colágeno. Se houver dor, use analgésicos simples (Paracetamol/Dipirona).
          </span>
        </div>

        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">2. Rotina Domiciliar & Fotoproteção:</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; Não há restrição para retorno imediato ao trabalho e atividades leves. Manter hidratação cutânea e protetor solar FPS 50+.
          </span>
        </div>
      `;
    } else if (procKey === 'endolaser') {
      returnScheduleText = '7 a 15 dias (Revisão da retração e pontos de entrada)';
      specificCareDetailedHtml = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">1. USO OBRIGATÓRIO DA FAIXA COMPRESSIVA MENTONIANA:</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; <strong>Uso contínuo:</strong> Usar a faixa elástica submentoniana 24h por dia nas primeiras 48 a 72 horas (retirando apenas para banho e assepsia dos micropontos);<br>
            &bull; <strong>Uso noturno:</strong> Manter o uso da faixa para dormir por mais 10 a 15 dias para garantir a correta aderência da pele ao plano profundo e evitar seromas.
          </span>
        </div>

        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">2. Assepsia dos Pertuitos, Drenagem & Parestesias:</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; Higienizar os micropontos de inserção da fibra com soro e sabonete antisséptico;<br>
            &bull; Iniciar sessões de drenagem linfática facial pós-operatória quando liberado pelo profissional;<br>
            &bull; Parestesias (dormência transitória) são esperadas e regridem progressivamente em algumas semanas.
          </span>
        </div>
      `;
    } else if (procKey === 'peeling') {
      returnScheduleText = '7 a 14 dias (Revisão da barreira cutânea)';
      specificCareDetailedHtml = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">1. PROIBIÇÃO TERMINANTE DE ARRANCAR AS PELES SOLTAS:</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; <strong>NUNCA PUXE, ESFOLIE, ARRANQUE OU COCE AS CROSTAS OU PELES SOLTAS</strong>. O desprendimento deve ser 100% natural. A remoção mecânica forçada causa lesões dérmicas profundas, cicatrizes permanentes e <strong>Hipercromia Pós-Inflamatória (manchas escuras irreversíveis)</strong>, cuja responsabilidade é exclusiva do paciente em caso de descumprimento.
          </span>
        </div>

        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">2. Higienização Suave, Reparação Intensiva & Fotoproteção:</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; <strong>Higienização:</strong> Lavar suavemente com sabonete neutro ou loção calmante com água fria, secando com toalha macia dando leves batidinhas (sem esfregar);<br>
            &bull; <strong>Hidratação Reparadora:</strong> Aplicar pomada/creme calmante reparador de barreira (ex: Pantenol, Cicaplast B5, Epidrat Calm) várias vezes ao dia, mantendo a pele constantemente umedecida;<br>
            &bull; <strong>Fotoproteção FPS 50+:</strong> Aplicação rigorosa a cada 2 a 3 horas, mesmo em ambientes fechados. Proibição de exposição direta ao sol, piscina, praia e calor de forno/sauna.
          </span>
        </div>
      `;
    } else if (procKey === 'microagulhamento') {
      returnScheduleText = '15 a 30 dias (Ciclo neocolagênico)';
      specificCareDetailedHtml = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">1. Primeiras 24 Horas (Microcanais Abertos & Assepsia Estrita):</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; <strong>NÃO tocar na pele com as mãos sujas/desprotegidas</strong>;<br>
            &bull; <strong>NÃO aplicar maquiagem convencional, pós, protetor solar com cor ou cosméticos ácidos nas primeiras 24 horas</strong>. Utilizar exclusivamente o sérum estéril pós-procedimento prescrito;<br>
            &bull; Higienizar o rosto apenas com água termal ou soro fisiológico estéril no primeiro dia.
          </span>
        </div>

        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">2. Cuidados a partir de 24h & Fotoproteção:</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; Iniciar o uso regular de protetor solar FPS 50+ após as primeiras 24h, reaplicando a cada 3 horas;<br>
            &bull; Não se expor ao sol direto e evitar atividades físicas com sudorese excessiva por 48 horas.
          </span>
        </div>
      `;
    } else if (procKey === 'lipoenzimatica') {
      returnScheduleText = '7 a 15 dias (Próxima sessão programada)';
      specificCareDetailedHtml = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">1. Ingestão Hídrica Abundante & Estímulo Metabólico:</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; <strong>Ingestão de Água:</strong> Beba obrigatoriamente de <strong>2,5 a 3 litros de água por dia</strong> para auxiliar o sistema linfático e renal na metabolização e depuração dos lipídios lisados;<br>
            &bull; Mantenha uma dieta equilibrada com redução de carboidratos refinados, frituras e bebidas alcoólicas durante todo o protocolo.
          </span>
        </div>

        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">2. Processo Inflamatório Local & Uso de Cinta/Compressão:</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; Sensação de dor tipo contusão, inchaço volumoso e calor local nas primeiras 48 a 72h são esperados e demonstram a ação lipolítica;<br>
            &bull; Use a cinta modeladora ou faixa submentual conforme indicado;<br>
            &bull; Não exponha a região tratada ao sol enquanto houver hematomas ou roxos.
          </span>
        </div>
      `;
    } else if (procKey === 'gluteos') {
      returnScheduleText = '15 a 30 dias (Acomodação volumétrica e colágeno)';
      specificCareDetailedHtml = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">1. Posição Corporal & Restrições de Pressão (Primeiras 48 a 72h):</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; <strong>Evitar Pressão Prolongada:</strong> Evite sentar-se por períodos prolongados sobre superfícies duras nas primeiras 48 horas. Se necessário, use almofada de alívio de pressão;<br>
            &bull; Durma preferencialmente de bruços (decúbito ventral) ou de lado nas primeiras 3 noites.
          </span>
        </div>

        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">2. Pausa em Treinos Pesados & Assepsia:</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; <strong>Repouso Físico:</strong> Pausa de 7 a 10 dias em treinos pesados de glúteos e pernas (agachamentos, leg press, elevação pélvica);<br>
            &bull; Mantenha os pontos de entrada higienizados com clorexidina e curativo até o fechamento completo da pele.
          </span>
        </div>
      `;
    } else if (procKey === 'peim') {
      returnScheduleText = '15 a 21 dias (Avaliação da esclerose vascular)';
      specificCareDetailedHtml = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">1. PROIBIÇÃO RIGOROSA DE EXPOSIÇÃO SOLAR:</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; <strong>NÃO SE EXPOR AO SOL, PRAIA OU PISCINA</strong> enquanto houver qualquer sinal de hematoma ou marquinha escura nas pernas. O contato do ferro do sangue extravasado com a radiação solar provoca manchas acastanhadas (hipercromia por hemossiderina) de difícil remoção.
          </span>
        </div>

        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">2. Meias Elásticas & Atividades Físicas:</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; Utilize meias elásticas de compressão graduada conforme prescrito;<br>
            &bull; Caminhadas leves são recomendadas. Evite musculação pesada de pernas nas primeiras 48 horas.
          </span>
        </div>
      `;
    } else if (procKey === 'laser_tecnologias') {
      returnScheduleText = '15 a 30 dias (Reavaliação tecidual)';
      specificCareDetailedHtml = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">1. Cuidados Térmicos Imediatos & Hidratação Calmante:</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; Aplique compressas geladas ou água termal fria para alívio do calor dérmico residual;<br>
            &bull; Use pomadas reparadoras e hidratantes calmantes várias vezes ao dia. <strong>NÃO puxe as microcrostas que se formarem</strong>.
          </span>
        </div>

        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">2. Fotoproteção Incondicional FPS 50+:</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; Aplique filtro solar com proteção UVA/UVB e luz visível a cada 2 a 3 horas rigorosamente por no mínimo 30 dias.
          </span>
        </div>
      `;
    } else if (procKey === 'criolipolise') {
      returnScheduleText = '30 a 60 dias (Avaliação da apoptose adipocitária)';
      specificCareDetailedHtml = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">1. Cuidados Domiciliares & Ingestão Hídrica:</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; Beba no mínimo 2,5 litros de água diariamente e pratique atividades aeróbicas regulares após 48h para potencializar a oxidação lipídica;<br>
            &bull; Dormência, perda transitória de sensibilidade ou rigidez na área tratada são reações fisiológicas normais que regridem espontaneamente em 2 a 4 semanas.
          </span>
        </div>
      `;
    } else if (procKey === 'limpeza_pele') {
      returnScheduleText = '30 dias (Manutenção do ciclo celular)';
      specificCareDetailedHtml = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">1. Cuidados Pós-Extração & Fotoproteção:</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; <strong>NÃO espremer ou manipular a pele</strong> após o procedimento;<br>
            &bull; Evite maquiagens pesadas nas primeiras 12 a 24 horas e não use ácidos/esfoliantes por 48 horas;<br>
            &bull; Protetor solar FPS 50+ a cada 3 horas.
          </span>
        </div>
      `;
    } else if (procKey === 'tricologia') {
      returnScheduleText = '15 a 30 dias (Próxima sessão capilar)';
      specificCareDetailedHtml = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">1. Cuidados com o Couro Cabeludo:</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; <strong>Lavagem:</strong> Não lave os cabelos pelas primeiras 6 a 12 horas pós-aplicação;<br>
            &bull; <strong>Químicas:</strong> Não faça tinturas, descolorações ou alisamentos nos próximos 7 a 10 dias;<br>
            &bull; Evite uso de bonés, chapéus ou capacetes apertados no dia da aplicação.
          </span>
        </div>
      `;
    } else if (procKey === 'soroterapia') {
      returnScheduleText = 'Conforme protocolo prescrito';
      specificCareDetailedHtml = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">1. Cuidados com o Sítio de Infusão:</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; Mantenha o curativo da punção venosa limpo e seco por pelo menos 2 horas;<br>
            &bull; Mantenha boa hidratação oral ao longo do dia e relate qualquer sensibilidade incomum.
          </span>
        </div>
      `;
    } else {
      returnScheduleText = '15 a 21 dias';
      specificCareDetailedHtml = `
        <div style="margin-bottom: 6px; padding: 5px 8px; background: #eff6ff; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <strong style="color: #1e40af; font-size: 9.2px;">1. Cuidados Gerais & Repouso:</strong><br>
          <span style="font-size: 8.5px; color: #1e293b; line-height: 1.35;">
            &bull; Evitar manipulação excessiva, esfregaço ou atrito mecânico na área tratada;<br>
            &bull; Higienização suave com sabonete neutro e hidratação recomendada pelo profissional;<br>
            &bull; Uso indispensável de protetor solar FPS 50+ com reaplicação a cada 3 horas.
          </span>
        </div>
      `;
    }

    return `
<div style="font-family: 'Segoe UI', Arial, sans-serif; color: #0f172a; line-height: 1.45; font-size: 10px;">
  <!-- Cabeçalho Oficial Guia Home Care -->
  <div style="border: 2px solid #2563eb; border-radius: 6px; padding: 6px 10px; background: #ffffff; margin-bottom: 8px;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="width: 22%; vertical-align: middle; border-right: 1.5px solid #cbd5e1; padding-right: 8px;">
          <div style="font-size: 11.5px; font-weight: 900; color: #1d4ed8; text-transform: uppercase;">HOME CARE</div>
          <div style="font-size: 8px; font-weight: bold; color: #475569;">GUIA CLÍNICO OFICIAL</div>
          <div style="font-size: 7.5px; color: #64748b; margin-top: 2px;">Protocolo Domiciliar Pós-Ato</div>
        </td>
        <td style="width: 53%; padding: 0 10px; vertical-align: middle;">
          <div style="font-size: 11.5px; font-weight: 800; color: #0f172a; text-transform: uppercase;">
            ORIENTAÇÕES E CUIDADOS PÓS-PROCEDIMENTO &bull; ${cleanDocTitle.toUpperCase()}
          </div>
          <div style="font-size: 8.5px; color: #334155; margin-top: 1px;">
            <strong>${clinicData.nomeClinica || '{{nome_clinica}}'}</strong> &bull; RT: ${clinicData.responsavel || clinicData.responsavelTecnico || '{{responsavel_tecnico}}'} (${clinicData.registroConselho || 'Conselho Regional'})
          </div>
        </td>
        <td style="width: 25%; vertical-align: middle; border-left: 1.5px solid #cbd5e1; padding-left: 8px; font-size: 8px; color: #334155; line-height: 1.35;">
          <div><strong>Paciente:</strong> ${patient.nomeCliente}</div>
          <div><strong>Data:</strong> ${patient.data}</div>
          <div><strong>Retorno Previsto:</strong> <span style="color: #1d4ed8; font-weight: bold;">${returnScheduleText}</span></div>
        </td>
      </tr>
    </table>
  </div>

  <!-- Preâmbulo de Conscientização Sanitária -->
  <div style="border: 1px solid #bfdbfe; border-radius: 5px; padding: 5px 8px; margin-bottom: 6px; background: #eff6ff; font-size: 8.8px; text-align: justify; color: #1e3a8a;">
    <strong>Prezado(a) ${patient.nomeCliente},</strong> o sucesso terapêutico, a durabilidade biológica e a segurança da sua saúde dependem diretamente do cumprimento rigoroso das orientações domiciliares pós-procedimento. A execução técnica realizada em cabine corresponde a 50% do resultado; os outros 50% dependem da resposta biológica e do seu seguimento fiel a este guia.
  </div>

  <!-- 1. DIRETRIZES CLÍNICAS ESPECÍFICAS POR PROCEDIMENTO -->
  <div style="border: 1.5px solid #3b82f6; border-radius: 5px; padding: 6px 8px; margin-bottom: 6px; background: #ffffff;">
    <div style="font-size: 9.5px; font-weight: 800; color: #1d4ed8; text-transform: uppercase; border-bottom: 1.5px solid #3b82f6; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between;">
      <span>PROTOCOLO DE CUIDADOS ESPECÍFICOS &bull; ${cleanDocTitle.toUpperCase()}</span>
      <span style="font-size: 8px; font-weight: bold; background: #dbeafe; color: #1e40af; padding: 1px 4px; border-radius: 3px;">SEGUIMENTO OBRIGATÓRIO</span>
    </div>
    ${specificCareDetailedHtml}
  </div>

  <!-- 2. SINAIS DE ALERTA & PROTOCOLO DE URGÊNCIA -->
  <div style="border: 1.5px solid #ef4444; border-radius: 5px; padding: 6px 8px; margin-bottom: 6px; background: #fff5f5;">
    <div style="font-size: 9.5px; font-weight: 800; color: #b91c1c; text-transform: uppercase; border-bottom: 1px solid #fca5a5; padding-bottom: 2px; margin-bottom: 3px; display: flex; justify-content: space-between;">
      <span>SINAIS DE ALERTA & CONTATO DE EMERGÊNCIA</span>
      <span style="font-size: 7.5px; font-weight: bold; background: #fee2e2; color: #991b1b; padding: 1px 4px; border-radius: 3px;">ATENDIMENTO PRIORITÁRIO</span>
    </div>
    <div style="font-size: 8.5px; color: #7f1d1d; line-height: 1.35; text-align: justify;">
      Vermelhidão leve, pequeno edema e sensibilidade transitória são esperados. <strong>Contate o canal de atendimento da clínica imediatamente</strong> caso apresente: 
      <em>(a) Dor intensa, aguda ou pulsátil desproporcional; (b) Palidez súbita ou manchas arroxeadas marmorizadas em padrão de rede; (c) Formação de bolhas ou calor excessivo progressivo; (d) Febre ou secreção purulenta</em>.
    </div>
  </div>

  <!-- 3. CLÁUSULA DE SEGURANÇA JURÍDICA E SANITÁRIA (ISENÇÃO POR NEGLIGÊNCIA HOME CARE) -->
  <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 5px 8px; margin-bottom: 6px; background: #f8fafc; font-size: 8.3px; color: #334155; line-height: 1.35; text-align: justify;">
    <strong style="color: #0f172a;">TERMO DE CIÊNCIA & RESPONSABILIDADE DO PACIENTE:</strong> Declaro que recebi cópia integral deste Guia de Orientações e Cuidados Pós-Procedimento, tendo sido detalhadamente instruído(a) pelo(a) profissional sobre todas as condutas a serem adotadas. Comprometo-me a cumprir fielmente todas as determinações. Declaro plena ciência de que o descumprimento injustificado dos cuidados domiciliares, a manipulação indevida da área por pessoas não habilitadas, a exposição solar desprotegida ou a omissão de comunicação imediata perante sinais de alerta caracterizam culpa exclusiva do paciente (Art. 14, § 3º, II do CDC e Art. 393 do Código Civil), isentando a clínica e seus profissionais de responsabilidade por complicações advindas de tal negligência.
  </div>

  <!-- 4. CONTATOS DA CLÍNICA & ASSINATURAS FORMAIS -->
  <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 6px 8px; background: #ffffff;">
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 6px; font-size: 8.5px;">
      <div>
        <strong style="color: #1e40af;">CANAL OFICIAL DE SUPORTE DA CLÍNICA:</strong> 
        <span style="color: #0f172a; font-weight: bold;">${clinicData.telefone || clinicData.whatsapp || '(11) 99999-9999'}</span> &bull; 
        <span style="color: #64748b;">${clinicData.endereco || 'Atendimento Presencial e Teleatendimento'}</span>
      </div>
      <div>
        <span style="background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; font-weight: bold; padding: 2px 6px; border-radius: 4px; font-size: 8px;">
          Retorno: ${returnScheduleText}
        </span>
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; text-align: center; font-size: 8.5px; margin-top: 8px;">
      <div style="width: 48%;">
        <div style="border-bottom: 1.5px solid #0f172a; height: 18px; margin-bottom: 2px;"></div>
        <div style="font-weight: bold; text-transform: uppercase; color: #0f172a;">${patient.nomeCliente}</div>
        <div style="font-size: 7.8px; color: #64748b;">Assinatura do(a) Paciente &bull; Confirmação de Recebimento</div>
        <div style="font-size: 7.5px; color: #94a3b8;">Data: ${patient.data}</div>
      </div>
      <div style="width: 48%;">
        <div style="border-bottom: 1.5px solid #0f172a; height: 18px; margin-bottom: 2px;"></div>
        <div style="font-weight: bold; text-transform: uppercase; color: #0f172a;">${patient.profissionalResponsavel}</div>
        <div style="font-size: 7.8px; color: #64748b;">${patient.registroProfissional} &bull; Profissional Executante</div>
        <div style="font-size: 7.5px; color: #94a3b8;">${clinicData.nomeClinica || '{{nome_clinica}}'}</div>
      </div>
    </div>
  </div>
</div>
`;
  }

  // 6. POP DO PROCEDIMENTO (PROCEDIMENTO OPERACIONAL PADRÃO PARA VIGILÂNCIA SANITÁRIA / ANVISA)
  if (docType === 'pop_procedimento' || docType === 'antes_depois' || docType === 'plano_tratamento') {
    const popData: ProcedurePopData = PROCEDURE_POP_REGISTRY[procKey] || {
      popCode: 'POP-EST-GER-16',
      categoryTitle: 'Procedimentos Estéticos Especializados',
      technicalName: `Procedimento Operacional Padrão • ${cleanDocTitle}`,
      sanitaryScope: `Execução técnica padronizada e segura de ${cleanDocTitle} em conformidade com as Boas Práticas de Serviços de Saúde (RDC ANVISA nº 63/2011).`,
      scientificFoundation: `A aplicação da técnica estética de ${cleanDocTitle} segue as diretrizes da literatura dermatológica e estética especializada, promovendo renovação celular, reestruturação tecidual e segurança biológica sob técnica asséptica.`,
      specificMaterials: [
        `Insumos, cosmecêuticos e princípios ativos específicos com registro/notificação obrigatória na ANVISA.`,
        `Materiais de punção, agulhas e seringas descartáveis estéreis com selo do INMETRO e ANVISA.`,
        `Solução antisséptica padronizada (Clorexidina 0,5% a 2% ou Álcool 70%).`,
        `Compressas de gaze estéreis, campo fenestrado cirúrgico e fita microporosa hipoalergênica.`
      ],
      executionPhases: [
        {
          title: 'Fase 1 • Paramentação e Assepsia Prévia',
          description: 'Higienização rigorosa das mãos com degermante antisséptico, colocação de EPIs completos. Limpeza e antissepsia ampla da área de tratamento.'
        },
        {
          title: 'Fase 2 • Avaliação Anatômica e Demarcação',
          description: `Inspeção clínica minuciosa da área a ser tratada para ${cleanDocTitle}, demarcando os pontos anatômicos com lápis dermográfico cirúrgico.`
        },
        {
          title: 'Fase 3 • Execução Técnica Conforme Diretrizes',
          description: `Aplicação metódica do procedimento de ${cleanDocTitle} respeitando os limites biológicos teciduais, dosimetria e tempo de ação recomendados pelo fabricante.`
        },
        {
          title: 'Fase 4 • Finalização, Curativo e Assepsia Terminal',
          description: 'Remoção de sujidades e resíduos com gaze estéril, aplicação de agente calmante ou curativo estéril e fotoproteção solar FPS 50+.'
        }
      ],
      wasteDisposal: {
        groupE: 'Perfurocortantes (agulhas, cânulas, ampolas de vidro) descartados no coletor rígido Descarpack até 2/3 da capacidade.',
        groupA: 'Resíduos biológicos (gazes com sangue/exsudato, luvas usadas) no saco plástico branco leitoso identificado.',
        groupD: 'Embalagens secundárias de papelão e papel toalha em lixeira comum com pedal.'
      },
      interventionsAndUrgency: 'Em caso de intercorrência clínica ou reação alérgica aguda: interromper o procedimento, prestar os primeiros socorros imediatos e acionar supervisão médica para conduta clínica medicamentosa.',
      references: [
        'ANVISA. Resolução RDC nº 63/2011 – Boas Práticas de Funcionamento para Serviços de Saúde.',
        'ANVISA. Resolução RDC nº 222/2018 – Regulamento Técnico para o Gerenciamento de Resíduos de Serviços de Saúde (PGRSS).',
        'Conselho Regional e Federal de Classe – Normativas de Habilitação e Biossegurança em Procedimentos Estéticos Invasivos e Não-Invasivos.'
      ]
    };

    const materialsHtml = popData.specificMaterials
      .map((mat) => `<li style="margin-bottom: 3.5px; line-height: 1.35;">${mat}</li>`)
      .join('');

    const prepHtml = popData.preparationAndReconstitution
      ? `
        <div style="margin-top: 6px; padding: 6px 8px; background: #f0fdf4; border-left: 3px solid #16a34a; border-radius: 0 4px 4px 0; font-size: 8.5px; color: #166534; line-height: 1.4;">
          <strong>🧪 Reconstituição & Preparo Asséptico Rigoroso:</strong> ${popData.preparationAndReconstitution}
        </div>
      `
      : '';

    const phasesHtml = popData.executionPhases
      .map(
        (phase, idx) => `
        <div style="margin-bottom: 6px; padding: 6px 8px; background: #f8fafc; border-left: 3.5px solid #2563eb; border-radius: 0 4px 4px 0;">
          <div style="font-weight: 800; font-size: 8.8px; color: #1e3a8a; margin-bottom: 2px;">${phase.title}</div>
          <div style="font-size: 8.4px; color: #334155; line-height: 1.4; text-align: justify;">${phase.description}</div>
        </div>
      `
      )
      .join('');

    const refsHtml = popData.references
      .map((ref) => `<li style="margin-bottom: 2.5px; line-height: 1.35;">${ref}</li>`)
      .join('');

    return `
<div style="font-family: 'Segoe UI', Arial, sans-serif; color: #0f172a; line-height: 1.45; font-size: 10px;">
  <!-- ==================== PÁGINA 1: CABEÇALHO OFICIAL, MATERIAIS & EXECUÇÃO ==================== -->
  
  <!-- Cabeçalho Oficial ANVISA / RDC -->
  <div style="border: 2px solid #1e3a8a; border-radius: 6px; padding: 6px 10px; background: #ffffff; margin-bottom: 8px;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="width: 22%; vertical-align: middle; border-right: 1.5px solid #cbd5e1; padding-right: 8px;">
          <div style="font-size: 12px; font-weight: 900; color: #1e3a8a; text-transform: uppercase;">POP ANVISA</div>
          <div style="font-size: 8px; font-weight: bold; color: #475569;">VIGILÂNCIA SANITÁRIA</div>
          <div style="font-size: 7.5px; color: #64748b; margin-top: 2px;">RDC 63/2011 &bull; RDC 222/2018</div>
        </td>
        <td style="width: 53%; padding: 0 10px; vertical-align: middle;">
          <div style="font-size: 11.5px; font-weight: 800; color: #0f172a; text-transform: uppercase;">
            PROCEDIMENTO OPERACIONAL PADRÃO &bull; ${popData.technicalName.toUpperCase()}
          </div>
          <div style="font-size: 8.5px; color: #334155; margin-top: 1px;">
            <strong>${clinicData.nomeClinica || '{{nome_clinica}}'}</strong> &bull; RT: ${clinicData.responsavel || clinicData.responsavelTecnico || '{{responsavel_tecnico}}'} (${clinicData.registroConselho || 'Conselho Regional'})
          </div>
        </td>
        <td style="width: 25%; vertical-align: middle; border-left: 1.5px solid #cbd5e1; padding-left: 8px; font-size: 8px; color: #334155; line-height: 1.35;">
          <div><strong>Código:</strong> <span style="color: #1e3a8a; font-weight: bold;">${popData.popCode}</span></div>
          <div><strong>Categoria:</strong> ${popData.categoryTitle}</div>
          <div><strong>Versão:</strong> 04/2026 &bull; <strong>Rev.:</strong> Anual</div>
          <div><strong>Status:</strong> <span style="color: #047857; font-weight: bold;">APROVADO / VIGENTE</span></div>
        </td>
      </tr>
    </table>
  </div>

  <!-- 1. OBJETIVO, CAMPO DE APLICAÇÃO & FUNDAMENTAÇÃO CIENTÍFICA -->
  <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 6px 8px; margin-bottom: 6px; background: #ffffff;">
    <div style="font-size: 9.5px; font-weight: 800; color: #1e3a8a; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between;">
      <span>1. OBJETIVO, CAMPO DE APLICAÇÃO & FUNDAMENTAÇÃO BIOMÉDICA</span>
      <span style="font-size: 8px; color: #64748b;">ANVISA RDC nº 63/2011</span>
    </div>
    <p style="margin: 0 0 4px 0; font-size: 8.6px; color: #334155; text-align: justify; line-height: 1.4;">
      <strong>Finalidade Sanitária:</strong> ${popData.sanitaryScope}
    </p>
    <div style="font-size: 8.5px; color: #1e3a8a; background: #eff6ff; padding: 4px 6px; border-radius: 4px; line-height: 1.38; text-align: justify;">
      <strong>Mecanismo Farmacológico & Biológico:</strong> ${popData.scientificFoundation}
    </div>
  </div>

  <!-- 2. PARAMENTAÇÃO, EQUIPAMENTOS DE PROTEÇÃO INDIVIDUAL (EPIs) & COLETIVA (EPC) -->
  <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 6px 8px; margin-bottom: 6px; background: #ffffff;">
    <div style="font-size: 9.5px; font-weight: 800; color: #1e3a8a; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
      2. EQUIPAMENTOS DE PROTEÇÃO INDIVIDUAL (EPIs) & COLETIVA (EPC) OBRIGATÓRIOS
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 8.3px; color: #334155;">
      <div>
        <div style="font-weight: bold; color: #0f172a; margin-bottom: 1px;">EPIs do(a) Profissional Executor(a):</div>
        <ul style="margin: 0; padding-left: 14px; line-height: 1.35;">
          <li>Luvas cirúrgicas estéreis (injetáveis) ou luvas de procedimento descartáveis;</li>
          <li>Máscara cirúrgica descartável tripla com filtro bacteriológico (ou N95/PFF2);</li>
          <li>Óculos de proteção com vedação lateral / Protetor Facial de acrílico;</li>
          <li>Jaleco de manga longa ou avental cirúrgico impermeável estéril;</li>
          <li>Touca descartável com cobertura total do couro cabeludo.</li>
        </ul>
      </div>
      <div>
        <div style="font-weight: bold; color: #0f172a; margin-bottom: 1px;">Proteção do Paciente e EPC da Cabine:</div>
        <ul style="margin: 0; padding-left: 14px; line-height: 1.35;">
          <li>Touca descartável e campo cirúrgico fenestrado estéril;</li>
          <li>Lençol de papel descartável trocado a cada atendimento;</li>
          <li>Coletor rígido de perfurocortantes (Descarpack) ao alcance imediato;</li>
          <li>Lixeira acionada por pedal para resíduo biológico infectante (Grupo A);</li>
          <li>Dispensador de sabonete líquido degermante e álcool 70%.</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- 3. MATERIAIS, INSTRUMENTAIS & FÁRMACOS ESPECÍFICOS (REGISTRO ANVISA) -->
  <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 6px 8px; margin-bottom: 6px; background: #ffffff;">
    <div style="font-size: 9.5px; font-weight: 800; color: #1e3a8a; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px; display: flex; justify-content: space-between;">
      <span>3. MATERIAIS, FÁRMACOS & INSTRUMENTAIS ESPECÍFICOS (ANVISA OBRIGATÓRIO)</span>
      <span style="font-size: 7.8px; font-weight: bold; color: #15803d; background: #dcfce7; padding: 1px 4px; border-radius: 3px;">100% REGISTRADOS</span>
    </div>
    <ul style="margin: 0; padding-left: 14px; font-size: 8.4px; color: #334155;">
      ${materialsHtml}
    </ul>
    ${prepHtml}
  </div>

  <!-- 4. PROCEDIMENTO OPERACIONAL PASSO A PASSO (EXECUÇÃO TÉCNICA CLÍNICA) -->
  <div style="border: 1.5px solid #2563eb; border-radius: 5px; padding: 6px 8px; margin-bottom: 8px; background: #ffffff;">
    <div style="font-size: 9.8px; font-weight: 900; color: #1e3a8a; text-transform: uppercase; border-bottom: 1.5px solid #2563eb; padding-bottom: 2px; margin-bottom: 5px; display: flex; justify-content: space-between; align-items: center;">
      <span>4. PROCEDIMENTO PASSO A PASSO &bull; PROTOCOLO CLÍNICO & BIOSSEGURANÇA</span>
      <span style="font-size: 8px; font-weight: bold; background: #dbeafe; color: #1e40af; padding: 1px 4px; border-radius: 3px;">EXECUÇÃO PADRONIZADA</span>
    </div>
    ${phasesHtml}
  </div>

  <!-- ==================== DIVISOR DE PÁGINA / CONTINUIDADE TÉCNICA ==================== -->
  <div style="margin: 12px 0 8px 0; border-top: 1.5px dashed #94a3b8; text-align: center; position: relative;">
    <span style="position: relative; top: -8px; background: #ffffff; padding: 0 8px; font-size: 7.5px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">
      POP ANVISA &bull; PÁGINA 2 / 2 &bull; SEGURANÇA SANITÁRIA, PGRSS & DIRETRIZES
    </span>
  </div>

  <!-- 5. GERENCIAMENTO E DESCARTE DE RESÍDUOS (PGRSS / ANVISA RDC 222/2018) -->
  <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 6px 8px; margin-bottom: 6px; background: #ffffff;">
    <div style="font-size: 9.5px; font-weight: 800; color: #1e3a8a; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
      5. GERENCIAMENTO E DESCARTE DE RESÍDUOS (PGRSS &bull; ANVISA RDC 222/2018)
    </div>
    <table style="width: 100%; border-collapse: collapse; font-size: 8.2px;" border="1" bordercolor="#cbd5e1">
      <tr style="background: #f1f5f9; font-weight: bold; color: #0f172a;">
        <th style="padding: 3px 5px; text-align: left; width: 22%;">CLASSIFICAÇÃO</th>
        <th style="padding: 3px 5px; text-align: left; width: 40%;">ITENS DESCARTADOS DESTE PROCEDIMENTO</th>
        <th style="padding: 3px 5px; text-align: left; width: 38%;">RECIPIENTE & DESTINAÇÃO</th>
      </tr>
      <tr>
        <td style="padding: 3px 5px; font-weight: bold; color: #b91c1c;">GRUPO E (Perfurocortantes)</td>
        <td style="padding: 3px 5px; color: #334155;">${popData.wasteDisposal.groupE}</td>
        <td style="padding: 3px 5px; color: #334155;">Caixa rígida amarela (Descarpack) - Proibido reencapar agulha. Descarte até 2/3 da capacidade.</td>
      </tr>
      <tr style="background: #fafafa;">
        <td style="padding: 3px 5px; font-weight: bold; color: #c2410c;">GRUPO A (Biológico / Infectante)</td>
        <td style="padding: 3px 5px; color: #334155;">${popData.wasteDisposal.groupA}</td>
        <td style="padding: 3px 5px; color: #334155;">Saco plástico branco leitoso identificado com o símbolo internacional de risco biológico.</td>
      </tr>
      <tr>
        <td style="padding: 3px 5px; font-weight: bold; color: #475569;">GRUPO D (Comum / Reciclável)</td>
        <td style="padding: 3px 5px; color: #334155;">${popData.wasteDisposal.groupD}</td>
        <td style="padding: 3px 5px; color: #334155;">Lixeira comum com saco plástico preto/cinza e pedal acionador.</td>
      </tr>
    </table>
  </div>

  <!-- 6. PROTOCOLO DE INTERCORRÊNCIAS & CONDUTAS DE EMERGÊNCIA -->
  <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 6px 8px; margin-bottom: 6px; background: #fff1f2; border-color: #fca5a5;">
    <div style="font-size: 9.5px; font-weight: 800; color: #991b1b; text-transform: uppercase; border-bottom: 1px solid #fecaca; padding-bottom: 2px; margin-bottom: 3px; display: flex; justify-content: space-between; align-items: center;">
      <span>6. CONDUTA SANITÁRIA DE INTERCORRÊNCIAS & PRIMEIROS SOCORROS</span>
      <span style="font-size: 7.5px; font-weight: bold; background: #fee2e2; color: #991b1b; padding: 1px 4px; border-radius: 3px;">SUPERVISÃO MÉDICA OBRIGATÓRIA</span>
    </div>
    <div style="font-size: 8.5px; color: #7f1d1d; line-height: 1.38; text-align: justify;">
      <strong>Manejo Específico:</strong> ${popData.interventionsAndUrgency}
      
      <!-- Diretriz Regulamentar de Supervisão Médica e Prescrição Sanitária -->
      <div style="margin-top: 4px; padding: 4px 6px; background: #ffffff; border: 1px solid #fca5a5; border-radius: 4px; font-size: 8.2px; color: #7f1d1d; line-height: 1.35;">
        <strong style="color: #991b1b;">⚖️ Diretriz Sanitária & Legal (Habilitação vs. Prescrição):</strong> 
        Nos casos em que o(a) profissional executor(a) seja devidamente habilitado(a) na execução técnica do procedimento, mas não possua competência legal privativa para prescrição de medicamentos ou procedimentos invasivos de emergência, <strong>toda conduta sanitária, terapêutica medicamentosa e manejo clínico avançado de intercorrências deve ser obrigatoriamente supervisionada por profissional médico</strong> (Responsável Técnico ou Médico Assistente), assegurando a total conformidade regulatória e a segurança do paciente.
      </div>

      <div style="margin-top: 3px; font-size: 8px; color: #991b1b;">
        <strong>Suporte de Emergência:</strong> Em caso de reação anafilática grave (broncoespasmo, edema de glote ou choque), acionar imediatamente o <strong>SAMU 192</strong> e manter o paciente em decúbito dorsal com elevação de membros inferiores.
      </div>
    </div>
  </div>

  <!-- 7. REFERÊNCIAS BIBLIOGRÁFICAS E SANITÁRIAS OFICIAIS -->
  <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 6px 8px; margin-bottom: 6px; background: #f8fafc;">
    <div style="font-size: 9.2px; font-weight: 800; color: #1e3a8a; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
      7. REFERÊNCIAS BIBLIOGRÁFICAS & DIRETRIZES TÉCNICAS OFICIAIS
    </div>
    <ul style="margin: 0; padding-left: 14px; font-size: 8.1px; color: #475569; line-height: 1.35;">
      ${refsHtml}
    </ul>
  </div>

  <!-- 8. APROVAÇÃO, REVISÃO & ASSINATURAS DO RESPONSÁVEL TÉCNICO -->
  <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 6px 8px; background: #ffffff;">
    <div style="font-size: 8.8px; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 4px; text-align: center;">
      APROVAÇÃO TÉCNICA E VALIDAÇÃO SANITÁRIA &bull; APRESENTAÇÃO À VIGILÂNCIA SANITÁRIA
    </div>
    <div style="display: flex; justify-content: space-between; text-align: center; font-size: 8.5px; margin-top: 8px;">
      <div style="width: 48%;">
        <div style="border-bottom: 1.5px solid #0f172a; height: 16px; margin-bottom: 2px;"></div>
        <div style="font-weight: bold; text-transform: uppercase; color: #0f172a;">${patient.profissionalResponsavel}</div>
        <div style="font-size: 7.8px; color: #64748b;">Responsável Técnico(a) &bull; ${patient.registroProfissional}</div>
        <div style="font-size: 7.5px; color: #94a3b8;">${clinicData.nomeClinica || '{{nome_clinica}}'}</div>
      </div>
      <div style="width: 48%;">
        <div style="border-bottom: 1.5px solid #0f172a; height: 16px; margin-bottom: 2px;"></div>
        <div style="font-weight: bold; text-transform: uppercase; color: #0f172a;">PROFISSIONAL EXECUTOR(A) HABILITADO(A)</div>
        <div style="font-size: 7.8px; color: #64748b;">Assinatura, Carimbo e Conselho de Classe</div>
        <div style="font-size: 7.5px; color: #94a3b8;">Data de Validação Técnica: ${patient.data}</div>
      </div>
    </div>
  </div>
</div>
`;
  }

  // 7. PRESCRIÇÃO CLÍNICA & FÓRMULAS BASEADAS EM EVIDÊNCIAS
  if (docType === 'prescricao') {
    const profile = getProcedurePrescriptionProfile(procKey);
    const formulasHtml = profile.suggestedFormulas
      .map(
        (f, idx) => `
    <div style="margin-bottom: 14px; padding: 10px 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #ec4899; border-radius: 6px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
        <span style="font-size: 8.5px; font-weight: 800; text-transform: uppercase; color: #be185d; background: #fce7f3; padding: 1px 6px; border-radius: 3px;">
          ${idx + 1}. ${f.route} &bull; ${f.categoryLabel}
        </span>
        <span style="font-size: 9px; font-weight: bold; color: #475569;">${f.dosageForm} (${f.quantity})</span>
      </div>
      <div style="font-size: 11.5px; font-weight: 800; color: #0f172a; margin-bottom: 6px;">${f.title}</div>
      <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 10px; font-family: monospace; font-size: 10px; color: #1e293b; white-space: pre-wrap; margin-bottom: 6px;">${f.activesText}</div>
      <div style="font-size: 10.5px; color: #0f172a; margin-bottom: 3px;">
        <strong style="color: #047857;">Posologia / Modo de Usar:</strong> ${f.posology}
      </div>
      <div style="font-size: 9px; color: #64748b;">
        <strong>Duração do Tratamento:</strong> ${f.duration}
      </div>
    </div>
    `
      )
      .join('');

    return `
<div style="font-family: 'Segoe UI', Arial, sans-serif; color: #0f172a; line-height: 1.5; font-size: 11px;">
  <div style="border-bottom: 2px solid #ec4899; padding-bottom: 8px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
      <h1 style="margin: 0; font-size: 16px; font-weight: 800; color: #0f172a; text-transform: uppercase; font-family: 'Times New Roman', serif;">${clinicData.nomeClinica || 'CLÍNICA DE ESTÉTICA AVANÇADA'}</h1>
      <p style="margin: 2px 0 0 0; font-size: 9.5px; color: #475569;">
        RT: ${patient.profissionalResponsavel} &bull; ${patient.registroProfissional} &bull; Alvará Sanitário: ${clinicData.alvara || 'Vigente'}
      </p>
      <p style="margin: 1px 0 0 0; font-size: 9px; color: #64748b;">${clinicData.endereco || 'Endereço da Clínica'} &bull; Tel: ${clinicData.telefone || '(00) 00000-0000'}</p>
    </div>
    <div style="text-align: right;">
      <span style="font-size: 11.5px; font-weight: 800; color: #be185d; text-transform: uppercase; letter-spacing: 0.5px;">RECEITUÁRIO ESPECIALIZADO</span>
      <div style="font-size: 9px; color: #64748b;">${cleanDocTitle}</div>
    </div>
  </div>

  <div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; margin-bottom: 14px; display: flex; justify-content: space-between;">
    <div>
      <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #0f172a;">PACIENTE: ${patient.nomeCliente}</div>
      <div style="font-size: 9px; color: #475569;">Contato: ${patient.telefone}</div>
    </div>
    <div style="text-align: right; font-size: 9px; color: #475569;">
      <div><strong>Data de Emissão:</strong> ${patient.data}</div>
      <div><strong>Validade:</strong> 30 dias</div>
    </div>
  </div>

  <div style="margin-bottom: 12px; font-size: 9.5px; color: #475569; background: #fff5f8; border: 1px solid #fbcfe8; border-radius: 4px; padding: 6px 10px;">
    <strong style="color: #be185d;">💡 Racional Científico:</strong> ${profile.scientificJustification}
  </div>

  <div style="margin-bottom: 16px;">
    ${formulasHtml}
  </div>

  <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 6px; padding: 8px 10px; margin-bottom: 24px; font-size: 9.5px; color: #475569;">
    <strong>Orientações Gerais:</strong> Medicamentos manipulados devem ser encomendados em farmácia de manipulação autorizada pela ANVISA. Manter ao abrigo da luz e calor. Ingerir no mínimo 2 litros de água ao dia e manter fotoproteção FPS 50+.
  </div>

  <!-- Assinatura Profissional Limpa (Sem Conformidade Burocrática Indesejada) -->
  <div style="margin-top: 24px; padding-top: 12px; text-align: center; page-break-inside: avoid;">
    <div style="width: 280px; border-bottom: 1.5px solid #0f172a; margin: 0 auto 4px auto;"></div>
    <div style="font-size: 10.5px; font-weight: 800; text-transform: uppercase; color: #0f172a;">${patient.profissionalResponsavel}</div>
    <div style="font-size: 9px; color: #475569;">${patient.registroProfissional} &bull; ${clinicData.nomeClinica || 'Clínica Estética'}</div>
  </div>
</div>
    `;
  }

  return '';
};

/**
 * Generates WhatsApp friendly text for Post Procedure instructions or Ficha
 */
export const generateWhatsAppShareText = (
  docType: ClinicalDocType,
  doc: DocumentItem,
  clinicData: ClinicData,
  patient: PatientFormState
): string => {
  const cleanDocTitle = doc.title.replace(/^POP\s*[-–—]\s*/i, '').replace(/\(.*\)$/, '').trim();
  const procKey = identifyProcedureContext(doc);

  if (docType === 'pos_procedimento') {
    let careText = '';
    if (procKey === 'toxina_botulinica') {
      careText = `1️⃣ Primeiras 4 horas: Não deitar a cabeça, não se curvar e não abaixar o tronco.
2️⃣ Primeiras 24-48 horas: Evite exercícios físicos intensos e bebidas alcoólicas.
3️⃣ Não massagear ou pressionar as áreas aplicadas.
4️⃣ Evite calor intenso, banhos muito quentes e saunas.
📅 Seu Retorno: Entre o 15º e 21º dia para acompanhamento!`;
    } else if (procKey === 'preenchimento_ah') {
      careText = `1️⃣ Faça compressas frias suaves (sem apertar) nas primeiras 48h.
2️⃣ Evite maquiagem nas primeiras 24 horas sobre os pontinhos.
3️⃣ Durma de barriga para cima nos primeiros 5 dias.
⚠️ Sinais de alerta: Dor aguda forte ou palidez súbita na pele - avise-nos na hora!
📅 Retorno: Em 15 a 30 dias para revisão.`;
    } else if (procKey === 'bioestimulador') {
      careText = `🌟 REGRA 5-5-5: Massageie a região 5x ao dia, por 5 minutos, durante 5 dias consecutivos com hidratante!
2️⃣ Evite atividade física vigorosa por 24 horas.
3️⃣ Beba bastante água (2,5L/dia) e use protetor solar FPS 50+!
📅 Retorno: Em 30 a 45 dias para avaliação do colágeno.`;
    } else if (procKey === 'fios_pdo') {
      careText = `1️⃣ Repouso mecânico: Evite mastigar alimentos duros e gargalhadas exageradas por 7 a 10 dias.
2️⃣ Durma de barriga para cima pelos próximos 15 dias (não durma de lado).
3️⃣ Não esfregue o rosto e adie tratamentos odontológicos por 3 semanas.
📅 Retorno: Em 15 a 30 dias para acompanhamento da acomodação!`;
    } else if (procKey === 'biorreguladores') {
      careText = `1️⃣ As pequenas pápulas nos pontos de aplicação somem naturalmente em 24 a 48h. NÃO massageie as pápulas!
2️⃣ Higienize o rosto suavemente com água e sabonete neutro após 6h.
3️⃣ Beba bastante água (2 a 2,5L/dia) e use protetor solar FPS 50+!
📅 Próxima Sessão: Em 21 a 30 dias conforme seu protocolo.`;
    } else if (procKey === 'skinbooster') {
      careText = `1️⃣ Pequenos pontinhos na pele regridem em 24 a 48 horas.
2️⃣ Não aplique maquiagem nas primeiras 24 horas.
3️⃣ Use hidratante reparador com ácido hialurônico e protetor FPS 50+!
📅 Retorno: Em 21 a 30 dias.`;
    } else if (procKey === 'laser_lavieen') {
      careText = `1️⃣ NUNCA puxe ou esfolie as microcasquinhas escuras ("efeito areia"). Elas caem sozinhas em 3 a 7 dias.
2️⃣ Aplique hidratante reparador de barreira (Cicaplast/Epidrat) de 3 a 4x ao dia.
3️⃣ Zero sol direto! Use protetor solar FPS 50+ de 3 em 3 horas.
📅 Retorno: Em 15 a 30 dias para reavaliação do viço e manchas.`;
    } else if (procKey === 'laser_co2') {
      careText = `1️⃣ Mantenha a pele sempre umedecida com a pomada cicatrizante indicada (não deixe secar).
2️⃣ PROIBIDO arrancar crostas ou coçar para evitar manchas e marcas!
3️⃣ Bloqueio solar absoluto: use protetor solar físico FPS 50+ e chapéu.
📅 Retorno: Em 7 a 14 dias para avaliação da epitelização.`;
    } else if (procKey === 'ultrassom_hifu') {
      careText = `1️⃣ Sensação de dor muscular na mandíbula e maçãs do rosto por 3 a 7 dias é normal (estímulo do SMAS).
2️⃣ NÃO tome anti-inflamatórios (como ibuprofeno), pois eles cortam o estímulo de colágeno! Use apenas analgésicos simples se necessário.
3️⃣ Protetor solar diário FPS 50+ e vida normal!
📅 Resultado Máximo: De 60 a 120 dias pós-sessão.`;
    } else if (procKey === 'endolaser') {
      careText = `1️⃣ Use a faixa compressiva continuamente pelas primeiras 48 a 72h (e para dormir por 15 dias).
2️⃣ Mantenha os micropontos limpos com soro e sabonete antisséptico.
3️⃣ Inicie as sessões de drenagem facial pós-operatória conforme orientado.
📅 Retorno: Em 7 a 15 dias para revisão!`;
    } else if (procKey === 'peeling') {
      careText = `🚫 NUNCA puxe ou arranque as peles que estiverem descamando (deixe cair naturalmente).
💧 Lave o rosto suavemente com sabonete neutro e use hidratante regenerador.
☀️ Use protetor solar FPS 50+ mineral de 3 em 3 horas!`;
    } else {
      careText = `1️⃣ Evite esfregar ou manipular a área tratada nas primeiras 24h.
2️⃣ Mantenha a pele hidratada e use protetor solar FPS 50+.
3️⃣ Beba bastante água (pelo menos 2L/dia).`;
    }

    return `Olá, *${patient.nomeCliente}*! ✨

Aqui estão as suas *Orientações Pós-Procedimento* para *${cleanDocTitle}* da *${clinicData.nomeClinica || 'Nossa Clínica'}*:

${careText}

Qualquer dúvida ou intercorrência, estamos à sua disposição pelo WhatsApp: ${clinicData.telefone || ''} 💬

Desejamos uma excelente recuperação! 🌸`;
  }

  return `Olá, *${patient.nomeCliente}*! Compartilhamos seu documento clínico referente ao procedimento *${cleanDocTitle}* da *${clinicData.nomeClinica || 'Clínica'}*.`;
};

/**
 * Storage key helper for custom clinical document content
 */
export const getCustomDocStorageKey = (docId: string, docType: string): string => {
  return `custom_clinical_doc_${docId}_${docType}`;
};

/**
 * Check if a custom document exists in localStorage
 */
export const hasCustomClinicalDoc = (docId: string, docType: string): boolean => {
  try {
    const key = getCustomDocStorageKey(docId, docType);
    return !!localStorage.getItem(key);
  } catch (e) {
    return false;
  }
};

/**
 * Get custom clinical document content from localStorage
 */
export const getCustomClinicalDocContent = (docId: string, docType: string): string | null => {
  try {
    const key = getCustomDocStorageKey(docId, docType);
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
};

/**
 * Save custom clinical document content to localStorage
 */
export const saveCustomClinicalDocContent = (
  docId: string,
  docType: string,
  htmlContent: string
): void => {
  try {
    const key = getCustomDocStorageKey(docId, docType);
    localStorage.setItem(key, htmlContent);
  } catch (e) {
    console.error('Error saving custom clinical doc content', e);
  }
};

/**
 * Reset custom clinical document content to default generated template
 */
export const resetCustomClinicalDocContent = (docId: string, docType: string): void => {
  try {
    const key = getCustomDocStorageKey(docId, docType);
    localStorage.removeItem(key);
  } catch (e) {
    console.error('Error resetting custom clinical doc content', e);
  }
};

/**
 * Get effective clinical document content (returns customized content if saved, otherwise default generated)
 */
export const getEffectiveClinicalDocContent = (
  docType: ClinicalDocType,
  doc: DocumentItem,
  clinicData: ClinicData,
  patient: PatientFormState
): string => {
  const custom = getCustomClinicalDocContent(doc.id, docType);
  if (custom && custom.trim().length > 0) {
    // If customized, apply current patient / clinic variables dynamically if placeholder tokens exist
    let processed = custom;
    processed = replaceClinicVariables(processed, clinicData);
    processed = processed.replace(/{{nome_paciente}}/g, patient.nomeCliente);
    processed = processed.replace(/{{cpf_paciente}}/g, '');
    processed = processed.replace(/{{telefone_paciente}}/g, patient.telefone);
    processed = processed.replace(/{{data_hoje}}/g, patient.data);
    return processed;
  }

  // Check if it's a custom defined button type with a default template
  const buttons = getClinicalButtonsConfig(doc.id);
  const customBtnDef = buttons.find((b) => b.type === docType);
  if (customBtnDef?.defaultTemplate) {
    let tpl = customBtnDef.defaultTemplate;
    tpl = replaceClinicVariables(tpl, clinicData);
    tpl = tpl.replace(/{{nome_paciente}}/g, patient.nomeCliente);
    tpl = tpl.replace(/{{cpf_paciente}}/g, '');
    tpl = tpl.replace(/{{telefone_paciente}}/g, patient.telefone);
    tpl = tpl.replace(/{{data_hoje}}/g, patient.data);
    return tpl;
  }

  return generateClinicalDocContent(docType, doc, clinicData, patient);
};

const BUTTONS_STORAGE_KEY_PREFIX = 'clinical_doc_buttons_config_';

/**
 * Get buttons configuration for a specific document or global default
 */
export const getClinicalButtonsConfig = (docId?: string): ClinicalDocDefinition[] => {
  try {
    let list: ClinicalDocDefinition[] | null = null;
    if (docId) {
      const docSpecific = localStorage.getItem(`${BUTTONS_STORAGE_KEY_PREFIX}${docId}`);
      if (docSpecific) {
        list = JSON.parse(docSpecific);
      }
    }
    if (!list) {
      const globalConfig = localStorage.getItem(`${BUTTONS_STORAGE_KEY_PREFIX}global`);
      if (globalConfig) {
        list = JSON.parse(globalConfig);
      }
    }
    if (list && Array.isArray(list)) {
      // Migrate any legacy 'plano_tratamento' or 'antes_depois' to 'pop_procedimento'
      list = list.map((item) => {
        if (item.type === 'plano_tratamento' || item.type === 'antes_depois') {
          return {
            ...item,
            type: 'pop_procedimento',
            label: 'POP do Procedimento (ANVISA / Vigilância)',
            shortLabel: 'POP Vigilância',
            iconName: 'ShieldCheck',
            color: '#2563eb',
            badgeBg: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
            description: 'Procedimento Operacional Padrão passo a passo completo oficial com biossegurança, materiais, EPIs e descarte para fiscalização da Vigilância Sanitária',
          };
        }
        return item;
      });

      // Ensure all standard defaults (including pop_procedimento) are present if missing
      DEFAULT_CLINICAL_DOC_TYPES.forEach((def) => {
        if (!list!.some((item) => item.type === def.type)) {
          // Insert after ficha_paciente if possible
          if (def.type === 'pop_procedimento') {
            const fichaIdx = list!.findIndex((i) => i.type === 'ficha_paciente');
            if (fichaIdx >= 0) {
              list!.splice(fichaIdx + 1, 0, def);
              return;
            }
          }
          list!.push(def);
        }
      });
      return list;
    }
  } catch (e) {
    console.error('Error loading clinical buttons config', e);
  }
  return DEFAULT_CLINICAL_DOC_TYPES;
};

/**
 * Save buttons configuration for a specific document or global default
 */
export const saveClinicalButtonsConfig = (
  buttons: ClinicalDocDefinition[],
  docId?: string,
  applyGlobally: boolean = false
): void => {
  try {
    const json = JSON.stringify(buttons);
    if (docId && !applyGlobally) {
      localStorage.setItem(`${BUTTONS_STORAGE_KEY_PREFIX}${docId}`, json);
    } else {
      localStorage.setItem(`${BUTTONS_STORAGE_KEY_PREFIX}global`, json);
      if (docId) {
        localStorage.setItem(`${BUTTONS_STORAGE_KEY_PREFIX}${docId}`, json);
      }
    }
  } catch (e) {
    console.error('Error saving clinical buttons config', e);
  }
};

/**
 * Reset buttons configuration to factory defaults
 */
export const resetClinicalButtonsConfig = (docId?: string): void => {
  try {
    if (docId) {
      localStorage.removeItem(`${BUTTONS_STORAGE_KEY_PREFIX}${docId}`);
    }
    localStorage.removeItem(`${BUTTONS_STORAGE_KEY_PREFIX}global`);
  } catch (e) {
    console.error('Error resetting clinical buttons config', e);
  }
};

