import React from "react";
import { shallow } from "enzyme";
import { Props } from "./type";
import AwayTeamCell from "./index";
import { MatchStatusType } from "../../../../common/enums/match-status-type";

describe("AwayTeamCell", () => {
  it("should render yellow card when yellowCards > 0", () => {
    const props: Props = {
      awayTeamName: "name",
      redCards: 0,
      yellowCards: 1,
      isAggregateWinner: true,
      eventStatusId: MatchStatusType.CLOSED.value
    };

    const wrapper = shallow(<AwayTeamCell {...props} />);
    expect(wrapper.find(".yellow-card").length).toEqual(1);
  });

  it("should render red card when redCards > 0", () => {
    const props: Props = {
      awayTeamName: "name",
      redCards: 1,
      yellowCards: 0,
      isAggregateWinner: true,
      eventStatusId: MatchStatusType.CLOSED.value
    };

    const wrapper = shallow(<AwayTeamCell {...props} />);
    expect(wrapper.find(".red-card").length).toEqual(1);
  });
});
