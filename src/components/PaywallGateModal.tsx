import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  X,
  Zap,
  KeyRound,
  Loader2,
  AlertCircle
} from 'lucide-react';

interface PaywallGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockSuccess: () => void;
  checkoutUrl?: string;
}

const DEFAULT_CHECKOUT_URL = 'https://pay.kiwify.com.br/Aa2ktmH';

export const PaywallGateModal: React.FC<PaywallGateModalProps> = ({
  isOpen,
  onClose,
  onUnlockSuccess,
  checkoutUrl = DEFAULT_CHECKOUT_URL,
}) => {
  const [accessCode, setAccessCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);

  if (!isOpen) return null;

  const handleValidateCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = accessCode.trim();

    if (!clean) {
      setErrorMsg('Informe o e-mail utilizado na compra na Kiwify.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/kiwify/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: clean.includes('@') ? clean : undefined,
          code: !clean.includes('@') ? clean : undefined,
        }),
      });

      const data = await res.json();

      if (res.ok && data.authorized) {
        onUnlockSuccess();
        onClose();
      } else {
        setErrorMsg(
          data.message ||
            '❌ Nenhuma compra aprovada na Kiwify foi encontrada para este e-mail. Caso tenha acabado de pagar via Pix, aguarde 1 minuto para a compensação e tente novamente, ou conclua sua compra no botão oficial acima.'
        );
      }
    } catch {
      setErrorMsg('Erro de conexão ao consultar a Kiwify. Verifique sua internet e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDirectPurchase = () => {
    const targetUrl = checkoutUrl || DEFAULT_CHECKOUT_URL;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-[fadeIn_0.2s_ease]">
      <div className="w-full max-w-lg bg-[#0A1D3A] border border-[#173660] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-center space-y-6">
        {/* Glow ambient */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/15 blur-[80px] rounded-full" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#061224] border border-[#173660] flex items-center justify-center text-[#8DA0BF] hover:text-white hover:bg-[#0E274D] transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon & Badge */}
        <div className="flex flex-col items-center space-y-3 pt-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-black shadow-lg shadow-amber-500/20">
            <Lock className="w-8 h-8 stroke-[2.5]" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Área Restrita aos Compradores</span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Desbloqueie o Software Completo
          </h3>
          <p className="text-xs sm:text-sm text-[#8DA0BF] leading-relaxed max-w-md mx-auto">
            Para acessar o <strong className="text-white">Editor Oficial de Documentos</strong> com mais de 168 POPs, fichas de anamnese e termos regulamentares da ANVISA, conclua seu pedido na Kiwify.
          </p>
        </div>

        {/* Benefits list */}
        <div className="p-3.5 rounded-2xl bg-[#061224] border border-[#173660] text-left space-y-2 text-xs">
          <div className="flex items-center gap-2 text-emerald-300 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Liberação instantânea após a confirmação do Pix ou Cartão</span>
          </div>
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Mais de 168 documentos prontos e 100% editáveis</span>
          </div>
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Acesso vitalício sem mensalidades ou taxas extras</span>
          </div>
        </div>

        {/* Main CTA: Buy on Kiwify */}
        <div className="space-y-3 pt-1">
          <button
            type="button"
            onClick={handleDirectPurchase}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#00D3A1] via-[#00B1EA] to-[#00D3A1] hover:brightness-110 text-black font-black text-base sm:text-lg tracking-wide uppercase flex items-center justify-center gap-2.5 shadow-[0_8px_30px_rgba(0,211,161,0.35)] transition transform active:scale-95 cursor-pointer"
          >
            <Zap className="w-5 h-5 fill-black" />
            <span>Comprar Acesso Agora na Kiwify</span>
            <ExternalLink className="w-4 h-4" />
          </button>
          <span className="text-[11px] text-[#8DA0BF] block">
            Checkout 100% Seguro pela Kiwify • Liberação Imediata
          </span>
        </div>

        {/* Secondary: Already bought / Enter email or token verified by Kiwify */}
        <div className="pt-2 border-t border-[#173660]/60 space-y-3">
          {!showCodeInput ? (
            <button
              type="button"
              onClick={() => setShowCodeInput(true)}
              className="text-xs text-[#00B1EA] hover:text-[#00D3A1] font-bold underline transition flex items-center justify-center gap-1 mx-auto cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Já pagou na Kiwify? Validar liberação do seu e-mail</span>
            </button>
          ) : (
            <form onSubmit={handleValidateCode} className="space-y-2 text-left animate-[fadeIn_0.2s_ease]">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-white block">
                  E-mail utilizado na compra da Kiwify:
                </label>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Verificação no Servidor
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={accessCode}
                  onChange={(e) => {
                    setAccessCode(e.target.value);
                    setErrorMsg('');
                  }}
                  disabled={isLoading}
                  placeholder="seu-email-da-kiwify@exemplo.com"
                  className="flex-1 h-10 px-3 rounded-xl bg-[#061224] border border-[#173660] text-white text-xs outline-none focus:border-emerald-400 disabled:opacity-50"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="h-10 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 text-black font-extrabold text-xs flex items-center gap-1 active:scale-95 transition cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Checando...</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-3.5 h-3.5" />
                      <span>Validar</span>
                    </>
                  )}
                </button>
              </div>

              {errorMsg ? (
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2 text-rose-300 text-[11px] leading-snug">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              ) : (
                <p className="text-[10px] text-[#8DA0BF]">
                  O sistema consulta diretamente a base de pedidos aprovados da Kiwify. E-mails não cadastrados ou compras pendentes não serão liberados.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
