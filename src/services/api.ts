export async function getPurchaseOrders() {
  const res = await fetch('/api/purchaseorders');
  if (!res.ok) {
    throw new Error('Failed to fetch purchase orders');
  }
  return res.json();
}

 
export async function postPurchaseOrder(data: any) {
  const res = await fetch('http://localhost:3001/api/purchaseorders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}
 
// PATCH method for updating PO item
export async function patchPurchaseOrderItem(po: string, item: string, data: any) {
  const res = await fetch(`https://my403545-api.s4hana.cloud.sap/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/A_PurchaseOrderItem(PurchaseOrder='${po}',PurchaseOrderItem='${item}')`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}