import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import {
  X,
  Printer,
  Download,
  Copy,
  Check,
  Share2,
  Edit3,
  UserCheck,
  Camera,
  Stethoscope,
  FileCheck2,
  ShieldAlert,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileText,
  Loader2,
  Sliders,
  RotateCcw,
  Save,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  Eye,
  CheckCircle2,
  Plus,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Maximize,
  Layout,
  Columns,
  Zap,
  SlidersHorizontal,
  Layers,
  ClipboardList,
  Pencil,
  Pill
} from 'lucide-react';
import { DocumentItem, ClinicData } from '../types';
import { InteractivePrescriptionBuilder } from './InteractivePrescriptionBuilder';
import { InteractiveAnamneseBuilder, InteractiveAnamneseData } from './InteractiveAnamneseBuilder';
import { InteractivePatientRecordBuilder, InteractivePatientRecordData } from './InteractivePatientRecordBuilder';
import { InteractiveBeforeAfterStudio, BeforeAfterStudioData } from './InteractiveBeforeAfterStudio';
import { InteractiveTreatmentPlanStudio, TreatmentPlanDataState } from './InteractiveTreatmentPlanStudio';
import {
  ClinicalDocType,
  ClinicalDocDefinition,
  DEFAULT_CLINICAL_DOC_TYPES,
  PatientFormState,
  getInitialPatientState,
  generateClinicalDocContent,
  getEffectiveClinicalDocContent,
  saveCustomClinicalDocContent,
  resetCustomClinicalDocContent,
  hasCustomClinicalDoc,
  getClinicalButtonsConfig,
  identifyProcedureContext
} from '../utils/procedureClinicalDocsHelper';
import { ClinicalButtonsConfigModal } from './ClinicalButtonsConfigModal';

interface ProcedureClinicalDocsModalProps {
  isOpen: boolean;
  doc: DocumentItem | null;
  initialTab?: ClinicalDocType;
  clinicData: ClinicData;
  onClose: () => void;
  onOpenInFullEditor?: (docId: string) => void;
  onToast: (msg: string) => void;
}

export const ProcedureClinicalDocsModal: React.FC<ProcedureClinicalDocsModalProps> = ({
  isOpen,
  doc,
  initialTab = 'ficha_paciente',
  clinicData,
  onClose,
  onOpenInFullEditor,
  onToast,
}) => {
  const [activeTab, setActiveTab] = useState<ClinicalDocType>(initialTab);
  const [patient, setPatient] = useState<PatientFormState>(() => getInitialPatientState(clinicData));
  const [isPatientFormOpen, setIsPatientFormOpen] = useState<boolean>(false);
  const [isExportingPDF, setIsExportingPDF] = useState<boolean>(false);

  // Document Content Editing state
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editableHtml, setEditableHtml] = useState<string>('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [buttonsConfig, setButtonsConfig] = useState<ClinicalDocDefinition[]>([]);
  const [isButtonsConfigOpen, setIsButtonsConfigOpen] = useState<boolean>(false);
  const [isInteractiveAnamneseOpen, setIsInteractiveAnamneseOpen] = useState<boolean>(false);
  const [interactiveAnamneseData, setInteractiveAnamneseData] = useState<InteractiveAnamneseData | undefined>(undefined);
  const [isInteractivePatientRecordOpen, setIsInteractivePatientRecordOpen] = useState<boolean>(false);
  const [interactivePatientRecordData, setInteractivePatientRecordData] = useState<InteractivePatientRecordData | undefined>(undefined);
  const [isInteractiveBeforeAfterOpen, setIsInteractiveBeforeAfterOpen] = useState<boolean>(false);
  const [interactiveBeforeAfterData, setInteractiveBeforeAfterData] = useState<BeforeAfterStudioData | undefined>(undefined);
  const [isInteractiveTreatmentPlanOpen, setIsInteractiveTreatmentPlanOpen] = useState<boolean>(false);
  const [interactiveTreatmentPlanData, setInteractiveTreatmentPlanData] = useState<TreatmentPlanDataState | undefined>(undefined);
  const [isInteractivePrescriptionOpen, setIsInteractivePrescriptionOpen] = useState<boolean>(false);

  // Visual layout & zoom controls
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [viewWidthMode, setViewWidthMode] = useState<'a4' | 'wide'>('wide');

  const printAreaRef = useRef<HTMLDivElement>(null);
  const editorContentRef = useRef<HTMLDivElement>(null);

  // Load configured buttons for this doc
  const loadButtons = () => {
    if (doc) {
      const btns = getClinicalButtonsConfig(doc.id);
      setButtonsConfig(btns);
    }
  };

  useEffect(() => {
    if (isOpen && doc) {
      loadButtons();
    }
  }, [isOpen, doc]);

  // Sync initialTab when modal opens or initialTab changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  // Update default patient responsible when clinicData loads
  useEffect(() => {
    if (clinicData.responsavelTecnico) {
      setPatient((prev) => ({
        ...prev,
        profissionalResponsavel: clinicData.responsavelTecnico || prev.profissionalResponsavel,
      }));
    }
  }, [clinicData]);

  // Compute effective document HTML
  const currentDocHtml = React.useMemo(() => {
    if (!doc) return '';
    return getEffectiveClinicalDocContent(activeTab, doc, clinicData, patient);
  }, [activeTab, doc, clinicData, patient]);

  // When switching tabs or opening edit mode, populate editor content
  useEffect(() => {
    setEditableHtml(currentDocHtml);
    setHasUnsavedChanges(false);
  }, [currentDocHtml, activeTab, isEditMode]);

  if (!isOpen || !doc) return null;

  const cleanDocTitle = doc.title.replace(/^POP\s*[-–—]\s*/i, '').replace(/\(.*\)$/, '').trim();
  const availableTabs = buttonsConfig.length > 0 ? buttonsConfig : DEFAULT_CLINICAL_DOC_TYPES;
  const activeTabsList = availableTabs.filter((t) => t.enabled !== false);
  const currentTabDef = activeTabsList.find((t) => t.type === activeTab) || activeTabsList[0] || availableTabs[0];

  const isCustomized = hasCustomClinicalDoc(doc.id, activeTab);

  const handleSaveDocContent = () => {
    let contentToSave = editableHtml;
    if (editorContentRef.current) {
      contentToSave = editorContentRef.current.innerHTML;
    }
    saveCustomClinicalDocContent(doc.id, activeTab, contentToSave);
    setEditableHtml(contentToSave);
    setHasUnsavedChanges(false);
    onToast(`Alterações em "${currentTabDef.label}" salvas com sucesso!`);
  };

  const handleResetDocContent = () => {
    if (window.confirm(`Deseja restaurar o modelo original para "${currentTabDef.label}"? Suas edições personalizadas neste procedimento serão descartadas.`)) {
      resetCustomClinicalDocContent(doc.id, activeTab);
      const original = generateClinicalDocContent(activeTab, doc, clinicData, patient);
      setEditableHtml(original);
      if (editorContentRef.current) {
        editorContentRef.current.innerHTML = original;
      }
      setHasUnsavedChanges(false);
      onToast(`Modelo de "${currentTabDef.label}" restaurado para o padrão original.`);
    }
  };

  // Text formatting commands for the rich inline editor
  const executeCmd = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    if (editorContentRef.current) {
      setEditableHtml(editorContentRef.current.innerHTML);
      setHasUnsavedChanges(true);
    }
  };

  const insertCustomClause = () => {
    const clauseHtml = `
      <div style="background: #f8fafc; border-left: 4px solid #059669; padding: 8px 12px; margin: 10px 0; border-radius: 4px; font-size: 10.5px;">
        <strong>NOVA CLÁUSULA PERSONALIZADA:</strong> Digite aqui a regra, recomendação médica ou condição específica da sua clínica...
      </div>
    `;
    document.execCommand('insertHTML', false, clauseHtml);
    if (editorContentRef.current) {
      setEditableHtml(editorContentRef.current.innerHTML);
      setHasUnsavedChanges(true);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'width=850,height=1000');
    if (!printWindow) {
      onToast('Por favor, permita popups para imprimir o documento.');
      return;
    }

    const contentToPrint = isEditMode && editorContentRef.current ? editorContentRef.current.innerHTML : currentDocHtml;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${currentTabDef.label} - ${cleanDocTitle}</title>
          <meta charset="utf-8">
          <style>
            @page {
              size: A4 portrait;
              margin: 15mm 15mm 15mm 15mm;
            }
            body {
              font-family: 'Segoe UI', Arial, sans-serif;
              color: #0f172a;
              margin: 0;
              padding: 10px;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            table {
              border-collapse: collapse;
              width: 100%;
            }
            @media print {
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          ${contentToPrint}
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    onToast(`Imprimindo ${currentTabDef.label}...`);
  };

  const handleExportPDF = async () => {
    if (!printAreaRef.current) return;
    setIsExportingPDF(true);
    try {
      const element = printAreaRef.current;
      const opt = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: `${currentTabDef.shortLabel}_${cleanDocTitle.replace(/[^a-zA-Z0-9]/g, '_')}_${patient.nomeCliente.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
      };

      await html2pdf().set(opt).from(element).save();
      onToast(`PDF de ${currentTabDef.label} gerado com sucesso!`);
    } catch (err) {
      console.error(err);
      onToast('Erro ao gerar PDF. Use a opção de Impressão (Salvar como PDF).');
    } finally {
      setIsExportingPDF(false);
    }
  };

  const renderTabIcon = (type: string, className: string = 'w-4 h-4') => {
    switch (type) {
      case 'ficha_paciente':
        return <UserCheck className={className} />;
      case 'antes_depois':
        return <Sparkles className={className} />;
      case 'plano_tratamento':
        return <Sparkles className={className} />;
      case 'termo_imagem':
        return <Camera className={className} />;
      case 'anamnese':
        return <Stethoscope className={className} />;
      case 'tcle':
        return <FileCheck2 className={className} />;
      case 'pos_procedimento':
        return <ShieldAlert className={className} />;
      case 'prescricao':
        return <Pill className={className} />;
      default:
        return <FileText className={className} />;
    }
  };

  return (
    <>
      <div className={`fixed inset-0 z-50 flex animate-fadeIn ${
        isFullscreen
          ? 'w-screen h-screen bg-[#061224] p-0'
          : 'items-center justify-center p-1 sm:p-3 md:p-4 bg-black/85 backdrop-blur-md'
      }`}>
        <div className={`bg-[#081832] border border-[#173660] flex flex-col shadow-2xl overflow-hidden animate-scaleUp ${
          isFullscreen
            ? 'w-full h-full rounded-none border-none'
            : 'w-full max-w-5xl h-[95vh] rounded-2xl'
        }`}>
          {/* Cabeçalho do Modal */}
          <div className="px-4 sm:px-6 py-3 border-b border-[#173660] bg-[#0A1D3A] flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
                <FileText className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[9.5px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Documentos Clínicos &bull; Cat 2 & 3
                  </span>
                  {isCustomized && (
                    <span className="text-[9px] font-bold text-amber-300 bg-amber-500/15 px-1.5 py-0.5 rounded border border-amber-500/30 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>Modelo Personalizado</span>
                    </span>
                  )}
                  <span className="text-xs text-zinc-400 truncate hidden sm:inline">
                    {clinicData.nomeClinica || 'Minha Clínica'}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white truncate font-serif mt-0.5">
                  {cleanDocTitle}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Controles de Zoom & Visualização */}
              <div className="hidden lg:flex items-center bg-zinc-950 border border-zinc-800 rounded-lg p-0.5 text-xs text-zinc-300">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(60, z - 10))}
                  className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition"
                  title="Diminuir Zoom (-10%)"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(100)}
                  className="px-1.5 py-0.5 text-[11px] font-mono hover:text-emerald-400 font-semibold"
                  title="Resetar Zoom para 100%"
                >
                  {zoomLevel}%
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
                  className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition"
                  title="Aumentar Zoom (+10%)"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>

                <div className="h-3.5 w-px bg-zinc-800 mx-1" />

                {/* Alternar Largura A4 vs Expandida */}
                <button
                  type="button"
                  onClick={() => setViewWidthMode(viewWidthMode === 'a4' ? 'wide' : 'a4')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1 transition ${
                    viewWidthMode === 'wide'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                  title={viewWidthMode === 'wide' ? 'Alternar para Folha A4 Padrão' : 'Alternar para Largura Expandida'}
                >
                  <Layout className="w-3 h-3" />
                  <span>{viewWidthMode === 'wide' ? 'Largura Ampla' : 'Modo A4'}</span>
                </button>
              </div>

              {/* Botão Modo Edição */}
              <button
                type="button"
                onClick={() => setIsEditMode(!isEditMode)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  isEditMode
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-700'
                }`}
                title={isEditMode ? 'Alternar para Modo Visualização' : 'Editar texto e cláusulas deste documento'}
              >
                {isEditMode ? <Eye className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5 text-amber-400" />}
                <span>{isEditMode ? 'Visualizar' : 'Editar Modelo'}</span>
              </button>

              {/* Botão Configurar Botões */}
              <button
                type="button"
                onClick={() => setIsButtonsConfigOpen(true)}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 text-xs font-semibold flex items-center gap-1 transition"
                title="Configurar nomes e visibilidade dos botões"
              >
                <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden md:inline">Botões</span>
              </button>

              {/* Botão Tela Cheia / Maximizar */}
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className={`p-1.5 sm:px-2 sm:py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition border ${
                  isFullscreen
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border-zinc-700'
                }`}
                title={isFullscreen ? 'Restaurar Tamanho Normal' : 'Maximizar / Modo Tela Cheia (100% da Tela)'}
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />}
                <span className="hidden sm:inline">{isFullscreen ? 'Restaurar' : 'Tela Cheia'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition"
                title="Fechar (ESC)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Barra de Abas dos Documentos Clínicos */}
          <div className="bg-[#161619] border-b border-zinc-800 px-3 pt-2 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar shrink-0">
            <div className="flex items-center gap-1.5">
              {activeTabsList.map((tab) => {
                const isActive = activeTab === tab.type;
                const isTabCustom = hasCustomClinicalDoc(doc.id, tab.type);

                return (
                  <button
                    key={tab.type}
                    type="button"
                    onClick={() => setActiveTab(tab.type)}
                    className={`px-3 py-2 rounded-t-xl font-medium text-xs sm:text-[13px] flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer border-t border-x ${
                      isActive
                        ? 'bg-[#121214] text-white border-zinc-700 shadow-md font-bold'
                        : 'text-zinc-400 hover:text-zinc-200 border-transparent hover:bg-zinc-800/50'
                    }`}
                    style={{
                      borderTopColor: isActive ? tab.color : undefined,
                      borderTopWidth: isActive ? '3px' : undefined,
                    }}
                  >
                    <span style={{ color: isActive ? tab.color : undefined }}>
                      {renderTabIcon(tab.type, 'w-4 h-4')}
                    </span>
                    <span>{tab.shortLabel || tab.label}</span>
                    {isTabCustom && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" title="Documento com edição salva" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 mb-1 shrink-0">
              {/* Controles rápidos mobile para zoom */}
              <div className="flex lg:hidden items-center bg-zinc-900 border border-zinc-800 rounded px-1 text-xs">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(60, z - 10))}
                  className="p-1 text-zinc-400 hover:text-white"
                  title="Zoom -"
                >
                  <ZoomOut className="w-3 h-3" />
                </button>
                <span className="text-[10px] font-mono text-zinc-300 px-1">{zoomLevel}%</span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
                  className="p-1 text-zinc-400 hover:text-white"
                  title="Zoom +"
                >
                  <ZoomIn className="w-3 h-3" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsButtonsConfigOpen(true)}
                className="text-[11px] text-zinc-400 hover:text-emerald-400 px-2 py-1 rounded bg-zinc-900 border border-zinc-800 hover:border-emerald-500/30 flex items-center gap-1 transition shrink-0"
                title="Gerenciar e editar os botões"
              >
                <Sliders className="w-3 h-3 text-emerald-400" />
                <span>Editar Botões</span>
              </button>
            </div>
          </div>

          {/* Barra de Formatação Rica (Quando em Modo de Edição) */}
          {isEditMode && (
            <div className="bg-[#1a1a20] border-b border-zinc-800 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs animate-fadeIn shrink-0 shadow-inner">
              <div className="flex flex-wrap items-center gap-1">
                <div className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px] uppercase tracking-wider mr-1 border border-amber-500/30">
                  Modo Edição Ativo
                </div>

                <button
                  type="button"
                  onClick={() => executeCmd('bold')}
                  className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold hover:text-white"
                  title="Negrito"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => executeCmd('italic')}
                  className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 italic hover:text-white"
                  title="Itálico"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => executeCmd('underline')}
                  className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 underline hover:text-white"
                  title="Sublinhado"
                >
                  <Underline className="w-3.5 h-3.5" />
                </button>

                <div className="h-4 w-px bg-zinc-700 mx-1" />

                <button
                  type="button"
                  onClick={() => executeCmd('insertUnorderedList')}
                  className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white"
                  title="Lista com Marcadores"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => executeCmd('insertOrderedList')}
                  className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white"
                  title="Lista Numerada"
                >
                  <ListOrdered className="w-3.5 h-3.5" />
                </button>

                <div className="h-4 w-px bg-zinc-700 mx-1" />

                <button
                  type="button"
                  onClick={() => executeCmd('formatBlock', '<h3>')}
                  className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] font-bold px-2"
                  title="Título de Seção"
                >
                  Título
                </button>
                <button
                  type="button"
                  onClick={() => executeCmd('formatBlock', '<p>')}
                  className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] px-2"
                  title="Parágrafo Normal"
                >
                  Texto
                </button>

                <div className="h-4 w-px bg-zinc-700 mx-1" />

                <button
                  type="button"
                  onClick={insertCustomClause}
                  className="px-2 py-1 rounded bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold flex items-center gap-1 transition"
                  title="Inserir Caixa de Destaque / Cláusula"
                >
                  <Plus className="w-3 h-3" />
                  <span>+ Inserir Cláusula</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {isCustomized && (
                  <button
                    type="button"
                    onClick={handleResetDocContent}
                    className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs flex items-center gap-1 transition"
                    title="Restaurar modelo original ANVISA"
                  >
                    <RotateCcw className="w-3 h-3 text-amber-400" />
                    <span>Restaurar Original</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleSaveDocContent}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-md shadow-emerald-950 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Salvar Modelo</span>
                </button>
              </div>
            </div>
          )}

          {/* Barra de Preenchimento Rápido do Paciente (Expansível) */}
          <div className="bg-zinc-900/70 border-b border-zinc-800/80 px-4 py-2 text-xs shrink-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-zinc-300 font-medium overflow-hidden">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                <span className="text-zinc-400 shrink-0">Paciente:</span>
                <span className="font-bold text-white bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700 truncate">
                  {patient.nomeCliente}
                </span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 flex-wrap justify-end">
                {/* Botão Ficha Cadastral & Prontuário Clínico */}
                <button
                  type="button"
                  onClick={() => setIsInteractivePatientRecordOpen(true)}
                  className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 text-cyan-200 font-bold text-xs flex items-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer border border-cyan-500/40"
                  title="Preencher Ficha Cadastral & Prontuário Clínico em A4"
                >
                  <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">Ficha Cadastral</span>
                  <span className="sm:hidden">Cadastro</span>
                </button>

                {/* Botão de Ficha de Anamnese & Avaliação Clínica */}
                <button
                  type="button"
                  onClick={() => setIsInteractiveAnamneseOpen(true)}
                  className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 text-emerald-200 font-bold text-xs flex items-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer border border-emerald-500/40"
                  title="Preencher Ficha de Anamnese & Avaliação Clínica em A4"
                >
                  <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Anamnese</span>
                  <span className="sm:hidden">Anamnese</span>
                </button>

                {/* Botão de Prescrição & Fórmulas Interativas */}
                <button
                  type="button"
                  onClick={() => setIsInteractivePrescriptionOpen(true)}
                  className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-pink-950/60 hover:bg-pink-900 text-pink-200 font-bold text-xs flex items-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer border border-pink-500/40"
                  title="Abrir Gerador & Editor Interativo de Prescrições Baseadas em Evidências"
                >
                  <Pill className="w-3.5 h-3.5 text-pink-400" />
                  <span className="hidden sm:inline">Prescrição</span>
                  <span className="sm:hidden">Prescrição</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsPatientFormOpen(!isPatientFormOpen)}
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold hover:underline cursor-pointer ml-0.5 text-xs px-2 py-1 rounded bg-zinc-800/80 border border-zinc-700/60"
                >
                  <span>{isPatientFormOpen ? 'Ocultar Dados' : 'Editar Dados Rápidos'}</span>
                  {isPatientFormOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Formulário Expansível */}
            {isPatientFormOpen && (
              <div className="mt-3 pt-3 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 animate-fadeIn">
                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-0.5">Nome do Paciente</label>
                  <input
                    type="text"
                    value={patient.nomeCliente}
                    onChange={(e) => setPatient({ ...patient, nomeCliente: e.target.value })}
                    placeholder="Nome Completo"
                    className="w-full bg-black border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-0.5">Telefone / WhatsApp</label>
                  <input
                    type="text"
                    value={patient.telefone}
                    onChange={(e) => setPatient({ ...patient, telefone: e.target.value })}
                    placeholder="(11) 99999-9999"
                    className="w-full bg-black border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-0.5">Data</label>
                  <input
                    type="text"
                    value={patient.data}
                    onChange={(e) => setPatient({ ...patient, data: e.target.value })}
                    placeholder="DD/MM/AAAA"
                    className="w-full bg-black border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-emerald-500 outline-none font-mono"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Visualização e Edição do Documento (A4 / Formato Completo com Rolagem Total e Zoom) */}
          <div className="min-h-0 flex-1 overflow-y-auto overflow-x-auto p-3 sm:p-6 md:p-8 bg-[#09090b] flex justify-center items-start">
            <div
              style={{
                zoom: zoomLevel !== 100 ? `${zoomLevel}%` : undefined,
                maxWidth: viewWidthMode === 'wide' ? '1080px' : '820px',
                width: '100%',
              }}
              className="bg-white text-zinc-900 rounded-xl shadow-2xl border border-zinc-300 p-5 sm:p-8 md:p-10 min-h-[600px] mb-28 transition-all duration-150 relative select-text"
            >
              {isEditMode ? (
                <div>
                  <div className="mb-4 p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5">
                      <Edit3 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span><strong>Clique diretamente no texto</strong> abaixo para editar qualquer parágrafo, termo ou dados da clínica.</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleSaveDocContent}
                      className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] shrink-0"
                    >
                      Salvar
                    </button>
                  </div>
                  <div
                    ref={editorContentRef}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={() => setHasUnsavedChanges(true)}
                    dangerouslySetInnerHTML={{ __html: editableHtml }}
                    className="outline-none focus:ring-2 focus:ring-emerald-500/50 p-2 sm:p-3 rounded min-h-[500px] font-sans"
                    style={{ fontSize: '13px', lineHeight: '1.6' }}
                  />
                </div>
              ) : (
                <div>
                  {activeTab === 'prescricao' && (
                    <div className="no-print mb-4 p-3 bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 rounded-xl flex items-center justify-between gap-3 text-xs shadow-sm">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-700 shrink-0">
                          <Pill className="w-4 h-4 text-pink-600 animate-pulse" />
                        </div>
                        <div>
                          <div className="font-bold text-pink-950">Estúdio & Gerador Interativo de Prescrições</div>
                          <div className="text-[11px] text-pink-800">
                            Edite fórmulas, posologia, nutracêuticos, mecanismos galênicos e referências científicas de forma 100% interativa com download e impressão limpa.
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsInteractivePrescriptionOpen(true)}
                        className="px-3.5 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-pink-900/20 transition active:scale-95 cursor-pointer shrink-0"
                      >
                        <Zap className="w-3.5 h-3.5 text-pink-200" />
                        <span>Abrir Editor Interativo</span>
                      </button>
                    </div>
                  )}

                  {activeTab === 'anamnese' && (
                    <div className="no-print mb-4 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-3 text-xs shadow-sm">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-700 shrink-0">
                          <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                        </div>
                        <div>
                          <div className="font-bold text-emerald-950">Preenchimento Rápido com Botões Interativos</div>
                          <div className="text-[11px] text-emerald-800">
                            Selecione fototipo, queixas, alergias e aptidão clínica clicando nos botões pré-elaborados para gerar o texto final em segundos.
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsInteractiveAnamneseOpen(true)}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-900/20 transition active:scale-95 cursor-pointer shrink-0"
                      >
                        <Zap className="w-3.5 h-3.5 text-emerald-200" />
                        <span>Preencher com 1-Clique</span>
                      </button>
                    </div>
                  )}
                  <div ref={printAreaRef} dangerouslySetInnerHTML={{ __html: currentDocHtml }} />
                </div>
              )}
            </div>
          </div>

          {/* Barra Inferior de Ações */}
          <div className="px-4 sm:px-6 py-3 bg-zinc-900/95 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-2.5 shrink-0">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-semibold text-zinc-300">{currentTabDef.label}</span>
              {isEditMode && hasUnsavedChanges && (
                <span className="text-amber-400 font-bold text-[11px] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Alterações pendentes de salvar
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {/* Botão Salvar (em modo de edição) */}
              {isEditMode && (
                <button
                  type="button"
                  onClick={handleSaveDocContent}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-md shadow-emerald-950 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Salvar Edição</span>
                </button>
              )}

              {/* Botão Baixar PDF */}
              <button
                type="button"
                disabled={isExportingPDF}
                onClick={handleExportPDF}
                className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-600 text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 disabled:opacity-50 cursor-pointer"
                title="Baixar documento em formato PDF"
              >
                {isExportingPDF ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                ) : (
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                )}
                <span>{isExportingPDF ? 'Gerando...' : 'Baixar PDF'}</span>
              </button>

              {/* Botão Imprimir A4 */}
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-md shadow-emerald-950 cursor-pointer"
                title="Imprimir documento em folha A4"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir A4</span>
              </button>

              {/* Botão Abrir no Editor Completo */}
              {onOpenInFullEditor && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenInFullEditor(doc.id);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-black hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                  title="Abrir no Editor Principal de Documentos"
                >
                  <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="hidden sm:inline">Editor Completo</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Configuração dos Botões */}
      <ClinicalButtonsConfigModal
        isOpen={isButtonsConfigOpen}
        doc={doc}
        onClose={() => setIsButtonsConfigOpen(false)}
        onSaved={() => {
          loadButtons();
        }}
        onToast={onToast}
      />

      {/* Modal / Assistente de Ficha Cadastral & Prontuário Clínico Interativo */}
      {isInteractivePatientRecordOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-6xl h-[90vh] bg-[#121215] border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <InteractivePatientRecordBuilder
              patient={patient}
              clinicName={clinicData.nomeClinica || 'Sua Clínica'}
              clinicCnpj={clinicData.cnpj || ''}
              initialData={interactivePatientRecordData}
              onGenerateDoc={(generatedHtml, dataState) => {
                setInteractivePatientRecordData(dataState as any);
                setActiveTab('ficha_paciente');
                saveCustomClinicalDocContent(doc.id, 'ficha_paciente', generatedHtml);
                setEditableHtml(generatedHtml);
                setIsInteractivePatientRecordOpen(false);

                // Update patient state if names/CPF are edited in builder
                if (dataState.nomeCliente) {
                  setPatient((prev) => ({
                    ...prev,
                    nomeCliente: dataState.nomeCliente,
                    cpfCliente: dataState.cpfCliente || prev.cpfCliente,
                    telefone: dataState.telefone || prev.telefone,
                    email: dataState.email || prev.email,
                    profissao: dataState.profissao || prev.profissao,
                    dataNascimento: dataState.dataNascimento || prev.dataNascimento,
                  }));
                }

                onToast('Ficha Cadastral & Prontuário do Paciente gerado com sucesso!');
              }}
              onClose={() => setIsInteractivePatientRecordOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Modal / Assistente de Anamnese Interativa */}
      {isInteractiveAnamneseOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-6xl h-[90vh] bg-[#121215] border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <InteractiveAnamneseBuilder
              procedureTitle={cleanDocTitle}
              patient={patient}
              clinicName={clinicData.nomeClinica || 'Sua Clínica'}
              clinicCnpj={clinicData.cnpj || ''}
              initialData={interactiveAnamneseData}
              onGenerateDoc={(generatedHtml, dataState) => {
                setInteractiveAnamneseData(dataState);
                setActiveTab('anamnese');
                saveCustomClinicalDocContent(doc.id, 'anamnese', generatedHtml);
                setEditableHtml(generatedHtml);
                setIsInteractiveAnamneseOpen(false);
                onToast('Ficha de Anamnese Interativa gerada e salva com sucesso!');
              }}
              onClose={() => setIsInteractiveAnamneseOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Modal / Estúdio de Análise de Fotos Antes e Depois (3 Ângulos com Zoom e Modo Apresentação) */}
      {isInteractiveBeforeAfterOpen && (
        <div className="fixed inset-0 z-[65] flex items-center justify-center p-1 sm:p-3 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-7xl h-[95vh] bg-[#0f0f12] border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <InteractiveBeforeAfterStudio
              procedureTitle={cleanDocTitle}
              patient={patient}
              clinicName={clinicData.nomeClinica || 'Sua Clínica'}
              clinicCnpj={clinicData.cnpj || ''}
              initialData={interactiveBeforeAfterData}
              onGenerateDoc={(generatedHtml, dataState) => {
                setInteractiveBeforeAfterData(dataState);
                setActiveTab('antes_depois');
                saveCustomClinicalDocContent(doc.id, 'antes_depois', generatedHtml);
                saveCustomClinicalDocContent(doc.id, 'plano_tratamento', generatedHtml);
                setEditableHtml(generatedHtml);
                setIsInteractiveBeforeAfterOpen(false);
                onToast('Relatório Fotográfico de Antes e Depois (3 Ângulos) gerado e aplicado!');
              }}
              onClose={() => setIsInteractiveBeforeAfterOpen(false)}
              onToast={onToast}
            />
          </div>
        </div>
      )}

      {/* Modal / Estúdio de Prescrição & Fórmulas Baseadas em Evidências */}
      {isInteractivePrescriptionOpen && (
        <div className="fixed inset-0 z-[65] flex items-center justify-center p-1 sm:p-3 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-7xl h-[95vh] bg-[#0c0c0e] border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <InteractivePrescriptionBuilder
              doc={doc}
              procedureContextKey={identifyProcedureContext(doc)}
              clinicData={clinicData}
              patientData={patient}
              onToast={onToast}
              onClose={() => setIsInteractivePrescriptionOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Modal / Estúdio de Plano de Tratamento & Mapeamento Fotográfico com Desenho */}
      {isInteractiveTreatmentPlanOpen && (
        <div className="fixed inset-0 z-[65] flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-7xl h-[92vh] bg-[#121215] border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <InteractiveTreatmentPlanStudio
              procedureTitle={cleanDocTitle}
              patient={patient}
              clinicName={clinicData.nomeClinica || 'Sua Clínica'}
              clinicCnpj={clinicData.cnpj || ''}
              initialData={interactiveTreatmentPlanData}
              onGenerateDoc={(generatedHtml, dataState) => {
                setInteractiveTreatmentPlanData(dataState);
                setActiveTab('plano_tratamento');
                saveCustomClinicalDocContent(doc.id, 'plano_tratamento', generatedHtml);
                setEditableHtml(generatedHtml);
                setIsInteractiveTreatmentPlanOpen(false);
                onToast('Plano de Tratamento com Foto e Desenho Mapeado aplicado ao Prontuário!');
              }}
              onClose={() => setIsInteractiveTreatmentPlanOpen(false)}
              onToast={onToast}
            />
          </div>
        </div>
      )}
    </>
  );
};

