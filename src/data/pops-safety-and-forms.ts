import { DocumentItem } from '../types';

export const POPS_SAFETY_AND_FORMS: DocumentItem[] = [
  // =========================================================================
  // 1. POP 01 – HIGIENIZAÇÃO DAS MÃOS, PARAMENTAÇÃO E USO DE EPIS
  // =========================================================================
  {
    id: 'pop-01-higienizacao-maos-epis',
    title: 'POP 01 – Higienização das Mãos, Sequência de Paramentação e Uso de EPIs na Estética',
    category: 'POP',
    stepCategory: '4. Biossegurança, CME e Rotinas Sanitárias',
    version: 'V 5.0 - ANVISA RDC 63/2011, RDC 42/2010 & NR-32',
    lastModified: '2025-02-24',
    isEssential: true,
    adaptationNotes: 'Técnica de higienização das mãos (água/sabão e fricção alcoólica a 70%), sequência de colocação e retirada de EPIs, política de adornos zero e imunização ocupacional.',
    content: `
<h2>POP 01 – HIGIENIZAÇÃO DAS MÃOS, PARAMENTAÇÃO E USO DE EPIs</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} - {{registro_conselho}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-BIO-01 | <strong>Setor:</strong> Recepção, Lavatórios e Cabines de Atendimento</p>

<p><strong>1. OBJETIVO:</strong><br>
Padronizar a higienização simples e antisséptica das mãos, o uso correto de Equipamentos de Proteção Individual (EPIs) e a sequência de paramentação/desparamentação na <strong>{{nome_clinica}}</strong>, prevenindo a transmissão cruzada de microrganismos e acidentes biológicos em procedimentos estéticos minimamente invasivos (RDC 63/2011, RDC 42/2010 e NR-32).</p>

<p><strong>2. POLÍTICA DE APRESENTAÇÃO PESSOAL E ADORNOS ZERO (NR-32.2.4.5):</strong><br>
• É <strong>proibido o uso de qualquer adorno</strong> durante o atendimento (anéis, alianças, pulseiras, relógios de pulso, correntes e brincos compridos);<br>
• Unhas devem ser mantidas curtas, limpas e sem esmaltes escuros descascados (vedado alongamentos em acrigel/fibra para procedimentos invasivos estéreis);<br>
• Cabelos 100% presos sob touca descartável e calçados totalmente fechados de material impermeável.</p>

<p><strong>3. TÉCNICA DE HIGIENIZAÇÃO DAS MÃOS:</strong><br>
<strong>3.1 Lavagem com Água e Sabonete Líquido Antisséptico (40 a 60 segundos):</strong><br>
1. Abrir a torneira (acionamento sem contato manual: pedal/cotovelo/sensor) e molhar as mãos;<br>
2. Aplicar sabonete líquido suficiente na palma da mão;<br>
3. Friccionar as palmas, dorso das mãos com dedos entrelaçados, espaços interdigitais, polegares e pontas dos dedos/unhas;<br>
4. Enxaguar abundantemente no sentido das pontas dos dedos para os punhos;<br>
5. Secar com papel toalha descartável virgem de celulose (2 folhas). Fechar a torneira usando o papel caso o acionamento seja manual.<br><br>
<strong>3.2 Fricção com Álcool a 70% (20 a 30 segundos):</strong><br>
Indicada quando as mãos não estiverem visivelmente sujas, antes do contato com o paciente, antes de calçar luvas e após a retirada das mesmas.</p>

<p><strong>4. SEQUÊNCIA DE PARAMENTAÇÃO (Antes do Procedimento):</strong><br>
1. Higienizar as mãos com água e sabonete ou álcool 70%;<br>
2. Vestir o Avental/Jaleco descartável de TNT (mínimo 30g/m²) ou impermeável de manga longa com punho de elástico;<br>
3. Colocar a Máscara descartável tripla com filtro bacteriológico (BFE ≥ 95%) ou PFF2/N95 ajustando o clipe nasal;<br>
4. Colocar os Óculos de proteção com vedação lateral ou Protetor Facial (Face Shield);<br>
5. Colocar a Touca descartável sanfonada cobrindo integralmente o couro cabeludo e orelhas;<br>
6. Calçar as Luvas de procedimento (nitrílicas ou látex com registro ANVISA) sobrepondo o punho do avental.</p>

<p><strong>5. SEQUÊNCIA DE DESPARAMENTAÇÃO (Após o Procedimento):</strong><br>
1. Retirar as luvas puxando pelo punho pelo avesso sem tocar na superfície externa contaminada, descartando no lixo biológico (Grupo A);<br>
2. Higienizar as mãos com álcool 70%;<br>
3. Retirar o avental desamarrando e enrolando pelo avesso (descarte no Grupo D ou A conforme sujidade);<br>
4. Retirar a touca e óculos de proteção (desinfetar os óculos com álcool 70%);<br>
5. Retirar a máscara pelos elásticos posteriores sem tocar na parte frontal;<br>
6. Lavar as mãos com água e sabonete antisséptico.</p>

<p><strong>6. REGISTRO SANITÁRIO E VACINAÇÃO:</strong><br>
Todos os profissionais mantêm cópia da Carteira de Vacinação atualizada (Hepatite B com teste Anti-HBs reagente, Tétano/Dupla Adulto e Influenza) na pasta de saúde ocupacional da clínica.</p>
`
  },

  // =========================================================================
  // 2. POP 02 – LIMPEZA E DESINFECÇÃO DE SUPERFÍCIES E AMBIENTES
  // =========================================================================
  {
    id: 'pop-02-limpeza-desinfeccao-superficies',
    title: 'POP 02 – Limpeza, Desinfecção de Superfícies, Macas e Ambientes Clínicos (Concorrente e Terminal)',
    category: 'POP',
    stepCategory: '4. Biossegurança, CME e Rotinas Sanitárias',
    version: 'V 5.0 - ANVISA RDC 63/2011 & Manual de Biossegurança',
    lastModified: '2025-02-24',
    isEssential: true,
    adaptationNotes: 'Rotina prática entre atendimentos (troca de lençol, desinfecção de macas e bancadas com álcool 70% ou quaternário) e limpeza terminal diária/semanal de pisos e lixeiras.',
    content: `
<h2>POP 02 – LIMPEZA E DESINFECÇÃO DE SUPERFÍCIES E AMBIENTES</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} - {{registro_conselho}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-LIM-02 | <strong>Setor:</strong> Todas as Cabines de Atendimento e DML</p>

<p><strong>1. OBJETIVO:</strong><br>
Padronizar a rotina de limpeza e desinfecção de superfícies fixas, mobiliários clínicos, macas e equipamentos da <strong>{{nome_clinica}}</strong>, diferenciando a limpeza concorrente (entre atendimentos) da limpeza terminal (diária/semanal) em conformidade com a RDC 63/2011 da ANVISA.</p>

<p><strong>2. PRODUTOS SANEANTES AUTORIZADOS PELA ANVISA:</strong><br>
• Álcool Etílico a 70% (p/v) líquido ou lenços desinfetantes hospitalares umedecidos;<br>
• Solução de Quaternário de Amônio de 5ª geração para superfícies laváveis e peças sensíveis;<br>
• Detergente neutro hospitalar e Hipoclorito de Sódio a 1% para sanitários e pisos do DML;<br>
• Rolos de lençol de papel descartável virgem de maca (100% celulose ou TNT gramatura 30g).</p>

<p><strong>3. LIMPEZA CONCORRENTE (ENTRE CADA PACIENTE):</strong><br>
1. <strong>Descarte do Lençol:</strong> Retirar o lençol de papel/TNT da maca enrolando pelo avesso e descartar no lixo;<br>
2. <strong>Fricção Desinfetante:</strong> Aplicar Álcool a 70% ou Quaternário de Amônio em toalha de celulose virgem e friccionar em sentido único (sem movimentos de vai-e-vem) em:<br>
   - Toda a extensão do estofado da maca clínica (revestimento impermeável lavável);<br>
   - Mocho do profissional e cadeira de apoio do paciente;<br>
   - Bancada de manipulação de materiais e carrinho auxiliar inox;<br>
   - Lupa de iluminação/foco e braços articulados;<br>
3. <strong>Tempo de Ação:</strong> Aguardar secagem espontânea por evaporação (mínimo 2 a 3 minutos);<br>
4. <strong>Reposição:</strong> Estender novo lençol de papel descartável cobrindo toda a extensão da maca imediatamente antes da entrada do próximo paciente.</p>

<p><strong>4. LIMPEZA TERMINAL (AO FINAL DO DIA E SEMANAL):</strong><br>
• <strong>Diária (Final do Expediente):</strong> Varrer úmido (com pano e rodo) e passar pano com água e detergente neutro seguido de solução desinfetante nos pisos das cabines; recolhimento final de todos os sacos de lixo fechados; higienização de pias e bancadas;<br>
• <strong>Semanal:</strong> Lavagem geral com água, detergente e desinfecção de paredes laváveis, portas, maçanetas, interruptores, armários fechados e lavagem completa das lixeiras com acionamento por pedal.</p>

<p><strong>5. REGISTRO E CONTROLE:</strong><br>
A execução da limpeza terminal diária e semanal é rubricada na <em>Planilha de Registro de Higienização e Limpeza de Ambientes</em> afixada na porta do DML.</p>
`
  },

  // =========================================================================
  // 3. POP 03 – ANTISSEPSIA DA PELE E TÉCNICA ASSÉPTICA PARA INJETÁVEIS
  // =========================================================================
  {
    id: 'pop-03-antissepsia-pele-tecnica-asseptica',
    title: 'POP 03 – Antissepsia da Pele do Paciente e Técnica Asséptica para Injetáveis e Minimamente Invasivos',
    category: 'POP',
    stepCategory: '4. Biossegurança, CME e Rotinas Sanitárias',
    version: 'V 5.0 - ANVISA RDC 63/2011 & Prática Segura em Injetáveis',
    lastModified: '2025-02-24',
    isEssential: true,
    adaptationNotes: 'Preparo da pele, higienização prévia sem resíduos oleosos, antissepsia com Clorexidina Alcoólica 0,5% ou Álcool 70%, tempo de secagem (30s), campo limpo e técnica de não-toque.',
    content: `
<h2>POP 03 – ANTISSEPSIA DA PELE E TÉCNICA ASSÉPTICA PARA INJETÁVEIS</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} - {{registro_conselho}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-ASS-03 | <strong>Setor:</strong> Cabines de Injetáveis e Procedimentos Minimamente Invasivos</p>

<p><strong>1. OBJETIVO:</strong><br>
Padronizar o preparo da pele do paciente, a escolha e aplicação de agentes antissépticos e a técnica asséptica rigorosa na <strong>{{nome_clinica}}</strong> antes de qualquer punção ou injeção (Toxina Botulínica, Preenchedores de Ácido Hialurônico, Bioestimuladores de Colágeno, Fios de PDO, Microagulhamento, PEIM e Intradermoterapia), prevenindo infecções cutâneas e biofilmes bacterianos.</p>

<p><strong>2. MATERIAIS E ANTISSÉPTICOS REGISTRADOS NA ANVISA:</strong><br>
• Solução de <strong>Clorexidina Alcoólica a 0,5%</strong> (antisséptico de primeira escolha para pele íntegra em procedimentos injetáveis);<br>
• Solução de <strong>Clorexidina Aquosa a 2%</strong> (indicada para áreas perioculares, lábios e pacientes com hipersensibilidade ao álcool);<br>
• Álcool Etílico a 70% injetável em ampolas ou frasco dosador com gaze estéril;<br>
• Pacotes de gaze estéril 7,5cm x 7,5cm;<br>
• Campos descartáveis estéreis ou toalhas descartáveis limpas para isolamento da área;<br>
• Solução micelar ou sabonete líquido neutro para desengorduramento prévio da pele.</p>

<p><strong>3. PROCEDIMENTO OPERACIONAL PASSO A PASSO:</strong><br>
<strong>3.1 Higienização Prévia e Desengorduramento:</strong><br>
1. Solicitar ou realizar a remoção completa de maquiagem, protetor solar e cosméticos com sabonete neutro e água ou solução micelar não oleosa;<br>
2. Secar a pele com toalha de celulose virgem descartável.<br><br>
<strong>3.2 Antissepsia Cutânea Estrita:</strong><br>
1. O profissional realiza a higienização das mãos e calça luvas de procedimento novas;<br>
2. Umedecer a gaze estéril com Clorexidina Alcoólica 0,5% ou Clorexidina Aquosa 2%;<br>
3. Friccionar firmemente a pele da região a ser tratada com <strong>movimentos concêntricos (do centro para a periferia) ou em sentido único descendente</strong>, nunca retornando a gaze para a área já limpa;<br>
4. Repetir o procedimento com nova gaze estéril por 2 a 3 vezes consecutivas;<br>
5. <strong>Tempo de Ação Obrigatório:</strong> Aguardar a secagem espontânea por no mínimo <strong>30 segundos</strong> para que o antisséptico exerça seu efeito bactericida residual completo.<br><br>
<strong>3.3 Manutenção da Técnica Asséptica Durante o Ato:</strong><br>
• Nunca soprar, abanar ou tocar na pele após a antissepsia sem luvas higienizadas;<br>
• Abrir as embalagens de seringas, agulhas e cânulas estéreis <strong>somente no momento imediato do uso</strong>, na frente do paciente;<br>
• Manter o conector luer-lock da seringa e a haste da agulha/cânula estéreis (técnica de não-toque);<br>
• Fazer antissepsia com álcool 70% na tampa de borracha de frascos-ampola multidose antes de aspirar o conteúdo.</p>

<p><strong>4. CUIDADOS PÓS-PUNÇÃO:</strong><br>
Ao término da injeção, realizar compressão leve dos pontos de entrada com gaze estéril seca ou embebida em soro fisiológico/clorexidina aquosa, evitando massagens com luvas contaminadas.</p>
`
  },

  // =========================================================================
  // 4. POP 04 – SEGREGAÇÃO E DESCARTE DE RESÍDUOS E PERFUROCORTANTES (PGRSS)
  // =========================================================================
  {
    id: 'pop-04-segregacao-descarte-perfurocortantes-pgrss',
    title: 'POP 04 – Segregação, Descarte Seguro de Perfurocortantes e Manejo de Resíduos de Serviços de Saúde (PGRSS)',
    category: 'POP',
    stepCategory: '4. Biossegurança, CME e Rotinas Sanitárias',
    version: 'V 5.0 - ANVISA RDC 222/2018 & NR-32',
    lastModified: '2025-02-24',
    isEssential: true,
    adaptationNotes: 'Descarte imediato no local de uso: Grupo E (caixa Descarpack amarela até 3/4 sem reencapar agulhas), Grupo A (saco branco leitoso), Grupo B (químicos) e Grupo D (comuns).',
    content: `
<h2>POP 04 – SEGREGAÇÃO E DESCARTE DE RESÍDUOS E PERFUROCORTANTES</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} - {{registro_conselho}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-RES-04 | <strong>Setor:</strong> Todas as Cabines, CME e Abrigo de Resíduos</p>

<p><strong>1. OBJETIVO:</strong><br>
Normatizar a correta segregação na fonte, acondicionamento, identificação, transporte interno e descarte de todos os resíduos gerados nos procedimentos estéticos da <strong>{{nome_clinica}}</strong>, com ênfase na prevenção de acidentes com perfurocortantes, cumprindo a RDC 222/2018 da ANVISA e a NR-32.</p>

<p><strong>2. CLASSIFICAÇÃO DOS RESÍDUOS E RECIPIENTES ADEQUADOS:</strong></p>
<table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-top: 8px;" border="1">
  <thead>
    <tr style="background-color: #f1f5f9;">
      <th style="padding: 6px; width: 18%;">Grupo / Risco</th>
      <th style="padding: 6px; width: 42%;">Exemplos de Materiais na Clínica</th>
      <th style="padding: 6px; width: 40%;">Recipiente Obrigatório e Limite</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 6px; font-weight: bold; color: #b45309;">GRUPO E<br>(Perfurocortantes)</td>
      <td style="padding: 6px;">Agulhas de toxina e preenchedores, cânulas, ampolas de vidro quebradas, lâminas de bisturi (dermaplaning), cartuchos de microagulhamento e dermarollers.</td>
      <td style="padding: 6px;"><strong>Caixa Coletora Rígida Amarela (Descarpack / NBR 13853)</strong> montada com saco plástico interno. <strong>Limite máximo de 3/4 (linha pontilhada)</strong>.</td>
    </tr>
    <tr>
      <td style="padding: 6px; font-weight: bold; color: #dc2626;">GRUPO A<br>(Infectantes / Biológicos)</td>
      <td style="padding: 6px;">Gazes, algodões e lençóis com presença de sangue ou secreções, luvas de procedimento usadas e seringas plásticas descartáveis sem agulha.</td>
      <td style="padding: 6px;">Lixeira com pedal e tampa, revestida com <strong>Saco Plástico Branco Leitoso Virgem</strong> com símbolo internacional de risco biológico. Limite máximo de 2/3.</td>
    </tr>
    <tr>
      <td style="padding: 6px; font-weight: bold; color: #4338ca;">GRUPO B<br>(Químicos)</td>
      <td style="padding: 6px;">Sobras de ácidos de peelings (glicólico, retinóico, salicílico), frascos de medicamentos e anestésicos vencidos ou rejeitados.</td>
      <td style="padding: 6px;">Frascos originais fechados em caixa plástica estanque identificada como "Resíduo Químico".</td>
    </tr>
    <tr>
      <td style="padding: 6px; font-weight: bold; color: #334155;">GRUPO D<br>(Comuns / Recicláveis)</td>
      <td style="padding: 6px;">Papéis de escritório, embalagens secundárias de caixas de produtos, copos descartáveis e papel toalha de secagem de mãos sem sangue.</td>
      <td style="padding: 6px;">Lixeira com pedal revestida com <strong>Saco Plástico Preto ou Azul</strong> de uso comum.</td>
    </tr>
  </tbody>
</table>

<p><strong>3. REGRAS CRÍTICAS DE SEGURANÇA COM PERFUROCORTANTES (NR-32):</strong><br>
• <strong>Proibição de Reencape:</strong> É <em>terminantemente proibido reencapar agulhas manualmente, desconectar agulhas da seringa com as mãos ou dobrar/entortar agulhas</em>;<br>
• O conjunto seringa-agulha deve ser descartado diretamente na abertura da caixa amarela imediatamente após a punção;<br>
• Ao atingir a linha limite de segurança (3/4), travar a tampa da caixa rígida amarela, fechar com as alças de lacre inviolável e transportar até o abrigo temporário segurando pelas alças superiores (nunca abraçar a caixa contra o corpo).</p>

<p><strong>4. COLETA EXTERNA E DESTINAÇÃO AMBIENTAL:</strong><br>
Os resíduos dos Grupos A e E são recolhidos por empresa especializada licenciada pelo órgão ambiental municipal/estadual, com emissão e arquivamento obrigatório do <strong>Manifesto de Transporte de Resíduos (MTR SINIR)</strong> por 5 anos.</p>
`
  },

  // =========================================================================
  // 5. POP 05 – POLÍTICA DE MATERIAIS 100% DESCARTÁVEIS (NÃO REAPROVEITÁVEIS) E DIRETRIZ PARA REUTILIZÁVEIS
  // =========================================================================
  {
    id: 'pop-05-materiais-descartaveis-sem-autoclave',
    title: 'POP 05 – Gestão de Materiais 100% Descartáveis (Uso Único Não Reaproveitável) e Diretriz para Reutilizáveis',
    category: 'POP',
    stepCategory: '4. Biossegurança, CME e Rotinas Sanitárias',
    version: 'V 5.0 - ANVISA RDC 63/2011 & RDC 15/2012',
    lastModified: '2025-02-24',
    isEssential: true,
    adaptationNotes: 'Declaração e rotina prática para clínica que opera exclusivamente com artigos 100% descartáveis e estéreis de uso único, dispensando autoclave interna, com informação normativa caso haja material reutilizável.',
    content: `
<h2>POP 05 – GESTÃO DE MATERIAIS 100% DESCARTÁVEIS E DIRETRIZ SANITÁRIA</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} - {{registro_conselho}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-MAT-05 | <strong>Setor:</strong> Cabines de Procedimento, Almoxarifado e Descarte</p>

<p><strong>1. DECLARAÇÃO OPERACIONAL INSTITUCIONAL (USO EXCLUSIVO DE MATERIAIS DESCARTÁVEIS):</strong><br>
A <strong>{{nome_clinica}}</strong> adota como diretriz prioritária de biossegurança a utilização <strong>100% EXCLUSIVA DE ARTIGOS ESTÉREIS, DESCARTÁVEIS E DE USO ÚNICO (NÃO REAPROVEITÁVEIS)</strong> em todos os seus procedimentos estéticos e minimamente invasivos (agulhas hipodérmicas, cânulas estéreis, seringas luer-lock, fios de sustentação/PDO, lâminas de bisturi de dermaplaning, cartuchos de microagulhamento, ponteiras, luvas de procedimento, gazes, campos e lençóis descartáveis), <strong>dispensando a necessidade de autoclave e central de esterilização complexa no estabelecimento</strong>.</p>

<p><strong>2. FLUXO OPERACIONAL DE MATERIAIS NÃO REAPROVEITÁVEIS:</strong><br>
• <strong>Abertura no Momento do Uso:</strong> Todas as embalagens estéreis individuais são inspecionadas quanto à integridade do lacre, validade e abertas estritamente na frente do paciente no momento imediato do procedimento;<br>
• <strong>Descarte Imediato no Ponto de Geração:</strong> Concluído o ato clínico, todos os artigos descartáveis são descartados instantaneamente em seus respectivos recipientes:<br>
  - <em>Perfurocortantes (agulhas, cânulas, lâminas, ampolas):</em> Descarte direto na Caixa Coletora Rígida Amarela (Grupo E);<br>
  - <em>Infectantes e contaminados com sangue (gazes, luvas, seringas plásticas sem agulha):</em> Lixeira com saco branco leitoso (Grupo A);<br>
• <strong>Proibição Estrita:</strong> É terminantemente proibido reencapar agulhas, reesterilizar, reprocessar ou reutilizar qualquer artigo descartável ou perfurocortante sob qualquer pretexto.</p>

<p><strong>3. DIRETRIZ SANITÁRIA SIMPLES EM CASO DE EVENTUAL USO DE MATERIAL REUTILIZÁVEL (RDC 15/2012):</strong><br>
Caso a clínica venha a introduzir eventualmente algum instrumental metálico ou artigo reutilizável semicrítico/crítico (ex: pinças metálicas de extração, curetas ou cubas inox), o estabelecimento cumprirá a exigência mínima da Vigilância Sanitária optando por uma das duas vias normativas abaixo:<br>
• <strong>Via A (Esterilização em Autoclave Própria):</strong> Lavagem prévia com detergente multienzimático por 5 a 10 min, enxágue em água corrente, secagem completa, embalagem em Papel Grau Cirúrgico com selagem térmica de 10mm e esterilização em autoclave a vapor saturado (121°C a 134°C) com monitoramento por indicador químico em cada pacote e teste biológico semanal com <em>Geobacillus stearothermophilus</em> registrado em caderno próprio;<br>
• <strong>Via B (Empresa Terceirizada Licenciada - CME Externa):</strong> Encaminhamento do lote de instrumentais para empresa reprocessadora e esterilizadora especializada devidamente licenciada pelo órgão sanitário, mantendo arquivados os laudos e comprovantes de esterilização na clínica.</p>

<p><strong>4. INFORMAÇÃO RESUMIDA PARA A FISCALIZAÇÃO SANITÁRIA:</strong><br>
<em>"O estabelecimento {{nome_clinica}} opera sua rotina assistencial com materiais 100% descartáveis e de uso único adquiridos estéreis de fabricantes com registro ativo na ANVISA, não realizando reprocessamento químico ou térmico no local."</em></p>
`
  },

  // =========================================================================
  // 6. POP 06 – GELADEIRA DE TERMOLÁBEIS (2°C A 8°C) E VALIDADE PEPS
  // =========================================================================
  {
    id: 'pop-06-geladeira-termolabeis-validade-peps',
    title: 'POP 06 – Monitoramento de Temperatura da Geladeira de Termolábeis (+2°C a +8°C) e Validade PEPS',
    category: 'POP',
    stepCategory: '4. Biossegurança, CME e Rotinas Sanitárias',
    version: 'V 5.0 - ANVISA RDC 430/2020 & RDC 63/2011',
    lastModified: '2025-02-24',
    isEssential: true,
    adaptationNotes: 'Controle de cadeia de frio (+2°C a +8°C) para toxina botulínica e termolábeis, leitura 2x/dia de máxima/mínima, regra PEPS (FIFO) e contingência simples para queda de energia.',
    content: `
<h2>POP 06 – CONTROLE DE TERMOLÁBEIS (+2°C A +8°C) E VALIDADE PEPS</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} - {{registro_conselho}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-FARM-06 | <strong>Setor:</strong> Geladeira de Insumos e Armazenamento Farmacêutico</p>

<p><strong>1. OBJETIVO:</strong><br>
Garantir a preservação da estabilidade físico-química e atividade biológica de medicamentos, toxinas e cosméticos termolábeis na <strong>{{nome_clinica}}</strong> através da manutenção estrita da faixa de temperatura de <strong>+2°C a +8°C</strong>, além de normatizar a rotina de controle de validade pelo sistema <strong>PEPS (Primeiro que Expira, Primeiro que Sai)</strong>.</p>

<p><strong>2. DIRETRIZES DE USO DA GELADEIRA DE MEDICAMENTOS:</strong><br>
• O refrigerador é de <strong>uso estritamente exclusivo para medicamentos e cosméticos clínicos</strong> (Toxina Botulínica, Hialuronidase, Fatores de Crescimento, Enzimas e Soluções estéreis);<br>
• É <strong>proibido guardar alimentos, bebidas ou materiais biológicos de descarte</strong> no mesmo refrigerador;<br>
• Não armazenar frascos na porta da geladeira (área de maior oscilação térmica) nem encostados na parede do fundo (risco de congelamento acidental);<br>
• O refrigerador deve contar com termômetro digital calibrado com cabo extensor e sensor imerso no centro da câmara interna.</p>

<p><strong>3. ROTINA DIÁRIA DE LEITURA E REGISTRO:</strong><br>
1. A leitura da temperatura é realizada obrigatoriamente <strong>2 (duas) vezes ao dia</strong>: no início da jornada (08h00) e no encerramento das atividades (18h00);<br>
2. O profissional confere e anota na <em>Planilha de Controle Diário de Temperatura da Geladeira</em>: <strong>Temperatura Atual/Momento, Temperatura Mínima e Temperatura Máxima registradas no período</strong>, acompanhado de sua rubrica;<br>
3. Após a anotação, pressionar o botão 'Reset / Clear' do termômetro para iniciar nova contagem de extremos para o próximo turno.</p>

<p><strong>4. CONTROLE DE VALIDADE E ROTINAS PEPS / FIFO:</strong><br>
• <strong>Regra PEPS:</strong> Ao receber novos lotes de medicamentos, posicionar os frascos com vencimento mais próximo à frente na prateleira para uso prioritário;<br>
• <strong>Rotulagem de Frasco Reconstituído:</strong> Frascos de toxina botulínica ou produtos multidose abertos devem receber etiqueta com: <em>Data e Hora de Reconstituição, Diluente Utilizado, Data Limite de Uso pós-abertura (conforme bula) e Rubrica do RT</em>.</p>

<p><strong>5. PLANO SIMPLES DE CONTINGÊNCIA PARA QUEDA DE ENERGIA ELÉTRICA:</strong><br>
1. <strong>Interrupção de até 2 a 4 horas:</strong> Manter a porta do refrigerador lacrada e fechada (o isolamento térmico preserva a temperatura segura);<br>
2. <strong>Interrupção superior a 2 horas:</strong><br>
   - Preparar a <strong>Caixa Térmica de Emergência</strong> com gelox rígido previamente climatizado a 2°C-8°C;<br>
   - Inserir placa de papelão ou plástico bolha entre o gelox e os medicamentos para evitar contato direto que possa congelar os frascos;<br>
   - Transferir os termolábeis, inserir o sensor do termômetro digital dentro da caixa e manter lacrada até o restabelecimento da energia elétrica.</p>
`
  },

  // =========================================================================
  // 7. POP 07 – ATENDIMENTO A URGÊNCIAS, SÍNCOPE E SAMU 192
  // =========================================================================
  {
    id: 'pop-07-urgencias-emergencias-samu',
    title: 'POP 07 – Atendimento a Urgências, Síncope, Resgate Vascular e Acionamento do SAMU 192',
    category: 'POP',
    stepCategory: '4. Biossegurança, CME e Rotinas Sanitárias',
    version: 'V 5.0 - Portaria MS 2048/2002 & Boas Práticas Clínicas',
    lastModified: '2025-02-24',
    isEssential: true,
    adaptationNotes: 'Fluxo objetivo de primeiro atendimento: síncope/desmaio (Trendelenburg), suspeita de reação anafilática e acionamento imediato do SAMU 192, resgate vascular com hialuronidase e maleta de primeiros socorros.',
    content: `
<h2>POP 07 – ATENDIMENTO A URGÊNCIAS, RESGATE VASCULAR E SAMU 192</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} - {{registro_conselho}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-URG-07 | <strong>Setor:</strong> Todas as Cabines de Procedimento</p>

<p><strong>1. OBJETIVO:</strong><br>
Normatizar as condutas imediatas de primeiros socorros, estabilização clínica e acionamento de suporte avançado para intercorrências na <strong>{{nome_clinica}}</strong> (síncope vasovagal, hipoglicemia, crise hipertensiva, suspeita de reação alérgica/anafilaxia aguda e isquemia/oclusão vascular por preenchedores).</p>

<p><strong>2. DISPOSITIVOS E MATERIAIS DE PRIMEIROS SOCORROS DISPONÍVEIS:</strong><br>
• Maleta de Primeiros Socorros contendo: Esfigmomanômetro calibrado, Estetoscópio, Oxímetro de pulso digital, Glicosímetro com tiras reagentes, Bolsas térmicas instantâneas (quente e fria), Ampolas de Soro Fisiológico 0,9% estéril e compressas de gaze;<br>
• <strong>Kit de Resgate Vascular:</strong> Ampolas de Hialuronidase (1500 a 3000 UTR), diluente e agulhas 30G sempre prontas e acessíveis;<br>
• Maca clínica que permite colocação rápida na <strong>Posição de Trendelenburg</strong> (elevação de membros inferiores a 45°);<br>
• Cartaz com telefones de emergência afixado visivelmente em todas as salas: <strong>SAMU 192 | Bombeiros 193</strong>.</p>

<p><strong>3. ALGORITMOS DE CONDUTA POR TIPO DE INTERCORRÊNCIA:</strong><br>
<strong>3.1 Síncope Vasovagal / Lipotimia (Queda de Pressão / Desmaio):</strong><br>
1. Interromper o procedimento estético imediatamente;<br>
2. Posicionar o paciente em decúbito dorsal e elevar as pernas a 45° (Posição de Trendelenburg) para favorecer o retorno venoso cerebral;<br>
3. Afrouxar roupas apertadas e garantir circulação de ar na cabine;<br>
4. Aferir e monitorar a Saturação de Oxigênio (SpO₂), Pressão Arterial e Frequência Cardíaca;<br>
5. Oferecer água ou sachê de carboidrato apenas após a recuperação total da consciência e reflexo de deglutição.<br><br>
<strong>3.2 Suspeita de Reação Anafilática Aguda (Edema de Lábios/Glote, Dispneia, Urticária Gigante):</strong><br>
1. Interromper imediatamente qualquer aplicação ou contato com cosméticos/medicamentos;<br>
2. Manter as vias aéreas livres e posicionar o paciente sentado ou semi-sentado (se houver desconforto respiratório);<br>
3. <strong>Acionar imediatamente o SAMU (Disque 192)</strong> informando: <em>"Paciente em clínica de estética apresentando reação anafilática aguda com dificuldade respiratória"</em>, fornecendo endereço exato e ponto de referência;<br>
4. Manter monitoramento contínuo da oxigenação e sinais vitais até a chegada da equipe de socorro médico.<br><br>
<strong>3.3 Isquemia / Oclusão Vascular por Preenchimento com Ácido Hialurônico:</strong><br>
1. Cessar a injeção imediatamente ao identificar palidez cutânea súbita (<em>blanching</em>), livedo reticular ou dor desproporcional;<br>
2. Aplicar imediatamente o <strong>Protocolo de Infiltração em Alta Dosagem de Hialuronidase (500 a 1500 UTR por área)</strong> no plano de injeção e margens adjacentes;<br>
3. Realizar massagem mecânica vigorosa e aplicar compressas mornas para estimular vasodilatação;</p>
`
  },

  // =========================================================================
  // 8. POP 08 – ACIDENTE COM PERFUROCORTANTES E MATERIAL BIOLÓGICO (NR-32 & PEP)
  // =========================================================================
  {
    id: 'pop-08-acidente-perfurocortante-nr32-pep',
    title: 'POP 08 – Conduta em Caso de Acidente com Perfurocortante e Exposição a Material Biológico (NR-32 & PEP)',
    category: 'POP',
    stepCategory: '4. Biossegurança, CME e Rotinas Sanitárias',
    version: 'V 5.0 - NR-32 & Protocolo PEP Ministério da Saúde',
    lastModified: '2025-02-24',
    isEssential: true,
    adaptationNotes: 'Cuidados locais imediatos com o ferimento (lavagem exaustiva sem espremer), consentimento da fonte, encaminhamento para PEP em até 2 horas e emissão de CAT.',
    content: `
<h2>POP 08 – CONDUTA EM ACIDENTE COM MATERIAL BIOLÓGICO (NR-32 & PEP)</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} - {{registro_conselho}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-ACI-08 | <strong>Setor:</strong> CME, Cabines de Procedimento e Expurgo</p>

<p><strong>1. OBJETIVO:</strong><br>
Estabelecer o fluxo de socorro imediato, notificação e encaminhamento médico em caso de acidentes ocupacionais com exposição a material biológico (perfuração com agulhas, cânulas, lâminas de bisturi ou respingo de sangue em mucosa) sofrido por profissionais da <strong>{{nome_clinica}}</strong>, em conformidade com a Norma Regulamentadora NR-32 e o Protocolo de Profilaxia Pós-Exposição (PEP) do Ministério da Saúde.</p>

<p><strong>2. CUIDADOS LOCAIS IMEDIATOS APÓS O ACIDENTE:</strong><br>
• <strong>Em caso de Perfuração ou Corte na Pele:</strong><br>
  1. Lavar imediatamente a área atingida de forma exaustiva com <strong>água corrente e sabonete neutro ou antisséptico</strong>;<br>
  2. <em>É estritamente proibido espremer o local do corte, sugar a lesão ou aplicar substâncias corrosivas (éter, álcool puro ou hipoclorito)</em>, condutas que causam microlesões e aumentam o risco de absorção viral;<br>
• <strong>Em caso de Respingos em Mucosas (Olhos ou Boca):</strong><br>
  1. Lavar com Soro Fisiológico 0,9% estéril ou água corrente em abundância por no mínimo 15 minutos.</p>

<p><strong>3. MANEJO DO PACIENTE-FONTE E TESTAGEM:</strong><br>
1. Comunicar o paciente atendido no momento do acidente de forma ética e profissional;<br>
2. Solicitar sua autorização para realização de testes rápidos para <strong>HIV, Hepatite B (HBsAg) e Hepatite C (Anti-HCV)</strong>.</p>

<p><strong>4. FLUXO DE ENCAMINHAMENTO PARA PROFILAXIA PÓS-EXPOSIÇÃO (PEP):</strong><br>
• O colaborador deve ser conduzido imediatamente ao <strong>Centro de Testagem e Aconselhamento (CTA) / Pronto-Socorro de Doenças Infecciosas Municipal</strong> de referência mais próximo:<br>
  <span style="color:#0284c7;"><em>[EDITÁVEL: Hospital Municipal de Referência / CTA de Referência Local - Endereço e Telefone]</em></span>;<br>
• <strong>Janela Crítica de Ouro:</strong> A medicação antirretroviral preventiva (PEP) deve ser iniciada preferencialmente <strong>nas primeiras 2 (duas) horas após o acidente</strong>, com prazo limite tolerado de até 72 horas;<br>
• Coleta de sangue do profissional acidentado para sorologias basais de acompanhamento (tempo zero, 6 semanas, 3 meses e 6 meses).</p>

<p><strong>5. REGISTRO E EMISSÃO DE CAT (NR-32):</strong><br>
Emissão obrigatória da <strong>Comunicação de Acidente de Trabalho (CAT)</strong> perante o INSS em até 24 horas e arquivamento do laudo médico no prontuário de saúde ocupacional da clínica por 20 anos.</p>
`
  },

  // =========================================================================
  // 9. POP 09 – LIMPEZA E DESINFECÇÃO DE EQUIPAMENTOS ELETROESTÉTICOS
  // =========================================================================
  {
    id: 'pop-09-limpeza-equipamentos-eletroesteticos',
    title: 'POP 09 – Limpeza, Assepsia e Desinfecção de Equipamentos Eletroestéticos e Manoplas',
    category: 'POP',
    stepCategory: '4. Biossegurança, CME e Rotinas Sanitárias',
    version: 'V 5.0 - ANVISA RDC 63/2011 & Segurança de Equipamentos',
    lastModified: '2025-02-24',
    isEssential: true,
    adaptationNotes: 'Desinfecção de manoplas de ultrassom, radiofrequência, laser, luz pulsada, eletrodos de alta frequência, peeling de diamante, uso de filme descartável e manutenção preventiva.',
    content: `
<h2>POP 09 – LIMPEZA E ASSEPSIA DE EQUIPAMENTOS ELETROESTÉTICOS</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} - {{registro_conselho}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-EQ-09 | <strong>Setor:</strong> Cabines de Eletroterapia e Tecnologias Estéticas</p>

<p><strong>1. OBJETIVO:</strong><br>
Normatizar a rotina de limpeza, assepsia concorrente (entre atendimentos) e manutenção periódica dos cabeçotes, manoplas, ponteiras e transdutores de equipamentos eletromédicos e estéticos da <strong>{{nome_clinica}}</strong> (Radiofrequência, Ultrassom Microfocado, Criolipólise, Alta Frequência, Peeling de Diamante, Jato de Plasma e Lasers), garantindo integridade técnica e biossegurança.</p>

<p><strong>2. PRODUTOS SANEANTES E MATERIAIS:</strong><br>
• Álcool Etílico a 70% líquido e lenços hospitalares desinfetantes de Quaternário de Amônio de 5ª geração;<br>
• Filme plástico descartável de PVC grau clínico (para barreira de proteção de manoplas e cabos);<br>
• Solução de detergente enzimático e escova de cerdas de nylon para ponteiras mecânicas;<br>
• Toalhas descartáveis de celulose macia virgem e gazes estéreis.</p>

<p><strong>3. PROCEDIMENTO POR TIPO DE ACESSÓRIO:</strong><br>
<strong>3.1 Manoplas de Ultrassom, Radiofrequência e Criolipólise:</strong><br>
1. Remover imediatamente 100% do gel condutor neutro ou glicerina com papel toalha macio;<br>
2. Friccionar gaze embebida em Álcool 70% ou lenço desinfetante por toda a superfície metálica e corpo da manopla por no mínimo 30 segundos;<br>
3. Não submergir manoplas em líquidos nem utilizar produtos abrasivos que danifiquem borrachas de vedação ou cristais piezoelétricos;<br>
4. Encapar manoplas de contato prolongado com novo filme plástico descartável antes de cada cliente.<br><br>
<strong>3.2 Eletrodos de Vidro de Alta Frequência:</strong><br>
1. Desconectar o eletrodo da caneta aplicadora com o aparelho desligado da tomada;<br>
2. Friccionar gaze com Álcool 70% em todo o bulbo e tubo de vidro;<br>
3. <em>Atenção:</em> Nunca molhar o pino de contato metálico para evitar corrosão do soquete elétrico interno;<br>
4. Guardar os eletrodos em estojo acolchoado protegido contra quedas.<br><br>
<strong>3.3 Ponteiras de Peeling de Diamante e Ventosas de Sucção:</strong><br>
1. Desacoplar a ponteira diamantada, imergir em solução enzimática por 5 minutos e escovar suavemente com escovinha macia sob água corrente para desincrustar células mortas;<br>
2. Secar e friccionar com Álcool 70% (ou autoclavar em papel grau cirúrgico quando indicado);<br>
3. Substituir o filtro de espuma/algodão interno da caneta a cada paciente.</p>

<p><strong>4. MANUTENÇÃO PREVENTIVA E ETIQUETAGEM:</strong><br>
Todos os aparelhos possuem registro ativo na ANVISA, laudo de calibração anual por engenharia clínica e etiqueta adesiva visível indicando a data da última calibração e a data do próximo vencimento.</p>
`
  },

  // =========================================================================
  // 10. POP 10 – ACOLHIMENTO, TRIAGEM E TIME-OUT DE SEGURANÇA DO PACIENTE
  // =========================================================================
  {
    id: 'pop-10-acolhimento-triagem-seguranca-paciente',
    title: 'POP 10 – Acolhimento, Triagem Clínica, Identificação Segura e Checklist Time-Out',
    category: 'POP',
    stepCategory: '4. Biossegurança, CME e Rotinas Sanitárias',
    version: 'V 5.0 - ANVISA RDC 36/2013 & RDC 63/2011',
    lastModified: '2025-02-24',
    isEssential: true,
    adaptationNotes: 'Dupla identificação ativa (nome e data de nascimento), conferência de anamnese/contraindicações, conferência de TCLE, checklist Time-Out de 1 minuto na cabine e orientações pós-procedimento.',
    content: `
<h2>POP 10 – ACOLHIMENTO, TRIAGEM E TIME-OUT DE SEGURANÇA</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} - {{registro_conselho}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-TRIAG-10 | <strong>Setor:</strong> Recepção e Cabines de Atendimento</p>

<p><strong>1. OBJETIVO:</strong><br>
Estabelecer o protocolo de acolhimento, dupla identificação ativa do paciente, revisão criteriosa de anamnese, verificação de consentimento informado (TCLE) e execução do <strong>Checklist Time-Out de Segurança</strong> antes de qualquer intervenção estética na <strong>{{nome_clinica}}</strong>, em conformidade com as Metas Internacionais de Segurança do Paciente e a RDC 36/2013 da ANVISA.</p>

<p><strong>2. FLUXO OPERACIONAL NA RECEPÇÃO E TRIAGEM INICIAL:</strong><br>
1. Acolher cordialmente o paciente e confirmar seus dados cadastrais completos;<br>
2. Coletar assinatura no <em>Termo de Consentimento LGPD (Lei 13.709/2018)</em> e Autorização de Uso de Imagem;<br>
3. Entregar a Ficha de Anamnese orientando o preenchimento detalhado de histórico de saúde, alergias medicamentosas, uso de anticoagulantes, doenças autoimunes, gestação/lactação e procedimentos prévios.</p>

<p><strong>3. AVALIAÇÃO CLÍNICA E CONSENTIMENTO INFORMADO NA CABINE:</strong><br>
1. Conduzir o paciente à cabine individual e revisar verbalmente as respostas da anamnese;<br>
2. Realizar o exame físico dermatológico e avaliar as indicações e contraindicações locais (lesões ativas, herpes, acne inflamatória grave);<br>
3. Explicar detalhadamente o plano de tratamento proposto, os efeitos esperados, as limitações biológicas individuais (obrigação de meio) e os possíveis efeitos colaterais comuns (edema, eritema, equimose transitória);<br>
4. Colher a assinatura formal e sem rasuras no <strong>Termo de Consentimento Livre e Esclarecido (TCLE)</strong> específico do procedimento antes de abrir materiais ou iniciar qualquer ato físico;<br>
5. Realizar o registro fotográfico padronizado de "Antes" em fundo neutro e iluminação constante.</p>

<p><strong>4. CHECKLIST TIME-OUT DE 1 MINUTO (IMEDIATAMENTE ANTES DA PUNÇÃO/APLICAÇÃO):</strong><br>
O profissional faz uma pausa de segurança verbal e checa mentalmente:<br>
☐ <strong>Paciente Certo:</strong> Confirmado verbalmente Nome Completo e Data de Nascimento?<br>
☐ <strong>Procedimento e Localização Certos:</strong> Área de aplicação demarcada e acordada com o paciente?<br>
☐ <strong>Termo Assinado:</strong> TCLE rubricado e assinado sem pendências?<br>
☐ <strong>Produto e Lote Certos:</strong> Registro ANVISA válido, lote conferido e validade dentro do prazo verificado na presença do paciente?<br>
☐ <strong>Material de Resgate:</strong> Maleta de urgência e Hialuronidase disponíveis na clínica (para procedimentos com Ácido Hialurônico)?</p>

<p><strong>5. FINALIZAÇÃO E PÓS-PROCEDIMENTO:</strong><br>
• Entrega do Manual de Orientações Pós-Procedimento por escrito ao paciente;<br>
• Colagem das etiquetas destacáveis de lote/rastreabilidade do produto diretamente no prontuário físico/digital;<br>
• Agendamento da consulta de revisão e acompanhamento da evolução clínica.</p>
`
  }
];
