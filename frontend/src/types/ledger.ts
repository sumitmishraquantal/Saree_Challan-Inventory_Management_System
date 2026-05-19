export interface LedgerEntry {

  challan_number: string;

  vendor: string;

  supplier: string;

  sent_quantity: number;

  returned_quantity: number;

  pending_quantity: number;

  status: string;

  sent_date: string;
}