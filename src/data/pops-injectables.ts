import { DocumentItem } from '../types';

export const POPS_INJECTABLES: DocumentItem[] = [
  // 1. POP – APLICAÇÃO DE TOXINA BOTULÍNICA TIPO A
  {
    id: 'pop-toxina-botulinica',
    title: 'POP – Aplicação de Toxina Botulínica Tipo A (Armazenamento, Reconstituição e Injeção)',
    category: 'POP',
    stepCategory: '2. POPs Estética Avançada e Injetáveis',
    version: 'V 4.5 - ANVISA & Harmonização Facial',
    lastModified: '2025-02-15',
    isEssential: true,
    adaptationNotes: 'Cadeia de frio 2°C a 8°C, reconstituição estéril suave sem vácuo forçado, diluição e injeção em unidades internacionais (UI).',
    content: `
<h2>POP – APLICAÇÃO DE TOXINA BOTULÍNICA TIPO A</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-INJ-001 | <strong>Setor:</strong> Cabine de Procedimentos Injetáveis</p>

<p><strong>1. OBJETIVO:</strong><br>
Padronizar o controle térmico (+2°C a +8°C), reconstituição asséptica, cálculo de dosagem em Unidades Internacionais (UI), técnica de injeção intramuscular/intradérmica e rastreabilidade de lotes de <strong>Toxina Botulínica Tipo A</strong> na <strong>{{nome_clinica}}</strong>, prevenindo contaminações, assimetrias musculares e ptoses palpebrais.</p>

<p><strong>2. INSUMOS, DISPOSITIVOS E MATERIAIS ESTÉREIS:</strong><br>
• Frasco-ampola de Toxina Botulínica Tipo A com registro ativo na ANVISA (armazenado em refrigerador exclusivo de +2°C a +8°C);<br>
• Soro Fisiológico (Cloreto de Sódio 0,9%) estéril injetável sem conservantes;<br>
• Seringas de 1 ml graduadas em 100 UI (tipo insulina) com agulha ultra-fina (30G a 32G de 4mm ou 8mm);<br>
• Agulha de aspiração 21G/22G para reconstituição suave;<br>
• Clorexidina Alcoólica 0,5% e gazes estéreis;<br>
• Lápis dermatográfico branco para demarcação de pontos motores faciais.</p>

<p><strong>3. PASSO A PASSO DA RECONSTITUIÇÃO ASSÉPTICA:</strong><br>
1. <strong>Antissepsia da Tampa:</strong> Friccionar gaze embebida em álcool 70% na tampa de borracha do frasco-ampola por 30 segundos;<br>
2. <strong>Aspiração do Diluente:</strong> Aspirar o volume exato de Soro Fisiológico 0,9% estéril preconizado pelo RT (ex: 1,0 ml, 2,0 ml ou 2,5 ml para frascos de 100 UI);<br>
3. <strong>Injeção Suave na Parede de Vidro:</strong> Introduzir a agulha em ângulo de 45° direcionando o jato de líquido suavemente para a parede interna do frasco. <em>Deixar o vácuo sugar o líquido naturalmente, sem agitação mecânica violenta (evitar formação de espuma para não desnaturar as pontes dissulfeto proteicas)</em>;<br>
4. <strong>Homogeneização:</strong> Realizar movimentos circulares suaves no plano horizontal por 1 minuto;<br>
5. <strong>Rotulagem Obrigatória:</strong> Afixar etiqueta com <em>Data/Hora da Diluição, Diluente, Concentração em UI/0.1ml e Visto do RT</em>. Armazenar em refrigerador a 2°C-8°C e utilizar dentro do prazo de estabilidade validado.</p>

<p><strong>4. APLICAÇÃO CLÍNICA E PONTOS ANATÔMICOS:</strong><br>
1. Paciente sentado a 90° na maca; solicitar expressões faciais dinâmicas (franzir a testa, cara de bravo, sorrir forçado, bico);<br>
2. Demarcar os pontos motores: Músculo Frontal (respeitando margem de segurança de 1,5 a 2 cm acima da sobrancelha para evitar ptose palpebral), Glabela (Prócero e Corrugadores), Periorbicular ("pés de galinha"), Nasal (Bunny lines) e Terço Inferior;<br>
3. Antissepsia rigorosa da pele com Clorexidina 0,5%;<br>
4. Injetar a dosagem prescrita em cada ponto em ângulo de 45° ou 90° conforme o músculo;<br>
5. Colar a etiqueta destacável do lote do produto na Ficha de Evolução do Prontuário do Paciente.</p>

<p><strong>5. ORIENTAÇÕES PÓS-PROCEDIMENTO AO PACIENTE:</strong><br>
• Não deitar a cabeça horizontalmente ou abaixar o tronco nas primeiras 4 horas;<br>
• Não praticar exercícios físicos de impacto ou musculação por 24 a 48 horas;<br>
• Não massagear ou esfregar as áreas aplicadas;<br>
• Agendamento da <strong>Consulta de Retorno Obrigatória entre o 15º e o 21º dia</strong> para avaliação e eventuais refinamentos pontuais.</p>
`
  },

  // 2. POP – PREENCHIMENTO FACIAL COM ÁCIDO HIALURÔNICO RETICULADO
  {
    id: 'pop-preenchimento-acido-hialuronico',
    title: 'POP – Preenchimento Facial com Ácido Hialurônico Reticulado e Segurança Vascular',
    category: 'POP',
    stepCategory: '2. POPs Estética Avançada e Injetáveis',
    version: 'V 4.5 - ANVISA & Segurança Vascular',
    lastModified: '2025-02-15',
    isEssential: true,
    adaptationNotes: 'Protocolo de aspiração prévia negativa de 5 segundos com agulha, uso preferencial de microcânulas e maleta de resgate com hialuronidase.',
    content: `
<h2>POP – PREENCHIMENTO COM ÁCIDO HIALURÔNICO E SEGURANÇA VASCULAR</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-INJ-002 | <strong>Setor:</strong> Cabine de Procedimentos Injetáveis</p>

<p><strong>1. OBJETIVO:</strong><br>
Normatizar a técnica de aplicação de preenchedores dérmicos de <strong>Ácido Hialurônico Reticulado</strong> (lábios, malar, mandíbula, mento, sulco nasogeniano e olheiras) na <strong>{{nome_clinica}}</strong>, com foco na prevenção de eventos isquêmicos através da técnica de aspiração prévia, uso preferencial de microcânulas de ponta romba e disponibilidade imediata da enzima Hialuronidase.</p>

<p><strong>2. INSUMOS E DISPOSITIVOS COM REGISTRO ANVISA:</strong><br>
• Seringas preenchidas de Ácido Hialurônico reticulado estéril lacradas individualmente;<br>
• Microcânulas estéreis de ponta romba descartáveis (calibres 22G, 25G ou 27G com comprimento de 38mm a 70mm) e agulha guia de pertuito correspondente;<br>
• Agulhas estéreis 27G / 30G para aplicações supraperiosteais pontuais em bolus em áreas anatômicas de baixo risco vascular;<br>
• Clorexidina Alcoólica 0,5% e gazes estéreis virgens;<br>
• <strong>Maleta de Resgate Vascular:</strong> Frascos de Hialuronidase (1500 a 3000 UTR), diluente estéril (SF 0,9%) e compressas térmicas prontas para uso imediato.</p>

<p><strong>3. DIRETRIZES TÉCNICAS MANDATÓRIAS DE SEGURANÇA VASCULAR:</strong><br>
1. <strong>Assepsia Estrita da Face:</strong> Fricção antisséptica de Clorexidina por toda a face em 3 etapas consecutivas;<br>
2. <strong>Uso Preferencial de Microcânulas:</strong> Em regiões anatômicas de alto risco vascular (sulco nasogeniano, lábios, malar, têmporas e olheiras), utilizar microcânulas de ponta romba que diminuem significativamente a transfixação e embolização arterial intra-lúmen;<br>
3. <strong>TESTE OBRIGATÓRIO DE ASPIRAÇÃO PRÉVIA (AO UTILIZAR AGULHA):</strong><br>
   - Ao posicionar a ponta da agulha no plano ósseo/supraperiosteal, <strong>puxar o êmbolo e manter a pressão negativa estática por no mínimo 5 (cinco) segundos ininterruptos</strong>;<br>
   - Se houver qualquer refluxo de sangue na seringa (aspiração positiva): retirar a agulha imediatamente, descartá-la no coletor Grupo E, comprimir o ponto por 2 minutos e reposicionar nova agulha em outro local anatômico;<br>
4. <strong>Injeção Lenta e de Baixo Volume:</strong> Injetar lentamente em baixas pressões (nunca forçar o êmbolo) e em micro-bolus (máximo 0,05ml por ponto) ou retroinjeção linear suave;<br>
5. <strong>Checagem do Tempo de Enchimento Capilar (TEC):</strong> Pressionar a pele tratada e observar o retorno da coloração rosada em menos de 2 segundos. Se houver branqueamento súbito persistente (<em>blanching</em>), dor desproporcional ou livedo reticular, suspender imediatamente a aplicação e iniciar o <em>Protocolo de Resgate com Hialuronidase</em>.</p>

<p><strong>4. REGISTRO, RASTREABILIDADE E ARQUIVAMENTO:</strong><br>
Colar as etiquetas destacáveis do lote, validade e volume aplicado na Ficha de Evolução Clínica do paciente e arquivar no prontuário por 20 anos.</p>
`
  },

  // 3. POP – BIOESTIMULADORES DE COLÁGENO FACIAIS E CORPORAIS (PLLA, CaHA, PCL)
  {
    id: 'pop-bioestimuladores-facial',
    title: 'POP – Bioestimuladores de Colágeno Faciais e Corporais (PLLA, Hidroxiapatita de Cálcio CaHA e Policaprolactona PCL)',
    category: 'POP',
    stepCategory: '2. POPs Estética Avançada e Injetáveis',
    version: 'V 4.5 - ANVISA & Bioestimulação Dérmica',
    lastModified: '2025-02-15',
    isEssential: true,
    adaptationNotes: 'Reconstituição estéril prévia de 24h a 48h para PLLA, diluições em leque hiperdiluídas (1:1 a 1:4) e técnica de massagem 5x5x5.',
    content: `
<h2>POP – BIOESTIMULADORES DE COLÁGENO FACIAIS E CORPORAIS</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-INJ-003 | <strong>Setor:</strong> Cabine de Procedimentos Injetáveis</p>

<p><strong>1. OBJETIVO:</strong><br>
Padronizar a hidratação, reconstituição, diluição, antissepsia de campo e injeção subdérmica de <strong>Bioestimuladores de Colágeno</strong> (Ácido Poli-L-Láctico - PLLA, Hidroxiapatita de Cálcio - CaHA e Policaprolactona - PCL) na <strong>{{nome_clinica}}</strong>, com foco na indução biológica de neocolagênese tipo I e III, sustentação tecidual e prevenção rigorosa de nódulos ou granulomas.</p>

<p><strong>2. INSUMOS E DISPOSITIVOS COM REGISTRO ANVISA:</strong><br>
• Frascos de PLLA / CaHA / PCL com registro ativo no Ministério da Saúde/ANVISA;<br>
• Água para Injeção (API) estéril e Soro Fisiológico 0,9%;<br>
• Cloridrato de Lidocaína a 2% sem vasoconstritor (adicionado no momento da aplicação);<br>
• Microcânulas estéreis descartáveis 22G ou 21G de 50mm ou 70mm com agulha de pertuito;<br>
• Clorexidina Alcoólica 0,5% e gazes estéreis virgens.</p>

<p><strong>3. DIRETRIZES DE RECONSTITUIÇÃO E PREPARO PRÉVIO:</strong><br>
• <strong>PLLA (Ácido Poli-L-Láctico):</strong> Hidratar o frasco com 8,0 ml de API estéril <strong>com antecedência mínima de 24 a 48 horas</strong>, mantendo em repouso estéril. No momento da aplicação, adicionar 2,0 ml de Lidocaína 2% sem vasoconstritor (volume total 10 ml) e homogeneizar por 1 minuto sem inversão violenta;<br>
• <strong>CaHA (Hidroxiapatita de Cálcio):</strong> Diluição imediata no momento do procedimento com SF 0,9% e Lidocaína 2% em conector Luer-Lock fêmea-fêmea estéril (diluição padrão 1:1, 1:2 ou 1:4 conforme a área corporal ou facial), realizando no mínimo 20 a 30 passagens entre as seringas para completa homogeneização.</p>

<p><strong>4. TÉCNICA DE APLICAÇÃO E PLANO ANATÔMICO:</strong><br>
1. Plano estrito: <strong>Subdérmico profundo / Subcutâneo imediato</strong> através de microcânula (proibida injeção intradérmica superficial ou em áreas de hipermotilidade como lábios e pálpebras);<br>
2. Técnica de retroinjeção linear em leque ou xadrez (cross-hatching) distribuindo micro-trajetos uniformes;<br>
3. <strong>Massagem Imediata na Cabine:</strong> O profissional realiza massagem vigorosa contínua por 5 minutos com creme neutro para espalhar uniformemente as micropartículas.</p>

<p><strong>5. REGRA DOS 5 (PÓS-PROCEDIMENTO):</strong><br>
Orientar o paciente a realizar a regra de massagem domiciliar: <strong>Massagem de 5 minutos, 5 vezes ao dia, durante 5 dias consecutivos</strong> para prevenir aglomeração de partículas e formação de nódulos.</p>
`
  },

  // 5. POP – FIOS ABSORVÍVEIS DE POLIDIOXANONA (PDO)
  {
    id: 'pop-fios-pdo',
    title: 'POP – Fios Absorvíveis de Polidioxanona PDO (Lisos, Parafuso e Espiculados de Tração/Lifting)',
    category: 'POP',
    stepCategory: '2. POPs Estética Avançada e Injetáveis',
    version: 'V 4.0 - ANVISA & Biossegurança Cirúrgica',
    lastModified: '2025-02-15',
    isEssential: true,
    adaptationNotes: 'Protocolo de assepsia estéril de campo cirúrgico, técnica de pertuito com cânula, implantação subdérmica no SMAS e prevenção de extrusão.',
    content: `
<h2>POP – FIOS ABSORVÍVEIS DE POLIDIOXANONA (PDO)</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-INJ-008 | <strong>Setor:</strong> Cabine de Procedimentos Injetáveis Estéreis</p>

<p><strong>1. OBJETIVO:</strong><br>
Normatizar a inserção de <strong>Fios de PDO (Polidioxanona)</strong> lisos, matrix, parafuso (estímulo de colágeno) e espiculados/barbed com cânula (lifting e ancoragem mecânica) na <strong>{{nome_clinica}}</strong>, com foco na tração do terço médio/inferior da face, pescoço e tratamento de rugas finas.</p>

<p><strong>2. MATERIAIS ESTÉREIS E DESCARTÁVEIS:</strong><br>
• Fios de PDO estéreis em embalagem blister individual lacrada com registro ANVISA;<br>
• Agulha de pertuito 18G/19G e cânulas de inserção 19G/21G (para fios espiculados) ou 26G/29G (para fios lisos);<br>
• Campo cirúrgico estéril fenestrado descartável e luvas cirúrgicas estéreis;<br>
• Anestésico local (Lidocaína 2% com epinefrina 1:200.000) nos pontos de pertuito e trajeto vetorial;<br>
• Tesoura estéril de ponta curva para corte do fio e fita microporosa esterilizada.</p>

<p><strong>3. SEQUÊNCIA OPERACIONAL:</strong><br>
1. <strong>Paramentação Cirúrgica:</strong> Luvas estéreis, campo fenestrado e antissepsia rigorosa da face em 3 etapas com Clorexidina 0,5%;<br>
2. <strong>Botão Anestésico:</strong> Infiltração anestésica pontual nos orifícios de entrada (pertuito);<br>
3. <strong>Inserção no Plano Subdérmico Correto:</strong> Introdução da cânula com o fio no plano hipodérmico superficial (evitar plano dérmico muito superficial para não causar ondulações e plano muito profundo para não atingir vasos maiores);<br>
4. <strong>Tração e Corte do Excesso:</strong> Tracionar a pele, puxar a cânula liberando as garras espiculadas do fio, acomodar o tecido e cortar a extremidade rente abaixo da derme;<br>
5. <strong>Curativo Oclusivo:</strong> Curativo com micropore estéril sustentando os vetores por 48 horas.</p>
`
  },

  // 9. POP – BIORREMODELADORES TECIDUAIS E POLINUCLEOTÍDEOS / PDRN (TÉCNICA BAP)
  {
    id: 'pop-biorremodeladores-pdrn-bap',
    title: 'POP – Biorremodeladores Teciduais e Polinucleotídeos / PDRN (Técnica BAP de 5 Pontos de Injeção)',
    category: 'POP',
    stepCategory: '2. POPs Estética Avançada e Injetáveis',
    version: 'V 4.5 - ANVISA & Biorremodelação Celular',
    lastModified: '2025-02-15',
    isEssential: true,
    adaptationNotes: 'Aplicação por técnica BAP (Bio Aesthetic Points) de 5 pontos anatômicos, ácido hialurônico de alto e baixo peso molecular e fração de PDRN.',
    content: `
<h2>POP – BIORREMODELADORES TECIDUAIS E POLINUCLEOTÍDEOS (PDRN / BAP)</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-INJ-009 | <strong>Setor:</strong> Cabine de Injetáveis</p>

<p><strong>1. OBJETIVO:</strong><br>
Normatizar a aplicação de <strong>Biorremodeladores Teciduais de Ácido Hialurônico de Alta Fluidez e Polinucleotídeos (PDRN)</strong> na <strong>{{nome_clinica}}</strong>, com foco na regeneração celular, melhora drástica da matriz extracelular, hidratação profunda e restauração da elasticidade cutânea.</p>

<p><strong>2. TÉCNICA BAP (BIO AESTHETIC POINTS - 5 PONTOS POR HEMIFACE):</strong><br>
• Ponto 1: Zigomático superior (2 cm do canto externo do olho);<br>
• Ponto 2: Base nasal / Malar (linha vertical da pupila e horizontal da asa nasal);<br>
• Ponto 3: Tragus anterior (1 cm anterior ao tragus);<br>
• Ponto 4: Mento (1,5 cm da linha média do mento);<br>
• Ponto 5: Ângulo da mandíbula (1 cm anterior ao ângulo mandibular).<br>
• <strong>Volume por Ponto:</strong> Injeção lenta de <strong>0,2 ml em bolus dérmico profundo</strong> em cada um dos 5 pontos (total de 1,0 ml por hemiface / 2,0 ml na sessão completa).</p>

<p><strong>3. ORIENTAÇÕES:</strong> As pequenas pápulas formadas nos pontos BAP difundem-se naturalmente pela matriz dérmica em até 24 a 48 horas.</p>
`
  },

  // 10. POP – RINOMODELAÇÃO SEGURA E ESCULTURA LABIAL AVANÇADA
  {
    id: 'pop-rinomodelacao-labios-avancado',
    title: 'POP – Rinomodelação Segura e Escultura Labial Avançada (Microcânula, Planos Anatômicos e Resgate)',
    category: 'POP',
    stepCategory: '2. POPs Estética Avançada e Injetáveis',
    version: 'V 4.5 - ANVISA & Zonas de Risco Anatômico',
    lastModified: '2025-02-15',
    isEssential: true,
    adaptationNotes: 'Manejo das artérias dorsal do nariz, angular e labiais superiores/inferiores, técnica de ponta única com cânula 25G/27G e aspiração prévia.',
    content: `
<h2>POP – RINOMODELAÇÃO SEGURA E ESCULTURA LABIAL AVANÇADA</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-INJ-010 | <strong>Setor:</strong> Cabine de Procedimentos Injetáveis</p>

<p><strong>1. OBJETIVO:</strong><br>
Normatizar a intervenção estética no dorso nasal, ponta nasal, contorno e volume labial na <strong>{{nome_clinica}}</strong>, com estrita observância das zonas de alto risco vascular (Artéria Labial Superior e Inferior, Artéria Angular, Artéria Lateral do Nariz e Artéria Dorsal do Nariz).</p>

<p><strong>2. DIRETRIZES DE SEGURANÇA MANDATÓRIAS:</strong><br>
• <strong>Rinomodelação:</strong> Pertuito único na ponta do nariz com microcânula 25G ou 27G; plano de injeção estritamente suprapericondral e supraperiosteal no plano profundo mediano (nunca injetar no subcutâneo lateral onde trafegam as artérias nasais);<br>
• <strong>Escultura Labial:</strong> Plano de injeção submucoso anterior ou intramuscular superficial, evitando o plano submucoso posterior onde corre a artéria labial profunda (a cerca de 2-4mm de profundidade);<br>
• Volume máximo por sessão labial: 1,0 ml de Ácido Hialurônico reticulado de viscosidade média.</p>
`
  },

  // 11. POP – INTRADERMOTERAPIA: SKINBOOSTER
  {
    id: 'pop-skinbooster',
    title: 'POP – Intradermoterapia: Skinbooster (Hidratação Dérmica Profunda com Ácido Hialurônico Não Reticulado)',
    category: 'POP',
    stepCategory: '2. POPs Estética Avançada e Injetáveis',
    version: 'V 4.0 - ANVISA & Hidratação Dérmica',
    lastModified: '2025-02-15',
    adaptationNotes: 'Micro-pápulas em derme média com agulha 30G/32G ou cânula 27G/30G, intervalo quinzenal e reposição hídrica profunda.',
    content: `
<h2>POP – INTRADERMOTERAPIA: SKINBOOSTER</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-INJ-011 | <strong>Setor:</strong> Cabine de Injetáveis</p>

<p><strong>1. OBJETIVO:</strong><br>
Padronizar a injeção dérmica de <strong>Skinboosters</strong> (Ácido Hialurônico de baixa reticulação ou não reticulado enriquecido com vitaminas, aminoácidos e antioxidantes) na <strong>{{nome_clinica}}</strong> para restauração da hidratação hídrica, brilho cutâneo e suavização de rugas finas do rosto, pescoço, colo e dorso das mãos.</p>

<p><strong>2. PARÂMETROS:</strong><br>
Micro-injeções de 0,01 a 0,02 ml por ponto em derme média com agulha 32G de 4mm, espaçadas a cada 0,5 a 1,0 cm, ou retroinjeções em leque com cânula 27G/30G.</p>
`
  },

  // 12. POP – INTRADERMOTERAPIA FACIAL E CORPORAL / MESOTERAPIA
  {
    id: 'pop-intradermoterapia-mesoterapia',
    title: 'POP – Intradermoterapia Facial e Corporal / Mesoterapia (Mesclas Estéreis e Protocolos Injetáveis)',
    category: 'POP',
    stepCategory: '2. POPs Estética Avançada e Injetáveis',
    version: 'V 4.0 - ANVISA & Mesoterapia',
    lastModified: '2025-02-15',
    adaptationNotes: 'Mesclas estéreis industrializadas com registro ANVISA, volume máximo de 10ml por sessão corporal e técnica de ponto a ponto a 4mm.',
    content: `
<h2>POP – INTRADERMOTERAPIA FACIAL E CORPORAL (MESOTERAPIA)</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-INJ-012 | <strong>Setor:</strong> Cabine de Injetáveis</p>

<p><strong>1. OBJETIVO:</strong><br>
Normatizar a administração de mesclas lipolíticas, firmantes, clareadoras e capilares na <strong>{{nome_clinica}}</strong>, com controle de assepsia, descarte de ampolas e biossegurança contra contaminação microbiana.</p>

<p><strong>2. DIRETRIZES:</strong><br>
Uso de mesclas exclusivamente estéreis de dose única. Descarte imediato de sobras. Técnica ponto a ponto com agulha 30G x 4mm em ângulo de 45° a 90° conforme a espessura do tecido-alvo.</p>
`
  },

  // 13. POP – LIPOENZIMÁTICA DE PAPADA E CORPORAL
  {
    id: 'pop-lipoenzimatica',
    title: 'POP – Lipoenzimática de Papada e Gordura Localizada Corporal (Desoxicolato de Sódio e Enzimas Lipolíticas)',
    category: 'POP',
    stepCategory: '2. POPs Estética Avançada e Injetáveis',
    version: 'V 4.0 - ANVISA & Enzimas Lipolíticas',
    lastModified: '2025-02-15',
    adaptationNotes: 'Grade de 1cm x 1cm, pinçamento do tecido subcutâneo com prega mínima de 1,5cm, injeção no tecido adiposo a 6mm-13mm e controle de edema.',
    content: `
<h2>POP – LIPOENZIMÁTICA DE PAPADA E GORDURA LOCALIZADA</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-INJ-013 | <strong>Setor:</strong> Cabine de Injetáveis</p>

<p><strong>1. OBJETIVO:</strong><br>
Normatizar a aplicação de <strong>Desoxicolato de Sódio e Mesclas Enzimáticas Lipolíticas</strong> na <strong>{{nome_clinica}}</strong>, promovendo lise de adipócitos na região submentoniana (papada), abdômen, flancos e culotes com segurança celular.</p>

<p><strong>2. CONDUTA TÉCNICA:</strong><br>
Demarcação em quadrantes de 1x1 cm; pinçamento cutâneo obrigatório (prega mínima de 1,5 cm na papada e 2,0 cm no corporal); injeção estritamente hipodérmica a 90° com agulha 30G x 13mm (corporal) ou 30G x 6mm (papada).</p>
`
  },

  // 14. POP – HARMONIZAÇÃO GLÚTEA
  {
    id: 'pop-harmonizacao-glutea',
    title: 'POP – Harmonização Glútea com Bioestimuladores, Ácido Hialurônico Corporal e Peptídeos',
    category: 'POP',
    stepCategory: '2. POPs Estética Avançada e Injetáveis',
    version: 'V 4.0 - ANVISA & Corporal Avançado',
    lastModified: '2025-02-15',
    adaptationNotes: 'Mapeamento glúteo em 4 quadrantes, cânula 18G/21G, plano intramuscular superficial e subdérmico, assepsia cirúrgica estrita.',
    content: `
<h2>POP – HARMONIZAÇÃO GLÚTEA</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-INJ-014 | <strong>Setor:</strong> Cabine de Injetáveis Corporais</p>

<p><strong>1. OBJETIVO:</strong><br>
Padronizar os protocolos de volumização, firmeza dérmica e preenchimento da depressão trocantérica glútea na <strong>{{nome_clinica}}</strong> através de bioestimuladores, AH corporal de alta densidade e complexos peptídicos estéreis.</p>
`
  },

  // 15. POP – PLATISMOPLASTIA COM TOXINA BOTULÍNICA / NEFERTITI LIFT
  {
    id: 'pop-platismoplastia',
    title: 'POP – Platismoplastia com Toxina Botulínica (Efeito Nefertiti e Redefinição do Contorno Mandibular e Pescoço)',
    category: 'POP',
    stepCategory: '2. POPs Estética Avançada e Injetáveis',
    version: 'V 4.0 - ANVISA & Terço Inferior',
    lastModified: '2025-02-15',
    adaptationNotes: 'Injeção intradérmica superficial nas bandas platismais e borda mandibular inferior, prevenindo disfagia ou fraqueza muscular profunda.',
    content: `
<h2>POP – PLATISMOPLASTIA E EFEITO NEFERTITI</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-INJ-015 | <strong>Setor:</strong> Cabine de Injetáveis</p>

<p><strong>1. OBJETIVO:</strong><br>
Relaxar as bandas anteriores e laterais do músculo platisma na <strong>{{nome_clinica}}</strong>, atenuando a força depressora e redefinindo a linha da mandíbula (Lifting de Nefertiti).</p>
`
  },

  // 16. POP – PEIM (MICROVASOS COM GLICOSE 75%)
  {
    id: 'pop-peim',
    title: 'POP – PEIM - Procedimento Estético Injetável para Microvasos com Glicose Hipertônica 75%',
    category: 'POP',
    stepCategory: '2. POPs Estética Avançada e Injetáveis',
    version: 'V 4.0 - ANVISA & Escleroterapia Estética',
    lastModified: '2025-02-15',
    adaptationNotes: 'Solução de Glicose Hipertônica 75% estéril, agulha 30G x 4mm a 15°, compressão imediata e indicação de meia compressiva elástica.',
    content: `
<h2>POP – PEIM (ESCLEROTERAPIA DE MICROVASOS COM GLICOSE 75%)</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-INJ-016 | <strong>Setor:</strong> Cabine de Procedimentos Injetáveis</p>

<p><strong>1. OBJETIVO:</strong><br>
Padronizar a aplicação intravenosa de <strong>Glicose Hipertônica a 75%</strong> para desidratação e oclusão osmótica asséptica de telangiectasias e microvasos dos membros inferiores na <strong>{{nome_clinica}}</strong>.</p>
`
  },

  // 17. POP – TOXINA BOTULÍNICA PARA HIPERIDROSE
  {
    id: 'pop-toxina-hiperidrose',
    title: 'POP – Toxina Botulínica para Hiperidrose Axilar e Palmar (Teste de Minor com Iodo-Amido e Bloqueio Sudoríparo)',
    category: 'POP',
    stepCategory: '2. POPs Estética Avançada e Injetáveis',
    version: 'V 4.0 - ANVISA & Hiperidrose',
    lastModified: '2025-02-15',
    adaptationNotes: 'Teste de Minor com iodo e amido de milho para mapeamento do suor, injeções intradérmicas de 2 a 3 UI a cada 1cm e anestesia tópica.',
    content: `
<h2>POP – TOXINA BOTULÍNICA PARA HIPERIDROSE AXILAR E PALMAR</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-INJ-017 | <strong>Setor:</strong> Cabine de Injetáveis</p>

<p><strong>1. OBJETIVO:</strong><br>
Normatizar o bloqueio da liberação de acetilcolina nas glândulas sudoríparas écrinas para tratamento de sudorese excessiva na <strong>{{nome_clinica}}</strong>.</p>
`
  },

  // 23. POP – HIDROLIPOCLASIA NÃO ASPIRATIVA ULTRASSÔNICA (HLPA)
  {
    id: 'pop-hidrolipoclasia',
    title: 'POP – Hidrolipoclasia Não Aspirativa Ultrassônica (HLPA com Soro Hipotônico e Ultrassom Cavitacional)',
    category: 'POP',
    stepCategory: '2. POPs Estética Avançada e Injetáveis',
    version: 'V 4.0 - ANVISA & Corporal Avançado',
    lastModified: '2025-02-15',
    adaptationNotes: 'Infiltração de Soro Fisiológico 0,9% ou Água para Injeção estéril no plano adiposo seguida de ultrassom focalizado de alta potência.',
    content: `
<h2>POP – HIDROLIPOCLASIA NÃO ASPIRATIVA ULTRASSÔNICA (HLPA)</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-INJ-023B | <strong>Setor:</strong> Cabine de Corporal</p>

<p><strong>1. OBJETIVO:</strong><br>
Normatizar a técnica de hidratação hipoosmótica do tecido adiposo associada a ondas de ultrassom cavitacional na <strong>{{nome_clinica}}</strong>.</p>
`
  },

  // 24. POP – HIDROLIPO ASPIRATIVA DE PEQUENAS REGIÕES
  {
    id: 'pop-hidrolipo-aspirativa',
    title: 'POP – Hidrolipo Aspirativa de Pequenas Regiões (Submento e Flancos com Anestesia Tumescente Local)',
    category: 'POP',
    stepCategory: '2. POPs Estética Avançada e Injetáveis',
    version: 'V 4.5 - ANVISA & Procedimentos Invasivos Estéreis',
    lastModified: '2025-02-15',
    adaptationNotes: 'Solução anestésica tumescente de Klein estéril, microcânulas de aspiração estéreis descartáveis e protocolo rigoroso de campo cirúrgico.',
    content: `
<h2>POP – HIDROLIPO ASPIRATIVA DE PEQUENAS REGIÕES</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-INJ-024B | <strong>Setor:</strong> Sala Estéril de Procedimentos Avançados</p>

<p><strong>1. OBJETIVO:</strong><br>
Padronizar a aspiração mecânica suave de depósitos adiposos localizados (região submentoniana e flancos) sob anestesia local tumescente estéril na <strong>{{nome_clinica}}</strong>.</p>
`
  },

  // 25. POP – SOROTERAPIA / DRIP THERAPY
  {
    id: 'pop-soroterapia',
    title: 'POP – Soroterapia / Drip Therapy de Micronutrientes, Antioxidantes e Suporte Metabólico Endovenoso',
    category: 'POP',
    stepCategory: '2. POPs Estética Avançada e Injetáveis',
    version: 'V 4.5 - ANVISA RDC 67/2007 & Terapia Endovenosa',
    lastModified: '2025-02-15',
    adaptationNotes: 'Acesso venoso periférico estéril com cateter tipo abocath 22G/24G, infusão de micronutrientes, polivitamínicos e controle de gotejamento.',
    content: `
<h2>POP – SOROTERAPIA E TERAPIA NUTRICIONAL ENDOVENOSA</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-INJ-025 | <strong>Setor:</strong> Cabine de Terapia Endovenosa e Injetáveis</p>

<p><strong>1. OBJETIVO:</strong><br>
Normatizar a infusão endovenosa lenta de complexos vitamínicos, minerais quelatos, aminoácidos e antioxidantes na <strong>{{nome_clinica}}</strong>, com controle estrito de via de infusão e monitoramento dos sinais vitais.</p>
`
  },

  // 26. POP – TRICOLOGIA E TERAPIA CAPILAR AVANÇADA
  {
    id: 'pop-tricologia',
    title: 'POP – Tricologia e Terapia Capilar Avançada (MMP Capilar, Fatores de Crescimento e Fotobiomodulação com LED/Laser Baixa Potência)',
    category: 'POP',
    stepCategory: '2. POPs Estética Avançada e Injetáveis',
    version: 'V 4.0 - ANVISA & Terapia Capilar',
    lastModified: '2025-02-15',
    adaptationNotes: 'Microinfusão de medicamentos no couro cabeludo (MMP), drug delivery de fatores de crescimento estéreis e laser vermelho 660nm / infravermelho 808nm.',
    content: `
<h2>POP – TRICOLOGIA E TERAPIA CAPILAR AVANÇADA</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-INJ-026 | <strong>Setor:</strong> Cabine de Tricologia e Terapias Capilares</p>

<p><strong>1. OBJETIVO:</strong><br>
Padronizar os protocolos de estímulo do folículo piloso, tratamento de eflúvio telógeno e alopecia androgenética na <strong>{{nome_clinica}}</strong> através de microinfusão estéril e fotobiomodulação.</p>
`
  }
];
