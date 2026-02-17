
import React, { useState, useMemo } from 'react';
import { CASH_FLOW_DATA, RESTAURANTS } from '../constants';
import { Filter, Download, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const CashFlow: React.FC = () => {
  const [selectedRes, setSelectedRes] = useState<string>('CONSOLIDADO');

  const filteredData = useMemo(() => {
    if (selectedRes === 'CONSOLIDADO') {
      const days = ['SEG', 'TER', 'QUA', 'QUI', 'SEX'];
      return days.map(day => {
        const dayEntries = CASH_FLOW_DATA.filter(d => d.day === day);
        return {
          date: dayEntries[0].date,
          day: day,
          restaurant: 'CONSOLIDADO',
          inflow: dayEntries.reduce((acc, curr) => acc + curr.inflow, 0),
          outflow: dayEntries.reduce((acc, curr) => acc + curr.outflow, 0),
          balance: dayEntries.reduce((acc, curr) => acc + curr.balance, 0),
        };
      });
    }
    return CASH_FLOW_DATA.filter(d => d.restaurant === selectedRes);
  }, [selectedRes]);

  const totals = useMemo(() => {
    return {
      inflow: filteredData.reduce((acc, curr) => acc + curr.inflow, 0),
      outflow: filteredData.reduce((acc, curr) => acc + curr.outflow, 0),
      balance: filteredData.reduce((acc, curr) => acc + curr.balance, 0),
    };
  }, [filteredData]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">Fluxo de Caixa</h1>
          <p className="text-zinc-500 font-medium uppercase text-xs tracking-[0.2em]">Movimentação Semanal: {selectedRes}</p>
        </div>

        <div className="flex items-center gap-2 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
          <button 
            onClick={() => setSelectedRes('CONSOLIDADO')}
            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${selectedRes === 'CONSOLIDADO' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
          >
            Consolidado
          </button>
          {RESTAURANTS.map(res => (
            <button 
              key={res}
              onClick={() => setSelectedRes(res)}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${selectedRes === res ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
            >
              {res}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl group">
          <div className="flex justify-between items-start mb-4">
            <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Entradas</span>
            <TrendingUp size={16} className="text-white" />
          </div>
          <p className="text-3xl font-black italic">{formatCurrency(totals.inflow)}</p>
        </div>
        
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl group">
          <div className="flex justify-between items-start mb-4">
            <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Saídas</span>
            <TrendingDown size={16} className="text-zinc-500" />
          </div>
          <p className="text-3xl font-black italic text-zinc-400">{formatCurrency(totals.outflow)}</p>
        </div>

        <div className={`p-8 rounded-3xl border transition-all duration-300 ${totals.balance >= 0 ? 'bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.1)]' : 'bg-zinc-900 text-white border-zinc-800'}`}>
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Saldo Semana 05</span>
            <DollarSign size={16} />
          </div>
          <p className="text-3xl font-black italic">{formatCurrency(totals.balance)}</p>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-950 border-b border-zinc-800">
                <th className="px-10 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Período</th>
                <th className="px-10 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Entradas</th>
                <th className="px-10 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Saídas</th>
                <th className="px-10 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Resultado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {filteredData.map((entry, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-10 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-black uppercase italic group-hover:translate-x-1 transition-transform">{entry.day}</span>
                      <span className="text-[10px] font-mono text-zinc-600">{entry.date}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-sm font-medium">{formatCurrency(entry.inflow)}</td>
                  <td className="px-10 py-6 text-sm font-medium text-zinc-500">{formatCurrency(entry.outflow)}</td>
                  <td className={`px-10 py-6 text-right text-sm font-black italic ${entry.balance >= 0 ? 'text-white' : 'text-zinc-600'}`}>
                    {formatCurrency(entry.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CashFlow;
