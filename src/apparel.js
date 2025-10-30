/* globals Vue */
new Vue({
  el: '#app',
  data() {
    return {
      index: 1,
      product: null,
      state: 'idle', // 'idle' | 'ready' | 'unavailable' | 'error'
      now: new Date().toISOString().slice(0, 10),
      // Apparel UI state
      sizes: ['S','M','L','XL'],
      selectedSize: null,
      selectedColor: null,
      qty: 1,
    };
  },
  computed: {
    isMen() {
      return this.product && this.normalize(this.product.category) === "men's clothing";
    },
    isWomen() {
      return this.product && this.normalize(this.product.category) === "women's clothing";
    },
    pageClass() {
      if (this.state === 'ready' && this.isMen) return 'page-men';
      if (this.state === 'ready' && this.isWomen) return 'page-women';
      if (this.state === 'unavailable') return 'page-unavailable';
      return 'page-neutral';
    },
    categoryBadge() {
      if (this.state !== 'ready') return '';
      if (this.isMen) return 'Men';
      if (this.isWomen) return 'Women';
      return '';
    },
    priceFmt() {
      if (!this.product || typeof this.product.price !== 'number') return '';
      return `$${this.product.price.toFixed(2)}`;
    },
    activePalette() {
      // Simple, brand-aligned swatches
      return this.isMen
        ? [{name:'Navy',hex:'#002772'},{name:'Ash',hex:'#3F3F3F'},{name:'Sky',hex:'#D6E6FF'}]
        : this.isWomen
          ? [{name:'Plum',hex:'#720060'},{name:'Charcoal',hex:'#3F3F3F'},{name:'Petal',hex:'#FDE2FF'}]
          : [{name:'Neutral',hex:'#3F3F3F'}];
    },
  },
  methods: {
    normalize(val) { return String(val || '').trim().toLowerCase(); },
    async fetchProduct(index) {
      this.state = 'idle';
      try {
        const url = `https://fakestoreapi.com/products/${index}`;
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const cat = this.normalize(data.category);
        if (cat === "men's clothing" || cat === "women's clothing") {
          this.product = data;
          this.state = 'ready';
          // reset UI selections
          this.selectedSize = null;
          this.selectedColor = null;
          this.qty = 1;
        } else {
          this.product = null;
          this.state = 'unavailable';
        }
      } catch (e) {
        console.error('Fetch error:', e);
        this.product = null;
        this.state = 'error';
      }
    },
    nextProduct() {
      this.index = this.index >= 20 ? 1 : this.index + 1;
      this.fetchProduct(this.index);
    },
    refetch() { this.fetchProduct(this.index); },
    incQty() { this.qty += 1; },
    decQty() { if (this.qty > 1) this.qty -= 1; },
    addToCart() {
      if (!this.selectedSize) return;
      alert(`Added to bag:\n- ${this.product.title}\n- ${this.selectedColor || 'Default color'} / ${this.selectedSize}\n- Qty: ${this.qty}\n- ${this.priceFmt}`);
    }
  },
  mounted() { this.fetchProduct(this.index); }
});
