import React, { useState, useEffect, useRef } from 'react';
import {
  Building2,
  UserCheck,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  FileText,
  Search,
  CheckSquare,
  Square,
  ArrowRight,
  ArrowLeft,
  Download,
  Edit3,
  FileType,
  Printer,
  ChevronRight,
  Sliders,
  ShoppingBag,
  Key,
  Layers,
  Check,
  Loader2,
  BookOpen,
  Palette,
  Image,
  Upload,
  Trash2,
  Eye,
  RefreshCw
} from 'lucide-react';
import { DocumentItem, ClinicData } from '../types';
import { replaceClinicVariables } from '../utils/a4Formatter';
import { StepCategoriesView } from './StepCategoriesView';
import {
  ClinicalDocType,
  CLINICAL_DOC_TYPES,
  getClinicalButtonsConfig
} from '../utils/procedureClinicalDocsHelper';
import { isCategory2Or3Document } from '../utils/stepCategoryHelper';
import { ProcedureClinicalDocsModal } from './ProcedureClinicalDocsModal';
import { ClinicalButtonsConfigModal } from './ClinicalButtonsConfigModal';

interface ClinicHubDashboardProps {
  clinicData: ClinicData;
  documents: DocumentItem[];
  onUpdateClinicData: (newData: ClinicData) => void;
  onApplyToAllDocs: (newData: ClinicData) => void;
  onApplyToSelectedDocs?: (newData: ClinicData, selectedIds: string[]) => void;
  onSelectDocToEdit?: (docId: string) => void;
  onOpenEditor?: (docId: string) => void;
  onUpdateDoc?: (updatedDoc: DocumentItem) => void;
  onReorderDocs?: (newDocs: DocumentItem[]) => void;
  onAddDoc?: (newDoc: DocumentItem) => void;
  onDeleteDoc?: (docId: string) => void;
  onDeleteMultipleDocs?: (docIds: string[]) => void;
  onDeleteCategory?: (catName: string, deleteMode: 'deleteDocs' | 'moveTo', targetCategoryName?: string) => void;
  onOpenClinicModal?: () => void;
  onOpenSalesPage?: () => void;
  onBackToSales?: () => void;
  onOpenConfigModal?: () => void;
  onOpenConfig?: () => void;
  onToast: (msg: string) => void;
}


const PRESET_PALETTES = [
  {
    name: 'Verde Esmeralda ANVISA',
    hex: '#00D3A1',
    category: 'Biossegurança & Saúde',
    desc: 'Padrão estético moderno e sanitário'
  },
  {
    name: 'Azul Clínico & Médico',
    hex: '#0284C7',
    category: 'Regulatório & Hospitalar',
    desc: 'Confiança médica e rigor sanitário'
  },
  {
    name: 'Dourado Nobre / Luxo',
    hex: '#D97706',
    category: 'Harmonização & High-End',
    desc: 'Sofisticação e procedimentos premium'
  },
  {
    name: 'Rose Gold / Beauty',
    hex: '#E11D48',
    category: 'Dermatologia & Estética',
    desc: 'Elegância, feminilidade e cuidados faciais'
  },
  {
    name: 'Lavanda Facial & Spa',
    hex: '#8B5CF6',
    category: 'Integrativa & Bem-Estar',
    desc: 'Tranquilidade e rejuvenescimento'
  },
  {
    name: 'Grafite Titânio',
    hex: '#334155',
    category: 'Corporativo & Neutro',
    desc: 'Sobriedade minimalista e precisão'
  },
  {
    name: 'Verde Floresta / Natural',
    hex: '#059669',
    category: 'Terapias & Fitocosmética',
    desc: 'Harmonia com a natureza e saúde limpa'
  },
  {
    name: 'Azul Safira Real',
    hex: '#2563EB',
    category: 'Biomedicina & Laser',
    desc: 'Tecnologia avançada e alta precisão'
  }
];

export const ClinicHubDashboard: React.FC<ClinicHubDashboardProps> = ({
  clinicData,
  documents,
  onUpdateClinicData,
  onApplyToAllDocs,
  onApplyToSelectedDocs,
  onSelectDocToEdit,
  onOpenEditor,
  onUpdateDoc,
  onReorderDocs,
  onAddDoc,
  onDeleteDoc,
  onDeleteMultipleDocs,
  onDeleteCategory,
  onOpenClinicModal,
  onOpenSalesPage,
  onBackToSales,
  onOpenConfigModal,
  onOpenConfig,
  onToast,
}) => {
  const [activeStep, setActiveStep] = useState<'dados' | 'personalizar' | 'documentos'>('dados');
  const [dashboardViewMode, setDashboardViewMode] = useState<'categories' | 'batch'>('categories');
  const [formData, setFormData] = useState<ClinicData>({
    themeColor: '#00D3A1',
    headerLayout: 'logo-left',
    ...clinicData
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('TODOS');
  const [selectedDocIds, setSelectedDocIds] = useState<Set<string>>(
    () => new Set(documents.map((d) => d.id))
  );
  const [isApplying, setIsApplying] = useState(false);
  const [clinicalDocsDoc, setClinicalDocsDoc] = useState<DocumentItem | null>(null);
  const [clinicalDocsInitialTab, setClinicalDocsInitialTab] = useState<ClinicalDocType>('ficha_paciente');
  const [openClinicalDropdownDocId, setOpenClinicalDropdownDocId] = useState<string | null>(null);
  const [configButtonsDoc, setConfigButtonsDoc] = useState<DocumentItem | null>(null);
  const [buttonsVersion, setButtonsVersion] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenClinicalDoc = (doc: DocumentItem, docType: ClinicalDocType = 'ficha_paciente') => {
    setClinicalDocsDoc(doc);
    setClinicalDocsInitialTab(docType);
    setOpenClinicalDropdownDocId(null);
  };

  const handleGoToSales = onBackToSales || onOpenSalesPage || (() => {});
  const handleGoToConfig = onOpenConfig || onOpenConfigModal || (() => {});
  const handleOpenDoc = (id: string) => {
    if (onOpenEditor) onOpenEditor(id);
    else if (onSelectDocToEdit) onSelectDocToEdit(id);
  };


  const categories = ['TODOS', 'Manual', 'POP', 'Contrato', 'Anamnese', 'TCLE', 'LGPD', 'Personalizado'];

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeCategory === 'TODOS' || doc.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const handleSelectAll = () => {
    if (selectedDocIds.size === documents.length) {
      setSelectedDocIds(new Set());
      onToast('Todos os documentos desmarcados.');
    } else {
      setSelectedDocIds(new Set(documents.map((d) => d.id)));
      onToast(`Todos os ${documents.length} documentos selecionados.`);
    }
  };

  const toggleSelectDoc = (id: string) => {
    setSelectedDocIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      onToast('O arquivo de logo deve ter no máximo 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setFormData((prev) => ({
        ...prev,
        logoUrl: base64
      }));
      onToast('Logo da clínica carregada com sucesso!');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setFormData((prev) => ({
      ...prev,
      logoUrl: undefined
    }));
    if (fileInputRef.current) fileInputRef.current.value = '';
    onToast('Logo removida.');
  };

  const handleAdvanceToPersonalize = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.nomeClinica?.trim()) {
      onToast('Por favor, informe a Razão Social ou Nome da Clínica.');
      return;
    }
    onUpdateClinicData(formData);
    setActiveStep('personalizar');
  };

  const handleSaveAndApplyAll = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.nomeClinica?.trim()) {
      onToast('Por favor, informe o nome da clínica.');
      return;
    }

    setIsApplying(true);
    setTimeout(() => {
      onApplyToAllDocs(formData);
      setIsApplying(false);
      setActiveStep('documentos');
      onToast(`✨ Identidade visual e dados aplicados a todos os ${documents.length} documentos!`);
    }, 250);
  };

  const handleApplyToSelected = () => {
    if (selectedDocIds.size === 0) {
      onToast('Selecione ao menos 1 documento para personalizar.');
      return;
    }
    setIsApplying(true);
    setTimeout(() => {
      if (onApplyToSelectedDocs) {
        onApplyToSelectedDocs(formData, Array.from(selectedDocIds));
      }
      setIsApplying(false);
      onToast(`⚡ Dados e identidade aplicados aos ${selectedDocIds.size} documentos selecionados!`);
    }, 200);
  };

  const currentThemeColor = formData.themeColor || '#00D3A1';

  return (
    <div className="min-h-screen bg-[#061224] text-[#F5F5F5] flex flex-col font-sans">
      {/* Top Header Simplificado e Elegante */}
      <header className="min-h-[60px] py-2.5 px-4 sm:px-6 md:px-8 flex items-center justify-between border-b border-[#173660] bg-[#081832]/95 backdrop-blur sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-black text-base shadow-sm shrink-0 transition-colors"
            style={{ backgroundColor: currentThemeColor }}
          >
            V
          </div>
          <div className="min-w-0">
            <div className="font-bold text-[14px] leading-tight flex items-center gap-2">
              <span className="truncate text-white max-w-[200px] sm:max-w-[320px]">
                {formData.nomeClinica || 'Minha Clínica de Estética'}
              </span>
              <span
                className="text-[9px] px-2 py-0.5 rounded-full font-black uppercase text-black shrink-0 transition-colors"
                style={{ backgroundColor: currentThemeColor }}
              >
                PASTA ANVISA
              </span>
            </div>
            <p className="text-[11px] text-[#8DA0BF] truncate mt-0.5">
              Personalização de Identidade Visual e POPs Sanitários
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 flex-wrap justify-end">
          <button
            onClick={handleGoToConfig}
            className="h-8 sm:h-9 px-2.5 sm:px-3 rounded-xl bg-[#0A1D3A] border border-[#173660] text-[11px] text-[#8DA0BF] hover:text-white hover:bg-[#0E274D] transition flex items-center gap-1.5 active:scale-95 cursor-pointer"
            title="Configurações do Mercado Pago"
          >
            <Key className="w-3.5 h-3.5 text-[#00D3A1]" />
            <span className="hidden lg:inline">Mercado Pago</span>
          </button>

          <button
            onClick={handleGoToSales}
            className="h-8 sm:h-9 px-2.5 sm:px-3.5 rounded-xl bg-[#00D3A1]/10 hover:bg-[#00D3A1]/20 border border-[#00D3A1]/40 text-[11px] font-bold text-[#00D3A1] hover:text-white transition flex items-center gap-1.5 active:scale-95 cursor-pointer"
            title="Ver Página de Vendas"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Página de Vendas</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 md:p-8 space-y-6">
        {/* Stepper Navigation: 1. Dados -> 2. Personalizar POP -> 3. Documentos */}
        <div className="flex items-center justify-center">
          <div className="flex items-center bg-[#081832] p-1.5 rounded-2xl border border-[#173660] max-w-2xl w-full gap-1 overflow-x-auto scrollbar-none">
            {/* Passo 1 */}
            <button
              onClick={() => setActiveStep('dados')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-[12px] sm:text-[13px] font-bold flex items-center justify-center gap-1.5 transition cursor-pointer whitespace-nowrap ${
                activeStep === 'dados'
                  ? 'bg-[#00D3A1] text-black shadow-md font-extrabold'
                  : 'text-[#8DA0BF] hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4 shrink-0" />
              <span>1. Dados Cadastrais</span>
            </button>

            {/* Passo 2: Personalizar POP */}
            <button
              onClick={() => {
                if (!formData.nomeClinica?.trim()) {
                  onToast('Preencha os dados cadastrais da clínica antes de personalizar.');
                  return;
                }
                setActiveStep('personalizar');
              }}
              className={`flex-1 py-2.5 px-3 rounded-xl text-[12px] sm:text-[13px] font-bold flex items-center justify-center gap-1.5 transition cursor-pointer whitespace-nowrap ${
                activeStep === 'personalizar'
                  ? 'bg-gradient-to-r from-[#00D3A1] to-[#00B1EA] text-black shadow-md font-extrabold'
                  : 'text-[#8DA0BF] hover:text-white'
              }`}
            >
              <Palette className="w-4 h-4 shrink-0" />
              <span>2. Personalizar POP</span>
            </button>

            {/* Passo 3: Documentos */}
            <button
              onClick={() => setActiveStep('documentos')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-[12px] sm:text-[13px] font-bold flex items-center justify-center gap-1.5 transition cursor-pointer whitespace-nowrap ${
                activeStep === 'documentos'
                  ? 'bg-[#00B1EA] text-black shadow-md font-extrabold'
                  : 'text-[#8DA0BF] hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4 shrink-0" />
              <span>3. Documentos ({documents.length})</span>
            </button>
          </div>
        </div>

        {/* STEP 1: FORMULÁRIO DE DADOS CADASTRAIS */}
        {activeStep === 'dados' && (
          <div className="bg-[#081832] border border-[#173660] rounded-3xl p-5 sm:p-8 shadow-2xl animate-[fadeIn_0.2s_ease]">
            <div className="max-w-2xl mb-6">
              <div className="flex items-center gap-2 text-[#00D3A1] text-[12px] font-black uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Passo 1 de 3: Identificação Oficial da Clínica</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Informe os Dados Cadastrais da sua Clínica
              </h2>
              <p className="text-[#8DA0BF] text-[13px] sm:text-[14px] mt-1 leading-relaxed">
                Esses dados serão inseridos automaticamente no cabeçalho, corpo e bloco de assinaturas de todos os {documents.length} documentos da sua pasta sanitária.
              </p>
            </div>

            <form onSubmit={handleAdvanceToPersonalize} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nome da Clínica */}
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8DA0BF] mb-1.5">
                    Nome / Razão Social da Clínica *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nomeClinica}
                    onChange={(e) => setFormData({ ...formData, nomeClinica: e.target.value })}
                    placeholder="Ex: Studio Estética & Biomedicina Integrada"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#0A1D3A] border border-[#173660] text-[13px] text-white focus:border-[#00D3A1] outline-none transition"
                  />
                </div>

                {/* Alvará Sanitário */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8DA0BF] mb-1.5">
                    Alvará Sanitário / Licença VISA
                  </label>
                  <input
                    type="text"
                    value={formData.alvara}
                    onChange={(e) => setFormData({ ...formData, alvara: e.target.value })}
                    placeholder="ALV-2026-VISA-88"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#0A1D3A] border border-[#173660] text-[13px] text-white focus:border-[#00D3A1] outline-none transition"
                  />
                </div>

                {/* Responsável Técnico */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8DA0BF] mb-1.5">
                    Nome do Responsável Técnico(a) (RT)
                  </label>
                  <input
                    type="text"
                    value={formData.responsavel}
                    onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
                    placeholder="Dra. Mariana Silva"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#0A1D3A] border border-[#173660] text-[13px] text-white focus:border-[#00D3A1] outline-none transition"
                  />
                </div>

                {/* Registro no Conselho */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8DA0BF] mb-1.5">
                    Conselho de Classe (CRBM / CRM / COREN / CRF)
                  </label>
                  <input
                    type="text"
                    value={formData.registroConselho || ''}
                    onChange={(e) => setFormData({ ...formData, registroConselho: e.target.value })}
                    placeholder="CRM 00000 / SP"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#0A1D3A] border border-[#173660] text-[13px] text-white focus:border-[#00D3A1] outline-none transition"
                  />
                </div>

                {/* Endereço */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8DA0BF] mb-1.5">
                    Endereço Comercial Completo
                  </label>
                  <input
                    type="text"
                    value={formData.endereco || ''}
                    onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                    placeholder="Av. Paulista, 1000 - Sala 50"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#0A1D3A] border border-[#173660] text-[13px] text-white focus:border-[#00D3A1] outline-none transition"
                  />
                </div>

                {/* Cidade / UF */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8DA0BF] mb-1.5">
                    Cidade / Estado (UF)
                  </label>
                  <input
                    type="text"
                    value={formData.cidade || ''}
                    onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                    placeholder="São Paulo - SP"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#0A1D3A] border border-[#173660] text-[13px] text-white focus:border-[#00D3A1] outline-none transition"
                  />
                </div>

                {/* Telefone de Contato */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8DA0BF] mb-1.5">
                    Telefone de Contato
                  </label>
                  <input
                    type="text"
                    value={formData.whatsapp || formData.telefone || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        whatsapp: e.target.value,
                        telefone: e.target.value,
                      })
                    }
                    placeholder="(11) 99999-8888"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#0A1D3A] border border-[#173660] text-[13px] text-white focus:border-[#00D3A1] outline-none transition"
                  />
                </div>

                {/* E-mail */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8DA0BF] mb-1.5">
                    E-mail Institucional
                  </label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contato@suaclinica.com.br"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#0A1D3A] border border-[#173660] text-[13px] text-white focus:border-[#00D3A1] outline-none transition"
                  />
                </div>
              </div>

              {/* Botão de Ação Principal para ir ao Passo 2 */}
              <div className="pt-4 border-t border-[#173660] flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-[12px] text-[#8DA0BF]">
                  No próximo passo, você poderá inserir a logotipo e paleta de cores para seus POPs.
                </p>

                <button
                  type="submit"
                  className="w-full sm:w-auto h-12 px-7 rounded-2xl bg-gradient-to-r from-[#00D3A1] to-[#00B1EA] text-black font-black text-[13px] sm:text-[14px] flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition cursor-pointer shadow-lg shadow-[#00D3A1]/20"
                >
                  <span>Avançar para Personalizar POP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: PERSONALIZAR POP (LOGO + PALETA DE CORES + PREVIEW A4) */}
        {activeStep === 'personalizar' && (
          <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
            {/* Header explicativo */}
            <div className="bg-[#081832] border border-[#173660] rounded-3xl p-5 sm:p-7 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[#00D3A1] text-[12px] font-black uppercase tracking-wider mb-1">
                    <Palette className="w-4 h-4" />
                    <span>Passo 2 de 3: Identidade Visual dos Documentos Sanitários</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    Personalizar Logotipo & Paleta de Cores do POP
                  </h2>
                  <p className="text-[#8DA0BF] text-[13px] sm:text-[14px] mt-1 leading-relaxed">
                    Personalize o visual oficial da sua clínica. O logotipo e a cor escolhida serão aplicados no cabeçalho timbrado, tabelas e rodapés de todos os documentos A4.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveStep('dados')}
                    className="h-10 px-4 rounded-xl bg-[#0A1D3A] hover:bg-[#0E274D] border border-[#173660] text-[12px] font-bold text-white flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Voltar aos Dados</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Grid com Seletor de Logo + Cores e Simulador A4 ao Vivo */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Coluna da Esquerda: Controles de Logo e Cor (7 colunas) */}
              <div className="lg:col-span-7 space-y-5">
                {/* Bloco 1: Upload da Logo da Clínica */}
                <div className="bg-[#081832] border border-[#173660] rounded-3xl p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-black font-bold shadow-sm"
                        style={{ backgroundColor: currentThemeColor }}
                      >
                        <Image className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-bold text-white leading-tight">
                          Logotipo da Clínica
                        </h3>
                        <p className="text-[11px] text-[#8DA0BF]">
                          Aparecerá no cabeçalho timbrado de todos os POPs e TCLEs
                        </p>
                      </div>
                    </div>

                    {formData.logoUrl && (
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        className="text-[11px] text-[#EF4444] hover:text-[#DC2626] font-bold flex items-center gap-1 transition p-1 cursor-pointer"
                        title="Remover logo atual"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remover</span>
                      </button>
                    )}
                  </div>

                  {/* Área de Upload / Preview da Logo */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleLogoUpload}
                    accept="image/png,image/jpeg,image/svg+xml,image/webp"
                    className="hidden"
                  />

                  {formData.logoUrl ? (
                    <div className="p-4 rounded-2xl bg-[#0A1D3A] border border-[#173660] flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-16 rounded-xl bg-white p-2 flex items-center justify-center border border-[#E2E8F0] shadow-sm">
                          <img
                            src={formData.logoUrl}
                            alt="Logo da Clínica"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div>
                          <div className="text-[13px] font-bold text-white flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-[#00D3A1]" />
                            <span>Logo Carregada</span>
                          </div>
                          <p className="text-[11px] text-[#8DA0BF] mt-0.5">
                            Pronta para inclusão nos documentos A4
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="h-9 px-4 rounded-xl bg-[#0E274D] hover:bg-[#173660] text-white text-[12px] font-bold transition flex items-center gap-1.5 cursor-pointer border border-[#173660]"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Alterar Imagem</span>
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-[#173660] hover:border-[#00D3A1] rounded-2xl p-6 text-center cursor-pointer transition bg-[#0A1D3A]/50 hover:bg-[#0A1D3A] group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-[#0E274D] group-hover:bg-[#00D3A1]/15 text-[#8DA0BF] group-hover:text-[#00D3A1] flex items-center justify-center mx-auto mb-3 transition">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div className="text-[13px] font-bold text-white group-hover:text-[#00D3A1] transition">
                        Clique para selecionar ou arraste o logotipo da sua clínica
                      </div>
                      <p className="text-[11px] text-[#8DA0BF] mt-1">
                        Formatos suportados: PNG, JPG, WebP ou SVG (máx. 2MB)
                      </p>
                    </div>
                  )}
                </div>

                {/* Bloco 2: Paleta de Cores do Documento */}
                <div className="bg-[#081832] border border-[#173660] rounded-3xl p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-black font-bold shadow-sm"
                        style={{ backgroundColor: currentThemeColor }}
                      >
                        <Palette className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-bold text-white leading-tight">
                          Paleta de Cores do Documento
                        </h3>
                        <p className="text-[11px] text-[#8DA0BF]">
                          Define a cor dos títulos, linhas divisórias e selos ANVISA
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-[#8DA0BF] uppercase">
                        {currentThemeColor}
                      </span>
                      <div
                        className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: currentThemeColor }}
                      />
                    </div>
                  </div>

                  {/* Grid de Paletas Pré-definidas */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {PRESET_PALETTES.map((palette) => {
                      const isSelected = formData.themeColor?.toLowerCase() === palette.hex.toLowerCase();
                      return (
                        <button
                          key={palette.hex}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, themeColor: palette.hex }));
                            onToast(`Paleta "${palette.name}" selecionada!`);
                          }}
                          className={`p-3 rounded-xl border text-left transition relative cursor-pointer ${
                            isSelected
                              ? 'bg-[#0E274D] border-[#00D3A1] shadow-md ring-1 ring-[#00D3A1]'
                              : 'bg-[#0A1D3A] border-[#173660] hover:border-[#224A80]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div
                              className="w-6 h-6 rounded-lg shadow-sm border border-white/10"
                              style={{ backgroundColor: palette.hex }}
                            />
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-[#00D3A1]" />
                            )}
                          </div>
                          <div className="text-[11.5px] font-bold text-white leading-tight truncate">
                            {palette.name}
                          </div>
                          <div className="text-[9.5px] text-[#8DA0BF] truncate mt-0.5">
                            {palette.category}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Seletor Customizado Hexadecimal */}
                  <div className="pt-2 border-t border-[#173660] flex items-center justify-between gap-3">
                    <div className="text-[12px] text-[#8DA0BF]">
                      Prefere uma cor personalizada da sua identidade visual?
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={formData.themeColor || '#00D3A1'}
                        onChange={(e) => setFormData((prev) => ({ ...prev, themeColor: e.target.value }))}
                        className="w-9 h-9 rounded-lg bg-transparent border-0 cursor-pointer p-0"
                        title="Seletor de cor livre"
                      />
                      <input
                        type="text"
                        value={formData.themeColor || '#00D3A1'}
                        onChange={(e) => setFormData((prev) => ({ ...prev, themeColor: e.target.value }))}
                        placeholder="#00D3A1"
                        maxLength={7}
                        className="w-24 h-9 px-2 rounded-lg bg-[#0A1D3A] border border-[#173660] text-[12px] font-mono text-white text-center uppercase focus:border-[#00D3A1] outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Botões de Avanço */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveStep('dados')}
                    className="w-full sm:w-auto h-12 px-5 rounded-2xl bg-[#0A1D3A] hover:bg-[#0E274D] border border-[#173660] text-white font-bold text-[13px] flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Voltar: Dados Cadastrais</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveAndApplyAll}
                    disabled={isApplying}
                    className="w-full sm:w-auto h-12 px-7 rounded-2xl bg-gradient-to-r from-[#00D3A1] to-[#00B1EA] text-black font-black text-[13px] sm:text-[14px] flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition cursor-pointer shadow-lg shadow-[#00D3A1]/20 disabled:opacity-60"
                  >
                    {isApplying ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    <span>Salvar e Ver Documentos ({documents.length})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Coluna da Direita: Simulador A4 em Tempo Real (5 colunas) */}
              <div className="lg:col-span-5">
                <div className="sticky top-20 bg-[#081832] border border-[#173660] rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[13px] font-bold text-white">
                      <Eye className="w-4 h-4 text-[#00D3A1]" />
                      <span>Prévia do Cabeçalho A4 Oficial</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0A1D3A] border border-[#173660] text-[#8DA0BF] px-2 py-0.5 rounded">
                      Tempo Real
                    </span>
                  </div>

                  {/* Folha A4 Miniatura */}
                  <div className="bg-white rounded-2xl p-5 text-[#0F172A] shadow-2xl border border-[#CBD5E1] space-y-3 font-sans">
                    {/* Cabeçalho A4 com Logo e Cor Aplicados */}
                    <div
                      className="pb-3 flex justify-between items-center gap-3"
                      style={{ borderBottom: `2.5px solid ${currentThemeColor}` }}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {formData.logoUrl ? (
                          <img
                            src={formData.logoUrl}
                            alt="Logo Clínica"
                            className="max-h-11 max-w-[85px] object-contain rounded shrink-0"
                          />
                        ) : (
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-[11px] font-black shrink-0 shadow-sm"
                            style={{ backgroundColor: currentThemeColor }}
                          >
                            LOGO
                          </div>
                        )}
                        <div className="min-w-0">
                          <div
                            className="font-black text-[13px] uppercase tracking-tight truncate"
                            style={{ color: currentThemeColor }}
                          >
                            {formData.nomeClinica || 'CLÍNICA DE ESTÉTICA INTEGRADA'}
                          </div>
                          <div className="text-[8.5px] text-[#475569] leading-tight">
                            RT: {formData.responsavel || 'Homologado'}
                          </div>
                          <div className="text-[8px] text-[#64748B]">
                            Alvará VISA: {formData.alvara || '2026/VISA'}
                          </div>
                        </div>
                      </div>

                      <div
                        className="text-[7.5px] font-black uppercase px-2 py-0.5 rounded tracking-wider shrink-0"
                        style={{
                          border: `1.5px solid ${currentThemeColor}`,
                          color: currentThemeColor,
                          backgroundColor: '#F8FAFC'
                        }}
                      >
                        PADRÃO ANVISA
                      </div>
                    </div>

                    {/* Caixa de Identificação do Documento */}
                    <div
                      className="bg-[#F8FAFC] rounded-lg p-2.5 text-[9px] flex items-center justify-between"
                      style={{
                        border: '1px solid #E2E8F0',
                        borderLeft: `4px solid ${currentThemeColor}`
                      }}
                    >
                      <div>
                        <div className="font-bold uppercase tracking-wider text-[8px]" style={{ color: currentThemeColor }}>
                          POP 01 • PROCEDIMENTO OPERACIONAL PADRÃO
                        </div>
                        <div className="font-extrabold text-[11px] text-[#0F172A] mt-0.5">
                          Higienização das Mãos e Antissepsia
                        </div>
                      </div>
                      <div className="text-right text-[8px] font-mono text-[#64748B]">
                        <div>Cód: <strong>POP-001</strong></div>
                        <div>Rev: 2026</div>
                      </div>
                    </div>

                    {/* Esqueleto de Conteúdo de Demonstração */}
                    <div className="space-y-1.5 py-1">
                      <div className="h-2 bg-[#E2E8F0] rounded w-full"></div>
                      <div className="h-2 bg-[#F1F5F9] rounded w-5/6"></div>
                      <div className="h-2 bg-[#F1F5F9] rounded w-4/6"></div>
                    </div>

                    {/* Mini Assinatura no Rodapé */}
                    <div className="pt-2 border-t border-dashed border-[#CBD5E1] flex justify-between items-center text-[7.5px] text-[#64748B]">
                      <span>{formData.nomeClinica || 'Clínica Estética'} • Alvará Vigente</span>
                      <span className="font-bold text-[#0F172A]">PÁGINA 1 DE 2</span>
                    </div>
                  </div>

                  <p className="text-[11.5px] text-[#777777] text-center leading-relaxed">
                    ✨ Todos os {documents.length} documentos da sua pasta sanitária serão formatados automaticamente com esta identidade visual.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: SELEÇÃO DE CARDS & DOCUMENTOS */}
        {activeStep === 'documentos' && (
          <div className="space-y-4 animate-[fadeIn_0.2s_ease]">
            {dashboardViewMode === 'categories' ? (
              <StepCategoriesView
                clinicData={formData}
                documents={documents}
                currentThemeColor={currentThemeColor}
                onOpenDoc={handleOpenDoc}
                onUpdateDoc={(updatedDoc) => {
                  if (onUpdateDoc) onUpdateDoc(updatedDoc);
                  else onToast(`Documento "${updatedDoc.title}" atualizado.`);
                }}
                onReorderDocs={onReorderDocs}
                onAddDoc={(newDoc) => {
                  if (onAddDoc) onAddDoc(newDoc);
                  else onToast(`Novo documento "${newDoc.title}" criado.`);
                }}
                onDeleteDoc={(docId) => {
                  if (onDeleteDoc) onDeleteDoc(docId);
                  else onToast('Documento removido.');
                }}
                onDeleteCategory={onDeleteCategory}
                onOpenClinicModal={() => {
                  if (onOpenClinicModal) onOpenClinicModal();
                  else setActiveStep('dados');
                }}
                onSwitchToBatchMode={() => setDashboardViewMode('batch')}
                onToast={onToast}
              />
            ) : (
              <div className="space-y-4">
                {/* Control Bar: Resumo, Seleção em Lote e Filtros */}
                <div className="bg-[#081832] border border-[#173660] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-black shrink-0 font-bold"
                      style={{ backgroundColor: currentThemeColor }}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-extrabold text-white flex items-center gap-2">
                        <span>Documentos Sanitários ({documents.length})</span>
                        <span className="text-[11px] font-bold bg-[#0A1D3A] border border-[#173660] px-2 py-0.5 rounded-md text-[#00D3A1]">
                          {selectedDocIds.size} selecionados
                        </span>
                      </h3>
                      <p className="text-[12px] text-[#8DA0BF] mt-0.5">
                        Clínica: <strong className="text-white">{formData.nomeClinica || 'Não informada'}</strong> • 
                        Identidade: <span className="inline-block w-2.5 h-2.5 rounded-full ml-1 mr-1 align-middle" style={{ backgroundColor: currentThemeColor }}></span>
                        <strong className="text-white uppercase text-[11px]">{currentThemeColor}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Botões de Ação em Lote */}
                  <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
                    <button
                      type="button"
                      onClick={() => setDashboardViewMode('categories')}
                      className="h-9 px-3 rounded-xl bg-[#0A1D3A] hover:bg-[#0E274D] border border-[#173660] text-[12px] text-emerald-400 font-bold flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                      title="Voltar ao modo de Categorias Passo a Passo"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Modo Passo a Passo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveStep('personalizar')}
                      className="h-9 px-3 rounded-xl bg-[#0A1D3A] hover:bg-[#0E274D] border border-[#173660] text-[12px] text-white font-bold flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                      title="Alterar cores ou logo"
                    >
                      <Palette className="w-3.5 h-3.5 text-[#00D3A1]" />
                      <span>Ajustar Visual</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSelectAll}
                      className="h-9 px-3 rounded-xl bg-[#0A1D3A] hover:bg-[#0E274D] border border-[#173660] text-[12px] text-white font-bold flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                    >
                      {selectedDocIds.size === documents.length ? (
                        <>
                          <CheckSquare className="w-3.5 h-3.5 text-[#00D3A1]" />
                          <span>Desmarcar Todos</span>
                        </>
                      ) : (
                        <>
                          <Square className="w-3.5 h-3.5 text-[#8DA0BF]" />
                          <span>Selecionar Todos ({documents.length})</span>
                        </>
                      )}
                    </button>

                    {selectedDocIds.size > 0 && onDeleteMultipleDocs && (
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Tem certeza que deseja excluir os ${selectedDocIds.size} documento(s) selecionado(s)?`)) {
                            onDeleteMultipleDocs(Array.from(selectedDocIds));
                            setSelectedDocIds(new Set());
                          }
                        }}
                        className="h-9 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-[12px] text-rose-400 font-bold flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-sm"
                        title="Excluir documentos selecionados"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Excluir Selecionados ({selectedDocIds.size})</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleApplyToSelected}
                      disabled={isApplying || selectedDocIds.size === 0}
                      className="flex-1 md:flex-initial h-9 px-4 rounded-xl bg-gradient-to-r from-[#00D3A1] to-[#00B1EA] text-black font-extrabold text-[12px] flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-95 transition cursor-pointer shadow-md shadow-[#00D3A1]/15 disabled:opacity-50"
                    >
                      {isApplying ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Sparkles className="w-3.5 h-3.5" />
                      )}
                      <span>Personalizar Selecionados ({selectedDocIds.size})</span>
                    </button>
                  </div>
                </div>

                {/* Filtros de Categoria e Busca */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  {/* Categorias */}
                  <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
                    {categories.map((cat) => {
                      const count = cat === 'TODOS' ? documents.length : documents.filter((d) => d.category === cat).length;
                      return (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                            activeCategory === cat
                              ? 'bg-[#00B1EA] text-black font-extrabold shadow-sm'
                              : 'bg-[#081832] text-[#8DA0BF] hover:text-white hover:bg-[#0A1D3A] border border-[#173660]'
                          }`}
                        >
                          <span>{cat}</span>
                          <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${activeCategory === cat ? 'bg-black/20 text-black font-black' : 'bg-[#0A1D3A] text-[#8DA0BF]'}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Input de Busca */}
                  <div className="w-full sm:w-64 px-3 py-1.5 bg-[#081832] border border-[#173660] rounded-xl flex items-center gap-2 focus-within:border-[#00D3A1]">
                    <Search className="w-3.5 h-3.5 text-[#8DA0BF] shrink-0" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar documento..."
                      className="w-full bg-transparent text-[12px] text-white outline-none placeholder:text-[#8DA0BF]"
                    />
                  </div>
                </div>

                {/* Grid de Cards dos Documentos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {filteredDocs.map((doc) => {
                    const isSelected = selectedDocIds.has(doc.id);
                    const isProcedureDoc = isCategory2Or3Document(doc);

                    return (
                      <div
                        key={doc.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 cursor-pointer group ${
                          isSelected
                            ? 'bg-[#0E274D] border-[#00D3A1]/50 shadow-md shadow-[#00D3A1]/5 ring-1 ring-[#00D3A1]/20'
                            : 'bg-[#081832] border-[#173660] hover:border-[#224A80] opacity-90 hover:opacity-100'
                        }`}
                        onClick={() => toggleSelectDoc(doc.id)}
                      >
                        {/* Header do Card */}
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-1.5">
                              <span
                                className="text-[9px] px-2 py-0.5 rounded font-black tracking-wider uppercase border"
                                style={{
                                  borderColor: `${currentThemeColor}40`,
                                  color: currentThemeColor,
                                  backgroundColor: `${currentThemeColor}10`
                                }}
                              >
                                {doc.category}
                              </span>
                              <span className="text-[10px] text-[#8DA0BF] font-mono">
                                {doc.version || 'V 1.0'}
                              </span>
                            </div>

                            {/* Checkbox de seleção */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSelectDoc(doc.id);
                              }}
                              className="w-6 h-6 rounded-lg flex items-center justify-center transition"
                            >
                              {isSelected ? (
                                <CheckSquare className="w-5 h-5 text-[#00D3A1]" />
                              ) : (
                                <Square className="w-5 h-5 text-[#8DA0BF] group-hover:text-white" />
                              )}
                            </button>
                          </div>

                          {/* Título do Documento Completo */}
                          <h4 className="text-[13.5px] font-bold text-white leading-snug group-hover:text-[#00D3A1] transition break-words">
                            {doc.title}
                          </h4>

                          {doc.adaptationNotes && (
                            <p className="text-[11px] text-[#8DA0BF] mt-1 leading-relaxed break-words">
                              {doc.adaptationNotes}
                            </p>
                          )}

                          {/* Seção de Documentos Clínicos Rápidos no Card (somente Categoria 2 e 3) */}
                          {isProcedureDoc && (
                            <div className="mt-3 pt-2 border-t border-[#173660]" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-between gap-1 mb-1.5">
                                <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-[#8DA0BF] flex items-center gap-1">
                                  <FileText className="w-3 h-3 text-[#00D3A1]" />
                                  <span>Docs Clínicos</span>
                                </span>

                                <div className="relative">
                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setConfigButtonsDoc(doc);
                                      }}
                                      className="px-1.5 py-0.5 rounded text-[9.5px] text-[#8DA0BF] hover:text-[#00D3A1] hover:bg-[#0A1D3A] transition flex items-center gap-1"
                                      title="Configurar e personalizar botões"
                                    >
                                      <Sliders className="w-2.5 h-2.5" />
                                      <span>Editar</span>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenClinicalDropdownDocId(
                                          openClinicalDropdownDocId === doc.id ? null : doc.id
                                        );
                                      }}
                                      className="px-2 py-0.5 rounded-md bg-[#0A1D3A] hover:bg-[#0E274D] text-[#8DA0BF] hover:text-white text-[9.5px] font-bold flex items-center gap-1 transition border border-[#173660]"
                                    >
                                      <span>Opções</span>
                                      <ChevronRight className="w-3 h-3 rotate-90 text-[#00D3A1]" />
                                    </button>
                                  </div>

                                  {openClinicalDropdownDocId === doc.id && (
                                    <div className="absolute right-0 top-6 z-40 w-56 bg-[#081832] border border-[#173660] rounded-xl shadow-2xl p-1.5 text-xs space-y-1 animate-fadeIn">
                                      <div className="flex items-center justify-between px-2 py-1 border-b border-[#173660]">
                                        <span className="text-[9px] uppercase font-black text-[#8DA0BF]">
                                          Documentos do Paciente
                                        </span>
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setConfigButtonsDoc(doc);
                                            setOpenClinicalDropdownDocId(null);
                                          }}
                                          className="text-[10px] text-emerald-400 hover:underline flex items-center gap-0.5 font-bold"
                                        >
                                          <Sliders className="w-2.5 h-2.5" />
                                          <span>Configurar</span>
                                        </button>
                                      </div>
                                      {getClinicalButtonsConfig(doc.id)
                                        .filter((b) => b.enabled !== false)
                                        .map((cd) => (
                                          <button
                                            key={cd.type}
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleOpenClinicalDoc(doc, cd.type as ClinicalDocType);
                                            }}
                                            className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-[#0E274D] text-zinc-200 flex items-center gap-2 transition text-xs font-medium"
                                          >
                                            <span
                                              className="w-2 h-2 rounded-full shrink-0"
                                              style={{ backgroundColor: cd.color }}
                                            />
                                            <div className="flex-1 truncate">
                                              <div className="font-semibold text-white truncate">{cd.label}</div>
                                              <div className="text-[9px] text-[#8DA0BF] truncate">{cd.shortLabel || cd.label}</div>
                                            </div>
                                          </button>
                                        ))}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="flex flex-wrap items-center gap-1">
                                {getClinicalButtonsConfig(doc.id)
                                  .filter((b) => b.enabled !== false)
                                  .map((btn) => (
                                    <button
                                      key={btn.type}
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenClinicalDoc(doc, btn.type as ClinicalDocType);
                                      }}
                                      className="px-1.5 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1 transition border hover:brightness-125"
                                      style={{
                                        backgroundColor: `${btn.color}18`,
                                        borderColor: `${btn.color}40`,
                                        color: btn.color,
                                      }}
                                      title={btn.label}
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: btn.color }} />
                                      <span>{btn.shortLabel || btn.label}</span>
                                    </button>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Rodapé do Card: Ação para Abrir no Editor e Excluir */}
                        <div className="pt-3 border-t border-[#173660]" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] text-[#8DA0BF] font-medium">
                              {doc.lastModified ? `Atualizado: ${doc.lastModified}` : 'Conforme ANVISA'}
                            </span>

                            <div className="flex items-center gap-1.5">
                              {onDeleteDoc && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (confirm(`Tem certeza que deseja excluir o card "${doc.title}"?`)) {
                                      onDeleteDoc(doc.id);
                                    }
                                  }}
                                  className="h-8 w-8 rounded-xl bg-[#0A1D3A] hover:bg-rose-500/20 border border-[#173660] hover:border-rose-500/40 text-zinc-400 hover:text-rose-400 flex items-center justify-center transition active:scale-95"
                                  title="Excluir este card"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() => handleOpenDoc(doc.id)}
                                className="h-8 px-3 rounded-xl bg-[#0A1D3A] hover:bg-[#0E274D] border border-[#173660] hover:border-[#00D3A1]/60 text-[11px] font-bold text-white flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                                title="Abrir no editor completo para visualizar ou ajustar texto"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-[#00D3A1]" />
                                <span>Abrir / Editar</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Modal de Documentos Clínicos Rápidos */}
      <ProcedureClinicalDocsModal
        isOpen={!!clinicalDocsDoc}
        doc={clinicalDocsDoc}
        initialTab={clinicalDocsInitialTab}
        clinicData={formData}
        onClose={() => {
          setClinicalDocsDoc(null);
          setButtonsVersion((v) => v + 1);
        }}
        onOpenInFullEditor={(docId) => {
          setClinicalDocsDoc(null);
          handleOpenDoc(docId);
        }}
        onToast={onToast}
      />

      {/* Modal de Configuração dos Botões Clínicos */}
      <ClinicalButtonsConfigModal
        isOpen={!!configButtonsDoc}
        doc={configButtonsDoc}
        onClose={() => setConfigButtonsDoc(null)}
        onSaved={() => {
          setButtonsVersion((v) => v + 1);
        }}
        onToast={onToast}
      />
    </div>
  );
};
