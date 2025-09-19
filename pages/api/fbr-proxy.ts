import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const FBR_BASE_URL = 'https://gw.fbr.gov.pk/imd_data/v1/i/di';
const POST_INVOICE_URL = `${FBR_BASE_URL}/postinvoicedata_sb`;
const VALIDATE_INVOICE_URL = `${FBR_BASE_URL}/validateinvoicedata_sb`;
const SANDBOX_TOKEN = 'a78ad111-d843-364d-9271-546c4f4b2b8';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action, payload } = req.body;
  let url = '';
  if (action === 'post') {
    url = POST_INVOICE_URL;
  } else if (action === 'validate') {
    url = VALIDATE_INVOICE_URL;
  } else {
    return res.status(400).json({ error: 'Invalid action' });
  }

  try {
    // Debug: log payload being sent
    console.log('Sending to FBR:', JSON.stringify(payload, null, 2));
    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SANDBOX_TOKEN}`,
      },
    });
    res.status(200).json(response.data);
  } catch (error: unknown) {
    // Debug: log error from FBR
    if (typeof error === 'object' && error !== null && 'response' in error && 'message' in error) {
  const err = error as { response?: { data?: unknown; status?: number }; message?: string };
      console.error('FBR API Error:', err.response?.data || err.message);
      res.status(err.response?.status || 500).json(err.response?.data || { error: err.message });
    } else {
      console.error('FBR API Error:', error);
      res.status(500).json({ error: 'Unknown error' });
    }
  }
}
