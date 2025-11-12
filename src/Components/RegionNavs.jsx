import { NavLink } from "react-router-dom";

export default function RegionNavs({ region }) {
  //* COPY CONTACTS
  async function handleCopy() {
    await navigator.clipboard.writeText("wwos-gsoc-archive@amazon.com");
    alert(`Copied "wwos-gsoc-archive@amazon.com" to clipboard`);
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex justify-between gap-2 items-center w-full">
        <NavLink
          to={"/NA"}
          title="United States | Canada"
          className={`shadow-2xl ${
            region === "NA" ? "bg-[#146EB4] text-white" : "bg-white"
          } hover:bg-[#146EB4] hover:text-black font-bold p-2 px-4 rounded-sm w-full text-center border-2 border-white`}
        >
          NA
        </NavLink>
        <NavLink
          to={"/LATAM"}
          title="Mexico | Brazil"
          className={`shadow-2xl ${
            region === "LATAM" ? "bg-[#146EB4] text-white" : "bg-white"
          } hover:bg-[#146EB4] hover:text-black font-bold p-2 px-4 rounded-sm w-full text-center border-2 border-white`}
        >
          LATAM
        </NavLink>
        <NavLink
          to={"/Europe"}
          title="UK | Ireland | Germany | Austria | Luxembourg | Spain |
            France | Belgium | Italy"
          className={`shadow-2xl ${
            region === "Europe" ? "bg-[#146EB4] text-white" : "bg-white"
          } hover:bg-[#146EB4] hover:text-black font-bold p-2 px-4 rounded-sm w-full text-center border-2 border-white`}
        >
          Europe
        </NavLink>
        <NavLink
          to={"/AMET"}
          title="UAE | SAUDI | EGYPT | TURKEY"
          className={`shadow-2xl ${
            region === "AMET" ? "bg-[#146EB4] text-white" : "bg-white"
          } hover:bg-[#146EB4] hover:text-black font-bold p-2 px-4 rounded-sm w-full text-center border-2 border-white`}
        >
          AMET
        </NavLink>
        <NavLink
          to={"/APAC"}
          title="AUSTRALIA | JAPAN | SINGAPORE | INDIA"
          className={`shadow-2xl ${
            region === "APAC" ? "bg-[#146EB4] text-white" : "bg-white"
          } hover:bg-[#146EB4] hover:text-black font-bold p-2 px-4 rounded-sm w-full text-center border-2 border-white`}
        >
          APAC
        </NavLink>
      </div>
      {region && (
        <div className="bg-white flex items-center w-1/2 justify-between p-2 rounded-sm">
          <h1>wwos-gsoc-archive@amazon.com</h1>
          <button
            onClick={handleCopy}
            className="bg-[#146EB4] text-white px-2 rounded-sm cursor-pointer"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
