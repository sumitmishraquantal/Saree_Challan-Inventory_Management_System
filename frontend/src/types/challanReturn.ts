export interface ChallanReturn {

  id?: number;

  challan_id: number;

  return_date: string;

  returned_quantity: number;

  adjustment_quantity: number;

  remarks?: string;
}