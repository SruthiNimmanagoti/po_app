const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // version 2
 
const app = express();
app.use(cors());
app.use(express.json());
 
// SAP Cloud Credentials (keep secure)
const USERNAME = 'INTEGRATION';
const PASSWORD = 'UT8BsHhZkz-cPbMRcvCiaMRzqngFlSAQZTxZBvGM';
 
// Base URLs for SAP APIs
const SAP_API_URL = 'https://my403545-api.s4hana.cloud.sap/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/A_PurchaseOrder';
const SAP_API_URL_POST = 'https://my403545-api.s4hana.cloud.sap/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/A_PurchaseOrder';
 
// GET purchase orders (list)
app.get('/api/purchaseorders', async (req, res) => {
  try {
    const response = await fetch(SAP_API_URL, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64'),
        'Accept': 'application/json',
      },
    });
    const data = await response.json();
    /*
      Make sure your SAP API returns PurchaseOrderItem along with orders,
      or adjust integration to join order items accordingly here if required.
    */
    return res.json(data);
  } catch (error) {
    console.error('GET purchaseorders error:', error);
    res.status(500).json({ error: error.message });
  }
});
 
// POST create a new purchase order
app.post('/api/purchaseorders', async (req, res) => {
  try {
    const tokenResp = await fetch(SAP_API_URL_POST, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64'),
        'x-csrf-token': 'Fetch',
        'Accept': 'application/json'
      },
    });
 
    const csrfToken = tokenResp.headers.get('x-csrf-token');
    const cookies = tokenResp.headers.raw()['set-cookie'] || [];
 
    if (!csrfToken || cookies.length === 0) {
      console.error('Failed to get CSRF token or cookies');
      return res.status(500).json({ error: 'Failed to retrieve CSRF token or cookies.' });
    }
 
    const postResponse = await fetch(SAP_API_URL_POST, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken,
        'Cookie': cookies.map(cookie => cookie.split(';')[0]).join('; '),
      },
      body: JSON.stringify(req.body)
    });
 
    const postData = await postResponse.json();
    if (!postResponse.ok) {
      return res.status(postResponse.status).json(postData);
    }
    return res.json(postData);
  } catch (err) {
    console.error('POST purchaseorders error:', err);
    res.status(500).json({ error: err.message });
  }
});
 

function padItem(item) {
  return item.toString().padStart(5, '0');
}

// PATCH update a purchase order item
app.patch('/api/purchaseorderitem/:po/:item', async (req, res) => {
  try {
    const { po, item } = req.params;
    // const padItem = x => x.toString().padStart(5, '0');
    const url = `https://my403545-api.s4hana.cloud.sap/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/A_PurchaseOrderItem(PurchaseOrder='${po}',PurchaseOrderItem='${padItem(item)}')`;
 
    const tokenResp = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64'),
        'x-csrf-token': 'Fetch',
        'Accept': 'application/json',
      },
    });
 
    const csrfToken = tokenResp.headers.get('x-csrf-token');
    const cookies = tokenResp.headers.raw()['set-cookie'] || [];
 
    if (!csrfToken || cookies.length === 0) {
      console.error('Failed to get CSRF token or cookies for PATCH');
      return res.status(500).json({ error: 'Failed to retrieve CSRF token or cookies.' });
    }
 
    const patchResponse = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken,
        'Cookie': cookies.map(cookie => cookie.split(';')[0]).join('; '),
      },
      body: JSON.stringify(req.body)
    });
 
    const patchData = await patchResponse.json();
    if (!patchResponse.ok) {
      return res.status(patchResponse.status).json(patchData);
    }
    return res.json(patchData);
  } catch (err) {
    console.error('PATCH purchaseorderitem error:', err);
    res.status(500).json({ error: err.message });
  }
});
 
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
 