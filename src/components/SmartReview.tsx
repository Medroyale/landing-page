import iphone1 from "@/assets/spaced_rep/iphone_spaced_rep_1.png"
import iphone2 from "@/assets/spaced_rep/iphone_spaced_rep_2.png"
import iphone3 from "@/assets/spaced_rep/iphone_spaced_rep_3.png"
import blueCircle from "@/assets/spaced_rep/blue-circle.png"
import { Button } from "./ui/button"

interface SmartReviewProps {
    badgeText?: string
    heading?: string
    description?: string
    leftTitle?: string
    leftDescription?: string
    rightTitle?: string
    rightDescription?: string
}

export default function SmartReview({
    badgeText = "Review mode",
    heading = "Master knowledge with smart review",
    description = "Forget cramming our adaptive review engine spaces your learning for maximum retention. Built on FSRS, a cutting-edge open-source algorithm.",
    leftTitle = "Filter your reviews your way",
    leftDescription = "Choose exactly which topics you want to review. Stay focused by filtering subjects, categories, or specific questions.",
    rightTitle = "Review smarter, not harder",
    rightDescription = "Answer questions, reveal explanations, and let our algorithm schedule the perfect time for your next review."
}: SmartReviewProps) {
    return (
        <div className="relative w-full max-w-7xl mx-auto py-12">
            {/* Header Section */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium mb-6">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {badgeText}
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                    {heading}
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
                    {description}
                </p>
            </div>

            {/* Main Content Grid */}
            <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-12 items-center justify-center">
                {/* Left Text */}
                <div className="lg:col-span-1 space-y-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {leftTitle}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        {leftDescription}
                    </p>
                </div>

                {/* Center - Phone Screens */}
                <div className="lg:col-span-1 relative flex justify-center">
                    {/* Blue Circle Background */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <img
                            src={blueCircle}
                            alt="Background decoration"
                            className="w-[500px] h-[500px] object-contain"
                        />
                    </div>

                    {/* Phone Screens Container */}
                    <div className="relative z-10 flex items-start justify-center gap-16">
                        {/* Left Phone - Filter Screen */}
                        <div className="relative z-10 -mt-4 -ml-2">
                            <img
                                src={iphone1}
                                alt="Review mode filter interface"
                                className="w-[200px] md:w-[240px] h-auto transform -rotate-[18deg] hover:rotate-0 transition-transform duration-300"
                            />
                        </div>

                        {/* Right Phone - Question Screen */}
                        <div className="relative z-20 -ml-4 group">
                            <img
                                src={iphone3}
                                alt="Review mode question interface"
                                className="w-[240px] md:w-[280px] h-auto transform rotate-[19.32deg] group-hover:rotate-0 transition-all duration-500 opacity-100 group-hover:opacity-0 absolute"
                            />
                            <img
                                src={iphone2}
                                alt="Review mode question interface"
                                className="w-[240px] md:w-[280px] h-auto transform rotate-[19.32deg] group-hover:rotate-0 transition-all duration-500 opacity-0 group-hover:opacity-100"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Text */}
                <div className="lg:col-span-1 space-y-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {rightTitle}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        {rightDescription}
                    </p>
                </div>
            </div>

            {/* Centered Button */}
            <div className="flex justify-center mt-12">
                <Button
                    variant={"outline"}
                    className="w-fit"
                    onClick={() => {
                        const testSimulation = document.getElementById('test-simulation');
                        if (testSimulation) {
                            testSimulation.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                >
                    Try our spaced repetition system
                </Button>
            </div>
        </div>
    )
}
