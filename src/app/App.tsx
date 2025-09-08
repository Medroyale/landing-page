import Features from "@/components/Features"
import Hero from "@/components/Hero"
import Navbar from "@/components/Navbar"
import screen1 from "@/assets/turn_every_game_into_progress.png"
import screen2 from "@/assets/spaced_repetition_made_simple.png"
import featureImg from "@/assets/feature_image.png"
import featureImg2 from "@/assets/feature_image_2.png"
import FAQ from "@/components/FAQ"
import CTA from "@/components/CTA"
import Footer from "@/components/Footer"

function App() {
  return (
    <div className="min-h-dvh flex flex-col scroll-smooth">
      <Navbar />
      <Hero />
      <section id="features" className="px-6 md:px-9 lg:px-[96px] py-8 md:py-12 lg:py-16 space-y-16 md:space-y-24 lg:space-y-[240px] flex flex-col items-center">
        <Features
          layout={"default"}
          imgSrc={featureImg}
          badgeText="Unique PVP"
          heading={"Play against friends...\nOr anyone across the globe"}
          description=""
        />
        <Features
          layout={"ltr"}
          imgSrc={screen2}
          badgeText="Question history"
          heading="Turn Every Game Into Progress"
          description="Every question is linked to a relevant flashcard, written by our team of doctors and aligned with our textbook. Get one wrong? Its flashcard is automatically added to Review mode." />
        <Features
          layout={"rtl"}
          imgSrc={screen1}
          badgeText="Review mode"
          heading="Spaced repetition made simple"
          description="Questions are handcrafted by a team of doctors, ranging from one to a decade of experience, highly detailed explanations, helping you to understand, not memorise" />
        <Features
          layout={"default"}
          imgSrc={featureImg2}
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
