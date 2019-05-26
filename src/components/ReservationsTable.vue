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
        @input="onFilterNameSurnameChange"
      />
    </div>
    <div id="date-time-filter-container">
      <div class="form-group">
        <label class="description">Desde:</label>
        <flat-pickr
          id="datetimeFrom"
          name="datetimeFrom"
          class="form-control"
          placeholder="Desde..."
          v-model="filterValues.dateFilters.from"
          :config="filterValues.dateFilters.config"
        >
        </flat-pickr>
      </div>
      <div class="form-group">
        <label class="description">Hasta:</label>
        <flat-pickr
                id="datetimeTo"
                name="datetimeTo"
                class="form-control"
                placeholder="Hasta..."
                v-model="filterValues.dateFilters.to"
                :config="filterValues.dateFilters.config"
        >
        </flat-pickr>
      </div>
    </div>
    <table class="table">
      <thead>
      <tr scope="col">
        <th
          v-for="(header, index) in headers"
          v-bind:key="index"
        >
          {{header.name}}
          <font-awesome-icon class="pointer" icon="sort" @click="tableSort(header)"/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(reservation, index) in reservationsFiltered()" v-bind:key="index">
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
import dayjs from 'dayjs';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/material_blue.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSort } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { API_ENDPOINTS } from '@/shared/network/endpoints';


export default  {
  data() {
    return {
      filterValues: {
        nameSurname: [],
        dateFilters: {
          from: null,
          to: null,
          config: {
            altFormat: 'M	j, Y',
            altInput: true,
            dateFormat: 'Y-m-d H:i',
            enableTime: true
          }
        },
      },
      headers: [
        {
          name:'nombre',
          sortAsc: false,
          sortFunc: (arr, sortedAsc) => {
            const ordered =
              arr.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
            return sortedAsc ? ordered.reverse() : ordered;
          }
        },
        {
          name:'apellidos',
          sortAsc: false,
          sortFunc: (arr, sortedAsc) => {
            const ordered =
              arr.sort((a, b) => (a.surnames.toLowerCase() > b.surnames.toLowerCase()) ? 1 : -1);
            return sortedAsc ? ordered.reverse() : ordered;
          }
        },
        {
          name:'teléfono',
          sortAsc: false,
          sortFunc: (arr, sortedAsc) => {
            const ordered = arr.sort((a, b) => (a.phone > b.phone) ? 1 : -1);
            return sortedAsc ? ordered.reverse() : ordered;
          }
        },
        {
          name:'fecha',
          sortAsc: false,
          sortFunc: (arr, sortedAsc) => {
            const ordered =
              arr.sort((a, b) => (a.dateReservation.isAfter(b.dateReservation)) ? 1 : -1);
            return sortedAsc ? ordered.reverse() : ordered;
          }
        },
        {
          name:'comensales',
          sortAsc: false,
          sortFunc: (arr, sortedAsc) => {
            const ordered = arr.sort((a, b) => a.guests - b.guests);
            return sortedAsc ? ordered.reverse() : ordered;
          }
        }
      ]
    }
  },
  props: ['reservations'],
  components: {
    flatPickr,
    FontAwesomeIcon
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
    filteredReservationsByNameAndSurname(reservations) {
      if (this.filterValues.nameSurname && this.filterValues.nameSurname.length) {
        return reservations.filter(reservation => {
          if (this.filterValues.nameSurname.length === 1) {
            return reservation.name.toLowerCase().includes(this.filterValues.nameSurname[0].toLowerCase()) ||
                    reservation.surnames.toLowerCase().includes(this.filterValues.nameSurname[0].toLowerCase());
          } else {
            return reservation.name.toLowerCase().includes(this.filterValues.nameSurname[0].toLowerCase()) &&
                    reservation.surnames.toLowerCase().includes(this.filterValues.nameSurname[1].toLowerCase());
          }
        })
      } else {
        return reservations;
      }
    },
    filteredReservationsByDate(reservations) {
      if (this.filterValues.dateFilters.from || this.filterValues.dateFilters.to) {
        if (this.filterValues.dateFilters.from) {
          const from = dayjs(this.filterValues.dateFilters.from);
          reservations = reservations.filter(reservation => reservation.dateReservation.isAfter(from));
        }
        if (this.filterValues.dateFilters.to) {
          const to = dayjs(this.filterValues.dateFilters.to);
          reservations = reservations.filter(reservation => reservation.dateReservation.isBefore(to));
        }
      }
      return reservations;
    },
    reservationsFiltered() {
      return this.filteredReservationsByNameAndSurname(this.filteredReservationsByDate(this.reservations));
    },
    onFilterNameSurnameChange(event) {
      this.filterValues.nameSurname = [...event.target.value.split(' ')];
    },
    tableSort(header) {
      this.reservations = header.sortFunc(this.reservations, header.sortAsc);
      header.sortAsc = !header.sortAsc;
    }
  },
  created() {
    library.add(faSort);
  }
}
</script>

<style scoped lang="scss">
  @import "../styles.css";

  td {
    text-align: center;
  }
  #date-time-filter-container {
    display: flex;
    .form-group:nth-child(2) {
      margin-left: 16px;
    }
  }
  .buttons-actions--container {
    display: flex;
    flex-direction: column;
  }
</style>
