Module(CV, 'HelperVoice')({
    prototype : {
        /* Give DESC format to the postsCount Object and filter empty months.
         * It turns something like this:
         * {2015: {01: "100", 02: "0", 05: "200"}, ...}, {2010: {06: "0", 07: "150"}, ...}
         * into:
         * [
         *  {year: 2015, months: [{month: 05, total: 200}, {month: 01, total: 100}]},
         *  {year: 2010, months: [{month: 07: total: 150}]},
         *  ...
         * ]
         * @method _formatPostsCountObject <private> [Function]
         */
        _formatPostsCountObject : function _formatPostsCountObject(data) {
            var desc, i, j, total, years, yearsLen, year, months, monthsLen, month, _tempMonths,
                result = [];

            desc = function desc(a, b) {return b - a;};

            years = Object.keys(data);
            yearsLen = years.length;
            years.sort(desc);

            for (i = 0; i < yearsLen; i++) {
                year = years[i];
                _tempMonths = [];
                months = Object.keys(data[year]);
                monthsLen = months.length;
                months.sort(desc);

                for (j = 0; j < monthsLen; j++) {
                    month = months[j];
                    total = data[year][month];
                    if (total > 0) {
                        _tempMonths.push({month: ~~month, total: ~~total});
                    }
                }

                if (_tempMonths.length > 0) {
                    result.push({year: ~~year, months: _tempMonths});
                }
            }

            return result;
        },

        /* Return the total postCount.
         * @argument approvedPostsObject <required> [Object]
         *  @example [{year: 2015, months: [{month: 5, total: 32}, {month: 6, total: 100}]]
         * @return total [Number] @example 132
         */
        _getTotalPostCount : function _getTotalPostCount(approvedPostsObject) {
            var result = [];

            var totals = [].concat.apply([], approvedPostsObject.map(function(year) {
                return year.months.map(function(month) {
                    return month.total;
                });
            }));

            if (totals.length === 0) {
                return 0;
            }

            result = totals.reduce(function(prev, curr) {
                return prev + curr;
            });

            return result;
        }
    }
});
