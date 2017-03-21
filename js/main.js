//Scroll stars
$(window).scroll(function() {
    scroll = -((jQuery(window).scrollTop() / 3));
    $(".scoll").each(function() {
        $(this).css("background-position-y", scroll / $(this).data("scroll-speed"))
    });
});

/*
filedrag.js - HTML5 File Drag & Drop demonstration
Featured on SitePoint.com
Developed by Craig Buckler (@craigbuckler) of OptimalWorks.net
*/
(function() {

    // getElementById
    function $id(id) {
        return document.getElementById(id);
    }


    // output information
    function Output(msg) {
        var m = $id("messages");
        m.innerHTML = msg + m.innerHTML;
    }


    // file drag hover
    function FileDragHover(e) {
        e.stopPropagation();
        e.preventDefault();
        e.target.className = (e.type == "dragover" ? "hover" : "");
    }


    // file selection
    function FileSelectHandler(e) {

        // cancel event and hover styling
        FileDragHover(e);

        // fetch FileList object
        var files = e.target.files || e.dataTransfer.files;

        // process all File objects
        for (var i = 0, f; f = files[i]; i++) {
            ParseFile(f);
        }

    }


    // output file information
    function ParseFile(file) {
        var d = document.getElementById("filedrag");
        d.className += " uploaded";
        d.innerHTML = "Loading...";
        setTimeout(function() {
            Output(
                "<p>File information: <strong>" + file.name +
                "</strong> type: <strong>" + file.type +
                "</strong> size: <strong>" + file.size +
                "</strong> bytes</p>"
            );

            d.innerHTML = "Ready";
        }, 3000);
    }


    // initialize
    function Init() {

        var fileselect = $id("fileselect"),
            filedrag = $id("filedrag"),
            submitbutton = $id("submitbutton");

        // file select
        fileselect.addEventListener("change", FileSelectHandler, false);

        // is XHR2 available?
        var xhr = new XMLHttpRequest();
        if (xhr.upload) {

            // file drop
            filedrag.addEventListener("dragover", FileDragHover, false);
            filedrag.addEventListener("dragleave", FileDragHover, false);
            filedrag.addEventListener("drop", FileSelectHandler, false);
            filedrag.style.display = "block";

            // remove submit button
            submitbutton.style.display = "none";
        }

    }

    // call initialization file
    if (window.File && window.FileList && window.FileReader) {
        Init();
    }


})();


//D3 

var w = 400,
    h = 400;

var circleWidth = 5;

var palette = {
    "lightgray": "#819090",
    "gray": "#708284",
    "mediumgray": "#536870",
    "darkgray": "#475B62",

    "darkblue": "#0A2933",
    "darkerblue": "#042029",

    "paleryellow": "#FCF4DC",
    "paleyellow": "#EAE3CB",
    "yellow": "#A57706",
    "orange": "#BD3613",
    "red": "#D11C24",
    "pink": "#C61C6F",
    "purple": "#595AB7",
    "blue": "blue",
    "green": "#259286",
    "yellowgreen": "#738A05",
    "white": "#fff"
}

var nodes = [
    { name: "Parent" },
    { name: "child1" },
    { name: "child2", target: [0] },
    { name: "child3", target: [0] },
    { name: "child4", target: [1] },
    { name: "child5", target: [0, 1, 2, 3] }
];

var links = [];

for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].target !== undefined) {
        for (var x = 0; x < nodes[i].target.length; x++) {
            links.push({
                source: nodes[i],
                target: nodes[nodes[i].target[x]]
            })
        }
    }
}

var myChart = d3.select('#chart')
    .append('svg')
    .attr('width', w)
    .attr('height', h)

var force = d3.layout.force()
    .nodes(nodes)
    .links([])
    .gravity(0.3)
    .charge(-1000)
    .size([w, h])

var link = myChart.selectAll('line')
    .data(links).enter().append('line')
    .attr('stroke', palette.white)

var node = myChart.selectAll('circle')
    .data(nodes).enter()
    .append('g')
    .call(force.drag);

node.append('circle')
    .attr('cx', function(d) {
        return d.x;
    })
    .attr('cy', function(d) {
        return d.y;
    })
    .attr('r', circleWidth)
    .attr('fill', palette.white)

force.on('tick', function(e) {
    node.attr('transform', function(d, i) {
        return 'translate(' + d.x + ', ' + d.y + ')';
    })

    link
        .attr('x1', function(d) {
            return d.source.x
        })
        .attr('y1', function(d) {
            return d.source.y
        })
        .attr('x2', function(d) {
            return d.target.x
        })
        .attr('y2', function(d) {
            return d.target.y
        })
})

//http://imakewebthings.com/waypoints/guides/getting-started/
$('#chart').waypoint(function() {
    force.start();
}, {
    offset: '70%'
});