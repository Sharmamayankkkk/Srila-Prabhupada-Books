
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface ChapterNavigationProps {
  bookId: string;
  currentChapter: number;
  totalChapters: number;
  currentVerse: string;
  totalVerses: number;
}

const ChapterNavigation = ({ 
  bookId, 
  currentChapter, 
  totalChapters, 
  currentVerse, 
  totalVerses 
}: ChapterNavigationProps) => {
  const navigate = useNavigate();
  const [popoverOpen, setPopoverOpen] = useState(false);
  
  const verseNum = parseInt(currentVerse);
  
  const goToVerse = (chapter: number, verse: number | string) => {
    navigate(`/books/${bookId}/${chapter}/${verse}`);
  };
  
  const prevVerse = () => {
    if (verseNum > 1) {
      goToVerse(currentChapter, verseNum - 1);
    } else if (currentChapter > 1) {
      // Logic to go to last verse of previous chapter would go here
      // For now, just go to previous chapter
      goToVerse(currentChapter - 1, 1);
    }
  };
  
  const nextVerse = () => {
    if (verseNum < totalVerses) {
      goToVerse(currentChapter, verseNum + 1);
    } else if (currentChapter < totalChapters) {
      goToVerse(currentChapter + 1, 1);
    }
  };
  
  const verseRange = Array.from({ length: totalVerses }, (_, i) => i + 1);
  
  return (
    <div className="bg-secondary/80 backdrop-blur-sm border-y border-amber-100 py-3 sticky top-16 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevVerse}
              disabled={currentChapter === 1 && verseNum === 1}
              className="mr-1"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Prev
            </Button>
            
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  <List className="h-4 w-4 mr-2" />
                  <span>Chapter {currentChapter}, Verse {currentVerse}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="start">
                <div className="grid grid-cols-1 divide-y divide-amber-100">
                  <div className="p-4">
                    <h4 className="font-heading text-sm font-semibold mb-2">Chapters</h4>
                    <div className="flex flex-wrap gap-1">
                      {Array.from({ length: totalChapters }, (_, i) => i + 1).map(chapter => (
                        <Button
                          key={chapter}
                          variant={chapter === currentChapter ? "default" : "outline"}
                          size="sm"
                          className="min-w-[2.5rem]"
                          onClick={() => {
                            goToVerse(chapter, 1);
                            setPopoverOpen(false);
                          }}
                        >
                          {chapter}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-heading text-sm font-semibold mb-2">Verses in Chapter {currentChapter}</h4>
                    <div className="flex flex-wrap gap-1 max-h-40 overflow-y-auto">
                      {verseRange.map(verse => (
                        <Button
                          key={verse}
                          variant={verse === verseNum ? "default" : "outline"}
                          size="sm"
                          className="min-w-[2.5rem]"
                          onClick={() => {
                            goToVerse(currentChapter, verse);
                            setPopoverOpen(false);
                          }}
                        >
                          {verse}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={nextVerse}
            disabled={currentChapter === totalChapters && verseNum === totalVerses}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChapterNavigation;
