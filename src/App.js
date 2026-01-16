import Background3D from "./Background3D";
import StarfieldBackground from "./StarFieldBackground";
import UrlShortener from "./UrlShortener";

export const App = ()=> {
  return (
    <div className="h-screen w-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <Background3D />
        <StarfieldBackground/>
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-4">
        <UrlShortener />
      </div>
    </div>
  );
}
