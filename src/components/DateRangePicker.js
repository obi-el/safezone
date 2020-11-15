import React, {useState, useRef} from 'react';
import DatePickerStyles from '../styles/DatePickerStyles';
import {faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = (props) => {
  const {date, maximumDate, minimumDate, onUpdate} = props;
  const [dateValue, setDateValue] = useState(date);

  return (
    <DateTimePicker
      value={new Date(dateValue)}
      mode={'date'}
      display={'default'}
      style={DatePickerStyles.filterItem}
      maximumDate={new Date(maximumDate)} // From: To date is the max, To: todays date is the max
      minimumDate={minimumDate && new Date(minimumDate)} // From: no minimum, To: the fromDate is minimum
      onChange={(event, date) => {
        setDateValue(date.getTime());
        onUpdate(date.getTime());
      }}
    />
  );
};

export default function DateRangePicker() {
  const now = Date.now();
  const twoWeeks = 14 * 24 * 60 * 60 * 1000;

  const [fromDate, setFromDate] = useState(now - twoWeeks);
  const [toDate, setToDate] = useState(now);

  return (
    <View style={DatePickerStyles.filterBar}>
      <DatePicker
        date={now - twoWeeks}
        maximumDate={toDate}
        minimumDate={undefined}
        onUpdate={(date) => {
          setFromDate(date);
        }}
      />
      <FontAwesomeIcon
        icon={faLongArrowAltRight}
        style={DatePickerStyles.filterIcon}
        size={20}
      />
      <DatePicker
        date={now}
        maximumDate={Date.now()}
        minimumDate={fromDate}
        onUpdate={(date) => {
          setToDate(date);
        }}
      />
    </View>
  );
}
