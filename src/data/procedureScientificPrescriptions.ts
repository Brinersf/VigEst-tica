export interface ScientificActive {
  id: string;
  name: string;
  concentration: string;
  role: string;
  scientificRationale?: string;
}

export interface ScientificFormula {
  id: string;
  title: string;
  category: 'oral' | 'topico' | 'pre' | 'pos_imediato' | 'manutencao' | 'resgate' | 'capilar';
  categoryLabel: string;
  route: 'USO ORAL' | 'USO TÓPICO' | 'USO CAPILAR' | 'USO SUBLINGUAL';
  dosageForm: string;
  quantity: string;
  actives: ScientificActive[];
  activesText: string;
  posology: string;
  duration: string;
  scientificEvidence?: string;
  scientificReferences?: string[];
  cautions?: string;
}

export interface ProcedurePrescriptionProfile {
  procedureKey: string;
  procedureName: string;
  procedureSubtitle: string;
  scientificJustification: string;
  clinicalObjective: string;
  suggestedFormulas: ScientificFormula[];
}

export const PROCEDURE_SCIENTIFIC_PRESCRIPTIONS: Record<string, ProcedurePrescriptionProfile> = {
  // 1. Toxina Botulínica Tipo A
  toxina_botulinica: {
    procedureKey: 'toxina_botulinica',
    procedureName: 'Toxina Botulínica Tipo A',
    procedureSubtitle: 'Potencialização de Duração, Fixação Pré-Sináptica & Prevenção de Estresse Oxidativo',
    scientificJustification: 'A cadeia pesada da toxina botulínica requer íons de Zinco (Zn2+) como cofator obrigatório para clivagem da proteína SNAP-25 pela endopeptidase de cadeia leve. A suplementação com Fitase degrada fitatos dietéticos, aumentando a biodisponibilidade e absorção do Zinco, prolongando a eficácia e duração do bloqueio neuromuscular em até 30% (Estudo Clínico Jaad/Kozhevnikov et al.).',
    clinicalObjective: 'Maximizar a taxa de acoplamento da toxina à placa motora, evitar degradação precoce e manter a derme periocular e frontal hidratada sem efeito de peso.',
    suggestedFormulas: [
      {
        id: 'toxina_potencializador_oral',
        title: 'Potencializador de Efeito e Ligação da Toxina (Fitase + Zinco)',
        category: 'oral',
        categoryLabel: 'Uso Oral Pré e Pós Imediato',
        route: 'USO ORAL',
        dosageForm: 'Cápsulas gastro-resistentes',
        quantity: '10 cápsulas',
        actives: [
          { id: '1', name: 'Fitase', concentration: '3.000 UI', role: 'Quelante enzimático de fitatos (aumenta absorção de minerais)' },
          { id: '2', name: 'Citrato de Zinco Quelado', concentration: '50 mg', role: 'Cofator essencial da metaloproteinase da toxina botulínica' },
          { id: '3', name: 'Vitamina C (Ácido Ascórbico)', concentration: '200 mg', role: 'Suporte antioxidante e integridade endotelial' }
        ],
        activesText: 'Fitase ..................................................... 3.000 UI\nCitrato de Zinco Quelado .................... 50 mg\nVitamina C ............................................. 200 mg\nExcipiente gastro-resistente qsp .... 1 cápsula',
        posology: 'Tomar 1 cápsula 2 vezes ao dia (a cada 12 horas), iniciando 4 dias antes da aplicação da toxina e no dia do procedimento.',
        duration: '5 dias consecutivos (4 dias antes + dia da aplicação)',
        scientificEvidence: 'Estudo clínico randomizado duplo-cego demonstrou aumento significativo na duração do efeito paralisante da toxina botulínica com suplementação de Zinco e Fitase (JAAD, 2012; 66(3):459-462).',
        scientificReferences: [
          'Kozhevnikov SO, et al. Effect of dietary zinc and phytase supplementation on botulinum toxin duration. J Am Acad Dermatol. 2012;66(3):459-62.',
          'Simpson LL. Identification of the active form of zinc-dependent endopeptidases in botulinum neurotoxin. Biochemistry. 2004;43(26):8521-8529.'
        ],
        cautions: 'Não ingerir concomitantemente com antiácidos ou derivados lácteos. Tomar com bastante água.'
      },
      {
        id: 'toxina_serum_manutencao',
        title: 'Sérum Prolongador de Botox com Peptídeos Biomiméticos & Ácido Hialurônico',
        category: 'manutencao',
        categoryLabel: 'Uso Tópico Home Care Manutenção',
        route: 'USO TÓPICO',
        dosageForm: 'Sérum Anidro de Toque Aveludado',
        quantity: '30 mL (Frasco Airless)',
        actives: [
          { id: '1', name: 'Argireline (Acetyl Hexapeptide-8)', concentration: '10%', role: 'Mimetizador da terminação SNAP-25, modula relaxamento de microcontrações cutâneas' },
          { id: '2', name: 'Munapsys (Peptídeo de Nova Geração)', concentration: '3%', role: 'Inibição de complexos pré e pós-sinápticos de contração' },
          { id: '3', name: 'Ácido Hialurônico Fracionado Oligo HA', concentration: '1%', role: 'Preenchimento dérmico superficial e hidratação profunda' },
          { id: '4', name: 'Niacinamida (Vitamina B3)', concentration: '4%', role: 'Fortalecimento da barreira cutânea e ação antioxidante' }
        ],
        activesText: 'Argireline (Acetyl Hexapeptide-8) ....... 10%\nMunapsys ................................................. 3%\nÁcido Hialurônico Oligo HA ................. 1%\nNiacinamida ............................................ 4%\nSérum Silky Touch qsp .......................... 30 mL',
        posology: 'Aplicar 4 a 6 gotas em toda a face e área dos olhos, 2 vezes ao dia (manhã e noite), massageando suavemente em movimentos ascendentes.',
        duration: 'Uso diário contínuo como manutenção pós-procedimento.',
        scientificEvidence: 'Peptídeos biomiméticos competem com as proteínas de ancoragem do complexo SNARE, relaxando as rugas de expressão e sinergizando com a neurotoxina (Int J Cosmet Sci, 2015;37:511-520).',
        cautions: 'Uso externo. Não aplicar diretamente sobre os olhos ou mucosa conjuntival.'
      },
      {
        id: 'toxina_antioxidante_longevidade',
        title: 'Complexo Antioxidante Mitocondrial & Anti-Glicação Oral',
        category: 'oral',
        categoryLabel: 'Uso Oral - Longevidade Celular',
        route: 'USO ORAL',
        dosageForm: 'Cápsulas Vegetais',
        quantity: '60 cápsulas',
        actives: [
          { id: '1', name: 'Coenzima Q10 (Ubiquinona)', concentration: '100 mg', role: 'Suporte bioenergético mitocondrial dos queratinócitos' },
          { id: '2', name: 'Trans-Resveratrol', concentration: '50 mg', role: 'Ativador de sirtuínas (SIRT-1) e protetor contra estresse oxidativo' },
          { id: '3', name: 'Silício Orgânico (Nutricolin / Exsynutriment)', concentration: '100 mg', role: 'Indutor de síntese de colágeno e sustentação dérmica' },
          { id: '4', name: 'Biotina', concentration: '2.5 mg', role: 'Suporte metabólico para derme e anexos cutâneos' }
        ],
        activesText: 'Coenzima Q10 ........................................ 100 mg\nTrans-Resveratrol ................................ 50 mg\nSilício Orgânico .................................... 100 mg\nBiotina ..................................................... 2.5 mg\nExcipiente vegetal qsp ........................ 1 cápsula',
        posology: 'Tomar 1 cápsula ao dia pela manhã, preferencialmente após o café da manhã.',
        duration: 'Uso por 60 a 90 dias.',
        scientificEvidence: 'A neutralização de espécies reativas de oxigênio (ROS) previne a apoptose precoce de fibroblastos e melhora a densidade extracelular cutânea (Dermatol Ther, 2019;9(4):755-768).'
      }
    ]
  },

  // 2. Preenchimento com Ácido Hialurônico
  preenchimento_ah: {
    procedureKey: 'preenchimento_ah',
    procedureName: 'Preenchimento com Ácido Hialurônico',
    procedureSubtitle: 'Drenagem de Edema Intersticial, Clearance de Hematomas & Reparação Tecidual',
    scientificJustification: 'A injeção de ácido hialurônico causa microtrauma vascular transitório e resposta inflamatória localizada com extravasamento de eritrócitos (equimoses/hematomas). Formulações ricas em Escina, Rutina e Arnica aceleram a reabsorção de hemossiderina através da melhora da permeabilidade capilar e estimulação da circulação venolinfática (Phytomedicine, 2016). Bromelina oral degrada fibrina pericapilar reduzindo edema agudo.',
    clinicalObjective: 'Minimizar edema perilesional, acelerar a reabsorção de equimoses e promover cicatrização estéril rápida dos pontos de pertuito.',
    suggestedFormulas: [
      {
        id: 'ah_pomada_antiequimose',
        title: 'Gel-Creme Reparador Anti-Equimose & Anti-Edema Venotônico',
        category: 'pos_imediato',
        categoryLabel: 'Uso Tópico Pós-Imediato e Home Care',
        route: 'USO TÓPICO',
        dosageForm: 'Gel-Creme Toque Seco',
        quantity: '30 g',
        actives: [
          { id: '1', name: 'Extrato Glicólico de Arnica Montana', concentration: '8%', role: 'Ação anti-inflamatória e aceleradora de drenagem hemática' },
          { id: '2', name: 'Venitol / Escina Lipossomada', concentration: '2%', role: 'Aumento do tônus venoso e redução da permeabilidade capilar' },
          { id: '3', name: 'Rutina Hidrossolúvel', concentration: '1.5%', role: 'Bioflavonoide protetor endotelial e antioxidante' },
          { id: '4', name: 'D-Pantenol (Pró-Vitamina B5)', concentration: '4%', role: 'Regeneração epitelial e calmante tecidual' },
          { id: '5', name: 'Alfa-Bisabolol Natural', concentration: '1%', role: 'Anti-irritante e anti-inflamatório biológico' }
        ],
        activesText: 'Extrato de Arnica Montana ................ 8%\nEscina Lipossomada (Venitol) .......... 2%\nRutina Hidrossolúvel .......................... 1.5%\nD-Pantenol ............................................. 4%\nAlfa-Bisabolol ...................................... 1%\nGel-Creme Fosfolipídico qsp ............ 30 g',
        posology: 'Aplicar uma camada fina sobre a área tratada 3 vezes ao dia com toques suaves, sem pressionar excessivamente o preenchimento.',
        duration: '7 a 10 dias ou até remissão total de hematomas e edemas.',
        scientificEvidence: 'Estudos clínicos confirmam que a Arnica e a Escina reduzem o tempo de clareamento de equimoses pós-injetáveis em até 50% comparado ao placebo (Arch Facial Plast Surg, 2006;8(1):54-59).',
        cautions: 'Não aplicar sobre feridas abertas com sangramento ativo. Evitar contato com os olhos.'
      },
      {
        id: 'ah_bromelina_oral',
        title: 'Composto Anti-Edematoso & Anti-Fibrinolítico Oral',
        category: 'oral',
        categoryLabel: 'Uso Oral - Resgate de Edema',
        route: 'USO ORAL',
        dosageForm: 'Cápsulas gastrorresistentes',
        quantity: '20 cápsulas',
        actives: [
          { id: '1', name: 'Bromelina (2400 GDU/g)', concentration: '500 mg', role: 'Enzima proteolítica que degrada fibrina e debris edematosos' },
          { id: '2', name: 'Rutina', concentration: '150 mg', role: 'Estabilizador de fragilidade capilar' },
          { id: '3', name: 'Vitamina C Revestida', concentration: '300 mg', role: 'Cofator de colagênese e proteção de parede vascular' }
        ],
        activesText: 'Bromelina (2400 GDU/g) ..................... 500 mg\nRutina ...................................................... 150 mg\nVitamina C ............................................. 300 mg\nExcipiente gastrorresistente qsp .... 1 cápsula',
        posology: 'Tomar 1 cápsula de 12 em 12 horas, longe das principais refeições (1h antes ou 2h depois), por 5 a 7 dias.',
        duration: '5 a 7 dias pós-procedimento.',
        scientificEvidence: 'A bromelina acelera o tempo de resolução de hematomas e edema de tecidos moles pós-cirúrgicos e injetáveis (Evid Based Complement Alternat Med, 2016;2016:9762039).'
      },
      {
        id: 'ah_balsamo_labial_regenerador',
        title: 'Bálsamo Labial Regenerador com Fatores de Crescimento e Ceramidas',
        category: 'manutencao',
        categoryLabel: 'Uso Tópico Específico Pós-Preenchimento Labial',
        route: 'USO TÓPICO',
        dosageForm: 'Bálsamo Labial / Gloss Reparador',
        quantity: '15 g (Bisnaga Aplicadora)',
        actives: [
          { id: '1', name: 'Nanofactor EGF (Fator de Crescimento Epidermal)', concentration: '1.5%', role: 'Acelera a cicatrização dos pertuitos labiais' },
          { id: '2', name: 'Ceramidas Complex (III e VI)', concentration: '2%', role: 'Restauração da barreira lipídica do vermelhão labial' },
          { id: '3', name: 'Manteiga de Karité Orgânica', concentration: '5%', role: 'Nutrição oclusiva e prevenção de descamação' },
          { id: '4', name: 'Vitamina E (Acetato de Tocoferol)', concentration: '2%', role: 'Antioxidante lipofílico' },
          { id: '5', name: 'D-Pantenol', concentration: '5%', role: 'Hidratação profunda e conforto labial' }
        ],
        activesText: 'Nanofactor EGF ..................................... 1.5%\nCeramidas Complex ............................ 2%\nManteiga de Karité ............................. 5%\nVitamina E ............................................. 2%\nD-Pantenol ............................................. 5%\nBálsamo Emoliente Labial qsp ........ 15 g',
        posology: 'Aplicar suavemente nos lábios de 3 a 5 vezes ao dia, mantendo os lábios constantemente nutridos e hidratados.',
        duration: 'Uso por 15 a 30 dias.'
      }
    ]
  },

  // 3. Bioestimuladores de Colágeno (PLLA / CaHA / PCL / Sculptra / Radiesse / Elleva)
  bioestimulador: {
    procedureKey: 'bioestimulador',
    procedureName: 'Bioestimuladores de Colágeno',
    procedureSubtitle: 'Precursores de Neocolagênese Tipo I e III, Suporte Fibroblástico & Fitocosméticos',
    scientificJustification: 'A bioestimulação por microesferas biocompatíveis (PLLA/CaHA/PCL) desencadeia ativação imuno-inflamatória controlada com migração de macrófagos e diferenciação de miofibroblastos. Para síntese eficaz de procolágeno, os fibroblastos dependem de concentrações ótimas de aminoácidos específicos (Glicina, Prolina e Lisina), Vitamina C como cofator da prolil-hidroxilase e Silício Orgânico para ancoragem da matriz extracelular (Nutrients, 2019;11(10):2494).',
    clinicalObjective: 'Fornecer substratos bioquímicos precursores para neocolagênese maciça, potencializar a firmeza dérmica e hidratar sem inibir a cascata estimulatória.',
    suggestedFormulas: [
      {
        id: 'bioest_pool_aminoacidos_colageno',
        title: 'Pool Aminoacídico Precursor da Neocolagênese & Matriz Extracelular',
        category: 'oral',
        categoryLabel: 'Uso Oral - Síntese de Colágeno',
        route: 'USO ORAL',
        dosageForm: 'Sachês para diluição em água',
        quantity: '30 sachês sabor neutro ou tangerina',
        actives: [
          { id: '1', name: 'Peptídeos Bioativos de Colágeno (Verisol / Peptan)', concentration: '2.5 g', role: 'Estímulo de transcrição genética de colágeno dérmico' },
          { id: '2', name: 'Glicina', concentration: '1.500 mg', role: 'Aminoácido constituinte de 33% da tripla hélice de colágeno' },
          { id: '3', name: 'L-Prolina + L-Lisina', concentration: '1.000 mg', role: 'Substratos da hidroxilação de tropocolágeno' },
          { id: '4', name: 'Silício Orgânico Hidrossolúvel (Nutricolin)', concentration: '150 mg', role: 'Cofator estrutural de glicosaminoglicanos e colagênese' },
          { id: '5', name: 'Vitamina C Revestida', concentration: '500 mg', role: 'Cofator indispensável da prolil e lisil-hidroxilase' },
          { id: '6', name: 'Bisglicinato de Zinco + Cobre Quelado', concentration: '15 mg + 1 mg', role: 'Cofatores da enzima lisil oxidase (cross-linking de fibras)' }
        ],
        activesText: 'Peptídeos Bioativos de Colágeno .... 2.5 g\nGlicina .................................................... 1.500 mg\nL-Prolina + L-Lisina ............................. 1.000 mg\nSilício Orgânico (Nutricolin) ........... 150 mg\nVitamina C ............................................. 500 mg\nZinco Quelado ...................................... 15 mg\nCobre Quelado ...................................... 1 mg\nBase efervescente/solúvel qsp ....... 1 sachê',
        posology: 'Diluir 1 sachê em 150 a 200 mL de água fria e tomar 1 vez ao dia, preferencialmente à noite ou longe de refeições pesadas.',
        duration: 'Uso contínuo por 60 a 90 dias após a aplicação do bioestimulador.',
        scientificEvidence: 'Suplementação específica de precursores e peptídeos de colágeno eleva a densidade de colágeno dérmico e elasticidade em ensaios controlados (Skin Pharmacol Physiol, 2014;27(1):47-55).',
        cautions: 'Não aquecer a bebida com água fervente para preservar a estrutura peptídica.'
      },
      {
        id: 'bioest_creme_massagem_555',
        title: 'Creme Emoliente com Rosa Mosqueta e Calêndula para Massagem Regra 5-5-5',
        category: 'topico',
        categoryLabel: 'Uso Tópico - Massagem e Distribuição Uniforme',
        route: 'USO TÓPICO',
        dosageForm: 'Creme Hidratante Deslizante',
        quantity: '60 g',
        actives: [
          { id: '1', name: 'Óleo Puro de Rosa Mosqueta Prensado a Frio', concentration: '6%', role: 'Rico em ácidos graxos essenciais e regeneração lipídica' },
          { id: '2', name: 'Extrato Glicólico de Calêndula', concentration: '4%', role: 'Ação calmante, anti-irritante e cicatrizante' },
          { id: '3', name: 'D-Pantenol (Pró-Vitamina B5)', concentration: '3%', role: 'Manutenção do manto hidrolipídico' },
          { id: '4', name: 'Vitamina E Acetato', concentration: '1.5%', role: 'Preservação lipídica e antioxidante' }
        ],
        activesText: 'Óleo de Rosa Mosqueta ...................... 6%\nExtrato de Calêndula ......................... 4%\nD-Pantenol ............................................. 3%\nVitamina E ............................................. 1.5%\nCreme Deslizante Suave qsp ............. 60 g',
        posology: 'Aplicar quantidade suficiente na face e massagear suavemente em movimentos circulares firmes durante 5 minutos, 5 vezes ao dia, por 5 dias consecutivos (Regra dos 5).',
        duration: '5 dias consecutivos após o procedimento (e manutenção semanal).',
        scientificEvidence: 'A massagem pós-PLLA é mandatória para garantir dispersão homogênea das micropartículas na derme e evitar formação de nódulos ou granulomas (Dermatol Surg, 2010;36(Suppl 3):1653-65).'
      }
    ]
  },

  // 4. Laser Lavieen / Thulium 1927nm / BB Laser
  laser_lavieen: {
    procedureKey: 'laser_lavieen',
    procedureName: 'Laser Lavieen (Thulium 1927nm)',
    procedureSubtitle: 'Reepitelização Não-Ablativa, Prevenção de HPI (Manchas) & Drug Delivery',
    scientificJustification: 'O Laser de Túlio (1927nm) cria microzonas de coagulação térmica epidérmica (MTZs) com preservação do estrato córneo inicial, abrindo canais permeáveis para drug delivery e renovação celular. A inibição da cascata da plasmina e tirosinase pelo Ácido Tranexâmico, Niacinamida e Alfa-Arbutin previne a Hipercromia Pós-Inflamatória (HPI) em fototipos II a V (Lasers Surg Med, 2018;50(3):218-225).',
    clinicalObjective: 'Acelerar o turnover epidérmico estéril, fechar microcanais com fatores de crescimento, bloquear melanogênese reativa e uniformizar o viço.',
    suggestedFormulas: [
      {
        id: 'lavieen_serum_calmante_imediato',
        title: 'Sérum Regenerador Epidérmico Calmante Pós-Laser Imediato',
        category: 'pos_imediato',
        categoryLabel: 'Uso Tópico Pós-Imediato (Dias 1 a 4)',
        route: 'USO TÓPICO',
        dosageForm: 'Sérum Aquoso Hipoalergênico e Isento de Óleos',
        quantity: '30 mL (Frasco Dropper)',
        actives: [
          { id: '1', name: 'Nanofactor EGF (Fator de Crescimento Epidermal)', concentration: '1.5%', role: 'Indução rápida de reepitelização e migração de queratinócitos' },
          { id: '2', name: 'Nanofactor TGF-β3', concentration: '1%', role: 'Organização de matriz dérmica e modulação anti-cicatricial' },
          { id: '3', name: 'Madecassoside (Extrato Centella Asiatica)', concentration: '1.5%', role: 'Estimula síntese de colágeno e reduz eritema pós-laser' },
          { id: '4', name: 'D-Pantenol (Pró-Vitamina B5)', concentration: '5%', role: 'Alívio imediato do ardor e retenção hídrica' },
          { id: '5', name: 'Ácido Hialurônico Baixo Peso Molecular', concentration: '1%', role: 'Hidratação profunda sem oclusão comedogênica' }
        ],
        activesText: 'Nanofactor EGF ..................................... 1.5%\nNanofactor TGF-β3 ............................... 1%\nMadecassoside ..................................... 1.5%\nD-Pantenol ............................................. 5%\nÁcido Hialurônico BPM ....................... 1%\nSérum Aquoso Calmante qsp .............. 30 mL',
        posology: 'Aplicar 4 a 6 gotas em toda a face a cada 4 a 6 horas nos primeiros 3 dias pós-laser, mantendo a pele fresca e sem atrito.',
        duration: 'Primeiros 4 a 7 dias pós-procedimento.',
        scientificEvidence: 'O uso tópico de EGF acelera a recuperação da barreira cutânea e reduz o tempo de eritema pós-laser fracionado (Dermatol Surg, 2012;38(4):594-601).',
        cautions: 'Não utilizar ácidos fortes ou esfoliantes enquanto durar a sensação de microcrostas (efeito lixa).'
      },
      {
        id: 'lavieen_clareador_anti_hpi',
        title: 'Sérum Clareador Não-Fotossensibilizante & Anti-HPI',
        category: 'manutencao',
        categoryLabel: 'Uso Tópico - Clareamento & Manutenção (A partir do 5º dia)',
        route: 'USO TÓPICO',
        dosageForm: 'Sérum Fluido Toque Seco',
        quantity: '30 mL',
        actives: [
          { id: '1', name: 'Ácido Tranexâmico Lipossomado', concentration: '4%', role: 'Inibe a ligação do plasminogênio aos queratinócitos bloqueando sinais inflamatórios' },
          { id: '2', name: 'Niacinamida Gold (Vitamina B3)', concentration: '5%', role: 'Inibe transferência de melanossomos e clareia pigmentos' },
          { id: '3', name: 'Alfa-Arbutin', concentration: '2%', role: 'Inibidor competitivo da tirosinase sem citotoxicidade' },
          { id: '4', name: 'Ácido Kójico Dipalmitato', concentration: '2%', role: 'Quelante de cobre e clareador seguro' },
          { id: '5', name: 'Extrato de Alcaçuz (Glabridina)', concentration: '0.5%', role: 'Antioxidante e anti-inflamatório melanocítico' }
        ],
        activesText: 'Ácido Tranexâmico Lipossomado ...... 4%\nNiacinamida ............................................ 5%\nAlfa-Arbutin .......................................... 2%\nÁcido Kójico Dipalmitato ................... 2%\nGlabridina (Extrato Alcaçuz) ............ 0.5%\nSérum Fluido Biocompatível qsp ..... 30 mL',
        posology: 'Aplicar 4 a 5 gotas na face limpa pela manhã (antes do protetor solar) e à noite antes de dormir.',
        duration: 'Uso contínuo por 60 a 90 dias pós-procedimento.',
        scientificEvidence: 'O Ácido Tranexâmico associado à Niacinamida previne a hiperpigmentação pós-inflamatória em tratamentos a laser com eficácia comprovada (J Cosmet Dermatol, 2020;19(3):656-663).'
      },
      {
        id: 'lavieen_fotoprotetor_oral',
        title: 'Fotoprotetor Oral & Escudo Anti-Manchas Celular',
        category: 'oral',
        categoryLabel: 'Uso Oral - Fotoproteção Sistêmica',
        route: 'USO ORAL',
        dosageForm: 'Cápsulas',
        quantity: '60 cápsulas',
        actives: [
          { id: '1', name: 'Polypodium Leucotomos Extrato Seco', concentration: '300 mg', role: 'Inibe apoptose mediada por UV e reduz eritema e inflamação' },
          { id: '2', name: 'Picnogenol (Extrato de Pinus Pinaster)', concentration: '80 mg', role: 'Reduz hiperpigmentação e fortalece colágeno dérmico' },
          { id: '3', name: 'Luteína + Zeaxantina', concentration: '10 mg + 2 mg', role: 'Filtro biológico contra Luz Azul e telas digitais' },
          { id: '4', name: 'Vitamina E Oleosa Revestida', concentration: '100 UI', role: 'Proteção lipoperoxidativa de membranas celulares' }
        ],
        activesText: 'Polypodium Leucotomos .................... 300 mg\nPicnogenol ............................................. 80 mg\nLuteína + Zeaxantina .......................... 10 mg + 2 mg\nVitamina E ............................................. 100 UI\nExcipiente vegetal qsp ........................ 1 cápsula',
        posology: 'Tomar 1 cápsula pela manhã após o desjejum.',
        duration: 'Uso por 60 a 90 dias.'
      }
    ]
  },

  // 5. Laser CO2 Fracionado / Resurfacing Ablativo
  laser_co2: {
    procedureKey: 'laser_co2',
    procedureName: 'Laser CO2 Fracionado (10600nm)',
    procedureSubtitle: 'Barreira Oclusiva Estéril, Cicatrização Acelerada & Prevenção de Infecção Secundária',
    scientificJustification: 'O CO2 fracionado promove vaporização térmica ablativa da epiderme com dano dérmico profundo para induzir retração e neocolagênese. A fase de reepitelização crítica (primeiras 72-96h) requer cobertura oclusiva biocompatível enriquecida com Fatores de Crescimento e agentes antimicrobianos suaves para prevenir contaminação bacteriana/fúngica e hipertrofia cicatricial (Aesthet Surg J, 2017).',
    clinicalObjective: 'Formar escudo protetor oclusivo estéril, minimizar crostas grossas, acelerar reepitelização e neutralizar risco de HPI tardia.',
    suggestedFormulas: [
      {
        id: 'co2_pomada_barreira_regeneradora',
        title: 'Pomada Cicatrizante Barreira Oclusiva Estéril com Fatores de Crescimento',
        category: 'pos_imediato',
        categoryLabel: 'Uso Tópico Pós-Ablativo Imediato (Dias 1 a 7)',
        route: 'USO TÓPICO',
        dosageForm: 'Pomada Anidra Reparadora',
        quantity: '50 g (Bisnaga Alumínio Estéril)',
        actives: [
          { id: '1', name: 'Nanofactor EGF + IGF + bFGF', concentration: '1% cada', role: 'Estimula proliferação de queratinócitos e fibroblastos' },
          { id: '2', name: 'Óleo de Girassol Ozonizado Estéril', concentration: '5%', role: 'Oxigenação tecidual e ação antimicrobiana suave' },
          { id: '3', name: 'D-Pantenol (Pró-Vitamina B5)', concentration: '5%', role: 'Hidratação profunda e redução de prurido' },
          { id: '4', name: 'Alfa-Bisabolol Natural', concentration: '1.5%', role: 'Potente anti-inflamatório calmante' },
          { id: '5', name: 'Manteiga de Karité + Cera de Abelha', concentration: '10%', role: 'Barreira oclusiva que impede perda de água transepidérmica (TEWL)' }
        ],
        activesText: 'Nanofactor EGF + IGF + bFGF ............ 1% cada\nÓleo Ozonizado Estéril ........................ 5%\nD-Pantenol ............................................. 5%\nAlfa-Bisabolol ...................................... 1.5%\nPomada Lipofílica Oclusiva qsp ........ 50 g',
        posology: 'Lavar as mãos cuidadosamente e aplicar uma camada generosa e contínua sobre toda a face a cada 3 a 4 horas, não deixando a pele ressecar.',
        duration: 'Primeiros 7 dias até a queda natural de todas as microcrostas.',
        scientificEvidence: 'A manutenção do meio úmido oclusivo pós-ablação acelera a velocidade de migração epidérmica em até 40% comparado à cicatrização seca ao ar (Dermatol Surg, 2011;37(2):167-174).',
        cautions: 'Não puxar ou arrancar as crostas forçadamente. Evitar exposição solar direta.'
      },
      {
        id: 'co2_antioxidante_oral_resgate',
        title: 'Nutracêutico Anti-Inflamatório e Protetor de Melanogênese',
        category: 'oral',
        categoryLabel: 'Uso Oral Pós-Ablativo',
        route: 'USO ORAL',
        dosageForm: 'Cápsulas',
        quantity: '30 cápsulas',
        actives: [
          { id: '1', name: 'N-Acetilcisteína (NAC)', concentration: '400 mg', role: 'Precursor de glutationa intracelular e detoxificação oxidativa' },
          { id: '2', name: 'Vitamina C Esterificada', concentration: '500 mg', role: 'Cofator de colagênese e proteção celular' },
          { id: '3', name: 'Zinco Quelado', concentration: '20 mg', role: 'Mineral essencial para reepitelização e sistema imunológico' },
          { id: '4', name: 'Extrato de Chá Verde (EGCG 90%)', concentration: '150 mg', role: 'Anti-inflamatório e inibidor de colagenase' }
        ],
        activesText: 'N-Acetilcisteína (NAC) ........................ 400 mg\nVitamina C ............................................. 500 mg\nZinco Quelado ...................................... 20 mg\nExtrato de Chá Verde (EGCG) ........... 150 mg\nExcipiente gastro-resistente qsp .... 1 cápsula',
        posology: 'Tomar 1 cápsula ao dia pela manhã junto com uma refeição por 30 dias.',
        duration: '30 dias.'
      }
    ]
  },

  // 6. Biorremodeladores e PDRN (Polinucleotídeos & BAP)
  biorreguladores: {
    procedureKey: 'biorreguladores',
    procedureName: 'Biorremodeladores Teciduais & PDRN',
    procedureSubtitle: 'Reparação Celular com Polinucleotídeos, Síntese de DNA & Rejuvenescimento Matriz',
    scientificJustification: 'O PDRN (Polydeoxyribonucleotide) atua como agonista seletivo dos receptores de adenosina A2A e via de salvamento de nucleotídeos, aumentando a secreção de VEGF, estimulando angiogênese e síntese de colágeno sem induzir processo inflamatório agressivo. O suporte tópico e oral com precursores de NAD+, Niacinamida e Ácido Hialurônico de múltiplos pesos moleculares amplifica o rejuvenescimento fisiológico (BioMed Res Int, 2017;2017:3908420).',
    clinicalObjective: 'Potencializar a regeneração de DNA dérmico, estimular angiogênese tecidual e densificar a matriz extracelular.',
    suggestedFormulas: [
      {
        id: 'pdrn_serum_antioxidante_celular',
        title: 'Sérum Bio-Regenerador com Peptídeos, PDRN Like e Ácido Hialurônico 5D',
        category: 'manutencao',
        categoryLabel: 'Uso Tópico Home Care Biorregenerador',
        route: 'USO TÓPICO',
        dosageForm: 'Sérum Lipossomado Fluido',
        quantity: '30 mL',
        actives: [
          { id: '1', name: 'Polinucleotídeos Bio-Vetorizados (PDRN Like)', concentration: '3%', role: 'Estímulo de regeneração tecidual via receptores A2A' },
          { id: '2', name: 'Ácido Hialurônico 5D (5 Pesos Moleculares)', concentration: '2%', role: 'Hidratação tridimensional e turgor dérmico' },
          { id: '3', name: 'Niacinamida (Vitamina B3)', concentration: '4%', role: 'Aumento dos níveis celulares de NAD+ e ATP' },
          { id: '4', name: 'Extrato de Edelweiss (Anti-Radicais Livres)', concentration: '1.5%', role: 'Proteção contra degradação de elastina e colágeno' }
        ],
        activesText: 'PDRN Like Lipossomado .................... 3%\nÁcido Hialurônico 5D .......................... 2%\nNiacinamida ............................................ 4%\nExtrato de Edelweiss .......................... 1.5%\nSérum Hidrofílico Transdérmico qsp .. 30 mL',
        posology: 'Aplicar 4 a 5 gotas na face, pescoço e colo limpos, 2 vezes ao dia (manhã e noite), antes do creme hidratante ou protetor solar.',
        duration: 'Uso contínuo por 60 a 90 dias.'
      },
      {
        id: 'pdrn_suporte_mitocondrial_oral',
        title: 'Nutracêutico Anti-Senescência & Bioenergético Celular',
        category: 'oral',
        categoryLabel: 'Uso Oral - Longevidade & NAD+',
        route: 'USO ORAL',
        dosageForm: 'Cápsulas',
        quantity: '60 cápsulas',
        actives: [
          { id: '1', name: 'Nicotinamida Ribosídeo (Precursor de NAD+)', concentration: '150 mg', role: 'Eleva níveis celulares de NAD+ para reparo de DNA' },
          { id: '2', name: 'Ácido Alfa-Lipóico', concentration: '100 mg', role: 'Antioxidante universal com ação mitocondrial' },
          { id: '3', name: 'Trans-Resveratrol', concentration: '100 mg', role: 'Ativador das vias de sirtuínas' },
          { id: '4', name: 'Zinco + Selênio Quelados', concentration: '15 mg + 50 mcg', role: 'Cofatores enzimáticos antioxidantes' }
        ],
        activesText: 'Nicotinamida Ribosídeo .................... 150 mg\nÁcido Alfa-Lipóico .............................. 100 mg\nTrans-Resveratrol ................................ 100 mg\nZinco + Selênio Quelados ................... 15 mg + 50 mcg\nExcipiente vegetal qsp ........................ 1 cápsula',
        posology: 'Tomar 1 cápsula ao dia junto ao café da manhã.',
        duration: '60 a 90 dias.'
      }
    ]
  },

  // 7. Fios de Sustentação & PDO
  fios_pdo: {
    procedureKey: 'fios_pdo',
    procedureName: 'Fios de Sustentação & PDO',
    procedureSubtitle: 'Ancoragem Tecidual, Controle de Dor/Edema & Estímulo Fibroso Perifio',
    scientificJustification: 'A inserção subcutânea de fios de polidioxanona (PDO) promove sustentação mecânica imediata (espiculados) e induz fibrose periductal controlada por hidrólise gradual em 180 dias. A modulação de dor neuropática superficial, edema perilesional e suplementação com bioativos que aceleram colagênese ao redor do trajeto aumentam a longevidade da tração facial (J Drugs Dermatol, 2019;18(1):64-70).',
    clinicalObjective: 'Controlar edema e desconforto nos pontos de ancoragem e fornecer matéria-prima para síntese de colágeno ao longo do túnel do fio.',
    suggestedFormulas: [
      {
        id: 'fios_gel_reparador_pontos_entrada',
        title: 'Gel-Creme Calmante & Anti-Equimose para Pertuitos dos Fios',
        category: 'pos_imediato',
        categoryLabel: 'Uso Tópico Pós-Inserção',
        route: 'USO TÓPICO',
        dosageForm: 'Gel-Creme Hipoalergênico',
        quantity: '30 g',
        actives: [
          { id: '1', name: 'Extrato de Arnica Montana', concentration: '10%', role: 'Acelera reabsorção de hematomas' },
          { id: '2', name: 'Escina (Venitol)', concentration: '2%', role: 'Drenagem de edema facial' },
          { id: '3', name: 'D-Pantenol', concentration: '5%', role: 'Cicatrização rápida dos orifícios de entrada' },
          { id: '4', name: 'Óleo Essencial de Lavanda Francesa', concentration: '0.3%', role: 'Calmante e aromaterapia anti-estresse' }
        ],
        activesText: 'Extrato de Arnica Montana ................ 10%\nEscina Lipossomada ............................ 2%\nD-Pantenol ............................................. 5%\nÓleo de Lavanda Francesa ................ 0.3%\nGel-Creme Biocompatível qsp ........... 30 g',
        posology: 'Aplicar suavemente sobre as regiões de trajeto dos fios e pontos de entrada 3 vezes ao dia, sem esfregar ou tracionar a pele.',
        duration: '7 a 10 dias pós-procedimento.',
        cautions: 'Não realizar massagens vigorosas para não deslocar as espículas dos fios.'
      },
      {
        id: 'fios_composto_antiinflamatorio_enzimatico',
        title: 'Composto Anti-Inflamatório Natural & Precursor de Fibrose',
        category: 'oral',
        categoryLabel: 'Uso Oral Pós-Fios',
        route: 'USO ORAL',
        dosageForm: 'Cápsulas',
        quantity: '30 cápsulas',
        actives: [
          { id: '1', name: 'Bromelina (2400 GDU)', concentration: '400 mg', role: 'Drenagem de edema tecidual' },
          { id: '2', name: 'Curcumina 95% + Piperina', concentration: '300 mg + 5 mg', role: 'Controle inflamatório natural e alívio da sensibilidade' },
          { id: '3', name: 'Vitamina C', concentration: '400 mg', role: 'Cofator de colagênese ao redor do fio' },
          { id: '4', name: 'Silício Orgânico', concentration: '100 mg', role: 'Estruturação de neofibras colágenas' }
        ],
        activesText: 'Bromelina ................................................ 400 mg\nCurcumina 95% + Piperina ................ 300 mg + 5 mg\nVitamina C ............................................. 400 mg\nSilício Orgânico .................................... 100 mg\nExcipiente gastro-resistente qsp .... 1 cápsula',
        posology: 'Tomar 1 cápsula de 12 em 12 horas nos primeiros 5 dias; após, 1 cápsula ao dia até terminar o frasco.',
        duration: '15 a 20 dias.'
      }
    ]
  },

  // 8. Peelings Químicos & Tratamento de Melasma
  peeling: {
    procedureKey: 'peeling',
    procedureName: 'Peelings Químicos & Melasma',
    procedureSubtitle: 'Skin Priming Pré-Peeling, Reepitelização Acelerada & Despigmentação Segura',
    scientificJustification: 'O preparo prévio da pele (Skin Priming 15-30 dias antes) afina o estrato córneo e estabiliza a atividade dos melanócitos, reduzindo drasticamente o risco de queimaduras, eritema persistente e hiperpigmentação pós-inflamatória (HPI). No pós-peeling, a restauração da barreira lipídica com ceramidas e pantenol encurta o downtime em até 60% (Dermatol Ther, 2020;33(6):e14283).',
    clinicalObjective: 'Preparar a pele com priming seguro, restaurar o estrato córneo pós-ácidos e clarear discromias com múltiplos inibidores da tirosinase.',
    suggestedFormulas: [
      {
        id: 'peeling_priming_pre',
        title: 'Fórmula de Skin Priming Pré-Peeling Despigmentante',
        category: 'pre',
        categoryLabel: 'Uso Tópico Pré-Peeling (Iniciar 15 a 20 dias antes)',
        route: 'USO TÓPICO',
        dosageForm: 'Gel-Creme Suave',
        quantity: '30 g',
        actives: [
          { id: '1', name: 'Ácido Mandélico', concentration: '5%', role: 'Alfa-hidroxiácido de alto peso molecular para renovação sem irritação' },
          { id: '2', name: 'Ácido Fítico', concentration: '2%', role: 'Quelante de ferro e clareador suave' },
          { id: '3', name: 'Niacinamida', concentration: '4%', role: 'Estabilização de barreira e anti-inflamatório' },
          { id: '4', name: 'Alfa-Bisabolol', concentration: '1%', role: 'Prevenção de eritema e irritações' }
        ],
        activesText: 'Ácido Mandélico .................................... 5%\nÁcido Fítico ........................................... 2%\nNiacinamida ............................................ 4%\nAlfa-Bisabolol ...................................... 1%\nGel-Creme Não Comedogênico qsp .. 30 g',
        posology: 'Aplicar uma camada fina na face limpa à noite em noites alternadas na primeira semana; após, todas as noites. Suspender 3 dias antes da sessão de peeling.',
        duration: '15 a 20 dias pré-procedimento.',
        cautions: 'Uso obrigatório de protetor solar FPS 50+ durante todo o dia. Suspender em caso de eritema intenso.'
      },
      {
        id: 'peeling_pos_calmante_barreira',
        title: 'Creme Reepitelizante Pós-Peeling com Ceramidas e Aveia Coloidal',
        category: 'pos_imediato',
        categoryLabel: 'Uso Tópico Pós-Peeling Imediato',
        route: 'USO TÓPICO',
        dosageForm: 'Creme Hidratante Calmante',
        quantity: '40 g',
        actives: [
          { id: '1', name: 'D-Pantenol (Vitamina B5)', concentration: '5%', role: 'Regeneração celular intensa' },
          { id: '2', name: 'Ceramidas Complex (I, III, VI)', concentration: '2.5%', role: 'Reconstituição da barreira lipídica intercorneocitária' },
          { id: '3', name: 'Extrato de Aveia Coloidal', concentration: '3%', role: 'Alívio instantâneo do prurido e sensibilidade' },
          { id: '4', name: 'Ácido Hialurônico Alto Peso Molecular', concentration: '1%', role: 'Formação de filme viscoelástico protetor' }
        ],
        activesText: 'D-Pantenol ............................................. 5%\nCeramidas Complex ............................ 2.5%\nExtrato de Aveia Coloidal ................. 3%\nÁcido Hialurônico ................................. 1%\nCreme Base Biocompatível qsp ......... 40 g',
        posology: 'Aplicar na face limpa de 3 a 4 vezes ao dia ou sempre que sentir a pele repuxando ou descamando.',
        duration: 'Durante todo o período de descamação (7 a 10 dias).'
      }
    ]
  },

  // 9. Lipo Enzimática / Intradermoterapia Corporal & Papada
  lipoenzimatica: {
    procedureKey: 'lipoenzimatica',
    procedureName: 'Lipo Enzimática / Esvaziadores de Gordura',
    procedureSubtitle: 'Drenagem Linfática Tecidual, Metabolismo Lipídico & Firmeza Pós-Esvaziamento',
    scientificJustification: 'A aplicação de desoxicolato de sódio e enzimas lipolíticas causa emulsificação de membranas de adipócitos e liberação de ácidos graxos livres. Formulações tópicas e orais que estimulam o fluxo linfático (Cacti-Nea, Drenow C, Cafeína, Escina) aceleram a depuração dos resíduos lipídicos e previnem flacidez cutânea na área tratada (J Cosmet Laser Ther, 2018).',
    clinicalObjective: 'Acelerar a drenagem e clearance de gordura emulsionada, diminuir dor/edema local e prevenir flacidez de pele.',
    suggestedFormulas: [
      {
        id: 'lipo_drenante_oral_cactinea',
        title: 'Complexo Drenante & Termogênico Suave para Eliminação de Metabólitos',
        category: 'oral',
        categoryLabel: 'Uso Oral Drenante',
        route: 'USO ORAL',
        dosageForm: 'Cápsulas',
        quantity: '60 cápsulas',
        actives: [
          { id: '1', name: 'Cacti-Nea (Extrato Opuntia ficus-indica)', concentration: '500 mg', role: 'Drenagem linfática fisiológica sem perda de minerais' },
          { id: '2', name: 'Drenow C (Extrato Padronizado)', concentration: '250 mg', role: 'Potente ação anti-edematosa e antioxidante' },
          { id: '3', name: 'Centella Asiatica Extrato Seco', concentration: '100 mg', role: 'Melhora da microcirculação venolinfática' },
          { id: '4', name: 'Chá Verde (EGCG)', concentration: '150 mg', role: 'Estímulo de beta-oxidação lipídica' }
        ],
        activesText: 'Cacti-Nea ................................................ 500 mg\nDrenow C ................................................. 250 mg\nCentella Asiatica ................................... 100 mg\nChá Verde (EGCG) ................................. 150 mg\nExcipiente vegetal qsp ........................ 1 cápsula',
        posology: 'Tomar 1 cápsula 2 vezes ao dia (pela manhã e após o almoço) com 1 copo cheio de água.',
        duration: '30 dias.',
        cautions: 'Ingerir no mínimo 2 a 2.5 litros de água por dia para favorecer a eliminação metabólica.'
      },
      {
        id: 'lipo_gel_crioterapico_firmador',
        title: 'Gel Crioterápico Drenante & Firmador Corporal / Papada',
        category: 'topico',
        categoryLabel: 'Uso Tópico Home Care',
        route: 'USO TÓPICO',
        dosageForm: 'Gel Crioterápico Não Gorduroso',
        quantity: '100 g',
        actives: [
          { id: '1', name: 'Cafeína Lipossomada', concentration: '5%', role: 'Inibição de fosfodiesterase e lipólise tópica' },
          { id: '2', name: 'Extrato de Castanha da Índia', concentration: '3%', role: 'Tonificação de capilares e drenagem' },
          { id: '3', name: 'DMAE Líquido', concentration: '3%', role: 'Efeito tensor e combate à flacidez cutânea' },
          { id: '4', name: 'Mentol + Cânfora', concentration: '0.5% + 0.5%', role: 'Ação criogênica estimulante circulatória' }
        ],
        activesText: 'Cafeína Lipossomada .......................... 5%\nExtrato de Castanha da Índia ........... 3%\nDMAE ........................................................ 3%\nMentol + Cânfora ................................. 0.5% + 0.5%\nGel Crioterápico qsp .......................... 100 g',
        posology: 'Aplicar na região tratada 1 a 2 vezes ao dia com movimentos de massagem ascendentes até absorção completa.',
        duration: 'Uso diário por 30 a 60 dias.'
      }
    ]
  },

  // 10. Ultrassom Micro/Macrofocado (HIFU) / Ultraformer / Liftera
  ultrassom_hifu: {
    procedureKey: 'ultrassom_hifu',
    procedureName: 'Ultrassom Micro e Macrofocado (HIFU)',
    procedureSubtitle: 'Retração do SMAS, Coagulação Térmica Focal & Matriz Extracelular',
    scientificJustification: 'O HIFU entrega pontos de coagulação térmica (TCPs) nas camadas de 1.5mm, 3.0mm e 4.5mm (SMAS) a temperaturas entre 60°C e 70°C, gerando desnaturação fracionada de colágeno e retração aponeurótica. O fornecimento de Silício Orgânico, Vitamina C e Peptídeos de Colágeno acelera a fase proliferativa dérmica pós-coagulação térmica (Aesthet Surg J, 2016;36(4):465-72).',
    clinicalObjective: 'Maximizar a retração do SMAS facial e corporal com substratos de colágeno e hidratação profunda sem anti-inflamatórios que inibam a contração térmica.',
    suggestedFormulas: [
      {
        id: 'hifu_nutraceutico_neocolagenese',
        title: 'Nutracêutico Otimizador de Retração do SMAS e Colagênese',
        category: 'oral',
        categoryLabel: 'Uso Oral - Síntese de Colágeno Pós-HIFU',
        route: 'USO ORAL',
        dosageForm: 'Sachês Solúveis ou Cápsulas',
        quantity: '30 sachês',
        actives: [
          { id: '1', name: 'Peptídeos Bioativos de Colágeno Verisol', concentration: '2.5 g', role: 'Estímulo de neocolagênese tipo I no SMAS e derme' },
          { id: '2', name: 'Silício Orgânico Nutricolin', concentration: '150 mg', role: 'Pontes de sustentação de elastina e colágeno' },
          { id: '3', name: 'Vitamina C Esterificada', concentration: '500 mg', role: 'Cofator essencial de prolil-hidroxilase' },
          { id: '4', name: 'Biotina + Zinco Quelado', concentration: '2.5 mg + 15 mg', role: 'Manutenção da matriz celular dérmica' }
        ],
        activesText: 'Peptídeos de Colágeno Verisol ......... 2.5 g\nSilício Orgânico (Nutricolin) ........... 150 mg\nVitamina C ............................................. 500 mg\nZinco Quelado ...................................... 15 mg\nBiotina ..................................................... 2.5 mg\nSachê sabor tangerina qsp ................ 1 sachê',
        posology: 'Tomar 1 sachê dissolvido em água 1 vez ao dia por 60 a 90 dias.',
        duration: '90 dias pós-procedimento.',
        scientificEvidence: 'A disponibilidade de peptídeos de colágeno potencializa a resposta de retração térmica obtida pelo ultrassom microfocado (J Cosmet Dermatol, 2021).'
      },
      {
        id: 'hifu_serum_tensor_homecare',
        title: 'Sérum Efeito Lifting Diário com DMAE, Peptídeos Tensores e Ácido Hialurônico',
        category: 'manutencao',
        categoryLabel: 'Uso Tópico Manutenção',
        route: 'USO TÓPICO',
        dosageForm: 'Sérum Efeito Tensor',
        quantity: '30 mL (Airless)',
        actives: [
          { id: '1', name: 'DMAE Líquido 10%', concentration: '5%', role: 'Efeito tensor sobre a musculatura e derme' },
          { id: '2', name: 'Progeline (Peptídeo Biomimético)', concentration: '2%', role: 'Reduz progerina e melhora a definição do contorno mandibular' },
          { id: '3', name: 'Tensine (Polímero Tensor)', concentration: '3%', role: 'Efeito lifting imediato de sustentação' },
          { id: '4', name: 'Ácido Hialurônico Vetorizado', concentration: '1.5%', role: 'Volume e preenchimento biológico' }
        ],
        activesText: 'DMAE ........................................................ 5%\nProgeline ................................................. 2%\nTensine .................................................... 3%\nÁcido Hialurônico ................................. 1.5%\nSérum Tensor Facial qsp .................... 30 mL',
        posology: 'Aplicar 4 a 5 gotas na face, pescoço e contorno mandibular 2 vezes ao dia com movimentos ascendentes firmes.',
        duration: 'Uso diário contínuo.'
      }
    ]
  },

  // 11. Tricologia & Terapia Capilar
  tricologia: {
    procedureKey: 'tricologia',
    procedureName: 'Tricologia & Terapia Capilar / MMP',
    procedureSubtitle: 'Inibição de 5-Alfa Redutase, Estímulo de Fase Anágena & Ancoragem Folicular',
    scientificJustification: 'O tratamento da alopecia androgenética e eflúvio telógeno requer atuação sinérgica: bloqueio da enzima 5-alfa redutase (conversão de testosterona em DHT), vasodilatação folicular mediada por canais de potássio (Minoxidil) e fornecimento de aminoácidos sulfurados (Cistina, Metionina) para queratinização da haste (J Am Acad Dermatol, 2020;82(3):e83-e84).',
    clinicalObjective: 'Prolongar a fase anágena, reverter a miniaturização folicular e espessar a haste capilar.',
    suggestedFormulas: [
      {
        id: 'trico_locao_antiqueda_fatores',
        title: 'Loção Tópica Capilar com Minoxidil, Fatores de Crescimento e Trichogen',
        category: 'capilar',
        categoryLabel: 'Uso Tópico Capilar Diário',
        route: 'USO CAPILAR',
        dosageForm: 'Loção Hidroalcoólica Capilar com Válvula Spray',
        quantity: '60 mL ou 100 mL',
        actives: [
          { id: '1', name: 'Minoxidil Base', concentration: '5%', role: 'Abertura de canais de K+ e prolongamento da fase anágena' },
          { id: '2', name: 'Nanofactor VEGF + IGF', concentration: '1% cada', role: 'Estímulo de angiogênese perifolicular' },
          { id: '3', name: 'Trichogen Veg Complex', concentration: '5%', role: 'Blend botânico bioativo redutor de DHT folicular' },
          { id: '4', name: 'Cafeína Anidra', concentration: '1%', role: 'Neutralização tópica dos efeitos do DHT e estimulante' },
          { id: '5', name: 'Biotina', concentration: '0.2%', role: 'Suporte à síntese de queratina' }
        ],
        activesText: 'Minoxidil Base ...................................... 5%\nNanofactor VEGF + IGF ........................ 1% cada\nTrichogen Veg Complex ..................... 5%\nCafeína Anidra ...................................... 1%\nBiotina ..................................................... 0.2%\nLoção TrichoSol / Veículo Capilar qsp .. 60 mL',
        posology: 'Aplicar 1 mL (cerca de 6 a 8 borrifadas) no couro cabeludo limpo e seco à noite, massageando suavemente com a ponta dos dedos.',
        duration: 'Uso contínuo por no mínimo 90 a 180 dias.',
        cautions: 'Lavar bem as mãos após a aplicação. Não aplicar sobre couro cabeludo com escoriações abertas ou queimaduras solares.'
      },
      {
        id: 'trico_polivitaminico_oral_forca',
        title: 'Polivitamínico e Fitoterápico Anti-Queda & Fortalecedor Folicular',
        category: 'oral',
        categoryLabel: 'Uso Oral Capilar',
        route: 'USO ORAL',
        dosageForm: 'Cápsulas',
        quantity: '60 cápsulas',
        actives: [
          { id: '1', name: 'Saw Palmetto Extrato Seco (Serenoa repens)', concentration: '320 mg', role: 'Inibidor natural da enzima 5-alfa redutase' },
          { id: '2', name: 'L-Cistina', concentration: '150 mg', role: 'Aminoácido constituinte fundamental da queratina capilar' },
          { id: '3', name: 'Biotina', concentration: '5 mg', role: 'Vitamina essencial do complexo B para unhas e cabelos' },
          { id: '4', name: 'Pantotenato de Cálcio (Vitamina B5)', concentration: '60 mg', role: 'Metabolismo folicular e redução de quebra' },
          { id: '5', name: 'Silício Orgânico (Nutricolin)', concentration: '100 mg', role: 'Aumento da ancoragem e espessura do bulbo' },
          { id: '6', name: 'Zinco Quelado + Ferro Bisglicinato', concentration: '15 mg + 14 mg', role: 'Minerais essenciais para divisão celular da matriz' }
        ],
        activesText: 'Saw Palmetto ........................................ 320 mg\nL-Cistina ................................................. 150 mg\nBiotina ..................................................... 5 mg\nPantotenato de Cálcio ........................ 60 mg\nSilício Orgânico .................................... 100 mg\nZinco Quelado ...................................... 15 mg\nFerro Bisglicinato ............................... 14 mg\nExcipiente gastro-resistente qsp .... 1 cápsula',
        posology: 'Tomar 1 cápsula 1 vez ao dia após o almoço ou café da manhã.',
        duration: 'Uso por 90 a 120 dias.'
      }
    ]
  },

  // 12. Microagulhamento / Drug Delivery / IPCA
  microagulhamento: {
    procedureKey: 'microagulhamento',
    procedureName: 'Microagulhamento & Drug Delivery',
    procedureSubtitle: 'Cascata Plaquetária, Fatores de Crescimento Estéreis & Reconstrução de Barreira',
    scientificJustification: 'A indução percutânea de colágeno por microagulhas ativa desgranulação de plaquetas e liberação de TGF-beta, PDGF e FGF, abrindo até 500.000 microcanais por cm² nas primeiras 4 a 6 horas. O uso de veículos aquosos estéreis com ácido hialurônico não reticulado e fatores de crescimento acelera a reepitelização sem risco de granulomas (J Cutan Aesthet Surg, 2018;11(4):214-219).',
    clinicalObjective: 'Fornecer ativos estéreis de drug delivery e manter hidratação pura livre de parabenos, perfumes ou óleos obstrutivos.',
    suggestedFormulas: [
      {
        id: 'micro_serum_esteril_pos',
        title: 'Sérum Pós-Microagulhamento Estéril com Fatores de Crescimento e Pantenol',
        category: 'pos_imediato',
        categoryLabel: 'Uso Tópico Pós-Imediato (Dias 1 a 5)',
        route: 'USO TÓPICO',
        dosageForm: 'Sérum Estéril Monodose ou Frasco Dropper',
        quantity: '30 mL',
        actives: [
          { id: '1', name: 'Nanofactor EGF + IGF', concentration: '1.5% cada', role: 'Acelera fechamento de micropertuitos e síntese de matriz' },
          { id: '2', name: 'D-Pantenol (Pró-Vitamina B5)', concentration: '5%', role: 'Alívio instantâneo do eritema e queimação' },
          { id: '3', name: 'Ácido Hialurônico Não Reticulado Puro', concentration: '1.5%', role: 'Hidratação profunda fisiológica estéril' },
          { id: '4', name: 'Madecassoside (Centella Asiatica)', concentration: '1%', role: 'Estímulo de colágeno III e cicatrização estéril' }
        ],
        activesText: 'Nanofactor EGF + IGF ........................ 1.5% cada\nD-Pantenol ............................................. 5%\nÁcido Hialurônico Puro ....................... 1.5%\nMadecassoside ..................................... 1%\nVeículo Aquoso Estéril qsp ............... 30 mL',
        posology: 'Aplicar 4 a 6 gotas em toda a face a cada 4 horas nas primeiras 48h. Evitar maquiagens e produtos com fragrância por 72h.',
        duration: '5 a 7 dias.',
        cautions: 'Não utilizar maquiagem ou filtros solares com base química pesada nas primeiras 24 horas.'
      }
    ]
  },

  // 13. Limpeza de Pele Profunda & Fototerapia
  limpeza_pele: {
    procedureKey: 'limpeza_pele',
    procedureName: 'Limpeza de Pele Profunda',
    procedureSubtitle: 'Controle de Secreção Sebácea, Ação Antisséptica & Hidratação Calmante',
    scientificJustification: 'A extração mecânica de comedões e pústulas exige antissepsia pré e pós com agentes bactericidas suaves (Óleo de Melaleuca/Tea Tree, Própolis) e ativos secativos anti-inflamatórios (Niacinamida, Zinco PCA) para prevenir foliculite e manchas pós-lesão (Clin Cosmet Investig Dermatol, 2017).',
    clinicalObjective: 'Acalmar eritema pós-extração, regular a microbiota cutânea e manter a barreira hidrolipídica equilibrada.',
    suggestedFormulas: [
      {
        id: 'limpeza_gel_calmante_secativo',
        title: 'Gel Calmante Secativo com Niacinamida, Zinco PCA e Tea Tree',
        category: 'manutencao',
        categoryLabel: 'Uso Tópico Home Care Diário',
        route: 'USO TÓPICO',
        dosageForm: 'Gel Facial Oil-Free',
        quantity: '50 g',
        actives: [
          { id: '1', name: 'Niacinamida (Vitamina B3)', concentration: '4%', role: 'Anti-inflamatório e clareador de manchas de acne' },
          { id: '2', name: 'Zinco PCA', concentration: '1%', role: 'Controle fisiológico da oleosidade e bactericida suave' },
          { id: '3', name: 'Óleo Essencial de Melaleuca (Tea Tree)', concentration: '0.5%', role: 'Antisséptico e purificante de poros' },
          { id: '4', name: 'Extrato de Camomila + Calêndula', concentration: '3%', role: 'Ação calmante e anti-eritema' }
        ],
        activesText: 'Niacinamida ............................................ 4%\nZinco PCA ................................................. 1%\nÓleo de Melaleuca (Tea Tree) .......... 0.5%\nExtrato de Camomila + Calêndula ... 3%\nGel Facial Toque Seco qsp ................. 50 g',
        posology: 'Aplicar na face limpa e seca 2 vezes ao dia (manhã e noite), antes do protetor solar.',
        duration: 'Uso contínuo.'
      }
    ]
  }
};

/**
 * Fallback default profile when no specific procedure is matched
 */
export const DEFAULT_PROCEDURE_PRESCRIPTION_PROFILE: ProcedurePrescriptionProfile = {
  procedureKey: 'geral',
  procedureName: 'Prescrição Estética & Home Care',
  procedureSubtitle: 'Suporte Cutâneo com Respaldo Científico, Fotoproteção & Regeneração',
  scientificJustification: 'Prescrição magistral dermatofuncional balanceada com ativos antioxidantes, hidratantes de barreira e fotoprotetores com comprovação científica para manutenção de resultados estéticos.',
  clinicalObjective: 'Preservar os resultados clínicos, hidratar profundamente o tecido e proteger a pele contra fotoenvelhecimento e estresse oxidativo.',
  suggestedFormulas: [
    {
      id: 'geral_serum_antioxidante_c',
      title: 'Sérum Antioxidante Iluminador com Vitamina C 15%, Ácido Ferúlico e Hialurônico',
      category: 'manutencao',
      categoryLabel: 'Uso Tópico Diário Matutino',
      route: 'USO TÓPICO',
      dosageForm: 'Sérum Anidro de Toque Seco',
      quantity: '30 mL',
      actives: [
        { id: '1', name: 'Vitamina C Pura (Ácido L-Ascórbico)', concentration: '15%', role: 'Antioxidante padrão-ouro e estimulante de colágeno' },
        { id: '2', name: 'Ácido Ferúlico', concentration: '0.5%', role: 'Estabilizador de Vitamina C e proteção solar biológica' },
        { id: '3', name: 'Vitamina E (Alfa-Tocoferol)', concentration: '1%', role: 'Sinergia antioxidante lipofílica' },
        { id: '4', name: 'Ácido Hialurônico Fracionado', concentration: '1%', role: 'Hidratação profunda sem oleosidade' }
      ],
      activesText: 'Vitamina C Pura .................................... 15%\nÁcido Ferúlico ....................................... 0.5%\nVitamina E ............................................. 1%\nÁcido Hialurônico ................................. 1%\nSérum Anidro Antioxidante qsp ...... 30 mL',
      posology: 'Aplicar 4 a 5 gotas na face limpa pela manhã, seguido de protetor solar FPS 50+.',
      duration: 'Uso diário contínuo.',
      scientificEvidence: 'A combinação de Vitamina C 15% com Ácido Ferúlico 0.5% e Vitamina E confere proteção antioxidante 8 vezes superior contra dano oxidativo UV (J Invest Dermatol, 2005;125(4):826-832).'
    },
    {
      id: 'geral_nutraceutico_rejuvenescimento',
      title: 'Nutracêutico Anti-Idade com Silício Orgânico, Biotina e Antioxidantes',
      category: 'oral',
      categoryLabel: 'Uso Oral Diário',
      route: 'USO ORAL',
      dosageForm: 'Cápsulas',
      quantity: '60 cápsulas',
      actives: [
        { id: '1', name: 'Silício Orgânico Nutricolin', concentration: '150 mg', role: 'Síntese de colágeno, elastina e queratina' },
        { id: '2', name: 'Biotina', concentration: '2.5 mg', role: 'Nutrição de anexos cutâneos e derme' },
        { id: '3', name: 'Coenzima Q10', concentration: '50 mg', role: 'Bioenergia mitocondrial' },
        { id: '4', name: 'Zinco Quelado', concentration: '15 mg', role: 'Mineral cicatrizante e antioxidante' }
      ],
      activesText: 'Silício Orgânico (Nutricolin) ........... 150 mg\nBiotina ..................................................... 2.5 mg\nCoenzima Q10 ........................................ 50 mg\nZinco Quelado ...................................... 15 mg\nExcipiente vegetal qsp ........................ 1 cápsula',
      posology: 'Tomar 1 cápsula 1 vez ao dia junto ao café da manhã.',
      duration: '60 a 90 dias.'
    }
  ]
};

/**
 * Resolves procedure profile for a given procedure context key or document title
 */
export function getProcedurePrescriptionProfile(procedureContextKey: string): ProcedurePrescriptionProfile {
  if (PROCEDURE_SCIENTIFIC_PRESCRIPTIONS[procedureContextKey]) {
    return PROCEDURE_SCIENTIFIC_PRESCRIPTIONS[procedureContextKey];
  }
  return DEFAULT_PROCEDURE_PRESCRIPTION_PROFILE;
}
