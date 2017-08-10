<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/8/6
  Time: 15:34
  To change this template use File | Settings | File Templates.
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta name="author" content="Ludovic Chabant">
    <meta name="generator" content="PieCrust 2.0.0rc2+23.70f722a1f447.20170111" />
    <meta name="description" content="PieCrust, a simple website engine and static website generator" />

    <title>PieCrust</title>

    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Lobster">

    <link rel="stylesheet" href="${ctx}/static/css/piecrust.css" type="text/css" />
    <link rel="stylesheet" href="${ctx}/static/css/pygments.css" type="text/css" />
    <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

</head>
<body data-spy="scroll">
<div id="wrapper">
    <nav class="navbar navbar-default" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#piecrust-menu">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="/piecrust/en/latest/">PieCrust</a>
            </div>
            <div class="collapse navbar-collapse" id="piecrust-menu">
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="/piecrust/en/latest/getting-started">Getting Started</a></li>
                    <li><a href="/piecrust/en/latest/docs">Documentation</a></li>
                    <li><a href="/piecrust/en/latest/api">Code</a></li>
                    <li><a href="/piecrust/en/latest/support">Support</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <header class="splash">
        <h1>PieCurst</h1>
        <div class="splash-logo">
        </div>
        <div class="splash-main">
            <p><strong>PieCrust</strong> is a static website generator and flat-file <abbr title="Content Management System">CMS</abbr>. No complex setup,
                databases, or administrative panels – it’s all text files. Simple, beautiful,
                and yummy.</p>
        </div>
    </header>


    <section class="splash splash-chalkboard">
        <div class="container">
            <h2>Chef's Features</h2>
            <div class="row">
                <div class="col-sm-6 col-md-4">
                    <img class="splash-icon" src="${ctx}/static/image/cake-white.png" />
                    <h3>Store in the cellar</h3>
                    <p>Because all your site&rsquo;s content and configuration is stored in simple text
                        files, it fits nicely in a revision control system like Git or Mercurial. It&rsquo;s
                        not only more practical, but also safer!</p>
                </div>
                <div class="col-sm-6 col-md-4">
                    <img class="splash-icon hidden-xs" src="${ctx}/static/image/chef-hat-white.png" />
                    <h3>Serve on the counter</h3>
                    <p>Although it can run a flat-file <abbr title="Content Management System">CMS</abbr>, <strong>PieCrust</strong> is designed as a static
                        website generator. This means it can &ldquo;bake&rdquo; your website into simple HTML files
                        that you can publish with a minimum of resources on your server. A sudden spike
                        of visitors can&rsquo;t crash your MySQL database when you don&rsquo;t need one!</p>
                </div>
                <div class="clearfix visible-sm-block"></div>
                <div class="col-sm-6 col-md-4">
                    <img class="splash-icon hidden-sm" src="${ctx}/static/image/whisk-white.png" />
                    <h3>Familiar ingredients</h3>
                    <p><strong>PieCrust</strong> uses all the ingredients you already like, such as Markdown and
                        Textile for formatting, or Jinja2 and Mustache for templating.</p>
                </div>
                <div class="clearfix visible-md-block visible-lg-block"></div>
                <div class="col-sm-6 col-md-4">
                    <h3>Fully functioning oven</h3>
                    <p><strong>PieCrust</strong> comes out-of-the-box with an asset processing pipeline, capable of
                        handling most of your files &ndash; Less/Sass processing, CSS and JS
                        minification, concatenation, and more.</p>
                </div>
                <div class="clearfix visible-sm-block"></div>
                <div class="col-sm-6 col-md-4">
                    <img class="splash-icon visible-xs" src="${ctx}/static/image/chef-hat-white.png" />
                    <h3>Super-fast service</h3>
                    <p>Because <strong>PieCrust</strong> is also designed as a lightweight (flat-file) <abbr title="Content Management System">CMS</abbr>, it can
                        render your pages in less than a few milliseconds in most cases. It means that
                        previewing or generating your website is super fast!</p>
                </div>
                <div class="col-sm-6 col-md-4">
                    <h3>A La Carte Content</h3>
                    <p><strong>PieCrust</strong> comes with a powerful system of page sources, routes, and taxonomies.
                        This means you can completely customize how you want to author your content, and
                        how it gets exposed.</p>
                </div>
            </div>
        </div>
    </section>
    <section class="splash splash-board">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-md-8 col-md-offset-2">
                    <h2>Get Started Now</h2>
                    <p>You can follow the detailed instructions on the <a href="/piecrust/en/latest/getting-started">Getting Started</a>
                        page, or, if you&rsquo;re already experienced in the culinary arts:</p>
                    <div class="highlight"><pre>virtualenv pcenv
&lt;activate pcenv&gt;
pip install piecrust --pre
chef init mynewwebsite
cd mynewwebsite
chef prepare post my-first-post
chef serve
chef bake
</pre></div>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <p>&copy;2014 &mdash; Baked with <em><a href="http://bolt80.com/piecrust/">PieCrust</a> 2.0.0rc2+23.70f722a1f447.20170111</em>.</p>
    </footer>
</div>

<script src="${ctx}/static/js/piecrust.js"></script>


<script type="text/javascript">

    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-3426592-10']);
    _gaq.push(['_trackPageview']);

    (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();

</script>


</body>
</html>
