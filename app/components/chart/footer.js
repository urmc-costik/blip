
/*
 * == BSD2 LICENSE ==
 * Copyright (c) 2014, Tidepool Project
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the associated License, which is identical to the BSD 2-Clause
 * License as published by the Open Source Initiative at opensource.org.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the License for more details.
 *
 * You should have received a copy of the License along with this program; if
 * not, you can obtain one from Tidepool Project at tidepool.org.
 * == BSD2 LICENSE ==
 */
var bows = require('bows');
var React = require('react');
var cx = require('classnames');

import * as viz from '@hackingtype1/viz';
const TwoOptionToggle = viz.components.TwoOptionToggle;

var tideline = {
  log: bows('Footer')
};

var TidelineFooter = React.createClass({
  propTypes: {
    chartType: React.PropTypes.string.isRequired,
    onClickBoxOverlay: React.PropTypes.func,
    onClickGroup: React.PropTypes.func,
    onClickLines: React.PropTypes.func,
    onClickValues: React.PropTypes.func,
    onClickRefresh: React.PropTypes.func,
    onClickBgDataToggle: React.PropTypes.func,
    boxOverlay: React.PropTypes.bool,
    grouped: React.PropTypes.bool,
    showingLines: React.PropTypes.bool,
    showingCbg: React.PropTypes.bool,
    showingSmbg: React.PropTypes.bool,
    showingValues: React.PropTypes.bool,
  },
  render: function() {
    var refreshLinkClass = cx({
      'patient-data-subnav-hidden': this.props.chartType === 'no-data'
    });

    var showValues = (
      <div className="footer-right-options">
        <label htmlFor="valuesCheckbox">
          <input type="checkbox" name="valuesCheckbox" id="valuesCheckbox"
            checked={this.props.showingValues}
            onChange={this.props.onClickValues} /> Values
        </label>
      </div>
    );

    var modalOpts = (
      <div className="footer-right-options">
        <label htmlFor="overlayCheckbox">
          <input type="checkbox" name="overlayCheckbox" id="overlayCheckbox"
            checked={this.props.boxOverlay}
            onChange={this.props.onClickBoxOverlay} /> Range &amp; Average
        </label>

        <label htmlFor="groupCheckbox">
          <input type="checkbox" name="groupCheckbox" id="groupCheckbox"
            checked={this.props.grouped}
            onChange={this.props.onClickGroup} /> Group
        </label>

        <label htmlFor="linesCheckbox">
          <input type="checkbox" name="linesCheckbox" id="linesCheckbox"
            checked={this.props.showingLines}
            onChange={this.props.onClickLines} /> Lines
        </label>
      </div>
    );

    var rightSide = null;
    var bgDataToggle = null;

    if (this.props.chartType === 'weekly') {
      rightSide = showValues;
    }
    if (this.props.chartType === 'modal') {
      if (this.props.showingSmbg) {
        rightSide = modalOpts;
      }
      bgDataToggle = (
        <span className="toggle-container">
          <TwoOptionToggle
            left={{ label: 'BGM', state: this.props.showingSmbg }}
            right={{ label: 'CGM', state: this.props.showingCbg }}
            toggleFn={this.props.onClickBgDataToggle}
          />
        </span>
      );
    }

    return (
      <div className="container-box-outer patient-data-footer-outer">
        <div className="container-box-inner patient-data-footer-inner">
          <div className="patient-data-footer-left">
            <button className="btn btn-chart btn-refresh"
              onClick={this.props.onClickRefresh}>
              Refresh</button>
            {bgDataToggle}
          </div>
          <div className="patient-data-footer-right">{rightSide}</div>
        </div>
      </div>
    );
  }
});

module.exports = TidelineFooter;
