
import React, { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share, Facebook, Twitter, Linkedin, Instagram, Link, MessageCircle, Download, Check } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import ShareVerseCard from './ShareVerseCard';

interface ShareDialogProps {
  verseData: {
    book: string;
    chapter: number;
    verse: string;
    shloka: {
      lines: string[];
      transliteration: string[];
    };
    translation: string;
  };
}

const ShareDialog = ({ verseData }: ShareDialogProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Function to generate share URL
  const getShareUrl = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/books/${verseData.book}/${verseData.chapter}/${verseData.verse}`;
  };
  
  // Function to copy URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(getShareUrl());
    setIsCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  // Function to download the card as an image
  const downloadImage = async () => {
    if (!cardRef.current) return;
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false
      });
      
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `${verseData.book.toUpperCase()}_${verseData.chapter}_${verseData.verse}.png`;
      link.click();
      
      toast.success("Image downloaded successfully!");
    } catch (error) {
      console.error("Error downloading image:", error);
      toast.error("Failed to download image. Please try again.");
    }
  };
  
  // Function to share on social media
  const shareOnSocial = (platform: string) => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(`${verseData.translation} - ${verseData.book.toUpperCase()} ${verseData.chapter}.${verseData.verse}`);
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${text} ${url}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
    toast.success(`Shared on ${platform}!`);
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="flex-shrink-0">
          <Share className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Verse</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col space-y-6 py-4">
          {/* Verse Card Preview */}
          <div className="overflow-hidden rounded-lg border">
            <ShareVerseCard ref={cardRef} verseData={verseData} />
          </div>
          
          {/* Share Options */}
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 mx-1"
                onClick={() => shareOnSocial('facebook')}
              >
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 mx-1"
                onClick={() => shareOnSocial('twitter')}
              >
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 mx-1"
                onClick={() => shareOnSocial('whatsapp')}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 mx-1"
                onClick={() => shareOnSocial('linkedin')}
              >
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 mx-1"
                onClick={copyToClipboard}
              >
                {isCopied ? (
                  <Check className="h-4 w-4 mr-2" />
                ) : (
                  <Link className="h-4 w-4 mr-2" />
                )}
                Copy Link
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 mx-1"
                onClick={downloadImage}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
