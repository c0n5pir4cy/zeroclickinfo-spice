package DDG::Spice::Jisho;

# ABSTRACT: Write an abstract here

# Start at http://docs.duckduckhack.com/walkthroughs/forum-lookup.html if you are new
# to instant answer development

use DDG::Spice;

# Caching - http://docs.duckduckhack.com/backend-reference/api-reference.html#caching
spice is_cached => 1;
spice proxy_cache_valid => "200 1d"; # defaults to this automatically

spice wrap_jsonp_callback => 1; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

# API endpoint - http://docs.duckduckhack.com/walkthroughs/forum-lookup.html#api-endpoint
spice to => 'http://jisho.org/api/v1/search/words?keyword=$1';

# Triggers - http://docs.duckduckhack.com/walkthroughs/forum-lookup.html#triggers
triggers end => "英語で","日本語で","in japanese", "in english";

# Handle statement
handle query_lc => sub {
    print $_;
#    return unless $_ =~ /(英語で|日本語で|in japanese|in english)$/i;
     $_ =~ s/(英語で|日本語で| in japanese| in english)$//g;
    print $_;
    # Query is in $_...if you need to do something with it before returning
    return $_;
};

1;
