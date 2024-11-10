import { useState } from "react";
import { SetReduxState } from "../../Redux/Store";
import { appSettingsSlice } from "../../Redux/AppSettingsSlice";
import { LuLassoSelect, LuBoxSelect } from "react-icons/lu";
function CanvasClipboard() {
  const setReduxState = SetReduxState();

  interface Interface {
    id: string;
    name: string;
    sub?: string[]; // Optional sub array for future submenu use
  }

  const FunctionsLinksOLD: Interface[] = [
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


  function handleClick(id: string, sub?: string): void {
    if (!sub) {
      setFunctionsLinks(FunctionsLinksOLD);
    } else {
      setFunctionsLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.id === sub ? { ...link, name: id } : link,
        ),
      );
    }
    setReduxState(appSettingsSlice.setUperMenu(id));
  }

  return (
    <header className="relative z-50 bg-white font-[sans-serif] tracking-wide shadow-md">
      <div className="relative flex flex-wrap justify-center px-10 py-3">
        <div
          id="collapseMenu"
          className="max-lg:hidden max-lg:before:fixed max-lg:before:inset-0 max-lg:before:z-50 max-lg:before:bg-black max-lg:before:opacity-40 lg:!block"
        >
          <ul className="z-50 max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:h-full max-lg:w-2/3 max-lg:min-w-[300px] max-lg:space-y-3 max-lg:overflow-auto max-lg:bg-white max-lg:p-4 max-lg:shadow-md lg:flex lg:gap-x-10">
            {FunctionsLinks.map((link) => (
              <li
                key={link.id}
                className={`group relative max-lg:border-b max-lg:px-3 max-lg:py-3 ${
                  link.sub ? "cursor-pointer" : "cursor-auto"
                }`}
              >
                <button
                  className="block text-[15px] font-semibold text-gray-600 hover:fill-[#007bff] hover:text-[#007bff]"
                  onClick={() => {
                    !link.sub && handleClick(`${link.id}`);
                  }}
                >
                  {link.name}
                  {link.sub && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16px"
                      height="16px"
                      className="ml-1 inline-block"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z" />
                    </svg>
                  )}
                </button>
                {link.sub && (
                  <ul className="absolute left-0 top-5 z-50 block max-h-0 min-w-[250px] space-y-2 overflow-hidden bg-white px-6 shadow-lg transition-all duration-500 group-hover:max-h-[700px] group-hover:pb-4 group-hover:pt-6 group-hover:opacity-100 max-lg:top-8">
                    {link.sub.map((sublink) => (
                      <li
                        className="border-b py-3"
                        key={sublink}
                        onClick={() => handleClick(sublink, link.id)}
                      >
                        <button className=" flex items-center justify-center text-[15px] font-semibold text-gray-600 hover:fill-[#007bff] hover:text-[#007bff]">
                          <div className="mr-2 inline-block">
                            {sublink === "Lasso" && <LuLassoSelect />}
                            {sublink === "Rectangular" && <LuBoxSelect />}
                          </div>
                          {sublink}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div id="toggleOpen" className="ml-auto flex lg:hidden">
          <button>
            <svg
              className="h-7 w-7"
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default CanvasClipboard;
