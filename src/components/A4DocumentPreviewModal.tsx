import React, { useState } from 'react';
import {
  X,
  Printer,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileText,
  Pill,
  Syringe,
  ClipboardCheck,
  Building2,
  Lock,
  Download,
  Eye,
  Award,
  Calendar,
  User,
  Phone,
  Layers,
  AlertTriangle
} from 'lucide-react';
import { ClinicData } from '../types';

interface A4DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccessEditor: () => void;
  clinicData?: ClinicData;
  initialDocType?: 'prescription' | 'pop' | 'tcle';
}

export const A4DocumentPreviewModal: React.FC<A4DocumentPreviewModalProps> = ({
  isOpen,
  onClose,
  onAccessEditor,
  clinicData,
  initialDocType = 'pop'
}) => {
  const [docType, setDocType] = useState<'prescription' | 'pop' | 'tcle'>(initialDocType);
  const [copied, setCopied] = useState(false);

  // Sync state whenever modal opens or initialDocType changes
  React.useEffect(() => {
    if (isOpen && initialDocType) {
      setDocType(initialDocType);
    }
  }, [isOpen, initialDocType]);

  if (!isOpen) return null;

  const clinicName = clinicData?.nomeClinica || 'DRA. JULIANA SANTOS • ESTÉTICA AVANÇADA';
  const cnpj = clinicData?.cnpj || '12.345.678/0001-90';
  const responsavel = clinicData?.responsavel || clinicData?.responsavelTecnico || 'Dra. Juliana Santos';
  const registro = clinicData?.registroConselho || 'CRF/CRBM 12345-SP';
  const alvara = clinicData?.alvara || '2026/08941-VISA';
  const endereco = 'Av. Paulista, 1000 - Conjunto 82 - Bela Vista, São Paulo - SP';
  const telefone = clinicData?.whatsapp || '(11) 98765-4321';
  const email = clinicData?.email || 'contato@drajulianasantos.com.br';

  const handleCopyText = () => {
    let text = '';
    if (docType === 'prescription') {
      text = `RECEITUÁRIO ESTÉTICO & PROTOCOLO HOME CARE - VIGIESTÉTICA\nClínica: ${clinicName}\nResponsável: ${responsavel} (${registro})\n\n1. USO TÓPICO: Sérum Clareador Biomimético & Reparador de Barreira (Ácido Tranexâmico 3% + Alfa-Arbutin 2% + Niacinamida 4% em Sérum QSP 30g)\n2. USO ORAL: Pool Antioxidante In & Out (Polypodium leucotomos 240mg + Picnogenol 100mg + Vitamina C 500mg em 60 doses)\n3. PÓS-PROCEDIMENTO: Bálsamo Regenerador Barreira-Up (Madecassoside 0.5% + EGF 1% + Bisabolol 1% QSP 30g)`;
    } else if (docType === 'pop') {
      text = `PROCEDIMENTO OPERACIONAL PADRÃO • POP 008 (PÁGINAS 1 E 2)\nAPLICAÇÃO DE TOXINA BOTULÍNICA TIPO A NA FACE\nClínica: ${clinicName}\nResponsável Técnico: ${responsavel} (${registro})\nConformidade: ANVISA RDC 63/2011 & RDC 222/2018\n\n1. OBJETIVO: Padronizar o protocolo de reconstituição, diluição, dosimetria, injeção e manejo de intercorrências.\n2. CADEIA DE FRIO: Refrigeração obrigatória de 2°C a 8°C monitorada em livro sanitário.\n3. RECONSTITUIÇÃO: SF 0,9% estéril monodose (2,0 mL para 100UI padrão 1:2 ou 1,0 mL para diluição seca 1:1).\n4. MAPEAMENTO ANATÔMICO:\n- Frontal: 10 a 20 UI (6-12 pontos) a 2 cm acima da sobrancelha.\n- Glabela: 15 a 25 UI (5-7 pontos) em prócero e corrugadores.\n- Orbicular dos olhos: 6 a 16 UI (3-4 pontos por lado) a 1 cm da rima orbitária.\n- Nasal: 2 a 4 UI.\n- Mento / DAO: 2 a 6 UI.\n5. BIOSSEGURANÇA & PGRSS: Descarte imediato em Descarpack (Grupo E - Perfurocortantes).\n6. INTERCORRÊNCIAS: Ptose palpebral -> Apraclonidina 0,5% / Brimonidina 0,2%.`;
    } else {
      text = `TCLE - TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO\nClínica: ${clinicName}\nProcedimento: Harmonização Facial e Injetáveis Estéticos`;
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-[fadeIn_0.2s_ease]">
      <div className="bg-[#0B1B36] border-2 border-[#1E4477] rounded-3xl w-full max-w-5xl shadow-2xl flex flex-col max-h-[94vh] overflow-hidden">
        {/* Modal Top Controls Bar */}
        <div className="p-4 sm:p-5 border-b border-[#1E4477] bg-[#081832] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">
                  Visualizador de Documento Completo em Padrão A4
                </h3>
                <span className="hidden sm:inline-flex text-[10px] font-black uppercase tracking-wider bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full border border-pink-500/30">
                  Modelo Oficial
                </span>
              </div>
              <p className="text-xs text-[#94A3B8]">
                Proporção real A4 (210mm x 297mm) com formatação institucional e conformidade sanitária
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="h-9 px-3 rounded-xl bg-[#0E274D] hover:bg-[#153868] border border-[#1E4477] text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              title="Imprimir visualização A4"
            >
              <Printer className="w-4 h-4 text-[#00D3A1]" />
              <span className="hidden md:inline">Imprimir A4</span>
            </button>

            <button
              type="button"
              onClick={handleCopyText}
              className="h-9 px-3 rounded-xl bg-[#0E274D] hover:bg-[#153868] border border-[#1E4477] text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              title="Copiar texto do documento"
            >
              {copied ? <Check className="w-4 h-4 text-[#00D3A1]" /> : <Copy className="w-4 h-4 text-pink-400" />}
              <span className="hidden md:inline">{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-[#173660] hover:bg-[#1F4C82] text-[#94A3B8] hover:text-white flex items-center justify-center transition cursor-pointer"
              title="Fechar visualizador"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Model Tabs Selector */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#061224] border-b border-[#173660] flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] shrink-0 mr-1">
            Modelos de Exemplo:
          </span>

          <button
            type="button"
            onClick={() => setDocType('prescription')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              docType === 'prescription'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                : 'bg-[#0A1D3A] text-[#94A3B8] hover:text-white border border-[#173660]'
            }`}
          >
            <Pill className="w-3.5 h-3.5" />
            <span>1. Receituário & Prescrição Estética A4</span>
          </button>

          <button
            type="button"
            onClick={() => setDocType('pop')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              docType === 'pop'
                ? 'bg-gradient-to-r from-[#00D3A1] to-[#00B1EA] text-black font-extrabold shadow-md'
                : 'bg-[#0A1D3A] text-[#94A3B8] hover:text-white border border-[#173660]'
            }`}
          >
            <Syringe className="w-3.5 h-3.5" />
            <span>2. POP Procedimento Injetável A4</span>
          </button>

          <button
            type="button"
            onClick={() => setDocType('tcle')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              docType === 'tcle'
                ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-md'
                : 'bg-[#0A1D3A] text-[#94A3B8] hover:text-white border border-[#173660]'
            }`}
          >
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>3. TCLE Termo de Consentimento A4</span>
          </button>
        </div>

        {/* Scrollable A4 Document Body Container */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-8 bg-[#040C1A] flex justify-center items-start">
          {/* Realistic A4 Page Canvas */}
          <div className="w-full max-w-[780px] bg-white text-[#0F172A] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-6 sm:p-10 border border-slate-200 font-sans relative">
            
            {/* Subtle Official Watermark Stamp */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] select-none">
              <div className="text-7xl font-black rotate-[-30deg] uppercase tracking-widest text-black">
                VigiEstética Oficial
              </div>
            </div>

            {/* ======================================================== */}
            {/* 1. CABEÇALHO INSTITUCIONAL DA CLÍNICA (PADRÃO TIMBRADO) */}
            {/* ======================================================== */}
            <div className="border-b-2 border-[#0F172A] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white flex items-center justify-center font-black text-xl shadow-md shrink-0 border border-slate-300">
                  {clinicName.charAt(0)}
                </div>
                <div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-[#0284C7] font-mono">
                    ESTABELECIMENTO DE SAÚDE & ESTÉTICA AVANÇADA
                  </div>
                  <h1 className="text-base sm:text-lg font-black uppercase tracking-tight text-[#0F172A] leading-tight">
                    {clinicName}
                  </h1>
                  <div className="text-[11px] text-[#475569] font-medium flex flex-wrap gap-x-2">
                    <span>CNPJ: <strong>{cnpj}</strong></span>
                    <span>•</span>
                    <span>Alvará Sanitário: <strong>{alvara}</strong></span>
                  </div>
                  <div className="text-[10px] text-[#64748B]">
                    Resp. Técnico: <strong>{responsavel}</strong> • {registro}
                  </div>
                </div>
              </div>

              <div className="bg-[#F8FAFC] border border-[#CBD5E1] p-2.5 rounded-xl text-left sm:text-right shrink-0 w-full sm:w-auto">
                <div className="font-mono font-black text-[#0284C7] text-xs">
                  {docType === 'prescription' ? 'MOD-RX-2026' : docType === 'pop' ? 'POP-INJ-008' : 'TCLE-HAR-014'}
                </div>
                <div className="text-[10px] font-bold text-[#475569]">VERSÃO 5.0 • 2026</div>
                <div className="text-[9px] text-[#047857] font-extrabold flex items-center gap-1 sm:justify-end">
                  <ShieldCheck className="w-3 h-3 text-[#047857]" />
                  <span>CONFORME ANVISA RDC 63</span>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* MODELO 1: RECEITUÁRIO ESTÉTICO & FÓRMULAS IN & OUT */}
            {/* ======================================================== */}
            {docType === 'prescription' && (
              <div className="space-y-6 pt-5">
                {/* Title Banner */}
                <div className="bg-gradient-to-r from-[#FDF2F8] via-[#FAF5FF] to-[#F0FDF4] border border-pink-200 p-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-pink-600">
                      ESTÚDIO DE PRESCRIÇÕES PERSONALIZADAS
                    </span>
                    <h2 className="text-base font-black text-[#0F172A] uppercase">
                      Receituário Estético & Protocolo Home Care
                    </h2>
                  </div>
                  <div className="text-left sm:text-right text-[11px] text-[#475569]">
                    <div>Emissão: <strong>31/08/2026</strong></div>
                    <div>Validade: <strong>30 dias</strong></div>
                  </div>
                </div>

                {/* Patient Identification Card */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-[#64748B] block uppercase">Paciente:</span>
                    <strong className="text-[#0F172A]">Mariana Albuquerque Silveira</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#64748B] block uppercase">CPF / Idade:</span>
                    <span className="text-[#334155]">123.456.789-00 • 34 anos</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#64748B] block uppercase">Finalidade Clínica:</span>
                    <span className="text-pink-600 font-bold">Pós-Peeling Químico & Manutenção Melasma</span>
                  </div>
                </div>

                {/* Formulas List */}
                <div className="space-y-4">
                  {/* Formula 1: Uso Tópico */}
                  <div className="border border-pink-200 bg-[#FFF5F7] rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between border-b border-pink-200/80 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-pink-600 text-white font-black text-xs flex items-center justify-center">1</span>
                        <h3 className="font-extrabold text-xs sm:text-sm text-[#0F172A] uppercase">
                          USO TÓPICO / DERMATOLÓGICO: Sérum Clareador Biomimético & Barreira
                        </h3>
                      </div>
                      <span className="text-[10px] font-bold bg-pink-100 text-pink-700 px-2 py-0.5 rounded">
                        Manipulação QSP 30g
                      </span>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-pink-100 text-xs text-[#334155] font-mono leading-relaxed space-y-0.5">
                      <div>• Ácido Tranexâmico ................................... 3,0%</div>
                      <div>• Alfa-Arbutin Purificado .......................... 2,0%</div>
                      <div>• Niacinamida PC (Grau Dermatológico) ..... 4,0%</div>
                      <div>• Ácido Hialurônico Oligo HA (Baixo Peso) .. 0,5%</div>
                      <div>• D-Pantenol (Pró-Vitamina B5) ................. 2,0%</div>
                      <div className="text-[11px] text-[#64748B] pt-1">Sérum Fluido Siliconado Toque Seco q.s.p. ... 30g (Frasco Conta-Gotas Opaco)</div>
                    </div>

                    <div className="text-xs text-[#1E293B] pt-1">
                      <strong className="text-pink-800">Modo de Usar / Posologia:</strong> Aplicar 4 a 5 gotas na face, pescoço e colo previamente higienizados, massageando suavemente em movimentos ascendentes <strong>duas vezes ao dia</strong>: pela manhã (antes do protetor solar FPS 50+) e à noite antes de dormir.
                    </div>
                  </div>

                  {/* Formula 2: Uso Oral In & Out */}
                  <div className="border border-purple-200 bg-[#FAF5FF] rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between border-b border-purple-200/80 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center">2</span>
                        <h3 className="font-extrabold text-xs sm:text-sm text-[#0F172A] uppercase">
                          USO ORAL: Nutracêutico In & Out — Fotoproteção Sistêmica & Pró-Colágeno
                        </h3>
                      </div>
                      <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                        Enviar 60 Cápsulas
                      </span>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-purple-100 text-xs text-[#334155] font-mono leading-relaxed space-y-0.5">
                      <div>• Polypodium leucotomos (Extrato Padronizado) .. 240mg</div>
                      <div>• Extrato de Pinus pinaster (Picnogenol 95% OPC) 100mg</div>
                      <div>• Vitamina C Revestida (Microencapsulada) ..... 500mg</div>
                      <div>• Resveratrol Trans ......................................... 50mg</div>
                      <div>• L-Cisteína ................................................... 150mg</div>
                      <div>• Zinco Quelado ............................................... 15mg</div>
                      <div className="text-[11px] text-[#64748B] pt-1">Excipiente q.s.p. 1 dose em Cápsulas Vegetais Gastro-resistentes</div>
                    </div>

                    <div className="text-xs text-[#1E293B] pt-1">
                      <strong className="text-purple-800">Modo de Usar / Posologia:</strong> Ingerir <strong>1 dose (cápsula) pela manhã</strong>, junto com o desjejum. Manter o uso contínuo por 60 dias para reforço da imunidade cutânea e bloqueio enzimático de tirosinase.
                    </div>
                  </div>

                  {/* Formula 3: Bálsamo SOS */}
                  <div className="border border-emerald-200 bg-[#F0FDF4] rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between border-b border-emerald-200/80 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">3</span>
                        <h3 className="font-extrabold text-xs sm:text-sm text-[#0F172A] uppercase">
                          FÓRMULA SOS: Bálsamo Regenerador Cutâneo Pós-Procedimento
                        </h3>
                      </div>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">
                        Bisnaga Airless 30g
                      </span>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-emerald-100 text-xs text-[#334155] font-mono leading-relaxed space-y-0.5">
                      <div>• Madecassoside (Centella Asiatica Purificada) .. 0,5%</div>
                      <div>• EGF (Fator de Crescimento Epidérmico) ......... 1,0%</div>
                      <div>• Alfa-Bisabolol Natural ................................ 1,0%</div>
                      <div>• Manteiga de Karité Não-Comedogênica ............ 3,0%</div>
                      <div className="text-[11px] text-[#64748B] pt-1">Emulsão Lipídica Reparadora q.s.p. 30g</div>
                    </div>

                    <div className="text-xs text-[#1E293B] pt-1">
                      <strong className="text-emerald-800">Modo de Usar:</strong> Aplicar camada fina nas áreas tratadas <strong>3 vezes ao dia</strong> durante os primeiros 5 dias após o procedimento estético, até completa reepitelização cutânea.
                    </div>
                  </div>
                </div>

                {/* General Instructions & Warnings */}
                <div className="bg-[#F8FAFC] border border-[#CBD5E1] p-3.5 rounded-xl space-y-1.5 text-xs text-[#334155]">
                  <div className="font-bold text-[#0F172A] flex items-center gap-1.5 text-[11px] uppercase">
                    <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
                    <span>Orientações de Biossegurança e Cuidados Gerais:</span>
                  </div>
                  <ul className="list-disc list-inside text-[11px] space-y-0.5 text-[#475569] leading-relaxed">
                    <li>Utilizar protetor solar com FPS mínimo de 50 e PPD elevado, reaplicando a cada 3 a 4 horas.</li>
                    <li>Não puxar casquinhas ou descamações cutâneas resultantes do procedimento em cabine.</li>
                    <li>Em caso de sensibilidade persistente, prurido ou dúvidas, contatar imediatamente a clínica pelo WhatsApp: <strong>{telefone}</strong>.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* MODELO 2: POP PROCEDIMENTO INJETÁVEL (TOXINA BOTULÍNICA) */}
            {/* ESTRUTURA COMPLETA EM 2 PÁGINAS A4 OFICIAIS              */}
            {/* ======================================================== */}
            {docType === 'pop' && (
              <div className="space-y-8 pt-4 text-xs text-[#1E293B]">
                {/* ---------------------------------------------------- */}
                {/* PÁGINA 1 DE 2 (A4 - FOLHA 1)                         */}
                {/* ---------------------------------------------------- */}
                <div className="space-y-4 pb-6 border-b-4 border-dashed border-slate-300 relative">
                  {/* Page 1 Header Banner */}
                  <div className="bg-gradient-to-r from-[#F0FDF4] via-[#ECFDF5] to-[#F0F9FF] border border-emerald-300 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-700 text-white px-2.5 py-0.5 rounded-full">
                          POP 008 • PÁGINA 1 DE 2
                        </span>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                          PROCEDIMENTO INJETÁVEL
                        </span>
                      </div>
                      <h2 className="text-base sm:text-lg font-black text-[#0F172A] uppercase tracking-tight">
                        POP – Aplicação de Toxina Botulínica Tipo A na Face
                      </h2>
                      <p className="text-[11px] text-[#475569]">
                        Protocolo Operacional Padrão de Avaliação, Reconstituição, Dosimetria e Injeção
                      </p>
                    </div>

                    <div className="bg-white p-2 rounded-lg border border-emerald-200 text-right shrink-0 text-[10px] space-y-0.5">
                      <div className="font-mono font-bold text-emerald-900">CÓDIGO: <strong>POP-INJ-008</strong></div>
                      <div className="text-slate-600">Revisão: <strong>5.0 (Anual)</strong></div>
                      <div className="text-emerald-700 font-bold">RDC 63/2011 • RDC 222/2018</div>
                    </div>
                  </div>

                  {/* Quadro de Controle Sanitário */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#F8FAFC] border border-slate-200 p-3 rounded-xl text-[10px]">
                    <div>
                      <span className="text-slate-500 block uppercase font-bold text-[9px]">Setor:</span>
                      <strong className="text-slate-800">Cosmiatria & Injetáveis</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase font-bold text-[9px]">Frequência:</span>
                      <strong className="text-slate-800">A cada atendimento</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase font-bold text-[9px]">Público Alvo:</span>
                      <strong className="text-slate-800">Pacientes Elegíveis</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase font-bold text-[9px]">Validade do POP:</span>
                      <strong className="text-emerald-700">24 meses (Agosto/2028)</strong>
                    </div>
                  </div>

                  {/* Seções 1, 2 e 3 da Página 1 */}
                  <div className="space-y-3.5">
                    {/* Seção 1: Objetivo */}
                    <div className="space-y-1">
                      <h3 className="font-black text-xs uppercase text-[#0F172A] border-b border-slate-200 pb-1 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded bg-emerald-700 text-white flex items-center justify-center text-[10px]">1</span>
                        OBJETIVO GERAL & CAMPO DE APLICAÇÃO
                      </h3>
                      <p className="text-[11px] text-[#475569] leading-relaxed">
                        Padronizar as etapas técnico-operacionais para administração injetável da toxina botulínica tipo A com finalidade de atenuação de rugas hipercinéticas faciais (terço superior, médio e inferior) e contorno cervical na clínica <strong>{clinicName}</strong>, assegurando máxima eficácia cosmiátrica, esterilidade do campo e rastreabilidade sanitária integral em conformidade com as diretrizes da ANVISA (RDC 63/2011).
                      </p>
                    </div>

                    {/* Seção 2: Responsabilidade e Habilitação */}
                    <div className="space-y-1">
                      <h3 className="font-black text-xs uppercase text-[#0F172A] border-b border-slate-200 pb-1 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded bg-emerald-700 text-white flex items-center justify-center text-[10px]">2</span>
                        HABILITAÇÃO PROFISSIONAL & RESPONSABILIDADE TÉCNICA
                      </h3>
                      <div className="bg-[#F8FAFC] p-3 rounded-lg border border-slate-200 text-[11px] text-[#475569] space-y-1">
                        <p>• <strong>Profissional Executante:</strong> Médicos, Biomédicos Estetas, Farmacêuticos Estetas, Enfermeiros Estetas ou Cirurgiões-Dentistas devidamente inscritos e regulares em seus respectivos conselhos regionais de classe, com capacitação certificada em procedimentos injetáveis avançados.</p>
                        <p>• <strong>Responsável Técnico (RT):</strong> <strong>{responsavel} ({registro})</strong> — incumbido de supervisionar o livro de controle de temperatura da cadeia de frio e assegurar a higienização de grau hospitalar dos consultórios.</p>
                      </div>
                    </div>

                    {/* Seção 3: Materiais, Insumos e Cadeia de Frio */}
                    <div className="space-y-1">
                      <h3 className="font-black text-xs uppercase text-[#0F172A] border-b border-slate-200 pb-1 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded bg-emerald-700 text-white flex items-center justify-center text-[10px]">3</span>
                        MATERIAIS, INSUMOS & CADEIA DE FRIO (2°C A 8°C)
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#334155]">
                        <div className="bg-[#F8FAFC] p-2.5 rounded-lg border border-slate-200 space-y-0.5">
                          <strong className="text-emerald-800 block">• Insumos Biológicos e Farmacêuticos:</strong>
                          <span>Frasco-ampola de Toxina Botulínica Tipo A liofilizada (100U/200U) sob cadeia de frio rigorosa (2°C a 8°C), monitorada via termômetro calibrado de máxima e mínima; Cloreto de Sódio 0,9% Injetável estéril (ampola monodose plástica).</span>
                        </div>
                        <div className="bg-[#F8FAFC] p-2.5 rounded-lg border border-slate-200 space-y-0.5">
                          <strong className="text-emerald-800 block">• Materiais Injetáveis & EPIs:</strong>
                          <span>Seringas de insulina de 100UI com graduação ultraprecisa (0,01mL); Agulhas de aspiração 18G/21G e agulhas ultrafinas de aplicação 30G, 31G ou 32G (4mm e 6mm); Luvas nitrílicas livres de pó, máscara PFF2/N95, óculos protetores e touca descartável.</span>
                        </div>
                        <div className="bg-[#F8FAFC] p-2.5 rounded-lg border border-slate-200 space-y-0.5">
                          <strong className="text-emerald-800 block">• Antissepsia & Marcação de Campo:</strong>
                          <span>Clorexidina alcoólica 0,5% ou Clorexidina aquosa 2%; Pacotes de gaze estéril 7,5x7,5cm; Lápis dermográfico cirúrgico dermatológico branco estéril; Bolsa térmica de compressa fria / anestésico vibratório.</span>
                        </div>
                        <div className="bg-[#F8FAFC] p-2.5 rounded-lg border border-slate-200 space-y-0.5">
                          <strong className="text-emerald-800 block">• PGRSS & Descarte de Resíduos:</strong>
                          <span>Coletor rígido de perfurocortantes (Descarpack - Grupo E RDC 222/2018); Lixeira de pedal com saco branco leitoso identificado para resíduos infectantes (Grupo A).</span>
                        </div>
                      </div>
                    </div>

                    {/* Seção 4: Reconstituição Farmacotécnica */}
                    <div className="space-y-1">
                      <h3 className="font-black text-xs uppercase text-[#0F172A] border-b border-slate-200 pb-1 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded bg-emerald-700 text-white flex items-center justify-center text-[10px]">4</span>
                        PROTOCOLO RIGOROSO DE RECONSTITUIÇÃO & DILUIÇÃO PADRÃO
                      </h3>
                      <div className="bg-[#F0FDF4] p-3 rounded-lg border border-emerald-300 text-[11px] text-[#1E293B] space-y-1.5">
                        <div className="font-bold text-emerald-900">
                          Tabela de Diluição Padrão e Concentração por UI:
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-[10px] border-collapse bg-white rounded border border-emerald-200">
                            <thead>
                              <tr className="bg-emerald-100 text-emerald-900 font-bold">
                                <th className="p-1.5 border border-emerald-200">Frasco</th>
                                <th className="p-1.5 border border-emerald-200">Volume SF 0,9%</th>
                                <th className="p-1.5 border border-emerald-200">Proporção por Traço (Seringa 100UI)</th>
                                <th className="p-1.5 border border-emerald-200">Finalidade Clínica</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-emerald-100">
                                <td className="p-1.5 font-bold">100 UI</td>
                                <td className="p-1.5">2,0 mL (Padrão 1:2)</td>
                                <td className="p-1.5 font-mono font-bold text-emerald-800">1 UI = 0,02 mL (1 traço padrão)</td>
                                <td className="p-1.5">Frontal, glabela, orbicular (alta precisão e halo controlado)</td>
                              </tr>
                              <tr className="border-b border-emerald-100">
                                <td className="p-1.5 font-bold">100 UI</td>
                                <td className="p-1.5">1,0 mL (Seca 1:1)</td>
                                <td className="p-1.5 font-mono font-bold text-emerald-800">2 UI = 0,02 mL (1 traço = 2 UI)</td>
                                <td className="p-1.5">Corrugadores hipertróficos, masseter, platisma denso</td>
                              </tr>
                              <tr>
                                <td className="p-1.5 font-bold">50 UI / Micro</td>
                                <td className="p-1.5">2,5 a 5,0 mL (Mesobotox)</td>
                                <td className="p-1.5 font-mono font-bold text-emerald-800">0,2 a 0,5 UI por pápula dérmica</td>
                                <td className="p-1.5">Poros dilatados, rosácea, microrelevo dérmico</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <p className="text-[10px] text-slate-600 leading-snug pt-1">
                          <strong>Atenção Crítica:</strong> Introduzir a agulha com bisel voltado para a parede interna do frasco. Permitir que o diluente escorra suavemente. Não injetar sob pressão brusca para não quebrar as cadeias proteicas ativas da neurotoxina. Realizar movimentos circulares suaves sem agitar/chacoalhar.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Rodapé da Página 1 */}
                  <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>{clinicName} • CNPJ: {cnpj}</span>
                    <span className="font-bold text-emerald-700">PÁGINA 1 DE 2 — CONTINUA NA FOLHA SEGUINTE ➔</span>
                  </div>
                </div>

                {/* ---------------------------------------------------- */}
                {/* PÁGINA 2 DE 2 (A4 - FOLHA 2)                         */}
                {/* ---------------------------------------------------- */}
                <div className="space-y-4 pt-2">
                  {/* Page 2 Header Strip */}
                  <div className="bg-slate-100 border border-slate-300 p-2.5 rounded-xl flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-2">
                      <span className="font-black bg-emerald-700 text-white px-2 py-0.5 rounded">
                        POP 008 • PÁGINA 2 DE 2
                      </span>
                      <strong className="text-slate-800">POP – Aplicação de Toxina Botulínica Tipo A na Face</strong>
                    </div>
                    <div className="font-mono text-slate-600 font-bold">
                      POP-INJ-008 • VERSÃO 5.0
                    </div>
                  </div>

                  {/* Seção 5: Mapeamento Anatômico e Dosagens de Segurança */}
                  <div className="space-y-1">
                    <h3 className="font-black text-xs uppercase text-[#0F172A] border-b border-slate-200 pb-1 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded bg-emerald-700 text-white flex items-center justify-center text-[10px]">5</span>
                      MAPEAMENTO ANATÔMICO, MÚSCULOS-ALVO & DOSIMETRIA CLÍNICA
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-[10px] border-collapse bg-white rounded-lg border border-slate-200">
                        <thead>
                          <tr className="bg-slate-100 text-[#0F172A] font-bold border-b border-slate-300">
                            <th className="p-1.5">Sítio Anatômico / Músculo</th>
                            <th className="p-1.5">Plano de Injeção</th>
                            <th className="p-1.5">Pontos Médios</th>
                            <th className="p-1.5">Dosagem Típica</th>
                            <th className="p-1.5">Zona de Segurança / Cuidados</th>
                          </tr>
                        </thead>
                        <tbody className="text-[10px] text-slate-700 divide-y divide-slate-200">
                          <tr>
                            <td className="p-1.5 font-bold text-slate-900">Músculo Frontal</td>
                            <td className="p-1.5">Subcutâneo superficial / Dérmico</td>
                            <td className="p-1.5">6 a 12 pontos</td>
                            <td className="p-1.5 font-mono font-bold text-emerald-800">10 a 20 UI</td>
                            <td className="p-1.5 text-[9.5px]">Respeitar 1,5 a 2,0 cm acima da borda superior da sobrancelha (evitar ptose palpebral/supercílio).</td>
                          </tr>
                          <tr>
                            <td className="p-1.5 font-bold text-slate-900">Glabela (Prócero e Corrugadores)</td>
                            <td className="p-1.5">Intramuscular profundo (periósteo)</td>
                            <td className="p-1.5">5 a 7 pontos</td>
                            <td className="p-1.5 font-mono font-bold text-emerald-800">15 a 25 UI</td>
                            <td className="p-1.5 text-[9.5px]">Injetar o corrugador lateral superficialmente e afastar 1 cm da rima óssea orbital.</td>
                          </tr>
                          <tr>
                            <td className="p-1.5 font-bold text-slate-900">Orbicular dos Olhos ("Pés de Galinha")</td>
                            <td className="p-1.5">Intradérmico / Subcutâneo imediato</td>
                            <td className="p-1.5">3 a 4 por lado</td>
                            <td className="p-1.5 font-mono font-bold text-emerald-800">6 a 16 UI (total)</td>
                            <td className="p-1.5 text-[9.5px]">Manter distância mínima de 1 cm do rebordo orbitário externo; bisel voltado para fora.</td>
                          </tr>
                          <tr>
                            <td className="p-1.5 font-bold text-slate-900">Nasal ("Bunny Lines")</td>
                            <td className="p-1.5">Subcutâneo superficial</td>
                            <td className="p-1.5">2 a 3 pontos</td>
                            <td className="p-1.5 font-mono font-bold text-emerald-800">2 a 4 UI</td>
                            <td className="p-1.5 text-[9.5px]">Evitar atingir o músculo levantador do lábio superior e asa do nariz.</td>
                          </tr>
                          <tr>
                            <td className="p-1.5 font-bold text-slate-900">Músculo Mentual & DAO</td>
                            <td className="p-1.5">Intramuscular profundo (Mento) / Dérmico (DAO)</td>
                            <td className="p-1.5">1 a 2 pontos</td>
                            <td className="p-1.5 font-mono font-bold text-emerald-800">2 a 6 UI</td>
                            <td className="p-1.5 text-[9.5px]">Injeção do DAO rente à mandíbula para não paralisar o depressor do lábio inferior.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Seção 6: Técnica Operacional Passo a Passo */}
                  <div className="space-y-1">
                    <h3 className="font-black text-xs uppercase text-[#0F172A] border-b border-slate-200 pb-1 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded bg-emerald-700 text-white flex items-center justify-center text-[10px]">6</span>
                      FLUXOGRAMA DA TÉCNICA OPERACIONAL PASSO A PASSO
                    </h3>
                    <ol className="list-decimal list-inside text-[10.5px] text-[#475569] space-y-1 bg-[#F8FAFC] p-3 rounded-lg border border-slate-200 leading-relaxed">
                      <li><strong>Anamnese e Triagem:</strong> Investigação de contraindicações formais (Miastenia Gravis, Síndrome de Eaton-Lambert, ELA, gestação, lactação, alergia à albumina humana ou infecção ativa no local).</li>
                      <li><strong>TCLE e Consentimento:</strong> Coleta da assinatura do TCLE e explicação das metas cosmiátricas realistas e durabilidade média (3 a 5 meses).</li>
                      <li><strong>Registro Fotográfico Padronizado:</strong> Registro fotográfico frontal, perfil 45° e 90° em <strong>repouso facial</strong> e sob <strong>contração dinâmica máxima</strong>.</li>
                      <li><strong>Paramentação & Assepsia:</strong> Higienização cirúrgica das mãos (POP 001) e paramentação com EPIs estéreis.</li>
                      <li><strong>Marcação Dinâmica:</strong> Marcação personalizada com lápis dermográfico baseada na mímica individual de cada paciente.</li>
                      <li><strong>Antissepsia Rigorosa:</strong> Aplicação de Clorexidina com gaze estéril em movimentos centrífugos e unidirecionais; aguardar secagem completa do antisséptico.</li>
                      <li><strong>Aplicação da Neurotoxina:</strong> Injeção milimétrica com agulha 31G/32G em ângulo apropriado, tracionando levemente a pele e injetando a dose exata sem transbordamento.</li>
                      <li><strong>Hemostasia Pontual:</strong> Compressão pontual leve com gaze estéril seca em caso de sangramento puntual capilar, sem fricção ou massagem compressiva.</li>
                      <li><strong>Descarte Rastreável:</strong> Descarte imediato do conjunto perfurocortante na caixa coletora rígida (sem reencapar agulhas) conforme PGRSS.</li>
                      <li><strong>Registro no Prontuário:</strong> Anotação do nome comercial, número do lote, data de validade, data e hora da reconstituição e mapa anatômico de pontos.</li>
                    </ol>
                  </div>

                  {/* Seção 7: Pós-Procedimento e Manejo de Intercorrências */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10.5px]">
                    <div className="bg-[#F0FDF4] p-3 rounded-lg border border-emerald-300 space-y-1 text-[#1E293B]">
                      <h4 className="font-bold text-emerald-900 uppercase text-[10px] flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-700" />
                        <span>7. ORIENTAÇÕES PÓS-APLICAÇÃO AO PACIENTE</span>
                      </h4>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-700 text-[10px]">
                        <li>Permanecer em posição vertical (não deitar) nas primeiras 4 horas.</li>
                        <li>Não massagear, esfregar ou comprimir a face nas primeiras 24 horas.</li>
                        <li>Suspender atividades físicas extenuantes e sauna por 24 a 48 horas.</li>
                        <li>Agendar retorno de controle de simetria obrigatório entre 14 e 21 dias.</li>
                      </ul>
                    </div>

                    <div className="bg-[#FEF2F2] p-3 rounded-lg border border-red-200 space-y-1 text-[#1E293B]">
                      <h4 className="font-bold text-red-900 uppercase text-[10px] flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-red-600" />
                        <span>8. GESTÃO DE INTERCORRÊNCIAS & REVERSÃO</span>
                      </h4>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-700 text-[10px]">
                        <li><strong>Equimoses / Hematomas:</strong> Compressas frias locais e gel de Arnica ou Trombofob tópico 3x/dia.</li>
                        <li><strong>Ptose Palpebral Transitória:</strong> Colírio de Apraclonidina 0,5% (1 a 2 gotas, 3x/dia) ou Brimonidina 0,2% para estimulação do músculo tarsal de Müller.</li>
                        <li><strong>Assimetrias Dinâmicas:</strong> Ajuste milimétrico com microdoses apenas após 14 dias (pico de fixação).</li>
                      </ul>
                    </div>
                  </div>

                  {/* Quadro de Validação e Assinaturas de Controle da Clínica */}
                  <div className="bg-[#F8FAFC] border border-slate-300 rounded-xl p-3 space-y-3">
                    <div className="text-[10px] font-black uppercase text-[#0F172A] border-b border-slate-200 pb-1 flex items-center justify-between">
                      <span>9. CONTROLE DE REVISÃO, HOMOLOGAÇÃO & APROVAÇÃO TÉCNICA</span>
                      <span className="text-emerald-700 font-mono">STATUS: DOCUMENTO ATIVO</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-[10px]">
                      <div className="border-t border-slate-400 pt-1.5 space-y-0.5">
                        <div className="font-bold text-[#0F172A]">Comissão de Biossegurança</div>
                        <div className="text-slate-500 text-[9px]">Elaboração do Protocolo</div>
                        <div className="text-[8.5px] font-mono text-emerald-700">Data: 10/08/2026</div>
                      </div>

                      <div className="border-t border-slate-400 pt-1.5 space-y-0.5">
                        <div className="font-bold text-[#0F172A]">Gerência Clínica & Qualidade</div>
                        <div className="text-slate-500 text-[9px]">Revisão Técnica Sanitária</div>
                        <div className="text-[8.5px] font-mono text-emerald-700">Data: 15/08/2026</div>
                      </div>

                      <div className="border-t border-slate-400 pt-1.5 space-y-0.5">
                        <div className="font-bold text-[#0F172A]">{responsavel}</div>
                        <div className="text-slate-500 text-[9px]">{registro} • Resp. Técnico</div>
                        <div className="text-[8.5px] font-mono text-emerald-700">Aprovação & Homologação</div>
                      </div>
                    </div>
                  </div>

                  {/* Rodapé da Página 2 */}
                  <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>{clinicName} • Sistema VigiEstética 5.0</span>
                    <span className="font-bold text-emerald-700">PÁGINA 2 DE 2 • FIM DO DOCUMENTO</span>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* MODELO 3: TCLE TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO */}
            {/* ======================================================== */}
            {docType === 'tcle' && (
              <div className="space-y-5 pt-5 text-xs text-[#1E293B]">
                <div className="bg-[#EEF2FF] border border-indigo-200 p-3.5 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700">
                      TERMO JURÍDICO & CLÍNICO OFICIAL • TCLE 014
                    </span>
                    <h2 className="text-base font-black text-[#0F172A] uppercase">
                      Termo de Consentimento Livre e Esclarecido (TCLE)
                    </h2>
                  </div>
                  <span className="text-xs font-mono font-bold bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded">
                    BLINDAGEM JURÍDICA
                  </span>
                </div>

                <div className="space-y-3 text-[11px] text-[#475569] leading-relaxed">
                  <p>
                    Eu, <strong>Mariana Albuquerque Silveira</strong>, portador(a) do CPF nº <strong>123.456.789-00</strong>, declaro ter sido plenamente informado(a) e esclarecido(a) pelo(a) Responsável Técnico(a) <strong>{responsavel}</strong> sobre todos os aspectos, benefícios, limitações biológicas e cuidados necessários para a realização do procedimento estético proposto no estabelecimento {clinicName}.
                  </p>

                  <div className="bg-[#F8FAFC] border border-slate-200 p-3 rounded-lg space-y-1.5 text-[11px]">
                    <div className="font-bold text-[#0F172A]">CLÁUSULAS DE ESCLARECIMENTO:</div>
                    <p>1. Compreendi que reações como eritema, edema transitório, pequenos hematomas e sensibilidade pontual são respostas biológicas normais do organismo.</p>
                    <p>2. Comprometo-me a seguir rigorosamente a prescrição estética, o protocolo home care e as instruções de fotoproteção indicadas pelo profissional.</p>
                    <p>3. Autorizo o registro fotográfico técnico para fins exclusivos de acompanhamento da evolução clínica no prontuário.</p>
                  </div>

                  <div className="pt-4 grid grid-cols-2 gap-6 text-center text-xs">
                    <div className="border-t border-slate-400 pt-2">
                      <div className="font-bold text-[#0F172A]">Mariana Albuquerque Silveira</div>
                      <div className="text-[10px] text-[#64748B]">Assinatura do(a) Paciente</div>
                    </div>
                    <div className="border-t border-slate-400 pt-2">
                      <div className="font-bold text-[#0F172A]">{responsavel}</div>
                      <div className="text-[10px] text-[#64748B]">{registro} • Responsável Técnico</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* RODAPÉ INSTITUCIONAL COM CHANCELA E CARIMBO OFICIAL */}
            {/* ======================================================== */}
            <div className="mt-8 pt-4 border-t-2 border-[#0F172A] grid grid-cols-1 sm:grid-cols-2 gap-4 text-[10px]">
              <div className="p-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl space-y-0.5">
                <div className="font-black text-[#0F172A] uppercase flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>HOMOLOGAÇÃO SANITÁRIA & QUALIDADE</span>
                </div>
                <div className="text-[#475569]">{endereco}</div>
                <div className="text-[9px] font-mono text-[#047857] font-bold">
                  ✓ EMITIDO PELO SISTEMA OFICIAL VIGIESTÉTICA 5.0
                </div>
              </div>

              <div className="p-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-left sm:text-right space-y-0.5">
                <div className="font-black text-[#0F172A] uppercase">ASSINATURA & CARIMBO PROFISSIONAL</div>
                <div className="font-bold text-[#1E293B]">{responsavel}</div>
                <div className="text-[#64748B]">{registro} • Alvará: {alvara}</div>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 sm:p-5 border-t border-[#1E4477] bg-[#081832] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#CBD5E1]">
            <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
            <span>
              Personalize automaticamente todos os <strong>168 documentos</strong> com o logo e dados da sua clínica!
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onAccessEditor();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 hover:opacity-95 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-pink-500/30 transition active:scale-95 cursor-pointer"
          >
            <Pill className="w-4 h-4" />
            <span>Acessar e Editar Documentos no Software</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
