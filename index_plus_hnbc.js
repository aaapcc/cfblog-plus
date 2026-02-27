/**------【①.谋而后定：配置区】-----**/

'use strict';

// 全局错误处理
addEventListener('fetch', event => {
  event.passThroughOnException();
  event.respondWith(handlerRequest(event).catch(error => {
    return new Response(`Worker Error: ${error.message}`, {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }));
});

const ACCOUNT = {
  "user" : "admin",
  "password" : "1234",
  "third_token" : "cfblog",
  "cacheZoneId":"935xxxxxxxxxxxx",
  "cacheToken":"AQxxxxxxxx",
  "kv_var": this['CFBLOG'],
}

const OPT = {
  "siteDomain" : "域名",   // 域名(不带https 也不带/)
  "siteName" : "博客名称",   //博客名称
  "siteDescription":"",   //博客描述
  "keyWords":"",   //关键字
  "logo":"https://gh.static.aaqq.site/cfblog/themes/PandaPRO-2.4.2/img/hnbc-mmlogo.png",   //主题的logo
  "siteFavicon": "https://gh.static.aaqq.site/cfblog/themes/PandaPRO-2.4.2/ico/hnbc-icon-192.png",   //主题的Icon
  "siteAuthorImage": "https://gh.static.aaqq.site/cfblog/themes/PandaPRO-2.4.2/img/author.jpg",   //主题的头像
  "siteDefaultCover": "https://gh.static.aaqq.site/cfblog/themes/PandaPRO-2.4.2/img/cate10.png",   //主题的大背景图
  "theme_github_path":"https://cdn.jsdelivr.net/gh/aaapcc/cfblog-plus@master/themes/",   //主题路径
  "themeURL" : "https://raw.githubusercontent.com/aaapcc/cfblog-plus/master/themes/PandaPRO-2.4.2/",   // 模板地址,以 "/"" 结尾
  "pageSize" : 10,   //每页文章数
  "recentlySize" : 6,   //最近文章数
  "recentlyType" : 1,   //最近文章类型：1-按创建时间倒序（按id倒序），2-按修改时间排序
  "readMoreLength":150,   //阅读更多截取长度
  "cacheTime" : 60*60*24*2, //文章在浏览器的缓存时长(秒),建议=文章更新频率
  "html404" : `<b>404</b>`,   //404页面代码
  "codeBeforHead":``,   //其他代码,显示在</head>前
  "codeBeforBody":``,   //其他代码,显示在</body>前
  "commentCode":`
  <script>
    $(".entry-info").append('<a style="float:right;margin-left:5px;" href="'+location.href.replace('/article/','/admin/edit/')+'" target="_blank">编辑</a>')
  </script>
  `,
  "widgetOther":``,   //20201224新增参数,用于右侧 小部件扩展
  "otherCodeA":`热度`,   //模板开发用的其他自定义变量
  "otherCodeB":``,
  "otherCodeC":``,
  "otherCodeD":``,
  "otherCodeE":``,
  "copyRight" :``,
  "robots":`User-agent: *
  Disallow: /admin`,   //robots.txt设置
  
  /*--前后台共用参数--*/
  "top_flag":`<topflag>[置顶]</topflag>`,   //置顶标志
  "top_flag_style":`<style>topflag {color:#ff5722}</style>`,   //置顶标志的样式

  /*--后台参数--*/
  "hidden_flag":`<hiddenflag>[隐藏]</hiddenflag>`,   //隐藏标志
  "hidden_flag_style":`<style>hiddenflag {color:#000000;background-color: #ffff00;}</style>`,   //隐藏标志的样式
  
  "admin_home_idx": 1,   //后台首页tab索引设置：1-我的文章,2-新建,3-设置,4-发布
  "editor_page_scripts": `
    let sitemapxml=\`<a  tabindex="0"  role="button"  type="submit" id="btn_export" class="btn btn-default"  href="/admin/sitemap.xml" >导出sitemap.xml</a>\`
    $('form#importForm a').last().after(sitemapxml);   //设置页面添加导出sitemap.xml导出按钮
    let searchxml=\`<a  tabindex="0"  role="button"  type="submit" id="btn_export" class="btn btn-default"  href="/admin/search.xml" >导出search.xml</a>\`
    $('form#importForm a').last().after(searchxml);   //设置页面添加导出search.xml导出按钮
    
    //关闭email匹配和@匹配，否则图片使用jsdelivr的cdn，如果有版本号会匹配成“mailto:xxx”从而导致显示异常
    mdEditor.settings.emailLink=false;
    mdEditor.settings.atLink=false;

    //mdEditor.settings.toc=false
    //mdEditor.settings.tocm=true  // Using [TOCM]
    //mdEditor.settings.tocContainer="#custom-toc-container" // 自定义 ToC 容器层
    //mdEditor.settings.gfm=false
    //mdEditor.settings.tocDropdown=true
    //mdEditor.settings.markdownSourceCode=true // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
    mdEditor.settings.emoji=true
    mdEditor.settings.taskList=true;   // 默认不解析
    mdEditor.settings.tex=true;   // 默认不解析
    mdEditor.settings.flowChart=true;   // 默认不解析
    mdEditor.settings.sequenceDiagram=true;   // 默认不解析

    //开启全局html标签解析-不推荐
    //mdEditor.settings.htmlDecode=true;
    
    window.mdEditor=mdEditor;  
    //editormd工具栏上添加html标签解析开关  
    mdEditor.getToolbarHandles().parseHtml=function(){
      let ele = $(".editormd-menu li a i:last");
      if(ele.hasClass('fa-toggle-off')){
        ele.removeClass('fa-toggle-off').addClass('fa-toggle-on');
        mdEditor.settings.htmlDecode = true;
      }else if(ele.hasClass('fa-toggle-on')){
        ele.removeClass('fa-toggle-on').addClass('fa-toggle-off')
        mdEditor.settings.htmlDecode = false;
      }
      mdEditor.setMarkdown(mdEditor.getMarkdown());
    }
    setTimeout(function(){
      $(".editormd-menu").append('<li class="divider" unselectable="on">|</li><li><a href="javascript:;" title="解析HTML标签" unselectable="on"><i class="fa fa-toggle-off" name="parseHtml" unselectable="on"> 解析HTML标签 </i></a></li>')
      mdEditor.setToolbarHandler(mdEditor.getToolbarHandles())
    },300)

    //【修改】默认图片设置为空，不自动填充
    if($('#img').val()=="")$('#img').val('');
    
    //默认时间设置为当前时间
    if($('#createDate').val()=="")$('#createDate').val(new Date(new Date().getTime()+8*60*60*1000).toJSON().substr(0,16));
    `,//后台编辑页面脚本
    "searchPageSize": 10,
    "searchMinLength": 2,
    
    //【新增】评论配置
    "commentConfig": {
      "requireEmail": false,      // 是否必填邮箱
      "needReview": true,         // 是否需要审核
      "rateLimit": 60,            // 同一IP多久可发一次（分钟）
      "pageSize": 20              // 每页显示多少条评论
    }
};

//---对部分配置进行处理---
{
  //CFBLOG 通用变量
  this.CFBLOG = ACCOUNT.kv_var;
  
  //默认为非私密博客
  if(null==OPT.privateBlog){
    OPT.privateBlog=false;
  }
  //处理themeURL、theme_github_path参数设定
  if(OPT.themeURL.substr(-1)!='/'){
    OPT.themeURL=OPT.themeURL+'/';
  }
  if(OPT.theme_github_path.substr(-1)!='/'){
    OPT.theme_github_path=OPT.theme_github_path+'/';
  }
  //置顶样式对于前台来说，与codeBeforHead结合即可
  if(OPT.top_flag_style){
  OPT.codeBeforHead += OPT.top_flag_style
  }
}

/**------【②.猎杀时刻：请求处理入口】-----**/

//监听请求
addEventListener("fetch",event=>{
  event.respondWith(handlerRequest(event))
})

async function handlerRequest(event){
  let request = event.request
  let url=new URL(request.url)
  let paths=url.pathname.trim("/").split("/")

  //【新增】评论API路由
  if (paths[0] === "api" && paths[1] === "comments") {
    if (paths[2] === "get" && paths[3]) {
      return await handle_get_comments(paths[3]);  // /api/comments/get/000001
    }
    if (paths[2] === "post" && paths[3]) {
      return await handle_post_comment(request, paths[3]);  // /api/comments/post/000001
    }
    if (paths[2] === "config") {
      return await handle_get_comment_config();  // /api/comments/config
    }
  }

  //【新增】评论管理API
  if (paths[0] === "api" && paths[1] === "admin") {
    // 需要验证管理员权限
    if (!parseBasicAuth(request) && !request.headers.get("Cookie")?.includes("admin_auth=")) {
      return new Response("Unauthorized", { status: 401 });
    }
    
    if (paths[2] === "comments" && paths[3] === "pending") {
      return await handle_get_pending_comments();  // /api/admin/comments/pending
    }
    if (paths[2] === "comments" && paths[3] === "review") {
      return await handle_review_comment(request);  // /api/admin/comments/review
    }
    if (paths[2] === "comments" && paths[3] === "article" && paths[4]) {
      return await handle_get_all_comments(paths[4]);  // /api/admin/comments/article/000001
    }
    // 新增：快速获取全站所有评论
    if (paths[2] === "comments" && paths[3] === "all-fast") {
      return await handle_get_all_comments_fast();  // /api/admin/comments/all-fast
    }
  }

  // 文章页直接处理，绕过缓存
  if (paths[0] === "article") {
    let articleId = paths[1].replace('.html', '');
    let response = await handle_article(articleId);
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    return response;
  }

  //校验权限 - 修改为支持独立登录页
  if (paths[0] === "admin") {
    // 如果是登录页，不验证权限
    if (paths[1] === "login") {
      // 放行，继续处理
    } 
    // 如果是处理登录请求的API，也不验证
    else if (paths[1] === "login" && request.method === "POST") {
      // 放行，继续处理
    }
    // 其他admin路径需要验证
    else {
      // 先检查cookie
      const cookies = request.headers.get("Cookie") || "";
      if (cookies.includes("admin_auth=")) {
        // 有cookie，放行（实际应用中应该验证cookie有效性）
        // 这里简化处理，只要cookie存在就认为已登录
      } 
      // 再检查Basic Auth（兼容原来的登录方式）
      else if (!parseBasicAuth(request)) {
        // 未登录，重定向到登录页
        return new Response(null, {
          status: 302,
          headers: {
            "Location": "/admin/login/"
          }
        });
      }
    }
  } else if(("admin"==paths[0]||true===OPT.privateBlog) &&!parseBasicAuth(request)){
    return new Response("Unauthorized",{
      headers:{
        "WWW-Authenticate":'Basic realm="cfblog"',
        "Access-Control-Allow-Origin":"*"
      },
      status:401
    });
  }

  if (paths[0] === "search") {
    let response = await handle_search_page(request, url);
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    return response;
  }

  const D=caches.default,
      M="https://"+OPT.siteDomain+url.pathname,
      x=new Request(M, request);
  let k=await D.match(x);
  if(k){
    return k;
  }

  switch(paths[0]){
    case "favicon.ico":
      k = await handle_favicon(request);
      break;
    case "robots.txt":
      k = await handle_robots(request);
      break;
    case "sitemap.xml":
      k = await handle_sitemap(request);
      break;
    case "search.xml":
      k = await handle_search(request);
      break;
    case "admin":
      k = await handle_admin(request);
      break;
    case "":
    case "page":
    case "category":
    case "tags":
      k = await renderBlog(url);
      break;
    default:
      k= new Response(OPT.html404,{
        headers:{
          "content-type":"text/html;charset=UTF-8"
        },
        status:200
      })
      break;
  } 
  
  try{
    if("admin"==paths[0]){
      k.headers.set("Cache-Control","no-store")
    }else{
      k.headers.set("Cache-Control","public, max-age="+OPT.cacheTime),
      event.waitUntil(D.put(M,k.clone()))
    }
  }catch(e){}
  
  return k
}

/**------【③.分而治之：各种请求分开处理】-----**/

async function handle_favicon(request){
  let url = new URL(request.url)
  url.host="dash.cloudflare.com"
  return await fetch(new Request(url, request));
}

async function handle_robots(request){
  return new Response(OPT.robots+"\nSitemap: https://"+OPT.siteDomain+"/sitemap.xml",{
    headers:{
      "content-type":"text/plain;charset=UTF-8"
    },
    status:200
  });
}

async function handle_sitemap(request){
  let xml;
  if(OPT.sitemap_xml_url){
    let url = new URL(request.url)
    url.href = OPT.sitemap_xml_url.replace('cdn.jsdelivr.net/gh','raw.githubusercontent.com').replace('@','/');
    xml = await fetch(new Request(url, request));
    xml = await xml.text();
  }else{
    let articles_all=await getArticlesList()
    xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    for(var i=0;i<articles_all.length;i++){
      xml+="\n\t<url>",
      xml+="\n\t\t<loc>https://"+OPT.siteDomain+"/article/"+articles_all[i].id+"/"+articles_all[i].link+".html</loc>",
      xml+="\n\t\t<lastmod>"+articles_all[i].createDate.substr(0,10)+"</lastmod>",
      xml+="\n\t\t<changefreq>"+(void 0===articles_all[i].changefreq?"daily":articles_all[i].changefreq)+"</changefreq>",
      xml+="\n\t\t<priority>"+(void 0===articles_all[i].priority?"0.5":articles_all[i].priority)+"</priority>",
      xml+="\n\t</url>";
    }
    xml+="\n</urlset>"
  }
  return new Response(xml,{
    headers:{
        "content-type":"text/xml;charset=UTF-8"
    },
    status:200
  });
}

async function handle_search(request){
  let xml;
  if(OPT.search_xml_url){
    let url = new URL(request.url)
    url.href = OPT.search_xml_url.replace('cdn.jsdelivr.net/gh','raw.githubusercontent.com').replace('@','/');
    xml = await fetch(new Request(url, request));
    xml = await xml.text();
  }else{
    let articles_all=await getArticlesList()
    xml='<?xml version="1.0" encoding="UTF-8"?>\n<blogs>';
    for(var i=0;i<articles_all.length;i++){
      xml+="\n\t<blog>",
      xml+="\n\t\t<title>"+articles_all[i].title+"</title>";
      let article = await getArticle(articles_all[i].id);
      if(null != article){
        xml+="\n\t\t<content>"+article.contentMD.replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('&','&amp;')+"</content>"
      }
      xml+="\n\t\t<url>https://"+OPT.siteDomain+"/article/"+articles_all[i].id+"/"+articles_all[i].link+".html</url>",
      xml+="\n\t\t<time>"+articles_all[i].createDate.substr(0,10)+"</time>",
      xml+="\n\t</blog>";
    }
    xml+="\n</blogs>"
  }
  return new Response(xml,{
    headers:{
      "content-type":"text/xml;charset=UTF-8"
    },
    status:200
  });
}

async function renderBlog(url){
  let theme=url.searchParams.get("theme"),
      pageSize=url.searchParams.get("pageSize");
  if(theme){
    OPT.themeURL=OPT.theme_github_path+theme+"/";
  }
  if(pageSize){
    OPT.pageSize=parseInt(pageSize);
  }
  if(OPT.theme_github_path+"default/"==OPT.themeURL){
    OPT.themeURL=OPT.theme_github_path+"default2.0/";
  }
  
  let theme_html=await getThemeHtml("index"),
      menus=await getWidgetMenu(),
      categories=await getWidgetCategory(),
      tags=await getWidgetTags(),
      links=await getWidgetLink(),
      articles_all=await getArticlesList(),
      articles_recently=await getRecentlyArticles(articles_all);
  
  let paths = url.pathname.trim("/").split("/")
  let articles=[],
      pageNo=1
  
  switch(paths[0]||"page"){
  case "page":
    articles = articles_all
    pageNo = paths[1]||1
    break;
  case "tags":
  case "category":
    let category_tag = paths.slice(1).join("");
    if(paths.length>3 && paths.includes("page")){
      pageNo = paths[paths.indexOf("page")+1]
      category_tag = paths.slice(1, paths.lastIndexOf("page")-1).join("")
    }
    category_tag = decodeURIComponent(category_tag)
    articles = articles_all.filter(a => a[paths[0]].includes(category_tag))
    break;
  }
  pageNo = parseInt(pageNo)

  let articles_show = articles.slice((pageNo-1)*OPT.pageSize,pageNo*OPT.pageSize);
  processArticleProp(articles_show);

  let totalPages = 1;
  if (articles && articles.length > 0) {
    totalPages = Math.ceil(articles.length / OPT.pageSize);
  }

  let url_prefix = url.pathname.replace(/(.*)\/page\/\d+/,'$1/')
  if(url_prefix.substr(-1)=='/'){
    url_prefix=url_prefix.substr(0,url_prefix.length-1);
  }

  let newer=[{title:"上一页",url:url_prefix+"/page/"+(pageNo-1)}];
  if(1==pageNo){
    newer=[];
  }
  let older=[{title:"下一页",url:url_prefix+"/page/"+(pageNo+1)}];
  if(pageNo*OPT.pageSize>=articles.length){
    older=[];
  }

  let title=(pageNo>1 ? "page "+pageNo+" - " : "")+OPT.siteName,
      keyWord=OPT.keyWords,
      cfg={};
  cfg.widgetMenuList=menus,
  cfg.widgetCategoryList=categories,
  cfg.widgetTagsList=tags,
  cfg.widgetLinkList=links,
  cfg.widgetRecentlyList=articles_recently,
  cfg.articleList=articles_show,
  cfg.pageNewer=newer,
  cfg.pageOlder=older,
  cfg.title=title,
  cfg.keyWords=keyWord;
  
  cfg.total = articles ? articles.length : 0;
  cfg.currentPage = pageNo || 1;
  cfg.totalPages = totalPages;

  // 判断是否是分类页，并获取分类名称
  cfg.isCategory = false;
  cfg.categoryName = '';
  if (paths[0] === "category" && paths[1]) {
    cfg.isCategory = true;
    cfg.categoryName = decodeURIComponent(paths[1]);
  }
  
  cfg.OPT=OPT
  
  let html = Mustache.render(theme_html,cfg)
  
  return new Response(html,{
    headers:{
      "content-type":"text/html;charset=UTF-8"
    },
    status:200
  })
}

// 文章页处理 - 包含阅读量统计
async function handle_article(id){
  try {
    let formattedId = ("00000" + parseInt(id)).substr(-6);
    
    let theme_html = await getThemeHtml("article"),
        menus = await getWidgetMenu(),
        categories = await getWidgetCategory(),
        tags = await getWidgetTags(),
        links = await getWidgetLink(),
        articles_recently = await getRecentlyArticles();

    let articles_sibling = await getSiblingArticle(formattedId);
    
    // 强制读取文章，最多尝试3次
    let article = null;
    let maxAttempts = 3;
    let currentViews = 0;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      let rawData = await CFBLOG.get(formattedId);
      if (rawData) {
        try {
          article = JSON.parse(rawData);
          currentViews = article.views || 0;
          break;
        } catch (e) {
          // 解析失败，继续尝试
        }
      }
      if (attempt < maxAttempts) {
        await new Promise(r => setTimeout(r, 50));
      }
    }
    
    if (!article) {
      return new Response("文章不存在", { 
        status: 404,
        headers: { "content-type": "text/html;charset=UTF-8" }
      });
    }
    
    // 更新阅读量
    let newViews = currentViews + 1;
    article.views = newViews;
    
    // 保存文章
    await CFBLOG.put(formattedId, JSON.stringify(article));
    
    // 同步更新文章列表（等待完成）
    try {
      await updateArticleViewsInList(formattedId, newViews);
      console.log(`文章 ${formattedId} 阅读量更新为 ${newViews}`);
    } catch (e) {
      console.log('更新文章列表失败:', e);
    }

    processArticleProp([article]);

    let title = article.title.replace(nullToEmpty(OPT.top_flag), '').replace(nullToEmpty(OPT.hidden_flag), '') + " - " + OPT.siteName,
        keyWord = article.tags.concat(article.category).join(","),
        cfg = {};

    cfg.widgetMenuList = menus,
    cfg.widgetCategoryList = categories,
    cfg.widgetTagsList = tags,
    cfg.widgetLinkList = links,
    cfg.widgetRecentlyList = articles_recently,
    cfg.articleSingle = article,
    cfg.title = title,
    cfg.keyWords = keyWord;

    // 处理上一篇
    if (articles_sibling[0]) {
      let older = articles_sibling[0];
      older.url = "/article/" + older.id + ".html";
      cfg.articleOlder = [older];
    } else {
      cfg.articleOlder = [];
    }

    // 处理下一篇
    if (articles_sibling[2]) {
      let newer = articles_sibling[2];
      newer.url = "/article/" + newer.id + ".html";
      cfg.articleNewer = [newer];
    } else {
      cfg.articleNewer = [];
    }

    cfg.total = 0;
    cfg.currentPage = 1;
    cfg.totalPages = 1;
    cfg.OPT = OPT;

    // 获取相关文章（同分类或同标签的其他文章）
    let relatedArticles = [];
    if (article && article.category && article.category.length > 0) {
      // 获取所有文章列表
      let allArticles = await getArticlesList();
      
      // 过滤出同分类且不是当前文章的文章
      relatedArticles = allArticles.filter(a => 
        a.id !== article.id && // 不是当前文章
        a.category && // 有分类
        a.category.some(cat => article.category.includes(cat)) // 同分类
      ).slice(0, 5); // 取前5篇
      
      // 给相关文章添加 url
      relatedArticles.forEach(a => {
        a.url = "/article/" + a.id + ".html";
      });
    }

    cfg.relatedArticles = relatedArticles;

    //【新增】传递评论配置到模板
    cfg.commentConfig = OPT.commentConfig;

    let html = Mustache.render(theme_html, cfg);

    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
        "Cache-Control": "no-store, private",
        "X-Views-Current": article.views.toString()
      },
      status: 200
    });

  } catch (error) {
    return new Response(`文章页出错: ${error.message}`, {
      status: 500,
      headers: { "content-type": "text/plain;charset=UTF-8" }
    });
  }
}

// 更新文章列表中的views
async function updateArticleViewsInList(articleId, views) {
  try {
    // 重新获取最新的文章列表
    let articlesList = await getAllArticlesList();
    let updated = false;
    
    for (let i = 0; i < articlesList.length; i++) {
      if (articlesList[i].id === articleId) {
        console.log(`找到文章 ${articleId}，原阅读量: ${articlesList[i].views}，新阅读量: ${views}`);
        articlesList[i].views = views;
        updated = true;
        break;
      }
    }
    
    if (updated) {
      // 直接保存整个列表
      await CFBLOG.put("SYSTEM_INDEX_LIST", JSON.stringify(articlesList));
      console.log(`文章列表已更新，文章 ${articleId} 阅读量 = ${views}`);
    } else {
      console.log(`未找到文章 ${articleId}`);
    }
  } catch (error) {
    console.log('更新阅读量失败:', error);
  }
}

// 后台请求处理
async function handle_admin(request){
  let url = new URL(request.url),
      paths = url.pathname.trim("/").split("/"),
      html,
      json,
      file;
  
  // 处理登录页面请求
  if (paths[1] === "login" && request.method === "GET") {
    let login_html = await getThemeHtml("admin/login");
    return new Response(login_html, {
      headers: { "content-type": "text/html;charset=UTF-8" },
      status: 200
    });
  }

  // 处理登录API请求
  if (paths[1] === "login" && request.method === "POST") {
    try {
      const data = await request.json();
      console.log("登录尝试:", data.username);
      
      if (data.username === ACCOUNT.user && data.password === ACCOUNT.password) {
        // 登录成功，生成一个简单的token（这里用base64编码用户名+时间戳）
        const token = btoa(ACCOUNT.user + ":" + new Date().getTime());
        
        // 返回成功响应，同时设置cookie
        return new Response(JSON.stringify({
          success: true,
          message: "登录成功",
          redirect: "/admin/"
        }), {
          headers: { 
            "content-type": "application/json",
            "Set-Cookie": `admin_auth=${token}; Path=/; Max-Age=86400; HttpOnly` // 有效期1天
          }
        });
      } else {
        return new Response(JSON.stringify({
          success: false,
          message: "用户名或密码错误"
        }), {
          status: 401,
          headers: { "content-type": "application/json" }
        });
      }
    } catch (e) {
      console.error("登录处理错误:", e);
      return new Response(JSON.stringify({
        success: false,
        message: "请求格式错误"
      }), {
        status: 400,
        headers: { "content-type": "application/json" }
      });
    }
  }

  // 处理退出登录
  if (paths[1] === "logout") {
    // 清除cookie，然后重定向到登录页
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/admin/login/",
        "Set-Cookie": "admin_auth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly"
      }
    });
  }

  if(1==paths.length||"list"==paths[1]){
    let theme_html=await getThemeHtml("admin/index"),
        categoryJson=await getWidgetCategory(),
        menuJson=await getWidgetMenu(),
        linkJson=await getWidgetLink();
    
    // 获取用户名和站点名称
    let username = ACCOUNT.user || "admin";
    let siteName = OPT.siteName || "CF-Blog";
    
    // 先替换原有的占位符
    html = theme_html.replaceHtmlPara("categoryJson",JSON.stringify(categoryJson))
                    .replaceHtmlPara("menuJson",JSON.stringify(menuJson))
                    .replaceHtmlPara("linkJson",JSON.stringify(linkJson));
    
    // 替换用户名和站点名称占位符
    html = html.replace(/\{\{username\}\}/g, username).replace(/\{\{siteName\}\}/g, siteName);
                    
    if(OPT.admin_home_idx && OPT.admin_home_idx>=1 && OPT.admin_home_idx<=4){
      html = html.replace("$('#myTab li:eq(0) 1').tab('show')","$($('#myTab a[href*=\"'+location.hash+'\"]')[0]||$('#myTab a:eq("+OPT.admin_home_idx+")')).tab('show')")
    }
    if(OPT.top_flag_style){
      html += OPT.top_flag_style
    }
    if(OPT.hidden_flag_style){
      html += OPT.hidden_flag_style
    }
  }

  if("publish"==paths[1]){
    let articles_all=await getAllArticlesList(),
        tags=[];
    
    for(var i=0;i<articles_all.length;i++){
      if("object"==typeof articles_all[i].tags){
        for(var j=0;j<articles_all[i].tags.length;j++){
          if(articles_all[i].tags[j] 
            && articles_all[i].tags[j].length>0 
            && -1==tags.indexOf(articles_all[i].tags[j])){
            tags.push(articles_all[i].tags[j]);
          }
        }
      }
    }
    await saveWidgetTags(JSON.stringify(tags))
    
    if (await purge()) {
      json = '{"msg":"发布成功，缓存已清除","rst":true}';
    } else {
      json = '{"msg":"发布成功，但缓存清除失败","rst":true}';
    }
  }

  if("getList"==paths[1]){
    let pageNo=(undefined===paths[2]) ? 1 : parseInt(paths[2]),
        list=await admin_nextPage(pageNo, 20);
    json = JSON.stringify(list)
  }
  
  if("edit"==paths[1]){
      let id=paths[2],
          theme_html=await getThemeHtml("admin/edit"),
          categoryJson=JSON.stringify(await getWidgetCategory()),
          articleJson=JSON.stringify(await getArticle(id));
      
      // 获取用户名和站点名称
      let username = ACCOUNT.user || "admin";
      let siteName = OPT.siteName || "CF-Blog";
      
      // 先替换原有的占位符
      html = theme_html.replaceHtmlPara("categoryJson",categoryJson)
                      .replaceHtmlPara("articleJson",articleJson.replaceAll("script>","script＞"));
      
      // 替换用户名和站点名称占位符
      html = html.replace(/\{\{username\}\}/g, username)
                 .replace(/\{\{siteName\}\}/g, siteName);
      
      // 添加文章数量的初始值（0），等前端加载
      html = html.replace('id="articleCount">0', 'id="articleCount">0')
                 .replace('id="pendingCommentsCount">0', 'id="pendingCommentsCount">0');
  }
  
  if("saveConfig"==paths[1]){
    const ret=await parseReq(request);
    let widgetCategory=ret.WidgetCategory,
        widgetMenu=ret.WidgetMenu,
        widgetLink=ret.WidgetLink;
    
    if(checkFormat(widgetCategory) && checkFormat(widgetMenu) && checkFormat(widgetLink)){
      let success = await saveWidgetCategory(widgetCategory)
      success = success && await saveWidgetMenu(widgetMenu)
      success = success && await saveWidgetLink(widgetLink)
      json = success ? '{"msg":"saved","rst":true}' : '{"msg":"Save Faild!!!","ret":false}'
    }else{
      json = '{"msg":"Not a JSON object","rst":false}'
    }
  }
  
  if("import"==paths[1]){
    let importJson = (await parseReq(request)).importJson;
    
    if(checkFormat(importJson)){
      let importJsonObj = JSON.parse(importJson),
          keys = Object.keys(importJsonObj);
      for(let i=0;i<keys.length;++i){
        await saveArticle(keys[i], importJsonObj[keys[i]]);
      }
      json = '{"msg":"import success!","rst":true}'
    }else{
      json = '{"msg":" importJson Not a JSON object","rst":false}'
    }        
  }
  
  if("export"===paths[1]){
    async function exportArticle(arr=[],cursor="",limit=1){
      const list=await CFBLOG.list({limit:limit,cursor:cursor});
      if(!1 in list) return {};
      arr=arr.concat(list.keys)
      if(list.list_complete){
        let ret = {OPT:OPT};
        for(let i=0;i<arr.length;++i){
          const article = await CFBLOG.get(arr[i].name);
          if(null != article){
            ret[arr[i].name] = checkFormat(article)?JSON.parse(article):article
          }
        }
        return ret
      }
      return await exportArticle(arr,list.cursor,limit)
    }
    
    let articles=await exportArticle();
    file = {
      name: "cfblog-"+new Date().getTime()+".json",
      content: JSON.stringify(articles)
    }
  }
  
  if("search.xml"===paths[1]){
    let articles_all=await getArticlesList()
    let xml='<?xml version="1.0" encoding="UTF-8"?>\n<blogs>';
    for(var i=0;i<articles_all.length;i++){
      xml+="\n\t<blog>",
      xml+="\n\t\t<title>"+articles_all[i].title+"</title>";
      let article = await getArticle(articles_all[i].id);
      if(null != article){
        xml+="\n\t\t<content>"+article.contentMD.replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('&','&amp;')+"</content>"
      }
      xml+="\n\t\t<url>https://"+OPT.siteDomain+"/article/"+articles_all[i].id+"/"+articles_all[i].link+".html</url>",
      xml+="\n\t\t<time>"+articles_all[i].createDate.substr(0,10)+"</time>",
      xml+="\n\t</blog>";
    }
    xml+="\n</blogs>"
    file = {
      name: "search.xml",
      content: xml
    }
  }
  
  if("sitemap.xml"===paths[1]){
    let articles_all=await getArticlesList()
    let xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    for(var i=0;i<articles_all.length;i++){
      xml+="\n\t<url>",
      xml+="\n\t\t<loc>https://"+OPT.siteDomain+"/article/"+articles_all[i].id+"/"+articles_all[i].link+".html</loc>",
      xml+="\n\t\t<lastmod>"+articles_all[i].createDate.substr(0,10)+"</lastmod>",
      xml+="\n\t\t<changefreq>"+(void 0===articles_all[i].changefreq?"daily":articles_all[i].changefreq)+"</changefreq>",
      xml+="\n\t\t<priority>"+(void 0===articles_all[i].priority?"0.5":articles_all[i].priority)+"</priority>",
      xml+="\n\t</url>";
    }
    xml+="\n</urlset>"
    file = {
      name: "sitemap.xml",
      content: xml
    }
  }
  
  if("saveAddNew"==paths[1]){
    const ret=await parseReq(request);
    let title=ret.title,
        img=ret.img,
        link=ret.link,
        createDate=ret.createDate.replace('T',' '),
        category=ret.category,
        tags=ret.tags,
        priority=void 0===ret.priority?"0.5":ret.priority,
        changefreq=void 0===ret.changefreq?"daily":ret.changefreq,
        contentMD=ret["content-markdown-doc"],
        contentHtml=ret["content-html-code"],
        contentText="",
        top_timestamp=ret.top_timestamp*1,
        modify_timestamp=new Date().getTime()+8*60*60*1000,
        hidden=ret.hidden*1,
        id="";
    
    if(title.length>0
      && createDate.length>0
      && category.length>0
      && contentMD.length>0
      && contentHtml.length>0){

      id=await generateId(),
      contentText=contentHtml.replace(/<\/?[^>]*>/g,"").trim().substring(0,OPT.readMoreLength);
      let article={
        id:id,
        title:title,
        img:img,
        link:link,
        createDate:createDate,
        category:category,
        tags:tags,
        contentMD:contentMD,
        contentHtml:contentHtml,
        contentText:contentText,
        priority:priority,
        top_timestamp:top_timestamp,
        modify_timestamp:modify_timestamp,
        hidden:hidden,
        changefreq:changefreq,
        views: 0
      };
      
      await saveArticle(id,JSON.stringify(article));
      
      let articleWithoutHtml={
        id:id,
        title:title,
        img:img,
        link:link,
        createDate:createDate,
        category:category,
        tags:tags,
        contentText:contentText,
        priority:priority,
        top_timestamp:top_timestamp,
        modify_timestamp:modify_timestamp,
        hidden:hidden,
        changefreq:changefreq,
        views: 0
      },
      articles_all_old=await getAllArticlesList(),
      articles_all=[];
    
      articles_all.push(articleWithoutHtml),
      articles_all=articles_all.concat(articles_all_old),
      articles_all=sortArticle(articles_all),
      await saveArticlesList(JSON.stringify(articles_all))
      
      json = '{"msg":"added OK","rst":true,"id":"'+id+'"}'
    }else{
      json = '{"msg":"信息不全","rst":false}'
    }
  }
  
  if("delete"==paths[1]){
    let id=paths[2]
    if(6==id.length){
      await CFBLOG.delete(id);
      let e=await getAllArticlesList();
      for(let r=0;r<e.length;r++){
        if(id==e[r].id){
          e.splice(r,1);
          
          await saveArticlesList(JSON.stringify(e))
          json = '{"msg":"Delete ('+id+')  OK","rst":true,"id":"'+id+'"}'
          break;
        }
      }
    }else{
      json = '{"msg":"Delete  false ","rst":false,"id":"'+id+'"}'
    }
  }
  
  if("saveEdit"==paths[1]){
    const ret=await parseReq(request);
    let title=ret.title,
        img=ret.img,
        link=ret.link,
        createDate=ret.createDate.replace('T',' '),
        category=ret.category,
        tags=ret.tags,
        priority=void 0===ret.priority?"0.5":ret.priority,
        changefreq=void 0===ret.changefreq?"daily":ret.changefreq,
        contentMD=ret["content-markdown-doc"],
        contentHtml=ret["content-html-code"],
        contentText="",
        top_timestamp=ret.top_timestamp*1,
        modify_timestamp=new Date().getTime()+8*60*60*1000,
        hidden=ret.hidden*1,
        id=ret.id;
        
    if(title.length>0
      && createDate.length>0
      && category.length>0
      && contentMD.length>0
      && contentHtml.length>0){
          
      contentText=contentHtml.replace(/<\/?[^>]*>/g,"").trim().substring(0,OPT.readMoreLength);
      
      let oldArticle = await getArticle(id) || { views: 0 };
      
      let article={
        id:id,
        title:title,
        img:img,
        link:link,
        createDate:createDate,
        category:category,
        tags:tags,
        contentMD:contentMD,
        contentHtml:contentHtml,
        contentText:contentText,
        priority:priority,
        top_timestamp:top_timestamp,
        modify_timestamp:modify_timestamp,
        hidden:hidden,
        changefreq:changefreq,
        views: oldArticle.views || 0
      };
      
      await saveArticle(id,JSON.stringify(article));
      
      let articleWithoutHtml={
        id:id,
        title:title,
        img:img,
        link:link,
        createDate:createDate,
        category:category,
        tags:tags,
        contentText:contentText,
        priority:priority,
        top_timestamp:top_timestamp,
        modify_timestamp:modify_timestamp,
        hidden:hidden,
        changefreq:changefreq,
        views: oldArticle.views || 0
      },
      articles_all=await getAllArticlesList();
      
      for(var i=articles_all.length-1;i>=0;i--){
        if(articles_all[i].id == id){
          articles_all.splice(i,1);
          break;
        }
      }
      articles_all.push(articleWithoutHtml),
      articles_all=sortArticle(articles_all),
      await saveArticlesList(JSON.stringify(articles_all))
      json = '{"msg":"Edit OK","rst":true,"id":"'+id+'"}'
    }else{
      json = '{"msg":"信息不全","rst":false}'
    }
  }
  
  if(!json &&!html && !file){
    json = '{"msg":"some errors","rst":false}'
  }
  if(file){
    return new Response(file.content,{
      headers:{
        "content-type":"application/octet-stream;charset=utf-8",
        "Content-Disposition":"attachment; filename="+file.name
      },
      status:200
    })
  }
  if(html){
    return new Response(html,{
      headers:{
        "content-type":"text/html;charset=UTF-8"
      },
      status:200
    })
  }
  if(json){
    return new Response(json ,{
      headers:{
        "content-type":"application/json;charset=UTF-8"
      },
      status:200
    })
  }
}

/**------【④.抽丝剥茧，抽取公用的业务方法】-----**/

function parseBasicAuth(request){
    const auth=request.headers.get("Authorization");
    if(!auth||!/^Basic [A-Za-z0-9._~+/-]+=*$/i.test(auth)){
        const token = request.headers.get("cfblog_token");
        if(token){
            let url=new URL(request.url)
            let paths=url.pathname.trim("/").split("/")
            if("admin"==paths[0] && ("search.xml"==paths[1]||"sitemap.xml"==paths[1])){
                return token === ACCOUNT.third_token
            }
        }
        return false;
    }
    const[user,pwd]=atob(auth.split(" ").pop()).split(":");
    return user===ACCOUNT.user && pwd===ACCOUNT.password
}

async function getArticlesList(){
  let articles_all = await getAllArticlesList();
  
  for(var i=0;i<articles_all.length;i++) {
    if(articles_all[i].hidden){
        articles_all.splice(i,1);
    }
  }
  return articles_all;
}

function sortArticle(articles){
  return sort(sort(articles,'id'),'top_timestamp');
}

async function getRecentlyArticles(articles){
  if(!articles){
    articles = await getArticlesList();
  }
  if(OPT.recentlyType == 2){
    articles = sort([].concat(articles),'modify_timestamp');
  }
  let articles_recently = articles.slice(0,OPT.recentlySize);

  for(var i=0;i<articles_recently.length;i++){
      if(articles_recently[i].top_timestamp && !articles_recently[i].title.startsWith(OPT.top_flag)){
        articles_recently[i].title = OPT.top_flag + articles_recently[i].title
      }
      articles_recently[i].createDate10=articles_recently[i].createDate.substr(0,10),
      articles_recently[i].url="/article/"+articles_recently[i].id+".html";
  }
  return articles_recently;
}

function processArticleProp(articles){
    for(var i=0;i<articles.length;i++){
        if(articles[i]){
            if(articles[i].top_timestamp && !articles[i].title.startsWith(OPT.top_flag)){
              articles[i].title = OPT.top_flag + articles[i].title
            }
            // articles[i].createDate10=articles[i].createDate.substr(0,10),
            // 把 2025-03-21 转成 2025年03月21日
            let dateStr = articles[i].createDate.substr(0,10);
            let dateParts = dateStr.split('-');
            articles[i].createDate10 = dateParts[0] + '年' + dateParts[1] + '月' + dateParts[2] + '日',
            articles[i].createDateYear=articles[i].createDate.substr(0,4),
            articles[i].createDateMonth=articles[i].createDate.substr(5,7),
            articles[i].createDateDay=articles[i].createDate.substr(8,10),
            articles[i].contentLength=articles[i].contentText.length,
            articles[i].url ="/article/"+articles[i].id+".html";
        }
    }
}

async function getThemeHtml(template_path) {
  try {
    template_path = template_path.replace(".html", "")
    const fullUrl = OPT.themeURL + template_path + ".html";
    
    let response = await fetch(fullUrl, { cf: { cacheTtl: 600 } });
    
    if (!response.ok) {
      return "404";
    }
    
    let html = await response.text();
    
    if ("admin/index|admin/editor".includes(template_path)) {
      html = html.replace("$('#WidgetCategory').val(JSON.stringify(categoryJson))", OPT.editor_page_scripts + "$('#WidgetCategory').val(JSON.stringify(categoryJson))")
    }
    
    return html
  } catch (error) {
    return "404";
  }
}

async function getSiblingArticle(id){
    id=("00000"+parseInt(id)).substr(-6);
    let articles_all=await getArticlesList(),
        article_idx=-1;
    for(var i=0,len=articles_all.length;i<len;i++)
      if(articles_all[i].id==id){
          article_idx=i;
          break
      }
    let value=await getArticle(id);
    return null==value||0===value.length?[void 0,void 0,void 0]:[articles_all[article_idx-1],value,articles_all[article_idx+1]]
}

async function purge(cacheZoneId=ACCOUNT.cacheZoneId,cacheToken=ACCOUNT.cacheToken){
    if(null==cacheZoneId||null==cacheToken||cacheZoneId.length<5||cacheToken.length<5){
        return false;
    }
    let ret=await fetch(`https://api.cloudflare.com/client/v4/zones/${cacheZoneId}/purge_cache`,{
        method:"POST",
        headers:{
            "Authorization":"Bearer "+cacheToken,
            "Content-Type":"application/json"
        },
        body:'{"purge_everything":true}'
    });
    return (await ret.json()).success
}

async function admin_nextPage(pageNo,pageSize=OPT.pageSize){
    pageNo=pageNo<=1?1:pageNo;
    let articles_all=await getAllArticlesList(),
        articles=[];
    for(var i=(pageNo-1)*pageSize,s=Math.min(pageNo*pageSize,articles_all.length);i<s;i++){
      if(articles_all[i].top_timestamp && !articles_all[i].title.startsWith(OPT.top_flag)){
        articles_all[i].title = OPT.top_flag + articles_all[i].title
      }
      if(articles_all[i].hidden && !articles_all[i].title.startsWith(OPT.hidden_flag)){
        articles_all[i].title = OPT.hidden_flag + articles_all[i].title
      }
      articles.push(articles_all[i]);
    }
    return articles
}

async function parseReq(request){
    const content_type=request.headers.get("content-type")||"";
    if(content_type.includes("application/json")){
    let json=JSON.stringify(await request.json()),
        content_type=JSON.parse(json),
        settings={category:[],top_timestamp:0, hidden:0};
        for(var i=0;i<content_type.length;i++){
            if("tags"==content_type[i].name){
                settings[content_type[i].name]=content_type[i].value.split(",")
            }else if(content_type[i].name.includes("category")){
                settings.category.push(content_type[i].value)
            }else{
                settings[content_type[i].name]=content_type[i].value
            }
        }
        return settings
    }
    if(content_type.includes("application/text")){
        return await request.text();
    }
    if(content_type.includes("text/html")){
        return await request.text();
    }
    if(content_type.includes("form")){
        const formData=await request.formData(),
                ret={};
        for(const field of formData.entries())
            ret[field[0]]=field[1];
        return JSON.stringify(ret)
    }
    {
        const blob=await request.blob();
        return URL.createObjectURL(blob)
    }
}

async function generateId(){
    let article_id_seq=await getIndexNum();
    if(""===article_id_seq||null===article_id_seq||"[]"===article_id_seq||void 0===article_id_seq){
        await saveIndexNum(1)
        return "000001"
    }else{
        await saveIndexNum(parseInt(article_id_seq)+1)
        return ("00000"+(parseInt(article_id_seq)+1)).substr(-6)
    }
}

/**------【⑤.术业有专攻，读写KV方法集】-----**/

async function getKV(key, toJson=false){
  let value=await CFBLOG.get(key);
  if(!toJson)
    return null==value?"[]":value;
  try{
    return null==value?[]:JSON.parse(value)
  }catch(e){
    return[]
  }
}

async function getAllArticlesList(){
  return await getKV("SYSTEM_INDEX_LIST", true);
}

async function getIndexNum(){
  return await getKV("SYSTEM_INDEX_NUM", true);
}

async function getWidgetMenu(){
  return await getKV("SYSTEM_VALUE_WidgetMenu", true);
}

async function getWidgetCategory(){
  return await getKV("SYSTEM_VALUE_WidgetCategory", true);
}

async function getWidgetTags(){
  return await getKV("SYSTEM_VALUE_WidgetTags", true);
}

async function getWidgetLink(){
  return await getKV("SYSTEM_VALUE_WidgetLink", true);
}

async function getArticle(id){
  return await getKV(id, true);
}

async function saveKV(key,value){
    if(null!=value){
        if("object"==typeof value){
            value=JSON.stringify(value)
        }
        await CFBLOG.put(key,value)
        return true
    }
    return false;
}

async function saveArticlesList(value){
  return await saveKV("SYSTEM_INDEX_LIST",value);
}

async function saveIndexNum(value){
  return await saveKV("SYSTEM_INDEX_NUM", value);
}

async function saveWidgetMenu(value){
  return await saveKV("SYSTEM_VALUE_WidgetMenu", value);
}

async function saveWidgetCategory(value){
  return await saveKV("SYSTEM_VALUE_WidgetCategory", value);
}

async function saveWidgetTags(value){
  return await saveKV("SYSTEM_VALUE_WidgetTags", value);
}

async function saveWidgetLink(value){
  return await saveKV("SYSTEM_VALUE_WidgetLink", value);
}

async function saveArticle(id,value){
  return await saveKV(id, value);
}

/**------【⑥.站在巨人肩膀上，基础方法】-----**/

String.prototype.trim=function(t){
  return t?this.replace(new RegExp("^\\"+t+"+|\\"+t+"+$","g"),""):this.replace(/^\s+|\s+$/g,"")
}

String.prototype.replaceHtmlPara=function(t,e){
  return null!=e&&(e=e.replace(new RegExp("[$]","g"),"$$$$")),this.replace(new RegExp("\x3c!--{"+t+"}--\x3e","g"),e)
}

String.prototype.replaceAll=function(t,e){
  return this.replace(new RegExp(t,"g"),e)
}

function pad(t){
    return t>=0&&t<=9?"0"+t:t
}

function sort(arr, field, desc=true){
    return arr.sort((function(m,n){
        var a=m[field]||'0',
            b=n[field]||'0';
        return desc?(a>b?-1:(a<b?1:0)):(a<b?-1:(a>b?1:0))
    }))
}

function nullToEmpty(k){
  return k==undefined?'':k
}

function checkFormat(t){
    if("string"==typeof t){
        try{
            var e=JSON.parse(t);
            return !("object"!=typeof e||!e)
        }catch(t){
            return false
        }
    }
    return !("object"!=typeof t||!t)
}

// 搜索页面处理
async function handle_search_page(request, url) {
  try {
    let keyword = url.searchParams.get("q") || "";
    let pageNo = parseInt(url.searchParams.get("page") || "1");
    
    if (keyword.length < OPT.searchMinLength) {
      return renderSearchResult(keyword, [], pageNo, 0, "关键词太短，请输入至少" + OPT.searchMinLength + "个字符");
    }
    
    keyword = decodeURIComponent(keyword);
    let articles_all = await getAllArticlesList();
    articles_all = articles_all.filter(a => !a.hidden);
    
    let searchResults = [];
    
    for (let article of articles_all) {
      try {
        let fullArticle = await getArticle(article.id);
        if (!fullArticle) continue;
        
        let keywordLower = keyword.toLowerCase();
        let titleLower = (article.title || "").toLowerCase();
        let contentLower = (fullArticle.contentMD || "").toLowerCase();
        let tagsText = (article.tags || []).join(' ').toLowerCase();
        let categoryText = (article.category || []).join(' ').toLowerCase();
        
        if (titleLower.includes(keywordLower) ||
            tagsText.includes(keywordLower) ||
            categoryText.includes(keywordLower) ||
            contentLower.includes(keywordLower)) {
          
          let excerpt = generateExcerpt(fullArticle.contentHtml || fullArticle.contentMD, keyword, 100);
          
          searchResults.push({
            ...article,
            excerpt: excerpt,
            url: "/article/" + article.id + ".html"
          });
        }
      } catch (e) {
        continue;
      }
    }
    
    let total = searchResults.length;
    let start = (pageNo - 1) * OPT.searchPageSize;
    let end = Math.min(start + OPT.searchPageSize, total);
    let pagedResults = searchResults.slice(start, end);
    
    processArticleProp(pagedResults);
    
    return await renderSearchResult(keyword, pagedResults, pageNo, total, null);
    
  } catch (error) {
    return new Response(`搜索出错: ${error.message}`, { 
      status: 500,
      headers: { "content-type": "text/plain;charset=UTF-8" }
    });
  }
}

function generateExcerpt(content, keyword, length = 100) {
  try {
    let text = content.replace(/<\/?[^>]*>/g, "");
    let keywordLower = keyword.toLowerCase();
    let textLower = text.toLowerCase();
    
    let pos = textLower.indexOf(keywordLower);
    if (pos === -1) return text.substring(0, length) + "...";
    
    let start = Math.max(0, pos - 40);
    let end = Math.min(text.length, start + length);
    
    let excerpt = text.substring(start, end);
    
    if (start > 0) excerpt = "..." + excerpt;
    if (end < text.length) excerpt = excerpt + "...";
    
    let regex = new RegExp(keyword, 'gi');
    excerpt = excerpt.replace(regex, match => `<mark class="search-highlight">${match}</mark>`);
    
    return excerpt;
  } catch (error) {
    return content.substring(0, length) + "...";
  }
}

async function renderSearchResult(keyword, articles, pageNo, total, errorMsg) {
  try {
    let theme_html = await getThemeHtml("search");
    
    if (!theme_html || theme_html.includes("404")) {
      theme_html = await getThemeHtml("index");
    }
    
    let menus = await getWidgetMenu();
    let categories = await getWidgetCategory();
    let tags = await getWidgetTags();
    let links = await getWidgetLink();
    let articles_recently = await getRecentlyArticles();
    
    let totalPages = Math.ceil(total / OPT.searchPageSize);
    let hasNext = pageNo < totalPages;
    let hasPrev = pageNo > 1;
    
    let cfg = {
      OPT: OPT,
      keyword: keyword || "",
      articles: articles || [],
      total: total || 0,
      pageNo: pageNo || 1,
      totalPages: totalPages || 1,
      hasNext: hasNext,
      hasPrev: hasPrev,
      errorMsg: errorMsg || "",
      nextPage: hasNext ? `/search?q=${encodeURIComponent(keyword || '')}&page=${pageNo + 1}` : "#",
      prevPage: hasPrev ? `/search?q=${encodeURIComponent(keyword || '')}&page=${pageNo - 1}` : "#",
      
      widgetMenuList: menus || [],
      widgetCategoryList: categories || [],
      widgetTagsList: tags || [],
      widgetLinkList: links || [],
      widgetRecentlyList: articles_recently || [],
      
      title: keyword ? `"${keyword}" 的搜索结果 - ${OPT.siteName}` : `搜索 - ${OPT.siteName}`,
      keyWords: OPT.keyWords
    };
    
    let html = Mustache.render(theme_html, cfg);
    
    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
        "Cache-Control": "no-store, private"
      },
      status: 200
    });
    
  } catch (error) {
    return new Response(`
      <html>
        <head><title>渲染出错</title></head>
        <body>
          <h1>页面渲染出错</h1>
          <p>错误信息: ${error.message}</p>
          <p><a href="/">返回首页</a></p>
        </body>
      </html>
    `, {
      headers: { "content-type": "text/html;charset=UTF-8" },
      status: 500
    });
  }
}

// 调试端点
async function handle_debug(request) {
  let articles_all = await getAllArticlesList();
  let public_articles = articles_all.filter(a => !a.hidden);
  
  return new Response(JSON.stringify({
    total_all: articles_all.length,
    total_public: public_articles.length,
    articles: public_articles.map(a => ({
      id: a.id,
      title: a.title,
      views: a.views || 0
    }))
  }, null, 2), {
    headers: { 
      "content-type": "application/json",
      "Cache-Control": "no-store"
    }
  });
}

/**------【⑦.新增：评论功能】-----**/

// 获取评论配置
async function handle_get_comment_config() {
  return new Response(JSON.stringify(OPT.commentConfig), {
    headers: { "content-type": "application/json" }
  });
}

// 获取文章的评论
async function handle_get_comments(articleId) {
  try {
    articleId = ("00000" + parseInt(articleId)).substr(-6);
    let comments = await CFBLOG.get(`COMMENT_${articleId}`, "json") || [];
    
    // 只返回已审核的评论
    comments = comments.filter(c => c.approved === true);
    
    // 按时间倒序
    comments.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    
    // 构建评论树（顶级评论和回复）
    let commentTree = [];
    let replyMap = {};
    
    comments.forEach(c => {
      if (c.parentId === "0") {
        commentTree.push(c);
      } else {
        if (!replyMap[c.parentId]) replyMap[c.parentId] = [];
        replyMap[c.parentId].push(c);
      }
    });
    
    return new Response(JSON.stringify({
      success: true,
      comments: commentTree,
      replies: replyMap,
      total: comments.length
    }), {
      headers: { "content-type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: error.message
    }), { status: 500 });
  }
}

// 提交评论
async function handle_post_comment(request, articleId) {
  try {
    articleId = ("00000" + parseInt(articleId)).substr(-6);
    const data = await request.json();
    
    // 基础验证
    if (!data.author || !data.content) {
      return new Response(JSON.stringify({
        success: false,
        message: "昵称和内容不能为空"
      }), { status: 400 });
    }
    
    // 获取评论配置
    let config = OPT.commentConfig;
    
    // 邮箱验证（如果必填）
    if (config.requireEmail && !data.email) {
      return new Response(JSON.stringify({
        success: false,
        message: "邮箱不能为空"
      }), { status: 400 });
    }
    
    // 获取客户端IP
    let ip = request.headers.get("CF-Connecting-IP") || "";
    
    // 简单的频率限制
    let lastComment = await CFBLOG.get(`COMMENT_IP_${ip}`);
    if (lastComment) {
      let lastTime = parseInt(lastComment);
      let now = Date.now();
      if (now - lastTime < config.rateLimit * 60 * 1000) {
        return new Response(JSON.stringify({
          success: false,
          message: `评论太频繁，请稍后再试`
        }), { status: 429 });
      }
    }
    
    // 构建评论对象
    let comment = {
      id: Date.now().toString(),
      articleId: articleId,
      author: data.author.substring(0, 20),
      email: data.email || "",
      content: data.content.substring(0, 500),
      date: new Date().toLocaleString('zh-CN', { hour12: false }),
      parentId: data.parentId || "0",
      approved: !config.needReview,
      ip: ip
    };
    
    // 保存到KV
    let existing = await CFBLOG.get(`COMMENT_${articleId}`, "json") || [];
    existing.push(comment);
    await CFBLOG.put(`COMMENT_${articleId}`, JSON.stringify(existing));
    
    // 记录IP（有效期等于频率限制时间）
    await CFBLOG.put(`COMMENT_IP_${ip}`, Date.now().toString(), { 
      expirationTtl: config.rateLimit * 60 
    });
    
    return new Response(JSON.stringify({
      success: true,
      message: config.needReview ? "评论已提交，等待审核" : "评论成功",
      needReview: config.needReview,
      comment: comment
    }));
    
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: "提交失败: " + error.message
    }), { status: 500 });
  }
}


/**------【⑧.新增：评论管理功能】-----**/

// 获取待审核评论列表
async function handle_get_pending_comments() {
  try {
    // 列出所有以 COMMENT_ 开头的 KV 键
    let list = await CFBLOG.list({ prefix: "COMMENT_" });
    let pendingComments = [];
    
    for (let key of list.keys) {
      if (key.name === "COMMENT_CONFIG" || key.name.startsWith("COMMENT_IP_")) continue;
      
      let articleId = key.name.replace("COMMENT_", "");
      let comments = await CFBLOG.get(key.name, "json") || [];
      
      // 找出待审核的评论
      comments.forEach(c => {
        if (!c.approved) {
          pendingComments.push({
            ...c,
            articleTitle: "加载中...", // 稍后填充
            articleUrl: `/article/${articleId}.html`
          });
        }
      });
    }
    
    // 获取文章标题
    for (let comment of pendingComments) {
      let article = await getArticle(comment.articleId);
      if (article) {
        comment.articleTitle = article.title;
      }
    }
    
    // 按时间倒序
    pendingComments.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    
    return new Response(JSON.stringify({
      success: true,
      comments: pendingComments
    }), {
      headers: { "content-type": "application/json" }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: error.message
    }), { status: 500 });
  }
}

// 审核评论（通过/拒绝/删除）
async function handle_review_comment(request) {
  try {
    const data = await request.json();
    // data = { articleId, commentId, action: "approve" | "reject" | "delete" }
    
    let comments = await CFBLOG.get(`COMMENT_${data.articleId}`, "json") || [];
    let commentIndex = comments.findIndex(c => c.id === data.commentId);
    
    if (commentIndex === -1) {
      return new Response(JSON.stringify({
        success: false,
        message: "评论不存在"
      }), { status: 404 });
    }
    
    if (data.action === "approve") {
      comments[commentIndex].approved = true;
    } else if (data.action === "reject" || data.action === "delete") {
      comments.splice(commentIndex, 1);
    }
    
    await CFBLOG.put(`COMMENT_${data.articleId}`, JSON.stringify(comments));
    
    return new Response(JSON.stringify({
      success: true,
      message: data.action === "approve" ? "审核通过" : "已删除"
    }));
    
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: error.message
    }), { status: 500 });
  }
}

// 获取某篇文章的所有评论（包括未审核的，用于后台管理）
async function handle_get_all_comments(articleId) {
  try {
    articleId = ("00000" + parseInt(articleId)).substr(-6);
    let comments = await CFBLOG.get(`COMMENT_${articleId}`, "json") || [];
    
    // 按时间倒序
    comments.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    
    return new Response(JSON.stringify({
      success: true,
      comments: comments
    }), {
      headers: { "content-type": "application/json" }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: error.message
    }), { status: 500 });
  }
}

// 获取全站所有评论（优化版）
async function handle_get_all_comments_fast() {
  try {
    let list = await CFBLOG.list({ prefix: "COMMENT_" });
    let allComments = [];
    let articleCache = {}; // 缓存文章标题，避免重复获取
    
    for (let key of list.keys) {
      if (key.name === "COMMENT_CONFIG" || key.name.startsWith("COMMENT_IP_")) continue;
      
      let articleId = key.name.replace("COMMENT_", "");
      
      // 从缓存获取文章标题
      if (!articleCache[articleId]) {
        let article = await getArticle(articleId);
        articleCache[articleId] = article ? article.title : articleId;
      }
      
      let comments = await CFBLOG.get(key.name, "json") || [];
      
      comments.forEach(c => {
        allComments.push({
          ...c,
          articleTitle: articleCache[articleId],
          articleUrl: `/article/${articleId}.html`
        });
      });
    }
    
    // 按时间倒序
    allComments.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    
    return new Response(JSON.stringify({
      success: true,
      comments: allComments
    }), {
      headers: { "content-type": "application/json" }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: error.message
    }), { status: 500 });
  }
}

//引入mustache.js，4.1.0：https://cdn.bootcdn.net/ajax/libs/mustache.js/4.1.0/mustache.min.js
(function(global,factory){typeof exports==="object"&&typeof module!=="undefined"?module.exports=factory():typeof define==="function"&&define.amd?define(factory):(global=global||self,global.Mustache=factory())})(this,function(){"use strict";var objectToString=Object.prototype.toString;var isArray=Array.isArray||function isArrayPolyfill(object){return objectToString.call(object)==="[object Array]"};function isFunction(object){return typeof object==="function"}function typeStr(obj){return isArray(obj)?"array":typeof obj}function escapeRegExp(string){return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function hasProperty(obj,propName){return obj!=null&&typeof obj==="object"&&propName in obj}function primitiveHasOwnProperty(primitive,propName){return primitive!=null&&typeof primitive!=="object"&&primitive.hasOwnProperty&&primitive.hasOwnProperty(propName)}var regExpTest=RegExp.prototype.test;function testRegExp(re,string){return regExpTest.call(re,string)}var nonSpaceRe=/\S/;function isWhitespace(string){return!testRegExp(nonSpaceRe,string)}var entityMap={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function escapeHtml(string){return String(string).replace(/[&<>"'`=\/]/g,function fromEntityMap(s){return entityMap[s]})}var whiteRe=/\s*/;var spaceRe=/\s+/;var equalsRe=/\s*=/;var curlyRe=/\s*\}/;var tagRe=/#|\^|\/|>|\{|&|=|!/;function parseTemplate(template,tags){if(!template)return[];var lineHasNonSpace=false;var sections=[];var tokens=[];var spaces=[];var hasTag=false;var nonSpace=false;var indentation="";var tagIndex=0;function stripSpace(){if(hasTag&&!nonSpace){while(spaces.length)delete tokens[spaces.pop()]}else{spaces=[]}hasTag=false;nonSpace=false}var openingTagRe,closingTagRe,closingCurlyRe;function compileTags(tagsToCompile){if(typeof tagsToCompile==="string")tagsToCompile=tagsToCompile.split(spaceRe,2);if(!isArray(tagsToCompile)||tagsToCompile.length!==2)throw new Error("Invalid tags: "+tagsToCompile);openingTagRe=new RegExp(escapeRegExp(tagsToCompile[0])+"\\s*");closingTagRe=new RegExp("\\s*"+escapeRegExp(tagsToCompile[1]));closingCurlyRe=new RegExp("\\s*"+escapeRegExp("}"+tagsToCompile[1]))}compileTags(tags||mustache.tags);var scanner=new Scanner(template);var start,type,value,chr,token,openSection;while(!scanner.eos()){start=scanner.pos;value=scanner.scanUntil(openingTagRe);if(value){for(var i=0,valueLength=value.length;i<valueLength;++i){chr=value.charAt(i);if(isWhitespace(chr)){spaces.push(tokens.length);indentation+=chr}else{nonSpace=true;lineHasNonSpace=true;indentation+=" "}tokens.push(["text",chr,start,start+1]);start+=1;if(chr==="\n"){stripSpace();indentation="";tagIndex=0;lineHasNonSpace=false}}}if(!scanner.scan(openingTagRe))break;hasTag=true;type=scanner.scan(tagRe)||"name";scanner.scan(whiteRe);if(type==="="){value=scanner.scanUntil(equalsRe);scanner.scan(equalsRe);scanner.scanUntil(closingTagRe)}else if(type==="{"){value=scanner.scanUntil(closingCurlyRe);scanner.scan(curlyRe);scanner.scanUntil(closingTagRe);type="&"}else{value=scanner.scanUntil(closingTagRe)}if(!scanner.scan(closingTagRe))throw new Error("Unclosed tag at "+scanner.pos);if(type==">"){token=[type,value,start,scanner.pos,indentation,tagIndex,lineHasNonSpace]}else{token=[type,value,start,scanner.pos]}tagIndex++;tokens.push(token);if(type==="#"||type==="^"){sections.push(token)}else if(type==="/"){openSection=sections.pop();if(!openSection)throw new Error('Unopened section "'+value+'" at '+start);if(openSection[1]!==value)throw new Error('Unclosed section "'+openSection[1]+'" at '+start)}else if(type==="name"||type==="{"||type==="&"){nonSpace=true}else if(type==="="){compileTags(value)}}stripSpace();openSection=sections.pop();if(openSection)throw new Error('Unclosed section "'+openSection[1]+'" at '+scanner.pos);return nestTokens(squashTokens(tokens))}function squashTokens(tokens){var squashedTokens=[];var token,lastToken;for(var i=0,numTokens=tokens.length;i<numTokens;++i){token=tokens[i];if(token){if(token[0]==="text"&&lastToken&&lastToken[0]==="text"){lastToken[1]+=token[1];lastToken[3]=token[3]}else{squashedTokens.push(token);lastToken=token}}}return squashedTokens}function nestTokens(tokens){var nestedTokens=[];var collector=nestedTokens;var sections=[];var token,section;for(var i=0,numTokens=tokens.length;i<numTokens;++i){token=tokens[i];switch(token[0]){case"#":case"^":collector.push(token);sections.push(token);collector=token[4]=[];break;case"/":section=sections.pop();section[5]=token[2];collector=sections.length>0?sections[sections.length-1][4]:nestedTokens;break;default:collector.push(token)}}return nestedTokens}function Scanner(string){this.string=string;this.tail=string;this.pos=0}Scanner.prototype.eos=function eos(){return this.tail===""};Scanner.prototype.scan=function scan(re){var match=this.tail.match(re);if(!match||match.index!==0)return"";var string=match[0];this.tail=this.tail.substring(string.length);this.pos+=string.length;return string};Scanner.prototype.scanUntil=function scanUntil(re){var index=this.tail.search(re),match;switch(index){case-1:match=this.tail;this.tail="";break;case 0:match="";break;default:match=this.tail.substring(0,index);this.tail=this.tail.substring(index)}this.pos+=match.length;return match};function Context(view,parentContext){this.view=view;this.cache={".":this.view};this.parent=parentContext}Context.prototype.push=function push(view){return new Context(view,this)};Context.prototype.lookup=function lookup(name){var cache=this.cache;var value;if(cache.hasOwnProperty(name)){value=cache[name]}else{var context=this,intermediateValue,names,index,lookupHit=false;while(context){if(name.indexOf(".")>0){intermediateValue=context.view;names=name.split(".");index=0;while(intermediateValue!=null&&index<names.length){if(index===names.length-1)lookupHit=hasProperty(intermediateValue,names[index])||primitiveHasOwnProperty(intermediateValue,names[index]);intermediateValue=intermediateValue[names[index++]]}}else{intermediateValue=context.view[name];lookupHit=hasProperty(context.view,name)}if(lookupHit){value=intermediateValue;break}context=context.parent}cache[name]=value}if(isFunction(value))value=value.call(this.view);return value};function Writer(){this.templateCache={_cache:{},set:function set(key,value){this._cache[key]=value},get:function get(key){return this._cache[key]},clear:function clear(){this._cache={}}}}Writer.prototype.clearCache=function clearCache(){if(typeof this.templateCache!=="undefined"){this.templateCache.clear()}};Writer.prototype.parse=function parse(template,tags){var cache=this.templateCache;var cacheKey=template+":"+(tags||mustache.tags).join(":");var isCacheEnabled=typeof cache!=="undefined";var tokens=isCacheEnabled?cache.get(cacheKey):undefined;if(tokens==undefined){tokens=parseTemplate(template,tags);isCacheEnabled&&cache.set(cacheKey,tokens)}return tokens};Writer.prototype.render=function render(template,view,partials,config){var tags=this.getConfigTags(config);var tokens=this.parse(template,tags);var context=view instanceof Context?view:new Context(view,undefined);return this.renderTokens(tokens,context,partials,template,config)};Writer.prototype.renderTokens=function renderTokens(tokens,context,partials,originalTemplate,config){var buffer="";var token,symbol,value;for(var i=0,numTokens=tokens.length;i<numTokens;++i){value=undefined;token=tokens[i];symbol=token[0];if(symbol==="#")value=this.renderSection(token,context,partials,originalTemplate,config);else if(symbol==="^")value=this.renderInverted(token,context,partials,originalTemplate,config);else if(symbol===">")value=this.renderPartial(token,context,partials,config);else if(symbol==="&")value=this.unescapedValue(token,context);else if(symbol==="name")value=this.escapedValue(token,context,config);else if(symbol==="text")value=this.rawValue(token);if(value!==undefined)buffer+=value}return buffer};Writer.prototype.renderSection=function renderSection(token,context,partials,originalTemplate,config){var self=this;var buffer="";var value=context.lookup(token[1]);function subRender(template){return self.render(template,context,partials,config)}if(!value)return;if(isArray(value)){for(var j=0,valueLength=value.length;j<valueLength;++j){buffer+=this.renderTokens(token[4],context.push(value[j]),partials,originalTemplate,config)}}else if(typeof value==="object"||typeof value==="string"||typeof value==="number"){buffer+=this.renderTokens(token[4],context.push(value),partials,originalTemplate,config)}else if(isFunction(value)){if(typeof originalTemplate!=="string")throw new Error("Cannot use higher-order sections without the original template");value=value.call(context.view,originalTemplate.slice(token[3],token[5]),subRender);if(value!=null)buffer+=value}else{buffer+=this.renderTokens(token[4],context,partials,originalTemplate,config)}return buffer};Writer.prototype.renderInverted=function renderInverted(token,context,partials,originalTemplate,config){var value=context.lookup(token[1]);if(!value||isArray(value)&&value.length===0)return this.renderTokens(token[4],context,partials,originalTemplate,config)};Writer.prototype.indentPartial=function indentPartial(partial,indentation,lineHasNonSpace){var filteredIndentation=indentation.replace(/[^ \t]/g,"");var partialByNl=partial.split("\n");for(var i=0;i<partialByNl.length;i++){if(partialByNl[i].length&&(i>0||!lineHasNonSpace)){partialByNl[i]=filteredIndentation+partialByNl[i]}}return partialByNl.join("\n")};Writer.prototype.renderPartial=function renderPartial(token,context,partials,config){if(!partials)return;var tags=this.getConfigTags(config);var value=isFunction(partials)?partials(token[1]):partials[token[1]];if(value!=null){var lineHasNonSpace=token[6];var tagIndex=token[5];var indentation=token[4];var indentedValue=value;if(tagIndex==0&&indentation){indentedValue=this.indentPartial(value,indentation,lineHasNonSpace)}var tokens=this.parse(indentedValue,tags);return this.renderTokens(tokens,context,partials,indentedValue,config)}};Writer.prototype.unescapedValue=function unescapedValue(token,context){var value=context.lookup(token[1]);if(value!=null)return value};Writer.prototype.escapedValue=function escapedValue(token,context,config){var escape=this.getConfigEscape(config)||mustache.escape;var value=context.lookup(token[1]);if(value!=null)return typeof value==="number"&&escape===mustache.escape?String(value):escape(value)};Writer.prototype.rawValue=function rawValue(token){return token[1]};Writer.prototype.getConfigTags=function getConfigTags(config){if(isArray(config)){return config}else if(config&&typeof config==="object"){return config.tags}else{return undefined}};Writer.prototype.getConfigEscape=function getConfigEscape(config){if(config&&typeof config==="object"&&!isArray(config)){return config.escape}else{return undefined}};var mustache={name:"mustache.js",version:"4.1.0",tags:["{{","}}"],clearCache:undefined,escape:undefined,parse:undefined,render:undefined,Scanner:undefined,Context:undefined,Writer:undefined,set templateCache(cache){defaultWriter.templateCache=cache},get templateCache(){return defaultWriter.templateCache}};var defaultWriter=new Writer;mustache.clearCache=function clearCache(){return defaultWriter.clearCache()};mustache.parse=function parse(template,tags){return defaultWriter.parse(template,tags)};mustache.render=function render(template,view,partials,config){if(typeof template!=="string"){throw new TypeError('Invalid template! Template should be a "string" '+'but "'+typeStr(template)+'" was given as the first '+"argument for mustache#render(template, view, partials)")}return defaultWriter.render(template,view,partials,config)};mustache.escape=escapeHtml;mustache.Scanner=Scanner;mustache.Context=Context;mustache.Writer=Writer;return mustache});