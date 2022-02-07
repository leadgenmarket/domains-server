import React from 'react';
import BtnComponent from '../btn-component';
import CityTitle from '../city-title';
import parse from 'html-react-parser';
import Advantages from '../advantages';
import Gallery from '../gallery';

const MainScreen = ({ params, nextStep }) => {
  return (
    <React.Fragment>
      <section className="container_main">
        <section className="hl_top">
          <div className="wmain">
            <div className="logo">
              <img style={{ height: 'auto' }} src="/img/logo.png" />
            </div>
            <div className="hl_phone">
              <a
                className="roistat"
                href={
                  params.phone
                    ? 'tel:' + params.phone.replaceAll(' ', '')
                    : 'tel:+78006005523'
                }
              >
                {params.phone ? params.phone : '8 800 600 55 23'}
              </a>
            </div>
          </div>
        </section>
        <section className="header">
          <div style={{ width: '100%', padding: '100px 0px' }}>
            <div className="hd_inn">
              <CityTitle params={params} />
              <div className="page_view main_page">
                <h1>
                  {params.title == '' ? 'Недорогие новостройки' : params.title}
                </h1>
                <sub></sub>
                <div className="color_text">
                  {params.sub_title === undefined || params.sub_title == ''
                    ? parse('Бесплатный сервис по подбору недвижимости:')
                    : parse(params.sub_title)}
                  <br />
                  <ul className="header_list">
                    {params.title_items === undefined ||
                    params.title_items == ''
                      ? parse(
                          '<li>Все районы города</li><li>Подберем на ваш вкус</li>'
                        )
                      : parse(params.title_items)}
                  </ul>
                </div>
                <a href="#" onClick={nextStep} className="btn_main">
                  Начать поиск
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="cookie">
          <span>
            Мы используем файлы cookie, чтобы убедиться, что наш веб-сайт
            работает должным образом. Вы можете продолжить пользоваться нашим
            сайтом и принять нашу{' '}
            <a href="Cookie_policy.pdf" target="_blank">
              Политику cookie
            </a>
            . Изменить ваши настройки cookie можно будет в любой момент.
          </span>{' '}
          <a className="cookie_btn">Я принимаю</a>
        </div>
        <section className="advantages">
          <Advantages />
          <Gallery />
          <div className="adv_in">
            <img src="/img/adv_in.png" />
            <span>Получите подходящие варианты в течение нескольких минут</span>
          </div>
          <BtnComponent
            text={'Начать быстрый поиск'}
            params={params}
            clickFunct={nextStep}
          />
        </section>
        <footer>
          <div className="wmain">
            <div className="f_left" style={{ float: 'right' }}>
              <a
                className="roistat"
                href={
                  params.phone
                    ? 'tel:' + params.phone.replaceAll(' ', '')
                    : 'tel:+78006005523'
                }
              >
                {params.phone ? params.phone : '8 800 600 55 23'}
              </a>
            </div>
            <div className="f_right">
              <p>Leadactiv</p>
              <span>2022 г.</span>
            </div>
            <div className="clr"></div>
          </div>
        </footer>
      </section>
    </React.Fragment>
  );
};

export default MainScreen;
