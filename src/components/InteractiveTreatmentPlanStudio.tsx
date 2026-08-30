import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Sparkles,
  Save,
  RotateCcw,
  Undo2,
  Redo2,
  Trash2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Move,
  Pencil,
  ArrowRight,
  CircleDot,
  Minus,
  Square,
  Circle,
  Type,
  Upload,
  Download,
  Printer,
  X,
  Check,
  ChevronRight,
  ClipboardList,
  Camera,
  Layers,
  FileText,
  AlertCircle,
  Syringe,
  Info,
  HelpCircle,
  Eye,
  Sliders,
  Scissors
} from 'lucide-react';
import { PatientFormState } from '../utils/procedureClinicalDocsHelper';

export interface TreatmentPlanAnnotation {
  id: string;
  type: 'dot' | 'vector' | 'freehand' | 'line' | 'rect' | 'circle' | 'text';
  points: { x: number; y: number }[]; // In normalized coordinates [0..1] or pixel coordinates
  color: string;
  strokeWidth: number;
  label?: string;
  unitValue?: number; // e.g., 2 for 2U
  unitType?: 'U' | 'ml' | 'Fios' | 'pts';
  fontSize?: number;
}

export interface TreatmentPlanDataState {
  patientPhotoUrl: string | null;
  annotations: TreatmentPlanAnnotation[];
  productBrand: string;
  productBatch: string;
  productExpiration: string;
  productDilution: string;
  cannulaNeedle: string;
  anatomicalPlane: string;
  totalUnitsOrDose: string;
  muscleDosages: { region: string; dose: string; notes?: string }[];
  clinicalObservations: string;
  quickTags: string[];
  revisitDate: string;
  professionalNotes: string;
}

interface InteractiveTreatmentPlanStudioProps {
  procedureTitle: string;
  patient: PatientFormState;
  clinicName: string;
  clinicCnpj?: string;
  initialData?: Partial<TreatmentPlanDataState>;
  onGenerateDoc: (generatedHtml: string, dataState: TreatmentPlanDataState, annotatedImageBase64: string) => void;
  onClose: () => void;
  onToast?: (msg: string) => void;
}

// Preset Anatomical Background Templates
const ANATOMICAL_PRESETS = [
  { id: 'face_female', label: 'Face Feminina', category: 'Facial', icon: '👩' },
  { id: 'face_male', label: 'Face Masculina', category: 'Facial', icon: '👨' },
  { id: 'face_profile_left', label: 'Perfil 45° / Lateral', category: 'Facial', icon: '👤' },
  { id: 'lips_macro', label: 'Lábios & Terço Inferior', category: 'Facial', icon: '👄' },
  { id: 'eyes_glabella', label: 'Glabela & Olhos', category: 'Facial', icon: '👁️' },
  { id: 'neck_papada', label: 'Pescoço & Papada', category: 'Facial', icon: '🧕' },
  { id: 'gluteos', label: 'Glúteos & Quadrantes', category: 'Corporal', icon: '🍑' },
  { id: 'abdomen', label: 'Abdômen & Flancos', category: 'Corporal', icon: '🧘' },
  { id: 'legs_peim', label: 'Membros / Pernas (PEIM)', category: 'Corporal', icon: '🦵' },
];

// Clinical Color Palette
const CLINICAL_COLORS = [
  { hex: '#ec4899', name: 'Rosa Estético (Toxina/Pontos)' },
  { hex: '#06b6d4', name: 'Ciano (Vetores de Lifting)' },
  { hex: '#ef4444', name: 'Vermelho (Artérias/Zona Risco)' },
  { hex: '#eab308', name: 'Amarelo (Nervos/Alerta)' },
  { hex: '#22c55e', name: 'Verde (Áreas Seguras)' },
  { hex: '#8b5cf6', name: 'Roxo (Bioestimulador/Placas)' },
  { hex: '#3b82f6', name: 'Azul (Volumização AH)' },
  { hex: '#ffffff', name: 'Branco Contraste' },
  { hex: '#0f172a', name: 'Preto / Grafite' },
];

export const InteractiveTreatmentPlanStudio: React.FC<InteractiveTreatmentPlanStudioProps> = ({
  procedureTitle,
  patient,
  clinicName,
  clinicCnpj,
  initialData,
  onGenerateDoc,
  onClose,
  onToast = (_msg: string) => {},
}) => {
  // Canvas & Active Tool State
  const [selectedTool, setSelectedTool] = useState<
    'dot' | 'vector' | 'freehand' | 'line' | 'rect' | 'circle' | 'text' | 'pan' | 'eraser'
  >('dot');
  const [activeColor, setActiveColor] = useState<string>('#ec4899');
  const [strokeWidth, setStrokeWidth] = useState<number>(3);
  const [dotUnitValue, setDotUnitValue] = useState<number>(2);
  const [dotUnitType, setDotUnitType] = useState<'U' | 'ml' | 'Fios' | 'pts'>('U');
  const [textToStamp, setTextToStamp] = useState<string>('2U');

  // Zoom and Pan
  const [zoom, setZoom] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Background and Annotations
  const [selectedPreset, setSelectedPreset] = useState<string>('face_female');
  const [patientPhotoUrl, setPatientPhotoUrl] = useState<string | null>(initialData?.patientPhotoUrl || null);
  const [annotations, setAnnotations] = useState<TreatmentPlanAnnotation[]>(initialData?.annotations || []);
  const [undoStack, setUndoStack] = useState<TreatmentPlanAnnotation[][]>([]);
  const [redoStack, setRedoStack] = useState<TreatmentPlanAnnotation[][]>([]);

  // Active drawing in progress
  const [currentDrawing, setCurrentDrawing] = useState<TreatmentPlanAnnotation | null>(null);

  // Lateral Clinical Notes & Data State
  const [productBrand, setProductBrand] = useState<string>(initialData?.productBrand || 'Botox® / Dysport / Juvederm');
  const [productBatch, setProductBatch] = useState<string>(initialData?.productBatch || 'LOT-2026/A9');
  const [productExpiration, setProductExpiration] = useState<string>(initialData?.productExpiration || '12/2027');
  const [productDilution, setProductDilution] = useState<string>(initialData?.productDilution || '1.0 ml SF 0.9% (2.0 ml estéril)');
  const [cannulaNeedle, setCannulaNeedle] = useState<string>(initialData?.cannulaNeedle || 'Agulha 30G 4mm / Cânula 22G');
  const [anatomicalPlane, setAnatomicalPlane] = useState<string>(initialData?.anatomicalPlane || 'Intramuscular / Subdérmico');
  const [revisitDate, setRevisitDate] = useState<string>(initialData?.revisitDate || '15 a 21 dias');

  // Muscle Dosages Table
  const [muscleDosages, setMuscleDosages] = useState<{ region: string; dose: string; notes?: string }[]>(() => {
    if (initialData?.muscleDosages && initialData.muscleDosages.length > 0) {
      return initialData.muscleDosages;
    }
    const cleanTitle = procedureTitle.toLowerCase();
    if (cleanTitle.includes('toxina') || cleanTitle.includes('botox')) {
      return [
        { region: 'M. Frontal (Testa)', dose: '8 U', notes: 'Aplicação alta, evitar ptose' },
        { region: 'M. Prócero (Glabela Central)', dose: '4 U', notes: 'Ponto central' },
        { region: 'M. Corrugador Supercílio', dose: '8 U', notes: '4U em cada lado (D/E)' },
        { region: 'M. Orbicular dos Olhos (Pés de Galinha)', dose: '12 U', notes: '6U por lado' },
        { region: 'M. Nasal (Bunny Lines)', dose: '4 U', notes: '2U por lado' },
        { region: 'M. Mentual (Queixo)', dose: '4 U', notes: 'Ponto único central' },
        { region: 'M. Masseter (Bruxismo)', dose: '0 U', notes: 'Opcional / Sob avaliação' },
      ];
    } else if (cleanTitle.includes('preenchimento') || cleanTitle.includes('hialur')) {
      return [
        { region: 'Lábios (Contorno & Volume)', dose: '1.0 ml', notes: 'Bico de pato evitado, arco do cupido demarcado' },
        { region: 'Malar / Zigomático', dose: '1.0 ml', notes: 'Vetor de sustentação lateral' },
        { region: 'Sulco Nasogeniano (Bigode Chinês)', dose: '0.5 ml', notes: 'Cânula 22G subdérmico' },
        { region: 'Mento / Queixo', dose: '0.5 ml', notes: 'Projeção anterior supraperiósteo' },
      ];
    } else if (cleanTitle.includes('fios') || cleanTitle.includes('pdo')) {
      return [
        { region: 'Tração Terço Médio (Malar)', dose: '4 Fios', notes: 'Fios Espiculados 19G' },
        { region: 'Tração Mandibular (Jowl)', dose: '4 Fios', notes: 'Vetor horizontal para mastóide' },
        { region: 'Fox Eyes / Sobrancelha', dose: '2 Fios', notes: 'Cauda do supercílio' },
        { region: 'Fios Lisos (Glabela / Olheiras)', dose: '10 Fios', notes: 'Estímulo de colágeno' },
      ];
    }
    return [
      { region: 'Terço Superior', dose: '____', notes: 'Região demarcada no mapa' },
      { region: 'Terço Médio', dose: '____', notes: 'Região demarcada no mapa' },
      { region: 'Terço Inferior', dose: '____', notes: 'Região demarcada no mapa' },
    ];
  });

  const [clinicalObservations, setClinicalObservations] = useState<string>(
    initialData?.clinicalObservations ||
      'Paciente apresentou boa tolerância ao procedimento. Assepsia rigorosa com clorexidina alcoólica 2%. Não houve intercorrências imediatas nem sangramento atípico. Orientada quanto às restrições de atividade física e não massagear a área tratada nas primeiras 24 horas.'
  );

  const [quickTags, setQuickTags] = useState<string[]>(
    initialData?.quickTags || ['Assepsia 2% OK', 'Gelo Local', 'Sem Hematomas Imediatos', 'Retorno 15 Dias']
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Total calculation from dots on canvas + table
  const totalUnitsCalculated = React.useMemo(() => {
    const dotsSum = annotations
      .filter((a) => a.type === 'dot' && a.unitValue && a.unitValue > 0)
      .reduce((sum, a) => sum + (a.unitValue || 0), 0);

    return dotsSum;
  }, [annotations]);

  // Undo / Redo helpers
  const pushState = (newAnnotations: TreatmentPlanAnnotation[]) => {
    setUndoStack((prev) => [...prev, annotations]);
    setRedoStack([]);
    setAnnotations(newAnnotations);
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const previous = undoStack[undoStack.length - 1];
    setRedoStack((prev) => [...prev, annotations]);
    setUndoStack((prev) => prev.slice(0, prev.length - 1));
    setAnnotations(previous);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setUndoStack((prev) => [...prev, annotations]);
    setRedoStack((prev) => prev.slice(0, prev.length - 1));
    setAnnotations(next);
  };

  const handleClearAll = () => {
    if (window.confirm('Deseja limpar todas as marcações e desenhos do mapa anatômico?')) {
      pushState([]);
      onToast('Todas as marcações foram removidas.');
    }
  };

  // Upload Patient Photo
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const result = loadEvent.target?.result as string;
      setPatientPhotoUrl(result);
      onToast('Foto do paciente carregada com sucesso! Você pode desenhar livremente sobre ela.');
    };
    reader.readAsDataURL(file);
  };

  // Draw background preset template onto canvas if no custom photo
  const drawPresetBackground = (ctx: CanvasRenderingContext2D, width: number, height: number, presetId: string) => {
    // Fill background with soft medical slate
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);

    // Grid lines for clinical proportion
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const cx = width / 2;
    const cy = height / 2;

    ctx.save();
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2.2;
    ctx.fillStyle = '#ffffff';

    if (presetId === 'face_female' || presetId === 'face_male') {
      const isMale = presetId === 'face_male';
      const scale = Math.min(width, height) / 520;
      ctx.translate(cx, cy - 20 * scale);
      ctx.scale(scale, scale);

      // Face Oval / Jawline
      ctx.beginPath();
      if (isMale) {
        // More squared jawline
        ctx.moveTo(0, -180);
        ctx.bezierCurveTo(-140, -180, -150, -60, -150, 40);
        ctx.bezierCurveTo(-150, 140, -100, 190, -50, 205);
        ctx.lineTo(50, 205);
        ctx.bezierCurveTo(100, 190, 150, 140, 150, 40);
        ctx.bezierCurveTo(150, -60, 140, -180, 0, -180);
      } else {
        // Oval feminine
        ctx.moveTo(0, -185);
        ctx.bezierCurveTo(-135, -185, -145, -50, -145, 45);
        ctx.bezierCurveTo(-145, 145, -90, 210, 0, 220);
        ctx.bezierCurveTo(90, 210, 145, 145, 145, 45);
        ctx.bezierCurveTo(145, -50, 135, -185, 0, -185);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Hairline Guide
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(0, -110, 110, Math.PI, 0);
      ctx.stroke();
      ctx.setLineDash([]);

      // Eyebrows
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = isMale ? 3.5 : 2.5;
      // Left brow
      ctx.beginPath();
      ctx.moveTo(-90, -45);
      ctx.quadraticCurveTo(-55, isMale ? -52 : -62, -25, -46);
      ctx.stroke();
      // Right brow
      ctx.beginPath();
      ctx.moveTo(25, -46);
      ctx.quadraticCurveTo(55, isMale ? -52 : -62, 90, -45);
      ctx.stroke();

      // Eyes
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.8;
      // Left eye
      ctx.beginPath();
      ctx.ellipse(-55, -20, 26, 12, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(-55, -20, 6, 0, Math.PI * 2);
      ctx.fill();
      // Right eye
      ctx.beginPath();
      ctx.ellipse(55, -20, 26, 12, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(55, -20, 6, 0, Math.PI * 2);
      ctx.fill();

      // Nose
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(0, -35);
      ctx.lineTo(0, 42);
      ctx.quadraticCurveTo(0, 48, -14, 48);
      ctx.moveTo(0, 48);
      ctx.quadraticCurveTo(0, 48, 14, 48);
      ctx.stroke();

      // Lips
      ctx.strokeStyle = '#e11d48';
      ctx.fillStyle = '#ffe4e6';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(-45, 95);
      ctx.quadraticCurveTo(-20, 85, 0, 89);
      ctx.quadraticCurveTo(20, 85, 45, 95);
      ctx.quadraticCurveTo(0, 120, -45, 95);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // Mid lip line
      ctx.beginPath();
      ctx.moveTo(-45, 95);
      ctx.quadraticCurveTo(0, 99, 45, 95);
      ctx.stroke();

      // Chin / Mento demarcation
      ctx.strokeStyle = '#cbd5e1';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.arc(0, 155, 25, 0, Math.PI);
      ctx.stroke();
      ctx.setLineDash([]);

      // Terços faciais guides (Superior, Médio, Inferior)
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      // Linha dos Olhos / Glabela
      ctx.beginPath();
      ctx.moveTo(-160, -46);
      ctx.lineTo(160, -46);
      ctx.stroke();
      // Linha Subnasal
      ctx.beginPath();
      ctx.moveTo(-160, 48);
      ctx.lineTo(160, 48);
      ctx.stroke();

      // Label at bottom
      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 14px "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(isMale ? 'GABARITO: FACE MASCULINA' : 'GABARITO: FACE FEMININA', 0, 250);
    } else if (presetId === 'lips_macro') {
      const scale = Math.min(width, height) / 400;
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);

      // Large Lips Close-up
      ctx.fillStyle = '#fff1f2';
      ctx.strokeStyle = '#e11d48';
      ctx.lineWidth = 2.5;

      // Upper lip
      ctx.beginPath();
      ctx.moveTo(-140, 0);
      ctx.bezierCurveTo(-90, -45, -35, -55, 0, -35); // Cupid's bow center
      ctx.bezierCurveTo(35, -55, 90, -45, 140, 0);
      ctx.bezierCurveTo(70, -5, 0, 8, -140, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Lower lip
      ctx.beginPath();
      ctx.moveTo(-140, 0);
      ctx.bezierCurveTo(-80, 75, 80, 75, 140, 0);
      ctx.bezierCurveTo(70, 5, 0, 8, -140, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Tubérculos labels
      ctx.fillStyle = '#be123c';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Arco do Cupido', 0, -65);
      ctx.fillText('Tubérculo Lateral E', -70, 20);
      ctx.fillText('Tubérculo Central', 0, 25);
      ctx.fillText('Tubérculo Lateral D', 70, 20);

      // Philtrum columns
      ctx.strokeStyle = '#cbd5e1';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(-20, -100);
      ctx.lineTo(-12, -45);
      ctx.moveTo(20, -100);
      ctx.lineTo(12, -45);
      ctx.stroke();
      ctx.setLineDash([]);
    } else if (presetId === 'gluteos') {
      const scale = Math.min(width, height) / 420;
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);

      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2.5;
      ctx.fillStyle = '#ffffff';

      // Pelvis / Gluteus outline
      ctx.beginPath();
      ctx.moveTo(-150, -100);
      ctx.quadraticCurveTo(-170, 20, -140, 100);
      ctx.quadraticCurveTo(-100, 140, 0, 140);
      ctx.quadraticCurveTo(100, 140, 140, 100);
      ctx.quadraticCurveTo(170, 20, 150, -100);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Intergluteal cleft
      ctx.beginPath();
      ctx.moveTo(0, -60);
      ctx.lineTo(0, 140);
      ctx.stroke();

      // Quadrants divider dashed
      ctx.strokeStyle = '#94a3b8';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(-160, 20);
      ctx.lineTo(160, 20);
      ctx.stroke();
      ctx.setLineDash([]);

      // Quadrant labels
      ctx.fillStyle = '#db2777';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('QSE (Esq) - Zona Segura', -75, -15);
      ctx.fillText('QSE (Dir) - Zona Segura', 75, -15);
      ctx.fillStyle = '#64748b';
      ctx.fillText('QIE', -75, 60);
      ctx.fillText('QID', 75, 60);
    } else {
      // General Template with Anatomical Target Silhouette
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy - 50, 70, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(cx, cy + 90, 100, 70, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#475569';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`Gabarito Selecionado: ${presetId.toUpperCase()}`, cx, cy + 190);
    }

    ctx.restore();
  };

  // Re-render Canvas with background and all annotations
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    ctx.save();
    // Apply pan and zoom
    ctx.translate(panOffset.x, panOffset.y);
    ctx.translate(width / 2, height / 2);
    ctx.scale(zoom, zoom);
    ctx.translate(-width / 2, -height / 2);

    // 1. Render Background (Custom Patient Photo or Preset)
    if (patientPhotoUrl) {
      const img = new Image();
      img.src = patientPhotoUrl;
      if (img.complete) {
        // Draw image keeping aspect ratio centered
        const hRatio = width / img.width;
        const vRatio = height / img.height;
        const ratio = Math.min(hRatio, vRatio);
        const centerShiftX = (width - img.width * ratio) / 2;
        const centerShiftY = (height - img.height * ratio) / 2;

        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
      } else {
        img.onload = () => redrawCanvas();
      }
    } else {
      drawPresetBackground(ctx, width, height, selectedPreset);
    }

    // 2. Render Existing Annotations
    const allAnnotations = currentDrawing ? [...annotations, currentDrawing] : annotations;

    allAnnotations.forEach((item) => {
      ctx.save();
      ctx.strokeStyle = item.color;
      ctx.fillStyle = item.color;
      ctx.lineWidth = item.strokeWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (item.type === 'freehand' && item.points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(item.points[0].x, item.points[0].y);
        for (let i = 1; i < item.points.length; i++) {
          ctx.lineTo(item.points[i].x, item.points[i].y);
        }
        ctx.stroke();
      } else if (item.type === 'line' && item.points.length >= 2) {
        const p1 = item.points[0];
        const p2 = item.points[item.points.length - 1];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      } else if (item.type === 'vector' && item.points.length >= 2) {
        // Vector with arrow head
        const p1 = item.points[0];
        const p2 = item.points[item.points.length - 1];
        const headlen = Math.max(12, item.strokeWidth * 3.5);
        const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        // Arrow head
        ctx.beginPath();
        ctx.moveTo(p2.x, p2.y);
        ctx.lineTo(p2.x - headlen * Math.cos(angle - Math.PI / 6), p2.y - headlen * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(p2.x - headlen * Math.cos(angle + Math.PI / 6), p2.y - headlen * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.fill();

        // Small origin dot
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, item.strokeWidth * 1.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (item.type === 'rect' && item.points.length >= 2) {
        const p1 = item.points[0];
        const p2 = item.points[item.points.length - 1];
        ctx.strokeRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
      } else if (item.type === 'circle' && item.points.length >= 2) {
        const p1 = item.points[0];
        const p2 = item.points[item.points.length - 1];
        const radius = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      } else if (item.type === 'dot' && item.points.length >= 1) {
        const p = item.points[0];
        const radius = Math.max(7, item.strokeWidth * 2.8);

        // Outer glow/shadow ring
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius + 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();

        // Main dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = item.color;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Dot label / Unit badge
        if (item.label || (item.unitValue !== undefined && item.unitValue > 0)) {
          const text = item.label || `${item.unitValue}${item.unitType || 'U'}`;
          ctx.fillStyle = '#0f172a';
          ctx.font = 'bold 10px "Segoe UI", sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          // Background pill
          const textWidth = ctx.measureText(text).width;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.beginPath();
          ctx.roundRect(p.x - textWidth / 2 - 4, p.y - radius - 14, textWidth + 8, 14, 3);
          ctx.fill();
          ctx.strokeStyle = item.color;
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = item.color;
          ctx.fillText(text, p.x, p.y - radius - 7);
        }
      } else if (item.type === 'text' && item.points.length >= 1 && item.label) {
        const p = item.points[0];
        ctx.font = 'bold 13px "Segoe UI", sans-serif';
        const textWidth = ctx.measureText(item.label).width;

        // Background pill
        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.beginPath();
        ctx.roundRect(p.x - 6, p.y - 18, textWidth + 12, 24, 4);
        ctx.fill();
        ctx.strokeStyle = item.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.label, p.x, p.y - 6);
      }

      ctx.restore();
    });

    ctx.restore();
  }, [annotations, currentDrawing, patientPhotoUrl, selectedPreset, zoom, panOffset]);

  // Initial and reactive canvas sizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 640;
    canvas.height = 580;
    redrawCanvas();
  }, [redrawCanvas]);

  // Transform canvas mouse coordinates to logical drawing coordinates
  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Scale according to actual canvas buffer vs client display size
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const rawX = clientX * scaleX;
    const rawY = clientY * scaleY;

    // Invert Pan and Zoom transformations
    const width = canvas.width;
    const height = canvas.height;
    const centeredX = rawX - panOffset.x - width / 2;
    const centeredY = rawY - panOffset.y - height / 2;
    const unzoomedX = centeredX / zoom + width / 2;
    const unzoomedY = centeredY / zoom + height / 2;

    return { x: unzoomedX, y: unzoomedY, rawClientX: e.clientX, rawClientY: e.clientY };
  };

  // Mouse Handlers for Drawing & Panning
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (selectedTool === 'pan' || e.button === 1 || e.spaceKey) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
      return;
    }

    const { x, y } = getCanvasCoords(e);

    if (selectedTool === 'dot') {
      const newDot: TreatmentPlanAnnotation = {
        id: `dot_${Date.now()}_${Math.random()}`,
        type: 'dot',
        points: [{ x, y }],
        color: activeColor,
        strokeWidth: strokeWidth,
        unitValue: dotUnitValue,
        unitType: dotUnitType,
        label: `${dotUnitValue}${dotUnitType}`,
      };
      pushState([...annotations, newDot]);
    } else if (selectedTool === 'text') {
      const customText = prompt('Digite o texto ou nota para fixar na imagem:', textToStamp || '2U');
      if (customText) {
        setTextToStamp(customText);
        const newText: TreatmentPlanAnnotation = {
          id: `text_${Date.now()}`,
          type: 'text',
          points: [{ x, y }],
          color: activeColor,
          strokeWidth: strokeWidth,
          label: customText,
        };
        pushState([...annotations, newText]);
      }
    } else if (selectedTool === 'eraser') {
      // Find nearest annotation to click and remove it
      const threshold = 18 / zoom;
      const filtered = annotations.filter((a) => {
        return !a.points.some((p) => Math.hypot(p.x - x, p.y - y) <= threshold);
      });
      if (filtered.length !== annotations.length) {
        pushState(filtered);
        onToast('Marcação apagada.');
      }
    } else {
      // Starting vector, line, rect, circle, or freehand
      setCurrentDrawing({
        id: `shape_${Date.now()}`,
        type: selectedTool,
        points: [{ x, y }],
        color: activeColor,
        strokeWidth: strokeWidth,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPanning) {
      setPanOffset({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
      return;
    }

    if (!currentDrawing) return;

    const { x, y } = getCanvasCoords(e);

    if (currentDrawing.type === 'freehand') {
      setCurrentDrawing((prev) => (prev ? { ...prev, points: [...prev.points, { x, y }] } : null));
    } else {
      // Vector, Line, Rect, Circle
      setCurrentDrawing((prev) => (prev ? { ...prev, points: [prev.points[0], { x, y }] } : null));
    }
  };

  const handleMouseUp = () => {
    if (isPanning) {
      setIsPanning(false);
      return;
    }

    if (currentDrawing) {
      pushState([...annotations, currentDrawing]);
      setCurrentDrawing(null);
    }
  };

  // Zoom controls
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Wheel zoom handler
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  // Generate High-Res Annotated Image for PDF / Download
  const generateAnnotatedImageBase64 = (): string => {
    const canvas = canvasRef.current;
    if (!canvas) return '';

    // Create offscreen high-res canvas at 1200x1100
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = 1000;
    exportCanvas.height = 900;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return '';

    const width = exportCanvas.width;
    const height = exportCanvas.height;

    // Fill background
    if (patientPhotoUrl) {
      const img = new Image();
      img.src = patientPhotoUrl;
      const hRatio = width / img.width;
      const vRatio = height / img.height;
      const ratio = Math.min(hRatio, vRatio);
      const centerShiftX = (width - img.width * ratio) / 2;
      const centerShiftY = (height - img.height * ratio) / 2;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
    } else {
      drawPresetBackground(ctx, width, height, selectedPreset);
    }

    // Scale factor from working canvas to export canvas
    const scaleFactor = exportCanvas.width / canvas.width;

    annotations.forEach((item) => {
      ctx.save();
      ctx.strokeStyle = item.color;
      ctx.fillStyle = item.color;
      ctx.lineWidth = item.strokeWidth * scaleFactor;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (item.type === 'freehand' && item.points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(item.points[0].x * scaleFactor, item.points[0].y * scaleFactor);
        for (let i = 1; i < item.points.length; i++) {
          ctx.lineTo(item.points[i].x * scaleFactor, item.points[i].y * scaleFactor);
        }
        ctx.stroke();
      } else if (item.type === 'line' && item.points.length >= 2) {
        const p1 = item.points[0];
        const p2 = item.points[item.points.length - 1];
        ctx.beginPath();
        ctx.moveTo(p1.x * scaleFactor, p1.y * scaleFactor);
        ctx.lineTo(p2.x * scaleFactor, p2.y * scaleFactor);
        ctx.stroke();
      } else if (item.type === 'vector' && item.points.length >= 2) {
        const p1 = item.points[0];
        const p2 = item.points[item.points.length - 1];
        const headlen = Math.max(16, item.strokeWidth * scaleFactor * 3.5);
        const angle = Math.atan2((p2.y - p1.y) * scaleFactor, (p2.x - p1.x) * scaleFactor);

        ctx.beginPath();
        ctx.moveTo(p1.x * scaleFactor, p1.y * scaleFactor);
        ctx.lineTo(p2.x * scaleFactor, p2.y * scaleFactor);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(p2.x * scaleFactor, p2.y * scaleFactor);
        ctx.lineTo(
          p2.x * scaleFactor - headlen * Math.cos(angle - Math.PI / 6),
          p2.y * scaleFactor - headlen * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
          p2.x * scaleFactor - headlen * Math.cos(angle + Math.PI / 6),
          p2.y * scaleFactor - headlen * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fill();
      } else if (item.type === 'dot' && item.points.length >= 1) {
        const p = item.points[0];
        const radius = Math.max(9, item.strokeWidth * scaleFactor * 2.6);

        ctx.beginPath();
        ctx.arc(p.x * scaleFactor, p.y * scaleFactor, radius + 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x * scaleFactor, p.y * scaleFactor, radius, 0, Math.PI * 2);
        ctx.fillStyle = item.color;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        if (item.label || (item.unitValue !== undefined && item.unitValue > 0)) {
          const text = item.label || `${item.unitValue}${item.unitType || 'U'}`;
          ctx.fillStyle = '#0f172a';
          ctx.font = 'bold 13px "Segoe UI", sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          const textWidth = ctx.measureText(text).width;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.beginPath();
          ctx.roundRect(p.x * scaleFactor - textWidth / 2 - 5, p.y * scaleFactor - radius - 18, textWidth + 10, 16, 4);
          ctx.fill();
          ctx.strokeStyle = item.color;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          ctx.fillStyle = item.color;
          ctx.fillText(text, p.x * scaleFactor, p.y * scaleFactor - radius - 10);
        }
      } else if (item.type === 'text' && item.points.length >= 1 && item.label) {
        const p = item.points[0];
        ctx.font = 'bold 15px "Segoe UI", sans-serif';
        const textWidth = ctx.measureText(item.label).width;

        ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        ctx.beginPath();
        ctx.roundRect(p.x * scaleFactor - 8, p.y * scaleFactor - 22, textWidth + 16, 28, 5);
        ctx.fill();
        ctx.strokeStyle = item.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.label, p.x * scaleFactor, p.y * scaleFactor - 8);
      }
      ctx.restore();
    });

    return exportCanvas.toDataURL('image/png', 0.95);
  };

  // Download Annotated Image directly to disk
  const handleDownloadImage = () => {
    const dataUrl = generateAnnotatedImageBase64();
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `plano_tratamento_${patient.nomeCliente.replace(/\s+/g, '_')}_${Date.now()}.png`;
    a.click();
    onToast('Imagem com marcações salva no seu computador/celular!');
  };

  // Build Final Complete A4 HTML Document
  const handleSaveAndApply = () => {
    const annotatedImageBase64 = generateAnnotatedImageBase64();

    const rowsHtml = muscleDosages
      .map(
        (m, idx) => `
      <tr style="background: ${idx % 2 === 0 ? '#ffffff' : '#fafafa'};">
        <td style="padding: 4px 6px; border: 1px solid #cbd5e1; font-size: 8.8px; font-weight: 600; color: #1e293b;">
          ${m.region}
          ${m.notes ? `<div style="font-size: 7.8px; color: #64748b; font-weight: normal;">${m.notes}</div>` : ''}
        </td>
        <td style="padding: 4px 6px; border: 1px solid #cbd5e1; font-size: 9px; text-align: center; color: #db2777; font-weight: 700;">
          ${m.dose || '____'}
        </td>
      </tr>
    `
      )
      .join('');

    const finalHtml = `
<div style="font-family: 'Segoe UI', Arial, sans-serif; color: #0f172a; line-height: 1.4; font-size: 10.5px;">
  <!-- Cabeçalho Principal A4 -->
  <div style="border-bottom: 2px solid #ec4899; padding-bottom: 6px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
      <h2 style="margin: 0; font-size: 14.5px; font-weight: 800; color: #db2777; text-transform: uppercase; letter-spacing: 0.5px;">
        PLANO DE TRATAMENTO & MAPEAMENTO FOTOGRÁFICO
      </h2>
      <p style="margin: 2px 0 0 0; font-size: 9.5px; color: #475569;">
        <strong>${clinicName}</strong> &bull; RT: ${patient.profissionalResponsavel} (${patient.registroProfissional})
      </p>
    </div>
    <div style="text-align: right; font-size: 9px; color: #64748b;">
      <div><strong>Paciente:</strong> ${patient.nomeCliente}</div>
      <div><strong>Data:</strong> ${patient.data}</div>
    </div>
  </div>

  <!-- Box Superior com a Foto Anotada / Mapeamento de Pontos em Alta Resolução -->
  <div style="border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 4px 8px; background: #ffffff; margin-bottom: 8px;">
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 3px; margin-bottom: 4px;">
      <span style="font-weight: 800; font-size: 9.5px; color: #db2777; text-transform: uppercase; letter-spacing: 0.5px;">
        Mapeamento de Pontos & Vetores de Aplicação &bull; ${procedureTitle}
      </span>
      <span style="font-size: 8px; color: #64748b;">
        Total de Pontos Demarcados: <strong>${annotations.filter((a) => a.type === 'dot').length} pontos</strong> | Unidades: <strong>${totalUnitsCalculated} U</strong>
      </span>
    </div>
    <div style="text-align: center; max-height: 230px; overflow: hidden; display: flex; justify-content: center; align-items: center; background: #0f172a; border-radius: 4px;">
      <img src="${annotatedImageBase64}" alt="Mapeamento Fotográfico" style="max-height: 225px; width: auto; max-width: 100%; object-fit: contain;" />
    </div>
  </div>

  <!-- Duas Colunas: Lado Esquerdo (Detalhamento Técnico & Insumos) + Lado Direito (Tabela de Dosimetria) -->
  <div style="display: flex; gap: 8px; margin-bottom: 8px;">
    <!-- Coluna Esquerda: Especificações do Produto e Análise Clínica -->
    <div style="flex: 1.05; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 8px; background: #ffffff;">
      <div style="font-weight: 800; font-size: 10px; color: #0f172a; text-transform: uppercase; border-bottom: 1.5px solid #ec4899; padding-bottom: 3px; margin-bottom: 5px;">
        1. Insumos & Parâmetros Técnicos
      </div>
      <div style="font-size: 8.5px; color: #334155; line-height: 1.55;">
        <div><strong>Produto / Marca:</strong> ${productBrand}</div>
        <div><strong>Lote / Validade:</strong> ${productBatch} &bull; Val: ${productExpiration}</div>
        <div><strong>Diluição / Solvente:</strong> ${productDilution}</div>
        <div><strong>Calibre / Instrumental:</strong> ${cannulaNeedle}</div>
        <div><strong>Plano Anatômico:</strong> ${anatomicalPlane}</div>
        <div><strong>Retorno Programado:</strong> ${revisitDate}</div>
      </div>

      <div style="font-weight: 800; font-size: 9.5px; color: #0f172a; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-top: 6px; margin-bottom: 3px;">
        2. Estratégia Clínica & Conduta
      </div>
      <div style="font-size: 8.5px; color: #475569; line-height: 1.45; background: #f8fafc; padding: 4px 6px; border-radius: 4px; border: 1px dashed #cbd5e1;">
        ${clinicalObservations}
      </div>
    </div>

    <!-- Coluna Direita: Tabela de Músculos / Regiões e Dosimetria -->
    <div style="flex: 1.15; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 8px; background: #ffffff;">
      <div style="font-weight: 800; font-size: 10px; color: #db2777; text-transform: uppercase; border-bottom: 1.5px solid #ec4899; padding-bottom: 3px; margin-bottom: 4px;">
        3. Dosimetria por Região / Músculo
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 8.5px; margin-top: 2px;" border="1" bordercolor="#cbd5e1">
        <thead>
          <tr style="background: #fdf2f8; color: #9d174d; font-weight: bold; text-align: left;">
            <th style="padding: 3px 5px; border: 1px solid #cbd5e1;">REGIÃO / MÚSCULO</th>
            <th style="padding: 3px 5px; border: 1px solid #cbd5e1; text-align: center; width: 30%;">DOSE / UNID.</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
          <tr style="background: #fdf2f8; font-weight: bold; color: #0f172a;">
            <td style="padding: 3.5px 5px; border: 1px solid #cbd5e1; text-transform: uppercase; font-size: 8.8px;">TOTAL DO PROCEDIMENTO</td>
            <td style="padding: 3.5px 5px; border: 1px solid #cbd5e1; text-align: center; font-size: 9px; color: #db2777;">${totalUnitsCalculated > 0 ? `${totalUnitsCalculated} U` : 'Conforme Mapa'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Observações e Intercorrências -->
  <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 4px 8px; margin-bottom: 8px; background: #f8fafc; font-size: 8.5px;">
    <strong>Orientações ao Paciente:</strong> Não deitar por 4h, não massagear a área, não praticar exercícios intensos nas primeiras 24h e retornar para avaliação de retoque em ${revisitDate}.
  </div>

  <!-- Assinaturas Clínicas e do Paciente -->
  <div style="display: flex; justify-content: space-between; text-align: center; font-size: 9px; margin-top: 8px;">
    <div style="width: 46%;">
      <div style="border-bottom: 1.5px solid #0f172a; height: 20px; margin-bottom: 2px;"></div>
      <div style="font-weight: bold; text-transform: uppercase;">${patient.profissionalResponsavel}</div>
      <div style="font-size: 7.8px; color: #64748b;">${patient.registroProfissional} &bull; ${clinicName}</div>
    </div>
    <div style="width: 46%;">
      <div style="border-bottom: 1.5px solid #0f172a; height: 20px; margin-bottom: 2px;"></div>
      <div style="font-weight: bold; text-transform: uppercase;">${patient.nomeCliente}</div>
      <div style="font-size: 7.8px; color: #64748b;">Assinatura do(a) Paciente</div>
    </div>
  </div>
</div>
`;

    const dataState: TreatmentPlanDataState = {
      patientPhotoUrl,
      annotations,
      productBrand,
      productBatch,
      productExpiration,
      productDilution,
      cannulaNeedle,
      anatomicalPlane,
      totalUnitsOrDose: `${totalUnitsCalculated} U`,
      muscleDosages,
      clinicalObservations,
      quickTags,
      revisitDate,
      professionalNotes: clinicalObservations,
    };

    onGenerateDoc(finalHtml, dataState, annotatedImageBase64);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#121215] text-zinc-100 overflow-hidden font-sans select-none">
      {/* Top Header Bar */}
      <div className="px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400 shrink-0">
            <ClipboardList className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white truncate">Estúdio de Plano de Tratamento & Mapeamento</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                {procedureTitle}
              </span>
            </div>
            <div className="text-[11px] text-zinc-400 truncate">
              Paciente: <strong className="text-zinc-200">{patient.nomeCliente}</strong>
            </div>
          </div>
        </div>

        {/* Action Buttons Top */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadImage}
            className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition border border-zinc-700 active:scale-95 cursor-pointer"
            title="Baixar imagem mapeada com marcações em alta resolução"
          >
            <Download className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden sm:inline">Baixar Imagem</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAndApply}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-pink-950/50 transition active:scale-95 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Salvar & Aplicar no Prontuário</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Workspace: Left Canvas Studio + Right Clinical Notes Column */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT COLUMN: Drawing Canvas & Tools (60-65% width) */}
        <div className="flex-1 flex flex-col bg-[#0b0b0d] border-b lg:border-b-0 lg:border-r border-zinc-800 overflow-hidden relative">
          {/* Studio Toolbar (Tools, Colors, Sizes, Presets) */}
          <div className="px-3 py-2 bg-zinc-900/90 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-2 shrink-0">
            {/* Primary Drawing Tools */}
            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
              {/* Dot Injection Tool */}
              <button
                type="button"
                onClick={() => setSelectedTool('dot')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                  selectedTool === 'dot'
                    ? 'bg-pink-600 text-white shadow-md shadow-pink-900/50'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                }`}
                title="Ponto de Injeção / Toxina (Clique na imagem para marcar)"
              >
                <CircleDot className="w-3.5 h-3.5" />
                <span>Ponto</span>
              </button>

              {/* Vector / Arrow Tool */}
              <button
                type="button"
                onClick={() => setSelectedTool('vector')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                  selectedTool === 'vector'
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/50'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                }`}
                title="Vetor de Tração / Cânula em Leque (Arraste para desenhar seta)"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>Vetor / Fios</span>
              </button>

              {/* Freehand Pencil Tool */}
              <button
                type="button"
                onClick={() => setSelectedTool('freehand')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                  selectedTool === 'freehand'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/50'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                }`}
                title="Lápis / Desenho Livre (Desenhe rugas, sulcos e contornos)"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Lápis</span>
              </button>

              {/* Straight Line Tool */}
              <button
                type="button"
                onClick={() => setSelectedTool('line')}
                className={`px-2 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                  selectedTool === 'line'
                    ? 'bg-purple-600 text-white'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                }`}
                title="Linha Reta / Régua de Simetria"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              {/* Text Stamp Tool */}
              <button
                type="button"
                onClick={() => setSelectedTool('text')}
                className={`px-2 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                  selectedTool === 'text'
                    ? 'bg-amber-600 text-white'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                }`}
                title="Inserir Etiqueta de Texto / Dosagem"
              >
                <Type className="w-3.5 h-3.5" />
              </button>

              {/* Eraser Tool */}
              <button
                type="button"
                onClick={() => setSelectedTool('eraser')}
                className={`px-2 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                  selectedTool === 'eraser'
                    ? 'bg-red-600 text-white'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                }`}
                title="Borracha (Clique na marcação para apagar)"
              >
                <Scissors className="w-3.5 h-3.5" />
              </button>

              {/* Pan / Hand Tool */}
              <button
                type="button"
                onClick={() => setSelectedTool('pan')}
                className={`px-2 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                  selectedTool === 'pan'
                    ? 'bg-blue-600 text-white'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                }`}
                title="Navegar / Arrastar Foto com Zoom"
              >
                <Move className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Dose for Dot Tool */}
            {selectedTool === 'dot' && (
              <div className="flex items-center gap-1 bg-zinc-950 px-2 py-1 rounded-xl border border-zinc-800 text-xs">
                <span className="text-[10px] text-zinc-400 font-bold uppercase">Dose:</span>
                {[1, 2, 3, 4, 6].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setDotUnitValue(val)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold transition ${
                      dotUnitValue === val ? 'bg-pink-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {val}U
                  </button>
                ))}
              </div>
            )}

            {/* Color Palette */}
            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
              {CLINICAL_COLORS.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => setActiveColor(c.hex)}
                  className={`w-5 h-5 rounded-full border transition transform active:scale-90 ${
                    activeColor === c.hex ? 'scale-125 border-white shadow-lg' : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>

            {/* Undo / Redo / Clear */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={undoStack.length === 0}
                onClick={handleUndo}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 disabled:opacity-30 disabled:pointer-events-none transition"
                title="Desfazer (Ctrl+Z)"
              >
                <Undo2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                disabled={redoStack.length === 0}
                onClick={handleRedo}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 disabled:opacity-30 disabled:pointer-events-none transition"
                title="Refazer (Ctrl+Y)"
              >
                <Redo2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-red-950/60 text-zinc-400 hover:text-red-300 transition"
                title="Limpar Todas as Marcações"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Sub-bar: Photo Upload & Presets Selector */}
          <div className="px-3 py-1.5 bg-zinc-950/80 border-b border-zinc-800/80 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 overflow-x-auto py-0.5 scrollbar-none">
              <span className="text-[11px] text-zinc-400 font-semibold shrink-0">Origem:</span>

              {/* Upload Patient Photo Button */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition shrink-0 ${
                  patientPhotoUrl
                    ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
                }`}
              >
                <Camera className="w-3.5 h-3.5 text-pink-400" />
                <span>{patientPhotoUrl ? 'Trocar Foto do Paciente' : 'Anexar Foto do Paciente'}</span>
              </button>

              {patientPhotoUrl && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Remover a foto do paciente e voltar aos gabaritos anatômicos?')) {
                      setPatientPhotoUrl(null);
                    }
                  }}
                  className="text-zinc-500 hover:text-red-400 text-[11px] underline"
                >
                  Usar Gabarito
                </button>
              )}

              {/* Presets dropdown if no patient photo */}
              {!patientPhotoUrl && (
                <div className="flex items-center gap-1 overflow-x-auto">
                  {ANATOMICAL_PRESETS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPreset(p.id)}
                      className={`px-2 py-0.5 rounded text-[11px] whitespace-nowrap transition flex items-center gap-1 ${
                        selectedPreset === p.id
                          ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40 font-bold'
                          : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                      }`}
                    >
                      <span>{p.icon}</span>
                      <span>{p.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Zoom Controls Display */}
            <div className="flex items-center gap-1 shrink-0 bg-zinc-900 px-2 py-0.5 rounded-lg border border-zinc-800">
              <button
                type="button"
                onClick={handleZoomOut}
                className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white"
                title="Afastar (-)"
              >
                <ZoomOut className="w-3 h-3" />
              </button>
              <span className="text-[11px] font-mono text-zinc-300 w-12 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={handleZoomIn}
                className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white"
                title="Aproximar (+)"
              >
                <ZoomIn className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white text-[10px]"
                title="Resetar Zoom"
              >
                100%
              </button>
            </div>
          </div>

          {/* Interactive Canvas Viewport */}
          <div
            ref={containerRef}
            className="flex-1 overflow-hidden relative flex items-center justify-center bg-[#070709] cursor-crosshair"
            style={{ cursor: selectedTool === 'pan' || isPanning ? 'grab' : 'crosshair' }}
          >
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-zinc-800/80"
            />

            {/* Quick Helper Floating Pill */}
            <div className="absolute bottom-3 left-3 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 px-3 py-1.5 rounded-xl text-[11px] text-zinc-400 flex items-center gap-2 pointer-events-none shadow-lg">
              <Info className="w-3.5 h-3.5 text-pink-400 shrink-0" />
              <span>
                {selectedTool === 'dot' && 'Clique para posicionar pontos de dosagem.'}
                {selectedTool === 'vector' && 'Arraste para criar vetores direcionais de lifting/cânula.'}
                {selectedTool === 'freehand' && 'Desenhe livremente com o lápis nas zonas de interesse.'}
                {selectedTool === 'line' && 'Arraste para traçar linhas de proporção e simetria.'}
                {selectedTool === 'text' && 'Clique na foto para adicionar um rótulo ou anotação.'}
                {selectedTool === 'pan' && 'Arraste para navegar na imagem aproximada.'}
                {selectedTool === 'eraser' && 'Clique sobre qualquer marcação para excluí-la.'}
              </span>
            </div>

            {/* Total Points Badge */}
            <div className="absolute top-3 right-3 bg-zinc-900/90 backdrop-blur-md border border-pink-500/30 px-3 py-1.5 rounded-xl text-xs text-white flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <span>
                Pontos: <strong>{annotations.filter((a) => a.type === 'dot').length}</strong>
                {totalUnitsCalculated > 0 && ` (${totalUnitsCalculated} U Total)`}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Lateral Clinical Notes & Details (35-40% width) */}
        <div className="w-full lg:w-[460px] bg-zinc-900/95 flex flex-col overflow-y-auto border-t lg:border-t-0 shrink-0">
          <div className="p-4 space-y-4">
            {/* Header Box */}
            <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800/80">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2.5">
                <span className="font-bold text-xs text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Syringe className="w-3.5 h-3.5" />
                  <span>Especificações Técnicas</span>
                </span>
                <span className="text-[11px] text-zinc-400 font-mono">
                  {patient.data}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div>
                  <label className="text-[10px] text-zinc-400 font-bold block mb-1">PRODUTO / MARCA:</label>
                  <input
                    type="text"
                    value={productBrand}
                    onChange={(e) => setProductBrand(e.target.value)}
                    placeholder="Ex: Botox 100U / Restylane"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-100 text-xs focus:ring-1 focus:ring-pink-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 font-bold block mb-1">LOTE & VALIDADE:</label>
                  <input
                    type="text"
                    value={productBatch}
                    onChange={(e) => setProductBatch(e.target.value)}
                    placeholder="Ex: LOT-8849 / 12-2027"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-100 text-xs focus:ring-1 focus:ring-pink-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 font-bold block mb-1">DILUIÇÃO / SOLVENTE:</label>
                  <input
                    type="text"
                    value={productDilution}
                    onChange={(e) => setProductDilution(e.target.value)}
                    placeholder="Ex: 1.0ml SF 0.9%"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-100 text-xs focus:ring-1 focus:ring-pink-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 font-bold block mb-1">INSTRUMENTAL / CÂNULA:</label>
                  <input
                    type="text"
                    value={cannulaNeedle}
                    onChange={(e) => setCannulaNeedle(e.target.value)}
                    placeholder="Ex: Agulha 30G 4mm"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-100 text-xs focus:ring-1 focus:ring-pink-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Dosimetry Breakdown Table */}
            <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800/80">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2">
                <span className="font-bold text-xs text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-pink-400" />
                  <span>Dosimetria por Região / Músculo</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const newRegion = prompt('Nome do músculo ou região a adicionar:', 'M. Novo');
                    if (newRegion) {
                      setMuscleDosages((prev) => [...prev, { region: newRegion, dose: '____ U', notes: '' }]);
                    }
                  }}
                  className="text-[11px] text-pink-400 hover:text-pink-300 font-bold hover:underline"
                >
                  + Adicionar Região
                </button>
              </div>

              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {muscleDosages.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-zinc-900/80 border border-zinc-800/60 text-xs"
                  >
                    <div className="flex-1 min-w-0">
                      <input
                        type="text"
                        value={item.region}
                        onChange={(e) => {
                          const updated = [...muscleDosages];
                          updated[idx].region = e.target.value;
                          setMuscleDosages(updated);
                        }}
                        className="bg-transparent text-zinc-200 font-semibold text-xs outline-none w-full"
                      />
                      <input
                        type="text"
                        value={item.notes || ''}
                        onChange={(e) => {
                          const updated = [...muscleDosages];
                          updated[idx].notes = e.target.value;
                          setMuscleDosages(updated);
                        }}
                        placeholder="Observações do vetor/ponto..."
                        className="bg-transparent text-zinc-500 text-[10px] outline-none w-full"
                      />
                    </div>

                    <div className="w-24 shrink-0">
                      <input
                        type="text"
                        value={item.dose}
                        onChange={(e) => {
                          const updated = [...muscleDosages];
                          updated[idx].dose = e.target.value;
                          setMuscleDosages(updated);
                        }}
                        className="w-full px-2 py-1 rounded bg-zinc-950 border border-zinc-700 text-center font-bold text-pink-400 text-xs outline-none focus:ring-1 focus:ring-pink-500"
                        placeholder="Dose"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setMuscleDosages((prev) => prev.filter((_, i) => i !== idx));
                      }}
                      className="text-zinc-600 hover:text-red-400 p-1"
                      title="Excluir região"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Clinical Notes & Reminders */}
            <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800/80">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2">
                <span className="font-bold text-xs text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-pink-400" />
                  <span>Anotações & Detalhes da Paciente</span>
                </span>
                <span className="text-[10px] text-zinc-500">Lembretes clínicos</span>
              </div>

              {/* Quick tags buttons */}
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {[
                  'Assimetria Prévia',
                  'Pele Fina / Hematomas',
                  'Retoque em 15d',
                  'Vetor em Leque',
                  'Bolus Supraperiósteo',
                  'Gelo Pós-Aplicação',
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setClinicalObservations((prev) => (prev ? `${prev} [${tag}]` : `[${tag}]`));
                    }}
                    className="px-2 py-0.5 rounded-full text-[10px] bg-zinc-900 hover:bg-pink-950/50 hover:text-pink-300 text-zinc-400 border border-zinc-800 transition"
                  >
                    + {tag}
                  </button>
                ))}
              </div>

              <textarea
                value={clinicalObservations}
                onChange={(e) => setClinicalObservations(e.target.value)}
                rows={5}
                placeholder="Escreva aqui os detalhes particulares desta paciente para lembrar nas próximas sessões (ex: assimetrias, pontos de dor, preferências, planejamento de retoque)..."
                className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs leading-relaxed focus:ring-1 focus:ring-pink-500 outline-none resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
