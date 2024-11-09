import { useState } from "react";
import { SetReduxState, GetReduxState } from "../../Redux/Store";
import { appSettingsSlice } from "../../Redux/AppSettingsSlice";
function CanvasClipboard() {
  const setReduxState = SetReduxState();
  const FunctionsLinksOLD = [
    {
      id: "clip_Select",
      name: "Select",
      sub: ["Rectangular", "Lasso"],
    },
    { id: "clip_Copy", name: "Copy" },
    { id: "clip_Past", name: "Paste" },
    { id: "clip_Cute", name: "Cut" },
    { id: "clip_Quit", name: "Quit" },
  ];

  const [FunctionsLinks, setFunctionsLinks] = useState(FunctionsLinksOLD);

  const uperMenu = GetReduxState((state) => state.AppSettingsSlice.uperMenu);

  function handleClick(id: string, sub?: string): void {
    if (!sub) {
      setFunctionsLinks(FunctionsLinksOLD);
    } else {
      setFunctionsLinks(FunctionsLinksOLD);
      setFunctionsLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.id === sub ? { ...link, name: id } : link,
        ),
      );
    }

    setReduxState(appSettingsSlice.setUperMenu(id));
  }
  return (
    <nav className="w-full  items-end" aria-label="CanvasClipboard">
      <ul className="flex flex-row justify-center gap-2 text-white">
        {FunctionsLinks.map((link) => (
          <li
            key={link.id}
            className={`relative mb-2 h-fit min-w-24 ${link.sub ? "cursor-pointer" : "cursor-auto"} rounded  hover:bg-green-600
               ${uperMenu === link.id ? "bg-green-700" : "bg-gray-600"} 
               ${link.sub && " group/item ... hover:bg-red-400"}`}
          >
            <button
              className={`block h-full w-full p-4  text-center ${!link.sub ? "cursor-pointer" : "cursor-auto"} `}
              onClick={() => {
                !link.sub && handleClick(`${link.id}`);
              }}
              aria-current={uperMenu === link.id ? "page" : undefined}
            >
              {link.name}
            </button>
            {link.sub && (
              <ul className="group/edit ... invisible absolute left-0 top-14 z-10 m-auto flex flex-row justify-center gap-1  hover:visible group-hover/item:visible">
                {link.sub.map((sublink) => (
                  <li
                    key={sublink}
                    onClick={() => {
                      handleClick(`${sublink}`, link.id);
                    }}
                    className="mt-1 flex min-w-24 cursor-pointer items-center justify-center rounded bg-gray-600 py-2 align-middle hover:bg-green-700 "
                  >
                    {sublink}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CanvasClipboard;
