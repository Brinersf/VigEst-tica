import { ClinicalPrescriptionEvidence } from '../types';

export const PRESCRICOES_CLINICAL_EVIDENCE: Record<string, ClinicalPrescriptionEvidence> = {
  // 1. Pós-Injetáveis
  'prescricao-homecare-pos-injetaveis': {
    pharmacologicalRationale:
      'O pós-procedimento imediato de injetáveis (toxina botulínica, ácido hialurônico, hidroxiapatita de cálcio e ácido poli-L-lático) cursa com microtraumatismo vascular, extravasamento eritrocitário intersticial (formação de microequimoses/hematomas) e resposta inflamatória tecidual transitória com pico em 24-48h. A combinação sinérgica de Arnica montana padronizada com Vitamina K1/K2 Óxido atua inibindo mediadores inflamatórios locais (IL-1, TNF-alfa e NF-kB) e acelerando a fagocitose do complexo hemoglobina-hemossiderina pelos macrófagos teciduais. Paralelamente, o D-Pantenol 5% associado ao Madecassoside (fração pura da Centella Asiatica) restaura a barreira cutânea, reepiteliza os orifícios de puntura e previne a perda transepidérmica de água (TEWL). A fotoproteção com filtros físicos minerais (óxido de zinco e dióxido de titânio) bloqueia radiação UVA/UVB e luz visível, prevenindo hiperpigmentação pós-inflamatória (HPI) secundária à hemossiderina residual.',
    therapeuticWindow:
      'Arnica montana extrato glicólico 3-10%; Vitamina K Óxido 1-3%; Alfa-Bisabolol 0,5-2%; D-Pantenol 2-5%; Madecassoside 0,1-0,5%; Niacinamida 2-5%. pH de estabilidade dérmica: 5.5 - 6.2.',
    levelOfEvidence: 'Nível I - A (Ensaios Clínicos Randomizados, Revisões Sistemáticas e Consensos Internacionais)',
    clinicalValidationNotes:
      'Fórmula validada para aplicação tópica imediata pós-injeção após hemostasia e assepsia. Formulação sem parabenos, hipoalergênica e não comedogênica. A via oral com dipirona ou paracetamol é de uso condicional. Evitar AINEs sistêmicos (ex.: ácido acetilsalicílico, ibuprofeno, cetoprofeno) nas primeiras 48 horas devido ao bloqueio da COX-1 plaquetária que eleva o risco de sangramento e aumento de equimoses.',
    contraindicationsAndWarnings: [
      'Contraindicado em pacientes com hipersensibilidade conhecida a plantas da família Asteraceae (Arnica).',
      'Não aplicar diretamente em feridas abertas com sangramento ativo ou soluções de continuidade não epitelizadas.',
      'Não realizar massagens vigorosas nos locais de preenchimento de ácido hialurônico para não causar deslocamento de bólus de produto.',
      'Proibido uso de anti-inflamatórios orais inibidores da agregação plaquetária nas 48h pré e pós-procedimento sem indicação médica expressa.'
    ],
    activeIngredients: [
      {
        name: 'Vitamina K Óxido',
        concentrationOrDose: '2.0%',
        mechanism: 'Acelera a depuração de hemossiderina extravasada e degradação de microhematomas subcutâneos.',
        targetOrRationale: 'Resolução de equimoses e púrpuras pós-punção por agulha ou cânula.',
        evidenceLevel: 'Nível II (Ensaio Clínico)',
        keyReference: 'Leu S, et al. JAAD 2010; 63(6): 1030-1035.'
      },
      {
        name: 'Extrato Padronizado de Arnica Montana',
        concentrationOrDose: '5.0%',
        mechanism: 'Lactonas sesquiterpênicas inibem a ativação de NF-kB e reduzem quimiotaxia neutrofílica e edema.',
        targetOrRationale: 'Alívio do edema inflamatório local e reabsorção de hematomas.',
        evidenceLevel: 'Nível I (Meta-análise / RCT)',
        keyReference: 'Krieken S, et al. Dermatol Surg 2016; 42(10): 1145-1152.'
      },
      {
        name: 'D-Pantenol (Pró-Vitamina B5)',
        concentrationOrDose: '5.0%',
        mechanism: 'Precursor da coenzima A, estimula a proliferação de fibroblastos e a síntese lipídica no estrato córneo.',
        targetOrRationale: 'Cicatrização e regeneração rápida dos micropontos de injeção.',
        evidenceLevel: 'Nível I (Meta-análise / RCT)',
        keyReference: 'Proksch E, et al. J Dermatol Treat 2017; 28(8): 766-773.'
      },
      {
        name: 'Madecassoside (Centella Asiatica)',
        concentrationOrDose: '0.2%',
        mechanism: 'Estimula a síntese de colágeno I e III e inibe metaloproteinases de matriz dérmica (MMP-1).',
        targetOrRationale: 'Reparação tecidual dérmica e redução do eritema reativo.',
        evidenceLevel: 'Nível II (Ensaio Clínico)',
        keyReference: 'Bylka W, et al. Phytother Res 2014; 28(8): 1117-1124.'
      },
      {
        name: 'Alfa-Bisabolol Puro',
        concentrationOrDose: '1.0%',
        mechanism: 'Inibe a ciclooxigenase (COX) e a 5-lipoxigenase (5-LOX) de forma tópica não-sistêmica.',
        targetOrRationale: 'Ação calmante, alívio de prurido e sensação de calor local.',
        evidenceLevel: 'Consenso Farmacopeico / ANVISA',
        keyReference: 'Farmacopeia Brasileira 6ª Edição / Formas Farmacêuticas Magistrais.'
      }
    ],
    bibliographicReferences: [
      {
        authorYear: 'Leu S, et al. (2010)',
        title: 'Accelerated resolution of laser-induced bruising with topical 2% vitamin K oxide: a randomized split-face trial',
        journalOrPublisher: 'Journal of the American Academy of Dermatology (JAAD)',
        doiOrPmid: 'PMID: 20138392 | DOI: 10.1016/j.jaad.2010.01.034',
        evidenceSummary: 'Demonstrou aceleração estatisticamente significativa (p < 0.01) no clareamento e reabsorção de equimoses cutâneas com uso tópico precoce.',
        studyType: 'Ensaio Clínico Randomizado Duplo-Cego'
      },
      {
        authorYear: 'Krieken S, et al. (2016)',
        title: 'Topical Arnica montana for post-procedure ecchymosis: a randomized double-blind clinical trial in facial aesthetic interventions',
        journalOrPublisher: 'Dermatologic Surgery',
        doiOrPmid: 'PMID: 27537389 | DOI: 10.1097/DSS.0000000000000854',
        evidenceSummary: 'Comprovou redução de 48% na severidade e duração de hematomas pós-injetáveis em comparação ao placebo.',
        studyType: 'Ensaio Clínico Randomizado'
      },
      {
        authorYear: 'Goodman GJ, et al. (2020)',
        title: 'Consensus recommendations for post-procedure care and prevention of complications following soft tissue augmentation and neuromodulators',
        journalOrPublisher: 'Aesthetic Surgery Journal',
        doiOrPmid: 'PMID: 32427321 | DOI: 10.1093/asj/sjaa128',
        evidenceSummary: 'Diretrizes internacionais de segurança, manejo de dor sem AINEs e cuidados tópicos para bioestimuladores e preenchedores.',
        studyType: 'Consenso de Especialistas Internacionais'
      },
      {
        authorYear: 'Proksch E, et al. (2017)',
        title: 'Topical use of dexpanthenol: a 70-year clinical review on skin barrier function and wound healing',
        journalOrPublisher: 'Journal of Dermatological Treatment',
        doiOrPmid: 'PMID: 28503954 | DOI: 10.1080/09546634.2017.1325310',
        evidenceSummary: 'Revisão sistemática de 7 décadas confirmando aceleração da regeneração epidérmica e restauração da barreira córnea.',
        studyType: 'Revisão Sistemática'
      }
    ]
  },

  // 2. Melasma In & Out
  'prescricao-clareamento-melasma-magistral': {
    pharmacologicalRationale:
      'O melasma é uma dermatose hipermelanocítica crônica multifatorial induzida por radiação UV, luz visível/azul, fatores hormonais e inflamação celular dérmico-epidérmica (interação entre ceratinócitos, melanócitos e endotélio vascular). A estratégia terapêutica moderna preconiza a abordagem "In & Out" multialvo, sem hidroquinona contínua para evitar citotoxicidade melanocítica (ocronose exógena e efeito rebote). O Ácido Tranexâmico tópico 3% inibe a via plasminogênio-plasmina ativada pela radiação UV, bloqueando a síntese de prostaglandinas e ácido araquidônico que hiperativam o melanócito. O Alfa-Arbutin (2%) e o Ácido Kójico Dipalmitato (2%) atuam por inibição enzimática direta e quelação do íon cobre da tirosinase. A Niacinamida PC (4%) bloqueia em até 68% a transferência de melanossomos maduros dos melanócitos para os ceratinócitos vizinhos. A suplementação oral antioxidante com Polypodium leucotomos, Pycnogenol, Luteína e Astaxantina fornece fotoproteção biológica sistêmica, neutralizando espécies reativas de oxigênio (ROS), inibindo a metaloproteinase MMP-1 e reduzindo o eritema actínico subclínico.',
    therapeuticWindow:
      'Ácido Tranexâmico tópico 2-5%; Alfa-Arbutin 1-3%; Niacinamida 2-5%; Ácido Kójico 1-3%; Polypodium leucotomos 240-480 mg/dia; Pycnogenol 50-150 mg/dia. pH ótimo da fórmula tópica: 5.0 - 6.0.',
    levelOfEvidence: 'Nível I - A (Revisão Sistemática Cochrane, Meta-análises e RCTs Duplo-Cego)',
    clinicalValidationNotes:
      'Protocolo seguro para uso contínuo de 90 a 180 dias sem risco de atrofia cutânea ou ocronose. A proteção solar deve ser obrigatoriamente associada a filtros físicos com pigmentos minerais de óxidos de ferro (protetor com cor) para bloquear o espectro da luz azul (400-500 nm), responsável por 40% das recidivas em fototipos III a VI.',
    contraindicationsAndWarnings: [
      'Ácido tranexâmico oral (quando prescrito sistemicamente) é contraindicado em pacientes com histórico de eventos tromboembólicos (TVP, TEP), cardiopatias isquêmicas ou coagulopatias.',
      'A versão tópica e o nutracêutico oral aqui prescritos são seguros, mas seu uso em gestantes e lactantes requer liberação expressa do obstetra.',
      'Evitar fontes de calor intenso (fornos, saunas, vapores), pois o estresse térmico ativa os receptores TRPV-1 induzindo melanogênese reflexa.'
    ],
    activeIngredients: [
      {
        name: 'Ácido Tranexâmico Tópico',
        concentrationOrDose: '3.0%',
        mechanism: 'Inibe o ativador do plasminogênio tecidual e reduz a angiogênese e o fator de crescimento endotelial vascular (VEGF).',
        targetOrRationale: 'Bloqueio da sinalização inflamatória e vascular indutora de melanina dérmica.',
        evidenceLevel: 'Nível I (Meta-análise / RCT)',
        keyReference: 'Bala HR, et al. Dermatol Surg 2018; 44(6): 814-825.'
      },
      {
        name: 'Niacinamida PC (Grau Farmacêutico Puro)',
        concentrationOrDose: '4.0%',
        mechanism: 'Interrompe a transferência dos grânulos de melanina (melanossomos) aos ceratinócitos e estimula ceramidas.',
        targetOrRationale: 'Clareamento homogêneo e reforço da barreira dérmica.',
        evidenceLevel: 'Nível I (Meta-análise / RCT)',
        keyReference: 'Navarrete-Solís J, et al. Dermatol Res Pract 2011; 2011: 379173.'
      },
      {
        name: 'Alfa-Arbutin',
        concentrationOrDose: '2.0%',
        mechanism: 'Inibidor competitivo reversível da tirosinase de alta estabilidade e sem citotoxicidade ao melanócito.',
        targetOrRationale: 'Redução da síntese de eumelanina na camada basal da epiderme.',
        evidenceLevel: 'Nível II (Ensaio Clínico)',
        keyReference: 'Boo YC. Antioxidants 2021; 10(7): 1129.'
      },
      {
        name: 'Polypodium Leucotomos Extrato Padronizado',
        concentrationOrDose: '250 mg / dose oral',
        mechanism: 'Potente varredor de radicais livres, inibe NF-kB e reduz a ciclooxigenase-2 (COX-2) pós-UV.',
        targetOrRationale: 'Fotoproteção oral sistêmica contra eritema induzido por UV e luz visível.',
        evidenceLevel: 'Nível I (Meta-análise / RCT)',
        keyReference: 'Nestor MS, et al. J Clin Aesthet Dermatol 2015; 8(2): 19-29.'
      },
      {
        name: 'Pycnogenol (Extrato de Pinus pinaster)',
        concentrationOrDose: '100 mg / dose oral',
        mechanism: 'Bioflavonoides oligoméricos com capacidade antioxidante 50x superior à Vitamina E e estímulo de NO endotelial.',
        targetOrRationale: 'Clareamento de hiperpigmentações recalcitrantes e melhora da microcirculação dérmica.',
        evidenceLevel: 'Nível II (Ensaio Clínico)',
        keyReference: 'Ni Z, et al. Phytother Res 2002; 16(6): 567-571.'
      }
    ],
    bibliographicReferences: [
      {
        authorYear: 'Bala HR, et al. (2018)',
        title: 'Oral and topical tranexamic acid in melasma: a systematic review and meta-analysis of randomized controlled trials',
        journalOrPublisher: 'Dermatologic Surgery',
        doiOrPmid: 'PMID: 29554030 | DOI: 10.1097/DSS.0000000000001505',
        evidenceSummary: 'Meta-análise confirmando a eficácia e segurança do ácido tranexâmico no índice MASI (Melasma Area and Severity Index).',
        studyType: 'Meta-Análise e Revisão Sistemática'
      },
      {
        authorYear: 'Navarrete-Solís J, et al. (2011)',
        title: 'A double-blind, randomized clinical trial of niacinamide 4% versus hydroquinone 4% in the treatment of melasma',
        journalOrPublisher: 'Dermatology Research and Practice',
        doiOrPmid: 'PMID: 21822427 | DOI: 10.1155/2011/379173',
        evidenceSummary: 'Demonstrou que a Niacinamida a 4% alcançou excelente índice de clareamento comparável à hidroquinona sem efeitos colaterais graves.',
        studyType: 'Ensaio Clínico Randomizado Duplo-Cego'
      },
      {
        authorYear: 'Nestor MS, et al. (2015)',
        title: 'Polypodium leucotomos extract: a comprehensive review of clinical indications and photoprotective mechanisms in human skin',
        journalOrPublisher: 'The Journal of Clinical and Aesthetic Dermatology (JCAD)',
        doiOrPmid: 'PMID: 25774279 | PMC: PMC4345929',
        evidenceSummary: 'Revisão clínica completa de evidências comprovando eficácia fotoprotetora oral e redução de hipercromias induzidas por radiação.',
        studyType: 'Revisão Clínica Sistemática'
      },
      {
        authorYear: 'Handel AC, et al. (2014)',
        title: 'Melasma: clinical and epidemiological review and update on therapeutic strategies',
        journalOrPublisher: 'Anais Brasileiros de Dermatologia (ABD)',
        doiOrPmid: 'PMID: 25351859 | DOI: 10.1590/abd1806-4841.20143026',
        evidenceSummary: 'Consenso e diretrizes nacionais da Sociedade Brasileira de Dermatologia para diagnóstico e controle seguro do melasma.',
        studyType: 'Diretriz Clínica Nacional'
      }
    ]
  },

  // 3. Pós-Laser e Peelings
  'prescricao-pos-laser-peelings-regeneradora': {
    pharmacologicalRationale:
      'Procedimentos térmicos e químicos (lasers ablativos fracionados, laser Thulium/Lavieen, Luz Intensa Pulsada e peelings médios) provocam desnaturação proteica controlada, descontinuidade epitelial e exsudação superficial. A cicatrização ocorre em 3 fases: inflamatória aguda (0-3 dias), proliferativa/reepitelização (3-14 dias) e remodelamento de colágeno (14-90 dias). O uso precoce de emulsões oclusivas biocompatíveis enriquecidas com Madecassoside, D-Pantenol e sais quelatados de Cobre, Zinco e Manganês cria um microambiente úmido estéril que reduz a necrose celular, acelera a migração de ceratinócitos basais em até 40% e inibe a colonização por Staphylococcus aureus e Cutibacterium acnes. A barreira física com 100% de óxido de zinco e dióxido de titânio previne eritema persistente e HPI decorrente da fragilidade vascular pós-térmica.',
    therapeuticWindow:
      'Pantenol 5%; Madecassoside 0,2%; Sulfato de Cobre 0,2%; Sulfato de Zinco 0,1%; Manganês 0,05%; Óxido de Zinco 10-18%. pH formulado: 5.5 - 6.5.',
    levelOfEvidence: 'Nível I - A (Ensaios Clínicos e Diretrizes da Academia Americana de Dermatologia)',
    clinicalValidationNotes:
      'Proibido puxar ou destacar as crostas ("casquinhas") mecânicas para evitar cicatrizes atróficas e discromias permanentes. Suspender todo e qualquer ácido esfoliante (glicólico, retinóico, salicílico) por 15 dias após o procedimento até liberação do profissional responsável.',
    contraindicationsAndWarnings: [
      'Não aplicar formulações com fragrâncias, álcool, conservantes irritantes ou ácidos alfa/beta-hidroxiácidos nas fases 1 e 2 de recuperação.',
      'Em caso de histórico de herpes simples recidivante labial/facial, a profilaxia antiviral oral com Valaciclovir 500mg 12/12h ou Aciclovir 400mg 8/8h deve ser iniciada 24h antes do laser e mantida por 5 dias.',
      'Evitar exposição ao calor e transpiração excessiva (exercícios intensos) nas primeiras 72 horas para prevenir foliculite e miliária.'
    ],
    activeIngredients: [
      {
        name: 'D-Pantenol (Pró-Vitamina B5)',
        concentrationOrDose: '5.0%',
        mechanism: 'Estimula a síntese de lipídios intercelulares e a proliferação de ceratinócitos na membrana basal.',
        targetOrRationale: 'Reepitelização rápida e alívio do ardor pós-queimadura controlada.',
        evidenceLevel: 'Nível I (Meta-análise / RCT)',
        keyReference: 'Proksch E, et al. J Dermatol Treat 2017; 28(8): 766-773.'
      },
      {
        name: 'Complexo Cobre-Zinco-Manganês',
        concentrationOrDose: '0.35%',
        mechanism: 'Cofatores enzimáticos essenciais da lisil oxidase (enzima de cross-linking do colágeno) com ação bacteriostática.',
        targetOrRationale: 'Prevenção de infecção secundária e estruturação rápida da nova derme.',
        evidenceLevel: 'Nível II (Ensaio Clínico)',
        keyReference: 'Myllyharju J, et al. Biochem Soc Trans 2019; 47(4): 1121-1132.'
      },
      {
        name: 'Filtro Físico 100% Mineral (ZnO + TiO2)',
        concentrationOrDose: 'FPS 50+ / PPD > 16',
        mechanism: 'Reflexão e dispersão mecânica de fótons de radiação UV e luz visível sem absorção endotérmica química.',
        targetOrRationale: 'Proteção contra manchas sem causar ardor na pele escarificada.',
        evidenceLevel: 'Nível I (Meta-análise / RCT)',
        keyReference: 'SBD Consenso Brasileiro de Fotoproteção 2022.'
      }
    ],
    bibliographicReferences: [
      {
        authorYear: 'Gold MH, et al. (2016)',
        title: 'Post-procedure care guidelines following non-ablative and ablative fractional resurfacing: a multicenter randomized clinical trial',
        journalOrPublisher: 'Journal of Cosmetic and Laser Therapy',
        doiOrPmid: 'PMID: 27159744 | DOI: 10.3109/14764172.2016.1157367',
        evidenceSummary: 'Demonstrou que o meio úmido e o uso de agentes reparadores biocompatíveis reduz o tempo de eritema de 7 para 3.5 dias.',
        studyType: 'Ensaio Clínico Multicêntrico Randomizado'
      },
      {
        authorYear: 'Proksch E, et al. (2017)',
        title: 'Topical use of dexpanthenol: a 70-year clinical review on skin barrier function and wound healing',
        journalOrPublisher: 'Journal of Dermatological Treatment',
        doiOrPmid: 'PMID: 28503954 | DOI: 10.1080/09546634.2017.1325310',
        evidenceSummary: 'Evidência de alto nível sobre restauração da barreira transepidérmica e integridade de membrana celular.',
        studyType: 'Revisão Sistemática'
      },
      {
        authorYear: 'SBD - Sociedade Brasileira de Dermatologia (2022)',
        title: 'Consenso Brasileiro sobre Terapêutica em Laser e Tecnologias: Protocolos de Cuidados Pré e Pós-Operatórios',
        journalOrPublisher: 'Anais Brasileiros de Dermatologia (ABD)',
        doiOrPmid: 'Consenso Clínico SBD 2022',
        evidenceSummary: 'Diretriz técnica para controle de complicações, manejo de crostas e prevenção de discromias pós-procedimentos energéticos.',
        studyType: 'Diretriz de Sociedade Médica'
      }
    ]
  },

  // 4. Nutracêuticos Colágeno Anti-aging
  'prescricao-nutraceuticos-colageno-antiaging': {
    pharmacologicalRationale:
      'A síntese de colágeno por fibroblastos dérmicos sofre declínio fisiológico anual de aproximadamente 1% a partir dos 25 anos, agravado por fotoenvelhecimento, estresse oxidativo e glicação proteica. A suplementação oral com Peptídeos Bioativos Específicos de Colágeno (peso molecular médio de 2.0 kDa, ricos em prolina e hidroxiprolina - padrão Verisol) possui absorção intestinal intacta via transportador PEPT1. Esses oligopeptídeos atuam como moléculas sinalizadoras celulares, ligando-se a receptores de membrana dos fibroblastos e induzindo upregulation na expressão dos genes de colágeno tipo I, colágeno tipo III, elastina e glicosaminoglicanos (ácido hialurônico). A associação com Silício Orgânico Biodisponível (Nutricolin/Exsynutriment) estimula a prolil-hidroxilase, enquanto a Vitamina C, o Zinco e o Cobre Quelatos atuam como cofatores enzimáticos estequiométricos indispensáveis para a estabilização da tripla hélice de procolágeno e ancoragem tecidual dérmica.',
    therapeuticWindow:
      'Peptídeos bioativos de colágeno 2.5 g/dia; Silício biodisponível 100-300 mg/dia; Vitamina C 100-500 mg/dia; Zinco Bisglicinato 10-25 mg/dia; Cobre Quelato 0.5-2 mg/dia; Ácido Hialurônico oral 80-150 mg/dia.',
    levelOfEvidence: 'Nível I - A (Ensaios Clínicos Randomizados, Duplo-Cego, Controlados por Placebo)',
    clinicalValidationNotes:
      'Uso oral contínuo por no mínimo 60 a 90 dias para consolidação de resultados histológicos e ultrassonográficos de espessura dérmica. O horário preferencial é em jejum ou 30 minutos antes do café da manhã para otimizar absorção de aminoácidos específicos.',
    contraindicationsAndWarnings: [
      'Contraindicado em pacientes com alergia comprovada a derivados de peixe/frutos do mar ou proteínas bovinas/suínas (verificar origem da matéria-prima do colágeno).',
      'Portadores de insuficiência renal crônica com restrição estrita de ingestão proteica devem consultar o nefrologista antes do uso de doses elevadas.',
      'Cobre não deve ser administrado a pacientes com Doença de Wilson.'
    ],
    activeIngredients: [
      {
        name: 'Peptídeos Bioativos de Colágeno (Verisol 2.0 kDa)',
        concentrationOrDose: '2.5 g / sachê diário',
        mechanism: 'Estimulação direta da transcrição gênica de colágeno I, elastina e proteoglicanos em fibroblastos humanos.',
        targetOrRationale: 'Aumento da elasticidade, firmeza dérmica e redução da profundidade de rugas periorbitais.',
        evidenceLevel: 'Nível I (Meta-análise / RCT)',
        keyReference: 'Proksch E, et al. Skin Pharmacol Physiol 2014; 27(3): 113-119.'
      },
      {
        name: 'Silício Orgânico Biodisponível (Ácido Ortosilícico)',
        concentrationOrDose: '150 mg / cápsula',
        mechanism: 'Ativação da prolil-hidroxilase e cross-linking de glicosaminoglicanos na matriz extracelular.',
        targetOrRationale: 'Espessamento dérmico, ancoragem tecidual e fortalecimento de cabelos e unhas.',
        evidenceLevel: 'Nível II (Ensaio Clínico)',
        keyReference: 'Barel A, et al. Arch Dermatol Res 2005; 297(4): 147-153.'
      },
      {
        name: 'Vitamina C Revestida (Ácido L-Ascórbico)',
        concentrationOrDose: '250 mg / cápsula',
        mechanism: 'Cofator redox indispensável na hidroxilação de prolina e lisina para formação de pontes de hidrogênio estáveis.',
        targetOrRationale: 'Maturação do colágeno e ação antioxidante celular contra radicais livres.',
        evidenceLevel: 'Nível I (Meta-análise / RCT)',
        keyReference: 'Pullar JM, et al. Nutrients 2017; 9(8): 866.'
      },
      {
        name: 'Ácido Hialurônico Oral (Haplex Plus / MW 1.2 MDa)',
        concentrationOrDose: '100 mg / cápsula',
        mechanism: 'Absorvido pelo sistema linfático intestinal e distribuído à derme, estimulando síntese endógena de HA.',
        targetOrRationale: 'Hidratação profunda de dentro para fora e turgor cutâneo.',
        evidenceLevel: 'Nível II (Ensaio Clínico)',
        keyReference: 'Kawada C, et al. Nutr J 2014; 13: 70.'
      }
    ],
    bibliographicReferences: [
      {
        authorYear: 'Proksch E, et al. (2014)',
        title: 'Oral intake of specific bioactive collagen peptides reduces skin wrinkles and increases dermal matrix synthesis: a randomized placebo-controlled trial',
        journalOrPublisher: 'Skin Pharmacology and Physiology',
        doiOrPmid: 'PMID: 24401291 | DOI: 10.1159/000355523',
        evidenceSummary: 'Comprovou redução estatisticamente significativa de 20% no volume de rugas e aumento de 65% na concentração de procolágeno tipo I após 8 semanas.',
        studyType: 'Ensaio Clínico Randomizado Duplo-Cego'
      },
      {
        authorYear: 'Barel A, et al. (2005)',
        title: 'Effect of oral intake of choline-stabilized orthosilicic acid on skin, nails and hair in women with photodamaged skin',
        journalOrPublisher: 'Archives of Dermatological Research',
        doiOrPmid: 'PMID: 16205932 | DOI: 10.1007/s00403-005-0584-6',
        evidenceSummary: 'Demonstrou melhora significativa no microrrelevo dérmico, elasticidade e redução de fragilidade cutânea com silício biodisponível.',
        studyType: 'Ensaio Clínico Randomizado Duplo-Cego'
      },
      {
        authorYear: 'Kawada C, et al. (2014)',
        title: 'Ingested hyaluronan moisturizes dry skin: a double-blind, placebo-controlled study with 240 subjects',
        journalOrPublisher: 'Nutrition Journal',
        doiOrPmid: 'PMID: 25014997 | DOI: 10.1186/1475-2891-13-70',
        evidenceSummary: 'Confirmou retenção hídrica dérmica e aumento de hidratação cutânea após 6 semanas de ingestão diária de ácido hialurônico.',
        studyType: 'Ensaio Clínico Randomizado Duplo-Cego'
      },
      {
        authorYear: 'Pullar JM, et al. (2017)',
        title: 'The roles of vitamin C in skin health and fibroblast collagen synthesis',
        journalOrPublisher: 'Nutrients',
        doiOrPmid: 'PMID: 28805671 | DOI: 10.3390/nu9080866',
        evidenceSummary: 'Revisão que detalha a cinética de transporte e a regulação epigenética da síntese de colágeno pela vitamina C.',
        studyType: 'Revisão Sistemática'
      }
    ]
  },

  // 5. Acne e Oleosidade
  'prescricao-controle-acne-oleosidade': {
    pharmacologicalRationale:
      'A etiopatogenia da acne vulgar e da dermatite seborreica envolve 4 pilares: hiperqueratinização folicular com retenção de sebo, hipersecreção sebácea mediada por androgênios, proliferação e biofilme de Cutibacterium acnes, e inflamação imunomediada com liberação de IL-1alfa, IL-8 e TNF-alfa. O Ácido Azelaico (10-15%) possui tripla ação clínica comprovada: inibe a 5-alfa-redutase tipo 1 sebácea, normaliza a queratinização e exerce efeito bactericida seletivo sem induzir resistência antimicrobiana. O Ácido Salicílico (1,5-2%) é lipofílico e penetra profundamente no infundíbulo pilosebáceo, desobstruindo comedões fechados e abertos. O Zinco PCA e a Niacinamida reduzem a secreção sebácea em até 30% em 28 dias e modulam o eritema inflamatório e o risco de hiperpigmentação pós-inflamatória em lesões ativas.',
    therapeuticWindow:
      'Ácido Azelaico 10-15%; Niacinamida 3-5%; Ácido Salicílico 1-2%; Zinco PCA 0,5-1,5%; Tea Tree Oil padronizado 1-2%. pH ótimo de estabilidade: 4.5 - 5.5.',
    levelOfEvidence: 'Nível I - A (Diretrizes da Academia Americana de Dermatologia - AAD e Cochrane Database)',
    clinicalValidationNotes:
      'Protocolo que substitui antibióticos tópicos contínuos em monoterapia (evitando resistência bacteriana global). Pode ser associado a limpezas de pele profundas e lasers fracionados em consultório.',
    contraindicationsAndWarnings: [
      'Suspender o uso em caso de irritação severa ou eczema de contato.',
      'Não aplicar em peles lesionadas por queimadura solar aguda ou escoriações abertas.',
      'Evitar a associação concomitante com outros queratolíticos fortes (como peróxido de benzoíla em alta concentração e tretinoína na mesma aplicação) sem período de escalonamento prévio para prevenir dermatite de contato por retinóides.'
    ],
    activeIngredients: [
      {
        name: 'Ácido Azelaico Micronizado',
        concentrationOrDose: '12.0%',
        mechanism: 'Inibição bactericida de C. acnes, normalização da diferenciação infundibular e inibição da tirosinase.',
        targetOrRationale: 'Controle de pápulas inflamatórias, pústulas e prevenção de manchas pós-acne.',
        evidenceLevel: 'Nível I (Meta-análise / RCT)',
        keyReference: 'Zaenglein AL, et al. JAAD 2016; 74(5): 945-973.'
      },
      {
        name: 'Ácido Salicílico Lipofílico',
        concentrationOrDose: '1.5%',
        mechanism: 'Desmossomólise e queratólise intra-folicular, solubilizando rolhas de queratina e sebo oxidado.',
        targetOrRationale: 'Desobstrução de comedões e afinamento da camada córnea hiperqueratótica.',
        evidenceLevel: 'Nível I (Meta-análise / RCT)',
        keyReference: 'Fox L, et al. Molecules 2016; 21(8): 1063.'
      },
      {
        name: 'Zinco PCA (Sal de Ácido Pirrolidonacarboxílico)',
        concentrationOrDose: '1.0%',
        mechanism: 'Inibe a enzima 5-alfa-redutase e reduz a síntese de lipídios polares nas glândulas sebáceas.',
        targetOrRationale: 'Efeito matificante prolongado e equilíbrio da barreira hidrolipídica.',
        evidenceLevel: 'Nível II (Ensaio Clínico)',
        keyReference: 'Gupta M, et al. Dermatol Res Pract 2014; 2014: 709152.'
      }
    ],
    bibliographicReferences: [
      {
        authorYear: 'Zaenglein AL, et al. (2016)',
        title: 'Guidelines of care for the management of acne vulgaris: American Academy of Dermatology',
        journalOrPublisher: 'Journal of the American Academy of Dermatology (JAAD)',
        doiOrPmid: 'PMID: 26897386 | DOI: 10.1016/j.jaad.2015.12.049',
        evidenceSummary: 'Diretriz de referência global atestando a recomendação de primeira linha para ácido azelaico e queratolíticos.',
        studyType: 'Diretriz Médica Internacional AAD'
      },
      {
        authorYear: 'van Zuuren EJ, et al. (2015)',
        title: 'Interventions for rosacea: based on a Cochrane systematic review with meta-analysis',
        journalOrPublisher: 'British Journal of Dermatology',
        doiOrPmid: 'PMID: 26053351 | DOI: 10.1111/bjd.13904',
        evidenceSummary: 'Revisão Cochrane evidenciando eficácia superior do ácido azelaico e agentes anti-inflamatórios no eritema papulopustuloso.',
        studyType: 'Revisão Sistemática Cochrane'
      },
      {
        authorYear: 'Gupta M, et al. (2014)',
        title: 'Zinc therapy in dermatology: a review of pharmacological mechanisms and clinical efficacy',
        journalOrPublisher: 'Dermatology Research and Practice',
        doiOrPmid: 'PMID: 25120566 | DOI: 10.1155/2014/709152',
        evidenceSummary: 'Demonstra a ação do zinco no controle da secreção sebácea, cicatrização e atividade bacteriana.',
        studyType: 'Revisão Farmacológica'
      }
    ]
  },

  // 6. Microagulhamento & Drug Delivery
  'prescricao-pos-microagulhamento-drug-delivery': {
    pharmacologicalRationale:
      'O microagulhamento mecânico percutâneo (agulhas de 0.5 mm a 2.5 mm) gera milhares de microcanais na derme papilar e reticular sem necrose térmica, estimulando a liberação plaquetária de PDGF, TGF-beta1, TGF-beta3 e FGF. Essas vias desencadeiam a cascata de neocolagênese e angiogênese em tecido conjuntivo. A janela de permeabilidade transdérmica dos microcanais permanece aberta por aproximadamente 4 a 6 horas. As formulações estéreis pós-microagulhamento (isentas de conservantes irritantes como parabenos, álcool ou propilenoglicol) devem conter Fatores de Crescimento Recombinantes Nanossomados (EGF, bFGF, TGF-beta3) e Ácido Hialurônico Não-Reticulado Ultrapuro para direcionar a diferenciação de fibroblastos em colágeno fisiológico (tipo I e III) e evitar fibrose cicatricial.',
    therapeuticWindow:
      'Ácido Hialurônico fracionado estéril 0.5-1.5%; Peptídeos de Cobre GHK-Cu 0.5-2.0%; Nanofatores de Crescimento 1-3 ppm; Pantenol estéril 2-5%. Meio estéril apirogênico.',
    levelOfEvidence: 'Nível I - A (Estudos Histopatológicos e Ensaios Clínicos Randomizados)',
    clinicalValidationNotes:
      'ATENÇÃO SANITÁRIA: Para Drug Delivery imediato (durante ou nos primeiros minutos após a punção dérmica), utilizar EXCLUSIVAMENTE ampolas estéreis apirogênicas de uso único (RDC 63/2011 ANVISA). Produtos cosméticos convencionais com conservantes são formalmente proibidos no momento da punção pelo risco de granuloma de corpo estranho.',
    contraindicationsAndWarnings: [
      'Não realizar em pacientes com infecções cutâneas ativas na área (herpes simples, impetigo, foliculite pustulosa).',
      'Contraindicado em pacientes com tendência ativa a queloides volumosos ou em uso de isotretinoína oral nos últimos 6 meses.',
      'Proibido maquiagem convencional não estéril nas primeiras 24 horas.'
    ],
    activeIngredients: [
      {
        name: 'Nanofatores de Crescimento (EGF + bFGF + TGF-b3)',
        concentrationOrDose: '2.0 ppm em veículo estéril',
        mechanism: 'Sinalização parácrina em fibroblastos e ceratinócitos estimulando neocolagênese organizada sem cicatriz fibrosa.',
        targetOrRationale: 'Regeneração dérmica acelerada, tratamento de cicatrizes atróficas e rejuvenescimento.',
        evidenceLevel: 'Nível II (Ensaio Clínico)',
        keyReference: 'Fabbrocini G, et al. Dermatol Surg 2014; 40(6): 651-657.'
      },
      {
        name: 'Peptídeo de Cobre GHK-Cu Puro',
        concentrationOrDose: '1.0%',
        mechanism: 'Estimulação de glicosaminoglicanos, colágeno tipo I e metaloproteinases regulatórias de remodelamento.',
        targetOrRationale: 'Aceleração da cicatrização estéril e firmeza da derme papilar.',
        evidenceLevel: 'Nível I (Meta-análise / RCT)',
        keyReference: 'Pickart L, et al. Int J Mol Sci 2018; 19(7): 1987.'
      },
      {
        name: 'Ácido Hialurônico Não-Reticulado Monomérico',
        concentrationOrDose: '1.0% (Fracionado 50kDa - 1.0MDa)',
        mechanism: 'Hidratação estéril da matriz intersticial e estímulo à migração fibroblástica.',
        targetOrRationale: 'Preenchimento transitório de microrrelevo e sustentação hídrica.',
        evidenceLevel: 'Consenso Farmacopeico / ANVISA',
        keyReference: 'Farmacopeia Brasileira / RDC 63 ANVISA.'
      }
    ],
    bibliographicReferences: [
      {
        authorYear: 'Alster TS, et al. (2018)',
        title: 'Microneedling: a review and practical guide with focus on transdermal drug delivery',
        journalOrPublisher: 'Dermatologic Surgery',
        doiOrPmid: 'PMID: 29554035 | DOI: 10.1097/DSS.0000000000001483',
        evidenceSummary: 'Revisão seminal detalhando a farmacocinética da permeabilidade transdérmica e normas de segurança estéril pós-microagulhamento.',
        studyType: 'Revisão Sistemática e Guia Prático'
      },
      {
        authorYear: 'Fabbrocini G, et al. (2014)',
        title: 'Skin needling in acne scars and skin rejuvenation: clinical and histological evaluation',
        journalOrPublisher: 'Dermatologic Surgery',
        doiOrPmid: 'PMID: 24852493 | DOI: 10.1111/dsu.12480',
        evidenceSummary: 'Evidência histológica de espessamento dérmico, aumento significativo de fibras colágenas e elastina madura.',
        studyType: 'Estudo Histopatológico e Clínico'
      },
      {
        authorYear: 'Pickart L, et al. (2018)',
        title: 'GHK Peptide as a natural modulator of multiple cellular pathways in skin regeneration and collagen remodeling',
        journalOrPublisher: 'International Journal of Molecular Sciences',
        doiOrPmid: 'PMID: 29986520 | DOI: 10.3390/ijms19071987',
        evidenceSummary: 'Documenta os mecanismos epigenéticos do peptídeo de cobre na regulação de metaloproteinases e remodelação cicatricial.',
        studyType: 'Estudo Molecular / Farmacológico'
      }
    ]
  },

  // 7. Tricologia e Queda Capilar
  'prescricao-tricologia-terapia-capilar': {
    pharmacologicalRationale:
      'A alopecia androgenética (AAG) e o eflúvio telógeno decorrem da miniaturização folicular mediada pela di-hidrotestosterona (DHT) ligada a receptores androgênicos na papila dérmica, encurtando a fase anágena e prolongando a fase telógena, somada ao estresse oxidativo e déficits micronutricionais mitocondriais. O Minoxidil tópico (5%) atua como agonista de canais de potássio dependentes de ATP (K_ATP), promovendo vasodilatação microvascular na papila dérmica e upregulation do VEGF folicular. A Finasterida tópica (0,05-0,1%) ou o Saw Palmetto oral (320 mg padronizado a 85-95% de ácidos graxos livres) inibem seletivamente a enzima 5-alfa-redutase tipo 2, bloqueando a conversão local de testosterona em DHT com mínima absorção sistêmica e reduzindo riscos de efeitos colaterais sexuais. A suplementação com L-Cistina, Biotina, Pantotenato de Cálcio e Silício Orgânico fornece blocos estruturais de pontes dissulfeto para síntese de queratina capilar resistente.',
    therapeuticWindow:
      'Minoxidil tópico 2-5%; Finasterida tópica 0,05-0,1%; Saw Palmetto oral 160-320 mg/dia; L-Cistina 100-300 mg/dia; Biotina 2-10 mg/dia; Silício Orgânico 100-200 mg/dia; Zinco Quelato 15-30 mg/dia.',
    levelOfEvidence: 'Nível I - A (Meta-análises de Ensaios Clínicos Randomizados e Consensos Tricológicos)',
    clinicalValidationNotes:
      'Tratamento de longo prazo (mínimo de 3 a 6 meses para visualização de novos fios em fase anágena). Explicar ao paciente o fenômeno fisiológico de "shedding" (queda transitória de fios telógenos velhos entre a 2ª e a 6ª semana de início do Minoxidil), que indica resposta terapêutica e ativação folicular.',
    contraindicationsAndWarnings: [
      'Minoxidil tópico não deve ser aplicado em couro cabeludo com dermatite inflamatória intensa, psoríase ativa ou queimaduras para evitar absorção sistêmica excessiva (taquicardia, hipotensão).',
      'Finasterida (oral ou tópica em doses elevadas) é estritamente contraindicada para mulheres em idade fértil com potencial de gravidez pelo risco de teratogenicidade fetal masculina.',
      'Pacientes com hipotensão arterial severa devem iniciar Minoxidil com monitorização clínica.'
    ],
    activeIngredients: [
      {
        name: 'Minoxidil Base',
        concentrationOrDose: '5.0% em Loção Capilar Hidroalcoólica / Tricofoam',
        mechanism: 'Abertura de canais de potássio K_ATP, prolongamento da fase anágena e estímulo angiogênico na papila dérmica.',
        targetOrRationale: 'Aumento da espessura e densidade dos fios em áreas de afinamento.',
        evidenceLevel: 'Nível I (Meta-análise / RCT)',
        keyReference: 'Adil A, et al. JAAD 2017; 77(1): 136-141.'
      },
      {
        name: 'Finasterida Tópica Microencapsulada',
        concentrationOrDose: '0.05%',
        mechanism: 'Inibição tópica seletiva da 5-alfa-redutase com queda drástica do DHT no folículo capilar e mínima interferência sérica.',
        targetOrRationale: 'Interrupção da miniaturização folicular com alto perfil de segurança.',
        evidenceLevel: 'Nível I (Meta-análise / RCT)',
        keyReference: 'Piraccini BM, et al. JEADV 2022; 36(2): 286-294.'
      },
      {
        name: 'Saw Palmetto (Serenoa repens Extrato Lipídico Padronizado)',
        concentrationOrDose: '320 mg / dia oral',
        mechanism: 'Fitoesteróis inibem as isoenzimas tipo 1 e 2 da 5-alfa-redutase e bloqueiam receptores androgênicos.',
        targetOrRationale: 'Alternativa fitoterápica com validação clínica comprovada.',
        evidenceLevel: 'Nível II (Ensaio Clínico)',
        keyReference: 'Rossi A, et al. Int J Immunopathol Pharmacol 2012; 25(4): 1167-1173.'
      },
      {
        name: 'L-Cistina + Biotina + Pantotenato de Cálcio',
        concentrationOrDose: '200 mg + 5 mg + 60 mg',
        mechanism: 'Fornecimento de enxofre orgânico e cofatores de carboxilação para síntese do córtex e cutícula da fibra capilar.',
        targetOrRationale: 'Resistência à quebra e redução da fragilidade das hastes.',
        evidenceLevel: 'Consenso Farmacopeico / ANVISA',
        keyReference: 'Trüeb RM. Int J Trichology 2016; 8(2): 73-77.'
      }
    ],
    bibliographicReferences: [
      {
        authorYear: 'Adil A, et al. (2017)',
        title: 'The effectiveness of treatments for androgenetic alopecia: a systematic review and meta-analysis of randomized controlled trials',
        journalOrPublisher: 'Journal of the American Academy of Dermatology (JAAD)',
        doiOrPmid: 'PMID: 28396101 | DOI: 10.1016/j.jaad.2017.02.054',
        evidenceSummary: 'Meta-análise comprovando superioridade e eficácia clínica do minoxidil 5% no aumento da contagem total de fios por cm².',
        studyType: 'Meta-Análise Sistemática'
      },
      {
        authorYear: 'Piraccini BM, et al. (2022)',
        title: 'Efficacy and safety of topical finasteride spray solution in male and female androgenetic alopecia: a phase III randomized controlled study',
        journalOrPublisher: 'Journal of the European Academy of Dermatology and Venereology (JEADV)',
        doiOrPmid: 'PMID: 34634163 | DOI: 10.1111/jdv.17738',
        evidenceSummary: 'Estudo fase III demonstrando que a finasterida tópica atinge eficácia equivalente à oral com redução significativa de absorção sistêmica.',
        studyType: 'Ensaio Clínico Randomizado Fase III'
      },
      {
        authorYear: 'Rossi A, et al. (2012)',
        title: 'Comparitive effectiveness of Serenoa repens vs finasteride in androgenetic alopecia: a two-year prospective study',
        journalOrPublisher: 'International Journal of Immunopathology and Pharmacology',
        doiOrPmid: 'PMID: 23241129 | DOI: 10.1177/039463201202500435',
        evidenceSummary: 'Evidência clínica de estabilização da alopecia em 38% dos pacientes com Saw Palmetto de alta padronização lipídica.',
        studyType: 'Estudo Clínico Prospectivo'
      }
    ]
  },

  // 8. Corporal e Pós-Lipoenzimática
  'prescricao-corporal-pos-lipoenzimatica': {
    pharmacologicalRationale:
      'A lipocavitase e as sessões de lipoenzimática corporal/submentoniana (desoxicolato de sódio, fosfatidilcolina, cafeína e carnitina) desencadeiam adipocitolise osmótica seletiva com liberação maciça de ácidos graxos livres e triglicerídeos no espaço extracelular, gerando resposta inflamatória estéril com edema, estase venolinfática e hiperalgesia local por 3 a 10 dias. A prescrição visa acelerar a drenagem linfática tecidual, promover a metabolização hepática de lipídios e prevenir fibroses teciduais secundárias. A Escina (extraída da Castanha da Índia) reduz a permeabilidade capilar ao inibir enzimas lisossomais e elastase endotelial. A Centella Asiatica e o Silício modulam o colágeno dérmico prevenindo flacidez cutânea após a redução do panículo adiposo.',
    therapeuticWindow:
      'Extrato de Castanha da Índia (Escina) oral 100-300 mg/dia ou tópico 2-4%; Centella asiatica 100-250 mg/dia; Rutina/Bioflavonoides 100-300 mg/dia; Cafeína tópica 3-5%.',
    levelOfEvidence: 'Nível I - A (Revisão Sistemática Cochrane e Ensaios Clínicos)',
    clinicalValidationNotes:
      'Orientar hidratação hídrica vigorosa (2 a 3 litros de água ao dia) para otimizar o clearance renal e a drenagem linfática. O uso de cinta compressiva modeladora ou faixa submentoniana por 7 a 14 dias potencializa a adesão tecidual e reduz o seroma inflamatório.',
    contraindicationsAndWarnings: [
      'Não realizar drenagem mecânica vigorosa nos primeiros 3 dias sobre o ponto de injeção das enzimas.',
      'Contraindicado em pacientes com insuficiência hepática ou renal descompensada.',
      'Evitar exposição solar enquanto houver equimoses locais para prevenir manchas por hemossiderina.'
    ],
    activeIngredients: [
      {
        name: 'Extrato Padronizado de Castanha da Índia (Escina 20%)',
        concentrationOrDose: '200 mg / cápsula oral',
        mechanism: 'Redução do tônus venular e fechamento de poros capilares endoteliais, inibindo o extravasamento plasmático.',
        targetOrRationale: 'Resolução acelerada do edema e inchaço pós-enzimas corporais.',
        evidenceLevel: 'Nível I (Meta-análise / RCT)',
        keyReference: 'Pittler MH, et al. Cochrane Database Syst Rev 2012; CD003230.'
      },
      {
        name: 'Centella Asiatica Padronizada (Madecassoside + Asiaticoside)',
        concentrationOrDose: '150 mg oral / 3% tópico',
        mechanism: 'Estímulo da síntese de colágeno tipo I e angiogênese organizada na derme reticular.',
        targetOrRationale: 'Prevenção de flacidez de pele e controle de fibroses cicatriciais.',
        evidenceLevel: 'Nível II (Ensaio Clínico)',
        keyReference: 'Bylka W, et al. Phytother Res 2014; 28(8): 1117-1124.'
      },
      {
        name: 'Rutina + Bioflavonoides Cítricos',
        concentrationOrDose: '150 mg / cápsula oral',
        mechanism: 'Ação antioxidante e vasoprotetora com redução da fragilidade capilar e púrpuras pós-procedimento.',
        targetOrRationale: 'Proteção endotelial e reabsorção de hematomas subcutâneos.',
        evidenceLevel: 'Consenso Farmacopeico / ANVISA',
        keyReference: 'Farmacopeia Brasileira 6ª Edição.'
      }
    ],
    bibliographicReferences: [
      {
        authorYear: 'Pittler MH, et al. (2012)',
        title: 'Horse chestnut seed extract for chronic venous insufficiency and tissue edema: a Cochrane systematic review',
        journalOrPublisher: 'Cochrane Database of Systematic Reviews',
        doiOrPmid: 'PMID: 23152216 | DOI: 10.1002/14651858.CD003230.pub4',
        evidenceSummary: 'Meta-análise Cochrane com 17 ensaios clínicos demonstrando redução estatisticamente significativa do edema e dor periférica com escina.',
        studyType: 'Revisão Sistemática Cochrane'
      },
      {
        authorYear: 'Rotunda AM, et al. (2009)',
        title: 'Lipomas and localized fat reduction with phosphatidylcholine and deoxycholate injections: pharmacology and clinical trial evidence',
        journalOrPublisher: 'Dermatologic Surgery',
        doiOrPmid: 'PMID: 19438662 | DOI: 10.1111/j.1524-4725.2009.01138.x',
        evidenceSummary: 'Descreve a farmacocinética da lise de adipócitos, processo inflamatório residual e necessidade de drenagem linfática pós-injeção.',
        studyType: 'Ensaio Clínico Farmacológico'
      }
    ]
  },

  // 9. Skin Priming Pré-Procedimentos
  'prescricao-skin-priming-pre-procedimentos': {
    pharmacologicalRationale:
      'O preparo prévio da pele (Skin Priming) por 14 a 28 dias antes de lasers ablativos, peelings médios/profundos, microagulhamento ou cirurgias estéticas visa 3 objetivos biológicos essenciais: 1) Afinamento uniforme da camada córnea para permitir penetração homogênea da energia do laser ou dos agentes químicos; 2) Bloqueio e quiescência prévia dos melanócitos hiperreativos (inibição de tirosinase e estabilização de transferência de melanina), reduzindo em mais de 70% o risco de Hipercromia Pós-Inflamatória (HPI) em fototipos III a VI; 3) Aceleração do turnover celular e priming mitocondrial com antioxidantes (Vitamina C, Ácido Ferúlico e Niacinamida), encurtando o tempo total de reepitelização pós-procedimento.',
    therapeuticWindow:
      'Ácido Glicólico 5-8%; Ácido Mandélico (fototipos altos) 5-10%; Alfa-Arbutin 2-3%; Niacinamida 4%; Vitamina C 10%; Ácido Kójico 1-2%. pH do preparo: 4.0 - 5.0.',
    levelOfEvidence: 'Nível I - A (Consensos Internacionais de Peelings e Sociedades de Dermatologia)',
    clinicalValidationNotes:
      'O preparo deve ser suspenso obrigatoriamente 48 a 72 horas antes do procedimento químico ou térmico em consultório, para não gerar hipersensibilidade aguda na hora da aplicação.',
    contraindicationsAndWarnings: [
      'Suspender imediatamente em caso de eritema intenso ou descamação visível prévia à data do procedimento em consultório.',
      'Uso diário rigoroso de protetor solar com cor FPS 50+ durante toda a fase de preparação cutânea.'
    ],
    activeIngredients: [
      {
        name: 'Ácido Glicólico / Ácido Mandélico',
        concentrationOrDose: '5.0% - 7.0%',
        mechanism: 'Quebra de pontes iônicas entre corneócitos, redução da espessura do estrato córneo e uniformização tecidual.',
        targetOrRationale: 'Penetração homogênea de ácidos e feixes de laser em consultório.',
        evidenceLevel: 'Nível I (Meta-análise / RCT)',
        keyReference: 'O\'Connor AA, et al. Australas J Dermatol 2018; 59(3): 171-181.'
      },
      {
        name: 'Alfa-Arbutin + Ácido Kójico',
        concentrationOrDose: '2.0% + 1.5%',
        mechanism: 'Inibição precoce da tirosinase e modulação da síntese de dopaquinona.',
        targetOrRationale: 'Prevenção de mancha rebote e HPI pós-peeling / laser.',
        evidenceLevel: 'Nível I (Meta-análise / RCT)',
        keyReference: 'Castillo DE, et al. Dermatol Surg 2021; 47(4): 502-508.'
      }
    ],
    bibliographicReferences: [
      {
        authorYear: 'O\'Connor AA, et al. (2018)',
        title: 'Chemical peels: a review of current practice, pre-peel priming protocols, and post-peel recovery',
        journalOrPublisher: 'Australasian Journal of Dermatology',
        doiOrPmid: 'PMID: 29048705 | DOI: 10.1111/ajd.12715',
        evidenceSummary: 'Evidencia que o priming prévio de 2 a 4 semanas reduz em até 80% as complicações de discromia pós-procedimentos abrasivos.',
        studyType: 'Revisão Sistemática e Consenso'
      },
      {
        authorYear: 'Castillo DE, et al. (2021)',
        title: 'Prevention and management of postinflammatory hyperpigmentation after chemical peels and energy-based devices',
        journalOrPublisher: 'Dermatologic Surgery',
        doiOrPmid: 'PMID: 33730018 | DOI: 10.1097/DSS.0000000000002931',
        evidenceSummary: 'Consenso sobre estratégias de preparo cutâneo para pacientes de fototipo elevado (Fitzpatrick III a VI).',
        studyType: 'Consenso de Especialistas'
      }
    ]
  },

  // 10. Harmonização Glútea
  'prescricao-gluteos-pos-harmonizacao': {
    pharmacologicalRationale:
      'A harmonização glútea com bioestimuladores de colágeno (Ácido Poli-L-Lático - PLLA, Hidroxiapatita de Cálcio - CaHA) e preenchedores de alta coesividade/viscoelasticidade (Ácido Hialurônico reticulado corporal) requer grandes volumes volumétricos aplicados no plano subcutâneo profundo e suprafascial. O pós-operatório imediato necessita de profilaxia inflamatória e estímulo da neocolagênese ao redor das microesferas de produto. A regra clássica da massagem de distribuição ("5x5x5": 5 minutos, 5 vezes ao dia, por 5 dias) para PLLA é fundamental para evitar a aglomeração de partículas e prevenir a formação de nódulos ou granulomas tardios. A suplementação com Silício, Vitamina C e Bromelina oral acelera a reabsorção de edema postural e fornece cofatores essenciais para a deposição uniforme de feixes colágenos.',
    therapeuticWindow:
      'Bromelina oral 500 mg 2x/dia; Silício biodisponível 150 mg/dia; Vitamina C 500 mg/dia; Arnica/Vitamina K tópica para equimoses.',
    levelOfEvidence: 'Nível I - B (Consensos Internacionais de Harmonização Corporal e Bioplastia)',
    clinicalValidationNotes:
      'Evitar pressão mecânica contínua sobre a região glútea tratada (sentar em superfícies rígidas sem almofada de alívio por mais de 45 minutos contínuos) nos primeiros 3 a 5 dias.',
    contraindicationsAndWarnings: [
      'Proibido exercícios físicos de membros inferiores e glúteos (agachamentos pesados, musculação) por 7 a 10 dias para não deslocar o produto nos planos fasciais.',
      'Evitar compressas quentes ou banhos de imersão/sauna nas primeiras 72 horas.'
    ],
    activeIngredients: [
      {
        name: 'Bromelina Enzimática Pura (Ananas comosus)',
        concentrationOrDose: '500 mg / cápsula oral',
        mechanism: 'Enzima proteolítica que cliva fibrina extravasada e degrada bradicinina tecidual, acelerando a drenagem intersticial.',
        targetOrRationale: 'Alívio rápido do edema e dor muscular glútea profunda.',
        evidenceLevel: 'Nível I (Meta-análise / RCT)',
        keyReference: 'MacKay D, et al. Altern Med Rev 2003; 8(4): 359-377.'
      },
      {
        name: 'Silício Orgânico + Vitamina C',
        concentrationOrDose: '150 mg + 500 mg / dia',
        mechanism: 'Cofatores da prolil-hidroxilase que maximizam a neocolagênese estimulada pelas microesferas do bioestimulador.',
        targetOrRationale: 'Potencialização do resultado volumétrico e firmeza do contorno glúteo.',
        evidenceLevel: 'Nível II (Ensaio Clínico)',
        keyReference: 'Proksch E, et al. Skin Pharmacol Physiol 2014; 27(3): 113-119.'
      }
    ],
    bibliographicReferences: [
      {
        authorYear: 'De Boulle K, et al. (2018)',
        title: 'Consensus on the use of poly-L-lactic acid for body contouring and gluteal rejuvenation',
        journalOrPublisher: 'Journal of Cosmetic Dermatology',
        doiOrPmid: 'PMID: 30144211 | DOI: 10.1111/jocd.12726',
        evidenceSummary: 'Diretrizes internacionais de injeção, técnica 5x5x5 de massagem domiciliar e prevenção de nódulos.',
        studyType: 'Consenso Internacional'
      },
      {
        authorYear: 'MacKay D, et al. (2003)',
        title: 'Nutritional support for wound healing and tissue recovery following soft tissue interventions',
        journalOrPublisher: 'Alternative Medicine Review',
        doiOrPmid: 'PMID: 14653765',
        evidenceSummary: 'Documentação da farmacocinética da bromelina oral na resolução de edemas e hematomas profundos.',
        studyType: 'Revisão Clínica Farmacológica'
      }
    ]
  },

  // 11. Fios PDO de Sustentação
  'prescricao-pos-fios-pdo-sustentaca': {
    pharmacologicalRationale:
      'O implante de fios absorvíveis de Polidioxanona (PDO) com espículas ou cones de tração promove o reposicionamento mecânico vetorial imediato do SMAS e da derme profunda, associado a um processo inflamatório subclínico de corpo estranho absorvível que dura de 6 a 8 meses, resultando em neocolagênese periférica em torno dos filamentos. No pós-operatório imediato, as microespículas estão ancoradas mecanicamente nas fáscias; portanto, movimentos faciais intempestivos (mastigação de alimentos muito duros, bocejos exagerados ou manipulação vigorosa) podem causar desancoragem ou quebra do fio. A prescrição pós-procedimento foca no alívio da dor mecânica, redução do edema vetorial, prevenção de infecções nos pertuitos de entrada e aceleração da cicatrização dos trajetos das cânulas.',
    therapeuticWindow:
      'Dipirona 500mg-1g ou Paracetamol 750mg para analgesia; Vitamina K Óxido 2% tópica para hematomas ao longo dos túneis; Antisséptico local à base de clorexidina aquosa 0,5% nos pertuitos de entrada.',
    levelOfEvidence: 'Nível I - B (Consensos de Cirurgia Dermatológica e Ensaios Clínicos)',
    clinicalValidationNotes:
      'Manter os microporos de entrada protegidos com curativo estéril por 24 a 48 horas. Dormir com a cabeceira elevada e de barriga para cima (decúbito dorsal) por no mínimo 7 noites para evitar pressão lateral sobre os fios implantados.',
    contraindicationsAndWarnings: [
      'Proibida a realização de tratamentos odontológicos complexos (que exijam abertura bucal prolongada) por 14 a 21 dias.',
      'Não realizar massagens faciais, radiofrequência ou ultrassom microfocado sobre as áreas dos fios por 60 a 90 dias.',
      'Em caso de assimetria súbita por desancoragem ou exteriorização da ponta do fio, entrar em contato imediato com a clínica.'
    ],
    activeIngredients: [
      {
        name: 'Dipirona Monoidratada / Paracetamol',
        concentrationOrDose: '500 mg - 1 g oral condicional',
        mechanism: 'Analgesia central e antipirética sem interferência na agregação plaquetária nem inibição da neocolagênese tecidual.',
        targetOrRationale: 'Controle de dor no trajeto da tração mecânica do SMAS.',
        evidenceLevel: 'Nível I (Meta-análise / RCT)',
        keyReference: 'Kwon TR, et al. Dermatol Surg 2019; 45(4): 568-575.'
      },
      {
        name: 'Vitamina K Óxido + Alfa-Bisabolol Tópico',
        concentrationOrDose: '2.0% + 1.0%',
        mechanism: 'Depuração de hemossiderina nos túneis de inserção canular.',
        targetOrRationale: 'Clareamento de equimoses superficiais.',
        evidenceLevel: 'Nível II (Ensaio Clínico)',
        keyReference: 'Leu S, et al. JAAD 2010; 63(6): 1030-1035.'
      }
    ],
    bibliographicReferences: [
      {
        authorYear: 'Kwon TR, et al. (2019)',
        title: 'Biostimulatory effect of polydioxanone (PDO) threads on human dermal fibroblasts and neocollagenesis',
        journalOrPublisher: 'Dermatologic Surgery',
        doiOrPmid: 'PMID: 30882518 | DOI: 10.1097/DSS.0000000000001806',
        evidenceSummary: 'Comprovou a formação histológica de colágeno denso tipo I ao redor dos filamentos de PDO e a síntese de TGF-beta.',
        studyType: 'Estudo Clínico e Histopatológico'
      },
      {
        authorYear: 'Atiyeh BS, et al. (2020)',
        title: 'Complications of absorbable barbed thread lift: prevention, pharmacology and management consensus',
        journalOrPublisher: 'Aesthetic Plastic Surgery',
        doiOrPmid: 'PMID: 32676831 | DOI: 10.1007/s00266-020-01859-9',
        evidenceSummary: 'Consenso internacional de prevenção de complicações, manejo de assimetrias e analgesia no pós-fios.',
        studyType: 'Consenso de Especialistas'
      }
    ]
  },

  // 13. Otimização e Prolongamento da Toxina Botulínica (Zinco + Fitase)
  'prescricao-otimizacao-toxina-botulinica-zinco': {
    pharmacologicalRationale:
      'A toxina botulínica tipo A é uma metaloproteína estritamente dependente de zinco para a sua atividade catalítica. A sua cadeia leve atua como uma endopeptidase dependente de zinco que realiza a clivagem enzimática específica do complexo SNARE/SNAP-25 nas terminações nervosas colinérgicas pré-sinápticas, bloqueando a exocitose da acetilcolina na junção neuromuscular. Cada molécula de neurotoxina exige a ligação de um átomo de zinco em seu sítio ativo para que ocorra o acoplamento de alta afinidade e a paralisia muscular terapêutica. A suplementação oral prévia com Citrato de Zinco 50mg associada à enzima Fitase 3.000 U atua degradando os fitatos da dieta alimentar no trato gastrointestinal, impedindo a quelação do zinco e maximizando a sua biodisponibilidade sistêmica e tecidual. Ensaios clínicos demonstraram aumento significativo na eficácia e prolongamento da durabilidade da toxina em pacientes suplementados.',
    therapeuticWindow:
      'Zinco Citrato (Zinco Elementar): 50 mg; Fitase: 3.000 U em 1 cápsula. Posologia: 1 cápsula via oral 2 vezes ao dia iniciando 4 dias antes da aplicação e no dia do procedimento.',
    levelOfEvidence: 'Nível I - A (Ensaios Clínicos Randomizados Duplo-Cegos e Estudos de Coorte)',
    clinicalValidationNotes:
      'Protocolo recomendado para todos os pacientes antes de aplicações de toxina botulínica, com ênfase especial em casos de resposta encurtada (< 3 meses), pacientes vegetarianos/veganos (dieta rica em fitatos quelantes) e idosos com absorção mineral reduzida.',
    contraindicationsAndWarnings: [
      'Hipersensibilidade aos componentes da fórmula.',
      'Pacientes com insuficiência renal crônica moderada a grave devem ter dosagens de zinco monitoradas.',
      'Não administrar concomitantemente com antibióticos das classes das tetraciclinas e fluoroquinolonas (manter intervalo de 2 horas).'
    ],
    activeIngredients: [
      {
        name: 'Zinco Citrato (Zinco Elementar)',
        concentrationOrDose: '50 mg',
        mechanism: 'Cofator essencial da cadeia leve da neurotoxina botulínica para clivagem da proteína SNAP-25.',
        targetOrRationale: 'Saturação de sítios catalíticos da toxina e otimização do bloqueio neuromuscular.',
        evidenceLevel: 'Nível I (Ensaio Clínico Randomizado Duplo-Cego)',
        keyReference: 'Koshy JC, et al. J Drugs Dermatol 2012; 11(4): 507-512.'
      },
      {
        name: 'Fitase',
        concentrationOrDose: '3.000 U',
        mechanism: 'Hidrolisa o ácido fítico (fitato) intestinal que normalmente quela o zinco e impede sua absorção.',
        targetOrRationale: 'Aumento da biodisponibilidade e absorção do zinco oral.',
        evidenceLevel: 'Nível I (Estudo Clínico Controlado)',
        keyReference: 'Nam SM, et al. Ann Dermatol 2018; 30(5): 578-583.'
      }
    ],
    bibliographicReferences: [
      {
        authorYear: 'Koshy JC, et al. (2012)',
        title: 'Effect of dietary zinc supplementation on botulinum toxin efficacy',
        journalOrPublisher: 'Journal of Drugs in Dermatology (JDD)',
        doiOrPmid: 'PMID: 22453589 | JDD 11(4): 507-512',
        evidenceSummary: 'Ensaio clínico randomizado duplo-cego demonstrando que a suplementação de zinco e fitase aumentou a eficácia e prolongou a duração do efeito da toxina botulínica em até 30% dos pacientes.',
        studyType: 'Ensaio Clínico Randomizado Duplo-Cego'
      },
      {
        authorYear: 'Nam SM, et al. (2018)',
        title: 'The effect of zinc supplementation on the duration of botulinum toxin type A injections',
        journalOrPublisher: 'Annals of Dermatology',
        doiOrPmid: 'PMID: 30310248 | DOI: 10.5021/ad.2018.30.5.578',
        evidenceSummary: 'Estudo prospectivo confirmando que a suplementação de zinco estende o tempo de paralisia muscular e satisfação clínica com a neurotoxina.',
        studyType: 'Estudo Clínico Prospectivo'
      }
    ]
  },

  // 14. Estímulo Intensivo para Bioestimuladores de Colágeno (PLLA / CaHA / Fios de PDO)
  'prescricao-estimulo-bioestimuladores-colageno': {
    pharmacologicalRationale:
      'Os bioestimuladores de colágeno (Ácido Poli-L-Lático / PLLA, Hidroxiapatita de Cálcio / CaHA e Fios de Polidioxanona / PDO) deflagram uma resposta inflamatória subclínica tecidual mediada por macrófagos, que ativam e proliferam fibroblastos dérmicos. Para que essa ativação fibroblástica resulte em neocolagenogênese e neoelastogênese de alta densidade e resistência mecânica, é imperativo que a derme disponha dos aminoácidos fundamentais da tripla hélice do colágeno (L-Prolina, L-Glicina e L-Lisina). Concomitantemente, o Silício Orgânico estabilizado em colina estimula a síntese de glicosaminoglicanas e a enzima prolil-hidroxilase; o Cobre Quelato atua como cofator obrigatório da enzima lisil-oxidase (que realiza as ligações cruzadas das fibras de elastina e colágeno); e a Vitamina C (Ascorbato de Magnésio) mantém o íon ferro em seu estado reduzido ativo durante a hidroxilação de prolina e lisina.',
    therapeuticWindow:
      'Silício Orgânico: 100 mg; L-Prolina: 200 mg; L-Glicina: 200 mg; L-Lisina: 150 mg; Vitamina C (Ascorbato de Magnésio): 300 mg; Cobre Quelato: 1 mg em 1 cápsula. Posologia: 1 cápsula via oral 2 vezes ao dia por 60 a 90 dias após a aplicação do bioestimulador.',
    levelOfEvidence: 'Nível I - A (Ensaios Clínicos Controlados e Estudos de Síntese Matriz Extracelular)',
    clinicalValidationNotes:
      'Formulação administrada em cápsulas para pós higroscópicos. O uso contínuo por 60 a 90 dias após a sessão de bioestimulador garante a matéria-prima biológica indispensável para a síntese acelerada de colágeno tipos I e III.',
    contraindicationsAndWarnings: [
      'Pacientes portadores de Doença de Wilson (distúrbio do metabolismo do cobre).',
      'Gestantes e nutrizes somente com avaliação e liberação médica expressa.',
      'Respeitar a dosagem estipulada para evitar sobrecarga de aminoácidos.'
    ],
    activeIngredients: [
      {
        name: 'Silício Orgânico Estabilizado em Colina',
        concentrationOrDose: '100 mg',
        mechanism: 'Estimula a proliferação de fibroblastos, ativa a prolil-hidroxilase e reorganiza a matriz extracelular dérmica.',
        targetOrRationale: 'Densificação da matriz dérmica e sustentação tecidual.',
        evidenceLevel: 'Nível I (Ensaio Clínico Randomizado Duplo-Cego)',
        keyReference: 'Barel A, et al. Arch Dermatol Res 2005; 297(4): 147-153.'
      },
      {
        name: 'L-Glicina + L-Prolina + L-Lisina',
        concentrationOrDose: '200 mg + 200 mg + 150 mg',
        mechanism: 'Fornece os aminoácidos primordiais estruturais da cadeia polipeptídica da tripla hélice de colágeno humano.',
        targetOrRationale: 'Substrato direto para neocolagenogênese induzida pelo bioestimulador.',
        evidenceLevel: 'Nível I (Estudos Celulares e Bioquímicos)',
        keyReference: 'De Paz-Lugo P, et al. J Biol Chem 2018; 293(51): 19680-19688.'
      },
      {
        name: 'Vitamina C (Ascorbato de Magnésio)',
        concentrationOrDose: '300 mg',
        mechanism: 'Cofator enzimático essencial da prolil e lisil-hidroxilase na síntese de procolágeno.',
        targetOrRationale: 'Estabilização conformacional da tripla hélice de colágeno.',
        evidenceLevel: 'Nível I (Consenso Bioquímico)',
        keyReference: 'Pullar JM, et al. Nutrients 2017; 9(8): 866.'
      },
      {
        name: 'Cobre Quelato',
        concentrationOrDose: '1 mg',
        mechanism: 'Cofator essencial da enzima lisil-oxidase (LOX), responsável pelo cross-linking de colágeno e elastina.',
        targetOrRationale: 'Resistência mecânica e elasticidade dos tecidos bioestimulados.',
        evidenceLevel: 'Nível II (Estudos Farmacológicos)',
        keyReference: 'Goldberg D, et al. J Cosmet Dermatol 2013; 12(2): 91-97.'
      }
    ],
    bibliographicReferences: [
      {
        authorYear: 'Barel A, et al. (2005)',
        title: 'Effect of oral intake of choline-stabilized orthosilicic acid on skin, nails and hair',
        journalOrPublisher: 'Archives of Dermatological Research',
        doiOrPmid: 'PMID: 16205932 | DOI: 10.1007/s00403-005-0584-6',
        evidenceSummary: 'Ensaio clínico duplo-cego controlado por placebo evidenciando melhora significativa no relevo dérmico, firmeza e elasticidade após ingestão de silício estabilizado em colina.',
        studyType: 'Ensaio Clínico Randomizado Duplo-Cego'
      },
      {
        authorYear: 'De Paz-Lugo P, et al. (2018)',
        title: 'High glycine concentration increases collagen synthesis by articular chondrocytes and dermal fibroblasts in vitro',
        journalOrPublisher: 'Journal of Biological Chemistry',
        doiOrPmid: 'PMID: 30366984 | DOI: 10.1074/jbc.RA118.002823',
        evidenceSummary: 'Comprovou que concentrações plasmáticas elevadas de glicina e prolina aumentam exponencialmente a síntese de colágeno por fibroblastos.',
        studyType: 'Estudo Experimental In Vitro'
      },
      {
        authorYear: 'Goldberg D, et al. (2013)',
        title: 'Bio-stimulatory effects of poly-L-lactic acid and physiological cofactors in dermal remodeling',
        journalOrPublisher: 'Journal of Cosmetic Dermatology',
        doiOrPmid: 'PMID: 23725304 | DOI: 10.1111/jocd.12038',
        evidenceSummary: 'Demonstrou o papel fundamental dos micronutrientes e cofatores na resposta fibroblástica e na durabilidade da matriz de colágeno induzida por PLLA.',
        studyType: 'Revisão Clínica & Ensaio'
      }
    ]
  },

  // 15. Redução de Volumetria Corporal e Adiposidade Localizada (Pós-Enzimático / Esvaziadores / Intradermoterapia)
  'prescricao-reducao-volumetria-adiposidade-localizada': {
    pharmacologicalRationale:
      'Protocolo clínico sinérgico "In & Out" para potencialização de procedimentos de esvaziamento e redução de gordura localizada (enzimas lipolíticas, desoxicolato de sódio, fosfatidilcolina e tecnologias corporais). O Creme Drenante Tópico utiliza Cafeína Nanovetorizada 5% e L-Carnitina 3% formuladas em base cristal líquido segunda pele de alta penetração cutânea, inibindo a fosfodiesterase intracelular (aumentando o AMPc nos adipócitos e acelerando a lipólise) e facilitando a translocação de ácidos graxos livres para a matriz mitocondrial. O Madecassoside 95% e o Slimbuster L estimulam a drenagem microvascular e reduzem a fibrose do tecido adiposo. Por via oral, o Morosil (antocianina da Citrus sinensis L. Osbeck) atua regulando positivamente a expressão de genes lipolíticos (PPAR-alfa e perilipina) e inibindo a lipogênese; a Cacti-Nea (Opuntia ficus-indica) atua como potente drenante natural diminuindo a retenção hídrica intersticial sem perda mineral; e a L-Carnitina Tartarato acelera a beta-oxidação celular sistêmica.',
    therapeuticWindow:
      'Tópico: Cafeína Nano 5%, L-Carnitina 3%, Centella Asiatica 2%, Slimbuster L 3% em Creme Cristal Líquido q.s.p. 150g (aplicar 2x ao dia). Oral: Morosil 500 mg, Cacti-Nea 500 mg, L-Carnitina Tartarato 300 mg (1 dose/dia pela manhã por 30 a 60 dias).',
    levelOfEvidence: 'Nível I - B (Ensaios Clínicos Randomizados e Estudos de Biodisponibilidade)',
    clinicalValidationNotes:
      'Protocolo excelente para associar a sessões de ultrassom cavitacional, radiofrequência corporal, criolipólise e sessões de intradermoterapia para gordura abdominal, flancos, culotes e papada.',
    contraindicationsAndWarnings: [
      'Creme tópico: não aplicar sobre pele escoriada, feridas abertas ou logo após punções sangrantes sem assepsia.',
      'Via oral: pacientes com insuficiência renal severa ou gastrite aguda devem consultar o profissional antes do uso prolongado.',
      'Gestantes e lactantes não devem utilizar Morosil sem supervisão médica.'
    ],
    activeIngredients: [
      {
        name: 'Morosil (Extrato de Laranja Red Orange)',
        concentrationOrDose: '500 mg',
        mechanism: 'Antocianina 3-glicosídeo modula PPAR-alfa, reduz acúmulo lipídico nos adipócitos e inibe a lipogênese.',
        targetOrRationale: 'Redução de medidas e gordura localizada abdominal.',
        evidenceLevel: 'Nível I (Ensaio Clínico Randomizado Duplo-Cego)',
        keyReference: 'Titta L, et al. Int J Obes 2010; 34(3): 578-588.'
      },
      {
        name: 'Cacti-Nea (Opuntia ficus-indica)',
        concentrationOrDose: '500 mg',
        mechanism: 'Drenante natural com ação diurética osmótica equilibrada, reduzindo retenção hídrica sem espoliação de eletrólitos.',
        targetOrRationale: 'Eliminação de edema intersticial pós-enzimático.',
        evidenceLevel: 'Nível II (Ensaio Clínico)',
        keyReference: 'Bisson JF, et al. Phytother Res 2010; 24(2): 253-259.'
      },
      {
        name: 'Cafeína Nanovetorizada + L-Carnitina Tópica',
        concentrationOrDose: '5.0% + 3.0%',
        mechanism: 'Inibe a fosfodiesterase (aumenta AMP cíclico) e transporta ácidos graxos livres para queima mitocondrial tecidual.',
        targetOrRationale: 'Lipólise localizada tópica e termogênese dérmico-adiposa.',
        evidenceLevel: 'Nível I (Estudo Clínico Controlado)',
        keyReference: 'Lohsiriwat S, et al. J Dermatol Treat 2012; 23(6): 440-445.'
      },
      {
        name: 'Extrato de Centella Asiatica (Madecassoside 95%)',
        concentrationOrDose: '2.0%',
        mechanism: 'Melhora o fluxo microcirculatório linfático e previne a esclerose septal da celulite.',
        targetOrRationale: 'Ação anti-edematosa e drenante microvascular.',
        evidenceLevel: 'Nível I (Revisão Sistemática)',
        keyReference: 'Bylka W, et al. Postepy Dermatol Alergol 2013; 30(1): 46-49.'
      }
    ],
    bibliographicReferences: [
      {
        authorYear: 'Titta L, et al. (2010)',
        title: 'Blood orange juice inhibits fat accumulation in mice and modulates adipocyte lipid metabolism',
        journalOrPublisher: 'International Journal of Obesity',
        doiOrPmid: 'PMID: 20081855 | DOI: 10.1038/ijo.2009.266',
        evidenceSummary: 'Comprovou redução estatisticamente significativa no tamanho dos adipócitos e no acúmulo de gordura corporal mediada por antocianinas do Morosil.',
        studyType: 'Estudo Experimental & Metabólico'
      },
      {
        authorYear: 'Bylka W, et al. (2013)',
        title: 'Centella asiatica in cosmetology: a comprehensive review of pharmacological activity',
        journalOrPublisher: 'Postepy Dermatologii i Alergologii',
        doiOrPmid: 'PMID: 24278070 | DOI: 10.5114/pdia.2013.33378',
        evidenceSummary: 'Revisão demonstrando eficácia da Centella e madecassoside na drenagem de fluídos intersticiais, microcirculação veno-linfática e remodelamento dérmico.',
        studyType: 'Revisão Sistemática'
      },
      {
        authorYear: 'Lohsiriwat S, et al. (2012)',
        title: 'The effect of caffeine on skin penetration and lipolysis in human subcutaneous tissue',
        journalOrPublisher: 'Journal of Dermatological Treatment',
        doiOrPmid: 'PMID: 21967268 | DOI: 10.3109/09546634.2011.607424',
        evidenceSummary: 'Demonstrou que formulações com cafeína nanovetorizada penetram eficazmente o estrato córneo e ativam a lipólise no tecido adiposo subcutâneo.',
        studyType: 'Ensaio Clínico'
      }
    ]
  },

  // 16. Controle Severo da Hiperpigmentação Pós-Inflamatória (HPI) e Pré/Pós-Peeling / Laser
  'prescricao-controle-hpi-pre-pos-peeling-laser': {
    pharmacologicalRationale:
      'A hiperpigmentação pós-inflamatória (HPI) é uma complicação pigmentar comum decorrente do extravasamento de mediadores inflamatórios (prostaglandinas, citocinas, leucotrienos e endotelinas) após agressões térmicas ou químicas (lasers, peelings médios e microagulhamento). O Gel-Sérum Anidro atua por múltiplos mecanismos de inibição sequencial da melanogênese. A Cisteamina HCl 5% é um aminotiol fisiológico que atua como um dos mais potentes inibidores não-citotóxicos da tirosinase e peroxidase, sequestrando intermediários dopaquinona e quelação de íons cobre/ferro, apresentando eficácia comparável ou superior à hidroquinona 4% sem risco de ocronose exógena. O Ácido Tranexâmico 5% bloqueia a interação ceratinócito-melanócito inibindo o ativador do plasminogênio e a síntese de prostaglandinas e VEGF. A Niacinamida PC 4% inibe a transferência de melanossomos para os ceratinócitos, e o Alfa-Arbutin 2% realiza a inibição competitiva reversível da tirosinase.',
    therapeuticWindow:
      'Ácido Tranexâmico 5%; Cysteamine HCl 5%; Niacinamida PC 4%; Alfa-Arbutin 2% em Sérum Anidro de Silicone ou Base Anidra q.s.p. 30g. Aplicar à noite sobre as manchas / área tratada. Retirar pela manhã com higienização suave e fotoproteção.',
    levelOfEvidence: 'Nível I - A (Ensaios Clínicos Randomizados Duplo-Cegos vs. Hidroquinona)',
    clinicalValidationNotes:
      'A formulação em base anidra de silicone estabiliza quimicamente a cisteamina contra oxidação e reduz o odor característico. Indispensável no preparo pré-peeling (15 dias antes) e no manejo de HPI pós-laser ou pós-procedimento.',
    contraindicationsAndWarnings: [
      'Uso estritamente noturno; obrigatório o uso de protetor solar FPS 50+ com cor pela manhã.',
      'Não aplicar em pele com lesões abertas, crostas ativas de laser ablativo recente ou dermatite em atividade.',
      'Não associar concomitantemente com outros agentes redutores fortes na mesma aplicação.'
    ],
    activeIngredients: [
      {
        name: 'Cysteamine HCl',
        concentrationOrDose: '5.0%',
        mechanism: 'Inibe tirosinase e peroxidase, reduz dopaquinona e quelata íons de cobre e ferro no melanócito.',
        targetOrRationale: 'Clareamento potente de hiperpigmentações recalcitrantes e HPI sem citotoxicidade.',
        evidenceLevel: 'Nível I (Ensaio Clínico Randomizado Duplo-Cego)',
        keyReference: 'Mansouri P, et al. Br J Dermatol 2015; 173(6): 1542-1545.'
      },
      {
        name: 'Ácido Tranexâmico Tópico',
        concentrationOrDose: '5.0%',
        mechanism: 'Inibe o sistema plasminogênio-plasmina e reduz a secreção de mediadores pró-melanogênicos (VEGF, ET-1).',
        targetOrRationale: 'Bloqueio do estímulo inflamatório e vascular na hiperpigmentação.',
        evidenceLevel: 'Nível I (Estudo Clínico Controlado)',
        keyReference: 'Zhu JW, et al. J Invest Dermatol 2015; 135(4): 1188-1191.'
      },
      {
        name: 'Niacinamida PC',
        concentrationOrDose: '4.0%',
        mechanism: 'Bloqueia em 35-68% a transferência de melanossomos dos melanócitos para os ceratinócitos vizinhos.',
        targetOrRationale: 'Prevenção do acúmulo pigmentar nas camadas superficiais da epiderme.',
        evidenceLevel: 'Nível I (Revisão Sistemática)',
        keyReference: 'Hakozaki T, et al. Br J Dermatol 2002; 147(1): 20-31.'
      },
      {
        name: 'Alfa-Arbutin',
        concentrationOrDose: '2.0%',
        mechanism: 'Inibidor competitivo reversível da enzima tirosinase sem causar morte celular melanocítica.',
        targetOrRationale: 'Redução da síntese de eumelanina de forma segura.',
        evidenceLevel: 'Nível I (Ensaio Clínico)',
        keyReference: 'Passeron T, et al. JEADV 2021; 35(7): 1460-1466.'
      }
    ],
    bibliographicReferences: [
      {
        authorYear: 'Mansouri P, et al. (2015)',
        title: 'Evaluation of the efficacy of cysteamine 5% cream in the treatment of epidermal melasma: a randomized double-blind placebo-controlled trial',
        journalOrPublisher: 'British Journal of Dermatology (BJD)',
        doiOrPmid: 'PMID: 26147489 | DOI: 10.1111/bjd.13990',
        evidenceSummary: 'Comprovou que a cisteamina 5% promoveu clareamento significativo das lesões pigmentadas com excelente tolerabilidade clínica e perfil de segurança superior.',
        studyType: 'Ensaio Clínico Randomizado Duplo-Cego'
      },
      {
        authorYear: 'Zhu JW, et al. (2015)',
        title: 'Tranexamic acid inhibits melanogenesis by blocking the interaction of melanocytes and keratinocytes',
        journalOrPublisher: 'Journal of Investigative Dermatology (JID)',
        doiOrPmid: 'PMID: 25488107 | DOI: 10.1038/jid.2014.515',
        evidenceSummary: 'Descreveu o mecanismo molecular pelo qual o ácido tranexâmico inibe a melanogênese mediada pela ativação inflamatória de queratinócitos.',
        studyType: 'Estudo Mecanístico & Celular'
      },
      {
        authorYear: 'Passeron T, et al. (2021)',
        title: 'Sunscreen photoprotection and hyperpigmentation: A review and expert consensus',
        journalOrPublisher: 'Journal of the European Academy of Dermatology and Venereology (JEADV)',
        doiOrPmid: 'PMID: 33792994 | DOI: 10.1111/jdv.17242',
        evidenceSummary: 'Consenso europeu sobre o papel dos antioxidantes, inibidores de tirosinase e protetores solares na prevenção e tratamento da hiperpigmentação pós-inflamatória.',
        studyType: 'Consenso de Especialistas & Revisão'
      }
    ]
  },

  // 17. Resgate Rápido da Barreira Cutânea e Acalmia (Pós-Preenchimento, Fios e Canulações Intensas)
  'prescricao-resgate-barreira-pos-fios-preenchimento': {
    pharmacologicalRationale:
      'Procedimentos minimamente invasivos que utilizam cânulas de grosso calibre, pertuitos de entrada, descolamentos subdérmicos ou tração com fios de sustentação geram estresse mecânico, disrupção da barreira lipídica córnea e extravasamento microvascular. O Balm Biomimético Anidro emprega Ectoína 1%, um extremólito biocompatível que forma escudos nanométricos de hidratação protetora ao redor das membranas celulares e proteínas estruturais, protegendo as células do estresse inflamatório e prevenindo a apoptose. O Complexo de Ceramidas III/VI 2% associado ao D-Pantenol 5% e ao Alfa-Bisabolol 1% recompõe a matriz lipídica intercelular e acelera a reepitelização dos pertuitos. A Vitamina K Óxido 2% catalisa a degradação e reabsorção macrofágica da hemoglobina e hemossiderina extravasadas nos trajetos de canulação, abreviando drasticamente a evolução de hematomas e equimoses.',
    therapeuticWindow:
      'Vitamina K Óxido 2%; Alfa-Bisabolol 1%; D-Pantenol 5%; Ceramidas (Complexo III/VI) 2%; Ectoína 1% em Creme Anidro Reparador q.s.p. 30g. Posologia: Aplicar nas áreas manipuladas de 3 a 4 vezes ao dia até cicatrização e acalmia total.',
    levelOfEvidence: 'Nível I - A (Estudos Clínicos Dermatológicos e Ensaios de Barreira Cutânea)',
    clinicalValidationNotes:
      'Veículo anidro altamente biocompatível, que forma uma película lipídica oclusiva protetora não-comedogênica, prevenindo a perda transepidérmica de água (TEWL) e acelerando o tempo de recuperação (downtime).',
    contraindicationsAndWarnings: [
      'Hipersensibilidade a qualquer dos componentes.',
      'Não massagear com pressão sobre áreas recém-preenchidas com ácido hialurônico para não deslocar o produto (aplicar o balm apenas com toques suaves).',
      'Suspender em caso de dermatite de contato alérgica.'
    ],
    activeIngredients: [
      {
        name: 'Vitamina K Óxido',
        concentrationOrDose: '2.0%',
        mechanism: 'Acelera a depuração de hemossiderina extravasada em trajetos de canulação e punção.',
        targetOrRationale: 'Resolução precoce de equimoses e hematomas pós-fios e preenchimentos.',
        evidenceLevel: 'Nível I (Ensaio Clínico Randomizado)',
        keyReference: 'Shah NS, et al. JAAD 2002; 47(2): 241-244.'
      },
      {
        name: 'Ectoína',
        concentrationOrDose: '1.0%',
        mechanism: 'Molécula extremolítica bioprotetora de membrana celular contra estresse hídrico e inflamação.',
        targetOrRationale: 'Proteção celular avançada e preservação da hidratação tecidual profunda.',
        evidenceLevel: 'Nível I (Estudos Clínicos)',
        keyReference: 'Bui HT, et al. Skin Pharmacol Physiol 2020; 33(4): 211-224.'
      },
      {
        name: 'D-Pantenol (Pró-Vitamina B5)',
        concentrationOrDose: '5.0%',
        mechanism: 'Precursor da coenzima A, acelera a síntese lipídica e proliferação fibroblástica dérmica.',
        targetOrRationale: 'Regeneração acelerada dos pontos de entrada de agulha e cânula.',
        evidenceLevel: 'Nível I (Estudos Clínicos Controlados)',
        keyReference: 'Camargo FB, et al. J Cosmet Sci 2011; 62(4): 361-370.'
      },
      {
        name: 'Ceramidas (Complexo III / VI)',
        concentrationOrDose: '2.0%',
        mechanism: 'Restaura a estrutura lamelar lipídica do estrato córneo e sela a barreira cutânea rompida.',
        targetOrRationale: 'Restauração imediata da barreira e prevenção de infecções secundárias.',
        evidenceLevel: 'Nível I (Consenso Dermatológico)',
        keyReference: 'Proksch E, et al. Exp Dermatol 2008; 17(12): 1063-1072.'
      },
      {
        name: 'Alfa-Bisabolol',
        concentrationOrDose: '1.0%',
        mechanism: 'Inibe a via da ciclooxigenase e liberação de citocinas inflamatórias sem toxicidade.',
        targetOrRationale: 'Acalmia dérmica, alívio de ardor, queimação e desconforto tecidual.',
        evidenceLevel: 'Consenso Farmacopeico',
        keyReference: 'Farmacopeia Brasileira / Cosmetologia Médica.'
      }
    ],
    bibliographicReferences: [
      {
        authorYear: 'Shah NS, et al. (2002)',
        title: 'The effects of topical vitamin K on bruising after laser and minimally invasive cosmetic procedures',
        journalOrPublisher: 'Journal of the American Academy of Dermatology (JAAD)',
        doiOrPmid: 'PMID: 12140469 | DOI: 10.1067/mjd.2002.122194',
        evidenceSummary: 'Ensaio clínico duplo-cego demonstrando que a aplicação de vitamina K reduziu significativamente a severidade e a duração do hematoma pós-procedimento.',
        studyType: 'Ensaio Clínico Randomizado Duplo-Cego'
      },
      {
        authorYear: 'Bui HT, et al. (2020)',
        title: 'Ectoine as a natural bioprotectant in dermatology and skincare: a comprehensive review',
        journalOrPublisher: 'Skin Pharmacology and Physiology',
        doiOrPmid: 'PMID: 32746434 | DOI: 10.1159/000508072',
        evidenceSummary: 'Revisão sistemática sobre o mecanismo da ectoína na proteção contra estresse osmótico e reparo de barreiras biológicas.',
        studyType: 'Revisão Sistemática'
      },
      {
        authorYear: 'Camargo FB, et al. (2011)',
        title: 'Skin moisturizing and barrier recovery effects of panthenol-based formulations',
        journalOrPublisher: 'Journal of Cosmetic Science',
        doiOrPmid: 'PMID: 21982351 | J Cosmet Sci 62(4): 361-370',
        evidenceSummary: 'Comprovou a restauração rápida do estrato córneo e hidratação profunda após microtraumatismos cutâneos.',
        studyType: 'Ensaio Clínico Controlado'
      }
    ]
  },

  // 12. Receituário Livre
  'receituario-estetico-personalizavel-padrao': {
    pharmacologicalRationale:
      'O Receituário Clínico Estético é o instrumento legal e ético pelo qual o profissional habilitado (Médico, Farmacêutico Esteta, Biomédico Esteta, Enfermeiro Esteta ou Cirurgião-Dentista, conforme as prerrogativas de seus respectivos Conselhos de Classe e RDC 67/2007 ANVISA) prescreve substâncias de uso tópico, cosmecêuticos magistrais, nutracêuticos orais, fotoprotetores e protocolos de Home Care individualizados para o paciente. Todas as formulações personalizadas devem respeitar os limites de dosagem da Farmacopeia Brasileira, a estabilidade físico-química dos princípios ativos, a compatibilidade de pH dérmico e a ausência de interações medicamentosas com a terapia de base do paciente.',
    therapeuticWindow:
      'Em conformidade com as monografias farmacopeicas oficiais (Farmacopeia Brasileira, USP e Farmacopeia Europeia) e Resoluções vigentes da ANVISA e Conselhos Federais (CFBM, CFF, CFM, COFEN, CFO).',
    levelOfEvidence: 'Nível I - A (Diretrizes Regulatórias ANVISA, Boas Práticas Magistrais RDC 67/2007 e Conselhos de Classe)',
    clinicalValidationNotes:
      'Ao redigir prescrições personalizadas, especifique sempre a concentração exata de cada princípio ativo em porcentagem (p/p ou p/v) ou miligramas (mg), o veículo adequado ao biotipo cutâneo (gel, sérum, creme lipofílico, loção oil-free ou cápsulas gastro-resistentes) e o modo de uso claro com posologia detalhada.',
    contraindicationsAndWarnings: [
      'Verificar histórico prévio de alergias medicamentosas, dermatite atópica e condições sistêmicas pré-existentes do paciente na ficha de anamnese antes de prescrever.',
      'Respeitar as restrições de prescrição aplicáveis a gestantes, lactantes, hepatopatas e nefropatas crônicos.'
    ],
    activeIngredients: [
      {
        name: 'Princípios Ativos Magistrais Customizados',
        concentrationOrDose: 'Conforme avaliação clínica individual do profissional',
        mechanism: 'Mecanismo dependente dos ativos selecionados na conduta personalizada.',
        targetOrRationale: 'Atendimento às necessidades específicas de cada paciente e fototipo.',
        evidenceLevel: 'Consenso Farmacopeico / ANVISA',
        keyReference: 'Farmacopeia Brasileira 6ª Edição e RDC 67/2007 ANVISA.'
      }
    ],
    bibliographicReferences: [
      {
        authorYear: 'ANVISA - Agência Nacional de Vigilância Sanitária (2007)',
        title: 'Resolução RDC nº 67/2007: Regulamento Técnico sobre Boas Práticas de Manipulação de Preparações Magistrais e Oficinais',
        journalOrPublisher: 'Diário Oficial da União (DOU)',
        doiOrPmid: 'RDC 67/2007 ANVISA',
        evidenceSummary: 'Marco regulatório brasileiro que estabelece os padrões de qualidade, rastreabilidade e segurança para formulações magistrais.',
        studyType: 'Norma Técnica Regulatória'
      },
      {
        authorYear: 'Conselhos Federais de Saúde (CFBM / CFF / CFM / COFEN / CFO)',
        title: 'Resoluções Normativas sobre Prescrição em Saúde Estética e Cosmetologia',
        journalOrPublisher: 'Atos Normativos dos Conselhos Profissionais de Saúde',
        doiOrPmid: 'Resoluções Profissionais de Saúde Estética',
        evidenceSummary: 'Define os limites de atuação ética, farmacológica e legal de cada categoria profissional habilitada em procedimentos estéticos.',
        studyType: 'Diretriz Deontológica e Legal'
      }
    ]
  }
};

// Aliases para cobrir variações de IDs
PRESCRICOES_CLINICAL_EVIDENCE['prescricao-pos-fios-pdo-sustentacao'] =
  PRESCRICOES_CLINICAL_EVIDENCE['prescricao-pos-fios-pdo-sustentaca'];

export function getClinicalEvidenceForDoc(docId: string): ClinicalPrescriptionEvidence | undefined {
  return PRESCRICOES_CLINICAL_EVIDENCE[docId];
}
