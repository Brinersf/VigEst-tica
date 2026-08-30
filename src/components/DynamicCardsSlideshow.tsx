import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  ShieldCheck,
  Syringe,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Edit3,
  Eye,
  CheckCircle2,
  Lock,
  Layers,
  ArrowUpRight,
  Copy,
  Check,
  Save,
  Sliders,
  Sparkle,
  Download,
  Share2,
  X,
  BookOpen,
  ClipboardList,
  Scale,
  DollarSign,
  Thermometer,
  Activity,
  HeartHandshake,
  Award,
  Zap,
  AlertTriangle,
  Building2,
  CheckCheck,
  Pill
} from 'lucide-react';
import { ClinicData } from '../types';

export type CardCategoryType = 
  | 'all'
  | 'injetavel' 
  | 'prescricao'
  | 'facial' 
  | 'corporal'
  | 'biosseguranca' 
  | 'limpeza'
  | 'admin'
  | 'cadernos'
  | 'manuais'
  | 'anamnese'
  | 'tcle' 
  | 'contrato'
  | 'financeiro';

export interface EditableCardItem {
  id: string;
  category: CardCategoryType;
  categoryLabel: string;
  categoryBadgeClass: string;
  anvisaRef: string;
  title: string;
  desc: string;
  code: string;
  version: string;
  fullSnippet: string;
  keyPoints: string[];
}

export const INITIAL_CARDS: EditableCardItem[] = [
  // ==========================================
  // 1. PROCEDIMENTOS DE HARMONIZAÇÃO E INJETÁVEIS
  // ==========================================
  {
    id: 'card-inj-1',
    category: 'injetavel',
    categoryLabel: 'POP INJETÁVEL • AMOSTRA LIBERADA',
    categoryBadgeClass: 'bg-[#00D3A1]/20 text-[#00D3A1] border-[#00D3A1]/40 font-black',
    anvisaRef: 'ANVISA RDC 63/2011',
    title: 'Toxina Botulínica Tipo A',
    desc: 'Protocolo completo de biossegurança, cadeia de frio, diluição estéril, mapeamento anatômico muscular, dosagens e conduta em intercorrências.',
    code: 'POP-INJ-01',
    version: '5.0 (Revisão 2026)',
    keyPoints: ['SF 0,9% injetável sem conservantes', 'Cadeia de Frio +2°C a +8°C', 'Mapeamento Anatômico 10 Músculos', 'Descarte NR-32 Grupo E'],
    fullSnippet: `PROCEDIMENTO OPERACIONAL PADRÃO (POP) - ANVISA RDC 63/2011 & RDC 222/2018
CÓDIGO: POP-INJ-01 | VERSÃO: 5.0 | REVISÃO ANUAL
TÍTULO: PROTOCOLO OPERACIONAL E ASSÉPTICO DE APLICAÇÃO DE TOXINA BOTULÍNICA TIPO A

1. OBJETIVO:
Padronizar a reconstituição estéril, controle de cadeia de frio, diluição, mapeamento anatômico dos músculos da mímica facial, técnica de injeção intramuscular/intradérmica e conduta imediata em intercorrências com Toxina Botulínica Tipo A, assegurando eficácia terapêutica, blindagem jurídica e conformidade sanitária plena com a RDC nº 63/2011 da ANVISA.

2. CAMPO DE APLICAÇÃO & RESPONSABILIDADE:
Sala de procedimentos invasivos não cirúrgicos da clínica. Execução privativa de profissionais devidamente habilitados e com especialização em saúde estética (Biomédicos Estetas, Farmacêuticos Estetas, Médicos, Cirurgiões-Dentistas e Enfermeiros Estetas).

3. MATERIAIS, EQUIPAMENTOS E INSUMOS EXIGIDOS:
- 01 Frasco-ampola de Toxina Botulínica Tipo A (100U ou 200U) com registro válido na ANVISA.
- 01 Ampola de Cloreto de Sódio 0,9% estéril injetável sem conservantes.
- Seringas de insulina de 0,3ml / 0,5ml ultra-finas sem espaço morto com agulhas integradas 31G/32G (4mm a 8mm).
- Agulha de aspiração 18G ou 21G para reconstituição estéril.
- Clorexidina alcoólica 2% para antissepsia cutânea e gaze estéril em pacotes individuais.
- Lápis dermatográfico branco/preto para demarcação cirúrgica prévia.
- Caixa coletora rígida para perfurocortantes (Descarpack - Resíduo Grupo E).
- Lixeira com acionamento por pedal e saco branco leitoso (Resíduo Grupo A - RDC 222/2018).

4. PROTOCOLO DE RECONSTITUIÇÃO & CADEIA DE FRIO (+2°C A +8°C):
- Manter o frasco intacto em refrigerador exclusivo de medicamentos com registro diário de temperatura máxima/mínima.
- Assepsia do septo de borracha do frasco com gaze embebida em álcool 70%.
- Diluição recomendada: 100U de toxina diluídas em 1,0 ml de SF 0,9% (cada 1 unidade na seringa de 100 UI = 1U de toxina) ou 2,0 ml (cada 2 unidades = 1U).
- Inserir a agulha na borracha a 45° permitindo que o vácuo puxe o líquido pelas paredes do frasco suavemente.
- PROIBIÇÃO EXPRESSA: Nunca agitar o frasco mecanicamente de forma violenta. Realizar apenas movimentos rotacionais suaves em formato de "8" para não romper as pontes dissulfeto da neurotoxina.

5. DOSAGEM MÉDIA & MAPEAMENTO ANATÔMICO DOS MÚSCULOS-ALVO:
- Músculo Frontal (Linhas da Testa): 10 a 20U divididas em 4 a 8 pontos em "V", respeitando margem mínima de 2,0 cm acima da borda supraorbital para evitar ptose.
- Complexo Glabelar (Prócero + Corrugadores): 15 a 25U (Prócero: 4 a 6U profundo a 90°; Corrugadores: 3 a 5U medial profundo e lateral superficial).
- Músculo Orbicular dos Olhos (Pés de Galinha): 6 a 12U por lado (2 a 4 pontos em micropápulas subdérmicas a 1,0 cm da rima orbital óssea).
- Músculo Nasal (Bunny Lines): 2 a 4U por lado em plano dérmico lateral do dorso nasal.
- Levantador do Lábio Superior (Sorriso Gengival): 1 a 2U por lado no ponto de Yonsei.
- Depressor do Ângulo da Boca - DAO: 2 a 3U por lado na base do triângulo mandibular.
- Músculo Mentoniano (Queixo Celulítico): 4 a 8U em injeção intramuscular no ápice do mento.
- Músculo Masseter (Bruxismo / Afinamento Facial): 20 a 35U por lado no terço inferior palpação forçada.
- Músculo Platisma (Efeito Nefertiti): 15 a 30U distribuídas em micropápulas ao longo da linha da mandíbula e cordões cervicais.

6. PASSO A PASSO TÉCNICO & ASSEPSIA CIRÚRGICA:
1º Conferir o TCLE devidamente assinado pelo paciente e Ficha de Anamnese com exclusão de contraindicações.
2º Registro fotográfico padronizado em 5 ângulos (neutro e mímica forçada).
3º Higienização das mãos do profissional conforme técnica dos 5 Momentos da OMS e paramentação com EPIs (luvas sem pó, máscara e óculos).
4º Mapeamento anatômico com o paciente posicionado a 90°.
5º Antissepsia cirúrgica com clorexidina alcoólica 2% em movimentos centrífugos do centro para a periferia.
6º Injeção com bisel voltado para cima conferindo a dosimetria ponto a ponto.
7º Compressão suave com gaze estéril seca sem fricção ou massagem mecânica.
8º Descarte imediato de agulhas e seringas na caixa Descarpack sem reencapar (NR-32).

7. ORIENTAÇÕES PÓS-PROCEDIMENTO AO PACIENTE:
- Não deitar ou reclinar o tronco por no mínimo 4 horas pós-aplicação.
- Não massagear, friccionar ou realizar limpeza facial pesada nas primeiras 24 horas.
- Evitar exercícios físicos de alta intensidade, saunas e exposição solar direta nas 48 horas seguintes.
- Retorno obrigatório entre 15 e 30 dias para avaliação clínica de simetria e eventual refinamento.

8. PROTOCOLO DE MANEJO DE INTERCORRÊNCIAS & EVENTOS ADVERSOS:
- Ptose Palpebral: Prescrição tópica de Colírio de Tartarato de Brimonidina 0,1% ou Apraclonidina 0,5% (1 a 2 gotas, 3x ao dia) para estímulo do músculo de Müller até regressão espontânea.
- Assimetria ("Efeito Mefisto"): Aplicação corretiva de 1 a 2U no ponto de escape muscular após o 15º dia.
- Equimoses/Hematomas: Compressas frias imediatas e gel tópico de arnica ou vitamina K.`
  },
  {
    id: 'card-inj-2',
    category: 'injetavel',
    categoryLabel: 'POP INJETÁVEL',
    categoryBadgeClass: 'bg-[#00D3A1]/15 text-[#00D3A1] border-[#00D3A1]/30',
    anvisaRef: 'ANVISA RDC 63/2011',
    title: 'Preenchimento com Ácido Hialurônico',
    desc: 'Técnicas de cânula/agulha, manejo de intercorrências vasculares e protocolo com hialuronidase.',
    code: 'POP-INJ-02',
    version: '4.5',
    keyPoints: ['Microcânula romba 22G/25G', 'Aspiração prévia de 5s', 'Hialuronidase disponível'],
    fullSnippet: `1. FINALIDADE: Harmonização e volumização tecidual com implante de Ácido Hialurônico reticulado.
2. BIOSSEGURANÇA & SEGURANÇA:
  - Obrigatório teste de refluxo/aspiração negativa por no mínimo 5 segundos em áreas de risco.
  - Disponibilidade imediata de Hialuronidase para reversão de intercorrências vasculares.
3. TÉCNICA: Aplicação subdérmica ou supraperiosteal com cânula atraumática para redução de hematomas.`
  },
  {
    id: 'card-inj-3',
    category: 'injetavel',
    categoryLabel: 'POP INJETÁVEL',
    categoryBadgeClass: 'bg-[#00D3A1]/15 text-[#00D3A1] border-[#00D3A1]/30',
    anvisaRef: 'ANVISA RDC 63/2011',
    title: 'Bioestimuladores de Colágeno (PLLA / Hidroxiapatita)',
    desc: 'Hidratação e suspensão estéril, vetores de tração, bioestimulação dérmica e massagem orientada.',
    code: 'POP-INJ-03',
    version: '4.0',
    keyPoints: ['Reidratação homogênea', 'Aplicação subdérmica em leque', 'Regra de massagem 5x5x5'],
    fullSnippet: `1. OBJETIVO: Padronizar o preparo, reconstituição e injeção vetorial de Ácido Poli-L-Láctico ou Hidroxiapatita de Cálcio.
2. PREPARO: Reconstituição estéril prévia em Água para Injeção e Lidocaína 2% sem vasoconstritor.
3. TÉCNICA: Pertuito único com agulha guia e retroinjeção com microcânula 22G em plano subdérmico profundo.
4. ORIENTAÇÕES: Instruir o paciente sobre massagem vigorosa (5 minutos, 5 vezes ao dia, por 5 dias).`
  },
  {
    id: 'card-inj-4',
    category: 'injetavel',
    categoryLabel: 'POP INJETÁVEL',
    categoryBadgeClass: 'bg-[#00D3A1]/15 text-[#00D3A1] border-[#00D3A1]/30',
    anvisaRef: 'ANVISA RDC 63/2011',
    title: 'Fios de Sustentação & Tração PDO',
    desc: 'Assepsia cirúrgica, técnicas de ancoragem, pós-procedimento e suporte de tecidos.',
    code: 'POP-INJ-04',
    version: '4.0',
    keyPoints: ['Fios Espiculados e Lisos', 'Assepsia cirúrgica estrita', 'Controle de ancoragem fascial'],
    fullSnippet: `1. FINALIDADE: Sustentação tecidual mecânica e estímulo de colágeno através de polidioxanona (PDO).
2. FLUXO TÉCNICO:
  - Antissepsia ampla e bloqueio anestésico local nos pontos de entrada e saída.
  - Inserção vetorial em plano subdérmico profundo e tração tecidual suave.
3. CONDUTA PÓS: Repouso relativo de mímica facial por 72h e aplicação de microporagem de sustentação.`
  },
  {
    id: 'card-inj-5',
    category: 'injetavel',
    categoryLabel: 'POP INJETÁVEL',
    categoryBadgeClass: 'bg-[#00D3A1]/15 text-[#00D3A1] border-[#00D3A1]/30',
    anvisaRef: 'ANVISA RDC 63/2011',
    title: 'PEIM (Escleroterapia Injetável de Microvasos)',
    desc: 'Assepsia, punção com microagulha 30G, infusão de glicose hipertônica 75% e pós-procedimento.',
    code: 'POP-INJ-05',
    version: '4.0',
    keyPoints: ['Glicose 75% estéril', 'Agulha 30G meia polegada', 'Compressão pós-punção'],
    fullSnippet: `1. OBJETIVO: Tratar telangiectasias e microvasos em membros inferiores via esclerose química.
2. TÉCNICA: Punção intravascular lenta sob iluminação direcionada com seringa de 1ml e agulha 30G.
3. PÓS-PROCEDIMENTO: Uso de meias elásticas de compressão graduada e evitar sol por 15 dias.`
  },
  {
    id: 'card-inj-6',
    category: 'injetavel',
    categoryLabel: 'POP INJETÁVEL',
    categoryBadgeClass: 'bg-[#00D3A1]/15 text-[#00D3A1] border-[#00D3A1]/30',
    anvisaRef: 'EMERGÊNCIA & ANVISA',
    title: 'Atendimento de Urgência & Reação Anafilática',
    desc: 'Protocolo de resgate imediato, reconhecimento de choque anafilático e acionamento SAMU 192.',
    code: 'POP-INJ-06',
    version: '5.0',
    keyPoints: ['Posição de Trendelenburg', 'Via aérea desobstruída', 'Acionamento SAMU 192 imediato'],
    fullSnippet: `1. IDENTIFICAÇÃO: Reconhecimento de broncoespasmo, edema de glote, hipotensão severa e urticária.
2. CONDUTA IMEDIATA:
  - Cessar imediatamente o procedimento e deitar o paciente em decúbito dorsal.
  - Elevar membros inferiores a 45° e manter oxigenação.
  - Acionar suporte avançado do SAMU (192) mantendo monitoramento contínuo dos sinais vitais.`
  },
  {
    id: 'card-inj-7',
    category: 'injetavel',
    categoryLabel: 'POP INJETÁVEL',
    categoryBadgeClass: 'bg-[#00D3A1]/15 text-[#00D3A1] border-[#00D3A1]/30',
    anvisaRef: 'RESGATE VASCULAR',
    title: 'Intercorrências Vasculares & Hialuronidase',
    desc: 'Reconhecimento de blanching / isquemia e protocolo de infiltração imediata de hialuronidase.',
    code: 'POP-INJ-07',
    version: '5.0',
    keyPoints: ['Reconhecimento Blanching', 'Hialuronidase 1500-3000 UTR', 'Compressas mornas'],
    fullSnippet: `1. DIAGNÓSTICO: Palidez tecidual súbita (blanching), dor desproporcional e atraso no enchimento capilar (>2s).
2. PROTOCOLO DE ALTA DOSE:
  - Infiltração imediata de Hialuronidase em toda a extensão do trajeto vascular afetado.
  - Massagem vigorosa, vasodilatação local com compressas mornas e monitoramento de 60 minutos.`
  },

  // ==========================================
  // 2. PROCEDIMENTOS FACIAIS
  // ==========================================
  {
    id: 'card-fac-1',
    category: 'facial',
    categoryLabel: 'POP FACIAL',
    categoryBadgeClass: 'bg-[#38BDF8]/15 text-[#38BDF8] border-[#38BDF8]/30',
    anvisaRef: 'ANVISA RDC 63/2011',
    title: 'Limpeza de Pele Profunda & Alta Frequência',
    desc: 'Emoliência com vapor de ozônio, extração asséptica com gazes, alta frequência bactericida e fotoproteção.',
    code: 'POP-FAC-01',
    version: '4.0',
    keyPoints: ['Extração c/ luvas e gaze', 'Alta Frequência ozônio', 'Máscara calmante antisséptica'],
    fullSnippet: `1. OBJETIVO: Remoção de comedões abertos e fechados e desobstrução folicular asséptica.
2. SEQUÊNCIA CLÍNICA: Higienização, esfoliação suave, emoliência térmica, extração manual protegida, aplicação de Alta Frequência por 5 minutos e finalização com FPS 50.`
  },
  {
    id: 'card-fac-2',
    category: 'facial',
    categoryLabel: 'POP FACIAL',
    categoryBadgeClass: 'bg-[#38BDF8]/15 text-[#38BDF8] border-[#38BDF8]/30',
    anvisaRef: 'ANVISA RDC 63/2011',
    title: 'Microagulhamento Facial & Drug Delivery',
    desc: 'Uso de cartucho lacrado individual, cosmecêuticos estéreis monodose, controle de sangramento e descarte Grupo E.',
    code: 'POP-FAC-02',
    version: '4.0',
    keyPoints: ['Cartucho lacrado de uso único', 'Cosmecêuticos estéreis monodose', 'Descarte imediato no Grupo E'],
    fullSnippet: `1. FINALIDADE: Indução percutânea de colágeno através de microagulhamento com drug delivery estéril.
2. BIOSSEGURANÇA: Proibida reutilização de cartuchos descartáveis. Assepsia cutânea com clorexidina aquosa 0,5%.
3. CONDUTA PÓS: Fotoproteção estrita e suspensão de ácidos esfoliantes nas primeiras 72h.`
  },
  {
    id: 'card-fac-3',
    category: 'facial',
    categoryLabel: 'POP FACIAL',
    categoryBadgeClass: 'bg-[#38BDF8]/15 text-[#38BDF8] border-[#38BDF8]/30',
    anvisaRef: 'ANVISA RDC 63/2011',
    title: 'Dermaplaning com Lâmina Estéril nº 10',
    desc: 'Esfoliação com lâmina de bisturi estéril em ângulo de 45°, assepsia prévia e descarte imediato no Descarpack.',
    code: 'POP-FAC-03',
    version: '4.0',
    keyPoints: ['Lâmina estéril aberta no ato', 'Ângulo estrito de 45°', 'Descarte Descarpack Grupo E'],
    fullSnippet: `1. OBJETIVO: Remoção de células córneas hiperqueratinizadas e penugem facial com lâmina de bisturi estéril descartável.
2. TÉCNICA: Pele tracionada, movimentos suaves em 45 graus, finalização com sérum de ácido hialurônico e FPS.`
  },
  {
    id: 'card-fac-4',
    category: 'facial',
    categoryLabel: 'POP FACIAL',
    categoryBadgeClass: 'bg-[#38BDF8]/15 text-[#38BDF8] border-[#38BDF8]/30',
    anvisaRef: 'ANVISA RDC 63/2011',
    title: 'Peelings Químicos (Glicólico / Salicílico / Retinoico)',
    desc: 'Critérios de concentração, tempo de contato, neutralização química e prevenção de manchas pós-inflamatórias.',
    code: 'POP-FAC-04',
    version: '4.0',
    keyPoints: ['Neutralização obrigatória', 'Classificação Fitzpatrick', 'Fotoproteção FPS 50+ diária'],
    fullSnippet: `1. OBJETIVO: Renovação celular epidérmica e despigmentação controlada.
2. PROTOCOLO: Aplicação com pincel leque ou gaze, controle do eritema e neutralização imediata com solução neutralizante bicarbonatada.`
  },

  // ==========================================
  // 3. PROCEDIMENTOS CORPORAIS
  // ==========================================
  {
    id: 'card-corp-1',
    category: 'corporal',
    categoryLabel: 'POP CORPORAL',
    categoryBadgeClass: 'bg-[#8B5CF6]/15 text-[#8B5CF6] border-[#8B5CF6]/30',
    anvisaRef: 'ANVISA RDC 63/2011',
    title: 'Criolipólise com Membrana Anticongelante',
    desc: 'Parâmetros térmicos (-5°C a -11°C), uso obrigatório de membrana anticongelante registrada na ANVISA e massagem.',
    code: 'POP-CORP-01',
    version: '4.0',
    keyPoints: ['Membrana individual ANVISA', 'Prega mínima 20mm', 'Massagem de reperfusão imediata'],
    fullSnippet: `1. OBJETIVO: Destruição térmica seletiva de adipócitos por congelamento sustentado sob vácuo.
2. SEGURANÇA: Uso obrigatório de membrana anticongelante estéril individual lacrada com registro ANVISA para prevenir queimaduras por frio.`
  },
  {
    id: 'card-corp-2',
    category: 'corporal',
    categoryLabel: 'POP CORPORAL',
    categoryBadgeClass: 'bg-[#8B5CF6]/15 text-[#8B5CF6] border-[#8B5CF6]/30',
    anvisaRef: 'ANVISA RDC 63/2011',
    title: 'Drenagem Linfática Manual (Vodder / Leduc)',
    desc: 'Manobras suaves no sentido do fluxo linfático, evacuação de linfonodos e indicações pós-cirúrgicas.',
    code: 'POP-CORP-02',
    version: '4.0',
    keyPoints: ['Pressão leve (30-40 mmHg)', 'Evacuação prévia de linfonodos', 'Direcionamento centrípeto'],
    fullSnippet: `1. OBJETIVO: Estimular a circulação linfática, reabsorção de edemas e eliminação de toxinas metabólicas.
2. PROTOCOLO: Pressão rítmica e suave em direção aos gânglios linfáticos regionais (inguinais, axilares e supraclaviculares).`
  },
  {
    id: 'card-corp-3',
    category: 'corporal',
    categoryLabel: 'POP CORPORAL',
    categoryBadgeClass: 'bg-[#8B5CF6]/15 text-[#8B5CF6] border-[#8B5CF6]/30',
    anvisaRef: 'ANVISA RDC 63/2011',
    title: 'Carboxiterapia Corporal & Infusão de CO2',
    desc: 'Infusão controlada de gás carbônico medicinal estéril, cálculo de fluxo e profundidade da agulha.',
    code: 'POP-CORP-03',
    version: '4.0',
    keyPoints: ['CO2 Medicinal estéril', 'Equipo descartável com filtro', 'Ângulo de 45° para celulite'],
    fullSnippet: `1. FINALIDADE: Vasodilatação tecidual e estímulo de colágeno no tratamento de celulite, flacidez e gordura localizada.
2. SEGURANÇA: Uso de equipo com filtro bacteriológico estéril descartável a cada paciente.`
  },
  {
    id: 'card-corp-4',
    category: 'corporal',
    categoryLabel: 'POP CORPORAL',
    categoryBadgeClass: 'bg-[#8B5CF6]/15 text-[#8B5CF6] border-[#8B5CF6]/30',
    anvisaRef: 'ANVISA RDC 63/2011',
    title: 'Radiofrequência Corporal & Neocolagênese',
    desc: 'Aquecimento tecidual profundo (38°C a 42°C), monitoramento com termômetro infravermelho e glicerina.',
    code: 'POP-CORP-04',
    version: '4.0',
    keyPoints: ['Termômetro infravermelho', 'Glicerina vegetal pura', 'Manutenção a 40°C-42°C'],
    fullSnippet: `1. OBJETIVO: Contração das fibras de colágeno e estímulo fibroblástico através de aquecimento volumétrico.
2. TÉCNICA: Manter o manípulo em movimento contínuo aferindo a temperatura a cada 2 minutos para evitar pontos de calor excessivo.`
  },

  // ==========================================
  // 4. BIOSSEGURANÇA & CME
  // ==========================================
  {
    id: 'card-bio-1',
    category: 'biosseguranca',
    categoryLabel: 'BIOSSEGURANÇA',
    categoryBadgeClass: 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30',
    anvisaRef: 'ANVISA RDC 15/2012',
    title: 'Esterilização em Autoclave a Vapor (CME)',
    desc: 'Ciclo de esterilização, envelopamento em papel grau cirúrgico e monitoramento com teste biológico semanal.',
    code: 'POP-BIO-01',
    version: '4.0',
    keyPoints: ['Detergente multienzimático', 'Papel grau cirúrgico c/ validade', 'Teste biológico semanal'],
    fullSnippet: `1. OBJETIVO: Garantir a esterilização de instrumentais metálicos críticos e semicríticos.
2. ETAPAS: Imersão em detergente multienzimático por 10 min, enxágue desmineralizado, secagem, selagem em papel grau cirúrgico com fita indicadora e ciclo a 134°C com teste biológico semanal.`
  },
  {
    id: 'card-bio-2',
    category: 'biosseguranca',
    categoryLabel: 'BIOSSEGURANÇA',
    categoryBadgeClass: 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30',
    anvisaRef: 'ANVISA RDC 222/2018',
    title: 'PGRSS & Gerenciamento de Resíduos',
    desc: 'Classificação de resíduos Grupo A (biológicos), Grupo E (pérfuro-cortantes) e contrato de coleta licenciada.',
    code: 'MAN-PGRSS-01',
    version: '2026',
    keyPoints: ['Segregação Grupos A, D, E', 'Descarte Descarpack lacrado', 'Coleta especializada licenciada'],
    fullSnippet: `1. CLASSIFICAÇÃO:
  - GRUPO A (Biológico): Saco branco leitoso identificado.
  - GRUPO E (Pérfuro-cortante): Caixa rígida Descarpack até o limite de 2/3.
2. DESTINAÇÃO: Coleta especializada por empresa concessionária de incineração hospitalar.`
  },
  {
    id: 'card-bio-3',
    category: 'biosseguranca',
    categoryLabel: 'BIOSSEGURANÇA',
    categoryBadgeClass: 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30',
    anvisaRef: 'NR-32 & ANVISA',
    title: 'Acidentes com Pérfuro-cortantes & Fluxo PEP',
    desc: 'Conduta imediata pós-acidente com material biológico, lavagem abundante, sorologias e protocolo PEP.',
    code: 'POP-BIO-03',
    version: '4.0',
    keyPoints: ['Lavagem com água e sabão', 'Proibido espremer a lesão', 'Encaminhamento PEP imediato'],
    fullSnippet: `1. CONDUTA IMEDIATA: Lavar exaustivamente com água corrente e sabonete antisséptico. Não espremer a área.
2. NOTIFICAÇÃO: Emissão imediata da CAT (Comunicação de Acidente de Trabalho) e encaminhamento ao centro de referência em até 2 horas.`
  },
  {
    id: 'card-bio-4',
    category: 'biosseguranca',
    categoryLabel: 'BIOSSEGURANÇA',
    categoryBadgeClass: 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30',
    anvisaRef: 'OMS & RDC 42/2010',
    title: 'Higienização das Mãos (Técnica dos 5 Momentos)',
    desc: 'Higienização simples com água e sabonete, fricção antisséptica com álcool 70% e técnica correta.',
    code: 'POP-BIO-04',
    version: '4.0',
    keyPoints: ['5 Momentos da OMS', 'Álcool em gel 70%', 'Sem adornos (NR-32)'],
    fullSnippet: `1. REGRA: Obrigatória antes do contato com o paciente, antes de procedimentos assépticos e após contato com fluidos corporais.
2. PROIBIÇÃO: Uso de adornos (anéis, pulseiras, relógios) estritamente proibido conforme NR-32.`
  },

  // ==========================================
  // 5. LIMPEZA & HIGIENIZAÇÃO
  // ==========================================
  {
    id: 'card-limp-1',
    category: 'limpeza',
    categoryLabel: 'HIGIENIZAÇÃO',
    categoryBadgeClass: 'bg-[#14B8A6]/15 text-[#14B8A6] border-[#14B8A6]/30',
    anvisaRef: 'ANVISA RDC 63/2011',
    title: 'Higienização de Macas e Mochos',
    desc: 'Desinfecção concorrente entre pacientes com álcool 70% ou quaternário de amônio e troca de lençol.',
    code: 'POP-LIM-01',
    version: '4.0',
    keyPoints: ['Desinfecção entre pacientes', 'Quaternário de amônio / Álcool 70%', 'Lençol descartável individual'],
    fullSnippet: `1. FREQUÊNCIA: Executada obrigatoriamente a cada troca de paciente.
2. PROCEDIMENTO: Retirar e descartar o lençol descartável. Friccionar gaze ou pano descartável com Álcool 70% ou Quaternário de Amônio em movimento unidirecional. Aguardar secar antes de colocar novo lençol.`
  },
  {
    id: 'card-limp-2',
    category: 'limpeza',
    categoryLabel: 'HIGIENIZAÇÃO',
    categoryBadgeClass: 'bg-[#14B8A6]/15 text-[#14B8A6] border-[#14B8A6]/30',
    anvisaRef: 'LEI 13.589/2018',
    title: 'Limpeza de Ar Condicionado (PMOC)',
    desc: 'Lavagem mensal de filtros de ar, higienização química de serpentinas e controle da qualidade do ar.',
    code: 'POP-LIM-02',
    version: '4.0',
    keyPoints: ['Lavagem mensal de filtros', 'Higienização química da serpentina', 'Registro no Livro PMOC'],
    fullSnippet: `1. OBJETIVO: Garantir a qualidade do ar nas salas de atendimento estético e cabines de injetáveis.
2. CRONOGRAMA: Lavagem mensal dos filtros com água e sabão neutro e aplicação de bactericida específico.`
  },

  // ==========================================
  // 6. CADERNOS DE CONTROLE SANITÁRIO
  // ==========================================
  {
    id: 'card-cad-1',
    category: 'cadernos',
    categoryLabel: 'CADERNO ANVISA',
    categoryBadgeClass: 'bg-[#06B6D4]/15 text-[#06B6D4] border-[#06B6D4]/30',
    anvisaRef: 'ANVISA RDC 15/2012',
    title: 'Caderno de Controle Biológico da Autoclave',
    desc: 'Tabela de registro de ciclos, temperatura, pressão, lote de instrumentais e teste biológico semanal.',
    code: 'CAD-AUT-01',
    version: '4.0',
    keyPoints: ['Registro a cada ciclo', 'Teste biológico semanal', 'Guarda legal por 5 anos'],
    fullSnippet: `REGISTRO DIÁRIO DE CICLOS DA AUTOCLAVE:
- Data, Hora, Nº do Ciclo, Temperatura (°C), Pressão (bar), Tempo de Esterilização.
- Tipo de material embalado, Indicador Químico Classe 4/5 (Aprovado/Reprovado), Indicador Biológico Semanal e Assinatura do RT.`
  },
  {
    id: 'card-cad-2',
    category: 'cadernos',
    categoryLabel: 'CADERNO ANVISA',
    categoryBadgeClass: 'bg-[#06B6D4]/15 text-[#06B6D4] border-[#06B6D4]/30',
    anvisaRef: 'ANVISA RDC 430/2020',
    title: 'Caderno de Temperatura de Geladeira (+2°C a +8°C)',
    desc: 'Monitoramento 2x ao dia (08h e 17h30) com termômetro digital de máxima e mínima calibrado RBC.',
    code: 'CAD-TEMP-01',
    version: '4.0',
    keyPoints: ['Leitura às 08h e 17h30', 'Termômetro Máx/Mín calibrado', 'Toxinas e Enzimas 2°C a 8°C'],
    fullSnippet: `CONTROLE DIÁRIO DA CADEIA DE FRIO:
- Registro bidiário obrigatório da temperatura atual, mínima e máxima e umidade.
- Plano de contingência imediato caso a temperatura saia da faixa de +2°C a +8°C.`
  },

  // ==========================================
  // 7. MANUAIS & PGRSS
  // ==========================================
  {
    id: 'card-man-1',
    category: 'manuais',
    categoryLabel: 'MANUAL DE BOAS PRÁTICAS',
    categoryBadgeClass: 'bg-[#6366F1]/15 text-[#6366F1] border-[#6366F1]/30',
    anvisaRef: 'ANVISA RDC 63/2011',
    title: 'Manual Mestre de Boas Práticas de Funcionamento',
    desc: 'Documento estruturante da clínica com 11 capítulos detalhando infraestrutura, biossegurança e protocolos.',
    code: 'MAN-BP-01',
    version: '5.0',
    keyPoints: ['11 Capítulos completos', 'Base ANVISA e Trabalhista', 'Homologação pelo RT'],
    fullSnippet: `MANUAL DE BOAS PRÁTICAS DE FUNCIONAMENTO SANITÁRIO (RDC 63/2011)
Contempla infraestrutura física, fluxos limpo/sujo, saúde ocupacional, esterilização, gestão de insumos e responsabilidade técnica.`
  },
  {
    id: 'card-man-2',
    category: 'manuais',
    categoryLabel: 'MANUAL DE ROTINAS',
    categoryBadgeClass: 'bg-[#6366F1]/15 text-[#6366F1] border-[#6366F1]/30',
    anvisaRef: 'ANVISA & COFEN/CRBM',
    title: 'Manual de Organização de Prontuários (20 Anos)',
    desc: 'Normas de guarda perene de fichas, termos de consentimento, mapas de injeção e segurança LGPD.',
    code: 'MAN-PRONT-01',
    version: '4.0',
    keyPoints: ['Guarda mínima de 20 anos', 'Mapa de injeção e lote', 'Conformidade com a LGPD'],
    fullSnippet: `DIRETRIZES DE GESTÃO DE PRONTUÁRIOS:
Todos os documentos clínicos, TCLEs e evoluções devem ser guardados por no mínimo 20 anos em arquivo seguro e confidencial.`
  },

  // ==========================================
  // 8. FICHAS DE ANAMNESE E AVALIAÇÃO
  // ==========================================
  {
    id: 'card-ana-1',
    category: 'anamnese',
    categoryLabel: 'ANAMNESE CLÍNICA',
    categoryBadgeClass: 'bg-[#E11D48]/15 text-[#E11D48] border-[#E11D48]/30',
    anvisaRef: 'ANVISA & JURÍDICO',
    title: 'Ficha de Anamnese Facial com Escalas Clínicas',
    desc: 'Fototipo de Fitzpatrick I-VI, Escala de Glogau, histórico alérgico, doenças prévias e registro fotográfico.',
    code: 'ANA-FAC-01',
    version: '4.0',
    keyPoints: ['Escalas Fitzpatrick & Glogau', 'Histórico de alergias e remédios', 'Declaração assinada pelo paciente'],
    fullSnippet: `FICHA DE ANAMNESE ESTÉTICA FACIAL COMPLETA:
- Dados pessoais completos, comorbidades, uso de medicamentos contínuos e alergias.
- Avaliação dermato-estética e declaração de veracidade com assinatura do paciente.`
  },
  {
    id: 'card-ana-2',
    category: 'anamnese',
    categoryLabel: 'ANAMNESE CLÍNICA',
    categoryBadgeClass: 'bg-[#E11D48]/15 text-[#E11D48] border-[#E11D48]/30',
    anvisaRef: 'ANVISA & JURÍDICO',
    title: 'Ficha de Anamnese Corporal & Plicometria',
    desc: 'Avaliação de pregas cutâneas por adipômetro, perimetria com fita, mapeamento de celulite e contraindicações.',
    code: 'ANA-CORP-01',
    version: '4.0',
    keyPoints: ['Plicometria e Adipometria', 'Perimetria por quadrantes', 'Graus de celulite I a IV'],
    fullSnippet: `FICHA DE AVALIAÇÃO CORPORAL COMPLETA:
Mapeamento de medidas antropométricas, espessura de pregas cutâneas e histórico circulatório.`
  },

  // ==========================================
  // 9. TERMOS DE CONSENTIMENTO (TCLES)
  // ==========================================
  {
    id: 'card-tcle-1',
    category: 'tcle',
    categoryLabel: 'BLINDAGEM JURÍDICA',
    categoryBadgeClass: 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30',
    anvisaRef: 'CDC & CÓDIGO CIVIL',
    title: 'TCLE para Toxina Botulínica Tipo A',
    desc: 'Especificação de assimetrias transitórias, ptose palpebral, retoques e orientações de repouso.',
    code: 'TCLE-INJ-01',
    version: '4.0',
    keyPoints: ['Início 48-72h / Pleno em 15d', 'Janela de retoque 15 a 30 dias', 'Sem massagem nas 4h iniciais'],
    fullSnippet: `TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO - TOXINA BOTULÍNICA:
O(A) paciente declara ciência de que os resultados manifestam-se entre 48h e 15 dias, que a durabilidade varia com o metabolismo e compromete-se a cumprir os cuidados pós.`
  },
  {
    id: 'card-tcle-2',
    category: 'tcle',
    categoryLabel: 'BLINDAGEM JURÍDICA',
    categoryBadgeClass: 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30',
    anvisaRef: 'CDC & CÓDIGO CIVIL',
    title: 'TCLE para Preenchimento com Ácido Hialurônico',
    desc: 'Cláusulas expressas de edemas, equimoses, riscos vasculares raros e uso de hialuronidase.',
    code: 'TCLE-INJ-02',
    version: '4.0',
    keyPoints: ['Ciência de edemas temporários', 'Autorização de Hialuronidase', 'Retorno e acompanhamento'],
    fullSnippet: `TERMO DE CONSENTIMENTO - ÁCIDO HIALURÔNICO:
Declaro ter sido informado(a) sobre benefícios, riscos esperados (edema transitório, hematomas) e autorizo expressamente o uso de Hialuronidase caso haja necessidade técnica.`
  },
  {
    id: 'card-tcle-3',
    category: 'tcle',
    categoryLabel: 'BLINDAGEM JURÍDICA',
    categoryBadgeClass: 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30',
    anvisaRef: 'LEI 13.709/2018 (LGPD)',
    title: 'Termo de Autorização de Uso de Imagem (LGPD)',
    desc: 'Autorização específica para documentação em prontuário e divulgação com respeito à dignidade e sem promessas.',
    code: 'TRM-IMG-01',
    version: '4.0',
    keyPoints: ['Opção com/sem tarja nos olhos', 'Finalidade científica / educativa', 'Revogabilidade conforme LGPD'],
    fullSnippet: `TERMO DE AUTORIZAÇÃO DE USO DE IMAGEM E VOZ (LGPD):
Autorizo a captação e utilização de imagens antes/depois para prontuário interno e divulgação científica/educativa em redes sociais sem promessa de resultado idêntico.`
  },

  // ==========================================
  // 10. CONTRATOS & INSTRUMENTOS LEGAIS
  // ==========================================
  {
    id: 'card-ctr-1',
    category: 'contrato',
    categoryLabel: 'BLINDAGEM CONTRATUAL',
    categoryBadgeClass: 'bg-[#EC4899]/15 text-[#EC4899] border-[#EC4899]/30',
    anvisaRef: 'CÓDIGO CIVIL & CDC',
    title: 'Contrato de Prestação de Serviços Estéticos',
    desc: 'Cláusula de obrigação de meio, tolerância biológica individual, política de cancelamento 24h e quitação.',
    code: 'CTR-EST-01',
    version: '4.0',
    keyPoints: ['Obrigação de Meio explícita', 'Cancelamentos c/ mínimo 24h', 'Cláusula de quitação mútua'],
    fullSnippet: `CONTRATO DE PRESTAÇÃO DE SERVIÇOS ESTÉTICOS:
CLÁUSULA DE OBRIGAÇÃO DE MEIO: O contratante declara ciência inequívoca de que os procedimentos estéticos constituem obrigação de meio e técnica qualificada, dependendo da resposta biológica individual.`
  },
  {
    id: 'card-ctr-2',
    category: 'contrato',
    categoryLabel: 'BLINDAGEM CONTRATUAL',
    categoryBadgeClass: 'bg-[#EC4899]/15 text-[#EC4899] border-[#EC4899]/30',
    anvisaRef: 'DIREITO IMOBILIÁRIO & VISA',
    title: 'Contrato de Locação / Sublocação de Cabine',
    desc: 'Locação por turno ou mensal, conformidade sanitária compartilhada e responsabilidade técnica individual.',
    code: 'CTR-LOC-01',
    version: '4.0',
    keyPoints: ['Divisão de horários/turnos', 'Cumprimento de normas VISA', 'CRT de cada profissional'],
    fullSnippet: `CONTRATO DE SUBLOCAÇÃO DE CABINE CLÍNICA:
Estabelece a cessão de espaço físico equipado com dever expresso do locatário em manter inscrição ativa no conselho e cumprir os POPs da clínica.`
  },

  // ==========================================
  // 11. RECIBOS & PLANILHAS FINANCEIRAS
  // ==========================================
  {
    id: 'card-fin-1',
    category: 'financeiro',
    categoryLabel: 'FINANCEIRO & RECIBOS',
    categoryBadgeClass: 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30',
    anvisaRef: 'RECEITA FEDERAL & IRPF',
    title: 'Recibo Profissional de Serviços Estéticos',
    desc: 'Discriminação do procedimento, valor recebido, dados completos do paciente e registro do conselho.',
    code: 'REC-FIN-01',
    version: '4.0',
    keyPoints: ['Válido para declaração IRPF', 'Discriminação de valores', 'Dados do RT e Conselho'],
    fullSnippet: `RECIBO PROFISSIONAL DE PRESTAÇÃO DE SERVIÇOS:
Declaro que recebi de {{nome_cliente}} a quantia de {{valor_honorarios}} referente aos serviços estéticos prestados sob conformidade técnica na {{nome_clinica}}.`
  },
  {
    id: 'card-fin-2',
    category: 'financeiro',
    categoryLabel: 'FINANCEIRO & RECIBOS',
    categoryBadgeClass: 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30',
    anvisaRef: 'BLINDAGEM EXTRAJUDICIAL',
    title: 'Recibo de Reembolso & Quitação Mútua',
    desc: 'Termo de devolução amigável com quitação irrestrita e renúncia a litígios judiciais ou postagens em redes.',
    code: 'REC-EXT-02',
    version: '4.0',
    keyPoints: ['Quitação ampla e irrevogável', 'Cláusula de não difamação', 'Renúncia a ações judiciais'],
    fullSnippet: `TERMO DE REEMBOLSO E QUITAÇÃO MÚTUA:
Com o estorno do valor, o(a) paciente outorga quitação irrevogável, comprometendo-se a manter sigilo absoluto e abster-se de reclamações públicas sob pena de multa.`
  },
  // ==========================================
  // 12. PRESCRIÇÕES ESTÉTICAS & HOME CARE PERSONALIZADAS
  // ==========================================
  {
    id: 'card-rx-1',
    category: 'prescricao',
    categoryLabel: 'PRESCRIÇÃO ESTÉTICA PERSONALIZADA',
    categoryBadgeClass: 'bg-pink-500/20 text-pink-400 border-pink-500/40 font-bold',
    anvisaRef: 'ANVISA & CFF RES. 586',
    title: 'Receituário Pós-Injetáveis & Anti-Equimose',
    desc: 'Fórmula tópica reparadora de barreira com Vitamina K Óxido, Arnica e Pantenol + Fotoproteção mineral 100% física para prevenção de hiperpigmentação.',
    code: 'RX-EST-01',
    version: '5.0 (Revisão 2026)',
    keyPoints: ['Vitamina K Óxido 2% + Arnica 5%', 'D-Pantenol 3% Regenerador', 'Posologia 3x/dia por 7 dias', 'Embasamento Científico Anexo'],
    fullSnippet: `RECEITUÁRIO ESTÉTICO ESPECIALIZADO - CLÍNICA {{nome_clinica}}
PACIENTE: {{nome_cliente}} | CPF: {{cpf_cliente}}
PROFISSIONAL PRESCRITOR: {{responsavel}} | REGISTRO: {{alvara}}

1. [USO TÓPICO] GEL-CREME REPARADOR & ANTI-EQUIMOSE PÓS-INJETÁVEIS - 30g
   Composição Farmacológica:
   - Vitamina K Óxido ....................... 2,0%
   - Extrato Glicólico de Arnica Montana .... 5,0%
   - D-Pantenol (Pró-Vitamina B5) ........... 3,0%
   - Alfa-Bisabolol ......................... 1,0%
   - Gel-Creme Fosfolipídico q.s.p ......... 30g
   Posologia: Aplicar camada fina sobre as regiões pontuadas 3 vezes ao dia, massageando suavemente em movimentos circulares por 7 a 10 dias.

2. ORIENTAÇÕES AO PACIENTE:
   Evitar exposição solar direta nas primeiras 72h. Não realizar atividade física intensa nas 24h subsequentes. Aplicar fotoprotetor FPS 50+ mineral.`
  },
  {
    id: 'card-rx-2',
    category: 'prescricao',
    categoryLabel: 'PRESCRIÇÃO ESTÉTICA PERSONALIZADA',
    categoryBadgeClass: 'bg-pink-500/20 text-pink-400 border-pink-500/40 font-bold',
    anvisaRef: 'PROTOCOLO MULTIALVO',
    title: 'Prescrição Clareadora Melasma In & Out',
    desc: 'Terapia combinada: Sérum noturno despigmentante com Ácido Tranexâmico e Niacinamida + Cápsulas orais fotoprotetoras com Polypodium Leucotomos e Pycnogenol.',
    code: 'RX-EST-02',
    version: '5.0 (Revisão 2026)',
    keyPoints: ['Ácido Tranexâmico 3% + Alfa-Arbutin', 'Polypodium 250mg + Pycnogenol 100mg', 'Abordagem Tópica e Sistêmica', 'Prevenção Efeito Rebote'],
    fullSnippet: `RECEITUÁRIO ESTÉTICO ESPECIALIZADO - PROTOCOLO MELASMA IN & OUT
PACIENTE: {{nome_cliente}} | CPF: {{cpf_cliente}}

1. [USO TÓPICO NOTURNO] SÉRUM CLAREADOR MULTIALVO - 30ml
   - Ácido Tranexâmico 3% | Alfa-Arbutin 2% | Niacinamida PC 4% | Ácido Hialurônico 1%
   Posologia: Aplicar 4 a 5 gotas em toda a face à noite, após higienização.

2. [USO ORAL] NUTRACÊUTICO ANTIOXIDANTE & FOTOPROTETOR ORAL - 60 Cápsulas
   - Polypodium Leucotomos 250mg | Pycnogenol 100mg | Vitamina C 150mg | Luteína 10mg
   Posologia: Ingerir 1 cápsula pela manhã após o desjejum diariamente por 60 dias.`
  },
  {
    id: 'card-rx-3',
    category: 'prescricao',
    categoryLabel: 'PRESCRIÇÃO ESTÉTICA PERSONALIZADA',
    categoryBadgeClass: 'bg-pink-500/20 text-pink-400 border-pink-500/40 font-bold',
    anvisaRef: 'BIOESTIMULAÇÃO CELULAR',
    title: 'Nutracêuticos para Estímulo de Colágeno (In & Out)',
    desc: 'Associação de Silício Orgânico Biodisponível (Nutricolin), Peptídeos Bioativos Verisol, Vitamina C e Zinco Quelato para potencializar Bioestimuladores e Fios PDO.',
    code: 'RX-EST-03',
    version: '5.0 (Revisão 2026)',
    keyPoints: ['Nutricolin 300mg + Verisol 2.5g', 'Cofatores da Hidroxilação', 'Aumento de 65% na Neocolagênese', 'Adesão de 90 dias'],
    fullSnippet: `RECEITUÁRIO ESTÉTICO - NUTRACÊUTICO BIOESTIMULADOR DE COLÁGENO
PACIENTE: {{nome_cliente}} | CPF: {{cpf_cliente}}

1. [USO ORAL] NUTRACÊUTICO ESTIMULADOR DA MATRIZ EXTRACELULAR - 30 Sachês / Cápsulas
   - Nutricolin (Silício Orgânico Biodisponível) ... 300mg
   - Peptídeos Bioativos de Colágeno Verisol ....... 2,5g
   - Vitamina C Revestida (Ácido Ascórbico) ......... 200mg
   - Zinco Quelato ................................. 15mg
   - Biotina ....................................... 2,5mg
   Posologia: Diluir 1 sachê em 150ml de água ou suco pela manhã ou ingerir cápsulas correspondentes por 90 dias consecutivos.`
  }
];

interface DynamicCardsSlideshowProps {
  onCtaClick?: () => void;
  onDirectAccess?: () => void;
  clinicData?: ClinicData;
}

export const DynamicCardsSlideshow: React.FC<DynamicCardsSlideshowProps> = ({
  onCtaClick,
  onDirectAccess,
  clinicData
}) => {
  const [cards, setCards] = useState<EditableCardItem[]>(INITIAL_CARDS);
  const [activeCategory, setActiveCategory] = useState<CardCategoryType>('all');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Quick Inline Edit Modal state
  const [editingCard, setEditingCard] = useState<EditableCardItem | null>(null);
  const [previewCard, setPreviewCard] = useState<EditableCardItem | null>(null);
  const [lockedAction, setLockedAction] = useState<{
    type: 'edit' | 'preview';
    card: EditableCardItem;
  } | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const filteredCards = activeCategory === 'all'
    ? cards
    : cards.filter(c => c.category === activeCategory);

  // Auto scroll effect smoothly
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const interval = setInterval(() => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const cardWidth = 360;

        if (scrollLeft >= maxScroll - 20) {
          containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          containerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
    }, 3600);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, filteredCards.length]);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  const handleSaveEdit = (updated: EditableCardItem) => {
    setCards(prev => prev.map(c => c.id === updated.id ? updated : c));
    setEditingCard(null);
    showToast(`✓ "${updated.title}" atualizado com sucesso!`);
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  return (
    <div className="w-full relative">
      {/* Top Controls & Category Filters Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        {/* Category filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#00D3A1] text-black shadow-md shadow-[#00D3A1]/20 font-black'
                : 'bg-[#111827] text-[#94A3B8] hover:text-white border border-[#1E293B]'
            }`}
          >
            Todos ({cards.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('injetavel')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeCategory === 'injetavel'
                ? 'bg-[#00D3A1] text-black shadow-md shadow-[#00D3A1]/20 font-black'
                : 'bg-[#111827] text-[#94A3B8] hover:text-white border border-[#1E293B]'
            }`}
          >
            <Syringe className="w-3.5 h-3.5" />
            <span>POPs Injetáveis</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('prescricao')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeCategory === 'prescricao'
                ? 'bg-pink-500 text-white shadow-md shadow-pink-500/20 font-black'
                : 'bg-[#111827] text-[#94A3B8] hover:text-white border border-[#1E293B]'
            }`}
          >
            <Pill className="w-3.5 h-3.5" />
            <span>Prescrições & Fórmulas</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('facial')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeCategory === 'facial'
                ? 'bg-[#38BDF8] text-black shadow-md shadow-[#38BDF8]/20 font-black'
                : 'bg-[#111827] text-[#94A3B8] hover:text-white border border-[#1E293B]'
            }`}
          >
            <Sparkle className="w-3.5 h-3.5" />
            <span>POPs Faciais</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('corporal')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeCategory === 'corporal'
                ? 'bg-[#8B5CF6] text-white shadow-md shadow-[#8B5CF6]/20 font-black'
                : 'bg-[#111827] text-[#94A3B8] hover:text-white border border-[#1E293B]'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>POPs Corporais</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('biosseguranca')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeCategory === 'biosseguranca'
                ? 'bg-[#10B981] text-black shadow-md shadow-[#10B981]/20 font-black'
                : 'bg-[#111827] text-[#94A3B8] hover:text-white border border-[#1E293B]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Biossegurança & CME</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('cadernos')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeCategory === 'cadernos'
                ? 'bg-[#06B6D4] text-black shadow-md shadow-[#06B6D4]/20 font-black'
                : 'bg-[#111827] text-[#94A3B8] hover:text-white border border-[#1E293B]'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5" />
            <span>Cadernos ANVISA</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('manuais')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeCategory === 'manuais'
                ? 'bg-[#6366F1] text-white shadow-md shadow-[#6366F1]/20 font-black'
                : 'bg-[#111827] text-[#94A3B8] hover:text-white border border-[#1E293B]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Manuais & Boas Práticas</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('anamnese')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeCategory === 'anamnese'
                ? 'bg-[#E11D48] text-white shadow-md shadow-[#E11D48]/20 font-black'
                : 'bg-[#111827] text-[#94A3B8] hover:text-white border border-[#1E293B]'
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Fichas & Anamnese</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('tcle')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeCategory === 'tcle'
                ? 'bg-[#F59E0B] text-black shadow-md shadow-[#F59E0B]/20 font-black'
                : 'bg-[#111827] text-[#94A3B8] hover:text-white border border-[#1E293B]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>TCLEs & Termos</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('contrato')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeCategory === 'contrato'
                ? 'bg-[#EC4899] text-white shadow-md shadow-[#EC4899]/20 font-black'
                : 'bg-[#111827] text-[#94A3B8] hover:text-white border border-[#1E293B]'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Contratos & Blindagem</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('financeiro')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeCategory === 'financeiro'
                ? 'bg-[#10B981] text-black shadow-md shadow-[#10B981]/20 font-black'
                : 'bg-[#111827] text-[#94A3B8] hover:text-white border border-[#1E293B]'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Recibos & Planilhas</span>
          </button>
        </div>

        {/* Play / Pause / Prev / Next Buttons */}
        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="h-8 px-3 rounded-xl bg-[#111827] border border-[#1E293B] text-[11px] font-bold text-[#94A3B8] hover:text-white flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-sm"
            title={isPlaying ? 'Pausar animação automática' : 'Continuar animação automática'}
          >
            {isPlaying && !isHovered ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#00D3A1]" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#00D3A1] fill-[#00D3A1]" />
                <span>Passar</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleScrollLeft}
              className="w-8 h-8 rounded-xl bg-[#111827] hover:bg-[#1E293B] border border-[#1E293B] text-white flex items-center justify-center transition active:scale-95 cursor-pointer shadow-sm"
              title="Rolar para a esquerda"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleScrollRight}
              className="w-8 h-8 rounded-xl bg-[#111827] hover:bg-[#1E293B] border border-[#1E293B] text-white flex items-center justify-center transition active:scale-95 cursor-pointer shadow-sm"
              title="Rolar para a direita"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* DYNAMIC SCROLLING CARDS CONTAINER */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex gap-4 sm:gap-5 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#1E293B] scrollbar-track-transparent select-none"
        style={{ scrollBehavior: 'smooth' }}
      >
        {filteredCards.map((card) => {
          const isToxinaCard = card.id === 'card-inj-1' || card.code === 'POP-INJ-01';

          return (
            <div
              key={card.id}
              className={`w-[300px] sm:w-[340px] md:w-[360px] shrink-0 snap-start rounded-2xl p-5 sm:p-6 transition-all duration-300 group flex flex-col justify-between relative ${
                isToxinaCard
                  ? 'bg-gradient-to-b from-[#0F221B] to-[#0A1612] border-2 border-[#00D3A1] shadow-[0_10px_40px_rgba(0,211,161,0.25)] hover:shadow-[0_15px_50px_rgba(0,211,161,0.35)] -translate-y-0.5'
                  : 'bg-[#0D131F] border border-[#1E2E42] hover:border-[#334155] opacity-95 shadow-[0_10px_30px_rgba(0,0,0,0.4)]'
              }`}
            >
              {/* Top Bar of the Card */}
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border font-mono ${card.categoryBadgeClass}`}>
                    {card.categoryLabel}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {isToxinaCard ? (
                      <span className="text-[10px] text-[#00D3A1] font-mono font-bold bg-[#00D3A1]/15 px-2 py-0.5 rounded border border-[#00D3A1]/30 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        {card.code}
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#94A3B8] font-mono font-semibold bg-[#111827] px-2 py-0.5 rounded border border-[#1E293B] flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5 text-[#F59E0B]" />
                        {card.code}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Description */}
                <h4 className={`mt-3.5 text-base sm:text-lg font-black leading-snug transition-colors ${
                  isToxinaCard ? 'text-white group-hover:text-[#00D3A1]' : 'text-[#E2E8F0]'
                }`}>
                  {card.title}
                </h4>

                <p className="mt-2 text-xs text-[#94A3B8] leading-relaxed line-clamp-3">
                  {card.desc}
                </p>

                {/* Key points tags */}
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {card.keyPoints.map((point, pIdx) => (
                    <span
                      key={pIdx}
                      className={`inline-flex items-center gap-1 text-[9.5px] font-medium px-2 py-0.5 rounded border ${
                        isToxinaCard
                          ? 'bg-[#0E281F] text-[#A7F3D0] border-[#059669]/40'
                          : 'bg-[#111827] text-[#94A3B8] border-[#1E293B]'
                      }`}
                    >
                      <CheckCircle2 className={`w-2.5 h-2.5 ${isToxinaCard ? 'text-[#00D3A1]' : 'text-[#64748B]'}`} />
                      <span>{point}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* ACTION BUTTONS (EDITAR, VISUALIZAR, COPIAR) */}
              <div className="mt-5 pt-3.5 border-t border-[#1E293B] flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {/* Edit Button: ALWAYS LOCKED on Sales Page (including Toxina) */}
                  <button
                    type="button"
                    onClick={() => setLockedAction({ type: 'edit', card })}
                    className="h-8 px-2.5 rounded-lg bg-[#111827] hover:bg-[#1E293B] border border-[#1E293B] text-[#94A3B8] hover:text-[#CBD5E1] text-[11px] font-bold flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                    title="Edição liberada no Pack Completo"
                  >
                    <Lock className="w-3 h-3 text-[#F59E0B]" />
                    <span>Editar</span>
                  </button>

                  {/* Preview A4 Button: UNLOCKED ONLY FOR TOXINA BOTULÍNICA */}
                  {isToxinaCard ? (
                    <button
                      type="button"
                      onClick={() => setPreviewCard(card)}
                      className="h-8 px-3 rounded-lg bg-gradient-to-r from-[#00D3A1] to-[#00B1EA] hover:brightness-110 text-black text-[11px] font-black flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-md shadow-[#00D3A1]/20 animate-pulse"
                      title="Ver folha A4 e POP Completo de Toxina Botulínica (Amostra Grátis)"
                    >
                      <Eye className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                      <span>Ver POP Completo</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setLockedAction({ type: 'preview', card })}
                      className="h-8 px-2.5 rounded-lg bg-[#111827] hover:bg-[#1E293B] border border-[#1E293B] text-[#64748B] hover:text-[#94A3B8] text-[11px] font-bold flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                      title="Visualização completa liberada no Pack Completo"
                    >
                      <Lock className="w-3 h-3 text-[#F59E0B]" />
                      <span className="hidden xs:inline">Visualizar</span>
                    </button>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-1">
                  {onDirectAccess && (
                    <button
                      type="button"
                      onClick={() => setLockedAction({ type: 'edit', card })}
                      className="w-8 h-8 rounded-lg bg-[#111827] hover:bg-[#1E293B] border border-[#1E293B] text-[#64748B] flex items-center justify-center transition active:scale-95 cursor-pointer"
                      title="Abrir no Editor Geral da Pasta Sanitária"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Visual Helper & Callout */}
      <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#94A3B8] bg-[#0D131F]/90 border border-[#1E293B] p-4 rounded-2xl shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#00D3A1]/15 border border-[#00D3A1]/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-[#00D3A1]" />
          </div>
          <div>
            <span className="text-white font-bold block">
              Amostra 100% Liberada: <span className="text-[#00D3A1]">POP de Toxina Botulínica Tipo A</span>
            </span>
            <span className="text-[11px] text-[#94A3B8]">
              Clique em <strong>"Ver POP Completo"</strong> no card da Toxina acima para conferir o nível de detalhamento técnico. Os demais 167 documentos são desbloqueados no pack completo.
            </span>
          </div>
        </div>

        {onCtaClick && (
          <button
            type="button"
            onClick={onCtaClick}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00D3A1] via-[#00B1EA] to-[#00D3A1] hover:brightness-110 text-black font-black text-xs flex items-center gap-2 transition active:scale-95 cursor-pointer shrink-0 shadow-lg shadow-[#00D3A1]/20"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Desbloquear os 168 Documentos</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* LOCKED ACTION MODAL (HIGH-CONVERTING UPSELL) */}
      {lockedAction && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease]">
          <div className="bg-gradient-to-b from-[#131D2E] to-[#0A101A] border-2 border-[#F59E0B]/60 rounded-3xl w-full max-w-lg overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] relative">
            {/* Top decorative accent */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#F59E0B] via-[#00D3A1] to-[#F59E0B]" />

            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-[#1E293B] flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/15 border border-[#F59E0B]/40 flex items-center justify-center text-[#F59E0B] shadow-inner">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-[#F59E0B] font-mono">
                    ACESSO RESTRITO • PACK COMPLETO
                  </div>
                  <h3 className="text-lg font-black text-white leading-tight">
                    {lockedAction.type === 'edit'
                      ? 'Edição Exclusiva do Pack Completo'
                      : lockedAction.type === 'copy'
                      ? 'Cópia Exclusiva do Pack Completo'
                      : 'Documento Bloqueado na Amostra'}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setLockedAction(null)}
                className="w-8 h-8 rounded-xl bg-[#1E293B] hover:bg-[#334155] text-[#94A3B8] hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-4 text-xs">
              {/* Document Banner */}
              <div className="p-3.5 bg-[#0D1420] border border-[#1E2E42] rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider block font-semibold">
                    Documento Selecionado
                  </span>
                  <span className="text-sm font-bold text-white">
                    {lockedAction.card.title}
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-[#F59E0B] bg-[#F59E0B]/10 px-2.5 py-1 rounded border border-[#F59E0B]/30">
                  {lockedAction.card.code}
                </span>
              </div>

              <p className="text-[#CBD5E1] text-xs sm:text-sm leading-relaxed">
                {lockedAction.type === 'copy'
                  ? 'A cópia de segurança em texto integral, download em PDF A4 e exportação editável estão liberados exclusivamente na versão completa com todos os 168 arquivos sanitários e jurídicos.'
                  : lockedAction.card.id === 'card-inj-1'
                  ? 'Você está visualizando a amostra oficial do POP de Toxina Botulínica. A personalização automática com os dados da sua clínica (Nome, CNPJ, Responsável Técnico) e download em PDF A4 oficial estão liberados na versão completa da Pasta Sanitária.'
                  : 'Para proteger a propriedade intelectual, a visualização completa e a edição direta deste documento estão liberadas exclusivamente na versão completa com todos os 168 arquivos sanitários e jurídicos.'}
              </p>

              {/* Pack Benefits Checklist */}
              <div className="space-y-2 bg-[#090E17] border border-[#1E293B] p-4 rounded-2xl">
                <div className="text-[11px] font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#00D3A1]" />
                  <span>O que você desbloqueia ao adquirir agora:</span>
                </div>
                <div className="space-y-2 text-[#E2E8F0]">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00D3A1] shrink-0 mt-0.5" />
                    <span><strong>Todos os 168 documentos completos:</strong> POPs de Injetáveis, Faciais, Corporais, Cadernos ANVISA, Manuais RDC 63/2011, TCLEs e Contratos.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00D3A1] shrink-0 mt-0.5" />
                    <span><strong>Preenchimento inteligente em 1 clique:</strong> Adapte toda a pasta com o nome e dados da sua clínica instantaneamente.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00D3A1] shrink-0 mt-0.5" />
                    <span><strong>Download ilimitado:</strong> Exportação padrão A4 em PDF oficial e arquivos editáveis.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00D3A1] shrink-0 mt-0.5" />
                    <span><strong>Blindagem sanitária total:</strong> 100% de conformidade para aprovação em fiscalizações da VISA.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer with High-Conversion CTA */}
            <div className="p-5 sm:p-6 border-t border-[#1E293B] bg-[#0A101A] flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setLockedAction(null)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#1E293B] hover:bg-[#334155] text-[#94A3B8] hover:text-white font-bold text-xs transition cursor-pointer"
              >
                Continuar Navegando
              </button>

              <button
                type="button"
                onClick={() => {
                  setLockedAction(null);
                  if (onCtaClick) onCtaClick();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#F59E0B] via-[#D97706] to-[#B45309] hover:from-[#FBBF24] hover:to-[#D97706] text-black font-black text-xs sm:text-sm uppercase tracking-wide flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer shadow-[0_8px_25px_rgba(245,158,11,0.35)]"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>Desbloquear Pasta Completa Agora</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK INLINE EDIT MODAL */}
      {editingCard && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease]">
          <div className="bg-[#0D131F] border-2 border-[#00D3A1]/50 rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#1E293B] flex items-center justify-between bg-[#111827]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#00D3A1]/20 flex items-center justify-center text-[#00D3A1]">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Editar: {editingCard.title}</span>
                    <span className="font-mono text-xs text-[#00D3A1] bg-[#00D3A1]/10 px-2 py-0.5 rounded border border-[#00D3A1]/30">
                      {editingCard.code}
                    </span>
                  </h3>
                  <p className="text-xs text-[#94A3B8]">
                    Personalize o título, código, norma ou texto operacional deste documento.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingCard(null)}
                className="w-8 h-8 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-[#94A3B8] hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">
                  Título do Documento
                </label>
                <input
                  type="text"
                  value={editingCard.title}
                  onChange={(e) => setEditingCard({ ...editingCard, title: e.target.value })}
                  className="w-full bg-[#111827] border border-[#1E293B] focus:border-[#00D3A1] rounded-xl px-3.5 py-2.5 text-white text-xs outline-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">
                    Código Interno
                  </label>
                  <input
                    type="text"
                    value={editingCard.code}
                    onChange={(e) => setEditingCard({ ...editingCard, code: e.target.value })}
                    className="w-full bg-[#111827] border border-[#1E293B] focus:border-[#00D3A1] rounded-xl px-3.5 py-2 text-white font-mono text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">
                    Referência Legal / ANVISA
                  </label>
                  <input
                    type="text"
                    value={editingCard.anvisaRef}
                    onChange={(e) => setEditingCard({ ...editingCard, anvisaRef: e.target.value })}
                    className="w-full bg-[#111827] border border-[#1E293B] focus:border-[#00D3A1] rounded-xl px-3.5 py-2 text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">
                  Resumo / Escopo Operacional
                </label>
                <input
                  type="text"
                  value={editingCard.desc}
                  onChange={(e) => setEditingCard({ ...editingCard, desc: e.target.value })}
                  className="w-full bg-[#111827] border border-[#1E293B] focus:border-[#00D3A1] rounded-xl px-3.5 py-2.5 text-white text-xs outline-none transition"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">
                  Corpo Operacional / Conteúdo do Documento
                </label>
                <textarea
                  rows={8}
                  value={editingCard.fullSnippet}
                  onChange={(e) => setEditingCard({ ...editingCard, fullSnippet: e.target.value })}
                  className="w-full bg-[#111827] border border-[#1E293B] focus:border-[#00D3A1] rounded-xl p-3.5 text-white font-mono text-xs leading-relaxed outline-none transition resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-[#1E293B] bg-[#111827] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setEditingCard(null)}
                className="px-4 py-2 rounded-xl bg-[#1E293B] hover:bg-[#334155] text-[#94A3B8] hover:text-white font-bold text-xs transition cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={() => handleSaveEdit(editingCard)}
                className="px-5 py-2 rounded-xl bg-[#00D3A1] hover:bg-[#00D3A1]/90 text-black font-black text-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-lg shadow-[#00D3A1]/20"
              >
                <Save className="w-4 h-4" />
                <span>Salvar Alterações</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ULTRA-COMPLETE A4 PREVIEW MODAL (OFFICIAL TOXINA BOTULÍNICA POP) */}
      {previewCard && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 animate-[fadeIn_0.2s_ease]">
          <div className="bg-[#FFFFFF] text-[#0F172A] rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border-2 border-[#00D3A1]">
            {/* Preview Top Header Bar */}
            <div className="p-4 border-b-2 border-[#0F172A] flex items-center justify-between bg-[#F8FAFC]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0284C7]/15 border border-[#0284C7]/30 flex items-center justify-center text-[#0284C7] font-black">
                  <Syringe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-black text-[#0F172A] tracking-wider uppercase flex items-center gap-2">
                    <span>AMOSTRA COMPLETA • FORMATO PADRÃO A4</span>
                    <span className="bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] px-2 py-0.5 rounded text-[9px] font-extrabold">
                      ✓ CONFORMIDADE ANVISA RDC 63/2011
                    </span>
                  </div>
                  <div className="text-[10px] text-[#64748B]">
                    {clinicData?.name || 'CLÍNICA DE ESTÉTICA AVANÇADA'} • CNES: 9847291 • ALVARÁ VISA: 38492/2026
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPreviewCard(null)}
                className="w-8 h-8 rounded-lg bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#0F172A] flex items-center justify-center transition cursor-pointer font-bold"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable A4 Document Body */}
            <div className="p-5 sm:p-8 overflow-y-auto space-y-6 font-sans text-xs bg-white text-[#1E293B]">
              {/* Official Clinic Letterhead */}
              <div className="border-b-2 border-[#0F172A] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <h2 className="text-lg font-black text-[#0F172A] tracking-tight uppercase">
                    {clinicData?.name || 'CLÍNICA DE ESTÉTICA AVANÇADA & HARMONIZAÇÃO'}
                  </h2>
                  <p className="text-[11px] text-[#475569]">
                    Alvará Sanitário Municipal nº 38492/2026
                  </p>
                  <p className="text-[10px] text-[#64748B]">
                    Responsável Técnico: {clinicData?.responsibleTech || 'Dra. Coordenadora Técnica'} • {clinicData?.professionalCouncil || 'CRBM / CRF / CRM / COREN / CRO'}
                  </p>
                  <p className="text-[10px] text-[#64748B]">
                    Endereço: {clinicData?.address || 'Av. Paulista, 1000 - Bela Vista - São Paulo/SP'}
                  </p>
                </div>

                <div className="bg-[#F8FAFC] border border-[#CBD5E1] p-2.5 rounded-xl text-right shrink-0">
                  <div className="font-mono font-black text-[#0284C7] text-sm">POP-INJ-01</div>
                  <div className="text-[10px] font-bold text-[#475569]">VERSÃO: 5.0 (2026)</div>
                  <div className="text-[9px] text-[#64748B]">REVISÃO: ANUAL</div>
                </div>
              </div>

              {/* Title & Metadata Grid */}
              <div className="bg-[#F1F5F9] border border-[#CBD5E1] p-4 rounded-xl space-y-2">
                <div className="text-center">
                  <div className="text-[10px] font-black uppercase tracking-wider text-[#0284C7]">
                    MANUAL DE PROCEDIMENTOS OPERACIONAIS PADRÃO (POP)
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-[#0F172A] uppercase mt-0.5">
                    PROTOCOLO OPERACIONAL E ASSÉPTICO DE APLICAÇÃO DE TOXINA BOTULÍNICA TIPO A
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#CBD5E1] text-[10px]">
                  <div>
                    <span className="font-bold text-[#475569] block">Setor:</span>
                    <span className="text-[#0F172A]">Procedimentos Injetáveis</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#475569] block">Classificação:</span>
                    <span className="text-[#0F172A]">Invasivo Não Cirúrgico</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#475569] block">Base Sanitária:</span>
                    <span className="text-[#0F172A]">RDC 63/2011 • RDC 222/18</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#475569] block">Validade:</span>
                    <span className="text-[#047857] font-bold">12 Meses (Auditoria)</span>
                  </div>
                </div>
              </div>

              {/* 1. OBJETIVO GERAL */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-black uppercase text-[#0F172A] border-b border-[#E2E8F0] pb-1 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-[#0284C7] text-white flex items-center justify-center text-[10px]">1</span>
                  <span>OBJETIVO GERAL & ESCOPO SANITÁRIO</span>
                </h4>
                <p className="text-[11px] leading-relaxed text-[#334155]">
                  Padronizar rigorosamente a técnica de recepção, conferência de lote, estocagem em cadeia de frio (+2°C a +8°C), reconstituição estéril, antissepsia cirúrgica, mapeamento anatômico dos músculos da mímica facial, técnica de injeção intradérmica/intramuscular, descarte de resíduos perfurocortantes (Grupo E) e conduta imediata em intercorrências com <strong>Toxina Botulínica Tipo A</strong>, garantindo eficácia clínica, máxima biossegurança e blindagem jurídica conforme as normativas da <strong>ANVISA (RDC 63/2011 e RDC 222/2018)</strong>.
                </p>
              </div>

              {/* 2. RESPONSABILIDADE TÉCNICA */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-black uppercase text-[#0F172A] border-b border-[#E2E8F0] pb-1 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-[#0284C7] text-white flex items-center justify-center text-[10px]">2</span>
                  <span>CAMPO DE APLICAÇÃO & PROFISSIONAIS HABILITADOS</span>
                </h4>
                <p className="text-[11px] leading-relaxed text-[#334155]">
                  Procedimento restrito à Sala de Procedimentos Injetáveis da clínica. A execução é privativa de profissionais de nível superior legalmente habilitados e especializados na área estética pelos seus respectivos Conselhos de Classe (Biomédicos Estetas - CRBM, Farmacêuticos Estetas - CRF, Médicos - CRM, Cirurgiões-Dentistas - CRO e Enfermeiros Estetas - COREN).
                </p>
              </div>

              {/* 3. MATERIAIS & EQUIPAMENTOS */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-black uppercase text-[#0F172A] border-b border-[#E2E8F0] pb-1 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-[#0284C7] text-white flex items-center justify-center text-[10px]">3</span>
                  <span>MATERIAIS, MEDICAMENTOS E INSUMOS EXIGIDOS</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#334155]">
                  <li className="flex items-start gap-1.5 bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0]">
                    <Check className="w-3.5 h-3.5 text-[#00D3A1] shrink-0 mt-0.5" />
                    <span>01 Frasco-ampola de Toxina Botulínica Tipo A 100U ou 200U registrado na ANVISA.</span>
                  </li>
                  <li className="flex items-start gap-1.5 bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0]">
                    <Check className="w-3.5 h-3.5 text-[#00D3A1] shrink-0 mt-0.5" />
                    <span>Cloreto de Sódio 0,9% estéril injetável sem conservantes (ampola plástica ou vidro).</span>
                  </li>
                  <li className="flex items-start gap-1.5 bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0]">
                    <Check className="w-3.5 h-3.5 text-[#00D3A1] shrink-0 mt-0.5" />
                    <span>Seringas de insulina 0,3ml / 0,5ml ultra-finas sem espaço morto com agulhas 31G/32G (4mm a 8mm).</span>
                  </li>
                  <li className="flex items-start gap-1.5 bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0]">
                    <Check className="w-3.5 h-3.5 text-[#00D3A1] shrink-0 mt-0.5" />
                    <span>Agulha 18G ou 21G para aspiração e diluição estéril + Seringa de 3ml luer lock.</span>
                  </li>
                  <li className="flex items-start gap-1.5 bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0]">
                    <Check className="w-3.5 h-3.5 text-[#00D3A1] shrink-0 mt-0.5" />
                    <span>Clorexidina alcoólica 2% e aquosa 0,5% + Gaze estéril em pacotes lacrados.</span>
                  </li>
                  <li className="flex items-start gap-1.5 bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0]">
                    <Check className="w-3.5 h-3.5 text-[#00D3A1] shrink-0 mt-0.5" />
                    <span>Coletor rígido Descarpack (Resíduo Grupo E) e Lixeira com pedal (Grupo A).</span>
                  </li>
                </ul>
              </div>

              {/* 4. CADEIA DE FRIO & DILUIÇÃO */}
              <div className="space-y-2 bg-[#F0FDF4] border border-[#86EFAC] p-4 rounded-xl">
                <h4 className="text-xs font-black uppercase text-[#166534] flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-[#166534] text-white flex items-center justify-center text-[10px]">4</span>
                  <span>CADEIA DE FRIO (+2°C A +8°C) & PROTOCOLO DE RECONSTITUIÇÃO ESTÉRIL</span>
                </h4>
                <div className="text-[11px] text-[#14532D] space-y-1.5 leading-relaxed">
                  <p>
                    <strong>Armazenamento:</strong> Manter os frascos intactos em refrigerador exclusivo para medicamentos entre <strong>+2°C e +8°C</strong>, com conferência e registro diário no <em>Caderno Sanitário de Monitoramento de Temperatura</em>.
                  </p>
                  <p>
                    <strong>Técnica de Reconstituição:</strong> Limpar a rolha com álcool 70%. Aspirar 1,0 ml (diluição seca 1:1 onde cada 1 UI na seringa = 1U de toxina) ou 2,0 ml (diluição 1:2) de SF 0,9%. Inserir a agulha em ângulo de 45° permitindo que o vácuo puxe lentamente o soro pelas paredes do frasco.
                  </p>
                  <p className="p-2 bg-[#DCFCE7] border border-[#86EFAC] rounded font-bold text-[#14532D]">
                    ⚠️ PROIBIÇÃO EXPRESSA: Nunca agitar o frasco mecanicamente de forma vigorosa para não quebrar a cadeia proteica terciária da neurotoxina. Realizar apenas movimentos rotacionais suaves em formato de "8".
                  </p>
                </div>
              </div>

              {/* 5. TABELA DE MAPEAMENTO ANATÔMICO & DOSAGENS */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase text-[#0F172A] border-b border-[#E2E8F0] pb-1 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-[#0284C7] text-white flex items-center justify-center text-[10px]">5</span>
                  <span>TABELA DE MAPEAMENTO ANATÔMICO, MÚSCULOS-ALVO & DOSAGENS MÉDIAS</span>
                </h4>

                <div className="overflow-x-auto border border-[#CBD5E1] rounded-xl">
                  <table className="w-full text-[10px] text-left border-collapse">
                    <thead className="bg-[#F1F5F9] text-[#0F172A] uppercase font-black border-b border-[#CBD5E1]">
                      <tr>
                        <th className="p-2 border-r border-[#CBD5E1]">Músculo Alvo</th>
                        <th className="p-2 border-r border-[#CBD5E1]">Plano Anatômico</th>
                        <th className="p-2 border-r border-[#CBD5E1]">Pontos Típicos</th>
                        <th className="p-2 border-r border-[#CBD5E1]">Dose Média</th>
                        <th className="p-2">Cuidados Críticos / Margem de Segurança</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0] text-[#334155]">
                      <tr className="hover:bg-[#F8FAFC]">
                        <td className="p-2 font-bold text-[#0F172A] border-r border-[#E2E8F0]">Músculo Frontal</td>
                        <td className="p-2 border-r border-[#E2E8F0]">Intradérmico / Subcutâneo</td>
                        <td className="p-2 border-r border-[#E2E8F0]">4 a 8 pontos em "V"</td>
                        <td className="p-2 font-mono font-bold text-[#0284C7] border-r border-[#E2E8F0]">10 a 20 UI</td>
                        <td className="p-2">Manter margem mínima de 2,0 cm acima da borda supraorbital para evitar ptose.</td>
                      </tr>
                      <tr className="hover:bg-[#F8FAFC]">
                        <td className="p-2 font-bold text-[#0F172A] border-r border-[#E2E8F0]">Complexo Glabelar (Prócero + Corrugadores)</td>
                        <td className="p-2 border-r border-[#E2E8F0]">Intramuscular profundo (90°)</td>
                        <td className="p-2 border-r border-[#E2E8F0]">3 a 5 pontos</td>
                        <td className="p-2 font-mono font-bold text-[#0284C7] border-r border-[#E2E8F0]">15 a 25 UI</td>
                        <td className="p-2">Injeção a 90° no prócero e angulação lateral nos corrugadores para proteger o levantador da pálpebra.</td>
                      </tr>
                      <tr className="hover:bg-[#F8FAFC]">
                        <td className="p-2 font-bold text-[#0F172A] border-r border-[#E2E8F0]">Orbicular dos Olhos (Pés de Galinha)</td>
                        <td className="p-2 border-r border-[#E2E8F0]">Subdérmico superficial (pápula)</td>
                        <td className="p-2 border-r border-[#E2E8F0]">2 a 4 pontos por lado</td>
                        <td className="p-2 font-mono font-bold text-[#0284C7] border-r border-[#E2E8F0]">6 a 12 UI / lado</td>
                        <td className="p-2">Aplicar a no mínimo 1,0 cm da rima orbital óssea externa com bisel para cima.</td>
                      </tr>
                      <tr className="hover:bg-[#F8FAFC]">
                        <td className="p-2 font-bold text-[#0F172A] border-r border-[#E2E8F0]">Músculo Nasal (Bunny Lines)</td>
                        <td className="p-2 border-r border-[#E2E8F0]">Dérmico lateral</td>
                        <td className="p-2 border-r border-[#E2E8F0]">1 a 2 pontos por lado</td>
                        <td className="p-2 font-mono font-bold text-[#0284C7] border-r border-[#E2E8F0]">2 a 4 UI / lado</td>
                        <td className="p-2">Evitar o músculo levantador da asa do nariz para não alterar o sorriso do paciente.</td>
                      </tr>
                      <tr className="hover:bg-[#F8FAFC]">
                        <td className="p-2 font-bold text-[#0F172A] border-r border-[#E2E8F0]">Sorriso Gengival (Levantador do Lábio)</td>
                        <td className="p-2 border-r border-[#E2E8F0]">Ponto de Yonsei</td>
                        <td className="p-2 border-r border-[#E2E8F0]">1 ponto por lado</td>
                        <td className="p-2 font-mono font-bold text-[#0284C7] border-r border-[#E2E8F0]">1 a 2 UI / lado</td>
                        <td className="p-2">Dose estritamente conservadora para evitar incompetência labial.</td>
                      </tr>
                      <tr className="hover:bg-[#F8FAFC]">
                        <td className="p-2 font-bold text-[#0F172A] border-r border-[#E2E8F0]">DAO (Depressor do Ângulo da Boca)</td>
                        <td className="p-2 border-r border-[#E2E8F0]">Subcutâneo mandibular</td>
                        <td className="p-2 border-r border-[#E2E8F0]">1 ponto por lado</td>
                        <td className="p-2 font-mono font-bold text-[#0284C7] border-r border-[#E2E8F0]">2 a 3 UI / lado</td>
                        <td className="p-2">Eleva os cantos caídos da boca. Evitar o músculo depressor do lábio inferior.</td>
                      </tr>
                      <tr className="hover:bg-[#F8FAFC]">
                        <td className="p-2 font-bold text-[#0F172A] border-r border-[#E2E8F0]">Mentoniano (Queixo Celulítico)</td>
                        <td className="p-2 border-r border-[#E2E8F0]">Intramuscular ápice</td>
                        <td className="p-2 border-r border-[#E2E8F0]">1 a 2 pontos</td>
                        <td className="p-2 font-mono font-bold text-[#0284C7] border-r border-[#E2E8F0]">4 a 8 UI</td>
                        <td className="p-2">Injeção no ápice sob contração voluntária do queixo.</td>
                      </tr>
                      <tr className="hover:bg-[#F8FAFC]">
                        <td className="p-2 font-bold text-[#0F172A] border-r border-[#E2E8F0]">Masseter (Bruxismo / Afinamento)</td>
                        <td className="p-2 border-r border-[#E2E8F0]">Intramuscular profundo</td>
                        <td className="p-2 border-r border-[#E2E8F0]">3 a 4 pontos / lado</td>
                        <td className="p-2 font-mono font-bold text-[#0284C7] border-r border-[#E2E8F0]">20 a 35 UI / lado</td>
                        <td className="p-2">Palpar em máxima intercuspidação. Respeitar a linha trago-comissura e o músculo risório.</td>
                      </tr>
                      <tr className="hover:bg-[#F8FAFC]">
                        <td className="p-2 font-bold text-[#0F172A] border-r border-[#E2E8F0]">Platisma (Efeito Nefertiti)</td>
                        <td className="p-2 border-r border-[#E2E8F0]">Intradérmico superficial</td>
                        <td className="p-2 border-r border-[#E2E8F0]">Micropápulas ao longo da mandíbula</td>
                        <td className="p-2 font-mono font-bold text-[#0284C7] border-r border-[#E2E8F0]">15 a 30 UI</td>
                        <td className="p-2">Melhora a definição do contorno mandibular e trata bandas platismais cervicais.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 6. PASSO A PASSO TÉCNICO & ASSEPSIA */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase text-[#0F172A] border-b border-[#E2E8F0] pb-1 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-[#0284C7] text-white flex items-center justify-center text-[10px]">6</span>
                  <span>PASSO A PASSO TÉCNICO & ASSEPSIA CIRÚRGICA</span>
                </h4>
                <div className="space-y-1.5 text-[11px] text-[#334155]">
                  <div className="flex items-start gap-2 bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0]">
                    <span className="font-mono font-black text-[#0284C7] shrink-0">Passo 1:</span>
                    <span>Conferir Ficha de Anamnese e TCLE assinado pelo paciente, checando ausência de contraindicações (Miastenia Gravis, gestação, lactação, uso de aminoglicosídeos).</span>
                  </div>
                  <div className="flex items-start gap-2 bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0]">
                    <span className="font-mono font-black text-[#0284C7] shrink-0">Passo 2:</span>
                    <span>Registro fotográfico padronizado em 5 ângulos (frontal neutro, frontal com mímica máxima forçada, perfis 90° direito/esquerdo e 45° oblíquo).</span>
                  </div>
                  <div className="flex items-start gap-2 bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0]">
                    <span className="font-mono font-black text-[#0284C7] shrink-0">Passo 3:</span>
                    <span>Higienização das mãos do profissional (técnica dos 5 momentos da OMS) e paramentação com EPIs estéreis/descartáveis (luvas sem pó, máscara cirúrgica e óculos).</span>
                  </div>
                  <div className="flex items-start gap-2 bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0]">
                    <span className="font-mono font-black text-[#0284C7] shrink-0">Passo 4:</span>
                    <span>Demarcação precisa com lápis dermatográfico branco com o paciente sentado a 90° expressando a mímica muscular forçada.</span>
                  </div>
                  <div className="flex items-start gap-2 bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0]">
                    <span className="font-mono font-black text-[#0284C7] shrink-0">Passo 5:</span>
                    <span>Antissepsia cirúrgica da face com clorexidina alcoólica 2% em movimentos centrífugos do centro para a periferia, aguardando secagem espontânea.</span>
                  </div>
                  <div className="flex items-start gap-2 bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0]">
                    <span className="font-mono font-black text-[#0284C7] shrink-0">Passo 6:</span>
                    <span>Injeção precisa com seringa graduada de insulina em bisel voltado para cima, conferindo a dosimetria exata unidade por unidade.</span>
                  </div>
                  <div className="flex items-start gap-2 bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0]">
                    <span className="font-mono font-black text-[#0284C7] shrink-0">Passo 7:</span>
                    <span>Compressão suave com gaze estéril seca em caso de sangramento pontual (proibido friccionar ou massagear).</span>
                  </div>
                  <div className="flex items-start gap-2 bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0]">
                    <span className="font-mono font-black text-[#0284C7] shrink-0">Passo 8:</span>
                    <span>Descarte imediato da seringa e agulha na caixa Descarpack (Resíduo Grupo E) sem reencape prévio (NR-32).</span>
                  </div>
                </div>
              </div>

              {/* 7. ORIENTAÇÕES PÓS & RETORNO */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-black uppercase text-[#0F172A] border-b border-[#E2E8F0] pb-1 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-[#0284C7] text-white flex items-center justify-center text-[10px]">7</span>
                  <span>ORIENTAÇÕES PÓS-PROCEDIMENTO AO PACIENTE</span>
                </h4>
                <ul className="list-disc pl-5 text-[11px] text-[#334155] space-y-1">
                  <li>Permanecer em posição ereta / vertical (não deitar ou abaixar a cabeça) por no mínimo 4 horas pós-aplicação.</li>
                  <li>Não massagear, pressionar ou esfregar a face nas primeiras 24 horas.</li>
                  <li>Evitar atividades físicas intensas, saunas e exposição direta ao sol forte por 48 horas.</li>
                  <li>Agendar retorno presencial obrigatório entre o 15º e 30º dia para reavaliação de simetria e eventual retoque.</li>
                </ul>
              </div>

              {/* 8. INTERCORRÊNCIAS */}
              <div className="space-y-1.5 bg-[#FFFBEB] border border-[#FDE68A] p-3.5 rounded-xl">
                <h4 className="text-xs font-black uppercase text-[#92400E] flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-[#92400E] text-white flex items-center justify-center text-[10px]">8</span>
                  <span>PROTOCOLO DE MANEJO DE INTERCORRÊNCIAS & EVENTOS ADVERSOS</span>
                </h4>
                <div className="text-[10.5px] text-[#78350F] space-y-1 leading-relaxed">
                  <p><strong>Ptose Palpebral:</strong> Prescrição de colírio de Tartarato de Brimonidina 0,1% ou Apraclonidina 0,5% (1 a 2 gotas, 3x ao dia) para estimular a contração do músculo de Müller e elevar a pálpebra em 1-2mm até resolução.</p>
                  <p><strong>Assimetria / "Efeito Mefisto":</strong> Aplicação de 1 a 2 UI no ponto hipercinético residual após o 15º dia.</p>
                  <p><strong>Hematomas / Equimoses:</strong> Compressas frias imediatas e aplicação tópica de gel de arnica ou pomada de vitamina K com FPS 50+.</p>
                </div>
              </div>

              {/* 9. ASSINATURA & CONTROLE SANITÁRIO */}
              <div className="pt-4 border-t-2 border-[#0F172A] grid grid-cols-1 sm:grid-cols-2 gap-4 text-[10px]">
                <div className="space-y-1 p-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl">
                  <div className="font-bold text-[#0F172A] uppercase">COMITÊ DE BIOSSEGURANÇA & QUALIDADE</div>
                  <div className="text-[#64748B]">Documento emitido conforme RDC 63/2011 da ANVISA</div>
                  <div className="font-mono text-[#047857] font-bold">✓ VISTO DE CONFORMIDADE SANITÁRIA</div>
                </div>

                <div className="space-y-1 p-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-center">
                  <div className="border-b border-[#94A3B8] pb-4 mb-1">
                    <span className="text-[9px] text-[#64748B] italic">Assinatura e Carimbo do Responsável Técnico</span>
                  </div>
                  <div className="font-bold text-[#0F172A]">
                    {clinicData?.responsibleTech || 'RESPONSÁVEL TÉCNICO(A)'}
                  </div>
                  <div className="text-[#64748B]">
                    {clinicData?.professionalCouncil || 'CRBM / CRF / CRM / COREN / CRO'}
                  </div>
                </div>
              </div>

              {/* UPSELL CALLOUT BANNER INSIDE PREVIEW */}
              <div className="p-4 bg-gradient-to-r from-[#0F231D] to-[#0A1612] border-2 border-[#00D3A1] rounded-2xl text-white space-y-3">
                <div className="flex items-center gap-2 text-[#00D3A1] font-black text-xs">
                  <Award className="w-4 h-4" />
                  <span>PADRÃO OURO DE REGULARIZAÇÃO SANITÁRIA VIGIESTÉTICA</span>
                </div>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  Este é exatamente o nível de excelência técnica, clínica e jurídica presente em <strong>todos os 168 documentos</strong> da Pasta Sanitária VigiEstética (POPs, Cadernos ANVISA, Manuais RDC 63/2011, TCLEs, PGRSS e Contratos).
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#1E3A2F]">
                  <span className="text-xs text-[#A7F3D0] font-bold">
                    ✓ Garanta a blindagem jurídica e aprovação imediata da sua clínica
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewCard(null);
                      if (onCtaClick) onCtaClick();
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00D3A1] to-[#00B1EA] hover:brightness-110 text-black font-black text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer shadow-lg shadow-[#00D3A1]/30"
                  >
                    <Zap className="w-4 h-4 fill-black" />
                    <span>Liberar Toda a Pasta com 168 Documentos</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Preview Bottom Bar */}
            <div className="p-4 border-t border-[#E2E8F0] bg-[#F1F5F9] flex flex-col sm:flex-row items-center justify-end gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setPreviewCard(null)}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#CBD5E1] hover:bg-[#94A3B8] text-[#0F172A] text-xs font-bold transition cursor-pointer"
                >
                  Fechar Amostra
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPreviewCard(null);
                    if (onCtaClick) onCtaClick();
                  }}
                  className="flex-1 sm:flex-initial px-5 py-2 rounded-xl bg-[#00D3A1] hover:bg-[#00D3A1]/90 text-black text-xs font-black flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Desbloquear os 168 Documentos</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#111827] border border-[#00D3A1] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-2xl z-50 animate-[slideUp_0.2s_ease] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#00D3A1]" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
};
