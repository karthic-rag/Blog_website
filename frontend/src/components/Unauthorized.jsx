import React from "react";

const Unauthorized = () => {
  return (
    <div className="flex justify-center items-center min-h-[70vh] flex-col gap-3">
      <h1 className="text-3xl">Status: 401</h1>
      <p className="text-red-600 font-bold text-xl">
        Unauthorized to use this page
      </p>
    </div>
  );
};

export default Unauthorized;
