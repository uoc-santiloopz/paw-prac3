<template>
  <table class="table">
    <thead>
    <tr scope="col">
      <th v-for="(header, index) in headers" v-bind:key="index">{{header}}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(reservation, index) in reservations" v-bind:key="index">
      <td>{{reservation.name}}</td>
      <td>{{reservation.surnames}}</td>
      <td>{{reservation.phone}}</td>
      <td>{{reservation.dateReservation.format('DD/MM/YYYY HH:MM')}}</td>
      <td>{{reservation.guests}}</td>
      <td>{{reservation.comments ? reservation.comments : '---'}}</td>
      <td>
        <div class="buttons-actions--container">
          <button class="btn btn-primary">Detalle</button>
          <button class="btn btn-warning">Modificar</button>
          <button class="btn btn-danger">Eliminar</button>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ReservationModel } from '@/models/reservation.model';

@Component
export default class ReservationList extends Vue {
  headers: string[] = ['nombre', 'apellidos', 'teléfono', 'fecha', 'comensales', 'comentarios'];
  @Prop() reservations!: ReservationModel[];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .buttons-actions--container {
    display: flex;
    flex-direction: column;
  }
</style>
