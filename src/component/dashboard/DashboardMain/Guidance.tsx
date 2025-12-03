type Step = {
  id: number;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    id: 1,
    title: 'Create or Upload',
    description: 'Start from scratch with our builder or upload your existing resume for analysis.',
  },
  {
    id: 2,
    title: 'AI Analysis',
    description: 'Our advanced AI scans and analyzes your resume for optimization opportunities.',
  },
  {
    id: 3,
    title: 'Get Feedback',
    description: 'Receive instant, actionable suggestions to improve your resume.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-12 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center bg-white/10 rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white text-xl font-bold mb-4 shadow-lg">
                {step.id}
              </div>

              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm mt-2 text-gray-200">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
