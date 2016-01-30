(function (env) {
    "use strict";
    
    function handleItem(item){
        var japaneseWord = item.japanese[0].word
        var japaneseReading = item.japanese[0].reading
        var senses = item.senses;
        
        for (var j = 0; j < senses.length; j++){
            for (var i = 0; i < senses[j].parts_of_speech.length; i++){
                if (senses[j].parts_of_speech[i] === 'Wikipedia definition'){
                    delete senses[j];
                    break;
                }
            }     
        }

        return {"japanese": japaneseWord, "reading": japaneseReading, "senses": senses};
    }
    
    env.ddg_spice_jisho = function(api_result){
        var out = 0;
        var result = handleItem(api_result.data[0]);

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('jisho');
        }

        // Render the response
        Spice.add({
            id: "jisho",

            // Customize these properties
            name: "Translation from Jisho",
            data: result,
            meta: {
                sourceName: "jisho.org",
                sourceUrl: 'http://jisho.org/search/' + result.japanese
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
                group: 'base',
                options: {
                    content: Spice.jisho.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
