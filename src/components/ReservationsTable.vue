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
          <button
            class="btn btn-primary"
            @click="goToDetails(reservation)"
          >
            Detalle
          </button>
          <button
            class="btn btn-warning"
          >
            Modificar
          </button>
          <button
            class="btn btn-danger"
            @click="deleteTableEntry(reservation.id)"
          >
            Eliminar
          </button>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ReservationModel } from '@/models/reservation.model';
import { API_ENDPOINTS } from '@/shared/network/endpoints';

@Component
export default class ReservationsTable extends Vue {
  headers: string[] = ['nombre', 'apellidos', 'teléfono', 'fecha', 'comensales', 'comentarios'];
  @Prop() reservations!: ReservationModel[];

  goToDetails(reservation: ReservationModel) {
    this.$router.push(
      {
        path: '/detail',
        query: {
          id: reservation.id.toString(),
          name: reservation.name,
          surnames: reservation.surnames,
          phone: reservation.phone,
          date: reservation.dateReservation.format('DD/MM/YYYY HH:mm'),
          guests: reservation.guests.toString(),
          comments: reservation.comments
        }
      }
    )
  }

  deleteTableEntry(reservationId: number) {
    const body = { id: reservationId };
    axios
      .post(
        [process.env.VUE_APP_API_BASE_URL, API_ENDPOINTS.RESERVATIONS_DELETE].join(''),
        body
      ).then(res => {
        if (res.data && res.data.message === 'reservation deleted') {
          this.reservations.splice(
            this.reservations.findIndex(reservation => reservation.id === reservationId),
            1
          )
        }
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .buttons-actions--container {
    display: flex;
    flex-direction: column;
  }
  td {
    text-align: center;
  }
</style>
