import { DocumentItem } from '../types';

export const CADERNOS_MANUAIS_FINANCEIRO: DocumentItem[] = [
  // ==========================================
  // 1. MTR RESÍDUOS (RDC 222/2018 & SINIR)
  // ==========================================
  {
    id: 'livro-registro-mtr-residuos',
    title: 'Livro de Registro de Manifesto de Transporte de Resíduos (MTR SINIR) e Coleta Externa',
    category: 'Manual',
    stepCategory: '5. Livros de Registro e Cadernos Sanitários',
    version: 'V 8.0 - 30 Linhas Oficiais em Branco (Sem Guia)',
    lastModified: '2025-02-15',
    isEssential: true,
    adaptationNotes: 'Planilha oficial de controle e rastreabilidade de coletas externas de resíduos biológicos (Grupo A) e perfurocortantes (Grupo E), com guia de preenchimento e campos para escrita a caneta.',
    content: `<!-- SINGLE_PAGE -->
<h2>LIVRO DE REGISTRO DE MANIFESTO DE TRANSPORTE DE RESÍDUOS (MTR / SINIR)</h2>
<p style="font-size: 8.5px; color: #475569; margin: 4px 0 8px 0; line-height: 1.3;">
  <strong>Clínica:</strong> {{nome_clinica}}  &bull; <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} &bull; <strong>Alvará:</strong> {{alvara}}<br>
  <strong>Base Legal:</strong> RDC ANVISA nº 222/2018, CONAMA 358/2005 e Portaria MMA nº 280/2020 (SINIR / Manifesto Eletrônico Obrigatório).
</p>

<table style="width: 100%; border-collapse: collapse; font-size: 8.5px; margin-top: 4px;" border="1">
  <thead>
    <tr style="background-color: #f1f5f9; text-align: center; font-weight: bold;">
      <th style="padding: 4px; width: 26px;">Nº</th>
      <th style="padding: 4px; width: 66px;">Data Coleta</th>
      <th style="padding: 4px; width: 85px;">Nº MTR SINIR</th>
      <th style="padding: 4px; width: 62px;">Grupo A (kg)</th>
      <th style="padding: 4px; width: 62px;">Grupo E (kg)</th>
      <th style="padding: 4px;">Empresa Coletora / Licença</th>
      <th style="padding: 4px; width: 85px;">Assinatura Coletor</th>
      <th style="padding: 4px; width: 55px;">Visto RT</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">01</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">02</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">03</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">04</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">05</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">06</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">07</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">08</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">09</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">10</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">11</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">12</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">13</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">14</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">15</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">16</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">17</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">18</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">19</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">20</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">21</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">22</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">23</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">24</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">25</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">26</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">27</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">28</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">29</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">30</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
  </tbody>
</table>

<div style="margin-top: 12px; padding-top: 6px; border-top: 1px dashed #94a3b8; text-align: center;">
  <p style="font-size: 8px; font-weight: bold; text-transform: uppercase; color: #475569; margin-bottom: 6px; letter-spacing: 0.5px;">HOMOLOGAÇÃO DA DESTINAÇÃO FINAL DE RESÍDUOS (PGRSS)</p>
  <div style="display: inline-block; width: 300px; text-align: center;">
    <div style="border-bottom: 1.5px solid #0f172a; height: 22px; margin-bottom: 4px;"></div>
    <div style="font-weight: bold; font-size: 9px; text-transform: uppercase; color: #0f172a;">{{responsavel_tecnico}}</div>
    <div style="font-size: 8px; color: #475569;">Responsável Técnico(a) &bull; {{nome_clinica}}</div>
  </div>
</div>`
  },

  // ==========================================
  // 2. AUTOCLAVE & ESTERILIZAÇÃO (RDC 15/2012)
  // ==========================================
  {
    id: 'caderno-autoclave',
    title: 'Caderno de Registro de Esterilização e Controle de Materiais (RDC 15/2012)',
    category: 'Manual',
    stepCategory: '5. Livros de Registro e Cadernos Sanitários',
    version: 'V 8.0 - 30 Linhas Oficiais em Branco (Sem Guia)',
    lastModified: '2025-02-15',
    isEssential: true,
    adaptationNotes: 'Caderno oficial para monitoramento físico, químico e biológico de autoclave a vapor, com orientações de preenchimento e campos para caneta.',
    content: `<!-- SINGLE_PAGE -->
<h2>CADERNO DE CONTROLE E REGISTRO DE ESTERILIZAÇÃO EM AUTOCLAVE A VAPOR</h2>
<p style="font-size: 8.5px; color: #475569; margin: 4px 0 8px 0; line-height: 1.3;">
  <strong>Clínica:</strong> {{nome_clinica}}  &bull; <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} &bull; <strong>Alvará:</strong> {{alvara}}<br>
  <strong>Base Legal:</strong> RDC ANVISA nº 15/2012 - Monitoramento Físico, Indicadores Químicos (Classe 4/5/6) e Teste Biológico Semanal.
</p>

<table style="width: 100%; border-collapse: collapse; font-size: 8.5px; margin-top: 4px;" border="1">
  <thead>
    <tr style="background-color: #f1f5f9; text-align: center; font-weight: bold;">
      <th style="padding: 4px; width: 26px;">Nº</th>
      <th style="padding: 4px; width: 66px;">Data / Ciclo</th>
      <th style="padding: 4px; width: 75px;">Temp. / Pressão</th>
      <th style="padding: 4px;">Material / Quantidade</th>
      <th style="padding: 4px; width: 68px;">Ind. Químico</th>
      <th style="padding: 4px; width: 68px;">Ind. Biológico</th>
      <th style="padding: 4px; width: 75px;">Operador(a)</th>
      <th style="padding: 4px; width: 50px;">Visto RT</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">01</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">02</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">03</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">04</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">05</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">06</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">07</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">08</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">09</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">10</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">11</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">12</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">13</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">14</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">15</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">16</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">17</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">18</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">19</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">20</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">21</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">22</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">23</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">24</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">25</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">26</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">27</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">28</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">29</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">30</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
  </tbody>
</table>

<div style="margin-top: 12px; padding-top: 6px; border-top: 1px dashed #94a3b8; text-align: center;">
  <p style="font-size: 8px; font-weight: bold; text-transform: uppercase; color: #475569; margin-bottom: 6px; letter-spacing: 0.5px;">HOMOLOGAÇÃO DE BIOSSEGURANÇA E ESTERILIZAÇÃO (CME)</p>
  <div style="display: inline-block; width: 300px; text-align: center;">
    <div style="border-bottom: 1.5px solid #0f172a; height: 22px; margin-bottom: 4px;"></div>
    <div style="font-weight: bold; font-size: 9px; text-transform: uppercase; color: #0f172a;">{{responsavel_tecnico}}</div>
    <div style="font-size: 8px; color: #475569;">Responsável Técnico(a) &bull; {{nome_clinica}}</div>
  </div>
</div>`
  },

  // ==========================================
  // 3. TEMPERATURA DE GELADEIRA (CADEIA DE FRIO)
  // ==========================================
  {
    id: 'caderno-temperatura-geladeira',
    title: 'Caderno de Registro de Temperatura do Frigobar / Geladeira de Toxina Botulínica e Injetáveis (+2°C a +8°C)',
    category: 'Manual',
    stepCategory: '5. Livros de Registro e Cadernos Sanitários',
    version: 'V 8.0 - 30 Linhas Oficiais em Branco (Sem Guia)',
    lastModified: '2025-02-15',
    isEssential: true,
    adaptationNotes: 'Planilha diária de controle térmico da geladeira clínica para toxinas e produtos termolábeis, com faixas de segurança e escrita a caneta.',
    content: `<!-- SINGLE_PAGE -->
<h2>CADERNO DE CONTROLE DIÁRIO DE TEMPERATURA DE GELADEIRA (+2°C A +8°C)</h2>
<p style="font-size: 8.5px; color: #475569; margin: 4px 0 8px 0; line-height: 1.3;">
  <strong>Clínica:</strong> {{nome_clinica}}  &bull; <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} &bull; <strong>Alvará:</strong> {{alvara}}<br>
  <strong>Base Legal:</strong> RDC ANVISA nº 63/2011 e RDC nº 430/2020 - Controle de Cadeia de Frio para Toxina Botulínica e Fatores de Crescimento.
</p>

<table style="width: 100%; border-collapse: collapse; font-size: 8px; margin-top: 4px;" border="1">
  <thead>
    <tr style="background-color: #f1f5f9; text-align: center; font-weight: bold;">
      <th rowspan="2" style="padding: 3px; width: 32px;">Dia</th>
      <th colspan="4" style="padding: 3px; background-color: #e0f2fe;">TURNO DA MANHÃ (08h - 09h)</th>
      <th colspan="4" style="padding: 3px; background-color: #fef3c7;">TURNO DA TARDE (17h - 18h)</th>
      <th rowspan="2" style="padding: 3px; width: 65px;">Ações / Visto RT</th>
    </tr>
    <tr style="background-color: #f8fafc; text-align: center;">
      <th style="padding: 3px; width: 44px;">Hora</th>
      <th style="padding: 3px; width: 44px;">Atual</th>
      <th style="padding: 3px; width: 44px;">Mín.</th>
      <th style="padding: 3px; width: 44px;">Máx.</th>
      <th style="padding: 3px; width: 44px;">Hora</th>
      <th style="padding: 3px; width: 44px;">Atual</th>
      <th style="padding: 3px; width: 44px;">Mín.</th>
      <th style="padding: 3px; width: 44px;">Máx.</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 01</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 02</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 03</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 04</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 05</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 06</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 07</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 08</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 09</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 10</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 11</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 12</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 13</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 14</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 15</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 16</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 17</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 18</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 19</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 20</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 21</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 22</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 23</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 24</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 25</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 26</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 27</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 28</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 29</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">Dia 30</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
  </tbody>
</table>

<div style="margin-top: 10px; padding-top: 6px; border-top: 1px dashed #94a3b8; text-align: center;">
  <p style="font-size: 8px; font-weight: bold; text-transform: uppercase; color: #475569; margin-bottom: 6px; letter-spacing: 0.5px;">HOMOLOGAÇÃO DE CONTROLE DE CADEIA DE FRIO E TERMOLÁBEIS</p>
  <div style="display: inline-block; width: 300px; text-align: center;">
    <div style="border-bottom: 1.5px solid #0f172a; height: 22px; margin-bottom: 4px;"></div>
    <div style="font-weight: bold; font-size: 9px; text-transform: uppercase; color: #0f172a;">{{responsavel_tecnico}}</div>
    <div style="font-size: 8px; color: #475569;">Responsável Técnico(a) &bull; {{nome_clinica}}</div>
  </div>
</div>`
  },

  // ==========================================
  // 4. PMOC AR-CONDICIONADO (LEI 13.589/2018)
  // ==========================================
  {
    id: 'caderno-ar-condicionado-pmoc',
    title: 'Caderno de Controle de Manutenção, Limpeza de Filtros e Higienização de Ar-Condicionado (PMOC)',
    category: 'Manual',
    stepCategory: '5. Livros de Registro e Cadernos Sanitários',
    version: 'V 8.0 - 30 Linhas Oficiais em Branco (Sem Guia)',
    lastModified: '2025-02-15',
    isEssential: true,
    adaptationNotes: 'Planilha de controle periódico de limpeza de filtros de poeira e desinfecção de bandejas/serpentinas com campos para caneta.',
    content: `<!-- SINGLE_PAGE -->
<h2>CADERNO DE CONTROLE E HIGIENIZAÇÃO DE AR-CONDICIONADO (PMOC)</h2>
<p style="font-size: 8.5px; color: #475569; margin: 4px 0 8px 0; line-height: 1.3;">
  <strong>Clínica:</strong> {{nome_clinica}}  &bull; <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} &bull; <strong>Alvará:</strong> {{alvara}}<br>
  <strong>Base Legal:</strong> Lei Federal nº 13.589/2018 e Resolução ANVISA RE nº 09/2003 - Plano de Manutenção, Operação e Controle de Climatização.
</p>

<table style="width: 100%; border-collapse: collapse; font-size: 8.5px; margin-top: 4px;" border="1">
  <thead>
    <tr style="background-color: #f1f5f9; text-align: center; font-weight: bold;">
      <th style="padding: 4px; width: 26px;">Nº</th>
      <th style="padding: 4px; width: 66px;">Data Serviço</th>
      <th style="padding: 4px; width: 95px;">Ambiente / Setor</th>
      <th style="padding: 4px; width: 85px;">Tipo de Serviço</th>
      <th style="padding: 4px;">Produto / Saneante Utilizado</th>
      <th style="padding: 4px; width: 85px;">Responsável</th>
      <th style="padding: 4px; width: 50px;">Visto RT</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">01</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">02</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">03</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">04</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">05</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">06</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">07</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">08</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">09</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">10</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">11</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">12</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">13</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">14</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">15</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">16</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">17</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">18</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">19</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">20</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">21</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">22</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">23</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">24</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">25</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">26</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">27</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">28</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">29</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">30</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
  </tbody>
</table>

<div style="margin-top: 12px; padding-top: 6px; border-top: 1px dashed #94a3b8; text-align: center;">
  <p style="font-size: 8px; font-weight: bold; text-transform: uppercase; color: #475569; margin-bottom: 6px; letter-spacing: 0.5px;">HOMOLOGAÇÃO DA QUALIDADE DO AR INTERIOR (PMOC)</p>
  <div style="display: inline-block; width: 300px; text-align: center;">
    <div style="border-bottom: 1.5px solid #0f172a; height: 22px; margin-bottom: 4px;"></div>
    <div style="font-weight: bold; font-size: 9px; text-transform: uppercase; color: #0f172a;">{{responsavel_tecnico}}</div>
    <div style="font-size: 8px; color: #475569;">Responsável Técnico(a) &bull; {{nome_clinica}}</div>
  </div>
</div>`
  },

  // ==========================================
  // 5. LIMPEZA DE CAIXA D'ÁGUA (PORTARIA 888/2021)
  // ==========================================
  {
    id: 'caderno-limpeza-caixa-dagua',
    title: "Caderno de Registro de Limpeza e Desinfecção Semestral do Reservatório de Água (Caixa d'Água e Filtros)",
    category: 'Manual',
    stepCategory: '5. Livros de Registro e Cadernos Sanitários',
    version: 'V 8.0 - 30 Linhas Oficiais em Branco (Sem Guia)',
    lastModified: '2025-02-15',
    isEssential: true,
    adaptationNotes: 'Planilha semestral de desinfecção da caixa dágua com registro de hipoclorito de sódio, laudo de potabilidade e campos para caneta.',
    content: `<!-- SINGLE_PAGE -->
<h2>CADERNO DE CONTROLE E HIGIENIZAÇÃO DO RESERVATÓRIO DE ÁGUA</h2>
<p style="font-size: 8.5px; color: #475569; margin: 4px 0 8px 0; line-height: 1.3;">
  <strong>Clínica:</strong> {{nome_clinica}}  &bull; <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} &bull; <strong>Alvará:</strong> {{alvara}}<br>
  <strong>Base Legal:</strong> Portaria GM/MS nº 888/2021 e RDC ANVISA nº 63/2011 - Padrão de Potabilidade e Desinfecção Semestral Obrigatória.
</p>

<table style="width: 100%; border-collapse: collapse; font-size: 8.5px; margin-top: 4px;" border="1">
  <thead>
    <tr style="background-color: #f1f5f9; text-align: center; font-weight: bold;">
      <th style="padding: 4px; width: 26px;">Nº</th>
      <th style="padding: 4px; width: 68px;">Data Execução</th>
      <th style="padding: 4px; width: 68px;">Próxima Data</th>
      <th style="padding: 4px; width: 75px;">Volume (L)</th>
      <th style="padding: 4px;">Empresa Especializada / Executor</th>
      <th style="padding: 4px; width: 95px;">Nº Certificado / Laudo</th>
      <th style="padding: 4px; width: 50px;">Visto RT</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">01</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">02</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">03</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">04</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">05</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">06</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">07</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">08</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">09</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">10</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">11</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">12</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">13</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">14</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">15</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">16</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">17</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">18</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">19</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">20</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">21</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">22</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">23</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">24</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">25</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">26</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">27</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">28</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">29</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">30</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
  </tbody>
</table>

<div style="margin-top: 12px; padding-top: 6px; border-top: 1px dashed #94a3b8; text-align: center;">
  <p style="font-size: 8px; font-weight: bold; text-transform: uppercase; color: #475569; margin-bottom: 6px; letter-spacing: 0.5px;">HOMOLOGAÇÃO DA POTABILIDADE E RESERVA HÍDRICA</p>
  <div style="display: inline-block; width: 300px; text-align: center;">
    <div style="border-bottom: 1.5px solid #0f172a; height: 22px; margin-bottom: 4px;"></div>
    <div style="font-weight: bold; font-size: 9px; text-transform: uppercase; color: #0f172a;">{{responsavel_tecnico}}</div>
    <div style="font-size: 8px; color: #475569;">Responsável Técnico(a) &bull; {{nome_clinica}}</div>
  </div>
</div>`
  },

  // ==========================================
  // 6. VALIDADE DE INSUMOS & RASTREABILIDADE (PEPS/FEFO)
  // ==========================================
  {
    id: 'caderno-controle-validade-insumos',
    title: 'Caderno de Controle de Validade, Lote e Rastreabilidade de Cosméticos, Medicamentos e Insumos (PEPS/FEFO)',
    category: 'Manual',
    stepCategory: '5. Livros de Registro e Cadernos Sanitários',
    version: 'V 8.0 - 30 Linhas Oficiais em Branco (Sem Guia)',
    lastModified: '2025-02-15',
    isEssential: true,
    adaptationNotes: 'Planilha de rastreabilidade PEPS (Primeiro que Expira, Primeiro que Sai) para injetáveis, anestésicos, toxinas e dermocosméticos com campos para caneta.',
    content: `<!-- SINGLE_PAGE -->
<h2>CADERNO DE CONTROLE DE VALIDADE, LOTE E RASTREABILIDADE (PEPS / FEFO)</h2>
<p style="font-size: 8.5px; color: #475569; margin: 4px 0 8px 0; line-height: 1.3;">
  <strong>Clínica:</strong> {{nome_clinica}}  &bull; <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} &bull; <strong>Alvará:</strong> {{alvara}}<br>
  <strong>Base Legal:</strong> RDC ANVISA nº 63/2011 - Rastreabilidade Farmacêutica e Regra PEPS (Primeiro que Vence é o Primeiro que Sai).
</p>

<table style="width: 100%; border-collapse: collapse; font-size: 8px; margin-top: 4px;" border="1">
  <thead>
    <tr style="background-color: #f1f5f9; text-align: center; font-weight: bold;">
      <th style="padding: 4px; width: 24px;">Nº</th>
      <th style="padding: 4px; width: 55px;">Entrada</th>
      <th style="padding: 4px;">Produto / Princípio Ativo</th>
      <th style="padding: 4px; width: 60px;">Lote Fabr.</th>
      <th style="padding: 4px; width: 75px;">Reg. ANVISA</th>
      <th style="padding: 4px; width: 55px;">Val. Lacrado</th>
      <th style="padding: 4px; width: 55px;">Val. Aberto</th>
      <th style="padding: 4px; width: 35px;">Qtd</th>
      <th style="padding: 4px; width: 45px;">Visto</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">01</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">02</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">03</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">04</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">05</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">06</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">07</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">08</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">09</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">10</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">11</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">12</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">13</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">14</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">15</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">16</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">17</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">18</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">19</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">20</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">21</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">22</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">23</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">24</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">25</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">26</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">27</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">28</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">29</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">30</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
  </tbody>
</table>

<div style="margin-top: 12px; padding-top: 6px; border-top: 1px dashed #94a3b8; text-align: center;">
  <p style="font-size: 8px; font-weight: bold; text-transform: uppercase; color: #475569; margin-bottom: 6px; letter-spacing: 0.5px;">HOMOLOGAÇÃO DE CONTROLE DE ESTOQUE FARMACÊUTICO E VALIDADE</p>
  <div style="display: inline-block; width: 300px; text-align: center;">
    <div style="border-bottom: 1.5px solid #0f172a; height: 22px; margin-bottom: 4px;"></div>
    <div style="font-weight: bold; font-size: 9px; text-transform: uppercase; color: #0f172a;">{{responsavel_tecnico}}</div>
    <div style="font-size: 8px; color: #475569;">Responsável Técnico(a) &bull; {{nome_clinica}}</div>
  </div>
</div>`
  },

  // ==========================================
  // 7. VACINAÇÃO DA EQUIPE & ASO (NR-32)
  // ==========================================
  {
    id: 'ficha-vacinacao-equipe',
    title: 'Ficha de Registro e Comprovante de Vacinação Ocupacional da Equipe e ASO (NR-32 & PCMSO)',
    category: 'Manual',
    stepCategory: '5. Livros de Registro e Cadernos Sanitários',
    version: 'V 8.0 - 30 Linhas Oficiais em Branco (Sem Guia)',
    lastModified: '2025-02-15',
    isEssential: true,
    adaptationNotes: 'Ficha oficial de controle de imunização da equipe (Hepatite B, dT, Tríplice Viral, Covid-19) e ASO anual com campos para caneta.',
    content: `<!-- SINGLE_PAGE -->
<h2>FICHA DE CONTROLE DE VACINAÇÃO DA EQUIPE E SAÚDE OCUPACIONAL (NR-32)</h2>
<p style="font-size: 8.5px; color: #475569; margin: 4px 0 8px 0; line-height: 1.3;">
  <strong>Clínica:</strong> {{nome_clinica}}  &bull; <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} &bull; <strong>Alvará:</strong> {{alvara}}<br>
  <strong>Base Legal:</strong> Norma Regulamentadora NR-32 do MTE e RDC ANVISA nº 63/2011 - Imunização Compulsória dos Profissionais de Saúde.
</p>

<table style="width: 100%; border-collapse: collapse; font-size: 8px; margin-top: 4px;" border="1">
  <thead>
    <tr style="background-color: #f1f5f9; text-align: center; font-weight: bold;">
      <th style="padding: 4px; width: 24px;">Nº</th>
      <th style="padding: 4px;">Nome do Colaborador</th>
      <th style="padding: 4px; width: 70px;">Função / Conselho</th>
      <th style="padding: 4px; width: 68px;">Hepatite B (3d)</th>
      <th style="padding: 4px; width: 65px;">Anti-HBs Sorol.</th>
      <th style="padding: 4px; width: 55px;">dT Tétano</th>
      <th style="padding: 4px; width: 55px;">Tríplice V.</th>
      <th style="padding: 4px; width: 60px;">ASO Vigente</th>
      <th style="padding: 4px; width: 45px;">Visto</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">01</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">02</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">03</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">04</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">05</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">06</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">07</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">08</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">09</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">10</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">11</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">12</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">13</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">14</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">15</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">16</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">17</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">18</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">19</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">20</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">21</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">22</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">23</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">24</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">25</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">26</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">27</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">28</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">29</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">30</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
  </tbody>
</table>

<div style="margin-top: 12px; padding-top: 6px; border-top: 1px dashed #94a3b8; text-align: center;">
  <p style="font-size: 8px; font-weight: bold; text-transform: uppercase; color: #475569; margin-bottom: 6px; letter-spacing: 0.5px;">HOMOLOGAÇÃO DA SAÚDE OCUPACIONAL E IMUNIZAÇÃO</p>
  <div style="display: inline-block; width: 300px; text-align: center;">
    <div style="border-bottom: 1.5px solid #0f172a; height: 22px; margin-bottom: 4px;"></div>
    <div style="font-weight: bold; font-size: 9px; text-transform: uppercase; color: #0f172a;">{{responsavel_tecnico}}</div>
    <div style="font-size: 8px; color: #475569;">Responsável Técnico(a) &bull; {{nome_clinica}}</div>
  </div>
</div>`
  },

  // ==========================================
  // 8. LIMPEZA DE AMBIENTES (RDC 63/2011)
  // ==========================================
  {
    id: 'caderno-limpeza-ambientes',
    title: 'Planilha de Registro de Limpeza Concorrente e Limpeza Terminal de Salas e DML (RDC 63/2011)',
    category: 'Manual',
    stepCategory: '5. Livros de Registro e Cadernos Sanitários',
    version: 'V 8.0 - 30 Linhas Oficiais em Branco (Sem Guia)',
    lastModified: '2025-02-15',
    isEssential: true,
    adaptationNotes: 'Planilha de controle diário de limpeza concorrente (entre pacientes) e terminal (fim do expediente) com campos para caneta.',
    content: `<!-- SINGLE_PAGE -->
<h2>PLANILHA DE REGISTRO DE LIMPEZA CONCORRENTE E TERMINAL</h2>
<p style="font-size: 8.5px; color: #475569; margin: 4px 0 8px 0; line-height: 1.3;">
  <strong>Clínica:</strong> {{nome_clinica}}  &bull; <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} &bull; <strong>Alvará:</strong> {{alvara}}<br>
  <strong>Base Legal:</strong> RDC ANVISA nº 63/2011 - Higienização e Desinfecção de Superfícies em Serviços de Saúde.
</p>

<table style="width: 100%; border-collapse: collapse; font-size: 8.5px; margin-top: 4px;" border="1">
  <thead>
    <tr style="background-color: #f1f5f9; text-align: center; font-weight: bold;">
      <th style="padding: 4px; width: 26px;">Nº</th>
      <th style="padding: 4px; width: 62px;">Data</th>
      <th style="padding: 4px; width: 90px;">Setor / Sala</th>
      <th style="padding: 4px; width: 80px;">Tipo Limpeza</th>
      <th style="padding: 4px;">Produto / Saneante Aplicado</th>
      <th style="padding: 4px; width: 90px;">Executor(a)</th>
      <th style="padding: 4px; width: 50px;">Visto RT</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">01</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">02</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">03</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">04</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">05</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">06</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">07</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">08</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">09</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">10</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">11</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">12</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">13</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">14</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">15</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">16</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">17</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">18</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">19</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">20</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">21</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">22</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">23</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">24</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">25</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">26</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">27</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">28</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">29</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">30</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
  </tbody>
</table>

<div style="margin-top: 12px; padding-top: 6px; border-top: 1px dashed #94a3b8; text-align: center;">
  <p style="font-size: 8px; font-weight: bold; text-transform: uppercase; color: #475569; margin-bottom: 6px; letter-spacing: 0.5px;">HOMOLOGAÇÃO DA HIGIENE E DESINFECÇÃO AMBIENTAL</p>
  <div style="display: inline-block; width: 300px; text-align: center;">
    <div style="border-bottom: 1.5px solid #0f172a; height: 22px; margin-bottom: 4px;"></div>
    <div style="font-weight: bold; font-size: 9px; text-transform: uppercase; color: #0f172a;">{{responsavel_tecnico}}</div>
    <div style="font-size: 8px; color: #475569;">Responsável Técnico(a) &bull; {{nome_clinica}}</div>
  </div>
</div>`
  },

  // ==========================================
  // 9. MANUTENÇÃO & CALIBRAÇÃO DE EQUIPAMENTOS (RDC 63/2011)
  // ==========================================
  {
    id: 'caderno-manutencao-equipamentos',
    title: 'Ficha de Registro de Calibração, Manutenção Preventiva e Certificados de Equipamentos Eletromédicos (Laser, Ultrassom, Radiofrequência)',
    category: 'Manual',
    stepCategory: '5. Livros de Registro e Cadernos Sanitários',
    version: 'V 8.0 - 30 Linhas Oficiais em Branco (Sem Guia)',
    lastModified: '2025-02-15',
    isEssential: true,
    adaptationNotes: 'Ficha de controle de manutenção preventiva, calibração anual e conformidade técnica dos equipamentos com campos para caneta.',
    content: `<!-- SINGLE_PAGE -->
<h2>FICHA DE CONTROLE DE CALIBRAÇÃO E CERTIFICADOS DE EQUIPAMENTOS</h2>
<p style="font-size: 8.5px; color: #475569; margin: 4px 0 8px 0; line-height: 1.3;">
  <strong>Clínica:</strong> {{nome_clinica}}  &bull; <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} &bull; <strong>Alvará:</strong> {{alvara}}<br>
  <strong>Base Legal:</strong> RDC ANVISA nº 63/2011 e NBR IEC 60601 - Calibração Metrológica e Segurança Elétrica de Eletromédicos.
</p>

<table style="width: 100%; border-collapse: collapse; font-size: 8px; margin-top: 4px;" border="1">
  <thead>
    <tr style="background-color: #f1f5f9; text-align: center; font-weight: bold;">
      <th style="padding: 4px; width: 24px;">Nº</th>
      <th style="padding: 4px;">Equipamento / Modelo</th>
      <th style="padding: 4px; width: 70px;">Nº Série</th>
      <th style="padding: 4px; width: 75px;">Reg. ANVISA</th>
      <th style="padding: 4px; width: 62px;">Última Calib.</th>
      <th style="padding: 4px; width: 62px;">Próxima Calib.</th>
      <th style="padding: 4px;">Empresa Certificadora / Laudo</th>
      <th style="padding: 4px; width: 45px;">Visto</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">01</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">02</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">03</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">04</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">05</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">06</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">07</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">08</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">09</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">10</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">11</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">12</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">13</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">14</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">15</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">16</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">17</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">18</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">19</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">20</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">21</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">22</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">23</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">24</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">25</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">26</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">27</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">28</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">29</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">30</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
  </tbody>
</table>

<div style="margin-top: 12px; padding-top: 6px; border-top: 1px dashed #94a3b8; text-align: center;">
  <p style="font-size: 8px; font-weight: bold; text-transform: uppercase; color: #475569; margin-bottom: 6px; letter-spacing: 0.5px;">HOMOLOGAÇÃO DE CALIBRAÇÃO E MANUTENÇÃO TECNOLÓGICA</p>
  <div style="display: inline-block; width: 300px; text-align: center;">
    <div style="border-bottom: 1.5px solid #0f172a; height: 22px; margin-bottom: 4px;"></div>
    <div style="font-weight: bold; font-size: 9px; text-transform: uppercase; color: #0f172a;">{{responsavel_tecnico}}</div>
    <div style="font-size: 8px; color: #475569;">Responsável Técnico(a) &bull; {{nome_clinica}}</div>
  </div>
</div>`
  },

  // ==========================================
  // 10. TREINAMENTOS & EDUCAÇÃO CONTINUADA (NR-32 & RDC 63)
  // ==========================================
  {
    id: 'caderno-treinamentos-capacitacao',
    title: 'Livro de Registro de Treinamentos, Integração e Educação Continuada da Equipe (Biossegurança, POPs & PGRSS)',
    category: 'Manual',
    stepCategory: '5. Livros de Registro e Cadernos Sanitários',
    version: 'V 8.0 - 30 Linhas Oficiais em Branco (Sem Guia)',
    lastModified: '2025-02-15',
    isEssential: true,
    adaptationNotes: 'Planilha de registro de treinamentos admissionais de 8h e reciclagens semestrais com lista de presença e campos para caneta.',
    content: `<!-- SINGLE_PAGE -->
<h2>LIVRO DE REGISTRO DE TREINAMENTO E EDUCAÇÃO CONTINUADA</h2>
<p style="font-size: 8.5px; color: #475569; margin: 4px 0 8px 0; line-height: 1.3;">
  <strong>Clínica:</strong> {{nome_clinica}}  &bull; <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} &bull; <strong>Alvará:</strong> {{alvara}}<br>
  <strong>Base Legal:</strong> RDC ANVISA nº 63/2011 e NR-32 - Capacitação Admissional (8h) e Educação Continuada Semestral da Equipe.
</p>

<table style="width: 100%; border-collapse: collapse; font-size: 8.5px; margin-top: 4px;" border="1">
  <thead>
    <tr style="background-color: #f1f5f9; text-align: center; font-weight: bold;">
      <th style="padding: 4px; width: 26px;">Nº</th>
      <th style="padding: 4px; width: 62px;">Data</th>
      <th style="padding: 4px;">Tema / Módulo Ministrado</th>
      <th style="padding: 4px; width: 45px;">Carga</th>
      <th style="padding: 4px; width: 110px;">Instrutor(a)</th>
      <th style="padding: 4px; width: 110px;">Assinatura Colaborador</th>
      <th style="padding: 4px; width: 45px;">Visto</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">01</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">02</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">03</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">04</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">05</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">06</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">07</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">08</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">09</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">10</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">11</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">12</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">13</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">14</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">15</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">16</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">17</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">18</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">19</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">20</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">21</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">22</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">23</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">24</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">25</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">26</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">27</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">28</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">29</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">30</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
  </tbody>
</table>

<div style="margin-top: 12px; padding-top: 6px; border-top: 1px dashed #94a3b8; text-align: center;">
  <p style="font-size: 8px; font-weight: bold; text-transform: uppercase; color: #475569; margin-bottom: 6px; letter-spacing: 0.5px;">HOMOLOGAÇÃO DE CAPACITAÇÃO E EDUCAÇÃO CONTINUADA</p>
  <div style="display: inline-block; width: 300px; text-align: center;">
    <div style="border-bottom: 1.5px solid #0f172a; height: 22px; margin-bottom: 4px;"></div>
    <div style="font-weight: bold; font-size: 9px; text-transform: uppercase; color: #0f172a;">{{responsavel_tecnico}}</div>
    <div style="font-size: 8px; color: #475569;">Responsável Técnico(a) &bull; {{nome_clinica}}</div>
  </div>
</div>`
  },

  // ==========================================
  // 11. CONTROLE DE PRAGAS E DESINSETIZAÇÃO (RDC 52/2009)
  // ==========================================
  {
    id: 'caderno-pragas-desratizacao',
    title: 'Caderno de Registro de Controle Integrado de Pragas, Desinsetização e Desratização (RDC 52/2009)',
    category: 'Manual',
    stepCategory: '5. Livros de Registro e Cadernos Sanitários',
    version: 'V 8.0 - 30 Linhas Oficiais em Branco (Sem Guia)',
    lastModified: '2025-02-15',
    isEssential: true,
    adaptationNotes: 'Controle trimestral e semestral de dedetização com registro de princípios ativos, empresa especializada e campos para caneta.',
    content: `<!-- SINGLE_PAGE -->
<h2>CADERNO DE CONTROLE INTEGRADO DE VETORES E PRAGAS URBANAS</h2>
<p style="font-size: 8.5px; color: #475569; margin: 4px 0 8px 0; line-height: 1.3;">
  <strong>Clínica:</strong> {{nome_clinica}}  &bull; <strong>Resp. Técnico:</strong> {{responsavel_tecnico}} &bull; <strong>Alvará:</strong> {{alvara}}<br>
  <strong>Base Legal:</strong> RDC ANVISA nº 52/2009 - Emergência Toxicológica CIATox: 0800 722 6001. Controle Químico Especializado.
</p>

<table style="width: 100%; border-collapse: collapse; font-size: 8.5px; margin-top: 4px;" border="1">
  <thead>
    <tr style="background-color: #f1f5f9; text-align: center; font-weight: bold;">
      <th style="padding: 4px; width: 26px;">Nº</th>
      <th style="padding: 4px; width: 68px;">Data Aplicação</th>
      <th style="padding: 4px; width: 85px;">Pragas-Alvo</th>
      <th style="padding: 4px;">Princípio Ativo / Registro MS</th>
      <th style="padding: 4px;">Empresa Especializada / Licença</th>
      <th style="padding: 4px; width: 65px;">Próx. Aplicação</th>
      <th style="padding: 4px; width: 45px;">Visto</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">01</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">02</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">03</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">04</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">05</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">06</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">07</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">08</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">09</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">10</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">11</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">12</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">13</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">14</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">15</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">16</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">17</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">18</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">19</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">20</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">21</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">22</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">23</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">24</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">25</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">26</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">27</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">28</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">29</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
      <td style="height: 18px; padding: 2px 3px; text-align: center; font-weight: bold;">30</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
      <td style="height: 18px; padding: 2px 3px; text-align: center;">&nbsp;</td>
    </tr>
  </tbody>
</table>

<div style="margin-top: 12px; padding-top: 6px; border-top: 1px dashed #94a3b8; text-align: center;">
  <p style="font-size: 8px; font-weight: bold; text-transform: uppercase; color: #475569; margin-bottom: 6px; letter-spacing: 0.5px;">HOMOLOGAÇÃO DE CONTROLE DE PRAGAS E VETORES</p>
  <div style="display: inline-block; width: 300px; text-align: center;">
    <div style="border-bottom: 1.5px solid #0f172a; height: 22px; margin-bottom: 4px;"></div>
    <div style="font-weight: bold; font-size: 9px; text-transform: uppercase; color: #0f172a;">{{responsavel_tecnico}}</div>
    <div style="font-size: 8px; color: #475569;">Responsável Técnico(a) &bull; {{nome_clinica}}</div>
  </div>
</div>`
  }
];
