import * as React from "react";
import { MatchSummary } from "../../../../models";
import {
    MatchStatusType,
    MatchStatusTypeDic
} from "../../../../common/enums/match-status-type";
import { differenceInMinutes } from "date-fns";
import { EventTypes } from "../../../../common/enums/event-type";
import { Props, periodTimes, PeriodTime } from "./types";

class StatusCell extends React.Component<Props> {
    readonly match: MatchSummary;

    constructor(props: Props) {
        super(props);

        this.match = props.match;
    }

    private buildMatchMinuteWithInjuryTime(match: MatchSummary, matchMinute: number, periodTime: PeriodTime) {
        const announcementInjuryTime = match.InjuryTimeAnnounced;
        const currentInjuryTime = matchMinute - periodTime.endTime;
        let displayInjuryTime = currentInjuryTime <= 0 ? 1 : currentInjuryTime;
        if (currentInjuryTime > announcementInjuryTime) {
            displayInjuryTime = announcementInjuryTime;
        }
        return `${periodTime.endTime}+${displayInjuryTime}`;
    }


    buildMatchMinute(match: MatchSummary): string {
        const periodTime = periodTimes[match.MatchStatus.Value];
        const today = new Date();
        const periodStartTime = match.CurrentPeriodStartTime[0] as Date;
        const matchMinute = periodTime.startTime + differenceInMinutes(today, periodStartTime);

        if (match.LastTimelineType?.Value === EventTypes.INJURY_TIME_SHOWN.value) {
            const cachedInjuryTime = localStorage.getItem(`InjuryTimeAnnouncement_${match.Id}_${match.MatchStatus.DisplayName}`);
            const injuryTime = Number(cachedInjuryTime);
            if (injuryTime > 0) {
                return this.buildMatchMinuteWithInjuryTime(match, matchMinute, periodTime);
            }
        }

        return this.buildMatchMinuteText(matchMinute, periodTime);
    }

    private buildMatchMinuteText(
        matchMinute: number,
        periodTime: PeriodTime) {
        if (matchMinute >= periodTime.endTime) {
            matchMinute = periodTime.endTime;
        }

        if (matchMinute < periodTime.startTime) {
            matchMinute = periodTime.startTime;
        }

        return `${matchMinute}`;
    }

    buildMatchStatus(match: MatchSummary): string {
        if (match?.MatchStatus == null) {
            return "";
        }

        switch (match?.MatchStatus?.Value) {
            case MatchStatusType.LIVE.value:
            case MatchStatusType.FIRST_HALF.value:
            case MatchStatusType.SECOND_HALF.value:
            case MatchStatusType.FIRST_HALF_EXTRA.value:
            case MatchStatusType.SECOND_HALF_EXTRA.value:
            case MatchStatusType.OVERTIME.value:
            case MatchStatusType.EXTRA_TIME.value:
                return this.buildMatchMinute(match);

            default:
                return MatchStatusTypeDic[match.MatchStatus.Value]?.displayName;
        }
    }

    buildMatchStatusClass(match: MatchSummary) {
        switch (match?.MatchStatus?.Value) {
            case MatchStatusType.CANCELLED.value:
            case MatchStatusType.POSTPONED.value:
            case MatchStatusType.ABANDONED.value:
            case MatchStatusType.DELAYED.value:
            case MatchStatusType.INTERRUPTED.value:
                return "match-cancel";

            default:
                return "";
        }
    }

    render() {
        return <td className={this.buildMatchStatusClass(this.props.match)}>
            {this.buildMatchStatus(this.props.match)}
        </td>;
    }
}

export default StatusCell;
