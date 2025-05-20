
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ShareDialog from './ShareDialog';
import VerseActions from './VerseActions';

// Define the shape of a verse data object
interface VerseData {
  bookId: string;
  chapter: number;
  verse: string | number;
  devanagari: string;
  transliteration: string;
  synonyms?: {
    word: string;
    meaning: string;
  }[];
  translation: string;
  purport: string;
}

// Define related verse structure
interface RelatedVerse {
  bookId: string;
  chapter: number;
  verse: number | string;
  translation: string;
  relevance: string;
  coverImage?: string;
}

interface VerseDisplayProps {
  verseData: VerseData;
}

const VerseDisplay = ({ verseData }: VerseDisplayProps) => {
  const [showSynonyms, setShowSynonyms] = useState(false);
  const [relatedVerses, setRelatedVerses] = useState<RelatedVerse[]>([]);
  
  // Add mock synonyms if none exist in the verse data
  const synonymsData = verseData.synonyms || [
    { word: "dhṛtarāṣṭra", meaning: "King Dhritarashtra" },
    { word: "uvāca", meaning: "said" },
    { word: "dharma-kṣetre", meaning: "in the place of pilgrimage" },
    { word: "kuru-kṣetre", meaning: "in the place named Kurukshetra" },
    { word: "samavetā", meaning: "assembled" },
    { word: "yuyutsavaḥ", meaning: "desiring to fight" },
    { word: "māmakāḥ", meaning: "my party (sons)" },
    { word: "pāṇḍavāḥ", meaning: "the sons of Pandu" },
    { word: "ca", meaning: "and" },
    { word: "eva", meaning: "certainly" },
    { word: "kim", meaning: "what" },
    { word: "akurvata", meaning: "did they do" },
    { word: "sañjaya", meaning: "O Sanjaya" }
  ];

  // Load related verses
  useState(() => {
    // For this example, we'll just use a mock list of related verses
    const demoRelatedVerses = [
      {
        bookId: 'bg',
        chapter: 2,
        verse: 20,
        translation: "For the soul there is neither birth nor death at any time. He has not come into being, does not come into being, and will not come into being.",
        relevance: "Discusses the eternal nature of the soul",
        coverImage: "/pictures/4dc02cac-b3bc-4ab5-90f3-5c43b7780637.png"
      },
      {
        bookId: 'bg',
        chapter: 1,
        verse: 1,
        translation: "Dhritarashtra said: O Sanjaya, after my sons and the sons of Pandu assembled in the place of pilgrimage at Kurukshetra, desiring to fight, what did they do?",
        relevance: "Beginning of the Bhagavad Gita dialogue",
        coverImage: "/pictures/4dc02cac-b3bc-4ab5-90f3-5c43b7780637.png"
      }
    ];
    
    // Filter out the current verse from related verses
    const filteredVerses = demoRelatedVerses.filter(
      v => !(v.bookId === verseData.bookId && v.chapter === verseData.chapter && v.verse === verseData.verse)
    );
    
    setRelatedVerses(filteredVerses);
  });
  
  // Get book title for display
  const getBookTitle = () => {
    const bookMap: {[key: string]: string} = {
      bg: 'Bhagavad Gita',
      sb: 'Srimad Bhagavatam',
      cc: 'Chaitanya Charitamrita'
    };
    return bookMap[verseData.bookId] || 'Unknown Book';
  };
  
  // Create the verse identifier (e.g., "BG 2.20")
  const verseIdentifier = `${verseData.bookId.toUpperCase()} ${verseData.chapter}.${verseData.verse}`;
  
  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
          {getBookTitle()}
        </h1>
        <p className="text-lg text-muted-foreground">
          Chapter {verseData.chapter}
        </p>
      </div>
      
      {/* Verse Card */}
      <Card className="verse-card mb-8 overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-heading text-2xl">
              {verseIdentifier}
            </h2>
            <div className="flex items-center space-x-2">
              <ShareDialog 
                verseData={{
                  book: verseData.bookId,
                  chapter: verseData.chapter,
                  verse: verseData.verse.toString(),
                  shloka: {
                    lines: verseData.devanagari.split('\n'),
                    transliteration: verseData.transliteration.split('\n')
                  },
                  translation: verseData.translation
                }} 
              />
              <VerseActions
                bookId={verseData.bookId}
                chapter={verseData.chapter}
                verse={verseData.verse}
                translation={verseData.translation}
              />
            </div>
          </div>
          
          {/* Sanskrit */}
          <div className="mb-6 text-center">
            <div className="sanskrit bg-secondary/50 p-4 rounded-md mb-3">
              {verseData.devanagari.split('\n').map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
            
            {/* Transliteration */}
            <div className="transliteration text-muted-foreground">
              {verseData.transliteration.split('\n').map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          </div>
          
          {/* Word Meanings */}
          <div className="mb-6">
            <Button
              variant="outline"
              size="sm"
              className="mb-3"
              onClick={() => setShowSynonyms(!showSynonyms)}
            >
              {showSynonyms ? 'Hide Word Meanings' : 'Show Word Meanings'}
            </Button>
            
            {showSynonyms && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-secondary/30 p-3 rounded-md text-sm">
                {synonymsData.map((syn, index) => (
                  <div key={index} className="flex">
                    <span className="font-semibold transliteration mr-2">{syn.word}—</span>
                    <span>{syn.meaning}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Translation */}
          <div className="border-l-4 border-primary pl-4 py-1 mb-6">
            <h3 className="font-heading text-lg mb-2">Translation</h3>
            <p className="text-lg">{verseData.translation}</p>
          </div>
          
          {/* Purport */}
          <div>
            <div className="flex items-center mb-4">
              <BookOpen className="mr-2 h-5 w-5 text-primary" />
              <h3 className="font-heading text-lg">Purport</h3>
            </div>
            
            <div className="space-y-4 text-justify">
              {verseData.purport.split('\n\n').map((para, index) => {
                return <p key={index}>{para}</p>;
              })}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Related Verses */}
      {relatedVerses.length > 0 && (
        <div className="mb-10">
          <h3 className="font-heading text-xl mb-4">Related Verses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedVerses.map((related, index) => (
              <Card key={index} className="border-amber-200/50 hover:shadow-md transition-shadow dark:border-amber-700/30">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="w-20 h-20 shrink-0">
                      {related.coverImage ? (
                        <img 
                          src={related.coverImage} 
                          alt={`${related.bookId.toUpperCase()} ${related.chapter}.${related.verse}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-secondary flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-primary">
                          {related.bookId.toUpperCase()} {related.chapter}.{related.verse}
                        </span>
                        <VerseActions
                          bookId={related.bookId}
                          chapter={related.chapter}
                          verse={related.verse}
                          translation={related.translation}
                          showShare={false}
                        />
                      </div>
                      <p className="mb-2 text-sm">{related.translation}</p>
                      <p className="text-xs text-muted-foreground mb-3">{related.relevance}</p>
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link to={`/books/${related.bookId}/${related.chapter}/${related.verse}`} className="flex items-center justify-center">
                          Read Verse <ArrowRight className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VerseDisplay;
