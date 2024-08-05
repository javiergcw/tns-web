'use client';
import "/app/globals.css";
import CircularDiagram from "@/app/components/others/graph/circularDiagram";
import PurchaseDetail from "@/app/components/dashboard/purchaseDetails/purchaseDetails";
export default function Login() {


  return (
    <>
      <div className="w-2/3 flex justify-center items-center bg-slate-100">
        <PurchaseDetail/>
      </div>
    </>
  );
}
