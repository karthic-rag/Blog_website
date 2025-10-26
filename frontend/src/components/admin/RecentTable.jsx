import React from "react";
import { NavLink } from "react-router-dom";

const RecentTable = ({ details, children }) => {
  return (
    <div className="bg-white w-full rounded-xl shadow p-4 my-5">
      <h1>{details.heading}</h1>
      <table className="min-w-full min-h-60 my-5">
        <thead>
          <tr>
            <th className="text-left font-medium">
              {details.tableHeadings.head1}
            </th>
            <th className="text-left font-medium">
              {details.tableHeadings.head2}
            </th>
            <th className="font-medium">{details.tableHeadings.head3}</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      <div className="mt-5">
        <NavLink to={details.page.path} className="text-web-blue">
          {details.page.name}
        </NavLink>
      </div>
    </div>
  );
};

export default RecentTable;
