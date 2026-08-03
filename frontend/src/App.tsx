import React, { useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { PWC_ADDRESS, VAULT_ADDRESS, PWC_ABI, VAULT_ABI } from './contracts';
import { AppKitButton } from '@reown/appkit/react';
import { AIEnergyCalculator } from './components/AIEnergyCalculator';
import { PowerCreditsMint } from './components/PowerCreditsMint';
import { GridSurgeCalculator } from './components/GridSurgeCalculator';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'vault' | 'marketplace' | 'ai-oracle' | 'power-credits' | 'grid-surge'>('dashboard');
  const [depositInput, setDepositInput] = useState<string>('');
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'Stake', amount: '100 PWC', time: '2 hrs ago', status: 'Completed' },
    { id: 2, type: 'Reflection', amount: '+12.5 PWC', time: '5 hrs ago', status: 'Rewarded' },
  ]);

  const { address, isConnected } = useAccount();

  // Read live $PWC balance from contract
  const { data: rawPwcBalance } = useReadContract({
    address: PWC_ADDRESS as `0x${string}`,
    abi: PWC_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  });

  const formattedBalance = rawPwcBalance ? Number(formatEther(rawPwcBalance as bigint)).toLocaleString() : '5,000';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8">
      {/* Top Navbar */}
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between pb-6 mb-8 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              e-Cache ($PWC)
            </h1>
            <span className="text-xs bg-blue-900/50 border border-blue-700/50 text-blue-300 px-2 py-0.5 rounded-full">
              v1.2 Mainnet
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Institutional Smart Contract Architecture & Power Grid Fi-Fi
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center bg-slate-900 border border-slate-800 p-1 rounded-xl gap-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
              activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className={`px-3 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
              activeTab === 'vault' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            Vault
          </button>
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`px-3 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
              activeTab === 'marketplace' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            Marketplace
          </button>
          <button
            onClick={() => setActiveTab('ai-oracle')}
            className={`px-3 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center space-x-1 ${
              activeTab === 'ai-oracle' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>⚡</span>
            <span>AI Oracle</span>
          </button>
          <button
            onClick={() => setActiveTab('power-credits')}
            className={`px-3 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center space-x-1 ${
              activeTab === 'power-credits' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🔋</span>
            <span>Power Credits</span>
          </button>
          <button
            onClick={() => setActiveTab('grid-surge')}
            className={`px-3 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center space-x-1 ${
              activeTab === 'grid-surge' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🌐</span>
            <span>Grid Surge</span>
          </button>
        </div>

        <AppKitButton />
      </header>

      {/* Main Tab Content */}
      <main className="max-w-6xl mx-auto">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Wallet $PWC Balance</span>
                <div className="text-3xl font-black text-white mt-2">{formattedBalance}</div>
                <div className="inline-flex items-center mt-3 px-2.5 py-1 rounded-md bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
                  +0.5% Reflection Tax Active
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Active Power Bank Staked</span>
                <div className="text-3xl font-black text-amber-400 mt-2">250 PWC</div>
                <p className="text-xs text-slate-500 mt-3">Hard Cap Limit: 100 PWC per bank</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">EIP-2981 Holder Tier</span>
                <div className="text-3xl font-black text-purple-400 mt-2">Gold Tier</div>
                <p className="text-xs text-purple-300/80 mt-3">1.0% Dynamic Royalty Rate Applied</p>
              </div>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-white mb-1">Quick Deposit to Power Bank</h3>
                <p className="text-xs text-slate-400 mb-4">Simulate staking tokens into your micro-savings vault instantly.</p>

                <div className="flex gap-2">
                  <input
                    type="number"
                    value={depositInput}
                    onChange={(e) => setDepositInput(e.target.value)}
                    placeholder="Max 100 PWC"
                    className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm w-full text-white focus:outline-none focus:border-blue-500"
                  />
                  <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-600/30">
                    Stake
                  </button>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-white mb-4">Recent Protocol Activity</h3>
                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                      <div>
                        <div className="text-sm font-bold text-slate-200">{tx.type} — {tx.amount}</div>
                        <div className="text-xs text-slate-500">{tx.time}</div>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-semibold">
                        {tx.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Oracle Tab View */}
        {activeTab === 'ai-oracle' && <AIEnergyCalculator />}

        {/* Power Credits ($ekWh) Tab View */}
        {activeTab === 'power-credits' && <PowerCreditsMint />}

        {/* Grid Surge & ZK Vault View */}
        {activeTab === 'grid-surge' && <GridSurgeCalculator />}

        {/* Vault Tab Placeholder */}
        {activeTab === 'vault' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
            <span className="text-4xl">🏛️</span>
            <h3 className="text-xl font-bold text-white mt-3">Power Block Vaults</h3>
            <p className="text-sm text-slate-400 mt-1">Multi-year 5, 10, and 20-Year yield-bearing bond vaults.</p>
          </div>
        )}

        {/* Marketplace Tab Placeholder */}
        {activeTab === 'marketplace' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
            <span className="text-4xl">🏪</span>
            <h3 className="text-xl font-bold text-white mt-3">Tiered Royalty Marketplace</h3>
            <p className="text-sm text-slate-400 mt-1">Secondary market trading for yield-bearing Power Blocks with EIP-2981 royalty discounts.</p>
          </div>
        )}
      </main>
    </div>
  );
}
