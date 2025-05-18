import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Search, ArrowRight, BookOpenCheck, Quote, ExternalLink, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DailyVerse from '@/components/DailyVerse';
import gsap from 'gsap';

const Index = () => {
  const headerRef = useRef(null);
  
  useEffect(() => {
    if (headerRef.current) {
      const tl = gsap.timeline();
      tl.from(headerRef.current.querySelector('h1'), {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
      tl.from(headerRef.current.querySelector('.hero-description'), {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6');
      tl.from(headerRef.current.querySelector('.hero-buttons'), {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.4');
      tl.from(headerRef.current.querySelector('.hero-image'), {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      }, '-=0.6');
    }
  }, []);

  const bookstoreLinks = {
    bg: "https://madhavstore.com/products/bhagavad-gita-as-it-is-original",
    sb: "https://madhavastores.com/collections/srimad-bhagavatam",
    cc: "https://madhavastores.com/collections/sri-caitanya-caritamrta"
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-amber-50 via-amber-100 to-orange-50" ref={headerRef}>
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5 bg-repeat"></div>
          
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="text-left">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                >
                  <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                    Srila Prabhupada's<br/>
                    <span className="text-primary relative">
                      Verse Vault
                      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 200 8" height="8">
                        <path d="M0,5 Q40,0 80,5 T160,5 T240,5" stroke="#FF9800" strokeWidth="3" fill="none" />
                      </svg>
                    </span>
                  </h1>
                </motion.div>
                <p className="hero-description text-lg md:text-xl max-w-2xl mb-8 text-muted-foreground">
                  Access the original, unedited works of His Divine Grace A.C. Bhaktivedanta Swami Prabhupada 
                  in an elegant, interactive interface.
                </p>
                <div className="hero-buttons flex flex-wrap gap-4">
                  <Button asChild size="lg" className="rounded-full px-6 shadow-lg">
                    <Link to="/books/bg/1/1">
                      Start Reading <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-full px-6 border-amber-300 shadow-sm">
                    <Link to="/about">
                      About Srila Prabhupada
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="hero-image relative flex justify-center items-center">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-300/20 rounded-full blur-3xl transform scale-90"></div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="relative"
                >
                  <div className="relative w-[320px] h-[400px] md:w-[400px] md:h-[500px] mx-auto">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 shadow-xl transform rotate-3"></div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tl from-amber-50 to-white shadow-xl transform -rotate-3"></div>
                    <div className="relative h-full w-full rounded-2xl p-3 bg-white shadow-lg overflow-hidden">
                      <img 
                        src="/pictures/Srila-Prabhupada.png" 
                        alt="Srila Prabhupada" 
                        className="w-full h-full object-cover rounded-xl" 
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-xl">
                        <p className="text-white text-center font-heading text-lg">
                          His Divine Grace A.C. Bhaktivedanta Swami Prabhupada
                        </p>
                      </div>
                    </div>
                    <div className="absolute -top-5 -right-5 w-20 h-20 bg-primary/20 rounded-full"></div>
                    <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-orange-300/20 rounded-full"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-b from-orange-50 to-amber-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl mb-4 relative inline-block">
                Sacred Vedic Library
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-primary/50 rounded-full"></div>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Immerse yourself in the transcendental knowledge of the ancient Vedic scriptures, 
                presented with Srila Prabhupada's illuminating purports.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10">
              <div className="lg:col-span-1">
                <DailyVerse />
              </div>
              
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {['bg', 'sb', 'cc'].map((bookId, index) => {
                    const books = {
                      bg: {title: 'Bhagavad Gita', color: 'from-orange-500 to-amber-600', icon: BookOpen},
                      sb: {title: 'Srimad Bhagavatam', color: 'from-purple-600 to-indigo-700', icon: BookOpenCheck},
                      cc: {title: 'Chaitanya Charitamrta', color: 'from-amber-700 to-yellow-600', icon: Quote}
                    };
                    const book = books[bookId as keyof typeof books];
                    const Icon = book.icon;
                    
                    return (
                      <motion.div 
                        key={bookId}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.15 }}
                        viewport={{ once: true }}
                        className="flex flex-col"
                      >
                        <Card className="h-full group bg-white/90 backdrop-blur-sm border-amber-200/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                          <CardContent className="pt-6 pb-6 px-6 flex flex-col h-full">
                            <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${book.color} flex items-center justify-center mb-5 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                              <Icon className="h-8 w-8" />
                            </div>
                            <h3 className="font-heading text-2xl mb-2">{book.title}</h3>
                            <p className="text-muted-foreground mb-6 flex-grow">
                              {bookId === 'bg' && "The essence of Vedic wisdom in 700 verses of timeless spiritual guidance."}
                              {bookId === 'sb' && "The ripened fruit of Vedic literature with extensive purports and commentaries."}
                              {bookId === 'cc' && "The biography and teachings of Lord Chaitanya, the golden avatar."}
                            </p>
                            <div className="flex flex-col gap-3 mt-auto">
                              <Button asChild className="w-full gap-2">
                                <Link to={`/books/${bookId}`}>
                                  <BookOpen className="h-4 w-4" /> Read Online
                                </Link>
                              </Button>
                              <Button asChild variant="outline" className="w-full gap-2 border-amber-200">
                                <a href={bookstoreLinks[bookId as keyof typeof bookstoreLinks]} target="_blank" rel="noopener noreferrer">
                                  <ShoppingCart className="h-4 w-4" /> Buy Hardcopy
                                </a>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className="mt-4 bg-amber-100/40 border border-amber-200/30 rounded-xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="md:w-3/4">
                  <h3 className="font-heading text-xl mb-2">Extensive Vedic Library</h3>
                  <p className="text-muted-foreground">
                    Explore Srila Prabhupada's complete works in our comprehensive digital library. 
                    Read online for free or purchase physical copies from Madhava Stores for your 
                    home library and deeper study.
                  </p>
                </div>
                <div className="md:w-1/4 flex justify-center md:justify-end">
                  <Button asChild size="lg" variant="default" className="rounded-full shadow-md">
                    <a href="https://madhavastores.com/collections/books-by-srila-prabhupada" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Visit Book Store
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gradient-to-b from-amber-100/50 to-amber-50/80 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5 bg-repeat"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="font-heading text-3xl md:text-4xl text-center mb-4">Features</h2>
            <p className="text-center text-muted-foreground max-w-xl mx-auto mb-12">
              Designed to make studying Srila Prabhupada's books an immersive and enriching experience.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-amber-200/50 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500"></div>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <BookOpenCheck className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-heading text-xl mb-3">Original Texts</h3>
                    <p className="text-muted-foreground">
                      Read Srila Prabhupada's original, unedited translations and purports exactly as they were written.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-amber-200/50 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500"></div>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Search className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-heading text-xl mb-3">Advanced Search</h3>
                    <p className="text-muted-foreground">
                      Find specific verses, words, or topics across all of Srila Prabhupada's books with our powerful search tool.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-amber-200/50 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500"></div>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Quote className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-heading text-xl mb-3">Interactive Experience</h3>
                    <p className="text-muted-foreground">
                      Engage with the texts through beautiful animations, visualizations, and intuitive navigation.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gradient-to-br from-primary/10 to-amber-100/30 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-orange-300/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-amber-400/10 rounded-full blur-xl"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl md:text-4xl mb-6">Begin Your Spiritual Journey</h2>
              <p className="text-lg max-w-2xl mx-auto mb-8 text-muted-foreground">
                Dive into the timeless wisdom of Srila Prabhupada's books. Experience the original translations 
                and purports in a modern, accessible format.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" variant="default" className="rounded-full shadow-md">
                  <Link to="/books/bg">
                    Explore Bhagavad Gita
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full border-amber-300/50 shadow-md">
                  <Link to="/books/sb">
                    Browse Srimad Bhagavatam
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
