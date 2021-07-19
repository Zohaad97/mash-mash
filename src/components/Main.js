import React, { useState } from "react";
import Loader from "./Loader/loader";

export default function Main() {
  const [showLoader, setShowLoader] = useState(false);

  return (
    <div className="container-fluid">
      {/* <h1 className="text-center text-white balsamiq">Mash Mush</h1> */}

      <div className="row">
        <div className="col-10 offset-1">
          <div className="glass-panel">
            <div className="row">
              <div className="col-12 p-5">
                <div style={{ height: "1000px" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showLoader && <Loader />}
    </div>
  );
}
