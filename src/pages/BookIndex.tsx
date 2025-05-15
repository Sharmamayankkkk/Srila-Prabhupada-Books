
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Search, BookOpen } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';

const BookIndex = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [bookIndexData, setBookIndexData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Load book index data
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await fetch('/data/books.json');
        const data = await response.json();
        setBookIndexData(data.books);
      } catch (err) {
        console.error("Error loading book data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookData();
  }, []);
  
  const languages = [
    { code: 'english', name: 'English' },
    { code: 'hindi', name: 'हिन्दी (Hindi)' },
    { code: 'spanish', name: 'Español (Spanish)' },
    { code: 'russian', name: 'Русский (Russian)' },
    { code: 'portuguese', name: 'Português (Portuguese)' },
    { code: 'german', name: 'Deutsch (German)' },
    { code: 'french', name: 'Français (French)' },
    { code: 'chinese', name: '中文 (Chinese)' }
  ];
  
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for: ${searchQuery}`);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10 bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/20 dark:to-background">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Complete Book Index
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse through Srila Prabhupada's complete literary works. Select a book, chapter, or verse to begin reading.
            </p>
          </div>
          
          {/* Book Cards View */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {bookIndexData && bookIndexData.map((book) => (
              <BookCard
                key={book.id}
                bookId={book.id}
                name={book.name}
                description={book.description}
                coverImage={book.coverImage}
                chapterCount={book.chapters}
                cantoCount={book.cantos}
                partCount={book.parts}
              />
            ))}
          </div>
          
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <div className="relative w-full md:w-auto">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-white dark:bg-secondary/70 border border-amber-200 dark:border-amber-700/50 rounded-md p-2 pl-4 pr-10 appearance-none text-sm w-full md:w-auto"
              >
                {languages.map((language) => (
                  <option key={language.code} value={language.code}>
                    {language.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-500" />
            </div>
            
            <form onSubmit={handleSearch} className="flex items-center w-full md:w-auto">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="Search in texts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-amber-200 dark:border-amber-800/40 pr-10"
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <Search className="h-4 w-4 text-amber-500" />
                </button>
              </div>
            </form>
          </div>
          
          <div className="bg-white dark:bg-secondary/20 rounded-xl shadow-md border border-amber-100 dark:border-amber-800/30 p-6 mb-8">
            <Accordion type="single" collapsible className="w-full">
              {bookIndexData && bookIndexData.map((book) => (
                <AccordionItem key={book.id} value={book.id} className="border-b border-amber-100 dark:border-amber-800/30">
                  <AccordionTrigger className="py-4 text-lg font-heading hover:text-primary">
                    <div className="flex items-center">
                      <div className="w-10 h-10 mr-3 rounded-md overflow-hidden">
                        {book.coverImage ? (
                          <img 
                            src={book.coverImage} 
                            alt={book.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                        )}
                      </div>
                      {book.name}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-6 space-y-3">
                      {/* For Bhagavad Gita */}
                      {book.id === 'bg' && book.chaptersData && book.chaptersData.map((chapter, index) => (
                        <div key={`${book.id}-${index + 1}`} className="pb-3 border-b border-amber-50 dark:border-amber-900/10">
                          <Link 
                            to={`/books/${book.id}/${index + 1}/1`}
                            className="flex items-center justify-between group hover:text-primary"
                          >
                            <div className="flex items-center">
                              <span className="font-medium mr-2">Chapter {index + 1}:</span>
                              <span>{chapter.title}</span>
                            </div>
                            <div className="flex items-center text-muted-foreground group-hover:text-primary text-sm">
                              <span>{chapter.verses} verses</span>
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </div>
                          </Link>
                        </div>
                      ))}
                      
                      {/* For Srimad Bhagavatam */}
                      {book.id === 'sb' && book.cantosData && book.cantosData.map((canto, index) => (
                        <div key={`${book.id}-${index + 1}`} className="pb-3 border-b border-amber-50 dark:border-amber-900/10">
                          <Link
                            to={`/books/${book.id}/${index + 1}/1`}
                            className="flex items-center justify-between group hover:text-primary"
                          >
                            <div className="flex items-center">
                              <span className="font-medium mr-2">Canto {index + 1}:</span>
                              <span>{canto.title}</span>
                            </div>
                            <div className="flex items-center text-muted-foreground group-hover:text-primary text-sm">
                              <span>{canto.chapters} chapters</span>
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </div>
                          </Link>
                        </div>
                      ))}
                      
                      {/* For Chaitanya Charitamrita */}
                      {book.id === 'cc' && book.partsData && book.partsData.map((part, index) => (
                        <div key={`${book.id}-${index + 1}`} className="pb-3 border-b border-amber-50 dark:border-amber-900/10">
                          <Link
                            to={`/books/${book.id}/${part.name.toLowerCase()}/${index + 1}`}
                            className="flex items-center justify-between group hover:text-primary"
                          >
                            <div className="flex items-center">
                              <span className="font-medium mr-2">{part.name}:</span>
                              <span>{part.description}</span>
                            </div>
                            <div className="flex items-center text-muted-foreground group-hover:text-primary text-sm">
                              <span>{part.chapters} chapters</span>
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/30 rounded-lg p-6 shadow-sm">
            <h2 className="font-heading text-xl mb-4">About Srila Prabhupada's Books</h2>
            <p className="text-muted-foreground mb-4">
              His Divine Grace A.C. Bhaktivedanta Swami Prabhupada translated and commented on over eighty volumes of India's most important sacred texts. His clear and accessible versions of Bhagavad-gita, Srimad-Bhagavatam, and Sri Caitanya-caritamrta are now used as standard textbooks in universities around the world.
            </p>
            <div className="flex justify-center mt-6">
              <Button asChild className="rounded-full">
                <Link to="/about">Learn more about Srila Prabhupada</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookIndex;
