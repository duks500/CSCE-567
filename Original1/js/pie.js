var myConfig = {
    "graphset":[
        {
            "type":"bar",
            "plot":{
                "stacked":0,
                "line-width":2,
                "animation":{
                    "effect":"11",
                    "method":"3",
                    "sequence":"ANIMATION_BY_PLOT_AND_NODE",
                    "speed":10
                },
                "value-box":{
                    "visible":0
                }
            },
            "shapes":[
                {
                    "type":"rect",
                    "id":"animation",
                    "width":"100",
                    "height":"30",
                    "background-color":"#666 #333",
                    "border-radius":"10px",
                    "x":"50px",
                    "y":"15px",
                    "label":{
                        "text":"Start Animation",
                        "font-color":"#fff"
                    }
                }
            ],
            "series":[
                {
                    "values":[34,102,131,80,134,151,99,27,29,126,112,77,112,70,47]
                },
                {
                    "values":[186,118,189,65,109,129,74,195,65,141,76,194,134,155,99]
                },
                {
                    "values":[245,137,126,233,168,141,186,221,153,155,135,153,130,233,154]
                },
                {
                    "values":[191,251,226,168,239,283,148,155,269,165,150,232,221,207,227]
                }
            ]
        }
    ]
};

zingchart.render({
    id : 'myChart',
    data : myConfig,
    height : "100%",
    width: "100%"
});

zingchart.shape_click = function(p) {
    if (p.shapeid == 'animation') {
        zingchart.exec('myChart', 'reload');
    }
}