import { IApartments } from "./IApartments";

export type ApartmentsProps = {
    currentCity: (declination: string) => string;
    setData: React.Dispatch<React.SetStateAction<IApartments[] | undefined>>;
    data?: IApartments[],

    apartmentsInfo: {
      city: string;
      rooms?: string | undefined;
      costMin?: string;
      costMax?: string;
    };
  setApartmentsInfo?: React.Dispatch<
    React.SetStateAction<{
      city: string;
      rooms?: string;
      costMin?: string;
      costMax?: string;
    }>
  >;
    setFilterData: React.Dispatch<
      React.SetStateAction<{
        selectActive: boolean;
        showOptions: boolean;
        nameSelect: string;
        costMinValue: string;
        costMaxValue: string;
        selected: string;
      }>
    >;
    filterData: {
      selectActive: boolean;
      showOptions: boolean;
      nameSelect: string;
      costMinValue: string;
      costMaxValue: string;
      selected: string;
    };
  };
