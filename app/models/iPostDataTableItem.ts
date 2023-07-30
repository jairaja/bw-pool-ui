export default interface iPostDataTableItem extends Record<string, any> {
  desc: string;
  sharePp: number;
  startTime: number;
  startDate: string;
  details: string;
  fromTo: string;
  // [k: string]: any;
}
