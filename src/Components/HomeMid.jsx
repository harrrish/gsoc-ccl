import { useNavigate } from "react-router-dom";

export default function HomeMid() {
  const navigate = useNavigate();
  return (
    <div className="flex w-1/2 justify-between gap-8 flex-col">
      <div>
        <button className="shadow-md hover:shadow-lg transition-all duration-300 animate-updateBtn w-full py-2 border-2 cursor-pointer rounded-sm">
          Click here for latest updates !
        </button>
      </div>
      <div className="flex w-full justify-between gap-2">
        <button
          onClick={() => navigate("/otr")}
          className="flex flex-col border-2 p-2 px-16 w-1/2 rounded-sm transition-all duration-150 cursor-pointer hover:bg-bg2 hover:text-f1"
        >
          On the Road (OTR) <span>EZ CPG</span>
        </button>
        <button
          onClick={() => navigate("/utr")}
          className="flex flex-col border-2 p-2 px-16 w-1/2 rounded-sm transition-all duration-150 cursor-pointer hover:bg-bg2 hover:text-f1"
        >
          Under the Roof (UTR) <span>SRA Investigatory Guide</span>
        </button>
      </div>
      <div className="flex flex-col gap-4 border-2 p-4 rounded-sm">
        <h1 className="flex flex-col text-justify items-center">
          <span className="text-3xl font-f3">On the Road (OTR)</span>
          Refers to the comprehensive system managing its mobile workforce and
          delivery network. This system encompasses a technologically
          integrated, flexible scheduling approach for employees who operate
          outside traditional office settings. It utilizes performance metrics
          and safety protocols to oversee a vast network of drivers and vehicles
          forming Amazon's last-mile delivery operations.
        </h1>
        <h1 className="flex flex-col text-justify items-center">
          <span className="text-3xl font-f3">Under the Roof (UTR)</span>
          Comprehensive control of all internal operations within Amazon's
          warehouses and fulfillment centers, including everything from
          receiving goods to preparing orders for shipment. This comprises
          inventory management, order processing, robotic integration, quality
          control, and labor coordination, all of which are designed to maximize
          efficiency and accuracy while delivering client orders.
        </h1>
      </div>
    </div>
  );
}
