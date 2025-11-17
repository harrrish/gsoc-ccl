import { useState } from "react";
import RegionNavs from "../Components/RegionNavs";
import { useLocation } from "react-router-dom";

export default function NA() {
  const { pathname } = useLocation();
  const region = pathname.split("/")[1];

  const [showSmile, setShowSmile] = useState(false);

  //* ===========================> SMILEY CONTACTS
  const smileyContacts = [
    "AMER INTERNAL COMMS SUPPORT GROUP,",
    "NA ERC SUPPORT GROUP,",
    "AMER ERC SUPPORT GROUP,",
    "NETWORK OPERATIONS CENTER SUPPORT GROUP,",
    "GSOC MGMT SUPPORT GROUP,",
    "RISK GLOBAL LAST MILE,",
    "GLOBAL OTR SAFETY SUPPORT GROUP,",
    "NORTH AMERICA ROC SUPPORT GROUP,",
    "NORTH AMERICA OPS PR,",
  ];

  const [language, setLanguage] = useState("Eng");
  const [country, setCountry] = useState("US");
  const [siteCode, setSiteCode] = useState("");
  const [siteType, setSiteType] = useState("AMZL");
  const [sev, setSev] = useState("5");
  const [driverInvolved, setDriverInvolved] = useState("DSP");
  const [reportedBy, setReportedBy] = useState("DA");

  const [cxImpact, setCxImpact] = useState("");
  const [detrimental, setDetrimental] = useState("");
  const [hazardous, setHazardous] = useState("");
  const [thermal, setThermal] = useState("");
  const [dotRegulated, setDotRegulated] = useState("");
  const [discrimination, setDiscrimination] = useState("");
  const [vehicleMalFunction, setVehicleMalFunction] = useState("");

  const [error, setError] = useState("");
  const [contacts, setContacts] = useState([]);

  //* GENERATE CONTACTS
  const generateContacts = () => {
    contacts.length = 0;
    const newCon = [...smileyContacts];

    //* =========================> SELECT
    //* SITE CODE ERROR
    if (!siteCode.trim()) setError("Site code needed !");
    else {
      //* COUNTRY SITE-TYPE SEV#
      newCon.push(`${country} ${siteType} SEV${sev === "5" ? "4" : sev},`);

      //* NA SEV#
      newCon.push(`NA SEV${sev},`);

      //* DRIVER INVOLVED
      newCon.push(
        `${country} ${driverInvolved} SEV${sev === "5" ? "4" : sev},`,
      );

      //* REPORTED BY
      if (country === "US") {
        if (reportedBy === "DP") {
          newCon.push("sds-gsoc-flex-incident@amazon.com,");
          if (language === "Sp")
            newCon.push("sds-gsoc-flex-incident-spanish@amazon.com,");
        } else if (reportedBy === "CXCMKnownDA") {
          newCon.push("sds-gsoc-driver-potentialharm@amazon.com,");
          if (language === "Sp")
            newCon.push("sds-gsoc-driver-potentialharm-spanish@amazon.com,");
        } else if (reportedBy === "CXCM") {
          newCon.push("sds-gsoc-cx-incident@amazon.com,");
          if (language === "Sp")
            newCon.push("sds-gsoc-cx-incident@amazon.com,");
        } else if (reportedBy === "HubDA") {
          newCon.push("sds-gsoc-hub-incident@amazon.com,");
        }
      } else if (country === "CA") {
        if (reportedBy === "DP") {
          newCon.push("sds-gsoc-flex-incident@amazon.ca,");
          if (language === "Sp")
            newCon.push("sds-gsoc-flex-incident-spanish@amazon.com,");
        } else if (reportedBy === "CXCMKnownDA") {
          newCon.push("sds-gsoc-driver-potentialharm@amazon.ca,");
          if (language === "Sp")
            newCon.push("sds-gsoc-driver-potentialharm-spanish@amazon.com,");
        } else if (reportedBy === "CXCM") {
          newCon.push("sds-gsoc-cx-incident@amazon.ca,");
          if (language === "Sp")
            newCon.push("sds-gsoc-cx-incident@amazon.com,");
        }
      }

      //* CX FACING IMPACT
      if (cxImpact) newCon.push(cxImpact);

      //* DETRIMENTAL
      if (detrimental) newCon.push(detrimental);

      //* HAZARDOUS
      if (hazardous) newCon.push(hazardous);

      //* THERMAL
      if (thermal && sev === "5")
        newCon.push("NA LAST MILE VEHICLE THERMAL EVENT LOW SEVERITY,");
      else newCon.push(thermal);

      //* DOT  REGULATED
      if (dotRegulated) newCon.push(dotRegulated);

      //* DISCRIMINATION
      if (discrimination) newCon.push(discrimination);

      //* VEHICLE MALFUNCTION
      if (vehicleMalFunction && country === "US")
        newCon.push(vehicleMalFunction);
      else if (vehicleMalFunction && country === "CA")
        newCon.push("CA AMZL FLEET SUPPORT GROUP,");

      if (sev === "1" || sev === "2") {
        newCon.push("AMER LAST MILE RISK,");
        newCon.push(`AMER SEV${sev},`);
        newCon.push("NA RESILIENCE,");
      }

      setContacts([...newCon]);
    }
  };

  //* COPY CONTACTS
  async function handleCopy() {
    await navigator.clipboard.writeText(contacts);
    alert("Copied to clipboard!");
  }

  return (
    <div className="min-h-screen bg-[#146EB4] to-blue-200 flex items-center justify-center p-8 font-f1">
      {/* //* NAVBAR */}
      <nav className="fixed top-0 bg-[#146EB4] w-3/4 py-4 px-2 rounded-sm">
        <RegionNavs region={region} />
      </nav>

      {/* //* SMILEY MODAL */}
      {showSmile && (
        <div className="fixed top-0 left-0 bg-black/90 min-h-screen w-full flex items-center justify-center">
          {/* //* SMILEY CONTACTS */}
          <div className="bg-white p-4 rounded-sm shadow-sm border border-gray-200 flex items-start justify-between gap-6 flex-col">
            <h2 className="text-lg font-bold text-gray-800">
              Smiley contacts ({smileyContacts.length}) :
            </h2>
            <div className="flex flex-col items-end">
              {smileyContacts.map((contact, index) => (
                <p key={index} className="">
                  {contact}
                </p>
              ))}
            </div>
            <button
              onClick={() => setShowSmile(false)}
              className="bg-[#146EB4] w-full text-white border-[#146EB4] rounded-sm border-2 hover:text-black hover:bg-white cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* //* FORM */}
      <div className="bg-white w-full sm:max-w-3xl mt-24 mx-auto py-4 px-8 rounded-sm shadow-xl space-y-2">
        <h1 className="text-lg text-center font-extrabold text-gray-800 flex justify-between">
          NA <span className="text-lg font-bold">(US / CA)</span>
        </h1>

        {/* //* SELECT LANGUAGE */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h1 className="text-lg font-medium w-1/2 text-center">Language:</h1>
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="border p-2 rounded-sm font-medium w-1/2 text-center uppercase"
          >
            <option className="font-medium" value="Eng">
              English
            </option>
            <option className="font-medium" value="Sp">
              Spanish
            </option>
          </select>
        </div>

        {/* //* SELECT COUNTRY */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h1 className="text-lg font-medium w-1/2 text-center">Country:</h1>
          <select
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            className="border p-2 rounded-sm font-medium w-1/2 text-center"
          >
            <option className="font-medium" value="US">
              US
            </option>
            <option className="font-medium" value="CA">
              CA
            </option>
          </select>
        </div>

        {/* //* SITE CODE */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center">
          <h2 className="text-lg font-medium text-gray-800 mb-1 w-1/2 text-center">
            Site code:
          </h2>
          <input
            type="text"
            value={siteCode}
            onChange={(e) => setSiteCode(e.target.value)}
            className="w-1/2 py-1 px-2 border rounded-sm text-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent text-center uppercase"
            placeholder="DDA1"
          />
        </div>

        {/* //* SELECT SITE TYPE */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h2 className="text-lg font-medium text-gray-800 mb-1 w-1/2 text-center">
            Site type:
          </h2>
          <select
            value={siteType}
            onChange={(event) => setSiteType(event.target.value)}
            className="border p-2 rounded-sm font-medium w-1/2 text-center"
          >
            <option className="font-medium" value="AMZL">
              AMZL
            </option>
            <option className="font-medium" value="3RD PARTY LOGISTICS 3PL">
              3RD PARTY LOGISTICS 3PL
            </option>
            <option className="font-medium" value="SUB SAME DAY SSD">
              SUB SAME DAY SSD
            </option>
            <option className="font-medium" value="Rural Super Rural RSR">
              Rural Super Rural RSR
            </option>
            <option className="font-medium" value="TRADITIONAL FC">
              TRADITIONAL FC
            </option>
            <option className="font-medium" value="Traditional Sortable AR">
              Traditional Sortable AR
            </option>
            <option className="font-medium" value="Sort Center SC">
              Sort Center SC
            </option>
          </select>
        </div>

        {/* //* SELECT SEV */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h2 className="text-lg font-medium text-gray-800 mb-1 w-1/2 text-center">
            Severity:
          </h2>
          <select
            value={sev}
            onChange={(event) => setSev(event.target.value)}
            className="border p-2 rounded-sm font-medium w-1/2 text-center"
          >
            <option className="font-medium" value="5">
              5
            </option>
            <option className="font-medium" value="4">
              4
            </option>
            <option className="font-medium" value="3">
              3
            </option>
            <option className="font-medium" value="2">
              2
            </option>
            <option className="font-medium" value="1">
              1
            </option>
          </select>
        </div>

        {/* //* Driver Involved */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h2 className="text-lg font-medium text-gray-800 mb-1 w-1/2 text-center">
            Driver involved:
          </h2>
          <select
            value={driverInvolved}
            onChange={(event) => setDriverInvolved(event.target.value)}
            className="border p-2 rounded-sm font-medium w-1/2 text-center"
          >
            <option className="font-medium" value="DSP">
              DSP DA
            </option>
            <option className="font-medium" value="FLEX">
              Flex DP
            </option>
            {country === "US" && (
              <option className="font-medium" value="BICYCLE DSP">
                Bicycle DSP
              </option>
            )}
            {country === "US" && (
              <option className="font-medium" value="HUB DA">
                Hub DA
              </option>
            )}
          </select>
        </div>

        {/* //* REPORTED BY */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h2 className="text-lg font-medium text-gray-800 mb-1 w-1/2 text-center">
            Reported By:
          </h2>
          <select
            value={reportedBy}
            onChange={(event) => setReportedBy(event.target.value)}
            className="border p-2 rounded-sm font-medium w-1/2 text-center"
          >
            <option className="font-medium" value="DA">
              DA (CX/CM is Unknown)
            </option>
            <option className="font-medium" value="DP">
              Flex DP
            </option>
            <option className="font-medium" value="CXCMKnownDA">
              DA (CX/CM is Known)
            </option>
            <option className="font-medium" value="CXCM">
              CX/CM
            </option>
            {country === "US" && (
              <option className="font-medium" value="HubDA">
                Hub DA
              </option>
            )}
          </select>
        </div>

        {/* //* CX FACING IMPACT */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h2 className="text-lg font-medium text-gray-800 mb-1 w-1/2 text-center">
            Customer Facing Impact:
          </h2>
          <select
            value={cxImpact}
            onChange={(event) => setCxImpact(event.target.value)}
            className="border p-2 rounded-sm font-medium w-1/2 text-center"
          >
            <option className="font-medium" value="">
              No
            </option>
            <option
              className="font-medium"
              value={`${country} cx support group, cs-gcc-all@amazon.com,`}
            >
              Yes
            </option>
          </select>
        </div>

        {/* //* Detrimental Behavior */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h2 className="text-lg font-medium text-gray-800 mb-1 w-1/2 text-center">
            Detrimental Behavior:
          </h2>
          <select
            value={detrimental}
            onChange={(event) => setDetrimental(event.target.value)}
            className="border p-2 rounded-sm font-medium w-1/2 text-center"
          >
            <option className="font-medium" value="">
              No
            </option>
            <option className="font-medium" value="AMER LAST MILE RISK,">
              Yes
            </option>
          </select>
        </div>

        {/* //* Hazardous Material */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h2 className="text-lg font-medium text-gray-800 mb-1 w-1/2 text-center">
            Hazardous Material:
          </h2>
          <select
            value={hazardous}
            onChange={(event) => setHazardous(event.target.value)}
            className="border p-2 rounded-sm font-medium w-1/2 text-center"
          >
            <option className="font-medium" value="">
              No
            </option>
            <option
              className="font-medium"
              value="NA HAZMAT SUPPORT GROUP,DANGEROUS GOODS SUPPORT GROUP,"
            >
              Yes
            </option>
          </select>
        </div>

        {/* //* Delivery Van Vehicle Thermal Event  */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h2 className="text-lg font-medium text-gray-800 mb-1 w-1/2 text-center">
            Vehicle Thermal Event :
          </h2>
          <select
            value={thermal}
            onChange={(event) => setThermal(event.target.value)}
            className="border p-2 rounded-sm font-medium w-1/2 text-center"
          >
            <option className="font-medium" value="">
              No
            </option>
            <option
              className="font-medium"
              value="NA LAST MILE VEHICLE THERMAL EVENT,"
            >
              Yes
            </option>
          </select>
        </div>

        {/* //* DOT REGULATED VEHICLE */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h2 className="text-lg font-medium text-gray-800 mb-1 w-1/2 text-center">
            DOT Regulated Vehicle:
          </h2>
          <select
            value={dotRegulated}
            onChange={(event) => setDotRegulated(event.target.value)}
            className="border p-2 rounded-sm font-medium w-1/2 text-center"
          >
            <option className="font-medium" value="">
              No
            </option>
            <option
              className="font-medium"
              value="floftus@arcclaims.com, ecarroll@arcclaims.com,"
            >
              Yes
            </option>
          </select>
        </div>

        {/* //* DISCRIMINATION */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h2 className="text-lg font-medium text-gray-800 mb-1 w-1/2 text-center">
            Discrimination (hate-bias):
          </h2>
          <select
            value={discrimination}
            onChange={(event) => setDiscrimination(event.target.value)}
            className="border p-2 rounded-sm font-medium w-1/2 text-center"
          >
            <option className="font-medium" value="">
              No
            </option>
            <option
              className="font-medium"
              value="DISCRIMINATION SUPPORT GROUP,"
            >
              Yes
            </option>
          </select>
        </div>

        {/* //* VEHICLE MALFUNCTION */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h2 className="text-lg font-medium text-gray-800 mb-1 w-1/2 text-center">
            Vehicle Malfunction (Amazon-branded):
          </h2>
          <select
            value={vehicleMalFunction}
            onChange={(event) => setVehicleMalFunction(event.target.value)}
            className="border p-2 rounded-sm font-medium w-1/2 text-center"
          >
            <option className="font-medium" value="">
              No
            </option>
            <option
              className="font-medium"
              value="US AMZL FLEET SUPPORT GROUP,"
            >
              Yes
            </option>
          </select>
        </div>

        {/* //* ERROR */}
        {error && (
          <h1 className="w-full p-1 text-white bg-red-500 rounded-sm text-center font-bold tracking-wider">
            {error}
          </h1>
        )}

        <div className="flex gap-2">
          {/* //* GENERATE CONTACTS BUTTON */}
          <button
            onClick={() => setShowSmile(true)}
            className="p-2 text-white bg-[#146EB4] hover:text-[#146EB4] border-[#146EB4] rounded-sm duration-300 cursor-pointer border-2 hover:bg-white font-medium tracking-wide w-[40%]"
          >
            View Smiley Contacts
          </button>
          {/* //* GENERATE CONTACTS BUTTON */}
          <button
            onClick={generateContacts}
            className="p-2 text-white bg-[#146EB4] hover:text-[#146EB4] border-[#146EB4] rounded-sm duration-300 cursor-pointer border-2 hover:bg-white font-medium tracking-wide w-[60%]"
          >
            Generate Contacts
          </button>
        </div>

        {contacts.length > 0 && (
          <div className="space-y-2 flex flex-col">
            {/* //* CONTACTS DISPLAY */}
            <div className="bg-green-200 p-2 w-[95%] mx-auto rounded-sm shadow-2xl flex flex-wrap justify-center gap-1">
              {contacts.map((c, i) => (
                <span className="text-[12px]" key={i}>
                  {c}
                </span>
              ))}
            </div>
            {/* //* COPY CONTACTS */}
            <button
              onClick={handleCopy}
              className="w-full p-1 py-2 text-white bg-[#146EB4] hover:text-[#146EB4] rounded-sm duration-300 cursor-pointer border-2 hover:bg-white font-medium tracking-wide"
            >
              Copy Contacts
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
