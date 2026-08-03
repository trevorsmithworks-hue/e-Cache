import React, { useState } from 'react';

interface Listing {
  id: number;
  title: string;
  termYears: number;
  principalPwc: number;
  accruedYieldPwc: number;
  priceUsdc: number;
  seller: string;
  tier: 'Gold' | 'Silver' | 'Bronze';
}

export const PowerBlockMarketplace: React.FC = () => {
  const [userTier] = useState<'Gold' | 'Silver' | 'Bronze'>('Gold');
  
  // Dynamic EIP-2981 royalty discount rates based on trader tier
  const royaltyRates = {
    Gold: 1.0,    // 1.0% Royalty Fee (50% Discount)
    Silver: 1.5,  // 1.5% Royalty Fee (25% Discount)
    Bronze: 2.0,  // 2.0% Standard Fee
  };

  const [listings] = useState<Listing[]>([
    {
      id: 101,
      title: 'Power Block #101 (10 x Power Banks)',
      termYears: 10,
      principalPwc: 1000,
      accruedYieldPwc: 150,
      priceUsdc: 184,
      seller: '0x71C...3a90',
      tier: 'Gold',
    },
    {
      id: 204,
      title: 'Power Block #204 (50 x Power Banks)',
      termYears: 20,
      principalPwc: 5000,
      accruedYieldPwc: 1250,
      priceUsdc: 1000,
      seller: '0x94B...e112',
      tier: 'Silver',
    },
    {
      id: 309,
      title: 'Power Block #309 (5 x Power Banks)',
      termYears: 5,
      principalPwc: 500,
      accruedYieldPwc: 37.5,
      priceUsdc: 86,
      seller: '0x3F2...88b1',
      tier: 'Bronze',
    },
  ]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Tier Badge & Royalty Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-2xl">
        <div>
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🏪</span>
            <h2 className="text-xl font-bold text-white">EIP-2981 Tiered Royalty Marketplace</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Trade yield-bearing Power Block bond NFTs with transferrable yield rights and automated creator royalties.
          </p>
        </div>

        <div className="bg-slate-950 border border-purple-800/50 p-4 rounded-xl text-center md:text-right min-w-[220px]">
          <span className="text-xs uppercase text-slate-400 font-medium">Your Trader Status</span>
          <div className="text-lg font-black text-purple-400">{userTier} Tier Member</div>
          <div className="text-xs text-emerald-400 font-semibold mt-0.5">
            {royaltyRates[userTier]}% Royalty Discount Applied
          </div>
        </div>
      </div>

      {/* Active Secondary Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {listings.map((item) => {
          const creatorRoyaltyUsdc = (item.priceUsdc * (royaltyRates[userTier] / 100)).toFixed(2);
          const sellerNetUsdc = (item.priceUsdc - parseFloat(creatorRoyaltyUsdc)).toFixed(2);

          return (
            <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-600/50 transition-all shadow-lg">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold bg-blue-900/40 text-blue-300 border border-blue-700/40 px-2.5 py-1 rounded-md">
                    {item.termYears}-Year Horizon
                  </span>
                  <span className="text-xs font-semibold text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
                    {item.tier} Seller
                  </span>
                </div>

                <h3 className="font-bold text-white text-base mb-2">{item.title}</h3>

                <div className="space-y-2 bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Principal Locked:</span>
                    <span className="font-semibold text-white">{item.principalPwc.toLocaleString()} PWC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Accrued Yield:</span>
                    <span className="font-semibold text-emerald-400">+{item.accruedYieldPwc} PWC</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-800 pt-1.5">
                    <span className="text-slate-400">Creator Royalty ({royaltyRates[userTier]}%):</span>
                    <span className="font-semibold text-purple-400">${creatorRoyaltyUsdc} USDC</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-xs text-slate-500 uppercase block">Listing Price</span>
                    <span className="text-xl font-black text-cyan-400">${item.priceUsdc} USDC</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 uppercase block">Seller Receives</span>
                    <span className="text-sm font-semibold text-slate-300">${sellerNetUsdc} USDC</span>
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl transition-all shadow-lg shadow-blue-600/30">
                  Buy Power Block
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

