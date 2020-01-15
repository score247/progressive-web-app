import React from "react";
import { DeviceContextConsumer } from "../../../../contexts/device-context";
import { DeviceContextType } from "../../../../contexts/device-context-type";
import "./header.scss";

const Header = () => {
  const header = ({ isMobile }: DeviceContextType) => (
    <thead>
      <tr>
        {!isMobile && <th className="col-check"></th>}
        <th className="col-league">League</th>
        <th className="col-time">Time</th>
        {!isMobile && <th className="col-status">Status</th>}
        <th className="col-home">Home</th>
        <th className="col-score">Score</th>
        <th className="col-away">Away</th>
        {!isMobile && <th className="width-50">1H</th>}
        <th className="col-favorites"></th>
      </tr>
    </thead>
  );

  return <DeviceContextConsumer>{header}</DeviceContextConsumer>;
};

export default Header;
