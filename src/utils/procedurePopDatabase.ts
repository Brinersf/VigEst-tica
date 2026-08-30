export interface ProcedurePopData {
  popCode: string;
  categoryTitle: string;
  technicalName: string;
  sanitaryScope: string;
  scientificFoundation: string;
  specificMaterials: string[];
  preparationAndReconstitution?: string;
  executionPhases: {
    title: string;
    description: string;
  }[];
  wasteDisposal: {
    groupE: string;
    groupA: string;
    groupD: string;
  };
  interventionsAndUrgency: string;
  references: string[];
}

export const PROCEDURE_POP_REGISTRY: Record<string, ProcedurePopData> = {
  toxina_botulinica: {
    popCode: 'POP-EST-TOX-01',
    categoryTitle: 'Injetáveis & Neuromoduladores',
    technicalName: 'Aplicação Intramuscular de Toxina Botulínica Tipo A',
    sanitaryScope: 'Tratamento de rugas dinâmicas do terço superior facial, hiperidrose e modulação miotensiva sob Boas Práticas (RDC ANVISA nº 63/2011).',
    scientificFoundation: 'A Toxina Botulínica Tipo A atua bloqueando seletivamente a liberação pré-sináptica de acetilcolina na junção neuromuscular por clivagem da proteína SNAP-25, promovendo denervação química temporária e relaxamento muscular dose-dependente reversível em 3 a 6 meses.',
    specificMaterials: [
      '01 Frasco-ampola de Toxina Botulínica Tipo A liofilizada com registro ativo na ANVISA (cadeia de frio 2°C a 8°C rigorosamente mantida).',
      'Solução Fisiológica de Cloreto de Sódio 0,9% estéril, injetável e sem conservantes (ampolas de 5ml ou 10ml).',
      'Seringas de precisão estéreis de 0,5ml ou 1ml com graduação em Unidades Internacionais (UI), com agulhas ultra-finas 31G/32G de 4mm ou 8mm.',
      'Agulhas de aspiração e reconstituição 21G ou 18G de uso único descartável.',
      'Clorexidina alcoólica a 0,5% para antissepsia cutânea e gazes hidrófilas estéreis.',
      'Lápis dermográfico branco / caneta cirúrgica estéril para mapeamento dinâmico dos feixes musculares.',
      'Bolsa térmica com gel refrigerador devidamente higienizado para analgesia prévia por crioterapia local.'
    ],
    preparationAndReconstitution: 'Higienizar a tampa do frasco com álcool 70%. Introduzir a agulha de reconstituição (21G) com a dosagem calculada de SF 0,9% estéril, permitindo que o líquido escorra lentamente pela parede interna sob vácuo sem formar espuma. Homogeneizar por suaves movimentos rotatórios sem agitação mecânica brusca para evitar desnaturação da cadeia proteica.',
    executionPhases: [
      {
        title: 'Fase 1 • Mapeamento Dinâmico e Antissepsia',
        description: 'Posicionar o paciente a 45°-90°. Solicitar mímicas faciais máximas (franzir testa, cara de bravo, sorrir forçado). Marcar os pontos mantendo margem de segurança de 1,5 a 2 cm acima da borda orbital superior para evitar migração ao músculo levantador da pálpebra superior. Antissepsia rigorosa da derme.'
      },
      {
        title: 'Fase 2 • Aspiração Imediata e Dosimetria',
        description: 'Aspirar as alíquotas exatas fracionadas por seringa imediatamente antes da punção, mantendo o frasco refrigerado. Não deixar seringas pré-preenchidas expostas à temperatura ambiente.'
      },
      {
        title: 'Fase 3 • Injeção Intramuscular / Intradérmica',
        description: 'Introduzir a agulha em ângulo de 45° a 90° conforme o plano muscular (músculo frontal: intramuscular superficial a 45°; corrugadores e prócero: perpendicular profundo a 90°; orbicular dos olhos: pápula intradérmica superficial a 30° com bisel voltado para cima). Injetar o volume em fluxo lento e controlado.'
      },
      {
        title: 'Fase 4 • Finalização e Compressão Estéril',
        description: 'Comprimir levemente com gaze estéril sem massagear ou friccionar. Checar ausência de hematomas pulsáteis. Descarte imediato dos perfurocortantes.'
      }
    ],
    wasteDisposal: {
      groupE: 'Agulhas 31G/32G, agulhas de aspiração 21G e frascos-ampola vazios de vidro descartados no coletor rígido Descarpack (sem reencapar).',
      groupA: 'Gazes embebidas em sangue, luvas de procedimento usadas e algodões descartados no saco plástico branco leitoso de risco biológico.',
      groupD: 'Embalagens de papelão externas e papel toalha descartados em lixeira comum acionada por pedal.'
    },
    interventionsAndUrgency: 'Em caso de ptose palpebral leve por difusão acidental, prescrever colírio de tartarato de brimonidina 0,15% ou apraclonidina 0,5% (1 a 2 gotas 3x ao dia) sob supervisão médica para estimular a contração do músculo de Müller. Em hematomas, prescrever compressas frias e gel de arnica/vitamina K.',
    references: [
      'Carruthers, J. & Carruthers, A. Botulinum toxin type A in the treatment of glabellar lines. J Am Acad Dermatol, 2002; 46(6):840-849.',
      'Hexsel, D. et al. Recommendations for the treatment of upper face dynamic lines with botulinum toxin. J Drugs Dermatol, 2017; 16(5):455-462.',
      'Small, R. Practical Guide to Botulinum Toxin Injections. Wolters Kluwer Health, 2012.',
      'ANVISA. Resolução RDC nº 63/2011 – Boas Práticas de Funcionamento de Serviços de Saúde e RDC nº 222/2018 (PGRSS).'
    ]
  },

  preenchimento_ah: {
    popCode: 'POP-EST-PRE-02',
    categoryTitle: 'Preenchedores & Volumizadores',
    technicalName: 'Preenchimento Dérmico e Supraperiosteal com Ácido Hialurônico Reticulado',
    sanitaryScope: 'Reestruturação facial, volumização e reposição compartimental com gel estéril de ácido hialurônico conforme RDC nº 63/2011.',
    scientificFoundation: 'O ácido hialurônico monofásico reticulado com BDDE (1,4-butanodiol diglicidil éter) confere viscoelasticidade (módulo G\') e capacidade higroscópica que restaura o suporte ósseo profundo e atenua sulcos dérmicos por integração na matriz extracelular tecidual.',
    specificMaterials: [
      'Seringas estéreis pré-envasadas de Gel de Ácido Hialurônico Reticulado (registro ANVISA, lote e rastreabilidade documental ativa).',
      'Microcânulas flexíveis estéreis com orifício lateral atraumático (calibres 22G e 25G de 38mm ou 50mm).',
      'Agulhas de pertuito estéreis (18G a 23G) compatíveis com o diâmetro da microcânula.',
      'Kit de Reversão Vascular Obrigatório na Sala: Hialuronidase injetável estéril (1500 a 3000 UTR) e ampolas de diluente.',
      'Solução antisséptica de Clorexidina Alcoólica 0,5% / Aquosa 2% e campos cirúrgicos fenestrados descartáveis.',
      'Lidocaína a 2% com epinefrina 1:200.000 (ou sem vasoconstritor) para botão anestésico no pertuito.',
      'Lápis dermográfico branco e gaze estéril estéril em embalagens individuais.'
    ],
    executionPhases: [
      {
        title: 'Fase 1 • Assepsia Cirúrgica e Anestesia de Pertuito',
        description: 'Lavagem das mãos com degermante, luvas estéreis. Antissepsia trina da face. Realização de botão anestésico com 0,05 a 0,1ml de lidocaína apenas no orifício de entrada da cânula com agulha 30G.'
      },
      {
        title: 'Fase 2 • Confecção de Pertuito e Inserção de Microcânula',
        description: 'Perfurar a epiderme/derme em ângulo de 45° a 90° com agulha guia. Introduzir a microcânula romba no plano anatômico pré-definido (plano supraperiosteal para sustentação óssea profunda ou plano subcutâneo intermediário para preenchimento volumétrico).'
      },
      {
        title: 'Fase 3 • Teste de Aspiração & Retroinjeção Fracionada',
        description: 'Quando usada agulha em planos profundos (ex: bolus supraperiosteal), manter aspiração negativa estática por no mínimo 5 a 8 segundos. Com microcânula, proceder à retroinjeção contínua e suave em microtúneis ou microbolus (máximo 0,05 a 0,1ml por vetor).'
      },
      {
        title: 'Fase 4 • Avaliação de Perfusão e Moldagem',
        description: 'Testar imediatamente o tempo de enchimento capilar (TEC < 2s). Verificar simetria, coloração da pele (ausência de palidez ou livedo reticular) e moldar delicadamente com compressa de gaze umedecida em soro.'
      }
    ],
    wasteDisposal: {
      groupE: 'Agulhas de pertuito, microcânulas e seringas de vidro do preenchedor com ponta descartadas no coletor Descarpack sem desmontar.',
      groupA: 'Campos fenestrados com resíduos de fluidos, gazes com sangue e luvas cirúrgicas no saco plástico infectante.',
      groupD: 'Caixas de acondicionamento do produto, bulas e plásticos de embalagem externa em lixeira comum.'
    },
    interventionsAndUrgency: 'EM CASO DE SUSPEITA DE OCLUSÃO VASCULAR (branqueamento cutâneo súbito, dor desproporcional, alteração no TEC > 3s ou livedo marmóreo): INTERROMPER O PROCEDIMENTO IMEDIATAMENTE. Aplicar Hialuronidase em alta dose pulsada (300 a 1500 UI por hora no trajeto vascular acometido), compressas mornas, massagem local vigorosa e acionar supervisão médica para prescrição de vasodilatador (Sildenafila 50mg / AAS 100mg) e corticoterapia.',
    references: [
      'De Maio, M. MD Codes: A Methodological Approach to Facial Aesthetic Treatment with Hyaluronic Acid Fillers. Aesthetic Plast Surg, 2021; 45(2):690-709.',
      'DeLorenzi, C. New high dose pulsed hyaluronidase protocol for hyaluronic acid vascular occlusion. Aesthet Surg J, 2017; 37(7):814-825.',
      'Rohrich, R.J. et al. The Facial Injections: Anatomy and Safety. Plast Reconstr Surg, 2019; 144(3):575-585.',
      'ANVISA. Boas Práticas e Rastreabilidade de Dispositivos Médicos Injetáveis (RDC nº 63/2011 e RDC nº 67/2007).'
    ]
  },

  bioestimulador: {
    popCode: 'POP-EST-BIO-03',
    categoryTitle: 'Bioestímulo & Neocolagênese',
    technicalName: 'Aplicação Subdérmica de Bioestimuladores de Colágeno (PLLA / CaHA / PCL)',
    sanitaryScope: 'Indução biológica de neocolagênese tipo I e III em face e corpo para tratamento de flacidez tecidual (RDC ANVISA nº 63/2011).',
    scientificFoundation: 'As microesferas biocompatíveis e reabsorvíveis (Ácido Poli-L-Lático ou Hidroxiapatita de Cálcio) desencadeiam uma reação inflamatória subclínica controlada mediada por macrófagos, atraindo fibroblastos que sintetizam novas fibras colágenas e elásticas ao longo de 90 a 180 dias.',
    specificMaterials: [
      'Frasco estéril de Bioestimulador de Colágeno com registro ANVISA (PLLA - Ácido Poli-L-Lático liofilizado ou Hidroxiapatita de Cálcio CaHA).',
      'Água para Injetáveis estéril (API) ou Solução Fisiológica 0,9% para hidratação e reconstituição padronizada.',
      'Lidocaína a 2% sem vasoconstritor para anestesia e diluição de conforto tecidual.',
      'Microcânulas estéreis 22G ou 21G de 50mm ou 70mm e agulhas guias 18G/21G.',
      'Seringas Luer-Lock de 3ml, 5ml e 10ml com conectores estéreis bidirecionais (Torneirinha de 3 vias ou conector Luer-to-Luer).',
      'Clorexidina alcoólica a 0,5% e gazes estéreis.',
      'Creme hidratante neutro descartável estéril para realização da massagem mecânica imediata pós-injeção.'
    ],
    preparationAndReconstitution: 'PLLA: Reconstituir com Água para Injetáveis 24h a 48h antes do procedimento para garantir hidratação homogênea das micropartículas, adicionando 2ml de Lidocaína 2% imediatamente antes do uso. CaHA: Homogeneizar com SF 0,9% e lidocaína através de 20 a 30 passagens vigorosas de seringa a seringa com conector Luer-Lock estéril.',
    executionPhases: [
      {
        title: 'Fase 1 • Planejamento Vetorial e Antissepsia',
        description: 'Com o paciente em ortostase, desenhar vetores em leque divergente respeitando as zonas seguras (evitar região periorbital, perioral e testa central). Antissepsia cirúrgica completa.'
      },
      {
        title: 'Fase 2 • Confecção de Pertuito e Inserção no Plano Subdérmico',
        description: 'Realizar botão anestésico com 0,1ml de lidocaína. Puncionar com agulha guia e introduzir a microcânula 22G no plano celular subcutâneo superficial / subdérmico profundo (onde há deslizamento suave sem resistência dérmica excessiva).'
      },
      {
        title: 'Fase 3 • Retroinjeção em Leque Homogêneo (Fanning)',
        description: 'Distribuir o produto em retroinjeções lineares contínuas de 0,05ml a 0,1ml por trajeto, em padrão de cruzamento tridimensional, certificando-se de não depositar bolus concentrado em ponto único.'
      },
      {
        title: 'Fase 4 • Massagem Vigorosa Imediata de Dispersão',
        description: 'Aplicar creme emoliente estéril e realizar massagem mecânica vigorosa e bidigital por 5 minutos contínuos na área tratada para dispersar uniformemente os microcristais e prevenir formação de pápulas.'
      }
    ],
    wasteDisposal: {
      groupE: 'Microcânulas, agulhas guias, conectores e frascos de vidro no Descarpack.',
      groupA: 'Seringas contaminadas com fluido biológico, luvas e gazes no saco de lixo infectante branco.',
      groupD: 'Caixas de papelão e envelopes plásticos estéreis em lixo comum reciclável.'
    },
    interventionsAndUrgency: 'Para prevenção e manejo de nódulos ou pápulas tardias: instruir estritamente a "Regra dos 5" (massagem 5x ao dia por 5 minutos durante 5 dias). Se nódulos inflamatórios persistirem após 30 dias, infiltrar soro fisiológico estéril vigorosamente para hidratação mecânica e associar infiltração intralesional de Triancinolona (2 a 5 mg/ml) sob supervisão médica.',
    references: [
      'Vleggaar, D. et al. Consensus recommendations on the use of injectable poly-L-lactic acid for facial and body volumization. J Drugs Dermatol, 2014; 13(4 Suppl):s29-39.',
      'Kadouch, J.A. Calcium hydroxylapatite: A review on safety and efficacy in facial aesthetics. J Cosmet Dermatol, 2017; 16(2):152-161.',
      'Goldie, K. et al. Global Consensus Guidelines for the Injection of Diluted and Hyperdiluted Calcium Hydroxylapatite for Skin Tightening. Dermatol Surg, 2020; 46(8):1034-1044.',
      'ANVISA. RDC nº 63/2011 e Diretrizes Clínicas em Terapias Injetáveis Regenerativas.'
    ]
  },

  fios_pdo: {
    popCode: 'POP-EST-FIO-04',
    categoryTitle: 'Suturas & Fios Absorvíveis',
    technicalName: 'Implantação Subdérmica de Fios de Polidioxanona (PDO) para Sustentação e Bioestímulo',
    sanitaryScope: 'Reproposicionamento tecidual e indução fibrosa dérmica por implantação estéril de fios cirúrgicos absorvíveis de PDO conforme RDC nº 63/2011.',
    scientificFoundation: 'A polidioxanona é um polímero sintético biodegradável que provoca miofibrogênese e neovascularização periférica. Fios espiculados ancoram na fáscia/SMAS para sustentação mecânica imediata, enquanto fios lisos ou parafusos promovem bioestímulo dérmico contínuo durante sua hidrólise total em 180 a 240 dias.',
    specificMaterials: [
      'Envelopes estéreis selados com Fios de PDO (espiculados com garras tridimensionais, lisos em malha ou filler/screw) com registro ANVISA.',
      'Cânulas ou agulhas guias condutoras siliconadas pré-montadas de uso único estéril.',
      'Lidocaína a 2% com epinefrina 1:200.000 para bloqueio tumescente anestésico de pertuito e túnel de tração.',
      'Cânula de infiltração anestésica 21G/22G de 70mm.',
      'Tesoura cirúrgica delicada curva estéril (tipo Iris) e pinça anatômica dente de rato estéril.',
      'Solução de Clorexidina Alcoólica a 0,5% e campo fenestrado cirúrgico estéril com barreira antimicrobiana.',
      'Curativo estéril estéril oclusivo impermeável / fitas de contenção microporosa hipoalergênica.'
    ],
    executionPhases: [
      {
        title: 'Fase 1 • Desenho Vetorial com Paciente em Posição Ortostática',
        description: 'Demarcar os pontos de fixação anatômica proximal (fáscia temporal profunda, linha da implantação capilar) e os trajetos dos vetores até o sulco nasogeniano, linha da marionete ou jowl.'
      },
      {
        title: 'Fase 2 • Paramentação Cirúrgica e Anestesia de Trajeto',
        description: 'Degermar mãos, luvas cirúrgicas estéreis. Antissepsia ampla. Realizar botão anestésico com lidocaína no ponto de entrada e infiltração retrógrada anestésica de 0,5 a 1,0ml ao longo de todo o trajeto subcutâneo do vetor.'
      },
      {
        title: 'Fase 3 • Inserção da Cânula Portadora e Implantação do Fio',
        description: 'Puncionar a derme com agulha guia e introduzir a cânula com o fio de PDO no plano subcutâneo exato (SMAS/hipoderme média). Deslizar sem transfixar a derme para evitar covinhas (dimpling) nem aprofundar na musculatura nobre.'
      },
      {
        title: 'Fase 4 • Tração Mecânica, Acomodação Tecidual e Corte Subdérmico',
        description: 'Imobilizar o tecido proximal, remover a cânula guia permitindo a abertura das espículas. Tracionar o vetor cranialmente para reposicionamento do coxim gorduroso. Pressionar a pele para baixo, cortar o fio 2mm abaixo do nível da derme e liberar a pele para que a extremidade do fio fique totalmente sepultada.'
      }
    ],
    wasteDisposal: {
      groupE: 'Cânulas portadoras de fios, agulhas de botão anestésico e pontas metálicas no coletor de perfurocortantes Descarpack.',
      groupA: 'Fragmentos de fios de PDO cortados contaminados com exsudato, campos estéreis e luvas no saco de lixo infectante.',
      groupD: 'Invólucros de alumínio dos fios, caixas e protetores plásticos estéreis em lixeira comum reciclável.'
    },
    interventionsAndUrgency: 'Em caso de extrusão distal de ponta de fio ou ponta palpável: realizar antissepsia estrita, pinçar a extremidade exposta com pinça estéril, cortar abaixo da derme sob anestesia local e ocluir com curativo estéril. Em infecções locais persistentes, iniciar terapia antibiótica (Cefalexina / Ciprofloxacino) sob supervisão médica.',
    references: [
      'Savoia, A. et al. Outcomes in thread lift for facial rejuvenation: a survey study with polydioxanone threads. Dermatol Surg, 2014; 40(5):525-532.',
      'Kang, S.H. et al. Anatomical considerations for thread-lifting techniques in Asians. Arch Plast Surg, 2020; 47(3):214-222.',
      'Atiyeh, B.S. et al. Barbed sutures in aesthetic plastic surgery: evolution of thought and current concepts. Aesthet Surg J, 2010; 30(1):83-94.',
      'ANVISA. Resoluções Sanitárias sobre Implantes Cirúrgicos Absorvíveis e Biossegurança em Procedimentos Invasivos.'
    ]
  },

  peeling: {
    popCode: 'POP-EST-PEL-05',
    categoryTitle: 'Cosmiatria & Quimioesfoliação',
    technicalName: 'Aplicação de Peeling Químico Dermatológico Magistral Superficial e Médio',
    sanitaryScope: 'Quimioesfoliação controlada da epiderme e derme papilar para renovação celular, tratamento de discromias e rejuvenescimento dérmico (RDC ANVISA nº 63/2011).',
    scientificFoundation: 'Os ácidos dermatológicos (Alfa-hidroxiácidos, Beta-hidroxiácidos, Ácido Retinóico ou Solução de Jessner/TCA) promovem quebra de pontes intercorneocitárias, coagulação proteica e queratólise química, estimulando mitose na camada basal e reestruturação do colágeno dérmico.',
    specificMaterials: [
      'Frasco de agente esfoliante químico padronizado em concentração dermatológica certificada com laudo magistral / registro ANVISA (ex: Ácido Glicólico 50%-70%, Ácido Mandélico 30%-50%, Ácido Salicílico 20%-30%, Ácido Retinóico 5%-10% ou TCA 10%-20%).',
      'Solução pré-peeling desengordurante e higienizadora (álcool isopropílico ou solução alcoólica suave).',
      'Solução neutralizante alcalina de Bicarbonato de Sódio a 5% ou 10% em água purificada estéril.',
      'Pincéis tipo leque macios de cerdas naturais desinfetados ou hastes de algodão estéreis.',
      'Protetor de mucosas (Pomada de vaselina sólida estéril para comissura labial, asa nasal e canto dos olhos).',
      'Cronômetro digital com alarme sonoro.',
      'Soro fisiológico 0,9% gelado e máscaras de compressa não tecida (TNT) estéreis.',
      'Protetor solar 100% físico e mineral hipoalergênico FPS 50+ / PPD 20+.'
    ],
    executionPhases: [
      {
        title: 'Fase 1 • Preparo Cutâneo, Desengorduramento e Proteção de Mucosas',
        description: 'Higienizar com gel de limpeza neutro. Aplicar solução desengordurante com gaze para remover o filme lipídico de maneira uniforme. Isolar as comissuras labiais, sulcos alares do nariz e contorno palpebral inferior com vaselina sólida estéril.'
      },
      {
        title: 'Fase 2 • Aplicação Controlada do Agente Químico e Cronometragem',
        description: 'Aplicar o ácido com pincel leque ou gaze em camadas rápidas e uniformes: iniciar pela região frontal, descendo para têmporas, malares, dorso nasal, queixo e por último região perioral. Disparar cronômetro imediatamente. Monitorar hiperemia, queixas de ardência e formação de frost (coagulação proteica).'
      },
      {
        title: 'Fase 3 • Neutralização Ativa ou Remoção do Agente',
        description: 'Para ácidos dependentes de neutralização (ex: Glicólico), borrifar a solução neutralizante de Bicarbonato de Sódio 10% uniformemente sobre toda a face até cessar a efervescência ácida. Lavar abundantemente com gaze embebida em soro fisiológico gelado.'
      },
      {
        title: 'Fase 4 • Aplicação de Agente Regenerador e Filtro Físico',
        description: 'Aplicar creme pós-procedimento com ceramidas, pantenol e ácido hialurônico de baixo peso molecular, seguido de generosa camada de fotoprotetor 100% mineral físico.'
      }
    ],
    wasteDisposal: {
      groupE: 'Não gera perfurocortantes comuns (exceto se uso de lancetas/agulhas para drenagem de cistos correlatos).',
      groupA: 'Gazes embebidas em agentes químicos e resíduos dérmicos, luvas de procedimento no saco infectante.',
      groupD: 'Embalagens secundárias e papel toalha descartados em lixeira comum.'
    },
    interventionsAndUrgency: 'Em caso de queimadura química focal ou eritema persistente: lavar com soro fisiológico gelado abundante por 15 minutos, neutralizar totalmente com bicarbonato 10%, prescrever corticóide tópico suave (Desonida 0,05% pomada) por 3 dias e cicatrizante oclusivo (Aquaphor / Cicaplast) sob supervisão médica.',
    references: [
      'Deprez, P. Textbook of Chemical Peels: Superficial, Medium, and Deep Peels in Clinical Practice. CRC Press, 2016.',
      'Brody, H.J. et al. Consensus on chemical peels. Dermatol Surg, 2000; 26(2):105-109.',
      'Landau, M. Chemical peels: principles and practice. Clin Dermatol, 2008; 26(2):200-208.',
      'ANVISA. Resolução RDC nº 63/2011 e Guia de Controle de Qualidade de Produtos Cosméticos e Químicos Magistrais.'
    ]
  },

  microagulhamento: {
    popCode: 'POP-EST-MIC-06',
    categoryTitle: 'Indução Percutânea & Drug Delivery',
    technicalName: 'Indução Percutânea de Colágeno por Microagulhamento (IPCA) & Drug Delivery Estéril',
    sanitaryScope: 'Terapia de microagulhamento estéril para atenuação de cicatrizes de acne, melasma, estrias e rejuvenescimento facial conforme RDC nº 63/2011.',
    scientificFoundation: 'O rolamento de microagulhas estéreis ou caneta dermatológica transpassa o estrato córneo gerando microlesões controladas com sangramento pontiforme dérmico, desencadeando cascata inflamatória com liberação de fatores de crescimento (PDGF, TGF-beta e VEGF) e canais transitórios para infusão de ativos tópicos estéreis.',
    specificMaterials: [
      'Dispositivo de Microagulhamento Estéril (Dermaroller de 540 microagulhas de titânio ou cartuchos de microagulhas estéreis descartáveis de 12/24/36 pontas para Dermapen) com selo ANVISA inviolado.',
      'Monodoses estéreis de Drug Delivery cosmecêutico (Ácido Hialurônico não reticulado estéril, Vitamina C lipossomada estéril, Fatores de Crescimento EGF/TGF e silício orgânico).',
      'Anestésico tópico dermatológico de alta potência (Lidocaína 4% a 7% gel/creme).',
      'Clorexidina aquosa a 2% e gazes estéreis.',
      'Soro fisiológico 0,9% estéril para limpeza e irrigação dérmica durante as passagens.',
      'Máscara calmante hidroplástica / biocelulose estéril pré-refrigerada.'
    ],
    executionPhases: [
      {
        title: 'Fase 1 • Anestesia Tópica e Assepsia Cirúrgica Prévia',
        description: 'Higienizar a face, aplicar camada espessa de lidocaína tópica oclusiva por 25 a 35 minutos. Remover 100% do anestésico com gaze seca e realizar antissepsia vigorosa com clorexidina aquosa para remover qualquer resíduo oleoso.'
      },
      {
        title: 'Fase 2 • Regulagem de Profundidade e Passadas Padronizadas',
        description: 'Ajustar o equipamento (0,5mm para absorção de ativos / melasma; 1,0mm a 2,0mm para cicatrizes de acne e rejuvenescimento dérmico). Executar passadas cruzadas (vertical, horizontal e diagonais: 4 a 6 vezes por quadrante) esticando a pele com a mão contralateral até obtenção do orvalho sanguíneo uniforme.'
      },
      {
        title: 'Fase 3 • Aplicação Asséptica de Drug Delivery Estéril',
        description: 'Gotejar as monodoses estéreis de princípios ativos biocompatíveis imediatamente após a abertura dos microcanais, espalhando suavemente com a ponta enluvada estéril.'
      },
      {
        title: 'Fase 4 • Limpeza com Soro Fisiológico e Máscara Oclusiva',
        description: 'Remover o excesso de sangue com gaze embebida em soro fisiológico estéril (sem esfregar). Aplicar máscara estéril regeneradora por 15 minutos.'
      }
    ],
    wasteDisposal: {
      groupE: 'O rolo de microagulhas (Dermaroller) ou o cartucho de agulhas da caneta elétrica é ESTRITAMENTE DE USO ÚNICO DESCARTÁVEL. Descartar imediatamente no coletor Descarpack na frente do paciente.',
      groupA: 'Gazes ensanguentadas, máscaras descartáveis e luvas cirúrgicas no saco plástico branco leitoso de resíduo biológico.',
      groupD: 'Embalagens esterilizadas plásticas e de papel no lixo comum reciclável.'
    },
    interventionsAndUrgency: 'Em caso de dermatite de contato ou infecção secundária (crostas melicéricas por Staphylococcus): orientar limpeza com soro fisiológico, suspender cosméticos e acionar supervisão médica para introdução de antibioticoterapia tópica (Mupirocina 2%) ou oral.',
    references: [
      'Lima, E.V.A. et al. Indução percutânea de colágeno com agulhas (IPCA): estudo preliminar em cicatrizes deprimidas e fotoenvelhecimento. Surg Cosmet Dermatol, 2013; 5(3):215-219.',
      'Fabbrocini, G. et al. Skin needling: a clinical and histopathological study of a new technique for skin revitalization. J Plast Dermatol, 2009; 5(2):163-171.',
      'Fernandes, D. Minimally invasive percutaneous collagen induction. Oral Maxillofac Surg Clin North Am, 2005; 17(1):51-63.',
      'ANVISA. Alerta Sanitário sobre Reutilização Proibida de Dispositivos Perfurocortantes e Normativa RDC nº 63/2011.'
    ]
  },

  lipoenzimatica: {
    popCode: 'POP-EST-LIP-07',
    categoryTitle: 'Mesoterapia & Lipoescultura Não Cirúrgica',
    technicalName: 'Mesoterapia Lipolítica Injetável / Lipoenzimática Subcutânea',
    sanitaryScope: 'Redução de adiposidades localizadas submentonianas (papada) e corporais por injeção intradérmica/subcutânea sob RDC nº 63/2011.',
    scientificFoundation: 'Os fármacos lipolíticos biocompatíveis (Ácido Desoxicólico, Fosfatidilcolina, Cafeína, L-Carnitina e Silício Orgânico) atuam destruindo a membrana celular dos adipócitos (adipocitolise química) ou estimulando a lipólise mediada por receptores beta-adrenérgicos com emulsificação de triglicerídeos.',
    specificMaterials: [
      'Mesclas lipolíticas estéreis injetáveis com laudo e liberação de esterilidade / registro ANVISA (ex: Ácido Desoxicólico 1% ou Mescla Lipolítica Corporal).',
      'Seringas descartáveis de 1ml, 3ml ou 5ml estéreis com encaixe Luer-Lock.',
      'Agulhas de aplicação mesoterápica extra-finas 30G ou 32G de 4mm (para injeção facial/papada) ou 30G de 13mm (para hipoderme corporal profunda).',
      'Agulhas de aspiração 21G ou 18G.',
      'Clorexidina alcoólica a 0,5% e gazes estéreis hidrófilas.',
      'Lápis dermográfico cirúrgico para confecção da grade quadriculada de pontos.',
      'Gelo térmico higienizado para analgesia pré e pós-aplicação.'
    ],
    executionPhases: [
      {
        title: 'Fase 1 • Mapeamento da Grade Anatômica (Pinching Test)',
        description: 'Avaliar a prega de gordura com adipômetro ou pinçamento manual (mínimo de 1 a 1,5 cm de espessura de tecido adiposo). Desenhar grade de pontos com espaçamento de 1,0 cm entre cada ponto na região submentoniana ou 1,5 a 2,0 cm na região corporal, delimitando a área de segurança (1,5 cm de distância do ramo marginal mandibular).'
      },
      {
        title: 'Fase 2 • Aspiração Asséptica das Alíquotas',
        description: 'Aspirar as ampolas estéreis com agulha 21G para as seringas de 1ml ou 3ml, trocando para agulha 30G/32G para a injeção.'
      },
      {
        title: 'Fase 3 • Injeção Perpendicular no Tecido Adiposo Profundo',
        description: 'Pinçar a prega adiposa com a mão não dominante, introduzir a agulha em ângulo de 90° diretamente no centro da hipoderme. Injetar 0,1ml a 0,2ml por ponto (dose máxima total conforme protocolo). Proibido injetar na derme superficial (risco de necrose cutânea) ou na fáscia muscular.'
      },
      {
        title: 'Fase 4 • Assepsia Final e Crioterapia Suave',
        description: 'Comprimir levemente com gaze estéril, higienizar com clorexidina e aplicar gelo por 5 minutos para alívio do ardor inflamatório transitório.'
      }
    ],
    wasteDisposal: {
      groupE: 'Agulhas 30G/32G, agulhas de aspiração 21G e ampolas de vidro quebradas no coletor Descarpack.',
      groupA: 'Algodões com exsudato, gazes com resíduos e luvas no saco de lixo biológico.',
      groupD: 'Embalagens externas em lixeira comum.'
    },
    interventionsAndUrgency: 'O edema inflamatório local, eritema e calor são esperados nos primeiros 3 a 5 dias. Em caso de dor extrema, assimetria de sorriso por neuropraxia do ramo marginal ou necrose dérmica superficial: prescrever anti-inflamatório oral, compressas frias e acionar supervisão médica para suporte clínico imediato.',
    references: [
      'Rotunda, A.M. et al. Detergent effects of sodium deoxycholate are a major cause of fat dissolution. Dermatol Surg, 2004; 30(7):1001-1008.',
      'Hexsel, D. et al. Deoxycholic acid injection for reduction of submental fat: clinical trials and safety profile. J Am Acad Dermatol, 2016; 74(5):AB248.',
      'Salti, G. et al. Submental fat reduction: a systematic review of the efficacy and safety of ATX-101. J Cosmet Laser Ther, 2018; 20(3):148-155.',
      'ANVISA. RDC nº 63/2011 e Resoluções sobre Preparações Injetáveis Lipolíticas.'
    ]
  },

  gluteos: {
    popCode: 'POP-EST-GLU-08',
    categoryTitle: 'Harmonização & Bioplastia Corporal',
    technicalName: 'Harmonização, Biovolumização e Bioestímulo Glúteo Avançado',
    sanitaryScope: 'Modelagem dos contornos corporais glúteos, elevação e tratamento de depressões trocantéricas conforme RDC ANVISA nº 63/2011.',
    scientificFoundation: 'A injeção de biomateriais estéreis biocompatíveis (Polímeros de Ácido Hialurônico Corporal reticulado de alta densidade ou Bioestimuladores como PLLA/CaHA de alta concentração) restaura a projeção do quadrante súpero-lateral e preenche a fossa trocantérica sem risco de embolia gordurosa sistêmica quando realizada estritamente no plano subcutâneo com cânulas rombas de grande calibre.',
    specificMaterials: [
      'Frascos de Ácido Hialurônico de alta viscosidade corporal (20mg/ml a 30mg/ml) ou Bioestimuladores Glúteos estéreis registrados na ANVISA.',
      'Microcânulas corporais estéreis de ponta romba 18G ou 20G de 100mm a 150mm de comprimento.',
      'Agulhas de pertuito 16G ou 18G.',
      'Solução anestésica tumescente modificada (Soro Fisiológico 0,9% 100ml + Lidocaína 2% 20ml + Epinefrina 1mg).',
      'Cânula de infiltração anestésica 18G de 150mm e seringas de 20ml / 50ml Luer-Lock.',
      'Campo cirúrgico estéril amplo impermeável e avental cirúrgico estéril para o profissional.',
      'Clorexidina degermante 2% e alcoólica 0,5% para antissepsia pré-operatória estrita.'
    ],
    executionPhases: [
      {
        title: 'Fase 1 • Demarcação Anatômica em Ortostase e Triangulação Glútea',
        description: 'Paciente em pé com musculatura relaxada. Desenhar a zona de projeção máxima (ponto G glúteo), triângulo de segurança lateral e depressão trocantérica, evitando o trajeto do nervo ciático e vasos glúteos profundos no quadrante ínfero-medial.'
      },
      {
        title: 'Fase 2 • Antissepsia Cirúrgica e Anestesia Tumescente',
        description: 'Paciente em decúbito ventral. Antissepsia ampla de todo o dorso e glúteos. Realizar pertuito na espinha ilíaca póstero-superior ou linha lateral. Infiltrar 20ml a 50ml de anestésico tumescente estéril no plano subcutâneo.'
      },
      {
        title: 'Fase 3 • Retroinjeção Subcutânea em Leque Tridimensional',
        description: 'Introduzir a microcânula 18G/20G no plano hipodérmico médio/profundo (acima da fáscia do músculo glúteo máximo, NUNCA intramuscular). Realizar retroinjeções lineares contínuas em leque com aspiração prévia.'
      },
      {
        title: 'Fase 4 • Modelagem, Curativo Oclusivo e Contenção',
        description: 'Moldar a área com compressa estéril. Ocluir os pertuitos com fita estéril e micropore. Colocação imediata da cinta compressiva ou bermuda de sustentação.'
      }
    ],
    wasteDisposal: {
      groupE: 'Cânulas 18G, agulhas de pertuito 16G e seringas descartadas no Descarpack sem desmontar.',
      groupA: 'Campos cirúrgicos contaminados, gazes volumosas com sangue e aventais descartáveis no lixo biológico.',
      groupD: 'Papelão e plásticos de embalagens em lixo comum.'
    },
    interventionsAndUrgency: 'Em caso de febre, rubor progressivo, flutuação ou celulite infecciosa após 48-72h: coletar hemocultura/exsudato, prescrever esquema antibiótico parenteral ou oral de amplo espectro (Ciprofloxacino + Clindamicina) e acompanhamento médico contínuo.',
    references: [
      'Frank, K. et al. The functional anatomy of the gluteal region and safety considerations for gluteal reshaping. Plast Reconstr Surg, 2019; 144(6):1093e-1100e.',
      'Bravo, B.S.F. et al. Gluteal biostimulation and volumization: protocols and safety guidelines. Surg Cosmet Dermatol, 2021; 13(2):145-152.',
      'ANVISA. Diretrizes de Biossegurança e Uso Exclusivo de Cânulas Rombas em Procedimentos Invasivos Corporais.'
    ]
  },

  peim: {
    popCode: 'POP-EST-PEI-09',
    categoryTitle: 'Flebologia Estética & Microvasos',
    technicalName: 'Procedimento Estético Injetável em Microvasos (PEIM) / Escleroterapia Química Líquida',
    sanitaryScope: 'Secagem estética de telangiectasias e veias reticulares de membros inferiores (RDC nº 63/2011).',
    scientificFoundation: 'A injeção intravascular de agente esclerosante hiperosmolar (Glicose 75% injetável estéril) ou detergente (Polidocanol) induz desidratação das células endoteliais, inflamação química asséptica da íntima vascular e consequente oclusão fibrótica e reabsorção fisiológica da telangiectasia pelo organismo.',
    specificMaterials: [
      'Ampolas estéreis de Glicose Hiperosmolar 75% estéril injetável (ou Polidocanol a 0,5%).',
      'Seringas de insulina descartáveis estéreis de 1ml com bico slip ou luer lock.',
      'Agulhas extra-curtas e finas 30G ou 31G de 4mm a 8mm.',
      'Agulhas 21G de aspiração.',
      'Lente de aumento / Lupa dermatológica com iluminação LED polarizada ou transiluminador venoso (Venoscópio).',
      'Algodão em rolinho estéril e fita microporosa para confecção de micropelotas compressivas.',
      'Álcool a 70% ou Clorexidina alcoólica a 0,5% e gazes estéreis.'
    ],
    executionPhases: [
      {
        title: 'Fase 1 • Exame Físico Vascular e Mapeamento',
        description: 'Paciente em ortostase para inspeção da rede venosa e descarte de insuficiência de safena (CEAP C2+). Em seguida, posicionar o paciente em decúbito na maca com iluminação focada.'
      },
      {
        title: 'Fase 2 • Punção Intravascular de Precisão',
        description: 'Antissepsia rigorosa da pele. Tracionar a pele paralelamente ao vaso. Introduzir a agulha 30G/31G com o bisel voltado para cima em ângulo quase rasante (10° a 15°) até a luz da telangiectasia.'
      },
      {
        title: 'Fase 3 • Injeção Lenta e Deslocamento da Coluna Sanguínea',
        description: 'Injetar lentamente de 0,05ml a 0,1ml da solução de glicose 75% por punção. Observar o clareamento imediato do vaso com o esvaziamento do fluxo sanguíneo. Interromper imediatamente se houver resistência mecânica ou formação de pápula esbranquiçada dérmica (extravasamento perivascular).'
      },
      {
        title: 'Fase 4 • Compressão Local Imediata',
        description: 'Pressionar imediatamente com rolinho de algodão seco estéril e fixar com micropore para manter oclusão mecânica do vaso esclerosado.'
      }
    ],
    wasteDisposal: {
      groupE: 'Agulhas 30G/31G com sangue e ampolas de vidro de glicose no coletor Descarpack.',
      groupA: 'Algodões embebidos em sangue e luvas no saco plástico branco leitoso de risco biológico.',
      groupD: 'Embalagens plásticas e papel no lixo comum reciclável.'
    },
    interventionsAndUrgency: 'Em caso de extravasamento de agente hipertônico com risco de úlcera dérmica: infiltrar soro fisiológico estéril no local para diluição osmótica imediata. Em caso de hiperpigmentação pós-inflamatória (depósito de hemossiderina), orientar uso de quelante de ferro (Ácido Tioglicólico) e fotoproteção sob supervisão médica.',
    references: [
      'Rabe, E. et al. European guidelines for sclerotherapy in chronic venous disorders. Phlebology, 2014; 29(6):338-354.',
      'Goldman, M.P. et al. Sclerotherapy: Treatment of Varicose and Telangiectatic Leg Veins. 6th ed. Elsevier, 2017.',
      'ANVISA. RDC nº 63/2011 e Diretrizes Clínicas em Procedimentos Estéticos Flebológicos.'
    ]
  },

  biorreguladores: {
    popCode: 'POP-EST-BIO-09',
    categoryTitle: 'Biorremodelação & Polinucleotídeos',
    technicalName: 'Biorremodelação Celular Tecidual, Polinucleotídeos (PDRN) e Técnica BAP',
    sanitaryScope: 'Regeneração da matriz extracelular, biorremodelação celular dérmica e estimulação fibroblástica através de complexos híbridos de Ácido Hialurônico de alta e baixa densidade molecular e Polinucleotídeos (PDRN) sob RDC ANVISA nº 63/2011.',
    scientificFoundation: 'Os biorremodeladores teciduais atuam através de complexos térmicos cooperativos de Ácido Hialurônico não reticulado de alto e baixo peso molecular e frações purificadas de Polinucleotídeos de DNA (PDRN). Ao interagir com os receptores CD44 e A2A de adenosina em fibroblastos e queratinócitos, induzem a síntese fisiológica de colágeno tipos I, III, IV e VII e elastina, promovendo bio-hidratação volumétrica intersticial sem efeito volumizador compressivo ou risco embólico de preenchedores reticulados.',
    specificMaterials: [
      '01 Seringa estéril pré-envasada de Biorremodelador Tecidual (ex: Complexo Híbrido Estável de AH 32mg/1ml ou PDRN 20mg/ml) com registro ativo na ANVISA e selo de rastreabilidade.',
      'Agulhas de alta precisão 29G/30G de 4mm ou 13mm ou microcânulas 27G/30G estéreis descartáveis de uso único.',
      'Solução antisséptica de Clorexidina Alcoólica 0,5% ou Clorexidina Aquosa 2% e compressas de gaze estéreis.',
      'Lápis dermográfico branco cirúrgico para demarcação dos 5 Bio Aesthetic Points (BAP) por hemiface.',
      'Curativo adesivo hipoalergênico e bolsa térmica higienizada para conforto local.'
    ],
    preparationAndReconstitution: 'Produto pronto para uso imediato em seringa pré-preenchida estéril. Não requer reconstituição com diluentes. Checar a integridade do lacre, número de lote e prazo de validade antes da abertura estéril na presença do paciente.',
    executionPhases: [
      {
        title: 'Fase 1 • Mapeamento dos 5 Pontos BAP (Bio Aesthetic Points) e Assepsia',
        description: 'Com o paciente a 90°, demarcar os 5 pontos anatômicos estratégicos de baixa vascularização e alta difusão tecidual: 1. Ponto Zigomático (2cm do canto externo do olho); 2. Ponto Nasal/Malar (linha da asa nasal); 3. Ponto Tragus (1cm anterior ao tragus); 4. Ponto Mentoniano (linha vertical da comissura); 5. Ponto Mandibular (1cm anterior ao ângulo). Antissepsia rigorosa da face.'
      },
      {
        title: 'Fase 2 • Injeção em Bolus Dérmico Profundo (0,2ml por ponto)',
        description: 'Introduzir a agulha 29G/30G em ângulo de 30° a 45° diretamente na derme profunda / hipoderme superficial. Injetar lentamente 0,2 ml em bolus por ponto (totalizando 1,0 ml por hemiface / 2,0 ml no tratamento global facial ou cervical).'
      },
      {
        title: 'Fase 3 • Formação e Difusão Natural das Pápulas',
        description: 'Observar a formação da pápula dérmica característica em cada ponto BAP. NÃO realizar massagem vigorosa compressiva, permitindo que a fluidez reológica do complexo se difunda espontaneamente pela matriz extracelular tecidual nas 24 a 48 horas seguintes.'
      },
      {
        title: 'Fase 4 • Finalização, Assepsia Terminal e Proteção',
        description: 'Limpar suavemente com gaze embebida em soro fisiológico estéril, aplicar reparador de barreira cutânea e filtro solar FPS 50+ físico mineral.'
      }
    ],
    wasteDisposal: {
      groupE: 'Agulhas 29G/30G e seringas descartadas imediatamente no coletor rígido Descarpack (sem reencapar).',
      groupA: 'Gazes com sangue pontiforme e luvas cirúrgicas no saco plástico branco leitoso de risco biológico.',
      groupD: 'Blister plástico protetor e caixas de papelão em lixeira comum reciclável.'
    },
    interventionsAndUrgency: 'As pápulas nodulares suaves e pequeno eritema nos 5 pontos BAP são autolimitados e resolvem espontaneamente em 24 a 48 horas sem intervenção. Em caso de hematoma focal, orientar compressas frias e pomada de arnica. Em caso de rubor inflamatório tardio ou reação de hipersensibilidade, prescrever anti-histamínico oral sob supervisão médica.',
    references: [
      'Laurino, C. et al. Efficacy, safety and tolerance of a new injection technique for high- and low-molecular-weight hyaluronic acid complexes. Aesthetic Med, 2015; 1(1):1-7.',
      'Beatini, A. et al. Bio-remodeling of face and neck with hybrid complexes of high- and low-molecular-weight hyaluronic acid: a multi-center study. J Cosmet Dermatol, 2016; 15(4):427-434.',
      'Squadrito, F. et al. Pharmacological Activity and Clinical Use of PDRN (Polydeoxyribonucleotide). Front Pharmacol, 2017; 8:224.',
      'ANVISA. RDC nº 63/2011 (Boas Práticas em Serviços de Saúde) e RDC nº 222/2018 (PGRSS).'
    ]
  },

  skinbooster: {
    popCode: 'POP-EST-SKB-16',
    categoryTitle: 'Hidratação Injetável & Biorevitalização',
    technicalName: 'Hidratação Dérmica Profunda com Ácido Hialurônico Não Reticulado / Baixa Reticulação (Skinbooster)',
    sanitaryScope: 'Restauração da matriz dérmica, hidratação profunda e melhora da viscoelasticidade cutânea sob RDC ANVISA nº 63/2011.',
    scientificFoundation: 'Microinjeções dérmicas de ácido hialurônico não reticulado ou de baixa reticulação funcionam como reservatórios hídricos intersticiais, atraindo moléculas de água e estimulando receptores CD44 para secreção fisiológica de procolágeno I e elastina na derme papilar e reticular.',
    specificMaterials: [
      'Seringas pré-envasadas de Ácido Hialurônico de baixa reticulação / não reticulado estéril com registro ANVISA.',
      'Agulhas ultra-finas 30G ou 32G de 4mm ou microcânulas 27G/30G de 38mm.',
      'Anestésico tópico dermatológico de alta potência (Lidocaína 4% a 7%).',
      'Clorexidina aquosa a 2% e gazes estéreis.',
      'Máscara calmante regeneradora e protetor solar FPS 50+.'
    ],
    executionPhases: [
      {
        title: 'Fase 1 • Higienização e Anestesia Tópica',
        description: 'Limpar a face, aplicar anestésico tópico sob oclusão por 30 minutos. Remover integralmente e realizar antissepsia com clorexidina aquosa.'
      },
      {
        title: 'Fase 2 • Aplicação em Microgotas / Micropápulas Dérmicas',
        description: 'Introduzir a agulha 32G a 15°-30° na derme média, injetando microgotas de 0,01ml a 0,02ml espaçadas a cada 0,5-1,0 cm em padrão quadriculado ou em leque com cânula 27G.'
      },
      {
        title: 'Fase 3 • Finalização e Máscara Calmante',
        description: 'Limpeza suave com gaze umedecida em soro fisiológico estéril. Aplicação de máscara calmante de biocelulose por 15 minutos e fotoprotetor FPS 50+.'
      }
    ],
    wasteDisposal: {
      groupE: 'Agulhas e seringas descartadas no Descarpack.',
      groupA: 'Gazes com sangue e luvas no saco de lixo biológico.',
      groupD: 'Embalagens externas em lixeira comum.'
    },
    interventionsAndUrgency: 'Pequenas pápulas puntiformes desaparecem naturalmente em 24 a 48 horas. Em caso de hematomas, orientar uso de arnica tópica e proteção solar rigorosa.',
    references: [
      'Williams, S. et al. Hyaluronic Acid Resorbable Injectable Implants: A Review of Clinical Efficacy and Safety. Clin Interv Aging, 2009; 4:153-172.',
      'Distante, F. et al. Deep Subdermal Hyaluronic Acid Injections for Skin Rejuvenation. Dermatol Surg, 2009; 35(Suppl 1):389-393.',
      'ANVISA. RDC nº 63/2011 e RDC nº 222/2018.'
    ]
  },

  laser_lavieen: {
    popCode: 'POP-EST-LAV-17',
    categoryTitle: 'Laser Fracionado Não Ablativo (Thulium 1927nm)',
    technicalName: 'Rejuvenescimento, Textura e Uniformização com Laser Thulium 1927nm (Lavieen / BB Laser)',
    sanitaryScope: 'Renovação epidérmica não ablativa, clareamento de manchas, melhora de poros e estímulo colagênico sob RDC ANVISA nº 63/2011.',
    scientificFoundation: 'O comprimento de onda de 1927nm (Laser Thulium) possui alta afinidade pela água tecidual na junção dermo-epidérmica, gerando colunas de coagulação térmica fracionada microscópica (MTZs) com preservação do estrato córneo íntegro, acelerando o turnover celular sem downtime prolongado.',
    specificMaterials: [
      'Equipamento Laser Thulium 1927nm devidamente calibrado com registro na ANVISA.',
      'Óculos de proteção ocular específicos com Densidade Óptica (OD > 5) para 1927nm para paciente, operador e assistente.',
      'Anestésico tópico (Lidocaína 4% a 7%) e gazes estéreis.',
      'Soro fisiológico 0,9% estéril gelado e máscaras calmantes pós-laser.',
      'Protetor solar 100% físico FPS 50+.'
    ],
    executionPhases: [
      {
        title: 'Fase 1 • Paramentação Óptica e Preparo da Pele',
        description: 'Remover maquiagem e oleosidade. Colocar óculos de proteção específicos em todos os presentes. Trancar a sala com aviso de radiação laser ativa.'
      },
      {
        title: 'Fase 2 • Parametrização e Disparos Fracionados',
        description: 'Ajustar parâmetros de energia (mJ) e densidade conforme a indicação clínica (Efeito Glow: 5-8 mJ; Manchas/Poros: 8-12 mJ; Rejuvenescimento: 12-15 mJ). Realizar passadas com sobreposição de 10% a 15% na face.'
      },
      {
        title: 'Fase 3 • Resfriamento e Regeneração da Barreira',
        description: 'Aplicar compressas geladas de soro fisiológico por 10 minutos. Aplicar sérum regenerador estéril e fotoprotetor mineral físico.'
      }
    ],
    wasteDisposal: {
      groupE: 'Não gera perfurocortantes comuns.',
      groupA: 'Gazes com resíduos e luvas no saco de lixo biológico.',
      groupD: 'Embalagens e papéis no lixo comum.'
    },
    interventionsAndUrgency: 'Sensação de calor e ardência por 2 a 4 horas é esperada. Microcrostas minúsculas caem em 3 a 5 dias. É expressamente proibido esfoliar ou arrancar as crostas. Em caso de eritema intenso, orientar uso de hidratante reparador com pantenol e corticoide tópico suave sob supervisão médica.',
    references: [
      'Brauer, J.A. et al. Nonablative 1927-nm Fractional Thulium Fiber Laser for the Treatment of Facial Photodamage. Dermatol Surg, 2014; 40(11):1199-1205.',
      'Lee, H.M. et al. Clinical Efficacy of 1927-nm Fractional Thulium Fiber Laser for Skin Rejuvenation. Ann Dermatol, 2019; 31(2):166-172.',
      'ANVISA. Normas Sanitárias de Radioproteção e RDC nº 63/2011.'
    ]
  },

  laser_co2: {
    popCode: 'POP-EST-CO2-18',
    categoryTitle: 'Laser Fracionado Ablativo (CO2 10600nm)',
    technicalName: 'Resurfacing Facial Ablativo Fracionado com Laser de CO2 10600nm',
    sanitaryScope: 'Rejuvenescimento profundo, retração da flacidez palpebral/facial e atenuação de cicatrizes atróficas sob RDC ANVISA nº 63/2011.',
    scientificFoundation: 'A radiação do Laser CO2 10600nm é absorvida fortemente pela água intra e extracelular, causando vaporização tecidual imediata das colunas microscópicas epidérmicas e halo de contração térmica dérmica profunda, estimulando intensa neocolagênese e remodelação da matriz.',
    specificMaterials: [
      'Equipamento Laser CO2 Fracionado 10600nm com registro ANVISA e manutenção preventiva.',
      'Óculos de proteção óptica OD > 7 para 10600nm e protetores oculares metálicos internos (se periorbital).',
      'Aspirador de fumaça cirúrgico com filtro HEPA e carvão ativado acoplado ao campo.',
      'Máscaras N95/PFF2 para a equipe cirúrgica.',
      'Anestésico tópico potente ou bloqueios anestésicos locais com Lidocaína 2%.',
      'Pomada oclusiva cicatrizante estéril (Aquaphor / Cicaplast) e gazes estéreis.'
    ],
    executionPhases: [
      {
        title: 'Fase 1 • Anestesia, Assepsia e Paramentação de Segurança',
        description: 'Anestesia tópica oclusiva por 45 minutos ou bloqueio troncular. Assepsia rigorosa. Posicionamento de óculos de proteção e acionamento obrigatório do aspirador de fumaça com filtro HEPA.'
      },
      {
        title: 'Fase 2 • Disparos Fracionados Padronizados',
        description: 'Configurar energia (mJ), densidade de micropontos (spots/cm²) e formato do scanner. Aplicar os disparos sem sobreposição excessiva de bordas para evitar queimadura contínua não fracionada.'
      },
      {
        title: 'Fase 3 • Resfriamento e Curativo Oclusivo Estéril',
        description: 'Resfriar com compressas de soro gelado estéril. Aplicar camada generosa de pomada oclusiva reparadora estéril.'
      }
    ],
    wasteDisposal: {
      groupE: 'Agulhas de bloqueio no Descarpack.',
      groupA: 'Gazes com exsudato e luvas no lixo biológico infectante.',
      groupD: 'Papéis e embalagens no lixo comum.'
    },
    interventionsAndUrgency: 'Edema acentuado e formação de crostas castanhas por 5 a 10 dias são esperados. Se houver reativação herpética, iniciar Valaciclovir 500mg de 12/12h sob supervisão médica. Uso incondicional de protetor solar após a reepitelização.',
    references: [
      'Hantash, B.M. et al. Facial resurfacing with a novel fractional CO2 laser. Dermatol Surg, 2007; 33(1):18-25.',
      'Tierney, E.P. et al. Fractional photothermolysis: a review and update. J Cosmet Laser Ther, 2009; 11(2):77-88.',
      'ANVISA. RDC nº 63/2011 e Normas de Biossegurança em Procedimentos Laser Ablativos.'
    ]
  },

  ultrassom_hifu: {
    popCode: 'POP-EST-HIF-19',
    categoryTitle: 'Ultrassom Micro e Macrofocado (HIFU)',
    technicalName: 'Lifting Facial Não Invasivo e Compactação Tecidual com Ultrassom Microfocado (HIFU / Ultraformer / Liftera)',
    sanitaryScope: 'Tratamento não cirúrgico de flacidez muscular (SMAS) e dérmica por coagulação térmica ultrassônica (RDC nº 63/2011).',
    scientificFoundation: 'O ultrassom focalizado de alta intensidade converge ondas mecânicas acústicas que geram Pontos de Coagulação Térmica (PCTs) de 65°C a 75°C no SMAS (4.5mm), na hipoderme (3.0mm) e na derme profunda (1.5mm e 2.0mm), promovendo desnaturação e retração colagênica imediata seguida de neocolagênese sustentada por até 6 meses.',
    specificMaterials: [
      'Equipamento de Ultrassom Micro e Macrofocado certificado pelo INMETRO e registrado na ANVISA.',
      'Cartuchos transdutores específicos (1.5mm, 2.0mm, 3.0mm, 4.5mm e cartuchos corporais).',
      'Gel condutor acústico neutro hidrossolúvel estéril / cosmético.',
      'Lápis dermográfico branco para mapeamento dos vetores de disparo.',
      'Régua milimetrada e fita métrica.',
      'Solução de Clorexidina aquosa e gazes não estéreis para limpeza.'
    ],
    executionPhases: [
      {
        title: 'Fase 1 • Mapeamento Vetorial e Zonas de Segurança',
        description: 'Com o paciente sentado a 90°, desenhar as linhas de tração facial respeitando as zonas de exclusão anatômica do nervo marginal da mandíbula e do ramo frontal do nervo facial. Aplicar camada espessa de gel condutor.'
      },
      {
        title: 'Fase 2 • Disparos Sequenciais por Camada Anatômica (Plano SMAS e Dérmico)',
        description: 'Acoplar o transdutor com pressão firme e perpendicular constante. Iniciar pelo plano profundo de 4.5mm (SMAS), seguido do plano de 3.0mm (subcutâneo) e finalizar com 1.5mm ou 2.0mm (derme), disparando a quantidade prescrita de linhas com fluência adequada.'
      },
      {
        title: 'Fase 3 • Limpeza do Gel e Proteção',
        description: 'Remover todo o gel condutor com toalha macia e aplicar protetor solar FPS 50+.'
      }
    ],
    wasteDisposal: {
      groupE: 'Não gera resíduos perfurocortantes.',
      groupA: 'Espátulas plásticas com gel e luvas em lixo biológico.',
      groupD: 'Lençóis de papel e embalagens em lixo comum.'
    },
    interventionsAndUrgency: 'Dor moderada transitória durante os disparos e edema leve por 3 a 5 dias são normais. Em caso de parestesia transitória por choque em ramo nervoso superficial, o quadro regride espontaneamente em 2 a 4 semanas. Prescrever complexo B e anti-inflamatório se necessário sob supervisão médica.',
    references: [
      'Fabi, S.G. Noninvasive skin tightening: focus on new ultrasound techniques. Clin Cosmet Investig Dermatol, 2015; 8:47-52.',
      'Alam, M. et al. Ultrasound tightening of facial and neck skin: a rater-blinded prospective cohort study. J Am Acad Dermatol, 2010; 62(2):262-269.',
      'ANVISA. RDC nº 63/2011 e Diretrizes de Equipamentos Eletromédicos Ultrassônicos.'
    ]
  },

  endolaser: {
    popCode: 'POP-EST-END-20',
    categoryTitle: 'Laser Subdérmico & Endolifting (1470nm)',
    technicalName: 'Endolifting Subdérmico com Fibra Óptica Laser 1470nm (Endolaser)',
    sanitaryScope: 'Fototermolipólise subdérmica, retração cutânea e retração fascial por fibra óptica invasiva sob RDC ANVISA nº 63/2011.',
    scientificFoundation: 'A fibra óptica de diâmetro micrométrico conduz a energia do Laser de Diodo 1470nm diretamente no plano celular subcutâneo. O comprimento de onda de 1470nm é absorvido simultaneamente pela água e gordura tecidual, liquefazendo a gordura localizada e provocando retração imediata dos septos fibrosos e contração cutânea intensa.',
    specificMaterials: [
      'Equipamento Laser Diodo 1470nm com registro ANVISA e fibra óptica estéril de 300 a 600 micras de uso único descartável.',
      'Cânulas de condução de fibra óptica estéreis com ponta atraumática e agulhas guias 18G.',
      'Solução anestésica tumescente modificada de Klein e cânula de Klein 21G/22G.',
      'Câmera térmica infravermelha (termovisor) para monitoramento contínuo da temperatura cutânea externa (38°C a 42°C).',
      'Óculos de proteção óptica específicos para 1470nm para toda a equipe.',
      'Fita microporosa, faixa compressiva elástica facial/submentoniana e curativos estéreis.'
    ],
    executionPhases: [
      {
        title: 'Fase 1 • Demarcação e Anestesia Tumescente Subdérmica',
        description: 'Demarcar as áreas de gordura e flacidez. Puncionar orifícios de entrada e infiltrar a solução anestésica tumescente estéril no plano subcutâneo até tumescência uniforme.'
      },
      {
        title: 'Fase 2 • Inserção da Fibra Óptica e Disparos com Monitoramento Térmico',
        description: 'Introduzir a cânula condutora com a fibra óptica ativa conectada ao laser 1470nm. Realizar movimentos de vaivém lentos e contínuos em leque na hipoderme superficial. Monitorar a temperatura na superfície da pele continuamente com o termovisor infravermelho, cessando a aplicação ao atingir 40°C a 42°C de temperatura dérmica externa.'
      },
      {
        title: 'Fase 3 • Ordenha do Exsudato e Curativo Compressivo com Faixa',
        description: 'Realizar compressão manual suave para drenagem de eventual líquido tumescente residual pelos pertuitos. Ocluir com micropore e colocar faixa de contenção elástica imediata.'
      }
    ],
    wasteDisposal: {
      groupE: 'Fibra óptica fracionada e agulhas no coletor Descarpack.',
      groupA: 'Campos estéreis com fluidos e luvas no saco de lixo biológico infectante.',
      groupD: 'Embalagens plásticas e papelão em lixo comum.'
    },
    interventionsAndUrgency: 'Em caso de superaquecimento cutâneo focal com risco de queimadura térmica: resfriar imediatamente com compressas geladas de soro estéril. Uso obrigatório da faixa mentoniana por 7 a 14 dias para evitar seroma. Se seroma volumoso, realizar punção aspirativa estéril sob supervisão médica.',
    references: [
      'Scuderi, N. et al. 1470 nm diode laser for facial contouring and skin tightening: clinical experience. Aesthetic Plast Surg, 2014; 38(6):1111-1118.',
      'Ruff, G. et al. Endolift technique for facial remodeling with 1470 nm laser. J Cosmet Laser Ther, 2018; 20(7):402-409.',
      'ANVISA. RDC nº 63/2011 e Normas de Biossegurança em Dispositivos Invasivos com Fibra Óptica.'
    ]
  },

  laser_tecnologias: {
    popCode: 'POP-EST-LAS-10',
    categoryTitle: 'Laser, LIP & Tecnologias Eletromédicas',
    technicalName: 'Aplicação de Laser e Tecnologias de Fototermólise Seletiva (Laser Diodo / LIP / ND:YAG)',
    sanitaryScope: 'Depilação, rejuvenescimento, remoção de pigmentos e bioestimulação tecidual por radiação óptica não ionizante sob RDC ANVISA nº 63/2011.',
    scientificFoundation: 'A tecnologia opera sob o princípio da Fototermólise Seletiva de Anderson e Parrish: a radiação eletromagnética é absorvida por cromóforos-alvo específicos (melanina, hemoglobina ou água tecidual) gerando lesão térmica localizada sem dano colateral ao tecido adjacente.',
    specificMaterials: [
      'Equipamento emissor de Laser / Luz Intensa Pulsada com calibração anual em dia, registro válido na ANVISA e aterramento elétrico certificado.',
      'Óculos de proteção ocular com Densidade Óptica (OD) específica para o comprimento de onda utilizado (para o paciente, profissional e assistente).',
      'Gel condutor neutro hidrossolúvel estéril / cosmético transparente.',
      'Aparelho resfriador de ar / ponteira com resfriamento por safira (cryo-cooling) acoplada.',
      'Lâminas descartáveis estéreis para tricotomia prévia (se depilação).',
      'Solução de Clorexidina aquosa e gazes não estéreis para remoção de gel.',
      'Termômetro infravermelho de superfície.'
    ],
    executionPhases: [
      {
        title: 'Fase 1 • Classificação do Fototipo cutâneo e Parametrização',
        description: 'Determinar a Escala de Fitzpatrick (I a VI). Ajustar a fluência (J/cm²), largura de pulso (ms) e sistema de resfriamento conforme tabela validada pelo fabricante do equipamento.'
      },
      {
        title: 'Fase 2 • Paramentação de Segurança Óptica',
        description: 'Colocar os óculos de proteção OD correspondente no paciente (óculos tipo concha opaca), no profissional e em todos presentes na sala. Trancar a porta com aviso luminoso de radiação laser ativa.'
      },
      {
        title: 'Fase 3 • Aplicação do Gel e Disparos com Sobreposição Controlada',
        description: 'Aplicar fina camada de gel condutor gelado. Acoplar a ponteira perpendicularmente à pele garantindo contato total. Realizar disparo teste, aguardar 2 minutos e prosseguir com sobreposição de no máximo 10% a 15% entre os spots.'
      },
      {
        title: 'Fase 4 • Limpeza, Resfriamento Imediato e Fotoproteção',
        description: 'Remover todo o gel com gaze macia. Aplicar bolsa térmica gelada por 5 minutos e aplicar fotoprotetor com FPS 50+ de barreira física.'
      }
    ],
    wasteDisposal: {
      groupE: 'Lâminas de tricotomia descartadas no coletor Descarpack.',
      groupA: 'Gazes com resíduos corporais e luvas no saco de lixo biológico.',
      groupD: 'Papel toalha e espátulas plásticas de gel em lixeira comum.'
    },
    interventionsAndUrgency: 'Em caso de queimadura térmica acidental (eritema bolhoso ou desprendimento epidérmico): resfriar imediatamente com água corrente estéril por 20 minutos, aplicar curativo estéril com sulfadiazina de prata a 1% ou hidrogel e acionar suporte médico para prescrição de corticoterapia tópica/oral.',
    references: [
      'Anderson, R.R. & Parrish, J.A. Selective photothermolysis: precise microsurgery by selective absorption of pulsed radiation. Science, 1983; 220(4596):524-527.',
      'Goldberg, D.J. Laser Dermatology: Pearls and Problems. Blackwell Publishing, 2008.',
      'ANVISA. Normas Sanitárias de Segurança em Instalações de Equipamentos Emissores de Radiação Não-Ionizante e RDC nº 63/2011.'
    ]
  },

  criolipolise: {
    popCode: 'POP-EST-CRI-11',
    categoryTitle: 'Crioliporedução & Termolipólise',
    technicalName: 'Criolipólise Convencional e de Placas para Redução de Adiposidade',
    sanitaryScope: 'Redução não invasiva de tecido adiposo subcutâneo por resfriamento controlado conforme RDC ANVISA nº 63/2011.',
    scientificFoundation: 'Os adipócitos são mais sensíveis à cristalização lipídica por baixas temperaturas do que outros tecidos. O resfriamento sustentado (-5°C a -11°C) desencadeia apoptose programada das células de gordura, cujos fragmentos são fagocitados por macrófagos e eliminados pelo sistema linfático ao longo de 60 a 90 dias.',
    specificMaterials: [
      'Aparelho de Criolipólise certificado pelo INMETRO com registro ativo na ANVISA.',
      'Membranas Anticongelantes originais, de uso único estritamente descartável, com laudo de teste criogênico e registro na ANVISA.',
      'Filme osmótico de proteção e fita métrica / paquímetro corporal.',
      'Óleo de massagem / creme de reperfusão neutro.',
      'Protetores de manípulo e lençol descartável impermeável.'
    ],
    executionPhases: [
      {
        title: 'Fase 1 • Avaliação Adiposa e Demarcação',
        description: 'Pinçar a prega adiposa com adipômetro (mínimo de 2,0 cm para aplicadores a vácuo). Demarcar a área a ser tratada com lápis dermográfico.'
      },
      {
        title: 'Fase 2 • Aplicação Rigorosa da Membrana Anticongelante',
        description: 'Abrir o envelope lacrado da membrana anticongelante na frente do paciente. Centralizar a membrana sobre a pele sem dobras ou bolhas de ar (risco extremo de queimadura criogênica se houver falha de cobertura).'
      },
      {
        title: 'Fase 3 • Acoplamento do Manípulo e Monitoramento Térmico',
        description: 'Posicionar o aplicador, acionar o vácuo de sucção gradual e ajustar temperatura (-5°C a -11°C) e tempo (45 a 60 minutos por área). Monitorar o paciente continuamente durante todo o ciclo.'
      },
      {
        title: 'Fase 4 • Desacoplamento e Massagem de Reperfusão Obrigatória',
        description: 'Desligar a sucção, remover o aplicador e a membrana. Realizar massagem vigorosa imediata no "bloco de gelo" tecidual por 2 a 3 minutos para acelerar a reperfusão e potencializar a apoptose celular.'
      }
    ],
    wasteDisposal: {
      groupE: 'Não gera perfurocortantes.',
      groupA: 'Membrana anticongelante embebida em gel protetor e luvas descartadas no lixo infectante/biológico.',
      groupD: 'Embalagens plásticas e papel toalha no lixo comum.'
    },
    interventionsAndUrgency: 'Em caso de queimadura por frio (formação de bolha ou necrose por falha na membrana): aplicar imediatamente curativo oclusivo estéril com pomada antibiótica / cicatrizante, evitar romper as flictenas e acionar avaliação médica de urgência.',
    references: [
      'Manstein, D. et al. Selective cryolysis: a novel method of non-invasive fat removal. Lasers Surg Med, 2008; 40(9):595-604.',
      'Krueger, N. et al. Safety, tolerance, and patient satisfaction with noninvasive cryolipolysis. Clin Cosmet Investig Dermatol, 2014; 7:201-205.',
      'ANVISA. Alerta Sanitário sobre o Uso Obrigatório de Membranas Anticongelantes Registradas e RDC nº 63/2011.'
    ]
  },

  limpeza_pele: {
    popCode: 'POP-EST-LMP-12',
    categoryTitle: 'Higiene & Desobstrução Cutânea',
    technicalName: 'Limpeza de Pele Profunda, Desobstrução Folicular e Cauterização Asséptica',
    sanitaryScope: 'Higienização, emoliência, extração mecânica asséptica de comedões e miliuns com eletrocauterização por Alta Frequência (RDC nº 63/2011).',
    scientificFoundation: 'A remoção mecânica do tampão córneo-sebáceo desobstrui o infundíbulo pilossebáceo, reduz a proliferação bacteriana de Cutibacterium acnes e restaura a oxigenação celular cutânea.',
    specificMaterials: [
      'Emulsão de limpeza facial com pH fisiológico e esfoliante físico de microesferas de semente de damasco.',
      'Creme / Loção emoliente enriquecida com Trietanolamina a 10% ou extrato de camomila.',
      'Aparelho de Vapor de Ozônio com água destilada ou Máscara Térmica facial.',
      'Aparelho de Alta Frequência com eletrodos de vidro (champignon, cauterizador e cebolão).',
      'Agulhas descartáveis estéreis 30G para remoção de miliuns (se necessário).',
      'Extratores de comedões em aço cirúrgico autoclavados em embalagem grau cirúrgico com fita indicadora biológica.',
      'Gazes estéreis, algodões em disco e Loção Tônica antisséptica adstringente.',
      'Máscara calmante de camomila/azuleno e protetor solar FPS 50+ hipoalergênico.'
    ],
    executionPhases: [
      {
        title: 'Fase 1 • Higienização, Esfoliação Suave e Emoliência',
        description: 'Higienizar a face, aplicar esfoliante com movimentos circulares e remover. Aplicar compressas de algodão embebidas em loção emoliente sobre toda a face.'
      },
      {
        title: 'Fase 2 • Termoterapia com Vapor de Ozônio',
        description: 'Posicionar o bico do vapor a 30-40 cm da face do paciente por 10 a 15 minutos para fluidificação do sebo e ação bactericida pelo ozônio.'
      },
      {
        title: 'Fase 3 • Extração Manual e Instrumental Asséptica',
        description: 'Envolver as pontas dos dedos indicadores em gazes estéreis umedecidas em loção antisséptica. Realizar pressão tracionada perpendicular suave. Para miliuns, realizar microabertura na epiderme com agulha estéril 30G de uso único.'
      },
      {
        title: 'Fase 4 • Aplicação de Alta Frequência e Fotoproteção',
        description: 'Secar a pele e passar o eletrodo de Alta Frequência em faiscamento direto/indireto por 5 minutos para ação cicatrizante, ozonizante e fungicida/bactericida. Aplicar máscara calmante por 15 minutos e fotoprotetor.'
      }
    ],
    wasteDisposal: {
      groupE: 'Agulhas estéreis 30G de miliuns descartadas imediatamente no Descarpack.',
      groupA: 'Algodões com exsudato sebáceo e gazes no saco de resíduo infectante.',
      groupD: 'Embalagens e papéis descartados em lixeira comum.'
    },
    interventionsAndUrgency: 'Em caso de dermatite eritematosa pós-extração severa: aplicar compressas geladas de soro fisiológico e loção calmante com pantenol e óxido de zinco.',
    references: [
      'Draelos, Z.D. Cosmetics and Dermatologic Problems and Solutions. CRC Press, 2011.',
      'Kligman, A.M. Pathogenesis of acne vulgaris and comedo extraction methods. J Am Acad Dermatol, 1991; 24(5):789-794.',
      'ANVISA. RDC nº 63/2011 e Guia de Esterilização de Instrumentais em Autoclave.'
    ]
  },

  tricologia: {
    popCode: 'POP-EST-TRI-13',
    categoryTitle: 'Tricologia & Terapias Capilares',
    technicalName: 'Tricologia Clínica, Mesoterapia e Microinfusão Capilar Injetável (MMP)',
    sanitaryScope: 'Tratamento de eflúvios telógenos e alopécias androgenéticas por intradermoterapia capilar conforme RDC nº 63/2011.',
    scientificFoundation: 'A microinfusão de ativos tricológicos estéreis (Biotina, Minoxidil injetável, D-Pantenol, Fatores de Crescimento VEGF/bFGF e Silício Orgânico) diretamente na derme reticular peribulbar contorna a barreira epidérmica e estimula a papila dérmica, prolongando a fase anágena do ciclo folicular.',
    specificMaterials: [
      'Frascos estéreis de Mescla Capilar Estéril com laudo microbiológico / registro ANVISA.',
      'Seringas descartáveis de 1ml ou 3ml e agulhas 30G/32G de 4mm.',
      'Clorexidina alcoólica a 0,5% e gazes estéreis.',
      'Aparelho de LED capilar (Laser de Baixa Potência - LLLT 660nm) devidamente calibrado.',
      'Dermoscópio / Tricoscópio digital para registro fotográfico folicular.'
    ],
    executionPhases: [
      {
        title: 'Fase 1 • Tricoscopia e Antissepsia do Couro Cabeludo',
        description: 'Mapear as áreas de rarefação capilar (escala de Hamilton-Norwood ou Ludwig). Realizar antissepsia do couro cabeludo com gaze embebida em clorexidina alcoólica, abrindo riscas no cabelo.'
      },
      {
        title: 'Fase 2 • Aspiração e Injeção Intradérmica Ponto a Ponto',
        description: 'Aspirar as alíquotas estéreis. Introduzir a agulha 30G em ângulo de 15° a 30° na derme superficial peribulbar. Injetar microgotas de 0,02ml a 0,05ml por ponto com espaçamento de 1,0 cm em toda a área de rarefação.'
      },
      {
        title: 'Fase 3 • Fotobiomodulação por LED / Laser de Baixa Potência',
        description: 'Aplicar emissor de luz vermelha (660nm) por 15 minutos para estímulo mitocondrial dos queratinócitos e aumento do fluxo vascular local.'
      }
    ],
    wasteDisposal: {
      groupE: 'Agulhas 30G/32G descartadas no Descarpack.',
      groupA: 'Gazes com resíduos biológicos no saco infectante.',
      groupD: 'Embalagens externas em lixo comum.'
    },
    interventionsAndUrgency: 'Em caso de foliculite pós-procedimento: higienizar com xampu de cetoconazol a 2% e prescrever loção tópica com clindamicina a 1% sob supervisão médica.',
    references: [
      'Mysore, V. et al. Mesotherapy in trichology: clinical protocols, pharmacological options and safety. Int J Trichology, 2010; 2(2):105-110.',
      'Dhurat, R. et al. A randomized evaluator blinded study of microneedling in androgenetic alopecia. Int J Trichology, 2013; 5(1):6-11.',
      'ANVISA. RDC nº 63/2011 e Resoluções sobre Preparações Estéreis Injetáveis Capilares.'
    ]
  },

  soroterapia: {
    popCode: 'POP-EST-SOR-14',
    categoryTitle: 'Terapia Nutricional Parenteral & Drip',
    technicalName: 'Terapia Nutricional Parenteral e Suplementação Metabólica Endovenosa (Soroterapia)',
    sanitaryScope: 'Infusão intravenosa de micronutrientes, aminoácidos e antioxidantes estéreis conforme RDC ANVISA nº 63/2011 e RDC nº 67/2007.',
    scientificFoundation: 'A administração parenteral endovenosa de complexos vitamínicos (Complexo B, Vitamina C em altas doses, Glutationa, Zinco, Magnésio) atinge 100% de biodisponibilidade plasmática imediata, otimizando vias enzimáticas mitocondriais e neutralizando radicais livres.',
    specificMaterials: [
      'Bolsa ou frasco estéril de Solução Fisiológica 0,9% ou Ringer Lactato (100ml a 500ml) com sistema fechado.',
      'Ampolas estéreis de micronutrientes injetáveis estéreis para infusão parenteral registradas na ANVISA.',
      'Equipos de infusão fotoprotetores ou convencionais estéreis com filtro de partículas e câmara gotejadora.',
      'Cateter intravenoso periférico sobre agulha (Jelco / Abocath 22G ou 24G) de uso único estéril.',
      'Garrote de látex/silicone, clorexidina alcoólica a 0,5% e curativo transparente estéril de fixação (Tegaderm).',
      'Suporte de soro com rodízios e aparelho de pressão arterial / oxímetro de pulso.'
    ],
    executionPhases: [
      {
        title: 'Fase 1 • Checagem de Sinais Vitais e Adição Asséptica de Fármacos',
        description: 'Aferir PA, FC e oximetria. Em capela de fluxo ou bancada limpa desinfetada com álcool 70%, injetar os ativos vitamínicos na bolsa de soro com agulha 21G sob técnica asséptica e homogeneizar.'
      },
      {
        title: 'Fase 2 • Punção Venosa Periférica Asséptica',
        description: 'Garrotear o membro superior, selecionar veia basílica ou cefálica no antebraço. Antissepsia com clorexidina. Introduzir o cateter 22G/24G com bisel para cima até retorno de sangue na câmara, recuar o mandril e avançar o cateter plástico. Fixar com curativo estéril transparente.'
      },
      {
        title: 'Fase 3 • Conexão do Equipo e Controle Rigoroso de Gotejamento',
        description: 'Conectar o equipo e regular a velocidade de infusão para gotejamento lento (30 a 60 gotas/minuto, totalizando 45 a 60 minutos de infusão contínua), monitorando queixas de rubor térmico ou náusea.'
      },
      {
        title: 'Fase 4 • Retirada Segura e Curativo Compressivo',
        description: 'Fechar o clamp do equipo, retirar o cateter suavemente, comprimir o sítio com algodão seco por 3 minutos e colocar curativo adesivo.'
      }
    ],
    wasteDisposal: {
      groupE: 'Mandril metálico do cateter e ampolas de vidro descartados no Descarpack.',
      groupA: 'Bolsa de soro vazia, equipo de infusão e cateter plástico com sangue no saco de lixo biológico infectante.',
      groupD: 'Embalagens externas em lixeira comum.'
    },
    interventionsAndUrgency: 'Em caso de reação anafilática ou hipotensão súbita: interromper a infusão imediatamente, manter a via com SF 0,9% puro, colocar o paciente em posição de Trendelenburg e acionar supervisão médica de urgência / SAMU 192.',
    references: [
      'Gaby, A.R. Intravenous nutrient therapy: the "Myers\' cocktail". Altern Med Rev, 2002; 7(5):389-403.',
      'ANVISA. Resolução RDC nº 67/2007 (Boas Práticas de Manipulação de Preparações Magistrais e Estéreis) e RDC nº 63/2011.',
      'Conselho Federal de Enfermagem / Medicina. Resoluções sobre Administração Parenteral de Fármacos e Soluções Hidroeletrolíticas.'
    ]
  },

  drenagem_massagem: {
    popCode: 'POP-EST-DRE-15',
    categoryTitle: 'Terapias Manuais & Linfocinética',
    technicalName: 'Drenagem Linfática Manual Terapêutica e Pós-Operatória (Métodos Leduc / Vodder)',
    sanitaryScope: 'Estímulo da circulação linfática, reabsorção de edemas e prevenção de fibroses em pós-operatório sob RDC ANVISA nº 63/2011.',
    scientificFoundation: 'Manobras manuais suaves e rítmicas com pressão superficial (30 a 40 mmHg) direcionadas às cadeias ganglionares linfáticas aceleram a captação do líquido intersticial pelos capilares linfáticos e estimulam o peristaltismo dos linfângios.',
    specificMaterials: [
      'Óleo ou creme neutro hipoalergênico vegetal sem fragrâncias ou conservantes irritantes.',
      'Lençol descartável de papel para maca trocado a cada atendimento.',
      'Luvas de procedimento descartáveis (quando manipulação de áreas com cicatrizes recentes).',
      'Toalhas higienizadas em lavanderia hospitalar.',
      'Solução de álcool 70% para assepsia da maca entre atendimentos.'
    ],
    executionPhases: [
      {
        title: 'Fase 1 • Posicionamento do Paciente e Evacuação Ganglionar Prévia',
        description: 'Paciente posicionado confortavelmente com membros levemente elevados. Realizar manobras de bombeamento suave e desobstrução dos linfonodos principais (supraclaviculares, axilares e inguinais).'
      },
      {
        title: 'Fase 2 • Manobras de Captação e Evacuação Linfática',
        description: 'Executar círculos com os dedos e movimentos em bracelete de distal para proximal com pressão suave contínua e sem deslizamento abrasivo, respeitando as linhas de drenagem fisiológicas.'
      },
      {
        title: 'Fase 3 • Cuidados Específicos em Cicatrizes e Fibroses',
        description: 'Em pós-operatório, drenar ao redor da cicatriz sem tracionar as suturas e orientar uso correto da malha compressiva.'
      }
    ],
    wasteDisposal: {
      groupE: 'Não gera resíduos perfurocortantes.',
      groupA: 'Luvas contaminadas com exsudato de orifícios de drenos em lixo biológico.',
      groupD: 'Lençóis de papel e embalagens no lixo comum.'
    },
    interventionsAndUrgency: 'Contraindicado em Trombose Venosa Profunda (TVP) ativa, erisipela, infecções agudas ou insuficiência cardíaca descompensada. Em caso de dor aguda em panturrilha ou empastamento, suspender imediatamente e encaminhar para avaliação médica de urgência.',
    references: [
      'Leduc, A. & Leduc, O. Drenagem Linfática: Teoria e Prática. Manole, 2007.',
      'Foldi, M. & Foldi, E. Foldi\'s Textbook of Lymphology. Elsevier, 2012.',
      'ANVISA. RDC nº 63/2011 e Normas de Biossegurança em Cabines de Terapia Corporal.'
    ]
  }
};
