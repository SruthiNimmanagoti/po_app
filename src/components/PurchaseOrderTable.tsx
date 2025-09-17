// // import { useState } from 'react';
// // import {
// //   Card,
// //   CardHeader,
// //   Table,
// //   TableRow,
// //   TableCell,
// //   Button,
// //   BusyIndicator,
// //   Dialog,
// //   Title,
// //   Text
// // } from '@ui5/webcomponents-react';
// // import AddPurchaseOrderForm from './AddPurchaseOrderForm';
// // import { getPurchaseOrders, postPurchaseOrder } from '../services/api';

// // function formatSAPDate(dateStr: string) {
// //   const match = /\/Date\((\d+)\)\//.exec(dateStr);
// //   if (match) {
// //     const timestamp = parseInt(match[1], 10);
// //     return new Date(timestamp).toLocaleDateString();
// //   }
// //   return dateStr;
// // }

// // export default function PurchaseOrderTable() {
// //   const [data, setData] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(false);
// //   const [showAddForm, setShowAddForm] = useState(false);

// //   const fetchData = async () => {
// //     setLoading(true);
// //     const res = await getPurchaseOrders();
// //     setData(res.d?.results || []);
// //     setLoading(false);
// //   };

// //   return (
// //     <div style={{ maxWidth: 1200, margin: '40px auto', padding: 16 }}>
// //       <Card header={<CardHeader titleText="Purchase Orders" />} style={{ marginBottom: 32 }}>
// //         <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
// //           <Button design="Emphasized" onClick={fetchData}>
// //             Fetch Purchase Orders
// //           </Button>
// //           <Button onClick={() => setShowAddForm(true)}>Add Purchase Order</Button>
// //         </div>

// //         {loading && <BusyIndicator active />}

// //        <Dialog
// //   open={showAddForm}
// //   headerText="Add Purchase Order"
// //   // Remove onClose or onAfterClose here
// // >
// //   <AddPurchaseOrderForm
// //     onSubmit={async (po: any) => {
// //       await postPurchaseOrder(po);
// //       setShowAddForm(false);
// //       fetchData();
// //     }}
// //     onCancel={() => setShowAddForm(false)}
// //   />
// // </Dialog>


// //         <Table style={{ width: '100%' }}>
// //   <thead>
// //     <tr>
// //       <th>PO Number</th>
// //       <th>Company Code</th>
// //       <th>Supplier</th>
// //       <th>PO Type</th>
// //       <th>Creation Date</th>
// //     </tr>
// //   </thead>
// //   <tbody>
// //     {Array.isArray(data) &&
// //       data.map((item) => (
// //         <TableRow key={item.PurchaseOrder}>
// //           <TableCell>
// //             <Title level="H5">{item.PurchaseOrder}</Title>
// //           </TableCell>
// //           <TableCell>
// //             <Text>{item.CompanyCode}</Text>
// //           </TableCell>
// //           <TableCell>
// //             <Text>{item.Supplier}</Text>
// //           </TableCell>
// //           <TableCell>
// //             <Text>{item.PurchaseOrderType}</Text>
// //           </TableCell>
// //           <TableCell>
// //             <Text>{formatSAPDate(item.CreationDate)}</Text>
// //           </TableCell>
// //         </TableRow>
// //       ))}
// //   </tbody>
// // </Table>

// //         {!loading && Array.isArray(data) && data.length === 0 && (
// //           <Text style={{ marginTop: 24, color: '#888' }}>
// //             No purchase orders available. Click "Fetch Purchase Orders" above.
// //           </Text>
// //         )}
// //       </Card>
// //     </div>
// //   );
// // }


// import { useState } from 'react';
// import {
//   Card,
//   CardHeader,
//   AnalyticalTable,
//   Button,
//   BusyIndicator,
//   Dialog,
//   Text
// } from '@ui5/webcomponents-react';
// import AddPurchaseOrderForm from './AddPurchaseOrderForm';
// import { getPurchaseOrders, postPurchaseOrder } from '../services/api';

// function formatSAPDate(dateStr: string) {
//   const match = /\/Date\((\d+)\)\//.exec(dateStr);
//   if (match) {
//     const timestamp = parseInt(match[1], 10);
//     return new Date(timestamp).toLocaleDateString();
//   }
//   return dateStr;
// }

// export default function PurchaseOrderTable() {
//   const [data, setData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [successMessage, setSuccessMessage] = useState<string>('');
//   const [newPoNumber, setNewPoNumber] = useState<string>('');
//   const [showSuccessDialog, setShowSuccessDialog] = useState(false);

//   const [editPo, setEditPo] = useState<any | null>(null);
//   const [showEditDialog, setShowEditDialog] = useState(false);

//   const fetchData = async () => {
//     setLoading(true);
//     const res = await getPurchaseOrders();
//     setData(res.d?.results || []);
//     setLoading(false);
//   };

//   const handleAddSubmit = async (po: any) => {
//     const response = await postPurchaseOrder(po);
//     const createdPoNumber = response?.d?.PurchaseOrder || response?.PurchaseOrder || 'Unknown';
//     setSuccessMessage('Successfully posted a new record.');
//     setNewPoNumber(createdPoNumber);
//     setShowSuccessDialog(true);
//     setShowAddForm(false);
//     fetchData();
//   };

//   const handleEditClick = (po: any) => {
//     setEditPo(po);
//     setShowEditDialog(true);
//   };

//     const handleEditSubmit = async (updatedPo: any) => {
//     const response = await postPurchaseOrder(updatedPo); // Or your PUT/update API
//     const updatedPoNumber = response?.d?.PurchaseOrder || response?.PurchaseOrder || updatedPo.PurchaseOrder || 'Unknown';
//     setSuccessMessage(`Successfully updated the record`);
//     setNewPoNumber(updatedPoNumber);
//     setShowSuccessDialog(true);
//     setShowEditDialog(false);
//     setEditPo(null);
//     fetchData();
//   };



//   const columns = [
//     {
//       Header: 'PO Number',
//       accessor: 'PurchaseOrder'
//     },
//     {
//       Header: 'Company Code',
//       accessor: 'CompanyCode'
//     },
//     {
//       Header: 'Supplier',
//       accessor: 'Supplier'
//     },
//     {
//       Header: 'PO Type',
//       accessor: 'PurchaseOrderType'
//     },
//     {
//       Header: 'Creation Date',
//       accessor: 'CreationDate',
//       Cell: ({ cell }: any) => formatSAPDate(cell.value)
//     },
//     {
//       Header: 'Actions',
//       accessor: 'actions',
//       disableSortBy: true,
//       Cell: ({ row }: any) => (
//         <Button
//           design="Transparent"
//           icon="edit"
//           onClick={() => handleEditClick(row.original)}
//         >
//           Edit
//         </Button>
//       ),
//     }
//   ];

//   return (
//     <div style={{ maxWidth: 1200, margin: '40px auto', padding: 16 }}>
//       <Card header={<CardHeader titleText="Purchase Orders" />} style={{ marginBottom: 32 }}>
//         <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
//           <Button design="Emphasized" onClick={fetchData}>
//             Fetch Purchase Orders
//           </Button>
//           <Button onClick={() => setShowAddForm(true)}>Add Purchase Order</Button>
//         </div>

//         {loading && <BusyIndicator active />}

//         {/* Add Purchase Order Dialog */}
//         <Dialog open={showAddForm} headerText="Add Purchase Order">
//           <AddPurchaseOrderForm
//             onSubmit={handleAddSubmit}
//             onCancel={() => setShowAddForm(false)}
//           />
//         </Dialog>

//         {/* Edit Purchase Order Dialog */}
//         <Dialog open={showEditDialog} headerText="Edit Purchase Order">
//           <AddPurchaseOrderForm
//             initialData={editPo}
//             onSubmit={handleEditSubmit}
//             onCancel={() => {
//               setShowEditDialog(false);
//               setEditPo(null);
//             }}
//           />
//         </Dialog>

//         {/* Success Dialog */}
//         <Dialog
//           open={showSuccessDialog}
//           headerText="Success"
//           footer={
//             <Button design="Emphasized" onClick={() => setShowSuccessDialog(false)}>
//               Close
//             </Button>
//           }
//         >
//           <Text>
//             {successMessage} PO Number: <b>{newPoNumber}</b>
//           </Text>
//         </Dialog>

//         <AnalyticalTable
//           data={data}
//           columns={columns}
//           style={{ width: '100%' }}
//           loading={loading}
//           noDataText="No purchase orders available. Click 'Fetch Purchase Orders' above."
//         />
//       </Card>
//     </div>
//   );
// }


// import { useState } from 'react';
// import {
//   Card,
//   CardHeader,
//   AnalyticalTable,
//   Button,
//   BusyIndicator,
//   Dialog,
//   Text
// } from '@ui5/webcomponents-react';
// import AddPurchaseOrderForm from './AddPurchaseOrderForm';
// import { getPurchaseOrders, postPurchaseOrder, patchPurchaseOrderItem } from '../services/api';

// function formatSAPDate(dateStr: string) {
//   const match = /\/Date\((\d+)\)\//.exec(dateStr);
//   if (match) {
//     const timestamp = parseInt(match[1], 10);
//     return new Date(timestamp).toLocaleDateString();
//   }
//   return dateStr;
// }

// export default function PurchaseOrderTable() {
//   const [data, setData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [successMessage, setSuccessMessage] = useState<string>('');
//   const [newPoNumber, setNewPoNumber] = useState<string>('');
//   const [showSuccessDialog, setShowSuccessDialog] = useState(false);

//   const [editPo, setEditPo] = useState<any | null>(null);
//   const [showEditDialog, setShowEditDialog] = useState(false);

//   const fetchData = async () => {
//     setLoading(true);
//     const res = await getPurchaseOrders();
//     setData(res.d?.results || []);
//     setLoading(false);
//   };

//   // Add New Purchase Order (POST)
//   const handleAddSubmit = async (po: any) => {
//     const response = await postPurchaseOrder(po);
//     const createdPoNumber = response?.d?.PurchaseOrder || response?.PurchaseOrder || 'Unknown';
//     setSuccessMessage('Successfully posted a new record.');
//     setNewPoNumber(createdPoNumber);
//     setShowSuccessDialog(true);
//     setShowAddForm(false);
//     fetchData();
//   };

//   // Open Edit Dialog for selected PO
//   const handleEditClick = (po: any) => {
//     setEditPo(po);
//     setShowEditDialog(true);
//   };

//   // Edit Purchase Order (PATCH only OrderQuantity)
//   const handleEditSubmit = async (updatedPo: any) => {
//     const poNumber = updatedPo.PurchaseOrder;
//     // Extract new OrderQuantity from nested item (adjust if your form structure differs)
//     const orderQuantity = updatedPo.to_PurchaseOrderItem?.[0]?.OrderQuantity;
//     if (!orderQuantity) {
//       alert('Order Quantity is required!');
//       return;
//     }

//     // Call PATCH API to update only OrderQuantity
//     const response = await patchPurchaseOrderItem(poNumber, orderQuantity);
//     const updatedPoNumber =
//       response?.d?.PurchaseOrder || response?.PurchaseOrder || poNumber || 'Unknown';
//     setSuccessMessage(`Successfully updated the record PO Number: ${updatedPoNumber}`);
//     setNewPoNumber(updatedPoNumber);
//     setShowSuccessDialog(true);
//     setShowEditDialog(false);
//     setEditPo(null);
//     fetchData();
//   };

//   const columns = [
//     { Header: 'PO Number', accessor: 'PurchaseOrder' },
//     { Header: 'Company Code', accessor: 'CompanyCode' },
//     { Header: 'Supplier', accessor: 'Supplier' },
//     { Header: 'PO Type', accessor: 'PurchaseOrderType' },
//     {
//       Header: 'Creation Date',
//       accessor: 'CreationDate',
//       Cell: ({ cell }: any) => formatSAPDate(cell.value)
//     },
//     {
//       Header: 'Actions',
//       accessor: 'actions',
//       disableSortBy: true,
//       Cell: ({ row }: any) => (
//         <Button design="Transparent" icon="edit" onClick={() => handleEditClick(row.original)}>
//           Edit
//         </Button>
//       )
//     }
//   ];

//   return (
//     <div style={{ maxWidth: 1200, margin: '40px auto', padding: 16 }}>
//       <Card header={<CardHeader titleText="Purchase Orders" />} style={{ marginBottom: 32 }}>
//         <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
//           <Button design="Emphasized" onClick={fetchData}>
//             Fetch Purchase Orders
//           </Button>
//           <Button onClick={() => setShowAddForm(true)}>Add Purchase Order</Button>
//         </div>

//         {loading && <BusyIndicator active />}

//         {/* Add Purchase Order Dialog */}
//         <Dialog open={showAddForm} headerText="Add Purchase Order">
//           <AddPurchaseOrderForm onSubmit={handleAddSubmit} onCancel={() => setShowAddForm(false)} />
//         </Dialog>

//         {/* Edit Purchase Order Dialog */}
//         <Dialog open={showEditDialog} headerText="Edit Purchase Order">
//           <AddPurchaseOrderForm
//             initialData={editPo}
//             onSubmit={handleEditSubmit}
//             onCancel={() => {
//               setShowEditDialog(false);
//               setEditPo(null);
//             }}
//           />
//         </Dialog>

//         {/* Success Dialog */}
//         <Dialog
//           open={showSuccessDialog}
//           headerText="Success"
//           footer={
//             <Button design="Emphasized" onClick={() => setShowSuccessDialog(false)}>
//               Close
//             </Button>
//           }
//         >
//           <Text>
//             {successMessage} PO Number: <b>{newPoNumber}</b>
//           </Text>
//         </Dialog>

//         <AnalyticalTable
//           data={data}
//           columns={columns}
//           style={{ width: '100%' }}
//           loading={loading}
//           noDataText="No purchase orders available. Click 'Fetch Purchase Orders' above."
//         />
//       </Card>
//     </div>
//   );
// }




// import { useState } from 'react';
// import {
//   Card,
//   CardHeader,
//   AnalyticalTable,
//   Button,
//   BusyIndicator,
//   Dialog,
//   Text
// } from '@ui5/webcomponents-react';
// import AddPurchaseOrderForm from './AddPurchaseOrderForm';
// import {
//   getPurchaseOrders,
//   postPurchaseOrder,
//   patchPurchaseOrderItem
// } from '../services/api';

// function formatSAPDate(dateStr: string) {
//   const match = /\/Date\((\d+)\)\//.exec(dateStr);
//   if (match) {
//     const timestamp = parseInt(match[1], 10);
//     return new Date(timestamp).toLocaleDateString();
//   }
//   return dateStr;
// }

// export default function PurchaseOrderTable() {
//   const [data, setData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [successMessage, setSuccessMessage] = useState<string>('');
//   const [newPoNumber, setNewPoNumber] = useState<string>('');
//   const [showSuccessDialog, setShowSuccessDialog] = useState(false);

//   const [editPo, setEditPo] = useState<any | null>(null);
//   const [showEditDialog, setShowEditDialog] = useState(false);

//   // Fetch PO data
//   const fetchData = async () => {
//     setLoading(true);
//     const res = await getPurchaseOrders();
//     setData(res.d?.results || []);
//     setLoading(false);
//   };

//   // Add New Purchase Order (POST)
//   const handleAddSubmit = async (po: any) => {
//     const response = await postPurchaseOrder(po);
//     const createdPoNumber =
//       response?.d?.PurchaseOrder || response?.PurchaseOrder || 'Unknown';
//     setSuccessMessage('Successfully posted a new record.');
//     setNewPoNumber(createdPoNumber);
//     setShowSuccessDialog(true);
//     setShowAddForm(false);
//     fetchData();
//   };

//   // Open Edit Dialog
//   const handleEditClick = (po: any) => {
//     setEditPo(po);
//     setShowEditDialog(true);
//   };

//   // Edit Purchase Order (PATCH OrderQuantity, NetPriceAmount, Material)
//   const handleEditSubmit = async (updatedPo: any) => {
//     try {
//       const poNumber = updatedPo.PurchaseOrder;
//       const itemNumber =
//         updatedPo.to_PurchaseOrderItem?.[0]?.PurchaseOrderItem ||
//         updatedPo.PurchaseOrderItem;

//       if (!poNumber || !itemNumber) {
//         alert('Purchase Order number and Item number are required!');
//         return;
//       }

//       const payload = {
//         OrderQuantity:
//           updatedPo.to_PurchaseOrderItem?.[0]?.OrderQuantity ||
//           updatedPo.OrderQuantity,
//         NetPriceAmount:
//           updatedPo.to_PurchaseOrderItem?.[0]?.NetPriceAmount ||
//           updatedPo.NetPriceAmount,
//         Material:
//           updatedPo.to_PurchaseOrderItem?.[0]?.Material || updatedPo.Material
//       };

//       await patchPurchaseOrderItem(poNumber, itemNumber, payload);

//       alert('Purchase Order updated successfully!');
//       fetchData(); // ✅ refresh table
//     } catch (err: any) {
//       console.error(err);
//       alert('Failed to update purchase order!');
//     }
//   };

//   const columns = [
//     { Header: 'PO Number', accessor: 'PurchaseOrder' },
//     { Header: 'Company Code', accessor: 'CompanyCode' },
//     { Header: 'Supplier', accessor: 'Supplier' },
//     { Header: 'PO Type', accessor: 'PurchaseOrderType' },
//     {
//       Header: 'Creation Date',
//       accessor: 'CreationDate',
//       Cell: ({ cell }: any) => formatSAPDate(cell.value)
//     },
//     {
//       Header: 'Actions',
//       accessor: 'actions',
//       disableSortBy: true,
//       Cell: ({ row }: any) => (
//         <Button
//           design="Transparent"
//           icon="edit"
//           onClick={() => handleEditClick(row.original)}
//         >
//           Edit
//         </Button>
//       )
//     }
//   ];

//   return (
//     <div style={{ maxWidth: 1200, margin: '40px auto', padding: 16 }}>
//       <Card header={<CardHeader titleText="Purchase Orders" />} style={{ marginBottom: 32 }}>
//         <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
//           <Button design="Emphasized" onClick={fetchData}>
//             Fetch Purchase Orders
//           </Button>
//           <Button onClick={() => setShowAddForm(true)}>Add Purchase Order</Button>
//         </div>

//         {loading && <BusyIndicator active />}

//         {/* Add Purchase Order Dialog */}
//         <Dialog open={showAddForm} headerText="Add Purchase Order">
//           <AddPurchaseOrderForm
//             onSubmit={handleAddSubmit}
//             onCancel={() => setShowAddForm(false)}
//           />
//         </Dialog>

//         {/* Edit Purchase Order Dialog */}
//         <Dialog open={showEditDialog} headerText="Edit Purchase Order">
//           <AddPurchaseOrderForm
//             initialData={editPo}
//             onSubmit={handleEditSubmit}
//             onCancel={() => {
//               setShowEditDialog(false);
//               setEditPo(null);
//             }}
//           />
//         </Dialog>

//         {/* Success Dialog */}
//         <Dialog
//           open={showSuccessDialog}
//           headerText="Success"
//           footer={
//             <Button design="Emphasized" onClick={() => setShowSuccessDialog(false)}>
//               Close
//             </Button>
//           }
//         >
//           <Text>
//             {successMessage} PO Number: <b>{newPoNumber}</b>
//           </Text>
//         </Dialog>

//         <AnalyticalTable
//           data={data}
//           columns={columns}
//           style={{ width: '100%' }}
//           loading={loading}
//           noDataText="No purchase orders available. Click 'Fetch Purchase Orders' above."
//         />
//       </Card>
//     </div>
//   );
// }


import { useState } from "react";
import {
  Card,
  CardHeader,
  AnalyticalTable,
  Button,
  BusyIndicator,
  Dialog,
  Text,
  Input,
} from "@ui5/webcomponents-react";
import AddPurchaseOrderForm from "./AddPurchaseOrderForm";
import { getPurchaseOrders, postPurchaseOrder } from "../services/api";

function formatSAPDate(dateStr: string) {
  const match = /\/Date\((\d+)\)\//.exec(dateStr);
  if (match) {
    const timestamp = parseInt(match[1], 10);
    return new Date(timestamp).toLocaleDateString();
  }
  return dateStr;
}

const padPoItem = (item: string | number | undefined) =>
  item ? item.toString().padStart(5, "0") : "";

export default function PurchaseOrderTable() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [newPoNumber, setNewPoNumber] = useState<string>("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // PATCH dialog state
  const [patchPo, setPatchPo] = useState<any | null>(null);
  const [showPatchDialog, setShowPatchDialog] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState("");
  const [netPriceAmount, setNetPriceAmount] = useState("");
  const [patchError, setPatchError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getPurchaseOrders();
      const orders = res.d?.results || [];

      // Flatten PurchaseOrderItems correctly
      const items: any[] = [];
      orders.forEach((po: any) => {
  const poItems = po.to_PurchaseOrderItem?.results || [];
  poItems.forEach((item: any) => {
    items.push({
      PurchaseOrder: po.PurchaseOrder,
      Supplier: po.Supplier,
      PurchaseOrderType: po.PurchaseOrderType,
      PurchaseOrderItem: item.PurchaseOrderItem,
      OrderQuantity: item.OrderQuantity,
      NetPriceAmount: item.NetPriceAmount,
      PurchaseOrderDate: po.PurchaseOrderDate
    });
  });
});

      setData(items);
    } catch (err) {
      console.error("Failed to fetch purchase orders", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubmit = async (po: any) => {
    try {
      const response = await postPurchaseOrder(po);
      const createdPoNumber =
        response?.d?.PurchaseOrder || response?.PurchaseOrder || "Unknown";
      setSuccessMessage("Successfully posted a new record.");
      setNewPoNumber(createdPoNumber);
      setShowSuccessDialog(true);
      setShowAddForm(false);
      fetchData();
    } catch (err) {
      console.error("Add purchase order failed", err);
    }
  };

  const handlePatchClick = (po: any) => {
    setPatchPo({ ...po, PurchaseOrderItem: padPoItem(po.PurchaseOrderItem) });
    setOrderQuantity(po.OrderQuantity?.toString() || "");
    setNetPriceAmount(po.NetPriceAmount?.toString() || "");
    setPatchError(null);
    setShowPatchDialog(true);
  };

  const handlePatchSubmit = async () => {
    if (!patchPo?.PurchaseOrder || !patchPo?.PurchaseOrderItem) {
      setPatchError("Invalid purchase order or item.");
      return;
    }
    if (isNaN(Number(orderQuantity)) || isNaN(Number(netPriceAmount))) {
      setPatchError("Order Quantity and Net Price must be valid numbers.");
      return;
    }
    const payload = {
      OrderQuantity: Number(orderQuantity),
      NetPriceAmount: Number(netPriceAmount),
    };
    try {
      const response = await fetch(
        `/api/purchaseorderitem/${patchPo.PurchaseOrder}/${patchPo.PurchaseOrderItem}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        setPatchError(`Update failed: ${data.error?.message || JSON.stringify(data)}`);
        return;
      }
      setSuccessMessage("Successfully updated the record.");
      setShowSuccessDialog(true);
      setShowPatchDialog(false);
      setPatchPo(null);
      fetchData();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setPatchError("Update error: " + errorMessage);
      console.error("Patch purchase order item failed", err);
    }
  };

  const columns = [
    { Header: "PO Number", accessor: "PurchaseOrder" },
    { Header: "Supplier", accessor: "Supplier" },
    { Header: "PO Type", accessor: "PurchaseOrderType" },
    {
      Header: "Order Date",
      accessor: "PurchaseOrderDate",
      Cell: ({ cell }: any) => formatSAPDate(cell.value),
    },
    { Header: "Item Number", accessor: "PurchaseOrderItem" },
    { Header: "Order Quantity", accessor: "OrderQuantity" },
    { Header: "Net Price Amount", accessor: "NetPriceAmount" },
    {
      Header: "Update",
      accessor: "update",
      disableSortBy: true,
      Cell: ({ row }: any) => (
        <Button design="Transparent" icon="edit" onClick={() => handlePatchClick(row.original)}>
          Update
        </Button>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: "40px auto", padding: 16 }}>
      <Card header={<CardHeader titleText="Purchase Orders" />} style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
          <Button design="Emphasized" onClick={fetchData}>
            Fetch Purchase Orders
          </Button>
          <Button onClick={() => setShowAddForm(true)}>Add Purchase Order</Button>
        </div>

        {loading && <BusyIndicator active />}

        {/* Add Purchase Order Dialog */}
        <Dialog open={showAddForm} headerText="Add Purchase Order" onClose={() => setPatchError(null)}>
          <AddPurchaseOrderForm onSubmit={handleAddSubmit} onCancel={() => setShowAddForm(false)} />
        </Dialog>

        {/* PATCH Dialog */}
        <Dialog
          open={showPatchDialog}
          headerText="Update Purchase Order Item"
          footer={
            <>
              <Button design="Emphasized" onClick={handlePatchSubmit}>
                Update
              </Button>
              <Button design="Transparent" onClick={() => setShowPatchDialog(false)}>
                Cancel
              </Button>
            </>
          }
          onClose={() => setPatchError(null)}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Text>
              PO Number: <b>{patchPo?.PurchaseOrder}</b>
            </Text>
            <Text>
              PO Item: <b>{patchPo?.PurchaseOrderItem}</b>
            </Text>
            <Input
              value={orderQuantity}
              onChange={(e: any) => setOrderQuantity(e.target.value)}
              placeholder="Order Quantity"
              type="Number"
            />
            <Input
              value={netPriceAmount}
              onChange={(e: any) => setNetPriceAmount(e.target.value)}
              placeholder="Net Price"
              type="Number"
            />
            {patchError && <Text style={{ color: "red" }}>{patchError}</Text>}
          </div>
        </Dialog>

        {/* Success Dialog */}
        <Dialog
          open={showSuccessDialog}
          headerText="Success"
          footer={
            <Button design="Emphasized" onClick={() => setShowSuccessDialog(false)}>
              Close
            </Button>
          }
        >
          <Text>
            {successMessage} {newPoNumber && `PO Number: ${newPoNumber}`}
          </Text>
        </Dialog>

        <AnalyticalTable
          data={data}
          columns={columns}
          style={{ width: "100%" }}
          loading={loading}
          noDataText="No purchase orders available. Click 'Fetch Purchase Orders' above."
        />
      </Card>
    </div>
  );
}
