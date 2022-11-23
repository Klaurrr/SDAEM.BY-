import { useState } from "react";
import mainBackGround from "../../assets/images/mainBackGround.png";
import apartment from "../../assets/images/apartments-day.jpg";
import cottagesAndEstates from "../../assets/images/cottages&estates.jpg";
import cars from "../../assets/images/cars.jpg";
import bathHouse from "../../assets/images/bath.png";
import chevron from "../../assets/images/chevron.png";
import more from "../../assets/images/more.png";
import geoPurple from "../../assets/images/geoPurple.png";
import gaps from "../../assets/images/gaps.png";
import metro from "../../assets/images/metro.png";
import checkMark from "../../assets/images/checkMark.png";
import chevronNavigate from "../../assets/images/chevronLeft.png";
import checkMarkRight from "../../assets/images/checkMark_right.png";
import AdFree from "../../assets/images/AD_Free.png";
import AdUp from "../../assets/images/AD_Up.png";
import Card from "../Card";
import geoYellow from "../../assets/images/geoYellow.png";
import "./style.scss";

const Main = () => {
  const [style, setStyle] = useState("one");

  const [city, setCity] = useState(undefined);
  const [rooms, setRooms] = useState(undefined);
  const [costMax, setCostMax] = useState(undefined);
  const [costMin, setCostMin] = useState(undefined);
  const [data, setData] = useState(undefined);

  const [selectFirst, setSelectFirst] = useState(false);
  const [selectSecond, setSelectSecond] = useState(false);

  const [drop, setDrop] = useState(false);
  const [dropTwo, setDropTwo] = useState(false);

  const [nameSelect, setNameSelect] = useState("Выберите");
  const [nameSelectRooms, setNameSelectRooms] = useState("Выберите");

  const [nameDrop, setNameDrop] = useState("Метро");
  const [nameDropTwo, setNameDropTwo] = useState("Район");

  const apartments = [
    {
      city: "Минск",
      rooms: 2,
      costMin: 30,
    },
    {
      city: "Минск",
      rooms: 4,
      costMin: 80,
    },
    {
      city: "Минск",
      rooms: 1,
      costMin: 10,
    },
    {
      city: "Гомель",
      rooms: 3,
      costMin: 50,
    },
    {
      city: "Гродно",
      rooms: 4,
      costMin: 80,
    },
    {
      city: "Могилев",
      rooms: 2,
      costMin: 20,
    },
    {
      city: "Брест",
      rooms: 3,
      costMin: 50,
    },
    {
      city: "Гомель",
      rooms: 4,
      costMin: 90,
    },
    {
      city: "Гродно",
      rooms: 1,
      costMin: 20,
    },
    {
      city: "Брест",
      rooms: 2,
      costMin: 20,
    },
    {
      city: "Могилев",
      rooms: 4,
      costMin: 20,
    },
  ];

  const selectActiveFirst = (e) => {
    setSelectFirst(selectFirst ? false : true);
  };

  const selectActiveTwo = (e) => {
    setSelectSecond(selectSecond ? false : true);
  };

  const selectValueFirst = (e) => {
    setSelectFirst(selectFirst ? false : true);
    setCity({ city: e.target.outerText });
    setNameSelect(e.target.outerText);
  };

  const selectValueSecond = (e) => {
    setSelectSecond(selectSecond ? false : true);
    setRooms({ rooms: e.target.outerText });
    setNameSelectRooms(e.target.outerText);
  };

  const setDropDown = (e) => {
    setDrop(drop ? false : true);
    setNameDrop(e);
  };
  const setDropDownTwo = (e) => {
    setDropTwo(dropTwo ? false : true);
    setNameDropTwo(e);
  };

  const createFinallyObj = (city, rooms, costMin, costMax) => {
    const finallyObj = Object.assign({}, city, rooms, costMin, costMax);
    setData(
      apartments.filter((el) => {
        if (finallyObj.city && finallyObj.city !== "Выберите") {
          if (finallyObj.rooms && finallyObj.rooms !== "Выберите") {
            if (finallyObj.costMin && finallyObj.costMax) {
              return (
                finallyObj.city === el.city &&
                finallyObj.rooms == el.rooms &&
                finallyObj.costMin <= el.costMin &&
                finallyObj.costMax >= el.costMin
              );
            } else if (finallyObj.costMin) {
              return (
                finallyObj.city === el.city &&
                finallyObj.rooms == el.rooms &&
                finallyObj.costMin <= el.costMin
              );
            } else if (finallyObj.costMax) {
              return (
                finallyObj.city === el.city &&
                finallyObj.costMax > el.costMin &&
                finallyObj.rooms == el.rooms
              );
            } else {
              return (
                finallyObj.city === el.city && finallyObj.rooms == el.rooms
              );
            }
          } else {
            if (finallyObj.costMin && finallyObj.costMax) {
              return (
                finallyObj.city === el.city &&
                finallyObj.costMin <= el.costMin &&
                finallyObj.costMax >= el.costMin
              );
            } else if (finallyObj.costMin) {
              return (
                finallyObj.city === el.city && finallyObj.costMin <= el.costMin
              );
            } else if (finallyObj.costMax) {
              return (
                finallyObj.city === el.city && finallyObj.costMax > el.costMin
              );
            } else return finallyObj.city === el.city;
          }
        } else {
          if (finallyObj.rooms && finallyObj.rooms !== "Выберите") {
            if (finallyObj.costMin && finallyObj.costMax) {
              return (
                finallyObj.rooms == el.rooms &&
                finallyObj.costMin <= el.costMin &&
                finallyObj.costMax >= el.costMin
              );
            } else if (finallyObj.costMin) {
              return (
                finallyObj.rooms == el.rooms && finallyObj.costMin <= el.costMin
              );
            } else if (finallyObj.costMax) {
              return (
                finallyObj.rooms == el.rooms && finallyObj.costMax > el.costMin
              );
            } else return finallyObj.rooms == el.rooms;
          } else {
            if (finallyObj.costMin && finallyObj.costMax) {
              return (
                finallyObj.costMin <= el.costMin &&
                finallyObj.costMax >= el.costMin
              );
            } else if (finallyObj.costMin) {
              return finallyObj.costMin <= el.costMin;
            } else if (finallyObj.costMax) {
              return finallyObj.costMax > el.costMin;
            } else return undefined;
          }
        }
      })
    );
  };

  return (
    <>
      <main className="main_container">
        <div
          className="main_wrapper"
          style={{ background: `url(${mainBackGround})` }}
        >
          <div className="main_background">
            <h1 className="main_title">
              Sdaem.by - у нас живут <span>ваши объявления</span>
            </h1>
            <ul className="main_ul">
              <li
                onClick={() => setStyle(style === "one" ? "one" : "one")}
                className={`main_li ${style === "one" ? "active" : ""}`}
              >
                Квартиры на сутки
              </li>
              <li
                onClick={() => setStyle(style === "two" ? "two" : "two")}
                className={`main_li ${style === "two" ? "active" : ""}`}
              >
                Коттеджи и усадьбы
              </li>
              <li
                onClick={() => setStyle(style == "three" ? "three" : "three")}
                className={`main_li ${style === "three" ? "active" : ""}`}
              >
                Бани и сауны
              </li>
              <li
                onClick={() => setStyle(style == "four" ? "four" : "four")}
                className={`main_li ${style === "four" ? "active" : ""}`}
              >
                Авто напрокат
              </li>
            </ul>
            <div className="main_select">
              <div className="select_item city">
                <p className="select_item-title">Город</p>
                <div>
                  <div
                    className={
                      selectFirst ? "select_city-active" : "select_city"
                    }
                    onClick={(e) => selectActiveFirst(e)}
                  >
                    <div className="select_city-wrapper">
                      {nameSelect}
                      <img src={checkMark} alt="" />
                    </div>
                  </div>
                  <div
                    style={{ position: "relative", left: "0" }}
                    className={
                      selectFirst
                        ? "main_drop-down-active"
                        : "main_drop-down-disabled"
                    }
                  >
                    <p
                      className="select_city-p"
                      onClick={(e) => selectValueFirst(e)}
                    >
                      Минск
                    </p>
                    <p
                      className="select_city-p"
                      onClick={(e) => selectValueFirst(e)}
                    >
                      Гомель
                    </p>
                    <p
                      className="select_city-p"
                      onClick={(e) => selectValueFirst(e)}
                    >
                      Гродно
                    </p>
                    <p
                      className="select_city-p"
                      onClick={(e) => selectValueFirst(e)}
                    >
                      Могилев
                    </p>
                    <p
                      className="select_city-p"
                      onClick={(e) => selectValueFirst(e)}
                    >
                      Брест
                    </p>
                  </div>
                </div>
              </div>
              <div className="select_item rooms">
                <p className="select_item-title">Комнаты</p>
                <div>
                  <div
                    className={
                      selectSecond ? "select_city-active" : "select_city"
                    }
                    onClick={(e) => selectActiveTwo(e)}
                  >
                    <div className="select_city-wrapper">
                      {nameSelectRooms}
                      <img src={checkMark} alt="" />
                    </div>
                  </div>
                  <div
                    style={{ position: "relative", left: "0" }}
                    className={
                      selectSecond
                        ? "main_drop-down-active"
                        : "main_drop-down-disabled"
                    }
                  >
                    <p
                      className="select_rooms-p"
                      onClick={(e) => selectValueSecond(e)}
                    >
                      1
                    </p>
                    <p
                      className="select_rooms-p"
                      onClick={(e) => selectValueSecond(e)}
                    >
                      2
                    </p>
                    <p
                      className="select_rooms-p"
                      onClick={(e) => selectValueSecond(e)}
                    >
                      3
                    </p>
                    <p
                      className="select_rooms-p"
                      onClick={(e) => selectValueSecond(e)}
                    >
                      4
                    </p>
                  </div>
                </div>
              </div>
              <div className="select_item cost" id="cost">
                <p
                  className="select_item-title"
                  style={{ marginBottom: "10px" }}
                >
                  Цена за сутки (BYN)
                </p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    className="main_input"
                    type="text"
                    placeholder="От"
                    onChange={(e) =>
                      setCostMin({
                        costMin: e.target.value,
                      })
                    }
                  />
                  -
                  <input
                    className="main_input"
                    type="text"
                    placeholder="До"
                    onChange={(e) =>
                      setCostMax({
                        costMax: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="select_item" id="more">
                <div className="more">
                  Больше опций
                  <img className="img_more" src={more} alt="more" />
                </div>
              </div>
              <div className="select_item">
                <div className="more_two">
                  На карте
                  <img
                    className="img_geo-purple"
                    src={geoPurple}
                    alt="geo-purple"
                  />
                  <button
                    onClick={() =>
                      createFinallyObj(city, rooms, costMin, costMax)
                    }
                  >
                    Показать {">"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main_cards-wrapper">
          {data ? (
            data.length > 0 ? (
              data.map((item) => <Card data={[item]} />)
            ) : (
              <div>
                <h1>Такого экземпляра нет, посмотрите что-нибудь другое</h1>
                <button onClick={() => setData(undefined)}>
                  Вернуться к выбору
                </button>
              </div>
            )
          ) : (
            <>
              <section className="main_container-2">
                <div>
                  <div className="main_wrapper-2">
                    <div
                      style={{
                        background: `url(${apartment})`,
                        width: "516px",
                        height: "270px",
                        borderRadius: "10px",
                      }}
                    >
                      <p className="main_title-2">Снять квартиру</p>
                      <p className="main_subtitle-2">Квартиры на сутки</p>
                      <ul className="main_ul-2">
                        <li>Минск</li>
                        <li>Витебск</li>
                        <li>Гродно</li>
                        <li>Гомель</li>
                        <li id="li_brest">Брест</li>
                        <li>Могилев</li>
                      </ul>
                    </div>
                    <div
                      style={{
                        background: `url(${cottagesAndEstates})`,
                        width: "407px",
                        height: "270px",
                        borderRadius: "10px",
                        marginLeft: "30px",
                      }}
                    >
                      <p className="main_title-2">СНЯТЬ коттедж НА ПРАЗДНИК</p>
                      <p className="main_subtitle-2">Коттеджи и усадьбы</p>
                      <img
                        className="img_chevron"
                        src={chevron}
                        alt="chevron"
                      />
                    </div>
                  </div>
                  <div className="main_wrapper-2" style={{ marginTop: "30px" }}>
                    <div
                      style={{
                        background: `url(${bathHouse})`,
                        width: "407px",
                        height: "270px",
                        borderRadius: "10px",
                      }}
                    >
                      <p className="main_title-2">
                        Попариться в бане с друзьями
                      </p>
                      <p className="main_subtitle-2">Бани и сауны</p>
                      <img
                        className="img_chevron"
                        src={chevron}
                        alt="chevron"
                      />
                    </div>
                    <div
                      style={{
                        background: `url(${cars})`,
                        width: "516px",
                        height: "270px",
                        borderRadius: "10px",
                        marginLeft: "30px",
                      }}
                    >
                      <p className="main_title-2">EСЛИ СРОЧНО НУЖНА МАШИНА</p>
                      <p className="main_subtitle-2">Авто на прокат</p>
                      <img
                        className="img_chevron"
                        id="img_chevron_cars"
                        src={chevron}
                        alt="chevron"
                      />
                    </div>
                  </div>
                  <img className="img_gaps" src={gaps} alt="gaps"></img>
                </div>
                <div className="main_wrapper_desc-2">
                  <div>
                    <h2>Квартиры</h2>
                    <p>
                      Квартиры в Минске
                      <span>
                        {
                          [...apartments].filter((el) => el.city === "Минск")
                            .length
                        }
                      </span>
                    </p>
                    <p>
                      Квартиры в Гомеле
                      <span>
                        {
                          [...apartments].filter((el) => el.city === "Гомель")
                            .length
                        }
                      </span>
                    </p>
                    <p>
                      Квартиры в Гродно
                      <span>
                        {
                          [...apartments].filter((el) => el.city === "Гродно")
                            .length
                        }
                      </span>
                    </p>
                    <p>
                      Квартиры в Могилеве{" "}
                      <span>
                        {
                          [...apartments].filter((el) => el.city === "Могилев")
                            .length
                        }
                      </span>
                    </p>
                    <p>
                      Квартиры в Бресте
                      <span>
                        {
                          [...apartments].filter((el) => el.city === "Брест")
                            .length
                        }
                      </span>
                    </p>
                    <p>
                      Квартиры в Витебске{" "}
                      <span>
                        {
                          [...apartments].filter((el) => el.city === "Город 6")
                            .length
                        }
                      </span>
                    </p>
                  </div>
                  <div>
                    <h2>Коттеджи и усадьбы</h2>
                    <p>Аггроусадьбы</p>
                    <p>Коттеджи</p>
                    <p>Загородный комплекс</p>
                    <p>Базы отдыха</p>
                    <select>
                      <option value="Еще">Еще</option>
                    </select>
                  </div>
                  <div>
                    <h2>Популярные направления</h2>
                    <p>Коттеджи и усадьбы на о.Брасласких </p>
                    <p>Коттеджи и усадьбы (жилье) на Нарочи</p>
                    <p>
                      Коттеджи и усадьбы (жилье) у воды, на берегу, на озере
                    </p>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </main>
      <section className="main_container-3">
        <div>
          <p className="main_title-3">Квартиры на сутки</p>
          <h3 className="main_subtitle-3">Аренда квартир в Минске</h3>

          <div className="main_flat-card">
            <Card
              data={[...apartments].filter((item) => item.city == "Минск")}
            />
          </div>
          <div
            style={{
              position: "absolute",
              marginTop: "610px",
              display: "flex",
            }}
          >
            <div className="main_offers_wrap">
              <h1>
                {[...apartments].filter((el) => el.city === "Минск").length}{" "}
                <span>+</span>
              </h1>
              <p>Предложений по Минску</p>
            </div>
            <div
              style={{ height: "70px", display: "flex", alignItems: "center" }}
            >
              <button className="main_offers_button">
                Посмотреть все
                <img src={checkMarkRight} alt="checkMarkRight" />
              </button>
            </div>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div className="main_wrapper-3"></div>
          <div className="main_drop-down">
            <div style={{ display: "flex" }}>
              <div
                className="main_drop-down__item"
                onClick={() => setDrop(drop ? false : true)}
              >
                <div
                  className="main_drop-down__item-wrap"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img src={metro} alt="" />
                  <p style={{ marginLeft: "8px" }}>{nameDrop}</p>
                </div>
                <img className="main_img-checkMark" src={checkMark} alt="" />
              </div>
              <div
                className="main_drop-down__item"
                onClick={() => setDropTwo(dropTwo ? false : true)}
              >
                <p className="main_drop-down__item-wrap">{nameDropTwo}</p>
                <img className="main_img-checkMark" src={checkMark} alt="" />
              </div>
            </div>
            <div
              className={
                drop ? "main_drop-down-active" : "main_drop-down-disabled"
              }
            >
              <p onClick={(e) => setDropDown(e.target.outerText)}>Есть</p>
              <p onClick={(e) => setDropDown(e.target.outerText)}>Нет</p>
            </div>
            <div
              className={
                dropTwo ? "main_drop-down-active" : "main_drop-down-disabled"
              }
              style={{ left: "16em" }}
            >
              <p onClick={(e) => setDropDownTwo(e.target.outerText)}>Район 1</p>
              <p onClick={(e) => setDropDownTwo(e.target.outerText)}>Район 2</p>
              <p onClick={(e) => setDropDownTwo(e.target.outerText)}>Район 3</p>
              <p onClick={(e) => setDropDownTwo(e.target.outerText)}>Район 4</p>
            </div>
          </div>
          <div className="main_chevrons">
            <img src={chevronNavigate} alt="" />
            <img src={chevronNavigate} alt="" />
          </div>
        </div>
      </section>
      <section className="main_container-4">
        <div
          className="main_search-map"
          style={{
            background: `url(${mainBackGround})`,
            width: "1440px",
            height: "440px",
            backgroundSize: "100% 100%",
          }}
        >
          <div className="main_background-4">
            <div className="main_search-desc">
              <h3>Поиск квартир на карте</h3>
              <p>
                Ищите квартиры на сутки в центре города,
                <br /> возле парка или в живописном районе
              </p>
              <button>
                <div>
                  <img src={geoYellow} alt="geoYellow" />
                  <p>Открыть карту</p>
                </div>
              </button>
            </div>
            <div
              style={{
                display: "flex",
                margin: "94px 80px 0px",
                justifyContent: "space-between",
              }}
            >
              <div className="main_search-cards">
                <div style={{ padding: "25px 0px 0px 37px" }}>
                  <div className="main_search-cards-title">
                    <img src={AdFree} alt="" />
                    <p>
                      Начните привлекать <br /> клиентов бесплатно!
                    </p>
                  </div>
                  <div>
                    <p>
                      Пройдя простую регистрацию на сайте у Вас появится личный
                      кабинет, в котором возможно{" "}
                      <span>бесплатно создавать и публиковать</span>
                      объявления на сайте.
                    </p>
                  </div>
                  <button>+ Разместить объявление</button>
                </div>
              </div>
              <div className="main_search-cards">
                <div className="main_search-cards-title">
                  <img src={AdUp} alt="" />
                  <p>
                    Поднимайте <br /> объявления
                  </p>
                </div>
                <div>
                  <p>
                    Вы в любое время можете <span>поднимать</span> объявления{" "}
                    <span>вверх первой страницы</span> каталога, они разместятся
                    сразу после платных объявлений до тех пор, пока другой
                    пользователь не повторит процедуру.
                  </p>
                </div>
                <button>
                  <p>Узнать стоимость услуги</p>
                  <img src={checkMarkRight} alt="checkMarkRight" />
                </button>
              </div>
              <div className="main_search-cards gold">
                <h2>Приоритет Gold</h2>
                <div>
                  <p>
                    Приоритетное размещение <span>Gold</span> позволяет{" "}
                    <span>закрепить ваше объявление</span> в верхней части
                    каталога!
                  </p>
                  <p>
                    Gold объявления <span>перемещаются каждые 5 мин</span> на 1
                    позицию, что делает размещение одинаковым для всех.
                  </p>
                </div>
                <button>
                  <p>Еще о тарифе Gold</p>
                  <img src={checkMarkRight} alt="checkMarkRight" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;
