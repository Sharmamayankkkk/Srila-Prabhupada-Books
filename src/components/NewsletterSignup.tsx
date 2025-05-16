import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';


const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Save to Supabase
      const { error } = await supabase
        .from('notify-subscribers')
        .insert([{ email }]);
      
      if (error) {
        // Check if it's a duplicate email error
        if (error.code === '23505') {
          toast({
            title: "Already subscribed",
            description: "This email is already on our list.",
          });
        } else {
          console.error("Error saving email:", error);
          toast({
            title: "Something went wrong",
            description: "Please try again later.",
            variant: "destructive",
          });
        }
      } else {
        // Success
        toast({
          title: "Thanks for subscribing!",
          description: "We'll notify you when we launch.",
        });
        setEmail('');
      }
    } catch (err) {
      console.error("Error in subscription process:", err);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 bg-white bg-opacity-70 border-amber-200"
          required
        />
        <Button 
          type="submit" 
          className="bg-primary hover:bg-primary/90 h-12 px-8 transition-all"
          disabled={isLoading}
        >
          {isLoading ? "Subscribing..." : "Notify Me"}
        </Button>
      </div>
    </form>
  );
};

export default NewsletterSignup;