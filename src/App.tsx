import { ShellBar, ShellBarItem, Avatar } from '@ui5/webcomponents-react';
import PurchaseOrderTable from "./components/PurchaseOrderTable";

export default function App() {
  return (
    <>
      <ShellBar
        primaryTitle="Purchase Order Dashboard"
        profile={<Avatar initials= 'PO' />}
      >
        <ShellBarItem icon="home" text="Home" />
      </ShellBar>
      <PurchaseOrderTable />
    </>
  );
}
