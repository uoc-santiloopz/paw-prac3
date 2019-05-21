<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <h1>Listado de reservas</h1>
      </div>
    </div>
    <div class="row d-none">
      <div class="col-xs-12">
        <a>Próximas 24 horas</a>
      </div>
    </div>
    <div class="row" id="reservationsTableContainer">
      <div class="col-xs-12">
        <h3>No hay reservas que mostrar</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <button class="btn btn-primary">Crear reserva</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ReservationList from '@/components/ReservationList.vue'

export default {
  name: 'home',
  components: {
    ReservationList
  }
}
</script>
