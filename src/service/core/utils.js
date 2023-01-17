import moment from "moment";
import {Config} from "../../config/config";
import { toast } from "react-toastify";
import rgbHex from 'rgb-hex';

export default class Utils {

    static getFormattedDate(date) {
        if (!date) {
            return ''
        }
        return moment(date).format('MMM D YYYY, h:mm A');
    }

    static getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    static getVersion() {
        const v = Config.version;
        return `${v.majorRevision}.${v.minorRevision}.${v.bugFixes}`
    }

    static formatNumber(num, digits=1) {
        const lookup = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "K" },
            { value: 1e6, symbol: "M" },
            { value: 1e9, symbol: "G" },
            { value: 1e12, symbol: "T" },
            { value: 1e15, symbol: "P" },
            { value: 1e18, symbol: "E" }
          ];
          const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
          var item = lookup.slice().reverse().find(function(item) {
            return num >= item.value;
          });
          return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
    }

    static formatTime(duration) {
        var milliseconds = Math.floor((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds;
    }

    static copyText (text) {
        var input = document.createElement('textarea');
        input.innerHTML =  text.slice(-1)=='.' ? text.substring(0, text.length - 1) : text
        document.body.appendChild(input);
        input.select();
        var result = document.execCommand('copy');
        document.body.removeChild(input);
        toast.success('Copied!')
        return result;
    }

    static signupUrls (step,props) {
        let routeName = ''
        switch(step) {
            case 2:
                return routeName = "/signup/detail";
            case 3:
                return routeName = "/signup/company";
            case 4:
                return routeName = "/signup/website";
            case 5:
                return routeName="/signup/role";
            case 6:
                return routeName="/signup/plan";
            case 7:
                return routeName="/signup/tshirt";
            case 8:
                return routeName="/signup/address";
            case 9 || 10:
                return routeName="/signup/price";
        }
        return props.history.push(routeName);
    }

    static trimCharacterLength (text, count){
        return text.slice(0, count) + (text.length > count ? "..." : "");
    }

    static isValidUrl = url => {
        try {
            new URL(url) // throws an exception if the url is malformed
            return true
        } catch (_) {
            return false
        }
    }
    static getLuminance(rgbColor) {
        const [r, g, b] = Object.keys(rgbColor).map(key => {
          const channel = rgbColor[key] / 255;
          return channel <= 0.03928
            ? channel / 12.92
            : ((channel + 0.055) / 1.055) ** 2.4;
        });
        return parseFloat((0.2126 * r + 0.7152 * g + 0.0722 * b).toFixed(3));
    }

    static determineTextColor (color){
        if (this.getLuminance(color) > Math.sqrt(1.05 * 0.05) - 0.05) {
            if(color.a<0.5){
                return "#fff";
            }
            return "#000";
        } else {
            return "#fff";
        }
    }
    static generateInstanceId() {
        let firstPart = (Math.random() * 46656) | 0;
        let secondPart = (Math.random() * 46656) | 0;
        firstPart = ("000" + firstPart.toString(36)).slice(-3);
        secondPart = ("000" + secondPart.toString(36)).slice(-3);
        return firstPart + secondPart;
    }
    static templateColors(color) {
        if(typeof color === 'object'){
            return '#' + rgbHex(color.r, color?.g, color?.b, color?.a)
        } else if(color.includes('#')){
            return color
        }
    }

    static wait(millis) {
        return new Promise((resolve) => {
            setTimeout(resolve, millis)
        })
    }

    static getUrlParamString(params, withQuestionMark) {
        let str = withQuestionMark ? '?' : ''
        const _params = {...params}
        for (const paramsKey in _params) {
            if (_params[paramsKey] === null) {
                _params[paramsKey] = ''
            }
        }
        str += new URLSearchParams(_params).toString()
        return str
    }
    
    static debounce = (func) => {

        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
            timer = null;
            func.apply(context, args);
            }, 50);
        };
    };

    static urlValidation = url => {
        try {
            let testBackgroundUrl = ''
            if (url.indexOf("http://") == -1 && url.indexOf("https://") == -1) {
              testBackgroundUrl = "http://"+url
            } else {
                testBackgroundUrl = url
            }
            if (
                testBackgroundUrl.match(
                  /\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/g
                ) == null
            ) {
              return false
            }
            return testBackgroundUrl
        } catch (_) {
            return false
        }
    }

}
