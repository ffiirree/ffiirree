let Hash = {
    raw : window.location.hash,

    /**
     * 获取hash中key的值
     * @param key
     * @returns 如果key存在，则返回值；否则，返回null
     */
    get (key) {
        if(key && window.location.hash) {
            let temp = new RegExp(key + '=([^&]+)').exec(window.location.hash);
            if(temp) {
                return temp[1];
            }
        }
        return null;
    },

    /**
     * 设置hash的key的值
     * @param key 如果key存在，则设置为value；否则则添加key并设置为value
     * @param value
     */
    set(key, value) {
        let pattern = new RegExp(key + '=([^&]+)');
        let _hash = key + '=' + value.toString();
        pattern.exec(window.location.hash)
            ? _hash = window.location.hash.replace(pattern, _hash)
            : _hash = window.location.hash + "&" + _hash;

        window.location.hash = _hash;
    },

    /**
     * 如果hash改变了，则调用callback函数
     * @param callback
     */
    change(callback) {
        window.onhashchange = callback;
    },

    /**
     * 检查hash是否为空
     * @returns {boolean}
     */
    empty() {
        return !this.raw;
    }
};

Reflect.defineProperty(Hash, 'value', {
    get () {
        let re = /([^&#/]+)=([^&]+)/g;
        let res_arr;
        let kvs = {};
        while((res_arr = re.exec(window.location.hash) ) !== null){
            kvs[res_arr[1]] = res_arr[2];
        }
        return kvs;
    },

    set(value) {
        let _hash = '';
        Object.keys(value).forEach(key => {
            _hash += '&' + key + '=' + value[key].toString();
        });
        window.location.hash = '/' +  _hash.slice(1);
    },
});