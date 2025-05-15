
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ShareVerseCardProps {
  verseData: {
    book: string;
    chapter: number;
    verse: string;
    shloka: {
      lines: string[];
    };
    translation: string;
  };
  className?: string;
}

const ShareVerseCard = React.forwardRef<HTMLDivElement, ShareVerseCardProps>(
  ({ verseData, className }, ref) => {
    // Map book codes to full names
    const bookNames: { [key: string]: string } = {
      bg: 'Bhagavad Gita',
      sb: 'Srimad Bhagavatam',
      cc: 'Chaitanya Charitamrita'
    };
    
    const bookName = bookNames[verseData.book] || verseData.book.toUpperCase();
    const verseIdentifier = `${bookName} ${verseData.chapter}.${verseData.verse}`;
    
    return (
      <Card 
        ref={ref} 
        className={cn(
          "w-full max-w-md mx-auto bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 shadow-lg",
          className
        )}
      >
        <CardContent className="p-6">
          {/* Header with logo and title */}
          <div className="flex items-start gap-3 mb-5">
            <img 
              src="/pictures/bc68f0fc-0759-424f-a2f6-2ba3ae3c5612.png" 
              alt="KCS Logo" 
              className="h-10 object-contain" 
            />
            <div>
              <h3 className="font-heading text-lg tracking-wide">Krishna Consciousness Society</h3>
              <p className="text-xs text-muted-foreground">Sharing divine wisdom</p>
            </div>
          </div>
          
          {/* Sanskrit Verse */}
          <div className="mb-4 text-center">
            <div className="sanskrit bg-secondary/30 p-4 rounded-md mb-2">
              {verseData.shloka.lines.map((line, index) => (
                <div key={index} className="text-base md:text-lg">{line}</div>
              ))}
            </div>
          </div>
          
          {/* Translation */}
          <div className="border-l-4 border-primary pl-3 py-1 mb-4">
            <p className="text-sm md:text-base">{verseData.translation}</p>
          </div>
          
          {/* Footer */}
          <div className="flex justify-between items-center text-sm text-muted-foreground mt-5">
            <span>{verseIdentifier}</span>
            <span>books.krishnaconnect.org</span>
          </div>
        </CardContent>
      </Card>
    );
  }
);

ShareVerseCard.displayName = 'ShareVerseCard';

export default ShareVerseCard;
