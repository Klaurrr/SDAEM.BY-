export type MainProps = {
        selectIsOpen: {
          [key: string]: boolean
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

