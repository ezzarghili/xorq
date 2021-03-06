# xorq

Minimalistic xhr javascript library `experimental`

**587B** minified version

## Usage

The best optimal approach is to add the minified version inline to avoid extra http calls

```html
<script>
((e,t,r)=>{e.xorq={},t=((t,o,s,a)=>((s=new XMLHttpRequest).open(o,t,!0),(r=e.xorq.timeout)&&(s.timeout=r),s.onreadystatechange=s.then=((e,t,r,o,n)=>{if(e&&e instanceof Function&&(a=[,e,t]),a&&4==s.readyState){if(r=a[0|s.status/2e2]){n=s.responseText;try{o=JSON.parse(n)}catch(e){o=n}return void r(o,s)}a[2]&&a[2]({error:"net/timout... error"},s)}}),s)),["HEAD","GET","POST","PUT","PATCH","DELETE"].map(r=>{e.xorq[r.toLowerCase()]=((o,s,a={},n=e.xorq.headers,i)=>(i=t(o,r),n||(n={}),a=Object.assign({},n,a),Object.keys(a).forEach(e=>{i.setRequestHeader(e,a[e])}),i.send(s),i))})})(window)
</script>
```

Or you can use the dist file

```html
<script src="https://github.com/ezzarghili/xorq/releases/download/v1.1.1/xorq.min.js">
</script>
```

You can use the code this way

```javascript
// available methods HEAD, GET, POST, PUT, PATCH, DELETE
// get resource
xorq.get("http://example.com")
    .then(
        // success
        (data, xhr) => console.log(data, xhr),
        // error
        (data, xhr) => console.error(data, xhr)
    )
// post data
xorq.post("http://example.com", data)
    .then(
        // success
        (data, xhr) => console.log(data, xhr),
        // error
        (data, xhr) => console.error(data, xhr)
    )
// set global headers
xorq.headers = {"X-API-VERSION":"v1", "X-USER-ID":"@1"}
// per request headers
headers = {"X-USER-ID":"@2"}
xorq.post("http://example.com", data, headers)
    .then(
        // success
        (data, xhr) => console.log(data),
        // error
        (data, xhr) => console.error(data, xhr)
    )
// if both global and request are set, from previous example, result:
{"X-API-VERSION":"v1", "X-USER-ID":"@2"} // request headers override global ones

// set timout
xorq.timeout = 400 // in miliseconds
```

## License

MIT
