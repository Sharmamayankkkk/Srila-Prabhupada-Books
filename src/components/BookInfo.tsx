
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';

interface BookInfoProps {
  bookId: string;
  bookName: string;
  chapterNumber?: number;
  coverImage?: string;
}

const BookInfo = ({ bookId, bookName, chapterNumber, coverImage }: BookInfoProps) => {
  return (
    <Card className="mb-6 overflow-hidden border-amber-200/50 dark:border-amber-800/50">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 lg:w-1/5">
          <AspectRatio ratio={2/3} className="bg-secondary/70">
            {coverImage ? (
              <img 
                src={coverImage} 
                alt={`Cover of ${bookName}`}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-secondary">
                <BookOpen className="w-12 h-12 text-muted-foreground" />
              </div>
            )}
          </AspectRatio>
        </div>
        <CardContent className="p-4 md:p-6 flex-1">
          <h2 className="font-heading text-2xl font-semibold mb-1">{bookName}</h2>
          {chapterNumber && (
            <p className="text-muted-foreground">Chapter {chapterNumber}</p>
          )}
          <div className="mt-4">
            <Link 
              to={`/books/${bookId}`}
              className="text-primary hover:underline text-sm font-medium"
            >
              View all chapters
            </Link>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default BookInfo;
