import Vue from 'vue'

Vue.mixin({
  methods: {
    formatNumber (number) {
      return number !== undefined ? number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : ''
    }
  }
})

Vue.mixin({
  methods: {
    mapState (postal) {
      const states = {
        AK: 'Alaska',
        AL: 'Alabama',
        AR: 'Arkansas',
        AZ: 'Arizona',
        CA: 'California',
        CO: 'Colorado',
        CT: 'Connecticut',
        DC: 'Washington DC',
        DE: 'Delaware',
        FL: 'Florida',
        GA: 'Georgia',
        HI: 'Hawaii',
        IA: 'Iowa',
        ID: 'Idaho',
        IL: 'Illinois',
        IN: 'Indiana',
        KS: 'Kansas',
        KY: 'Kentucky',
        LA: 'Louisiana',
        MA: 'Massachusetts',
        MD: 'Maryland',
        ME: 'Maine',
        MI: 'Michigan',
        MN: 'Minnesota',
        MO: 'Missouri',
        MS: 'Mississippi',
        MT: 'Montana',
        NE: 'Nebraska',
        NH: 'New Hampshire',
        NJ: 'New Jersey',
        NM: 'New Mexico',
        NV: 'Nevada',
        NY: 'New York',
        NC: 'North Carolina',
        ND: 'North Dakota',
        OH: 'Ohio',
        OK: 'Oklahoma',
        OR: 'Oregon',
        PA: 'Pennsylvania',
        RI: 'Rhode Island',
        SC: 'South Carolina',
        SD: 'South Dakota',
        TN: 'Tennessee',
        TX: 'Texas',
        UT: 'Utah',
        VA: 'Virginia',
        VT: 'Vermont',
        WA: 'Washington',
        WI: 'Wisconsin',
        WV: 'West Virginia',
        WY: 'Wyoming',
        AS: 'American Samoa',
        MP: 'Commonwealth of the Northern Mariana Islands',
        GU: 'Guam',
        PR: 'Puerto Rico',
        VI: 'Virgin Islands'
      }

      return states[postal]
    }
  }
})

Vue.mixin({
  methods: {
    mapStateReverse (state) {
      const states = {
        AK: 'Alaska',
        AL: 'Alabama',
        AR: 'Arkansas',
        AZ: 'Arizona',
        CA: 'California',
        CO: 'Colorado',
        CT: 'Connecticut',
        DC: 'Washington DC',
        DE: 'Delaware',
        FL: 'Florida',
        GA: 'Georgia',
        HI: 'Hawaii',
        IA: 'Iowa',
        ID: 'Idaho',
        IL: 'Illinois',
        IN: 'Indiana',
        KS: 'Kansas',
        KY: 'Kentucky',
        LA: 'Louisiana',
        MA: 'Massachusetts',
        MD: 'Maryland',
        ME: 'Maine',
        MI: 'Michigan',
        MN: 'Minnesota',
        MO: 'Missouri',
        MS: 'Mississippi',
        MT: 'Montana',
        NE: 'Nebraska',
        NH: 'New Hampshire',
        NJ: 'New Jersey',
        NM: 'New Mexico',
        NV: 'Nevada',
        NY: 'New York',
        NC: 'North Carolina',
        ND: 'North Dakota',
        OH: 'Ohio',
        OK: 'Oklahoma',
        OR: 'Oregon',
        PA: 'Pennsylvania',
        RI: 'Rhode Island',
        SC: 'South Carolina',
        SD: 'South Dakota',
        TN: 'Tennessee',
        TX: 'Texas',
        UT: 'Utah',
        VA: 'Virginia',
        VT: 'Vermont',
        WA: 'Washington',
        WI: 'Wisconsin',
        WV: 'West Virginia',
        WY: 'Wyoming',
        AS: 'American Samoa',
        MP: 'Commonwealth of the Northern Mariana Islands',
        GU: 'Guam',
        PR: 'Puerto Rico',
        VI: 'Virgin Islands'
      }

      return Object.keys(states).find(key => states[key] === state)
    }
  }
})
