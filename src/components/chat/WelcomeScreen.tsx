
import { Twitter } from "lucide-react";

export function WelcomeScreen() {
  return (
    <div className="flex h-[calc(100vh-180px)] flex-col items-center justify-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-tweet">
        <Twitter className="h-7 w-7 text-white" />
      </div>
      <h2 className="mb-2 text-xl font-bold">Welcome to Tweet Summarizer</h2>
      <p className="text-center text-muted-foreground max-w-md">
        Search for topics, hashtags, or accounts to get summaries of the most relevant tweets.
      </p>
    </div>
  );
}
