<template>
    <div class='container'>
        <div class='row'>
          <div class='col-xs-12'>
            <h1>Listado de reservas</h1>
          </div>
        </div>
        <div class='row d-none'>
          <div class='col-xs-12'>
            <a>Próximas 24 horas</a>
          </div>
        </div>
        <div class='row' id='reservationsTableContainer'>
          <div class='col-xs-12'>
            <h3 v-if="!reservations">No hay reservas que mostrar</h3>
            <ReservationList v-else :reservations="reservations"/>
          </div>
        </div>
        <div class='row'>
          <div class='col-xs-12'>
            <button class='btn btn-primary'>Crear reserva</button>
          </div>
        </div>
    </div>
</template>
<script>
// @ is an alias to /src
import * as axios from 'axios';
import ReservationList from '@/components/ReservationList.vue'
import { API_ENDPOINTS } from '../shared/network/endpoints';

export default {
    name: 'Landing',
    data() {
        return {
            reservations: null,
            interval: null,
        }
    },
    components: {
        ReservationList
    },
    methods: {
        fetchReservations() {
            axios
                .get([process.env.VUE_APP_API_BASE_URL, API_ENDPOINTS.ALL_RESERVATIONS].join(''))
                .then(res => this.reservations = res.data);
        }
    },
    created() {
        this.interval = setInterval(() => {
            this.fetchReservations();
        }, 60000);
        this.fetchReservations();
    },
    destroyed() {
        this.interval.clearInterval();
    }
}
</script>
