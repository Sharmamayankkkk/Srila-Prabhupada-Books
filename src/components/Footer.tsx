
import { useState, useEffect } from 'react';
import { BookOpen, Heart, Users, Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const VisitorCounter = () => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // Initialize with a random base count between 10,000 and 20,000
    const baseCount = Math.floor(Math.random() * 10000) + 10000;
    
    // We'd normally get this from a backend API, but for demo purposes
    // we'll simulate with localStorage and random increments
    const storedCount = localStorage.getItem('visitorCount');
    
    if (storedCount) {
      setCount(parseInt(storedCount));
    } else {
      setCount(baseCount);
      localStorage.setItem('visitorCount', baseCount.toString());
    }
    
    // Simulating regular visitors by increasing count
    const interval = setInterval(() => {
      setCount(prevCount => {
        const newCount = prevCount + 1;
        localStorage.setItem('visitorCount', newCount.toString());
        return newCount;
      });
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex items-center gap-2 bg-amber-50/50 border border-amber-100 rounded-full px-4 py-2 shadow-sm">
      <Users className="h-5 w-5 text-primary" />
      <div>
        <p className="text-sm font-medium">{count.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground">Spiritual seekers</p>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-amber-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
              <h3 className="font-heading text-lg font-semibold">Prabhupada Verse Vault</h3>
            </div>
            <p className="text-muted-foreground">
              Access the unedited works of Srila Prabhupada, with original translations and purports.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4"
            >
              <VisitorCounter />
            </motion.div>
          </div>
          
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/books/bg" className="text-foreground hover:text-primary transition-colors">
                  Bhagavad Gita
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-foreground hover:text-primary transition-colors">
                  Search
                </Link>
              </li>
              <li>
                <Link to="/index" className="text-foreground hover:text-primary transition-colors">
                  Book Index
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="bg-amber-50 p-2 rounded-full hover:bg-amber-100 transition-colors">
                <Facebook className="h-5 w-5 text-primary hover:text-orange-600 transition-colors" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="bg-amber-50 p-2 rounded-full hover:bg-amber-100 transition-colors">
                <Instagram className="h-5 w-5 text-primary hover:text-orange-600 transition-colors" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="bg-amber-50 p-2 rounded-full hover:bg-amber-100 transition-colors">
                <Youtube className="h-5 w-5 text-primary hover:text-orange-600 transition-colors" />
              </a>
              <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="bg-amber-50 p-2 rounded-full hover:bg-amber-100 transition-colors">
                <MessageCircle className="h-5 w-5 text-primary hover:text-orange-600 transition-colors" />
              </a>
            </div>
            
            <div className="mt-4 bg-gradient-to-r from-amber-100/50 to-orange-100/50 p-3 rounded-lg border border-amber-200/50">
              <p className="text-sm text-muted-foreground">
                Join our community of devotees and spiritual seekers exploring Srila Prabhupada's timeless wisdom.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-amber-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Prabhupada Verse Vault. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center mt-2 md:mt-0">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for devotees worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
