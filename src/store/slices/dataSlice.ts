import { createSlice } from "@reduxjs/toolkit";
import flats from "assets/flats";


const initialState = {
  news: [
    {
      title: "Линия Сталина: суровый отдых в усадьбах на сутки",
      news: "Чем заняться в выходные? Когда нет безотлагательных домашних дел, а на улице хорошая погода, хочется уехать из города, чтобы сменить обстановку. Например, снять коттедж на сутки для семьи или большой компании друзей. А...",
      description:
        'Итак, утром вы выезжаете в путь по Молодеченской трассе. Если автомобиля у вас нет - садитесь на маршрутку в сторону Молодечно от железнодорожного вокзала. Остановка называется «Линия Сталина» - да-да, именно здесь вы и проведёте ближайшие несколько часов, а вероятнее всего – останетесь до самого вечера. «Линия Сталина» - это уникальный музейный комплекс, располагающийся под открытым небом. Поэтому желательно приезжать сюда в хорошую погоду. Его территория поистине огромна: целых 26 га. Такое название дано музею неспроста: «Линией Сталина» в 20е-30е гг. XX века именовали цепь укреплений, созданную для защиты государственной границы СССР. Комплекс же построен лишь в 2005 году – к шестидесятой годовщине Победы в Великой Отечественной войне. Если вы заранее позаботились о том, чтобы снять усадьбу на сутки в направлении Молодечно, то можете провести в музейном комплексе хоть целый день. Здесь действительно есть на что посмотреть: ДОТы, испещрённые следами немецких снарядов, окопы, противотанковые заграждения, зенитные пушки, бронетехника… Вы встретите даже элементы ракетных войск – и всё это не муляжи, а настоящие боевые орудия! За отдельную плату вам предложат пострелять из винтовки и пулемёта, а также прокатиться на танке. Проголодались? Загляните в кафе и насладитесь сытным домашним обедом.Посетить «Линию Сталина» будет интересно как взрослым, так и детям. Особенно мальчишкам! Уставшие от впечатлений, они будут рады вместо долгой дороги домой остановиться на ночь в уютном современном коттедже. На сайте можно выбрать и снять посуточно наиболее удобный для вас вариант. Проведите незабываемые выходные за городом – приезжайте в «Линию Сталина»! Отличная усадьба в 10 км от "Линии Сталина".',
      date: "14 Января",
      year: 2008,
      id: 1,
      img: flats.flat_1
    },
    {
      title: "Дворцово-парковый комплекс Чапских",
      news: "Чем заняться в выходные? Когда нет безотлагательных домашних дел, а на улице хорошая погода, хочется уехать из города, чтобы сменить обстановку. Например, снять коттедж на сутки для семьи или большой компании друзей. А...",
      description:
        "Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...",
      date: "15 Декабря",
      year: 2022,
      id: 2,
      img: flats.flat_2,
    },
    {
      title: "Дворцово-парковый комплекс Усовых",
      news: "Чем заняться в выходные? Когда нет безотлагательных домашних дел, а на улице хорошая погода, хочется уехать из города, чтобы сменить обстановку. Например, снять коттедж на сутки для семьи или большой компании друзей. А...",
      description:
        "Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...",
      date: "14 Января",
      year: 2000,
      id: 3,
      img: flats.flat_3,
    },
    {
      title: "Хокинг брос: Апартаменты для фронтенд-разработчиков",
      news: "Чем заняться в выходные? Когда нет безотлагательных домашних дел, а на улице хорошая погода, хочется уехать из города, чтобы сменить обстановку. Например, снять коттедж на сутки для семьи или большой компании друзей. А...",
      description:
        "Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...",
      date: "5 Августа",
      year: 2006,
      id: 4,
      img: flats.cottages
    },
    {
      title: "Линия Сталина: суровый отдых в усадьбах на сутки",
      news: "Чем заняться в выходные? Когда нет безотлагательных домашних дел, а на улице хорошая погода, хочется уехать из города, чтобы сменить обстановку. Например, снять коттедж на сутки для семьи или большой компании друзей. А...",
      description:
        "Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...",
      date: "23 Июня",
      year: 1997,
      id: 5,
      img: flats.flat_1
    },
    {
      title: "Нижегородский буткемп: нескучные выходные",
      news: "Чем заняться в выходные? Когда нет безотлагательных домашних дел, а на улице хорошая погода, хочется уехать из города, чтобы сменить обстановку. Например, снять коттедж на сутки для семьи или большой компании друзей. А...",
      description:
        "Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...",
      date: "12 Декабря",
      year: 2000,
      id: 6,
      img: flats.flat_2
    },
    {
      title: "Нижегородский буткемп: нескучные выходные",
      news: "Чем заняться в выходные? Когда нет безотлагательных домашних дел, а на улице хорошая погода, хочется уехать из города, чтобы сменить обстановку. Например, снять коттедж на сутки для семьи или большой компании друзей. А...",
      description:
        "Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...",
      date: "12 Декабря",
      year: 1999,
      id: 7,
      img: flats.flat_3
    },
    {
      title: "Московские будни: Тусовка на яхте",
      news: "Чем заняться в выходные? Когда нет безотлагательных домашних дел, а на улице хорошая погода, хочется уехать из города, чтобы сменить обстановку. Например, снять коттедж на сутки для семьи или большой компании друзей. А...",
      description:
        "Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...",
      date: "12 Января",
      year: 1700,
      id: 8,
      img: flats.flat_1
    },
    {
      title: "Московские будни: Тусовка на яхте",
      news: "Чем заняться в выходные? Когда нет безотлагательных домашних дел, а на улице хорошая погода, хочется уехать из города, чтобы сменить обстановку. Например, снять коттедж на сутки для семьи или большой компании друзей. А...",
      description:
        "Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...",
      date: "15 Февраля",
      year: 1990,
      id: 9,
      img: flats.flat_3
    },
    {
      title: "Дворцово-парковый комплекс Усовых",
      news: "Чем заняться в выходные? Когда нет безотлагательных домашних дел, а на улице хорошая погода, хочется уехать из города, чтобы сменить обстановку. Например, снять коттедж на сутки для семьи или большой компании друзей. А...",
      description:
        "Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...",
      date: "12 Июля",
      year: 1999,
      id: 10,
      img: flats.flat_2
    },
    {
      title: "Дворцово-парковый комплекс Чапских",
      news: "Чем заняться в выходные? Когда нет безотлагательных домашних дел, а на улице хорошая погода, хочется уехать из города, чтобы сменить обстановку. Например, снять коттедж на сутки для семьи или большой компании друзей. А...",
      description:
        "Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...",
      date: "12 Декабря",
      year: 1700,
      id: 11,
      img: flats.apartments
    },
    {
      title: "Дворцово-парковый комплекс Челогузовых",
      news: "Чем заняться в выходные? Когда нет безотлагательных домашних дел, а на улице хорошая погода, хочется уехать из города, чтобы сменить обстановку. Например, снять коттедж на сутки для семьи или большой компании друзей. А...",
      description:
        "Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...",
      date: "12 Мая",
      year: 2005,
      id: 12,
      img: flats.flat_1
    },
    {
      title: "Дворец Елизаветы: Историческое насыщение",
      news: "Чем заняться в выходные? Когда нет безотлагательных домашних дел, а на улице хорошая погода, хочется уехать из города, чтобы сменить обстановку. Например, снять коттедж на сутки для семьи или большой компании друзей. А...",
      description:
        "Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...",
      date: "10 Января",
      year: 1744,
      id: 13,
      img: flats.flat_3
    },
    {
      title: "Дворец Екатерины: Историческое насыщение",
      news: "Чем заняться в выходные? Когда нет безотлагательных домашних дел, а на улице хорошая погода, хочется уехать из города, чтобы сменить обстановку. Например, снять коттедж на сутки для семьи или большой компании друзей. А...",
      description:
        "Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...",
      date: "5 Августа",
      year: 1756,
      id: 14,
      img: flats.flat_2
    },
    {
      title: "Дворец Екатерины: Историческое насыщение",
      news: "Чем заняться в выходные? Когда нет безотлагательных домашних дел, а на улице хорошая погода, хочется уехать из города, чтобы сменить обстановку. Например, снять коттедж на сутки для семьи или большой компании друзей. А...",
      description:
        "Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...Какое-то описание...",
      date: "12 Декабря",
      year: 1756,
      id: 15,
      img: flats.apartments
    },
  ],
  apartments: [
    {
      city: "Минск",
      rooms: 4,
      costMin: 80,
      owner: "Егор",
      phone: +375292911444,
      email: "email@yandex.ru",
      img: "diCaprio.jpg",
      flatView_1: "flatView.png",
      flatView_2: "flatView_2.png",
      flatView_3: "flatView_3.png",
      id: 1,
    },
    {
      city: "Минск",
      rooms: 2,
      costMin: 30,
      owner: "Дмитрий",
      phone: +79030051454,
      email: "email@yandex.ru",
      img: "boy.png",
      flatView_1: "flatView.png",
      flatView_2: "flatView_2.png",
      flatView_3: "flatView_3.png",
      id: 2,
    },
    {
      city: "Минск",
      rooms: 1,
      costMin: 10,
      owner: "Михаил",
      phone: +245030051454,
      email: "email@yandex.ru",
      img: "Pitt.jpg",
      flatView_1: "flatView.png",
      flatView_2: "flatView_2.png",
      flatView_3: "flatView_3.png",
      id: 3,
    },
    {
      city: "Гомель",
      rooms: 3,
      costMin: 50,
      owner: "Артем",
      phone: +79030051454,
      email: "email@yandex.ru",
      img: "diCaprio.jpg",
      flatView_1: "flatView.png",
      flatView_2: "flatView_2.png",
      flatView_3: "flatView_3.png",
      id: 4,
    },
    {
      city: "Гродно",
      rooms: 4,
      costMin: 80,
      owner: "Сергей",
      phone: +72412674454,
      email: "email@yandex.ru",
      img: "Pitt.jpg",
      flatView_1: "flatView.png",
      flatView_2: "flatView_2.png",
      flatView_3: "flatView_3.png",
      id: 5,
    },
    {
      city: "Могилев",
      rooms: 2,
      costMin: 20,
      owner: "Роман",
      phone: +87343051454,
      email: "email@yandex.ru",
      img: "boy.png",
      flatView_1: "flatView.png",
      flatView_2: "flatView_2.png",
      flatView_3: "flatView_3.png",
      id: 6,
    },
    {
      city: "Брест",
      rooms: 3,
      costMin: 50,
      owner: "Александр",
      phone: +123512051454,
      email: "email@yandex.ru",
      img: "Pitt.jpg",
      flatView_1: "flatView.png",
      flatView_2: "flatView_2.png",
      flatView_3: "flatView_3.png",
      id: 7,
    },
    {
      city: "Гомель",
      rooms: 4,
      costMin: 90,
      owner: "Иван",
      phone: +79030051454,
      email: "email@yandex.ru",
      img: "diCaprio.jpg",
      flatView_1: "flatView.png",
      flatView_2: "flatView_2.png",
      flatView_3: "flatView_3.png",
      id: 8,
    },
    {
      city: "Гродно",
      rooms: 1,
      costMin: 20,
      owner: "Даниил",
      phone: +3109030051454,
      email: "email@yandex.ru",
      img: "boy.png",
      flatView_1: "flatView.png",
      flatView_2: "flatView_2.png",
      flatView_3: "flatView_3.png",
      id: 9,
    },
    {
      city: "Брест",
      rooms: 2,
      costMin: 20,
      owner: "Кирилл",
      phone: +12561251454,
      email: "email@yandex.ru",
      img: "diCaprio.jpg",
      flatView_1: "flatView.png",
      flatView_2: "flatView_2.png",
      flatView_3: "flatView_3.png",
      id: 10,
    },
    {
      city: "Могилев",
      rooms: 4,
      costMin: 50,
      owner: "Антон",
      phone: +561260051454,
      email: "email@yandex.ru",
      img: "Pitt.jpg",
      flatView_1: "flatView.png",
      flatView_2: "flatView_2.png",
      flatView_3: "flatView_3.png",
      id: 11,
    },
    {
      city: "Минск",
      rooms: 3,
      costMin: 60,
      owner: "Алексей",
      phone: +5512330051454,
      email: "email@yandex.ru",
      img: "Pitt.jpg",
      flatView_1: "flatView.png",
      flatView_2: "flatView_2.png",
      flatView_3: "flatView_3.png",
      id: 12,
    },
  ],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setNews(state, action) {
      state.news = [...state.news].concat(action.payload.news);
    },
    setApartments(state, action) {
      state.apartments = [...state.apartments].concat(
        action.payload.apartments
      );
    },
  },
});

export const { setNews, setApartments } = dataSlice.actions;

export default dataSlice.reducer;
