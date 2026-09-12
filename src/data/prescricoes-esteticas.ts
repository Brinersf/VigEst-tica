import { DocumentItem } from '../types';
import { PRESCRICOES_CLINICAL_EVIDENCE } from './prescricoes-evidence';

const RAW_PRESCRICOES: DocumentItem[] = [
  // 1. PRESCRIÇÃO HOME CARE PÓS-INJETÁVEIS
  {
    id: 'prescricao-homecare-pos-injetaveis',
    title: 'Prescrição Home Care Pós-Injetáveis (Toxina, Preenchedores e Bioestimuladores)',
    category: 'POP',
    stepCategory: '6. Prescrições Estéticas e Home Care',
    version: 'V 4.5 - Farmacologia Estética & Home Care',
    lastModified: '2025-02-20',
    isEssential: true,
    iconType: 'Pill',
    adaptationNotes: 'Formulação calmante, arnica/vitamina K para prevenção de hematomas, barreira dérmica e fotoproteção.',
    content: `
<h2>RECEITUÁRIO & PRESCRIÇÃO HOME CARE PÓS-INJETÁVEIS</h2>
<p><strong>Clínica:</strong> {{nome_clinica}} | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} - {{registro_conselho}}<br>
<strong>Paciente:</strong> {{nome_paciente}} | <strong>Data:</strong> {{data_documento}}</p>

<hr/>

<p><strong>USO TÓPICO (VIA CUTÂNEA):</strong></p>

<p><strong>1. Gel / Sérum Reparador com Extrato de Arnica Montana 5% + Vitamina K Óxido 2% + Alfa-Bisabolol 1% em Gel Fluido q.s.p. 30g</strong><br>
<em>Finalidade:</em> Ação anti-inflamatória tópica, acelerador de reabsorção de microequimoses/hematomas e alívio do edema transitório.<br>
<strong>Modo de Uso:</strong> Aplicar uma camada fina nas regiões manipuladas 2 a 3 vezes ao dia com movimentos suaves e sem fricção excessiva, por 5 a 7 dias ou até resolução completa dos pontos de injeção.</p>

<p><strong>2. Creme Restaurador de Barreira Lipídica (Pantenol D-Pantenol 5% + Madecassoside 0,2% + Niacinamida 2% em Creme Suave 40g)</strong><br>
<em>Finalidade:</em> Hidratação epidérmica profunda, integridade da barreira cutânea e cicatrização dos micropontos de agulha e cânula.<br>
<strong>Modo de Uso:</strong> Aplicar em toda a face pela manhã e à noite após higienização com sabonete neutro suave.</p>

<p><strong>3. Protetor Solar Facial com Filtro Físico/Mineral FPS 50+ com Toque Seco e Ação Antipoluição</strong><br>
<strong>Modo de Uso:</strong> Aplicar pela manhã (30 minutos antes da exposição à luz) e reaplicar a cada 3 a 4 horas. Fundamental para prevenir Hipercromia Pós-Inflamatória (HPI) nos pontos de puntura.</p>

<hr/>

<p><strong>USO ORAL (SISTÊMICO - CONDICIONAL):</strong></p>

<p><strong>4. Paracetamol 750mg ou Dipirona Monoidratada 500mg/1g --------------------- 1 caixa</strong><br>
<em>Finalidade:</em> Alívio de eventual cefaleia tensional ou dor leve no local de aplicação.<br>
<strong>Posologia:</strong> Tomar 1 comprimido por via oral a cada 6 a 8 horas apenas em caso de dor ou incômodo importante. <em>(Não utilizar anti-inflamatórios não esteroidais como Ibuprofeno, Cetoprofeno ou AAS nas primeiras 48h sem orientação profissional expressa, para não elevar risco de sangramento local)</em>.</p>

<hr/>

<p><strong>ORIENTAÇÕES E CUIDADOS DOMICILIARES:</strong><br>
• Não deitar ou abaixar a cabeça nas primeiras 4 horas após Toxina Botulínica;<br>
• Evitar atividades físicas intensas, musculação, sauna e piscina aquecida por 48 horas;<br>
• Não realizar massagens compressivas sobre preenchimentos com Ácido Hialurônico, salvo massagem 5x5x5 específica prescrita para Bioestimulador PLLA;<br>
• Evitar exposição direta à luz solar enquanto persistirem eventuais marcas ou hematomas;<br>
• <strong>Plantão e Contato de Suporte Clínico:</strong> {{whatsapp}}.</p>
`
  },

  // 2. PRESCRIÇÃO E PROTOCOLO CLAREADOR DE MELASMA (IN & OUT)
  {
    id: 'prescricao-clareamento-melasma-magistral',
    title: 'Prescrição e Protocolo Magistral Clareador para Melasma e Hipercromias (In & Out)',
    category: 'POP',
    stepCategory: '6. Prescrições Estéticas e Home Care',
    version: 'V 4.5 - Farmacologia Magistral',
    lastModified: '2025-02-20',
    isEssential: true,
    iconType: 'Pill',
    adaptationNotes: 'Fórmula clareadora tópica livre de hidroquinona agressiva + nutracêutico oral antioxidante fotoprotetor.',
    content: `
<h2>RECEITUÁRIO & PROTOCOLO HOME CARE CLAREADOR PARA MELASMA (IN & OUT)</h2>
<p><strong>Clínica:</strong> {{nome_clinica}} | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} - {{registro_conselho}}<br>
<strong>Paciente:</strong> {{nome_paciente}} | <strong>Data:</strong> {{data_documento}}</p>

<hr/>

<p><strong>1. USO TÓPICO NOTURNO - FÓRMULA MAGISTRAL CLAREADORA MULTIALVO (EMULSÃO LIGEIRA 30g):</strong></p>
<pre style="background:#f8fafc; padding:12px; border:1px solid #cbd5e1; border-radius:6px; font-family:monospace; font-size:12px;">
Ácido Tranexâmico ......................... 3,0%
Alfa-Arbutin ............................... 2,0%
Niacinamida PC ............................. 4,0%
Ácido Kójico Dipalmitato ................... 2,0%
Ácido Hialurônico Fracionado ............... 0,5%
Sérum Phospholipidico / Fosfolipídios q.s.p 30g
</pre>
<p><strong>Modo de Uso:</strong> Higienizar a face à noite com espuma suave, secar delicadamente e aplicar uma camada uniforme em todo o rosto (com ênfase nas áreas pigmentadas). Lavar pela manhã e aplicar imediatamente o protetor solar com cor.</p>

<hr/>

<p><strong>2. USO TÓPICO DIURNO - SÉRUM ANTIOXIDANTE DE ALTA POTÊNCIA (FRASCO CONTA-GOTAS 30ml):</strong></p>
<pre style="background:#f8fafc; padding:12px; border:1px solid #cbd5e1; border-radius:6px; font-family:monospace; font-size:12px;">
Vitamina C Nanoencapsulada (Palmitato de Ascorbila) ... 10,0%
Ácido Ferúlico ........................................ 0,5%
Vitamina E (Alfa-Tocoferol) ........................... 1,0%
Resveratrol Puro ...................................... 0,5%
Sérum Aquoso Oil-Free q.s.p ........................... 30 ml
</pre>
<p><strong>Modo de Uso:</strong> Aplicar 4 a 5 gotas na face limpa pela manhã, espalhando uniformemente antes do protetor solar.</p>

<hr/>

<p><strong>3. USO ORAL - NUTRACÊUTICO ANTIOXIDANTE E FOTOPROTETOR SISTÊMICO (60 CÁPSULAS):</strong></p>
<pre style="background:#f8fafc; padding:12px; border:1px solid #cbd5e1; border-radius:6px; font-family:monospace; font-size:12px;">
Extrato de Polypodium Leucotomos ..................... 250 mg
Pycnogenol (Extrato de Pinus Pinaster) ............... 100 mg
Luteína .............................................. 10 mg
Astaxantina .......................................... 4 mg
Zinco Quelato ........................................ 15 mg
Excipiente livre de glúten q.s.p ..................... 1 cápsula
</pre>
<p><strong>Posologia:</strong> Ingerir 1 cápsula pela manhã junto ao café da manhã diariamente por período contínuo de 60 a 90 dias.</p>

<hr/>

<p><strong>REGRAS INEGOCIÁVEIS DO TRATAMENTO DE MELASMA:</strong><br>
• Protetor solar com óxidos de ferro (com cor/tonalizante) com FPS 50+ e PPD alto, reaplicado a cada 3 horas;<br>
• Evitar fontes de calor intenso (forno quente, vapor de panelas, sauna, secador de cabelo próximo ao rosto e banhos pelando), pois o estresse térmico induz melanogênese reflexa;<br>
• Não esfregar a pele com buchas faciais ou toalhas ásperas;<br>
• Manter o acompanhamento nas sessões de consultório na <strong>{{nome_clinica}}</strong>.</p>
`
  },

  // 3. PRESCRIÇÃO PÓS-LASER E PEELINGS
  {
    id: 'prescricao-pos-laser-peelings-regeneradora',
    title: 'Prescrição Reparadora e Calmante Pós-Lasers (Lavieen, CO2, LIP) e Peelings Químicos',
    category: 'POP',
    stepCategory: '6. Prescrições Estéticas e Home Care',
    version: 'V 4.5 - Regeneração Cutânea',
    lastModified: '2025-02-20',
    isEssential: true,
    iconType: 'Pill',
    adaptationNotes: 'Pomada oclusiva, água termal fisiológica, regenerador epidérmico e barreira física mineral.',
    content: `
<h2>RECEITUÁRIO & PROTOCOLO REGENERADOR PÓS-LASERS E PEELINGS QUÍMICOS</h2>
<p><strong>Clínica:</strong> {{nome_clinica}} | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} - {{registro_conselho}}<br>
<strong>Paciente:</strong> {{nome_paciente}} | <strong>Data:</strong> {{data_documento}}</p>

<hr/>

<p><strong>FASE 1: PRIMEIROS 3 A 5 DIAS (EPITELIZAÇÃO E ALÍVIO DO ARDOR):</strong></p>

<p><strong>1. Água Termal / Bruma Fisiológica Calmante 150ml (Uriage / Avène / La Roche-Posay)</strong><br>
<em>Modo de Uso:</em> Borrifar suavemente no rosto a cada 2 a 3 horas ou sempre que houver sensação de queimação, calor residual ou repuxamento cutâneo. Deixar secar naturalmente.</p>

<p><strong>2. Bálsamo Reparador Intensivo (Cicaplast Baume B5+ / Cicalfate+ / Cicabio)</strong><br>
<em>Composição:</em> Pantenol 5% + Centella Asiatica / Madecassoside + Cobre + Zinco + Manganês.<br>
<em>Modo de Uso:</em> Aplicar camada generosa sobre toda a face 3 a 4 vezes ao dia. Manter a pele permanentemente hidratada e protegida.</p>

<p><strong>3. Higienização Facial Ultra-Suave (Loção de Limpeza Toleriane / Cetaphil Suave)</strong><br>
<em>Modo de Uso:</em> Lavar a face somente com água fria ou morna e loção sem sabão (syndet). Secar apenas encostando toalha macia, sem fricção mecânica.</p>

<hr/>

<p><strong>FASE 2: A PARTIR DO 5º DIA (CONSOLIDAÇÃO E FOTOPROTEÇÃO TOTAL):</strong></p>

<p><strong>4. Protetor Solar Mineral / Físico FPS 50+ 100% Óxido de Zinco e Dióxido de Titânio</strong><br>
<em>Modo de Uso:</em> Iniciar aplicação a partir do 2º ou 3º dia (conforme liberação profissional). Aplicar abundantemente de manhã e reaplicar a cada 3 horas.</p>

<hr/>

<p><strong>PROIBIÇÕES CRÍTICAS PÓS-LASER / PEELING:</strong><br>
1. <strong>NUNCA PUXAR OU REMOVER AS CROSTAS OU PELES EM DESCAMAÇÃO:</strong> Deixar que caiam naturalmente durante as lavagens suaves para evitar cicatrizes e manchas permanentes;<br>
2. <strong>SUSPENDER TOTALMENTE</strong> o uso de ácidos (retinóico, glicólico, salicílico), esfoliantes físicos e escovas faciais por no mínimo 15 dias;<br>
3. <strong>ZERO EXPOSIÇÃO SOLAR DIRETA</strong> durante os primeiros 30 dias;<br>
4. Em caso de formação de vesículas herpéticas ou dor aguda, entrar em contato imediato pelo WhatsApp da clínica: <strong>{{whatsapp}}</strong>.</p>
`
  },

  // 4. PRESCRIÇÃO DE NUTRACÊUTICOS PARA ESTÍMULO DE COLÁGENO (IN & OUT)
  {
    id: 'prescricao-nutraceuticos-colageno-antiaging',
    title: 'Prescrição de Nutracêuticos Orais para Estímulo de Colágeno e Firmeza Cutânea (In & Out)',
    category: 'POP',
    stepCategory: '6. Prescrições Estéticas e Home Care',
    version: 'V 4.5 - Suplementação Funcional',
    lastModified: '2025-02-20',
    isEssential: true,
    iconType: 'Pill',
    adaptationNotes: 'Silício orgânico biodisponível, peptídeos Verisol, antioxidantes e cofatores de síntese de colágeno.',
    content: `
<h2>RECEITUÁRIO & PROTOCOLO NUTRACÊUTICO PARA ESTÍMULO DE COLÁGENO E ANCORAGEM DÉRMICA</h2>
<p><strong>Clínica:</strong> {{nome_clinica}} | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} - {{registro_conselho}}<br>
<strong>Paciente:</strong> {{nome_paciente}} | <strong>Data:</strong> {{data_documento}}</p>

<hr/>

<p><strong>1. FÓRMULA MAGISTRAL COFATORA DA SÍNTESE DE COLÁGENO & FIRMEZA DÉRMICA (60 CÁPSULAS):</strong></p>
<pre style="background:#f8fafc; padding:12px; border:1px solid #cbd5e1; border-radius:6px; font-family:monospace; font-size:12px;">
Silício Orgânico Biodisponível (Nutricolin / Exsynutriment) ... 150 mg
Vitamina C Revestida (Ácido Ascórbico) ........................ 250 mg
Zinco Bisglicinato Quelato .................................... 15 mg
Cobre Bisglicinato Quelato .................................... 1 mg
Biotina (Vitamina H) .......................................... 2,5 mg
N-Acetilcisteína (NAC) ........................................ 150 mg
Ácido Hialurônico Oral (Haplex Plus) .......................... 100 mg
Excipiente q.s.p .............................................. 1 cápsula
</pre>
<p><strong>Posologia:</strong> Ingerir 1 cápsula ao dia pela manhã, preferencialmente em jejum ou 30 minutos antes do café da manhã, por período contínuo de 90 a 180 dias.</p>

<hr/>

<p><strong>2. SACHÊS EFERVESCENTES DE PEPTÍDEOS BIOATIVOS DE COLÁGENO (30 SACHÊS):</strong></p>
<pre style="background:#f8fafc; padding:12px; border:1px solid #cbd5e1; border-radius:6px; font-family:monospace; font-size:12px;">
Peptídeos Bioativos de Colágeno Hidrolisado (Verisol®) ........ 2,5 g
Vitamina E (Acetato de Tocoferol) ............................. 10 mg
Selênio Quelato ............................................... 50 mcg
Sabor Laranja / Limão natural q.s.p ........................... 1 sachê
</pre>
<p><strong>Posologia:</strong> Diluir o conteúdo de 1 sachê em 150 ml de água em temperatura ambiente e ingerir à noite, antes de dormir.</p>

<hr/>

<p><strong>BENEFÍCIOS DA SUPLEMENTAÇÃO SINÉRGICA AOS PROCEDIMENTOS:</strong><br>
• Fornece o substrato aminoacídico e os cofatores minerais necessários para que os bioestimuladores injetáveis (PLLA, CaHA, PDRN e Fios PDO) alcancem o pico máximo de neocolagênese;<br>
• Melhora a hidratação dérmica intrínseca, a elasticidade e reduz a taxa de degradação da matriz extracelular pelas metaloproteinases (MMPs);<br>
• Fortalecimento simultâneo da haste capilar e lâminas ungueais.</p>
`
  },

  // 5. PRESCRIÇÃO HOME CARE PARA CONTROLE DE ACNE E OLEOSIDADE
  {
    id: 'prescricao-controle-acne-oleosidade',
    title: 'Prescrição e Rotina Home Care para Controle da Acne Ativa e Oleosidade Excessiva',
    category: 'POP',
    stepCategory: '6. Prescrições Estéticas e Home Care',
    version: 'V 4.5 - Dermatofarmacologia',
    lastModified: '2025-02-20',
    isEssential: true,
    iconType: 'Pill',
    adaptationNotes: 'Controle sebáceo com ácido salicílico, zinco PCA, niacinamida e proteção solar mate antiacne.',
    content: `
<h2>RECEITUÁRIO & PROTOCOLO HOME CARE ANTIACNE E CONTROLE DE OLEOSIDADE</h2>
<p><strong>Clínica:</strong> {{nome_clinica}} | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} - {{registro_conselho}}<br>
<strong>Paciente:</strong> {{nome_paciente}} | <strong>Data:</strong> {{data_documento}}</p>

<hr/>

<p><strong>PASSO 1: HIGIENIZAÇÃO PURIFICANTE (MANHÃ E NOITE):</strong></p>
<p><strong>Sabonete Líquido Facial Antiacne com Ácido Salicílico 2% + Extrato de Melaleuca (Tea Tree) 1% + Zinco PCA 1% (Frasco Pump 150ml)</strong><br>
<em>Modo de Uso:</em> Massagear sobre o rosto úmido por 60 segundos com a ponta dos dedos em movimentos circulares. Enxaguar abundantemente com água fria.</p>

<p><strong>PASSO 2: CONTROLE MICROBIANO E SEBORREGULADOR (MANHÃ):</strong></p>
<pre style="background:#f8fafc; padding:12px; border:1px solid #cbd5e1; border-radius:6px; font-family:monospace; font-size:12px;">
Niacinamida PC .............................. 5,0%
Zinco PCA ................................... 1,0%
Ácido Hialurônico de Baixo Peso ............. 0,2%
Gel Fluido Matificante Oil-Free q.s.p ....... 30 g
</pre>
<p><em>Modo de Uso:</em> Aplicar 1 a 2 pumps na face pela manhã após a limpeza.</p>

<p><strong>PASSO 3: FOTOPROTEÇÃO MATIFICANTE ANTIBILHO (DIURNO):</strong></p>
<p><strong>Protetor Solar Facial Fluido Toque Seco / Efeito Mate FPS 50 com Sílicas Antibrilho</strong><br>
<em>Modo de Uso:</em> Aplicar uniformemente antes da exposição solar e reaplicar a cada 4 horas.</p>

<p><strong>PASSO 4: TRATAMENTO NOTURNO RENOVADOR (NOITE):</strong></p>
<pre style="background:#f8fafc; padding:12px; border:1px solid #cbd5e1; border-radius:6px; font-family:monospace; font-size:12px;">
Ácido Azelaico .............................. 10,0%
Ácido Mandélico ............................. 5,0%
Extrato Glicólico de Hamamélis .............. 2,0%
Gel Creme Toque Seco q.s.p .................. 30 g
</pre>
<p><em>Modo de Uso:</em> Aplicar uma fina camada à noite na face limpa e seca. Inicialmente em dias alternados na primeira semana para avaliar tolerância cutânea.</p>

<hr/>

<p><strong>RECOMENDAÇÕES IMPORTANTES:</strong><br>
• NUNCA espremer ou manipular cravos e espinhas manualmente (risco severo de cicatrizes atróficas e manchas escuras);<br>
• Trocar a fronha do travesseiro a cada 2 a 3 dias e higienizar a tela do smartphone diariamente com álcool 70%;<br>
• Não usar maquiagens ou produtos comedogênicos com óleos minerais pesados.</p>
`
  },

  // 6. PRESCRIÇÃO PÓS-MICROAGULHAMENTO E DRUG DELIVERY
  {
    id: 'prescricao-pos-microagulhamento-drug-delivery',
    title: 'Prescrição Regeneradora Pós-Microagulhamento e Drug Delivery de Fatores de Crescimento',
    category: 'POP',
    stepCategory: '6. Prescrições Estéticas e Home Care',
    version: 'V 4.5 - Drug Delivery & Regeneração',
    lastModified: '2025-02-20',
    isEssential: true,
    iconType: 'Pill',
    adaptationNotes: 'Cuidados pós-agulhamento com microcanais abertos, fatores de crescimento estéreis e regeneração dérmica.',
    content: `
<h2>RECEITUÁRIO & PROTOCOLO HOME CARE PÓS-MICROAGULHAMENTO / DRUG DELIVERY</h2>
<p><strong>Clínica:</strong> {{nome_clinica}} | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} - {{registro_conselho}}<br>
<strong>Paciente:</strong> {{nome_paciente}} | <strong>Data:</strong> {{data_documento}}</p>

<hr/>

<p><strong>PRIMEIRAS 24 HORAS (FASE DE MICROCANALÍCULO ABERTO):</strong></p>
<p><strong>1. Sérum Estéril de Ácido Hialurônico Puro Não Reticulado em Monodoses (Frascos Estéreis de 2ml)</strong><br>
<em>Modo de Uso:</em> Aplicar suavemente nas regiões microagulhadas a cada 4 a 6 horas durante as primeiras 24h. <em>NÃO aplicar maquiagem, protetor solar com química pesada ou cremes com perfume nas primeiras 24 horas</em>.<br>
<em>Higienização:</em> Lavar a face apenas com soro fisiológico 0,9% estéril gelado ou água mineral filtrada.</p>

<hr/>

<p><strong>A PARTIR DE 24 HORAS ATÉ O 10º DIA (ESTÍMULO DE NEOCOLAGÊNESE):</strong></p>

<p><strong>2. Sérum Reparador de Fatores de Crescimento Bioidênticos (Frasco Airless 30ml):</strong></p>
<pre style="background:#f8fafc; padding:12px; border:1px solid #cbd5e1; border-radius:6px; font-family:monospace; font-size:12px;">
Fator de Crescimento Epidermal (EGF) ................. 1,5%
Fator de Crescimento Fibroblástico Básico (bFGF) ...... 1,5%
Fator de Crescimento Insulínico (IGF) ................. 1,0%
Pantenol D-Pantenol ................................... 3,0%
Sérum Hidratante Biocompatível q.s.p .................. 30 ml
</pre>
<p><em>Modo de Uso:</em> Aplicar de 4 a 5 gotas na face limpa pela manhã e à noite, espalhando suavemente.</p>

<p><strong>3. Fotoproteção Física Estrita com Óxido de Zinco FPS 50+</strong><br>
<em>Modo de Uso:</em> Aplicar obrigatoriamente a partir de 24 horas após o procedimento. Reaplicar a cada 3 horas.</p>

<hr/>

<p><strong>RESTRIÇÕES RÍGIDAS:</strong><br>
• Proibido banho quente com vapor intenso, academia e piscina por 48 horas;<br>
• Suspender qualquer ácido (retinóico, glicólico, etc.) por no mínimo 7 dias;<br>
• Não esfregar toalha ou usar buchas esfoliantes.</p>
`
  },

  // 7. PRESCRIÇÃO E PROTOCOLO TRICOLÓGICO / CAPILAR
  {
    id: 'prescricao-tricologia-terapia-capilar',
    title: 'Prescrição e Protocolo Home Care para Queda Capilar, Eflúvio e Fortalecimento Folicular',
    category: 'POP',
    stepCategory: '6. Prescrições Estéticas e Home Care',
    version: 'V 4.5 - Tricologia Avançada',
    lastModified: '2025-02-20',
    isEssential: true,
    iconType: 'Pill',
    adaptationNotes: 'Loção capilar vasodilatadora/fatores de crescimento + nutracêutico oral com biotina e aminoácidos sulfatados.',
    content: `
<h2>RECEITUÁRIO & PROTOCOLO TRICOLÓGICO HOME CARE (TERAPIA CAPILAR INTEGRADA)</h2>
<p><strong>Clínica:</strong> {{nome_clinica}} | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} - {{registro_conselho}}<br>
<strong>Paciente:</strong> {{nome_paciente}} | <strong>Data:</strong> {{data_documento}}</p>

<hr/>

<p><strong>1. LOÇÃO CAPILAR TÓPICA ATIVADORA FOLICULAR (FRASCO SPRAY 60ml):</strong></p>
<pre style="background:#f8fafc; padding:12px; border:1px solid #cbd5e1; border-radius:6px; font-family:monospace; font-size:12px;">
Minoxidil Base ........................................ 5,0%
Fator de Crescimento Vascular (VEGF) .................. 1,5%
Fator de Crescimento Insulínico (IGF) ................. 1,5%
Cafeína Anidra ........................................ 1,0%
Biotina ............................................... 0,2%
Solução Hidroalcoólica / Capilar sem Propilenoglicol q.s.p 60 ml
</pre>
<p><strong>Modo de Uso:</strong> Aplicar 1 ml (aproximadamente 6 borrifadas) diretamente no couro cabeludo limpo e seco à noite. Massagear com as pontas dos dedos por 2 minutos. Lavar as mãos após a aplicação.</p>

<hr/>

<p><strong>2. NUTRACÊUTICO ORAL FORTALECEDOR E ANTI-QUEDA (60 CÁPSULAS):</strong></p>
<pre style="background:#f8fafc; padding:12px; border:1px solid #cbd5e1; border-radius:6px; font-family:monospace; font-size:12px;">
Biotina (Vitamina B7) ................................. 5 mg
L-Cisteína ............................................ 200 mg
L-Metionina ........................................... 100 mg
Silício Orgânico (Nutricolin) ......................... 100 mg
Pantotenato de Cálcio (Vitamina B5) ................... 60 mg
Zinco Quelato ......................................... 15 mg
Ferro Bisglicinato Quelato ............................ 14 mg
Extrato Seco de Saw Palmetto (Serenoa Repens) ......... 160 mg
Excipiente q.s.p ...................................... 1 cápsula
</pre>
<p><strong>Posologia:</strong> Ingerir 1 cápsula ao dia após o almoço durante o período contínuo de 90 a 180 dias.</p>

<hr/>

<p><strong>3. SHAMPOO FORTALECEDOR E ESTIMULANTE DO BULBO (FRASCO 200ml):</strong><br>
<em>Composição:</em> Pantenol 1% + Extrato de Jaborandi 2% + Cafeína 1% + Mentol 0,2% em base shampoo suave sulfato-free.<br>
<em>Modo de Uso:</em> Lavar o couro cabeludo 3 vezes por semana, deixando agir a espuma por 3 minutos antes de enxaguar.</p>
`
  },

  // 8. PRESCRIÇÃO CORPORAL PÓS-LIPOENZIMÁTICA E PROCEDIMENTOS
  {
    id: 'prescricao-corporal-pos-lipoenzimatica',
    title: 'Prescrição e Cuidados Home Care Pós-Lipoenzimática de Papada e Gordura Corporal',
    category: 'POP',
    stepCategory: '6. Prescrições Estéticas e Home Care',
    version: 'V 4.5 - Estética Corporal & Enzimas',
    lastModified: '2025-02-20',
    isEssential: true,
    iconType: 'Pill',
    adaptationNotes: 'Géis ativadores tópicos, drenagem linfática orientada, cinta compressiva e restrições alimentares.',
    content: `
<h2>RECEITUÁRIO & PROTOCOLO HOME CARE PÓS-LIPOENZIMÁTICA (PAPADA E CORPO)</h2>
<p><strong>Clínica:</strong> {{nome_clinica}} | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} - {{registro_conselho}}<br>
<strong>Paciente:</strong> {{nome_paciente}} | <strong>Data:</strong> {{data_documento}}</p>

<hr/>

<p><strong>1. GEL / CREME DRENANTE E ATIVADOR DA CIRCULAÇÃO CORPORAL (BISNAGA 150g):</strong></p>
<pre style="background:#f8fafc; padding:12px; border:1px solid #cbd5e1; border-radius:6px; font-family:monospace; font-size:12px;">
Extrato Glicólico de Centella Asiatica ................ 5,0%
Extrato Glicólico de Ginkgo Biloba .................... 3,0%
Extrato de Castanha da Índia .......................... 3,0%
Cafeína Vetorizada .................................... 2,0%
Gel Creme Hidratante Corporal q.s.p ................... 150 g
</pre>
<p><strong>Modo de Uso:</strong> Aplicar 2 vezes ao dia nas regiões tratadas realizando movimentos de drenagem linfática ascendente em direção às cadeias ganglionares, iniciando 48 horas após a aplicação das enzimas.</p>

<hr/>

<p><strong>2. USO ORAL - FITOTERÁPICO DRENANTE E ANTIOXIDANTE (60 CÁPSULAS):</strong></p>
<pre style="background:#f8fafc; padding:12px; border:1px solid #cbd5e1; border-radius:6px; font-family:monospace; font-size:12px;">
Cactinea (Extrato de Opuntia Ficus-Indica) ........... 500 mg
Extrato de Chá Verde (Camellia Sinensis) ............. 200 mg
Centella Asiatica Padronizada ........................ 100 mg
Excipiente q.s.p ..................................... 1 cápsula
</pre>
<p><strong>Posologia:</strong> Ingerir 1 cápsula pela manhã com 1 copo grande de água diariamente por 30 dias.</p>

<hr/>

<p><strong>ORIENTAÇÕES ESSENCIAIS PARA MAXIMIZAR A ELIMINAÇÃO LIPÍDICA:</strong><br>
• Ingestão hídrica obrigatória de no mínimo <strong>2,5 a 3 litros de água por dia</strong> para metabolização e drenagem dos resíduos celulares;<br>
• Uso de faixa compressiva pós-lipo de papada (4 a 6 horas/dia nos primeiros 7 dias) ou cinta modeladora corporal conforme orientação do profissional;<br>
• Evitar consumo de bebidas alcoólicas, excesso de sal/sódio e carboidratos simples por 72 horas pós-sessão;<br>
• Realizar sessões de Drenagem Linfática Manual a partir do 3º ou 4º dia após a injeção.</p>
`
  },

  // 9. PRESCRIÇÃO DE PREPARO CUTÂNEO (SKIN PRIMING)
  {
    id: 'prescricao-skin-priming-pre-procedimentos',
    title: 'Prescrição de Preparo Cutâneo (Skin Priming) Pré-Procedimentos Estéticos Invasivos',
    category: 'POP',
    stepCategory: '6. Prescrições Estéticas e Home Care',
    version: 'V 4.5 - Skin Priming & Preparo',
    lastModified: '2025-02-20',
    isEssential: true,
    iconType: 'Pill',
    adaptationNotes: 'Preparo da pele 15 a 30 dias antes de lasers, peelings e bioestimuladores para maximizar resultados e evitar HPI.',
    content: `
<h2>RECEITUÁRIO & PROTOCOLO DE PREPARO CUTÂNEO (SKIN PRIMING PRÉ-PROCEDIMENTO)</h2>
<p><strong>Clínica:</strong> {{nome_clinica}} | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} - {{registro_conselho}}<br>
<strong>Paciente:</strong> {{nome_paciente}} | <strong>Data:</strong> {{data_documento}}</p>

<hr/>

<p><strong>OBJETIVO CLÍNICO:</strong> Uniformizar a espessura da camada córnea, estabilizar os melanócitos para prevenir Hiperpigmentação Pós-Inflamatória (HPI) e otimizar a permeação de ativos.</p>

<p><strong>1. SÉRUM CLAREADOR E ESTABILIZADOR MELANOCÍTICO PRÉVIO (USO NOTURNO - 30 DIAS ANTES):</strong></p>
<pre style="background:#f8fafc; padding:12px; border:1px solid #cbd5e1; border-radius:6px; font-family:monospace; font-size:12px;">
Ácido Glicólico ............................. 5,0%
Ácido Tranexâmico ........................... 3,0%
Niacinamida ................................. 4,0%
Alfa-Bisabolol .............................. 1,0%
Sérum Gel Hidratante q.s.p .................. 30 g
</pre>
<p><strong>Modo de Uso:</strong> Aplicar à noite em toda a face limpa por 15 a 21 dias consecutivos antes da sessão agendada. <em>Suspender o uso 3 dias antes do procedimento na clínica</em>.</p>

<p><strong>2. FOTOPROTEÇÃO MATIFICANTE COM COR FPS 50+:</strong><br>
<em>Modo de Uso:</em> Uso diário obrigatório a cada 3 a 4 horas.</p>
`
  },

  // 10. PRESCRIÇÃO E CUIDADOS PÓS-HARMONIZAÇÃO GLÚTEA
  {
    id: 'prescricao-gluteos-pos-harmonizacao',
    title: 'Prescrição e Cuidados Domiciliares Pós-Harmonização Glútea e Bioestimuladores Corporais',
    category: 'POP',
    stepCategory: '6. Prescrições Estéticas e Home Care',
    version: 'V 4.5 - Harmonização Glútea',
    lastModified: '2025-02-20',
    isEssential: true,
    iconType: 'Pill',
    adaptationNotes: 'Protocolo de higienização de orifícios de cânula, repouso pressórico, pomada anti-equimose e hidratação.',
    content: `
<h2>RECEITUÁRIO & PROTOCOLO HOME CARE PÓS-HARMONIZAÇÃO GLÚTEA (BIOESTIMULADORES & ÁCIDO HIALURÔNICO)</h2>
<p><strong>Clínica:</strong> {{nome_clinica}} | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} - {{registro_conselho}}<br>
<strong>Paciente:</strong> {{nome_paciente}} | <strong>Data:</strong> {{data_documento}}</p>

<hr/>

<p><strong>1. CUIDADOS COM OS ORIFÍCIOS DE ENTRADA DA CÂNULA (PERTUITOS):</strong><br>
• Realizar antissepsia com Clorexidina Aquosa 0,5% ou Álcool 70% 2 vezes ao dia nos primeiros 3 dias;<br>
• Manter os curativos oclusivos limpos e secos por 24 horas; após o banho, secar delicadamente com gaze estéril e reaplicar micropore se necessário.</p>

<p><strong>2. POMADA COMPOSTA ANTI-EQUIMOSE E ANALGÉSICA (USO TÓPICO - BISNAGA 40g):</strong><br>
<em>Composição:</em> Heparinóide 5mg/g ou Extrato de Arnica 10% + Vitamina K Óxido 2%.<br>
<em>Modo de Uso:</em> Aplicar nas regiões com hematomas e dor leve 2 a 3 vezes ao dia.</p>

<p><strong>3. DIRETRIZES DE POSICIONAMENTO E REPOUSO:</strong><br>
• Evitar sentar com peso total focado na região de projeção glútea tratada nos primeiros 3 a 5 dias (usar almofada de alívio ou deitar de bruços/lado);<br>
• Proibido treino de membros inferiores (agachamentos, leg press) por 7 a 10 dias;<br>
• Não realizar massagens profundas na área sem autorização prévia;<br>
• Em caso de calor excessivo, rubor acentuado ou febre, contatar imediatamente: <strong>{{whatsapp}}</strong>.</p>
`
  },

  // 11. PRESCRIÇÃO PÓS-FIOS PDO DE SUSTENTAÇÃO
  {
    id: 'prescricao-pos-fios-pdo-sustentacao',
    title: 'Prescrição e Recomendações Home Care Pós-Implante de Fios de Tração e Sustentação PDO',
    category: 'POP',
    stepCategory: '6. Prescrições Estéticas e Home Care',
    version: 'V 4.5 - Fios Absorvíveis PDO',
    lastModified: '2025-02-20',
    isEssential: true,
    iconType: 'Pill',
    adaptationNotes: 'Prevenção de deslocamento dos espículos, compressas frias, mastigação suave e analgésicos.',
    content: `
<h2>RECEITUÁRIO & RECOMENDAÇÕES PÓS-FIOS DE SUSTENTAÇÃO E TRAÇÃO PDO</h2>
<p><strong>Clínica:</strong> {{nome_clinica}} | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} - {{registro_conselho}}<br>
<strong>Paciente:</strong> {{nome_paciente}} | <strong>Data:</strong> {{data_documento}}</p>

<hr/>

<p><strong>1. ANALGESIA E CONTROLE DO EDEMA (USO ORAL):</strong><br>
<strong>Paracetamol 750mg ou Dipirona 500mg/1g --------------------- 1 caixa</strong><br>
<em>Posologia:</em> 1 comprimido a cada 6 a 8 horas nos primeiros 2 a 3 dias em caso de desconforto na mastigação ou dor nas têmporas.</p>

<p><strong>2. CUIDADOS TÓPICOS COM OS PONTOS DE ENTRADA E SAÍDA:</strong><br>
• Limpeza dos orifícios temporais/auriculares com Clorexidina 0,5% e gaze estéril 2 vezes ao dia;<br>
• Aplicar compressas de gelo envolvidas em pano limpo (sem comprimir a face) por 10 minutos a cada 2 horas nas primeiras 24 horas.</p>

<p><strong>3. DIRETRIZES COMPORTAMENTAIS PARA FIXAÇÃO DOS ESPÍCULOS PDO:</strong><br>
• <strong>DORMIR RIGOROSAMENTE DE BARRIGA PARA CIMA (DECÚBITO DORSAL)</strong> nos primeiros 7 a 14 dias com travesseiro elevado;<br>
• Evitar abrir a boca excessivamente, dar gargalhadas forçadas ou comer alimentos muito duros/crocantes por 10 dias;<br>
• Não realizar procedimentos odontológicos extensos, massagens faciais ou drenagens por 30 dias;<br>
• Não praticar esportes de contato ou impacto por 15 dias.</p>
`
  },

  // 13. OTIMIZAÇÃO E PROLONGAMENTO DA TOXINA BOTULÍNICA (ZINCO + FITASE)
  {
    id: 'prescricao-otimizacao-toxina-botulinica-zinco',
    title: 'Prescrição & Protocolo de Otimização e Prolongamento da Toxina Botulínica (Complexo Zinco-Fitase)',
    category: 'POP',
    stepCategory: '6. Prescrições Estéticas e Home Care',
    version: 'V 4.5 - Farmacologia & Zinco Neurotoxina',
    lastModified: '2025-02-20',
    isEssential: true,
    iconType: 'Pill',
    adaptationNotes: 'Suporte oral neuroquímico com Zinco Citrato e Fitase para saturação dos sítios catalíticos da SNAP-25 e ampliação da durabilidade da toxina.',
    content: `
<h2>RECEITUÁRIO & PROTOCOLO ORAL DE OTIMIZAÇÃO DA TOXINA BOTULÍNICA</h2>
<p><strong>Clínica:</strong> {{nome_clinica}} | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} - {{registro_conselho}}<br>
<strong>Paciente:</strong> {{nome_paciente}} | <strong>Data:</strong> {{data_documento}}</p>

<hr/>

<p><strong>USO ORAL (SISTÊMICO) - SUPORTE À LIGAÇÃO DO COMPLEXO NEUROTOXINA-ZINCO:</strong></p>

<p><strong>1. Fórmula Magistral Otimizadora de Ligação Neuromuscular (Cápsulas Gastrorresistentes):</strong></p>
<pre style="background:#f8fafc; padding:12px; border:1px solid #cbd5e1; border-radius:6px; font-family:monospace; font-size:12px;">
Zinco Citrato (Zinco Elementar) ...................... 50 mg
Fitase ................................................ 3.000 U
Excipiente q.s.p. ..................................... 1 cápsula
Mande ................................................. 10 a 20 cápsulas
</pre>

<p><strong>Posologia e Modo de Uso:</strong><br>
Tomar 1 cápsula via oral, 2 vezes ao dia (a cada 12 horas), iniciando <strong>4 dias antes</strong> da aplicação da toxina botulínica e mantendo a tomada no dia do procedimento.</p>

<hr/>

<p><strong>RECOMENDAÇÕES PÓS-PROCEDIMENTO (DIA DA APLICAÇÃO):</strong><br/>
• Permanecer na posição vertical (não deitar ou reclinar o tronco) pelas 4 horas subsequentes à injeção;<br/>
• Não realizar atividades físicas extenuantes ou exercícios de alto impacto nas primeiras 24 a 48 horas;<br/>
• Evitar massagear ou friccionar vigorosamente as regiões tratadas para prevenir difusão indesejada da neurotoxina;<br/>
• Retorno para reavaliação de assimetrias e complementação de pontos entre 14 e 21 dias.</p>
`
  },

  // 14. ESTÍMULO INTENSIVO PARA BIOESTIMULADORES DE COLÁGENO (PLLA / CaHA / FIOS DE PDO)
  {
    id: 'prescricao-estimulo-bioestimuladores-colageno',
    title: 'Prescrição & Matriz Nutracêutica para Bioestimuladores de Colágeno (PLLA / CaHA / Fios de PDO)',
    category: 'POP',
    stepCategory: '6. Prescrições Estéticas e Home Care',
    version: 'V 4.5 - Neoelastogênese & Neocolagênese',
    lastModified: '2025-02-20',
    isEssential: true,
    iconType: 'Pill',
    adaptationNotes: 'Matriz precursora oral rica em prolina, glicina, lisina, silício orgânico e cobre para potencializar a neocolagênese induzida por bioestimuladores.',
    content: `
<h2>RECEITUÁRIO & MATRIZ DE COLAGENOGÊNESE PÓS-BIOESTIMULADORES</h2>
<p><strong>Clínica:</strong> {{nome_clinica}} | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} - {{registro_conselho}}<br>
<strong>Paciente:</strong> {{nome_paciente}} | <strong>Data:</strong> {{data_documento}}</p>

<hr/>

<p><strong>USO ORAL (SISTÊMICO) - MATRIZ PRECURSORA DA NEOELASTOGÊNESE E NEOCOLAGENOGÊNESE:</strong></p>

<p><strong>1. Fórmula Nutracêutica de Suporte Fibroblástico Avançado (Cápsulas):</strong></p>
<pre style="background:#f8fafc; padding:12px; border:1px solid #cbd5e1; border-radius:6px; font-family:monospace; font-size:12px;">
Silício Orgânico Estabilizado em Colina ............... 100 mg
L-Prolina ............................................. 200 mg
L-Glicina ............................................. 200 mg
L-Lisina .............................................. 150 mg
Vitamina C (Ascorbato de Magnésio) .................... 300 mg
Cobre Quelato ......................................... 1 mg
Excipiente para pós higroscópicos q.s.p. .............. 1 cápsula
Mande ................................................. 120 a 180 cápsulas
</pre>

<p><strong>Posologia e Modo de Uso:</strong><br>
Tomar 1 cápsula via oral, 2 vezes ao dia (junto às principais refeições), por <strong>60 a 90 dias</strong> consecutivos após a aplicação do bioestimulador (Sculptra, Radiesse, Elleva, Diamond, Fios de PDO ou similares).</p>

<hr/>

<p><strong>DIRETRIZES PÓS-BIOESTIMULADOR:</strong><br/>
• <strong>Regra 5-5-5 (Para PLLA / Sculptra / Elleva):</strong> Massagear a área tratada por 5 minutos, 5 vezes ao dia, durante 5 dias com hidratante neutro;<br/>
• Manter ingestão hídrica adequada (mínimo de 35 mL/kg de peso corporal ao dia);<br/>
• Fotoproteção diária rigorosa com FPS 50+ para preservar as novas fibras elásticas sintetizadas.</p>
`
  },

  // 15. REDUÇÃO DE VOLUMETRIA CORPORAL E ADIPOSIDADE LOCALIZADA (PÓS-ENZIMÁTICO / ESVAZIADORES)
  {
    id: 'prescricao-reducao-volumetria-adiposidade-localizada',
    title: 'Prescrição Drenante e Lipolítica Pós-Enzimático e Esvaziadores (Tópico & Oral)',
    category: 'POP',
    stepCategory: '6. Prescrições Estéticas e Home Care',
    version: 'V 4.5 - Lipólise & Drenagem In & Out',
    lastModified: '2025-02-20',
    isEssential: true,
    iconType: 'Pill',
    adaptationNotes: 'Protocolo conjugado com creme drenante lipolítico nanovetorizado e nutracêutico metabólico para potencializar esvaziadores e enzimas.',
    content: `
<h2>RECEITUÁRIO & PROTOCOLO DRENANTE E LIPOLÍTICO (IN & OUT)</h2>
<p><strong>Clínica:</strong> {{nome_clinica}} | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} - {{registro_conselho}}<br>
<strong>Paciente:</strong> {{nome_paciente}} | <strong>Data:</strong> {{data_documento}}</p>

<hr/>

<p><strong>1. USO TÓPICO - CREME DRENANTE E LIPOLÍTICO VETORIZADO (SEGUNDA PELE 150g):</strong></p>
<pre style="background:#f8fafc; padding:12px; border:1px solid #cbd5e1; border-radius:6px; font-family:monospace; font-size:12px;">
Cafeína Nanovetorizada ................................ 5,0%
L-Carnitina ........................................... 3,0%
Extrato de Centella Asiatica (Madecassoside 95%) ...... 2,0%
Slimbuster L (Complexo Botânico Lipolítico) ........... 3,0%
Creme Base Cristal Líquido (Segunda Pele) q.s.p. ...... 150 g
</pre>
<p><strong>Modo de Uso Tópico:</strong><br>
Aplicar nas regiões corporais tratadas (ex.: abdômen, flancos, culotes, coxas ou papada) 2 vezes ao dia, massageando com movimentos circulares e ascendentes até completa absorção.</p>

<hr/>

<p><strong>2. USO ORAL - POTENCIALIZADOR METABÓLICO DA LIPÓLISE (CÁPSULAS / SACHÊS):</strong></p>
<pre style="background:#f8fafc; padding:12px; border:1px solid #cbd5e1; border-radius:6px; font-family:monospace; font-size:12px;">
Morosil (Extrato de Laranja Red Orange) ............... 500 mg
Cacti-Nea (Extrato do Fruto Opuntia ficus-indica) ..... 500 mg
L-Carnitina Tartarato ................................. 300 mg
Excipiente q.s.p. ..................................... 1 dose
Mande ................................................. 30 a 60 doses
</pre>
<p><strong>Posologia Oral:</strong><br>
Tomar 1 dose pela manhã em jejum ou 30 minutos antes do café da manhã, por <strong>30 a 60 dias</strong> consecutivos.</p>

<hr/>

<p><strong>RECOMENDAÇÕES COMPLEMENTARES:</strong><br/>
• Ingerir de 2 a 3 litros de água diariamente para favorecer a eliminação de metabólitos pela via linfático-renal;<br/>
• Manter rotina regular de caminhadas ou atividades aeróbicas para otimizar a queima de ácidos graxos mobilizados;<br/>
• Evitar consumo excessivo de sódio e carboidratos refinados durante o ciclo de tratamento.</p>
`
  },

  // 16. CONTROLE SEVERO DA HIPERPIGMENTAÇÃO PÓS-INFLAMATÓRIA (HPI) E PRÉ/PÓS-PEELING / LASER
  {
    id: 'prescricao-controle-hpi-pre-pos-peeling-laser',
    title: 'Prescrição Magistral para Controle de HPI e Bloqueio da Melanogênese (Cisteamina & Tranexâmico)',
    category: 'POP',
    stepCategory: '6. Prescrições Estéticas e Home Care',
    version: 'V 4.5 - Bloqueio Sequencial de Tirosinase',
    lastModified: '2025-02-20',
    isEssential: true,
    iconType: 'Pill',
    adaptationNotes: 'Fórmula inovadora de alta potência com Cisteamina 5% e Tranexâmico 5% em base anidra para controle de HPI e preparo de pele.',
    content: `
<h2>RECEITUÁRIO & PROTOCOLO CLAREADOR DE ALTA POTÊNCIA (HPI E PÓS-PROCEDIMENTO)</h2>
<p><strong>Clínica:</strong> {{nome_clinica}} | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} - {{registro_conselho}}<br>
<strong>Paciente:</strong> {{nome_paciente}} | <strong>Data:</strong> {{data_documento}}</p>

<hr/>

<p><strong>USO TÓPICO NOTURNO - GEL-SÉRUM CLAREADOR E BLOQUEADOR DA MELANOGÊNESE:</strong></p>

<p><strong>1. Fórmula Magistral em Base Anidra de Alta Estabilidade (Frasco Airless 30g):</strong></p>
<pre style="background:#f8fafc; padding:12px; border:1px solid #cbd5e1; border-radius:6px; font-family:monospace; font-size:12px;">
Ácido Tranexâmico ..................................... 5,0%
Cysteamine HCl ........................................ 5,0%
Niacinamida PC ........................................ 4,0%
Alfa-Arbutin .......................................... 2,0%
Sérum Anidro de Silicone ou Base Anidra q.s.p. ........ 30 g
</pre>

<p><strong>Posologia e Modo de Uso:</strong><br>
Aplicar uma fina camada à noite sobre as áreas hiperpigmentadas ou sobre toda a área tratada, após higienização suave com espuma sem sulfatos. Deixar agir durante a noite (ou por período inicial adaptativo de 30 a 60 minutos nas primeiras 2 semanas, lavando em seguida, se pele for reativa). Pela manhã, higienizar o rosto e aplicar obrigatoriamente protetor solar FPS 50+ com cor.</p>

<hr/>

<p><strong>PRECAUÇÕES IMPORTANTES:</strong><br/>
• Não utilizar em peles com crostas abertas, escoriações ou queimaduras solares ativas;<br/>
• O uso diário de protetor solar de amplo espectro (FPS 50+ PPD alto com proteção contra luz visível) é indispensável;<br/>
• Suspender 3 dias antes de sessões de laser ablativo ou peelings químicos profundos.</p>
`
  },

  // 17. RESGATE RÁPIDO DA BARREIRA CUTÂNEA E ACALMIA (PÓS-PREENCHIMENTO, FIOS E CANULAÇÕES INTENSAS)
  {
    id: 'prescricao-resgate-barreira-pos-fios-preenchimento',
    title: 'Prescrição Reparadora & Balm Calmante Pós-Preenchimento, Fios e Canulações',
    category: 'POP',
    stepCategory: '6. Prescrições Estéticas e Home Care',
    version: 'V 4.5 - Bioprotetor Celular & Barreira',
    lastModified: '2025-02-20',
    isEssential: true,
    iconType: 'Pill',
    adaptationNotes: 'Balm biomimético anidro com Vitamina K Óxido 2%, Ectoína 1%, Ceramidas e D-Pantenol para rápida acalmia e reabsorção de hematomas pós-canulação.',
    content: `
<h2>RECEITUÁRIO & PROTOCOLO REPARADOR BIOMIMÉTICO PÓS-PROCEDIMENTOS</h2>
<p><strong>Clínica:</strong> {{nome_clinica}} | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} - {{registro_conselho}}<br>
<strong>Paciente:</strong> {{nome_paciente}} | <strong>Data:</strong> {{data_documento}}</p>

<hr/>

<p><strong>USO TÓPICO - BALM CALMANTE E CICATRIZANTE BIOMIMÉTICO:</strong></p>

<p><strong>1. Fórmula Magistral Reparadora Anidra (Bisnaga / Frasco 30g):</strong></p>
<pre style="background:#f8fafc; padding:12px; border:1px solid #cbd5e1; border-radius:6px; font-family:monospace; font-size:12px;">
Vitamina K Óxido ...................................... 2,0%
Alfa-Bisabolol ........................................ 1,0%
D-Pantenol (Pró-Vitamina B5) .......................... 5,0%
Ceramidas (Complexo III / VI) ......................... 2,0%
Ectoína ............................................... 1,0%
Creme Anidro Reparador / Balm Lipofílico q.s.p. ....... 30 g
</pre>

<p><strong>Posologia e Modo de Uso:</strong><br>
Aplicar delicadamente sobre as áreas manipuladas (pertuitos de entrada, trajetos de cânula, locais de fios de sustentação e regiões de preenchimento) <strong>3 a 4 vezes ao dia</strong> com toques leves, sem realizar fricção ou pressão vigorosa, até a recuperação e desaparecimento de eritema e equimoses.</p>

<hr/>

<p><strong>ORIENTAÇÕES GERAIS AO PACIENTE:</strong><br/>
• Não aplicar compressas excessivamente quentes no local;<br/>
• Evitar uso de maquiagens oclusivas não estéreis nas primeiras 24 horas sobre os micropontos de inserção de agulha e cânula;<br/>
• Higienizar as mãos rigorosamente antes de cada aplicação do produto.</p>
`
  }
];

export const POPS_PRESCRICOES_ESTETICAS: DocumentItem[] = RAW_PRESCRICOES.map((doc) => ({
  ...doc,
  clinicalEvidence: doc.clinicalEvidence || PRESCRICOES_CLINICAL_EVIDENCE[doc.id]
}));
