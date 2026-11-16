// Recebe o formulário de contato e envia por e-mail pela conta da Nexo na Hostinger.
// Variáveis de ambiente (Vercel → Settings → Environment Variables):
//   SMTP_USER  conta que envia, ex.: projetos@nexoprojetosdesign.com.br
//   SMTP_PASS  senha dessa conta de e-mail
//   SMTP_HOST  opcional, padrão smtp.hostinger.com
//   SMTP_PORT  opcional, padrão 465
//   CONTATO_PARA  opcional, quem recebe; padrão é o próprio SMTP_USER
import nodemailer from 'nodemailer';

const limite = (v, n) => String(v ?? '').trim().slice(0, n);
const emailValido = e => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, erro: 'metodo' });
  }

  let dados = req.body;
  if (typeof dados === 'string') {
    try { dados = JSON.parse(dados); } catch { dados = {}; }
  }
  dados = dados || {};

  // Campo invisível para robôs: pessoas não preenchem. Se vier preenchido, finge sucesso.
  if (limite(dados.nx_confirma, 200)) {
    console.warn('Formulário de contato: descartado pelo campo anti-robô');
    return res.status(200).json({ ok: true });
  }

  const nome = limite(dados.nome, 120);
  const email = limite(dados.email, 160);
  const empresa = limite(dados.empresa, 160);
  const telefone = limite(dados.telefone, 40);
  const assunto = limite(dados.assunto, 80) || 'Novo projeto';
  const mensagem = limite(dados.mensagem, 5000);

  if (!nome || !emailValido(email) || mensagem.length < 5) {
    return res.status(400).json({ ok: false, erro: 'campos' });
  }

  const { SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    console.error('Formulário de contato: SMTP_USER ou SMTP_PASS não configurados');
    return res.status(500).json({ ok: false, erro: 'configuracao' });
  }

  const transporte = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });

  const texto = [
    `Nome: ${nome}`,
    `E-mail: ${email}`,
    `Empresa ou órgão: ${empresa || '-'}`,
    `Telefone: ${telefone || '-'}`,
    `Assunto: ${assunto}`,
    '',
    mensagem,
    '',
    '— Enviado pelo formulário do site nexoprojetosdesign.com.br'
  ].join('\n');

  try {
    const info = await transporte.sendMail({
      from: { name: 'Site Nexo Projetos', address: SMTP_USER },
      to: process.env.CONTATO_PARA || SMTP_USER,
      replyTo: { name: nome, address: email },
      subject: `Contato pelo site: ${assunto} · ${nome}`,
      text: texto
    });
    // Registro para diagnóstico nos Logs da Vercel (sem o conteúdo da mensagem)
    console.log('Formulário de contato: aceito pelo SMTP', JSON.stringify({
      id: info.messageId, aceitos: info.accepted, recusados: info.rejected, resposta: info.response
    }));
    if (!info.accepted || info.accepted.length === 0) {
      return res.status(502).json({ ok: false, erro: 'envio' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Formulário de contato: falha no envio', err && err.message);
    return res.status(502).json({ ok: false, erro: 'envio' });
  }
}
