import { useState } from "react";
import { Link } from "react-router-dom";

function SideMenu() {
  const FunctionsLinks = [
    { name: "File" },
    { name: "Clipboard" },
    { name: "Shapes" },
    { name: "Colors" },
    { name: "Tools"},
    { name: "Quit"},
  ];
  const [active, setActive] = useState("");
  console.log(active)
  return (
    <nav className="w-80 bg-gray-800" aria-label="Sidebar">
      <ul className="flex flex-col text-white">
        {FunctionsLinks.map((link) => (
          <li
            key={link.name}
            onClick={() => setActive(link.name)}
            className={`my-4 cursor-pointer rounded h-fit hover:bg-green-600 ${
              active === link.name ? "bg-green-700" : "bg-gray-600"
            }`}
          >
            <Link className="w-full h-full p-4 block" to={`${link.name.toLowerCase()}`} aria-current={active === link.name ? "page" : undefined}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SideMenu;
