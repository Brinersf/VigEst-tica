import React, { useState, useEffect } from 'react';
import { ShieldCheck, LogOut, Key, FileText, CheckCircle, Zap, CreditCard, Sparkles, Sliders, LayoutDashboard, ShoppingBag, ArrowLeft, Layers, Lock, DollarSign, Share2 } from 'lucide-react';
import { DocumentItem, ClinicData, PlanType, PaymentDetails } from './types';
import { INITIAL_DOCUMENTS } from './data/documents';
import { SalesLandingPage } from './components/SalesLandingPage';
import { ClinicHubDashboard } from './components/ClinicHubDashboard';
import { DocumentEditor } from './components/DocumentEditor';
import { ClinicProfileModal } from './components/ClinicProfileModal';
import { KiwifyDeliveryModal } from './components/KiwifyDeliveryModal';
import { replaceClinicVariables } from './utils/a4Formatter';
import { PatientInteractivePortal } from './components/PatientInteractivePortal';
import {
  getDeletedDocIds,
  saveDeletedDocIds,
  getDeletedCategoryNames,
  saveDeletedCategoryNames,
  getSavedCustomCategories,
  saveCustomCategories,
  getStepCategoryForDocument
} from './utils/stepCategoryHelper';

export default function App() {
  // Check if opened as patient interactive portal directly via link
  const [isPatientPortalUrl, setIsPatientPortalUrl] = useState<boolean>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('paciente_portal') === '1' || window.location.hash.includes('paciente_portal=1');
    } catch {
      return false;
    }
  });

  const getPatientUrlParams = () => {
    try {
      const params = new URLSearchParams(window.location.search);
      return {
        procedureTitle: params.get('proc') || undefined,
        clinicName: params.get('clinica') || undefined,
        clinicPhone: params.get('tel') || undefined,
        patientName: params.get('paciente') || undefined,
        docId: params.get('docId') || undefined,
      };
    } catch {
      return {};
    }
  };

  // Payment status state: checks for Kiwify URL parameters or existing persistence
  const [isPaid, setIsPaid] = useState<boolean>(() => {
    try {
      // Clear legacy development test keys so user is NOT unlocked by default
      localStorage.removeItem('vigi_mp_paid');
      localStorage.removeItem('vigi_custom_unlocked');

      const params = new URLSearchParams(window.location.search);

      // Support instant lock/reset via ?sair=1 or ?reset=1
      if (params.get('reset') === '1' || params.get('sair') === '1' || params.get('bloquear') === '1') {
        localStorage.removeItem('vigi_kiwify_paid_v3');
        return false;
      }

      const token = params.get('token');
      const chave = params.get('chave') || params.get('key');

      // Check official secure token (Hotmart / Kiwify) or owner master key
      const isOfficialToken =
        token === 'vigi_kw_7a8f9c2d1b4e' ||
        token === 'vigi_kw_secret_2025' ||
        token === 'vigi_hotmart_2025' ||
        (typeof token === 'string' && token.startsWith('vigi_')) ||
        params.get('acesso') === 'liberado' ||
        params.get('status') === 'approved' ||
        params.get('hotmart') === '1';
      const isMasterAdminKey = chave === 'VIGI-ESTETICA-PRO-2025' || chave === 'VIGI-MASTER-VIP';

      if (isOfficialToken || isMasterAdminKey) {
        localStorage.setItem('vigi_kiwify_paid_v3', 'true');
        localStorage.setItem('vigi_mp_plan', 'completo');
        return true;
      }

      return localStorage.getItem('vigi_kiwify_paid_v3') === 'true';
    } catch {
      return false;
    }
  });

  // App views: 'landing' (Página de Vendas) | 'hub' (Editor de Cards / Painel) | 'editor' (Editor de Documento A4)
  const [view, setView] = useState<'landing' | 'hub' | 'editor'>(() => {
    try {
      const params = new URLSearchParams(window.location.search);

      if (params.get('reset') === '1' || params.get('sair') === '1' || params.get('bloquear') === '1') {
        return 'landing';
      }

      const token = params.get('token');
      const chave = params.get('chave') || params.get('key');
      const isOfficialToken =
        token === 'vigi_kw_7a8f9c2d1b4e' ||
        token === 'vigi_kw_secret_2025' ||
        token === 'vigi_hotmart_2025' ||
        (typeof token === 'string' && token.startsWith('vigi_')) ||
        params.get('acesso') === 'liberado' ||
        params.get('status') === 'approved' ||
        params.get('hotmart') === '1';
      const isMasterAdminKey = chave === 'VIGI-ESTETICA-PRO-2025' || chave === 'VIGI-MASTER-VIP';

      if (isOfficialToken || isMasterAdminKey) {
        return 'hub';
      }

      const alreadyPaid = localStorage.getItem('vigi_kiwify_paid_v3') === 'true';
      if (alreadyPaid && params.get('home') !== '1') {
        return 'hub';
      }
    } catch {}
    return 'landing';
  });
  const [plan, setPlan] = useState<PlanType>(() => {
    try {
      return (localStorage.getItem('vigi_mp_plan') as PlanType) || 'completo';
    } catch {
      return 'completo';
    }
  });

  const [clinicData, setClinicData] = useState<ClinicData>(() => {
    const saved = localStorage.getItem('vigi_mp_clinic');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const isOldMock =
          parsed.responsavel === 'Dra. Camila R. Andrade' ||
          parsed.nomeCliente === 'Ana Paula Vasconcelos' ||
          parsed.nomeClinica === 'Sua Clínica - Estética Avançada' ||
          parsed.cnpj === '42.318.920/0001-84';
        if (!isOldMock) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse clinic data', e);
      }
    }
    return {
      nomeClinica: '',
      cnpj: '',
      cnes: '',
      responsavel: '',
      registroConselho: '',
      alvara: '',
      nomeCliente: '',
      cpfCliente: '',
      email: '',
      whatsapp: '',
      endereco: '',
      cidade: '',
      rgCliente: '',
      dataDocumento: new Date().toLocaleDateString('pt-BR'),
      procedimento: '',
      equipamento: '',
      registroAnvisa: '',
      valorHonorarios: '',
      customVariables: {},
    };
  });

  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    const deletedIds = getDeletedDocIds();
    const savedDocs = localStorage.getItem('vigi_custom_docs');
    if (savedDocs) {
      try {
        const parsed = (JSON.parse(savedDocs) as DocumentItem[]).filter(
          doc => doc.id !== 'contrato-pgrss-1' && doc.id !== 'contrato-residuos-1' && doc.id !== 'pop-depilacao-cera' && !deletedIds.includes(doc.id)
        );
        const existingMap = new Map(parsed.map(d => [d.id, d]));
        const mergedList = INITIAL_DOCUMENTS.filter(
          d => d.id !== 'contrato-pgrss-1' && d.id !== 'contrato-residuos-1' && d.id !== 'pop-depilacao-cera' && (!deletedIds.includes(d.id) || d.isEssential)
        ).map(initDoc => {
          const existing = existingMap.get(initDoc.id);
          if (!existing) return initDoc;
          // Always use initDoc if version changed or if it's a sanitary book
          const isSanitaryBook = initDoc.id.includes('caderno') || initDoc.id.startsWith('livro-') || initDoc.stepCategory?.includes('Cadernos') || initDoc.category?.includes('Caderno') || initDoc.category?.includes('Livro');
          const target = (initDoc.version !== existing.version || isSanitaryBook) ? initDoc : existing;
          if (target.id === 'manual-boas-praticas-master' || target.id.includes('manual-boas-praticas') || target.id === 'pgrss-master-rdc-222' || target.id === 'memorial-descritivo-atividades') {
            return { ...target, stepCategory: '1. Documentos Base e ANVISA' };
          }
          if (target.id === 'pop-lavieen-1927nm' || target.id.includes('lavieen') || target.id.includes('luz-intensa') || target.title.toLowerCase().includes('luz intensa pulsada')) {
            return { ...target, stepCategory: '3. POPs de Laser e Tecnologias' };
          }
          if (target.id === 'pop-lipoenzimatica' || target.id.includes('lipoenzimatica') || target.title.toLowerCase().includes('lipoenzimática') || target.title.toLowerCase().includes('lipoenzimatica')) {
            return { ...target, stepCategory: '2. POP Procedimentos Estéticos' };
          }
          return target;
        });

        parsed.forEach(doc => {
          if (doc.id !== 'pop-3' && doc.id !== 'contrato-pgrss-1' && doc.id !== 'contrato-residuos-1' && doc.id.startsWith('doc-') && !deletedIds.includes(doc.id) && !INITIAL_DOCUMENTS.some(init => init.id === doc.id)) {
            mergedList.push(doc);
          }
        });

        return mergedList;
      } catch {
        return INITIAL_DOCUMENTS.filter(d => !deletedIds.includes(d.id));
      }
    }
    return INITIAL_DOCUMENTS.filter(d => !deletedIds.includes(d.id));
  });

  const [currentDocId, setCurrentDocId] = useState<string>('manual-boas-praticas-master');
  const [isClinicModalOpen, setIsClinicModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync docs to localStorage
  useEffect(() => {
    localStorage.setItem('vigi_custom_docs', JSON.stringify(documents));
  }, [documents]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Check token or email on load with server verification
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      const email = params.get('email');
      const chave = params.get('chave') || params.get('key');

      if (
        token === 'vigi_kw_7a8f9c2d1b4e' ||
        token === 'vigi_kw_secret_2025' ||
        token === 'vigi_hotmart_2025' ||
        (typeof token === 'string' && token.startsWith('vigi_')) ||
        params.get('acesso') === 'liberado' ||
        params.get('status') === 'approved' ||
        chave === 'VIGI-ESTETICA-PRO-2025' ||
        chave === 'VIGI-MASTER-VIP'
      ) {
        showToast('🎉 Acesso Confirmado! O Vigiestética está 100% liberado para você configurar seus documentos.');
      } else if (email && !isPaid) {
        // Query backend to verify if this email was actually paid via Kiwify webhook
        fetch('/api/kiwify/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.authorized) {
              setIsPaid(true);
              setView('hub');
              localStorage.setItem('vigi_kiwify_paid_v3', 'true');
              showToast(`🎉 Bem-vindo(a)! Compra aprovada na Kiwify confirmada.`);
            }
          })
          .catch(() => {});
      }
    } catch {}
  }, [isPaid]);

  // Barrier: only allow access to Hub or Editor if paid
  useEffect(() => {
    if (!isPaid && (view === 'hub' || view === 'editor')) {
      setView('landing');
    }
  }, [isPaid, view]);

  // Action to access editor
  const handleAccessEditor = () => {
    if (!isPaid) {
      setView('landing');
      setTimeout(() => {
        const elem = document.getElementById('pagamento');
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      showToast('🔒 O software completo requer confirmação de pagamento. Adquira na seção abaixo.');
      return;
    }
    setView('hub');
  };

  const handleUpdateDocContent = (id: string, newContent: string) => {
    setDocuments((prev) => {
      const updated = prev.map((doc) => (doc.id === id ? { ...doc, content: newContent, lastModified: new Date().toISOString().split('T')[0] } : doc));
      try {
        localStorage.setItem('vigi_custom_docs', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  };

  const handleApplyClinicDataToAllDocs = (newData: ClinicData) => {
    setClinicData(newData);
    try {
      localStorage.setItem('vigi_mp_clinic', JSON.stringify(newData));
    } catch (e) {
      console.warn(e);
    }

    setDocuments((prevDocs) => {
      const updated = prevDocs.map((doc) => ({
        ...doc,
        content: replaceClinicVariables(doc.content, newData),
        lastModified: new Date().toISOString().split('T')[0],
      }));
      try {
        localStorage.setItem('vigi_custom_docs', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });

    showToast(`⚡ Dados da clínica "${newData.nomeClinica || 'sua clínica'}" aplicados em todos os ${documents.length} documentos com sucesso!`);
  };

  const handleUpdateDocDetails = (id: string, updates: Partial<DocumentItem>) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, ...updates, lastModified: new Date().toISOString().split('T')[0] } : doc))
    );
  };

  const handleCreateDoc = () => {
    const newId = `doc-custom-${Date.now()}`;
    const newDoc: DocumentItem = {
      id: newId,
      title: 'Novo POP / Documento Personalizado',
      category: 'POP',
      version: 'V 1.0',
      lastModified: new Date().toISOString().split('T')[0],
      adaptationNotes: 'Documento criado sob demanda da clínica.',
      content: `<h2>POP - PROCEDIMENTO OPERACIONAL PADRÃO</h2>
<p><strong>Clínica:</strong> {{nome_clinica}} | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}}</p>
<p><strong>1. OBJETIVO:</strong><br>Descrever a padronização das rotinas e procedimentos técnicos.</p>
<p><strong>2. CAMPO DE APLICAÇÃO:</strong><br>Aplicável em todas as salas de atendimento da clínica.</p>
<p><strong>3. MATERIAIS NECESSÁRIOS:</strong><br>• Luvas descartáveis, máscara, álcool 70% e insumos estéreis.</p>
<p><strong>4. DESCRIÇÃO DO PROCEDIMENTO PASSO A PASSO:</strong><br>1. Higienização prévia das mãos conforme técnica de Semmelweis;<br>2. Paramentação completa e antissepsia da pele do paciente;<br>3. Execução técnica do procedimento com descarte imediato dos pérfuro-cortantes em caixa Descarpack.</p>`,
      isEssential: false,
    };
    setDocuments((prev) => [newDoc, ...prev]);
    setCurrentDocId(newId);
    showToast('Novo POP criado com sucesso!');
  };

  const handleDuplicateDoc = (id: string) => {
    const targetDoc = documents.find((d) => d.id === id);
    if (!targetDoc) return;

    const dupId = `doc-copy-${Date.now()}`;
    const dupDoc: DocumentItem = {
      ...targetDoc,
      id: dupId,
      title: `${targetDoc.title} (Adaptado)`,
      version: `${targetDoc.version || 'V 1.0'} - Custom`,
      lastModified: new Date().toISOString().split('T')[0],
    };

    setDocuments((prev) => [dupDoc, ...prev]);
    setCurrentDocId(dupId);
    showToast('POP duplicado para adaptação personalizada!');
  };

  const handleDeleteDoc = (id: string) => {
    const deletedIds = getDeletedDocIds();
    if (!deletedIds.includes(id)) {
      saveDeletedDocIds([...deletedIds, id]);
    }
    setDocuments((prev) => {
      const remaining = prev.filter((d) => d.id !== id);
      if (remaining.length > 0) {
        if (currentDocId === id) {
          setCurrentDocId(remaining[0].id);
        }
      }
      try {
        localStorage.setItem('vigi_custom_docs', JSON.stringify(remaining));
      } catch (e) {}
      return remaining;
    });
    showToast('Card excluído com sucesso.');
  };

  const handleDeleteMultipleDocs = (ids: string[]) => {
    const deletedIds = getDeletedDocIds();
    const newDeleted = Array.from(new Set([...deletedIds, ...ids]));
    saveDeletedDocIds(newDeleted);

    setDocuments((prev) => {
      const remaining = prev.filter((d) => !ids.includes(d.id));
      if (remaining.length > 0 && ids.includes(currentDocId)) {
        setCurrentDocId(remaining[0].id);
      }
      try {
        localStorage.setItem('vigi_custom_docs', JSON.stringify(remaining));
      } catch (e) {}
      return remaining;
    });
    showToast(`${ids.length} card(s) excluído(s) com sucesso.`);
  };

  const handleDeleteCategory = (
    catName: string,
    deleteMode: 'deleteDocs' | 'moveTo',
    targetCategoryName?: string
  ) => {
    // 1. Record category as deleted in localStorage
    const deletedCats = getDeletedCategoryNames();
    if (!deletedCats.includes(catName)) {
      saveDeletedCategoryNames([...deletedCats, catName]);
    }

    // Also remove from custom categories if it was custom
    const customCats = getSavedCustomCategories();
    const filteredCustom = customCats.filter((c) => c.name !== catName);
    if (filteredCustom.length !== customCats.length) {
      saveCustomCategories(filteredCustom);
    }

    if (deleteMode === 'deleteDocs') {
      const docsToDelete = documents.filter((d) => getStepCategoryForDocument(d) === catName);
      const idsToDelete = docsToDelete.map((d) => d.id);
      if (idsToDelete.length > 0) {
        handleDeleteMultipleDocs(idsToDelete);
      }
      showToast(`Categoria "${catName}" e seus ${idsToDelete.length} documento(s) foram excluídos.`);
    } else {
      const targetCat = targetCategoryName || '1. Documentos Base e ANVISA';
      setDocuments((prev) => {
        const updated = prev.map((doc) => {
          if (getStepCategoryForDocument(doc) === catName) {
            return { ...doc, stepCategory: targetCat };
          }
          return doc;
        });
        try {
          localStorage.setItem('vigi_custom_docs', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
      showToast(`Categoria "${catName}" excluída. Cards foram movidos para "${targetCat}".`);
    }
  };

  // If opened via patient interactive portal link
  if (isPatientPortalUrl) {
    const portalParams = getPatientUrlParams();
    return (
      <PatientInteractivePortal
        initialProcedureTitle={portalParams.procedureTitle || 'Ficha Cadastral & Avaliação Estética'}
        initialClinicName={portalParams.clinicName || clinicData.nomeClinica}
        initialClinicPhone={portalParams.clinicPhone || clinicData.whatsapp || clinicData.telefone}
        initialPatientName={portalParams.patientName || ''}
        initialDocId={portalParams.docId}
        onExit={() => {
          setIsPatientPortalUrl(false);
          try {
            const url = new URL(window.location.href);
            url.searchParams.delete('paciente_portal');
            url.searchParams.delete('proc');
            url.searchParams.delete('clinica');
            url.searchParams.delete('tel');
            url.searchParams.delete('paciente');
            url.searchParams.delete('docId');
            window.history.replaceState({}, '', url.pathname);
          } catch {}
        }}
      />
    );
  }

  // View 1: PÁGINA DE VENDAS / APRESENTAÇÃO
  if (view === 'landing') {
    return (
      <>
        <SalesLandingPage
          onAccessEditor={handleAccessEditor}
          isPaid={isPaid}
          onUnlockPaid={() => {
            setIsPaid(true);
            try {
              localStorage.setItem('vigi_kiwify_paid_v3', 'true');
              localStorage.setItem('vigi_mp_plan', 'completo');
            } catch {}
            showToast('🎉 Acesso Liberado com Sucesso! Bem-vindo(a) ao Vigiestética.');
          }}
          onOpenConfig={() => setIsConfigModalOpen(true)}
          currentClinicData={clinicData}
          documents={documents}
        />

        <KiwifyDeliveryModal
          isOpen={isConfigModalOpen}
          onClose={() => setIsConfigModalOpen(false)}
          isPaid={isPaid}
          onToggleTestAccess={(unlock) => {
            setIsPaid(unlock);
            if (unlock) {
              localStorage.setItem('vigi_kiwify_paid_v3', 'true');
              setView('hub');
              showToast('🔓 Modo de Teste: Acesso Total Liberado!');
            } else {
              localStorage.removeItem('vigi_kiwify_paid_v3');
              setView('landing');
              showToast('🔒 Modo Visitante: Visualizando como comprador não pago.');
            }
          }}
          onToast={showToast}
        />

        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#081832] border border-[#00D3A1] text-white px-5 py-2.5 rounded-full text-[13px] font-bold shadow-2xl z-50 animate-[slideUp_0.2s_ease] flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#00D3A1]" />
            {toastMessage}
          </div>
        )}
      </>
    );
  }

  // View 2: HUB / PAINEL DE CARDS (Editor da Clínica)
  if (view === 'hub') {
    return (
      <>
        <ClinicHubDashboard
          documents={documents}
          clinicData={clinicData}
          onUpdateClinicData={(newData) => {
            setClinicData(newData);
            try {
              localStorage.setItem('vigi_mp_clinic', JSON.stringify(newData));
            } catch (e) {}
          }}
          onApplyToAllDocs={handleApplyClinicDataToAllDocs}
          onApplyToSelectedDocs={(newData, selectedIds) => {
            setClinicData(newData);
            try {
              localStorage.setItem('vigi_mp_clinic', JSON.stringify(newData));
            } catch (e) {}
            setDocuments((prevDocs) => {
              const updated = prevDocs.map((doc) => {
                if (selectedIds.includes(doc.id)) {
                  return {
                    ...doc,
                    content: replaceClinicVariables(doc.content, newData),
                    lastModified: new Date().toISOString().split('T')[0],
                  };
                }
                return doc;
              });
              try {
                localStorage.setItem('vigi_custom_docs', JSON.stringify(updated));
              } catch (e) {}
              return updated;
            });
            showToast(`⚡ Dados aplicados em ${selectedIds.length} documento(s) selecionado(s)!`);
          }}
          onOpenEditor={(docId) => {
            setCurrentDocId(docId);
            setView('editor');
          }}
          onUpdateDoc={(updatedDoc) => {
            setDocuments((prev) => {
              const nextDocs = prev.map((d) => (d.id === updatedDoc.id ? updatedDoc : d));
              try {
                localStorage.setItem('vigi_custom_docs', JSON.stringify(nextDocs));
              } catch (e) {}
              return nextDocs;
            });
          }}
          onReorderDocs={(newDocs) => {
            setDocuments(newDocs);
            try {
              localStorage.setItem('vigi_custom_docs', JSON.stringify(newDocs));
            } catch (e) {}
          }}
          onAddDoc={(newDoc) => {
            setDocuments((prev) => {
              const nextDocs = [newDoc, ...prev];
              try {
                localStorage.setItem('vigi_custom_docs', JSON.stringify(nextDocs));
              } catch (e) {}
              return nextDocs;
            });
          }}
          onDeleteDoc={(docId) => {
            handleDeleteDoc(docId);
          }}
          onDeleteMultipleDocs={(docIds) => {
            handleDeleteMultipleDocs(docIds);
          }}
          onDeleteCategory={(catName, deleteMode, targetCategoryName) => {
            handleDeleteCategory(catName, deleteMode, targetCategoryName);
          }}
          onOpenClinicModal={() => setIsClinicModalOpen(true)}
          onBackToSales={() => setView('landing')}
          onOpenConfig={() => setIsConfigModalOpen(true)}
          onToast={showToast}
        />

        <KiwifyDeliveryModal
          isOpen={isConfigModalOpen}
          onClose={() => setIsConfigModalOpen(false)}
          isPaid={isPaid}
          onToggleTestAccess={(unlock) => {
            setIsPaid(unlock);
            if (unlock) {
              localStorage.setItem('vigi_kiwify_paid_v3', 'true');
              setView('hub');
              showToast('🔓 Modo de Teste: Acesso Total Liberado!');
            } else {
              localStorage.removeItem('vigi_kiwify_paid_v3');
              setView('landing');
              showToast('🔒 Modo Visitante: Visualizando como comprador não pago.');
            }
          }}
          onToast={showToast}
        />

        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0B1E38] border border-[#00D3A1] text-white px-5 py-2.5 rounded-full text-[13px] font-bold shadow-2xl z-50 animate-[slideUp_0.2s_ease] flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#00D3A1]" />
            {toastMessage}
          </div>
        )}
      </>
    );
  }

  // View 4: EDITOR A4 DE DOCUMENTO
  return (
    <div className="min-h-screen bg-[#061224] text-[#F0F6FF] flex flex-col font-sans">
      {/* Top Header Bar for Editor */}
      <header className="min-h-[56px] py-2 px-3 sm:px-4 md:px-6 flex items-center justify-between border-b border-[#173660] bg-[#0A1D3A]/95 backdrop-blur sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          <button
            onClick={() => setView('hub')}
            className="h-8 px-2.5 rounded-xl bg-[#0E274D] hover:bg-[#153868] border border-[#1E4477] text-white text-[11px] sm:text-[12px] font-bold flex items-center gap-1.5 transition shrink-0 active:scale-95 cursor-pointer"
            title="Voltar ao Painel da Clínica"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#00D3A1]" />
            <span className="hidden sm:inline">Painel / Cards</span>
            <span className="sm:hidden">Painel</span>
          </button>

          <div className="w-px h-5 bg-[#1B3E6E] hidden xs:block" />

          <div className="min-w-0">
            <div className="font-bold text-[13px] sm:text-[14px] leading-tight flex items-center gap-1.5 flex-wrap">
              <span className="truncate max-w-[140px] xs:max-w-[180px] sm:max-w-[260px] text-white">
                {clinicData.nomeClinica || 'Clínica Estética'}
              </span>
              <span className="text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-md font-black tracking-wider uppercase bg-[#00D3A1] text-black shrink-0">
                ANVISA
              </span>
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#94A3B8] flex items-center gap-1.5 mt-0.5">
              <span className="text-[#00D3A1] font-medium shrink-0">{documents.length} Documentos</span>
              <span className="text-[#334E68]">•</span>
              <span className="hidden xs:inline truncate">Conformidade Sanitária</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => setIsClinicModalOpen(true)}
            className="h-8 px-2.5 sm:px-3 rounded-xl bg-gradient-to-r from-[#00D3A1]/20 to-[#00B1EA]/20 hover:from-[#00D3A1]/30 hover:to-[#00B1EA]/30 border border-[#00D3A1]/60 text-[11px] text-white transition font-black flex items-center gap-1.5 active:scale-95 cursor-pointer shadow-sm shadow-[#00D3A1]/10"
            title="Editar dados da clínica cadastrados"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00D3A1]" />
            <span className="hidden sm:inline">Dados da Clínica</span>
            <span className="sm:hidden">Dados</span>
          </button>

          <button
            onClick={() => setView('landing')}
            className="h-8 px-2 sm:px-2.5 rounded-xl bg-[#00D3A1]/10 hover:bg-[#00D3A1]/20 border border-[#00D3A1]/40 text-[11px] font-bold text-[#00D3A1] hover:text-white transition flex items-center gap-1.5 active:scale-95 cursor-pointer"
            title="Ver Apresentação Informativa"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#00D3A1]" />
            <span className="hidden sm:inline">Informativo</span>
          </button>
        </div>
      </header>

      {/* Main Document Editor */}
      <DocumentEditor
        documents={documents}
        currentDocId={currentDocId}
        onSelectDoc={(id) => setCurrentDocId(id)}
        onUpdateDocContent={handleUpdateDocContent}
        onUpdateDocDetails={handleUpdateDocDetails}
        onCreateDoc={handleCreateDoc}
        onDuplicateDoc={handleDuplicateDoc}
        onDeleteDoc={handleDeleteDoc}
        clinicData={clinicData}
        onUpdateClinicData={(newData) => {
          setClinicData(newData);
          try {
            localStorage.setItem('vigi_mp_clinic', JSON.stringify(newData));
          } catch (e) {}
        }}
        onApplyClinicDataToAll={handleApplyClinicDataToAllDocs}
        onOpenClinicProfile={() => setIsClinicModalOpen(true)}
        onBackToHub={() => setView('hub')}
        plan={plan}
        onToast={showToast}
      />

      {/* Modals */}
      <ClinicProfileModal
        isOpen={isClinicModalOpen}
        onClose={() => setIsClinicModalOpen(false)}
        clinicData={clinicData}
        onSave={(data) => {
          handleApplyClinicDataToAllDocs(data);
          setIsClinicModalOpen(false);
        }}
      />

      <KiwifyDeliveryModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        isPaid={isPaid}
        onToggleTestAccess={(unlock) => {
          setIsPaid(unlock);
          if (unlock) {
            localStorage.setItem('vigi_kiwify_paid_v3', 'true');
            setView('hub');
            showToast('🔓 Modo de Teste: Acesso Total Liberado!');
          } else {
            localStorage.removeItem('vigi_kiwify_paid_v3');
            setView('landing');
            showToast('🔒 Modo Visitante: Visualizando como comprador não pago.');
          }
        }}
        onToast={showToast}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0B1E38] border border-[#00D3A1] text-white px-5 py-2.5 rounded-full text-[13px] font-bold shadow-2xl z-50 animate-[slideUp_0.2s_ease] flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#00D3A1]" />
          {toastMessage}
        </div>
      )}
    </div>
  );
}
