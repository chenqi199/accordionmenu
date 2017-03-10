(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.E = factory(root.jQuery);
    }
}(this, function ($, undefined) {
    'use strict';

    /**
     * ajax��ȡxml��Ϣ
     * @param url   ���ʵ�ַ
     * @param fn    �ɹ���Ļص�����
     * @returns {*} XHR
     */
    function ajaxGetResult() {
        var url, fn, async, dataType;

        function error() {
            alert("ϵͳ��������ϵϵͳ����Ա");
        }

        url = arguments[0];
        if ($.isFunction(arguments[1])) {
            fn = arguments[1];
            async = arguments[2] == undefined ? true : arguments[2];
            dataType = arguments[3] == undefined ? 'xml' : arguments[3];
        } else {
            async = arguments[1] == undefined ? true : arguments[1];
            dataType = arguments[2] == undefined ? 'xml' : arguments[2];
        }

        if (async) {
            return $.ajax({
                url: url,
                dataType: dataType,
                async: true,
                cache: false,
                error: error,
                success: fn
            });
        } else {
            var result,
                xhr =
                    $.ajax({
                        url: url,
                        dataType: dataType,
                        async: false,
                        cache: false,
                        error: error,
                        success: fn
                    });
            switch (dataType.toLocaleLowerCase()) {
                case 'xml':
                    result = $.parseXML(xhr.responseText);
                    break;
                case 'json':
                    result = $.parseJSON(xhr.responseText);
                    break;
                case 'text':
                    result = xhr.responseText;
                    break;
                default:
                    result = xhr;
                    break;
            }
            return result;
        }
    }

    /**
     * �Ƚ�����ʱ��Ĵ�С������������ڴ��򷵻�1�����򷵻�0
     * @param yr1   ����1����
     * @param mh1         ��
     * @param dy1         ��
     * @param hr1         ʱ
     * @param mt1         ��
     * @param sd1         ��
     * @param yr2   ����2����
     * @param mh2         ��
     * @param dy2         ��
     * @param hr2         ʱ
     * @param mt2         ��
     * @param sd2         ��
     * @returns {number}
     */
    function newCompareTime1AndTime2(yr1, mh1, dy1, hr1, mt1, sd1, yr2, mh2, dy2, hr2, mt2, sd2) {
        var t1, t2; // ����������

        t1 = Date.UTC(yr1, mh1 - 1, dy1, hr1, mt1, sd1); // ��ȡ�� 1/1/1970 ��ʼ�ĺ�������
        t2 = Date.UTC(yr2, mh2 - 1, dy2, hr2, mt2, sd2); // ��ȡ�� 1/1/1970 ��ʼ�ĺ�������

        // ���ز
        if (t2 >= t1)
            return (1);
        else

            return (0);

    }

    /**
     * ��Date����չ���� Date ת��Ϊָ����ʽ��String
     * @param fmt   ��(M)����(d)��Сʱ(h)����(m)����(s)������(q) ������ 1-2 ��ռλ����
     *              ��(y)������ 1-4 ��ռλ��������(S)ֻ���� 1 ��ռλ��(�� 1-3 λ������)
     * @returns {*}
     * @constructor Date
     * @example
     * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
     * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
     */
    Date.prototype.Format = function (fmt) { // author: meizz
        var o = {
            "M+": this.getMonth() + 1, // �·�
            "d+": this.getDate(), // ��
            "h+": this.getHours(), // Сʱ
            "m+": this.getMinutes(), // ��
            "s+": this.getSeconds(), // ��
            "q+": Math.floor((this.getMonth() + 3) / 3), // ����
            "S": this.getMilliseconds()
            // ����
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
                .substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };

    /**
     * �õ����������յȼ����ֺ������
     * @param interval  ��(y)������(q)����(m)����(w)����(d)��Сʱ(h)����(n)����(s)������(ms) ������ 1-2 ��ռλ��
     * @param number    ���ӵ���ֵ
     * @returns {Date}
     */
    Date.prototype.dateAdd = function (interval, number) {
        var t = parseInt(number, 10);
        var d = this;
        var k = {
            'y': 'FullYear',
            'q': 'Month',
            'm': 'Month',
            'w': 'Date',
            'd': 'Date',
            'h': 'Hours',
            'n': 'Minutes',
            's': 'Seconds',
            'ms': 'MilliSeconds'
        };
        var n = {
            'q': 3,
            'w': 7
        };
        eval('d.set' + k[interval] + '(d.get' + k[interval] + '()+' + ((n[interval] || 1) * t) + ')');
        return d;
    };

    /**
     * �����������������������յ�
     * @param interval  ��(y)������(q)����(m)����(w)����(d)��Сʱ(h)����(n)����(s)������(ms) ������ 1-2 ��ռλ��
     * @param objDate2  �Ƚϵ�����
     * @returns {Number}
     */
    Date.prototype.dateDiff = function (interval, objDate2) {
        var d = this,
            i = {},
            t = d.getTime(),
            t2 = objDate2.getTime();
        i['y'] = objDate2.getFullYear() - d.getFullYear();
        i['q'] = i['y'] * 4 + Math.floor(objDate2.getMonth() / 4) - Math.floor(d.getMonth() / 4);
        i['m'] = i['y'] * 12 + objDate2.getMonth() - d.getMonth();
        i['ms'] = objDate2.getTime() - d.getTime();
        i['w'] = Math.floor((t2 + 345600000) / (604800000)) - Math.floor((t + 345600000) / (604800000));
        i['d'] = Math.floor(t2 / 86400000) - Math.floor(t / 86400000);
        i['h'] = Math.floor(t2 / 3600000) - Math.floor(t / 3600000);
        i['n'] = Math.floor(t2 / 60000) - Math.floor(t / 60000);
        i['s'] = Math.floor(t2 / 1000) - Math.floor(t / 1000);
        return i[interval];
    };

    if (typeof String.prototype.startsWith != 'function') {
        /**
         * �ж��ַ����Ƿ��������ַ�����ͷ
         * @param prefix    �ַ���
         * @returns {boolean}
         */
        String.prototype.startsWith = function (prefix) {
            return this.slice(0, prefix.length) === prefix;
        };
    }

    if (typeof String.prototype.endsWith != 'function') {
        /**
         * �ж��ַ����Ƿ��������ַ�����β
         * @param suffix    �ַ���
         * @returns {boolean}
         */
        String.prototype.endsWith = function (suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };
    }
    if (typeof Number.prototype.toFixed != 'function') {
        /**
         * ָ��������С��λ��
         * @param n λ��
         * @returns {number}
         */
        Number.prototype.toFixed = function (n) {
            var f = Math.pow(10, n);
            return Math.round(this * f) / f;
        };
    }

    /**
     * url��ѯ��������
     * @param url   ���ӵ�ַ
     * @constructor Object
     */
    var QueryString = function (url) {
        this.urlParams = {};
        this.load(url);
    };

    QueryString.prototype = {
        /**
         * ��ʼ����������Ĭ�϶Ե�ǰURL���д���
         * @param param RUL
         * @returns {QueryString}
         */
        load: function (param) {
            this.urlParams = {};
            var e, k, v, i,
                a = /\+/g, // Regex for replacing addition symbol with a space
                r = /([^&=]+)=?([^&]*)/g,
                d = function (s) {
                    return decodeURIComponent(s.replace(a, " "));
                };
            if (!param) {
                param = window.location.search;
            }
            if (param.charAt(0) == '?') {
                param = param.substring(1);
            } else {
                i = param.indexOf('?');
                if (i > -1) {
                    param = param.substring(i + 1);
                }
            }
            while (e = r.exec(param)) {
                k = d(e[1]);
                v = d(e[2]);
                this.set(k, v, false);
            }
            return this;
        },
        /**
         * ����������ת�����ַ���
         * @param options
         * {
		 *  hash    �Ƿ���е�ǰ�������ê�����
		 *  traditional �Ƿ�Ϊ��ͳת��
		 * }
         * @returns {string}
         */
        toString: function (options) {
            var settings = {
                'hash': false,
                'traditional': true
            };
            if (options) {
                $.extend(settings, options);
            }
            var old = jQuery.ajaxSettings.traditional;
            jQuery.ajaxSettings.traditional = settings.traditional;
            var result = '?' + $.param(this.urlParams);
            jQuery.ajaxSettings.traditional = old;
            if (settings.hash)
                result = result + window.location.hash;
            return result;
        },
        /**
         * ���ò���
         * @param k ������
         * @param v ����ֵ
         * @param replace   �Ƿ��滻
         * @returns {QueryString}
         */
        set: function (k, v, replace) {
            replace = replace || false;
            if (replace)
                this.urlParams[k] = v;
            else {
                if (k in this.urlParams) {
                    if ($.type(this.urlParams[k]) === 'array') {
                        this.urlParams[k].push(v);
                    } else {
                        if (this.urlParams[k] == '')
                            this.urlParams[k] = v;
                        else
                            this.urlParams[k] = [this.urlParams[k], v];
                    }
                } else
                    this.urlParams[k] = v;
            }
            return this;
        },
        /**
         * ��ȡ����ֵ
         * @param k ��������
         * @returns {*}
         */
        get: function (k) {
            return this.urlParams[k];
        },
        /**
         * ɾ������
         * @param k ��������
         * @returns {QueryString}
         */
        remove: function (k) {
            if (k in this.urlParams) {
                delete this.urlParams[k];
            }
            return this;
        }
    };

    var curUserGW;

    /**
     * �жϵ�ǰ�û��Ƿ����ĳ����λ
     * @param name  ��λ����
     * @returns {boolean}
     */
    function includGW(name) {
        var re = new RegExp('(^|,)\\s*' + name + '\\s*(,|$)');
        return re.test(curUserGW);
    }

    var userRoles;

    /**
     * �жϵ�ǰ�û��Ƿ����ĳ��Ȩ��
     * @param name  Ȩ������(ACL����)
     * @returns {boolean}
     */
    function includRole(name) {
        var re = new RegExp('(^|;)\\s*\\[' + name + '\\]\\s*(;|$)');
        return re.test(userRoles);
    }

    /**
     * ��ȡXML�ڵ��б�
     * @param node  �����ĵ�
     * @param str   ѡ����
     * @returns {*|jQuery}
     */
    //  function selectNodes(node, str) {
    //      var el = $.trim(str.replace(/\/+/g, ' ').replace('@', ''));
    //      return $(node).find(el);
    //  }

    /**
     * ��ȡXML����
     * @param node    �����ĵ�
     * @param str   ѡ����
     * @returns {*|jQuery}
     */
    //  function selectSingleNode(node, str) {
    //      var list = selectNodes(node, str);
    //      return list && list[0];
    //  };

    /**
     * ��strB��strA��ɾ��
     * @param strA
     * @param strB
     * @returns {String}
     */
    function RemoveStr(strA, strB) {
        return strA.replace(strB, "").replace(/^,+|,+$/, "").replace(",,", ",");
    }

    /**
     * ȥ�������е��ظ�Ԫ��
     * @param arr    ����������
     * @returns {Array}
     */
    function FilterArray(arr) {
        var res = [];
        var json = {};
        for (var i = 0; i < arr.length; i++) {
            if (!json[arr[i]]) {
                res.push(arr[i]);
                json[arr[i]] = 1;
            }
        }
        return res;
    }

    /**
     * ���ַ���ת��Ϊunicode����
     * @param sstr  �ַ���
     * @returns {String}
     */
    function getUnicodeString(sstr) {
        var unicodestr = "";
        for (var i = 0; i < sstr.length; i++) {
            unicodestr = unicodestr + sstr.charCodeAt(i) + ";";
        }
        return unicodestr;
    }

    /**
     * ��Unicodeת�����ַ���
     * @param codeStr  Unicode����
     * @returns {String}
     */
    function UnicodeToStr(codeStr) {
        var returnStr = "";
        var codeList = codeStr.split(",");
        for (var i = 0; i < codeList.length; i++) {
            returnStr = returnStr + String.fromCharCode(codeList[i]);
        }
        return returnStr;
    }

    /**
     * �ж�IE֧�ֵ�XML����
     * @returns {string}
     * @constructor
     */
    function E_getControlPrefix() {
        var prefixes = ['MSXML2', 'Microsoft', '@Microsoft', 'MSXML', 'MSXML3'];
        var o, o2;
        for (var i = 0; i < prefixes.length; i++) {
            try {
                // try to create the objects
                o = new ActiveXObject(prefixes[i] + '.XmlHttp');
                o2 = new ActiveXObject(prefixes[i] + '.XmlDom');
                return prefixes[i];
            } catch (ex) {
            }
        }
    }

    /**
     * XML����
     * @param  {[type]} url [description]
     * @return {[type]}       [description]
     */
    function loadXMLDoc(xmlFile) {
        var xmlDom = null;
        if (typeof(xmlFile) === 'string') {
            if (xmlFile.substr(0, 1) === '<') {
                if (!!window.ActiveXObject || 'ActiveXObject' in window) { //֧��IE��������ɿ���
                    xmlDom = new ActiveXObject('Microsoft.XMLDOM');
                    xmlDom.async = false;
                    xmlDom.loadXML(xmlFile); //����õ���xml�ļ���
                    return xmlDom;
                } else {
                    var parseXml = new DOMParser();
                    xmlDom = parseXml.parseFromString(xmlFile, 'text/xml');
                }
            } else {
                try {
                    if (!!window.ActiveXObject || 'ActiveXObject' in window) { //֧��IE��������ɿ���
                        xmlDom = new ActiveXObject('Microsoft.XMLDOM');
                        xmlDom.async = false;
                        xmlDom.load(xmlFile); //����õ���xml�ļ���
                        return xmlDom;
                    } else if (document.implementation && document.implementation.createDocument) { //֧�ֻ����������ɿ���
                        xmlDom = document.implementation.createDocument('', '', null);
                        xmlDom.async = false;
                        xmlDom.load(xmlFile);
                        return xmlDom;
                    }
                } catch (ex) {
                    var xmlhttp = new window.XMLHttpRequest();
                    var parseXml = new DOMParser();
                    xmlhttp.open('GET', xmlFile, false);
                    xmlhttp.send(null);
                    xmlDom = xmlhttp.responseXML || parseXml.parseFromString(xmlhttp.responseText, "text/xml");
                }
            }
        }

        return xmlDom;
    }

    /**
     * ��XSLת��XML
     * @param  {[type]} xmlpath     [description]
     * @param  {[type]} xslpath     [description]
     * @param  {[type]} orderColumn [�����ֶ�]
     * @param  {[type]} type        [����ʽ]
     * @return {[type]}             [description]
     */
    function transformNode(xmlpath, xslpath, orderColumn, type) {
        var xml = loadXMLDoc(xmlpath),
            xsl = loadXMLDoc(xslpath),
            resultDocument;
        var newDtd = /http:\/\/www\.w3\.org\/1999\/xsl\/transform/gi;

        if (orderColumn) {
            var dtd = $(xsl).find('stylesheet,xsl\\:stylesheet').attr('xmlns:xsl');
            if (newDtd.test(dtd)) {
                if (type === "-") {
                    type = "ascending";
                } else {
                    type = "descending";
                }
                $(xsl).find('sort,xsl\\:sort').attr('select', 'item[@name="' + orderColumn + '"]').attr('order', type);
            } else {
                type = type || '+';
                $(xsl).find('[order-by]').attr('order-by', type + 'number(item[@name="' + orderColumn + '"])');
            }
        }

        // code for IE
        if (!!window.ActiveXObject || 'ActiveXObject' in window) {
            resultDocument = xml.transformNode(xsl);
            return resultDocument;
        }
        // code for Mozilla, Firefox, Opera, etc.
        else if (document.implementation && document.implementation.createDocument) {
            var xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xsl);
            var result = xsltProcessor.transformToDocument(xml);
            var xmls = new XMLSerializer();
            resultDocument = result && xmls.serializeToString(result) || '';
            return resultDocument;
        }
    }

    /**
     * ѡȡѡ�и�ѡ��
     * @param checkname  checkbox��nameֵ
     * @param selectstr  checkbox��valueֵ ,����:"name;age;sex;"
     */
    function SelectCheck(checkname, selectstr) {
        var chks = document.getElementsByName(checkname),
            rpt = ',;',
            reg;
        for (var j = chks.length; j--;) {
            if (chks[j].value) {
                reg = new RegExp('(^|[' + rpt + '])' + chks[j].value.replace(/ /gi, '') + '([' + rpt + ']|$)');
                if (reg.test(selectstr)) {
                    chks[j].checked = true;
                }
            }
        }
    }

    /**
     * ѡ��ҳ��domԪ��
     * @param str  name/id
     * @returns {*}
     * @constructor
     */
    function getElement(str, document) {
        var node;
        if (typeof(str) === 'string' && document && document.nodeName === '#document') {
            node = document.getElementById(str);
            if (node) {
                return node;
            }
            var list = document.getElementsByName(str);
            if (list.length > 1) {
                return list;
            }
            if (!list[0] && window.console && console.warn) {
                console.warn('δѡ��ҳ��Ԫ�أ�' + str);
            }
            return list[0];
        }
    }

    /**
     * ѭ����ȡ��ҳ���е�Ԫ��
     * @param list
     * @param document
     * @returns {*}
     */
    function getElementLoop(list, document) {
        if ($.isArray(list)) {
            var node = getElement(list.shift(1), document);
            if (list.length && node.nodeName === 'IFRAME') {
                return getElementLoop(list, node.contentWindow && node.contentWindow.document);
            } else {
                return node;
            }
        }
    }

    /**
     * Ԫ��ѡ��
     * @param str
     * @returns {*}
     * @constructor
     */
    function E(str) {
        if (typeof(str) === 'string') {
            var list = str.split('.');
            return getElementLoop(list, window.document);
        }
    }

    /**
     * ��ȡopener�е�Ԫ��
     * @param str
     * @returns {*}
     */
    function getOpenerElement(str) {
        if (window.opener) {
            return getElement(str, window.opener.document);
        }
    }

    /**
     * ��ȡ���ڵ��opener�е�Ԫ��
     * @param str
     * @returns {*}
     */
    function getParantOpenerElement(str) {
        if (window.parent.opener) {
            return getElement(str, window.parent.opener.document);
        }
    }

    /**
     * �رյ�ǰ����
     */
    function close() {
        var target;
        if (this instanceof Window) {
            target = this;
        } else {
            target = window;
        }

        target.opener = null;
        target.open('', '_top');
        target.top.close();
    }

    /**
     * ��������&���� pengte 20170113
     */
    function saveWordAndAtteach() {
        //��������
        $("#tabZW").contents().find("#btn_saveWordDoc").click();
        //���渽��
        $("#tabATT").contents().find("#btn_SaveAttachDoc").click();
    }

    /**
     * ��ӡ������Ϣ
     * @param id ��ӡԪ��ID
     * @returns {*}
     * @constructor
     */
    function printToWord(id) {
        var oWD = new ActiveXObject("Word.Application");
        var oDC = oWD.Documents.Add("", 0, 1);
        var oRange = oDC.Range(0, 1);
        var sel = document.body.createTextRange();
        sel.moveToElementText(id);
        sel.select();
        sel.execCommand("Copy");
        oRange.Paste();
        oWD.Application.Visible = true;
    }

    /**
     * �Ӿ��Ե�ַ�еõ�Ӧ���ĵ���ΨһID
     * @returns {*}
     */
    function getunid() {
        if (location.href.toLowerCase().indexOf("?openform") != -1) {
            return false;
        }
        var regValue = /[^\/]+$/.exec(location.pathname);
        return regValue && regValue[0]
    }

    /**
     * ��ֹ�س�����
     * @returns {*}
     */
    function keyenter(event) {
        event = event || window.event;
        if (event.keyCode == 13) {
            event.returnValue = false;
            alert("��ֹ�س�����")
            $(this).val('').focus();
        }
    }


    $.extend(E, {
        log: window.console && window.console.log,
        error: window.console && window.console.error,
        warn: window.console && window.console.warn,
        ajaxGetResult: ajaxGetResult,
        newCompareTime1AndTime2: newCompareTime1AndTime2,
        includGW: includGW,
        includRole: includRole,
        //      query: new QueryString(),
        RemoveStr: RemoveStr,
        FilterArray: FilterArray,
        getUnicodeString: getUnicodeString,
        UnicodeToStr: UnicodeToStr,
        SelectCheck: SelectCheck,
        loadXMLDoc: loadXMLDoc,
        transformNode: transformNode,
        P: getOpenerElement,
        PP: getParantOpenerElement,
        close: close,
        saveWordAndAtteach: saveWordAndAtteach,
        printToWord: printToWord,
        getunid: getunid,
        keyenter: keyenter
    });

    $(function () {
        /**
         * ��������Ϣ��ȡ
         */
            //��ǰ�û���λ
        curUserGW = $('[name=CurUserGW]').val();
        //��ǰ�û�Ȩ��
        userRoles = $('[name=userRoles]').val();
        //��ǰ����
        var today = $('[name=today]').val();
        $.extend(E, {
            DataBase: $('[name=DataBase]').val(),
            DataDbpath: $('[name=DataDbName]').val(),
            ViewName: $('[name=ViewName]').val(),
            curuser: $.trim($('[name=curuser]').val()),
            CurBankID: $('[name=CurBankID]').val(),
            regusername: $.trim($('[name=regusername]').val()),
            filepath: $('[name=filepath]').val(),
            CurUserGW: curUserGW,
            userRoles: userRoles,
            strdate: today ? new Date(today.replace(/-/g, '/')) : new Date()
        });

        $('.dropdown').click(function (e) {
            var node = $(this).siblings('.dropdown-menu').toggle();
            $('.dropdown-menu').not(node).hide();
            e.stopPropagation();
        });
        $(document).click(function () {
            $('.dropdown-menu').hide();
        });
    });
    return E;
}));