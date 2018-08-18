import config from './config';
import store from './store';
import { showAuthModal, updateNoteSuccess } from './actions/modal-actions';

const api = (() => {
    return  {
        handlers: {},
        token: localStorage.getItem('token') || '',

        setAuthToken: function(token) {
            this.token = token;
        },

        getAuthToken: function() {
            return this.token;
        },

        getApiBaseUrl: function() {
            let url = config.api_schema + '://' + config.api_host;
            if (config.api_port) url += ':' + config.api_port;
            url += config.api_path;

            return url;
        },

        apiRequest: function(url, respHandler, method='GET', body, headers={}) {
            const _this = this;

            let bodyMethods = ['POST', 'PUT'];
            let methods = ['GET', 'DELETE'].concat(bodyMethods);
            if (!methods.includes(method)) method = methods[0];

            let reqHeaders = {
                'Origin': document.origin,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
            if (this.token) 
                reqHeaders['Authorization'] = 'Token ' + this.token;
            reqHeaders = Object.assign(reqHeaders, headers);

            let fetchOptions = {
                'method': method,
                'headers': reqHeaders,
                'redirect': 'follow'
            };

            if (bodyMethods.includes(method))
                fetchOptions['body'] = body;

            let apiBaseUrl = this.getApiBaseUrl();
            let reqUrl = new URL(apiBaseUrl + url);
            reqUrl.searchParams.set('format', 'json');

            fetch(reqUrl.href, fetchOptions)
            .then(function(response) {
                let contentType = response.headers.get('Content-Type');

                if (contentType.indexOf('application/json') == -1) {
                    if (_this.handlers['errorHandler'])
                        _this.handlers['errorHandler'](response);
                }

                let respStatus = response.status;

                // Error handling
                if ([401, 403].includes(respStatus)) {
                    localStorage.setItem('token', null);
                    _this.setAuthToken('');
                    store.dispatch(showAuthModal());
                    throw 'HTTP Error ' + respStatus;
                } else if (respStatus < 200 || respStatus >= 404) {
                    //this.handlers['errorHandler'](response);
                    throw 'HTTP Error ' + respStatus;
                }

                return response.json();
             })
            .then(function(jsonResponse) {
                if (respHandler)
                    respHandler(jsonResponse);
                
            })
            .catch(function(e) {
                console.log('API Fetching error: ', e);
            });
        },

        getNotesList: function(handler) {
            this.apiRequest('notes/', handler);
        },

        getNoteInfo: function(noteId, handler) {
            if (!noteId) return;
            const urlPath = 'notes/' + noteId + '/';
            this.apiRequest(urlPath, handler);
        },
        
        authorize: function(username, password, handler) {
            const _this = this;
            const body = JSON.stringify({'username': username, 'password': password});

            this.apiRequest('token-auth/', function(resp) {
                if (resp.token) {
                    _this.setAuthToken(resp.token);
                    localStorage.setItem('token', resp.token);
                }
                if (handler) handler(resp);
            }, 'POST', body);
        },

        updateNote: function(noteInfo, handler) {
            const urlPath = 'notes/' + noteInfo.id + '/';
            const body = JSON.stringify(noteInfo);

            this.apiRequest(urlPath, function(resp) {
                if (handler)
                    handler(resp);
                //store.dispatch(updateNoteSuccess(resp));
            }, 'PUT', body);
        }
    };
})();

export default api;