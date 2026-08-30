import React, { useState, useMemo, useEffect } from 'react';
import {
  Building2,
  ShieldCheck,
  Zap,
  Activity,
  BookOpen,
  FileCheck,
  Scale,
  Sparkles,
  Plus,
  Search,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Edit3,
  Sliders,
  ChevronRight,
  ChevronDown,
  Printer,
  Trash2,
  Copy,
  FolderPlus,
  Layers,
  Check,
  Filter,
  Syringe,
  Droplets,
  Flame,
  Wand2,
  GripVertical,
  MoveRight,
  FolderOpen,
  ArrowUp,
  ArrowDown,
  ArrowUpToLine,
  ArrowDownToLine,
  RotateCcw,
  FolderMinus,
  UserCheck,
  Camera,
  Stethoscope,
  FileCheck2,
  ShieldAlert,
  FileText,
  Pill,
  GraduationCap
} from 'lucide-react';
import { DocumentItem, ClinicData, DocumentStatus } from '../types';
import { ScientificEvidenceModal } from './ScientificEvidenceModal';
import { getClinicalEvidenceForDoc } from '../data/prescricoes-evidence';
import {
  STEP_CATEGORIES,
  getStepCategoryForDocument,
  getDocumentIcon,
  getDocumentShortDescription,
  getDocumentProgress,
  getDocumentStatus,
  formatLastActivity,
  StepCategoryDef,
  getSavedCustomCategories,
  saveCustomCategories,
  getDeletedCategoryNames,
  saveDeletedCategoryNames,
  getAllCategories,
  isCategory2Or3Document
} from '../utils/stepCategoryHelper';
import {
  ClinicalDocType,
  CLINICAL_DOC_TYPES,
  ClinicalDocDefinition,
  getClinicalButtonsConfig,
  identifyProcedureContext,
  getInitialPatientState
} from '../utils/procedureClinicalDocsHelper';
import { InteractivePrescriptionBuilder } from './InteractivePrescriptionBuilder';
import { CardEditModal } from './CardEditModal';
import { AddDocumentModal } from './AddDocumentModal';
import { CreateCategoryModal } from './CreateCategoryModal';
import { DeleteCategoryModal } from './DeleteCategoryModal';
import { DeleteCardModal } from './DeleteCardModal';
import { ProcedureClinicalDocsModal } from './ProcedureClinicalDocsModal';
import { ClinicalButtonsConfigModal } from './ClinicalButtonsConfigModal';

interface StepCategoriesViewProps {
  clinicData: ClinicData;
  documents: DocumentItem[];
  currentThemeColor: string;
  onOpenDoc: (docId: string) => void;
  onUpdateDoc: (updatedDoc: DocumentItem) => void;
  onReorderDocs?: (reorderedDocs: DocumentItem[]) => void;
  onAddDoc: (newDoc: DocumentItem) => void;
  onDeleteDoc?: (docId: string) => void;
  onDeleteCategory?: (
    catName: string,
    deleteMode: 'deleteDocs' | 'moveTo',
    targetCategoryName?: string
  ) => void;
  onOpenClinicModal: () => void;
  onSwitchToBatchMode: () => void;
  onToast: (msg: string) => void;
}

export const StepCategoriesView: React.FC<StepCategoriesViewProps> = ({
  clinicData,
  documents,
  currentThemeColor,
  onOpenDoc,
  onUpdateDoc,
  onReorderDocs,
  onAddDoc,
  onDeleteDoc,
  onDeleteCategory,
  onOpenClinicModal,
  onSwitchToBatchMode,
  onToast,
}) => {
  // Custom categories state with localStorage persistence
  const [customCategories, setCustomCategories] = useState<StepCategoryDef[]>(() =>
    getSavedCustomCategories()
  );

  // Deleted category names state with localStorage persistence
  const [deletedCategoryNames, setDeletedCategoryNames] = useState<string[]>(() =>
    getDeletedCategoryNames()
  );

  // All combined active categories
  const allCategories = useMemo(() => {
    return getAllCategories(customCategories, deletedCategoryNames);
  }, [customCategories, deletedCategoryNames]);

  const [selectedCategoryName, setSelectedCategoryName] = useState<string>(
    '1. Documentos Base e ANVISA'
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'completo' | 'em_edicao' | 'pendente'>('todos');
  
  // Drag and Drop States
  const [draggedDocId, setDraggedDocId] = useState<string | null>(null);
  const [dragOverCategoryName, setDragOverCategoryName] = useState<string | null>(null);
  const [dragOverDocId, setDragOverDocId] = useState<string | null>(null);
  const [dragOverDocPosition, setDragOverDocPosition] = useState<'before' | 'after' | null>(null);

  // Modais
  const [editingDoc, setEditingDoc] = useState<DocumentItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<StepCategoryDef | null>(null);
  const [cardToDelete, setCardToDelete] = useState<DocumentItem | null>(null);
  const [activeMenuDocId, setActiveMenuDocId] = useState<string | null>(null);
  const [movingDocMenuId, setMovingDocMenuId] = useState<string | null>(null);
  const [clinicalDocsDoc, setClinicalDocsDoc] = useState<DocumentItem | null>(null);
  const [clinicalDocsInitialTab, setClinicalDocsInitialTab] = useState<ClinicalDocType>('ficha_paciente');
  const [openClinicalDropdownDocId, setOpenClinicalDropdownDocId] = useState<string | null>(null);
  const [configButtonsDoc, setConfigButtonsDoc] = useState<DocumentItem | null>(null);
  const [buttonsVersion, setButtonsVersion] = useState<number>(0);
  const [scientificModalDoc, setScientificModalDoc] = useState<DocumentItem | null>(null);
  const [isScientificModalOpen, setIsScientificModalOpen] = useState<boolean>(false);
  const [prescriptionDoc, setPrescriptionDoc] = useState<DocumentItem | null>(null);

  const handleOpenClinicalDoc = (doc: DocumentItem, docType: ClinicalDocType = 'ficha_paciente') => {
    if (docType === 'prescricao') {
      setPrescriptionDoc(doc);
      setActiveMenuDocId(null);
      setOpenClinicalDropdownDocId(null);
      return;
    }
    setClinicalDocsDoc(doc);
    setClinicalDocsInitialTab(docType);
    setActiveMenuDocId(null);
    setOpenClinicalDropdownDocId(null);
  };

  const handleOpenPrescriptionBuilder = (doc: DocumentItem) => {
    setPrescriptionDoc(doc);
    setActiveMenuDocId(null);
    setOpenClinicalDropdownDocId(null);
  };

  // Keep selected category valid if deleted
  useEffect(() => {
    if (allCategories.length > 0 && !allCategories.some((c) => c.name === selectedCategoryName)) {
      setSelectedCategoryName(allCategories[0].name);
    }
  }, [allCategories, selectedCategoryName]);

  // Group documents by Step Category
  const docsByCategory = useMemo(() => {
    const map = new Map<string, DocumentItem[]>();
    allCategories.forEach((cat) => {
      map.set(cat.name, []);
    });

    documents.forEach((doc) => {
      const catName = getStepCategoryForDocument(doc);
      if (!map.has(catName)) {
        map.set(catName, []);
      }
      map.get(catName)!.push(doc);
    });

    return map;
  }, [documents, allCategories]);

  const currentCategoryDef = allCategories.find(
    (c) => c.name === selectedCategoryName
  ) || allCategories[0] || STEP_CATEGORIES[0];

  const categoryDocs = docsByCategory.get(selectedCategoryName) || [];

  // Filter by search & status
  const filteredCategoryDocs = categoryDocs.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.adaptationNotes && doc.adaptationNotes.toLowerCase().includes(searchTerm.toLowerCase()));
    const docStatus = getDocumentStatus(doc);
    const matchesStatus = statusFilter === 'todos' || docStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate overall stats
  const totalCategoryDocs = categoryDocs.length;
  const completedCategoryDocs = categoryDocs.filter(
    (d) => getDocumentStatus(d) === 'completo'
  ).length;
  const inProgressCategoryDocs = categoryDocs.filter(
    (d) => getDocumentStatus(d) === 'em_edicao'
  ).length;
  const categoryProgress =
    totalCategoryDocs > 0
      ? Math.round(
          categoryDocs.reduce((acc, d) => acc + getDocumentProgress(d), 0) /
            totalCategoryDocs
        )
      : 0;

  // Move document to a specific category (called by Drag & Drop or Click Menu)
  const handleMoveDocToCategory = (docId: string, targetCategoryName: string) => {
    const docToMove = documents.find((d) => d.id === docId);
    if (!docToMove) return;

    const currentCat = getStepCategoryForDocument(docToMove);
    if (currentCat === targetCategoryName) {
      onToast('O documento já está nesta categoria.');
      return;
    }

    const updatedDoc: DocumentItem = {
      ...docToMove,
      stepCategory: targetCategoryName,
      lastModified: new Date().toISOString().split('T')[0],
      lastActivity: 'Hoje, ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    onUpdateDoc(updatedDoc);
    setActiveMenuDocId(null);
    setMovingDocMenuId(null);
    onToast(`🎉 Documento "${docToMove.title.substring(0, 26)}..." movido para ${targetCategoryName}!`);
  };

  // Reorder document position within the category
  const handleReorderDocPosition = (docId: string, direction: 'up' | 'down' | 'top' | 'bottom') => {
    const currentList = [...documents];
    const categoryDocList = [...categoryDocs];
    const currentIndex = categoryDocList.findIndex((d) => d.id === docId);
    if (currentIndex === -1) return;

    let targetIndex = currentIndex;
    if (direction === 'up' && currentIndex > 0) targetIndex = currentIndex - 1;
    else if (direction === 'down' && currentIndex < categoryDocList.length - 1) targetIndex = currentIndex + 1;
    else if (direction === 'top') targetIndex = 0;
    else if (direction === 'bottom') targetIndex = categoryDocList.length - 1;

    if (targetIndex === currentIndex) return;

    const [movedItem] = categoryDocList.splice(currentIndex, 1);
    categoryDocList.splice(targetIndex, 0, movedItem);

    // Reconstruct full list preserving items in other categories
    let catIndex = 0;
    const newDocuments = currentList.map((doc) => {
      if (getStepCategoryForDocument(doc) === selectedCategoryName) {
        return categoryDocList[catIndex++];
      }
      return doc;
    });

    if (onReorderDocs) {
      onReorderDocs(newDocuments);
    }
    setActiveMenuDocId(null);
    onToast(`Posição de "${movedItem.title.substring(0, 24)}..." alterada!`);
  };

  // Drag over card to reorder
  const handleCardDragOver = (e: React.DragEvent, targetDocId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!draggedDocId || draggedDocId === targetDocId) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    const position = e.clientY < midY ? 'before' : 'after';

    setDragOverDocId(targetDocId);
    setDragOverDocPosition(position);
  };

  const handleCardDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverDocId(null);
    setDragOverDocPosition(null);
  };

  const handleCardDrop = (e: React.DragEvent, targetDocId: string) => {
    e.preventDefault();
    e.stopPropagation();

    const sourceDocId = e.dataTransfer.getData('text/plain') || draggedDocId;
    if (!sourceDocId || sourceDocId === targetDocId) {
      setDraggedDocId(null);
      setDragOverDocId(null);
      setDragOverDocPosition(null);
      return;
    }

    const sourceDoc = documents.find((d) => d.id === sourceDocId);
    if (!sourceDoc) return;

    const sourceCat = getStepCategoryForDocument(sourceDoc);

    // If dragged from another category, move it to this category and insert at position
    if (sourceCat !== selectedCategoryName) {
      const updatedSourceDoc: DocumentItem = {
        ...sourceDoc,
        stepCategory: selectedCategoryName,
        lastModified: new Date().toISOString().split('T')[0],
      };

      const categoryDocList = [...categoryDocs];
      const targetIndex = categoryDocList.findIndex((d) => d.id === targetDocId);
      const insertIndex = dragOverDocPosition === 'after' ? targetIndex + 1 : targetIndex;

      if (targetIndex !== -1) {
        categoryDocList.splice(Math.max(0, insertIndex), 0, updatedSourceDoc);
      } else {
        categoryDocList.push(updatedSourceDoc);
      }

      // Rebuild
      const remainingDocs = documents.filter((d) => d.id !== sourceDocId);
      let catIndex = 0;
      const newDocs = remainingDocs.map((doc) => {
        if (getStepCategoryForDocument(doc) === selectedCategoryName) {
          return categoryDocList[catIndex++];
        }
        return doc;
      });
      // Append any remaining
      while (catIndex < categoryDocList.length) {
        newDocs.push(categoryDocList[catIndex++]);
      }

      if (onReorderDocs) onReorderDocs(newDocs);
      else onUpdateDoc(updatedSourceDoc);

      onToast(`Card movido para ${selectedCategoryName} e reposicionado!`);
    } else {
      // Reordering within the same category
      const categoryDocList = [...categoryDocs];
      const sourceIndex = categoryDocList.findIndex((d) => d.id === sourceDocId);
      let targetIndex = categoryDocList.findIndex((d) => d.id === targetDocId);

      if (sourceIndex !== -1 && targetIndex !== -1) {
        const [moved] = categoryDocList.splice(sourceIndex, 1);
        if (dragOverDocPosition === 'after' && sourceIndex < targetIndex) {
          targetIndex = targetIndex; // adjusted
        } else if (dragOverDocPosition === 'after') {
          targetIndex = targetIndex + 1;
        }
        categoryDocList.splice(targetIndex, 0, moved);

        let catIndex = 0;
        const newDocs = documents.map((doc) => {
          if (getStepCategoryForDocument(doc) === selectedCategoryName) {
            return categoryDocList[catIndex++];
          }
          return doc;
        });

        if (onReorderDocs) {
          onReorderDocs(newDocs);
        }
        onToast(`Ordem dos cards reposicionada com sucesso!`);
      }
    }

    setDraggedDocId(null);
    setDragOverDocId(null);
    setDragOverDocPosition(null);
  };

  // Create new custom category
  const handleCreateCategory = (newCat: StepCategoryDef) => {
    const updated = [...customCategories, newCat];
    setCustomCategories(updated);
    saveCustomCategories(updated);
    setSelectedCategoryName(newCat.name);
    onToast(`🎉 Categoria "${newCat.name}" criada com sucesso! Agora você pode arrastar cards para ela.`);
  };

  // Trigger Delete Category Modal
  const handleOpenDeleteCategoryModal = (cat: StepCategoryDef) => {
    setCategoryToDelete(cat);
  };

  // Confirm Delete Category (Custom or Standard)
  const handleConfirmDeleteCategory = (
    catName: string,
    deleteMode: 'deleteDocs' | 'moveTo',
    targetCategoryName?: string
  ) => {
    if (onDeleteCategory) {
      onDeleteCategory(catName, deleteMode, targetCategoryName);
    } else {
      // Local fallback
      const docsInCat = docsByCategory.get(catName) || [];
      if (deleteMode === 'deleteDocs') {
        docsInCat.forEach((d) => {
          if (onDeleteDoc) onDeleteDoc(d.id);
        });
      } else {
        const targetCat = targetCategoryName || '1. Documentos Base e ANVISA';
        docsInCat.forEach((d) => {
          onUpdateDoc({
            ...d,
            stepCategory: targetCat,
          });
        });
      }

      const updatedCustom = customCategories.filter((c) => c.name !== catName);
      setCustomCategories(updatedCustom);
      saveCustomCategories(updatedCustom);

      const deleted = getDeletedCategoryNames();
      if (!deleted.includes(catName)) {
        const newDel = [...deleted, catName];
        saveDeletedCategoryNames(newDel);
        setDeletedCategoryNames(newDel);
      }
    }

    // Switch to first remaining category
    const remaining = allCategories.filter((c) => c.name !== catName);
    if (remaining.length > 0) {
      setSelectedCategoryName(remaining[0].name);
    }
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, doc: DocumentItem) => {
    e.dataTransfer.setData('text/plain', doc.id);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedDocId(doc.id);
  };

  const handleDragEnd = () => {
    setDraggedDocId(null);
    setDragOverCategoryName(null);
    setDragOverDocId(null);
    setDragOverDocPosition(null);
  };

  const handleDragOverCategory = (e: React.DragEvent, catName: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverCategoryName !== catName) {
      setDragOverCategoryName(catName);
    }
  };

  const handleDragLeaveCategory = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverCategoryName(null);
  };

  const handleDropOnCategory = (e: React.DragEvent, targetCatName: string) => {
    e.preventDefault();
    const docId = e.dataTransfer.getData('text/plain') || draggedDocId;
    if (docId) {
      handleMoveDocToCategory(docId, targetCatName);
    }
    setDraggedDocId(null);
    setDragOverCategoryName(null);
    setDragOverDocId(null);
    setDragOverDocPosition(null);
  };

  // Icon mapping
  const renderCategoryIcon = (iconName: string, className = 'w-4 h-4') => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'Syringe':
        return <Syringe className={className} />;
      case 'Droplets':
        return <Droplets className={className} />;
      case 'Flame':
        return <Flame className={className} />;
      case 'Wand2':
        return <Wand2 className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Zap':
        return <Zap className={className} />;
      case 'Activity':
        return <Activity className={className} />;
      case 'BookOpen':
        return <BookOpen className={className} />;
      case 'FileCheck':
        return <FileCheck className={className} />;
      case 'Scale':
        return <Scale className={className} />;
      case 'Building2':
        return <Building2 className={className} />;
      case 'Pill':
        return <Pill className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  const renderCardIcon = (iconType: string) => {
    switch (iconType) {
      case 'Trash2':
        return <Trash2 className="w-5 h-5 text-emerald-500" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-emerald-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
      case 'Syringe':
        return <Syringe className="w-5 h-5 text-[#00D3A1]" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-orange-400" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-amber-500" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-indigo-400" />;
      case 'Activity':
      case 'CheckCircle2':
        return <Activity className="w-5 h-5 text-sky-400" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-amber-400" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-pink-400" />;
      case 'Scale':
        return <Scale className="w-5 h-5 text-purple-400" />;
      case 'Pill':
        return <Pill className="w-5 h-5 text-pink-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-emerald-400" />;
    }
  };

  const handleQuickStatusChange = (doc: DocumentItem, newStatus: DocumentStatus) => {
    const newProgress = newStatus === 'completo' ? 100 : newStatus === 'pendente' ? 45 : 75;
    onUpdateDoc({
      ...doc,
      status: newStatus,
      progress: newProgress,
      lastModified: new Date().toISOString().split('T')[0],
      lastActivity: 'Hoje, ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    });
    setActiveMenuDocId(null);
    onToast(`Status de "${doc.title.substring(0, 25)}..." atualizado para ${newStatus.toUpperCase()}`);
  };

  const draggedDoc = draggedDocId ? documents.find((d) => d.id === draggedDocId) : null;

  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-fadeIn font-sans relative">
      {/* ========================================================================= */}
      {/* FLOATING DRAG INSTRUCTION BANNER (WHEN DRAGGING) */}
      {/* ========================================================================= */}
      {draggedDoc && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-black px-6 py-3 rounded-full shadow-2xl font-bold text-xs sm:text-sm flex items-center gap-3 border-2 border-white animate-bounce">
          <GripVertical className="w-5 h-5" />
          <span>
            Arrastando "<strong>{draggedDoc.title.substring(0, 30)}...</strong>" → Solte sobre qualquer categoria na barra lateral!
          </span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. SIDEBAR ESQUERDA: CATEGORIAS PASSO A PASSO (DROP ZONES) */}
      {/* ========================================================================= */}
      <aside className="w-full lg:w-80 shrink-0 space-y-4">
        {/* Header da Sidebar */}
        <div className="bg-[#121212] border border-[#262626] rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-zinc-400">
                CATEGORIAS
              </span>
              <span className="text-[10px] bg-zinc-800 text-zinc-400 font-bold px-2 py-0.5 rounded-full">
                {allCategories.length}
              </span>
            </div>
            
            {/* Botão Criar Categoria */}
            <button
              type="button"
              onClick={() => setIsCreateCategoryModalOpen(true)}
              className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 active:scale-95 cursor-pointer"
              title="Criar nova categoria personalizada"
            >
              <Plus className="w-3 h-3" />
              <span>+ Criar Categoria</span>
            </button>
          </div>

          <p className="text-[11px] text-zinc-500 mb-3 leading-relaxed">
            💡 <strong>Dica:</strong> Arraste qualquer card para a categoria desejada ou use o botão <strong>+ Criar Categoria</strong>.
          </p>

          {/* Lista de Categorias Passo a Passo como Drop Zones */}
          <div className="space-y-1.5">
            {allCategories.map((cat) => {
              const isSelected = selectedCategoryName === cat.name;
              const isDragOver = dragOverCategoryName === cat.name;
              const count = (docsByCategory.get(cat.name) || []).length;

              return (
                <div
                  key={cat.id}
                  onDragOver={(e) => handleDragOverCategory(e, cat.name)}
                  onDragLeave={handleDragLeaveCategory}
                  onDrop={(e) => handleDropOnCategory(e, cat.name)}
                  onClick={() => setSelectedCategoryName(cat.name)}
                  className={`w-full text-left p-2.5 rounded-xl transition-all duration-200 flex items-center justify-between group cursor-pointer relative ${
                    isDragOver
                      ? 'bg-emerald-500/25 border-2 border-emerald-400 scale-[1.02] shadow-lg shadow-emerald-500/20 text-white'
                      : isSelected
                      ? 'bg-zinc-800 text-white font-bold shadow-sm border border-zinc-700'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/80 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition ${
                        isDragOver
                          ? 'bg-emerald-400 text-black animate-pulse'
                          : isSelected
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-zinc-900/80 text-zinc-500 group-hover:text-zinc-300'
                      }`}
                      style={{
                        color: isSelected && !isDragOver ? cat.accentColor : undefined,
                      }}
                    >
                      {renderCategoryIcon(cat.iconName, 'w-3.5 h-3.5')}
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <span className="text-xs leading-tight break-words block">{cat.name}</span>
                      {cat.isCustom && (
                        <span className="text-[9px] text-purple-400 font-semibold uppercase tracking-wider block">
                          Personalizada
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Feedback ao passar card arrastado */}
                    {isDragOver ? (
                      <span className="text-[10px] font-black bg-emerald-400 text-black px-2 py-0.5 rounded-md animate-pulse">
                        Solte Aqui 📥
                      </span>
                    ) : (
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full shrink-0 ${
                          isSelected
                            ? 'bg-zinc-700 text-white'
                            : 'bg-zinc-900 text-zinc-500 group-hover:text-zinc-400'
                        }`}
                      >
                        {count}
                      </span>
                    )}

                    {/* Botão de excluir qualquer categoria */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDeleteCategoryModal(cat);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-rose-400 transition rounded"
                      title={`Excluir categoria "${cat.name}"`}
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Restaurar categorias padrão se houver alguma excluída */}
            {deletedCategoryNames.length > 0 && (
              <div className="pt-2 border-t border-zinc-800/80 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    saveDeletedCategoryNames([]);
                    setDeletedCategoryNames([]);
                    onToast('Todas as categorias padrão foram restauradas!');
                  }}
                  className="w-full text-center py-2 px-2.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-500/40 text-[11px] text-zinc-400 hover:text-emerald-400 flex items-center justify-center gap-1.5 transition active:scale-95"
                  title="Restaurar categorias excluídas"
                >
                  <RotateCcw className="w-3 h-3 text-emerald-400" />
                  <span>Restaurar {deletedCategoryNames.length} Categoria(s)</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sublista de Documentos da Categoria Selecionada na Sidebar */}
        <div className="bg-[#121212] border border-[#262626] rounded-2xl p-4 shadow-md max-h-[480px] overflow-y-auto space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
              {currentCategoryDef.shortName}
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">
              {categoryDocs.length} itens
            </span>
          </div>

          <div className="space-y-1">
            {categoryDocs.map((doc) => {
              const status = getDocumentStatus(doc);
              const progress = getDocumentProgress(doc);
              const statusLabel =
                status === 'completo'
                  ? 'Completo'
                  : status === 'pendente'
                  ? 'Pendente'
                  : 'Em edição';

              const statusColorClass =
                status === 'completo'
                  ? 'text-emerald-400'
                  : status === 'pendente'
                  ? 'text-amber-400'
                  : 'text-zinc-400';

              return (
                <div
                  key={doc.id}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, doc)}
                  onDragEnd={handleDragEnd}
                  onClick={() => onOpenDoc(doc.id)}
                  className={`p-2.5 rounded-xl hover:bg-zinc-900 border border-transparent hover:border-zinc-800 cursor-pointer transition flex items-start justify-between gap-2 group ${
                    draggedDocId === doc.id ? 'opacity-40 border-dashed border-emerald-500' : ''
                  }`}
                  title="Arraste para mover para outra categoria"
                >
                  <div className="flex items-start gap-2.5 min-w-0 flex-1">
                    <GripVertical className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 shrink-0 cursor-grab mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[12.5px] text-zinc-200 group-hover:text-white font-medium leading-snug break-words">
                        {doc.title}
                      </div>
                      <div className="text-[10px] text-zinc-500 flex items-center gap-1.5 mt-1">
                        <span className={statusColorClass}>{progress}%</span>
                        <span>•</span>
                        <span className="capitalize">{statusLabel}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 shrink-0 mt-0.5" />
                </div>
              );
            })}
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. ÁREA PRINCIPAL: CABEÇALHO DA CLÍNICA & GRID DE CARDS COM DRAG AND DROP */}
      {/* ========================================================================= */}
      <main className="flex-1 space-y-6 min-w-0">
        {/* Top Header Card com os Dados da Clínica */}
        <div className="bg-[#121212] border border-[#262626] rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-zinc-700/60 shadow-sm"
              style={{ backgroundColor: `${currentThemeColor}15` }}
            >
              <Building2 className="w-6 h-6" style={{ color: currentThemeColor }} />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-white font-serif tracking-tight truncate">
                {clinicData.nomeClinica || 'Sua Clínica - Estética Avançada'}
              </h2>
              <div className="text-xs text-zinc-400 flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                <span>Alvará: <strong>{clinicData.alvara || '2026/VISA'}</strong></span>
                <span>•</span>
                <span>RT: <strong>{clinicData.responsavel || 'Responsável Técnico'}</strong></span>
              </div>
              <div className="text-[11px] text-zinc-500 mt-0.5 truncate">
                {clinicData.endereco ? `${clinicData.endereco} - ${clinicData.cidade || 'São Paulo - SP'}` : 'Endereço Comercial da Clínica'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Dados sincronizados</span>
            </div>
            <button
              type="button"
              onClick={onOpenClinicModal}
              className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition"
              title="Editar dados da clínica"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Header da Categoria Ativa & Filtros de Busca */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#121212]/80 border border-[#262626] rounded-2xl p-4 sm:p-5">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: currentCategoryDef.accentColor }}
              />
              <h3 className="text-base sm:text-lg font-bold text-white">
                {currentCategoryDef.name}
              </h3>
              {currentCategoryDef.isCustom && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Personalizada
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              {currentCategoryDef.description}
            </p>
          </div>

          {/* Ações e Alternador de Visão */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Input de Busca */}
            <div className="w-full sm:w-52 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center gap-2 focus-within:border-emerald-500">
              <Search className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filtrar nesta categoria..."
                className="w-full bg-transparent text-xs text-white outline-none placeholder:text-zinc-600"
              />
            </div>

            {/* Alternador de Modo */}
            <button
              onClick={onSwitchToBatchMode}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition"
              title="Visualizar em modo de seleção e personalização em lote"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>Visão em Lote</span>
            </button>

            {/* Botão Criar Categoria */}
            <button
              type="button"
              onClick={() => setIsCreateCategoryModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-purple-300 hover:text-purple-200 text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
              title="Criar nova categoria"
            >
              <FolderPlus className="w-3.5 h-3.5 text-purple-400" />
              <span>+ Categoria</span>
            </button>

            {/* Botão Excluir Categoria */}
            <button
              type="button"
              onClick={() => handleOpenDeleteCategoryModal(currentCategoryDef)}
              className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:text-rose-200 text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
              title={`Excluir categoria "${currentCategoryDef.name}"`}
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              <span>Excluir Categoria</span>
            </button>

            {/* Botão Novo Card */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold flex items-center gap-1.5 transition shadow-sm shadow-emerald-500/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Novo Documento</span>
            </button>
          </div>
        </div>

        {/* Barra de Abas / Drop Zones no Topo das Categorias (Para arrastar fácil) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {allCategories.map((cat) => {
            const isSelected = selectedCategoryName === cat.name;
            const isDragOver = dragOverCategoryName === cat.name;
            const count = (docsByCategory.get(cat.name) || []).length;

            return (
              <button
                key={cat.id}
                type="button"
                onDragOver={(e) => handleDragOverCategory(e, cat.name)}
                onDragLeave={handleDragLeaveCategory}
                onDrop={(e) => handleDropOnCategory(e, cat.name)}
                onClick={() => setSelectedCategoryName(cat.name)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 border ${
                  isDragOver
                    ? 'bg-emerald-500 text-black border-white font-bold scale-105 shadow-md animate-pulse'
                    : isSelected
                    ? 'bg-zinc-800 text-white border-zinc-700 shadow-sm'
                    : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                {renderCategoryIcon(cat.iconName, 'w-3 h-3')}
                <span>{cat.shortName}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isDragOver ? 'bg-black text-white' : isSelected ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setIsCreateCategoryModalOpen(true)}
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 whitespace-nowrap flex items-center gap-1 shrink-0 transition"
          >
            <Plus className="w-3 h-3" />
            <span>Nova</span>
          </button>
        </div>

        {/* Filtros de Status (Chips rápidos) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'todos', label: `Todos (${categoryDocs.length})` },
            { id: 'completo', label: `Completos (${completedCategoryDocs})` },
            { id: 'em_edicao', label: `Em Edição (${inProgressCategoryDocs})` },
            { id: 'pendente', label: `Pendentes (${categoryDocs.length - completedCategoryDocs - inProgressCategoryDocs})` },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setStatusFilter(st.id as any)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition ${
                statusFilter === st.id
                  ? 'bg-zinc-800 text-white border border-zinc-700'
                  : 'bg-zinc-900/60 text-zinc-500 hover:text-zinc-300 border border-transparent'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Banner de Validação Científica para Prescrições e Fórmulas */}
        {(selectedCategoryName.includes('Prescrições') || categoryDocs.some(d => d.clinicalEvidence || getClinicalEvidenceForDoc(d.id))) && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0C1520] via-[#0E1B2C] to-[#0A131E] border border-sky-500/40 text-xs shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/40 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-white text-[13.5px]">
                    Prescrições com Respaldo Científico & Evidências Indexadas
                  </h4>
                  <span className="text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 px-2 py-0.5 rounded">
                    Uso Clínico Validado
                  </span>
                </div>
                <p className="text-zinc-300 text-[11.5px] mt-0.5">
                  Todas as formulações e protocolos possuem mecanismo farmacológico, justificativa de ativos e referências (PubMed, JAAD, ABD) para consulta do profissional.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                const firstPrescription = categoryDocs.find(d => d.clinicalEvidence || getClinicalEvidenceForDoc(d.id)) || categoryDocs[0];
                setScientificModalDoc(firstPrescription || null);
                setIsScientificModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00D3A1] to-[#00B1EA] hover:brightness-110 text-black font-extrabold text-xs flex items-center justify-center gap-2 transition active:scale-95 shadow-md shrink-0 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Compêndio de Referências</span>
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* GRID DE CARDS (COM SUPORTE A DRAGGABLE, DROP ENTRE CARDS E REORDENAÇÃO) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredCategoryDocs.map((doc, docIdx) => {
            const status = getDocumentStatus(doc);
            const progress = getDocumentProgress(doc);
            const iconType = getDocumentIcon(doc);
            const shortDesc = getDocumentShortDescription(doc);
            const lastAct = formatLastActivity(doc);
            const isProcedureDoc = isCategory2Or3Document(doc, currentCategoryDef);

            const statusBadgeConfig = {
              completo: {
                bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
                label: 'COMPLETO',
                barColor: 'bg-emerald-500',
              },
              em_edicao: {
                bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
                label: 'EM EDIÇÃO',
                barColor: 'bg-amber-500',
              },
              pendente: {
                bg: 'bg-zinc-700/30 border-zinc-600 text-zinc-400',
                label: 'PENDENTE',
                barColor: 'bg-zinc-500',
              },
            }[status];

            const isMenuOpen = activeMenuDocId === doc.id;
            const isMoveMenuOpen = movingDocMenuId === doc.id;
            const isBeingDragged = draggedDocId === doc.id;
            const isDropTarget = dragOverDocId === doc.id;

            return (
              <div
                key={doc.id}
                draggable={true}
                onDragStart={(e) => handleDragStart(e, doc)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => handleCardDragOver(e, doc.id)}
                onDragLeave={handleCardDragLeave}
                onDrop={(e) => handleCardDrop(e, doc.id)}
                className={`bg-[#081832] hover:bg-[#0A1D3A] border rounded-2xl p-5 shadow-md transition-all flex flex-col justify-between gap-4 group relative cursor-grab active:cursor-grabbing ${
                  isBeingDragged
                    ? 'opacity-40 scale-95 border-2 border-dashed border-emerald-400 shadow-2xl'
                    : isDropTarget
                    ? 'border-emerald-400 ring-2 ring-emerald-500/30 bg-[#0E274D]'
                    : 'border-[#173660] hover:border-[#224A80]'
                }`}
              >
                {/* Linha indicadora de Drop antes ou depois */}
                {isDropTarget && dragOverDocPosition === 'before' && (
                  <div className="absolute -top-2 left-3 right-3 h-1 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)] z-20 pointer-events-none animate-pulse" />
                )}
                {isDropTarget && dragOverDocPosition === 'after' && (
                  <div className="absolute -bottom-2 left-3 right-3 h-1 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)] z-20 pointer-events-none animate-pulse" />
                )}

                {/* Topo do Card: Alça de Arraste + Botões Reordenar + Ícone + Badge + Menu */}
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg bg-zinc-900/90 text-zinc-500 group-hover:text-emerald-400 flex items-center justify-center transition"
                        title="Arraste para reposicionar na ordem desejada ou soltar em outra categoria"
                      >
                        <GripVertical className="w-4 h-4" />
                      </div>

                      {/* Botões Rápidos de Subir/Descer Posição */}
                      <div className="flex items-center gap-0.5 opacity-60 group-hover:opacity-100 transition">
                        <button
                          type="button"
                          disabled={docIdx === 0}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReorderDocPosition(doc.id, 'up');
                          }}
                          className={`w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition ${
                            docIdx === 0 ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'
                          }`}
                          title="Subir posição na lista"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={docIdx === filteredCategoryDocs.length - 1}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReorderDocPosition(doc.id, 'down');
                          }}
                          className={`w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition ${
                            docIdx === filteredCategoryDocs.length - 1 ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'
                          }`}
                          title="Descer posição na lista"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-inner">
                        {renderCardIcon(iconType)}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${statusBadgeConfig.bg}`}
                      >
                        {statusBadgeConfig.label}
                      </span>

                      {/* Botão Rápido de Excluir Card */}
                      {onDeleteDoc && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCardToDelete(doc);
                          }}
                          className="w-7 h-7 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 flex items-center justify-center transition"
                          title="Excluir este card"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Botão de Menu 3 Pontinhos */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuDocId(isMenuOpen ? null : doc.id);
                            setMovingDocMenuId(null);
                          }}
                          className="w-7 h-7 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 flex items-center justify-center transition"
                          title="Ações do Card"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {/* Menu Dropdown Principal */}
                        {isMenuOpen && (
                          <div className="absolute right-0 top-8 z-30 w-56 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl p-1.5 text-xs space-y-1 animate-fadeIn">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingDoc(doc);
                                setActiveMenuDocId(null);
                              }}
                              className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-zinc-800 text-zinc-200 flex items-center gap-2 font-medium"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Personalizar Card</span>
                            </button>

                            {/* Seção de Reordenação no Menu */}
                            <div className="border-t border-zinc-800 my-1 pt-1">
                              <span className="text-[9px] uppercase font-bold text-zinc-500 px-2.5 block mb-1">
                                Posição na Categoria
                              </span>
                              <div className="grid grid-cols-2 gap-1 px-1">
                                <button
                                  type="button"
                                  disabled={docIdx === 0}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleReorderDocPosition(doc.id, 'up');
                                  }}
                                  className="px-2 py-1 rounded hover:bg-zinc-800 text-zinc-300 disabled:opacity-30 flex items-center gap-1.5 text-[11px]"
                                >
                                  <ArrowUp className="w-3 h-3 text-emerald-400" />
                                  <span>Subir</span>
                                </button>
                                <button
                                  type="button"
                                  disabled={docIdx === filteredCategoryDocs.length - 1}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleReorderDocPosition(doc.id, 'down');
                                  }}
                                  className="px-2 py-1 rounded hover:bg-zinc-800 text-zinc-300 disabled:opacity-30 flex items-center gap-1.5 text-[11px]"
                                >
                                  <ArrowDown className="w-3 h-3 text-emerald-400" />
                                  <span>Descer</span>
                                </button>
                                <button
                                  type="button"
                                  disabled={docIdx === 0}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleReorderDocPosition(doc.id, 'top');
                                  }}
                                  className="px-2 py-1 rounded hover:bg-zinc-800 text-zinc-300 disabled:opacity-30 flex items-center gap-1.5 text-[11px]"
                                >
                                  <ArrowUpToLine className="w-3 h-3 text-indigo-400" />
                                  <span>Ao Topo</span>
                                </button>
                                <button
                                  type="button"
                                  disabled={docIdx === filteredCategoryDocs.length - 1}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleReorderDocPosition(doc.id, 'bottom');
                                  }}
                                  className="px-2 py-1 rounded hover:bg-zinc-800 text-zinc-300 disabled:opacity-30 flex items-center gap-1.5 text-[11px]"
                                >
                                  <ArrowDownToLine className="w-3 h-3 text-indigo-400" />
                                  <span>Ao Fim</span>
                                </button>
                              </div>
                            </div>

                            <div className="border-t border-zinc-800 my-1"></div>

                            {/* Opção Mover Para Categoria (Com Submenu) */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setMovingDocMenuId(isMoveMenuOpen ? null : doc.id);
                              }}
                              className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-zinc-800 text-emerald-400 flex items-center justify-between font-semibold"
                            >
                              <div className="flex items-center gap-2">
                                <MoveRight className="w-3.5 h-3.5" />
                                <span>Mover de Categoria</span>
                              </div>
                              <ChevronRight className="w-3 h-3" />
                            </button>

                            {/* Submenu de Categorias para Mover com 1 Clique */}
                            {isMoveMenuOpen && (
                              <div className="p-1.5 bg-black/60 rounded-lg border border-zinc-800 space-y-1 max-h-48 overflow-y-auto">
                                <span className="text-[9px] uppercase font-bold text-zinc-500 px-1.5 block">
                                  Selecione o destino:
                                </span>
                                {allCategories.map((c) => (
                                  <button
                                    key={c.id}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleMoveDocToCategory(doc.id, c.name);
                                    }}
                                    className="w-full text-left px-2 py-1 rounded text-[11px] text-zinc-300 hover:text-white hover:bg-zinc-800 flex items-center gap-1.5 truncate"
                                  >
                                    <span
                                      className="w-1.5 h-1.5 rounded-full shrink-0"
                                      style={{ backgroundColor: c.accentColor }}
                                    />
                                    <span className="truncate">{c.name}</span>
                                  </button>
                                ))}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsCreateCategoryModalOpen(true);
                                    setActiveMenuDocId(null);
                                    setMovingDocMenuId(null);
                                  }}
                                  className="w-full text-left px-2 py-1 rounded text-[11px] text-emerald-400 hover:bg-emerald-500/10 flex items-center gap-1 border-t border-zinc-800 mt-1 font-bold"
                                >
                                  <Plus className="w-3 h-3" />
                                  <span>+ Criar Categoria</span>
                                </button>
                              </div>
                            )}

                            {/* Seção Documentos Clínicos Rápidos no Menu (Apenas Categoria 2 e 3) */}
                            {isProcedureDoc && (
                              <>
                                <div className="border-t border-zinc-800 my-1"></div>

                                <div className="flex items-center justify-between px-2 py-0.5">
                                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">
                                    Docs do Paciente
                                  </span>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setConfigButtonsDoc(doc);
                                      setActiveMenuDocId(null);
                                    }}
                                    className="text-[10px] text-emerald-400 hover:underline flex items-center gap-0.5"
                                  >
                                    <Sliders className="w-2.5 h-2.5" />
                                    <span>Editar</span>
                                  </button>
                                </div>

                                {getClinicalButtonsConfig(doc.id)
                                  .filter((b) => b.enabled !== false)
                                  .map((b) => (
                                    <button
                                      key={b.type}
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenClinicalDoc(doc, b.type as ClinicalDocType);
                                      }}
                                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-zinc-800 text-zinc-200 flex items-center gap-2 text-xs"
                                    >
                                      <span
                                        className="w-2 h-2 rounded-full shrink-0"
                                        style={{ backgroundColor: b.color }}
                                      />
                                      <span className="truncate">{b.label}</span>
                                    </button>
                                  ))}
                              </>
                            )}

                            <div className="border-t border-zinc-800 my-1"></div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuickStatusChange(doc, 'completo');
                              }}
                              className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-zinc-800 text-emerald-400 flex items-center gap-2"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Marcar como Completo</span>
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuickStatusChange(doc, 'em_edicao');
                              }}
                              className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-zinc-800 text-amber-400 flex items-center gap-2"
                            >
                              <Clock className="w-3.5 h-3.5" />
                              <span>Marcar Em Edição</span>
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuickStatusChange(doc, 'pendente');
                              }}
                              className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 flex items-center gap-2"
                            >
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>Marcar como Pendente</span>
                            </button>

                            {/* Opção Respaldo Científico */}
                            {(doc.clinicalEvidence || getClinicalEvidenceForDoc(doc.id)) && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setScientificModalDoc(doc);
                                  setIsScientificModalOpen(true);
                                  setActiveMenuDocId(null);
                                }}
                                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-sky-950/50 text-sky-400 flex items-center gap-2 border-t border-zinc-800 pt-1.5 mt-1 font-semibold"
                              >
                                <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
                                <span>Respaldo Científico</span>
                              </button>
                            )}

                            {onDeleteDoc && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCardToDelete(doc);
                                  setActiveMenuDocId(null);
                                }}
                                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-rose-500/10 text-rose-400 flex items-center gap-2 border-t border-zinc-800 pt-1.5 mt-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Excluir Card</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Título do Documento Completo sem Cortes */}
                  <h4 className="text-[14.5px] sm:text-[15px] font-bold text-white font-serif leading-snug group-hover:text-emerald-400 transition break-words">
                    {doc.title}
                  </h4>

                  {/* Descrição Curta */}
                  <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed font-sans break-words">
                    {shortDesc}
                  </p>

                  {/* Seção de Documentos Clínicos Rápidos no Card (somente Categoria 2 e 3) */}
                  {isProcedureDoc && (() => {
                    const docButtons = getClinicalButtonsConfig(doc.id).filter((b) => b.enabled !== false);
                    return (
                      <div className="mt-3 pt-2.5 border-t border-zinc-800/80">
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                            <FileText className="w-3 h-3 text-emerald-400" />
                            <span>Docs do Procedimento</span>
                          </span>

                          <div className="flex items-center gap-1.5">
                            {/* Botão Configurar Botões */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setConfigButtonsDoc(doc);
                              }}
                              className="px-1.5 py-0.5 rounded text-[10px] text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 transition flex items-center gap-1 cursor-pointer"
                              title="Editar e personalizar estes botões (nomes, cores, visibilidade)"
                            >
                              <Sliders className="w-2.5 h-2.5" />
                              <span className="hidden sm:inline">Editar Botões</span>
                            </button>

                            {/* Dropdown de Acesso Rápido */}
                            <div className="relative">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenClinicalDropdownDocId(
                                    openClinicalDropdownDocId === doc.id ? null : doc.id
                                  );
                                  setActiveMenuDocId(null);
                                }}
                                className="px-2 py-0.5 rounded-md bg-zinc-800/90 hover:bg-zinc-700 text-zinc-300 hover:text-white text-[10px] font-bold flex items-center gap-1 transition border border-zinc-700/60 shadow-sm cursor-pointer"
                                title="Acessar todos os documentos clínicos do paciente"
                              >
                                <span>Opções</span>
                                <ChevronDown className="w-3 h-3 text-emerald-400" />
                              </button>

                              {/* Menu Flutuante do Dropdown */}
                              {openClinicalDropdownDocId === doc.id && (
                                <div className="absolute right-0 top-6 z-40 w-60 bg-[#161616] border border-zinc-700 rounded-xl shadow-2xl p-1.5 text-xs space-y-1 animate-fadeIn">
                                  <div className="flex items-center justify-between px-2 py-1 border-b border-zinc-800/80">
                                    <span className="text-[9px] uppercase font-black text-zinc-500">
                                      Documentos do Paciente
                                    </span>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setConfigButtonsDoc(doc);
                                        setOpenClinicalDropdownDocId(null);
                                      }}
                                      className="text-[10px] text-emerald-400 hover:underline flex items-center gap-0.5 font-bold"
                                    >
                                      <Sliders className="w-2.5 h-2.5" />
                                      <span>Configurar</span>
                                    </button>
                                  </div>
                                  {docButtons.map((cd) => (
                                    <button
                                      key={cd.type}
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenClinicalDoc(doc, cd.type as ClinicalDocType);
                                      }}
                                      className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-zinc-800 text-zinc-200 flex items-center gap-2 transition text-xs font-medium"
                                    >
                                      <span
                                        className="w-2 h-2 rounded-full shrink-0"
                                        style={{ backgroundColor: cd.color }}
                                      />
                                      <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-white truncate">
                                          {cd.label}
                                        </div>
                                        <div className="text-[9.5px] text-zinc-400 truncate">
                                          {cd.shortLabel || cd.label}
                                        </div>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Botões / Pílulas de Ação de 1-Clique */}
                        <div className="flex flex-wrap items-center gap-1">
                          {docButtons.map((btn) => (
                            <button
                              key={btn.type}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenClinicalDoc(doc, btn.type as ClinicalDocType);
                              }}
                              className="px-2 py-1 rounded-md text-[10.5px] font-semibold flex items-center gap-1 transition active:scale-95 cursor-pointer border hover:brightness-125"
                              style={{
                                backgroundColor: `${btn.color}18`,
                                borderColor: `${btn.color}40`,
                                color: btn.color,
                              }}
                              title={btn.label}
                            >
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: btn.color }} />
                              <span>{btn.shortLabel || btn.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Seção de Respaldo Científico no Card (Fórmulas e Prescrições) */}
                  {(() => {
                    const evidence = doc.clinicalEvidence || getClinicalEvidenceForDoc(doc.id);
                    if (!evidence) return null;

                    return (
                      <div className="mt-3 pt-2.5 border-t border-zinc-800/80">
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-400 flex items-center gap-1">
                            <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
                            <span>Respaldo Científico</span>
                          </span>
                          <span className="text-[9.5px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.5 rounded">
                            {evidence.levelOfEvidence.split('(')[0].trim()}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setScientificModalDoc(doc);
                            setIsScientificModalOpen(true);
                          }}
                          className="w-full py-1.5 px-2.5 rounded-xl bg-sky-950/60 hover:bg-sky-900/80 border border-sky-600/40 text-sky-200 hover:text-white text-[11px] font-bold flex items-center justify-between transition cursor-pointer active:scale-95 shadow-sm"
                          title="Ver referências bibliográficas indexadas e farmacologia clínica desta fórmula"
                        >
                          <span className="flex items-center gap-1.5 truncate">
                            <BookOpen className="w-3 h-3 text-sky-400 shrink-0" />
                            <span className="truncate">Ver {evidence.bibliographicReferences.length} Referências Indexadas</span>
                          </span>
                          <ChevronRight className="w-3 h-3 text-sky-400 shrink-0" />
                        </button>
                      </div>
                    );
                  })()}
                </div>

                {/* Bloco de Progresso e Rodapé */}
                <div className="space-y-3 pt-2">
                  {/* Barra de Progresso de Preenchimento */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 font-semibold mb-1">
                      <span className="uppercase tracking-wider">Preenchimento</span>
                      <span className="font-mono text-zinc-200">{progress}%</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${statusBadgeConfig.barColor}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Rodapé com Timestamp e Botão Pill Preto "Abrir" */}
                  <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{lastAct}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenDoc(doc.id)}
                      className="px-4 py-1.5 rounded-full bg-black hover:bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-xs font-bold text-white flex items-center gap-1.5 transition active:scale-95 shadow-sm cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-zinc-300" />
                      <span>Abrir</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Card Especial: + Adicionar Novo Documento */}
          <div
            onClick={() => setIsAddModalOpen(true)}
            className="border-2 border-dashed border-zinc-800 hover:border-emerald-500/50 bg-[#121212]/40 hover:bg-[#161616] rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3 cursor-pointer transition-all group min-h-[220px]"
          >
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 group-hover:border-emerald-500/40 flex items-center justify-center text-zinc-400 group-hover:text-emerald-400 transition shadow-inner">
              <Plus className="w-6 h-6" />
            </div>

            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition">
                Adicionar novo documento
              </h4>
              <p className="text-xs text-zinc-500 mt-1 max-w-[220px] leading-relaxed">
                Adicione um novo POP, TCLE ou Anamnese para esta categoria.
              </p>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                + Novo Documento
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Modal de Edição de Card */}
      <CardEditModal
        isOpen={!!editingDoc}
        doc={editingDoc}
        categories={allCategories}
        onClose={() => setEditingDoc(null)}
        onSave={(updated) => {
          onUpdateDoc(updated);
          onToast(`Card "${updated.title}" atualizado com sucesso!`);
        }}
        onDelete={onDeleteDoc}
      />

      {/* Modal de Adicionar Novo Documento */}
      <AddDocumentModal
        isOpen={isAddModalOpen}
        activeCategoryName={selectedCategoryName}
        onClose={() => setIsAddModalOpen(false)}
        onAddDocument={(newDoc) => {
          onAddDoc(newDoc);
          onToast(`Documento "${newDoc.title}" adicionado à categoria!`);
        }}
      />

      {/* Modal de Criar Nova Categoria */}
      <CreateCategoryModal
        isOpen={isCreateCategoryModalOpen}
        onClose={() => setIsCreateCategoryModalOpen(false)}
        onCreateCategory={handleCreateCategory}
        existingCount={allCategories.length}
      />

      {/* Modal de Exclusão de Categoria */}
      <DeleteCategoryModal
        isOpen={!!categoryToDelete}
        category={categoryToDelete}
        categoryDocsCount={
          categoryToDelete ? (docsByCategory.get(categoryToDelete.name) || []).length : 0
        }
        allCategories={allCategories}
        onClose={() => setCategoryToDelete(null)}
        onConfirmDelete={(catName, deleteMode, targetCategoryName) => {
          handleConfirmDeleteCategory(catName, deleteMode, targetCategoryName);
          setCategoryToDelete(null);
          onToast(`Categoria "${catName}" excluída com sucesso!`);
        }}
      />

      {/* Modal de Exclusão de Card */}
      <DeleteCardModal
        isOpen={!!cardToDelete}
        doc={cardToDelete}
        onClose={() => setCardToDelete(null)}
        onConfirmDelete={(docId) => {
          if (onDeleteDoc) {
            onDeleteDoc(docId);
          }
          setCardToDelete(null);
          onToast(`Card removido com sucesso!`);
        }}
      />

      {/* Modal de Documentos Clínicos Rápidos do Paciente (Ficha, Termo Imagem, Anamnese, TCLE, Pós-Procedimento) */}
      <ProcedureClinicalDocsModal
        isOpen={!!clinicalDocsDoc}
        doc={clinicalDocsDoc}
        initialTab={clinicalDocsInitialTab}
        clinicData={clinicData}
        onClose={() => {
          setClinicalDocsDoc(null);
          setButtonsVersion((v) => v + 1);
        }}
        onOpenInFullEditor={(docId) => {
          setClinicalDocsDoc(null);
          onOpenDoc(docId);
        }}
        onToast={onToast}
      />

      {/* Modal de Configuração / Edição dos Botões Clínicos (Categorias 2 e 3) */}
      <ClinicalButtonsConfigModal
        isOpen={!!configButtonsDoc}
        doc={configButtonsDoc}
        onClose={() => setConfigButtonsDoc(null)}
        onSaved={() => {
          setButtonsVersion((v) => v + 1);
        }}
        onToast={onToast}
      />

      {/* Modal / Estúdio Interativo de Prescrição & Fórmulas Baseadas em Evidências */}
      {prescriptionDoc && (
        <div className="fixed inset-0 z-[65] flex items-center justify-center p-1 sm:p-3 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-7xl h-[95vh] bg-[#061224] border border-[#173660] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <InteractivePrescriptionBuilder
              doc={prescriptionDoc}
              procedureContextKey={identifyProcedureContext(prescriptionDoc)}
              clinicData={clinicData}
              patientData={getInitialPatientState(clinicData)}
              onToast={onToast}
              onClose={() => setPrescriptionDoc(null)}
            />
          </div>
        </div>
      )}

      {/* Modal de Respaldo Científico & Validação Clínica */}
      <ScientificEvidenceModal
        isOpen={isScientificModalOpen}
        onClose={() => {
          setIsScientificModalOpen(false);
          setScientificModalDoc(null);
        }}
        currentDoc={scientificModalDoc}
        onSelectDoc={(docId) => onOpenDoc(docId)}
        onToast={onToast}
      />
    </div>
  );
};
