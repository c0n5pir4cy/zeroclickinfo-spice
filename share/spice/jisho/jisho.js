(function (env) {
    "use strict";
    
    function handleItem(item){
        var japaneseWord = item.japanese[0].word
        var japaneseReading = item.japanese[0].reading
        var senses = item.senses;
        
        var senseBuckets = {};
        var partsOfSpeech;
        
        //So we have to do a few things - loop over all the things and put them into their correct bucket of speech
        //and then remove the wikipedia definitions.
        for (var j = 0; j < senses.length; j++){
            if (senses[j].parts_of_speech.join("").trim() !== ""){
                partsOfSpeech = senses[j].parts_of_speech.join(", ");
            }
            var limit = (senses[j].parts_of_speech.length > 6) ? 6 : senses[j].parts_of_speech.length;
            for (var i = 0; i < limit; i++){
                if (senses[j].parts_of_speech[i] !== 'Wikipedia definition'){
                    if (senseBuckets[partsOfSpeech] === undefined){
                        senseBuckets[partsOfSpeech] = []
                    }
                    senseBuckets[partsOfSpeech] = senseBuckets[partsOfSpeech].concat(senses[j].english_definitions);
                     
                } 
            }
            senses[j].bucket = senseBuckets[partsOfSpeech];
        }
        
        var out = [];
        var senseKeys = Object.keys(senseBuckets);
        senseKeys.forEach(function(key){
            var bucket = senseBuckets[key];
            out.push({key: key, value: bucket});
        })
        console.log({"japanese": japaneseWord, "reading": japaneseReading, "senses": out});
        return {"japanese": japaneseWord, "reading": japaneseReading, "senses": out};
        
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