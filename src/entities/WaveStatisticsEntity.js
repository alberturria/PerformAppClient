export default class WaveStatisticsEntity{
    constructor (id, kurtosis, entropy, maximum, minimum, zeroCrossingCounts, arithmeticMean, harmonicMean,
        geometricMean, trimmedMean, median, mode, variance) {
        this.id = id;
        this.kurtosis = kurtosis;
        this.entropy = entropy;
        this.maximum = maximum;
        this.minimum = minimum;
        this.zeroCrossingCounts = zeroCrossingCounts;
        this.arithmeticMean = arithmeticMean;
        this.harmonicMean = harmonicMean;
        this.geometricMean = geometricMean;
        this.trimmedMean = trimmedMean;
        this.median = median;
        this.mode = mode;
        this.variance = variance;
    }
}