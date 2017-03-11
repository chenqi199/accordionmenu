/**
 * Description: todo
 * Created by <a href='chenqi@tansun.com.cn'>chenqi</a>
 * On 2017/3/11.14:32
 *  <br/>
 */

function modulemanager() {
    console.log("触发模块管理按钮");


    $('#modulemanagetree'). bind("select_node.jstree", function (e, data) { //左键单击事件
        //触发toggle_node 事件  就行了
        $('#modulemanagetree').jstree("toggle_node", "#" + data.node.id);//展开点击事件对象子节点
//
        var getUrl = $('#modulemanagetree').jstree("get_node", "#" + data.node.id).a_attr.href;
        console.log(getUrl);
//            window.open(getUrl);
        try {
            var treeNodes = $("#" + data.node.id).siblings();
            for (var i = 0; i < treeNodes.length; i++) {
                $('#modulemanagetree').jstree("close_node", treeNodes[i]);//关闭点击事件对象的兄弟节点
            }
            var childs = $("#" + data.node.id).find("li");

            /*console.log(childs);
             for (var i = 0; i < childs.length; i++) {
             var isHasChilds = $('#modulemanagetree').jstree("is_leaf", childs[i]);
             if (!isHasChilds){
             console.log(childs[i].innerText+"============="+ $('#modulemanagetree').jstree("is_leaf", childs[i]));
             $($(childs[i]).li. i).removeClass('jstree-icon jstree-ocl');
             console.log($(childs[i]));
             $($(childs[i]).li. i).addClass("have-child");
             }
             }*/
//
            var childs = $("#" + data.node.id).find("li");
//                console.log(childs);
            for (var i = 0; i < childs.length; i++) {
                var isHasChilds = $('#modulemanagetree').jstree("is_leaf", childs[i]);
                if (!isHasChilds) {
                    var iconPrev = $(childs[i]).find(".jstree-icon").eq(0).prev();
                    iconPrev.css({
                        "background": "url('../images/menu_line.gif') no-repeat",
                        "background-position-y": "4px"
                    });
                }
            }
        } catch (e) {
            console.log(e + '++++++++++++++++++++++++++++++++++')
        }

    });

    function init() {
        console.log("initTree");


        $('#modulemanagetree').jstree({
            core: {
                'expand_selected_onload': true, //选中项蓝色底显示
                'tie_selection': false,
                "themes": {
                    "responsive": false
                },
                check_callback: true,

                /*   'data': {  //ajax 请求加载数据
                 'url': jQuery.getBasePath() + '/group/listOrgsByUser.do',
                 'data': function (node) {
                 return {
                 'parentId': node.id === '#' ? "-1" : node.id
                 };
                 }
                 */

                data: [
//

                    //===============================doc manager start=================================================

                    {"id": "senddoc", "parent": "#", "text": "发文管理", a_attr: {'href': ''}},
                    {
                        "id": "qicaofawen",
                        "parent": "senddoc",
                        "text": "起草发文",
                        a_attr: {'href': ''},
                        "children": false
                    },

                    {"id": "daiban", "parent": "senddoc", "text": "待 办 ", a_attr: {'href': ''}},
                    //========================待办子分类
                    {"id": "daidenji", "parent": "daiban", "text": "待登记 ", a_attr: {'href': ''}},
                    {"id": "daipaiban", "parent": "daiban", "text": "待排版 ", a_attr: {'href': ''}},
                    {"id": "daigaizhang", "parent": "daiban", "text": "待盖章 ", a_attr: {'href': ''}},
                    {"id": "daifasong", "parent": "daiban", "text": "待发送 ", a_attr: {'href': ''}},
                    //=============================

                    {"id": "jinban", "parent": "senddoc", "text": "经 办", a_attr: {'href': 'https://www.baidu.com'}},
                    {"id": "benhang", "parent": "senddoc", "text": "本行发文 ", a_attr: {'href': ''}},
                    //========================本行发文子分类
                    {"id": "andaizi", "parent": "benhang", "text": "按代字 ", a_attr: {'href': ''}},
                    {"id": "anqianfa", "parent": "benhang", "text": "按签发 ", a_attr: {'href': ''}},
                    {"id": "anzhuban", "parent": "benhang", "text": "按主办 ", a_attr: {'href': ''}},
                    //=============================

                    {"id": "fawendengji", "parent": "senddoc", "text": "发文登记簿", a_attr: {'href': ''}},
                    //========================发文登记簿子分类
                    {"id": "fawenandai", "parent": "fawendengji", "text": "按代字", a_attr: {'href': ''}},
                    {"id": "fawenanqian", "parent": "fawendengji", "text": "按签发", a_attr: {'href': ''}},
                    {"id": "fawenanzhu", "parent": "fawendengji", "text": "按主办", a_attr: {'href': ''}},
                    {"id": "huoshoujilu", "parent": "fawendengji", "text": "收回记录", a_attr: {'href': ''}},
                    //=============================

                    {"id": "fanwendenji", "parent": "senddoc", "text": "翻印登记簿", a_attr: {'href': ''}},
                    {"id": "zhifadenji", "parent": "senddoc", "text": "直发登记簿", a_attr: {'href': ''}},
                    {"id": "tuiwendenji", "parent": "senddoc", "text": "退文记录", a_attr: {'href': ''}},
                    {"id": "canshupeizhi", "parent": "senddoc", "text": "参数配置 ", a_attr: {'href': ''}},
                    //========================参数配置  子分类
                    {"id": "jibenpeizi", "parent": "canshupeizhi", "text": "基本配置 ", a_attr: {'href': ''}},
                    {"id": "gongwenzhonglei", "parent": "canshupeizhi", "text": "公文种类 ", a_attr: {'href': ''}},
                    {"id": "fangzhengword", "parent": "canshupeizhi", "text": "方正Word宏模板 ", a_attr: {'href': ''}},
                    {"id": "huiqianshuoming", "parent": "canshupeizhi", "text": " 会签情况说明模板", a_attr: {'href': ''}},
                    {"id": "wenhaoweihu", "parent": "canshupeizhi", "text": "文号维护 ", a_attr: {'href': ''}},
                    //=============================
                    //=================================================发文管理结束========================================================


                    {"id": "getdoc", "parent": "#", "text": "收文管理", a_attr: {'href': ''}},
                    //========================收文管理  子分类
                    {"id": "getdocdaidengji", "parent": "getdoc", "text": "待登记", a_attr: {'href': ''}},
                    {"id": "getdocdaiban", "parent": "getdoc", "text": "待办", a_attr: {'href': ''}},
                    {"id": "getdocjingban", "parent": "getdoc", "text": "经办", a_attr: {'href': ''}},
                    {"id": "getdocbumenshouwen", "parent": "getdoc", "text": "部门收文 ", a_attr: {'href': ''}},
                    {"id": "getdocbumendenjibo", "parent": "getdoc", "text": "部门收文登记簿 ", a_attr: {'href': ''}},
                    {"id": "getdocshouwendenjibo", "parent": "getdoc", "text": "收文登记簿", a_attr: {'href': ''}},
                    {"id": "getdoczhifadenjibo", "parent": "getdoc", "text": "直发登记簿", a_attr: {'href': ''}},
                    {"id": "getdoctuiwendenjibo", "parent": "getdoc", "text": "退文登记簿", a_attr: {'href': ''}},
                    {"id": "getdoccanshupeizhi", "parent": "getdoc", "text": "参数配置", a_attr: {'href': ''}},
                    //=============================


                    {"id": "hanbo", "parent": "#", "text": "签报管理", a_attr: {'href': ''}},
                    {"id": "hanjian", "parent": "#", "text": "函件管理", a_attr: {'href': ''}},
                    {"id": "doban", "parent": "#", "text": "督办管理", a_attr: {'href': ''}},


                    //===============================doc manager end=================================================
                ]
            },
            plugins: ["wholerow", "contextmenu", "themes"],//指定使用哪些插件
            "contextmenu": {                    //自定义右键点击事件
                "items": {
                    "create": null,
                    "rename": null,
                    "remove": null,
                    "ccp": null,
                    "add": {
                        "label": "添加",
                        "action": function (obj) {
                            var inst = jQuery.jstree.reference(obj.reference);
                            var clickedNode = inst.get_node(obj.reference);
                            alert("add operation--clickedNode's id is:" + clickedNode.id);
                        }
                    },
                    "delete": {
                        "label": "删除",
                        "action": function (obj) {
                            var inst = jQuery.jstree.reference(obj.reference);
                            var clickedNode = inst.get_node(obj.reference);
                            alert("delete operation--clickedNode's id is:" + clickedNode.id);
                        }
                    }
                }
            },
            themes: {        //themes插件设置
                theme: "default", //设置theme主题，默认是"default"，可选值：default、apple、classic、default-rtl
                url: false,        //设置theme css文件的路径
                dots: false,        //是否显示虚线点
                icons: false    //是否显示节点前的图标，$("a > ins.jstree-icon")
            }
//
        });
    }

    init();
    /*
     changeIcon();
     */

}


modulemanager();