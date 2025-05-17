import ChatContainer from "../components/ChatContainer";
import Sidebar from "../components/Sidebar";

function HomePage() {
  return (
    <div className="h-[calc(100vh-3rem)]   bg-base-200 flex px-4 mt-12">
      <div className="hidden  lg:flex h-full">
        <Sidebar />
      </div>
      <div className="bg-base-100 rounded-lg shadow w-full max-w-6xl h-full overflow-hidden">
        <ChatContainer />
      </div>
    </div>
  );
}

export default HomePage;
