<? if ($_REQUEST["moderate"] == "y" || file_exists("moderate")) {
	include $_SERVER["DOCUMENT_ROOT"] . "/local/lp/template_moderation/index.php";
	if (!file_exists("moderate")) {
		file_put_contents("moderate", "");
	}
	die();
}
if ($_REQUEST["clear"] == "y")
	include "sys/compress.php";
include "sys/main.php";



if ($arResult["k_titles"] == "")
	$arResult["k_titles"] = [
		"297209" => "Квартиры на стадии котлована в новостройках #CITY#"
	];



if ($_REQUEST["city"] == "msk" or $_REQUEST["city"] == "www") {
	$arResult["k_titles"]["901002"] = "Элитные квартиры в Центре Москвы";
	$arResult["k_titles"]["901001"] = "Элитные новостройки в Центре Москвы";
}



if ($_REQUEST["city"] == "novosibirsk") {
	$arResult["k_titles"]["261640"] = "Новостройки эконом-класса в Новосибирске";
}


if ($_REQUEST["city"] == "izhevsk") {

	$arResult["k_titles"]["261648"] = "1-комнатные квартиры в новостройках Ижевска";
	$arResult["k_titles"]["261649"] = "2-комнатные квартиры в новостройках Ижевска";
	$arResult["k_titles"]["261653"] = "3-комнатные квартиры в новостройках Ижевска";
	$arResult["k_titles"]["261652"] = "Дешевые квартиры в новостройках Ижевска";
	$arResult["k_titles"]["901010"] = "Евродвушки в новостройках Ижевска";
	$arResult["k_titles"]["261646"] = "Недорогие квартиры в новостройках Ижевска";
	$arResult["k_titles"]["261567"] = "Квартиры в новостройках Ижевска";
	$arResult["k_titles"]["261650"] = "Квартиры с отделкой в новостройках Ижевска";
	$arResult["k_titles"]["261654"] = "Квартиры-студии в новостройках Ижевска";
	$arResult["k_titles"]["297209"] = "Квартиры на стадии котлована в новостройках Ижевска";
}





if ($arResult["titleParams"] == "")
	$arResult["titleParams"] =	[
		"text" => "Сервис по подбору квартир - более <span>50 000</span> предложений!",
		"info" => [
			"- ипотека от 6,1%",
			"- квартиры с отделкой и без",
			"- акции, скидки, спецпредложения",
		],

		"bt_text" => "Начать быстрый поиск",

	];


$c_n = md5($arResult["city_code"]);
if ($arResult["is_loc"])
	$c_n = md5($arResult["city_code"] . "_" . $arResult["LOC_CODE"]);


if ($arResult["k"] != "")
	$c_n = md5($arResult["city_code"] . "_" . $arResult["k"]);

$c_path = $_SERVER["DOCUMENT_ROOT"] . "/cache/" . $_SERVER["SERVER_NAME"] . "/" . $arResult["city_code"] . "/index_" . $c_n . ".php";


if (!file_exists($c_path) or true) :

	if (!file_exists($_SERVER["DOCUMENT_ROOT"] . "/cache/" . $_SERVER["SERVER_NAME"] . "/"))
		mkdir($_SERVER["DOCUMENT_ROOT"] . "/cache/" . $_SERVER["SERVER_NAME"] . "/", 0777);


	if (!file_exists($_SERVER["DOCUMENT_ROOT"] . "/cache/" . $_SERVER["SERVER_NAME"] . "/" . $arResult["city_code"] . "/"))
		mkdir($_SERVER["DOCUMENT_ROOT"] . "/cache/" . $_SERVER["SERVER_NAME"] . "/" . $arResult["city_code"] . "/", 0777);



	$arResult["CITY"] = GetSite($arResult["city_code"], $bd);

	if ($_REQUEST["tl"] == "a") {
		$arResult["CITY"]["NAME_P"] = "Адлере";
		$arResult["CITY"]["NAME"] = "Адлер";
	}


	$not_predl_city['spb'] = [
		"261648" => true,
		"261649" => true,
		"261653" => true,
		"261652" => true,
		"297209" => true,
		"261646" => true,
		"261567" => true,
		"261650" => true,
		"261654" => true,
		"901010" => true,
	];




	$cit_pr = ' в ';



	if ($not_predl_city[$_REQUEST["city"]][$_REQUEST["k"]] === true)
		$cit_pr = ' ';

	if ($arResult["is_loc"]) {


		if (isset($arResult["loc_titles"][$arResult["LOC_CODE"]])) {
			$arResult['H1'] =  $arResult["loc_titles"][$arResult["LOC_CODE"]];

			$raion['BD_ID']  = $arResult["LOC_CODE"];
			$raion['TYPE'] = "raion";
			$raion['ID']  = $arResult["LOC_CODE"];
			$raion['CODE'] = $arResult["LOC_CODE"];
			$raion['LOC_TITLE'] =  $arResult["loc_titles"][$arResult["LOC_CODE"]];
		} else {
			$raion = GetLocByCode($arResult["LOC_CODE"], $arResult["city_code"], $bd);


			$LOC_TITLE = $raion['LOC_TITLE'];

			if ($raion["TYPE"] == "metro") {
				//$LOC_TITLE = '<img src="/local/lp/quiz_n20/img/gp_ico.png" alt="">'.str_replace("метро", "", $raion['LOC_TITLE']);
				$pr = 'у';
			}

			if (
				$raion["TYPE"] == "raion" or
				$raion["TYPE"] == "okryg" or
				$raion["TYPE"] == "mkra_" or
				$raion["TYPE"] == "per" or
				$raion["TYPE"] == "mkra" or
				$raion["TYPE"] == "city" or
				$raion["TYPE"] == "4" or
				$raion["TYPE"] == "5" or
				$raion["TYPE"] == "2" or
				$raion["TYPE"] == "per_"
			)
				$pr = " в ";


			if (
				$raion["TYPE"] == "ulica" or
				$raion["TYPE"] == "1" or
				$raion["TYPE"] == "shos" or
				$raion["TYPE"] == "pr_" or
				$raion["TYPE"] == "pr"  or
				$raion["TYPE"] == "3"  or
				$raion["TYPE"] == "bylvars"
			)
				$pr = " на ";
			if (strpos($raion['LOC_TITLE'], "улице") !== false)
				$pr = " на ";

			$LOC_TITLE = trim($LOC_TITLE);
			$LOC_TITLE = str_replace("метро ", "метро<br/>", $LOC_TITLE);
			$LOC_TITLE = str_replace("улице ", "улице<br/>", $LOC_TITLE);
			$LOC_TITLE = str_replace("районе ", "районе<br/>", $LOC_TITLE);
			//$raion['NOT_CITY'] = "1";

			if ($raion['NOT_CITY'] != "1") {
				$raion['H1'] = $pr . ' ' . $LOC_TITLE . $cit_pr . $arResult["CITY"]["NAME_P"];;
			} else {
				$raion['H1'] = $pr . '  ' . $LOC_TITLE . '';
			}


			if ($raion["TYPE"] == "city")
				$raion["TYPE"] = "citys";

			if ($raion["TYPE"] == "1")
				$raion["TYPE"] = "streets";

			if ($raion["TYPE"] == "metro")
				$raion["TYPE"] = "metro";

			if ($raion["TYPE"] == "ulica")
				$raion["TYPE"] = "streets";


			if ($raion["TYPE"] == "raion")
				$raion["TYPE"] = "raions";


			if ($raion["TYPE"] == "")
				$raion["TYPE"] = "raions";

			$arResult['H1'] =  "Квартиры " . $raion['H1'];

			if ($raion['NOT_CITY'] != "1") {
				$arResult['title'] = "Квартиры " . $pr . ' ' . $raion["LOC_TITLE"] . $cit_pr . $arResult["CITY"]["NAME_P"];;
			} else {
				$arResult['title'] = "Квартиры " . $pr . ' ' . $raion["LOC_TITLE"];
			}
		}
	} else {
		$File = $_SERVER["DOCUMENT_ROOT"] . "/local/lp/sys/AllKw.dat";
		$r = json_decode(file_get_contents($File));
		$d = array();
		$arResult['AllKw'] = array();

		foreach ($r as $key => $value) {
			if (count($d) == 0)
				$d = $value;
			if ($key == $arResult['k']) {
				$arResult['AllKw'] = $value;
				break;
			}
		}

		if (count($arResult['AllKw']) == 0)
			$arResult['AllKw'] = $d;

		$tt =  $arResult['AllKw']->TTTLE_LS;
		if ($_REQUEST["utm_source"] == "yandex_rsy")
			$tt =  $arResult['AllKw']->TTTLE_LR;




		$arResult['H1'] =  str_replace("#CITY#", ltrim($cit_pr) . $arResult["CITY"]["NAME_P"], $tt);

		$arResult['title'] =  str_replace("#CITY#", $cit_pr . $arResult["CITY"]["NAME_P"], $tt);
	}

	/*
if(strpos($arResult['H1'], "новостройка") === false and strpos(" ".$arResult['H1'], " дом") === false and !in_array($_REQUEST["k"], $arResult["k_ids"]) and !isset($arResult["k_H1"][$_REQUEST['k']])){
	$arResult['H1'] = str_replace("Квартиры", "Новостройки", $arResult['H1']);
	$arResult['H1'] = str_replace("квартиры", "новостройки", $arResult['H1']); 	
}
 
if(isset($arResult["k_H1"][$_REQUEST['k']])){
	$arResult['H1'] = $arResult["k_H1"][$_REQUEST['k']];
}

$arResult['H1'] =  str_replace("#CITY#", "в ".$arResult["CITY"]["NAME_P"], $arResult['H1']);

$arResult['H1'] = str_replace("Санкт-Петербурге", "СПб", $arResult['H1']);
*/

	if ($arResult["title_vtor"]) {



		if ($arResult["is_loc"]) {
			$arResult['H1'] = str_replace("Квартиры", "Вторичное жилье", $arResult['H1']);
			$arResult['H1'] = str_replace("квартиры", "вторичное жилье", $arResult['H1']);
		}
	} else {
		if (strpos($arResult['H1'], "новостройка") === false and strpos(" " . $arResult['H1'], " дом") === false and !in_array($_REQUEST["k"], $arResult["k_ids"]) and !isset($arResult["k_H1"][$_REQUEST['k']])) {
			$arResult['H1'] = str_replace("Квартиры", "Новостройки", $arResult['H1']);
			$arResult['H1'] = str_replace("квартиры", "новостройки", $arResult['H1']);
		}

		if (isset($arResult["k_H1"][$_REQUEST['k']])) {
			$arResult['H1'] = $arResult["k_H1"][$_REQUEST['k']];
		}


		$arResult['H1'] =  str_replace("#CITY#", ltrim($cit_pr) . $arResult["CITY"]["NAME_P"], $arResult['H1']);
	}


	if (isset($arResult["k_titles"][$_REQUEST['k']])) {
		$arResult['H1'] = $arResult["k_titles"][$_REQUEST['k']];


		$arResult['H1'] =  str_replace("#CITY#", ltrim($cit_pr) . $arResult["CITY"]["NAME_P"], $arResult['H1']);
	}







	if ($_REQUEST["k"] == "m") {
		$arResult["H1"] = "Квартиры в новостройках у моря в " . $arResult["CITY"]["NAME_P"];
	}
	$arResult['H1'] = str_replace("Санкт-Петербурге", "СПб", $arResult['H1']);
	if ($_REQUEST['tl'] == "a") {
		$arResult["is_loc"] = true;
	}



	$titles =	[
		"text" => "Более 30 000 предложений от застройщиков, подрядчиков <br> и агентств недвижимости",
		"info" => [
			"- готовые и строящиеся",
			"- с отделкой и без",
			"- акции, скидки, спецпредложения",
		],

		"bt_text" => "Начать поиск квартиры",

	];

	if (isset($arResult["titles"][$_REQUEST["k"]]))
		$titles = $arResult["titles"][$_REQUEST["k"]];

	if (count($arResult["titleParams"]) > 0)
		$titles = $arResult["titleParams"];


	if (strpos($arResult["H1"], "Крестовском острове") !== false)
		$arResult["H1"] = "Новостройки на Крестовском острове в СПБ";


	$krdList = [
		"261648" => true,
		"261649" => true,
		"261653" => true,
		"261652" => true,
		"901010" => true,
		"261646" => true,
		"261567" => true,
		"261650" => true,
		"261654" => true,
		"297209" => true
	];

	if ($_REQUEST["city"] == "krd" and $krdList[$_REQUEST["k"]])
		$arResult["H1"] = str_replace("в Краснодаре", "Краснодара", $arResult["H1"]);

	ob_start();
	//для установки общих счетчиков по городу
	include $_SERVER["DOCUMENT_ROOT"] . "/local/lp/sys/cityCounters.php";
?>
	<!DOCTYPE html>
	<html>

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<? if (isset($settings["meta"])) { ?>
			<meta name="<?= $settings["meta"]["name"] ?>" content="<?= $settings["meta"]["content"] ?>" />
		<? } ?>
		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">

		<? if ($arResult["new_analitik_id"] != '' and $arResult["new_analitik_id"] != "N") : ?>
			<!-- Google Tag Manager -->
			<script>
				(function(w, d, s, l, i) {
					w[l] = w[l] || [];
					w[l].push({
						'gtm.start': new Date().getTime(),
						event: 'gtm.js'
					});
					var f = d.getElementsByTagName(s)[0],
						j = d.createElement(s),
						dl = l != 'dataLayer' ? '&l=' + l : '';
					j.async = true;
					j.src =
						'https://www.googletagmanager.com/gtm.js?id=<?= $arResult["new_analitik_id"]; ?>' + i + dl;
					f.parentNode.insertBefore(j, f);
				})(window, document, 'script', 'dataLayer', '<?= $arResult["new_analitik_id"]; ?>');
			</script>
			<!-- End Google Tag Manager -->
		<? endif; ?>
		<?
		if (isset($settings["new_title"]) && strpos($arResult['H1'], "метро") !== false) {
			$arResult['title'] = $arResult['title'] . ". " . str_replace("<br/>", " ", $arResult['H1']);
		} else if (isset($settings["new_title"]) && strpos($arResult['H1'], "район") !== false) {
			$arResult['title'] = str_replace("<br/>", " ", $arResult['H1']) . ". " . $arResult['title'];
		}
		?>
		<title><?= $arResult['title']; ?></title>
		<link href="https://fonts.googleapis.com/css?family=Nunito:400,600&display=swap" rel="stylesheet">

		<!-- <style type="text/css"><? include "min/style_min.css" ?></style> -->
		<style type="text/css">
			<? include "css/style.css" ?>
		</style>
		<script type="text/javascript">
			function setCookie(name, value, days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				var expires = "; expires=" + date.toGMTString();
				document.cookie = name + "=" + value + expires + ";path=/";
			}

			function getParam(p) {
				var match = RegExp('[?&]' + p + '=([^&]*)').exec(window.location.search);
				return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
			}
			var yclid = getParam('yclid');
			if (yclid) {
				setCookie('yclid', yclid, 90);
			}
		</script>
		<? if ($settings["qoopler"] == "Y" || $settings['wantresult'] == 'Y') { ?>
			<script type="text/javascript">
				(function(d, w) {
					var n = d.getElementsByTagName("script")[0],
						s = d.createElement("script");
					s.type = "text/javascript";
					s.async = true;
					s.src = "https://qoopler.ru/index.php?ref=" + d.referrer + "&page=" + encodeURIComponent(w.location.href);
					n.parentNode.insertBefore(s, n);
				})(document, window);
			</script>
		<? } ?>

		<script type="text/javascript">
			var set_showPhoneForm = false;
			<? if ($arResult["set_showPhoneForm"]) echo " set_showPhoneForm = true; "; ?>
			var jk_id;
			var kv_type = '';
			var AMO_ID = false;
			<? if (intval($arResult["AMO_ID"]) > 0) echo " AMO_ID = '" . $arResult["AMO_ID"] . "';" ?>
			var is_location = false;
			<? if ($arResult["is_loc"]) echo " is_location = true;" ?>
			var no_phone = false;
			<? if ($arResult["no_phone"]) echo "no_phone = true;"; ?>
			var no_sda4a = false;
			<? if ($arResult["no_sda4a"]) echo "no_sda4a = true;"; ?>
			var no_jk = false;
			<? if ($arResult["no_jk"]) echo "no_jk = true;"; ?>
			var sms_conf = false;
			<? if ($arResult['sms_conf'])  echo "sms_conf = true;"; ?>
			var sms_code = false;
			<? if ($arResult['sms_code'])  echo "sms_code = true;"; ?>
			var use_ch = false;
			<? if ($arResult['use_ch'])  echo "use_ch = true;"; ?>
			var send_type = "";
			<? if ($arResult['send_type'] != "")   echo " send_type = '" . $arResult["send_type"] . "';" ?>
			var no_set_price = false;
			<? if ($arResult['no_set_price'])  echo "no_set_price = true;"; ?>
			var jk_filter = "";
			<? if ($arResult['jk_filter'] != "")  echo " jk_filter = '" . $arResult["jk_filter"] . "';" ?>
			var no_price = "";
			<? if ($arResult['no_price'] != "")  echo " no_price = '" . $arResult["no_price"] . "';" ?>
			var ch_phone = "Y";
			var use_messegers = false;
			<? if ($arResult['use_messegers'])  echo "use_messegers = true;"; ?>
			var lp_name = ''; //punycode.ToUnicode(window.location.hostname);
			var dop_filtrs = '';
			var is_biz = "0";
			var min_price = 0;
			<? if ($settings['min_price'] != "")  echo " min_price = " . $settings["min_price"] . ";" ?>
			<? if ($_REQUEST["k"] == "901004") echo "dop_filtrs = '&class[]=Бизнес&class[]=Элит&class[]=Премиум'; is_biz = '1';"; ?>


			var max_price = 0;
			var price_type = 'do';

			var use_evro = false;
			<? if ($_REQUEST["k"] == "901010") echo "use_evro = true"; ?>

			<?
			if (strpos($_REQUEST["utm_medium"], "cpc_ot_") !== false) :
				$t = explode("cpc_ot_", $_REQUEST["utm_medium"]);
				$p =  floatval(trim(preg_replace('/[^0-9,]/', '', $t['1'])));
				if ($p > 0) :
					$p = $p * 1000000; ?>
					min_price = <?= $p; ?>;
					price_type = 'ot';
				<? endif; ?>
			<? endif; ?>

			<? if (strpos($_REQUEST["utm_medium"], "cpc_do_") !== false) :
				$t = explode("cpc_do_", $_REQUEST["utm_medium"]);
				$p =  floatval(trim(preg_replace('/[^0-9,]/', '', $t['1'])));
				if ($p > 0) :
					$p = $p * 1000000; ?>
					max_price = <?= $p; ?>;
				<? endif; ?>
			<? endif; ?>
			var use_metro = 0;

			<? if ($_REQUEST["vl"] == "m" or $_REQUEST["k"] == "997003") : ?>
				use_metro = 1;
			<? endif; ?>

			var set_bd = false;

			<? if ($arResult["bdName"] == "" or $arResult["bdName"] == "test" or $arResult["bdName"] == "dev" or count($arResult['integr']) <= 0) : ?>
				set_bd = true;
			<? endif; ?>


			<?
			$h = strtolower($arResult["H1"]);

			if (strpos($h, "евродвушки") !== false or $_REQUEST["k"] == "901010")
				echo "  kv_type = '6'; ";
			?>
		</script>
		<script type="text/javascript">
			var not_cods = false;
			not_cods = '<?= json_encode($arResult["not_cods"]); ?>';
			not_cods = JSON.parse(not_cods);
		</script>
		<script type="text/javascript">
			function loadQuiz() {
				if ($(".btn_main").hasClass("load"))
					return false;
				$(".preloader").css("opacity", "0.8");
				$(".btn_main").addClass("load");
				$(".preloader").css("display", "block");
				$.ajax({
					type: "GET",
					url: "/local/lp/quiz_n20/quiz.php?city=<?= $_REQUEST['city']; ?>&loc_code=<?= $arResult['LOC_CODE']; ?>&act=qLoad&k=<?= $_REQUEST['k']; ?>&lt=<?= $_REQUEST['tl']; ?>&use_metro=" + use_metro + "&is_biz=" + is_biz + "&use_evro=" + use_evro + "&kv_type=" + kv_type,
					success: function(html) {
						$(".sect_wm").html(html);
						$(".data_step").removeClass('act');
						$(this).parents(".data_step").addClass('viewed');

						if (is_location)
							$('#roomStep').addClass("act");
						else
							$('#locStep').addClass("act");
						$(".preloader").css("opacity", "1");
						$(".preloader").css("display", "none");
					}
				});
				return false;
			}
		</script>


	</head>

	<body>
		<div class="preloader" style="display: none;">
			<div class="preloader__row">
				<div class="preloader__item"></div>
				<div class="preloader__item"></div>
			</div>
		</div>

		<section class="container_main">

			<section class="main_wm h100">
				<div class="sect_wm">

					<div class="data_step main_page act" id="main_page">
						<div class="m_subtit"> <?= $titles["text"]; ?> </div>
						<h1 class="<?= $arResult["LOC_CODE"]; ?>"><?= $arResult["H1"]; ?></h1>
						<div class="m_list">
							<? foreach ($titles["info"] as $key => $title) : ?>
								<span> <?= $title; ?></span>
							<? endforeach; ?>
						</div>
						<a href="#" class="btn_main fixed_btn step_btn" onclick="loadQuiz(); return false;" data-next-step="district_step"><?= $titles["bt_text"]; ?></a>


						<? if ($settings["setLg"]) : ?>
							<div style="color: #FFF;float: right;position: relative;display: inline-block;margin-top: 50px;">
								ООО "Лидген"
								<a href="tel:78006005523" style="color: #FFF;text-decoration: none;">8-800-600-55-23</a>
							</div>
						<? endif; ?>

					</div>

				</div>
				<div class="step_dec"></div>
				<? include $_SERVER["DOCUMENT_ROOT"] . "/local/lp/sys/footer-addr.php";
				if ($info != "") {
				?>
					<footer>
						<div class="footer_wm">
							<div class="fl"><?= $info["lico"] ?>, <br><?= $info["adress"] ?></div>
							<div class="fr"><a href="tel:78006005523">8-800-600-55-23</a></div>
						</div>
					</footer>
				<? } ?>
			</section>
		</section>

		<?
		$arResult["kv_set"]  = '';
		$g = strtolower($arResult["H1"]);
		if (strpos($g, "1-комнатные") !== false or strpos($g, "однокомнатные") !== false)
			$arResult["kv_set"] = "1komn";
		if (strpos($g, "2-комн") !== false)
			$arResult["kv_set"] = "2komn";
		if (strpos($g, "3-комн") !== false)
			$arResult["kv_set"] = "3komn";
		if (strpos($g, "4-комн") !== false)
			$arResult["kv_set"] = "4komn";

		if (strpos($g, "квартиры-студии") !== false or strpos($g, "студии") !== false)
			$arResult["kv_set"] = "stud";

		if (strpos($g, "евродвушки") !== false)
			$arResult["kv_set"] = "6komn";

		if (strpos($g, "евротрешки") !== false)
			$arResult["kv_set"] = "7komn";

		?>

		<script type="text/javascript">
			var kv_set = '';
			<? if ($arResult["kv_set"] != "") : ?>

				kv_set = '<?= $arResult["kv_set"]; ?>';

			<? endif; ?>
		</script>

		<? if ($settings['roistat'] = 'Y') : ?>
			<script>
				(function(w, d, s, h, id) {
					w.roistatProjectId = id;
					w.roistatHost = h;
					var p = d.location.protocol == "https:" ? "https://" : "http://";
					var u = /^.*roistat_visit=[^;]+(.*)?$/.test(d.cookie) ? "/dist/module.js" : "/api/site/1.0/" + id + "/init";
					var js = d.createElement(s);
					js.charset = "UTF-8";
					js.async = 1;
					js.src = p + h + u;
					var js2 = d.getElementsByTagName(s)[0];
					js2.parentNode.insertBefore(js, js2);
				})(window, document, 'script', 'cloud.roistat.com', '<?= $arResult['ROISTAT']; ?>');
			</script>
		<? endif; ?>


		<? if (!isset($settings["gtag_set"])) { ?>
			<? if ($arResult["analitik_id"] != "" and $arResult["analitik_id"] != "N") : ?>
				<script async src="https://www.googletagmanager.com/gtag/js?id=<?= $arResult["analitik_id"]; ?>"></script>
				<script>
					window.dataLayer = window.dataLayer || [];

					function gtag() {
						dataLayer.push(arguments);
					}
					gtag('js', new Date());
					gtag('config', '<?= $arResult["analitik_id"]; ?>');
				</script>
			<? endif; ?>
		<? } ?>

		<? if ($arResult["gtag_old"] !== '' and $arResult["gtag_old"] != "N") : ?>
			<script async src="https://www.googletagmanager.com/gtag/js?id=<?= $arResult["gtag_old"]; ?>"></script>
			<script>
				window.dataLayer = window.dataLayer || [];

				function gtag() {
					dataLayer.push(arguments);
				}
				gtag('js', new Date());
				gtag('config', '<?= $arResult["gtag_old"]; ?>');
			</script>
		<? endif; ?>

		<? if (intval($arResult["metrika_id"]) > 0) : ?>
			<!-- Yandex.Metrika counter -->
			<script type="text/javascript">
				(function(m, e, t, r, i, k, a) {
					m[i] = m[i] || function() {
						(m[i].a = m[i].a || []).push(arguments)
					};
					m[i].l = 1 * new Date();
					k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
				})
				(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

				ym(<?= $arResult["metrika_id"]; ?>, "init", {
					clickmap: true,
					trackLinks: true,
					accurateTrackBounce: true,
					webvisor: true
				});

				ym(<?= $arResult["metrika_id"]; ?>, 'getClientID', function(clientID) {
					document.getElementById('clientID').value = clientID;
				});
			</script>
			<noscript>
				<div><img src="https://mc.yandex.ru/watch/<?= $arResult["metrika_id"]; ?>" style="position:absolute; left:-9999px;" alt="" /></div>
			</noscript>
			<!-- /Yandex.Metrika counter -->
		<? endif; ?>

		<input type="hidden" name="clientID" id="clientID" value="">
		<input type="hidden" name="metrika_id" id="metrika_id" value="<?= $arResult["metrika_id"]; ?>">

		<? if (trim($arResult["tar_id"]) != "" and trim($arResult["tar_id"]) != "N") : ?>
			<!-- Rating@Mail.ru counter -->
			<script type="text/javascript">
				var _tmr = window._tmr || (window._tmr = []);
				_tmr.push({
					id: "<?= $arResult["tar_id"]; ?>",
					type: "pageView",
					start: (new Date()).getTime()
				});
				(function(d, w, id) {
					if (d.getElementById(id)) return;
					var ts = d.createElement("script");
					ts.type = "text/javascript";
					ts.async = true;
					ts.id = id;
					ts.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//top-fwz1.mail.ru/js/code.js";
					var f = function() {
						var s = d.getElementsByTagName("script")[0];
						s.parentNode.insertBefore(ts, s);
					};
					if (w.opera == "[object Opera]") {
						d.addEventListener("DOMContentLoaded", f, false);
					} else {
						f();
					}
				})(document, window, "topmailru-code");
			</script><noscript>
				<div>
					<img src="//top-fwz1.mail.ru/counter?id=<?= $arResult["tar_id"]; ?>;js=na" style="border:0;position:absolute;left:-9999px;" alt="" />
				</div>
			</noscript>
			<!-- //Rating@Mail.ru counter -->
		<? endif; ?>

		<? if (!isset($settings["fbq_set"])) { ?>
			<? if (intval($arResult["fb_id"]) > 0) : ?>
				<!-- Facebook Pixel Code -->
				<script>
					! function(f, b, e, v, n, t, s) {
						if (f.fbq) return;
						n = f.fbq = function() {
							n.callMethod ?
								n.callMethod.apply(n, arguments) : n.queue.push(arguments)
						};
						if (!f._fbq) f._fbq = n;
						n.push = n;
						n.loaded = !0;
						n.version = '2.0';
						n.queue = [];
						t = b.createElement(e);
						t.async = !0;
						t.src = v;
						s = b.getElementsByTagName(e)[0];
						s.parentNode.insertBefore(t, s)
					}(window, document, 'script',
						'https://connect.facebook.net/en_US/fbevents.js');
					fbq('init', '<?= $arResult["fb_id"]; ?>');
					fbq('track', 'PageView');
				</script>
				<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=<?= $arResult["fb_id"]; ?>&ev=PageView&noscript=1" /></noscript>
				<!-- End Facebook Pixel Code -->
			<? endif; ?>
		<? } ?>
		<? /* https://vk.com/js/api/openapi.js?168 */ ?>
		<? if ($arResult["vk_id"] != "N" or $arResult["vk_id"] != "") : ?>
			<script type="text/javascript">
				! function() {
					var t = document.createElement("script");
					t.type = "text/javascript", t.async = !0, t.src = "/local/lp/sys/js/openapi.js", t.onload = function() {
						VK.Retargeting.Init("<?= $arResult["vk_id"]; ?>"), VK.Retargeting.Hit()
					}, document.head.appendChild(t)
				}();
			</script><noscript><img src="https://vk.com/rtrg?p=<?= $arResult["vk_id"]; ?>" style="position:fixed; left:-999px;" alt="" /></noscript>
		<? endif; ?>

		<script type="text/javascript">
			function SetCell() {
				celType = $("#celType").val();
				console.log("celType " + celType);
				<? if ($arResult["vk_id"] != "" and $arResult["vk_id"] != "N") : ?>
					try {
						if (celType == "form" || celType == "getForm") {
							VK.Goal("lead");
							console.log("VK set lead");
						}
					} catch (err) {
						console.log("err VK set lead");
					}

				<? endif; ?>


				<? if (intval($arResult["fb_id"]) > 0) : ?>
					try {
						if (celType == "form" || celType == "getForm") {
							console.log("fb set Lead {content_name : " + celType + "}");
							fbq('track', "Lead", {
								content_name: celType
							});
							//fbq('trackCustom', 'Lead');		
						}

					} catch (err) {
						console.log("err fb set Lead");
					}

				<? endif; ?>


				<? if ($arResult["analitik_id"] != "" and $arResult["analitik_id"] != "N") : ?>
					try {
						console.log("GA set generate_lead");
						gtag('event', 'generate_lead', {});
					} catch (err) {
						console.log("err GA set generate_lead");
					}

					try {
						console.log("GA set " + celType);
						gtag('event', 'send', {
							'event_category': 'forms',
							'event_action': 'send',
							'event_label': celType,
							'value': 1,
						});
					} catch (err) {
						console.log("err GA set " + celType);
					}

					try {
						console.log("YA set vse");
						gtag('event', 'send', {
							'event_category': 'forms',
							'event_action': 'send',
							'event_label': 'vse',
							'value': 1,
						});
					} catch (err) {
						console.log("err YA set vse");
					}
				<? endif; ?>

				<? if (trim($arResult["metrika_id"]) != "" and trim($arResult["metrika_id"]) != "N") : ?>
					try {
						console.log("YA set " + celType);
						ym(<?= $arResult["metrika_id"]; ?>, 'reachGoal', celType, {});
					} catch (err) {
						console.log("err YA set " + celType);
					}

					try {
						console.log("YA set vse");
						ym(<?= $arResult["metrika_id"]; ?>, 'reachGoal', "vse", {});
					} catch (err) {
						console.log("err YA set vse");
					}
				<? endif; ?>

				<? if (trim($arResult["tar_id"]) != "" and trim($arResult["tar_id"]) != "N") : ?>

					try {
						if (celType == "form" || celType == "getForm") {
							console.log("top mail sended <?= $arResult["tar_id"]; ?>");
							_tmr.push({
								id: '<?= trim($arResult["tar_id"]); ?>',
								type: 'reachGoal',
								goal: 'all_cells'
							});
						}
					} catch (err) {
						console.log("err top mail sended <?= $arResult["tar_id"]; ?>");
					}

				<? endif; ?>
			}


			function setMetrika(celType) {
				<? if (trim($arResult["metrika_id"]) != "" and trim($arResult["metrika_id"]) != "N") : ?>
					try {
						console.log("YA set " + celType);
						ym(<?= $arResult["metrika_id"]; ?>, 'reachGoal', celType, {});
					} catch (err) {
						console.log("err YA set " + celType);
					}

				<? endif; ?>
			}
		</script>
		<?
		if ($_REQUEST["tl"] == "a") {
			$arResult["is_loc"] = true;
			$raion['BD_ID'] = "524";
			$raion['TYPE'] = "raion";
			$raion['ID'] = "71212";
			$raion['CODE'] = "g-adler";
			$raion['LOC_TITLE']	 = "Адлере";
		}
		?>
		<? if ($arResult["is_loc"]) : ?>
			<input type="hidden" id="location" data-bid="<?= $raion['BD_ID']; ?>" data-type="<?= $raion['TYPE']; ?>" data-id="<?= $raion['ID']; ?>" value="<?= $raion['CODE']; ?>" data-text="<?= $raion['LOC_TITLE']; ?>">
		<? endif; ?>
	<?
	$content = ob_get_contents();
	ob_end_clean();
	$fd = fopen($c_path, 'w');
	fwrite($fd, $content);
	fclose($fd);

endif;
include $c_path; ?>

	<div style="display: none;" class="popup_rgba">
		<div class="popup_table">
			<div class="popup_cell">

			</div>
		</div>
	</div>

	<script type="text/javascript">
		<? include "js/jquery-1.9.1.min.js"; ?>
	</script>
	<script type="text/javascript">
		<? include "js/jquery-ui.min.js"; ?>
	</script>
	<script type="text/javascript">
		<? include "js/jquery.ui.touch-punch.min.js"; ?>
	</script>
	<?/*<script type="text/javascript"><?include "js/sripts_js.js";?></script> */ ?>
	<style type="text/css">
		<? include "min/animate_min.css" ?>
	</style>


	<input type="hidden" id="celType" value="form">
	<? if ($_GET['utm_source']) : ?>
		<input type="hidden" id="utm_source" value="<?= $_GET['utm_source'] ?>">
	<? endif; ?>
	<? if ($_GET['utm_medium']) : ?>
		<input type="hidden" id="utm_medium" value="<?= $_GET['utm_medium'] ?>">
	<? endif; ?>
	<? if ($_GET['utm_campaign']) : ?>
		<input type="hidden" id="utm_campaign" value="<?= $_GET['utm_campaign'] ?>">
	<? endif; ?>
	<? if ($_GET['utm_term']) : ?>
		<input type="hidden" id="utm_term" value="<?= $_GET['utm_term'] ?>">
	<? endif; ?>
	<? if ($_GET['utm_content']) : ?>
		<input type="hidden" id="utm_content" value="<?= $_GET['utm_content'] ?>">
	<? endif; ?>
	<? if ($_GET['city']) : ?>
		<input type="hidden" id="city_ga" value="<?= $_GET['city'] ?>">
	<? endif; ?>
	<? if ($_GET['type']) : ?>
		<input type="hidden" id="utm_type" value="<?= $_GET['type'] ?>">
	<? endif; ?>

	<? if ($_GET['send']) : ?>
		<input type="hidden" id="utm_send" value="<?= $_GET['send'] ?>">
	<? endif; ?>

	<?
	if (trim($_REQUEST["roistat"]) != "")
		$utm_roistat = $_REQUEST["roistat"];

	if (trim($_REQUEST["rs"]) != "")
		$utm_roistat = $_REQUEST["rs"];


	if ($utm_roistat != "") : ?>
		<input type="hidden" id="utm_roistat" value="<?= $utm_roistat ?>">
	<? endif; ?>
	<? $referer = $_SERVER['HTTP_REFERER'];
	if (stristr($referer, 'yandex.ru')) {
		$search = 'text=';
		$crawler = 'Yandex';
	}
	if (stristr($referer, 'yandex.ua')) {
		$search = 'text=';
		$crawler = 'Yandex';
	}
	if (stristr($referer, 'rambler.ru')) {
		$search = 'words=';
		$crawler = 'Rambler';
	}
	if (stristr($referer, 'google.ru')) {
		$search = 'q=';
		$crawler = 'Google';
	}
	if (stristr($referer, 'google.com')) {
		$search = 'q=';
		$crawler = 'Google';
	}
	if (stristr($referer, 'mail.ru')) {
		$search = 'q=';
		$crawler = 'Mail.Ru';
	}
	if (stristr($referer, 'bing.com')) {
		$search = 'q=';
		$crawler = 'Bing';
	}
	if (stristr($referer, 'qip.ru')) {
		$search = 'query=';
		$crawler = 'QIP';
	}
	if (isset($crawler)) {
		$fx_array = parse_url($referer);
		$fx_vars = array();
		$phrase = urldecode($referer);
		//eregi($search.'([^&]*)', $phrase.'&', $phrase2);
		$phrase = $phrase2[1] . " " . $phrase2[2];
		$referer = $crawler;
	} ?>
	<input id="referer" type="hidden" value="<?= $referer ?>" />
	<? $ip = false;
	if (!empty($_SERVER["HTTP_X_REAL_IP"])) {
		$ip = $_SERVER["HTTP_X_REAL_IP"];
	} elseif (!empty($_SERVER['HTTP_CLIENT_IP'])) {
		$ip = $_SERVER['HTTP_CLIENT_IP'];
	} elseif (!empty($_SERVER["HTTP_X_FORWARDED_FOR"])) {
		$ip = $_SERVER["HTTP_X_FORWARDED_FOR"];
		if (strpos($ip, ", ") !== false) {
			$ip = explode(",", $ip);
			$ip = $ip['0'];
		}
	} elseif (!empty($_SERVER["REMOTE_ADDR"])) {
		$ip = $_SERVER["REMOTE_ADDR"];
	}
	?>


	<?
	$coo = explode(";", $_SERVER["HTTP_COOKIE"]);
	$cok = [];
	foreach ($coo as $k => $ve) {
		$v = explode("=", trim($ve));

		if (trim($v["0"]) == "_fbp") {
			$cok["fbp"] = $v["1"];
		}
		if (trim($v["0"]) == "_fbc") {
			$cok["fbc"] = $v["1"];
		}
	}
	?>
	<input type="hidden" id="_fbp" value="<?= $cok["fbp"]; ?>">
	<input type="hidden" id="_fbc" value="<?= $cok["fbc"]; ?>">
	<input type="hidden" id="fb_id" value="<?= $arResult["fb_id"]; ?>">


	<input type="hidden" id="user_ip" value="<?= $ip; ?>">
	<? if ($arResult["new_analitik_id"] != '' and $arResult["new_analitik_id"] != "N") : ?>
		<!-- Google Tag Manager (noscript) -->
		<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=<?= $arResult["new_analitik_id"]; ?>" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
		<!-- End Google Tag Manager (noscript) -->
	<? endif; ?>
	</body>

	</html>