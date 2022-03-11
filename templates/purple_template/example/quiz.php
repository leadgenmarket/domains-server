<? 
if($_REQUEST["lt"] == "a"){
    $_REQUEST["loc"] = "g-adler";
      $_GET["loc"] = "g-adler";
          $_POST["loc"] = "g-adler";
 $arResult["k"] = '';
    unset($arResult["k"]);
}


include "sys/main.php";
if($_REQUEST["lt"] == "a"){
  
    $arResult['LOC_CODE'] = "g-adler";
    $arResult["is_loc"] = true;

}

 

if($_REQUEST['d']== "11"){
    pr($arResult);
}

$c_n = md5($arResult["city_code"]);
if($arResult["is_loc"]){
	$c_n = md5($arResult["city_code"]."_".$arResult["LOC_CODE"]);
}else{
	if($arResult["k"] != "")
		$c_n = md5($arResult["city_code"]."_".$arResult["k"]);	
}
 
if($_REQUEST['city'] == "rostov"){
    $settings["not_raions"]  = array(   "pos-verkhnetemernitckii",
                                            "bataysk-rost",
                                            "aksay-rost",
                                            "platovskiy"
                                                     
                                            );      
}

$c_path = $_SERVER["DOCUMENT_ROOT"]."/cache/".$_SERVER["SERVER_NAME"]."/".$arResult["city_code"]."/all_".$c_n.".php";

 
if(!file_exists($c_path) or true):
 	$arResult["CITY"] = GetSite($arResult['city_code'], $bd);
	if(!$arResult["is_loc"]){
		$RAIONS = array();
		 
    
    if($_REQUEST["k"] == "901004"){
        $url = "http://api.g-n.ru/local/api/lp/locIn.php?city=".$_REQUEST["city"];
        $f_class = "&class[]=Бизнес&class[]=Элит&class[]=Премиум";
        $res = json_decode(file_get_contents($url.$f_class), true);
        $arResult["RAIONS"]["I"] = $res["RAIONS"];
        $arResult["RAIONS"]["PRICES"] = $res["PRICES"];
        $arResult["CITY"] =  array_merge($res["PRICES"]["0"], $arResult["CITY"]);
    }else{
        $arResult["RAIONS"] = GetLocsByCity($_REQUEST['city'], $bd);
         

    }

        foreach ($arResult["RAIONS"]["I"] as $key => $raion){

   
            if(strpos($raion["BD_ID"], "_M") !== false){
                $cn = intval($raion["JK_CNT"])*1000;
                    if(isset($arResult["metroList"][$cn])){
                        for ($i=0; $i < 50; $i++) { 
                            if(isset($arResult["metroList"][$cn])){
                                $cn++;
                            }else{
                                break;
                            }
                        }                               
                    }
                    $cnt++;

                    $arResult["metroList"][$cn] = $raion;

                  continue;
            }


                if(trim($raion["NAME"]) == "" or  $raion["ACTIVE"] === false or in_array($raion["CODE"], $settings["not_raions"]) ) continue;
                if($raion["TYPE"] != "okryg")
                if($raion["TYPE"] == "ulica" or
                    $raion["TYPE"] == "1" or
                    $raion["TYPE"] == "shos" or
                    $raion["TYPE"] == "pr_" or
                    $raion["TYPE"] == "pr"  or
                    $raion["TYPE"] == "3"  or
                    $raion["TYPE"] == "per"  or
                    $raion["TYPE"] == "bylvars" or
                 
                                    $raion["TYPE"] == "6" or
                                    $raion["TYPE"] == "7" or
                                    $raion["TYPE"] ==  "proe" or 
                                    $raion["TYPE"] == "8"  or 
                                    intval($raion["JK_CNT"]) <= 0

                    )continue;  
     
                    

                    $cn = intval($raion["JK_CNT"])*1000;
                 
                    if(isset($RAIONS[$cn])){
                        for ($i=0; $i < 50; $i++) { 
                            if(isset($RAIONS[$cn])){
                                $cn++;
                            }else{
                                break;
                            }
                        }                               
                    }
                        $cnt++;
         

                    $RAIONS[$cn] = $raion;                  
        }
		krsort($RAIONS);
		$arResult["RAIONS"]["I"] = $RAIONS;
	 
	 
	}else{
		$raion = GetLocByCode($arResult["LOC_CODE"], $arResult['city_code'], $bd);
 
	 	$arResult["RAIONS"]["PRICES"][$raion["ID"]] = $raion;

        if($_REQUEST["lt"] == "a"){

            $raion["S_ID"] = $arResult["CITY"]["S_ID"];
            $raion["DOMEN"] = $arResult["CITY"]["DOMEN"];
            $arResult["CITY"]  = $raion;
 
        }
	}
 
	 
	ob_start();
?>

<?if(!$arResult["is_loc"]):?>
	<div class="data_step mw_step district_step" id="locStep">
		<div class="step_title"><?if($_REQUEST["use_metro"] == "1") echo "Выберите метро"; else echo "Выберите районы";?> <span class="step_ident">Шаг 1 из 4</span></div>
        <!-- scroll_main -->
		<div class="rs_size">
            <div class="new_scroll_main_y raion_scroll">
                <div class="rs_dec"></div>
                <ul class="check_list raions_list" id="raions_list">
 
                    <?if($_REQUEST["use_metro"] == "1"):?>
                        <li class="locs_li all_locs"  data-bdcode="0" data-id="0"><span>Все метро</span></li>
                        <?foreach ($arResult["metroList"] as $key => $metro):?>
  
                                <li class="locs_li" 
                                    data-bdcode="<?=str_replace("_M", "", $metro["BD_ID"]);?>" 
                                    data-id="<?=$metro["ID"];?>" 
                                    data-filter="f_[metro][]=<?=$metro["CODE"];?>"><span><?=$metro["NAME"];?></span></li>
                           
                        <?endforeach;?>
                    <?else:?>

                        <li class="locs_li all_locs"  data-bdcode="0" data-id="0"><span>Все районы</span></li>
                        <?foreach ($arResult["RAIONS"]["I"] as $key => $raion):
                                if($_REQUEST["use_evro"] == "false" and intval($raion["min_0"] ) <= 0 and intval($raion["min_1"] ) <= 0 and intval($raion["min_2"] ) <= 0 and intval($raion["min_3"] ) <= 0 and intval($raion["min_4"] ) <= 0 and intval($raion["min_5"] ) <= 0)
                                    continue;

                        ?>
                            <?if($raion["TYPE"] == "okryg"):?>
                                <li class="locs_li" 
                                    data-type="okryg" 
                                    data-bdcode="<?=$raion["CODE"];?>" 
                                    data-id="<?=$raion["ID"];?>" 
                                    data-filter='f_[okr][]=<?=$raion["CODE"];?>'><span><?=$raion["LOC_TITLE"];?></span></li>
                            <?else:?>
                                <li class="locs_li" 
                                    data-bdcode="<?=$raion["CODE"];?>" 
                                    data-id="<?=$raion["ID"];?>" 
                                    data-filter="f_[raions][]=<?=$raion["CODE"];?>"><span><?=$raion["NAME"];?></span></li>
                            <?endif;?>
                        <?endforeach;?>
                    <?endif;?>
                </ul>
            </div>
        </div>
		<a href="#" class="btn_main step_btn" >Далее</a>
	</div>
<?endif;?>

 
<div class="data_step mw_step rooms_step" id="roomStep">
	<div class="step_title">
		<?if(!$arResult["is_loc"]):?><div class="back_btn"></div><?endif;?>
		Сколько комнат Вам нужно? <span class="step_ident">Шаг 2 из 4</span>
	</div>
    <ul class="check_list kv_list" id="kv_list">
        <li data-val="0" data-filter="f_[kv_type][]=0" id="stud" class='<?if($arResult['FILL']['CNT']["0"]) echo "act";?> stud '>
            <span>Студии</span>
        </li>
        <li data-val="1" data-filter="f_[kv_type][]=1" id="1komn" class='<?if($arResult['FILL']['CNT']["1"]) echo "act";?> 1komn'>
            <span>1 - комнатные квартиры</span>
        </li>
        <li data-val="6" data-filter="f_[kv_type][]=6" id="6komn" class='<?if($arResult['FILL']['CNT']["6"]) echo "act";?> 6komn'>
            <span>Евродвушки</span>
        </li>        
        <li data-val="2" data-filter="f_[kv_type][]=2" id="2komn" class='<?if($arResult['FILL']['CNT']["2"]) echo "act";?> 2komn'>
            <span>2 - комнатные квартиры</span>
        </li>
        <li data-val="7" data-filter="f_[kv_type][]=7" id="7komn" class='<?if($arResult['FILL']['CNT']["7"]) echo "act";?> 7komn'>
            <span>Евротрешки</span>
        </li> 
        <li data-val="3" data-filter="f_[kv_type][]=3" id="3komn" class='<?if($arResult['FILL']['CNT']["3"]) echo "act";?> 3komn'>
            <span>3 - комнатные квартиры</span>
        </li>
        <li data-val="8" data-filter="f_[kv_type][]=8" id="8komn" class='<?if($arResult['FILL']['CNT']["8"]) echo "act";?> 8komn'>
            <span>Евро 4-ком. квартиры</span>
        </li>         
        <li data-val="4" data-filter="f_[kv_type][]=4" id="4komn" class='<?if($arResult['FILL']['CNT']["4"]) echo "act";?> 4komn'>
            <span>4 - комнатные квартиры</span>
        </li>
    </ul>
	<a href="#" class="btn_main step_btn" >Далее</a>
</div>

<div class="data_step mw_step rent_step" id="srokStep">
	<div class="step_title">
		<div class="back_btn"></div>
		Когда жилой комплекс должен быть сдан?<span class="step_ident">Шаг 3 из 4</span></div>
	<ul class="check_list sroki_list" id="sroki_list">
		<li data-filter="f_[srok][]=2022"  data-fi="srok[]=2022" data-val="2022" ><span>ЖК сдается в 2022 году</span></li>
		<li data-filter="f_[srok][]=2023"  data-fi="srok[]=2023" data-val="2023"><span>ЖК сдается в 2023 году</span></li>	
        <li data-filter="f_[srok][]=2024"   data-fi="srok[]=2024"  data-val="2024" ><span>ЖК сдается в 2024 году</span></li>  
        <li data-filter="f_[srok][]=2025"   data-fi="srok[]=2025"  data-val="2025" ><span>ЖК сдается в 2025 году</span></li>
        <li data-filter="f_[srok][]=2026"  data-fi="srok[]=2026" data-val="2026"><span>ЖК сдается в 2026 году</span></li>
		<? /* <li data-filter="f_[srok][]=sdan"  data-fi="srok[]=sdan" data-val="sdan"><span>ЖК уже сдан</span></li> */?>		 
	</ul>
	<a href="#" class="btn_main step_btn" >Далее</a>
</div>

<div class="data_step mw_step price_step" id="priceStep">
	<div class="step_title"><div class="back_btn"></div>Укажите максимальную стоимость квартиры<span class="step_ident">Шаг 4 из 4</span></div>
	<form class="form_main" onsubmit="$(this).parents('.mw_step').find('.step_btn').click(); return false;">
		<div class="in_slider">
            <div class="prpp" id="price_info">До 7 000 000 руб.</div>
			<?/*<input id="price_info" type="text" value="До 3 800 000 руб.">*/?>
			<input id="max_price" type="hidden">
			<div id="slider"></div>
		</div>
	</form>
	<a href="#" class="btn_main step_btn" >Далее</a>
</div>


 
<?if($settings["use_messegers"]):?>
    <div class="data_step m_step variants_step messengers" id="messegersStep">
        <div class="ms_title">Подобрано 135 вариантов <br> по вашим параметрам</div>

        <form class="form_main" onsubmit="SendPhone(); return false;">

 <?if($settings["wa_bt_new"]):?>
  <span>Получите 5 вариантов прямо сейчас</span>
   <?else:?>
            <span>Получите прямо сейчас 3 лучших предложения, выбрав удобный способ:</span>

                <?endif;?>

            <div class="variants_list">
                <?if($settings["wa_bt_new"]):?>
                    <a  onclick='$("#celType").val("whatsapp"); SetCell();'    
                    href="https://api.whatsapp.com/send?phone=<?=$settings["wa_phone"];?>"
                    data-href="https://api.whatsapp.com/send?phone=<?=$settings["wa_phone"];?>&text="
                    class="var_in whatsapp_ch filled only_what_btn" target="blanc_" >Получить на WhatsApp</a>
                <?else:?>
                    <a  onclick='$("#celType").val("whatsapp"); SetCell();'    
                        href="https://api.whatsapp.com/send?phone=<?=$settings["wa_phone"];?>"
                        data-href="https://api.whatsapp.com/send?phone=<?=$settings["wa_phone"];?>&text="
                        class="var_in whatsapp_ch filled" target="blanc_" ></a>
                    <a  onclick='$("#celType").val("viber"); SetCell();'    
                        href="viber://pa?chatURI=kvartiry&text=" class="var_in viber_ch filled" 
                        data-href="viber://pa?chatURI=kvartiry&text="></a>

                    <a  href="#" id="phone_bt" class="var_in phone_ch filled"></a>
     

                <?endif;?>


            </div>
            <input type="tel" class="set_mask phone_areas ym-record-keys" id="q_phone" placeholder="+7 ( ___ ) ___ - __ - __">
            <button class="btn_main  phone_areas" ><span>Посмотреть подборку</span></button>

            <?if($arResult['use_ch']):?>
                <div class="step_dec"><span></span> 
                <label id="use_ch_area" style="font-size: 12px; color: #949494; display: block;float: left; max-width: 316px; margin-top: 10px;"> 
                    <input checked="checked" id="id_use_ch"  type="checkbox"  style="height: 15px;float: left;width: 20px; margin-top: 2px;"> 
                C <a style="color: #949494;" target="blanc_" href="/local/lp/vv_2/politika.php">политикой конфиденсальности сайта</a> ознакомлен
                </label>
                </div>
            <?endif;?>
        </form>
    </div>

    <script type="text/javascript">
        $("#phone_bt").click(function(){
            $(".phone_areas").css("visibility", "visible");
            $(".variants_list a").removeClass("filled");
            $(this).addClass("filled");
            return false;
        });
    </script>
<?else:?>
    <div class="data_step m_step variants_step" id="phoneStep">
        <div class="ms_title">Подобрано 135 вариантов <br> по вашим параметрам</div>
        <div class="sale_text"><img src="/local/lp/quiz_n20/img/sale_tit.png" alt=""><span>есть варианты со скидками <br> и спецпредложениями</span></div>
        <form class="form_main" onsubmit="SendPhone(); return false;">
            <span>Для получения доступа к базе укажите свой номер телефона</span>
            <input type="tel" class="form_phone" id="q_phone" placeholder="+7 ( ___ ) ___ - __ - __">

            <?if($settings['use_ch']):?>
 

                
                <label id="use_ch_area" style="font-size: 12px; color: #949494; display: block;  max-width: 316px; margin-top: 10px;"> 
                    <input checked="checked" id="id_use_ch"  type="checkbox"  style="height: 15px;float: left;width: 20px; margin-top: 2px;"> 
                C <a style="color: #949494;" target="blanc_" href="/local/lp/quiz_n20/politika.php">политикой конфиденсальности сайта</a> ознакомлен
                </label>
           

           

            <?endif;?> 
            <button class="btn_main  " data="<?=$settings['use_ch'];?>" ><span>Посмотреть подборку</span></button>
        </form>
    </div>
<?endif;?>






<div class="data_step m_step name_step" id="nameStep">
	<div class="ms_title">Как к Вам обращаться?</div>
	<form class="form_main" onsubmit="SendName(); return false;">
		<input type="text" id="q_name" placeholder="Введите Ваше имя">
		<button class="btn_main  " data-next-step="loading_step"><span>Далее</span></button>
	</form>
</div>

<div class="data_step m_step loading_step" id="loadingStep">
	<div class="ms_title">Подбираются варианты</div>
	<div class="progress">
		 <div class="progress_inner"><span class="wl_progress" style="width: 0px;"></span></div> <div class="progres_num" id="res_pers">0%</div>
		 <div class="progress_result">Обработано <span id="tatal_cnt"></span> предложений</div>  
 
	</div>
 
</div>

<div class="data_step m_step jk_step" id="jkStep">
	<div class="call_back"><span><l id="client_name"></l></span>, в ближайшее время с Вами свяжется специалист и уточнит детали для расширенной подборки. <div class="free">Это бесплатно!</div><img class="call_back_ico" src="/local/lp/quiz_n20/img/call_back_ico.png" alt=""></div>
	<div class="ms_title">По Вашим параметрам подходят квартиры в жилых комплексах:</div>
	<div class="  jk_scroll">    
		<ul class="jk_list" id="jk_list">
 
		</ul>
	</div>
</div>


<!-- <footer>
	<div class="footer_wm">
		<div class="fl">ООО "Лидген", <br> г. Краснодар, ул. Северная, 324 А</div>
		<div class="fr"><a href="tel:78006005523">8-800-600-55-23</a></div>
	</div>
 </footer> -->

 
<?$arResult["RAIONS"]["PRICES"]["0"] =  $arResult["CITY"];?>
<?$arResult["RAIONS"]["PRICES"][$_REQUEST["loc"]] =  $arResult["CITY"];?>

<?
if($_REQUEST["is_biz"] == "1"){
    $arResult["RAIONS"]["PRICES"] = json_decode(file_get_contents("https://api.g-n.ru/local/api/lp/biz_prices.php?city=".$_REQUEST["city"]));
}
?>

<script type="text/javascript">var json_p = '<?=json_encode($arResult["RAIONS"]["PRICES"]);?>';</script>
<script type="text/javascript">var prices = JSON.parse(json_p);</script>
<script type="text/javascript">
var city_dat = '<?=json_encode($arResult["CITY"]);?>'; 
city_dat = JSON.parse(city_dat);
</script>

<?
$content = ob_get_contents();
ob_end_clean();
$fd = fopen($c_path, 'w');
fwrite($fd, $content);
fclose($fd); 

endif;

include $c_path;
// <script type="text/javascript"><?include "js/jquery.maskedinput.min.js";?></script> 


<script type="text/javascript"><?include $_SERVER["DOCUMENT_ROOT"]."/local/lp/sys/js/punycode.js";?></script> 

<script type="text/javascript"><?include "js/jquery.mCustomScrollbar.concat.min.js";?></script>
<script type="text/javascript"><?include "js/jquery.scrollbar.js";?></script>
 


 <script>
  jQuery(function(){ 
        resizeHeader(); 
        }); 
        function resizeHeader(){ 
        var w=window, 
        d=document, 
        e=d.documentElement, 
        g=d.getElementsByTagName('body')[0], 
        x=w.innerWidth||e.clientWidth||g.clientWidth, 
        y=w.innerHeight||e.clientHeight||g.clientHeight; 
        wihdowH = y; 
        jQuery(".h100").css({'height':(wihdowH-0) + 'px'}); 
        } 
        jQuery(window).resize(function(){ 
        resizeHeader(); 
        });
    </script>

<style type="text/css"><? include "min/jquery.mCustomScrollbar_min.css"?></style>
<style type="text/css"><? include "css/jquery.scrollbar.css"?></style>



                        <script type="text/javascript">
                            jQuery(document).ready(function(){
                                jQuery('.new_scroll_main_y').scrollbar({
                                    "ignoreMobile" : true
                                });
                            });
                        </script>
<script>

if(!use_evro){
    $("#kv_list .6komn").css("display", "none");
    $("#kv_list .7komn").css("display", "none");
    $("#kv_list .8komn").css("display", "none");            
}

var price_id = 0;
var show_form = true;
var kv_type = '';
var steps_end = 1;
var set_rooms = true;
var userDat;
var set;
var domen = punycode.ToUnicode(window.location.hostname); //"подбор.новостройки-города.рф"; 
var pr = {
    p0: 0,
    p1: 0,
    p2: 0,
    p3: 0,
    p4: 0,
    p5: 0
};
var pr_id = {
    p0: 0,
    p1: 0,
    p2: 0,
    p3: 0,
    p4: 0,
    p5: 0
};
var st_ajax = 0;
var timerId ; 
var tatal_cnt;
var end_t;
var st;
 
    var cur_step = 0;
    var steps = 4;


// $.mask.definitions['~']='[+-]';
// $(".set_mask").mask("+7 ( 999 ) 999 - 99 - 99" );

function number_format(number, decimals, dec_point, separator ) {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof separator === 'undefined') ? ',' : separator ,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + (Math.round(n * k) / k)
        .toFixed(prec);
    };
  // Фиксим баг в IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
    .split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '')
    .length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1)
      .join('0');
  }
  return s.join(dec);
}

function SetRoms(p_id){
    if(kv_set != "")
        $("#kv_list ."+kv_set).addClass("act");
    console.log("SetRoms "+p_id);

    set_rooms = false;
    if (parseFloat(prices[p_id].min_0) > 0) {
        if (pr.p0 == 0) {
            pr_id.p0 = p_id;
            pr.p0 = prices[p_id].min_0;
        } else {
            if (pr.p0 > prices[p_id].min_0) {
                pr_id.p0 = p_id;
                pr.p0 = prices[p_id].min_0;

               
            }
        }
          $("#kv_list .stud").css("display", "block");
    }else{
        //$("#kv_list .stud").css("display", "none");
    }

    if (parseFloat(prices[p_id].min_1) > 0) {
        if (pr.p1 == 0) {
            pr_id.p1 = p_id;
            pr.p1 = prices[p_id].min_1;
        } else {
            if (pr.p1 > prices[p_id].min_1) {
                pr_id.p1 = p_id;
                pr.p1 = prices[p_id].min_1;
                
            }
        }
         $("#kv_list .1komn").css("display", "block");
    }else{
        //$("#kv_list .1komn").css("display", "none");
    }
    
    if (parseFloat(prices[p_id].min_2) > 0) {
        if (pr.p2 == 0) {
            pr_id.p2 = p_id;
            pr.p2 = prices[p_id].min_2;
        } else {
            if (pr.p2 > prices[p_id].min_2) {
                pr_id.p2 = p_id;
                pr.p2 = prices[p_id].min_2;
                
            }
        }
        $("#kv_list .2komn").css("display", "block");
    }else{
        //$("#kv_list .2komn").css("display", "none");
    }
    

    if (parseFloat(prices[p_id].min_3) > 0) {
        if (pr.p3 == 0) {
            pr_id.p3 = p_id;
            pr.p3 = prices[p_id].min_3;
        } else {
            if (pr.p3 > prices[p_id].min_3) {
                pr_id.p3 = p_id;
                pr.p3 = prices[p_id].min_3;
              
            }
        }

         $("#kv_list .3komn").css("display", "block");
         
    }else{
        //$("#kv_list .3komn").css("display", "none");
    }
    
    if (parseFloat(prices[p_id].min_4) > 0) {
        if (pr.p4 == 0) {
            pr_id.p4 = p_id;
            pr.p4 = prices[p_id].min_4;
        } else {
            if (pr.p4 > prices[p_id].min_4) {
                pr_id.p4 = p_id;
                pr.p4 = prices[p_id].min_4;
                
            }
        }

        $("#kv_list .4komn").css("display", "block");
         
    }else{
        //$("#kv_list .4komn").css("display", "none");
    }
    
    if (parseFloat(prices[p_id].min_5) > 0) {
        if (pr.p5 == 0) {
            pr_id.p5 = p_id;
            pr.p5 = prices[p_id].min_5;
        } else {
            if (pr.p5 > prices[p_id].min_5) {
                pr_id.p5 = p_id;
                pr.p5 = prices[p_id].min_5;
                
            }
        }
         $("#kv_list .5komn").css("display", "block");
    }else{
        //$("#kv_list .5komn").css("display", "none");
    }





    if (parseFloat(prices[p_id].min_6) > 0) {
        if (pr.p6 == 0) {
            pr_id.p6 = p_id;
            pr.p6 = prices[p_id].min_6;
        } else {
            if (pr.p6 > prices[p_id].min_6) {
                pr_id.p6 = p_id;
                pr.p6 = prices[p_id].min_6;
            }
        }
        if(use_evro)
            $("#kv_list .6komn").css("display", "block");
    }else{
        //$("#kv_list .6komn").css("display", "none");
    }


    if (parseFloat(prices[p_id].min_7) > 0) {
        if (pr.p7 == 0) {
            pr_id.p7 = p_id;
            pr.p7 = prices[p_id].min_7;
        } else {
            if (pr.p7 > prices[p_id].min_7) {
                pr_id.p7 = p_id;
                pr.p7 = prices[p_id].min_7;
            }
        }
        if(use_evro)
            $("#kv_list .7komn").css("display", "block");
    }else{
        //$("#kv_list .7komn").css("display", "none");
    }

    if (parseFloat(prices[p_id].min_8) > 0) {
        if (pr.p8 == 0) {
            pr_id.p8 = p_id;
            pr.p8 = prices[p_id].min_8;
        } else {
            if (pr.p8 > prices[p_id].min_8) {
                pr_id.p8 = p_id;
                pr.p8 = prices[p_id].min_8;
            }
        }
        if(use_evro)
            $("#kv_list .8komn").css("display", "block");
    }else{
        //$("#kv_list .8komn").css("display", "none");
    }
    

    
}
 

function GetPrice(kv, price_id) {
    console.log("GetPrice kv "+kv+" price_id "+price_id);
    
    switch (parseInt(kv)) {
        case 1:
            return  {min:prices[price_id].min_1, max:prices[price_id].max_1};
            break;
        case 2:
            return {min:prices[price_id].min_2, max:prices[price_id].max_2};
            break;
        case 3:
            return {min:prices[price_id].min_3, max:prices[price_id].max_3};
            break;
        case 4:
            return {min:prices[price_id].min_4, max:prices[price_id].max_4};
            break;
        case 5:
            return {min:prices[price_id].min_5, max:prices[price_id].max_5};
            break;
        case 6:
            return {min:prices[price_id].min_6, max:prices[price_id].max_6};
            break;
        case 7:
            return {min:prices[price_id].min_7, max:prices[price_id].max_7};
            break;
        case 8:
            return {min:prices[price_id].min_8, max:prices[price_id].max_8};
            break;            
        case 0:
            return {min:prices[price_id].min_0, max:prices[price_id].max_0};
        break;
    }
    return false;
}

var min;
var max;
var set;
function SetPrice(){
    min = 0;
    max = 0;
    if(is_location){
        price_id  = $("#location").data("id");
           console.log("is_location price_id "+price_id);
        if($("#kv_list .act").length > 0){
            console.log("set kv");
            $("#kv_list .act").each(function(ind, el) {
                kv = $(el).data("val");
                price = GetPrice(kv, price_id);
                console.log("GetPrice :kv - " + kv+" price_id "+price_id);
                console.log(price);
                if( min == 0)
                    min = price.min; 

                if(parseFloat(price.min) < parseFloat(min))
                    min = price.min;

                if(parseFloat(price.max) > parseFloat(max))
                    max = price.max;
            }); 
        }else{

            if(parseFloat(prices[price_id].min) > 0)
                min =  prices[price_id].min; 

            if(parseFloat(prices[price_id].max) > 0)
                max =  prices[price_id].max; 
        }
    }else{  

        if($(".all_locs").hasClass("act")){
            price_id = 0;
            if($("#kv_list .act").length > 0){
                console.log("set kv");
                $("#kv_list .act").each(function(ind, el) {
                    kv = $(el).val();
                    price = GetPrice(kv, price_id);
                    if( min == 0)
                        min = price.min; 

                    if(parseFloat(price.min) < parseFloat(min) && parseFloat(price.min) > 0)
                        min = price.min;

                    if(parseFloat(price.max) > parseFloat(max))
                        max = price.max;
                });   
            }else{
                if( min == 0)
                    min =  prices[price_id].min; 

                if(parseFloat(prices[price_id].min) < parseFloat(min) && parseFloat(prices[price_id].min) > 0)
                    min =  prices[price_id].min; 

                if(parseFloat(prices[price_id].max) > parseFloat(max))
                    max =  prices[price_id].max;                      
            }
        }else{
            if($("#kv_list .act").length > 0 && $("#raions_list .act").length > 0){
                $("#raions_list .act").each(function(inds, els) {
                 
                console.log("******************");
                    console.log("GET price_id "+price_id); 
                    console.log("min "+min+" max "+max);
                    price_id  = $(els).data("id");
                    $("#kv_list .act").each(function(ind, el) {
                          
                        kv = $(el).data("val");
                        price = GetPrice(kv, price_id);
                        console.log("GET kv "+kv);
                        console.log(price);
 
                        if( min == 0)
                            min = price.min; 

                        if(parseFloat(price.min) < parseFloat(min) && parseFloat(price.min) > 0)
                            min = price.min;

                        if(parseFloat(price.max) > parseFloat(max))
                            max = price.max;
                    }); 
         
                });         
            }else{


                if($("#raions_list .act").length > 0){
                    $("#raions_list .act").each(function(inds, els) { 
                        price_id  = $(els).data("id");
         
                        if( min == 0)
                            min =  prices[price_id].min; 

                        if(parseFloat(prices[price_id].min) < parseFloat(min) && parseFloat(prices[price_id].min) > 0)
                            min =  prices[price_id].min; 

                        if(parseFloat(prices[price_id].max) > parseFloat(max))
                            max =  prices[price_id].max; 
                    }); 
                }  

                if($("#kv_list .act").length > 0){

                    $("#kv_list .act").each(function(ind, el) {
                        kv = $(el).data("val");  console.log( "kv_list 1");
                        price = GetPrice(kv, 0);
                          console.log( "kv_list 2");
                        console.log( price);
                           console.log( "kv_list 3");
                        if( min == 0)
                            min = price.min; 

                        if(parseFloat(price.min) < parseFloat(min) && parseFloat(price.min) > 0)
                            min = price.min;

                        if(parseFloat(price.max) > parseFloat(max))
                            max = price.max;
                    });   
                }

            }
        }

        if(parseInt(max) <= parseInt(min))
            max = min * 2;
         console.log("END SET min "+min+" max "+max);
  
    }

    if(min <= 0  || typeof min == "undefined")
        min = prices[0].min;

    if(max <= 0 || typeof max == "undefined")
        max = prices[0].max;    

 
    d =  number_format(min*1000000 , 0, ".", ' ' ) ;
    // $( ".price_info_min" ).html("ОТ "+d+" РУБЛЕЙ");
    min = parseFloat(min);
    max = parseFloat(max);

    s_max = max*1000000 +50000;
    s_min = min*1000000;
 
    if(max_price > 0 && s_max > max_price){
        max = max_price/1000000;
        s_max = max_price;
    }

    if(min_price > 0 && s_min < min_price){
        min = min_price/1000000;
        s_min = min_price;
    }
    

    d = max-min;
    d = d*0.25;
    set = (d +min)*1000000;

 
    //if(set < parseFloat(s_min))
    //    set = s_min;

    $("#price_info").data("min", s_min);
    $("#price_info").data("max", s_max); 

	//set = set * 2;
	//if(set >= s_max)
	//	set = 3*(s_max/4);

    console.log("set min "+s_min+" s_max "+s_max+" set "+set);
    $( "#slider" ).slider({
        range: "min",
        value: set,
        max: s_max,
        min: s_min,
	    animate: true,
	    draggable: true,
        step: 50000,
                slide: function( event, ui ) {
                    $( "#price_info" ).text("До "+ number_format(ui.value, 0, ".", ' ' ) +" руб.");
                    $( "#price_info" ).attr("data", "До "+ number_format(ui.value, 0, ".", ' ' ) +" руб.");
                    $("#max_price").val(ui.value);
                }
        });
 
    $("#max_price").val(set);
    $( "#price_info" ).attr("data", "До "+ number_format(set, 0, ".", ' ' ) +" руб.");
    $( "#price_info" ).text("До "+ number_format(set, 0, ".", ' ' )  +" руб.");

}

 
// $(".var_in").click(function(){
//    $(".var_in").removeClass("filled");
//    $(this).addClass("filled");
//    $(".messengers .form_main  input").css("visibility", "visible");
//    $(".messengers .form_main button").css("visibility", "visible");
// });

$(".check_list li").click(function(){
    if($(this).hasClass("act")){
    	if($(this).hasClass("all_locs"))
    		$(".locs_li").removeClass("act");
    	else
        	$(this).removeClass("act");
    }else{
    	if($(this).hasClass("all_locs"))
    		$(".locs_li").addClass("act");
    	else
        $(this).addClass("act");
    }
    return false;
});

 

function showPhoneStep() {
    if(set_showPhoneForm)
        setMetrika("show_phone_form");
 	cur_step++;
    $(".data_step").removeClass('act'); 
    if(use_messegers){
        $("#messegersStep").addClass('viewed'); 
        $("#messegersStep").addClass('act'); 
    }else{
        $("#phoneStep").addClass('viewed'); 
        $("#phoneStep").addClass('act');         
    }

   	$('.step_dec').addClass("act");          
}


function UpdateUserUtm(){
 
    var roistatVisitId =  null; 
    var results = document.cookie.match ( '(^|;) ?roistat_visit=([^;]*)(;|$)' );
    if (results)
        roistatVisitId = ( unescape ( results[2] ) );

    var userDat = '?utm_content=1ekran&roistatVisitId='+roistatVisitId+'&'; //utm_campaign='+city+'&';
 
    if(is_location){
        loc_typ = $("#location").data("type");

        loc = $("#location").val();
        if(typeof loc != "undefined" && loc != "" && loc_typ == "metro" ){
            userDat +=  "m_set="+loc+ "&";
        }
    }



    name = $("#q_name").val();
    if (name != $("#q_name").attr("data") && typeof name != "undefined" && name != "") {
        userDat += "utm_name=" + name + "&";
    }



    phone = $("#q_phone").val();
    if(phone != $("#q_phone").attr("data") &&  typeof phone != "undefined" && phone != "" ){
        userDat +="utm_phone="+phone+"&";
    }

    utm_source = $("#utm_source").val();
    if(typeof utm_source != "undefined" && utm_source != "" ){
        userDat +="utm_source="+utm_source+"&";
    }

    utm_medium = $("#utm_medium").val();
    if(typeof utm_medium != "undefined" && utm_medium != "" ){
        userDat +="utm_medium="+utm_medium+"&";
    }

    utm_campaign = $("#utm_campaign").val();
    if(typeof utm_campaign != "undefined" && utm_campaign != "" ){
        userDat +="utm_campaign="+utm_campaign+"&";
    }               

    utm_term = $("#utm_term").val();
    if(typeof utm_term != "undefined" && utm_term != "" ){
        userDat +="utm_term="+utm_term+"&";
    }


    $("#jk_list a").each(function(){
        $(this).attr("href", $(this).data("def")+ userDat);
    });


     
    return false;
}  
function FinishLoad() {
    clearInterval(timerId);
    setTimeout(showPhoneStep, 1000);   
}

function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GetJkList(st){
    f_params = '';
    
    if (is_location) {
        loc = $("#location").val();
        if (typeof loc != "undefined" && loc != "") {
            loc_typ = $("#location").data("type");
            f_params += "f_[" + loc_typ + "]=" + loc + "&";
        }
    }else{

    	if(!$("#raions_list .all_locs").hasClass("act")){
    		$("#raions_list .act").each(function(){

    			f_params += $(this).data("filter") + "&";	
    		});
    	}  	
    }
    if(st <= 3){  
    	$("#kv_list .act").each(function(){
    		 f_params += $(this).data("filter") + "&";	
    	});    
    }

    if(st <= 2){    
    	$("#sroki_list .act").each(function(){
    		 f_params += $(this).data("filter") + "&";	
    	}); 
    }

    if(st <= 1){
        $("#paytype .act").each(function(){
            if($(this).data("filter") != "")
                f_params += $(this).data("filter") + "&";  
        });         
    }

    if(st <= 4){
	   price = $("#max_price").val();
	   f_params += "f_[price]="+$("#max_price").val();
    }

    f_params += "&f_[price_type]="+price_type;

    var data = "key=lp&met=GetJkList&s_id=" + city_dat.S_ID +"&jk_filter="+jk_filter+"&" + f_params+dop_filtrs;
    
    $.ajax({
        type: "POST",
        url: "/local/ajax/",
        data: data,
        success: function(json) {
            $("#loader").css("display", "none");
            link_list = '';
            if(json == "0"){
                link_list += "<li><a href='https://"+city_dat.DOMEN+"' data-def='https://" + city_dat.DOMEN +"' target='_blank'><span>"+city_dat.DOMEN+"</span></a></li>";
            }else{
                var res = JSON.parse(json); 
                set_id = false;
                console.log(res);
                for (var i = 0; i < 5; i++) {
                	cnt_set = false;
                    if (typeof res[i] != "undefined") {
 						kv_cnt = 0;
                    	if($("#kv_list .act").length > 0 ){
					     	$("#kv_list .act").each(function(id, el){	
					    		switch($(el).data('val')) {
									case 0:  
										kv_cnt += parseInt(res[i].CNT_0);
									break;
									case 1:  
										kv_cnt += parseInt(res[i].CNT_1);
									break;
									case 2:  
										kv_cnt += parseInt(res[i].CNT_2);
									break;	
									case 3:  
										kv_cnt += parseInt(res[i].CNT_3);
									break;	
									case 4:  
										kv_cnt += parseInt(res[i].CNT_4);
									break;	
								}
					    	});
                    	}else{

							kv_cnt += parseInt(res[i].CNT_0);
							kv_cnt += parseInt(res[i].CNT_1);
							kv_cnt += parseInt(res[i].CNT_2);
							kv_cnt += parseInt(res[i].CNT_3);
							kv_cnt += parseInt(res[i].CNT_4);

                    	}
 
                    	if(kv_cnt == 0) 
                    		kv_cnt = 1;
                    		 
                        link_list += "<li><a style='text-decoration:none;' href='https://"+city_dat.DOMEN+"/"+res[i].CODE+"/' data-def='https://" + city_dat.DOMEN + "/" + res[i].CODE + "/' target='_blank'><div class='jk_img'><img src='//media.g-n.ru"+res[i].IMG+"' ></div> <span>"+res[i].NAME+"</span><div class='apart_count'>"+kv_cnt+" "+declOfNum(kv_cnt,['квартира','квартир','квартир'])+"</div> </a></li>";
                       
                        if (!set_id) {
                            set_id = true;
                            jk_id = res[i].ID;
                        }
                    }
                };                
            }

            $("#jk_list").html(link_list); 
// 		  	$(".jk_scroll").mCustomScrollbar({
//               axis:"x",
//               theme:"dark-3",
//               advanced:{
//                 autoExpandHorizontalScroll:true //optional (remove or set to false for non-dynamic/static elements)
//               }
// 		    }); 	
            
            //$("#p_phone").css("display", "block");

        }
    });
}

function declOfNum(number, titles)  {  
	cases = [2, 0, 1, 1, 1, 2];
  return titles[ (number%100>4 && number%100<20)? 2:cases[(number%10<5)?number%10:5] ];
}



function SendQuizForm(){
 
    var celType = $('#celType').val();
    var name = $("#q_name").val();
    var phone = $("#q_phone").val();
    f_info = '';
    r_codes = '';
    r_list = '';
    var utm_source = $("#utm_source").val();
    var utm_medium = $("#utm_medium").val();
    var utm_campaign = $("#utm_campaign").val();
    var utm_term = $("#utm_term").val();
    var utm_content = $("#utm_content").val();
    var utm_type = $("#utm_type").val();   
    var utm_send = $("#utm_send").val();       
    var referer = $("#referer").val();
    var utm_roistat = $("#utm_roistat").val(); 
    l_type = '';
    if($("#location").data("type") == "metro") 
         l_type = "m";
    if (is_location) {
        r_codes = $("#location").val();     
        if(l_type == 'm')
            r_codes = $("#location").data("bid");
        r_list = $("#location").data("text");
    }else{
		$("#raions_list .act").each(function(){
            
			 r_codes += $(this).data("bdcode") + ", ";	
			 r_list += $(this).text() + ", ";	
		});
        
        if($("#raions_list .act").length <= 0){
            $("#raions_list li").each(function(){
                 
                 r_codes += $(this).data("bdcode") + ", ";  
            });   
           	r_list = "Все"; 
        }    	
    }
    var m_codes = '';
    tt = "Район";
    if(use_metro == "1"){
        tt = "Метро ";
         l_type = "mm";
        m_codes = r_codes;
        r_codes = "";
    }


    f_info += "&r_codes=" + r_codes;
    f_info += "&m_codes=" + m_codes;
    f_info += "&s_name="+city_dat.NAME;

    text_info = '';

    if (r_list != "") text_info += "&f_info[]="+tt+" - " + r_list;
    rooms = '';
	$("#kv_list .act").each(function(){
        v = $(this).find("span").text();
        //if (v == "0") v = "Студия";
        rooms += v + ", ";
	});    
	if (rooms != "") text_info += "&f_info[]=Количество комнат - " + rooms;
	a_sda4a = "";
	sda4a = "";
    var s = '';
	$("#sroki_list .act").each(function(){
        a_sda4a   += "&a_sda4a[]="+$(this).data("val");
        s = $(this).text();
        s = s.trim();
        sda4a +=  s+ ", ";
	});

    if(sda4a != "")
	text_info += "&f_info[]=Сдача - "+sda4a; 
 
	text_info += "&f_info[]=Бюджет - " + $("#price_info").text();
	pay_type = '';
    $("#paytype .act").each(function() {
        pay_type += $(this).data("text") + ", ";
    });

    if (pay_type != "") text_info += "&f_info[]=Способ оплаты - " + pay_type;

    kogda = '';
    $(".kogda_area input:checked").each(function() {
        kogda += $(this).data("text") + ", ";
    });

    if (kogda != "") text_info += "&f_info[]=Срок приобритения - " + kogda;
  	f_info += text_info;
 
    utm_ = "&utm_content=1ekran&ut_type="+domen;
    if (utm_type) utm_ += "&type=" + utm_type;    
    if (utm_source) utm_ += "&utm_source=" + utm_source;
    if (utm_medium) utm_ += "&utm_medium=" + utm_medium;
    if (utm_campaign) utm_ += "&utm_campaign=" + utm_campaign;
    if (utm_term) utm_ += "&utm_term=" + utm_term;
    if (utm_send) utm_ += "&utm_send=" + utm_send;	
    if (utm_roistat) utm_ += "&utm_roistat=" + utm_roistat;  
    
    vtor = 0;
    if($("#is_vtori4ka").prop("checked"))
        vtor = 1;


    user_ip = $("#user_ip").val();


    var yclid = get_cookie("yclid");
    utm_ += "&yclid="+yclid; 
    
    var gclid = get_cookie("gclid");
    utm_ += "&gclid="+gclid;

    var roistatVisitId = get_cookie("roistat_visit");
    SetCell();
    utm_ += "&send_type=" + send_type; 
    utm_ += "&l_t=la"; 

    utm_ += "&domen="+domen; 


    var _fbp = '';
    var _fbc = '';
    var results = document.cookie.match ( '(^|;) ?_fbp=([^;]*)(;|$)' );
    if (results)
        _fbp = ( unescape ( results[2] ) );

     var results = document.cookie.match ( '(^|;) ?_fbc=([^;]*)(;|$)' );
    if (results)
        _fbc = ( unescape ( results[2] ) );

    utm_ += '&_fbp='+_fbp;
    utm_ += '&_fbc='+_fbc;
    utm_ += '&fb_id='+$("#fb_id").val(); 

    utm_ += '&clientID='+$("#clientID").val(); 
    utm_ += '&metrika_id='+$("#metrika_id").val(); 
    utm_ += '&celType='+$("#celType").val(); 
    

    

    var url = "https://api.g-n.ru/local/ajax/";
    if(send_type != "")
        url = "/local/ajax/";
 

     if(set_bd){
        url = "/local/ajax/";
        utm_ += "&set_bd=1";
    }


   	$.ajax({
        type: "POST",
        url: url,
        data: "AMO_ID="+AMO_ID+"&loc_type="+l_type+"&name="+name+"&roistatVisitId="+roistatVisitId+"&user_ip="+user_ip+"&act=tmp&phone=" + phone + a_sda4a + "&vtor=" + vtor + "&jk_id=" + jk_id + "&S_ID=" + city_dat.S_ID + "&TEMA=Заявка с одноэкранника" + f_info + utm_,
        success: function(json) { }
    });        
   return false;
}


function SendPhone(){
    $("#celType").val("form");
 	$("#q_phone").removeClass("err");      
	if(validPhone($("#q_phone").val())){  
        UpdateUserUtm();

        if(use_ch == true &&  $("#id_use_ch").prop("checked") == false){
            $("#use_ch_area").addClass("l_err");
             return false;
        } 

        if(sms_conf){
            action = "SendSms";
            if(sms_code)
                action = "getCode";

            $("#s_phone").text($("#q_phone").val());
            $.ajax({
                type: "POST",
                url: "/local/lp/sys/sms_send.php",
                data: "action="+action+"&phone=" + $("#q_phone").val(),
                success: function(res) {
 
                    if(res == "1"){
					    $(".data_step").removeClass('act'); 
					    $("#nameStep").addClass('viewed'); 
					    $("#nameStep").addClass('act'); 
					   	$('.step_dec').addClass("act");  

                        if(!sms_code){
                            SendQuizForm();
                        }

                    }else{
                        $("#err_phone").text("Возможно, вы ввели неверный номер телефона, проверьте его и повторите попытку");
                    }
                }
            });
		  
        }else{
 
            SendQuizForm();
		    $(".data_step").removeClass('act'); 
		    $("#nameStep").addClass('viewed'); 
		    $("#nameStep").addClass('act'); 
		   	$('.step_dec').addClass("act"); 
        }
 
	}else{
 
		$("#q_phone").addClass("err");
	}
	
	return false;
}

function SendName(){
    $("#celType").val("getName");
 	$("#q_name").removeClass("err");
	if($("#q_name").val() != ""){
        UpdateUserUtm();
		$("#client_name").text($("#q_name").val());
        if(sms_code){
            $(".pages").removeClass("act");
            $(".pages").css("display", "none");            
            $(".p_sms").addClass("act");
            $(".p_sms").css("display", "block"); 
            $('.step_dec').addClass("act"); 

        }else{ 
            SendQuizForm();
		    $(".data_step").removeClass('act');
            $('.step_dec').removeClass("act");   
		    $("#jkStep").addClass('viewed'); 
		    $("#jkStep").addClass('act'); 
 
        }
        if(no_jk){
            $("#jk_res_list").html("");
        } 
	}else{
		$("#q_name").addClass("err");
	}
 
	return false;
}


function SetSms(){
    $("#loader").css("display", "block");
    $("#err_sms").text("");
    $("#celType").val("getName");
    $("#sms_code").removeClass("err");
    if($("#sms_code").val() != ""){
            $.ajax({
                type: "POST",
                url: "/local/lp/sys/sms_send.php",
                data: "action=checkCode&code=" + $("#sms_code").val(),
                success: function(res) {
                    $("#loader").css("display", "none");
                    if(res == "1"){
                        SendQuizForm(); 
                        $(".pages").removeClass("act");
                        $(".pages").css("display", "none");            
                        $(".p_list").addClass("act");
                        $(".p_list").css("display", "block");   
                    }else{
                        $("#err_sms").text("К сожалению, введен неверный код подтверждения. Попробуйте еще раз или укажите другой номер телефона.")
                    }
                }
            });  
    }else{
        $("#loader").css("display", "none");
        $("#sms_code").addClass("err");
    }
    
    return false;
}

function get_cookie ( cookie_name ){
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
 
  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}


function saveRooms(){
    set_rooms = true;
    $("#kv_list li").css("display", "none");            
    if (is_location) {
        price_id = $("#location").data("id");
    } else {
        if ($(".all_locs").hasClass("act") ) {
            $("#kv_list li").css("display", "block");
            price_id = 0;
        } else {
            min = 9999999999;
            price_id = 0;

            $("#raions_list .act").each(function(ind, el) { 
                price_id  = $(el).data("id");
                SetRoms(price_id);
      
            });  


        }
    }
     
    if(set_rooms)   
        SetRoms(price_id); 

    if(!use_evro){
        $("#kv_list .6komn").css("display", "none");
        $("#kv_list .7komn").css("display", "none");
        $("#kv_list .8komn").css("display", "none");            
    }
}

function validPhone(phone) {
    phone = phone.split(' ').join('');
    phone = phone.replace(/[^0-9]/gim,'');
    fl = false;
    if((/^([\+\ \d-()]{2,20})$/.test(phone)) && phone.length == 11)
       fl = true;

    if(not_cods){
        phoneCode = parseInt(phone.substring(1, 4)); 

        for (var i = 0; i < not_cods.length; i++) {
            if(phoneCode == not_cods[i])
                return false;
        }
    }


    if(ch_phone == "Y" && fl){
        var phoneCodes =  [877, 388, 385, 416, 818, 814, 851, 347, 472, 483, 302, 301, 492, 844, 817, 844, 820, 473, 872, 426, 302, 493, 873, 395, 866, 401, 847, 484, 415, 878, 814, 384, 833, 821, 494, 861, 862, 391, 352, 471, 813, 812, 474, 413, 836, 834, 495, 496, 495, 815, 818, 831, 816, 383, 381, 353, 486, 841, 342, 423, 811, 863, 491, 846, 848, 812, 845, 411, 424, 343, 867, 481, 865, 879, 863, 475, 855, 843, 482, 382, 487, 394, 345, 346, 341, 842, 421, 390, 351, 871, 835, 427, 349, 485, 499];       
        var i, cnt, phoneCode;
        phoneCode = parseInt(phone.substring(1, 4)); 
        console.log(phoneCode);
        if(phoneCode >= 900 && phoneCode <= 999) return fl;

        for (i = 0, cnt = phoneCodes.length; i < cnt; ++i) {
          
            if (phoneCodes[i] == phoneCode) {
                return fl;
            }  
        }

        return false;
    }   

    return fl;
} 
 
	if(is_location){
		steps = 3;
		cur_step = 1;
	}
 
 	i = 1;
	$(".step_ident").each(function(){
		$(this).text("Шаг "+i+" из "+steps);
		i++;
	});

	$('.step_btn').bind("click", function () {
		$(".step_dec").removeClass('act');
		nex_step = '';
        console.log("cur_step "+cur_step);
		switch(cur_step) {
		  	case 0:  
                saveRooms();
                 
                <?if($_REQUEST["kv_type"] != ""): ?>
                    nex_step  = 'srokStep';
                    cur_step++;
                <?else:?>
                   
                    nex_step  = 'roomStep';
                         
                <?endif;?>

                console.log("nex_step "+nex_step);
 
		   	break;
		  	case 1:  
		  		nex_step = 'srokStep';
		   	break;	
		  	case 2:  
		  		nex_step = 'priceStep';
		  		SetPrice();
 
		   	break;
		  	case 3:  
		  		nex_step = 'loadingStep';
		  		$('.step_dec').addClass("act");  


                //use_messegers
                //whatsapp_ch 
                if(use_messegers)
                    SaveFilter();

		    	$(".wl_progress").css("width", "0px");
		        st = 1;
                GetJkList(st);
		        st_ajax = 0;
		        tatal_cnt = 942;
		        timerId = setInterval(function() {
		            tatal_cnt += getRandomInt(150, 750);
		            $("#tatal_cnt").text(number_format(tatal_cnt, 0, ".", ' ' ));
		            m = getRandomInt(5, 10);
		            st_ajax = st_ajax +  getRandomInt(1, m);
		            if(st_ajax > 100) st_ajax = 100;
		            $("#res_pers").text(st_ajax+"%");
		            $(".wl_progress").css("width", st_ajax+"%");
		            if(st_ajax >= 100 && st_ajax !== false){
		            	st_ajax = false;
		                FinishLoad();
		            }
		        }, 130);		  		
		   	break;

		  	case 5:  
		  		nex_step = 'nameStep';
		  		 $('.step_dec').addClass("act");     
		   	break;
		  	case 6:  
		  		nex_step = 'jkStep';
		   	break;
		}

		nex_step = $('#'+nex_step);
		cur_step++;

	    if ( $("#priceStep").hasClass("act") ) {  
	        $(".main_wm").css({"background":"url(/local/lp/quiz_n20/img/gradient_bg.jpg)no-repeat center center", "background-size":"cover"}); 
	        $(".data_step").removeClass('act'); 
	        $(".data_step").removeClass('viewed');
	        
	    }
	    else{
	 
	        $(".data_step").removeClass('act'); 
	        $(this).parents( ".data_step" ).addClass('viewed');  
	        
	    }
	     nex_step.addClass("act");
	    return false;
	});
 
	$('.back_btn').bind("click", function () {
		prev_step_ = '';
		switch(cur_step) {
		  	case 1:  
		  		prev_step_ = 'locStep';
		   	break;
		  	case 2:  
		  		prev_step_ = 'roomStep';
		   	break;
		  	case 3:  
		  		prev_step_ = 'srokStep';
		   	break;	
		  	case 4:  
		  		prev_step_ = 'priceStep';
		   	break;			   		 
		}
		cur_step--;
		prev_step = $('#'+prev_step_);

        $(".data_step").removeClass('act');
        prev_step.addClass("act") ;  
        prev_step.removeClass("viewed") ;
 
        return false;
	});
 	
 
    $(".scroll_main").mCustomScrollbar({
      	axis:"y",
      	theme:"dark-3",
    }); 		
 

function SaveFilter(){

    var utm_source = $("#utm_source").val();
    var utm_medium = $("#utm_medium").val();
    var utm_campaign = $("#utm_campaign").val();
    var utm_term = $("#utm_term").val();
    var utm_content = $("#utm_content").val();
    var utm_type = $("#utm_type").val();   
    var utm_send = $("#utm_send").val();       
    var referer = $("#referer").val();
    var roistatVisitId = get_cookie("roistat_visit");
    var utm_ = "&utm_content=1ekran&ut_type="+lp_name;
    if (utm_type) utm_ += "&type=" + utm_type;    
    if (utm_source) utm_ += "&utm_source=" + utm_source;
    if (utm_medium) utm_ += "&utm_medium=" + utm_medium;
    if (utm_campaign) utm_ += "&utm_campaign=" + utm_campaign;
    if (utm_term) utm_ += "&utm_term=" + utm_term;
    if (utm_send) utm_ += "&utm_send=" + utm_send;  
    utm_ += "&user_ip=" + $("#user_ip").val();  
    utm_ += "&roistatVisitId=" + roistatVisitId;  
     var r_codes = '';
    var r_codes_ = '';
    var loc_text = '';
    var text_info = '';
    r_list = '';
    p = 0;
    if (is_location) {

 
        if($("#location").data("type") == "metro")  {
            r_codes_ += "&m_codes[]="+$("#location").val();    
        }else{
            r_codes_ += "&r_codes_new[]="+$("#location").val();  
        }


        r_list = $("#location").data("text");
        loc_text += "&loc_text[]="+$("#location").data("text");
          
        p++;
    }else{
        $("#raions_list .act").each(function(){
            r_codes_ += "&r_codes_new[]="+$(this).data("bdcode");  
            r_codes += $(this).data("bdcode") + ", ";  
            r_list += $(this).text() + ", "; 
            loc_text += "&loc_text[]="+$(this).text();
            p++;
        });
        
        if($("#raions_list .act").length <= 0){
            $("#raions_list li").each(function(){
                r_codes_ += "&r_codes_new[]="+$(this).data("bdcode");  
                r_codes += $(this).data("bdcode") + ", ";
                loc_text += "&loc_text[]="+$(this).text();
                p++;   
            });

            r_list = "Все"; 
        }  
    }


    if (r_list != "") text_info += "\n Район - " + r_list;
    rooms = '';
    rooms_new = '';
    rooms_ = '';
    $("#kv_list .act").each(function(){
        v = $(this).data("val");
        rooms_new += "&rooms_new[]="+$(this).data("val");
        rooms_ += v + ", ";
        v = $(this).find("span").text();
        if (v == "0") v = "Студия";
        rooms += v + ", ";
    });    
    if (rooms != "") text_info += "\n Количество комнат - " + rooms;
    a_sda4a = "";
    sda4a = "";
    var s = '';  
    $("#sroki_list .act").each(function(){
 
        //p = p.replace(new RegExp("f_[srok]",'g'),"srok");
        a_sda4a   += "&"+$(this).data("fi");

        s = $(this).text();
        s = s.trim();
        sda4a +=  s+ ", ";
    });

    if(sda4a != "")
    text_info += "\n Сдача - "+sda4a; 
 
    text_info += "\n Бюджет - " + $("#price_info").text();
    pay_type = '';
    $("#paytype .act").each(function() {
        pay_type += $(this).data("text") + ", ";
    });

    if (pay_type != "") text_info += "\n Способ оплаты - " + pay_type;

    kogda = '';
    $(".kogda_area input:checked").each(function() {
        kogda += $(this).data("text") + ", ";
    });

    if (kogda != "") text_info += "\n Срок приобритения - " + kogda;
 
 

    var phone = $("#q_phone").val();
 
    l_type = '';
    if($("#location").data("type") == "metro") 
         l_type = "m";
 

    
        var now = new Date();
        phone = now.getMonth()+''+now.getDate()+''+ now.getHours() +''+ now.getMinutes() +''+ now.getSeconds() + ''+now.getMilliseconds();  
    
 
   //   code = "Подходящие для Вас предложения уже подобраны (№ "+phone+"). Чтобы их получить, просто отправьте это сообщение  ➡";
     //  "Хочу получить подборку подходящих мне предложений (№ Вашей подборки - "+phone+")%20%F0%9F%91%89";
 
     code = "Варианты квартир подобраны (№ "+phone+"). Просто отправьте это сообщение ➡";

    $(".whatsapp_ch").attr("href", $(".whatsapp_ch").data("href") + code ) ;     

    $(".viber_ch").attr("href", $(".viber_ch").data("href") + code ) ;     
      var yclid = get_cookie("yclid");
     
    $.ajax({
        type: "POST",
        url:  "/local/ajax/filters.php",
        data:  "phone="+phone+"&s_id=" + city_dat.S_ID +"&r_codes=" + r_codes+"&price="+$("#price_info").text()+"&rooms="+rooms_+"&l_type="+l_type+"&text="+text_info+utm_+a_sda4a+loc_text+rooms_new+r_codes_+"&yclid="+yclid,
        success: function(json){}
    });     
}

//setMask($("#q_phone"));
function setMask(input){
    var phone = input.val();
    phone = phone.replace(/[^0-9]/gim,'').trim();
    format_fhone = '';
    st = true;
    cn = 0;
    for (var i = 0; i <= phone.length; i++) {
        console.log(phone[i]);   
        cur_num_st  = phone[i];
        cur_num  = parseInt(phone[i]);
        
        if(cur_num_st >= 0){


            switch(cn) {
                case 0:
                    if(cur_num == 8 || cur_num == 7 || cur_num == 9){
                        format_fhone = "+7 ( ";
                        if(cur_num == 9){
                            cn++;
                            format_fhone += "9";
                        }
                    }else{
                        st = false;
                    }
                break;

                case 1:
                    if(cur_num != 9){
                        st = false;
                    }
                break;                

                case 4:
                    format_fhone += " ) ";
                break;

                case 7:
                    format_fhone += " - ";
                break;

                case 9:
                    format_fhone += " - ";
                break;                

                default:
                   
                break;
            }

            if(i != 0 && st){
                format_fhone += cur_num;  
            }
 
            cn++;

            if(cn > 10 || !st) break;
        }
    }

    input.val(format_fhone);
    if(st){
        input.removeClass("err");
    }else{
        input.addClass("err");
    }
     
 
}
 
$('.form_phone').on('input',function(event){
    setMask($(this));
});
    
</script>
 <style type="text/css">
  .prpp   {
            display: block;
    width: 100%;
    height: 68px;
    background: #f4f5f9;
    border: none;
    color: #1f4a9c;
    font-size: 24px;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    padding-left: 30px;
    padding-right: 30px;
    text-align: center;
    border: none;
    border-radius: 20px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-top: 18px;
}
 </style>      
