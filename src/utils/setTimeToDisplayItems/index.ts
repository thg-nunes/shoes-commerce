import { Dispatch, SetStateAction } from 'react';

type SetTimeToDisplayItems = {
  _timeToDisplayItems: boolean;
  setTimeToDisplay: Dispatch<SetStateAction<boolean>>;
};

const timeToDisplayItems = ({
  _timeToDisplayItems,
  setTimeToDisplay,
}: SetTimeToDisplayItems): void => {
  setTimeToDisplay(!_timeToDisplayItems);

  setTimeout(() => {
    setTimeToDisplay(true);
  }, 750);
};

export { timeToDisplayItems };
