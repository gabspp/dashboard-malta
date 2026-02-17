
import { CashFlowEntry, AccountsPayable } from './types';

export const CASH_FLOW_DATA: CashFlowEntry[] = [
  // CAM
  { date: '26/01/2026', day: 'SEG', restaurant: 'CAM', inflow: 26458.47, outflow: 44660.05, balance: -18201.58 },
  { date: '27/01/2026', day: 'TER', restaurant: 'CAM', inflow: 19048.31, outflow: 16096.36, balance: 2951.95 },
  { date: '28/01/2026', day: 'QUA', restaurant: 'CAM', inflow: 49348.68, outflow: 11301.82, balance: 38046.86 },
  { date: '29/01/2026', day: 'QUI', restaurant: 'CAM', inflow: 14096.35, outflow: 13267.67, balance: 828.68 },
  { date: '30/01/2026', day: 'SEX', restaurant: 'CAM', inflow: 17433.14, outflow: 107072.50, balance: -89639.40 },
  // DESIREE
  { date: '26/01/2026', day: 'SEG', restaurant: 'DESIREE', inflow: 48940.63, outflow: 29180.11, balance: 19760.52 },
  { date: '27/01/2026', day: 'TER', restaurant: 'DESIREE', inflow: 32436.91, outflow: 33115.71, balance: -678.80 },
  { date: '28/01/2026', day: 'QUA', restaurant: 'DESIREE', inflow: 19393.61, outflow: 11712.70, balance: 7680.91 },
  { date: '29/01/2026', day: 'QUI', restaurant: 'DESIREE', inflow: 39147.75, outflow: 16206.98, balance: 22940.77 },
  { date: '30/01/2026', day: 'SEX', restaurant: 'DESIREE', inflow: 48598.39, outflow: 90499.48, balance: -41901.09 },
  // MMEAT
  { date: '26/01/2026', day: 'SEG', restaurant: 'MMEAT', inflow: 25498.32, outflow: 47269.63, balance: -21771.31 },
  { date: '27/01/2026', day: 'TER', restaurant: 'MMEAT', inflow: 27095.27, outflow: 20938.33, balance: 6156.94 },
  { date: '28/01/2026', day: 'QUA', restaurant: 'MMEAT', inflow: 28203.84, outflow: 8722.08, balance: 19481.76 },
  { date: '29/01/2026', day: 'QUI', restaurant: 'MMEAT', inflow: 18843.51, outflow: 8556.76, balance: 10286.75 },
  { date: '30/01/2026', day: 'SEX', restaurant: 'MMEAT', inflow: 19894.15, outflow: 56373.04, balance: -36478.89 }
];

export const ACCOUNTS_PAYABLE_DATA: AccountsPayable[] = [
  { restaurant: 'CAM', realizedUntilNov23: 807137.39, forecastJanuary: 1113155.40, remainingToPay: 306017.98 },
  { restaurant: 'DESIREE', realizedUntilNov23: 848481.58, forecastJanuary: 1100662.65, remainingToPay: 252181.07 },
  { restaurant: 'MMEAT', realizedUntilNov23: 545790.93, forecastJanuary: 806391.42, remainingToPay: 260600.49 }
];

export const RESTAURANTS = ['CAM', 'DESIREE', 'MMEAT'];

export const LOGO_SVG = (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="4" fill="white"/>
    <path d="M10 30V14H15L20 22L25 14H30V30H26V19.5L20 29L14 19.5V30H10Z" fill="black"/>
    <path d="M8 8H32V32H8V8ZM6 6V34H34V6H6Z" fill="white"/>
  </svg>
);
