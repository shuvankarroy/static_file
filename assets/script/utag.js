//tealium universal tag - utag.loader ut4.0.202003101655, Copyright 2020 Tealium.com Inc. All Rights Reserved.
var utag_condload = false;
if (typeof utag == "undefined" && !utag_condload) {
    var utag = {
        id: "shopify.main",
        o: {},
        sender: {},
        send: {},
        rpt: {
            ts: {
                a: new Date()
            }
        },
        dbi: [],
        db_log: [],
        loader: {
            q: [],
            lc: 0,
            f: {},
            p: 0,
            ol: 0,
            wq: [],
            lq: [],
            bq: {},
            bk: {},
            rf: 0,
            ri: 0,
            rp: 0,
            rq: [],
            ready_q: [],
            sendq: {
                "pending": 0
            },
            run_ready_q: function() {
                for (var i = 0; i < utag.loader.ready_q.length; i++) {
                    utag.DB("READY_Q:" + i);
                    try {
                        utag.loader.ready_q[i]()
                    } catch (e) {
                        utag.DB(e)
                    };
                }
            },
            lh: function(a, b, c) {
                a = "" + location.hostname;
                b = a.split(".");
                c = (/\.co\.|\.com\.|\.org\.|\.edu\.|\.net\.|\.asn\.|\...\.jp$/.test(a)) ? 3 : 2;
                return b.splice(b.length - c, c).join(".");
            },
            WQ: function(a, b, c, d, g) {
                utag.DB('WQ:' + utag.loader.wq.length);
                try {
                    if (utag.udoname && utag.udoname.indexOf(".") < 0) {
                        utag.ut.merge(utag.data, window[utag.udoname], 0);
                    }
                    if (utag.cfg.load_rules_at_wait) {
                        utag.handler.LR(utag.data);
                    }
                } catch (e) {
                    utag.DB(e)
                };
                d = 0;
                g = [];
                for (a = 0; a < utag.loader.wq.length; a++) {
                    b = utag.loader.wq[a];
                    b.load = utag.loader.cfg[b.id].load;
                    if (b.load == 4) {
                        this.f[b.id] = 0;
                        utag.loader.LOAD(b.id)
                    } else if (b.load > 0) {
                        g.push(b);
                        d++;
                    } else {
                        this.f[b.id] = 1;
                    }
                }
                for (a = 0; a < g.length; a++) {
                    utag.loader.AS(g[a]);
                }
                if (d == 0) {
                    utag.loader.END();
                }
            },
            AS: function(a, b, c, d) {
                utag.send[a.id] = a;
                if (typeof a.src == 'undefined') {
                    a.src = utag.cfg.path + ((typeof a.name != 'undefined') ? a.name : 'ut' + 'ag.' + a.id + '.js')
                }
                a.src += (a.src.indexOf('?') > 0 ? '&' : '?') + 'utv=' + (a.v ? utag.cfg.template + a.v : utag.cfg.v);
                utag.rpt['l_' + a.id] = a.src;
                b = document;
                this.f[a.id] = 0;
                if (a.load == 2) {
                    utag.DB("Attach sync: " + a.src);
                    a.uid = a.id;
                    b.write('<script id="utag_' + a.id + '" src="' + a.src + '"></scr' + 'ipt>')
                    if (typeof a.cb != 'undefined') a.cb();
                } else if (a.load == 1 || a.load == 3) {
                    if (b.createElement) {
                        c = 'utag_shopify.main_' + a.id;
                        if (!b.getElementById(c)) {
                            d = {
                                src: a.src,
                                id: c,
                                uid: a.id,
                                loc: a.loc
                            }
                            if (a.load == 3) {
                                d.type = "iframe"
                            };
                            if (typeof a.cb != 'undefined') d.cb = a.cb;
                            utag.ut.loader(d);
                        }
                    }
                }
            },
            GV: function(a, b, c) {
                b = {};
                for (c in a) {
                    if (a.hasOwnProperty(c) && typeof a[c] != "function") b[c] = a[c];
                }
                return b
            },
            OU: function(tid, tcat, a, b, c, d, f, g) {
                g = {};
                utag.loader.RDcp(g);
                try {
                    if (typeof g['cp.OPTOUTMULTI'] != 'undefined') {
                        c = utag.loader.cfg;
                        a = utag.ut.decode(g['cp.OPTOUTMULTI']).split('|');
                        for (d = 0; d < a.length; d++) {
                            b = a[d].split(':');
                            if (b[1] * 1 !== 0) {
                                if (b[0].indexOf('c') == 0) {
                                    for (f in utag.loader.GV(c)) {
                                        if (c[f].tcat == b[0].substring(1)) c[f].load = 0;
                                        if (c[f].tid == tid && c[f].tcat == b[0].substring(1)) return true;
                                    }
                                    if (tcat == b[0].substring(1)) return true;
                                } else if (b[0] * 1 == 0) {
                                    utag.cfg.nocookie = true
                                } else {
                                    for (f in utag.loader.GV(c)) {
                                        if (c[f].tid == b[0]) c[f].load = 0
                                    }
                                    if (tid == b[0]) return true;
                                }
                            }
                        }
                    }
                } catch (e) {
                    utag.DB(e)
                }
                return false;
            },
            RDdom: function(o) {
                var d = document || {},
                    l = location || {};
                o["dom.referrer"] = d.referrer;
                o["dom.title"] = "" + d.title;
                o["dom.domain"] = "" + l.hostname;
                o["dom.query_string"] = ("" + l.search).substring(1);
                o["dom.hash"] = ("" + l.hash).substring(1);
                o["dom.url"] = "" + d.URL;
                o["dom.pathname"] = "" + l.pathname;
                o["dom.viewport_height"] = window.innerHeight || (d.documentElement ? d.documentElement.clientHeight : 960);
                o["dom.viewport_width"] = window.innerWidth || (d.documentElement ? d.documentElement.clientWidth : 960);
            },
            RDcp: function(o, b, c, d) {
                b = utag.loader.RC();
                for (d in b) {
                    if (d.match(/utag_(.*)/)) {
                        for (c in utag.loader.GV(b[d])) {
                            o["cp.utag_" + RegExp.$1 + "_" + c] = b[d][c];
                        }
                    }
                }
                for (c in utag.loader.GV((utag.cl && !utag.cl['_all_']) ? utag.cl : b)) {
                    if (c.indexOf("utag_") < 0 && typeof b[c] != "undefined") o["cp." + c] = b[c];
                }
            },
            RDqp: function(o, a, b, c) {
                a = location.search + (location.hash + '').replace("#", "&");
                if (utag.cfg.lowerqp) {
                    a = a.toLowerCase()
                };
                if (a.length > 1) {
                    b = a.substring(1).split('&');
                    for (a = 0; a < b.length; a++) {
                        c = b[a].split("=");
                        if (c.length > 1) {
                            o["qp." + c[0]] = utag.ut.decode(c[1])
                        }
                    }
                }
            },
            RDmeta: function(o, a, b, h) {
                a = document.getElementsByTagName("meta");
                for (b = 0; b < a.length; b++) {
                    try {
                        h = a[b].name || a[b].getAttribute("property") || "";
                    } catch (e) {
                        h = "";
                        utag.DB(e)
                    };
                    if (utag.cfg.lowermeta) {
                        h = h.toLowerCase()
                    };
                    if (h != "") {
                        o["meta." + h] = a[b].content
                    }
                }
            },
            RDva: function(o) {
                var readAttr = function(o, l) {
                    var a = "",
                        b;
                    a = localStorage.getItem(l);
                    if (!a || a == "{}") return;
                    b = utag.ut.flatten({
                        va: JSON.parse(a)
                    });
                    utag.ut.merge(o, b, 1);
                }
                try {
                    readAttr(o, "tealium_va");
                    readAttr(o, "tealium_va_" + o["ut.account"] + "_" + o["ut.profile"]);
                } catch (e) {
                    utag.DB(e)
                }
            },
            RDut: function(o, a) {
                var t = {};
                var d = new Date();
                var m = (utag.ut.typeOf(d.toISOString) == "function");
                o["ut.domain"] = utag.cfg.domain;
                o["ut.version"] = utag.cfg.v;
                t["tealium_event"] = o["ut.event"] = a || "view";
                t["tealium_visitor_id"] = o["ut.visitor_id"] = o["cp.utag_main_v_id"];
                t["tealium_session_id"] = o["ut.session_id"] = o["cp.utag_main_ses_id"];
                t["tealium_session_number"] = o["cp.utag_main__sn"];
                t["tealium_session_event_number"] = o["cp.utag_main__se"];
                try {
                    t["tealium_datasource"] = utag.cfg.datasource;
                    t["tealium_account"] = o["ut.account"] = utag.cfg.utid.split("/")[0];
                    t["tealium_profile"] = o["ut.profile"] = utag.cfg.utid.split("/")[1];
                    t["tealium_environment"] = o["ut.env"] = utag.cfg.path.split("/")[6];
                } catch (e) {
                    utag.DB(e)
                }
                t["tealium_random"] = Math.random().toFixed(16).substring(2);
                t["tealium_library_name"] = "ut" + "ag.js";
                t["tealium_library_version"] = (utag.cfg.template + "0").substring(2);
                t["tealium_timestamp_epoch"] = Math.floor(d.getTime() / 1000);
                t["tealium_timestamp_utc"] = (m ? d.toISOString() : "");
                d.setHours(d.getHours() - (d.getTimezoneOffset() / 60));
                t["tealium_timestamp_local"] = (m ? d.toISOString().replace("Z", "") : "");
                utag.ut.merge(o, t, 0);
            },
            RDses: function(o, a, c) {
                a = (new Date()).getTime();
                c = (a + parseInt(utag.cfg.session_timeout)) + "";
                if (!o["cp.utag_main_ses_id"]) {
                    o["cp.utag_main_ses_id"] = a + "";
                    o["cp.utag_main__ss"] = "1";
                    o["cp.utag_main__se"] = "1";
                    o["cp.utag_main__sn"] = (1 + parseInt(o["cp.utag_main__sn"] || 0)) + "";
                } else {
                    o["cp.utag_main__ss"] = "0";
                    o["cp.utag_main__se"] = (1 + parseInt(o["cp.utag_main__se"] || 0)) + "";
                }
                o["cp.utag_main__pn"] = o["cp.utag_main__pn"] || "1";
                o["cp.utag_main__st"] = c;
                utag.loader.SC("utag_main", {
                    "_sn": (o["cp.utag_main__sn"] || 1),
                    "_se": o["cp.utag_main__se"],
                    "_ss": o["cp.utag_main__ss"],
                    "_st": c,
                    "ses_id": (o["cp.utag_main_ses_id"] || a) + ";exp-session",
                    "_pn": o["cp.utag_main__pn"] + ";exp-session"
                });
            },
            RDpv: function(o) {
                if (typeof utag.pagevars == "function") {
                    utag.DB("Read page variables");
                    utag.pagevars(o);
                }
            },
            RD: function(o, a) {
                utag.DB("utag.loader.RD");
                utag.DB(o);
                utag.loader.RDcp(o);
                if (!utag.loader.rd_flag) {
                    utag.loader.rd_flag = 1;
                    o["cp.utag_main_v_id"] = o["cp.utag_main_v_id"] || utag.ut.vi((new Date()).getTime());
                    o["cp.utag_main__pn"] = (1 + parseInt(o["cp.utag_main__pn"] || 0)) + "";
                    utag.loader.SC("utag_main", {
                        "v_id": o["cp.utag_main_v_id"]
                    });
                    utag.loader.RDses(o);
                }
                if (a && !utag.cfg.noview) utag.loader.RDses(o);
                utag.loader.RDqp(o);
                utag.loader.RDmeta(o);
                utag.loader.RDdom(o);
                utag.loader.RDut(o, a || "view");
                utag.loader.RDpv(o);
                utag.loader.RDva(o);
            },
            RC: function(a, x, b, c, d, e, f, g, h, i, j, k, l, m, n, o, v, ck, cv, r, s, t) {
                o = {};
                b = ("" + document.cookie != "") ? (document.cookie).split("; ") : [];
                r = /^(.*?)=(.*)$/;
                s = /^(.*);exp-(.*)$/;
                t = (new Date()).getTime();
                for (c = 0; c < b.length; c++) {
                    if (b[c].match(r)) {
                        ck = RegExp.$1;
                        cv = RegExp.$2;
                    }
                    e = utag.ut.decode(cv);
                    if (typeof ck != "undefined") {
                        if (ck.indexOf("ulog") == 0 || ck.indexOf("utag_") == 0) {
                            e = cv.split("$");
                            g = [];
                            j = {};
                            for (f = 0; f < e.length; f++) {
                                try {
                                    g = e[f].split(":");
                                    if (g.length > 2) {
                                        g[1] = g.slice(1).join(":");
                                    }
                                    v = "";
                                    if (("" + g[1]).indexOf("~") == 0) {
                                        h = g[1].substring(1).split("|");
                                        for (i = 0; i < h.length; i++) h[i] = utag.ut.decode(h[i]);
                                        v = h
                                    } else v = utag.ut.decode(g[1]);
                                    j[g[0]] = v;
                                } catch (er) {
                                    utag.DB(er)
                                };
                            }
                            o[ck] = {};
                            for (f in utag.loader.GV(j)) {
                                if (j[f] instanceof Array) {
                                    n = [];
                                    for (m = 0; m < j[f].length; m++) {
                                        if (j[f][m].match(s)) {
                                            k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : t - 1) : parseInt(RegExp.$2);
                                            if (k > t) n[m] = (x == 0) ? j[f][m] : RegExp.$1;
                                        }
                                    }
                                    j[f] = n.join("|");
                                } else {
                                    j[f] = "" + j[f];
                                    if (j[f].match(s)) {
                                        k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : t - 1) : parseInt(RegExp.$2);
                                        j[f] = (k < t) ? null : (x == 0 ? j[f] : RegExp.$1);
                                    }
                                }
                                if (j[f]) o[ck][f] = j[f];
                            }
                        } else if (utag.cl[ck] || utag.cl['_all_']) {
                            o[ck] = e
                        }
                    }
                }
                return (a) ? (o[a] ? o[a] : {}) : o;
            },
            SC: function(a, b, c, d, e, f, g, h, i, j, k, x, v) {
                if (!a) return 0;
                if (a == "utag_main" && utag.cfg.nocookie) return 0;
                v = "";
                var date = new Date();
                var exp = new Date();
                exp.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
                x = exp.toGMTString();
                if (c && c == "da") {
                    x = "Thu, 31 Dec 2009 00:00:00 GMT";
                } else if (a.indexOf("utag_") != 0 && a.indexOf("ulog") != 0) {
                    if (typeof b != "object") {
                        v = b
                    }
                } else {
                    d = utag.loader.RC(a, 0);
                    for (e in utag.loader.GV(b)) {
                        f = "" + b[e];
                        if (f.match(/^(.*);exp-(\d+)(\w)$/)) {
                            g = date.getTime() + parseInt(RegExp.$2) * ((RegExp.$3 == "h") ? 3600000 : 86400000);
                            if (RegExp.$3 == "u") g = parseInt(RegExp.$2);
                            f = RegExp.$1 + ";exp-" + g;
                        }
                        if (c == "i") {
                            if (d[e] == null) d[e] = f;
                        } else if (c == "d") delete d[e];
                        else if (c == "a") d[e] = (d[e] != null) ? (f - 0) + (d[e] - 0) : f;
                        else if (c == "ap" || c == "au") {
                            if (d[e] == null) d[e] = f;
                            else {
                                if (d[e].indexOf("|") > 0) {
                                    d[e] = d[e].split("|")
                                }
                                g = (d[e] instanceof Array) ? d[e] : [d[e]];
                                g.push(f);
                                if (c == "au") {
                                    h = {};
                                    k = {};
                                    for (i = 0; i < g.length; i++) {
                                        if (g[i].match(/^(.*);exp-(.*)$/)) {
                                            j = RegExp.$1;
                                        }
                                        if (typeof k[j] == "undefined") {
                                            k[j] = 1;
                                            h[g[i]] = 1;
                                        }
                                    }
                                    g = [];
                                    for (i in utag.loader.GV(h)) {
                                        g.push(i);
                                    }
                                }
                                d[e] = g
                            }
                        } else d[e] = f;
                    }
                    h = new Array();
                    for (g in utag.loader.GV(d)) {
                        if (d[g] instanceof Array) {
                            for (c = 0; c < d[g].length; c++) {
                                d[g][c] = encodeURIComponent(d[g][c])
                            }
                            h.push(g + ":~" + d[g].join("|"))
                        } else h.push((g + ":").replace(/[\,\$\;\?]/g, "") + encodeURIComponent(d[g]))
                    }
                    if (h.length == 0) {
                        h.push("");
                        x = ""
                    }
                    v = (h.join("$"));
                }
                document.cookie = a + "=" + v + ";path=/;domain=" + utag.cfg.domain + ";expires=" + x;
                return 1
            },
            LOAD: function(a, b, c, d) {
                if (!utag.loader.cfg) {
                    return
                }
                if (this.ol == 0) {
                    if (utag.loader.cfg[a].block && utag.loader.cfg[a].cbf) {
                        this.f[a] = 1;
                        delete utag.loader.bq[a];
                    }
                    for (b in utag.loader.GV(utag.loader.bq)) {
                        if (utag.loader.cfg[a].load == 4 && utag.loader.cfg[a].wait == 0) {
                            utag.loader.bk[a] = 1;
                            utag.DB("blocked: " + a);
                        }
                        utag.DB("blocking: " + b);
                        return;
                    }
                    utag.loader.INIT();
                    return;
                }
                utag.DB('utag.loader.LOAD:' + a);
                if (this.f[a] == 0) {
                    this.f[a] = 1;
                    if (utag.cfg.noview != true) {
                        if (utag.loader.cfg[a].send) {
                            utag.DB("SENDING: " + a);
                            try {
                                if (utag.loader.sendq.pending > 0 && utag.loader.sendq[a]) {
                                    utag.DB("utag.loader.LOAD:sendq: " + a);
                                    while (d = utag.loader.sendq[a].shift()) {
                                        utag.DB(d);
                                        utag.sender[a].send(d.event, utag.handler.C(d.data));
                                        utag.loader.sendq.pending--;
                                    }
                                } else {
                                    utag.sender[a].send('view', utag.handler.C(utag.data));
                                }
                                utag.rpt['s_' + a] = 0;
                            } catch (e) {
                                utag.DB(e);
                                utag.rpt['s_' + a] = 1;
                            }
                        }
                    }
                    if (utag.loader.rf == 0) return;
                    for (b in utag.loader.GV(this.f)) {
                        if (this.f[b] == 0 || this.f[b] == 2) return
                    }
                    utag.loader.END();
                }
            },
            EV: function(a, b, c, d) {
                if (b == "ready") {
                    if (!utag.data) {
                        try {
                            utag.cl = {
                                '_all_': 1
                            };
                            utag.loader.initdata();
                            utag.loader.RD(utag.data);
                        } catch (e) {
                            utag.DB(e)
                        };
                    }
                    if ((document.attachEvent || utag.cfg.dom_complete) ? document.readyState === "complete" : document.readyState !== "loading") setTimeout(c, 1);
                    else {
                        utag.loader.ready_q.push(c);
                        var RH;
                        if (utag.loader.ready_q.length <= 1) {
                            if (document.addEventListener) {
                                RH = function() {
                                    document.removeEventListener("DOMContentLoaded", RH, false);
                                    utag.loader.run_ready_q()
                                };
                                if (!utag.cfg.dom_complete) document.addEventListener("DOMContentLoaded", RH, false);
                                window.addEventListener("load", utag.loader.run_ready_q, false);
                            } else if (document.attachEvent) {
                                RH = function() {
                                    if (document.readyState === "complete") {
                                        document.detachEvent("onreadystatechange", RH);
                                        utag.loader.run_ready_q()
                                    }
                                };
                                document.attachEvent("onreadystatechange", RH);
                                window.attachEvent("onload", utag.loader.run_ready_q);
                            }
                        }
                    }
                } else {
                    if (a.addEventListener) {
                        a.addEventListener(b, c, false)
                    } else if (a.attachEvent) {
                        a.attachEvent(((d == 1) ? "" : "on") + b, c)
                    }
                }
            },
            END: function(b, c, d, e, v, w) {
                if (this.ended) {
                    return
                };
                this.ended = 1;
                utag.DB("loader.END");
                b = utag.data;
                if (utag.handler.base && utag.handler.base != '*') {
                    e = utag.handler.base.split(",");
                    for (d = 0; d < e.length; d++) {
                        if (typeof b[e[d]] != "undefined") utag.handler.df[e[d]] = b[e[d]]
                    }
                } else if (utag.handler.base == '*') {
                    utag.ut.merge(utag.handler.df, b, 1);
                }
                utag.rpt['r_0'] = "t";
                for (var r in utag.loader.GV(utag.cond)) {
                    utag.rpt['r_' + r] = (utag.cond[r]) ? "t" : "f";
                }
                utag.rpt.ts['s'] = new Date();
                v = utag.cfg.path;
                w = v.indexOf(".tiqcdn.");
                if (w > 0 && b["cp.utag_main__ss"] == 1 && !utag.cfg.no_session_count) utag.ut.loader({
                    src: v.substring(0, v.indexOf("/ut" + "ag/") + 6) + "tiqapp/ut" + "ag.v.js?a=" + utag.cfg.utid + (utag.cfg.nocookie ? "&nocookie=1" : "&cb=" + (new Date).getTime()),
                    id: "tiqapp"
                })
                if (utag.cfg.noview != true) utag.handler.RE('view', b, "end");
                utag.handler.INIT();
            }
        },
        DB: function(a, b) {
            if (utag.cfg.utagdb === false) {
                return;
            } else if (typeof utag.cfg.utagdb == "undefined") {
                b = document.cookie + '';
                utag.cfg.utagdb = ((b.indexOf('utagdb=true') >= 0) ? true : false);
            }
            if (utag.cfg.utagdb === true) {
                var t;
                if (utag.ut.typeOf(a) == "object") {
                    t = utag.handler.C(a)
                } else {
                    t = a
                }
                utag.db_log.push(t);
                try {
                    if (!utag.cfg.noconsole) console.log(t)
                } catch (e) {}
            }
        },
        RP: function(a, b, c) {
            if (typeof a != 'undefined' && typeof a.src != 'undefined' && a.src != '') {
                b = [];
                for (c in utag.loader.GV(a)) {
                    if (c != 'src') b.push(c + '=' + escape(a[c]))
                }
                this.dbi.push((new Image()).src = a.src + '?utv=' + utag.cfg.v + '&utid=' + utag.cfg.utid + '&' + (b.join('&')))
            }
        },
        view: function(a, c, d) {
            return this.track({
                event: 'view',
                data: a || {},
                cfg: {
                    cb: c,
                    uids: d
                }
            })
        },
        link: function(a, c, d) {
            return this.track({
                event: 'link',
                data: a || {},
                cfg: {
                    cb: c,
                    uids: d
                }
            })
        },
        track: function(a, b, c, d, e) {
            a = a || {};
            if (typeof a == "string") {
                a = {
                    event: a,
                    data: b || {},
                    cfg: {
                        cb: c,
                        uids: d
                    }
                }
            }
            for (e in utag.loader.GV(utag.o)) {
                utag.o[e].handler.trigger(a.event || "view", a.data || a, a.cfg || {
                    cb: b,
                    uids: c
                })
            }
            a.cfg = a.cfg || {
                cb: b
            };
            if (typeof a.cfg.cb == "function") a.cfg.cb();
            return true
        },
        handler: {
            base: "",
            df: {},
            o: {},
            send: {},
            iflag: 0,
            INIT: function(a, b, c) {
                utag.DB('utag.handler.INIT');
                if (utag.initcatch) {
                    utag.initcatch = 0;
                    return
                }
                this.iflag = 1;
                a = utag.loader.q.length;
                if (a > 0) {
                    utag.DB("Loader queue");
                    for (b = 0; b < a; b++) {
                        c = utag.loader.q[b];
                        utag.handler.trigger(c.a, c.b, c.c)
                    }
                }
            },
            test: function() {
                return 1
            },
            LR: function(b) {
                utag.DB("Load Rules");
                for (var d in utag.loader.GV(utag.cond)) {
                    utag.cond[d] = false;
                }
                utag.DB(b);
                utag.loader.loadrules(b);
                utag.DB(utag.cond);
                utag.loader.initcfg();
                utag.loader.OU();
                for (var r in utag.loader.GV(utag.cond)) {
                    utag.rpt['r_' + r] = (utag.cond[r]) ? "t" : "f";
                }
            },
            RE: function(a, b, c, d, e, f, g) {
                if (c != "alr" && !this.cfg_extend) {
                    return 0;
                }
                utag.DB("RE: " + c);
                if (c == "alr") utag.DB("All Tags EXTENSIONS");
                utag.DB(b);
                if (typeof this.extend != "undefined") {
                    g = 0;
                    for (d = 0; d < this.extend.length; d++) {
                        try {
                            e = 0;
                            if (typeof this.cfg_extend != "undefined") {
                                f = this.cfg_extend[d];
                                if (typeof f.count == "undefined") f.count = 0;
                                if (f[a] == 0 || (f.once == 1 && f.count > 0) || f[c] == 0) {
                                    e = 1
                                } else {
                                    if (f[c] == 1) {
                                        g = 1
                                    };
                                    f.count++
                                }
                            }
                            if (e != 1) {
                                this.extend[d](a, b);
                                utag.rpt['ex_' + d] = 0
                            }
                        } catch (er) {
                            utag.DB(er);
                            utag.rpt['ex_' + d] = 1;
                            utag.ut.error({
                                e: er.message,
                                s: utag.cfg.path + 'utag.js',
                                l: d,
                                t: 'ge'
                            });
                        }
                    }
                    utag.DB(b);
                    return g;
                }
            },
            trigger: function(a, b, c, d, e, f) {
                utag.DB('trigger:' + a + (c && c.uids ? ":" + c.uids.join(",") : ""));
                b = b || {};
                utag.DB(b);
                if (!this.iflag) {
                    utag.DB("trigger:called before tags loaded");
                    for (d in utag.loader.f) {
                        if (!(utag.loader.f[d] === 1)) utag.DB('Tag ' + d + ' did not LOAD')
                    }
                    utag.loader.q.push({
                        a: a,
                        b: utag.handler.C(b),
                        c: c
                    });
                    return;
                }
                utag.ut.merge(b, this.df, 0);
                utag.loader.RD(b, a);
                utag.cfg.noview = false;

                function sendTag(a, b, d) {
                    try {
                        if (typeof utag.sender[d] != "undefined") {
                            utag.DB("SENDING: " + d);
                            utag.sender[d].send(a, utag.handler.C(b));
                            utag.rpt['s_' + d] = 0;
                        } else if (utag.loader.cfg[d].load != 2) {
                            utag.loader.sendq[d] = utag.loader.sendq[d] || [];
                            utag.loader.sendq[d].push({
                                "event": a,
                                "data": utag.handler.C(b)
                            });
                            utag.loader.sendq.pending++;
                            utag.loader.AS({
                                id: d,
                                load: 1
                            });
                        }
                    } catch (e) {
                        utag.DB(e)
                    }
                }
                if (c && c.uids) {
                    this.RE(a, b, "alr");
                    for (f = 0; f < c.uids.length; f++) {
                        d = c.uids[f];
                        if (!utag.loader.OU(utag.loader.cfg[d].tid)) {
                            sendTag(a, b, d);
                        }
                    }
                } else if (utag.cfg.load_rules_ajax) {
                    this.RE(a, b, "blr");
                    this.LR(b);
                    this.RE(a, b, "alr");
                    for (f = 0; f < utag.loader.cfgsort.length; f++) {
                        d = utag.loader.cfgsort[f];
                        if (utag.loader.cfg[d].load && utag.loader.cfg[d].send) {
                            sendTag(a, b, d);
                        }
                    }
                } else {
                    this.RE(a, b, "alr");
                    for (d in utag.loader.GV(utag.sender)) {
                        sendTag(a, b, d);
                    }
                }
                this.RE(a, b, "end");
            },
            C: function(a, b, c) {
                b = {};
                for (c in utag.loader.GV(a)) {
                    if (a[c] instanceof Array) {
                        b[c] = a[c].slice(0)
                    } else {
                        b[c] = a[c]
                    }
                }
                return b
            }
        },
        ut: {
            pad: function(a, b, c, d) {
                a = "" + ((a - 0).toString(16));
                d = '';
                if (b > a.length) {
                    for (c = 0; c < (b - a.length); c++) {
                        d += '0'
                    }
                }
                return "" + d + a
            },
            vi: function(t, a, b) {
                if (!utag.v_id) {
                    a = this.pad(t, 12);
                    b = "" + Math.random();
                    a += this.pad(b.substring(2, b.length), 16);
                    try {
                        a += this.pad((navigator.plugins.length ? navigator.plugins.length : 0), 2);
                        a += this.pad(navigator.userAgent.length, 3);
                        a += this.pad(document.URL.length, 4);
                        a += this.pad(navigator.appVersion.length, 3);
                        a += this.pad(screen.width + screen.height + parseInt((screen.colorDepth) ? screen.colorDepth : screen.pixelDepth), 5)
                    } catch (e) {
                        utag.DB(e);
                        a += "12345"
                    };
                    utag.v_id = a;
                }
                return utag.v_id
            },
            hasOwn: function(o, a) {
                return o != null && Object.prototype.hasOwnProperty.call(o, a)
            },
            isEmptyObject: function(o, a) {
                for (a in o) {
                    if (utag.ut.hasOwn(o, a)) return false
                }
                return true
            },
            isEmpty: function(o) {
                var t = utag.ut.typeOf(o);
                if (t == "number") {
                    return isNaN(o)
                } else if (t == "boolean") {
                    return false
                } else if (t == "string") {
                    return o.length === 0
                } else return utag.ut.isEmptyObject(o)
            },
            typeOf: function(e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            },
            flatten: function(o) {
                var a = {};

                function r(c, p) {
                    if (Object(c) !== c || c instanceof Array) {
                        a[p] = c;
                    } else {
                        if (utag.ut.isEmptyObject(c)) {} else {
                            for (var d in c) {
                                r(c[d], p ? p + "." + d : d);
                            }
                        }
                    }
                }
                r(o, "");
                return a;
            },
            merge: function(a, b, c, d) {
                if (c) {
                    for (d in utag.loader.GV(b)) {
                        a[d] = b[d]
                    }
                } else {
                    for (d in utag.loader.GV(b)) {
                        if (typeof a[d] == "undefined") a[d] = b[d]
                    }
                }
            },
            decode: function(a, b) {
                b = "";
                try {
                    b = decodeURIComponent(a)
                } catch (e) {
                    utag.DB(e)
                };
                if (b == "") {
                    b = unescape(a)
                };
                return b
            },
            encode: function(a, b) {
                b = "";
                try {
                    b = encodeURIComponent(a)
                } catch (e) {
                    utag.DB(e)
                };
                if (b == "") {
                    b = escape(a)
                };
                return b
            },
            error: function(a, b, c) {
                if (typeof utag_err != "undefined") {
                    utag_err.push(a)
                }
            },
            loader: function(o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        m.parentNode.removeChild(m);
                    }
                    b = a.createElement("iframe");
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id
                };
                for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l])
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function() {
                            o.cb()
                        }, false);
                    } else {
                        b.onreadystatechange = function() {
                            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                                this.onreadystatechange = null;
                                o.cb()
                            }
                        };
                    }
                }
                if (typeof o.error == "function") {
                    utag.loader.EV(b, "error", o.error);
                }
                if (o.type != "img") {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b)
                        }
                    }
                }
            }
        }
    };
    utag.o['shopify.main'] = utag;
    utag.cfg = {
        template: "ut4.46.",
        load_rules_ajax: true,
        load_rules_at_wait: false,
        lowerqp: false,
        noconsole: false,
        session_timeout: 1800000,
        readywait: 0,
        noload: 0,
        domain: utag.loader.lh(),
        datasource: "##UTDATASOURCE##".replace("##" + "UTDATASOURCE##", ""),
        path: "//tags.tiqcdn.com/utag/shopify/main/prod/",
        utid: "shopify/main/202003101654"
    };
    utag.cfg.v = utag.cfg.template + "202003101655";
    utag.cond = {
        11: 0,
        13: 0,
        14: 0,
        15: 0,
        17: 0,
        23: 0,
        24: 0,
        25: 0,
        27: 0,
        28: 0,
        29: 0,
        30: 0,
        33: 0,
        34: 0,
        36: 0,
        38: 0,
        39: 0,
        3: 0,
        40: 0,
        41: 0,
        45: 0,
        6: 0,
        7: 0
    };
    utag.loader.initdata = function() {
        try {
            utag.data = (typeof utag_data != 'undefined') ? utag_data : {};
            utag.udoname = 'utag_data';
        } catch (e) {
            utag.data = {};
            utag.DB('idf:' + e);
        }
    };
    utag.loader.loadrules = function(_pd, _pc) {
        var d = _pd || utag.data;
        var c = _pc || utag.cond;
        for (var l in utag.loader.GV(c)) {
            switch (l) {
                case '11':
                    try {
                        c[11] |= (typeof d['tealium_event'] != 'undefined' && d['tealium_event'] == 'page_view' && d['page_language'] == 'ja')
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '13':
                    try {
                        c[13] |= (d['site_domain'] == 'www.shopify.com') || (d['site_domain'] == 'www.shopify.ca') || (d['site_domain'] == 'fr.shopify.ca') || (d['site_domain'] == 'www.shopify.com.au') || (d['site_domain'] == 'www.shopify.co.uk') || (d['site_domain'] == 'www.shopify.ie') || (d['site_domain'] == 'www.shopify.co.nz') || (d['site_domain'] == 'www.shopify.co.za')
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '14':
                    try {
                        c[14] |= (typeof d['dom.url'] == 'undefined')
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '15':
                    try {
                        c[15] |= (typeof d['event_action'] != 'undefined' && d['event_action'].toString().toLowerCase().indexOf('modalclose'.toLowerCase()) > -1 && typeof d['event_category'] != 'undefined' && d['event_category'].toString().toLowerCase().indexOf('threefield'.toLowerCase()) > -1)
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '17':
                    try {
                        c[17] |= (d['site_domain'] == 'www.shopify.com')
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '23':
                    try {
                        c[23] |= (d['dom.pathname'].toString().indexOf('/blog/topics/inspiration') > -1) || (typeof d['blog_category'] != 'undefined' && d['blog_category'].toString().toLowerCase() == 'Inspiration'.toLowerCase())
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '24':
                    try {
                        c[24] |= (typeof d['event_category'] != 'undefined' && d['event_category'].toString().indexOf('SignUp') > -1 && typeof d['event_action'] != 'undefined' && d['event_action'].toString().indexOf('success') > -1 && typeof d['dom.domain'] != 'undefined' && d['dom.domain'].toString().indexOf('shopify.jp') > -1)
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '25':
                    try {
                        c[25] |= (typeof d['display_cookies_notice'] != 'undefined' && d['display_cookies_notice'] == 'true')
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '27':
                    try {
                        c[27] |= (d['dom.domain'].toString().indexOf('shopify.com') > -1 && typeof d['page_language'] != 'undefined' && d['page_language'].toString().toLowerCase().indexOf('en'.toLowerCase()) > -1 && /^\/pos/.test(d['dom.pathname']) && d['site_display_format'].toString().indexOf('desktop') > -1 && !/^\/pos\/early-access/.test(d['dom.pathname']))
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '28':
                    try {
                        c[28] |= (typeof d['event_label'] != 'undefined' && d['event_label'].toString().indexOf('googleshopping-marketing-cta') > -1)
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '29':
                    try {
                        c[29] |= (d['dom.domain'] == 'www.shopify.de' && typeof d['tealium_event'] != 'undefined' && d['tealium_event'].toString().toLowerCase() == 'page_view'.toLowerCase())
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '3':
                    try {
                        c[3] |= (typeof d['tealium_event'] != 'undefined' && d['tealium_event'] == 'page_view')
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '30':
                    try {
                        c[30] |= (typeof d['dom.domain'] != 'undefined' && typeof d['event_action'] != 'undefined' && typeof d['event_category'] != 'undefined' && d['dom.domain'].toString().toLowerCase().indexOf('shopify.de'.toLowerCase()) > -1 && d['event_action'].toString().indexOf('success') > -1 && d['event_category'].toString().indexOf('SignUp') > -1)
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '33':
                    try {
                        c[33] |= (d['site_domain'] == 'www.shopify.jp')
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '34':
                    try {
                        c[34] |= (typeof d['tealium_event'] != 'undefined' && d['tealium_event'].toString().toLowerCase() == 'page_view'.toLowerCase())
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '36':
                    try {
                        c[36] |= (typeof d['event_category'] != 'undefined' && d['event_category'].toString().toLowerCase() == 'Signup'.toLowerCase() && typeof d['event_action'] != 'undefined' && d['event_action'].toString().toLowerCase() == 'success'.toLowerCase())
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '38':
                    try {
                        c[38] |= (d['site_domain'] == 'fr.shopify.com' && typeof d['tealium_event'] != 'undefined' && d['tealium_event'].toString().toLowerCase() == 'page_view'.toLowerCase())
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '39':
                    try {
                        c[39] |= (d['dom.pathname'] == '/pos') || (d['dom.pathname'] == '/pos/hardware') || (d['dom.pathname'] == '/pos/features') || (d['dom.pathname'] == '/pos/request-info') || (d['dom.pathname'] == '/pos/pop-up-sales') || (d['dom.pathname'] == '/independents')
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '40':
                    try {
                        c[40] |= (typeof d['event_category'] != 'undefined' && d['event_category'].toString().indexOf('SignUp') > -1 && typeof d['event_action'] != 'undefined' && d['event_action'].toString().indexOf('success') > -1 && typeof d['dom.domain'] != 'undefined' && d['dom.domain'].toString().indexOf('fr.shopify') > -1)
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '41':
                    try {
                        c[41] |= (typeof d['event_action'] != 'undefined' && d['event_action'].toString().indexOf('level-up') > -1 && typeof d['event_category'] != 'undefined' && d['event_category'].toString().indexOf('shopify-singapore-subsidy') > -1)
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '45':
                    try {
                        c[45] |= (d['dom.domain'] == 'fr.shopify.com' && typeof d['tealium_event'] != 'undefined' && d['tealium_event'].toString().toLowerCase() == 'page_view'.toLowerCase())
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '6':
                    try {
                        c[6] |= (typeof d['event_action'] != 'undefined' && d['event_action'].toString().indexOf('success') > -1 && typeof d['event_category'] != 'undefined' && d['event_category'].toString().indexOf('SignUp') > -1)
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '7':
                    try {
                        c[7] |= (typeof d['tealium_event'] != 'undefined' && d['tealium_event'] == 'event')
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
            }
        }
    };
    utag.pre = function() {
        utag.loader.initdata();
        try {
            utag.loader.RD(utag.data)
        } catch (e) {
            utag.DB(e)
        };
        utag.loader.loadrules();
    };
    utag.loader.GET = function() {
        utag.cl = {
            '_all_': 1
        };
        utag.pre();
        utag.handler.extend = [function(a, b) {
            try {
                if (1) {
                    function trigger_floodlight() {
                        if (typeof utag.view == "function") {
                            utag.view(utag.data, null, [15]);
                        }
                    }
                    window.setTimeout(trigger_floodlight, 5000);
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function(a, b) {
            try {
                if (1) {
                    try {
                        b['clean_url'] = b['dom.pathname'] + "?" + b['dom.query_string'].replace(/=([^&]+@[^\.]+)\./g, '=xxxxxx.')
                    } catch (e) {}
                }
            } catch (e) {
                utag.DB(e)
            }
        }];
        utag.handler.cfg_extend = [{
            "end": 0,
            "bwq": 0,
            "alr": 0,
            "blr": 1,
            "id": "12"
        }, {
            "end": 0,
            "bwq": 0,
            "id": "15",
            "blr": 0,
            "alr": 1
        }];
        utag.loader.initcfg = function() {
            utag.loader.cfg = {
                "1": {
                    load: (utag.cond[15] || utag.cond[28] || utag.cond[3] || utag.cond[6] || utag.cond[41]),
                    tcat: 0,
                    send: 1,
                    v: 202003101654,
                    wait: 1,
                    tid: 6026
                },
                "2": {
                    load: utag.cond[3],
                    tcat: 0,
                    send: 1,
                    v: 201904091859,
                    wait: 1,
                    tid: 2045
                },
                "3": {
                    load: utag.cond[3],
                    tcat: 0,
                    send: 1,
                    v: 202002141802,
                    wait: 1,
                    tid: 19129
                },
                "5": {
                    load: (utag.cond[3] && utag.cond[17]),
                    tcat: 0,
                    send: 1,
                    v: 202002140235,
                    wait: 1,
                    tid: 20067
                },
                "6": {
                    load: 4,
                    tcat: 0,
                    send: 1,
                    v: 202003101654,
                    wait: 1,
                    tid: 7133
                },
                "15": {
                    load: utag.cond[14],
                    tcat: 0,
                    send: 1,
                    v: 201906181824,
                    wait: 1,
                    tid: 4001
                },
                "16": {
                    load: (utag.cond[7] || utag.cond[3] || utag.cond[6]),
                    tcat: 0,
                    send: 1,
                    v: 202002261754,
                    wait: 1,
                    tid: 4049
                },
                "17": {
                    load: (utag.cond[3] || utag.cond[6]),
                    tcat: 0,
                    send: 1,
                    v: 201905101229,
                    wait: 1,
                    tid: 16044
                },
                "21": {
                    load: utag.cond[11],
                    tcat: 0,
                    send: 1,
                    v: 201905101954,
                    wait: 1,
                    tid: 20103
                },
                "25": {
                    load: utag.cond[13],
                    tcat: 0,
                    send: 1,
                    v: 201905141438,
                    wait: 1,
                    tid: 20011
                },
                "32": {
                    load: utag.cond[23],
                    tcat: 0,
                    send: 1,
                    v: 201907221758,
                    wait: 1,
                    tid: 20011
                },
                "36": {
                    load: utag.cond[23],
                    tcat: 0,
                    send: 1,
                    v: 201908071802,
                    wait: 1,
                    tid: 20010
                },
                "37": {
                    load: 4,
                    tcat: 0,
                    send: 1,
                    v: 202002140235,
                    wait: 1,
                    tid: 2043
                },
                "46": {
                    load: utag.cond[27],
                    tcat: 0,
                    send: 1,
                    v: 202002032039,
                    wait: 1,
                    tid: 4054
                },
                "48": {
                    load: utag.cond[24],
                    tcat: 0,
                    send: 1,
                    v: 202001171534,
                    wait: 1,
                    tid: 20010
                },
                "58": {
                    load: utag.cond[24],
                    tcat: 0,
                    send: 1,
                    v: 202001171534,
                    wait: 1,
                    tid: 20010
                },
                "59": {
                    load: (utag.cond[33] && utag.cond[34]),
                    tcat: 0,
                    send: 1,
                    v: 202001171534,
                    wait: 1,
                    tid: 20010
                },
                "60": {
                    load: (utag.cond[38] || utag.cond[40]),
                    tcat: 0,
                    send: 1,
                    v: 202002111450,
                    wait: 1,
                    tid: 15032
                },
                "61": {
                    load: (utag.cond[39] && utag.cond[17]),
                    tcat: 0,
                    send: 1,
                    v: 201912181601,
                    wait: 1,
                    tid: 3015
                },
                "62": {
                    load: utag.cond[29],
                    tcat: 0,
                    send: 1,
                    v: 202002111450,
                    wait: 1,
                    tid: 15032
                },
                "63": {
                    load: (utag.cond[33] && utag.cond[34]),
                    tcat: 0,
                    send: 1,
                    v: 202001171534,
                    wait: 1,
                    tid: 20010
                },
                "69": {
                    load: (utag.cond[29] || utag.cond[45]),
                    tcat: 0,
                    send: 1,
                    v: 202003091305,
                    wait: 1,
                    tid: 20067
                },
                "70": {
                    load: (utag.cond[30] || utag.cond[40]),
                    tcat: 0,
                    send: 1,
                    v: 202003091305,
                    wait: 1,
                    tid: 20067
                },
                "79": {
                    load: utag.cond[30],
                    tcat: 0,
                    send: 1,
                    v: 202002111450,
                    wait: 1,
                    tid: 15032
                },
                "81": {
                    load: (utag.cond[15] || utag.cond[3] || utag.cond[36]),
                    tcat: 0,
                    send: 1,
                    v: 202003101654,
                    wait: 1,
                    tid: 6026
                },
                "85": {
                    load: utag.cond[6],
                    tcat: 0,
                    send: 1,
                    v: 202002211821,
                    wait: 1,
                    tid: 20067
                }
            };
            utag.loader.cfgsort = ["1", "2", "3", "5", "6", "15", "16", "17", "21", "25", "32", "36", "37", "46", "48", "58", "59", "60", "61", "62", "63", "69", "70", "79", "81", "85"];
        }
        utag.loader.initcfg();
        try {
            utag.gdpr.applyConsentState();
        } catch (e) {
            utag.DB(e)
        }
    }
    utag.gdpr = {
        consent_prompt: {
            noShow: false,
            isEnabled: true,
            content: {}
        },
        preferences_prompt: {
            single_cookie: false,
            noShow: false,
            isEnabled: false,
            defaultState: true,
            content: {},
            categories: {
                "crm": {
                    "enabled": 1,
                    "id": 15
                },
                "cdp": {
                    "id": 11,
                    "enabled": 1
                },
                "big_data": {
                    "id": 8,
                    "enabled": 1
                },
                "analytics": {
                    "enabled": 1,
                    "id": 1
                },
                "display_ads": {
                    "id": 3,
                    "enabled": 1
                },
                "search": {
                    "id": 4,
                    "enabled": 1
                },
                "misc": {
                    "id": 9,
                    "enabled": 1
                },
                "affiliates": {
                    "id": 2,
                    "enabled": 1
                },
                "engagement": {
                    "enabled": 1,
                    "id": 13
                },
                "email": {
                    "enabled": 1,
                    "id": 5
                },
                "cookiematch": {
                    "id": 10,
                    "enabled": 1
                },
                "personalization": {
                    "enabled": 1,
                    "id": 6
                },
                "monitoring": {
                    "enabled": 1,
                    "id": 14
                },
                "mobile": {
                    "enabled": 1,
                    "id": 12
                },
                "social": {
                    "enabled": 1,
                    "id": 7
                }
            }
        },
        getCategories: function(onlyEnabledCats) {
            if (!(utag.gdpr.preferences_prompt && utag.gdpr.preferences_prompt.categories)) {
                return [];
            }
            var length = utag.gdpr.keys(utag.gdpr.preferences_prompt.categories).length,
                cats = new Array(length),
                gdpr_cats = utag.gdpr.preferences_prompt.categories;
            for (var cat in gdpr_cats) {
                if (!gdpr_cats.hasOwnProperty(cat)) {
                    continue;
                }
                if (onlyEnabledCats && !gdpr_cats[cat].enabled) {
                    continue;
                }
                cats[gdpr_cats[cat].id - 1] = cat;
            }
            for (var i = cats.length - 1; i >= 0; i--) {
                if (cats[i] === undefined) {
                    cats.splice(i, 1);
                }
            }
            return cats;
        },
        getSelectedCategories: function() {
            var sc = [],
                gc = utag.gdpr.getCategories(),
                cs = utag.gdpr.getConsentState(),
                i;
            try {
                if (typeof cs === "number") {
                    return (parseInt(cs) === 1) ? gc : sc;
                } else {
                    for (i in utag.loader.GV(cs)) {
                        if ("1" === cs[i].ct) {
                            sc.push(gc[i]);
                        }
                    }
                }
            } catch (e) {
                utag.DB(e);
            }
            return sc;
        },
        getCategoryLanguage: function(category) {
            if (!(utag.gdpr.preferences_prompt && utag.gdpr.preferences_prompt.categories)) {
                return [];
            }
            var language = utag.gdpr.getLanguage(utag.gdpr.preferences_prompt);
            return utag.gdpr.preferences_prompt.languages[language].categories[category];
        },
        getConsentState: function() {
            var re = /^c\d+/,
                cd = utag.gdpr.getCookieValues(),
                np = 1,
                gc = utag.gdpr.getCategories(),
                pc = (function(gc) {
                    var pc = [];
                    for (var i = 0; i < gc.length; i++) {
                        pc.push({
                            ct: null,
                            name: gc[i]
                        });
                    }
                    return pc;
                }(gc)),
                filteredCD = (function(cd) {
                    var d = {};
                    for (var prop in cd) {
                        if (!cd.hasOwnProperty(prop)) {
                            continue;
                        }
                        if (re.test(prop)) {
                            d[prop] = cd[prop];
                        }
                    }
                    return d;
                }(cd));
            filteredCD = utag.gdpr.sortedObject(filteredCD, function(val1, val2) {
                var idx1 = parseInt((val1 || "").substring(1), 10),
                    idx2 = parseInt((val2 || "").substring(1), 10);
                if (isNaN(idx1) || isNaN(idx2)) {
                    return 0;
                }
                return idx1 > idx2 ? 1 : -1;
            });
            for (var cn in utag.loader.GV(filteredCD)) {
                if (cn.match(re)) {
                    var idx = parseInt(cn.substring(1), 10) - 1,
                        ct = gc[idx];
                    pc[idx].ct = cd[cn];
                    if (cd[cn] * 1 !== 1) {
                        np = 0;
                    }
                }
            }
            if (cd.consent) {
                if (cd.consent === true || cd.consent === "true") {
                    return np ? np : pc;
                } else {
                    return -1;
                }
            } else if (np === 0) {
                return pc;
            } else {
                return 0;
            }
        },
        getCookieValues: function() {
            var values = {},
                rcd = (function() {
                    var value = "; " + document.cookie;
                    var parts = value.split("; CONSENTMGR=");
                    if (parts.length == 2) return utag.ut.decode(parts.pop().split(";").shift());
                }()),
                cd = utag.gdpr.typeOf(rcd) === "string" ? rcd : "";
            if (utag.data) {
                utag.data["cp.CONSENTMGR"] = cd;
            }
            if (cd) {
                var i, optOut, optOutData = decodeURI(cd).split("|");
                for (i = 0; i < optOutData.length; i++) {
                    optOut = optOutData[i].split(":");
                    values[optOut[0]] = optOut[1];
                }
            }
            utag.gdpr.values = values;
            return values;
        },
        getDeTokenizedContent: function(data, _lang) {
            if (utag.gdpr.isEmpty(data)) return null;
            var reg = /{{(.*?)}}/gm,
                token_match = /[{}]/g,
                two_part = /display_ads|big_data/;
            var lang = utag.gdpr.getLanguage(data, _lang),
                langData = data.languages[lang];
            for (var t in langData.common_tokens) {
                if (!langData.common_tokens.hasOwnProperty(t)) {
                    continue;
                }
                var replacements = langData.common_tokens[t].match(reg);
                if (replacements) {
                    for (var i = 0; i < replacements.length; i++) {
                        var token = replacements[i].replace(token_match, "");
                        langData.common_tokens[t] = langData.common_tokens[t].replace(replacements[i], langData.custom_tokens[token]);
                    }
                }
            }

            function tokenReplace(str) {
                var replacements = str.match(reg);
                if (replacements) {
                    for (var i = 0; i < replacements.length; i++) {
                        var token = replacements[i].replace(/[{}]/g, "") || "";
                        if (langData.common_tokens[token]) {
                            str = str.replace(replacements[i], langData.common_tokens[token]);
                        } else if (langData.custom_tokens[token]) {
                            str = str.replace(replacements[i], langData.custom_tokens[token]);
                        } else if (langData.categories && token.indexOf("category_") > -1) {
                            var split_token = token.split("_");
                            if (token.match(two_part)) {
                                split_token[1] = split_token[1] + '_' + split_token[2];
                                split_token.splice(2, 1);
                            }
                            var category = langData.categories[split_token[1]],
                                key = {
                                    "title": "name",
                                    "description": "notes"
                                }[split_token[2]];
                            if (category[key]) {
                                str = str.replace(replacements[i], category[key]);
                            }
                        }
                    }
                }
                return str;
            }
            return {
                js: tokenReplace(data.content.js),
                html: tokenReplace(data.content.html),
                css: tokenReplace(data.content.css)
            };
        },
        getLanguage: function(promptData, preferredLang) {
            var udoName = window.utag.udoname || "utag_data";
            var dataObject = window.utag.data || window[udoName];
            var langLocale = (preferredLang || dataObject[window.utag.cfg.gdprDLRef] || (navigator.languages && navigator.languages[0] || navigator.language || navigator.userLanguage)).toLowerCase();
            var lang = (langLocale || "").split("-")[0];
            if (!promptData) {
                return langLocale;
            }
            var languages = promptData.languages;
            return languages[langLocale] ? langLocale : languages[lang] ? lang : promptData.defaultLang;
        },
        getTokenLanguage: function(promptData, token, lang) {
            if (utag.gdpr.isEmpty(promptData)) return null;
            lang = lang || utag.gdpr.getLanguage(promptData);
            var langData = promptData.languages[lang];
            if (utag.gdpr.isEmpty(langData)) return null;
            if (utag.gdpr.isEmpty(promptData)) return null;
            if (utag.gdpr.isEmpty(token)) return null;
            if (langData.common_tokens[token]) {
                return langData.common_tokens[token];
            } else if (langData.custom_tokens[token]) {
                return langData.custom_tokens[token];
            } else if (langData.categories && token.indexOf("category_") > -1) {
                var split_token = token.split("_"),
                    category = langData.categories[split_token[1]];
                if (category[split_token[2]]) {
                    return category[split_token[2]];
                }
            }
            return null;
        },
        setCookie: function(cookieData) {
            utag.DB("Consent Manager: Set Cookie");
            if (utag.gdpr.typeOf(cookieData) !== "object") {
                return;
            }
            if (utag.gdpr.keys(cookieData).length === 0) {
                return;
            }
            if (utag.gdpr.typeOf(cookieData.consent) !== "boolean" && !(utag.gdpr.typeOf(cookieData.consent) === "string" && (cookieData.consent.toLowerCase() === "true" || cookieData.consent.toLowerCase() === "false"))) {
                utag.DB("Invlaid option sent to setCookie [consent must be true/false]");
                return;
            }
            if (utag.gdpr.typeOf(cookieData.ts) !== "number" || (cookieData.ts.toString().length !== 13)) {
                cookieData.ts = new Date().getTime();
            }
            var cp = utag.cfg.consentPeriod || 90;
            utag.gdpr.values = cookieData;
            var mo2Val = [];
            for (var i in utag.loader.GV(cookieData)) {
                if (/^(consent|ts|c\d+)$/.test(i)) {
                    mo2Val.push(i + ":" + cookieData[i]);
                } else {
                    utag.DB("Invlaid option sent to setCookie [" + i + "], is unkown");
                }
            }
            var cD = new Date();
            cD.setDate(cD.getDate() + cp);
            document.cookie = "CONSENTMGR=" + encodeURI(mo2Val.join("|")) + ";domain=" + utag.cfg.domain + ";path=/; expires=" + cD.toGMTString() + ";";
            utag.data["cp.CONSENTMGR"] = mo2Val.join("|");
        },
        setCookieValue: function(key, value) {
            utag.DB("Consent Manager: Set Cookie Value");
            if (!key || (utag.gdpr.typeOf(value) === "undefined" || utag.gdpr.typeOf(value) === "null")) return;
            var cookieData = utag.handler.C(utag.gdpr.getCookieValues());
            cookieData[key] = value;
            utag.gdpr.setCookie(cookieData);
        },
        setConsentValue: function(_response) {
            utag.DB("Consent Manager: Set Consent Value: " + _response);
            var valid = {
                true: 1,
                "true": 1,
                1: 1,
                false: 0,
                "false": 0,
                0: 0
            };
            if (!valid.hasOwnProperty(_response)) {
                throw new Error("No response supplied");
            }
            var response = valid[_response] === 1;
            utag.gdpr.setCookieValue("ts", new Date().getTime());
            utag.gdpr.setCookieValue("consent", response);
            utag.gdpr.processQueue(response);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "https://collect.tealiumiq.com/event");
            if (response) {
                xhr.send('{"tealium_account":"shopify","tealium_profile":"' + (utag.gdpr.eventProfile || "main") + '","tealium_event":"grant_full_consent","consent_categories":"' + utag.gdpr.getCategories(true).join(", ") + '","policy":"gdpr", "tealium_visitor_id" : "' + utag.data['cp.utag_main_v_id'] + '"}');
            } else {
                xhr.send('{"tealium_account":"shopify","tealium_profile":"' + (utag.gdpr.eventProfile || "main") + '","tealium_event":"decline_consent","consent_categories":"","policy":"gdpr", "tealium_visitor_id" : "' + utag.data['cp.utag_main_v_id'] + '"}');
            }
        },
        setPreferencesValues: function(categories, noCollect) {
            utag.DB("Consent Manager: Set Preferences Values");
            var cookie_data = utag.gdpr.getCookieValues(),
                lookup = {},
                i, rgx = /\D/,
                names = utag.gdpr.getCategories(),
                chosen_list = [],
                consent_seen = false,
                decline_seen = false,
                crgx = /c\d/,
                fld;
            if (utag.gdpr.typeOf(categories) !== "object") {
                utag.DB("Categories is not type object.");
                return;
            }
            try {
                for (i = 0; i < names.length; i++) {
                    lookup[names[i]] = 'c' + (i + 1);
                }
                for (var cat in categories) {
                    if (!categories.hasOwnProperty(cat)) {
                        continue;
                    }
                    if (categories[cat] !== "1" && categories[cat] !== "0" && categories[cat] !== 1 && categories[cat] !== 0) {
                        continue;
                    }
                    if (cat.match(rgx)) {
                        cookie_data[lookup[cat]] = categories[cat];
                        if (categories[cat] != 0) {
                            chosen_list.push(cat);
                        }
                    } else {
                        cookie_data["c" + cat] = categories[cat];
                        if (categories[cat] != 0) {
                            chosen_list.push(names[cat - 1]);
                        }
                    }
                }
                for (fld in utag.loader.GV(cookie_data)) {
                    if (fld.match(crgx)) {
                        if (cookie_data[fld] != 0) {
                            consent_seen = true;
                        } else {
                            decline_seen = true;
                        }
                    }
                }
                cookie_data["ts"] = new Date().getTime();
                cookie_data["consent"] = consent_seen;
                utag.gdpr.setCookie(cookie_data);
                utag.gdpr.processQueue(consent_seen);
            } catch (e) {
                utag.DB(e);
            }
            if (noCollect) {
                return;
            }
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "https://collect.tealiumiq.com/event");
            if (decline_seen) {
                if (consent_seen) {
                    xhr.send('{"tealium_account":"shopify","tealium_profile":"' + (utag.gdpr.eventProfile || "main") + '","tealium_event":"grant_partial_consent","consent_categories":"' + chosen_list.join(",") + '","policy":"gdpr", "tealium_visitor_id" : "' + utag.data['cp.utag_main_v_id'] + '"}');
                } else {
                    xhr.send('{"tealium_account":"shopify","tealium_profile":"' + (utag.gdpr.eventProfile || "main") + '","tealium_event":"decline_consent","consent_categories":"","policy":"gdpr", "tealium_visitor_id" : "' + utag.data['cp.utag_main_v_id'] + '"}');
                }
            } else if (!decline_seen && consent_seen) {
                xhr.send('{"tealium_account":"shopify","tealium_profile":"' + (utag.gdpr.eventProfile || "main") + '","tealium_event":"grant_full_consent","consent_categories":"' + utag.gdpr.getCategories(true).join(", ") + '","policy":"gdpr", "tealium_visitor_id" : "' + utag.data['cp.utag_main_v_id'] + '"}');
            }
        },
        setAllCategories: function(state, noCollect) {
            utag.DB("Consent Manager: Set Preferences All Categories: " + state);
            if (state === undefined) return;
            if (utag.gdpr.typeOf(state) !== "boolean") return;
            var allCats = utag.gdpr.getCategories(),
                prefs = {};
            for (var i = 0; i < allCats.length; i++) {
                prefs["" + (i + 1)] = state ? "1" : "0";
            }
            utag.gdpr.setPreferencesValues(prefs, noCollect);
        },
        setPreferencesFromList: function(list) {
            utag.DB("Consent Manager: Set Preferences From List");
            var prefs = {},
                allCats = utag.gdpr.getCategories();
            if (utag.gdpr.typeOf(list) !== "array") {
                utag.DB("List should be of type array");
                return;
            }
            for (var i = 0; i < list.length; i++) {
                prefs[list[i]] = "1";
            }
            for (var j = 0; j < allCats.length; j++) {
                if (!prefs[allCats[j]]) {
                    prefs[allCats[j]] = "0";
                }
            }
            utag.gdpr.setPreferencesValues(prefs);
        },
        refreshCookie: function() {
            try {
                utag.gdpr.setCookie(utag.gdpr.getCookieValues());
            } catch (e) {}
        },
        processQueue: function(consent_seen) {
            utag.DB("Consent Manager: Processing Consent Queue");
            if (utag.gdpr.noqueue) {
                return;
            }
            if (!consent_seen) {
                utag.gdpr.queue = [];
                return;
            }
            utag.DB("Consent Manager: Processing Consent Queue Length: " + utag.gdpr.queue.length);
            var event, data, conds = {};
            utag.gdpr.merge(conds, utag.cond);
            for (var i = 0; i < utag.gdpr.queue.length; i++) {
                event = utag.gdpr.queue[i];
                if (!(event.cfg && event.cfg.uids)) {
                    data = {};
                    utag.loader.RD(data, event.event);
                    utag.gdpr.merge(data, event.data);
                    for (var cond in conds) {
                        if (!conds.hasOwnProperty(cond)) {
                            continue;
                        }
                        conds[cond] = 0;
                    }
                    utag.loader.loadrules(data, conds);
                    event.cfg = event.cfg || {};
                    event.cfg.uids = [];
                    utag.cond = conds;
                    utag.loader.initcfg();
                    for (var id in utag.loader.GV(utag.loader.cfg)) {
                        if (!utag.gdpr.omittedTags[id] && utag.loader.cfg[id].load) {
                            event.cfg.uids.push(id);
                        }
                    }
                }
                utag.track_old.call(this, event);
            }
            utag.gdpr.queue = [];
        },
        typeOf: function(e) {
            return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
        },
        merge: function(a, b, c, d) {
            if (c) {
                for (d in utag.loader.GV(b)) {
                    a[d] = b[d];
                }
            } else {
                for (d in utag.loader.GV(b)) {
                    if (typeof a[d] == "undefined")
                        a[d] = b[d];
                }
            }
        },
        applyConsentState: function() {
            utag.DB("Consent Manager: Applying consent");
            try {
                var i, lc = utag.loader.cfg,
                    cs = utag.gdpr.getConsentState(),
                    ot = utag.gdpr.omittedTags;
                if (typeof cs === "number") {
                    if ((utag.gdpr.consent_prompt.isEnabled && parseInt(cs) !== 1) || ((!utag.gdpr.consent_prompt.isEnabled && utag.gdpr.preferences_prompt.isEnabled) && parseInt(cs) === -1)) {
                        utag.DB("Consent Manager: Setting all tags to off");
                        for (i in utag.loader.GV(lc)) {
                            if (typeof ot[i] === "undefined") {
                                lc[i].load = 0;
                            }
                        }
                    }
                } else {
                    utag.DB("Consent Manager: Partial Consent");
                    for (i in utag.loader.GV(lc)) {
                        if (typeof ot[i] === "undefined") {
                            if (lc[i].tcat > 0 && cs[lc[i].tcat - 1].ct == 0) {
                                lc[i].load = 0;
                            }
                        }
                    }
                }
            } catch (e) {
                utag.DB(e);
            }
        },
        updateConsentCookie: function(consent_categories) {
            utag.DB("Consent Manager: Updating consent cookie");
            var list, listType = utag.gdpr.typeOf(consent_categories);
            if (listType === "string") {
                list = consent_categories.split(/\s*,\s*/);
            } else if (listType !== "array") {
                list = [];
            } else {
                list = consent_categories.slice();
            }
            if (list.length === 0) {
                utag.gdpr.setConsentValue(false);
                utag.gdpr.setAllCategories(false);
                return;
            } else {
                utag.gdpr.setConsentValue(true);
            }
            utag.gdpr.setPreferencesFromList(list);
        },
        keys: function(obj) {
            if (Object.keys) {
                return Object.keys(obj);
            }
            var array = [];
            for (var prop in obj) {
                if (!obj.hasOwnProperty(prop)) {
                    continue;
                }
                array.push(prop);
            }
            return array;
        },
        sortedObject: function(obj, func) {
            var _obj = {};
            if (obj !== undefined) {
                var _k1 = utag.gdpr.keys(obj).sort(func);
                for (var z = 0; z < _k1.length; z++) {
                    _obj[_k1[z]] = obj[_k1[z]];
                }
            }
            return _obj;
        },
        isEmpty: function(obj) {
            var t = utag.gdpr.typeOf(obj);
            switch (t) {
                case "string":
                case "array":
                    return obj.length === 0;
                case "object":
                    for (var p in obj) {
                        if (!obj.hasOwnProperty(p)) {
                            continue;
                        }
                        return false;
                    }
                default:
                    return true;
            }
        },
        queue: [],
        noqueue: window.utag_cfg_ovrd ? window.utag_cfg_ovrd.nogdprqueue : false,
        noview: window.utag_cfg_ovrd ? window.utag_cfg_ovrd.noview : false,
        omittedTags: {}
    };
    utag.loader.initdataOld = utag.loader.initdata;
    utag.loader.initdata = function() {
        utag.loader.initdataOld();
        if (utag.gdpr.getConsentState() !== 0) return;
        if (utag.gdpr.noview) return;
        if (!utag.loader.rd_flag && !utag.gdpr.noqueue) {
            utag.gdpr.queue.push({
                event: "view",
                data: utag.handler.C(utag.data)
            });
        }
    };
    utag.preOld = utag.pre;
    utag.pre = function() {
        utag.preOld();
        if (utag.gdpr.consent_prompt.isEnabled === true && !(utag.cond[25])) {
            utag.gdpr.consent_prompt.isEnabled = false;
        }
        utag.pre = utag.preOld;
    };
    utag.gdpr.consent_prompt.languages = {
        "it": {
            "custom_tokens": {
                "cookiepolicy": "https://www.shopify.ca/legal/cookies",
                "opt_out": "Opt out",
                "privacy_policy_url": "https://www.shopify.com/legal/privacy",
                "opt_in": "Registrati"
            },
            "isDefault": "false",
            "common_tokens": {
                "confirmation_button": "Salva preferenza",
                "message": "Usiamo i cookie per offrirti la migliore esperienza web possibile. Registrati, per consentirci di continuare a personalizzare i tuoi contenuti. Per maggiori informazioni consulta <a href={{privacy_policy_url}}>l'Informativa sulla privacy</a> e la <a href={{cookiepolicy}}>Cookie policy</a>.",
                "title": "it.shopify.com è personalizzato per te"
            }
        },
        "en": {
            "custom_tokens": {
                "cookiepolicy": "https://www.shopify.ca/legal/cookies",
                "privacy_policy_url": "https://www.shopify.com/legal/privacy",
                "opt_in": "Opt in",
                "opt_out": "Opt out"
            },
            "isDefault": "true",
            "common_tokens": {
                "title": "Shopify is personalized for you",
                "message": "We use cookies to provide you with the best possible web experience. Please opt-in so we can continue to customize content for you. For more information please see our <a href={{privacy_policy_url}}>Privacy Policy</a> and <a href={{cookiepolicy}}>Cookie Policy</a>.",
                "confirmation_button": "Save preference"
            }
        },
        "de": {
            "custom_tokens": {
                "opt_out": "Ablehnen",
                "privacy_policy_url": "https://www.shopify.de/legal/datenschutz",
                "opt_in": "Zustimmen",
                "cookiepolicy": "https://www.shopify.ca/legal/cookies"
            },
            "common_tokens": {
                "message": "Wir verwenden Cookies, um dir das bestmögliche Web-Erlebnis zu bieten. Bitte stimme der Verwendung von Cookies zu, damit wir unsere Inhalte weiterhin auf dich anpassen können. Weitere Informationen findest du in unserer <a href={{privacy_policy_url}}>Datenschutzerklärung</a> und <a href={{cookiepolicy}}>Cookie-Richtlinie</a>.",
                "confirmation_button": " Auswahl speichern",
                "title": "Shopify ist für dich personalisiert"
            },
            "isDefault": "false"
        },
        "ja": {
            "custom_tokens": {
                "opt_in": "オプトイン",
                "opt_out": "オプトアウト\t",
                "privacy_policy_url": "https://www.shopify.com/legal/privacy",
                "cookiepolicy": "https://www.shopify.ca/legal/cookies"
            },
            "isDefault": "false",
            "common_tokens": {
                "message": "Cookiesを使用して、可能な限り最高のウェブ体験を提供します。引き続きコンテンツをカスタマイズできるようにオプトインしてください。詳細については、プライバシーポリシーとCookieポリシーをご覧ください。",
                "confirmation_button": "各種設定を保存する\t",
                "title": "Shopify.jpはあなたのためにパーソナライズされています"
            }
        },
        "fr": {
            "custom_tokens": {
                "cookiepolicy": "https://www.shopify.ca/legal/cookies",
                "opt_out": "Refuser",
                "opt_in": "Accepter",
                "privacy_policy_url": "https://fr.shopify.com/legal/confidentialite"
            },
            "common_tokens": {
                "title": "fr.shopify.com est personnalisé pour vous",
                "confirmation_button": "Enregistrer ma préférence",
                "message": "Nous utilisons des cookies pour vous fournir la meilleure expérience web possible. Veuillez les accepter afin que nous puissions continuer à personnaliser le contenu pour vous. Pour plus d'informations, veuillez consulter notre <a href={{privacy_policy_url}}>politique de confidentialité   </a> et <a href={{cookiepolicy}}>notre politique en matière de cookies</a>."
            },
            "isDefault": "false"
        },
        "es": {
            "custom_tokens": {
                "cookiepolicy": "https://www.shopify.ca/legal/cookies",
                "privacy_policy_url": "https://www.shopify.com/legal/privacy",
                "opt_in": "Opcional",
                "opt_out": "Rechazar"
            },
            "isDefault": "false",
            "common_tokens": {
                "title": "Shopify.es está personalizado para ti",
                "confirmation_button": "Guardar preferencias",
                "message": "Usamos cookies para ofrecer la mejor experiencia de web posible. Por favor, acéptalas así podemos continuar optimizando contenido para ti. Para más información, por favor, mira nuestra <a href={{privacy_policy_url}}>Política de privacidad</a> y <a href={{cookiepolicy}}>nuestra Política sobre cookies</a>.\n"
            }
        },
        "pt-br": {
            "isDefault": "false",
            "common_tokens": {
                "title": "O site da Shopify é feito sob medida pensando em você",
                "message": "Nós utilizamos cookies para fornecer a melhor experiência web para você. Por favor, ative os cookies para que possamos continuar a personalizar o conteúdo que exibimos para você. Para mais informações, consulte a nossa  <a href={{privacy_policy_url}}>Política de Privacidade</a> e a nossa <a href={{cookiepolicy}}>Política de Cookies</a>.",
                "confirmation_button": "Salvar preferência"
            },
            "custom_tokens": {
                "cookiepolicy": "https://www.shopify.ca/legal/cookies",
                "opt_out": "Desativar",
                "opt_in": "Ativar",
                "privacy_policy_url": "https://www.shopify.com/legal/privacy"
            }
        },
        "nl": {
            "common_tokens": {
                "message": "We gebruiken cookies om u de best mogelijke webervaring te bieden. Meld u aan zodat we de inhoud voor u kunnen blijven aanpassen. Raadpleeg ons <a href={{privacy_policy_url}}>Privacybeleid</a> en <a href={{cookiepolicy}}>Cookiebeleid</a> voor meer informatie.",
                "confirmation_button": "Voorkeur opslaan",
                "title": "Shopify.nl is voor u gepersonaliseerd"
            },
            "isDefault": "false",
            "custom_tokens": {
                "cookiepolicy": "https://www.shopify.ca/legal/cookies",
                "opt_out": "Uitschrijven",
                "opt_in": "Aanmelden",
                "privacy_policy_url": "https://www.shopify.com/legal/privacy"
            }
        }
    };
    utag.gdpr.consent_prompt.content.css = ".privacy-prompt__radio-button {  display: inline-block;  margin-right: 10px;} .privacy_prompt {    padding-top: 20px;    padding-bottom: 10px;    box-shadow: 0 9px 45px 0 #dfe3e8;    position: fixed;    bottom: 0;    left: 0;    text-align: left;    background-color: #fff;    color: #000;    font-family: ShopifySans, Helvetica, Arial, sans-serif;    z-index: 1000;    word-break: break-word;    width: 100%;   }.privacy-prompt__disclaimer {     margin-bottom: 10px;   }  .privacy_prompt_content {      padding: 20px;      font-family: ShopifySans, Helvetica, Arial, sans-serif;      font-size: 0.9em;  }";
    utag.gdpr.consent_prompt.content.html = "<section class=\"privacy_prompt explicit_consent\" id=\"__tealiumGDPRecModal\"><div class=\"grid\">   <div class=\"grid__item grid__item--tablet-up-6 grid__item--desktop-up-8 grid__item--mobile-up-align-center\">      <div class=\"grid grid--vertically-centered\">         <div class=\"grid__item grid__item--tablet-up-4 grid__item--desktop-up-8 privacy_prompt_content\">            <h2 class=\"heading--4 color-ink-light text-center--mobile\">               {{title}}            </h2>            <p class=\"color-ink-light privacy-prompt__disclaimer text-center--mobile\">               {{message}}            </p>            <div class=\"text-center--mobile\">               <form class=\"marketing-form\" action=\"/\" accept-charset=\"UTF-8\" method=\"post\" __bizdiag=\"25735392\" __biza=\"WJ__\">                  <input value=\"optin\" class=\"marketing-radio\" type=\"radio\" name=\"radio_buttons[privacy_pref]\" id=\"radio_buttons_privacy_pref_optin\"><label class=\"marketing-radio-label privacy-prompt__radio-button color-ink-light\" for=\"radio_buttons_privacy_pref_optin\">{{opt_in}}</label>                  <input value=\"optout\" class=\"marketing-radio\" type=\"radio\" name=\"radio_buttons[privacy_pref]\" id=\"radio_buttons_privacy_pref_optout\"><label class=\"marketing-radio-label privacy-prompt__radio-button color-ink-light\" for=\"radio_buttons_privacy_pref_optout\">{{opt_out}}</label>               </form>            </div>         </div>         <div class=\"grid__item grid__item--tablet-up-2 grid__item--desktop-up-4 text-center--tablet-down\">            <button class=\"marketing-button marketing-button--secondary\" id=\"consent_prompt_submit\">{{confirmation_button}}</button>         </div>      </div>   </div></div></section>";
    utag.gdpr.consent_prompt.content.js = "function getCookie(cookieName){var regexp=new RegExp('(?:^|; )'+cookieName+'=([^;]*)(?:$|; )');var match=document.cookie.match(regexp);return match?decodeURIComponent(match[1]):\"\";}function trackOptIn(optInValue,eventAction){window.analytics.ready(function(){window.analytics.track('monorail://marketing_page_event/2.0',{user_token:getCookie('_shopify_y'),session_token:getCookie('_shopify_s'),page_url:window.location.href,canonical_url:window.location.hostname,page_language:navigator.language,project:\"brochure2\",environment:\"production\",experiment_variation_id:\"17592160043:17603320123\",event_category:\"Cookie_Consent_Form\",event_action:eventAction,event_label:optInValue});});}(function consent_prompt(){var $el=document.getElementById(\"consent_prompt_submit\"),$modal=document.getElementById(\"__tealiumGDPRecModal\"),$privacyPrefOptin=document.getElementById(\"radio_buttons_privacy_pref_optin\"),$privacyPrefOpout=document.getElementById(\"radio_buttons_privacy_pref_optout\");trackOptIn(\"\",\"Consent_form_loaded\");var consentState=utag.gdpr.getConsentState();if(typeof consentState===\"number\"){if(consentState===1){$privacyPrefOptin.checked=true;}else if(consentState===-1){$privacyPrefOpout.checked=true;}}else{$privacyPrefOptin.checked=true;}var callBack=function(){if($privacyPrefOptin.checked){utag.gdpr.setConsentValue(1);setTimeout(function(){if(window.utag&&window.utag.udoname||window.utag_data){utag.view(window[window.utag&&window.utag.udoname||\"utag_data\"]);}},0);utag_data.opt_in=\"True\";trackOptIn(\"true\",\"Opt_In_Checked\");}else if($privacyPrefOpout.checked){utag.gdpr.setConsentValue(0);setTimeout(function(){if(window.utag&&window.utag.udoname||window.utag_data){utag.view(window[window.utag&&window.utag.udoname||\"utag_data\"]);}},0);utag_data.opt_in=\"False\";trackOptIn(\"false\",\"Opt_Out_Checked\");}else{return;}closePrompt();};var closePrompt=function(){$modal.style.display=\"none\";};if(document.addEventListener){$el.addEventListener(\"click\",callBack,false);}else if(document.attachEvent){$el.attachEvent(\"click\",callBack);}else{$el.onclick=callBack;}}());";
    utag.gdpr.consent_prompt.defaultLang = "en";
    utag.gdpr.showExplicitConsent = function(_lang) {
        var cn = document.getElementById("__tealiumGDPRecStyle");
        if (cn) {
            cn.parentNode.removeChild(cn);
        }
        var hn = document.getElementById("__tealiumGDPRecModal");
        if (hn) {
            hn.parentNode.removeChild(hn);
        }
        var sn = document.getElementById("__tealiumGDPRecScript");
        if (sn) {
            sn.parentNode.removeChild(sn);
        }
        var dtc = utag.gdpr.getDeTokenizedContent(utag.gdpr.consent_prompt, _lang);
        var head = document.head || document.getElementsByTagName("head")[0],
            style = document.createElement("style"),
            mDiv = document.createElement("div"),
            scr = document.createElement("script"),
            body = document.body || document.getElementsByTagName("body")[0];
        style.type = "text/css";
        style.id = "__tealiumGDPRecStyle";
        if (style.styleSheet) {
            style.styleSheet.cssText = dtc.css;
        } else {
            style.appendChild(document.createTextNode(dtc.css));
        }
        head.appendChild(style);
        mDiv.innerHTML = dtc.html;
        mDiv.id = "__tealiumGDPRecModal";
        body.appendChild(mDiv);
        scr.language = "javascript";
        scr.type = "text/javascript";
        scr.text = "try{" + dtc.js + "} catch(e){utag.DB(e)}";
        scr.id = "__tealiumGDPRecScript";
        head.appendChild(scr);
    };
    utag.track_old = utag.track;
    utag.track = function(a, b, c, d) {
        if (typeof a == "string") a = {
            event: a,
            data: b,
            cfg: {
                cb: c,
                uids: d
            }
        };
        if (a.event === "update_consent_cookie" && b.consent_categories) {
            utag.gdpr.updateConsentCookie(b.consent_categories);
        } else {
            if (utag.gdpr.getConsentState() === 0) {
                if (!utag.gdpr.noqueue) utag.gdpr.queue.push({
                    event: a.event,
                    data: utag.handler.C(a.data),
                    cfg: utag.handler.C(a.cfg)
                });
            }
            utag.gdpr.refreshCookie();
            return utag.track_old.apply(this, arguments);
        }
    };
    utag.loader.OU_old = utag.loader.OU;
    utag.loader.OU = function() {
        utag.loader.OU_old();
        utag.gdpr.applyConsentState();
    };
    if (utag.gdpr.preferences_prompt.single_cookie) {
        window.utag_cfg_ovrd = window.utag_cfg_ovrd || {};
        window.utag_cfg_ovrd.nocookie = true;
    }
    if (!utag.gdpr.consent_prompt.isEnabled && utag.gdpr.getConsentState() == 0) {
        utag.gdpr.setAllCategories(utag.gdpr.preferences_prompt.defaultState, !0);
    }
    if (typeof utag_cfg_ovrd != 'undefined') {
        for (utag._i in utag.loader.GV(utag_cfg_ovrd)) utag.cfg[utag._i] = utag_cfg_ovrd[utag._i]
    };
    utag.loader.PINIT = function(a, b, c) {
        utag.DB("Pre-INIT");
        if (utag.cfg.noload) {
            return;
        }
        try {
            this.GET();
            if (utag.handler.RE('view', utag.data, "blr")) {
                utag.handler.LR(utag.data);
            }
        } catch (e) {
            utag.DB(e)
        };
        a = this.cfg;
        c = 0;
        for (b in this.GV(a)) {
            if (a[b].block == 1 || (a[b].load > 0 && (typeof a[b].src != 'undefined' && a[b].src != ''))) {
                a[b].block = 1;
                c = 1;
                this.bq[b] = 1;
            }
        }
        if (c == 1) {
            for (b in this.GV(a)) {
                if (a[b].block) {
                    a[b].id = b;
                    if (a[b].load == 4) a[b].load = 1;
                    a[b].cb = function() {
                        var d = this.uid;
                        utag.loader.cfg[d].cbf = 1;
                        utag.loader.LOAD(d)
                    };
                    this.AS(a[b]);
                }
            }
        }
        if (c == 0) this.INIT();
    };
    utag.loader.INIT = function(a, b, c, d, e) {
        utag.DB('utag.loader.INIT');
        if (this.ol == 1) return -1;
        else this.ol = 1;
        if (utag.cfg.noview != true) utag.handler.RE('view', utag.data, "alr");
        utag.rpt.ts['i'] = new Date();
        d = this.cfgsort;
        for (a = 0; a < d.length; a++) {
            e = d[a];
            b = this.cfg[e];
            b.id = e;
            if (b.block != 1) {
                if (utag.loader.bk[b.id] || ((utag.cfg.readywait || utag.cfg.noview) && b.load == 4)) {
                    this.f[b.id] = 0;
                    utag.loader.LOAD(b.id)
                } else if (b.wait == 1 && utag.loader.rf == 0) {
                    utag.DB('utag.loader.INIT: waiting ' + b.id);
                    this.wq.push(b)
                    this.f[b.id] = 2;
                } else if (b.load > 0) {
                    utag.DB('utag.loader.INIT: loading ' + b.id);
                    this.lq.push(b);
                    this.AS(b);
                }
            }
        }
        if (this.wq.length > 0) utag.loader.EV('', 'ready', function(a) {
            if (utag.loader.rf == 0) {
                utag.DB('READY:utag.loader.wq');
                utag.loader.rf = 1;
                utag.loader.WQ();
            }
        });
        else if (this.lq.length > 0) utag.loader.rf = 1;
        else if (this.lq.length == 0) utag.loader.END();
        return 1
    };
    utag.loader.EV('', 'ready', function(a) {
        if (utag.loader.efr != 1) {
            utag.loader.efr = 1;
            try {
                if (!utag.gdpr.consent_prompt.noShow) {
                    if (!utag.gdpr.getConsentState()) {
                        if (utag.gdpr.consent_prompt.isEnabled) {
                            utag.gdpr.showExplicitConsent();
                        }
                    }
                }
            } catch (e) {
                utag.DB(e);
            }
        }
    })
    if (utag.cfg.readywait || utag.cfg.waittimer) {
        utag.loader.EV('', 'ready', function(a) {
            if (utag.loader.rf == 0) {
                utag.loader.rf = 1;
                utag.cfg.readywait = 1;
                utag.DB('READY:utag.cfg.readywait');
                setTimeout(function() {
                    utag.loader.PINIT()
                }, utag.cfg.waittimer || 1);
            }
        })
    } else {
        utag.loader.PINIT()
    }
}
//tealium universal tag - utag.6 ut4.0.202003101654, Copyright 2020 Tealium.com Inc. All Rights Reserved.
try {
    (function(id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
        if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) {
            u.loader = function(o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        b = m;
                    } else {
                        b = a.createElement("iframe");
                    }
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id;
                }
                for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l]);
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function() {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function() {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                if (o.type != "img" && !m) {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b);
                        }
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function(e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1,
            "link": 1
        };
        u.isEmptyObject = function(o, a) {
            for (a in o) {
                if (utag.ut.hasOwn(o, a)) return false;
            }
            return true;
        };
        u.toBoolean = function(val) {
            val = val || "";
            return val === true || val.toLowerCase() === "true" || val.toLowerCase() === "on";
        };
        u.shouldUpdateConfigOnLink = function() {
            var key;
            if (!u.isEmptyObject(u.data.config.custom_map) || !u.isEmptyObject(u.data.set)) {
                return true;
            }
            for (key in u.data.config) {
                if (key.match("user_id|page_path|page_title|page_location")) {
                    return true;
                }
            }
            return false;
        };
        u.hasgtagjs = function() {
            window.gtagRename = window.gtagRename || "" || "gtag";
            if (utag.ut.gtagScriptRequested) {
                return true;
            }
            var i, s = document.getElementsByTagName("script");
            for (i = 0; i < s.length; i++) {
                if (s[i].src && s[i].src.indexOf("gtag/js") >= 0 && (s[i].id && s[i].id.indexOf("utag") > -1)) {
                    return true;
                }
            }
            var data_layer_name = "" || "dataLayer";
            window[data_layer_name] = window[data_layer_name] || [];
            if (typeof window[window.gtagRename] !== "function") {
                window[window.gtagRename] = function() {
                    window[data_layer_name].push(arguments);
                };
                var cross_track = u.toBoolean("true"),
                    cross_track_domains = "shopify.com, shopify.ca, ";
                if (cross_track && cross_track_domains !== "") {
                    window[window.gtagRename]("set", "linker", {
                        domains: cross_track_domains.split(","),
                        accept_incoming: true
                    });
                }
                window[window.gtagRename]("js", new Date());
            }
            return false;
        };
        u.scriptrequested = u.hasgtagjs();
        u.o = window[window.gtagRename];
        u.map_func = function(arr, obj, item) {
            var i = arr.shift();
            obj[i] = obj[i] || {};
            if (arr.length > 0) {
                u.map_func(arr, obj[i], item);
            } else {
                obj[i] = item;
            }
        };
        u.setGlobalProperties = function(data, reset, custom_property) {
            var map = {
                    "user_id": {
                        "name": "user_id",
                        "type": "exists",
                        "reset": true
                    },
                    "page_path": {
                        "name": "page_path",
                        "type": "exists",
                        "reset": true
                    },
                    "page_title": {
                        "name": "page_title",
                        "type": "exists",
                        "reset": true
                    },
                    "page_location": {
                        "name": "page_location",
                        "type": "exists",
                        "reset": false
                    }
                },
                prop, g = {};
            if (custom_property && reset) {
                g[custom_property] = "";
            }
            for (prop in utag.loader.GV(map)) {
                if (reset && map[prop].reset) {
                    g[map[prop].name] = "";
                } else {
                    if (map[prop].type === "bool") {
                        if (data[prop] == true || data[prop] === "true") {
                            g[map[prop].name] = true;
                        }
                    } else if (map[prop].type === "exists") {
                        if (data[prop]) {
                            g[map[prop].name] = data[prop];
                        }
                    }
                }
            }
            if (!u.isEmptyObject(g)) {
                u.o("set", g);
            }
        };
        u.item = function(imp, len) {
            var g = {},
                i, j, key, items = [];
            if (imp === true) {
                len = len || u.data.impression_id.length || u.data.impression_name.length;
                for (i = 0; i < len; i++) {
                    g = {};
                    g.id = (u.data.impression_id[i] ? u.data.impression_id[i] : "");
                    g.name = (u.data.impression_name[i] ? u.data.impression_name[i] : "");
                    g.brand = (u.data.impression_brand[i] ? u.data.impression_brand[i] : "");
                    g.variant = (u.data.impression_variant[i] ? u.data.impression_variant[i] : "");
                    g.category = (u.data.impression_category[i] ? u.data.impression_category[i] : "");
                    g.price = (u.data.impression_price[i] ? u.data.impression_price[i] : "");
                    g.list_name = (u.data.impression_list_name ? u.data.impression_list_name : "");
                    g.list_position = (u.data.impression_list_position[i] ? u.data.impression_list_position[i] : "");
                    for (key in u.data.cdm_product_scope) {
                        if (Array.isArray(u.data.cdm_product_scope[key])) {
                            g[key] = u.data.cdm_product_scope[key][i];
                        } else {
                            g[key] = u.data.cdm_product_scope[key];
                        }
                    }
                    items.push(g);
                }
            } else {
                len = len || u.data.product_id.length || u.data.product_name.length;
                for (i = 0; i < len; i++) {
                    g = {};
                    if (u.data.autofill_params === "true") {
                        for (j = 0; j < u.data.product_id.length; j++) {
                            u.data.product_name[j] = u.data.product_name[j] || u.data.product_id[j];
                            u.data.product_unit_price[j] = u.data.product_unit_price[j] || "1.00";
                            u.data.product_quantity[j] = u.data.product_quantity[j] || "1";
                        }
                    }
                    g.id = u.data.product_id[i];
                    g.name = (u.data.product_name[i] ? u.data.product_name[i] : "");
                    g.brand = (u.data.product_brand[i] ? u.data.product_brand[i] : "");
                    g.category = (u.data.product_category[i] ? u.data.product_category[i] : "");
                    g.coupon = (u.data.product_promo_code[i] ? u.data.product_promo_code[i] : "");
                    g.price = (u.data.product_unit_price[i] ? u.data.product_unit_price[i] : "");
                    g.quantity = (u.data.product_quantity[i] ? u.data.product_quantity[i] : "");
                    g.variant = (u.data.product_variant[i] ? u.data.product_variant[i] : "");
                    g.list_position = (u.data.product_list_position[i] ? u.data.product_list_position[i] : "");
                    g.list_name = (u.data.product_list_name ? u.data.product_list_name : "");
                    for (key in u.data.cdm_product_scope) {
                        if (Array.isArray(u.data.cdm_product_scope[key])) {
                            g[key] = u.data.cdm_product_scope[key][i];
                        } else {
                            g[key] = u.data.cdm_product_scope[key];
                        }
                    }
                    items.push(g);
                }
            }
            return items;
        };
        u.promotion = function(len) {
            var f, g, promo = [];
            len = len || u.data.promo_id.length;
            for (f = 0; f < len; f++) {
                g = {};
                g.id = u.data.promo_id[f];
                g.name = (u.data.promo_name[f] ? u.data.promo_name[f] : u.data.promo_id[f]);
                g.creative_name = (u.data.promo_creative_name[f] ? u.data.promo_creative_name[f] : "");
                g.creative_slot = (u.data.promo_creative_slot[f] ? u.data.promo_creative_slot[f] : "");
                promo.push(g);
            }
            return promo;
        };
        u.event_map = {
            "add_to_cart": [{
                "name": "value"
            }, {
                "name": "currency"
            }, {
                "name": "items"
            }],
            "add_to_wishlist": [{
                "name": "value"
            }, {
                "name": "currency"
            }, {
                "name": "items"
            }],
            "begin_checkout": [{
                "name": "value"
            }, {
                "name": "currency"
            }, {
                "name": "items"
            }, {
                "name": "coupon"
            }],
            "checkout_progress": [{
                "name": "value"
            }, {
                "name": "currency"
            }, {
                "name": "items"
            }, {
                "name": "coupon"
            }, {
                "name": "checkout_step"
            }],
            "exception": [{
                "name": "description"
            }, {
                "name": "fatal"
            }],
            "generate_lead": [{
                "name": "value"
            }, {
                "name": "currency"
            }, {
                "name": "transaction_id"
            }],
            "login": [{
                "name": "method"
            }],
            "purchase": [{
                "name": "transaction_id",
                "required": true
            }, {
                "name": "value"
            }, {
                "name": "currency"
            }, {
                "name": "tax"
            }, {
                "name": "shipping"
            }, {
                "name": "affiliation"
            }, {
                "name": "coupon"
            }, {
                "name": "items"
            }],
            "refund": [{
                "name": "transaction_id",
                "required": true
            }, {
                "name": "value"
            }, {
                "name": "currency"
            }, {
                "name": "tax"
            }, {
                "name": "shipping"
            }, {
                "name": "affiliation"
            }, {
                "name": "coupon"
            }, {
                "name": "items"
            }],
            "remove_from_cart": [{
                "name": "value"
            }, {
                "name": "currency"
            }, {
                "name": "items"
            }],
            "screen_view": [{
                "name": "screen_name"
            }],
            "search": [{
                "name": "search_term"
            }],
            "select_content": [{
                "name": "content_type"
            }, {
                "name": "items"
            }, {
                "name": "promotions"
            }],
            "set_checkout_option": [{
                "name": "checkout_step"
            }, {
                "name": "checkout_option"
            }],
            "share": [{
                "name": "method"
            }, {
                "name": "content_type"
            }, {
                "name": "content_id"
            }],
            "sign_up": [{
                "name": "method"
            }],
            "timing_complete": [{
                "name": "name",
                "required": true
            }, {
                "name": "value",
                "required": true
            }, {
                "name": "event_category"
            }, {
                "name": "event_label"
            }],
            "view_item": [{
                "name": "items"
            }],
            "view_item_list": [{
                "name": "items"
            }],
            "view_promotion": [{
                "name": "promotions"
            }],
            "view_search_results": [{
                "name": "search_term"
            }]
        };
        u.std_params = {
            "transaction_id": function() {
                return u.data.order_id;
            },
            "affiliation": function() {
                return u.data.order_store;
            },
            "value": function(event) {
                if (event === "timing_complete") {
                    return u.data.event.value;
                }
                return u.data.order_total;
            },
            "currency": function() {
                return u.data.order_currency;
            },
            "tax": function() {
                return u.data.order_tax;
            },
            "shipping": function() {
                return u.data.order_shipping;
            },
            "coupon": function() {
                return u.data.order_coupon_code;
            },
            "description": function() {
                return u.data.event.description;
            },
            "fatal": function() {
                return u.toBoolean(u.data.event.fatal);
            },
            "screen_name": function() {
                return u.data.event.screen_name;
            },
            "method": function() {
                return u.data.event.method;
            },
            "search_term": function() {
                return u.data.event.search_term;
            },
            "content_type": function() {
                return u.data.event.content_type;
            },
            "content_id": function() {
                return u.data.event.content_id;
            },
            "promotions": function(event) {
                if (event === "select_content" && u.data.event.content_type !== "product") {
                    return u.promotion(1);
                } else if (event !== "select_content") {
                    return u.promotion();
                }
            },
            "name": function() {
                return u.data.event.name;
            },
            "event_category": function() {
                return u.data.event.event_category;
            },
            "event_label": function() {
                return u.data.event.event_label;
            },
            "checkout_step": function() {
                return u.data.checkout_step;
            },
            "checkout_option": function() {
                return u.data.checkout_option;
            },
            "items": function(event) {
                if (event === "view_item" || event === "add_to_cart" || event === "remove_from_cart") {
                    return u.item(false, 1);
                }
                if (event === "view_item_list") {
                    return u.item(true);
                }
                if (event === "select_content" && u.data.event.content_type) {
                    return u.item(false, 1);
                }
                return u.item();
            }
        };
        u.map = {
            "last_shop_id": "cdm.dimension3-shop_id-page_view",
            "user_token": "cdm.dimension13-multi_track_token-page_view",
            "canonical_url": "cdm.dimension6-cannonical-page_view",
            "experiment_variation_id": "cdm.dimension7-test_variation-page_view",
            "affiliate": "cdm.dimension8-affiliate-page_view",
            "page_category": "cdm.dimension9-category 1-page_view",
            "page_group": "cdm.dimension10-category 2-page_view",
            "page_topic": "cdm.dimension11-category 3-page_view",
            "event_category": "event.event_category",
            "event_value": "eventValue,event.value",
            "event_action": "eventAction,event_name",
            "event_label": "event.event_label",
            "event_non_interaction": "event.non_interaction",
            "tealium_event": "hitType",
            "page_url": "cdm.dimension12-page_url-page_view",
            "dom.query_string": "cdm.dimension17-query_string-page_view",
            "_sm_6_17": "cdm.dimension18-clientId",
            "_sm_6_18": "cdm.dimension19-clientId",
            "dom.referrer": "cdm.dimension23-previous_page_url"
        };
        u.extend = [function(a, b) {
            try {
                b['_sm_6_17'] = "clientID";
            } catch (e) {
                utag.DB(e);
            }
            try {
                b['_sm_6_18'] = "clientId";
            } catch (e) {
                utag.DB(e);
            }
        }, function(a, b) {
            try {
                if ((b['tealium_event'].toString().toLowerCase().indexOf('event'.toLowerCase()) > -1 && b['event_action'].toString().toLowerCase().indexOf('click'.toLowerCase()) > -1 && b['event_category'].toString().toLowerCase().indexOf('DMEXCO'.toLowerCase()) > -1 && b['event_label'].toString().toLowerCase().indexOf('appointment'.toLowerCase()) > -1)) {
                    b['event_label'] = 'DMEXCO';
                    b['event_action'] = 'Click';
                    b['event_category'] = 'Appointment'
                }
            } catch (e) {
                utag.DB(e)
            }
        }];
        u.send = function(a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                utag.DB("send:6");
                utag.DB(b);
                var c, d, e, f, h, i, cdm, cdm_event_flag, event_param, prop;
                u.data = {
                    "trackingId": "hv5y21qhcks7",
                    "qsp_delim": "&",
                    "kvp_delim": "=",
                    "base_url": "https://www.googletagmanager.com/gtag/js?id=##utag_tracking_id##",
                    "tracking_id": "UA-82702-49, UA-82702-3",
                    "cross_track": "true",
                    "cross_track_domains": "shopify.com, shopify.ca, ",
                    "allow_display_features": "false",
                    "screen_view": "false",
                    "anonymize_ip": "false",
                    "clear_global_vars": "false",
                    "optimize_id": "",
                    "use_amp_client_id": "false",
                    "event_name": "",
                    "data_layer_name": "",
                    "checkout_step": "",
                    "checkout_option": "",
                    "product_action_list": "",
                    "product_list_position": "",
                    "product_variant": [],
                    "impression_id": [],
                    "impression_name": [],
                    "impression_price": [],
                    "impression_category": [],
                    "impression_brand": [],
                    "impression_variant": [],
                    "impression_list_name": [],
                    "impression_list_position": [],
                    "promo_id": [],
                    "promo_name": [],
                    "promo_creative_name": [],
                    "promo_creative_slot": [],
                    "product_id": [],
                    "product_name": [],
                    "product_sku": [],
                    "product_brand": [],
                    "product_category": [],
                    "product_subcategory": [],
                    "product_quantity": [],
                    "product_unit_price": [],
                    "product_discount": [],
                    "product_promo_code": [],
                    "cdm_product_scope": {},
                    "page_view_event_data": {},
                    "set": {},
                    "config": {
                        "custom_map": {}
                    },
                    "event": {},
                    "items": []
                };
                for (c = 0; c < u.extend.length; c++) {
                    try {
                        d = u.extend[c](a, b);
                        if (d == false) return
                    } catch (e) {}
                };
                utag.DB("send:6:EXTENSIONS");
                utag.DB(b);
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.map_func(e[f].split("."), u.data, b[d]);
                        }
                    } else {
                        h = d.split(":");
                        if (h.length === 2 && b[h[0]] === h[1]) {
                            if (u.map[d]) {
                                u.data.event_name = u.map[d];
                            }
                        }
                    }
                }
                utag.DB("send:6:MAPPINGS");
                utag.DB(u.data);
                u.data.order_id = u.data.order_id || b._corder || "";
                u.data.order_total = u.data.order_total || b._ctotal || "";
                u.data.order_subtotal = u.data.order_subtotal || b._csubtotal || "";
                u.data.order_shipping = u.data.order_shipping || b._cship || "";
                u.data.order_tax = u.data.order_tax || b._ctax || "";
                u.data.order_store = u.data.order_store || b._cstore || "";
                u.data.order_currency = u.data.order_currency || b._ccurrency || "";
                u.data.order_coupon_code = u.data.order_coupon_code || b._cpromo || "";
                u.data.customer_id = u.data.customer_id || b._ccustid || "";
                if (u.data.product_id.length === 0 && b._cprod !== undefined) {
                    u.data.product_id = b._cprod.slice(0);
                }
                if (u.data.product_name.length === 0 && b._cprodname !== undefined) {
                    u.data.product_name = b._cprodname.slice(0);
                }
                if (u.data.product_sku.length === 0 && b._csku !== undefined) {
                    u.data.product_sku = b._csku.slice(0);
                }
                if (u.data.product_brand.length === 0 && b._cbrand !== undefined) {
                    u.data.product_brand = b._cbrand.slice(0);
                }
                if (u.data.product_category.length === 0 && b._ccat !== undefined) {
                    u.data.product_category = b._ccat.slice(0);
                }
                if (u.data.product_subcategory.length === 0 && b._ccat2 !== undefined) {
                    u.data.product_subcategory = b._ccat2.slice(0);
                }
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (u.data.product_unit_price.length === 0 && b._cprice !== undefined) {
                    u.data.product_unit_price = b._cprice.slice(0);
                }
                if (u.typeOf(u.data.tracking_id) === "string" && u.data.tracking_id !== "") {
                    u.data.tracking_id = u.data.tracking_id.replace(/\s/g, "").split(",");
                }
                if (!u.data.tracking_id) {
                    utag.DB(u.id + ": Tag not fired: Required attribute not populated");
                    return;
                }
                for (i = 0; i < u.data.tracking_id.length; i++) {
                    if (!/^[a-zA-Z]{1}-|^[a-zA-Z]{2}-/.test(u.data.tracking_id[i])) {
                        u.data.tracking_id[i] = "UA-" + u.data.tracking_id[i];
                    }
                }
                u.data.base_url = u.data.base_url.replace("##utag_tracking_id##", u.data.tracking_id[0]);
                if (u.data.data_layer_name) {
                    u.data.base_url = u.data.base_url + "&l=" + u.data.data_layer_name;
                }
                u.data.event.send_to = u.data.event.send_to || u.data.tracking_id;
                if (u.data.customer_id) {
                    u.data.config.user_id = u.data.customer_id;
                }
                if (u.toBoolean(u.data.clear_global_vars)) {
                    u.setGlobalProperties(u.data.config, true);
                    for (prop in utag.loader.GV(u.data.set)) {
                        u.setGlobalProperties(u.data.set, true, prop);
                    }
                }
                u.setGlobalProperties(u.data.config, false);
                u.setGlobalProperties(u.data.set, false);
                if (!u.data.event_name && u.data.order_id) {
                    u.data.event_name = "purchase";
                }
                cdm = [];
                for (d in u.data.cdm) {
                    cdm_event_flag = false;
                    cdm = d.split("-");
                    var cdm_name, cdm_event;
                    cdm[0] = cdm[0].replace("contentGroup", "content_group");
                    if (cdm[0].indexOf("content_group") >= 0) {
                        cdm_name = cdm[0];
                        cdm_event = cdm[2] || cdm[1] || "all";
                    } else {
                        cdm_name = cdm[1] || cdm[0];
                        cdm_event = cdm[2];
                        u.data.config.custom_map[cdm[0]] = cdm_name;
                    }
                    if (cdm_event === "all") {
                        u.data.config[cdm_name] = u.data.cdm[d];
                    } else if (cdm_event === "link" && a === "link") {
                        cdm_event_flag = true;
                    } else if (cdm_event === "ecom" && u.data.event_name && u.data.event_name.match(/add_payment_info|add_to_cart|add_to_wishlist|begin_checkout|checkout_progress|purchase|refund|remove_from_cart|product_click|promotion_click|set_checkout_option|view_item|view_item_list|view_promotion/)) {
                        cdm_event_flag = true;
                    } else if (cdm_event === "prod") {
                        u.data.cdm_product_scope[cdm_name] = u.data.cdm[d];
                    } else if (cdm_event === "page_view") {
                        u.data.page_view_event_data[cdm_name] = u.data.cdm[d];
                    } else if (u.data.event_name === cdm_event) {
                        cdm_event_flag = true;
                    }
                    if (cdm_event_flag) {
                        u.data.event[cdm_name] = u.data.cdm[d];
                    }
                }
                if (u.toBoolean(u.data.anonymize_ip) && u.data.config.anonymize_ip === undefined) {
                    u.data.config.anonymize_ip = true;
                }
                if (u.toBoolean(u.data.cross_track) && u.data.config.linker === undefined) {
                    u.data.config.linker = {
                        "accept_incoming": u.toBoolean(u.data.cross_track),
                        "domains": u.data.cross_track_domains
                    };
                }
                if (u.data.allow_display_features === "false" && u.data.config.allow_display_features === undefined && u.data.config.allow_ad_personalization_signals === undefined) {
                    u.data.config.allow_ad_personalization_signals = false;
                }
                if (u.data.config.allow_display_features !== undefined && u.data.config.allow_ad_personalization_signals === undefined) {
                    u.data.config.allow_ad_personalization_signals = u.toBoolean(u.data.config.allow_display_features);
                    delete u.data.config.allow_display_features;
                }
                if (u.toBoolean(u.data.enhanced_link_attribution) && !u.data.config.link_attribution) {
                    u.data.config.link_attribution = true;
                }
                if (u.data.optimize_id && u.data.config.optimize_id === undefined) {
                    u.data.config.optimize_id = u.data.optimize_id;
                }
                if (u.data.use_amp_client_id && u.data.config.use_amp_client_id === undefined) {
                    u.data.config.use_amp_client_id = u.data.use_amp_client_id;
                }
                u.data.config.send_page_view = false;
                if (a === "view") {
                    for (i = 0; i < u.data.tracking_id.length; i++) {
                        u.o("config", u.data.tracking_id[i], u.data.config);
                        u.o("require", "dcmn", {
                            "trackingID": u.data.trackingId
                        });
                    }
                    if (u.toBoolean(u.data.screen_view)) {
                        u.o("event", "screen_view", u.data.event);
                    } else {
                        u.o("event", "page_view", u.data.page_view_event_data);
                    }
                }
                if (u.data.event_name) {
                    if (u.data.event_name === "product_click" && a === "link") {
                        u.data.event.content_type = "product";
                        u.data.event_name = "select_content";
                    } else if (u.data.event_name === "promotion_click" && a === "link") {
                        u.data.event_name = "select_content";
                    }
                    if (u.data.event.non_interaction) {
                        u.data.event.non_interaction = true;
                    }
                    if (u.event_map[u.data.event_name]) {
                        for (i = 0; i < u.event_map[u.data.event_name].length; i++) {
                            event_param = u.event_map[u.data.event_name][i];
                            u.data.event[event_param.name] = u.std_params[event_param.name](u.data.event_name);
                            if (u.data.event[event_param.name] === undefined && event_param.required) {
                                utag.DB(u.id + ": Event: " + u.data.event_name + ": Required attribute not populated");
                            }
                        }
                    }
                    if (u.data.event_name !== "product_click" && u.data.event_name !== "promotion_click") {
                        if (a === "link" && u.shouldUpdateConfigOnLink()) {
                            for (i = 0; i < u.data.tracking_id.length; i++) {
                                u.o("config", u.data.tracking_id[i], u.data.config);
                            }
                        }
                        u.o("event", u.data.event_name, u.data.event);
                    }
                }
                if (!u.hasgtagjs()) {
                    u.scriptrequested = true;
                    utag.ut.gtagScriptRequested = true;
                    u.loader({
                        "type": "script",
                        "src": u.data.base_url,
                        "cb": null,
                        "loc": "script",
                        "id": "utag_6",
                        "attrs": {}
                    });
                }
                utag.DB("send:6:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("6", "shopify.main"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.37 ut4.0.202003101655, Copyright 2020 Tealium.com Inc. All Rights Reserved.
try {
    (function(id, loader) {
        var u = {};
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        if (utag.ut.loader === undefined) {
            u.loader = function(o) {
                var a, b, c, l;
                a = document;
                if (o.type === "iframe") {
                    b = a.createElement("iframe");
                    b.setAttribute("height", "1");
                    b.setAttribute("width", "1");
                    b.setAttribute("style", "display:none");
                    b.setAttribute("src", o.src);
                } else if (o.type === "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                    b.src = o.src;
                    return;
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.src = o.src;
                }
                if (o.id) {
                    b.id = o.id;
                }
                if (typeof o.cb === "function") {
                    b.hFlag = 0;
                    b.onreadystatechange = function() {
                        if ((this.readyState === 'complete' || this.readyState === 'loaded') && !b.hFlag) {
                            b.hFlag = 1;
                            o.cb();
                        }
                    };
                    b.onload = function() {
                        if (!b.hFlag) {
                            b.hFlag = 1;
                            o.cb();
                        }
                    };
                }
                l = o.loc || "head";
                c = a.getElementsByTagName(l)[0];
                if (c) {
                    utag.DB("Attach to " + l + ": " + o.src);
                    if (l === "script") {
                        c.parentNode.insertBefore(b, c);
                    } else {
                        c.appendChild(b);
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        u.ev = {
            'view': 1
        };
        u.map = {};
        u.extend = [];
        u.send = function(a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                var c, d, e, f;
                u.data = {
                    "base_url": "//cdn.bizible.com/scripts/bizible.js",
                };
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.data[e[f]] = b[d];
                        }
                    }
                }
                u.loader_cb = function() {};
                u.loader({
                    "type": "script",
                    "src": u.data.base_url,
                    "cb": u.loader_cb,
                    "loc": "script",
                    "id": 'utag_37'
                });
            }
        };
        utag.o[loader].loader.LOAD(id);
    }('37', 'shopify.main'));
} catch (error) {
    utag.DB(error);
}
(function() {
    if (typeof utag != 'undefined') {
        utag.initcatch = true;
        for (var i in utag.loader.GV(utag.loader.cfg)) {
            var b = utag.loader.cfg[i];
            if (b.load != 4) {
                utag.initcatch = false;
                break
            };
            if (b.wait == 1) {
                utag.initcatch = false;
                break
            }
        };
        if (utag.initcatch) utag.handler.INIT();
    }
})();