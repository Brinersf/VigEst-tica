import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Pill,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Check,
  Stethoscope,
  Trash2,
  Send,
  Save,
  FileText,
  User,
  Heart,
  Activity,
  Layers,
  Plus,
  CopyPlus,
  ArrowUp,
  ArrowDown,
  Printer,
  Download,
  BookOpen,
  Info,
  Edit3,
  Calendar,
  Phone,
  Building,
  ShieldCheck,
  Award,
  ChevronDown,
  ChevronUp,
  X,
  Share2,
  FileCheck2,
  ExternalLink
} from 'lucide-react';
import { DocumentItem } from '../types';
import { PatientFormState } from '../utils/procedureClinicalDocsHelper';
import {
  PROCEDURE_SCIENTIFIC_PRESCRIPTIONS,
  ProcedurePrescriptionProfile,
  ScientificFormula,
  ScientificActive,
  getProcedurePrescriptionProfile
} from '../data/procedureScientificPrescriptions';

export interface PrescribedItem {
  id: string;
  route: 'USO ORAL' | 'USO TÓPICO' | 'USO CAPILAR' | 'USO SUBLINGUAL';
  title: string;
  dosageForm: string;
  quantity: string;
  actives: ScientificActive[];
  activesFreeText: string;
  useActivesTable: boolean;
  posology: string;
  duration: string;
  cautions: string;
  scientificEvidence?: string;
  showEvidenceInPrint?: boolean;
}

export interface PrescriptionGeneralConfig {
  patientName: string;
  patientCpf: string;
  patientAgeOrDob: string;
  patientPhone: string;
  patientAddress: string;

  prescriberName: string;
  prescriberTitle: string;
  prescriberCouncil: string;
  prescriberCouncilState: string;
  clinicName: string;
  clinicAddress: string;
  clinicPhone: string;
  clinicAlvara: string;

  issueDate: string;
  validityDays: string;
  generalInstructions: string;
  urgentNotice: string;
}

export function generatePrescriptionMarkdown(
  config: PrescriptionGeneralConfig,
  items: PrescribedItem[],
  docTitle: string
): string {
  let md = `# PRESCRIÇÃO CLÍNICA & PROTOCOLO HOME CARE — ${docTitle.toUpperCase()}\n\n`;
  md += `**Paciente:** ${config.patientName || '{{nome_cliente}}'} | **CPF:** ${config.patientCpf || '{{cpf_cliente}}'} | **Data de Emissão:** ${config.issueDate || '{{data_atual}}'}\n`;
  md += `**Profissional Prescritor(a):** ${config.prescriberName || '{{responsavel_tecnico}}'} — ${config.prescriberCouncil || '{{registro_conselho}}'}/${config.prescriberCouncilState || 'UF'}\n`;
  md += `**Clínica:** ${config.clinicName || '{{nome_clinica}}'} | **Validade da Receita:** ${config.validityDays || '30 dias'}\n\n`;
  md += `---\n\n`;

  items.forEach((item, idx) => {
    md += `### ${idx + 1}. [${item.route}] ${item.title}\n\n`;
    md += `**Forma Farmacêutica:** ${item.dosageForm} | **Quantidade Total:** ${item.quantity}\n\n`;
    md += `**Composição Ativa / Formulação:**\n\`\`\`\n${item.activesFreeText || item.actives.map((a) => `${a.name} ${a.concentration} (${a.role})`).join('\n')}\n\`\`\`\n\n`;
    md += `**Posologia e Modo de Usar:**\n${item.posology}\n\n`;
    md += `**Tempo de Tratamento:** ${item.duration}\n\n`;
    if (item.cautions) {
      md += `> **Advertências e Cuidados:** ${item.cautions}\n\n`;
    }
    if (item.showEvidenceInPrint && item.scientificEvidence) {
      md += `*Fundamentação Farmacológica:* ${item.scientificEvidence}\n\n`;
    }
    md += `---\n\n`;
  });

  if (config.generalInstructions) {
    md += `### RECOMENDAÇÕES GERAIS AO PACIENTE\n\n${config.generalInstructions}\n\n`;
  }
  if (config.urgentNotice) {
    md += `> **Em caso de dúvidas ou reações:** ${config.urgentNotice}\n`;
  }
  return md;
}

interface InteractivePrescriptionBuilderProps {
  doc: DocumentItem;
  procedureContextKey: string;
  clinicData: {
    nomeClinica?: string;
    responsavel?: string;
    registroConselho?: string;
    conselhoEstado?: string;
    alvara?: string;
    endereco?: string;
    telefone?: string;
    nomeCliente?: string;
    telefoneCliente?: string;
  };
  patientData: PatientFormState;
  onToast: (msg: string) => void;
  onClose?: () => void;
  onSaveContent?: (newContent: string) => void;
}

export const InteractivePrescriptionBuilder: React.FC<InteractivePrescriptionBuilderProps> = ({
  doc,
  procedureContextKey,
  clinicData,
  patientData,
  onToast,
  onClose,
  onSaveContent
}) => {
  const profile: ProcedurePrescriptionProfile = useMemo(() => {
    return getProcedurePrescriptionProfile(procedureContextKey);
  }, [procedureContextKey]);

  // Clean document title
  const cleanDocTitle = doc.title.replace(/^POP\s*[-–—]\s*/i, '').replace(/\(.*\)$/, '').trim();

  // Storage key for persisting prescription per document and patient
  const storageKey = `prescription_builder_${doc.id}`;

  // State for Prescriber & Patient Config
  const [config, setConfig] = useState<PrescriptionGeneralConfig>(() => {
    const today = new Date().toLocaleDateString('pt-BR');
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.config) return parsed.config;
      } catch (e) {
        console.error(e);
      }
    }
    return {
      patientName: patientData.nomeCliente || clinicData.nomeCliente || '',
      patientCpf: '',
      patientAgeOrDob: '',
      patientPhone: patientData.telefone || clinicData.telefoneCliente || '',
      patientAddress: '',

      prescriberName: clinicData.responsavel || 'Dra. Mariana Silva',
      prescriberTitle: 'Biomédica Esteta / Responsável Técnica',
      prescriberCouncil: clinicData.registroConselho || 'CRBM 8421',
      prescriberCouncilState: clinicData.conselhoEstado || 'SP',
      clinicName: clinicData.nomeClinica || 'Clínica Estética Avançada',
      clinicAddress: clinicData.endereco || 'Av. Paulista, 1000 - São Paulo/SP',
      clinicPhone: clinicData.telefone || '(11) 99999-8888',
      clinicAlvara: clinicData.alvara || 'CEVS 355030801-865-000123-1-0',

      issueDate: patientData.data || today,
      validityDays: '30 dias',
      generalInstructions:
        '1. Medicamentos manipulados devem ser encomendados em farmácia de manipulação de sua confiança devidamente autorizada pela ANVISA.\n2. Manter os produtos ao abrigo da luz direta, calor excessivo e umidade.\n3. Em caso de hipersensibilidade ou irritação, suspender o uso e contatar a clínica imediatamente.\n4. Manter hidratação oral adequada (mínimo de 2 litros de água/dia) e aplicar protetor solar FPS 50+ a cada 3 horas.',
      urgentNotice: 'Em caso de dúvidas pós-procedimento, entre em contato pelo WhatsApp da Clínica.'
    };
  });

  // State for List of Prescribed Items
  const [prescribedItems, setPrescribedItems] = useState<PrescribedItem[]>(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.items && Array.isArray(parsed.items) && parsed.items.length > 0) {
          return parsed.items;
        }
      } catch (e) {
        console.error(e);
      }
    }
    // Default initial items from suggested formulas for this procedure
    return profile.suggestedFormulas.map((formula, idx) => ({
      id: `item_${Date.now()}_${idx}`,
      route: formula.route,
      title: formula.title,
      dosageForm: formula.dosageForm,
      quantity: formula.quantity,
      actives: formula.actives.map((a) => ({ ...a })),
      activesFreeText: formula.activesText,
      useActivesTable: false,
      posology: formula.posology,
      duration: formula.duration,
      cautions: formula.cautions || '',
      scientificEvidence: formula.scientificEvidence,
      showEvidenceInPrint: false
    }));
  });

  // UI state
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [selectedScientificModalFormula, setSelectedScientificModalFormula] = useState<ScientificFormula | null>(null);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const printContainerRef = useRef<HTMLDivElement>(null);

  // Sync patient name if updated from parent
  useEffect(() => {
    if (patientData.nomeCliente && (!config.patientName || config.patientName === 'Paciente Teste')) {
      setConfig((prev) => ({ ...prev, patientName: patientData.nomeCliente }));
    }
  }, [patientData.nomeCliente]);

  // Persist state to localStorage and sync with document
  const handleSaveToLocalStorage = () => {
    setIsSaving(true);
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          config,
          items: prescribedItems,
          savedAt: new Date().toISOString()
        })
      );

      // Generate markdown and synchronize with parent document editor
      const markdown = generatePrescriptionMarkdown(config, prescribedItems, cleanDocTitle);
      if (onSaveContent) {
        onSaveContent(markdown);
      }

      onToast('✅ Prescrição e fórmulas salvas com sucesso e sincronizadas com o documento!');
    } catch (e) {
      console.error(e);
      onToast('Erro ao salvar prescrição.');
    } finally {
      setTimeout(() => setIsSaving(false), 500);
    }
  };

  // Duplicate an existing formula
  const handleDuplicateItem = (item: PrescribedItem) => {
    const duplicated: PrescribedItem = {
      ...item,
      id: `item_${Date.now()}_copy`,
      title: `${item.title} (Cópia)`,
      actives: item.actives.map((a) => ({ ...a }))
    };
    setPrescribedItems((prev) => [...prev, duplicated]);
    setExpandedItemId(duplicated.id);
    onToast(`Fórmula "${item.title}" duplicada com sucesso!`);
  };

  // Add formula from library
  const handleAddFormulaFromLibrary = (formula: ScientificFormula) => {
    const newItem: PrescribedItem = {
      id: `item_${Date.now()}`,
      route: formula.route,
      title: formula.title,
      dosageForm: formula.dosageForm,
      quantity: formula.quantity,
      actives: formula.actives.map((a) => ({ ...a })),
      activesFreeText: formula.activesText,
      useActivesTable: false,
      posology: formula.posology,
      duration: formula.duration,
      cautions: formula.cautions || '',
      scientificEvidence: formula.scientificEvidence,
      showEvidenceInPrint: false
    };
    setPrescribedItems((prev) => [...prev, newItem]);
    setExpandedItemId(newItem.id);
    onToast(`➕ "${formula.title.substring(0, 32)}..." adicionada à prescrição!`);
  };

  // Add blank custom formula
  const handleAddBlankFormula = () => {
    const newItem: PrescribedItem = {
      id: `item_${Date.now()}`,
      route: 'USO TÓPICO',
      title: 'Nova Fórmula Personalizada',
      dosageForm: 'Sérum / Creme / Cápsulas',
      quantity: '30 mL / 30 cápsulas',
      actives: [
        { id: '1', name: 'Ativo Principal', concentration: '5%', role: 'Ação principal' }
      ],
      activesFreeText: 'Ativo Principal ............................................ 5%\nVeículo qsp ................................................. 30 mL',
      useActivesTable: false,
      posology: 'Aplicar ou tomar conforme orientação clínica.',
      duration: 'Uso diário por 30 dias.',
      cautions: 'Manter em local fresco e protegido da luz.',
      showEvidenceInPrint: false
    };
    setPrescribedItems((prev) => [...prev, newItem]);
    setExpandedItemId(newItem.id);
    onToast('Nova fórmula livre criada. Edite os campos abaixo!');
  };

  // Remove formula item
  const handleRemoveItem = (id: string) => {
    setPrescribedItems((prev) => prev.filter((item) => item.id !== id));
    onToast('Item removido da prescrição.');
  };

  // Move item up/down
  const handleMoveItem = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === prescribedItems.length - 1) return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const newItems = [...prescribedItems];
    const temp = newItems[index];
    newItems[index] = newItems[targetIdx];
    newItems[targetIdx] = temp;
    setPrescribedItems(newItems);
  };

  // Update item field
  const handleUpdateItem = (id: string, updates: Partial<PrescribedItem>) => {
    setPrescribedItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  // Reset to original profile formulas
  const handleResetToProfileDefaults = () => {
    if (
      window.confirm(
        'Deseja restaurar as fórmulas originais baseadas em evidências para este procedimento? As modificações atuais nesta receita serão substituídas.'
      )
    ) {
      const resetItems: PrescribedItem[] = profile.suggestedFormulas.map((formula, idx) => ({
        id: `item_${Date.now()}_${idx}`,
        route: formula.route,
        title: formula.title,
        dosageForm: formula.dosageForm,
        quantity: formula.quantity,
        actives: formula.actives.map((a) => ({ ...a })),
        activesFreeText: formula.activesText,
        useActivesTable: false,
        posology: formula.posology,
        duration: formula.duration,
        cautions: formula.cautions || '',
        scientificEvidence: formula.scientificEvidence,
        showEvidenceInPrint: false
      }));
      setPrescribedItems(resetItems);
      onToast('Fórmulas restauradas para os padrões científicos do procedimento.');
    }
  };

  // Generate plain text for WhatsApp or clipboard
  const generateFormattedText = () => {
    let text = `📋 *PRESCRIÇÃO & ORIENTAÇÕES CLÍNICAS*\n`;
    text += `*Procedimento:* ${cleanDocTitle}\n`;
    text += `*Paciente:* ${config.patientName || 'Não informado'}\n`;
    text += `*Data de Emissão:* ${config.issueDate} (Validade: ${config.validityDays})\n`;
    text += `*Profissional Prescritor:* ${config.prescriberName} (${config.prescriberCouncil}/${config.prescriberCouncilState})\n`;
    text += `*Clínica:* ${config.clinicName}\n`;
    text += `-------------------------------------------\n\n`;

    prescribedItems.forEach((item, idx) => {
      text += `*ITEM ${idx + 1} - [${item.route}]*\n`;
      text += `*${item.title.toUpperCase()}*\n`;
      text += `*Apresentação:* ${item.dosageForm} — ${item.quantity}\n\n`;
      text += `*Composição / Fórmula:*\n${item.activesFreeText}\n\n`;
      text += `*Modo de Usar / Posologia:*\n👉 ${item.posology}\n`;
      text += `*Tempo de Tratamento:* ${item.duration}\n`;
      if (item.cautions) {
        text += `*Cuidados:* ${item.cautions}\n`;
      }
      text += `\n-------------------------------------------\n\n`;
    });

    if (config.generalInstructions) {
      text += `*RECOMENDAÇÕES GERAIS AO PACIENTE:*\n${config.generalInstructions}\n\n`;
    }
    text += `*Dúvidas e Suporte:* ${config.clinicPhone}\n${config.clinicName}`;
    return text;
  };

  // Share to WhatsApp handler
  const handleShareWhatsApp = () => {
    const text = generateFormattedText();
    let phoneDigits = config.patientPhone.replace(/\D/g, '');
    if (phoneDigits && !phoneDigits.startsWith('55') && phoneDigits.length >= 10) {
      phoneDigits = '55' + phoneDigits;
    }
    const encodedText = encodeURIComponent(text);
    const url = phoneDigits
      ? `https://api.whatsapp.com/send?phone=${phoneDigits}&text=${encodedText}`
      : `https://api.whatsapp.com/send?text=${encodedText}`;

    window.open(url, '_blank');
    onToast('🚀 Abrindo WhatsApp para envio da prescrição...');
  };

  // Print A4 handler
  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'width=850,height=1000');
    if (!printWindow) {
      onToast('Por favor, permita popups no navegador para imprimir.');
      return;
    }

    const itemsHtml = prescribedItems
      .map(
        (item, idx) => `
        <div style="margin-bottom: 22px; padding: 14px 16px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #ec4899; border-radius: 6px; page-break-inside: avoid;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
            <span style="font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #be185d; background: #fce7f3; padding: 2px 8px; border-radius: 4px;">
              ${idx + 1}. ${item.route}
            </span>
            <span style="font-size: 10px; font-weight: 700; color: #475569;">
              ${item.dosageForm} &bull; <strong>${item.quantity}</strong>
            </span>
          </div>

          <h3 style="margin: 4px 0 8px 0; font-size: 13px; font-weight: 800; color: #0f172a; font-family: 'Segoe UI', Arial, sans-serif;">
            ${item.title}
          </h3>

          <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 8px 12px; margin-bottom: 8px; font-family: monospace; font-size: 10.5px; color: #1e293b; white-space: pre-wrap; line-height: 1.4;">${item.activesFreeText}</div>

          <div style="font-size: 11px; color: #0f172a; margin-bottom: 4px;">
            <strong style="color: #047857;">Modo de Usar / Posologia:</strong> ${item.posology}
          </div>

          <div style="display: flex; justify-content: space-between; font-size: 10px; color: #64748b; margin-top: 4px;">
            <span><strong>Duração:</strong> ${item.duration}</span>
            ${item.cautions ? `<span><strong>Atenção:</strong> ${item.cautions}</span>` : ''}
          </div>

          ${
            item.showEvidenceInPrint && item.scientificEvidence
              ? `<div style="margin-top: 8px; padding-top: 6px; border-top: 1px dashed #cbd5e1; font-size: 9px; color: #475569; font-style: italic;">
                  <strong style="color: #2563eb;">Respaldo Científico:</strong> ${item.scientificEvidence}
                </div>`
              : ''
          }
        </div>
      `
      )
      .join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <title>Prescrição Médica/Biomédica - ${config.patientName || 'Paciente'}</title>
          <meta charset="utf-8">
          <style>
            @page {
              size: A4 portrait;
              margin: 14mm 16mm 14mm 16mm;
            }
            body {
              font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
              color: #0f172a;
              margin: 0;
              padding: 0;
              background: #fff;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
              font-size: 11px;
              line-height: 1.5;
            }
            .presc-header {
              border-bottom: 2px solid #0f172a;
              padding-bottom: 12px;
              margin-bottom: 16px;
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
            }
            .presc-logo-box h1 {
              margin: 0;
              font-size: 16px;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              color: #0f172a;
            }
            .presc-logo-box p {
              margin: 2px 0 0 0;
              font-size: 9.5px;
              color: #475569;
            }
            .presc-patient-card {
              background-color: #f1f5f9;
              border: 1px solid #cbd5e1;
              border-radius: 6px;
              padding: 10px 14px;
              margin-bottom: 18px;
              display: grid;
              grid-template-columns: 2fr 1fr;
              gap: 8px;
            }
            .presc-signature-clean {
              margin-top: 36px;
              padding-top: 14px;
              display: flex;
              justify-content: center;
              page-break-inside: avoid;
              text-align: center;
            }
            .signature-line {
              width: 320px;
              border-bottom: 1.5px solid #0f172a;
              margin: 0 auto 6px auto;
            }
            @media print {
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>
          <div class="presc-header">
            <div class="presc-logo-box">
              <h1>${config.clinicName}</h1>
              <p>RT: ${config.prescriberName} &bull; ${config.prescriberCouncil}/${config.prescriberCouncilState} &bull; Alvará: ${config.clinicAlvara}</p>
              <p>${config.clinicAddress} &bull; Contato: ${config.clinicPhone}</p>
            </div>
            <div style="text-align: right;">
              <span style="font-size: 13px; font-weight: 800; color: #be185d; text-transform: uppercase; letter-spacing: 1px; display: block;">
                RECEITUÁRIO ESPECIALIZADO
              </span>
              <span style="font-size: 9.5px; color: #64748b;">
                ${cleanDocTitle}
              </span>
            </div>
          </div>

          <div class="presc-patient-card">
            <div>
              <div style="font-size: 11.5px; font-weight: 800; color: #0f172a; text-transform: uppercase;">
                PACIENTE: ${config.patientName || '________________________________________'}
              </div>
              <div style="font-size: 9.5px; color: #475569; margin-top: 2px;">
                ${config.patientCpf ? `CPF: ${config.patientCpf} &bull; ` : ''} ${config.patientPhone ? `Tel: ${config.patientPhone}` : ''}
              </div>
            </div>
            <div style="text-align: right; font-size: 9.5px; color: #475569;">
              <div><strong>Data de Emissão:</strong> ${config.issueDate}</div>
              <div><strong>Validade:</strong> ${config.validityDays}</div>
            </div>
          </div>

          <!-- LISTA DE FÓRMULAS -->
          <div class="presc-items-container">
            ${itemsHtml}
          </div>

          <!-- RECOMENDAÇÕES GERAIS -->
          ${
            config.generalInstructions
              ? `
              <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 6px; padding: 10px 14px; margin-top: 14px; page-break-inside: avoid;">
                <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #334155; margin-bottom: 4px;">
                  Orientações Gerais ao Paciente:
                </div>
                <div style="font-size: 9.5px; color: #475569; white-space: pre-wrap; line-height: 1.4;">${config.generalInstructions}</div>
              </div>
            `
              : ''
          }

          <!-- RODAPÉ DE ASSINATURA LIMPO E PROFISSIONAL (SEM CONFORMIDADE BUROCRÁTICA INDESEJADA) -->
          <div class="presc-signature-clean">
            <div>
              <div class="signature-line"></div>
              <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #0f172a;">
                ${config.prescriberName}
              </div>
              <div style="font-size: 9.5px; color: #475569;">
                ${config.prescriberCouncil}/${config.prescriberCouncilState} &bull; ${config.prescriberTitle}
              </div>
              <div style="font-size: 8.5px; color: #64748b; margin-top: 1px;">
                ${config.clinicName}
              </div>
            </div>
          </div>

          <div style="margin-top: 24px; padding-top: 8px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; font-size: 8px; color: #94a3b8;">
            <span>Documento emitido para fins terapêuticos e estéticos personalizados.</span>
            <span>${config.clinicName} &bull; Data: ${config.issueDate}</span>
          </div>

          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="w-full bg-[#0d0d10] text-zinc-100 rounded-2xl flex flex-col overflow-hidden border border-zinc-800 shadow-2xl">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-pink-950/40 via-zinc-900 to-zinc-900 border-b border-pink-500/20 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center shrink-0 shadow-lg shadow-pink-500/10 text-pink-400">
            <Pill className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-extrabold uppercase tracking-wider border border-pink-500/30">
                Prescrição Interativa & Fórmulas
              </span>
              <span className="text-xs text-zinc-400 font-medium">
                {profile.procedureName}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white mt-0.5 flex items-center gap-2">
              <span>{cleanDocTitle}</span>
            </h2>
          </div>
        </div>

        {/* Action Header Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Toggle Tab: Editor vs Preview */}
          <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-lg p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'editor'
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editor Interativo</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'preview'
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Visualizar A4</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 transition active:scale-95"
            title="Enviar prescrição direto para o WhatsApp do paciente"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Enviar WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-md shadow-pink-950"
            title="Imprimir ou salvar como PDF em folha A4"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir / PDF</span>
          </button>

          <button
            type="button"
            onClick={handleSaveToLocalStorage}
            disabled={isSaving}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-extrabold flex items-center gap-1.5 transition shadow-sm active:scale-95 cursor-pointer"
            title="Salvar alterações e sincronizar com o documento"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Salvando...' : 'Salvar & Sincronizar'}</span>
          </button>

          {onClose && (
            <button
              type="button"
              onClick={() => {
                handleSaveToLocalStorage();
                onClose();
              }}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center gap-1 text-xs font-semibold transition ml-1 cursor-pointer"
              title="Salvar e Fechar"
            >
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Concluir</span>
            </button>
          )}

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition cursor-pointer"
              title="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Scientific Justification Banner */}
      <div className="bg-[#141419] border-b border-zinc-800/80 px-4 py-3 text-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400 mt-0.5 shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white flex items-center gap-2">
                <span>Racional Farmacológico & Biológico</span>
                <span className="text-[10px] text-pink-400 bg-pink-500/10 px-2 py-0.2 rounded-full border border-pink-500/20">
                  Baseado em Evidências
                </span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed mt-0.5">
                {profile.scientificJustification}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
            <button
              type="button"
              onClick={handleResetToProfileDefaults}
              className="text-[11px] text-zinc-400 hover:text-amber-300 flex items-center gap-1 transition px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 hover:border-amber-500/30"
              title="Restaurar fórmulas científicas recomendadas"
            >
              <RotateCcw className="w-3 h-3 text-amber-400" />
              <span>Restaurar Padrão</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-6 overflow-y-auto max-h-[78vh] space-y-6">
        {activeTab === 'editor' ? (
          <>
            {/* Section 1: Prescriber and Patient Info Bar */}
            <div className="bg-[#15151a] border border-zinc-800 rounded-xl p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
                  <User className="w-4 h-4 text-pink-400" />
                  <span>Dados do Paciente e Prescritor (Editáveis)</span>
                </div>
                <span className="text-[11px] text-zinc-400">
                  Emissão: <strong className="text-zinc-200">{config.issueDate}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                    Nome do(a) Paciente
                  </label>
                  <input
                    type="text"
                    value={config.patientName}
                    onChange={(e) => setConfig({ ...config, patientName: e.target.value })}
                    placeholder="Nome Completo do Paciente"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-pink-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                    Telefone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={config.patientPhone}
                    onChange={(e) => setConfig({ ...config, patientPhone: e.target.value })}
                    placeholder="(00) 00000-0000"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-pink-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                    Profissional Prescritor(a)
                  </label>
                  <input
                    type="text"
                    value={config.prescriberName}
                    onChange={(e) => setConfig({ ...config, prescriberName: e.target.value })}
                    placeholder="Dra. Mariana Silva"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-pink-500 outline-none font-semibold"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                    Registro de Conselho (CRBM/CRM/CRF)
                  </label>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={config.prescriberCouncil}
                      onChange={(e) => setConfig({ ...config, prescriberCouncil: e.target.value })}
                      placeholder="CRBM 8421"
                      className="w-2/3 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-pink-500 outline-none"
                    />
                    <input
                      type="text"
                      value={config.prescriberCouncilState}
                      onChange={(e) => setConfig({ ...config, prescriberCouncilState: e.target.value.toUpperCase() })}
                      placeholder="SP"
                      maxLength={2}
                      className="w-1/3 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1.5 text-xs text-white focus:border-pink-500 outline-none text-center uppercase"
                    />
                  </div>
                </div>
              </div>

              {/* Extended collapsible details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                    Nome da Clínica
                  </label>
                  <input
                    type="text"
                    value={config.clinicName}
                    onChange={(e) => setConfig({ ...config, clinicName: e.target.value })}
                    placeholder="Clínica Estética"
                    className="w-full bg-zinc-900/70 border border-zinc-800 rounded-lg px-3 py-1 text-xs text-zinc-300 focus:border-pink-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                    Validade da Receita
                  </label>
                  <select
                    value={config.validityDays}
                    onChange={(e) => setConfig({ ...config, validityDays: e.target.value })}
                    className="w-full bg-zinc-900/70 border border-zinc-800 rounded-lg px-3 py-1 text-xs text-zinc-300 focus:border-pink-500 outline-none"
                  >
                    <option value="30 dias">30 dias</option>
                    <option value="60 dias">60 dias</option>
                    <option value="90 dias">90 dias</option>
                    <option value="180 dias">180 dias (Uso Contínuo)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                    Data de Emissão
                  </label>
                  <input
                    type="text"
                    value={config.issueDate}
                    onChange={(e) => setConfig({ ...config, issueDate: e.target.value })}
                    placeholder="DD/MM/AAAA"
                    className="w-full bg-zinc-900/70 border border-zinc-800 rounded-lg px-3 py-1 text-xs text-zinc-300 focus:border-pink-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Formula Quick-Add Library */}
            <div className="bg-[#15151a] border border-pink-500/20 rounded-xl p-4 sm:p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-pink-400" />
                    <span>Biblioteca de Fórmulas Baseadas em Evidências para este Procedimento</span>
                  </h3>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Clique em qualquer fórmula para adicionar instantaneamente à prescrição atual.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddBlankFormula}
                  className="px-3 py-1.5 rounded-lg bg-pink-600/20 hover:bg-pink-600 text-pink-300 hover:text-white border border-pink-500/40 text-xs font-bold flex items-center gap-1.5 transition shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Criar Fórmula Livre</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                {profile.suggestedFormulas.map((formula) => {
                  const isAlreadyAdded = prescribedItems.some((item) => item.title === formula.title);
                  return (
                    <div
                      key={formula.id}
                      className={`p-3 rounded-xl border transition-all flex flex-col justify-between ${
                        isAlreadyAdded
                          ? 'bg-zinc-900/90 border-pink-500/40 shadow-sm'
                          : 'bg-zinc-900/50 border-zinc-800 hover:border-pink-500/30 hover:bg-zinc-900'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <span className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wide bg-pink-500/10 text-pink-300 border border-pink-500/20">
                            {formula.categoryLabel}
                          </span>
                          <span className="text-[10px] text-zinc-400 font-mono">
                            {formula.quantity}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                          {formula.title}
                        </h4>
                        <p className="text-[10.5px] text-zinc-400 mt-1 line-clamp-2 italic">
                          {formula.posology}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-zinc-800/80">
                        <button
                          type="button"
                          onClick={() => setSelectedScientificModalFormula(formula)}
                          className="text-[10px] text-pink-400 hover:text-pink-300 flex items-center gap-1 font-semibold transition"
                          title="Ver mecanismo biológico e referências científicas"
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>Evidências</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAddFormulaFromLibrary(formula)}
                          className="px-2.5 py-1 rounded bg-pink-600 hover:bg-pink-500 text-white font-bold text-[11px] flex items-center gap-1 transition shadow-sm"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Adicionar</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Interactive Editable Prescribed Items List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Pill className="w-4 h-4 text-pink-400" />
                    <span>Itens Prescritos na Receita ({prescribedItems.length})</span>
                  </h3>
                  <span className="text-xs text-zinc-400 hidden sm:inline">
                    — Você pode editar qualquer campo, ativo, dosagem ou posologia
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleAddBlankFormula}
                  className="text-xs text-pink-400 hover:text-pink-300 font-bold flex items-center gap-1 transition hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar Mais um Item</span>
                </button>
              </div>

              {prescribedItems.length === 0 ? (
                <div className="text-center py-10 bg-[#15151a] border border-dashed border-zinc-800 rounded-xl">
                  <Pill className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                  <p className="text-zinc-400 text-xs font-semibold">
                    Nenhum item na receita no momento.
                  </p>
                  <p className="text-zinc-500 text-[11px] mt-0.5">
                    Selecione uma fórmula da biblioteca acima ou crie uma personalizada.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {prescribedItems.map((item, index) => {
                    const isExpanded = expandedItemId === item.id || expandedItemId === null;
                    return (
                      <div
                        key={item.id}
                        className="bg-[#15151a] border border-zinc-800 hover:border-zinc-700 rounded-xl p-4 sm:p-5 transition-all shadow-md"
                      >
                        {/* Item Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-400 font-bold text-xs flex items-center justify-center border border-pink-500/30">
                              {index + 1}
                            </span>
                            <select
                              value={item.route}
                              onChange={(e) =>
                                handleUpdateItem(item.id, {
                                  route: e.target.value as PrescribedItem['route']
                                })
                              }
                              className="bg-zinc-900 border border-pink-500/30 text-pink-300 font-extrabold text-[10px] uppercase rounded px-2 py-1 outline-none"
                            >
                              <option value="USO ORAL">USO ORAL</option>
                              <option value="USO TÓPICO">USO TÓPICO</option>
                              <option value="USO CAPILAR">USO CAPILAR</option>
                              <option value="USO SUBLINGUAL">USO SUBLINGUAL</option>
                            </select>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => handleUpdateItem(item.id, { title: e.target.value })}
                              placeholder="Nome da Fórmula ou Medicamento"
                              className="font-bold text-sm text-white bg-transparent border-b border-zinc-700 hover:border-pink-500 focus:border-pink-500 px-1 py-0.5 outline-none flex-1 min-w-[200px]"
                            />
                          </div>

                          <div className="flex items-center gap-1 self-end sm:self-center">
                            <button
                              type="button"
                              onClick={() => handleDuplicateItem(item)}
                              className="p-1 text-zinc-400 hover:text-pink-300 transition"
                              title="Duplicar esta fórmula"
                            >
                              <CopyPlus className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveItem(index, 'up')}
                              disabled={index === 0}
                              className="p-1 text-zinc-400 hover:text-white disabled:opacity-30 transition"
                              title="Subir na ordem da receita"
                            >
                              <ArrowUp className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveItem(index, 'down')}
                              disabled={index === prescribedItems.length - 1}
                              className="p-1 text-zinc-400 hover:text-white disabled:opacity-30 transition"
                              title="Descer na ordem da receita"
                            >
                              <ArrowDown className="w-4 h-4" />
                            </button>
                            <div className="h-4 w-px bg-zinc-800 mx-1" />
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(item.id)}
                              className="p-1 text-red-400 hover:text-red-300 transition"
                              title="Excluir este item da receita"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Item Fields */}
                        <div className="mt-4 space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                                Forma Farmacêutica / Apresentação
                              </label>
                              <input
                                type="text"
                                value={item.dosageForm}
                                onChange={(e) =>
                                  handleUpdateItem(item.id, { dosageForm: e.target.value })
                                }
                                placeholder="ex: Sérum Anidro Toque Seco, Cápsulas Vegetais, etc."
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-pink-500 outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                                Quantidade Total / Volume
                              </label>
                              <input
                                type="text"
                                value={item.quantity}
                                onChange={(e) =>
                                  handleUpdateItem(item.id, { quantity: e.target.value })
                                }
                                placeholder="ex: 30 mL, 60 cápsulas, 50 g"
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-pink-500 outline-none font-semibold"
                              />
                            </div>
                          </div>

                          {/* Actives composition text area */}
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="text-[10px] uppercase font-bold text-zinc-400 flex items-center gap-1">
                                <span>Composição / Fórmula Magistral (Ativos & Concentrações)</span>
                              </label>
                              <span className="text-[10px] text-zinc-500">
                                Edite diretamente o texto das concentrações
                              </span>
                            </div>
                            <textarea
                              rows={4}
                              value={item.activesFreeText}
                              onChange={(e) =>
                                handleUpdateItem(item.id, { activesFreeText: e.target.value })
                              }
                              placeholder="Digite a composição completa dos ativos..."
                              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 font-mono focus:border-pink-500 outline-none leading-relaxed"
                            />
                          </div>

                          {/* Posology & Treatment Duration */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="sm:col-span-2">
                              <label className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">
                                Modo de Usar / Posologia Detalhada
                              </label>
                              <textarea
                                rows={2}
                                value={item.posology}
                                onChange={(e) =>
                                  handleUpdateItem(item.id, { posology: e.target.value })
                                }
                                placeholder="ex: Aplicar 4 a 5 gotas na face limpa pela manhã e à noite..."
                                className="w-full bg-zinc-900 border border-emerald-500/40 rounded-lg p-2 text-xs text-emerald-200 focus:border-emerald-500 outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                                Duração do Uso
                              </label>
                              <input
                                type="text"
                                value={item.duration}
                                onChange={(e) =>
                                  handleUpdateItem(item.id, { duration: e.target.value })
                                }
                                placeholder="ex: Uso contínuo por 60 dias"
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-pink-500 outline-none"
                              />
                              <div className="mt-2 flex items-center gap-1.5">
                                <input
                                  type="checkbox"
                                  id={`evidence_print_${item.id}`}
                                  checked={item.showEvidenceInPrint || false}
                                  onChange={(e) =>
                                    handleUpdateItem(item.id, {
                                      showEvidenceInPrint: e.target.checked
                                    })
                                  }
                                  className="rounded border-zinc-700 text-pink-600 focus:ring-0"
                                />
                                <label
                                  htmlFor={`evidence_print_${item.id}`}
                                  className="text-[10px] text-zinc-400 select-none cursor-pointer"
                                >
                                  Incluir embasamento na impressão
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Section 4: General Instructions & Precautions */}
            <div className="bg-[#15151a] border border-zinc-800 rounded-xl p-4 sm:p-5 space-y-3">
              <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-pink-400" />
                <span>Orientações Gerais, Cuidados & Advertências ao Paciente</span>
              </h3>
              <textarea
                rows={4}
                value={config.generalInstructions}
                onChange={(e) => setConfig({ ...config, generalInstructions: e.target.value })}
                placeholder="Digite as recomendações gerais ao paciente..."
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-xs text-zinc-200 focus:border-pink-500 outline-none leading-relaxed"
              />
            </div>
          </>
        ) : (
          /* PREVIEW TAB: A4 Professional Medical Prescription Layout */
          <div className="flex justify-center p-2">
            <div
              ref={printContainerRef}
              className="bg-white text-zinc-900 rounded-xl shadow-2xl border border-zinc-300 p-8 sm:p-10 w-full max-w-[800px] min-h-[900px] flex flex-col justify-between select-text"
            >
              {/* Header */}
              <div>
                <div className="border-b-2 border-zinc-900 pb-3 mb-4 flex justify-between items-start">
                  <div>
                    <h1 className="text-base sm:text-lg font-black uppercase text-zinc-900 tracking-wide font-serif">
                      {config.clinicName}
                    </h1>
                    <p className="text-[10px] text-zinc-600 mt-0.5">
                      RT: <strong>{config.prescriberName}</strong> &bull; {config.prescriberCouncil}/{config.prescriberCouncilState} &bull; Alvará: {config.clinicAlvara}
                    </p>
                    <p className="text-[9px] text-zinc-500">
                      {config.clinicAddress} &bull; Contato: {config.clinicPhone}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-pink-700 uppercase tracking-wider block">
                      RECEITUÁRIO ESPECIALIZADO
                    </span>
                    <span className="text-[9.5px] text-zinc-500 font-medium">
                      {cleanDocTitle}
                    </span>
                  </div>
                </div>

                {/* Patient Box */}
                <div className="bg-zinc-100 border border-zinc-300 rounded-lg p-3 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="font-bold text-zinc-900 uppercase">
                      PACIENTE: {config.patientName || '__________________________________________'}
                    </div>
                    {config.patientPhone && (
                      <div className="text-[10px] text-zinc-600 mt-0.5">
                        WhatsApp / Tel: {config.patientPhone}
                      </div>
                    )}
                  </div>
                  <div className="sm:text-right text-[10px] text-zinc-600">
                    <div>
                      <strong>Data de Emissão:</strong> {config.issueDate}
                    </div>
                    <div>
                      <strong>Validade:</strong> {config.validityDays}
                    </div>
                  </div>
                </div>

                {/* Prescribed Items */}
                <div className="space-y-4">
                  {prescribedItems.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg border-l-4 border-l-pink-600"
                    >
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-[9px] font-extrabold uppercase tracking-wide bg-pink-100 text-pink-800 px-2 py-0.5 rounded">
                          {idx + 1}. {item.route}
                        </span>
                        <span className="text-[10px] text-zinc-600 font-semibold">
                          {item.dosageForm} &bull; <strong>{item.quantity}</strong>
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-zinc-900 mt-1 mb-2">
                        {item.title}
                      </h3>

                      <div className="bg-white border border-zinc-300 rounded p-2 text-[10.5px] text-zinc-800 font-mono whitespace-pre-wrap leading-relaxed mb-2">
                        {item.activesFreeText}
                      </div>

                      <div className="text-xs text-zinc-900 mb-1">
                        <strong className="text-emerald-700">Modo de Usar:</strong> {item.posology}
                      </div>

                      <div className="flex justify-between text-[10px] text-zinc-500">
                        <span><strong>Duração:</strong> {item.duration}</span>
                        {item.cautions && <span><strong>Cuidados:</strong> {item.cautions}</span>}
                      </div>

                      {item.showEvidenceInPrint && item.scientificEvidence && (
                        <div className="mt-2 pt-1 border-t border-dashed border-zinc-300 text-[9px] text-zinc-600 italic">
                          <strong className="text-blue-700">Respaldo Científico:</strong>{' '}
                          {item.scientificEvidence}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* General Instructions */}
                {config.generalInstructions && (
                  <div className="mt-5 p-3 bg-zinc-50 border border-dashed border-zinc-300 rounded-lg text-xs">
                    <div className="font-bold uppercase text-zinc-700 text-[10px] mb-1">
                      Orientações Gerais ao Paciente:
                    </div>
                    <div className="text-[10px] text-zinc-600 whitespace-pre-wrap leading-relaxed">
                      {config.generalInstructions}
                    </div>
                  </div>
                )}
              </div>

              {/* Clean Prescriber Signature Footer (Strictly without unnecessary bureaucracy) */}
              <div className="mt-10 pt-4 text-center">
                <div className="w-[300px] border-b-2 border-zinc-900 mx-auto mb-1.5" />
                <div className="font-bold text-xs uppercase text-zinc-900">
                  {config.prescriberName}
                </div>
                <div className="text-[10px] text-zinc-600">
                  {config.prescriberCouncil}/{config.prescriberCouncilState} &bull; {config.prescriberTitle}
                </div>
                <div className="text-[9px] text-zinc-500 mt-0.5">
                  {config.clinicName}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scientific Evidence Modal Drawer */}
      {selectedScientificModalFormula && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#18181f] border border-pink-500/30 rounded-2xl max-w-lg w-full p-5 sm:p-6 text-zinc-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2 text-pink-400 font-bold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Respaldo Científico & Farmacológico</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedScientificModalFormula(null)}
                className="w-7 h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
                {selectedScientificModalFormula.categoryLabel}
              </span>
              <h3 className="text-base font-bold text-white mt-1">
                {selectedScientificModalFormula.title}
              </h3>
            </div>

            <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-3.5 space-y-2 text-xs">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>Mecanismo de Ação Biológico</span>
              </div>
              <p className="text-zinc-300 text-[11.5px] leading-relaxed">
                {selectedScientificModalFormula.scientificEvidence}
              </p>
            </div>

            {selectedScientificModalFormula.scientificReferences && (
              <div className="space-y-1.5 text-xs">
                <div className="font-bold text-zinc-400 uppercase text-[10px]">
                  Publicações e Referências Indexadas (PubMed / JAAD / Jaad Case):
                </div>
                <ul className="space-y-1 text-[10.5px] text-zinc-400 list-disc list-inside">
                  {selectedScientificModalFormula.scientificReferences.map((ref, idx) => (
                    <li key={idx} className="leading-snug">{ref}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setSelectedScientificModalFormula(null)}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={() => {
                  handleAddFormulaFromLibrary(selectedScientificModalFormula);
                  setSelectedScientificModalFormula(null);
                }}
                className="px-3.5 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar à Prescrição</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
