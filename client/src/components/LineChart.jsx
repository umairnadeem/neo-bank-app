import React from 'react';
import PropTypes from 'prop-types';

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;
    return (
      <div className="line-chart">
        {data}
      </div>
    );
  }
}

LineChart.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default LineChart;
