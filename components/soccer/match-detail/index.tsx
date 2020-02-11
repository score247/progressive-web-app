import "./style.scss";
import React from "react";
import dynamic from "next/dynamic";
import { MatchInfo } from "../../../models";
import { SoccerAPI } from "../../../apis/soccer-api";
import { SoccerSignalRClient } from "../../../apis/soccer-signalr-client";
import appSettings from "../../../app-settings";
import { MatchEventSignalRMessage } from "../../../models/soccer/signalr-messages";
import { DeviceContextConsumer } from "../../../contexts/device-context";
import { DeviceContextType } from "../../../contexts/device-context-type";
import { updateMatchFromEvent } from "../../../common/helpers/soccer-match-helper";

const MobileView = dynamic(() => import("./mobile-view"));
const DesktopView = dynamic(() => import("./desktop-view"));

type Props = {
  matchId: string | string[];
};

type State = {
  matchInfo: MatchInfo | null;
  soccerSignalRClient?: SoccerSignalRClient;
};

class SoccerMatchDetail extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      matchInfo: null
    };
  }

  async componentDidMount() {
    const matchInfo = await SoccerAPI.GetMatch(this.props.matchId);
    this.setState({ matchInfo });
  }

  setupSignalClient() {
    const eventHandlers = {
      MatchEvent: this.matchEventHandler
    };

    const client = new SoccerSignalRClient(
      appSettings.soccerPublisherUrl,
      eventHandlers
    );

    this.setState(
      {
        soccerSignalRClient: client
      },
      () => client.start()
    );
  }

  matchEventHandler = (message: MatchEventSignalRMessage) => {
    const { matchInfo } = this.state;

    const matchEvent = message?.MatchEvent;

    if (
      matchEvent &&
      matchEvent.Timeline &&
      matchInfo?.Match.Id === matchEvent.MatchId
    ) {
      const matchResult = matchEvent.MatchResult;
      const timeline = matchEvent.Timeline;

      if (matchInfo.TimelineEvents.some(x => x.Id === timeline.Id)) {
        return;
      }

      matchInfo.TimelineEvents.push(timeline);

      updateMatchFromEvent(matchInfo.Match, timeline, matchResult);

      this.setState({ matchInfo });
    }
  };

  renderMatchDetail = (value: DeviceContextType) => {
    if (this.state.matchInfo) {
      if (value.isMobile) {
        return <MobileView matchInfo={this.state.matchInfo} />;
      }
      return <DesktopView matchInfo={this.state.matchInfo} />;
    }

    return null;
  };

  render() {
    return (
      <div className="content">
        <DeviceContextConsumer>{this.renderMatchDetail}</DeviceContextConsumer>
      </div>
    );
  }
}

export default SoccerMatchDetail;
