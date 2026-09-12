import React, { useRef, useEffect, useState } from 'react';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignJustify,
  CheckSquare,
  Sparkles,
  Printer,
  Download,
  Copy,
  Plus,
  Trash2,
  FileText,
  Search,
  Check,
  ShieldCheck,
  Award,
  RefreshCw,
  Eye,
  Edit3,
  Sun,
  Moon,
  Bookmark,
  Share2,
  Table as TableIcon,
  HelpCircle,
  FileDown,
  ChevronDown,
  ChevronRight,
  X,
  Layers,
  UserCheck,
  PenLine,
  FileType,
  Loader2,
  BookOpen,
  SplitSquareVertical,
  SlidersHorizontal,
  ArrowLeft,
  GraduationCap,
  Microscope,
  FlaskConical,
  Pill
} from 'lucide-react';
import { DocumentItem, ClinicData, PlanType } from '../types';
import {
  replaceClinicVariables,
  splitContentForTwoPages,
  splitContentIntoPages,
  generateSignatureBlockHtml,
  getA4PrintStyles,
  buildTwoPageA4Html,
  buildMultiPageA4Html,
  buildAllDocumentsBundleHtml
} from '../utils/a4Formatter';
import { getStepCategoryForDocument } from '../utils/stepCategoryHelper';
import { ScientificEvidenceModal } from './ScientificEvidenceModal';
import { getClinicalEvidenceForDoc } from '../data/prescricoes-evidence';
import { InteractivePrescriptionBuilder } from './InteractivePrescriptionBuilder';
import { identifyProcedureContext, getInitialPatientState } from '../utils/procedureClinicalDocsHelper';

interface DocumentEditorProps {
  documents: DocumentItem[];
  currentDocId: string;
  onSelectDoc: (id: string) => void;
  onUpdateDocContent: (id: string, newContent: string) => void;
  onUpdateDocDetails?: (id: string, updates: Partial<DocumentItem>) => void;
  onCreateDoc: () => void;
  onDuplicateDoc: (id: string) => void;
  onDeleteDoc?: (id: string) => void;
  clinicData: ClinicData;
  onUpdateClinicData?: (newData: ClinicData) => void;
  onApplyClinicDataToAll?: (newData: ClinicData) => void;
  onOpenClinicProfile?: () => void;
  onBackToHub?: () => void;
  plan: PlanType;
  onToast: (msg: string) => void;
}

export const DocumentEditor: React.FC<DocumentEditorProps> = ({
  documents,
  currentDocId,
  onSelectDoc,
  onUpdateDocContent,
  onUpdateDocDetails,
  onCreateDoc,
  onDuplicateDoc,
  onDeleteDoc,
  clinicData,
  onUpdateClinicData,
  onApplyClinicDataToAll,
  onOpenClinicProfile,
  onBackToHub,
  plan,
  onToast,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('TODOS');
  const [previewMode, setPreviewMode] = useState<'a4_two_pages' | 'edit' | 'preview'>('a4_two_pages');
  const [pageOrientation, setPageOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [canvasTheme, setCanvasTheme] = useState<'light' | 'dark'>('light');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [isActionsDropdownOpen, setIsActionsDropdownOpen] = useState<boolean>(false);
  const [docNeedsPatientSig, setDocNeedsPatientSig] = useState<Record<string, boolean>>({});
  const [isExportingPDF, setIsExportingPDF] = useState<boolean>(false);
  const [exportingDocId, setExportingDocId] = useState<string | null>(null);
  const [isMetaModalOpen, setIsMetaModalOpen] = useState<boolean>(false);
  const [editMetaTitle, setEditMetaTitle] = useState<string>('');
  const [editMetaCategory, setEditMetaCategory] = useState<string>('POP');
  const [editMetaVersion, setEditMetaVersion] = useState<string>('');
  const [editMetaNotes, setEditMetaNotes] = useState<string>('');

  // Variables Editor Modal State
  const [isVariablesModalOpen, setIsVariablesModalOpen] = useState<boolean>(false);
  const [isSanitaryFormsModalOpen, setIsSanitaryFormsModalOpen] = useState<boolean>(false);
  const [isScientificModalOpen, setIsScientificModalOpen] = useState<boolean>(false);
  const [isPrescriptionBuilderOpen, setIsPrescriptionBuilderOpen] = useState<boolean>(false);
  const [variableFormValues, setVariableFormValues] = useState<Record<string, string>>({});
  const [newVarKey, setNewVarKey] = useState<string>('');
  const [newVarVal, setNewVarVal] = useState<string>('');
  const [varTab, setVarTab] = useState<'detected' | 'all' | 'custom'>('detected');

  const editorRef = useRef<HTMLDivElement | null>(null);

  const currentDoc = documents.find((d) => d.id === currentDocId) || documents[0];
  const isCurrentDocPrescription =
    (currentDoc.category as string) === 'Prescrição' ||
    currentDoc.id.toLowerCase().includes('prescricao') ||
    currentDoc.title.toLowerCase().includes('prescri') ||
    currentDoc.title.toLowerCase().includes('receitu');

  // Determine if patient signature is required (defaults to true for TCLE, Anamnese, LGPD, etc.)
  const isPatientSignatureNeeded = (doc: DocumentItem = currentDoc): boolean => {
    if (docNeedsPatientSig[doc.id] !== undefined) {
      return docNeedsPatientSig[doc.id];
    }
    const cat = doc.category?.toUpperCase() || '';
    const title = doc.title?.toLowerCase() || '';
    return (
      cat === 'TCLE' ||
      cat === 'ANAMNESE' ||
      cat === 'LGPD' ||
      title.includes('termo') ||
      title.includes('consentimento') ||
      title.includes('recusa') ||
      title.includes('autorização')
    );
  };

  const togglePatientSignature = () => {
    const currentVal = isPatientSignatureNeeded(currentDoc);
    setDocNeedsPatientSig((prev) => ({
      ...prev,
      [currentDoc.id]: !currentVal,
    }));
    onToast(!currentVal ? 'Campo de Assinatura do Paciente ativado!' : 'Campo de Assinatura do Paciente desativado.');
  };

  // Direct High-Quality Client-Side 2-Page A4 PDF Generation & Download
  const handleExportPDF = async (
    targetDoc: DocumentItem = currentDoc,
    orientation: 'portrait' | 'landscape' = pageOrientation
  ) => {
    setIsExportingPDF(true);
    setExportingDocId(targetDoc.id);
    const modeLabel = orientation === 'landscape' ? 'Paisagem' : 'Retrato';
    onToast(`Gerando PDF A4 (${modeLabel}) de "${targetDoc.title}"...`);

    try {
      const needsPatient = isPatientSignatureNeeded(targetDoc);
      const isCurrentlyOpen = targetDoc.id === currentDoc.id;
      const rawContent = (isCurrentlyOpen && editorRef.current) 
        ? editorRef.current.innerHTML 
        : targetDoc.content;
      
      const fullTwoPageHtml = buildTwoPageA4Html(targetDoc, clinicData, rawContent, needsPatient, orientation);

      // Create temporary offscreen container
      const container = document.createElement('div');
      container.innerHTML = fullTwoPageHtml;

      const sanitizedFilename = `${targetDoc.title.toLowerCase().replace(/[^a-z0-9]/gi, '_')}_a4_${orientation}.pdf`;

      const opt = {
        margin: orientation === 'landscape' ? ([4, 6, 4, 6] as [number, number, number, number]) : ([6, 8, 6, 8] as [number, number, number, number]),
        filename: sanitizedFilename,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: orientation },
        pagebreak: { mode: ['css', 'legacy'] }
      };

      await html2pdf().set(opt).from(container).save();
      onToast(`PDF A4 (${modeLabel}) baixado: ${sanitizedFilename}`);
    } catch (error) {
      console.error('Erro ao gerar PDF via html2pdf:', error);
      handlePrint(orientation);
    } finally {
      setIsExportingPDF(false);
      setExportingDocId(null);
    }
  };

  useEffect(() => {
    if (editorRef.current && currentDoc) {
      editorRef.current.innerHTML = currentDoc.content;
    }
  }, [currentDocId, currentDoc]);

  const handleContentInput = () => {
    if (editorRef.current && currentDoc) {
      onUpdateDocContent(currentDoc.id, editorRef.current.innerHTML);
    }
  };

  const executeCommand = (command: string, value: string | undefined = undefined) => {
    if (!editorRef.current) return;
    editorRef.current.focus();

    if (command === 'h1') {
      document.execCommand('formatBlock', false, '<h1>');
    } else if (command === 'h2') {
      document.execCommand('formatBlock', false, '<h2>');
    } else if (command === 'h3') {
      document.execCommand('formatBlock', false, '<h3>');
    } else if (command === 'p') {
      document.execCommand('formatBlock', false, '<p>');
    } else if (command === 'list') {
      document.execCommand('insertUnorderedList');
    } else if (command === 'orderedList') {
      document.execCommand('insertOrderedList');
    } else if (command === 'checklist') {
      document.execCommand('insertHTML', false, '<p>☑ <strong>Item de Conformidade:</strong> Conforme [ ] Não Conforme [ ]</p>');
    } else if (command === 'table') {
      const tableHtml = `
        <table style="width:100%; border-collapse:collapse; margin: 12px 0; font-size:12px;" border="1">
          <thead>
            <tr style="background:#f1f5f9;">
              <th style="padding:6px; border:1px solid #cbd5e1;">Etapa / Parâmetro</th>
              <th style="padding:6px; border:1px solid #cbd5e1;">Critério Sanitário</th>
              <th style="padding:6px; border:1px solid #cbd5e1;">Responsável</th>
              <th style="padding:6px; border:1px solid #cbd5e1;">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:6px; border:1px solid #cbd5e1;">01. Avaliação Prévia</td>
              <td style="padding:6px; border:1px solid #cbd5e1;">Anamnese e TCLE assinados</td>
              <td style="padding:6px; border:1px solid #cbd5e1;">{{responsavel_tecnico}}</td>
              <td style="padding:6px; border:1px solid #cbd5e1;">Aprovado</td>
            </tr>
          </tbody>
        </table>
      `;
      document.execCommand('insertHTML', false, tableHtml);
    } else {
      document.execCommand(command, false, value);
    }
    handleContentInput();
  };

  const VARIABLE_DICTIONARY: Record<string, { label: string; defaultProp: keyof ClinicData | string; category: string; placeholder: string }> = {
    nome_clinica: { label: 'Nome da Clínica', defaultProp: 'nomeClinica', category: 'Clínica', placeholder: 'Ex: Sua Clínica / Studio de Estética' },
    responsavel_tecnico: { label: 'Responsável Técnico(a)', defaultProp: 'responsavel', category: 'Profissional', placeholder: 'Ex: Dra. Nome Completo (CRBM/CRM 0000)' },
    responsavel: { label: 'Responsável Técnico(a)', defaultProp: 'responsavel', category: 'Profissional', placeholder: 'Ex: Dra. Nome Completo' },
    registro_conselho: { label: 'Registro no Conselho (CRBM/CRM/COREN)', defaultProp: 'registroConselho', category: 'Profissional', placeholder: 'Ex: CRBM 00000 / SP' },
    registro_profissional: { label: 'Registro Profissional', defaultProp: 'registroConselho', category: 'Profissional', placeholder: 'Ex: CRBM 00000' },
    alvara: { label: 'Alvará Sanitário', defaultProp: 'alvara', category: 'Clínica', placeholder: 'Ex: ALV-2026-VISA-00' },
    alvara_sanitario: { label: 'Alvará Sanitário', defaultProp: 'alvara', category: 'Clínica', placeholder: 'Ex: ALV-2026-VISA-00' },
    endereco: { label: 'Endereço Comercial', defaultProp: 'endereco', category: 'Clínica', placeholder: 'Ex: Rua / Av., Número - Bairro' },
    cidade: { label: 'Cidade / UF', defaultProp: 'cidade', category: 'Clínica', placeholder: 'Ex: São Paulo - SP' },
    cidade_uf: { label: 'Cidade / UF', defaultProp: 'cidade', category: 'Clínica', placeholder: 'Ex: São Paulo - SP' },
    telefone: { label: 'Telefone de Contato', defaultProp: 'telefone', category: 'Clínica', placeholder: 'Ex: (11) 99999-9999' },
    whatsapp: { label: 'WhatsApp', defaultProp: 'whatsapp', category: 'Clínica', placeholder: 'Ex: (11) 99999-9999' },
    email: { label: 'E-mail da Clínica', defaultProp: 'email', category: 'Clínica', placeholder: 'Ex: contato@suaclinica.com.br' },
    nome_cliente: { label: 'Nome do Paciente / Cliente', defaultProp: 'nomeCliente', category: 'Paciente', placeholder: 'Ex: Nome Completo do(a) Paciente' },
    rg_cliente: { label: 'RG do Paciente', defaultProp: 'rgCliente', category: 'Paciente', placeholder: 'Ex: 00.000.000-0 SSP/SP' },
    data: { label: 'Data do Documento', defaultProp: 'dataDocumento', category: 'Documento', placeholder: new Date().toLocaleDateString('pt-BR') },
    data_documento: { label: 'Data do Documento', defaultProp: 'dataDocumento', category: 'Documento', placeholder: new Date().toLocaleDateString('pt-BR') },
    procedimento: { label: 'Nome do Procedimento', defaultProp: 'procedimento', category: 'Procedimento', placeholder: 'Ex: Toxina Botulínica / Bioestimulador' },
    equipamento: { label: 'Equipamento / Aparelho', defaultProp: 'equipamento', category: 'Procedimento', placeholder: 'Ex: Laser / Radiofrequência / Ultrassom' },
    registro_anvisa: { label: 'Registro ANVISA do Equipamento', defaultProp: 'registroAnvisa', category: 'Procedimento', placeholder: 'Ex: MS nº 80000000000' },
    valor: { label: 'Valor / Honorários', defaultProp: 'valorHonorarios', category: 'Financeiro', placeholder: 'Ex: R$ 1.500,00' },
    valor_honorarios: { label: 'Valor dos Honorários', defaultProp: 'valorHonorarios', category: 'Financeiro', placeholder: 'Ex: R$ 1.500,00' },
  };

  const detectVariablesInDoc = (htmlText: string): string[] => {
    if (!htmlText) return [];
    const regex = /\{\{([a-zA-Z0-9_\-]+)\}\}/g;
    const found = new Set<string>();
    let m;
    while ((m = regex.exec(htmlText)) !== null) {
      found.add(m[1].toLowerCase());
    }
    return Array.from(found);
  };

  const handleOpenVariablesModal = () => {
    const rawContent = editorRef.current ? editorRef.current.innerHTML : currentDoc.content;
    const detected = detectVariablesInDoc(rawContent);

    const initialValues: Record<string, string> = {
      nome_clinica: clinicData.nomeClinica || '',
      cnpj: clinicData.cnpj || '',
      responsavel_tecnico: clinicData.responsavel || '',
      responsavel: clinicData.responsavel || '',
      registro_conselho: clinicData.registroConselho || '',
      alvara: clinicData.alvara || '',
      alvara_sanitario: clinicData.alvara || '',
      endereco: clinicData.endereco || '',
      cidade: clinicData.cidade || '',
      cidade_uf: clinicData.cidade || '',
      telefone: clinicData.telefone || clinicData.whatsapp || '',
      whatsapp: clinicData.whatsapp || clinicData.telefone || '',
      email: clinicData.email || '',
      nome_cliente: clinicData.nomeCliente || '',
      cpf_cliente: clinicData.cpfCliente || '',
      rg_cliente: clinicData.rgCliente || '',
      data: clinicData.dataDocumento || new Date().toLocaleDateString('pt-BR'),
      procedimento: clinicData.procedimento || currentDoc.title || '',
      equipamento: clinicData.equipamento || '',
      registro_anvisa: clinicData.registroAnvisa || '',
      valor: clinicData.valorHonorarios || '',
      valor_honorarios: clinicData.valorHonorarios || '',
    };

    if (clinicData.customVariables) {
      Object.entries(clinicData.customVariables).forEach(([k, v]) => {
        initialValues[k] = String(v ?? '');
      });
    }

    detected.forEach((tag) => {
      if (initialValues[tag] === undefined) {
        initialValues[tag] = '';
      }
    });

    setVariableFormValues(initialValues);
    setVarTab(detected.length > 0 ? 'detected' : 'all');
    setIsVariablesModalOpen(true);
  };

  const handleApplyVariablesToDocText = () => {
    if (!editorRef.current || !currentDoc) return;
    let html = editorRef.current.innerHTML;

    Object.entries(variableFormValues).forEach(([tag, val]) => {
      const stringVal = String(val ?? '');
      if (stringVal.trim() !== '') {
        const regex = new RegExp(`\\{\\{${tag}\\}\\}`, 'gi');
        html = html.replace(regex, stringVal);
      }
    });

    editorRef.current.innerHTML = html;
    onUpdateDocContent(currentDoc.id, html);
    setIsVariablesModalOpen(false);
    onToast('Campos substituídos com sucesso no texto do documento!');
  };

  const handleSaveVariablesGlobally = () => {
    if (!onUpdateClinicData) {
      onToast('Dados aplicados localmente.');
      setIsVariablesModalOpen(false);
      return;
    }

    const customVars: Record<string, string> = { ...(clinicData.customVariables || {}) };
    
    // Check for any extra custom variables from variableFormValues
    Object.entries(variableFormValues).forEach(([k, v]) => {
      if (!VARIABLE_DICTIONARY[k]) {
        customVars[k] = String(v ?? '');
      }
    });

    const updatedClinic: ClinicData = {
      ...clinicData,
      nomeClinica: variableFormValues.nome_clinica || clinicData.nomeClinica,
      cnpj: variableFormValues.cnpj || clinicData.cnpj,
      responsavel: variableFormValues.responsavel_tecnico || variableFormValues.responsavel || clinicData.responsavel,
      registroConselho: variableFormValues.registro_conselho || clinicData.registroConselho,
      alvara: variableFormValues.alvara || variableFormValues.alvara_sanitario || clinicData.alvara,
      endereco: variableFormValues.endereco || clinicData.endereco,
      cidade: variableFormValues.cidade || variableFormValues.cidade_uf || clinicData.cidade,
      telefone: variableFormValues.telefone || clinicData.telefone,
      whatsapp: variableFormValues.whatsapp || clinicData.whatsapp,
      email: variableFormValues.email || clinicData.email,
      nomeCliente: variableFormValues.nome_cliente || clinicData.nomeCliente,
      cpfCliente: variableFormValues.cpf_cliente || clinicData.cpfCliente,
      rgCliente: variableFormValues.rg_cliente || clinicData.rgCliente,
      dataDocumento: variableFormValues.data || clinicData.dataDocumento,
      procedimento: variableFormValues.procedimento || clinicData.procedimento,
      equipamento: variableFormValues.equipamento || clinicData.equipamento,
      registroAnvisa: variableFormValues.registro_anvisa || clinicData.registroAnvisa,
      valorHonorarios: variableFormValues.valor || variableFormValues.valor_honorarios || clinicData.valorHonorarios,
      customVariables: customVars,
    };

    if (onApplyClinicDataToAll) {
      onApplyClinicDataToAll(updatedClinic);
    } else if (onUpdateClinicData) {
      onUpdateClinicData(updatedClinic);
    }
    setIsVariablesModalOpen(false);
    onToast('Valores globais de variáveis salvos para toda a clínica!');
  };

  const handleApplyToAllFromVariablesModal = () => {
    const customVars: Record<string, string> = { ...(clinicData.customVariables || {}) };
    Object.entries(variableFormValues).forEach(([k, v]) => {
      if (!VARIABLE_DICTIONARY[k]) {
        customVars[k] = String(v ?? '');
      }
    });

    const updatedClinic: ClinicData = {
      ...clinicData,
      nomeClinica: variableFormValues.nome_clinica || clinicData.nomeClinica,
      cnpj: variableFormValues.cnpj || clinicData.cnpj,
      responsavel: variableFormValues.responsavel_tecnico || variableFormValues.responsavel || clinicData.responsavel,
      registroConselho: variableFormValues.registro_conselho || clinicData.registroConselho,
      alvara: variableFormValues.alvara || variableFormValues.alvara_sanitario || clinicData.alvara,
      endereco: variableFormValues.endereco || clinicData.endereco,
      cidade: variableFormValues.cidade || variableFormValues.cidade_uf || clinicData.cidade,
      telefone: variableFormValues.telefone || clinicData.telefone,
      whatsapp: variableFormValues.whatsapp || clinicData.whatsapp,
      email: variableFormValues.email || clinicData.email,
      nomeCliente: variableFormValues.nome_cliente || clinicData.nomeCliente,
      cpfCliente: variableFormValues.cpf_cliente || clinicData.cpfCliente,
      rgCliente: variableFormValues.rg_cliente || clinicData.rgCliente,
      dataDocumento: variableFormValues.data || clinicData.dataDocumento,
      procedimento: variableFormValues.procedimento || clinicData.procedimento,
      equipamento: variableFormValues.equipamento || clinicData.equipamento,
      registroAnvisa: variableFormValues.registro_anvisa || clinicData.registroAnvisa,
      valorHonorarios: variableFormValues.valor || variableFormValues.valor_honorarios || clinicData.valorHonorarios,
      customVariables: customVars,
    };

    if (onApplyClinicDataToAll) {
      onApplyClinicDataToAll(updatedClinic);
    } else if (onUpdateClinicData) {
      onUpdateClinicData(updatedClinic);
    }

    if (editorRef.current && currentDoc) {
      const replaced = replaceClinicVariables(editorRef.current.innerHTML, updatedClinic);
      editorRef.current.innerHTML = replaced;
      onUpdateDocContent(currentDoc.id, replaced);
    }

    setIsVariablesModalOpen(false);
    onToast(`⚡ Dados aplicados em todos os ${documents.length} documentos com sucesso!`);
  };

  const handleAddCustomVarFromModal = () => {
    const cleanKey = newVarKey.trim().replace(/^\{\{/, '').replace(/\}\}$/, '').toLowerCase().replace(/\s+/g, '_');
    if (!cleanKey) {
      onToast('Informe o nome da chave.');
      return;
    }

    setVariableFormValues((prev) => ({
      ...prev,
      [cleanKey]: newVarVal.trim(),
    }));

    if (onUpdateClinicData) {
      const updatedClinic = {
        ...clinicData,
        customVariables: {
          ...(clinicData.customVariables || {}),
          [cleanKey]: newVarVal.trim(),
        },
      };
      onUpdateClinicData(updatedClinic);
    }

    setNewVarKey('');
    setNewVarVal('');
    onToast(`Chave {{${cleanKey}}} adicionada!`);
  };

  const insertVariable = (variable: string) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand('insertText', false, variable);
    handleContentInput();
  };

  const applyClinicVariables = () => {
    if (!editorRef.current || !currentDoc) return;
    const replaced = replaceClinicVariables(editorRef.current.innerHTML, clinicData);
    editorRef.current.innerHTML = replaced;
    onUpdateDocContent(currentDoc.id, replaced);
    onToast(`Dados da clínica "${clinicData.nomeClinica}" aplicados no documento atual!`);
  };

  const handleOpenMetaModal = (doc: DocumentItem = currentDoc) => {
    setEditMetaTitle(doc.title);
    setEditMetaCategory(doc.category || 'POP');
    setEditMetaVersion(doc.version || 'V 1.0');
    setEditMetaNotes(doc.adaptationNotes || '');
    setIsMetaModalOpen(true);
  };

  const handleSaveMetaChanges = () => {
    if (!editMetaTitle.trim()) {
      onToast('Por favor, informe um título válido para o documento.');
      return;
    }

    if (onUpdateDocDetails) {
      onUpdateDocDetails(currentDoc.id, {
        title: editMetaTitle.trim(),
        category: editMetaCategory as any,
        version: editMetaVersion.trim() || 'V 1.0',
        adaptationNotes: editMetaNotes.trim(),
      });
    }
    setIsMetaModalOpen(false);
    onToast('Informações e título do documento atualizados!');
  };

  const insertSnippet = (type: 'etapa' | 'parametro' | 'epi' | 'descarte' | 'responsabilidade') => {
    if (!editorRef.current) return;
    editorRef.current.focus();

    let snippet = '';
    if (type === 'etapa') {
      snippet = `
        <h3>Etapa Adicional do Procedimento (Personalizada):</h3>
        <p><strong>Descrição da Etapa:</strong> Realizar a conferência prévia dos materiais, paramentação com EPIs e assepsia rigorosa da área de aplicação.</p>
      `;
    } else if (type === 'parametro') {
      snippet = `
        <h3>Parâmetros Técnicos & Equipamento Utilizado:</h3>
        <p>• <strong>Equipamento / Marca:</strong> Registro ANVISA nº [Preencher nº de Registro]<br>
• <strong>Parâmetros Operacionais:</strong> Potência / Frequência / Duração regulados conforme o fototipo e protocolo específico do paciente.</p>
      `;
    } else if (type === 'epi') {
      snippet = `
        <h3>Biossegurança & EPIs Obrigatórios:</h3>
        <p>• Uso obrigatório de luvas de procedimento descartáveis, máscara cirúrgica tripla ou N95/PFF2, óculos de proteção e jaleco/avental.<br>
• Higienização das mãos antes e após a assistência segundo a técnica preconizada pela ANVISA.</p>
      `;
    } else if (type === 'descarte') {
      snippet = `
        <h3>Gerenciamento de Resíduos Sanitários (PGRSS):</h3>
        <p>• <strong>Grupo E (Pérfuro-cortantes):</strong> Descarte imediato em coletor rígido estéril Descarpack, sem reencapar agulhas.<br>
• <strong>Grupo A (Resíduos Biológicos):</strong> Acondicionamento em saco plástico branco leitoso com símbolo de substância infectante.</p>
      `;
    } else if (type === 'responsabilidade') {
      snippet = `
        <h3>Responsabilidade Técnica & Auditoria Interna:</h3>
        <p>• <strong>Executante Habilitado:</strong> Profissional com graduação e especialização com registro ativo no conselho de classe.<br>
• <strong>Auditoria de Rotina:</strong> Verificação mensal dos lotes de esterilização da autoclave e monitoramento biológico.</p>
      `;
    }

    document.execCommand('insertHTML', false, snippet);
    handleContentInput();
    onToast('Bloco inserido no documento!');
  };

  const handlePrint = (orientation: 'portrait' | 'landscape' = pageOrientation) => {
    const rawContent = editorRef.current ? editorRef.current.innerHTML : currentDoc.content;
    const needsPatient = isPatientSignatureNeeded(currentDoc);
    const fullHtml = buildTwoPageA4Html(currentDoc, clinicData, rawContent, needsPatient, orientation);

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      onToast('Bloqueador de popup ativado. Permita popups para imprimir.');
      return;
    }

    printWindow.document.write(fullHtml);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 400);
  };

  const handleDownloadAllDocumentsHTML = () => {
    onToast('Gerando compêndio completo com todos os documentos em HTML...');
    try {
      const fullHtml = buildAllDocumentsBundleHtml(documents, clinicData, docNeedsPatientSig);
      const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const clinicSlug = (clinicData.nomeClinica || 'clinica_estetica')
        .toLowerCase()
        .replace(/[^a-z0-9]/gi, '_');
      a.download = `compendio_completo_${documents.length}_documentos_${clinicSlug}.html`;
      a.click();
      URL.revokeObjectURL(url);
      onToast(`Compêndio completo com ${documents.length} documentos baixado com sucesso em HTML!`);
    } catch (err) {
      console.error('Erro ao gerar compêndio HTML:', err);
      onToast('Erro ao gerar arquivo HTML de todos os documentos.');
    }
  };

  const handleDownloadHTML = (orientation: 'portrait' | 'landscape' = pageOrientation) => {
    const rawContent = editorRef.current ? editorRef.current.innerHTML : currentDoc.content;
    const needsPatient = isPatientSignatureNeeded(currentDoc);
    const fullHtml = buildMultiPageA4Html(currentDoc, clinicData, rawContent, needsPatient, orientation);

    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentDoc.title.toLowerCase().replace(/[^a-z0-9]/gi, '_')}_a4_${orientation}.html`;
    a.click();
    URL.revokeObjectURL(url);
    onToast(`Arquivo HTML A4 (${orientation === 'landscape' ? 'Paisagem' : 'Retrato'}) baixado!`);
  };

  const handleDownloadDoc = () => {
    if (!editorRef.current) return;
    const needsPatient = isPatientSignatureNeeded();
    const contentHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>${currentDoc.title}</title>
        <style>
          body { font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.5; }
          h2 { font-size: 14pt; color: #003366; }
          p { margin-bottom: 8pt; text-align: justify; }
        </style>
      </head>
      <body>
        <h1>${clinicData.nomeClinica || 'CLÍNICA ESTÉTICA'}</h1>
        <p><strong>Resp. Técnico:</strong> ${clinicData.responsavel || 'Responsável'} | <strong>Alvará:</strong> ${clinicData.alvara || 'Vigente'}</p>
        <hr/>
        ${editorRef.current.innerHTML}
        <br/><br/>
        <table style="width:100%; border:none; margin-top:30px;" border="0">
          <tr>
            ${needsPatient ? `
            <td style="width:50%; text-align:center; vertical-align:bottom; border:none; padding:10px;">
              <div style="border-bottom:1px solid #000; width:80%; margin:0 auto 6px auto; height:40px;"></div>
              <strong>${clinicData.nomeCliente || 'Assinatura do(a) Paciente / Cliente'}</strong><br/>
              <small>Data: ____/____/________</small>
            </td>` : ''}
            <td style="width:${needsPatient ? '50%' : '100%'}; text-align:center; vertical-align:bottom; border:none; padding:10px;">
              <div style="border-bottom:1px solid #000; width:${needsPatient ? '80%' : '45%'}; margin:0 auto 6px auto; height:40px;"></div>
              <strong>${clinicData.responsavel || 'Responsável Técnico(a)'}</strong><br/>
              <small>${clinicData.nomeClinica || 'Clínica Estética'} | Alvará: ${clinicData.alvara || 'Vigente'}</small>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', contentHtml], {
      type: 'application/msword'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentDoc.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.doc`;
    link.click();
    URL.revokeObjectURL(url);
    onToast('Documento exportado para Word (.doc)!');
  };

  // Categories for intuitive clinical organization
  const categories = [
    'TODOS',
    'Injetáveis',
    'Tecnologias',
    'Peelings',
    'Biossegurança',
    'Cadernos',
    'TCLE / Anamnese',
    'Contratos',
    'Base ANVISA'
  ];

  // Filter docs
  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.adaptationNotes && doc.adaptationNotes.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;
    if (activeCategory === 'TODOS') return true;

    const stepCat = getStepCategoryForDocument(doc);
    switch (activeCategory) {
      case 'Injetáveis':
        return stepCat.includes('Injetáveis') || doc.id.includes('injetaveis');
      case 'Tecnologias':
        return stepCat.includes('Tecnologias') || doc.id.includes('laser') || doc.id.includes('hifu') || doc.id.includes('lavieen');
      case 'Peelings':
        return stepCat.includes('Peelings') || doc.id.includes('peeling') || doc.id.includes('dermaplaning');
      case 'Biossegurança':
        return stepCat.includes('Biossegurança') || doc.id.includes('autoclave') || doc.id.includes('cme') || doc.id.includes('urgencia');
      case 'Cadernos':
        return stepCat.includes('Cadernos') || doc.id.includes('mtr') || doc.id.includes('caderno') || doc.id.includes('livro');
      case 'TCLE / Anamnese':
        return stepCat.includes('Anamneses') || doc.category === 'TCLE' || doc.category === 'Anamnese' || doc.category === 'LGPD';
      case 'Contratos':
        return stepCat.includes('Contratos') || doc.category === 'Contrato';
      case 'Base ANVISA':
        return stepCat.includes('Base') || doc.category === 'Manual';
      default:
        return doc.category === activeCategory;
    }
  });

  // Sub-component for document listing (reused on Desktop sidebar and Mobile drawer)
  const renderDocList = () => (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Search and Filters */}
      <div className="p-3 border-b border-[#262626] space-y-2 shrink-0">
        <div className="flex items-center gap-2 px-3 py-2 bg-[#171717] border border-[#333333] rounded-xl focus-within:border-[#00B1EA] transition">
          <Search className="w-4 h-4 text-[#888888] shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar POP, TCLE ou Anamnese..."
            className="w-full bg-transparent outline-none text-[13px] text-[#F5F5F5] placeholder:text-[#666666]"
          />
        </div>

        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase whitespace-nowrap transition ${
                activeCategory === cat
                  ? 'bg-[#00B1EA] text-black font-extrabold shadow-sm'
                  : 'bg-[#1C1C1C] text-[#888888] hover:text-[#EEEEEE] hover:bg-[#262626]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents List */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5">
        {filteredDocs.length === 0 ? (
          <div className="p-6 text-center text-[#666666] text-[13px]">
            Nenhum documento encontrado para "{searchTerm}"
          </div>
        ) : (
          filteredDocs.map((doc) => {
            const isSelected = currentDoc.id === doc.id;
            const isThisDocExporting = isExportingPDF && exportingDocId === doc.id;

            return (
              <div
                key={doc.id}
                onClick={() => {
                  onSelectDoc(doc.id);
                  setIsMobileDrawerOpen(false);
                }}
                className={`w-full text-left p-3 rounded-xl transition border cursor-pointer group flex flex-col gap-1.5 ${
                  isSelected
                    ? 'bg-[#1C1C1C] text-white border-[#00B1EA] shadow-md shadow-[#00B1EA]/10 ring-1 ring-[#00B1EA]/30'
                    : 'bg-[#141414] hover:bg-[#1A1A1A] text-[#BBBBBB] border-[#262626] hover:border-[#383838]'
                }`}
              >
                {/* Item Header: Category Badge & Status Indicator */}
                <div className="flex items-center justify-between gap-2 w-full">
                  <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded font-black tracking-widest uppercase shrink-0 ${
                        isSelected
                          ? 'bg-[#00B1EA] text-black shadow-sm'
                          : 'bg-[#222222] text-[#888888]'
                      }`}
                    >
                      {doc.category}
                    </span>
                    {doc.version && (
                      <span className="text-[10px] text-[#666666] font-mono shrink-0">
                        {doc.version.split(' - ')[0] || doc.version}
                      </span>
                    )}
                  </div>

                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      isSelected ? 'bg-[#00D3A1] shadow-[0_0_6px_#00D3A1]' : 'bg-[#333333]'
                    }`}
                  />
                </div>

                {/* Full Document Title - Clean and readable */}
                <div className="w-full">
                  <p
                    className={`text-[13px] sm:text-[13.5px] leading-snug break-words ${
                      isSelected
                        ? 'text-white font-bold'
                        : 'text-[#EDEDED] font-medium group-hover:text-white'
                    }`}
                  >
                    {doc.title}
                  </p>
                  {doc.adaptationNotes && (
                    <p className="text-[11px] text-[#737373] line-clamp-1 mt-0.5 leading-tight font-normal">
                      {doc.adaptationNotes}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Sidebar Actions */}
      <div className="p-3 border-t border-[#262626] bg-[#0E0E0E] flex gap-2 shrink-0">
        <button
          onClick={() => {
            onCreateDoc();
            setIsMobileDrawerOpen(false);
          }}
          className="flex-1 h-9 rounded-xl bg-[#1C1C1C] hover:bg-[#262626] border border-[#333333] text-[12px] text-white font-medium flex items-center justify-center gap-1.5 transition active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 text-[#00D3A1]" />
          Novo POP
        </button>
        <button
          onClick={() => {
            onDuplicateDoc(currentDoc.id);
            setIsMobileDrawerOpen(false);
          }}
          className="flex-1 h-9 rounded-xl bg-[#1C1C1C] hover:bg-[#262626] border border-[#333333] text-[12px] text-white font-medium flex items-center justify-center gap-1.5 transition active:scale-95"
        >
          <Copy className="w-3.5 h-3.5 text-[#00B1EA]" />
          Duplicar
        </button>
        {onDeleteDoc && (
          <button
            onClick={() => {
              if (window.confirm(`Deseja realmente remover "${currentDoc.title}" da sua lista?`)) {
                onDeleteDoc(currentDoc.id);
                setIsMobileDrawerOpen(false);
              }
            }}
            className="h-9 px-3 rounded-xl bg-[#2A1515] hover:bg-[#3A1818] border border-[#4A2020] text-red-400 flex items-center justify-center transition active:scale-95"
            title="Excluir documento selecionado"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#0A0A0A]">
      {/* Desktop Sidebar Navigation */}
      <aside className="hidden md:flex md:w-[320px] lg:w-[340px] border-r border-[#262626] bg-[#121212] flex-col h-[calc(100vh-56px)] shrink-0">
        {renderDocList()}
      </aside>

      {/* Mobile Current Doc Selector Bar */}
      <div className="md:hidden bg-[#141414] border-b border-[#262626] px-3 py-2.5 flex items-center justify-between gap-2.5 shrink-0">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="text-[9px] px-1.5 py-0.5 rounded font-black tracking-widest uppercase bg-[#00B1EA] text-black shrink-0">
            {currentDoc.category}
          </span>
          <span className="text-[12.5px] font-bold text-white leading-tight line-clamp-2 break-words">
            {currentDoc.title}
          </span>
        </div>
        <button
          onClick={() => setIsMobileDrawerOpen(true)}
          className="h-8 px-2.5 rounded-lg bg-[#222222] border border-[#383838] text-[#00B1EA] text-[11px] font-bold flex items-center gap-1.5 shrink-0 active:scale-95 hover:border-[#00B1EA]"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Trocar POP</span>
          <ChevronDown className="w-3 h-3 text-[#888888]" />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col md:hidden animate-fadeIn">
          <div className="min-h-[56px] py-2 px-4 border-b border-[#262626] bg-[#121212] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <Layers className="w-4 h-4 text-[#00D3A1]" />
              <span>Selecione um Documento ({documents.length})</span>
            </div>
            <button
              onClick={() => setIsMobileDrawerOpen(false)}
              className="w-8 h-8 rounded-lg bg-[#222222] flex items-center justify-center text-white active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 bg-[#121212] flex flex-col overflow-hidden">
            {renderDocList()}
          </div>
        </div>
      )}

      {/* Main Editing & Adaptation Area */}
      <section className="flex-1 flex flex-col bg-[#0A0A0A] overflow-y-auto md:h-[calc(100vh-56px)]">
        {/* Top Control Bar: Streamlined & Clean */}
        <div className="sticky top-0 z-20 bg-[#121212]/95 backdrop-blur border-b border-[#262626] px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2.5">
          {/* Left: Back to Hub & Doc Title */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            {onBackToHub && (
              <button
                type="button"
                onClick={onBackToHub}
                className="h-8 px-2.5 rounded-xl bg-[#1C1C1C] hover:bg-[#262626] border border-[#333333] text-white text-[11px] sm:text-[12px] font-bold flex items-center gap-1.5 transition shrink-0 active:scale-95 cursor-pointer"
                title="Voltar para a seleção e personalização de documentos"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#00D3A1]" />
                <span className="hidden sm:inline">Painel de Documentos</span>
                <span className="sm:hidden">Painel</span>
              </button>
            )}

            <div className="min-w-0 flex items-center gap-2">
              <span className="text-[9px] px-2 py-0.5 rounded font-black tracking-widest uppercase bg-[#00B1EA] text-black shrink-0 hidden xs:inline">
                {currentDoc.category}
              </span>
              <span className="font-bold text-[12.5px] sm:text-[13.5px] text-white truncate">
                {currentDoc.title}
              </span>
            </div>
          </div>

          {/* Right: Mode Switch & Clean Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* View Switch */}
            <div className="flex bg-[#1A1A1A] p-0.5 rounded-xl border border-[#2D2D2D]">
              <button
                onClick={() => setPreviewMode('a4_two_pages')}
                className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-[12px] font-bold flex items-center gap-1 transition ${
                  previewMode === 'a4_two_pages'
                    ? 'bg-gradient-to-r from-[#00D3A1] to-[#00B1EA] text-black shadow-sm font-extrabold'
                    : 'text-[#888888] hover:text-white'
                }`}
                title="Visualização A4 padrão de impressão"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden md:inline">A4 Visualização</span>
                <span className="md:hidden">A4</span>
              </button>

              <button
                onClick={() => setPreviewMode('edit')}
                className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-[12px] font-bold flex items-center gap-1 transition ${
                  previewMode === 'edit'
                    ? 'bg-[#00B1EA] text-black shadow-sm font-extrabold'
                    : 'text-[#888888] hover:text-white'
                }`}
                title="Modo de edição do texto"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edição</span>
              </button>
            </div>

            {/* Direct Interactive Prescription Studio Trigger */}
            {isCurrentDocPrescription && (
              <button
                type="button"
                onClick={() => setIsPrescriptionBuilderOpen(true)}
                className="h-8 px-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-[11px] font-extrabold shadow-sm shadow-pink-500/20 transition flex items-center gap-1.5 active:scale-95 cursor-pointer"
                title="Abrir Studio de Edição Interativa da Prescrição para alterar fórmulas, dados do paciente e posologia"
              >
                <Pill className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Editar Prescrição Interativa</span>
                <span className="sm:hidden">Prescrição</span>
              </button>
            )}

            {/* Primary Action: Export PDF */}
            <div className="flex items-center">
              <button
                onClick={() => handleExportPDF(currentDoc, pageOrientation)}
                disabled={isExportingPDF}
                className="h-8 px-3 sm:px-3.5 rounded-l-xl bg-gradient-to-r from-[#00D3A1] to-[#00B1EA] text-black text-[11px] font-extrabold hover:brightness-110 shadow-sm shadow-[#00D3A1]/20 transition flex items-center gap-1.5 active:scale-95 disabled:opacity-70 cursor-pointer"
                title={`Baixar este documento formatado em PDF (${pageOrientation === 'landscape' ? 'Modo Paisagem' : 'Modo Retrato'})`}
              >
                {isExportingPDF && exportingDocId === currentDoc.id ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <FileType className="w-3.5 h-3.5" />
                )}
                <span className="hidden xs:inline">Baixar PDF {pageOrientation === 'landscape' ? '(Paisagem)' : ''}</span>
                <span className="xs:hidden">PDF</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const nextOrientation = pageOrientation === 'portrait' ? 'landscape' : 'portrait';
                  setPageOrientation(nextOrientation);
                  onToast(`Orientação alterada para: ${nextOrientation === 'landscape' ? 'Modo Paisagem (Horizontal)' : 'Modo Retrato (Vertical)'}`);
                }}
                className={`h-8 px-2 rounded-r-xl border-l border-black/20 text-black text-[10px] font-extrabold transition flex items-center gap-1 cursor-pointer ${
                  pageOrientation === 'landscape' ? 'bg-[#00D3A1] hover:bg-[#00E5AF]' : 'bg-[#00B1EA] hover:bg-[#38BDF8]'
                }`}
                title={`Alterar orientação de exportação (Atualmente: ${pageOrientation === 'landscape' ? 'Paisagem' : 'Retrato'}). Clique para alternar.`}
              >
                <span className="hidden sm:inline font-mono uppercase">{pageOrientation === 'landscape' ? 'PAISAGEM' : 'RETRATO'}</span>
                <span className="sm:hidden font-mono uppercase">{pageOrientation === 'landscape' ? 'PAIS' : 'RET'}</span>
              </button>
            </div>

            {/* Scientific Evidence Button */}
            {(currentDoc.clinicalEvidence || getClinicalEvidenceForDoc(currentDoc.id)) && (
              <button
                type="button"
                onClick={() => setIsScientificModalOpen(true)}
                className="h-8 px-2.5 rounded-xl bg-gradient-to-r from-sky-950/90 to-blue-950/90 border border-[#00B1EA]/50 text-[#00B1EA] hover:text-white hover:border-[#00B1EA] text-[11px] font-bold transition flex items-center gap-1.5 active:scale-95 shadow-sm cursor-pointer"
                title="Ver referências bibliográficas, fundamentação farmacológica e validação clínica desta fórmula"
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#00B1EA]" />
                <span className="hidden lg:inline">Respaldo Científico</span>
                <span className="lg:hidden hidden sm:inline">Refs</span>
              </button>
            )}

            {/* Print */}
            <button
              onClick={() => handlePrint(pageOrientation)}
              className="h-8 px-2.5 rounded-xl bg-[#1C1C1C] border border-[#333333] text-white text-[11px] font-bold hover:bg-[#262626] transition flex items-center gap-1 active:scale-95 cursor-pointer"
              title="Imprimir documento em folha A4"
            >
              <Printer className="w-3.5 h-3.5 text-[#00B1EA]" />
              <span className="hidden md:inline">Imprimir</span>
            </button>

            {/* More Actions Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsActionsDropdownOpen(!isActionsDropdownOpen)}
                className="h-8 px-2.5 rounded-xl bg-[#1C1C1C] border border-[#333333] text-[#CCCCCC] hover:text-white hover:bg-[#262626] transition flex items-center gap-1 text-[11px] font-bold active:scale-95 cursor-pointer"
                title="Mais opções de exportação e edição"
              >
                <span>Mais</span>
                <ChevronDown className="w-3 h-3 text-[#888888]" />
              </button>

              {isActionsDropdownOpen && (
                <div
                  className="absolute right-0 mt-1.5 w-56 bg-[#161616] border border-[#333333] rounded-2xl shadow-2xl py-1.5 z-50 text-[12px] animate-[fadeIn_0.15s_ease]"
                  onClick={() => setIsActionsDropdownOpen(false)}
                >
                  {(currentDoc.clinicalEvidence || getClinicalEvidenceForDoc(currentDoc.id)) && (
                    <button
                      onClick={() => setIsScientificModalOpen(true)}
                      className="w-full px-3.5 py-2 text-left text-white hover:bg-[#222222] flex items-center gap-2 font-medium text-[#00B1EA]"
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-[#00B1EA]" />
                      <span>Referências & Farmacologia</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (onOpenClinicProfile) onOpenClinicProfile();
                      else handleOpenVariablesModal();
                    }}
                    className="w-full px-3.5 py-2 text-left text-white hover:bg-[#222222] flex items-center gap-2 font-medium"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#00D3A1]" />
                    <span>Preencher Dados da Clínica</span>
                  </button>

                  <button
                    onClick={() => handleExportPDF(currentDoc, 'landscape')}
                    className="w-full px-3.5 py-2 text-left text-white hover:bg-[#222222] flex items-center gap-2 font-medium text-[#00D3A1]"
                  >
                    <FileType className="w-3.5 h-3.5 text-[#00D3A1]" />
                    <span>Baixar PDF em Paisagem (Horizontal)</span>
                  </button>

                  <button
                    onClick={() => handleExportPDF(currentDoc, 'portrait')}
                    className="w-full px-3.5 py-2 text-left text-white hover:bg-[#222222] flex items-center gap-2 font-medium text-[#00B1EA]"
                  >
                    <FileType className="w-3.5 h-3.5 text-[#00B1EA]" />
                    <span>Baixar PDF em Retrato (Vertical)</span>
                  </button>

                  <button
                    onClick={() => setIsSanitaryFormsModalOpen(true)}
                    className="w-full px-3.5 py-2 text-left text-white hover:bg-[#222222] flex items-center gap-2 font-medium text-[#F59E0B]"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>Cadernos Sanitários (PDF)</span>
                  </button>

                  <button
                    onClick={handleDownloadAllDocumentsHTML}
                    className="w-full px-3.5 py-2 text-left text-emerald-300 hover:text-white hover:bg-emerald-950/40 flex items-center gap-2 font-bold border-t border-[#262626]"
                    title="Baixar compêndio com todos os documentos em formato HTML A4"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Baixar Todos os Docs (.HTML)</span>
                  </button>

                  <button
                    onClick={() => handleDownloadHTML(pageOrientation)}
                    className="w-full px-3.5 py-2 text-left text-white hover:bg-[#222222] flex items-center gap-2 font-medium"
                    title="Baixar este documento atual em formato HTML A4"
                  >
                    <Download className="w-3.5 h-3.5 text-[#00D3A1]" />
                    <span>Baixar Este Doc (.HTML)</span>
                  </button>

                  <button
                    onClick={handleDownloadDoc}
                    className="w-full px-3.5 py-2 text-left text-white hover:bg-[#222222] flex items-center gap-2 font-medium"
                  >
                    <FileDown className="w-3.5 h-3.5 text-[#00B1EA]" />
                    <span>Exportar Word (.doc)</span>
                  </button>

                  <button
                    onClick={() => handleOpenMetaModal(currentDoc)}
                    className="w-full px-3.5 py-2 text-left text-white hover:bg-[#222222] flex items-center gap-2 font-medium border-t border-[#262626]"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>Editar Título / Código do POP</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Unified Formatting Toolbar (visible ONLY in edit mode) */}
        {previewMode === 'edit' && (
          <div className="px-3 sm:px-4 py-2 bg-[#121212] border-b border-[#262626] flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
            <div className="flex items-center gap-0.5 bg-[#181818] border border-[#2A2A2A] rounded-xl p-0.5">
              <button
                type="button"
                onClick={() => executeCommand('bold')}
                className="w-7 h-7 rounded-lg hover:bg-[#282828] flex items-center justify-center text-white transition shrink-0"
                title="Negrito (Ctrl+B)"
              >
                <Bold className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand('italic')}
                className="w-7 h-7 rounded-lg hover:bg-[#282828] flex items-center justify-center text-white transition shrink-0"
                title="Itálico (Ctrl+I)"
              >
                <Italic className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand('underline')}
                className="w-7 h-7 rounded-lg hover:bg-[#282828] flex items-center justify-center text-white transition shrink-0"
                title="Sublinhado (Ctrl+U)"
              >
                <Underline className="w-3.5 h-3.5" />
              </button>
              <div className="w-px h-4 bg-[#333333] mx-0.5 shrink-0" />
              <button
                type="button"
                onClick={() => executeCommand('h2')}
                className="w-7 h-7 rounded-lg hover:bg-[#282828] flex items-center justify-center text-white text-[11px] font-black transition shrink-0"
                title="Título H2"
              >
                H2
              </button>
              <button
                type="button"
                onClick={() => executeCommand('h3')}
                className="w-7 h-7 rounded-lg hover:bg-[#282828] flex items-center justify-center text-white text-[11px] font-bold transition shrink-0"
                title="Subtítulo H3"
              >
                H3
              </button>
              <button
                type="button"
                onClick={() => executeCommand('list')}
                className="w-7 h-7 rounded-lg hover:bg-[#282828] flex items-center justify-center text-white transition shrink-0"
                title="Lista com marcadores"
              >
                <List className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand('checklist')}
                className="w-7 h-7 rounded-lg hover:bg-[#282828] flex items-center justify-center text-[#00D3A1] transition shrink-0"
                title="Inserir Caixa de Checklist Sanitário"
              >
                <CheckSquare className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand('table')}
                className="w-7 h-7 rounded-lg hover:bg-[#282828] flex items-center justify-center text-[#00B1EA] transition shrink-0"
                title="Inserir Tabela de Parâmetros"
              >
                <TableIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Inserir Tag Dropdown Selector */}
            <div className="flex items-center gap-1.5 ml-auto">
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    insertVariable(e.target.value);
                    e.target.value = '';
                  }
                }}
                defaultValue=""
                className="h-8 px-2.5 rounded-xl bg-[#1A1A1A] border border-[#333333] text-[11px] text-[#00D3A1] font-bold outline-none cursor-pointer"
              >
                <option value="" disabled>+ Inserir Tag {"{{...}}"}</option>
                <option value="{{nome_clinica}}">Nome da Clínica</option>
                <option value="{{responsavel_tecnico}}">Responsável Técnico</option>
                <option value="{{registro_conselho}}">Conselho Regional</option>
                <option value="{{alvara}}">Alvará Sanitário</option>
                <option value="{{endereco}}">Endereço</option>
                <option value="{{cidade}}">Cidade/UF</option>
                <option value="{{whatsapp}}">WhatsApp</option>
                <option value="{{email}}">E-mail</option>
                <option value="{{nome_cliente}}">Paciente</option>
                <option value="{{equipamento}}">Equipamento</option>
                <option value="{{registro_anvisa}}">Registro ANVISA</option>
                <option value="{{data}}">Data Atual</option>
              </select>

              <button
                type="button"
                onClick={applyClinicVariables}
                className="h-8 px-3 rounded-xl bg-[#1E293B] hover:bg-[#334155] border border-[#38BDF8]/40 text-[#38BDF8] font-bold text-[11px] flex items-center gap-1 transition active:scale-95"
                title="Substituir tags deste documento pelos dados da clínica"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Aplicar Dados</span>
              </button>
            </div>
          </div>
        )}

        {/* Adaptation Guidelines Banner */}
        {currentDoc.category === 'POP' && (
          <div className="mx-3 sm:mx-4 mt-2 sm:mt-3 p-2.5 sm:p-3 rounded-xl bg-[#141414] border border-[#262626] flex items-start justify-between gap-2 text-[11px] sm:text-[12px]">
            <div className="flex items-start gap-2 min-w-0">
              <ShieldCheck className="w-4 h-4 text-[#00D3A1] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="font-bold text-white block truncate">
                  Requisitos e Documentos ANVISA para {currentDoc.title}:
                </span>
                <p className="text-[#888888] mt-0.5 line-clamp-2 sm:line-clamp-none">
                  {currentDoc.adaptationNotes || 'Revise o responsável técnico, marcas dos produtos químicos/saneantes utilizados e periodicidade das auditorias internas para o seu estabelecimento.'}
                </p>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <span className="text-[9px] sm:text-[10px] font-mono bg-[#1E1E1E] border border-[#333333] px-1.5 py-0.5 rounded text-[#00B1EA] whitespace-nowrap">
                {currentDoc.version || 'V 2.0 ANVISA'}
              </span>
            </div>
          </div>
        )}

        {/* Scientific Evidence & Clinical Validation On-Screen Card (For Prescriber Only) */}
        {(() => {
          const evidence = currentDoc.clinicalEvidence || getClinicalEvidenceForDoc(currentDoc.id);
          if (!evidence) return null;

          return (
            <div className="mx-3 sm:mx-4 mt-2 sm:mt-3 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#0C1520] via-[#0E1A29] to-[#0A131E] border border-[#00B1EA]/40 text-xs shadow-lg space-y-2.5 animate-[fadeIn_0.2s_ease]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E2E42] pb-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00D3A1]/20 to-[#00B1EA]/20 text-[#00D3A1] border border-[#00D3A1]/30 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-extrabold text-white text-[13px] sm:text-[13.5px] truncate">
                        Mecanismo Galênico & Farmacologia Clínica
                      </span>
                      <span className="text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded flex items-center gap-1 shrink-0">
                        <span>👁️ Visível Apenas ao Prescritor (Não sai na impressão)</span>
                      </span>
                      <span className="text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 px-2 py-0.5 rounded flex items-center gap-1 shrink-0">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        {evidence.levelOfEvidence.split('(')[0].trim()}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      Fundamentação científica indexada (PubMed, JAAD, ABD) para suporte à conduta profissional.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsScientificModalOpen(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#00D3A1] to-[#00B1EA] hover:brightness-110 text-black font-extrabold text-[11px] flex items-center gap-1.5 transition active:scale-95 shadow-sm cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Dossiê Completo ({evidence.bibliographicReferences.length} Refs)</span>
                  </button>
                </div>
              </div>

              {/* Rationale Excerpt */}
              <div className="bg-[#080E17]/80 rounded-xl p-2.5 border border-[#172538]">
                <p className="text-zinc-200 text-[11.5px] leading-relaxed text-justify">
                  <strong className="text-sky-300 font-semibold">Racional e Mecanismo: </strong>
                  {evidence.pharmacologicalRationale}
                </p>
              </div>

              {/* References & Actives Pills */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#182637] text-[11px]">
                <div className="flex flex-wrap items-center gap-1.5 text-zinc-400">
                  <span className="font-semibold text-zinc-300">Estudos de Referência:</span>
                  {evidence.bibliographicReferences.slice(0, 3).map((r, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-[#16212E] border border-[#233347] text-sky-300 font-mono text-[10px]">
                      {r.authorYear}
                    </span>
                  ))}
                  {evidence.bibliographicReferences.length > 3 && (
                    <span className="text-zinc-500 font-mono text-[10px]">
                      +{evidence.bibliographicReferences.length - 3} mais
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-emerald-400 text-[10.5px] font-semibold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                    {evidence.activeIngredients?.length || 0} Ativos Mapeados
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsScientificModalOpen(true)}
                    className="text-[#00B1EA] hover:underline font-bold text-[11px] flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>Ver Ativos & Mecanismos</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Paper Canvas */}
        <div className="p-2 sm:p-4 md:p-6 flex justify-center">
          {previewMode === 'a4_two_pages' ? (
            /* Multi-Page / 2-Page A4 Duplex Layout */
            (() => {
              const rawContent = editorRef.current ? editorRef.current.innerHTML : currentDoc.content;
              const processed = replaceClinicVariables(rawContent, clinicData);
              const pages = splitContentIntoPages(processed);
              const totalPages = pages.length;
              const needsPatient = isPatientSignatureNeeded(currentDoc);
              const isPrescription = (currentDoc.category as string) === 'Prescrição' || currentDoc.id.toLowerCase().includes('prescricao') || currentDoc.title.toLowerCase().includes('prescri') || currentDoc.title.toLowerCase().includes('receitu');
              const isContract = (currentDoc.category as string) === 'Contrato' || currentDoc.id.toLowerCase().includes('contrato') || currentDoc.title.toLowerCase().includes('contrato');

              return (
                <div className="w-full max-w-[1240px] space-y-6">
                  {/* Informative Header Banner */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-[#141414] border border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12px]">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl ${isPrescription ? 'bg-pink-500/15 text-pink-400 border border-pink-500/30' : 'bg-[#00D3A1]/15 text-[#00D3A1] border border-[#00D3A1]/30'} flex items-center justify-center shrink-0`}>
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-extrabold text-white text-[13px] sm:text-[14px] flex items-center gap-2">
                          Layout A4 para Impressão ({totalPages === 2 ? 'Frente e Verso • 2 Páginas' : `${totalPages} Páginas Formatadas`})
                        </span>
                        <p className="text-[#888888] text-[11px] sm:text-[12px] mt-0.5">
                          {isPrescription
                            ? 'Receituário clínico e fórmulas terapêuticas estruturadas em alta definição vetorial para impressão direta em A4.'
                            : totalPages === 2
                            ? 'Conteúdo compacto e estruturado em blocos para caber perfeitamente em 1 folha física (duplex). Texto 100% vetorial.'
                            : 'Manual completo e estruturado em capítulos integrados com fundamentação técnica e blindagem jurídica. Padrão A4.'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={togglePatientSignature}
                        className={`px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition ${
                          isPatientSignatureNeeded()
                            ? 'bg-[#00D3A1]/15 text-[#00D3A1] border border-[#00D3A1]/40'
                            : 'bg-[#222222] text-[#888888] border border-[#333333] hover:text-white'
                        }`}
                        title="Ativar/Desativar espaço para assinatura do paciente"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Assinatura Paciente: {isPatientSignatureNeeded() ? 'Ativa' : 'Desativada'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleOpenVariablesModal}
                        className="px-3.5 py-1.5 rounded-xl bg-[#1C1C1C] hover:bg-[#262626] border border-[#00D3A1]/40 text-[#00D3A1] font-bold text-[11px] transition flex items-center gap-1.5 active:scale-95 cursor-pointer"
                        title="Editar todos os campos entre chaves {{...}} deste documento"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5 text-[#00D3A1]" />
                        <span>Editar Campos {`{{...}}`}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (isPrescription) {
                            setIsPrescriptionBuilderOpen(true);
                            return;
                          }
                          setPreviewMode('edit');
                          onToast(`Modo de edição aberto para: "${currentDoc.title}"`);
                          setTimeout(() => {
                            if (editorRef.current) {
                              editorRef.current.focus();
                            }
                          }, 100);
                        }}
                        className={`px-3.5 py-1.5 rounded-xl bg-[#1C1C1C] hover:bg-[#262626] border ${
                          isPrescription
                            ? 'border-pink-500/50 hover:border-pink-400 text-pink-400 bg-pink-950/20'
                            : 'border-[#333333] hover:border-[#38BDF8] text-[#38BDF8]'
                        } font-bold text-[11px] transition flex items-center gap-1.5 active:scale-95 cursor-pointer shadow-sm`}
                        title={
                          isPrescription
                            ? 'Abrir editor interativo para alterar todos os campos da prescrição, adicionar/remover fórmulas e posologia'
                            : 'Editar ou incrementar o texto deste documento'
                        }
                      >
                        {isPrescription ? (
                          <Pill className="w-3.5 h-3.5 text-pink-400" />
                        ) : (
                          <Edit3 className={`w-3.5 h-3.5 ${isPrescription ? 'text-pink-400' : 'text-[#38BDF8]'}`} />
                        )}
                        <span>{isPrescription ? 'Editar Prescrição Interativa' : isContract ? 'Editar Contrato' : 'Editar POP'}</span>
                      </button>

                      <button
                        onClick={() => handleExportPDF(currentDoc)}
                        disabled={isExportingPDF}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#00D3A1] to-[#00B1EA] text-black font-extrabold text-[11px] hover:brightness-110 shadow-sm transition flex items-center gap-1.5 disabled:opacity-60 cursor-pointer"
                      >
                        {isExportingPDF && exportingDocId === currentDoc.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <FileType className="w-3.5 h-3.5" />
                        )}
                        <span>Baixar PDF ({totalPages} Pág{totalPages > 1 ? 's' : ''})</span>
                      </button>
                    </div>
                  </div>

                  {/* Responsive Sheet Grid (Dynamic Pages) */}
                  <div className={`grid grid-cols-1 ${totalPages >= 2 ? 'lg:grid-cols-2' : ''} gap-6 items-start`}>
                    {pages.map((pageContent, index) => {
                      const pageNum = index + 1;
                      const isFirst = index === 0;
                      const isLast = index === totalPages - 1;

                      return (
                        <div key={index} className="flex flex-col">
                          <div className="flex items-center justify-between px-3 py-1.5 bg-[#171717] border border-[#2D2D2D] rounded-t-xl text-[11px] font-bold text-[#AAAAAA]">
                            <span className={`${isFirst ? (isPrescription ? 'text-pink-400' : 'text-[#00D3A1]') : 'text-[#00B1EA]'} flex items-center gap-1.5 uppercase tracking-wider font-extrabold`}>
                              <SplitSquareVertical className="w-3.5 h-3.5" /> Folha {pageNum} {totalPages === 2 ? (isFirst ? '• Frente' : '• Verso') : ''} (Pág. {pageNum} de {totalPages})
                            </span>
                            <span className="text-[10px] text-[#666666]">
                              {isFirst
                                ? (isPrescription ? 'Identificação & Fórmulas Terapêuticas' : 'Identificação & Seções Iniciais')
                                : isLast
                                ? (isPrescription ? 'Orientações & Assinatura Prescritora' : 'Homologação e Assinaturas')
                                : 'Capítulos Farmacológicos & Técnicos'}
                            </span>
                          </div>

                          <div
                            className="p-6 sm:p-8 rounded-b-xl shadow-2xl border text-[#0f172a] bg-[#FFFFFF] border-[#E2E8F0] min-h-[720px] flex flex-col justify-between text-[12px] leading-[1.6]"
                            style={{ fontFamily: "'Times New Roman', Times, serif" }}
                          >
                            <div>
                              {isFirst ? (
                                <>
                                  {/* Clinic Sanitary / Prescription Header */}
                                  <div
                                    className="pb-3 mb-4 flex justify-between items-center gap-3"
                                    style={{ borderBottom: `2px solid ${isPrescription ? '#ec4899' : (clinicData.themeColor || '#0284c7')}` }}
                                  >
                                    <div className="flex items-center gap-3">
                                      {clinicData.logoUrl && (
                                        <img
                                          src={clinicData.logoUrl}
                                          alt="Logo da Clínica"
                                          className="max-h-12 max-w-[120px] object-contain rounded"
                                        />
                                      )}
                                      <div>
                                        <div
                                          className="font-sans font-black text-[15px] sm:text-[17px] uppercase tracking-wide"
                                          style={{ color: isPrescription ? '#0f172a' : (clinicData.themeColor || '#0284c7') }}
                                        >
                                          {clinicData.nomeClinica || 'SUA CLÍNICA - ESTÉTICA AVANÇADA'}
                                        </div>
                                        <div className="font-sans text-[9.5px] text-[#475569] mt-0.5 space-x-2">
                                          <span><strong>Resp. Técnico:</strong> {clinicData.responsavel || 'Homologado'}</span>
                                          <span>•</span>
                                          <span><strong>Alvará:</strong> {clinicData.alvara || 'Vigente'}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className="font-sans text-[8.5px] font-black uppercase px-2 py-0.5 rounded tracking-wider shrink-0"
                                      style={{
                                        border: `1.5px solid ${isPrescription ? '#ec4899' : (clinicData.themeColor || '#059669')}`,
                                        color: isPrescription ? '#be185d' : (clinicData.themeColor || '#059669'),
                                        backgroundColor: isPrescription ? '#fdf2f8' : '#f8fafc'
                                      }}
                                    >
                                      {isPrescription ? 'RECEITUÁRIO ESPECIALIZADO' : isContract ? 'INSTRUMENTO CONTRATUAL' : 'PADRÃO ANVISA & JURÍDICO'}
                                    </div>
                                  </div>

                                  {/* Document Identification Box */}
                                  <div
                                    className="bg-[#f8fafc] rounded-lg p-2.5 mb-4 flex items-center justify-between font-sans"
                                    style={{
                                      border: '1px solid #cbd5e1',
                                      borderLeft: `4px solid ${isPrescription ? '#ec4899' : (clinicData.themeColor || '#0284c7')}`
                                    }}
                                  >
                                    <div>
                                      <div
                                        className="text-[9px] font-bold uppercase tracking-wider"
                                        style={{ color: isPrescription ? '#be185d' : (clinicData.themeColor || '#0369a1') }}
                                      >
                                        {isPrescription
                                          ? 'PRESCRIÇÃO & PROTOCOLO HOME CARE'
                                          : isContract
                                          ? 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS'
                                          : `${currentDoc.category} • DOCUMENTO REGULATÓRIO`}
                                      </div>
                                      <div className="text-[13px] font-extrabold text-[#0f172a]">
                                        {currentDoc.title}
                                      </div>
                                    </div>
                                    <div className="text-right text-[9px] font-mono text-[#64748b]">
                                      <div>Cód: <strong>{isPrescription ? `RX-${currentDoc.id.replace(/[^0-9]/g, '').slice(0, 4) || '01'}` : `${currentDoc.category.toUpperCase()}-${currentDoc.id.replace(/[^0-9]/g, '').slice(0, 4) || '01'}`}</strong></div>
                                      <div>{isPrescription ? 'Emissão' : 'Rev'}: {currentDoc.version || '02/2026'}</div>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                /* Continuation Header */
                                <div
                                  className="pb-1.5 mb-3 flex justify-between items-center text-[9px] text-[#64748b] font-sans"
                                  style={{ borderBottom: `1.5px solid ${isPrescription ? '#fbcfe8' : (clinicData.themeColor || '#cbd5e1')}` }}
                                >
                                  <span
                                    className="font-bold uppercase truncate max-w-[70%]"
                                    style={{ color: isPrescription ? '#be185d' : (clinicData.themeColor || '#0369a1') }}
                                  >
                                    {clinicData.nomeClinica || 'CLÍNICA ESTÉTICA'} • {currentDoc.title}
                                  </span>
                                  <span>PÁGINA {pageNum} DE {totalPages}</span>
                                </div>
                              )}

                              {/* Page Content Body */}
                              <div
                                className="text-justify font-serif text-[12px] leading-[1.6] a4-paper-container
                                  [&_h2]:text-[13.5px] [&_h2]:font-sans [&_h2]:font-bold [&_h2]:text-[#0f172a] [&_h2]:border-b [&_h2]:border-[#cbd5e1] [&_h2]:pb-0.5 [&_h2]:mt-3.5 [&_h2]:mb-1.5 [&_h2]:uppercase
                                  [&_h3]:text-[12px] [&_h3]:font-sans [&_h3]:font-bold [&_h3]:text-[#1e293b] [&_h3]:mt-2.5 [&_h3]:mb-1
                                  [&_p]:mb-2 [&_p]:text-justify
                                  [&_table]:w-full [&_table]:border-collapse [&_table]:my-2 [&_td]:border [&_td]:border-[#94a3b8] [&_td]:p-1.5 [&_th]:border [&_th]:border-[#94a3b8] [&_th]:p-1.5 [&_th]:bg-[#f1f5f9] [&_th]:text-[10px] [&_td]:text-[10.5px] [&_table]:font-sans
                                  [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-2
                                  [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-2"
                                dangerouslySetInnerHTML={{ __html: pageContent }}
                              />

                              {/* Physical Signatures Box on Last Page */}
                              {isLast && (
                                <div className="mt-8 pt-4 border-t border-[#cbd5e1]">
                                  {currentDoc.category === 'Contrato' || currentDoc.title.toLowerCase().includes('contrato') ? (
                                    <div>
                                      <div className="font-sans text-[9px] font-bold uppercase tracking-wider text-[#64748b] text-center mb-3">
                                        Homologação e Firmatura dos Representantes Legais (Validade Jurídica & Sanitária)
                                      </div>
                                      <div className="grid grid-cols-2 gap-6 items-end font-sans mb-3">
                                        <div className="text-center">
                                          <div className="border-b-2 border-[#0f172a] h-8 mb-1"></div>
                                          <div className="font-bold text-[10px] uppercase text-[#0f172a]">{clinicData.nomeClinica || 'CLÍNICA ESTÉTICA'} (CONTRATANTE)</div>
                                          <div className="text-[8.5px] text-[#475569]">{clinicData.responsavel || 'Resp. Legal / Técnico'}</div>
                                        </div>
                                        <div className="text-center">
                                          <div className="border-b-2 border-[#0f172a] h-8 mb-1"></div>
                                          <div className="font-bold text-[10px] uppercase text-[#0f172a]">EMPRESA COLETORA AMBIENTAL (CONTRATADA)</div>
                                          <div className="text-[8.5px] text-[#475569]">Representante Legal / Resp. Técnico Ambiental (CRQ/CREA)</div>
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-2 gap-6 text-[8px] text-[#64748b] font-sans">
                                        <div className="text-center">
                                          <div className="border-b border-[#cbd5e1] h-4 mb-1"></div>
                                          <div>Testemunha 1: ___________________ Assinatura: ______________</div>
                                        </div>
                                        <div className="text-center">
                                          <div className="border-b border-[#cbd5e1] h-4 mb-1"></div>
                                          <div>Testemunha 2: ___________________ Assinatura: ______________</div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : currentDoc.category === 'Prescricao' || (currentDoc.category as string) === 'Prescrição' || currentDoc.id.toLowerCase().includes('prescricao') || currentDoc.title.toLowerCase().includes('prescri') ? (
                                    <div className="pt-2">
                                      <div className="text-center max-w-[300px] mx-auto font-sans">
                                        <div className="border-b-2 border-[#0f172a] h-10 mb-1.5"></div>
                                        <div className="font-bold text-[10.5px] uppercase">{clinicData.responsavel || 'Responsável Técnico(a)'}</div>
                                        <div className="text-[9px] text-[#475569]">{clinicData.registroConselho || 'Registro Profissional'} &bull; {clinicData.nomeClinica || 'Clínica Estética'}</div>
                                        <div className="text-[8px] text-[#64748b] mt-0.5">Assinatura do(a) Profissional Prescritor(a)</div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div>
                                      <div className={`grid gap-6 items-end font-sans ${needsPatient ? 'grid-cols-2' : 'grid-cols-1 max-w-[280px] mx-auto'}`}>
                                        {needsPatient && (
                                          <div className="text-center">
                                            <div className="border-b-2 border-[#0f172a] h-10 mb-1.5"></div>
                                            <div className="font-bold text-[10.5px] uppercase">{clinicData.nomeCliente || 'Assinatura do(a) Paciente'}</div>
                                            <div className="text-[9px] text-[#475569]">Assinatura do(a) Paciente</div>
                                            <div className="text-[8px] text-[#64748b] mt-0.5">Data: ____/____/________</div>
                                          </div>
                                        )}

                                        <div className="text-center">
                                          <div className="border-b-2 border-[#0f172a] h-10 mb-1.5"></div>
                                          <div className="font-bold text-[10.5px] uppercase">{clinicData.responsavel || 'Responsável Técnico(a)'}</div>
                                          <div className="text-[9px] text-[#475569]">{clinicData.nomeClinica || 'Clínica Estética'} | Alvará: {clinicData.alvara || 'Vigente'}</div>
                                          <div className="text-[8px] text-[#64748b] mt-0.5">Homologação Técnica / Registro RT</div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Page Footer */}
                            <div className="border-t border-[#cbd5e1] pt-2 mt-6 flex justify-between items-center text-[8.5px] text-[#64748b] font-sans">
                              <span>{clinicData.nomeClinica || 'Clínica Estética'} • Alvará: {clinicData.alvara || 'Vigente'}</span>
                              <span className="font-bold text-[#0f172a]">PÁGINA {pageNum} DE {totalPages}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()
          ) : (
            /* Continuous / Edit Mode Canvas */
            <div
              className={`w-full max-w-[840px] rounded-[16px] shadow-2xl transition-all duration-200 border ${
                canvasTheme === 'light'
                  ? 'bg-[#FFFFFF] text-[#111827] border-[#E2E8F0]'
                  : 'bg-[#141414] text-[#F0F0F0] border-[#2A2A2A]'
              }`}
            >
              {/* Top decorative accent bar */}
              <div className="h-2 rounded-t-[15px] bg-gradient-to-r from-[#00D3A1] via-[#00B1EA] to-[#3B82F6]" />

              <div className="p-4 sm:p-6 md:p-12">
                {/* Document Header */}
                <div
                  className={`flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-4 mb-4 sm:mb-6 border-b gap-2 text-[11px] tracking-wider uppercase ${
                    canvasTheme === 'light' ? 'border-[#E2E8F0] text-[#64748B]' : 'border-[#262626] text-[#888888]'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold text-[#0088CC] flex items-center gap-1.5 truncate">
                      <ShieldCheck className="w-4 h-4 text-[#00D3A1] shrink-0" />
                      <span className="truncate">{currentDoc.category} • {currentDoc.title}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOpenMetaModal(currentDoc)}
                      className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-[#0088CC] hover:text-[#00B1EA] transition shrink-0"
                      title="Editar título, código e dados deste documento"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => setCanvasTheme(canvasTheme === 'light' ? 'dark' : 'light')}
                      className="flex items-center gap-1 text-[11px] font-medium text-[#888888] hover:text-[#00B1EA] transition"
                      title="Alternar contraste da folha"
                    >
                      {canvasTheme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                      <span className="hidden xs:inline">{canvasTheme === 'light' ? 'Modo Escuro' : 'Modo Papel'}</span>
                    </button>
                    <span className="text-[#059669] font-bold flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> ANVISA CONFORME
                    </span>
                  </div>
                </div>

                {/* Editable Document Area */}
                <div
                  ref={editorRef}
                  contentEditable={previewMode === 'edit'}
                  onInput={handleContentInput}
                  className={`min-h-[450px] sm:min-h-[550px] outline-none text-[13.5px] sm:text-[14.5px] leading-[1.75] font-sans focus:outline-none 
                    [&_h2]:text-[17px] sm:[&_h2]:text-[19px] [&_h2]:font-extrabold [&_h2]:font-serif [&_h2]:mt-5 sm:[&_h2]:mt-6 [&_h2]:mb-2.5 sm:[&_h2]:mb-3 [&_h2]:text-inherit [&_h2]:border-b [&_h2]:border-current/20 [&_h2]:pb-1
                    [&_h3]:text-[14.5px] sm:[&_h3]:text-[16px] [&_h3]:font-bold [&_h3]:mt-3.5 sm:[&_h3]:mt-4 [&_h3]:mb-1.5 sm:[&_h3]:mb-2
                    [&_p]:mb-3 [&_p]:text-justify
                    [&_strong]:font-bold
                    [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3
                    [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3
                    [&_table]:w-full [&_table]:border-collapse [&_table]:my-3 [&_td]:p-1.5 sm:[&_td]:p-2 [&_th]:p-1.5 sm:[&_th]:p-2 [&_th]:border [&_td]:border [&_table]:text-[11px] sm:[&_table]:text-[12px]
                    ${previewMode === 'preview' ? 'cursor-default' : 'cursor-text'}`}
                />
              </div>

              {/* Professional Sanitary Signatures Space */}
              <div
                className={`p-4 sm:p-6 md:p-8 border-t ${
                  canvasTheme === 'light' ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#101010] border-[#262626]'
                }`}
              >
                {/* Header with Quick Toggle for Patient Signature */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-dashed border-[#888888]/20">
                  <div className="flex items-center gap-2">
                    <PenLine className="w-4 h-4 text-[#00B1EA]" />
                    <span className="text-[12px] font-bold uppercase tracking-wider text-[#888888]">
                      Espaço para Assinaturas Físicas / Homologação
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={togglePatientSignature}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition ${
                      isPatientSignatureNeeded()
                        ? 'bg-[#00D3A1]/15 text-[#00D3A1] border border-[#00D3A1]/40'
                        : 'bg-[#222222] text-[#888888] border border-[#333333] hover:text-white'
                    }`}
                    title="Clique para ativar ou desativar o campo de assinatura do paciente neste documento"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Assinatura do Paciente: {isPatientSignatureNeeded() ? 'Incluída' : 'Não Necessária'}</span>
                  </button>
                </div>

                {/* Signature Lines Box */}
                <div
                  className={`grid gap-8 items-end ${
                    isPatientSignatureNeeded() ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-[340px] mx-auto'
                  }`}
                >
                  {/* Patient Signature Space (When needed) */}
                  {isPatientSignatureNeeded() && (
                    <div className="flex flex-col items-center text-center p-3 rounded-xl border border-dashed border-[#888888]/30">
                      <div
                        className={`w-full max-w-[260px] border-b-2 mb-2.5 pt-8 pb-1 ${
                          canvasTheme === 'light' ? 'border-slate-800' : 'border-slate-300'
                        }`}
                      >
                        <span className="text-[10px] font-mono text-[#888888] italic opacity-60">
                          Assinatura do(a) Paciente
                        </span>
                      </div>
                      <span className="font-bold text-[12px] uppercase">
                        {clinicData.nomeCliente || 'Nome do(a) Paciente / Cliente'}
                      </span>
                      <span className="text-[10px] text-[#888888] mt-1">
                        Data: _____ / _____ / _________
                      </span>
                    </div>
                  )}

                  {/* Clinic / Technical Responsible Signature Space */}
                  <div className="flex flex-col items-center text-center p-3 rounded-xl border border-dashed border-[#888888]/30">
                    <div
                      className={`w-full max-w-[260px] border-b-2 mb-2.5 pt-8 pb-1 ${
                        canvasTheme === 'light' ? 'border-slate-800' : 'border-slate-300'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-[#888888] italic opacity-60">
                        Assinatura do(a) Responsável
                      </span>
                    </div>
                    <span className="font-bold text-[12px] uppercase">
                      {clinicData.responsavel || 'Dra. Responsável Técnica'}
                    </span>
                    <span className="text-[11px] text-[#666666]">
                      {clinicData.nomeClinica || 'Clínica Estética'}
                    </span>
                    <span className="text-[10px] text-[#888888] mt-1">
                      Alvará Sanitário: {clinicData.alvara || 'Vigente'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Status Bar */}
              <div
                className={`p-3 sm:p-4 rounded-b-[15px] flex flex-wrap gap-2 justify-between items-center text-[10px] sm:text-[11px] border-t ${
                  canvasTheme === 'light'
                    ? 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]'
                    : 'bg-[#0E0E0E] text-[#888888] border-[#222222]'
                }`}
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => handleExportPDF(currentDoc)}
                    disabled={isExportingPDF}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#00D3A1] to-[#00B1EA] text-black font-extrabold flex items-center gap-1.5 transition text-[11px] active:scale-95 shadow-sm hover:brightness-110 disabled:opacity-60"
                  >
                    {isExportingPDF && exportingDocId === currentDoc.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <FileType className="w-3.5 h-3.5" />
                    )}
                    <span>Baixar PDF Oficial</span>
                  </button>

                  <button
                    onClick={handleDownloadDoc}
                    className="px-2.5 py-1.5 rounded-lg bg-[#1C1C1C] text-white border border-[#333333] hover:border-[#00D3A1] flex items-center gap-1.5 transition text-[10px] sm:text-[11px] active:scale-95"
                  >
                    <FileDown className="w-3 h-3 text-[#00D3A1]" /> Baixar .DOC (Word)
                  </button>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="truncate">
                    ID: <span className="font-mono text-[#00B1EA]">{currentDoc.id}</span>
                  </span>
                  <span>•</span>
                  <span className="text-[#00D3A1] font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    {isPatientSignatureNeeded() ? 'RT + Paciente' : 'Assinatura RT'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Modal de Edição de Título / Metadados do POP */}
      {isMetaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-[540px] bg-[#141414] border border-[#2A2A2A] rounded-2xl p-5 sm:p-6 shadow-2xl animate-[slideUp_0.2s_ease]">
            <div className="flex justify-between items-center pb-3.5 border-b border-[#262626]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#00B1EA]/15 text-[#00B1EA] flex items-center justify-center">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-[16px] text-white leading-tight">Editar Título & Dados do POP</h3>
                  <p className="text-[11px] text-[#888888] mt-0.5">Ajuste o nome, categoria e orientações de auditoria</p>
                </div>
              </div>
              <button
                onClick={() => setIsMetaModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-[#222222] flex items-center justify-center text-[#888888] hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3.5">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#888888] font-bold block mb-1">
                  Título do Documento / POP *
                </label>
                <input
                  type="text"
                  value={editMetaTitle}
                  onChange={(e) => setEditMetaTitle(e.target.value)}
                  placeholder="Ex: POP - ROTINA DE BIOSSEGURANÇA"
                  className="w-full h-10 px-3 rounded-xl bg-[#1C1C1C] border border-[#333333] text-[13px] text-white focus:border-[#00B1EA] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#888888] font-bold block mb-1">
                    Categoria
                  </label>
                  <select
                    value={editMetaCategory}
                    onChange={(e) => setEditMetaCategory(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-[#1C1C1C] border border-[#333333] text-[13px] text-white focus:border-[#00B1EA] outline-none"
                  >
                    <option value="POP">POP (Procedimento Operacional)</option>
                    <option value="Manual">Manual Sanitário</option>
                    <option value="Contrato">Contrato</option>
                    <option value="Anamnese">Anamnese</option>
                    <option value="TCLE">TCLE (Consentimento)</option>
                    <option value="LGPD">LGPD & Privacidade</option>
                    <option value="Personalizado">Personalizado</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#888888] font-bold block mb-1">
                    Versão / Código
                  </label>
                  <input
                    type="text"
                    value={editMetaVersion}
                    onChange={(e) => setEditMetaVersion(e.target.value)}
                    placeholder="Ex: V 2.0 ANVISA"
                    className="w-full h-10 px-3 rounded-xl bg-[#1C1C1C] border border-[#333333] text-[13px] text-white focus:border-[#00B1EA] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#888888] font-bold block mb-1">
                  Notas de Adaptação / Auditoria da Clínica
                </label>
                <textarea
                  value={editMetaNotes}
                  onChange={(e) => setEditMetaNotes(e.target.value)}
                  rows={2}
                  placeholder="Orientações e especificidades para a equipe da clínica..."
                  className="w-full p-2.5 rounded-xl bg-[#1C1C1C] border border-[#333333] text-[12px] text-white focus:border-[#00B1EA] outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#262626]">
                <button
                  type="button"
                  onClick={() => setIsMetaModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#222222] text-[#AAAAAA] hover:text-white text-[12px] font-bold transition"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSaveMetaChanges}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00D3A1] to-[#00B1EA] text-black font-extrabold text-[12px] hover:brightness-110 transition active:scale-95 flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Salvar Alterações</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Variables & Bracket Fields Modal */}
      {isVariablesModalOpen && (() => {
        const rawContent = editorRef.current ? editorRef.current.innerHTML : currentDoc.content;
        const detectedTags = detectVariablesInDoc(rawContent);

        return (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <div className="w-full max-w-[720px] bg-[#141414] border border-[#262626] rounded-[24px] p-5 sm:p-6 shadow-2xl animate-[slideUp_0.2s_ease] my-auto">
              <div className="flex justify-between items-center pb-4 border-b border-[#262626]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#00D3A1]/15 flex items-center justify-center">
                    <SlidersHorizontal className="w-5 h-5 text-[#00D3A1]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[18px] text-white leading-tight">
                      Editor de Campos e Chaves {`{{...}}`}
                    </h3>
                    <p className="text-[11px] text-[#888888] mt-0.5">
                      Edite os valores das variáveis deste POP ou personalize os dados de toda a clínica
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsVariablesModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#1C1C1C] flex items-center justify-center text-[#888888] hover:text-white transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1.5 mt-4 p-1 bg-[#0E0E0E] rounded-xl border border-[#222222] overflow-x-auto scrollbar-none text-[12px]">
                <button
                  type="button"
                  onClick={() => setVarTab('detected')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold transition whitespace-nowrap ${
                    varTab === 'detected' ? 'bg-[#00D3A1] text-black shadow-sm' : 'text-[#888888] hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Neste Documento ({detectedTags.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setVarTab('all')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold transition whitespace-nowrap ${
                    varTab === 'all' ? 'bg-[#00D3A1] text-black shadow-sm' : 'text-[#888888] hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Todos os Campos Padrão</span>
                </button>

                <button
                  type="button"
                  onClick={() => setVarTab('custom')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold transition whitespace-nowrap ${
                    varTab === 'custom' ? 'bg-[#00D3A1] text-black shadow-sm' : 'text-[#888888] hover:text-white'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Chaves Personalizadas ({Object.keys(clinicData.customVariables || {}).length})</span>
                </button>
              </div>

              {/* Body */}
              <div className="mt-4 space-y-3 max-h-[55vh] overflow-y-auto pr-1">
                {/* TAB 1: DETECTED IN DOC */}
                {varTab === 'detected' && (
                  <div className="space-y-3">
                    {detectedTags.length === 0 ? (
                      <div className="p-6 text-center bg-[#1A1A1A] rounded-2xl border border-dashed border-[#333333]">
                        <p className="text-[13px] text-[#AAAAAA] font-bold">
                          Nenhuma tag entre chaves {`{{...}}`} foi detectada no texto atual.
                        </p>
                        <p className="text-[11px] text-[#777777] mt-1">
                          Você pode inserir tags usando a barra de ferramentas ou editar os dados padrão na aba "Todos os Campos Padrão".
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        <p className="text-[11px] text-[#888888]">
                          Abaixo estão todos os campos entre chaves encontrados neste documento. Altere os valores abaixo e escolha aplicar no texto ou salvar globalmente:
                        </p>
                        {detectedTags.map((tag) => {
                          const def = VARIABLE_DICTIONARY[tag] || {
                            label: tag.toUpperCase().replace(/_/g, ' '),
                            category: 'Personalizado',
                            placeholder: 'Informe o valor...',
                          };
                          const val = variableFormValues[tag] || '';

                          return (
                            <div
                              key={tag}
                              className="p-3 bg-[#181818] border border-[#2B2B2B] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                            >
                              <div className="sm:w-1/3 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[11px] font-mono text-[#00D3A1] bg-[#00D3A1]/10 px-2 py-0.5 rounded font-bold">
                                    {`{{${tag}}}`}
                                  </span>
                                </div>
                                <span className="text-[11px] text-[#888888] block truncate mt-0.5">
                                  {def.label}
                                </span>
                              </div>

                              <div className="sm:w-2/3 flex items-center gap-2">
                                <input
                                  type="text"
                                  value={val}
                                  onChange={(e) => {
                                    const next = e.target.value;
                                    setVariableFormValues((prev) => ({
                                      ...prev,
                                      [tag]: next,
                                    }));
                                  }}
                                  placeholder={def.placeholder}
                                  className="w-full h-9 px-3 rounded-lg bg-[#0E0E0E] border border-[#333333] text-[12px] text-white focus:border-[#00D3A1] outline-none"
                                />
                                {previewMode === 'edit' && (
                                  <button
                                    type="button"
                                    onClick={() => insertVariable(`{{${tag}}}`)}
                                    className="shrink-0 h-9 px-2 rounded-lg bg-[#222222] hover:bg-[#333333] text-[#AAAAAA] hover:text-white text-[11px] transition"
                                    title="Inserir esta tag no cursor do editor"
                                  >
                                    Inserir
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: ALL STANDARD FIELDS */}
                {varTab === 'all' && (
                  <div className="space-y-4">
                    <p className="text-[11px] text-[#888888]">
                      Preencha os valores padrões para cada variável que você pode usar nos seus documentos:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.entries(VARIABLE_DICTIONARY)
                        .filter(([k], idx, arr) => {
                          // Filter out duplicated alias keys to keep clean
                          if (k === 'responsavel' || k === 'alvara_sanitario' || k === 'cidade_uf' || k === 'data_documento' || k === 'registro_profissional' || k === 'valor_honorarios') {
                            return false;
                          }
                          return true;
                        })
                        .map(([tag, def]) => {
                          const val = variableFormValues[tag] || '';
                          return (
                            <div key={tag} className="p-3 bg-[#181818] border border-[#2B2B2B] rounded-xl">
                              <div className="flex justify-between items-center mb-1">
                                <label className="text-[11px] text-[#AAAAAA] font-bold block truncate">
                                  {def.label}
                                </label>
                                <span className="text-[10px] font-mono text-[#00D3A1] bg-[#00D3A1]/10 px-1.5 py-0.5 rounded">
                                  {`{{${tag}}}`}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 mt-1">
                                <input
                                  type="text"
                                  value={val}
                                  onChange={(e) => {
                                    const next = e.target.value;
                                    setVariableFormValues((prev) => ({
                                      ...prev,
                                      [tag]: next,
                                    }));
                                  }}
                                  placeholder={def.placeholder}
                                  className="w-full h-8 px-2.5 rounded-lg bg-[#0E0E0E] border border-[#333333] text-[12px] text-white focus:border-[#00D3A1] outline-none"
                                />
                                {previewMode === 'edit' && (
                                  <button
                                    type="button"
                                    onClick={() => insertVariable(`{{${tag}}}`)}
                                    className="shrink-0 h-8 px-2 rounded-lg bg-[#222222] hover:bg-[#333333] text-[#AAAAAA] hover:text-white text-[10px] transition"
                                    title="Inserir tag"
                                  >
                                    +
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}

                {/* TAB 3: CUSTOM FIELDS */}
                {varTab === 'custom' && (
                  <div className="space-y-3">
                    <div className="p-3 bg-[#181818] rounded-xl border border-[#2B2B2B]">
                      <h4 className="text-[12px] font-bold text-white mb-1 flex items-center gap-1.5">
                        <Plus className="w-3.5 h-3.5 text-[#00D3A1]" /> Criar Nova Tag Personalizada
                      </h4>
                      <p className="text-[11px] text-[#888888] mb-2.5">
                        Exemplo: crie <code className="text-[#00D3A1]">{`{{lote}}`}</code> para registrar lotes de cosméticos ou toxinas.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            value={newVarKey}
                            onChange={(e) => setNewVarKey(e.target.value)}
                            placeholder="Nome da chave (ex: lote)"
                            className="w-full h-9 px-2.5 rounded-lg bg-[#0E0E0E] border border-[#333333] text-[12px] text-white focus:border-[#00D3A1] outline-none"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            value={newVarVal}
                            onChange={(e) => setNewVarVal(e.target.value)}
                            placeholder="Valor correspondente"
                            className="w-full h-9 px-2.5 rounded-lg bg-[#0E0E0E] border border-[#333333] text-[12px] text-white focus:border-[#00D3A1] outline-none"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleAddCustomVarFromModal}
                          className="h-9 px-3 rounded-lg bg-[#00D3A1] text-black font-bold text-[11px] flex items-center justify-center gap-1 hover:bg-[#00c291] transition active:scale-95 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Adicionar</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 mt-2">
                      <label className="text-[11px] uppercase tracking-wider text-[#888888] font-bold block">
                        Chaves Personalizadas Cadastradas ({Object.keys(clinicData.customVariables || {}).length})
                      </label>

                      {Object.keys(clinicData.customVariables || {}).length === 0 ? (
                        <div className="p-4 text-center text-[12px] text-[#777777] bg-[#181818] rounded-xl border border-dashed border-[#2B2B2B]">
                          Nenhuma variável personalizada cadastrada ainda.
                        </div>
                      ) : (
                        Object.entries(clinicData.customVariables || {}).map(([k, v]) => (
                          <div
                            key={k}
                            className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#181818] border border-[#2B2B2B]"
                          >
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <span className="text-[11px] font-mono text-[#00D3A1] bg-[#00D3A1]/10 px-2 py-1 rounded shrink-0">
                                {`{{${k}}}`}
                              </span>
                              <input
                                type="text"
                                value={variableFormValues[k] !== undefined ? variableFormValues[k] : v}
                                onChange={(e) => {
                                  const updatedVal = e.target.value;
                                  setVariableFormValues((prev) => ({
                                    ...prev,
                                    [k]: updatedVal,
                                  }));
                                }}
                                className="h-8 px-2 rounded bg-[#0E0E0E] border border-[#333333] text-[12px] text-white focus:border-[#00D3A1] outline-none flex-1 min-w-0"
                              />
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              {previewMode === 'edit' && (
                                <button
                                  type="button"
                                  onClick={() => insertVariable(`{{${k}}}`)}
                                  className="h-8 px-2 rounded-lg bg-[#222222] hover:bg-[#333333] text-[#AAAAAA] hover:text-white text-[11px] transition"
                                  title="Inserir tag no editor"
                                >
                                  Inserir
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => {
                                  if (onUpdateClinicData) {
                                    const updated = { ...(clinicData.customVariables || {}) };
                                    delete updated[k];
                                    onUpdateClinicData({
                                      ...clinicData,
                                      customVariables: updated,
                                    });
                                  }
                                  setVariableFormValues((prev) => {
                                    const n = { ...prev };
                                    delete n[k];
                                    return n;
                                  });
                                  onToast(`Chave {{${k}}} removida.`);
                                }}
                                className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition"
                                title="Remover variável"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-2 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsVariablesModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#1C1C1C] border border-[#333333] text-[#AAAAAA] hover:text-white text-[12px] font-bold transition"
                >
                  Fechar
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
                  <button
                    type="button"
                    onClick={handleApplyVariablesToDocText}
                    className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl bg-[#1E293B] hover:bg-[#334155] border border-[#38BDF8]/50 text-[#38BDF8] font-bold text-[12px] transition flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                    title="Substitui todas as tags {{...}} no texto deste documento pelos valores digitados"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>Substituir Neste POP</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleApplyToAllFromVariablesModal}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00D3A1] to-[#00B1EA] text-black font-black text-[12px] hover:brightness-110 transition flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow-md shadow-[#00D3A1]/20"
                    title="Substitui e aplica em todos os 168+ documentos da clínica simultaneamente"
                  >
                    <Check className="w-4 h-4" />
                    <span>🚀 Aplicar em Todos os 168+ Documentos (1 Clique)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Modal: Cadernos de Registro Sanitário e Formulários Físicos */}
      {isSanitaryFormsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-[fadeIn_0.2s_ease]">
          <div className="bg-[#141414] border border-[#2D2D2D] rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-[scaleUp_0.2s_ease]">
            {/* Header */}
            <div className="px-5 py-4 border-b border-[#262626] bg-[#181818] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <span>Cadernos e Livros de Registro Sanitário</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F59E0B]/20 text-[#F59E0B] font-extrabold uppercase tracking-wider">
                      ANVISA & MTR
                    </span>
                  </h3>
                  <p className="text-[11px] sm:text-[12px] text-[#888888]">
                    Planilhas de 1 página A4 com linhas numeradas e campos oficiais de assinatura do RT.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSanitaryFormsModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-[#222222] hover:bg-[#2C2C2C] text-[#AAAAAA] hover:text-white flex items-center justify-center transition active:scale-95 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content List */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1">
              <div className="bg-[#1A1A1A] p-3 rounded-2xl border border-[#333333] text-[12px] text-[#CCCCCC] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#00D3A1] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Conformidade Sanitária Imediata:</strong> Todos os cadernos foram configurados para impressão em folha única A4, contendo linhas para registros manuais diários, semanais ou por lote, prontos para fiscalização da Vigilância Sanitária.
                </div>
              </div>

              <div className="space-y-2">
                {documents
                  .filter(
                    (d) =>
                      d.id.includes('mtr') ||
                      d.id.includes('caderno') ||
                      d.id.includes('livro-registro') ||
                      d.title.toLowerCase().includes('caderno') ||
                      d.title.toLowerCase().includes('livro de registro')
                  )
                  .map((formDoc) => (
                    <div
                      key={formDoc.id}
                      className="p-3.5 bg-[#171717] hover:bg-[#1C1C1C] border border-[#2B2B2B] hover:border-[#3D3D3D] rounded-2xl transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-[9px] px-1.5 py-0.5 rounded font-black tracking-wider uppercase bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30">
                            1 Página A4
                          </span>
                          <span className="text-[10px] text-[#777777] font-mono">
                            {formDoc.version || 'V 4.0'}
                          </span>
                        </div>
                        <h4 className="text-[12.5px] font-bold text-white group-hover:text-[#00B1EA] transition">
                          {formDoc.title}
                        </h4>
                        {formDoc.adaptationNotes && (
                          <p className="text-[11px] text-[#888888] line-clamp-1 mt-0.5">
                            {formDoc.adaptationNotes}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            onSelectDoc(formDoc.id);
                            setIsSanitaryFormsModalOpen(false);
                            onToast(`Caderno "${formDoc.title}" aberto no editor.`);
                          }}
                          className="h-8 px-2.5 rounded-xl bg-[#222222] hover:bg-[#2A2A2A] text-[#CCCCCC] hover:text-white text-[11px] font-bold flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                          title="Abrir no editor para visualizar ou editar"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#38BDF8]" />
                          <span>Abrir</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleExportPDF(formDoc, 'portrait')}
                          disabled={isExportingPDF}
                          className="h-8 px-2.5 rounded-xl bg-[#222222] hover:bg-[#2C2C2C] text-[#00B1EA] border border-[#333333] text-[11px] font-bold transition flex items-center gap-1 active:scale-95 disabled:opacity-50 cursor-pointer"
                          title="Baixar em PDF A4 Retrato (Vertical)"
                        >
                          {isExportingPDF && exportingDocId === formDoc.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <FileType className="w-3.5 h-3.5 text-[#00B1EA]" />
                          )}
                          <span>Retrato</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleExportPDF(formDoc, 'landscape')}
                          disabled={isExportingPDF}
                          className="h-8 px-3 rounded-xl bg-gradient-to-r from-[#00D3A1] to-[#00B1EA] text-black text-[11px] font-extrabold hover:brightness-110 shadow-sm transition flex items-center gap-1.5 active:scale-95 disabled:opacity-50 cursor-pointer"
                          title="Baixar em PDF A4 Paisagem (Horizontal) - Ideal para planilhas e tabelas amplas"
                        >
                          {isExportingPDF && exportingDocId === formDoc.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <FileType className="w-3.5 h-3.5" />
                          )}
                          <span>Baixar Paisagem</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#1B3E6E] bg-[#0A1D3A] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="text-[11px] text-[#94A3B8] text-center sm:text-left">
                Imprima e baixe os POPs e documentos personalizados em alta resolução para a sua clínica.
              </div>
              <button
                type="button"
                onClick={() => setIsSanitaryFormsModalOpen(false)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#0E274D] hover:bg-[#153868] border border-[#1E4477] text-white text-[12px] font-bold transition cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scientific Evidence & Clinical Validation Modal */}
      <ScientificEvidenceModal
        isOpen={isScientificModalOpen}
        onClose={() => setIsScientificModalOpen(false)}
        currentDoc={currentDoc}
        onSelectDoc={(docId) => onSelectDoc(docId)}
        onToast={onToast}
      />

      {/* Interactive Prescription Studio Modal */}
      {isPrescriptionBuilderOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-[fadeIn_0.2s_ease]">
          <div className="w-full max-w-6xl max-h-[94vh] flex flex-col my-auto shadow-2xl">
            <InteractivePrescriptionBuilder
              doc={currentDoc}
              procedureContextKey={identifyProcedureContext(currentDoc)}
              clinicData={clinicData}
              patientData={getInitialPatientState(clinicData)}
              onToast={onToast}
              onClose={() => setIsPrescriptionBuilderOpen(false)}
              onSaveContent={(newContent) => {
                onUpdateDocContent(currentDoc.id, newContent);
                onToast('Prescrição atualizada e sincronizada com o documento!');
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

function docIsCustom(id: string) {
  return id.startsWith('doc-custom-') || id.startsWith('doc-copy-');
}

