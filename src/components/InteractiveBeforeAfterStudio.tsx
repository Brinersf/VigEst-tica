import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sliders,
  Columns,
  Eye,
  Tv,
  Download,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  Trash2,
  CheckCircle2,
  Plus,
  RefreshCw,
  X,
  Layers,
  ArrowRightLeft,
  Move,
  Info,
  Calendar,
  User,
  Star,
  Check
} from 'lucide-react';
import { PatientFormState } from '../utils/procedureClinicalDocsHelper';

export type PhotoAngle = 'frontal' | 'lateral_direita' | 'lateral_esquerda';

export interface AnglePhotoData {
  angle: PhotoAngle;
  title: string;
  subtitle: string;
  beforePhoto?: string;
  beforeDate?: string;
  beforeNotes?: string;
  afterPhoto?: string;
  afterDate?: string;
  afterNotes?: string;
  improvements?: string[];
}

export interface BeforeAfterDataState {
  procedureTitle: string;
  patientName: string;
  patientCpf: string;
  procedureDate: string;
  followupDate: string;
  clinicName: string;
  professionalName: string;
  professionalCouncil: string;
  overallNotes: string;
  patientSatisfaction: number; // 1-5
  photos: {
    frontal: AnglePhotoData;
    lateral_direita: AnglePhotoData;
    lateral_esquerda: AnglePhotoData;
  };
  keyHighlights: string[];
}

export type BeforeAfterStudioData = BeforeAfterDataState;

interface InteractiveBeforeAfterStudioProps {
  procedureTitle: string;
  patient: PatientFormState;
  clinicName: string;
  clinicCnpj?: string;
  initialData?: BeforeAfterDataState;
  onGenerateDoc: (generatedHtml: string, dataState: BeforeAfterDataState) => void;
  onClose: () => void;
  onToast?: (msg: string) => void;
}

// Sample clinical aesthetic portraits (Clean SVG/Canvas high-res previews for instant demo)
const createSampleFace = (angle: PhotoAngle, type: 'before' | 'after'): string => {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 700;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 700);
  bgGrad.addColorStop(0, '#1e2230');
  bgGrad.addColorStop(1, '#0f1118');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 600, 700);

  // Soft studio light backdrop
  const radial = ctx.createRadialGradient(300, 280, 50, 300, 320, 280);
  radial.addColorStop(0, 'rgba(56, 189, 248, 0.12)');
  radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, 600, 700);

  // Skin tone & contour
  ctx.save();
  ctx.translate(300, 320);

  // Shoulders & neck
  ctx.fillStyle = type === 'after' ? '#e2e8f0' : '#cbd5e1';
  ctx.beginPath();
  ctx.moveTo(-180, 280);
  ctx.quadraticCurveTo(-110, 180, -45, 120);
  ctx.lineTo(45, 120);
  ctx.quadraticCurveTo(110, 180, 180, 280);
  ctx.fill();

  // Face oval
  const faceGrad = ctx.createRadialGradient(
    angle === 'lateral_direita' ? 20 : angle === 'lateral_esquerda' ? -20 : 0,
    -10,
    30,
    0,
    0,
    140
  );
  faceGrad.addColorStop(0, type === 'after' ? '#fdf2f4' : '#fce7ea');
  faceGrad.addColorStop(0.7, type === 'after' ? '#f8d2d9' : '#f3bcc6');
  faceGrad.addColorStop(1, type === 'after' ? '#e8a5b2' : '#dc8f9e');
  ctx.fillStyle = faceGrad;

  ctx.beginPath();
  if (angle === 'frontal') {
    ctx.ellipse(0, 0, 100, 130, 0, 0, Math.PI * 2);
  } else if (angle === 'lateral_direita') {
    ctx.moveTo(10, -130);
    ctx.quadraticCurveTo(85, -50, 75, 40);
    ctx.quadraticCurveTo(55, 120, -10, 130);
    ctx.quadraticCurveTo(-75, 100, -85, -20);
    ctx.quadraticCurveTo(-85, -110, 10, -130);
  } else {
    ctx.moveTo(-10, -130);
    ctx.quadraticCurveTo(-85, -50, -75, 40);
    ctx.quadraticCurveTo(-55, 120, 10, 130);
    ctx.quadraticCurveTo(75, 100, 85, -20);
    ctx.quadraticCurveTo(85, -110, -10, -130);
  }
  ctx.fill();

  // Hair styling
  ctx.fillStyle = '#261b17';
  ctx.beginPath();
  ctx.arc(0, -30, 112, Math.PI * 0.9, Math.PI * 2.1, false);
  ctx.quadraticCurveTo(0, -90, 0, -30);
  ctx.fill();

  // Eyebrows
  ctx.strokeStyle = '#3d271e';
  ctx.lineWidth = type === 'after' ? 4.5 : 3.8;
  ctx.lineCap = 'round';

  // Brow lift in 'after'
  const browLift = type === 'after' ? -7 : 0;
  ctx.beginPath();
  ctx.moveTo(-60, -38 + browLift);
  ctx.quadraticCurveTo(-38, -48 + browLift, -18, -40 + browLift);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(18, -40 + browLift);
  ctx.quadraticCurveTo(38, -48 + browLift, 60, -38 + browLift);
  ctx.stroke();

  // Eyes
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#271912';
  ctx.lineWidth = 2;
  // Left eye
  ctx.beginPath();
  ctx.ellipse(-38, -25, 16, 9, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#452b1e';
  ctx.beginPath();
  ctx.arc(-38, -25, 6, 0, Math.PI * 2);
  ctx.fill();

  // Right eye
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(38, -25, 16, 9, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#452b1e';
  ctx.beginPath();
  ctx.arc(38, -25, 6, 0, Math.PI * 2);
  ctx.fill();

  // Wrinkles / Expressions (Only in 'before')
  if (type === 'before') {
    ctx.strokeStyle = 'rgba(120, 60, 60, 0.45)';
    ctx.lineWidth = 1.6;
    // Forehead lines
    ctx.beginPath();
    ctx.moveTo(-50, -85);
    ctx.quadraticCurveTo(0, -88, 50, -85);
    ctx.moveTo(-45, -72);
    ctx.quadraticCurveTo(0, -75, 45, -72);
    ctx.stroke();

    // Glabella lines
    ctx.beginPath();
    ctx.moveTo(-6, -48);
    ctx.lineTo(-6, -34);
    ctx.moveTo(6, -48);
    ctx.lineTo(6, -34);
    ctx.stroke();

    // Crow's feet
    ctx.beginPath();
    ctx.moveTo(-55, -28);
    ctx.lineTo(-68, -32);
    ctx.moveTo(-55, -24);
    ctx.lineTo(-70, -23);
    ctx.moveTo(55, -28);
    ctx.lineTo(68, -32);
    ctx.moveTo(55, -24);
    ctx.lineTo(70, -23);
    ctx.stroke();

    // Nasolabial fold
    ctx.beginPath();
    ctx.moveTo(-18, 15);
    ctx.quadraticCurveTo(-32, 45, -24, 68);
    ctx.moveTo(18, 15);
    ctx.quadraticCurveTo(32, 45, 24, 68);
    ctx.stroke();
  } else {
    // Skin Glow in 'after'
    const cheekGlow = ctx.createRadialGradient(-35, 15, 2, -35, 15, 30);
    cheekGlow.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
    cheekGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = cheekGlow;
    ctx.beginPath();
    ctx.arc(-35, 15, 30, 0, Math.PI * 2);
    ctx.fill();

    const cheekGlow2 = ctx.createRadialGradient(35, 15, 2, 35, 15, 30);
    cheekGlow2.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
    cheekGlow2.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = cheekGlow2;
    ctx.beginPath();
    ctx.arc(35, 15, 30, 0, Math.PI * 2);
    ctx.fill();
  }

  // Nose
  ctx.strokeStyle = '#b8757f';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(0, -30);
  ctx.lineTo(0, 18);
  ctx.quadraticCurveTo(0, 24, -8, 22);
  ctx.moveTo(0, 24);
  ctx.quadraticCurveTo(0, 24, 8, 22);
  ctx.stroke();

  // Lips (Plumper & hydrated in 'after')
  const lipColor = type === 'after' ? '#e11d48' : '#be4b61';
  ctx.fillStyle = lipColor;
  ctx.beginPath();
  if (type === 'after') {
    // Fuller lips
    ctx.moveTo(-28, 52);
    ctx.quadraticCurveTo(-14, 45, 0, 48);
    ctx.quadraticCurveTo(14, 45, 28, 52);
    ctx.quadraticCurveTo(16, 68, 0, 70);
    ctx.quadraticCurveTo(-16, 68, -28, 52);
  } else {
    ctx.moveTo(-24, 54);
    ctx.quadraticCurveTo(-12, 49, 0, 51);
    ctx.quadraticCurveTo(12, 49, 24, 54);
    ctx.quadraticCurveTo(14, 64, 0, 65);
    ctx.quadraticCurveTo(-14, 64, -24, 54);
  }
  ctx.fill();

  ctx.restore();

  // Badge watermark
  ctx.fillStyle = type === 'after' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(239, 68, 68, 0.9)';
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(20, 20, 110, 36, 8);
    ctx.fill();
  } else {
    ctx.fillRect(20, 20, 110, 36);
  }

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 15px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(type === 'after' ? 'DEPOIS' : 'ANTES', 75, 44);

  // Angle tag
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(20, 640, 240, 36, 8);
    ctx.fill();
  } else {
    ctx.fillRect(20, 640, 240, 36);
  }

  ctx.fillStyle = '#e2e8f0';
  ctx.font = '13px sans-serif';
  ctx.textAlign = 'left';
  const angleLabel =
    angle === 'frontal' ? 'Vista Frontal 0°' : angle === 'lateral_direita' ? 'Perfil Direito 45°' : 'Perfil Esquerdo 45°';
  ctx.fillText(`Ângulo: ${angleLabel}`, 32, 663);

  return canvas.toDataURL('image/jpeg', 0.95);
};

export const InteractiveBeforeAfterStudio: React.FC<InteractiveBeforeAfterStudioProps> = ({
  procedureTitle,
  patient,
  clinicName,
  clinicCnpj = '',
  initialData,
  onGenerateDoc,
  onClose,
  onToast = (_msg: string) => {},
}) => {
  // State for 3 Angles
  const [activeAngle, setActiveAngle] = useState<PhotoAngle>('frontal');
  const [viewMode, setViewMode] = useState<'slider' | 'side_by_side' | 'toggle' | 'gallery'>('slider');
  const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false);

  // Zoom & Pan state
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Slider comparison state (0 to 100%)
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isSliding, setIsSliding] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Toggle mode blink / animation state
  const [toggleState, setToggleState] = useState<'before' | 'after'>('after');
  const [isAutoBlinking, setIsAutoBlinking] = useState<boolean>(false);

  // Camera / Webcam modal state
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraTarget, setCameraTarget] = useState<{ angle: PhotoAngle; type: 'before' | 'after' } | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);

  // Primary Data State with default sample demo photos
  const [dataState, setDataState] = useState<BeforeAfterDataState>(() => {
    if (initialData) return initialData;

    return {
      procedureTitle,
      patientName: patient.nomeCliente,
      patientCpf: patient.cpfCliente,
      procedureDate: patient.data,
      followupDate: 'Retorno 15 dias',
      clinicName: clinicName || 'Sua Clínica',
      professionalName: patient.profissionalResponsavel,
      professionalCouncil: patient.registroProfissional,
      overallNotes: 'Resultado de alta harmonia facial, com excelente atenuação de linhas estáticas/dinâmicas e textura viçosa.',
      patientSatisfaction: 5,
      photos: {
        frontal: {
          angle: 'frontal',
          title: 'Vista Frontal (0°)',
          subtitle: 'Análise de simetria, terço superior e contornos centrais',
          beforePhoto: createSampleFace('frontal', 'before'),
          beforeDate: patient.data,
          beforeNotes: 'Linhas frontais e glabelares visíveis em repouso e mímica.',
          afterPhoto: createSampleFace('frontal', 'after'),
          afterDate: '15 dias pós',
          afterNotes: 'Pele uniforme, elevação graciosa da sobrancelha e suavização total das rugas.',
          improvements: ['Suavização de Linhas Frontais', 'Abertura do Olhar', 'Simetria Facial Aprimorada'],
        },
        lateral_direita: {
          angle: 'lateral_direita',
          title: 'Lateral Direita (Perfil 45°)',
          subtitle: 'Análise de projeção malar, ângulo mandibular e têmporas',
          beforePhoto: createSampleFace('lateral_direita', 'before'),
          beforeDate: patient.data,
          beforeNotes: 'Pés de galinha perioculares e sulco nasogeniano levemente marcado.',
          afterPhoto: createSampleFace('lateral_direita', 'after'),
          afterDate: '15 dias pós',
          afterNotes: 'Contorno mandibular nítido, redução de rugas dinâmicas periorbital.',
          improvements: ['Efeito Lifting Malar', 'Redução dos Pés de Galinha', 'Definição de Contorno'],
        },
        lateral_esquerda: {
          angle: 'lateral_esquerda',
          title: 'Lateral Esquerda (Perfil 45°)',
          subtitle: 'Análise de proporção labiomentoniana e volume lateral',
          beforePhoto: createSampleFace('lateral_esquerda', 'before'),
          beforeDate: patient.data,
          beforeNotes: 'Assimetria discreta no arqueamento e linhas de expressão.',
          afterPhoto: createSampleFace('lateral_esquerda', 'after'),
          afterDate: '15 dias pós',
          afterNotes: 'Harmonização perfeita dos vetores de sustentação e rejuvenescimento.',
          improvements: ['Harmonia Lateral', 'Melhora da Textura Cutânea', 'Rejuvenescimento Global'],
        },
      },
      keyHighlights: [
        'Atenuação de 90% das rugas dinâmicas',
        'Contorno facial redefinido e viçoso',
        'Expressão natural e descansada',
        'Resultado aprovado com satisfação total',
      ],
    };
  });

  // Current angle data
  const currentAngleData = dataState.photos[activeAngle];

  // Auto blink effect when enabled
  useEffect(() => {
    let interval: any;
    if (isAutoBlinking) {
      interval = setInterval(() => {
        setToggleState((prev) => (prev === 'before' ? 'after' : 'before'));
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isAutoBlinking]);

  // Zoom controls
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.35, 4));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const next = Math.max(prev - 0.35, 1);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1 && !isSliding) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }

    if (isSliding && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percent = (x / rect.width) * 100;
      setSliderPosition(percent);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsSliding(false);
  };

  // Touch handlers for mobile / iPad presentation
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isSliding && containerRef.current && e.touches[0]) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
      const percent = (x / rect.width) * 100;
      setSliderPosition(percent);
    }
  };

  // File Upload Handlers
  const handleFileUpload = (angle: PhotoAngle, type: 'before' | 'after', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      onToast('Por favor, selecione um arquivo de imagem válido (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setDataState((prev) => ({
        ...prev,
        photos: {
          ...prev.photos,
          [angle]: {
            ...prev.photos[angle],
            [type === 'before' ? 'beforePhoto' : 'afterPhoto']: result,
          },
        },
      }));
      onToast(`Foto do ${type === 'before' ? 'ANTES' : 'DEPOIS'} atualizada!`);
    };
    reader.readAsDataURL(file);
  };

  // Camera capture flow
  const startCamera = async (angle: PhotoAngle, type: 'before' | 'after') => {
    setCameraTarget({ angle, type });
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      cameraStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera error', err);
      onToast('Não foi possível acessar a câmera do dispositivo.');
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !cameraTarget) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

    setDataState((prev) => ({
      ...prev,
      photos: {
        ...prev.photos,
        [cameraTarget.angle]: {
          ...prev.photos[cameraTarget.angle],
          [cameraTarget.type === 'before' ? 'beforePhoto' : 'afterPhoto']: dataUrl,
        },
      },
    }));

    stopCamera();
    onToast(`Foto capturada com sucesso para o ${cameraTarget.type === 'before' ? 'ANTES' : 'DEPOIS'}!`);
  };

  const stopCamera = () => {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach((track) => track.stop());
      cameraStreamRef.current = null;
    }
    setIsCameraActive(false);
    setCameraTarget(null);
  };

  // Add key highlight tag
  const [newHighlightText, setNewHighlightText] = useState('');
  const handleAddHighlight = () => {
    if (!newHighlightText.trim()) return;
    setDataState((prev) => ({
      ...prev,
      keyHighlights: [...prev.keyHighlights, newHighlightText.trim()],
    }));
    setNewHighlightText('');
  };

  const handleRemoveHighlight = (idx: number) => {
    setDataState((prev) => ({
      ...prev,
      keyHighlights: prev.keyHighlights.filter((_, i) => i !== idx),
    }));
  };

  // Generate Clean A4 Clinical Report Document
  const handleApplyToDocument = () => {
    const pFrontal = dataState.photos.frontal;
    const pLatDir = dataState.photos.lateral_direita;
    const pLatEsq = dataState.photos.lateral_esquerda;

    const generatedHtml = `
<div style="font-family: 'Segoe UI', Arial, sans-serif; color: #0f172a; line-height: 1.4; font-size: 10px;">
  <!-- Cabeçalho Principal A4 -->
  <div style="border-bottom: 2px solid #ec4899; padding-bottom: 6px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
      <h2 style="margin: 0; font-size: 14.5px; font-weight: 800; color: #db2777; text-transform: uppercase; letter-spacing: 0.5px;">
        RELATÓRIO DE EVOLUÇÃO CLÍNICA & COMPARAÇÃO ANTES E DEPOIS
      </h2>
      <p style="margin: 2px 0 0 0; font-size: 9.5px; color: #475569;">
        <strong>${clinicName}</strong> &bull; RT: ${patient.profissionalResponsavel} (${patient.registroProfissional})
      </p>
    </div>
    <div style="text-align: right; font-size: 9px; color: #64748b;">
      <div><strong>Paciente:</strong> ${patient.nomeCliente}</div>
      <div><strong>Data do Procedimento:</strong> ${patient.data}</div>
    </div>
  </div>

  <!-- Box Informativo do Procedimento -->
  <div style="background: #fdf2f8; border: 1px solid #fbcfe8; border-radius: 6px; padding: 6px 10px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-size: 10.5px; font-weight: bold; color: #9d174d; text-transform: uppercase;">
        Procedimento Realizado: ${procedureTitle}
      </div>
      <div style="font-size: 9px; color: #701a75;">
        Acompanhamento fotográfico pericial padronizado com 3 ângulos anatômicos (Frontal, Lateral Direita e Lateral Esquerda).
      </div>
    </div>
    <div style="text-align: right; font-size: 9px; color: #831843; font-weight: bold;">
      <div>Avaliação de Satisfação: ⭐⭐⭐⭐⭐ (${dataState.patientSatisfaction}/5)</div>
      <div>Intervalo de Retorno: ${dataState.followupDate}</div>
    </div>
  </div>

  <!-- Mosaico Fotográfico de Alta Definição: 3 Ângulos (Frontal, Lateral Direita, Lateral Esquerda) -->
  <table style="width: 100%; border-collapse: separate; border-spacing: 6px; margin-bottom: 8px;">
    <tr>
      <!-- Ângulo 1: Frontal -->
      <td style="width: 33.33%; vertical-align: top; border: 1px solid #cbd5e1; border-radius: 6px; padding: 4px; background: #ffffff;">
        <div style="font-weight: 800; font-size: 9px; color: #db2777; text-align: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 3px; margin-bottom: 4px; text-transform: uppercase;">
          1. VISTA FRONTAL (0°)
        </div>
        <div style="display: flex; gap: 3px; justify-content: center; margin-bottom: 4px;">
          <div style="width: 48%; text-align: center;">
            <div style="font-size: 7.5px; font-weight: bold; color: #dc2626; margin-bottom: 1px;">ANTES</div>
            ${
              pFrontal.beforePhoto
                ? `<img src="${pFrontal.beforePhoto}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 4px; border: 1px solid #e2e8f0;" />`
                : `<div style="height: 110px; background: #f1f5f9; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 8px; color: #94a3b8;">Sem foto</div>`
            }
          </div>
          <div style="width: 48%; text-align: center;">
            <div style="font-size: 7.5px; font-weight: bold; color: #16a34a; margin-bottom: 1px;">DEPOIS</div>
            ${
              pFrontal.afterPhoto
                ? `<img src="${pFrontal.afterPhoto}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 4px; border: 1px solid #e2e8f0;" />`
                : `<div style="height: 110px; background: #f1f5f9; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 8px; color: #94a3b8;">Sem foto</div>`
            }
          </div>
        </div>
        <div style="font-size: 8px; color: #475569; padding: 2px 4px; background: #f8fafc; border-radius: 3px; min-height: 28px;">
          <strong>Evolução:</strong> ${pFrontal.afterNotes || 'Suavização e simetria atingidas.'}
        </div>
      </td>

      <!-- Ângulo 2: Lateral Direita -->
      <td style="width: 33.33%; vertical-align: top; border: 1px solid #cbd5e1; border-radius: 6px; padding: 4px; background: #ffffff;">
        <div style="font-weight: 800; font-size: 9px; color: #db2777; text-align: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 3px; margin-bottom: 4px; text-transform: uppercase;">
          2. LATERAL DIREITA (45°)
        </div>
        <div style="display: flex; gap: 3px; justify-content: center; margin-bottom: 4px;">
          <div style="width: 48%; text-align: center;">
            <div style="font-size: 7.5px; font-weight: bold; color: #dc2626; margin-bottom: 1px;">ANTES</div>
            ${
              pLatDir.beforePhoto
                ? `<img src="${pLatDir.beforePhoto}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 4px; border: 1px solid #e2e8f0;" />`
                : `<div style="height: 110px; background: #f1f5f9; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 8px; color: #94a3b8;">Sem foto</div>`
            }
          </div>
          <div style="width: 48%; text-align: center;">
            <div style="font-size: 7.5px; font-weight: bold; color: #16a34a; margin-bottom: 1px;">DEPOIS</div>
            ${
              pLatDir.afterPhoto
                ? `<img src="${pLatDir.afterPhoto}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 4px; border: 1px solid #e2e8f0;" />`
                : `<div style="height: 110px; background: #f1f5f9; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 8px; color: #94a3b8;">Sem foto</div>`
            }
          </div>
        </div>
        <div style="font-size: 8px; color: #475569; padding: 2px 4px; background: #f8fafc; border-radius: 3px; min-height: 28px;">
          <strong>Evolução:</strong> ${pLatDir.afterNotes || 'Definição de contorno e terço médio.'}
        </div>
      </td>

      <!-- Ângulo 3: Lateral Esquerda -->
      <td style="width: 33.33%; vertical-align: top; border: 1px solid #cbd5e1; border-radius: 6px; padding: 4px; background: #ffffff;">
        <div style="font-weight: 800; font-size: 9px; color: #db2777; text-align: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 3px; margin-bottom: 4px; text-transform: uppercase;">
          3. LATERAL ESQUERDA (45°)
        </div>
        <div style="display: flex; gap: 3px; justify-content: center; margin-bottom: 4px;">
          <div style="width: 48%; text-align: center;">
            <div style="font-size: 7.5px; font-weight: bold; color: #dc2626; margin-bottom: 1px;">ANTES</div>
            ${
              pLatEsq.beforePhoto
                ? `<img src="${pLatEsq.beforePhoto}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 4px; border: 1px solid #e2e8f0;" />`
                : `<div style="height: 110px; background: #f1f5f9; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 8px; color: #94a3b8;">Sem foto</div>`
            }
          </div>
          <div style="width: 48%; text-align: center;">
            <div style="font-size: 7.5px; font-weight: bold; color: #16a34a; margin-bottom: 1px;">DEPOIS</div>
            ${
              pLatEsq.afterPhoto
                ? `<img src="${pLatEsq.afterPhoto}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 4px; border: 1px solid #e2e8f0;" />`
                : `<div style="height: 110px; background: #f1f5f9; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 8px; color: #94a3b8;">Sem foto</div>`
            }
          </div>
        </div>
        <div style="font-size: 8px; color: #475569; padding: 2px 4px; background: #f8fafc; border-radius: 3px; min-height: 28px;">
          <strong>Evolução:</strong> ${pLatEsq.afterNotes || 'Harmonização global e viço tissular.'}
        </div>
      </td>
    </tr>
  </table>

  <!-- Destaques Clínicos e Observações Periciais -->
  <div style="display: flex; gap: 8px; margin-bottom: 8px;">
    <!-- Destaques Atingidos -->
    <div style="flex: 1; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 8px; background: #ffffff;">
      <div style="font-weight: 800; font-size: 9.5px; color: #0f172a; text-transform: uppercase; border-bottom: 1.5px solid #ec4899; padding-bottom: 2px; margin-bottom: 4px;">
        Destaques e Conquistas do Tratamento
      </div>
      <ul style="margin: 0; padding-left: 14px; font-size: 8.5px; color: #334155; line-height: 1.5;">
        ${dataState.keyHighlights.map((h) => `<li>${h}</li>`).join('')}
      </ul>
    </div>

    <!-- Parecer Técnico Pericial -->
    <div style="flex: 1.2; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 8px; background: #ffffff;">
      <div style="font-weight: 800; font-size: 9.5px; color: #0f172a; text-transform: uppercase; border-bottom: 1.5px solid #ec4899; padding-bottom: 2px; margin-bottom: 4px;">
        Parecer Clínico & Conduta de Manutenção
      </div>
      <div style="font-size: 8.5px; color: #334155; line-height: 1.5;">
        ${dataState.overallNotes}
        <div style="margin-top: 4px; font-size: 8px; color: #64748b;">
          <strong>Orientação:</strong> Manter hidratação cutânea diária, fotoproteção FPS 50+ e agendar próxima sessão preventiva conforme plano terapêutico.
        </div>
      </div>
    </div>
  </div>

  <!-- Termo de Ciência e Assinaturas -->
  <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 6px; padding: 5px 8px; font-size: 7.8px; color: #475569; margin-bottom: 10px;">
    <strong>TERMO DE CIÊNCIA & REGISTRO DE EVOLUÇÃO (LGPD & ANVISA):</strong> O(A) paciente declara ter visualizado e concordado com a documentação fotográfica comparativa de seu tratamento, atestando o recebimento de todas as explicações técnicas e orientações pós-procedimento.
  </div>

  <div style="display: flex; justify-content: space-between; text-align: center; font-size: 9px; margin-top: 8px;">
    <div style="width: 46%;">
      <div style="border-bottom: 1.5px solid #0f172a; height: 18px; margin-bottom: 2px;"></div>
      <div style="font-weight: bold; text-transform: uppercase;">${patient.profissionalResponsavel}</div>
      <div style="font-size: 7.8px; color: #64748b;">${patient.registroProfissional} &bull; ${clinicName}</div>
    </div>
    <div style="width: 46%;">
      <div style="border-bottom: 1.5px solid #0f172a; height: 18px; margin-bottom: 2px;"></div>
      <div style="font-weight: bold; text-transform: uppercase;">${patient.nomeCliente}</div>
      <div style="font-size: 7.8px; color: #64748b;">Assinatura do(a) Paciente</div>
    </div>
  </div>
</div>
`;

    onGenerateDoc(generatedHtml, dataState);
  };

  return (
    <div
      className={`flex flex-col h-full bg-[#0d0f14] text-zinc-100 select-none overflow-hidden ${
        isPresentationMode ? 'fixed inset-0 z-[100]' : ''
      }`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* Top Navigation Bar */}
      <div className="h-16 px-4 bg-[#141721] border-b border-zinc-800 flex items-center justify-between gap-4 shrink-0 shadow-lg">
        {/* Left: Title & Patient Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-600 to-rose-500 flex items-center justify-center text-white shadow-md shadow-pink-900/30 shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-zinc-100 truncate">Estúdio de Análise Antes e Depois</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30 uppercase tracking-wider">
                3 Ângulos Faciais
              </span>
            </div>
            <div className="text-xs text-zinc-400 truncate flex items-center gap-2">
              <span className="text-zinc-200 font-medium">{procedureTitle}</span>
              <span>&bull;</span>
              <span className="text-zinc-400">Paciente: <strong className="text-zinc-200">{patient.nomeCliente}</strong></span>
            </div>
          </div>
        </div>

        {/* Center: Angle Selector (Frontal, Lateral Direita, Lateral Esquerda) */}
        <div className="flex items-center bg-[#1c202e] p-1 rounded-xl border border-zinc-700/80 shadow-inner">
          <button
            type="button"
            onClick={() => {
              setActiveAngle('frontal');
              handleResetZoom();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeAngle === 'frontal'
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md shadow-pink-950/40'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            <span>1. Frontal (0°)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveAngle('lateral_direita');
              handleResetZoom();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeAngle === 'lateral_direita'
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md shadow-pink-950/40'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            <span>2. Lateral Direita (45°)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveAngle('lateral_esquerda');
              handleResetZoom();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeAngle === 'lateral_esquerda'
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md shadow-pink-950/40'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            <span>3. Lateral Esquerda (45°)</span>
          </button>
        </div>

        {/* Right: Presentation Mode & Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsPresentationMode(!isPresentationMode)}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-md ${
              isPresentationMode
                ? 'bg-amber-500 text-black hover:bg-amber-400 shadow-amber-900/30'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 shadow-purple-900/30'
            }`}
            title="Modo Apresentação para o Paciente (TV / Tablet / Tela Cheia)"
          >
            <Tv className="w-4 h-4" />
            <span>{isPresentationMode ? 'Sair da Apresentação' : 'Apresentar ao Paciente'}</span>
          </button>

          <button
            type="button"
            onClick={handleApplyToDocument}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-950/40 transition active:scale-95 cursor-pointer"
          >
            <FileCheck className="w-4 h-4" />
            <span>Gerar Prontuário A4</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 flex items-center justify-center transition cursor-pointer"
            title="Fechar Estúdio"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Photo Canvas & Comparison Tools */}
        <div className="flex-1 flex flex-col bg-[#0b0c10] relative overflow-hidden">
          {/* Sub-header Toolbar: View Modes & Zoom Controls */}
          <div className="h-12 px-4 bg-[#12151e]/90 backdrop-blur border-b border-zinc-800/80 flex items-center justify-between gap-3 shrink-0 z-10">
            {/* View Mode Pills */}
            <div className="flex items-center gap-1 bg-[#1a1e2b] p-1 rounded-lg border border-zinc-800">
              <button
                type="button"
                onClick={() => setViewMode('slider')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                  viewMode === 'slider' ? 'bg-pink-600 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Divisor Deslizante Interativo (Antes e Depois)"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Divisor Cortina</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('side_by_side')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                  viewMode === 'side_by_side' ? 'bg-pink-600 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Lado a Lado Sincronizado"
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Lado a Lado</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('toggle')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                  viewMode === 'toggle' ? 'bg-pink-600 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Alternância Rápida / Efeito Transição"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>Alternar Rápido</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('gallery')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                  viewMode === 'gallery' ? 'bg-pink-600 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Mosaico Panorâmico dos 3 Ângulos"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Mosaico 3 Ângulos</span>
              </button>
            </div>

            {/* Zoom Controls (Aproximar / Afastar / Mover) */}
            <div className="flex items-center gap-2 bg-[#1a1e2b] px-2.5 py-1 rounded-lg border border-zinc-800">
              <span className="text-[11px] text-zinc-400 font-medium">Zoom:</span>
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoom <= 1}
                className="p-1 rounded hover:bg-zinc-700 text-zinc-300 disabled:opacity-30 cursor-pointer"
                title="Afastar (Zoom Out)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold text-pink-400 min-w-[42px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoom >= 4}
                className="p-1 rounded hover:bg-zinc-700 text-zinc-300 disabled:opacity-30 cursor-pointer"
                title="Aproximar / Ampliar (Zoom In)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              {zoom > 1 && (
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-[10px] font-bold text-zinc-300 transition cursor-pointer flex items-center gap-1"
                  title="Redefinir Zoom"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>100%</span>
                </button>
              )}
            </div>

            {/* Quick Upload Action Buttons for current angle */}
            <div className="flex items-center gap-2">
              <label className="px-2.5 py-1 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 hover:bg-red-500/25 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition">
                <Upload className="w-3.5 h-3.5 text-red-400" />
                <span>Trocar Antes</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(activeAngle, 'before', e)}
                  className="hidden"
                />
              </label>

              <label className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition">
                <Upload className="w-3.5 h-3.5 text-emerald-400" />
                <span>Trocar Depois</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(activeAngle, 'after', e)}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => startCamera(activeAngle, 'after')}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition cursor-pointer"
                title="Tirar Foto com a Câmera"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Canvas Comparison Stage */}
          <div
            ref={containerRef}
            className={`flex-1 relative flex items-center justify-center p-4 overflow-hidden select-none ${
              zoom > 1 ? 'cursor-grab active:cursor-grabbing' : ''
            }`}
            onMouseDown={handleMouseDown}
          >
            {/* View Mode 1: Interactive Split Slider (Cortina) */}
            {viewMode === 'slider' && (
              <div
                className="relative w-full max-w-4xl h-full max-h-[75vh] rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 bg-zinc-950 flex items-center justify-center"
                style={{ touchAction: 'none' }}
              >
                {/* AFTER IMAGE (Base / Background) */}
                <div
                  className="absolute inset-0 w-full h-full flex items-center justify-center transition-transform duration-75"
                  style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  }}
                >
                  {currentAngleData.afterPhoto ? (
                    <img
                      src={currentAngleData.afterPhoto}
                      alt="Depois"
                      className="w-full h-full object-contain pointer-events-none"
                    />
                  ) : (
                    <div className="text-center text-zinc-500">
                      <Camera className="w-12 h-12 mx-auto mb-2 opacity-40" />
                      <p>Nenhuma foto do DEPOIS carregada.</p>
                    </div>
                  )}
                  {/* Badge Depois */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-emerald-600/90 text-white font-bold text-xs backdrop-blur shadow-lg border border-emerald-400/40 pointer-events-none">
                    DEPOIS ({currentAngleData.afterDate || 'Pós'})
                  </div>
                </div>

                {/* BEFORE IMAGE (Clipped on top) */}
                <div
                  className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden transition-transform duration-75"
                  style={{
                    clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  }}
                >
                  {currentAngleData.beforePhoto ? (
                    <img
                      src={currentAngleData.beforePhoto}
                      alt="Antes"
                      className="w-full h-full object-contain pointer-events-none"
                    />
                  ) : (
                    <div className="text-center text-zinc-500">
                      <Camera className="w-12 h-12 mx-auto mb-2 opacity-40" />
                      <p>Nenhuma foto do ANTES carregada.</p>
                    </div>
                  )}
                  {/* Badge Antes */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-red-600/90 text-white font-bold text-xs backdrop-blur shadow-lg border border-red-400/40 pointer-events-none">
                    ANTES ({currentAngleData.beforeDate || 'Pré'})
                  </div>
                </div>

                {/* Vertical Divider Bar with Draggable Handle */}
                <div
                  className="absolute top-0 bottom-0 z-20 flex flex-col items-center justify-center cursor-ew-resize"
                  style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setIsSliding(true);
                  }}
                  onTouchStart={(e) => {
                    e.stopPropagation();
                    setIsSliding(true);
                  }}
                >
                  {/* Vertical Line */}
                  <div className="w-0.5 h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                  {/* Circular Draggable Handle with Arrows */}
                  <div className="absolute w-10 h-10 rounded-full bg-white text-zinc-900 shadow-2xl flex items-center justify-center border-2 border-pink-500 hover:scale-110 active:scale-95 transition-transform">
                    <ArrowRightLeft className="w-5 h-5 text-pink-600" />
                  </div>
                </div>

                {/* Bottom Instruction Pill */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-[11px] text-zinc-300 border border-zinc-700/80 pointer-events-none flex items-center gap-2">
                  <Move className="w-3.5 h-3.5 text-pink-400" />
                  <span>Arraste o divisor para comparar o Antes e Depois &bull; Zoom: {Math.round(zoom * 100)}%</span>
                </div>
              </div>
            )}

            {/* View Mode 2: Side-by-Side Synchronized (Lado a Lado) */}
            {viewMode === 'side_by_side' && (
              <div className="w-full max-w-6xl h-full max-h-[75vh] grid grid-cols-2 gap-4">
                {/* Before Box */}
                <div className="relative rounded-2xl overflow-hidden border border-red-500/30 bg-[#12141c] shadow-2xl flex items-center justify-center">
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                    }}
                  >
                    {currentAngleData.beforePhoto && (
                      <img
                        src={currentAngleData.beforePhoto}
                        alt="Antes"
                        className="w-full h-full object-contain pointer-events-none"
                      />
                    )}
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-red-600/90 text-white font-bold text-xs shadow-lg border border-red-400/40">
                    ANTES
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 p-2.5 rounded-xl bg-black/75 backdrop-blur text-xs text-zinc-300 border border-zinc-800 truncate">
                    {currentAngleData.beforeNotes || 'Foto pré-procedimento'}
                  </div>
                </div>

                {/* After Box */}
                <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 bg-[#12141c] shadow-2xl flex items-center justify-center">
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                    }}
                  >
                    {currentAngleData.afterPhoto && (
                      <img
                        src={currentAngleData.afterPhoto}
                        alt="Depois"
                        className="w-full h-full object-contain pointer-events-none"
                      />
                    )}
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-emerald-600/90 text-white font-bold text-xs shadow-lg border border-emerald-400/40">
                    DEPOIS
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 p-2.5 rounded-xl bg-black/75 backdrop-blur text-xs text-zinc-300 border border-zinc-800 truncate">
                    {currentAngleData.afterNotes || 'Resultado de evolução clínica'}
                  </div>
                </div>
              </div>
            )}

            {/* View Mode 3: Quick Toggle / Blink Mode */}
            {viewMode === 'toggle' && (
              <div className="relative w-full max-w-4xl h-full max-h-[75vh] rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 bg-zinc-950 flex flex-col items-center justify-center">
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  }}
                >
                  <img
                    src={toggleState === 'after' ? currentAngleData.afterPhoto : currentAngleData.beforePhoto}
                    alt={toggleState}
                    className="w-full h-full object-contain pointer-events-none transition-opacity duration-200"
                  />
                </div>

                {/* Status Indicator Pill */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-zinc-700 shadow-xl">
                  <button
                    type="button"
                    onClick={() => setToggleState('before')}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                      toggleState === 'before' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    Exibindo: ANTES
                  </button>
                  <button
                    type="button"
                    onClick={() => setToggleState('after')}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                      toggleState === 'after' ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    Exibindo: DEPOIS
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAutoBlinking(!isAutoBlinking)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold border transition ${
                      isAutoBlinking
                        ? 'bg-pink-600 text-white border-pink-400 animate-pulse'
                        : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                    }`}
                  >
                    {isAutoBlinking ? 'Pausar Transição' : 'Transição Automática (Blink)'}
                  </button>
                </div>
              </div>
            )}

            {/* View Mode 4: Panoramic Gallery (Os 3 Ângulos) */}
            {viewMode === 'gallery' && (
              <div className="w-full max-w-6xl h-full max-h-[75vh] grid grid-cols-3 gap-3 overflow-y-auto pr-1">
                {(['frontal', 'lateral_direita', 'lateral_esquerda'] as PhotoAngle[]).map((angleKey) => {
                  const pData = dataState.photos[angleKey];
                  return (
                    <div
                      key={angleKey}
                      onClick={() => {
                        setActiveAngle(angleKey);
                        setViewMode('slider');
                      }}
                      className={`p-3 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                        activeAngle === angleKey
                          ? 'bg-[#181c28] border-pink-500 shadow-lg shadow-pink-950/30'
                          : 'bg-[#12141c] border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-zinc-200 mb-2 truncate flex items-center justify-between">
                        <span>{pData.title}</span>
                        {activeAngle === angleKey && (
                          <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
                        )}
                      </div>

                      {/* Dual Mini Thumbnails */}
                      <div className="grid grid-cols-2 gap-2 h-44 mb-2">
                        <div className="relative rounded-lg overflow-hidden bg-black/40 border border-red-500/20">
                          {pData.beforePhoto && (
                            <img src={pData.beforePhoto} alt="Antes" className="w-full h-full object-cover" />
                          )}
                          <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-red-600 text-[9px] font-bold text-white">
                            Antes
                          </span>
                        </div>
                        <div className="relative rounded-lg overflow-hidden bg-black/40 border border-emerald-500/20">
                          {pData.afterPhoto && (
                            <img src={pData.afterPhoto} alt="Depois" className="w-full h-full object-cover" />
                          )}
                          <span className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-emerald-600 text-[9px] font-bold text-white">
                            Depois
                          </span>
                        </div>
                      </div>

                      <div className="text-[11px] text-zinc-400 line-clamp-2 bg-black/40 p-2 rounded-lg">
                        {pData.afterNotes || 'Clique para abrir no estúdio de zoom.'}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Clinical Notes, Improvements & Presentation Details Panel */}
        <div className="w-96 bg-[#131620] border-l border-zinc-800 flex flex-col overflow-y-auto shrink-0">
          {/* Panel Header */}
          <div className="p-4 border-b border-zinc-800 bg-[#161a26]">
            <div className="font-bold text-sm text-zinc-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>Detalhes do Ângulo: {currentAngleData.title}</span>
            </div>
            <div className="text-xs text-zinc-400 mt-0.5">{currentAngleData.subtitle}</div>
          </div>

          {/* Form Content */}
          <div className="p-4 space-y-4 flex-1">
            {/* Notes on Before */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-red-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span>Achados Clínicos do ANTES:</span>
              </label>
              <textarea
                value={currentAngleData.beforeNotes || ''}
                onChange={(e) =>
                  setDataState((prev) => ({
                    ...prev,
                    photos: {
                      ...prev.photos,
                      [activeAngle]: {
                        ...prev.photos[activeAngle],
                        beforeNotes: e.target.value,
                      },
                    },
                  }))
                }
                rows={2}
                placeholder="Ex: Linhas glabelares profundas, perda de volume malar..."
                className="w-full px-3 py-2 rounded-xl bg-[#1c202e] border border-zinc-700/80 text-xs text-zinc-200 focus:outline-none focus:border-pink-500 resize-none"
              />
            </div>

            {/* Notes on After / Evolutions */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Resultados & Melhorias do DEPOIS:</span>
              </label>
              <textarea
                value={currentAngleData.afterNotes || ''}
                onChange={(e) =>
                  setDataState((prev) => ({
                    ...prev,
                    photos: {
                      ...prev.photos,
                      [activeAngle]: {
                        ...prev.photos[activeAngle],
                        afterNotes: e.target.value,
                      },
                    },
                  }))
                }
                rows={3}
                placeholder="Ex: Suavização completa das rugas dinâmicas, abertura do olhar, textura aprimorada..."
                className="w-full px-3 py-2 rounded-xl bg-[#1c202e] border border-zinc-700/80 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>

            {/* Key Highlights of the Treatment (Destaques da Apresentação) */}
            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <label className="text-xs font-bold text-zinc-200 flex items-center justify-between">
                <span>Destaques da Transformação:</span>
                <span className="text-[10px] text-pink-400 font-normal">Exibido na Apresentação</span>
              </label>

              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={newHighlightText}
                  onChange={(e) => setNewHighlightText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddHighlight()}
                  placeholder="Novo destaque (ex: Rugas atenuadas)..."
                  className="flex-1 px-3 py-1.5 rounded-lg bg-[#1c202e] border border-zinc-700/80 text-xs text-zinc-200 focus:outline-none focus:border-pink-500"
                />
                <button
                  type="button"
                  onClick={handleAddHighlight}
                  className="px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs flex items-center justify-center transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Highlights Pill List */}
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {dataState.keyHighlights.map((hl, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-[#181c29] border border-zinc-800 flex items-center justify-between text-xs text-zinc-200 group"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{hl}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveHighlight(idx)}
                      className="text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition p-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Satisfaction Rating */}
            <div className="space-y-1.5 pt-2 border-t border-zinc-800">
              <label className="text-xs font-semibold text-zinc-300">Satisfação do Paciente:</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setDataState((prev) => ({ ...prev, patientSatisfaction: star }))}
                    className="p-1 text-amber-400 hover:scale-125 transition cursor-pointer"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= dataState.patientSatisfaction ? 'fill-amber-400 text-amber-400' : 'text-zinc-600'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-amber-300 ml-2">
                  {dataState.patientSatisfaction === 5 ? 'Excelente (5/5)' : `${dataState.patientSatisfaction}/5`}
                </span>
              </div>
            </div>

            {/* Overall Treatment Summary */}
            <div className="space-y-1.5 pt-2 border-t border-zinc-800">
              <label className="text-xs font-semibold text-zinc-300">Parecer Geral / Observações Clínicas:</label>
              <textarea
                value={dataState.overallNotes}
                onChange={(e) => setDataState((prev) => ({ ...prev, overallNotes: e.target.value }))}
                rows={3}
                placeholder="Parecer para o prontuário..."
                className="w-full px-3 py-2 rounded-xl bg-[#1c202e] border border-zinc-700/80 text-xs text-zinc-200 focus:outline-none focus:border-pink-500 resize-none"
              />
            </div>
          </div>

          {/* Panel Footer Action */}
          <div className="p-4 border-t border-zinc-800 bg-[#161a26]">
            <button
              type="button"
              onClick={handleApplyToDocument}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-pink-950/50 transition active:scale-95 cursor-pointer"
            >
              <FileCheck className="w-4 h-4" />
              <span>Salvar e Aplicar ao Prontuário</span>
            </button>
          </div>
        </div>
      </div>

      {/* PATIENT PRESENTATION THEATER OVERLAY (Tela de Apresentação Sofisticada para o Paciente) */}
      {isPresentationMode && (
        <div className="fixed inset-0 z-[150] bg-black/95 text-white flex flex-col animate-fadeIn">
          {/* Presentation Header */}
          <div className="h-18 px-8 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-lg flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 flex items-center justify-center text-white shadow-lg shadow-pink-950/40">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-base font-bold tracking-tight text-zinc-100 flex items-center gap-2">
                  <span>Apresentação Clínica de Resultados</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                    {clinicName}
                  </span>
                </div>
                <div className="text-xs text-zinc-400">
                  Paciente: <strong className="text-zinc-200">{patient.nomeCliente}</strong> &bull; {procedureTitle}
                </div>
              </div>
            </div>

            {/* Quick Angle Switcher for Presentation */}
            <div className="flex items-center bg-zinc-900 p-1.5 rounded-2xl border border-zinc-700">
              <button
                type="button"
                onClick={() => {
                  setActiveAngle('frontal');
                  handleResetZoom();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeAngle === 'frontal'
                    ? 'bg-pink-600 text-white shadow-lg'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                1. Vista Frontal
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveAngle('lateral_direita');
                  handleResetZoom();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeAngle === 'lateral_direita'
                    ? 'bg-pink-600 text-white shadow-lg'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                2. Lateral Direita
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveAngle('lateral_esquerda');
                  handleResetZoom();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeAngle === 'lateral_esquerda'
                    ? 'bg-pink-600 text-white shadow-lg'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                3. Lateral Esquerda
              </button>
            </div>

            <div className="flex items-center gap-3">
              {/* Zoom Buttons in Presentation */}
              <div className="flex items-center gap-1 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="p-1 rounded text-zinc-300 hover:bg-zinc-800"
                  title="Afastar"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono font-bold text-pink-400 px-2">{Math.round(zoom * 100)}%</span>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="p-1 rounded text-zinc-300 hover:bg-zinc-800"
                  title="Aproximar"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsPresentationMode(false)}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition cursor-pointer"
              >
                Sair da Apresentação
              </button>
            </div>
          </div>

          {/* Presentation Central Showcase */}
          <div className="flex-1 flex overflow-hidden p-6 gap-6">
            {/* Center Stage Slider / Comparison */}
            <div
              ref={containerRef}
              className="flex-1 relative rounded-3xl overflow-hidden bg-zinc-900/60 border border-zinc-800 flex items-center justify-center shadow-2xl"
              onMouseDown={handleMouseDown}
            >
              {/* AFTER IMAGE */}
              <div
                className="absolute inset-0 w-full h-full flex items-center justify-center"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                }}
              >
                {currentAngleData.afterPhoto && (
                  <img
                    src={currentAngleData.afterPhoto}
                    alt="Depois"
                    className="w-full h-full object-contain pointer-events-none"
                  />
                )}
                <div className="absolute top-6 right-6 px-4 py-2 rounded-2xl bg-emerald-600 text-white font-black text-sm shadow-xl border border-emerald-400/40">
                  DEPOIS
                </div>
              </div>

              {/* BEFORE IMAGE (CLIPPED) */}
              <div
                className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
                style={{
                  clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                }}
              >
                {currentAngleData.beforePhoto && (
                  <img
                    src={currentAngleData.beforePhoto}
                    alt="Antes"
                    className="w-full h-full object-contain pointer-events-none"
                  />
                )}
                <div className="absolute top-6 left-6 px-4 py-2 rounded-2xl bg-red-600 text-white font-black text-sm shadow-xl border border-red-400/40">
                  ANTES
                </div>
              </div>

              {/* Vertical Slider Bar */}
              <div
                className="absolute top-0 bottom-0 z-30 flex flex-col items-center justify-center cursor-ew-resize"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setIsSliding(true);
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  setIsSliding(true);
                }}
              >
                <div className="w-1 h-full bg-white shadow-[0_0_15px_rgba(255,255,255,1)]" />
                <div className="absolute w-12 h-12 rounded-full bg-white text-zinc-900 shadow-2xl flex items-center justify-center border-4 border-pink-500 hover:scale-110 active:scale-95 transition-transform">
                  <ArrowRightLeft className="w-6 h-6 text-pink-600" />
                </div>
              </div>
            </div>

            {/* Right Presentation Sidecards */}
            <div className="w-96 flex flex-col gap-4 shrink-0">
              {/* Card: Angle Info & Evolution */}
              <div className="p-5 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-xl">
                <div className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-1">
                  {currentAngleData.title}
                </div>
                <div className="text-sm font-semibold text-zinc-200 mb-3">
                  {currentAngleData.subtitle}
                </div>
                <div className="p-3.5 rounded-2xl bg-black/40 border border-zinc-800/80 text-xs text-zinc-300 leading-relaxed">
                  {currentAngleData.afterNotes || 'Resultado de excelência estética e harmonia facial.'}
                </div>
              </div>

              {/* Card: Key Highlights */}
              <div className="flex-1 p-5 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-xl flex flex-col">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Destaques da Transformação</span>
                </div>
                <div className="space-y-2.5 overflow-y-auto flex-1 pr-1">
                  {dataState.keyHighlights.map((hl, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 flex items-center gap-3 text-xs text-zinc-200 font-medium"
                    >
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Stars Rating */}
                <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Satisfação:</span>
                  <div className="flex items-center gap-1 text-amber-400">
                    {'★'.repeat(dataState.patientSatisfaction)}
                    <span className="font-bold text-zinc-200 ml-1">
                      {dataState.patientSatisfaction === 5 ? 'Excelente' : `${dataState.patientSatisfaction}/5`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WEBCAM CAMERA CAPTURE MODAL */}
      {isCameraActive && (
        <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#161922] border border-zinc-700 rounded-2xl max-w-xl w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="font-bold text-sm text-zinc-100 flex items-center gap-2">
                <Camera className="w-4 h-4 text-pink-400" />
                <span>Capturar Foto ({cameraTarget?.type === 'before' ? 'ANTES' : 'DEPOIS'})</span>
              </div>
              <button
                type="button"
                onClick={stopCamera}
                className="text-zinc-400 hover:text-zinc-100 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-zinc-800">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={stopCamera}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={capturePhoto}
                className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-pink-900/30 transition"
              >
                <Camera className="w-4 h-4" />
                <span>Fotografar Agora</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
