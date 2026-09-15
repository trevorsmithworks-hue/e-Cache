import React, { useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { formatEther } from 'viem';
import { POWER_COIN_ADDRESS, PWC_ABI, UNISWAP_TRADE_URL } from './contracts';
import { AppKitButton } from '@reown/appkit/react';
import { AIEnergyCalculator } from './components/AIEnergyCalculator';
import { PowerCreditsMint } from './components/PowerCreditsMint';
import { GridSurgeCalculator } from './components/GridSurgeCalculator';
import { PowerBlockMarketplace } from './components/PowerBlockMarketplace';
import { PowerBlockVaultManager } from './components/PowerBlockVaultManager';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'vault' | 'marketplace' | 'ai-oracle' | 'power-credits' | 'grid-surge'
  >('dashboard');
  const [depositInput, setDepositInput] = useState<string>('');
  const [transactions] = useState([
    { id: 1, type: 'Stake', amount: '100 PWC', time: '2 hrs ago', status: 'Completed' },
    { id: 2, type: 'Reflection', amount: '+12.5 PWC', time: '5 hrs ago', status: 'Rewarded' },
  ]);

  const { address, isConnected } = useAccount();

  const { data: balanceData } = useReadContract({
    address: POWER_COIN_ADDRESS,
    abi: PWC_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  const formattedBalance = balanceData ? formatEther(balanceData as bigint) : '0.0';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <span className="text-xl font-black text-white">⚡</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight text-white">e-Cache ($PWC)</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Base Mainnet
                </span>
              </div>
              <p className="text-xs text-slate-400">The Global Decentralized Energy Standard</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-1 bg-slate-950/40 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'dashboard' ? 'bg-cyan-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('ai-oracle')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1 ${
                activeTab === 'ai-oracle' ? 'bg-cyan-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>⚡ AI Compute</span>
            </button>
            <button
              onClick={() => setActiveTab('vault')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'vault' ? 'bg-cyan-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Vault
            </button>
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'marketplace' ? 'bg-cyan-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Marketplace
            </button>
            <button
              onClick={() => setActiveTab('power-credits')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'power-credits' ? 'bg-cyan-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              🔋 Power Credits
            </button>
            <button
              onClick={() => setActiveTab('grid-surge')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'grid-surge' ? 'bg-cyan-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              🌐 Grid Surge
            </button>
          </nav>

          <div className="flex items-center space-x-3">
            {/* Direct Uniswap Base Deep Link */}
            <a
              href={UNISWAP_TRADE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium rounded-xl shadow transition duration-150 flex items-center gap-1.5 text-xs sm:text-sm"
            >
              <span>Trade $PWC</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            {/* Reown AppKit Connect Button */}
            <AppKitButton />
          </div>
        </div>
      </header>

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Wallet Balance</span>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    +0.5% Reflection Active
                  </span>
                </div>
                <div className="mt-4 flex items-baseline space-x-2">
                  <span className="text-3xl font-extrabold text-white">
                    {isConnected ? Number(formattedBalance).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '0.00'}
                  </span>
                  <span className="text-cyan-400 font-bold">$PWC</span>
                </div>
                <p className="mt-1 text-xs text-slate-400">Linked to Global kWh Index</p>
              </div>

              <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Sealed Power Banks</span>
                  <span className="text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                    Max 100 PWC
                  </span>
                </div>
                <div className="mt-4 flex items-baseline space-x-2">
                  <span className="text-3xl font-extrabold text-white">0</span>
                  <span className="text-slate-400 font-medium text-sm">Units Ready</span>
                </div>
                <p className="mt-1 text-xs text-slate-400">Available to Mint into Power Blocks</p>
              </div>

              <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Loyalty Royalty Tier</span>
                  <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full">
                    Gold Tier
                  </span>
                </div>
                <div className="mt-4 flex items-baseline space-x-2">
                  <span className="text-3xl font-extrabold text-white">1.0%</span>
                  <span className="text-slate-400 font-medium text-sm">Marketplace Fee</span>
                </div>
                <p className="mt-1 text-xs text-slate-400">Standard Tier is 2.5%</p>
              </div>
            </div>

            {/* Quick Deposit to Power Bank */}
            <div className="bg-slate-900/60 backdrop-blur-md p-8 rounded-2xl border border-slate-800 shadow-xl">
              <h2 className="text-lg font-bold text-white mb-2">Deposit $PWC into Power Bank</h2>
              <p className="text-sm text-slate-400 mb-6">
                Package your liquid $PWC into containerized micro-savings cells (capped at 100 PWC).
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-xl">
                <input
                  type="number"
                  value={depositInput}
                  onChange={(e) => setDepositInput(e.target.value)}
                  placeholder="Enter amount (e.g., 100)"
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  disabled={!isConnected}
                  className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg transition"
                >
                  Deposit on Base
                </button>
              </div>
            </div>

            {/* Activity Table */}
            <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Recent Protocol Activity</h3>
              <div className="divide-y divide-slate-800">
                {transactions.map((tx) => (
                  <div key={tx.id} className="py-3 flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-3">
                      <span className="text-cyan-400">⚡</span>
                      <span className="font-medium text-white">{tx.type}</span>
                      <span className="text-xs text-slate-500">{tx.time}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold text-emerald-400">{tx.amount}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">{tx.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ai-oracle' && <AIEnergyCalculator />}
        {activeTab === 'vault' && <PowerBlockVaultManager />}
        {activeTab === 'marketplace' && <PowerBlockMarketplace />}
        {activeTab === 'power-credits' && <PowerCreditsMint />}
        {activeTab === 'grid-surge' && <GridSurgeCalculator />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>© 2026 e-Cache Ecosystem • e-powercoin.com • Base Mainnet (Chain ID: 8453)</p>
      </footer>
    </div>
  );
}
