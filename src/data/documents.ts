import { DocumentItem } from '../types';
import { POPS_GENERAL } from './pops-general';
import { POPS_INJECTABLES } from './pops-injectables';
import { POPS_CORPORAL } from './pops-corporal';
import { POPS_TECHNOLOGIES } from './pops-technologies';
import { POPS_SAFETY_AND_FORMS } from './pops-safety-and-forms';
import { CADERNOS_MANUAIS_FINANCEIRO } from './cadernos-manuais-financeiro';
import { POPS_PRESCRICOES_ESTETICAS } from './prescricoes-esteticas';

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  ...POPS_GENERAL,
  ...POPS_INJECTABLES,
  ...POPS_CORPORAL,
  ...POPS_TECHNOLOGIES,
  ...POPS_SAFETY_AND_FORMS,
  ...CADERNOS_MANUAIS_FINANCEIRO,
  ...POPS_PRESCRICOES_ESTETICAS,
];


