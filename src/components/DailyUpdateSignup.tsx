import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/lib/supabaseClient';

const DailyUpdateSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check if email exists
      const { data, error } = await supabase
        .from('daily-update-subscription')
        .select('*')
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (!data) {
        // Insert new subscription
        const { error: insertError } = await supabase
          .from('daily-update-subscription')
          .insert([{ email, is_active: true }]);

        if (insertError) throw insertError;

        toast({
          title: "Subscribed!",
          description: "You've subscribed to daily updates.",
        });
      } else if (!data.is_active) {
        // Reactivate
        const { error: updateError } = await supabase
          .from('daily-update-subscription')
          .update({ is_active: true })
          .eq('email', email);

        if (updateError) throw updateError;

        toast({
          title: "Reactivated!",
          description: "Your subscription has been reactivated.",
        });
      } else {
        toast({
          title: "Already subscribed",
          description: "This email is already receiving daily updates.",
        });
      }

      setEmail('');
    } catch (err) {
      console.error("Subscription error:", err);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Get daily updates"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-10 bg-white/70 border-amber-200"
          required
        />
        <Button
          type="submit"
          className="h-10 bg-orange-500 hover:bg-orange-600 transition-all"
          disabled={isLoading}
        >
          {isLoading ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>
    </form>
  );
};

export default DailyUpdateSignup;
