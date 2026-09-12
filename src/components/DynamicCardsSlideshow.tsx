import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  FileText,
  ShieldCheck,
  Syringe,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Eye,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  ArrowRight,
  BookOpen,
  Activity,
  Zap,
  Pill,
  Search,
  LayoutGrid,
  SlidersHorizontal,
} from 'lucide-react';
import { DocumentItem, ClinicData } from '../types';
import { INITIAL_DOCUMENTS } from '../data/documents';
import { STEP_CATEGORIES, getStepCategoryForDocument } from '../utils/stepCategoryHelper';
import { A4DocumentPreviewModal } from './A4DocumentPreviewModal';

interface DynamicCardsSlideshowProps {
  documents?: DocumentItem[];
  onCtaClick?: () => void;
  onDirectAccess?: () => void;
  clinicData?: ClinicData;
  onOpenA4Modal?: (docType?: 'prescription' | 'pop' | 'tcle') => void;
}

export interface CardItem {
  id: string;
  doc: DocumentItem;
  stepCategoryName: string;
  stepNumber: number;
  categoryLabel: string;
  accentColor: string;
  anvisaRef: string;
  title: string;
  desc: string;
  code: string;
  version: string;
  keyPoints: string[];
  isUnlocked: boolean;
  cardType: 'anamnese' | 'prescription' | 'tcle' | 'caderno' | 'pop';
  primaryBtnText: string;
  previewBtnText: string;
}

// Category visual metadata helper
function getCategoryMeta(stepCategoryName: string) {
  if (stepCategoryName.includes('1.') || stepCategoryName.includes('Base')) {
    return {
      label: 'DOCUMENTO BASE ANVISA',
      color: '#10B981',
      badgeBg: 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30',
      anvisa: 'RDC 63/2011 • RDC 222/2018',
      icon: ShieldCheck
    };
  }
  if (stepCategoryName.includes('2.') || stepCategoryName.includes('Estéticos')) {
    return {
      label: 'POP PROCEDIMENTO ESTÉTICO',
      color: '#00D3A1',
      badgeBg: 'bg-[#00D3A1]/15 text-[#00D3A1] border-[#00D3A1]/30',
      anvisa: 'RDC 63/2011 • BIOSSEGURANÇA',
      icon: Syringe
    };
  }
  if (stepCategoryName.includes('3.') || stepCategoryName.includes('Laser') || stepCategoryName.includes('Tecnologias')) {
    return {
      label: 'POP LASER & TECNOLOGIA',
      color: '#6366F1',
      badgeBg: 'bg-[#6366F1]/15 text-[#818CF8] border-[#6366F1]/30',
      anvisa: 'INMETRO • RDC 63/2011',
      icon: Zap
    };
  }
  if (stepCategoryName.includes('4.') || stepCategoryName.includes('Biossegurança') || stepCategoryName.includes('CME')) {
    return {
      label: 'POP BIOSSEGURANÇA & CME',
      color: '#0EA5E9',
      badgeBg: 'bg-[#0EA5E9]/15 text-[#38BDF8] border-[#0EA5E9]/30',
      anvisa: 'NR-32 • RDC 15/2012',
      icon: Activity
    };
  }
  if (stepCategoryName.includes('5.') || stepCategoryName.includes('Cadernos') || stepCategoryName.includes('Livros')) {
    return {
      label: 'CADERNO SANITÁRIO A4',
      color: '#F59E0B',
      badgeBg: 'bg-[#F59E0B]/15 text-[#FBBF24] border-[#F59E0B]/30',
      anvisa: 'MTR SINIR • RDC 63/2011',
      icon: BookOpen
    };
  }
  // 6. Prescrições
  return {
    label: 'PRESCRIÇÃO & HOME CARE',
    color: '#EC4899',
    badgeBg: 'bg-[#EC4899]/15 text-[#F472B6] border-[#EC4899]/30',
    anvisa: 'RECEITUÁRIO MAGISTRAL',
    icon: Pill
  };
}

export const DynamicCardsSlideshow: React.FC<DynamicCardsSlideshowProps> = ({
  documents = INITIAL_DOCUMENTS,
  onCtaClick,
  onDirectAccess,
  clinicData,
  onOpenA4Modal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [isLocalA4Open, setIsLocalA4Open] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Transform DocumentItem[] from the editor into CardItem[]
  // ONLY 1 card (POP 008 Toxina Botulínica) is unlocked for full preview; all other cards are locked with full preserved data
  const allCards: CardItem[] = useMemo(() => {
    const cardsList = documents.map((doc) => {
      const stepCategoryName = getStepCategoryForDocument(doc);
      const meta = getCategoryMeta(stepCategoryName);

      // Determine card type
      const docLower = (doc.id + ' ' + doc.title + ' ' + (doc.category || '')).toLowerCase();
      let cardType: 'anamnese' | 'prescription' | 'tcle' | 'caderno' | 'pop' = 'pop';
      let primaryBtnText = 'Acessar POP no Editor';
      let previewBtnText = 'Ver Modelo A4';

      if (docLower.includes('anamnese') || docLower.includes('ficha') || docLower.includes('cadastro')) {
        cardType = 'anamnese';
        primaryBtnText = 'Acessar Ficha & Anamnese';
        previewBtnText = 'Ver Ficha em A4';
      } else if (docLower.includes('prescricao') || docLower.includes('prescrição') || docLower.includes('receituário') || stepCategoryName.includes('Prescrições')) {
        cardType = 'prescription';
        primaryBtnText = 'Estúdio de Prescrições & Fórmulas';
        previewBtnText = 'Ver Receituário A4';
      } else if (docLower.includes('tcle') || docLower.includes('consentimento') || docLower.includes('termo')) {
        cardType = 'tcle';
        primaryBtnText = 'Acessar TCLE no Editor';
        previewBtnText = 'Ver Termo TCLE A4';
      } else if (docLower.includes('caderno') || docLower.includes('livro') || stepCategoryName.includes('Cadernos')) {
        cardType = 'caderno';
        primaryBtnText = 'Acessar Caderno A4 no Editor';
        previewBtnText = 'Ver Caderno A4';
      }

      // All cards in all categories are unlocked and functional
      const isUnlocked = true;

      // Extract or generate keypoints
      const keyPoints: string[] = [];
      if (doc.adaptationNotes) {
        keyPoints.push(doc.adaptationNotes.slice(0, 65));
      }
      if (meta.anvisa) {
        keyPoints.push(`Conforme ${meta.anvisa}`);
      }
      keyPoints.push('Formato Padrão A4 com Timbre');
      keyPoints.push('100% Editável no Painel');

      return {
        id: doc.id,
        doc,
        stepCategoryName,
        stepNumber: parseInt(stepCategoryName.charAt(0)) || 1,
        categoryLabel: meta.label,
        accentColor: meta.color,
        anvisaRef: meta.anvisa,
        title: doc.title,
        desc: doc.adaptationNotes || doc.shortDescription || 'Procedimento padronizado em conformidade sanitária e biossegurança.',
        code: doc.id.toUpperCase().replace(/^DOC-|^POP-|^LIVRO-|^CADERNO-|^PRESCRICAO-/, 'POP-').slice(0, 16),
        version: doc.version || '5.0 (2026)',
        keyPoints: keyPoints.slice(0, 4),
        isUnlocked,
        cardType,
        primaryBtnText,
        previewBtnText,
      };
    });

    return cardsList;
  }, [documents]);

  // Filter cards by category and search
  const filteredCards = useMemo(() => {
    return allCards.filter((card) => {
      const matchesCat =
        activeCategory === 'all' ||
        card.stepCategoryName === activeCategory ||
        card.stepCategoryName.includes(activeCategory);

      const matchesSearch =
        !searchQuery.trim() ||
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.stepCategoryName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCat && matchesSearch;
    });
  }, [allCards, activeCategory, searchQuery]);

  // Reset index when category or search changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory, searchQuery]);

  // Slideshow auto-rotation
  useEffect(() => {
    if (!isPlaying || filteredCards.length <= 1 || viewMode === 'grid') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, filteredCards.length, viewMode]);

  const handleNext = () => {
    if (filteredCards.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    if (filteredCards.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const openA4Preview = (card?: CardItem) => {
    const targetCard = card || currentCard;
    const docTypeParam = targetCard?.cardType === 'prescription' ? 'prescription' : targetCard?.cardType === 'tcle' ? 'tcle' : 'pop';
    if (onOpenA4Modal) {
      onOpenA4Modal(docTypeParam);
    } else {
      setIsLocalA4Open(true);
    }
  };

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  return (
    <div className="w-full space-y-6" id="amostra-dinamica">
      {/* Category Filters Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider font-mono">
              Categorias do Acervo ({allCards.length} docs):
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="bg-[#131D2E] p-1 rounded-xl border border-[#1E293B] flex items-center gap-1">
              <button
                type="button"
                onClick={() => setViewMode('carousel')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                  viewMode === 'carousel'
                    ? 'bg-[#00D3A1] text-black shadow-sm'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
                title="Visualização em Slideshow"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Slides</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#00D3A1] text-black shadow-sm'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
                title="Visualização em Grade de Cards"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grade ({filteredCards.length})</span>
              </button>
            </div>

            {/* Quick Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
              <input
                type="text"
                placeholder="Buscar documento..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#0A101A] border border-[#1E293B] focus:border-[#00D3A1] text-white text-xs pl-8 pr-3 py-1.5 rounded-xl outline-none w-36 sm:w-48 transition"
              />
            </div>
          </div>
        </div>

        {/* Categories Tab Buttons */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#00D3A1] text-black shadow-md shadow-[#00D3A1]/20 font-black'
                : 'bg-[#131D2E] text-[#94A3B8] hover:text-white border border-[#1E293B]'
            }`}
          >
            <span>Todos os Documentos</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono">
              {allCards.length}
            </span>
          </button>

          {STEP_CATEGORIES.map((cat) => {
            const count = allCards.filter((c) => c.stepCategoryName === cat.name).length;
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.name)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#00D3A1] text-black shadow-md shadow-[#00D3A1]/20 font-black'
                    : 'bg-[#131D2E] text-[#94A3B8] hover:text-white border border-[#1E293B]'
                }`}
              >
                <span>{cat.shortName}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW MODE: CAROUSEL SLIDESHOW */}
      {viewMode === 'carousel' && (
        <div className="relative">
          {filteredCards.length === 0 ? (
            <div className="p-12 text-center bg-[#0D1522] border border-[#1E293B] rounded-3xl text-[#94A3B8]">
              <FileText className="w-8 h-8 mx-auto mb-2 text-[#64748B]" />
              <p className="text-sm">Nenhum documento encontrado para a busca informada.</p>
            </div>
          ) : (
            <div className="relative group">
              {/* Active Card Featured Display */}
              <div
                onClick={() => openA4Preview(currentCard)}
                className={`bg-gradient-to-b from-[#111A29] to-[#0A101A] border-2 ${
                  currentCard.isUnlocked ? 'border-[#00D3A1]' : 'border-[#1E293B] hover:border-[#00D3A1]/60'
                } rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-2xl relative overflow-hidden cursor-pointer group/card`}
                title="Clique para visualizar o modelo oficial completo em A4"
              >
                {/* Glow accent */}
                <div
                  className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 blur-3xl opacity-20 rounded-full"
                  style={{ backgroundColor: currentCard.accentColor }}
                />

                {/* Floating Click-to-Expand Indicator */}
                <div className="absolute top-4 right-4 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#081832] border border-[#00D3A1]/50 text-emerald-300 text-xs font-black group-hover/card:bg-[#00D3A1] group-hover/card:text-black transition shadow-md">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Ver Modelo A4</span>
                </div>

                {/* Card Top Row: Category badge + ANVISA tag + Status */}
                <div className="flex items-center justify-between gap-3 flex-wrap border-b border-[#1E293B] pb-4 mb-4 pr-0 sm:pr-44">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border"
                      style={{
                        backgroundColor: `${currentCard.accentColor}20`,
                        color: currentCard.accentColor,
                        borderColor: `${currentCard.accentColor}40`,
                      }}
                    >
                      {currentCard.categoryLabel}
                    </span>
                    <span className="text-[10px] text-[#94A3B8] font-mono bg-[#1E293B] px-2 py-0.5 rounded">
                      {currentCard.anvisaRef}
                    </span>
                  </div>

                  {/* Status badge */}
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#00D3A1] bg-[#00D3A1]/15 border border-[#00D3A1]/40 px-3 py-1 rounded-full shadow-sm">
                      <CheckCircle2 className="w-3 h-3 text-[#00D3A1]" />
                      <span>MODELO OFICIAL • 100% EDITÁVEL NO PAINEL</span>
                    </span>
                  </div>
                </div>

                {/* Card Title & Code */}
                <div className="space-y-2 mb-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight group-hover/card:text-[#00D3A1] transition">
                      {currentCard.title}
                    </h3>
                    <span className="text-xs font-mono font-bold text-[#64748B] shrink-0 bg-[#0A101A] px-2.5 py-1 rounded border border-[#1E293B]">
                      {currentCard.code}
                    </span>
                  </div>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {currentCard.desc}
                  </p>
                </div>

                {/* Highlights / Key Points Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                  {currentCard.keyPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-[#0A101A] border border-[#1E293B] p-2.5 rounded-xl text-xs text-[#CBD5E1]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#00D3A1] shrink-0" />
                      <span className="truncate">{point}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons Section */}
                <div
                  className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#1E293B]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Button 1: Contextual Access in Editor (Ficha, Anamnese, Prescrição, POP, TCLE, Caderno) */}
                    <button
                      type="button"
                      onClick={onDirectAccess || onCtaClick}
                      className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#00D3A1] via-[#00B1EA] to-[#00D3A1] hover:brightness-110 text-black font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-[#00D3A1]/25 transition transform active:scale-95 cursor-pointer"
                    >
                      <span>{currentCard.primaryBtnText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Button 2: Specific Preview Button for A4 Modal */}
                    <button
                      type="button"
                      onClick={() => openA4Preview(currentCard)}
                      className="px-5 py-3.5 rounded-2xl bg-[#081832] hover:bg-[#0E274D] border-2 border-[#00D3A1]/50 hover:border-[#00D3A1] text-emerald-300 font-extrabold text-xs sm:text-sm flex items-center gap-2 transition transform active:scale-95 cursor-pointer"
                      title="Visualizar modelo completo no formato e proporção real A4"
                    >
                      <Eye className="w-4 h-4 text-[#00D3A1]" />
                      <span>{currentCard.previewBtnText}</span>
                    </button>
                  </div>

                  <div className="text-xs text-[#94A3B8] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00D3A1]" />
                    <span>Acervo com {allCards.length} documentos oficiais</span>
                  </div>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center justify-between gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="w-9 h-9 rounded-xl bg-[#131D2E] hover:bg-[#1E293B] border border-[#1E293B] text-white flex items-center justify-center transition cursor-pointer shadow"
                    title="Documento Anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-9 h-9 rounded-xl bg-[#131D2E] hover:bg-[#1E293B] border border-[#1E293B] text-white flex items-center justify-center transition cursor-pointer shadow"
                    title={isPlaying ? 'Pausar Slideshow' : 'Iniciar Slideshow'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 text-[#00D3A1]" /> : <Play className="w-4 h-4 text-[#00D3A1]" />}
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-9 h-9 rounded-xl bg-[#131D2E] hover:bg-[#1E293B] border border-[#1E293B] text-white flex items-center justify-center transition cursor-pointer shadow"
                    title="Próximo Documento"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <span className="text-xs font-mono text-[#94A3B8] ml-2">
                    <strong className="text-white">{currentIndex + 1}</strong> de {filteredCards.length}
                  </span>
                </div>

                {/* Direct CTA */}
                <button
                  type="button"
                  onClick={onDirectAccess || onCtaClick}
                  className="text-xs text-[#00D3A1] hover:text-[#34d399] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>Abrir Acervo Completo ({allCards.length} docs) no Editor</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE: GRID CARDS */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              onClick={() => openA4Preview(card)}
              className="bg-gradient-to-b from-[#111A29] to-[#0A101A] border border-[#1E293B] hover:border-[#00D3A1] rounded-2xl p-5 transition flex flex-col justify-between cursor-pointer group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span
                    className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border truncate max-w-[170px]"
                    style={{
                      backgroundColor: `${card.accentColor}20`,
                      color: card.accentColor,
                      borderColor: `${card.accentColor}40`,
                    }}
                  >
                    {card.categoryLabel}
                  </span>

                  <span className="text-[9px] font-black text-[#00D3A1] bg-[#00D3A1]/15 border border-[#00D3A1]/30 px-2 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5 text-[#00D3A1]" />
                    DISPONÍVEL
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white leading-snug line-clamp-2 mb-1.5 group-hover:text-[#00D3A1] transition">
                  {card.title}
                </h4>
                <p className="text-[11px] text-[#94A3B8] line-clamp-2 leading-relaxed mb-3">
                  {card.desc}
                </p>
              </div>

              <div
                className="pt-3 border-t border-[#1E293B] flex items-center justify-between gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => openA4Preview(card)}
                  className="flex-1 py-2 px-2.5 rounded-xl bg-[#081832] hover:bg-[#0E274D] border border-[#00D3A1]/40 text-emerald-300 text-[11px] font-bold flex items-center justify-center gap-1 transition cursor-pointer truncate"
                  title={card.previewBtnText}
                >
                  <Eye className="w-3 h-3 text-[#00D3A1] shrink-0" />
                  <span className="truncate">{card.previewBtnText}</span>
                </button>

                <button
                  type="button"
                  onClick={onDirectAccess || onCtaClick}
                  className="py-2 px-3 rounded-xl bg-[#00D3A1] hover:bg-[#00D3A1]/90 text-black text-[11px] font-black flex items-center justify-center gap-1 transition cursor-pointer shadow-sm shrink-0"
                >
                  <span>Abrir</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Standalone Fallback A4 Preview Modal */}
      <A4DocumentPreviewModal
        isOpen={isLocalA4Open}
        onClose={() => setIsLocalA4Open(false)}
        onAccessEditor={onDirectAccess || onCtaClick || (() => {})}
        clinicData={clinicData}
        initialDocType="pop"
      />
    </div>
  );
};
