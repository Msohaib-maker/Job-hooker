import Dashboard from "./components/Dashboard";

function App() {
  // const [currentView, setCurrentView] = useState<View>("form");
  console.log(import.meta.env.VITE_USERNAME);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex">
        {/* <Sidebar currentView={currentView} setCurrentView={setCurrentView} /> */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <Dashboard />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
