export interface Challan {

  id?: number;

  challan_number?: string;

  vendor_id: number;

  supplier_id: number;

  vendor_name?: string;

  supplier_name?: string;

  quantity: number;

  returned_quantity?: number;

  pending_quantity?: number;

  unit: string;

  transport_type?: string;

  lr_number?: string;

  program?: string;

  rate?: number;

  sent_date: string;

  status?: string;
}