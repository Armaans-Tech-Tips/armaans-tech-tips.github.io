import React from "react";
import { GraduationCap, BookOpen, Code, Calculator, Globe } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { ShareBanner } from "@/components/ShareBanner";
import { ContentSection } from "@/components/ContentSection";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";
import { TopBannerAd, BottomAd, InContentAd } from "@/components/GoogleAd";
import { useAuth } from "@/contexts/AuthContext";

const EducationPage = () => {
  const { isAuthenticated } = useAuth();

  // Learning Platforms
  const learningPlatforms: Array<{ text: string; url?: string }> = [
    { text: "📚 Khan Academy - Free Courses", url: "https://www.khanacademy.org/" },
    { text: "🎓 Coursera - University Courses", url: "https://www.coursera.org/" },
    { text: "💡 Brilliant - Math & Science", url: "https://brilliant.org/" },
    { text: "🌍 Duolingo - Languages", url: "https://www.duolingo.com/" },
    { text: "🧪 PhET - Science Simulations", url: "https://phet.colorado.edu/" },
  ];

  // Study Tools
  const studyTools: Array<{ text: string; url?: string }> = [
    { text: "🧮 Desmos Graphing Calculator", url: "https://www.desmos.com/calculator" },
    { text: "📊 Wolfram Alpha", url: "https://www.wolframalpha.com/" },
    { text: "🧮 Course Grade Calculator", url: "https://www.desmos.com/calculator/wrmalnmnpj" },
    { text: "📝 Grammarly - Writing Help", url: "https://www.grammarly.com/" },
    { text: "🎓 Quizlet - Flashcards", url: "https://quizlet.com/" },
  ];

  // Research & Reading
  const researchReading: Array<{ text: string; url?: string }> = [
    { text: "🔍 Google Scholar", url: "https://scholar.google.com/" },
    { text: "📖 SparkNotes - Study Guides", url: "https://www.sparknotes.com/" },
    { text: "📚 LibGen - Free Textbooks", url: "https://libgen.is/" },
    { text: "🎬 Internet Archive", url: "https://archive.org/" },
    { text: "📰 Wikipedia", url: "https://www.wikipedia.org/" },
  ];

  // Coding & Tech
  const codingTech: Array<{ text: string; url?: string }> = [
    { text: "💻 Codecademy - Learn to Code", url: "https://www.codecademy.com/" },
    { text: "🐙 GitHub - Code Hosting", url: "https://github.com/" },
    { text: "📋 W3Schools - Web Dev", url: "https://www.w3schools.com/" },
    { text: "🎮 Scratch - Visual Coding", url: "https://scratch.mit.edu/" },
    { text: "🐍 Replit - Online IDE", url: "https://replit.com/" },
  ];

  return (
    <>
      <SEO 
        title="Education Resources & Study Tools | Tech Tips"
        description="Free educational resources including grade calculator, programming tutorials, math resources, study techniques, and learning guides for students."
        keywords="education resources, grade calculator, study tools, programming tutorials, math resources, study techniques, learning guides, student resources, online learning"
      />
      <div className={`min-h-screen ${isAuthenticated ? "bg-gamer-bg" : "bg-background"}`}>
        <ShareBanner />
        <Navbar />

        <TopBannerAd />

        {/* Learning Platforms */}
        <ContentSection
          id="learning"
          icon={GraduationCap}
          title="📚 Learning Platforms"
          description="Free courses and interactive learning"
          items={learningPlatforms}
        />

        <InContentAd />

        {/* Study Tools */}
        <ContentSection
          id="study-tools"
          icon={Calculator}
          title="🧮 Study Tools"
          description="Calculators, flashcards, and study aids"
          items={studyTools}
        />

        {/* Research & Reading */}
        <ContentSection
          id="research"
          icon={BookOpen}
          title="📖 Research & Reading"
          description="Academic resources and free textbooks"
          items={researchReading}
        />

        <InContentAd />

        {/* Coding & Tech */}
        <ContentSection
          id="coding"
          icon={Code}
          title="💻 Coding & Tech"
          description="Learn programming and development"
          items={codingTech}
        />

        <BottomAd />

        <Footer />
      </div>
    </>
  );
};

export default EducationPage;
