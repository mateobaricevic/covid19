var legendHorizontalAlign = "right";
var legendVerticalAlign = "center";
var chartHeight = 500;
var initialInputFields = true;
var legendMaxWidthHrvatska = 1000;
var initialZoom = true;
var chartHeightHrvatska = 600;

var isBigScreen = window.innerWidth > 920;
if (!isBigScreen) {
    legendHorizontalAlign = "center";
    legendVerticalAlign = "bottom";
    chartHeight = 900;
    initialInputFields = false;
    legendMaxWidthHrvatska = 100;
    initialZoom = false;
    chartHeightHrvatska = 800;
}

CanvasJS.addCultureInfo("hr", {
    decimalSeparator: ".",
    digitGroupSeparator: ",",
    zoomText: "Zumiraj",
    panText: "Pomakni",
    resetText: "Resetiraj",
    days: ["ponedjeljak", "utorak", "srijeda", "četvrtak", "petak", "subota", "nedjelja"],
    shortDays: ["pon", "uto", "sri", "čet", "pet", "sub", "ned"],
    months: ["siječnja", "veljače", "ožujka", "travnja", "svibnja", "lipnja", "srpnja", "kolovoza", "rujna", "listopada", "studenog", "prosinca"],
    shortMonths: ["sij", "velj", "ožu", "tra", "svi", "lip", "srp", "kol", "ruj", "lis", "stu", "pro"],
    rangeSelector: {
        rangeText: "Raspon",
        fromText: "Od",
        toText: "Do"
    },
    rangeText: "Raspon",
    fromText: "Od",
    toText: "Do"
});

var colors = {
    red: 'rgba(255, 82, 82, 1)',
    redT: 'rgba(255, 82, 82, 0.7)',
    pink: 'rgba(255, 64, 129, 1)',
    pinkT: 'rgba(255, 64, 129, 0.7)',
    purple: 'rgba(224, 64, 251, 1)',
    purpleT: 'rgba(224, 64, 251, 0.7)',
    deepPurple: 'rgba(124, 77, 255, 1)',
    deepPurpleT: 'rgba(124, 77, 255, 0.7)',
    indigo: 'rgba(83, 109, 254, 1)',
    indigoT: 'rgba(83, 109, 254, 0.7)',
    blue: 'rgba(68, 138, 255, 1)',
    blueT: 'rgba(68, 138, 255, 0.7)',
    lightBlue: 'rgba(64, 196, 255, 1)',
    lightBlueT: 'rgba(64, 196, 255, 0.7)',
    cyan: 'rgba(0, 229, 255, 1)',
    cyanT: 'rgba(0, 229, 255, 0.7)',
    teal: 'rgba(100, 255, 218, 1)',
    tealT: 'rgba(100, 255, 218, 0.7)',
    green: 'rgba(105, 240, 174, 1)',
    greenT: 'rgba(105, 240, 174, 0.7)',
    lightGreen: 'rgba(178, 255, 89, 1)',
    lightGreenT: 'rgba(178, 255, 89, 0.7)',
    lime: 'rgba(238, 255, 65, 1)',
    limeT: 'rgba(238, 255, 65, 0.7)',
    yellow: 'rgba(255, 241, 118, 1)',
    yellowT: 'rgba(255, 241, 118, 0.7)',
    amber: 'rgba(255, 215, 64, 1)',
    amberT: 'rgba(255, 215, 64, 0.7)',
    orange: 'rgba(255, 171, 64, 1)',
    orangeT: 'rgba(255, 171, 64, 0.7)',
    deepOrange: 'rgba(255, 110, 64, 1)',
    deepOrangeT: 'rgba(255, 110, 64, 0.7)',
    brown: 'rgba(141, 110, 99, 1)',
    brownT: 'rgba(141, 110, 99, 0.7)',
    grey: 'rgba(189, 189, 189, 1)',
    greyT: 'rgba(189, 189, 189, 0.7)',
    blueGrey: 'rgba(120, 144, 156, 1)',
    blueGreyT: 'rgba(120, 144, 156, 0.7)',
    darkLime: 'rgba(205, 220, 57, 1)',
    darkLimeT: 'rgba(205, 220, 57, 0.7)',
    none: 'rgba(0, 0, 0, 0)'
};

var chartTypeZupanije = "area";
var chartFillOpacity = 0.5;
var imeZupanije = [
    "Bjelovarsko-bilogorska",
    "Brodsko-posavska",
    "Dubrovačko-neretvanska",
    "Grad Zagreb",
    "Istarska",
    "Karlovačka",
    "Koprivničko-križevačka",
    "Krapinsko-zagorska",
    "Ličko-senjska",
    "Međimurska",
    "Osječko-baranjska",
    "Požeško-slavonska",
    "Primorsko-goranska",
    "Šibensko-kninska",
    "Sisačko-moslavačka",
    "Splitsko-dalmatinska",
    "Varaždinska",
    "Virovitičko-podravska",
    "Vukovarsko-srijemska",
    "Zadarska",
    "Zagrebačka"
];
var colorZupanije = [
    colors.red,
    colors.cyan,
    colors.green,
    colors.deepPurple,
    colors.lightGreen,
    colors.blueGrey,
    colors.blue,
    colors.purple,
    colors.yellow,
    colors.lightBlue,
    colors.teal,
    colors.red,
    colors.pink,
    colors.orange,
    colors.darkLime,
    colors.indigo,
    colors.deepOrange,
    colors.yellow,
    colors.amber,
    colors.grey,
    colors.cyan
];

var dataAktivni = [];
var dataPotvrdeni = [];
var dataIzlijeceni = [];
var dataPreminuli = [];

// Potvrđeni po županijama
var dataPotvrdeniBb = []; // Bjelovarsko-bilogorska
var dataPotvrdeniBp = []; // Brodsko-posavska
var dataPotvrdeniDn = []; // Dubrovačko-neretvanska
var dataPotvrdeniGZ = []; // Grad Zagreb
var dataPotvrdeniI = []; // Istarska
var dataPotvrdeniK = []; // Karlovačka
var dataPotvrdeniKk = []; // Koprivničko-križevačka
var dataPotvrdeniKz = []; // Krapinsko-zagorska
var dataPotvrdeniLs = []; // Ličko-senjska
var dataPotvrdeniM = []; // Međimurska
var dataPotvrdeniOb = []; // Osječko-baranjska
var dataPotvrdeniPs = []; // Požeško-slavonska
var dataPotvrdeniPg = []; // Primorsko-goranska
var dataPotvrdeniSk = []; // Šibensko-kninska
var dataPotvrdeniSm = []; // Sisačko-moslavačka
var dataPotvrdeniSd = []; // Splitsko-dalmatinska
var dataPotvrdeniV = []; // Varaždinska
var dataPotvrdeniVp = []; // Virovitičko-podravska
var dataPotvrdeniVs = []; // Vukovarsko-srijemska
var dataPotvrdeniZ = []; // Zadarska
var dataPotvrdeniZa = []; // Zagrebačka

// Aktivni po županijama
var dataAktivniBb = [];
var dataAktivniBp = [];
var dataAktivniDn = [];
var dataAktivniGZ = [];
var dataAktivniI = [];
var dataAktivniK = [];
var dataAktivniKk = [];
var dataAktivniKz = [];
var dataAktivniLs = [];
var dataAktivniM = [];
var dataAktivniOb = [];
var dataAktivniPs = [];
var dataAktivniPg = [];
var dataAktivniSk = [];
var dataAktivniSm = [];
var dataAktivniSd = [];
var dataAktivniV = [];
var dataAktivniVp = [];
var dataAktivniVs = [];
var dataAktivniZ = [];
var dataAktivniZa = [];

// Preminuli po županijama
var dataPreminuliBb = [];
var dataPreminuliBp = [];
var dataPreminuliDn = [];
var dataPreminuliGZ = [];
var dataPreminuliI = [];
var dataPreminuliK = [];
var dataPreminuliKk = [];
var dataPreminuliKz = [];
var dataPreminuliLs = [];
var dataPreminuliM = [];
var dataPreminuliOb = [];
var dataPreminuliPs = [];
var dataPreminuliPg = [];
var dataPreminuliSk = [];
var dataPreminuliSm = [];
var dataPreminuliSd = [];
var dataPreminuliV = [];
var dataPreminuliVp = [];
var dataPreminuliVs = [];
var dataPreminuliZ = [];
var dataPreminuliZa = [];

function toggleDataSeries(e) {
    if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
    } else {
        e.dataSeries.visible = true;
    }
    e.chart.render();
}

function toggleDataSeriesInverted(e) {
    if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        // Clicked on visible
        e.chart.options.data.forEach(function(dataSeries) {
            // Toggle visibility of others
            if (dataSeries !== e.dataSeries) {
                if (typeof(dataSeries.visible) === "undefined" || dataSeries.visible) {
                    dataSeries.visible = false;
                } else {
                    dataSeries.visible = true;
                }
            }
        });
    } else {
        // Clicked on invisible
        e.chart.options.data.forEach(function(dataSeries) {
            // Make me visible, others not
            if (dataSeries !== e.dataSeries) {
                dataSeries.visible = false;
            } else {
                dataSeries.visible = true;
            }
        });
    }
    e.chart.render();
}

function toolTipFormat(e) {
    var str = CanvasJS.formatDate(new Date(e.entries[0].dataPoint.x), "D. MMMM YYYY.", "hr") + "<br/>";
    for (var i = 0; i < e.entries.length; i++) {
        if (e.entries[i].dataSeries.visible) {
            var temp = ('<span style="color: ' + e.entries[i].dataSeries.color + ';">' + e.entries[i].dataSeries.name + ':</span> '+ e.entries[i].dataPoint.y);
            str = str.concat(temp, '<br>');
        }
    };
    return (str);
}

function addDataHrvatska(data) {
    for (var i = 0; i < data.length-1; i++) {
        dataAktivni.push({
            x: new Date(data[i].Datum.substring(0, 10)),
            y: data[i].SlucajeviHrvatska - data[i].IzlijeceniHrvatska - data[i].UmrliHrvatska
        });
        dataPotvrdeni.push({
            x: new Date(data[i].Datum.substring(0, 10)),
            y: data[i].SlucajeviHrvatska - data[i+1].SlucajeviHrvatska
        });
        dataIzlijeceni.push({
            x: new Date(data[i].Datum.substring(0, 10)),
            y: data[i].IzlijeceniHrvatska - data[i+1].IzlijeceniHrvatska
        });
        dataPreminuli.push({
            x: new Date(data[i].Datum.substring(0, 10)),
            y: data[i].UmrliHrvatska - data[i+1].UmrliHrvatska
        });
    }
    chartHrvatska.render();

    // Hrvatska
    document.getElementById("danasAktivniHrvatska").innerHTML = CanvasJS.formatNumber(data[0].SlucajeviHrvatska - data[0].IzlijeceniHrvatska - data[0].UmrliHrvatska, "", "hr");
    document.getElementById("danasPotvrdeniHrvatska").innerHTML = CanvasJS.formatNumber(data[0].SlucajeviHrvatska - data[1].SlucajeviHrvatska, "", "hr");
    document.getElementById("danasIzlijeceniHrvatska").innerHTML = CanvasJS.formatNumber(data[0].IzlijeceniHrvatska - data[1].IzlijeceniHrvatska, "", "hr");
    document.getElementById("danasPreminuliHrvatska").innerHTML = CanvasJS.formatNumber(data[0].UmrliHrvatska - data[1].UmrliHrvatska, "", "hr");
    document.getElementById("sveukupnoPotvrdeniHrvatska").innerHTML = CanvasJS.formatNumber(data[0].SlucajeviHrvatska, "", "hr");
    document.getElementById("sveukupnoIzlijeceniHrvatska").innerHTML = CanvasJS.formatNumber(data[0].IzlijeceniHrvatska, "", "hr");
    document.getElementById("sveukupnoPreminuliHrvatska").innerHTML = CanvasJS.formatNumber(data[0].UmrliHrvatska, "", "hr");

    // Svijet
    document.getElementById("danasAktivniSvijet").innerHTML = CanvasJS.formatNumber(data[0].SlucajeviSvijet - data[0].IzlijeceniSvijet - data[0].UmrliSvijet, "", "hr");
    document.getElementById("danasPotvrdeniSvijet").innerHTML = CanvasJS.formatNumber(data[0].SlucajeviSvijet - data[1].SlucajeviSvijet, "", "hr");
    document.getElementById("danasIzlijeceniSvijet").innerHTML = CanvasJS.formatNumber(data[0].IzlijeceniSvijet - data[1].IzlijeceniSvijet, "", "hr");
    document.getElementById("danasPreminuliSvijet").innerHTML = CanvasJS.formatNumber(data[0].UmrliSvijet - data[1].UmrliSvijet, "", "hr");
    document.getElementById("sveukupnoPotvrdeniSvijet").innerHTML = CanvasJS.formatNumber(data[0].SlucajeviSvijet, "", "hr");
    document.getElementById("sveukupnoIzlijeceniSvijet").innerHTML = CanvasJS.formatNumber(data[0].IzlijeceniSvijet, "", "hr");
    document.getElementById("sveukupnoPreminuliSvijet").innerHTML = CanvasJS.formatNumber(data[0].UmrliSvijet, "", "hr");
    
    document.getElementById("danasDatum").innerHTML = CanvasJS.formatDate(new Date(data[0].Datum.substring(0, 10)), "DD. MMMM YYYY.", "hr");
}

function addDataZupanije(data) {
    for (var z = 0; z < data[0].PodaciDetaljno.length; z++) {
        for (var d = 0; d < data.length-1; d++)
        {
            var datumDanas = new Date(data[d].Datum.substring(0, 10));
            var potvrdeniDanas = data[d].PodaciDetaljno[z].broj_zarazenih - data[d+1].PodaciDetaljno[z].broj_zarazenih;
            if (potvrdeniDanas < 0)
            {
                potvrdeniDanas = 0;
            }
            var aktivniDanas = data[d].PodaciDetaljno[z].broj_aktivni;
            var preminuliDanas = data[d].PodaciDetaljno[z].broj_umrlih - data[d+1].PodaciDetaljno[z].broj_umrlih;
            if (preminuliDanas < 0)
            {
                preminuliDanas = 0;
            }
            switch (z)
            {
                case 0:
                    dataPotvrdeniBb.push({x: datumDanas, y: potvrdeniDanas});
                    dataPreminuliBb.push({x: datumDanas, y: preminuliDanas});
                    dataAktivniBb.push({x: datumDanas, y: aktivniDanas});
                    break;
                case 1:
                    dataPotvrdeniBp.push({x: datumDanas, y: potvrdeniDanas});
                    dataPreminuliBp.push({x: datumDanas, y: preminuliDanas});
                    dataAktivniBp.push({x: datumDanas, y: aktivniDanas});
                    break;
                case 2:
                    dataPotvrdeniDn.push({x: datumDanas, y: potvrdeniDanas});
                    dataPreminuliDn.push({x: datumDanas, y: preminuliDanas});
                    dataAktivniDn.push({x: datumDanas, y: aktivniDanas});
                    break;
                case 3:
                    dataPotvrdeniGZ.push({x: datumDanas, y: potvrdeniDanas});
                    dataPreminuliGZ.push({x: datumDanas, y: preminuliDanas});
                    dataAktivniGZ.push({x: datumDanas, y: aktivniDanas});
                    break;
                case 4:
                    dataPotvrdeniI.push({x: datumDanas, y: potvrdeniDanas});
                    dataPreminuliI.push({x: datumDanas, y: preminuliDanas});
                    dataAktivniI.push({x: datumDanas, y: aktivniDanas});
                    break;
                case 5:
                    dataPotvrdeniK.push({x: datumDanas, y: potvrdeniDanas});
                    dataPreminuliK.push({x: datumDanas, y: preminuliDanas});
                    dataAktivniK.push({x: datumDanas, y: aktivniDanas});
                    break;
                case 6:
                    dataPotvrdeniKk.push({x: datumDanas, y: potvrdeniDanas});
                    dataPreminuliKk.push({x: datumDanas, y: preminuliDanas});
                    dataAktivniKk.push({x: datumDanas, y: aktivniDanas});
                    break;
                case 7:
                    dataPotvrdeniKz.push({x: datumDanas, y: potvrdeniDanas});
                    dataPreminuliKz.push({x: datumDanas, y: preminuliDanas});
                    dataAktivniKz.push({x: datumDanas, y: aktivniDanas});
                    break;
                case 8:
                    dataPotvrdeniLs.push({x: datumDanas, y: potvrdeniDanas});
                    dataPreminuliLs.push({x: datumDanas, y: preminuliDanas});
                    dataAktivniLs.push({x: datumDanas, y: aktivniDanas});
                    break;
                case 9:
                    dataPotvrdeniM.push({x: datumDanas, y: potvrdeniDanas});
                    dataPreminuliM.push({x: datumDanas, y: preminuliDanas});
                    dataAktivniM.push({x: datumDanas, y: aktivniDanas});
                    break;
                case 10:
                    dataPotvrdeniOb.push({x: datumDanas, y: potvrdeniDanas});
                    dataPreminuliOb.push({x: datumDanas, y: preminuliDanas});
                    dataAktivniOb.push({x: datumDanas, y: aktivniDanas});
                    break;
                case 11:
                    dataPotvrdeniPs.push({x: datumDanas, y: potvrdeniDanas});
                    dataPreminuliPs.push({x: datumDanas, y: preminuliDanas});
                    dataAktivniPs.push({x: datumDanas, y: aktivniDanas});
                    break;
                case 12:
                    dataPotvrdeniPg.push({x: datumDanas, y: potvrdeniDanas});
                    dataPreminuliPg.push({x: datumDanas, y: preminuliDanas});
                    dataAktivniPg.push({x: datumDanas, y: aktivniDanas});
                    break;
                case 13:
                    dataPotvrdeniSk.push({x: datumDanas, y: potvrdeniDanas});
                    dataPreminuliSk.push({x: datumDanas, y: preminuliDanas});
                    dataAktivniSk.push({x: datumDanas, y: aktivniDanas});
                    break;
                case 14:
                    dataPotvrdeniSm.push({x: datumDanas, y: potvrdeniDanas});
                    dataPreminuliSm.push({x: datumDanas, y: preminuliDanas});
                    dataAktivniSm.push({x: datumDanas, y: aktivniDanas});
                    break;
                case 15:
                    dataPotvrdeniSd.push({x: datumDanas, y: potvrdeniDanas});
                    dataPreminuliSd.push({x: datumDanas, y: preminuliDanas});
                    dataAktivniSd.push({x: datumDanas, y: aktivniDanas});
                    break;
                case 16:
                    dataPotvrdeniV.push({x: datumDanas, y: potvrdeniDanas});
                    dataPreminuliV.push({x: datumDanas, y: preminuliDanas});
                    dataAktivniV.push({x: datumDanas, y: aktivniDanas});
                    break;
                case 17:
                    dataPotvrdeniVp.push({x: datumDanas, y: potvrdeniDanas});
                    dataPreminuliVp.push({x: datumDanas, y: preminuliDanas});
                    dataAktivniVp.push({x: datumDanas, y: aktivniDanas});
                    break;
                case 18:
                    dataPotvrdeniVs.push({x: datumDanas, y: potvrdeniDanas});
                    dataPreminuliVs.push({x: datumDanas, y: preminuliDanas});
                    dataAktivniVs.push({x: datumDanas, y: aktivniDanas});
                    break;
                case 19:
                    dataPotvrdeniZ.push({x: datumDanas, y: potvrdeniDanas});
                    dataPreminuliZ.push({x: datumDanas, y: preminuliDanas});
                    dataAktivniZ.push({x: datumDanas, y: aktivniDanas});
                    break;
                case 20:
                    dataPotvrdeniZa.push({x: datumDanas, y: potvrdeniDanas});
                    dataPreminuliZa.push({x: datumDanas, y: preminuliDanas});
                    dataAktivniZa.push({x: datumDanas, y: aktivniDanas});
                    break;
                default:
                    break;
            }
        }
    }
    chartZupanijePotvrdeni.render();
    chartZupanijePreminuli.render();
    chartZupanijeAktivni.render();

    // Primorsko-goranska
    document.getElementById("danasPotvrdeniPGZ").innerHTML = CanvasJS.formatNumber(data[0].PodaciDetaljno[12].broj_zarazenih - data[1].PodaciDetaljno[12].broj_zarazenih, "", "hr");
    document.getElementById("danasAktivniPGZ").innerHTML = CanvasJS.formatNumber(data[0].PodaciDetaljno[12].broj_aktivni, "", "hr");
    document.getElementById("danasPreminuliPGZ").innerHTML = CanvasJS.formatNumber(data[0].PodaciDetaljno[12].broj_umrlih - data[1].PodaciDetaljno[12].broj_umrlih, "", "hr");
    document.getElementById("sveukupnoPotvrdeniPGZ").innerHTML = CanvasJS.formatNumber(data[0].PodaciDetaljno[12].broj_zarazenih, "", "hr");
    document.getElementById("sveukupnoPreminuliPGZ").innerHTML = CanvasJS.formatNumber(data[0].PodaciDetaljno[12].broj_umrlih, "", "hr");
}

var chartHrvatska = new CanvasJS.StockChart("chartContainerHrvatska", {
    height: chartHeightHrvatska,
    culture: "hr",
    theme: "dark2",
    animationEnabled: true,
    animationDuration: 950,
    charts: [{
        zoomEnabled: initialZoom,
        title: {
            padding: 20,
            fontSize: 28,
            text: "Hrvatska"
        },
        axisX: {
            margin: 20,
            valueFormatString: "D. MMM",
            labelAngle: -30
        },
        legend: {
            fontSize: 14,
            cursor: "pointer",
            horizontalAlign: legendHorizontalAlign,
            verticalAlign: legendVerticalAlign,
            maxWidth: legendMaxWidthHrvatska,
            itemclick: toggleDataSeries
        },
        toolTip: {
            shared: true,
            borderColor: "black",
            backgroundColor: "rgba(20, 25, 28, 0.7)",
            cornerRadius: 5,
            contentFormatter: toolTipFormat
        },
        data: [{
            name: "Potvrđeni",
            type: "column",
            color: colors.orange,
            fillOpacity: 0.8,
            showInLegend: true,
            dataPoints: dataPotvrdeni
        },
        {
            name: "Izliječeni",
            type: "line",
            color: colors.green,
            fillOpacity: 0.7,
            showInLegend: true,
            dataPoints: dataIzlijeceni
        },
        {
            name: "Preminuli",
            type: "line",
            color: colors.red,
            fillOpacity: 0.7,
            showInLegend: true,
            dataPoints: dataPreminuli
        }]
    },
    {
        axisX: {
            margin: 20,
            valueFormatString: "D. MMM",
            labelAngle: -30
        },
        legend: {
            fontSize: 14,
            cursor: "pointer",
            horizontalAlign: legendHorizontalAlign,
            verticalAlign: legendVerticalAlign,
            maxWidth: legendMaxWidthHrvatska,
            itemclick: toggleDataSeries
        },
        toolTip: {
            shared: true,
            borderColor: "black",
            backgroundColor: "rgba(20, 25, 28, 0.7)",
            cornerRadius: 5,
            contentFormatter: toolTipFormat
        },
        data: [{
            name: "Aktivni",
            type: "area",
            color: colors.cyan,
            fillOpacity: 0.5,
            showInLegend: true,
            xValueFormatString: "D. MMMM YYYY.",
            dataPoints: dataAktivni
        }]
    }],
    rangeSelector: {
        selectedRangeButtonIndex: 1,
        buttonStyle: {
            labelFontSize: 16
        },
        buttons: [{
            range: 1,
            rangeType: "month",
            label: "1m"
        },
        {
            range: 2,
            rangeType: "month",
            label: "2m"
        },
        {
            range: 3,
            rangeType: "month",
            label: "3m"
        },
        {
            range: 6,
            rangeType: "month",
            label: "6m"
        },
        {
            range: 1,
            rangeType: "year",
            label: "1g"
        },
        {
            rangeType: "all",
            label: "Sve"
        }],
        inputFields: {
            enabled: initialInputFields,
            style: {
                fontSize: 16
            },
            valueFormatString: "DD. MMM YYYY."
        }
    },
    navigator: {
        enabled: false
    }
});

var chartZupanijePotvrdeni = new CanvasJS.StockChart("chartContainerZupanijePotvrdeni", {
    height: chartHeight,
    culture: "hr",
    theme: "dark2",
    animationEnabled: true,
    animationDuration: 950,
    charts: [{
        zoomEnabled: initialZoom,
        title: {
            padding: 30,
            fontSize: 28,
            text: "Potvrđeni"
        },
        axisX: {
            margin: 20,
            valueFormatString: "D. MMM",
            labelAngle: -30
        },
        legend: {
            fontSize: 14,
            cursor: "pointer",
            maxWidth: 200,
            itemWidth: 195,
            horizontalAlign: legendHorizontalAlign,
            verticalAlign: legendVerticalAlign,
            itemclick: toggleDataSeriesInverted
        },
        toolTip: {
            shared: true,
            borderColor: "rgba(20, 25, 28, 0.7)",
            backgroundColor: "rgba(20, 25, 28, 0.7)",
            cornerRadius: 5,
            contentFormatter: toolTipFormat
        },
        data: [{
            name: imeZupanije[0],
            type: chartTypeZupanije,
            color: colorZupanije[0],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            xValueFormatString: "D. MMMM YYYY.",
            dataPoints: dataPotvrdeniBb
        },
        {
            name: imeZupanije[1],
            type: chartTypeZupanije,
            color: colorZupanije[1],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPotvrdeniBp
        },
        {
            name: imeZupanije[2],
            type: chartTypeZupanije,
            color: colorZupanije[2],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPotvrdeniDn
        },
        {
            name: imeZupanije[3],
            type: chartTypeZupanije,
            color: colorZupanije[3],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPotvrdeniGZ
        },
        {
            name: imeZupanije[4],
            type: chartTypeZupanije,
            color: colorZupanije[4],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPotvrdeniI
        },
        {
            name: imeZupanije[5],
            type: chartTypeZupanije,
            color: colorZupanije[5],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPotvrdeniK
        },
        {
            name: imeZupanije[6],
            type: chartTypeZupanije,
            color: colorZupanije[6],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPotvrdeniKk
        },
        {
            name: imeZupanije[7],
            type: chartTypeZupanije,
            color: colorZupanije[7],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPotvrdeniKz
        },
        {
            name: imeZupanije[8],
            type: chartTypeZupanije,
            color: colorZupanije[8],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPotvrdeniLs
        },
        {
            name: imeZupanije[9],
            type: chartTypeZupanije,
            color: colorZupanije[9],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPotvrdeniM
        },
        {
            name: imeZupanije[10],
            type: chartTypeZupanije,
            color: colorZupanije[10],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPotvrdeniOb
        },
        {
            name: imeZupanije[11],
            type: chartTypeZupanije,
            color: colorZupanije[11],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPotvrdeniPs
        },
        {
            name: imeZupanije[12],
            type: chartTypeZupanije,
            color: colorZupanije[12],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPotvrdeniPg
        },
        {
            name: imeZupanije[13],
            type: chartTypeZupanije,
            color: colorZupanije[13],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPotvrdeniSk
        },
        {
            name: imeZupanije[14],
            type: chartTypeZupanije,
            color: colorZupanije[14],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPotvrdeniSm
        },
        {
            name: imeZupanije[15],
            type: chartTypeZupanije,
            color: colorZupanije[15],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPotvrdeniSd
        },
        {
            name: imeZupanije[16],
            type: chartTypeZupanije,
            color: colorZupanije[16],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPotvrdeniV
        },
        {
            name: imeZupanije[17],
            type: chartTypeZupanije,
            color: colorZupanije[17],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPotvrdeniVp
        },
        {
            name: imeZupanije[18],
            type: chartTypeZupanije,
            color: colorZupanije[18],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPotvrdeniVs
        },
        {
            name: imeZupanije[19],
            type: chartTypeZupanije,
            color: colorZupanije[19],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPotvrdeniZ
        },
        {
            name: imeZupanije[20],
            type: chartTypeZupanije,
            color: colorZupanije[20],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPotvrdeniZa
        }]
    }],
    rangeSelector: {
        selectedRangeButtonIndex: 1,
        buttonStyle: {
            labelFontSize: 16
        },
        buttons: [{
            range: 1,
            rangeType: "month",
            label: "1m"
        },
        {
            range: 2,
            rangeType: "month",
            label: "2m"
        },
        {
            range: 3,
            rangeType: "month",
            label: "3m"
        },
        {
            range: 6,
            rangeType: "month",
            label: "6m"
        },
        {
            range: 1,
            rangeType: "year",
            label: "1g"
        },
        {
            rangeType: "all",
            label: "Sve"
        }],
        inputFields: {
            enabled: initialInputFields,
            style: {
                fontSize: 16
            },
            valueFormatString: "DD. MMM YYYY."
        }
    },
    navigator: {
        enabled: false
    }
});

var chartZupanijeAktivni = new CanvasJS.StockChart("chartContainerZupanijeAktivni", {
    height: chartHeight,
    culture: "hr",
    theme: "dark2",
    animationEnabled: true,
    animationDuration: 950,
    charts: [{
        zoomEnabled: initialZoom,
        title: {
            padding: 30,
            fontSize: 28,
            text: "Aktivni"
        },
        axisX: {
            margin: 20,
            valueFormatString: "D. MMM",
            labelAngle: -30
        },
        legend: {
            fontSize: 14,
            cursor: "pointer",
            maxWidth: 200,
            itemWidth: 195,
            horizontalAlign: legendHorizontalAlign,
            verticalAlign: legendVerticalAlign,
            itemclick: toggleDataSeriesInverted
        },
        toolTip: {
            shared: true,
            borderColor: "black",
            backgroundColor: "rgba(20, 25, 28, 0.7)",
            cornerRadius: 5,
            contentFormatter: toolTipFormat
        },
        data: [{
            name: imeZupanije[0],
            type: chartTypeZupanije,
            color: colorZupanije[0],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            xValueFormatString: "D. MMMM YYYY.",
            dataPoints: dataAktivniBb
        },
        {
            name: imeZupanije[1],
            type: chartTypeZupanije,
            color: colorZupanije[1],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataAktivniBp
        },
        {
            name: imeZupanije[2],
            type: chartTypeZupanije,
            color: colorZupanije[2],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataAktivniDn
        },
        {
            name: imeZupanije[3],
            type: chartTypeZupanije,
            color: colorZupanije[3],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataAktivniGZ
        },
        {
            name: imeZupanije[4],
            type: chartTypeZupanije,
            color: colorZupanije[4],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataAktivniI
        },
        {
            name: imeZupanije[5],
            type: chartTypeZupanije,
            color: colorZupanije[5],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataAktivniK
        },
        {
            name: imeZupanije[6],
            type: chartTypeZupanije,
            color: colorZupanije[6],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataAktivniKk
        },
        {
            name: imeZupanije[7],
            type: chartTypeZupanije,
            color: colorZupanije[7],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataAktivniKz
        },
        {
            name: imeZupanije[8],
            type: chartTypeZupanije,
            color: colorZupanije[8],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataAktivniLs
        },
        {
            name: imeZupanije[9],
            type: chartTypeZupanije,
            color: colorZupanije[9],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataAktivniM
        },
        {
            name: imeZupanije[10],
            type: chartTypeZupanije,
            color: colorZupanije[10],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataAktivniOb
        },
        {
            name: imeZupanije[11],
            type: chartTypeZupanije,
            color: colorZupanije[11],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataAktivniPs
        },
        {
            name: imeZupanije[12],
            type: chartTypeZupanije,
            color: colorZupanije[12],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataAktivniPg
        },
        {
            name: imeZupanije[13],
            type: chartTypeZupanije,
            color: colorZupanije[13],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataAktivniSk
        },
        {
            name: imeZupanije[14],
            type: chartTypeZupanije,
            color: colorZupanije[14],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataAktivniSm
        },
        {
            name: imeZupanije[15],
            type: chartTypeZupanije,
            color: colorZupanije[15],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataAktivniSd
        },
        {
            name: imeZupanije[16],
            type: chartTypeZupanije,
            color: colorZupanije[16],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataAktivniV
        },
        {
            name: imeZupanije[17],
            type: chartTypeZupanije,
            color: colorZupanije[17],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataAktivniVp
        },
        {
            name: imeZupanije[18],
            type: chartTypeZupanije,
            color: colorZupanije[18],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataAktivniVs
        },
        {
            name: imeZupanije[19],
            type: chartTypeZupanije,
            color: colorZupanije[19],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataAktivniZ
        },
        {
            name: imeZupanije[20],
            type: chartTypeZupanije,
            color: colorZupanije[20],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataAktivniZa
        }]
    }],
    rangeSelector: {
        selectedRangeButtonIndex: 1,
        buttonStyle: {
            labelFontSize: 16
        },
        buttons: [{
            range: 1,
            rangeType: "month",
            label: "1m"
        },
        {
            range: 2,
            rangeType: "month",
            label: "2m"
        },
        {
            range: 3,
            rangeType: "month",
            label: "3m"
        },
        {
            range: 6,
            rangeType: "month",
            label: "6m"
        },
        {
            range: 1,
            rangeType: "year",
            label: "1g"
        },
        {
            rangeType: "all",
            label: "Sve"
        }],
        inputFields: {
            enabled: initialInputFields,
            style: {
                fontSize: 16
            },
            valueFormatString: "DD. MMM YYYY."
        }
    },
    navigator: {
        enabled: false
    }
});

var chartZupanijePreminuli = new CanvasJS.StockChart("chartContainerZupanijePreminuli", {
    height: chartHeight,
    culture: "hr",
    theme: "dark2",
    animationEnabled: true,
    animationDuration: 950,
    charts: [{
        zoomEnabled: initialZoom,
        title: {
            padding: 30,
            fontSize: 28,
            text: "Preminuli"
        },
        axisX: {
            margin: 20,
            valueFormatString: "D. MMM",
            labelAngle: -30
        },
        legend: {
            fontSize: 14,
            cursor: "pointer",
            maxWidth: 200,
            itemWidth: 195,
            horizontalAlign: legendHorizontalAlign,
            verticalAlign: legendVerticalAlign,
            itemclick: toggleDataSeriesInverted
        },
        toolTip: {
            shared: true,
            borderColor: "black",
            backgroundColor: "rgba(20, 25, 28, 0.7)",
            cornerRadius: 5,
            contentFormatter: toolTipFormat
        },
        data: [{
            name: imeZupanije[0],
            type: chartTypeZupanije,
            color: colorZupanije[0],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            xValueFormatString: "D. MMMM YYYY.",
            dataPoints: dataPreminuliBb
        },
        {
            name: imeZupanije[1],
            type: chartTypeZupanije,
            color: colorZupanije[1],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPreminuliBp
        },
        {
            name: imeZupanije[2],
            type: chartTypeZupanije,
            color: colorZupanije[2],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPreminuliDn
        },
        {
            name: imeZupanije[3],
            type: chartTypeZupanije,
            color: colorZupanije[3],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPreminuliGZ
        },
        {
            name: imeZupanije[4],
            type: chartTypeZupanije,
            color: colorZupanije[4],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPreminuliI
        },
        {
            name: imeZupanije[5],
            type: chartTypeZupanije,
            color: colorZupanije[5],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPreminuliK
        },
        {
            name: imeZupanije[6],
            type: chartTypeZupanije,
            color: colorZupanije[6],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPreminuliKk
        },
        {
            name: imeZupanije[7],
            type: chartTypeZupanije,
            color: colorZupanije[7],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPreminuliKz
        },
        {
            name: imeZupanije[8],
            type: chartTypeZupanije,
            color: colorZupanije[8],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPreminuliLs
        },
        {
            name: imeZupanije[9],
            type: chartTypeZupanije,
            color: colorZupanije[9],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPreminuliM
        },
        {
            name: imeZupanije[10],
            type: chartTypeZupanije,
            color: colorZupanije[10],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPreminuliOb
        },
        {
            name: imeZupanije[11],
            type: chartTypeZupanije,
            color: colorZupanije[11],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPreminuliPs
        },
        {
            name: imeZupanije[12],
            type: chartTypeZupanije,
            color: colorZupanije[12],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPreminuliPg
        },
        {
            name: imeZupanije[13],
            type: chartTypeZupanije,
            color: colorZupanije[13],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPreminuliSk
        },
        {
            name: imeZupanije[14],
            type: chartTypeZupanije,
            color: colorZupanije[14],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPreminuliSm
        },
        {
            name: imeZupanije[15],
            type: chartTypeZupanije,
            color: colorZupanije[15],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPreminuliSd
        },
        {
            name: imeZupanije[16],
            type: chartTypeZupanije,
            color: colorZupanije[16],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPreminuliV
        },
        {
            name: imeZupanije[17],
            type: chartTypeZupanije,
            color: colorZupanije[17],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPreminuliVp
        },
        {
            name: imeZupanije[18],
            type: chartTypeZupanije,
            color: colorZupanije[18],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPreminuliVs
        },
        {
            name: imeZupanije[19],
            type: chartTypeZupanije,
            color: colorZupanije[19],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPreminuliZ
        },
        {
            name: imeZupanije[20],
            type: chartTypeZupanije,
            color: colorZupanije[20],
            fillOpacity: chartFillOpacity,
            showInLegend: true,
            dataPoints: dataPreminuliZa
        }]
    }],
    rangeSelector: {
        selectedRangeButtonIndex: 1,
        buttonStyle: {
            labelFontSize: 16
        },
        buttons: [{
            range: 1,
            rangeType: "month",
            label: "1m"
        },
        {
            range: 2,
            rangeType: "month",
            label: "2m"
        },
        {
            range: 3,
            rangeType: "month",
            label: "3m"
        },
        {
            range: 6,
            rangeType: "month",
            label: "6m"
        },
        {
            range: 1,
            rangeType: "year",
            label: "1g"
        },
        {
            rangeType: "all",
            label: "Sve"
        }],
        inputFields: {
            enabled: initialInputFields,
            style: {
                fontSize: 16
            },
            valueFormatString: "DD. MMM YYYY."
        }
    },
    navigator: {
        enabled: false
    }
});

window.onload = function() {
    $.getJSON('https://cors-anywhere.herokuapp.com/https://www.koronavirus.hr/json/?action=podaci', addDataHrvatska);
    $.getJSON('https://cors-anywhere.herokuapp.com/https://www.koronavirus.hr/json/?action=po_danima_zupanijama', addDataZupanije);
};

var changed = false;
window.onresize = function() {
    var isCurrentBigScreen = window.innerWidth > 920;
    if (isCurrentBigScreen !== isBigScreen) {
        changed = true;
    }
    if (changed) {
        if (isCurrentBigScreen) {
            chartHrvatska.options.height = 600;
            chartHrvatska.options.charts[0].legend.horizontalAlign = "right";
            chartHrvatska.options.charts[0].legend.verticalAlign = "center";
            chartHrvatska.options.charts[1].legend.horizontalAlign = "right";
            chartHrvatska.options.charts[1].legend.verticalAlign = "center";
            chartHrvatska.options.charts[0].legend.maxWidth = 1000;
            chartHrvatska.options.rangeSelector.inputFields.enabled = true;
            chartHrvatska.options.charts[0].zoomEnabled = true;
            chartHrvatska.render();
            
            chartZupanijePotvrdeni.options.height = 500;
            chartZupanijePotvrdeni.options.charts[0].legend.horizontalAlign = "right";
            chartZupanijePotvrdeni.options.charts[0].legend.verticalAlign = "center";
            chartZupanijePotvrdeni.options.charts[0].legend.fontSize = 14;
            chartZupanijePotvrdeni.options.rangeSelector.inputFields.enabled = true;
            chartZupanijePotvrdeni.options.charts[0].zoomEnabled = true;
            chartZupanijePotvrdeni.render();
            
            chartZupanijeAktivni.options.height = 500;
            chartZupanijeAktivni.options.charts[0].legend.horizontalAlign = "right";
            chartZupanijeAktivni.options.charts[0].legend.verticalAlign = "center";
            chartZupanijeAktivni.options.charts[0].legend.fontSize = 14;
            chartZupanijeAktivni.options.rangeSelector.inputFields.enabled = true;
            chartZupanijeAktivni.options.charts[0].zoomEnabled = true;
            chartZupanijeAktivni.render();
            
            chartZupanijePreminuli.options.height = 500;
            chartZupanijePreminuli.options.charts[0].legend.horizontalAlign = "right";
            chartZupanijePreminuli.options.charts[0].legend.verticalAlign = "center";
            chartZupanijePreminuli.options.charts[0].legend.fontSize = 14;
            chartZupanijePreminuli.options.rangeSelector.inputFields.enabled = true;
            chartZupanijePreminuli.options.charts[0].zoomEnabled = true;
            chartZupanijePreminuli.render();
        } else {
            chartHrvatska.options.height = 800;
            chartHrvatska.options.charts[0].legend.horizontalAlign = "center";
            chartHrvatska.options.charts[0].legend.verticalAlign = "bottom";
            chartHrvatska.options.charts[1].legend.horizontalAlign = "center";
            chartHrvatska.options.charts[1].legend.verticalAlign = "bottom";
            chartHrvatska.options.charts[0].legend.maxWidth = 100;
            chartHrvatska.options.rangeSelector.selectedRangeButtonIndex = 0;
            chartHrvatska.options.rangeSelector.inputFields.enabled = false;
            chartHrvatska.options.charts[0].zoomEnabled = false;
            chartHrvatska.render();
            
            chartZupanijePotvrdeni.options.height = 900;
            chartZupanijePotvrdeni.options.charts[0].legend.horizontalAlign = "center";
            chartZupanijePotvrdeni.options.charts[0].legend.verticalAlign = "bottom";
            chartZupanijePotvrdeni.options.charts[0].legend.fontSize = 15;
            chartZupanijePotvrdeni.options.rangeSelector.inputFields.enabled = false;
            chartZupanijePotvrdeni.options.charts[0].zoomEnabled = false;
            chartZupanijePotvrdeni.render();
            
            chartZupanijeAktivni.options.height = 900;
            chartZupanijeAktivni.options.charts[0].legend.horizontalAlign = "center";
            chartZupanijeAktivni.options.charts[0].legend.verticalAlign = "bottom";
            chartZupanijeAktivni.options.charts[0].legend.fontSize = 15;
            chartZupanijeAktivni.options.rangeSelector.inputFields.enabled = false;
            chartZupanijeAktivni.options.charts[0].zoomEnabled = false;
            chartZupanijeAktivni.render();
            
            chartZupanijePreminuli.options.height = 900;
            chartZupanijePreminuli.options.charts[0].legend.horizontalAlign = "center";
            chartZupanijePreminuli.options.charts[0].legend.verticalAlign = "bottom";
            chartZupanijePreminuli.options.charts[0].legend.fontSize = 15;
            chartZupanijePreminuli.options.rangeSelector.inputFields.enabled = false;
            chartZupanijePreminuli.options.charts[0].zoomEnabled = false;
            chartZupanijePreminuli.render();
        }
    }
    isBigScreen = window.innerWidth > 920;
    changed = false;
};
