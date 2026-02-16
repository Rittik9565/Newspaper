import React from "react";

export default function Footer() {
  return (
    <footer className="fot bg-dark text-white py-4 mt-5"> {/* ✅ className fixed */}
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <h6 className="mb-0">
              &copy; 2026 My Website. All rights reserved. 
              <br />
              <small className="opacity-75">Made with React & ❤️</small>
            </h6>
          </div>
        </div>
      </div>
    </footer>
  );
}
