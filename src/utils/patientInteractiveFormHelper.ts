export type InteractiveFormType = 'ficha_cadastral' | 'anamnese' | 'completo';

export interface PatientInteractiveSubmission {
  id: string;
  createdAt: string;
  formType?: InteractiveFormType;
  procedureTitle: string;
  procedureDocId?: string;
  clinicName: string;
  clinicPhone: string;
  patientName: string;
  patientCpf: string;
  patientRg?: string;
  patientBirthDate: string;
  patientAge?: string;
  patientGender?: string;
  patientMaritalStatus?: string;
  patientPhone: string;
  patientEmail?: string;
  patientAddress?: string;
  patientProfession?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;

  // Antecedentes e Patologias da Ficha Cadastral
  condicoesClinicas: string[];
  alergias: string[];
  medicamentosUso: string[];
  gestanteLactante?: string;
  fumante?: string;
  ingestaoAlcool?: string;
  atividadeFisica?: string;
  consumoAgua?: string;
  exposicaoSolar?: string;
  tendenciaQueloide?: string;
  historicoHerpes?: string;
  cicatrizacao?: string;
  procedimentosPrevios: string[];
  cirurgiasPrevias?: string;
  possuiImplantesPermanentes?: string;

  // Anamnese Clínica Específica do Procedimento
  queixaPrincipal: string;
  tempoQueixa: string;
  expectativa: string;
  fototipo?: string;
  biotipo?: string;
  observacoesPaciente: string;
  termoAceito: boolean;
  assinaturaNome: string;
  status: 'novo' | 'importado' | 'arquivado';
}

const STORAGE_KEY = 'vigi_patient_submissions_list';

/**
 * Retorna todas as respostas recebidas dos pacientes
 */
export const getPatientSubmissions = (): PatientInteractiveSubmission[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Erro ao ler submissões de pacientes', e);
    return [];
  }
};

const safelyDispatchUpdateEvent = (detail?: unknown) => {
  if (typeof window === 'undefined') return;
  try {
    let event: Event | null = null;
    try {
      if (typeof window.CustomEvent === 'function') {
        event = new window.CustomEvent('vigi_patient_submission_updated', { detail });
      }
    } catch {
      // Fallback
    }

    if (!event && typeof document !== 'undefined' && typeof document.createEvent === 'function') {
      try {
        const customEvt = document.createEvent('CustomEvent');
        customEvt.initCustomEvent('vigi_patient_submission_updated', false, false, detail);
        event = customEvt;
      } catch {
        // Fallback
      }
    }

    if (event) {
      window.dispatchEvent(event);
    }
  } catch (err) {
    console.warn('Ignored event dispatch exception', err);
  }
};

/**
 * Salva uma nova resposta de paciente
 */
export const savePatientSubmission = (sub: PatientInteractiveSubmission): void => {
  try {
    const current = getPatientSubmissions();
    // Verifica se já existe com o mesmo ID
    const index = current.findIndex((item) => item.id === sub.id);
    let updated: PatientInteractiveSubmission[];
    if (index >= 0) {
      updated = [...current];
      updated[index] = sub;
    } else {
      updated = [sub, ...current];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Dispara evento customizado para sincronizar abas e componentes
    safelyDispatchUpdateEvent(sub);
  } catch (e) {
    console.error('Erro ao salvar submissão do paciente', e);
  }
};

/**
 * Exclui uma submissão de paciente
 */
export const deletePatientSubmission = (id: string): void => {
  try {
    const current = getPatientSubmissions();
    const updated = current.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    safelyDispatchUpdateEvent();
  } catch (e) {
    console.error('Erro ao excluir submissão', e);
  }
};

/**
 * Altera status da resposta
 */
export const updatePatientSubmissionStatus = (
  id: string,
  status: 'novo' | 'importado' | 'arquivado'
): void => {
  try {
    const current = getPatientSubmissions();
    const updated = current.map((item) => (item.id === id ? { ...item, status } : item));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    safelyDispatchUpdateEvent();
  } catch (e) {
    console.error('Erro ao atualizar status', e);
  }
};

/**
 * Formata o link e mensagem para enviar ao paciente no WhatsApp
 */
export const formatShareLinkForWhatsApp = (params: {
  clinicName: string;
  clinicPhone: string;
  procedureTitle: string;
  patientPhone?: string;
  patientName?: string;
  docId?: string;
  formType?: InteractiveFormType;
}): { url: string; message: string; waLink: string } => {
  const origin = window.location.origin;
  const pathname = window.location.pathname;

  const type = params.formType || 'completo';

  const urlParams = new URLSearchParams();
  urlParams.set('paciente_portal', '1');
  urlParams.set('tipo', type);
  if (params.procedureTitle) urlParams.set('procedimento', params.procedureTitle);
  if (params.clinicName) urlParams.set('clinica', params.clinicName);
  if (params.clinicPhone) urlParams.set('retorno_wa', params.clinicPhone.replace(/\D/g, ''));
  if (params.patientName) urlParams.set('nome_paciente', params.patientName);
  if (params.docId) urlParams.set('doc_id', params.docId);

  const fullPortalUrl = `${origin}${pathname}?${urlParams.toString()}`;

  const cleanPatientName = params.patientName && !params.patientName.includes('Nome Completo') ? params.patientName : 'Paciente';

  let formLabel = 'Ficha Cadastral & Prontuário Clínico';
  if (type === 'anamnese') {
    formLabel = 'Ficha de Anamnese & Avaliação Clínica';
  } else if (type === 'completo') {
    formLabel = 'Ficha Cadastral & Anamnese Clínica Completa';
  }

  const message = `Olá, *${cleanPatientName}*! Tudo bem? ✨

Aqui é da *${params.clinicName || 'Clínica Estética'}*. 

Para garantir seu atendimento com máxima excelência, segurança e rapidez no seu procedimento de *${params.procedureTitle || 'Estética Avançada'}*, preparamos seu link exclusivo da *${formLabel}*.

📲 *Acesse o link abaixo no seu celular para preencher em apenas 2 minutos:*
👉 ${fullPortalUrl}

Ao finalizar, clique no botão para reenviar suas respostas diretamente para o nosso WhatsApp.

Qualquer dúvida, estamos à disposição! 🌸`;

  const cleanPhone = (params.patientPhone || '').replace(/\D/g, '');
  let waLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
  if (cleanPhone.length >= 10) {
    waLink = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(message)}`;
  }

  return {
    url: fullPortalUrl,
    message,
    waLink,
  };
};

/**
 * Formata as respostas do paciente em uma mensagem elegante para o WhatsApp
 */
export const formatSubmissionToWhatsAppText = (sub: PatientInteractiveSubmission): string => {
  const dataEnvio = new Date(sub.createdAt).toLocaleString('pt-BR');

  const isFichaCadastralOnly = sub.formType === 'ficha_cadastral';
  const isAnamneseOnly = sub.formType === 'anamnese';

  const docTitle = isFichaCadastralOnly
    ? '📋 RESPOSTAS DO PRONTUÁRIO & FICHA CADASTRAL'
    : isAnamneseOnly
    ? '🩺 RESPOSTAS DA ANAMNESE CLÍNICA'
    : '📋 RESPOSTAS DA FICHA CADASTRAL & ANAMNESE COMPLETA';

  const alergiasTxt = sub.alergias && sub.alergias.length > 0 ? sub.alergias.join(', ') : 'Nenhuma alergia relatada';
  const patologiasTxt = sub.condicoesClinicas && sub.condicoesClinicas.length > 0 ? sub.condicoesClinicas.join(', ') : 'Nenhuma patologia crônica relatada';
  const medsTxt = sub.medicamentosUso && sub.medicamentosUso.length > 0 ? sub.medicamentosUso.join(', ') : 'Nenhum medicamento contínuo';
  const procedsTxt = sub.procedimentosPrevios && sub.procedimentosPrevios.length > 0 ? sub.procedimentosPrevios.join(', ') : 'Nenhum procedimento estético prévio';

  let txt = `*${docTitle} - ${sub.clinicName.toUpperCase()}*\n`;
  txt += `══════════════════════════\n`;
  txt += `📅 *Data/Hora do Envio:* ${dataEnvio}\n`;
  txt += `🎯 *Procedimento:* ${sub.procedureTitle}\n\n`;

  txt += `👤 *DADOS CADASTRAIS DO(A) PACIENTE:*\n`;
  txt += `• *Nome Completo:* ${sub.patientName}\n`;
  txt += `• *CPF:* ${sub.patientCpf || 'Não informado'}\n`;
  if (sub.patientRg) txt += `• *RG:* ${sub.patientRg}\n`;
  txt += `• *Data de Nascimento:* ${sub.patientBirthDate || 'Não informada'}${sub.patientAge ? ` (${sub.patientAge} anos)` : ''}\n`;
  if (sub.patientGender) txt += `• *Gênero:* ${sub.patientGender}\n`;
  if (sub.patientMaritalStatus) txt += `• *Estado Civil:* ${sub.patientMaritalStatus}\n`;
  txt += `• *WhatsApp:* ${sub.patientPhone}\n`;
  if (sub.patientEmail) txt += `• *E-mail:* ${sub.patientEmail}\n`;
  if (sub.patientProfession) txt += `• *Profissão:* ${sub.patientProfession}\n`;
  if (sub.patientAddress) txt += `• *Endereço:* ${sub.patientAddress}\n`;
  if (sub.emergencyContactName) {
    txt += `• *Contato Emergência:* ${sub.emergencyContactName} ${sub.emergencyContactPhone ? `(${sub.emergencyContactPhone})` : ''} ${sub.emergencyContactRelationship ? `- ${sub.emergencyContactRelationship}` : ''}\n`;
  }

  // Seções da Ficha Cadastral / Prontuário
  txt += `\n🩺 *ANTECEDENTES DE SAÚDE & HISTÓRICO:*\n`;
  txt += `• *Condições de Saúde:* ${patologiasTxt}\n`;
  txt += `• *Alergias:* ${alergiasTxt}\n`;
  txt += `• *Medicamentos em Uso:* ${medsTxt}\n`;
  if (sub.gestanteLactante) txt += `• *Condição Fisiológica:* ${sub.gestanteLactante}\n`;
  if (sub.fumante) txt += `• *Tabagismo:* ${sub.fumante}\n`;
  if (sub.ingestaoAlcool) txt += `• *Consumo de Álcool:* ${sub.ingestaoAlcool}\n`;
  if (sub.atividadeFisica) txt += `• *Atividade Física:* ${sub.atividadeFisica}\n`;
  if (sub.consumoAgua) txt += `• *Ingestão de Água:* ${sub.consumoAgua}\n`;
  if (sub.tendenciaQueloide) txt += `• *Tendência a Quelóides:* ${sub.tendenciaQueloide}\n`;
  if (sub.historicoHerpes) txt += `• *Herpes Labial/Facial:* ${sub.historicoHerpes}\n`;
  txt += `• *Procedimentos Prévios:* ${procedsTxt}\n`;
  if (sub.possuiImplantesPermanentes) txt += `• *Implantes/PMMA Definitivo:* ${sub.possuiImplantesPermanentes}\n`;
  if (sub.cirurgiasPrevias) txt += `• *Cirurgias Prévias:* ${sub.cirurgiasPrevias}\n`;

  // Seção da Anamnese (se preenchida)
  if (!isFichaCadastralOnly || sub.queixaPrincipal || sub.expectativa) {
    txt += `\n✨ *AVALIAÇÃO CLÍNICA & QUEIXAS (ANAMNESE):*\n`;
    if (sub.queixaPrincipal) txt += `• *Queixa Principal:* ${sub.queixaPrincipal}\n`;
    if (sub.tempoQueixa) txt += `• *Tempo do Incômodo:* ${sub.tempoQueixa}\n`;
    if (sub.expectativa) txt += `• *Expectativa de Resultado:* ${sub.expectativa}\n`;
    if (sub.fototipo) txt += `• *Fototipo (Fitzpatrick):* Tipo ${sub.fototipo}\n`;
    if (sub.biotipo) txt += `• *Tipo de Pele:* ${sub.biotipo}\n`;
  }

  if (sub.observacoesPaciente) {
    txt += `\n📝 *OBSERVAÇÕES:* ${sub.observacoesPaciente}\n`;
  }

  txt += `══════════════════════════\n`;
  txt += `✅ *Declaração de Veracidade (Art. 299 CP):* Aceita pelo(a) paciente.\n`;
  txt += `✍️ *Assinatura Digital:* ${sub.assinaturaNome || sub.patientName}\n`;
  txt += `🆔 *Registro:* ${sub.id}`;

  return txt;
};

/**
 * Tenta fazer o parse de um texto colado do WhatsApp para recuperar os campos
 */
export const parseWhatsAppAnswersToSubmission = (text: string): Partial<PatientInteractiveSubmission> | null => {
  if (!text || !text.includes('RESPOSTAS DA FICHA') && !text.includes('DADOS DO(A) PACIENTE')) {
    return null;
  }

  const getLineMatch = (regex: RegExp) => {
    const match = text.match(regex);
    return match ? match[1].trim() : '';
  };

  const name = getLineMatch(/Nome Completo:\*?\s*([^\n\r]+)/i) || getLineMatch(/Nome:\*?\s*([^\n\r]+)/i);
  const cpf = getLineMatch(/CPF:\*?\s*([^\n\r]+)/i);
  const phone = getLineMatch(/WhatsApp:\*?\s*([^\n\r]+)/i) || getLineMatch(/Telefone:\*?\s*([^\n\r]+)/i);
  const birth = getLineMatch(/Data de Nascimento:\*?\s*([^\n\r]+)/i);
  const procedure = getLineMatch(/Procedimento de Interesse:\*?\s*([^\n\r]+)/i) || getLineMatch(/Procedimento:\*?\s*([^\n\r]+)/i);
  const queixa = getLineMatch(/Queixa Principal:\*?\s*([^\n\r]+)/i);
  const tempoQueixa = getLineMatch(/Tempo do Incômodo:\*?\s*([^\n\r]+)/i);
  const expectativa = getLineMatch(/Expectativa de Resultado:\*?\s*([^\n\r]+)/i);
  const alergiasStr = getLineMatch(/Alergias:\*?\s*([^\n\r]+)/i);
  const condicoesStr = getLineMatch(/Doenças\/Condições:\*?\s*([^\n\r]+)/i);
  const medsStr = getLineMatch(/Medicamentos em Uso:\*?\s*([^\n\r]+)/i);
  const obs = getLineMatch(/OBS:\*?\s*([^\n\r]+)/i);

  const alergias = alergiasStr && !alergiasStr.includes('Nenhuma') ? alergiasStr.split(',').map((s) => s.trim()) : [];
  const condicoesClinicas = condicoesStr && !condicoesStr.includes('Nenhuma') ? condicoesStr.split(',').map((s) => s.trim()) : [];
  const medicamentosUso = medsStr && !medsStr.includes('Nenhum') ? medsStr.split(',').map((s) => s.trim()) : [];

  return {
    patientName: name || 'Paciente Identificado',
    patientCpf: cpf || '',
    patientPhone: phone || '',
    patientBirthDate: birth || '',
    procedureTitle: procedure || 'Procedimento Estético',
    queixaPrincipal: queixa || '',
    tempoQueixa: tempoQueixa || '',
    expectativa: expectativa || '',
    alergias,
    condicoesClinicas,
    medicamentosUso,
    observacoesPaciente: obs || '',
    createdAt: new Date().toISOString(),
  };
};
