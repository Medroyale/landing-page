import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDownIcon, ChevronUpIcon, NotebookIcon } from "lucide-react"
import iphoneFrame from "@/assets/spaced_rep/iphone_frame.png"

interface TestSimulationProps {
    className?: string
}

type AppState = 'empty' | 'retention-modal' | 'loading' | 'question' | 'answer' | 'rating' | 'congratulations'

export default function TestSimulation({ className = "" }: TestSimulationProps) {
    const [appState, setAppState] = useState<AppState>('empty')
    const [retentionValue, setRetentionValue] = useState(0.90)
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)
    const [selectedInterval, setSelectedInterval] = useState<string | null>(null)
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)

    const question = "What are the typical chest X-ray findings in heart failure?"
    const answer = [
        "Alveolar oedema",
        "B-lines (Kerley B-lines)",
        "Cardiomegaly",
        "Diversion of upper lobe vessels",
        "Effusions",
        "Fluid in the fissures (e.g. horizontal fissure)"
    ]

    const difficultyButtons = [
        { label: "Reset", time: "20m", color: "bg-gray-500 hover:bg-gray-600" },
        { label: "Hard", time: "15d", color: "bg-orange-500 hover:bg-orange-600" },
        { label: "Decent", time: "1month", color: "bg-green-500 hover:bg-green-600" },
        { label: "Perfect", time: "2.2months", color: "bg-blue-500 hover:bg-blue-600" }
    ]


    const handleAddFlashcard = () => {
        setAppState('retention-modal')
    }

    const handleSaveRetention = () => {
        setAppState('loading')
        setTimeout(() => {
            setAppState('question')
        }, 1400)
    }

    const handleShowAnswer = () => {
        setIsBottomSheetOpen(true)
    }

    const handleDifficultySelect = (difficulty: string) => {
        setSelectedDifficulty(difficulty)
        const found = difficultyButtons.find((b) => b.label === difficulty)
        setSelectedInterval(found ? found.time : null)
        setIsBottomSheetOpen(false)
        setTimeout(() => {
            setAppState('congratulations')
        }, 500)
    }

    const adjustRetention = (direction: 'up' | 'down') => {
        const step = 0.01
        const newValue = direction === 'up'
            ? Math.min(1, retentionValue + step)
            : Math.max(0, retentionValue - step)
        setRetentionValue(Number(newValue.toFixed(2)))
    }

    return (
        <div id="test-simulation" className={`relative w-full max-w-7xl mx-auto py-16 ${className}`}>
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium mb-6">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Interactive Demo
                </div>
                <h2
                    className="font-medium text-2xl md:text-3xl lg:text-[48px] leading-[115%] tracking-[0.0075em] whitespace-pre-line"
                    style={{ fontFamily: 'Figtree, sans-serif' }}
                >
                    Try Review mode
                </h2>
                <p className={`text-base md:text-lg text-muted-foreground max-w-xl mx-auto mt-4`}>
                    Ready to test it? Answer a flashcard now and watch our system schedule your next review.                </p>
            </div>

            {/* Phone Simulation */}
            <div className="flex justify-center px-4">
                <div className="relative w-full max-w-[280px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-sm" style={{ aspectRatio: '394/830' }}>
                    {/* iPhone Frame */}
                    <img
                        src={iphoneFrame}
                        alt="iPhone Frame"
                        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                    />

                    {/* Screen Content */}
                    <div className="absolute inset-0 bg-white rounded-[40px] overflow-hidden"
                        style={{
                            margin: '20px',
                            width: 'calc(100% - 40px)',
                            height: 'calc(100% - 40px)'
                        }}>

                        {/* Main Container */}
                        <div className="h-full flex flex-col">
                            {/* Status Bar */}
                            <div className="flex justify-between items-center px-6 pt-3 pb-2">
                                <span className="text-black font-semibold">9:41</span>
                                <div className="flex items-center gap-1">
                                    <div className="w-1 h-1 bg-black rounded-full"></div>
                                    <div className="w-1 h-1 bg-black rounded-full"></div>
                                    <div className="w-1 h-1 bg-black rounded-full"></div>
                                    <div className="w-1 h-1 bg-black rounded-full"></div>
                                    <div className="w-6 h-3 border border-black rounded-sm">
                                        <div className="w-4 h-2 bg-black rounded-sm m-0.5"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Header */}
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-6">
                                    <h1 className="text-2xl font-bold text-black">Review Mode</h1>
                                    <div className="text-gray-400 text-xl">⋯</div>
                                </div>

                                {/* Tabs */}
                                <div className="flex gap-2">
                                    <div className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium ${appState === 'empty'
                                        ? 'bg-white border-gray-200 text-gray-600'
                                        : 'bg-white border-gray-200 text-gray-600'
                                        }`}>
                                        <NotebookIcon className="w-4 h-4" />
                                        New (0)
                                    </div>
                                    <div className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium ${appState === 'empty'
                                        ? 'bg-white border-gray-200 text-gray-600'
                                        : 'bg-white border-black border-2 text-black'
                                        }`}>
                                        <NotebookIcon className="w-4 h-4" />
                                        Due ({appState === 'empty' ? '0' : '0'})
                                    </div>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 relative">
                                <AnimatePresence mode="wait">
                                    {/* Empty State */}
                                    {appState === 'empty' && (
                                        <motion.div
                                            key="empty"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex-1 flex flex-col items-center justify-center text-center px-4 h-full"
                                        >
                                            <div className="space-y-2">
                                                <h2 className="text-2xl font-bold text-black">No flashcards available</h2>
                                                <p className="text-gray-500 text-sm max-w-sm">
                                                    Flashcards appear here when you get questions wrong or add them from your history.
                                                </p>
                                                <motion.button
                                                    onClick={handleAddFlashcard}
                                                    className="bg-black hover:bg-[#2F3DCB] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors relative mt-4"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Add flashcard from history
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Retention Modal */}
                                    {appState === 'retention-modal' && (
                                        <motion.div
                                            key="modal"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-20 px-4 h-full"
                                        >
                                            <motion.div
                                                initial={{ scale: 0.9, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-xs sm:max-w-sm shadow-2xl"
                                            >
                                                {/* Header */}
                                                <div className="flex justify-between items-center mb-6">
                                                    <h3 className="text-xl font-medium text-black">Desired retention</h3>
                                                    <button
                                                        onClick={() => setAppState('empty')}
                                                        className="text-black text-xl hover:text-gray-600 transition-colors"
                                                    >
                                                        ×
                                                    </button>
                                                </div>

                                                {/* Input Field */}
                                                <div className="mb-6">
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            value={retentionValue.toFixed(2)}
                                                            readOnly
                                                            className="w-full bg-gray-100 rounded-lg px-4 py-3 text-start text-lg font-medium text-black border-0 focus:outline-none"
                                                        />
                                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
                                                            <button
                                                                onClick={() => adjustRetention('up')}
                                                                className="text-black hover:text-gray-600 transition-colors"
                                                            >
                                                                <ChevronUpIcon className="w-6 h-6" />
                                                            </button>
                                                            <button
                                                                onClick={() => adjustRetention('down')}
                                                                className="text-black hover:text-gray-600 transition-colors"
                                                            >
                                                                <ChevronDownIcon className="w-6 h-6" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <p className="text-sm text-black text-start mb-6 leading-relaxed">
                                                    From 0 to 1, set how strongly you want to remember each flashcard. A higher value means more frequent reviews.
                                                </p>

                                                {/* Save Button */}
                                                <button
                                                    onClick={handleSaveRetention}
                                                    className="w-full bg-[#2F3DCB] hover:bg-[#2937BD] text-white py-2 rounded-[8px] font-medium transition-colors"
                                                >
                                                    Save
                                                </button>
                                            </motion.div>
                                        </motion.div>
                                    )}

                                    {/* Loading State */}
                                    {appState === 'loading' && (
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex-1 flex items-center justify-center overflow-hidden"
                                        >
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
                                            />
                                        </motion.div>
                                    )}

                                    {/* Question State */}
                                    {appState === 'question' && (
                                        <motion.div
                                            key="question"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="flex-1 flex flex-col items-center"
                                        >
                                            {/* Question Card */}
                                            <div className="bg-white rounded-lg p-4 mb-4">
                                                <h3 className="text-lg font-medium text-black">
                                                    {question}
                                                </h3>
                                            </div>

                                            {/* Show Answer Button */}
                                            <motion.button
                                                onClick={handleShowAnswer}
                                                className="w-fit py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-black font-medium transition-colors mb-4"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                Show answer
                                            </motion.button>

                                            {/* Bottom Sheet */}
                                            {isBottomSheetOpen && (
                                                <>
                                                    {/* Overlay */}
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        onClick={() => setIsBottomSheetOpen(false)}
                                                        className="absolute inset-0 z-0"
                                                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
                                                    />

                                                    {/* Bottom Sheet */}
                                                    <motion.div
                                                        initial={{ y: "100%" }}
                                                        animate={{ y: 0 }}
                                                        exit={{ y: "100%" }}
                                                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                                                        drag="y"
                                                        dragConstraints={{ top: 0, bottom: 0 }}
                                                        dragElastic={0.2}
                                                        onDragEnd={(_, info) => {
                                                            if (info.offset.y > 100) {
                                                                setIsBottomSheetOpen(false)
                                                            }
                                                        }}
                                                        className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 rounded-t-2xl max-h-[70vh] sm:max-h-[80vh] z-0"
                                                    >
                                                        {/* Drag Handle */}
                                                        <div
                                                            className="flex justify-center py-2 cursor-grab active:cursor-grabbing"
                                                            onPointerDown={(e) => e.preventDefault()}
                                                        >
                                                            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
                                                        </div>

                                                        {/* Close Button */}
                                                        <button
                                                            onClick={() => setIsBottomSheetOpen(false)}
                                                            className="absolute top-2 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                                                        >
                                                            ×
                                                        </button>

                                                        {/* Bottom Sheet Content */}
                                                        <div className="p-4 pb-6">
                                                            <h4 className="text-lg font-medium text-black mb-4">Show answer</h4>
                                                            <ul className="space-y-2">
                                                                {answer.map((item, index) => (
                                                                    <li key={index} className="text-sm text-black flex items-start">
                                                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                                                        {item}
                                                                    </li>
                                                                ))}
                                                            </ul>

                                                            {/* Time Intervals and Buttons */}
                                                            <div className="mt-6">
                                                                {/* Time Intervals */}
                                                                <div className="flex gap-2 mb-2">
                                                                    <div className="flex-1 text-center text-xs text-gray-500">20m</div>
                                                                    <div className="flex-1 text-center text-xs text-gray-500">15d</div>
                                                                    <div className="flex-1 text-center text-xs text-gray-500">1month</div>
                                                                    <div className="flex-1 text-center text-xs text-gray-500">2.2month</div>
                                                                </div>

                                                                {/* Difficulty Rating Buttons */}
                                                                <div className="flex gap-2">
                                                                    {difficultyButtons.map((button) => (
                                                                        <motion.button
                                                                            key={button.label}
                                                                            onClick={() => handleDifficultySelect(button.label)}
                                                                            className="flex-1 bg-white border border-gray-300 text-black py-2 px-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-50 cursor-pointer"
                                                                            whileHover={{ scale: 1.02 }}
                                                                            whileTap={{ scale: 0.98 }}
                                                                        >
                                                                            {button.label}
                                                                        </motion.button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </>
                                            )}
                                        </motion.div>
                                    )}

                                    {/* Congratulations State */}
                                    {appState === 'congratulations' && (
                                        <motion.div
                                            key="congratulations"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="flex-1 flex flex-col items-center justify-center text-center px-4 h-full"
                                        >
                                            <div className="space-y-2">
                                                <div className="text-6xl mb-4">🎉</div>
                                                <h2 className="text-2xl font-bold text-black">Congratulations!</h2>
                                                <p className="text-gray-600 text-sm max-w-sm">
                                                    This flashcard will return for review in {selectedInterval ?? 'a moment'}. Ready to start?
                                                </p>
                                                <motion.button
                                                    onClick={() => {
                                                        setAppState('empty')
                                                        setSelectedDifficulty(null)
                                                    }}
                                                    className="bg-[#2F3DCB] hover:bg-[#2937BD] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors mt-4 cursor-pointer"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Join our public testing
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Answer State with Bottom Sheet */}
                                    {appState === 'answer' && (
                                        <motion.div
                                            key="answer"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex-1 flex flex-col overflow-hidden"
                                        >
                                            <motion.div
                                                initial={{ height: 'auto' }}
                                                animate={{ height: 'auto' }}
                                                className="bg-white rounded-lg p-4 mb-4"
                                            >
                                                <h3 className="text-lg font-medium text-black mb-4">
                                                    {question}
                                                </h3>
                                                <div className="border-t border-gray-200 pt-4">
                                                    <div className="text-sm text-gray-600 mb-3">Show answer</div>
                                                    <ul className="space-y-2">
                                                        {answer.map((item, index) => (
                                                            <li key={index} className="text-sm text-black flex items-start">
                                                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </motion.div>

                                            {/* Difficulty Rating Buttons */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="mt-auto"
                                            >
                                                <div className="grid grid-cols-2 gap-3">
                                                    {difficultyButtons.map((button) => (
                                                        <motion.button
                                                            key={button.label}
                                                            onClick={() => handleDifficultySelect(button.label)}
                                                            className={`${button.color} text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 ${selectedDifficulty === button.label ? 'scale-95' : 'hover:scale-105'
                                                                }`}
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <div className="text-xs opacity-90">{button.time}</div>
                                                            <div className="font-semibold">{button.label}</div>
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Bottom Navigation */}
                            <div className="px-6 py-4 border-t border-gray-200 bg-white">
                                <div className="flex justify-around">
                                    {['book', 'help', 'home', 'trophy', 'user'].map((icon, index) => (
                                        <div
                                            key={icon}
                                            className={`w-8 h-8 rounded-full flex items-center justify-center ${index === 2 ? 'bg-blue-500' : 'bg-gray-100'
                                                }`}
                                        >
                                            <div className={`w-4 h-4 ${index === 2 ? 'bg-white' : 'bg-gray-400'} rounded`}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
