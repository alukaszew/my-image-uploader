import "./index.css";
import { UploadForm } from "./components/UploadForm";
import "./index.css";

function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <div className="container mx-0">
        <h1 className="text-4xl font-bold text-teal-300 mb-6">
          Image Uploader
        </h1>
        <UploadForm />
      </div>
    </div>
  );
}

export default App;
