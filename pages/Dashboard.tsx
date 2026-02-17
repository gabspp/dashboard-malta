
import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Wallet, AlertCircle, CheckCircle2, Calendar } from 'lucide-react';
import { CASH_FLOW_DATA, ACCOUNTS_PAYABLE_DATA, RESTAURANTS } from '../constants';

const StatCard = ({ title, value, icon: Icon, variant = 'default' }: { title: string; value: string; icon: React.ElementType, variant?: 'default' | 'highlight' | 'danger' | 'success' }) => {
  let bgClass = "bg-zinc-900 border-zinc-800";
  let textClass = "text-white";
  let iconBgClass = "bg-zinc-950 border-zinc-800 text-zinc-400";

  if (variant === 'highlight') {
    bgClass = "bg-white border-white";
    textClass = "text-black";
    iconBgClass = "bg-zinc-100 border-zinc-200 text-black";
  } else if (variant === 'danger') {
    iconBgClass = "bg-red-950/30 border-red-900/50 text-red-500";
  } else if (variant === 'success') {
    iconBgClass = "bg-green-950/30 border-green-900/50 text-green-500";
  }

  return (
    <div className={`border p-6 rounded-2xl transition-colors flex flex-col justify-between h-full group ${bgClass}`}>
      <div className="flex justify-between items-start mb-4">
        <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${variant === 'highlight' ? 'text-zinc-500' : 'text-zinc-500'}`}>{title}</span>
        <div className={`p-2 rounded-lg border transition-colors ${iconBgClass}`}>
          <Icon size={18} />
        </div>
      </div>
      <span className={`text-2xl md:text-3xl font-black tracking-tight italic ${textClass}`}>{value}</span>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [selectedRes, setSelectedRes] = useState('CONSOLIDADO');

  const stats = useMemo(() => {
    const cfData = selectedRes === 'CONSOLIDADO' ? CASH_FLOW_DATA : CASH_FLOW_DATA.filter(d => d.restaurant === selectedRes);
    const apData = selectedRes === 'CONSOLIDADO' ? ACCOUNTS_PAYABLE_DATA : ACCOUNTS_PAYABLE_DATA.filter(d => d.restaurant === selectedRes);

    const inflow = cfData.reduce((acc, curr) => acc + curr.inflow, 0);
    const outflow = cfData.reduce((acc, curr) => acc + curr.outflow, 0);
    const remaining = apData.reduce((acc, curr) => acc + curr.remainingToPay, 0);
    const forecast = apData.reduce((acc, curr) => acc + curr.forecastJanuary, 0);
    const paid = forecast - remaining;

    return { inflow, outflow, balance: inflow - outflow, remaining, forecast, paid };
  }, [selectedRes]);

  const trendData = useMemo(() => {
    const days = ['SEG', 'TER', 'QUA', 'QUI', 'SEX'];
    return days.map(day => {
      const dayData = (selectedRes === 'CONSOLIDADO' ? CASH_FLOW_DATA : CASH_FLOW_DATA.filter(d => d.restaurant === selectedRes)).filter(d => d.day === day);
      return {
        name: day,
        entr: dayData.reduce((acc, curr) => acc + curr.inflow, 0),
        sai: dayData.reduce((acc, curr) => acc + curr.outflow, 0),
      };
    });
  }, [selectedRes]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-10">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic">Resumo Executivo</h1>
          <p className="text-zinc-500 font-medium uppercase text-xs tracking-[0.2em]">Visão Geral: {selectedRes}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 bg-zinc-900 p-1.5 rounded-xl border border-zinc-800">
          <button 
            onClick={() => setSelectedRes('CONSOLIDADO')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${selectedRes === 'CONSOLIDADO' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
          >
            Todos
          </button>
          {RESTAURANTS.map(res => (
            <button 
              key={res}
              onClick={() => setSelectedRes(res)}
              className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${selectedRes === res ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
            >
              {res}
            </button>
          ))}
        </div>
      </div>

      {/* WEEKLY SECTION */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-1.5 bg-zinc-900 rounded-lg border border-zinc-800">
            <Calendar size={14} className="text-zinc-400" />
          </div>
          <h2 className="text-sm font-black uppercase tracking-widest text-zinc-400">Fluxo da Semana 05</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Entradas Semana 05" value={formatCurrency(stats.inflow)} icon={TrendingUp} variant="success" />
          <StatCard title="Saídas Semana 05" value={formatCurrency(stats.outflow)} icon={TrendingDown} variant="danger" />
          <StatCard title="Saldo Semana 05" value={formatCurrency(stats.balance)} icon={Wallet} variant="highlight" />
        </div>
      </section>

      {/* MONTHLY SECTION */}
      <section className="space-y-4">
         <div className="flex items-center gap-3 mb-2">
          <div className="p-1.5 bg-zinc-900 rounded-lg border border-zinc-800">
            <Calendar size={14} className="text-zinc-400" />
          </div>
          <h2 className="text-sm font-black uppercase tracking-widest text-zinc-400">Contas a Pagar (Janeiro)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Total Pago (Mês)" value={formatCurrency(stats.paid)} icon={CheckCircle2} />
          <StatCard title="Total Previsto (Mês)" value={formatCurrency(stats.forecast)} icon={AlertCircle} />
          <StatCard title="Falta Pagar (Saldo)" value={formatCurrency(stats.remaining)} icon={AlertCircle} />
        </div>
      </section>
      
      {/* CHART SECTION */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-3xl">
        <h3 className="text-[10px] font-black uppercase tracking-widest mb-6 text-zinc-500">Tendência Diária (Entradas x Saídas)</h3>
        <div className="h-[250px] md:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="gradIn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fff" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#fff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#444', fontSize: 10, fontWeight: 700 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#444', fontSize: 10 }} tickFormatter={(v) => `R$${v/1000}k`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px' }} 
                itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
              />
              <Area type="monotone" name="Entradas" dataKey="entr" stroke="#fff" strokeWidth={3} fillOpacity={1} fill="url(#gradIn)" />
              <Area type="monotone" name="Saídas" dataKey="sai" stroke="#52525b" strokeWidth={2} fillOpacity={0} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
