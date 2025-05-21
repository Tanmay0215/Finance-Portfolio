import React from 'react';
import NetworthCard from '../../components/dashboard/NetworthCard';
import ProtocolAllocationChart from '../../components/dashboard/ProtocolAllocationChart';
import ProtocolBreakdownTable from '../../components/dashboard/ProtocolBreakdownTable';
import Filters from '../../components/dashboard/Filters';
const DashboardHome = () => {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <NetworthCard />
        <ProtocolAllocationChart />
        <ProtocolBreakdownTable />
      </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <Filters />
      </div>
      
    </div>
  );
};

export default DashboardHome;
