import React, { useState } from 'react';

export const GridSurgeCalculator: React.FC = () => {
  const [stakedPwc, setStakedPwc] = useState<number>(1000);
  const [termYears, setTermYears] = useState<number>(5);
  const [isGridSurgeActive, setIsGridSurgeActive] = useState<bool>(true);
  const [hasZkGreenProof, setHasZkGreenProof] = useState<bool>(true);

  // APY Breakdown
  const baseApy = 5.0;
  const gridSurgeApy = isGridSurgeActive ? 3.0 : 0.0;
  const greenZkApy = hasZkGreenProof ? 2.0 : 0.0;
  const totalApy = baseApy + gridSurgeApy + greenZkApy;

  // Simple APY calculation
  const annualYieldPwc = stakedPwc * (totalApy / 100);
  const totalMaturityPwc = stakedPwc + annualYieldPwc * termYears;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white max-w-2xl mx-auto shadow-2xl mt-6">
      <div className="flex items-center space-x-3 mb-6">
        <span className="text-3xl">🌐</span>
        <div>
          <h2 className="text-xl font-bold">Demand-Response Grid Surge & ZK Vault</h2>
          <p className="text-sm text-slate-400">
            Simulate time-weighted Power Block bond yields with dynamic grid incentives
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs uppercase text-slate-400 mb-2">$PWC Principal Stake</label>
          <input
            type="number"
            value={stakedPwc}
            onChange={(e) => setStakedPwc(Number(e.target.value))}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 1000"
          />
        </div>

        <div>
          <label className="block text-xs uppercase text-slate-400 mb-2">Bond Term Horizon</label>
          <select
            value={termYears}
            onChange={(e) => setTermYears(Number(e.target.value))}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={5}>5-Year Power Block (1.5x Multiplier)</option>
            <option value={10}>10-Year Power Block (2.5x Multiplier)</option>
            <option value={20}>20-Year Power Block (5.0x Multiplier)</option>
          </select>
        </div>
      </div>

      {/* Yield Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div 
          onClick={() => setIsGridSurgeActive(!isGridSurgeActive)}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            isGridSurgeActive ? 'bg-amber-950/40 border-amber-600/60' : 'bg-slate-950 border-slate-800 opacity-60'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-amber-300">⚡ Demand-Response Grid Surge</span>
            <span className="text-xs font-bold bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded">+3.0% APY</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Active when regional power grids experience peak stress conditions.</p>
        </div>

        <div 
          onClick={() => setHasZkGreenProof(!hasZkGreenProof)}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            hasZkGreenProof ? 'bg-emerald-950/40 border-emerald-600/60' : 'bg-slate-950 border-slate-800 opacity-60'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-emerald-300">🌱 zk-IoT Green Attestation</span>
            <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">+2.0% APY</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Verified zero-knowledge proof of solar, wind, or hydro power draw.</p>
        </div>
      </div>

      {/* Yield Summary Card */}
      <div className="grid grid-cols-3 gap-3 bg-slate-950 p-4 rounded-lg border border-slate-800 text-center">
        <div>
          <span className="block text-xs text-slate-500 uppercase">Effective APY</span>
          <span className="text-lg font-bold text-cyan-400">{totalApy.toFixed(1)}%</span>
        </div>
        <div>
          <span className="block text-xs text-slate-500 uppercase">Est. Annual Return</span>
          <span className="text-lg font-bold text-emerald-400">+{annualYieldPwc.toFixed(1)} PWC</span>
        </div>
        <div>
          <span className="block text-xs text-slate-500 uppercase font-semibold">Total at Maturity</span>
          <span className="text-lg font-bold text-yellow-400">{totalMaturityPwc.toFixed(0)} PWC</span>
        </div>
      </div>
    </div>
  );
};
