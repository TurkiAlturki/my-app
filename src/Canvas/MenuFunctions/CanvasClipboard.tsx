import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function CanvasClipboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const FunctionsLinks = [
    { name: "Copy" },
    { name: "Past" },
    { name: "Cute" },
    { name: "Quit" },
  ];
  const [active, setActive] = useState(FunctionsLinks[0].name);

  return (
    <nav className="w-full  items-end" aria-label="CanvasClipboard">
      <ul className="flex flex-row justify-center gap-2 text-white">
        {FunctionsLinks.map((link) => (
          <li
            key={link.name}
            onClick={() => setActive(link.name)}
            className={` mb-2 h-fit min-w-24 cursor-pointer rounded  hover:bg-green-600 ${
              active === link.name ? "bg-green-700" : "bg-gray-600"
            }`}
          >
            <button
              className="block h-full w-full p-4  text-center"
              onClick={() => navigate(`${link.name.toLowerCase()}`)}
              aria-current={active === link.name ? "page" : undefined}
            >
              {link.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CanvasClipboard;
