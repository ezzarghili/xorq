/*MIT License

Copyright (c) 2019 mohamed ez-zarghili

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/

// Omited values for args are placeholders to ovoid using var
// No test are available yet for this code so use at your own risk
// I am aware that this still need optimization but is good enough for my use cases for now
((window, _prep, timeout) => {
    window.xorq = {}
    _prep = (url, method, xhr, fns) => {
        xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        timeout = window.xorq.timeout;
        timeout && (xhr.timeout = timeout);
        xhr.onreadystatechange = xhr.then = (success, error, callback, data, respenseData) => {
            if (success && success instanceof Function) {
                fns = [, success, error];
            }
            if (fns && xhr.readyState == 4) {
                callback = fns[0 | xhr.status / 2e2];
                if (callback) {
                    respenseData = xhr.responseText
                    try {
                        data = JSON.parse(respenseData)
                    } catch (e) {
                        data = respenseData
                    }
                    callback(data, xhr)
                }
                return
            }
            error && error({
                error: "error accured"
            }, xhr);
        }
        return xhr
    }
    methods = ['GET', "POST"];
    methods.map(method => {
        window.xorq[method.toLowerCase()] = (url, data, headers = {}, xh = window.xorq.headers) => {
            xhr = _prep(url, method);
            xh || (xh = {})
            headers = Object.assign({}, xh, headers);
            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });
            xhr.send(data)
            return xhr
        }
    });
})(window)