"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { WorldIdGate } from "@/components/world-id-gate";
import { useCreateAiArbiter } from "@/hooks/use-ai-arbiter";
import { TabNavigation } from "@/components/tab-navigation";

const CATEGORIES = [
  { value: "crypto", label: "Crypto & DeFi", hint: "Token prices, protocol events, chain metrics" },
  { value: "sports", label: "Sports", hint: "Game outcomes, player stats, tournament results" },
  { value: "politics", label: "Politics & World Events", hint: "Elections, policy, geopolitics" },
  { value: "entertainment", label: "Entertainment", hint: "Movies, music, awards, pop culture" },
  { value: "general", label: "General", hint: "Any topic not covered above" },
];

const STRATEGY_EXAMPLES: Record<string, string> = {
  crypto: "Settle based on the token price from CoinGecko at the pool end time. Compare the actual price against the question thresholds to determine the outcome.",
  sports: "Settle based on official game results from ESPN or the relevant sports league. Use final scores to determine the winner.",
  politics: "Settle based on official election results or policy announcements from government sources. Wait for official confirmation before settling.",
  entertainment: "Settle based on official announcements, award results, or verified news sources.",
  general: "Research the question using multiple reliable sources. Determine the outcome based on the best available evidence at the pool end time.",
};

function CreateAiArbiterForm() {
  const router = useRouter();
  const createArbiter = useCreateAiArbiter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [strategy, setStrategy] = useState(STRATEGY_EXAMPLES.general);
  const [error, setError] = useState<string | null>(null);

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    if (strategy === "" || Object.values(STRATEGY_EXAMPLES).includes(strategy)) {
      setStrategy(STRATEGY_EXAMPLES[cat] || "");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await createArbiter.mutateAsync({
        name,
        description: description || undefined,
        category,
        strategy,
      });
      router.push(`/ai-arbiters/${result.arbiter.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm text-muted-foreground block mb-1">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Oracle Bot, PriceWatch AI, ..."
          required
          maxLength={100}
          className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm border border-border focus:border-violet-500 outline-none"
        />
      </div>

      <div>
        <label className="text-sm text-muted-foreground block mb-1">Description (optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          placeholder="What does this AI arbiter do?"
          maxLength={2000}
          className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm border border-border focus:border-violet-500 outline-none resize-none"
        />
      </div>

      <div>
        <label className="text-sm text-muted-foreground block mb-1">Category</label>
        <div className="grid grid-cols-2 gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => handleCategoryChange(cat.value)}
              className={`text-left p-2.5 rounded-lg border text-xs transition-colors ${
                category === cat.value
                  ? "border-violet-500 bg-violet-500/10"
                  : "border-border bg-card"
              }`}
            >
              <div className="font-medium">{cat.label}</div>
              <div className="text-muted-foreground mt-0.5">{cat.hint}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm text-muted-foreground block mb-1">Settlement Strategy</label>
        <textarea
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
          rows={4}
          required
          placeholder="Describe how this AI should determine outcomes..."
          className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm border border-border focus:border-violet-500 outline-none resize-none"
        />
        <p className="text-xs text-muted-foreground mt-1">
          This prompt guides the AI when settling pools. Be specific about data sources and decision criteria.
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={createArbiter.isPending}
        className="w-full py-3 bg-violet-600 text-white rounded-xl font-semibold disabled:opacity-50"
      >
        {createArbiter.isPending ? "Creating..." : "Create AI Arbiter"}
      </button>
    </form>
  );
}

export default function CreateAiArbiterPage() {
  return (
    <main className="pb-20 px-4 pt-4">
      <h1 className="text-xl font-bold mb-1">Create AI Arbiter</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Deploy an AI-powered arbiter backed by your World ID. It will autonomously settle prediction markets.
      </p>
      <WorldIdGate level="orb" action="verify-identity">
        <CreateAiArbiterForm />
      </WorldIdGate>
      <TabNavigation />
    </main>
  );
}
