import React, { Fragment } from "react";
import LeagueRow from '../league-row';
import Checkbox from '../../checkbox';
import { cloneDeep } from "lodash";
import SearchBar from '../../search-bar';
import { League } from '../filter-table/type';

type State = {
    selectedLeagues: string[];
    filterText: string;
};

type Props = {
    leagues: League[];
    selectedLeagues: string[];
    onSubmitFilterLeagues: (selectedLeagues: string[]) => void;
    onCancel: () => void;
};

class LeaguesFilteringTable extends React.Component<Props, State> {
    displayLeagues: League[] = [];

    constructor(props: Props) {
        super(props);

        this.displayLeagues = [];
        this.state = {
            selectedLeagues: props.selectedLeagues,
            filterText: ""
        };
    }

    handleSelectLeague = (id: string) => {
        const { selectedLeagues } = this.state;

        const index = selectedLeagues.indexOf(id);
        let result: string[] = [];

        if (index >= 0) {
            result = [
                ...selectedLeagues.slice(0, index),
                ...selectedLeagues.slice(index + 1)
            ];
        } else {
            result = cloneDeep(selectedLeagues);
            result.push(id);
        }

        this.setState({
            selectedLeagues: result
        });
    };

    handleSelectAll = () => {
        let selectedLeagues: string[];

        if (this.state.selectedLeagues.length === this.displayLeagues.length) {
            selectedLeagues = [];

        } else {
            selectedLeagues = this.displayLeagues.map(league => league.id);
        }

        this.setState({
            selectedLeagues: selectedLeagues
        });
    };

    handleFilterLeaguesChange = (text: string) => {
        let selectedLeagues: string[] = [];
        const filteredLeagues = text !== "" ?
            this.props.leagues.filter(league =>
                league.name?.toLowerCase().search(text.toLowerCase()) !== -1 ||
                league.abbreviation?.toLowerCase().search(text.toLowerCase()) !== -1)
                .map(x => x.id) :
            this.state.selectedLeagues;

        if (this.state.selectedLeagues.length !== this.props.leagues.length) {
            selectedLeagues = this.state.selectedLeagues;
        } else {
            selectedLeagues = filteredLeagues;
        }

        this.setState({
            selectedLeagues: selectedLeagues,
            filterText: text
        });
    };

    handleSubmitFilterLeagues = () => {
        this.props.onSubmitFilterLeagues(this.state.selectedLeagues);
    }

    onResetLeaguesFilterText = () => {
        this.setState({
            filterText: ""
        });
    }

    isCheckAllSelected = (displayLeagues: League[]) => {
        return (this.state.selectedLeagues.length > 0 &&
            this.displayLeagues.length > 0 &&
            this.state.selectedLeagues.length >= displayLeagues.length &&
            displayLeagues.map(x => x.id).every(leagueId => this.state.selectedLeagues.indexOf(leagueId) > -1));
    }

    render() {

        this.displayLeagues = this.state.filterText !== "" ?
            this.props.leagues.filter(league =>
                league.name?.toLowerCase().search(this.state.filterText.toLowerCase()) !== -1
                || league.abbreviation?.toLowerCase().search(this.state.filterText.toLowerCase()) !== -1)
            : this.props.leagues;
        return (
            <Fragment>
                <div className="header-filter">
                    <div className="text-header">League filtering</div>
                    <span className="icon-close" onClick={this.props.onCancel}></span>
                </div>
                <div className="content-league">
                    <div className="league-search-section">
                        <div className="check-all">
                            <Checkbox id="all"
                                checked={this.isCheckAllSelected(this.displayLeagues)}
                                value="all"
                                onChange={this.handleSelectAll} />
                            <span onClick={this.handleSelectAll}>Check all</span>
                        </div>
                        <SearchBar
                            filterText={this.state.filterText}
                            onFilterTextChange={this.handleFilterLeaguesChange}
                            onReset={this.onResetLeaguesFilterText}
                            placeHolder="Find leagues" />
                    </div>
                    <div className="list-league">
                        {this.displayLeagues.map(league => <LeagueRow
                            key={league.id}
                            isSelected={this.state.selectedLeagues.indexOf(league.id) >= 0}
                            league={league}
                            onSelect={this.handleSelectLeague} />)}
                    </div>
                </div >
                <div className="footer-league">
                    <button onClick={this.handleSubmitFilterLeagues} className="btn btn-primary-solid">OK</button>
                    <button onClick={this.props.onCancel} className="btn btn-primary-outline">Cancel</button>
                </div>
            </Fragment>
        );
    }
}

export default LeaguesFilteringTable;