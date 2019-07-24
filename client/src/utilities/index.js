import moment from 'moment';
class Utilities {

    constructor(today, url) {
        this.today = today;
        this.url = url;
    }

    isUrl = (url) => {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?' + // port
            '(\\/[-a-z\\d%@_.~+&:]*)*' + // path
            '(\\?[;&a-z\\d%@_.,~+&:=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return pattern.test(url);
    };

    isEmpty = (a) => {
        return a !== undefined ? a === null || a === '' : true;
    };

    isProvince = (province) => {
        let province_list = ['limpopo', 'mpumalanga', 'north west', 'gauteng', 'kwazulu natal', 'eastern cape', 'western cape', 'northern cape', 'orange free state'];
        for (let i = 0; i < province_list.length; i++) {
            if (province === province_list[i]) {
                return true;
            }
        }
        return false;
    };

    validateEmail = (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    validatePassword = (password) => {
        let re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        return re.test(password);
    };

    validateUsername = (username) => {
        let re = /^\w+$/;
        return re.test(username);
    };

    isNumber = (n) => {
        return n !== undefined ? typeof (n) !== "boolean" && !isNaN(n) : false;
    };

    isCell = (n) => {
        return isNumber(n) ? ((n.length === 10) || (n.length === 11) || (n.length === 12) || (n.length === 13)) : false;
    };

    isTel = (n) => {
        return n !== undefined ? isCell(n) : false;
    };

    isFax = (n) => {
        return n !== undefined ? isCell(n) : false;
    };

    getAge = (dateString) => {
        let dates = dateString.split("-");
        let d = new Date();

        let userday = dates[2];
        let usermonth = dates[1];
        let useryear = dates[0];

        let curday = d.getDate();
        let curmonth = d.getMonth() + 1;
        let curyear = d.getFullYear();

        let age = curyear - useryear;

        if ((curmonth < usermonth) || ((curmonth === usermonth) && curday < userday)) {
            age--;
        }
        return age;
    };
    isIDNumber = (n) => {
        return n !== undefined ? (isNumber(n)) && (n.length === 13) : true;
    };
    numDaysBetweenDates = (firstDate, secondDate) => {

        let f_dates = firstDate.split("-");
        let s_dates = secondDate.split("-");

        // let d = new Date();

        let f_day = parseInt(f_dates[2]);
        let f_month = parseInt(f_dates[1]);
        let f_year = parseInt(f_dates[0]);

        let s_day = parseInt(s_dates[2]);
        let s_month = parseInt(s_dates[1]);
        let s_year = parseInt(s_dates[0]);

        // TODO- Please revise the number of days algorithm
        // let years = f_year - s_year;
        // let months = f_month - s_month;
        // let days = f_day - s_day;

        let a = moment([f_year, f_month, f_day]);
        let b = moment([s_year, s_month, s_day]);

        return a.diff(b, 'days') + 1;

        //
        // if ((years === 0) && (months === 0) && ((days === 0) || (days > 0))){
        //     return days
        // }else if ((years === 0) && (months > 0)){
        //     return (days + (months * 30))
        // }else{
        //     return 365
        // }
    };

    countTimeBetweenTwoTimeStamps = (stamp_1, stamp_2) => {
        try {
            return (stamp_1 - stamp_2)
        } catch (e) {
            return (parseInt(stamp_1) - parseInt(stamp_2))
        }
    };

    throttle = (func, limit) => {
        let lastFunc;
        let lastRan;
        return function () {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function () {
                    if (Date.now() - lastRan >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan))
            }
        }
    };


    debounce = (func, delay) => {
        let inDebounce;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(inDebounce);
            inDebounce = setTimeout(() => func.apply(context, args), delay)
        }
    };


}

// (today,url)
let today = new Date();
let url = document.documentURI;

export let Utils = new Utilities(today, url);
