import { useState } from "react";
import RegionNavs from "../Components/RegionNavs";
import { useLocation } from "react-router-dom";

export default function LATAM() {
  const { pathname } = useLocation();
  const region = pathname.split("/")[1];

  const [showSmile, setShowSmile] = useState(false);

  //* ===========================> SMILEY CONTACTS
  const smileyContacts = [
    "AMER INTERNAL COMMS SUPPORT GROUP",
    "AMER ERC SUPPORT GROUP",
    "NETWORK OPERATIONS CENTER SUPPORT GROUP",
    "GSOC MGMT SUPPORT GROUP",
    "RISK GLOBAL LAST MILE",
    "GLOBAL OTR SAFETY SUPPORT GROUP",
    "NORTH AMERICA ROC SUPPORT GROUP",
    "NORTH AMERICA OPS PR",
  ];

  //* =========================================================> DROP DOWN
  //* ===========================> SET COUNTRY
  const [country, setCountry] = useState("US");
  const [siteCode, setSiteCode] = useState("");
  const [siteType, setSiteType] = useState("AMZL");
  const [sev, setSev] = useState("5");
  const [ic, setIC] = useState("");
  const [driverInvolved, setDriverInvolved] = useState("DSP");
  const [reportedBy, setReportedBy] = useState("reportedByDP");

  //* =========================================================> RADIO
  const [cxImpact, setCxImpact] = useState("no");
  const [detrimental, setDetrimental] = useState("no");
  const [hazardous, setHazardous] = useState("no");
  const [thermal, setThermal] = useState("no");
  const [dotRegulated, setDotRegulated] = useState("no");
  const [discrimination, setDiscrimination] = useState("no");

  const [error, setError] = useState("");
  const [contacts, setContacts] = useState([]);

  //* GENERATE CONTACTS
  const generateContacts = () => {
    contacts.length = 0;
    const newContacts = [...smileyContacts];

    //* =========================> SELECT
    //* SITE CODE ERROR
    if (!siteCode.trim()) {
      setError("Site code needed !");
      setTimeout(() => setError(""), 3000);
      return;
    }
    newContacts.push(`${siteCode} IMT`);

    //* IC CODE ERROR
    if (!ic.trim()) {
      setError("Bcc Individuals needed !");
      setTimeout(() => setError(""), 3000);
      return;
    }
    newContacts.push(`${ic}`);

    newContacts.push(`LATAM SEV${sev}`);
    newContacts.push(`${country} ${siteType} SEV${sev === "5" ? "4" : sev}`);
    newContacts.push(
      `${country} ${driverInvolved} SEV${sev === "5" ? "4" : sev}`,
    );

    if (country === "US" && reportedBy === "reportedByDP") {
      newContacts.push("sds-gsoc-flex-incident@amazon.com");
    } else if (country === "CA" && reportedBy === "reportedByDP") {
      newContacts.push("sds-gsoc-flex-incident@amazon.ca");
    } else if (country === "US" && reportedBy === "reportedByDA") {
      newContacts.push("sds-gsoc-driver-potentialharm@amazon.com");
    } else if (country === "CA" && reportedBy === "reportedByDA") {
      newContacts.push("sds-gsoc-driver-potentialharm@amazon.ca");
    } else if (country === "US" && reportedBy === "reportedByCX/CM") {
      newContacts.push("sds-gsoc-cx-incident@amazon.com");
    } else if (country === "CA" && reportedBy === "reportedByCX/CM") {
      newContacts.push("sds-gsoc-cx-incident@amazon.ca");
    } else if (country === "US" && reportedBy === "reportedByHubDA") {
      newContacts.push("sds-gsoc-hub-incident@amazon.com");
    }

    //* =========================> RADIO

    if (cxImpact === "yes") {
      newContacts.push(`${country} cx support group`);
      newContacts.push(`cs-gcc-all@amazon.com`);
    }
    if (detrimental === "yes") newContacts.push(`AMER LAST MILE RISK`);
    if (hazardous === "yes") {
      newContacts.push(`NA HAZMAT SUPPORT GROUP`);
      newContacts.push(`DANGEROUS GOODS SUPPORT GROUP`);
    }
    if (sev === "1" || sev === "2") {
      newContacts.push(`AMER LAST MILE RISK`);
      newContacts.push(`AMER SEV${sev}`);
      newContacts.push(`AMER RESILIENCE`);
    }
    if (thermal === "yes" && sev === "5") {
      newContacts.push(`AMER LAST MILE VEHICLE THERMAL EVENT LOW SEVERITY`);
    } else if (thermal === "yes") {
      newContacts.push(`AMER LAST MILE VEHICLE THERMAL EVENT`);
    }

    if (dotRegulated === "yes") {
      newContacts.push(`floftus@arcclaims.com `);
      newContacts.push(`ecarroll@arcclaims.com`);
    }

    if (discrimination === "yes")
      newContacts.push("DISCRIMINATION SUPPORT GROUP");

    setContacts([...newContacts]);
  };

  //* COPY CONTACTS
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(contacts);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }

  return (
    <div className="min-h-screen bg-[#146EB4] to-blue-200 flex items-center justify-center p-8 font-f1">
      <div className="fixed top-0 bg-[#146EB4] w-3/4 py-4 px-2 rounded-sm">
        <RegionNavs region={region} />
      </div>
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

      <div className="bg-white w-full sm:max-w-3xl mt-24 mx-auto py-4 px-8 rounded-sm shadow-xl space-y-2">
        <h1 className="text-lg text-center font-extrabold text-gray-800 flex justify-between">
          NA <span className="text-lg font-bold">(US / CA)</span>
        </h1>

        {/* //* SELECT COUNTRY */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h1 className="text-lg font-medium w-1/2 text-center">Country:</h1>
          <select
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            className="border p-2 rounded-sm font-medium w-1/2 text-center"
          >
            <option className="font-medium" value="BR">
              BR
            </option>
            <option className="font-medium" value="MX">
              MX
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

        {/* //* Bcc Individuals */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center">
          <h2 className="text-lg font-medium text-gray-800 mb-1 w-1/2 text-center">
            Bcc Individuals:
          </h2>
          <input
            type="text"
            value={ic}
            onChange={(e) => setIC(e.target.value)}
            className="w-1/2 py-1 px-2 border rounded-sm text-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent text-center"
            placeholder="harisss"
          />
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
              <option className="font-medium" value="BICYCLE">
                Bicycle DSP
              </option>
            )}
            <option className="font-medium" value="HUB DA">
              Hub DA
            </option>
          </select>
        </div>

        {/* //* REPORTED BY */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h2 className="text-lg font-medium text-gray-800 mb-1 w-1/2 text-center">
            Reported By:
          </h2>
          <select
            value={driverInvolved}
            onChange={(event) => setReportedBy(event.target.value)}
            className="border p-2 rounded-sm font-medium w-1/2 text-center"
          >
            <option className="font-medium" value="DSP">
              DA (CX/CM is Unknown)
            </option>
            <option className="font-medium" value="DSPWITHCXCM">
              DA (CX/CM is Known)
            </option>
            <option className="font-medium" value="FLEX">
              Flex DP
            </option>
            <option className="font-medium" value="FLEX">
              CX/CM
            </option>
            <option className="font-medium" value="HUB DA">
              Hub DA
            </option>
          </select>
        </div>

        {/* //* CX FACING IMPACT */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h2 className="text-lg font-medium text-gray-800 mb-1 w-1/2 text-center">
            Customer Facing Impact:
          </h2>
          <div className="w-1/2 flex items-center justify-center gap-10">
            <label
              htmlFor="cxImpactTrue"
              className="cursor-pointer flex items-center gap-2"
            >
              <input
                type="radio"
                id="cxImpactTrue"
                name="cxImpact"
                onChange={(event) => setCxImpact(event.target.value)}
                checked={cxImpact === "yes"}
                value="yes"
              />{" "}
              Yes
            </label>
            <label
              htmlFor="cxImpactFalse"
              className="cursor-pointer flex items-center gap-2"
            >
              <input
                type="radio"
                id="cxImpactFalse"
                name="cxImpact"
                onChange={(event) => setCxImpact(event.target.value)}
                checked={cxImpact === "no"}
                value="no"
              />{" "}
              No
            </label>
          </div>
        </div>

        {/* //* Detrimental Behavior */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h2 className="text-lg font-medium text-gray-800 mb-1 w-1/2 text-center">
            Detrimental Behavior:
          </h2>
          <div className="w-1/2 flex items-center justify-center gap-10">
            <label
              htmlFor="detrimentalTrue"
              className="cursor-pointer flex items-center gap-2"
            >
              <input
                type="radio"
                id="detrimentalTrue"
                name="detrimental"
                onChange={(event) => setDetrimental(event.target.value)}
                checked={detrimental === "yes"}
                value="yes"
              />{" "}
              Yes
            </label>
            <label
              htmlFor="detrimentalFalse"
              className="cursor-pointer flex items-center gap-2"
            >
              <input
                type="radio"
                id="detrimentalFalse"
                name="detrimental"
                onChange={(event) => setDetrimental(event.target.value)}
                checked={detrimental === "no"}
                value="no"
              />{" "}
              No
            </label>
          </div>
        </div>

        {/* //* Hazardous Material */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h2 className="text-lg font-medium text-gray-800 mb-1 w-1/2 text-center">
            Hazardous Material:
          </h2>
          <div className="w-1/2 flex items-center justify-center gap-10">
            <label
              htmlFor="hazardousTrue"
              className="cursor-pointer flex items-center gap-2"
            >
              <input
                type="radio"
                id="hazardousTrue"
                name="hazardous"
                onChange={(event) => setHazardous(event.target.value)}
                checked={hazardous === "yes"}
                value="yes"
              />{" "}
              Yes
            </label>
            <label
              htmlFor="hazardousFalse"
              className="cursor-pointer flex items-center gap-2"
            >
              <input
                type="radio"
                id="hazardousFalse"
                name="hazardous"
                onChange={(event) => setHazardous(event.target.value)}
                checked={hazardous === "no"}
                value="no"
              />{" "}
              No
            </label>
          </div>
        </div>

        {/* //* Delivery Van Vehicle Thermal Event  */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h2 className="text-lg font-medium text-gray-800 mb-1 w-1/2 text-center">
            Vehicle Thermal Event :
          </h2>

          <div className="w-1/2 flex items-center justify-center gap-10">
            <label
              htmlFor="thermalTrue"
              className="cursor-pointer flex items-center gap-2"
            >
              <input
                type="radio"
                id="thermalTrue"
                name="thermal"
                onChange={(event) => setThermal(event.target.value)}
                checked={thermal === "yes"}
                value="yes"
              />{" "}
              Yes
            </label>
            <label
              htmlFor="thermalFalse"
              className="cursor-pointer flex items-center gap-2"
            >
              <input
                type="radio"
                id="thermalFalse"
                name="thermal"
                onChange={(event) => setThermal(event.target.value)}
                checked={thermal === "no"}
                value="no"
              />{" "}
              No
            </label>
          </div>
        </div>

        {/* //* DOT REGULATED VEHICLE */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h2 className="text-lg font-medium text-gray-800 mb-1 w-1/2 text-center">
            DOT Regulated Vehicle:
          </h2>

          <div className="w-1/2 flex items-center justify-center gap-10">
            <label
              htmlFor="dotRegulatedTrue"
              className="cursor-pointer flex items-center gap-2"
            >
              <input
                type="radio"
                id="dotRegulatedTrue"
                name="dotRegulated"
                onChange={(event) => setDotRegulated(event.target.value)}
                checked={dotRegulated === "yes"}
                value="yes"
              />{" "}
              Yes
            </label>
            <label
              htmlFor="dotRegulatedFalse"
              className="cursor-pointer flex items-center gap-2"
            >
              <input
                type="radio"
                id="dotRegulatedFalse"
                name="dotRegulated"
                onChange={(event) => setDotRegulated(event.target.value)}
                checked={dotRegulated === "no"}
                value="no"
              />{" "}
              No
            </label>
          </div>
        </div>

        {/* //* DISCRIMINATION */}
        <div className="bg-gray-50 px-4 py-1 rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
          <h2 className="text-lg font-medium text-gray-800 mb-1 w-1/2 text-center">
            Discrimination (hate-bias):
          </h2>

          <div className="w-1/2 flex items-center justify-center gap-10">
            <label
              htmlFor="discriminatedTrue"
              className="cursor-pointer flex items-center gap-2"
            >
              <input
                type="radio"
                id="discriminatedTrue"
                name="discrimination"
                onChange={(event) => setDiscrimination(event.target.value)}
                checked={discrimination === "yes"}
                value="yes"
              />{" "}
              Yes
            </label>
            <label
              htmlFor="discriminationFalse"
              className="cursor-pointer flex items-center gap-2"
            >
              <input
                type="radio"
                id="discriminationFalse"
                name="discrimination"
                onChange={(event) => setDiscrimination(event.target.value)}
                checked={discrimination === "no"}
                value="no"
              />{" "}
              No
            </label>
          </div>
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
          <div className="space-y-4 flex flex-col gap-1">
            {/* //* CONTACTS DISPLAY */}
            <div className="bg-green-200 p-2 w-[95%] mx-auto rounded-sm shadow-2xl">
              {contacts.map((c, i) => (
                <span key={i}>{c}, </span>
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
