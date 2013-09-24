$(function () {
    var api = $('.api');

    // the  type tag is redundant with information in the header.
    // we are both compressing the type info to one line
    // then hiding it.

    if (api && api.length) {

        api.find('h6').each(function (i, ele) {
            var jq_ele = $(ele)
            if (/^[\s]*Type:[\s]*$/.test(jq_ele.text())) {
                console.log('found Type header');
                jq_ele.next().hide();
                var text = jq_ele.next().text();

                jq_ele.text('Type: ' + text);
                jq_ele.css('color', 'black');
                jq_ele.hide();
            }
        });

        api.find('header h3').each(function (i, h3) {
            var h3_jq = $(h3);
            var ancestors = h3_jq.find('.ancestors');
            if (ancestors.length) {
                h3_jq.text(h3_jq.text().replace(/[\s+]/gi, ''));
            } else {
                console.log('no ancestors for ', h3_jq.text());
            }

        });

        api.find('.description p').each(function(i, p){
            var j_p = $(p);

            var text = j_p.text();
            console.log('testing ', text);
            if (/^[\s]*Possible values for.*(are|include):[\s]*$/.test(text))         {
                console.log('HIT')
                j_p.after('<h4>Values:</h4>');
                j_p.hide();
            }
        })

    }
})