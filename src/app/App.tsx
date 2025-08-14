import Features from "@/components/Features"
import Hero from "@/components/Hero"
import Navbar from "@/components/Navbar"
import screen1 from "@/assets/screen1.png"
import screen2 from "@/assets/screen-2.png"
import screen3 from "@/assets/screen-3.png"
import screen4 from "@/assets/organized.png"
import FAQ from "@/components/FAQ"
import CTA from "@/components/CTA"
import Footer from "@/components/Footer"

function App() {
  return (
    <div className="min-h-dvh flex flex-col scroll-smooth">
      <Navbar />
      <Hero />
      <section id="features" className="lg:px-[96px] lg:py-12 space-y-[240px] flex flex-col items-center">
        <Features
          layout={"default"}
          imgSrc={screen1}
          badgeText="Unique PVP"
          heading="Competitive real-time 1v1 battles: play against friends, or other medical students around the globe"
          description=""
        />
        <Features
          layout={"rtl"}
          imgSrc={screen2}
          badgeText="Unique Features"
          heading="A New UKMLA Question Bank You Can Trust"
          description="Questions are handcrafted by a team of doctors, ranging from one to a decade of experience, highly detailed explanations, helping you to understand, not memorise" />
        <Features
          layout={"ltr"}
          imgSrc={screen3}
          badgeText="Unique Features"
          heading="Turn Every Game Into Progress"
          description="Each question is attached to a flashcard. Our flashcards are also all handcrafted by our team, wrong answers automatically are added to your reviews for you to do blah blah, borrect questions can be manually added" />
        <Features
          layout={"default"}
          imgSrc={screen4}
          badgeText="Well Prepared"
          heading="Organised, detailed textbooks"
          description="Multiple trusted sources, Organised and accessible at the palm of your hand, Customisable, match your learning style, more pictures, more colour you name it" />
        <FAQ />
      </section>
      <section id="footer">
        <CTA />
        <Footer />
      </section>
    </div>
  )
}

export default App
