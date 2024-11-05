
import { useState } from "react";
import { SetReduxState } from "../../Redux/Store";
import { appSettingsSlice } from "../../Redux/AppSettingsSlice";
function CanvasShapes() {
  const setReduxState = SetReduxState();

  const FunctionsLinks = [
    { id: "Shapes_List_of_Shapes", name: "List of Shapes" },
    { id: "shapes_Outline_color", name: "Outline color" },
    { id: "shapes_Fill_color", name: "Fill color" },
    { id: "shapes_quit", name: "Quit" },
  ];
  const [active, setActive] = useState(FunctionsLinks[0].id);

  function handleClick(id: string): void {
    setActive(id);
    setReduxState(appSettingsSlice.setUperMenu(id));
  }

  return (
    <nav className="w-full  items-end" aria-label="CanvasShapes">
      <ul className="flex flex-row justify-center gap-2 text-white">
        {FunctionsLinks.map((link) => (
          <li
            key={link.id}
            className={` mb-2 h-fit min-w-24 cursor-pointer rounded  hover:bg-green-600 ${
              active === link.id ? "bg-green-700" : "bg-gray-600"
            }`}
          >
            <button
              className="block h-full w-full p-4  text-center"
              onClick={() => handleClick(`${link.id.toLowerCase()}`)}
              aria-current={active === link.id ? "page" : undefined}
            >
              {link.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CanvasShapes;
