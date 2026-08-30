import React, { useState } from 'react';
import {
  BookOpen,
  ExternalLink,
  FileText,
  FlaskConical,
  GraduationCap,
  Info,
  Layers,
  Microscope,
  Pill,
  Printer,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  X
} from 'lucide-react';
import { DocumentItem } from '../types';
import { PRESCRICOES_CLINICAL_EVIDENCE, getClinicalEvidenceForDoc } from '../data/prescricoes-evidence';
import { POPS_PRESCRICOES_ESTETICAS } from '../data/prescricoes-esteticas';

interface ScientificEvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDoc?: DocumentItem | null;
  onSelectDoc?: (docId: string) => void;
  onToast?: (msg: string) => void;
}

export const ScientificEvidenceModal: React.FC<ScientificEvidenceModalProps> = ({
  isOpen,
  onClose,
  currentDoc,
  onSelectDoc,
  onToast
}) => {
  const [activeTab, setActiveTab] = useState<'references' | 'rationale' | 'actives' | 'safety'>('references');
  const [selectedDocId, setSelectedDocId] = useState<string>(
    currentDoc?.id && PRESCRICOES_CLINICAL_EVIDENCE[currentDoc.id]
      ? currentDoc.id
      : 'prescricao-homecare-pos-injetaveis'
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Sincroniza com documento atual quando o modal abre
  React.useEffect(() => {
    if (currentDoc?.id && PRESCRICOES_CLINICAL_EVIDENCE[currentDoc.id]) {
      setSelectedDocId(currentDoc.id);
    }
  }, [currentDoc, isOpen]);

  if (!isOpen) return null;

  const activeDoc =
    POPS_PRESCRICOES_ESTETICAS.find((d) => d.id === selectedDocId) ||
    currentDoc ||
    POPS_PRESCRICOES_ESTETICAS[0];

  const evidence =
    activeDoc?.clinicalEvidence ||
    getClinicalEvidenceForDoc(selectedDocId) ||
    PRESCRICOES_CLINICAL_EVIDENCE['prescricao-homecare-pos-injetaveis'];

  const filteredPrescriptions = POPS_PRESCRICOES_ESTETICAS.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const ev = PRESCRICOES_CLINICAL_EVIDENCE[p.id];
    const matchTitle = p.title.toLowerCase().includes(q);
    const matchIngredients = ev?.activeIngredients?.some(
      (a) => a.name.toLowerCase().includes(q) || a.mechanism.toLowerCase().includes(q)
    );
    const matchRationale = ev?.pharmacologicalRationale.toLowerCase().includes(q);
    return matchTitle || matchIngredients || matchRationale;
  });

  const handlePrintDossier = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const refsHtml = evidence.bibliographicReferences
      .map(
        (r, i) => `
        <div style="margin-bottom: 12px; padding: 8px 12px; background: #f8fafc; border-left: 3px solid #0284c7;">
          <p style="margin: 0; font-weight: bold; font-size: 13px;">${i + 1}. ${r.authorYear} - ${r.title}</p>
          <p style="margin: 3px 0; font-style: italic; font-size: 12px; color: #475569;">${r.journalOrPublisher} | ${r.doiOrPmid || ''}</p>
          <p style="margin: 3px 0; font-size: 12px; color: #1e293b;"><strong>Evidência Clínica:</strong> ${r.evidenceSummary}</p>
        </div>`
      )
      .join('');

    const activesHtml = evidence.activeIngredients
      ? `<table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px;">
          <thead>
            <tr style="background: #e2e8f0; text-align: left;">
              <th style="padding: 6px; border: 1px solid #cbd5e1;">Ativo</th>
              <th style="padding: 6px; border: 1px solid #cbd5e1;">Concentração</th>
              <th style="padding: 6px; border: 1px solid #cbd5e1;">Mecanismo Farmacológico</th>
              <th style="padding: 6px; border: 1px solid #cbd5e1;">Alvo Terapêutico</th>
              <th style="padding: 6px; border: 1px solid #cbd5e1;">Referência Chave</th>
            </tr>
          </thead>
          <tbody>
            ${evidence.activeIngredients
              .map(
                (a) => `
              <tr>
                <td style="padding: 6px; border: 1px solid #cbd5e1; font-weight: bold;">${a.name}</td>
                <td style="padding: 6px; border: 1px solid #cbd5e1; font-family: monospace;">${a.concentrationOrDose}</td>
                <td style="padding: 6px; border: 1px solid #cbd5e1;">${a.mechanism}</td>
                <td style="padding: 6px; border: 1px solid #cbd5e1;">${a.targetOrRationale}</td>
                <td style="padding: 6px; border: 1px solid #cbd5e1; font-size: 11px;">${a.keyReference}</td>
              </tr>`
              )
              .join('')}
          </tbody>
        </table>`
      : '';

    const warningsHtml = evidence.contraindicationsAndWarnings
      ? `<ul>${evidence.contraindicationsAndWarnings.map((w) => `<li style="font-size: 12px; margin-bottom: 4px;">${w}</li>`).join('')}</ul>`
      : '';

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Dossiê Científico - ${activeDoc.title}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; color: #0f172a; line-height: 1.5; }
            h1 { font-size: 18px; margin-bottom: 4px; color: #0369a1; }
            h2 { font-size: 14px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-top: 18px; color: #1e293b; }
            .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; background: #e0f2fe; color: #0369a1; font-size: 11px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0284c7; padding-bottom: 8px;">
            <div>
              <span class="badge">DOSSIÊ CIENTÍFICO E FARMACOLÓGICO</span>
              <h1>${activeDoc.title}</h1>
              <p style="margin: 0; font-size: 12px; color: #64748b;">Nível de Evidência: ${evidence.levelOfEvidence} | Categoria: 6. Prescrições Estéticas</p>
            </div>
          </div>

          <h2>1. Racional Farmacológico & Mecanismo de Ação Celular</h2>
          <p style="font-size: 12px; text-align: justify;">${evidence.pharmacologicalRationale}</p>

          <h2>2. Janela Terapêutica & Validação Clínica</h2>
          <p style="font-size: 12px;"><strong>Janela Terapêutica (ANVISA / Farmacopeia):</strong> ${evidence.therapeuticWindow}</p>
          <p style="font-size: 12px;"><strong>Validação Clínica & Estabilidade:</strong> ${evidence.clinicalValidationNotes}</p>

          <h2>3. Tabela de Ativos & Concentrações Validadas</h2>
          ${activesHtml}

          <h2>4. Referências Bibliográficas & Estudos Indexados (PubMed / Scopus / JAAD / ABD)</h2>
          ${refsHtml}

          <h2>5. Segurança Clínica, Contraindicações e Incompatibilidades</h2>
          ${warningsHtml}

          <div style="margin-top: 30px; border-top: 1px solid #cbd5e1; padding-top: 8px; font-size: 10px; color: #94a3b8; text-align: center;">
            Documento de suporte técnico interno. Gerado para respaldo e conformidade clínica.
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 400);
  };

  return (
    <div
      id="scientific-evidence-modal-backdrop"
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-[fadeIn_0.2s_ease]"
      onClick={onClose}
    >
      <div
        id="scientific-evidence-modal-container"
        className="bg-[#081832] border border-[#173660] rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#173660] bg-[#0A1D3A] flex items-start justify-between gap-3 shrink-0">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00D3A1]/20 via-[#00B1EA]/20 to-sky-500/20 text-[#00D3A1] border border-[#00D3A1]/40 flex items-center justify-center shrink-0 mt-0.5">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#00B1EA]/20 text-[#00B1EA] border border-[#00B1EA]/30">
                  Respaldo Científico & Farmacológico
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Validação Clínica Aprovada
                </span>
                <span className="text-[10px] text-zinc-400 font-mono hidden md:inline">
                  (Visível no sistema para o profissional • Não impresso no receituário)
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-1 truncate">
                {activeDoc.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrintDossier}
              className="h-8 px-3 rounded-xl bg-[#0E274D] hover:bg-[#153868] border border-[#1E4477] text-white text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-sm"
              title="Imprimir Dossiê Científico para Defesa Técnica / Auditoria"
            >
              <Printer className="w-3.5 h-3.5 text-[#00B1EA]" />
              <span className="hidden sm:inline">Imprimir Dossiê</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-[#0E274D] hover:bg-[#153868] border border-[#1E4477] text-zinc-400 hover:text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Prescription Quick Selector Bar */}
        <div className="px-4 py-2.5 bg-[#061224] border-b border-[#173660] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 text-xs shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-zinc-400 font-semibold shrink-0 flex items-center gap-1 text-[11.5px]">
              <Pill className="w-3.5 h-3.5 text-[#00B1EA]" />
              Fórmula Selecionada:
            </span>
            <select
              value={selectedDocId}
              onChange={(e) => {
                const nextId = e.target.value;
                setSelectedDocId(nextId);
                if (onSelectDoc) onSelectDoc(nextId);
              }}
              className="bg-[#0A1D3A] border border-[#1E4477] rounded-lg px-2.5 py-1 text-zinc-200 text-xs font-medium focus:outline-none focus:border-[#00D3A1] truncate max-w-full sm:max-w-md cursor-pointer"
            >
              {POPS_PRESCRICOES_ESTETICAS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          {/* Search Box */}
          <div className="relative shrink-0">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Buscar ativo, mecanismo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-48 bg-[#161D26] border border-[#2B3A4C] rounded-lg pl-8 pr-2.5 py-1 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#00D3A1]"
            />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#202936] bg-[#11161D] px-4 gap-2 shrink-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('references')}
            className={`py-2.5 px-3 border-b-2 text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'references'
                ? 'border-[#00D3A1] text-[#00D3A1]'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Referências Bibliográficas ({evidence.bibliographicReferences.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('rationale')}
            className={`py-2.5 px-3 border-b-2 text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'rationale'
                ? 'border-[#00B1EA] text-[#00B1EA]'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Microscope className="w-3.5 h-3.5" />
            <span>Racional Farmacológico & Vias</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('actives')}
            className={`py-2.5 px-3 border-b-2 text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'actives'
                ? 'border-indigo-400 text-indigo-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Ativos & Doses Validadas ({evidence.activeIngredients?.length || 0})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('safety')}
            className={`py-2.5 px-3 border-b-2 text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'safety'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Segurança & Incompatibilidades</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: Referências Bibliográficas */}
          {activeTab === 'references' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-[#141A22] border border-[#24303E] flex items-start gap-2.5 text-xs text-zinc-300">
                <Info className="w-4 h-4 text-[#00B1EA] shrink-0 mt-0.5" />
                <p>
                  Estas referências científicas fundamentam a eficácia, mecanismo de ação e janela terapêutica dos princípios ativos desta fórmula. Elas servem de <strong>respaldo técnico e jurídico</strong> para o profissional habilitado perante auditorias, conselhos de classe e vigilância sanitária.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {evidence.bibliographicReferences.map((ref, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0A1D3A] border border-[#173660] hover:border-[#00D3A1]/50 transition space-y-2 group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="w-5 h-5 rounded-full bg-[#00B1EA]/15 text-[#00B1EA] border border-[#00B1EA]/30 flex items-center justify-center text-[10px] font-mono font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-white text-xs sm:text-[13px]">
                          {ref.authorYear}
                        </span>
                        {ref.studyType && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-700/40">
                            {ref.studyType}
                          </span>
                        )}
                      </div>
                    </div>

                    <h4 className="text-xs sm:text-[13px] font-semibold text-sky-200 pl-7 leading-snug">
                      "{ref.title}"
                    </h4>

                    <p className="text-[11.5px] text-zinc-400 font-mono pl-7">
                      <span className="text-zinc-300 font-semibold">{ref.journalOrPublisher}</span>
                      {ref.doiOrPmid && (
                        <span className="ml-2 px-1.5 py-0.5 rounded bg-[#1E293B] text-sky-400 text-[10.5px]">
                          {ref.doiOrPmid}
                        </span>
                      )}
                    </p>

                    <div className="mt-2 pl-7 pt-2 border-t border-[#1F2B3A] text-xs text-zinc-300 leading-relaxed bg-[#0F141B]/60 p-2.5 rounded-lg">
                      <strong className="text-[#00D3A1]">Conclusão / Evidência Clínica: </strong>
                      {ref.evidenceSummary}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Racional Farmacológico & Vias */}
          {activeTab === 'rationale' && (
            <div className="space-y-5">
              {/* Evidence level card */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#00D3A1]/10 via-[#00B1EA]/10 to-transparent border border-[#00D3A1]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10.5px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Classificação Oxford / Grau de Evidência
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-white mt-0.5 block text-[#00D3A1]">
                    {evidence.levelOfEvidence}
                  </span>
                </div>
                <div className="text-xs text-zinc-300 font-mono bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 shrink-0">
                  Validação Farmacopeia & ANVISA
                </div>
              </div>

              {/* Pharmacological Rationale */}
              <div className="space-y-2">
                <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <Microscope className="w-4 h-4 text-[#00B1EA]" />
                  Racional Farmacológico & Mecanismo de Ação Celular
                </h3>
                <div className="p-4 rounded-xl bg-[#131922] border border-[#233142] text-xs sm:text-[13px] text-zinc-200 leading-relaxed text-justify space-y-3 font-normal">
                  <p>{evidence.pharmacologicalRationale}</p>
                </div>
              </div>

              {/* Therapeutic Window */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#131922] border border-[#233142] space-y-1.5">
                  <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Janela Terapêutica & Faixas Validadas
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {evidence.therapeuticWindow}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#131922] border border-[#233142] space-y-1.5">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Validação Clínica & Estabilidade
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {evidence.clinicalValidationNotes}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Tabela de Ativos & Concentrações */}
          {activeTab === 'actives' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-[#141A22] border border-[#24303E] flex items-center justify-between text-xs text-zinc-300">
                <span className="font-medium">
                  Ativos farmacológicos, concentrações de eficácia comprovada e alvos celulares:
                </span>
                <span className="font-mono text-zinc-400">
                  {evidence.activeIngredients?.length || 0} Ativos Mapeados
                </span>
              </div>

              {evidence.activeIngredients && evidence.activeIngredients.length > 0 ? (
                <div className="overflow-x-auto rounded-xl border border-[#233142]">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#16202B] border-b border-[#28384C] text-zinc-300">
                        <th className="p-3 font-bold">Princípio Ativo</th>
                        <th className="p-3 font-bold">Concentração / Dose</th>
                        <th className="p-3 font-bold">Mecanismo Farmacológico</th>
                        <th className="p-3 font-bold">Alvo / Racional</th>
                        <th className="p-3 font-bold">Estudo de Referência</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1F2B3A] bg-[#111720]">
                      {evidence.activeIngredients.map((item, i) => (
                        <tr key={i} className="hover:bg-[#182330] transition">
                          <td className="p-3 font-bold text-white whitespace-nowrap">
                            <span className="text-[#00D3A1]">{item.name}</span>
                          </td>
                          <td className="p-3 font-mono font-bold text-[#00B1EA] whitespace-nowrap">
                            {item.concentrationOrDose}
                          </td>
                          <td className="p-3 text-zinc-300 min-w-[200px] leading-snug">
                            {item.mechanism}
                          </td>
                          <td className="p-3 text-zinc-300 min-w-[180px] leading-snug">
                            {item.targetOrRationale}
                          </td>
                          <td className="p-3 font-mono text-[11px] text-sky-400 whitespace-nowrap">
                            {item.keyReference}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center text-zinc-500 text-xs">
                  Nenhum ativo específico tabulado para este documento livre.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Segurança & Incompatibilidades */}
          {activeTab === 'safety' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                <h4 className="text-xs sm:text-sm font-bold text-amber-300 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  Cuidados Farmacológicos, Contraindicações e Advertências Clínicas
                </h4>
                <p className="text-xs text-amber-100/90 leading-relaxed">
                  Diretrizes de segurança para mitigação de riscos, prevenção de interações medicamentosas e proteção jurídica do profissional:
                </p>
              </div>

              <div className="space-y-2">
                {evidence.contraindicationsAndWarnings.map((warning, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-[#141A22] border border-[#24303E] flex items-start gap-2.5 text-xs text-zinc-200 leading-relaxed"
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                      !
                    </span>
                    <span>{warning}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-[#131922] border border-[#233142] space-y-2 text-xs">
                <h5 className="font-bold text-white flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#00B1EA]" />
                  Conformidade Sanitária e Farmacopeica
                </h5>
                <p className="text-zinc-400 leading-relaxed">
                  Todas as formulações seguem rigorosamente a <strong>RDC 67/2007 da ANVISA</strong> (Boas Práticas de Manipulação de Preparações Magistrais e Oficinais) e monografias da <strong>Farmacopeia Brasileira 6ª Edição</strong>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 border-t border-[#202936] bg-[#11161D] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 text-xs">
          <div className="flex items-center gap-2 text-zinc-400 text-[11.5px]">
            <BookOpen className="w-3.5 h-3.5 text-[#00D3A1]" />
            <span>
              Fonte: Artigos científicos indexados (PubMed / JAAD / ABD / Cochrane / Sociedades de Especialistas)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-[#1C2633] hover:bg-[#283749] text-zinc-300 font-bold transition cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
