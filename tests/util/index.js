function makeSample(res) {
    return {
        sampleCurrent: function () {
            return {
                diff: function() {
                    return res;
                }
            }
        }
    }
}

module.exports.makeSample = makeSample;