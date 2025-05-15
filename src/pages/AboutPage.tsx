
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-16 bg-secondary/60">
          <div className="container mx-auto px-4 text-center">
            <motion.h1 
              className="font-heading text-4xl md:text-5xl mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              About Prabhupada Verse Vault
            </motion.h1>
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-lg mb-4">
                Our mission is to present the original, unedited writings of His Divine Grace A.C. Bhaktivedanta Swami Prabhupada in an accessible, beautiful digital format for readers worldwide.
              </p>
            </motion.div>
          </div>
        </section>
        
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading text-3xl mb-6">Preserving Srila Prabhupada's Legacy</h2>
              
              <p className="mb-4">
                Srila Prabhupada's books contain the timeless wisdom of the Vedic literature and present it in a way that is accessible to the modern world. His translations and purports provide deep insights into spiritual knowledge that has been preserved for thousands of years.
              </p>
              
              <p className="mb-4">
                The Prabhupada Verse Vault aims to preserve the original, unedited versions of these important texts, ensuring that readers can access the exact words and explanations that Srila Prabhupada gave, without later editorial changes.
              </p>
              
              <h2 className="font-heading text-3xl mb-6 mt-10">Our Approach</h2>
              
              <p className="mb-4">
                We have carefully formatted the texts to enhance readability while maintaining absolute fidelity to Srila Prabhupada's original words. The beautiful interface is designed to help you focus on the profound spiritual wisdom contained in these texts.
              </p>
              
              <p className="mb-4">
                Features of our platform include:
              </p>
              
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>Original Sanskrit verses with diacritical marks</li>
                <li>Word-by-word translations</li>
                <li>Complete purports as written by Srila Prabhupada</li>
                <li>Easy navigation between chapters and verses</li>
                <li>Powerful search functionality</li>
                <li>Mobile-friendly design for reading on any device</li>
              </ul>
              
              <h2 className="font-heading text-3xl mb-6 mt-10">Our Vision</h2>
              
              <p className="mb-4">
                We envision a world where Srila Prabhupada's original works are easily accessible to anyone seeking spiritual knowledge. By providing these texts in their original form, we hope to help preserve the integrity of the teachings and make them available for generations to come.
              </p>
              
              <p className="mb-8">
                This platform is created by devotees, for devotees and all sincere seekers of spiritual knowledge.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
