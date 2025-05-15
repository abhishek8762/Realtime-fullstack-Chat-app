import ChatContainer from "../components/ChatPage";
import Sidebar from "../components/Sidebar";

function HomePage() {
  return (
    <div className="h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="bg-base-100 rounded-lg shadow w-full max-w-6xl h-[calc(100vh-4rem)] overflow-hidden">
        <div className="hidden lg:flex h-full">
          <Sidebar />
        </div>

        <ChatContainer />
      </div>
    </div>
  );
}

export default HomePage;
