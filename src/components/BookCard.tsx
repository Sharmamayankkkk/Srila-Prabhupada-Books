
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { BookOpen } from 'lucide-react';

interface BookCardProps {
  bookId: string;
  name: string;
  description: string;
  coverImage: string;
  chapterCount?: number;
  cantoCount?: number;
  partCount?: number;
}

const BookCard = ({ bookId, name, description, coverImage, chapterCount, cantoCount, partCount }: BookCardProps) => {
  // Determine what content count to show (chapters, cantos, or parts)
  const contentCount = chapterCount || cantoCount || partCount || 0;
  const contentType = chapterCount ? 'Chapters' : (cantoCount ? 'Cantos' : 'Parts');
  
  return (
    <Card className="h-full hover:shadow-md transition-shadow overflow-hidden border-amber-200/50 dark:border-amber-800/50">
      <Link to={`/books/${bookId}`} className="block h-full">
        <div className="book-cover-container">
          <AspectRatio ratio={2/3} className="bg-secondary/70">
            {coverImage ? (
              <img 
                src={coverImage} 
                alt={`Cover of ${name}`}
                className="object-cover w-full h-full rounded-t-lg"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-secondary">
                <BookOpen className="w-12 h-12 text-muted-foreground" />
              </div>
            )}
          </AspectRatio>
        </div>
        <CardContent className="p-4">
          <h3 className="font-heading font-medium text-lg mb-2 line-clamp-2">{name}</h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-3">{description}</p>
          <div className="text-xs text-primary font-medium">
            {contentCount > 0 && `${contentCount} ${contentType}`}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default BookCard;
