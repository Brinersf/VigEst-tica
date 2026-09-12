import type { IncomingMessage, ServerResponse } from 'http';

interface VercelRequest extends IncomingMessage {
  body?: any;
  query?: { [key: string]: string | string[] };
}

interface VercelResponse extends ServerResponse {
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Kiwify test or healthcheck
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'online',
      service: 'Vercel Kiwify Webhook Listener',
      platform: 'Vercel Serverless'
    });
  }

  if (req.method === 'POST') {
    const rawBody = (typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body) || {};
    const body = rawBody.order || rawBody;
    const orderStatus = body.order_status || body.status || rawBody.order_status || '';
    const customer = body.Customer || body.customer || rawBody.Customer || rawBody.customer || {};
    const email = (customer.email || body.email || rawBody.email || '').toLowerCase().trim();
    const orderId = body.order_id || body.id || rawBody.order_id || 'N/A';

    console.log('[Kiwify Webhook on Vercel] Received order:', {
      orderId,
      orderStatus,
      email,
      customerName: customer.full_name || body.name
    });

    // Kiwify expects a 200 OK response
    return res.status(200).json({
      success: true,
      message: 'Kiwify webhook processed successfully on Vercel',
      received: { orderId, orderStatus, email }
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
