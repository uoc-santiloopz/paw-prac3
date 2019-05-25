<template>
  <div class="container">
    <div class="form-group">
      <label for="nameFilter">Filtro por nombre:</label>
      <input
        id="nameFilter"
        name="nameFilter"
        type="text"
        class="form-control"
        placeholder="Quiero filtrar maddafak!"
        @input="onFilterChange"
      />
    </div>
    <div class="form-group">
      <label class="description">Desde:</label>
      <flat-pickr
        id="datetime"
        name="datetime"
        class="form-control"
        placeholder="Select date"
      >
      </flat-pickr>
    </div>
    <table class="table">
      <thead>
      <tr scope="col">
        <th v-for="(header, index) in headers" v-bind:key="index">{{header}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(reservation, index) in filteredReservationsByNameAndSurname()" v-bind:key="index">
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
                    @click="goToEdit(reservation)"
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
  </div>
</template>

<script>
import axios from 'axios';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/material_blue.css';
import { ReservationModel } from '@/models/reservation.model';
import { API_ENDPOINTS } from '@/shared/network/endpoints';

export default  {
  data() {
    return {
      filterValue: [],
      headers: ['nombre', 'apellidos', 'teléfono', 'fecha', 'comensales', 'comentarios']
    }
  },
  props: ['reservations'],
  components: {
    flatPickr
  },
  methods: {
    goToDetails(reservation) {
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
    },
    goToEdit(reservation) {
      this.$router.push(
              {
                path: '/edit',
                query: {
                  id: reservation.id.toString(),
                  name: reservation.name,
                  surnames: reservation.surnames,
                  phone: reservation.phone,
                  date: reservation.dateReservation.toISOString(),
                  guests: reservation.guests.toString(),
                  comments: reservation.comments
                }
              }
      )
    },
    deleteTableEntry(reservationId) {
      const body = { id: reservationId };
      axios
              .post(
                      [process.env.VUE_APP_API_BASE_URL, API_ENDPOINTS.RESERVATIONS_DELETE].join(''),
                      body
              )
              .then(res => {
                if (res.data && res.data.message === 'reservation deleted') {
                  this.reservations.splice(
                          this.reservations.findIndex(reservation => reservation.id === reservationId),
                          1
                  )
                }
              });
    },
    filteredReservationsByNameAndSurname() {
      if (!(this.filterValue && this.filterValue.length)) {
        return this.reservations;
      }
      return this.reservations.filter(reservation => {
        if (this.filterValue.length === 1) {
          return  reservation.name.toLowerCase().includes(this.filterValue[0].toLowerCase()) ||
                  reservation.surnames.toLowerCase().includes(this.filterValue[0].toLowerCase());
        } else {
          return  reservation.name.toLowerCase().includes(this.filterValue[0].toLowerCase()) &&
                  reservation.surnames.toLowerCase().includes(this.filterValue[1].toLowerCase());
        }
      })
    },
    onFilterChange(event) {
      this.filterValue = [...event.target.value.split(' ')];
    }
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
