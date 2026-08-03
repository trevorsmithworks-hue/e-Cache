import React, { useState } from 'react';

export const PowerCreditsMint: React.FC = () => {
  const [pwcAmount, setPwcAmount] = useState<string>('100');
  const kwhRateCents = 16; // $0.16 USD / kWh target
  const pwcRateCents = 16; // $0.16 USD / PWC market price

  const parsedPwc = parseFloat(pwcAmount) || 0;
  const estimatedEkWh = (parsedPwc * pwcRateCents) / kwhRateCents;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white max-w-2xl mx-auto shadow-2xl mt-6">
      <div className="flex items-center space-x-3 mb-6">
        <span className="text-3xl">🔋</span>
        <div>
          <h2 className="text-xl font-bold">Enterprise Power Credit ($ekWh) Mint</h2>
          <p className="text-sm text-slate-400">
            Burn $PWC to lock in non-volatile corporate electrical compute credits
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-xs uppercase text-slate-400 mb-2">Amount of $PWC to Burn</label>
          <input
            type="number"
            value={pwcAmount}
            onChange={(e) => setPwcAmount(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 500"
          />
        </div>

        <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Target kWh USD Value:</span>
            <span className="font-semibold text-slate-200">${(kwhRateCents / 100).toFixed(2)} USD</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Deflationary $PWC Burn:</span>
            <span className="font-semibold text-red-400">-{parsedPwc.toLocaleString()} PWC</span>
          </div>
          <div className="flex justify-between border-t border-slate-800 pt-2 text-base">
            <span className="font-bold text-white">Power Credits ($ekWh) Minted:</span>
            <span className="font-bold text-cyan-400">{estimatedEkWh.toLocaleString()} ekWh</span>
          </div>
        </div>
      </div>

      <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg shadow-cyan-500/20">
        Burn $PWC & Mint $ekWh Credits
      </button>
    </div>
  );
};
