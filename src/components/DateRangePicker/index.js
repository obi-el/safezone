import React, {useState, useRef} from 'react';
import DatePickerStyles from './DatePickerStyles';
import {faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons';
import {View, Button, Platform} from 'react-native';
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
      onChange={(event, newDate) => {
        const newTimestamp = newDate.getTime();
        setDateValue(newTimestamp);
        onUpdate(newTimestamp);
      }}
    />
  );
};

export default function DateRangePicker() {
  const now = Date.now();
  const twoWeeks = 14 * 24 * 60 * 60 * 1000;

  const [fromDate, setFromDate] = useState(now - twoWeeks);
  const [toDate, setToDate] = useState(now);

  const [showFromDialog, setShowFrom] = useState(false);
  const [showToDialog, setShowTo] = useState(false);

  const isAndroid = Platform.OS === 'android';
  const isIos = Platform.OS === 'ios';

  return (
    <View style={DatePickerStyles.filterBar}>
      {isAndroid && (
        <Button
          title={new Date(fromDate).toLocaleDateString()}
          onPress={() => setShowFrom(true)}
        />
      )}
      {(showFromDialog || isIos) && (
        <DatePicker
          date={fromDate}
          maximumDate={toDate}
          minimumDate={undefined}
          onUpdate={(date) => {
            setFromDate(date);
            setShowFrom(false);
          }}
        />
      )}
      <FontAwesomeIcon
        icon={faLongArrowAltRight}
        style={DatePickerStyles.filterIcon}
        size={20}
      />
      {isAndroid && (
        <Button
          title={new Date(toDate).toLocaleDateString()}
          onPress={() => setShowTo(true)}
        />
      )}
      {(showToDialog || isIos) && (
        <DatePicker
          date={toDate}
          maximumDate={Date.now()}
          minimumDate={fromDate}
          onUpdate={(date) => {
            setToDate(date);
            setShowTo(false);
          }}
        />
      )}
    </View>
  );
}
