import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Check,
  Zap,
  Clock,
  Copy,
  Sparkles,
  Key,
  Lock,
  ArrowRight,
  Award,
  CheckCircle,
  FileText,
  AlertTriangle,
  Download,
  Users,
  ChevronDown,
  Star,
  Building2,
  Syringe,
  Sparkle,
  CheckCircle2,
  ExternalLink,
  Sliders,
  Flame,
  BadgePercent,
  Activity,
  Layers,
  Thermometer,
  BookOpen,
  Scale,
  Pill
} from 'lucide-react';
import { PlanType, PaymentDetails, ClinicData } from '../types';
import { generateCanvasQRCode } from '../utils/qrCode';
import { DynamicCardsSlideshow } from './DynamicCardsSlideshow';

// Generated imagery
const HERO_IMAGE = '/src/assets/images/hero_pasta_estetica_1786963381414.jpg';
const MOCKUP_IMAGE = '/src/assets/images/mockup_pasta_sanitaria_1786963401411.jpg';

interface SalesLandingPageProps {
  onApproved: (plan: PlanType, clinicData: ClinicData, paymentDetails: PaymentDetails) => void;
  onOpenConfig: () => void;
  onDirectAccess: () => void;
  currentClinicData: ClinicData;
}

export const SalesLandingPage: React.FC<SalesLandingPageProps> = ({
  onApproved,
  onOpenConfig,
  onDirectAccess,
  currentClinicData
}) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('completo');
  const [step, setStep] = useState<'form' | 'loading' | 'qr' | 'approved'>('form');
  const [activeTab, setActiveTab] = useState<'injetaveis' | 'lasers' | 'prescricoes' | 'facial' | 'corporal' | 'biosseguranca' | 'cadernos' | 'manuais' | 'tcle' | 'contratos'>('injetaveis');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [formData, setFormData] = useState<ClinicData>({
    nomeClinica: currentClinicData.nomeClinica || '',
    cnpj: currentClinicData.cnpj || '',
    responsavel: currentClinicData.responsavel || '',
    alvara: currentClinicData.alvara || '',
    nomeCliente: currentClinicData.nomeCliente || '',
    cpfCliente: currentClinicData.cpfCliente || '',
    email: currentClinicData.email || 'contato@suaclinica.com.br',
    whatsapp: currentClinicData.whatsapp || '(11) 99999-9999',
  });

  const [payment, setPayment] = useState<PaymentDetails | null>(null);
  const [countdown, setCountdown] = useState(900); // 15 min
  const [copied, setCopied] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    if (step !== 'qr') return;
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [step]);

  // Polling payment status every 3 seconds
  useEffect(() => {
    if (step !== 'qr' || !payment?.id) return;

    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch(`/api/mercadopago/status/${payment.id}`);
        const data = await res.json();
        if (data.status === 'approved') {
          clearInterval(pollInterval);
          handleApproval();
        }
      } catch {
        // ignore network error
      }
    }, 3000);

    return () => clearInterval(pollInterval);
  }, [step, payment?.id]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleGeneratePix = async () => {
    if (!formData.email || !formData.nomeClinica || !formData.whatsapp) {
      showToast('Por favor, preencha E-mail, Nome da Clínica e WhatsApp.');
      return;
    }

    setStep('loading');

    try {
      const res = await fetch('/api/mercadopago/create-pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          nomeClinica: formData.nomeClinica,
          whatsapp: formData.whatsapp,
          plan: selectedPlan,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        showToast(data.error || 'Erro ao conectar com o Mercado Pago.');
        setStep('form');
        return;
      }

      let qrImg = '';
      if (data.qrCodeBase64) {
        qrImg = `data:image/png;base64,${data.qrCodeBase64}`;
      } else if (data.qrCode) {
        qrImg = generateCanvasQRCode(data.qrCode);
      } else {
        const fallbackPix = `00020101021226870014br.gov.bcb.pix2566qrcode.mercadopago.com/v1/pix/${data.paymentId}520400005303986540${data.amount}.005802BR5925VIGIESTETICA6009SAOPAULO63041234`;
        qrImg = generateCanvasQRCode(fallbackPix);
        data.qrCode = fallbackPix;
      }

      setPayment({
        id: data.paymentId,
        amount: data.amount,
        pixCode: data.qrCode,
        qrCodeBase64: qrImg,
        ticketUrl: data.ticketUrl,
        isDemo: data.isDemo,
      });

      setStep('qr');
      setCountdown(900);
    } catch (err: any) {
      showToast(err.message || 'Erro ao gerar Pix no Mercado Pago.');
      setStep('form');
    }
  };

  const handleApproval = () => {
    setStep('approved');
    setTimeout(() => {
      onApproved(
        selectedPlan,
        formData,
        payment || { id: 'MP-DEMO-' + Date.now(), amount: selectedPlan === 'essencial' ? 97 : 197 }
      );
    }, 1800);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const scrollToCheckout = () => {
    const el = document.getElementById('checkout-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
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
      <header className="sticky top-0 z-40 bg-[#081832]/90 backdrop-blur-md border-b border-[#173660] px-4 sm:px-8 py-3.5 flex items-center justify-between">
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
              Pasta Sanitária & Blindagem Jurídica
            </p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-5 text-[13px] font-semibold text-[#94A3B8]">
          <a href="#amostra-dinamica" className="hover:text-[#00D3A1] transition text-[#00D3A1] flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Amostra POPs & Termos</span>
          </a>
          <a href="#prescricoes-studio" className="hover:text-pink-400 transition text-pink-400 flex items-center gap-1.5 font-bold">
            <Pill className="w-3.5 h-3.5" />
            <span>Prescrições Personalizadas</span>
          </a>
          <a href="#procedimentos" className="hover:text-[#00D3A1] transition">O Que Inclui</a>
          <a href="#beneficios" className="hover:text-[#00D3A1] transition">Benefícios</a>
          <a href="#como-funciona" className="hover:text-[#00D3A1] transition">Como Funciona</a>
          <a href="#depoimentos" className="hover:text-[#00D3A1] transition">Depoimentos</a>
          <a href="#duvidas" className="hover:text-[#00D3A1] transition">FAQ</a>
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onDirectAccess}
            className="h-9 px-3.5 rounded-xl bg-[#0E274D] hover:bg-[#153868] border border-[#1E4477] text-[12px] font-bold text-white transition flex items-center gap-1.5 active:scale-95 cursor-pointer"
            title="Acessar o Editor de Documentos diretamente"
          >
            <Sliders className="w-3.5 h-3.5 text-[#00D3A1]" />
            <span className="hidden sm:inline">Acessar Editor</span>
          </button>

          <button
            type="button"
            onClick={scrollToCheckout}
            className="h-9 px-4 rounded-xl bg-gradient-to-r from-[#00D3A1] to-[#00B1EA] hover:opacity-95 text-black text-[12px] font-black tracking-wide transition flex items-center gap-1.5 shadow-[0_0_20px_rgba(0,211,161,0.3)] active:scale-95 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-black" />
            <span>Adquirir Pasta</span>
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
        {/* Background glow ambiance */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#00D3A1]/10 blur-[140px] rounded-full" />
        <div className="pointer-events-none absolute top-1/2 -right-40 w-[600px] h-[600px] bg-[#00B1EA]/10 blur-[130px] rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top category pill */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E274D]/90 border border-[#00D3A1]/40 text-[#00D3A1] text-xs font-bold shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Procedimentos Operacionais Padrão e Manual para Estética Avançada</span>
            </div>
          </div>

          <div className="mt-6 text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Pasta Sanitária para Estética & <br />
              <span className="bg-gradient-to-r from-[#00D3A1] via-[#38BDF8] to-[#00D3A1] bg-clip-text text-transparent">
                Blindagem Jurídico-Sanitária
              </span>
            </h1>
            <p className="mt-5 text-base sm:text-lg md:text-xl text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
              Mais de <strong className="text-white">168 documentos regulatórios e clínicos completos</strong>: Documentos Base ANVISA, POPs de Injetáveis, Lasers & Tecnologias, Procedimentos Corporais e Faciais, Biossegurança & CME, Cadernos Sanitários Pautados, TCLEs, Contratos, PGRSS e o <strong className="text-pink-400">Novo Estúdio de Prescrições Estéticas</strong> — prontos para personalizar em 1 clique.
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

                  <div className="flex items-start gap-3 bg-[#0A1018]/60 border border-[#1E293B] rounded-2xl p-3.5">
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

                  <div className="flex items-start gap-3 bg-[#0A1018]/60 border border-[#1E293B] rounded-2xl p-3.5">
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

                  <div className="flex items-start gap-3 bg-[#0A1018]/60 border border-[#1E293B] rounded-2xl p-3.5">
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

                {/* Prominent Gold Luxury CTA Button (Matching the Reference Image style elevated) */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={scrollToCheckout}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#F59E0B] via-[#D97706] to-[#B45309] hover:from-[#FBBF24] hover:to-[#D97706] text-black font-black text-base sm:text-lg tracking-wide uppercase flex items-center justify-center gap-3 shadow-[0_10px_35px_rgba(245,158,11,0.4)] border border-[#FDE68A] transition transform active:scale-95 cursor-pointer"
                  >
                    <Building2 className="w-5 h-5 text-black" />
                    <span>Adquira agora e deixe seu Negócio 100% Regularizado</span>
                  </button>
                  <div className="mt-2 flex items-center justify-center gap-4 text-[11px] text-[#94A3B8]">
                    <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-[#00D3A1]" /> Pagamento 100% Seguro</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-[#F59E0B]" /> Acesso Imediato</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Award className="w-3 h-3 text-[#00B1EA]" /> 7 Dias de Garantia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DYNAMIC SLIDESHOW SECTION: POPs & Termos passando na tela em cards dinâmicos */}
          <div className="mt-16 max-w-5xl mx-auto" id="amostra-dinamica">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00D3A1]/10 border border-[#00D3A1]/30 text-[#00D3A1] text-xs font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cards Dinâmicos & Editáveis em Tempo Real</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                POPs & Termos Oficiais Passando na Tela
              </h2>
              <p className="text-sm text-[#94A3B8] max-w-2xl mx-auto mt-2">
                Navegue, clique em <strong>"Editar"</strong> ou <strong>"Visualizar"</strong> nos cards abaixo para testar a personalização imediata com os padrões da ANVISA (RDC 63/2011 e 222/2018).
              </p>
            </div>

            <DynamicCardsSlideshow
              onCtaClick={scrollToCheckout}
              onDirectAccess={onDirectAccess}
              clinicData={currentClinicData}
            />
          </div>
        </div>
      </section>

      {/* ESTÚDIO DE PRESCRIÇÕES ESTÉTICAS PERSONALIZADAS (FEATURE SPOTLIGHT) */}
      <section className="py-20 bg-gradient-to-b from-[#081832] via-[#0D1F3C] to-[#081832] border-y border-pink-500/20 relative overflow-hidden" id="prescricoes-studio">
        {/* Glow ambient effects */}
        <div className="pointer-events-none absolute -top-24 left-1/4 w-[600px] h-[400px] bg-pink-500/10 blur-[130px] rounded-full" />
        <div className="pointer-events-none absolute -bottom-24 right-1/4 w-[500px] h-[400px] bg-blue-600/10 blur-[130px] rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-black mb-3 shadow-lg shadow-pink-500/10">
              <Pill className="w-3.5 h-3.5" />
              <span>NOVO MÓDULO EXCLUSIVO • ESTÚDIO DE PRESCRIÇÕES ESTÉTICAS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Prescrições Estéticas Personalizadas & <br />
              <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-amber-300 bg-clip-text text-transparent">
                Protocolos Home Care In & Out
              </span>
            </h2>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-[#94A3B8] leading-relaxed">
              Entregue receituários padrão ouro com a sua logomarca, fórmulas tópicas reparadoras, nutracêuticos orais bioestimuladores e orientações personalizadas para cada paciente em menos de 1 minuto.
            </p>
          </div>

          {/* Interactive Feature Showcase: Left = Prescription Mockup, Right = 4 High Value Capabilities */}
          <div className="mt-12 grid lg:grid-cols-12 gap-8 items-center">
            {/* Left: Realistic Prescription Mockup Card */}
            <div className="lg:col-span-6 bg-[#0A1D3A] border-2 border-pink-500/30 rounded-3xl p-5 sm:p-7 shadow-[0_20px_60px_-15px_rgba(236,72,153,0.15)] relative">
              <div className="flex items-center justify-between pb-4 border-b border-[#173660]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-pink-400 font-bold block uppercase tracking-wider">
                      Receituário Oficial Personalizável
                    </span>
                    <h3 className="text-base font-extrabold text-white">
                      {currentClinicData.name || 'Clínica de Estética Avançada'}
                    </h3>
                  </div>
                </div>
                <span className="text-[10px] bg-[#0E274D] text-[#94A3B8] px-2.5 py-1 rounded-full font-mono">
                  RX-EST-2026
                </span>
              </div>

              {/* Patient and Prescriber Info Header */}
              <div className="mt-4 bg-[#061224] border border-[#173660] rounded-xl p-3 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-[#64748B] block">PACIENTE:</span>
                  <span className="text-white font-bold">Mariana Alcantara S.</span>
                </div>
                <div>
                  <span className="text-[#64748B] block">PROFISSIONAL PRESCRITOR:</span>
                  <span className="text-pink-300 font-bold">{currentClinicData.responsibleName || 'Dr(a). Responsável Técnico'}</span>
                </div>
              </div>

              {/* Prescription Items (In & Out Showcase) */}
              <div className="mt-4 space-y-3">
                {/* Item 1: Uso Tópico */}
                <div className="bg-[#0E254A] border border-[#1A3F70] rounded-xl p-3.5 relative overflow-hidden">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono">
                      USO TÓPICO • REPARADOR
                    </span>
                    <span className="text-[10px] text-[#94A3B8] font-mono">Qtd: 30g</span>
                  </div>
                  <h4 className="mt-2 text-xs sm:text-sm font-bold text-white">
                    Gel-Creme Reparador & Anti-Equimose Pós-Injetáveis
                  </h4>
                  <div className="mt-1.5 text-[11px] text-[#94A3B8] font-mono leading-relaxed bg-[#061224] p-2 rounded border border-[#173660]">
                    • Vitamina K Óxido 2,0% | Arnica Montana 5,0%<br />
                    • D-Pantenol 3,0% | Alfa-Bisabolol 1,0% | Gel Fosfolipídico qsp 30g
                  </div>
                  <p className="mt-2 text-[11px] text-[#CBD5E1]">
                    <strong className="text-pink-400">Posologia:</strong> Aplicar nas áreas tratadas 3x ao dia com movimentos suaves por 7 a 10 dias.
                  </p>
                </div>

                {/* Item 2: Uso Oral */}
                <div className="bg-[#0E254A] border border-[#1A3F70] rounded-xl p-3.5 relative overflow-hidden">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">
                      USO ORAL • NUTRACÊUTICO IN & OUT
                    </span>
                    <span className="text-[10px] text-[#94A3B8] font-mono">Qtd: 60 Cápsulas</span>
                  </div>
                  <h4 className="mt-2 text-xs sm:text-sm font-bold text-white">
                    Booster Bioestimulador de Colágeno & Antioxidante
                  </h4>
                  <div className="mt-1.5 text-[11px] text-[#94A3B8] font-mono leading-relaxed bg-[#061224] p-2 rounded border border-[#173660]">
                    • Nutricolin 300mg | Verisol 2.5g | Vitamina C 200mg | Zinco Quelato 15mg
                  </div>
                  <p className="mt-2 text-[11px] text-[#CBD5E1]">
                    <strong className="text-purple-400">Posologia:</strong> Ingerir 1 dose pela manhã após o café por 60 a 90 dias.
                  </p>
                </div>
              </div>

              {/* Bottom Stamp & Actions */}
              <div className="mt-4 pt-3 border-t border-[#173660] flex items-center justify-between">
                <div className="text-[10px] text-[#64748B]">
                  ✓ Conforme Resoluções ANVISA, CFF, CRBM, CRM, CFO e COREN
                </div>
                <button
                  type="button"
                  onClick={scrollToCheckout}
                  className="px-3.5 py-1.5 rounded-xl bg-pink-500 hover:bg-pink-400 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-pink-500/20 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Liberar Módulo</span>
                </button>
              </div>
            </div>

            {/* Right: 4 High-Value Feature Cards */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-[#0A1D3A]/90 border border-pink-500/20 rounded-2xl p-4 sm:p-5 hover:border-pink-500/40 transition">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center shrink-0 text-pink-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">
                      Editor & Criador Interativo de Fórmulas Customizadas
                    </h4>
                    <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 leading-relaxed">
                      Adicione novos ativos, defina porcentagens personalizadas (% ou mg), escolha formas farmacêuticas (sérum, gel, cápsulas, loções) e edite a posologia conforme as necessidades específicas de cada paciente.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0A1D3A]/90 border border-purple-500/20 rounded-2xl p-4 sm:p-5 hover:border-purple-500/40 transition">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0 text-purple-400">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">
                      Abordagem Sinergica In & Out (Tópico + Oral)
                    </h4>
                    <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 leading-relaxed">
                      Protocolos integrados combinando dermocosméticos de barreira com nutracêuticos orais para potencializar os resultados clínicos de Toxina Botulínica, Preenchedores, Bioestimuladores e Lasers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0A1D3A]/90 border border-blue-500/20 rounded-2xl p-4 sm:p-5 hover:border-blue-500/40 transition">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shrink-0 text-blue-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">
                      Biblioteca Científica com Fórmulas Prontas de Alta Eficácia
                    </h4>
                    <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 leading-relaxed">
                      Receituários prontos e comprovados para: Pós-Injetáveis (Anti-Equimose), Melasma In & Out, Pós-Peelings Químicos, Pós-Lasers Reparador, Tratamento Antiacne, Rejuvenescimento Facial e Estímulo de Colágeno.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0A1D3A]/90 border border-[#00D3A1]/20 rounded-2xl p-4 sm:p-5 hover:border-[#00D3A1]/40 transition">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#00D3A1]/15 border border-[#00D3A1]/30 flex items-center justify-center shrink-0 text-[#00D3A1]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">
                      Receituário A4 Oficial com Blindagem Profissional
                    </h4>
                    <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 leading-relaxed">
                      Emissão instantânea em PDF e impressão direta contendo a logomarca da sua clínica, identificação do paciente, registro de conselho de classe e orientações de segurança para evitar automedicação.
                    </p>
                  </div>
                </div>
              </div>

              {/* Call to action button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={scrollToCheckout}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-[#00D3A1] hover:brightness-110 text-white font-extrabold text-sm sm:text-base uppercase flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25 transition transform active:scale-95 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Garantir Pasta com Estúdio de Prescrições Incluso</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON SECTION: COM X SEM A PASTA */}
      <section className="py-16 bg-[#081832] border-y border-[#173660]" id="beneficios">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              O Que Acontece Quando a Fiscalização Chega?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#94A3B8]">
              A Vigilância Sanitária não aceita desculpas. Ter a documentação correta é a diferença entre a tranquilidade de atender e o risco de fechar as portas.
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {/* Danger Card: Sem a Pasta */}
            <div className="bg-[#1D0C14] border-2 border-[#EF4444]/40 rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EF4444]/20 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-[#EF4444]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Sem a Pasta Sanitária</h3>
                  <p className="text-xs text-[#FCA5A5]">Vulnerabilidade e Risco Constante</p>
                </div>
              </div>

              <ul className="space-y-3 pt-2 text-xs sm:text-sm text-[#E2E8F0]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#EF4444] font-bold text-base leading-none">✕</span>
                  <span>Risco iminente de multas sanitárias que variam de R$ 2.000 a mais de R$ 50.000.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#EF4444] font-bold text-base leading-none">✕</span>
                  <span>Interdição cautelar e suspensão imediata de procedimentos injetáveis.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#EF4444] font-bold text-base leading-none">✕</span>
                  <span>Processos cíveis e denúncias por falta de TCLE específico e formal.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#EF4444] font-bold text-base leading-none">✕</span>
                  <span>Centenas de horas gastas tentando redigir documentos do zero sem respaldo jurídico.</span>
                </li>
              </ul>
            </div>

            {/* Success Card: Com VigiEstética */}
            <div className="bg-[#082834] border-2 border-[#00D3A1]/50 rounded-3xl p-6 sm:p-8 space-y-4 shadow-[0_10px_40px_rgba(0,211,161,0.15)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00D3A1]/20 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-[#00D3A1]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Com a Pasta VigiEstética</h3>
                  <p className="text-xs text-[#6EE7B7]">Conformidade e Blindagem Total</p>
                </div>
              </div>

              <ul className="space-y-3 pt-2 text-xs sm:text-sm text-[#E2E8F0]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#00D3A1] shrink-0" />
                  <span><strong>100% de Aprovação no Alvará Sanitário</strong> junto à Vigilância Municipal.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#00D3A1] shrink-0" />
                  <span><strong>Blindagem Jurídica Completa:</strong> TCLEs detalhados com cláusulas de riscos e cuidados.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#00D3A1] shrink-0" />
                  <span><strong>Economia de mais de R$ 5.000</strong> em consultorias regulatórias e assessorias.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#00D3A1] shrink-0" />
                  <span><strong>Automação Inteligente:</strong> Preenchimento em 1 clique e exportação instantânea em PDF A4 Oficial.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SHOWCASE OF INCLUDED DOCUMENTS */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="procedimentos">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00D3A1]/10 text-[#00D3A1] text-xs font-bold mb-3 border border-[#00D3A1]/20">
            COMPÊNDIO GERAL COMPLETO • 168+ DOCUMENTOS PROFISSIONAIS
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Toda a Documentação Sanitária & Jurídica que Sua Clínica Precisa
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#94A3B8]">
            Todos os documentos foram redigidos de acordo com as normas mais rigorosas da ANVISA (RDC 63/2011, RDC 222/2018), Código Civil, CDC e LGPD.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-2.5">
          <button
            type="button"
            onClick={() => setActiveTab('injetaveis')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'injetaveis'
                ? 'bg-[#00D3A1] text-black shadow-lg shadow-[#00D3A1]/20'
                : 'bg-[#1E293B] text-[#94A3B8] hover:text-white'
            }`}
          >
            <Syringe className="w-3.5 h-3.5" />
            <span>Harmonização & Injetáveis (17)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('lasers')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'lasers'
                ? 'bg-[#E11D48] text-white shadow-lg shadow-[#E11D48]/20'
                : 'bg-[#1E293B] text-[#94A3B8] hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Lasers & Tecnologias (10)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('prescricoes')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'prescricoes'
                ? 'bg-[#EC4899] text-white shadow-lg shadow-[#EC4899]/20'
                : 'bg-[#1E293B] text-[#94A3B8] hover:text-white'
            }`}
          >
            <Pill className="w-3.5 h-3.5" />
            <span>Prescrições Estéticas (12)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('facial')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'facial'
                ? 'bg-[#38BDF8] text-black shadow-lg shadow-[#38BDF8]/20'
                : 'bg-[#1E293B] text-[#94A3B8] hover:text-white'
            }`}
          >
            <Sparkle className="w-3.5 h-3.5" />
            <span>POPs Faciais (30)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('corporal')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'corporal'
                ? 'bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/20'
                : 'bg-[#1E293B] text-[#94A3B8] hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>POPs Corporais (26)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('biosseguranca')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'biosseguranca'
                ? 'bg-[#10B981] text-black shadow-lg shadow-[#10B981]/20'
                : 'bg-[#1E293B] text-[#94A3B8] hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Biossegurança & Limpeza (10)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cadernos')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'cadernos'
                ? 'bg-[#06B6D4] text-black shadow-lg shadow-[#06B6D4]/20'
                : 'bg-[#1E293B] text-[#94A3B8] hover:text-white'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5" />
            <span>Cadernos Sanitários (11)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('manuais')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'manuais'
                ? 'bg-[#6366F1] text-white shadow-lg shadow-[#6366F1]/20'
                : 'bg-[#1E293B] text-[#94A3B8] hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Manuais & PGRSS (3)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tcle')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'tcle'
                ? 'bg-[#F59E0B] text-black shadow-lg shadow-[#F59E0B]/20'
                : 'bg-[#1E293B] text-[#94A3B8] hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>TCLEs & Anamneses (24+)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('contratos')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'contratos'
                ? 'bg-[#EC4899] text-white shadow-lg shadow-[#EC4899]/20'
                : 'bg-[#1E293B] text-[#94A3B8] hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Contratos & Finanças (10)</span>
          </button>
        </div>

        {/* Tab Content Cards */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeTab === 'injetaveis' && (
            <>
              {[
                { title: 'Toxina Botulínica Tipo A (Armazenamento, Diluição e Injeção)', desc: 'Cadeia de frio 2°C a 8°C, reconstituição estéril sem espuma, pontos de aplicação e pós-procedimento.' },
                { title: 'Preenchimento Facial com Ácido Hialurônico e Segurança Vascular', desc: 'Técnicas de cânula/agulha, planos anatômicos, aspiração prévia e protocolo de resgate vascular.' },
                { title: 'Bioestimuladores de Colágeno Faciais e Corporais (PLLA / CaHA / PCL)', desc: 'Hidratação e suspensão estéril, vetores de tração, bioestimulação dérmica e massagem 5x5x5.' },
                { title: 'Fios Absorvíveis de Polidioxanona PDO (Lisos, Parafuso e Espiculados)', desc: 'Assepsia cirúrgica, técnicas de ancoragem, pós-procedimento e suporte de tecidos.' },
                { title: 'Biorremodeladores Teciduais e Polinucleotídeos (PDRN)', desc: 'Técnica BAP de 5 pontos de injeção bioestéticos faciais para regeneração celular dérmica.' },
                { title: 'Manejo de Intercorrências com Hialuronidase em Alta Dose', desc: 'Protocolo de alta dose, diluição estéril, teste prévio de alergia e infiltração vascular de emergência.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-[#111827] border border-[#1E293B] hover:border-[#00D3A1]/50 rounded-2xl p-5 transition group">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#00D3A1] bg-[#00D3A1]/10 px-2.5 py-0.5 rounded-md">
                      POP INJETÁVEL
                    </span>
                    <span className="text-[10px] text-[#64748B] font-mono">ANVISA RDC 63</span>
                  </div>
                  <h4 className="mt-3 text-base font-bold text-white group-hover:text-[#00D3A1] transition">{item.title}</h4>
                  <p className="mt-2 text-xs text-[#94A3B8] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </>
          )}

          {activeTab === 'lasers' && (
            <>
              {[
                { title: 'Laser Lavieen 1927nm Thulium (BB Laser)', desc: 'Protocolos de energia (mJ), fluência, modos fracionados e não ablativos, proteção ocular e cuidados pós-laser.' },
                { title: 'Luz Intensa Pulsada (LIP / IPL)', desc: 'Filtros de corte (515nm a 640nm) para manchas, rosácea e fotorrejuvenescimento, com acoplamento em gel condutor.' },
                { title: 'Laser de Diodo e Alexandrite (Depilação Definitiva)', desc: 'Fototipos I a VI de Fitzpatrick, comprimento de onda, resfriamento criogênico de ponteira e contraindicações.' },
                { title: 'Ultrassom Micro/Macrofocado (HIFU / Ultraformer)', desc: 'Profundidades dos transdutores (1.5mm, 3.0mm, 4.5mm), vetorização do SMAS e pontos de coagulação térmica.' },
                { title: 'Endolaser 1470nm (Endolifting Subdérmico)', desc: 'Microfibra óptica radial/nua, plano subdérmico, retração cutânea e lipólise com controle térmico.' },
                { title: 'Laser CO2 Fracionado 10.600nm', desc: 'Rejuvenescimento ablativo profundo, parâmetros de densidade, stacking e prevenção de hiperpigmentação pós-inflamatória.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-[#111827] border border-[#1E293B] hover:border-[#E11D48]/50 rounded-2xl p-5 transition group">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#E11D48] bg-[#E11D48]/10 px-2.5 py-0.5 rounded-md">
                      POP TECNOLOGIA
                    </span>
                    <span className="text-[10px] text-[#64748B] font-mono">ANVISA</span>
                  </div>
                  <h4 className="mt-3 text-base font-bold text-white group-hover:text-[#E11D48] transition">{item.title}</h4>
                  <p className="mt-2 text-xs text-[#94A3B8] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </>
          )}

          {activeTab === 'prescricoes' && (
            <>
              {[
                { title: 'Estúdio de Prescrições Personalizadas (Criador Interativo de Fórmulas)', desc: 'Adicione novos ativos, defina porcentagens (% e mg), escolha vias farmacêuticas (sérum, cápsulas, gel) e monte receituários sob medida.' },
                { title: 'Prescrição Home Care Pós-Injetáveis (Toxina, Preenchedores e Bioestimuladores)', desc: 'Gel anti-equimose com Vitamina K Óxido 2% e Arnica 5%, creme reparador de barreira com Pantenol e fotoproteção física.' },
                { title: 'Prescrição e Protocolo Clareador para Melasma (In & Out)', desc: 'Fórmula tópica multialvo com Ácido Tranexâmico 3%, Alfa-Arbutin e Niacinamida + nutracêutico oral com Polypodium e Pycnogenol.' },
                { title: 'Prescrição Reparadora e Calmante Pós-Lasers (Lavieen, CO2) e Peelings', desc: 'Bálsamo regenerador intensivo, água termal fisiológica calmante, fotoproteção mineral estrita e restrição a esfoliantes.' },
                { title: 'Prescrição de Nutracêuticos Orais para Estímulo de Colágeno (In & Out)', desc: 'Silício orgânico biodisponível (Nutricolin), peptídeos bioativos de colágeno Verisol, vitamina C e zinco quelato.' },
                { title: 'Prescrição e Rotina Home Care Antiacne e Controle de Oleosidade', desc: 'Sabonete com ácido salicílico e melaleuca, sérum com zinco PCA e niacinamida, renovador noturno e protetor mate.' },
                { title: 'Prescrição Pós-Fios de Sustentação PDO & Neocolagênese', desc: 'Fórmula anti-inflamatória oral com Cúrcuma e Boswellia + gel tópico regenerador para sustentação tecidual.' },
                { title: 'Receituário Estético Personalizado Oficial com Timbre e Assinatura', desc: 'Modelo A4 oficial com dados completos da clínica, campos de prescrição livre para uso tópico/oral e visto do RT.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-[#111827] border border-[#1E293B] hover:border-[#EC4899]/50 rounded-2xl p-5 transition group">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#EC4899] bg-[#EC4899]/10 px-2.5 py-0.5 rounded-md">
                      PRESCRIÇÃO ESTÉTICA
                    </span>
                    <span className="text-[10px] text-[#64748B] font-mono">HOME CARE</span>
                  </div>
                  <h4 className="mt-3 text-base font-bold text-white group-hover:text-[#EC4899] transition">{item.title}</h4>
                  <p className="mt-2 text-xs text-[#94A3B8] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </>
          )}

          {activeTab === 'facial' && (
            <>
              {[
                { title: 'Limpeza de Pele Profunda e Extração', desc: 'Assepsia, emoliência com trietanolamina/vapor de ozônio, extração manual asséptica e alta frequência.' },
                { title: 'Microagulhamento (Drug Delivery)', desc: 'Profundidade da agulha, técnica de rolamento/caneta estéril com cosmecêuticos estéreis e descarte Grupo E.' },
                { title: 'Peelings Químicos (Glicólico, Salicílico, Retinoico)', desc: 'Classificação de Fitzpatrick, tempo de contato dos ácidos e neutralização química imediata.' },
                { title: 'Dermaplaning com Lâmina Estéril nº 10', desc: 'Remoção mecânica de queratina e pelos velus em ângulo de 45° e descarte no Descarpack.' },
                { title: 'Ultrassom Microfocado (HIFU)', desc: 'Profundidade dos disparos (1.5mm, 3.0mm, 4.5mm), proteção ocular e mapeamento facial anatômico.' },
                { title: 'Radiofrequência Facial & Neocolagênese', desc: 'Termometria em tempo real (40°C a 42°C), gel condutor neutro e estímulo de colágeno.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-[#111827] border border-[#1E293B] hover:border-[#38BDF8]/50 rounded-2xl p-5 transition group">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#38BDF8] bg-[#38BDF8]/10 px-2.5 py-0.5 rounded-md">
                      POP FACIAL
                    </span>
                    <span className="text-[10px] text-[#64748B] font-mono">ANVISA</span>
                  </div>
                  <h4 className="mt-3 text-base font-bold text-white group-hover:text-[#38BDF8] transition">{item.title}</h4>
                  <p className="mt-2 text-xs text-[#94A3B8] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </>
          )}

          {activeTab === 'corporal' && (
            <>
              {[
                { title: 'Criolipólise e Redução de Adiposidade', desc: 'Uso obrigatório de membrana anticongelante individual com ANVISA, parâmetros (-5°C a -11°C) e massagem.' },
                { title: 'Drenagem Linfática Manual (Vodder / Leduc)', desc: 'Manobras suaves, ritmo lento, evacuação de linfonodos e indicações pós-cirúrgicas.' },
                { title: 'Carboxiterapia Corporal com CO2 Medicinal', desc: 'Infusão de gás carbônico estéril, controle de fluxo e equipo descartável individual.' },
                { title: 'Radiofrequência Corporal para Flacidez', desc: 'Aquecimento volumétrico controlado (38°C a 42°C) com termômetro digital infravermelho.' },
                { title: 'Ultracavitação e Lipocavitação Corporal', desc: 'Cavitação estável para adiposidades localizadas com acoplamento em gel condutor neutro.' },
                { title: 'Endermologia e Vacuoterapia Corporal', desc: 'Sucção contínua e pulsada para desfibrosamento tecidual e remodelagem corporal.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-[#111827] border border-[#1E293B] hover:border-[#8B5CF6]/50 rounded-2xl p-5 transition group">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#8B5CF6] bg-[#8B5CF6]/10 px-2.5 py-0.5 rounded-md">
                      POP CORPORAL
                    </span>
                    <span className="text-[10px] text-[#64748B] font-mono">ANVISA</span>
                  </div>
                  <h4 className="mt-3 text-base font-bold text-white group-hover:text-[#8B5CF6] transition">{item.title}</h4>
                  <p className="mt-2 text-xs text-[#94A3B8] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </>
          )}

          {activeTab === 'biosseguranca' && (
            <>
              {[
                { title: 'Esterilização em Autoclave a Vapor (CME)', desc: 'Lavagem com detergente enzimático, selagem em papel grau cirúrgico e teste biológico semanal.' },
                { title: 'Acidentes com Perfurocortantes & Conduta PEP', desc: 'Fluxo imediato de atendimento, lavagem da lesão, notificação CAT e profilaxia pós-exposição.' },
                { title: 'Higienização das Mãos (5 Momentos da OMS)', desc: 'Fricção antisséptica com álcool 70%, uso correto de luvas de procedimento e proibição de adornos (NR-32).' },
                { title: 'Higienização de Macas, Mochos e Superfícies', desc: 'Desinfecção concorrente com álcool 70% ou quaternário de amônio entre cada atendimento.' },
                { title: 'Controle de Pragas e Desinsetização Semestral', desc: 'Contrato com empresa licenciada, certificado de execução e mapa de iscas ecológicas.' },
                { title: 'Limpeza e Sanitização do Ar Condicionado (PMOC)', desc: 'Lavagem mensal de filtros de ar, higienização de bandejas e conformidade com a Lei 13.589/2018.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-[#111827] border border-[#1E293B] hover:border-[#10B981]/50 rounded-2xl p-5 transition group">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#10B981] bg-[#10B981]/10 px-2.5 py-0.5 rounded-md">
                      BIOSSEGURANÇA
                    </span>
                    <span className="text-[10px] text-[#64748B] font-mono">RDC 15/2012</span>
                  </div>
                  <h4 className="mt-3 text-base font-bold text-white group-hover:text-[#10B981] transition">{item.title}</h4>
                  <p className="mt-2 text-xs text-[#94A3B8] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </>
          )}

          {activeTab === 'cadernos' && (
            <>
              {[
                { title: 'Caderno de Controle Biológico da Autoclave', desc: 'Tabela diária de ciclos, temperatura, pressão, lote de instrumentais e teste biológico semanal (RDC 15/2012).' },
                { title: 'Caderno de Temperatura de Geladeira (+2°C a +8°C)', desc: 'Monitoramento bidiário (08h e 17h30) com termômetro calibrado para toxinas botulínicas e enzimas.' },
                { title: 'Caderno de Controle e Manutenção do Ar (PMOC)', desc: 'Registro de limpeza mensal de filtros e desinfecção química de serpentinas (Lei 13.589/2018).' },
                { title: 'Caderno de Limpeza da Caixa d\'Água Semestral', desc: 'Registro semestral de desinfecção do reservatório de água potável e laudo de potabilidade.' },
                { title: 'Caderno de Controle de Validade e Lote (PEPS)', desc: 'Rastreabilidade de cosméticos, injetáveis e medicamentos pela regra do Primeiro que Expira, Primeiro que Sai.' },
                { title: 'Caderno de Registro de Acidentes e Notificações', desc: 'Registro formal interno de eventuais acidentes com materiais perfurocortantes e medidas adotadas.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-[#111827] border border-[#1E293B] hover:border-[#06B6D4]/50 rounded-2xl p-5 transition group">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#06B6D4] bg-[#06B6D4]/10 px-2.5 py-0.5 rounded-md">
                      CADERNO ANVISA
                    </span>
                    <span className="text-[10px] text-[#64748B] font-mono">OBRIGATÓRIO</span>
                  </div>
                  <h4 className="mt-3 text-base font-bold text-white group-hover:text-[#06B6D4] transition">{item.title}</h4>
                  <p className="mt-2 text-xs text-[#94A3B8] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </>
          )}

          {activeTab === 'manuais' && (
            <>
              {[
                { title: 'Manual de Boas Práticas de Funcionamento', desc: 'Manual completo exigido pela RDC 63/2011 descrevendo estrutura física, fluxo limpo/sujo e responsabilidade técnica.' },
                { title: 'Plano de Gerenciamento de Resíduos (PGRSS)', desc: 'Classificação de resíduos Grupo A (biológicos), Grupo E (perfurocortantes) e contrato de incineração (RDC 222/2018).' },
                { title: 'Manual de Organização de Prontuários (20 Anos)', desc: 'Diretrizes para arquivamento seguro e confidencial de prontuários por no mínimo 20 anos conforme LGPD.' },
                { title: 'Manual de Atendimento de Urgência e Emergência', desc: 'Fluxo rápido para acionamento do SAMU 192 e conduta de suporte vital para anafilaxia e desmaios.' },
                { title: 'Manual de Biossegurança e Uso de EPIs', desc: 'Instruções completas sobre uso de máscaras N95/PFF2, óculos de proteção, jaleco e luvas cirúrgicas.' },
                { title: 'Manual de Descrição de Cargos e Funções', desc: 'Atribuições do Responsável Técnico, biomédicos, farmacêuticos, esteticistas e recepcionistas.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-[#111827] border border-[#1E293B] hover:border-[#6366F1]/50 rounded-2xl p-5 transition group">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#6366F1] bg-[#6366F1]/10 px-2.5 py-0.5 rounded-md">
                      MANUAL MESTRE
                    </span>
                    <span className="text-[10px] text-[#64748B] font-mono">RDC 63/2011</span>
                  </div>
                  <h4 className="mt-3 text-base font-bold text-white group-hover:text-[#6366F1] transition">{item.title}</h4>
                  <p className="mt-2 text-xs text-[#94A3B8] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </>
          )}

          {activeTab === 'tcle' && (
            <>
              {[
                { title: 'TCLE para Toxina Botulínica Tipo A', desc: 'Especificação de assimetrias transitórias, ptose palpebral, retoques e orientações de repouso.' },
                { title: 'TCLE para Ácido Hialurônico e Preenchimento', desc: 'Cláusulas expressas de edemas, equimoses, riscos vasculares raros e autorização de hialuronidase.' },
                { title: 'TCLE para Bioestimuladores de Colágeno (PLLA)', desc: 'Esclarecimento de resposta biológica individual de colágeno, nódulos temporários e massagem 5x5x5.' },
                { title: 'TCLE para Fios de Sustentação & Tração PDO', desc: 'Orientações pós-procedimento, limitação de mímica facial nas 72h e resposta cicatricial.' },
                { title: 'Ficha de Anamnese Facial com Fitzpatrick e Glogau', desc: 'Histórico de saúde, alergias, antecedentes patológicos e consentimento informado.' },
                { title: 'Termo de Autorização de Uso de Imagem (LGPD)', desc: 'Autorização específica para fotos antes/depois com finalidade científica e redes sociais.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-[#111827] border border-[#1E293B] hover:border-[#F59E0B]/50 rounded-2xl p-5 transition group">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#F59E0B] bg-[#F59E0B]/10 px-2.5 py-0.5 rounded-md">
                      BLINDAGEM JURÍDICA
                    </span>
                    <span className="text-[10px] text-[#64748B] font-mono">CDC & LGPD</span>
                  </div>
                  <h4 className="mt-3 text-base font-bold text-white group-hover:text-[#F59E0B] transition">{item.title}</h4>
                  <p className="mt-2 text-xs text-[#94A3B8] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </>
          )}

          {activeTab === 'contratos' && (
            <>
              {[
                { title: 'Contrato de Prestação de Serviços Estéticos', desc: 'Cláusula expressa de Obrigação de Meio, tolerância biológica individual, política de cancelamento 24h e CDC.' },
                { title: 'Contrato de Locação e Sublocação de Cabine', desc: 'Locação por turno ou mensal com estrita exigência de CRT e cumprimento das normas da ANVISA.' },
                { title: 'Termo de Reembolso e Quitação Mútua', desc: 'Quitação plena e irrevogável com cláusula de não difamação (non-disparagement) e renúncia de ações.' },
                { title: 'Recibo Profissional para Declaração de IRPF', desc: 'Recibo discriminado com dados do profissional, número do conselho e detalhes do procedimento.' },
                { title: 'Notificação Extrajudicial de Descumprimento de Cuidados', desc: 'Documento probatório de abandono de tratamento pelo paciente para fins de isenção de responsabilidade.' },
                { title: 'Planilha Modelo de Fluxo de Caixa Diário', desc: 'Controle diário de entradas, despesas operacionais e conciliação bancária da clínica.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-[#111827] border border-[#1E293B] hover:border-[#EC4899]/50 rounded-2xl p-5 transition group">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#EC4899] bg-[#EC4899]/10 px-2.5 py-0.5 rounded-md">
                      CONTRATOS & FINANÇAS
                    </span>
                    <span className="text-[10px] text-[#64748B] font-mono">JURÍDICO</span>
                  </div>
                  <h4 className="mt-3 text-base font-bold text-white group-hover:text-[#EC4899] transition">{item.title}</h4>
                  <p className="mt-2 text-xs text-[#94A3B8] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </section>


      {/* HOW IT WORKS (3 SIMPLE STEPS) */}
      <section className="py-16 bg-[#081832] border-y border-[#173660]" id="como-funciona">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Sua Clínica Regularizada em 3 Passos Simples
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#94A3B8]">
              Sem complicações, sem formulários chatos e sem precisar contratar consultorias caríssimas.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-[#0A1D3A] border border-[#173660] rounded-3xl p-6 relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00D3A1] to-[#00B1EA] text-black font-black text-xl flex items-center justify-center shadow-lg">
                1
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">Escolha seu Plano e Pague com Pix</h3>
              <p className="mt-2 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Pagamento processado em segundos com o checkout oficial do Mercado Pago e liberação instantânea no seu navegador.
              </p>
            </div>

            <div className="bg-[#0A1D3A] border border-[#173660] rounded-3xl p-6 relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00D3A1] to-[#00B1EA] text-black font-black text-xl flex items-center justify-center shadow-lg">
                2
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">Preencha seus Dados em 1 Clique</h3>
              <p className="mt-2 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Informe o nome da sua clínica, CNPJ, Responsável Técnico e Alvará. O sistema substitui automaticamente em todos os 168+ documentos.
              </p>
            </div>

            <div className="bg-[#0A1D3A] border border-[#173660] rounded-3xl p-6 relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00D3A1] to-[#00B1EA] text-black font-black text-xl flex items-center justify-center shadow-lg">
                3
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">Imprima e Baixe em Alta Resolução</h3>
              <p className="mt-2 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Imprima e baixe os POPs, Prescrições personalizadas, TCLEs e Manuais formatados em PDF A4 de alta resolução, prontos com a sua logomarca e dados do Responsável Técnico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING & CHECKOUT SECTION (MERCADO PAGO INTEGRATED) */}
      <section className="py-20 relative" id="checkout-section">
        {/* Glow behind checkout */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#00D3A1]/10 blur-[150px] rounded-full" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/40 text-[#F59E0B] text-xs font-black mb-3">
              <Flame className="w-4 h-4" /> OFERTA ESPECIAL DE LANÇAMENTO
            </div>
            <h2 className="text-3xl sm:5xl font-black text-white tracking-tight">
              Escolha seu Plano e Deixe seu Estabelecimento 100% Regularizado
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#94A3B8]">
              Acesso imediato e vitalício ao editor com preenchimento automático e exportação ilimitada.
            </p>
          </div>

          <div className="mt-12 grid lg:grid-cols-12 gap-8 items-start">
            {/* Left: Plans Comparison */}
            <div className="lg:col-span-6 space-y-4">
              {/* Plano Blindado Master (Recomendado) */}
              <div
                onClick={() => setSelectedPlan('completo')}
                className={`cursor-pointer rounded-3xl p-6 sm:p-7 border-2 transition relative overflow-hidden ${
                  selectedPlan === 'completo'
                    ? 'border-[#00D3A1] bg-[#082834] shadow-[0_0_35px_rgba(0,211,161,0.25)]'
                    : 'border-[#173660] bg-[#0A1D3A]/80 hover:border-[#1F4C82]'
                }`}
              >
                <div className="absolute top-0 right-0 bg-gradient-to-r from-[#00D3A1] to-[#00B1EA] text-black font-black text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  MAIS ESCOLHIDO • COMPÊNDIO MASTER
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-extrabold text-white">Plano Blindado Master</h3>
                    <p className="text-xs text-[#6EE7B7] mt-0.5 font-medium">Pasta Sanitária Completa + Blindagem Jurídica</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[#64748B] line-through">De R$ 497,00</div>
                    <div className="text-3xl font-black text-white">R$ 197</div>
                    <div className="text-[10px] text-[#00D3A1] font-bold">Pagamento único / Pix</div>
                  </div>
                </div>

                <div className="mt-5 space-y-2 border-t border-[#173660] pt-4 text-xs sm:text-sm text-[#E2E8F0]">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00D3A1] shrink-0" />
                    <span><strong>Mais de 168 Documentos Oficiais</strong> (POPs, TCLEs, Manuais, PGRSS, Contratos)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-pink-400 shrink-0" />
                    <span><strong className="text-pink-300">Estúdio de Prescrições Personalizadas</strong> (Fórmulas Tópicas, Nutracêuticos e Home Care In & Out)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00D3A1] shrink-0" />
                    <span><strong>Preenchimento Automático em 1 Clique</strong> com os dados da sua clínica</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00D3A1] shrink-0" />
                    <span><strong>Editor A4 com Diagramação Realista</strong> e paginação inteligente</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00D3A1] shrink-0" />
                    <span><strong>Exportação Ilimitada</strong> em PDF A4 Oficial de alta resolução</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00D3A1] shrink-0" />
                    <span><strong>Acesso Vitalício</strong> com atualizações normativas sem custo adicional</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00D3A1] shrink-0" />
                    <span><strong>Suporte Prioritário</strong> por WhatsApp para dúvidas de preenchimento</span>
                  </div>
                </div>
              </div>

              {/* Plano Essencial */}
              <div
                onClick={() => setSelectedPlan('essencial')}
                className={`cursor-pointer rounded-3xl p-5 sm:p-6 border-2 transition ${
                  selectedPlan === 'essencial'
                    ? 'border-[#00D3A1] bg-[#082834] shadow-[0_0_35px_rgba(0,211,161,0.2)]'
                    : 'border-[#173660] bg-[#0A1D3A]/80 hover:border-[#1F4C82]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">Plano Essencial</h3>
                    <p className="text-xs text-[#94A3B8]">POPs Básicos de Higiene e Anamneses</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[#64748B] line-through">De R$ 197,00</div>
                    <div className="text-2xl font-black text-white">R$ 97</div>
                    <div className="text-[10px] text-[#94A3B8]">Pagamento único</div>
                  </div>
                </div>

                <div className="mt-4 space-y-1.5 border-t border-[#173660] pt-3 text-xs text-[#94A3B8]">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00D3A1]" />
                    <span>6 POPs Básicos de Higiene e Biossegurança</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00D3A1]" />
                    <span>Fichas de Anamnese Facial e Corporal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00D3A1]" />
                    <span>Editor Básico com Exportação PDF</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Instant Checkout Box */}
            <div className="lg:col-span-6 bg-[#0A1D3A] border-2 border-[#173660] rounded-3xl p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-[#173660] pb-4">
                <div>
                  <h3 className="text-xl font-black text-white">Finalizar Aquisição da Pasta</h3>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    {selectedPlan === 'completo' ? 'Plano Blindado Master (R$ 197)' : 'Plano Essencial (R$ 97)'}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 bg-[#00D3A1]/10 px-3 py-1 rounded-full border border-[#00D3A1]/30 text-[#00D3A1] text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Mercado Pago Pix</span>
                </div>
              </div>

              {step === 'form' && (
                <div className="mt-5 space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1">
                      Nome da sua Clínica ou Consultório *
                    </label>
                    <input
                      type="text"
                      value={formData.nomeClinica}
                      onChange={(e) => setFormData({ ...formData, nomeClinica: e.target.value })}
                      placeholder="Ex: Dra. Juliana Santos Estética Avançada"
                      className="w-full h-11 px-4 rounded-xl bg-[#061224] border border-[#173660] text-white focus:border-[#00D3A1] outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1">
                      Seu E-mail Profissional *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="contato@suaclinica.com.br"
                      className="w-full h-11 px-4 rounded-xl bg-[#061224] border border-[#173660] text-white focus:border-[#00D3A1] outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1">
                      WhatsApp para Notificação e Acesso *
                    </label>
                    <input
                      type="text"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="(11) 99999-9999"
                      className="w-full h-11 px-4 rounded-xl bg-[#061224] border border-[#173660] text-white focus:border-[#00D3A1] outline-none text-sm"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleGeneratePix}
                    className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#00D3A1] via-[#00B1EA] to-[#00D3A1] hover:opacity-95 text-black font-black text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(0,211,161,0.3)] transition transform active:scale-95 cursor-pointer mt-2"
                  >
                    <Zap className="w-5 h-5 fill-black" />
                    <span>Gerar Pix Oficial • R$ {selectedPlan === 'completo' ? '197,00' : '97,00'}</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-center text-[11px] text-[#64748B] pt-1">
                    <Lock className="w-3.5 h-3.5 text-[#00D3A1]" />
                    <span>Ambiente Criptografado &bull; Liberação Imediata no Editor após pagamento</span>
                  </div>
                </div>
              )}

              {step === 'loading' && (
                <div className="py-14 flex flex-col items-center justify-center gap-4 text-center">
                  <div className="w-12 h-12 rounded-full border-3 border-[#173660] border-t-[#00D3A1] animate-spin" />
                  <div>
                    <div className="font-bold text-white text-base">Conectando ao Mercado Pago...</div>
                    <div className="text-xs text-[#94A3B8] mt-1">Gerando QR Code Pix em tempo real</div>
                  </div>
                </div>
              )}

              {step === 'qr' && payment && (
                <div className="mt-5 space-y-4">
                  <div className="bg-[#061224] border border-[#173660] rounded-2xl p-5 flex flex-col items-center text-center">
                    <div className="flex items-center gap-1.5 text-xs text-[#00D3A1] font-bold uppercase tracking-wider mb-3">
                      <Clock className="w-4 h-4" />
                      <span>Expira em {formatTime(countdown)} • Aguardando Pix</span>
                    </div>

                    <div className="bg-white p-3 rounded-2xl shadow-xl">
                      <img
                        src={payment.qrCodeBase64}
                        alt="QR Code Pix"
                        className="w-[200px] h-[200px]"
                      />
                    </div>

                    <div className="mt-3 text-xs text-[#94A3B8] font-mono">
                      Valor: <strong className="text-white font-bold">R$ {payment.amount},00</strong> &bull; ID: {payment.id}
                    </div>

                    <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00D3A1]/10 text-[#00D3A1] text-[11px] font-bold">
                      <span className="w-2 h-2 rounded-full bg-[#00D3A1] animate-pulse" />
                      Verificando pagamento automaticamente a cada 3s
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1">
                      Código Pix Copia e Cola
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={payment.pixCode || ''}
                        className="flex-1 h-11 px-3 rounded-xl bg-[#061224] border border-[#173660] text-xs text-[#94A3B8] font-mono truncate"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (payment.pixCode) {
                            navigator.clipboard.writeText(payment.pixCode);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }
                        }}
                        className="h-11 px-4 rounded-xl bg-[#173660] hover:bg-[#1F4C82] text-white text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer"
                      >
                        {copied ? <Check className="w-4 h-4 text-[#00D3A1]" /> : <Copy className="w-4 h-4" />}
                        <span>{copied ? 'Copiado!' : 'Copiar Pix'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Test / Sim Approval Button */}
                  <button
                    type="button"
                    onClick={handleApproval}
                    className="w-full h-12 rounded-xl bg-white hover:bg-zinc-100 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#00D3A1]" />
                    <span>Liberar Acesso Imediato ao Editor (Simular Pagamento)</span>
                  </button>
                </div>
              )}

              {step === 'approved' && (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#00D3A1] flex items-center justify-center shadow-[0_0_40px_rgba(0,211,161,0.6)]">
                    <CheckCircle className="w-10 h-10 text-black stroke-[2.5]" />
                  </div>
                  <h4 className="mt-4 text-2xl font-black text-white">
                    Pagamento Aprovado com Sucesso!
                  </h4>
                  <p className="text-sm text-[#94A3B8] mt-1">
                    Redirecionando você para o Editor de Documentos com todos os POPs liberados...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* REAL TESTIMONIALS & TRUST SIGNALS */}
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
            Garantia Incondicional de 7 Dias
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            Acesse o sistema, edite e baixe todos os documentos. Se por qualquer motivo você achar que a pasta não atende plenamente às suas expectativas sanitárias, basta solicitar o reembolso que devolvemos 100% do seu investimento. Risco zero para você.
          </p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" id="duvidas">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Perguntas Frequentes (FAQ)
          </h2>
          <p className="mt-2 text-sm text-[#94A3B8]">
            Tire todas as suas dúvidas antes de garantir o acesso.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {[
            {
              q: 'Posso criar e personalizar minhas próprias fórmulas e prescrições estéticas?',
              a: 'Com certeza! O sistema conta com um Estúdio Interativo de Prescrições Estéticas exclusivo onde você pode selecionar fórmulas prontas (Pós-Injetáveis, Melasma In & Out, Pós-Lasers, Antiacne, Estímulo de Colágeno) ou criar formulações 100% livres, adicionando novos ativos, concentrações (% ou mg), formas farmacêuticas (sérum, cápsulas, gel) e posologia personalizada. As receitas saem formatadas com o logo da sua clínica e dados do Responsável Técnico.'
            },
            {
              q: 'Os documentos já estão adaptados às exigências sanitárias de 2026?',
              a: 'Sim! Todos os POPs, TCLEs, Manuais e o PGRSS seguem as mais recentes resoluções da ANVISA (RDC 63/2011, RDC 222/2018 para resíduos biológicos e pérfuro-cortantes), normas dos Conselhos Federais (CRBM, CRM, CRF, COREN) e a LGPD.'
            },
            {
              q: 'Como funciona o preenchimento automático?',
              a: 'No editor inteligente, você cadastra o nome da sua clínica, CNPJ, Responsável Técnico, conselho de classe e alvará uma única vez. Automaticamente, o sistema substitui todas as tags nos mais de 168 documentos.'
            },
            {
              q: 'Em qual formato os documentos são entregues?',
              a: 'Você pode editar o texto livremente no navegador e exportar imediatamente em PDF A4 padrão gráfico com cabeçalho oficial da sua clínica, numeração e diagramação pronta para impressão ou assinatura digital.'
            },
            {
              q: 'Serve para quais profissionais?',
              a: 'Perfeito para Biomédicos Estetas, Farmacêuticos Estetas, Médicos Dermatologistas/Cirurgiões, Enfermeiros Estetas, Dentistas (Harmonização Orofacial), Fisioterapeutas Dermato-Funcionais e Esteticistas.'
            },
            {
              q: 'Como recebo o acesso após o pagamento?',
              a: 'A liberação é 100% imediata! Assim que o Pix for compensado pelo Mercado Pago, a tela desbloqueia e você já acessa o editor com todos os documentos liberados.'
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
        <div className="flex justify-center gap-6 text-[11px] text-[#94A3B8]">
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

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#00D3A1] text-black px-6 py-3 rounded-full text-xs font-black shadow-2xl z-50 animate-bounce flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
};
