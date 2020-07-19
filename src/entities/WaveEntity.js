export default class WaveEntity{
    constructor (id, muscle, rms, raw, avg_rms, mvc, historic_mvc) {
        this.id = id;
        this.muscle = muscle;
        this.rms = rms;
        this.raw = raw;
        this.avgRms = avg_rms;
        this.mvc = mvc;
        this.historicMvc = historic_mvc;
    
    }
}