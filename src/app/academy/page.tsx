import Link from 'next/link';

export default function AcademyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Academy</h1>
        <p className="text-lg text-gray-600">Exclusive for $SCOR stakers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Course 1 */}
        <Link href="/academy/course-1" className="block">
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Introductory Course: Tokenized RWA Analytics</h2>
            <p className="text-gray-700 mb-4">By the end of this course, learners will be able to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Understand what tokenized RWAs are and why they matter.</li>
              <li>Evaluate the main legal, financial, and technical risks of RWA tokens.</li>
              <li>Apply scoring methodologies (like Scorly's model) to analyze projects.</li>
              <li>Compare RWA projects using quantitative & qualitative data.</li>
              <li>Prepare a simple due diligence report for an RWA project.</li>
            </ul>
          </div>
        </Link>

        {/* Course 2 */}
        <Link href="/academy/course-2" className="block">
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Advanced Course: Tokenized RWA Analytics. Level 2</h2>
            <p className="text-gray-700 mb-4">By the end of this course, learners will be able to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Perform deeper quantitative analysis of tokenized RWA projects.</li>
              <li>Use stress testing & scenario modeling to assess risk under volatility.</li>
              <li>Understand liquidity dynamics and how they impact tokenized assets.</li>
              <li>Integrate ESG and compliance factors into RWA scoring.</li>
              <li>Draft comprehensive due diligence reports for institutional contexts.</li>
            </ul>
          </div>
        </Link>
      </div>
    </div>
  );
}