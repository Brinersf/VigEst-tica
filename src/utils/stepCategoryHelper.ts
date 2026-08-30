import { DocumentItem, DocumentStatus } from '../types';

export interface StepCategoryDef {
  id: string;
  number: number;
  name: string;
  shortName: string;
  description: string;
  iconName: string;
  accentColor: string;
  isCustom?: boolean;
}

export const CUSTOM_CATEGORIES_STORAGE_KEY = 'vigi_custom_step_categories';
export const DELETED_CATEGORIES_STORAGE_KEY = 'vigi_deleted_step_categories';
export const DELETED_DOCS_STORAGE_KEY = 'vigi_deleted_doc_ids';

/**
 * Loads user-created custom categories from localStorage
 */
export function getSavedCustomCategories(): StepCategoryDef[] {
  try {
    const saved = localStorage.getItem(CUSTOM_CATEGORIES_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading custom categories', e);
  }
  return [];
}

/**
 * Saves custom categories to localStorage
 */
export function saveCustomCategories(categories: StepCategoryDef[]): void {
  try {
    localStorage.setItem(CUSTOM_CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
  } catch (e) {
    console.error('Error saving custom categories', e);
  }
}

/**
 * Loads deleted category names/IDs from localStorage
 */
export function getDeletedCategoryNames(): string[] {
  try {
    const saved = localStorage.getItem(DELETED_CATEGORIES_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading deleted categories', e);
  }
  return [];
}

/**
 * Saves deleted category names/IDs to localStorage
 */
export function saveDeletedCategoryNames(names: string[]): void {
  try {
    localStorage.setItem(DELETED_CATEGORIES_STORAGE_KEY, JSON.stringify(names));
  } catch (e) {
    console.error('Error saving deleted categories', e);
  }
}

/**
 * Loads deleted document IDs from localStorage
 */
export function getDeletedDocIds(): string[] {
  try {
    const saved = localStorage.getItem(DELETED_DOCS_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading deleted docs', e);
  }
  return [];
}

/**
 * Saves deleted document IDs to localStorage
 */
export function saveDeletedDocIds(ids: string[]): void {
  try {
    localStorage.setItem(DELETED_DOCS_STORAGE_KEY, JSON.stringify(ids));
  } catch (e) {
    console.error('Error saving deleted docs', e);
  }
}

/**
 * Merges standard step categories with custom categories, filtering out user-deleted categories
 */
export function getAllCategories(customCats?: StepCategoryDef[], deletedNames?: string[]): StepCategoryDef[] {
  const custom = customCats || getSavedCustomCategories();
  const deleted = deletedNames || getDeletedCategoryNames();
  const combined = [...STEP_CATEGORIES, ...custom];
  return combined.filter(c => !deleted.includes(c.name) && !deleted.includes(c.id));
}

export const STEP_CATEGORIES: StepCategoryDef[] = [
  {
    id: 'step-1-base',
    number: 1,
    name: '1. Documentos Base e ANVISA',
    shortName: 'Documentos Base e ANVISA',
    description: 'Manuais obrigatórios, PGRSS e Memorial Descritivo exigidos pela ANVISA para emissão e renovação do Alvará Sanitário.',
    iconName: 'ShieldCheck',
    accentColor: '#10B981',
  },
  {
    id: 'step-2-pops-esteticos',
    number: 2,
    name: '2. POP Procedimentos Estéticos',
    shortName: 'POP Procedimentos Estéticos',
    description: 'Protocolos de Toxina Botulínica, Preenchimento AH, Biorremodeladores, Bioestimuladores, Skinbooster, Fios PDO e Injetáveis.',
    iconName: 'Syringe',
    accentColor: '#00D3A1',
  },
  {
    id: 'step-3-tecnologias',
    number: 3,
    name: '3. POPs de Laser e Tecnologias',
    shortName: 'Laser e Tecnologias',
    description: 'Procedimentos padronizados para Laser Lavieen 1927nm, CO2 Fracionado 10600nm, Ultrassom Micro/Macrofocado HIFU, Endolaser 1470nm, Luz Intensa Pulsada, Depilação a Laser, Remoção de Tatuagem e Transplante Capilar FUE.',
    iconName: 'Zap',
    accentColor: '#6366F1',
  },
  {
    id: 'step-4-biosseguranca',
    number: 4,
    name: '4. Biossegurança, CME e Rotinas Sanitárias',
    shortName: 'Biossegurança & CME',
    description: 'Esterilização em Autoclave (RDC 15), Paramentação NR-32, Assepsia e Desinfecção, Validade PEPS/FEFO, Acidente com Perfurocortantes, Urgência e SAMU 192.',
    iconName: 'Activity',
    accentColor: '#0EA5E9',
  },
  {
    id: 'step-5-cadernos',
    number: 5,
    name: '5. Livros de Registro e Cadernos Sanitários',
    shortName: 'Cadernos Sanitários',
    description: 'Planilhas A4 de 1 página com linhas numeradas e visto do RT: Registro de Treinamentos e Capacitações da Equipe, MTR SINIR Resíduos, Geladeira (+2°C a +8°C) e PMOC.',
    iconName: 'BookOpen',
    accentColor: '#F59E0B',
  },
  {
    id: 'step-6-prescricoes',
    number: 6,
    name: '6. Prescrições Estéticas e Home Care',
    shortName: 'Prescrições Estéticas',
    description: 'Receituários magistrais, protocolos home care pós-procedimentos, fórmulas manipuladas, nutracêuticos, cosmecêuticos clareadores e regeneradores dérmicos.',
    iconName: 'Pill',
    accentColor: '#EC4899',
  },
];

/**
 * Maps a document to one of the step-by-step categories based on its ID, title, and metadata
 */
export function getStepCategoryForDocument(doc: DocumentItem): string {
  const id = (doc.id || '').toLowerCase();
  const title = (doc.title || '').toLowerCase();

  // 6. Prescrições Estéticas e Home Care (Priority check for prescriptions and home care)
  if (
    id.includes('prescricao') ||
    id.includes('receituario') ||
    id.includes('homecare') ||
    id.includes('nutraceutico') ||
    id.includes('skin-priming') ||
    title.includes('prescrição') ||
    title.includes('receituário') ||
    title.includes('home care') ||
    title.includes('nutracêutico') ||
    title.includes('skin priming') ||
    (title.includes('fórmula') && title.includes('magistral'))
  ) {
    return '6. Prescrições Estéticas e Home Care';
  }

  // 1. Documentos Base e ANVISA - HIGHEST PRIORITY (Master Manuals & Structural Memorials)
  if (
    id === 'manual-boas-praticas-master' ||
    id === 'manual-boas-praticas' ||
    id.includes('manual-boas-praticas') ||
    title.includes('manual de boas práticas') ||
    id === 'pgrss-master-rdc-222' ||
    id === 'pgrss-master' ||
    id === 'pgrss' ||
    id === 'memorial-descritivo-atividades' ||
    id === 'memorial-descritivo-master' ||
    id === 'memorial-descritivo' ||
    id.includes('memorial-descritivo') ||
    title.includes('memorial descritivo') ||
    (title.includes('gerenciamento de resíduos') && !id.startsWith('pop') && !title.startsWith('pop'))
  ) {
    return '1. Documentos Base e ANVISA';
  }

  // If stepCategory is explicitly defined, honor and normalize it
  if (doc.stepCategory) {
    if (
      doc.stepCategory === '6. Prescrições Estéticas e Home Care' ||
      doc.stepCategory === '6. Prescrições Estéticas' ||
      doc.stepCategory === 'Prescrições Estéticas' ||
      doc.stepCategory.toLowerCase().includes('prescri') ||
      doc.stepCategory.toLowerCase().includes('receitu')
    ) {
      return '6. Prescrições Estéticas e Home Care';
    }
    if (doc.stepCategory === '2. Injetáveis e Harmonização' || doc.stepCategory === '2. POPs Estética Avançada e Injetáveis') {
      return '2. POP Procedimentos Estéticos';
    }
    if (
      doc.stepCategory === '3. Tecnologias e Eletroterapia' ||
      doc.stepCategory === '3. Laser e Tecnologias' ||
      doc.stepCategory === '3. POPs de Laser e Tecnologias'
    ) {
      return '3. POPs de Laser e Tecnologias';
    }
    if (
      doc.stepCategory === '5. Biossegurança, CME e Rotinas Sanitárias' ||
      doc.stepCategory === '4. Biossegurança, CME e Rotinas Sanitárias'
    ) {
      return '4. Biossegurança, CME e Rotinas Sanitárias';
    }
    if (
      doc.stepCategory === '6. Livros de Registro e Cadernos Sanitários' ||
      doc.stepCategory === '5. Livros de Registro e Cadernos Sanitários'
    ) {
      return '5. Livros de Registro e Cadernos Sanitários';
    }
    if (doc.stepCategory === '1. Documentos Base e ANVISA') {
      return '1. Documentos Base e ANVISA';
    }
    return doc.stepCategory;
  }

  // 5. Livros de Registro, Cadernos Físicos e Treinamentos
  if (
    id.includes('treinamento') ||
    id.includes('capacitacao') ||
    id.includes('mtr') ||
    id.includes('caderno') ||
    id.includes('livro-registro') ||
    title.includes('livro de registro') ||
    title.includes('treinamentos') ||
    title.includes('capacitação') ||
    title.includes('caderno de registro') ||
    title.includes('caderno de controle')
  ) {
    return '5. Livros de Registro e Cadernos Sanitários';
  }

  // 1. Documentos Base e ANVISA (Strictly the master manuals & structural descriptions, not individual POPs or books)
  if (
    (id === 'manual-boas-praticas' || id === 'pgrss' || id === 'memorial-descritivo') ||
    (!id.startsWith('pop') && !title.startsWith('pop') && (
      id.includes('manual-boas-praticas') ||
      id.includes('memorial-descritivo') ||
      title.includes('manual de boas práticas') ||
      title.includes('memorial descritivo') ||
      (title.includes('plano de gerenciamento de resíduos') && !title.includes('pop'))
    ))
  ) {
    return '1. Documentos Base e ANVISA';
  }

  // 3. POPs de Laser e Tecnologias
  if (
    id.includes('laser') ||
    id.includes('lavieen') ||
    id.includes('co2') ||
    id.includes('hifu') ||
    id.includes('ultrassom') ||
    id.includes('endolaser') ||
    id.includes('-lip') ||
    id.includes('luz-intensa') ||
    id.includes('radiofrequencia') ||
    id.includes('radiofrequência') ||
    id.includes('criolipolise') ||
    id.includes('criolipólise') ||
    id.includes('depilacao') ||
    id.includes('depilação') ||
    id.includes('tatuagem') ||
    id.includes('transplante-capilar') ||
    id.includes('capilar') ||
    id.includes('eletroterapia') ||
    id.includes('eletromedico') ||
    id.includes('jato-plasma') ||
    id.includes('jato de plasma') ||
    id.includes('alta-frequencia') ||
    id.includes('eletrocauterio') ||
    title.includes('laser') ||
    title.includes('lavieen') ||
    title.includes('co2') ||
    title.includes('hifu') ||
    title.includes('endolaser') ||
    title.includes('ultrassom') ||
    title.includes('luz pulsada') ||
    title.includes('radiofrequência') ||
    title.includes('radiofrequencia') ||
    title.includes('criolipólise') ||
    title.includes('criolipolise') ||
    title.includes('depilação') ||
    title.includes('tatuagem') ||
    title.includes('transplante capilar') ||
    title.includes('jato de plasma') ||
    title.includes('eletroterapia')
  ) {
    return '3. POPs de Laser e Tecnologias';
  }

  // 4. Biossegurança, CME e Rotinas Sanitárias
  if (
    id.includes('autoclave') ||
    id.includes('cme') ||
    id.includes('paramentacao') ||
    id.includes('paramentação') ||
    id.includes('epi') ||
    id.includes('higienizacao') ||
    id.includes('higienização') ||
    id.includes('desinfeccao') ||
    id.includes('desinfecção') ||
    id.includes('esterilizacao') ||
    id.includes('esterilização') ||
    id.includes('limpeza-terminal') ||
    id.includes('seguranca-paciente') ||
    id.includes('time-out') ||
    id.includes('validade-insumos') ||
    id.includes('acidente') ||
    id.includes('perfurocortante') ||
    id.includes('urgencia') ||
    id.includes('emergencia') ||
    id.includes('samu') ||
    id.includes('atendimento-paciente') ||
    id.includes('manutencao-calibracao') ||
    id.includes('plano-contingencia') ||
    id.includes('termolabeis') ||
    id.includes('rotina-urgencia') ||
    title.includes('autoclave') ||
    title.includes('paramentação') ||
    title.includes('higienização') ||
    title.includes('desinfecção') ||
    title.includes('esterilização') ||
    title.includes('biossegurança') ||
    title.includes('segurança do paciente') ||
    title.includes('time-out') ||
    title.includes('acidente com material biológico') ||
    title.includes('perfurocortante') ||
    title.includes('urgência') ||
    title.includes('samu') ||
    title.includes('atendimento ao paciente') ||
    title.includes('manutenção') ||
    title.includes('calibração') ||
    title.includes('contingência') ||
    title.includes('termolábeis')
  ) {
    return '4. Biossegurança, CME e Rotinas Sanitárias';
  }

  // 2. POP Procedimentos Estéticos (Toxina, Preenchedores, Bioestimuladores, Fios, etc.)
  return '2. POP Procedimentos Estéticos';
}

/**
 * Returns an appropriate icon name for a document card
 */
export function getDocumentIcon(doc: DocumentItem): string {
  if (doc.iconType) return doc.iconType;

  const id = doc.id.toLowerCase();
  const title = doc.title.toLowerCase();

  if (id.includes('pgrss') || title.includes('resíduos')) return 'Trash2';
  if (id.includes('memorial') || title.includes('memorial')) return 'Building2';
  if (id.includes('manual') || title.includes('manual')) return 'ShieldCheck';
  if (id.includes('laser') || id.includes('lavieen') || id.includes('co2') || id.includes('hifu')) return 'Zap';
  if (id.includes('autoclave') || id.includes('esterilizacao')) return 'CheckCircle2';
  if (id.includes('mtr') || id.includes('caderno') || id.includes('livro')) return 'BookOpen';
  if (id.includes('prescricao') || id.includes('receituario') || title.includes('prescrição') || title.includes('receituário')) return 'Pill';
  if (id.includes('anamnese') || id.includes('tcle')) return 'FileCheck';
  if (id.includes('contrato') || id.includes('recibo') || id.includes('juridico')) return 'FileText';
  if (id.includes('hialuronidase') || id.includes('resgate')) return 'AlertTriangle';

  return 'Sparkles';
}

/**
 * Returns default short description for the card
 */
export function getDocumentShortDescription(doc: DocumentItem): string {
  if (doc.shortDescription) return doc.shortDescription;
  if (doc.adaptationNotes) {
    // Truncate cleanly
    return doc.adaptationNotes.length > 95
      ? doc.adaptationNotes.substring(0, 95) + '...'
      : doc.adaptationNotes;
  }
  return 'Procedimentos técnicos, biossegurança e conformidade sanitária ANVISA.';
}

/**
 * Calculates a simulated completion percentage if not explicitly saved
 */
export function getDocumentProgress(doc: DocumentItem): number {
  if (typeof doc.progress === 'number') return doc.progress;
  if (doc.status === 'completo') return 100;
  if (doc.status === 'pendente') return 45;
  // Default based on ID length or pseudo-seed for realistic progression
  const charCode = doc.id.charCodeAt(doc.id.length - 1) || 75;
  return 70 + (charCode % 25);
}

/**
 * Calculates status if not explicitly saved
 */
export function getDocumentStatus(doc: DocumentItem): DocumentStatus {
  if (doc.status) return doc.status;
  const progress = getDocumentProgress(doc);
  if (progress >= 90) return 'completo';
  if (progress < 60) return 'pendente';
  return 'em_edicao';
}

/**
 * Formats last modified timestamp relative
 */
export function formatLastActivity(doc: DocumentItem): string {
  if (doc.lastActivity) return doc.lastActivity;
  if (doc.lastModified) {
    return `Atualizado: ${doc.lastModified}`;
  }
  return 'Hoje, 14:32';
}

/**
 * Returns true if a document belongs specifically to Category 2 (POP Procedimentos Estéticos)
 * or Category 3 (POPs de Laser e Tecnologias)
 */
export function isCategory2Or3Document(doc: DocumentItem, currentCategoryDef?: StepCategoryDef): boolean {
  if (currentCategoryDef) {
    if (
      currentCategoryDef.number === 2 ||
      currentCategoryDef.number === 3 ||
      currentCategoryDef.id === 'step-2-pops-esteticos' ||
      currentCategoryDef.id === 'step-3-tecnologias' ||
      currentCategoryDef.name.startsWith('2.') ||
      currentCategoryDef.name.startsWith('3.') ||
      currentCategoryDef.name.toLowerCase().includes('procedimentos estéticos') ||
      currentCategoryDef.name.toLowerCase().includes('laser e tecnologias')
    ) {
      return true;
    }
  }

  const categoryName = getStepCategoryForDocument(doc);
  return (
    categoryName.startsWith('2.') ||
    categoryName.startsWith('3.') ||
    categoryName.toLowerCase().includes('procedimentos estéticos') ||
    categoryName.toLowerCase().includes('laser e tecnologias')
  );
}
