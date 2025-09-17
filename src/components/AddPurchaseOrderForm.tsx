// import React, { useState, useEffect } from 'react';
// import { Button, Input, Label } from '@ui5/webcomponents-react';

// const DEFAULTS = {
//   CompanyCode: '1810',
//   PurchaseOrderType: 'NB',
//   Supplier: '1000032',
//   PurchasingOrganization: '1810',
//   PurchasingGroup: '001',
//   PurchaseOrderItemText: 'ASIAN PAINTS',
//   Plant: '1810',
//   OrderQuantity: '10.000',
//   MaterialGroup: 'L002',
//   NetPriceAmount: '1000.00',
//   Material: '', // This is always empty by default
// };

// export default function AddPurchaseOrderForm({ onSubmit, onCancel, initialData }: any) {
//   const [form, setForm] = useState({ ...DEFAULTS, ...initialData });

//   useEffect(() => {
//     if (initialData) {
//       setForm({ ...DEFAULTS, ...initialData });
//     }
//   }, [initialData]);

//   const handleChange = (e: any) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: any) => {
//     e.preventDefault();

//     const payload: any = {
//       CompanyCode: form.CompanyCode,
//       PurchaseOrderType: form.PurchaseOrderType,
//       Supplier: form.Supplier,
//       PurchasingOrganization: form.PurchasingOrganization,
//       PurchasingGroup: form.PurchasingGroup,
//       to_PurchaseOrderItem: [
//         {
//           PurchaseOrderItemText: form.PurchaseOrderItemText,
//           Plant: form.Plant,
//           OrderQuantity: form.OrderQuantity,
//           MaterialGroup: form.MaterialGroup,
//           NetPriceAmount: form.NetPriceAmount,
//           Material: form.Material,
//         }
//       ],
//     };

//     // Include PurchaseOrder if editing (exists in initialData)
//     if (initialData?.PurchaseOrder) {
//       payload.PurchaseOrder = initialData.PurchaseOrder;
//     }

//     onSubmit(payload);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: '1fr 1fr',
//           gap: 16,
//           marginBottom: 24,
//         }}
//       >
//         <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//           <Label>Company Code</Label>
//           <Input
//             name="CompanyCode"
//             value={form.CompanyCode}
//             placeholder="Company Code"
//             onInput={handleChange}
//           />

//           <Label>Purchase Order Type</Label>
//           <Input
//             name="PurchaseOrderType"
//             value={form.PurchaseOrderType}
//             placeholder="Purchase Order Type"
//             onInput={handleChange}
//           />

//           <Label>Supplier</Label>
//           <Input
//             name="Supplier"
//             value={form.Supplier}
//             placeholder="Supplier"
//             onInput={handleChange}
//           />

//           <Label>Purchasing Organization</Label>
//           <Input
//             name="PurchasingOrganization"
//             value={form.PurchasingOrganization}
//             placeholder="Purchasing Organization"
//             onInput={handleChange}
//           />

//           <Label>Purchasing Group</Label>
//           <Input
//             name="PurchasingGroup"
//             value={form.PurchasingGroup}
//             placeholder="Purchasing Group"
//             onInput={handleChange}
//           />

//           <Label>Purchase Order Item Text</Label>
//           <Input
//             name="PurchaseOrderItemText"
//             value={form.PurchaseOrderItemText}
//             placeholder="Item Text"
//             onInput={handleChange}
//           />
//         </div>
//         <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//           <Label>Plant</Label>
//           <Input
//             name="Plant"
//             value={form.Plant}
//             placeholder="Plant"
//             onInput={handleChange}
//           />

//           <Label>Material Group</Label>
//           <Input
//             name="MaterialGroup"
//             value={form.MaterialGroup}
//             placeholder="Material Group"
//             onInput={handleChange}
//           />

//           <Label>Order Quantity</Label>
//           <Input
//             name="OrderQuantity"
//             value={form.OrderQuantity}
//             placeholder="Order Quantity"
//             onInput={handleChange}
//           />

//           <Label>Net Price Amount</Label>
//           <Input
//             name="NetPriceAmount"
//             value={form.NetPriceAmount}
//             placeholder="Net Price Amount"
//             onInput={handleChange}
//           />

//           <Label>Material</Label>
//           <Input
//             name="Material"
//             value={form.Material}
//             placeholder="Material (Enter Required)"
//             onInput={handleChange}
//             required
//           />
//         </div>
//       </div>
//       <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
//         <Button design="Emphasized" type="Submit">
//           Submit
//         </Button>
//         <Button design="Transparent" type="Button" onClick={onCancel}>
//           Cancel
//         </Button>
//       </div>
//     </form>
//   );
// }








// import React, { useState, useEffect } from 'react';
// import { Button, Input, Label } from '@ui5/webcomponents-react';

// const DEFAULTS = {
//   CompanyCode: '1810',
//   PurchaseOrderType: 'NB',
//   Supplier: '1000032',
//   PurchasingOrganization: '1810',
//   PurchasingGroup: '001',
//   PurchaseOrderItemText: 'ASIAN PAINTS',
//   Plant: '1810',
//   OrderQuantity: '10.000',
//   MaterialGroup: 'L002',
//   NetPriceAmount: '1000.00',
//   Material: '',
//   PurchaseOrder: '', // for edit mode
//   PurchaseOrderItem: '' // for edit mode
// };

// export default function AddPurchaseOrderForm({ onSubmit, onCancel, initialData }: any) {
//   const [form, setForm] = useState({ ...DEFAULTS, ...initialData });

//   useEffect(() => {
//     if (initialData) {
//       setForm({ ...DEFAULTS, ...initialData });
//     }
//   }, [initialData]);

//   const handleChange = (e: any) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: any) => {
//     e.preventDefault();

//     const payload: any = {
//       CompanyCode: form.CompanyCode,
//       PurchaseOrderType: form.PurchaseOrderType,
//       Supplier: form.Supplier,
//       PurchasingOrganization: form.PurchasingOrganization,
//       PurchasingGroup: form.PurchasingGroup,
//       to_PurchaseOrderItem: [
//         {
//           PurchaseOrderItem: form.PurchaseOrderItem, // ✅ include line item
//           PurchaseOrderItemText: form.PurchaseOrderItemText,
//           Plant: form.Plant,
//           OrderQuantity: form.OrderQuantity,
//           MaterialGroup: form.MaterialGroup,
//           NetPriceAmount: form.NetPriceAmount,
//           Material: form.Material
//         }
//       ]
//     };

//     // ✅ Include PO header if editing
//     if (form.PurchaseOrder) {
//       payload.PurchaseOrder = form.PurchaseOrder;
//     }

//     onSubmit(payload);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: '1fr 1fr',
//           gap: 16,
//           marginBottom: 24
//         }}
//       >
//         {/* LEFT SIDE */}
//         <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//           <Label>Company Code</Label>
//           <Input name="CompanyCode" value={form.CompanyCode} onInput={handleChange} />

//           <Label>Purchase Order Type</Label>
//           <Input name="PurchaseOrderType" value={form.PurchaseOrderType} onInput={handleChange} />

//           <Label>Supplier</Label>
//           <Input name="Supplier" value={form.Supplier} onInput={handleChange} />

//           <Label>Purchasing Organization</Label>
//           <Input
//             name="PurchasingOrganization"
//             value={form.PurchasingOrganization}
//             onInput={handleChange}
//           />

//           <Label>Purchasing Group</Label>
//           <Input name="PurchasingGroup" value={form.PurchasingGroup} onInput={handleChange} />

//           <Label>Purchase Order Item Text</Label>
//           <Input
//             name="PurchaseOrderItemText"
//             value={form.PurchaseOrderItemText}
//             onInput={handleChange}
//           />
//         </div>

//         {/* RIGHT SIDE */}
//         <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//           <Label>Plant</Label>
//           <Input name="Plant" value={form.Plant} onInput={handleChange} />

//           <Label>Material Group</Label>
//           <Input name="MaterialGroup" value={form.MaterialGroup} onInput={handleChange} />

//           <Label>Order Quantity</Label>
//           <Input name="OrderQuantity" value={form.OrderQuantity} onInput={handleChange} />

//           <Label>Net Price Amount</Label>
//           <Input name="NetPriceAmount" value={form.NetPriceAmount} onInput={handleChange} />

//           <Label>Material</Label>
//           <Input
//             name="Material"
//             value={form.Material}
//             placeholder="Material (Required)"
//             onInput={handleChange}
//             required
//           />
//         </div>
//       </div>

//       {/* HIDDEN FIELDS for Edit */}
//       {form.PurchaseOrder && (
//         <>
//           <input type="hidden" name="PurchaseOrder" value={form.PurchaseOrder} />
//           <input type="hidden" name="PurchaseOrderItem" value={form.PurchaseOrderItem} />
//         </>
//       )}

//       <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
//         <Button design="Emphasized" type="Submit">
//           Submit
//         </Button>
//         <Button design="Transparent" type="Button" onClick={onCancel}>
//           Cancel
//         </Button>
//       </div>
//     </form>
//   );
// }
// import React from 'react';
import  { useState } from 'react';
import { Button, Input, Label } from '@ui5/webcomponents-react';
 
const DEFAULTS = {
  CompanyCode: '1810',
  PurchaseOrderType: 'NB',
  Supplier: '1000032',
  PurchasingOrganization: '1810',
  PurchasingGroup: '001',
  PurchaseOrderItemText: 'ASIAN PAINTS',
  Plant: '1810',
  OrderQuantity: '10.000',
  MaterialGroup: 'L002',
  NetPriceAmount: '1000.00',
  Material: '', // This is always empty by default
};




//jkkhkhjkg

//vvhhjjk
 
export default function AddPurchaseOrderForm({ onSubmit, onCancel }: any) {
  const [form, setForm] = useState({ ...DEFAULTS });
 
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit({
      CompanyCode: form.CompanyCode,
      PurchaseOrderType: form.PurchaseOrderType,
      Supplier: form.Supplier,
      PurchasingOrganization: form.PurchasingOrganization,
      PurchasingGroup: form.PurchasingGroup,
      to_PurchaseOrderItem: [
        {
          PurchaseOrderItemText: form.PurchaseOrderItemText,
          Plant: form.Plant,
          OrderQuantity: form.OrderQuantity,
          MaterialGroup: form.MaterialGroup,
          NetPriceAmount: form.NetPriceAmount,
          Material: form.Material,
        },
      ],
    });
  };
 
  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Label>Company Code</Label>
          <Input
            name="CompanyCode"
            value={form.CompanyCode}
            placeholder="Company Code"
            onInput={handleChange}
          />
 
          <Label>Purchase Order Type</Label>
          <Input
            name="PurchaseOrderType"
            value={form.PurchaseOrderType}
            placeholder="Purchase Order Type"
            onInput={handleChange}
          />
 
          <Label>Supplier</Label>
          <Input
            name="Supplier"
            value={form.Supplier}
            placeholder="Supplier"
            onInput={handleChange}
          />
 
          <Label>Purchasing Organization</Label>
          <Input
            name="PurchasingOrganization"
            value={form.PurchasingOrganization}
            placeholder="Purchasing Organization"
            onInput={handleChange}
          />
 
          <Label>Purchasing Group</Label>
          <Input
            name="PurchasingGroup"
            value={form.PurchasingGroup}
            placeholder="Purchasing Group"
            onInput={handleChange}
          />
 
          <Label>Purchase Order Item Text</Label>
          <Input
            name="PurchaseOrderItemText"
            value={form.PurchaseOrderItemText}
            placeholder="Item Text"
            onInput={handleChange}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Label>Plant</Label>
          <Input
            name="Plant"
            value={form.Plant}
            placeholder="Plant"
            onInput={handleChange}
          />
 
          <Label>Material Group</Label>
          <Input
            name="MaterialGroup"
            value={form.MaterialGroup}
            placeholder="Material Group"
            onInput={handleChange}
          />
 
          <Label>Order Quantity</Label>
          <Input
            name="OrderQuantity"
            value={form.OrderQuantity}
            placeholder="Order Quantity"
            onInput={handleChange}
          />
 
          <Label>Net Price Amount</Label>
          <Input
            name="NetPriceAmount"
            value={form.NetPriceAmount}
            placeholder="Net Price Amount"
            onInput={handleChange}
          />
 
          <Label>Material</Label>
          <Input
            name="Material"
            value={form.Material}
            placeholder="Material (Enter Required)"
            onInput={handleChange}
            required
          />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
        <Button design="Emphasized" type="Submit">Submit</Button>
        <Button design="Transparent" type="Button" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}