import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle,
  Copy,
  ExternalLink,
  Sparkles,
  Link as LinkIcon,
  ShieldCheck,
  Smartphone,
  Check,
  ShoppingBag,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

interface KiwifyDeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
  isPaid?: boolean;
  onToggleTestAccess?: (unlock: boolean) => void;
}

export const KiwifyDeliveryModal: React.FC<KiwifyDeliveryModalProps> = ({
  isOpen,
  onClose,
  onToast,
  isPaid = true,
  onToggleTestAccess,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [kiwifyCheckoutUrl, setKiwifyCheckoutUrl] = useState<string>(() => {
    try {
      return (
        localStorage.getItem('vigi_hotmart_checkout_url') ||
        localStorage.getItem('vigi_kiwify_checkout_url') ||
        'https://pay.hotmart.com/N107670534A'
      );
    } catch {
      return 'https://pay.hotmart.com/N107670534A';
    }
  });

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const deliveryUrl = `${currentOrigin}/?acesso=liberado`;

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string, message: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    onToast(message);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleSaveKiwifyCheckout = (url: string) => {
    setKiwifyCheckoutUrl(url);
    try {
      localStorage.setItem('vigi_kiwify_checkout_url', url);
    } catch {}
    onToast('✅ Link do Checkout da Kiwify salvo com sucesso!');
  };

  const whatsappShareText = encodeURIComponent(
    `Olá! Seu acesso à Pasta Sanitária e Documentos ANVISA do VigiEstética foi liberado com sucesso. Acesse o sistema completo no link:\n\n${deliveryUrl}\n\nVocê já tem acesso a 100% de todas as categorias e POPs!`
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-[fadeIn_0.2s_ease]">
      <div className="w-full max-w-2xl bg-[#0A1D3A] border border-[#173660] rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-[#173660] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-black font-black shadow-lg shadow-emerald-500/20">
              <LinkIcon className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <span>Hospedagem & Entrega na Kiwify</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                  Acesso 100% Liberado
                </span>
              </h2>
              <p className="text-xs text-[#8DA0BF] mt-0.5">
                Tudo pronto: sem travas de pagamento internas. A Kiwify gerencia a cobrança e entrega este link!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#061224] border border-[#173660] flex items-center justify-center text-[#8DA0BF] hover:text-white hover:bg-[#0E274D] transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-xs py-4">
          {/* Banner de Confirmação */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Software 100% Aberto e Liberado</span>
                </h3>
                <p className="text-[#8DA0BF] mt-1 leading-relaxed">
                  Todas as categorias, POPs, fichas de anamnese, cadernos sanitários e estúdio de prescrições estão <strong className="text-emerald-400">completamente liberados</strong>. Qualquer pessoa que receber este link acessa o sistema completo instantaneamente.
                </p>
              </div>
            </div>
          </div>

          {/* Imagem de Capa para o Produto Kiwify */}
          <div className="p-4 rounded-2xl bg-[#061224] border border-purple-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-white text-xs flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Imagem de Capa Oficial para o Produto na Kiwify:</span>
              </label>
              <span className="text-[10px] text-purple-300 font-bold bg-purple-500/20 px-2 py-0.5 rounded-md">
                Pronta para Upload
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <img
                src="/kiwify_product_cover.jpg"
                alt="Capa do Produto Vigiestética"
                className="w-24 h-24 rounded-xl object-cover border border-[#173660] shadow-md shrink-0"
              />
              <div className="flex-1 text-left space-y-2">
                <p className="text-[11px] text-[#8DA0BF]">
                  Geramos uma imagem 3D profissional e moderna no tamanho ideal (1:1) com a identidade do <strong className="text-white">Vigiestética</strong> para você usar como foto principal do seu produto na Kiwify.
                </p>
                <div className="flex gap-2">
                  <a
                    href="/kiwify_product_cover.jpg"
                    download="vigiestetica-capa-kiwify.jpg"
                    className="h-8 px-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px] flex items-center gap-1.5 active:scale-95 transition cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Baixar Imagem para o Computador</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Campo 1: URL de Entrega para colar na Kiwify */}
          <div className="p-4 rounded-2xl bg-[#061224] border border-[#173660] space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-white text-xs flex items-center gap-1.5">
                <LinkIcon className="w-4 h-4 text-emerald-400" />
                <span>Link do Software para Cadastrar na Kiwify (URL de Entrega):</span>
              </label>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">
                Entrega Instantânea
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={deliveryUrl}
                className="flex-1 h-10 px-3 rounded-xl bg-[#0A1D3A] border border-[#173660] text-emerald-300 font-mono text-xs select-all outline-none"
              />
              <button
                type="button"
                onClick={() => handleCopy(deliveryUrl, 'kiwify_link', 'URL copiada! Cole na Kiwify como link de entrega.')}
                className="h-10 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold flex items-center gap-1.5 active:scale-95 transition cursor-pointer shrink-0"
              >
                {copiedKey === 'kiwify_link' ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
                <span>{copiedKey === 'kiwify_link' ? 'Copiado!' : 'Copiar URL'}</span>
              </button>
            </div>
            <p className="text-[11px] text-[#8DA0BF]">
              Este é o link que o cliente receberá após pagar na Kiwify.
            </p>
          </div>

          {/* Passo a Passo: Como Configurar na Kiwify */}
          <div className="p-4 rounded-2xl bg-[#061224] border border-[#173660] space-y-3">
            <h3 className="font-bold text-white text-xs flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#00B1EA]" />
              <span>Passo a Passo Rápido na Kiwify (Leve apenas 2 minutos):</span>
            </h3>

            <div className="space-y-2.5 text-[#8DA0BF]">
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-[#0A1D3A] border border-[#173660]/50">
                <span className="w-5 h-5 rounded-full bg-[#00B1EA]/20 text-[#00B1EA] font-extrabold flex items-center justify-center shrink-0 text-[10px]">
                  1
                </span>
                <p className="text-[11px]">
                  Acesse sua conta na <strong className="text-white">Kiwify</strong> e clique em <strong className="text-white">Produtos &gt; Criar Produto</strong>.
                </p>
              </div>

              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-[#0A1D3A] border border-[#173660]/50">
                <span className="w-5 h-5 rounded-full bg-[#00B1EA]/20 text-[#00B1EA] font-extrabold flex items-center justify-center shrink-0 text-[10px]">
                  2
                </span>
                <p className="text-[11px]">
                  Em <strong className="text-white">Tipo de Entrega</strong>, selecione <strong className="text-white">Link / URL Externa</strong> (ou configure na aba <em>Página de Obrigado</em>).
                </p>
              </div>

              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-[#0A1D3A] border border-[#173660]/50">
                <span className="w-5 h-5 rounded-full bg-[#00B1EA]/20 text-[#00B1EA] font-extrabold flex items-center justify-center shrink-0 text-[10px]">
                  3
                </span>
                <p className="text-[11px]">
                  Cole a <strong className="text-emerald-400">URL copiada acima</strong> no campo de entrega.
                </p>
              </div>

              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-[#0A1D3A] border border-[#173660]/50">
                <span className="w-5 h-5 rounded-full bg-[#00B1EA]/20 text-[#00B1EA] font-extrabold flex items-center justify-center shrink-0 text-[10px]">
                  4
                </span>
                <p className="text-[11px]">
                  Pronto! Quando o cliente efetuar a compra, a Kiwify envia o acesso direto e você recebe os pagamentos na sua conta bancária sem se preocupar com integrações.
                </p>
              </div>
            </div>
          </div>

          {/* Campo Opcional: Link do Checkout Kiwify */}
          <div className="p-4 rounded-2xl bg-[#061224] border border-[#173660] space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-white text-xs flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-purple-400" />
                <span>Link do Seu Checkout da Kiwify (Opcional):</span>
              </label>
            </div>
            <p className="text-[#8DA0BF] text-[11px]">
              Se você quiser que os botões "Comprar" da Página de Vendas pública abram diretamente o seu checkout da Kiwify, insira o link abaixo:
            </p>
            <div className="flex gap-2">
              <input
                type="url"
                value={kiwifyCheckoutUrl}
                onChange={(e) => setKiwifyCheckoutUrl(e.target.value)}
                placeholder="https://pay.kiwify.com.br/seu-codigo-aqui"
                className="flex-1 h-9 px-3 rounded-xl bg-[#0A1D3A] border border-[#173660] text-white text-xs outline-none focus:border-purple-400"
              />
              <button
                type="button"
                onClick={() => handleSaveKiwifyCheckout(kiwifyCheckoutUrl)}
                className="h-9 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1 active:scale-95 transition cursor-pointer"
              >
                Salvar
              </button>
            </div>
          </div>

          {/* Envio Manual via WhatsApp (Caso venda no direct ou manual) */}
          <div className="p-3.5 rounded-2xl bg-[#061224] border border-[#173660] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-left">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Venda Direta / WhatsApp:</span>
              </span>
              <p className="text-[11px] text-[#8DA0BF] mt-0.5">
                Quer enviar o link liberado direto para um cliente específico pelo WhatsApp?
              </p>
            </div>
            <a
              href={`https://api.whatsapp.com/send?text=${whatsappShareText}`}
              target="_blank"
              rel="noreferrer"
              className="py-2 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-xs flex items-center gap-1.5 active:scale-95 transition cursor-pointer shrink-0"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Enviar no WhatsApp</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>

        {/* Footer com Controle de Teste para o Dono */}
        <div className="pt-4 border-t border-[#173660] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-[#8DA0BF]">Status no seu navegador:</span>
            {isPaid ? (
              <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                🔓 Acesso Total Liberado
              </span>
            ) : (
              <span className="text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                🔒 Modo Visitante Bloqueado
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onToggleTestAccess && (
              <button
                type="button"
                onClick={() => onToggleTestAccess(!isPaid)}
                className="py-1.5 px-3 rounded-xl bg-[#061224] hover:bg-[#0E274D] border border-[#173660] text-[#8DA0BF] hover:text-white text-[11px] font-medium transition cursor-pointer"
                title="Permite ao dono testar a tela de vendas bloqueada ou o software liberado"
              >
                {isPaid ? '👁️ Testar como Visitante (Bloquear)' : '🔓 Liberar para Mim'}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="py-1.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs active:scale-95 transition cursor-pointer"
            >
              Concluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
