'use strict';
var Xray = require('x-ray');
var x = Xray();

exports.allsvenskan_standings = function(req, res) {
/* Scrape the table. */
	x('http://www.svt.se/svttext/web/pages/343.html',  '.root',
	{
		rows: ['span']
	})(function(err, obj){
        if (err) {
            res.send(err);
        } else {
            var items = [];
            for (var i = 4; i < obj.rows.length -3; i++) {
                var current = obj.rows[i];
                //At this point 'current' looks like this "PPTTTTTTTTTTTTTTTRR_WW_DD_LL__GS_GC__PP"
                var tmp = {
                    position: current.substring(0,2).trim(),
                    team: current.substring(2,17).trim(),
                    round: current.substring(17,19).trim(),
                    win: current.substring(20,22).trim(),
                    draw: current.substring(23,25).trim(),
                    loss: current.substring(26,28).trim(),
                    gm: current.substring(30,32).trim(),
                    im: current.substring(33,35).trim(),
                    points: current.substring(37,39).trim()
                };
                tmp.ms = (tmp.gm - tmp.im);
                items.push(tmp);
            };
            // Write to json
            const to_string = '{ "result": { "round": "latest", "item":' + JSON.stringify(items) + '}}';
            res.send(to_string);
        }
	});
};

exports.bandy_elitserien_standings = function(req, res) {
/* Scrape the table. */
	x('http://www.svt.se/svttext/web/pages/368.html',  '.sub',
	{
		rows: ['span']
	})(function(err, obj){
        if (err) {
            res.send(err);
        } else {
            var items = [];
            for (var i = 5; i < obj.rows.length -3; i++) {
                var current = obj.rows[i];
                //At this point 'current' looks like this "PPTTTTTTTTTTTTTTTRR_WW_DD_LL__GS_GC__PP"
                var tmp = {
                    position: current.substring(0,2).trim(),
                    team: current.substring(2,14).trim(),
                    round: current.substring(14,16).trim(),
                    win: current.substring(17,19).trim(),
                    draw: current.substring(20,22).trim(),
                    loss: current.substring(23,25).trim(),
                    gm: current.substring(27,29).trim(),
                    im: current.substring(30,32).trim(),
                    points: current.substring(35,39).trim()
                };
                tmp.ms = (tmp.gm - tmp.im);
                items.push(tmp);
            };
            // Write to json
            const to_string = '{ "result": { "round": "latest", "item":' + JSON.stringify(items) + '}}';
            res.send(to_string);
        }
	});
};
