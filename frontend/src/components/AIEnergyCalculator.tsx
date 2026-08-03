import React, { useState } from 'react';

export const AIEnergyCalculator: React.FC = () => {
  const [model, setModel] = useState<string>('gpt-4o');
  const [tokenCount, setTokenCount] = useState<number>(1000000);

  // Model efficiencies (Joules / 1k tokens)
  const efficiencies: Record<string, number> = {
    'gpt-4o': 36000,
    'llama-3-70b': 12000,
    'claude-haiku': 3000,
    'light-model': 1500,
  };

  const joulesPerKilo = efficiencies[model] || 36000;
  const totalJoules = (tokenCount * joulesPerKilo) / 1000;
  const totalKWh = totalJoules / 3600000;
  const globalKwhPriceUSD = 0.16; // $0.16 / kWh
  const pwcPriceUSD = 0.16;       // $0.16 / PWC

  const usdCost = totalKWh * globalKwhPriceUSD;
  const pwcCost = usdCost / pwcPriceUSD;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white max-w-2xl mx-auto shadow-2xl mt-6">
      <div className="flex items-center space-x-3 mb-6">
        <span className="text-3xl">⚡</span>
        <div>
          <h2 className="text-xl font-bold">AI Energy & Compute Audit Oracle</h2>
          <p className="text-sm text-slate-400">
            Real-time conversion of AI FLOPs & electricity footprint into $PWC
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs uppercase text-slate-400 mb-2">Select AI Model</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="gpt-4o">GPT-4o (~36 Joules/token)</option>
            <option value="llama-3-70b">Llama 3 70B (~12 Joules/token)</option>
            <option value="claude-haiku">Claude Haiku (~3 Joules/token)</option>
            <option value="light-model">Light Model (~1.5 Joules/token)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase text-slate-400 mb-2">Inference Tokens</label>
          <input
            type="number"
            value={tokenCount}
            onChange={(e) => setTokenCount(Number(e.target.value))}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 1000000"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 bg-slate-950 p-4 rounded-lg border border-slate-800 text-center">
        <div>
          <span className="block text-xs text-slate-500 uppercase">Power Draw</span>
          <span className="text-lg font-bold text-cyan-400">{totalKWh.toFixed(4)} kWh</span>
        </div>
        <div>
          <span className="block text-xs text-slate-500 uppercase">Energy Cost</span>
          <span className="text-lg font-bold text-green-400">${usdCost.toFixed(2)} USD</span>
        </div>
        <div>
          <span className="block text-xs text-slate-500 uppercase font-semibold">PWC Cost</span>
          <span className="text-lg font-bold text-yellow-400">{pwcCost.toFixed(2)} PWC</span>
        </div>
      </div>
    </div>
  );
};
