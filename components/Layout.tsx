
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Wallet, ReceiptText, Menu, X } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Resumo Executivo" },
    { to: "/fluxo-caixa", icon: Wallet, label: "Fluxo de Caixa" },
    { to: "/contas-pagar", icon: ReceiptText, label: "Contas a Pagar" }
  ];

  return (
    <div className="flex min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-black border-r border-zinc-800 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="p-8 flex items-center justify-between">
          <h1 className="text-3xl font-black tracking-tighter italic text-white">MALTA</h1>
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-zinc-500">
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-300 group
                ${isActive 
                  ? 'bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                  : 'text-zinc-500 hover:text-white hover:bg-zinc-900'}
              `}
            >
              <item.icon size={20} />
              <span className="text-sm uppercase tracking-widest font-bold">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen flex flex-col overflow-x-hidden">
        <header className="h-16 md:h-20 border-b border-zinc-800 flex items-center justify-between px-4 md:px-10 sticky top-0 bg-black/80 backdrop-blur-xl z-30">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden text-white p-1"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
          <div className="text-[10px] md:text-xs font-mono text-zinc-500 font-bold tracking-widest">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()}
          </div>
        </header>
        
        <div className="flex-1 p-4 md:p-10 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
};
