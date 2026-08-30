export type DocumentCategory = 'Manual' | 'POP' | 'Contrato' | 'Anamnese' | 'TCLE' | 'LGPD' | 'Personalizado' | 'Prescricao';

export type DocumentStatus = 'completo' | 'em_edicao' | 'pendente';

export interface ClinicalIngredientEvidence {
  name: string;
  concentrationOrDose: string;
  mechanism: string;
  targetOrRationale: string;
  evidenceLevel: string;
  keyReference: string;
}

export interface ClinicalBibliographicReference {
  authorYear: string;
  title: string;
  journalOrPublisher: string;
  doiOrPmid?: string;
  evidenceSummary: string;
  studyType?: string;
}

export interface ClinicalPrescriptionEvidence {
  pharmacologicalRationale: string;
  therapeuticWindow: string;
  levelOfEvidence: string;
  clinicalValidationNotes: string;
  contraindicationsAndWarnings: string[];
  bibliographicReferences: ClinicalBibliographicReference[];
  activeIngredients?: ClinicalIngredientEvidence[];
}

export interface DocumentItem {
  id: string;
  title: string;
  category: DocumentCategory;
  content: string;
  isEssential?: boolean;
  version?: string;
  lastModified?: string;
  adaptationNotes?: string;
  originalTemplate?: string;
  // Campos para visualização em categorias passo a passo e edição de cards
  stepCategory?: string;
  subCategory?: 'Facial' | 'Corporal' | 'Capilar' | string;
  status?: DocumentStatus;
  progress?: number;
  shortDescription?: string;
  iconType?: string;
  lastActivity?: string;
  // Respaldo científico, referências bibliográficas e validação clínica (exibição na tela)
  clinicalEvidence?: ClinicalPrescriptionEvidence;
}

export interface StepCategoryItem {
  id: string;
  number: number;
  name: string;
  description: string;
  iconName: string;
  color: string;
}


export interface ClinicData {
  nomeClinica: string;
  cnpj: string;
  responsavel: string;
  responsavelTecnico?: string;
  alvara: string;
  cnes?: string;
  nomeCliente: string;
  cpfCliente: string;
  email: string;
  whatsapp: string;
  endereco?: string;
  cidade?: string;
  telefone?: string;
  registroConselho?: string;
  rgCliente?: string;
  dataDocumento?: string;
  procedimento?: string;
  equipamento?: string;
  registroAnvisa?: string;
  valorHonorarios?: string;
  logoUrl?: string;
  themeColor?: string;
  secondaryColor?: string;
  headerLayout?: 'logo-left' | 'logo-center' | 'logo-right';
  customVariables?: Record<string, string>;
}

export type PlanType = 'essencial' | 'completo';

export interface PaymentDetails {
  id: string;
  amount: number;
  pixCode?: string;
  qrCodeBase64?: string;
  ticketUrl?: string;
  status?: string;
  isDemo?: boolean;
}

