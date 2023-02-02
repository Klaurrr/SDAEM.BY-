export type MainProps = {
        selectIsOpen: {
          selectCity: boolean;
          selectRooms: boolean;
          selectMetro: boolean;
          selectDistrict: boolean;
        };
        setSelectIsOpen: React.Dispatch<
          React.SetStateAction<{
            selectCity: boolean;
            selectRooms: boolean;
            selectMetro: boolean;
            selectDistrict: boolean;
          }>
        >;
}