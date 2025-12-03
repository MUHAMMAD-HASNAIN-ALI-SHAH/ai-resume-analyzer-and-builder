import type { ReactNode } from "react";
import { Target, Sparkles,ChartCandlestick } from "lucide-react"; 

interface FeatureBoxProps {
  icon: ReactNode;
  title: string;
  description: string;
}
function FeatureBox({ icon, title, description }: FeatureBoxProps) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center transition-transform hover:scale-105 hover:shadow-lg">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}


export default function Features() {
  const features = [
    {
      icon: <Target className="text-red-500 w-10 h-10" />,
      title: "ATS Optimization",
      description:
        "Advanced algorithms ensure your resume passes through Applicant Tracking Systems with flying colors."
    },
    {
      icon: <Sparkles className="text-yellow-500 w-10 h-10" />,
      title: "AI Suggestions",
      description:
        "Receive intelligent recommendations for content, keywords, and formatting to maximize your impact."
    },
    {
      icon: <ChartCandlestick className="text-blue-500 w-10 h-10" />,
      title: "Detailed Analytics",
      description:
        "Get comprehensive analysis of your resume's strengths and areas for improvement with actionable insights.."
    }
  ];

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <FeatureBox
              key={idx}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

