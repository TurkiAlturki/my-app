import { useState } from "react";
import { SetReduxState } from "../../Redux/Store";
import { appSettingsSlice } from "../../Redux/AppSettingsSlice";

function CanvasTools() {
  const setReduxState = SetReduxState();

  interface Interface {
    id: string;
    name: string;
    sub?: string[]; // Optional sub array for future submenu use
  }

  const FunctionsLinksOLD: Interface[] = [
    { id: "tools_Zoom", name: "Zoom" },
    { id: "tools_Erase", name: "Erase" },
    { id: "tools_Picker", name: "Color Picker" },
    { id: "tools_brushes", name: "Paint brushes" },
    { id: "tools_Text", name: "Text box" },
    { id: "tools_Filters", name: "Filters" },
    { id: "tools_cut_resize_rotat", name: "Crop, Resize, Rotate" },
    { id: "tools_quit", name: "Quit" },
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
                        <button className="block text-[15px] font-semibold text-gray-600 hover:fill-[#007bff] hover:text-[#007bff]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20px"
                            height="20px"
                            className="mr-4 inline-block"
                            viewBox="0 0 64 64"
                            aria-hidden="true"
                          >
                            <path d="M61.92 30.93a7.076 7.076 0 0 0-6.05-5.88 8.442 8.442 0 0 0-.87-.04V22A15.018 15.018 0 0 0 40 7H24A15.018 15.018 0 0 0 9 22v3.01a8.442 8.442 0 0 0-.87.04 7.076 7.076 0 0 0-6.05 5.88A6.95 6.95 0 0 0 7 38.7V52a3.009 3.009 0 0 0 3 3v6a1 1 0 0 0 1 1h3a1 1 0 0 0 .96-.73L16.75 55h30.5l1.79 6.27A1 1 0 0 0 50 62h3a1 1 0 0 0 1-1v-6a3.009 3.009 0 0 0 3-3V38.7a6.95 6.95 0 0 0 4.92-7.77ZM11 22A13.012 13.012 0 0 1 24 9h16a13.012 13.012 0 0 1 13 13v3.3a6.976 6.976 0 0 0-5 6.7v3.18a3 3 0 0 0-1-.18H17a3 3 0 0 0-1 .18V32a6.976 6.976 0 0 0-5-6.7Zm37 16v5H16v-5a1 1 0 0 1 1-1h30a1 1 0 0 1 1 1ZM13.25 60H12v-5h2.67ZM52 60h-1.25l-1.42-5H52Zm3.83-23.08a1.008 1.008 0 0 0-.83.99V52a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V37.91a1.008 1.008 0 0 0-.83-.99 4.994 4.994 0 0 1 .2-9.88A4.442 4.442 0 0 1 9 27h.01a4.928 4.928 0 0 1 3.3 1.26A5.007 5.007 0 0 1 14 32v12a1 1 0 0 0 1 1h34a1 1 0 0 0 1-1V32a5.007 5.007 0 0 1 1.69-3.74 4.932 4.932 0 0 1 3.94-1.22 5.018 5.018 0 0 1 4.31 4.18v.01a4.974 4.974 0 0 1-4.11 5.69Z" />
                          </svg>
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

export default CanvasTools;
