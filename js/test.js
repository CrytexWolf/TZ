(() => {
    "use strict";

    let GetToday = new Date,
        e = GetToday.getTime(),
        MonthArray = ["Янв.", "Февр.", "Март", "Апр.", "Май", "Июнь", "Июль", "Авг.", "Сент.", "Окт.", "Ноя.", "Дек."],
        MonthItems = document.querySelectorAll(".month__item"),
        GetTomonth = GetToday.getMonth(),
        GetDatenow = GetToday.getDate(),
        a = GetDatenow >= 10 ? GetTomonth + 1 : GetTomonth;

    for (let t = 0; t < 12; t++) {
        if (12 == a) {
            a = 0;
        }
        MonthItems[t].innerText = MonthArray[a];
        a++;
        console.log(GetDatenow);
    }

    let l = GetToday.getDay(),
        r = 1;
    if (1 == l) {
        r = 350;
    } else if (2 == l) {
        r = 351;
    } else if (3 == l) {
        r = 352;
    } else if (4 == l) {
        r = 353;
    } else if (5 == l) {
        r = 354;
    } else if (6 == l) {
        r = 355;
    } else {
        r = 356;
    }

    let c = document.querySelector(".contribution__list");

    for (let t = r; t >= 0; t--) {
        let n = document.createElement("div");
        n.classList.add("list__item");
        n.setAttribute("onclick", "checkStatus(this)");
        n.setAttribute("id", `list-item${t}`);
        let i = new Date(e - 864e5 * t),
            o = i.getDay(),
            s = 1;
        
        if (1 == o) {
            s = "Понед.";
        } else if (2 == o) {
            s = "Вторник";
        } else if (3 == o) {
            s = "Среда";
        } else if (4 == o) {
            s = "Четверг";
        } else if (5 == o) {
            s = "Пятница";
        } else if (6 == o) {
            s = "Суббота";
        } else {
            s = "Воскр.";
        }

        let a = i.getMonth(),
            l = 0;
        
        if (0 == a) {
            l = "Январь";
        } else if (1 == a) {
            l = "Февраль";
        } else if (2 == a) {
            l = "Март";
        } else if (3 == a) {
            l = "Апрель";
        } else if (4 == a) {
            l = "Май";
        } else if (5 == a) {
            l = "Июнь";
        } else if (6 == a) {
            l = "Июль";
        } else if (7 == a) {
            l = "Август";
        } else if (8 == a) {
            l = "Сентябрь";
        } else if (9 == a) {
            l = "Октябрь";
        } else if (10 == a) {
            l = "Ноябрь";
        } else {
            l = "Декабрь";
        }

        n.setAttribute("date", `${s}, ${l} ${i.getDate()}, ${i.getFullYear()}`);
        fetch("https://dpg.gg/test/calendar.json")
            .then((t => t.json()))
            .then((t => {
                let e = `${i.getFullYear()}-${(i.getMonth()+1).toString().length<2?"0"+(i.getMonth()+1):i.getMonth()}-${i.getDate().toString().length<2?"0"+i.getDate():i.getDate()}`;
                let o = Object.keys(t).indexOf(e) > -1 ? t[Object.keys(t)[Object.keys(t).indexOf(e)]] : 0;
                n.setAttribute("contributions", `${o}`);
                c.appendChild(n);
                if (n.getAttribute("contributions") >= 30) {
                    n.style.background = "rgba(37, 78, 119, 1)";
                } else if (n.getAttribute("contributions") >= 20) {
                    n.style.background = "rgba(82, 123, 160, 1)";
                } else if (n.getAttribute("contributions") >= 10) {
                    n.style.background = "rgba(127, 168, 201, 1)";
                } else if (n.getAttribute("contributions") >= 1) {
                    n.style.background = "rgba(172, 213, 242, 1)";
                } else {
                    n.style.background = "rgba(237, 237, 237, 1)";
                }
            }));
    };

    window.checkStatus = t => {
        let e = document.createElement("div");
        e.classList.add("list__item-status");
        e.setAttribute("onmouseout", "closeStatus(this)");
        let n = document.createElement("font");
        n.classList.add("item-status__data");
        n.innerText = t.getAttribute("date");
        let i = document.createElement("font");
        i.classList.add("item-status__contrib");
        i.innerText = `${t.getAttribute("contributions")} contributions`;
        e.appendChild(i);
        e.appendChild(n);
        t.appendChild(e);
    }

    window.closeStatus = t => {
        t.parentNode.removeChild(t);
    }
})();