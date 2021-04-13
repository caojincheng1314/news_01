$(function() {
    // 1.获取新闻列表的函数
    function getNewList() {
        $.get('http://www.liulongbin.top:3006/api/news',
            function(res) {
                if (res.status !== 200) return alert('获取新闻列表数据失败！');
                for (var i = 0; i < res.data.length; i++) {
                    res.data[i].tags = res.data[i].tags.split(',');
                }
                var htmlStr = template('tpl-news', res);
                $('#news-list').html(htmlStr);
            })
    }
    getNewList();
    // 定义美化时间的过滤器
    template.defaults.imports.dateFormat = function(daStr) {
            var dt = new Date(daStr);
            var y = padZero(dt.getFullYear());
            var m = padZero(dt.getMonth() + 1);
            var d = padZero(dt.getDate());
            var hh = padZero(dt.getHours());
            var mm = padZero(dt.getMinutes());
            var ss = padZero(dt.getSeconds());
            return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
        }
        // 定义给时间补零的函数
    function padZero(n) {
        var n = n > 9 ? n : '0' + n;
        return n;
    }
})