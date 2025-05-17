
import { Separator } from "@/components/ui/separator";

const HowItWorksPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-truth mb-4">How TruthRadar Works</h1>
          <p className="text-xl text-neutral-dark">
            Learn about the technology behind our fake news detection system
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-truth">The Analysis Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="mb-4 h-12 w-12 rounded-full bg-truth-light flex items-center justify-center text-white font-bold">
                  1
                </div>
                <h3 className="font-bold text-lg mb-2">Content Extraction</h3>
                <p className="text-neutral-dark">
                  When you submit text or a URL, our system extracts the relevant news content, 
                  removing ads, navigation elements, and other non-content material.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="mb-4 h-12 w-12 rounded-full bg-truth-light flex items-center justify-center text-white font-bold">
                  2
                </div>
                <h3 className="font-bold text-lg mb-2">NLP Analysis</h3>
                <p className="text-neutral-dark">
                  Our Natural Language Processing (NLP) algorithms analyze the text, 
                  examining linguistic patterns, sentiment, emotionality, and other 
                  features associated with misinformation.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="mb-4 h-12 w-12 rounded-full bg-truth-light flex items-center justify-center text-white font-bold">
                  3
                </div>
                <h3 className="font-bold text-lg mb-2">Source Identification</h3>
                <p className="text-neutral-dark">
                  We identify the source of the content and check it against our extensive 
                  database of publishers, evaluating their past reliability and credibility.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="mb-4 h-12 w-12 rounded-full bg-truth-light flex items-center justify-center text-white font-bold">
                  4
                </div>
                <h3 className="font-bold text-lg mb-2">Model Prediction</h3>
                <p className="text-neutral-dark">
                  Our machine learning models, trained on thousands of verified real and fake news 
                  articles, generate a prediction about the content's authenticity and a confidence score.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="mb-4 h-12 w-12 rounded-full bg-truth-light flex items-center justify-center text-white font-bold">
                  5
                </div>
                <h3 className="font-bold text-lg mb-2">Result Compilation</h3>
                <p className="text-neutral-dark">
                  The system combines content analysis, source evaluation, and model predictions 
                  to create a comprehensive credibility assessment that we present to you.
                </p>
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-6 text-truth">Our AI Technology</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
              <h3 className="font-bold text-lg mb-4">Machine Learning Models</h3>
              <p className="text-neutral-dark mb-4">
                TruthRadar employs several sophisticated machine learning models:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-dark">
                <li>
                  <span className="font-semibold">Text Classification:</span> Deep learning models trained on 
                  large datasets of verified news articles to distinguish between real and fake news.
                </li>
                <li>
                  <span className="font-semibold">Natural Language Processing:</span> Transformer-based models 
                  that understand the context, semantics, and nuances of language.
                </li>
                <li>
                  <span className="font-semibold">Source Reputation Analysis:</span> Systems that evaluate the 
                  credibility of news sources based on their history and reputation.
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4">Features We Analyze</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                <div>
                  <h4 className="font-medium mb-2 text-truth">Content Indicators:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-neutral-dark">
                    <li>Sensationalist language and clickbait</li>
                    <li>Emotionally charged vocabulary</li>
                    <li>Logical inconsistencies</li>
                    <li>Exaggerated claims</li>
                    <li>Polarizing statements</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-truth">Source Indicators:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-neutral-dark">
                    <li>Historical accuracy</li>
                    <li>Editorial standards</li>
                    <li>Transparency of ownership</li>
                    <li>Citation practices</li>
                    <li>Fact-checking track record</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-6 text-truth">Understanding Your Results</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-3">Authenticity Score</h3>
                <p className="text-neutral-dark">
                  The authenticity score represents our system's confidence in the reliability of the content. 
                  Higher scores indicate more reliable content, while lower scores suggest possible misinformation.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-3">Source Credibility</h3>
                <p className="text-neutral-dark">
                  Source credibility evaluates the reputation of the content publisher based on 
                  their history of accuracy, transparency, and journalistic standards.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-3">Key Issues</h3>
                <p className="text-neutral-dark">
                  When our system identifies potential problems in the content, it highlights specific 
                  issues like sensationalist language, unverified claims, or logical fallacies to help 
                  you understand why the content may be problematic.
                </p>
              </div>
            </div>
          </section>

          <Separator />

          <section className="bg-truth-light/10 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 text-truth">Tips for Evaluating News</h2>
            <p className="mb-4">
              While TruthRadar provides automated analysis, critical thinking remains essential. 
              Here are some additional steps you can take:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Check multiple reputable sources to verify information</li>
              <li>Look for the original source of claims and statistics</li>
              <li>Consider if headlines match the actual content of articles</li>
              <li>Be aware of your own biases when evaluating information</li>
              <li>Check the publication date – old news may be shared as current</li>
              <li>Look for expertise – who wrote the article and what are their credentials?</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
