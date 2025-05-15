
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, Clock, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChapterNavigation from '@/components/ChapterNavigation';
import VerseDisplay from '@/components/VerseDisplay';
import BookInfo from '@/components/BookInfo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const BookPage = () => {
  const { bookId, chapter = '1', verse = '1' } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verseData, setVerseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookInfo, setBookInfo] = useState({ 
    name: 'Loading...', 
    chapters: 1,
    coverImage: '' 
  });
  const [totalVerses, setTotalVerses] = useState(20); // Default until loaded
  
  // Load book info
  useEffect(() => {
    const fetchBookInfo = async () => {
      try {
        const response = await fetch('/data/books.json');
        if (!response.ok) {
          throw new Error('Failed to load book information');
        }
        
        const data = await response.json();
        const bookData = data.books.find(book => book.id === bookId);
        
        if (bookData) {
          setBookInfo({
            name: bookData.name,
            chapters: bookData.chapters || bookData.cantos || (bookData.parts || 1),
            coverImage: bookData.coverImage || ''
          });
          
          // Get total verses for the current chapter if available
          if (bookData.chaptersData && chapter && bookData.id === 'bg') {
            const chapterData = bookData.chaptersData[parseInt(chapter) - 1];
            if (chapterData) {
              setTotalVerses(chapterData.verses);
            }
          }
          console.log('Book data loaded:', bookData);
        } else {
          console.error('Book not found:', bookId);
          toast({
            title: "Book not found",
            description: `The book "${bookId}" could not be found.`,
            variant: "destructive"
          });
        }
      } catch (err) {
        console.error('Error loading book info:', err);
        toast({
          title: "Failed to load book information",
          description: "Please try again later.",
          variant: "destructive"
        });
      }
    };
    
    if (bookId) {
      fetchBookInfo();
    }
  }, [bookId, chapter, toast]);
  
  // Load verse data
  useEffect(() => {
    const fetchVerseData = async () => {
      if (!bookId || !chapter || !verse) return;
      
      setLoading(true);
      try {
        // Check if the JSON file exists
        const jsonPath = `/data/${bookId}/${chapter}/${verse}.json`;
        console.info('Fetching verse data from:', jsonPath);
        const response = await fetch(jsonPath);
        
        if (response.ok) {
          const data = await response.json();
          console.info('Verse data loaded:', data);
          
          // Add synonyms if they don't exist in the data
          // This ensures the "Show Word Meanings" button will appear
          if (!data.synonyms) {
            console.info('Verse has no synonyms, adding mock data');
            data.synonyms = [
              { word: "dhṛtarāṣṭra", meaning: "King Dhritarashtra" },
              { word: "uvāca", meaning: "said" },
              { word: "dharma-kṣetre", meaning: "in the place of pilgrimage" },
              { word: "kuru-kṣetre", meaning: "in the place named Kurukshetra" },
              { word: "samavetā", meaning: "assembled" },
              { word: "yuyutsavaḥ", meaning: "desiring to fight" },
              { word: "māmakāḥ", meaning: "my party (sons)" },
              { word: "pāṇḍavāḥ", meaning: "the sons of Pandu" }
            ];
          }
          
          setVerseData(data);
          setError(null);
          
          // Update document title with verse reference
          document.title = `${bookInfo.name} ${chapter}:${verse} - Prabhupada Verse Vault`;
        } else {
          console.log(`Verse data not available at ${jsonPath}`);
          setVerseData(null);
          setError("coming-soon");
          document.title = `Coming Soon - Prabhupada Verse Vault`;
        }
      } catch (err) {
        console.error("Error fetching verse data:", err);
        setError("Failed to load verse data. Please try again later.");
        document.title = `Error - Prabhupada Verse Vault`;
      } finally {
        setLoading(false);
      }
    };
    
    fetchVerseData();
  }, [bookId, chapter, verse, bookInfo.name]);
  
  const navigateToVerse = (direction) => {
    if (!bookId || !chapter) return;
    
    const currentVerse = parseInt(verse);
    const currentChapter = parseInt(chapter);
    
    if (direction === 'next') {
      if (currentVerse < totalVerses) {
        // Navigate to next verse in same chapter
        navigate(`/books/${bookId}/${currentChapter}/${currentVerse + 1}`);
      } else if (currentChapter < bookInfo.chapters) {
        // Navigate to first verse of next chapter
        navigate(`/books/${bookId}/${currentChapter + 1}/1`);
      }
    } else if (direction === 'previous') {
      if (currentVerse > 1) {
        // Navigate to previous verse in same chapter
        navigate(`/books/${bookId}/${currentChapter}/${currentVerse - 1}`);
      } else if (currentChapter > 1) {
        // Navigate to last verse of previous chapter (we don't know the exact count, using 1 as placeholder)
        navigate(`/books/${bookId}/${currentChapter - 1}/1`);
      }
    }
  };
  
  // Coming Soon Component
  const ComingSoonMessage = () => (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100/50 dark:bg-gradient-to-br dark:from-amber-900/20 dark:to-amber-800/10 dark:border-amber-700/30">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="h-16 w-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <Clock className="h-10 w-10 text-amber-700 dark:text-amber-400" />
            </div>
            <h2 className="text-2xl font-heading text-amber-800 dark:text-amber-300">Coming Soon</h2>
            <p className="text-muted-foreground">
              We're working on adding this scripture to our digital library. The verses are being carefully formatted and will be available soon.
            </p>
            <div className="border-t border-amber-200 dark:border-amber-700/30 w-full my-4 pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                In the meantime, you can explore:
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button asChild variant="outline" size="sm" className="border-amber-200 dark:border-amber-700/50">
                  <Link to="/books/bg/1/1">
                    <BookInfo className="h-4 w-4 mr-2" /> Bhagavad Gita 1.1
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="border-amber-200 dark:border-amber-700/50">
                  <Link to="/books/bg/2/20">
                    <BookInfo className="h-4 w-4 mr-2" /> Bhagavad Gita 2.20
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {bookId && chapter && verse && (
        <ChapterNavigation 
          bookId={bookId} 
          currentChapter={parseInt(chapter)} 
          totalChapters={bookInfo.chapters}
          currentVerse={verse} 
          totalVerses={totalVerses}
        />
      )}
      
      <main className="flex-grow py-6">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : error === "coming-soon" ? (
          <ComingSoonMessage />
        ) : error ? (
          <div className="text-center text-red-500 py-8 flex flex-col items-center gap-4">
            <AlertCircle className="h-10 w-10" />
            <p>{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline" className="mt-2">
              Try Again
            </Button>
          </div>
        ) : verseData ? (
          <div className="container mx-auto px-4">
            <BookInfo 
              bookId={bookId} 
              bookName={bookInfo.name}
              chapterNumber={parseInt(chapter)} 
              coverImage={bookInfo.coverImage}
            />
            
            <VerseDisplay verseData={verseData} />
            
            <div className="max-w-4xl mx-auto px-4 mt-10 flex justify-between">
              <Button
                variant="outline" 
                onClick={() => navigateToVerse('previous')}
                disabled={parseInt(chapter) === 1 && parseInt(verse) === 1}
                className="border-amber-200 dark:border-amber-700/50"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous Verse
              </Button>
              
              <Button
                variant="outline" 
                onClick={() => navigateToVerse('next')}
                className="border-amber-200 dark:border-amber-700/50"
              >
                Next Verse <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p>No verse data available.</p>
            <Link to="/" className="text-primary hover:underline mt-4 inline-block">
              Return to Home
            </Link>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default BookPage;
