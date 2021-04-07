// Garden Gnome Software - Skin
// Pano2VR 6.0.1/17227
// Filename: liemmmm.ggsk
// Generated Wed May 8 00:34:34 2019

function pano2vrSkin(player, base) {
    player.addVariable('opt_hotspot_preview', 2, true);
    player.addVariable('opt_zoom', 2, true);
    player.addVariable('opt_autorotate', 2, true);
    player.addVariable('opt_info', 2, false);
    player.addVariable('opt_thumbnail', 2, true);
    player.addVariable('opt_thumbnail_tooltip', 2, true);
    player.addVariable('opt_projection', 2, true);
    player.addVariable('opt_gyro', 2, true);
    player.addVariable('opt_fullscreen', 2, true);
    player.addVariable('opt_loader', 2, true);
    player.addVariable('opt_loader_mulires', 2, true);
    player.addVariable('opt_url', 2, false);
    player.addVariable('opt_autohide', 2, false);
    player.addVariable('vis_userdata', 2, false);
    player.addVariable('vis_close_buton', 2, false);
    player.addVariable('vis_image_popup', 2, false);
    player.addVariable('vis_info_popup', 2, false);
    player.addVariable('vis_video_popup_file', 2, false);
    player.addVariable('vis_video_popup_url', 2, false);
    player.addVariable('vis_video_popup_vimeo', 2, false);
    player.addVariable('vis_video_popup_youtube', 2, false);
    player.addVariable('vis_website', 2, false);
    player.addVariable('vis_thumbnail_menu_show', 2, true);
    player.addVariable('vis_thumbnail_menu_mobile', 2, false);
    player.addVariable('vis_thumbnail_menu_auto_hide', 2, true);
    player.addVariable('vis_timer', 2, false);
    player.addVariable('vis_360image_once', 2, true);
    player.addVariable('vis_loader', 2, true);
    player.addVariable('pos_zoom_in', 1, 0);
    player.addVariable('pos_zoom_out', 1, 0);
    player.addVariable('pos_autorotate', 1, 0);
    player.addVariable('pos_information', 1, 0);
    player.addVariable('pos_thumbnail', 1, 0);
    player.addVariable('pos_projection', 1, 0);
    player.addVariable('pos_gyro', 1, 0);
    player.addVariable('pos_fullscreen', 1, 0);
    player.addVariable('pos_controller', 1, 0);
    player.addVariable('pos_360image', 1, 0);
    var me = this;
    var skin = this;
    var flag = false;
    var hotspotTemplates = {};
    var skinKeyPressed = 0;
    this.player = player;
    this.player.skinObj = this;
    this.divSkin = player.divSkin;
    this.ggUserdata = player.userdata;
    this.lastSize = {w: -1, h: -1};
    var basePath = "assets/";
    // auto detect base path
    if (base == '?') {
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
            var src = scripts[i].src;
            if (src.indexOf('skin.js') >= 0) {
                var p = src.lastIndexOf('/');
                if (p >= 0) {
                    basePath = src.substr(0, p + 1);
                }
            }
        }
    } else if (base) {
        basePath = base;
    }
    this.elementMouseDown = [];
    this.elementMouseOver = [];
    var cssPrefix = '';
    var domTransition = 'transition';
    var domTransform = 'transform';
    var prefixes = 'Webkit,Moz,O,ms,Ms'.split(',');
    var i;
    var hs, el, els, elo, ela, elHorScrollFg, elHorScrollBg, elVertScrollFg, elVertScrollBg, elCornerBg;
    if (typeof document.body.style['transform'] == 'undefined') {
        for (var i = 0; i < prefixes.length; i++) {
            if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
                cssPrefix = '-' + prefixes[i].toLowerCase() + '-';
                domTransition = prefixes[i] + 'Transition';
                domTransform = prefixes[i] + 'Transform';
            }
        }
    }

    player.setMargins(0, 0, 0, 0);

    this.updateSize = function (startElement) {
        var stack = [];
        stack.push(startElement);
        while (stack.length > 0) {
            var e = stack.pop();
            if (e.ggUpdatePosition) {
                e.ggUpdatePosition();
            }
            if (e.hasChildNodes()) {
                for (var i = 0; i < e.childNodes.length; i++) {
                    stack.push(e.childNodes[i]);
                }
            }
        }
    }

    this.callNodeChange = function (startElement) {
        var stack = [];
        stack.push(startElement);
        while (stack.length > 0) {
            var e = stack.pop();
            if (e.ggNodeChange) {
                e.ggNodeChange();
            }
            if (e.hasChildNodes()) {
                for (var i = 0; i < e.childNodes.length; i++) {
                    stack.push(e.childNodes[i]);
                }
            }
        }
    }
    player.addListener('configloaded', function () {
        me.callNodeChange(me.divSkin);
    });
    player.addListener('changenodeid', function () {
        me.callNodeChange(me.divSkin);
    });

    var parameterToTransform = function (p) {
        var hs = 'translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
        return hs;
    }

    this.findElements = function (id, regex) {
        var r = [];
        var stack = [];
        var pat = new RegExp(id, '');
        stack.push(me.divSkin);
        while (stack.length > 0) {
            var e = stack.pop();
            if (regex) {
                if (pat.test(e.ggId)) r.push(e);
            } else {
                if (e.ggId == id) r.push(e);
            }
            if (e.hasChildNodes()) {
                for (var i = 0; i < e.childNodes.length; i++) {
                    stack.push(e.childNodes[i]);
                }
            }
        }
        return r;
    }

    this.addSkin = function () {
        var hs = '';
        this.ggCurrentTime = new Date().getTime();
        el = me._menu_button = document.createElement('div');
        els = me._menu_button__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4wLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxMjQuNyAxMjQuNyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTI0LjcgMTI0Ljc7Ii' +
            'B4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIGlkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNMTIsNDIuMWMtMi4yLDAtNCwxLjgtNCw0djMyLjdjMCwyLjIsMS44LDQsNCw0aDEwMC44YzIuMiwwLDQtMS44LDQtNFY0NmMwLTIuMi0xLjgtNC00LTRIMTJ6IE0zMC40LDczLjcNCgkJYy02LjMsMC0xMS40LTUuMS0xMS40LTExLjRDMTksNTYuMSwyNC4xLDUxLDMwLjQsNTFjNi4zLDAsMTEuNCw1LjEsMTEuNCwxMS40QzQxLjgsNjguNiwzNi43LDczLjcsMzAuNCw3My43eiBNNjIuNCw3My43DQoJCWMtNi4zLDAtMTEuNC01LjEtMTEuNC0xMS40QzUxLDU2LjEsNTYuMSw1' +
            'MSw2Mi40LDUxYzYuMywwLDExLjQsNS4xLDExLjQsMTEuNEM3My43LDY4LjYsNjguNiw3My43LDYyLjQsNzMuN3ogTTk0LjMsNzMuNw0KCQlDODgsNzMuNyw4Myw2OC42LDgzLDYyLjRDODMsNTYuMSw4OCw1MSw5NC4zLDUxYzYuMywwLDExLjQsNS4xLDExLjQsMTEuNEMxMDUuNyw2OC42LDEwMC42LDczLjcsOTQuMyw3My43eiIvPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzJfMV8iPg0KCTxnPg0KCQk8Y2lyY2xlIGZpbGw9IiNGRkZGRkYiIGN4PSIzMC40IiBjeT0iNjIuNCIgcj0iMTEuNCIvPg0KCQk8Y2lyY2xlIGZpbGw9IiNGRkZGRkYiIGN4PSI2Mi40IiBjeT0iNjIuNCIgcj0iMTEuNCIvPg0KCQ' +
            'k8Y2lyY2xlIGZpbGw9IiNGRkZGRkYiIGN4PSI5NC4zIiBjeT0iNjIuNCIgcj0iMTEuNCIvPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K';
        me._menu_button__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;menu_button;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._menu_button__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4wLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxMjQuNyAxMjQuNyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTI0LjcgMTI0Ljc7Ii' +
            'B4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIGlkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNNi40LDM5LjhjLTIuNCwwLTQuNCwyLTQuNCw0LjR2MzYuM2MwLDIuNCwyLDQuNCw0LjQsNC40aDExMmMyLjQsMCw0LjQtMiw0LjQtNC40VjQ0LjJjMC0yLjQtMi00LjQtNC40LTQuNEg2LjR6IE0yNi45LDc1DQoJCWMtNywwLTEyLjYtNS43LTEyLjYtMTIuNmMwLTcsNS43LTEyLjYsMTIuNi0xMi42YzcsMCwxMi42LDUuNywxMi42LDEyLjZDMzkuNSw2OS4zLDMzLjgsNzUsMjYuOSw3NXogTTYyLjQsNzUNCgkJYy03LDAtMTIuNi01LjctMTIuNi0xMi42YzAtNyw1LjctMTIu' +
            'NiwxMi42LTEyLjZjNywwLDEyLjYsNS43LDEyLjYsMTIuNkM3NSw2OS4zLDY5LjMsNzUsNjIuNCw3NXogTTk3LjksNzUNCgkJYy03LDAtMTIuNi01LjctMTIuNi0xMi42YzAtNyw1LjctMTIuNiwxMi42LTEyLjZjNywwLDEyLjYsNS43LDEyLjYsMTIuNkMxMTAuNSw2OS4zLDEwNC44LDc1LDk3LjksNzV6Ii8+DQo8L2c+DQo8ZyBpZD0iTGF5ZXJfMl8xXyI+DQoJPGc+DQoJCTxjaXJjbGUgZmlsbD0iI0ZGRkZGRiIgY2xhc3M9InN0MCIgY3g9IjI2LjkiIGN5PSI2Mi40IiByPSIxMi42Ii8+DQoJCTxjaXJjbGUgZmlsbD0iI0ZGRkZGRiIgY2xhc3M9InN0MCIgY3g9IjYyLjQiIGN5PSI2Mi40IiByPS' +
            'IxMi42Ii8+DQoJCTxjaXJjbGUgZmlsbD0iI0ZGRkZGRiIgY2xhc3M9InN0MCIgY3g9Ijk3LjkiIGN5PSI2Mi40IiByPSIxMi42Ii8+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo=';
        me._menu_button__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;menu_button;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "menu_button";
        el.ggDx = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'bottom : 12px;';
        hs += 'cursor : pointer;';
        hs += 'height : 32px;';
        hs += 'left : -10000px;';
        hs += 'opacity : 0;';
        hs += 'position : absolute;';
        hs += 'visibility : hidden;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._menu_button.ggIsActive = function () {
            return false;
        }
        el.ggElementNodeId = function () {
            return player.getCurrentNode();
        }
        me._menu_button.logicBlock_position = function () {
            var newLogicStatePosition;
            if (
                (player.getVariableValue('vis_website') == true) ||
                (player.getVariableValue('vis_video_popup_youtube') == true) ||
                (player.getVariableValue('vis_video_popup_vimeo') == true) ||
                (player.getVariableValue('vis_video_popup_url') == true) ||
                (player.getVariableValue('vis_video_popup_file') == true) ||
                (player.getVariableValue('vis_info_popup') == true) ||
                (player.getVariableValue('vis_image_popup') == true) ||
                (player.getVariableValue('vis_userdata') == true)
            ) {
                newLogicStatePosition = 0;
            } else {
                newLogicStatePosition = -1;
            }
            if (me._menu_button.ggCurrentLogicStatePosition != newLogicStatePosition) {
                me._menu_button.ggCurrentLogicStatePosition = newLogicStatePosition;
                me._menu_button.style[domTransition] = 'left 0s, bottom 0s';
                if (me._menu_button.ggCurrentLogicStatePosition == 0) {
                    this.ggDx = 0;
                    me._menu_button.style.bottom = '-100px';
                    me._menu_button.ggUpdatePosition(true);
                } else {
                    me._menu_button.ggDx = 0;
                    me._menu_button.style.bottom = '12px';
                    me._menu_button.ggUpdatePosition(true);
                }
            }
        }
        me._menu_button.onclick = function (e) {
            me._hide_timer.ggTimeout = Number("5") * 1000.0;
            me._hide_timer.ggTimestamp = skin.ggCurrentTime;
        }
        me._menu_button.onmouseover = function (e) {
            me._menu_button__img.style.visibility = 'hidden';
            me._menu_button__imgo.style.visibility = 'inherit';
        }
        me._menu_button.onmouseout = function (e) {
            me._menu_button__img.style.visibility = 'inherit';
            me._menu_button__imgo.style.visibility = 'hidden';
        }
        me._menu_button.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
        }
        el = me._hide_timer = document.createElement('div');
        el.ggTimestamp = 0;
        el.ggLastIsActive = false;
        el.ggTimeout = 0;
        el.ggId = "hide_timer";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_timer ";
        el.ggType = 'timer';
        hs = '';
        hs += 'height : 32px;';
        hs += 'left : 0px;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : inherit;';
        hs += 'width : 32px;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._hide_timer.ggIsActive = function () {
            return (me._hide_timer.ggTimestamp + me._hide_timer.ggTimeout) >= me.ggCurrentTime;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._hide_timer.ggActivate = function () {
            if (player.transitionsDisabled) {
                me._controller.style[domTransition] = 'none';
            } else {
                me._controller.style[domTransition] = 'all 500ms ease-out 0ms';
            }
            me._controller.style.opacity = '1';
            me._controller.style.visibility = me._controller.ggVisible ? 'inherit' : 'hidden';
            if (player.transitionsDisabled) {
                me._menu_button.style[domTransition] = 'none';
            } else {
                me._menu_button.style[domTransition] = 'all 500ms ease-out 0ms';
            }
            me._menu_button.style.opacity = '0';
            me._menu_button.style.visibility = 'hidden';
            player.setVariableValue('vis_thumbnail_menu_auto_hide', true);
        }
        me._hide_timer.ggDeactivate = function () {
            if (player.transitionsDisabled) {
                me._menu_button.style[domTransition] = 'none';
            } else {
                me._menu_button.style[domTransition] = 'all 500ms ease-out 0ms';
            }
            me._menu_button.style.opacity = '1';
            me._menu_button.style.visibility = me._menu_button.ggVisible ? 'inherit' : 'hidden';
            if (player.transitionsDisabled) {
                me._controller.style[domTransition] = 'none';
            } else {
                me._controller.style[domTransition] = 'all 500ms ease-out 0ms';
            }
            me._controller.style.opacity = '0';
            me._controller.style.visibility = 'hidden';
            player.setVariableValue('vis_thumbnail_menu_auto_hide', false);
        }
        me._hide_timer.ggUpdatePosition = function (useTransition) {
        }
        me._menu_button.appendChild(me._hide_timer);
        me.divSkin.appendChild(me._menu_button);
        el = me._loading_multires = document.createElement('div');
        els = me._loading_multires__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjAiIHdpZHRoPSIyNnB4IiBoZWlnaHQ9IjdweCIgdmlld0JveD0iMCAwIDEyOCAzNSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjE3LjUiIGN5PSIxNy41IiByPSIxNy41Ii8+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3' +
            'BhY2l0eSIgZHVyPSI2MDBtcyIgYmVnaW49IjBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIga2V5VGltZXM9IjA7MC4xNjc7MC41OzAuNjY4OzEiIHZhbHVlcz0iMC4zOzE7MTswLjM7MC4zIi8+PC9nPgo8Zz48Y2lyY2xlIGZpbGw9IiMwMDAiIGN4PSIxMTAuNSIgY3k9IjE3LjUiIHI9IjE3LjUiLz48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiBkdXI9IjYwMG1zIiBiZWdpbj0iMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBrZXlUaW1lcz0iMDswLjMzNDswLjU7MC44MzU7MSIgdmFsdWVzPSIwLjM7MC4zOzE7MTswLjMiLz48L2c+CjxnPjxjaXJjbGUgZmlsbD0iIzAwMCIg' +
            'Y3g9IjY0IiBjeT0iMTcuNSIgcj0iMTcuNSIvPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGR1cj0iNjAwbXMiIGJlZ2luPSIwcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGtleVRpbWVzPSIwOzAuMTY3OzAuMzM0OzAuNjY4OzAuODM1OzEiIHZhbHVlcz0iMC4zOzAuMzsxOzE7MC4zOzAuMyIvPjwvZz4KPC9zdmc+Cg==';
        me._loading_multires__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;loading_multires;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        el.ggId = "loading_multires";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'height : 7px;';
        hs += 'position : absolute;';
        hs += 'right : 6px;';
        hs += 'top : 6px;';
        hs += 'visibility : hidden;';
        hs += 'width : 25px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._loading_multires.ggIsActive = function () {
            return false;
        }
        el.ggElementNodeId = function () {
            return player.getCurrentNode();
        }
        me._loading_multires.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getIsTileLoading() == true) &&
                (player.getVariableValue('opt_loader_mulires') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._loading_multires.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._loading_multires.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._loading_multires.style[domTransition] = '';
                if (me._loading_multires.ggCurrentLogicStateVisible == 0) {
                    me._loading_multires.style.visibility = (Number(me._loading_multires.style.opacity) > 0 || !me._loading_multires.style.opacity) ? 'inherit' : 'hidden';
                    me._loading_multires.ggVisible = true;
                } else {
                    me._loading_multires.style.visibility = "hidden";
                    me._loading_multires.ggVisible = false;
                }
            }
        }
        me._loading_multires.ggUpdatePosition = function (useTransition) {
        }
        me.divSkin.appendChild(me._loading_multires);
        el = me._screentint = document.createElement('div');
        el.ggId = "screentint";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_rectangle ";
        el.ggType = 'rectangle';
        hs = '';
        hs += 'background : rgba(0,0,0,0.392157);';
        hs += 'border : 1px solid #000000;';
        hs += 'cursor : pointer;';
        hs += 'height : 100%;';
        hs += 'left : 0px;';
        hs += 'opacity : 0;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : hidden;';
        hs += 'width : 100%;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._screentint.ggIsActive = function () {
            return false;
        }
        el.ggElementNodeId = function () {
            return player.getCurrentNode();
        }
        me._screentint.logicBlock_alpha = function () {
            var newLogicStateAlpha;
            if (
                (player.getVariableValue('vis_image_popup') == true) ||
                (player.getVariableValue('vis_info_popup') == true) ||
                (player.getVariableValue('vis_video_popup_file') == true) ||
                (player.getVariableValue('vis_video_popup_url') == true) ||
                (player.getVariableValue('vis_video_popup_vimeo') == true) ||
                (player.getVariableValue('vis_video_popup_youtube') == true) ||
                (player.getVariableValue('vis_userdata') == true) ||
                (player.getVariableValue('vis_website') == true) ||
                (player.getVariableValue('vis_thumbnail_menu_mobile') == true) &&
                (player.getVariableValue('vis_thumbnail_menu_auto_hide') == true) &&
                (player.getViewerSize().width <= 450)
            ) {
                newLogicStateAlpha = 0;
            } else {
                newLogicStateAlpha = -1;
            }
            if (me._screentint.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
                me._screentint.ggCurrentLogicStateAlpha = newLogicStateAlpha;
                me._screentint.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._screentint.ggCurrentLogicStateAlpha == 0) {
                    me._screentint.style.visibility = me._screentint.ggVisible ? 'inherit' : 'hidden';
                    me._screentint.style.opacity = 1;
                } else {
                    me._screentint.style.visibility = "hidden";
                    me._screentint.style.opacity = 0;
                }
            }
        }
        me._screentint.onclick = function (e) {
            player.setVariableValue('vis_image_popup', false);
            player.setVariableValue('vis_info_popup', false);
            player.setVariableValue('vis_video_popup_file', false);
            player.setVariableValue('vis_video_popup_url', false);
            player.setVariableValue('vis_video_popup_vimeo', false);
            player.setVariableValue('vis_video_popup_youtube', false);
            player.setVariableValue('vis_website', false);
            player.setVariableValue('vis_userdata', false);
        }
        me._screentint.ggUpdatePosition = function (useTransition) {
        }
        me.divSkin.appendChild(me._screentint);
        el = me._controller = document.createElement('div');
        el.ggId = "controller";
        el.ggDx = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_container ";
        el.ggType = 'container';
        hs = '';
        hs += 'bottom : 23px;';
        hs += 'height : 32px;';
        hs += 'left : -10000px;';
        hs += 'opacity : 0;';
        hs += 'position : absolute;';
        hs += 'visibility : hidden;';
        hs += 'width : 256px;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._controller.ggIsActive = function () {
            return false;
        }
        el.ggElementNodeId = function () {
            return player.getCurrentNode();
        }
        me._controller.logicBlock_position = function () {
            var newLogicStatePosition;
            if (
                (player.getVariableValue('vis_website') == true) ||
                (player.getVariableValue('vis_video_popup_youtube') == true) ||
                (player.getVariableValue('vis_video_popup_vimeo') == true) ||
                (player.getVariableValue('vis_video_popup_url') == true) ||
                (player.getVariableValue('vis_video_popup_file') == true) ||
                (player.getVariableValue('vis_info_popup') == true) ||
                (player.getVariableValue('vis_image_popup') == true) ||
                (player.getVariableValue('vis_userdata') == true)
            ) {
                newLogicStatePosition = 0;
            } else {
                newLogicStatePosition = -1;
            }
            if (me._controller.ggCurrentLogicStatePosition != newLogicStatePosition) {
                me._controller.ggCurrentLogicStatePosition = newLogicStatePosition;
                me._controller.style[domTransition] = 'left 0s, bottom 0s, opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._controller.ggCurrentLogicStatePosition == 0) {
                    this.ggDx = 0;
                    me._controller.style.bottom = '-100px';
                    me._controller.ggUpdatePosition(true);
                } else {
                    me._controller.ggDx = 0;
                    me._controller.style.bottom = '23px';
                    me._controller.ggUpdatePosition(true);
                }
            }
        }
        me._controller.logicBlock_alpha = function () {
            var newLogicStateAlpha;
            if (
                (player.getVariableValue('vis_timer') == true)
            ) {
                newLogicStateAlpha = 0;
            } else {
                newLogicStateAlpha = -1;
            }
            if (me._controller.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
                me._controller.ggCurrentLogicStateAlpha = newLogicStateAlpha;
                me._controller.style[domTransition] = 'left 0s, bottom 0s, opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._controller.ggCurrentLogicStateAlpha == 0) {
                    me._controller.style.visibility = me._controller.ggVisible ? 'inherit' : 'hidden';
                    me._controller.style.opacity = 1;
                } else {
                    me._controller.style.visibility = "hidden";
                    me._controller.style.opacity = 0;
                }
            }
        }
        me._controller.onmouseover = function (e) {
            me.elementMouseOver['controller'] = true;
        }
        me._controller.onmouseout = function (e) {
            me.elementMouseOver['controller'] = false;
        }
        me._controller.ontouchend = function (e) {
            me.elementMouseOver['controller'] = false;
        }
        me._controller.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
        }
        el = me._controller_bg = document.createElement('div');
        el.ggId = "controller_bg";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_rectangle ";
        el.ggType = 'rectangle';
        hs = '';
        hs += cssPrefix + 'border-radius : 3px;';
        hs += 'border-radius : 3px;';
        hs += 'background : rgba(63,63,63,0.498039);';
        hs += 'border : 0px solid #000000;';
        hs += 'cursor : default;';
        hs += 'height : 50px;';
        hs += 'left : -9px;';
        hs += 'position : absolute;';
        hs += 'top : -9px;';
        hs += 'visibility : inherit;';
        hs += 'width : 274px;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._controller_bg.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._controller_bg.logicBlock_position = function () {
            var newLogicStatePosition;
            if (
                (player.getVariableValue('pos_controller') == 1)
            ) {
                newLogicStatePosition = 0;
            } else if (
                (player.getVariableValue('pos_controller') == 2)
            ) {
                newLogicStatePosition = 1;
            } else if (
                (player.getVariableValue('pos_controller') == 3)
            ) {
                newLogicStatePosition = 2;
            } else if (
                (player.getVariableValue('pos_controller') == 4)
            ) {
                newLogicStatePosition = 3;
            } else if (
                (player.getVariableValue('pos_controller') == 5)
            ) {
                newLogicStatePosition = 4;
            } else if (
                (player.getVariableValue('pos_controller') == 6)
            ) {
                newLogicStatePosition = 5;
            } else if (
                (player.getVariableValue('pos_controller') == 7)
            ) {
                newLogicStatePosition = 6;
            } else {
                newLogicStatePosition = -1;
            }
            if (me._controller_bg.ggCurrentLogicStatePosition != newLogicStatePosition) {
                me._controller_bg.ggCurrentLogicStatePosition = newLogicStatePosition;
                me._controller_bg.style[domTransition] = 'left 0s, top 0s, width 0s, height 0s';
                if (me._controller_bg.ggCurrentLogicStatePosition == 0) {
                    me._controller_bg.style.left = '87px';
                    me._controller_bg.style.top = '-9px';
                } else if (me._controller_bg.ggCurrentLogicStatePosition == 1) {
                    me._controller_bg.style.left = '71px';
                    me._controller_bg.style.top = '-9px';
                } else if (me._controller_bg.ggCurrentLogicStatePosition == 2) {
                    me._controller_bg.style.left = '55px';
                    me._controller_bg.style.top = '-9px';
                } else if (me._controller_bg.ggCurrentLogicStatePosition == 3) {
                    me._controller_bg.style.left = '39px';
                    me._controller_bg.style.top = '-9px';
                } else if (me._controller_bg.ggCurrentLogicStatePosition == 4) {
                    me._controller_bg.style.left = '23px';
                    me._controller_bg.style.top = '-8px';
                } else if (me._controller_bg.ggCurrentLogicStatePosition == 5) {
                    me._controller_bg.style.left = '7px';
                    me._controller_bg.style.top = '-9px';
                } else if (me._controller_bg.ggCurrentLogicStatePosition == 6) {
                    me._controller_bg.style.left = '-9px';
                    me._controller_bg.style.top = '-9px';
                } else {
                    me._controller_bg.style.left = '-9px';
                    me._controller_bg.style.top = '-9px';
                }
            }
        }
        me._controller_bg.logicBlock_size = function () {
            var newLogicStateSize;
            if (
                (player.getVariableValue('pos_controller') == 1)
            ) {
                newLogicStateSize = 0;
            } else if (
                (player.getVariableValue('pos_controller') == 2)
            ) {
                newLogicStateSize = 1;
            } else if (
                (player.getVariableValue('pos_controller') == 3)
            ) {
                newLogicStateSize = 2;
            } else if (
                (player.getVariableValue('pos_controller') == 4)
            ) {
                newLogicStateSize = 3;
            } else if (
                (player.getVariableValue('pos_controller') == 5)
            ) {
                newLogicStateSize = 4;
            } else if (
                (player.getVariableValue('pos_controller') == 6)
            ) {
                newLogicStateSize = 5;
            } else if (
                (player.getVariableValue('pos_controller') == 7)
            ) {
                newLogicStateSize = 6;
            } else {
                newLogicStateSize = -1;
            }
            if (me._controller_bg.ggCurrentLogicStateSize != newLogicStateSize) {
                me._controller_bg.ggCurrentLogicStateSize = newLogicStateSize;
                me._controller_bg.style[domTransition] = 'left 0s, top 0s, width 0s, height 0s';
                if (me._controller_bg.ggCurrentLogicStateSize == 0) {
                    me._controller_bg.style.width = '82px';
                    me._controller_bg.style.height = '50px';
                    skin.updateSize(me._controller_bg);
                } else if (me._controller_bg.ggCurrentLogicStateSize == 1) {
                    me._controller_bg.style.width = '114px';
                    me._controller_bg.style.height = '50px';
                    skin.updateSize(me._controller_bg);
                } else if (me._controller_bg.ggCurrentLogicStateSize == 2) {
                    me._controller_bg.style.width = '146px';
                    me._controller_bg.style.height = '50px';
                    skin.updateSize(me._controller_bg);
                } else if (me._controller_bg.ggCurrentLogicStateSize == 3) {
                    me._controller_bg.style.width = '178px';
                    me._controller_bg.style.height = '50px';
                    skin.updateSize(me._controller_bg);
                } else if (me._controller_bg.ggCurrentLogicStateSize == 4) {
                    me._controller_bg.style.width = '210px';
                    me._controller_bg.style.height = '50px';
                    skin.updateSize(me._controller_bg);
                } else if (me._controller_bg.ggCurrentLogicStateSize == 5) {
                    me._controller_bg.style.width = '242px';
                    me._controller_bg.style.height = '50px';
                    skin.updateSize(me._controller_bg);
                } else if (me._controller_bg.ggCurrentLogicStateSize == 6) {
                    me._controller_bg.style.width = '274px';
                    me._controller_bg.style.height = '50px';
                    skin.updateSize(me._controller_bg);
                } else {
                    me._controller_bg.style.width = '274px';
                    me._controller_bg.style.height = '50px';
                    skin.updateSize(me._controller_bg);
                }
            }
        }
        me._controller_bg.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('pos_controller') == 0)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._controller_bg.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._controller_bg.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._controller_bg.style[domTransition] = 'left 0s, top 0s, width 0s, height 0s';
                if (me._controller_bg.ggCurrentLogicStateVisible == 0) {
                    me._controller_bg.style.visibility = "hidden";
                    me._controller_bg.ggVisible = false;
                } else {
                    me._controller_bg.style.visibility = (Number(me._controller_bg.style.opacity) > 0 || !me._controller_bg.style.opacity) ? 'inherit' : 'hidden';
                    me._controller_bg.ggVisible = true;
                }
            }
        }
        me._controller_bg.ggUpdatePosition = function (useTransition) {
        }
        me._controller.appendChild(me._controller_bg);
        el = me._controller_slider = document.createElement('div');
        el.ggId = "controller_slider";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_container ";
        el.ggType = 'container';
        hs = '';
        hs += 'height : 32px;';
        hs += 'left : 0px;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : inherit;';
        hs += 'width : 32px;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._controller_slider.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._controller_slider.logicBlock_position = function () {
            var newLogicStatePosition;
            if (
                (player.getVariableValue('pos_controller') == 1)
            ) {
                newLogicStatePosition = 0;
            } else if (
                (player.getVariableValue('pos_controller') == 2)
            ) {
                newLogicStatePosition = 1;
            } else if (
                (player.getVariableValue('pos_controller') == 3)
            ) {
                newLogicStatePosition = 2;
            } else if (
                (player.getVariableValue('pos_controller') == 4)
            ) {
                newLogicStatePosition = 3;
            } else if (
                (player.getVariableValue('pos_controller') == 5)
            ) {
                newLogicStatePosition = 4;
            } else if (
                (player.getVariableValue('pos_controller') == 6)
            ) {
                newLogicStatePosition = 5;
            } else if (
                (player.getVariableValue('pos_controller') == 7)
            ) {
                newLogicStatePosition = 6;
            } else if (
                (player.getVariableValue('pos_controller') == 8)
            ) {
                newLogicStatePosition = 7;
            } else {
                newLogicStatePosition = -1;
            }
            if (me._controller_slider.ggCurrentLogicStatePosition != newLogicStatePosition) {
                me._controller_slider.ggCurrentLogicStatePosition = newLogicStatePosition;
                me._controller_slider.style[domTransition] = 'left 0s, top 0s';
                if (me._controller_slider.ggCurrentLogicStatePosition == 0) {
                    me._controller_slider.style.left = '112px';
                    me._controller_slider.style.top = '0px';
                } else if (me._controller_slider.ggCurrentLogicStatePosition == 1) {
                    me._controller_slider.style.left = '96px';
                    me._controller_slider.style.top = '0px';
                } else if (me._controller_slider.ggCurrentLogicStatePosition == 2) {
                    me._controller_slider.style.left = '80px';
                    me._controller_slider.style.top = '0px';
                } else if (me._controller_slider.ggCurrentLogicStatePosition == 3) {
                    me._controller_slider.style.left = '64px';
                    me._controller_slider.style.top = '0px';
                } else if (me._controller_slider.ggCurrentLogicStatePosition == 4) {
                    me._controller_slider.style.left = '48px';
                    me._controller_slider.style.top = '0px';
                } else if (me._controller_slider.ggCurrentLogicStatePosition == 5) {
                    me._controller_slider.style.left = '32px';
                    me._controller_slider.style.top = '0px';
                } else if (me._controller_slider.ggCurrentLogicStatePosition == 6) {
                    me._controller_slider.style.left = '16px';
                    me._controller_slider.style.top = '0px';
                } else if (me._controller_slider.ggCurrentLogicStatePosition == 7) {
                    me._controller_slider.style.left = '0px';
                    me._controller_slider.style.top = '0px';
                } else {
                    me._controller_slider.style.left = '0px';
                    me._controller_slider.style.top = '0px';
                }
            }
        }
        me._controller_slider.ggUpdatePosition = function (useTransition) {
        }
        el = me._fullscreen_buttons = document.createElement('div');
        el.ggPermeable = false;
        el.ggId = "fullscreen_buttons";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_container ";
        el.ggType = 'container';
        hs = '';
        hs += 'height : 32px;';
        hs += 'left : 224px;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : hidden;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._fullscreen_buttons.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._fullscreen_buttons.logicBlock_position = function () {
            var newLogicStatePosition;
            if (
                (player.getVariableValue('pos_fullscreen') == 0)
            ) {
                newLogicStatePosition = 0;
            } else if (
                (player.getVariableValue('pos_fullscreen') == 1)
            ) {
                newLogicStatePosition = 1;
            } else if (
                (player.getVariableValue('pos_fullscreen') == 2)
            ) {
                newLogicStatePosition = 2;
            } else if (
                (player.getVariableValue('pos_fullscreen') == 3)
            ) {
                newLogicStatePosition = 3;
            } else if (
                (player.getVariableValue('pos_fullscreen') == 4)
            ) {
                newLogicStatePosition = 4;
            } else if (
                (player.getVariableValue('pos_fullscreen') == 5)
            ) {
                newLogicStatePosition = 5;
            } else if (
                (player.getVariableValue('pos_fullscreen') == 6)
            ) {
                newLogicStatePosition = 6;
            } else if (
                (player.getVariableValue('pos_fullscreen') == 7)
            ) {
                newLogicStatePosition = 7;
            } else {
                newLogicStatePosition = -1;
            }
            if (me._fullscreen_buttons.ggCurrentLogicStatePosition != newLogicStatePosition) {
                me._fullscreen_buttons.ggCurrentLogicStatePosition = newLogicStatePosition;
                me._fullscreen_buttons.style[domTransition] = 'left 0s, top 0s';
                if (me._fullscreen_buttons.ggCurrentLogicStatePosition == 0) {
                    me._fullscreen_buttons.style.left = '0px';
                    me._fullscreen_buttons.style.top = '0px';
                } else if (me._fullscreen_buttons.ggCurrentLogicStatePosition == 1) {
                    me._fullscreen_buttons.style.left = '32px';
                    me._fullscreen_buttons.style.top = '0px';
                } else if (me._fullscreen_buttons.ggCurrentLogicStatePosition == 2) {
                    me._fullscreen_buttons.style.left = '64px';
                    me._fullscreen_buttons.style.top = '0px';
                } else if (me._fullscreen_buttons.ggCurrentLogicStatePosition == 3) {
                    me._fullscreen_buttons.style.left = '96px';
                    me._fullscreen_buttons.style.top = '0px';
                } else if (me._fullscreen_buttons.ggCurrentLogicStatePosition == 4) {
                    me._fullscreen_buttons.style.left = '128px';
                    me._fullscreen_buttons.style.top = '0px';
                } else if (me._fullscreen_buttons.ggCurrentLogicStatePosition == 5) {
                    me._fullscreen_buttons.style.left = '160px';
                    me._fullscreen_buttons.style.top = '0px';
                } else if (me._fullscreen_buttons.ggCurrentLogicStatePosition == 6) {
                    me._fullscreen_buttons.style.left = '192px';
                    me._fullscreen_buttons.style.top = '0px';
                } else if (me._fullscreen_buttons.ggCurrentLogicStatePosition == 7) {
                    me._fullscreen_buttons.style.left = '224px';
                    me._fullscreen_buttons.style.top = '0px';
                } else {
                    me._fullscreen_buttons.style.left = '224px';
                    me._fullscreen_buttons.style.top = '0px';
                }
            }
        }
        me._fullscreen_buttons.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('opt_fullscreen') == true) &&
                (player.getOS() != 4)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._fullscreen_buttons.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._fullscreen_buttons.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._fullscreen_buttons.style[domTransition] = 'left 0s, top 0s';
                if (me._fullscreen_buttons.ggCurrentLogicStateVisible == 0) {
                    me._fullscreen_buttons.style.visibility = (Number(me._fullscreen_buttons.style.opacity) > 0 || !me._fullscreen_buttons.style.opacity) ? 'inherit' : 'hidden';
                    me._fullscreen_buttons.ggVisible = true;
                } else {
                    me._fullscreen_buttons.style.visibility = "hidden";
                    me._fullscreen_buttons.ggVisible = false;
                }
            }
        }
        me._fullscreen_buttons.onclick = function (e) {
            player.toggleFullscreen();
        }
        me._fullscreen_buttons.ggUpdatePosition = function (useTransition) {
        }
        el = me._fullscreen = document.createElement('div');
        els = me._fullscreen__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8Zz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0yMDYuMiw0MTkuMmg2Mi4zdi00NC4zaC02Mi4zVjQxOS4yeiBNLTE3OC45LDM5Ny4zYzAsMCwxNy43LTEyLjcsMTcuNy0xMi43bC00LTUuNg0KCQkJYy0wLjItMC4zLTAuMi0wLjUtMC4xLTAuOWMwLjItMC40LDAuNS0wLjUsMC44LTAuNWwxNi4yLTAuMWMwLjQsMCwwLjYsMC4xLDAuOCwwLjRjMC4yLDAuMiwwLjIsMC41LDAuMSwwLjhsLTUuMiwxNS40DQoJCQljLTAuMSwwLjMtMC40LDAuNi0wLjgsMC42Yy0wLjQsMC0wLjctMC4xLTAuOS0wLjNsLTMuOS01LjRjMCwwLTE3LjcsMTIuNy0xNy43LDEyLjdj' +
            'LTAuNywwLjUtMS42LDAuMy0yLjEtMC40bC0xLjQtMS45DQoJCQlDLTE3OS43LDM5OC44LTE3OS41LDM5Ny44LTE3OC45LDM5Ny4zeiIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE3NSwzNDAuOWMtMzEsMC01Ni4xLDI1LjEtNTYuMSw1Ni4xczI1LjEsNTYuMSw1Ni4xLDU2LjFjMzEsMCw1Ni4xLTI1LjEsNTYuMS01Ni4xDQoJCQlTLTE0NCwzNDAuOS0xNzUsMzQwLjl6IE0tMTM4LjQsNDIwLjNjMCwyLjMtMS45LDQuMi00LjIsNC4yaC02NC43Yy0yLjMsMC00LjItMS45LTQuMi00LjJ2LTQ2LjdjMC0yLjMsMS45LTQuMiw0LjItNC4yaDY0LjcNCgkJCWMyLjMsMCw0LjIsMS45LDQuMi' +
            'w0LjJWNDIwLjN6Ii8+DQoJPC9nPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTQ3LjQsMzc3LjljLTAuMi0wLjMtMC40LTAuNC0wLjgtMC40bC0xNi4yLDAuMWMtMC40LDAtMC43LDAuMS0wLjgsMC41Yy0wLjIsMC40LTAuMiwwLjYsMC4xLDAuOWw0LDUuNg0KCQljLTAuMSwwLTE3LjcsMTIuNy0xNy43LDEyLjdjLTAuNywwLjUtMC44LDEuNS0wLjQsMi4xbDEuNCwxLjljMC41LDAuNywxLjUsMC44LDIuMSwwLjRjMCwwLDE3LjYtMTIuNywxNy43LTEyLjdsMy45LDUuNA0KCQljMC4yLDAuMywwLjQsMC40LDAuOSwwLjNjMC40LDAsMC43LTAuMyww' +
            'LjgtMC42bDUuMi0xNS40Qy0xNDcuMiwzNzguNC0xNDcuMiwzNzguMS0xNDcuNCwzNzcuOXoiLz4NCgk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTE0Mi43LDQyNC42aC02NC43Yy0yLjMsMC00LjItMS45LTQuMi00LjJ2LTQ2LjdjMC0yLjMsMS45LTQuMiw0LjItNC4yaDY0LjdjMi4zLDAsNC4yLDEuOSw0LjIsNC4ydjQ2LjcNCgkJQy0xMzguNCw0MjIuNy0xNDAuMyw0MjQuNi0xNDIuNyw0MjQuNnogTS0yMDYuMiw0MTkuMmg2Mi4zdi00NC4zaC02Mi4zVjQxOS4yeiIvPg0KPC9nPg0KPC9zdmc+DQo=';
        me._fullscreen__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;fullscreen;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._fullscreen__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8Zz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0yMDkuNiw0MjEuNmg2OS4zdi00OS4zaC02OS4zVjQyMS42eiBNLTE3OS4zLDM5Ny40YzAsMCwxOS42LTE0LjEsMTkuNy0xNC4xbC00LjUtNi4yDQoJCQljLTAuMi0wLjMtMC4yLTAuNi0wLjEtMWMwLjItMC40LDAuNS0wLjYsMC45LTAuNmwxOC0wLjFjMC40LDAsMC43LDAuMSwwLjksMC40YzAuMiwwLjMsMC4yLDAuNSwwLjEsMC45bC01LjgsMTcuMQ0KCQkJYy0wLjEsMC40LTAuNCwwLjctMC44LDAuN2MtMC41LDAtMC43LTAuMS0xLTAuNGwtNC4zLTZjLTAuMSwwLjEtMTkuNywxNC4xLTE5LjcsMTQuMWMt' +
            'MC44LDAuNS0xLjgsMC40LTIuNC0wLjRsLTEuNS0yLjENCgkJCUMtMTgwLjIsMzk5LTE4MCwzOTcuOS0xNzkuMywzOTcuNHoiLz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xNzUsMzM0LjZjLTM0LjQsMC02Mi40LDI3LjktNjIuNCw2Mi40czI3LjksNjIuNCw2Mi40LDYyLjRjMzQuNCwwLDYyLjQtMjcuOSw2Mi40LTYyLjQNCgkJCVMtMTQwLjYsMzM0LjYtMTc1LDMzNC42eiBNLTEzNC40LDQyMi45YzAsMi42LTIuMSw0LjctNC43LDQuN2gtNzEuOGMtMi42LDAtNC43LTIuMS00LjctNC43di01MS44YzAtMi42LDIuMS00LjcsNC43LTQuN2g3MS44DQoJCQljMi42LDAsNC43LDIuMSw0Lj' +
            'csNC43VjQyMi45eiIvPg0KCTwvZz4NCjwvZz4NCjxnIGlkPSJMYXllcl8yIj4NCgk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTE0NC4zLDM3NS44Yy0wLjItMC4zLTAuNS0wLjQtMC45LTAuNGwtMTgsMC4xYy0wLjQsMC0wLjgsMC4yLTAuOSwwLjZjLTAuMiwwLjQtMC4yLDAuNywwLjEsMWw0LjUsNi4yDQoJCWMtMC4xLDAtMTkuNywxNC4xLTE5LjcsMTQuMWMtMC44LDAuNS0wLjksMS42LTAuNCwyLjRsMS41LDIuMWMwLjUsMC44LDEuNiwwLjksMi40LDAuNGMwLDAsMTkuNi0xNC4xLDE5LjctMTQuMWw0LjMsNg0KCQljMC4yLDAuMywwLjUsMC40LDEsMC40YzAuNSwwLDAuNy0wLjMsMC44LTAu' +
            'N2w1LjgtMTcuMUMtMTQ0LjEsMzc2LjMtMTQ0LjEsMzc2LTE0NC4zLDM3NS44eiIvPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTM5LjEsNDI3LjZoLTcxLjhjLTIuNiwwLTQuNy0yLjEtNC43LTQuN3YtNTEuOGMwLTIuNiwyLjEtNC43LDQuNy00LjdoNzEuOGMyLjYsMCw0LjcsMi4xLDQuNyw0Ljd2NTEuOA0KCQlDLTEzNC40LDQyNS41LTEzNi41LDQyNy42LTEzOS4xLDQyNy42eiBNLTIwOS42LDQyMS42aDY5LjN2LTQ5LjNoLTY5LjNWNDIxLjZ6Ii8+DQo8L2c+DQo8L3N2Zz4NCg==';
        me._fullscreen__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;fullscreen;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "fullscreen";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 32px;';
        hs += 'left : 0px;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : inherit;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._fullscreen.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._fullscreen.logicBlock_alpha = function () {
            var newLogicStateAlpha;
            if (
                (player.getIsFullscreen() == true)
            ) {
                newLogicStateAlpha = 0;
            } else {
                newLogicStateAlpha = -1;
            }
            if (me._fullscreen.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
                me._fullscreen.ggCurrentLogicStateAlpha = newLogicStateAlpha;
                me._fullscreen.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._fullscreen.ggCurrentLogicStateAlpha == 0) {
                    me._fullscreen.style.visibility = "hidden";
                    me._fullscreen.style.opacity = 0;
                } else {
                    me._fullscreen.style.visibility = me._fullscreen.ggVisible ? 'inherit' : 'hidden';
                    me._fullscreen.style.opacity = 1;
                }
            }
        }
        me._fullscreen.onmouseover = function (e) {
            me._fullscreen__img.style.visibility = 'hidden';
            me._fullscreen__imgo.style.visibility = 'inherit';
        }
        me._fullscreen.onmouseout = function (e) {
            me._fullscreen__img.style.visibility = 'inherit';
            me._fullscreen__imgo.style.visibility = 'hidden';
        }
        me._fullscreen.ggUpdatePosition = function (useTransition) {
        }
        me._fullscreen_buttons.appendChild(me._fullscreen);
        el = me._fullscreen_off = document.createElement('div');
        els = me._fullscreen_off__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8Zz4NCgkJPHJlY3QgeD0iLTIwNi4yIiB5PSIzOTciIGZpbGw9IiMwMDAwMDAiIHdpZHRoPSIzMi4xIiBoZWlnaHQ9IjIyLjIiLz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xNzUsMzQwLjljLTMxLDAtNTYuMSwyNS4xLTU2LjEsNTYuMWMwLDMxLDI1LjEsNTYuMSw1Ni4xLDU2LjFjMzEsMCw1Ni4xLTI1LjEsNTYuMS01Ni4xDQoJCQlDLTExOC45LDM2Ni0xNDQsMzQwLjktMTc1LDM0MC45eiBNLTE2OC42LDQyMC4zYzAsMi4zLTEuOSw0LjItNC4yLDQuMmgtMzQuNWMtMi4zLDAtNC4yLTEuOS00LjItNC4ydi0yNC41YzAtMi4zLDEuOS00LjIsNC4yLTQu' +
            'Mg0KCQkJaDM0LjVjMi4zLDAsNC4yLDEuOSw0LjIsNC4yTC0xNjguNiw0MjAuM0wtMTY4LjYsNDIwLjN6IE0tMTM2LjgsMzcyLjZsLTE3LjUsMTIuNmMtMC4xLDAtMC4xLDAuMS0wLjIsMC4xbDAuNywwLjlsMy4zLDQuNw0KCQkJYzAuMiwwLjMsMC4yLDAuNSwwLjEsMC45Yy0wLjIsMC40LTAuNSwwLjUtMC44LDAuNWwtMTYuMiwwLjFjLTAuNCwwLTAuNi0wLjEtMC44LTAuNGMtMC4yLTAuMi0wLjItMC41LTAuMS0wLjhsNS4yLTE1LjQNCgkJCWMwLjEtMC4zLDAuNC0wLjYsMC44LTAuNmMwLjQsMCwwLjcsMC4xLDAuOSwwLjNsMy4zLDQuNmwwLjYsMC44YzAsMCwwLjEtMC4xLDAuMS0wLjFsMTcuNS' +
            '0xMi42YzAuNy0wLjUsMS42LTAuMywyLjEsMC40bDEuNCwxLjkNCgkJCUMtMTM1LjksMzcxLjItMTM2LjEsMzcyLjEtMTM2LjgsMzcyLjZ6Ii8+DQoJPC9nPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KCTxnPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTEzNi40LDM3MC41bC0xLjQtMS45Yy0wLjUtMC43LTEuNS0wLjgtMi4xLTAuNGwtMTcuNSwxMi42Yy0wLjEsMC0wLjEsMC4xLTAuMSwwLjFsLTAuNi0wLjhsLTMuMy00LjYNCgkJCWMtMC4yLTAuMy0wLjQtMC40LTAuOS0wLjNjLTAuNCwwLTAuNywwLjMtMC44LDAuNmwtNS4yLDE1LjRjLTAuMSwwLjMtMC4xLDAuNiwwLjEsMC44YzAu' +
            'MiwwLjMsMC40LDAuNCwwLjgsMC40bDE2LjItMC4xDQoJCQljMC40LDAsMC43LTAuMSwwLjgtMC41YzAuMi0wLjQsMC4yLTAuNi0wLjEtMC45bC0zLjMtNC43bC0wLjctMC45YzAuMSwwLDAuMS0wLjEsMC4yLTAuMWwxNy41LTEyLjYNCgkJCUMtMTM2LjEsMzcyLjEtMTM1LjksMzcxLjItMTM2LjQsMzcwLjV6Ii8+DQoJCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTcyLjgsMzkxLjZoLTM0LjVjLTIuMywwLTQuMiwxLjktNC4yLDQuMnYyNC41YzAsMi4zLDEuOSw0LjIsNC4yLDQuMmgzNC41YzIuMywwLDQuMi0xLjksNC4yLTQuMnYtMjQuNQ0KCQkJQy0xNjguNiwzOTMuNS0xNzAuNSwzOTEuNi' +
            '0xNzIuOCwzOTEuNnogTS0xNzQsNDE5LjJoLTMyLjFWMzk3aDMyLjFWNDE5LjJ6Ii8+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo=';
        me._fullscreen_off__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;fullscreen_off;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._fullscreen_off__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8Zz4NCgkJPHJlY3QgeD0iLTIwOS42IiB5PSIzOTciIGZpbGw9IiMwMDAwMDAiIHdpZHRoPSIzNS43IiBoZWlnaHQ9IjI0LjYiLz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xNzUsMzM0LjZjLTM0LjQsMC02Mi40LDI3LjktNjIuNCw2Mi40YzAsMzQuNCwyNy45LDYyLjQsNjIuNCw2Mi40YzM0LjQsMCw2Mi40LTI3LjksNjIuNC02Mi40DQoJCQlDLTExMi42LDM2Mi42LTE0MC42LDMzNC42LTE3NSwzMzQuNnogTS0xNjcuOSw0MjIuOWMwLDIuNi0yLjEsNC43LTQuNyw0LjdoLTM4LjNjLTIuNiwwLTQuNy0yLjEtNC43LTQuN3YtMjcuMg0KCQkJYzAtMi42' +
            'LDIuMS00LjcsNC43LTQuN2gzOC4zYzIuNiwwLDQuNywyLjEsNC43LDQuN0wtMTY3LjksNDIyLjlMLTE2Ny45LDQyMi45eiBNLTEzMi41LDM2OS45bC0xOS41LDE0Yy0wLjEsMC0wLjEsMC4xLTAuMiwwLjENCgkJCWwwLjcsMWwzLjcsNS4yYzAuMiwwLjMsMC4yLDAuNiwwLjEsMWMtMC4yLDAuNC0wLjUsMC42LTAuOSwwLjZsLTE4LDAuMWMtMC40LDAtMC43LTAuMS0wLjktMC40Yy0wLjItMC4zLTAuMi0wLjUtMC4xLTAuOQ0KCQkJbDUuOC0xNy4xYzAuMS0wLjQsMC40LTAuNywwLjgtMC43YzAuNSwwLDAuNywwLjEsMSwwLjRsMy42LDUuMWwwLjcsMC45YzAuMSwwLDAuMS0wLjEsMC4yLTAuMWwxOS' +
            '41LTE0YzAuOC0wLjUsMS44LTAuNCwyLjQsMC40DQoJCQlsMS41LDIuMUMtMTMxLjYsMzY4LjMtMTMxLjgsMzY5LjQtMTMyLjUsMzY5Ljl6Ii8+DQoJPC9nPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KCTxnPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTEzMi4xLDM2Ny41bC0xLjUtMi4xYy0wLjUtMC44LTEuNi0wLjktMi40LTAuNGwtMTkuNSwxNGMtMC4xLDAtMC4xLDAuMS0wLjIsMC4xbC0wLjctMC45bC0zLjYtNS4xDQoJCQljLTAuMi0wLjMtMC41LTAuNC0xLTAuNGMtMC41LDAtMC43LDAuMy0wLjgsMC43bC01LjgsMTcuMWMtMC4xLDAuNC0wLjEsMC43LDAuMSwwLjljMC4yLDAu' +
            'MywwLjUsMC40LDAuOSwwLjRsMTgtMC4xDQoJCQljMC40LDAsMC44LTAuMiwwLjktMC42YzAuMi0wLjQsMC4yLTAuNy0wLjEtMWwtMy43LTUuMmwtMC43LTFjMC4xLDAsMC4xLTAuMSwwLjItMC4xbDE5LjUtMTQNCgkJCUMtMTMxLjgsMzY5LjQtMTMxLjYsMzY4LjMtMTMyLjEsMzY3LjV6Ii8+DQoJCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTcyLjYsMzkxaC0zOC4zYy0yLjYsMC00LjcsMi4xLTQuNyw0Ljd2MjcuMmMwLDIuNiwyLjEsNC43LDQuNyw0LjdoMzguM2MyLjYsMCw0LjctMi4xLDQuNy00Ljd2LTI3LjINCgkJCUMtMTY3LjksMzkzLjEtMTcwLDM5MS0xNzIuNiwzOTF6IE0tMTczLj' +
            'ksNDIxLjZoLTM1LjdWMzk3aDM1LjdWNDIxLjZ6Ii8+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo=';
        me._fullscreen_off__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;fullscreen_off;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "fullscreen_off";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 32px;';
        hs += 'left : 0px;';
        hs += 'opacity : 0;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : hidden;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._fullscreen_off.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._fullscreen_off.logicBlock_alpha = function () {
            var newLogicStateAlpha;
            if (
                (player.getIsFullscreen() == true)
            ) {
                newLogicStateAlpha = 0;
            } else {
                newLogicStateAlpha = -1;
            }
            if (me._fullscreen_off.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
                me._fullscreen_off.ggCurrentLogicStateAlpha = newLogicStateAlpha;
                me._fullscreen_off.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._fullscreen_off.ggCurrentLogicStateAlpha == 0) {
                    me._fullscreen_off.style.visibility = me._fullscreen_off.ggVisible ? 'inherit' : 'hidden';
                    me._fullscreen_off.style.opacity = 1;
                } else {
                    me._fullscreen_off.style.visibility = "hidden";
                    me._fullscreen_off.style.opacity = 0;
                }
            }
        }
        me._fullscreen_off.onmouseover = function (e) {
            me._fullscreen_off__img.style.visibility = 'hidden';
            me._fullscreen_off__imgo.style.visibility = 'inherit';
        }
        me._fullscreen_off.onmouseout = function (e) {
            me._fullscreen_off__img.style.visibility = 'inherit';
            me._fullscreen_off__imgo.style.visibility = 'hidden';
        }
        me._fullscreen_off.ggUpdatePosition = function (useTransition) {
        }
        me._fullscreen_buttons.appendChild(me._fullscreen_off);
        me._controller_slider.appendChild(me._fullscreen_buttons);
        el = me._gyro = document.createElement('div');
        el.ggId = "gyro";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_container ";
        el.ggType = 'container';
        hs = '';
        hs += 'height : 32px;';
        hs += 'left : 192px;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : hidden;';
        hs += 'width : 32px;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._gyro.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._gyro.logicBlock_position = function () {
            var newLogicStatePosition;
            if (
                (player.getVariableValue('pos_gyro') == 0)
            ) {
                newLogicStatePosition = 0;
            } else if (
                (player.getVariableValue('pos_gyro') == 1)
            ) {
                newLogicStatePosition = 1;
            } else if (
                (player.getVariableValue('pos_gyro') == 2)
            ) {
                newLogicStatePosition = 2;
            } else if (
                (player.getVariableValue('pos_gyro') == 3)
            ) {
                newLogicStatePosition = 3;
            } else if (
                (player.getVariableValue('pos_gyro') == 4)
            ) {
                newLogicStatePosition = 4;
            } else if (
                (player.getVariableValue('pos_gyro') == 5)
            ) {
                newLogicStatePosition = 5;
            } else if (
                (player.getVariableValue('pos_gyro') == 6)
            ) {
                newLogicStatePosition = 6;
            } else {
                newLogicStatePosition = -1;
            }
            if (me._gyro.ggCurrentLogicStatePosition != newLogicStatePosition) {
                me._gyro.ggCurrentLogicStatePosition = newLogicStatePosition;
                me._gyro.style[domTransition] = 'left 0s, top 0s';
                if (me._gyro.ggCurrentLogicStatePosition == 0) {
                    me._gyro.style.left = '0px';
                    me._gyro.style.top = '0px';
                } else if (me._gyro.ggCurrentLogicStatePosition == 1) {
                    me._gyro.style.left = '32px';
                    me._gyro.style.top = '0px';
                } else if (me._gyro.ggCurrentLogicStatePosition == 2) {
                    me._gyro.style.left = '64px';
                    me._gyro.style.top = '0px';
                } else if (me._gyro.ggCurrentLogicStatePosition == 3) {
                    me._gyro.style.left = '96px';
                    me._gyro.style.top = '0px';
                } else if (me._gyro.ggCurrentLogicStatePosition == 4) {
                    me._gyro.style.left = '128px';
                    me._gyro.style.top = '0px';
                } else if (me._gyro.ggCurrentLogicStatePosition == 5) {
                    me._gyro.style.left = '160px';
                    me._gyro.style.top = '0px';
                } else if (me._gyro.ggCurrentLogicStatePosition == 6) {
                    me._gyro.style.left = '192px';
                    me._gyro.style.top = '0px';
                } else {
                    me._gyro.style.left = '192px';
                    me._gyro.style.top = '0px';
                }
            }
        }
        me._gyro.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('opt_gyro') == true) &&
                (player.getIsMobile() == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._gyro.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._gyro.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._gyro.style[domTransition] = 'left 0s, top 0s';
                if (me._gyro.ggCurrentLogicStateVisible == 0) {
                    me._gyro.style.visibility = (Number(me._gyro.style.opacity) > 0 || !me._gyro.style.opacity) ? 'inherit' : 'hidden';
                    me._gyro.ggVisible = true;
                } else {
                    me._gyro.style.visibility = "hidden";
                    me._gyro.ggVisible = false;
                }
            }
        }
        me._gyro.onclick = function (e) {
            player.stopAutorotate();
            player.setUseGyro(!(player.getUseGyro()));
        }
        me._gyro.ggUpdatePosition = function (useTransition) {
        }
        el = me._gyro_on = document.createElement('div');
        els = me._gyro_on__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4wLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxMzAgMTMwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMzAgMTMwOyIgeG1sOnNwYW' +
            'NlPSJwcmVzZXJ2ZSI+DQo8ZyBpZD0iTGF5ZXJfMV8xXyI+DQo8L2c+DQo8ZyBpZD0iTGF5ZXJfMl8xXyI+DQoJPGc+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0xMDMuNSw1OS40Yy0xLjktMS45LTQuOS0zLjgtOC42LTUuNGMtNC4xLTEuOC05LjItMy4yLTE0LjktNC4xYzEuMiwzLjYsMi4zLDcuNSwzLjEsMTEuNmMxLjEsNS42LDEuNiwxMSwxLjcsMTUuOQ0KCQkJYy0wLjUsMC4xLTAuOSwwLjItMS40LDAuM2MtMSwwLjItMiwwLjQtMy4xLDAuNmMwLTAuMSwwLTAuMywwLTAuNGMwLTQuOC0wLjUtMTAuMS0xLjYtMTUuNWMtMC45LTQuNy0yLjItOS4xLTMuNy0xMy4xDQoJCQljLTMuMi0w' +
            'LjMtNi41LTAuNS0xMC0wLjVsLTAuOS00LjVjMC4zLDAsMC42LDAsMC45LDBjMi43LDAsNS40LDAuMSw4LDAuM2MtMi4xLTQuNC00LjQtOC4xLTYuOC0xMC42Yy0xLjctMS44LTMuNC0zLTQuOC0zLjYNCgkJCWMtMC43LTAuMy0xLjMtMC40LTEuOS0wLjVsNi45LDM0LjlsMi45LDE0LjdjLTAuOSwwLTEuOCwwLjEtMi43LDAuMWwtMi44LTE0LjJsLTYuOS0zNC45Yy0wLjYsMC4zLTEuMiwwLjctMS44LDEuNA0KCQkJYy0xLDEtMS45LDIuNi0yLjcsNC41Yy0xLjYsMy45LTIuNSw5LjUtMi41LDE1LjljMCw0LjgsMC41LDEwLjEsMS42LDE1LjVsMCwwYzAuOSw0LjcsMi4yLDkuMSwzLjcsMTMuMWMzLj' +
            'IsMC4zLDYuNSwwLjUsMTAsMC41DQoJCQljNy43LDAsMTQuOS0wLjksMjEuMS0yLjRjNi4yLTEuNSwxMS4zLTMuNywxNC44LTYuMWMyLjMtMS42LDMuOS0zLjQsNC43LTVjMC40LTAuOSwwLjctMS44LDAuNy0yLjhjMC0wLjktMC4yLTEuOC0wLjctMi44DQoJCQlDMTA1LjEsNjEuMywxMDQuNCw2MC4zLDEwMy41LDU5LjR6IE01MS42LDQ5LjZjMC4xLTEuNiwwLjItMy4xLDAuNC00LjZjMS45LTAuMiwzLjgtMC40LDUuOC0wLjZsMC45LDQuNQ0KCQkJQzU2LjIsNDkuMSw1My44LDQ5LjMsNTEuNiw0OS42eiIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNNjUsOC45QzM0LDguOSw4LjksMzQs' +
            'OC45LDY1YzAsMzEsMjUuMSw1Ni4xLDU2LjEsNTYuMWMzMSwwLDU2LjEtMjUuMSw1Ni4xLTU2LjFDMTIxLjEsMzQsOTYsOC45LDY1LDguOXogTTEwNi43LDczLjgNCgkJCWMtMi41LDIuNS01LjksNC42LTEwLDYuNGMtOC4yLDMuNS0xOS40LDUuNi0zMS42LDUuNmMtMi43LDAtNS40LTAuMS04LTAuM2MyLjEsNC40LDQuNCw4LjEsNi44LDEwLjZjMS43LDEuOCwzLjQsMyw0LjgsMy42DQoJCQljMC43LDAuMywxLjQsMC40LDIsMC41bC0yLjUtMTIuNmMwLjksMCwxLjgtMC4xLDIuNy0wLjFsMi40LDEyLjJjMC42LTAuMywxLjItMC43LDEuOC0xLjNjMS0xLDEuOS0yLjYsMi43LTQuNQ0KCQkJYzAuOC' +
            '0yLDEuNC00LjQsMS45LTcuMmMxLTAuMSwyLTAuMywzLTAuNWMwLjYtMC4xLDEuMS0wLjIsMS42LTAuM2MtMC4zLDIuMS0wLjYsNC4xLTEuMSw1LjljLTEuMSw0LTIuNiw3LjMtNC45LDkuNw0KCQkJYy0xLjUsMS42LTMuNCwyLjctNS41LDMuMWwwLDBjLTAuNiwwLjEtMS4yLDAuMi0xLjgsMC4yYy0xLjQsMC0yLjgtMC4zLTQuMS0wLjhjLTEuMy0wLjUtMi42LTEuMy0zLjgtMi4zDQoJCQljLTIuNC0xLjktNC43LTQuNS02LjctNy44Yy0xLjctMi42LTMuMi01LjYtNC42LTguOWMtMy4yLTAuNC02LjItMS05LTEuN2MtNi42LTEuNi0xMi4yLTMuOS0xNi4zLTYuOGMtMi44LTEuOS00LjktNC4yLTYu' +
            'Mi02LjcNCgkJCWMtMC43LTEuNS0xLjEtMy4xLTEuMS00LjdjMC0xLjYsMC40LTMuMiwxLjEtNC43YzAuNy0xLjUsMS43LTIuOCwzLTQuMWMyLjUtMi41LDUuOS00LjYsMTAtNi40YzMuMS0xLjMsNi41LTIuNCwxMC4zLTMuMw0KCQkJYy0wLjEsMS41LTAuMiwzLjEtMC4yLDQuN2MtNiwxLjUtMTEsMy42LTE0LjQsNmMtMi4zLDEuNi0zLjksMy40LTQuNyw1Yy0wLjQsMC45LTAuNywxLjgtMC43LDIuOGgwYzAsMC45LDAuMiwxLjgsMC43LDIuOA0KCQkJYzAuNSwwLjksMS4xLDEuOSwyLjEsMi45YzEuOSwxLjksNC45LDMuOCw4LjYsNS40YzQuMSwxLjgsOS4yLDMuMiwxNC45LDQuMWMtMS4yLTMuNi' +
            '0yLjMtNy41LTMuMS0xMS42DQoJCQljLTEuMS01LjctMS43LTExLjMtMS43LTE2LjRjMC01LjEsMC41LTkuOCwxLjYtMTMuOGMxLjEtNCwyLjYtNy4zLDQuOS05LjdjMS41LTEuNiwzLjQtMi43LDUuNS0zLjF2MGMwLjYtMC4xLDEuMi0wLjIsMS44LTAuMg0KCQkJYzEuNCwwLDIuOCwwLjMsNC4xLDAuOGMxLjMsMC41LDIuNiwxLjMsMy44LDIuM2MyLjQsMS45LDQuNyw0LjUsNi43LDcuOGMxLjcsMi42LDMuMiw1LjYsNC42LDguOWMzLjIsMC40LDYuMiwxLDksMS43DQoJCQljNi42LDEuNiwxMi4yLDMuOSwxNi4zLDYuOGMyLjgsMS45LDQuOSw0LjIsNi4xLDYuN2MwLjcsMS41LDEuMSwzLjEsMS4x' +
            'LDQuN2MwLDEuNi0wLjQsMy4yLTEuMSw0LjcNCgkJCUMxMDguOSw3MS4yLDEwNy45LDcyLjYsMTA2LjcsNzMuOHoiLz4NCgk8L2c+DQoJPGc+DQoJCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik01Miw0NWMtMC4yLDEuNC0wLjMsMy0wLjQsNC42YzIuMy0wLjMsNC42LTAuNiw3LTAuN2wtMC45LTQuNUM1NS44LDQ0LjYsNTMuOCw0NC44LDUyLDQ1eiIvPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTA5LjYsNjAuM2MtMS4yLTIuNi0zLjQtNC44LTYuMS02LjdjLTQuMS0yLjktOS43LTUuMi0xNi4zLTYuOGMtMi44LTAuNy01LjktMS4yLTktMS43DQoJCQljLTEuNC0zLjMtMi45LTYuMy00Lj' +
            'YtOC45Yy0yLjEtMy4yLTQuMy01LjktNi43LTcuOGMtMS4yLTEtMi41LTEuNy0zLjgtMi4zYy0xLjMtMC41LTIuNy0wLjgtNC4xLTAuOGMtMC42LDAtMS4yLDAuMS0xLjgsMC4ydjANCgkJCWMtMi4xLDAuNC00LDEuNi01LjUsMy4xYy0yLjMsMi40LTMuOCw1LjctNC45LDkuN2MtMS4xLDQtMS42LDguNy0xLjYsMTMuOGMwLDUuMSwwLjUsMTAuNywxLjcsMTYuNGMwLjgsNC4xLDEuOSw4LDMuMSwxMS42DQoJCQljLTUuNy0wLjktMTAuOC0yLjMtMTQuOS00LjFjLTMuNy0xLjYtNi43LTMuNS04LjYtNS40Yy0xLTEtMS43LTEuOS0yLjEtMi45Yy0wLjQtMC45LTAuNy0xLjgtMC43LTIuOGgwYzAtMC45' +
            'LDAuMi0xLjgsMC43LTIuOA0KCQkJYzAuOC0xLjYsMi4zLTMuNCw0LjctNWMzLjQtMi40LDguNC00LjUsMTQuNC02YzAtMS42LDAuMS0zLjIsMC4yLTQuN2MtMy44LDAuOS03LjIsMi0xMC4zLDMuM2MtNC4xLDEuOC03LjUsMy45LTEwLDYuNA0KCQkJYy0xLjIsMS4zLTIuMywyLjYtMyw0LjFjLTAuNywxLjUtMS4xLDMuMS0xLjEsNC43YzAsMS42LDAuNCwzLjIsMS4xLDQuN2MxLjIsMi42LDMuNCw0LjgsNi4yLDYuN2M0LjEsMi45LDkuNyw1LjIsMTYuMyw2LjgNCgkJCWMyLjgsMC43LDUuOSwxLjMsOSwxLjdjMS40LDMuMywyLjksNi4zLDQuNiw4LjljMi4xLDMuMiw0LjMsNS45LDYuNyw3LjhjMS' +
            '4yLDEsMi41LDEuNywzLjgsMi4zYzEuMywwLjUsMi43LDAuOCw0LjEsMC44DQoJCQljMC42LDAsMS4yLTAuMSwxLjgtMC4ybDAsMGMyLjEtMC40LDQtMS42LDUuNS0zLjFjMi4zLTIuNCwzLjgtNS43LDQuOS05LjdjMC41LTEuOCwwLjktMy44LDEuMS01LjljLTAuNSwwLjEtMS4xLDAuMi0xLjYsMC4zDQoJCQljLTEsMC4yLTIsMC4zLTMsMC41Yy0wLjQsMi43LTEuMSw1LjItMS45LDcuMmMtMC44LDItMS43LDMuNS0yLjcsNC41Yy0wLjYsMC42LTEuMiwxLTEuOCwxLjNsLTIuNC0xMi4yYy0wLjksMC0xLjgsMC4xLTIuNywwLjENCgkJCWwyLjUsMTIuNmMtMC42LDAtMS4zLTAuMi0yLTAuNWMtMS41' +
            'LTAuNi0zLjItMS44LTQuOC0zLjZjLTIuNC0yLjUtNC43LTYuMS02LjgtMTAuNmMyLjYsMC4yLDUuMywwLjMsOCwwLjMNCgkJCWMxMi4zLDAsMjMuNC0yLjEsMzEuNi01LjZjNC4xLTEuOCw3LjUtMy45LDEwLTYuNGMxLjItMS4zLDIuMy0yLjYsMy00LjFjMC43LTEuNSwxLjEtMy4xLDEuMS00LjcNCgkJCUMxMTAuOCw2My40LDExMC40LDYxLjgsMTA5LjYsNjAuM3ogTTEwNS42LDY3LjhjLTAuOCwxLjYtMi4zLDMuNC00LjcsNWMtMy41LDIuNS04LjYsNC42LTE0LjgsNi4xYy02LjIsMS41LTEzLjQsMi40LTIxLjEsMi40DQoJCQljLTMuNCwwLTYuOC0wLjItMTAtMC41Yy0xLjUtNC0yLjgtOC40LT' +
            'MuNy0xMy4xbDAsMGMtMS4xLTUuNS0xLjYtMTAuNy0xLjYtMTUuNWMwLTYuNCwwLjktMTIsMi41LTE1LjljMC44LTIsMS43LTMuNSwyLjctNC41DQoJCQljMC42LTAuNiwxLjItMS4xLDEuOC0xLjRsNi45LDM0LjlsMi44LDE0LjJjMC45LDAsMS44LDAsMi43LTAuMWwtMi45LTE0LjdsLTYuOS0zNC45YzAuNiwwLDEuMywwLjIsMS45LDAuNQ0KCQkJYzEuNSwwLjYsMy4yLDEuOCw0LjgsMy42YzIuNCwyLjUsNC43LDYuMSw2LjgsMTAuNmMtMi42LTAuMi01LjMtMC4zLTgtMC4zYy0wLjMsMC0wLjYsMC0wLjksMGwwLjksNC41YzMuNCwwLDYuOCwwLjIsMTAsMC41DQoJCQljMS41LDQsMi44LDguNCwz' +
            'LjcsMTMuMWMxLjEsNS41LDEuNiwxMC43LDEuNiwxNS41YzAsMC4yLDAsMC4zLDAsMC40YzEuMS0wLjIsMi4xLTAuNCwzLjEtMC42YzAuNS0wLjEsMC45LTAuMiwxLjQtMC4zDQoJCQljMC01LTAuNi0xMC40LTEuNy0xNS45Yy0wLjgtNC4xLTEuOS04LTMuMS0xMS42YzUuNywwLjksMTAuNywyLjMsMTQuOSw0LjFjMy43LDEuNiw2LjcsMy41LDguNiw1LjRjMSwxLDEuNywxLjksMi4xLDIuOQ0KCQkJYzAuNCwwLjksMC43LDEuOCwwLjcsMi44QzEwNi4yLDY1LjksMTA2LDY2LjgsMTA1LjYsNjcuOHoiLz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==';
        me._gyro_on__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;gyro_on;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._gyro_on__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4wLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxMzAgMTMwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMzAgMTMwOyIgeG1sOnNwYW' +
            'NlPSJwcmVzZXJ2ZSI+DQo8ZyBpZD0iTGF5ZXJfMV8xXyI+DQo8L2c+DQo8ZyBpZD0iTGF5ZXJfMl8xXyI+DQoJPGc+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0xMDcuOCw1OC43Yy0yLjEtMi4xLTUuNC00LjItOS42LTZjLTQuNi0yLTEwLjItMy41LTE2LjUtNC41YzEuNCw0LDIuNSw4LjMsMy40LDEyLjhjMS4yLDYuMiwxLjgsMTIuMiwxLjksMTcuNw0KCQkJYy0wLjUsMC4xLTEsMC4yLTEuNiwwLjNjLTEuMSwwLjItMi4zLDAuNC0zLjQsMC42YzAtMC4yLDAtMC4zLDAtMC41YzAtNS4zLTAuNi0xMS4yLTEuOC0xNy4zYy0xLTUuMi0yLjQtMTAuMS00LjEtMTQuNQ0KCQkJYy0zLjYtMC40' +
            'LTcuMy0wLjYtMTEuMS0wLjZsLTEtNWMwLjMsMCwwLjcsMCwxLDBjMywwLDYsMC4xLDguOSwwLjRjLTIuMy00LjktNC45LTktNy41LTExLjdjLTEuOS0yLTMuNy0zLjMtNS40LTQNCgkJCWMtMC44LTAuMy0xLjUtMC41LTIuMi0wLjVsNy43LDM4LjhMNjkuNyw4MWMtMSwwLTIsMC4xLTMsMC4xbC0zLjEtMTUuOGwtNy43LTM4LjdjLTAuNywwLjMtMS4zLDAuOC0yLDEuNWMtMS4xLDEuMi0yLjIsMi45LTMsNQ0KCQkJQzQ5LjEsMzcuNSw0OCw0My42LDQ4LDUwLjhjMCw1LjMsMC42LDExLjIsMS44LDE3LjJsMCwwYzEsNS4yLDIuNCwxMC4xLDQuMSwxNC41YzMuNiwwLjQsNy4zLDAuNiwxMS4xLDAuNm' +
            'M4LjYsMCwxNi42LTEsMjMuNS0yLjcNCgkJCWM2LjktMS43LDEyLjYtNC4xLDE2LjQtNi44YzIuNi0xLjgsNC4zLTMuNyw1LjItNS42YzAuNS0xLDAuNy0yLDAuNy0zLjFjMC0xLTAuMi0yLTAuNy0zLjFDMTA5LjYsNjAuOSwxMDguOCw1OS44LDEwNy44LDU4Ljd6DQoJCQkgTTUwLjEsNDcuOWMwLjEtMS44LDAuMi0zLjUsMC40LTUuMWMyLjEtMC4zLDQuMi0wLjUsNi40LTAuNmwxLDQuOUM1NS4yLDQ3LjMsNTIuNiw0Ny42LDUwLjEsNDcuOXoiLz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTTY1LDIuNkMzMC42LDIuNiwyLjYsMzAuNiwyLjYsNjVjMCwzNC40LDI3LjksNjIuNCw2Mi40LDYy' +
            'LjRjMzQuNCwwLDYyLjQtMjcuOSw2Mi40LTYyLjRDMTI3LjQsMzAuNiw5OS40LDIuNiw2NSwyLjZ6DQoJCQkgTTExMS4zLDc0LjhjLTIuOCwyLjgtNi42LDUuMS0xMS4yLDcuMUM5MSw4NS44LDc4LjYsODguMSw2NSw4OC4xYy0zLDAtNi0wLjEtOC45LTAuM2MyLjMsNC45LDQuOSw5LDcuNSwxMS43DQoJCQljMS45LDIsMy43LDMuMyw1LjQsNGMwLjgsMC4zLDEuNSwwLjUsMi4yLDAuNWwtMi44LTE0YzEsMCwyLTAuMSwzLTAuMWwyLjcsMTMuNWMwLjctMC4zLDEuMy0wLjgsMi0xLjVjMS4xLTEuMiwyLjItMi45LDMtNQ0KCQkJYzAuOS0yLjIsMS42LTQuOSwyLjEtOGMxLjEtMC4yLDIuMy0wLjMsMy' +
            '4zLTAuNWMwLjYtMC4xLDEuMi0wLjIsMS44LTAuNGMtMC4zLDIuMy0wLjcsNC41LTEuMiw2LjVjLTEuMiw0LjQtMi45LDguMS01LjQsMTAuOA0KCQkJYy0xLjcsMS44LTMuNywzLTYuMSwzLjVsMCwwYy0wLjcsMC4xLTEuMywwLjItMiwwLjJjLTEuNSwwLTMuMS0wLjMtNC41LTAuOWMtMS41LTAuNi0yLjktMS40LTQuMi0yLjVjLTIuNy0yLjEtNS4yLTUtNy41LTguNg0KCQkJYy0xLjgtMi45LTMuNi02LjItNS4xLTkuOWMtMy41LTAuNS02LjktMS4xLTEwLTEuOUMzMyw4My41LDI2LjgsODEsMjIuMiw3Ny43Yy0zLjEtMi4yLTUuNC00LjYtNi44LTcuNWMtMC44LTEuNi0xLjItMy40LTEuMi01LjIN' +
            'CgkJCWMwLTEuOCwwLjQtMy42LDEuMi01LjJjMC44LTEuNiwxLjktMy4yLDMuMy00LjVjMi44LTIuOCw2LjYtNS4xLDExLjItNy4xYzMuNC0xLjUsNy4zLTIuNywxMS41LTMuN2MtMC4xLDEuNy0wLjIsMy40LTAuMyw1LjINCgkJCWMtNi42LDEuNy0xMi4yLDQtMTYsNi43Yy0yLjYsMS44LTQuMywzLjctNS4yLDUuNmMtMC41LDEtMC43LDItMC43LDMuMWgwYzAsMSwwLjIsMiwwLjcsMy4xYzAuNSwxLDEuMywyLjEsMi4zLDMuMg0KCQkJYzIuMSwyLjEsNS40LDQuMiw5LjYsNmM0LjYsMiwxMC4yLDMuNSwxNi41LDQuNWMtMS40LTQtMi41LTguMy0zLjQtMTIuOEM0My42LDYyLjYsNDMsNTYuNCw0My' +
            'w1MC44YzAtNS43LDAuNi0xMC45LDEuOC0xNS4zDQoJCQljMS4yLTQuNCwyLjktOC4xLDUuNC0xMC44YzEuNy0xLjgsMy43LTMsNi4xLTMuNXYwYzAuNy0wLjEsMS4zLTAuMiwyLTAuMmMxLjUsMCwzLjEsMC4zLDQuNSwwLjljMS41LDAuNiwyLjksMS40LDQuMiwyLjUNCgkJCWMyLjcsMi4xLDUuMiw1LDcuNSw4LjZjMS44LDIuOSwzLjYsNi4yLDUuMSw5LjljMy41LDAuNSw2LjksMS4xLDEwLDEuOWM3LjMsMS44LDEzLjUsNC40LDE4LjEsNy42YzMuMSwyLjIsNS40LDQuNiw2LjgsNy41DQoJCQljMC44LDEuNiwxLjIsMy40LDEuMiw1LjJjMCwxLjgtMC40LDMuNi0xLjIsNS4yQzExMy44LDcxLjks' +
            'MTEyLjcsNzMuNCwxMTEuMyw3NC44eiIvPg0KCTwvZz4NCgk8Zz4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTUwLjUsNDIuOGMtMC4yLDEuNi0wLjQsMy4zLTAuNCw1LjFjMi41LTAuNCw1LjEtMC42LDcuOC0wLjhsLTEtNC45QzU0LjcsNDIuMyw1Mi42LDQyLjUsNTAuNSw0Mi44eiIvPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTE0LjYsNTkuOGMtMS40LTIuOS0zLjgtNS4zLTYuOC03LjVjLTQuNi0zLjItMTAuOC01LjgtMTguMS03LjZjLTMuMS0wLjgtNi41LTEuNC0xMC0xLjkNCgkJCWMtMS41LTMuNy0zLjMtNy01LjEtOS45Yy0yLjMtMy42LTQuOC02LjUtNy41LTguNmMtMS' +
            '4zLTEuMS0yLjctMS45LTQuMi0yLjVjLTEuNS0wLjYtMy0wLjktNC41LTAuOWMtMC43LDAtMS40LDAuMS0yLDAuMnYwDQoJCQljLTIuNCwwLjUtNC40LDEuNy02LjEsMy41Yy0yLjUsMi43LTQuMiw2LjQtNS40LDEwLjhjLTEuMiw0LjQtMS44LDkuNi0xLjgsMTUuM2MwLDUuNywwLjYsMTEuOCwxLjksMTguMg0KCQkJYzAuOSw0LjUsMi4xLDguOCwzLjQsMTIuOGMtNi4zLTEtMTEuOS0yLjYtMTYuNS00LjVjLTQuMi0xLjgtNy40LTMuOS05LjYtNmMtMS4xLTEuMS0xLjgtMi4xLTIuMy0zLjJjLTAuNS0xLTAuNy0yLTAuNy0zLjFoMA0KCQkJYzAtMSwwLjItMiwwLjctMy4xYzAuOS0xLjgsMi42LTMu' +
            'OCw1LjItNS42YzMuOC0yLjcsOS4zLTUsMTUuOS02LjdjMC0xLjgsMC4xLTMuNSwwLjMtNS4yYy00LjIsMS04LDIuMi0xMS41LDMuNw0KCQkJYy00LjYsMi04LjQsNC4zLTExLjIsNy4xYy0xLjQsMS40LTIuNSwyLjktMy4zLDQuNWMtMC44LDEuNi0xLjIsMy40LTEuMiw1LjJjMCwxLjgsMC40LDMuNiwxLjIsNS4yYzEuNCwyLjksMy44LDUuMyw2LjgsNy41DQoJCQljNC42LDMuMiwxMC44LDUuOCwxOC4xLDcuNmMzLjEsMC44LDYuNSwxLjQsMTAsMS45YzEuNSwzLjcsMy4zLDcsNS4xLDkuOWMyLjMsMy42LDQuOCw2LjUsNy41LDguNmMxLjMsMS4xLDIuNywxLjksNC4yLDIuNQ0KCQkJYzEuNSwwLj' +
            'YsMywwLjksNC41LDAuOWMwLjcsMCwxLjMtMC4xLDItMC4ybDAsMGMyLjQtMC41LDQuNC0xLjcsNi4xLTMuNWMyLjUtMi43LDQuMi02LjQsNS40LTEwLjhjMC41LTIsMC45LTQuMiwxLjItNi41DQoJCQljLTAuNiwwLjEtMS4yLDAuMy0xLjgsMC40Yy0xLjEsMC4yLTIuMiwwLjQtMy4zLDAuNWMtMC41LDMtMS4yLDUuNy0yLjEsOGMtMC45LDIuMi0xLjksMy45LTMsNWMtMC42LDAuNy0xLjMsMS4yLTIsMS41bC0yLjctMTMuNQ0KCQkJYy0xLDAuMS0yLDAuMS0zLDAuMWwyLjgsMTRjLTAuNy0wLjEtMS40LTAuMi0yLjItMC41Yy0xLjctMC43LTMuNS0yLTUuNC00Yy0yLjYtMi44LTUuMi02LjgtNy41' +
            'LTExLjdDNTksODgsNjIsODguMSw2NSw4OC4xDQoJCQljMTMuNiwwLDI2LTIuMywzNS4yLTYuMmM0LjYtMiw4LjQtNC4zLDExLjItNy4xYzEuNC0xLjQsMi41LTIuOSwzLjMtNC41YzAuOC0xLjYsMS4yLTMuNCwxLjItNS4yDQoJCQlDMTE1LjgsNjMuMiwxMTUuNCw2MS40LDExNC42LDU5Ljh6IE0xMTAuMSw2OC4xYy0wLjksMS44LTIuNiwzLjgtNS4yLDUuNmMtMy45LDIuNy05LjYsNS4xLTE2LjQsNi44Yy02LjksMS43LTE0LjksMi43LTIzLjUsMi43DQoJCQljLTMuOCwwLTcuNS0wLjItMTEuMS0wLjZjLTEuNy00LjQtMy4xLTkuMy00LjEtMTQuNWwwLDBDNDguNiw2MS45LDQ4LDU2LjEsNDgsNT' +
            'AuOGMwLTcuMSwxLTEzLjMsMi44LTE3LjdjMC45LTIuMiwxLjktMy45LDMtNQ0KCQkJYzAuNy0wLjcsMS4zLTEuMiwyLTEuNWw3LjcsMzguN2wzLjEsMTUuOGMxLDAsMiwwLDMtMC4xbC0zLjItMTYuM0w1OC44LDI2YzAuNywwLjEsMS40LDAuMiwyLjIsMC41YzEuNiwwLjcsMy41LDIsNS40LDQNCgkJCWMyLjYsMi44LDUuMiw2LjgsNy41LDExLjdDNzEsNDIsNjgsNDEuOSw2NSw0MS45Yy0wLjMsMC0wLjcsMC0xLDBsMSw1YzMuOCwwLDcuNSwwLjIsMTEuMSwwLjZjMS43LDQuNCwzLjEsOS4zLDQuMSwxNC41DQoJCQljMS4yLDYuMSwxLjgsMTEuOSwxLjgsMTcuM2MwLDAuMiwwLDAuMywwLDAuNWMx' +
            'LjItMC4yLDIuMy0wLjQsMy40LTAuNmMwLjUtMC4xLDEtMC4yLDEuNi0wLjNjMC01LjUtMC42LTExLjUtMS45LTE3LjcNCgkJCWMtMC45LTQuNS0yLjEtOC44LTMuNC0xMi44YzYuMywxLDExLjksMi42LDE2LjUsNC41YzQuMiwxLjgsNy40LDMuOSw5LjYsNmMxLjEsMS4xLDEuOCwyLjEsMi4zLDMuMmMwLjUsMSwwLjcsMiwwLjcsMy4xDQoJCQlDMTEwLjgsNjYsMTEwLjYsNjcsMTEwLjEsNjguMXoiLz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==';
        me._gyro_on__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;gyro_on;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "gyro_on";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 32px;';
        hs += 'left : 0px;';
        hs += 'opacity : 0;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : hidden;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._gyro_on.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._gyro_on.logicBlock_alpha = function () {
            var newLogicStateAlpha;
            if (
                (player.getUseGyro() == false)
            ) {
                newLogicStateAlpha = 0;
            } else {
                newLogicStateAlpha = -1;
            }
            if (me._gyro_on.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
                me._gyro_on.ggCurrentLogicStateAlpha = newLogicStateAlpha;
                me._gyro_on.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._gyro_on.ggCurrentLogicStateAlpha == 0) {
                    me._gyro_on.style.visibility = me._gyro_on.ggVisible ? 'inherit' : 'hidden';
                    me._gyro_on.style.opacity = 1;
                } else {
                    me._gyro_on.style.visibility = "hidden";
                    me._gyro_on.style.opacity = 0;
                }
            }
        }
        me._gyro_on.onclick = function (e) {
            if (player.transitionsDisabled) {
                me._gyro_on.style[domTransition] = 'none';
            } else {
                me._gyro_on.style[domTransition] = 'all 500ms ease-out 0ms';
            }
            me._gyro_on.style.opacity = '0';
            me._gyro_on.style.visibility = 'hidden';
            if (player.transitionsDisabled) {
                me._gyro_off.style[domTransition] = 'none';
            } else {
                me._gyro_off.style[domTransition] = 'all 500ms ease-out 0ms';
            }
            me._gyro_off.style.opacity = '1';
            me._gyro_off.style.visibility = me._gyro_off.ggVisible ? 'inherit' : 'hidden';
            me.__360image_gyro.ggTimeout = Number("4") * 1000.0;
            me.__360image_gyro.ggTimestamp = skin.ggCurrentTime;
            me.__360image_timer.ggTimeout = Number("0.4") * 1000.0;
            me.__360image_timer.ggTimestamp = skin.ggCurrentTime;
        }
        me._gyro_on.onmouseover = function (e) {
            me._gyro_on__img.style.visibility = 'hidden';
            me._gyro_on__imgo.style.visibility = 'inherit';
        }
        me._gyro_on.onmouseout = function (e) {
            me._gyro_on__img.style.visibility = 'inherit';
            me._gyro_on__imgo.style.visibility = 'hidden';
        }
        me._gyro_on.ggUpdatePosition = function (useTransition) {
        }
        me._gyro.appendChild(me._gyro_on);
        el = me._gyro_off = document.createElement('div');
        els = me._gyro_off__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4wLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxMzAgMTMwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMzAgMTMwOyIgeG1sOnNwYW' +
            'NlPSJwcmVzZXJ2ZSI+DQo8ZyBpZD0iTGF5ZXJfMV8xXyI+DQo8L2c+DQo8ZyBpZD0iTGF5ZXJfMl8xXyI+DQoJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTTY1LDguOUMzNCw4LjksOC45LDM0LDguOSw2NWMwLDMxLDI1LjEsNTYuMSw1Ni4xLDU2LjFjMzEsMCw1Ni4xLTI1LjEsNTYuMS01Ni4xQzEyMS4xLDM0LDk2LDguOSw2NSw4Ljl6IE00Ni44LDM4LjQNCgkJYzEuMS00LDIuNi03LjMsNC45LTkuN2MxLjUtMS42LDMuNC0yLjcsNS41LTMuMXYwYzAuNi0wLjEsMS4yLTAuMiwxLjgtMC4yYzEuNCwwLDIuOCwwLjMsNC4xLDAuOGMxLjMsMC41LDIuNiwxLjMsMy44LDIuMw0KCQljMi40LDEuOSw0' +
            'LjcsNC41LDYuNyw3LjhjMS43LDIuNiwzLjIsNS42LDQuNiw4LjljMC4xLDAsMC4yLDAsMC4zLDAuMWwtNC4xLDQuMWMtMy0wLjMtNi4yLTAuNS05LjUtMC41bC0wLjktNC41DQoJCWMwLjMsMCwwLjYsMCwwLjksMGMyLjcsMCw1LjQsMC4xLDgsMC4zYy0yLjEtNC40LTQuNC04LjEtNi44LTEwLjZjLTEuNy0xLjgtMy40LTMtNC44LTMuNmMtMC43LTAuMy0xLjMtMC40LTEuOS0wLjVsNS43LDI4LjcNCgkJbC0yLjMsMi4zbC02LTMwLjRjLTAuNiwwLjMtMS4yLDAuNy0xLjgsMS40Yy0xLDEtMS45LDIuNi0yLjcsNC41Yy0xLjYsMy45LTIuNSw5LjUtMi41LDE1LjljMCw0LjgsMC41LDEwLjEsMS42LD' +
            'E1LjVsMCwwDQoJCWMwLjMsMS4zLDAuNSwyLjUsMC44LDMuOGwtMy43LDMuN2MtMC42LTIuMS0xLjEtNC4zLTEuNi02LjZjLTEuMS01LjctMS43LTExLjMtMS43LTE2LjRDNDUuMiw0Nyw0NS44LDQyLjQsNDYuOCwzOC40eiBNNTguNiw0OC45DQoJCWMtMi40LDAuMi00LjgsMC40LTcsMC43YzAuMS0xLjYsMC4yLTMuMSwwLjQtNC42YzEuOS0wLjIsMy44LTAuNCw1LjgtMC42TDU4LjYsNDguOXogTTIwLjQsNjkuN2MtMC43LTEuNS0xLjEtMy4xLTEuMS00LjcNCgkJYzAtMS42LDAuNC0zLjIsMS4xLTQuN2MwLjctMS41LDEuNy0yLjgsMy00LjFjMi41LTIuNSw1LjktNC42LDEwLTYuNGMzLjEtMS4z' +
            'LDYuNS0yLjQsMTAuMy0zLjNjLTAuMSwxLjUtMC4yLDMuMS0wLjIsNC43DQoJCWMtNiwxLjUtMTEsMy42LTE0LjQsNmMtMi4zLDEuNi0zLjksMy40LTQuNyw1Yy0wLjQsMC45LTAuNywxLjgtMC43LDIuOGgwYzAsMC45LDAuMiwxLjgsMC43LDIuOGMwLjUsMC45LDEuMSwxLjksMi4xLDIuOQ0KCQljMS45LDEuOSw0LjksMy44LDguNiw1LjRjMi44LDEuMiw1LjksMi4yLDkuNCwzbC0zLjcsMy43Yy01LjctMS42LTEwLjYtMy43LTE0LjQtNi4zQzIzLjgsNzQuNSwyMS42LDcyLjMsMjAuNCw2OS43eiBNMzIuOCwxMDAuMw0KCQljLTAuNCwwLTAuOC0wLjEtMS4xLTAuNGwtMS43LTEuN2MtMC42LTAuNi' +
            '0wLjYtMS42LDAtMi4ybDY2LTY2YzAuMy0wLjMsMC43LTAuNCwxLjEtMC40czAuOCwwLjEsMS4xLDAuNGwxLjcsMS43DQoJCWMwLjYsMC42LDAuNiwxLjYsMCwyLjJsLTY2LDY2QzMzLjYsMTAwLjIsMzMuMiwxMDAuMywzMi44LDEwMC4zeiBNNzguNyw2Mi4zYy0wLjMtMS4zLTAuNS0yLjUtMC44LTMuOGwzLjctMy43DQoJCWMwLjYsMi4xLDEuMSw0LjMsMS42LDYuNmMxLjEsNS42LDEuNiwxMSwxLjcsMTUuOWMtMC41LDAuMS0wLjksMC4yLTEuNCwwLjNjLTEsMC4yLTIsMC40LTMuMSwwLjZjMC0wLjEsMC0wLjMsMC0wLjQNCgkJQzgwLjMsNzMsNzkuOCw2Ny44LDc4LjcsNjIuM3ogTTY5LjMsNzku' +
            'NGMtMC45LDAtMS44LDAuMS0yLjcsMC4xbC0xLjYtOC4xbDIuMy0yLjNMNjkuMyw3OS40eiBNMTA2LjcsNzMuOA0KCQljLTIuNSwyLjUtNS45LDQuNi0xMCw2LjRjLTguMiwzLjUtMTkuNCw1LjYtMzEuNiw1LjZjLTIuNywwLTUuNC0wLjEtOC0wLjNjMi4xLDQuNCw0LjQsOC4xLDYuOCwxMC42YzEuNywxLjgsMy40LDMsNC44LDMuNg0KCQljMC43LDAuMywxLjQsMC40LDIsMC41bC0yLjUtMTIuNmMwLjksMCwxLjgtMC4xLDIuNy0wLjFsMi40LDEyLjJjMC42LTAuMywxLjItMC43LDEuOC0xLjNjMS0xLDEuOS0yLjYsMi43LTQuNQ0KCQljMC44LTIsMS40LTQuNCwxLjktNy4yYzEtMC4xLDItMC4zLD' +
            'MtMC41YzAuNi0wLjEsMS4xLTAuMiwxLjYtMC4zYy0wLjMsMi4xLTAuNiw0LjEtMS4xLDUuOWMtMS4xLDQtMi42LDcuMy00LjksOS43DQoJCWMtMS41LDEuNi0zLjQsMi43LTUuNSwzLjFsMCwwYy0wLjYsMC4xLTEuMiwwLjItMS44LDAuMmMtMS40LDAtMi44LTAuMy00LjEtMC44Yy0xLjMtMC41LTIuNi0xLjMtMy44LTIuMw0KCQljLTIuNC0xLjktNC43LTQuNS02LjctNy44Yy0xLjctMi42LTMuMi01LjYtNC42LTguOWMtMC4xLDAtMC4yLDAtMC40LTAuMWw0LjEtNC4xYzMsMC4zLDYuMiwwLjUsOS41LDAuNWM3LjcsMCwxNC45LTAuOSwyMS4xLTIuNA0KCQljNi4yLTEuNSwxMS4zLTMuNywxNC44' +
            'LTYuMWMyLjMtMS42LDMuOS0zLjQsNC43LTVjMC40LTAuOSwwLjctMS44LDAuNy0yLjhjMC0wLjktMC4yLTEuOC0wLjctMi44Yy0wLjQtMC45LTEuMS0xLjktMi4xLTIuOQ0KCQljLTEuOS0xLjktNC45LTMuOC04LjYtNS40Yy0yLjgtMS4yLTYtMi4yLTkuNS0zbDMuNy0zLjdjNS43LDEuNiwxMC42LDMuNywxNC40LDYuM2MyLjgsMS45LDQuOSw0LjIsNi4xLDYuNw0KCQljMC43LDEuNSwxLjEsMy4xLDEuMSw0LjdjMCwxLjYtMC40LDMuMi0xLjEsNC43QzEwOC45LDcxLjIsMTA3LjksNzIuNiwxMDYuNyw3My44eiIvPg0KCTxnPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNNTEuNiw0OS42Yz' +
            'IuMy0wLjMsNC42LTAuNiw3LTAuN2wtMC45LTQuNWMtMiwwLjEtMy45LDAuMy01LjgsMC42QzUxLjgsNDYuNSw1MS43LDQ4LDUxLjYsNDkuNnoiLz4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTk5LjksMzEuOGwtMS43LTEuN2MtMC4zLTAuMy0wLjctMC40LTEuMS0wLjRzLTAuOCwwLjEtMS4xLDAuNGwtNjYsNjZjLTAuNiwwLjYtMC42LDEuNiwwLDIuMmwxLjcsMS43DQoJCQljMC4zLDAuMywwLjcsMC40LDEuMSwwLjRjMC40LDAsMC44LTAuMSwxLjEtMC40bDY2LTY2QzEwMC41LDMzLjMsMTAwLjUsMzIuNCw5OS45LDMxLjh6Ii8+DQoJCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik02Ni41' +
            'LDc5LjVjMC45LDAsMS44LDAsMi43LTAuMWwtMi0xMC4zbC0yLjMsMi4zTDY2LjUsNzkuNXoiLz4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTgzLjQsNzcuN2MwLjUtMC4xLDAuOS0wLjIsMS40LTAuM2MwLTUtMC42LTEwLjQtMS43LTE1LjljLTAuNC0yLjMtMS00LjUtMS42LTYuNmwtMy43LDMuNw0KCQkJYzAuMywxLjIsMC42LDIuNSwwLjgsMy44YzEuMSw1LjUsMS42LDEwLjcsMS42LDE1LjVjMCwwLjIsMCwwLjMsMCwwLjRDODEuMyw3OC4xLDgyLjQsNzcuOSw4My40LDc3Ljd6Ii8+DQoJCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik00OC41LDc1LjJsMy43LTMuN2MtMC4zLTEuMi0wLj' +
            'YtMi41LTAuOC0zLjhsMCwwYy0xLjEtNS41LTEuNi0xMC43LTEuNi0xNS41YzAtNi40LDAuOS0xMiwyLjUtMTUuOQ0KCQkJYzAuOC0yLDEuNy0zLjUsMi43LTQuNWMwLjYtMC42LDEuMi0xLjEsMS44LTEuNGw2LDMwLjRsMi4zLTIuM2wtNS43LTI4LjdjMC42LDAsMS4zLDAuMiwxLjksMC41YzEuNSwwLjYsMy4yLDEuOCw0LjgsMy42DQoJCQljMi40LDIuNSw0LjcsNi4xLDYuOCwxMC42Yy0yLjYtMC4yLTUuMy0wLjMtOC0wLjNjLTAuMywwLTAuNiwwLTAuOSwwbDAuOSw0LjVjMy4zLDAsNi40LDAuMiw5LjUsMC41bDQuMS00LjENCgkJCWMtMC4xLDAtMC4yLDAtMC4zLTAuMWMtMS40LTMuMy0yLjkt' +
            'Ni4zLTQuNi04LjljLTIuMS0zLjItNC4zLTUuOS02LjctNy44Yy0xLjItMS0yLjUtMS43LTMuOC0yLjNjLTEuMy0wLjUtMi43LTAuOC00LjEtMC44DQoJCQljLTAuNiwwLTEuMiwwLjEtMS44LDAuMnYwYy0yLjEsMC40LTQsMS42LTUuNSwzLjFjLTIuMywyLjQtMy44LDUuNy00LjksOS43Yy0xLjEsNC0xLjYsOC43LTEuNiwxMy44YzAsNS4xLDAuNSwxMC43LDEuNywxNi40DQoJCQlDNDcuNCw3MC44LDQ3LjksNzMsNDguNSw3NS4yeiIvPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNNDQuNiw3OS4xYy0zLjUtMC44LTYuNy0xLjgtOS40LTNjLTMuNy0xLjYtNi43LTMuNS04LjYtNS40Yy0xLT' +
            'EtMS43LTEuOS0yLjEtMi45Yy0wLjQtMC45LTAuNy0xLjgtMC43LTIuOA0KCQkJaDBjMC0wLjksMC4yLTEuOCwwLjctMi44YzAuOC0xLjYsMi4zLTMuNCw0LjctNWMzLjQtMi40LDguNC00LjUsMTQuNC02YzAtMS42LDAuMS0zLjIsMC4yLTQuN2MtMy44LDAuOS03LjIsMi0xMC4zLDMuMw0KCQkJYy00LjEsMS44LTcuNSwzLjktMTAsNi40Yy0xLjIsMS4zLTIuMywyLjYtMyw0LjFjLTAuNywxLjUtMS4xLDMuMS0xLjEsNC43YzAsMS42LDAuNCwzLjIsMS4xLDQuN2MxLjIsMi42LDMuNCw0LjgsNi4yLDYuNw0KCQkJYzMuNywyLjYsOC42LDQuNywxNC40LDYuM0w0NC42LDc5LjF6Ii8+DQoJCTxwYXRo' +
            'IGZpbGw9IiNGRkZGRkYiIGQ9Ik0xMDkuNyw2MC4zYy0xLjItMi42LTMuNC00LjgtNi4xLTYuN2MtMy43LTIuNi04LjYtNC43LTE0LjQtNi4zbC0zLjcsMy43YzMuNSwwLjgsNi43LDEuOCw5LjUsMw0KCQkJYzMuNywxLjYsNi43LDMuNSw4LjYsNS40YzEsMSwxLjcsMS45LDIuMSwyLjljMC40LDAuOSwwLjcsMS44LDAuNywyLjhjMCwwLjktMC4yLDEuOC0wLjcsMi44Yy0wLjgsMS42LTIuMywzLjQtNC43LDUNCgkJCWMtMy41LDIuNS04LjYsNC42LTE0LjgsNi4xYy02LjIsMS41LTEzLjQsMi40LTIxLjEsMi40Yy0zLjMsMC02LjQtMC4yLTkuNS0wLjVsLTQuMSw0LjFjMC4xLDAsMC4yLDAsMC40LD' +
            'AuMQ0KCQkJYzEuNCwzLjMsMi45LDYuMyw0LjYsOC45YzIuMSwzLjIsNC4zLDUuOSw2LjcsNy44YzEuMiwxLDIuNSwxLjcsMy44LDIuM2MxLjMsMC41LDIuNywwLjgsNC4xLDAuOGMwLjYsMCwxLjItMC4xLDEuOC0wLjJsMCwwDQoJCQljMi4xLTAuNCw0LTEuNiw1LjUtMy4xYzIuMy0yLjQsMy44LTUuNyw0LjktOS43YzAuNS0xLjgsMC45LTMuOCwxLjEtNS45Yy0wLjUsMC4xLTEuMSwwLjItMS42LDAuM2MtMSwwLjItMiwwLjMtMywwLjUNCgkJCWMtMC40LDIuNy0xLjEsNS4yLTEuOSw3LjJjLTAuOCwyLTEuNywzLjUtMi43LDQuNWMtMC42LDAuNi0xLjIsMS0xLjgsMS4zbC0yLjQtMTIuMmMtMC45' +
            'LDAtMS44LDAuMS0yLjcsMC4xbDIuNSwxMi42DQoJCQljLTAuNiwwLTEuMy0wLjItMi0wLjVjLTEuNS0wLjYtMy4yLTEuOC00LjgtMy42Yy0yLjQtMi41LTQuNy02LjEtNi44LTEwLjZjMi42LDAuMiw1LjMsMC4zLDgsMC4zYzEyLjMsMCwyMy40LTIuMSwzMS42LTUuNg0KCQkJYzQuMS0xLjgsNy41LTMuOSwxMC02LjRjMS4yLTEuMywyLjMtMi42LDMtNC4xYzAuNy0xLjUsMS4xLTMuMSwxLjEtNC43QzExMC44LDYzLjQsMTEwLjQsNjEuOCwxMDkuNyw2MC4zeiIvPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K';
        me._gyro_off__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;gyro_off;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._gyro_off__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4wLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxMzAgMTMwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMzAgMTMwOyIgeG1sOnNwYW' +
            'NlPSJwcmVzZXJ2ZSI+DQo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPg0KCS5zdDB7ZmlsbDojRkZGRkZGO30NCjwvc3R5bGU+DQo8ZyBpZD0iTGF5ZXJfMV8xXyI+DQo8L2c+DQo8ZyBpZD0iTGF5ZXJfMl8xXyI+DQoJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTTY1LDIuNkMzMC42LDIuNiwyLjYsMzAuNiwyLjYsNjVjMCwzNC40LDI3LjksNjIuNCw2Mi40LDYyLjRjMzQuNCwwLDYyLjQtMjcuOSw2Mi40LTYyLjRDMTI3LjQsMzAuNiw5OS41LDIuNiw2NSwyLjZ6DQoJCSBNNDQuOCwzNS40YzEuMi00LjQsMi45LTguMSw1LjQtMTAuOGMxLjctMS44LDMuNy0zLDYuMS0zLjV2MGMwLjctMC4xLDEuMy0w' +
            'LjIsMi0wLjJjMS41LDAsMy4xLDAuMyw0LjUsMC45DQoJCWMxLjUsMC42LDIuOSwxLjQsNC4yLDIuNWMyLjcsMi4xLDUuMiw1LDcuNSw4LjZjMS44LDIuOSwzLjYsNi4yLDUuMSw5LjljMC4xLDAsMC4zLDAsMC40LDAuMWwtNC41LDQuNWMtMy40LTAuMy02LjktMC41LTEwLjUtMC41DQoJCWwtMS01YzAuMywwLDAuNywwLDEsMGMzLDAsNiwwLjEsOC45LDAuNGMtMi4zLTQuOS00LjktOS03LjUtMTEuN2MtMS45LTItMy43LTMuMy01LjQtNGMtMC44LTAuMy0xLjUtMC41LTIuMi0wLjVsNi4zLDMxLjgNCgkJbC0yLjYsMi42bC02LjctMzMuOGMtMC43LDAuMy0xLjMsMC44LTIsMS41Yy0xLjEsMS4yLT' +
            'IuMiwyLjktMyw1QzQ5LjEsMzcuNSw0OCw0My42LDQ4LDUwLjhjMCw1LjMsMC42LDExLjIsMS44LDE3LjJsMCwwDQoJCWMwLjMsMS40LDAuNiwyLjgsMC45LDQuMmwtNC4xLDQuMWMtMC43LTIuNC0xLjItNC44LTEuNy03LjNDNDMuNiw2Mi42LDQzLDU2LjQsNDMsNTAuOEM0Myw0NS4xLDQzLjYsMzkuOSw0NC44LDM1LjR6IE01Ny45LDQ3LjENCgkJYy0yLjcsMC4yLTUuMywwLjQtNy44LDAuOGMwLjEtMS44LDAuMi0zLjUsMC40LTUuMWMyLjEtMC4zLDQuMi0wLjUsNi40LTAuNkw1Ny45LDQ3LjF6IE0xNS40LDcwLjJjLTAuOC0xLjYtMS4yLTMuNC0xLjItNS4yDQoJCWMwLTEuOCwwLjQtMy42LDEu' +
            'Mi01LjJjMC44LTEuNiwxLjktMy4yLDMuMy00LjVjMi44LTIuOCw2LjYtNS4xLDExLjItNy4xYzMuNC0xLjUsNy4zLTIuNywxMS41LTMuN2MtMC4xLDEuNy0wLjIsMy40LTAuMyw1LjINCgkJYy02LjYsMS43LTEyLjIsNC0xNiw2LjdjLTIuNiwxLjgtNC4zLDMuNy01LjIsNS42Yy0wLjUsMS0wLjcsMi0wLjcsMy4xaDBjMCwxLDAuMiwyLDAuNywzLjFjMC41LDEsMS4zLDIuMSwyLjMsMy4yDQoJCWMyLjEsMi4xLDUuNCw0LjIsOS42LDZjMy4xLDEuMyw2LjYsMi40LDEwLjUsMy4zbC00LjEsNC4xYy02LjQtMS44LTExLjgtNC4xLTE2LTdDMTkuMiw3NS42LDE2LjgsNzMuMSwxNS40LDcwLjJ6IE0yOS' +
            '4zLDEwNC4zDQoJCWMtMC40LDAtMC45LTAuMi0xLjItMC41bC0xLjgtMS44Yy0wLjctMC43LTAuNy0xLjcsMC0yLjRsNzMuMy03My4zYzAuMy0wLjMsMC44LTAuNSwxLjItMC41czAuOSwwLjIsMS4yLDAuNWwxLjgsMS44DQoJCWMwLjcsMC43LDAuNywxLjcsMCwyLjRsLTczLjMsNzMuM0MzMC4xLDEwNC4xLDI5LjcsMTA0LjMsMjkuMywxMDQuM3ogTTgwLjIsNjJjLTAuMy0xLjQtMC42LTIuOC0wLjktNC4ybDQuMS00LjENCgkJYzAuNywyLjQsMS4yLDQuOCwxLjcsNy4zYzEuMiw2LjIsMS44LDEyLjIsMS45LDE3LjdjLTAuNSwwLjEtMSwwLjItMS42LDAuM2MtMS4xLDAuMi0yLjMsMC40LTMuNCww' +
            'LjZjMC0wLjIsMC0wLjMsMC0wLjUNCgkJQzgyLDczLjksODEuNCw2OC4xLDgwLjIsNjJ6IE02OS43LDgxYy0xLDAtMiwwLjEtMywwLjFsLTEuOC04LjlsMi42LTIuNkw2OS43LDgxeiBNMTExLjMsNzQuOGMtMi44LDIuOC02LjYsNS4xLTExLjIsNy4xDQoJCUM5MSw4NS44LDc4LjYsODguMSw2NSw4OC4xYy0zLDAtNi0wLjEtOC45LTAuM2MyLjMsNC45LDQuOSw5LDcuNSwxMS43YzEuOSwyLDMuNywzLjMsNS40LDRjMC44LDAuMywxLjUsMC41LDIuMiwwLjVsLTIuOC0xNA0KCQljMSwwLDItMC4xLDMtMC4xbDIuNywxMy41YzAuNy0wLjMsMS4zLTAuOCwyLTEuNWMxLjEtMS4yLDIuMi0yLjksMy01Yz' +
            'AuOS0yLjIsMS42LTQuOSwyLjEtOGMxLjEtMC4yLDIuMy0wLjMsMy4zLTAuNQ0KCQljMC42LTAuMSwxLjItMC4yLDEuOC0wLjRjLTAuMywyLjMtMC43LDQuNS0xLjIsNi41Yy0xLjIsNC40LTIuOSw4LjEtNS40LDEwLjhjLTEuNywxLjgtMy43LDMtNi4xLDMuNWwwLDBjLTAuNywwLjEtMS4zLDAuMi0yLDAuMg0KCQljLTEuNSwwLTMuMS0wLjMtNC41LTAuOWMtMS41LTAuNi0yLjktMS40LTQuMi0yLjVjLTIuNy0yLjEtNS4yLTUtNy41LTguNmMtMS44LTIuOS0zLjYtNi4yLTUuMS05LjljLTAuMSwwLTAuMywwLTAuNC0wLjFsNC41LTQuNQ0KCQljMy40LDAuMyw2LjksMC41LDEwLjUsMC41YzguNiww' +
            'LDE2LjYtMSwyMy41LTIuN2M2LjktMS43LDEyLjYtNC4xLDE2LjQtNi44YzIuNi0xLjgsNC4zLTMuNyw1LjItNS42YzAuNS0xLDAuNy0yLDAuNy0zLjENCgkJYzAtMS0wLjItMi0wLjctMy4xYy0wLjUtMS0xLjMtMi4xLTIuMy0zLjJjLTIuMS0yLjEtNS40LTQuMi05LjYtNmMtMy4xLTEuMy02LjYtMi40LTEwLjUtMy40bDQuMS00LjFjNi40LDEuOCwxMS44LDQuMSwxNiw3DQoJCWMzLjEsMi4yLDUuNCw0LjYsNi44LDcuNWMwLjgsMS42LDEuMiwzLjQsMS4yLDUuMmMwLDEuOC0wLjQsMy42LTEuMiw1LjJDMTEzLjgsNzEuOSwxMTIuNyw3My40LDExMS4zLDc0Ljh6Ii8+DQoJPGc+DQoJCTxwYXRoIG' +
            'ZpbGw9IiNGRkZGRkYiIGQ9Ik01MC4xLDQ3LjljMi41LTAuNCw1LjEtMC42LDcuOC0wLjhsLTEtNC45Yy0yLjIsMC4yLTQuMywwLjQtNi40LDAuNkM1MC4zLDQ0LjQsNTAuMiw0Ni4xLDUwLjEsNDcuOXoiLz4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTEwMy44LDI4LjFsLTEuOC0xLjhjLTAuMy0wLjMtMC44LTAuNS0xLjItMC41cy0wLjksMC4yLTEuMiwwLjVMMjYuMiw5OS41Yy0wLjcsMC43LTAuNywxLjcsMCwyLjRsMS44LDEuOA0KCQkJYzAuMywwLjMsMC44LDAuNSwxLjIsMC41czAuOS0wLjIsMS4yLTAuNWw3My4zLTczLjNDMTA0LjQsMjkuOCwxMDQuNCwyOC43LDEwMy44LDI4LjF6' +
            'Ii8+DQoJCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik02Ni43LDgxLjFjMSwwLDIsMCwzLTAuMWwtMi4zLTExLjRsLTIuNiwyLjZMNjYuNyw4MS4xeiIvPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNODUuNCw3OS4xYzAuNS0wLjEsMS0wLjIsMS42LTAuM2MwLTUuNS0wLjYtMTEuNS0xLjktMTcuN2MtMC41LTIuNS0xLjEtNS0xLjctNy4zbC00LjEsNC4xDQoJCQljMC4zLDEuNCwwLjcsMi44LDAuOSw0LjJjMS4yLDYuMSwxLjgsMTEuOSwxLjgsMTcuM2MwLDAuMiwwLDAuMywwLDAuNUM4My4yLDc5LjUsODQuMyw3OS4zLDg1LjQsNzkuMXoiLz4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgIG' +
            'Q9Ik00Ni42LDc2LjNsNC4xLTQuMWMtMC4zLTEuNC0wLjYtMi44LTAuOS00LjJsMCwwQzQ4LjYsNjEuOSw0OCw1Ni4xLDQ4LDUwLjhjMC03LjEsMS0xMy4zLDIuOC0xNy43DQoJCQljMC45LTIuMiwxLjktMy45LDMtNWMwLjctMC43LDEuMy0xLjIsMi0xLjVsNi43LDMzLjhsMi42LTIuNkw1OC44LDI2YzAuNywwLjEsMS40LDAuMiwyLjIsMC41YzEuNiwwLjcsMy41LDIsNS40LDQNCgkJCWMyLjYsMi44LDUuMiw2LjgsNy41LDExLjdDNzEsNDIsNjguMSw0MS45LDY1LDQxLjljLTAuMywwLTAuNywwLTEsMGwxLDVjMy42LDAsNy4xLDAuMiwxMC41LDAuNWw0LjUtNC41Yy0wLjEsMC0wLjMsMC0wLjQt' +
            'MC4xDQoJCQljLTEuNS0zLjctMy4zLTctNS4xLTkuOWMtMi4zLTMuNi00LjgtNi41LTcuNS04LjZjLTEuMy0xLjEtMi43LTEuOS00LjItMi41Yy0xLjUtMC42LTMtMC45LTQuNS0wLjljLTAuNywwLTEuNCwwLjEtMiwwLjJ2MA0KCQkJYy0yLjQsMC41LTQuNCwxLjctNi4xLDMuNWMtMi41LDIuNy00LjIsNi40LTUuNCwxMC44Yy0xLjIsNC40LTEuOCw5LjYtMS44LDE1LjNjMCw1LjcsMC42LDExLjgsMS45LDE4LjINCgkJCUM0NS40LDcxLjUsNDYsNzMuOSw0Ni42LDc2LjN6Ii8+DQoJCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik00Mi4zLDgwLjZjLTMuOS0wLjktNy40LTItMTAuNS0zLjNjLTQuMi' +
            '0xLjgtNy40LTMuOS05LjYtNmMtMS4xLTEuMS0xLjgtMi4xLTIuMy0zLjJjLTAuNS0xLTAuNy0yLTAuNy0zLjFoMA0KCQkJYzAtMSwwLjItMiwwLjctMy4xYzAuOS0xLjgsMi42LTMuOCw1LjItNS42YzMuOC0yLjcsOS4zLTUsMTUuOS02LjdjMC0xLjgsMC4xLTMuNSwwLjMtNS4yYy00LjIsMS04LDIuMi0xMS41LDMuNw0KCQkJYy00LjYsMi04LjQsNC4zLTExLjIsNy4xYy0xLjQsMS40LTIuNSwyLjktMy4zLDQuNWMtMC44LDEuNi0xLjIsMy40LTEuMiw1LjJjMCwxLjgsMC40LDMuNiwxLjIsNS4yYzEuNCwyLjksMy44LDUuMyw2LjgsNy41DQoJCQljNC4xLDIuOSw5LjYsNS4zLDE2LDdMNDIuMyw4' +
            'MC42eiIvPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTE0LjYsNTkuOGMtMS40LTIuOS0zLjgtNS4zLTYuOC03LjVjLTQuMS0yLjktOS42LTUuMy0xNi03bC00LjEsNC4xYzMuOSwwLjksNy40LDIsMTAuNSwzLjQNCgkJCWM0LjIsMS44LDcuNCwzLjksOS42LDZjMS4xLDEuMSwxLjgsMi4xLDIuMywzLjJjMC41LDEsMC43LDIsMC43LDMuMWMwLDEtMC4yLDItMC43LDMuMWMtMC45LDEuOC0yLjYsMy44LTUuMiw1LjYNCgkJCWMtMy45LDIuNy05LjYsNS4xLTE2LjQsNi44Yy02LjksMS43LTE0LjksMi43LTIzLjUsMi43Yy0zLjYsMC03LjItMC4yLTEwLjUtMC41TDUwLDg3LjFjMC4xLDAsMC' +
            '4zLDAsMC40LDAuMQ0KCQkJYzEuNSwzLjcsMy4zLDcsNS4xLDkuOWMyLjMsMy42LDQuOCw2LjUsNy41LDguNmMxLjMsMS4xLDIuNywxLjksNC4yLDIuNWMxLjUsMC42LDMsMC45LDQuNSwwLjljMC43LDAsMS4zLTAuMSwyLTAuMmwwLDANCgkJCWMyLjQtMC41LDQuNC0xLjcsNi4xLTMuNWMyLjUtMi43LDQuMi02LjQsNS40LTEwLjhjMC41LTIsMC45LTQuMiwxLjItNi41Yy0wLjYsMC4xLTEuMiwwLjMtMS44LDAuNGMtMS4xLDAuMi0yLjIsMC40LTMuMywwLjUNCgkJCWMtMC41LDMtMS4yLDUuNy0yLjEsOGMtMC45LDIuMi0xLjksMy45LTMsNWMtMC42LDAuNy0xLjMsMS4yLTIsMS41bC0yLjctMTMu' +
            'NWMtMSwwLjEtMiwwLjEtMywwLjFsMi44LDE0DQoJCQljLTAuNy0wLjEtMS40LTAuMi0yLjItMC41Yy0xLjctMC43LTMuNS0yLTUuNC00Yy0yLjYtMi44LTUuMi02LjgtNy41LTExLjdDNTksODgsNjIsODguMSw2NSw4OC4xYzEzLjYsMCwyNi0yLjMsMzUuMi02LjINCgkJCWM0LjYtMiw4LjQtNC4zLDExLjItNy4xYzEuNC0xLjQsMi41LTIuOSwzLjMtNC41YzAuOC0xLjYsMS4yLTMuNCwxLjItNS4yQzExNS44LDYzLjIsMTE1LjQsNjEuNCwxMTQuNiw1OS44eiIvPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K';
        me._gyro_off__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;gyro_off;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "gyro_off";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 32px;';
        hs += 'left : 0px;';
        hs += 'opacity : 0;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : hidden;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._gyro_off.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._gyro_off.logicBlock_alpha = function () {
            var newLogicStateAlpha;
            if (
                (player.getUseGyro() == true)
            ) {
                newLogicStateAlpha = 0;
            } else {
                newLogicStateAlpha = -1;
            }
            if (me._gyro_off.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
                me._gyro_off.ggCurrentLogicStateAlpha = newLogicStateAlpha;
                me._gyro_off.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._gyro_off.ggCurrentLogicStateAlpha == 0) {
                    me._gyro_off.style.visibility = me._gyro_off.ggVisible ? 'inherit' : 'hidden';
                    me._gyro_off.style.opacity = 1;
                } else {
                    me._gyro_off.style.visibility = "hidden";
                    me._gyro_off.style.opacity = 0;
                }
            }
        }
        me._gyro_off.onclick = function (e) {
            if (player.transitionsDisabled) {
                me._gyro_off.style[domTransition] = 'none';
            } else {
                me._gyro_off.style[domTransition] = 'all 500ms ease-out 0ms';
            }
            me._gyro_off.style.opacity = '0';
            me._gyro_off.style.visibility = 'hidden';
            if (player.transitionsDisabled) {
                me._gyro_on.style[domTransition] = 'none';
            } else {
                me._gyro_on.style[domTransition] = 'all 500ms ease-out 0ms';
            }
            me._gyro_on.style.opacity = '1';
            me._gyro_on.style.visibility = me._gyro_on.ggVisible ? 'inherit' : 'hidden';
        }
        me._gyro_off.onmouseover = function (e) {
            me._gyro_off__img.style.visibility = 'hidden';
            me._gyro_off__imgo.style.visibility = 'inherit';
        }
        me._gyro_off.onmouseout = function (e) {
            me._gyro_off__img.style.visibility = 'inherit';
            me._gyro_off__imgo.style.visibility = 'hidden';
        }
        me._gyro_off.ggUpdatePosition = function (useTransition) {
        }
        me._gyro.appendChild(me._gyro_off);
        me._controller_slider.appendChild(me._gyro);
        el = me._projection_buttons = document.createElement('div');
        el.ggPermeable = false;
        el.ggId = "projection_buttons";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_container ";
        el.ggType = 'container';
        hs = '';
        hs += 'height : 32px;';
        hs += 'left : 160px;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : hidden;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._projection_buttons.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._projection_buttons.logicBlock_position = function () {
            var newLogicStatePosition;
            if (
                (player.getVariableValue('pos_projection') == 0)
            ) {
                newLogicStatePosition = 0;
            } else if (
                (player.getVariableValue('pos_projection') == 1)
            ) {
                newLogicStatePosition = 1;
            } else if (
                (player.getVariableValue('pos_projection') == 2)
            ) {
                newLogicStatePosition = 2;
            } else if (
                (player.getVariableValue('pos_projection') == 3)
            ) {
                newLogicStatePosition = 3;
            } else if (
                (player.getVariableValue('pos_projection') == 4)
            ) {
                newLogicStatePosition = 4;
            } else if (
                (player.getVariableValue('pos_projection') == 5)
            ) {
                newLogicStatePosition = 5;
            } else {
                newLogicStatePosition = -1;
            }
            if (me._projection_buttons.ggCurrentLogicStatePosition != newLogicStatePosition) {
                me._projection_buttons.ggCurrentLogicStatePosition = newLogicStatePosition;
                me._projection_buttons.style[domTransition] = 'left 0s, top 0s';
                if (me._projection_buttons.ggCurrentLogicStatePosition == 0) {
                    me._projection_buttons.style.left = '0px';
                    me._projection_buttons.style.top = '0px';
                } else if (me._projection_buttons.ggCurrentLogicStatePosition == 1) {
                    me._projection_buttons.style.left = '32px';
                    me._projection_buttons.style.top = '0px';
                } else if (me._projection_buttons.ggCurrentLogicStatePosition == 2) {
                    me._projection_buttons.style.left = '64px';
                    me._projection_buttons.style.top = '0px';
                } else if (me._projection_buttons.ggCurrentLogicStatePosition == 3) {
                    me._projection_buttons.style.left = '96px';
                    me._projection_buttons.style.top = '0px';
                } else if (me._projection_buttons.ggCurrentLogicStatePosition == 4) {
                    me._projection_buttons.style.left = '128px';
                    me._projection_buttons.style.top = '0px';
                } else if (me._projection_buttons.ggCurrentLogicStatePosition == 5) {
                    me._projection_buttons.style.left = '160px';
                    me._projection_buttons.style.top = '0px';
                } else {
                    me._projection_buttons.style.left = '160px';
                    me._projection_buttons.style.top = '0px';
                }
            }
        }
        me._projection_buttons.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('opt_projection') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._projection_buttons.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._projection_buttons.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._projection_buttons.style[domTransition] = 'left 0s, top 0s';
                if (me._projection_buttons.ggCurrentLogicStateVisible == 0) {
                    me._projection_buttons.style.visibility = (Number(me._projection_buttons.style.opacity) > 0 || !me._projection_buttons.style.opacity) ? 'inherit' : 'hidden';
                    me._projection_buttons.ggVisible = true;
                } else {
                    me._projection_buttons.style.visibility = "hidden";
                    me._projection_buttons.ggVisible = false;
                }
            }
        }
        me._projection_buttons.onclick = function (e) {
            if (
                (
                    (player.getProjection() == 4)
                )
            ) {
                player.changeProjectionEx(9, 1);
            }
            if (
                (
                    (player.getProjection() == 9)
                )
            ) {
                player.changeProjectionEx(12, 1);
            }
            if (
                (
                    (player.getProjection() == 12)
                )
            ) {
                player.changeProjectionEx(4, 1);
            }
        }
        me._projection_buttons.ggUpdatePosition = function (useTransition) {
        }
        el = me._rectilinear = document.createElement('div');
        els = me._rectilinear__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xIFRpbnkvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtdGlueS5kdGQiIFsNCgk8IUVOVElUWSBuc19mbG93cyAiaHR0cDovL25zLmFkb2JlLmNvbS9GbG93cy8xLjAvIj4NCgk8IUVOVElUWSBuc19leHRlbmQgImh0dHA6Ly9ucy5hZG9iZS' +
            '5jb20vRXh0ZW5zaWJpbGl0eS8xLjAvIj4NCgk8IUVOVElUWSBuc19haSAiaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZUlsbHVzdHJhdG9yLzEwLjAvIj4NCgk8IUVOVElUWSBuc19ncmFwaHMgImh0dHA6Ly9ucy5hZG9iZS5jb20vR3JhcGhzLzEuMC8iPg0KXT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgeG1sbnM6eD0iJm5zX2V4dGVuZDsiIHhtbG5zOmk9IiZuc19haTsiIHhtbG5zOmdyYXBoPSImbnNfZ3JhcGhzOyINCgkgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1s' +
            'bnM6YT0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZVNWR1ZpZXdlckV4dGVuc2lvbnMvMy4wLyINCgkgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIxMzBweCIgaGVpZ2h0PSIxMzBweCIgdmlld0JveD0iMCAwIDEzMCAxMzAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGcgaWQ9IkxheWVyXzEiPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik05OC44LDQwLjFjLTguNyw0LjItMjEsNi42LTMzLjgsNi42cy0yNS4yLTIuNC0zMy44LTYuNmMtMC43LTAuMy0xLjUtMC4zLTIuMiwwLjFjLTAuNywwLjQtMS4xLDEuMS0xLjEsMS45DQoJCXY0NS44YzAsMC44LD' +
            'AuNCwxLjUsMS4xLDEuOWMwLjQsMC4yLDAuOCwwLjMsMS4yLDAuM2MwLjMsMCwwLjctMC4xLDEtMC4yYzguNy00LjIsMjEtNi42LDMzLjgtNi42YzEyLjgsMCwyNS4yLDIuNCwzMy44LDYuNg0KCQljMC43LDAuMywxLjUsMC4zLDIuMi0wLjFjMC43LTAuNCwxLjEtMS4xLDEuMS0xLjlWNDIuMWMwLTAuOC0wLjQtMS41LTEuMS0xLjlDMTAwLjMsMzkuOCw5OS41LDM5LjgsOTguOCw0MC4xeiBNMzIuNCw4MC45Vjc0DQoJCWM3LjUtMC45LDE0LjktMS41LDIyLjItMS44Yy0wLjEsMC40LTAuNSwwLjgtMS42LDEuM2MtMS42LDAuNy00LjMsMS42LTcuMywyLjZDNDEuOSw3Ny41LDM3LjIsNzkuMSwzMi40' +
            'LDgwLjl6IE05Ny42LDg0LjQNCgkJQzg4LjYsODAuOSw3Nyw3OC44LDY1LDc4LjhjLTUuOSwwLTExLjgsMC41LTE3LjMsMS40YzMtMSw1LjQtMS44LDcuMS0yLjVjMy0xLjMsNC45LTMuNCw1LjEtNS43YzEuNiwwLDMsMCw0LjUtMC4xbDAsMWwyLjYsMGwwLTENCgkJYzEwLjIsMC4xLDIwLjQsMC43LDMwLjUsMlY4NC40eiBNOTcuNiw2OS41Yy0xLjEtMC4xLTIuMi0wLjMtMy4zLTAuNGMtMC4xLTQuMiwwLjEtNywwLTExLjhjLTMuNC0yLjctNS4xLTMuOS04LjctNg0KCQljLTMuNCwzLjQtNSw0LjYtOC40LDcuM2MwLDAuNiwwLDguNSwwLDkuMmMtMy4zLTAuMS02LjctMC4zLTEwLjEtMC4zbDAtMi' +
            '45YzMuNC0wLjQsNS45LTIuNCw1LjgtNC44QzcyLjgsNTcsNjkuNSw1NSw2NS42LDU1DQoJCWMtNCwwLTcuMiwyLTcuMiw0LjhjMCwyLjQsMi42LDQuNCw2LjEsNC44bDAsM2MtMTAuNSwwLTIxLjEsMC43LTMyLDJWNDUuNmM4LjksMy42LDIwLjYsNS42LDMyLjYsNS42YzEyLDAsMjMuNi0yLDMyLjYtNS42VjY5LjV6Ii8+DQoJPGc+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik02NSw4LjlDMzQsOC45LDguOSwzNCw4LjksNjVjMCwzMSwyNS4xLDU2LjEsNTYuMSw1Ni4xUzEyMS4xLDk2LDEyMS4xLDY1QzEyMS4xLDM0LDk2LDguOSw2NSw4Ljl6IE0xMDIuMSw4Ny45DQoJCQljMCwwLjgtMC40' +
            'LDEuNS0xLjEsMS45Yy0wLjcsMC40LTEuNSwwLjUtMi4yLDAuMWMtOC43LTQuMi0yMS02LjYtMzMuOC02LjZzLTI1LjIsMi40LTMzLjgsNi42Yy0wLjMsMC4yLTAuNiwwLjItMSwwLjINCgkJCWMtMC40LDAtMC44LTAuMS0xLjItMC4zYy0wLjctMC40LTEuMS0xLjEtMS4xLTEuOVY0Mi4xYzAtMC44LDAuNC0xLjUsMS4xLTEuOWMwLjctMC40LDEuNS0wLjUsMi4yLTAuMWM4LjcsNC4yLDIxLDYuNiwzMy44LDYuNg0KCQkJYzEyLjgsMCwyNS4yLTIuNCwzMy44LTYuNmMwLjctMC4zLDEuNS0wLjMsMi4yLDAuMWMwLjcsMC40LDEuMSwxLjEsMS4xLDEuOUMxMDIuMSw0Mi4xLDEwMi4xLDg3LjksMTAyLj' +
            'EsODcuOXoiLz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTTU0LjcsNzIuM0M0Ny40LDcyLjUsNDAsNzMuMSwzMi40LDc0djYuOWM0LjctMS44LDkuNC0zLjQsMTMuMy00LjdjMy4xLTEsNS43LTEuOSw3LjMtMi42QzU0LjIsNzMuMSw1NC42LDcyLjYsNTQuNyw3Mi4zDQoJCQl6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0zMi40LDQ1LjZ2MjMuOWMxMC45LTEuMywyMS41LTEuOSwzMi0ybDAtM2MtMy40LTAuNC02LTIuNC02LjEtNC44YzAtMi43LDMuMi00LjcsNy4yLTQuOGM0LDAsNy4zLDIsNy40LDQuNw0KCQkJYzAuMSwyLjQtMi40LDQuNC01LjgsNC44bDAsMi45YzMuMyww' +
            'LDYuOCwwLjEsMTAuMSwwLjNjMC0wLjgsMC04LjYsMC05LjJjMy40LTIuNyw1LTMuOSw4LjQtNy4zYzMuNiwyLjEsNS4zLDMuMiw4LjcsNg0KCQkJYzAuMSw0LjgtMC4xLDcuNiwwLDExLjhjMS4xLDAuMSwyLjIsMC4zLDMuMywwLjRWNDUuNkM4OC42LDQ5LjEsNzcsNTEuMiw2NSw1MS4yQzUzLDUxLjIsNDEuNCw0OS4xLDMyLjQsNDUuNnoiLz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTTY3LjEsNzNsLTIuNiwwbDAtMWMtMS41LDAtMywwLTQuNSwwLjFjLTAuMiwyLjMtMi4xLDQuNC01LjEsNS43Yy0xLjcsMC43LTQuMSwxLjUtNy4xLDIuNWM1LjUtMC45LDExLjMtMS40LDE3LjMtMS40DQ' +
            'oJCQljMTIsMCwyMy42LDIsMzIuNiw1LjZWNzRjLTEwLTEuMy0yMC4zLTEuOS0zMC41LTJMNjcuMSw3M3oiLz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==';
        me._rectilinear__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;rectilinear;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._rectilinear__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xIFRpbnkvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtdGlueS5kdGQiIFsNCgk8IUVOVElUWSBuc19mbG93cyAiaHR0cDovL25zLmFkb2JlLmNvbS9GbG93cy8xLjAvIj4NCgk8IUVOVElUWSBuc19leHRlbmQgImh0dHA6Ly9ucy5hZG9iZS' +
            '5jb20vRXh0ZW5zaWJpbGl0eS8xLjAvIj4NCgk8IUVOVElUWSBuc19haSAiaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZUlsbHVzdHJhdG9yLzEwLjAvIj4NCgk8IUVOVElUWSBuc19ncmFwaHMgImh0dHA6Ly9ucy5hZG9iZS5jb20vR3JhcGhzLzEuMC8iPg0KXT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgeG1sbnM6eD0iJm5zX2V4dGVuZDsiIHhtbG5zOmk9IiZuc19haTsiIHhtbG5zOmdyYXBoPSImbnNfZ3JhcGhzOyINCgkgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1s' +
            'bnM6YT0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZVNWR1ZpZXdlckV4dGVuc2lvbnMvMy4wLyINCgkgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIxMzBweCIgaGVpZ2h0PSIxMzBweCIgdmlld0JveD0iMCAwIDEzMCAxMzAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGcgaWQ9IkxheWVyXzEiPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0xMDIuNjAyLDM3LjMxNWMtOS42Miw0LjY0NS0yMy4zMjUsNy4zMDktMzcuNjAzLDcuMzA5Yy0xNC4yNzgsMC0yNy45ODItMi42NjQtMzcuNjAxLTcuMzA5DQoJCWMtMC43NzUtMC4zNzUtMS42ODctMC4zMjQtMi' +
            '40MTYsMC4xMzVjLTAuNzI5LDAuNDU3LTEuMTcxLDEuMjU2LTEuMTcxLDIuMTE3djUwLjg2NWMwLDAuODU5LDAuNDQyLDEuNjYsMS4xNzEsMi4xMTcNCgkJYzAuNDA0LDAuMjU0LDAuODY2LDAuMzgzLDEuMzI5LDAuMzgzYzAuMzcxLDAsMC43NDItMC4wODIsMS4wODctMC4yNWM5LjYxOS00LjY0MywyMy4zMjQtNy4zMDUsMzcuNjAxLTcuMzA1DQoJCWMxNC4yNzUsMCwyNy45ODEsMi42NjIsMzcuNjAzLDcuMzA3YzAuNzc0LDAuMzczLDEuNjg4LDAuMzIyLDIuNDE2LTAuMTM1czEuMTcxLTEuMjU4LDEuMTcxLTIuMTE3VjM5LjU2Nw0KCQljMC0wLjg2MS0wLjQ0Mi0xLjY2LTEuMTcxLTIuMTE3QzEw' +
            'NC4yODksMzYuOTkxLDEwMy4zNzYsMzYuOTQsMTAyLjYwMiwzNy4zMTV6IE0yOC44MTIsODIuNjcxVjc1LjA0DQoJCWM4LjM2OC0wLjk4OCwxNi41OTUtMS42NDgsMjQuNzE5LTEuOTc1Yy0wLjEwNCwwLjQxOC0wLjUxNywwLjkyOC0xLjc3NywxLjQ5NmMtMS43NTksMC43OTMtNC43MzEsMS43My04LjE0NywyLjg3Mw0KCQlDMzkuMjcxLDc4Ljg4MiwzNC4wNDcsODAuNjMyLDI4LjgxMiw4Mi42NzF6IE0xMDEuMTg4LDg2LjYwM2MtOS45MjYtMy45OC0yMi44NTgtNi4yMjUtMzYuMTg5LTYuMjI1DQoJCWMtNi42MDIsMC0xMy4xMDQsMC41NTMtMTkuMTkzLDEuNTkyYzMuMzYtMS4xMjMsNi4wMzgtMi' +
            '4wMjUsNy44NzUtMi43OTVjMy4zODgtMS40MTYsNS40ODktMy43NTYsNS42OTUtNi4yOTENCgkJYzEuNzI3LTAuMDM3LDMuMjkyLTAuMDU1LDUuMDExLTAuMDYxbDAuMDE2LDEuMDc4bDIuOTQ1LTAuMDEybC0wLjAxNC0xLjA2NmMxMS4zMTIsMC4wOCwyMi42OTcsMC44MTYsMzMuODU0LDIuMjExVjg2LjYwM3oNCgkJIE0xMDEuMTg4LDcwLjAwOWMtMS4yMjUtMC4xNDgtMi40NDgtMC4zMDctMy42NzMtMC40NDFjLTAuMDg4LTQuNzIxLDAuMS03Ljc3NSwwLTEzLjE2NmMtMy43NDItMy4wMzUtNS43MDctNC4yODUtOS42NTctNi42MzMNCgkJYy0zLjczNywzLjc3LTUuNTA5LDUuMTM1LTkuMzQsOC4x' +
            'YzAuMDI2LDAuNjg5LDAuMDI2LDkuMzk4LDAuMDI2LDEwLjIzNGMtMy42OTEtMC4xNjItNy40ODYtMC4yODMtMTEuMjAzLTAuMzA3bDAuMDE5LTMuMjYNCgkJYzMuNzY5LTAuNDc3LDYuNTMyLTIuNzAzLDYuNDQxLTUuMzg3Yy0wLjEwMy0zLjAyNy0zLjc1LTUuMjU0LTguMTgxLTUuMjI3Yy00LjQzMiwwLjAyNy04LjAxNSwyLjI3NS03Ljk4OSw1LjI4MQ0KCQljMC4wMjIsMi42NjYsMi45MjcsNC44NjksNi43MjgsNS4zMzZsMC4wMjksMy4yODdjLTExLjY3LDAuMDQzLTIzLjQ1NiwwLjc2Mi0zNS41NzcsMi4xNzZWNDMuMzk3DQoJCWM5LjkyMywzLjk4LDIyLjg1NCw2LjIyNywzNi4xODgsNi4yMj' +
            'djMTMuMzMyLDAsMjYuMjY1LTIuMjQ2LDM2LjE4OS02LjIyN1Y3MC4wMDl6Ii8+DQoJPGc+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik02NC45OTksMi42MzhjLTM0LjQ0MSwwLTYyLjM2MSwyNy45Mi02Mi4zNjEsNjIuMzYzYzAsMzQuNDQxLDI3LjkyLDYyLjM2MSw2Mi4zNjEsNjIuMzYxczYyLjM2My0yNy45Miw2Mi4zNjMtNjIuMzYxDQoJCQlDMTI3LjM2MiwzMC41NTgsOTkuNDQsMi42MzgsNjQuOTk5LDIuNjM4eiBNMTA2LjE4OCw5MC40MzNjMCwwLjg1OS0wLjQ0MiwxLjY2LTEuMTcxLDIuMTE3cy0xLjY0MiwwLjUwOC0yLjQxNiwwLjEzNQ0KCQkJYy05LjYyMS00LjY0NS0yMy4zMjct' +
            'Ny4zMDctMzcuNjAzLTcuMzA3Yy0xNC4yNzYsMC0yNy45ODEsMi42NjItMzcuNjAxLDcuMzA1Yy0wLjM0NSwwLjE2OC0wLjcxNiwwLjI1LTEuMDg3LDAuMjUNCgkJCWMtMC40NjMsMC0wLjkyNS0wLjEyOS0xLjMyOS0wLjM4M2MtMC43MjktMC40NTctMS4xNzEtMS4yNTgtMS4xNzEtMi4xMTdWMzkuNTY3YzAtMC44NjEsMC40NDItMS42NiwxLjE3MS0yLjExNw0KCQkJYzAuNzI5LTAuNDU5LDEuNjQxLTAuNTEsMi40MTYtMC4xMzVjOS42MTgsNC42NDUsMjMuMzIyLDcuMzA5LDM3LjYwMSw3LjMwOWMxNC4yNzcsMCwyNy45ODItMi42NjQsMzcuNjAzLTcuMzA5DQoJCQljMC43NzQtMC4zNzUsMS42OD' +
            'gtMC4zMjQsMi40MTYsMC4xMzVjMC43MjksMC40NTcsMS4xNzEsMS4yNTYsMS4xNzEsMi4xMTdWOTAuNDMzeiIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNNTMuNTMsNzMuMDY1Yy04LjEyNCwwLjMyNi0xNi4zNTEsMC45ODYtMjQuNzE5LDEuOTc1djcuNjMxYzUuMjM1LTIuMDM5LDEwLjQ1OS0zLjc4OSwxNC43OTQtNS4yMzYNCgkJCWMzLjQxNi0xLjE0Myw2LjM4OS0yLjA4LDguMTQ3LTIuODczQzUzLjAxNCw3My45OTMsNTMuNDI2LDczLjQ4Myw1My41Myw3My4wNjV6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0yOC44MTIsNDMuMzk3djI2LjYwNWMxMi4xMjEtMS40MTQs' +
            'MjMuOTA3LTIuMTMzLDM1LjU3Ny0yLjE3NmwtMC4wMjktMy4yODdjLTMuODAxLTAuNDY3LTYuNzA1LTIuNjctNi43MjgtNS4zMzYNCgkJCWMtMC4wMjUtMy4wMDYsMy41NTgtNS4yNTQsNy45ODktNS4yODFjNC40MzEtMC4wMjcsOC4wNzgsMi4xOTksOC4xODEsNS4yMjdjMC4wOTEsMi42ODQtMi42NzMsNC45MS02LjQ0MSw1LjM4N2wtMC4wMTksMy4yNg0KCQkJYzMuNzE3LDAuMDIzLDcuNTEyLDAuMTQ1LDExLjIwMywwLjMwN2MwLTAuODM2LDAtOS41NDUtMC4wMjYtMTAuMjM0YzMuODMxLTIuOTY1LDUuNjAzLTQuMzMsOS4zNC04LjENCgkJCWMzLjk1LDIuMzQ4LDUuOTE1LDMuNTk4LDkuNjU3LD' +
            'YuNjMzYzAuMSw1LjM5MS0wLjA4OCw4LjQ0NSwwLDEzLjE2NmMxLjIyNSwwLjEzNSwyLjQ0OCwwLjI5MywzLjY3MywwLjQ0MVY0My4zOTcNCgkJCWMtOS45MjUsMy45OC0yMi44NTcsNi4yMjctMzYuMTg5LDYuMjI3QzUxLjY2Niw0OS42MjQsMzguNzM0LDQ3LjM3OCwyOC44MTIsNDMuMzk3eiIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNNjcuMzQ4LDczLjg5bC0yLjk0NSwwLjAxMmwtMC4wMTYtMS4wNzhjLTEuNzE5LDAuMDA2LTMuMjg0LDAuMDIzLTUuMDExLDAuMDYxYy0wLjIwNiwyLjUzNS0yLjMwOCw0Ljg3NS01LjY5NSw2LjI5MQ0KCQkJYy0xLjgzNywwLjc3LTQuNTE1LDEuNjcy' +
            'LTcuODc1LDIuNzk1YzYuMDg5LTEuMDM5LDEyLjU5Mi0xLjU5MiwxOS4xOTMtMS41OTJjMTMuMzMxLDAsMjYuMjY0LDIuMjQ0LDM2LjE4OSw2LjIyNVY3NS4wMzQNCgkJCWMtMTEuMTU3LTEuMzk1LTIyLjU0Mi0yLjEzMS0zMy44NTQtMi4yMTFMNjcuMzQ4LDczLjg5eiIvPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K';
        me._rectilinear__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;rectilinear;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "rectilinear";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 32px;';
        hs += 'left : 0px;';
        hs += 'opacity : 0;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : hidden;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._rectilinear.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._rectilinear.logicBlock_alpha = function () {
            var newLogicStateAlpha;
            if (
                (player.getProjection() == 12)
            ) {
                newLogicStateAlpha = 0;
            } else {
                newLogicStateAlpha = -1;
            }
            if (me._rectilinear.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
                me._rectilinear.ggCurrentLogicStateAlpha = newLogicStateAlpha;
                me._rectilinear.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._rectilinear.ggCurrentLogicStateAlpha == 0) {
                    me._rectilinear.style.visibility = me._rectilinear.ggVisible ? 'inherit' : 'hidden';
                    me._rectilinear.style.opacity = 1;
                } else {
                    me._rectilinear.style.visibility = "hidden";
                    me._rectilinear.style.opacity = 0;
                }
            }
        }
        me._rectilinear.onmouseover = function (e) {
            me._rectilinear__img.style.visibility = 'hidden';
            me._rectilinear__imgo.style.visibility = 'inherit';
        }
        me._rectilinear.onmouseout = function (e) {
            me._rectilinear__img.style.visibility = 'inherit';
            me._rectilinear__imgo.style.visibility = 'hidden';
        }
        me._rectilinear.ggUpdatePosition = function (useTransition) {
        }
        me._projection_buttons.appendChild(me._rectilinear);
        el = me._fisheye = document.createElement('div');
        els = me._fisheye__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xIFRpbnkvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtdGlueS5kdGQiIFsNCgk8IUVOVElUWSBuc19mbG93cyAiaHR0cDovL25zLmFkb2JlLmNvbS9GbG93cy8xLjAvIj4NCgk8IUVOVElUWSBuc19leHRlbmQgImh0dHA6Ly9ucy5hZG9iZS' +
            '5jb20vRXh0ZW5zaWJpbGl0eS8xLjAvIj4NCgk8IUVOVElUWSBuc19haSAiaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZUlsbHVzdHJhdG9yLzEwLjAvIj4NCgk8IUVOVElUWSBuc19ncmFwaHMgImh0dHA6Ly9ucy5hZG9iZS5jb20vR3JhcGhzLzEuMC8iPg0KXT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgeG1sbnM6eD0iJm5zX2V4dGVuZDsiIHhtbG5zOmk9IiZuc19haTsiIHhtbG5zOmdyYXBoPSImbnNfZ3JhcGhzOyINCgkgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1s' +
            'bnM6YT0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZVNWR1ZpZXdlckV4dGVuc2lvbnMvMy4wLyINCgkgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIxMzBweCIgaGVpZ2h0PSIxMzBweCIgdmlld0JveD0iMCAwIDEzMCAxMzAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGcgaWQ9IkxheWVyXzEiPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KCTxnPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNNjUsMjMuM0M0MiwyMy4zLDIzLjMsNDIsMjMuMyw2NVM0MiwxMDYuNyw2NSwxMDYuN2MyMywwLDQxLjctMTguNyw0MS43LTQxLjdTODgsMjMuMyw2NSwyMy4zeiBNMzYuNCw4Ni4xDQoJCQljLTAuMi' +
            'wwLjItMS4xLDAuNC0yLjEtMC4xYy0yLjEtMy4xLTMuOC02LjUtNC45LTEwLjJjMS40LDAuOSwzLDEuNyw0LjcsMi40YzAuNywwLjgsMS4zLDEuOCwxLjcsMi44YzAuNiwxLjMsMC45LDIuNywwLjksMy43DQoJCQlDMzYuOCw4NS4zLDM2LjYsODUuOCwzNi40LDg2LjF6IE02NSwxMDIuMmMtMTAuNywwLTIwLjQtNC42LTI3LjItMTEuOWMwLjUtMC4yLDEuMS0wLjUsMS41LTAuOGMwLjgtMC42LDEuMy0xLjQsMS42LTIuMw0KCQkJYzAuMy0wLjgsMC40LTEuNywwLjQtMi42YzAtMS41LTAuMy0zLTAuOS00LjVjMi4yLDAuNSw0LjYsMSw3LDEuM2MxLjIsMC4yLDIuNSwwLjMsMy44LDAuNGMwLDEuNSww' +
            'LjEsMy4xLDAuMSw0LjZsMi43LTAuMQ0KCQkJYy0wLjEtMS40LTAuMS0yLjgtMC4xLTQuM2MzLDAuMiw2LjEsMC4zLDkuMiwwLjNjNy40LDAsMTQuOS0wLjYsMjEuNS0xLjdjMy4zLTAuNiw2LjQtMS4yLDkuMS0yYzIuMy0wLjcsNS4yLTEuOCw3LTIuOQ0KCQkJQzk1LjksOTEuMSw4MS44LDEwMi4yLDY1LDEwMi4yeiBNMTAyLDY5LjRjLTAuNSwwLjYtMS4xLDEuMy0yLDEuOGMtMC43LDAuNC0xLjUsMC44LTIuMywxLjJjMC4zLTcuNSwwLjEtMTIuNy0xLjgtMTkuNg0KCQkJYy0zLjMtNS44LTYuMS04LjctMTEuNi0xM2MtMS45LDIuNC0zLjcsMy43LTkuNSw4LjVjMiw5LjcsMi4xLDE5LDEuOCwyOC' +
            '45Yy00LjQsMC41LTkuMSwwLjctMTMuNywwLjdjLTMuMSwwLTYuMi0wLjEtOS4zLTAuMw0KCQkJYy0wLjEtNC4yLTAuMS04LjMtMC4xLTEyLjVjMC0wLjYsMC0xLjIsMC0xLjdjNy44LTAuOCwxNC4xLTcuNywxMy42LTEzLjRjLTAuNi02LTYuNy05LjItMTMuNS04LjljLTYuOCwwLjMtMTIuMSw0LjQtMTMuMSwxMC4zDQoJCQljLTAuOSw1LjYsMi43LDExLjUsMTAuMywxMmMwLDAuNiwwLDEuMSwwLDEuN2MwLDQuMSwwLDguMiwwLjEsMTIuM2MtMi43LTAuMy01LjItMC42LTcuNi0xLjFjLTIuOS0wLjYtNS41LTEuMy03LjctMi4yDQoJCQljLTIuMi0wLjktNC4xLTEuOC01LjgtMy4xYy0wLjctMC42' +
            'LTEuNC0xLjMtMi0xLjljLTAuMS0xLjMtMC4yLTIuNi0wLjItNGMwLTIwLjUsMTYuNy0zNy4yLDM3LjItMzcuMmMyMC41LDAsMzcuMiwxNi43LDM3LjIsMzcuMg0KCQkJQzEwMi4yLDY2LjUsMTAyLjEsNjgsMTAyLDY5LjR6Ii8+DQoJCTxnPg0KCQkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTTY1LDI3LjhjLTIwLjUsMC0zNy4yLDE2LjctMzcuMiwzNy4yYzAsMS40LDAuMSwyLjcsMC4yLDRjMC42LDAuNiwxLjMsMS40LDIsMS45YzEuNywxLjMsMy42LDIuMiw1LjgsMy4xDQoJCQkJYzIuMiwwLjksNC44LDEuNiw3LjcsMi4yYzIuNCwwLjUsNC45LDAuOCw3LjYsMS4xYy0wLjEtNC4xLTAuMS04Lj' +
            'ItMC4xLTEyLjNjMC0wLjYsMC0xLjEsMC0xLjdjLTcuNS0wLjUtMTEuMi02LjQtMTAuMy0xMg0KCQkJCWMxLTUuOSw2LjMtMTAuMSwxMy4xLTEwLjNjNi44LTAuMywxMi45LDIuOSwxMy41LDguOWMwLjUsNS43LTUuOCwxMi42LTEzLjYsMTMuNGMwLDAuNiwwLDEuMiwwLDEuN2MwLDQuMiwwLDguNCwwLjEsMTIuNQ0KCQkJCWMzLDAuMiw2LjEsMC4zLDkuMywwLjNjNC42LDAsOS4zLTAuMywxMy43LTAuN2MwLjMtOS45LDAuMi0xOS4yLTEuOC0yOC45YzUuOC00LjgsNy41LTYuMSw5LjUtOC41YzUuNSw0LjMsOC4zLDcuMiwxMS42LDEzDQoJCQkJYzEuOSw2LjksMi4yLDEyLjEsMS44LDE5LjZjMC44' +
            'LTAuNCwxLjYtMC44LDIuMy0xLjJjMC44LTAuNSwxLjUtMS4yLDItMS44YzAuMi0xLjUsMC4zLTIuOSwwLjMtNC40DQoJCQkJQzEwMi4yLDQ0LjUsODUuNSwyNy44LDY1LDI3Ljh6Ii8+DQoJCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNMzQuMSw3OC4yYy0xLjctMC43LTMuMy0xLjUtNC43LTIuNGMxLjEsMy43LDIuOCw3LjEsNC45LDEwLjJjMS4xLDAuNSwyLDAuMywyLjEsMC4xYzAuMi0wLjMsMC4zLTAuOCwwLjMtMS40DQoJCQkJYzAtMS0wLjMtMi40LTAuOS0zLjdDMzUuNCw4MCwzNC44LDc5LDM0LjEsNzguMnoiLz4NCgkJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik04NC41LDgwLjdjLT' +
            'YuNiwxLjEtMTQuMSwxLjctMjEuNSwxLjdjLTMuMSwwLTYuMi0wLjEtOS4yLTAuM2MwLDEuNCwwLjEsMi44LDAuMSw0LjNsLTIuNywwLjFjLTAuMS0xLjUtMC4xLTMuMS0wLjEtNC42DQoJCQkJYy0xLjMtMC4xLTIuNS0wLjMtMy44LTAuNGMtMi41LTAuMy00LjgtMC44LTctMS4zYzAuNiwxLjUsMC45LDMsMC45LDQuNWMwLDAuOS0wLjEsMS43LTAuNCwyLjZjLTAuMywwLjgtMC44LDEuNi0xLjYsMi4zDQoJCQkJYy0wLjQsMC40LTEsMC42LTEuNSwwLjhjNi44LDcuMywxNi41LDExLjksMjcuMiwxMS45YzE2LjgsMCwzMC45LTExLjEsMzUuNi0yNi40Yy0xLjgsMS00LjgsMi4yLTcsMi45DQoJCQkJ' +
            'QzkwLjgsNzkuNSw4Ny44LDgwLjIsODQuNSw4MC43eiIvPg0KCQkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTTY1LDguOUMzNCw4LjksOC45LDM0LDguOSw2NWMwLDMxLDI1LjEsNTYuMSw1Ni4xLDU2LjFTMTIxLjEsOTYsMTIxLjEsNjVDMTIxLjEsMzQsOTYsOC45LDY1LDguOXogTTY1LDEwNi43DQoJCQkJQzQyLDEwNi43LDIzLjMsODgsMjMuMyw2NVM0MiwyMy4zLDY1LDIzLjNjMjMsMCw0MS43LDE4LjcsNDEuNyw0MS43Uzg4LDEwNi43LDY1LDEwNi43eiIvPg0KCQk8L2c+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo=';
        me._fisheye__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;fisheye;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._fisheye__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xIFRpbnkvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtdGlueS5kdGQiIFsNCgk8IUVOVElUWSBuc19mbG93cyAiaHR0cDovL25zLmFkb2JlLmNvbS9GbG93cy8xLjAvIj4NCgk8IUVOVElUWSBuc19leHRlbmQgImh0dHA6Ly9ucy5hZG9iZS' +
            '5jb20vRXh0ZW5zaWJpbGl0eS8xLjAvIj4NCgk8IUVOVElUWSBuc19haSAiaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZUlsbHVzdHJhdG9yLzEwLjAvIj4NCgk8IUVOVElUWSBuc19ncmFwaHMgImh0dHA6Ly9ucy5hZG9iZS5jb20vR3JhcGhzLzEuMC8iPg0KXT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgeG1sbnM6eD0iJm5zX2V4dGVuZDsiIHhtbG5zOmk9IiZuc19haTsiIHhtbG5zOmdyYXBoPSImbnNfZ3JhcGhzOyINCgkgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1s' +
            'bnM6YT0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZVNWR1ZpZXdlckV4dGVuc2lvbnMvMy4wLyINCgkgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIxMzBweCIgaGVpZ2h0PSIxMzBweCIgdmlld0JveD0iMCAwIDEzMCAxMzAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGcgaWQ9IkxheWVyXzEiPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KCTxnPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNNjQuOTk5LDE4LjYyMmMtMjUuNTczLDAtNDYuMzc4LDIwLjgwNS00Ni4zNzgsNDYuMzc5czIwLjgwNSw0Ni4zNzksNDYuMzc4LDQ2LjM3OQ0KCQkJYzI1LjU3NCwwLDQ2LjM4LTIwLjgwNSw0Ni4zOC' +
            '00Ni4zNzlTOTAuNTczLDE4LjYyMiw2NC45OTksMTguNjIyeiBNMzMuMjI1LDg4LjQwOWMtMC4yMDgsMC4yNTgtMS4xNzQsMC40NTMtMi4zODMtMC4wODYNCgkJCWMtMi4zNTYtMy40NDEtNC4yMDYtNy4yNTQtNS40NDItMTEuMzMyYzEuNTYxLDEuMDI1LDMuMzEyLDEuOTE0LDUuMjQ0LDIuNjg2YzAuNzY4LDAuOTA0LDEuNDQxLDEuOTg0LDEuOTM5LDMuMDk0DQoJCQljMC42NzYsMS40ODIsMS4wMjMsMy4wMjEsMS4wMTYsNC4xMTFDMzMuNjA0LDg3LjU3MywzMy40Niw4OC4xMTYsMzMuMjI1LDg4LjQwOXogTTY0Ljk5OSwxMDYuMzc5DQoJCQljLTExLjkzOCwwLTIyLjcwNS01LjA4OC0zMC4yNjUt' +
            'MTMuMjAzYzAuNjExLTAuMjExLDEuMTkyLTAuNTEyLDEuNjc5LTAuOTE2YzAuODQyLTAuNjk1LDEuNDAyLTEuNjA1LDEuNzMtMi41MjkNCgkJCWMwLjMzLTAuOTMsMC40NTQtMS44ODcsMC40NTYtMi44NWMtMC4wMDctMS42Ni0wLjM4NC0zLjM2OS0xLjAxMy01LjA0OWMyLjQ2NSwwLjU5Miw1LjA4NCwxLjA3LDcuODE2LDEuNDQ5DQoJCQljMS4zNzEsMC4xODksMi43NywwLjM1NCw0LjE5LDAuNDk0YzAuMDQ4LDEuNjk3LDAuMDk5LDMuMzk1LDAuMTYyLDUuMDkybDIuOTk4LTAuMTExYy0wLjA2LTEuNTc4LTAuMTA2LTMuMTYtMC4xNTEtNC43NA0KCQkJYzMuMzMsMC4yNDQsNi43MzgsMC4zNzUsMT' +
            'AuMTcyLDAuMzc1YzguMjUsMCwxNi41NzQtMC42NywyMy44OTItMS44OThjMy42NTktMC42MTMsNy4wNjctMS4zNjcsMTAuMTAxLTIuMjU2DQoJCQljMi41MzEtMC43NDQsNS43ODMtMi4wMzcsNy44MTMtMy4xNzJDOTkuNDAzLDk0LjAxNCw4My42MiwxMDYuMzc5LDY0Ljk5OSwxMDYuMzc5eiBNMTA2LjA3Nyw2OS45MTUNCgkJCWMtMC41NCwwLjY5My0xLjI1OCwxLjQyNC0yLjE4MSwxLjk5NmMtMC43NiwwLjQ3MS0xLjYxNCwwLjkxLTIuNTA5LDEuMzJjMC4zNzktOC4zMDcsMC4xNC0xNC4wOTItMi4wMjEtMjEuNzQ4DQoJCQljLTMuNzAxLTYuNDQ3LTYuNzM5LTkuNjg4LTEyLjg4NC0xNC40NjFj' +
            'LTIuMTU3LDIuNjY4LTQuMDg2LDQuMTM5LTEwLjUxNCw5LjQ0M2MyLjI3OCwxMC44MTgsMi4zNDEsMjEuMTY2LDIuMDIxLDMyLjEzMw0KCQkJYy00LjkxLDAuNTA4LTEwLjA3NywwLjc5My0xNS4yMTYsMC43OTNjLTMuNDg1LDAtNi45NDUtMC4xMzEtMTAuMjkxLTAuMzg5Yy0wLjA5NC00LjYzOS0wLjE0LTkuMjc5LTAuMTQtMTMuOTIyDQoJCQljMC0wLjY0OCwwLjAwNy0xLjI5NywwLjAwOC0xLjk0NWM4LjY5MS0wLjksMTUuNy04LjU0MywxNS4wOTMtMTQuODczYy0wLjY0My02LjY4OS03LjQ1NS0xMC4yMjctMTQuOTgtOS45NDUNCgkJCWMtNy41MjcsMC4yODEtMTMuNDE0LDQuODk1LTE0LjUxNy' +
            'wxMS41MDJjLTEuMDQyLDYuMjQ2LDMuMDUsMTIuNzU0LDExLjQwNCwxMy4zNjFjLTAuMDAxLDAuNjMzLTAuMDA4LDEuMjY4LTAuMDA4LDEuOQ0KCQkJYzAuMDAxLDQuNTQ5LDAuMDQ0LDkuMSwwLjEzMywxMy42NWMtMi45NDctMC4zMDctNS43NzYtMC43MTctOC40MDEtMS4yNDhjLTMuMjAzLTAuNjQ4LTYuMTA5LTEuNDY5LTguNTY1LTIuNDQ1DQoJCQljLTIuNDU4LTAuOTc1LTQuNTc3LTEuOTc1LTYuNDUxLTMuNDczYy0wLjc2Ni0wLjYxMy0xLjU0Mi0xLjQtMi4xOTUtMi4xMTdjLTAuMTU3LTEuNDYzLTAuMjQyLTIuOTQ1LTAuMjQyLTQuNDQ3DQoJCQljMC0yMi44MTYsMTguNTYyLTQxLjM3OSw0' +
            'MS4zNzgtNDEuMzc5YzIyLjgxNywwLDQxLjM4LDE4LjU2Miw0MS4zOCw0MS4zNzlDMTA2LjM3OSw2Ni42NjUsMTA2LjI2OSw2OC4zMDEsMTA2LjA3Nyw2OS45MTV6Ii8+DQoJCTxnPg0KCQkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTTY0Ljk5OSwyMy42MjJjLTIyLjgxNSwwLTQxLjM3OCwxOC41NjItNDEuMzc4LDQxLjM3OWMwLDEuNTAyLDAuMDg1LDIuOTg0LDAuMjQyLDQuNDQ3DQoJCQkJYzAuNjUzLDAuNzE3LDEuNDMsMS41MDQsMi4xOTUsMi4xMTdjMS44NzQsMS40OTgsMy45OTMsMi40OTgsNi40NTEsMy40NzNjMi40NTYsMC45NzcsNS4zNjIsMS43OTcsOC41NjUsMi40NDUNCgkJCQljMi' +
            '42MjUsMC41MzEsNS40NTQsMC45NDEsOC40MDEsMS4yNDhjLTAuMDg5LTQuNTUxLTAuMTMyLTkuMTAyLTAuMTMzLTEzLjY1YzAtMC42MzMsMC4wMDctMS4yNjgsMC4wMDgtMS45DQoJCQkJYy04LjM1NC0wLjYwNy0xMi40NDYtNy4xMTUtMTEuNDA0LTEzLjM2MWMxLjEwMy02LjYwNyw2Ljk4OS0xMS4yMjEsMTQuNTE3LTExLjUwMmM3LjUyNS0wLjI4MSwxNC4zMzgsMy4yNTYsMTQuOTgsOS45NDUNCgkJCQljMC42MDcsNi4zMy02LjQwMSwxMy45NzMtMTUuMDkzLDE0Ljg3M2MtMC4wMDEsMC42NDgtMC4wMDgsMS4yOTctMC4wMDgsMS45NDVjMCw0LjY0MywwLjA0Niw5LjI4MywwLjE0LDEzLjkyMg0K' +
            'CQkJCWMzLjM0NiwwLjI1OCw2LjgwNiwwLjM4OSwxMC4yOTEsMC4zODljNS4xMzksMCwxMC4zMDYtMC4yODUsMTUuMjE2LTAuNzkzYzAuMzItMTAuOTY3LDAuMjU4LTIxLjMxNC0yLjAyMS0zMi4xMzMNCgkJCQljNi40MjgtNS4zMDUsOC4zNTYtNi43NzUsMTAuNTE0LTkuNDQzYzYuMTQ1LDQuNzczLDkuMTgzLDguMDE0LDEyLjg4NCwxNC40NjFjMi4xNiw3LjY1NiwyLjM5OSwxMy40NDEsMi4wMjEsMjEuNzQ4DQoJCQkJYzAuODk1LTAuNDEsMS43NDktMC44NSwyLjUwOS0xLjMyYzAuOTIzLTAuNTcyLDEuNjQxLTEuMzAzLDIuMTgxLTEuOTk2YzAuMTkxLTEuNjEzLDAuMzAyLTMuMjUsMC4zMDItNC' +
            '45MTQNCgkJCQlDMTA2LjM3OSw0Mi4xODQsODcuODE2LDIzLjYyMiw2NC45OTksMjMuNjIyeiIvPg0KCQkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTTMwLjY0NCw3OS42NzZjLTEuOTMyLTAuNzcxLTMuNjg0LTEuNjYtNS4yNDQtMi42ODZjMS4yMzYsNC4wNzgsMy4wODYsNy44OTEsNS40NDIsMTEuMzMyDQoJCQkJYzEuMjA5LDAuNTM5LDIuMTc1LDAuMzQ0LDIuMzgzLDAuMDg2YzAuMjM1LTAuMjkzLDAuMzc5LTAuODM2LDAuMzc0LTEuNTI3YzAuMDA4LTEuMDktMC4zNC0yLjYyOS0xLjAxNi00LjExMQ0KCQkJCUMzMi4wODUsODEuNjYxLDMxLjQxMSw4MC41ODEsMzAuNjQ0LDc5LjY3NnoiLz4N' +
            'CgkJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik04Ni42NjYsODIuNDkzYy03LjMxNywxLjIyOS0xNS42NDIsMS44OTgtMjMuODkyLDEuODk4Yy0zLjQzNCwwLTYuODQyLTAuMTMxLTEwLjE3Mi0wLjM3NQ0KCQkJCWMwLjA0NSwxLjU4LDAuMDkyLDMuMTYyLDAuMTUxLDQuNzRsLTIuOTk4LDAuMTExYy0wLjA2My0xLjY5Ny0wLjExNC0zLjM5NS0wLjE2Mi01LjA5MmMtMS40MjEtMC4xNDEtMi44MTktMC4zMDUtNC4xOS0wLjQ5NA0KCQkJCWMtMi43MzItMC4zNzktNS4zNTItMC44NTctNy44MTYtMS40NDljMC42MjksMS42OCwxLjAwNiwzLjM4OSwxLjAxMyw1LjA0OWMtMC4wMDIsMC45NjMtMC4xMj' +
            'YsMS45Mi0wLjQ1NiwyLjg1DQoJCQkJYy0wLjMyOCwwLjkyNC0wLjg4OSwxLjgzNC0xLjczLDIuNTI5Yy0wLjQ4NiwwLjQwNC0xLjA2NywwLjcwNS0xLjY3OSwwLjkxNmM3LjU2LDguMTE1LDE4LjMyNywxMy4yMDMsMzAuMjY1LDEzLjIwMw0KCQkJCWMxOC42MjEsMCwzNC40MDQtMTIuMzY1LDM5LjU4MS0yOS4zMTRjLTIuMDMsMS4xMzUtNS4yODIsMi40MjgtNy44MTMsMy4xNzJDOTMuNzMzLDgxLjEyNSw5MC4zMjUsODEuODc5LDg2LjY2Niw4Mi40OTN6Ii8+DQoJCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNNjQuOTk5LDIuNjM3QzMwLjU1OCwyLjYzNywyLjYzOCwzMC41NTcsMi42MzgsNjVj' +
            'MCwzNC40NDEsMjcuOTIsNjIuMzYxLDYyLjM2MSw2Mi4zNjFTMTI3LjM2Miw5OS40NDIsMTI3LjM2Miw2NQ0KCQkJCUMxMjcuMzYyLDMwLjU1Nyw5OS40NCwyLjYzNyw2NC45OTksMi42Mzd6IE02NC45OTksMTExLjM3OWMtMjUuNTczLDAtNDYuMzc4LTIwLjgwNS00Ni4zNzgtNDYuMzc5czIwLjgwNS00Ni4zNzksNDYuMzc4LTQ2LjM3OQ0KCQkJCWMyNS41NzQsMCw0Ni4zOCwyMC44MDUsNDYuMzgsNDYuMzc5UzkwLjU3MywxMTEuMzc5LDY0Ljk5OSwxMTEuMzc5eiIvPg0KCQk8L2c+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo=';
        me._fisheye__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;fisheye;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "fisheye";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 32px;';
        hs += 'left : 0px;';
        hs += 'opacity : 0;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : hidden;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._fisheye.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._fisheye.logicBlock_alpha = function () {
            var newLogicStateAlpha;
            if (
                (player.getProjection() == 9)
            ) {
                newLogicStateAlpha = 0;
            } else {
                newLogicStateAlpha = -1;
            }
            if (me._fisheye.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
                me._fisheye.ggCurrentLogicStateAlpha = newLogicStateAlpha;
                me._fisheye.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._fisheye.ggCurrentLogicStateAlpha == 0) {
                    me._fisheye.style.visibility = me._fisheye.ggVisible ? 'inherit' : 'hidden';
                    me._fisheye.style.opacity = 1;
                } else {
                    me._fisheye.style.visibility = "hidden";
                    me._fisheye.style.opacity = 0;
                }
            }
        }
        me._fisheye.onmouseover = function (e) {
            me._fisheye__img.style.visibility = 'hidden';
            me._fisheye__imgo.style.visibility = 'inherit';
        }
        me._fisheye.onmouseout = function (e) {
            me._fisheye__img.style.visibility = 'inherit';
            me._fisheye__imgo.style.visibility = 'hidden';
        }
        me._fisheye.ggUpdatePosition = function (useTransition) {
        }
        me._projection_buttons.appendChild(me._fisheye);
        el = me._stereographic = document.createElement('div');
        els = me._stereographic__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xIFRpbnkvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtdGlueS5kdGQiIFsNCgk8IUVOVElUWSBuc19mbG93cyAiaHR0cDovL25zLmFkb2JlLmNvbS9GbG93cy8xLjAvIj4NCgk8IUVOVElUWSBuc19leHRlbmQgImh0dHA6Ly9ucy5hZG9iZS' +
            '5jb20vRXh0ZW5zaWJpbGl0eS8xLjAvIj4NCgk8IUVOVElUWSBuc19haSAiaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZUlsbHVzdHJhdG9yLzEwLjAvIj4NCgk8IUVOVElUWSBuc19ncmFwaHMgImh0dHA6Ly9ucy5hZG9iZS5jb20vR3JhcGhzLzEuMC8iPg0KXT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgeG1sbnM6eD0iJm5zX2V4dGVuZDsiIHhtbG5zOmk9IiZuc19haTsiIHhtbG5zOmdyYXBoPSImbnNfZ3JhcGhzOyINCgkgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1s' +
            'bnM6YT0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZVNWR1ZpZXdlckV4dGVuc2lvbnMvMy4wLyINCgkgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIxMzBweCIgaGVpZ2h0PSIxMzBweCIgdmlld0JveD0iMCAwIDEzMCAxMzAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGcgaWQ9IkxheWVyXzEiPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KCTxnPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNOTEuMSw2NWMwLTExLjgtNy44LTIxLjctMTguNS0yNWMyLjQtNS44LDYuMi0xMS41LDYuMi0xMS41cy0yLjItNC44LTYuOC05LjJjLTQuMy00LjEtNy4yLTUuMy03LjYtNS41bDAsMA0KCQkJYzAsMC' +
            'wwLDAsMCwwYzAsMCwwLDAsMCwwbDAsMGMtMC40LDAuMi0zLjMsMS40LTcuNSw1LjZjLTQuNiw0LjUtNi42LDkuNC02LjYsOS40czMuOSw1LjcsNi40LDExLjVjLTYuMSwyLjEtMTEuMSw2LjMtMTQuMywxMS44DQoJCQljLTIuNi0xLjEtNC45LTEuOS02LjktMi40YzAuMi0zLjYtMi42LTcuNi02LjYtOS4xYy00LjUtMS42LTkuMiwxLjItMTAuNCw1LjljLTEuMiw0LjYsMS41LDkuMyw2LjIsMTAuMWM0LDAuNyw4LjMtMS4zLDEwLTQuMw0KCQkJYzEuNywwLjQsMy45LDEuMiw2LjQsMi4yYy0xLjQsMy4yLTIuMiw2LjgtMi4yLDEwLjVjMCwxNC40LDExLjcsMjYuMSwyNi4xLDI2LjFTOTEuMSw3OS40' +
            'LDkxLjEsNjV6IE00My40LDY0LjcNCgkJCWMwLTMsMC43LTUuOCwxLjgtOC40YzAuOCwwLjQsMS42LDAuOCwyLjQsMS4ybDEuMi0yLjRjLTAuOC0wLjQtMS42LTAuOC0yLjQtMS4yYzMuOC02LjMsMTAuNy0xMC41LDE4LjYtMTAuNQ0KCQkJYzExLjksMCwyMS42LDkuNywyMS42LDIxLjZjMCwxMC41LTcuNSwxOS4yLTE3LjQsMjEuMmMwLjEtMC4yLDAuMi0wLjQsMC4yLTAuNWMyLjEtNS42LTMuMS04LjEtNi41LTkuN2MtMS43LTAuOC0zLjQtMS42LTQuNi0yLjcNCgkJCWMtMS4xLTEuMS0yLjItMi42LTMuMi00LjFjLTIuMS0zLTQuMi02LjItNy43LTYuMmMtMC45LDAtMS44LDAuMi0yLjcsMC42Qz' +
            'Q0LjQsNjMuOCw0My45LDY0LjIsNDMuNCw2NC43eiBNNTEuMSw4MS42DQoJCQljLTMuMy0yLjYtNS40LTguOS01LTEyLjRjMC4xLTAuOSwwLjQtMS40LDAuNS0xLjVjMC4zLTAuMSwwLjYtMC4yLDAuOC0wLjJjMS4yLDAsMi43LDIuMiw0LDQuMmMxLjEsMS43LDIuMywzLjQsMy44LDQuOQ0KCQkJYzEuNiwxLjUsMy44LDIuNiw1LjcsMy41YzQuMywyLDQuNywyLjcsNC4yLDQuMWMtMC40LDEtMi41LDEuMS0zLjIsMS4xQzU4LjYsODUuMiw1My43LDgzLjYsNTEuMSw4MS42eiIvPg0KCQk8Zz4NCgkJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik02NSw0My40Yy03LjksMC0xNC44LDQuMi0xOC42LDEw' +
            'LjVjMC44LDAuNCwxLjYsMC44LDIuNCwxLjJsLTEuMiwyLjRjLTAuOC0wLjQtMS42LTAuOC0yLjQtMS4yDQoJCQkJYy0xLjEsMi42LTEuOCw1LjQtMS44LDguNGMwLjUtMC41LDEtMC44LDEuNS0xLjFjMC45LTAuNCwxLjgtMC42LDIuNy0wLjZjMy42LDAsNS43LDMuMSw3LjcsNi4yYzEsMS41LDIsMywzLjIsNC4xDQoJCQkJYzEuMSwxLjEsMi45LDEuOSw0LjYsMi43YzMuNCwxLjYsOC41LDQuMSw2LjUsOS43Yy0wLjEsMC4yLTAuMSwwLjMtMC4yLDAuNWM5LjktMiwxNy40LTEwLjcsMTcuNC0yMS4yDQoJCQkJQzg2LjYsNTMuMSw3Ni45LDQzLjQsNjUsNDMuNHoiLz4NCgkJCTxwYXRoIGZpbGw9Ii' +
            'MwMDAwMDAiIGQ9Ik02NSw4LjlDMzQsOC45LDguOSwzNCw4LjksNjVTMzQsMTIxLjEsNjUsMTIxLjFjMzEsMCw1Ni4xLTI1LjEsNTYuMS01Ni4xUzk2LDguOSw2NSw4Ljl6IE02NSw5MS4xDQoJCQkJYy0xNC40LDAtMjYuMS0xMS43LTI2LjEtMjYuMWMwLTMuNywwLjgtNy4zLDIuMi0xMC41Yy0yLjYtMS4xLTQuNy0xLjgtNi40LTIuMmMtMS43LDMtNS45LDQuOS0xMCw0LjNjLTQuNy0wLjgtNy40LTUuNS02LjItMTAuMQ0KCQkJCWMxLjItNC42LDUuOS03LjUsMTAuNC01LjljNCwxLjUsNi44LDUuNSw2LjYsOS4xYzIsMC41LDQuMywxLjMsNi45LDIuNGMzLjEtNS41LDguMi05LjcsMTQuMy0xMS44' +
            'Yy0yLjYtNS44LTYuNC0xMS41LTYuNC0xMS41DQoJCQkJczIuMS00LjgsNi42LTkuNGM0LjItNC4yLDcuMS01LjUsNy41LTUuNmwwLDBjMCwwLDAsMCwwLDBjMCwwLDAsMCwwLDBsMCwwYzAuNCwwLjIsMy4zLDEuNCw3LjYsNS41YzQuNiw0LjQsNi44LDkuMiw2LjgsOS4yDQoJCQkJcy0zLjcsNS43LTYuMiwxMS41YzEwLjcsMy4zLDE4LjUsMTMuMiwxOC41LDI1QzkxLjEsNzkuNCw3OS40LDkxLjEsNjUsOTEuMXoiLz4NCgkJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik02MS4xLDgwLjFjLTEuOS0wLjktNC4xLTEuOS01LjctMy41Yy0xLjUtMS40LTIuNy0zLjItMy44LTQuOWMtMS4zLTItMi44LT' +
            'QuMi00LTQuMmMtMC4yLDAtMC41LDAuMS0wLjgsMC4yDQoJCQkJYy0wLjIsMC4xLTAuNCwwLjUtMC41LDEuNWMtMC40LDMuNSwxLjcsOS44LDUsMTIuNGMyLjUsMiw3LjQsMy43LDEwLjksMy43YzAuNywwLDIuOC0wLjEsMy4yLTEuMUM2NS44LDgyLjcsNjUuMyw4Mi4xLDYxLjEsODAuMQ0KCQkJCXoiLz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K';
        me._stereographic__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;stereographic;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._stereographic__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xIFRpbnkvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtdGlueS5kdGQiIFsNCgk8IUVOVElUWSBuc19mbG93cyAiaHR0cDovL25zLmFkb2JlLmNvbS9GbG93cy8xLjAvIj4NCgk8IUVOVElUWSBuc19leHRlbmQgImh0dHA6Ly9ucy5hZG9iZS' +
            '5jb20vRXh0ZW5zaWJpbGl0eS8xLjAvIj4NCgk8IUVOVElUWSBuc19haSAiaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZUlsbHVzdHJhdG9yLzEwLjAvIj4NCgk8IUVOVElUWSBuc19ncmFwaHMgImh0dHA6Ly9ucy5hZG9iZS5jb20vR3JhcGhzLzEuMC8iPg0KXT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgeG1sbnM6eD0iJm5zX2V4dGVuZDsiIHhtbG5zOmk9IiZuc19haTsiIHhtbG5zOmdyYXBoPSImbnNfZ3JhcGhzOyINCgkgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1s' +
            'bnM6YT0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZVNWR1ZpZXdlckV4dGVuc2lvbnMvMy4wLyINCgkgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIxMzBweCIgaGVpZ2h0PSIxMzBweCIgdmlld0JveD0iMCAwIDEzMCAxMzAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGcgaWQ9IkxheWVyXzEiPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KCTxnPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNOTQuMDQ2LDY0Ljk5OWMwLTEzLjA3NC04LjY4NS0yNC4xNTUtMjAuNTg3LTI3Ljc4NmMyLjcxOS02LjQ1Nyw2Ljg1Ny0xMi44MzIsNi44NTctMTIuODMyDQoJCQlzLTIuNDE2LTUuMzMtNy41ODUtMT' +
            'AuMjQ2Yy00LjgxLTQuNTc4LTguMDUtNS45NDEtOC40NzYtNi4xMDhsMC4wMDEtMC4wMTljMCwwLTAuMDEyLDAuMDA0LTAuMDI1LDAuMDExDQoJCQljLTAuMDE0LTAuMDA2LTAuMDI0LTAuMDA5LTAuMDI0LTAuMDA5bDAuMDAxLDAuMDE5Yy0wLjQyMiwwLjE3NS0zLjYzNCwxLjYwNC04LjM1LDYuMjc5Yy01LjA2NSw1LjAyMS03LjM3MiwxMC4zOTktNy4zNzIsMTAuMzk5DQoJCQlzNC4zMTYsNi4zNjEsNy4xNjYsMTIuNzk4Yy02LjczOSwyLjI5OC0xMi4zNjksNy4wMDUtMTUuODYsMTMuMDkzYy0yLjg0NS0xLjE4My01LjQ2OC0yLjA5NC03LjY0NS0yLjY0Ng0KCQkJYzAuMjU0LTMuOTU2LTIuODYt' +
            'OC40NTctNy4zNTctMTAuMDc0Yy00Ljk4Ny0xLjc5NS0xMC4xOTUsMS4zMzgtMTEuNTIyLDYuNTAzYy0xLjMyOCw1LjE2NSwxLjcwNSwxMC4zODYsNi44OTksMTEuMjI2DQoJCQljNC40OTcsMC43MjksOS4yMDItMS40NDQsMTEuMTEtNC43NzJjMS44NzMsMC40Nyw0LjMxMywxLjI4MSw3LjE1MywyLjQ0OWMtMS41ODcsMy41ODctMi40NzcsNy41NDktMi40NzcsMTEuNzE2DQoJCQljMCwxNi4wMTcsMTMuMDMsMjkuMDQ3LDI5LjA0NiwyOS4wNDdTOTQuMDQ2LDgxLjAxNiw5NC4wNDYsNjQuOTk5eiBNNDAuOTYzLDY0LjY1M2MwLjA0Ny0zLjMxNSwwLjc2OC02LjQ3LDIuMDMyLTkuMzMzDQoJCQljMC' +
            '44NTYsMC40MSwxLjczMSwwLjg0MiwyLjYyOSwxLjMwNWwxLjM3NS0yLjY2NmMtMC44OC0wLjQ1NC0xLjc1Ni0wLjg4OS0yLjYyNC0xLjMwNmM0LjIwNy03LjAwMywxMS44NzctMTEuNywyMC42MjUtMTEuNw0KCQkJYzEzLjI1OSwwLDI0LjA0NiwxMC43ODcsMjQuMDQ2LDI0LjA0NmMwLDExLjYzNi04LjMwOCwyMS4zNjYtMTkuMzAzLDIzLjU3NWMwLjA5Ny0wLjE5OSwwLjE4MS0wLjM5MywwLjI0NS0wLjU3DQoJCQljMi4yOS02LjI3LTMuNDI3LTguOTgtNy4yMDktMTAuNzc0Yy0xLjg4Ni0wLjg5NS0zLjgzNS0xLjgxOS01LjA3Mi0yLjk4OGMtMS4yNzMtMS4yMDQtMi40My0yLjkxNC0zLjU0Ny00' +
            'LjU2OA0KCQkJYy0yLjI4My0zLjM4LTQuNjQ0LTYuODc0LTguNjA4LTYuODc0Yy0wLjk3MiwwLTEuOTY0LDAuMjI5LTIuOTUsMC42NzlDNDIuMDc2LDYzLjcxOCw0MS40OTksNjQuMDkxLDQwLjk2Myw2NC42NTN6IE00OS41OTcsODMuNDENCgkJCWMtMy42NDUtMi45MjEtNi4wMDMtOS45MTktNS41MjUtMTMuNzY1YzAuMTMtMS4wNDQsMC40MzUtMS41NCwwLjYwOC0xLjYyYzAuMzMtMC4xNSwwLjYyMy0wLjIyNywwLjg3Mi0wLjIyNw0KCQkJYzEuMzA5LDAsMi45ODUsMi40ODIsNC40NjUsNC42NzNjMS4yNywxLjg3OSwyLjU4MiwzLjgyMSw0LjI1Niw1LjQwM2MxLjgxMiwxLjcxNCw0LjIzLDIuOD' +
            'YsNi4zNjQsMy44NzINCgkJCWM0Ljc0OCwyLjI1Miw1LjIzNSwyLjk1Miw0LjY1NCw0LjU0MWMtMC40MTIsMS4xMy0yLjgyMywxLjIxOC0zLjU1MywxLjIxOEM1Ny44NjEsODcuNTA2LDUyLjQxNCw4NS42NjgsNDkuNTk3LDgzLjQxeiIvPg0KCQk8Zz4NCgkJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik02NSw0MC45NTNjLTguNzQ4LDAtMTYuNDE4LDQuNjk3LTIwLjYyNSwxMS43YzAuODY4LDAuNDE3LDEuNzQ0LDAuODUyLDIuNjI0LDEuMzA2bC0xLjM3NSwyLjY2Ng0KCQkJCWMtMC44OTctMC40NjMtMS43NzItMC44OTUtMi42MjktMS4zMDVjLTEuMjY1LDIuODYzLTEuOTg1LDYuMDE4LTIuMDMy' +
            'LDkuMzMzYzAuNTM2LTAuNTYyLDEuMTEzLTAuOTM2LDEuNjM5LTEuMTc2DQoJCQkJYzAuOTg2LTAuNDUsMS45NzktMC42NzksMi45NS0wLjY3OWMzLjk2NSwwLDYuMzI1LDMuNDk0LDguNjA4LDYuODc0YzEuMTE3LDEuNjU0LDIuMjczLDMuMzY0LDMuNTQ3LDQuNTY4DQoJCQkJYzEuMjM3LDEuMTY5LDMuMTg3LDIuMDk0LDUuMDcyLDIuOTg4YzMuNzgyLDEuNzk0LDkuNDk5LDQuNTA1LDcuMjA5LDEwLjc3NGMtMC4wNjQsMC4xNzgtMC4xNDgsMC4zNzEtMC4yNDUsMC41Nw0KCQkJCWMxMC45OTUtMi4yMDksMTkuMzAzLTExLjkzOSwxOS4zMDMtMjMuNTc1Qzg5LjA0Niw1MS43NCw3OC4yNTksNDAuOT' +
            'UzLDY1LDQwLjk1M3oiLz4NCgkJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik02NSwyLjYzOGMtMzQuNDQyLDAtNjIuMzYyLDI3LjkyMi02Mi4zNjIsNjIuMzYzUzMwLjU1OCwxMjcuMzYyLDY1LDEyNy4zNjJjMzQuNDQxLDAsNjIuMzYyLTI3LjkyLDYyLjM2Mi02Mi4zNjENCgkJCQlTOTkuNDQxLDIuNjM4LDY1LDIuNjM4eiBNNjUsOTQuMDQ2Yy0xNi4wMTYsMC0yOS4wNDYtMTMuMDMtMjkuMDQ2LTI5LjA0N2MwLTQuMTY3LDAuODktOC4xMjksMi40NzctMTEuNzE2DQoJCQkJYy0yLjg0LTEuMTY4LTUuMjgtMS45NzktNy4xNTMtMi40NDljLTEuOTA4LDMuMzI4LTYuNjEzLDUuNTAxLTExLjExLDQu' +
            'NzcyYy01LjE5NC0wLjg0LTguMjI4LTYuMDYxLTYuODk5LTExLjIyNg0KCQkJCWMxLjMyNy01LjE2NSw2LjUzNS04LjI5OCwxMS41MjItNi41MDNjNC40OTcsMS42MTcsNy42MTEsNi4xMTgsNy4zNTcsMTAuMDc0YzIuMTc3LDAuNTUyLDQuOCwxLjQ2Myw3LjY0NSwyLjY0Ng0KCQkJCWMzLjQ5MS02LjA4OCw5LjEyMS0xMC43OTUsMTUuODYtMTMuMDkzYy0yLjg1LTYuNDM3LTcuMTY2LTEyLjc5OC03LjE2Ni0xMi43OThzMi4zMDctNS4zNzgsNy4zNzItMTAuMzk5DQoJCQkJYzQuNzE2LTQuNjc1LDcuOTI4LTYuMTA0LDguMzUtNi4yNzlMNjQuMjA3LDguMDFjMCwwLDAuMDExLDAuMDAzLDAuMDI0LD' +
            'AuMDA5YzAuMDE0LTAuMDA3LDAuMDI1LTAuMDExLDAuMDI1LTAuMDExbC0wLjAwMSwwLjAxOQ0KCQkJCWMwLjQyNiwwLjE2NywzLjY2NiwxLjUzLDguNDc2LDYuMTA4YzUuMTY5LDQuOTE2LDcuNTg1LDEwLjI0Niw3LjU4NSwxMC4yNDZzLTQuMTM5LDYuMzc1LTYuODU3LDEyLjgzMg0KCQkJCWMxMS45MDIsMy42MzEsMjAuNTg3LDE0LjcxMiwyMC41ODcsMjcuNzg2Qzk0LjA0Niw4MS4wMTYsODEuMDE2LDk0LjA0Niw2NSw5NC4wNDZ6Ii8+DQoJCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNNjAuNjM3LDgxLjc0N2MtMi4xMzQtMS4wMTItNC41NTItMi4xNTgtNi4zNjQtMy44NzJjLTEuNjc0LTEu' +
            'NTgyLTIuOTg2LTMuNTI0LTQuMjU2LTUuNDAzDQoJCQkJYy0xLjQ3OS0yLjE5LTMuMTU2LTQuNjczLTQuNDY1LTQuNjczYy0wLjI0OSwwLTAuNTQyLDAuMDc2LTAuODcyLDAuMjI3Yy0wLjE3NCwwLjA4LTAuNDc5LDAuNTc2LTAuNjA4LDEuNjINCgkJCQljLTAuNDc4LDMuODQ2LDEuODgxLDEwLjg0NCw1LjUyNSwxMy43NjVjMi44MTcsMi4yNTgsOC4yNjUsNC4wOTYsMTIuMTQyLDQuMDk2YzAuNzI5LDAsMy4xNDEtMC4wODgsMy41NTMtMS4yMTgNCgkJCQlDNjUuODcyLDg0LjY5OSw2NS4zODUsODMuOTk5LDYwLjYzNyw4MS43NDd6Ii8+DQoJCTwvZz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==';
        me._stereographic__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;stereographic;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "stereographic";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 32px;';
        hs += 'left : 0px;';
        hs += 'opacity : 0;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : hidden;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._stereographic.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._stereographic.logicBlock_alpha = function () {
            var newLogicStateAlpha;
            if (
                (player.getProjection() == 4)
            ) {
                newLogicStateAlpha = 0;
            } else {
                newLogicStateAlpha = -1;
            }
            if (me._stereographic.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
                me._stereographic.ggCurrentLogicStateAlpha = newLogicStateAlpha;
                me._stereographic.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._stereographic.ggCurrentLogicStateAlpha == 0) {
                    me._stereographic.style.visibility = me._stereographic.ggVisible ? 'inherit' : 'hidden';
                    me._stereographic.style.opacity = 1;
                } else {
                    me._stereographic.style.visibility = "hidden";
                    me._stereographic.style.opacity = 0;
                }
            }
        }
        me._stereographic.onmouseover = function (e) {
            me._stereographic__img.style.visibility = 'hidden';
            me._stereographic__imgo.style.visibility = 'inherit';
        }
        me._stereographic.onmouseout = function (e) {
            me._stereographic__img.style.visibility = 'inherit';
            me._stereographic__imgo.style.visibility = 'hidden';
        }
        me._stereographic.ggUpdatePosition = function (useTransition) {
        }
        me._projection_buttons.appendChild(me._stereographic);
        me._controller_slider.appendChild(me._projection_buttons);
        el = me._thumbnail = document.createElement('div');
        el.ggPermeable = false;
        el.ggId = "thumbnail";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_container ";
        el.ggType = 'container';
        hs = '';
        hs += 'height : 32px;';
        hs += 'left : 128px;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : hidden;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._thumbnail.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._thumbnail.logicBlock_position = function () {
            var newLogicStatePosition;
            if (
                (player.getVariableValue('pos_thumbnail') == 0)
            ) {
                newLogicStatePosition = 0;
            } else if (
                (player.getVariableValue('pos_thumbnail') == 1)
            ) {
                newLogicStatePosition = 1;
            } else if (
                (player.getVariableValue('pos_thumbnail') == 2)
            ) {
                newLogicStatePosition = 2;
            } else if (
                (player.getVariableValue('pos_thumbnail') == 3)
            ) {
                newLogicStatePosition = 3;
            } else if (
                (player.getVariableValue('pos_thumbnail') == 4)
            ) {
                newLogicStatePosition = 4;
            } else {
                newLogicStatePosition = -1;
            }
            if (me._thumbnail.ggCurrentLogicStatePosition != newLogicStatePosition) {
                me._thumbnail.ggCurrentLogicStatePosition = newLogicStatePosition;
                me._thumbnail.style[domTransition] = 'left 0s, top 0s';
                if (me._thumbnail.ggCurrentLogicStatePosition == 0) {
                    me._thumbnail.style.left = '0px';
                    me._thumbnail.style.top = '0px';
                } else if (me._thumbnail.ggCurrentLogicStatePosition == 1) {
                    me._thumbnail.style.left = '32px';
                    me._thumbnail.style.top = '0px';
                } else if (me._thumbnail.ggCurrentLogicStatePosition == 2) {
                    me._thumbnail.style.left = '64px';
                    me._thumbnail.style.top = '0px';
                } else if (me._thumbnail.ggCurrentLogicStatePosition == 3) {
                    me._thumbnail.style.left = '96px';
                    me._thumbnail.style.top = '0px';
                } else if (me._thumbnail.ggCurrentLogicStatePosition == 4) {
                    me._thumbnail.style.left = '128px';
                    me._thumbnail.style.top = '0px';
                } else {
                    me._thumbnail.style.left = '128px';
                    me._thumbnail.style.top = '0px';
                }
            }
        }
        me._thumbnail.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('opt_thumbnail') == true) &&
                (player.getIsTour() == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._thumbnail.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._thumbnail.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._thumbnail.style[domTransition] = 'left 0s, top 0s';
                if (me._thumbnail.ggCurrentLogicStateVisible == 0) {
                    me._thumbnail.style.visibility = (Number(me._thumbnail.style.opacity) > 0 || !me._thumbnail.style.opacity) ? 'inherit' : 'hidden';
                    me._thumbnail.ggVisible = true;
                } else {
                    me._thumbnail.style.visibility = "hidden";
                    me._thumbnail.ggVisible = false;
                }
            }
        }
        me._thumbnail.onclick = function (e) {
            if (
                (
                    (player.getViewerSize().width <= 450)
                )
            ) {
                player.setVariableValue('vis_thumbnail_menu_mobile', !player.getVariableValue('vis_thumbnail_menu_mobile'));
            }
            if (
                (
                    (player.getViewerSize().width > 450)
                )
            ) {
                player.setVariableValue('vis_thumbnail_menu_show', !player.getVariableValue('vis_thumbnail_menu_show'));
            }
        }
        me._thumbnail.ggUpdatePosition = function (useTransition) {
        }
        el = me._thumbnail_hide_button_show = document.createElement('div');
        els = me._thumbnail_hide_button_show__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjAuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMzAgMTMwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMzAgMTMwOyIgeG1sOnNwYWNlPS' +
            'JwcmVzZXJ2ZSI+CjxnIGlkPSJMYXllcl8xXzFfIj4KCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik02NSw4LjlDMzQsOC45LDguOSwzNCw4LjksNjVTMzQsMTIxLjEsNjUsMTIxLjFjMzEsMCw1Ni4xLTI1LjEsNTYuMS01Ni4xUzk2LDguOSw2NSw4Ljl6IE01NS40LDU3LjgKCQljMC0xLjMsMS4xLTIuNCwyLjUtMi40aDEwLjRMNTUuNCw2OC4zVjU3Ljh6IE0yNy44LDcyLjJWNTcuOGMwLTEuMywxLjEtMi40LDIuNS0yLjRoMTQuM2MxLjQsMCwyLjUsMS4xLDIuNSwyLjR2MTQuMwoJCWMwLDEuMy0xLjEsMi40LTIuNSwyLjRIMzAuM0MyOC45LDc0LjYsMjcuOCw3My41LDI3LjgsNzIuMnogTTMyLjgs' +
            'MTAwLjRjLTAuNCwwLTAuOC0wLjEtMS4xLTAuNGwtMS43LTEuN2MtMC42LTAuNi0wLjYtMS42LDAtMi4yCgkJbDY2LTY2YzAuMy0wLjMsMC43LTAuNCwxLjEtMC40YzAuNCwwLDAuOCwwLjEsMS4xLDAuNGwxLjcsMS43YzAuNiwwLjYsMC42LDEuNiwwLDIuMmwtNjYsNjZDMzMuNiwxMDAuMywzMy4yLDEwMC40LDMyLjgsMTAwLjR6CgkJIE03NC42LDcyLjJjMCwxLjMtMS4xLDIuNC0yLjUsMi40SDYxLjlsMTIuNy0xMi43TDc0LjYsNzIuMkw3NC42LDcyLjJ6IE0xMDIuMiw3Mi4yYzAsMS4zLTEuMSwyLjQtMi41LDIuNEg4NS41CgkJYy0xLjQsMC0yLjUtMS4xLTIuNS0yLjRWNTcuOGMwLTEuMywxLj' +
            'EtMi40LDIuNS0yLjRoMTQuMmMxLjQsMCwyLjUsMS4xLDIuNSwyLjRDMTAyLjIsNTcuOCwxMDIuMiw3Mi4yLDEwMi4yLDcyLjJ6Ii8+CjwvZz4KPGcgaWQ9IkxheWVyXzJfMV8iPgoJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTU1LjQsNTcuOGMwLTEuMywxLjEtMi40LDIuNS0yLjRoMTAuNEw1NS40LDY4LjNWNTcuOHogTTI3LjgsNzIuMlY1Ny44YzAtMS4zLDEuMS0yLjQsMi41LTIuNGgxNC4zCgkJYzEuNCwwLDIuNSwxLjEsMi41LDIuNHYxNC4zYzAsMS4zLTEuMSwyLjQtMi41LDIuNEgzMC4zQzI4LjksNzQuNiwyNy44LDczLjUsMjcuOCw3Mi4yeiBNMzIuOCwxMDAuNGMtMC40LDAtMC44LTAu' +
            'MS0xLjEtMC40CgkJbC0xLjctMS43Yy0wLjYtMC42LTAuNi0xLjYsMC0yLjJsNjYtNjZjMC4zLTAuMywwLjctMC40LDEuMS0wLjRjMC40LDAsMC44LDAuMSwxLjEsMC40bDEuNywxLjdjMC42LDAuNiwwLjYsMS42LDAsMi4ybC02Niw2NgoJCUMzMy42LDEwMC4zLDMzLjIsMTAwLjQsMzIuOCwxMDAuNHogTTc0LjYsNzIuMmMwLDEuMy0xLjEsMi40LTIuNSwyLjRINjEuOWwxMi43LTEyLjdMNzQuNiw3Mi4yTDc0LjYsNzIuMnogTTEwMi4yLDcyLjIKCQljMCwxLjMtMS4xLDIuNC0yLjUsMi40SDg1LjVjLTEuNCwwLTIuNS0xLjEtMi41LTIuNFY1Ny44YzAtMS4zLDEuMS0yLjQsMi41LTIuNGgxNC4yYz' +
            'EuNCwwLDIuNSwxLjEsMi41LDIuNAoJCUMxMDIuMiw1Ny44LDEwMi4yLDcyLjIsMTAyLjIsNzIuMnogTTU1LjQsNTcuOGMwLTEuMywxLjEtMi40LDIuNS0yLjRoMTAuNEw1NS40LDY4LjNWNTcuOHogTTI3LjgsNzIuMlY1Ny44YzAtMS4zLDEuMS0yLjQsMi41LTIuNAoJCWgxNC4zYzEuNCwwLDIuNSwxLjEsMi41LDIuNHYxNC4zYzAsMS4zLTEuMSwyLjQtMi41LDIuNEgzMC4zQzI4LjksNzQuNiwyNy44LDczLjUsMjcuOCw3Mi4yeiBNMzIuOCwxMDAuNGMtMC40LDAtMC44LTAuMS0xLjEtMC40CgkJbC0xLjctMS43Yy0wLjYtMC42LTAuNi0xLjYsMC0yLjJsNjYtNjZjMC4zLTAuMywwLjctMC40LDEu' +
            'MS0wLjRjMC40LDAsMC44LDAuMSwxLjEsMC40bDEuNywxLjdjMC42LDAuNiwwLjYsMS42LDAsMi4ybC02Niw2NgoJCUMzMy42LDEwMC4zLDMzLjIsMTAwLjQsMzIuOCwxMDAuNHogTTc0LjYsNzIuMmMwLDEuMy0xLjEsMi40LTIuNSwyLjRINjEuOWwxMi43LTEyLjdMNzQuNiw3Mi4yTDc0LjYsNzIuMnogTTEwMi4yLDcyLjIKCQljMCwxLjMtMS4xLDIuNC0yLjUsMi40SDg1LjVjLTEuNCwwLTIuNS0xLjEtMi41LTIuNFY1Ny44YzAtMS4zLDEuMS0yLjQsMi41LTIuNGgxNC4yYzEuNCwwLDIuNSwxLjEsMi41LDIuNAoJCUMxMDIuMiw1Ny44LDEwMi4yLDcyLjIsMTAyLjIsNzIuMnoiLz4KPC9nPgo8L3' +
            'N2Zz4K';
        me._thumbnail_hide_button_show__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;thumbnail_hide_button_show;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._thumbnail_hide_button_show__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjAuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMzAgMTMwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMzAgMTMwOyIgeG1sOnNwYWNlPS' +
            'JwcmVzZXJ2ZSI+CjxnIGlkPSJMYXllcl8xXzFfIj4KCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik02NSwyLjZDMzAuNiwyLjYsMi42LDMwLjYsMi42LDY1czI3LjksNjIuNCw2Mi40LDYyLjRjMzQuNCwwLDYyLjQtMjcuOSw2Mi40LTYyLjRTOTkuNCwyLjYsNjUsMi42eiBNNTQuMyw1Ny4xCgkJYzAtMS41LDEuMi0yLjcsMi43LTIuN2gxMS42TDU0LjMsNjguN1Y1Ny4xeiBNMjMuNyw3Mi45VjU3LjFjMC0xLjUsMS4yLTIuNywyLjctMi43aDE1LjhjMS41LDAsMi43LDEuMiwyLjcsMi43djE1LjkKCQljMCwxLjUtMS4yLDIuNy0yLjcsMi43SDI2LjRDMjQuOSw3NS43LDIzLjcsNzQuNCwyMy43LDcy' +
            'Ljl6IE0yOS4zLDEwNC40Yy0wLjQsMC0wLjktMC4yLTEuMi0wLjVsLTEuOC0xLjhjLTAuNy0wLjctMC43LTEuNywwLTIuNAoJCWw3My4zLTczLjNjMC4zLTAuMywwLjgtMC41LDEuMi0wLjVzMC45LDAuMiwxLjIsMC41bDEuOCwxLjhjMC43LDAuNywwLjcsMS43LDAsMi40bC03My4zLDczLjNDMzAuMSwxMDQuMiwyOS43LDEwNC40LDI5LjMsMTA0LjR6CgkJIE03NS43LDcyLjljMCwxLjUtMS4yLDIuNy0yLjcsMi43SDYxLjVsMTQuMS0xNC4xTDc1LjcsNzIuOUw3NS43LDcyLjl6IE0xMDYuMyw3Mi45YzAsMS41LTEuMiwyLjctMi43LDIuN0g4Ny44CgkJYy0xLjUsMC0yLjctMS4yLTIuNy0yLjdWNT' +
            'cuMWMwLTEuNSwxLjItMi43LDIuNy0yLjdoMTUuOGMxLjUsMCwyLjcsMS4yLDIuNywyLjdDMTA2LjMsNTcuMSwxMDYuMyw3Mi45LDEwNi4zLDcyLjl6Ii8+CjwvZz4KPGcgaWQ9IkxheWVyXzJfMV8iPgoJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTU0LjMsNTcuMWMwLTEuNSwxLjItMi43LDIuNy0yLjdoMTEuNkw1NC4zLDY4LjdWNTcuMXogTTIzLjcsNzIuOVY1Ny4xYzAtMS41LDEuMi0yLjcsMi43LTIuN2gxNS44CgkJYzEuNSwwLDIuNywxLjIsMi43LDIuN3YxNS45YzAsMS41LTEuMiwyLjctMi43LDIuN0gyNi40QzI0LjksNzUuNywyMy43LDc0LjQsMjMuNyw3Mi45eiBNMjkuMywxMDQuNGMt' +
            'MC40LDAtMC45LTAuMi0xLjItMC41CgkJbC0xLjgtMS44Yy0wLjctMC43LTAuNy0xLjcsMC0yLjRsNzMuMy03My4zYzAuMy0wLjMsMC44LTAuNSwxLjItMC41czAuOSwwLjIsMS4yLDAuNWwxLjgsMS44YzAuNywwLjcsMC43LDEuNywwLDIuNGwtNzMuMyw3My4zCgkJQzMwLjEsMTA0LjIsMjkuNywxMDQuNCwyOS4zLDEwNC40eiBNNzUuNyw3Mi45YzAsMS41LTEuMiwyLjctMi43LDIuN0g2MS41bDE0LjEtMTQuMUw3NS43LDcyLjlMNzUuNyw3Mi45eiBNMTA2LjMsNzIuOQoJCWMwLDEuNS0xLjIsMi43LTIuNywyLjdIODcuOGMtMS41LDAtMi43LTEuMi0yLjctMi43VjU3LjFjMC0xLjUsMS4yLTIuNy' +
            'wyLjctMi43aDE1LjhjMS41LDAsMi43LDEuMiwyLjcsMi43CgkJQzEwNi4zLDU3LjEsMTA2LjMsNzIuOSwxMDYuMyw3Mi45eiBNNTQuMyw1Ny4xYzAtMS41LDEuMi0yLjcsMi43LTIuN2gxMS42TDU0LjMsNjguN1Y1Ny4xeiBNMjMuNyw3Mi45VjU3LjFjMC0xLjUsMS4yLTIuNywyLjctMi43CgkJaDE1LjhjMS41LDAsMi43LDEuMiwyLjcsMi43djE1LjljMCwxLjUtMS4yLDIuNy0yLjcsMi43SDI2LjRDMjQuOSw3NS43LDIzLjcsNzQuNCwyMy43LDcyLjl6IE0yOS4zLDEwNC40Yy0wLjQsMC0wLjktMC4yLTEuMi0wLjUKCQlsLTEuOC0xLjhjLTAuNy0wLjctMC43LTEuNywwLTIuNGw3My4zLTczLjNj' +
            'MC4zLTAuMywwLjgtMC41LDEuMi0wLjVzMC45LDAuMiwxLjIsMC41bDEuOCwxLjhjMC43LDAuNywwLjcsMS43LDAsMi40bC03My4zLDczLjMKCQlDMzAuMSwxMDQuMiwyOS43LDEwNC40LDI5LjMsMTA0LjR6IE03NS43LDcyLjljMCwxLjUtMS4yLDIuNy0yLjcsMi43SDYxLjVsMTQuMS0xNC4xTDc1LjcsNzIuOUw3NS43LDcyLjl6IE0xMDYuMyw3Mi45CgkJYzAsMS41LTEuMiwyLjctMi43LDIuN0g4Ny44Yy0xLjUsMC0yLjctMS4yLTIuNy0yLjdWNTcuMWMwLTEuNSwxLjItMi43LDIuNy0yLjdoMTUuOGMxLjUsMCwyLjcsMS4yLDIuNywyLjcKCQlDMTA2LjMsNTcuMSwxMDYuMyw3Mi45LDEwNi4zLD' +
            'cyLjl6Ii8+CjwvZz4KPC9zdmc+Cg==';
        me._thumbnail_hide_button_show__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;thumbnail_hide_button_show;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "thumbnail_hide_button_show";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 32px;';
        hs += 'left : 0px;';
        hs += 'opacity : 0;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : hidden;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._thumbnail_hide_button_show.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._thumbnail_hide_button_show.logicBlock_alpha = function () {
            var newLogicStateAlpha;
            if (
                (player.getVariableValue('vis_thumbnail_menu_show') == true) &&
                (player.getViewerSize().width > 450)
            ) {
                newLogicStateAlpha = 0;
            } else if (
                (player.getVariableValue('vis_thumbnail_menu_mobile') == true) &&
                (player.getViewerSize().width <= 450)
            ) {
                newLogicStateAlpha = 1;
            } else {
                newLogicStateAlpha = -1;
            }
            if (me._thumbnail_hide_button_show.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
                me._thumbnail_hide_button_show.ggCurrentLogicStateAlpha = newLogicStateAlpha;
                me._thumbnail_hide_button_show.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._thumbnail_hide_button_show.ggCurrentLogicStateAlpha == 0) {
                    me._thumbnail_hide_button_show.style.visibility = me._thumbnail_hide_button_show.ggVisible ? 'inherit' : 'hidden';
                    me._thumbnail_hide_button_show.style.opacity = 1;
                } else if (me._thumbnail_hide_button_show.ggCurrentLogicStateAlpha == 1) {
                    me._thumbnail_hide_button_show.style.visibility = me._thumbnail_hide_button_show.ggVisible ? 'inherit' : 'hidden';
                    me._thumbnail_hide_button_show.style.opacity = 1;
                } else {
                    me._thumbnail_hide_button_show.style.visibility = "hidden";
                    me._thumbnail_hide_button_show.style.opacity = 0;
                }
            }
        }
        me._thumbnail_hide_button_show.onmouseover = function (e) {
            me._thumbnail_hide_button_show__img.style.visibility = 'hidden';
            me._thumbnail_hide_button_show__imgo.style.visibility = 'inherit';
        }
        me._thumbnail_hide_button_show.onmouseout = function (e) {
            me._thumbnail_hide_button_show__img.style.visibility = 'inherit';
            me._thumbnail_hide_button_show__imgo.style.visibility = 'hidden';
        }
        me._thumbnail_hide_button_show.ggUpdatePosition = function (useTransition) {
        }
        me._thumbnail.appendChild(me._thumbnail_hide_button_show);
        el = me._thumbnail_show_button_show = document.createElement('div');
        els = me._thumbnail_show_button_show__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTExOC45LDM5N2MwLTMxLTI1LjEtNTYuMS01Ni4xLTU2LjFjLTMxLDAtNTYuMSwyNS4xLTU2LjEsNTYuMXMyNS4xLDU2LjEsNTYuMSw1Ni4xDQoJCUMtMTQ0LDQ1My4xLTExOC45LDQyOC0xMTguOSwzOTd6IE0tMjA5LjcsNDA2LjZjLTEuNCwwLTIuNS0xLjEtMi41LTIuNHYtMTQuM2MwLTEuMywxLjEtMi40LDIuNS0yLjRoMTQuM2MxLjQsMCwyLjUsMS4xLDIuNSwyLjQNCgkJdjE0LjNjMCwxLjMtMS4xLDIuNC0yLjUsMi40TC0yMDkuNyw0MDYuNkwtMjA5LjcsNDA2LjZ6IE0tMTgyLjEsNDA2LjZjLTEuNCwwLTIuNS0x' +
            'LjEtMi41LTIuNHYtMTQuM2MwLTEuMywxLjEtMi40LDIuNS0yLjRoMTQuMg0KCQljMS40LDAsMi41LDEuMSwyLjUsMi40djE0LjNjMCwxLjMtMS4xLDIuNC0yLjUsMi40TC0xODIuMSw0MDYuNkwtMTgyLjEsNDA2LjZ6IE0tMTU0LjUsNDA2LjZjLTEuNCwwLTIuNS0xLjEtMi41LTIuNHYtMTQuMw0KCQljMC0xLjMsMS4xLTIuNCwyLjUtMi40aDE0LjJjMS40LDAsMi41LDEuMSwyLjUsMi40djE0LjNjMCwxLjMtMS4xLDIuNC0yLjUsMi40TC0xNTQuNSw0MDYuNnoiLz4NCjwvZz4NCjxnIGlkPSJMYXllcl8yIj4NCgk8Zz4NCgkJPGc+DQoJCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTE1NC41LD' +
            'QwNi42Yy0xLjQsMC0yLjUtMS4xLTIuNS0yLjR2LTE0LjNjMC0xLjMsMS4xLTIuNCwyLjUtMi40aDE0LjJjMS40LDAsMi41LDEuMSwyLjUsMi40djE0LjMNCgkJCQljMCwxLjMtMS4xLDIuNC0yLjUsMi40TC0xNTQuNSw0MDYuNnoiLz4NCgkJCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTgyLjEsNDA2LjZjLTEuNCwwLTIuNS0xLjEtMi41LTIuNHYtMTQuM2MwLTEuMywxLjEtMi40LDIuNS0yLjRoMTQuMmMxLjQsMCwyLjUsMS4xLDIuNSwyLjR2MTQuMw0KCQkJCWMwLDEuMy0xLjEsMi40LTIuNSwyLjRMLTE4Mi4xLDQwNi42TC0xODIuMSw0MDYuNnoiLz4NCgkJCTxwYXRoIGZpbGw9IiNGRkZG' +
            'RkYiIGQ9Ik0tMjA5LjcsNDA2LjZjLTEuNCwwLTIuNS0xLjEtMi41LTIuNHYtMTQuM2MwLTEuMywxLjEtMi40LDIuNS0yLjRoMTQuM2MxLjQsMCwyLjUsMS4xLDIuNSwyLjR2MTQuMw0KCQkJCWMwLDEuMy0xLjEsMi40LTIuNSwyLjRMLTIwOS43LDQwNi42TC0yMDkuNyw0MDYuNnoiLz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K';
        me._thumbnail_show_button_show__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;thumbnail_show_button_show;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._thumbnail_show_button_show__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTExMi42LDM5N2MwLTM0LjQtMjcuOS02Mi40LTYyLjQtNjIuNGMtMzQuNCwwLTYyLjQsMjcuOS02Mi40LDYyLjRzMjcuOSw2Mi40LDYyLjQsNjIuNA0KCQlDLTE0MC42LDQ1OS40LTExMi42LDQzMS40LTExMi42LDM5N3ogTS0yMTMuNiw0MDcuNmMtMS41LDAtMi43LTEuMi0yLjctMi43di0xNS45YzAtMS41LDEuMi0yLjcsMi43LTIuN2gxNS44DQoJCWMxLjUsMCwyLjcsMS4yLDIuNywyLjd2MTUuOWMwLDEuNS0xLjIsMi43LTIuNywyLjdMLTIxMy42LDQwNy42TC0yMTMuNiw0MDcuNnogTS0xODIuOSw0MDcuNmMtMS41' +
            'LDAtMi43LTEuMi0yLjctMi43di0xNS45DQoJCWMwLTEuNSwxLjItMi43LDIuNy0yLjdoMTUuOGMxLjUsMCwyLjcsMS4yLDIuNywyLjd2MTUuOWMwLDEuNS0xLjIsMi43LTIuNywyLjdMLTE4Mi45LDQwNy42TC0xODIuOSw0MDcuNnogTS0xNTIuMiw0MDcuNg0KCQljLTEuNSwwLTIuNy0xLjItMi43LTIuN3YtMTUuOWMwLTEuNSwxLjItMi43LDIuNy0yLjdoMTUuOGMxLjUsMCwyLjcsMS4yLDIuNywyLjd2MTUuOWMwLDEuNS0xLjIsMi43LTIuNywyLjdMLTE1Mi4yLDQwNy42eiIvPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KCTxnPg0KCQk8Zz4NCgkJCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik' +
            '0tMTUyLjIsNDA3LjZjLTEuNSwwLTIuNy0xLjItMi43LTIuN3YtMTUuOWMwLTEuNSwxLjItMi43LDIuNy0yLjdoMTUuOGMxLjUsMCwyLjcsMS4yLDIuNywyLjd2MTUuOQ0KCQkJCWMwLDEuNS0xLjIsMi43LTIuNywyLjdMLTE1Mi4yLDQwNy42eiIvPg0KCQkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xODIuOSw0MDcuNmMtMS41LDAtMi43LTEuMi0yLjctMi43di0xNS45YzAtMS41LDEuMi0yLjcsMi43LTIuN2gxNS44YzEuNSwwLDIuNywxLjIsMi43LDIuN3YxNS45DQoJCQkJYzAsMS41LTEuMiwyLjctMi43LDIuN0wtMTgyLjksNDA3LjZMLTE4Mi45LDQwNy42eiIvPg0KCQkJPHBhdGggZmls' +
            'bD0iI0ZGRkZGRiIgZD0iTS0yMTMuNiw0MDcuNmMtMS41LDAtMi43LTEuMi0yLjctMi43di0xNS45YzAtMS41LDEuMi0yLjcsMi43LTIuN2gxNS44YzEuNSwwLDIuNywxLjIsMi43LDIuN3YxNS45DQoJCQkJYzAsMS41LTEuMiwyLjctMi43LDIuN0wtMjEzLjYsNDA3LjZMLTIxMy42LDQwNy42eiIvPg0KCQk8L2c+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo=';
        me._thumbnail_show_button_show__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;thumbnail_show_button_show;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "thumbnail_show_button_show";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 32px;';
        hs += 'left : 0px;';
        hs += 'opacity : 0;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : hidden;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._thumbnail_show_button_show.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._thumbnail_show_button_show.logicBlock_alpha = function () {
            var newLogicStateAlpha;
            if (
                (player.getVariableValue('vis_thumbnail_menu_show') == false) &&
                (player.getViewerSize().width > 450)
            ) {
                newLogicStateAlpha = 0;
            } else if (
                (player.getVariableValue('vis_thumbnail_menu_mobile') == false) &&
                (player.getViewerSize().width <= 450)
            ) {
                newLogicStateAlpha = 1;
            } else {
                newLogicStateAlpha = -1;
            }
            if (me._thumbnail_show_button_show.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
                me._thumbnail_show_button_show.ggCurrentLogicStateAlpha = newLogicStateAlpha;
                me._thumbnail_show_button_show.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._thumbnail_show_button_show.ggCurrentLogicStateAlpha == 0) {
                    me._thumbnail_show_button_show.style.visibility = me._thumbnail_show_button_show.ggVisible ? 'inherit' : 'hidden';
                    me._thumbnail_show_button_show.style.opacity = 1;
                } else if (me._thumbnail_show_button_show.ggCurrentLogicStateAlpha == 1) {
                    me._thumbnail_show_button_show.style.visibility = me._thumbnail_show_button_show.ggVisible ? 'inherit' : 'hidden';
                    me._thumbnail_show_button_show.style.opacity = 1;
                } else {
                    me._thumbnail_show_button_show.style.visibility = "hidden";
                    me._thumbnail_show_button_show.style.opacity = 0;
                }
            }
        }
        me._thumbnail_show_button_show.onmouseover = function (e) {
            me._thumbnail_show_button_show__img.style.visibility = 'hidden';
            me._thumbnail_show_button_show__imgo.style.visibility = 'inherit';
        }
        me._thumbnail_show_button_show.onmouseout = function (e) {
            me._thumbnail_show_button_show__img.style.visibility = 'inherit';
            me._thumbnail_show_button_show__imgo.style.visibility = 'hidden';
        }
        me._thumbnail_show_button_show.ggUpdatePosition = function (useTransition) {
        }
        me._thumbnail.appendChild(me._thumbnail_show_button_show);
        me._controller_slider.appendChild(me._thumbnail);
        el = me._info = document.createElement('div');
        els = me._info__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE3NSwzNDAuOWMtMzEsMC01Ni4xLDI1LjEtNTYuMSw1Ni4xczI1LjEsNTYuMSw1Ni4xLDU2LjFjMzEsMCw1Ni4xLTI1LjEsNTYuMS01Ni4xUy0xNDQsMzQwLjktMTc1LDM0MC45DQoJCXogTS0xNzguMSwzNjEuMWw2LjIsMGMzLjUsMCw2LjQsMi45LDYuNCw2LjR2Mi45YzAsMy41LTIuOSw2LjQtNi40LDYuNGgtNi4yYy0zLjUsMC02LjQtMi45LTYuNC02LjRsMC0yLjkNCgkJQy0xODQuNSwzNjQtMTgxLjYsMzYxLjEtMTc4LjEsMzYxLjF6IE0tMTY3LDQzMC40SC0xODNjLTAuOCwwLTEuNS0wLjctMS41LTEuNWwwLTM3' +
            'LjdjMC0wLjgsMC43LTEuNSwxLjUtMS41bDE1LjksMA0KCQljMC44LDAsMS41LDAuNywxLjUsMS41bDAsMzcuN0MtMTY1LjUsNDI5LjctMTY2LjIsNDMwLjQtMTY3LDQzMC40eiIvPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KCTxnPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTE2NS41LDM5MS4yYzAtMC44LTAuNy0xLjUtMS41LTEuNWwtMTUuOSwwYy0wLjgsMC0xLjUsMC43LTEuNSwxLjVsMCwzNy43YzAsMC44LDAuNywxLjUsMS41LDEuNWgxNS45DQoJCQljMC44LDAsMS41LTAuNywxLjUtMS41TC0xNjUuNSwzOTEuMnoiLz4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xNz' +
            'guMSwzNzYuOGg2LjJjMy41LDAsNi40LTIuOSw2LjQtNi40di0yLjljMC0zLjUtMi45LTYuNC02LjQtNi40bC02LjIsMGMtMy41LDAtNi40LDIuOS02LjQsNi40bDAsMi45DQoJCQlDLTE4NC41LDM3NC0xODEuNiwzNzYuOC0xNzguMSwzNzYuOHoiLz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==';
        me._info__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;info;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._info__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE3NSwzMzQuNmMtMzQuNCwwLTYyLjQsMjcuOS02Mi40LDYyLjRzMjcuOSw2Mi40LDYyLjQsNjIuNGMzNC40LDAsNjIuNC0yNy45LDYyLjQtNjIuNA0KCQlTLTE0MC42LDMzNC42LTE3NSwzMzQuNnogTS0xNzguNSwzNTcuMWw2LjksMGMzLjksMCw3LjEsMy4yLDcuMSw3LjF2My4zYzAsMy45LTMuMiw3LjEtNy4xLDcuMWgtNi45Yy0zLjksMC03LjEtMy4yLTcuMS03LjFsMC0zLjMNCgkJQy0xODUuNiwzNjAuMy0xODIuNCwzNTcuMS0xNzguNSwzNTcuMXogTS0xNjYuMSw0MzQuMWgtMTcuN2MtMC45LDAtMS43LTAuOC0x' +
            'LjctMS43bDAtNDEuOWMwLTAuOSwwLjgtMS43LDEuNy0xLjdsMTcuNywwDQoJCWMwLjksMCwxLjcsMC44LDEuNywxLjdsMCw0MS45Qy0xNjQuNCw0MzMuMy0xNjUuMiw0MzQuMS0xNjYuMSw0MzQuMXoiLz4NCjwvZz4NCjxnIGlkPSJMYXllcl8yIj4NCgk8Zz4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xNjQuNCwzOTAuNWMwLTAuOS0wLjgtMS43LTEuNy0xLjdsLTE3LjcsMGMtMC45LDAtMS43LDAuOC0xLjcsMS43bDAsNDEuOWMwLDAuOSwwLjgsMS43LDEuNywxLjdoMTcuNw0KCQkJYzAuOSwwLDEuNy0wLjgsMS43LTEuN0wtMTY0LjQsMzkwLjV6Ii8+DQoJCTxwYXRoIGZpbGw9IiNGRk' +
            'ZGRkYiIGQ9Ik0tMTc4LjUsMzc0LjZoNi45YzMuOSwwLDcuMS0zLjIsNy4xLTcuMXYtMy4zYzAtMy45LTMuMi03LjEtNy4xLTcuMWwtNi45LDBjLTMuOSwwLTcuMSwzLjItNy4xLDcuMWwwLDMuMw0KCQkJQy0xODUuNSwzNzEuNC0xODIuNCwzNzQuNi0xNzguNSwzNzQuNnoiLz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==';
        me._info__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;info;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "info";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 32px;';
        hs += 'left : 96px;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : hidden;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._info.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._info.logicBlock_position = function () {
            var newLogicStatePosition;
            if (
                (player.getVariableValue('pos_information') == 0)
            ) {
                newLogicStatePosition = 0;
            } else if (
                (player.getVariableValue('pos_information') == 1)
            ) {
                newLogicStatePosition = 1;
            } else if (
                (player.getVariableValue('pos_information') == 2)
            ) {
                newLogicStatePosition = 2;
            } else if (
                (player.getVariableValue('pos_information') == 3)
            ) {
                newLogicStatePosition = 3;
            } else {
                newLogicStatePosition = -1;
            }
            if (me._info.ggCurrentLogicStatePosition != newLogicStatePosition) {
                me._info.ggCurrentLogicStatePosition = newLogicStatePosition;
                me._info.style[domTransition] = 'left 0s, top 0s';
                if (me._info.ggCurrentLogicStatePosition == 0) {
                    me._info.style.left = '0px';
                    me._info.style.top = '0px';
                } else if (me._info.ggCurrentLogicStatePosition == 1) {
                    me._info.style.left = '32px';
                    me._info.style.top = '0px';
                } else if (me._info.ggCurrentLogicStatePosition == 2) {
                    me._info.style.left = '64px';
                    me._info.style.top = '0px';
                } else if (me._info.ggCurrentLogicStatePosition == 3) {
                    me._info.style.left = '96px';
                    me._info.style.top = '0px';
                } else {
                    me._info.style.left = '96px';
                    me._info.style.top = '0px';
                }
            }
        }
        me._info.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('opt_info') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._info.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._info.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._info.style[domTransition] = 'left 0s, top 0s';
                if (me._info.ggCurrentLogicStateVisible == 0) {
                    me._info.style.visibility = (Number(me._info.style.opacity) > 0 || !me._info.style.opacity) ? 'inherit' : 'hidden';
                    me._info.ggVisible = true;
                } else {
                    me._info.style.visibility = "hidden";
                    me._info.ggVisible = false;
                }
            }
        }
        me._info.onclick = function (e) {
            player.setVariableValue('vis_userdata', true);
        }
        me._info.onmouseover = function (e) {
            me._info__img.style.visibility = 'hidden';
            me._info__imgo.style.visibility = 'inherit';
        }
        me._info.onmouseout = function (e) {
            me._info__img.style.visibility = 'inherit';
            me._info__imgo.style.visibility = 'hidden';
        }
        me._info.ggUpdatePosition = function (useTransition) {
        }
        me._controller_slider.appendChild(me._info);
        el = me._autorotate_buttons = document.createElement('div');
        el.ggPermeable = false;
        el.ggId = "autorotate_buttons";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_container ";
        el.ggType = 'container';
        hs = '';
        hs += 'height : 32px;';
        hs += 'left : 64px;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : hidden;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._autorotate_buttons.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._autorotate_buttons.logicBlock_position = function () {
            var newLogicStatePosition;
            if (
                (player.getVariableValue('pos_autorotate') == 0)
            ) {
                newLogicStatePosition = 0;
            } else if (
                (player.getVariableValue('pos_autorotate') == 1)
            ) {
                newLogicStatePosition = 1;
            } else if (
                (player.getVariableValue('pos_autorotate') == 2)
            ) {
                newLogicStatePosition = 2;
            } else {
                newLogicStatePosition = -1;
            }
            if (me._autorotate_buttons.ggCurrentLogicStatePosition != newLogicStatePosition) {
                me._autorotate_buttons.ggCurrentLogicStatePosition = newLogicStatePosition;
                me._autorotate_buttons.style[domTransition] = 'left 0s, top 0s';
                if (me._autorotate_buttons.ggCurrentLogicStatePosition == 0) {
                    me._autorotate_buttons.style.left = '0px';
                    me._autorotate_buttons.style.top = '0px';
                } else if (me._autorotate_buttons.ggCurrentLogicStatePosition == 1) {
                    me._autorotate_buttons.style.left = '32px';
                    me._autorotate_buttons.style.top = '0px';
                } else if (me._autorotate_buttons.ggCurrentLogicStatePosition == 2) {
                    me._autorotate_buttons.style.left = '64px';
                    me._autorotate_buttons.style.top = '0px';
                } else {
                    me._autorotate_buttons.style.left = '64px';
                    me._autorotate_buttons.style.top = '0px';
                }
            }
        }
        me._autorotate_buttons.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('opt_autorotate') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._autorotate_buttons.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._autorotate_buttons.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._autorotate_buttons.style[domTransition] = 'left 0s, top 0s';
                if (me._autorotate_buttons.ggCurrentLogicStateVisible == 0) {
                    me._autorotate_buttons.style.visibility = (Number(me._autorotate_buttons.style.opacity) > 0 || !me._autorotate_buttons.style.opacity) ? 'inherit' : 'hidden';
                    me._autorotate_buttons.ggVisible = true;
                } else {
                    me._autorotate_buttons.style.visibility = "hidden";
                    me._autorotate_buttons.ggVisible = false;
                }
            }
        }
        me._autorotate_buttons.onclick = function (e) {
            player.setUseGyro(false);
            player.toggleAutorotate();
        }
        me._autorotate_buttons.ggUpdatePosition = function (useTransition) {
        }
        el = me._autorotate_start = document.createElement('div');
        els = me._autorotate_start__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE3NSwzNDAuOWMtMzEsMC01Ni4xLDI1LjEtNTYuMSw1Ni4xczI1LjEsNTYuMSw1Ni4xLDU2LjFjMzEsMCw1Ni4xLTI1LjEsNTYuMS01Ni4xUy0xNDQsMzQwLjktMTc1LDM0MC45DQoJCXogTS0xNTMuOSw0MjMuNmMtNS44LDQuNi0xMy4xLDcuNC0yMS4xLDcuNGgwYy0xOC43LDAtMzQtMTUuMi0zNC0zNGgtMC41aC03LjdjLTAuNSwwLTAuOC0wLjItMS4xLTAuN2MtMC4zLTAuNS0wLjItMSwwLjEtMS4zDQoJCWwxMi43LTE3LjhjMC4zLTAuNCwwLjYtMC42LDEuMS0wLjZjMC40LDAsMC43LDAuMiwxLDAuNmwxMi44LDE3' +
            'LjhjMC4zLDAuNCwwLjQsMC45LDAuMSwxLjNjLTAuMywwLjUtMC42LDAuNy0xLjEsMC43aC03LjZoLTAuNw0KCQljMCwxMy44LDExLjIsMjUsMjUsMjVoMGM1LjgsMCwxMS4xLTIsMTUuMy01LjNjMC42LTAuNSwxLjQtMC40LDIsMC4yYzAuNSwwLjUsMy4xLDMuNSw0LDQuNEMtMTUzLjEsNDIyLTE1My4yLDQyMy4xLTE1My45LDQyMy42eg0KCQkgTS0xNzksMzk3YzAtMi4yLDEuOC00LDQtNGMyLjIsMCw0LDEuOCw0LDRjMCwyLjItMS44LDQtNCw0Qy0xNzcuMiw0MDEtMTc5LDM5OS4yLTE3OSwzOTd6IE0tMTQ0LjUsNDE2LjkNCgkJYy0wLjMsMC40LTAuNiwwLjYtMS4xLDAuNmMtMC40LDAtMC43LT' +
            'AuMi0xLTAuNmwtMTIuOC0xNy44Yy0wLjMtMC40LTAuNC0wLjktMC4xLTEuM2MwLjMtMC41LDAuNi0wLjcsMS4xLTAuN2g3LjZoMC43DQoJCWMwLTEzLjgtMTEuMi0yNS0yNS0yNWgwYy01LjgsMC0xMS4xLDItMTUuMyw1LjNjLTAuNiwwLjUtMS40LDAuNC0yLTAuMmMtMC41LTAuNS0zLjEtMy41LTQtNC40Yy0wLjYtMC43LTAuNi0xLjgsMC4xLTIuMw0KCQljNS44LTQuNiwxMy4xLTcuNCwyMS4xLTcuNGgwYzE4LjcsMCwzNCwxNS4yLDM0LDM0aDAuNWg3LjdjMC41LDAsMC44LDAuMiwxLjEsMC43YzAuMywwLjUsMC4yLDEtMC4xLDEuM0wtMTQ0LjUsNDE2Ljl6Ii8+DQo8L2c+DQo8ZyBpZD0iTGF5' +
            'ZXJfMiI+DQoJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xNTMuNyw0MjEuM2MtMC44LTAuOS0zLjUtMy45LTQtNC40Yy0wLjYtMC42LTEuNC0wLjYtMi0wLjJjLTQuMiwzLjMtOS41LDUuMy0xNS4zLDUuM2gwDQoJCWMtMTMuOCwwLTI1LTExLjItMjUtMjVoMC43aDcuNmMwLjUsMCwwLjgtMC4yLDEuMS0wLjdjMC4zLTAuNSwwLjItMS0wLjEtMS4zbC0xMi44LTE3LjhjLTAuMy0wLjQtMC42LTAuNi0xLTAuNg0KCQljLTAuNSwwLTAuOCwwLjItMS4xLDAuNmwtMTIuNywxNy44Yy0wLjMsMC40LTAuNCwwLjktMC4xLDEuM2MwLjMsMC41LDAuNiwwLjcsMS4xLDAuN2g3LjdoMC41YzAsMTguNywxNS' +
            '4yLDM0LDM0LDM0aDANCgkJYzgsMCwxNS4zLTIuOCwyMS4xLTcuNEMtMTUzLjIsNDIzLjEtMTUzLjEsNDIyLTE1My43LDQyMS4zeiIvPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTMxLjcsMzk3LjdjLTAuMy0wLjUtMC42LTAuNy0xLjEtMC43aC03LjdoLTAuNWMwLTE4LjctMTUuMi0zNC0zNC0zNGgwYy04LDAtMTUuMywyLjgtMjEuMSw3LjQNCgkJYy0wLjcsMC41LTAuOCwxLjYtMC4xLDIuM2MwLjgsMC45LDMuNSwzLjksNCw0LjRjMC42LDAuNiwxLjQsMC42LDIsMC4yYzQuMi0zLjMsOS41LTUuMywxNS4zLTUuM2gwYzEzLjgsMCwyNSwxMS4yLDI1LDI1aC0wLjcNCgkJaC03LjZjLTAu' +
            'NSwwLTAuOCwwLjItMS4xLDAuN2MtMC4zLDAuNS0wLjIsMSwwLjEsMS4zbDEyLjgsMTcuOGMwLjMsMC40LDAuNiwwLjYsMSwwLjZjMC41LDAsMC44LTAuMiwxLjEtMC42bDEyLjctMTcuOA0KCQlDLTEzMS41LDM5OC43LTEzMS40LDM5OC4yLTEzMS43LDM5Ny43eiIvPg0KCTxjaXJjbGUgZmlsbD0iI0ZGRkZGRiIgY3g9Ii0xNzUiIGN5PSIzOTciIHI9IjQiLz4NCjwvZz4NCjwvc3ZnPg0K';
        me._autorotate_start__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;autorotate_start;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._autorotate_start__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE3NSwzMzQuN2MtMzQuNCwwLTYyLjQsMjcuOS02Mi40LDYyLjRzMjcuOSw2Mi40LDYyLjQsNjIuNGMzNC40LDAsNjIuNC0yNy45LDYyLjQtNjIuNA0KCQlTLTE0MC42LDMzNC43LTE3NSwzMzQuN3ogTS0xNTEuNSw0MjYuNmMtNi40LDUuMS0xNC42LDguMi0yMy41LDguMmgwYy0yMC44LDAtMzcuNy0xNi45LTM3LjctMzcuN2gtMC42aC04LjYNCgkJYy0wLjUsMC0wLjktMC4yLTEuMi0wLjdjLTAuMy0wLjUtMC4yLTEuMSwwLjEtMS41bDE0LjEtMTkuOGMwLjMtMC40LDAuNi0wLjYsMS4yLTAuNmMwLjQsMCwwLjcsMC4y' +
            'LDEuMSwwLjZsMTQuMiwxOS44DQoJCWMwLjMsMC40LDAuNCwxLDAuMSwxLjVjLTAuMywwLjUtMC42LDAuNy0xLjIsMC43aC04LjRoLTAuN2MwLDE1LjMsMTIuNCwyNy43LDI3LjcsMjcuN2gwYzYuNCwwLDEyLjMtMi4yLDE3LTUuOQ0KCQljMC43LTAuNSwxLjYtMC40LDIuMiwwLjJjMC42LDAuNiwzLjUsMy44LDQuNCw0LjlDLTE1MC43LDQyNC44LTE1MC43LDQyNi0xNTEuNSw0MjYuNnogTS0xNzkuNCwzOTdjMC0yLjQsMi00LjQsNC40LTQuNA0KCQljMi40LDAsNC40LDIsNC40LDQuNGMwLDIuNC0yLDQuNC00LjQsNC40Qy0xNzcuNCw0MDEuNC0xNzkuNCwzOTkuNS0xNzkuNCwzOTd6IE0tMTQxLj' +
            'EsNDE5LjFjLTAuMywwLjQtMC42LDAuNi0xLjIsMC42DQoJCWMtMC40LDAtMC43LTAuMi0xLjEtMC42bC0xNC4yLTE5LjhjLTAuMy0wLjQtMC40LTEtMC4xLTEuNWMwLjMtMC41LDAuNi0wLjcsMS4yLTAuN2g4LjRoMC43YzAtMTUuMy0xMi40LTI3LjctMjcuNy0yNy43aDANCgkJYy02LjQsMC0xMi4zLDIuMi0xNyw1LjljLTAuNywwLjUtMS42LDAuNC0yLjItMC4yYy0wLjYtMC42LTMuNS0zLjgtNC40LTQuOWMtMC43LTAuOC0wLjYtMiwwLjItMi42YzYuNC01LjEsMTQuNi04LjIsMjMuNS04LjJoMA0KCQljMjAuOCwwLDM3LjcsMTYuOSwzNy43LDM3LjdoMC42aDguNmMwLjUsMCwwLjksMC4yLDEu' +
            'MiwwLjdjMC4zLDAuNSwwLjIsMS4xLTAuMSwxLjVMLTE0MS4xLDQxOS4xeiIvPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTUxLjQsNDI0Yy0wLjktMS0zLjktNC4zLTQuNC00LjljLTAuNi0wLjYtMS41LTAuNy0yLjItMC4yYy00LjcsMy43LTEwLjYsNS45LTE3LDUuOWgwDQoJCWMtMTUuMywwLTI3LjctMTIuNC0yNy43LTI3LjdoMC43aDguNGMwLjUsMCwwLjktMC4yLDEuMi0wLjdzMC4yLTEuMS0wLjEtMS41bC0xNC4yLTE5LjhjLTAuMy0wLjQtMC42LTAuNi0xLjEtMC42DQoJCWMtMC41LDAtMC45LDAuMi0xLjIsMC42bC0xNC4xLDE5LjhjLT' +
            'AuMywwLjQtMC40LDEtMC4xLDEuNWMwLjMsMC41LDAuNiwwLjcsMS4yLDAuN2g4LjZoMC42YzAsMjAuOCwxNi45LDM3LjcsMzcuNywzNy43aDANCgkJYzguOSwwLDE3LTMuMSwyMy41LTguMkMtMTUwLjcsNDI2LTE1MC43LDQyNC44LTE1MS40LDQyNHoiLz4NCgk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTEyNi45LDM5Ny44Yy0wLjMtMC41LTAuNi0wLjctMS4yLTAuN2gtOC42aC0wLjZjMC0yMC44LTE2LjktMzcuNy0zNy43LTM3LjdoMGMtOC45LDAtMTcsMy4xLTIzLjUsOC4yDQoJCWMtMC44LDAuNi0wLjgsMS44LTAuMiwyLjZjMC45LDEsMy45LDQuMyw0LjQsNC45YzAuNiwwLjYsMS41LDAu' +
            'NywyLjIsMC4yYzQuNy0zLjcsMTAuNi01LjksMTctNS45aDBjMTUuMywwLDI3LjcsMTIuNCwyNy43LDI3LjcNCgkJaC0wLjdoLTguNGMtMC41LDAtMC45LDAuMi0xLjIsMC43Yy0wLjMsMC41LTAuMiwxLjEsMC4xLDEuNWwxNC4yLDE5LjhjMC4zLDAuNCwwLjYsMC42LDEuMSwwLjZjMC41LDAsMC45LTAuMiwxLjItMC42bDE0LjEtMTkuOA0KCQlDLTEyNi43LDM5OC45LTEyNi42LDM5OC4zLTEyNi45LDM5Ny44eiIvPg0KCTxjaXJjbGUgZmlsbD0iI0ZGRkZGRiIgY3g9Ii0xNzUiIGN5PSIzOTciIHI9IjQuNCIvPg0KPC9nPg0KPC9zdmc+DQo=';
        me._autorotate_start__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;autorotate_start;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "autorotate_start";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 32px;';
        hs += 'left : 0px;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : inherit;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._autorotate_start.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._autorotate_start.logicBlock_alpha = function () {
            var newLogicStateAlpha;
            if (
                (player.getIsAutorotating() == false)
            ) {
                newLogicStateAlpha = 0;
            } else {
                newLogicStateAlpha = -1;
            }
            if (me._autorotate_start.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
                me._autorotate_start.ggCurrentLogicStateAlpha = newLogicStateAlpha;
                me._autorotate_start.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._autorotate_start.ggCurrentLogicStateAlpha == 0) {
                    me._autorotate_start.style.visibility = me._autorotate_start.ggVisible ? 'inherit' : 'hidden';
                    me._autorotate_start.style.opacity = 1;
                } else {
                    me._autorotate_start.style.visibility = me._autorotate_start.ggVisible ? 'inherit' : 'hidden';
                    me._autorotate_start.style.opacity = 1;
                }
            }
        }
        me._autorotate_start.onmouseover = function (e) {
            me._autorotate_start__img.style.visibility = 'hidden';
            me._autorotate_start__imgo.style.visibility = 'inherit';
        }
        me._autorotate_start.onmouseout = function (e) {
            me._autorotate_start__img.style.visibility = 'inherit';
            me._autorotate_start__imgo.style.visibility = 'hidden';
        }
        me._autorotate_start.ggUpdatePosition = function (useTransition) {
        }
        me._autorotate_buttons.appendChild(me._autorotate_start);
        el = me._autorotate_stop = document.createElement('div');
        els = me._autorotate_stop__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE3NSwzNDAuOWMtMzEsMC01Ni4xLDI1LjEtNTYuMSw1Ni4xczI1LjEsNTYuMSw1Ni4xLDU2LjFzNTYuMS0yNS4xLDU2LjEtNTYuMVMtMTQ0LDM0MC45LTE3NSwzNDAuOXoNCgkJIE0tMTk2LjEsMzcwLjRjNS44LTQuNiwxMy4xLTcuNCwyMS4xLTcuNGM3LjcsMCwxNC45LDIuNiwyMC42LDdsLTYuNCw2LjRjLTQtMi44LTguOS00LjQtMTQuMi00LjRjLTUuOCwwLTExLjEsMi0xNS4zLDUuMw0KCQljLTAuNiwwLjUtMS40LDAuNC0yLTAuMmMtMC41LTAuNS0zLjEtMy41LTQtNC40Qy0xOTYuOSwzNzItMTk2LjgsMzcxLTE5' +
            'Ni4xLDM3MC40eiBNLTIxNy4yLDM5N2MtMC41LDAtMC44LTAuMi0xLjEtMC43DQoJCWMtMC4zLTAuNS0wLjItMSwwLjEtMS4zbDEyLjctMTcuOGMwLjMtMC40LDAuNi0wLjYsMS4xLTAuNmMwLjQsMCwwLjcsMC4yLDEsMC42bDEyLjgsMTcuOGMwLjMsMC40LDAuNCwwLjksMC4xLDEuMw0KCQljLTAuMywwLjUtMC42LDAuNy0xLjEsMC43aC03LjZoLTAuNmMwLDUuMiwxLjcsMTAuMSw0LjUsMTQuMWwtNi40LDYuNGMtNC40LTUuNy03LTEyLjgtNy4xLTIwLjVoLTAuNUgtMjE3LjJ6IE0tMjA3LjIsNDMyLjMNCgkJYy0wLjQsMC0wLjgtMC4xLTEuMS0wLjRsLTEuNy0xLjdjLTAuNi0wLjYtMC42LTEuNi' +
            'wwLTIuMmw2Ni02NmMwLjMtMC4zLDAuNy0wLjQsMS4xLTAuNHMwLjgsMC4xLDEuMSwwLjRsMS43LDEuNw0KCQljMC42LDAuNiwwLjYsMS42LDAsMi4ybC02Niw2NkMtMjA2LjQsNDMyLjItMjA2LjgsNDMyLjMtMjA3LjIsNDMyLjN6IE0tMTUzLjksNDIzLjNjLTUuOCw0LjYtMTMuMSw3LjQtMjEuMSw3LjQNCgkJYy03LjcsMC0xNC44LTIuNi0yMC41LTYuOWw2LjQtNi40YzQsMi43LDguOCw0LjMsMTQsNC4zYzUuOCwwLDExLjEtMiwxNS4zLTUuM2MwLjYtMC41LDEuNC0wLjQsMiwwLjJjMC41LDAuNSwzLjEsMy41LDQsNC40DQoJCUMtMTUzLjEsNDIxLjgtMTUzLjIsNDIyLjgtMTUzLjksNDIzLjN6' +
            'IE0tMTQ0LjUsNDE2LjljLTAuMywwLjQtMC42LDAuNi0xLjEsMC42Yy0wLjQsMC0wLjctMC4yLTEtMC42bC0xMi44LTE3LjgNCgkJYy0wLjMtMC40LTAuNC0wLjktMC4xLTEuM2MwLjMtMC41LDAuNi0wLjcsMS4xLTAuN2g3LjZoMC43YzAtNS4zLTEuNi0xMC4xLTQuNC0xNC4ybDYuNC02LjRjNC40LDUuNyw3LDEyLjksNywyMC42aDAuNWg3LjcNCgkJYzAuNSwwLDAuOCwwLjIsMS4xLDAuN2MwLjMsMC41LDAuMiwxLTAuMSwxLjNMLTE0NC41LDQxNi45eiIvPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTQyLjgsMzYxLjdjMC40LDAsMC44LDAuMS' +
            'wxLjEsMC40bDEuNywxLjdjMC42LDAuNiwwLjYsMS42LDAsMi4ybC02Niw2NmMtMC4zLDAuMy0wLjcsMC40LTEuMSwwLjQNCgkJYy0wLjQsMC0wLjgtMC4xLTEuMS0wLjRsLTEuNy0xLjdjLTAuNi0wLjYtMC42LTEuNiwwLTIuMmw2Ni02NkMtMTQzLjYsMzYxLjgtMTQzLjIsMzYxLjctMTQyLjgsMzYxLjciLz4NCgk8Zz4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xOTIuMywzNzcuMWMwLjYsMC42LDEuNCwwLjYsMiwwLjJjNC4yLTMuMyw5LjUtNS4zLDE1LjMtNS4zYzUuMywwLDEwLjEsMS42LDE0LjIsNC40bDYuNC02LjQNCgkJCWMtNS43LTQuNC0xMi45LTctMjAuNi03Yy04LDAtMTUu' +
            'MywyLjgtMjEuMSw3LjRjLTAuNywwLjUtMC44LDEuNi0wLjEsMi4zQy0xOTUuNCwzNzMuNy0xOTIuOCwzNzYuNi0xOTIuMywzNzcuMXoiLz4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xMzEuNywzOTcuN2MtMC4zLTAuNS0wLjYtMC43LTEuMS0wLjdoLTcuN2gtMC41YzAtNy43LTIuNi0xNC45LTctMjAuNmwtNi40LDYuNGMyLjgsNCw0LjQsOC45LDQuNCwxNC4yDQoJCQloLTAuN2gtNy42Yy0wLjUsMC0wLjgsMC4yLTEuMSwwLjdjLTAuMywwLjUtMC4yLDEsMC4xLDEuM2wxMi44LDE3LjhjMC4zLDAuNCwwLjYsMC42LDEsMC42YzAuNSwwLDAuOC0wLjIsMS4xLTAuNmwxMi43LTE3LjgNCg' +
            'kJCUMtMTMxLjUsMzk4LjYtMTMxLjQsMzk4LjItMTMxLjcsMzk3Ljd6Ii8+DQoJPC9nPg0KCTxnPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTIwOSwzOTdjMC4xLDcuNywyLjcsMTQuOCw3LjEsMjAuNWw2LjQtNi40Yy0yLjgtNC00LjUtOC44LTQuNS0xNC4xaDAuNmg3LjZjMC41LDAsMC44LTAuMiwxLjEtMC43DQoJCQljMC4zLTAuNSwwLjItMS0wLjEtMS4zbC0xMi44LTE3LjhjLTAuMy0wLjQtMC42LTAuNi0xLTAuNmMtMC41LDAtMC44LDAuMi0xLjEsMC42bC0xMi43LDE3LjhjLTAuMywwLjQtMC40LDAuOS0wLjEsMS4zDQoJCQljMC4zLDAuNSwwLjYsMC43LDEuMSwwLjdoNy43SC0y' +
            'MDl6Ii8+DQoJCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTU3LjcsNDE2LjZjLTAuNi0wLjYtMS40LTAuNi0yLTAuMmMtNC4yLDMuMy05LjUsNS4zLTE1LjMsNS4zYy01LjIsMC0xMC0xLjYtMTQtNC4zbC02LjQsNi40DQoJCQljNS43LDQuMywxMi44LDYuOSwyMC41LDYuOWM4LDAsMTUuMy0yLjgsMjEuMS03LjRjMC43LTAuNSwwLjgtMS42LDAuMS0yLjNDLTE1NC42LDQyMC4xLTE1Ny4yLDQxNy4xLTE1Ny43LDQxNi42eiIvPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K';
        me._autorotate_stop__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;autorotate_stop;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._autorotate_stop__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE3NSwzMzQuNmMtMzQuNCwwLTYyLjQsMjcuOS02Mi40LDYyLjRzMjcuOSw2Mi40LDYyLjQsNjIuNHM2Mi40LTI3LjksNjIuNC02Mi40Uy0xNDAuNiwzMzQuNi0xNzUsMzM0LjZ6DQoJCSBNLTE5OC41LDM2Ny41YzYuNC01LjEsMTQuNi04LjIsMjMuNS04LjJjOC42LDAsMTYuNSwyLjksMjIuOSw3LjhsLTcuMiw3LjJjLTQuNS0zLjEtOS45LTQuOS0xNS43LTQuOWMtNi40LDAtMTIuMywyLjItMTcsNS45DQoJCWMtMC43LDAuNS0xLjYsMC40LTIuMi0wLjJjLTAuNi0wLjYtMy41LTMuOC00LjQtNC45Qy0xOTkuMywzNjku' +
            'Mi0xOTkuMywzNjguMS0xOTguNSwzNjcuNXogTS0yMjEuOSwzOTdjLTAuNSwwLTAuOS0wLjItMS4yLTAuNw0KCQljLTAuMy0wLjUtMC4yLTEuMSwwLjEtMS41bDE0LjEtMTkuOGMwLjMtMC40LDAuNi0wLjYsMS4yLTAuNmMwLjQsMCwwLjcsMC4yLDEuMSwwLjZsMTQuMiwxOS44YzAuMywwLjQsMC40LDEsMC4xLDEuNQ0KCQljLTAuMywwLjUtMC42LDAuNy0xLjIsMC43aC04LjVoLTAuN2MwLjEsNS44LDEuOSwxMS4yLDUsMTUuNmwtNy4xLDcuMWMtNC45LTYuMy03LjgtMTQuMi03LjktMjIuOGgtMC42SC0yMjEuOXogTS0yMTAuNyw0MzYuMw0KCQljLTAuNCwwLTAuOS0wLjItMS4yLTAuNWwtMS44LT' +
            'EuOGMtMC43LTAuNy0wLjctMS43LDAtMi40bDczLjMtNzMuM2MwLjMtMC4zLDAuOC0wLjUsMS4yLTAuNXMwLjksMC4yLDEuMiwwLjVsMS44LDEuOA0KCQljMC43LDAuNywwLjcsMS43LDAsMi40bC03My4zLDczLjNDLTIwOS45LDQzNi4xLTIxMC4zLDQzNi4zLTIxMC43LDQzNi4zeiBNLTE1MS41LDQyNi4zYy02LjQsNS4xLTE0LjYsOC4yLTIzLjUsOC4yDQoJCWMtOC41LDAtMTYuNC0yLjktMjIuOC03LjdsNy4yLTcuMmM0LjQsMyw5LjgsNC44LDE1LjYsNC44YzYuNCwwLDEyLjMtMi4yLDE3LTUuOWMwLjctMC41LDEuNi0wLjQsMi4yLDAuMmMwLjYsMC42LDMuNSwzLjgsNC40LDQuOQ0KCQlDLTE1' +
            'MC43LDQyNC41LTE1MC43LDQyNS43LTE1MS41LDQyNi4zeiBNLTE0MS4xLDQxOS4xYy0wLjMsMC40LTAuNiwwLjYtMS4yLDAuNmMtMC40LDAtMC43LTAuMi0xLjEtMC42bC0xNC4yLTE5LjgNCgkJYy0wLjMtMC40LTAuNC0xLTAuMS0xLjVjMC4zLTAuNSwwLjYtMC43LDEuMi0wLjdoOC40aDAuN2MwLTUuOC0xLjgtMTEuMy00LjktMTUuN2w3LjItNy4yYzQuOSw2LjQsNy44LDE0LjMsNy44LDIyLjloMC42aDguNg0KCQljMC41LDAsMC45LDAuMiwxLjIsMC43YzAuMywwLjUsMC4yLDEuMS0wLjEsMS41TC0xNDEuMSw0MTkuMXoiLz4NCjwvZz4NCjxnIGlkPSJMYXllcl8yIj4NCgk8cGF0aCBmaWxsPS' +
            'IjRkZGRkZGIiBkPSJNLTEzOS4zLDM1Ny43YzAuNCwwLDAuOSwwLjIsMS4yLDAuNWwxLjgsMS44YzAuNywwLjcsMC43LDEuNywwLDIuNGwtNzMuMyw3My4zYy0wLjMsMC4zLTAuOCwwLjUtMS4yLDAuNQ0KCQlzLTAuOS0wLjItMS4yLTAuNWwtMS44LTEuOGMtMC43LTAuNy0wLjctMS43LDAtMi40bDczLjMtNzMuM0MtMTQwLjEsMzU3LjktMTM5LjcsMzU3LjctMTM5LjMsMzU3LjciLz4NCgk8Zz4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xOTQuMiwzNzQuOWMwLjYsMC42LDEuNSwwLjcsMi4yLDAuMmM0LjctMy43LDEwLjYtNS45LDE3LTUuOWM1LjgsMCwxMS4zLDEuOCwxNS43LDQuOWw3' +
            'LjItNy4yDQoJCQljLTYuNC00LjktMTQuMy03LjgtMjIuOS03LjhjLTguOSwwLTE3LDMuMS0yMy41LDguMmMtMC44LDAuNi0wLjgsMS44LTAuMiwyLjZDLTE5Ny43LDM3MS4xLTE5NC44LDM3NC40LTE5NC4yLDM3NC45eiIvPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTEyNi45LDM5Ny43Yy0wLjMtMC41LTAuNi0wLjctMS4yLTAuN2gtOC42aC0wLjZjMC04LjYtMi45LTE2LjUtNy44LTIyLjlsLTcuMiw3LjINCgkJCWMzLjEsNC41LDQuOSw5LjksNC45LDE1LjdoLTAuN2gtOC40Yy0wLjUsMC0wLjksMC4yLTEuMiwwLjdjLTAuMywwLjUtMC4yLDEuMSwwLjEsMS41bDE0LjIsMTkuOGMwLj' +
            'MsMC40LDAuNiwwLjYsMS4xLDAuNg0KCQkJYzAuNSwwLDAuOS0wLjIsMS4yLTAuNmwxNC4xLTE5LjhDLTEyNi43LDM5OC44LTEyNi42LDM5OC4zLTEyNi45LDM5Ny43eiIvPg0KCTwvZz4NCgk8Zz4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0yMTIuNywzOTdjMC4xLDguNiwzLDE2LjUsNy45LDIyLjhsNy4xLTcuMWMtMy4xLTQuNC01LTkuOC01LTE1LjZoMC43aDguNWMwLjUsMCwwLjktMC4yLDEuMi0wLjcNCgkJCWMwLjMtMC41LDAuMi0xLjEtMC4xLTEuNWwtMTQuMi0xOS44Yy0wLjMtMC40LTAuNi0wLjYtMS4xLTAuNmMtMC41LDAtMC45LDAuMi0xLjIsMC42bC0xNC4xLDE5LjhjLTAu' +
            'MywwLjQtMC40LDEtMC4xLDEuNQ0KCQkJYzAuMywwLjUsMC42LDAuNywxLjIsMC43aDguNkgtMjEyLjd6Ii8+DQoJCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTU1LjgsNDE4LjhjLTAuNi0wLjYtMS41LTAuNy0yLjItMC4yYy00LjcsMy43LTEwLjYsNS45LTE3LDUuOWMtNS44LDAtMTEuMS0xLjgtMTUuNi00LjhsLTcuMiw3LjINCgkJCWM2LjMsNC44LDE0LjIsNy43LDIyLjgsNy43YzguOSwwLDE3LTMuMSwyMy41LTguMmMwLjgtMC42LDAuOC0xLjgsMC4yLTIuNkMtMTUyLjMsNDIyLjYtMTU1LjIsNDE5LjQtMTU1LjgsNDE4Ljh6Ii8+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo=';
        me._autorotate_stop__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;autorotate_stop;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "autorotate_stop";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 32px;';
        hs += 'left : 0px;';
        hs += 'opacity : 0;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : hidden;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._autorotate_stop.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._autorotate_stop.logicBlock_alpha = function () {
            var newLogicStateAlpha;
            if (
                (player.getIsAutorotating() == true)
            ) {
                newLogicStateAlpha = 0;
            } else {
                newLogicStateAlpha = -1;
            }
            if (me._autorotate_stop.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
                me._autorotate_stop.ggCurrentLogicStateAlpha = newLogicStateAlpha;
                me._autorotate_stop.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._autorotate_stop.ggCurrentLogicStateAlpha == 0) {
                    me._autorotate_stop.style.visibility = me._autorotate_stop.ggVisible ? 'inherit' : 'hidden';
                    me._autorotate_stop.style.opacity = 1;
                } else {
                    me._autorotate_stop.style.visibility = "hidden";
                    me._autorotate_stop.style.opacity = 0;
                }
            }
        }
        me._autorotate_stop.onmouseover = function (e) {
            me._autorotate_stop__img.style.visibility = 'hidden';
            me._autorotate_stop__imgo.style.visibility = 'inherit';
        }
        me._autorotate_stop.onmouseout = function (e) {
            me._autorotate_stop__img.style.visibility = 'inherit';
            me._autorotate_stop__imgo.style.visibility = 'hidden';
        }
        me._autorotate_stop.ggUpdatePosition = function (useTransition) {
        }
        me._autorotate_buttons.appendChild(me._autorotate_stop);
        me._controller_slider.appendChild(me._autorotate_buttons);
        el = me._zoomout = document.createElement('div');
        els = me._zoomout__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYX' +
            'RoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTQzLjIsMzg3LjVjMS4xLDAsMS42LDAuNSwxLjYsMS44djE1LjVjMCwwLjUtMC4yLDAuOS0wLjUsMS4zYy0wLjQsMC40LTAuNywwLjUtMS4xLDAuNWgtNjMuNQ0KCWMtMC40LDAtMC43LTAuMi0xLjEtMC41Yy0wLjQtMC40LTAuNS0wLjctMC41LTEuM3YtMTUuNWMwLTEuMywwLjUtMS44LDEuNi0xLjhILTE0My4yeiIvPg0KPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xNzUsMzQwLjljLTMxLDAtNTYuMSwyNS4xLTU2LjEsNTYuMXMyNS4xLDU2LjEsNTYuMSw1Ni4xczU2LjEtMjUuMSw1Ni4xLTU2LjFTLTE0NCwzNDAuOS0xNzUsMzQwLjl6DQoJIE0tMTQx' +
            'LjYsNDA0LjdjMCwwLjUtMC4yLDAuOS0wLjUsMS4zYy0wLjQsMC40LTAuNywwLjUtMS4xLDAuNWgtNjMuNWMtMC40LDAtMC43LTAuMi0xLjEtMC41Yy0wLjQtMC40LTAuNS0wLjctMC41LTEuM3YtMTUuNQ0KCWMwLTEuMywwLjUtMS44LDEuNi0xLjhoNjMuNWMxLjEsMCwxLjYsMC41LDEuNiwxLjhWNDA0Ljd6Ii8+DQo8L3N2Zz4NCg==';
        me._zoomout__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;zoomout;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._zoomout__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYX' +
            'RoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTM5LjcsMzg2LjRjMS4yLDAsMS44LDAuNiwxLjgsMnYxNy4yYzAsMC42LTAuMiwxLTAuNiwxLjRjLTAuNCwwLjQtMC44LDAuNi0xLjIsMC42aC03MC42DQoJYy0wLjQsMC0wLjgtMC4yLTEuMi0wLjZjLTAuNC0wLjQtMC42LTAuOC0wLjYtMS40di0xNy4yYzAtMS40LDAuNi0yLDEuOC0ySC0xMzkuN3oiLz4NCjxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTc1LDMzNC42Yy0zNC40LDAtNjIuNCwyNy45LTYyLjQsNjIuNHMyNy45LDYyLjQsNjIuNCw2Mi40czYyLjQtMjcuOSw2Mi40LTYyLjRTLTE0MC42LDMzNC42LTE3NSwzMzQuNnoNCgkgTS0xMzcuOSw0' +
            'MDUuNmMwLDAuNi0wLjIsMS0wLjYsMS40Yy0wLjQsMC40LTAuOCwwLjYtMS4yLDAuNmgtNzAuNmMtMC40LDAtMC44LTAuMi0xLjItMC42cy0wLjYtMC44LTAuNi0xLjR2LTE3LjINCgljMC0xLjQsMC42LTIsMS44LTJoNzAuNmMxLjIsMCwxLjgsMC42LDEuOCwyVjQwNS42eiIvPg0KPC9zdmc+DQo=';
        me._zoomout__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;zoomout;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "zoomout";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 32px;';
        hs += 'left : 32px;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : hidden;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._zoomout.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._zoomout.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('opt_zoom') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._zoomout.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._zoomout.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._zoomout.style[domTransition] = '';
                if (me._zoomout.ggCurrentLogicStateVisible == 0) {
                    me._zoomout.style.visibility = (Number(me._zoomout.style.opacity) > 0 || !me._zoomout.style.opacity) ? 'inherit' : 'hidden';
                    me._zoomout.ggVisible = true;
                } else {
                    me._zoomout.style.visibility = "hidden";
                    me._zoomout.ggVisible = false;
                }
            }
        }
        me._zoomout.onmouseover = function (e) {
            me._zoomout__img.style.visibility = 'hidden';
            me._zoomout__imgo.style.visibility = 'inherit';
        }
        me._zoomout.onmouseout = function (e) {
            me._zoomout__img.style.visibility = 'inherit';
            me._zoomout__imgo.style.visibility = 'hidden';
            me.elementMouseDown['zoomout'] = false;
        }
        me._zoomout.onmousedown = function (e) {
            me.elementMouseDown['zoomout'] = true;
        }
        me._zoomout.onmouseup = function (e) {
            me.elementMouseDown['zoomout'] = false;
        }
        me._zoomout.ontouchend = function (e) {
            me.elementMouseDown['zoomout'] = false;
        }
        me._zoomout.ggUpdatePosition = function (useTransition) {
        }
        me._controller_slider.appendChild(me._zoomout);
        el = me._zoomin = document.createElement('div');
        els = me._zoomin__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE3NSwzNDAuOWMtMzEsMC01Ni4xLDI1LjEtNTYuMSw1Ni4xczI1LjEsNTYuMSw1Ni4xLDU2LjFzNTYuMS0yNS4xLDU2LjEtNTYuMVMtMTQ0LDM0MC45LTE3NSwzNDAuOXoNCgkJIE0tMTQxLjYsNDA0LjdjMCwwLjUtMC4yLDAuOS0wLjUsMS4zYy0wLjQsMC40LTAuNywwLjUtMS4xLDAuNWgtMjIuM3YyMi4xYzAsMC41LTAuMiwwLjktMC41LDEuM2MtMC40LDAuNC0wLjcsMC41LTEuMSwwLjVoLTE1LjcNCgkJYy0wLjQsMC0wLjctMC4yLTEuMS0wLjVjLTAuNC0wLjQtMC41LTAuNy0wLjUtMS4zdi0yMi4xaC0yMi4zYy0w' +
            'LjQsMC0wLjctMC4yLTEuMS0wLjVjLTAuNC0wLjQtMC41LTAuNy0wLjUtMS4zdi0xNS41DQoJCWMwLTEuMywwLjUtMS44LDEuNi0xLjhoMjIuM3YtMjIuMWMwLTEuMywwLjUtMS44LDEuNi0xLjhoMTUuN2MxLjEsMCwxLjYsMC41LDEuNiwxLjh2MjIuMWgyMi4zYzEuMSwwLDEuNiwwLjUsMS42LDEuOA0KCQlDLTE0MS42LDM4OS4zLTE0MS42LDQwNC43LTE0MS42LDQwNC43eiIvPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTY1LjUsMzg3LjVoMjIuM2MxLjEsMCwxLjYsMC41LDEuNiwxLjh2MTUuNWMwLDAuNS0wLjIsMC45LTAuNSwxLjNjLTAuNC' +
            'wwLjQtMC43LDAuNS0xLjEsMC41aC0yMi4zdjIyLjENCgkJYzAsMC41LTAuMiwwLjktMC41LDEuM2MtMC40LDAuNC0wLjcsMC41LTEuMSwwLjVoLTE1LjdjLTAuNCwwLTAuNy0wLjItMS4xLTAuNWMtMC40LTAuNC0wLjUtMC43LTAuNS0xLjN2LTIyLjFoLTIyLjMNCgkJYy0wLjQsMC0wLjctMC4yLTEuMS0wLjVjLTAuNC0wLjQtMC41LTAuNy0wLjUtMS4zdi0xNS41YzAtMS4zLDAuNS0xLjgsMS42LTEuOGgyMi4zdi0yMi4xYzAtMS4zLDAuNS0xLjgsMS42LTEuOGgxNS43DQoJCWMxLjEsMCwxLjYsMC41LDEuNiwxLjhWMzg3LjV6Ii8+DQo8L2c+DQo8L3N2Zz4NCg==';
        me._zoomin__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;zoomin;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._zoomin__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE3NSwzMzQuNmMtMzQuNCwwLTYyLjQsMjcuOS02Mi40LDYyLjRzMjcuOSw2Mi40LDYyLjQsNjIuNHM2Mi40LTI3LjksNjIuNC02Mi40Uy0xNDAuNiwzMzQuNi0xNzUsMzM0LjZ6DQoJCSBNLTEzNy45LDQwNS42YzAsMC42LTAuMiwxLTAuNiwxLjRjLTAuNCwwLjQtMC44LDAuNi0xLjIsMC42aC0yNC44djI0LjZjMCwwLjYtMC4yLDEtMC42LDEuNHMtMC44LDAuNi0xLjIsMC42aC0xNy40DQoJCWMtMC40LDAtMC44LTAuMi0xLjItMC42Yy0wLjQtMC40LTAuNi0wLjgtMC42LTEuNHYtMjQuNmgtMjQuOGMtMC40LDAtMC44' +
            'LTAuMi0xLjItMC42cy0wLjYtMC44LTAuNi0xLjR2LTE3LjJjMC0xLjQsMC42LTIsMS44LTINCgkJaDI0Ljh2LTI0LjZjMC0xLjQsMC42LTIsMS44LTJoMTcuNGMxLjIsMCwxLjgsMC42LDEuOCwydjI0LjZoMjQuOGMxLjIsMCwxLjgsMC42LDEuOCwyQy0xMzcuOSwzODguNC0xMzcuOSw0MDUuNi0xMzcuOSw0MDUuNnoiLz4NCjwvZz4NCjxnIGlkPSJMYXllcl8yIj4NCgk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTE2NC41LDM4Ni40aDI0LjhjMS4yLDAsMS44LDAuNiwxLjgsMnYxNy4yYzAsMC42LTAuMiwxLTAuNiwxLjRjLTAuNCwwLjQtMC44LDAuNi0xLjIsMC42aC0yNC44djI0LjYNCgkJYz' +
            'AsMC42LTAuMiwxLTAuNiwxLjRzLTAuOCwwLjYtMS4yLDAuNmgtMTcuNGMtMC40LDAtMC44LTAuMi0xLjItMC42Yy0wLjQtMC40LTAuNi0wLjgtMC42LTEuNHYtMjQuNmgtMjQuOGMtMC40LDAtMC44LTAuMi0xLjItMC42DQoJCXMtMC42LTAuOC0wLjYtMS40di0xNy4yYzAtMS40LDAuNi0yLDEuOC0yaDI0Ljh2LTI0LjZjMC0xLjQsMC42LTIsMS44LTJoMTcuNGMxLjIsMCwxLjgsMC42LDEuOCwyVjM4Ni40eiIvPg0KPC9nPg0KPC9zdmc+DQo=';
        me._zoomin__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;zoomin;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "zoomin";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 32px;';
        hs += 'left : 0px;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : hidden;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._zoomin.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._zoomin.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('opt_zoom') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._zoomin.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._zoomin.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._zoomin.style[domTransition] = '';
                if (me._zoomin.ggCurrentLogicStateVisible == 0) {
                    me._zoomin.style.visibility = (Number(me._zoomin.style.opacity) > 0 || !me._zoomin.style.opacity) ? 'inherit' : 'hidden';
                    me._zoomin.ggVisible = true;
                } else {
                    me._zoomin.style.visibility = "hidden";
                    me._zoomin.ggVisible = false;
                }
            }
        }
        me._zoomin.onmouseover = function (e) {
            me._zoomin__img.style.visibility = 'hidden';
            me._zoomin__imgo.style.visibility = 'inherit';
        }
        me._zoomin.onmouseout = function (e) {
            me._zoomin__img.style.visibility = 'inherit';
            me._zoomin__imgo.style.visibility = 'hidden';
            me.elementMouseDown['zoomin'] = false;
        }
        me._zoomin.onmousedown = function (e) {
            me.elementMouseDown['zoomin'] = true;
        }
        me._zoomin.onmouseup = function (e) {
            me.elementMouseDown['zoomin'] = false;
        }
        me._zoomin.ontouchend = function (e) {
            me.elementMouseDown['zoomin'] = false;
        }
        me._zoomin.ggUpdatePosition = function (useTransition) {
        }
        me._controller_slider.appendChild(me._zoomin);
        me._controller.appendChild(me._controller_slider);
        el = me._element_alpha_timer = document.createElement('div');
        el.ggTimestamp = this.ggCurrentTime;
        el.ggLastIsActive = true;
        el.ggTimeout = 1000;
        el.ggId = "element_alpha_timer";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_timer ";
        el.ggType = 'timer';
        hs = '';
        hs += 'height : 32px;';
        hs += 'left : 0px;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : inherit;';
        hs += 'width : 32px;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._element_alpha_timer.ggIsActive = function () {
            return (me._element_alpha_timer.ggTimestamp + me._element_alpha_timer.ggTimeout) >= me.ggCurrentTime;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._element_alpha_timer.ggDeactivate = function () {
            player.setVariableValue('vis_timer', true);
        }
        me._element_alpha_timer.ggUpdatePosition = function (useTransition) {
        }
        me._controller.appendChild(me._element_alpha_timer);
        me.divSkin.appendChild(me._controller);
        el = me._thumbnail_menu = document.createElement('div');
        els = me._thumbnail_menu__content = document.createElement('div');
        el.ggContent = els;
        el.appendChild(els);
        el.ggHorScrollVisible = false;
        el.ggVertScrollVisible = false;
        el.ggContentLeftOffset = 0;
        el.ggContentTopOffset = 0;
        hs = '';
        hs += 'height : 77px;';
        hs += 'left : 50%;';
        hs += 'margin-left : -59.5px;';
        hs += 'margin-top : -38.5px;';
        hs += 'overflow : visible;';
        hs += 'position : absolute;';
        hs += 'top : 50%;';
        hs += 'width : 119px;';
        hs += "";
        els.setAttribute('style', hs);
        me._thumbnail_menu.ggScrollByX = function (diffX) {
            if (!me._thumbnail_menu.ggHorScrollVisible || diffX == 0) return;
            me._thumbnail_menu.ggScrollPosX = (me._thumbnail_menu__horScrollFg.offsetLeft + diffX);
            me._thumbnail_menu.ggScrollPosX = Math.max(me._thumbnail_menu.ggScrollPosX, 0);
            me._thumbnail_menu.ggScrollPosX = Math.min(me._thumbnail_menu.ggScrollPosX, me._thumbnail_menu__horScrollBg.clientWidth - me._thumbnail_menu__horScrollFg.clientWidth);
            me._thumbnail_menu__horScrollFg.style.left = me._thumbnail_menu.ggScrollPosX + 'px';
            me._thumbnail_menu__content.style.left = -(Math.round(me._thumbnail_menu.ggScrollPosX / me._thumbnail_menu.ggHPercentVisible)) + me._thumbnail_menu.ggContentLeftOffset + 'px';
            me._thumbnail_menu.ggScrollPosXPercent = (me._thumbnail_menu__horScrollFg.offsetLeft / me._thumbnail_menu__horScrollBg.clientWidth);
        }
        me._thumbnail_menu.ggScrollByXSmooth = function (diffX) {
            if (!me._thumbnail_menu.ggHorScrollVisible || diffX == 0) return;
            var scrollPerInterval = diffX / 25;
            var scrollCurrX = 0;
            var id = setInterval(function () {
                scrollCurrX += scrollPerInterval;
                me._thumbnail_menu.ggScrollPosX += scrollPerInterval;
                if (diffX > 0 && (scrollCurrX >= diffX || me._thumbnail_menu.ggScrollPosX >= me._thumbnail_menu__horScrollBg.clientWidth - me._thumbnail_menu__horScrollFg.clientWidth)) {
                    me._thumbnail_menu.ggScrollPosX = Math.min(me._thumbnail_menu.ggScrollPosX, me._thumbnail_menu__horScrollBg.clientWidth - me._thumbnail_menu__horScrollFg.clientWidth);
                    clearInterval(id);
                }
                if (diffX < 0 && (scrollCurrX <= diffX || me._thumbnail_menu.ggScrollPosX <= 0)) {
                    me._thumbnail_menu.ggScrollPosX = Math.max(me._thumbnail_menu.ggScrollPosX, 0);
                    clearInterval(id);
                }
                me._thumbnail_menu__horScrollFg.style.left = me._thumbnail_menu.ggScrollPosX + 'px';
                me._thumbnail_menu__content.style.left = -(Math.round(me._thumbnail_menu.ggScrollPosX / me._thumbnail_menu.ggHPercentVisible)) + me._thumbnail_menu.ggContentLeftOffset + 'px';
                me._thumbnail_menu.ggScrollPosXPercent = (me._thumbnail_menu__horScrollFg.offsetLeft / me._thumbnail_menu__horScrollBg.clientWidth);
            }, 10);
        }
        me._thumbnail_menu.ggScrollByY = function (diffY) {
            if (!me._thumbnail_menu.ggVertScrollVisible || diffY == 0) return;
            me._thumbnail_menu.ggScrollPosY = (me._thumbnail_menu__vertScrollFg.offsetTop + diffY);
            me._thumbnail_menu.ggScrollPosY = Math.max(me._thumbnail_menu.ggScrollPosY, 0);
            me._thumbnail_menu.ggScrollPosY = Math.min(me._thumbnail_menu.ggScrollPosY, me._thumbnail_menu__vertScrollBg.clientHeight - me._thumbnail_menu__vertScrollFg.clientHeight);
            me._thumbnail_menu__vertScrollFg.style.top = me._thumbnail_menu.ggScrollPosY + 'px';
            me._thumbnail_menu__content.style.top = -(Math.round(me._thumbnail_menu.ggScrollPosY / me._thumbnail_menu.ggVPercentVisible)) + me._thumbnail_menu.ggContentTopOffset + 'px';
            me._thumbnail_menu.ggScrollPosYPercent = (me._thumbnail_menu__vertScrollFg.offsetTop / me._thumbnail_menu__vertScrollBg.clientHeight);
        }
        me._thumbnail_menu.ggScrollByYSmooth = function (diffY) {
            if (!me._thumbnail_menu.ggVertScrollVisible || diffY == 0) return;
            var scrollPerInterval = diffY / 25;
            var scrollCurrY = 0;
            var id = setInterval(function () {
                scrollCurrY += scrollPerInterval;
                me._thumbnail_menu.ggScrollPosY += scrollPerInterval;
                if (diffY > 0 && (scrollCurrY >= diffY || me._thumbnail_menu.ggScrollPosY >= me._thumbnail_menu__vertScrollBg.clientHeight - me._thumbnail_menu__vertScrollFg.clientHeight)) {
                    me._thumbnail_menu.ggScrollPosY = Math.min(me._thumbnail_menu.ggScrollPosY, me._thumbnail_menu__vertScrollBg.clientHeight - me._thumbnail_menu__vertScrollFg.clientHeight);
                    clearInterval(id);
                }
                if (diffY < 0 && (scrollCurrY <= diffY || me._thumbnail_menu.ggScrollPosY <= 0)) {
                    me._thumbnail_menu.ggScrollPosY = Math.max(me._thumbnail_menu.ggScrollPosY, 0);
                    clearInterval(id);
                }
                me._thumbnail_menu__vertScrollFg.style.top = me._thumbnail_menu.ggScrollPosY + 'px';
                me._thumbnail_menu__content.style.top = -(Math.round(me._thumbnail_menu.ggScrollPosY / me._thumbnail_menu.ggVPercentVisible)) + me._thumbnail_menu.ggContentTopOffset + 'px';
                me._thumbnail_menu.ggScrollPosYPercent = (me._thumbnail_menu__vertScrollFg.offsetTop / me._thumbnail_menu__vertScrollBg.clientHeight);
            }, 10);
        }
        me._thumbnail_menu.ggScrollIntoView = function (posX, posY, width, height) {
            if (me._thumbnail_menu.ggHorScrollVisible) {
                if (posX < 0) {
                    var diffX = Math.floor(posX * me._thumbnail_menu.ggHPercentVisible);
                    me._thumbnail_menu.ggScrollByXSmooth(diffX);
                } else if (posX + width > me._thumbnail_menu.clientWidth - (me._thumbnail_menu.ggVertScrollVisible ? 15 : 0)) {
                    var diffX = Math.ceil(((posX + width) - (me._thumbnail_menu.clientWidth - (me._thumbnail_menu.ggVertScrollVisible ? 15 : 0))) * me._thumbnail_menu.ggHPercentVisible);
                    me._thumbnail_menu.ggScrollByXSmooth(diffX);
                }
            }
            if (me._thumbnail_menu.ggVertScrollVisible) {
                if (posY < 0) {
                    var diffY = Math.floor(posY * me._thumbnail_menu.ggVPercentVisible);
                    me._thumbnail_menu.ggScrollByYSmooth(diffY);
                } else if (posY + height > me._thumbnail_menu.clientHeight - (me._thumbnail_menu.ggHorScrollVisible ? 15 : 0)) {
                    var diffY = Math.ceil(((posY + height) - (me._thumbnail_menu.clientHeight - (me._thumbnail_menu.ggHorScrollVisible ? 15 : 0))) * me._thumbnail_menu.ggVPercentVisible);
                    me._thumbnail_menu.ggScrollByYSmooth(diffY);
                }
            }
        }
        els.ontouchstart = function (e) {
            e = e || window.event;
            var t = e.touches;
            me._thumbnail_menu.ggDragLastX = t[0].clientX;
            me._thumbnail_menu.ggDragLastY = t[0].clientY;
            me._thumbnail_menu__content.ontouchend = function () {
                me._thumbnail_menu__content.ontouchend = null;
                me._thumbnail_menu__content.ontouchmove = null;
            }
            me._thumbnail_menu__content.ontouchmove = function (e) {
                e = e || window.event;
                e.preventDefault();
                var t = e.touches;
                var diffX = t[0].clientX - me._thumbnail_menu.ggDragLastX;
                var diffY = t[0].clientY - me._thumbnail_menu.ggDragLastY;
                me._thumbnail_menu.ggDragLastX = t[0].clientX;
                me._thumbnail_menu.ggDragLastY = t[0].clientY;
                me._thumbnail_menu.ggScrollByX(-diffX);
                me._thumbnail_menu.ggScrollByY(-diffY);
            }
        }
        elHorScrollBg = me._thumbnail_menu__horScrollBg = document.createElement('div');
        el.appendChild(elHorScrollBg);
        elHorScrollBg.setAttribute('style', 'position: absolute; left: 0px; bottom: 0px; visibility: hidden; width: 400px; height: 15px; background-color: rgba(0,0,0,0.392157); pointer-events: auto;');
        elHorScrollBg.className = 'ggskin ggskin_scrollarea_hscrollbg';
        elHorScrollFg = me._thumbnail_menu__horScrollFg = document.createElement('div');
        elHorScrollBg.appendChild(elHorScrollFg);
        elHorScrollFg.className = 'ggskin ggskin_scrollarea_hscrollfg';
        elHorScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 400px; height: 15px; background-color: rgba(0,0,0,1); pointer-events: auto;');
        me._thumbnail_menu.ggScrollPosX = 0;
        me._thumbnail_menu.ggScrollPosXPercent = 0.0;
        elHorScrollFg.onmousedown = function (e) {
            e = e || window.event;
            e.preventDefault();
            e.stopPropagation();
            me._thumbnail_menu.ggDragLastX = e.clientX;
            document.onmouseup = function () {
                document.onmouseup = null;
                document.onmousemove = null;
            }
            document.onmousemove = function (e) {
                e = e || window.event;
                e.preventDefault();
                var diffX = e.clientX - me._thumbnail_menu.ggDragLastX;
                me._thumbnail_menu.ggDragLastX = e.clientX;
                me._thumbnail_menu.ggScrollByX(diffX);
            }
        }
        elHorScrollFg.ontouchstart = function (e) {
            e = e || window.event;
            e.preventDefault();
            e.stopPropagation();
            var t = e.touches;
            me._thumbnail_menu.ggDragLastX = t[0].clientX;
            document.ontouchend = function () {
                document.ontouchend = null;
                document.ontouchmove = null;
            }
            document.ontouchmove = function (e) {
                e = e || window.event;
                e.preventDefault();
                var t = e.touches;
                var diffX = t[0].clientX - me._thumbnail_menu.ggDragLastX;
                me._thumbnail_menu.ggDragLastX = t[0].clientX;
                me._thumbnail_menu.ggScrollByX(diffX);
            }
        }
        elHorScrollBg.onmousedown = function (e) {
            e = e || window.event;
            e.preventDefault();
            var diffX = me._thumbnail_menu.ggScrollWidth;
            if (e.offsetX < me._thumbnail_menu.ggScrollPosX) {
                diffX = diffX * -1;
            }
            me._thumbnail_menu.ggScrollByXSmooth(diffX);
        }
        elHorScrollBg.ontouchstart = function (e) {
            e = e || window.event;
            e.preventDefault();
            e.stopPropagation();
            var t = e.touches;
            var rect = me._thumbnail_menu__horScrollBg.getBoundingClientRect();
            var diffX = me._thumbnail_menu.ggScrollWidth;
            if ((t[0].clientX - rect.left) < me._thumbnail_menu.ggScrollPosX) {
                diffX = diffX * -1;
            }
            me._thumbnail_menu.ggScrollByXSmooth(diffX);
        }
        el.addEventListener('wheel', function (e) {
            var wheelDelta = Math.sign(e.deltaX);
            me._thumbnail_menu.ggScrollByXSmooth(20 * wheelDelta);
        });
        elCornerBg = me._thumbnail_menu__cornerBg = document.createElement('div');
        el.appendChild(elCornerBg);
        elCornerBg.setAttribute('style', 'position: absolute; right: 0px; bottom: 0px; visibility: hidden; width: 15px; height: 15px; background-color: rgba(255,255,255,1);');
        elCornerBg.className = 'ggskin ggskin_scrollarea_scrollcorner';
        el.ggId = "thumbnail_menu";
        el.ggDx = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_scrollarea ";
        el.ggType = 'scrollarea';
        hs = '';
        hs += 'border : 1px solid rgba(0, 0, 0, 0);';
        hs += 'bottom : 65px;';
        hs += 'height : 85px;';
        hs += 'left : -10000px;';
        hs += 'opacity : 0;';
        hs += 'overflow : hidden;';
        hs += 'position : absolute;';
        hs += 'visibility : hidden;';
        hs += 'width : 80%;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._thumbnail_menu.ggIsActive = function () {
            return false;
        }
        el.ggElementNodeId = function () {
            return player.getCurrentNode();
        }
        me._thumbnail_menu.logicBlock_position = function () {
            var newLogicStatePosition;
            if (
                (player.getVariableValue('vis_website') == true) ||
                (player.getVariableValue('vis_video_popup_youtube') == true) ||
                (player.getVariableValue('vis_video_popup_vimeo') == true) ||
                (player.getVariableValue('vis_video_popup_url') == true) ||
                (player.getVariableValue('vis_video_popup_file') == true) ||
                (player.getVariableValue('vis_info_popup') == true) ||
                (player.getVariableValue('vis_image_popup') == true) ||
                (player.getVariableValue('vis_userdata') == true)
            ) {
                newLogicStatePosition = 0;
            } else {
                newLogicStatePosition = -1;
            }
            if (me._thumbnail_menu.ggCurrentLogicStatePosition != newLogicStatePosition) {
                me._thumbnail_menu.ggCurrentLogicStatePosition = newLogicStatePosition;
                me._thumbnail_menu.style[domTransition] = 'left 0s, bottom 0s, opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._thumbnail_menu.ggCurrentLogicStatePosition == 0) {
                    this.ggDx = 0;
                    me._thumbnail_menu.style.bottom = '-100px';
                    me._thumbnail_menu.ggUpdatePosition(true);
                } else {
                    me._thumbnail_menu.ggDx = 0;
                    me._thumbnail_menu.style.bottom = '65px';
                    me._thumbnail_menu.ggUpdatePosition(true);
                }
            }
        }
        me._thumbnail_menu.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('opt_thumbnail') == true) &&
                (player.getIsTour() == true) &&
                (player.getViewerSize().width > 450)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._thumbnail_menu.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._thumbnail_menu.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._thumbnail_menu.style[domTransition] = 'left 0s, bottom 0s, opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._thumbnail_menu.ggCurrentLogicStateVisible == 0) {
                    me._thumbnail_menu.style.visibility = (Number(me._thumbnail_menu.style.opacity) > 0 || !me._thumbnail_menu.style.opacity) ? 'inherit' : 'hidden';
                    me._thumbnail_menu.ggVisible = true;
                } else {
                    me._thumbnail_menu.style.visibility = "hidden";
                    me._thumbnail_menu.ggVisible = false;
                }
            }
        }
        me._thumbnail_menu.logicBlock_alpha = function () {
            var newLogicStateAlpha;
            if (
                (player.getVariableValue('vis_thumbnail_menu_show') == true) &&
                (player.getVariableValue('vis_thumbnail_menu_auto_hide') == true) &&
                (player.getVariableValue('vis_timer') == true) &&
                (player.getViewerSize().width > 450)
            ) {
                newLogicStateAlpha = 0;
            } else {
                newLogicStateAlpha = -1;
            }
            if (me._thumbnail_menu.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
                me._thumbnail_menu.ggCurrentLogicStateAlpha = newLogicStateAlpha;
                me._thumbnail_menu.style[domTransition] = 'left 0s, bottom 0s, opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._thumbnail_menu.ggCurrentLogicStateAlpha == 0) {
                    me._thumbnail_menu.style.visibility = me._thumbnail_menu.ggVisible ? 'inherit' : 'hidden';
                    me._thumbnail_menu.style.opacity = 1;
                } else {
                    me._thumbnail_menu.style.visibility = "hidden";
                    me._thumbnail_menu.style.opacity = 0;
                }
            }
        }
        me._thumbnail_menu.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = ((this.ggDx * pw) / 100.0 + pw / 2 - w / 2) + 'px';
            }
            {
                this.ggContent.style.left = '0px';
                this.ggContent.style.top = '0px';
                this.ggContentLeftOffset = 0;
                this.ggContentTopOffset = 0;
                var domRectContent = this.ggContent.getBoundingClientRect();
                var minX = 0;
                var minY = 0;
                var maxX = 0;
                var maxY = 0;
                var stack = [];
                stack.push(this.ggContent);
                while (stack.length > 0) {
                    var e = stack.pop();
                    if (e.getBoundingClientRect) {
                        var domRectChild = e.getBoundingClientRect();
                        var diffX = domRectChild.left - domRectContent.left;
                        minX = Math.min(minX, diffX);
                        maxX = Math.max(maxX, diffX + domRectChild.width);
                        var diffY = domRectChild.top - domRectContent.top;
                        minY = Math.min(minY, diffY);
                        maxY = Math.max(maxY, diffY + domRectChild.height);
                    }
                    if (e.hasChildNodes()) {
                        for (var i = 0; i < e.childNodes.length; i++) {
                            stack.push(e.childNodes[i]);
                        }
                    }
                }
                if (minX < 0) this.ggContentLeftOffset = -minX;
                if (minY < 0) this.ggContentTopOffset = -minY;
                var contentWidth = maxX - minX;
                var contentHeight = maxY - minY;
                this.ggContent.style.left = this.ggContentLeftOffset + 'px';
                this.ggContent.style.top = this.ggContentTopOffset + 'px';
                var containerWidth = this.clientWidth;
                if (contentWidth < containerWidth) {
                    this.ggContent.style.left = '50%';
                    this.ggContent.style.marginLeft = (contentWidth / -2) + 'px';
                } else {
                    this.ggContent.style.left = this.ggContentLeftOffset + 'px';
                    this.ggContent.style.marginLeft = '0px';
                }
                var containerHeight = this.clientHeight;
                if (contentHeight < containerHeight) {
                    this.ggContent.style.top = '50%';
                    this.ggContent.style.marginTop = (contentHeight / -2) + 'px';
                } else {
                    this.ggContent.style.top = this.ggContentTopOffset + 'px';
                    this.ggContent.style.marginTop = '0px';
                }
                if (contentWidth > this.clientWidth) {
                    me._thumbnail_menu__horScrollBg.style.visibility = 'inherit';
                    me._thumbnail_menu__horScrollFg.style.visibility = 'inherit';
                    me._thumbnail_menu.ggHorScrollVisible = true;
                } else {
                    me._thumbnail_menu__horScrollBg.style.visibility = 'hidden';
                    me._thumbnail_menu__horScrollFg.style.visibility = 'hidden';
                    me._thumbnail_menu.ggHorScrollVisible = false;
                }
                if (me._thumbnail_menu.ggHorScrollVisible) {
                    if (me._thumbnail_menu.ggVertScrollVisible) {
                        me._thumbnail_menu.ggAvailableWidth = me._thumbnail_menu.clientWidth - 15;
                    } else {
                        me._thumbnail_menu.ggAvailableWidth = me._thumbnail_menu.clientWidth;
                    }
                    me._thumbnail_menu__horScrollBg.style.width = me._thumbnail_menu.ggAvailableWidth + 'px';
                    me._thumbnail_menu.ggHPercentVisible = me._thumbnail_menu.ggAvailableWidth / contentWidth;
                    if (me._thumbnail_menu.ggHPercentVisible > 1.0) me._thumbnail_menu.ggHPercentVisible = 1.0;
                    me._thumbnail_menu.ggScrollWidth = Math.round(me._thumbnail_menu__horScrollBg.clientWidth * me._thumbnail_menu.ggHPercentVisible);
                    me._thumbnail_menu__horScrollFg.style.width = me._thumbnail_menu.ggScrollWidth + 'px';
                    me._thumbnail_menu.ggScrollPosX = me._thumbnail_menu.ggScrollPosXPercent * me._thumbnail_menu.ggAvailableWidth;
                    me._thumbnail_menu.ggScrollPosX = Math.min(me._thumbnail_menu.ggScrollPosX, me._thumbnail_menu__horScrollBg.clientWidth - me._thumbnail_menu__horScrollFg.clientWidth);
                    me._thumbnail_menu__horScrollFg.style.left = me._thumbnail_menu.ggScrollPosX + 'px';
                    me._thumbnail_menu__content.style.left = -(Math.round(me._thumbnail_menu.ggScrollPosX / me._thumbnail_menu.ggHPercentVisible)) + this.ggContentLeftOffset + 'px';
                } else {
                    me._thumbnail_menu.ggScrollPosX = 0;
                    me._thumbnail_menu.ggScrollPosXPercent = 0.0;
                }
            }
        }
        el = me._thumbnail_cloner = document.createElement('div');
        el.ggNumRepeat = 1;
        el.ggWidth = 96;
        el.ggHeight = 62;
        el.ggUpdating = false;
        el.ggFilter = [];
        el.ggInstances = [];
        me._thumbnail_cloner.callChildLogicBlocks_changenodeid = function () {
            if (me._thumbnail_cloner.ggInstances) {
                var i;
                for (i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
                    if (me._thumbnail_cloner.ggInstances[i]._checkmark_tick && me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_visible) {
                        me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_visible();
                    }
                    if (me._thumbnail_cloner.ggInstances[i]._thumbnail_title && me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha) {
                        me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha();
                    }
                }
            }
        }
        me._thumbnail_cloner.callChildLogicBlocks_mouseover = function () {
            if (me._thumbnail_cloner.ggInstances) {
                var i;
                for (i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
                    if (me._thumbnail_cloner.ggInstances[i]._thumbnail_active && me._thumbnail_cloner.ggInstances[i]._thumbnail_active.logicBlock_bordercolor) {
                        me._thumbnail_cloner.ggInstances[i]._thumbnail_active.logicBlock_bordercolor();
                    }
                }
            }
        }
        me._thumbnail_cloner.callChildLogicBlocks_mouseover = function () {
            if (me._thumbnail_cloner.ggInstances) {
                var i;
                for (i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
                    if (me._thumbnail_cloner.ggInstances[i]._thumbnail_title && me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha) {
                        me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha();
                    }
                }
            }
        }
        me._thumbnail_cloner.callChildLogicBlocks_active = function () {
            if (me._thumbnail_cloner.ggInstances) {
                var i;
                for (i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
                    if (me._thumbnail_cloner.ggInstances[i]._checkmark_tick && me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_visible) {
                        me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_visible();
                    }
                    if (me._thumbnail_cloner.ggInstances[i]._thumbnail_active && me._thumbnail_cloner.ggInstances[i]._thumbnail_active.logicBlock_bordercolor) {
                        me._thumbnail_cloner.ggInstances[i]._thumbnail_active.logicBlock_bordercolor();
                    }
                }
            }
        }
        me._thumbnail_cloner.callChildLogicBlocks_varchanged_opt_thumbnail_tooltip = function () {
            if (me._thumbnail_cloner.ggInstances) {
                var i;
                for (i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
                    if (me._thumbnail_cloner.ggInstances[i]._thumbnail_title && me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha) {
                        me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha();
                    }
                }
            }
        }
        el.ggUpdate = function (filter) {
            if (me._thumbnail_cloner.ggUpdating == true) return;
            me._thumbnail_cloner.ggUpdating = true;
            var el = me._thumbnail_cloner;
            el.ggInstances = [];
            if (typeof filter == 'object') {
                el.ggFilter = filter;
            } else {
                filter = el.ggFilter;
            }
            ;
            if (me.ggTag) filter.push(me.ggTag);
            el.ggCurrentFilter = filter;
            if (el.hasChildNodes() == true) {
                while (el.firstChild) {
                    el.removeChild(el.firstChild);
                }
            }
            var tourNodes = player.getNodeIds();
            var row = 0;
            var column = 0;
            var numRows = el.ggNumRepeat;
            if (numRows < 1) numRows = 1;
            for (var i = 0; i < tourNodes.length; i++) {
                var nodeId = tourNodes[i];
                var passed = true;
                if (filter.length > 0) {
                    var nodeData = player.getNodeUserdata(nodeId);
                    for (var j = 0; j < filter.length; j++) {
                        if (nodeData['tags'].indexOf(filter[j]) == -1) passed = false;
                    }
                }
                if (passed) {
                    var parameter = {};
                    parameter.top = (row * me._thumbnail_cloner.ggHeight) + 'px';
                    parameter.left = (column * me._thumbnail_cloner.ggWidth) + 'px';
                    var inst = new SkinCloner_thumbnail_cloner_Class(nodeId, me, el, parameter);
                    el.ggInstances.push(inst);
                    el.appendChild(inst.__div);
                    inst.__div.ggObj = inst;
                    skin.updateSize(inst.__div);
                    row++;
                    if (row >= numRows) {
                        row = 0;
                        column++;
                    }
                }
            }
            me._thumbnail_cloner.callChildLogicBlocks_changenodeid();
            me._thumbnail_cloner.callChildLogicBlocks_mouseover();
            me._thumbnail_cloner.callChildLogicBlocks_mouseover();
            me._thumbnail_cloner.callChildLogicBlocks_active();
            me._thumbnail_cloner.callChildLogicBlocks_varchanged_opt_thumbnail_tooltip();
            me._thumbnail_cloner.ggUpdating = false;
            player.triggerEvent('clonerchanged');
        }
        el.ggFilter = [];
        el.ggId = "thumbnail_cloner";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_cloner ";
        el.ggType = 'cloner';
        hs = '';
        hs += 'height : 62px;';
        hs += 'left : 2px;';
        hs += 'overflow : visible;';
        hs += 'position : absolute;';
        hs += 'top : 2px;';
        hs += 'visibility : inherit;';
        hs += 'width : 96px;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._thumbnail_cloner.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._thumbnail_cloner.onmouseover = function (e) {
            me.elementMouseOver['thumbnail_cloner'] = true;
        }
        me._thumbnail_cloner.onmouseout = function (e) {
            me.elementMouseOver['thumbnail_cloner'] = false;
        }
        me._thumbnail_cloner.ontouchend = function (e) {
            me.elementMouseOver['thumbnail_cloner'] = false;
        }
        me._thumbnail_cloner.ggUpdateConditionNodeChange = function () {
            var cnode = player.getCurrentNode();
            for (var i = 0; i < me._thumbnail_cloner.childNodes.length; i++) {
                var child = me._thumbnail_cloner.childNodes[i];
                if (child.ggObj && child.ggObj.ggNodeId == cnode) {
                    var childOffX = child.offsetLeft;
                    var childOffY = child.offsetTop;
                    var p = child.parentElement;
                    while (p != null && p !== this.divSkin) {
                        if (p.ggType && p.ggType == 'scrollarea') {
                            p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
                        }
                        childOffX += p.offsetLeft;
                        childOffY += p.offsetTop;
                        p = p.parentElement;
                    }
                }
            }
        }
        me._thumbnail_cloner.ggUpdatePosition = function (useTransition) {
            var w = player.getViewerSize().width;
            var h = player.getViewerSize().height
            if ((!me._thumbnail_cloner.ggLastSize) || (me._thumbnail_cloner.ggLastSize.w != w) || (me._thumbnail_cloner.ggLastSize.h != h)) {
                me._thumbnail_cloner.ggLastSize = {w: w, h: h};
                me._thumbnail_cloner.ggUpdate();
            }
        }
        me._thumbnail_cloner.ggNodeChange = function () {
            me._thumbnail_cloner.ggUpdateConditionNodeChange();
        }
        me._thumbnail_menu__content.appendChild(me._thumbnail_cloner);
        me.divSkin.appendChild(me._thumbnail_menu);
        el = me._thumbnail_menu_mobile = document.createElement('div');
        els = me._thumbnail_menu_mobile__content = document.createElement('div');
        el.ggContent = els;
        el.appendChild(els);
        el.ggHorScrollVisible = false;
        el.ggVertScrollVisible = false;
        el.ggContentLeftOffset = 0;
        el.ggContentTopOffset = 0;
        hs = '';
        hs += 'height : 76.764px;';
        hs += 'left : 50%;';
        hs += 'margin-left : -59.49px;';
        hs += 'overflow : visible;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'width : 118.98px;';
        hs += "";
        els.setAttribute('style', hs);
        me._thumbnail_menu_mobile.ggScrollByX = function (diffX) {
            if (!me._thumbnail_menu_mobile.ggHorScrollVisible || diffX == 0) return;
            me._thumbnail_menu_mobile.ggScrollPosX = (me._thumbnail_menu_mobile__horScrollFg.offsetLeft + diffX);
            me._thumbnail_menu_mobile.ggScrollPosX = Math.max(me._thumbnail_menu_mobile.ggScrollPosX, 0);
            me._thumbnail_menu_mobile.ggScrollPosX = Math.min(me._thumbnail_menu_mobile.ggScrollPosX, me._thumbnail_menu_mobile__horScrollBg.clientWidth - me._thumbnail_menu_mobile__horScrollFg.clientWidth);
            me._thumbnail_menu_mobile__horScrollFg.style.left = me._thumbnail_menu_mobile.ggScrollPosX + 'px';
            me._thumbnail_menu_mobile__content.style.left = -(Math.round(me._thumbnail_menu_mobile.ggScrollPosX / me._thumbnail_menu_mobile.ggHPercentVisible)) + me._thumbnail_menu_mobile.ggContentLeftOffset + 'px';
            me._thumbnail_menu_mobile.ggScrollPosXPercent = (me._thumbnail_menu_mobile__horScrollFg.offsetLeft / me._thumbnail_menu_mobile__horScrollBg.clientWidth);
        }
        me._thumbnail_menu_mobile.ggScrollByXSmooth = function (diffX) {
            if (!me._thumbnail_menu_mobile.ggHorScrollVisible || diffX == 0) return;
            var scrollPerInterval = diffX / 25;
            var scrollCurrX = 0;
            var id = setInterval(function () {
                scrollCurrX += scrollPerInterval;
                me._thumbnail_menu_mobile.ggScrollPosX += scrollPerInterval;
                if (diffX > 0 && (scrollCurrX >= diffX || me._thumbnail_menu_mobile.ggScrollPosX >= me._thumbnail_menu_mobile__horScrollBg.clientWidth - me._thumbnail_menu_mobile__horScrollFg.clientWidth)) {
                    me._thumbnail_menu_mobile.ggScrollPosX = Math.min(me._thumbnail_menu_mobile.ggScrollPosX, me._thumbnail_menu_mobile__horScrollBg.clientWidth - me._thumbnail_menu_mobile__horScrollFg.clientWidth);
                    clearInterval(id);
                }
                if (diffX < 0 && (scrollCurrX <= diffX || me._thumbnail_menu_mobile.ggScrollPosX <= 0)) {
                    me._thumbnail_menu_mobile.ggScrollPosX = Math.max(me._thumbnail_menu_mobile.ggScrollPosX, 0);
                    clearInterval(id);
                }
                me._thumbnail_menu_mobile__horScrollFg.style.left = me._thumbnail_menu_mobile.ggScrollPosX + 'px';
                me._thumbnail_menu_mobile__content.style.left = -(Math.round(me._thumbnail_menu_mobile.ggScrollPosX / me._thumbnail_menu_mobile.ggHPercentVisible)) + me._thumbnail_menu_mobile.ggContentLeftOffset + 'px';
                me._thumbnail_menu_mobile.ggScrollPosXPercent = (me._thumbnail_menu_mobile__horScrollFg.offsetLeft / me._thumbnail_menu_mobile__horScrollBg.clientWidth);
            }, 10);
        }
        me._thumbnail_menu_mobile.ggScrollByY = function (diffY) {
            if (!me._thumbnail_menu_mobile.ggVertScrollVisible || diffY == 0) return;
            me._thumbnail_menu_mobile.ggScrollPosY = (me._thumbnail_menu_mobile__vertScrollFg.offsetTop + diffY);
            me._thumbnail_menu_mobile.ggScrollPosY = Math.max(me._thumbnail_menu_mobile.ggScrollPosY, 0);
            me._thumbnail_menu_mobile.ggScrollPosY = Math.min(me._thumbnail_menu_mobile.ggScrollPosY, me._thumbnail_menu_mobile__vertScrollBg.clientHeight - me._thumbnail_menu_mobile__vertScrollFg.clientHeight);
            me._thumbnail_menu_mobile__vertScrollFg.style.top = me._thumbnail_menu_mobile.ggScrollPosY + 'px';
            me._thumbnail_menu_mobile__content.style.top = -(Math.round(me._thumbnail_menu_mobile.ggScrollPosY / me._thumbnail_menu_mobile.ggVPercentVisible)) + me._thumbnail_menu_mobile.ggContentTopOffset + 'px';
            me._thumbnail_menu_mobile.ggScrollPosYPercent = (me._thumbnail_menu_mobile__vertScrollFg.offsetTop / me._thumbnail_menu_mobile__vertScrollBg.clientHeight);
        }
        me._thumbnail_menu_mobile.ggScrollByYSmooth = function (diffY) {
            if (!me._thumbnail_menu_mobile.ggVertScrollVisible || diffY == 0) return;
            var scrollPerInterval = diffY / 25;
            var scrollCurrY = 0;
            var id = setInterval(function () {
                scrollCurrY += scrollPerInterval;
                me._thumbnail_menu_mobile.ggScrollPosY += scrollPerInterval;
                if (diffY > 0 && (scrollCurrY >= diffY || me._thumbnail_menu_mobile.ggScrollPosY >= me._thumbnail_menu_mobile__vertScrollBg.clientHeight - me._thumbnail_menu_mobile__vertScrollFg.clientHeight)) {
                    me._thumbnail_menu_mobile.ggScrollPosY = Math.min(me._thumbnail_menu_mobile.ggScrollPosY, me._thumbnail_menu_mobile__vertScrollBg.clientHeight - me._thumbnail_menu_mobile__vertScrollFg.clientHeight);
                    clearInterval(id);
                }
                if (diffY < 0 && (scrollCurrY <= diffY || me._thumbnail_menu_mobile.ggScrollPosY <= 0)) {
                    me._thumbnail_menu_mobile.ggScrollPosY = Math.max(me._thumbnail_menu_mobile.ggScrollPosY, 0);
                    clearInterval(id);
                }
                me._thumbnail_menu_mobile__vertScrollFg.style.top = me._thumbnail_menu_mobile.ggScrollPosY + 'px';
                me._thumbnail_menu_mobile__content.style.top = -(Math.round(me._thumbnail_menu_mobile.ggScrollPosY / me._thumbnail_menu_mobile.ggVPercentVisible)) + me._thumbnail_menu_mobile.ggContentTopOffset + 'px';
                me._thumbnail_menu_mobile.ggScrollPosYPercent = (me._thumbnail_menu_mobile__vertScrollFg.offsetTop / me._thumbnail_menu_mobile__vertScrollBg.clientHeight);
            }, 10);
        }
        me._thumbnail_menu_mobile.ggScrollIntoView = function (posX, posY, width, height) {
            if (me._thumbnail_menu_mobile.ggHorScrollVisible) {
                if (posX < 0) {
                    var diffX = Math.floor(posX * me._thumbnail_menu_mobile.ggHPercentVisible);
                    me._thumbnail_menu_mobile.ggScrollByXSmooth(diffX);
                } else if (posX + width > me._thumbnail_menu_mobile.clientWidth - (me._thumbnail_menu_mobile.ggVertScrollVisible ? 15 : 0)) {
                    var diffX = Math.ceil(((posX + width) - (me._thumbnail_menu_mobile.clientWidth - (me._thumbnail_menu_mobile.ggVertScrollVisible ? 15 : 0))) * me._thumbnail_menu_mobile.ggHPercentVisible);
                    me._thumbnail_menu_mobile.ggScrollByXSmooth(diffX);
                }
            }
            if (me._thumbnail_menu_mobile.ggVertScrollVisible) {
                if (posY < 0) {
                    var diffY = Math.floor(posY * me._thumbnail_menu_mobile.ggVPercentVisible);
                    me._thumbnail_menu_mobile.ggScrollByYSmooth(diffY);
                } else if (posY + height > me._thumbnail_menu_mobile.clientHeight - (me._thumbnail_menu_mobile.ggHorScrollVisible ? 15 : 0)) {
                    var diffY = Math.ceil(((posY + height) - (me._thumbnail_menu_mobile.clientHeight - (me._thumbnail_menu_mobile.ggHorScrollVisible ? 15 : 0))) * me._thumbnail_menu_mobile.ggVPercentVisible);
                    me._thumbnail_menu_mobile.ggScrollByYSmooth(diffY);
                }
            }
        }
        els.ontouchstart = function (e) {
            e = e || window.event;
            var t = e.touches;
            me._thumbnail_menu_mobile.ggDragLastX = t[0].clientX;
            me._thumbnail_menu_mobile.ggDragLastY = t[0].clientY;
            me._thumbnail_menu_mobile__content.ontouchend = function () {
                me._thumbnail_menu_mobile__content.ontouchend = null;
                me._thumbnail_menu_mobile__content.ontouchmove = null;
            }
            me._thumbnail_menu_mobile__content.ontouchmove = function (e) {
                e = e || window.event;
                e.preventDefault();
                var t = e.touches;
                var diffX = t[0].clientX - me._thumbnail_menu_mobile.ggDragLastX;
                var diffY = t[0].clientY - me._thumbnail_menu_mobile.ggDragLastY;
                me._thumbnail_menu_mobile.ggDragLastX = t[0].clientX;
                me._thumbnail_menu_mobile.ggDragLastY = t[0].clientY;
                me._thumbnail_menu_mobile.ggScrollByX(-diffX);
                me._thumbnail_menu_mobile.ggScrollByY(-diffY);
            }
        }
        elVertScrollBg = me._thumbnail_menu_mobile__vertScrollBg = document.createElement('div');
        el.appendChild(elVertScrollBg);
        elVertScrollBg.setAttribute('style', 'position: absolute; right: 0px; top: 0px; visibility: hidden; width: 15px; height: 280px; background-color: rgba(0,0,0,0.392157); pointer-events: auto;');
        elVertScrollBg.className = 'ggskin ggskin_scrollarea_vscrollbg';
        elVertScrollFg = me._thumbnail_menu_mobile__vertScrollFg = document.createElement('div');
        elVertScrollBg.appendChild(elVertScrollFg);
        elVertScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 15px; height: 280px; background-color: rgba(0,0,0,1); pointer-events: auto;');
        elVertScrollFg.className = 'ggskin ggskin_scrollarea_vscrollfg';
        me._thumbnail_menu_mobile.ggScrollPosY = 0;
        me._thumbnail_menu_mobile.ggScrollPosYPercent = 0.0;
        elVertScrollFg.onmousedown = function (e) {
            e = e || window.event;
            e.preventDefault();
            e.stopPropagation();
            me._thumbnail_menu_mobile.ggDragLastY = e.clientY;
            document.onmouseup = function () {
                document.onmouseup = null;
                document.onmousemove = null;
            }
            document.onmousemove = function (e) {
                e = e || window.event;
                e.preventDefault();
                var diffY = e.clientY - me._thumbnail_menu_mobile.ggDragLastY;
                me._thumbnail_menu_mobile.ggDragLastY = e.clientY;
                me._thumbnail_menu_mobile.ggScrollByY(diffY);
            }
        }
        elVertScrollFg.ontouchstart = function (e) {
            e = e || window.event;
            e.preventDefault();
            e.stopPropagation();
            var t = e.touches;
            me._thumbnail_menu_mobile.ggDragLastY = t[0].clientY;
            document.ontouchend = function () {
                document.ontouchend = null;
                document.ontouchmove = null;
            }
            document.ontouchmove = function (e) {
                e = e || window.event;
                e.preventDefault();
                var t = e.touches;
                var diffY = t[0].clientY - me._thumbnail_menu_mobile.ggDragLastY;
                me._thumbnail_menu_mobile.ggDragLastY = t[0].clientY;
                me._thumbnail_menu_mobile.ggScrollByY(diffY);
            }
        }
        elVertScrollBg.onmousedown = function (e) {
            e = e || window.event;
            e.preventDefault();
            var diffY = me._thumbnail_menu_mobile.ggScrollHeight;
            if (e.offsetY < me._thumbnail_menu_mobile.ggScrollPosY) {
                diffY = diffY * -1;
            }
            me._thumbnail_menu_mobile.ggScrollByYSmooth(diffY);
        }
        elVertScrollBg.ontouchstart = function (e) {
            e = e || window.event;
            e.preventDefault();
            e.stopPropagation();
            var t = e.touches;
            var rect = me._thumbnail_menu_mobile__vertScrollBg.getBoundingClientRect();
            var diffY = me._thumbnail_menu_mobile.ggScrollHeight;
            if ((t[0].clientY - rect.top) < me._thumbnail_menu_mobile.ggScrollPosY) {
                diffY = diffY * -1;
            }
            me._thumbnail_menu_mobile.ggScrollByYSmooth(diffY);
        }
        el.addEventListener('wheel', function (e) {
            var wheelDelta = Math.sign(e.deltaY);
            me._thumbnail_menu_mobile.ggScrollByYSmooth(20 * wheelDelta);
        });
        elCornerBg = me._thumbnail_menu_mobile__cornerBg = document.createElement('div');
        el.appendChild(elCornerBg);
        elCornerBg.setAttribute('style', 'position: absolute; right: 0px; bottom: 0px; visibility: hidden; width: 15px; height: 15px; background-color: rgba(255,255,255,1);');
        elCornerBg.className = 'ggskin ggskin_scrollarea_scrollcorner';
        el.ggId = "thumbnail_menu_mobile";
        el.ggDx = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_scrollarea ";
        el.ggType = 'scrollarea';
        hs = '';
        hs += 'border : 1px solid rgba(0, 0, 0, 0);';
        hs += 'height : 80%;';
        hs += 'left : -10000px;';
        hs += 'opacity : 0;';
        hs += 'overflow : hidden;';
        hs += 'position : absolute;';
        hs += 'top : 10px;';
        hs += 'visibility : hidden;';
        hs += 'width : 90%;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._thumbnail_menu_mobile.ggIsActive = function () {
            return false;
        }
        el.ggElementNodeId = function () {
            return player.getCurrentNode();
        }
        me._thumbnail_menu_mobile.logicBlock_position = function () {
            var newLogicStatePosition;
            if (
                (player.getVariableValue('vis_userdata') == true)
            ) {
                newLogicStatePosition = 0;
            } else {
                newLogicStatePosition = -1;
            }
            if (me._thumbnail_menu_mobile.ggCurrentLogicStatePosition != newLogicStatePosition) {
                me._thumbnail_menu_mobile.ggCurrentLogicStatePosition = newLogicStatePosition;
                me._thumbnail_menu_mobile.style[domTransition] = 'left 0s, top 0s, opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._thumbnail_menu_mobile.ggCurrentLogicStatePosition == 0) {
                    this.ggDx = 0;
                    me._thumbnail_menu_mobile.style.top = '1000px';
                    me._thumbnail_menu_mobile.ggUpdatePosition(true);
                } else {
                    me._thumbnail_menu_mobile.ggDx = 0;
                    me._thumbnail_menu_mobile.style.top = '10px';
                    me._thumbnail_menu_mobile.ggUpdatePosition(true);
                }
            }
        }
        me._thumbnail_menu_mobile.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('opt_thumbnail') == true) &&
                (player.getIsTour() == true) &&
                (player.getViewerSize().width <= 450)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._thumbnail_menu_mobile.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._thumbnail_menu_mobile.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._thumbnail_menu_mobile.style[domTransition] = 'left 0s, top 0s, opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._thumbnail_menu_mobile.ggCurrentLogicStateVisible == 0) {
                    me._thumbnail_menu_mobile.style.visibility = (Number(me._thumbnail_menu_mobile.style.opacity) > 0 || !me._thumbnail_menu_mobile.style.opacity) ? 'inherit' : 'hidden';
                    me._thumbnail_menu_mobile.ggVisible = true;
                } else {
                    me._thumbnail_menu_mobile.style.visibility = "hidden";
                    me._thumbnail_menu_mobile.ggVisible = false;
                }
            }
        }
        me._thumbnail_menu_mobile.logicBlock_alpha = function () {
            var newLogicStateAlpha;
            if (
                (player.getVariableValue('vis_thumbnail_menu_mobile') == true) &&
                (player.getVariableValue('vis_thumbnail_menu_auto_hide') == true) &&
                (player.getVariableValue('vis_timer') == true) &&
                (player.getViewerSize().width <= 450)
            ) {
                newLogicStateAlpha = 0;
            } else {
                newLogicStateAlpha = -1;
            }
            if (me._thumbnail_menu_mobile.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
                me._thumbnail_menu_mobile.ggCurrentLogicStateAlpha = newLogicStateAlpha;
                me._thumbnail_menu_mobile.style[domTransition] = 'left 0s, top 0s, opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._thumbnail_menu_mobile.ggCurrentLogicStateAlpha == 0) {
                    me._thumbnail_menu_mobile.style.visibility = me._thumbnail_menu_mobile.ggVisible ? 'inherit' : 'hidden';
                    me._thumbnail_menu_mobile.style.opacity = 1;
                } else {
                    me._thumbnail_menu_mobile.style.visibility = "hidden";
                    me._thumbnail_menu_mobile.style.opacity = 0;
                }
            }
        }
        me._thumbnail_menu_mobile.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
            {
                this.ggContent.style.left = '0px';
                this.ggContent.style.top = '0px';
                this.ggContentLeftOffset = 0;
                this.ggContentTopOffset = 0;
                var domRectContent = this.ggContent.getBoundingClientRect();
                var minX = 0;
                var minY = 0;
                var maxX = 0;
                var maxY = 0;
                var stack = [];
                stack.push(this.ggContent);
                while (stack.length > 0) {
                    var e = stack.pop();
                    if (e.getBoundingClientRect) {
                        var domRectChild = e.getBoundingClientRect();
                        var diffX = domRectChild.left - domRectContent.left;
                        minX = Math.min(minX, diffX);
                        maxX = Math.max(maxX, diffX + domRectChild.width);
                        var diffY = domRectChild.top - domRectContent.top;
                        minY = Math.min(minY, diffY);
                        maxY = Math.max(maxY, diffY + domRectChild.height);
                    }
                    if (e.hasChildNodes()) {
                        for (var i = 0; i < e.childNodes.length; i++) {
                            stack.push(e.childNodes[i]);
                        }
                    }
                }
                if (minX < 0) this.ggContentLeftOffset = -minX;
                if (minY < 0) this.ggContentTopOffset = -minY;
                var contentWidth = maxX - minX;
                var contentHeight = maxY - minY;
                this.ggContent.style.left = this.ggContentLeftOffset + 'px';
                this.ggContent.style.top = this.ggContentTopOffset + 'px';
                var containerWidth = this.clientWidth;
                if (contentWidth < containerWidth) {
                    this.ggContent.style.left = '50%';
                    this.ggContent.style.marginLeft = (contentWidth / -2) + 'px';
                } else {
                    this.ggContent.style.left = this.ggContentLeftOffset + 'px';
                    this.ggContent.style.marginLeft = '0px';
                }
                this.ggContent.style.top = -(Math.round(me._thumbnail_menu_mobile.ggScrollPosY / me._thumbnail_menu_mobile.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
                this.ggContent.style.marginTop = '0px';
                if ((me._thumbnail_menu_mobile.ggHorScrollVisible && contentHeight > this.clientHeight - 15) || (!me._thumbnail_menu_mobile.ggHorScrollVisible && contentHeight > this.clientHeight)) {
                    me._thumbnail_menu_mobile__vertScrollBg.style.visibility = 'inherit';
                    me._thumbnail_menu_mobile__vertScrollFg.style.visibility = 'inherit';
                    me._thumbnail_menu_mobile.ggVertScrollVisible = true;
                } else {
                    me._thumbnail_menu_mobile__vertScrollBg.style.visibility = 'hidden';
                    me._thumbnail_menu_mobile__vertScrollFg.style.visibility = 'hidden';
                    me._thumbnail_menu_mobile.ggVertScrollVisible = false;
                }
                if (me._thumbnail_menu_mobile.ggVertScrollVisible) {
                    if (me._thumbnail_menu_mobile.ggHorScrollVisible) {
                        me._thumbnail_menu_mobile.ggAvailableHeight = me._thumbnail_menu_mobile.clientHeight - 15;
                        me._thumbnail_menu_mobile__cornerBg.style.visibility = 'inherit';
                    } else {
                        me._thumbnail_menu_mobile.ggAvailableHeight = me._thumbnail_menu_mobile.clientHeight;
                        me._thumbnail_menu_mobile__cornerBg.style.visibility = 'hidden';
                    }
                    me._thumbnail_menu_mobile__vertScrollBg.style.height = me._thumbnail_menu_mobile.ggAvailableHeight + 'px';
                    me._thumbnail_menu_mobile.ggVPercentVisible = me._thumbnail_menu_mobile.ggAvailableHeight / contentHeight;
                    if (me._thumbnail_menu_mobile.ggVPercentVisible > 1.0) me._thumbnail_menu_mobile.ggVPercentVisible = 1.0;
                    me._thumbnail_menu_mobile.ggScrollHeight = Math.round(me._thumbnail_menu_mobile__vertScrollBg.clientHeight * me._thumbnail_menu_mobile.ggVPercentVisible);
                    me._thumbnail_menu_mobile__vertScrollFg.style.height = me._thumbnail_menu_mobile.ggScrollHeight + 'px';
                    me._thumbnail_menu_mobile.ggScrollPosY = me._thumbnail_menu_mobile.ggScrollPosYPercent * me._thumbnail_menu_mobile.ggAvailableHeight;
                    me._thumbnail_menu_mobile.ggScrollPosY = Math.min(me._thumbnail_menu_mobile.ggScrollPosY, me._thumbnail_menu_mobile__vertScrollBg.clientHeight - me._thumbnail_menu_mobile__vertScrollFg.clientHeight);
                    me._thumbnail_menu_mobile__vertScrollFg.style.top = me._thumbnail_menu_mobile.ggScrollPosY + 'px';
                    me._thumbnail_menu_mobile__content.style.top = -(Math.round(me._thumbnail_menu_mobile.ggScrollPosY / me._thumbnail_menu_mobile.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
                } else {
                    me._thumbnail_menu_mobile.ggScrollPosY = 0;
                    me._thumbnail_menu_mobile.ggScrollPosYPercent = 0.0;
                    me._thumbnail_menu_mobile__content.style.top = this.ggContentTopOffset + 'px';
                    me._thumbnail_menu_mobile__cornerBg.style.visibility = 'hidden';
                }
            }
        }
        el = me._thumbnail_cloner_mobile = document.createElement('div');
        el.ggNumRepeat = 100;
        el.ggWidth = 96;
        el.ggHeight = 62;
        el.ggUpdating = false;
        el.ggFilter = [];
        el.ggInstances = [];
        me._thumbnail_cloner_mobile.callChildLogicBlocks_changenodeid = function () {
            if (me._thumbnail_cloner_mobile.ggInstances) {
                var i;
                for (i = 0; i < me._thumbnail_cloner_mobile.ggInstances.length; i++) {
                    if (me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile && me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile.logicBlock_visible) {
                        me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile.logicBlock_visible();
                    }
                    if (me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile && me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile.logicBlock_alpha) {
                        me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile.logicBlock_alpha();
                    }
                }
            }
        }
        me._thumbnail_cloner_mobile.callChildLogicBlocks_mouseover = function () {
            if (me._thumbnail_cloner_mobile.ggInstances) {
                var i;
                for (i = 0; i < me._thumbnail_cloner_mobile.ggInstances.length; i++) {
                    if (me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_active_mobile && me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_active_mobile.logicBlock_bordercolor) {
                        me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_active_mobile.logicBlock_bordercolor();
                    }
                }
            }
        }
        me._thumbnail_cloner_mobile.callChildLogicBlocks_mouseover = function () {
            if (me._thumbnail_cloner_mobile.ggInstances) {
                var i;
                for (i = 0; i < me._thumbnail_cloner_mobile.ggInstances.length; i++) {
                    if (me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile && me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile.logicBlock_alpha) {
                        me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile.logicBlock_alpha();
                    }
                }
            }
        }
        me._thumbnail_cloner_mobile.callChildLogicBlocks_active = function () {
            if (me._thumbnail_cloner_mobile.ggInstances) {
                var i;
                for (i = 0; i < me._thumbnail_cloner_mobile.ggInstances.length; i++) {
                    if (me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile && me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile.logicBlock_visible) {
                        me._thumbnail_cloner_mobile.ggInstances[i]._checkmark_tick_mobile.logicBlock_visible();
                    }
                    if (me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_active_mobile && me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_active_mobile.logicBlock_bordercolor) {
                        me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_active_mobile.logicBlock_bordercolor();
                    }
                }
            }
        }
        me._thumbnail_cloner_mobile.callChildLogicBlocks_varchanged_opt_thumbnail_tooltip = function () {
            if (me._thumbnail_cloner_mobile.ggInstances) {
                var i;
                for (i = 0; i < me._thumbnail_cloner_mobile.ggInstances.length; i++) {
                    if (me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile && me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile.logicBlock_alpha) {
                        me._thumbnail_cloner_mobile.ggInstances[i]._thumbnail_title_mobile.logicBlock_alpha();
                    }
                }
            }
        }
        el.ggUpdate = function (filter) {
            if (me._thumbnail_cloner_mobile.ggUpdating == true) return;
            me._thumbnail_cloner_mobile.ggUpdating = true;
            var el = me._thumbnail_cloner_mobile;
            el.ggInstances = [];
            if (typeof filter == 'object') {
                el.ggFilter = filter;
            } else {
                filter = el.ggFilter;
            }
            ;
            if (me.ggTag) filter.push(me.ggTag);
            el.ggCurrentFilter = filter;
            if (el.hasChildNodes() == true) {
                while (el.firstChild) {
                    el.removeChild(el.firstChild);
                }
            }
            var tourNodes = player.getNodeIds();
            var row = 0;
            var column = 0;
            var parentWidth = me._thumbnail_cloner_mobile.parentNode.clientWidth;
            if (parentWidth == 0) parentWidth = me._thumbnail_cloner_mobile.parentNode.parentNode.clientWidth;
            var numCols = Math.floor((parentWidth * me._thumbnail_cloner_mobile.ggNumRepeat / 100.0) / me._thumbnail_cloner_mobile.offsetWidth);
            if (numCols < 1) numCols = 1;
            for (var i = 0; i < tourNodes.length; i++) {
                var nodeId = tourNodes[i];
                var passed = true;
                if (filter.length > 0) {
                    var nodeData = player.getNodeUserdata(nodeId);
                    for (var j = 0; j < filter.length; j++) {
                        if (nodeData['tags'].indexOf(filter[j]) == -1) passed = false;
                    }
                }
                if (passed) {
                    var parameter = {};
                    parameter.top = (row * me._thumbnail_cloner_mobile.ggHeight) + 'px';
                    parameter.left = (column * me._thumbnail_cloner_mobile.ggWidth) + 'px';
                    var inst = new SkinCloner_thumbnail_cloner_mobile_Class(nodeId, me, el, parameter);
                    el.ggInstances.push(inst);
                    el.appendChild(inst.__div);
                    inst.__div.ggObj = inst;
                    skin.updateSize(inst.__div);
                    column++;
                    if (column >= numCols) {
                        column = 0;
                        row++;
                    }
                }
            }
            me._thumbnail_cloner_mobile.callChildLogicBlocks_changenodeid();
            me._thumbnail_cloner_mobile.callChildLogicBlocks_mouseover();
            me._thumbnail_cloner_mobile.callChildLogicBlocks_mouseover();
            me._thumbnail_cloner_mobile.callChildLogicBlocks_active();
            me._thumbnail_cloner_mobile.callChildLogicBlocks_varchanged_opt_thumbnail_tooltip();
            me._thumbnail_cloner_mobile.ggUpdating = false;
            player.triggerEvent('clonerchanged');
        }
        el.ggFilter = [];
        el.ggId = "thumbnail_cloner_mobile";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_cloner ";
        el.ggType = 'cloner';
        hs = '';
        hs += 'height : 62px;';
        hs += 'left : 1.98px;';
        hs += 'overflow : visible;';
        hs += 'position : absolute;';
        hs += 'top : 1.764px;';
        hs += 'visibility : inherit;';
        hs += 'width : 96px;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._thumbnail_cloner_mobile.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._thumbnail_cloner_mobile.onmouseover = function (e) {
            me.elementMouseOver['thumbnail_cloner_mobile'] = true;
        }
        me._thumbnail_cloner_mobile.onmouseout = function (e) {
            me.elementMouseOver['thumbnail_cloner_mobile'] = false;
        }
        me._thumbnail_cloner_mobile.ontouchend = function (e) {
            me.elementMouseOver['thumbnail_cloner_mobile'] = false;
        }
        me._thumbnail_cloner_mobile.ggUpdateConditionNodeChange = function () {
            var cnode = player.getCurrentNode();
            for (var i = 0; i < me._thumbnail_cloner_mobile.childNodes.length; i++) {
                var child = me._thumbnail_cloner_mobile.childNodes[i];
                if (child.ggObj && child.ggObj.ggNodeId == cnode) {
                    var childOffX = child.offsetLeft;
                    var childOffY = child.offsetTop;
                    var p = child.parentElement;
                    while (p != null && p !== this.divSkin) {
                        if (p.ggType && p.ggType == 'scrollarea') {
                            p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
                        }
                        childOffX += p.offsetLeft;
                        childOffY += p.offsetTop;
                        p = p.parentElement;
                    }
                }
            }
        }
        me._thumbnail_cloner_mobile.ggUpdatePosition = function (useTransition) {
            var w = player.getViewerSize().width;
            var h = player.getViewerSize().height
            if ((!me._thumbnail_cloner_mobile.ggLastSize) || (me._thumbnail_cloner_mobile.ggLastSize.w != w) || (me._thumbnail_cloner_mobile.ggLastSize.h != h)) {
                me._thumbnail_cloner_mobile.ggLastSize = {w: w, h: h};
                me._thumbnail_cloner_mobile.ggUpdate();
            }
        }
        me._thumbnail_cloner_mobile.ggNodeChange = function () {
            me._thumbnail_cloner_mobile.ggUpdateConditionNodeChange();
        }
        me._thumbnail_menu_mobile__content.appendChild(me._thumbnail_cloner_mobile);
        me.divSkin.appendChild(me._thumbnail_menu_mobile);
        el = me._web_page = document.createElement('div');
        els = me._web_page__text = document.createElement('div');
        el.className = 'ggskin ggskin_textdiv';
        el.ggTextDiv = els;
        el.ggId = "web_page";
        el.ggDx = 0;
        el.ggDy = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_text ";
        el.ggType = 'text';
        hs = '';
        hs += 'height : 90%;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -10000px;';
        hs += 'visibility : hidden;';
        hs += 'width : 90%;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '0% 0%';
        hs = 'position:absolute;';
        hs += 'box-sizing: border-box;';
        hs += 'cursor: default;';
        hs += 'left: 0px;';
        hs += 'top:  0px;';
        hs += 'width: 100%;';
        hs += 'height: 100%;';
        hs += 'border: 0px solid #000000;';
        hs += 'color: #000000;';
        hs += 'text-align: center;';
        hs += 'white-space: nowrap;';
        hs += 'padding: 0px 1px 0px 1px;';
        hs += 'overflow: hidden;';
        els.setAttribute('style', hs);
        els.innerHTML = "";
        el.appendChild(els);
        me._web_page.ggIsActive = function () {
            return false;
        }
        el.ggElementNodeId = function () {
            return player.getCurrentNode();
        }
        me._web_page.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('vis_website') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._web_page.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._web_page.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._web_page.style[domTransition] = '';
                if (me._web_page.ggCurrentLogicStateVisible == 0) {
                    me._web_page.style.visibility = (Number(me._web_page.style.opacity) > 0 || !me._web_page.style.opacity) ? 'inherit' : 'hidden';
                    me._web_page.ggVisible = true;
                } else {
                    me._web_page.style.visibility = "hidden";
                    me._web_page.ggVisible = false;
                }
            }
        }
        me._web_page.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = ((this.ggDx * pw) / 100.0 + pw / 2 - w / 2) + 'px';
                var ph = this.parentNode.clientHeight;
                var h = this.offsetHeight;
                this.style.top = ((this.ggDy * ph) / 100.0 + ph / 2 - h / 2) + 'px';
            }
        }
        me.divSkin.appendChild(me._web_page);
        el = me._userdata = document.createElement('div');
        el.ggId = "userdata";
        el.ggDx = 0;
        el.ggDy = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_container ";
        el.ggType = 'container';
        hs = '';
        hs += 'height : 140px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -10000px;';
        hs += 'visibility : hidden;';
        hs += 'width : 240px;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._userdata.ggIsActive = function () {
            return false;
        }
        el.ggElementNodeId = function () {
            return player.getCurrentNode();
        }
        me._userdata.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('vis_userdata') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._userdata.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._userdata.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._userdata.style[domTransition] = '';
                if (me._userdata.ggCurrentLogicStateVisible == 0) {
                    me._userdata.style.visibility = (Number(me._userdata.style.opacity) > 0 || !me._userdata.style.opacity) ? 'inherit' : 'hidden';
                    me._userdata.ggVisible = true;
                } else {
                    me._userdata.style.visibility = "hidden";
                    me._userdata.ggVisible = false;
                }
            }
        }
        me._userdata.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
                var ph = this.parentNode.clientHeight;
                var h = this.offsetHeight;
                this.style.top = (this.ggDy + ph / 2 - h / 2) + 'px';
            }
        }
        el = me._userdatabg = document.createElement('div');
        el.ggId = "userdatabg";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_rectangle ";
        el.ggType = 'rectangle';
        hs = '';
        hs += 'background : rgba(0,0,0,0.784314);';
        hs += 'border : 0px solid #000000;';
        hs += 'cursor : default;';
        hs += 'height : 140px;';
        hs += 'left : 0px;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : inherit;';
        hs += 'width : 240px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._userdatabg.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._userdatabg.ggUpdatePosition = function (useTransition) {
        }
        me._userdata.appendChild(me._userdatabg);
        el = me._userdata_title = document.createElement('div');
        els = me._userdata_title__text = document.createElement('div');
        el.className = 'ggskin ggskin_textdiv';
        el.ggTextDiv = els;
        el.ggId = "userdata_title";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_text ";
        el.ggType = 'text';
        hs = '';
        hs += 'height : 20px;';
        hs += 'left : 10px;';
        hs += 'position : absolute;';
        hs += 'top : 10px;';
        hs += 'visibility : inherit;';
        hs += 'width : 220px;';
        hs += 'pointer-events:auto;';
        hs += 'font-weight: bold;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        hs = 'position:absolute;';
        hs += 'box-sizing: border-box;';
        hs += 'cursor: default;';
        hs += 'left: 0px;';
        hs += 'top:  0px;';
        hs += 'width: 220px;';
        hs += 'height: 20px;';
        hs += 'border: 0px solid #000000;';
        hs += 'color: rgba(255,255,255,1);';
        hs += 'text-align: left;';
        hs += 'white-space: nowrap;';
        hs += 'padding: 0px 1px 0px 1px;';
        hs += 'overflow: hidden;';
        els.setAttribute('style', hs);
        me._userdata_title.ggUpdateText = function () {
            var hs = me.ggUserdata.title;
            if (hs != this.ggText) {
                this.ggText = hs;
                this.ggTextDiv.innerHTML = hs;
                if (this.ggUpdatePosition) this.ggUpdatePosition();
            }
        }
        me._userdata_title.ggUpdateText();
        el.appendChild(els);
        me._userdata_title.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._userdata_title.ggUpdatePosition = function (useTransition) {
        }
        me._userdata.appendChild(me._userdata_title);
        el = me._userdata_description = document.createElement('div');
        els = me._userdata_description__text = document.createElement('div');
        el.className = 'ggskin ggskin_textdiv';
        el.ggTextDiv = els;
        el.ggId = "userdata_description";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_text ";
        el.ggType = 'text';
        hs = '';
        hs += 'height : 20px;';
        hs += 'left : 10px;';
        hs += 'position : absolute;';
        hs += 'top : 30px;';
        hs += 'visibility : inherit;';
        hs += 'width : 220px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        hs = 'position:absolute;';
        hs += 'box-sizing: border-box;';
        hs += 'cursor: default;';
        hs += 'left: 0px;';
        hs += 'top:  0px;';
        hs += 'width: 220px;';
        hs += 'height: 20px;';
        hs += 'border: 0px solid #000000;';
        hs += 'color: rgba(255,255,255,1);';
        hs += 'text-align: left;';
        hs += 'white-space: nowrap;';
        hs += 'padding: 0px 1px 0px 1px;';
        hs += 'overflow: hidden;';
        els.setAttribute('style', hs);
        me._userdata_description.ggUpdateText = function () {
            var hs = me.ggUserdata.description;
            if (hs != this.ggText) {
                this.ggText = hs;
                this.ggTextDiv.innerHTML = hs;
                if (this.ggUpdatePosition) this.ggUpdatePosition();
            }
        }
        me._userdata_description.ggUpdateText();
        el.appendChild(els);
        me._userdata_description.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._userdata_description.ggUpdatePosition = function (useTransition) {
        }
        me._userdata.appendChild(me._userdata_description);
        el = me._userdata_author = document.createElement('div');
        els = me._userdata_author__text = document.createElement('div');
        el.className = 'ggskin ggskin_textdiv';
        el.ggTextDiv = els;
        el.ggId = "userdata_author";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_text ";
        el.ggType = 'text';
        hs = '';
        hs += 'height : 20px;';
        hs += 'left : 10px;';
        hs += 'position : absolute;';
        hs += 'top : 50px;';
        hs += 'visibility : inherit;';
        hs += 'width : 220px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        hs = 'position:absolute;';
        hs += 'box-sizing: border-box;';
        hs += 'cursor: default;';
        hs += 'left: 0px;';
        hs += 'top:  0px;';
        hs += 'width: 220px;';
        hs += 'height: 20px;';
        hs += 'border: 0px solid #000000;';
        hs += 'color: rgba(255,255,255,1);';
        hs += 'text-align: left;';
        hs += 'white-space: nowrap;';
        hs += 'padding: 0px 1px 0px 1px;';
        hs += 'overflow: hidden;';
        els.setAttribute('style', hs);
        me._userdata_author.ggUpdateText = function () {
            var hs = me.ggUserdata.author;
            if (hs != this.ggText) {
                this.ggText = hs;
                this.ggTextDiv.innerHTML = hs;
                if (this.ggUpdatePosition) this.ggUpdatePosition();
            }
        }
        me._userdata_author.ggUpdateText();
        el.appendChild(els);
        me._userdata_author.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._userdata_author.ggUpdatePosition = function (useTransition) {
        }
        me._userdata.appendChild(me._userdata_author);
        el = me._userdata_datetime = document.createElement('div');
        els = me._userdata_datetime__text = document.createElement('div');
        el.className = 'ggskin ggskin_textdiv';
        el.ggTextDiv = els;
        el.ggId = "userdata_datetime";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_text ";
        el.ggType = 'text';
        hs = '';
        hs += 'height : 23px;';
        hs += 'left : 10px;';
        hs += 'position : absolute;';
        hs += 'top : 70px;';
        hs += 'visibility : inherit;';
        hs += 'width : 220px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        hs = 'position:absolute;';
        hs += 'box-sizing: border-box;';
        hs += 'cursor: default;';
        hs += 'left: 0px;';
        hs += 'top:  0px;';
        hs += 'width: 220px;';
        hs += 'height: 23px;';
        hs += 'border: 0px solid #000000;';
        hs += 'color: rgba(255,255,255,1);';
        hs += 'text-align: left;';
        hs += 'white-space: nowrap;';
        hs += 'padding: 0px 1px 0px 1px;';
        hs += 'overflow: hidden;';
        els.setAttribute('style', hs);
        me._userdata_datetime.ggUpdateText = function () {
            var hs = me.ggUserdata.datetime;
            if (hs != this.ggText) {
                this.ggText = hs;
                this.ggTextDiv.innerHTML = hs;
                if (this.ggUpdatePosition) this.ggUpdatePosition();
            }
        }
        me._userdata_datetime.ggUpdateText();
        el.appendChild(els);
        me._userdata_datetime.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._userdata_datetime.ggUpdatePosition = function (useTransition) {
        }
        me._userdata.appendChild(me._userdata_datetime);
        el = me._userdata_copyright = document.createElement('div');
        els = me._userdata_copyright__text = document.createElement('div');
        el.className = 'ggskin ggskin_textdiv';
        el.ggTextDiv = els;
        el.ggId = "userdata_copyright";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_text ";
        el.ggType = 'text';
        hs = '';
        hs += 'height : 23px;';
        hs += 'left : 10px;';
        hs += 'position : absolute;';
        hs += 'top : 110px;';
        hs += 'visibility : inherit;';
        hs += 'width : 220px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        hs = 'position:absolute;';
        hs += 'box-sizing: border-box;';
        hs += 'cursor: default;';
        hs += 'left: 0px;';
        hs += 'top:  0px;';
        hs += 'width: 220px;';
        hs += 'height: 23px;';
        hs += 'border: 0px solid #000000;';
        hs += 'color: rgba(255,255,255,1);';
        hs += 'text-align: left;';
        hs += 'white-space: nowrap;';
        hs += 'padding: 0px 1px 0px 1px;';
        hs += 'overflow: hidden;';
        els.setAttribute('style', hs);
        me._userdata_copyright.ggUpdateText = function () {
            var hs = "&#169; " + me.ggUserdata.copyright;
            if (hs != this.ggText) {
                this.ggText = hs;
                this.ggTextDiv.innerHTML = hs;
                if (this.ggUpdatePosition) this.ggUpdatePosition();
            }
        }
        me._userdata_copyright.ggUpdateText();
        el.appendChild(els);
        me._userdata_copyright.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._userdata_copyright.ggUpdatePosition = function (useTransition) {
        }
        me._userdata.appendChild(me._userdata_copyright);
        el = me._userdata_close = document.createElement('div');
        els = me._userdata_close__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTEzNS4zLDM1Ny4zYy0yMS45LTIxLjktNTcuNS0yMS45LTc5LjQsMGMtMjEuOSwyMS45LTIxLjksNTcuNSwwLDc5LjRjMjEuOSwyMS45LDU3LjUsMjEuOSw3OS40LDANCgkJUy0xMTMuNCwzNzkuMi0xMzUuMywzNTcuM3ogTS0xNDUuOCw0MTIuN2MwLjgsMC44LDAuOCwxLjUtMC4xLDIuNGwtMTAuOSwxMC45Yy0wLjQsMC40LTAuOCwwLjUtMS4zLDAuNWMtMC41LDAtMC45LTAuMS0xLjEtMC40DQoJCWwtMTUuOC0xNS44bC0xNS43LDE1LjdjLTAuNCwwLjQtMC44LDAuNS0xLjMsMC41cy0wLjktMC4xLTEuMS0wLjRsLTEx' +
            'LjEtMTEuMWMtMC4zLTAuMy0wLjQtMC42LTAuNC0xLjFjMC0wLjUsMC4xLTAuOSwwLjUtMS4zDQoJCWwxNS43LTE1LjdsLTE1LjgtMTUuOGMtMC4zLTAuMy0wLjQtMC42LTAuNC0xLjFjMC0wLjUsMC4xLTAuOSwwLjUtMS4zbDEwLjktMTAuOWMwLjktMC45LDEuNy0wLjksMi40LTAuMWwxNS44LDE1LjhsMTUuNy0xNS43DQoJCWMwLjktMC45LDEuNy0wLjksMi40LTAuMWwxMS4xLDExLjFjMC44LDAuOCwwLjgsMS41LTAuMSwyLjRsLTE1LjcsMTUuN0wtMTQ1LjgsNDEyLjd6Ii8+DQo8L2c+DQo8ZyBpZD0iTGF5ZXJfMiI+DQoJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xNjEuNiwzOTYuOWwxNS' +
            '44LDE1LjhjMC44LDAuOCwwLjgsMS41LTAuMSwyLjRsLTEwLjksMTAuOWMtMC40LDAuNC0wLjgsMC41LTEuMywwLjUNCgkJYy0wLjUsMC0wLjktMC4xLTEuMS0wLjRsLTE1LjgtMTUuOGwtMTUuNywxNS43Yy0wLjQsMC40LTAuOCwwLjUtMS4zLDAuNXMtMC45LTAuMS0xLjEtMC40bC0xMS4xLTExLjFjLTAuMy0wLjMtMC40LTAuNi0wLjQtMS4xDQoJCWMwLTAuNSwwLjEtMC45LDAuNS0xLjNsMTUuNy0xNS43bC0xNS44LTE1LjhjLTAuMy0wLjMtMC40LTAuNi0wLjQtMS4xYzAtMC41LDAuMS0wLjksMC41LTEuM2wxMC45LTEwLjljMC45LTAuOSwxLjctMC45LDIuNC0wLjENCgkJbDE1LjgsMTUuOGwx' +
            'NS43LTE1LjdjMC45LTAuOSwxLjctMC45LDIuNC0wLjFsMTEuMSwxMS4xYzAuOCwwLjgsMC44LDEuNS0wLjEsMi40TC0xNjEuNiwzOTYuOXoiLz4NCjwvZz4NCjwvc3ZnPg0K';
        me._userdata_close__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;userdata_close;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._userdata_close__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTEzMC45LDM1Mi45Yy0yNC40LTI0LjQtNjMuOC0yNC40LTg4LjIsMGMtMjQuNCwyNC40LTI0LjQsNjMuOCwwLDg4LjJjMjQuNCwyNC40LDYzLjgsMjQuNCw4OC4yLDANCgkJUy0xMDYuNSwzNzcuMy0xMzAuOSwzNTIuOXogTS0xNDIuNSw0MTQuNWMwLjgsMC44LDAuOCwxLjctMC4xLDIuN2wtMTIuMiwxMi4yYy0wLjQsMC40LTAuOCwwLjYtMS40LDAuNmMtMC42LDAtMS0wLjEtMS4zLTAuNA0KCQlsLTE3LjUtMTcuNWwtMTcuNCwxNy40Yy0wLjQsMC40LTAuOCwwLjYtMS40LDAuNmMtMC42LDAtMS0wLjEtMS4zLTAuNGwt' +
            'MTIuMy0xMi4zYy0wLjMtMC4zLTAuNC0wLjctMC40LTEuM2MwLTAuNiwwLjEtMSwwLjYtMS40DQoJCWwxNy40LTE3LjRsLTE3LjUtMTcuNWMtMC4zLTAuMy0wLjQtMC43LTAuNC0xLjNjMC0wLjYsMC4xLTEsMC42LTEuNGwxMi4yLTEyLjJjMS0xLDEuOC0xLDIuNy0wLjFsMTcuNSwxNy41bDE3LjQtMTcuNA0KCQljMS0xLDEuOC0xLDIuNy0wLjFsMTIuMywxMi4zYzAuOCwwLjgsMC44LDEuNy0wLjEsMi43bC0xNy40LDE3LjRMLTE0Mi41LDQxNC41eiIvPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTYwLjEsMzk2LjlsMTcuNSwxNy41YzAuOCwwLj' +
            'gsMC44LDEuNy0wLjEsMi43bC0xMi4yLDEyLjJjLTAuNCwwLjQtMC44LDAuNi0xLjQsMC42DQoJCWMtMC42LDAtMS0wLjEtMS4zLTAuNGwtMTcuNS0xNy41bC0xNy40LDE3LjRjLTAuNCwwLjQtMC44LDAuNi0xLjQsMC42Yy0wLjYsMC0xLTAuMS0xLjMtMC40bC0xMi4zLTEyLjNjLTAuMy0wLjMtMC40LTAuNy0wLjQtMS4zDQoJCWMwLTAuNiwwLjEtMSwwLjYtMS40bDE3LjQtMTcuNGwtMTcuNS0xNy41Yy0wLjMtMC4zLTAuNC0wLjctMC40LTEuM2MwLTAuNiwwLjEtMSwwLjYtMS40bDEyLjItMTIuMmMxLTEsMS44LTEsMi43LTAuMWwxNy41LDE3LjUNCgkJbDE3LjQtMTcuNGMxLTEsMS44LTEsMi43' +
            'LTAuMWwxMi4zLDEyLjNjMC44LDAuOCwwLjgsMS43LTAuMSwyLjdMLTE2MC4xLDM5Ni45eiIvPg0KPC9nPg0KPC9zdmc+DQo=';
        me._userdata_close__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;userdata_close;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "userdata_close";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 32px;';
        hs += 'left : 204px;';
        hs += 'position : absolute;';
        hs += 'top : 4px;';
        hs += 'visibility : inherit;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._userdata_close.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._userdata_close.onclick = function (e) {
            player.setVariableValue('vis_userdata', false);
        }
        me._userdata_close.onmouseover = function (e) {
            me._userdata_close__img.style.visibility = 'hidden';
            me._userdata_close__imgo.style.visibility = 'inherit';
        }
        me._userdata_close.onmouseout = function (e) {
            me._userdata_close__img.style.visibility = 'inherit';
            me._userdata_close__imgo.style.visibility = 'hidden';
        }
        me._userdata_close.ggUpdatePosition = function (useTransition) {
        }
        me._userdata.appendChild(me._userdata_close);
        me.divSkin.appendChild(me._userdata);
        el = me._information = document.createElement('div');
        el.ggId = "information";
        el.ggDx = 0;
        el.ggDy = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_container ";
        el.ggType = 'container';
        hs = '';
        hs += 'height : 250px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -10000px;';
        hs += 'visibility : hidden;';
        hs += 'width : 300px;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._information.ggIsActive = function () {
            return false;
        }
        el.ggElementNodeId = function () {
            return player.getCurrentNode();
        }
        me._information.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('vis_info_popup') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._information.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._information.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._information.style[domTransition] = '';
                if (me._information.ggCurrentLogicStateVisible == 0) {
                    me._information.style.visibility = (Number(me._information.style.opacity) > 0 || !me._information.style.opacity) ? 'inherit' : 'hidden';
                    me._information.ggVisible = true;
                } else {
                    me._information.style.visibility = "hidden";
                    me._information.ggVisible = false;
                }
            }
        }
        me._information.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
                var ph = this.parentNode.clientHeight;
                var h = this.offsetHeight;
                this.style.top = (this.ggDy + ph / 2 - h / 2) + 'px';
            }
        }
        el = me._informationbg = document.createElement('div');
        el.ggId = "informationbg";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_rectangle ";
        el.ggType = 'rectangle';
        hs = '';
        hs += 'background : rgba(0,0,0,0.784314);';
        hs += 'border : 0px solid #ffffff;';
        hs += 'cursor : default;';
        hs += 'height : 250px;';
        hs += 'left : 0px;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : inherit;';
        hs += 'width : 300px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._informationbg.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._informationbg.ggUpdatePosition = function (useTransition) {
        }
        me._information.appendChild(me._informationbg);
        el = me._info_text_body = document.createElement('div');
        els = me._info_text_body__text = document.createElement('div');
        el.className = 'ggskin ggskin_textdiv';
        el.ggTextDiv = els;
        el.ggId = "info_text_body";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_text ";
        el.ggType = 'text';
        hs = '';
        hs += 'height : 193px;';
        hs += 'left : 12px;';
        hs += 'position : absolute;';
        hs += 'top : 45px;';
        hs += 'visibility : inherit;';
        hs += 'width : 276px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        hs = 'position:absolute;';
        hs += 'box-sizing: border-box;';
        hs += 'cursor: default;';
        hs += 'left: 0px;';
        hs += 'top:  0px;';
        hs += 'width: 276px;';
        hs += 'height: 193px;';
        hs += 'border: 0px solid #000000;';
        hs += 'color: rgba(255,255,255,1);';
        hs += 'text-align: left;';
        hs += 'white-space: pre-wrap;';
        hs += 'padding: 0px 1px 0px 1px;';
        hs += 'overflow: hidden;';
        hs += 'overflow-y: auto;';
        els.setAttribute('style', hs);
        me._info_text_body.ggUpdateText = function () {
            var hs = player.hotspot.description;
            if (hs != this.ggText) {
                this.ggText = hs;
                this.ggTextDiv.innerHTML = hs;
                if (this.ggUpdatePosition) this.ggUpdatePosition();
            }
        }
        me._info_text_body.ggUpdateText();
        el.appendChild(els);
        me._info_text_body.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._info_text_body.ggUpdatePosition = function (useTransition) {
        }
        me._information.appendChild(me._info_text_body);
        el = me._info_title = document.createElement('div');
        els = me._info_title__text = document.createElement('div');
        el.className = 'ggskin ggskin_textdiv';
        el.ggTextDiv = els;
        el.ggId = "info_title";
        el.ggDx = -15;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_text ";
        el.ggType = 'text';
        hs = '';
        hs += 'height : 20px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : 15px;';
        hs += 'visibility : inherit;';
        hs += 'width : 245px;';
        hs += 'pointer-events:auto;';
        hs += 'font-weight: bold;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        hs = 'position:absolute;';
        hs += 'box-sizing: border-box;';
        hs += 'cursor: default;';
        hs += 'left: 0px;';
        hs += 'top:  0px;';
        hs += 'width: 245px;';
        hs += 'height: 20px;';
        hs += 'border: 0px solid #000000;';
        hs += 'color: rgba(255,255,255,1);';
        hs += 'text-align: left;';
        hs += 'white-space: nowrap;';
        hs += 'padding: 0px 1px 0px 1px;';
        hs += 'overflow: hidden;';
        els.setAttribute('style', hs);
        me._info_title.ggUpdateText = function () {
            var hs = player.hotspot.title;
            if (hs != this.ggText) {
                this.ggText = hs;
                this.ggTextDiv.innerHTML = hs;
                if (this.ggUpdatePosition) this.ggUpdatePosition();
            }
        }
        me._info_title.ggUpdateText();
        el.appendChild(els);
        me._info_title.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._info_title.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth + 0;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
        }
        me._information.appendChild(me._info_title);
        el = me._ht_info_close = document.createElement('div');
        els = me._ht_info_close__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTEzNS4zLDM1Ny4zYy0yMS45LTIxLjktNTcuNS0yMS45LTc5LjQsMGMtMjEuOSwyMS45LTIxLjksNTcuNSwwLDc5LjRjMjEuOSwyMS45LDU3LjUsMjEuOSw3OS40LDANCgkJUy0xMTMuNCwzNzkuMi0xMzUuMywzNTcuM3ogTS0xNDUuOCw0MTIuN2MwLjgsMC44LDAuOCwxLjUtMC4xLDIuNGwtMTAuOSwxMC45Yy0wLjQsMC40LTAuOCwwLjUtMS4zLDAuNWMtMC41LDAtMC45LTAuMS0xLjEtMC40DQoJCWwtMTUuOC0xNS44bC0xNS43LDE1LjdjLTAuNCwwLjQtMC44LDAuNS0xLjMsMC41cy0wLjktMC4xLTEuMS0wLjRsLTEx' +
            'LjEtMTEuMWMtMC4zLTAuMy0wLjQtMC42LTAuNC0xLjFjMC0wLjUsMC4xLTAuOSwwLjUtMS4zDQoJCWwxNS43LTE1LjdsLTE1LjgtMTUuOGMtMC4zLTAuMy0wLjQtMC42LTAuNC0xLjFjMC0wLjUsMC4xLTAuOSwwLjUtMS4zbDEwLjktMTAuOWMwLjktMC45LDEuNy0wLjksMi40LTAuMWwxNS44LDE1LjhsMTUuNy0xNS43DQoJCWMwLjktMC45LDEuNy0wLjksMi40LTAuMWwxMS4xLDExLjFjMC44LDAuOCwwLjgsMS41LTAuMSwyLjRsLTE1LjcsMTUuN0wtMTQ1LjgsNDEyLjd6Ii8+DQo8L2c+DQo8ZyBpZD0iTGF5ZXJfMiI+DQoJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xNjEuNiwzOTYuOWwxNS' +
            '44LDE1LjhjMC44LDAuOCwwLjgsMS41LTAuMSwyLjRsLTEwLjksMTAuOWMtMC40LDAuNC0wLjgsMC41LTEuMywwLjUNCgkJYy0wLjUsMC0wLjktMC4xLTEuMS0wLjRsLTE1LjgtMTUuOGwtMTUuNywxNS43Yy0wLjQsMC40LTAuOCwwLjUtMS4zLDAuNXMtMC45LTAuMS0xLjEtMC40bC0xMS4xLTExLjFjLTAuMy0wLjMtMC40LTAuNi0wLjQtMS4xDQoJCWMwLTAuNSwwLjEtMC45LDAuNS0xLjNsMTUuNy0xNS43bC0xNS44LTE1LjhjLTAuMy0wLjMtMC40LTAuNi0wLjQtMS4xYzAtMC41LDAuMS0wLjksMC41LTEuM2wxMC45LTEwLjljMC45LTAuOSwxLjctMC45LDIuNC0wLjENCgkJbDE1LjgsMTUuOGwx' +
            'NS43LTE1LjdjMC45LTAuOSwxLjctMC45LDIuNC0wLjFsMTEuMSwxMS4xYzAuOCwwLjgsMC44LDEuNS0wLjEsMi40TC0xNjEuNiwzOTYuOXoiLz4NCjwvZz4NCjwvc3ZnPg0K';
        me._ht_info_close__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;ht_info_close;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._ht_info_close__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTEzMC45LDM1Mi45Yy0yNC40LTI0LjQtNjMuOC0yNC40LTg4LjIsMGMtMjQuNCwyNC40LTI0LjQsNjMuOCwwLDg4LjJjMjQuNCwyNC40LDYzLjgsMjQuNCw4OC4yLDANCgkJUy0xMDYuNSwzNzcuMy0xMzAuOSwzNTIuOXogTS0xNDIuNSw0MTQuNWMwLjgsMC44LDAuOCwxLjctMC4xLDIuN2wtMTIuMiwxMi4yYy0wLjQsMC40LTAuOCwwLjYtMS40LDAuNmMtMC42LDAtMS0wLjEtMS4zLTAuNA0KCQlsLTE3LjUtMTcuNWwtMTcuNCwxNy40Yy0wLjQsMC40LTAuOCwwLjYtMS40LDAuNmMtMC42LDAtMS0wLjEtMS4zLTAuNGwt' +
            'MTIuMy0xMi4zYy0wLjMtMC4zLTAuNC0wLjctMC40LTEuM2MwLTAuNiwwLjEtMSwwLjYtMS40DQoJCWwxNy40LTE3LjRsLTE3LjUtMTcuNWMtMC4zLTAuMy0wLjQtMC43LTAuNC0xLjNjMC0wLjYsMC4xLTEsMC42LTEuNGwxMi4yLTEyLjJjMS0xLDEuOC0xLDIuNy0wLjFsMTcuNSwxNy41bDE3LjQtMTcuNA0KCQljMS0xLDEuOC0xLDIuNy0wLjFsMTIuMywxMi4zYzAuOCwwLjgsMC44LDEuNy0wLjEsMi43bC0xNy40LDE3LjRMLTE0Mi41LDQxNC41eiIvPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTYwLjEsMzk2LjlsMTcuNSwxNy41YzAuOCwwLj' +
            'gsMC44LDEuNy0wLjEsMi43bC0xMi4yLDEyLjJjLTAuNCwwLjQtMC44LDAuNi0xLjQsMC42DQoJCWMtMC42LDAtMS0wLjEtMS4zLTAuNGwtMTcuNS0xNy41bC0xNy40LDE3LjRjLTAuNCwwLjQtMC44LDAuNi0xLjQsMC42Yy0wLjYsMC0xLTAuMS0xLjMtMC40bC0xMi4zLTEyLjNjLTAuMy0wLjMtMC40LTAuNy0wLjQtMS4zDQoJCWMwLTAuNiwwLjEtMSwwLjYtMS40bDE3LjQtMTcuNGwtMTcuNS0xNy41Yy0wLjMtMC4zLTAuNC0wLjctMC40LTEuM2MwLTAuNiwwLjEtMSwwLjYtMS40bDEyLjItMTIuMmMxLTEsMS44LTEsMi43LTAuMWwxNy41LDE3LjUNCgkJbDE3LjQtMTcuNGMxLTEsMS44LTEsMi43' +
            'LTAuMWwxMi4zLDEyLjNjMC44LDAuOCwwLjgsMS43LTAuMSwyLjdMLTE2MC4xLDM5Ni45eiIvPg0KPC9nPg0KPC9zdmc+DQo=';
        me._ht_info_close__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;ht_info_close;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "ht_info_close";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 32px;';
        hs += 'left : 263px;';
        hs += 'position : absolute;';
        hs += 'top : 4px;';
        hs += 'visibility : inherit;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._ht_info_close.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._ht_info_close.onclick = function (e) {
            player.setVariableValue('vis_info_popup', false);
        }
        me._ht_info_close.onmouseover = function (e) {
            me._ht_info_close__img.style.visibility = 'hidden';
            me._ht_info_close__imgo.style.visibility = 'inherit';
        }
        me._ht_info_close.onmouseout = function (e) {
            me._ht_info_close__img.style.visibility = 'inherit';
            me._ht_info_close__imgo.style.visibility = 'hidden';
        }
        me._ht_info_close.ggUpdatePosition = function (useTransition) {
        }
        me._information.appendChild(me._ht_info_close);
        me.divSkin.appendChild(me._information);
        el = me._image_popup = document.createElement('div');
        el.ggId = "image_popup";
        el.ggDx = 0;
        el.ggDy = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_container ";
        el.ggType = 'container';
        hs = '';
        hs += 'height : 80%;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -10000px;';
        hs += 'visibility : hidden;';
        hs += 'width : 80%;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._image_popup.ggIsActive = function () {
            return false;
        }
        el.ggElementNodeId = function () {
            return player.getCurrentNode();
        }
        me._image_popup.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('vis_image_popup') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._image_popup.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._image_popup.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._image_popup.style[domTransition] = '';
                if (me._image_popup.ggCurrentLogicStateVisible == 0) {
                    me._image_popup.style.visibility = (Number(me._image_popup.style.opacity) > 0 || !me._image_popup.style.opacity) ? 'inherit' : 'hidden';
                    me._image_popup.ggVisible = true;
                } else {
                    me._image_popup.style.visibility = "hidden";
                    me._image_popup.ggVisible = false;
                }
            }
        }
        me._image_popup.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = ((this.ggDx * pw) / 100.0 + pw / 2 - w / 2) + 'px';
                var ph = this.parentNode.clientHeight;
                var h = this.offsetHeight;
                this.style.top = ((this.ggDy * ph) / 100.0 + ph / 2 - h / 2) + 'px';
            }
        }
        el = me._loading_image = document.createElement('div');
        els = me._loading_image__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSJ3aGl0ZSI+CiAgPGNpcmNsZSBjeD0iMTYiIGN5PSIzIiByPSIwIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMDszOzA7MCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0icm' +
            '90YXRlKDQ1IDE2IDE2KSIgY3g9IjE2IiBjeT0iMyIgcj0iMCI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7MzswOzAiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC4xMjVzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDkwIDE2IDE2KSIgY3g9IjE2IiBjeT0iMyIgcj0iMCI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7MzswOzAi' +
            'IGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC4yNXMiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiAvPgogIDwvY2lyY2xlPgogIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUoMTM1IDE2IDE2KSIgY3g9IjE2IiBjeT0iMyIgcj0iMCI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7MzswOzAiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC4zNzVzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMi' +
            'AwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDE4MCAxNiAxNikiIGN4PSIxNiIgY3k9IjMiIHI9IjAiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIwOzM7MDswIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAuNXMiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiAvPgogIDwvY2lyY2xlPgogIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUo' +
            'MjI1IDE2IDE2KSIgY3g9IjE2IiBjeT0iMyIgcj0iMCI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7MzswOzAiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC42MjVzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDI3MCAxNiAxNikiIGN4PSIxNiIgY3k9IjMiIHI9IjAiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIwOzM7MDswIiBkdX' +
            'I9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAuNzVzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDMxNSAxNiAxNikiIGN4PSIxNiIgY3k9IjMiIHI9IjAiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIwOzM7MDswIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAuODc1cyIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40' +
            'IDAuODswLjIgMC4yIDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIC8+CiAgPC9jaXJjbGU+CiAgPGNpcmNsZSB0cmFuc2Zvcm09InJvdGF0ZSgxODAgMTYgMTYpIiBjeD0iMTYiIGN5PSIzIiByPSIwIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMDszOzA7MCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwLjVzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KPC9zdmc+Cg==';
        me._loading_image__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;loading_image;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        el.ggId = "loading_image";
        el.ggDx = 0;
        el.ggDy = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'height : 40px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -10000px;';
        hs += 'visibility : inherit;';
        hs += 'width : 40px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._loading_image.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._loading_image.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
                var ph = this.parentNode.clientHeight;
                var h = this.offsetHeight;
                this.style.top = (this.ggDy + ph / 2 - h / 2) + 'px';
            }
        }
        me._image_popup.appendChild(me._loading_image);
        el = me._popup_image = document.createElement('div');
        me._popup_image__img = document.createElement('img');
        me._popup_image__img.className = 'ggskin ggskin_external';
        me._popup_image__img.onload = function () {
            me._popup_image.ggUpdatePosition();
        }
        me._popup_image.ggText = basePath + '';
        me._popup_image__img.setAttribute('src', me._popup_image.ggText);
        me._popup_image__img['ondragstart'] = function () {
            return false;
        };
        hs = '';
        me._popup_image.appendChild(me._popup_image__img);
        me._popup_image.ggSubElement = me._popup_image__img;
        el.ggId = "popup_image";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_external ";
        el.ggType = 'external';
        hs = '';
        hs += 'border : 0px solid #000000;';
        hs += 'cursor : default;';
        hs += 'height : 100%;';
        hs += 'left : 0%;';
        hs += 'position : absolute;';
        hs += 'top : 0%;';
        hs += 'visibility : hidden;';
        hs += 'width : 100%;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._popup_image.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._popup_image.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('vis_image_popup') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._popup_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._popup_image.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._popup_image.style[domTransition] = '';
                if (me._popup_image.ggCurrentLogicStateVisible == 0) {
                    me._popup_image.style.visibility = (Number(me._popup_image.style.opacity) > 0 || !me._popup_image.style.opacity) ? 'inherit' : 'hidden';
                    me._popup_image.ggVisible = true;
                } else {
                    me._popup_image.style.visibility = "hidden";
                    me._popup_image__img.src = '';
                    me._popup_image.ggVisible = false;
                }
            }
        }
        me._popup_image.ggUpdatePosition = function (useTransition) {
            var parentWidth = me._popup_image.clientWidth;
            var parentHeight = me._popup_image.clientHeight;
            var aspectRatioDiv = me._popup_image.clientWidth / me._popup_image.clientHeight;
            var aspectRatioImg = me._popup_image__img.naturalWidth / me._popup_image__img.naturalHeight;
            if (me._popup_image__img.naturalWidth < parentWidth) parentWidth = me._popup_image__img.naturalWidth;
            if (me._popup_image__img.naturalHeight < parentHeight) parentHeight = me._popup_image__img.naturalHeight;
            var currentWidth = me._popup_image__img.naturalWidth;
            var currentHeight = me._popup_image__img.naturalHeight;
            if (aspectRatioDiv > aspectRatioImg) {
                currentHeight = parentHeight;
                currentWidth = parentHeight * aspectRatioImg;
                me._popup_image__img.setAttribute('style', 'position: absolute; left: 50%; margin-left: -' + currentWidth / 2 + 'px; top: 50%; margin-top: -' + currentHeight / 2 + 'px;height:' + parentHeight + 'px;-webkit-user-drag:none;pointer-events:none;border-radius:0px;;');
            } else {
                currentWidth = parentWidth;
                currentHeight = parentWidth / aspectRatioImg;
                me._popup_image__img.setAttribute('style', 'position: absolute; left: 50%; margin-left: -' + currentWidth / 2 + 'px; top: 50%; margin-top: -' + currentHeight / 2 + 'px;width:' + parentWidth + 'px;-webkit-user-drag:none;pointer-events:none;border-radius:0px;;');
            }
            ;
        }
        me._image_popup.appendChild(me._popup_image);
        me.divSkin.appendChild(me._image_popup);
        el = me._video_popup_file = document.createElement('div');
        el.ggId = "video_popup_file";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_container ";
        el.ggType = 'container';
        hs = '';
        hs += 'height : 80%;';
        hs += 'left : 10%;';
        hs += 'position : absolute;';
        hs += 'top : 10%;';
        hs += 'visibility : hidden;';
        hs += 'width : 80%;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._video_popup_file.ggIsActive = function () {
            return false;
        }
        el.ggElementNodeId = function () {
            return player.getCurrentNode();
        }
        me._video_popup_file.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('vis_video_popup_file') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._video_popup_file.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._video_popup_file.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._video_popup_file.style[domTransition] = '';
                if (me._video_popup_file.ggCurrentLogicStateVisible == 0) {
                    me._video_popup_file.style.visibility = (Number(me._video_popup_file.style.opacity) > 0 || !me._video_popup_file.style.opacity) ? 'inherit' : 'hidden';
                    me._video_popup_file.ggVisible = true;
                } else {
                    me._video_popup_file.style.visibility = "hidden";
                    me._video_popup_file.ggVisible = false;
                }
            }
        }
        me._video_popup_file.ggUpdatePosition = function (useTransition) {
        }
        el = me._loading_video_file = document.createElement('div');
        els = me._loading_video_file__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSJ3aGl0ZSI+CiAgPGNpcmNsZSBjeD0iMTYiIGN5PSIzIiByPSIwIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMDszOzA7MCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0icm' +
            '90YXRlKDQ1IDE2IDE2KSIgY3g9IjE2IiBjeT0iMyIgcj0iMCI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7MzswOzAiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC4xMjVzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDkwIDE2IDE2KSIgY3g9IjE2IiBjeT0iMyIgcj0iMCI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7MzswOzAi' +
            'IGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC4yNXMiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiAvPgogIDwvY2lyY2xlPgogIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUoMTM1IDE2IDE2KSIgY3g9IjE2IiBjeT0iMyIgcj0iMCI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7MzswOzAiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC4zNzVzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMi' +
            'AwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDE4MCAxNiAxNikiIGN4PSIxNiIgY3k9IjMiIHI9IjAiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIwOzM7MDswIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAuNXMiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiAvPgogIDwvY2lyY2xlPgogIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUo' +
            'MjI1IDE2IDE2KSIgY3g9IjE2IiBjeT0iMyIgcj0iMCI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7MzswOzAiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC42MjVzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDI3MCAxNiAxNikiIGN4PSIxNiIgY3k9IjMiIHI9IjAiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIwOzM7MDswIiBkdX' +
            'I9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAuNzVzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDMxNSAxNiAxNikiIGN4PSIxNiIgY3k9IjMiIHI9IjAiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIwOzM7MDswIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAuODc1cyIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40' +
            'IDAuODswLjIgMC4yIDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIC8+CiAgPC9jaXJjbGU+CiAgPGNpcmNsZSB0cmFuc2Zvcm09InJvdGF0ZSgxODAgMTYgMTYpIiBjeD0iMTYiIGN5PSIzIiByPSIwIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMDszOzA7MCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwLjVzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KPC9zdmc+Cg==';
        me._loading_video_file__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;loading_video_file;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        el.ggId = "loading_video_file";
        el.ggDx = 0;
        el.ggDy = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'height : 40px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -10000px;';
        hs += 'visibility : inherit;';
        hs += 'width : 40px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._loading_video_file.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._loading_video_file.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
                var ph = this.parentNode.clientHeight;
                var h = this.offsetHeight;
                this.style.top = (this.ggDy + ph / 2 - h / 2) + 'px';
            }
        }
        me._video_popup_file.appendChild(me._loading_video_file);
        el = me._popup_video_file = document.createElement('div');
        me._popup_video_file.seekbars = [];
        me._popup_video_file.seekbars.push('seekbar_file');
        me._popup_video_file.ggInitMedia = function (media) {
            var notifySeekbars = function () {
                for (var i = 0; i < me._popup_video_file.seekbars.length; i++) {
                    var seekbar = me.findElements(me._popup_video_file.seekbars[i]);
                    if (seekbar.length > 0) seekbar[0].connectToMediaEl();
                }
            }
            while (me._popup_video_file.hasChildNodes()) {
                me._popup_video_file.removeChild(me._popup_video_file.lastChild);
            }
            if (me._popup_video_file__vid) {
                me._popup_video_file__vid.pause();
            }
            if (media == '') {
                notifySeekbars();
                me._popup_video_file.ggVideoNotLoaded = true;
                return;
            }
            me._popup_video_file.ggVideoNotLoaded = false;
            me._popup_video_file__vid = document.createElement('video');
            me._popup_video_file__vid.className = 'ggskin ggskin_video';
            me._popup_video_file__vid.setAttribute('width', '100%');
            me._popup_video_file__vid.setAttribute('height', '100%');
            me._popup_video_file__vid.setAttribute('autoplay', '');
            me._popup_video_file__source = document.createElement('source');
            me._popup_video_file__source.setAttribute('src', media);
            me._popup_video_file__vid.setAttribute('playsinline', 'playsinline');
            me._popup_video_file__vid.setAttribute('style', ';');
            me._popup_video_file__vid.appendChild(me._popup_video_file__source);
            me._popup_video_file.appendChild(me._popup_video_file__vid);
            var videoEl = player.registerVideoElement('popup_video_file', me._popup_video_file__vid);
            videoEl.autoplay = true;
            notifySeekbars();
            me._popup_video_file.ggVideoSource = media;
        }
        el.ggId = "popup_video_file";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_video ";
        el.ggType = 'video';
        hs = '';
        hs += 'height : 100%;';
        hs += 'left : 0%;';
        hs += 'position : absolute;';
        hs += 'top : 0%;';
        hs += 'visibility : hidden;';
        hs += 'width : 100%;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._popup_video_file.ggIsActive = function () {
            if (me._popup_video_file__vid != null) {
                return (me._popup_video_file__vid.paused == false && me._popup_video_file__vid.ended == false);
            } else {
                return false;
            }
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._popup_video_file.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('vis_video_popup_file') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._popup_video_file.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._popup_video_file.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._popup_video_file.style[domTransition] = '';
                if (me._popup_video_file.ggCurrentLogicStateVisible == 0) {
                    me._popup_video_file.style.visibility = (Number(me._popup_video_file.style.opacity) > 0 || !me._popup_video_file.style.opacity) ? 'inherit' : 'hidden';
                    if (me._popup_video_file.ggVideoNotLoaded) {
                        me._popup_video_file.ggInitMedia(me._popup_video_file.ggVideoSource);
                    }
                    me._popup_video_file.ggVisible = true;
                } else {
                    me._popup_video_file.style.visibility = "hidden";
                    me._popup_video_file.ggInitMedia('');
                    me._popup_video_file.ggVisible = false;
                }
            }
        }
        me._popup_video_file.ggUpdatePosition = function (useTransition) {
        }
        me._video_popup_file.appendChild(me._popup_video_file);
        me.divSkin.appendChild(me._video_popup_file);
        el = me._video_popup_controls_file = document.createElement('div');
        el.ggId = "video_popup_controls_file";
        el.ggDx = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_container ";
        el.ggType = 'container';
        hs = '';
        hs += 'bottom : 10px;';
        hs += 'height : 25px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'visibility : hidden;';
        hs += 'width : 284px;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._video_popup_controls_file.ggIsActive = function () {
            return false;
        }
        el.ggElementNodeId = function () {
            return player.getCurrentNode();
        }
        me._video_popup_controls_file.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('vis_video_popup_file') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._video_popup_controls_file.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._video_popup_controls_file.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._video_popup_controls_file.style[domTransition] = '';
                if (me._video_popup_controls_file.ggCurrentLogicStateVisible == 0) {
                    me._video_popup_controls_file.style.visibility = (Number(me._video_popup_controls_file.style.opacity) > 0 || !me._video_popup_controls_file.style.opacity) ? 'inherit' : 'hidden';
                    me._video_popup_controls_file.ggVisible = true;
                } else {
                    me._video_popup_controls_file.style.visibility = "hidden";
                    me._video_popup_controls_file.ggVisible = false;
                }
            }
        }
        me._video_popup_controls_file.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
        }
        el = me._seekbar_file = document.createElement('div');
        me._seekbar_file__playhead = document.createElement('div');
        me._seekbar_file.mediaEl = null;
        el.ggId = "seekbar_file";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_seekbar ";
        el.ggType = 'seekbar';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 11px;';
        hs += 'left : -2px;';
        hs += 'position : absolute;';
        hs += 'top : 4px;';
        hs += 'visibility : inherit;';
        hs += 'width : 246px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._seekbar_file.connectToMediaEl = function () {
            var disableSeekbar = function () {
                me._seekbar_file__playhead.style.visibility = 'hidden';
                me._seekbar_file.style.background = '#000000';
                me._seekbar_file.ggConnected = false;
            }
            if (me._seekbar_file.mediaEl != null) {
                me._seekbar_file.mediaEl.removeEventListener('progress', me._seekbar_file.updatePlayback);
                me._seekbar_file.mediaEl.removeEventListener('canplay', me._seekbar_file.updatePlayback);
                me._seekbar_file.mediaEl.removeEventListener('timeupdate', me._seekbar_file.updatePlayback);
                if (me._seekbar_file.ggActivate) {
                    me._seekbar_file.mediaEl.removeEventListener('play', me._seekbar_file.ggActivate);
                }
                if (me._seekbar_file.ggDeactivate) {
                    me._seekbar_file.mediaEl.removeEventListener('ended', me._seekbar_file.ggDeactivate);
                    me._seekbar_file.mediaEl.removeEventListener('pause', me._seekbar_file.ggDeactivate);
                }
                if (me._seekbar_file.ggMediaEnded) {
                    me._seekbar_file.mediaEl.removeEventListener('ended', me._seekbar_file.ggMediaEnded);
                }
            }
            me._seekbar_file.mediaEl = player.getMediaObject('popup_video_file');
            if (me._seekbar_file.mediaEl != null) {
                me._seekbar_file__playhead.style.visibility = 'inherit';
                me._seekbar_file__playhead.style.left = '2px';
                me._seekbar_file.mediaEl.addEventListener('progress', me._seekbar_file.updatePlayback);
                me._seekbar_file.mediaEl.addEventListener('canplay', me._seekbar_file.updatePlayback);
                me._seekbar_file.mediaEl.addEventListener('timeupdate', me._seekbar_file.updatePlayback);
                if (me._seekbar_file.ggActivate) {
                    me._seekbar_file.mediaEl.addEventListener('play', me._seekbar_file.ggActivate);
                }
                if (me._seekbar_file.ggDeactivate) {
                    me._seekbar_file.mediaEl.addEventListener('ended', me._seekbar_file.ggDeactivate);
                    me._seekbar_file.mediaEl.addEventListener('pause', me._seekbar_file.ggDeactivate);
                }
                if (me._seekbar_file.ggMediaEnded) {
                    me._seekbar_file.mediaEl.addEventListener('ended', me._seekbar_file.ggMediaEnded);
                }
                me._seekbar_file.ggConnected = true;
            } else {
                disableSeekbar();
            }
            var videoEl = me.findElements('popup_video_file');
            if (videoEl.length > 0 && !videoEl[0].hasChildNodes()) {
                disableSeekbar();
            }
        }
        me._seekbar_file.updatePlayback = function () {
            if (!me._seekbar_file.ggConnected) return;
            if (me._seekbar_file.mediaEl != null) {
                if (me._seekbar_file.mediaEl.readyState) {
                    var percent = me._seekbar_file.mediaEl.currentTime / me._seekbar_file.mediaEl.duration;
                    var playheadpos = Math.round((me._seekbar_file.clientWidth - 2 * 8 + 2) * percent);
                    playheadpos += 2;
                    me._seekbar_file__playhead.style.left = playheadpos.toString() + 'px';
                    var offsetPercent = Math.round(100.0 * (8 / me._seekbar_file.clientWidth));
                    var currPos = offsetPercent + Math.round(percent * (100 - 2 * offsetPercent));
                    var gradientString = 'linear-gradient(90deg, #808080 0%, #808080 ' + currPos + '%';
                    for (var i = 0; i < me._seekbar_file.mediaEl.buffered.length; i++) {
                        var rangeStart = Math.round((me._seekbar_file.mediaEl.buffered.start(i) / me._seekbar_file.mediaEl.duration) * 100.0);
                        var rangeEnd = Math.ceil((me._seekbar_file.mediaEl.buffered.end(i) / me._seekbar_file.mediaEl.duration) * 100.0);
                        if (rangeEnd > currPos) {
                            if (rangeStart < currPos) {
                                gradientString += ', #c0c0c0 ' + currPos + '%';
                            } else {
                                gradientString += ', #000000 ' + currPos + '%, #000000 ' + rangeStart + '%';
                                gradientString += ', #c0c0c0 ' + rangeStart + '%';
                            }
                            gradientString += ', #c0c0c0 ' + rangeEnd + '%';
                            currPos = rangeEnd;
                        }
                    }
                    if (currPos < 100) {
                        gradientString += ', #000000 ' + currPos + '%';
                    }
                    gradientString += ')';
                    me._seekbar_file.style.background = gradientString;
                }
            }
        }
        me._seekbar_file.appendChild(me._seekbar_file__playhead);
        hs += 'background: #000000;';
        hs += 'border: 2px solid #000000;';
        hs += 'border-radius: 8px;';
        hs += cssPrefix + 'border-radius: 8px;';
        var hs_playhead = 'height: 11px;';
        hs_playhead += 'width: 11px;';
        hs_playhead += 'border: 0px;';
        hs_playhead += 'position: absolute;';
        hs_playhead += 'left: 2px;';
        hs_playhead += 'top: 0px;';
        hs_playhead += 'border-radius: 6;';
        hs_playhead += cssPrefix + 'border-radius: 6px;';
        hs_playhead += 'background-color: rgba(255,255,255,1);';
        hs_playhead += 'pointer-events: none;';
        me._seekbar_file.setAttribute('style', hs);
        me._seekbar_file__playhead.setAttribute('style', hs_playhead);
        me._seekbar_file.ggIsActive = function () {
            if (me._seekbar_file.mediaEl != null) {
                return (me._seekbar_file.mediaEl.paused == false && me._seekbar_file.mediaEl.ended == false);
            } else {
                return false;
            }
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._seekbar_file.onmousedown = function (e) {
            if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend') {
                if (me._seekbar_file.mediaEl != null) {
                    var eventXPos;
                    if (e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
                    var seekpos = (eventXPos / me._seekbar_file.clientWidth) * me._seekbar_file.mediaEl.duration;
                    me._seekbar_file.mediaEl.currentTime = seekpos;
                }
            }
        }
        me._seekbar_file.onmousemove = function (e) {
            if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend') {
                if (me._seekbar_file.mediaEl != null) {
                    var eventXPos;
                    if (e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
                    var seekpos = (eventXPos / me._seekbar_file.clientWidth) * me._seekbar_file.mediaEl.duration;
                    me._seekbar_file.mediaEl.currentTime = seekpos;
                }
            }
        }
        me._seekbar_file.ontouchend = function (e) {
            if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend') {
                if (me._seekbar_file.mediaEl != null) {
                    var eventXPos;
                    if (e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
                    var seekpos = (eventXPos / me._seekbar_file.clientWidth) * me._seekbar_file.mediaEl.duration;
                    me._seekbar_file.mediaEl.currentTime = seekpos;
                }
            }
        }
        me._seekbar_file.ggActivate = function () {
            me._ht_video_pause_file.style[domTransition] = 'none';
            me._ht_video_pause_file.style.visibility = (Number(me._ht_video_pause_file.style.opacity) > 0 || !me._ht_video_pause_file.style.opacity) ? 'inherit' : 'hidden';
            me._ht_video_pause_file.ggVisible = true;
            me._ht_video_play_file.style[domTransition] = 'none';
            me._ht_video_play_file.style.visibility = 'hidden';
            me._ht_video_play_file.ggVisible = false;
        }
        me._seekbar_file.ggDeactivate = function () {
            me._ht_video_play_file.style[domTransition] = 'none';
            me._ht_video_play_file.style.visibility = (Number(me._ht_video_play_file.style.opacity) > 0 || !me._ht_video_play_file.style.opacity) ? 'inherit' : 'hidden';
            me._ht_video_play_file.ggVisible = true;
            me._ht_video_pause_file.style[domTransition] = 'none';
            me._ht_video_pause_file.style.visibility = 'hidden';
            me._ht_video_pause_file.ggVisible = false;
        }
        me._seekbar_file.ggUpdatePosition = function (useTransition) {
        }
        me._seekbar_file.ggNodeChange = function () {
            me._seekbar_file.connectToMediaEl();
        }
        me._video_popup_controls_file.appendChild(me._seekbar_file);
        el = me._ht_video_play_file = document.createElement('div');
        els = me._ht_video_play_file__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE3NSwzNDAuOWMtMzEsMC01Ni4xLDI1LjEtNTYuMSw1Ni4xYzAsMzEsMjUuMSw1Ni4xLDU2LjEsNTYuMXM1Ni4xLTI1LjEsNTYuMS01Ni4xDQoJCUMtMTE4LjksMzY2LTE0NCwzNDAuOS0xNzUsMzQwLjl6IE0tMTUwLjUsMzk4LjZsLTM4LjEsMjYuNmMtMS4zLDAuOS0yLjMsMC4zLTIuMy0xLjJWMzcwYzAtMS41LDEtMi4xLDIuMy0xLjJsMzguMiwyNi42DQoJCUMtMTQ5LjMsMzk2LjMtMTQ5LjMsMzk3LjctMTUwLjUsMzk4LjZ6Ii8+DQo8L2c+DQo8ZyBpZD0iTGF5ZXJfMiI+DQoJPHBhdGggZmlsbD0iI0ZGRkZGRiIg' +
            'ZD0iTS0xOTEsMzcwYzAtMS41LDEtMi4xLDIuMy0xLjJsMzguMiwyNi42YzEuMywwLjksMS4zLDIuMywwLDMuMmwtMzguMiwyNi42Yy0xLjMsMC45LTIuMywwLjMtMi4zLTEuMlYzNzB6Ig0KCQkvPg0KPC9nPg0KPC9zdmc+DQo=';
        me._ht_video_play_file__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;ht_video_play_file;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._ht_video_play_file__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE3NSwzMzQuNmMtMzQuNCwwLTYyLjQsMjcuOS02Mi40LDYyLjRjMCwzNC40LDI3LjksNjIuNCw2Mi40LDYyLjRzNjIuNC0yNy45LDYyLjQtNjIuNA0KCQlDLTExMi42LDM2Mi42LTE0MC42LDMzNC42LTE3NSwzMzQuNnogTS0xNDcuOCwzOTguOGwtNDIuNCwyOS42Yy0xLjQsMS0yLjYsMC40LTIuNi0xLjNWMzY3YzAtMS43LDEuMi0yLjMsMi42LTEuM2w0Mi40LDI5LjYNCgkJQy0xNDYuNCwzOTYuMi0xNDYuNCwzOTcuOC0xNDcuOCwzOTguOHoiLz4NCjwvZz4NCjxnIGlkPSJMYXllcl8yIj4NCgk8cGF0aCBmaWxsPSIj' +
            'RkZGRkZGIiBkPSJNLTE5Mi44LDM2N2MwLTEuNywxLjItMi4zLDIuNi0xLjNsNDIuNCwyOS42YzEuNCwxLDEuNCwyLjYsMCwzLjZsLTQyLjQsMjkuNmMtMS40LDEtMi42LDAuNC0yLjYtMS4zVjM2N3oiDQoJCS8+DQo8L2c+DQo8L3N2Zz4NCg==';
        me._ht_video_play_file__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;ht_video_play_file;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "ht_video_play_file";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 25px;';
        hs += 'left : 259px;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : hidden;';
        hs += 'width : 25px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._ht_video_play_file.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._ht_video_play_file.onclick = function (e) {
            player.playSound("popup_video_file", "1");
            me._ht_video_play_file.style[domTransition] = 'none';
            me._ht_video_play_file.style.visibility = 'hidden';
            me._ht_video_play_file.ggVisible = false;
            me._ht_video_pause_file.style[domTransition] = 'none';
            me._ht_video_pause_file.style.visibility = (Number(me._ht_video_pause_file.style.opacity) > 0 || !me._ht_video_pause_file.style.opacity) ? 'inherit' : 'hidden';
            me._ht_video_pause_file.ggVisible = true;
        }
        me._ht_video_play_file.onmouseover = function (e) {
            me._ht_video_play_file__img.style.visibility = 'hidden';
            me._ht_video_play_file__imgo.style.visibility = 'inherit';
        }
        me._ht_video_play_file.onmouseout = function (e) {
            me._ht_video_play_file__img.style.visibility = 'inherit';
            me._ht_video_play_file__imgo.style.visibility = 'hidden';
        }
        me._ht_video_play_file.ggUpdatePosition = function (useTransition) {
        }
        me._video_popup_controls_file.appendChild(me._ht_video_play_file);
        el = me._ht_video_pause_file = document.createElement('div');
        els = me._ht_video_pause_file__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE3NSwzNDAuOWMtMzEsMC01Ni4xLDI1LjEtNTYuMSw1Ni4xYzAsMzEsMjUuMSw1Ni4xLDU2LjEsNTYuMXM1Ni4xLTI1LjEsNTYuMS01Ni4xDQoJCUMtMTE4LjksMzY2LTE0NCwzNDAuOS0xNzUsMzQwLjl6IE0tMTc3LjcsNDE2LjNjMCwxLjMtMSwyLjMtMi4zLDIuM2gtMTQuM2MtMS4zLDAtMi4zLTEtMi4zLTIuM3YtMzguNmMwLTEuMywxLTIuMywyLjMtMi4zaDE0LjMNCgkJYzEuMywwLDIuMywxLDIuMywyLjNDLTE3Ny43LDM3Ny43LTE3Ny43LDQxNi4zLTE3Ny43LDQxNi4zeiBNLTE1My40LDQxNi4zYzAsMS4zLTEs' +
            'Mi4zLTIuMywyLjNILTE3MGMtMS4zLDAtMi4zLTEtMi4zLTIuM3YtMzguNg0KCQljMC0xLjMsMS0yLjMsMi4zLTIuM2gxNC4zYzEuMywwLDIuMywxLDIuMywyLjNDLTE1My40LDM3Ny43LTE1My40LDQxNi4zLTE1My40LDQxNi4zeiIvPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KCTxnPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTE4MCwzNzUuNGgtMTQuM2MtMS4zLDAtMi4zLDEtMi4zLDIuM3YzOC42YzAsMS4zLDEsMi4zLDIuMywyLjNoMTQuM2MxLjMsMCwyLjMtMSwyLjMtMi4zdi0zOC42DQoJCQlDLTE3Ny43LDM3Ni40LTE3OC43LDM3NS40LTE4MCwzNzUuNHoiLz4NCgkJPHBhdG' +
            'ggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xNTUuNywzNzUuNEgtMTcwYy0xLjMsMC0yLjMsMS0yLjMsMi4zdjM4LjZjMCwxLjMsMSwyLjMsMi4zLDIuM2gxNC4zYzEuMywwLDIuMy0xLDIuMy0yLjN2LTM4LjYNCgkJCUMtMTUzLjQsMzc2LjQtMTU0LjQsMzc1LjQtMTU1LjcsMzc1LjR6Ii8+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo=';
        me._ht_video_pause_file__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;ht_video_pause_file;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._ht_video_pause_file__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE3NSwzMzQuNmMtMzQuNCwwLTYyLjQsMjcuOS02Mi40LDYyLjRjMCwzNC40LDI3LjksNjIuNCw2Mi40LDYyLjRzNjIuNC0yNy45LDYyLjQtNjIuNA0KCQlDLTExMi42LDM2Mi42LTE0MC42LDMzNC42LTE3NSwzMzQuNnogTS0xNzgsNDE4LjRjMCwxLjQtMS4xLDIuNi0yLjYsMi42aC0xNS45Yy0xLjQsMC0yLjYtMS4xLTIuNi0yLjZ2LTQyLjkNCgkJYzAtMS40LDEuMS0yLjYsMi42LTIuNmgxNS45YzEuNCwwLDIuNiwxLjEsMi42LDIuNkMtMTc4LDM3NS41LTE3OCw0MTguNC0xNzgsNDE4LjR6IE0tMTUxLDQxOC40YzAs' +
            'MS40LTEuMSwyLjYtMi42LDIuNmgtMTUuOQ0KCQljLTEuNCwwLTIuNi0xLjEtMi42LTIuNnYtNDIuOWMwLTEuNCwxLjEtMi42LDIuNi0yLjZoMTUuOWMxLjQsMCwyLjYsMS4xLDIuNiwyLjZDLTE1MSwzNzUuNS0xNTEsNDE4LjQtMTUxLDQxOC40eiIvPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KCTxnPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTE4MC41LDM3M2gtMTUuOWMtMS40LDAtMi42LDEuMS0yLjYsMi42djQyLjljMCwxLjQsMS4xLDIuNiwyLjYsMi42aDE1LjljMS40LDAsMi42LTEuMSwyLjYtMi42di00Mi45DQoJCQlDLTE3OCwzNzQuMS0xNzkuMSwzNzMtMTgwLjUsMzczei' +
            'IvPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTE1My41LDM3M2gtMTUuOWMtMS40LDAtMi42LDEuMS0yLjYsMi42djQyLjljMCwxLjQsMS4xLDIuNiwyLjYsMi42aDE1LjljMS40LDAsMi42LTEuMSwyLjYtMi42di00Mi45DQoJCQlDLTE1MSwzNzQuMS0xNTIuMSwzNzMtMTUzLjUsMzczeiIvPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K';
        me._ht_video_pause_file__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;ht_video_pause_file;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "ht_video_pause_file";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 25px;';
        hs += 'left : 259px;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : inherit;';
        hs += 'width : 25px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._ht_video_pause_file.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._ht_video_pause_file.onclick = function (e) {
            player.pauseSound("popup_video_file");
            me._ht_video_pause_file.style[domTransition] = 'none';
            me._ht_video_pause_file.style.visibility = 'hidden';
            me._ht_video_pause_file.ggVisible = false;
            me._ht_video_play_file.style[domTransition] = 'none';
            me._ht_video_play_file.style.visibility = (Number(me._ht_video_play_file.style.opacity) > 0 || !me._ht_video_play_file.style.opacity) ? 'inherit' : 'hidden';
            me._ht_video_play_file.ggVisible = true;
        }
        me._ht_video_pause_file.onmouseover = function (e) {
            me._ht_video_pause_file__img.style.visibility = 'hidden';
            me._ht_video_pause_file__imgo.style.visibility = 'inherit';
        }
        me._ht_video_pause_file.onmouseout = function (e) {
            me._ht_video_pause_file__img.style.visibility = 'inherit';
            me._ht_video_pause_file__imgo.style.visibility = 'hidden';
        }
        me._ht_video_pause_file.ggUpdatePosition = function (useTransition) {
        }
        me._video_popup_controls_file.appendChild(me._ht_video_pause_file);
        me.divSkin.appendChild(me._video_popup_controls_file);
        el = me._video_popup_url = document.createElement('div');
        el.ggId = "video_popup_url";
        el.ggDx = 0;
        el.ggDy = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_container ";
        el.ggType = 'container';
        hs = '';
        hs += 'height : 80%;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -10000px;';
        hs += 'visibility : hidden;';
        hs += 'width : 80%;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._video_popup_url.ggIsActive = function () {
            return false;
        }
        el.ggElementNodeId = function () {
            return player.getCurrentNode();
        }
        me._video_popup_url.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('vis_video_popup_url') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._video_popup_url.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._video_popup_url.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._video_popup_url.style[domTransition] = '';
                if (me._video_popup_url.ggCurrentLogicStateVisible == 0) {
                    me._video_popup_url.style.visibility = (Number(me._video_popup_url.style.opacity) > 0 || !me._video_popup_url.style.opacity) ? 'inherit' : 'hidden';
                    me._video_popup_url.ggVisible = true;
                } else {
                    me._video_popup_url.style.visibility = "hidden";
                    me._video_popup_url.ggVisible = false;
                }
            }
        }
        me._video_popup_url.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = ((this.ggDx * pw) / 100.0 + pw / 2 - w / 2) + 'px';
                var ph = this.parentNode.clientHeight;
                var h = this.offsetHeight;
                this.style.top = ((this.ggDy * ph) / 100.0 + ph / 2 - h / 2) + 'px';
            }
        }
        el = me._loading_video_url = document.createElement('div');
        els = me._loading_video_url__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSJ3aGl0ZSI+CiAgPGNpcmNsZSBjeD0iMTYiIGN5PSIzIiByPSIwIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMDszOzA7MCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0icm' +
            '90YXRlKDQ1IDE2IDE2KSIgY3g9IjE2IiBjeT0iMyIgcj0iMCI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7MzswOzAiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC4xMjVzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDkwIDE2IDE2KSIgY3g9IjE2IiBjeT0iMyIgcj0iMCI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7MzswOzAi' +
            'IGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC4yNXMiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiAvPgogIDwvY2lyY2xlPgogIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUoMTM1IDE2IDE2KSIgY3g9IjE2IiBjeT0iMyIgcj0iMCI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7MzswOzAiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC4zNzVzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMi' +
            'AwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDE4MCAxNiAxNikiIGN4PSIxNiIgY3k9IjMiIHI9IjAiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIwOzM7MDswIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAuNXMiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiAvPgogIDwvY2lyY2xlPgogIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUo' +
            'MjI1IDE2IDE2KSIgY3g9IjE2IiBjeT0iMyIgcj0iMCI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7MzswOzAiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC42MjVzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDI3MCAxNiAxNikiIGN4PSIxNiIgY3k9IjMiIHI9IjAiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIwOzM7MDswIiBkdX' +
            'I9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAuNzVzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDMxNSAxNiAxNikiIGN4PSIxNiIgY3k9IjMiIHI9IjAiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIwOzM7MDswIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAuODc1cyIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40' +
            'IDAuODswLjIgMC4yIDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIC8+CiAgPC9jaXJjbGU+CiAgPGNpcmNsZSB0cmFuc2Zvcm09InJvdGF0ZSgxODAgMTYgMTYpIiBjeD0iMTYiIGN5PSIzIiByPSIwIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMDszOzA7MCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwLjVzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KPC9zdmc+Cg==';
        me._loading_video_url__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;loading_video_url;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        el.ggId = "loading_video_url";
        el.ggDx = 0;
        el.ggDy = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'height : 40px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -10000px;';
        hs += 'visibility : inherit;';
        hs += 'width : 40px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._loading_video_url.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._loading_video_url.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
                var ph = this.parentNode.clientHeight;
                var h = this.offsetHeight;
                this.style.top = (this.ggDy + ph / 2 - h / 2) + 'px';
            }
        }
        me._video_popup_url.appendChild(me._loading_video_url);
        el = me._popup_video_url = document.createElement('div');
        me._popup_video_url.seekbars = [];
        me._popup_video_url.seekbars.push('seekbar_url');
        me._popup_video_url.ggInitMedia = function (media) {
            var notifySeekbars = function () {
                for (var i = 0; i < me._popup_video_url.seekbars.length; i++) {
                    var seekbar = me.findElements(me._popup_video_url.seekbars[i]);
                    if (seekbar.length > 0) seekbar[0].connectToMediaEl();
                }
            }
            while (me._popup_video_url.hasChildNodes()) {
                me._popup_video_url.removeChild(me._popup_video_url.lastChild);
            }
            if (me._popup_video_url__vid) {
                me._popup_video_url__vid.pause();
            }
            if (media == '') {
                notifySeekbars();
                me._popup_video_url.ggVideoNotLoaded = true;
                return;
            }
            me._popup_video_url.ggVideoNotLoaded = false;
            me._popup_video_url__vid = document.createElement('video');
            me._popup_video_url__vid.className = 'ggskin ggskin_video';
            me._popup_video_url__vid.setAttribute('width', '100%');
            me._popup_video_url__vid.setAttribute('height', '100%');
            me._popup_video_url__vid.setAttribute('autoplay', '');
            me._popup_video_url__source = document.createElement('source');
            me._popup_video_url__source.setAttribute('src', media);
            me._popup_video_url__vid.setAttribute('playsinline', 'playsinline');
            me._popup_video_url__vid.setAttribute('style', ';');
            me._popup_video_url__vid.appendChild(me._popup_video_url__source);
            me._popup_video_url.appendChild(me._popup_video_url__vid);
            var videoEl = player.registerVideoElement('popup_video_url', me._popup_video_url__vid);
            videoEl.autoplay = true;
            notifySeekbars();
            me._popup_video_url.ggVideoSource = media;
        }
        el.ggId = "popup_video_url";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_video ";
        el.ggType = 'video';
        hs = '';
        hs += 'height : 100%;';
        hs += 'left : 0%;';
        hs += 'position : absolute;';
        hs += 'top : 0%;';
        hs += 'visibility : hidden;';
        hs += 'width : 100%;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._popup_video_url.ggIsActive = function () {
            if (me._popup_video_url__vid != null) {
                return (me._popup_video_url__vid.paused == false && me._popup_video_url__vid.ended == false);
            } else {
                return false;
            }
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._popup_video_url.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('vis_video_popup_url') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._popup_video_url.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._popup_video_url.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._popup_video_url.style[domTransition] = '';
                if (me._popup_video_url.ggCurrentLogicStateVisible == 0) {
                    me._popup_video_url.style.visibility = (Number(me._popup_video_url.style.opacity) > 0 || !me._popup_video_url.style.opacity) ? 'inherit' : 'hidden';
                    if (me._popup_video_url.ggVideoNotLoaded) {
                        me._popup_video_url.ggInitMedia(me._popup_video_url.ggVideoSource);
                    }
                    me._popup_video_url.ggVisible = true;
                } else {
                    me._popup_video_url.style.visibility = "hidden";
                    me._popup_video_url.ggInitMedia('');
                    me._popup_video_url.ggVisible = false;
                }
            }
        }
        me._popup_video_url.ggUpdatePosition = function (useTransition) {
        }
        me._video_popup_url.appendChild(me._popup_video_url);
        me.divSkin.appendChild(me._video_popup_url);
        el = me._video_popup_controls_url = document.createElement('div');
        el.ggId = "video_popup_controls_url";
        el.ggDx = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_container ";
        el.ggType = 'container';
        hs = '';
        hs += 'bottom : 10px;';
        hs += 'height : 25px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'visibility : hidden;';
        hs += 'width : 284px;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._video_popup_controls_url.ggIsActive = function () {
            return false;
        }
        el.ggElementNodeId = function () {
            return player.getCurrentNode();
        }
        me._video_popup_controls_url.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('vis_video_popup_url') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._video_popup_controls_url.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._video_popup_controls_url.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._video_popup_controls_url.style[domTransition] = '';
                if (me._video_popup_controls_url.ggCurrentLogicStateVisible == 0) {
                    me._video_popup_controls_url.style.visibility = (Number(me._video_popup_controls_url.style.opacity) > 0 || !me._video_popup_controls_url.style.opacity) ? 'inherit' : 'hidden';
                    me._video_popup_controls_url.ggVisible = true;
                } else {
                    me._video_popup_controls_url.style.visibility = "hidden";
                    me._video_popup_controls_url.ggVisible = false;
                }
            }
        }
        me._video_popup_controls_url.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
        }
        el = me._seekbar_url = document.createElement('div');
        me._seekbar_url__playhead = document.createElement('div');
        me._seekbar_url.mediaEl = null;
        el.ggId = "seekbar_url";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_seekbar ";
        el.ggType = 'seekbar';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 11px;';
        hs += 'left : -2px;';
        hs += 'position : absolute;';
        hs += 'top : 4px;';
        hs += 'visibility : inherit;';
        hs += 'width : 246px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._seekbar_url.connectToMediaEl = function () {
            var disableSeekbar = function () {
                me._seekbar_url__playhead.style.visibility = 'hidden';
                me._seekbar_url.style.background = '#000000';
                me._seekbar_url.ggConnected = false;
            }
            if (me._seekbar_url.mediaEl != null) {
                me._seekbar_url.mediaEl.removeEventListener('progress', me._seekbar_url.updatePlayback);
                me._seekbar_url.mediaEl.removeEventListener('canplay', me._seekbar_url.updatePlayback);
                me._seekbar_url.mediaEl.removeEventListener('timeupdate', me._seekbar_url.updatePlayback);
                if (me._seekbar_url.ggActivate) {
                    me._seekbar_url.mediaEl.removeEventListener('play', me._seekbar_url.ggActivate);
                }
                if (me._seekbar_url.ggDeactivate) {
                    me._seekbar_url.mediaEl.removeEventListener('ended', me._seekbar_url.ggDeactivate);
                    me._seekbar_url.mediaEl.removeEventListener('pause', me._seekbar_url.ggDeactivate);
                }
                if (me._seekbar_url.ggMediaEnded) {
                    me._seekbar_url.mediaEl.removeEventListener('ended', me._seekbar_url.ggMediaEnded);
                }
            }
            me._seekbar_url.mediaEl = player.getMediaObject('popup_video_url');
            if (me._seekbar_url.mediaEl != null) {
                me._seekbar_url__playhead.style.visibility = 'inherit';
                me._seekbar_url__playhead.style.left = '2px';
                me._seekbar_url.mediaEl.addEventListener('progress', me._seekbar_url.updatePlayback);
                me._seekbar_url.mediaEl.addEventListener('canplay', me._seekbar_url.updatePlayback);
                me._seekbar_url.mediaEl.addEventListener('timeupdate', me._seekbar_url.updatePlayback);
                if (me._seekbar_url.ggActivate) {
                    me._seekbar_url.mediaEl.addEventListener('play', me._seekbar_url.ggActivate);
                }
                if (me._seekbar_url.ggDeactivate) {
                    me._seekbar_url.mediaEl.addEventListener('ended', me._seekbar_url.ggDeactivate);
                    me._seekbar_url.mediaEl.addEventListener('pause', me._seekbar_url.ggDeactivate);
                }
                if (me._seekbar_url.ggMediaEnded) {
                    me._seekbar_url.mediaEl.addEventListener('ended', me._seekbar_url.ggMediaEnded);
                }
                me._seekbar_url.ggConnected = true;
            } else {
                disableSeekbar();
            }
            var videoEl = me.findElements('popup_video_url');
            if (videoEl.length > 0 && !videoEl[0].hasChildNodes()) {
                disableSeekbar();
            }
        }
        me._seekbar_url.updatePlayback = function () {
            if (!me._seekbar_url.ggConnected) return;
            if (me._seekbar_url.mediaEl != null) {
                if (me._seekbar_url.mediaEl.readyState) {
                    var percent = me._seekbar_url.mediaEl.currentTime / me._seekbar_url.mediaEl.duration;
                    var playheadpos = Math.round((me._seekbar_url.clientWidth - 2 * 8 + 2) * percent);
                    playheadpos += 2;
                    me._seekbar_url__playhead.style.left = playheadpos.toString() + 'px';
                    var offsetPercent = Math.round(100.0 * (8 / me._seekbar_url.clientWidth));
                    var currPos = offsetPercent + Math.round(percent * (100 - 2 * offsetPercent));
                    var gradientString = 'linear-gradient(90deg, #808080 0%, #808080 ' + currPos + '%';
                    for (var i = 0; i < me._seekbar_url.mediaEl.buffered.length; i++) {
                        var rangeStart = Math.round((me._seekbar_url.mediaEl.buffered.start(i) / me._seekbar_url.mediaEl.duration) * 100.0);
                        var rangeEnd = Math.ceil((me._seekbar_url.mediaEl.buffered.end(i) / me._seekbar_url.mediaEl.duration) * 100.0);
                        if (rangeEnd > currPos) {
                            if (rangeStart < currPos) {
                                gradientString += ', #c0c0c0 ' + currPos + '%';
                            } else {
                                gradientString += ', #000000 ' + currPos + '%, #000000 ' + rangeStart + '%';
                                gradientString += ', #c0c0c0 ' + rangeStart + '%';
                            }
                            gradientString += ', #c0c0c0 ' + rangeEnd + '%';
                            currPos = rangeEnd;
                        }
                    }
                    if (currPos < 100) {
                        gradientString += ', #000000 ' + currPos + '%';
                    }
                    gradientString += ')';
                    me._seekbar_url.style.background = gradientString;
                }
            }
        }
        me._seekbar_url.appendChild(me._seekbar_url__playhead);
        hs += 'background: #000000;';
        hs += 'border: 2px solid #000000;';
        hs += 'border-radius: 8px;';
        hs += cssPrefix + 'border-radius: 8px;';
        var hs_playhead = 'height: 11px;';
        hs_playhead += 'width: 11px;';
        hs_playhead += 'border: 0px;';
        hs_playhead += 'position: absolute;';
        hs_playhead += 'left: 2px;';
        hs_playhead += 'top: 0px;';
        hs_playhead += 'border-radius: 6;';
        hs_playhead += cssPrefix + 'border-radius: 6px;';
        hs_playhead += 'background-color: rgba(255,255,255,1);';
        hs_playhead += 'pointer-events: none;';
        me._seekbar_url.setAttribute('style', hs);
        me._seekbar_url__playhead.setAttribute('style', hs_playhead);
        me._seekbar_url.ggIsActive = function () {
            if (me._seekbar_url.mediaEl != null) {
                return (me._seekbar_url.mediaEl.paused == false && me._seekbar_url.mediaEl.ended == false);
            } else {
                return false;
            }
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._seekbar_url.onmousedown = function (e) {
            if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend') {
                if (me._seekbar_url.mediaEl != null) {
                    var eventXPos;
                    if (e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
                    var seekpos = (eventXPos / me._seekbar_url.clientWidth) * me._seekbar_url.mediaEl.duration;
                    me._seekbar_url.mediaEl.currentTime = seekpos;
                }
            }
        }
        me._seekbar_url.onmousemove = function (e) {
            if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend') {
                if (me._seekbar_url.mediaEl != null) {
                    var eventXPos;
                    if (e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
                    var seekpos = (eventXPos / me._seekbar_url.clientWidth) * me._seekbar_url.mediaEl.duration;
                    me._seekbar_url.mediaEl.currentTime = seekpos;
                }
            }
        }
        me._seekbar_url.ontouchend = function (e) {
            if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend') {
                if (me._seekbar_url.mediaEl != null) {
                    var eventXPos;
                    if (e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
                    var seekpos = (eventXPos / me._seekbar_url.clientWidth) * me._seekbar_url.mediaEl.duration;
                    me._seekbar_url.mediaEl.currentTime = seekpos;
                }
            }
        }
        me._seekbar_url.ggActivate = function () {
            me._ht_video_pause_url.style[domTransition] = 'none';
            me._ht_video_pause_url.style.visibility = (Number(me._ht_video_pause_url.style.opacity) > 0 || !me._ht_video_pause_url.style.opacity) ? 'inherit' : 'hidden';
            me._ht_video_pause_url.ggVisible = true;
            me._ht_video_play_url.style[domTransition] = 'none';
            me._ht_video_play_url.style.visibility = 'hidden';
            me._ht_video_play_url.ggVisible = false;
        }
        me._seekbar_url.ggDeactivate = function () {
            me._ht_video_play_url.style[domTransition] = 'none';
            me._ht_video_play_url.style.visibility = (Number(me._ht_video_play_url.style.opacity) > 0 || !me._ht_video_play_url.style.opacity) ? 'inherit' : 'hidden';
            me._ht_video_play_url.ggVisible = true;
            me._ht_video_pause_url.style[domTransition] = 'none';
            me._ht_video_pause_url.style.visibility = 'hidden';
            me._ht_video_pause_url.ggVisible = false;
        }
        me._seekbar_url.ggUpdatePosition = function (useTransition) {
        }
        me._seekbar_url.ggNodeChange = function () {
            me._seekbar_url.connectToMediaEl();
        }
        me._video_popup_controls_url.appendChild(me._seekbar_url);
        el = me._ht_video_play_url = document.createElement('div');
        els = me._ht_video_play_url__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE3NSwzNDAuOWMtMzEsMC01Ni4xLDI1LjEtNTYuMSw1Ni4xYzAsMzEsMjUuMSw1Ni4xLDU2LjEsNTYuMXM1Ni4xLTI1LjEsNTYuMS01Ni4xDQoJCUMtMTE4LjksMzY2LTE0NCwzNDAuOS0xNzUsMzQwLjl6IE0tMTUwLjUsMzk4LjZsLTM4LjEsMjYuNmMtMS4zLDAuOS0yLjMsMC4zLTIuMy0xLjJWMzcwYzAtMS41LDEtMi4xLDIuMy0xLjJsMzguMiwyNi42DQoJCUMtMTQ5LjMsMzk2LjMtMTQ5LjMsMzk3LjctMTUwLjUsMzk4LjZ6Ii8+DQo8L2c+DQo8ZyBpZD0iTGF5ZXJfMiI+DQoJPHBhdGggZmlsbD0iI0ZGRkZGRiIg' +
            'ZD0iTS0xOTEsMzcwYzAtMS41LDEtMi4xLDIuMy0xLjJsMzguMiwyNi42YzEuMywwLjksMS4zLDIuMywwLDMuMmwtMzguMiwyNi42Yy0xLjMsMC45LTIuMywwLjMtMi4zLTEuMlYzNzB6Ig0KCQkvPg0KPC9nPg0KPC9zdmc+DQo=';
        me._ht_video_play_url__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;ht_video_play_url;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._ht_video_play_url__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE3NSwzMzQuNmMtMzQuNCwwLTYyLjQsMjcuOS02Mi40LDYyLjRjMCwzNC40LDI3LjksNjIuNCw2Mi40LDYyLjRzNjIuNC0yNy45LDYyLjQtNjIuNA0KCQlDLTExMi42LDM2Mi42LTE0MC42LDMzNC42LTE3NSwzMzQuNnogTS0xNDcuOCwzOTguOGwtNDIuNCwyOS42Yy0xLjQsMS0yLjYsMC40LTIuNi0xLjNWMzY3YzAtMS43LDEuMi0yLjMsMi42LTEuM2w0Mi40LDI5LjYNCgkJQy0xNDYuNCwzOTYuMi0xNDYuNCwzOTcuOC0xNDcuOCwzOTguOHoiLz4NCjwvZz4NCjxnIGlkPSJMYXllcl8yIj4NCgk8cGF0aCBmaWxsPSIj' +
            'RkZGRkZGIiBkPSJNLTE5Mi44LDM2N2MwLTEuNywxLjItMi4zLDIuNi0xLjNsNDIuNCwyOS42YzEuNCwxLDEuNCwyLjYsMCwzLjZsLTQyLjQsMjkuNmMtMS40LDEtMi42LDAuNC0yLjYtMS4zVjM2N3oiDQoJCS8+DQo8L2c+DQo8L3N2Zz4NCg==';
        me._ht_video_play_url__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;ht_video_play_url;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "ht_video_play_url";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 25px;';
        hs += 'left : 259px;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : hidden;';
        hs += 'width : 25px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._ht_video_play_url.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._ht_video_play_url.onclick = function (e) {
            player.playSound("popup_video_url", "1");
            me._ht_video_play_url.style[domTransition] = 'none';
            me._ht_video_play_url.style.visibility = 'hidden';
            me._ht_video_play_url.ggVisible = false;
            me._ht_video_pause_url.style[domTransition] = 'none';
            me._ht_video_pause_url.style.visibility = (Number(me._ht_video_pause_url.style.opacity) > 0 || !me._ht_video_pause_url.style.opacity) ? 'inherit' : 'hidden';
            me._ht_video_pause_url.ggVisible = true;
        }
        me._ht_video_play_url.onmouseover = function (e) {
            me._ht_video_play_url__img.style.visibility = 'hidden';
            me._ht_video_play_url__imgo.style.visibility = 'inherit';
        }
        me._ht_video_play_url.onmouseout = function (e) {
            me._ht_video_play_url__img.style.visibility = 'inherit';
            me._ht_video_play_url__imgo.style.visibility = 'hidden';
        }
        me._ht_video_play_url.ggUpdatePosition = function (useTransition) {
        }
        me._video_popup_controls_url.appendChild(me._ht_video_play_url);
        el = me._ht_video_pause_url = document.createElement('div');
        els = me._ht_video_pause_url__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE3NSwzNDAuOWMtMzEsMC01Ni4xLDI1LjEtNTYuMSw1Ni4xYzAsMzEsMjUuMSw1Ni4xLDU2LjEsNTYuMXM1Ni4xLTI1LjEsNTYuMS01Ni4xDQoJCUMtMTE4LjksMzY2LTE0NCwzNDAuOS0xNzUsMzQwLjl6IE0tMTc3LjcsNDE2LjNjMCwxLjMtMSwyLjMtMi4zLDIuM2gtMTQuM2MtMS4zLDAtMi4zLTEtMi4zLTIuM3YtMzguNmMwLTEuMywxLTIuMywyLjMtMi4zaDE0LjMNCgkJYzEuMywwLDIuMywxLDIuMywyLjNDLTE3Ny43LDM3Ny43LTE3Ny43LDQxNi4zLTE3Ny43LDQxNi4zeiBNLTE1My40LDQxNi4zYzAsMS4zLTEs' +
            'Mi4zLTIuMywyLjNILTE3MGMtMS4zLDAtMi4zLTEtMi4zLTIuM3YtMzguNg0KCQljMC0xLjMsMS0yLjMsMi4zLTIuM2gxNC4zYzEuMywwLDIuMywxLDIuMywyLjNDLTE1My40LDM3Ny43LTE1My40LDQxNi4zLTE1My40LDQxNi4zeiIvPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KCTxnPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTE4MCwzNzUuNGgtMTQuM2MtMS4zLDAtMi4zLDEtMi4zLDIuM3YzOC42YzAsMS4zLDEsMi4zLDIuMywyLjNoMTQuM2MxLjMsMCwyLjMtMSwyLjMtMi4zdi0zOC42DQoJCQlDLTE3Ny43LDM3Ni40LTE3OC43LDM3NS40LTE4MCwzNzUuNHoiLz4NCgkJPHBhdG' +
            'ggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xNTUuNywzNzUuNEgtMTcwYy0xLjMsMC0yLjMsMS0yLjMsMi4zdjM4LjZjMCwxLjMsMSwyLjMsMi4zLDIuM2gxNC4zYzEuMywwLDIuMy0xLDIuMy0yLjN2LTM4LjYNCgkJCUMtMTUzLjQsMzc2LjQtMTU0LjQsMzc1LjQtMTU1LjcsMzc1LjR6Ii8+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo=';
        me._ht_video_pause_url__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;ht_video_pause_url;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._ht_video_pause_url__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE3NSwzMzQuNmMtMzQuNCwwLTYyLjQsMjcuOS02Mi40LDYyLjRjMCwzNC40LDI3LjksNjIuNCw2Mi40LDYyLjRzNjIuNC0yNy45LDYyLjQtNjIuNA0KCQlDLTExMi42LDM2Mi42LTE0MC42LDMzNC42LTE3NSwzMzQuNnogTS0xNzgsNDE4LjRjMCwxLjQtMS4xLDIuNi0yLjYsMi42aC0xNS45Yy0xLjQsMC0yLjYtMS4xLTIuNi0yLjZ2LTQyLjkNCgkJYzAtMS40LDEuMS0yLjYsMi42LTIuNmgxNS45YzEuNCwwLDIuNiwxLjEsMi42LDIuNkMtMTc4LDM3NS41LTE3OCw0MTguNC0xNzgsNDE4LjR6IE0tMTUxLDQxOC40YzAs' +
            'MS40LTEuMSwyLjYtMi42LDIuNmgtMTUuOQ0KCQljLTEuNCwwLTIuNi0xLjEtMi42LTIuNnYtNDIuOWMwLTEuNCwxLjEtMi42LDIuNi0yLjZoMTUuOWMxLjQsMCwyLjYsMS4xLDIuNiwyLjZDLTE1MSwzNzUuNS0xNTEsNDE4LjQtMTUxLDQxOC40eiIvPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KCTxnPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTE4MC41LDM3M2gtMTUuOWMtMS40LDAtMi42LDEuMS0yLjYsMi42djQyLjljMCwxLjQsMS4xLDIuNiwyLjYsMi42aDE1LjljMS40LDAsMi42LTEuMSwyLjYtMi42di00Mi45DQoJCQlDLTE3OCwzNzQuMS0xNzkuMSwzNzMtMTgwLjUsMzczei' +
            'IvPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTE1My41LDM3M2gtMTUuOWMtMS40LDAtMi42LDEuMS0yLjYsMi42djQyLjljMCwxLjQsMS4xLDIuNiwyLjYsMi42aDE1LjljMS40LDAsMi42LTEuMSwyLjYtMi42di00Mi45DQoJCQlDLTE1MSwzNzQuMS0xNTIuMSwzNzMtMTUzLjUsMzczeiIvPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K';
        me._ht_video_pause_url__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;ht_video_pause_url;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "ht_video_pause_url";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 25px;';
        hs += 'left : 259px;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : inherit;';
        hs += 'width : 25px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._ht_video_pause_url.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._ht_video_pause_url.onclick = function (e) {
            player.pauseSound("popup_video_url");
            me._ht_video_pause_url.style[domTransition] = 'none';
            me._ht_video_pause_url.style.visibility = 'hidden';
            me._ht_video_pause_url.ggVisible = false;
            me._ht_video_play_url.style[domTransition] = 'none';
            me._ht_video_play_url.style.visibility = (Number(me._ht_video_play_url.style.opacity) > 0 || !me._ht_video_play_url.style.opacity) ? 'inherit' : 'hidden';
            me._ht_video_play_url.ggVisible = true;
        }
        me._ht_video_pause_url.onmouseover = function (e) {
            me._ht_video_pause_url__img.style.visibility = 'hidden';
            me._ht_video_pause_url__imgo.style.visibility = 'inherit';
        }
        me._ht_video_pause_url.onmouseout = function (e) {
            me._ht_video_pause_url__img.style.visibility = 'inherit';
            me._ht_video_pause_url__imgo.style.visibility = 'hidden';
        }
        me._ht_video_pause_url.ggUpdatePosition = function (useTransition) {
        }
        me._video_popup_controls_url.appendChild(me._ht_video_pause_url);
        me.divSkin.appendChild(me._video_popup_controls_url);
        el = me._video_popup_vimeo = document.createElement('div');
        el.ggId = "video_popup_vimeo";
        el.ggDx = 0;
        el.ggDy = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_container ";
        el.ggType = 'container';
        hs = '';
        hs += 'height : 80%;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -10000px;';
        hs += 'visibility : hidden;';
        hs += 'width : 80%;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._video_popup_vimeo.ggIsActive = function () {
            return false;
        }
        el.ggElementNodeId = function () {
            return player.getCurrentNode();
        }
        me._video_popup_vimeo.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('vis_video_popup_vimeo') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._video_popup_vimeo.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._video_popup_vimeo.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._video_popup_vimeo.style[domTransition] = '';
                if (me._video_popup_vimeo.ggCurrentLogicStateVisible == 0) {
                    me._video_popup_vimeo.style.visibility = (Number(me._video_popup_vimeo.style.opacity) > 0 || !me._video_popup_vimeo.style.opacity) ? 'inherit' : 'hidden';
                    me._video_popup_vimeo.ggVisible = true;
                } else {
                    me._video_popup_vimeo.style.visibility = "hidden";
                    me._video_popup_vimeo.ggVisible = false;
                }
            }
        }
        me._video_popup_vimeo.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = ((this.ggDx * pw) / 100.0 + pw / 2 - w / 2) + 'px';
                var ph = this.parentNode.clientHeight;
                var h = this.offsetHeight;
                this.style.top = ((this.ggDy * ph) / 100.0 + ph / 2 - h / 2) + 'px';
            }
        }
        el = me._loading_video_vimeo = document.createElement('div');
        els = me._loading_video_vimeo__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSJ3aGl0ZSI+CiAgPGNpcmNsZSBjeD0iMTYiIGN5PSIzIiByPSIwIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMDszOzA7MCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0icm' +
            '90YXRlKDQ1IDE2IDE2KSIgY3g9IjE2IiBjeT0iMyIgcj0iMCI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7MzswOzAiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC4xMjVzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDkwIDE2IDE2KSIgY3g9IjE2IiBjeT0iMyIgcj0iMCI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7MzswOzAi' +
            'IGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC4yNXMiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiAvPgogIDwvY2lyY2xlPgogIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUoMTM1IDE2IDE2KSIgY3g9IjE2IiBjeT0iMyIgcj0iMCI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7MzswOzAiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC4zNzVzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMi' +
            'AwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDE4MCAxNiAxNikiIGN4PSIxNiIgY3k9IjMiIHI9IjAiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIwOzM7MDswIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAuNXMiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiAvPgogIDwvY2lyY2xlPgogIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUo' +
            'MjI1IDE2IDE2KSIgY3g9IjE2IiBjeT0iMyIgcj0iMCI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7MzswOzAiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC42MjVzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDI3MCAxNiAxNikiIGN4PSIxNiIgY3k9IjMiIHI9IjAiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIwOzM7MDswIiBkdX' +
            'I9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAuNzVzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDMxNSAxNiAxNikiIGN4PSIxNiIgY3k9IjMiIHI9IjAiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIwOzM7MDswIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAuODc1cyIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40' +
            'IDAuODswLjIgMC4yIDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIC8+CiAgPC9jaXJjbGU+CiAgPGNpcmNsZSB0cmFuc2Zvcm09InJvdGF0ZSgxODAgMTYgMTYpIiBjeD0iMTYiIGN5PSIzIiByPSIwIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMDszOzA7MCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwLjVzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KPC9zdmc+Cg==';
        me._loading_video_vimeo__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;loading_video_vimeo;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        el.ggId = "loading_video_vimeo";
        el.ggDx = 0;
        el.ggDy = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'height : 40px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -10000px;';
        hs += 'visibility : inherit;';
        hs += 'width : 40px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._loading_video_vimeo.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._loading_video_vimeo.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
                var ph = this.parentNode.clientHeight;
                var h = this.offsetHeight;
                this.style.top = (this.ggDy + ph / 2 - h / 2) + 'px';
            }
        }
        me._video_popup_vimeo.appendChild(me._loading_video_vimeo);
        el = me._popup_video_vimeo = document.createElement('div');
        me._popup_video_vimeo.seekbars = [];
        me._popup_video_vimeo.ggInitMedia = function (media) {
            var notifySeekbars = function () {
                for (var i = 0; i < me._popup_video_vimeo.seekbars.length; i++) {
                    var seekbar = me.findElements(me._popup_video_vimeo.seekbars[i]);
                    if (seekbar.length > 0) seekbar[0].connectToMediaEl();
                }
            }
            while (me._popup_video_vimeo.hasChildNodes()) {
                me._popup_video_vimeo.removeChild(me._popup_video_vimeo.lastChild);
            }
            if (media == '') {
                notifySeekbars();
                me._popup_video_vimeo.ggVideoNotLoaded = true;
                return;
            }
            me._popup_video_vimeo.ggVideoNotLoaded = false;
            me._popup_video_vimeo__vid = document.createElement('iframe');
            me._popup_video_vimeo__vid.className = 'ggskin ggskin_video';
            var ggVideoParams = '?autoplay=1&amp;loop=0&amp;rel=0';
            var ggVideoUrl = 'https://player.vimeo.com/video/' + media + ggVideoParams;
            me._popup_video_vimeo__vid.setAttribute('src', ggVideoUrl);
            me._popup_video_vimeo__vid.setAttribute('width', '100%');
            me._popup_video_vimeo__vid.setAttribute('height', '100%');
            me._popup_video_vimeo__vid.setAttribute('style', 'border:none; ; ;');
            me._popup_video_vimeo.appendChild(me._popup_video_vimeo__vid);
            me._popup_video_vimeo.ggVideoSource = media;
        }
        el.ggId = "popup_video_vimeo";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_video ";
        el.ggType = 'video';
        hs = '';
        hs += 'height : 100%;';
        hs += 'left : 0%;';
        hs += 'position : absolute;';
        hs += 'top : 0%;';
        hs += 'visibility : hidden;';
        hs += 'width : 100%;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._popup_video_vimeo.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._popup_video_vimeo.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('vis_video_popup_vimeo') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._popup_video_vimeo.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._popup_video_vimeo.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._popup_video_vimeo.style[domTransition] = '';
                if (me._popup_video_vimeo.ggCurrentLogicStateVisible == 0) {
                    me._popup_video_vimeo.style.visibility = (Number(me._popup_video_vimeo.style.opacity) > 0 || !me._popup_video_vimeo.style.opacity) ? 'inherit' : 'hidden';
                    if (me._popup_video_vimeo.ggVideoNotLoaded) {
                        me._popup_video_vimeo.ggInitMedia(me._popup_video_vimeo.ggVideoSource);
                    }
                    me._popup_video_vimeo.ggVisible = true;
                } else {
                    me._popup_video_vimeo.style.visibility = "hidden";
                    me._popup_video_vimeo.ggInitMedia('');
                    me._popup_video_vimeo.ggVisible = false;
                }
            }
        }
        me._popup_video_vimeo.ggUpdatePosition = function (useTransition) {
        }
        me._video_popup_vimeo.appendChild(me._popup_video_vimeo);
        me.divSkin.appendChild(me._video_popup_vimeo);
        el = me._video_popup_youtube = document.createElement('div');
        el.ggId = "video_popup_youtube";
        el.ggDx = 0;
        el.ggDy = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_container ";
        el.ggType = 'container';
        hs = '';
        hs += 'height : 80%;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -10000px;';
        hs += 'visibility : hidden;';
        hs += 'width : 80%;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._video_popup_youtube.ggIsActive = function () {
            return false;
        }
        el.ggElementNodeId = function () {
            return player.getCurrentNode();
        }
        me._video_popup_youtube.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('vis_video_popup_youtube') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._video_popup_youtube.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._video_popup_youtube.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._video_popup_youtube.style[domTransition] = '';
                if (me._video_popup_youtube.ggCurrentLogicStateVisible == 0) {
                    me._video_popup_youtube.style.visibility = (Number(me._video_popup_youtube.style.opacity) > 0 || !me._video_popup_youtube.style.opacity) ? 'inherit' : 'hidden';
                    me._video_popup_youtube.ggVisible = true;
                } else {
                    me._video_popup_youtube.style.visibility = "hidden";
                    me._video_popup_youtube.ggVisible = false;
                }
            }
        }
        me._video_popup_youtube.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = ((this.ggDx * pw) / 100.0 + pw / 2 - w / 2) + 'px';
                var ph = this.parentNode.clientHeight;
                var h = this.offsetHeight;
                this.style.top = ((this.ggDy * ph) / 100.0 + ph / 2 - h / 2) + 'px';
            }
        }
        el = me._loading_video_youtube = document.createElement('div');
        els = me._loading_video_youtube__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSJ3aGl0ZSI+CiAgPGNpcmNsZSBjeD0iMTYiIGN5PSIzIiByPSIwIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMDszOzA7MCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0icm' +
            '90YXRlKDQ1IDE2IDE2KSIgY3g9IjE2IiBjeT0iMyIgcj0iMCI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7MzswOzAiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC4xMjVzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDkwIDE2IDE2KSIgY3g9IjE2IiBjeT0iMyIgcj0iMCI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7MzswOzAi' +
            'IGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC4yNXMiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiAvPgogIDwvY2lyY2xlPgogIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUoMTM1IDE2IDE2KSIgY3g9IjE2IiBjeT0iMyIgcj0iMCI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7MzswOzAiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC4zNzVzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMi' +
            'AwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDE4MCAxNiAxNikiIGN4PSIxNiIgY3k9IjMiIHI9IjAiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIwOzM7MDswIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAuNXMiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiAvPgogIDwvY2lyY2xlPgogIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUo' +
            'MjI1IDE2IDE2KSIgY3g9IjE2IiBjeT0iMyIgcj0iMCI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7MzswOzAiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC42MjVzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDI3MCAxNiAxNikiIGN4PSIxNiIgY3k9IjMiIHI9IjAiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIwOzM7MDswIiBkdX' +
            'I9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAuNzVzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDMxNSAxNiAxNikiIGN4PSIxNiIgY3k9IjMiIHI9IjAiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIwOzM7MDswIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAuODc1cyIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40' +
            'IDAuODswLjIgMC4yIDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIC8+CiAgPC9jaXJjbGU+CiAgPGNpcmNsZSB0cmFuc2Zvcm09InJvdGF0ZSgxODAgMTYgMTYpIiBjeD0iMTYiIGN5PSIzIiByPSIwIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMDszOzA7MCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwLjVzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KPC9zdmc+Cg==';
        me._loading_video_youtube__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;loading_video_youtube;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        el.ggId = "loading_video_youtube";
        el.ggDx = 0;
        el.ggDy = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'height : 40px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -10000px;';
        hs += 'visibility : inherit;';
        hs += 'width : 40px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._loading_video_youtube.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._loading_video_youtube.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
                var ph = this.parentNode.clientHeight;
                var h = this.offsetHeight;
                this.style.top = (this.ggDy + ph / 2 - h / 2) + 'px';
            }
        }
        me._video_popup_youtube.appendChild(me._loading_video_youtube);
        el = me._popup_video_youtube = document.createElement('div');
        me._popup_video_youtube.seekbars = [];
        me._popup_video_youtube.ggInitMedia = function (media) {
            var notifySeekbars = function () {
                for (var i = 0; i < me._popup_video_youtube.seekbars.length; i++) {
                    var seekbar = me.findElements(me._popup_video_youtube.seekbars[i]);
                    if (seekbar.length > 0) seekbar[0].connectToMediaEl();
                }
            }
            while (me._popup_video_youtube.hasChildNodes()) {
                me._popup_video_youtube.removeChild(me._popup_video_youtube.lastChild);
            }
            if (media == '') {
                notifySeekbars();
                me._popup_video_youtube.ggVideoNotLoaded = true;
                return;
            }
            me._popup_video_youtube.ggVideoNotLoaded = false;
            me._popup_video_youtube__vid = document.createElement('iframe');
            me._popup_video_youtube__vid.className = 'ggskin ggskin_video';
            var ggVideoParams = '?autoplay=1&amp;controls=1&amp;loop=0&amp;rel=0';
            var ggVideoUrl = 'https://www.youtube.com/embed/' + media + ggVideoParams;
            me._popup_video_youtube__vid.setAttribute('src', ggVideoUrl);
            me._popup_video_youtube__vid.setAttribute('width', '100%');
            me._popup_video_youtube__vid.setAttribute('height', '100%');
            me._popup_video_youtube__vid.setAttribute('style', 'border:none; ; ;');
            me._popup_video_youtube.appendChild(me._popup_video_youtube__vid);
            me._popup_video_youtube.ggVideoSource = media;
        }
        el.ggId = "popup_video_youtube";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_video ";
        el.ggType = 'video';
        hs = '';
        hs += 'height : 100%;';
        hs += 'left : 0%;';
        hs += 'position : absolute;';
        hs += 'top : 0%;';
        hs += 'visibility : hidden;';
        hs += 'width : 100%;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._popup_video_youtube.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._popup_video_youtube.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('vis_video_popup_youtube') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._popup_video_youtube.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._popup_video_youtube.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._popup_video_youtube.style[domTransition] = '';
                if (me._popup_video_youtube.ggCurrentLogicStateVisible == 0) {
                    me._popup_video_youtube.style.visibility = (Number(me._popup_video_youtube.style.opacity) > 0 || !me._popup_video_youtube.style.opacity) ? 'inherit' : 'hidden';
                    if (me._popup_video_youtube.ggVideoNotLoaded) {
                        me._popup_video_youtube.ggInitMedia(me._popup_video_youtube.ggVideoSource);
                    }
                    me._popup_video_youtube.ggVisible = true;
                } else {
                    me._popup_video_youtube.style.visibility = "hidden";
                    me._popup_video_youtube.ggInitMedia('');
                    me._popup_video_youtube.ggVisible = false;
                }
            }
        }
        me._popup_video_youtube.ggUpdatePosition = function (useTransition) {
        }
        me._video_popup_youtube.appendChild(me._popup_video_youtube);
        me.divSkin.appendChild(me._video_popup_youtube);
        el = me.__360image_gyro = document.createElement('div');
        el.ggTimestamp = 0;
        el.ggLastIsActive = false;
        el.ggTimeout = 4000;
        el.ggId = "360image_gyro";
        el.ggDx = 0;
        el.ggDy = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_timer ";
        el.ggType = 'timer';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 86px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -10000px;';
        hs += 'visibility : hidden;';
        hs += 'width : 116px;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me.__360image_gyro.ggIsActive = function () {
            return (me.__360image_gyro.ggTimestamp + me.__360image_gyro.ggTimeout) >= me.ggCurrentTime;
        }
        el.ggElementNodeId = function () {
            return player.getCurrentNode();
        }
        me.__360image_gyro.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getIsMobile() == true) &&
                (player.getVariableValue('opt_gyro') == true) &&
                (player.getVariableValue('vis_360image_once') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me.__360image_gyro.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me.__360image_gyro.ggCurrentLogicStateVisible = newLogicStateVisible;
                me.__360image_gyro.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me.__360image_gyro.ggCurrentLogicStateVisible == 0) {
                    me.__360image_gyro.style.visibility = (Number(me.__360image_gyro.style.opacity) > 0 || !me.__360image_gyro.style.opacity) ? 'inherit' : 'hidden';
                    me.__360image_gyro.ggVisible = true;
                } else {
                    me.__360image_gyro.style.visibility = "hidden";
                    me.__360image_gyro.ggVisible = false;
                }
            }
        }
        me.__360image_gyro.logicBlock_alpha = function () {
            var newLogicStateAlpha;
            if (
                (me.__360image_gyro.ggIsActive() == false)
            ) {
                newLogicStateAlpha = 0;
            } else {
                newLogicStateAlpha = -1;
            }
            if (me.__360image_gyro.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
                me.__360image_gyro.ggCurrentLogicStateAlpha = newLogicStateAlpha;
                me.__360image_gyro.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me.__360image_gyro.ggCurrentLogicStateAlpha == 0) {
                    me.__360image_gyro.style.visibility = "hidden";
                    me.__360image_gyro.style.opacity = 0;
                } else {
                    me.__360image_gyro.style.visibility = me.__360image_gyro.ggVisible ? 'inherit' : 'hidden';
                    me.__360image_gyro.style.opacity = 1;
                }
            }
        }
        me.__360image_gyro.ggDeactivate = function () {
            player.setVariableValue('vis_360image_once', false);
        }
        me.__360image_gyro.ggCurrentLogicStateVisible = -1;
        me.__360image_gyro.ggCurrentLogicStateAlpha = -1;
        me.__360image_gyro.ggUpdateConditionTimer = function () {
            me.__360image_gyro.logicBlock_alpha();
        }
        me.__360image_gyro.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
                var ph = this.parentNode.clientHeight;
                var h = this.offsetHeight;
                this.style.top = (this.ggDy + ph / 2 - h / 2) + 'px';
            }
        }
        el = me.__360image_timer = document.createElement('div');
        el.ggTimestamp = 0;
        el.ggLastIsActive = false;
        el.ggTimeout = 400;
        el.ggId = "360image_timer";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_timer ";
        el.ggType = 'timer';
        hs = '';
        hs += 'height : 38px;';
        hs += 'left : 32px;';
        hs += 'position : absolute;';
        hs += 'top : 25px;';
        hs += 'visibility : inherit;';
        hs += 'width : 52px;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me.__360image_timer.ggIsActive = function () {
            return (me.__360image_timer.ggTimestamp == 0 ? false : (Math.floor((me.ggCurrentTime - me.__360image_timer.ggTimestamp) / me.__360image_timer.ggTimeout) % 2 == 0));
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me.__360image_timer.ggActivate = function () {
            player.setVariableValue('pos_360image', player.getVariableValue('pos_360image') + Number("1"));
            player.setVariableValue('pos_360image', player.getVariableValue('pos_360image') % Number("5"));
        }
        me.__360image_timer.ggUpdatePosition = function (useTransition) {
        }
        me.__360image_gyro.appendChild(me.__360image_timer);
        el = me.__360image_background = document.createElement('div');
        el.ggId = "360image_background";
        el.ggDx = 0;
        el.ggDy = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_rectangle ";
        el.ggType = 'rectangle';
        hs = '';
        hs += 'background : rgba(0,0,0,0.705882);';
        hs += 'border : 1px solid #000000;';
        hs += 'cursor : default;';
        hs += 'height : 86px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -10000px;';
        hs += 'visibility : inherit;';
        hs += 'width : 116px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me.__360image_background.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me.__360image_background.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
                var ph = this.parentNode.clientHeight;
                var h = this.offsetHeight;
                this.style.top = (this.ggDy + ph / 2 - h / 2) + 'px';
            }
        }
        me.__360image_gyro.appendChild(me.__360image_background);
        el = me.__360image_text = document.createElement('div');
        els = me.__360image_text__text = document.createElement('div');
        el.className = 'ggskin ggskin_textdiv';
        el.ggTextDiv = els;
        el.ggId = "360image_text";
        el.ggDx = 0;
        el.ggDy = 32;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_text ";
        el.ggType = 'text';
        hs = '';
        hs += 'height : 19px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -10000px;';
        hs += 'visibility : inherit;';
        hs += 'width : 89px;';
        hs += 'pointer-events:auto;';
        hs += 'font-weight: bold;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        hs = 'position:absolute;';
        hs += 'box-sizing: border-box;';
        hs += 'cursor: default;';
        hs += 'left: 0px;';
        hs += 'top:  0px;';
        hs += 'width: 89px;';
        hs += 'height: 19px;';
        hs += 'border: 0px solid #000000;';
        hs += 'color: rgba(255,255,255,1);';
        hs += 'text-align: center;';
        hs += 'white-space: nowrap;';
        hs += 'padding: 0px 1px 0px 1px;';
        hs += 'overflow: hidden;';
        els.setAttribute('style', hs);
        els.innerHTML = "Gyroscope";
        el.appendChild(els);
        me.__360image_text.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me.__360image_text.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth + 0;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
                var ph = this.parentNode.clientHeight;
                var h = this.offsetHeight;
                this.style.top = (this.ggDy + ph / 2 - h / 2) + 'px';
            }
        }
        me.__360image_gyro.appendChild(me.__360image_text);
        el = me.__360image = document.createElement('div');
        el.ggId = "360image";
        el.ggDx = 0;
        el.ggDy = -8;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_rectangle ";
        el.ggType = 'rectangle';
        hs = '';
        hs += cssPrefix + 'border-radius : 9px;';
        hs += 'border-radius : 9px;';
        hs += 'background : rgba(255,255,255,0.00392157);';
        hs += 'border : 2px solid #ffffff;';
        hs += 'cursor : default;';
        hs += 'height : 58px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -10000px;';
        hs += 'visibility : inherit;';
        hs += 'width : 33px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me.__360image.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me.__360image.logicBlock_position = function () {
            var newLogicStatePosition;
            if (
                (player.getVariableValue('pos_360image') == 0)
            ) {
                newLogicStatePosition = 0;
            } else if (
                (player.getVariableValue('pos_360image') == 1)
            ) {
                newLogicStatePosition = 1;
            } else if (
                (player.getVariableValue('pos_360image') == 2)
            ) {
                newLogicStatePosition = 2;
            } else if (
                (player.getVariableValue('pos_360image') == 3)
            ) {
                newLogicStatePosition = 3;
            } else if (
                (player.getVariableValue('pos_360image') == 4)
            ) {
                newLogicStatePosition = 4;
            } else {
                newLogicStatePosition = -1;
            }
            if (me.__360image.ggCurrentLogicStatePosition != newLogicStatePosition) {
                me.__360image.ggCurrentLogicStatePosition = newLogicStatePosition;
                me.__360image.style[domTransition] = 'left 1000ms ease 0ms, top 1000ms ease 0ms, ' + cssPrefix + 'transform 1000ms ease 0ms';
                if (me.__360image.ggCurrentLogicStatePosition == 0) {
                    this.ggDx = 0;
                    this.ggDy = -8;
                    me.__360image.ggUpdatePosition(true);
                } else if (me.__360image.ggCurrentLogicStatePosition == 1) {
                    this.ggDx = 0;
                    this.ggDy = -8;
                    me.__360image.ggUpdatePosition(true);
                } else if (me.__360image.ggCurrentLogicStatePosition == 2) {
                    this.ggDx = -32;
                    this.ggDy = -8;
                    me.__360image.ggUpdatePosition(true);
                } else if (me.__360image.ggCurrentLogicStatePosition == 3) {
                    this.ggDx = 0;
                    this.ggDy = -8;
                    me.__360image.ggUpdatePosition(true);
                } else if (me.__360image.ggCurrentLogicStatePosition == 4) {
                    this.ggDx = 32;
                    this.ggDy = -8;
                    me.__360image.ggUpdatePosition(true);
                } else {
                    me.__360image.ggDx = 0;
                    me.__360image.ggDy = -8;
                    me.__360image.ggUpdatePosition(true);
                }
            }
        }
        me.__360image.logicBlock_scaling = function () {
            var newLogicStateScaling;
            if (
                (player.getVariableValue('pos_360image') == 2)
            ) {
                newLogicStateScaling = 0;
            } else if (
                (player.getVariableValue('pos_360image') == 3)
            ) {
                newLogicStateScaling = 1;
            } else if (
                (player.getVariableValue('pos_360image') == 4)
            ) {
                newLogicStateScaling = 2;
            } else if (
                (player.getVariableValue('pos_360image') == 5)
            ) {
                newLogicStateScaling = 3;
            } else {
                newLogicStateScaling = -1;
            }
            if (me.__360image.ggCurrentLogicStateScaling != newLogicStateScaling) {
                me.__360image.ggCurrentLogicStateScaling = newLogicStateScaling;
                me.__360image.style[domTransition] = 'left 1000ms ease 0ms, top 1000ms ease 0ms, ' + cssPrefix + 'transform 1000ms ease 0ms';
                if (me.__360image.ggCurrentLogicStateScaling == 0) {
                    me.__360image.ggParameter.sx = 0.7;
                    me.__360image.ggParameter.sy = 1;
                    me.__360image.style[domTransform] = parameterToTransform(me.__360image.ggParameter);
                } else if (me.__360image.ggCurrentLogicStateScaling == 1) {
                    me.__360image.ggParameter.sx = 1;
                    me.__360image.ggParameter.sy = 1;
                    me.__360image.style[domTransform] = parameterToTransform(me.__360image.ggParameter);
                } else if (me.__360image.ggCurrentLogicStateScaling == 2) {
                    me.__360image.ggParameter.sx = 0.7;
                    me.__360image.ggParameter.sy = 1;
                    me.__360image.style[domTransform] = parameterToTransform(me.__360image.ggParameter);
                } else if (me.__360image.ggCurrentLogicStateScaling == 3) {
                    me.__360image.ggParameter.sx = 1;
                    me.__360image.ggParameter.sy = 1;
                    me.__360image.style[domTransform] = parameterToTransform(me.__360image.ggParameter);
                } else {
                    me.__360image.ggParameter.sx = 1;
                    me.__360image.ggParameter.sy = 1;
                    me.__360image.style[domTransform] = parameterToTransform(me.__360image.ggParameter);
                }
            }
        }
        me.__360image.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
                var ph = this.parentNode.clientHeight;
                var h = this.offsetHeight;
                this.style.top = (this.ggDy + ph / 2 - h / 2) + 'px';
            }
        }
        el = me._phone1 = document.createElement('div');
        el.ggId = "phone1";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_rectangle ";
        el.ggType = 'rectangle';
        hs = '';
        hs += 'border : 1px solid #ffffff;';
        hs += 'cursor : default;';
        hs += 'height : 37px;';
        hs += 'left : 3px;';
        hs += 'position : absolute;';
        hs += 'top : 9px;';
        hs += 'visibility : inherit;';
        hs += 'width : 26px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._phone1.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._phone1.ggUpdatePosition = function (useTransition) {
        }
        me.__360image.appendChild(me._phone1);
        el = me._phone2 = document.createElement('div');
        el.ggId = "phone2";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_rectangle ";
        el.ggType = 'rectangle';
        hs = '';
        hs += cssPrefix + 'border-radius : 999px;';
        hs += 'border-radius : 999px;';
        hs += 'background : #ffffff;';
        hs += 'border : 1px solid #ffffff;';
        hs += 'cursor : default;';
        hs += 'height : 6px;';
        hs += 'left : 14px;';
        hs += 'position : absolute;';
        hs += 'top : 49px;';
        hs += 'visibility : inherit;';
        hs += 'width : 6px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._phone2.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._phone2.logicBlock_scaling = function () {
            var newLogicStateScaling;
            if (
                (player.getVariableValue('pos_360image') == 1)
            ) {
                newLogicStateScaling = 0;
            } else if (
                (player.getVariableValue('pos_360image') == 2)
            ) {
                newLogicStateScaling = 1;
            } else if (
                (player.getVariableValue('pos_360image') == 3)
            ) {
                newLogicStateScaling = 2;
            } else {
                newLogicStateScaling = -1;
            }
            if (me._phone2.ggCurrentLogicStateScaling != newLogicStateScaling) {
                me._phone2.ggCurrentLogicStateScaling = newLogicStateScaling;
                me._phone2.style[domTransition] = '' + cssPrefix + 'transform 1000ms ease 0ms';
                if (me._phone2.ggCurrentLogicStateScaling == 0) {
                    me._phone2.ggParameter.sx = 0.8;
                    me._phone2.ggParameter.sy = 1;
                    me._phone2.style[domTransform] = parameterToTransform(me._phone2.ggParameter);
                } else if (me._phone2.ggCurrentLogicStateScaling == 1) {
                    me._phone2.ggParameter.sx = 1;
                    me._phone2.ggParameter.sy = 1;
                    me._phone2.style[domTransform] = parameterToTransform(me._phone2.ggParameter);
                } else if (me._phone2.ggCurrentLogicStateScaling == 2) {
                    me._phone2.ggParameter.sx = 0.8;
                    me._phone2.ggParameter.sy = 1;
                    me._phone2.style[domTransform] = parameterToTransform(me._phone2.ggParameter);
                } else {
                    me._phone2.ggParameter.sx = 1;
                    me._phone2.ggParameter.sy = 1;
                    me._phone2.style[domTransform] = parameterToTransform(me._phone2.ggParameter);
                }
            }
        }
        me._phone2.ggUpdatePosition = function (useTransition) {
        }
        me.__360image.appendChild(me._phone2);
        el = me._phone3 = document.createElement('div');
        el.ggId = "phone3";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_rectangle ";
        el.ggType = 'rectangle';
        hs = '';
        hs += 'background : #ffffff;';
        hs += 'border : 1px solid #ffffff;';
        hs += 'cursor : default;';
        hs += 'height : 1px;';
        hs += 'left : 12px;';
        hs += 'position : absolute;';
        hs += 'top : 4px;';
        hs += 'visibility : inherit;';
        hs += 'width : 8px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._phone3.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._phone3.logicBlock_scaling = function () {
            var newLogicStateScaling;
            if (
                (player.getVariableValue('pos_360image') == 1)
            ) {
                newLogicStateScaling = 0;
            } else if (
                (player.getVariableValue('pos_360image') == 0)
            ) {
                newLogicStateScaling = 1;
            } else if (
                (player.getVariableValue('pos_360image') == 0)
            ) {
                newLogicStateScaling = 2;
            } else {
                newLogicStateScaling = -1;
            }
            if (me._phone3.ggCurrentLogicStateScaling != newLogicStateScaling) {
                me._phone3.ggCurrentLogicStateScaling = newLogicStateScaling;
                me._phone3.style[domTransition] = '' + cssPrefix + 'transform 1000ms ease 0ms';
                if (me._phone3.ggCurrentLogicStateScaling == 0) {
                    me._phone3.ggParameter.sx = 0.8;
                    me._phone3.ggParameter.sy = 1;
                    me._phone3.style[domTransform] = parameterToTransform(me._phone3.ggParameter);
                } else if (me._phone3.ggCurrentLogicStateScaling == 1) {
                    me._phone3.ggParameter.sx = 1;
                    me._phone3.ggParameter.sy = 1;
                    me._phone3.style[domTransform] = parameterToTransform(me._phone3.ggParameter);
                } else if (me._phone3.ggCurrentLogicStateScaling == 2) {
                    me._phone3.ggParameter.sx = 0.8;
                    me._phone3.ggParameter.sy = 1;
                    me._phone3.style[domTransform] = parameterToTransform(me._phone3.ggParameter);
                } else {
                    me._phone3.ggParameter.sx = 1;
                    me._phone3.ggParameter.sy = 1;
                    me._phone3.style[domTransform] = parameterToTransform(me._phone3.ggParameter);
                }
            }
        }
        me._phone3.ggUpdatePosition = function (useTransition) {
        }
        me.__360image.appendChild(me._phone3);
        me.__360image_gyro.appendChild(me.__360image);
        me.divSkin.appendChild(me.__360image_gyro);
        el = me._close = document.createElement('div');
        els = me._close__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTEzNS4zLDM1Ny4zYy0yMS45LTIxLjktNTcuNS0yMS45LTc5LjQsMGMtMjEuOSwyMS45LTIxLjksNTcuNSwwLDc5LjRjMjEuOSwyMS45LDU3LjUsMjEuOSw3OS40LDANCgkJUy0xMTMuNCwzNzkuMi0xMzUuMywzNTcuM3ogTS0xNDUuOCw0MTIuN2MwLjgsMC44LDAuOCwxLjUtMC4xLDIuNGwtMTAuOSwxMC45Yy0wLjQsMC40LTAuOCwwLjUtMS4zLDAuNWMtMC41LDAtMC45LTAuMS0xLjEtMC40DQoJCWwtMTUuOC0xNS44bC0xNS43LDE1LjdjLTAuNCwwLjQtMC44LDAuNS0xLjMsMC41cy0wLjktMC4xLTEuMS0wLjRsLTEx' +
            'LjEtMTEuMWMtMC4zLTAuMy0wLjQtMC42LTAuNC0xLjFjMC0wLjUsMC4xLTAuOSwwLjUtMS4zDQoJCWwxNS43LTE1LjdsLTE1LjgtMTUuOGMtMC4zLTAuMy0wLjQtMC42LTAuNC0xLjFjMC0wLjUsMC4xLTAuOSwwLjUtMS4zbDEwLjktMTAuOWMwLjktMC45LDEuNy0wLjksMi40LTAuMWwxNS44LDE1LjhsMTUuNy0xNS43DQoJCWMwLjktMC45LDEuNy0wLjksMi40LTAuMWwxMS4xLDExLjFjMC44LDAuOCwwLjgsMS41LTAuMSwyLjRsLTE1LjcsMTUuN0wtMTQ1LjgsNDEyLjd6Ii8+DQo8L2c+DQo8ZyBpZD0iTGF5ZXJfMiI+DQoJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xNjEuNiwzOTYuOWwxNS' +
            '44LDE1LjhjMC44LDAuOCwwLjgsMS41LTAuMSwyLjRsLTEwLjksMTAuOWMtMC40LDAuNC0wLjgsMC41LTEuMywwLjUNCgkJYy0wLjUsMC0wLjktMC4xLTEuMS0wLjRsLTE1LjgtMTUuOGwtMTUuNywxNS43Yy0wLjQsMC40LTAuOCwwLjUtMS4zLDAuNXMtMC45LTAuMS0xLjEtMC40bC0xMS4xLTExLjFjLTAuMy0wLjMtMC40LTAuNi0wLjQtMS4xDQoJCWMwLTAuNSwwLjEtMC45LDAuNS0xLjNsMTUuNy0xNS43bC0xNS44LTE1LjhjLTAuMy0wLjMtMC40LTAuNi0wLjQtMS4xYzAtMC41LDAuMS0wLjksMC41LTEuM2wxMC45LTEwLjljMC45LTAuOSwxLjctMC45LDIuNC0wLjENCgkJbDE1LjgsMTUuOGwx' +
            'NS43LTE1LjdjMC45LTAuOSwxLjctMC45LDIuNC0wLjFsMTEuMSwxMS4xYzAuOCwwLjgsMC44LDEuNS0wLjEsMi40TC0xNjEuNiwzOTYuOXoiLz4NCjwvZz4NCjwvc3ZnPg0K';
        me._close__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;close;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._close__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTEzMC45LDM1Mi45Yy0yNC40LTI0LjQtNjMuOC0yNC40LTg4LjIsMGMtMjQuNCwyNC40LTI0LjQsNjMuOCwwLDg4LjJjMjQuNCwyNC40LDYzLjgsMjQuNCw4OC4yLDANCgkJUy0xMDYuNSwzNzcuMy0xMzAuOSwzNTIuOXogTS0xNDIuNSw0MTQuNWMwLjgsMC44LDAuOCwxLjctMC4xLDIuN2wtMTIuMiwxMi4yYy0wLjQsMC40LTAuOCwwLjYtMS40LDAuNmMtMC42LDAtMS0wLjEtMS4zLTAuNA0KCQlsLTE3LjUtMTcuNWwtMTcuNCwxNy40Yy0wLjQsMC40LTAuOCwwLjYtMS40LDAuNmMtMC42LDAtMS0wLjEtMS4zLTAuNGwt' +
            'MTIuMy0xMi4zYy0wLjMtMC4zLTAuNC0wLjctMC40LTEuM2MwLTAuNiwwLjEtMSwwLjYtMS40DQoJCWwxNy40LTE3LjRsLTE3LjUtMTcuNWMtMC4zLTAuMy0wLjQtMC43LTAuNC0xLjNjMC0wLjYsMC4xLTEsMC42LTEuNGwxMi4yLTEyLjJjMS0xLDEuOC0xLDIuNy0wLjFsMTcuNSwxNy41bDE3LjQtMTcuNA0KCQljMS0xLDEuOC0xLDIuNy0wLjFsMTIuMywxMi4zYzAuOCwwLjgsMC44LDEuNy0wLjEsMi43bC0xNy40LDE3LjRMLTE0Mi41LDQxNC41eiIvPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTYwLjEsMzk2LjlsMTcuNSwxNy41YzAuOCwwLj' +
            'gsMC44LDEuNy0wLjEsMi43bC0xMi4yLDEyLjJjLTAuNCwwLjQtMC44LDAuNi0xLjQsMC42DQoJCWMtMC42LDAtMS0wLjEtMS4zLTAuNGwtMTcuNS0xNy41bC0xNy40LDE3LjRjLTAuNCwwLjQtMC44LDAuNi0xLjQsMC42Yy0wLjYsMC0xLTAuMS0xLjMtMC40bC0xMi4zLTEyLjNjLTAuMy0wLjMtMC40LTAuNy0wLjQtMS4zDQoJCWMwLTAuNiwwLjEtMSwwLjYtMS40bDE3LjQtMTcuNGwtMTcuNS0xNy41Yy0wLjMtMC4zLTAuNC0wLjctMC40LTEuM2MwLTAuNiwwLjEtMSwwLjYtMS40bDEyLjItMTIuMmMxLTEsMS44LTEsMi43LTAuMWwxNy41LDE3LjUNCgkJbDE3LjQtMTcuNGMxLTEsMS44LTEsMi43' +
            'LTAuMWwxMi4zLDEyLjNjMC44LDAuOCwwLjgsMS43LTAuMSwyLjdMLTE2MC4xLDM5Ni45eiIvPg0KPC9nPg0KPC9zdmc+DQo=';
        me._close__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;close;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "close";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 32px;';
        hs += 'position : absolute;';
        hs += 'right : 5px;';
        hs += 'top : 5px;';
        hs += 'visibility : hidden;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._close.ggIsActive = function () {
            return false;
        }
        el.ggElementNodeId = function () {
            return player.getCurrentNode();
        }
        me._close.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('vis_image_popup') == true) ||
                (player.getVariableValue('vis_video_popup_file') == true) ||
                (player.getVariableValue('vis_video_popup_url') == true) ||
                (player.getVariableValue('vis_video_popup_vimeo') == true) ||
                (player.getVariableValue('vis_video_popup_youtube') == true) ||
                (player.getVariableValue('vis_website') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._close.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._close.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._close.style[domTransition] = '';
                if (me._close.ggCurrentLogicStateVisible == 0) {
                    me._close.style.visibility = (Number(me._close.style.opacity) > 0 || !me._close.style.opacity) ? 'inherit' : 'hidden';
                    me._close.ggVisible = true;
                } else {
                    me._close.style.visibility = "hidden";
                    me._close.ggVisible = false;
                }
            }
        }
        me._close.onclick = function (e) {
            player.setVariableValue('vis_image_popup', false);
            player.setVariableValue('vis_info_popup', false);
            player.setVariableValue('vis_video_popup_file', false);
            player.setVariableValue('vis_video_popup_url', false);
            player.setVariableValue('vis_video_popup_vimeo', false);
            player.setVariableValue('vis_video_popup_youtube', false);
            player.setVariableValue('vis_website', false);
        }
        me._close.onmouseover = function (e) {
            me._close__img.style.visibility = 'hidden';
            me._close__imgo.style.visibility = 'inherit';
        }
        me._close.onmouseout = function (e) {
            me._close__img.style.visibility = 'inherit';
            me._close__imgo.style.visibility = 'hidden';
        }
        me._close.ggUpdatePosition = function (useTransition) {
        }
        me.divSkin.appendChild(me._close);
        el = me._loading = document.createElement('div');
        el.ggId = "loading";
        el.ggDx = 0;
        el.ggDy = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_container ";
        el.ggType = 'container';
        hs = '';
        hs += 'height : 60px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -10000px;';
        hs += 'visibility : hidden;';
        hs += 'width : 210px;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._loading.ggIsActive = function () {
            return false;
        }
        el.ggElementNodeId = function () {
            return player.getCurrentNode();
        }
        me._loading.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('opt_loader') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._loading.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._loading.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._loading.style[domTransition] = '';
                if (me._loading.ggCurrentLogicStateVisible == 0) {
                    me._loading.style.visibility = (Number(me._loading.style.opacity) > 0 || !me._loading.style.opacity) ? 'inherit' : 'hidden';
                    me._loading.ggVisible = true;
                } else {
                    me._loading.style.visibility = "hidden";
                    me._loading.ggVisible = false;
                }
            }
        }
        me._loading.onclick = function (e) {
            me._loading.style[domTransition] = 'none';
            me._loading.style.visibility = 'hidden';
            me._loading.ggVisible = false;
        }
        me._loading.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
                var ph = this.parentNode.clientHeight;
                var h = this.offsetHeight;
                this.style.top = (this.ggDy + ph / 2 - h / 2) + 'px';
            }
        }
        el = me._loadingbg = document.createElement('div');
        el.ggId = "loadingbg";
        el.ggDx = 0;
        el.ggDy = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_rectangle ";
        el.ggType = 'rectangle';
        hs = '';
        hs += 'background : rgba(0,0,0,0.666667);';
        hs += 'border : 0px solid #000000;';
        hs += 'cursor : default;';
        hs += 'height : 60px;';
        hs += 'left : -10000px;';
        hs += 'opacity : 0.5;';
        hs += 'position : absolute;';
        hs += 'top : -10000px;';
        hs += 'visibility : inherit;';
        hs += 'width : 210px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._loadingbg.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._loadingbg.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
                var ph = this.parentNode.clientHeight;
                var h = this.offsetHeight;
                this.style.top = (this.ggDy + ph / 2 - h / 2) + 'px';
            }
        }
        me._loading.appendChild(me._loadingbg);
        el = me._loadingtext = document.createElement('div');
        els = me._loadingtext__text = document.createElement('div');
        el.className = 'ggskin ggskin_textdiv';
        el.ggTextDiv = els;
        el.ggId = "loadingtext";
        el.ggDx = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_text ";
        el.ggType = 'text';
        hs = '';
        hs += 'bottom : 25px;';
        hs += 'height : 23px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'visibility : inherit;';
        hs += 'width : 178px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '0% 50%';
        hs = 'position:absolute;';
        hs += 'box-sizing: border-box;';
        hs += 'cursor: default;';
        hs += 'left: 0px;';
        hs += 'bottom:  0px;';
        hs += 'width: auto;';
        hs += 'height: auto;';
        hs += 'border: 0px solid #000000;';
        hs += 'color: rgba(255,255,255,1);';
        hs += 'text-align: left;';
        hs += 'white-space: nowrap;';
        hs += 'padding: 0px 1px 0px 1px;';
        hs += 'overflow: hidden;';
        els.setAttribute('style', hs);
        me._loadingtext.ggUpdateText = function () {
            var hs = "Loading... " + (player.getPercentLoaded() * 100.0).toFixed(0) + "%";
            if (hs != this.ggText) {
                this.ggText = hs;
                this.ggTextDiv.innerHTML = hs;
                if (this.ggUpdatePosition) this.ggUpdatePosition();
            }
        }
        me._loadingtext.ggUpdateText();
        el.appendChild(els);
        me._loadingtext.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._loadingtext.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth + 0;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
        }
        me._loading.appendChild(me._loadingtext);
        el = me._loadingbar = document.createElement('div');
        el.ggId = "loadingbar";
        el.ggDx = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_rectangle ";
        el.ggType = 'rectangle';
        hs = '';
        hs += 'background : #ffffff;';
        hs += 'border : 0px solid #808080;';
        hs += 'bottom : 12px;';
        hs += 'cursor : default;';
        hs += 'height : 13px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'visibility : inherit;';
        hs += 'width : 182px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '0% 50%';
        me._loadingbar.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._loadingbar.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
        }
        me._loading.appendChild(me._loadingbar);
        me.divSkin.appendChild(me._loading);
        el = me._map_1 = document.createElement('div');
        el.ggFilter = '';
        el.ggFilteredIds = [];
        el.ggId = "Map 1";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_map ";
        el.ggType = 'map';
        hs = '';
        hs += 'background : #ffffff;';
        hs += 'border : 1px solid #000000;';
        hs += 'cursor : default;';
        hs += 'height : 385px;';
        hs += 'left : 303px;';
        hs += 'overflow : hidden;';
        hs += 'position : absolute;';
        hs += 'top : -19px;';
        hs += 'visibility : inherit;';
        hs += 'width : 189px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._map_1.ggIsActive = function () {
            return false;
        }
        el.ggElementNodeId = function () {
            return player.getCurrentNode();
        }
        me._map_1.ggUpdateConditionResize = function () {
            var mapDetails = player.getMapDetails(me._map_1.ggMapId);
            if (!(mapDetails.hasOwnProperty('title'))) return;
            me._map_1.ggCalculateFloorplanSize(mapDetails);
            me._map_1.ggShowSimpleFloorplan(mapDetails);
            me._map_1.ggPlaceMarkersOnSimpleFloorplan();
            me._map_1.ggRadar.update();
        }
        me._map_1.ggUpdateConditionTimer = function () {
            me._map_1.ggRadar.update();
        }
        me._map_1.ggUpdatePosition = function (useTransition) {
            me._map_1.ggUpdateConditionResize();
        }
        me._map_1.ggNodeChange = function () {
            var mapDetails = player.getMapDetails(me._map_1.ggMapId);
            if (!(mapDetails.hasOwnProperty('title'))) return;
            me._map_1.ggCalculateFloorplanSize(mapDetails);
            me._map_1.ggShowSimpleFloorplan(mapDetails);
            me._map_1.ggPlaceMarkersOnSimpleFloorplan();
            me._map_1.ggRadar.update();
            if (me._map_1.ggLastNodeId) {
                var lastActiveMarker = me._map_1.ggSimpleFloorplanMarkerArray[me._map_1.ggLastNodeId];
                if (lastActiveMarker && lastActiveMarker.ggDeactivate) lastActiveMarker.ggDeactivate();
            }
            var id = player.getCurrentNode();
            var marker = me._map_1.ggSimpleFloorplanMarkerArray[id];
            if (marker) {
                if (marker.ggActivate) marker.ggActivate();
            }
            if (player.getMapType(me._map_1.ggMapId) == 'file') {
                var coords = player.getNodeMapCoords(id, me._map_1.ggMapId);
                if (coords.length < 2) {
                    var mapId = player.getMapContainingNode(id);
                    if (mapId != '') {
                        me._map_1.ggChangeMap(mapId);
                    }
                }
            }
            me._map_1.ggLastNodeId = id;
        }
        me.divSkin.appendChild(me._map_1);
        me._popup_video_file.ggVideoSource = 'media/';
        me._popup_video_file.ggVideoNotLoaded = true;
        me._popup_video_url.ggVideoSource = '';
        me._popup_video_url.ggVideoNotLoaded = true;
        me._popup_video_vimeo.ggVideoSource = '';
        me._popup_video_vimeo.ggVideoNotLoaded = true;
        me._popup_video_youtube.ggVideoSource = '';
        me._popup_video_youtube.ggVideoNotLoaded = true;
        me._map_1.ggMarkerInstances = [];
        me._map_1.ggMapId = 'FloorPlan01';
        me._map_1.ggLastNodeId = null;
        me._map_1.ggSimpleFloorplanMarkerArray = [];
        me._map_1.ggFloorplanWidth = 0;
        me._map_1.ggFloorplanHeight = 0;
        me._map_1__mapdiv = document.createElement('div');
        me._map_1__mapdiv.className = 'ggskin ggskin_map';
        me._map_1.appendChild(me._map_1__mapdiv);
        me._map_1__img = document.createElement('img');
        me._map_1__img.className = 'ggskin ggskin_map';
        me._map_1__mapdiv.appendChild(me._map_1__img);
        me._map_1.ggRadar = {lastFov: -1, lastPan: -1, xPos: -1, yPos: -1, radarElement: null}
        me._map_1.ggRadar.update = function () {
            var radar = me._map_1.ggRadar;
            var d2r = Math.PI / 180;
            var fov = player.getFov();
            var pan = player.getPanNorth();
            pan -= me._map_1.ggFloorplanNorth;
            var filterpassed = true;
            var currentId = player.getCurrentNode();
            if (me._map_1.ggFilteredIds.length > 0 && me._map_1.ggFilteredIds.indexOf(currentId) == -1) filterpassed = false;
            if ((me._map_1.ggSimpleFloorplanMarkerArray.hasOwnProperty(currentId)) && filterpassed) {
                var activeMarker = me._map_1.ggSimpleFloorplanMarkerArray[currentId];
                if ((radar.radarElement) && (fov == radar.lastFov) && (pan == radar.lastPan) && (activeMarker.radarXPos == radar.xPos) && (activeMarker.radarYPos == radar.yPos)) return;
                radar.lastPan = pan;
                radar.lastFov = fov;
                radar.xPos = activeMarker.radarXPos;
                radar.yPos = activeMarker.radarYPos;
                if (radar.radarElement) me._map_1__mapdiv.removeChild(radar.radarElement);
                radar.radarElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                radar.radarElement.setAttributeNS(null, 'width', 360);
                radar.radarElement.setAttributeNS(null, 'height', 360);
                radar.radarElement.setAttributeNS(null, 'viewBox', '0 0 360 360');
                var radarPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                radarPath.setAttributeNS(null, 'id', 'radarPath');
                pan = -90 - pan;
                var arcX1 = 180 * Math.cos((pan - fov / 2) * d2r);
                var arcY1 = 180 * Math.sin((pan - fov / 2) * d2r);
                var arcX2 = 180 * Math.cos((pan + fov / 2) * d2r);
                var arcY2 = 180 * Math.sin((pan + fov / 2) * d2r);
                arcX1 += 180;
                arcY1 += 180;
                arcX2 += 180;
                arcY2 += 180;
                var radarPathString = 'M180,180 L' + arcX1 + ',' + arcY1 + ' A 180 180 0 0 1 ' + arcX2 + ' ' + arcY2 + ' Z';
                radarPath.setAttributeNS(null, 'd', radarPathString);
                radarPath.setAttributeNS(null, 'fill', '#ff0000');
                radarPath.setAttributeNS(null, 'fill-opacity', 0.35);
                radarPath.setAttributeNS(null, 'stroke', '#ff0000');
                radarPath.setAttributeNS(null, 'stroke-opacity', 0.8);
                radarPath.setAttributeNS(null, 'stroke-width', 1);
                radarPath.setAttributeNS(null, 'stroke-linejoin', 'miter');
                radar.radarElement.appendChild(radarPath);
                me._map_1__mapdiv.appendChild(radar.radarElement);
                var radarXPos = activeMarker.radarXPos - 180;
                var radarYPos = activeMarker.radarYPos - 180;
                radar.radarElement.style['position'] = 'absolute';
                radar.radarElement.style['left'] = '' + radarXPos + 'px';
                radar.radarElement.style['top'] = '' + radarYPos + 'px';
                radar.radarElement.style['z-index'] = me._map_1.style['z-index'] + 1;
            } else {
                if (radar.radarElement) {
                    me._map_1__mapdiv.removeChild(radar.radarElement);
                    radar.radarElement = null;
                }
            }
        }
        me._map_1.ggShowSimpleFloorplan = function (mapDetails) {
            var mapWidth = me._map_1.clientWidth;
            var mapHeight = me._map_1.clientHeight;
            var levelLimit = 500;
            var level = 1;
            while (mapWidth > levelLimit && mapHeight > levelLimit) {
                levelLimit *= 2;
                level++;
            }
            var imageFilename = basePath + 'images/maptiles/' + me._map_1.ggMapId + '_' + level + '.' + mapDetails['tileformat'];
            console.log(imageFilename);
            me._map_1__img.setAttribute('src', imageFilename);
            me._map_1__mapdiv.setAttribute('style', 'position: absolute; left: 0px; top: 0px;width:' + me._map_1.ggFloorplanWidth + 'px;height:' + me._map_1.ggFloorplanHeight + 'px;overflow:hidden;;');
            me._map_1__img.setAttribute('style', 'width:' + me._map_1.ggFloorplanWidth + 'px;height:' + me._map_1.ggFloorplanHeight + 'px;-webkit-user-drag:none;pointer-events:none;');
        }
        me._map_1.ggCalculateFloorplanSize = function (mapDetails) {
            var floorplanWidth = mapDetails['width'];
            var floorplanHeight = mapDetails['height'];
            var frameAR = me._map_1.clientWidth / me._map_1.clientHeight;
            var floorplanAR = floorplanWidth / floorplanHeight;
            if (frameAR > floorplanAR) {
                me._map_1.ggFloorplanHeight = me._map_1.clientHeight;
                me._map_1.ggFloorplanWidth = me._map_1.ggFloorplanHeight * floorplanAR;
            } else {
                me._map_1.ggFloorplanWidth = me._map_1.clientWidth;
                me._map_1.ggFloorplanHeight = me._map_1.ggFloorplanWidth / floorplanAR;
            }
        }
        me._map_1.ggInitMap = function () {
            me._map_1.ggMapNotLoaded = false;
            var mapDetails = player.getMapDetails(me._map_1.ggMapId);
            me._map_1.style.backgroundColor = mapDetails['bgcolor'];
            if (mapDetails.hasOwnProperty('transparent') && mapDetails['transparent']) {
                me._map_1.ggPermeableMap = true;
            } else {
                me._map_1.ggPermeableMap = false;
            }
            me._map_1.ggCalculateFloorplanSize(mapDetails);
            me._map_1.ggShowSimpleFloorplan(mapDetails);
            me._map_1.ggFloorplanNorth = mapDetails['floorplannorth'];
        }
        me._map_1.ggClearMap = function () {
            me._map_1.ggClearMapMarkers();
            me._map_1.ggMapNotLoaded = true;
        }
        me._map_1.ggChangeMap = function (mapId) {
            var newMapType = player.getMapType(mapId)
            if (newMapType == 'web') {
                return;
            }
            me._map_1.ggMapId = mapId;
            me._map_1.ggClearMap();
            me._map_1.ggInitMap();
            me._map_1.ggInitMapMarkers();
        }
        me._map_1.ggPlaceMarkersOnSimpleFloorplan = function () {
            var markers = me._map_1.ggSimpleFloorplanMarkerArray;
            for (id in markers) {
                if (markers.hasOwnProperty(id)) {
                    marker = markers[id];
                    var coords = player.getNodeMapCoordsInPercent(id, me._map_1.ggMapId);
                    var xPos = (me._map_1.ggFloorplanWidth * coords[0]) / 100.0;
                    var yPos = (me._map_1.ggFloorplanHeight * coords[1]) / 100.0;
                    marker.radarXPos = xPos;
                    marker.radarYPos = yPos;
                    xPos -= me._map_1.ggHMarkerAnchorOffset;
                    yPos -= me._map_1.ggVMarkerAnchorOffset;
                    marker.style['position'] = 'absolute';
                    marker.style['left'] = xPos + 'px';
                    marker.style['top'] = yPos + 'px';
                    marker.style['z-index'] = me._map_1.style['z-index'] + 2;
                }
            }
        }
        me._map_1.ggInitMapMarkers = function () {
            me._map_1.ggClearMapMarkers();
            var ids = player.getNodeIds();
            me._map_1.ggFilteredIds = [];
            if (me._map_1.ggFilter != '') {
                var filter = me._map_1.ggFilter.split(',');
                for (i = 0; i < ids.length; i++) {
                    var nodeId = ids[i];
                    var nodeData = player.getNodeUserdata(nodeId);
                    for (var j = 0; j < filter.length; j++) {
                        if (nodeData['tags'].indexOf(filter[j].trim()) != -1) me._map_1.ggFilteredIds.push(nodeId);
                    }
                }
                if (me._map_1.ggFilteredIds.length > 0) ids = me._map_1.ggFilteredIds;
            }
            for (var i = 0; i < ids.length; i++) {
                var id = ids[i];
                var coords = player.getNodeMapCoordsInPercent(id, me._map_1.ggMapId);
                if (coords.length >= 2) {
                    me._map_1.ggHMarkerAnchorOffset = 20;
                    me._map_1.ggVMarkerAnchorOffset = 40;
                    var marker = document.createElement('img');
                    console.log(basePath);
                    marker.setAttribute('src', basePath + 'images/_ggMapPin.png');
                    marker.setAttribute('title', player.getNodeTitle(id));
                    marker.style['width'] = '40px';
                    marker.style['width'] = '40px';
                    marker.style['cursor'] = 'pointer';
                    marker.ggId = id;
                    marker.onclick = function () {
                        player.openNext('{' + this.ggId + '}');
                    }
                    me._map_1.ggSimpleFloorplanMarkerArray[id] = marker;
                    me._map_1__mapdiv.appendChild(marker);
                }
            }
            me._map_1.ggPlaceMarkersOnSimpleFloorplan();
        }
        me._map_1.ggClearMapMarkers = function () {
            for (id in me._map_1.ggSimpleFloorplanMarkerArray) {
                if (me._map_1.ggSimpleFloorplanMarkerArray.hasOwnProperty(id)) {
                    me._map_1__mapdiv.removeChild(me._map_1.ggSimpleFloorplanMarkerArray[id]);
                }
            }
            me._map_1.ggMarkerInstances = [];
            me._map_1.ggSimpleFloorplanMarkerArray = [];
        }
        player.addListener('sizechanged', function () {
            me.updateSize(me.divSkin);
        });
        player.addListener('configloaded', function () {
            if (
                (
                    (player.getVariableValue('opt_autohide') == true)
                )
            ) {
                me._hide_timer.ggTimeout = Number("5") * 1000.0;
                me._hide_timer.ggTimestamp = skin.ggCurrentTime;
            }
            if (
                (
                    (player.getVariableValue('opt_zoom') == true)
                )
            ) {
                player.setVariableValue('pos_controller', player.getVariableValue('pos_controller') + Number("2"));
            }
            if (
                (
                    (player.getVariableValue('opt_autorotate') == true)
                )
            ) {
                player.setVariableValue('pos_controller', player.getVariableValue('pos_controller') + Number("1"));
            }
            if (
                (
                    (player.getVariableValue('opt_info') == true)
                )
            ) {
                player.setVariableValue('pos_controller', player.getVariableValue('pos_controller') + Number("1"));
            }
            if (
                (
                    (player.getVariableValue('opt_thumbnail') == true) &&
                    (player.getIsTour() == true)
                )
            ) {
                player.setVariableValue('pos_controller', player.getVariableValue('pos_controller') + Number("1"));
            }
            if (
                (
                    (player.getVariableValue('opt_projection') == true)
                )
            ) {
                player.setVariableValue('pos_controller', player.getVariableValue('pos_controller') + Number("1"));
            }
            if (
                (
                    (player.getVariableValue('opt_gyro') == true) &&
                    (player.getIsMobile() == true)
                )
            ) {
                player.setVariableValue('pos_controller', player.getVariableValue('pos_controller') + Number("1"));
            }
            if (
                (
                    (player.getVariableValue('opt_fullscreen') == true) &&
                    (player.getOS() != 4)
                )
            ) {
                player.setVariableValue('pos_controller', player.getVariableValue('pos_controller') + Number("1"));
            }
            if (
                (
                    (player.getVariableValue('opt_zoom') == true) &&
                    (player.getOS() != 4)
                )
            ) {
                player.setVariableValue('pos_fullscreen', player.getVariableValue('pos_fullscreen') + Number("2"));
            }
            if (
                (
                    (player.getVariableValue('opt_autorotate') == true) &&
                    (player.getOS() != 4)
                )
            ) {
                player.setVariableValue('pos_fullscreen', player.getVariableValue('pos_fullscreen') + Number("1"));
            }
            if (
                (
                    (player.getVariableValue('opt_info') == true) &&
                    (player.getOS() != 4)
                )
            ) {
                player.setVariableValue('pos_fullscreen', player.getVariableValue('pos_fullscreen') + Number("1"));
            }
            if (
                (
                    (player.getVariableValue('opt_thumbnail') == true) &&
                    (player.getIsTour() == true) &&
                    (player.getOS() != 4)
                )
            ) {
                player.setVariableValue('pos_fullscreen', player.getVariableValue('pos_fullscreen') + Number("1"));
            }
            if (
                (
                    (player.getVariableValue('opt_projection') == true) &&
                    (player.getOS() != 4)
                )
            ) {
                player.setVariableValue('pos_fullscreen', player.getVariableValue('pos_fullscreen') + Number("1"));
            }
            if (
                (
                    (player.getVariableValue('opt_gyro') == true) &&
                    (player.getIsMobile() == true) &&
                    (player.getOS() != 4)
                )
            ) {
                player.setVariableValue('pos_fullscreen', player.getVariableValue('pos_fullscreen') + Number("1"));
            }
            if (
                (
                    (player.getVariableValue('opt_zoom') == true) &&
                    (player.getIsMobile() == true)
                )
            ) {
                player.setVariableValue('pos_gyro', player.getVariableValue('pos_gyro') + Number("2"));
            }
            if (
                (
                    (player.getVariableValue('opt_autorotate') == true) &&
                    (player.getIsMobile() == true)
                )
            ) {
                player.setVariableValue('pos_gyro', player.getVariableValue('pos_gyro') + Number("1"));
            }
            if (
                (
                    (player.getVariableValue('opt_info') == true) &&
                    (player.getIsMobile() == true)
                )
            ) {
                player.setVariableValue('pos_gyro', player.getVariableValue('pos_gyro') + Number("1"));
            }
            if (
                (
                    (player.getVariableValue('opt_thumbnail') == true) &&
                    (player.getIsTour() == true) &&
                    (player.getIsMobile() == true)
                )
            ) {
                player.setVariableValue('pos_gyro', player.getVariableValue('pos_gyro') + Number("1"));
            }
            if (
                (
                    (player.getVariableValue('opt_projection') == true) &&
                    (player.getIsMobile() == true)
                )
            ) {
                player.setVariableValue('pos_gyro', player.getVariableValue('pos_gyro') + Number("1"));
            }
            if (
                (
                    (player.getVariableValue('opt_zoom') == true)
                )
            ) {
                player.setVariableValue('pos_projection', player.getVariableValue('pos_projection') + Number("2"));
            }
            if (
                (
                    (player.getVariableValue('opt_autorotate') == true)
                )
            ) {
                player.setVariableValue('pos_projection', player.getVariableValue('pos_projection') + Number("1"));
            }
            if (
                (
                    (player.getVariableValue('opt_info') == true)
                )
            ) {
                player.setVariableValue('pos_projection', player.getVariableValue('pos_projection') + Number("1"));
            }
            if (
                (
                    (player.getVariableValue('opt_thumbnail') == true) &&
                    (player.getIsTour() == true)
                )
            ) {
                player.setVariableValue('pos_projection', player.getVariableValue('pos_projection') + Number("1"));
            }
            if (
                (
                    (player.getVariableValue('opt_zoom') == true)
                )
            ) {
                player.setVariableValue('pos_thumbnail', player.getVariableValue('pos_thumbnail') + Number("2"));
            }
            if (
                (
                    (player.getVariableValue('opt_autorotate') == true)
                )
            ) {
                player.setVariableValue('pos_thumbnail', player.getVariableValue('pos_thumbnail') + Number("1"));
            }
            if (
                (
                    (player.getVariableValue('opt_info') == true)
                )
            ) {
                player.setVariableValue('pos_thumbnail', player.getVariableValue('pos_thumbnail') + Number("1"));
            }
            if (
                (
                    (player.getVariableValue('opt_zoom') == true)
                )
            ) {
                player.setVariableValue('pos_information', player.getVariableValue('pos_information') + Number("2"));
            }
            if (
                (
                    (player.getVariableValue('opt_autorotate') == true)
                )
            ) {
                player.setVariableValue('pos_information', player.getVariableValue('pos_information') + Number("1"));
            }
            if (
                (
                    (player.getVariableValue('opt_zoom') == true)
                )
            ) {
                player.setVariableValue('pos_autorotate', player.getVariableValue('pos_autorotate') + Number("2"));
            }
            me._thumbnail_cloner.ggUpdate();
            me._thumbnail_cloner_mobile.ggUpdate();
            me._map_1.ggInitMap(false);
            me._map_1.ggInitMapMarkers(true);
        });
        player.addListener('imagesready', function () {
            me._thumbnail_menu.ggUpdatePosition();
            me._thumbnail_menu_mobile.ggUpdatePosition();
            me._loading.style[domTransition] = 'none';
            me._loading.style.visibility = 'hidden';
            me._loading.ggVisible = false;
        });
        player.addListener('beforechangenode', function () {
            if (
                (
                    (player.getVariableValue('vis_loader') == true)
                )
            ) {
                me._loading.style[domTransition] = 'none';
                me._loading.style.visibility = (Number(me._loading.style.opacity) > 0 || !me._loading.style.opacity) ? 'inherit' : 'hidden';
                me._loading.ggVisible = true;
            }
        });
        player.addListener('tilesrequested', function () {
            player.setVariableValue('vis_loader', false);
        });
    };
    this.hotspotProxyClick = function (id, url) {
    }
    this.hotspotProxyDoubleClick = function (id, url) {
    }
    me.hotspotProxyOver = function (id, url) {
    }
    me.hotspotProxyOut = function (id, url) {
    }
    me.callChildLogicBlocksHotspot_ht_node_changenodeid = function () {
        if (hotspotTemplates['ht_node']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_node'].length; i++) {
                if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible) {
                    hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible();
                }
                if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_alpha) {
                    hotspotTemplates['ht_node'][i]._ht_node.logicBlock_alpha();
                }
                if (hotspotTemplates['ht_node'][i]._ht_node_visited && hotspotTemplates['ht_node'][i]._ht_node_visited.logicBlock_visible) {
                    hotspotTemplates['ht_node'][i]._ht_node_visited.logicBlock_visible();
                }
                if (hotspotTemplates['ht_node'][i]._ht_node_image && hotspotTemplates['ht_node'][i]._ht_node_image.logicBlock_visible) {
                    hotspotTemplates['ht_node'][i]._ht_node_image.logicBlock_visible();
                }
                if (hotspotTemplates['ht_node'][i]._hotspot_preview && hotspotTemplates['ht_node'][i]._hotspot_preview.logicBlock_visible) {
                    hotspotTemplates['ht_node'][i]._hotspot_preview.logicBlock_visible();
                }
                if (hotspotTemplates['ht_node'][i]._tt_ht_node && hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_visible) {
                    hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_visible();
                }
                if (hotspotTemplates['ht_node'][i]._ht_tooltip && hotspotTemplates['ht_node'][i]._ht_tooltip.logicBlock_visible) {
                    hotspotTemplates['ht_node'][i]._ht_tooltip.logicBlock_visible();
                }
                if (hotspotTemplates['ht_node'][i]._ht_checkmark_tick && hotspotTemplates['ht_node'][i]._ht_checkmark_tick.logicBlock_visible) {
                    hotspotTemplates['ht_node'][i]._ht_checkmark_tick.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_node_configloaded = function () {
        if (hotspotTemplates['ht_node']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_node'].length; i++) {
                if (hotspotTemplates['ht_node'][i]._hotspot_preview && hotspotTemplates['ht_node'][i]._hotspot_preview.logicBlock_visible) {
                    hotspotTemplates['ht_node'][i]._hotspot_preview.logicBlock_visible();
                }
                if (hotspotTemplates['ht_node'][i]._tt_ht_node && hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_position) {
                    hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_position();
                }
                if (hotspotTemplates['ht_node'][i]._tt_ht_node && hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_visible) {
                    hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_node_mouseover = function () {
        if (hotspotTemplates['ht_node']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_node'].length; i++) {
                if (hotspotTemplates['ht_node'][i]._hotspot_preview && hotspotTemplates['ht_node'][i]._hotspot_preview.logicBlock_visible) {
                    hotspotTemplates['ht_node'][i]._hotspot_preview.logicBlock_visible();
                }
                if (hotspotTemplates['ht_node'][i]._tt_ht_node && hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_visible) {
                    hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_node_active = function () {
        if (hotspotTemplates['ht_node']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_node'].length; i++) {
                if (hotspotTemplates['ht_node'][i]._ht_checkmark_tick && hotspotTemplates['ht_node'][i]._ht_checkmark_tick.logicBlock_visible) {
                    hotspotTemplates['ht_node'][i]._ht_checkmark_tick.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_userdata = function () {
        if (hotspotTemplates['ht_node']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_node'].length; i++) {
                if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible) {
                    hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_image_popup = function () {
        if (hotspotTemplates['ht_node']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_node'].length; i++) {
                if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible) {
                    hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_info_popup = function () {
        if (hotspotTemplates['ht_node']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_node'].length; i++) {
                if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible) {
                    hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_file = function () {
        if (hotspotTemplates['ht_node']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_node'].length; i++) {
                if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible) {
                    hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_url = function () {
        if (hotspotTemplates['ht_node']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_node'].length; i++) {
                if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible) {
                    hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_vimeo = function () {
        if (hotspotTemplates['ht_node']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_node'].length; i++) {
                if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible) {
                    hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_youtube = function () {
        if (hotspotTemplates['ht_node']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_node'].length; i++) {
                if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible) {
                    hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_website = function () {
        if (hotspotTemplates['ht_node']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_node'].length; i++) {
                if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible) {
                    hotspotTemplates['ht_node'][i]._ht_node.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_timer = function () {
        if (hotspotTemplates['ht_node']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_node'].length; i++) {
                if (hotspotTemplates['ht_node'][i]._ht_node.logicBlock_alpha) {
                    hotspotTemplates['ht_node'][i]._ht_node.logicBlock_alpha();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_node_varchanged_opt_hotspot_preview = function () {
        if (hotspotTemplates['ht_node']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_node'].length; i++) {
                if (hotspotTemplates['ht_node'][i]._hotspot_preview && hotspotTemplates['ht_node'][i]._hotspot_preview.logicBlock_visible) {
                    hotspotTemplates['ht_node'][i]._hotspot_preview.logicBlock_visible();
                }
                if (hotspotTemplates['ht_node'][i]._tt_ht_node && hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_visible) {
                    hotspotTemplates['ht_node'][i]._tt_ht_node.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_url_changenodeid = function () {
        if (hotspotTemplates['ht_url']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_url'].length; i++) {
                if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible) {
                    hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible();
                }
                if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_alpha) {
                    hotspotTemplates['ht_url'][i]._ht_url.logicBlock_alpha();
                }
                if (hotspotTemplates['ht_url'][i]._ht_url_image && hotspotTemplates['ht_url'][i]._ht_url_image.logicBlock_visible) {
                    hotspotTemplates['ht_url'][i]._ht_url_image.logicBlock_visible();
                }
                if (hotspotTemplates['ht_url'][i]._ht_url_image_newpage && hotspotTemplates['ht_url'][i]._ht_url_image_newpage.logicBlock_visible) {
                    hotspotTemplates['ht_url'][i]._ht_url_image_newpage.logicBlock_visible();
                }
                if (hotspotTemplates['ht_url'][i]._tt_ht_url && hotspotTemplates['ht_url'][i]._tt_ht_url.logicBlock_visible) {
                    hotspotTemplates['ht_url'][i]._tt_ht_url.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_url_configloaded = function () {
        if (hotspotTemplates['ht_url']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_url'].length; i++) {
                if (hotspotTemplates['ht_url'][i]._ht_url_image && hotspotTemplates['ht_url'][i]._ht_url_image.logicBlock_visible) {
                    hotspotTemplates['ht_url'][i]._ht_url_image.logicBlock_visible();
                }
                if (hotspotTemplates['ht_url'][i]._ht_url_image_newpage && hotspotTemplates['ht_url'][i]._ht_url_image_newpage.logicBlock_visible) {
                    hotspotTemplates['ht_url'][i]._ht_url_image_newpage.logicBlock_visible();
                }
                if (hotspotTemplates['ht_url'][i]._tt_ht_url && hotspotTemplates['ht_url'][i]._tt_ht_url.logicBlock_position) {
                    hotspotTemplates['ht_url'][i]._tt_ht_url.logicBlock_position();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_url_mouseover = function () {
        if (hotspotTemplates['ht_url']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_url'].length; i++) {
                if (hotspotTemplates['ht_url'][i]._tt_ht_url && hotspotTemplates['ht_url'][i]._tt_ht_url.logicBlock_visible) {
                    hotspotTemplates['ht_url'][i]._tt_ht_url.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_userdata = function () {
        if (hotspotTemplates['ht_url']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_url'].length; i++) {
                if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible) {
                    hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_image_popup = function () {
        if (hotspotTemplates['ht_url']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_url'].length; i++) {
                if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible) {
                    hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_info_popup = function () {
        if (hotspotTemplates['ht_url']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_url'].length; i++) {
                if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible) {
                    hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_file = function () {
        if (hotspotTemplates['ht_url']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_url'].length; i++) {
                if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible) {
                    hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_url = function () {
        if (hotspotTemplates['ht_url']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_url'].length; i++) {
                if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible) {
                    hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_vimeo = function () {
        if (hotspotTemplates['ht_url']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_url'].length; i++) {
                if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible) {
                    hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_youtube = function () {
        if (hotspotTemplates['ht_url']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_url'].length; i++) {
                if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible) {
                    hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_website = function () {
        if (hotspotTemplates['ht_url']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_url'].length; i++) {
                if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible) {
                    hotspotTemplates['ht_url'][i]._ht_url.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_timer = function () {
        if (hotspotTemplates['ht_url']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_url'].length; i++) {
                if (hotspotTemplates['ht_url'][i]._ht_url.logicBlock_alpha) {
                    hotspotTemplates['ht_url'][i]._ht_url.logicBlock_alpha();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_url_varchanged_opt_url = function () {
        if (hotspotTemplates['ht_url']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_url'].length; i++) {
                if (hotspotTemplates['ht_url'][i]._ht_url_image && hotspotTemplates['ht_url'][i]._ht_url_image.logicBlock_visible) {
                    hotspotTemplates['ht_url'][i]._ht_url_image.logicBlock_visible();
                }
                if (hotspotTemplates['ht_url'][i]._ht_url_image_newpage && hotspotTemplates['ht_url'][i]._ht_url_image_newpage.logicBlock_visible) {
                    hotspotTemplates['ht_url'][i]._ht_url_image_newpage.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_info_changenodeid = function () {
        if (hotspotTemplates['ht_info']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_info'].length; i++) {
                if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible) {
                    hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible();
                }
                if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_alpha) {
                    hotspotTemplates['ht_info'][i]._ht_info.logicBlock_alpha();
                }
                if (hotspotTemplates['ht_info'][i]._tt_information && hotspotTemplates['ht_info'][i]._tt_information.logicBlock_visible) {
                    hotspotTemplates['ht_info'][i]._tt_information.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_info_configloaded = function () {
        if (hotspotTemplates['ht_info']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_info'].length; i++) {
                if (hotspotTemplates['ht_info'][i]._tt_information && hotspotTemplates['ht_info'][i]._tt_information.logicBlock_position) {
                    hotspotTemplates['ht_info'][i]._tt_information.logicBlock_position();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_info_mouseover = function () {
        if (hotspotTemplates['ht_info']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_info'].length; i++) {
                if (hotspotTemplates['ht_info'][i]._tt_information && hotspotTemplates['ht_info'][i]._tt_information.logicBlock_visible) {
                    hotspotTemplates['ht_info'][i]._tt_information.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_userdata = function () {
        if (hotspotTemplates['ht_info']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_info'].length; i++) {
                if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible) {
                    hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_image_popup = function () {
        if (hotspotTemplates['ht_info']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_info'].length; i++) {
                if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible) {
                    hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_info_popup = function () {
        if (hotspotTemplates['ht_info']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_info'].length; i++) {
                if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible) {
                    hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_file = function () {
        if (hotspotTemplates['ht_info']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_info'].length; i++) {
                if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible) {
                    hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_url = function () {
        if (hotspotTemplates['ht_info']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_info'].length; i++) {
                if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible) {
                    hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_vimeo = function () {
        if (hotspotTemplates['ht_info']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_info'].length; i++) {
                if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible) {
                    hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_youtube = function () {
        if (hotspotTemplates['ht_info']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_info'].length; i++) {
                if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible) {
                    hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_website = function () {
        if (hotspotTemplates['ht_info']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_info'].length; i++) {
                if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible) {
                    hotspotTemplates['ht_info'][i]._ht_info.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_timer = function () {
        if (hotspotTemplates['ht_info']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_info'].length; i++) {
                if (hotspotTemplates['ht_info'][i]._ht_info.logicBlock_alpha) {
                    hotspotTemplates['ht_info'][i]._ht_info.logicBlock_alpha();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_image_changenodeid = function () {
        if (hotspotTemplates['ht_image']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_image'].length; i++) {
                if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible) {
                    hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible();
                }
                if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_alpha) {
                    hotspotTemplates['ht_image'][i]._ht_image.logicBlock_alpha();
                }
                if (hotspotTemplates['ht_image'][i]._tt_ht_image && hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_visible) {
                    hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_image_configloaded = function () {
        if (hotspotTemplates['ht_image']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_image'].length; i++) {
                if (hotspotTemplates['ht_image'][i]._tt_ht_image && hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_position) {
                    hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_position();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_image_mouseover = function () {
        if (hotspotTemplates['ht_image']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_image'].length; i++) {
                if (hotspotTemplates['ht_image'][i]._tt_ht_image && hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_visible) {
                    hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_userdata = function () {
        if (hotspotTemplates['ht_image']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_image'].length; i++) {
                if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible) {
                    hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_image_popup = function () {
        if (hotspotTemplates['ht_image']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_image'].length; i++) {
                if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible) {
                    hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_info_popup = function () {
        if (hotspotTemplates['ht_image']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_image'].length; i++) {
                if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible) {
                    hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_file = function () {
        if (hotspotTemplates['ht_image']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_image'].length; i++) {
                if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible) {
                    hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_url = function () {
        if (hotspotTemplates['ht_image']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_image'].length; i++) {
                if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible) {
                    hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_vimeo = function () {
        if (hotspotTemplates['ht_image']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_image'].length; i++) {
                if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible) {
                    hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_youtube = function () {
        if (hotspotTemplates['ht_image']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_image'].length; i++) {
                if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible) {
                    hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_website = function () {
        if (hotspotTemplates['ht_image']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_image'].length; i++) {
                if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible) {
                    hotspotTemplates['ht_image'][i]._ht_image.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_timer = function () {
        if (hotspotTemplates['ht_image']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_image'].length; i++) {
                if (hotspotTemplates['ht_image'][i]._ht_image.logicBlock_alpha) {
                    hotspotTemplates['ht_image'][i]._ht_image.logicBlock_alpha();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_file_changenodeid = function () {
        if (hotspotTemplates['ht_video_file']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
                if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible) {
                    hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible();
                }
                if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_alpha) {
                    hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_alpha();
                }
                if (hotspotTemplates['ht_video_file'][i]._tt_ht_video_file && hotspotTemplates['ht_video_file'][i]._tt_ht_video_file.logicBlock_visible) {
                    hotspotTemplates['ht_video_file'][i]._tt_ht_video_file.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_file_configloaded = function () {
        if (hotspotTemplates['ht_video_file']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
                if (hotspotTemplates['ht_video_file'][i]._tt_ht_video_file && hotspotTemplates['ht_video_file'][i]._tt_ht_video_file.logicBlock_position) {
                    hotspotTemplates['ht_video_file'][i]._tt_ht_video_file.logicBlock_position();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_file_mouseover = function () {
        if (hotspotTemplates['ht_video_file']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
                if (hotspotTemplates['ht_video_file'][i]._tt_ht_video_file && hotspotTemplates['ht_video_file'][i]._tt_ht_video_file.logicBlock_visible) {
                    hotspotTemplates['ht_video_file'][i]._tt_ht_video_file.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_userdata = function () {
        if (hotspotTemplates['ht_video_file']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
                if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible) {
                    hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_image_popup = function () {
        if (hotspotTemplates['ht_video_file']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
                if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible) {
                    hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_info_popup = function () {
        if (hotspotTemplates['ht_video_file']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
                if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible) {
                    hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_file = function () {
        if (hotspotTemplates['ht_video_file']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
                if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible) {
                    hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_url = function () {
        if (hotspotTemplates['ht_video_file']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
                if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible) {
                    hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_vimeo = function () {
        if (hotspotTemplates['ht_video_file']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
                if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible) {
                    hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_youtube = function () {
        if (hotspotTemplates['ht_video_file']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
                if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible) {
                    hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_website = function () {
        if (hotspotTemplates['ht_video_file']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
                if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible) {
                    hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_timer = function () {
        if (hotspotTemplates['ht_video_file']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
                if (hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_alpha) {
                    hotspotTemplates['ht_video_file'][i]._ht_video_file.logicBlock_alpha();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_url_changenodeid = function () {
        if (hotspotTemplates['ht_video_url']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
                if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible) {
                    hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible();
                }
                if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_alpha) {
                    hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_alpha();
                }
                if (hotspotTemplates['ht_video_url'][i]._tt_ht_video_url && hotspotTemplates['ht_video_url'][i]._tt_ht_video_url.logicBlock_visible) {
                    hotspotTemplates['ht_video_url'][i]._tt_ht_video_url.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_url_configloaded = function () {
        if (hotspotTemplates['ht_video_url']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
                if (hotspotTemplates['ht_video_url'][i]._tt_ht_video_url && hotspotTemplates['ht_video_url'][i]._tt_ht_video_url.logicBlock_position) {
                    hotspotTemplates['ht_video_url'][i]._tt_ht_video_url.logicBlock_position();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_url_mouseover = function () {
        if (hotspotTemplates['ht_video_url']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
                if (hotspotTemplates['ht_video_url'][i]._tt_ht_video_url && hotspotTemplates['ht_video_url'][i]._tt_ht_video_url.logicBlock_visible) {
                    hotspotTemplates['ht_video_url'][i]._tt_ht_video_url.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_userdata = function () {
        if (hotspotTemplates['ht_video_url']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
                if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible) {
                    hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_image_popup = function () {
        if (hotspotTemplates['ht_video_url']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
                if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible) {
                    hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_info_popup = function () {
        if (hotspotTemplates['ht_video_url']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
                if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible) {
                    hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_file = function () {
        if (hotspotTemplates['ht_video_url']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
                if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible) {
                    hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_url = function () {
        if (hotspotTemplates['ht_video_url']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
                if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible) {
                    hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_vimeo = function () {
        if (hotspotTemplates['ht_video_url']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
                if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible) {
                    hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_youtube = function () {
        if (hotspotTemplates['ht_video_url']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
                if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible) {
                    hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_website = function () {
        if (hotspotTemplates['ht_video_url']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
                if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible) {
                    hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_timer = function () {
        if (hotspotTemplates['ht_video_url']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
                if (hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_alpha) {
                    hotspotTemplates['ht_video_url'][i]._ht_video_url.logicBlock_alpha();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_vimeo_changenodeid = function () {
        if (hotspotTemplates['ht_video_vimeo']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
                if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible) {
                    hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible();
                }
                if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_alpha) {
                    hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_alpha();
                }
                if (hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo && hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo.logicBlock_visible) {
                    hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_vimeo_configloaded = function () {
        if (hotspotTemplates['ht_video_vimeo']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
                if (hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo && hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo.logicBlock_position) {
                    hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo.logicBlock_position();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_vimeo_mouseover = function () {
        if (hotspotTemplates['ht_video_vimeo']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
                if (hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo && hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo.logicBlock_visible) {
                    hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_userdata = function () {
        if (hotspotTemplates['ht_video_vimeo']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
                if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible) {
                    hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_image_popup = function () {
        if (hotspotTemplates['ht_video_vimeo']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
                if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible) {
                    hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_info_popup = function () {
        if (hotspotTemplates['ht_video_vimeo']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
                if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible) {
                    hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_file = function () {
        if (hotspotTemplates['ht_video_vimeo']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
                if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible) {
                    hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_url = function () {
        if (hotspotTemplates['ht_video_vimeo']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
                if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible) {
                    hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_vimeo = function () {
        if (hotspotTemplates['ht_video_vimeo']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
                if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible) {
                    hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_youtube = function () {
        if (hotspotTemplates['ht_video_vimeo']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
                if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible) {
                    hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_website = function () {
        if (hotspotTemplates['ht_video_vimeo']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
                if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible) {
                    hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_timer = function () {
        if (hotspotTemplates['ht_video_vimeo']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
                if (hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_alpha) {
                    hotspotTemplates['ht_video_vimeo'][i]._ht_video_vimeo.logicBlock_alpha();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_youtube_changenodeid = function () {
        if (hotspotTemplates['ht_video_youtube']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
                if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible) {
                    hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible();
                }
                if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_alpha) {
                    hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_alpha();
                }
                if (hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube && hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube.logicBlock_visible) {
                    hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_youtube_configloaded = function () {
        if (hotspotTemplates['ht_video_youtube']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
                if (hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube && hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube.logicBlock_position) {
                    hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube.logicBlock_position();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_youtube_mouseover = function () {
        if (hotspotTemplates['ht_video_youtube']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
                if (hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube && hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube.logicBlock_visible) {
                    hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_userdata = function () {
        if (hotspotTemplates['ht_video_youtube']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
                if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible) {
                    hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_image_popup = function () {
        if (hotspotTemplates['ht_video_youtube']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
                if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible) {
                    hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_info_popup = function () {
        if (hotspotTemplates['ht_video_youtube']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
                if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible) {
                    hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_file = function () {
        if (hotspotTemplates['ht_video_youtube']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
                if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible) {
                    hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_url = function () {
        if (hotspotTemplates['ht_video_youtube']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
                if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible) {
                    hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_vimeo = function () {
        if (hotspotTemplates['ht_video_youtube']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
                if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible) {
                    hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_youtube = function () {
        if (hotspotTemplates['ht_video_youtube']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
                if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible) {
                    hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_website = function () {
        if (hotspotTemplates['ht_video_youtube']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
                if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible) {
                    hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_visible();
                }
            }
        }
    }
    me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_timer = function () {
        if (hotspotTemplates['ht_video_youtube']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
                if (hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_alpha) {
                    hotspotTemplates['ht_video_youtube'][i]._ht_video_youtube.logicBlock_alpha();
                }
            }
        }
    }
    player.addListener('changenodeid', function () {
        me.ggUserdata = player.userdata;
    });
    me.skinTimerEvent = function () {
        me.ggCurrentTime = new Date().getTime();
        if (me._hide_timer.ggLastIsActive != me._hide_timer.ggIsActive()) {
            me._hide_timer.ggLastIsActive = me._hide_timer.ggIsActive();
            if (me._hide_timer.ggLastIsActive) {
                if (player.transitionsDisabled) {
                    me._controller.style[domTransition] = 'none';
                } else {
                    me._controller.style[domTransition] = 'all 500ms ease-out 0ms';
                }
                me._controller.style.opacity = '1';
                me._controller.style.visibility = me._controller.ggVisible ? 'inherit' : 'hidden';
                if (player.transitionsDisabled) {
                    me._menu_button.style[domTransition] = 'none';
                } else {
                    me._menu_button.style[domTransition] = 'all 500ms ease-out 0ms';
                }
                me._menu_button.style.opacity = '0';
                me._menu_button.style.visibility = 'hidden';
                player.setVariableValue('vis_thumbnail_menu_auto_hide', true);
            } else {
                if (player.transitionsDisabled) {
                    me._menu_button.style[domTransition] = 'none';
                } else {
                    me._menu_button.style[domTransition] = 'all 500ms ease-out 0ms';
                }
                me._menu_button.style.opacity = '1';
                me._menu_button.style.visibility = me._menu_button.ggVisible ? 'inherit' : 'hidden';
                if (player.transitionsDisabled) {
                    me._controller.style[domTransition] = 'none';
                } else {
                    me._controller.style[domTransition] = 'all 500ms ease-out 0ms';
                }
                me._controller.style.opacity = '0';
                me._controller.style.visibility = 'hidden';
                player.setVariableValue('vis_thumbnail_menu_auto_hide', false);
            }
        }
        if (me.elementMouseOver['controller']) {
            if (
                (
                    (player.getVariableValue('opt_autohide') == true)
                )
            ) {
                me._hide_timer.ggTimeout = Number("5") * 1000.0;
                me._hide_timer.ggTimestamp = skin.ggCurrentTime;
            }
        }
        if (me.elementMouseDown['zoomout']) {
            player.changeFovLog(0.5, true);
        }
        if (me.elementMouseDown['zoomin']) {
            player.changeFovLog(-0.5, true);
        }
        if (me._element_alpha_timer.ggLastIsActive != me._element_alpha_timer.ggIsActive()) {
            me._element_alpha_timer.ggLastIsActive = me._element_alpha_timer.ggIsActive();
            if (me._element_alpha_timer.ggLastIsActive) {
            } else {
                player.setVariableValue('vis_timer', true);
            }
        }
        if (me.elementMouseOver['thumbnail_cloner']) {
            if (
                (
                    (player.getVariableValue('opt_autohide') == true)
                )
            ) {
                me._hide_timer.ggTimeout = Number("5") * 1000.0;
                me._hide_timer.ggTimestamp = skin.ggCurrentTime;
            }
        }
        if (me.elementMouseOver['thumbnail_cloner_mobile']) {
            if (
                (
                    (player.getVariableValue('opt_autohide') == true)
                )
            ) {
                me._hide_timer.ggTimeout = Number("5") * 1000.0;
                me._hide_timer.ggTimestamp = skin.ggCurrentTime;
            }
        }
        me._userdata_title.ggUpdateText();
        me._userdata_description.ggUpdateText();
        me._userdata_author.ggUpdateText();
        me._userdata_datetime.ggUpdateText();
        me._userdata_copyright.ggUpdateText();
        me._info_text_body.ggUpdateText();
        me._info_title.ggUpdateText();
        if (me.__360image_gyro.ggLastIsActive != me.__360image_gyro.ggIsActive()) {
            me.__360image_gyro.ggLastIsActive = me.__360image_gyro.ggIsActive();
            if (me.__360image_gyro.ggLastIsActive) {
            } else {
                player.setVariableValue('vis_360image_once', false);
            }
        }
        me.__360image_gyro.ggUpdateConditionTimer();
        if (me.__360image_timer.ggLastIsActive != me.__360image_timer.ggIsActive()) {
            me.__360image_timer.ggLastIsActive = me.__360image_timer.ggIsActive();
            if (me.__360image_timer.ggLastIsActive) {
                player.setVariableValue('pos_360image', player.getVariableValue('pos_360image') + Number("1"));
                player.setVariableValue('pos_360image', player.getVariableValue('pos_360image') % Number("5"));
            } else {
            }
        }
        me._loadingtext.ggUpdateText();
        var hs = '';
        if (me._loadingbar.ggParameter) {
            hs += parameterToTransform(me._loadingbar.ggParameter) + ' ';
        }
        hs += 'scale(' + (1 * player.getPercentLoaded() + 0) + ',1.0) ';
        me._loadingbar.style[domTransform] = hs;
        me._map_1.ggUpdateConditionTimer();
    };
    player.addListener('timer', me.skinTimerEvent);

    function SkinHotspotClass_ht_node(parentScope, hotspot) {
        var me = this;
        var flag = false;
        var hs = '';
        me.parentScope = parentScope;
        me.hotspot = hotspot;
        var nodeId = String(hotspot.url);
        nodeId = (nodeId.charAt(0) == '{') ? nodeId.substr(1, nodeId.length - 2) : '';
        me.ggUserdata = skin.player.getNodeUserdata(nodeId);
        me.elementMouseDown = [];
        me.elementMouseOver = [];
        me.findElements = function (id, regex) {
            return skin.findElements(id, regex);
        }
        el = me._ht_node = document.createElement('div');
        el.ggId = "ht_node";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_hotspot ";
        el.ggType = 'hotspot';
        hs = '';
        hs += 'height : 0px;';
        hs += 'left : 100px;';
        hs += 'opacity : 0;';
        hs += 'position : absolute;';
        hs += 'top : 140px;';
        hs += 'visibility : hidden;';
        hs += 'width : 0px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._ht_node.ggIsActive = function () {
            return player.getCurrentNode() == this.ggElementNodeId();
        }
        el.ggElementNodeId = function () {
            return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
        }
        me._ht_node.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('vis_userdata') == true) ||
                (player.getVariableValue('vis_image_popup') == true) ||
                (player.getVariableValue('vis_info_popup') == true) ||
                (player.getVariableValue('vis_video_popup_file') == true) ||
                (player.getVariableValue('vis_video_popup_url') == true) ||
                (player.getVariableValue('vis_video_popup_vimeo') == true) ||
                (player.getVariableValue('vis_video_popup_youtube') == true) ||
                (player.getVariableValue('vis_website') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._ht_node.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._ht_node.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._ht_node.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._ht_node.ggCurrentLogicStateVisible == 0) {
                    me._ht_node.style.visibility = "hidden";
                    me._ht_node.ggVisible = false;
                } else {
                    me._ht_node.style.visibility = (Number(me._ht_node.style.opacity) > 0 || !me._ht_node.style.opacity) ? 'inherit' : 'hidden';
                    me._ht_node.ggVisible = true;
                }
            }
        }
        me._ht_node.logicBlock_alpha = function () {
            var newLogicStateAlpha;
            if (
                (player.getVariableValue('vis_timer') == true)
            ) {
                newLogicStateAlpha = 0;
            } else {
                newLogicStateAlpha = -1;
            }
            if (me._ht_node.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
                me._ht_node.ggCurrentLogicStateAlpha = newLogicStateAlpha;
                me._ht_node.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._ht_node.ggCurrentLogicStateAlpha == 0) {
                    me._ht_node.style.visibility = me._ht_node.ggVisible ? 'inherit' : 'hidden';
                    me._ht_node.style.opacity = 1;
                } else {
                    me._ht_node.style.visibility = "hidden";
                    me._ht_node.style.opacity = 0;
                }
            }
        }
        me._ht_node.onclick = function (e) {
            player.openNext(me.hotspot.url, me.hotspot.target);
            skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
        }
        me._ht_node.ondblclick = function (e) {
            skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
        }
        me._ht_node.onmouseover = function (e) {
            player.setActiveHotspot(me.hotspot);
            me.elementMouseOver['ht_node'] = true;
            me._hotspot_preview.logicBlock_visible();
            me._tt_ht_node.logicBlock_visible();
            skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
        }
        me._ht_node.onmouseout = function (e) {
            player.setActiveHotspot(null);
            me.elementMouseOver['ht_node'] = false;
            me._hotspot_preview.logicBlock_visible();
            me._tt_ht_node.logicBlock_visible();
            skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
        }
        me._ht_node.ontouchend = function (e) {
            me.elementMouseOver['ht_node'] = false;
            me._hotspot_preview.logicBlock_visible();
            me._tt_ht_node.logicBlock_visible();
        }
        me._ht_node.ggUpdatePosition = function (useTransition) {
        }
        el = me._ht_node_visited = document.createElement('div');
        els = me._ht_node_visited__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE3NSwzNDFjLTMxLDAtNTYuMSwyNS4xLTU2LjEsNTYuMWMwLDMxLDI1LjEsNTYuMSw1Ni4xLDU2LjFzNTYuMS0yNS4xLDU2LjEtNTYuMQ0KCQlDLTExOC45LDM2Ni4xLTE0NCwzNDEtMTc1LDM0MXogTS0xNjcuOSwzNjYuNmMwLjUtMC41LDEuNC0wLjUsMiwwbDEuMiwxLjJjMC41LDAuNSwwLjUsMS40LDAsMmwtMjUuMywyNS4zYy0wLjUsMC41LTEuNywxLjUtMiwxLjUNCgkJYy0wLjMsMC4xLTAuOCwwLjEtMS4xLDBjLTAuMy0wLjEtMS40LTEtMi0xLjVsLTcuOC03LjhjLTAuNS0wLjUtMC41LTEuNCwwLTJsMS4yLTEu' +
            'MmMwLjUtMC41LDEuNC0wLjUsMiwwbDcuMiw3LjJMLTE2Ny45LDM2Ni42eg0KCQkgTS0xNTQuOSwzOTRjMC4zLTAuMywwLjYtMC40LDEtMC40YzAuNCwwLDAuNywwLjEsMSwwLjRsOC43LDguNXYxMS40Yy03LjYtMi43LTE2LjctNC4zLTI2LjMtNC43TC0xNTQuOSwzOTR6IE0tMTU0LjYsMzgzDQoJCWMyLjMtMC40LDQuNCwwLjYsNC43LDIuM2MwLjMsMS43LTEuMywzLjQtMy41LDMuOWMtMi4zLDAuNC00LjQtMC42LTQuNy0yLjNDLTE1OC40LDM4NS4yLTE1Ni45LDM4My41LTE1NC42LDM4M3ogTS0xNzMsNDA5LjINCgkJYy0wLjcsMC0xLjMsMC0yLDBjLTExLjEsMC0yMiwxLjctMzAuOCw0Ljh2LT' +
            'YuN2M4LjUtMS40LDE5LjQtMi4zLDMwLjgtMi4zYzIuMSwwLDQuMSwwLDYuMiwwLjFMLTE3Myw0MDkuMnogTS0xNjcsNDAzLjQNCgkJYy0yLjYtMC4xLTUuMy0wLjEtOC0wLjFjLTUuNCwwLTEwLjcsMC4yLTE1LjcsMC41bDE0LjItMTMuOWMwLjktMC45LDIuNC0wLjksMy4zLDBsMTAsOS43TC0xNjcsNDAzLjR6IE0tMTM3LjksNDIwDQoJCWMwLDAuOC0wLjQsMS41LTEuMSwxLjljLTAuNywwLjQtMS41LDAuNS0yLjIsMC4xYy04LjctNC4yLTIxLTYuNi0zMy44LTYuNnMtMjUuMiwyLjQtMzMuOCw2LjZjLTAuMywwLjItMC42LDAuMi0xLDAuMg0KCQljLTAuNCwwLTAuOC0wLjEtMS4yLTAuM2MtMC43' +
            'LTAuNC0xLjEtMS4xLTEuMS0xLjl2LTQ1LjhjMC0wLjgsMC40LTEuNSwxLjEtMS45YzAuNy0wLjQsMS41LTAuNSwyLjItMC4xYzcsMy40LDE2LjQsNS42LDI2LjUsNi4zDQoJCWwtNC4xLDQuMWMtNy44LTAuOS0xNS4xLTIuNi0yMS4xLTV2MzguOWM4LjktMy42LDIwLjYtNS42LDMyLjYtNS42YzEyLDAsMjMuNiwyLDMyLjYsNS42di0zOC45Yy04LjksMy42LTIwLjYsNS42LTMyLjYsNS42DQoJCWMtMC4yLDAtMC41LDAtMC43LDBsNC42LTQuNmMxMS40LTAuNCwyMi4yLTIuNywzMC02LjVjMC43LTAuMywxLjUtMC4zLDIuMiwwLjFjMC43LDAuNCwxLjEsMS4xLDEuMSwxLjlMLTEzNy45LDQyMEwtMT' +
            'M3LjksNDIweiIvPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KCTxnPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTE3Ni41LDM4OS45bC0xNC4yLDEzLjljNS0wLjMsMTAuMy0wLjUsMTUuNy0wLjVjMi43LDAsNS4zLDAsOCwwLjFsMy44LTMuN2wtMTAtOS43DQoJCQlDLTE3NC4xLDM4OS0xNzUuNiwzODktMTc2LjUsMzg5Ljl6Ii8+DQoJCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMjA1LjgsNDA3LjN2Ni43YzguOC0zLjEsMTkuNi00LjgsMzAuOC00LjhjMC43LDAsMS4zLDAsMiwwbDQuMi00LjFjLTItMC4xLTQuMS0wLjEtNi4yLTAuMQ0KCQkJQy0xODYuMyw0MDUtMTk3LjMsNDA1' +
            'LjgtMjA1LjgsNDA3LjN6Ii8+DQoJCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTQ0LjIsNDEzLjl2LTExLjRsLTguNy04LjVjLTAuMy0wLjMtMC42LTAuNC0xLTAuNGMtMC40LDAtMC43LDAuMS0xLDAuNGwtMTUuNiwxNS4yDQoJCQlDLTE2MC45LDQwOS42LTE1MS44LDQxMS4zLTE0NC4yLDQxMy45eiIvPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTE1My40LDM4OS4yYzIuMy0wLjQsMy45LTIuMiwzLjUtMy45Yy0wLjMtMS43LTIuNC0yLjctNC43LTIuM2MtMi4zLDAuNC0zLjksMi4yLTMuNSwzLjkNCgkJCUMtMTU3LjgsMzg4LjYtMTU1LjcsMzg5LjYtMTUzLjQsMzg5LjJ6Ii8+DQ' +
            'oJCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTk5LjgsMzg0LjJjLTAuNS0wLjUtMS40LTAuNS0yLDBsLTEuMiwxLjJjLTAuNSwwLjUtMC41LDEuNCwwLDJsNy44LDcuOGMwLjUsMC41LDEuNywxLjUsMiwxLjUNCgkJCWMwLjMsMC4xLDAuOCwwLjEsMS4xLDBjMC4zLTAuMSwxLjQtMSwyLTEuNWwyNS4zLTI1LjNjMC41LTAuNSwwLjUtMS40LDAtMmwtMS4yLTEuMmMtMC41LTAuNS0xLjQtMC41LTIsMGwtMjQuNywyNC43DQoJCQlMLTE5OS44LDM4NC4yeiIvPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTEzOSwzNzIuM2MtMC43LTAuNC0xLjUtMC41LTIuMi0wLjFjLTcuOCwzLjgtMTgu' +
            'Niw2LjEtMzAsNi41bC00LjYsNC42YzAuMiwwLDAuNSwwLDAuNywwDQoJCQljMTIsMCwyMy42LTIsMzIuNi01LjZ2MzguOWMtOC45LTMuNi0yMC42LTUuNi0zMi42LTUuNnMtMjMuNiwyLTMyLjYsNS42di0zOC45YzYsMi40LDEzLjMsNC4xLDIxLjEsNWw0LjEtNC4xDQoJCQljLTEwLjEtMC43LTE5LjUtMi45LTI2LjUtNi4zYy0wLjctMC4zLTEuNS0wLjMtMi4yLDAuMWMtMC43LDAuNC0xLjEsMS4xLTEuMSwxLjlWNDIwYzAsMC44LDAuNCwxLjUsMS4xLDEuOQ0KCQkJYzAuNCwwLjIsMC44LDAuMywxLjIsMC4zYzAuMywwLDAuNy0wLjEsMS0wLjJjOC43LTQuMiwyMS02LjYsMzMuOC02LjZjMTIuOC' +
            'wwLDI1LjIsMi40LDMzLjgsNi42YzAuNywwLjMsMS41LDAuMywyLjItMC4xDQoJCQljMC43LTAuNCwxLjEtMS4xLDEuMS0xLjl2LTQ1LjhDLTEzNy45LDM3My40LTEzOC4zLDM3Mi43LTEzOSwzNzIuM3oiLz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==';
        me._ht_node_visited__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;ht_node_visited;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._ht_node_visited__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE3NSwzMzQuN2MtMzQuNCwwLTYyLjQsMjcuOS02Mi40LDYyLjRjMCwzNC40LDI3LjksNjIuNCw2Mi40LDYyLjRzNjIuNC0yNy45LDYyLjQtNjIuNA0KCQlDLTExMi42LDM2Mi43LTE0MC42LDMzNC43LTE3NSwzMzQuN3ogTS0xNjcuMSwzNjMuMmMwLjYtMC42LDEuNi0wLjYsMi4yLDBsMS4zLDEuM2MwLjYsMC42LDAuNiwxLjYsMCwyLjJsLTI4LjIsMjguMg0KCQljLTAuNiwwLjYtMS45LDEuNi0yLjIsMS43Yy0wLjMsMC4xLTAuOSwwLjEtMS4zLDBjLTAuMy0wLjEtMS42LTEuMS0yLjItMS43bC04LjYtOC42Yy0wLjYt' +
            'MC42LTAuNi0xLjYsMC0yLjJsMS4zLTEuMw0KCQljMC42LTAuNiwxLjYtMC42LDIuMiwwbDgsOEwtMTY3LjEsMzYzLjJ6IE0tMTUyLjcsMzkzLjdjMC4zLTAuMywwLjctMC41LDEuMS0wLjVzMC44LDAuMiwxLjEsMC40bDkuNiw5LjR2MTIuNw0KCQljLTguNC0zLTE4LjYtNC44LTI5LjItNS4yTC0xNTIuNywzOTMuN3ogTS0xNTIuMywzODEuNWMyLjUtMC41LDQuOSwwLjYsNS4zLDIuNWMwLjQsMS45LTEuNCwzLjgtMy45LDQuM2MtMi41LDAuNS00LjktMC42LTUuMy0yLjUNCgkJQy0xNTYuNiwzODMuOS0xNTQuOCwzODItMTUyLjMsMzgxLjV6IE0tMTcyLjgsNDEwLjVjLTAuNywwLTEuNSwwLTIuMi' +
            'wwYy0xMi40LDAtMjQuNSwxLjktMzQuMiw1LjN2LTcuNGM5LjQtMS42LDIxLjYtMi41LDM0LjItMi41DQoJCWMyLjMsMCw0LjYsMCw2LjksMC4xTC0xNzIuOCw0MTAuNXogTS0xNjYuMiw0MDQuMWMtMi45LTAuMS01LjktMC4yLTguOC0wLjJjLTYsMC0xMS44LDAuMi0xNy40LDAuNmwxNS44LTE1LjRjMS0xLDIuNi0xLDMuNywwDQoJCWwxMS4xLDEwLjhMLTE2Ni4yLDQwNC4xeiBNLTEzMy44LDQyMi41YzAsMC45LTAuNCwxLjctMS4yLDIuMWMtMC43LDAuNS0xLjYsMC41LTIuNCwwLjFjLTkuNi00LjYtMjMuMy03LjMtMzcuNi03LjMNCgkJcy0yOCwyLjctMzcuNiw3LjNjLTAuMywwLjItMC43LDAu' +
            'Mi0xLjEsMC4yYy0wLjUsMC0wLjktMC4xLTEuMy0wLjRjLTAuNy0wLjUtMS4yLTEuMy0xLjItMi4xdi01MC45YzAtMC45LDAuNC0xLjcsMS4yLTIuMQ0KCQljMC43LTAuNSwxLjYtMC41LDIuNC0wLjFjNy44LDMuOCwxOC4yLDYuMiwyOS40LDdsLTQuNiw0LjZjLTguNi0wLjktMTYuNy0yLjgtMjMuNC01LjV2NDMuMmM5LjktNCwyMi45LTYuMiwzNi4yLTYuMg0KCQlzMjYuMywyLjIsMzYuMiw2LjJ2LTQzLjJjLTkuOSw0LTIyLjksNi4yLTM2LjIsNi4yYy0wLjMsMC0wLjUsMC0wLjgsMGw1LjEtNS4xYzEyLjctMC41LDI0LjctMywzMy4zLTcuMmMwLjgtMC40LDEuNy0wLjMsMi40LDAuMQ0KCQljMC' +
            '43LDAuNSwxLjIsMS4zLDEuMiwyLjFMLTEzMy44LDQyMi41TC0xMzMuOCw0MjIuNXoiLz4NCjwvZz4NCjxnIGlkPSJMYXllcl8yIj4NCgk8Zz4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xNzYuNiwzODkuMWwtMTUuOCwxNS40YzUuNi0wLjQsMTEuNC0wLjYsMTcuNC0wLjZjMywwLDUuOSwwLjEsOC44LDAuMmw0LjItNC4xbC0xMS4xLTEwLjgNCgkJCUMtMTc0LDM4OC4xLTE3NS42LDM4OC4xLTE3Ni42LDM4OS4xeiIvPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTIwOS4yLDQwOC40djcuNGM5LjctMy40LDIxLjgtNS4zLDM0LjItNS4zYzAuNywwLDEuNSwwLDIuMiwwbDQuNi00' +
            'LjVjLTIuMy0wLjEtNC42LTAuMS02LjktMC4xDQoJCQlDLTE4Ny42LDQwNS45LTE5OS43LDQwNi44LTIwOS4yLDQwOC40eiIvPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTE0MC44LDQxNS44di0xMi43bC05LjYtOS40Yy0wLjMtMC4zLTAuNy0wLjQtMS4xLTAuNGMtMC40LDAtMC44LDAuMi0xLjEsMC41bC0xNy4zLDE2LjkNCgkJCUMtMTU5LjQsNDExLTE0OS4yLDQxMi45LTE0MC44LDQxNS44eiIvPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTE1MSwzODguM2MyLjUtMC41LDQuMy0yLjQsMy45LTQuM2MtMC40LTEuOS0yLjctMy01LjMtMi41Yy0yLjUsMC41LTQuMywyLjQtMy' +
            '45LDQuMw0KCQkJQy0xNTUuOSwzODcuNy0xNTMuNSwzODguOC0xNTEsMzg4LjN6Ii8+DQoJCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMjAyLjYsMzgyLjdjLTAuNi0wLjYtMS42LTAuNi0yLjIsMGwtMS4zLDEuM2MtMC42LDAuNi0wLjYsMS42LDAsMi4ybDguNiw4LjZjMC42LDAuNiwxLjksMS42LDIuMiwxLjcNCgkJCWMwLjMsMC4xLDAuOSwwLjEsMS4zLDBjMC4zLTAuMSwxLjYtMS4xLDIuMi0xLjdsMjguMi0yOC4yYzAuNi0wLjYsMC42LTEuNiwwLTIuMmwtMS4zLTEuM2MtMC42LTAuNi0xLjYtMC42LTIuMiwwbC0yNy41LDI3LjUNCgkJCUwtMjAyLjYsMzgyLjd6Ii8+DQoJCTxwYXRoIGZp' +
            'bGw9IiNGRkZGRkYiIGQ9Ik0tMTM1LDM2OS41Yy0wLjctMC41LTEuNi0wLjUtMi40LTAuMWMtOC43LDQuMi0yMC42LDYuNy0zMy4zLDcuMmwtNS4xLDUuMWMwLjMsMCwwLjUsMCwwLjgsMA0KCQkJYzEzLjMsMCwyNi4zLTIuMiwzNi4yLTYuMnY0My4yYy05LjktNC0yMi45LTYuMi0zNi4yLTYuMnMtMjYuMywyLjItMzYuMiw2LjJ2LTQzLjJjNi43LDIuNywxNC44LDQuNiwyMy40LDUuNWw0LjYtNC42DQoJCQljLTExLjItMC44LTIxLjctMy4zLTI5LjQtN2MtMC44LTAuNC0xLjctMC4zLTIuNCwwLjFjLTAuNywwLjUtMS4yLDEuMy0xLjIsMi4xdjUwLjljMCwwLjksMC40LDEuNywxLjIsMi4xDQoJCQ' +
            'ljMC40LDAuMywwLjksMC40LDEuMywwLjRjMC40LDAsMC43LTAuMSwxLjEtMC4yYzkuNi00LjYsMjMuMy03LjMsMzcuNi03LjNjMTQuMywwLDI4LDIuNywzNy42LDcuM2MwLjgsMC40LDEuNywwLjMsMi40LTAuMQ0KCQkJczEuMi0xLjMsMS4yLTIuMXYtNTAuOUMtMTMzLjgsMzcwLjgtMTM0LjMsMzcwLTEzNSwzNjkuNXoiLz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==';
        me._ht_node_visited__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;ht_node_visited;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "ht_node_visited";
        el.ggDx = -4;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 57px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -32px;';
        hs += 'visibility : hidden;';
        hs += 'width : 72px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._ht_node_visited.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return me.ggNodeId;
        }
        me._ht_node_visited.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.nodeVisited(me._ht_node_visited.ggElementNodeId()) == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._ht_node_visited.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._ht_node_visited.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._ht_node_visited.style[domTransition] = '';
                if (me._ht_node_visited.ggCurrentLogicStateVisible == 0) {
                    me._ht_node_visited.style.visibility = (Number(me._ht_node_visited.style.opacity) > 0 || !me._ht_node_visited.style.opacity) ? 'inherit' : 'hidden';
                    me._ht_node_visited.ggVisible = true;
                } else {
                    me._ht_node_visited.style.visibility = "hidden";
                    me._ht_node_visited.ggVisible = false;
                }
            }
        }
        me._ht_node_visited.onmouseover = function (e) {
            me._ht_node_visited__img.style.visibility = 'hidden';
            me._ht_node_visited__imgo.style.visibility = 'inherit';
        }
        me._ht_node_visited.onmouseout = function (e) {
            me._ht_node_visited__img.style.visibility = 'inherit';
            me._ht_node_visited__imgo.style.visibility = 'hidden';
        }
        me._ht_node_visited.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
        }
        me._ht_node.appendChild(me._ht_node_visited);
        el = me._ht_node_image = document.createElement('div');
        els = me._ht_node_image__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8Zz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xNzUsMzQxYy0zMSwwLTU2LjEsMjUuMS01Ni4xLDU2LjFjMCwzMSwyNS4xLDU2LjEsNTYuMSw1Ni4xczU2LjEtMjUuMSw1Ni4xLTU2LjENCgkJCUMtMTE4LjksMzY2LjEtMTQ0LDM0MS0xNzUsMzQxeiBNLTEzNy45LDQyMGMwLDAuOC0wLjQsMS41LTEuMSwxLjljLTAuNywwLjQtMS41LDAuNS0yLjIsMC4xYy04LjctNC4yLTIxLTYuNi0zMy44LTYuNg0KCQkJYy0xMi44LDAtMjUuMiwyLjQtMzMuOCw2LjZjLTAuMywwLjItMC42LDAuMi0xLDAuMmMtMC40LDAtMC44LTAuMS0xLjItMC4zYy0wLjctMC40LTEu' +
            'MS0xLjEtMS4xLTEuOXYtNDUuOGMwLTAuOCwwLjQtMS41LDEuMS0xLjkNCgkJCWMwLjctMC40LDEuNS0wLjUsMi4yLTAuMWM4LjcsNC4yLDIxLDYuNiwzMy44LDYuNmMxMi44LDAsMjUuMi0yLjQsMzMuOC02LjZjMC43LTAuMywxLjUtMC4zLDIuMiwwLjFjMC43LDAuNCwxLjEsMS4xLDEuMSwxLjkNCgkJCUMtMTM3LjksMzc0LjItMTM3LjksNDIwLTEzNy45LDQyMHoiLz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0yMDcuNiwzNzcuN3YzOC45YzguOS0zLjYsMjAuNi01LjYsMzIuNi01LjZjMTIsMCwyMy42LDIsMzIuNiw1LjZ2LTM4LjljLTguOSwzLjYtMjAuNiw1LjYtMzIuNiw1LjYNCg' +
            'kJCUMtMTg3LDM4My4zLTE5OC42LDM4MS4yLTIwNy42LDM3Ny43eiBNLTE3NSw0MDkuMWMtMTEuMSwwLTIyLDEuNy0zMC44LDQuOHYtNi43YzguNS0xLjQsMTkuNC0yLjMsMzAuOC0yLjNjMi4xLDAsNC4xLDAsNi4yLDAuMQ0KCQkJbC00LjIsNC4xQy0xNzMuNyw0MDkuMi0xNzQuMyw0MDkuMS0xNzUsNDA5LjF6IE0tMTQ0LjIsNDEzLjljLTcuNi0yLjctMTYuNy00LjMtMjYuMy00LjdsMTUuNi0xNS4yYzAuMy0wLjMsMC42LTAuNCwxLTAuNA0KCQkJYzAuNCwwLDAuNywwLjEsMSwwLjRsOC43LDguNUMtMTQ0LjIsNDAyLjUtMTQ0LjIsNDEzLjktMTQ0LjIsNDEzLjl6IE0tMTU0LjYsMzgzYzIuMy0w' +
            'LjQsNC40LDAuNiw0LjcsMi4zDQoJCQljMC4zLDEuNy0xLjMsMy40LTMuNSwzLjljLTIuMywwLjQtNC40LTAuNi00LjctMi4zQy0xNTguNCwzODUuMi0xNTYuOSwzODMuNS0xNTQuNiwzODN6IE0tMTczLjIsMzg5LjlsMTAsOS43bC0zLjgsMy43DQoJCQljLTIuNi0wLjEtNS4zLTAuMS04LTAuMWMtNS40LDAtMTAuNywwLjItMTUuNywwLjVsMTQuMi0xMy45Qy0xNzUuNiwzODktMTc0LjEsMzg5LTE3My4yLDM4OS45eiIvPg0KCTwvZz4NCjwvZz4NCjxnIGlkPSJMYXllcl8yIj4NCgk8Zz4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xOTAuNyw0MDMuOGM1LTAuMywxMC4zLTAuNSwxNS43LT' +
            'AuNWMyLjcsMCw1LjMsMCw4LDAuMWwzLjgtMy43bC0xMC05LjdjLTAuOS0wLjktMi40LTAuOS0zLjMsMA0KCQkJTC0xOTAuNyw0MDMuOHoiLz4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xNzUsNDA1Yy0xMS4zLDAtMjIuMywwLjgtMzAuOCwyLjN2Ni43YzguOC0zLjEsMTkuNi00LjgsMzAuOC00LjhjMC43LDAsMS4zLDAsMiwwbDQuMi00LjENCgkJCUMtMTcwLjksNDA1LTE3Mi45LDQwNS0xNzUsNDA1eiIvPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTE1My45LDM5My42Yy0wLjQsMC0wLjcsMC4xLTEsMC40bC0xNS42LDE1LjJjOS41LDAuNCwxOC43LDIsMjYuMyw0Ljd2LTEx' +
            'LjRsLTguNy04LjUNCgkJCUMtMTUzLjIsMzkzLjgtMTUzLjUsMzkzLjYtMTUzLjksMzkzLjZ6Ii8+DQoJCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTM5LDM3Mi4zYy0wLjctMC40LTEuNS0wLjUtMi4yLTAuMWMtOC43LDQuMi0yMSw2LjYtMzMuOCw2LjZjLTEyLjksMC0yNS4yLTIuNC0zMy44LTYuNg0KCQkJYy0wLjctMC4zLTEuNS0wLjMtMi4yLDAuMWMtMC43LDAuNC0xLjEsMS4xLTEuMSwxLjlWNDIwYzAsMC44LDAuNCwxLjUsMS4xLDEuOWMwLjQsMC4yLDAuOCwwLjMsMS4yLDAuM2MwLjMsMCwwLjctMC4xLDEtMC4yDQoJCQljOC43LTQuMiwyMS02LjYsMzMuOC02LjZjMTIuOCwwLDI1Lj' +
            'IsMi40LDMzLjgsNi42YzAuNywwLjMsMS41LDAuMywyLjItMC4xYzAuNy0wLjQsMS4xLTEuMSwxLjEtMS45di00NS44DQoJCQlDLTEzNy45LDM3My40LTEzOC4zLDM3Mi43LTEzOSwzNzIuM3ogTS0xNDIuNCw0MTYuNWMtOC45LTMuNi0yMC42LTUuNi0zMi42LTUuNnMtMjMuNiwyLTMyLjYsNS42di0zOC45DQoJCQljOC45LDMuNiwyMC42LDUuNiwzMi42LDUuNmMxMiwwLDIzLjYtMiwzMi42LTUuNlY0MTYuNXoiLz4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xNTMuNCwzODkuMmMyLjMtMC40LDMuOS0yLjIsMy41LTMuOWMtMC4zLTEuNy0yLjQtMi43LTQuNy0yLjNjLTIuMywwLjQtMy45' +
            'LDIuMi0zLjUsMy45DQoJCQlDLTE1Ny44LDM4OC42LTE1NS43LDM4OS42LTE1My40LDM4OS4yeiIvPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K';
        me._ht_node_image__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;ht_node_image;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._ht_node_image__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8Zz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xNzUsMzM0LjdjLTM0LjQsMC02Mi40LDI3LjktNjIuNCw2Mi40YzAsMzQuNCwyNy45LDYyLjQsNjIuNCw2Mi40czYyLjQtMjcuOSw2Mi40LTYyLjQNCgkJCUMtMTEyLjYsMzYyLjctMTQwLjYsMzM0LjctMTc1LDMzNC43eiBNLTEzMy44LDQyMi41YzAsMC45LTAuNCwxLjctMS4yLDIuMWMtMC43LDAuNS0xLjYsMC41LTIuNCwwLjFjLTkuNi00LjYtMjMuMy03LjMtMzcuNi03LjMNCgkJCXMtMjgsMi43LTM3LjYsNy4zYy0wLjMsMC4yLTAuNywwLjItMS4xLDAuMmMtMC41LDAtMC45LTAuMS0xLjMtMC40Yy0w' +
            'LjctMC41LTEuMi0xLjMtMS4yLTIuMXYtNTAuOWMwLTAuOSwwLjQtMS43LDEuMi0yLjENCgkJCWMwLjctMC41LDEuNi0wLjUsMi40LTAuMWM5LjYsNC42LDIzLjMsNy4zLDM3LjYsNy4zYzE0LjMsMCwyOC0yLjcsMzcuNi03LjNjMC44LTAuNCwxLjctMC4zLDIuNCwwLjFjMC43LDAuNSwxLjIsMS4zLDEuMiwyLjENCgkJCUMtMTMzLjgsMzcxLjctMTMzLjgsNDIyLjUtMTMzLjgsNDIyLjV6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMjExLjIsMzc1LjV2NDMuMmM5LjktNCwyMi45LTYuMiwzNi4yLTYuMnMyNi4zLDIuMiwzNi4yLDYuMnYtNDMuMmMtOS45LDQtMjIuOSw2LjItMzYuMi' +
            'w2LjINCgkJCUMtMTg4LjMsMzgxLjctMjAxLjMsMzc5LjUtMjExLjIsMzc1LjV6IE0tMTc1LDQxMC41Yy0xMi40LDAtMjQuNCwxLjktMzQuMiw1LjN2LTcuNGM5LjQtMS42LDIxLjYtMi41LDM0LjItMi41DQoJCQljMi4zLDAsNC42LDAsNi45LDAuMWwtNC42LDQuNUMtMTczLjUsNDEwLjUtMTc0LjMsNDEwLjUtMTc1LDQxMC41eiBNLTE0MC44LDQxNS44Yy04LjQtMy0xOC42LTQuOC0yOS4yLTUuMmwxNy4zLTE2LjkNCgkJCWMwLjMtMC4zLDAuNy0wLjUsMS4xLTAuNXMwLjgsMC4yLDEuMSwwLjVsOS42LDkuNEMtMTQwLjgsNDAzLjEtMTQwLjgsNDE1LjgtMTQwLjgsNDE1Ljh6IE0tMTUyLjMsMzgx' +
            'LjVjMi41LTAuNSw0LjksMC42LDUuMywyLjUNCgkJCWMwLjQsMS45LTEuNCwzLjgtMy45LDQuM2MtMi41LDAuNS00LjktMC42LTUuMy0yLjVDLTE1Ni42LDM4My45LTE1NC44LDM4Mi0xNTIuMywzODEuNXogTS0xNzMsMzg5LjFsMTEuMSwxMC44bC00LjIsNC4xDQoJCQljLTIuOS0wLjEtNS45LTAuMi04LjgtMC4yYy02LDAtMTEuOCwwLjItMTcuNCwwLjZsMTUuOC0xNS40Qy0xNzUuNiwzODguMS0xNzQsMzg4LjEtMTczLDM4OS4xeiIvPg0KCTwvZz4NCjwvZz4NCjxnIGlkPSJMYXllcl8yIj4NCgk8Zz4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xOTIuNCw0MDQuNWM1LjYtMC40LDExLj' +
            'QtMC42LDE3LjQtMC42YzMsMCw1LjksMC4xLDguOCwwLjJsNC4yLTQuMWwtMTEuMS0xMC44Yy0xLTEtMi42LTEtMy42LDANCgkJCUwtMTkyLjQsNDA0LjV6Ii8+DQoJCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTc1LDQwNS45Yy0xMi42LDAtMjQuNywwLjktMzQuMiwyLjV2Ny40YzkuNy0zLjQsMjEuOC01LjMsMzQuMi01LjNjMC43LDAsMS41LDAsMi4yLDBsNC42LTQuNQ0KCQkJQy0xNzAuNCw0MDUuOS0xNzIuNyw0MDUuOS0xNzUsNDA1Ljl6Ii8+DQoJCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTUxLjYsMzkzLjJjLTAuNCwwLTAuOCwwLjItMS4xLDAuNWwtMTcuMywxNi45YzEwLjYs' +
            'MC40LDIwLjgsMi4zLDI5LjIsNS4ydi0xMi43bC05LjYtOS40DQoJCQlDLTE1MC43LDM5My40LTE1MS4xLDM5My4yLTE1MS42LDM5My4yeiIvPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTEzNSwzNjkuNWMtMC43LTAuNS0xLjYtMC41LTIuNC0wLjFjLTkuNiw0LjYtMjMuMyw3LjMtMzcuNiw3LjNzLTI4LTIuNy0zNy42LTcuMw0KCQkJYy0wLjgtMC40LTEuNy0wLjMtMi40LDAuMWMtMC43LDAuNS0xLjIsMS4zLTEuMiwyLjF2NTAuOWMwLDAuOSwwLjQsMS43LDEuMiwyLjFjMC40LDAuMywwLjksMC40LDEuMywwLjRjMC40LDAsMC43LTAuMSwxLjEtMC4yDQoJCQljOS42LTQuNiwyMy4zLT' +
            'cuMywzNy42LTcuM2MxNC4zLDAsMjgsMi43LDM3LjYsNy4zYzAuOCwwLjQsMS43LDAuMywyLjQtMC4xczEuMi0xLjMsMS4yLTIuMXYtNTAuOQ0KCQkJQy0xMzMuOCwzNzAuOC0xMzQuMywzNzAtMTM1LDM2OS41eiBNLTEzOC44LDQxOC43Yy05LjktNC0yMi45LTYuMi0zNi4yLTYuMnMtMjYuMywyLjItMzYuMiw2LjJ2LTQzLjJjOS45LDQsMjIuOSw2LjIsMzYuMiw2LjINCgkJCWMxMy4zLDAsMjYuMy0yLjIsMzYuMi02LjJWNDE4Ljd6Ii8+DQoJCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTUxLDM4OC4zYzIuNS0wLjUsNC4zLTIuNCwzLjktNC4zYy0wLjQtMS45LTIuNy0zLTUuMy0yLjVjLTIu' +
            'NSwwLjUtNC4zLDIuNC0zLjksNC4zDQoJCQlDLTE1NS45LDM4Ny43LTE1My41LDM4OC44LTE1MSwzODguM3oiLz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==';
        me._ht_node_image__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;ht_node_image;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "ht_node_image";
        el.ggDx = -8;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 55px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -33px;';
        hs += 'visibility : inherit;';
        hs += 'width : 90px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._ht_node_image.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return me.ggNodeId;
        }
        me._ht_node_image.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.nodeVisited(me._ht_node_image.ggElementNodeId()) == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._ht_node_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._ht_node_image.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._ht_node_image.style[domTransition] = '';
                if (me._ht_node_image.ggCurrentLogicStateVisible == 0) {
                    me._ht_node_image.style.visibility = "hidden";
                    me._ht_node_image.ggVisible = false;
                } else {
                    me._ht_node_image.style.visibility = (Number(me._ht_node_image.style.opacity) > 0 || !me._ht_node_image.style.opacity) ? 'inherit' : 'hidden';
                    me._ht_node_image.ggVisible = true;
                }
            }
        }
        me._ht_node_image.onmouseover = function (e) {
            me._ht_node_image__img.style.visibility = 'hidden';
            me._ht_node_image__imgo.style.visibility = 'inherit';
        }
        me._ht_node_image.onmouseout = function (e) {
            me._ht_node_image__img.style.visibility = 'inherit';
            me._ht_node_image__imgo.style.visibility = 'hidden';
        }
        me._ht_node_image.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
        }
        me._ht_node.appendChild(me._ht_node_image);
        el = me._hotspot_preview = document.createElement('div');
        el.ggPermeable = false;
        el.ggId = "hotspot_preview";
        el.ggDx = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_container ";
        el.ggType = 'container';
        hs = '';
        hs += 'z-index: 100;';
        hs += 'height : 100px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -130px;';
        hs += 'visibility : hidden;';
        hs += 'width : 150px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._hotspot_preview.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return me.ggNodeId;
        }
        me._hotspot_preview.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (me.elementMouseOver['ht_node'] == true) &&
                (player.getVariableValue('opt_hotspot_preview') == true) &&
                (player.getIsTour() == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._hotspot_preview.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._hotspot_preview.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._hotspot_preview.style[domTransition] = '';
                if (me._hotspot_preview.ggCurrentLogicStateVisible == 0) {
                    me._hotspot_preview.style.visibility = (Number(me._hotspot_preview.style.opacity) > 0 || !me._hotspot_preview.style.opacity) ? 'inherit' : 'hidden';
                    me._hotspot_preview.ggVisible = true;
                } else {
                    me._hotspot_preview.style.visibility = "hidden";
                    me._hotspot_preview.ggVisible = false;
                }
            }
        }
        me._hotspot_preview.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
        }
        el = me._ht_preview_picture_frame_ = document.createElement('div');
        el.ggId = "ht_preview_picture_frame ";
        el.ggDx = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_rectangle ";
        el.ggType = 'rectangle';
        hs = '';
        hs += 'background : rgba(0,0,0,0.666667);';
        hs += 'border : 0px solid #000000;';
        hs += 'cursor : default;';
        hs += 'height : 100px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : 0px;';
        hs += 'visibility : inherit;';
        hs += 'width : 150px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._ht_preview_picture_frame_.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return me.ggNodeId;
        }
        me._ht_preview_picture_frame_.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
        }
        me._hotspot_preview.appendChild(me._ht_preview_picture_frame_);
        el = me._ht_preview_nodeimage = document.createElement('div');
        els = me._ht_preview_nodeimage__img = document.createElement('img');
        els.className = 'ggskin ggskin_nodeimage';
        els.setAttribute('src', basePath + "images/ht_preview_nodeimage_" + nodeId + ".jpg");
        el.ggNodeId = nodeId;
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;ht_preview_nodeimage;');
        els.className = 'ggskin ggskin_nodeimage';
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        el.ggId = "ht_preview_nodeImage";
        el.ggDx = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_nodeimage ";
        el.ggType = 'nodeimage';
        hs = '';
        hs += 'height : 90px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : 5px;';
        hs += 'visibility : inherit;';
        hs += 'width : 140px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '0% 0%';
        me._ht_preview_nodeimage.ggIsActive = function () {
            return player.getCurrentNode() == this.ggElementNodeId();
        }
        el.ggElementNodeId = function () {
            return this.ggNodeId;
        }
        me._ht_preview_nodeimage.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
        }
        me._hotspot_preview.appendChild(me._ht_preview_nodeimage);
        el = me._ht_tooltip = document.createElement('div');
        els = me._ht_tooltip__text = document.createElement('div');
        el.className = 'ggskin ggskin_textdiv';
        el.ggTextDiv = els;
        el.ggId = "ht_tooltip";
        el.ggDx = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_text ";
        el.ggType = 'text';
        hs = '';
        hs += 'bottom : 5px;';
        hs += 'height : 20px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'visibility : inherit;';
        hs += 'width : 140px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 100%';
        hs = 'position:absolute;';
        hs += 'box-sizing: border-box;';
        hs += 'cursor: default;';
        hs += 'left: 0px;';
        hs += 'bottom:  0px;';
        hs += 'width: 140px;';
        hs += 'height: auto;';
        hs += 'background: #000000;';
        hs += 'background: rgba(0,0,0,0.196078);';
        hs += 'border: 0px solid #000000;';
        hs += 'color: rgba(255,255,255,1);';
        hs += 'text-align: center;';
        hs += 'white-space: pre-wrap;';
        hs += 'padding: 2px 3px 2px 3px;';
        hs += 'overflow: hidden;';
        els.setAttribute('style', hs);
        els.innerHTML = me.hotspot.title;
        el.appendChild(els);
        me._ht_tooltip.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return me.ggNodeId;
        }
        me._ht_tooltip.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (me.hotspot.title == "")
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._ht_tooltip.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._ht_tooltip.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._ht_tooltip.style[domTransition] = '';
                if (me._ht_tooltip.ggCurrentLogicStateVisible == 0) {
                    me._ht_tooltip.style.visibility = "hidden";
                    me._ht_tooltip.ggVisible = false;
                } else {
                    me._ht_tooltip.style.visibility = (Number(me._ht_tooltip.style.opacity) > 0 || !me._ht_tooltip.style.opacity) ? 'inherit' : 'hidden';
                    me._ht_tooltip.ggVisible = true;
                }
            }
        }
        me._ht_tooltip.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth + 0;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
        }
        me._hotspot_preview.appendChild(me._ht_tooltip);
        el = me._ht_checkmark_tick = document.createElement('div');
        els = me._ht_checkmark_tick__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgLTI0MCAzMzIgMTMwIDEzMD' +
            'siIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6IzAwMDAwMDt9DQoJLnN0MXtmaWxsOiNGRkZGRkY7fQ0KPC9zdHlsZT4NCjxnIGlkPSJMYXllcl8xXzFfIj4NCjwvZz4NCjxnIGlkPSJMYXllcl8yIj4NCgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNLTEyMi4xLDM0MS41aC0xMDUuOGMtMS40LDAtMi42LDEuMS0yLjYsMi42djEwNS44YzAsMS40LDEuMSwyLjYsMi42LDIuNmgxMDUuOGMxLjQsMCwyLjYtMS4xLDIuNi0yLjZWMzQ0LjENCgkJQy0xMTkuNiwzNDIuNy0xMjAuNywzNDEuNS0xMjIuMSwzNDEuNXogTS0xMzIuOCwzODEuN2wtNTAu' +
            'OCw1MC44Yy0wLjMsMC4zLTAuOCwwLjUtMS4yLDAuNWMtMC41LDAtMC45LTAuMS0xLjMtMC41bC0zMS43LTMxLjgNCgkJYy0wLjctMC43LTAuNy0xLjcsMC0yLjRsMTIuNS0xMi41YzAuNy0wLjcsMS43LTAuNywyLjQsMGwxOCwxOGwzNy4xLTM3LjFjMC43LTAuNywxLjctMC43LDIuNCwwbDEyLjUsMTIuNQ0KCQlDLTEzMi4xLDM3OS45LTEzMi4xLDM4MS0xMzIuOCwzODEuN3oiLz4NCgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNLTE0Ny43LDM2Ni44bC0zNy4xLDM3LjFsLTE4LTE4Yy0wLjctMC43LTEuNy0wLjctMi40LDBsLTEyLjUsMTIuNWMtMC43LDAuNy0wLjcsMS43LDAsMi40bDMxLjcsMzEuOA' +
            '0KCQljMC4zLDAuMywwLjgsMC41LDEuMywwLjVjMC40LDAsMC45LTAuMiwxLjItMC41bDUwLjgtNTAuOWMwLjctMC43LDAuNy0xLjcsMC0yLjRsLTEyLjUtMTIuNUMtMTQ1LjksMzY2LjEtMTQ3LDM2Ni4xLTE0Ny43LDM2Ni44eiINCgkJLz4NCjwvZz4NCjwvc3ZnPg0K';
        me._ht_checkmark_tick__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;ht_checkmark_tick;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        el.ggId = "ht_checkmark_tick";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'height : 20px;';
        hs += 'position : absolute;';
        hs += 'right : 7px;';
        hs += 'top : 7px;';
        hs += 'visibility : hidden;';
        hs += 'width : 20px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._ht_checkmark_tick.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return me.ggNodeId;
        }
        me._ht_checkmark_tick.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.nodeVisited(me._ht_checkmark_tick.ggElementNodeId()) == true) ||
                (me._ht_checkmark_tick.ggIsActive() == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._ht_checkmark_tick.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._ht_checkmark_tick.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._ht_checkmark_tick.style[domTransition] = '';
                if (me._ht_checkmark_tick.ggCurrentLogicStateVisible == 0) {
                    me._ht_checkmark_tick.style.visibility = (Number(me._ht_checkmark_tick.style.opacity) > 0 || !me._ht_checkmark_tick.style.opacity) ? 'inherit' : 'hidden';
                    me._ht_checkmark_tick.ggVisible = true;
                } else {
                    me._ht_checkmark_tick.style.visibility = "hidden";
                    me._ht_checkmark_tick.ggVisible = false;
                }
            }
        }
        me._ht_checkmark_tick.ggUpdatePosition = function (useTransition) {
        }
        me._hotspot_preview.appendChild(me._ht_checkmark_tick);
        me._ht_node.appendChild(me._hotspot_preview);
        el = me._tt_ht_node = document.createElement('div');
        els = me._tt_ht_node__text = document.createElement('div');
        el.className = 'ggskin ggskin_textdiv';
        el.ggTextDiv = els;
        el.ggId = "tt_ht_node";
        el.ggDx = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_text ";
        el.ggType = 'text';
        hs = '';
        hs += 'z-index: 100;';
        hs += 'height : 20px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : 25px;';
        hs += 'visibility : hidden;';
        hs += 'width : 100px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        hs = 'position:absolute;';
        hs += 'box-sizing: border-box;';
        hs += 'cursor: default;';
        hs += 'left: 0px;';
        hs += 'top:  0px;';
        hs += 'width: auto;';
        hs += 'height: auto;';
        hs += 'background: #000000;';
        hs += 'background: rgba(0,0,0,0.666667);';
        hs += 'border: 0px solid #000000;';
        hs += 'color: rgba(255,255,255,1);';
        hs += 'text-align: center;';
        hs += 'white-space: nowrap;';
        hs += 'padding: 2px 3px 2px 3px;';
        hs += 'overflow: hidden;';
        els.setAttribute('style', hs);
        els.innerHTML = me.hotspot.title;
        el.appendChild(els);
        me._tt_ht_node.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return me.ggNodeId;
        }
        me._tt_ht_node.logicBlock_position = function () {
            var newLogicStatePosition;
            if (
                (player.getIsMobile() == true)
            ) {
                newLogicStatePosition = 0;
            } else {
                newLogicStatePosition = -1;
            }
            if (me._tt_ht_node.ggCurrentLogicStatePosition != newLogicStatePosition) {
                me._tt_ht_node.ggCurrentLogicStatePosition = newLogicStatePosition;
                me._tt_ht_node.style[domTransition] = 'left 0s, top 0s';
                if (me._tt_ht_node.ggCurrentLogicStatePosition == 0) {
                    this.ggDx = 0;
                    me._tt_ht_node.style.top = '-50px';
                    me._tt_ht_node.ggUpdatePosition(true);
                } else {
                    me._tt_ht_node.ggDx = 0;
                    me._tt_ht_node.style.top = '25px';
                    me._tt_ht_node.ggUpdatePosition(true);
                }
            }
        }
        me._tt_ht_node.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (me.elementMouseOver['ht_node'] == true) &&
                (me.hotspot.title != "") &&
                (player.getIsTour() == false) &&
                (player.getVariableValue('opt_hotspot_preview') == false)
            ) {
                newLogicStateVisible = 0;
            } else if (
                (me.elementMouseOver['ht_node'] == true) &&
                (me.hotspot.title != "") &&
                (player.getIsTour() == true) &&
                (player.getVariableValue('opt_hotspot_preview') == false)
            ) {
                newLogicStateVisible = 1;
            } else if (
                (me.elementMouseOver['ht_node'] == true) &&
                (me.hotspot.title != "") &&
                (player.getIsTour() == false) &&
                (player.getVariableValue('opt_hotspot_preview') == true)
            ) {
                newLogicStateVisible = 2;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._tt_ht_node.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._tt_ht_node.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._tt_ht_node.style[domTransition] = 'left 0s, top 0s';
                if (me._tt_ht_node.ggCurrentLogicStateVisible == 0) {
                    me._tt_ht_node.style.visibility = (Number(me._tt_ht_node.style.opacity) > 0 || !me._tt_ht_node.style.opacity) ? 'inherit' : 'hidden';
                    me._tt_ht_node.ggVisible = true;
                } else if (me._tt_ht_node.ggCurrentLogicStateVisible == 1) {
                    me._tt_ht_node.style.visibility = (Number(me._tt_ht_node.style.opacity) > 0 || !me._tt_ht_node.style.opacity) ? 'inherit' : 'hidden';
                    me._tt_ht_node.ggVisible = true;
                } else if (me._tt_ht_node.ggCurrentLogicStateVisible == 2) {
                    me._tt_ht_node.style.visibility = (Number(me._tt_ht_node.style.opacity) > 0 || !me._tt_ht_node.style.opacity) ? 'inherit' : 'hidden';
                    me._tt_ht_node.ggVisible = true;
                } else {
                    me._tt_ht_node.style.visibility = "hidden";
                    me._tt_ht_node.ggVisible = false;
                }
            }
        }
        me._tt_ht_node.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth + 0;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
            this.style[domTransition] = 'left 0';
            this.ggTextDiv.style.left = ((98 - this.ggTextDiv.offsetWidth) / 2) + 'px';
        }
        me._ht_node.appendChild(me._tt_ht_node);
        me.__div = me._ht_node;
    };

    function SkinHotspotClass_ht_url(parentScope, hotspot) {
        var me = this;
        var flag = false;
        var hs = '';
        me.parentScope = parentScope;
        me.hotspot = hotspot;
        var nodeId = String(hotspot.url);
        nodeId = (nodeId.charAt(0) == '{') ? nodeId.substr(1, nodeId.length - 2) : '';
        me.ggUserdata = skin.player.getNodeUserdata(nodeId);
        me.elementMouseDown = [];
        me.elementMouseOver = [];
        me.findElements = function (id, regex) {
            return skin.findElements(id, regex);
        }
        el = me._ht_url = document.createElement('div');
        el.ggId = "ht_url";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_hotspot ";
        el.ggType = 'hotspot';
        hs = '';
        hs += 'height : 0px;';
        hs += 'left : 250px;';
        hs += 'opacity : 0;';
        hs += 'position : absolute;';
        hs += 'top : 50px;';
        hs += 'visibility : hidden;';
        hs += 'width : 0px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._ht_url.ggIsActive = function () {
            return player.getCurrentNode() == this.ggElementNodeId();
        }
        el.ggElementNodeId = function () {
            return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
        }
        me._ht_url.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('vis_userdata') == true) ||
                (player.getVariableValue('vis_image_popup') == true) ||
                (player.getVariableValue('vis_info_popup') == true) ||
                (player.getVariableValue('vis_video_popup_file') == true) ||
                (player.getVariableValue('vis_video_popup_url') == true) ||
                (player.getVariableValue('vis_video_popup_vimeo') == true) ||
                (player.getVariableValue('vis_video_popup_youtube') == true) ||
                (player.getVariableValue('vis_website') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._ht_url.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._ht_url.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._ht_url.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._ht_url.ggCurrentLogicStateVisible == 0) {
                    me._ht_url.style.visibility = "hidden";
                    me._ht_url.ggVisible = false;
                } else {
                    me._ht_url.style.visibility = (Number(me._ht_url.style.opacity) > 0 || !me._ht_url.style.opacity) ? 'inherit' : 'hidden';
                    me._ht_url.ggVisible = true;
                }
            }
        }
        me._ht_url.logicBlock_alpha = function () {
            var newLogicStateAlpha;
            if (
                (player.getVariableValue('vis_timer') == true)
            ) {
                newLogicStateAlpha = 0;
            } else {
                newLogicStateAlpha = -1;
            }
            if (me._ht_url.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
                me._ht_url.ggCurrentLogicStateAlpha = newLogicStateAlpha;
                me._ht_url.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._ht_url.ggCurrentLogicStateAlpha == 0) {
                    me._ht_url.style.visibility = me._ht_url.ggVisible ? 'inherit' : 'hidden';
                    me._ht_url.style.opacity = 1;
                } else {
                    me._ht_url.style.visibility = "hidden";
                    me._ht_url.style.opacity = 0;
                }
            }
        }
        me._ht_url.onclick = function (e) {
            skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
        }
        me._ht_url.ondblclick = function (e) {
            skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
        }
        me._ht_url.onmouseover = function (e) {
            player.setActiveHotspot(me.hotspot);
            me.elementMouseOver['ht_url'] = true;
            me._tt_ht_url.logicBlock_visible();
            skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
        }
        me._ht_url.onmouseout = function (e) {
            player.setActiveHotspot(null);
            me.elementMouseOver['ht_url'] = false;
            me._tt_ht_url.logicBlock_visible();
            skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
        }
        me._ht_url.ontouchend = function (e) {
            me.elementMouseOver['ht_url'] = false;
            me._tt_ht_url.logicBlock_visible();
        }
        me._ht_url.ggUpdatePosition = function (useTransition) {
        }
        el = me._ht_url_image = document.createElement('div');
        els = me._ht_url_image__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8Zz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xOTAuOCw0MTQuM2gxMy43di0xNWgtMTYuM0MtMTkzLjMsNDA0LjctMTkyLjMsNDA5LjgtMTkwLjgsNDE0LjN6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTkzLjUsMzk0LjdoMTYuM3YtMTVoLTEzLjdDLTE5Mi4zLDM4NC4yLTE5My4zLDM4OS4zLTE5My41LDM5NC43eiIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE4OS4xLDM3NS4yaDExLjl2LTExLjlDLTE4MS45LDM2NC40LTE4Ni4xLDM2OC44LTE4OS4xLDM3NS4yeiIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJN' +
            'LTE3Ny4yLDQzMC43di0xMS45aC0xMS45Qy0xODYuMSw0MjUuMi0xODEuOSw0MjkuNi0xNzcuMiw0MzAuN3oiLz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xOTUuNiwzNzkuN2gtOC41Yy0yLjYsNC41LTQuMyw5LjYtNC42LDE1aDEwLjhDLTE5Ny44LDM4OS4zLTE5NywzODQuMy0xOTUuNiwzNzkuN3oiLz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xNDguOSwzNzUuMmMtMy4zLTQtNy42LTcuMi0xMi40LTkuM2MyLjEsMi42LDMuOSw1LjcsNS40LDkuM0gtMTQ4Ljl6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMjAwLjksNDE4LjhjMy4zLDMuOSw3LjQsNy4xLD' +
            'EyLjEsOS4yYy0yLjEtMi41LTMuOC01LjYtNS4zLTkuMkgtMjAwLjl6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTg4LjgsMzY2Yy00LjcsMi4xLTguOSw1LjMtMTIuMiw5LjJoNi45Qy0xOTIuNiwzNzEuNy0xOTAuOSwzNjguNi0xODguOCwzNjZ6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTk4LDM5OS4yaC0xMC44YzAuNCw1LjUsMiwxMC42LDQuNywxNWg4LjVDLTE5Nyw0MDkuNy0xOTcuOCw0MDQuNy0xOTgsMzk5LjJ6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTc1LDM0MC45Yy0zMSwwLTU2LjEsMjUuMS01Ni4xLDU2LjFzMjUuMSw1Ni4xLDU2' +
            'LjEsNTYuMXM1Ni4xLTI1LjEsNTYuMS01Ni4xUy0xNDQsMzQwLjktMTc1LDM0MC45eg0KCQkJIE0tMTc0LjksNDM1LjRjMCwwLTAuMSwwLTAuMSwwYy0wLjEsMC0wLjIsMC0wLjQsMGMtMjEtMC4yLTM4LTE3LjQtMzgtMzguNGMwLTIxLjIsMTcuMi0zOC40LDM4LjQtMzguNA0KCQkJYzIxLjIsMCwzOC40LDE3LjIsMzguNCwzOC40Qy0xMzYuNSw0MTguMi0xNTMuNyw0MzUuNC0xNzQuOSw0MzUuNHoiLz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xNjEuMyw0MjguMWM0LjgtMi4xLDktNS4zLDEyLjQtOS4zaC03Qy0xNTcuNCw0MjIuNC0xNTkuMiw0MjUuNS0xNjEuMyw0MjguMXoiLz4NCg' +
            'kJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xNTQuNCw0MTQuM2g4LjZjMi43LTQuNSw0LjMtOS42LDQuNy0xNWgtMTFDLTE1Mi4yLDQwNC43LTE1Myw0MDkuNy0xNTQuNCw0MTQuM3oiLz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xNzIuNywzNjMuM3YxMS45aDExLjdDLTE2My45LDM2OC45LTE2OCwzNjQuNS0xNzIuNywzNjMuM3oiLz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xNTIsMzk0LjdoMTFjLTAuNC01LjUtMi0xMC42LTQuNy0xNWgtOC42Qy0xNTMsMzg0LjMtMTUyLjIsMzg5LjMtMTUyLDM5NC43eiIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE3' +
            'Mi43LDQxOC44djExLjljNC42LTEuMSw4LjgtNS41LDExLjctMTEuOUMtMTYwLjksNDE4LjgtMTcyLjcsNDE4LjgtMTcyLjcsNDE4Ljh6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTU5LjIsMzc5LjdoLTEzLjV2MTVoMTYuMUMtMTU2LjcsMzg5LjMtMTU3LjcsMzg0LjItMTU5LjIsMzc5Ljd6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTU2LjUsMzk5LjJoLTE2LjF2MTVoMTMuNUMtMTU3LjcsNDA5LjgtMTU2LjcsNDA0LjctMTU2LjUsMzk5LjJ6Ii8+DQoJPC9nPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTM2Lj' +
            'UsMzk3YzAtMjEuMi0xNy4yLTM4LjQtMzguNC0zOC40Yy0yMS4yLDAtMzguNCwxNy4yLTM4LjQsMzguNGMwLDIxLjEsMTcsMzguMiwzOCwzOC40DQoJCWMwLjEsMCwwLjIsMCwwLjQsMGMwLDAsMC4xLDAsMC4xLDBDLTE1My43LDQzNS40LTEzNi41LDQxOC4yLTEzNi41LDM5N3ogTS0yMDguOCwzOTkuMmgxMC44YzAuMiw1LjQsMSwxMC41LDIuMywxNWgtOC41DQoJCUMtMjA2LjgsNDA5LjgtMjA4LjQsNDA0LjctMjA4LjgsMzk5LjJ6IE0tMTQxLjEsMzk0LjdoLTExYy0wLjItNS40LTEtMTAuNS0yLjMtMTVoOC42Qy0xNDMuMSwzODQuMi0xNDEuNCwzODkuMy0xNDEuMSwzOTQuN3oNCgkJIE0tMTU2' +
            'LjUsMzk0LjdoLTE2LjF2LTE1aDEzLjVDLTE1Ny43LDM4NC4yLTE1Ni43LDM4OS4zLTE1Ni41LDM5NC43eiBNLTE3Mi43LDM3NS4ydi0xMS45YzQuNiwxLjEsOC44LDUuNSwxMS43LDExLjlMLTE3Mi43LDM3NS4yDQoJCUwtMTcyLjcsMzc1LjJ6IE0tMTc3LjIsMzYzLjN2MTEuOWgtMTEuOUMtMTg2LjEsMzY4LjgtMTgxLjksMzY0LjQtMTc3LjIsMzYzLjN6IE0tMTc3LjIsMzc5Ljd2MTVoLTE2LjNjMC4yLTUuNCwxLjEtMTAuNSwyLjYtMTUNCgkJTC0xNzcuMiwzNzkuN0wtMTc3LjIsMzc5Ljd6IE0tMTk4LDM5NC43aC0xMC44YzAuNC01LjUsMi0xMC42LDQuNi0xNWg4LjVDLTE5NywzODQuMy0xOT' +
            'cuOCwzODkuMy0xOTgsMzk0Ljd6IE0tMTkzLjUsMzk5LjJoMTYuMw0KCQl2MTVoLTEzLjdDLTE5Mi4zLDQwOS44LTE5My4zLDQwNC43LTE5My41LDM5OS4yeiBNLTE3Ny4yLDQxOC44djExLjljLTQuNy0xLjEtOC45LTUuNS0xMS45LTExLjlILTE3Ny4yeiBNLTE3Mi43LDQzMC42di0xMS45aDExLjcNCgkJQy0xNjMuOSw0MjUuMS0xNjgsNDI5LjUtMTcyLjcsNDMwLjZ6IE0tMTcyLjcsNDE0LjN2LTE1aDE2LjFjLTAuMiw1LjQtMS4xLDEwLjYtMi42LDE1SC0xNzIuN3ogTS0xNTIsMzk5LjJoMTENCgkJYy0wLjQsNS41LTIsMTAuNi00LjcsMTVoLTguNkMtMTUzLDQwOS43LTE1Mi4yLDQwNC43LTE1' +
            'MiwzOTkuMnogTS0xNDguOSwzNzUuMmgtN2MtMS41LTMuNi0zLjMtNi44LTUuNC05LjMNCgkJQy0xNTYuNSwzNjgtMTUyLjIsMzcxLjItMTQ4LjksMzc1LjJ6IE0tMTg4LjgsMzY2Yy0yLjEsMi41LTMuOCw1LjctNS4zLDkuMmgtNi45Qy0xOTcuNywzNzEuMy0xOTMuNSwzNjguMS0xODguOCwzNjZ6DQoJCSBNLTIwMC45LDQxOC44aDYuOWMxLjQsMy41LDMuMiw2LjYsNS4zLDkuMkMtMTkzLjUsNDI1LjgtMTk3LjYsNDIyLjctMjAwLjksNDE4Ljh6IE0tMTYxLjMsNDI4LjFjMi4xLTIuNiwzLjktNS43LDUuNC05LjNoNw0KCQlDLTE1Mi4zLDQyMi43LTE1Ni41LDQyNS45LTE2MS4zLDQyOC4xeiIvPg' +
            '0KPC9nPg0KPC9zdmc+DQo=';
        me._ht_url_image__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;ht_url_image;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._ht_url_image__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8Zz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xOTIuNiw0MTYuMmgxNS4ydi0xNi43aC0xOC4xQy0xOTUuMyw0MDUuNS0xOTQuMiw0MTEuMi0xOTIuNiw0MTYuMnoiLz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xOTUuNSwzOTQuNWgxOC4xdi0xNi43aC0xNS4yQy0xOTQuMywzODIuOC0xOTUuMywzODguNS0xOTUuNSwzOTQuNXoiLz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xOTAuNiwzNzIuOGgxMy4ydi0xMy4yQy0xODIuNiwzNjAuNy0xODcuMywzNjUuNy0xOTAuNiwzNzIuOHoiLz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIg' +
            'ZD0iTS0xNzcuNCw0MzQuNHYtMTMuMmgtMTMuMkMtMTg3LjMsNDI4LjMtMTgyLjYsNDMzLjItMTc3LjQsNDM0LjR6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTk3LjksMzc3LjhoLTkuNGMtMi45LDQuOS00LjgsMTAuNi01LjIsMTYuN2gxMkMtMjAwLjMsMzg4LjUtMTk5LjQsMzgyLjgtMTk3LjksMzc3Ljh6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTQ2LDM3Mi44Yy0zLjctNC40LTguNC04LTEzLjgtMTAuNGMyLjMsMi44LDQuNCw2LjMsNiwxMC40SC0xNDZ6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMjAzLjgsNDIxLjJjMy42LDQuMyw4LjIsNy' +
            '44LDEzLjUsMTAuMmMtMi4zLTIuOC00LjMtNi4zLTUuOC0xMC4ySC0yMDMuOHoiLz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xOTAuMywzNjIuNmMtNS4yLDIuNC05LjksNS45LTEzLjUsMTAuMmg3LjZDLTE5NC42LDM2OC45LTE5Mi42LDM2NS40LTE5MC4zLDM2Mi42eiIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTIwMC41LDM5OS41aC0xMmMwLjQsNi4xLDIuMiwxMS44LDUuMiwxNi43aDkuNEMtMTk5LjQsNDExLjEtMjAwLjMsNDA1LjUtMjAwLjUsMzk5LjV6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTc1LDMzNC42Yy0zNC40LDAtNjIuNCwyNy45LTYy' +
            'LjQsNjIuNHMyNy45LDYyLjQsNjIuNCw2Mi40czYyLjQtMjcuOSw2Mi40LTYyLjRTLTE0MC42LDMzNC42LTE3NSwzMzQuNg0KCQkJeiBNLTE3NC45LDQzOS43YzAsMC0wLjEsMC0wLjEsMGMtMC4xLDAtMC4zLDAtMC40LDBjLTIzLjMtMC4zLTQyLjItMTkuMy00Mi4yLTQyLjdjMC0yMy42LDE5LjItNDIuNyw0Mi43LTQyLjcNCgkJCWMyMy42LDAsNDIuNywxOS4yLDQyLjcsNDIuN0MtMTMyLjIsNDIwLjUtMTUxLjMsNDM5LjctMTc0LjksNDM5Ljd6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTU5LjgsNDMxLjVjNS4zLTIuNCwxMC01LjksMTMuNy0xMC4zaC03LjhDLTE1NS40LDQyNS' +
            '4yLTE1Ny41LDQyOC43LTE1OS44LDQzMS41eiIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE1Mi4xLDQxNi4yaDkuNmMzLTUsNC44LTEwLjYsNS4yLTE2LjdoLTEyLjJDLTE0OS43LDQwNS41LTE1MC42LDQxMS4xLTE1Mi4xLDQxNi4yeiIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE3Mi40LDM1OS42djEzLjJoMTNDLTE2Mi42LDM2NS43LTE2Ny4zLDM2MC44LTE3Mi40LDM1OS42eiIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE0OS41LDM5NC41aDEyLjJjLTAuNC02LjEtMi4yLTExLjctNS4yLTE2LjdoLTkuNkMtMTUwLjYsMzgyLjgtMTQ5LjcsMzg4LjUt' +
            'MTQ5LjUsMzk0LjV6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTcyLjQsNDIxLjJ2MTMuMmM1LjEtMS4yLDkuOC02LjEsMTMtMTMuMkMtMTU5LjQsNDIxLjItMTcyLjQsNDIxLjItMTcyLjQsNDIxLjJ6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTU3LjQsMzc3LjhoLTE1djE2LjdoMTcuOUMtMTU0LjcsMzg4LjUtMTU1LjgsMzgyLjgtMTU3LjQsMzc3Ljh6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTU0LjUsMzk5LjVoLTE3Ljl2MTYuN2gxNUMtMTU1LjgsNDExLjItMTU0LjcsNDA1LjUtMTU0LjUsMzk5LjV6Ii8+DQoJPC9nPg0KPC9nPg0KPGcgaW' +
            'Q9IkxheWVyXzIiPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTMyLjIsMzk3YzAtMjMuNi0xOS4yLTQyLjctNDIuNy00Mi43Yy0yMy42LDAtNDIuNywxOS4yLTQyLjcsNDIuN2MwLDIzLjQsMTguOSw0Mi40LDQyLjIsNDIuNw0KCQljMC4xLDAsMC4zLDAsMC40LDBjMCwwLDAuMSwwLDAuMSwwQy0xNTEuMyw0MzkuNy0xMzIuMiw0MjAuNS0xMzIuMiwzOTd6IE0tMjEyLjUsMzk5LjVoMTJjMC4yLDYsMS4xLDExLjcsMi42LDE2LjdoLTkuNA0KCQlDLTIxMC4zLDQxMS4yLTIxMi4xLDQwNS42LTIxMi41LDM5OS41eiBNLTEzNy4zLDM5NC41aC0xMi4yYy0wLjItNi0xLjEtMTEuNi0yLjYtMTYu' +
            'N2g5LjZDLTEzOS41LDM4Mi44LTEzNy43LDM4OC40LTEzNy4zLDM5NC41eg0KCQkgTS0xNTQuNSwzOTQuNWgtMTcuOXYtMTYuN2gxNUMtMTU1LjgsMzgyLjgtMTU0LjcsMzg4LjUtMTU0LjUsMzk0LjV6IE0tMTcyLjQsMzcyLjh2LTEzLjJjNS4yLDEuMiw5LjgsNi4yLDEzLDEzLjJMLTE3Mi40LDM3Mi44DQoJCUwtMTcyLjQsMzcyLjh6IE0tMTc3LjQsMzU5LjZ2MTMuMmgtMTMuMkMtMTg3LjMsMzY1LjctMTgyLjYsMzYwLjctMTc3LjQsMzU5LjZ6IE0tMTc3LjQsMzc3Ljh2MTYuN2gtMTguMWMwLjItNiwxLjMtMTEuNywyLjktMTYuNw0KCQlMLTE3Ny40LDM3Ny44TC0xNzcuNCwzNzcuOHogTS0yMD' +
            'AuNSwzOTQuNWgtMTJjMC40LTYuMSwyLjItMTEuNyw1LjItMTYuN2g5LjRDLTE5OS40LDM4Mi44LTIwMC4zLDM4OC41LTIwMC41LDM5NC41eg0KCQkgTS0xOTUuNSwzOTkuNWgxOC4xdjE2LjdoLTE1LjJDLTE5NC4yLDQxMS4yLTE5NS4zLDQwNS41LTE5NS41LDM5OS41eiBNLTE3Ny40LDQyMS4ydjEzLjJjLTUuMi0xLjItOS45LTYuMS0xMy4yLTEzLjJILTE3Ny40eg0KCQkgTS0xNzIuNCw0MzQuNHYtMTMuMmgxM0MtMTYyLjcsNDI4LjItMTY3LjMsNDMzLjEtMTcyLjQsNDM0LjR6IE0tMTcyLjQsNDE2LjJ2LTE2LjdoMTcuOWMtMC4yLDYtMS4zLDExLjctMi45LDE2LjdILTE3Mi40eg0KCQkgTS0x' +
            'NDkuNSwzOTkuNWgxMi4yYy0wLjQsNi4xLTIuMiwxMS44LTUuMiwxNi43aC05LjZDLTE1MC42LDQxMS4xLTE0OS43LDQwNS41LTE0OS41LDM5OS41eiBNLTE0NiwzNzIuOGgtNy44DQoJCWMtMS42LTQtMy42LTcuNS02LTEwLjRDLTE1NC40LDM2NC44LTE0OS43LDM2OC40LTE0NiwzNzIuOHogTS0xOTAuMywzNjIuNmMtMi4zLDIuOC00LjMsNi4zLTUuOSwxMC4yaC03LjYNCgkJQy0yMDAuMiwzNjguNC0xOTUuNiwzNjQuOS0xOTAuMywzNjIuNnogTS0yMDMuOCw0MjEuMmg3LjZjMS42LDMuOSwzLjYsNy40LDUuOSwxMC4yQy0xOTUuNiw0MjktMjAwLjIsNDI1LjUtMjAzLjgsNDIxLjJ6DQoJCSBNLT' +
            'E1OS44LDQzMS41YzIuMy0yLjgsNC4zLTYuMyw2LTEwLjNoNy44Qy0xNDkuNyw0MjUuNi0xNTQuNCw0MjkuMi0xNTkuOCw0MzEuNXoiLz4NCjwvZz4NCjwvc3ZnPg0K';
        me._ht_url_image__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;ht_url_image;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "ht_url_image";
        el.ggDx = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 32px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -16px;';
        hs += 'visibility : hidden;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._ht_url_image.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return me.ggNodeId;
        }
        me._ht_url_image.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getIsMobile() == false) &&
                (player.getVariableValue('opt_url') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._ht_url_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._ht_url_image.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._ht_url_image.style[domTransition] = '';
                if (me._ht_url_image.ggCurrentLogicStateVisible == 0) {
                    me._ht_url_image.style.visibility = (Number(me._ht_url_image.style.opacity) > 0 || !me._ht_url_image.style.opacity) ? 'inherit' : 'hidden';
                    me._ht_url_image.ggVisible = true;
                } else {
                    me._ht_url_image.style.visibility = "hidden";
                    me._ht_url_image.ggVisible = false;
                }
            }
        }
        me._ht_url_image.onclick = function (e) {
            skin._web_page.ggText = "<iframe src=\"" + me.hotspot.url + "\" width=\"100%\" height=\"100%\" allowfullscreen=\"true\" mozallowfullscreen=\"true\" webkitallowfullscreen=\"true\" frameborder= \"0\" ><\/iframe>";
            skin._web_page.ggTextDiv.innerHTML = skin._web_page.ggText;
            if (skin._web_page.ggUpdateText) {
                skin._web_page.ggUpdateText = function () {
                    var hs = "<iframe src=\"" + me.hotspot.url + "\" width=\"100%\" height=\"100%\" allowfullscreen=\"true\" mozallowfullscreen=\"true\" webkitallowfullscreen=\"true\" frameborder= \"0\" ><\/iframe>";
                    if (hs != this.ggText) {
                        this.ggText = hs;
                        this.ggTextDiv.innerHTML = hs;
                        if (this.ggUpdatePosition) this.ggUpdatePosition();
                    }
                }
            }
            if (skin._web_page.ggUpdatePosition) {
                skin._web_page.ggUpdatePosition();
            }
            skin._web_page.ggTextDiv.scrollTop = 0;
            player.setVariableValue('vis_website', true);
        }
        me._ht_url_image.onmouseover = function (e) {
            me._ht_url_image__img.style.visibility = 'hidden';
            me._ht_url_image__imgo.style.visibility = 'inherit';
        }
        me._ht_url_image.onmouseout = function (e) {
            me._ht_url_image__img.style.visibility = 'inherit';
            me._ht_url_image__imgo.style.visibility = 'hidden';
        }
        me._ht_url_image.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
        }
        me._ht_url.appendChild(me._ht_url_image);
        el = me._ht_url_image_newpage = document.createElement('div');
        els = me._ht_url_image_newpage__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8Zz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xOTAuOCw0MTQuM2gxMy43di0xNWgtMTYuM0MtMTkzLjMsNDA0LjctMTkyLjMsNDA5LjgtMTkwLjgsNDE0LjN6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTkzLjUsMzk0LjdoMTYuM3YtMTVoLTEzLjdDLTE5Mi4zLDM4NC4yLTE5My4zLDM4OS4zLTE5My41LDM5NC43eiIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE4OS4xLDM3NS4yaDExLjl2LTExLjlDLTE4MS45LDM2NC40LTE4Ni4xLDM2OC44LTE4OS4xLDM3NS4yeiIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJN' +
            'LTE3Ny4yLDQzMC43di0xMS45aC0xMS45Qy0xODYuMSw0MjUuMi0xODEuOSw0MjkuNi0xNzcuMiw0MzAuN3oiLz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xOTUuNiwzNzkuN2gtOC41Yy0yLjYsNC41LTQuMyw5LjYtNC42LDE1aDEwLjhDLTE5Ny44LDM4OS4zLTE5NywzODQuMy0xOTUuNiwzNzkuN3oiLz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xNDguOSwzNzUuMmMtMy4zLTQtNy42LTcuMi0xMi40LTkuM2MyLjEsMi42LDMuOSw1LjcsNS40LDkuM0gtMTQ4Ljl6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMjAwLjksNDE4LjhjMy4zLDMuOSw3LjQsNy4xLD' +
            'EyLjEsOS4yYy0yLjEtMi41LTMuOC01LjYtNS4zLTkuMkgtMjAwLjl6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTg4LjgsMzY2Yy00LjcsMi4xLTguOSw1LjMtMTIuMiw5LjJoNi45Qy0xOTIuNiwzNzEuNy0xOTAuOSwzNjguNi0xODguOCwzNjZ6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTk4LDM5OS4yaC0xMC44YzAuNCw1LjUsMiwxMC42LDQuNywxNWg4LjVDLTE5Nyw0MDkuNy0xOTcuOCw0MDQuNy0xOTgsMzk5LjJ6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTc1LDM0MC45Yy0zMSwwLTU2LjEsMjUuMS01Ni4xLDU2LjFzMjUuMSw1Ni4xLDU2' +
            'LjEsNTYuMXM1Ni4xLTI1LjEsNTYuMS01Ni4xUy0xNDQsMzQwLjktMTc1LDM0MC45eg0KCQkJIE0tMTc0LjksNDM1LjRjMCwwLTAuMSwwLTAuMSwwYy0wLjEsMC0wLjIsMC0wLjQsMGMtMjEtMC4yLTM4LTE3LjQtMzgtMzguNGMwLTIxLjIsMTcuMi0zOC40LDM4LjQtMzguNA0KCQkJYzIxLjIsMCwzOC40LDE3LjIsMzguNCwzOC40Qy0xMzYuNSw0MTguMi0xNTMuNyw0MzUuNC0xNzQuOSw0MzUuNHoiLz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xNjEuMyw0MjguMWM0LjgtMi4xLDktNS4zLDEyLjQtOS4zaC03Qy0xNTcuNCw0MjIuNC0xNTkuMiw0MjUuNS0xNjEuMyw0MjguMXoiLz4NCg' +
            'kJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xNTQuNCw0MTQuM2g4LjZjMi43LTQuNSw0LjMtOS42LDQuNy0xNWgtMTFDLTE1Mi4yLDQwNC43LTE1Myw0MDkuNy0xNTQuNCw0MTQuM3oiLz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xNzIuNywzNjMuM3YxMS45aDExLjdDLTE2My45LDM2OC45LTE2OCwzNjQuNS0xNzIuNywzNjMuM3oiLz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xNTIsMzk0LjdoMTFjLTAuNC01LjUtMi0xMC42LTQuNy0xNWgtOC42Qy0xNTMsMzg0LjMtMTUyLjIsMzg5LjMtMTUyLDM5NC43eiIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE3' +
            'Mi43LDQxOC44djExLjljNC42LTEuMSw4LjgtNS41LDExLjctMTEuOUMtMTYwLjksNDE4LjgtMTcyLjcsNDE4LjgtMTcyLjcsNDE4Ljh6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTU5LjIsMzc5LjdoLTEzLjV2MTVoMTYuMUMtMTU2LjcsMzg5LjMtMTU3LjcsMzg0LjItMTU5LjIsMzc5Ljd6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTU2LjUsMzk5LjJoLTE2LjF2MTVoMTMuNUMtMTU3LjcsNDA5LjgtMTU2LjcsNDA0LjctMTU2LjUsMzk5LjJ6Ii8+DQoJPC9nPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTM2Lj' +
            'UsMzk3YzAtMjEuMi0xNy4yLTM4LjQtMzguNC0zOC40Yy0yMS4yLDAtMzguNCwxNy4yLTM4LjQsMzguNGMwLDIxLjEsMTcsMzguMiwzOCwzOC40DQoJCWMwLjEsMCwwLjIsMCwwLjQsMGMwLDAsMC4xLDAsMC4xLDBDLTE1My43LDQzNS40LTEzNi41LDQxOC4yLTEzNi41LDM5N3ogTS0yMDguOCwzOTkuMmgxMC44YzAuMiw1LjQsMSwxMC41LDIuMywxNWgtOC41DQoJCUMtMjA2LjgsNDA5LjgtMjA4LjQsNDA0LjctMjA4LjgsMzk5LjJ6IE0tMTQxLjEsMzk0LjdoLTExYy0wLjItNS40LTEtMTAuNS0yLjMtMTVoOC42Qy0xNDMuMSwzODQuMi0xNDEuNCwzODkuMy0xNDEuMSwzOTQuN3oNCgkJIE0tMTU2' +
            'LjUsMzk0LjdoLTE2LjF2LTE1aDEzLjVDLTE1Ny43LDM4NC4yLTE1Ni43LDM4OS4zLTE1Ni41LDM5NC43eiBNLTE3Mi43LDM3NS4ydi0xMS45YzQuNiwxLjEsOC44LDUuNSwxMS43LDExLjlMLTE3Mi43LDM3NS4yDQoJCUwtMTcyLjcsMzc1LjJ6IE0tMTc3LjIsMzYzLjN2MTEuOWgtMTEuOUMtMTg2LjEsMzY4LjgtMTgxLjksMzY0LjQtMTc3LjIsMzYzLjN6IE0tMTc3LjIsMzc5Ljd2MTVoLTE2LjNjMC4yLTUuNCwxLjEtMTAuNSwyLjYtMTUNCgkJTC0xNzcuMiwzNzkuN0wtMTc3LjIsMzc5Ljd6IE0tMTk4LDM5NC43aC0xMC44YzAuNC01LjUsMi0xMC42LDQuNi0xNWg4LjVDLTE5NywzODQuMy0xOT' +
            'cuOCwzODkuMy0xOTgsMzk0Ljd6IE0tMTkzLjUsMzk5LjJoMTYuMw0KCQl2MTVoLTEzLjdDLTE5Mi4zLDQwOS44LTE5My4zLDQwNC43LTE5My41LDM5OS4yeiBNLTE3Ny4yLDQxOC44djExLjljLTQuNy0xLjEtOC45LTUuNS0xMS45LTExLjlILTE3Ny4yeiBNLTE3Mi43LDQzMC42di0xMS45aDExLjcNCgkJQy0xNjMuOSw0MjUuMS0xNjgsNDI5LjUtMTcyLjcsNDMwLjZ6IE0tMTcyLjcsNDE0LjN2LTE1aDE2LjFjLTAuMiw1LjQtMS4xLDEwLjYtMi42LDE1SC0xNzIuN3ogTS0xNTIsMzk5LjJoMTENCgkJYy0wLjQsNS41LTIsMTAuNi00LjcsMTVoLTguNkMtMTUzLDQwOS43LTE1Mi4yLDQwNC43LTE1' +
            'MiwzOTkuMnogTS0xNDguOSwzNzUuMmgtN2MtMS41LTMuNi0zLjMtNi44LTUuNC05LjMNCgkJQy0xNTYuNSwzNjgtMTUyLjIsMzcxLjItMTQ4LjksMzc1LjJ6IE0tMTg4LjgsMzY2Yy0yLjEsMi41LTMuOCw1LjctNS4zLDkuMmgtNi45Qy0xOTcuNywzNzEuMy0xOTMuNSwzNjguMS0xODguOCwzNjZ6DQoJCSBNLTIwMC45LDQxOC44aDYuOWMxLjQsMy41LDMuMiw2LjYsNS4zLDkuMkMtMTkzLjUsNDI1LjgtMTk3LjYsNDIyLjctMjAwLjksNDE4Ljh6IE0tMTYxLjMsNDI4LjFjMi4xLTIuNiwzLjktNS43LDUuNC05LjNoNw0KCQlDLTE1Mi4zLDQyMi43LTE1Ni41LDQyNS45LTE2MS4zLDQyOC4xeiIvPg' +
            '0KPC9nPg0KPC9zdmc+DQo=';
        me._ht_url_image_newpage__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;ht_url_image_newpage;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._ht_url_image_newpage__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8Zz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xOTIuNiw0MTYuMmgxNS4ydi0xNi43aC0xOC4xQy0xOTUuMyw0MDUuNS0xOTQuMiw0MTEuMi0xOTIuNiw0MTYuMnoiLz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xOTUuNSwzOTQuNWgxOC4xdi0xNi43aC0xNS4yQy0xOTQuMywzODIuOC0xOTUuMywzODguNS0xOTUuNSwzOTQuNXoiLz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xOTAuNiwzNzIuOGgxMy4ydi0xMy4yQy0xODIuNiwzNjAuNy0xODcuMywzNjUuNy0xOTAuNiwzNzIuOHoiLz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIg' +
            'ZD0iTS0xNzcuNCw0MzQuNHYtMTMuMmgtMTMuMkMtMTg3LjMsNDI4LjMtMTgyLjYsNDMzLjItMTc3LjQsNDM0LjR6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTk3LjksMzc3LjhoLTkuNGMtMi45LDQuOS00LjgsMTAuNi01LjIsMTYuN2gxMkMtMjAwLjMsMzg4LjUtMTk5LjQsMzgyLjgtMTk3LjksMzc3Ljh6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTQ2LDM3Mi44Yy0zLjctNC40LTguNC04LTEzLjgtMTAuNGMyLjMsMi44LDQuNCw2LjMsNiwxMC40SC0xNDZ6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMjAzLjgsNDIxLjJjMy42LDQuMyw4LjIsNy' +
            '44LDEzLjUsMTAuMmMtMi4zLTIuOC00LjMtNi4zLTUuOC0xMC4ySC0yMDMuOHoiLz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xOTAuMywzNjIuNmMtNS4yLDIuNC05LjksNS45LTEzLjUsMTAuMmg3LjZDLTE5NC42LDM2OC45LTE5Mi42LDM2NS40LTE5MC4zLDM2Mi42eiIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTIwMC41LDM5OS41aC0xMmMwLjQsNi4xLDIuMiwxMS44LDUuMiwxNi43aDkuNEMtMTk5LjQsNDExLjEtMjAwLjMsNDA1LjUtMjAwLjUsMzk5LjV6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTc1LDMzNC42Yy0zNC40LDAtNjIuNCwyNy45LTYy' +
            'LjQsNjIuNHMyNy45LDYyLjQsNjIuNCw2Mi40czYyLjQtMjcuOSw2Mi40LTYyLjRTLTE0MC42LDMzNC42LTE3NSwzMzQuNg0KCQkJeiBNLTE3NC45LDQzOS43YzAsMC0wLjEsMC0wLjEsMGMtMC4xLDAtMC4zLDAtMC40LDBjLTIzLjMtMC4zLTQyLjItMTkuMy00Mi4yLTQyLjdjMC0yMy42LDE5LjItNDIuNyw0Mi43LTQyLjcNCgkJCWMyMy42LDAsNDIuNywxOS4yLDQyLjcsNDIuN0MtMTMyLjIsNDIwLjUtMTUxLjMsNDM5LjctMTc0LjksNDM5Ljd6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTU5LjgsNDMxLjVjNS4zLTIuNCwxMC01LjksMTMuNy0xMC4zaC03LjhDLTE1NS40LDQyNS' +
            '4yLTE1Ny41LDQyOC43LTE1OS44LDQzMS41eiIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE1Mi4xLDQxNi4yaDkuNmMzLTUsNC44LTEwLjYsNS4yLTE2LjdoLTEyLjJDLTE0OS43LDQwNS41LTE1MC42LDQxMS4xLTE1Mi4xLDQxNi4yeiIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE3Mi40LDM1OS42djEzLjJoMTNDLTE2Mi42LDM2NS43LTE2Ny4zLDM2MC44LTE3Mi40LDM1OS42eiIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE0OS41LDM5NC41aDEyLjJjLTAuNC02LjEtMi4yLTExLjctNS4yLTE2LjdoLTkuNkMtMTUwLjYsMzgyLjgtMTQ5LjcsMzg4LjUt' +
            'MTQ5LjUsMzk0LjV6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTcyLjQsNDIxLjJ2MTMuMmM1LjEtMS4yLDkuOC02LjEsMTMtMTMuMkMtMTU5LjQsNDIxLjItMTcyLjQsNDIxLjItMTcyLjQsNDIxLjJ6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTU3LjQsMzc3LjhoLTE1djE2LjdoMTcuOUMtMTU0LjcsMzg4LjUtMTU1LjgsMzgyLjgtMTU3LjQsMzc3Ljh6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTU0LjUsMzk5LjVoLTE3Ljl2MTYuN2gxNUMtMTU1LjgsNDExLjItMTU0LjcsNDA1LjUtMTU0LjUsMzk5LjV6Ii8+DQoJPC9nPg0KPC9nPg0KPGcgaW' +
            'Q9IkxheWVyXzIiPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTMyLjIsMzk3YzAtMjMuNi0xOS4yLTQyLjctNDIuNy00Mi43Yy0yMy42LDAtNDIuNywxOS4yLTQyLjcsNDIuN2MwLDIzLjQsMTguOSw0Mi40LDQyLjIsNDIuNw0KCQljMC4xLDAsMC4zLDAsMC40LDBjMCwwLDAuMSwwLDAuMSwwQy0xNTEuMyw0MzkuNy0xMzIuMiw0MjAuNS0xMzIuMiwzOTd6IE0tMjEyLjUsMzk5LjVoMTJjMC4yLDYsMS4xLDExLjcsMi42LDE2LjdoLTkuNA0KCQlDLTIxMC4zLDQxMS4yLTIxMi4xLDQwNS42LTIxMi41LDM5OS41eiBNLTEzNy4zLDM5NC41aC0xMi4yYy0wLjItNi0xLjEtMTEuNi0yLjYtMTYu' +
            'N2g5LjZDLTEzOS41LDM4Mi44LTEzNy43LDM4OC40LTEzNy4zLDM5NC41eg0KCQkgTS0xNTQuNSwzOTQuNWgtMTcuOXYtMTYuN2gxNUMtMTU1LjgsMzgyLjgtMTU0LjcsMzg4LjUtMTU0LjUsMzk0LjV6IE0tMTcyLjQsMzcyLjh2LTEzLjJjNS4yLDEuMiw5LjgsNi4yLDEzLDEzLjJMLTE3Mi40LDM3Mi44DQoJCUwtMTcyLjQsMzcyLjh6IE0tMTc3LjQsMzU5LjZ2MTMuMmgtMTMuMkMtMTg3LjMsMzY1LjctMTgyLjYsMzYwLjctMTc3LjQsMzU5LjZ6IE0tMTc3LjQsMzc3Ljh2MTYuN2gtMTguMWMwLjItNiwxLjMtMTEuNywyLjktMTYuNw0KCQlMLTE3Ny40LDM3Ny44TC0xNzcuNCwzNzcuOHogTS0yMD' +
            'AuNSwzOTQuNWgtMTJjMC40LTYuMSwyLjItMTEuNyw1LjItMTYuN2g5LjRDLTE5OS40LDM4Mi44LTIwMC4zLDM4OC41LTIwMC41LDM5NC41eg0KCQkgTS0xOTUuNSwzOTkuNWgxOC4xdjE2LjdoLTE1LjJDLTE5NC4yLDQxMS4yLTE5NS4zLDQwNS41LTE5NS41LDM5OS41eiBNLTE3Ny40LDQyMS4ydjEzLjJjLTUuMi0xLjItOS45LTYuMS0xMy4yLTEzLjJILTE3Ny40eg0KCQkgTS0xNzIuNCw0MzQuNHYtMTMuMmgxM0MtMTYyLjcsNDI4LjItMTY3LjMsNDMzLjEtMTcyLjQsNDM0LjR6IE0tMTcyLjQsNDE2LjJ2LTE2LjdoMTcuOWMtMC4yLDYtMS4zLDExLjctMi45LDE2LjdILTE3Mi40eg0KCQkgTS0x' +
            'NDkuNSwzOTkuNWgxMi4yYy0wLjQsNi4xLTIuMiwxMS44LTUuMiwxNi43aC05LjZDLTE1MC42LDQxMS4xLTE0OS43LDQwNS41LTE0OS41LDM5OS41eiBNLTE0NiwzNzIuOGgtNy44DQoJCWMtMS42LTQtMy42LTcuNS02LTEwLjRDLTE1NC40LDM2NC44LTE0OS43LDM2OC40LTE0NiwzNzIuOHogTS0xOTAuMywzNjIuNmMtMi4zLDIuOC00LjMsNi4zLTUuOSwxMC4yaC03LjYNCgkJQy0yMDAuMiwzNjguNC0xOTUuNiwzNjQuOS0xOTAuMywzNjIuNnogTS0yMDMuOCw0MjEuMmg3LjZjMS42LDMuOSwzLjYsNy40LDUuOSwxMC4yQy0xOTUuNiw0MjktMjAwLjIsNDI1LjUtMjAzLjgsNDIxLjJ6DQoJCSBNLT' +
            'E1OS44LDQzMS41YzIuMy0yLjgsNC4zLTYuMyw2LTEwLjNoNy44Qy0xNDkuNyw0MjUuNi0xNTQuNCw0MjkuMi0xNTkuOCw0MzEuNXoiLz4NCjwvZz4NCjwvc3ZnPg0K';
        me._ht_url_image_newpage__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;ht_url_image_newpage;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "ht_url_image_newpage";
        el.ggDx = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 32px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -16px;';
        hs += 'visibility : hidden;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._ht_url_image_newpage.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return me.ggNodeId;
        }
        me._ht_url_image_newpage.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getIsMobile() == true) ||
                (player.getVariableValue('opt_url') == false)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._ht_url_image_newpage.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._ht_url_image_newpage.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._ht_url_image_newpage.style[domTransition] = '';
                if (me._ht_url_image_newpage.ggCurrentLogicStateVisible == 0) {
                    me._ht_url_image_newpage.style.visibility = (Number(me._ht_url_image_newpage.style.opacity) > 0 || !me._ht_url_image_newpage.style.opacity) ? 'inherit' : 'hidden';
                    me._ht_url_image_newpage.ggVisible = true;
                } else {
                    me._ht_url_image_newpage.style.visibility = "hidden";
                    me._ht_url_image_newpage.ggVisible = false;
                }
            }
        }
        me._ht_url_image_newpage.onclick = function (e) {
            player.openUrl(me.hotspot.url, me.hotspot.target);
        }
        me._ht_url_image_newpage.onmouseover = function (e) {
            me._ht_url_image_newpage__img.style.visibility = 'hidden';
            me._ht_url_image_newpage__imgo.style.visibility = 'inherit';
        }
        me._ht_url_image_newpage.onmouseout = function (e) {
            me._ht_url_image_newpage__img.style.visibility = 'inherit';
            me._ht_url_image_newpage__imgo.style.visibility = 'hidden';
        }
        me._ht_url_image_newpage.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
        }
        me._ht_url.appendChild(me._ht_url_image_newpage);
        el = me._tt_ht_url = document.createElement('div');
        els = me._tt_ht_url__text = document.createElement('div');
        el.className = 'ggskin ggskin_textdiv';
        el.ggTextDiv = els;
        el.ggId = "tt_ht_url";
        el.ggDx = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_text ";
        el.ggType = 'text';
        hs = '';
        hs += 'z-index: 100;';
        hs += 'height : 20px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : 21px;';
        hs += 'visibility : hidden;';
        hs += 'width : 100px;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        hs = 'position:absolute;';
        hs += 'box-sizing: border-box;';
        hs += 'cursor: default;';
        hs += 'left: 0px;';
        hs += 'top:  0px;';
        hs += 'width: auto;';
        hs += 'height: auto;';
        hs += 'pointer-events: none;';
        hs += 'background: #000000;';
        hs += 'background: rgba(0,0,0,0.666667);';
        hs += 'border: 0px solid #000000;';
        hs += 'color: rgba(255,255,255,1);';
        hs += 'text-align: center;';
        hs += 'white-space: nowrap;';
        hs += 'padding: 2px 5px 2px 5px;';
        hs += 'overflow: hidden;';
        els.setAttribute('style', hs);
        els.innerHTML = me.hotspot.title;
        el.appendChild(els);
        me._tt_ht_url.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return me.ggNodeId;
        }
        me._tt_ht_url.logicBlock_position = function () {
            var newLogicStatePosition;
            if (
                (player.getIsMobile() == true)
            ) {
                newLogicStatePosition = 0;
            } else {
                newLogicStatePosition = -1;
            }
            if (me._tt_ht_url.ggCurrentLogicStatePosition != newLogicStatePosition) {
                me._tt_ht_url.ggCurrentLogicStatePosition = newLogicStatePosition;
                me._tt_ht_url.style[domTransition] = 'left 0s, top 0s';
                if (me._tt_ht_url.ggCurrentLogicStatePosition == 0) {
                    this.ggDx = 0;
                    me._tt_ht_url.style.top = '-47px';
                    me._tt_ht_url.ggUpdatePosition(true);
                } else {
                    me._tt_ht_url.ggDx = 0;
                    me._tt_ht_url.style.top = '21px';
                    me._tt_ht_url.ggUpdatePosition(true);
                }
            }
        }
        me._tt_ht_url.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (me.elementMouseOver['ht_url'] == true) &&
                (me.hotspot.title != "")
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._tt_ht_url.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._tt_ht_url.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._tt_ht_url.style[domTransition] = 'left 0s, top 0s';
                if (me._tt_ht_url.ggCurrentLogicStateVisible == 0) {
                    me._tt_ht_url.style.visibility = (Number(me._tt_ht_url.style.opacity) > 0 || !me._tt_ht_url.style.opacity) ? 'inherit' : 'hidden';
                    me._tt_ht_url.ggVisible = true;
                } else {
                    me._tt_ht_url.style.visibility = "hidden";
                    me._tt_ht_url.ggVisible = false;
                }
            }
        }
        me._tt_ht_url.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth + 0;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
            this.style[domTransition] = 'left 0';
            this.ggTextDiv.style.left = ((98 - this.ggTextDiv.offsetWidth) / 2) + 'px';
        }
        me._ht_url.appendChild(me._tt_ht_url);
        me.__div = me._ht_url;
    };

    function SkinHotspotClass_ht_info(parentScope, hotspot) {
        var me = this;
        var flag = false;
        var hs = '';
        me.parentScope = parentScope;
        me.hotspot = hotspot;
        var nodeId = String(hotspot.url);
        nodeId = (nodeId.charAt(0) == '{') ? nodeId.substr(1, nodeId.length - 2) : '';
        me.ggUserdata = skin.player.getNodeUserdata(nodeId);
        me.elementMouseDown = [];
        me.elementMouseOver = [];
        me.findElements = function (id, regex) {
            return skin.findElements(id, regex);
        }
        el = me._ht_info = document.createElement('div');
        el.ggId = "ht_info";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_hotspot ";
        el.ggType = 'hotspot';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 0px;';
        hs += 'left : 250px;';
        hs += 'opacity : 0;';
        hs += 'position : absolute;';
        hs += 'top : 50px;';
        hs += 'visibility : hidden;';
        hs += 'width : 0px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._ht_info.ggIsActive = function () {
            return player.getCurrentNode() == this.ggElementNodeId();
        }
        el.ggElementNodeId = function () {
            return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
        }
        me._ht_info.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('vis_userdata') == true) ||
                (player.getVariableValue('vis_image_popup') == true) ||
                (player.getVariableValue('vis_info_popup') == true) ||
                (player.getVariableValue('vis_video_popup_file') == true) ||
                (player.getVariableValue('vis_video_popup_url') == true) ||
                (player.getVariableValue('vis_video_popup_vimeo') == true) ||
                (player.getVariableValue('vis_video_popup_youtube') == true) ||
                (player.getVariableValue('vis_website') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._ht_info.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._ht_info.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._ht_info.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._ht_info.ggCurrentLogicStateVisible == 0) {
                    me._ht_info.style.visibility = "hidden";
                    me._ht_info.ggVisible = false;
                } else {
                    me._ht_info.style.visibility = (Number(me._ht_info.style.opacity) > 0 || !me._ht_info.style.opacity) ? 'inherit' : 'hidden';
                    me._ht_info.ggVisible = true;
                }
            }
        }
        me._ht_info.logicBlock_alpha = function () {
            var newLogicStateAlpha;
            if (
                (player.getVariableValue('vis_timer') == true)
            ) {
                newLogicStateAlpha = 0;
            } else {
                newLogicStateAlpha = -1;
            }
            if (me._ht_info.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
                me._ht_info.ggCurrentLogicStateAlpha = newLogicStateAlpha;
                me._ht_info.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._ht_info.ggCurrentLogicStateAlpha == 0) {
                    me._ht_info.style.visibility = me._ht_info.ggVisible ? 'inherit' : 'hidden';
                    me._ht_info.style.opacity = 1;
                } else {
                    me._ht_info.style.visibility = "hidden";
                    me._ht_info.style.opacity = 0;
                }
            }
        }
        me._ht_info.onclick = function (e) {
            skin._info_title.ggText = me.hotspot.title;
            skin._info_title.ggTextDiv.innerHTML = skin._info_title.ggText;
            if (skin._info_title.ggUpdateText) {
                skin._info_title.ggUpdateText = function () {
                    var hs = me.hotspot.title;
                    if (hs != this.ggText) {
                        this.ggText = hs;
                        this.ggTextDiv.innerHTML = hs;
                        if (this.ggUpdatePosition) this.ggUpdatePosition();
                    }
                }
            }
            if (skin._info_title.ggUpdatePosition) {
                skin._info_title.ggUpdatePosition();
            }
            skin._info_title.ggTextDiv.scrollTop = 0;
            skin._info_text_body.ggText = me.hotspot.description;
            skin._info_text_body.ggTextDiv.innerHTML = skin._info_text_body.ggText;
            if (skin._info_text_body.ggUpdateText) {
                skin._info_text_body.ggUpdateText = function () {
                    var hs = me.hotspot.description;
                    if (hs != this.ggText) {
                        this.ggText = hs;
                        this.ggTextDiv.innerHTML = hs;
                        if (this.ggUpdatePosition) this.ggUpdatePosition();
                    }
                }
            }
            if (skin._info_text_body.ggUpdatePosition) {
                skin._info_text_body.ggUpdatePosition();
            }
            skin._info_text_body.ggTextDiv.scrollTop = 0;
            player.setVariableValue('vis_info_popup', true);
            skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
        }
        me._ht_info.ondblclick = function (e) {
            skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
        }
        me._ht_info.onmouseover = function (e) {
            player.setActiveHotspot(me.hotspot);
            me.elementMouseOver['ht_info'] = true;
            me._tt_information.logicBlock_visible();
            skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
        }
        me._ht_info.onmouseout = function (e) {
            player.setActiveHotspot(null);
            me.elementMouseOver['ht_info'] = false;
            me._tt_information.logicBlock_visible();
            skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
        }
        me._ht_info.ontouchend = function (e) {
            me.elementMouseOver['ht_info'] = false;
            me._tt_information.logicBlock_visible();
        }
        me._ht_info.ggUpdatePosition = function (useTransition) {
        }
        el = me._ht_info_image = document.createElement('div');
        els = me._ht_info_image__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE3NSwzNDAuOWMtMzEsMC01Ni4xLDI1LjEtNTYuMSw1Ni4xczI1LjEsNTYuMSw1Ni4xLDU2LjFjMzEsMCw1Ni4xLTI1LjEsNTYuMS01Ni4xUy0xNDQsMzQwLjktMTc1LDM0MC45DQoJCXogTS0xNzguMSwzNjEuMWw2LjIsMGMzLjUsMCw2LjQsMi45LDYuNCw2LjR2Mi45YzAsMy41LTIuOSw2LjQtNi40LDYuNGgtNi4yYy0zLjUsMC02LjQtMi45LTYuNC02LjRsMC0yLjkNCgkJQy0xODQuNSwzNjQtMTgxLjYsMzYxLjEtMTc4LjEsMzYxLjF6IE0tMTY3LDQzMC40SC0xODNjLTAuOCwwLTEuNS0wLjctMS41LTEuNWwwLTM3' +
            'LjdjMC0wLjgsMC43LTEuNSwxLjUtMS41bDE1LjksMA0KCQljMC44LDAsMS41LDAuNywxLjUsMS41bDAsMzcuN0MtMTY1LjUsNDI5LjctMTY2LjIsNDMwLjQtMTY3LDQzMC40eiIvPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KCTxnPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTE2NS41LDM5MS4yYzAtMC44LTAuNy0xLjUtMS41LTEuNWwtMTUuOSwwYy0wLjgsMC0xLjUsMC43LTEuNSwxLjVsMCwzNy43YzAsMC44LDAuNywxLjUsMS41LDEuNWgxNS45DQoJCQljMC44LDAsMS41LTAuNywxLjUtMS41TC0xNjUuNSwzOTEuMnoiLz4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xNz' +
            'guMSwzNzYuOGg2LjJjMy41LDAsNi40LTIuOSw2LjQtNi40di0yLjljMC0zLjUtMi45LTYuNC02LjQtNi40bC02LjIsMGMtMy41LDAtNi40LDIuOS02LjQsNi40bDAsMi45DQoJCQlDLTE4NC41LDM3NC0xODEuNiwzNzYuOC0xNzguMSwzNzYuOHoiLz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==';
        me._ht_info_image__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;ht_info_image;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._ht_info_image__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE3NSwzMzQuNmMtMzQuNCwwLTYyLjQsMjcuOS02Mi40LDYyLjRzMjcuOSw2Mi40LDYyLjQsNjIuNGMzNC40LDAsNjIuNC0yNy45LDYyLjQtNjIuNA0KCQlTLTE0MC42LDMzNC42LTE3NSwzMzQuNnogTS0xNzguNSwzNTcuMWw2LjksMGMzLjksMCw3LjEsMy4yLDcuMSw3LjF2My4zYzAsMy45LTMuMiw3LjEtNy4xLDcuMWgtNi45Yy0zLjksMC03LjEtMy4yLTcuMS03LjFsMC0zLjMNCgkJQy0xODUuNiwzNjAuMy0xODIuNCwzNTcuMS0xNzguNSwzNTcuMXogTS0xNjYuMSw0MzQuMWgtMTcuN2MtMC45LDAtMS43LTAuOC0x' +
            'LjctMS43bDAtNDEuOWMwLTAuOSwwLjgtMS43LDEuNy0xLjdsMTcuNywwDQoJCWMwLjksMCwxLjcsMC44LDEuNywxLjdsMCw0MS45Qy0xNjQuNCw0MzMuMy0xNjUuMiw0MzQuMS0xNjYuMSw0MzQuMXoiLz4NCjwvZz4NCjxnIGlkPSJMYXllcl8yIj4NCgk8Zz4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xNjQuNCwzOTAuNWMwLTAuOS0wLjgtMS43LTEuNy0xLjdsLTE3LjcsMGMtMC45LDAtMS43LDAuOC0xLjcsMS43bDAsNDEuOWMwLDAuOSwwLjgsMS43LDEuNywxLjdoMTcuNw0KCQkJYzAuOSwwLDEuNy0wLjgsMS43LTEuN0wtMTY0LjQsMzkwLjV6Ii8+DQoJCTxwYXRoIGZpbGw9IiNGRk' +
            'ZGRkYiIGQ9Ik0tMTc4LjUsMzc0LjZoNi45YzMuOSwwLDcuMS0zLjIsNy4xLTcuMXYtMy4zYzAtMy45LTMuMi03LjEtNy4xLTcuMWwtNi45LDBjLTMuOSwwLTcuMSwzLjItNy4xLDcuMWwwLDMuMw0KCQkJQy0xODUuNSwzNzEuNC0xODIuNCwzNzQuNi0xNzguNSwzNzQuNnoiLz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==';
        me._ht_info_image__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;ht_info_image;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "ht_info_image";
        el.ggDx = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'height : 32px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -16px;';
        hs += 'visibility : inherit;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._ht_info_image.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return me.ggNodeId;
        }
        me._ht_info_image.onmouseover = function (e) {
            me._ht_info_image__img.style.visibility = 'hidden';
            me._ht_info_image__imgo.style.visibility = 'inherit';
        }
        me._ht_info_image.onmouseout = function (e) {
            me._ht_info_image__img.style.visibility = 'inherit';
            me._ht_info_image__imgo.style.visibility = 'hidden';
        }
        me._ht_info_image.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
        }
        me._ht_info.appendChild(me._ht_info_image);
        el = me._tt_information = document.createElement('div');
        els = me._tt_information__text = document.createElement('div');
        el.className = 'ggskin ggskin_textdiv';
        el.ggTextDiv = els;
        el.ggId = "tt_information";
        el.ggDx = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_text ";
        el.ggType = 'text';
        hs = '';
        hs += 'z-index: 100;';
        hs += 'height : 20px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : 21px;';
        hs += 'visibility : hidden;';
        hs += 'width : 100px;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        hs = 'position:absolute;';
        hs += 'box-sizing: border-box;';
        hs += 'cursor: default;';
        hs += 'left: 0px;';
        hs += 'top:  0px;';
        hs += 'width: auto;';
        hs += 'height: auto;';
        hs += 'pointer-events: none;';
        hs += 'background: #000000;';
        hs += 'background: rgba(0,0,0,0.666667);';
        hs += 'border: 0px solid #000000;';
        hs += 'color: rgba(255,255,255,1);';
        hs += 'text-align: center;';
        hs += 'white-space: nowrap;';
        hs += 'padding: 2px 5px 2px 5px;';
        hs += 'overflow: hidden;';
        els.setAttribute('style', hs);
        els.innerHTML = me.hotspot.title;
        el.appendChild(els);
        me._tt_information.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return me.ggNodeId;
        }
        me._tt_information.logicBlock_position = function () {
            var newLogicStatePosition;
            if (
                (player.getIsMobile() == true)
            ) {
                newLogicStatePosition = 0;
            } else {
                newLogicStatePosition = -1;
            }
            if (me._tt_information.ggCurrentLogicStatePosition != newLogicStatePosition) {
                me._tt_information.ggCurrentLogicStatePosition = newLogicStatePosition;
                me._tt_information.style[domTransition] = 'left 0s, top 0s';
                if (me._tt_information.ggCurrentLogicStatePosition == 0) {
                    this.ggDx = 0;
                    me._tt_information.style.top = '-47px';
                    me._tt_information.ggUpdatePosition(true);
                } else {
                    me._tt_information.ggDx = 0;
                    me._tt_information.style.top = '21px';
                    me._tt_information.ggUpdatePosition(true);
                }
            }
        }
        me._tt_information.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (me.elementMouseOver['ht_info'] == true) &&
                (me.hotspot.title != "")
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._tt_information.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._tt_information.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._tt_information.style[domTransition] = 'left 0s, top 0s';
                if (me._tt_information.ggCurrentLogicStateVisible == 0) {
                    me._tt_information.style.visibility = (Number(me._tt_information.style.opacity) > 0 || !me._tt_information.style.opacity) ? 'inherit' : 'hidden';
                    me._tt_information.ggVisible = true;
                } else {
                    me._tt_information.style.visibility = "hidden";
                    me._tt_information.ggVisible = false;
                }
            }
        }
        me._tt_information.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth + 0;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
            this.style[domTransition] = 'left 0';
            this.ggTextDiv.style.left = ((98 - this.ggTextDiv.offsetWidth) / 2) + 'px';
        }
        me._ht_info.appendChild(me._tt_information);
        me.__div = me._ht_info;
    };

    function SkinHotspotClass_ht_image(parentScope, hotspot) {
        var me = this;
        var flag = false;
        var hs = '';
        me.parentScope = parentScope;
        me.hotspot = hotspot;
        var nodeId = String(hotspot.url);
        nodeId = (nodeId.charAt(0) == '{') ? nodeId.substr(1, nodeId.length - 2) : '';
        me.ggUserdata = skin.player.getNodeUserdata(nodeId);
        me.elementMouseDown = [];
        me.elementMouseOver = [];
        me.findElements = function (id, regex) {
            return skin.findElements(id, regex);
        }
        el = me._ht_image = document.createElement('div');
        el.ggId = "ht_image";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_hotspot ";
        el.ggType = 'hotspot';
        hs = '';
        hs += 'height : 0px;';
        hs += 'left : 250px;';
        hs += 'opacity : 0;';
        hs += 'position : absolute;';
        hs += 'top : 50px;';
        hs += 'visibility : hidden;';
        hs += 'width : 0px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._ht_image.ggIsActive = function () {
            return player.getCurrentNode() == this.ggElementNodeId();
        }
        el.ggElementNodeId = function () {
            return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
        }
        me._ht_image.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('vis_userdata') == true) ||
                (player.getVariableValue('vis_image_popup') == true) ||
                (player.getVariableValue('vis_info_popup') == true) ||
                (player.getVariableValue('vis_video_popup_file') == true) ||
                (player.getVariableValue('vis_video_popup_url') == true) ||
                (player.getVariableValue('vis_video_popup_vimeo') == true) ||
                (player.getVariableValue('vis_video_popup_youtube') == true) ||
                (player.getVariableValue('vis_website') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._ht_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._ht_image.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._ht_image.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._ht_image.ggCurrentLogicStateVisible == 0) {
                    me._ht_image.style.visibility = "hidden";
                    me._ht_image.ggVisible = false;
                } else {
                    me._ht_image.style.visibility = (Number(me._ht_image.style.opacity) > 0 || !me._ht_image.style.opacity) ? 'inherit' : 'hidden';
                    me._ht_image.ggVisible = true;
                }
            }
        }
        me._ht_image.logicBlock_alpha = function () {
            var newLogicStateAlpha;
            if (
                (player.getVariableValue('vis_timer') == true)
            ) {
                newLogicStateAlpha = 0;
            } else {
                newLogicStateAlpha = -1;
            }
            if (me._ht_image.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
                me._ht_image.ggCurrentLogicStateAlpha = newLogicStateAlpha;
                me._ht_image.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._ht_image.ggCurrentLogicStateAlpha == 0) {
                    me._ht_image.style.visibility = me._ht_image.ggVisible ? 'inherit' : 'hidden';
                    me._ht_image.style.opacity = 1;
                } else {
                    me._ht_image.style.visibility = "hidden";
                    me._ht_image.style.opacity = 0;
                }
            }
        }
        me._ht_image.onclick = function (e) {
            skin._popup_image.ggText = player.getBasePath() + "" + me.hotspot.url;
            skin._popup_image.ggSubElement.style.width = '0px';
            skin._popup_image.ggSubElement.style.height = '0px';
            skin._popup_image.ggSubElement.src = '';
            skin._popup_image.ggSubElement.src = skin._popup_image.ggText;
            player.setVariableValue('vis_image_popup', true);
            skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
        }
        me._ht_image.ondblclick = function (e) {
            skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
        }
        me._ht_image.onmouseover = function (e) {
            player.setActiveHotspot(me.hotspot);
            me.elementMouseOver['ht_image'] = true;
            me._tt_ht_image.logicBlock_visible();
            skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
        }
        me._ht_image.onmouseout = function (e) {
            player.setActiveHotspot(null);
            me.elementMouseOver['ht_image'] = false;
            me._tt_ht_image.logicBlock_visible();
            skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
        }
        me._ht_image.ontouchend = function (e) {
            me.elementMouseOver['ht_image'] = false;
            me._tt_ht_image.logicBlock_visible();
        }
        me._ht_image.ggUpdatePosition = function (useTransition) {
        }
        el = me._ht_image_image = document.createElement('div');
        els = me._ht_image_image__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8Zz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xOTYuMyw0MTQuN2g0Mi43di00NGgtNDIuN1Y0MTQuN3ogTS0xNTUuNSw0MTIuOUgtMTgzbDE5LTE4LjZjMC4zLTAuMywwLjYtMC40LDEtMC40DQoJCQljMC40LDAsMC43LDAuMSwxLDAuNGw2LjUsNi40VjQxMi45eiBNLTE2Mi45LDM3NmMyLjIsMCw0LDEuOCw0LDRjMCwyLjItMS44LDQtNCw0Yy0yLjIsMC00LTEuOC00LTQNCgkJCUMtMTY2LjgsMzc3LjgtMTY1LjEsMzc2LTE2Mi45LDM3NnogTS0xOTQuNSwzOTcuOGw5LjctOS40YzAuMy0wLjMsMC42LTAuNCwxLTAuNGMwLjQsMCwwLjcsMC4xLDEsMC40' +
            'bDExLjIsMTAuOWwtMTMuOSwxMy42aC05DQoJCQlMLTE5NC41LDM5Ny44TC0xOTQuNSwzOTcuOHoiLz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xNzUsMzQwLjljLTMxLDAtNTYuMSwyNS4xLTU2LjEsNTYuMWMwLDMxLDI1LjEsNTYuMSw1Ni4xLDU2LjFzNTYuMS0yNS4xLDU2LjEtNTYuMQ0KCQkJUy0xNDQsMzQwLjktMTc1LDM0MC45eiBNLTE0OS41LDQyNS41YzAsMS4zLTEsMi4zLTIuMywyLjNoLTQ2LjRjLTEuMywwLTIuMy0xLTIuMy0yLjN2LTU3YzAtMS4zLDEtMi4zLDIuMy0yLjNoNDYuNA0KCQkJYzEuMywwLDIuMywxLDIuMywyLjNMLTE0OS41LDQyNS41TC0xNDkuNSw0MjUuNX' +
            'oiLz4NCgk8L2c+DQo8L2c+DQo8ZyBpZD0iTGF5ZXJfMiI+DQoJPGc+DQoJCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTUxLjgsMzY2LjJoLTQ2LjRjLTEuMywwLTIuMywxLTIuMywyLjN2NTdjMCwxLjMsMSwyLjMsMi4zLDIuM2g0Ni40YzEuMywwLDIuMy0xLDIuMy0yLjN2LTU3DQoJCQlDLTE0OS41LDM2Ny4yLTE1MC41LDM2Ni4yLTE1MS44LDM2Ni4yeiBNLTE1My43LDQxNC43aC00Mi43di00NGg0Mi43VjQxNC43eiIvPg0KCQk8Y2lyY2xlIGZpbGw9IiNGRkZGRkYiIGN4PSItMTYyLjkiIGN5PSIzNzkuOSIgcj0iNCIvPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTE3MS43LDM5' +
            'OS4zbC0xMS4yLTEwLjljLTAuMy0wLjMtMC42LTAuNC0xLTAuNHMtMC43LDAuMS0xLDAuNGwtOS43LDkuNHYxNS4xaDlMLTE3MS43LDM5OS4zeiIvPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTE2MywzOTMuOWMtMC40LDAtMC43LDAuMS0xLDAuNGwtMTksMTguNmgyNy41di0xMi4ybC02LjUtNi40Qy0xNjIuMiwzOTQtMTYyLjYsMzkzLjktMTYzLDM5My45eiIvPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K';
        me._ht_image_image__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;ht_image_image;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._ht_image_image__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8Zz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xOTguNyw0MTYuNmg0Ny40di00OC45aC00Ny40VjQxNi42eiBNLTE1My4zLDQxNC42aC0zMC42bDIxLjEtMjAuNmMwLjMtMC4zLDAuNy0wLjUsMS4xLTAuNQ0KCQkJYzAuNCwwLDAuOCwwLjIsMS4xLDAuNWw3LjIsNy4xVjQxNC42eiBNLTE2MS41LDM3My42YzIuNCwwLDQuNCwyLDQuNCw0LjRjMCwyLjQtMiw0LjQtNC40LDQuNHMtNC40LTItNC40LTQuNA0KCQkJQy0xNjUuOSwzNzUuNi0xNjQsMzczLjYtMTYxLjUsMzczLjZ6IE0tMTk2LjcsMzk3LjlsMTAuNy0xMC41YzAuMy0wLjMsMC43LTAuNSwxLjEt' +
            'MC41czAuOCwwLjIsMS4xLDAuNGwxMi40LDEyLjJsLTE1LjQsMTUuMWgtMTANCgkJCUwtMTk2LjcsMzk3LjlMLTE5Ni43LDM5Ny45eiIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTE3NSwzMzQuNmMtMzQuNCwwLTYyLjQsMjcuOS02Mi40LDYyLjRjMCwzNC40LDI3LjksNjIuNCw2Mi40LDYyLjRzNjIuNC0yNy45LDYyLjQtNjIuNA0KCQkJUy0xNDAuNiwzMzQuNi0xNzUsMzM0LjZ6IE0tMTQ2LjcsNDI4LjdjMCwxLjQtMS4xLDIuNi0yLjYsMi42aC01MS42Yy0xLjQsMC0yLjYtMS4xLTIuNi0yLjZ2LTYzLjRjMC0xLjQsMS4xLTIuNiwyLjYtMi42aDUxLjYNCgkJCWMxLjQsMCwyLjYsMS' +
            '4xLDIuNiwyLjZMLTE0Ni43LDQyOC43TC0xNDYuNyw0MjguN3oiLz4NCgk8L2c+DQo8L2c+DQo8ZyBpZD0iTGF5ZXJfMiI+DQoJPGc+DQoJCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTQ5LjIsMzYyLjhoLTUxLjZjLTEuNCwwLTIuNiwxLjEtMi42LDIuNnY2My40YzAsMS40LDEuMSwyLjYsMi42LDIuNmg1MS42YzEuNCwwLDIuNi0xLjEsMi42LTIuNnYtNjMuNA0KCQkJQy0xNDYuNywzNjMuOS0xNDcuOCwzNjIuOC0xNDkuMiwzNjIuOHogTS0xNTEuMyw0MTYuNmgtNDcuNHYtNDguOWg0Ny40VjQxNi42eiIvPg0KCQk8Y2lyY2xlIGZpbGw9IiNGRkZGRkYiIGN4PSItMTYxLjUiIGN5PSIzNzgi' +
            'IHI9IjQuNCIvPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTE3MS4zLDM5OS41bC0xMi40LTEyLjJjLTAuMy0wLjMtMC43LTAuNC0xLjEtMC40Yy0wLjQsMC0wLjgsMC4yLTEuMSwwLjVsLTEwLjcsMTAuNXYxNi44aDEwDQoJCQlMLTE3MS4zLDM5OS41eiIvPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTE2MS42LDM5My41Yy0wLjQsMC0wLjgsMC4yLTEuMSwwLjVsLTIxLjEsMjAuNmgzMC42VjQwMWwtNy4yLTcuMUMtMTYwLjgsMzkzLjctMTYxLjIsMzkzLjUtMTYxLjYsMzkzLjUNCgkJCXoiLz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==';
        me._ht_image_image__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;ht_image_image;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "ht_image_image";
        el.ggDx = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 32px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -16px;';
        hs += 'visibility : inherit;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._ht_image_image.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return me.ggNodeId;
        }
        me._ht_image_image.onmouseover = function (e) {
            me._ht_image_image__img.style.visibility = 'hidden';
            me._ht_image_image__imgo.style.visibility = 'inherit';
        }
        me._ht_image_image.onmouseout = function (e) {
            me._ht_image_image__img.style.visibility = 'inherit';
            me._ht_image_image__imgo.style.visibility = 'hidden';
        }
        me._ht_image_image.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
        }
        me._ht_image.appendChild(me._ht_image_image);
        el = me._tt_ht_image = document.createElement('div');
        els = me._tt_ht_image__text = document.createElement('div');
        el.className = 'ggskin ggskin_textdiv';
        el.ggTextDiv = els;
        el.ggId = "tt_ht_image";
        el.ggDx = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_text ";
        el.ggType = 'text';
        hs = '';
        hs += 'z-index: 100;';
        hs += 'height : 20px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : 21px;';
        hs += 'visibility : hidden;';
        hs += 'width : 100px;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        hs = 'position:absolute;';
        hs += 'box-sizing: border-box;';
        hs += 'cursor: default;';
        hs += 'left: 0px;';
        hs += 'top:  0px;';
        hs += 'width: auto;';
        hs += 'height: auto;';
        hs += 'pointer-events: none;';
        hs += 'background: #000000;';
        hs += 'background: rgba(0,0,0,0.666667);';
        hs += 'border: 0px solid #000000;';
        hs += 'color: rgba(255,255,255,1);';
        hs += 'text-align: center;';
        hs += 'white-space: nowrap;';
        hs += 'padding: 2px 5px 2px 5px;';
        hs += 'overflow: hidden;';
        els.setAttribute('style', hs);
        els.innerHTML = me.hotspot.title;
        el.appendChild(els);
        me._tt_ht_image.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return me.ggNodeId;
        }
        me._tt_ht_image.logicBlock_position = function () {
            var newLogicStatePosition;
            if (
                (player.getIsMobile() == true)
            ) {
                newLogicStatePosition = 0;
            } else {
                newLogicStatePosition = -1;
            }
            if (me._tt_ht_image.ggCurrentLogicStatePosition != newLogicStatePosition) {
                me._tt_ht_image.ggCurrentLogicStatePosition = newLogicStatePosition;
                me._tt_ht_image.style[domTransition] = 'left 0s, top 0s';
                if (me._tt_ht_image.ggCurrentLogicStatePosition == 0) {
                    this.ggDx = 0;
                    me._tt_ht_image.style.top = '-47px';
                    me._tt_ht_image.ggUpdatePosition(true);
                } else {
                    me._tt_ht_image.ggDx = 0;
                    me._tt_ht_image.style.top = '21px';
                    me._tt_ht_image.ggUpdatePosition(true);
                }
            }
        }
        me._tt_ht_image.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (me.elementMouseOver['ht_image'] == true) &&
                (me.hotspot.title != "")
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._tt_ht_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._tt_ht_image.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._tt_ht_image.style[domTransition] = 'left 0s, top 0s';
                if (me._tt_ht_image.ggCurrentLogicStateVisible == 0) {
                    me._tt_ht_image.style.visibility = (Number(me._tt_ht_image.style.opacity) > 0 || !me._tt_ht_image.style.opacity) ? 'inherit' : 'hidden';
                    me._tt_ht_image.ggVisible = true;
                } else {
                    me._tt_ht_image.style.visibility = "hidden";
                    me._tt_ht_image.ggVisible = false;
                }
            }
        }
        me._tt_ht_image.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth + 0;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
            this.style[domTransition] = 'left 0';
            this.ggTextDiv.style.left = ((98 - this.ggTextDiv.offsetWidth) / 2) + 'px';
        }
        me._ht_image.appendChild(me._tt_ht_image);
        me.__div = me._ht_image;
    };

    function SkinHotspotClass_ht_video_file(parentScope, hotspot) {
        var me = this;
        var flag = false;
        var hs = '';
        me.parentScope = parentScope;
        me.hotspot = hotspot;
        var nodeId = String(hotspot.url);
        nodeId = (nodeId.charAt(0) == '{') ? nodeId.substr(1, nodeId.length - 2) : '';
        me.ggUserdata = skin.player.getNodeUserdata(nodeId);
        me.elementMouseDown = [];
        me.elementMouseOver = [];
        me.findElements = function (id, regex) {
            return skin.findElements(id, regex);
        }
        el = me._ht_video_file = document.createElement('div');
        el.ggId = "ht_video_file";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_hotspot ";
        el.ggType = 'hotspot';
        hs = '';
        hs += 'height : 0px;';
        hs += 'left : 250px;';
        hs += 'opacity : 0;';
        hs += 'position : absolute;';
        hs += 'top : 50px;';
        hs += 'visibility : hidden;';
        hs += 'width : 0px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._ht_video_file.ggIsActive = function () {
            return player.getCurrentNode() == this.ggElementNodeId();
        }
        el.ggElementNodeId = function () {
            return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
        }
        me._ht_video_file.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('vis_userdata') == true) ||
                (player.getVariableValue('vis_image_popup') == true) ||
                (player.getVariableValue('vis_info_popup') == true) ||
                (player.getVariableValue('vis_video_popup_file') == true) ||
                (player.getVariableValue('vis_video_popup_url') == true) ||
                (player.getVariableValue('vis_video_popup_vimeo') == true) ||
                (player.getVariableValue('vis_video_popup_youtube') == true) ||
                (player.getVariableValue('vis_website') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._ht_video_file.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._ht_video_file.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._ht_video_file.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._ht_video_file.ggCurrentLogicStateVisible == 0) {
                    me._ht_video_file.style.visibility = "hidden";
                    me._ht_video_file.ggVisible = false;
                } else {
                    me._ht_video_file.style.visibility = (Number(me._ht_video_file.style.opacity) > 0 || !me._ht_video_file.style.opacity) ? 'inherit' : 'hidden';
                    me._ht_video_file.ggVisible = true;
                }
            }
        }
        me._ht_video_file.logicBlock_alpha = function () {
            var newLogicStateAlpha;
            if (
                (player.getVariableValue('vis_timer') == true)
            ) {
                newLogicStateAlpha = 0;
            } else {
                newLogicStateAlpha = -1;
            }
            if (me._ht_video_file.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
                me._ht_video_file.ggCurrentLogicStateAlpha = newLogicStateAlpha;
                me._ht_video_file.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._ht_video_file.ggCurrentLogicStateAlpha == 0) {
                    me._ht_video_file.style.visibility = me._ht_video_file.ggVisible ? 'inherit' : 'hidden';
                    me._ht_video_file.style.opacity = 1;
                } else {
                    me._ht_video_file.style.visibility = "hidden";
                    me._ht_video_file.style.opacity = 0;
                }
            }
        }
        me._ht_video_file.onclick = function (e) {
            skin._popup_video_file.ggInitMedia(player.getBasePath() + "" + me.hotspot.url);
            player.setVariableValue('vis_video_popup_file', true);
            skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
        }
        me._ht_video_file.ondblclick = function (e) {
            skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
        }
        me._ht_video_file.onmouseover = function (e) {
            player.setActiveHotspot(me.hotspot);
            me.elementMouseOver['ht_video_file'] = true;
            me._tt_ht_video_file.logicBlock_visible();
            skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
        }
        me._ht_video_file.onmouseout = function (e) {
            player.setActiveHotspot(null);
            me.elementMouseOver['ht_video_file'] = false;
            me._tt_ht_video_file.logicBlock_visible();
            skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
        }
        me._ht_video_file.ontouchend = function (e) {
            me.elementMouseOver['ht_video_file'] = false;
            me._tt_ht_video_file.logicBlock_visible();
        }
        me._ht_video_file.ggUpdatePosition = function (useTransition) {
        }
        el = me._ht_video_file_image = document.createElement('div');
        els = me._ht_video_file_image__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8Zz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xNzUsMzQwLjljLTMxLDAtNTYuMSwyNS4xLTU2LjEsNTYuMWMwLDMxLDI1LjEsNTYuMSw1Ni4xLDU2LjFzNTYuMS0yNS4xLDU2LjEtNTYuMQ0KCQkJQy0xMTguOSwzNjYtMTQ0LDM0MC45LTE3NSwzNDAuOXogTS0xMzkuNCw0MjEuN2MwLDEuMy0xLDIuMy0yLjMsMi4zaC02Ni43Yy0xLjMsMC0yLjMtMS0yLjMtMi4zdi00OS40YzAtMS4zLDEtMi4zLDIuMy0yLjNoNjYuNw0KCQkJYzEuMywwLDIuMywxLDIuMywyLjNWNDIxLjd6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTc4LjQsNDA1bDEw' +
            'LjgtNy41YzAuNy0wLjUsMC43LTEuMywwLTEuOGwtMTAuOC03LjVjLTAuNy0wLjUtMS4zLTAuMi0xLjMsMC43djE1LjUNCgkJCUMtMTc5LjcsNDA1LjItMTc5LjEsNDA1LjUtMTc4LjQsNDA1eiIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTIwNi41LDQxNS4xaDYyLjR2LTM2LjFoLTYyLjRWNDE1LjF6IE0tMTc1LDM4Mi4xYzgsMCwxNC40LDYuNSwxNC40LDE0LjRjMCw4LTYuNSwxNC40LTE0LjQsMTQuNA0KCQkJYy04LDAtMTQuNC02LjUtMTQuNC0xNC40Qy0xODkuNCwzODguNi0xODMsMzgyLjEtMTc1LDM4Mi4xeiIvPg0KCTwvZz4NCjwvZz4NCjxnIGlkPSJMYXllcl8yIj4NCgk8Zz' +
            '4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xNDEuNywzNzBoLTY2LjdjLTEuMywwLTIuMywxLTIuMywyLjN2NDkuNGMwLDEuMywxLDIuMywyLjMsMi4zaDY2LjdjMS4zLDAsMi4zLTEsMi4zLTIuM3YtNDkuNA0KCQkJQy0xMzkuNCwzNzEtMTQwLjQsMzcwLTE0MS43LDM3MHogTS0xNDQuMiw0MTUuMWgtNjIuNHYtMzYuMWg2Mi40Qy0xNDQuMiwzNzguOS0xNDQuMiw0MTUuMS0xNDQuMiw0MTUuMXoiLz4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xNzUsNDExYzgsMCwxNC40LTYuNSwxNC40LTE0LjRjMC04LTYuNS0xNC40LTE0LjQtMTQuNGMtOCwwLTE0LjQsNi41LTE0LjQsMTQu' +
            'NA0KCQkJQy0xODkuNCw0MDQuNS0xODMsNDExLTE3NSw0MTF6IE0tMTc5LjcsMzg4LjhjMC0wLjgsMC42LTEuMSwxLjMtMC43bDEwLjgsNy41YzAuNywwLjUsMC43LDEuMywwLDEuOGwtMTAuOCw3LjUNCgkJCWMtMC43LDAuNS0xLjMsMC4yLTEuMy0wLjdWMzg4Ljh6Ii8+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo=';
        me._ht_video_file_image__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;ht_video_file_image;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._ht_video_file_image__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8Zz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xNzUsMzM0LjZjLTM0LjQsMC02Mi40LDI3LjktNjIuNCw2Mi40YzAsMzQuNCwyNy45LDYyLjQsNjIuNCw2Mi40czYyLjQtMjcuOSw2Mi40LTYyLjQNCgkJCUMtMTEyLjYsMzYyLjYtMTQwLjYsMzM0LjYtMTc1LDMzNC42eiBNLTEzNS40LDQyNC40YzAsMS40LTEuMSwyLjYtMi42LDIuNkgtMjEyYy0xLjQsMC0yLjYtMS4xLTIuNi0yLjZ2LTU0LjkNCgkJCWMwLTEuNCwxLjEtMi42LDIuNi0yLjZoNzQuMWMxLjQsMCwyLjYsMS4xLDIuNiwyLjZWNDI0LjR6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9' +
            'Ik0tMTc4LjgsNDA1LjlsMTItOC40YzAuOC0wLjUsMC44LTEuNCwwLTEuOWwtMTItOC40Yy0wLjgtMC41LTEuNC0wLjItMS40LDAuN3YxNy4zDQoJCQlDLTE4MC4yLDQwNi4xLTE3OS42LDQwNi40LTE3OC44LDQwNS45eiIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTIxMCw0MTcuMWg2OS4zdi00MC4ySC0yMTBWNDE3LjF6IE0tMTc1LDM4MC41YzguOSwwLDE2LDcuMiwxNiwxNmMwLDguOS03LjIsMTYtMTYsMTYNCgkJCWMtOC45LDAtMTYtNy4yLTE2LTE2Qy0xOTEsMzg3LjctMTgzLjksMzgwLjUtMTc1LDM4MC41eiIvPg0KCTwvZz4NCjwvZz4NCjxnIGlkPSJMYXllcl8yIj4NCgk8Zz' +
            '4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xMzgsMzY3SC0yMTJjLTEuNCwwLTIuNiwxLjEtMi42LDIuNnY1NC45YzAsMS40LDEuMSwyLjYsMi42LDIuNmg3NC4xYzEuNCwwLDIuNi0xLjEsMi42LTIuNnYtNTQuOQ0KCQkJQy0xMzUuNCwzNjguMS0xMzYuNiwzNjctMTM4LDM2N3ogTS0xNDAuNyw0MTcuMUgtMjEwdi00MC4yaDY5LjNDLTE0MC43LDM3Ni45LTE0MC43LDQxNy4xLTE0MC43LDQxNy4xeiIvPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTE3NSw0MTIuNmM4LjksMCwxNi03LjIsMTYtMTZjMC04LjktNy4yLTE2LTE2LTE2Yy04LjksMC0xNiw3LjItMTYsMTZDLTE5MSw0' +
            'MDUuNC0xODMuOSw0MTIuNi0xNzUsNDEyLjYNCgkJCXogTS0xODAuMiwzODcuOWMwLTAuOSwwLjYtMS4zLDEuNC0wLjdsMTIsOC40YzAuOCwwLjUsMC44LDEuNCwwLDEuOWwtMTIsOC40Yy0wLjgsMC41LTEuNCwwLjItMS40LTAuN1YzODcuOXoiLz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==';
        me._ht_video_file_image__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;ht_video_file_image;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "ht_video_file_image";
        el.ggDx = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 32px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -16px;';
        hs += 'visibility : inherit;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._ht_video_file_image.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return me.ggNodeId;
        }
        me._ht_video_file_image.onmouseover = function (e) {
            me._ht_video_file_image__img.style.visibility = 'hidden';
            me._ht_video_file_image__imgo.style.visibility = 'inherit';
        }
        me._ht_video_file_image.onmouseout = function (e) {
            me._ht_video_file_image__img.style.visibility = 'inherit';
            me._ht_video_file_image__imgo.style.visibility = 'hidden';
        }
        me._ht_video_file_image.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
        }
        me._ht_video_file.appendChild(me._ht_video_file_image);
        el = me._tt_ht_video_file = document.createElement('div');
        els = me._tt_ht_video_file__text = document.createElement('div');
        el.className = 'ggskin ggskin_textdiv';
        el.ggTextDiv = els;
        el.ggId = "tt_ht_video_file";
        el.ggDx = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_text ";
        el.ggType = 'text';
        hs = '';
        hs += 'z-index: 100;';
        hs += 'height : 20px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : 21px;';
        hs += 'visibility : hidden;';
        hs += 'width : 100px;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        hs = 'position:absolute;';
        hs += 'box-sizing: border-box;';
        hs += 'cursor: default;';
        hs += 'left: 0px;';
        hs += 'top:  0px;';
        hs += 'width: auto;';
        hs += 'height: auto;';
        hs += 'pointer-events: none;';
        hs += 'background: #000000;';
        hs += 'background: rgba(0,0,0,0.666667);';
        hs += 'border: 0px solid #000000;';
        hs += 'color: rgba(255,255,255,1);';
        hs += 'text-align: center;';
        hs += 'white-space: nowrap;';
        hs += 'padding: 2px 5px 2px 5px;';
        hs += 'overflow: hidden;';
        els.setAttribute('style', hs);
        els.innerHTML = me.hotspot.title;
        el.appendChild(els);
        me._tt_ht_video_file.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return me.ggNodeId;
        }
        me._tt_ht_video_file.logicBlock_position = function () {
            var newLogicStatePosition;
            if (
                (player.getIsMobile() == true)
            ) {
                newLogicStatePosition = 0;
            } else {
                newLogicStatePosition = -1;
            }
            if (me._tt_ht_video_file.ggCurrentLogicStatePosition != newLogicStatePosition) {
                me._tt_ht_video_file.ggCurrentLogicStatePosition = newLogicStatePosition;
                me._tt_ht_video_file.style[domTransition] = 'left 0s, top 0s';
                if (me._tt_ht_video_file.ggCurrentLogicStatePosition == 0) {
                    this.ggDx = 0;
                    me._tt_ht_video_file.style.top = '-47px';
                    me._tt_ht_video_file.ggUpdatePosition(true);
                } else {
                    me._tt_ht_video_file.ggDx = 0;
                    me._tt_ht_video_file.style.top = '21px';
                    me._tt_ht_video_file.ggUpdatePosition(true);
                }
            }
        }
        me._tt_ht_video_file.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (me.elementMouseOver['ht_video_file'] == true) &&
                (me.hotspot.title != "")
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._tt_ht_video_file.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._tt_ht_video_file.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._tt_ht_video_file.style[domTransition] = 'left 0s, top 0s';
                if (me._tt_ht_video_file.ggCurrentLogicStateVisible == 0) {
                    me._tt_ht_video_file.style.visibility = (Number(me._tt_ht_video_file.style.opacity) > 0 || !me._tt_ht_video_file.style.opacity) ? 'inherit' : 'hidden';
                    me._tt_ht_video_file.ggVisible = true;
                } else {
                    me._tt_ht_video_file.style.visibility = "hidden";
                    me._tt_ht_video_file.ggVisible = false;
                }
            }
        }
        me._tt_ht_video_file.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth + 0;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
            this.style[domTransition] = 'left 0';
            this.ggTextDiv.style.left = ((98 - this.ggTextDiv.offsetWidth) / 2) + 'px';
        }
        me._ht_video_file.appendChild(me._tt_ht_video_file);
        me.__div = me._ht_video_file;
    };

    function SkinHotspotClass_ht_video_url(parentScope, hotspot) {
        var me = this;
        var flag = false;
        var hs = '';
        me.parentScope = parentScope;
        me.hotspot = hotspot;
        var nodeId = String(hotspot.url);
        nodeId = (nodeId.charAt(0) == '{') ? nodeId.substr(1, nodeId.length - 2) : '';
        me.ggUserdata = skin.player.getNodeUserdata(nodeId);
        me.elementMouseDown = [];
        me.elementMouseOver = [];
        me.findElements = function (id, regex) {
            return skin.findElements(id, regex);
        }
        el = me._ht_video_url = document.createElement('div');
        el.ggId = "ht_video_url";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_hotspot ";
        el.ggType = 'hotspot';
        hs = '';
        hs += 'height : 0px;';
        hs += 'left : 250px;';
        hs += 'opacity : 0;';
        hs += 'position : absolute;';
        hs += 'top : 50px;';
        hs += 'visibility : hidden;';
        hs += 'width : 0px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._ht_video_url.ggIsActive = function () {
            return player.getCurrentNode() == this.ggElementNodeId();
        }
        el.ggElementNodeId = function () {
            return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
        }
        me._ht_video_url.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('vis_userdata') == true) ||
                (player.getVariableValue('vis_image_popup') == true) ||
                (player.getVariableValue('vis_info_popup') == true) ||
                (player.getVariableValue('vis_video_popup_file') == true) ||
                (player.getVariableValue('vis_video_popup_url') == true) ||
                (player.getVariableValue('vis_video_popup_vimeo') == true) ||
                (player.getVariableValue('vis_video_popup_youtube') == true) ||
                (player.getVariableValue('vis_website') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._ht_video_url.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._ht_video_url.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._ht_video_url.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._ht_video_url.ggCurrentLogicStateVisible == 0) {
                    me._ht_video_url.style.visibility = "hidden";
                    me._ht_video_url.ggVisible = false;
                } else {
                    me._ht_video_url.style.visibility = (Number(me._ht_video_url.style.opacity) > 0 || !me._ht_video_url.style.opacity) ? 'inherit' : 'hidden';
                    me._ht_video_url.ggVisible = true;
                }
            }
        }
        me._ht_video_url.logicBlock_alpha = function () {
            var newLogicStateAlpha;
            if (
                (player.getVariableValue('vis_timer') == true)
            ) {
                newLogicStateAlpha = 0;
            } else {
                newLogicStateAlpha = -1;
            }
            if (me._ht_video_url.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
                me._ht_video_url.ggCurrentLogicStateAlpha = newLogicStateAlpha;
                me._ht_video_url.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._ht_video_url.ggCurrentLogicStateAlpha == 0) {
                    me._ht_video_url.style.visibility = me._ht_video_url.ggVisible ? 'inherit' : 'hidden';
                    me._ht_video_url.style.opacity = 1;
                } else {
                    me._ht_video_url.style.visibility = "hidden";
                    me._ht_video_url.style.opacity = 0;
                }
            }
        }
        me._ht_video_url.onclick = function (e) {
            skin._popup_video_url.ggInitMedia(me.hotspot.url);
            player.setVariableValue('vis_video_popup_url', true);
            skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
        }
        me._ht_video_url.ondblclick = function (e) {
            skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
        }
        me._ht_video_url.onmouseover = function (e) {
            player.setActiveHotspot(me.hotspot);
            me.elementMouseOver['ht_video_url'] = true;
            me._tt_ht_video_url.logicBlock_visible();
            skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
        }
        me._ht_video_url.onmouseout = function (e) {
            player.setActiveHotspot(null);
            me.elementMouseOver['ht_video_url'] = false;
            me._tt_ht_video_url.logicBlock_visible();
            skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
        }
        me._ht_video_url.ontouchend = function (e) {
            me.elementMouseOver['ht_video_url'] = false;
            me._tt_ht_video_url.logicBlock_visible();
        }
        me._ht_video_url.ggUpdatePosition = function (useTransition) {
        }
        el = me._ht_video_url_image = document.createElement('div');
        els = me._ht_video_url_image__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8Zz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xNzUsMzQwLjljLTMxLDAtNTYuMSwyNS4xLTU2LjEsNTYuMWMwLDMxLDI1LjEsNTYuMSw1Ni4xLDU2LjFzNTYuMS0yNS4xLDU2LjEtNTYuMQ0KCQkJQy0xMTguOSwzNjYtMTQ0LDM0MC45LTE3NSwzNDAuOXogTS0xMzkuNCw0MjEuN2MwLDEuMy0xLDIuMy0yLjMsMi4zaC02Ni43Yy0xLjMsMC0yLjMtMS0yLjMtMi4zdi00OS40YzAtMS4zLDEtMi4zLDIuMy0yLjNoNjYuNw0KCQkJYzEuMywwLDIuMywxLDIuMywyLjNWNDIxLjd6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTc4LjQsNDA1bDEw' +
            'LjgtNy41YzAuNy0wLjUsMC43LTEuMywwLTEuOGwtMTAuOC03LjVjLTAuNy0wLjUtMS4zLTAuMi0xLjMsMC43djE1LjUNCgkJCUMtMTc5LjcsNDA1LjItMTc5LjEsNDA1LjUtMTc4LjQsNDA1eiIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTIwNi41LDQxNS4xaDYyLjR2LTM2LjFoLTYyLjRWNDE1LjF6IE0tMTc1LDM4Mi4xYzgsMCwxNC40LDYuNSwxNC40LDE0LjRjMCw4LTYuNSwxNC40LTE0LjQsMTQuNA0KCQkJYy04LDAtMTQuNC02LjUtMTQuNC0xNC40Qy0xODkuNCwzODguNi0xODMsMzgyLjEtMTc1LDM4Mi4xeiIvPg0KCTwvZz4NCjwvZz4NCjxnIGlkPSJMYXllcl8yIj4NCgk8Zz' +
            '4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xNDEuNywzNzBoLTY2LjdjLTEuMywwLTIuMywxLTIuMywyLjN2NDkuNGMwLDEuMywxLDIuMywyLjMsMi4zaDY2LjdjMS4zLDAsMi4zLTEsMi4zLTIuM3YtNDkuNA0KCQkJQy0xMzkuNCwzNzEtMTQwLjQsMzcwLTE0MS43LDM3MHogTS0xNDQuMiw0MTUuMWgtNjIuNHYtMzYuMWg2Mi40Qy0xNDQuMiwzNzguOS0xNDQuMiw0MTUuMS0xNDQuMiw0MTUuMXoiLz4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xNzUsNDExYzgsMCwxNC40LTYuNSwxNC40LTE0LjRjMC04LTYuNS0xNC40LTE0LjQtMTQuNGMtOCwwLTE0LjQsNi41LTE0LjQsMTQu' +
            'NA0KCQkJQy0xODkuNCw0MDQuNS0xODMsNDExLTE3NSw0MTF6IE0tMTc5LjcsMzg4LjhjMC0wLjgsMC42LTEuMSwxLjMtMC43bDEwLjgsNy41YzAuNywwLjUsMC43LDEuMywwLDEuOGwtMTAuOCw3LjUNCgkJCWMtMC43LDAuNS0xLjMsMC4yLTEuMy0wLjdWMzg4Ljh6Ii8+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo=';
        me._ht_video_url_image__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;ht_video_url_image;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._ht_video_url_image__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8Zz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xNzUsMzM0LjZjLTM0LjQsMC02Mi40LDI3LjktNjIuNCw2Mi40YzAsMzQuNCwyNy45LDYyLjQsNjIuNCw2Mi40czYyLjQtMjcuOSw2Mi40LTYyLjQNCgkJCUMtMTEyLjYsMzYyLjYtMTQwLjYsMzM0LjYtMTc1LDMzNC42eiBNLTEzNS40LDQyNC40YzAsMS40LTEuMSwyLjYtMi42LDIuNkgtMjEyYy0xLjQsMC0yLjYtMS4xLTIuNi0yLjZ2LTU0LjkNCgkJCWMwLTEuNCwxLjEtMi42LDIuNi0yLjZoNzQuMWMxLjQsMCwyLjYsMS4xLDIuNiwyLjZWNDI0LjR6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9' +
            'Ik0tMTc4LjgsNDA1LjlsMTItOC40YzAuOC0wLjUsMC44LTEuNCwwLTEuOWwtMTItOC40Yy0wLjgtMC41LTEuNC0wLjItMS40LDAuN3YxNy4zDQoJCQlDLTE4MC4yLDQwNi4xLTE3OS42LDQwNi40LTE3OC44LDQwNS45eiIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTIxMCw0MTcuMWg2OS4zdi00MC4ySC0yMTBWNDE3LjF6IE0tMTc1LDM4MC41YzguOSwwLDE2LDcuMiwxNiwxNmMwLDguOS03LjIsMTYtMTYsMTYNCgkJCWMtOC45LDAtMTYtNy4yLTE2LTE2Qy0xOTEsMzg3LjctMTgzLjksMzgwLjUtMTc1LDM4MC41eiIvPg0KCTwvZz4NCjwvZz4NCjxnIGlkPSJMYXllcl8yIj4NCgk8Zz' +
            '4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xMzgsMzY3SC0yMTJjLTEuNCwwLTIuNiwxLjEtMi42LDIuNnY1NC45YzAsMS40LDEuMSwyLjYsMi42LDIuNmg3NC4xYzEuNCwwLDIuNi0xLjEsMi42LTIuNnYtNTQuOQ0KCQkJQy0xMzUuNCwzNjguMS0xMzYuNiwzNjctMTM4LDM2N3ogTS0xNDAuNyw0MTcuMUgtMjEwdi00MC4yaDY5LjNDLTE0MC43LDM3Ni45LTE0MC43LDQxNy4xLTE0MC43LDQxNy4xeiIvPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTE3NSw0MTIuNmM4LjksMCwxNi03LjIsMTYtMTZjMC04LjktNy4yLTE2LTE2LTE2Yy04LjksMC0xNiw3LjItMTYsMTZDLTE5MSw0' +
            'MDUuNC0xODMuOSw0MTIuNi0xNzUsNDEyLjYNCgkJCXogTS0xODAuMiwzODcuOWMwLTAuOSwwLjYtMS4zLDEuNC0wLjdsMTIsOC40YzAuOCwwLjUsMC44LDEuNCwwLDEuOWwtMTIsOC40Yy0wLjgsMC41LTEuNCwwLjItMS40LTAuN1YzODcuOXoiLz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==';
        me._ht_video_url_image__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;ht_video_url_image;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "ht_video_url_image";
        el.ggDx = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 32px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -16px;';
        hs += 'visibility : inherit;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._ht_video_url_image.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return me.ggNodeId;
        }
        me._ht_video_url_image.onmouseover = function (e) {
            me._ht_video_url_image__img.style.visibility = 'hidden';
            me._ht_video_url_image__imgo.style.visibility = 'inherit';
        }
        me._ht_video_url_image.onmouseout = function (e) {
            me._ht_video_url_image__img.style.visibility = 'inherit';
            me._ht_video_url_image__imgo.style.visibility = 'hidden';
        }
        me._ht_video_url_image.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
        }
        me._ht_video_url.appendChild(me._ht_video_url_image);
        el = me._tt_ht_video_url = document.createElement('div');
        els = me._tt_ht_video_url__text = document.createElement('div');
        el.className = 'ggskin ggskin_textdiv';
        el.ggTextDiv = els;
        el.ggId = "tt_ht_video_url";
        el.ggDx = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_text ";
        el.ggType = 'text';
        hs = '';
        hs += 'z-index: 100;';
        hs += 'height : 20px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : 21px;';
        hs += 'visibility : hidden;';
        hs += 'width : 100px;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        hs = 'position:absolute;';
        hs += 'box-sizing: border-box;';
        hs += 'cursor: default;';
        hs += 'left: 0px;';
        hs += 'top:  0px;';
        hs += 'width: auto;';
        hs += 'height: auto;';
        hs += 'pointer-events: none;';
        hs += 'background: #000000;';
        hs += 'background: rgba(0,0,0,0.666667);';
        hs += 'border: 0px solid #000000;';
        hs += 'color: rgba(255,255,255,1);';
        hs += 'text-align: center;';
        hs += 'white-space: nowrap;';
        hs += 'padding: 2px 5px 2px 5px;';
        hs += 'overflow: hidden;';
        els.setAttribute('style', hs);
        els.innerHTML = me.hotspot.title;
        el.appendChild(els);
        me._tt_ht_video_url.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return me.ggNodeId;
        }
        me._tt_ht_video_url.logicBlock_position = function () {
            var newLogicStatePosition;
            if (
                (player.getIsMobile() == true)
            ) {
                newLogicStatePosition = 0;
            } else {
                newLogicStatePosition = -1;
            }
            if (me._tt_ht_video_url.ggCurrentLogicStatePosition != newLogicStatePosition) {
                me._tt_ht_video_url.ggCurrentLogicStatePosition = newLogicStatePosition;
                me._tt_ht_video_url.style[domTransition] = 'left 0s, top 0s';
                if (me._tt_ht_video_url.ggCurrentLogicStatePosition == 0) {
                    this.ggDx = 0;
                    me._tt_ht_video_url.style.top = '-47px';
                    me._tt_ht_video_url.ggUpdatePosition(true);
                } else {
                    me._tt_ht_video_url.ggDx = 0;
                    me._tt_ht_video_url.style.top = '21px';
                    me._tt_ht_video_url.ggUpdatePosition(true);
                }
            }
        }
        me._tt_ht_video_url.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (me.elementMouseOver['ht_video_url'] == true) &&
                (me.hotspot.title != "")
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._tt_ht_video_url.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._tt_ht_video_url.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._tt_ht_video_url.style[domTransition] = 'left 0s, top 0s';
                if (me._tt_ht_video_url.ggCurrentLogicStateVisible == 0) {
                    me._tt_ht_video_url.style.visibility = (Number(me._tt_ht_video_url.style.opacity) > 0 || !me._tt_ht_video_url.style.opacity) ? 'inherit' : 'hidden';
                    me._tt_ht_video_url.ggVisible = true;
                } else {
                    me._tt_ht_video_url.style.visibility = "hidden";
                    me._tt_ht_video_url.ggVisible = false;
                }
            }
        }
        me._tt_ht_video_url.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth + 0;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
            this.style[domTransition] = 'left 0';
            this.ggTextDiv.style.left = ((98 - this.ggTextDiv.offsetWidth) / 2) + 'px';
        }
        me._ht_video_url.appendChild(me._tt_ht_video_url);
        me.__div = me._ht_video_url;
    };

    function SkinHotspotClass_ht_video_vimeo(parentScope, hotspot) {
        var me = this;
        var flag = false;
        var hs = '';
        me.parentScope = parentScope;
        me.hotspot = hotspot;
        var nodeId = String(hotspot.url);
        nodeId = (nodeId.charAt(0) == '{') ? nodeId.substr(1, nodeId.length - 2) : '';
        me.ggUserdata = skin.player.getNodeUserdata(nodeId);
        me.elementMouseDown = [];
        me.elementMouseOver = [];
        me.findElements = function (id, regex) {
            return skin.findElements(id, regex);
        }
        el = me._ht_video_vimeo = document.createElement('div');
        el.ggId = "ht_video_vimeo";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_hotspot ";
        el.ggType = 'hotspot';
        hs = '';
        hs += 'height : 0px;';
        hs += 'left : 250px;';
        hs += 'opacity : 0;';
        hs += 'position : absolute;';
        hs += 'top : 50px;';
        hs += 'visibility : hidden;';
        hs += 'width : 0px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._ht_video_vimeo.ggIsActive = function () {
            return player.getCurrentNode() == this.ggElementNodeId();
        }
        el.ggElementNodeId = function () {
            return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
        }
        me._ht_video_vimeo.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('vis_userdata') == true) ||
                (player.getVariableValue('vis_image_popup') == true) ||
                (player.getVariableValue('vis_info_popup') == true) ||
                (player.getVariableValue('vis_video_popup_file') == true) ||
                (player.getVariableValue('vis_video_popup_url') == true) ||
                (player.getVariableValue('vis_video_popup_vimeo') == true) ||
                (player.getVariableValue('vis_video_popup_youtube') == true) ||
                (player.getVariableValue('vis_website') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._ht_video_vimeo.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._ht_video_vimeo.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._ht_video_vimeo.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._ht_video_vimeo.ggCurrentLogicStateVisible == 0) {
                    me._ht_video_vimeo.style.visibility = "hidden";
                    me._ht_video_vimeo.ggVisible = false;
                } else {
                    me._ht_video_vimeo.style.visibility = (Number(me._ht_video_vimeo.style.opacity) > 0 || !me._ht_video_vimeo.style.opacity) ? 'inherit' : 'hidden';
                    me._ht_video_vimeo.ggVisible = true;
                }
            }
        }
        me._ht_video_vimeo.logicBlock_alpha = function () {
            var newLogicStateAlpha;
            if (
                (player.getVariableValue('vis_timer') == true)
            ) {
                newLogicStateAlpha = 0;
            } else {
                newLogicStateAlpha = -1;
            }
            if (me._ht_video_vimeo.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
                me._ht_video_vimeo.ggCurrentLogicStateAlpha = newLogicStateAlpha;
                me._ht_video_vimeo.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._ht_video_vimeo.ggCurrentLogicStateAlpha == 0) {
                    me._ht_video_vimeo.style.visibility = me._ht_video_vimeo.ggVisible ? 'inherit' : 'hidden';
                    me._ht_video_vimeo.style.opacity = 1;
                } else {
                    me._ht_video_vimeo.style.visibility = "hidden";
                    me._ht_video_vimeo.style.opacity = 0;
                }
            }
        }
        me._ht_video_vimeo.onclick = function (e) {
            skin._popup_video_vimeo.ggInitMedia(me.hotspot.url);
            player.setVariableValue('vis_video_popup_vimeo', true);
            skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
        }
        me._ht_video_vimeo.ondblclick = function (e) {
            skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
        }
        me._ht_video_vimeo.onmouseover = function (e) {
            player.setActiveHotspot(me.hotspot);
            me.elementMouseOver['ht_video_vimeo'] = true;
            me._tt_ht_video_vimeo.logicBlock_visible();
            skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
        }
        me._ht_video_vimeo.onmouseout = function (e) {
            player.setActiveHotspot(null);
            me.elementMouseOver['ht_video_vimeo'] = false;
            me._tt_ht_video_vimeo.logicBlock_visible();
            skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
        }
        me._ht_video_vimeo.ontouchend = function (e) {
            me.elementMouseOver['ht_video_vimeo'] = false;
            me._tt_ht_video_vimeo.logicBlock_visible();
        }
        me._ht_video_vimeo.ggUpdatePosition = function (useTransition) {
        }
        el = me._ht_video_vimeo_image = document.createElement('div');
        els = me._ht_video_vimeo_image__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8Zz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xNzUsMzQwLjljLTMxLDAtNTYuMSwyNS4xLTU2LjEsNTYuMWMwLDMxLDI1LjEsNTYuMSw1Ni4xLDU2LjFzNTYuMS0yNS4xLDU2LjEtNTYuMQ0KCQkJQy0xMTguOSwzNjYtMTQ0LDM0MC45LTE3NSwzNDAuOXogTS0xMzkuNCw0MjEuN2MwLDEuMy0xLDIuMy0yLjMsMi4zaC02Ni43Yy0xLjMsMC0yLjMtMS0yLjMtMi4zdi00OS40YzAtMS4zLDEtMi4zLDIuMy0yLjNoNjYuNw0KCQkJYzEuMywwLDIuMywxLDIuMywyLjNWNDIxLjd6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTc4LjQsNDA1bDEw' +
            'LjgtNy41YzAuNy0wLjUsMC43LTEuMywwLTEuOGwtMTAuOC03LjVjLTAuNy0wLjUtMS4zLTAuMi0xLjMsMC43djE1LjUNCgkJCUMtMTc5LjcsNDA1LjItMTc5LjEsNDA1LjUtMTc4LjQsNDA1eiIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTIwNi41LDQxNS4xaDYyLjR2LTM2LjFoLTYyLjRWNDE1LjF6IE0tMTc1LDM4Mi4xYzgsMCwxNC40LDYuNSwxNC40LDE0LjRjMCw4LTYuNSwxNC40LTE0LjQsMTQuNA0KCQkJYy04LDAtMTQuNC02LjUtMTQuNC0xNC40Qy0xODkuNCwzODguNi0xODMsMzgyLjEtMTc1LDM4Mi4xeiIvPg0KCTwvZz4NCjwvZz4NCjxnIGlkPSJMYXllcl8yIj4NCgk8Zz' +
            '4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xNDEuNywzNzBoLTY2LjdjLTEuMywwLTIuMywxLTIuMywyLjN2NDkuNGMwLDEuMywxLDIuMywyLjMsMi4zaDY2LjdjMS4zLDAsMi4zLTEsMi4zLTIuM3YtNDkuNA0KCQkJQy0xMzkuNCwzNzEtMTQwLjQsMzcwLTE0MS43LDM3MHogTS0xNDQuMiw0MTUuMWgtNjIuNHYtMzYuMWg2Mi40Qy0xNDQuMiwzNzguOS0xNDQuMiw0MTUuMS0xNDQuMiw0MTUuMXoiLz4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xNzUsNDExYzgsMCwxNC40LTYuNSwxNC40LTE0LjRjMC04LTYuNS0xNC40LTE0LjQtMTQuNGMtOCwwLTE0LjQsNi41LTE0LjQsMTQu' +
            'NA0KCQkJQy0xODkuNCw0MDQuNS0xODMsNDExLTE3NSw0MTF6IE0tMTc5LjcsMzg4LjhjMC0wLjgsMC42LTEuMSwxLjMtMC43bDEwLjgsNy41YzAuNywwLjUsMC43LDEuMywwLDEuOGwtMTAuOCw3LjUNCgkJCWMtMC43LDAuNS0xLjMsMC4yLTEuMy0wLjdWMzg4Ljh6Ii8+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo=';
        me._ht_video_vimeo_image__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;ht_video_vimeo_image;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._ht_video_vimeo_image__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8Zz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xNzUsMzM0LjZjLTM0LjQsMC02Mi40LDI3LjktNjIuNCw2Mi40YzAsMzQuNCwyNy45LDYyLjQsNjIuNCw2Mi40czYyLjQtMjcuOSw2Mi40LTYyLjQNCgkJCUMtMTEyLjYsMzYyLjYtMTQwLjYsMzM0LjYtMTc1LDMzNC42eiBNLTEzNS40LDQyNC40YzAsMS40LTEuMSwyLjYtMi42LDIuNkgtMjEyYy0xLjQsMC0yLjYtMS4xLTIuNi0yLjZ2LTU0LjkNCgkJCWMwLTEuNCwxLjEtMi42LDIuNi0yLjZoNzQuMWMxLjQsMCwyLjYsMS4xLDIuNiwyLjZWNDI0LjR6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9' +
            'Ik0tMTc4LjgsNDA1LjlsMTItOC40YzAuOC0wLjUsMC44LTEuNCwwLTEuOWwtMTItOC40Yy0wLjgtMC41LTEuNC0wLjItMS40LDAuN3YxNy4zDQoJCQlDLTE4MC4yLDQwNi4xLTE3OS42LDQwNi40LTE3OC44LDQwNS45eiIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTIxMCw0MTcuMWg2OS4zdi00MC4ySC0yMTBWNDE3LjF6IE0tMTc1LDM4MC41YzguOSwwLDE2LDcuMiwxNiwxNmMwLDguOS03LjIsMTYtMTYsMTYNCgkJCWMtOC45LDAtMTYtNy4yLTE2LTE2Qy0xOTEsMzg3LjctMTgzLjksMzgwLjUtMTc1LDM4MC41eiIvPg0KCTwvZz4NCjwvZz4NCjxnIGlkPSJMYXllcl8yIj4NCgk8Zz' +
            '4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xMzgsMzY3SC0yMTJjLTEuNCwwLTIuNiwxLjEtMi42LDIuNnY1NC45YzAsMS40LDEuMSwyLjYsMi42LDIuNmg3NC4xYzEuNCwwLDIuNi0xLjEsMi42LTIuNnYtNTQuOQ0KCQkJQy0xMzUuNCwzNjguMS0xMzYuNiwzNjctMTM4LDM2N3ogTS0xNDAuNyw0MTcuMUgtMjEwdi00MC4yaDY5LjNDLTE0MC43LDM3Ni45LTE0MC43LDQxNy4xLTE0MC43LDQxNy4xeiIvPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTE3NSw0MTIuNmM4LjksMCwxNi03LjIsMTYtMTZjMC04LjktNy4yLTE2LTE2LTE2Yy04LjksMC0xNiw3LjItMTYsMTZDLTE5MSw0' +
            'MDUuNC0xODMuOSw0MTIuNi0xNzUsNDEyLjYNCgkJCXogTS0xODAuMiwzODcuOWMwLTAuOSwwLjYtMS4zLDEuNC0wLjdsMTIsOC40YzAuOCwwLjUsMC44LDEuNCwwLDEuOWwtMTIsOC40Yy0wLjgsMC41LTEuNCwwLjItMS40LTAuN1YzODcuOXoiLz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==';
        me._ht_video_vimeo_image__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;ht_video_vimeo_image;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "ht_video_vimeo_image";
        el.ggDx = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 32px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -16px;';
        hs += 'visibility : inherit;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._ht_video_vimeo_image.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return me.ggNodeId;
        }
        me._ht_video_vimeo_image.onmouseover = function (e) {
            me._ht_video_vimeo_image__img.style.visibility = 'hidden';
            me._ht_video_vimeo_image__imgo.style.visibility = 'inherit';
        }
        me._ht_video_vimeo_image.onmouseout = function (e) {
            me._ht_video_vimeo_image__img.style.visibility = 'inherit';
            me._ht_video_vimeo_image__imgo.style.visibility = 'hidden';
        }
        me._ht_video_vimeo_image.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
        }
        me._ht_video_vimeo.appendChild(me._ht_video_vimeo_image);
        el = me._tt_ht_video_vimeo = document.createElement('div');
        els = me._tt_ht_video_vimeo__text = document.createElement('div');
        el.className = 'ggskin ggskin_textdiv';
        el.ggTextDiv = els;
        el.ggId = "tt_ht_video_vimeo";
        el.ggDx = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_text ";
        el.ggType = 'text';
        hs = '';
        hs += 'z-index: 100;';
        hs += 'height : 20px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : 21px;';
        hs += 'visibility : hidden;';
        hs += 'width : 100px;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        hs = 'position:absolute;';
        hs += 'box-sizing: border-box;';
        hs += 'cursor: default;';
        hs += 'left: 0px;';
        hs += 'top:  0px;';
        hs += 'width: auto;';
        hs += 'height: auto;';
        hs += 'pointer-events: none;';
        hs += 'background: #000000;';
        hs += 'background: rgba(0,0,0,0.666667);';
        hs += 'border: 0px solid #000000;';
        hs += 'color: rgba(255,255,255,1);';
        hs += 'text-align: center;';
        hs += 'white-space: nowrap;';
        hs += 'padding: 2px 5px 2px 5px;';
        hs += 'overflow: hidden;';
        els.setAttribute('style', hs);
        els.innerHTML = me.hotspot.title;
        el.appendChild(els);
        me._tt_ht_video_vimeo.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return me.ggNodeId;
        }
        me._tt_ht_video_vimeo.logicBlock_position = function () {
            var newLogicStatePosition;
            if (
                (player.getIsMobile() == true)
            ) {
                newLogicStatePosition = 0;
            } else {
                newLogicStatePosition = -1;
            }
            if (me._tt_ht_video_vimeo.ggCurrentLogicStatePosition != newLogicStatePosition) {
                me._tt_ht_video_vimeo.ggCurrentLogicStatePosition = newLogicStatePosition;
                me._tt_ht_video_vimeo.style[domTransition] = 'left 0s, top 0s';
                if (me._tt_ht_video_vimeo.ggCurrentLogicStatePosition == 0) {
                    this.ggDx = 0;
                    me._tt_ht_video_vimeo.style.top = '-47px';
                    me._tt_ht_video_vimeo.ggUpdatePosition(true);
                } else {
                    me._tt_ht_video_vimeo.ggDx = 0;
                    me._tt_ht_video_vimeo.style.top = '21px';
                    me._tt_ht_video_vimeo.ggUpdatePosition(true);
                }
            }
        }
        me._tt_ht_video_vimeo.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (me.elementMouseOver['ht_video_vimeo'] == true) &&
                (me.hotspot.title != "")
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._tt_ht_video_vimeo.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._tt_ht_video_vimeo.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._tt_ht_video_vimeo.style[domTransition] = 'left 0s, top 0s';
                if (me._tt_ht_video_vimeo.ggCurrentLogicStateVisible == 0) {
                    me._tt_ht_video_vimeo.style.visibility = (Number(me._tt_ht_video_vimeo.style.opacity) > 0 || !me._tt_ht_video_vimeo.style.opacity) ? 'inherit' : 'hidden';
                    me._tt_ht_video_vimeo.ggVisible = true;
                } else {
                    me._tt_ht_video_vimeo.style.visibility = "hidden";
                    me._tt_ht_video_vimeo.ggVisible = false;
                }
            }
        }
        me._tt_ht_video_vimeo.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth + 0;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
            this.style[domTransition] = 'left 0';
            this.ggTextDiv.style.left = ((98 - this.ggTextDiv.offsetWidth) / 2) + 'px';
        }
        me._ht_video_vimeo.appendChild(me._tt_ht_video_vimeo);
        me.__div = me._ht_video_vimeo;
    };

    function SkinHotspotClass_ht_video_youtube(parentScope, hotspot) {
        var me = this;
        var flag = false;
        var hs = '';
        me.parentScope = parentScope;
        me.hotspot = hotspot;
        var nodeId = String(hotspot.url);
        nodeId = (nodeId.charAt(0) == '{') ? nodeId.substr(1, nodeId.length - 2) : '';
        me.ggUserdata = skin.player.getNodeUserdata(nodeId);
        me.elementMouseDown = [];
        me.elementMouseOver = [];
        me.findElements = function (id, regex) {
            return skin.findElements(id, regex);
        }
        el = me._ht_video_youtube = document.createElement('div');
        el.ggId = "ht_video_youtube";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_hotspot ";
        el.ggType = 'hotspot';
        hs = '';
        hs += 'height : 0px;';
        hs += 'left : 250px;';
        hs += 'opacity : 0;';
        hs += 'position : absolute;';
        hs += 'top : 50px;';
        hs += 'visibility : hidden;';
        hs += 'width : 0px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._ht_video_youtube.ggIsActive = function () {
            return player.getCurrentNode() == this.ggElementNodeId();
        }
        el.ggElementNodeId = function () {
            return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
        }
        me._ht_video_youtube.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.getVariableValue('vis_userdata') == true) ||
                (player.getVariableValue('vis_image_popup') == true) ||
                (player.getVariableValue('vis_info_popup') == true) ||
                (player.getVariableValue('vis_video_popup_file') == true) ||
                (player.getVariableValue('vis_video_popup_url') == true) ||
                (player.getVariableValue('vis_video_popup_vimeo') == true) ||
                (player.getVariableValue('vis_video_popup_youtube') == true) ||
                (player.getVariableValue('vis_website') == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._ht_video_youtube.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._ht_video_youtube.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._ht_video_youtube.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._ht_video_youtube.ggCurrentLogicStateVisible == 0) {
                    me._ht_video_youtube.style.visibility = "hidden";
                    me._ht_video_youtube.ggVisible = false;
                } else {
                    me._ht_video_youtube.style.visibility = (Number(me._ht_video_youtube.style.opacity) > 0 || !me._ht_video_youtube.style.opacity) ? 'inherit' : 'hidden';
                    me._ht_video_youtube.ggVisible = true;
                }
            }
        }
        me._ht_video_youtube.logicBlock_alpha = function () {
            var newLogicStateAlpha;
            if (
                (player.getVariableValue('vis_timer') == true)
            ) {
                newLogicStateAlpha = 0;
            } else {
                newLogicStateAlpha = -1;
            }
            if (me._ht_video_youtube.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
                me._ht_video_youtube.ggCurrentLogicStateAlpha = newLogicStateAlpha;
                me._ht_video_youtube.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._ht_video_youtube.ggCurrentLogicStateAlpha == 0) {
                    me._ht_video_youtube.style.visibility = me._ht_video_youtube.ggVisible ? 'inherit' : 'hidden';
                    me._ht_video_youtube.style.opacity = 1;
                } else {
                    me._ht_video_youtube.style.visibility = "hidden";
                    me._ht_video_youtube.style.opacity = 0;
                }
            }
        }
        me._ht_video_youtube.onclick = function (e) {
            skin._popup_video_youtube.ggInitMedia(me.hotspot.url);
            player.setVariableValue('vis_video_popup_youtube', true);
            skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
        }
        me._ht_video_youtube.ondblclick = function (e) {
            skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
        }
        me._ht_video_youtube.onmouseover = function (e) {
            player.setActiveHotspot(me.hotspot);
            me.elementMouseOver['ht_video_youtube'] = true;
            me._tt_ht_video_youtube.logicBlock_visible();
            skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
        }
        me._ht_video_youtube.onmouseout = function (e) {
            player.setActiveHotspot(null);
            me.elementMouseOver['ht_video_youtube'] = false;
            me._tt_ht_video_youtube.logicBlock_visible();
            skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
        }
        me._ht_video_youtube.ontouchend = function (e) {
            me.elementMouseOver['ht_video_youtube'] = false;
            me._tt_ht_video_youtube.logicBlock_visible();
        }
        me._ht_video_youtube.ggUpdatePosition = function (useTransition) {
        }
        el = me._ht_video_youtube_image = document.createElement('div');
        els = me._ht_video_youtube_image__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8Zz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xNzUsMzQwLjljLTMxLDAtNTYuMSwyNS4xLTU2LjEsNTYuMWMwLDMxLDI1LjEsNTYuMSw1Ni4xLDU2LjFzNTYuMS0yNS4xLDU2LjEtNTYuMQ0KCQkJQy0xMTguOSwzNjYtMTQ0LDM0MC45LTE3NSwzNDAuOXogTS0xMzkuNCw0MjEuN2MwLDEuMy0xLDIuMy0yLjMsMi4zaC02Ni43Yy0xLjMsMC0yLjMtMS0yLjMtMi4zdi00OS40YzAtMS4zLDEtMi4zLDIuMy0yLjNoNjYuNw0KCQkJYzEuMywwLDIuMywxLDIuMywyLjNWNDIxLjd6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0tMTc4LjQsNDA1bDEw' +
            'LjgtNy41YzAuNy0wLjUsMC43LTEuMywwLTEuOGwtMTAuOC03LjVjLTAuNy0wLjUtMS4zLTAuMi0xLjMsMC43djE1LjUNCgkJCUMtMTc5LjcsNDA1LjItMTc5LjEsNDA1LjUtMTc4LjQsNDA1eiIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTIwNi41LDQxNS4xaDYyLjR2LTM2LjFoLTYyLjRWNDE1LjF6IE0tMTc1LDM4Mi4xYzgsMCwxNC40LDYuNSwxNC40LDE0LjRjMCw4LTYuNSwxNC40LTE0LjQsMTQuNA0KCQkJYy04LDAtMTQuNC02LjUtMTQuNC0xNC40Qy0xODkuNCwzODguNi0xODMsMzgyLjEtMTc1LDM4Mi4xeiIvPg0KCTwvZz4NCjwvZz4NCjxnIGlkPSJMYXllcl8yIj4NCgk8Zz' +
            '4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xNDEuNywzNzBoLTY2LjdjLTEuMywwLTIuMywxLTIuMywyLjN2NDkuNGMwLDEuMywxLDIuMywyLjMsMi4zaDY2LjdjMS4zLDAsMi4zLTEsMi4zLTIuM3YtNDkuNA0KCQkJQy0xMzkuNCwzNzEtMTQwLjQsMzcwLTE0MS43LDM3MHogTS0xNDQuMiw0MTUuMWgtNjIuNHYtMzYuMWg2Mi40Qy0xNDQuMiwzNzguOS0xNDQuMiw0MTUuMS0xNDQuMiw0MTUuMXoiLz4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xNzUsNDExYzgsMCwxNC40LTYuNSwxNC40LTE0LjRjMC04LTYuNS0xNC40LTE0LjQtMTQuNGMtOCwwLTE0LjQsNi41LTE0LjQsMTQu' +
            'NA0KCQkJQy0xODkuNCw0MDQuNS0xODMsNDExLTE3NSw0MTF6IE0tMTc5LjcsMzg4LjhjMC0wLjgsMC42LTEuMSwxLjMtMC43bDEwLjgsNy41YzAuNywwLjUsMC43LDEuMywwLDEuOGwtMTAuOCw3LjUNCgkJCWMtMC43LDAuNS0xLjMsMC4yLTEuMy0wLjdWMzg4Ljh6Ii8+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo=';
        me._ht_video_youtube_image__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;ht_video_youtube_image;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        elo = me._ht_video_youtube_image__imgo = document.createElement('img');
        elo.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIG' +
            'lkPSJMYXllcl8xXzFfIj4NCgk8Zz4NCgkJPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xNzUsMzM0LjZjLTM0LjQsMC02Mi40LDI3LjktNjIuNCw2Mi40YzAsMzQuNCwyNy45LDYyLjQsNjIuNCw2Mi40czYyLjQtMjcuOSw2Mi40LTYyLjQNCgkJCUMtMTEyLjYsMzYyLjYtMTQwLjYsMzM0LjYtMTc1LDMzNC42eiBNLTEzNS40LDQyNC40YzAsMS40LTEuMSwyLjYtMi42LDIuNkgtMjEyYy0xLjQsMC0yLjYtMS4xLTIuNi0yLjZ2LTU0LjkNCgkJCWMwLTEuNCwxLjEtMi42LDIuNi0yLjZoNzQuMWMxLjQsMCwyLjYsMS4xLDIuNiwyLjZWNDI0LjR6Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9' +
            'Ik0tMTc4LjgsNDA1LjlsMTItOC40YzAuOC0wLjUsMC44LTEuNCwwLTEuOWwtMTItOC40Yy0wLjgtMC41LTEuNC0wLjItMS40LDAuN3YxNy4zDQoJCQlDLTE4MC4yLDQwNi4xLTE3OS42LDQwNi40LTE3OC44LDQwNS45eiIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNLTIxMCw0MTcuMWg2OS4zdi00MC4ySC0yMTBWNDE3LjF6IE0tMTc1LDM4MC41YzguOSwwLDE2LDcuMiwxNiwxNmMwLDguOS03LjIsMTYtMTYsMTYNCgkJCWMtOC45LDAtMTYtNy4yLTE2LTE2Qy0xOTEsMzg3LjctMTgzLjksMzgwLjUtMTc1LDM4MC41eiIvPg0KCTwvZz4NCjwvZz4NCjxnIGlkPSJMYXllcl8yIj4NCgk8Zz' +
            '4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xMzgsMzY3SC0yMTJjLTEuNCwwLTIuNiwxLjEtMi42LDIuNnY1NC45YzAsMS40LDEuMSwyLjYsMi42LDIuNmg3NC4xYzEuNCwwLDIuNi0xLjEsMi42LTIuNnYtNTQuOQ0KCQkJQy0xMzUuNCwzNjguMS0xMzYuNiwzNjctMTM4LDM2N3ogTS0xNDAuNyw0MTcuMUgtMjEwdi00MC4yaDY5LjNDLTE0MC43LDM3Ni45LTE0MC43LDQxNy4xLTE0MC43LDQxNy4xeiIvPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTE3NSw0MTIuNmM4LjksMCwxNi03LjIsMTYtMTZjMC04LjktNy4yLTE2LTE2LTE2Yy04LjksMC0xNiw3LjItMTYsMTZDLTE5MSw0' +
            'MDUuNC0xODMuOSw0MTIuNi0xNzUsNDEyLjYNCgkJCXogTS0xODAuMiwzODcuOWMwLTAuOSwwLjYtMS4zLDEuNC0wLjdsMTIsOC40YzAuOCwwLjUsMC44LDEuNCwwLDEuOWwtMTIsOC40Yy0wLjgsMC41LTEuNCwwLjItMS40LTAuN1YzODcuOXoiLz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==';
        me._ht_video_youtube_image__imgo.setAttribute('src', hs);
        elo.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;ht_video_youtube_image;');
        elo['ondragstart'] = function () {
            return false;
        };
        el.appendChild(elo);
        el.ggId = "ht_video_youtube_image";
        el.ggDx = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 32px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -16px;';
        hs += 'visibility : inherit;';
        hs += 'width : 32px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._ht_video_youtube_image.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return me.ggNodeId;
        }
        me._ht_video_youtube_image.onmouseover = function (e) {
            me._ht_video_youtube_image__img.style.visibility = 'hidden';
            me._ht_video_youtube_image__imgo.style.visibility = 'inherit';
        }
        me._ht_video_youtube_image.onmouseout = function (e) {
            me._ht_video_youtube_image__img.style.visibility = 'inherit';
            me._ht_video_youtube_image__imgo.style.visibility = 'hidden';
        }
        me._ht_video_youtube_image.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
        }
        me._ht_video_youtube.appendChild(me._ht_video_youtube_image);
        el = me._tt_ht_video_youtube = document.createElement('div');
        els = me._tt_ht_video_youtube__text = document.createElement('div');
        el.className = 'ggskin ggskin_textdiv';
        el.ggTextDiv = els;
        el.ggId = "tt_ht_video_youtube";
        el.ggDx = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_text ";
        el.ggType = 'text';
        hs = '';
        hs += 'z-index: 100;';
        hs += 'height : 20px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : 21px;';
        hs += 'visibility : hidden;';
        hs += 'width : 100px;';
        hs += 'pointer-events:none;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        hs = 'position:absolute;';
        hs += 'box-sizing: border-box;';
        hs += 'cursor: default;';
        hs += 'left: 0px;';
        hs += 'top:  0px;';
        hs += 'width: auto;';
        hs += 'height: auto;';
        hs += 'pointer-events: none;';
        hs += 'background: #000000;';
        hs += 'background: rgba(0,0,0,0.666667);';
        hs += 'border: 0px solid #000000;';
        hs += 'color: rgba(255,255,255,1);';
        hs += 'text-align: center;';
        hs += 'white-space: nowrap;';
        hs += 'padding: 2px 5px 2px 5px;';
        hs += 'overflow: hidden;';
        els.setAttribute('style', hs);
        els.innerHTML = me.hotspot.title;
        el.appendChild(els);
        me._tt_ht_video_youtube.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return me.ggNodeId;
        }
        me._tt_ht_video_youtube.logicBlock_position = function () {
            var newLogicStatePosition;
            if (
                (player.getIsMobile() == true)
            ) {
                newLogicStatePosition = 0;
            } else {
                newLogicStatePosition = -1;
            }
            if (me._tt_ht_video_youtube.ggCurrentLogicStatePosition != newLogicStatePosition) {
                me._tt_ht_video_youtube.ggCurrentLogicStatePosition = newLogicStatePosition;
                me._tt_ht_video_youtube.style[domTransition] = 'left 0s, top 0s';
                if (me._tt_ht_video_youtube.ggCurrentLogicStatePosition == 0) {
                    this.ggDx = 0;
                    me._tt_ht_video_youtube.style.top = '-47px';
                    me._tt_ht_video_youtube.ggUpdatePosition(true);
                } else {
                    me._tt_ht_video_youtube.ggDx = 0;
                    me._tt_ht_video_youtube.style.top = '21px';
                    me._tt_ht_video_youtube.ggUpdatePosition(true);
                }
            }
        }
        me._tt_ht_video_youtube.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (me.elementMouseOver['ht_video_youtube'] == true) &&
                (me.hotspot.title != "")
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._tt_ht_video_youtube.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._tt_ht_video_youtube.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._tt_ht_video_youtube.style[domTransition] = 'left 0s, top 0s';
                if (me._tt_ht_video_youtube.ggCurrentLogicStateVisible == 0) {
                    me._tt_ht_video_youtube.style.visibility = (Number(me._tt_ht_video_youtube.style.opacity) > 0 || !me._tt_ht_video_youtube.style.opacity) ? 'inherit' : 'hidden';
                    me._tt_ht_video_youtube.ggVisible = true;
                } else {
                    me._tt_ht_video_youtube.style.visibility = "hidden";
                    me._tt_ht_video_youtube.ggVisible = false;
                }
            }
        }
        me._tt_ht_video_youtube.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth + 0;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
            }
            this.style[domTransition] = 'left 0';
            this.ggTextDiv.style.left = ((98 - this.ggTextDiv.offsetWidth) / 2) + 'px';
        }
        me._ht_video_youtube.appendChild(me._tt_ht_video_youtube);
        me.__div = me._ht_video_youtube;
    };
    me.addSkinHotspot = function (hotspot) {
        var hsinst = null;
        if (hotspot.skinid == 'ht_node') {
            hotspot.skinid = 'ht_node';
            hsinst = new SkinHotspotClass_ht_node(me, hotspot);
            if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
                hotspotTemplates[hotspot.skinid] = [];
            }
            hotspotTemplates[hotspot.skinid].push(hsinst);
            me.callChildLogicBlocksHotspot_ht_node_changenodeid();
            ;
            me.callChildLogicBlocksHotspot_ht_node_configloaded();
            ;
            me.callChildLogicBlocksHotspot_ht_node_mouseover();
            ;
            me.callChildLogicBlocksHotspot_ht_node_active();
            ;
            me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_userdata();
            ;
            me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_image_popup();
            ;
            me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_info_popup();
            ;
            me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_file();
            ;
            me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_url();
            ;
            me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_vimeo();
            ;
            me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_youtube();
            ;
            me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_website();
            ;
            me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_timer();
            ;
            me.callChildLogicBlocksHotspot_ht_node_varchanged_opt_hotspot_preview();
            ;
        } else if (hotspot.skinid == 'ht_url') {
            hotspot.skinid = 'ht_url';
            hsinst = new SkinHotspotClass_ht_url(me, hotspot);
            if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
                hotspotTemplates[hotspot.skinid] = [];
            }
            hotspotTemplates[hotspot.skinid].push(hsinst);
            me.callChildLogicBlocksHotspot_ht_url_changenodeid();
            ;
            me.callChildLogicBlocksHotspot_ht_url_configloaded();
            ;
            me.callChildLogicBlocksHotspot_ht_url_mouseover();
            ;
            me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_userdata();
            ;
            me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_image_popup();
            ;
            me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_info_popup();
            ;
            me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_file();
            ;
            me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_url();
            ;
            me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_vimeo();
            ;
            me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_youtube();
            ;
            me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_website();
            ;
            me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_timer();
            ;
            me.callChildLogicBlocksHotspot_ht_url_varchanged_opt_url();
            ;
        } else if (hotspot.skinid == 'ht_info') {
            hotspot.skinid = 'ht_info';
            hsinst = new SkinHotspotClass_ht_info(me, hotspot);
            if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
                hotspotTemplates[hotspot.skinid] = [];
            }
            hotspotTemplates[hotspot.skinid].push(hsinst);
            me.callChildLogicBlocksHotspot_ht_info_changenodeid();
            ;
            me.callChildLogicBlocksHotspot_ht_info_configloaded();
            ;
            me.callChildLogicBlocksHotspot_ht_info_mouseover();
            ;
            me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_userdata();
            ;
            me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_image_popup();
            ;
            me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_info_popup();
            ;
            me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_file();
            ;
            me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_url();
            ;
            me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_vimeo();
            ;
            me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_youtube();
            ;
            me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_website();
            ;
            me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_timer();
            ;
        } else if (hotspot.skinid == 'ht_image') {
            hotspot.skinid = 'ht_image';
            hsinst = new SkinHotspotClass_ht_image(me, hotspot);
            if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
                hotspotTemplates[hotspot.skinid] = [];
            }
            hotspotTemplates[hotspot.skinid].push(hsinst);
            me.callChildLogicBlocksHotspot_ht_image_changenodeid();
            ;
            me.callChildLogicBlocksHotspot_ht_image_configloaded();
            ;
            me.callChildLogicBlocksHotspot_ht_image_mouseover();
            ;
            me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_userdata();
            ;
            me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_image_popup();
            ;
            me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_info_popup();
            ;
            me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_file();
            ;
            me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_url();
            ;
            me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_vimeo();
            ;
            me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_youtube();
            ;
            me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_website();
            ;
            me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_timer();
            ;
        } else if (hotspot.skinid == 'ht_video_file') {
            hotspot.skinid = 'ht_video_file';
            hsinst = new SkinHotspotClass_ht_video_file(me, hotspot);
            if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
                hotspotTemplates[hotspot.skinid] = [];
            }
            hotspotTemplates[hotspot.skinid].push(hsinst);
            me.callChildLogicBlocksHotspot_ht_video_file_changenodeid();
            ;
            me.callChildLogicBlocksHotspot_ht_video_file_configloaded();
            ;
            me.callChildLogicBlocksHotspot_ht_video_file_mouseover();
            ;
            me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_userdata();
            ;
            me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_image_popup();
            ;
            me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_info_popup();
            ;
            me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_file();
            ;
            me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_url();
            ;
            me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_vimeo();
            ;
            me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_youtube();
            ;
            me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_website();
            ;
            me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_timer();
            ;
        } else if (hotspot.skinid == 'ht_video_url') {
            hotspot.skinid = 'ht_video_url';
            hsinst = new SkinHotspotClass_ht_video_url(me, hotspot);
            if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
                hotspotTemplates[hotspot.skinid] = [];
            }
            hotspotTemplates[hotspot.skinid].push(hsinst);
            me.callChildLogicBlocksHotspot_ht_video_url_changenodeid();
            ;
            me.callChildLogicBlocksHotspot_ht_video_url_configloaded();
            ;
            me.callChildLogicBlocksHotspot_ht_video_url_mouseover();
            ;
            me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_userdata();
            ;
            me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_image_popup();
            ;
            me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_info_popup();
            ;
            me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_file();
            ;
            me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_url();
            ;
            me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_vimeo();
            ;
            me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_youtube();
            ;
            me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_website();
            ;
            me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_timer();
            ;
        } else if (hotspot.skinid == 'ht_video_vimeo') {
            hotspot.skinid = 'ht_video_vimeo';
            hsinst = new SkinHotspotClass_ht_video_vimeo(me, hotspot);
            if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
                hotspotTemplates[hotspot.skinid] = [];
            }
            hotspotTemplates[hotspot.skinid].push(hsinst);
            me.callChildLogicBlocksHotspot_ht_video_vimeo_changenodeid();
            ;
            me.callChildLogicBlocksHotspot_ht_video_vimeo_configloaded();
            ;
            me.callChildLogicBlocksHotspot_ht_video_vimeo_mouseover();
            ;
            me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_userdata();
            ;
            me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_image_popup();
            ;
            me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_info_popup();
            ;
            me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_file();
            ;
            me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_url();
            ;
            me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_vimeo();
            ;
            me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_youtube();
            ;
            me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_website();
            ;
            me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_timer();
            ;
        } else {
            hotspot.skinid = 'ht_video_youtube';
            hsinst = new SkinHotspotClass_ht_video_youtube(me, hotspot);
            if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
                hotspotTemplates[hotspot.skinid] = [];
            }
            hotspotTemplates[hotspot.skinid].push(hsinst);
            me.callChildLogicBlocksHotspot_ht_video_youtube_changenodeid();
            ;
            me.callChildLogicBlocksHotspot_ht_video_youtube_configloaded();
            ;
            me.callChildLogicBlocksHotspot_ht_video_youtube_mouseover();
            ;
            me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_userdata();
            ;
            me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_image_popup();
            ;
            me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_info_popup();
            ;
            me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_file();
            ;
            me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_url();
            ;
            me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_vimeo();
            ;
            me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_youtube();
            ;
            me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_website();
            ;
            me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_timer();
            ;
        }
        return hsinst;
    }
    me.removeSkinHotspots = function () {
        if (hotspotTemplates['ht_node']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_node'].length; i++) {
                hotspotTemplates['ht_node'][i] = null;
            }
        }
        if (hotspotTemplates['ht_url']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_url'].length; i++) {
                hotspotTemplates['ht_url'][i] = null;
            }
        }
        if (hotspotTemplates['ht_info']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_info'].length; i++) {
                hotspotTemplates['ht_info'][i] = null;
            }
        }
        if (hotspotTemplates['ht_image']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_image'].length; i++) {
                hotspotTemplates['ht_image'][i] = null;
            }
        }
        if (hotspotTemplates['ht_video_file']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
                hotspotTemplates['ht_video_file'][i] = null;
            }
        }
        if (hotspotTemplates['ht_video_url']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
                hotspotTemplates['ht_video_url'][i] = null;
            }
        }
        if (hotspotTemplates['ht_video_vimeo']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
                hotspotTemplates['ht_video_vimeo'][i] = null;
            }
        }
        if (hotspotTemplates['ht_video_youtube']) {
            var i;
            for (i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
                hotspotTemplates['ht_video_youtube'][i] = null;
            }
        }
        hotspotTemplates = [];
    }

    function SkinCloner_thumbnail_cloner_Class(nodeId, parentScope, ggParent, parameter) {
        var me = this;
        var hs = '';
        me.parentScope = parentScope;
        me.ggParent = ggParent;
        me.findElements = skin.findElements;
        me.ggNodeId = nodeId;
        me.ggUserdata = skin.player.getNodeUserdata(me.ggNodeId);
        me.elementMouseDown = {};
        me.elementMouseOver = {};
        me.__div = document.createElement('div');
        me.__div.setAttribute('style', 'position: absolute;width: 96px; height: 62px; visibility: inherit; overflow: visible;');
        me.__div.style.left = parameter.left;
        me.__div.style.top = parameter.top;
        me.__div.ggIsActive = function () {
            return player.getCurrentNode() == me.ggNodeId;
        }
        me.__div.ggElementNodeId = function () {
            return me.ggNodeId;
        }
        el = me._thumbnail_nodeimage = document.createElement('div');
        els = me._thumbnail_nodeimage__img = document.createElement('img');
        els.className = 'ggskin ggskin_nodeimage';
        els.setAttribute('src', basePath + "images/ht_preview_nodeimage_" + nodeId + ".jpg");
        el.ggNodeId = nodeId;
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;thumbnail_nodeimage;');
        els.className = 'ggskin ggskin_nodeimage';
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        el.ggId = "thumbnail_nodeImage";
        el.ggDx = 0;
        el.ggDy = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 0.62, sy: 0.58};
        el.ggVisible = true;
        el.className = "ggskin ggskin_nodeimage ";
        el.ggType = 'nodeimage';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 90px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -10000px;';
        hs += 'visibility : inherit;';
        hs += 'width : 140px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        el.style[domTransform] = parameterToTransform(el.ggParameter);
        me._thumbnail_nodeimage.ggIsActive = function () {
            return player.getCurrentNode() == this.ggElementNodeId();
        }
        el.ggElementNodeId = function () {
            return this.ggNodeId;
        }
        me._thumbnail_nodeimage.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
                var ph = this.parentNode.clientHeight;
                var h = this.offsetHeight;
                this.style.top = (this.ggDy + ph / 2 - h / 2) + 'px';
            }
        }
        me.__div.appendChild(me._thumbnail_nodeimage);
        el = me._checkmark_tick = document.createElement('div');
        els = me._checkmark_tick__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgLTI0MCAzMzIgMTMwIDEzMD' +
            'siIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6IzAwMDAwMDt9DQoJLnN0MXtmaWxsOiNGRkZGRkY7fQ0KPC9zdHlsZT4NCjxnIGlkPSJMYXllcl8xXzFfIj4NCjwvZz4NCjxnIGlkPSJMYXllcl8yIj4NCgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNLTEyMi4xLDM0MS41aC0xMDUuOGMtMS40LDAtMi42LDEuMS0yLjYsMi42djEwNS44YzAsMS40LDEuMSwyLjYsMi42LDIuNmgxMDUuOGMxLjQsMCwyLjYtMS4xLDIuNi0yLjZWMzQ0LjENCgkJQy0xMTkuNiwzNDIuNy0xMjAuNywzNDEuNS0xMjIuMSwzNDEuNXogTS0xMzIuOCwzODEuN2wtNTAu' +
            'OCw1MC44Yy0wLjMsMC4zLTAuOCwwLjUtMS4yLDAuNWMtMC41LDAtMC45LTAuMS0xLjMtMC41bC0zMS43LTMxLjgNCgkJYy0wLjctMC43LTAuNy0xLjcsMC0yLjRsMTIuNS0xMi41YzAuNy0wLjcsMS43LTAuNywyLjQsMGwxOCwxOGwzNy4xLTM3LjFjMC43LTAuNywxLjctMC43LDIuNCwwbDEyLjUsMTIuNQ0KCQlDLTEzMi4xLDM3OS45LTEzMi4xLDM4MS0xMzIuOCwzODEuN3oiLz4NCgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNLTE0Ny43LDM2Ni44bC0zNy4xLDM3LjFsLTE4LTE4Yy0wLjctMC43LTEuNy0wLjctMi40LDBsLTEyLjUsMTIuNWMtMC43LDAuNy0wLjcsMS43LDAsMi40bDMxLjcsMzEuOA' +
            '0KCQljMC4zLDAuMywwLjgsMC41LDEuMywwLjVjMC40LDAsMC45LTAuMiwxLjItMC41bDUwLjgtNTAuOWMwLjctMC43LDAuNy0xLjcsMC0yLjRsLTEyLjUtMTIuNUMtMTQ1LjksMzY2LjEtMTQ3LDM2Ni4xLTE0Ny43LDM2Ni44eiINCgkJLz4NCjwvZz4NCjwvc3ZnPg0K';
        me._checkmark_tick__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;checkmark_tick;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        el.ggId = "checkmark_tick";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'height : 19px;';
        hs += 'position : absolute;';
        hs += 'right : 3px;';
        hs += 'top : 3px;';
        hs += 'visibility : hidden;';
        hs += 'width : 19px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._checkmark_tick.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._checkmark_tick.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.nodeVisited(me._checkmark_tick.ggElementNodeId()) == true) ||
                (me._checkmark_tick.ggIsActive() == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._checkmark_tick.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._checkmark_tick.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._checkmark_tick.style[domTransition] = '';
                if (me._checkmark_tick.ggCurrentLogicStateVisible == 0) {
                    me._checkmark_tick.style.visibility = (Number(me._checkmark_tick.style.opacity) > 0 || !me._checkmark_tick.style.opacity) ? 'inherit' : 'hidden';
                    me._checkmark_tick.ggVisible = true;
                } else {
                    me._checkmark_tick.style.visibility = "hidden";
                    me._checkmark_tick.ggVisible = false;
                }
            }
        }
        me._checkmark_tick.ggUpdatePosition = function (useTransition) {
        }
        me.__div.appendChild(me._checkmark_tick);
        el = me._thumbnail_active = document.createElement('div');
        el.ggId = "thumbnail_active";
        el.ggDx = 0;
        el.ggDy = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_rectangle ";
        el.ggType = 'rectangle';
        hs = '';
        hs += 'border : 3px solid #000000;';
        hs += 'cursor : pointer;';
        hs += 'height : 51px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -10000px;';
        hs += 'visibility : inherit;';
        hs += 'width : 85px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._thumbnail_active.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._thumbnail_active.logicBlock_bordercolor = function () {
            var newLogicStateBorderColor;
            if (
                (me._thumbnail_active.ggIsActive() == true)
            ) {
                newLogicStateBorderColor = 0;
            } else if (
                (me.elementMouseOver['thumbnail_active'] == true)
            ) {
                newLogicStateBorderColor = 1;
            } else {
                newLogicStateBorderColor = -1;
            }
            if (me._thumbnail_active.ggCurrentLogicStateBorderColor != newLogicStateBorderColor) {
                me._thumbnail_active.ggCurrentLogicStateBorderColor = newLogicStateBorderColor;
                me._thumbnail_active.style[domTransition] = 'border-color 0s';
                if (me._thumbnail_active.ggCurrentLogicStateBorderColor == 0) {
                    me._thumbnail_active.style.borderColor = "rgba(192,192,192,1)";
                } else if (me._thumbnail_active.ggCurrentLogicStateBorderColor == 1) {
                    me._thumbnail_active.style.borderColor = "rgba(192,192,192,1)";
                } else {
                    me._thumbnail_active.style.borderColor = "rgba(0,0,0,1)";
                }
            }
        }
        me._thumbnail_active.onclick = function (e) {
            player.openNext("{" + me.ggNodeId + "}", "");
        }
        me._thumbnail_active.onmouseover = function (e) {
            me.elementMouseOver['thumbnail_active'] = true;
            me._thumbnail_title.logicBlock_alpha();
            me._thumbnail_active.logicBlock_bordercolor();
        }
        me._thumbnail_active.onmouseout = function (e) {
            me.elementMouseOver['thumbnail_active'] = false;
            me._thumbnail_title.logicBlock_alpha();
            me._thumbnail_active.logicBlock_bordercolor();
        }
        me._thumbnail_active.ontouchend = function (e) {
            me.elementMouseOver['thumbnail_active'] = false;
            me._thumbnail_title.logicBlock_alpha();
            me._thumbnail_active.logicBlock_bordercolor();
        }
        me._thumbnail_active.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
                var ph = this.parentNode.clientHeight;
                var h = this.offsetHeight;
                this.style.top = (this.ggDy + ph / 2 - h / 2) + 'px';
            }
        }
        el = me._thumbnail_title = document.createElement('div');
        els = me._thumbnail_title__text = document.createElement('div');
        el.className = 'ggskin ggskin_textdiv';
        el.ggTextDiv = els;
        el.ggId = "thumbnail_title";
        el.ggDx = 0;
        el.ggDy = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_text ";
        el.ggType = 'text';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 51px;';
        hs += 'left : -10000px;';
        hs += 'opacity : 0;';
        hs += 'position : absolute;';
        hs += 'top : -10000px;';
        hs += 'visibility : hidden;';
        hs += 'width : 85px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        hs = 'position:absolute;';
        hs += 'box-sizing: border-box;';
        hs += 'left: 0px;';
        hs += 'top:  0px;';
        hs += 'width: 85px;';
        hs += 'height: 51px;';
        hs += 'background: #000000;';
        hs += 'background: rgba(0,0,0,0.588235);';
        hs += 'border: 0px solid #000000;';
        hs += 'color: rgba(255,255,255,1);';
        hs += 'text-align: center;';
        hs += 'white-space: pre-wrap;';
        hs += 'padding: 0px 1px 0px 1px;';
        hs += 'overflow: hidden;';
        els.setAttribute('style', hs);
        els.innerHTML = me.ggUserdata.title;
        el.appendChild(els);
        me._thumbnail_title.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._thumbnail_title.logicBlock_alpha = function () {
            var newLogicStateAlpha;
            if (
                (me.elementMouseOver['thumbnail_active'] == true) &&
                (me.ggUserdata.title != "") &&
                (player.getVariableValue('opt_thumbnail_tooltip') == true)
            ) {
                newLogicStateAlpha = 0;
            } else {
                newLogicStateAlpha = -1;
            }
            if (me._thumbnail_title.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
                me._thumbnail_title.ggCurrentLogicStateAlpha = newLogicStateAlpha;
                me._thumbnail_title.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._thumbnail_title.ggCurrentLogicStateAlpha == 0) {
                    me._thumbnail_title.style.visibility = me._thumbnail_title.ggVisible ? 'inherit' : 'hidden';
                    me._thumbnail_title.style.opacity = 1;
                } else {
                    me._thumbnail_title.style.visibility = "hidden";
                    me._thumbnail_title.style.opacity = 0;
                }
            }
        }
        me._thumbnail_title.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth + 0;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
                var ph = this.parentNode.clientHeight;
                var h = this.offsetHeight;
                this.style.top = (this.ggDy + ph / 2 - h / 2) + 'px';
            }
        }
        me._thumbnail_active.appendChild(me._thumbnail_title);
        me.__div.appendChild(me._thumbnail_active);
    };

    function SkinCloner_thumbnail_cloner_mobile_Class(nodeId, parentScope, ggParent, parameter) {
        var me = this;
        var hs = '';
        me.parentScope = parentScope;
        me.ggParent = ggParent;
        me.findElements = skin.findElements;
        me.ggNodeId = nodeId;
        me.ggUserdata = skin.player.getNodeUserdata(me.ggNodeId);
        me.elementMouseDown = {};
        me.elementMouseOver = {};
        me.__div = document.createElement('div');
        me.__div.setAttribute('style', 'position: absolute;width: 96px; height: 62px; visibility: inherit; overflow: visible;');
        me.__div.style.left = parameter.left;
        me.__div.style.top = parameter.top;
        me.__div.ggIsActive = function () {
            return player.getCurrentNode() == me.ggNodeId;
        }
        me.__div.ggElementNodeId = function () {
            return me.ggNodeId;
        }
        el = me._thumbnail_nodeimage_mobile = document.createElement('div');
        els = me._thumbnail_nodeimage_mobile__img = document.createElement('img');
        els.className = 'ggskin ggskin_nodeimage';
        els.setAttribute('src', basePath + "images/ht_preview_nodeimage_" + nodeId + ".jpg");
        el.ggNodeId = nodeId;
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;thumbnail_nodeimage_mobile;');
        els.className = 'ggskin ggskin_nodeimage';
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        el.ggId = "thumbnail_nodeImage_mobile";
        el.ggDx = 0;
        el.ggDy = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 0.62, sy: 0.58};
        el.ggVisible = true;
        el.className = "ggskin ggskin_nodeimage ";
        el.ggType = 'nodeimage';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 90px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -10000px;';
        hs += 'visibility : inherit;';
        hs += 'width : 140px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        el.style[domTransform] = parameterToTransform(el.ggParameter);
        me._thumbnail_nodeimage_mobile.ggIsActive = function () {
            return player.getCurrentNode() == this.ggElementNodeId();
        }
        el.ggElementNodeId = function () {
            return this.ggNodeId;
        }
        me._thumbnail_nodeimage_mobile.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
                var ph = this.parentNode.clientHeight;
                var h = this.offsetHeight;
                this.style.top = (this.ggDy + ph / 2 - h / 2) + 'px';
            }
        }
        me.__div.appendChild(me._thumbnail_nodeimage_mobile);
        el = me._checkmark_tick_mobile = document.createElement('div');
        els = me._checkmark_tick_mobile__img = document.createElement('img');
        els.className = 'ggskin ggskin_svg';
        hs = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgLTI0MCAzMzIgMTMwIDEzMD' +
            'siIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6IzAwMDAwMDt9DQoJLnN0MXtmaWxsOiNGRkZGRkY7fQ0KPC9zdHlsZT4NCjxnIGlkPSJMYXllcl8xXzFfIj4NCjwvZz4NCjxnIGlkPSJMYXllcl8yIj4NCgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNLTEyMi4xLDM0MS41aC0xMDUuOGMtMS40LDAtMi42LDEuMS0yLjYsMi42djEwNS44YzAsMS40LDEuMSwyLjYsMi42LDIuNmgxMDUuOGMxLjQsMCwyLjYtMS4xLDIuNi0yLjZWMzQ0LjENCgkJQy0xMTkuNiwzNDIuNy0xMjAuNywzNDEuNS0xMjIuMSwzNDEuNXogTS0xMzIuOCwzODEuN2wtNTAu' +
            'OCw1MC44Yy0wLjMsMC4zLTAuOCwwLjUtMS4yLDAuNWMtMC41LDAtMC45LTAuMS0xLjMtMC41bC0zMS43LTMxLjgNCgkJYy0wLjctMC43LTAuNy0xLjcsMC0yLjRsMTIuNS0xMi41YzAuNy0wLjcsMS43LTAuNywyLjQsMGwxOCwxOGwzNy4xLTM3LjFjMC43LTAuNywxLjctMC43LDIuNCwwbDEyLjUsMTIuNQ0KCQlDLTEzMi4xLDM3OS45LTEzMi4xLDM4MS0xMzIuOCwzODEuN3oiLz4NCgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNLTE0Ny43LDM2Ni44bC0zNy4xLDM3LjFsLTE4LTE4Yy0wLjctMC43LTEuNy0wLjctMi40LDBsLTEyLjUsMTIuNWMtMC43LDAuNy0wLjcsMS43LDAsMi40bDMxLjcsMzEuOA' +
            '0KCQljMC4zLDAuMywwLjgsMC41LDEuMywwLjVjMC40LDAsMC45LTAuMiwxLjItMC41bDUwLjgtNTAuOWMwLjctMC43LDAuNy0xLjcsMC0yLjRsLTEyLjUtMTIuNUMtMTQ1LjksMzY2LjEtMTQ3LDM2Ni4xLTE0Ny43LDM2Ni44eiINCgkJLz4NCjwvZz4NCjwvc3ZnPg0K';
        me._checkmark_tick_mobile__img.setAttribute('src', hs);
        els.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;checkmark_tick_mobile;');
        els['ondragstart'] = function () {
            return false;
        };
        el.appendChild(els);
        el.ggSubElement = els;
        el.ggId = "checkmark_tick_mobile";
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = false;
        el.className = "ggskin ggskin_svg ";
        el.ggType = 'svg';
        hs = '';
        hs += 'height : 19px;';
        hs += 'position : absolute;';
        hs += 'right : 3px;';
        hs += 'top : 3px;';
        hs += 'visibility : hidden;';
        hs += 'width : 19px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._checkmark_tick_mobile.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._checkmark_tick_mobile.logicBlock_visible = function () {
            var newLogicStateVisible;
            if (
                (player.nodeVisited(me._checkmark_tick_mobile.ggElementNodeId()) == true) ||
                (me._checkmark_tick_mobile.ggIsActive() == true)
            ) {
                newLogicStateVisible = 0;
            } else {
                newLogicStateVisible = -1;
            }
            if (me._checkmark_tick_mobile.ggCurrentLogicStateVisible != newLogicStateVisible) {
                me._checkmark_tick_mobile.ggCurrentLogicStateVisible = newLogicStateVisible;
                me._checkmark_tick_mobile.style[domTransition] = '';
                if (me._checkmark_tick_mobile.ggCurrentLogicStateVisible == 0) {
                    me._checkmark_tick_mobile.style.visibility = (Number(me._checkmark_tick_mobile.style.opacity) > 0 || !me._checkmark_tick_mobile.style.opacity) ? 'inherit' : 'hidden';
                    me._checkmark_tick_mobile.ggVisible = true;
                } else {
                    me._checkmark_tick_mobile.style.visibility = "hidden";
                    me._checkmark_tick_mobile.ggVisible = false;
                }
            }
        }
        me._checkmark_tick_mobile.ggUpdatePosition = function (useTransition) {
        }
        me.__div.appendChild(me._checkmark_tick_mobile);
        el = me._thumbnail_active_mobile = document.createElement('div');
        el.ggId = "thumbnail_active_mobile";
        el.ggDx = 0;
        el.ggDy = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_rectangle ";
        el.ggType = 'rectangle';
        hs = '';
        hs += 'border : 3px solid #000000;';
        hs += 'cursor : pointer;';
        hs += 'height : 51px;';
        hs += 'left : -10000px;';
        hs += 'position : absolute;';
        hs += 'top : -10000px;';
        hs += 'visibility : inherit;';
        hs += 'width : 85px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        me._thumbnail_active_mobile.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._thumbnail_active_mobile.logicBlock_bordercolor = function () {
            var newLogicStateBorderColor;
            if (
                (me._thumbnail_active_mobile.ggIsActive() == true)
            ) {
                newLogicStateBorderColor = 0;
            } else if (
                (me.elementMouseOver['thumbnail_active_mobile'] == true)
            ) {
                newLogicStateBorderColor = 1;
            } else {
                newLogicStateBorderColor = -1;
            }
            if (me._thumbnail_active_mobile.ggCurrentLogicStateBorderColor != newLogicStateBorderColor) {
                me._thumbnail_active_mobile.ggCurrentLogicStateBorderColor = newLogicStateBorderColor;
                me._thumbnail_active_mobile.style[domTransition] = 'border-color 0s';
                if (me._thumbnail_active_mobile.ggCurrentLogicStateBorderColor == 0) {
                    me._thumbnail_active_mobile.style.borderColor = "rgba(192,192,192,1)";
                } else if (me._thumbnail_active_mobile.ggCurrentLogicStateBorderColor == 1) {
                    me._thumbnail_active_mobile.style.borderColor = "rgba(192,192,192,1)";
                } else {
                    me._thumbnail_active_mobile.style.borderColor = "rgba(0,0,0,1)";
                }
            }
        }
        me._thumbnail_active_mobile.onclick = function (e) {
            player.openNext("{" + me.ggNodeId + "}", "");
            player.setVariableValue('vis_thumbnail_menu_mobile', false);
        }
        me._thumbnail_active_mobile.onmouseover = function (e) {
            me.elementMouseOver['thumbnail_active_mobile'] = true;
            me._thumbnail_title_mobile.logicBlock_alpha();
            me._thumbnail_active_mobile.logicBlock_bordercolor();
        }
        me._thumbnail_active_mobile.onmouseout = function (e) {
            me.elementMouseOver['thumbnail_active_mobile'] = false;
            me._thumbnail_title_mobile.logicBlock_alpha();
            me._thumbnail_active_mobile.logicBlock_bordercolor();
        }
        me._thumbnail_active_mobile.ontouchend = function (e) {
            me.elementMouseOver['thumbnail_active_mobile'] = false;
            me._thumbnail_title_mobile.logicBlock_alpha();
            me._thumbnail_active_mobile.logicBlock_bordercolor();
        }
        me._thumbnail_active_mobile.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
                var ph = this.parentNode.clientHeight;
                var h = this.offsetHeight;
                this.style.top = (this.ggDy + ph / 2 - h / 2) + 'px';
            }
        }
        el = me._thumbnail_title_mobile = document.createElement('div');
        els = me._thumbnail_title_mobile__text = document.createElement('div');
        el.className = 'ggskin ggskin_textdiv';
        el.ggTextDiv = els;
        el.ggId = "thumbnail_title_mobile";
        el.ggDx = 0;
        el.ggDy = 0;
        el.ggParameter = {rx: 0, ry: 0, a: 0, sx: 1, sy: 1};
        el.ggVisible = true;
        el.className = "ggskin ggskin_text ";
        el.ggType = 'text';
        hs = '';
        hs += 'cursor : pointer;';
        hs += 'height : 51px;';
        hs += 'left : -10000px;';
        hs += 'opacity : 0;';
        hs += 'position : absolute;';
        hs += 'top : -10000px;';
        hs += 'visibility : hidden;';
        hs += 'width : 85px;';
        hs += 'pointer-events:auto;';
        el.setAttribute('style', hs);
        el.style[domTransform + 'Origin'] = '50% 50%';
        hs = 'position:absolute;';
        hs += 'box-sizing: border-box;';
        hs += 'left: 0px;';
        hs += 'top:  0px;';
        hs += 'width: 85px;';
        hs += 'height: 51px;';
        hs += 'background: #000000;';
        hs += 'background: rgba(0,0,0,0.588235);';
        hs += 'border: 0px solid #000000;';
        hs += 'color: rgba(255,255,255,1);';
        hs += 'text-align: center;';
        hs += 'white-space: pre-wrap;';
        hs += 'padding: 0px 1px 0px 1px;';
        hs += 'overflow: hidden;';
        els.setAttribute('style', hs);
        els.innerHTML = me.ggUserdata.title;
        el.appendChild(els);
        me._thumbnail_title_mobile.ggIsActive = function () {
            if ((this.parentNode) && (this.parentNode.ggIsActive)) {
                return this.parentNode.ggIsActive();
            }
            return false;
        }
        el.ggElementNodeId = function () {
            if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
                return this.parentNode.ggElementNodeId();
            }
            return player.getCurrentNode();
        }
        me._thumbnail_title_mobile.logicBlock_alpha = function () {
            var newLogicStateAlpha;
            if (
                (me.elementMouseOver['thumbnail_active_mobile'] == true) &&
                (me.ggUserdata.title != "") &&
                (player.getVariableValue('opt_thumbnail_tooltip') == true)
            ) {
                newLogicStateAlpha = 0;
            } else {
                newLogicStateAlpha = -1;
            }
            if (me._thumbnail_title_mobile.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
                me._thumbnail_title_mobile.ggCurrentLogicStateAlpha = newLogicStateAlpha;
                me._thumbnail_title_mobile.style[domTransition] = 'opacity 500ms ease 0ms, visibility 500ms ease 0ms';
                if (me._thumbnail_title_mobile.ggCurrentLogicStateAlpha == 0) {
                    me._thumbnail_title_mobile.style.visibility = me._thumbnail_title_mobile.ggVisible ? 'inherit' : 'hidden';
                    me._thumbnail_title_mobile.style.opacity = 1;
                } else {
                    me._thumbnail_title_mobile.style.visibility = "hidden";
                    me._thumbnail_title_mobile.style.opacity = 0;
                }
            }
        }
        me._thumbnail_title_mobile.ggUpdatePosition = function (useTransition) {
            if (useTransition === 'undefined') {
                useTransition = false;
            }
            if (!useTransition) {
                this.style[domTransition] = 'none';
            }
            if (this.parentNode) {
                var pw = this.parentNode.clientWidth;
                var w = this.offsetWidth + 0;
                this.style.left = (this.ggDx + pw / 2 - w / 2) + 'px';
                var ph = this.parentNode.clientHeight;
                var h = this.offsetHeight;
                this.style.top = (this.ggDy + ph / 2 - h / 2) + 'px';
            }
        }
        me._thumbnail_active_mobile.appendChild(me._thumbnail_title_mobile);
        me.__div.appendChild(me._thumbnail_active_mobile);
    };
    me.addSkin();
    me._screentint.logicBlock_alpha();
    me._thumbnail_hide_button_show.logicBlock_alpha();
    me._thumbnail_show_button_show.logicBlock_alpha();
    me._thumbnail_menu.logicBlock_visible();
    me._thumbnail_menu.logicBlock_alpha();
    me._thumbnail_menu_mobile.logicBlock_visible();
    me._thumbnail_menu_mobile.logicBlock_alpha();
    me._loading_multires.logicBlock_visible();
    me._fullscreen.logicBlock_alpha();
    me._fullscreen_off.logicBlock_alpha();
    me._menu_button.logicBlock_position();
    me._controller.logicBlock_position();
    me._controller.logicBlock_alpha();
    me._controller_bg.logicBlock_position();
    me._controller_bg.logicBlock_size();
    me._controller_bg.logicBlock_visible();
    me._controller_slider.logicBlock_position();
    me._fullscreen_buttons.logicBlock_position();
    me._fullscreen_buttons.logicBlock_visible();
    me._gyro.logicBlock_position();
    me._gyro.logicBlock_visible();
    me._gyro_on.logicBlock_alpha();
    me._gyro_off.logicBlock_alpha();
    me._projection_buttons.logicBlock_position();
    me._projection_buttons.logicBlock_visible();
    me._thumbnail.logicBlock_position();
    me._thumbnail.logicBlock_visible();
    me._info.logicBlock_position();
    me._info.logicBlock_visible();
    me._autorotate_buttons.logicBlock_position();
    me._autorotate_buttons.logicBlock_visible();
    me._autorotate_start.logicBlock_alpha();
    me._autorotate_stop.logicBlock_alpha();
    me._zoomout.logicBlock_visible();
    me._zoomin.logicBlock_visible();
    me._thumbnail_menu.logicBlock_position();
    me._thumbnail_menu_mobile.logicBlock_position();
    me._web_page.logicBlock_visible();
    me._userdata.logicBlock_visible();
    me._information.logicBlock_visible();
    me._image_popup.logicBlock_visible();
    me._popup_image.logicBlock_visible();
    me._video_popup_file.logicBlock_visible();
    me._popup_video_file.logicBlock_visible();
    me._video_popup_controls_file.logicBlock_visible();
    me._video_popup_url.logicBlock_visible();
    me._popup_video_url.logicBlock_visible();
    me._video_popup_controls_url.logicBlock_visible();
    me._video_popup_vimeo.logicBlock_visible();
    me._popup_video_vimeo.logicBlock_visible();
    me._video_popup_youtube.logicBlock_visible();
    me._popup_video_youtube.logicBlock_visible();
    me.__360image_gyro.logicBlock_visible();
    me.__360image.logicBlock_position();
    me.__360image.logicBlock_scaling();
    me._phone2.logicBlock_scaling();
    me._phone3.logicBlock_scaling();
    me._close.logicBlock_visible();
    me._loading.logicBlock_visible();
    me._rectilinear.logicBlock_alpha();
    me._fisheye.logicBlock_alpha();
    me._stereographic.logicBlock_alpha();
    player.addListener('sizechanged', function (args) {
        me._screentint.logicBlock_alpha();
        me._thumbnail_hide_button_show.logicBlock_alpha();
        me._thumbnail_show_button_show.logicBlock_alpha();
        me._thumbnail_menu.logicBlock_visible();
        me._thumbnail_menu.logicBlock_alpha();
        me._thumbnail_menu_mobile.logicBlock_visible();
        me._thumbnail_menu_mobile.logicBlock_alpha();
    });
    player.addListener('tilesready', function (args) {
        me._loading_multires.logicBlock_visible();
    });
    player.addListener('tilesrequested', function (args) {
        me._loading_multires.logicBlock_visible();
    });
    player.addListener('fullscreenenter', function (args) {
        me._fullscreen.logicBlock_alpha();
        me._fullscreen_off.logicBlock_alpha();
    });
    player.addListener('fullscreenexit', function (args) {
        me._fullscreen.logicBlock_alpha();
        me._fullscreen_off.logicBlock_alpha();
    });
    player.addListener('changenodeid', function (args) {
        me._menu_button.logicBlock_position();
        me._loading_multires.logicBlock_visible();
        me._screentint.logicBlock_alpha();
        me._controller.logicBlock_position();
        me._controller.logicBlock_alpha();
        me._controller_bg.logicBlock_position();
        me._controller_bg.logicBlock_size();
        me._controller_bg.logicBlock_visible();
        me._controller_slider.logicBlock_position();
        me._fullscreen_buttons.logicBlock_position();
        me._fullscreen_buttons.logicBlock_visible();
        me._gyro.logicBlock_position();
        me._gyro.logicBlock_visible();
        me._gyro_on.logicBlock_alpha();
        me._gyro_off.logicBlock_alpha();
        me._projection_buttons.logicBlock_position();
        me._projection_buttons.logicBlock_visible();
        me._thumbnail.logicBlock_position();
        me._thumbnail.logicBlock_visible();
        me._thumbnail_hide_button_show.logicBlock_alpha();
        me._thumbnail_show_button_show.logicBlock_alpha();
        me._info.logicBlock_position();
        me._info.logicBlock_visible();
        me._autorotate_buttons.logicBlock_position();
        me._autorotate_buttons.logicBlock_visible();
        me._autorotate_start.logicBlock_alpha();
        me._autorotate_stop.logicBlock_alpha();
        me._zoomout.logicBlock_visible();
        me._zoomin.logicBlock_visible();
        me._thumbnail_menu.logicBlock_position();
        me._thumbnail_menu.logicBlock_visible();
        me._thumbnail_menu.logicBlock_alpha();
        me._thumbnail_menu_mobile.logicBlock_position();
        me._thumbnail_menu_mobile.logicBlock_visible();
        me._thumbnail_menu_mobile.logicBlock_alpha();
        me._web_page.logicBlock_visible();
        me._userdata.logicBlock_visible();
        me._information.logicBlock_visible();
        me._image_popup.logicBlock_visible();
        me._popup_image.logicBlock_visible();
        me._video_popup_file.logicBlock_visible();
        me._popup_video_file.logicBlock_visible();
        me._video_popup_controls_file.logicBlock_visible();
        me._video_popup_url.logicBlock_visible();
        me._popup_video_url.logicBlock_visible();
        me._video_popup_controls_url.logicBlock_visible();
        me._video_popup_vimeo.logicBlock_visible();
        me._popup_video_vimeo.logicBlock_visible();
        me._video_popup_youtube.logicBlock_visible();
        me._popup_video_youtube.logicBlock_visible();
        me.__360image_gyro.logicBlock_visible();
        me.__360image.logicBlock_position();
        me.__360image.logicBlock_scaling();
        me._phone2.logicBlock_scaling();
        me._phone3.logicBlock_scaling();
        me._close.logicBlock_visible();
        me._loading.logicBlock_visible();
    });
    player.addListener('configloaded', function (args) {
        me._fullscreen_buttons.logicBlock_visible();
        me._gyro.logicBlock_visible();
        me._thumbnail.logicBlock_visible();
        me._thumbnail_menu.logicBlock_visible();
        me._thumbnail_menu_mobile.logicBlock_visible();
        me.__360image_gyro.logicBlock_visible();
    });
    player.addListener('projectionchanged', function (args) {
        me._rectilinear.logicBlock_alpha();
        me._fisheye.logicBlock_alpha();
        me._stereographic.logicBlock_alpha();
    });
    player.addListener('autorotatechanged', function (args) {
        me._autorotate_start.logicBlock_alpha();
        me._autorotate_stop.logicBlock_alpha();
    });
    player.addListener('gyrochanged', function (args) {
        me._gyro_on.logicBlock_alpha();
        me._gyro_off.logicBlock_alpha();
    });
    player.addListener('varchanged_vis_userdata', function (args) {
        me._menu_button.logicBlock_position();
        me._screentint.logicBlock_alpha();
        me._controller.logicBlock_position();
        me._thumbnail_menu.logicBlock_position();
        me._thumbnail_menu_mobile.logicBlock_position();
        me._userdata.logicBlock_visible();
    });
    player.addListener('varchanged_vis_image_popup', function (args) {
        me._menu_button.logicBlock_position();
        me._screentint.logicBlock_alpha();
        me._controller.logicBlock_position();
        me._thumbnail_menu.logicBlock_position();
        me._image_popup.logicBlock_visible();
        me._popup_image.logicBlock_visible();
        me._close.logicBlock_visible();
    });
    player.addListener('varchanged_vis_info_popup', function (args) {
        me._menu_button.logicBlock_position();
        me._screentint.logicBlock_alpha();
        me._controller.logicBlock_position();
        me._thumbnail_menu.logicBlock_position();
        me._information.logicBlock_visible();
    });
    player.addListener('varchanged_vis_video_popup_file', function (args) {
        me._menu_button.logicBlock_position();
        me._screentint.logicBlock_alpha();
        me._controller.logicBlock_position();
        me._thumbnail_menu.logicBlock_position();
        me._video_popup_file.logicBlock_visible();
        me._popup_video_file.logicBlock_visible();
        me._video_popup_controls_file.logicBlock_visible();
        me._close.logicBlock_visible();
    });
    player.addListener('varchanged_vis_video_popup_url', function (args) {
        me._menu_button.logicBlock_position();
        me._screentint.logicBlock_alpha();
        me._controller.logicBlock_position();
        me._thumbnail_menu.logicBlock_position();
        me._video_popup_url.logicBlock_visible();
        me._popup_video_url.logicBlock_visible();
        me._video_popup_controls_url.logicBlock_visible();
        me._close.logicBlock_visible();
    });
    player.addListener('varchanged_vis_video_popup_vimeo', function (args) {
        me._menu_button.logicBlock_position();
        me._screentint.logicBlock_alpha();
        me._controller.logicBlock_position();
        me._thumbnail_menu.logicBlock_position();
        me._video_popup_vimeo.logicBlock_visible();
        me._popup_video_vimeo.logicBlock_visible();
        me._close.logicBlock_visible();
    });
    player.addListener('varchanged_vis_video_popup_youtube', function (args) {
        me._menu_button.logicBlock_position();
        me._screentint.logicBlock_alpha();
        me._controller.logicBlock_position();
        me._thumbnail_menu.logicBlock_position();
        me._video_popup_youtube.logicBlock_visible();
        me._popup_video_youtube.logicBlock_visible();
        me._close.logicBlock_visible();
    });
    player.addListener('varchanged_vis_website', function (args) {
        me._menu_button.logicBlock_position();
        me._screentint.logicBlock_alpha();
        me._controller.logicBlock_position();
        me._thumbnail_menu.logicBlock_position();
        me._web_page.logicBlock_visible();
        me._close.logicBlock_visible();
    });
    player.addListener('varchanged_vis_timer', function (args) {
        me._controller.logicBlock_alpha();
        me._thumbnail_menu.logicBlock_alpha();
        me._thumbnail_menu_mobile.logicBlock_alpha();
    });
    player.addListener('varchanged_opt_loader_mulires', function (args) {
        me._loading_multires.logicBlock_visible();
    });
    player.addListener('varchanged_vis_thumbnail_menu_mobile', function (args) {
        me._screentint.logicBlock_alpha();
        me._thumbnail_hide_button_show.logicBlock_alpha();
        me._thumbnail_show_button_show.logicBlock_alpha();
        me._thumbnail_menu_mobile.logicBlock_alpha();
    });
    player.addListener('varchanged_vis_thumbnail_menu_auto_hide', function (args) {
        me._screentint.logicBlock_alpha();
        me._thumbnail_menu.logicBlock_alpha();
        me._thumbnail_menu_mobile.logicBlock_alpha();
    });
    player.addListener('varchanged_opt_thumbnail', function (args) {
        me._thumbnail.logicBlock_visible();
        me._thumbnail_menu.logicBlock_visible();
        me._thumbnail_menu_mobile.logicBlock_visible();
    });
    player.addListener('varchanged_vis_thumbnail_menu_show', function (args) {
        me._thumbnail_hide_button_show.logicBlock_alpha();
        me._thumbnail_show_button_show.logicBlock_alpha();
        me._thumbnail_menu.logicBlock_alpha();
    });
    player.addListener('varchanged_opt_gyro', function (args) {
        me._gyro.logicBlock_visible();
        me.__360image_gyro.logicBlock_visible();
    });
    player.addListener('varchanged_vis_360image_once', function (args) {
        me.__360image_gyro.logicBlock_visible();
    });
    player.addListener('varchanged_opt_loader', function (args) {
        me._loading.logicBlock_visible();
    });
    player.addListener('varchanged_pos_controller', function (args) {
        me._controller_bg.logicBlock_position();
        me._controller_bg.logicBlock_size();
        me._controller_bg.logicBlock_visible();
        me._controller_slider.logicBlock_position();
    });
    player.addListener('varchanged_pos_360image', function (args) {
        me.__360image.logicBlock_position();
        me.__360image.logicBlock_scaling();
        me._phone2.logicBlock_scaling();
        me._phone3.logicBlock_scaling();
    });
    player.addListener('varchanged_pos_fullscreen', function (args) {
        me._fullscreen_buttons.logicBlock_position();
    });
    player.addListener('varchanged_opt_fullscreen', function (args) {
        me._fullscreen_buttons.logicBlock_visible();
    });
    player.addListener('varchanged_pos_gyro', function (args) {
        me._gyro.logicBlock_position();
    });
    player.addListener('varchanged_opt_projection', function (args) {
        me._projection_buttons.logicBlock_visible();
    });
    player.addListener('varchanged_pos_projection', function (args) {
        me._projection_buttons.logicBlock_position();
    });
    player.addListener('varchanged_pos_thumbnail', function (args) {
        me._thumbnail.logicBlock_position();
    });
    player.addListener('varchanged_opt_info', function (args) {
        me._info.logicBlock_visible();
    });
    player.addListener('varchanged_pos_information', function (args) {
        me._info.logicBlock_position();
    });
    player.addListener('varchanged_opt_autorotate', function (args) {
        me._autorotate_buttons.logicBlock_visible();
    });
    player.addListener('varchanged_pos_autorotate', function (args) {
        me._autorotate_buttons.logicBlock_position();
    });
    player.addListener('varchanged_opt_zoom', function (args) {
        me._zoomout.logicBlock_visible();
        me._zoomin.logicBlock_visible();
    });
    player.addListener('changenodeid', function (args) {
        me._thumbnail_cloner.callChildLogicBlocks_changenodeid();
        me._thumbnail_cloner_mobile.callChildLogicBlocks_changenodeid();
    });
    player.addListener('mouseover', function (args) {
        me._thumbnail_cloner.callChildLogicBlocks_mouseover();
        me._thumbnail_cloner_mobile.callChildLogicBlocks_mouseover();
    });
    player.addListener('mouseover', function (args) {
        me._thumbnail_cloner.callChildLogicBlocks_mouseover();
        me._thumbnail_cloner_mobile.callChildLogicBlocks_mouseover();
    });
    player.addListener('changenodeid', function (args) {
        me._thumbnail_cloner.callChildLogicBlocks_active();
        me._thumbnail_cloner_mobile.callChildLogicBlocks_active();
    });
    player.addListener('varchanged_opt_thumbnail_tooltip', function (args) {
        me._thumbnail_cloner.callChildLogicBlocks_varchanged_opt_thumbnail_tooltip();
        me._thumbnail_cloner_mobile.callChildLogicBlocks_varchanged_opt_thumbnail_tooltip();
    });
    player.addListener('changenodeid', function (args) {
        me.callChildLogicBlocksHotspot_ht_node_changenodeid();
        me.callChildLogicBlocksHotspot_ht_url_changenodeid();
        me.callChildLogicBlocksHotspot_ht_info_changenodeid();
        me.callChildLogicBlocksHotspot_ht_image_changenodeid();
        me.callChildLogicBlocksHotspot_ht_video_file_changenodeid();
        me.callChildLogicBlocksHotspot_ht_video_url_changenodeid();
        me.callChildLogicBlocksHotspot_ht_video_vimeo_changenodeid();
        me.callChildLogicBlocksHotspot_ht_video_youtube_changenodeid();
    });
    player.addListener('configloaded', function (args) {
        me.callChildLogicBlocksHotspot_ht_node_configloaded();
        me.callChildLogicBlocksHotspot_ht_url_configloaded();
        me.callChildLogicBlocksHotspot_ht_info_configloaded();
        me.callChildLogicBlocksHotspot_ht_image_configloaded();
        me.callChildLogicBlocksHotspot_ht_video_file_configloaded();
        me.callChildLogicBlocksHotspot_ht_video_url_configloaded();
        me.callChildLogicBlocksHotspot_ht_video_vimeo_configloaded();
        me.callChildLogicBlocksHotspot_ht_video_youtube_configloaded();
    });
    player.addListener('mouseover', function (args) {
        me.callChildLogicBlocksHotspot_ht_node_mouseover();
        me.callChildLogicBlocksHotspot_ht_url_mouseover();
        me.callChildLogicBlocksHotspot_ht_info_mouseover();
        me.callChildLogicBlocksHotspot_ht_image_mouseover();
        me.callChildLogicBlocksHotspot_ht_video_file_mouseover();
        me.callChildLogicBlocksHotspot_ht_video_url_mouseover();
        me.callChildLogicBlocksHotspot_ht_video_vimeo_mouseover();
        me.callChildLogicBlocksHotspot_ht_video_youtube_mouseover();
    });
    player.addListener('changenodeid', function (args) {
        me.callChildLogicBlocksHotspot_ht_node_active();
    });
    player.addListener('varchanged_vis_userdata', function (args) {
        me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_userdata();
        me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_userdata();
        me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_userdata();
        me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_userdata();
        me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_userdata();
        me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_userdata();
        me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_userdata();
        me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_userdata();
    });
    player.addListener('varchanged_vis_image_popup', function (args) {
        me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_image_popup();
        me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_image_popup();
        me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_image_popup();
        me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_image_popup();
        me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_image_popup();
        me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_image_popup();
        me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_image_popup();
        me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_image_popup();
    });
    player.addListener('varchanged_vis_info_popup', function (args) {
        me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_info_popup();
        me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_info_popup();
        me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_info_popup();
        me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_info_popup();
        me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_info_popup();
        me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_info_popup();
        me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_info_popup();
        me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_info_popup();
    });
    player.addListener('varchanged_vis_video_popup_file', function (args) {
        me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_file();
        me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_file();
        me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_file();
        me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_file();
        me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_file();
        me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_file();
        me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_file();
        me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_file();
    });
    player.addListener('varchanged_vis_video_popup_url', function (args) {
        me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_url();
        me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_url();
        me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_url();
        me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_url();
        me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_url();
        me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_url();
        me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_url();
        me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_url();
    });
    player.addListener('varchanged_vis_video_popup_vimeo', function (args) {
        me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_vimeo();
        me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_vimeo();
        me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_vimeo();
        me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_vimeo();
        me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_vimeo();
        me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_vimeo();
        me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_vimeo();
        me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_vimeo();
    });
    player.addListener('varchanged_vis_video_popup_youtube', function (args) {
        me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_video_popup_youtube();
        me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_video_popup_youtube();
        me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_video_popup_youtube();
        me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_video_popup_youtube();
        me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_video_popup_youtube();
        me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_video_popup_youtube();
        me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_video_popup_youtube();
        me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_video_popup_youtube();
    });
    player.addListener('varchanged_vis_website', function (args) {
        me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_website();
        me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_website();
        me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_website();
        me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_website();
        me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_website();
        me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_website();
        me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_website();
        me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_website();
    });
    player.addListener('varchanged_vis_timer', function (args) {
        me.callChildLogicBlocksHotspot_ht_node_varchanged_vis_timer();
        me.callChildLogicBlocksHotspot_ht_url_varchanged_vis_timer();
        me.callChildLogicBlocksHotspot_ht_info_varchanged_vis_timer();
        me.callChildLogicBlocksHotspot_ht_image_varchanged_vis_timer();
        me.callChildLogicBlocksHotspot_ht_video_file_varchanged_vis_timer();
        me.callChildLogicBlocksHotspot_ht_video_url_varchanged_vis_timer();
        me.callChildLogicBlocksHotspot_ht_video_vimeo_varchanged_vis_timer();
        me.callChildLogicBlocksHotspot_ht_video_youtube_varchanged_vis_timer();
    });
    player.addListener('varchanged_opt_hotspot_preview', function (args) {
        me.callChildLogicBlocksHotspot_ht_node_varchanged_opt_hotspot_preview();
    });
    player.addListener('varchanged_opt_url', function (args) {
        me.callChildLogicBlocksHotspot_ht_url_varchanged_opt_url();
    });
    player.addListener('hotspotsremoved', function (args) {
        me.removeSkinHotspots();
    });
    me.skinTimerEvent();
};
