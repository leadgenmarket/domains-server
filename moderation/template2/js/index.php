<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>ЖК Лидер Парк</title>
	<!-- css -->
    <link rel="stylesheet" type="text/css" href="css/jquery.formstyler.css">
    <link rel="stylesheet" type="text/css" href="css/jquery.formstyler.theme.css">
	<link rel="stylesheet" type="text/css" href="css/jquery.mCustomScrollbar.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link rel="stylesheet" type="text/css" href="css/slick.css">
	<link rel="stylesheet" type="text/css" href="css/animate.css">
</head>
<body>
	<!-- begin container_main -->
	<section class="container_main">	
		<section class="hl_top">
			<div class="hl_top_bg"></div>
			<div class="wmain">
				<div class="nav_mobile"></div>
				<div class="logo">
					<!-- <img src="img/logo.png"> -->
				</div>
				<ul class="hl_nav">
					<li><a data="photos" href="#"><span>Фотогалерея</span></a></li>
					<li><a data="plans" href="#"><span>Планировки</span></a></li>
					<li><a data="howtobuy" href="#"><span>Как купить</span></a></li>
					<li><a data="contacts" href="#"><span>Контакты</span></a></li>
				</ul>
				<ul class="hl_nav hl_nav2">
					<li><a data="photos" href="#"><span>Фотогалерея</span></a></li>
					<li><a data="plans" href="#"><span>Планировки</span></a></li>
					<li><a data="howtobuy" href="#"><span>Как купить</span></a></li>
					<li><a data="contacts" href="#"><span>Контакты</span></a></li>
				</ul>
				<div class="hl_right">
					<a href="" class="hl_phone">8 (861) 205-14-57</a>
					<a href="#" class="btn_call show_popup" data-popup="call_popup"><span>Заказать звонок</span></a>
				</div>
			</div>		
		</section>
		<section class="header">
			<div class="header_inner">
				<h1><?include "titles.php"; echo $title;?> <span>Школа, детский сад, магазины - 3 мин. пешком</span></h1>
				<sub><span>от 1,8 млн. руб.</span></sub>
			</div>
			<div class="hd_info"><!-- <span>Рядом вся инфраструктура и пруд<br> 15 мин от МКАД (пробок не бывает)</span> --><img src="img/hd_info_img.png" alt=""></div>
		</section>
		<section class="proposition">
			<div class="tm"><span>Пожалуй, самые выгодные предложения в Мытищах</span></div>
			<ul class="prop_list">
				<li>
					<div class="prop_title">Студия</div>
					<a href="" class="prop_img show_popup" data-popup="pu_flat_2"><img src="img/prop_img1.jpg" alt=""></a>
					<div class="prop_price">от 1 490 000 &#x20bd;</div>
				</li>
				<li>
					<div class="prop_title">Однокомнатная квартира</div>
					<a href="" class="prop_img show_popup" data-popup="pu_flat_2"><img src="img/prop_img2.jpg" alt=""></a>
					<div class="prop_price">от 1 750 000  &#x20bd;</div>
				</li>
				<li>
					<div class="prop_title">Двухкомнатная квартира</div>
					<a href="" class="prop_img show_popup" data-popup="pu_flat_2"><img src="img/prop_img3.jpg" alt=""></a>
					<div class="prop_price">от 1 925 000  &#x20bd;</div>
				</li>
				<li>
					<div class="prop_title">трехкомнатная квартира</div>
					<a href="" class="prop_img show_popup" data-popup="pu_flat_2"><img src="img/prop_img4.jpg" alt=""></a>
					<div class="prop_price">от 2 825 000  &#x20bd;</div>
				</li>
			</ul>

			<div class="prop_list prop_slid" id="prop_slid">
				<div>
					<div class="pr_inn">
						<div class="prop_title">Студия</div>
						<a href="" class="prop_img"><img src="img/prop_img1.jpg" alt=""></a>
						<div class="prop_price">от 1 490 000 &#x20bd;</div>
					</div>
				</div>
				<div>
					<div class="pr_inn">
						<div class="prop_title">Однокомнатная квартира</div>
						<a href="" class="prop_img"><img src="img/prop_img2.jpg" alt=""></a>
						<div class="prop_price">от 1 750 000  &#x20bd;</div>
					</div>
				</div>
				<div>
					<div class="pr_inn">
						<div class="prop_title">Двухкомнатная квартира</div>
						<a href="" class="prop_img"><img src="img/prop_img3.jpg" alt=""></a>
						<div class="prop_price">от 1 925 000  &#x20bd;</div>
					</div>
				</div>
				<div>
					<div class="pr_inn">
						<div class="prop_title">трехкомнатная квартира</div>
						<a href="" class="prop_img"><img src="img/prop_img4.jpg" alt=""></a>
						<div class="prop_price">от 2 825 000  &#x20bd;</div>
					</div>
				</div>
			</div>
			<div class="pr_arrows">
				<div class="pr_left" id="pr_left"></div>
				<div class="prop_dots"></div>
				<div class="pr_right" id="pr_right"></div>
			</div>
		</section>
		<section class="infra">
			<div class="dec2"></div>
			<div class="tm"><span>Вся инфраструктура в шаговой доступности</span></div>
			<div class="i_tit">социальная инфраструктура: </div>
			<ul class="infra_list soc_infra">
				<li><div class="infra_img"><div class="dec1"></div><img src="img/infra_img1.jpg" alt=""></div><span>Лингвистическая гимназия</span></li>
				<li><div class="infra_img"><div class="dec2"></div><img src="img/infra_img2.jpg" alt=""></div><span>Детский сад</span></li>
				<li><div class="infra_img"><div class="dec1"></div><img src="img/infra_img3.jpg" alt=""></div><span>Поликлиника около дома <p>(открытие в 2020 г.)</p></span></li>
			</ul>
			<div class="i_tit">спортивная инфраструктура: </div>
			<ul class="infra_list sport_infra">
				<li><div class="infra_img"><div class="dec1"></div><img src="img/infra_img4.jpg" alt=""></div><span>Фитнес-клуб</span></li>
				<li><div class="infra_img"><img src="img/infra_img5.jpg" alt=""></div><span>Спортивно-оздоровительный комплекс <p>(открытие в 2020 г.)</p></span></li>
				<li><div class="infra_img"><div class="dec1"></div><img src="img/infra_img6.jpg" alt=""></div><span>Бассейн</span></li>
			</ul>
			<div class="i_tit">коммерческая инфраструктура: </div>
			<ul class="infra_list kommerc_infra" id="kommerc_slid">
				<div>
					<li><div class="infra_img"><div class="dec1 t_left"></div><img src="img/infra_img7.jpg" alt=""></div><span>ТРЦ “Июнь”</span></li>
				</div>
				<div>
					<li><div class="infra_img"><div class="dec2"></div><img src="img/infra_img8.jpg" alt=""></div><span>ТРЦ “Красный кит”</span></li>
				</div>
				<div>
					<li><div class="infra_img"><div class="dec1 b_right"></div><img src="img/infra_img9.jpg" alt=""></div><span>Сетевые супермаркеты</span></li>
				</div>
				<div>
					<li><div class="infra_img"><div class="dec1 t_left"></div><img src="img/infra_img7.jpg" alt=""></div><span>ТРЦ “Июнь”</span></li>
				</div>
				<div>
					<li><div class="infra_img"><div class="dec2"></div><img src="img/infra_img8.jpg" alt=""></div><span>ТРЦ “Красный кит”</span></li>
				</div>
				<div>
					<li><div class="infra_img"><div class="dec1 b_right"></div><img src="img/infra_img9.jpg" alt=""></div><span>Сетевые супермаркеты</span></li>
				</div>
			</ul>
			<div class="ks_arrows">
				<div class="ks_left" id="ks_left"></div>
				<div class="appendDots"></div>
				<div class="ks_right" id="ks_right"></div>
			</div>
			<div class="near_inn">
				<div class="i_tit"><span>Рядом множество магазинов, кафе, ледовый каток, <br> несколько торговых центров,</span> в том числе:  </div>
				<div class="near_slid">
					<div> <div class="near_bl"> <img src="img/near_img1.jpg" alt=""> <span>Кинотеатр IMAX</span> </div> </div>
					<div> <div class="near_bl"> <img src="img/near_img2.jpg" alt=""> <span>Салоны красоты</span> </div> </div>
					<div> <div class="near_bl"> <img src="img/near_img3.jpg" alt=""> <span>Супермаркеты</span> </div> </div>
					<div> <div class="near_bl"> <img src="img/near_img1.jpg" alt=""> <span>Кинотеатр IMAX</span> </div> </div>
					<div> <div class="near_bl"> <img src="img/near_img2.jpg" alt=""> <span>Салоны красоты</span> </div> </div>
					<div> <div class="near_bl"> <img src="img/near_img3.jpg" alt=""> <span>Супермаркеты</span> </div> </div>
				</div>
<!--				<a href="#" class="btn_main"><span>Посмотреть инфраструктуру на карте</span></a>-->
			</div>
		</section>
		<section class="forest">
			<div class="tm"><span>Расположен вблизи лесопарков и водоёмов</span> <p>Здесь чистый воздух и столица рядом</p></div>
			<div class="forest_img">
				<img src="img/forest_img.jpg" alt="">
				<div class="forest_dec_text"><span>На территории комплекса будет создана прогулочная зона и<br> благоустроенная набережная вдоль берегов Рупасовских прудов. </span></div>
			</div>
		</section>
		<section class="plan_price" id="plans">
			<div class="tm"><span>Посмотрите планировки и узнайте цены</span></div>
			<div class="plpr_nav">
				<ul class="plans_nav">
					<span>Количество комнат: </span>
					<li data-kol="all" class="act"><div class="plpr_dec"></div><span>Все</span></li>
					<li data-kol="s"><div class="plpr_dec"></div><span><img src="img/stud_dec.jpg" class="stud_dec"> Студии</span></li>
					<li data-kol="1"><div class="plpr_dec"></div><span><img src="img/1komn_dec.png"> 1-ком.</span></li>
					<li data-kol="2"><div class="plpr_dec"></div><span><img src="img/2komn_dec.png"> 2-ком.</span></li>
					<li data-kol="3"><div class="plpr_dec"></div><span><img src="img/3komn_dec.png"> 3-ком.</span></li>
				</ul>
				<div class="plpr_param param_year">
					<span>Сдача в:</span>
					<select>
						<option value="2020">2020 г.</option>
						<option value="2021">2021 г.</option>
						<option value="2022">2022 г.</option>
						<option value="2023">2023 г.</option>
					</select>
				</div>
				<div class="plpr_param param_area">
					<span>Площадь:</span>
					<select>
						<option value="20|40">от 20 до 40 м&sup2</option>
						<option value="40|50">от 40 до 50 м&sup2</option>
						<option value="50|60">от 50 до 60 м&sup2</option>
						<option value="60|70">от 60 до 70 м&sup2</option>
					</select>
				</div>
			</div>
            <div class="plpr_list">
                <?
                @include 'flats_load.php';
                $flats = loadflats();
                ?>
                <ul class="plans_list">
                    <?foreach($flats as $key => $flat){?>
                        <li class="f_<?=$flat['class']?>">
                            <div class="plpr_info">
                                <div class="plpr_info_tit"><?=$flat['title']?></div>
                                <p>Общая площадь: <?=$flat['info']?> м<sup>2</sup></p>
                            </div>
                            <a class="plpt_img" class="show_flat" data-flat="<?=$flat['id']?>"><img class="lazy" data-original="<?=$flat['img_prew']?>"></a>
                            <a href="#" class="plpr_btn show_flat" data-flat="<?=$flat['id']?>">Узнать стоимость</a>
                        </li>
                    <?}?>

                </ul>
                <?if(count($flats) >= 6){?>
                    <a href="#" id="loadflats" data-page="1" class="more_btn">ЕЩЁ</a>
                <?}?>
            </div>
		</section>
		<section class="selection">
			<div class="dec2"></div>
			<div class="tm"><span>Получите подборку свободных квартир <p>по вашим параметрам</p> </span></div>
			<div class="sel_inner">
				<div class="select_in">
					<span class="slid_etaj">На какой бюджет вы рассчитываете?</span>
					<div class="slid"></div>
				</div>
				<form class="form_main">
					<select class="dop-info" data="Сколько человек будет жить в квартире?">
						<option>Сколько человек будет жить в квартире?</option>
						<option>Сколько человек будет жить в квартире?</option>
						<option>Сколько человек будет жить в квартире?</option>
					</select>
					<select class="dop-info" data="Какой способ оплаты будете использовать?">
						<option>Какой способ оплаты будете использовать?</option>
						<option>Какой способ оплаты будете использовать?</option>
						<option>Какой способ оплаты будете использовать?</option>
					</select>
                    <input type="hidden" class="dop-info etag_hidden" date="Этаж" value="">
                    <input type="text" class="input_cl form_name" placeholder="Ваше имя">
                    <input type="text" class="input_cl form_mail" req="y" placeholder="Ваш e-mail">
                    <input type="text" class="input_cl form_phone" req="y" placeholder="Ваш телефон">
					<button class="btn_main lead-btn" celtype="getPodb" template="2">
						<div class="btn_dec"></div>
						<span>Получить подборку квартир</span>
					</button>
				</form>
			</div>
		</section>
		<section class="traffic_jams">
			<div class="tm"><span>Легко добраться до Москвы без пробок</span><p>Находится рядом с Волковским и Ярославским шоссе (удобный выезд на МКАД) </p></div>
			<div class="tj_list">
				<ul class="map_switch">
					<li data-map="car">
						<div class="tj_dec"></div>	
						<div class="tj_tit">На автомобиле</div>
						<div class="tj_img"></div>
						<div class="tj_text">по трассе М4-Дон, Каширскому или<br> Симферопольскому шоссе</div>
					</li>
					<li data-map="bus" class="act">
						<div class="tj_dec"></div>	
						<div class="tj_tit">На маршрутке, автобусе</div>
						<div class="tj_img"></div>
						<div class="tj_text">до станции метро “Домодедовская” <br> (время в пути 30-45 минут). Остановка <br> транспорта в микрорайоне</div>
					</li>
					<li data-map="train">
						<div class="tj_dec"></div>	
						<div class="tj_tit">На электричке:</div>
						<div class="tj_img"></div>
						<div class="tj_text">с Павелецкого вокзала до станции<br> «Взлетная» (до центра столицы  -  50 минут)</div>
					</li>
				</ul>
			</div>
			<div class="tj_list tj_slid">
				<div>
					<div class="tj_in tj_auto">
						<div class="tj_dec"></div>	
						<div class="tj_tit">На автомобиле</div>
						<div class="tj_img"></div>
						<div class="tj_text">по трассе М4-Дон, Каширскому или<br> Симферопольскому шоссе</div>
					</div>
				</div>
				<div>
					<div class="tj_in tj_commuter">
						<div class="tj_dec"></div>	
						<div class="tj_tit">На маршрутке, автобусе</div>
						<div class="tj_img"></div>
						<div class="tj_text">до станции метро “Домодедовская” <br> (время в пути 30-45 минут). Остановка <br> транспорта в микрорайоне</div>
					</div>
				</div>
				<div>
					<div class="tj_in tj_bus">
						<div class="tj_dec"></div>
						<div class="tj_tit">На электричке:</div>
						<div class="tj_img"></div>
						<div class="tj_text">с Павелецкого вокзала до станции<br> «Взлетная» (до центра столицы  -  50 минут)</div>
					</div>
				</div>
			</div>
			<div class="tj_main_map">
				<div data-type="car" id="tj_map" style="width: 100%; height: 100%;"></div>
				<div data-type="bus" id="tj_map2" style="width: 100%; height: 100%; display: none;"></div>
				<div data-type="train" id="tj_map3" style="width: 100%; height: 100%; display: none;"></div>
			</div>
		</section>
		<section class="photogalery" id="photos">
			<div class="tm"><div class="cloud_dec_ph"><img src="img/cloud_dec_ph.png" alt=""></div><span>Фотогалерея комплекса</span></div>
			<div class="dec2"></div>
			<div class="dec2"></div>
			<div class="ph_slider" id="ph_slider">
				<div>
					<div class="ph_inner"><img src="img/ph_img1.jpg"></div>
				</div>
				<div>
					<div class="ph_inner"><img src="img/ph_img1.jpg"></div>
				</div>
				<div>
					<div class="ph_inner"><img src="img/ph_img1.jpg"></div>
				</div>
			</div>
			<div class="ph_size">
				<div class="ph_arrows">
					<div class="ph_left  pg_ar"	id="ph_left"></div>
					<div class="ph_dots"></div>
					<div class="ph_right  pg_ar" id="ph_right"></div>
				</div>
				<div class="pr_btn"><a href="#" class="show_popup" data-popup="presentation_popup">Получить презентацию объекта<br> с ценами и планировками</a></div>
			</div>
		</section>
		<section class="own_infrastructure">
			<div class="tm"><span>Собственная инфраструктура на территории комплекса</span></div>
			<ul class="infra_list own_infra">
				<li><div class="infra_img"><div class="dec1"></div><img src="img/own_infra_img1.jpg" alt=""></div><span>Детский сад</span></li>
				<li><div class="infra_img"><div class="dec2"></div><img src="img/own_infra_img2.jpg" alt=""></div><span>Школа</span></li>
				<li><div class="infra_img"><div class="dec1"></div><img src="img/own_infra_img3.jpg" alt=""></div><span>Детские площадки</p></span></li>
				<li><div class="infra_img"><div class="dec2"></div><img src="img/own_infra_img4.jpg" alt=""></div><span>Спортивные площадки</span></li>
				<li><div class="infra_img"><div class="dec1"></div><img src="img/own_infra_img5.jpg" alt=""></div><span>Подземный паркинг</span></li>
				<li><div class="infra_img"><div class="dec1"></div><img src="img/own_infra_img6.jpg" alt=""></div><span>Индивидуальные кладовые помещения</span></li>
			</ul>
		</section>	
		<section class="how_buy" id="howtobuy">
			<div class="tm"><span> Как можно приобрести ?</span></div>
			<div class="hb_list">
				<ul>
					<li class="ipot_bl">
						<div class="hb_in">
							<div class="hb_tit">Ипотека от 10,5%</div>
							<div class="hb_img"></div>
							<div class="hb_btn"><a href="#" class="show_popup" data-popup="ipoteka_popup">Подробнее</a></div>
						</div>
					</li>
					<li class="rassroch_bl">
						<div class="hb_in">
							<div class="hb_tit">Рассрочка</div>
							<div class="hb_img"></div>
							<div class="hb_btn"><a href="#" class="show_popup" data-popup="rassr_popup">Подробнее</a></div>
						</div>
					</li>
					<li class="matkap_bl">
						<div class="hb_in">
							<div class="hb_tit">Материнский капитал</div>
							<div class="hb_img"></div>
							<div class="hb_btn"><a href="#" class="show_popup" data-popup="matkap_popup">Подробнее</a></div>
						</div>
					</li>
				</ul>
			</div>
		</section>
        <?
        include'includes/hod.php';
        ?>
<!--		<section class="hod_str">-->
<!--			<div class="tm"><span> Ход строительства</span> <p>Срок сдачи - IV кв. 2020 г.</p></div>-->
<!--			<div class="hds_inner">-->
<!--				<div class="hds_slider">-->
<!--					<div class="years_nav">-->
<!--						<a href="#" class="act"><p class="yrs_dec"></p><span>2019</span></a>-->
<!--						<a href="#"><p class="yrs_dec"></p><span>2018</span></a>-->
<!--					</div>-->
<!--					<div class="month_nav">-->
<!--						<ul>-->
<!--							<li class="act"><div class="mn_dec"></div> <span>Декабрь</span></li>-->
<!--							<li><div class="mn_dec"></div> <span>Ноябрь</span></li>-->
<!--							<li><div class="mn_dec"></div> <span>Октябрь</span></li>-->
<!--							<li><div class="mn_dec"></div> <span>Сентябрь</span></li>-->
<!--							<li><div class="mn_dec"></div> <span>Август</span></li>-->
<!--							<li><div class="mn_dec"></div> <span>Июль</span></li>-->
<!--							<li><div class="mn_dec"></div> <span>Июнь</span></li>-->
<!--							<li><div class="mn_dec"></div> <span>Май</span></li>-->
<!--							<li><div class="mn_dec"></div> <span>Апрель</span></li>-->
<!--							<li><div class="mn_dec"></div> <span>Март</span></li>-->
<!--							<li><div class="mn_dec"></div> <span>Февраль</span></li>-->
<!--							<li><div class="mn_dec"></div> <span>Январь</span></li>-->
<!--						</ul>-->
<!--					</div>-->
<!--					<div class="hod_slid" id="hod_slid">-->
<!--						<div>-->
<!--							<div class="hd_in"><img src="img/hds_img1.jpg"></div>-->
<!--						</div>-->
<!--						<div>-->
<!--							<div class="hd_in"><img src="img/hds_img2.jpg"></div>-->
<!--						</div>-->
<!--						<div>-->
<!--							<div class="hd_in"><img src="img/hds_img3.jpg"></div>-->
<!--						</div>-->
<!--						<div>-->
<!--							<div class="hd_in"><img src="img/hds_img4.jpg"></div>-->
<!--						</div>-->
<!--						<div>-->
<!--							<div class="hd_in"><img src="img/hds_img5.jpg"></div>-->
<!--						</div>-->
<!--					</div>-->
<!--					<div class="hd_arrows">-->
<!--						<div class="hd_left  hd_ar"	id="hd_left"></div>-->
<!--						<div class="hd_dots"></div>-->
<!--						<div class="hd_right  hd_ar" id="hd_right"></div>-->
<!--					</div>-->
<!--				</div>-->
<!--			</div>-->
<!--		</section>-->
		<section class="about_developer">
			<div class="tm"><span>О застройщике</span></div>
			<div class="abdv_inn">
				<div class="doc_bl">
					<div class="abdv_dec"></div>
					<div class="doc_inn">
						<img src="img/abdv_logo.png" alt="">
						<div class="doc_tit">Документация</div>
						<ul class="doc_list">
							<li><a href="#"><span>Градостроительные условия</span></a></li>
							<li><a href="#"><span>Проектная документация</span></a></li>
							<li><a href="#"><span>Технические условия</span></a></li>
							<li><a href="#"><span>Градостроительные условия</span></a></li>
							<li><a href="#"><span>Проектная документация</span></a></li>
							<li><a href="#"><span>Технические условия</span></a></li>
						</ul>
					</div>
				</div>
				<div class="abdv_text">
					<p>Девелоперский холдинг.  Занимается реализацией проектов жилищного строительства в Московском регионе с 2011 года. Входит в ТОП-40 застройщиков Московской области.</p> <p>За прошедший период с участием структур ГК «Атлант» реализованы объекты общей площадью более 500 000 кв.м.В портфеле компании проекты на 1 000 000 кв.м. ГК «АТЛАНТ» сотрудничает с ведущими кредитно-финансовыми организациями РФ. </p>
				</div>
			</div>
		</section>
		<section class="contacts" id="contacts">
			<div class="tm"><span>Контакты</span></div>
			<div class="cont_in">
				<div class="cont_bl">
					<img src="img/loc_ico.png">
					<span>г. Москва, ул. Большая Декабрьская, д. 10, стр. 2 <br> Станция метро:  “Улица 1905 года”</span>
				</div>
				<div class="cont_bl">
					<img src="img/cont_phone_ico.png">
					<a href="#">+7 (495) 649-12-12</a>
				</div>
			</div>
			<div class="cont_map">
				<div id="cont_map" style="width: 100%; height: 100%;"></div>
				<div class="quest_bl"><span>Остались <p>вопросы?</p></span> <a href="#" class="btn_main show_popup" data-popup="quest_popup"><span>Задать вопрос</span></a></div>
			</div>
		</section>
		<footer>
			<div class="wmain">
				<div class="f_left">© 2019 Микрорайон "Город Счастья" <br> Все права защищены.</div>
				<div class="f_center">Отправляя любую форму на сайте, вы соглашаетесь с <a href="#">политикой конфиденциальности</a> <br> данного сайта, а также на получение рассылки на электронную почту, указанную в заявке.</div>
				<div class="f_right">Разработка и лидогенерация <br> <a href="#">LEADACTIV</a></div>
			</div>
		</footer>
	</section>
	<!-- end container_main -->

    <?@include 'lrcnt.php';?>
    <?php /*данные для лога действий с форм*/?>
    <div style="display: none;">
        <input type="hidden" id="send_data" value="<?php echo $send_data?>" />
    </div>
    <?if($_REQUEST['utm_source']){?>
        <input type="hidden" id="utm_source" name="utm_source" value="<?=$_REQUEST['utm_source']?>">
    <?}?>
    <?if($_REQUEST['utm_medium']){?>
        <input type="hidden" id="utm_medium" value="<?=$_REQUEST['utm_medium']?>">
    <?}?>
    <?if($_REQUEST['utm_campaign']){?>
        <input type="hidden" id="utm_campaign" value="<?=$_REQUEST['utm_campaign']?>">
    <?}?>
    <?if($_REQUEST['utm_term']){?>
        <input type="hidden" id="utm_term" value="<?=$_REQUEST['utm_term']?>">
    <?}?>
    <?if($_REQUEST['utm_content']){?>
        <input type="hidden" id="utm_content" value="<?=$_REQUEST['utm_content']?>">
    <?}?>
<!-- class for form  ym-record-keys -->
<!-- begin popup_rgba  -->
<div style="display: none;" class="popup_rgba">
	<div class="popup_table">
		<div class="popup_cell">
			
			<!-- pu -->
			<div class="popup_main pu_thx" style="display: none;" id="pu_thx">
				<a href="#" class="closeform"></a>
				<div class="pu_tm"><span>Спасибо</span></div>
				<div class="pu_sub">В ближайшее время с вами свяжется наш специалист</div>
			</div>

			<!-- pu -->
			<div class="popup_main pu_call" style="display: none;" id="call_popup">
				<a href="#" class="closeform"></a>
				<div class="pu_tm"><span>Закажите звонок</span></div>
				<form class="pu_form form_main">					
					<input type="text" class="input_cl form_name" placeholder="Ваше имя">
					<input type="text" class="input_cl form_phone" req="y" placeholder="Ваш телефон">
					<input type="text" class="input_cl form_time dop-info" data="Удобное время для звонка" placeholder="Удобное время для звонка">
                    <input type="hidden" class="text" value="Заказать звонок">
                    <button class="btn_main lead-btn" celtype="getCall" template="1">
						<div class="btn_dec"></div>
						<span>Заказать звонок</span>
					</button>
				</form>
			</div>

			<!-- pu -->
			<div class="popup_main pu_presentation" style="display: none;" id="presentation_popup">
				<a href="#" class="closeform"></a>
				<div class="pu_tm"><span>Получите презентацию объекта</span></div>
				<form class="pu_form form_main">					
					<input type="text" class="input_cl form_name" placeholder="Ваше имя">
					<input type="text" class="input_cl form_mail" req="y" placeholder="Ваш e-mail">
					<input type="text" class="input_cl form_phone" req="y" placeholder="Ваш телефон">
                    <input type="hidden" class="text" value="Получить презентацию объекта">
					<button class="btn_main lead-btn" celtype="getPresentPopup" template="2">
						<div class="btn_dec"></div>
						<span>Получить презентацию</span>
					</button>
				</form>
			</div>

            <!-- pu -->
            <div class="popup_main pu_presentation" style="display: none;" id="matkap_popup">
                <a href="#" class="closeform"></a>
                <div class="pu_tm"><span>Материнский капитал</span></div>
                <form class="pu_form form_main">
                    <input type="text" class="input_cl form_name" placeholder="Ваше имя">
                    <input type="text" class="input_cl form_mail" req="y" placeholder="Ваш e-mail">
                    <input type="text" class="input_cl form_phone" req="y" placeholder="Ваш телефон">
                    <input type="hidden" class="text" value="Материнский капитал">
                    <button class="btn_main lead-btn" celtype="getMatKap" template="2">
                        <div class="btn_dec"></div>
                        <span>Узнать подробнее</span>
                    </button>
                </form>
            </div>


			<!-- pu -->
			<div class="popup_main pu_consultation" style="display: none;" id="pu_consultation">
				<a href="#" class="closeform"></a>
                <div class="pu_tm"><span>Получите консультацию<br> Антонины</span></div>
                <div class="pc_img"><img src="img/manag_img1.jpg"></div>
                <div class="pc_in">
                    <form class="pu_form form_main">
                        <input type="text" class="input_cl form_name" placeholder="Ваше имя">
                        <input type="text" class="input_cl form_phone" placeholder="Ваш телефон">
                        <button class="btn_main>
                            <div class="btn_dec"></div>
                            <span>Получить консультацию</span>
                        </button>
                    </form>
                </div>
                <div class="clr"></div>
			</div>

			<!-- pu -->
			<div class="popup_main pu_calculat" style="display: none;" id="ipoteka_popup">
				<a href="#" class="closeform"></a>
					<div class="pu_tm"><span>Получите расчет ежемесячного<br> платежа по ипотеке</span></div>
				<div class="pc_banks">
					<ul class="bank_list">
						<li><span><img src="img/banks/bank_img1.jpg"></span></li>
						<li><span><img src="img/banks/bank_img2.jpg"></span></li>
						<li><span><img src="img/banks/bank_img3.jpg"></span></li>
						<li><span><img src="img/banks/bank_img4.jpg"></span></li>
						<li><span><img src="img/banks/bank_img5.jpg"></span></li>
						<li><span><img src="img/banks/bank_img6.jpg"></span></li>
						<li><span><img src="img/banks/bank_img7.jpg"></span></li>
						<li><span><img src="img/banks/bank_img8.jpg"></span></li>
						<li><span><img src="img/banks/bank_img9.jpg"></span></li>
						<li><span><img src="img/banks/bank_img10.jpg"></span></li>
						<li><span><img src="img/banks/bank_img11.jpg"></span></li>
						<li><span><img src="img/banks/bank_img12.jpg"></span></li>
						<li><span><img src="img/banks/bank_img13.jpg"></span></li>
						<li><span><img src="img/banks/bank_img14.jpg"></span></li>
						<li><span><img src="img/banks/bank_img15.jpg"></span></li>
						<li><span><img src="img/banks/bank_img16.jpg"></span></li>
					</ul>
				</div>
				<div class="pc_in">
					<form class="pu_form form_main">
						<select class="period form_time dop-info" data="Срок">
							<option>На срок</option>
							<option>5 лет</option>
							<option>10 лет</option>
							<option>15 лет</option>
							<option>20 лет</option>
						</select>
						<select class="vznos form_vznos dop-info" data="Первоначальный взнос">
							<option>Первоначальный взнос</option>
							<option>10%</option>
							<option>20%</option>
							<option>30%</option>
							<option>40%</option>
						</select>					
						<input type="text" class="input_cl form_name" placeholder="Ваше имя">
						<input type="text" class="input_cl form_phone" req="y" placeholder="Ваш телефон">
                        <input type="hidden" class="text" value="Получить рассчет по ипотеке">
						<button class="btn_main lead-btn" celtype="getIpoteka" template="1">
							<div class="btn_dec"></div>
							<span>Получить консультацию</span>
						</button>
					</form>
				</div>
				<div class="clr"></div>
			</div>

            <!-- pu -->
            <div class="popup_main pu_calculat" style="display: none;" id="rassr_popup">
                <a href="#" class="closeform"></a>
                <div class="pu_tm"><span>Получите расчет ежемесячного<br> платежа по рассрочке</span></div>
                <div class="pc_banks">
                    <ul class="bank_list">
                        <li><span><img src="img/banks/bank_img1.jpg"></span></li>
                        <li><span><img src="img/banks/bank_img2.jpg"></span></li>
                        <li><span><img src="img/banks/bank_img3.jpg"></span></li>
                        <li><span><img src="img/banks/bank_img4.jpg"></span></li>
                        <li><span><img src="img/banks/bank_img5.jpg"></span></li>
                        <li><span><img src="img/banks/bank_img6.jpg"></span></li>
                        <li><span><img src="img/banks/bank_img7.jpg"></span></li>
                        <li><span><img src="img/banks/bank_img8.jpg"></span></li>
                        <li><span><img src="img/banks/bank_img9.jpg"></span></li>
                        <li><span><img src="img/banks/bank_img10.jpg"></span></li>
                        <li><span><img src="img/banks/bank_img11.jpg"></span></li>
                        <li><span><img src="img/banks/bank_img12.jpg"></span></li>
                        <li><span><img src="img/banks/bank_img13.jpg"></span></li>
                        <li><span><img src="img/banks/bank_img14.jpg"></span></li>
                        <li><span><img src="img/banks/bank_img15.jpg"></span></li>
                        <li><span><img src="img/banks/bank_img16.jpg"></span></li>
                    </ul>
                </div>
                <div class="pc_in">
                    <form class="pu_form form_main">
                        <select class="period form_time dop-info" data="Срок">
                            <option>На срок</option>
                            <option>5 лет</option>
                            <option>10 лет</option>
                            <option>15 лет</option>
                            <option>20 лет</option>
                        </select>
                        <select class="vznos form_vznos dop-info" data="Первоначальный взнос">
                            <option>Первоначальный взнос</option>
                            <option>10%</option>
                            <option>20%</option>
                            <option>30%</option>
                            <option>40%</option>
                        </select>
                        <input type="text" class="input_cl form_name" placeholder="Ваше имя">
                        <input type="text" class="input_cl form_phone" req="y" placeholder="Ваш телефон">
                        <input type="hidden" class="text" value="Получить рассчет по рассрочке">
                        <button class="btn_main lead-btn" celtype="getRassr" template="1">
                            <div class="btn_dec"></div>
                            <span>Получить консультацию</span>
                        </button>
                    </form>
                </div>
                <div class="clr"></div>
            </div>

            <!-- pu -->
            <div class="popup_main pu_flat" style="display: none;" id="pu_flat">
                <a href="#" class="closeform"></a>
                <div class="pu_tm"><span>Двухкомнатная квартира</span></div>
                <div class="flat_img">
                    <img src="img/flat_img.jpg" alt="">
                </div>
                <div class="fl_in">
                    <p>Общая площадь: <b>73,63 м<sup>2</sup><br> </b> Жилая площадь: <b>43,39 м<sup>2</sup></b></p>
                    <span>Жилые комнаты: 27,64 и 15,75 м<sup>2</sup></span>
                    <span>Кухня: 12,48 м<sup>2</sup></span>
                    <span>Санузел: 2,99 м<sup>2</sup></span>
                    <div class="form_tit">Узнайте стоимость квартиры на сегодня</div>
                    <form class="pu_form form_main">
                        <input type="text" class="input_cl form_name" placeholder="Ваше имя">
                        <input type="text" class="input_cl form_phone" req="y" placeholder="Ваш телефон">
                        <input type="hidden" class="text" value="Двухкомнатная квартира">
                        <button class="btn_main lead-btn" celtype="getPrice" template="1">
                            <div class="btn_dec"></div>
                            <span>Получить консультацию</span>
                        </button>
                    </form>
                </div>
                <div class="clr"></div>
            </div>

			<!-- pu -->
			<div class="popup_main pu_flat" style="display: none;" id="pu_flat_2">
				<a href="#" class="closeform"></a>
				<div class="pu_tm"><span>Двухкомнатная квартира</span></div>
				<div class="flat_img">
					<img src="img/flat_img.jpg" alt="">
				</div>
				<div class="fl_in">
					<p>Общая площадь: <b>73,63 м<sup>2</sup><br> </b> Жилая площадь: <b>43,39 м<sup>2</sup></b></p>
					<span>Жилые комнаты: 27,64 и 15,75 м<sup>2</sup></span>
					<span>Кухня: 12,48 м<sup>2</sup></span>
					<span>Санузел: 2,99 м<sup>2</sup></span>
					<div class="form_tit">Узнайте стоимость квартиры на сегодня</div>
					<form class="pu_form form_main">
						<input type="text" class="input_cl form_name" placeholder="Ваше имя">
						<input type="text" class="input_cl form_phone" req="y" placeholder="Ваш телефон">
                        <input type="hidden" class="text" value="Двухкомнатная квартира">
						<button class="btn_main lead-btn" celtype="getPrice" template="1">
							<div class="btn_dec"></div>
							<span>Получить консультацию</span>
						</button>
					</form>
				</div>
				<div class="clr"></div>
			</div>
		</div>
	</div>
</div>
<!-- end popup_rgba -->


<!-- jq ui -->
<script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="js/jquery.lazyload.min.js"></script>
<script type="text/javascript" src="js/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/sripts_js.js"></script>
<script type="text/javascript" src="js/scripts.js"></script>
<script type="text/javascript" src="js/main.js"></script>
<script type="text/javascript" src="js/jquery.ui.touch-punch.min.js"></script>
<script type="text/javascript" src="js/slick.min_new.js"></script>
<script type="text/javascript" src="js/jquery.mCustomScrollbar.concat.min.js"></script>
<script src="js/jquery.formstyler.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css" />
<script src="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js"></script>
<script>
(function($) {
$(function() {
	$('select').styler({
		fileBrowse: 'Выбрать',
	});
})
})(jQuery)
</script>

<script>
	(function($){
	  $(window).on("load",function(){
	    $(".doc_list").mCustomScrollbar({
	      axis:"y",
	      theme:"dark-3",
	      // advanced:{
	      //   autoExpandHorizontalScroll:true //optional (remove or set to false for non-dynamic/static elements)
	      // }
	    });
	  });
	})(jQuery);
</script>

<script>


	$('.near_slid').slick({
			dots: false,
			infinite: true,
			speed: 700,
			draggable: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: true,
			fade: false,
			responsive: [
		    {
		      breakpoint: 1190,
		      	settings: {
		        	slidesToShow: 1,
		    	}
		    }
		    ]
		});


	$('.tj_slid').slick({
			dots: false,
			infinite: true,
			speed: 700,
			draggable: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			fade: false,
			dots: false,
		});
    $('.tj_slid').on('afterChange', function(event, slick, currentSlide){
        // console.log(currentSlide);
        $('.tj_main_map div').hide();
        $('.tj_main_map').find('div').eq(currentSlide).show();
    });

	$('.prop_slid').slick({
			dots: false,
			infinite: true,
			speed: 700,
			draggable: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: false,
			dots: true,
			appendDots: $('.prop_dots'),
		});
	$('#pr_right').click(function(){
		     $('#prop_slid').slick('slickNext');
		   	return false;
		});

	$('#pr_left').click(function(){
		    $('#prop_slid').slick('slickPrev');
		   return false;
		});


	$('.kommerc_infra').slick({
			dots: false,
			infinite: true,
			speed: 700,
			draggable: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: false,
			fade: false,
			dots: true,
			appendDots: $('.appendDots'),
			responsive: [
		    {
		      breakpoint: 1190,
		      	settings: {
		        	slidesToShow: 1,
		    	}
		    }
		    ]
		});
	$('#ks_right').click(function(){
		     $('#kommerc_slid').slick('slickNext');
		   	return false;
		});

	$('#ks_left').click(function(){
		    $('#kommerc_slid').slick('slickPrev');
		   return false;
		});


	$('.hod_slid').slick({
			dots: true,
			infinite: true,
			speed: 700,
			slidesToShow: 3,
			slidesToScroll: 1,
			variableWidth: true,
			arrows: false,
			appendDots: $('.hd_dots'),
			fade: false,
			responsive: [
		    {
		      breakpoint: 1190,
		      	settings: {
		        	slidesToShow: 1,
		        	slidesToScroll: 1,
					variableWidth: false,
		    	}
		    }
		    ]
		});
	$('#hd_right').click(function(){
		     $('#hod_slid').slick('slickNext');
		   	return false;
		});

	$('#hd_left').click(function(){
		    $('#hod_slid').slick('slickPrev');
		   return false;
		});


	$('.ph_slider').slick({
			dots: true,
			infinite: true,
			speed: 700,
			draggable: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			appendDots: $('.ph_dots'),
			fade: false,
		});
	$('#ph_right').click(function(){
		     $('#ph_slider').slick('slickNext');
		   	return false;
		});

	$('#ph_left').click(function(){
		    $('#ph_slider').slick('slickPrev');
		   return false;
		});




	// $( ".slid" ).slider({
	//     // orientation: "vertical",
	//     animate: true,
	//     range: true,
	//     draggable: true,
	//     values: [ 3, 16],
	//     min: 2,
	//     max: 17,
	//     step: 1,
	// 	    //Получаем значение и выводим его на странице
	// 	    slide: function( event, ui ) {
	// 	        // $( ".ui-slider-handle" ).html( ui.value );
	// 	        $( ".ui-slider-handle" ).html( ui.values[ 0 ] );
	// 	        $( ".ui-slider-handle:eq(1)" ).html( ui.values[ 1 ] );
	// 	        $(".slid_etaj").html("Выберите этаж: с " + ui.values[0] + " по " + ui.values[1]);
	//         	$("#hidden1").val("С " + ui.values[0] + " по " + ui.values[1]);
	// 	    },

	// 	     create: function(event, ui) {
	// 	        $( ".ui-slider-handle" ).html($( ".slid" ).slider( "values", 0 )  );
	// 	        $( ".ui-slider-handle:eq(1)" ).html( $( ".slid" ).slider( "values", 1 )  );
	// 	     },

	// 	    //обновляем скрытое поле формы, так что можно передать данные с помощью формы
	// 	    change: function(event, ui) { 
	// 	        $("#hidden1").val("С " + ui.values[0] + " по " + ui.values[1]);
	// 	    }
	// 	});



	$( ".slid" ).slider({
	    // orientation: "vertical",
	    animate: true,
	    range: "min",
	    value: 5,
	    min: 1,
	    max: 10,
	    step: 1,
	    
		    slide: function( event, ui ) {
		        $(".slid .ui-slider-handle").html('до ' + ui.value + ' млн. руб.' );
		        $('.etag_hidden').val('до ' + ui.value + ' млн. руб.');
		    },
		     create: function(event, ui) {
   				 $( ".slid .ui-slider-handle" ).text('до ' + $( ".slid" ).slider( "value") + ' млн. руб.');
                 $('.etag_hidden').val('до ' + $( ".slid" ).slider( "value") + ' млн. руб.');
		     },		 
		});


	</script>
<!-- Карта  -->
<!-- <script src="http://api-maps.yandex.ru/2.0/?load=package.full&lang=ru-RU" type="text/javascript"></script> -->
<script src="http://api-maps.yandex.ru/2.1/?load=package.full&lang=ru-RU" type="text/javascript"></script>

<script type="text/javascript">
var myMap;
    ymaps.ready(init);

    function init () {
        myMap = new ymaps.Map('tj_map', {
            center:[55.835223, 37.617011],
            zoom:11,
            controls: []
        });
        var zoomControl = new ymaps.control.ZoomControl({options: { position: { right: 30, top: 20 }}}); 
		myMap.controls.add(zoomControl);



  //       myMap1.controls.add(new ymaps.control.ZoomControl());
		// myMap1.controls.add(new ymaps.control.MapTools());
		// myMap1.controls.add('scaleLine');
		// myMap1.controls.add('typeSelector');

		 // MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
			// 	'<div class="mp_ico_plashka">'+
			// 		'$[[options.contentLayout observeSize minWidth=135 maxWidth=235 maxHeight=350]]' +
			// 	'</div>'`
	  //    );

	  //    BalloonContentLayout1 = ymaps.templateLayoutFactory.createClass(
			// 		'<div class="mip_title">'+
			// 			'<span>'+
			// 			'{{properties.name}}'+
			// 			'</span>'+
			// 			'<div class="mip_span">'+
			// 			'{{properties.span}}'+
			// 			'</div>'+						
			// 		'</div>'

   //      );
        
        myMap.behaviors.disable('scrollZoom');
    }

     </script>
<script type="text/javascript">
var myMap1;
    ymaps.ready(init);

    function init () {
        myMap1 = new ymaps.Map('cont_map', {
            center:[55.388215, 37.779965],
            zoom:16,
            controls: []
        });
        var zoomControl = new ymaps.control.ZoomControl({options: { position: { right: 30, top: 20 }}}); 
		myMap1.controls.add(zoomControl);



  //       myMap1.controls.add(new ymaps.control.ZoomControl());
		// myMap1.controls.add(new ymaps.control.MapTools());
		// myMap1.controls.add('scaleLine');
		// myMap1.controls.add('typeSelector');

		 // MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
			// 	'<div class="mp_ico_plashka">'+
			// 		'$[[options.contentLayout observeSize minWidth=135 maxWidth=235 maxHeight=350]]' +
			// 	'</div>'`
	  //    );

	  //    BalloonContentLayout1 = ymaps.templateLayoutFactory.createClass(
			// 		'<div class="mip_title">'+
			// 			'<span>'+
			// 			'{{properties.name}}'+
			// 			'</span>'+
			// 			'<div class="mip_span">'+
			// 			'{{properties.span}}'+
			// 			'</div>'+						
			// 		'</div>'

   //      );
        
        placemark = new ymaps.Placemark([55.388215, 37.779965], {},
        {
        	iconLayout: 'default#image',
    	    hideIconOnBalloonOpen : false,
            iconImageSize: [54, 49],
            iconImageOffset: [-27, -49],
            cursor: 'default',
            iconShadow: true,
            iconImageHref: 'img/logo_map1.png',
            balloonclose: true,
        });


        myMap1.geoObjects.add(placemark);
        myMap1.behaviors.disable('scrollZoom');
    }

     </script>
<!--VK script -->
<script type="text/javascript">!function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://vk.com/js/api/openapi.js?162",t.onload=function(){VK.Retargeting.Init("VK-RTRG-409811-6vyuJ"),VK.Retargeting.Hit()},document.head.appendChild(t)}();</script><noscript><img src="https://vk.com/rtrg?p=VK-RTRG-409811-6vyuJ" style="position:fixed; left:-999px;" alt=""/></noscript>
<!--End of VK script -->
<!-- Rating Mail.ru counter -->
<script type="text/javascript">
var _tmr = window._tmr || (window._tmr = []);
_tmr.push({id: "3141834", type: "pageView", start: (new Date()).getTime(), pid: "USER_ID"});
(function (d, w, id) {
  if (d.getElementById(id)) return;
  var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
  ts.src = "https://top-fwz1.mail.ru/js/code.js";
  var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
  if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
})(document, window, "topmailru-code");
</script><noscript><div>
<img src="https://top-fwz1.mail.ru/counter?id=3141834;js=na" style="border:0;position:absolute;left:-9999px;" alt="Top.Mail.Ru" />
</div></noscript>
<!-- //Rating Mail.ru counter -->
<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(55546963, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/55546963" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
</body>
</html>