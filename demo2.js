(function() {
    
    // Init som useful stuff for easier access (don't need 'em all)
    var   b2Vec2 = Box2D.Common.Math.b2Vec2
        , b2AABB = Box2D.Collision.b2AABB
        , b2BodyDef = Box2D.Dynamics.b2BodyDef
        , b2Body = Box2D.Dynamics.b2Body
        , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
        , b2Fixture = Box2D.Dynamics.b2Fixture
        , b2World = Box2D.Dynamics.b2World
        , b2MassData = Box2D.Collision.Shapes.b2MassData
        , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
        , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
        , b2DebugDraw = Box2D.Dynamics.b2DebugDraw
        , b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef
        , b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef;

    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    var SCALE,
        canvas,
        ctx,
        world,
        fixDef,
        shapes = {};
        
    var debug = false;
    
    var init = {
        start: function(id) {
            this.defaultProperties();
            this.canvas(id);
            
            box2d.create.world();
            box2d.create.defaultFixture();
            
            this.surroundings.leftWall();
            this.surroundings.rightWall();
            this.surroundings.ground();
            
            this.callbacks();


            var dataset = [{"year":2011,"country":"MQ","count":2},{"year":2011,"country":"AQ","count":373},{"year":2011,"country":"BG","count":426},{"year":2011,"country":"CK","count":257},{"year":2011,"country":"GL","count":1},{"year":2011,"country":"MN","count":215},{"year":2011,"country":"RE","count":19},{"year":2011,"country":"GP","count":832},{"year":2011,"country":"AI","count":147},{"year":2011,"country":"ES","count":13255},{"year":2011,"country":"BM","count":282},{"year":2011,"country":"GU","count":25},{"year":2011,"country":"KR","count":509},{"year":2011,"country":"SJ","count":429},{"year":2011,"country":"FO","count":1},{"year":2011,"country":"IL","count":1939},{"year":2011,"country":"LB","count":44},{"year":2011,"country":"NU","count":20},{"year":2011,"country":"RS","count":359},{"year":2011,"country":"TW","count":4412},{"year":2011,"country":"PT","count":31529},{"year":2011,"country":"BB","count":823},{"year":2011,"country":"GI","count":41},{"year":2011,"country":"LS","count":309},{"year":2011,"country":"MW","count":1496},{"year":2011,"country":"CC","count":114},{"year":2011,"country":"GS","count":239},{"year":2011,"country":"UM","count":1524},{"year":2011,"country":"AF","count":3},{"year":2011,"country":"AL","count":60},{"year":2011,"country":"DZ","count":40},{"year":2011,"country":"AD","count":17},{"year":2011,"country":"AO","count":107},{"year":2011,"country":"AG","count":593},{"year":2011,"country":"PF","count":161},{"year":2011,"country":"BW","count":2565},{"year":2011,"country":"AR","count":13185},{"year":2011,"country":"AW","count":668},{"year":2011,"country":"AT","count":1411},{"year":2011,"country":"AZ","count":43},{"year":2011,"country":"BH","count":23},{"year":2011,"country":"BS","count":9398},{"year":2011,"country":"AU","count":107090},{"year":2011,"country":"KH","count":2581},{"year":2011,"country":"CV","count":27},{"year":2011,"country":"BD","count":61},{"year":2011,"country":"BY","count":27},{"year":2011,"country":"BE","count":1282},{"year":2011,"country":"BJ","count":170},{"year":2011,"country":"BT","count":4691},{"year":2011,"country":"BZ","count":36992},{"year":2011,"country":"GF","count":327},{"year":2011,"country":"BA","count":849},{"year":2011,"country":"BO","count":5264},{"year":2011,"country":"BR","count":28807},{"year":2011,"country":"GG","count":41},{"year":2011,"country":"BI","count":4},{"year":2011,"country":"CM","count":348},{"year":2011,"country":"CO","count":30748},{"year":2011,"country":"KY","count":3560},{"year":2011,"country":"CF","count":12},{"year":2011,"country":"TD","count":46},{"year":2011,"country":"CN","count":7102},{"year":2011,"country":"CL","count":57843},{"year":2011,"country":"CX","count":136},{"year":2011,"country":"CD","count":153},{"year":2011,"country":"HR","count":490},{"year":2011,"country":"CU","count":8202},{"year":2011,"country":"GM","count":2594},{"year":2011,"country":"CA","count":1278562},{"year":2011,"country":"CR","count":111151},{"year":2011,"country":"CY","count":130},{"year":2011,"country":"CZ","count":528},{"year":2011,"country":"DK","count":4439},{"year":2011,"country":"DM","count":355},{"year":2011,"country":"DO","count":5990},{"year":2011,"country":"EG","count":641},{"year":2011,"country":"EC","count":53730},{"year":2011,"country":"SV","count":3825},{"year":2011,"country":"EE","count":500},{"year":2011,"country":"ET","count":1302},{"year":2011,"country":"FK","count":213},{"year":2011,"country":"FJ","count":3323},{"year":2011,"country":"FI","count":1996},{"year":2011,"country":"GE","count":1},{"year":2011,"country":"FR","count":22536},{"year":2011,"country":"GH","count":284},{"year":2011,"country":"DE","count":9723},{"year":2011,"country":"GR","count":1095},{"year":2011,"country":"GD","count":453},{"year":2011,"country":"GN","count":9},{"year":2011,"country":"GT","count":19082},{"year":2011,"country":"SE","count":3004},{"year":2011,"country":"IN","count":12650},{"year":2011,"country":"GY","count":955},{"year":2011,"country":"VA","count":24},{"year":2011,"country":"HT","count":947},{"year":2011,"country":"HN","count":17988},{"year":2011,"country":"HK","count":1658},{"year":2011,"country":"HU","count":1808},{"year":2011,"country":"KI","count":52},{"year":2011,"country":"ID","count":8702},{"year":2011,"country":"IS","count":40555},{"year":2011,"country":"IR","count":1577},{"year":2011,"country":"IQ","count":1544},{"year":2011,"country":"IM","count":22},{"year":2011,"country":"IE","count":2869},{"year":2011,"country":"IT","count":2509},{"year":2011,"country":"JM","count":2409},{"year":2011,"country":"JO","count":277},{"year":2011,"country":"KZ","count":152},{"year":2011,"country":"JP","count":2990},{"year":2011,"country":"KP","count":3},{"year":2011,"country":"UA","count":158},{"year":2011,"country":"KE","count":13901},{"year":2011,"country":"KW","count":1942},{"year":2011,"country":"MF","count":63},{"year":2011,"country":"LA","count":605},{"year":2011,"country":"LV","count":47},{"year":2011,"country":"LR","count":83},{"year":2011,"country":"LY","count":196},{"year":2011,"country":"PS","count":9},{"year":2011,"country":"LI","count":12},{"year":2011,"country":"LT","count":228},{"year":2011,"country":"LU","count":415},{"year":2011,"country":"MM","count":823},{"year":2011,"country":"MP","count":497},{"year":2011,"country":"MY","count":7316},{"year":2011,"country":"MV","count":5},{"year":2011,"country":"MG","count":1486},{"year":2011,"country":"MT","count":200},{"year":2011,"country":"MC","count":12},{"year":2011,"country":"MH","count":48},{"year":2011,"country":"MU","count":97},{"year":2011,"country":"FM","count":1},{"year":2011,"country":"ME","count":355},{"year":2011,"country":"MA","count":997},{"year":2011,"country":"MZ","count":330},{"year":2011,"country":"NA","count":4506},{"year":2011,"country":"NP","count":2045},{"year":2011,"country":"NO","count":4559},{"year":2011,"country":"MX","count":209668},{"year":2011,"country":"NC","count":1106},{"year":2011,"country":"NL","count":2773},{"year":2011,"country":"NG","count":648},{"year":2011,"country":"NI","count":14635},{"year":2011,"country":"NZ","count":36045},{"year":2011,"country":"NF","count":466},{"year":2011,"country":"OM","count":1318},{"year":2011,"country":"LC","count":703},{"year":2011,"country":"PW","count":323},{"year":2011,"country":"PY","count":900},{"year":2011,"country":"PA","count":36590},{"year":2011,"country":"PG","count":3835},{"year":2011,"country":"PH","count":118},{"year":2011,"country":"PL","count":1051},{"year":2011,"country":"QA","count":548},{"year":2011,"country":"PE","count":63069},{"year":2011,"country":"PR","count":37929},{"year":2011,"country":"RO","count":1142},{"year":2011,"country":"RU","count":480},{"year":2011,"country":"RW","count":1397},{"year":2011,"country":"SH","count":24},{"year":2011,"country":"KN","count":426},{"year":2011,"country":"PM","count":265},{"year":2011,"country":"VC","count":341},{"year":2011,"country":"WS","count":76},{"year":2011,"country":"SN","count":896},{"year":2011,"country":"SA","count":775},{"year":2011,"country":"SL","count":2},{"year":2011,"country":"SG","count":1118},{"year":2011,"country":"SK","count":13},{"year":2011,"country":"SI","count":48},{"year":2011,"country":"LK","count":4738},{"year":2011,"country":"ZA","count":23023},{"year":2011,"country":"SR","count":2712},{"year":2011,"country":"SZ","count":130},{"year":2011,"country":"CH","count":3844},{"year":2011,"country":"SD","count":204},{"year":2011,"country":"TJ","count":1},{"year":2011,"country":"TN","count":185},{"year":2011,"country":"TZ","count":15819},{"year":2011,"country":"TH","count":5988},{"year":2011,"country":"UG","count":5581},{"year":2011,"country":"TC","count":407},{"year":2011,"country":"TL","count":10},{"year":2011,"country":"TO","count":82},{"year":2011,"country":"VN","count":3080},{"year":2011,"country":"ZM","count":1861},{"year":2011,"country":"TR","count":3729},{"year":2011,"country":"TT","count":15495},{"year":2011,"country":"VG","count":3212},{"year":2011,"country":"AE","count":33779},{"year":2011,"country":"VI","count":3317},{"year":2011,"country":"ZW","count":6157},{"year":2011,"country":"GB","count":83231},{"year":2011,"country":"UY","count":888},{"year":2011,"country":"UZ","count":28},{"year":2011,"country":"VU","count":197},{"year":2011,"country":"VE","count":9861}];

            var dataset_filter = [];
            // console.log(dataset.length)

            for (var i = 0; i < dataset.length; i++) {
                if(dataset[i].year > 0 && dataset[i].count > 1000) {
                    dataset[i].count = dataset[i].count * 0.1;

                    // if (dataset[i].count > 6000) dataset[i].count = 7000 * (1 + (dataset[i].count.toString().substring(0, 1) * 0.1))
                    // if (dataset[i].count < 3000) dataset[i].count = 3000 * (1 - (dataset[i].count.toString().substring(0, 1) * 0.1))
                    dataset_filter.push(dataset[i])
                }
            }
            // console.log(dataset_filter.length)
            // setTimeout(function() { for (var i=0; i<20; i++) {add.random();} }, 0);
            // setTimeout(function() { for (var i=0; i<20; i++) {add.random();} }, 200);
            // setTimeout(function() { for (var i=0; i<20; i++) {add.random();} }, 400);
            // setTimeout(function() { for (var i=0; i<20; i++) {add.random();} }, 600);
            // setTimeout(function() { for (var i=0; i<20; i++) {add.random();} }, 800);
            // setTimeout(function() { for (var i=0; i<20; i++) {add.random();} }, 1000);
            // setTimeout(function() { for (var i=0; i<20; i++) {add.random();} }, 1200);
            // setTimeout(function() { for (var i=0; i<20; i++) {add.random();} }, 1400);
            // setTimeout(function() { for (var i=0; i<20; i++) {add.random();} }, 1600);
            // setTimeout(function() { for (var i=0; i<20; i++) {add.random();} }, 1800);

            setTimeout(function() { 
                for (var i=0; i < dataset_filter.length; i++) {
                    var options = {};
                    options.radius = dataset_filter[i].count + 1000;
                    add.random(options);
                } 
            }, 0);

            
            
            // On my signal: Unleash hell.
            (function hell() {
                loop.step();
                loop.update();
                if (debug) {
                    world.DrawDebugData();
                }
                loop.draw();
                requestAnimFrame(hell);
            })();
        },
        defaultProperties: function() {
            SCALE = 30;
        },
        canvas: function(id) {
            canvas = document.getElementById(id);
            ctx = canvas.getContext("2d");
        },
        surroundings: {
            rightWall: function() {
                //Original box: 740 x 380
                //Our box: 200 x 800
                add.box({
                    // x: 25.7,        // 740 / 30 + 1.1
                    // y:  6.3,        // 380px / 30 / 2
                    // height: 12.6,   // 380px / 30
                    x: 7.76,        // 200px / 30 + 1.1
                    y:  13.3,        // 800px / 30 / 2
                    height: 28.7,   // 800px / 30
                    width: 2.05,
                    isStatic: true
                });
            },
            ground: function() {
                add.box({
                    // x: 12.3,        // 740 / 30 / 2
                    // y:  13.7,
                    // height: 2,
                    // width:24.6,     // 740 / 30
                    x: 3.3,        // 200 / 30 / 2
                    y:  27.2,
                    height: 1,
                    width:7,     // 200 / 30
                    isStatic: true
                });
            },
            leftWall: function() {
                add.box({
                    x: -1,
                    // y:  6.3,        // 380px / 30 / 2
                    // height: 12.6,   // 380px / 30
                    y:  13.3,        // 800px / 30 / 2
                    height: 28.7,   // 800px / 30
                    width:2,
                    isStatic: true
                });
            }
        },
        callbacks: function() {

        }
    };        
     
     
    var add = {
        random: function(options) {
            options = options || {};
            // if (Math.random() < 0.5){
            //     this.circle(options);
            // } else {
            //     this.box(options);
            // }
            this.circle(options)
        },
        circle: function(options) {
            options.radius = (options.radius) * 0.0001;
            var shape = new Circle(options);
            shapes[shape.id] = shape;
            box2d.addToWorld(shape);
        },
        box: function(options) {
            options.width = options.width || 0.5 + Math.random()*2;
            options.height = options.height || 0.5 + Math.random()*2;
            var shape = new Box(options);
            shapes[shape.id] = shape;
            box2d.addToWorld(shape);
        }
    };

    var box2d = {
        addToWorld: function(shape) {
            var bodyDef = this.create.bodyDef(shape);
            var body = world.CreateBody(bodyDef);
            if (shape.radius) {
                fixDef.shape = new b2CircleShape(shape.radius);
            } else {
                fixDef.shape = new b2PolygonShape;
                fixDef.shape.SetAsBox(shape.width / 2, shape.height / 2);
            }
            body.CreateFixture(fixDef);
        },
        create: {
            world: function() {
                world = new b2World(
                    new b2Vec2(0,30)    //gravity
                    ,true                 //allow sleep
                );
                
                if (debug) {
                    var debugDraw = new b2DebugDraw();
                    debugDraw.SetSprite(ctx);
                    debugDraw.SetDrawScale(30.0);
                    debugDraw.SetFillAlpha(0.3);
                    debugDraw.SetLineThickness(1.0);
                    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
                    world.SetDebugDraw(debugDraw);
                }
            },
            defaultFixture: function() {
                fixDef = new b2FixtureDef;
                fixDef.density = 6.0;
                fixDef.friction = 10;
                fixDef.restitution = 0.6;
            },
            bodyDef: function(shape) {
                var bodyDef = new b2BodyDef;
        
                if (shape.isStatic == true) {
                    bodyDef.type = b2Body.b2_staticBody;
                } else {
                    bodyDef.type = b2Body.b2_dynamicBody;
                }
                bodyDef.position.x = shape.x;
                bodyDef.position.y = shape.y;
                bodyDef.userData = shape.id;
                bodyDef.angle = shape.angle;
            
                return bodyDef;
            }
        },
        get: {
            bodySpec: function(b) {
                return {
                    x: b.GetPosition().x, 
                    y: b.GetPosition().y, 
                    angle: b.GetAngle(), 
                    center: {
                        x: b.GetWorldCenter().x, 
                        y: b.GetWorldCenter().y
                    }
                };
            }
        }
    };


    var loop = {
        step: function() {
            var stepRate = 1 / 60;
            world.Step(stepRate, 10, 10);
            world.ClearForces();
        },
        update: function () {            
            for (var b = world.GetBodyList(); b; b = b.m_next) {
                if (b.IsActive() && typeof b.GetUserData() !== 'undefined' && b.GetUserData() != null) {
                    shapes[b.GetUserData()].update(box2d.get.bodySpec(b));
                }
            }
        },
        draw: function() {            
            if (!debug) ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (var i in shapes) {
                shapes[i].draw();
            }
        }
    };    
    
    var helpers = {
        randomColor: function() {
            // var letters = '0123456789ABCDEF'.split(''),
            //     color = '#';
            // for (var i = 0; i < 6; i++ ) {
            //     color += letters[Math.round(Math.random() * 15)];
            // }
            return '#ffffff';//'#'+(~~(Math.random()*(1<<24))).toString(16);
        }
    };
    
    /* Shapes down here */
    
    var Shape = function(v) {
        this.id = Math.round(Math.random() * 1000000);
        this.x = v.x || 2;
        this.y = v.y || 0;
        this.angle = 0;
        this.color = helpers.randomColor();
        this.center = { x: null, y: null };
        this.isStatic = v.isStatic || false;
        
        this.update = function(options) {
            this.angle = options.angle;
            this.center = options.center;
            this.x = options.x;
            this.y = options.y;
        };
    };
    
    var Circle = function(options) {
        Shape.call(this, options);
        this.radius = options.radius || 1;
        
        this.draw = function() {
            ctx.save();
            ctx.translate(this.x * SCALE, this.y * SCALE);
            ctx.rotate(this.angle);
            ctx.translate(-(this.x) * SCALE, -(this.y) * SCALE);
            ctx.fillStyle = this.color;
            ctx.strokeStyle = '#2f6593';
            ctx.beginPath();
            ctx.arc(this.x * SCALE, this.y * SCALE, this.radius * SCALE, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            ctx.stroke()
            ctx.restore();
        };
    };
    Circle.prototype = Shape;
    
    var Box = function(options) {
        Shape.call(this, options);
        this.width = options.width || Math.random()*2+0.5;
        this.height = options.height || Math.random()*2+0.5;
        
        this.draw = function() {
            ctx.save();
            ctx.translate(this.x * SCALE, this.y * SCALE);
            ctx.rotate(this.angle);
            ctx.translate(-(this.x) * SCALE, -(this.y) * SCALE);
            ctx.fillStyle = this.color;
            ctx.fillRect(
                (this.x-(this.width / 2)) * SCALE,
                (this.y-(this.height / 2)) * SCALE,
                this.width * SCALE,
                this.height * SCALE
            );
            ctx.restore();
        };
    };
    Box.prototype = Shape;
    
    init.start('box2d-demo');

})();