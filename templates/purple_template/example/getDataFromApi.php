<?php
    ini_set('error_reporting', E_ALL);
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');
    if($_REQUEST["action"] == "pull"){
        pullJKAndWrite($_REQUEST["jk_id"], $_REQUEST["s_id"]);
        die("ok");
    } else if ($_REQUEST["action"] == "get") {
        if (file_exists("./info.data")) {
            $input = json_decode(file_get_contents("./info.data"), true);
            foreach($input as $jk) {
                if ($jk["CODE"] == $_REQUEST["jk"]) {
                    header('Content-type: application/json');
                    echo json_encode($jk);
                    die();
                }
            }
            die(header("HTTP/1.1 404 Bad Request"));
        } else {
            die(header("HTTP/1.1 500 Internal Server Error"));
        }
    } else if ($_REQUEST["action"] == "update") {
        if (file_exists("./info.data")) {
            $input = json_decode(file_get_contents("./info.data"), true);
            foreach($input as $jk) {
                $jk_id=$jk["ID"];
                $s_id=$jk["S_ID"];
                var_dump($jk_id." ".$s_id);
                $jk = getJK($jk_id, $s_id);
                if (isset($input[$jk_id]["CODE"])){
                    $input[$jk_id] = $jk;
                }
            }
            file_put_contents("info.data", json_encode($input));
            die('ok');
        } else {
            die(header("HTTP/1.1 500 Internal Server Error"));
        }
    } else if ($_REQUEST["action"] == "delete") {
        if (file_exists("./info.data")) {
            if (!isset($_REQUEST["jk_id"])) die('no id');
            $input = json_decode(file_get_contents("./info.data"), true);
            unset($input[$_REQUEST["jk_id"]]);
            file_put_contents("info.data", json_encode($input));
            die('ok');
        } else {
            die(header("HTTP/1.1 500 Internal Server Error"));
        }
    } else if ($_REQUEST["action"] == "list") {
        if (file_exists("./info.data")) {
            header('Content-type: application/json');
            echo file_get_contents("./info.data");
            die();
        } else {
            die(header("HTTP/1.1 500 Internal Server Error"));
        }
    }

    function pullJKAndWrite($jk_id, $s_id) {
        $newjk = json_decode(file_get_contents("http://api.g-n.ru/v1/?met=GetJkList&key=8N3783vyK7V3230v&s_id=".$s_id."&f_[jk_id][]=".$jk_id."&get_kv=1&kv_img_w=739&kv_img_h=509&kv_img_q=70&jk_imgAll_w=739&jk_imgAll_h=509&jk_imgAll_q=70&jk_imgF_w=739&jk_imgF_h=509&jk_imgF_q=70&f_[revs]=1&f_[ACTIVE]=ALL"));
        if (count($newjk->LIST)>0){
            if (file_exists("./info.data")) {
                $input = json_decode(file_get_contents("./info.data"), true);
            } else {
                $input = [];
            }
            $input[$_REQUEST["jk_id"]] = $newjk->LIST[0];
            $input[$_REQUEST["jk_id"]] = (array)$input[$_REQUEST["jk_id"]];
            $input[$_REQUEST["jk_id"]]["S_ID"] = $_REQUEST["s_id"];
            $input[$_REQUEST["jk_id"]] = (object)$input[$_REQUEST["jk_id"]];
            file_put_contents("info.data", json_encode($input));
            return true;
        }
    }

    function getJK($jk_id, $s_id) {
        $newjk = json_decode(file_get_contents("http://api.g-n.ru/v1/?met=GetJkList&key=8N3783vyK7V3230v&s_id=".$s_id."&f_[jk_id][]=".$jk_id."&get_kv=1&kv_img_w=739&kv_img_h=509&kv_img_q=70&jk_imgAll_w=739&jk_imgAll_h=509&jk_imgAll_q=70&jk_imgF_w=739&jk_imgF_h=509&jk_imgF_q=70&f_[revs]=1&f_[ACTIVE]=ALL"));
        if (file_exists("./info.data")) {
            $input = json_decode(file_get_contents("./info.data"), true);
        } else {
            $input = [];
        }
        $jk = $newjk->LIST[0];
        $jk = (array)$jk;
        $jk["S_ID"] = $s_id;
        $jk = (object)$jk;
        return $jk;
    }
