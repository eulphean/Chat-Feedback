class AgentA {
    constructor() {
        // Load all the elements
        this.getHTMLElements(); 
    }

    getHTMLElements() {
        this.voicesSelect = document.getElementById("voicesA");
        this.voicesSelect.addEventListener('change', this.onVoiceSelected.bind(this));

        this.language = document.getElementById("langA");
        //Pitch
        this.pitchSlider = document.getElementById('pitchA');
        this.pitchSlider.addEventListener('input', this.onPitchChange.bind(this)); 
        // Rate
        this.rateSlider = document.getElementById('rateA'); 
        this.rateSlider.addEventListener('input', this.onRateChange.bind(this)); 
        this.pitchVal = document.getElementById('pitchvalA'); 
        this.rateVal = document.getElementById('ratevalA');
        this.emotion = document.getElementById("emotionA"); 
        this.response = document.getElementById("responseA");
    }

    setVoices(voices) {
        for (var i = 0; i < voices.length; i++) {
            var name = voices[i].name; 
            var lang = voices[i].language; 
            var option = document.createElement("option");
            option.text = name; 
            option.setAttribute('lang', lang);
            this.voicesSelect.add(option);
        }

        // Assign the voice and language
        this.voicesSelect.value = voices[0].name;
        this.language.innerText = voices[0].language;

        this.pitchVal.innerText = this.getPitch(); this.rateVal.innerText = this.getRate(); 
    }
    
    onVoiceSelected(event) {
        var targetEl = event.target; 
      
        // Get name and language. 
        var idx = targetEl.selectedIndex; 
        var lang = targetEl[idx].lang; 
      
        // Set name and language. 
        this.language.innerText = lang;
    }

    onPitchChange() {
        // Set default pitch and rate. 
        this.pitchVal.innerText = this.getPitch();
    }
      
    onRateChange() {
        // Set default pitch and rate. 
        this.rateVal.innerText = this.getRate(); 
    }
      
    getPitch() {
        return this.pitchSlider.value/100;
    }
      
    getRate() {
        return this.rateSlider.value/100; 
    }

    getEmotion() {
        return this.emotion.value; 
    }

    setResponse(val) {
        this.response.innerText = val; 
    }
}