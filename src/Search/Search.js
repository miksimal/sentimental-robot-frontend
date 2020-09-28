import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  Panel,
  SearchBox,
  Pagination,
  Highlight,
  RefinementList,
  Configure,
  NumericMenu,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import './Search.css';

const searchClient = algoliasearch(
  'RKBO0ORCMY',
  '1591b86c68a3b74b847ed3d977bdc9a5'
);

class Search extends Component {
  render() {
    const dates = getDates();
    return (
      <div className="ais-InstantSearch container">
        <h2>Explore my memories</h2>
        <InstantSearch indexName="prod_topheadlines" searchClient={searchClient}>
          <div className="panels">
            <div className="left-panel">
              <Panel header="Dates" className="dates-panel">
                  <NumericMenu
                    attribute="date_timestamp"
                    items= {[
                      { label: 'Past 7 days', start: dates.sevenDaysAgo},
                      { label: 'Past 30 days', start: dates.thirtyDaysAgo},
                      { label: 'Past year', start: dates.oneYearAgo}
                    ]}
                  />
                </Panel>
                <Panel header="Sentiment">
                  <RefinementList attribute="analysis_overall" 
                  transformItems={items =>
                    items.map(item => {
                      const lowerCaseLabel = item.label.toLowerCase();
                      const correctLabel = lowerCaseLabel.charAt(0).toUpperCase() + lowerCaseLabel.slice(1);
                      return {
                      ...item,
                      label: correctLabel,
                    }})
                  }
                  />
                </Panel>
              <Configure hitsPerPage={4} />
            </div>
            <div className="right-panel">
              <SearchBox />
              <Hits hitComponent={Hit} />
              <Pagination />
            </div>
            </div>
          </InstantSearch>
        </div>
    );
  }
}

function getDates() {
  const date = new Date();
  const sevenDaysAgo = parseInt(date.getTime() - (7 * 24 * 60 * 60 * 1000));
  const thirtyDaysAgo = parseInt(date.getTime() - (30 * 24 * 60 * 60 * 1000));
  const oneYearAgo = parseInt(date.getTime() - (365 * 24 * 60 * 60 * 1000));
  return {
    sevenDaysAgo: sevenDaysAgo,
    thirtyDaysAgo: thirtyDaysAgo,
    oneYearAgo: oneYearAgo
  }
}

function Hit(props) {
  const formattedHit = props.hit;
  const lowerCaseSentiment = formattedHit.analysis_overall.toLowerCase();
  const sentiment = lowerCaseSentiment.charAt(0).toUpperCase() + lowerCaseSentiment.slice(1);
  const sentimentScore = parseFloat(formattedHit.analysis_details[sentiment]).toFixed(2);  // not quite correct for rounding, but we don't care about that level of precision here.
  formattedHit.name = formattedHit.date_formatted + ": " + formattedHit.analysis_overall.toLowerCase() + ` overall sentiment (${sentimentScore})`;

  return (
    <div>
      <div className="hit-name">
        <b>{formattedHit.name}</b>
      </div>
      <div className="hit-description">
        <Highlight attribute="headlines" hit={props.hit} />
      </div>
    </div>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default Search;
