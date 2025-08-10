import { Button } from "@/components/ui/button"
import Seo from "@/components/Seo"

function App() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Seo title="MedRoyale — Home" description="Discover MedRoyale." />
      <Button
        className="mx-auto"
        variant={"default"}
        onClick={() => {
          console.log("Clicked me!")
        }}
      >
        Click me
      </Button>
    </div>
  )
}

export default App
