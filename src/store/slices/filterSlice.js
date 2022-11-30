// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   apartments: [
//     {
//       city: "Минск",
//       rooms: 2,
//       costMin: 30,
//     },
//     {
//       city: "Минск",
//       rooms: 4,
//       costMin: 80,
//     },
//     {
//       city: "Минск",
//       rooms: 1,
//       costMin: 10,
//     },
//     {
//       city: "Гомель",
//       rooms: 3,
//       costMin: 50,
//     },
//     {
//       city: "Гродно",
//       rooms: 4,
//       costMin: 80,
//     },
//     {
//       city: "Могилев",
//       rooms: 2,
//       costMin: 20,
//     },
//     {
//       city: "Брест",
//       rooms: 3,
//       costMin: 50,
//     },
//     {
//       city: "Гомель",
//       rooms: 4,
//       costMin: 90,
//     },
//     {
//       city: "Гродно",
//       rooms: 1,
//       costMin: 20,
//     },
//     {
//       city: "Брест",
//       rooms: 2,
//       costMin: 20,
//     },
//     {
//       city: "Могилев",
//       rooms: 4,
//       costMin: 20,
//     },
//   ],
//   filteredApartments: [],
// };

// const filterApartments = (apartments, finallyObj) => {
//   console.log(apartments, finallyObj);
//   apartments.filter((el) => {
//     if (finallyObj.city && finallyObj.city !== "Выберите") {
//       if (finallyObj.rooms && finallyObj.rooms !== "Выберите") {
//         if (finallyObj.costMin && finallyObj.costMax) {
//           return (
//             finallyObj.city === el.city &&
//             finallyObj.rooms == el.rooms &&
//             finallyObj.costMin <= el.costMin &&
//             finallyObj.costMax >= el.costMin
//           );
//         } else if (finallyObj.costMin) {
//           return (
//             finallyObj.city === el.city &&
//             finallyObj.rooms == el.rooms &&
//             finallyObj.costMin <= el.costMin
//           );
//         } else if (finallyObj.costMax) {
//           return (
//             finallyObj.city === el.city &&
//             finallyObj.costMax > el.costMin &&
//             finallyObj.rooms == el.rooms
//           );
//         } else {
//           return finallyObj.city === el.city && finallyObj.rooms == el.rooms;
//         }
//       } else {
//         if (finallyObj.costMin && finallyObj.costMax) {
//           return (
//             finallyObj.city === el.city &&
//             finallyObj.costMin <= el.costMin &&
//             finallyObj.costMax >= el.costMin
//           );
//         } else if (finallyObj.costMin) {
//           return (
//             finallyObj.city === el.city && finallyObj.costMin <= el.costMin
//           );
//         } else if (finallyObj.costMax) {
//           return finallyObj.city === el.city && finallyObj.costMax > el.costMin;
//         } else return finallyObj.city === el.city;
//       }
//     } else {
//       if (finallyObj.rooms && finallyObj.rooms !== "Выберите") {
//         if (finallyObj.costMin && finallyObj.costMax) {
//           return (
//             finallyObj.rooms == el.rooms &&
//             finallyObj.costMin <= el.costMin &&
//             finallyObj.costMax >= el.costMin
//           );
//         } else if (finallyObj.costMin) {
//           return (
//             finallyObj.rooms == el.rooms && finallyObj.costMin <= el.costMin
//           );
//         } else if (finallyObj.costMax) {
//           return (
//             finallyObj.rooms == el.rooms && finallyObj.costMax > el.costMin
//           );
//         } else return finallyObj.rooms == el.rooms;
//       } else {
//         if (finallyObj.costMin && finallyObj.costMax) {
//           return (
//             finallyObj.costMin <= el.costMin && finallyObj.costMax >= el.costMin
//           );
//         } else if (finallyObj.costMin) {
//           return finallyObj.costMin <= el.costMin;
//         } else if (finallyObj.costMax) {
//           return finallyObj.costMax > el.costMin;
//         } else return undefined;
//       }
//     }
//   });
// };

// export const filterSlice = createSlice({
//   name: "filter",
//   initialState,
//   reducers: {
//     filter: (state, action) => {
//       state.filteredApartments = filterApartments(state, action.payload);
//       // filterApartments(state, action.payload);
//     },
//   },
// });

// export const { filter } = filterSlice.actions;

// export default filterSlice.reducer;
