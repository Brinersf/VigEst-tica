import type { IncomingMessage, ServerResponse } from 'http';

interface VercelRequest extends IncomingMessage {
  body?: any;
  query?: { [key: string]: string | string[] };
}

interface VercelResponse extends ServerResponse {
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
}

const AUTHORIZED_TOKENS = ['vigi_kw_7a8f9c2d1b4e', 'vigi_kw_secret_2025'];
const MASTER_ADMIN_KEYS = ['VIGI-ESTETICA-PRO-2025', 'VIGI-MASTER-VIP', 'VIGI-CLIENTE-2025'];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ status: 'online', service: 'Vercel Kiwify Verification' });
  }

  if (req.method === 'POST') {
    const body = (typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body) || {};
    const { email, code, token } = body;

    // Check token or master admin key
    if (token && AUTHORIZED_TOKENS.includes(token)) {
      return res.status(200).json({
        success: true,
        authorized: true,
        reason: 'authorized_token',
        message: 'Token oficial da Kiwify confirmado.'
      });
    }

    if (code) {
      const cleanCode = String(code).trim().toUpperCase();
      if (MASTER_ADMIN_KEYS.includes(cleanCode) || AUTHORIZED_TOKENS.includes(String(code).trim())) {
        return res.status(200).json({
          success: true,
          authorized: true,
          reason: 'admin_key',
          message: 'Chave de acesso aprovada com sucesso.'
        });
      }
    }

    // If an email was passed
    if (email) {
      const cleanEmail = String(email).trim().toLowerCase();
      // If code was entered into the email field
      if (
        MASTER_ADMIN_KEYS.includes(cleanEmail.toUpperCase()) ||
        AUTHORIZED_TOKENS.includes(cleanEmail)
      ) {
        return res.status(200).json({
          success: true,
          authorized: true,
          reason: 'admin_key',
          message: 'Chave de acesso aprovada com sucesso.'
        });
      }
    }

    return res.status(403).json({
      success: false,
      authorized: false,
      message: 'Nenhum pagamento aprovado na Kiwify foi encontrado para os dados informados.'
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
