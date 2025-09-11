export default function StakingHubPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">Scorly Staking Hub</h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Stake your <strong>$SCOR tokens</strong> to unlock exclusive benefits, higher-tier access, and governance rights in the Scorly ecosystem.
      </p>

      <section className="mb-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-6">
          <li>Connect your wallet</li>
          <li>Select the amount of $SCOR to stake</li>
          <li>Choose your tier and start unlocking benefits immediately</li>
        </ol>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Stake Now
        </button>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Staking Tiers</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">Tier</th>
                <th className="py-2 px-4 border-b text-left">Requirement</th>
                <th className="py-2 px-4 border-b text-left">Benefits</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b font-semibold">Silver</td>
                <td className="py-2 px-4 border-b">10,000 $SCOR</td>
                <td className="py-2 px-4 border-b">
                  • Access to <strong>AI Scoring Assistant</strong> (basic tier)<br />
                  • 10% discount on SaaS subscriptions<br />
                  • Participation in governance votes
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b font-semibold">Gold</td>
                <td className="py-2 px-4 border-b">100,000 $SCOR</td>
                <td className="py-2 px-4 border-b">
                  • All Silver benefits<br />
                  • <strong>Advanced AI access</strong> (more queries per month)<br />
                  • Early access to new scoring features<br />
                  • 20% subscription discount
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b font-semibold">Platinum</td>
                <td className="py-2 px-4 border-b">250,000 $SCOR</td>
                <td className="py-2 px-4 border-b">
                  • All Gold benefits<br />
                  • Unlimited AI Assistant queries<br />
                  • Access to <strong>premium RWA research reports</strong><br />
                  • VIP badge + <strong>priority support</strong><br />
                  • 30% subscription discount
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Staker Benefits</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>
            <strong>AI Scoring Assistant</strong><br />
            The more you stake, the more queries you can make with our AI-powered scoring chatbot.
          </li>
          <li>
            <strong>Discounts on SaaS Plans</strong><br />
            Pay your subscription with $SCOR and get up to <strong>30% off</strong>.
          </li>
          <li>
            <strong>Governance & Voting</strong><br />
            Help shape Scorly&apos;s scoring methodology, risk weights, and ecosystem treasury allocation.
          </li>
          <li>
            <strong>Exclusive Research & Education</strong><br />
            Unlock access to the <strong>Scorly Academy Advanced Courses</strong>, quarterly benchmark reports, and industry insights.
          </li>
          <li>
            <strong>NFT Credentials</strong><br />
            Earn unique NFTs (e.g., <strong>Certified RWA Analyst</strong>, <strong>Risk Reviewer</strong>) tied to your staking level.
          </li>
          <li>
            <strong>Future Rewards</strong> <em>(planned)</em><br />
            <em>Revenue-sharing pools from enterprise integrations<br />
            Cross-ecosystem collateral utility (DeFi borrowing/lending)<br />
            Launchpad access to new tokenized RWA issuances</em>
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Staking Conditions</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            <strong>Lock-up:</strong> Flexible; you can unstake anytime, but some benefits (discounts, certificates) may require a <strong>30-day minimum stake</strong>.
          </li>
          <li>
            <strong>Rewards:</strong> Primarily in <strong>access, discounts, and privileges</strong>; revenue-sharing features will be introduced in later phases.
          </li>
          <li>
            <strong>Governance Power:</strong> Calculated based on staked balance at snapshot time.
          </li>
        </ul>
      </section>

    </div>
  );
}