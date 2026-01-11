import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function ResultPage({ resData, result }) {
  return (
    <div className="min-h-screen max-w-[1920px] mx-auto">
      {/* Content area */}
      <Outlet context={{ ...result, resData }} />
    </div>
  );
}
