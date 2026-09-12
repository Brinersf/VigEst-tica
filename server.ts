import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory store for dynamic token override if configured via UI
let dynamicAccessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN || process.env.MP_ACCESS_TOKEN || "";
const paidTransactions = new Map<string, any>();

function getAccessToken(reqToken?: string): string {
  if (reqToken && reqToken.trim().length > 5) return reqToken.trim();
  if (dynamicAccessToken && dynamicAccessToken.trim().length > 5) return dynamicAccessToken.trim();
  return process.env.MERCADO_PAGO_ACCESS_TOKEN || process.env.MP_ACCESS_TOKEN || "";
}

// API Routes
app.get("/api/health", (req, res) => {
  const token = getAccessToken();
  res.json({
    status: "ok",
    mercadoPagoConfigured: Boolean(token && token.length > 10 && !token.includes("MY_")),
    hasEnvToken: Boolean(process.env.MERCADO_PAGO_ACCESS_TOKEN || process.env.MP_ACCESS_TOKEN),
  });
});

// Configure Mercado Pago Token
app.post("/api/mercadopago/config", (req, res) => {
  const { accessToken } = req.body;
  if (accessToken !== undefined) {
    dynamicAccessToken = accessToken;
  }
  const currentToken = getAccessToken();
  res.json({
    success: true,
    isConfigured: Boolean(currentToken && currentToken.length > 10 && !currentToken.includes("MY_")),
    maskedToken: currentToken ? `${currentToken.slice(0, 8)}...${currentToken.slice(-4)}` : null,
  });
});

// Create Pix Payment Endpoint
app.post("/api/mercadopago/create-pix", async (req, res) => {
  try {
    const { email, nomeClinica, whatsapp, plan, token } = req.body;
    const amount = plan === "essencial" ? 97 : 197;
    const mpToken = getAccessToken(token);

    if (!mpToken || mpToken.includes("MY_")) {
      // Fallback demo payment for instant testing if no real token is configured yet
      const demoId = `DEMO-MP-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      const demoPayload = {
        success: true,
        isDemo: true,
        paymentId: demoId,
        amount,
        status: "pending",
        message: "Mercado Pago em modo demonstração. Configure sua Access Token para receber pagamentos reais.",
      };
      paidTransactions.set(demoId, { ...demoPayload, plan, nomeClinica, email, whatsapp, createdAt: new Date() });
      return res.json(demoPayload);
    }

    const payload = {
      transaction_amount: Number(amount),
      description: `VigiEstética ${plan === 'essencial' ? 'Plano Essencial' : 'Plano Blindado'} - ${nomeClinica || 'Clínica Estética'}`,
      payment_method_id: "pix",
      payer: {
        email: email || "contato@suaclinica.com.br",
        first_name: (nomeClinica || "Clinica").slice(0, 25),
        identification: {
          type: "CPF",
          number: "27997393920",
        },
      },
      notification_url: `${process.env.APP_URL || "https://ais-dev-xzgd6lhxaowxc5a4cj52aa-336848290887.us-west1.run.app"}/api/mercadopago/webhook`,
      metadata: {
        whatsapp,
        plan,
        nomeClinica,
      },
    };

    const mpResponse = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${mpToken}`,
        "X-Idempotency-Key": `VIGI-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await mpResponse.json();

    if (!mpResponse.ok) {
      console.error("Mercado Pago API Error:", data);
      return res.status(400).json({
        success: false,
        error: data.message || "Erro ao gerar PIX no Mercado Pago",
        details: data.cause || data,
      });
    }

    const pointOfInteraction = data.point_of_interaction || {};
    const transactionData = pointOfInteraction.transaction_data || {};

    const responseData = {
      success: true,
      isDemo: false,
      paymentId: String(data.id),
      status: data.status,
      statusDetail: data.status_detail,
      amount: data.transaction_amount,
      qrCode: transactionData.qr_code,
      qrCodeBase64: transactionData.qr_code_base64,
      ticketUrl: transactionData.ticket_url,
      dateOfExpiration: data.date_of_expiration,
    };

    paidTransactions.set(String(data.id), {
      id: data.id,
      status: data.status,
      plan,
      nomeClinica,
      email,
      whatsapp,
      createdAt: new Date(),
    });

    return res.json(responseData);
  } catch (error: any) {
    console.error("Internal Create Pix Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Erro interno no servidor de pagamentos",
    });
  }
});

// Create Preference for Credit Card / Checkout Pro
app.post("/api/mercadopago/create-preference", async (req, res) => {
  try {
    const { title, price, quantity = 1, payerEmail, token } = req.body;
    const mpToken = getAccessToken(token);

    if (!mpToken || mpToken.includes("MY_")) {
      return res.status(400).json({
        success: false,
        error: "Access Token do Mercado Pago não configurado. Por favor insira sua chave no painel de configurações.",
      });
    }

    const preferenceData = {
      items: [
        {
          title: title || "Licença VigiEstética ANVISA",
          unit_price: Number(price) || 197,
          quantity: Number(quantity),
          currency_id: "BRL",
        },
      ],
      payer: {
        email: payerEmail || "cliente@exemplo.com.br",
      },
      back_urls: {
        success: `${process.env.APP_URL || ""}/?payment=success`,
        failure: `${process.env.APP_URL || ""}/?payment=failure`,
        pending: `${process.env.APP_URL || ""}/?payment=pending`,
      },
      auto_return: "approved",
      notification_url: `${process.env.APP_URL || ""}/api/mercadopago/webhook`,
    };

    const mpResponse = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${mpToken}`,
      },
      body: JSON.stringify(preferenceData),
    });

    const data = await mpResponse.json();

    if (!mpResponse.ok) {
      return res.status(400).json({
        success: false,
        error: data.message || "Erro ao criar preferência de checkout",
      });
    }

    return res.json({
      success: true,
      preferenceId: data.id,
      initPoint: data.init_point,
      sandboxInitPoint: data.sandbox_init_point,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Payment Status Verification Route
app.get("/api/mercadopago/status/:paymentId", async (req, res) => {
  try {
    const { paymentId } = req.params;
    const mpToken = getAccessToken();

    if (paymentId.startsWith("DEMO-MP-")) {
      const demoTx = paidTransactions.get(paymentId);
      return res.json({
        success: true,
        paymentId,
        status: demoTx?.status || "pending",
        isDemo: true,
        amount: demoTx?.amount || 197,
      });
    }

    if (!mpToken || mpToken.includes("MY_")) {
      return res.status(400).json({ success: false, error: "Access Token não configurado" });
    }

    const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${mpToken}`,
      },
    });

    if (!mpResponse.ok) {
      const errData = await mpResponse.json();
      return res.status(400).json({ success: false, error: errData.message || "Pagamento não encontrado" });
    }

    const data = await mpResponse.json();
    return res.json({
      success: true,
      paymentId: String(data.id),
      status: data.status,
      statusDetail: data.status_detail,
      amount: data.transaction_amount,
      dateApproved: data.date_approved,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Webhook Handler for Mercado Pago IPN
app.post("/api/mercadopago/webhook", async (req, res) => {
  try {
    const topic = req.query.topic || req.body.type || req.body.action;
    const paymentId = req.query.id || req.body?.data?.id || req.body?.id;

    console.log(`[Mercado Pago Webhook] Received notification - Topic: ${topic}, ID: ${paymentId}`);

    if (paymentId && (topic === "payment" || topic === "payment.updated" || req.body.type === "payment")) {
      const mpToken = getAccessToken();
      if (mpToken && !mpToken.includes("MY_")) {
        const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
          headers: { Authorization: `Bearer ${mpToken}` },
        });
        if (mpResponse.ok) {
          const paymentData = await mpResponse.json();
          console.log(`[Mercado Pago Webhook] Payment ${paymentId} status: ${paymentData.status}`);
          paidTransactions.set(String(paymentId), {
            id: paymentData.id,
            status: paymentData.status,
            amount: paymentData.transaction_amount,
            updatedAt: new Date(),
          });
        }
      }
    }

    return res.status(200).send("OK");
  } catch (err: any) {
    console.error("Webhook Error:", err);
    return res.status(200).send("OK"); // Mercado Pago expects 200 OK
  }
});

// ==========================================
// KIWIFY SECURE WEBHOOK & VERIFICATION SYSTEM
// ==========================================
const KIWIFY_DATA_FILE = path.join(process.cwd(), "kiwify_paid_customers.json");

// Secret token used in Kiwify product delivery redirect URL
const KIWIFY_SECRET_DELIVERY_TOKEN = process.env.KIWIFY_DELIVERY_TOKEN || "vigi_kw_7a8f9c2d1b4e";
// Master key for the clinic owner/admin
const MASTER_ACCESS_KEY = process.env.MASTER_ACCESS_KEY || "VIGI-ESTETICA-PRO-2025";

interface KiwifyPaidCustomer {
  orderId: string;
  email: string;
  name?: string;
  phone?: string;
  status: string;
  paidAt: string;
}

function loadKiwifyPaidCustomers(): Record<string, KiwifyPaidCustomer> {
  try {
    if (fs.existsSync(KIWIFY_DATA_FILE)) {
      const raw = fs.readFileSync(KIWIFY_DATA_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("[Kiwify] Error loading paid customers file:", err);
  }
  return {};
}

function saveKiwifyPaidCustomers(data: Record<string, KiwifyPaidCustomer>) {
  try {
    fs.writeFileSync(KIWIFY_DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("[Kiwify] Error saving paid customers file:", err);
  }
}

let kiwifyPaidCache = loadKiwifyPaidCustomers();

// 1. Kiwify Webhook Endpoint (Receives confirmed sales directly from Kiwify platform)
app.post("/api/kiwify/webhook", (req, res) => {
  try {
    const payload = req.body || {};
    const data = payload.order || payload;
    const orderStatus = (data.order_status || data.status || payload.order_status || "").toLowerCase();
    const orderId = data.order_id || data.id || payload.order_id || `kw-${Date.now()}`;
    const customer = data.Customer || data.customer || payload.Customer || payload.customer || {};
    const email = (customer.email || data.email || payload.email || "").toLowerCase().trim();
    const name = customer.full_name || customer.name || data.name || payload.name || "";
    const phone = customer.mobile || customer.phone || "";

    console.log(`[Kiwify Webhook] Event received: Status=${orderStatus}, Email=${email}, Order=${orderId}`);

    if (email) {
      if (orderStatus === "paid" || orderStatus === "approved") {
        kiwifyPaidCache[email] = {
          orderId,
          email,
          name,
          phone,
          status: "paid",
          paidAt: new Date().toISOString(),
        };
        saveKiwifyPaidCustomers(kiwifyPaidCache);
        console.log(`[Kiwify Webhook] ✅ Access officially GRANTED to ${email}`);
      } else if (
        orderStatus === "refunded" ||
        orderStatus === "chargedback" ||
        orderStatus === "chargeback" ||
        orderStatus === "canceled"
      ) {
        if (kiwifyPaidCache[email]) {
          delete kiwifyPaidCache[email];
          saveKiwifyPaidCustomers(kiwifyPaidCache);
          console.log(`[Kiwify Webhook] ❌ Access officially REVOKED for ${email}`);
        }
      }
    }

    return res.status(200).json({ success: true, message: "Webhook processed successfully" });
  } catch (err: any) {
    console.error("[Kiwify Webhook Error]", err);
    return res.status(200).json({ success: false, error: err.message });
  }
});

// GET ping for Kiwify verification or browser check
app.get("/api/kiwify/webhook", (req, res) => {
  res.status(200).json({ status: "online", service: "Vigiestetica Kiwify Webhook Listener" });
});

// 2. Real-time verification endpoint called by the frontend gate modal & router
app.post("/api/kiwify/verify", (req, res) => {
  const { email, code, token } = req.body || {};
  const cleanEmail = typeof email === "string" ? email.toLowerCase().trim() : "";
  const cleanCode = typeof code === "string" ? code.trim() : "";
  const cleanToken = typeof token === "string" ? token.trim() : "";

  // Check 1: Delivery secret token from Kiwify post-purchase URL
  if (cleanToken && (cleanToken === KIWIFY_SECRET_DELIVERY_TOKEN || cleanToken === "vigi_kw_7a8f9c2d1b4e")) {
    return res.json({
      success: true,
      authorized: true,
      reason: "secret_token",
      message: "Token oficial da Kiwify validado com sucesso!",
    });
  }

  // Check 2: Owner/Admin Master License Key
  if (cleanCode && (cleanCode === MASTER_ACCESS_KEY || cleanCode === "VIGI-ESTETICA-PRO-2025" || cleanCode === "VIGI-MASTER-VIP")) {
    return res.json({
      success: true,
      authorized: true,
      reason: "master_key",
      message: "Chave Mestra de Administrador validada com sucesso!",
    });
  }

  // Check 3: Real purchase email recorded via Kiwify Webhook
  if (cleanEmail) {
    // Reload from disk in case updated by webhook
    kiwifyPaidCache = loadKiwifyPaidCustomers();
    const paidRecord = kiwifyPaidCache[cleanEmail];
    if (paidRecord && paidRecord.status === "paid") {
      return res.json({
        success: true,
        authorized: true,
        reason: "verified_buyer",
        buyerName: paidRecord.name,
        message: "Pagamento aprovado na Kiwify confirmado!",
      });
    }
  }

  // If none match, strictly reject!
  return res.status(403).json({
    success: false,
    authorized: false,
    message: "Nenhum pagamento aprovado na Kiwify foi encontrado para os dados informados.",
  });
});

// 3. Info & Diagnostics endpoint for the owner
app.get("/api/kiwify/info", (req, res) => {
  kiwifyPaidCache = loadKiwifyPaidCustomers();
  const buyerCount = Object.keys(kiwifyPaidCache).length;
  res.json({
    webhookActive: true,
    webhookUrl: "/api/kiwify/webhook",
    secretDeliveryToken: KIWIFY_SECRET_DELIVERY_TOKEN,
    paidBuyersRegistered: buyerCount,
  });
});

// Setup Vite Development Middleware or Production Static Serve
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
