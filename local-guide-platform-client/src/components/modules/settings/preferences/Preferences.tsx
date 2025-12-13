//

import BrandColor from "./BrandColor";
import { ModeToggle } from "./ModeToggle";

export default function Preferences() {
  return (
    <div className="">
      <h3 className="text-2xl md:text-4xl font-bold">Preferences</h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 mt-3 pt-6 border-t">
        <div>
          <h4 className="text-lg font-bold">Brand color</h4>
          <p>Select or customize your brand color.</p>
        </div>
        <BrandColor />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 mt-3 pt-6 border-t">
        <div>
          <h4 className="text-lg font-bold">Interface theme</h4>
          <p>Select or customize your UI theme.</p>
        </div>
        <ModeToggle />
      </div>
    </div>
  );
}
