import { useState } from "react";

function CanvasTools() {
  const FunctionsLinks = [
    { name: "Zoom" },
    { name: "Erase" },
    { name: "Color Picker" },
    { name: "Paint brushes" },
    { name: "Text box" },
    { name: "Filters" },
    { name: "Crop, Resize, Rotate" },
    { name: "Quit" },
  ];
  const [active, setActive] = useState(FunctionsLinks[0].name);

  return (
    <nav className="w-full  items-end" aria-label="CanvasTools">
      <ul className="flex flex-row gap-2 text-white justify-center">
        {FunctionsLinks.map((link) => (
          <li
            key={link.name}
            onClick={() => setActive(link.name)}
            className={` mb-2 h-fit min-w-24 cursor-pointer rounded  hover:bg-green-600 ${
              active === link.name ? "bg-green-700" : "bg-gray-600"
            }`}
          >
            <a
              className="block h-full w-full p-4  text-center"
              href={`#${link.name.toLowerCase()}`}
              aria-current={active === link.name ? "page" : undefined}
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CanvasTools;
