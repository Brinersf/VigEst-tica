import React, { useState } from 'react';
import {
  ShieldCheck,
  Check,
  Zap,
  Sparkles,
  Key,
  Lock,
  ArrowRight,
  Award,
  FileText,
  AlertTriangle,
  Download,
  Users,
  ChevronDown,
  Star,
  Building2,
  Syringe,
  CheckCircle2,
  Sliders,
  Layers,
  Thermometer,
  BookOpen,
  Scale,
  Pill,
  SlidersHorizontal,
  ExternalLink,
  Flame,
  CheckCircle,
  Eye,
  Maximize2,
  DollarSign
} from 'lucide-react';
import { ClinicData, DocumentItem } from '../types';
import { INITIAL_DOCUMENTS } from '../data/documents';
import { STEP_CATEGORIES, getStepCategoryForDocument } from '../utils/stepCategoryHelper';
import { A4DocumentPreviewModal } from './A4DocumentPreviewModal';
import { PaywallGateModal } from './PaywallGateModal';

// Generated imagery
const HERO_IMAGE = '/src/assets/images/hero_pasta_estetica_1786963381414.jpg';
const MOCKUP_IMAGE = '/src/assets/images/mockup_pasta_sanitaria_1786963401411.jpg';

interface SalesLandingPageProps {
  onAccessEditor: () => void;
  isPaid?: boolean;
  onUnlockPaid?: () => void;
  onOpenConfig: () => void;
  currentClinicData: ClinicData;
  documents?: DocumentItem[];
}

export const SalesLandingPage: React.FC<SalesLandingPageProps> = ({
  onAccessEditor,
  isPaid = false,
  onUnlockPaid,
  onOpenConfig,
  currentClinicData,
  documents = INITIAL_DOCUMENTS
}) => {
  const [activeTab, setActiveTab] = useState<string>(
    STEP_CATEGORIES[1]?.name || '2. POP Procedimentos Estéticos'
  );
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isA4ModalOpen, setIsA4ModalOpen] = useState(false);
  const [a4ModalType, setA4ModalType] = useState<'prescription' | 'pop' | 'tcle'>('prescription');
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);

  const getCheckoutUrl = () => {
    try {
      return (
        localStorage.getItem('vigi_hotmart_checkout_url') ||
        localStorage.getItem('vigi_kiwify_checkout_url') ||
        'https://pay.hotmart.com/N107670534A'
      );
    } catch {
      return 'https://pay.hotmart.com/N107670534A';
    }
  };

  const scrollToPayment = () => {
    const elem = document.getElementById('pagamento');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsPaywallOpen(true);
    }
  };

  const handleBuyNow = () => {
    const url = getCheckoutUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAccessClick = () => {
    if (isPaid) {
      onAccessEditor();
    } else {
      scrollToPayment();
    }
  };

  return (
    <div className="min-h-screen bg-[#061224] text-[#F0F6FF] font-sans antialiased selection:bg-[#00D3A1] selection:text-black">
      {/* Top Ticker Notification */}
      <div className="bg-gradient-to-r from-[#0284c7] via-[#059669] to-[#0284c7] text-white py-2 px-4 text-center text-xs font-bold tracking-wide flex items-center justify-center gap-2 shadow-md">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        <span>ATUALIZAÇÃO 2026 • 100% Conforme RDC 63/2011, RDC 222/2018 ANVISA e LGPD</span>
        <span className="hidden md:inline bg-black/25 px-2 py-0.5 rounded text-[11px] font-extrabold uppercase">
          Vigência Imediata
        </span>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-[#081832]/95 backdrop-blur-md border-b border-[#173660] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D3A1] to-[#00B1EA] flex items-center justify-center font-black text-black text-xl shadow-[0_0_25px_rgba(0,211,161,0.35)]">
            V
          </div>
          <div>
            <div className="font-extrabold text-[17px] sm:text-[19px] text-white flex items-center gap-2">
              <span>VigiEstética</span>
              <span className="text-[9px] uppercase tracking-wider font-black bg-[#00D3A1] text-black px-1.5 py-0.5 rounded">
                Master 5.0
              </span>
            </div>
            <p className="text-[10px] text-[#94A3B8] font-medium tracking-wide uppercase">
              Blindagem Jurídico-Sanitária
            </p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-[13px] font-semibold text-[#94A3B8]">
          <a href="#procedimentos" className="hover:text-[#00D3A1] transition text-[#00D3A1] flex items-center gap-1.5 font-bold">
            <Layers className="w-3.5 h-3.5" />
            <span>O Que Inclui</span>
          </a>
          <a href="#beneficios" className="hover:text-[#00D3A1] transition">Benefícios</a>
          <a href="#como-funciona" className="hover:text-[#00D3A1] transition">Como Funciona</a>
          <a href="#depoimentos" className="hover:text-[#00D3A1] transition">Depoimentos</a>
          <a href="#pagamento" className="text-amber-400 hover:text-amber-300 transition font-extrabold flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Pagamento & Acesso</span>
          </a>
          <a href="#duvidas" className="hover:text-[#00D3A1] transition">FAQ</a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {!isPaid ? (
            <>
              <button
                type="button"
                onClick={() => setIsPaywallOpen(true)}
                className="text-xs text-[#94A3B8] hover:text-[#00D3A1] font-bold hidden sm:inline px-2 py-1 cursor-pointer transition"
              >
                Já comprou? Entrar
              </button>

              <button
                type="button"
                onClick={scrollToPayment}
                className="h-9 sm:h-10 px-4 sm:px-5 rounded-xl bg-gradient-to-r from-[#00D3A1] via-[#00B1EA] to-[#00D3A1] hover:brightness-110 text-black text-xs sm:text-sm font-black tracking-wide transition flex items-center gap-2 shadow-[0_0_25px_rgba(0,211,161,0.35)] active:scale-95 cursor-pointer"
              >
                <Lock className="w-4 h-4 text-black stroke-[2.5]" />
                <span>Garantir Acesso • Pagamento</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onAccessEditor}
              className="h-9 sm:h-10 px-4 sm:px-5 rounded-xl bg-gradient-to-r from-[#00D3A1] to-[#00B1EA] hover:brightness-110 text-black text-xs sm:text-sm font-black tracking-wide transition flex items-center gap-2 shadow-[0_0_25px_rgba(0,211,161,0.35)] active:scale-95 cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-black" />
              <span>Acessar Software</span>
            </button>
          )}
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
        {/* Background glow ambiance */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#00D3A1]/10 blur-[140px] rounded-full" />
        <div className="pointer-events-none absolute top-1/2 -right-40 w-[600px] h-[600px] bg-[#00B1EA]/10 blur-[130px] rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Anchor Hook */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-[#092244]/90 border border-[#00D3A1]/50 text-white text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(0,211,161,0.2)] text-center">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D3A1] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D3A1]"></span>
              </span>
              <ShieldCheck className="w-4 h-4 text-[#00D3A1] shrink-0" />
              <span>Esteja 100% preparado para qualquer fiscalização de surpresa da Vigilância Sanitária ou conselhos de classe</span>
            </div>
          </div>

          <div className="mt-6 text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Blindagem Jurídico-Sanitária <br />
              <span className="bg-gradient-to-r from-[#00D3A1] via-[#38BDF8] to-[#00D3A1] bg-clip-text text-transparent">
                para Clínicas de Estética
              </span>
            </h1>
            <p className="mt-5 text-base sm:text-lg md:text-xl text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
              <strong className="text-white">Documentos regulatórios e clínicos oficiais</strong>: Documentos Base ANVISA, POPs de Injetáveis, Lasers & Tecnologias, Procedimentos Corporais e Faciais, Biossegurança & CME, Cadernos Sanitários Pautados, TCLEs, Contratos, PGRSS e o <strong className="text-pink-400">Novo Estúdio de Prescrições Estéticas</strong> — prontos para personalizar em 1 clique.
            </p>
          </div>

          {/* Luxury Card Box Inspired by the Reference Image */}
          <div className="mt-10 max-w-5xl mx-auto bg-gradient-to-b from-[#0C2242] to-[#081832] border-2 border-[#1E4477] rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_25px_80px_-15px_rgba(2,6,23,0.8)] relative overflow-hidden">
            {/* Elegant luxury top border ribbon */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00D3A1] via-[#F59E0B] to-[#EC4899]" />

            <div className="grid md:grid-cols-12 gap-8 items-center">
              {/* Left Column: Image Mockup & Golden Badge */}
              <div className="md:col-span-5 relative flex flex-col items-center">
                <div className="relative rounded-2xl overflow-hidden border border-[#1E4477] shadow-2xl w-full max-w-[340px] aspect-square bg-[#061224]">
                  <img
                    src={MOCKUP_IMAGE}
                    alt="Pasta Sanitária para Estética - Documentação Oficial"
                    className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                    <div className="text-[11px] font-extrabold uppercase text-[#00D3A1] tracking-wider">
                      Compêndio Completo Master 2026
                    </div>
                    <div className="text-sm font-bold text-white leading-tight">
                      POPs, TCLEs, PGRSS & Prescrições Personalizadas
                    </div>
                  </div>
                </div>

                {/* Golden Seal Badge */}
                <div className="mt-4 w-full max-w-[340px] bg-gradient-to-r from-[#78350F]/40 via-[#F59E0B]/20 to-[#78350F]/40 border border-[#F59E0B]/50 rounded-2xl p-3 text-center flex items-center justify-center gap-3">
                  <Award className="w-7 h-7 text-[#F59E0B] shrink-0" />
                  <div className="text-left">
                    <div className="text-xs font-black text-[#FCD34D] uppercase tracking-wider">
                      Documentação Profissional
                    </div>
                    <div className="text-[11px] text-[#FEF3C7] font-medium">
                      Pronta para Uso Imediato & Auditoria VISA
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: 5 Main Pillars + Huge Call To Action */}
              <div className="md:col-span-7 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-[#081832]/80 border border-[#173660] rounded-2xl p-3.5">
                    <div className="w-7 h-7 rounded-xl bg-[#00D3A1]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#00D3A1] stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Cumpra 100% das exigências sanitárias</h4>
                      <p className="text-xs text-[#94A3B8] mt-0.5">
                        Elaborado rigorosamente de acordo com a RDC nº 63/2011, RDC nº 222/2018 (PGRSS) e normas vigentes da ANVISA.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-[#081832]/80 border border-pink-500/30 rounded-2xl p-3.5 bg-gradient-to-r from-[#210B24]/60 to-[#081832]/80">
                    <div className="w-7 h-7 rounded-xl bg-pink-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Pill className="w-4 h-4 text-pink-400 stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">Prescrições Estéticas 100% Personalizáveis</h4>
                        <span className="text-[10px] bg-pink-500/20 text-pink-300 font-bold px-1.5 py-0.5 rounded border border-pink-500/30">NOVO</span>
                      </div>
                      <p className="text-xs text-[#94A3B8] mt-0.5">
                        Prescreva fórmulas tópicas, cosmecêuticos pós-procedimento, nutracêuticos In & Out e manipulados customizados com posologia e respaldo científico.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-[#081832]/80 border border-[#173660] rounded-2xl p-3.5">
                    <div className="w-7 h-7 rounded-xl bg-[#00D3A1]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#00D3A1] stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Transmita segurança, autoridade e profissionalismo</h4>
                      <p className="text-xs text-[#94A3B8] mt-0.5">
                        Documentos com layout institucional padrão ouro para sua clínica de estética que geram máxima confiança nos pacientes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-[#081832]/80 border border-[#173660] rounded-2xl p-3.5">
                    <div className="w-7 h-7 rounded-xl bg-[#00D3A1]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#00D3A1] stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Evite multas de até R$ 50.000 e interdição</h4>
                      <p className="text-xs text-[#94A3B8] mt-0.5">
                        Esteja 100% preparado para qualquer fiscalização de surpresa da Vigilância Sanitária ou conselhos de classe.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-[#081832]/80 border border-[#173660] rounded-2xl p-3.5">
                    <div className="w-7 h-7 rounded-xl bg-[#00D3A1]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#00D3A1] stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Prontos para uso imediato com preenchimento em 1 clique</h4>
                      <p className="text-xs text-[#94A3B8] mt-0.5">
                        Insira os dados da sua clínica uma única vez e todos os documentos são adaptados instantaneamente.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-[#081832]/80 border border-[#173660] rounded-2xl p-3.5">
                    <div className="w-7 h-7 rounded-xl bg-[#00D3A1]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#00D3A1] stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Ideal para clínicas, consultórios e profissionais estetas</h4>
                      <p className="text-xs text-[#94A3B8] mt-0.5">
                        Perfeito para Biomédicos, Farmacêuticos, Médicos, Dentistas, Enfermeiros, Fisioterapeutas e Esteticistas.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Prominent Gold Luxury CTA Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={isPaid ? onAccessEditor : scrollToPayment}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#F59E0B] via-[#D97706] to-[#B45309] hover:from-[#FBBF24] hover:to-[#D97706] text-black font-black text-base sm:text-lg tracking-wide uppercase flex items-center justify-center gap-3 shadow-[0_10px_35px_rgba(245,158,11,0.4)] border border-[#FDE68A] transition transform active:scale-95 cursor-pointer"
                  >
                    <Building2 className="w-5 h-5 text-black" />
                    <span>{isPaid ? 'Acessar Software Completo (Liberado)' : 'Garantir Minha Blindagem & Ir para o Pagamento'}</span>
                  </button>
                  <div className="mt-2 flex items-center justify-center gap-4 text-[11px] text-[#94A3B8]">
                    <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#00D3A1]" /> Regularização ANVISA</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-[#F59E0B]" /> Acesso Completo ao Editor</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-[#00B1EA]" /> Padrão Ouro RDC 63/2011</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOCUMENT CATEGORIES BREAKDOWN */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" id="procedimentos">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00D3A1]/10 border border-[#00D3A1]/30 text-[#00D3A1] text-xs font-bold mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Compêndio Master 2026</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            O Que Está Incluso na Blindagem Jurídico-Sanitária
          </h2>
          <p className="mt-2 text-sm text-[#94A3B8]">
            Documentos regulatórios e clínicos oficiais categorizados de acordo com as exigências sanitárias.
          </p>
        </div>

        {/* Categories Tab Navigation */}
        <div className="mt-10 flex flex-wrap gap-2 justify-center">
          {STEP_CATEGORIES.map((cat, idx) => {
            const count = documents.filter((d) => getStepCategoryForDocument(d) === cat.name).length;
            const isActive = activeTab === cat.name;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.name)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#00D3A1] text-black font-black shadow-lg shadow-[#00D3A1]/20 scale-105'
                    : 'bg-[#0A1D3A] text-[#94A3B8] hover:text-white border border-[#173660] hover:border-[#1F4C82]'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-black text-[#00D3A1] font-black' : 'bg-[#173660] text-[#CBD5E1]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Documents Grid for Selected Category */}
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents
            .filter((d) => getStepCategoryForDocument(d) === activeTab)
            .map((doc) => (
              <div
                key={doc.id}
                className="bg-[#0A1D3A]/90 border border-[#173660] hover:border-[#00D3A1]/50 rounded-2xl p-5 transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#94A3B8] mb-2">
                    <span className="font-mono bg-[#061224] px-2 py-0.5 rounded border border-[#173660] text-[#00D3A1] font-bold">
                      {doc.category || 'POP'}
                    </span>
                    <span className="text-[10px] text-[#64748B]">{doc.version || 'v1.0'}</span>
                  </div>
                  <h3 className="font-bold text-white text-sm group-hover:text-[#00D3A1] transition leading-snug">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-2 line-clamp-3 leading-relaxed">
                    {doc.shortDescription || doc.adaptationNotes || 'Procedimento Operacional Padrão estruturado conforme as exigências da Vigilância Sanitária.'}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#173660]/60 flex items-center justify-between text-[11px]">
                  <span className="text-[#00D3A1] font-medium flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Conforme ANVISA
                  </span>
                  <button
                    type="button"
                    onClick={handleAccessClick}
                    className="text-xs text-[#38BDF8] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Ver no Editor</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* HOW IT WORKS (3 SIMPLE STEPS) */}
      <section className="py-16 bg-[#081832] border-t border-[#173660]" id="como-funciona">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Como Funciona o Sistema VigiEstética
            </h2>
            <p className="mt-2 text-sm text-[#94A3B8]">
              Em apenas 3 passos simples, sua clínica estará 100% regularizada.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="bg-[#0A1D3A] border border-[#173660] rounded-3xl p-6 relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00D3A1] to-[#00B1EA] text-black font-black text-xl flex items-center justify-center shadow-lg">
                1
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">Acesse o Editor Oficial</h3>
              <p className="mt-2 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Abra o editor completo com acesso imediato e vitalício a todos os {documents.length}+ documentos regulatórios, POPs e prescrições.
              </p>
            </div>

            <div className="bg-[#0A1D3A] border border-[#173660] rounded-3xl p-6 relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00D3A1] to-[#00B1EA] text-black font-black text-xl flex items-center justify-center shadow-lg">
                2
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">Preencha seus Dados em 1 Clique</h3>
              <p className="mt-2 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Informe o nome da sua clínica, CNPJ, Responsável Técnico e Alvará. O sistema substitui automaticamente em todos os documentos.
              </p>
            </div>

            <div className="bg-[#0A1D3A] border border-[#173660] rounded-3xl p-6 relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00D3A1] to-[#00B1EA] text-black font-black text-xl flex items-center justify-center shadow-lg">
                3
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">Imprima e Baixe em Alta Resolução</h3>
              <p className="mt-2 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Imprima e baixe os POPs, Prescrições personalizadas, TCLEs e Manuais formatados em PDF A4 de alta resolução, prontos com a sua logomarca.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL INFORMATIVE CTA SECTION */}
      <section className="py-20 relative bg-gradient-to-b from-[#081832] to-[#061224] border-t border-[#173660]">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#00D3A1]/10 blur-[150px] rounded-full" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00D3A1]/15 border border-[#00D3A1]/40 text-[#00D3A1] text-xs font-black">
            <Flame className="w-4 h-4" /> REGULARIZAÇÃO SANITÁRIA IMEDIATA
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Pronto para Regularizar sua Clínica no Padrão Ouro ANVISA?
          </h2>

          <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            Acesse o Editor Oficial e tenha em mãos todo o compêndio técnico, jurídico e clínico para proteger seu alvará sanitário e garantir a excelência dos seus procedimentos.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={isPaid ? onAccessEditor : scrollToPayment}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00D3A1] via-[#00B1EA] to-[#00D3A1] hover:brightness-110 text-black font-black text-base sm:text-lg uppercase tracking-wide flex items-center justify-center gap-3 shadow-[0_10px_35px_rgba(0,211,161,0.35)] transition transform active:scale-95 cursor-pointer"
            >
              <Lock className="w-5 h-5 text-black stroke-[2.5]" />
              <span>{isPaid ? 'Acessar Software Completo (Liberado)' : 'Garantir Acesso & Ir para o Pagamento'}</span>
              <ArrowRight className="w-5 h-5 text-black" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#94A3B8] pt-2">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#00D3A1]" /> RDC 63/2011 & RDC 222</span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-[#F59E0B]" /> Preenchimento em 1 Clique</span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-[#00B1EA]" /> Exportação A4 Ilimitada</span>
          </div>
        </div>
      </section>

      {/* REAL TESTIMONIALS */}
      <section className="py-16 bg-[#081832] border-t border-[#173660]" id="depoimentos">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              O Que Dizem os Profissionais que Usam a Pasta
            </h2>
            <p className="mt-2 text-sm text-[#94A3B8]">
              Aprovado por Biomédicos, Farmacêuticos e Médicos em todo o Brasil.
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="bg-[#0A1D3A] border border-[#173660] rounded-3xl p-6 space-y-3">
              <div className="flex text-[#F59E0B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F59E0B]" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                "Recebi a visita da Vigilância Sanitária municipal e quando apresentei a pasta organizada com todos os POPs e o PGRSS, o fiscal elogiou na hora. Alvará emitido sem nenhuma notificação!"
              </p>
              <div className="pt-2 border-t border-[#173660]">
                <div className="text-xs font-bold text-white">Dra. Camila Nogueira</div>
                <div className="text-[11px] text-[#00D3A1]">Médica Dermatologista • CRM-SP</div>
              </div>
            </div>

            <div className="bg-[#0A1D3A] border border-[#173660] rounded-3xl p-6 space-y-3">
              <div className="flex text-[#F59E0B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F59E0B]" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                "Os termos de consentimento (TCLE) são super completos, cobrem detalhadamente riscos e intercorrências. Me dá muita segurança jurídica na aplicação de toxina e preenchedores."
              </p>
              <div className="pt-2 border-t border-[#173660]">
                <div className="text-xs font-bold text-white">Dr. Rodrigo Alcantara</div>
                <div className="text-[11px] text-[#00D3A1]">Farmacêutico Esteta • CRF-RJ</div>
              </div>
            </div>

            <div className="bg-[#0A1D3A] border border-[#173660] rounded-3xl p-6 space-y-3">
              <div className="flex text-[#F59E0B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F59E0B]" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                "O preenchimento automático das variáveis salvou mais de 2 semanas de trabalho. Coloquei o CNPJ e o nome da clínica e baixei a pasta inteira pronta em PDF oficial."
              </p>
              <div className="pt-2 border-t border-[#173660]">
                <div className="text-xs font-bold text-white">Larissa Fontes</div>
                <div className="text-[11px] text-[#00D3A1]">Gestora de Clínica de Estética • MG</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 DAYS GUARANTEE SECTION */}
      <section className="py-12 bg-gradient-to-r from-[#082834] via-[#0A1D3A] to-[#082834] border-y border-[#00D3A1]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#00D3A1]/20 border-2 border-[#00D3A1] flex items-center justify-center mx-auto shadow-lg">
            <Award className="w-8 h-8 text-[#00D3A1]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Garantia de Conformidade Sanitária • 7 Dias
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            Acesse o sistema, edite e baixe todos os documentos. Se por qualquer motivo você achar que a pasta não atende plenamente às suas expectativas sanitárias, conte com nossa garantia incondicional de satisfação.
          </p>
        </div>
      </section>

      {/* DEDICATED CHECKOUT & PAYMENT SECTION (INTERFACE 1 -> INTERFACE 2) */}
      <section className="py-20 relative bg-gradient-to-b from-[#061224] via-[#0A1E3C] to-[#061224] border-t-2 border-[#00D3A1]/40" id="pagamento">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-[#00D3A1]/12 blur-[160px] rounded-full" />
        <div className="pointer-events-none absolute -bottom-20 right-10 w-[500px] h-[500px] bg-[#00B1EA]/10 blur-[130px] rounded-full" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border border-amber-500/40 text-amber-300 text-xs font-black tracking-wider uppercase shadow-lg">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Etapa Final • Pagamento Seguro & Liberação Imediata</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Garanta a Blindagem Jurídico-Sanitária & <br />
              <span className="bg-gradient-to-r from-[#00D3A1] via-[#38BDF8] to-[#00D3A1] bg-clip-text text-transparent">
                Desbloqueie o Software Completo
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
              O acesso à <strong className="text-white">Interface do Software</strong> com os {documents.length}+ documentos editáveis, gerador A4 oficial e estúdio de prescrições é liberado automaticamente no momento em que o pagamento for confirmado na Hotmart.
            </p>
          </div>

          {/* Pricing & Checkout Card */}
          <div className="mt-12 bg-gradient-to-b from-[#0C2242] to-[#081832] border-2 border-[#1E4477] hover:border-[#00D3A1]/60 transition duration-300 rounded-3xl p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.7)] relative overflow-hidden">
            {/* Top gold ribbon */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00D3A1] via-[#F59E0B] to-[#EC4899]" />

            <div className="grid md:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Offer Details & Hotmart CTA */}
              <div className="md:col-span-7 space-y-6 text-left">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Licença Vitalícia Oficial • Padrão Ouro ANVISA</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    Plano Completo VigiEstética Master 2026
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8]">
                    Pagamento único e sem mensalidades. Acesso vitalício para sua clínica.
                  </p>
                </div>

                {/* Price Display */}
                <div className="p-5 rounded-2xl bg-[#061224] border border-[#173660] space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-[#64748B] line-through font-bold">De R$ 397,00</span>
                    <span className="text-xs font-extrabold text-[#F59E0B] uppercase tracking-wider bg-[#F59E0B]/10 px-2 py-0.5 rounded border border-[#F59E0B]/30">
                      Oferta Especial de Lançamento
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs sm:text-sm text-[#94A3B8] font-bold">Por apenas</span>
                    <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">R$ 197,00</span>
                    <span className="text-xs sm:text-sm text-[#00D3A1] font-bold">à vista</span>
                  </div>
                  <div className="text-xs text-[#94A3B8]">
                    ou em até <strong className="text-white font-black text-sm">12x no cartão</strong> ou no <strong className="text-[#00D3A1] font-black text-sm">Pix</strong> com liberação instantânea
                  </div>
                </div>

                {/* Main Direct Purchase CTA */}
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#00D3A1] via-[#00B1EA] to-[#00D3A1] hover:brightness-110 text-black font-black text-base sm:text-lg tracking-wide uppercase flex items-center justify-center gap-3 shadow-[0_10px_35px_rgba(0,211,161,0.4)] transition transform active:scale-95 cursor-pointer"
                  >
                    <Zap className="w-5 h-5 fill-black shrink-0" />
                    <span>PAGAR AGORA NA HOTMART • LIBERAÇÃO IMEDIATA</span>
                    <ExternalLink className="w-4 h-4 shrink-0" />
                  </button>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#8DA0BF] pt-1">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-emerald-400" /> Checkout Seguro Hotmart
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-400" /> Liberação Automática no Pix
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-sky-400" /> Garantia de 7 Dias
                    </span>
                  </div>
                </div>

                {/* Already Paid / Enter Code */}
                <div className="pt-3 border-t border-[#173660]/70 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-[#94A3B8]">
                    Já concluiu o pagamento em outro dispositivo?
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsPaywallOpen(true)}
                    className="text-xs text-[#00D3A1] hover:underline font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>Liberar meu Acesso com Código ou E-mail</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Complete Deliverables Checklist */}
              <div className="md:col-span-5 bg-[#061224] border border-[#173660] rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#173660] pb-3">
                  <CheckCircle2 className="w-4 h-4 text-[#00D3A1]" />
                  <span>O que você desbloqueia na Interface 2:</span>
                </div>

                <ul className="space-y-3 text-xs text-[#CBD5E1]">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#00D3A1] stroke-[3] shrink-0 mt-0.5" />
                    <span><strong>168+ Documentos Oficiais:</strong> POPs de Injetáveis, Lasers, Corporal e Facial completos.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#00D3A1] stroke-[3] shrink-0 mt-0.5" />
                    <span><strong>Termos de Consentimento (TCLE):</strong> Blindagem jurídica contra processos e intercorrências.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#00D3A1] stroke-[3] shrink-0 mt-0.5" />
                    <span><strong>PGRSS Oficial (RDC 222):</strong> Plano de resíduos biológicos e perfurocortantes.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#00D3A1] stroke-[3] shrink-0 mt-0.5" />
                    <span><strong>Estúdio de Prescrições:</strong> Criação e emissão de fórmulas estéticas manipuladas e home-care.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#00D3A1] stroke-[3] shrink-0 mt-0.5" />
                    <span><strong>Preenchimento Inteligente em 1 Clique:</strong> Nome da clínica, CNPJ, RT e Alvará automáticos.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#00D3A1] stroke-[3] shrink-0 mt-0.5" />
                    <span><strong>Exportação e Impressão A4:</strong> PDF diagramado no padrão ouro gráfico com sua logomarca.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#00D3A1] stroke-[3] shrink-0 mt-0.5" />
                    <span><strong>Suporte Prioritário & Atualizações:</strong> Inclui normas ANVISA de 2026.</span>
                  </li>
                </ul>

                <div className="pt-2 text-center border-t border-[#173660]/60">
                  <span className="text-[11px] text-[#00D3A1] font-semibold">
                    ⭐ Mais de 1.400 clínicas e profissionais já regularizados
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" id="duvidas">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Perguntas Frequentes (FAQ)
          </h2>
          <p className="mt-2 text-sm text-[#94A3B8]">
            Tire todas as suas dúvidas sobre o funcionamento do software.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {[
            {
              q: 'Como funciona a transição entre a página inicial e a interface do software?',
              a: 'O sistema é dividido em duas interfaces: a Interface Inicial (com a apresentação de todos os 168+ documentos, garantias e a seção de pagamento) e a Interface do Software (com o editor inteligente, personalização de dados da clínica, estúdio de fórmulas e exportação A4). A migração para o software é liberada automaticamente no exato momento em que seu pagamento na Hotmart é aprovado.'
            },
            {
              q: 'Como recebo meu acesso após pagar na Hotmart?',
              a: 'Assim que a Hotmart confirma o pagamento (instantâneo no Pix ou Cartão), ela redireciona você imediatamente para a Interface do Software com acesso liberado. O seu navegador salva a licença e você pode voltar e acessar quantas vezes quiser sem restrições.'
            },
            {
              q: 'Posso criar e personalizar minhas próprias fórmulas e prescrições estéticas?',
              a: 'Com certeza! O sistema conta com um Estúdio Interativo de Prescrições Estéticas exclusivo onde você pode selecionar fórmulas prontas (Pós-Injetáveis, Melasma In & Out, Pós-Lasers, Antiacne, Estímulo de Colágeno) ou criar formulações 100% livres, adicionando novos ativos, concentrações (% ou mg), formas farmacêuticas (sérum, cápsulas, gel) e posologia personalizada.'
            },
            {
              q: 'Os documentos já estão adaptados às exigências sanitárias de 2026?',
              a: 'Sim! Todos os POPs, TCLEs, Manuais e o PGRSS seguem as mais recentes resoluções da ANVISA (RDC 63/2011, RDC 222/2018 para resíduos biológicos e pérfuro-cortantes), normas dos Conselhos Federais (CRBM, CRM, CRF, COREN) e a LGPD.'
            },
            {
              q: 'Como funciona o preenchimento automático?',
              a: 'Na Interface do Software, você cadastra o nome da sua clínica, CNPJ, Responsável Técnico, conselho de classe e alvará uma única vez. Automaticamente, o sistema substitui todas as tags nos mais de 168 documentos.'
            },
            {
              q: 'Em qual formato os documentos são entregues?',
              a: 'Você pode editar o texto livremente no navegador e exportar imediatamente em PDF A4 padrão gráfico com cabeçalho oficial da sua clínica, numeração e diagramação pronta para impressão ou assinatura digital.'
            },
            {
              q: 'Serve para quais profissionais?',
              a: 'Perfeito para Biomédicos Estetas, Farmacêuticos Estetas, Médicos Dermatologistas/Cirurgiões, Enfermeiros Estetas, Dentistas (Harmonização Orofacial), Fisioterapeutas Dermato-Funcionais e Esteticistas.'
            }
          ].map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#0A1D3A] border border-[#173660] rounded-2xl overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-[#00D3A1] transition cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#64748B] transition-transform duration-200 shrink-0 ${
                    openFaq === idx ? 'rotate-180 text-[#00D3A1]' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#94A3B8] leading-relaxed border-t border-[#173660]/50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#040C1A] border-t border-[#173660] py-12 px-4 sm:px-8 text-center text-xs text-[#64748B] space-y-4">
        <div className="flex items-center justify-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#00D3A1] flex items-center justify-center font-black text-black text-xs">
            V
          </div>
          <span className="font-extrabold text-sm text-white">VigiEstética Master 5.0</span>
        </div>
        <p className="max-w-xl mx-auto">
          Sistema de Gestão da Qualidade, Biossegurança e Blindagem Jurídica para Clínicas e Consultórios de Estética Avançada.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-[11px] text-[#94A3B8] items-center">
          <span>Conformidade ANVISA RDC 63/2011</span>
          <span>&bull;</span>
          <span>PGRSS RDC 222/2018</span>
          <span>&bull;</span>
          <span>LGPD Lei 13.709/2018</span>
        </div>
        <p className="text-[10px] text-[#475569]">
          &copy; {new Date().getFullYear()} VigiEstética. Todos os direitos reservados.
        </p>
      </footer>

      {/* A4 Document Full Preview Modal */}
      <A4DocumentPreviewModal
        isOpen={isA4ModalOpen}
        onClose={() => setIsA4ModalOpen(false)}
        onAccessEditor={handleAccessClick}
        clinicData={currentClinicData}
        initialDocType={a4ModalType}
      />

      {/* Paywall Gate Modal for unauthenticated visitors */}
      <PaywallGateModal
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
        onUnlockSuccess={() => {
          onUnlockPaid?.();
          onAccessEditor();
        }}
        checkoutUrl={getCheckoutUrl()}
      />
    </div>
  );
};
