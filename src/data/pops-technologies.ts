import { DocumentItem } from '../types';

export const POPS_TECHNOLOGIES: DocumentItem[] = [
  // 1. POP - LASER LAVIEEN 1927nm
  {
    id: 'pop-lavieen-1927nm',
    title: 'POP – Laser Lavieen 1927nm (Thulium Fracionado Não Ablativo para Melasma, Poros e Drug Delivery)',
    category: 'POP',
    stepCategory: '3. POPs de Laser e Tecnologias',
    version: 'V 4.5 - ANVISA & Tecnologias Fotônicas',
    lastModified: '2025-02-15',
    isEssential: true,
    adaptationNotes: 'Laser Thulium 1927nm, afinidade por água, microzonas de coagulação térmica (MTZ 150-200µm), protocolos de melasma, drug delivery e fotoproteção.',
    content: `
<h2>POP – LASER LAVIEEN 1927nm (THULIUM FRACIONADO NÃO ABLATIVO)</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-TECH-01 | <strong>Setor:</strong> Cabine de Lasers e Tecnologias</p>

<p><strong>1. OBJETIVO E FUNDAMENTO FÍSICO:</strong><br>
Padronizar a aplicação do laser <strong>Lavieen Thulium 1927nm</strong> fracionado não ablativo na <strong>{{nome_clinica}}</strong> para tratamento de melasma resistente, discromias solares, poros dilatados, textura irregular, fotoenvelhecimento leve-moderado e otimização de permeação de ativos (LADD - <em>Laser Assisted Drug Delivery</em>). Comprimento de onda com alta afinidade por água, penetração de 200 a 300 µm na derme papilar com preservação do estrato córneo e mínimo downtime.</p>

<p><strong>2. MATERIAIS E BIOSSEGURANÇA ÓPTICA:</strong><br>
• Equipamento Laser Thulium 1927nm calibrado com registro ativo na ANVISA;<br>
• Óculos de proteção com Densidade Óptica OD 5+ específica para 1927nm (operador e paciente);<br>
• Protetor ocular metálico interno ou externo quando próximo ao rebordo orbitário;<br>
• Anestésico tópico padronizado (Lidocaína 4% + Prilocaína) aplicado 30 min antes sob oclusão;<br>
• Soro fisiológico gelado e máscara regeneradora calmante pós-laser (pantenol, centella asiática e ácido hialurônico);<br>
• Protetor solar 100% físico mineral FPS 50+.</p>

<p><strong>3. PROTOCOLOS E PARÂMETROS TÉCNICOS:</strong><br>
• <strong>Melasma Epidérmico / Misto:</strong> Energia de 10 a 15 mJ | Densidade baixa 2% a 3% | 1 passe com 10-15% de sobreposição (overlap);<br>
• <strong>Textura, Poros e Fotoenvelhecimento:</strong> Energia de 15 a 25 mJ | Densidade média 5% a 7% | 1 a 2 passes cruzados;<br>
• <strong>Drug Delivery (LADD):</strong> Energia de 12 a 15 mJ | Aplicação imediata (em até 30 segundos pós-laser) de Ácido Tranexâmico estéril 5%, Vitamina C pura ou PDRN.<br>
• <em>Endpoint Clínico Seguro:</em> Eritema homogêneo suave a moderado e leve sensação de calor, sem sangramento puntiforme ou branqueamento epidérmico severo.</p>

<p><strong>4. CUIDADOS PÓS-PROCEDIMENTO:</strong><br>
1. Manter hidratação contínua com reparador dérmico por 5 a 7 dias;<br>
2. Não remover as microcrostas formadas (descamação natural em 3 a 5 dias);<br>
3. Uso estrito de fotoprotetor físico mineral a cada 3 horas;<br>
4. Suspender ácidos e esfoliantes por no mínimo 7 dias pós-sessão.</p>
`
  },

  // 2. POP - LASER CO2 FRACIONADO 10600nm
  {
    id: 'pop-co2-fracionado',
    title: 'POP – CO2 Fracionado 10600nm (Resurfacing Ablativo, Cicatrizes de Acne e Rugas Profundas)',
    category: 'POP',
    stepCategory: '3. POPs de Laser e Tecnologias',
    version: 'V 4.5 - ANVISA & Tecnologias Ablativas',
    lastModified: '2025-02-15',
    isEssential: true,
    adaptationNotes: 'Laser ablativo 10600nm, vaporização de água tecidual, zonas microcolunares térmicas profundas, profilaxia antiviral de herpes e manejo de crostas.',
    content: `
<h2>POP – LASER CO2 FRACIONADO 10600nm (RESURFACING ABLATIVO)</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-TECH-02 | <strong>Setor:</strong> Cabine de Lasers Avançados</p>

<p><strong>1. OBJETIVO:</strong><br>
Normatizar o protocolo de resurfacing ablativo com <strong>Laser de Dióxido de Carbono (CO2) 10600nm</strong> na <strong>{{nome_clinica}}</strong>, com foco no tratamento de cicatrizes de acne atróficas, rugas periorais/periorbitais profundas, estrias atróficas e flacidez dérmica avançada, promovendo retração colágena imediata e neocolagênese de longo prazo.</p>

<p><strong>2. ESTRUTURA, ANESTESIA E EVACUAÇÃO DE FUMAÇA:</strong><br>
• Equipamento Laser CO2 10600nm calibrado com registro na ANVISA;<br>
• <strong>Aspirador / Evacuador de Fumaça Cirúrgico</strong> com filtro biológico HEPA/ULPA obrigatório (prevenção de inalação de aerossóis e bio-partículas);<br>
• Óculos de proteção específicos para comprimento de onda de 10600nm;<br>
• Anestesia tópica potente associada a bloqueios de nervos periféricos (infraorbitário, supraorbitário e mentoniano) com Lidocaína 2% sem vasoconstritor;<br>
• Profilaxia antiviral com Aciclovir 400mg VO 12/12h iniciando 2 dias antes e mantendo por 5 dias pós para pacientes com histórico de herpes simples.</p>

<p><strong>3. SEQUÊNCIA TÉCNICA E PARÂMETROS:</strong><br>
1. <strong>Assepsia e Secagem Completa:</strong> A pele deve estar perfeitamente seca antes do disparo da energia luminosa;<br>
2. <strong>Parâmetros:</strong> Potência de 15 a 25W, densidade de 10% a 20%, espaçamento de 400 a 800µm e modos <em>Deep</em> ou <em>Superficial</em> calibrados pelo RT;<br>
3. <strong>Disparo com Sobreposição Controlada:</strong> Scanner acoplado perpendicularmente, evitando sobreposição de micropulsos superior a 10%;<br>
4. <strong>Pós Imediato:</strong> Aplicação de compressas geladas estéreis e camada oclusiva protetora de vaselina sólida estéril ou filme biocompatível.</p>

<p><strong>4. ORIENTAÇÕES CRÍTICAS DE PÓS-OPERATÓRIO (DOWNTIME 7 A 14 DIAS):</strong><br>
• Lavagem delicada com SF 0,9% estéril e aplicação contínua de pomada cicatrizante/vaselina estéril;<br>
• Proibição de exposição solar e uso obrigatório de barreira física (chapéu/sombrinha) e protetor mineral após o fechamento epidérmico;<br>
• Retorno obrigatório no 7º e 30º dia pós-procedimento.</p>
`
  },

  // 3. POP - ULTRASSOM MICRO E MACROFOCADO (HIFU)
  {
    id: 'pop-ultrassom-hifu',
    title: 'POP – Ultrassom Micro/Macrofocado HIFU (Ultraformer / Liftera para Lifting SMAS e Compactação Adiposa)',
    category: 'POP',
    stepCategory: '3. POPs de Laser e Tecnologias',
    version: 'V 4.5 - ANVISA & Tecnologias de Lifting',
    lastModified: '2025-02-15',
    isEssential: true,
    adaptationNotes: 'Coagulação térmica fracionada a 65°C-75°C no SMAS e derme profunda, zonas de segurança de nervos motores (facial/marginal) e acoplamento ultrassônico perfeito.',
    content: `
<h2>POP – ULTRASSOM MICRO E MACROFOCADO (HIFU / ULTRAFORMER)</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-TECH-03 | <strong>Setor:</strong> Cabine de Tecnologias de Alta Potência</p>

<p><strong>1. OBJETIVO:</strong><br>
Padronizar a aplicação do <strong>Ultrassom Microfocado e Macrofocado de Alta Intensidade (HIFU)</strong> na <strong>{{nome_clinica}}</strong>, com a finalidade de promover pontos de coagulação térmica (TCPs) na fáscia muscular (SMAS - 4.5 mm), derme profunda (3.0 mm), derme superficial (1.5 mm/2.0 mm) e tecido adiposo subcutâneo (6.0 mm a 13.0 mm), resultando em ancoragem tecidual, contração de colágeno e efeito lifting não cirúrgico.</p>

<p><strong>2. CARTUCHOS E PROFUNDIDADES ESPECÍFICAS:</strong><br>
• <strong>Cartucho 4.5 mm (Microfocado):</strong> Plano do SMAS e fáscia muscular facial / platisma;<br>
• <strong>Cartuchos 3.0 mm e 2.0 mm:</strong> Derme reticular e profunda para estímulo de neocolagênese;<br>
• <strong>Cartucho 1.5 mm:</strong> Derme papilar superficial e rugas finas periorbitais;<br>
• <strong>Cartuchos 6.0 mm, 9.0 mm e 13.0 mm (Macrofocados):</strong> Redução de gordura submentoniana (papada), flacidez corporal de braços, abdômen e flancos.</p>

<p><strong>3. MAPEAMENTO ANATÔMICO E ZONAS DE EXCLUSÃO OBRIGATÓRIA:</strong><br>
• <strong>Zonas de Risco de Nervos Motores:</strong> Não disparar sobre o forame supraorbitário, trajeto do Ramo Temporal do Nervo Facial e borda inferior mandibular sobre o Ramo Marginal Mandibular;<br>
• <strong>Zonas de Exclusão Anatômica:</strong> Região tireoidiana anterior, glóbulos oculares e implantes metálicos superficiais.</p>

<p><strong>4. CONDUTA E PARÂMETROS TÉCNICOS:</strong><br>
1. Demarcação vetorial com lápis dermatográfico branco das linhas de tração facial;<br>
2. Aplicação de gel condutor de ultrassom estéril e transparente em quantidade abundante, assegurando total acoplamento e ausência de bolhas de ar entre a ponteira e a pele;<br>
3. Pressão uniforme e perpendicular durante cada disparo de linha de pontos térmicos;<br>
4. Total de disparos calibrado por protocolo (ex: 300 a 600 linhas na face completa).</p>
`
  },

  // 4. POP - ENDOLASER / ENDOLIFTING 1470nm
  {
    id: 'pop-endolaser-1470nm',
    title: 'POP – Endolaser 1470nm (Endolifting Subdérmico com Microfibra Óptica para Retração e Lipólise)',
    category: 'POP',
    stepCategory: '3. POPs de Laser e Tecnologias',
    version: 'V 4.5 - ANVISA & Lasers Subdérmicos',
    lastModified: '2025-02-15',
    isEssential: true,
    adaptationNotes: 'Microfibra óptica estéril de 300µm a 600µm, laser diodo 1470nm, anestesia tumescente de Klein e controle de temperatura cutânea por termografia infravermelha.',
    content: `
<h2>POP – ENDOLASER SUBDÉRMICO 1470nm (ENDOLIFTING)</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-TECH-04 | <strong>Setor:</strong> Cabine Estéril de Tecnologias Avançadas</p>

<p><strong>1. OBJETIVO:</strong><br>
Normatizar a técnica minimamente invasiva de <strong>Endolaser Diodo 1470nm</strong> na <strong>{{nome_clinica}}</strong>, com foco na retração tecidual imediata por fototermólise seletiva da água e gordura do plano hipodérmico, emulsificação de adipócitos na região submentoniana (papada), jowls, contorno mandibular, braços e abdômen.</p>

<p><strong>2. MATERIAIS ESTÉREIS E DESCARTÁVEIS:</strong><br>
• Equipamento Laser Diodo 1470nm com registro ANVISA e pedal de disparo duplo;<br>
• Microfibras ópticas estéreis e descartáveis de <strong>300 µm (facial) e 400 a 600 µm (corporal)</strong>;<br>
• Solução tumescente modificada (SF 0,9% + Lidocaína + Adrenalina 1:100.000 + Bicarbonato de Sódio);<br>
• <strong>Termômetro Infravermelho Digital / Câmera Termográfica</strong> para controle ininterrupto da temperatura externa da epiderme (faixa segura: <strong>40°C a 42°C</strong>);<br>
• Agulhas de pertuito 18G/20G, cânulas de Klein estéreis e faixa compressiva pós-procedimento.</p>

<p><strong>3. TÉCNICA E ETAPAS OPERACIONAIS:</strong><br>
1. <strong>Mapeamento Vetorial e Antissepsia Cirúrgica:</strong> Paciente em ortostase para marcação das zonas de acúmulo de gordura e vetores de lifting;<br>
2. <strong>Infiltração Tumescente:</strong> Infiltrar a solução anestésica no plano subcutâneo com cânula de Klein para hidrodissecção e proteção térmica tecidual;<br>
3. <strong>Introdução da Fibra e Disparo:</strong> Inserir a microfibra óptica no plano hipodérmico através do pertuito; acionar o laser em movimentos de leque suaves, contínuos e unidirecionais em velocidade constante (nunca parar a fibra parada ligada no mesmo ponto);<br>
4. <strong>Monitoramento Térmico:</strong> Cessar imediatamente a energia ao atingir 40°C-42°C na superfície para evitar queimaduras epidérmicas térmicas;<br>
5. <strong>Curativo Compressivo:</strong> Instalar faixa elástica mentoniana/facial por 24 a 48 horas ininterruptas.</p>
`
  },

  // 5. POP - LUZ INTENSA PULSADA (LIP)
  {
    id: 'pop-luz-intensa-pulsada-lip',
    title: 'POP – Luz Intensa Pulsada (Telangiectasias, Rosácea, Melanoses e Fotorrejuvenescimento)',
    category: 'POP',
    stepCategory: '3. POPs de Laser e Tecnologias',
    version: 'V 4.0 - ANVISA & Fototerapia',
    lastModified: '2025-02-15',
    isEssential: true,
    adaptationNotes: 'Filtros de corte óptico (515nm, 560nm, 590nm e 640nm), fototermólise seletiva de hemoglobina e melanina, resfriamento da safira e proteção ocular.',
    content: `
<h2>POP – LUZ INTENSA PULSADA (LIP / IPL)</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-TECH-05 | <strong>Setor:</strong> Cabine de Fototerapia e Lasers</p>

<p><strong>1. OBJETIVO:</strong><br>
Padronizar a aplicação de <strong>Luz Intensa Pulsada (LIP)</strong> na <strong>{{nome_clinica}}</strong>, com foco no tratamento de lesões vasculares faciais (telangiectasias, rosácea, poiquilodermia de Civatte), lesões pigmentares benignas (melanoses solares, efélides) e estímulo de colágeno dérmico por fotorrejuvenescimento.</p>

<p><strong>2. MATERIAIS E PROTEÇÃO ÓPTICA:</strong><br>
• Aparelho de LIP com resfriamento ativo da ponteira de cristal de safira (+4°C a -4°C);<br>
• Filtros ópticos de corte com registro ANVISA: 515nm (manchas claras), 560nm (rejuvenescimento global), 590nm (vascular e rosácea), 640nm (fototipos mais altos);<br>
• Gel condutor incolor resfriado e espátula estéril;<br>
• Óculos de proteção bloqueadores de espectro 500-1200nm para profissional e conchas protetoras oculares para o paciente.</p>

<p><strong>3. PARÂMETROS E EXECUÇÃO:</strong><br>
1. Checagem rigorosa do fototipo de Fitzpatrick (I a IV) e ausência de bronzeamento recente;<br>
2. Aplicação de camada homogênea de 2mm de gel condutor resfriado sobre a pele;<br>
3. Acoplamento perpendicular suave da safira, efetuando disparos com sobreposição máxima de 10%;<br>
4. <em>Endpoint Clínico:</em> Leve escurecimento transitório das melanoses (aspecto de pó de café) ou vasoconstrição/rubor moderado nos vasos tratados.</p>
`
  },

  // 6. POP - DEPILAÇÃO A LASER (DIODO, ALEXANDRITE E ND:YAG)
  {
    id: 'pop-depilacao-laser',
    title: 'POP – Depilação a Laser (Diodo 808nm, Alexandrite 755nm e Nd:YAG 1064nm)',
    category: 'POP',
    stepCategory: '3. POPs de Laser e Tecnologias',
    version: 'V 4.0 - ANVISA & Tecnologias de Epilação',
    lastModified: '2025-02-15',
    isEssential: true,
    adaptationNotes: 'Fototermólise seletiva do folículo piloso na fase anágena, calibração por fototipo I a VI e protocolos de resfriamento para proteção da epiderme.',
    content: `
<h2>POP – EPILAÇÃO E DEPILAÇÃO A LASER</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-TECH-06 | <strong>Setor:</strong> Cabine de Epilação a Laser</p>

<p><strong>1. OBJETIVO:</strong><br>
Padronizar os procedimentos de <strong>Epilação Definitiva a Laser</strong> na <strong>{{nome_clinica}}</strong> utilizando tecnologias de <strong>Diodo 808nm, Alexandrite 755nm ou Nd:YAG 1064nm</strong>, promovendo destruição térmica do bulbo e células germinativas do folículo piloso na fase anágena sem lesionar a epiderme circundante.</p>

<p><strong>2. TRIAGEM E CONTRAINDICAÇÕES MANDATÓRIAS:</strong><br>
• <strong>Critérios de Segurança:</strong> Avaliação do fototipo de Fitzpatrick, cor e espessura do pelo;<br>
• <strong>Contraindicações:</strong> Presença de pelos brancos/ruivos (sem melanina), pele bronzeada nas últimas 3 semanas, uso de isotretinoína oral há menos de 6 meses, histórico de fotossensibilidade e infecções ativas no local;<br>
• Proteção de nevos/pintas escuras e tatuagens com fita branca microporosa opaca antes dos disparos.</p>

<p><strong>3. CONDUTA TÉCNICA:</strong><br>
1. Raspagem prévia dos pelos com lâmina descartável de 12 a 24 horas antes do procedimento;<br>
2. Assepsia e aplicação de gel condutor estéril (se modo estático ou dinâmico HR/SHR);<br>
3. Ajuste de fluência (J/cm²) e tempo de pulso (ms) em correlação direta com o fototipo do paciente;<br>
4. Manter a ponteira com resfriamento criogênico acoplada de forma contínua durante a emissão dos feixes ópticos;<br>
5. <em>Endpoint Clínico:</em> Edema e eritema perifolicular discreto em até 15 minutos pós-aplicação.</p>
`
  },

  // 7. POP - REMOÇÃO DE TATUAGEM E MICROPIGMENTAÇÃO (Q-SWITCHED E PICOSEGUNDO)
  {
    id: 'pop-remocao-tatuagem-laser',
    title: 'POP – Remoção de Tatuagem (Laser Q-Switched Nd:YAG 1064nm/532nm e Picosegundo)',
    category: 'POP',
    stepCategory: '3. POPs de Laser e Tecnologias',
    version: 'V 4.0 - ANVISA & Lasers de Pulso Ultracurto',
    lastModified: '2025-02-15',
    isEssential: true,
    adaptationNotes: 'Efeito fotoacústico por pulsos em nanossegundos/picossegundos, fragmentação de pigmentos exógenos e efeito frosting branco imediato.',
    content: `
<h2>POP – REMOÇÃO DE TATUAGENS E MICROPIGMENTAÇÃO A LASER</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-TECH-07 | <strong>Setor:</strong> Cabine de Lasers Avançados</p>

<p><strong>1. OBJETIVO:</strong><br>
Estabelecer as diretrizes para a fragmentação e clareamento de pigmentos exógenos de tatuagens artísticas, traumáticas e micropigmentação na <strong>{{nome_clinica}}</strong>, através de lasers de pulso ultracurto <strong>Q-Switched Nd:YAG (1064nm e 532nm) ou Picosegundo</strong> por efeito fotoacústico.</p>

<p><strong>2. COMPRIMENTOS DE ONDA E SELEÇÃO DE PIGMENTOS:</strong><br>
• <strong>1064 nm:</strong> Pigmentos escuros (tinta preta, cinza, azul-marinho e micropigmentação escura);<br>
• <strong>532 nm:</strong> Pigmentos quentes (tinta vermelha, laranja, marrom-claro e pigmentos avermelhados);<br>
• <strong>755 nm / 694 nm (se aplicável):</strong> Pigmentos verdes e azuis turquesa.</p>

<p><strong>3. ETAPAS TÉCNICAS E ENDPOINT:</strong><br>
1. Anestesia tópica sob oclusão por 45 minutos e resfriamento por ar frio forçado (-30°C);<br>
2. Ajuste do tamanho do spot (2mm a 6mm) e fluência de acordo com a densidade da tinta e profundidade dérmica;<br>
3. Disparo pontual sem sobreposição excessiva;<br>
4. <em>Endpoint Clínico Mandatório:</em> Efeito <strong>Frosting</strong> (branqueamento cutâneo instantâneo por liberação de microbolhas de gás decorrentes da fragmentação fotoacústica da partícula de tinta);<br>
5. Curativo calmante com pomada regeneradora e gaze estéril por 24 horas.</p>
`
  },

  // 8. POP - TRANSPLANTE CAPILAR FUE
  {
    id: 'pop-transplante-capilar-fue',
    title: 'POP – Transplante Capilar FUE (Follicular Unit Extraction - Extração, Preservação e Implantação Folicular)',
    category: 'POP',
    stepCategory: '3. POPs de Laser e Tecnologias',
    version: 'V 4.5 - ANVISA & Cirurgia Capilar',
    lastModified: '2025-02-15',
    isEssential: true,
    adaptationNotes: 'Micro-punches de 0.8mm a 0.9mm, solução de preservação hipotérmica com ATP, controle de transecção <5% e técnica de implantação com DHI/Implanters.',
    content: `
<h2>POP – TRANSPLANTE CAPILAR TÉCNICA FUE</h2>
<p><strong>Clínica:</strong> {{nome_clinica}}  | <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} | <strong>Alvará:</strong> {{alvara}}<br>
<strong>Vigência:</strong> 12 meses | <strong>Código:</strong> POP-TECH-08 | <strong>Setor:</strong> Sala de Procedimentos Capilares Estéreis</p>

<p><strong>1. OBJETIVO:</strong><br>
Padronizar as rotinas da técnica <strong>FUE (Follicular Unit Extraction)</strong> para restauração capilar na <strong>{{nome_clinica}}</strong>, normatizando a seleção de área doadora, extração individual de unidades foliculares (UFs) com micro-punch motorizado, conservação biológica e implantação com densidade e angulação naturais.</p>

<p><strong>2. ESTRUTURA E DISPOSITIVOS CIRÚRGICOS:</strong><br>
• Micromotor de extração FUE com controle de rotação (1500 a 2800 RPM) e oscilação;<br>
• Micro-punches híbridos ou afiados estéreis com diâmetros de <strong>0,8 mm a 0,9 mm</strong>;<br>
• Placas de Petri refrigeradas a +4°C contendo Solução de Preservação Folicular (SF 0,9% estéril suplementado com ATP/Lipossomas);<br>
• Lupas estereoscópicas cirúrgicas de 4,5x a 6x de aumento e microscópio óptico para controle de transecção;<br>
• Dispositivos Implanters de ponta fina (Lion/KEEP) para implantação direta (DHI) ou lâminas de safira 0,8mm a 1,2mm para pré-incisões.</p>

<p><strong>3. SEQUÊNCIA TÉCNICA OPERACIONAL:</strong><br>
1. <strong>Tricotomia e Demarcação:</strong> Raspagem da área doadora occipital/parietal (1mm) e desenho da linha frontal natural (hairline);<br>
2. <strong>Anestesia Tumescente Local:</strong> Infiltração superficial de Lidocaína + Bupivacaína + Epinefrina diluídas para hemostasia e distensão cutânea;<br>
3. <strong>Extração com Punch:</strong> Alinhamento com o ângulo natural de emergência do folículo; profundidade de incisão de 3mm a 4mm; extração suave com pinça microcirúrgica sem esmagamento do bulbo;<br>
4. <strong>Contagem e Triagem das UFs:</strong> Classificação das unidades em simples (1 fio - para a linha anterior) e múltiplas (2 a 4 fios - para preenchimento de densidade); taxa de transecção máxima tolerada < 5%;<br>
5. <strong>Implantação Folicular:</strong> Inserção das UFs respeitando angulação aguda (15° a 30° na fronte e 45° no vértex) e densidade de 35 a 45 UFs/cm².</p>
`
  }
];
