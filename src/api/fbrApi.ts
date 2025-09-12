// src/api/fbrApi.ts
import axios from 'axios';

// Call the Next.js API route instead of FBR API directly
export async function postInvoiceData(invoiceData: any) {
  try {
    const response = await axios.post('/api/fbr-proxy', {
      action: 'post',
      payload: invoiceData,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
}

export async function validateInvoiceData(invoiceData: any) {
  try {
    const response = await axios.post('/api/fbr-proxy', {
      action: 'validate',
      payload: invoiceData,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
}
