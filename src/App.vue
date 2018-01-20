
<template>
  <div id="app">

    <div v-if="$store.getters.getMethod == 'crypto-to-currency'" style="float: left">
      <input type="number" v-model="crypto_value">
      <select v-model="selected_cryptocurrency">
        <option value="BTC">BTC</option>
        <option value="GCC">GCC</option>
      </select>
    </div>

    <div v-if="$store.getters.getMethod == 'currency-to-crypto'" style="float: left">
       <input type="number" v-model="currency_value">
      <select v-model="selected_currency">
        <option value="$">$</option>
        <option value="EUR">EUR</option>
      </select>
    </div>


    <button  @click="changeMode()" style="float: left"> changeMode </button>

    <div v-if="$store.getters.getMethod == 'crypto-to-currency'" style="float: left">
      <select v-model="selected_currency">
        <option value="$">$</option>
        <option value="EUR">EUR</option>
      </select>
      <input type="number" v-model="currency_value">
    </div>

    <div v-if="$store.getters.getMethod ==  'currency-to-crypto'" style="float: left">
      <select v-model="selected_cryptocurrency">
        <option value="BTC">BTC</option>
        <option value="GCC">GCC</option>
      </select>
       <input type="number" v-model="crypto_value">
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      crypto_value: null,
      currency_value: null,
      selected_cryptocurrency: 'BTC',
      selected_currency: '$'
    }
  },
  mounted() {
     this.$store.dispatch('getDataFromApi');
  },
  methods: {
    calculate() {
      if (this.selected_cryptocurrency == 'BTC' && this.selected_currency == '$') {
        this.setValue(this.$store.getters.getBtcUsd);
      } else if (this.selected_cryptocurrency == 'BTC' && this.selected_currency == 'EUR') {
        this.setValue(this.$store.getters.getBtcEur);
      } else if (this.selected_cryptocurrency == 'GCC' && this.selected_currency == 'EUR') {
        this.setValue(this.$store.getters.getGccEur);
      } else if (this.selected_cryptocurrency == 'GCC' && this.selected_currency == '$') {
        this.setValue(this.$store.getters.getGccUsd);
      }

    },
    setValue(price) {
      if (this.$store.getters.getMethod == 'crypto-to-currency') {
        this.currency_value = this.crypto_value * price;
      } else if (this.$store.getters.getMethod == 'currency-to-crypto') {
        this.crypto_value = this.currency_value  / price;
      }
    },
    changeMode() {
      this.$store.dispatch('changeMethod');
    }
  },
  watch: {
    crypto_value() {
      this.calculate();
    },
    selected_cryptocurrency() {
      this.calculate();
    },
    selected_currency() {
      this.calculate();
    },
    currency_value() {
      this.calculate();
    }
  }
};

</script>
