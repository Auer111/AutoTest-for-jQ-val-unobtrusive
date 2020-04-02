function test() { savedata(); sessionStorage.setItem("test", "ON"); LoadCustomData(); RunningPanel(); Act(); }
function stoptest() { sessionStorage.removeItem("test"); NotRunningPanel(); window.stop(); }
function savedata() { setCookie('customData', SaveTestDataRenderTable(), 7); LoadCustomData(); RenderData(); }
function erasedata() { eraseCookie('customData'); LoadCustomData(); RenderData(); }

$(document).ready(function () {
    LoadCustomData();
    if (sessionStorage.getItem("test") == null) {NotRunningPanel();}
    else { RunningPanel(); Act(); }
    
});

function Act()
{
    if ($("[data-val]").length > 0) {
        $("[data-val]").each(function () { inputData($(this)); });
        submitNext();
    }
    else if ($('a:contains(">>")').length > 0) { goNext(); }
    else { stoptest(); $("#TestModelHeader").text("Auto Test: No Action Found"); }
    setTimeout(() => { stoptest(); $("#TestModelHeader").text("Auto Test: Timeout (60s)"); }, 60000);
}

function submitNext() { setTimeout(() => { $(":submit").click(); }, 100); }

function goNext() { setTimeout(() => { window.location.href = $('a:contains(">>")').attr("href"); }, 100); }

function inputData(DOMel) { try { DOMel.val(Data[DOMel.attr("name")]); } catch{ } }

function NotRunningPanel()
{
    $("#TestModelHeader").text("Auto Test Inactive");
    $("#TestPanel").hover(function () { if ($(this).css("width") == "43px") { $("#TestPanel").animate({ width: "480px" }).children().first().show(); } });
    $("#TestPanel").mouseleave(function () { if ($(this).css("width") == "480px") { $("#TestPanel").animate({ width: "43px" }).children().first().hide(); } });
    $("#TestPanel").css("background-color", "white");
    $("#AutoTestRun").removeClass("btn-secondary").addClass("btn-primary").attr("onclick", "test()").text("Start");
}
function RunningPanel()
{
    $("#TestPanel").off("hover").off("mouseleave").css("width", "480px").children().first().show();
    $("#TestModelHeader").text("Auto Test Running");
    $("#TestPanel").css("background-color", "grey");
    $("#AutoTestRun").removeClass("btn-primary").addClass("btn-secondary").attr("onclick", "stoptest()").text("Stop");
}

var Data = DefaultData;
var DefaultData =
{
    "name": "value"
}

function LoadCustomData() {if (getCookie("customData") !== null) { Data = $.parseJSON(getCookie('customData')); } else { Data = DefaultData; }}

function SaveTestDataRenderTable()
{
    var newData = {};
    var name = "";
    var arr = $("#TestDataRenderTable input");
    $.each(arr, function (i) {
        if (i % 2 == 0) { name = arr[i].value; }
        else { newData[name] = arr[i].value }
    });
    return JSON.stringify(newData);
}

function RowTemplater(name, value) { return `<tr><th scope="row"><button type="button" onclick=" $(this).parent().parent().remove(); savedata();" class="delrow badge badge-danger mr-1">X</button><input value="${name}"></input></th><td><input value="${value}"></input></td></tr>`; }
function RenderData()
{
    var inserData = "";

    $.each(Data, function (name, value) { inserData += RowTemplater(name,value); });
    var dataTable =
        `<div class="table-responsive">
            <table id="TestDataRenderTable" class="table">
                <thead>
                    <tr>
                        <th scope="col">Field Name</th>
                        <th scope="col">Test Value</th>
                    </tr>
                </thead>
                <tbody id="tstbdy">
                    ${inserData}
                </tbody>
            </table >
            <button type="button" class="addrow badge badge-primary" onclick='$("#tstbdy").append(RowTemplater("name","val")); savedata();'>+</button>
        </div >`;

    $("#TestModelBody").html(dataTable);
    $("#RenderTestData").removeClass("btn-info").addClass("btn-success").attr("onclick", "savedata()").text("Save to Cookie");
    $("#EraseData").show();
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) { document.cookie = name + '=; Max-Age=-99999999;';}



