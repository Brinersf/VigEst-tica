import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertCircle, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in application:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('vigi_custom_step_categories');
    } catch {}
    this.setState({ hasError: false });
    window.location.reload();
  };

  private handleClearAll = () => {
    try {
      localStorage.clear();
    } catch {}
    this.setState({ hasError: false });
    window.location.href = window.location.pathname;
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#061224] text-[#F5F5F5] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#0A1D3A] border border-[#173660] rounded-3xl p-6 sm:p-8 text-center shadow-2xl space-y-5">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-xl font-black text-white">Carregando o VigiEstética</h2>
              <p className="text-xs sm:text-sm text-[#94A3B8] mt-2">
                Clique no botão abaixo para recarregar o painel com segurança.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#00D3A1] to-[#00B1EA] hover:brightness-110 text-black font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 transition"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Recarregar Painel Oficial</span>
              </button>

              <button
                type="button"
                onClick={this.handleClearAll}
                className="w-full py-2.5 px-4 rounded-xl bg-[#081832] hover:bg-[#0E274D] border border-[#173660] text-xs font-bold text-[#94A3B8] hover:text-white flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Restaurar Padrão</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
