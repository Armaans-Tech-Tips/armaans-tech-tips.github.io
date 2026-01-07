import React, { useEffect, useRef } from "react";

type Props = {
  variant?: "floating" | "inline";
  visible?: boolean;
};

export const VisitorCounter: React.FC<Props> = ({ variant = "floating", visible = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // Clear any previous embeds
    root.innerHTML = "";

    // EXACT external embed block (do not alter URLs or order)
    const anchor = document.createElement("a");
    anchor.href = "http://www.freevisitorcounters.com";
    anchor.textContent = "free counter";

    const script1 = document.createElement("script");
    script1.type = "text/javascript";
    script1.src = "https://www.freevisitorcounters.com/auth.php?id=4ec2798bde811331fb1531de8e659293860a2208";

    const script2 = document.createElement("script");
    script2.type = "text/javascript";
    script2.src = "https://www.freevisitorcounters.com/en/home/counter/1233557/t/0";

    root.appendChild(anchor);
    root.appendChild(script1);
    root.appendChild(script2);
  }, []);

  if (!visible) return null;

  const content = <div ref={containerRef} className="sr-only" aria-hidden="true" />;

  if (variant === "floating") {
    return (
      <div className="fixed bottom-4 right-4 z-[9999] rounded-md border border-gamer-border bg-gamer-card/90 px-3 py-2 text-xs text-gamer-text shadow-lg">
        {content}
      </div>
    );
  }

  return <div className="text-center text-sm">{content}</div>;
};
