var http = require("http");
var axios = require("axios");
var superagent = require("superagent");
var request = require("request");
var fetch = require("node-fetch");
var nock = require("nock");
var HOST = "test-perf";

axios.defaults.baseURL = `http://${HOST}`;

const fetchURL = `http://${HOST}/test`;

var Benchmark = require("benchmark");
var suite = new Benchmark.Suite();

nock("http://test-perf")
    .persist()
    // .log(console.log)
    .post("/test")
    .reply(200, "ok")
    .get("/test")
    .reply(200, "ok");

// http request
suite.add("http.request POST request", {
    defer: true,
    fn: defer => {
        var req = http.request(
            { host: HOST, path: "/test", method: "POST" },
            res => {
                res.resume().on("end", () => defer.resolve());
            }
        );
        req.write();
        req.end();
    }
});

suite.add("http.request GET request", {
    defer: true,
    fn: defer => {
        http
            .request({ path: "/test", host: HOST }, res => {
                res.resume().on("end", () => defer.resolve());
            })
            .end();
    }
});

// node-fetch
suite.add("node-fetch POST request", {
    defer: true,
    fn: defer => {
        fetch(fetchURL, { method: "POST" }).then(() => defer.resolve());
    }
});

suite.add("node-fetch GET request", {
    defer: true,
    fn: defer => {
        fetch(fetchURL).then(() => defer.resolve());
    }
});

// axios
suite.add("axios GET request", {
    defer: true,
    fn: defer => {
        axios.get("/test").then(() => defer.resolve());
    }
});

suite.add("axios POST request", {
    defer: true,
    fn: defer => {
        axios.post("/test").then(() => defer.resolve());
    }
});

// superagent
suite.add("superagent GET request", {
    defer: true,
    fn: defer => {
        superagent.get(`http://${HOST}/test`).end(() => {
            defer.resolve();
        });
    }
});

suite.add("superagent POST request", {
    defer: true,
    fn: defer => {
        superagent
            .post(`http://${HOST}/test`)
            .send()
            .end(() => defer.resolve());
    }
});

// request
suite.add("Request GET request", {
    defer: true,
    fn: defer => {
        request(`http://${HOST}/test`, () => defer.resolve());
    }
});

suite.add("Request POST request", {
    defer: true,
    fn: defer => {
        request.post({ url: `http://${HOST}/test` }, () => defer.resolve());
    }
});

suite.on("complete", function(defer) {
    console.log("Fastest is " + this.filter("fastest").map("name"));
});

suite.on("cycle", function(event) {
    console.log(String(event.target));
});

suite.run({ async: true });
