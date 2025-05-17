
import { Card, CardContent } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-truth mb-4">About TruthRadar</h1>
          <p className="text-xl text-neutral-dark">
            Our mission is to help people identify misinformation and promote 
            media literacy in the digital age.
          </p>
        </div>

        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold mb-4 text-truth">The Problem of Fake News</h2>
          
          <p className="mb-4">
            In today's digital world, misinformation spreads faster than ever before. 
            Social media platforms and the ease of content creation have made it increasingly 
            difficult to distinguish between credible information and fake news. This has 
            serious consequences for public discourse, democratic processes, and even public health.
          </p>

          <p className="mb-6">
            False information can polarize communities, undermine trust in institutions, 
            influence elections, and even impact personal health decisions. The COVID-19 
            pandemic demonstrated how dangerous misinformation can be when it affects public 
            health behaviors.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-truth">Our Approach</h2>
          
          <p className="mb-4">
            TruthRadar leverages advanced artificial intelligence and natural language 
            processing technologies to analyze news content and determine its credibility.
            Our system examines various elements including:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-2">Content Analysis</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Language patterns and sensationalism</li>
                  <li>Fact consistency and claims</li>
                  <li>Logical coherence of arguments</li>
                  <li>Presence of emotional manipulation</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-2">Source Evaluation</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Publisher reputation and history</li>
                  <li>Transparency of ownership</li>
                  <li>Previous fact-checking results</li>
                  <li>Editorial standards and practices</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mb-4 text-truth">Our Technology</h2>
          
          <p className="mb-4">
            TruthRadar utilizes state-of-the-art machine learning models trained on 
            thousands of verified articles from both reliable and unreliable sources. 
            Our algorithms continuously learn and improve as they process more content.
          </p>
          
          <p className="mb-6">
            We combine natural language processing with a comprehensive database of 
            news sources and their credibility ratings to provide a holistic analysis 
            of news content.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-truth">Limitations and Responsible Use</h2>
          
          <p className="mb-4">
            While we strive for accuracy, our tool is not infallible. We recommend using 
            TruthRadar as one of several tools for evaluating news, alongside critical thinking 
            and consulting multiple sources.
          </p>
          
          <p className="mb-4">
            No automated system can replace human judgment and critical thinking skills. 
            TruthRadar aims to assist in the process of media evaluation, not replace it.
          </p>
          
          <div className="bg-truth-light/10 p-6 rounded-lg border border-truth-light mb-6">
            <h3 className="font-bold mb-2 text-truth">Our Commitment</h3>
            <p>
              We are committed to transparency, privacy, and continuous improvement of our 
              technology. We do not store the content you analyze, and we regularly update 
              our models to account for evolving misinformation tactics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
