import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, Filter, SlidersHorizontal, X, Volume2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import VerseActions from '@/components/VerseActions';

interface SearchResult {
  id: number;
  book: string;
  title?: string;
  chapter: number;
  verse: number;
  text: string;
  matchType: string;
  relevance?: number;
}

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [bookFilter, setBookFilter] = useState('all');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchMode, setSearchMode] = useState('basic');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  // Advanced search filters
  const [searchIn, setSearchIn] = useState({
    translations: true,
    purports: true,
    synonyms: false
  });
  const [relevanceThreshold, setRelevanceThreshold] = useState([75]);
  const [exactMatch, setExactMatch] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  
  // Mock search function
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      // Mock results based on search term
      const results = [
        {
          id: 1,
          book: 'bg',
          title: 'Contents of the Gita Summarized',
          chapter: 2,
          verse: 20,
          text: "For the soul there is <mark>neither</mark> birth <mark>nor</mark> death at any time. He has <mark>not</mark> come into being, does <mark>not</mark> come into being, and will <mark>not</mark> come into being.",
          matchType: 'Translation',
          relevance: 98
        },
        {
          id: 2,
          book: 'bg',
          title: 'Transcendental Knowledge',
          chapter: 4,
          verse: 7,
          text: "Whenever and wherever there is a decline in religious practice, O descendant of Bharata, and a predominant rise of irreligion—at that time I descend Myself.",
          matchType: 'Purport',
          relevance: 87
        },
        {
          id: 3,
          book: 'sb',
          title: 'Divinity and Divine Service',
          chapter: 1,
          verse: 2,
          text: "Completely rejecting all religious activities which are materially motivated, this Bhāgavata Purāṇa propounds the highest truth.",
          matchType: 'Translation',
          relevance: 74
        },
        {
          id: 4,
          book: 'cc',
          title: "The Lord's Touring of South India",
          chapter: 1,
          verse: 5,
          text: "The spiritual knowledge that was imparted by the Supreme Lord during the last eighteen days of His manifest pastimes is known as BHAGAVAD-GĪTĀ.",
          matchType: 'Purport',
          relevance: 65
        }
      ];
      
      // Filter by book if needed
      let filteredResults = bookFilter === 'all'
        ? results
        : results.filter(result => result.book === bookFilter);
      
      // Apply advanced filters
      if (searchMode === 'advanced') {
        // Filter by search location
        if (!searchIn.translations) {
          filteredResults = filteredResults.filter(result => result.matchType !== 'Translation');
        }
        if (!searchIn.purports) {
          filteredResults = filteredResults.filter(result => result.matchType !== 'Purport');
        }
        if (!searchIn.synonyms) {
          filteredResults = filteredResults.filter(result => result.matchType !== 'Synonyms');
        }
        
        // Filter by relevance threshold
        filteredResults = filteredResults.filter(result => result.relevance >= relevanceThreshold[0]);
        
        // Sort results
        if (sortBy === 'relevance') {
          filteredResults.sort((a, b) => b.relevance - a.relevance);
        } else if (sortBy === 'bookOrder') {
          const bookOrder = { bg: 1, sb: 2, cc: 3 };
          filteredResults.sort((a, b) => {
            if (a.book !== b.book) return bookOrder[a.book] - bookOrder[b.book];
            if (a.chapter !== b.chapter) return a.chapter - b.chapter;
            return a.verse - b.verse;
          });
        }
      }
      
      // Filter by tab selection
      if (activeTab !== 'all') {
        filteredResults = filteredResults.filter(result => result.matchType.toLowerCase() === activeTab);
      }
      
      setSearchResults(filteredResults);
      setIsSearching(false);
    }, 1000);
  };
  
  // Helper to get book full name
  const getBookName = (code) => {
    const books = {
      'bg': 'Bhagavad Gita',
      'sb': 'Srimad Bhagavatam',
      'cc': 'Chaitanya Charitamrita'
    };
    return books[code] || code;
  };

  // Clear all filters
  const clearFilters = () => {
    setBookFilter('all');
    setSearchIn({
      translations: true,
      purports: true,
      synonyms: false
    });
    setRelevanceThreshold([75]);
    setExactMatch(false);
    setCaseSensitive(false);
    setSortBy('relevance');
    setActiveTab('all');
  };

  // Count results by type
  const countResultsByType = (type) => {
    if (type === 'all') return searchResults.length;
    return searchResults.filter(result => result.matchType.toLowerCase() === type).length;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl mb-4">Search Prabhupada's Books</h1>
            <p className="text-lg text-muted-foreground">
              Search across all of Srila Prabhupada's original works by keyword, phrase, or reference.
            </p>
          </motion.div>
          
          <motion.div
            className="max-w-4xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-amber-200/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Button 
                      variant={searchMode === 'basic' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSearchMode('basic')}
                    >
                      Basic
                    </Button>
                    <Button 
                      variant={searchMode === 'advanced' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSearchMode('advanced')}
                    >
                      Advanced
                    </Button>
                  </div>
                  
                  {searchMode === 'advanced' && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center gap-1"
                    >
                      <SlidersHorizontal className="h-4 w-4" />
                      {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </Button>
                  )}
                </div>
                
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                      <Input
                        type="text"
                        placeholder={searchMode === 'basic' ? 
                          "Search for words or phrases..." : 
                          "Advanced search with multiple terms..."
                        }
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <Select value={bookFilter} onValueChange={setBookFilter}>
                      <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="All Books" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Books</SelectItem>
                        <SelectItem value="bg">Bhagavad Gita</SelectItem>
                        <SelectItem value="sb">Srimad Bhagavatam</SelectItem>
                        <SelectItem value="cc">Chaitanya Charitamrita</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {searchMode === 'advanced' && showFilters && (
                    <div className="bg-muted/40 p-4 rounded-md">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium mb-3">Search In</h3>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="translations" 
                                checked={searchIn.translations} 
                                onCheckedChange={(checked) => 
                                  setSearchIn(prev => ({...prev, translations: !!checked}))
                                }
                              />
                              <label htmlFor="translations" className="text-sm">
                                Translations
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="purports" 
                                checked={searchIn.purports} 
                                onCheckedChange={(checked) => 
                                  setSearchIn(prev => ({...prev, purports: !!checked}))
                                }
                              />
                              <label htmlFor="purports" className="text-sm">
                                Purports
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="synonyms" 
                                checked={searchIn.synonyms} 
                                onCheckedChange={(checked) => 
                                  setSearchIn(prev => ({...prev, synonyms: !!checked}))
                                }
                              />
                              <label htmlFor="synonyms" className="text-sm">
                                Sanskrit Synonyms
                              </label>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium mb-3">Search Options</h3>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="exactMatch" 
                                checked={exactMatch} 
                                onCheckedChange={(checked) => setExactMatch(!!checked)}
                              />
                              <label htmlFor="exactMatch" className="text-sm">
                                Exact phrase match
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="caseSensitive" 
                                checked={caseSensitive} 
                                onCheckedChange={(checked) => setCaseSensitive(!!checked)}
                              />
                              <label htmlFor="caseSensitive" className="text-sm">
                                Case sensitive
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-sm font-medium mb-3">Relevance Threshold</h3>
                        <div className="px-2">
                          <Slider
                            value={relevanceThreshold}
                            onValueChange={setRelevanceThreshold}
                            min={0}
                            max={100}
                            step={5}
                            className="mb-2"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Low relevance</span>
                            <span>Current: {relevanceThreshold}%</span>
                            <span>High relevance</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-sm font-medium mb-3">Sort Results</h3>
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Sort by relevance" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="relevance">Sort by relevance</SelectItem>
                            <SelectItem value="bookOrder">Sort by book order</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={clearFilters}
                        >
                          <X className="mr-1 h-3 w-3" /> Clear Filters
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="w-full md:w-auto" disabled={!searchTerm.trim() || isSearching}>
                      {isSearching ? 'Searching...' : searchMode === 'basic' ? 'Search' : 'Advanced Search'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
          
          {searchResults.length > 0 && (
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-heading text-2xl">Search Results</h2>
                <Badge variant="outline" className="bg-primary/10">
                  {searchResults.length} Result{searchResults.length !== 1 ? 's' : ''}
                </Badge>
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">
                    All ({countResultsByType('all')})
                  </TabsTrigger>
                  <TabsTrigger value="translation">
                    Translations ({countResultsByType('translation')})
                  </TabsTrigger>
                  <TabsTrigger value="purport">
                    Purports ({countResultsByType('purport')})
                  </TabsTrigger>
                  <TabsTrigger value="synonyms">
                    Synonyms ({countResultsByType('synonyms')})
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="space-y-4">
                {searchResults.map((result) => (
                  <Card key={result.id} className="overflow-hidden bg-card/70 backdrop-blur-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex items-center justify-between bg-secondary/50 px-4 py-2 border-b border-amber-100">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-primary" />
                          <span className="font-medium">
                            {getBookName(result.book)} {result.chapter}.{result.verse}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={result.matchType === 'Translation' ? 'default' : 'secondary'} className="text-xs">
                            {result.matchType}
                          </Badge>
                          {searchMode === 'advanced' && (
                            <Badge variant="outline" className="text-xs">
                              {result.relevance}% match
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="p-4">
                        {result.title && (
                          <p className="text-sm text-muted-foreground mb-2">
                            Chapter {result.chapter}: {result.title}
                          </p>
                        )}
                        <p className="mb-3" dangerouslySetInnerHTML={{ __html: result.text }}></p>
                        <div className="flex justify-between items-center">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => navigate(`/books/${result.book}/${result.chapter}/${result.verse}`)}
                            className="flex items-center"
                          >
                            Read Verse <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                          
                          <VerseActions 
                            bookId={result.book}
                            chapter={result.chapter}
                            verse={result.verse}
                            translation={result.text.replace(/<\/?mark>/g, '')}
                            showShare={false}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
