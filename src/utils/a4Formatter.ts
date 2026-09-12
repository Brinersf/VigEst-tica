import { DocumentItem, ClinicData } from '../types';

export interface A4PageContent {
  page1Html: string;
  page2Html: string;
  fullDocumentHtml: string;
}

/**
 * Replaces clinic data variables in the content string with complete fallback and alias support
 */
export function replaceClinicVariables(rawHtml: string, clinicData: ClinicData): string {
  if (!rawHtml) return '';
  const nomeClinica = clinicData.nomeClinica || '{{nome_clinica}}';
  const responsavel = clinicData.responsavel || clinicData.responsavelTecnico || '{{responsavel_tecnico}}';
  const registroConselho = clinicData.registroConselho || '{{registro_conselho}}';
  const alvara = clinicData.alvara || '{{alvara_sanitario}}';
  const endereco = clinicData.endereco || '{{endereco}}';
  const cidade = clinicData.cidade || '{{cidade}}';
  const tel = clinicData.telefone || clinicData.whatsapp || '{{telefone}}';
  const zap = clinicData.whatsapp || clinicData.telefone || '{{whatsapp}}';
  const email = clinicData.email || '{{email}}';
  const paciente = clinicData.nomeCliente || '{{nome_cliente}}';
  const rg = clinicData.rgCliente || '{{rg_cliente}}';
  const data = clinicData.dataDocumento || new Date().toLocaleDateString('pt-BR');
  const procedimento = clinicData.procedimento || '{{procedimento}}';
  const equipamento = clinicData.equipamento || '{{equipamento}}';
  const registroAnvisa = clinicData.registroAnvisa || '{{registro_anvisa}}';
  const cnes = clinicData.cnes || '{{cnes}}';
  const valor = clinicData.valorHonorarios || '{{valor_honorarios}}';

  let result = rawHtml
    // Clean up CNPJ tags and preceding/following labels
    .replace(/\|\s*<strong>CNPJ:<\/strong>[^|<br<\n]*/gi, '')
    .replace(/<strong>CNPJ:<\/strong>[^|<br<\n]*\|/gi, '')
    .replace(/&bull;\s*<strong>CNPJ:<\/strong>[^&<\n]*/gi, '')
    .replace(/<strong>CNPJ:<\/strong>[^&<\n]*&bull;/gi, '')
    .replace(/&bull;\s*CNPJ:\s*\{\{(?:cnpj|cnpj_clinica|cpf_cnpj)\}\}/gi, '')
    .replace(/CNPJ:\s*\{\{(?:cnpj|cnpj_clinica|cpf_cnpj)\}\}\s*&bull;/gi, '')
    .replace(/CNPJ:\s*\{\{(?:cnpj|cnpj_clinica|cpf_cnpj)\}\}/gi, '')
    .replace(/\{\{(?:cnpj|cnpj_clinica|cpf_cnpj)\}\}/gi, clinicData.cnpj || '')

    // Clean up CPF tags and preceding/following labels
    .replace(/\|\s*<strong>CPF:<\/strong>[^|<br<\n]*/gi, '')
    .replace(/<strong>CPF:<\/strong>[^|<br<\n]*\|/gi, '')
    .replace(/&bull;\s*<strong>CPF:<\/strong>[^&<\n]*/gi, '')
    .replace(/<strong>CPF:<\/strong>[^&<\n]*&bull;/gi, '')
    .replace(/&bull;\s*CPF:\s*\{\{(?:cpf_cliente|cpf_paciente|cpf)\}\}/gi, '')
    .replace(/CPF:\s*\{\{(?:cpf_cliente|cpf_paciente|cpf)\}\}\s*&bull;/gi, '')
    .replace(/CPF:\s*\{\{(?:cpf_cliente|cpf_paciente|cpf)\}\}/gi, '')
    .replace(/inscrito\(a\) no CPF sob o nº\s*(?:<strong>)?\{\{(?:cpf_cliente|cpf_paciente|cpf)\}\}(?:<\/strong>)?,?/gi, '')
    .replace(/inscrito\(a\) no CPF sob o nº\s*(?:<strong>)?[0-9.\-]+(?:<\/strong>)?,?/gi, '')
    .replace(/\{\{(?:cpf_cliente|cpf_paciente|cpf)\}\}/gi, clinicData.cpfCliente || '');

  // Clínica
  if (clinicData.nomeClinica) {
    result = result.replace(/\{\{(?:nome_clinica|nome_da_clinica|clinica|razao_social|nome_fantasia)\}\}/gi, nomeClinica);
  }
  // CNES
  if (clinicData.cnes) {
    result = result.replace(/\{\{(?:cnes|numero_cnes|codigo_cnes)\}\}/gi, cnes);
  }
  // Responsável Técnico
  if (clinicData.responsavel || clinicData.responsavelTecnico) {
    result = result.replace(/\{\{(?:responsavel_tecnico|responsavel|rt|nome_responsavel|responsavel_legal)\}\}/gi, responsavel);
  }
  // Registro Conselho
  if (clinicData.registroConselho) {
    result = result.replace(/\{\{(?:registro_conselho|registro_profissional|conselho_regional|conselho|crbm|crm|coren|crf|crefito)\}\}/gi, registroConselho);
  }
  // Alvará
  if (clinicData.alvara) {
    result = result.replace(/\{\{(?:alvara_sanitario|alvara|alvara_de_funcionamento|numero_alvara)\}\}/gi, alvara);
  }
  // Endereço
  if (clinicData.endereco) {
    result = result.replace(/\{\{(?:endereco|endereco_clinica|logradouro)\}\}/gi, endereco);
  }
  // Cidade / UF
  if (clinicData.cidade) {
    result = result.replace(/\{\{(?:cidade_uf|cidade|municipio|uf)\}\}/gi, cidade);
  }
  // Telefone e WhatsApp
  if (clinicData.telefone || clinicData.whatsapp) {
    result = result.replace(/\{\{(?:telefone|celular|contato)\}\}/gi, tel);
    result = result.replace(/\{\{whatsapp\}\}/gi, zap);
  }
  // E-mail
  if (clinicData.email) {
    result = result.replace(/\{\{(?:email|email_clinica)\}\}/gi, email);
  }
  // Paciente
  if (clinicData.nomeCliente) {
    result = result.replace(/\{\{(?:nome_cliente|paciente|nome_paciente|cliente)\}\}/gi, paciente);
  }
  if (clinicData.rgCliente) {
    result = result.replace(/\{\{(?:rg_cliente|rg_paciente|rg)\}\}/gi, rg);
  }
  // Data
  result = result.replace(/\{\{(?:data|data_documento|data_atual|data_emissao)\}\}/gi, data);
  // Procedimento & Equipamento
  if (clinicData.procedimento) {
    result = result.replace(/\{\{(?:procedimento|nome_procedimento)\}\}/gi, procedimento);
  }
  if (clinicData.equipamento) {
    result = result.replace(/\{\{(?:equipamento|nome_equipamento|aparelho)\}\}/gi, equipamento);
  }
  if (clinicData.registroAnvisa) {
    result = result.replace(/\{\{(?:registro_anvisa|anvisa_equipamento|registro_ms)\}\}/gi, registroAnvisa);
  }
  // Financeiro
  if (clinicData.valorHonorarios) {
    result = result.replace(/\{\{(?:valor|valor_honorarios|honorarios)\}\}/gi, valor);
  }

  // Clean up any remaining double separators or orphan pipe dividers
  result = result
    .replace(/\|\s*\|+/g, '|')
    .replace(/\|\s*<br\s*\/?>/gi, '<br/>')
    .replace(/\|\s*<\/p>/gi, '</p>')
    .replace(/<p>\s*\|\s*/gi, '<p>')
    .replace(/&bull;\s*&bull;+/g, '&bull;')
    .replace(/&bull;\s*<\/p>/gi, '</p>');

  // Support custom bracket variables
  if (clinicData.customVariables) {
    Object.entries(clinicData.customVariables).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        const cleanKey = key.replace(/^\{\{/, '').replace(/\}\}$/, '');
        const regex = new RegExp(`\\{\\{${cleanKey}\\}\\}`, 'gi');
        result = result.replace(regex, String(val));
      }
    });
  }

  return result;
}

/**
 * Splits document content into an array of pages.
 * Supports explicit page-break markers (<!-- PAGE_BREAK -->, <div class="page-break"></div>)
 * or falls back to intelligent 2-page splitting.
 */
export function splitContentIntoPages(htmlContent: string): string[] {
  // Check for explicit single page marker
  if (/<!--\s*SINGLE_PAGE(?:_DOCUMENT)?\s*-->/i.test(htmlContent)) {
    return [htmlContent.replace(/<!--\s*SINGLE_PAGE(?:_DOCUMENT)?\s*-->/gi, '').trim()];
  }

  // Check for explicit page break markers
  const explicitBreakRegex = /<!--\s*PAGE_BREAK\s*-->|<div[^>]*class=["'][^"']*page-break[^"']*["'][^>]*>\s*<\/div>|<hr[^>]*class=["'][^"']*page-break[^"']*["'][^>]*\/?>/i;
  
  if (explicitBreakRegex.test(htmlContent)) {
    const rawPages = htmlContent.split(explicitBreakRegex);
    const validPages = rawPages.map(p => p.trim()).filter(p => p.length > 0);
    if (validPages.length > 0) {
      return validPages;
    }
  }

  // If this is a Caderno / Livro / Planilha / Ficha Única Sanitária (and no explicit break)
  const isSinglePageSheet = /CADERNO DE|LIVRO DE REGISTRO|PLANILHA DE REGISTRO|FICHA DE CONTROLE|FICHA DE REGISTRO/i.test(htmlContent) &&
    !/<p><strong>(?:5\.|4\.|3\.|2ª\s*QUINZENA)/i.test(htmlContent);

  if (isSinglePageSheet) {
    return [htmlContent.trim()];
  }

  // Fallback to 2-page splitter
  const twoPages = splitContentForTwoPages(htmlContent);
  return [twoPages.page1Body, twoPages.page2Body];
}

/**
 * Splits document content into Page 1 (Frente) and Page 2 (Verso)
 * using section headers (e.g. 5. DESCRIÇÃO, 4. TERMO, or midpoint)
 */
export function splitContentForTwoPages(htmlContent: string): { page1Body: string; page2Body: string; frontContent: string; backContent: string } {
  // Try to find natural split points such as Section 5, Section 4, Quinzena, or major headers
  const splitPatterns = [
    /<p><strong>2ª\s*QUINZENA/i,
    /<p><strong>SEGUNDA\s*QUINZENA/i,
    /<p><strong>PARTE\s*2/i,
    /<p><strong>5\.\s*DESCRIÇÃO/i,
    /<p><strong>5\.\s*PROCEDIMENTO/i,
    /<p><strong>5\.\s*ETAPAS/i,
    /<p><strong>5\.\s*MOMENTOS/i,
    /<p><strong>5\.\s*DECLARAÇÃO/i,
    /<p><strong>5\.\s*PROTOCOLO/i,
    /<p><strong>5\.\s*CLÁUSULAS\s*JURÍDICAS/i,
    /<p><strong>5\.\s*CONSENTIMENTO/i,
    /<p><strong>5\.\s*TERMO/i,
    /<p><strong>5\.\s*FRACIONAMENTO/i,
    /<p><strong>5\.\s*PLANO/i,
    /<p><strong>5\.\s*MEDIDAS/i,
    /<p><strong>5\.\s*FORMALIZAÇÃO/i,
    /<p><strong>4\.\s*ROTINA/i,
    /<p><strong>4\.\s*PLANILHA/i,
    /<p><strong>4\.\s*OBRIGAÇÕES/i,
    /<p><strong>4\.\s*CUIDADOS/i,
    /<p><strong>4\.\s*DECLARAÇÕES/i,
    /<p><strong>4\.\s*CLÁUSULAS/i,
    /<p><strong>4\.\s*SEQUÊNCIA/i,
    /<p><strong>4\.\s*DESCRIÇÃO/i,
    /<p><strong>4\.\s*TERMO/i,
    /<p><strong>4\.\s*CONSENTIMENTO/i,
    /<p><strong>4\.\s*DISPOSIÇÕES/i,
    /<p><strong>4\.\s*AUTORIZAÇÃO/i,
    /<p><strong>4\.\s*ALGORITMOS/i,
    /<p><strong>4\.\s*ARMAZENAMENTO/i,
    /<p><strong>4\.\s*PROCEDIMENTOS/i,
    /<p><strong>4\.\s*CRONOGRAMA/i,
    /<p><strong>4\.\s*CONTROLE/i,
    /<p><strong>3\.\s*CUIDADOS/i,
    /<p><strong>3\.\s*OBRIGAÇÕES/i,
    /<p><strong>3\.\s*DECLARAÇÃO/i,
    /<p><strong>3\.\s*ETAPAS/i,
    /<p><strong>3\.\s*SEQUÊNCIA/i,
    /<h2[^>]*>.*?(?:PASSO A PASSO|PROCEDIMENTO|TERMO DE CONSENTIMENTO|ETAPAS)/i,
    /<h2>/i,
  ];

  for (const pattern of splitPatterns) {
    const match = htmlContent.search(pattern);
    if (match > 150 && match < htmlContent.length - 150) {
      const p1 = htmlContent.substring(0, match).trim();
      const p2 = htmlContent.substring(match).trim();
      return {
        page1Body: p1,
        page2Body: p2,
        frontContent: p1,
        backContent: p2,
      };
    }
  }

  // Fallback: Split by paragraph count or character count near midpoint
  const paragraphs = htmlContent.split('</p>');
  if (paragraphs.length >= 4) {
    const midIndex = Math.ceil(paragraphs.length * 0.45);
    const p1 = paragraphs.slice(0, midIndex).join('</p>') + (paragraphs.slice(0, midIndex).length > 0 ? '</p>' : '');
    const p2 = paragraphs.slice(midIndex).join('</p>');
    return {
      page1Body: p1.trim(),
      page2Body: p2.trim(),
      frontContent: p1.trim(),
      backContent: p2.trim(),
    };
  }

  // Extreme fallback
  return {
    page1Body: htmlContent,
    page2Body: '<p><em>Continuação e homologação dos procedimentos operacionais e sanitários.</em></p>',
    frontContent: htmlContent,
    backContent: '<p><em>Continuação e homologação dos procedimentos operacionais e sanitários.</em></p>',
  };
}

/**
 * Generates the clean signature HTML block for Page 2 (Verso) or final page
 */
export function generateSignatureBlockHtml(
  clinicData: ClinicData,
  needsPatientSig: boolean,
  doc?: DocumentItem
): string {
  const isContract = (doc?.category as string) === 'Contrato' || doc?.title?.toLowerCase().includes('contrato');
  const isPrescription = (doc?.category as string) === 'Prescrição' || doc?.title?.toLowerCase().includes('prescri') || doc?.id?.includes('prescricao');

  if (isPrescription) {
    return `
      <div class="a4-signatures-wrapper" style="margin-top: 24px; padding-top: 14px; border-top: 1px solid #cbd5e1; display: flex; justify-content: center; page-break-inside: avoid;">
        <div style="text-align: center; width: 280px; max-width: 90%;">
          <div style="border-bottom: 1.5px solid #0f172a; height: 36px; margin-bottom: 5px;"></div>
          <div style="font-weight: bold; font-size: 10px; text-transform: uppercase; color: #0f172a;">${clinicData.responsavel || 'Responsável Técnico(a)'}</div>
          <div style="font-size: 9px; color: #475569;">${clinicData.registroConselho || 'Registro Profissional'} &bull; ${clinicData.nomeClinica || 'Clínica Estética'}</div>
          <div style="font-size: 8px; color: #64748b; margin-top: 2px;">Assinatura do(a) Profissional Prescritor(a)</div>
        </div>
      </div>
    `;
  }

  if (isContract) {
    return `
      <div class="a4-signatures-wrapper" style="margin-top: 16px; padding-top: 10px; border-top: 1px dashed #94a3b8; page-break-inside: avoid; font-family: Arial, sans-serif;">
        <div style="font-size: 8.5px; font-weight: bold; text-transform: uppercase; color: #475569; text-align: center; margin-bottom: 10px; letter-spacing: 0.5px;">
          Homologação e Firmatura dos Representantes Legais (Validade Jurídica & Sanitária)
        </div>
        <div style="display: flex; justify-content: space-between; gap: 16px; margin-bottom: 12px;">
          <div style="text-align: center; width: 48%;">
            <div style="border-bottom: 1.5px solid #0f172a; height: 28px; margin-bottom: 4px;"></div>
            <div style="font-weight: bold; font-size: 9.5px; text-transform: uppercase; color: #0f172a;">CONTRATANTE: ${clinicData.nomeClinica || 'CLÍNICA ESTÉTICA'}</div>
            <div style="font-size: 8.5px; color: #475569;">${clinicData.responsavel || 'Resp. Legal / Técnico'}</div>
          </div>
          <div style="text-align: center; width: 48%;">
            <div style="border-bottom: 1.5px solid #0f172a; height: 28px; margin-bottom: 4px;"></div>
            <div style="font-weight: bold; font-size: 9.5px; text-transform: uppercase; color: #0f172a;">CONTRATADA: EMPRESA COLETORA DE RESÍDUOS</div>
            <div style="font-size: 8.5px; color: #475569;">Representante Legal / Resp. Técnico Ambiental (CRQ/CREA)</div>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; gap: 16px; font-size: 8px; color: #64748b;">
          <div style="width: 48%; text-align: center;">
            <div style="border-bottom: 1px solid #cbd5e1; height: 18px; margin-bottom: 3px;"></div>
            <div>Testemunha 1: _________________________ Assinatura / Visto</div>
          </div>
          <div style="width: 48%; text-align: center;">
            <div style="border-bottom: 1px solid #cbd5e1; height: 18px; margin-bottom: 3px;"></div>
            <div>Testemunha 2: _________________________ Assinatura / Visto</div>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="a4-signatures-wrapper" style="margin-top: 24px; padding-top: 14px; border-top: 1px dashed #94a3b8; display: flex; justify-content: ${needsPatientSig ? 'space-between' : 'center'}; gap: 20px; page-break-inside: avoid;">
      ${needsPatientSig ? `
      <div style="text-align: center; width: 240px; max-width: 48%;">
        <div style="border-bottom: 1.5px solid #0f172a; height: 36px; margin-bottom: 5px;"></div>
        <div style="font-weight: bold; font-size: 10px; text-transform: uppercase; color: #0f172a;">${clinicData.nomeCliente || 'Assinatura do(a) Paciente'}</div>
        <div style="font-size: 9px; color: #475569;">Paciente / Titular</div>
        <div style="font-size: 8px; color: #64748b; margin-top: 2px;">Data: ____/____/________</div>
      </div>` : ''}
      <div style="text-align: center; width: 240px; max-width: 48%;">
        <div style="border-bottom: 1.5px solid #0f172a; height: 36px; margin-bottom: 5px;"></div>
        <div style="font-weight: bold; font-size: 10px; text-transform: uppercase; color: #0f172a;">${clinicData.responsavel || 'Responsável Técnico(a)'}</div>
        <div style="font-size: 9px; color: #475569;">${clinicData.nomeClinica || 'Clínica Estética'} | Alvará: ${clinicData.alvara || 'Vigente'}</div>
        <div style="font-size: 8px; color: #64748b; margin-top: 2px;">Homologação Sanitária / Registro Profissional</div>
      </div>
    </div>
  `;
}

/**
 * Returns full high-density CSS optimized for A4 Front & Back printing (Portrait or Landscape)
 */
export function getA4PrintStyles(customThemeColor?: string, orientation: 'portrait' | 'landscape' = 'portrait'): string {
  const primaryColor = customThemeColor || '#0284c7';
  const isLandscape = orientation === 'landscape';

  return `
    @page {
      size: A4 ${orientation};
      margin: ${isLandscape ? '6mm 8mm 6mm 8mm' : '8mm 10mm 8mm 10mm'};
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body, .a4-container {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 0;
      font-size: ${isLandscape ? '9.5px' : '10.5px'};
      line-height: ${isLandscape ? '1.35' : '1.42'};
    }
    .a4-sheet {
      width: 100%;
      max-width: 100%;
      min-height: ${isLandscape ? '195mm' : '275mm'};
      max-height: ${isLandscape ? '195mm' : '275mm'};
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
      padding: ${isLandscape ? '2px 4px' : '4px 2px'};
      page-break-inside: avoid;
      overflow: hidden;
    }
    .a4-sheet-verso {
      page-break-before: always;
      break-before: page;
    }
    .a4-header-main {
      border-bottom: 2px solid ${primaryColor};
      padding-bottom: ${isLandscape ? '4px' : '6px'};
      margin-bottom: ${isLandscape ? '6px' : '10px'};
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }
    .a4-header-main-left {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
      min-width: 0;
    }
    .a4-clinic-logo {
      max-height: ${isLandscape ? '36px' : '44px'};
      max-width: 110px;
      object-fit: contain;
      border-radius: 4px;
    }
    .a4-clinic-name {
      font-size: ${isLandscape ? '13px' : '14.5px'};
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: ${primaryColor};
      margin-bottom: 2px;
    }
    .a4-clinic-sub {
      font-size: 8.5px;
      color: #475569;
      line-height: 1.3;
    }
    .a4-badge-anvisa {
      border: 1.5px solid ${primaryColor};
      color: ${primaryColor};
      font-weight: 800;
      font-size: 8px;
      padding: 2px 6px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
      background: #f8fafc;
    }
    .a4-doc-title-box {
      background: #f8fafc;
      border-left: 3.5px solid ${primaryColor};
      padding: ${isLandscape ? '3px 6px' : '5px 8px'};
      margin-bottom: ${isLandscape ? '5px' : '8px'};
      border-radius: 2px;
    }
    .a4-doc-category {
      font-size: 7.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: ${primaryColor};
    }
    .a4-doc-title {
      font-size: ${isLandscape ? '11px' : '12px'};
      font-weight: 800;
      text-transform: uppercase;
      color: #0f172a;
      margin: 1px 0;
    }
    .a4-doc-meta {
      font-size: 8px;
      color: #64748b;
    }
    .a4-header-verso {
      border-bottom: 1.5px solid ${primaryColor};
      padding-bottom: 4px;
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 8px;
      color: #475569;
      text-transform: uppercase;
      font-weight: bold;
    }
    .a4-content-flow {
      flex: 1;
      font-size: ${isLandscape ? '9.5px' : '10.5px'};
      line-height: ${isLandscape ? '1.3' : '1.4'};
      color: #1e293b;
    }
    .a4-content-flow h2 {
      display: none; /* Already rendered in title box */
    }
    .a4-content-flow h3 {
      font-size: ${isLandscape ? '10px' : '11px'};
      font-weight: bold;
      margin-top: ${isLandscape ? '5px' : '8px'};
      margin-bottom: 2px;
      color: ${primaryColor};
      text-transform: uppercase;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
    }
    .a4-content-flow p {
      margin-bottom: ${isLandscape ? '4px' : '6px'};
      text-align: justify;
    }
    .a4-content-flow strong {
      color: #0f172a;
    }
    .a4-content-flow ul, .a4-content-flow ol {
      margin: ${isLandscape ? '2px 0 4px 0' : '4px 0 6px 0'};
      padding-left: 16px;
    }
    .a4-content-flow li {
      margin-bottom: ${isLandscape ? '1px' : '2px'};
    }
    .a4-content-flow table {
      width: 100% !important;
      max-width: 100% !important;
      table-layout: fixed !important;
      border-collapse: collapse !important;
      margin: 4px 0 !important;
      box-sizing: border-box !important;
      word-wrap: break-word !important;
    }
    .a4-content-flow th, .a4-content-flow td {
      border: 1px solid #94a3b8 !important;
      padding: ${isLandscape ? '3.5px 3px' : '3px 2px'} !important;
      text-align: center !important;
      vertical-align: middle !important;
      box-sizing: border-box !important;
      font-size: ${isLandscape ? '9px' : '8.5px'} !important;
      line-height: ${isLandscape ? '1.3' : '1.25'} !important;
      overflow: hidden !important;
    }
    .a4-content-flow th {
      background-color: #f1f5f9 !important;
      font-weight: bold !important;
      color: #0f172a !important;
    }
    .a4-page-footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 3px;
      margin-top: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.5px;
      color: #64748b;
      font-family: Arial, sans-serif;
    }
    .a4-page-badge {
      font-weight: bold;
      color: #0f172a;
      background: #f1f5f9;
      padding: 1px 6px;
      border-radius: 3px;
    }
  `;
}

/**
 * Builds the standalone Multi-Page A4 HTML ready for html2pdf and print.
 * Automatically adapts from 2-page documents (POPs, TCLEs) to N-page master manuals.
 */
export function buildMultiPageA4Html(
  doc: DocumentItem,
  clinicData: ClinicData,
  rawContent: string,
  needsPatientSig: boolean,
  orientation: 'portrait' | 'landscape' = 'portrait'
): string {
  const processed = replaceClinicVariables(rawContent, clinicData);
  const pages = splitContentIntoPages(processed);
  const totalPages = pages.length;
  const sigBlock = generateSignatureBlockHtml(clinicData, needsPatientSig, doc);
  const themeColor = clinicData.themeColor || '#0284c7';
  const logoHtml = clinicData.logoUrl
    ? `<img src="${clinicData.logoUrl}" alt="Logo da Clínica" class="a4-clinic-logo" />`
    : '';

  const isPrescription = (doc.category as string) === 'Prescrição' || doc.title.toLowerCase().includes('prescri') || doc.title.toLowerCase().includes('receitu') || doc.id.includes('prescricao');
  const isContract = (doc.category as string) === 'Contrato' || doc.title.toLowerCase().includes('contrato') || doc.id.includes('contrato');

  // If standard 2 pages
  if (totalPages === 2) {
    const page1Body = pages[0];
    const page2Body = pages[1];

    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="utf-8">
        <title>${doc.title} - ${clinicData.nomeClinica}</title>
        <style>
          ${getA4PrintStyles(themeColor, orientation)}
        </style>
      </head>
      <body>
        <div class="a4-container">
          <!-- PÁGINA 1: FRENTE -->
          <div class="a4-sheet a4-sheet-frente">
            <div>
              <!-- Header Institucional -->
              <div class="a4-header-main" style="${isPrescription ? 'border-bottom-color: #ec4899;' : ''}">
                <div class="a4-header-main-left">
                  ${logoHtml}
                  <div>
                    <div class="a4-clinic-name">${clinicData.nomeClinica || 'NOME DA SUA CLÍNICA'}</div>
                    <div class="a4-clinic-sub">
                      <strong>Resp. Técnico:</strong> ${clinicData.responsavel || 'Responsável Técnico(a)'} &bull; 
                      <strong>Alvará Sanitário:</strong> ${clinicData.alvara || 'Vigente / VISA'}
                    </div>
                  </div>
                </div>
                <div class="a4-badge-anvisa" style="${isPrescription ? 'border-color: #ec4899; color: #be185d; background-color: #fdf2f8;' : isContract ? 'border-color: #0284c7; color: #0369a1;' : ''}">
                  ${isPrescription ? 'RECEITUÁRIO ESPECIALIZADO' : isContract ? 'INSTRUMENTO CONTRATUAL' : 'PADRÃO ANVISA / RDC'}
                </div>
              </div>

              <!-- Título & Metadados do Documento -->
              <div class="a4-doc-title-box" style="${isPrescription ? 'border-left-color: #ec4899;' : ''}">
                <div class="a4-doc-category" style="${isPrescription ? 'color: #be185d;' : ''}">
                  ${isPrescription ? 'PRESCRIÇÃO & PROTOCOLO HOME CARE' : isContract ? 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS' : doc.category} &bull; ${doc.version || 'V 2.4'}
                </div>
                <div class="a4-doc-title">${doc.title}</div>
                <div class="a4-doc-meta">
                  ${isPrescription
                    ? `Emissão Farmacológica &bull; Validade: 30 dias &bull; Profissional Prescritor(a): ${clinicData.responsavel || 'Responsável Técnico'}`
                    : `Vigência: 12 meses &bull; Setor: Estética & Procedimentos Clínicos &bull; Homologação: ${clinicData.responsavel}`}
                </div>
              </div>

              <!-- Conteúdo da Frente -->
              <div class="a4-content-flow">
                ${page1Body}
              </div>
            </div>

            <!-- Rodapé Página 1 (Frente) -->
            <div class="a4-page-footer">
              <span>${clinicData.nomeClinica} &bull; Alvará Sanitário: ${clinicData.alvara}</span>
              <span class="a4-page-badge">PÁGINA 1 DE 2 &bull; FRENTE</span>
              <span>${isPrescription ? 'Receituário Clínico Individual' : 'Manual Sanitário Oficial'}</span>
            </div>
          </div>

          <!-- PÁGINA 2: VERSO -->
          <div class="a4-sheet a4-sheet-verso">
            <div>
              <!-- Mini-Header Verso -->
              <div class="a4-header-verso" style="${isPrescription ? 'border-bottom-color: #fbcfe8;' : ''}">
                <span style="${isPrescription ? 'color: #be185d;' : ''}">CONTINUAÇÃO &bull; ${doc.title}</span>
                <span>${clinicData.nomeClinica}</span>
              </div>

              <!-- Conteúdo do Verso -->
              <div class="a4-content-flow">
                ${page2Body}
              </div>
            </div>

            <div>
              <!-- Bloco de Assinaturas e Homologação Sanitária -->
              ${sigBlock}

              <!-- Rodapé Página 2 (Verso) -->
              <div class="a4-page-footer" style="margin-top: 10px;">
                <span>${isPrescription ? 'Receituário Registrado e Emitido para Uso Individual do Paciente' : 'Documento Registrado e Auditável perante a Vigilância Sanitária (VISA)'}</span>
                <span class="a4-page-badge">PÁGINA 2 DE 2 &bull; VERSO</span>
                <span>Emitido em: ${new Date().toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Multi-page layout (e.g. 3, 4, 5, 6, 8 pages)
  const renderedPagesHtml = pages.map((pageHtml, index) => {
    const pageNum = index + 1;
    const isFirstPage = index === 0;
    const isLastPage = index === totalPages - 1;

    return `
      <div class="a4-sheet ${isFirstPage ? 'a4-sheet-frente' : 'a4-sheet-verso'}">
        <div>
          ${isFirstPage ? `
            <!-- Header Institucional Principal -->
            <div class="a4-header-main" style="${isPrescription ? 'border-bottom-color: #ec4899;' : ''}">
              <div class="a4-header-main-left">
                ${logoHtml}
                <div>
                  <div class="a4-clinic-name">${clinicData.nomeClinica || 'NOME DA SUA CLÍNICA'}</div>
                  <div class="a4-clinic-sub">
                    <strong>Resp. Técnico:</strong> ${clinicData.responsavel || 'Responsável Técnico(a)'} &bull; 
                    <strong>Alvará Sanitário:</strong> ${clinicData.alvara || 'Vigente / VISA'}
                  </div>
                </div>
              </div>
              <div class="a4-badge-anvisa" style="${isPrescription ? 'border-color: #ec4899; color: #be185d; background-color: #fdf2f8;' : isContract ? 'border-color: #0284c7; color: #0369a1;' : ''}">
                ${isPrescription ? 'RECEITUÁRIO ESPECIALIZADO' : isContract ? 'INSTRUMENTO CONTRATUAL' : 'PADRÃO ANVISA & JURÍDICO'}
              </div>
            </div>

            <!-- Título & Metadados do Documento -->
            <div class="a4-doc-title-box" style="${isPrescription ? 'border-left-color: #ec4899;' : ''}">
              <div class="a4-doc-category" style="${isPrescription ? 'color: #be185d;' : ''}">
                ${isPrescription ? 'PRESCRIÇÃO & PROTOCOLO HOME CARE' : isContract ? 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS' : doc.category} &bull; ${doc.version || 'V 5.0 MASTER'}
              </div>
              <div class="a4-doc-title">${doc.title}</div>
              <div class="a4-doc-meta">
                ${isPrescription
                  ? `Emissão Farmacológica &bull; Validade: 30 dias &bull; Profissional Prescritor(a): ${clinicData.responsavel || 'Responsável Técnico'}`
                  : `Vigência: 12 meses &bull; Gestão da Qualidade, Biossegurança e Blindagem Jurídica &bull; Homologação: ${clinicData.responsavel}`}
              </div>
            </div>
          ` : `
            <!-- Header Páginas Seguintes -->
            <div class="a4-header-verso" style="${isPrescription ? 'border-bottom-color: #fbcfe8;' : ''}">
              <span style="${isPrescription ? 'color: #be185d;' : ''}">${doc.title}</span>
              <span>${clinicData.nomeClinica}</span>
            </div>
          `}

          <!-- Conteúdo da Página -->
          <div class="a4-content-flow">
            ${pageHtml}
          </div>
        </div>

        <div>
          ${isLastPage && !/HOMOLOGAÇÃO|FIRMATURA|ASSINATURAS FÍSICAS|border-bottom:\s*1\.5px solid/i.test(pageHtml) ? `
            <!-- Bloco de Assinaturas na Última Página -->
            ${sigBlock}
          ` : ''}

          <!-- Rodapé da Página -->
          <div class="a4-page-footer" style="${isLastPage ? 'margin-top: 8px;' : ''}">
            <span>${clinicData.nomeClinica} &bull; Alvará Sanitário: ${clinicData.alvara}</span>
            <span class="a4-page-badge">PÁGINA ${pageNum} DE ${totalPages}</span>
            <span>${isLastPage ? (isPrescription ? 'Assinatura do(a) Prescritor(a)' : 'Homologação e Conformidade Legal') : (isPrescription ? 'Receituário Farmacológico' : 'Documento Regulatório')}</span>
          </div>
        </div>
      </div>
    `;
  }).join('\n');

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="utf-8">
      <title>${doc.title} - ${clinicData.nomeClinica}</title>
      <style>
        ${getA4PrintStyles(themeColor, orientation)}
      </style>
    </head>
    <body>
      <div class="a4-container">
        ${renderedPagesHtml}
      </div>
    </body>
    </html>
  `;
}

/**
 * Builds a single comprehensive, self-contained HTML bundle containing ALL documents
 * formatted for A4 printing and interactive digital reading, with cover, table of contents,
 * live search filter, and instant print/PDF support.
 */
export function buildAllDocumentsBundleHtml(
  documents: DocumentItem[],
  clinicData: ClinicData,
  needsPatientSigMap: Record<string, boolean> = {}
): string {
  const totalDocs = documents.length;
  const clinicName = clinicData.nomeClinica || 'CLÍNICA DE ESTÉTICA INTEGRADA';
  const emissionDate = clinicData.dataDocumento || new Date().toLocaleDateString('pt-BR');
  const themeColor = clinicData.themeColor || '#0284c7';
  const logoHtml = clinicData.logoUrl
    ? `<img src="${clinicData.logoUrl}" alt="Logo da Clínica" class="a4-clinic-logo" />`
    : '';

  // Generate table of contents entries
  const tocEntries = documents.map((doc, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    return `
      <tr class="toc-row" data-title="${doc.title.toLowerCase()}" data-cat="${doc.category.toLowerCase()}">
        <td style="padding: 6px 10px; font-weight: bold; color: ${themeColor}; width: 45px; text-align: center; border: 1px solid #cbd5e1;">${num}</td>
        <td style="padding: 6px 10px; width: 90px; border: 1px solid #cbd5e1;">
          <span style="font-size: 8.5px; font-weight: bold; background: #e0f2fe; color: ${themeColor}; padding: 2px 6px; border-radius: 3px; text-transform: uppercase;">
            ${doc.category}
          </span>
        </td>
        <td style="padding: 6px 10px; font-weight: 600; border: 1px solid #cbd5e1;">
          <a href="#doc-${doc.id}" style="color: #0f172a; text-decoration: none; display: block;" class="toc-link">
            ${doc.title}
          </a>
        </td>
        <td style="padding: 6px 10px; font-size: 9px; color: #64748b; width: 85px; text-align: center; border: 1px solid #cbd5e1;">
          ${doc.version ? doc.version.split(' - ')[0] : 'V 5.0'}
        </td>
        <td style="padding: 6px 10px; font-size: 9px; color: #059669; font-weight: bold; width: 80px; text-align: center; border: 1px solid #cbd5e1;">
          CONFORME
        </td>
      </tr>
    `;
  }).join('\n');

  // Render all documents in A4 page sheets
  const renderedAllDocs = documents.map((doc, docIdx) => {
    const isPatientSig = needsPatientSigMap[doc.id] !== undefined
      ? needsPatientSigMap[doc.id]
      : (
        doc.category?.toUpperCase() === 'TCLE' ||
        doc.category?.toUpperCase() === 'ANAMNESE' ||
        doc.category?.toUpperCase() === 'LGPD' ||
        doc.title.toLowerCase().includes('termo') ||
        doc.title.toLowerCase().includes('consentimento') ||
        doc.title.toLowerCase().includes('recusa') ||
        doc.title.toLowerCase().includes('autorização')
      );

    const processedContent = replaceClinicVariables(doc.content, clinicData);
    const pages = splitContentIntoPages(processedContent);
    const docTotalPages = pages.length;
    const sigBlock = generateSignatureBlockHtml(clinicData, isPatientSig, doc);

    const isPrescription = (doc.category as string) === 'Prescrição' || doc.title.toLowerCase().includes('prescri') || doc.title.toLowerCase().includes('receitu') || doc.id.includes('prescricao');
    const isContract = (doc.category as string) === 'Contrato' || doc.title.toLowerCase().includes('contrato') || doc.id.includes('contrato');

    const docPagesHtml = pages.map((pageHtml, pIdx) => {
      const pageNum = pIdx + 1;
      const isFirst = pIdx === 0;
      const isLast = pIdx === docTotalPages - 1;

      return `
        <div class="a4-sheet ${isFirst ? 'a4-sheet-frente' : 'a4-sheet-verso'}">
          <div>
            ${isFirst ? `
              <!-- Header Institucional Principal -->
              <div class="a4-header-main" style="${isPrescription ? 'border-bottom-color: #ec4899;' : ''}">
                <div class="a4-header-main-left">
                  ${logoHtml}
                  <div>
                    <div class="a4-clinic-name">${clinicName}</div>
                    <div class="a4-clinic-sub">
                      <strong>Resp. Técnico:</strong> ${clinicData.responsavel || 'Homologado'} &bull; 
                      <strong>Alvará Sanitário:</strong> ${clinicData.alvara || '2026/VISA'}
                    </div>
                  </div>
                </div>
                <div class="a4-badge-anvisa" style="${isPrescription ? 'border-color: #ec4899; color: #be185d; background-color: #fdf2f8;' : isContract ? 'border-color: #0284c7; color: #0369a1;' : ''}">
                  ${isPrescription ? 'RECEITUÁRIO ESPECIALIZADO' : isContract ? 'INSTRUMENTO CONTRATUAL' : 'PADRÃO ANVISA & JURÍDICO'}
                </div>
              </div>

              <!-- Título & Metadados do Documento -->
              <div class="a4-doc-title-box" style="${isPrescription ? 'border-left-color: #ec4899;' : ''}">
                <div class="a4-doc-category" style="${isPrescription ? 'color: #be185d;' : ''}">
                  ${isPrescription ? 'PRESCRIÇÃO & PROTOCOLO HOME CARE' : isContract ? 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS' : doc.category} &bull; ${doc.version || 'V 5.0 MASTER'} &bull; DOC ${docIdx + 1}/${totalDocs}
                </div>
                <div class="a4-doc-title">${doc.title}</div>
                <div class="a4-doc-meta">
                  ${isPrescription
                    ? `Emissão Farmacológica &bull; Validade: 30 dias &bull; Profissional Prescritor(a): ${clinicData.responsavel || 'Responsável Técnico'}`
                    : `Vigência: 12 meses &bull; Gestão da Qualidade, Biossegurança e Blindagem Jurídica &bull; Homologação: ${clinicData.responsavel || 'Responsável Técnico'}`}
                </div>
              </div>
            ` : `
              <!-- Header Páginas Seguintes -->
              <div class="a4-header-verso" style="${isPrescription ? 'border-bottom-color: #fbcfe8;' : ''}">
                <span style="${isPrescription ? 'color: #be185d;' : ''}">${doc.title} (Doc ${docIdx + 1} de ${totalDocs})</span>
                <span>${clinicName}</span>
              </div>
            `}

            <!-- Conteúdo da Página -->
            <div class="a4-content-flow">
              ${pageHtml}
            </div>
          </div>

          <div>
            ${isLast ? `
              <!-- Bloco de Assinaturas na Última Página -->
              ${sigBlock}
            ` : ''}

            <!-- Rodapé da Página -->
            <div class="a4-page-footer" style="${isLast ? 'margin-top: 8px;' : ''}">
              <span>${clinicName} &bull; Alvará Sanitário: ${clinicData.alvara || '2026/VISA'}</span>
              <span class="a4-page-badge">DOC ${docIdx + 1} &bull; PÁG ${pageNum}/${docTotalPages}</span>
              <span>${isLast ? (isPrescription ? 'Assinatura do(a) Prescritor(a)' : 'Homologação e Conformidade Legal') : (isPrescription ? 'Receituário Farmacológico' : 'Documento Regulatório')}</span>
            </div>
          </div>
        </div>
      `;
    }).join('\n');

    return `
      <section id="doc-${doc.id}" class="doc-container" data-id="${doc.id}" data-category="${doc.category}" data-title="${doc.title.toLowerCase()}">
        <div class="doc-anchor-bar no-print">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-weight: 800; font-size: 11px; background: ${themeColor}; color: #ffffff; padding: 2px 8px; border-radius: 4px;">
                DOC ${docIdx + 1}/${totalDocs}
              </span>
              <span style="font-weight: bold; font-size: 13px; color: #0f172a;">${doc.title}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <a href="#sumario" style="font-size: 11px; color: ${themeColor}; text-decoration: none; font-weight: bold; background: #f1f5f9; padding: 4px 10px; border-radius: 6px; border: 1px solid #cbd5e1;">
                ↑ Voltar ao Sumário
              </a>
              <button onclick="window.print()" style="font-size: 11px; color: #ffffff; background: #0f172a; border: none; padding: 4px 10px; border-radius: 6px; cursor: pointer; font-weight: bold;">
                Imprimir
              </button>
            </div>
          </div>
        </div>
        ${docPagesHtml}
      </section>
    `;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Compêndio Geral de POPs e Documentos Regulatórios - ${clinicName}</title>
  <style>
    ${getA4PrintStyles()}

    /* Screen UI Styles (Non-Printing) */
    @media screen {
      body {
        background-color: #0f172a;
        color: #1e293b;
        padding-top: 70px;
        padding-bottom: 60px;
      }
      .a4-container {
        max-width: 210mm;
        margin: 0 auto;
      }
      .a4-sheet {
        background: #ffffff;
        box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        margin-bottom: 24px;
        padding: 24px 28px;
        min-height: 297mm;
        max-height: none;
      }
      .doc-anchor-bar {
        background: #e2e8f0;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        padding: 8px 14px;
        margin: 30px auto 10px auto;
        max-width: 210mm;
      }
    }

    /* Fixed Interactive Screen Header */
    .screen-header-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 58px;
      background: #090d16;
      border-bottom: 1px solid #1e293b;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      z-index: 9999;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .screen-header-title {
      font-size: 14px;
      font-weight: 800;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .screen-badge {
      background: #00d3a1;
      color: #000000;
      font-size: 10px;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 12px;
      text-transform: uppercase;
    }
    .screen-controls {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .screen-search {
      background: #1e293b;
      border: 1px solid #334155;
      color: #ffffff;
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 12px;
      outline: none;
      width: 220px;
    }
    .screen-search:focus {
      border-color: #00b1ea;
    }
    .screen-btn {
      background: linear-gradient(135deg, #00d3a1, #00b1ea);
      color: #000000;
      font-weight: 800;
      font-size: 12px;
      border: none;
      padding: 7px 14px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: transform 0.1s ease;
    }
    .screen-btn:active {
      transform: scale(0.96);
    }
    .screen-btn-secondary {
      background: #1e293b;
      color: #cbd5e1;
      border: 1px solid #334155;
      font-weight: bold;
      font-size: 12px;
      padding: 7px 12px;
      border-radius: 8px;
      cursor: pointer;
      text-decoration: none;
    }
    .screen-btn-secondary:hover {
      background: #334155;
      color: #ffffff;
    }

    /* Print Optimizations */
    @media print {
      .no-print {
        display: none !important;
      }
      body {
        background: #ffffff !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      .a4-container {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      .a4-sheet {
        box-shadow: none !important;
        border-radius: 0 !important;
        margin: 0 !important;
        padding: 4px 2px !important;
        min-height: 275mm !important;
        max-height: 275mm !important;
      }
      .cover-sheet {
        min-height: 275mm !important;
        max-height: 275mm !important;
        page-break-after: always !important;
        break-after: page !important;
      }
      .toc-sheet {
        min-height: 275mm !important;
        max-height: none !important;
        page-break-after: always !important;
        break-after: page !important;
      }
      .doc-container {
        page-break-before: always !important;
        break-before: page !important;
      }
    }

    /* Cover Page Styling */
    .cover-sheet {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 3px double #0f172a;
      padding: 30px 24px;
      box-sizing: border-box;
    }
    .cover-header {
      text-align: center;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 18px;
    }
    .cover-main-title {
      font-size: 24px;
      font-weight: 900;
      color: #0369a1;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 10px;
      line-height: 1.2;
    }
    .cover-sub-title {
      font-size: 13px;
      font-weight: bold;
      color: #334155;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 6px;
    }
    .cover-card {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 16px 20px;
      margin: 16px 0;
    }
    .cover-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      font-size: 11px;
    }
    .cover-item strong {
      color: #0f172a;
      display: block;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 2px;
    }
    .cover-anvisa-box {
      border: 2px solid #059669;
      background: #ecfdf5;
      border-radius: 8px;
      padding: 12px 16px;
      text-align: center;
      margin-top: 14px;
    }
  </style>
</head>
<body>

  <!-- Non-Printing Top Navigation Bar -->
  <div class="screen-header-bar no-print">
    <div class="screen-header-title">
      <span>📄 Compêndio de Documentos</span>
      <span class="screen-badge">${totalDocs} Documentos</span>
      <span style="font-size: 12px; color: #94a3b8; font-weight: normal; margin-left: 8px;" class="hidden-mobile">
        ${clinicName}
      </span>
    </div>

    <div class="screen-controls">
      <input 
        type="text" 
        id="docSearchInput" 
        placeholder="🔍 Filtrar procedimentos..." 
        class="screen-search"
        onkeyup="filterDocuments(this.value)"
      />

      <select 
        id="categoryFilterSelect" 
        class="screen-btn-secondary" 
        onchange="filterByCategory(this.value)"
        style="outline: none; cursor: pointer;"
      >
        <option value="ALL">Todas as Categorias</option>
        <option value="POP">POPs</option>
        <option value="TCLE">TCLEs</option>
        <option value="ANAMNESE">Anamneses</option>
        <option value="CONTRATO">Contratos</option>
        <option value="MANUAL">Manuais</option>
        <option value="LGPD">LGPD</option>
      </select>

      <a href="#sumario" class="screen-btn-secondary">
        📑 Sumário
      </a>

      <button onclick="window.print()" class="screen-btn" title="Imprimir todos os documentos ou salvar em PDF">
        🖨️ Imprimir / Salvar PDF
      </button>
    </div>
  </div>

  <div class="a4-container">

    <!-- CAPA OFICIAL DO COMPÊNDIO -->
    <div class="a4-sheet cover-sheet" id="capa">
      <div>
        <div class="cover-header">
          <div style="font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 1.5px;">
            SISTEMA DE GESTÃO DA QUALIDADE, BIOSSEGURANÇA E CONFORMIDADE SANITÁRIA
          </div>
          <div class="cover-main-title">
            ${clinicName}
          </div>
          <div class="cover-sub-title">
            COMPÊNDIO GERAL DE PROCEDIMENTOS OPERACIONAIS PADRÃO (POPs) & BLINDAGEM JURÍDICO-SANITÁRIA
          </div>
        </div>

        <div class="cover-card">
          <div style="font-size: 11px; font-weight: 800; color: #0369a1; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 10px;">
            DADOS CADASTRAIS DO ESTABELECIMENTO DE SAÚDE / ESTÉTICA
          </div>
          <div class="cover-grid">
            <div class="cover-item">
              <strong>Razão Social / Nome Fantasia:</strong>
              ${clinicName}
            </div>
            <div class="cover-item">
              <strong>Cadastro / CNES:</strong>
              ${clinicData.cnes || 'Homologado na VISA'}
            </div>
            <div class="cover-item">
              <strong>Responsável Técnico(a):</strong>
              ${clinicData.responsavel || 'Profissional Habilitado(a)'}
            </div>
            <div class="cover-item">
              <strong>Registro no Conselho de Classe:</strong>
              ${clinicData.registroConselho || 'CRBM / CRM / COREN / CRF Vigente'}
            </div>
            <div class="cover-item">
              <strong>Alvará Sanitário (VISA):</strong>
              ${clinicData.alvara || 'Protocolo / Alvará 2026'}
            </div>
            <div class="cover-item">
              <strong>Endereço Comercial:</strong>
              ${clinicData.endereco || 'Endereço Comercial Completo'} - ${clinicData.cidade || 'Brasil'}
            </div>
            <div class="cover-item">
              <strong>Contato / Telefone:</strong>
              ${clinicData.telefone || clinicData.whatsapp || '(00) 00000-0000'} | ${clinicData.email || 'contato@clinica.com.br'}
            </div>
            <div class="cover-item">
              <strong>Data de Homologação / Vigência:</strong>
              ${emissionDate} (Vigência: 12 Meses)
            </div>
          </div>
        </div>

        <div class="cover-anvisa-box">
          <div style="font-size: 12px; font-weight: 900; color: #065f46; text-transform: uppercase;">
            HOMOLOGAÇÃO REGULATÓRIA & CONFORMIDADE COM A ANVISA E CONSELHOS FEDERAIS
          </div>
          <div style="font-size: 10px; color: #047857; margin-top: 4px; line-height: 1.4;">
            Este compêndio atende integralmente à RDC nº 63/2011 (Boas Práticas de Funcionamento dos Serviços de Saúde), 
            RDC nº 222/2018 (Gerenciamento de Resíduos PGRSS), RDC nº 50/2002 e Leis Federais de Proteção ao Consumidor (CDC) e LGPD (Lei 13.709/2018).
          </div>
        </div>
      </div>

      <div>
        <div style="margin-top: 20px; border-top: 1px dashed #94a3b8; padding-top: 14px; display: flex; justify-content: space-around; text-align: center;">
          <div style="width: 260px;">
            <div style="border-bottom: 1.5px solid #0f172a; height: 40px; margin-bottom: 6px;"></div>
            <div style="font-weight: bold; font-size: 11px; text-transform: uppercase; color: #0f172a;">${clinicData.responsavel || 'Responsável Técnico(a)'}</div>
            <div style="font-size: 9px; color: #475569;">Assinatura do(a) Responsável Técnico(a) / RT</div>
            <div style="font-size: 8px; color: #64748b;">${clinicData.registroConselho || 'Conselho Regional'}</div>
          </div>
          <div style="width: 260px;">
            <div style="border-bottom: 1.5px solid #0f172a; height: 40px; margin-bottom: 6px;"></div>
            <div style="font-weight: bold; font-size: 11px; text-transform: uppercase; color: #0f172a;">Direção Geral / Gestão da Qualidade</div>
            <div style="font-size: 9px; color: #475569;">Homologação Institucional & Auditoria</div>
            <div style="font-size: 8px; color: #64748b;">Data: ${emissionDate}</div>
          </div>
        </div>

        <div class="a4-page-footer" style="margin-top: 16px;">
          <span>Compêndio de Procedimentos Operacionais Padrão &bull; ${clinicName}</span>
          <span class="a4-page-badge">CAPA OFICIAL</span>
          <span>Vigência: 12 meses</span>
        </div>
      </div>
    </div>

    <!-- SUMÁRIO EXECUTIVO (ÍNDICE ANALÍTICO) -->
    <div class="a4-sheet toc-sheet" id="sumario">
      <div>
        <div class="a4-header-main">
          <div>
            <div class="a4-clinic-name">${clinicName}</div>
            <div class="a4-clinic-sub">Índice Analítico e Controle de Documentos Vigentes</div>
          </div>
          <div class="a4-badge-anvisa">TOTAL: ${totalDocs} DOCUMENTOS</div>
        </div>

        <div class="a4-doc-title-box">
          <div class="a4-doc-category">SUMÁRIO EXECUTIVO &bull; CONTROLE MESTRE DE DOCUMENTOS</div>
          <div class="a4-doc-title">RELAÇÃO COMPLETA DE POPS, TCLES, ANAMNESES E CONTRATOS</div>
          <div class="a4-doc-meta">Clique no título do procedimento para navegar instantaneamente até o documento correspondente.</div>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 10px;" id="tocTable">
          <thead>
            <tr style="background: #f1f5f9; text-transform: uppercase; font-size: 9px;">
              <th style="padding: 6px; border: 1px solid #cbd5e1; width: 45px; text-align: center;">Item</th>
              <th style="padding: 6px; border: 1px solid #cbd5e1; width: 90px; text-align: left;">Tipo</th>
              <th style="padding: 6px; border: 1px solid #cbd5e1; text-align: left;">Título do Documento / Procedimento</th>
              <th style="padding: 6px; border: 1px solid #cbd5e1; width: 85px; text-align: center;">Versão</th>
              <th style="padding: 6px; border: 1px solid #cbd5e1; width: 80px; text-align: center;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${tocEntries}
          </tbody>
        </table>
      </div>

      <div>
        <div class="a4-page-footer" style="margin-top: 12px;">
          <span>${clinicName}</span>
          <span class="a4-page-badge">SUMÁRIO GERAL</span>
          <span>Atualizado em: ${emissionDate}</span>
        </div>
      </div>
    </div>

    <!-- TODOS OS DOCUMENTOS RENDERIZADOS EM SEQUÊNCIA -->
    ${renderedAllDocs}

  </div>

  <!-- Vanilla JS Filtering & Navigation Script -->
  <script>
    function filterDocuments(term) {
      var query = (term || '').toLowerCase().trim();
      var docSections = document.querySelectorAll('.doc-container');
      var tocRows = document.querySelectorAll('.toc-row');

      docSections.forEach(function(el) {
        var title = el.getAttribute('data-title') || '';
        var cat = el.getAttribute('data-category') || '';
        if (!query || title.indexOf(query) !== -1 || cat.toLowerCase().indexOf(query) !== -1) {
          el.style.display = 'block';
        } else {
          el.style.display = 'none';
        }
      });

      tocRows.forEach(function(row) {
        var title = row.getAttribute('data-title') || '';
        var cat = row.getAttribute('data-cat') || '';
        if (!query || title.indexOf(query) !== -1 || cat.indexOf(query) !== -1) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    }

    function filterByCategory(cat) {
      var docSections = document.querySelectorAll('.doc-container');
      var tocRows = document.querySelectorAll('.toc-row');
      var selectedCat = (cat || 'ALL').toUpperCase();

      docSections.forEach(function(el) {
        var itemCat = (el.getAttribute('data-category') || '').toUpperCase();
        if (selectedCat === 'ALL' || itemCat.indexOf(selectedCat) !== -1) {
          el.style.display = 'block';
        } else {
          el.style.display = 'none';
        }
      });

      tocRows.forEach(function(row) {
        var itemCat = (row.getAttribute('data-cat') || '').toUpperCase();
        if (selectedCat === 'ALL' || itemCat.indexOf(selectedCat) !== -1) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    }
  </script>
</body>
</html>
`;
}

/**
 * Backwards-compatible alias for buildMultiPageA4Html
 */
export function buildTwoPageA4Html(
  doc: DocumentItem,
  clinicData: ClinicData,
  rawContent: string,
  needsPatientSig: boolean,
  orientation: 'portrait' | 'landscape' = 'portrait'
): string {
  return buildMultiPageA4Html(doc, clinicData, rawContent, needsPatientSig, orientation);
}

