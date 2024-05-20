<template>
  <div class="p-5">
    <div
      id="map"
      style="width: 100%; height: 350px"
    />
  </div>
</template>

<script>

export default {
  components: {
    
  },
  props: {
    isDraggable: {
      type: Boolean,
      default: true,
    },
    positions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      current_position: null,
      current_accuracy: null,
      map: null,
    }
  },
  computed: {
    tableDataLength() {
      return (this.tableData && this.tableData.length) || 0
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(val, old) {},
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // Initialise la carte et définit sa vue sur les coordonnées et le niveau de zoom
      this.map = L.map('map').setView([0, 0], 1) // Initialisation de la carte
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(this.map)
      // Ajuster le zoom de la carte
      this.map.locate({ setView: true, maxZoom: 16 })
      // ajouter les marqueurs des différentes positions du props
      if (this.positions.length !== 0) {
        // console.log('en mode affichage::: 🟢', this.positions);
        // console.log(this.positions)
        this.positions.forEach(position => {
          L.marker([position.lat, position.lng], { draggable: this.isDraggable }).addTo(this.map)
        })
        return
      }
      // console.log('en mode récup::: 🟢🟢',);

      this.map.on('locationfound', this.onLocationFound)
      this.map.on('locationerror', this.onLocationError)

      // Ajoute un marqueur sur la carte aux coordonnées spécifiées
      // const marker = L.marker([6.370252526698369, 2.4114899447997344]).addTo(
      //   map
      // );

      // Fonction pour gérer le clic sur la carte et récupérer les coordonnées
      // map.on("click", (e) => {
      //   const coord = e.latlng;
      //   const { lat, lng } = coord;
      //   this.$emit("on_position_fixed", { lng, lat });
      //   // Optionnel : Ajoute un marqueur à l'endroit cliqué
      //   L.marker([lat, lng]).addTo(map);
      // });
    },
    onLocationFound(e) {
      const radius = e.accuracy / 2
      const marker = L.marker(e.latlng, { draggable: this.isDraggable })
        .addTo(this.map)
        .bindPopup(`Vous êtes à environ ${radius} mètres de ce point`)
        .openPopup()
      L.circle(e.latlng, radius).addTo(this.map)
      this.map.setView(e.latlng, 13) // Ajustez 16 au niveau de zoom souhaité
      const position = marker.getLatLng()
      this.$emit('on_position_fixed', {
        lng: position.lng,
        lat: position.lat,
      })

      marker.on('dragend', event => {
        const marker = event.target
        const position = marker.getLatLng()
        this.$emit('on_position_fixed', {
          lng: position.lng,
          lat: position.lat,
        })
        // Ici, vous pouvez ajouter le code pour traiter la nouvelle position
      })
    },
    onLocationError(e) {
      alert(e.message)
    },
    
  },

}
</script>

<style scoped lang="scss">

</style>
