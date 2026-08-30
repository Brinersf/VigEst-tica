import React, { useState, useEffect } from 'react';
import { X, Key, CheckCircle, AlertCircle, ExternalLink, RefreshCw } from 'lucide-react';

interface MercadoPagoConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: () => void;
}

export const MercadoPagoConfigModal: React.FC<MercadoPagoConfigModalProps> = ({
  isOpen,
  onClose,
  onSaved,
}) => {
  const [tokenInput, setTokenInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [maskedToken, setMaskedToken] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      checkCurrentStatus();
    }
  }, [isOpen]);

  const checkCurrentStatus = async () => {
    try {
      const res = await fetch('/api/mercadopago/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      setIsConfigured(data.isConfigured);
      setMaskedToken(data.maskedToken);
    } catch {
      // ignore
    }
  };

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setStatusMsg('Validando credenciais com Mercado Pago...');

    try {
      const res = await fetch('/api/mercadopago/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken: tokenInput.trim() }),
      });
      const data = await res.json();

      if (data.isConfigured) {
        setStatus('success');
        setStatusMsg('Access Token configurada e validada com sucesso!');
        setIsConfigured(true);
        setMaskedToken(data.maskedToken);
        setTokenInput('');
        if (onSaved) onSaved();
      } else {
        setStatus('error');
        setStatusMsg('Token inválida ou chave de teste genérica.');
      }
    } catch (err: any) {
      setStatus('error');
      setStatusMsg(err.message || 'Erro ao conectar com servidor.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-[600px] bg-[#121c28] border border-[#1e2d40] rounded-[24px] p-6 shadow-2xl animate-[slideUp_0.2s_ease]">
        <div className="flex justify-between items-center pb-4 border-b border-[#1e2d40]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#00d3a1]/15 flex items-center justify-center">
              <Key className="w-5 h-5 text-[#00d3a1]" />
            </div>
            <div>
              <h3 className="font-bold text-[18px] text-white leading-none">
                Configuração Mercado Pago
              </h3>
              <p className="text-[11px] text-[#8aa0b8] mt-1">
                Credenciais de Recebimento via Pix e Cartão
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#0a1018] flex items-center justify-center text-[#8aa0b8] hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current status banner */}
        <div className="mt-4 p-3.5 rounded-xl bg-[#0a1018] border border-[#1e2d40] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {isConfigured ? (
              <CheckCircle className="w-5 h-5 text-[#00d3a1]" />
            ) : (
              <AlertCircle className="w-5 h-5 text-[#ffcc00]" />
            )}
            <div>
              <div className="text-[13px] font-bold text-white">
                {isConfigured
                  ? 'Mercado Pago Configurado em Produção'
                  : 'Modo Demonstração (Sem Chave do Cliente)'}
              </div>
              <div className="text-[11px] text-[#8aa0b8]">
                {isConfigured && maskedToken
                  ? `Token ativo: ${maskedToken}`
                  : 'Cole sua Access Token de produção abaixo para receber na sua conta.'}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={checkCurrentStatus}
            className="p-2 rounded-lg bg-[#1a2a3d] text-[#8aa0b8] hover:text-white transition"
            title="Recarregar Status"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-4 p-4 rounded-xl bg-[#0e1723] border border-[#1e2d40] text-[12px] text-[#c9d8e8] space-y-2">
          <div className="font-bold text-[#00d3a1] flex items-center gap-1.5">
            Como obter sua Access Token no Mercado Pago:
            <a
              href="https://www.mercadopago.com.br/developers"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[#00b4ff] hover:underline"
            >
              Portal Developers <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <ol className="list-decimal list-inside space-y-1 text-[#8aa0b8] text-[11px]">
            <li>Acesse o portal Mercado Pago Developers com sua conta Mercado Pago/Mercado Livre.</li>
            <li>
              Vá em <strong>Suas Aplicações</strong> &rarr; Criar aplicação (ou abra uma existente).
            </li>
            <li>
              No menu lateral, clique em <strong>Credenciais de Produção</strong>.
            </li>
            <li>
              Copie a chave <strong>Access Token</strong> (começa com <code>APP_USR-...</code>).
            </li>
          </ol>
        </div>

        <form onSubmit={handleSave} className="mt-4 space-y-3">
          <div>
            <label className="text-[11px] uppercase tracking-widest text-[#8aa0b8] font-bold">
              Access Token de Produção
            </label>
            <input
              type="text"
              required
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="APP_USR-xxxxxxxxxxxx-xxxxxx-xxxxxxxxxxxxxxxx-xxxxxx"
              className="mt-1 w-full h-11 px-4 rounded-xl bg-[#0a1018] border border-[#1e2d40] text-[13px] text-white focus:border-[#00d3a1] outline-none font-mono"
            />
          </div>

          {statusMsg && (
            <div
              className={`p-3 rounded-xl text-[12px] flex items-center gap-2 ${
                status === 'success'
                  ? 'bg-[#00d3a1]/10 text-[#00d3a1] border border-[#00d3a1]/30'
                  : status === 'error'
                  ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                  : 'bg-[#1a2a3d] text-[#8aa0b8]'
              }`}
            >
              {status === 'success' && <CheckCircle className="w-4 h-4 shrink-0" />}
              {status === 'error' && <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{statusMsg}</span>
            </div>
          )}

          <div className="pt-3 border-t border-[#1e2d40] flex gap-2">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex-1 h-11 rounded-xl bg-[#00d3a1] text-black font-bold hover:bg-[#00c291] transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status === 'loading' ? 'Validando...' : 'Salvar Access Token'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="h-11 px-5 rounded-xl bg-[#0a1018] border border-[#1e2d40] text-[#8aa0b8] hover:text-white transition text-sm"
            >
              Fechar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
