import RegionNavs from "../Components/RegionNavs";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#146EB4] flex items-center justify-center px-4 font-f1">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-12 flex flex-col items-center gap-4 relative">
        <h1 className="text-3xl font-extrabold text-[#146EB4] tracking-wide">
          WWOS - GSOC
        </h1>
        <h2 className="text-lg font-semibold text-gray-700">
          Consolidated Contacts List
        </h2>

        <RegionNavs />
        <span className="absolute bottom-0 right-0 px-2 font-bold text-[#146EB4]">
          Hover over to find out the countries that are handled !
        </span>
      </div>
    </div>
  );
}
