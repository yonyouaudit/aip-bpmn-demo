const servUrl = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8082/' : (window.location.protocol + '//' + window.location.host + "/");//'http://10.2.112.21:30838/';

export default servUrl;
