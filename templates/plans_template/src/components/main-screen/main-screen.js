import React, { useEffect, useState } from 'react';
import BtnComponent from '../btn-component';
import CityTitle from '../city-title';
import parse from 'html-react-parser';
import Advantages from '../advantages';
import Gallery from '../gallery';
import PlansComponent from '../plans-component';
import Popups from '../popups';

const MainScreen = ({ params, nextStep }) => {
  const [showAllContent, setShow] = useState(false)
  const onScroll = (event) => {
    window.removeEventListener('scroll', onScroll);
    setShow(true)
  }
  useEffect(()=>{
    window.addEventListener('scroll', onScroll);
  },[])
  return (
    <React.Fragment>
      <section className="container_main">
        <section className="hl_top">
          <div className="wmain">
            <div className="logo">
              <img style={{ height: 'auto', opacity: "0" }} src="/templates/plans_template/build/img/logo.png" />
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
        <section className="header" style={{ background: params.background != "" ? `url("/file-store/${params.background}") center / cover no-repeat` : `url("/templates/plans_template/build/img/hd_bg_0810.jpg")` }}>
          <div style={{ width: '100%', padding: '100px 0px' }}>
            <div className="hd_inn">
              <CityTitle params={params} />
              <div className="page_view main_page">
                <h1>
                  {params.title == '' ? 'Недорогие новостройки' : params.title}
                </h1>
                <sub></sub>
                <div className="color_text">
                  {domainSettings.domain.sub_title === undefined || domainSettings.domain.sub_title == ''
                    ? parse('Бесплатный сервис по подбору недвижимости:')
                    : parse(domainSettings.domain.sub_title)}
                  <br />
                  <ul className="header_list">
                    {domainSettings.domain.sub_title_items === undefined ||
                      domainSettings.domain.sub_title_items == ''
                      ? parse(
                        '<li>Все районы города</li><li>Подберем на ваш вкус</li>'
                      )
                      : parse(domainSettings.domain.sub_title_items)}
                  </ul>
                </div>
                <BtnComponent
                  text={'Начать поиск'}
                  params={params}
                  clickFunct={nextStep}
                />
              </div>
            </div>
          </div>
        </section>
        <div className="cookie">
          <span>
            Мы используем файлы cookie, чтобы убедиться, что наш веб-сайт
            работает должным образом. Вы можете продолжить пользоваться нашим
            сайтом и принять нашу
            <a href="Cookie_policy.pdf" target="_blank">
              Политику cookie
            </a>
            . Изменить ваши настройки cookie можно будет в любой момент.
          </span>
          <a className="cookie_btn" onClick={(e) => { e.preventDefault(); document.querySelector('.cookie').style.display = "none" }}> Я принимаю</a>
        </div>
        {domainSettings.domain.Plans.length > 0 ? <PlansComponent params={params} /> : <div></div>}
        <section className="advantages">
          <Advantages />
          {showAllContent?<React.Fragment><Gallery params={params} />
          <div className="adv_in">
            <img src="/templates/plans_template/build/img/adv_in.png" />
            <span> {domainSettings.domain.footer_title === undefined || domainSettings.domain.footer_title == ''
              ? parse('Получите подходящие варианты в течение нескольких минут')
              : parse(domainSettings.domain.footer_title)}</span>
          </div>
          <BtnComponent
            text={'Начать быстрый поиск'}
            params={params}
            clickFunct={nextStep}
          /></React.Fragment>:<div></div>}
        </section>

        {showAllContent?<React.Fragment><footer>
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
        </footer></React.Fragment>:<div></div>}
      </section>
    </React.Fragment>
  );
};

export default MainScreen;
