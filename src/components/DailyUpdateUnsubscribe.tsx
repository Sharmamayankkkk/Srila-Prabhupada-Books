import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/lib/supabaseClient';
import { CheckCircle2 } from 'lucide-react';

const DailyUpdateSignupUnsubscribe: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [unsubscribed, setUnsubscribed] = useState(false);
  const { toast } = useToast();

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('daily-update-subscription')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !data) {
        toast({
          title: "Not found",
          description: "Please check if you have subscribed with the same email.",
          variant: "destructive",
        });
        return;
      }

      const { error: updateError } = await supabase
        .from('daily-update-subscription')
        .update({ is_active: false })
        .eq('email', email);

      if (updateError) throw updateError;

      toast({
        title: "Unsubscribed",
        description: "You’ve been removed from daily updates.",
      });

      setUnsubscribed(true);
    } catch (err) {
      console.error("Unsubscribe error:", err);
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
    <div className="flex justify-center items-center min-h-[70vh] px-4">
      <form
        onSubmit={handleUnsubscribe}
        className="w-full max-w-md text-center bg-white/80 p-6 rounded-2xl shadow-md border border-amber-100"
      >
        <h2 className="text-2xl font-semibold text-orange-700 mb-6">
          Unsubscribe from Daily Prabhupada Verses
        </h2>

        {!unsubscribed ? (
          <>
            <Input
              type="email"
              placeholder="Enter your subscription email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[80%] mx-auto mb-4 bg-white/70 border-amber-200 h-10"
              required
            />

            <div>
              <Button
                type="submit"
                className="h-10 px-6 bg-red-500 hover:bg-red-600 transition-all"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Unsubscribe"}
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 mt-4 text-green-600">
            <CheckCircle2 size={40} strokeWidth={1.5} />
            <p className="text-lg font-medium">You have successfully unsubscribed.</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default DailyUpdateSignupUnsubscribe;
