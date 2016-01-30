(function (env) {
    "use strict";
    env.ddg_spice_jisho = function(api_result){
        console.log(api_result);

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('jisho');
        }

        // Render the response
        Spice.add({
            id: "jisho",

            // Customize these properties
            name: "Translation from Jisho",
            data: api_result,
            meta: {
                sourceName: "jisho.org",
                sourceUrl: 'http://jisho.org/api/v1/search/words?keyword=' + api_result.name
            },
            normalize: function(item) {
                return {
                    // customize as needed for your chosen template
                    title: item.title,
                    subtitle: item.subtitle,
                    image: item.icon
                };
            },
            templates: {
                group: 'your-template-group',
                options: {
                    content: Spice.jisho.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
