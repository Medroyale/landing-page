export default function Hero({ headingTitle, headingDescription, imgSrc }: { headingTitle: string, headingDescription: string, imgSrc: string }) {
    return (
        <section className="h-screen w-full bg-gray-50">
            <div className="container mx-auto h-full flex flex-col items-center justify-center gap-4">
                <h1 className="text-4xl font-bold text-gray-900">{headingTitle}</h1>
                <p className="text-gray-500 text-lg">{headingDescription}</p>
                <img src={imgSrc} alt="Hero" className="w-1/2 h-1/2" />
            </div>
        </section>
    )
}