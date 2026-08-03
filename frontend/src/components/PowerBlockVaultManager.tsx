import React, { useState } from 'react';

interface VaultPosition {
  id: number;
  blockName: string;
  banksLocked: number;
  principalPwc: number;
  termYears: number;
  startDate: string;
  maturityDate: string;
  apyMultiplier: string;
  accruedYieldPwc: number;
  isBoosted: boolean;
}

export const PowerBlockVaultManager: React.FC = () => {
  const [activePositions, setActivePositions] = useState<VaultPosition[]>([
    {
      id: 1,
      blockName: 'Power Block Alpha #001',
      banksLocked: 10,
      principalPwc: 1000,
      termYears: 10,
      startDate: '2026-01-15',
      maturityDate: '2036-01-15',
      apyMultiplier: '2.5x Growth',
      accruedYieldPwc: 125.0,
      isBoosted: true,
    },
    {
      id: 2,
      blockName: 'Power Block Sovereign #042',
      banksLocked: 50,
      principalPwc: 5000,
      termYears: 20,
      startDate: '2025-08-01',
      maturityDate: '2045-08-01',
      apyMultiplier: '5.0x Sovereign',
      accruedYieldPwc: 1120.5,
      isBoosted: true,
    },
  ]);

  const [banksToMerge, setBanksToMerge] = useState<number>(5);
  const [selectedTerm, setSelectedTerm] = useState<number>(5);

  const handleMergeAndLock = () => {
    const principal = banksToMerge * 100;
    const newPosition: VaultPosition = {
      id: Date.now(),
      blockName: `Power Block Vault #${Math.floor(100 + Math.random() * 900)}`,
      banksLocked: banksToMerge,
      principalPwc: principal,
      termYears: selectedTerm,
      startDate: new Date().toISOString().split('T')[0],
      maturityDate: `${new Date().getFullYear() + selectedTerm}-08-03`,
      apyMultiplier: selectedTerm === 5 ? '1.5x Base' : selectedTerm === 10 ? '2.5x Growth' : '5.0x Sovereign',
      accruedYieldPwc: 0.0,
      isBoosted: false,
    };

    setActivePositions([newPosition, ...activePositions]);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto text-white">
      {/* Vault Creation Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center space-x-3 mb-6">
          <span className="text-3xl">🏛️</span>
          <div>
            <h2 className="text-xl font-bold">Power Block Vault Bond Manager</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Merge 100 $PWC Power Banks into multi-year yield-bearing institutional energy bonds.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-xs uppercase text-slate-400 mb-2">Power Banks to Merge (100 PWC each)</label>
            <input
              type="number"
              min={1}
              value={banksToMerge}
              onChange={(e) => setBanksToMerge(Math.max(1, Number(e.target.value)))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-blue-500"
            />
            <span className="text-xs text-cyan-400 mt-1 block">
              = {(banksToMerge * 100).toLocaleString()} $PWC Locked Principal
            </span>
          </div>

          <div>
            <label className="block text-xs uppercase text-slate-400 mb-2">Vault Horizon & Multiplier</label>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-blue-500"
            >
              <option value={5}>5-Year Horizon (1.5x Yield Multiplier)</option>
              <option value={10}>10-Year Horizon (2.5x Yield Multiplier)</option>
              <option value={20}>20-Year Horizon (5.0x Yield Multiplier)</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleMergeAndLock}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-600/20 text-sm"
            >
              Seal & Vault Power Block
            </button>
          </div>
        </div>
      </div>

      {/* Active Vault Positions List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center justify-between">
          <span>Active Power Block Bond Holdings ({activePositions.length})</span>
          <span className="text-xs text-amber-400 font-semibold bg-amber-950/60 border border-amber-800/40 px-3 py-1 rounded-full">
            ⚠️ Early Unlock Penalty: Forfeits All Interest Yields
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activePositions.map((pos) => (
            <div key={pos.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-base font-bold text-white">{pos.blockName}</h4>
                  <span className="text-xs text-slate-400">
                    {pos.banksLocked} Power Banks ({pos.principalPwc.toLocaleString()} PWC)
                  </span>
                </div>
                <span className="text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/50 px-2.5 py-1 rounded-md">
                  {pos.apyMultiplier}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-500 block uppercase">Lock Date</span>
                  <span className="font-semibold text-slate-300">{pos.startDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase">Maturity Date</span>
                  <span className="font-semibold text-yellow-400">{pos.maturityDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase">Principal</span>
                  <span className="font-semibold text-white">{pos.principalPwc.toLocaleString()} PWC</span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase">Accrued Yield</span>
                  <span className="font-bold text-emerald-400">+{pos.accruedYieldPwc.toFixed(1)} PWC</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2.5 rounded-xl border border-slate-700 transition-all">
                  List on Marketplace
                </button>
                <button
                  onClick={() => alert(`Early unlock penalty warning: Unlocking will forfeit all +${pos.accruedYieldPwc} PWC interest and return strictly your ${pos.principalPwc} PWC principal.`)}
                  className="bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-800/50 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
                >
                  Early Unlock (Forfeit Yields)
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
