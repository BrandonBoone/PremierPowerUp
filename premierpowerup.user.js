// ==UserScript==
// @name         Premier Power Up
// @namespace    https://github.com/BrandonBoone/PremierPowerUp/
// @version      0.1
// @license      MIT
// @description  Adds enhancements to the Premier portal.
// @author       Brandon J. Boone
// @require      https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/components/transition.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/components/dropdown.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @match        https://www.premierdesigns.com/portal/*
// @updateURL    https://raw.githubusercontent.com/BrandonBoone/PremierPowerUp/master/powerup.js
// @downloadURL  https://raw.githubusercontent.com/BrandonBoone/PremierPowerUp/master/powerup.js
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
    /* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */

    const waitForReady = (selector) => new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        const $item = $(selector);
        if($item.length > 0){
          clearInterval(interval);
          resolve($item);
        }
      }, 250);
    });

    let $hacktime = null;

    waitForReady('pd-jeweler-orders-list .pointing.menu .right.menu')
    .then(($found) => {
        'use strict';
        const currentYear = new Date().getFullYear();
        const yearRange = [];
        for (let i = currentYear; i >= currentYear - 2; i--) {
            yearRange.push(i);
        }

        $found.prepend(`
        <div id="hacktime" class="item">
            <div class="ui tiny pointing dropdown button" tabindex="0" style="margin-right:4px">
              <input type="hidden" id="hacktime-months" name="hacktime-months" value="0">
              <div class="text">All Months</div>
              <div class="menu transition hidden">
                <div class="header">Month</div>
                <div class="item" data-value="0">All Months</div>
                <div class="item" data-value="1">January</div>
                <div class="item" data-value="2">February</div>
                <div class="item" data-value="3">March</div>
                <div class="item" data-value="4">April</div>
                <div class="item" data-value="5">May</div>
                <div class="item" data-value="6">June</div>
                <div class="item" data-value="7">July</div>
                <div class="item" data-value="8">August</div>
                <div class="item" data-value="9">September</div>
                <div class="item" data-value="10">October</div>
                <div class="item" data-value="11">November</div>
                <div class="item" data-value="12">December</div>
              </div>
            </div>
            <div class="ui tiny pointing dropdown button" tabindex="0">
              <input type="hidden" id="hacktime-years" name="hacktime-year" value="0">
              <div class="text">All Years</div>
              <div class="menu transition hidden">
                <div class="header">Year</div>
                <div class="item" data-value="0">All Years</div>
                ${yearRange.map((year) => `<div class="item" data-value="${year}">${year}</div>`).join('')}
              </div>
            </div>
        </div>`);

        $hacktime = $('#hacktime input');
        const $months = $('#hacktime-months');
        const $years = $('#hacktime-years');
        const $test = $('#hacktime .ui.dropdown').dropdown();
        $hacktime.off('change').change((e) => {
            const month = parseInt($months.val(), 10) -1; // js months are zero-based
            const year = parseInt($years.val(), 10);
            console.log({month, year});
            $('table tbody tr td:nth-child(3)').each((i, item) => {
                var curDate = new Date(item.innerText);
                if((curDate.getMonth() !== month && month !== -1) || (curDate.getFullYear() !== year && year !== 0)){
                  $(item).parents('tr').hide();
                } else {
                  $(item).parents('tr').show();
                }
            });
        });
    });

    waitForReady('pd-jeweler-orders-list .ui.secondary.pointing.menu > .item')
    .then(($found) => {
        $found.click(() => {
            if($hacktime){
                $('#hacktime-months').change();
            }
        });
    });

    /* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */
