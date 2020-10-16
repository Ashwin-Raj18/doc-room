import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//props from maoStateToprops fn
const Alert = ({ alerts }) => {
	return (
		alerts !== null &&
		alerts.length > 0 &&
		alerts.map((al) => (
			<div key={al.id} className={`alert alert-${al.alertType}`}>
				{al.msg}
			</div>
		))
	);
};

Alert.propTypes = {
	alerts : PropTypes.array.isRequired
};
//Bcoz this component uses props set by another compponent
const mapStateToprops = (state) => ({
	alerts : state.alert
});
export default connect(mapStateToprops)(Alert);
