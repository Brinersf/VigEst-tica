import React, { useState, useEffect } from 'react';
import {
  FileText,
  ShieldCheck,
  Syringe,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Eye,
  CheckCircle2,
  Lock,
  Layers,
  ArrowUpRight,
  Printer,
  Download,
  Award
} from 'lucide-react';

export interface DocumentSlide {
  id: string;
  category: 'pop-injetavel' | 'pop-facial' | 'pop-corporal' | 'tcle' | 'pgrss' | 'contrato';
  categoryLabel: string;
  categoryBadgeColor: string;
  title: string;
  code: string;
  version: string;
  targetAudience: string;
  anvisaRef: string;
  previewSnippet: string;
  keyPoints: string[];
}

export const SLIDES_DATA: DocumentSlide[] = [
  {
    id: 'slide-1',
    category: 'pop-injetavel',
    categoryLabel: 'POP • Injetável Avançado',
    categoryBadgeColor: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30',
    title: 'Procedimento Operacional Padrão - Toxina Botulínica Tipo A',
    code: 'POP-INJ-01',
    version: 'Rev. 4.0',
    targetAudience: 'Biomédicos, Farmacêuticos, Médicos, Dentistas e Enfermeiros',
    anvisaRef: 'RDC nº 63/2011 & RDC 222/2018 ANVISA',
    keyPoints: ['Reconstituição c/ SF 0,9% estéril', 'Técnica asséptica centrífuga', 'Descarte pérfuro Grupo E'],
    previewSnippet: `1. OBJETIVO: Padronizar a aplicação de toxina botulínica tipo A com técnica asséptica e segurança biológica.
2. CAMPO DE APLICAÇÃO: Sala de procedimentos invasivos não cirúrgicos da clínica.
3. MATERIAIS & INSUMOS: Seringa 0,3ml/0,5ml ultra-fina (31G/32G), Cloreto de Sódio 0,9% injetável, Clorexidina alcoólica 2%, gaze estéril e luvas de procedimento.
4. PROCEDIMENTO OPERACIONAL:
  - Antissepsia rigorosa da face em movimentos centrífugos.
  - Reconstituição sem agitação mecânica vigorosa para não desnaturar a proteína.
  - Aplicação intramuscular/intradérmica nos pontos previamente demarcados (Frontal, Glabela, Periocular).
5. CONDUTA EM INTERCORRÊNCIAS: Protocolo imediato para reversão de assimetrias e orientações pós-aplicação.`
  },
  {
    id: 'slide-2',
    category: 'tcle',
    categoryLabel: 'TCLE • Blindagem Jurídica',
    categoryBadgeColor: 'bg-amber-500/15 text-amber-700 border-amber-500/30',
    title: 'Termo de Consentimento Livre e Esclarecido - Toxina Botulínica Tipo A',
    code: 'TCLE-INJ-01',
    version: 'Rev. 3.2',
    targetAudience: 'Termo de Ciência de Durabilidade, Retoque e Cuidados Pós',
    anvisaRef: 'Código Civil Art. 730 & Resoluções Sanitárias',
    keyPoints: ['Início de ação 48-72h', 'Janela de retoque 15-30 dias', 'Sem massagem nas primeiras 4h'],
    previewSnippet: `TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO - TOXINA BOTULÍNICA

O(A) paciente declara ter ciência de que os resultados da toxina botulínica manifestam-se a partir de 48 a 72 horas com efeito pleno em 15 dias.

Compreendo que a durabilidade do bloqueio neuromuscular varia conforme o metabolismo individual e hábitos de vida, não constituindo garantia eterna de resultado. Fui instruído(a) a não deitar ou massagear a face nas primeiras 4 horas pós-procedimento e a respeitar a janela de revisão de 15 a 30 dias.`
  },
  {
    id: 'slide-3',
    category: 'pop-injetavel',
    categoryLabel: 'POP • Injetável Avançado',
    categoryBadgeColor: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30',
    title: 'Procedimento Operacional Padrão - Ácido Hialurônico & Preenchedores',
    code: 'POP-INJ-02',
    version: 'Rev. 4.1',
    targetAudience: 'Preenchimento Labial, Malar, Mandíbula, Mento e Olheiras',
    anvisaRef: 'RDC ANVISA nº 63/2011',
    keyPoints: ['Teste de aspiração prévia 5s', 'Microcânulas atraumáticas 22G/25G', 'Kit de Hialuronidase disponível'],
    previewSnippet: `1. FINALIDADE: Harmonização orofacial e volumização tecidual com implante injetável de Ácido Hialurônico reticulado.
2. SEGURANÇA E BIOSSEGURANÇA:
  - Obrigatório teste de refluxo/aspiração negativa por no mínimo 5 segundos antes de injetar em áreas de risco vascular.
  - Disponibilidade imediata de Hialuronidase na sala para reversão de intercorrências vasculares.
3. TÉCNICA: Aplicação subdérmica ou supraperiosteal com microcânula romba para redução de hematomas e riscos vasculares.`
  },
  {
    id: 'slide-4',
    category: 'tcle',
    categoryLabel: 'TCLE • Blindagem Jurídica',
    categoryBadgeColor: 'bg-amber-500/15 text-amber-700 border-amber-500/30',
    title: 'Termo de Consentimento Livre e Esclarecido - Preenchimento com Ácido Hialurônico',
    code: 'TCLE-INJ-02',
    version: 'Rev. 3.0',
    targetAudience: 'Consentimento de Riscos, Edemas e Uso de Hialuronidase',
    anvisaRef: 'Código de Defesa do Consumidor & CFO/CFBM/CFM',
    keyPoints: ['Ciência de riscos e edema transitório', 'Autorização para uso de Hialuronidase', 'Retorno obrigatório'],
    previewSnippet: `TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO - ÁCIDO HIALURÔNICO

Declaro que fui amplamente informado(a) pelo(a) Responsável Técnico(a) sobre a indicação, benefícios, riscos esperados (edema transitório, hiperemia, equimoses) e potenciais complicações inerentes ao implante dérmico com Ácido Hialurônico reticulado.

Autorizo expressamente o uso de Hialuronidase caso haja necessidade técnica de dissolução imediata ou tardia. Comprometo-me a seguir todas as recomendações de repouso e cuidados pós-procedimento.`
  },
  {
    id: 'slide-5',
    category: 'pop-injetavel',
    categoryLabel: 'POP • Bioestimulador',
    categoryBadgeColor: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30',
    title: 'Procedimento Operacional Padrão - Bioestimuladores de Colágeno (PLLA / Hidroxiapatita)',
    code: 'POP-INJ-03',
    version: 'Rev. 3.5',
    targetAudience: 'Estímulo de Colágeno Facial e Corporal',
    anvisaRef: 'RDC nº 63/2011 ANVISA',
    keyPoints: ['Reidratação homogênea 24-48h', 'Aplicação vetorial em leque', 'Regra de massagem 5x5x5'],
    previewSnippet: `1. OBJETIVO: Padronizar o preparo, reconstituição e injeção vetorial de Ácido Poli-L-Láctico ou Hidroxiapatita de Cálcio.
2. PREPARO DO PRODUTO: Reconstituição estéril prévia em Água para Injeção e Lidocaína 2% sem vasoconstritor.
3. TÉCNICA DE APLICAÇÃO:
  - Pertuito único com agulha guia e retroinjeção com microcânula 22G em plano subdérmico profundo.
  - Distribuição em leque uniforme evitando acúmulos que possam originar pápulas ou nódulos.
4. ORIENTAÇÕES: Instruir o paciente sobre massagem vigorosa (5 minutos, 5 vezes ao dia, por 5 dias).`
  },
  {
    id: 'slide-6',
    category: 'pgrss',
    categoryLabel: 'PGRSS • Manual Sanitário',
    categoryBadgeColor: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30',
    title: 'Plano de Gerenciamento de Resíduos de Serviços de Saúde (PGRSS)',
    code: 'MAN-PGRSS-01',
    version: 'Rev. 2026',
    targetAudience: 'Exigência Primária de Vistoria da Vigilância Sanitária Municipal',
    anvisaRef: 'RDC ANVISA nº 222/2018 & Resolução CONAMA 358',
    keyPoints: ['Segregação Grupos A, D e E', 'Caixas coletoras rígidas Descarpack', 'Coleta especializada licenciada'],
    previewSnippet: `PLANO DE GERENCIAMENTO DE RESÍDUOS DE SERVIÇOS DE SAÚDE (PGRSS)

1. IDENTIFICAÇÃO DO ESTABELECIMENTO: Clínica de Estética Avançada e Procedimentos Injetáveis.
2. CLASSIFICAÇÃO DOS RESÍDUOS:
  - GRUPO A (Biológico/Infectante): Gazes, algodões e luvas com fluidos corporais em saco branco leitoso identificado.
  - GRUPO E (Pérfuro-cortante): Agulhas, ampolas de vidro e lâminas descartadas em caixa coletora rígida com tampa.
3. FLUXO INTERNO: Recolhimento em horários pré-fixados, abrigo externo higienizado e entrega à concessionária de incineração.`
  },
  {
    id: 'slide-7',
    category: 'contrato',
    categoryLabel: 'Contrato • Jurídico',
    categoryBadgeColor: 'bg-rose-500/15 text-rose-700 border-rose-500/30',
    title: 'Contrato de Prestação de Serviços Estéticos e Harmonização',
    code: 'CTR-EST-01',
    version: 'Rev. 4.0',
    targetAudience: 'Blindagem Financeira, Termo de Cancelamento & Defesa Legal',
    anvisaRef: 'Código de Defesa do Consumidor & Código Civil Brasileiro',
    keyPoints: ['Obrigação de Meio expressa', 'Cancelamentos c/ mínimo 24h', 'Cláusula de quitação mútua'],
    previewSnippet: `CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE ESTÉTICA E HARMONIZAÇÃO

CLÁUSULA PRIMEIRA - DO OBJETO: Prestação dos serviços estéticos discriminados no plano de tratamento individualizado.
CLÁUSULA SEGUNDA - DA NATUREZA DA OBRIGAÇÃO: O contratante declara ciência inequívoca de que os procedimentos estéticos constituem obrigação de meio e técnica qualificada, dependendo da resposta biológica e individual do organismo.
CLÁUSULA TERCEIRA - DOS CANCELAMENTOS: Desmarcações devem ser comunicadas com antecedência mínima de 24 horas para evitar taxa de remarcação.`
  },
  {
    id: 'slide-8',
    category: 'pop-facial',
    categoryLabel: 'POP • Biossegurança Geral',
    categoryBadgeColor: 'bg-blue-500/15 text-blue-700 border-blue-500/30',
    title: 'Procedimento Operacional Padrão - Processamento e Esterilização em Autoclave',
    code: 'POP-BIO-02',
    version: 'Rev. 3.0',
    targetAudience: 'Controle de Infecção Cruzada em Instrumentais Metálicos',
    anvisaRef: 'RDC ANVISA nº 15/2012 & RDC nº 63/2011',
    keyPoints: ['Lavagem enzimática 10min', 'Embalagem em papel grau cirúrgico', 'Teste biológico semanal'],
    previewSnippet: `1. OBJETIVO: Garantir a esterilidade de instrumentais metálicos críticos e semicríticos (curetas, pinças, tesouras).
2. ETAPAS DO FLUXO:
  - Expurgos e imersão em detergente multienzimático por 10 minutos sob fricção mecânica.
  - Enxágue com água desmineralizada e secagem completa em papel toalha hospitalar.
  - Selagem em papel grau cirúrgico com fita indicadora Classe 1 e data de validade de 7 dias.
  - Ciclo de autoclave a 134°C com teste biológico periódico semanal (Geobacillus stearothermophilus).`
  }
];

interface DynamicSlideshowProps {
  onCtaClick?: () => void;
}

export const DynamicSlideshow: React.FC<DynamicSlideshowProps> = ({ onCtaClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const currentSlide = SLIDES_DATA[currentIndex] || SLIDES_DATA[0];

  // Auto slide effect (every 4 seconds)
  useEffect(() => {
    if (!isPlaying || isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES_DATA.length);
    }, 4200);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES_DATA.length) % SLIDES_DATA.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES_DATA.length);
  };

  return (
    <div
      className="w-full max-w-3xl mx-auto relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Floating Mini Controls Bar */}
      <div className="flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D3A1] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00D3A1]"></span>
          </span>
          <span className="text-[11px] font-black uppercase tracking-wider text-[#00D3A1]">
            Documentos Oficiais Passando na Tela ({currentIndex + 1}/{SLIDES_DATA.length})
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="h-7 px-2.5 rounded-lg bg-[#131E2C] border border-[#27384E] text-[10px] font-bold text-[#94A3B8] hover:text-white flex items-center gap-1 transition active:scale-95 cursor-pointer"
            title={isPlaying ? 'Pausar' : 'Reproduzir'}
          >
            {isPlaying && !isHovered ? (
              <>
                <Pause className="w-3 h-3 text-[#00D3A1]" />
                <span className="hidden sm:inline">Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-[#00D3A1] fill-[#00D3A1]" />
                <span className="hidden sm:inline">Passar</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrev}
            className="w-7 h-7 rounded-lg bg-[#131E2C] hover:bg-[#1E2E42] border border-[#27384E] text-white flex items-center justify-center transition active:scale-95 cursor-pointer"
            title="Documento anterior"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="w-7 h-7 rounded-lg bg-[#131E2C] hover:bg-[#1E2E42] border border-[#27384E] text-white flex items-center justify-center transition active:scale-95 cursor-pointer"
            title="Próximo documento"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Layered Paper Stack Effect Behind */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-[#00D3A1]/30 via-[#38BDF8]/20 to-[#00D3A1]/30 rounded-[28px] blur-xl opacity-60 group-hover:opacity-80 transition duration-500 pointer-events-none" />
      <div className="absolute top-2 left-3 right-3 bottom-0 bg-[#E2E8F0] rounded-2xl -z-10 shadow-lg transform rotate-[0.8deg] transition-all duration-500" />
      <div className="absolute top-1 left-2 right-2 bottom-0 bg-[#F1F5F9] rounded-2xl -z-10 shadow transform -rotate-[0.8deg] transition-all duration-500" />

      {/* THE PURE A4 DOCUMENT PAPER CARD */}
      <div
        key={currentSlide.id}
        className="w-full bg-[#FFFFFF] text-[#0F172A] rounded-2xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border border-[#CBD5E1] relative overflow-hidden font-sans transition-all duration-300 animate-[fadeIn_0.35s_ease-out]"
      >
        {/* Subtle top color badge indicator on the paper */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00D3A1] via-[#0284C7] to-[#F59E0B]" />

        {/* Institutional Header with Logo and Stamp */}
        <div className="border-b-2 border-[#0F172A] pb-3 mb-4 flex items-start justify-between gap-3">
          <div>
            <div className="text-[12px] sm:text-[13px] font-black tracking-wider text-[#0F172A] uppercase flex items-center gap-1.5">
              <span>CLÍNICA DE ESTÉTICA AVANÇADA</span>
              <span className="text-[#94A3B8]">•</span>
              <span className="text-[#0284C7]">DOCUMENTAÇÃO OFICIAL</span>
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#475569] font-medium mt-0.5">
              CONFORME {currentSlide.anvisaRef} • VIGIESTÉTICA BRASIL
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${currentSlide.categoryBadgeColor}`}>
              {currentSlide.categoryLabel}
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#0F172A] text-white font-black text-xs flex items-center justify-center font-mono shadow-sm">
              A4
            </div>
          </div>
        </div>

        {/* Document Title & Code */}
        <div className="mb-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base sm:text-lg md:text-xl font-black text-[#0F172A] font-serif leading-tight">
              {currentSlide.title}
            </h3>
            <span className="font-mono text-[11px] font-extrabold text-[#0284C7] bg-[#E0F2FE] px-2 py-0.5 rounded border border-[#BAE6FD] shrink-0">
              {currentSlide.code}
            </span>
          </div>

          <div className="text-[11px] text-[#64748B] mt-1 flex items-center gap-2">
            <span>Versão: <strong className="text-[#0F172A]">{currentSlide.version}</strong></span>
            <span>•</span>
            <span>Aplicação: <strong className="text-[#0F172A]">{currentSlide.targetAudience}</strong></span>
          </div>
        </div>

        {/* Highlighted Key Points Pills */}
        <div className="flex flex-wrap gap-1.5 mb-4 pb-3 border-b border-[#E2E8F0]">
          {currentSlide.keyPoints.map((point, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold bg-[#F8FAFC] text-[#334155] border border-[#CBD5E1] px-2.5 py-1 rounded-md"
            >
              <CheckCircle2 className="w-3 h-3 text-[#059669]" />
              {point}
            </span>
          ))}
        </div>

        {/* Main Document Body (Clean, Crisp Typography) */}
        <div className="text-[11px] sm:text-[12px] leading-relaxed text-[#334155] whitespace-pre-line font-sans bg-[#F8FAFC]/70 p-3.5 sm:p-4 rounded-xl border border-[#E2E8F0] min-h-[140px]">
          {currentSlide.previewSnippet}
        </div>

        {/* Signatures, Stamp & Footer */}
        <div className="mt-5 pt-3 border-t border-[#CBD5E1] flex items-center justify-between font-sans text-[10px] text-[#64748B]">
          <div>
            <div className="font-bold text-[#0F172A]">RESPONSÁVEL TÉCNICO(A)</div>
            <div className="text-[9px] text-[#475569]">CRBM / CRF / CRM / COREN / CRO / CREFITO</div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] rounded-md font-black text-[10px] shadow-xs">
              <CheckCircle2 className="w-3 h-3 text-[#047857]" />
              <span>✓ AUDITADO VISA</span>
            </span>

            {onCtaClick && (
              <button
                type="button"
                onClick={onCtaClick}
                className="px-3 py-1 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-md font-bold text-[10px] flex items-center gap-1 transition cursor-pointer"
                title="Personalizar este modelo na pasta"
              >
                <span>Usar Modelo</span>
                <ArrowUpRight className="w-3 h-3 text-[#00D3A1]" />
              </button>
            )}
          </div>
        </div>

        {/* Watermark in background */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.035] select-none text-8xl font-black tracking-widest text-[#000]">
          ANVISA
        </div>
      </div>

      {/* Progress Dots & Direct Slide Jump Indicator */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {SLIDES_DATA.map((slide, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              idx === currentIndex
                ? 'w-6 bg-[#00D3A1] shadow-sm shadow-[#00D3A1]/40'
                : 'w-2 bg-[#27384E] hover:bg-[#475569]'
            }`}
            title={`Ver ${slide.code}: ${slide.title}`}
          />
        ))}
      </div>
    </div>
  );
};
