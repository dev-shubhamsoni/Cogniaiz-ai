
import { MouseFollowerDemo } from "@/components/mouse-follower-demo";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-4 pt-0">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-4">Mouse Follower Demo</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore the interactive cursor effects implemented with the Cuberto Mouse Follower library.
          Move your cursor around to see different effects!
        </p>
      </div>
      
      <MouseFollowerDemo />
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          Implementation based on the 
          <a 
            href="https://github.com/Cuberto/mouse-follower" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 ml-1"
          >
            Cuberto Mouse Follower
          </a> library.
        </p>
      </div>
    </div>
  )
}
