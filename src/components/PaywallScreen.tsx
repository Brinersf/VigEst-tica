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
  QrCode
} from 'lucide-react';
import { PlanType, PaymentDetails, ClinicData } from '../types';
import { generateCanvasQRCode } from '../utils/qrCode';

interface PaywallScreenProps {
  onApproved: (plan: PlanType, clinicData: ClinicData, paymentDetails: PaymentDetails) => void;
  onOpenConfig: () => void;
}

export const PaywallScreen: React.FC<PaywallScreenProps> = ({ onApproved, onOpenConfig }) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('completo');
  const [step, setStep] = useState<'form' | 'loading' | 'qr' | 'approved'>('form');
  const [formData, setFormData] = useState<ClinicData>({
    nomeClinica: '',
    cnpj: '',
    responsavel: '',
    alvara: '',
    nomeCliente: '',
    cpfCliente: '',
    email: 'contato@suaclinica.com.br',
    whatsapp: '(11) 99999-9999',
  });

  const [payment, setPayment] = useState<PaymentDetails | null>(null);
  const [countdown, setCountdown] = useState(900); // 15 minutes
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
        // ignore network glitches
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
      showToast('Preencha E-mail, Nome da Clínica e WhatsApp.');
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
        showToast(data.error || 'Erro ao gerar Pix no Mercado Pago');
        setStep('form');
        return;
      }

      // If QR code image base64 exists, use it. Otherwise fallback to canvas generator
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
      showToast(err.message || 'Erro ao conectar com servidor Mercado Pago.');
      setStep('form');
    }
  };

  const handleApproval = () => {
    setStep('approved');
    setTimeout(() => {
      onApproved(selectedPlan, formData, payment || { id: 'MP-DEMO', amount: selectedPlan === 'essencial' ? 97 : 197 });
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#0a1018] text-white flex flex-col relative overflow-hidden">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#00d3a1]/10 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute top-[40%] -right-40 w-[600px] h-[600px] bg-[#00b4ff]/5 blur-[100px] rounded-full" />

      {/* Header Bar */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5 border-b border-[#121c28]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d3a1] to-[#00a884] flex items-center justify-center font-black text-[#0a1018] text-xl shadow-[0_0_20px_rgba(0,211,161,0.4)]">
            V
          </div>
          <div>
            <div className="font-extrabold text-[18px] tracking-tight leading-none text-white">
              VigiEstética
            </div>
            <div className="text-[10px] tracking-[0.2em] text-[#5a738f] uppercase font-bold mt-1">
              ANVISA READY V3 • Mercado Pago
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenConfig}
            className="h-9 px-3.5 rounded-xl bg-[#121c28] border border-[#1e2d40] text-[12px] text-[#8aa0b8] hover:text-white hover:border-[#00d3a1]/40 flex items-center gap-2 transition"
          >
            <Key className="w-4 h-4 text-[#00d3a1]" />
            <span className="hidden sm:inline">Configurar Mercado Pago</span>
          </button>
          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-[#00d3a1] bg-[#00d3a1]/10 px-3 py-1.5 rounded-full border border-[#00d3a1]/20">
            <ShieldCheck className="w-4 h-4" />
            <span>Mercado Pago Oficial</span>
          </div>
        </div>
      </header>

      {/* Hero Body */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-[1080px] grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
          {/* Left Feature Column */}
          <div className="hidden md:block pt-4 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121c28] border border-[#1e2d40] text-[11px] text-[#8aa0b8]">
              <span className="w-2 h-2 rounded-full bg-[#00d3a1] animate-pulse" />
              <span>Checkout Oficial Mercado Pago • Aprovação Instantânea</span>
            </div>

            <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-white">
              Sua clínica <br />
              <span className="text-[#00d3a1] underline decoration-[#00d3a1]/30">ANVISA READY</span>
              <br />
              em 5 minutos.
            </h1>

            <p className="text-[#8aa0b8] leading-relaxed max-w-[440px] text-[14px]">
              Compêndio Master com mais de 168 documentos blindados: POPs de injetáveis e lasers, manuais ANVISA, PGRSS, TCLEs, contratos e o <strong className="text-pink-400">Estúdio de Prescrições Estéticas Personalizadas</strong> com fórmulas home care In & Out.
            </p>

            <div className="grid grid-cols-2 gap-3 max-w-[440px]">
              <div className="bg-[#121c28] border border-[#1e2d40] rounded-2xl p-4">
                <div className="text-3xl font-black text-white">168+</div>
                <div className="text-[10px] text-[#8aa0b8] uppercase tracking-widest font-bold mt-1">
                  Documentos & POPs
                </div>
              </div>

              <div className="bg-[#121c28] border border-[#1e2d40] rounded-2xl p-4">
                <div className="text-3xl font-black text-[#00d3a1]">R$ 0</div>
                <div className="text-[10px] text-[#8aa0b8] uppercase tracking-widest font-bold mt-1">
                  Multas em fiscalizações
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <img
                src="https://http2.mlstatic.com/org-img/sdk/mercadopago/logo-mercadopago-200.png"
                alt="Mercado Pago"
                className="h-6 opacity-80 invert brightness-200"
              />
              <span className="text-[11px] text-[#5a738f]">
                Pix • Cartão de Crédito • Webhook de Produção
              </span>
            </div>
          </div>

          {/* Right Checkout Box */}
          <div className="bg-[#121c28]/95 backdrop-blur-md border border-[#1e2d40] rounded-[28px] p-6 md:p-8 shadow-[0_20px_80px_-20px_rgba(0,211,161,0.25)]">
            <div className="flex items-start justify-between pb-4 border-b border-[#1e2d40]">
              <div>
                <h2 className="text-[22px] font-black text-white leading-tight">
                  Ative sua Clínica ANVISA READY
                </h2>
                <p className="text-[12px] text-[#8aa0b8] mt-1">
                  Selecione o plano e pague via Mercado Pago Pix.
                </p>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#00d3a1]/15 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#00d3a1]" />
              </div>
            </div>

            {/* Plan Selector */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedPlan('essencial')}
                className={`text-left rounded-2xl border p-4 transition ${
                  selectedPlan === 'essencial'
                    ? 'border-[#00d3a1] bg-[#00d3a1]/10 shadow-[0_0_0_1px_rgba(0,211,161,0.3)]'
                    : 'border-[#1e2d40] bg-[#0f1a27] hover:border-[#2a3d56]'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#8aa0b8]">
                    Essencial
                  </span>
                  {selectedPlan === 'essencial' && (
                    <div className="w-4 h-4 rounded-full bg-[#00d3a1] flex items-center justify-center">
                      <Check className="w-3 h-3 text-black font-bold" />
                    </div>
                  )}
                </div>
                <div className="mt-2 text-[26px] font-black text-white">R$ 97</div>
                <div className="text-[11px] text-[#8aa0b8] leading-tight mt-1">
                  6 POPs + 2 Anamneses
                </div>
                <div className="mt-2.5 text-[9px] px-2 py-0.5 rounded-full bg-[#1a2a3d] inline-block text-[#8aa0b8] font-bold">
                  8 docs
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPlan('completo')}
                className={`text-left rounded-2xl border p-4 transition relative overflow-hidden ${
                  selectedPlan === 'completo'
                    ? 'border-[#00d3a1] bg-[#00d3a1]/10 shadow-[0_0_0_1px_rgba(0,211,161,0.4)]'
                    : 'border-[#1e2d40] bg-[#0f1a27] hover:border-[#2a3d56]'
                }`}
              >
                <div className="absolute top-0 right-0 bg-[#00d3a1] text-black text-[8px] font-black px-2 py-0.5 rounded-bl-lg tracking-widest">
                  MAIS COMPLETO
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#00d3a1]">
                    Blindado Completo
                  </span>
                  {selectedPlan === 'completo' && (
                    <div className="w-4 h-4 rounded-full bg-[#00d3a1] flex items-center justify-center">
                      <Check className="w-3 h-3 text-black font-bold" />
                    </div>
                  )}
                </div>
                <div className="mt-2 text-[26px] font-black text-white">R$ 197</div>
                <div className="text-[11px] text-[#c9d8e8] leading-tight mt-1">
                  27 Documentos (POPs, TCLEs, LGPD)
                </div>
                <div className="mt-2.5 text-[9px] px-2 py-0.5 rounded-full bg-[#00d3a1] text-black font-extrabold inline-block">
                  27 docs • Recomendado
                </div>
              </button>
            </div>

            {/* Step Form */}
            <div className="mt-5">
              {step === 'form' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] tracking-widest uppercase text-[#8aa0b8] font-bold">
                      E-mail do Responsável
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="contato@suaclinica.com.br"
                      className="mt-1 w-full h-11 px-4 rounded-xl bg-[#0a1018] border border-[#1e2d40] text-white focus:border-[#00d3a1] outline-none text-[13px]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] tracking-widest uppercase text-[#8aa0b8] font-bold">
                      Nome da Clínica
                    </label>
                    <input
                      type="text"
                      value={formData.nomeClinica}
                      onChange={(e) => setFormData({ ...formData, nomeClinica: e.target.value })}
                      placeholder="Ex: Sua Clínica - Estética Avançada"
                      className="mt-1 w-full h-11 px-4 rounded-xl bg-[#0a1018] border border-[#1e2d40] text-white focus:border-[#00d3a1] outline-none text-[13px]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] tracking-widest uppercase text-[#8aa0b8] font-bold">
                      WhatsApp para Notificação
                    </label>
                    <input
                      type="text"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="(11) 99999-9999"
                      className="mt-1 w-full h-11 px-4 rounded-xl bg-[#0a1018] border border-[#1e2d40] text-white focus:border-[#00d3a1] outline-none text-[13px]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleGeneratePix}
                    className="mt-2 w-full h-[52px] rounded-xl bg-[#00d3a1] hover:bg-[#00c291] text-black font-black tracking-wide flex items-center justify-center gap-2 transition text-[15px] shadow-[0_10px_30px_rgba(0,211,161,0.3)]"
                  >
                    <img
                      src="https://http2.mlstatic.com/org-img/sdk/mercadopago/logo-mercadopago-200.png"
                      alt=""
                      className="h-4 mix-blend-multiply"
                    />
                    Gerar Pix no Mercado Pago • R$ {selectedPlan === 'essencial' ? 97 : 197}
                  </button>
                </div>
              )}

              {step === 'loading' && (
                <div className="py-12 flex flex-col items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-[#1e2d40] border-t-[#00d3a1] animate-spin" />
                  <div className="text-center">
                    <div className="font-bold text-white text-[15px]">
                      Conectando à API do Mercado Pago...
                    </div>
                    <div className="text-[12px] text-[#8aa0b8] mt-1">
                      Gerando QR Code Pix em ambiente seguro
                    </div>
                  </div>
                </div>
              )}

              {step === 'qr' && payment && (
                <div className="space-y-4">
                  <div className="bg-[#0a1018] border border-[#1e2d40] rounded-2xl p-5 flex flex-col items-center">
                    <div className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#8aa0b8] mb-3 font-bold">
                      <Clock className="w-4 h-4 text-[#00d3a1]" />
                      Expira em {formatTime(countdown)} •{' '}
                      <span className="text-[#00d3a1]">Aguardando pagamento</span>
                    </div>

                    <img
                      src={payment.qrCodeBase64}
                      alt="QR Code Pix Mercado Pago"
                      className="w-[200px] h-[200px] rounded-xl bg-white p-2 shadow-xl"
                    />

                    <div className="mt-3 text-[11px] text-[#5a738f] font-mono">
                      ID Mercado Pago: {payment.id} • Valor: R$ {payment.amount},00
                    </div>

                    <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffcc00]/10 border border-[#ffcc00]/20 text-[11px] text-[#ffcc00]">
                      <span className="w-2 h-2 rounded-full bg-[#ffcc00] animate-pulse" />
                      Polling automático de status a cada 3s
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] tracking-widest uppercase text-[#8aa0b8] font-bold">
                      Código Pix Copia e Cola
                    </label>
                    <div className="mt-1 flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={payment.pixCode || ''}
                        className="flex-1 h-11 px-3 rounded-xl bg-[#0a1018] border border-[#1e2d40] text-[11px] text-[#8aa0b8] font-mono overflow-hidden"
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
                        className="h-11 px-4 rounded-xl bg-[#1a2a3d] hover:bg-[#22354f] border border-[#1e2d40] text-white text-sm font-bold flex items-center gap-2 transition shrink-0"
                      >
                        {copied ? <Check className="w-4 h-4 text-[#00d3a1]" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copiado!' : 'Copiar'}
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleApproval}
                    className="w-full h-12 rounded-xl bg-white hover:bg-zinc-100 text-black font-bold flex items-center justify-center gap-2 transition text-sm shadow-xl"
                  >
                    <Sparkles className="w-4 h-4 text-[#00d3a1]" />
                    Simular Aprovação Mercado Pago (Teste)
                  </button>
                </div>
              )}

              {step === 'approved' && (
                <div className="py-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#00d3a1] flex items-center justify-center shadow-[0_0_40px_rgba(0,211,161,0.6)]">
                    <CheckCircle className="w-10 h-10 text-black" />
                  </div>
                  <h3 className="mt-4 text-2xl font-black text-white">
                    Pagamento Aprovado pelo Mercado Pago!
                  </h3>
                  <p className="text-[13px] text-[#8aa0b8] mt-1">
                    Liberando editor completo de documentos sanitários...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white text-black px-5 py-2.5 rounded-full text-[13px] font-bold shadow-2xl z-50 animate-[slideUp_0.2s_ease]">
          {toastMsg}
        </div>
      )}
    </div>
  );
};
