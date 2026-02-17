
import React, { useState, useMemo } from 'react';
import { ACCOUNTS_PAYABLE_DATA, RESTAURANTS } from '../constants';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { AlertCircle, CheckCircle2, LayoutGrid, List } from 'lucide-react';

const AccountsPayable: React.FC = () => {
  const [activeRes, setActiveRes] = useState<string>('CONSOLIDADO');
  const [viewMode, setViewMode] = useState<'visual' | 'table'>('visual');

  const stats = useMemo(() => {
    const data = activeRes === 'CONSOLIDADO' ? ACCOUNTS_PAYABLE_DATA : ACCOUNTS_PAYABLE_DATA.filter(r => r.restaurant === activeRes);
    const realized = data.reduce((a, b) => a + b.realizedUntilNov23, 0);
    const forecast = data.reduce((a, b) => a + b.forecastJanuary, 0);
    const remaining = data.reduce((a, b) => a + b.remainingToPay, 0);
    const percentDone = (realized / forecast) * 100;

    return { realized, forecast, remaining, percentDone };
  }, [activeRes]);

  const pieData = [
    { name: 'Realizado', value: stats.realized },
    { name: 'Pendente', value: stats.remaining }
  ];

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">Contas a Pagar</h1>
          <p className="text-zinc-500 font-medium uppercase text-xs tracking-[0.2em]">Status de Realização Mensal (Janeiro)</p>
        </div>

        <div className="flex items-center gap-3">
           <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800">
            <button 
              onClick={() => setViewMode('visual')}
              className={`p-2 rounded-md ${viewMode === 'visual' ? 'bg-white text-black' : 'text-zinc-500'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-md ${viewMode === 'table' ? 'bg-white text-black' : 'text-zinc-500'}`}
            >
              <List size={18} />
            </button>
          </div>
          
          <select 
            value={activeRes}
            onChange={(e) => setActiveRes(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-xl outline-none hover:border-zinc-700 transition-all cursor-pointer appearance-none text-center"
          >
            <option value="CONSOLIDADO">Grupo Consolidado</option>
            {RESTAURANTS.map(res => <option key={res} value={res}>{res}</option>)}
          </select>
        </div>
      </div>

      {viewMode === 'visual' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Stats */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                <CheckCircle2 size={200} className="text-white" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                <div className="space-y-8">
                  <div>
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">Realizado até o momento</span>
                    <h2 className="text-5xl font-black tracking-tighter">{formatCurrency(stats.realized)}</h2>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">Previsão Total (Janeiro)</span>
                    <h3 className="text-3xl font-bold text-zinc-400 tracking-tight">{formatCurrency(stats.forecast)}</h3>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center md:items-end">
                   <div className="text-center md:text-right">
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">Progresso Financeiro</span>
                    <span className="text-7xl font-black italic">{stats.percentDone.toFixed(0)}%</span>
                  </div>
                  <div className="w-full max-w-[200px] h-2 bg-zinc-800 mt-6 rounded-full overflow-hidden">
                    <div className="h-full bg-white transition-all duration-1000" style={{ width: `${stats.percentDone}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-zinc-800 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <AlertCircle size={16} className="text-zinc-500" />
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Saldo Remanescente a Pagar</span>
                </div>
                <span className="text-xl font-black">{formatCurrency(stats.remaining)}</span>
              </div>
            </div>

            {/* If Consolidated, show breakdown cards */}
            {activeRes === 'CONSOLIDADO' && (
              <div className="grid grid-cols-3 gap-4">
                {ACCOUNTS_PAYABLE_DATA.map(item => (
                  <div 
                    key={item.restaurant} 
                    onClick={() => setActiveRes(item.restaurant)}
                    className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:bg-zinc-800 transition-all cursor-pointer group"
                  >
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-3 group-hover:text-white">{item.restaurant}</span>
                    <p className="text-lg font-black">{formatCurrency(item.remainingToPay)}</p>
                    <p className="text-[9px] text-zinc-600 uppercase font-bold mt-1">em aberto</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Composition Chart */}
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl flex flex-col items-center">
            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-10 w-full text-center">Mix de Realização</h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={90}
                    outerRadius={130}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    <Cell fill="#FFFFFF" />
                    <Cell fill="#27272a" />
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '12px', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 flex gap-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-white rounded-sm" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Pago</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-zinc-800 rounded-sm" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Pendente</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/50">
                <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] border-b border-zinc-800">Unidade</th>
                <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] border-b border-zinc-800 text-right">Realizado (23/11)</th>
                <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] border-b border-zinc-800 text-right">Previsto (Jan)</th>
                <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] border-b border-zinc-800 text-right">Gap Pendente</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {(activeRes === 'CONSOLIDADO' ? ACCOUNTS_PAYABLE_DATA : ACCOUNTS_PAYABLE_DATA.filter(r => r.restaurant === activeRes)).map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="px-8 py-6 text-sm font-black uppercase tracking-widest">{row.restaurant}</td>
                  <td className="px-8 py-6 text-sm font-medium text-right">{formatCurrency(row.realizedUntilNov23)}</td>
                  <td className="px-8 py-6 text-sm font-medium text-zinc-500 text-right">{formatCurrency(row.forecastJanuary)}</td>
                  <td className="px-8 py-6 text-sm font-black text-right text-white italic">{formatCurrency(row.remainingToPay)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-black">
              <tr>
                <td className="px-8 py-6 text-[10px] font-black uppercase tracking-widest">Total Geral</td>
                <td className="px-8 py-6 text-sm font-black text-right">{formatCurrency(stats.realized)}</td>
                <td className="px-8 py-6 text-sm font-black text-right text-zinc-500">{formatCurrency(stats.forecast)}</td>
                <td className="px-8 py-6 text-xl font-black text-right underline underline-offset-8">{formatCurrency(stats.remaining)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default AccountsPayable;
