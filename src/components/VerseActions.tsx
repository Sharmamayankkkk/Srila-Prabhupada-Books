
import { useState } from 'react';
import { Copy, Check, Quote, Share, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from 'sonner';

interface VerseActionsProps {
  bookId: string;
  chapter: number;
  verse: number | string;
  translation: string;
  showShare?: boolean;
}

const VerseActions = ({ bookId, chapter, verse, translation, showShare = true }: VerseActionsProps) => {
  const [showCitationDialog, setShowCitationDialog] = useState(false);
  const [citationCopied, setCitationCopied] = useState(false);

  const getBookName = () => {
    const books: {[key: string]: string} = {
      bg: 'Bhagavad Gita As It Is',
      sb: 'Srimad Bhagavatam',
      cc: 'Sri Caitanya-caritamrta'
    };
    return books[bookId] || 'Unknown Book';
  };

  const verseIdentifier = `${bookId.toUpperCase()} ${chapter}.${verse}`;
  
  const citationFormats = {
    mla: `Bhaktivedanta Swami Prabhupada, A.C. "${getBookName()}." ${verseIdentifier}. Bhaktivedanta Book Trust, 1972.`,
    apa: `Bhaktivedanta Swami Prabhupada, A.C. (1972). ${getBookName()} (${verseIdentifier}). Bhaktivedanta Book Trust.`,
    chicago: `Bhaktivedanta Swami Prabhupada, A.C. ${getBookName()}. ${verseIdentifier}. Los Angeles: Bhaktivedanta Book Trust, 1972.`,
    harvard: `Bhaktivedanta Swami Prabhupada, A.C., 1972. ${getBookName()}, ${verseIdentifier}. Los Angeles: Bhaktivedanta Book Trust.`
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
    
    if (label.includes('Citation')) {
      setCitationCopied(true);
      setTimeout(() => setCitationCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Citation Dialog */}
      <Dialog open={showCitationDialog} onOpenChange={setShowCitationDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cite This Verse</DialogTitle>
            <DialogDescription>
              Copy the citation in your preferred format for academic papers or publications.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 my-4">
            <div>
              <h4 className="text-sm font-medium mb-2">MLA Format</h4>
              <div className="bg-muted p-3 rounded-md text-sm relative group">
                <p>{citationFormats.mla}</p>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => copyToClipboard(citationFormats.mla, "MLA Citation")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">APA Format</h4>
              <div className="bg-muted p-3 rounded-md text-sm relative group">
                <p>{citationFormats.apa}</p>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => copyToClipboard(citationFormats.apa, "APA Citation")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Chicago Format</h4>
              <div className="bg-muted p-3 rounded-md text-sm relative group">
                <p>{citationFormats.chicago}</p>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => copyToClipboard(citationFormats.chicago, "Chicago Citation")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Harvard Format</h4>
              <div className="bg-muted p-3 rounded-md text-sm relative group">
                <p>{citationFormats.harvard}</p>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => copyToClipboard(citationFormats.harvard, "Harvard Citation")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Quote className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => copyToClipboard(translation, "Verse translation")}>
            <Copy className="mr-2 h-4 w-4" /> Copy Translation
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowCitationDialog(true)}>
            <BookOpen className="mr-2 h-4 w-4" /> Cite This Verse
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* Copy Button */}
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => copyToClipboard(translation, "Verse translation")}
      >
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default VerseActions;
