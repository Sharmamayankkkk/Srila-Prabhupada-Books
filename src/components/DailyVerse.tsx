
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Quote, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface VerseData {
  bookId: string;
  chapter: number;
  verse: number;
  devanagari: string;
  transliteration: string;
  translation: string;
  purport: string;
}

const DailyVerse = () => {
  const [dailyVerse, setDailyVerse] = useState<VerseData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function to get a deterministic "random" verse based on the date
  const getDailyVerse = async () => {
    try {
      setLoading(true);
      
      // Use the current date to seed our "random" selection
      const today = new Date();
      const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      
      // Load book data to know what verses are available
      const booksResponse = await fetch('/data/books.json');
      const booksData = await booksResponse.json();
      
      // Use date as seed for deterministic selection
      // This ensures the same verse shows up all day but changes daily
      const seed = dateString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      
      // For simplicity in this initial implementation, we'll just select from BG chapters 1-2
      // In a full implementation, you would use the books data to pick from all available verses
      const bookId = 'bg';
      const chapter = (seed % 2) + 1; // Either chapter 1 or 2
      const verse = chapter === 1 ? 1 : 20; // For demo: if chapter 1, verse 1; if chapter 2, verse 20
      
      // Fetch the selected verse
      const verseResponse = await fetch(`/data/bg/${chapter}/${verse}.json`);
      
      if (!verseResponse.ok) {
        throw new Error(`Could not load verse data: ${verseResponse.status}`);
      }
      
      const verseData = await verseResponse.json();
      setDailyVerse(verseData);
    } catch (error) {
      console.error("Error loading daily verse:", error);
      toast.error("Could not load the daily verse. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDailyVerse();
  }, []);

  const navigateToVerse = () => {
    if (dailyVerse) {
      navigate(`/books/${dailyVerse.bookId}/${dailyVerse.chapter}/${dailyVerse.verse}`);
    }
  };

  // Format book name for display
  const getBookName = (bookId: string) => {
    const books: { [key: string]: string } = {
      bg: "Bhagavad Gita",
      sb: "Srimad Bhagavatam",
      cc: "Chaitanya Charitamrita"
    };
    return books[bookId] || bookId;
  };

  return (
    <Card className="overflow-hidden shadow-lg border-amber-200/60 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-bl-full"></div>
      <CardContent className="p-6 pt-8">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
            <Quote className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-heading text-xl md:text-2xl">Daily Verse</h3>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        ) : dailyVerse ? (
          <div>
            <div className="text-right text-sm text-muted-foreground mb-4">
              {getBookName(dailyVerse.bookId)} {dailyVerse.chapter}.{dailyVerse.verse}
            </div>
            
            <div className="mb-4 bg-muted/50 p-4 rounded-md text-center">
              <p className="mb-2 font-medium">{dailyVerse.devanagari}</p>
              <p className="text-sm text-muted-foreground italic">{dailyVerse.transliteration}</p>
            </div>
            
            <div className="mb-6">
              <p className="text-lg mb-2 font-medium">Translation</p>
              <p>{dailyVerse.translation}</p>
            </div>
            
            <div>
              <p className="text-lg mb-2 font-medium">Purport Excerpt</p>
              <p className="text-sm text-muted-foreground line-clamp-6">
                {dailyVerse.purport.split('\n')[0]}...
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>Could not load daily verse. Please try again later.</p>
          </div>
        )}
      </CardContent>
      
      {dailyVerse && (
        <CardFooter className="bg-secondary/30 px-6 py-4">
          <Button onClick={navigateToVerse} className="w-full">
            Read Full Verse and Purport <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default DailyVerse;
