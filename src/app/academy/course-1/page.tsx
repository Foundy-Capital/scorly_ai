'use client';

import { useState } from 'react';

export default function Course1Page() {
  const [practice1, setPractice1] = useState('');
  const [practice2, setPractice2] = useState('');
  const [practice3, setPractice3] = useState('');
  const [practice4, setPractice4] = useState('');
  const [practice5, setPractice5] = useState('');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">📚 Scorly Academy</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Introductory Course: Tokenized RWA Analytics</h2>
        <p className="text-lg text-gray-600">*Exclusive for $SCOR holders*</p>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Welcome to Scorly Academy!</h3>
          <p className="mb-4">
            In an era where digital assets are rapidly converging with traditional finance, understanding tokenized Real-World Assets (RWAs) is no longer optional - it's essential. This introductory course, designed exclusively for $SCOR holders, provides a foundational yet comprehensive understanding of tokenized RWAs, equipping you with the knowledge and tools to navigate this burgeoning market with confidence. From legal intricacies to technical architectures, and from market dynamics to issuer reputations, we will dissect the multifaceted landscape of RWAs, culminating in the application of Scorly's advanced AI-powered scoring methodology.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Learning Objectives</h3>
          <p className="mb-4">By the end of this course, learners will be able to:</p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Understand what tokenized RWAs are and why they matter, exploring their diverse forms and transformative potential.</li>
            <li>Evaluate the main <strong>legal, financial, and technical risks</strong> inherent in RWA tokens, identifying potential pitfalls and red flags.</li>
            <li>Apply robust scoring methodologies, particularly Scorly's multi-factor model, to systematically analyze RWA projects.</li>
            <li>Compare and contrast various RWA projects using both <strong>quantitative and qualitative data</strong>, fostering a critical analytical perspective.</li>
            <li>Prepare a concise and insightful <strong>due diligence report</strong> for an RWA project, demonstrating practical application of learned concepts.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Module 1: Foundations of Tokenized RWAs</h3>

          <h4 className="text-lg font-medium mb-2">1.1. What are Real-World Assets (RWAs)?</h4>
          <p className="mb-4">
            Real-World Assets (RWAs) refer to tangible or intangible assets that exist outside the blockchain and are subsequently represented on-chain as digital tokens. These assets span a vast spectrum, from traditional financial instruments to physical commodities and intellectual property. The tokenization process transforms these diverse assets into programmable, divisible, and transferable digital tokens, unlocking new avenues for liquidity, transparency, and accessibility.
          </p>

          <p className="mb-4"><strong>Examples of RWAs include:</strong></p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li><strong>Real Estate:</strong> Commercial properties, residential homes, land parcels. Tokenization allows for fractional ownership, making large assets accessible to a broader investor base and enhancing liquidity.</li>
            <li><strong>Treasuries and Bonds:</strong> Government bonds, corporate bonds, and other fixed-income securities. Tokenizing these assets can streamline issuance, settlement, and transfer processes, reducing intermediaries and costs.</li>
            <li><strong>Commodities:</strong> Gold, silver, oil, agricultural products. Tokenization can simplify ownership, storage, and trading of these physical assets.</li>
            <li><strong>Equities:</strong> Shares in private or public companies.</li>
            <li><strong>Art and Collectibles:</strong> Fine art, rare wines, luxury goods.</li>
            <li><strong>Intellectual Property:</strong> Music royalties, patents, copyrights.</li>
            <li><strong>Private Credit:</strong> Loans, invoices, and other forms of private debt.</li>
          </ul>

          <h4 className="text-lg font-medium mb-2">1.2. Why Tokenize? The Transformative Potential</h4>
          <p className="mb-4">
            The tokenization of RWAs is driven by several compelling advantages that address the limitations of traditional asset management and transfer. These benefits collectively contribute to a more efficient, transparent, and inclusive financial ecosystem.
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li><strong>Enhanced Liquidity:</strong> Many traditional assets, such as real estate or private equity, are inherently illiquid. Tokenization allows for fractional ownership, enabling investors to buy and sell smaller portions of an asset, thereby increasing its market depth and accessibility.</li>
            <li><strong>Increased Transparency:</strong> Blockchain technology provides an immutable and auditable record of ownership and transactions. This inherent transparency reduces information asymmetry, minimizes fraud, and builds trust among participants.</li>
            <li><strong>Programmability:</strong> Tokens are programmable assets, meaning their behavior can be automated through smart contracts. This enables features like automated dividend distributions, collateral management, and compliance checks.</li>
            <li><strong>Reduced Costs and Friction:</strong> By disintermediating traditional financial processes, tokenization can significantly lower transaction fees, administrative costs, and settlement times.</li>
            <li><strong>Global Accessibility:</strong> Blockchain networks are permissionless and globally accessible, allowing investors from anywhere in the world to participate in markets that were previously restricted.</li>
            <li><strong>Faster Settlement:</strong> Traditional asset transfers can take days or even weeks to settle. Blockchain-based token transfers can settle in minutes or seconds.</li>
          </ul>

          <h4 className="text-lg font-medium mb-2">1.3. Key Stakeholders in the Tokenized RWA Ecosystem</h4>
          <p className="mb-4">
            The tokenized RWA ecosystem involves a diverse set of participants, each playing a crucial role in the lifecycle of these digital assets.
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li><strong>Issuers:</strong> Entities that originate and tokenize real-world assets.</li>
            <li><strong>Custodians:</strong> Specialized entities responsible for securely holding the underlying real-world assets or their legal claims.</li>
            <li><strong>Investors:</strong> Individuals or institutions who purchase and hold tokenized RWAs.</li>
            <li><strong>Protocols and Platforms:</strong> The blockchain networks, decentralized finance (DeFi) protocols, and tokenization platforms that facilitate the creation, management, and trading of tokenized RWAs.</li>
            <li><strong>Regulators:</strong> Government bodies responsible for establishing legal frameworks and overseeing the RWA market.</li>
            <li><strong>Service Providers:</strong> Legal firms, audit firms, oracle providers, KYC/AML solution providers, and market makers.</li>
          </ul>

          <h4 className="text-lg font-medium mb-2">1.4. Market Outlook: The Trillion-Dollar Opportunity</h4>
          <p className="mb-4">
            The tokenized RWA market is poised for exponential growth, with projections indicating a multi-trillion-dollar valuation in the coming years.
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li><strong>Boston Consulting Group (BCG) and ADDX:</strong> A report by BCG and ADDX projects that the tokenization of global illiquid assets could reach <strong>$16 trillion by 2030</strong>.</li>
            <li><strong>Citi GPS:</strong> Citi's Global Perspectives & Solutions (GPS) report emphasizes the transformative potential of tokenization.</li>
          </ul>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h5 className="font-semibold mb-2">Practice 1:</h5>
            <p className="mb-2">List 3 types of RWAs you think have the highest adoption potential in DeFi and briefly explain why.</p>
            <textarea
              value={practice1}
              onChange={(e) => setPractice1(e.target.value)}
              className="w-full p-2 border rounded"
              rows={4}
              placeholder="Enter your answer here..."
            />
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Module 2: Legal & Regulatory Dimension</h3>

          <h4 className="text-lg font-medium mb-2">2.1. Jurisdictions and Regulatory Frameworks</h4>
          <p className="mb-4">
            The legal and regulatory landscape for tokenized RWAs is complex and evolving, varying significantly across different jurisdictions.
          </p>

          <p className="mb-4"><strong>Key Regulatory Frameworks and Jurisdictions:</strong></p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li><strong>United States (US):</strong> Employs a fragmented regulatory approach with SEC, CFTC, FinCEN, OCC.</li>
            <li><strong>European Union (EU):</strong> Moving towards unified approach with MiCA Regulation.</li>
            <li><strong>Switzerland:</strong> Progressive stance with DLT Act.</li>
            <li><strong>Singapore:</strong> Pragmatic approach with MAS.</li>
            <li><strong>Argentina:</strong> Developing framework with CNV.</li>
          </ul>

          <h4 className="text-lg font-medium mb-2">2.2. Why Legal Clarity Equals Adoption</h4>
          <p className="mb-4">
            Institutional investors prioritize regulatory certainty. The absence of clear legal frameworks creates significant risks.
          </p>

          <h4 className="text-lg font-medium mb-2">2.3. Common Red Flags in the Legal Dimension</h4>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>No Disclosures or Vague Documentation</li>
            <li>Undefined or Unregistered Special Purpose Vehicles (SPVs)</li>
            <li>Ongoing Lawsuits or Regulatory Investigations</li>
            <li>Jurisdictional Arbitrage with Weak Oversight</li>
            <li>Lack of KYC/AML Procedures</li>
            <li>Unclear Asset Ownership</li>
          </ul>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h5 className="font-semibold mb-2">Practice 2:</h5>
            <p className="mb-2">Compare two tokenized projects: one launched in the US under Reg D vs. one offshore with no licensing. Which is more index-eligible and why?</p>
            <textarea
              value={practice2}
              onChange={(e) => setPractice2(e.target.value)}
              className="w-full p-2 border rounded"
              rows={4}
              placeholder="Enter your answer here..."
            />
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Module 3: Custody & Financial Backing</h3>

          <h4 className="text-lg font-medium mb-2">3.1. Proof-of-Backing: Ensuring Asset Integrity</h4>
          <p className="mb-4">
            Proof-of-Backing (PoB) refers to the mechanisms and processes used to verify that a tokenized RWA is genuinely backed by its stated underlying asset.
          </p>

          <p className="mb-4"><strong>Types of Proof-of-Backing Mechanisms:</strong></p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li><strong>On-chain Proof-of-Reserve (PoR):</strong> Cryptographic proofs and/or direct integration with on-chain data sources.</li>
            <li><strong>Third-Party Attestations:</strong> Independent third-party auditors or fiduciaries periodically verify the underlying assets.</li>
            <li><strong>Quarterly Audits/Reports:</strong> Regular audits conducted by reputable accounting firms.</li>
            <li><strong>Legal Trust Structures:</strong> The underlying assets are held in a legal trust or similar fiduciary arrangement.</li>
          </ul>

          <h4 className="text-lg font-medium mb-2">3.2. Custodians: The Guardians of Real-World Assets</h4>
          <p className="mb-4">
            Custodians are entities responsible for the safekeeping and management of the physical or legal underlying assets that back the token.
          </p>

          <p className="mb-4"><strong>Types of Custodians:</strong></p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>Banks and Trust Companies</li>
            <li>Specialized Digital Asset Custodians</li>
            <li>Warehouses/Vaults</li>
            <li>DAOs (Decentralized Autonomous Organizations)</li>
          </ul>

          <h4 className="text-lg font-medium mb-2">3.3. Financial Fundamentals: Collateralization and Redemption</h4>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li><strong>Collateralization Ratio:</strong> The value of the underlying collateral relative to the value of the issued tokens.</li>
            <li><strong>Redemption Rights:</strong> Token holders should have clear and enforceable rights to redeem their tokens.</li>
            <li><strong>Redemption Process:</strong> The process for redemption should be transparent, efficient, and clearly outlined.</li>
            <li><strong>Audit Frequency and Quality:</strong> Regular, independent audits of the underlying assets and the custodian's operations.</li>
          </ul>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h5 className="font-semibold mb-2">Practice 3:</h5>
            <p className="mb-2">Take an example: a token backed by $10M real estate with quarterly PDF reports only. Identify risks compared to one with live onchain PoR.</p>
            <textarea
              value={practice3}
              onChange={(e) => setPractice3(e.target.value)}
              className="w-full p-2 border rounded"
              rows={4}
              placeholder="Enter your answer here..."
            />
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Module 4: On-Chain Analytics & Token Design</h3>

          <h4 className="text-lg font-medium mb-2">4.1. Smart Contract Standards and Architecture</h4>
          <p className="mb-4">
            The foundation of any tokenized RWA lies in its smart contract. The choice of token standard and the architecture of the smart contract significantly impact the token's functionality, security, and interoperability.
          </p>

          <p className="mb-4"><strong>Common Smart Contract Standards:</strong></p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li><strong>ERC-20:</strong> The most prevalent standard for fungible tokens on Ethereum.</li>
            <li><strong>ERC-721:</strong> The standard for non-fungible tokens (NFTs).</li>
            <li><strong>ERC-4626:</strong> A standard for tokenized vaults.</li>
            <li><strong>ERC-3643 (Security Token Standard):</strong> Specifically designed for security tokens.</li>
          </ul>

          <h4 className="text-lg font-medium mb-2">4.2. Token Models: Functionality and Economics</h4>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li><strong>Fixed Supply Tokens:</strong> Tokens with a predetermined maximum supply.</li>
            <li><strong>Yield-Bearing Tokens:</strong> Tokens that automatically accrue yield or rewards.</li>
            <li><strong>Rebasing Tokens:</strong> Tokens whose supply automatically adjusts based on certain conditions.</li>
            <li><strong>Governance Tokens:</strong> Tokens that grant holders voting rights.</li>
          </ul>

          <h4 className="text-lg font-medium mb-2">4.3. On-Chain Activity and Composability</h4>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li><strong>Liquidity Pools:</strong> The presence and depth of liquidity pools on DEXs.</li>
            <li><strong>Slippage:</strong> A measure of how much the execution price deviates from the expected price.</li>
            <li><strong>Composability:</strong> The ability of the token to integrate with other DeFi protocols.</li>
            <li><strong>On-chain Volume:</strong> The total value of transactions involving the token.</li>
          </ul>

          <h4 className="text-lg font-medium mb-2">4.4. Oracle Dependencies & Risks</h4>
          <p className="mb-4">
            Many tokenized RWAs rely on oracles to bring off-chain data onto the blockchain.
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li><strong>Oracle Design:</strong> Decentralized oracle networks (DONs) like Chainlink are preferred.</li>
            <li><strong>Oracle Risks:</strong> Data Manipulation, Liveness Failure, Centralization.</li>
          </ul>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h5 className="font-semibold mb-2">Practice 4:</h5>
            <p className="mb-2">Check a token's contract on Etherscan (choose any RWA token). Identify if it's upgradeable or pausable, what does this mean for risk scoring?</p>
            <textarea
              value={practice4}
              onChange={(e) => setPractice4(e.target.value)}
              className="w-full p-2 border rounded"
              rows={4}
              placeholder="Enter your answer here..."
            />
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Module 5: Building an RWA Scoring Report</h3>

          <h4 className="text-lg font-medium mb-2">5.1. Scorly's Multi-Factor Scoring Model in Practice</h4>
          <p className="mb-4">
            This module brings together all the concepts learned, demonstrating how Scorly's AI-powered multi-factor scoring model systematically evaluates tokenized RWA projects.
          </p>

          <p className="mb-4"><strong>The Six Core Dimensions (and their respective weights):</strong></p>
          <ol className="list-decimal list-inside mb-4 space-y-1">
            <li><strong>Legal & Regulatory Clarity (20%):</strong> Assesses compliance, legal structure, disclosures, KYC/AML, and legal opinions.</li>
            <li><strong>Custody & Proof of Backing (20%):</strong> Evaluates custodian type, proof-of-reserve mechanisms, audit quality, and redemption processes.</li>
            <li><strong>Token Design & Issuance (15%):</strong> Examines token standards, mint/burn logic, oracle reliance, and token utility.</li>
            <li><strong>Liquidity & Market Access (15%):</strong> Analyzes exchange listings, TVL, trading volume, slippage, and composability.</li>
            <li><strong>Issuer Reputation & History (10%):</strong> Considers team background, funding, and transparency.</li>
            <li><strong>Infrastructure Security (10%):</strong> Focuses on smart contract audits, upgradeability, and oracle security.</li>
          </ol>

          <h4 className="text-lg font-medium mb-2">5.2. Risk Flags & Penalty System</h4>
          <p className="mb-4">
            Beyond the positive scoring criteria, Scorly's model incorporates a crucial penalty system for identified risk factors.
          </p>

          <p className="mb-4"><strong>Examples of Risk Flags:</strong></p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>Security Breaches or Hacks</li>
            <li>Regulatory Actions or Lawsuits</li>
            <li>Poor Architectural Design</li>
            <li>Lack of Transparency</li>
            <li>Centralization Risks</li>
          </ul>

          <h4 className="text-lg font-medium mb-2">5.3. How to Interpret Scores: Index Inclusion Recommendations</h4>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li><strong>85% - 100% (Include):</strong> Projects in this range demonstrate exceptional quality.</li>
            <li><strong>60% - 84% (Conditional Inclusion / Monitor):</strong> Projects with solid fundamentals but some areas for improvement.</li>
            <li><strong>{`< 60%`} (Exclude / Needs Significant Improvement):</strong> Projects with significant deficiencies.</li>
          </ul>

          <h4 className="text-lg font-medium mb-2">5.4. Case Study: Tokenized U.S. Treasury vs. Tokenized Private Credit Loan</h4>
          <p className="mb-4">
            To illustrate the application of Scorly's model, let's consider two hypothetical RWA projects.
          </p>

          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <h5 className="font-semibold mb-2">Case Study 1: Tokenized U.S. Treasury Bills</h5>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Asset:</strong> Short-term U.S. Treasury Bills (T-Bills)</li>
              <li><strong>Issuer:</strong> A regulated financial institution in the US.</li>
              <li><strong>Custody:</strong> T-Bills held by a major US-chartered bank, with real-time on-chain Proof-of-Reserve via Chainlink.</li>
              <li><strong>Token Standard:</strong> ERC-20, non-upgradeable, with mint/burn controlled by the regulated issuer.</li>
              <li><strong>Liquidity:</strong> Listed on major centralized exchanges and integrated into several DeFi lending protocols.</li>
              <li><strong>Team:</strong> Publicly known team with extensive experience.</li>
              <li><strong>Risk Flags:</strong> None identified.</li>
            </ul>
            <p className="mt-2"><strong>Expected Score:</strong> 85-100% (Include)</p>
          </div>

          <div className="bg-red-50 p-4 rounded-lg mb-4">
            <h5 className="font-semibold mb-2">Case Study 2: Tokenized Private Credit Loan</h5>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Asset:</strong> A pool of unsecured private credit loans to small businesses.</li>
              <li><strong>Issuer:</strong> A newly formed DAO operating offshore with limited regulatory clarity.</li>
              <li><strong>Custody:</strong> Loans managed by a multi-sig wallet controlled by anonymous DAO members.</li>
              <li><strong>Token Standard:</strong> Custom ERC-20 with upgradeable contracts controlled by a centralized admin key.</li>
              <li><strong>Liquidity:</strong> Only available on a single, small decentralized exchange with low trading volume.</li>
              <li><strong>Team:</strong> Anonymous team, no public track record.</li>
              <li><strong>Risk Flags:</strong> Lack of Transparency (High), Centralization Risks (High), Poor Architectural Design (Medium).</li>
            </ul>
            <p className="mt-2"><strong>Expected Score:</strong> {`< 60%`} (Exclude)</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h5 className="font-semibold mb-2">Practice 5:</h5>
            <p className="mb-2">Prepare a 1-page scoring report on an RWA project of your choice. Include score %, top strengths, key risks, and final verdict.</p>
            <textarea
              value={practice5}
              onChange={(e) => setPractice5(e.target.value)}
              className="w-full p-2 border rounded"
              rows={6}
              placeholder="Enter your scoring report here..."
            />
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Final Challenge & Certificate</h3>
          <p className="mb-4">
            Upon completion of all modules and practices, learners are invited to undertake the Final Challenge:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li><strong>Submit a mock scoring report:</strong> Utilize the knowledge gained throughout the course to prepare a comprehensive 1-page scoring report for an RWA project of your choice.</li>
            <li><strong>Receive a Scorly "Certified RWA Analyst – Level 1" NFT badge:</strong> Successful completion will earn you an exclusive, mintable NFT badge.</li>
          </ul>

          <h4 className="text-lg font-medium mb-2">Next Steps for Learners</h4>
          <p className="mb-4">
            Your journey into tokenized RWA analytics doesn't end here. Scorly Academy offers advanced learning opportunities:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li><strong>Continue to Level 2 Advanced Analytics:</strong> Dive deeper into complex topics such as stress testing RWA portfolios.</li>
            <li><strong>Join community workshops and case study sessions:</strong> Engage with fellow $SCOR holders and industry experts.</li>
          </ul>
        </section>

        <footer className="text-center text-sm text-gray-500 mt-8">
          <p><strong>Author:</strong> Scorly AI Team</p>
          <p><strong>Date:</strong> September 10, 2025</p>
        </footer>

        {/* Certificate Minting Block */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white shadow-2xl">
          <div className="mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🏆</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">Congratulations!</h2>
            <p className="text-xl mb-4">You've completed the Introductory Course</p>
          </div>

          <div className="bg-white/10 rounded-lg p-6 mb-6">
            <h3 className="text-2xl font-semibold mb-3">Certified RWA Analyst – Level 1</h3>
            <p className="text-lg mb-4">
              This exclusive NFT certificate recognizes your mastery of tokenized Real-World Asset analytics.
              Showcase your expertise in RWA evaluation, risk assessment, and scoring methodologies.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/20 rounded p-3">
                <div className="font-semibold">✅ Verified Completion</div>
                <div>Blockchain-verified achievement</div>
              </div>
              <div className="bg-white/20 rounded p-3">
                <div className="font-semibold">🎓 Professional Credential</div>
                <div>Industry-recognized certification</div>
              </div>
              <div className="bg-white/20 rounded p-3">
                <div className="font-semibold">🚀 Exclusive Access</div>
                <div>Advanced courses & community</div>
              </div>
            </div>
          </div>

          <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
            🏆 Mint Badge
          </button>

          <p className="text-sm mt-4 opacity-80">
            Minting requires a connected wallet and gas fees apply and available only to $SCOR holders.
          </p>
        </div>
      </div>
    </div>
  );
}
