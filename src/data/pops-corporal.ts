import { DocumentItem } from '../types';

export const POPS_CORPORAL: DocumentItem[] = [
  // POP – CRIOLIPÓLISE
  {
    id: 'pop-criolipolise',
    title: 'POP – Criolipólise com Membrana Anticongelante e Parâmetros Térmicos (-5°C a -11°C)',
    category: 'POP',
    version: 'V 4.0 - ANVISA & Segurança Termocinética',
    lastModified: '2025-02-15',
    adaptationNotes: 'Uso obrigatório de membrana anticongelante individual descartável com registro ANVISA, tempo de aplicação e prevenção de queimaduras por frio.',
    content: `
<h2>POP – PROCEDIMENTO OPERACIONAL DE CRIOLIPÓLISE SEGURA</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-CORP-035 | <strong>Setor:</strong> Cabine de Eletroterapia Corporal</p>

<p><strong>1. OBJETIVO E FUNDAMENTO TÉCNICO:</strong><br>
Normatizar a aplicação do tratamento de <strong>Criolipólise</strong> na <strong>{{nome_clinica}}</strong>, técnica não invasiva de destruição térmica seletiva de adipócitos por congelamento sustentado sob vácuo, garantindo a proteção da epiderme contra queimaduras por frio e necrose tecidual, parâmetros de sucção adequados e o registro de rastreabilidade de insumos exigido pela ANVISA.</p>

<p><strong>2. EQUIPAMENTO E INSUMOS COM REGISTRO ANVISA:</strong><br>
• Aparelho de Criolipólise certificado pelo INMETRO e registrado na ANVISA, com calibração anual de temperatura vigente;<br>
• <strong>Membrana Anticongelante de Alta Performance:</strong> Estéril, descartável, de uso único individual, impregnada com anticongelante atóxico e com número de Registro ANVISA impresso na embalagem original. <em>É terminantemente proibido recortar, dobrar para reutilizar ou reaproveitar membranas entre pacientes</em>;<br>
• Adipômetro clínico calibrado e fita métrica inextensível;<br>
• Protetor de acoplamento de manípulo descartável.</p>

<p><strong>3. AVALIAÇÃO PRÉVIA E CRITÉRIOS DE EXCLUSÃO:</strong><br>
• <strong>Espessura de Prega Mínima:</strong> Prega cutânea medida por adipômetro de no mínimo <strong>2,0 cm (20 mm)</strong> de gordura compactada;<br>
• <strong>Contraindicações Absolutas:</strong> Crioglobulinemia, Doença de Raynaud, Hemoglobinúria Paroxística ao Frio, Urticária ao Frio, Hérnias umbilicais/abdominais na área tratada, feridas abertas, dermatites, gestação e marcapasso cardíaco.</p>

<p><strong>4. PROTOCOLO OPERACIONAL PASSO A PASSO:</strong><br>
1. <strong>Higienização e Demarcação:</strong> Limpar a área com álcool 70% e demarcar o quadrante com lápis dermatográfico branco com o paciente em ortostase (em pé);<br>
2. <strong>Abertura da Membrana na Presença do Paciente:</strong> Abrir o sachê lacrado da membrana anticongelante na frente do paciente e posicioná-la cobrindo integralmente toda a área demarcada com folga de no mínimo 3 cm além das bordas do manípulo;<br>
3. <strong>Acoplamento e Ajuste de Parâmetros:</strong> Posicionar o manípulo aplicador sobre o centro da membrana. Iniciar a sucção a vácuo gradual. Programar a temperatura entre <strong>-5°C e -11°C</strong> e tempo de exposição entre <strong>45 e 60 minutos</strong> de acordo com o protocolo individual do fabricante;<br>
4. <strong>Monitoramento Visual Contínuo:</strong> O profissional deve inspecionar a área tratada nos primeiros 5 minutos e permanecer próximo à cabine durante toda a sessão. O paciente deve dispor de campainha de chamada de emergência;<br>
5. <strong>Desacoplamento e Massagem Reperfusional Imediata:</strong> Ao término do ciclo, despressurizar o manípulo suavemente. Retirar a membrana e <strong>realizar massagem vigorosa de descompactação e reperfusão térmica por no mínimo 2 a 3 minutos</strong> para potencializar a cristalização e apoptose celular;<br>
6. <strong>Descarte:</strong> Descartar a membrana utilizada imediatamente no lixo de resíduos infectantes (Grupo A).</p>

<p><strong>5. ORIENTAÇÕES PÓS-CRIOLIPÓLISE:</strong><br>
• Ingestão de no mínimo 2 a 3 litros de água por dia para suporte metabólico;<br>
• Não tomar banhos extremamente quentes ou saunas nas primeiras 24 horas;<br>
• Informar o paciente sobre a dormência/parestesia temporária esperada que regride entre 2 e 6 semanas.</p>
`
  },

  // POP – DRENAGEM LINFÁTICA MANUAL
  {
    id: 'pop-drenagem-linfatica',
    title: 'POP – Drenagem Linfática Manual (Métodos Vodder e Leduc Facial e Corporal)',
    category: 'POP',
    version: 'V 4.0 - ANVISA & Fisioterapia Dermatofuncional',
    lastModified: '2025-02-15',
    adaptationNotes: 'Manobras lentas, rítmicas e com pressão leve de 20-40 mmHg, evacuação prévia de linfonodos centrais e indicações pós-cirúrgicas.',
    content: `
<h2>POP – DRENAGEM LINFÁTICA MANUAL (VODDER E LEDUC)</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-CORP-037 | <strong>Setor:</strong> Cabine de Terapias Corporais</p>

<p><strong>1. OBJETIVO:</strong><br>
Padronizar a execução da <strong>Drenagem Linfática Manual (DLM)</strong> na <strong>{{nome_clinica}}</strong>, com base nos métodos científicos de Vodder e Leduc, visando à captação e reabsorção de líquidos intersticiais, redução de linfedemas, alívio de estase venosa, aceleração da recuperação em pós-operatório cirúrgico e melhora da oxigenação tecidual.</p>

<p><strong>2. PRINCÍPIOS BIOFÍSICOS MANDATÓRIOS:</strong><br>
• <strong>Pressão Leve e Constante:</strong> A pressão exercida pelas mãos deve ser estritamente de <strong>20 a 40 mmHg</strong> (pressão suave o suficiente para mover a pele superficialmente sem comprimir ou colabar os capilares linfáticos iniciais);<br>
• <strong>Direção Anatômica:</strong> Movimentos sempre direcionados para as cadeias de linfonodos regionais competentes (cervicais, axilares, inguinais e poplíteos);<br>
• <strong>Proibição de Hiperemia:</strong> A DLM nunca deve provocar dor, vermelhidão intensa ou hematomas.</p>

<p><strong>3. PASSO A PASSO TÉCNICO:</strong><br>
1. <strong>Posicionamento e Conforto:</strong> Paciente em decúbito dorsal ou ventral confortável com membros levemente elevados;<br>
2. <strong>Desobstrução / Evacuação Ganglionar Inicial:</strong> Realizar estímulos de bombeamento suave (5 a 7 compressões rítmicas) sobre o Terminus (linfonodos supraclaviculares), axilas e virilha antes de iniciar as manobras distais;<br>
3. <strong>Manobras de Captação e Reabsorção:</strong> Realizar círculos com os dedos, movimentos de bombeamento, movimentos de doador e manobras de bracelete de proximal para distal e de distal para proximal no sentido da corrente linfática;<br>
4. <strong>DLM Facial:</strong> Estimulação suave dos linfonodos pré-auriculares, submandibulares e cervicais superficiais com manobras em leque.</p>
`
  },

  // POP – CORRENTE RUSSA
  {
    id: 'pop-corrente-russa',
    title: 'POP – Corrente Russa e Eletroestimulação Muscular (Fortalecimento e Tonificação)',
    category: 'POP',
    version: 'V 4.0 - ANVISA & Eletroterapia',
    lastModified: '2025-02-15',
    adaptationNotes: 'Frequência de 2.500 Hz modulada, posicionamento em pontos motores musculares, uso de gel condutor e contraindicações.',
    content: `
<h2>POP – CORRENTE RUSSA E ELETROESTIMULAÇÃO MUSCULAR</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-CORP-038 | <strong>Setor:</strong> Cabine de Eletroterapia Corporal</p>

<p><strong>1. OBJETIVO:</strong><br>
Padronizar a aplicação da <strong>Corrente Russa</strong> na <strong>{{nome_clinica}}</strong>, corrente de média frequência (2.500 Hz despolarizada em bursts) destinada ao fortalecimento muscular, combate à hipotonia tissular e modelagem corporal em abdômen, glúteos, coxas e braços.</p>

<p><strong>2. MATERIAIS E EQUIPAMENTOS:</strong><br>
• Aparelho de Eletroestimulação com Corrente Russa com registro ANVISA e calibração anual;<br>
• Eletrodos de borracha condutiva de silicone higienizados com álcool 70%;<br>
• Gel condutor incolor à base de água registrado na ANVISA;<br>
• Faixas elásticas com velcro para fixação segura dos eletrodos.</p>

<p><strong>3. TÉCNICA OPERACIONAL:</strong><br>
1. <strong>Higienização e Localização dos Pontos Motores:</strong> Limpar a pele e posicionar os pares de eletrodos sobre o ventre/ponto motor do grupo muscular alvo;<br>
2. <strong>Aplicação do Gel Condutor:</strong> Aplicar camada generosa de gel sob os eletrodos de silicone (nunca ligar o aparelho sem gel para evitar queimaduras elétricas puntiformes);<br>
3. <strong>Fixação e Parâmetros:</strong> Fixar os eletrodos com faixas de velcro. Programar tempo de subida (Rise), sustentação (On), descida (Decay) e repouso (Off). Aumentar a intensidade de forma gradual e sincronizada com a tolerância do paciente até obter contração muscular visível e confortável;<br>
4. <strong>Tempo de Sessão:</strong> 20 a 30 minutos por grupamento muscular;<br>
5. <strong>Finalização e Limpeza:</strong> Desligar o equipamento, remover os eletrodos, limpar o gel do paciente e desinfetar os eletrodos com álcool 70%.</p>
`
  },

  // POP – ENDERMOTERAPIA / VACUOTERAPIA
  {
    id: 'pop-endermoterapia',
    title: 'POP – Endermoterapia e Vacuoterapia Corporal (Dermoativação Mecânica e Remodelamento)',
    category: 'POP',
    version: 'V 4.0 - ANVISA & Estética Corporal',
    lastModified: '2025-02-15',
    adaptationNotes: 'Sucção contínua e pulsada por pressão negativa regulada, manobras de rolamento e deslizamento, uso de macacão de lycra ou óleo e biossegurança.',
    content: `
<h2>POP – ENDERMOTERAPIA E VACUOTERAPIA CORPORAL</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-CORP-039 | <strong>Setor:</strong> Cabine de Estética Corporal</p>

<p><strong>1. OBJETIVO:</strong><br>
Padronizar o procedimento de <strong>Endermoterapia / Vacuoterapia</strong> na <strong>{{nome_clinica}}</strong>, técnica mecânica não invasiva que combina sucção a vácuo com roletes motorizados para promover a mobilização do tecido conjuntivo, remodelamento subcutâneo, quebra de traves fibróticas de celulite e estímulo circulatório.</p>

<p><strong>2. EQUIPAMENTOS E MATERIAIS:</strong><br>
• Aparelho de Vacuoterapia/Endermologia com manômetro digital e registro ANVISA;<br>
• Cabeçotes com roletes corporais e ventosas de vidro faciais/corporais higienizadas;<br>
• Macacão individual de malha elástica de lycra ou óleo vegetal mineralizado para deslizamento suave;<br>
• Álcool 70% para desinfecção dos manípulos entre pacientes.</p>

<p><strong>3. PASSO A PASSO TÉCNICO:</strong><br>
1. <strong>Preparo:</strong> Vestir o macacão no paciente ou aplicar óleo deslizante;<br>
2. <strong>Ajuste da Pressão de Vácuo (mmHg):</strong> Iniciar com pressão negativa moderada (100 a 250 mmHg), ajustando de acordo com a sensibilidade individual do paciente;<br>
3. <strong>Manobras:</strong> Deslizar o cabeçote em movimentos lineares, zig-zag e espirais no sentido das vias de drenagem linfática por 20 a 35 minutos;<br>
4. <strong>Desinfecção do Manípulo:</strong> Limpar e desinfetar as engrenagens e roletes com álcool 70% após cada uso.</p>
`
  },

  // POP – MASSAGEM MODELADORA
  {
    id: 'pop-massagem-modeladora',
    title: 'POP – Massagem Modeladora e Redutora de Medidas (Manobras Mecânicas Vigorosas)',
    category: 'POP',
    version: 'V 4.0 - ANVISA & Estética Corporal',
    lastModified: '2025-02-15',
    adaptationNotes: 'Manobras de amassamento, pinçamento, fricção e deslizamento profundo, cosméticos hiperemiantes com nicotinato de metila e limites de dor.',
    content: `
<h2>POP – MASSAGEM MODELADORA E REDUTORA CORPORAL</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-CORP-041 | <strong>Setor:</strong> Cabine de Terapias Manuais</p>

<p><strong>1. OBJETIVO:</strong><br>
Padronizar a execução da <strong>Massagem Modeladora / Redutora</strong> na <strong>{{nome_clinica}}</strong>, através de manobras manuais rítmicas, rápidas e profundas que atuam aumentando a vascularização local, a temperatura tecidual e o tônus muscular em abdômen, flancos, coxas e glúteos.</p>

<p><strong>2. DIRETRIZES DE SEGURANÇA E LIMITES MECÂNICOS:</strong><br>
• A massagem modeladora deve ser vigorosa, mas <strong>NÃO DEVE PROVOCAR HEMATOMAS OU EQUIMOSES GRAVES</strong> (o rompimento vascular não é critério de eficácia e constitui imperícia técnica);<br>
• Uso de cremes com ativos lipolíticos registrados na ANVISA (cafeína vetorizada, centelha asiática, chá verde e nicotinato de metila com teste prévio de sensibilidade cutânea).</p>

<p><strong>3. PASSO A PASSO TÉCNICO:</strong><br>
1. <strong>Higienização e Aplicação de Creme:</strong> Limpar a pele e espalhar o creme redutor termogênico;<br>
2. <strong>Sequência de Manobras:</strong> Realizar deslizamento profundo, amassamento vigoroso (palmar e digital), pinçamento em rolamento e percussão com punhos fechados por 10 a 15 minutos por região;<br>
3. <strong>Finalização:</strong> Manobras de deslizamento ascendente suave e orientação de hidratação abundante ao paciente.</p>
`
  },

  // POP – MASSOTERAPIA E RELAXAMENTO
  {
    id: 'pop-massoterapia',
    title: 'POP – Massoterapia, Massagem Relaxante e Liberação Miofascial Manual',
    category: 'POP',
    version: 'V 4.0 - ANVISA & Bem-Estar e Terapias Manuais',
    lastModified: '2025-02-15',
    adaptationNotes: 'Técnicas manuais de relaxamento, aromaterapia com óleos essenciais, ambiente climatizado e biossegurança de toalhas descartáveis.',
    content: `
<h2>POP – MASSOTERAPIA E MASSAGEM RELAXANTE</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-CORP-042 | <strong>Setor:</strong> Cabine de Terapias Manuais e Spa</p>

<p><strong>1. OBJETIVO:</strong><br>
Normatizar a rotina de <strong>Massoterapia e Massagem Relaxante</strong> na <strong>{{nome_clinica}}</strong>, com foco no alívio de tensões musculares, redução de estresse, melhora do retorno venoso e promoção de bem-estar biopsicossocial através de toques suaves, deslizamento superficial e profundo e pressões em pontos gatilho (Trigger Points).</p>

<p><strong>2. MATERIAIS E BIOSSEGURANÇA:</strong><br>
• Óleo vegetal 100% puro (Semente de Uva ou Amêndoas Doces) associado a óleos essenciais registrados na ANVISA (Lavanda, Camomila);<br>
• Lençol descartável de TNT ou papel trocado a cada paciente sobre a maca;<br>
• Difusor ultrassônico de aromas e música ambiente relaxante.</p>

<p><strong>3. TÉCNICA OPERACIONAL:</strong><br>
1. <strong>Acolhimento e Anamnese Rápida:</strong> Verificar queixas de dor, histórico de trombose venosa profunda (TVP - contraindicação absoluta) e preferência de pressão;<br>
2. <strong>Execução das Manobras:</strong> Iniciar com effleurage (deslizamento suave) para aquecimento, progredindo para petrissage (amassamento muscular), fricção e compressão isquêmica suave em pontos gatilho por 45 a 60 minutos;<br>
3. <strong>Finalização:</strong> Retirar excesso de óleo com toalha descartável e aguardar 5 minutos para retorno ortostático suave do paciente.</p>
`
  },

  // POP – RADIOFREQUÊNCIA E RADIOFREQUÊNCIA FRACIONADA
  {
    id: 'pop-radiofrequencia',
    title: 'POP – Radiofrequência Convencional e Fracionada Microagulhada (Retração de Colágeno e Rejuvenescimento)',
    category: 'POP',
    version: 'V 4.0 - ANVISA & Termoterapia Eletromagnética',
    lastModified: '2025-02-15',
    adaptationNotes: 'Controle de temperatura terapêutica de 40°C a 42°C com termômetro infravermelho, gel condutor e cartuchos estéreis para RF microagulhada.',
    content: `
<h2>POP – RADIOFREQUÊNCIA E RF FRACIONADA MICROAGULHADA</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-CORP-043 | <strong>Setor:</strong> Cabine de Eletroterapia e Radiofrequência</p>

<p><strong>1. OBJETIVO:</strong><br>
Padronizar a aplicação de <strong>Radiofrequência Capacitiva/Resistiva (Monopolar, Bipolar e Multipolar) e Radiofrequência Fracionada Microagulhada</strong> na <strong>{{nome_clinica}}</strong>, com controle termométrico rigoroso da temperatura dérmica (40°C a 42°C), estimulando a desnaturação e contração imediata do colágeno e a neocolagênese a médio prazo para flacidez cutânea facial e corporal.</p>

<p><strong>2. EQUIPAMENTOS E ACESSÓRIOS COM REGISTRO ANVISA:</strong><br>
• Gerador de Radiofrequência calibrado com registro ANVISA;<br>
• Termômetro digital infravermelho de mira óptica calibrado pelo INMETRO;<br>
• Gel glicerinado de alta condutividade térmica ou gel condutor neutro;<br>
• <strong>Cartuchos Estéreis Descartáveis de Microagulhas para RF Fracionada</strong> (uso único individual);<br>
• Coletor rígido de perfurocortantes (Grupo E).</p>

<p><strong>3. PASSO A PASSO TÉCNICO:</strong><br>
1. <strong>Higienização e Aplicação do Meio Acoplador:</strong> Limpar a pele e espalhar camada homogênea de glicerina líquida dermatológica ou gel condutor;<br>
2. <strong>Movimentos Contínuos e Controle de Temperatura:</strong> Manter o manípulo em constante movimento circular ou em 8 sobre o quadrante demarcado (10x10 cm). <strong>Nunca deixar o cabeçote parado para evitar queimaduras elétricas por arco voltaico</strong>;<br>
3. <strong>Manutenção da Faixa Terapêutica:</strong> Medir a temperatura a cada 1 minuto com termômetro infravermelho até atingir <strong>40°C a 42°C na superfície cutânea</strong>. Manter essa temperatura sustentada por 3 a 5 minutos por quadrante;<br>
4. <strong>RF Fracionada Microagulhada:</strong> Assepsia com clorexidina, acoplamento do cartucho estéril, disparo em grid com profundidade calibrada (0,5 mm a 2,5 mm) e descarte do cartucho no coletor Grupo E;<br>
5. <strong>Finalização:</strong> Limpar o gel e aplicar hidratante regenerador e protetor solar FPS 50+.</p>
`
  },

  // POP – BIOESTIMULAÇÃO DE COLÁGENO CORPORAL AVANÇADA (PLLA E CaHA HIPERDILUÍDO)
  {
    id: 'pop-bioestimulacao-corporal',
    title: 'POP – Bioestimulação de Colágeno Corporal Avançada (PLLA / Sculptra e Hidroxiapatita de Cálcio Hiperdiluída para Abdômen, Braços, Coxas e Colo)',
    category: 'POP',
    version: 'V 4.5 - ANVISA & Harmonização Corporal',
    lastModified: '2025-02-15',
    adaptationNotes: 'Hiperdiluição de CaHA (1:4 ou 1:6) e reconstituição de PLLA (16 a 20 ml por frasco), injeção em leque subdérmico com microcânula 18G/21G e massagem 5x5.',
    content: `
<h2>POP – BIOESTIMULAÇÃO DE COLÁGENO CORPORAL AVANÇADA</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-CORP-044 | <strong>Setor:</strong> Cabine de Harmonização Corporal</p>

<p><strong>1. OBJETIVO E INDICAÇÕES CLÍNICAS:</strong><br>
Padronizar o protocolo de <strong>Bioestimulação de Colágeno Corporal</strong> na <strong>{{nome_clinica}}</strong>, com foco no tratamento de flacidez tecidual moderada a severa (abdômen pós-parto / umbigo triste, região interna de braços / tchauzinho, face interna e anterior de coxas, colo e joelhos) e atenuação de estrias atróficas, através da indução de neocolagênese por micropartículas de PLLA ou CaHA hiperdiluído.</p>

<p><strong>2. MATERIAIS E DILUIÇÃO CORPORAL:</strong><br>
• Frascos de PLLA (reconstituídos com 16 a 20 ml de API + 2 a 4 ml de Lidocaína 2%) ou seringas de CaHA hiperdiluídas em proporções <strong>1:4 a 1:6</strong> com Soro Fisiológico 0,9% e Lidocaína;<br>
• Microcânulas estéreis 18G ou 21G de 70mm a 100mm e agulhas de pertuito;<br>
• Seringas de 10 ml e 20 ml Luer Lock com conectores de transferência fechada;<br>
• Campos cirúrgicos fenestrados e Clorexidina Alcoólica 0,5%;<br>
• Coletor rígido de perfurocortantes (Grupo E).</p>

<p><strong>3. TÉCNICA DE APLICAÇÃO CORPORAL:</strong><br>
1. <strong>Mapeamento em Pé:</strong> Demarcar os quadrantes em linhas vetoriais de 2x2 cm com o paciente em ortostase;<br>
2. <strong>Pertuito e Retroinjeção Subdérmica:</strong> Introduzir a microcânula no plano hipodérmico superficial (imediatamente abaixo da derme profunda) e injetar em leque suave, depositando de 0,5 a 1,0 ml por túnel linear;<br>
3. <strong>Massagem Imediata:</strong> Realizar massagem vigorosa em toda a área corporal tratada por 5 minutos contínuos;<br>
4. <strong>Conduta Pós:</strong> Orientar o paciente quanto à regra de massagem domiciliar (5 minutos, 5 vezes ao dia, por 5 dias).</p>
`
  },

  // POP – ELETROESTIMULAÇÃO MUSCULAR DE ALTA INTENSIDADE (HIFEM / CAMPO ELETROMAGNÉTICO)
  {
    id: 'pop-eletroestimulacao-hifem',
    title: 'POP – Eletroestimulação Muscular Eletromagnética de Alta Intensidade (HIFEM / CMSlim / Bodyter para Hipertrofia Glútea e Abdominal)',
    category: 'POP',
    version: 'V 4.0 - ANVISA & Fisiologia Muscular',
    lastModified: '2025-02-15',
    adaptationNotes: 'Estimulação de contrações musculares supramáximas (20.000 a 30.000 contrações por sessão de 30 min), faixas elásticas de fixação e contraindicações metálicas.',
    content: `
<h2>POP – ELETROESTIMULAÇÃO MUSCULAR ELETROMAGNÉTICA (HIFEM)</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-CORP-045 | <strong>Setor:</strong> Cabine de Tecnologias Corporais</p>

<p><strong>1. OBJETIVO:</strong><br>
Padronizar a aplicação de <strong>Tecnologia Eletromagnética Focada de Alta Intensidade (HIFEM)</strong> na <strong>{{nome_clinica}}</strong>, com o propósito de induzir contrações musculares supramáximas contínuas nos grupos musculares do abdômen, glúteos, coxas e braços, resultando em hipertrofia e hiperplasia das miofibrilas musculares e lipólise secundária.</p>

<p><strong>2. EQUIPAMENTO E PROTOCOLO DE FIXAÇÃO:</strong><br>
• Aparelho de Campo Eletromagnético de Alta Intensidade (HIFEM) calibrado com registro ANVISA;<br>
• Aplicadores / Placas magnéticas anatômicas corporais duplas com refrigeração interna;<br>
• Cintas elásticas largas de fixação ergonômica com velcro para estabilização segura dos aplicadores;<br>
• Álcool 70% para assepsia dos manípulos.</p>

<p><strong>3. CONTRAINDICAÇÕES MANDATÓRIAS (TRIAGEM):</strong><br>
• Portadores de marcapasso cardíaco, desfibriladores ou bombas de infusão implantadas;<br>
• Implantes metálicos (placas, parafusos, hastes de fixação ou DIU de cobre no abdômen/pelve);<br>
• Gestação ativa, epilepsia e hérnias abdominais no local de aplicação.</p>

<p><strong>4. SEQUÊNCIA TÉCNICA:</strong><br>
1. Posicionar o paciente na maca e fixar firmemente os aplicadores sobre o ventre muscular (glúteos ou abdômen) com a cinta elástica;<br>
2. Iniciar o ciclo em intensidade gradual de 20% a 30%, progredindo para 80% a 100% de intensidade de acordo com a tolerância muscular do paciente;<br>
3. Duração da sessão: <strong>30 minutos</strong> (protocolo padrão de 6 a 8 sessões com intervalo de 48 a 72 horas);<br>
4. Desinfecção dos aplicadores com álcool 70% ao término.</p>
`
  }
];

