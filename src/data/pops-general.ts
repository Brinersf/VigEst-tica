import { DocumentItem } from '../types';

export const POPS_GENERAL: DocumentItem[] = [
  // MANUAL DE BOAS PRÁTICAS MESTRE (ANVISA & JURÍDICO)
  {
    id: 'manual-boas-praticas-master',
    title: 'MANUAL DE BOAS PRÁTICAS - SERVIÇOS DE ESTÉTICA',
    category: 'Manual',
    stepCategory: '1. Documentos Base e ANVISA',
    version: 'V 5.0 - Padrão ANVISA & VISA Municipal',
    lastModified: '2025-02-19',
    isEssential: true,
    adaptationNotes: 'Manual de Boas Práticas para Serviços de Estética Avançada e Procedimentos Minimamente Invasivos. Normatizado conforme RDC ANVISA nº 63/2011, RDC 306/2004, RDC 222/2018, Lei Federal 13.643/2018, Manual de Biossegurança ANVISA 2022 e Código Sanitário Municipal SP Lei 13.725/2004.',
    content: `
<h2>MANUAL DE BOAS PRÁTICAS - SERVIÇOS DE ESTÉTICA</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>CNES:</strong> {{cnes}}<br>
<strong>Endereço:</strong> {{endereco}}<br>
<strong>Responsável Técnico(a):</strong> {{responsavel_tecnico}} - {{registro_conselho}} &bull; <strong>Data/Vigência:</strong> {{data}}</p>

<p><strong>1. OBJETIVO E ABRANGÊNCIA:</strong><br>
Este Manual estabelece os procedimentos de Boas Práticas para garantir a segurança sanitária, a qualidade e a biossegurança nos serviços prestados pela <strong>{{nome_clinica}}</strong>. Aplica-se a todos os profissionais, procedimentos estéticos faciais, corporais e capilares, bem como ao manejo de produtos, equipamentos e resíduos, em conformidade com a RDC ANVISA nº 63/2011, RDC 306/2004 e legislações municipais da Vigilância Sanitária.<br>
<span style="color:#0284c7;"><em>[EDITÁVEL: inserir escopo específico de procedimentos autorizados: Toxina Botulínica, Preenchimento Dérmico e Supraperiosteal com Ácido Hialurônico, Bioestimuladores de Colágeno, Fios de PDO/Sustentação, Intradermoterapia / Enzimas, Microagulhamento, PEIM, Peelings Químicos, Lasers e Tecnologias Eletromédicas]</em></span></p>

<p><strong>2. REFERÊNCIAS LEGAIS E NORMATIVAS:</strong><br>
• <strong>RDC ANVISA nº 63/2011</strong> - Requisitos de Boas Práticas para Serviços de Saúde;<br>
• <strong>RDC ANVISA nº 306/2004 e CONAMA 358/2005</strong> - Gerenciamento de Resíduos;<br>
• <strong>RDC ANVISA nº 222/2018</strong> - Boas Práticas de Gerenciamento de Resíduos de Serviços de Saúde (PGRSS);<br>
• <strong>Lei Federal nº 13.643/2018</strong> - Regulamentação da Profissão e Serviços de Estética;<br>
• <strong>Manual de Biossegurança para Serviços de Estética</strong> - ANVISA 2022;<br>
• <strong>Código Sanitário Municipal de São Paulo</strong> - Lei Municipal nº 13.725/2004.</p>

<p><strong>3. RESPONSABILIDADES:</strong><br>
• <strong>Responsável Técnico (RT) - {{responsavel_tecnico}} - {{registro_conselho}}:</strong> Responsável por implementar, treinar e supervisionar o cumprimento deste manual, manter documentação atualizada e responder perante a Vigilância Sanitária;<br>
• <strong>Proprietário / Gestor:</strong> Prover recursos, EPIs certificados, manutenção periódica e calibração de equipamentos e contratação de empresa licenciada para coleta de resíduos;<br>
• <strong>Profissionais Executantes:</strong> Cumprir rigorosamente os POPs, registrar intercorrências e lotes em prontuário, manter asseio pessoal estrito e vacinação atualizada.<br>
<span style="color:#0284c7;"><em>[EDITÁVEL: listar nomes e conselhos de classe dos profissionais executantes da clínica]</em></span></p>

<!-- PAGE_BREAK -->

<p><strong>4. ESTRUTURA FÍSICA E AMBIENTAL:</strong><br>
A clínica possui sede em <strong>{{endereco}}</strong>, com área total de <span style="color:#0284c7;"><em>[EDITÁVEL: 85m²]</em></span>, dividida em: Recepção (12m²), 2 salas de procedimento com lavatório de mãos com acionamento sem contato (sensor/cotovelo/pedal), DML (Depósito de Material de Limpeza), abrigo temporário de resíduos Grupo A e E, e vestiário de funcionários. Piso em porcelanato claro e lavável, paredes laváveis até 2m, iluminação de 500 lux, climatização 22-24°C com PMOC registrado conforme Lei 13.589/2018. Laudo de potabilidade e dedetização trimestral anexos.</p>

<p><strong>5. RECURSOS HUMANOS E CONTROLE DE SAÚDE:</strong><br>
Todos os profissionais apresentam: Carteira de vacinação (Hepatite B, Dupla adulto / dT, COVID-19), atestado de saúde ocupacional anual (ASO) conforme NR-7, comprovação de qualificação técnica. Procedimento de afastamento em caso de lesões em mãos, síndrome gripal ou conjuntivite. Uniforme claro, calçado fechado impermeável, unhas curtas sem esmalte, cabelos presos sob touca descartável.</p>

<p><strong>6. HIGIENIZAÇÃO DE MÃOS E USO DE EPI:</strong><br>
• <strong>POP 01 - Higienização de Mãos:</strong> Antes e após cada cliente, após remoção de luvas, após contato com resíduos. Técnica ANVISA com água e sabonete líquido antisséptico por 40-60s ou álcool 70% por 20-30s;<br>
• <strong>EPI Obrigatório:</strong> Luvas de procedimento, máscara cirúrgica tripla descartável com filtro, touca descartável, jaleco de manga longa (TNT mínimo 30g/m²), óculos de proteção para procedimentos com respingos ou luz intensa pulsada/laser. Troca obrigatória a cada cliente.</p>

<p><strong>7. HIGIENIZAÇÃO DE AMBIENTE, MÓVEIS E SUPERFÍCIES:</strong><br>
• <strong>Limpeza Concorrente após cada atendimento:</strong> Remoção de sujidade com água e detergente neutro, desinfecção com quaternário de amônio 0,5% ou hipoclorito 1% (ou álcool 70%). Macas com lençol descartável TNT 30g, trocado integralmente a cada cliente;<br>
• <strong>Limpeza Terminal diária e semanal:</strong> Higienização completa com registro obrigatório em planilha datada e assinada.</p>

<!-- PAGE_BREAK -->

<p><strong>8. DIRETRIZ DE MATERIAIS E PROCESSAMENTO DE ARTIGOS:</strong><br>
• <strong>Política Institucional de Uso 100% Descartável:</strong> A clínica opera exclusivamente com artigos estéreis, descartáveis e de uso único (agulhas, cânulas, seringas, lâminas de bisturi, fios e cartuchos), com descarte imediato no ponto de geração (Grupo E perfurocortantes e Grupo A infectantes), <strong>dispensando a necessidade de autoclave na rotina do estabelecimento</strong>;<br>
• <strong>Informação Normativa em Caso de Material Reutilizável (RDC 15/2012):</strong> Caso venha a ser utilizado algum instrumental metálico semicrítico/crítico reutilizável, o mesmo seguirá rigorosamente o fluxo de lavagem com detergente enzimático e esterilização em autoclave com monitoramento químico/biológico semanal ou envio para CME terceirizada devidamente licenciada pela Vigilância Sanitária.</p>

<p><strong>9. MANEJO DE PRODUTOS E COSMÉTICOS:</strong><br>
• Todos os cosméticos e medicamentos com registro ANVISA válido, dentro da validade, armazenados em local seco &lt;25°C, longe da luz (medicamentos termolábeis entre +2°C e +8°C sob controle de termohigrômetro digital);<br>
• Ficha de cada produto com lote, validade e FISPQ;<br>
• Proibido fracionamento sem rótulo com nome, validade, lote e responsável técnico;<br>
• Controle FIFO (primeiro que vence, primeiro que sai);<br>
• Produtos para peeling químico armazenados em armário trancado com acesso restrito à RT.</p>

<p><strong>10. CONTROLE DE PRAGAS, ÁGUA E CLIMATIZAÇÃO:</strong><br>
• Dedetização e desratização trimestral com empresa licenciada <span style="color:#0284c7;"><em>[EDITÁVEL: inserir CNPJ e razão social da prestadora]</em></span>;<br>
• Caixa d'água lavada semestralmente com laudo bacteriológico de potabilidade;<br>
• Ar-condicionado com PMOC e limpeza mensal de filtros. Laudos anexados ao Livro de Registro da Vigilância Sanitária.</p>

<p><strong>11. TREINAMENTO, CAPACITAÇÃO E EDUCAÇÃO CONTINUADA:</strong><br>
Treinamento admissional de 8h em Boas Práticas e Biossegurança + reciclagem anual. Registro com lista de presença assinada, conteúdo programático e avaliação. Temas: higienização de mãos, PGRSS, manejo de intercorrências, primeiros socorros.</p>

<p><strong>12. REVISÃO, VIGÊNCIA E APROVAÇÃO:</strong><br>
Este manual entra em vigor em <span style="color:#0284c7;"><em>[EDITÁVEL: {{data}}]</em></span> e será revisado anualmente ou sempre que houver mudança de estrutura, equipe ou legislação.<br>
<strong>Aprovado por:</strong> {{responsavel_tecnico}} - {{registro_conselho}} - Responsável Técnica (RT). Assinatura e carimbo.</p>

<p><strong>ANEXOS:</strong> POPs de Biossegurança e Rotinas Sanitárias, planilhas de limpeza, comprovantes de vacinação ocupacional, certificados de calibração de equipamentos e controle diário de temperatura de termolábeis.</p>
`
  },

  // PLANO DE GERENCIAMENTO DE RESÍDUOS DE SERVIÇOS DE SAÚDE - PGRSS (RDC ANVISA 222/2018)
  {
    id: 'pgrss-master-rdc-222',
    title: 'PLANO DE GERENCIAMENTO DE RESÍDUOS DE SERVIÇOS DE SAÚDE (PGRSS)',
    category: 'Manual',
    stepCategory: '1. Documentos Base e ANVISA',
    version: 'V 5.0 - Padrão ANVISA RDC 222/2018 & CONAMA 358',
    lastModified: '2025-02-19',
    isEssential: true,
    adaptationNotes: 'PGRSS completo para Clínica de Estética em estrita conformidade com a RDC ANVISA nº 222/2018, RDC nº 306/2004, CONAMA 358/2005 e Portarias da Vigilância Sanitária. Contempla classificação dos Grupos A, B, D e E, segregação na fonte, fluxo de transporte interno e Manifesto MTR SINIR.',
    content: `
<h2>PLANO DE GERENCIAMENTO DE RESÍDUOS DE SERVIÇOS DE SAÚDE (PGRSS)</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>CNES:</strong> {{cnes}}<br>
<strong>Endereço:</strong> {{endereco}}<br>
<strong>Responsável Técnico(a):</strong> {{responsavel_tecnico}} - {{registro_conselho}} &bull; <strong>Data/Vigência:</strong> {{data}}</p>

<p><strong>1. IDENTIFICAÇÃO DO GERADOR E OBJETIVO:</strong><br>
O presente Plano de Gerenciamento de Resíduos de Serviços de Saúde (PGRSS) foi elaborado para a <strong>{{nome_clinica}}</strong> em estrito cumprimento da <strong>Resolução RDC ANVISA nº 222/2018</strong>, <strong>Resolução CONAMA nº 358/2005</strong> e <strong>Norma Regulamentadora NR-32</strong>. Seu objetivo é estabelecer diretrizes técnicas e operacionais para a geração, segregação na fonte, acondicionamento, identificação, transporte interno, armazenamento temporário, tratamento e destinação final ambientalmente adequada dos resíduos gerados nos procedimentos estéticos.</p>

<p><strong>2. CLASSIFICAÇÃO DOS RESÍDUOS GERADOS NA CLÍNICA (RDC 222/2018):</strong><br>
• <strong>GRUPO A (Resíduos com Risco Biológico / Infectantes - Subgrupo A4):</strong> Algodões, gazes, luvas de procedimentos descartáveis com presença de sangue ou fluidos corpóreos, lençóis descartáveis e ponteiras com matéria orgânica. Acondicionados em saco plástico branco leitoso virgem com símbolo internacional de risco biológico (limite máximo de 2/3 da capacidade);<br>
• <strong>GRUPO B (Resíduos Químicos):</strong> Sobras de substâncias químicas para peelings (ácido glicólico, mandélico, salicílico, retinóico), medicamentos vencidos, anestésicos e solventes. Acondicionados em recipientes rígidos estanques de polietileno resistentes à corrosão química e rotulados com a Ficha de Informação de Segurança (FISPQ);<br>
• <strong>GRUPO D (Resíduos Comuns / Recicláveis e Não Recicláveis):</strong> Papéis de escritório, embalagens secundárias não contaminadas, copos descartáveis e resíduos orgânicos da copa. Acondicionados em sacos plásticos pretos/azuis de uso comum para coleta pública municipal;<br>
• <strong>GRUPO E (Resíduos Perfurocortantes ou Escarificantes):</strong> Agulhas hipodérmicas, microagulhas de dermaroller/dermapen, agulhas de toxina e preenchedores, cânulas, lâminas de bisturi de dermaplaning, ampolas de vidro e cartuchos descartáveis. Acondicionados imediatamente após o uso em <strong>caixas rígidas coletoras amarelas (padrão NBR 13853 / Descarpack)</strong> até a linha pontilhada de segurança (máximo 3/4 da capacidade). <em>É terminantemente proibido o reencape manual de agulhas e a retirada de agulhas da seringa com as mãos</em>.</p>

<!-- PAGE_BREAK -->

<p><strong>3. FLUXO OPERACIONAL DE MANEJO INTERNO E BIOSSEGURANÇA:</strong><br>
1. <strong>Segregação Imediata no Ponto de Geração:</strong> O profissional executante descarta os materiais no recipiente correspondente ao lado da maca durante ou ao término do procedimento;<br>
2. <strong>Recolhimento e Transporte Interno:</strong> Realizado em horários pré-estabelecidos (fora dos momentos de maior fluxo de pacientes), utilizando carro de transporte fechado exclusivo em polietileno lavável. O colaborador utiliza EPI completo (luvas de borracha nitrílica cano longo, avental impermeável, máscara e bota fechada impermeável);<br>
3. <strong>Abrigo Temporário e Externo de Resíduos:</strong> Localizado em área restrita e ventilada com piso lavável, ponto de água, ralo sifonado e tela milimétrica contra pragas urbanas, devidamente sinalizado com placas de risco biológico.</p>

<p><strong>4. COLETA EXTERNA, TRANSPORTE E DESTINAÇÃO FINAL:</strong><br>
• <strong>Empresa Coletora Especializada Licenciada:</strong> <span style="color:#0284c7;"><em>[EDITÁVEL: Inserir Razão Social e CNPJ da Empresa de Coleta Especializada de Resíduos de Saúde]</em></span>, com Licença de Operação do Órgão Ambiental Municipal/Estadual vigente nº <span style="color:#0284c7;"><em>[EDITÁVEL: LO-CETESB-2024-9876]</em></span>;<br>
• <strong>Frequência de Coleta Externa:</strong> Semanal / Quinzenal, com emissão obrigatória do <strong>MTR (Manifesto de Transporte de Resíduos) através do Sistema Nacional SINIR</strong> e Certificado de Destinação Final (CDF) com incineração ou autoclavagem térmica licenciada;<br>
• <strong>Guarda Documental:</strong> Os MTRs e CDFs são arquivados na pasta sanitária da clínica pelo prazo mínimo legal de <strong>5 (cinco) anos</strong> para comprovação perante a Vigilância Sanitária e Secretaria de Meio Ambiente.</p>

<p><strong>5. SAÚDE OCUPACIONAL E PROGRAMA DE CAPACITAÇÃO DA EQUIPE:</strong><br>
Todos os profissionais envolvidos no manejo de resíduos recebem treinamento anual obrigatório em biossegurança, classificação de resíduos, uso correto de EPIs e fluxo de conduta em caso de acidentes com perfurocortantes (PEP em até 2 horas). Todos possuem esquema vacinal completo contra Hepatite B (3 doses e confirmação de Anti-HBs positivo) e Tétano (Dupla Adulto).</p>

<p style="margin-top: 15px;"><strong>São Paulo - SP, {{data}}</strong></p>

<table style="width: 100%; border-collapse: collapse; margin-top: 25px;" border="0">
  <tr>
    <td style="width: 50%; text-align: center; vertical-align: top; padding: 0 10px;">
      <div style="border-bottom: 1.5px solid #0f172a; height: 35px; margin-bottom: 6px;"></div>
      <div style="font-weight: bold; font-size: 11px; text-transform: uppercase; color: #0f172a;">{{responsavel_tecnico}}</div>
      <div style="font-size: 9.5px; color: #334155;">{{registro_conselho}}</div>
      <div style="font-size: 8.5px; color: #64748b; margin-top: 2px;">Responsável Técnica pelo PGRSS</div>
    </td>
    <td style="width: 50%; text-align: center; vertical-align: top; padding: 0 10px;">
      <div style="border-bottom: 1.5px solid #0f172a; height: 35px; margin-bottom: 6px;"></div>
      <div style="font-weight: bold; font-size: 11px; text-transform: uppercase; color: #0f172a;">{{nome_clinica}}</div>
      <div style="font-size: 9.5px; color: #334155;"></div>
      <div style="font-size: 8.5px; color: #64748b; margin-top: 2px;">Representante Legal do Estabelecimento Gerador</div>
    </td>
  </tr>
</table>
`
  },

  // MEMORIAL DESCRITIVO DE ATIVIDADES - SERVIÇOS DE ESTÉTICA
  {
    id: 'memorial-descritivo-atividades',
    title: 'MEMORIAL DESCRITIVO DE ATIVIDADES - SERVIÇOS DE ESTÉTICA',
    category: 'Manual',
    stepCategory: '1. Documentos Base e ANVISA',
    version: 'V 5.0 - Licenciamento Sanitário VISA & CVS 01/2020',
    lastModified: '2025-02-19',
    isEssential: true,
    adaptationNotes: 'Memorial Descritivo de Atividades estruturado em 12 seções para instrução de processo de Licenciamento Sanitário inicial ou renovação perante a Vigilância Sanitária Municipal (CVS 01/2020, RDC 63/2011 e CNAEs 9602-5/01 e 9602-5/02).',
    content: `
<h2>MEMORIAL DESCRITIVO DE ATIVIDADES - SERVIÇOS DE ESTÉTICA</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  &bull; <strong>CNES:</strong> {{cnes}}<br>
<strong>Endereço Completo:</strong> {{endereco}}<br>
<strong>Telefone:</strong> {{telefone}} | <strong>Data/Vigência:</strong> {{data}}<br>
<strong>Responsável Técnico(a):</strong> {{responsavel_tecnico}} - {{registro_conselho}} - CNS: 708 1234 5678 9012</p>

<p><strong>1. IDENTIFICAÇÃO DO ESTABELECIMENTO E OBJETO DO REQUERIMENTO:</strong><br>
Este Memorial Descritivo visa instruir o processo de Licenciamento Sanitário inicial / renovação da <strong>{{nome_clinica}}</strong> junto à Vigilância Sanitária Municipal, para exercício de atividades de estética facial, corporal e capilar sem responsabilidade médica, conforme CNAE 9602-5/01 e 9602-5/02, em estrita conformidade com a <strong>RDC ANVISA nº 63/2011</strong> e <strong>Portaria CVS nº 01/2020</strong>.</p>

<p><strong>2. RESPONSABILIDADE TÉCNICA E LEGAL:</strong><br>
• <strong>Responsável Técnica:</strong> {{responsavel_tecnico}} - {{registro_conselho}}, Médica, CRM <span style="color:#0284c7;"><em>[EDITÁVEL: 124580]</em></span>, com carga horária de 30h semanais, presente às segundas, quartas e sextas-feiras. Certificado de regularidade técnica e diploma anexos.<br>
• <strong>Responsável Legal:</strong> <span style="color:#0284c7;"><em>[EDITÁVEL: Nome do sócio proprietário, CPF 000.000.000-00, RG 00.000.000-0 SSP/SP]</em></span>.</p>

<p><strong>3. ATIVIDADES DESENVOLVIDAS - DETALHAMENTO TÉCNICO:</strong><br>
• <strong>Estética Facial:</strong> limpeza de pele profunda, peeling de diamante, peeling químico superficial (ácido glicólico até 10%, mandélico, salicílico), microagulhamento até 0,5mm, hidratação, revitalização e fototerapia com LED;<br>
• <strong>Estética Corporal:</strong> drenagem linfática manual, massagem modeladora, esfoliação corporal, banho de lua, radiofrequência corporal, criolipólise de placas e ultrassom cavitacional;<br>
• <strong>Estética Capilar:</strong> terapia capilar com alta frequência e LED, detox capilar;<br>
• <strong>Depilação Tecnológica:</strong> luz intensa pulsada (LIP) e laser de diodo 808nm para epilação.<br>
<strong>NÃO SÃO REALIZADOS:</strong> procedimentos cirúrgicos invasivos, aplicação de injetáveis não autorizados, bronzeamento artificial em câmara UV, procedimentos com anestésico injetável.</p>

<!-- PAGE_BREAK -->

<p><strong>4. HORÁRIO DE FUNCIONAMENTO E CAPACIDADE OPERACIONAL:</strong><br>
• <strong>Horário de Atendimento:</strong> Segunda a sexta das 09h00 às 19h00; Sábado das 09h00 às 14h00;<br>
• <strong>Capacidade Operacional Média:</strong> 12 atendimentos/dia, com intervalo obrigatório de 20 minutos entre clientes para higienização e desinfecção terminal da sala;<br>
• <strong>Fluxo Unidirecional:</strong> Recepção &rarr; Vestiário &rarr; Sala de Procedimento &rarr; Saída, evitando rigorosamente o cruzamento entre fluxos limpos e contaminados.</p>

<p><strong>5. RECURSOS HUMANOS:</strong><br>
Quadro funcional composto por: <strong>01 RT Médica</strong>, <strong>02 Esteticistas</strong> com formação técnica (1200h, CRH <span style="color:#0284c7;"><em>[EDITÁVEL: 12345]</em></span>), <strong>01 Recepcionista</strong> e <strong>01 Auxiliar de limpeza</strong> treinada em higienização hospitalar/clínica. Todos com CTPS registrada, Atestado de Saúde Ocupacional (ASO) anual e carteira de vacinação atualizada. Organograma e escalas anexos.</p>

<p><strong>6. ESTRUTURA FÍSICA - MEMORIAL DESCRITIVO DETALHADO:</strong><br>
Imóvel comercial com Habite-se nº <span style="color:#0284c7;"><em>[EDITÁVEL: 2024-SP-12345]</em></span>, área total de <strong>85m²</strong> distribuídos em:<br>
• <strong>Recepção / Espera (12m²):</strong> 6 cadeiras individuais laváveis, balcão de atendimento e lavabo adaptado;<br>
• <strong>Sala 01 de Procedimentos Faciais (14m²):</strong> Maca elétrica, mocho, lavatório de mãos exclusivo com acionamento por pedal, bancada de granito e armário fechado de cosméticos;<br>
• <strong>Sala 02 de Tecnologias Corporais (15m²):</strong> Equipamento de criolipólise, radiofrequência, lavatório de mãos e armário fechado;<br>
• <strong>DML (Depósito de Material de Limpeza - 3m²):</strong> Tanque exclusivo e armário suspenso trancado para saneantes;<br>
• <strong>Vestiário de Funcionários (4m²):</strong> Armários individuais duplos para separação de roupas limpas e de passeio;<br>
• <strong>Sanitário para Clientes Adaptado para PCD:</strong> Barras de apoio e alarme de emergência;<br>
• <strong>Abrigo de Resíduos (2,5m²):</strong> Ventilado, piso lavável, ponto de água, ralo sifonado e acesso restrito.<br>
<em>Piso em porcelanato antiderrapante claro, paredes revestidas até 2,10m com material lavável, forro em PVC lavável e iluminação LED de 500 lux. Planta baixa em escala 1:50 assinada por arquiteto CAU <span style="color:#0284c7;"><em>[EDITÁVEL: A123456-7]</em></span> anexa.</em></p>

<!-- PAGE_BREAK -->

<p><strong>7. EQUIPAMENTOS ELETROESTÉTICOS - RELAÇÃO TÉCNICA:</strong></p>
<table style="width: 100%; border-collapse: collapse; font-size: 10px; margin-top: 6px;" border="1">
  <thead>
    <tr style="background-color: #f1f5f9; text-align: center;">
      <th style="padding: 5px;">Equipamento</th>
      <th style="padding: 5px;">Marca / Modelo</th>
      <th style="padding: 5px; width: 90px;">Registro ANVISA</th>
      <th style="padding: 5px; width: 85px;">Manutenção</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 5px; font-weight: bold;">Radiofrequência</td>
      <td style="padding: 5px;"><span style="color:#0284c7;">[EDITÁVEL: Ibramed Hooke]</span></td>
      <td style="padding: 5px; text-align: center;"><span style="color:#0284c7;">[EDITÁVEL: 10360310034]</span></td>
      <td style="padding: 5px; text-align: center;">Anual 03/2025</td>
    </tr>
    <tr>
      <td style="padding: 5px; font-weight: bold;">Criolipólise de Placas</td>
      <td style="padding: 5px;"><span style="color:#0284c7;">[EDITÁVEL: AD Derma Criodermis]</span></td>
      <td style="padding: 5px; text-align: center;"><span style="color:#0284c7;">[EDITÁVEL: 80212480010]</span></td>
      <td style="padding: 5px; text-align: center;">Semestral</td>
    </tr>
    <tr>
      <td style="padding: 5px; font-weight: bold;">Laser de Diodo 808nm</td>
      <td style="padding: 5px;"><span style="color:#0284c7;">[EDITÁVEL: Body Health Dual]</span></td>
      <td style="padding: 5px; text-align: center;"><span style="color:#0284c7;">[EDITÁVEL: 10345670008]</span></td>
      <td style="padding: 5px; text-align: center;">Anual</td>
    </tr>
    <tr>
      <td style="padding: 5px; font-weight: bold;">Luz Intensa Pulsada (LIP)</td>
      <td style="padding: 5px;"><span style="color:#0284c7;">[EDITÁVEL: Lyra Ibramed]</span></td>
      <td style="padding: 5px; text-align: center;"><span style="color:#0284c7;">[EDITÁVEL: 10360310031]</span></td>
      <td style="padding: 5px; text-align: center;">Anual</td>
    </tr>
  </tbody>
</table>
<p style="font-size: 9px; color: #475569; margin-top: 4px;"><em>Todos os equipamentos possuem manual de instrução em língua portuguesa, certificado de calibração periódico emitido por engenharia clínica, treinamento operacional da equipe e etiqueta visível de manutenção preventiva.</em></p>

<p><strong>8. PRODUTOS, COSMÉTICOS E SANEANTES:</strong><br>
• <strong>Cosméticos:</strong> Relação completa de cosméticos com número de registro/notificação ANVISA, lote, validade e FISPQ arquivada na clínica. Fornecedores homologados: <span style="color:#0284c7;"><em>[EDITÁVEL: Extratos da Terra, Adcos, Bioage]</em></span>;<br>
• <strong>Saneantes:</strong> Álcool 70% etílico (líquido e gel), Quaternário de Amônio de 5ª geração, Hipoclorito de Sódio a 1% e Detergente enzimático neutro;<br>
• <strong>Armazenamento:</strong> Armário fechado, em ambiente com temperatura controlada (<25°C), seguindo a regra FIFO (Primeiro que Vence, Primeiro que Sai). <strong>Proibido fracionamento sem rotulagem completa de validade e lote.</strong></p>

<p><strong>9. PROCEDIMENTOS DE BIOSSEGURANÇA E BOAS PRÁTICAS ADOTADOS:</strong><br>
Manual de Boas Práticas implantado, PGRSS vigente, POPs de higienização de mãos, processamento de artigos semicríticos, limpeza concorrente e terminal de bancadas/macas, manejo de intercorrências (queimadura térmica, lipotimia/desmaio, reação alérgica aguda). Maleta de primeiros socorros com oxímetro, esfigmomanômetro e glicosímetro; maca com posição de Trendelenburg; contatos de emergência (SAMU 192 e Bombeiros 193) afixados nas salas. Laudo de potabilidade bacteriológica e dedetização trimestral em dia.</p>

<p><strong>10. GERENCIAMENTO DE RESÍDUOS (PGRSS) - SÍNTESE:</strong><br>
Segregação na fonte conforme PGRSS, acondicionamento de biológicos em saco branco leitoso virgem (limite 2/3), perfurocortantes em caixa rígida amarela NBR 13853 (limite 3/4) e químicos em recipientes estanques. Coleta 2x por semana por empresa licenciada especializada <span style="color:#0284c7;"><em>[EDITÁVEL: EcoMed Coleta Ltda]</em></span>. MTRs do SINIR e CDFs arquivados por 5 anos.</p>

<!-- PAGE_BREAK -->

<p><strong>11. DOCUMENTAÇÃO ANEXA AO PROCESSO DE LICENCIAMENTO SANITÁRIO:</strong><br>
1. Requerimento padrão VISA preenchido e assinado pela RT e Responsável Legal;<br>
2. Contrato Social registrado, Cartão CNPJ e Comprovante de Inscrição Municipal / IPTU;<br>
3. Auto de Vistoria do Corpo de Bombeiros (AVCB / CLCB vigente);<br>
4. Licença CETESB / Órgão Ambiental da transportadora de resíduos de saúde;<br>
5. Planta Baixa arquitetônica aprovada em escala 1:50 com layout de salas e rota de resíduos;<br>
6. Memorial de equipamentos com certificados de calibração e registros ANVISA;<br>
7. Diplomas de graduação, carteiras do CRBM/CRH, ASOs e carteiras de vacinação dos colaboradores;<br>
8. Manual de Boas Práticas de Serviços de Estética, PGRSS e POPs operacionais completos;<br>
9. Comprovantes de controle integrado de pragas (dedetização), higienização de caixa d'água e PMOC de climatização;<br>
10. Contrato de prestação de serviços de coleta de resíduos perigosos, MTRs SINIR e laudo de potabilidade de água.</p>

<p><strong>12. DECLARAÇÃO DE RESPONSABILIDADE E TERMO DE COMPROMISSO:</strong><br>
Declaramos, sob as penas da lei (Art. 299 do Código Penal), que as informações prestadas neste Memorial são a fiel expressão da verdade e que a <strong>{{nome_clinica}}</strong> compromete-se a cumprir integralmente a legislação sanitária vigente, mantendo a documentação técnica permanentemente atualizada e disponível à fiscalização da autoridade sanitária competente. Estamos cientes de que qualquer alteração de estrutura física, equipamentos, atividades desenvolvidas ou responsabilidade técnica será comunicada formalmente à Vigilância Sanitária no prazo improrrogável de até 30 (trinta) dias.</p>

<p style="margin-top: 15px;"><strong>Local e Data:</strong> São Paulo - SP, <span style="color:#0284c7;"><em>{{data}}</em></span>.</p>

<table style="width: 100%; border-collapse: collapse; margin-top: 30px;" border="0">
  <tr>
    <td style="width: 50%; text-align: center; vertical-align: top; padding: 0 10px;">
      <div style="border-bottom: 1.5px solid #0f172a; height: 35px; margin-bottom: 6px;"></div>
      <div style="font-weight: bold; font-size: 11px; text-transform: uppercase; color: #0f172a;">{{responsavel_tecnico}}</div>
      <div style="font-size: 9.5px; color: #334155;">{{registro_conselho}} &bull; CNS 708 1234 5678 9012</div>
      <div style="font-size: 8.5px; color: #64748b; margin-top: 2px;">Responsável Técnica - RT</div>
    </td>
    <td style="width: 50%; text-align: center; vertical-align: top; padding: 0 10px;">
      <div style="border-bottom: 1.5px solid #0f172a; height: 35px; margin-bottom: 6px;"></div>
      <div style="font-weight: bold; font-size: 11px; text-transform: uppercase; color: #0f172a;"><span style="color:#0284c7;">[EDITÁVEL: Nome do Sócio Proprietário]</span></div>
      <div style="font-size: 9.5px; color: #334155;"> {{nome_clinica}}</div>
      <div style="font-size: 8.5px; color: #64748b; margin-top: 2px;">Responsável Legal / Administrador</div>
    </td>
  </tr>
</table>
`
  }
];

